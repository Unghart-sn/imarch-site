// Netlify Function: /.netlify/functions/gift-create
// Creates a service/test/real account via Supabase Admin API.
// Protected: requires GIFT_ADMIN_TOKEN header.
'use strict';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Gift-Token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

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

const ALLOWED_TYPES = new Set(['service', 'test', 'real']);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });

  const adminToken = process.env.GIFT_ADMIN_TOKEN;
  if (!adminToken) return reply(500, { ok: false, error: 'GIFT_ADMIN_TOKEN_missing' });
  const hdr = event.headers['x-gift-token'] || event.headers['X-Gift-Token'];
  if (!hdr || hdr !== adminToken) return reply(403, { ok: false, error: 'forbidden' });

  const body = parseJsonBody(event);
  const email = body && String(body.email || '').trim().toLowerCase();
  const password = body && String(body.password || '');
  const type = body && String(body.type || '').trim();
  const label = body && String(body.label || '').trim().slice(0, 100);

  if (!email || email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return reply(400, { ok: false, error: 'bad_email' });
  }
  if (!password || password.length < 12) return reply(400, { ok: false, error: 'bad_password_min12' });
  if (!ALLOWED_TYPES.has(type)) return reply(400, { ok: false, error: 'bad_type' });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return reply(500, { ok: false, error: 'supabase_env_missing' });

  try {
    const res = await fetch(url.replace(/\/$/, '') + '/auth/v1/admin/users', {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        app_metadata: { type, label: label || null, created_by: 'gift-create' },
      }),
    });
    const text = await res.text();
    if (!res.ok) {
      let parsed = null;
      try { parsed = JSON.parse(text); } catch (_) {}
      const msg = parsed && (parsed.msg || parsed.message || parsed.error_description) || text.slice(0, 300);
      return reply(400, { ok: false, error: 'supabase_admin', detail: msg });
    }
    const user = JSON.parse(text);
    return reply(200, {
      ok: true,
      account_id: user.id,
      email: user.email,
      type,
      label: label || null,
      created_at: user.created_at,
    });
  } catch (e) {
    console.error('[gift-create]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};
