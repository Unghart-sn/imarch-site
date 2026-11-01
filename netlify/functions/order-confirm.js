// Netlify Function: /.netlify/functions/order-confirm
// Verifies HMAC + confirms that the file actually landed in R2.
// Transitions pending_upload -> payment_pending. Idempotent.
'use strict';

const crypto = require('crypto');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

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

function hmacToken(orderId, email) {
  const secret = process.env.HMAC_ORDER_SECRET;
  if (!secret) throw new Error('HMAC_ORDER_SECRET missing');
  return crypto.createHmac('sha256', secret).update(orderId + '|' + email).digest('hex');
}

function sbHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
  return {
    apikey: key,
    Authorization: 'Bearer ' + key,
    'Content-Type': 'application/json',
  };
}

async function sbGetOrder(orderId) {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL missing');
  const res = await fetch(
    url.replace(/\/$/, '') + '/rest/v1/orders?id=eq.' + encodeURIComponent(orderId) + '&select=*',
    { headers: sbHeaders() }
  );
  const text = await res.text();
  if (!res.ok) throw new Error('supabase get ' + res.status + ': ' + text.slice(0, 300));
  const arr = JSON.parse(text);
  return Array.isArray(arr) ? arr[0] : null;
}

async function sbPatchStatus(orderId, status) {
  const url = process.env.SUPABASE_URL;
  const res = await fetch(
    url.replace(/\/$/, '') + '/rest/v1/orders?id=eq.' + encodeURIComponent(orderId),
    {
      method: 'PATCH',
      headers: Object.assign({}, sbHeaders(), { Prefer: 'return=minimal' }),
      body: JSON.stringify({ status }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error('supabase patch ' + res.status + ': ' + text.slice(0, 300));
  }
}

function whydonateUrlFor(orderId) {
  // mock until real WhyDonate campaign exists
  return 'https://whydonate.com/pay?mock_order=' + orderId;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });

  const body = parseJsonBody(event);
  const orderId = body && String(body.order_id || '').trim();
  const token = body && String(body.hmac_token || '').trim();
  if (!orderId || !/^[0-9a-f-]{36}$/i.test(orderId)) return reply(400, { ok: false, error: 'bad_order_id' });
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return reply(400, { ok: false, error: 'bad_token' });

  try {
    const order = await sbGetOrder(orderId);
    if (!order) return reply(404, { ok: false, error: 'order_not_found' });

    // HMAC check: recompute from id|email and compare to stored token
    const expected = hmacToken(order.id, order.email);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return reply(403, { ok: false, error: 'bad_hmac' });
    }
    if (order.hmac_token && order.hmac_token !== token) {
      return reply(403, { ok: false, error: 'token_mismatch' });
    }

    // Idempotent: already past pending_upload?
    if (order.status !== 'pending_upload') {
      return reply(200, {
        ok: true,
        status: order.status,
        whydonate_url: whydonateUrlFor(order.id),
        idempotent: true,
      });
    }

    // Verify the object actually exists in R2
    try {
      await getS3().send(
        new HeadObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: order.file_key_r2,
        })
      );
    } catch (e) {
      return reply(409, { ok: false, error: 'file_not_uploaded' });
    }

    await sbPatchStatus(orderId, 'payment_pending');

    return reply(200, {
      ok: true,
      status: 'payment_pending',
      whydonate_url: whydonateUrlFor(orderId),
    });
  } catch (e) {
    console.error('[order-confirm]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};
