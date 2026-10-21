// Netlify Function: /.netlify/functions/cert-download
// GET ?order_id=<uuid>&token=<hmac_hex>
// Streams the Act-Passport PDF from R2 after HMAC verification.
'use strict';

const crypto = require('crypto');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

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
  return { statusCode: code, headers: Object.assign({}, CORS, { 'Content-Type': 'application/json' }), body: JSON.stringify(obj) };
}

function hmacToken(orderId, email) {
  const secret = process.env.HMAC_ORDER_SECRET;
  if (!secret) throw new Error('HMAC_ORDER_SECRET missing');
  return crypto.createHmac('sha256', secret).update(orderId + '|' + email).digest('hex');
}

function sbHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
  return { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' };
}

async function sbGetOrder(orderId) {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL missing');
  const res = await fetch(url.replace(/\/$/, '') + '/rest/v1/orders?id=eq.' + encodeURIComponent(orderId) + '&select=*', { headers: sbHeaders() });
  const text = await res.text();
  if (!res.ok) throw new Error('supabase get ' + res.status + ': ' + text.slice(0, 300));
  const arr = JSON.parse(text);
  return Array.isArray(arr) ? arr[0] : null;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'GET') return reply(405, { ok: false, error: 'method_not_allowed' });

  const qs = event.queryStringParameters || {};
  const orderId = String(qs.order_id || '').trim();
  const token = String(qs.token || '').trim();
  if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) return reply(400, { ok: false, error: 'bad_order_id' });
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return reply(400, { ok: false, error: 'bad_token' });

  try {
    const order = await sbGetOrder(orderId);
    if (!order) return reply(404, { ok: false, error: 'order_not_found' });
    if (order.status !== 'ready') return reply(409, { ok: false, error: 'not_ready', current: order.status });

    const expected = hmacToken(order.id, order.email);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return reply(403, { ok: false, error: 'bad_hmac' });
    }

    const key = 'certs/' + orderId + '/passport.pdf';
    const obj = await getS3().send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
    const buf = Buffer.from(await obj.Body.transformToByteArray());

    return {
      statusCode: 200,
      headers: Object.assign({}, CORS, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="act-passport-' + orderId.slice(0, 8) + '.pdf"',
        'Content-Length': String(buf.length),
        'Cache-Control': 'private, no-store',
      }),
      body: buf.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (e) {
    console.error('[cert-download]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};
