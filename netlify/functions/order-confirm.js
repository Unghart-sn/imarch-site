// Netlify Function: /.netlify/functions/order-confirm
'use strict';
const crypto = require('crypto');
const { S3Client, HeadObjectCommand } = require('@aws-sdk/client-s3');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

function reply(code, obj) {
  return { statusCode: code, headers: Object.assign({}, CORS, JSON_CT), body: JSON.stringify(obj) };
}

function parseJsonBody(event) {
  if (!event.body) return null;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
    return JSON.parse(raw);
  } catch (e) { return null; }
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

async function sbPatchStatus(orderId, status) {
  const url = process.env.SUPABASE_URL;
  const res = await fetch(url.replace(/\/$/, '') + '/rest/v1/orders?id=eq.' + encodeURIComponent(orderId), {
    method: 'PATCH',
    headers: Object.assign({}, sbHeaders(), { Prefer: 'return=minimal' }),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error('supabase patch ' + res.status + ': ' + text.slice(0, 300));
  }
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

    const expected = hmacToken(order.id, order.email);
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(token, 'hex');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return reply(403, { ok: false, error: 'bad_hmac' });
    }

    if (order.status === 'completed' || order.payment_method === 'admin_bypass' || order.payment_method === 'token') {
      try {
        const baseUrl = process.env.URL || 'https://imarch.ltd';
        const pdfRes = await fetch(baseUrl + '/.netlify/functions/order-process', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Token': process.env.GIFT_ADMIN_TOKEN },
          body: JSON.stringify({ order_id: order.id })
        });
        const pdfText = await pdfRes.text();
        let parsed = {};
        try { parsed = JSON.parse(pdfText); } catch(e) {}
        
        if (!pdfRes.ok || !parsed.ok) {
          return reply(500, { ok: false, error: 'pdf_generation_failed', details: pdfText.slice(0, 500) });
        }
        
        // Собираем правильный URL на сервере
        const statusUrl = `https://imarch.ltd/en/certify/status/?order_id=${order.id}&token=${order.hmac_token}`;
        
        return reply(200, { 
          ok: true, 
          status: 'completed', 
          payment_method: order.payment_method, 
          pdf_processing: true, 
          pdf_response: parsed,
          status_url: statusUrl
        });
        
      } catch (err) {
        return reply(500, { ok: false, error: 'pdf_fetch_error', details: err.message });
      }
    }

    if (order.status !== 'pending_upload') {
      return reply(200, { ok: true, status: order.status, idempotent: true });
    }

    await sbPatchStatus(orderId, 'payment_pending');
    return reply(200, { ok: true, status: 'payment_pending' });
  } catch (e) {
    console.error('[order-confirm]', e);
    return reply(500, { ok: false, error: 'internal', details: String(e && e.message || e) });
  }
};