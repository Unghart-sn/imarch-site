// Netlify Function: /.netlify/functions/order-create
// Creates an order in Supabase and returns a presigned PUT URL for R2 inbox.
// Anonymous (no JWT). HMAC token binds order_id+email for later status checks.
'use strict';

const crypto = require('crypto');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

const MAX_BYTES = 100 * 1024 * 1024;
const PRESIGN_PUT_TTL = 60 * 60;
const PRICE_GBP = 20;

let s3 = null;
function getS3() {
  if (s3) return s3;
  s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  return s3;
}

function reply(code, obj) {
  return {
    statusCode: code,
    headers: Object.assign({}, CORS, JSON_CT),
    body: JSON.stringify(obj),
  };
}

function parseJsonBody(event) {
  if (!event.body) return null;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf8')
      : event.body;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function sanitizeFilename(name) {
  const base = String(name || 'file.bin').split(/[\\/]/).pop();
  const clean = base.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 120);
  return clean || 'file.bin';
}

function hmacToken(orderId, email) {
  const secret = process.env.HMAC_ORDER_SECRET;
  if (!secret) throw new Error('HMAC_ORDER_SECRET missing');
  return crypto.createHmac('sha256', secret).update(orderId + '|' + email).digest('hex');
}

async function supabaseInsert(row) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing');
  const res = await fetch(url.replace(/\/$/, '') + '/rest/v1/orders', {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: 'Bearer ' + key,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(row),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error('supabase insert ' + res.status + ': ' + text.slice(0, 300));
  }
  try {
    const arr = JSON.parse(text);
    return Array.isArray(arr) ? arr[0] : arr;
  } catch (e) {
    return null;
  }
}

function validate(body) {
  if (!body || typeof body !== 'object') return 'bad_json';
  const full_name = String(body.full_name || '').trim();
  const email = String(body.email || '').trim();
  const title = String(body.title || '').trim();
  const sha256 = String(body.sha256 || '').toLowerCase();
  const size_bytes = Number(body.size_bytes || 0);
  const filename = String(body.filename || '');

  if (!full_name || full_name.length > 200) return 'bad_full_name';
  if (!email || email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'bad_email';
  if (!title || title.length > 300) return 'bad_title';
  if (!/^[0-9a-f]{64}$/.test(sha256)) return 'bad_sha256';
  if (!Number.isFinite(size_bytes) || size_bytes <= 0) return 'bad_size';
  if (size_bytes > MAX_BYTES) return 'too_large';
  if (!filename) return 'bad_filename';

  return { full_name, email, title, sha256, size_bytes, filename };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });

  const parsed = parseJsonBody(event);
  const data = validate(parsed);
  if (typeof data === 'string') {
    if (data === 'too_large') {
      return reply(413, { ok: false, error: 'too_large', max: MAX_BYTES });
    }
    return reply(400, { ok: false, error: data });
  }

  try {
    const orderId = crypto.randomUUID();
    const token = hmacToken(orderId, data.email);
    const safeName = sanitizeFilename(data.filename);
    const fileKey = 'inbox/' + orderId + '/' + safeName;

    const uploadUrl = await getSignedUrl(
      getS3(),
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: fileKey,
        ContentType: 'application/octet-stream',
        ContentLength: data.size_bytes,
      }),
      { expiresIn: PRESIGN_PUT_TTL }
    );

    await supabaseInsert({
      id: orderId,
      hmac_token: token,
      email: data.email,
      full_name: data.full_name,
      title: data.title,
      sha256: data.sha256,
      size_bytes: data.size_bytes,
      file_key_r2: fileKey,
      status: 'pending_upload',
      price_gbp: PRICE_GBP,
    });

    return reply(200, {
      ok: true,
      order_id: orderId,
      hmac_token: token,
      upload_method: 'PUT',
      upload_url: uploadUrl,
      upload_headers: { 'Content-Type': 'application/octet-stream' },
      expires_in: PRESIGN_PUT_TTL,
      whydonate_url: 'https://whydonate.com/pay?mock_order=' + orderId,
      status_url: 'https://imarch.ltd/en/certify/status/?order_id=' + orderId + '&token=' + token,
    });
  } catch (e) {
    console.error('[order-create]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};