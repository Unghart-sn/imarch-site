// Netlify Function: /.netlify/functions/order-status
// GET ?order_id=<uuid>&token=<hmac_hex>
// Returns public status of the order. HMAC binds id|email.
'use strict';

const crypto = require('crypto');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

function reply(code, obj) {
  return { statusCode: code, headers: Object.assign({}, CORS, JSON_CT), body: JSON.stringify(obj) };
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

const PUBLIC_STATUSES = new Set(['pending_upload', 'payment_pending', 'processing', 'ready', 'error']);

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

    const expected = hmacToken(order.id, order.email);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return reply(403, { ok: false, error: 'bad_hmac' });
    }

    const status = PUBLIC_STATUSES.has(order.status) ? order.status : 'unknown';
    const safe = {
      ok: true,
      order_id: order.id,
      status,
      title: order.title,
      full_name: order.full_name,
      email: order.email ? order.email.replace(/^(.).*(@.*)$/, function (_, a, b) { return a + '***' + b; }) : null,
      sha256: order.sha256,
      size_bytes: order.size_bytes,
      created_at: order.created_at || null,
      processed_at: order.processed_at || null,
      tsa_status: order.tsa_status || 'pending',
      anchor_status: order.anchor_status || 'pending',
      vt_status: order.vt_status || 'pending',
      pdf_url: order.pdf_url || null,
    };
    return reply(200, safe);
  } catch (e) {
    console.error('[order-status]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};
