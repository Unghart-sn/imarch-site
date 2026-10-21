// Netlify Function: /.netlify/functions/gift-list
// Lists accounts, optionally filtered by ?type=service|test|real.
// Protected: requires GIFT_ADMIN_TOKEN header.
'use strict';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, X-Gift-Token',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};
const JSON_CT = { 'Content-Type': 'application/json' };

function reply(code, obj) {
  return {
    statusCode: code,
    headers: Object.assign({}, CORS, JSON_CT),
    body: JSON.stringify(obj),
  };
}

const ALLOWED_TYPES = new Set(['service', 'test', 'real']);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };
  if (event.httpMethod !== 'GET') return reply(405, { ok: false, error: 'method_not_allowed' });

  const adminToken = process.env.GIFT_ADMIN_TOKEN;
  if (!adminToken) return reply(500, { ok: false, error: 'GIFT_ADMIN_TOKEN_missing' });
  const hdr = event.headers['x-gift-token'] || event.headers['X-Gift-Token'];
  if (!hdr || hdr !== adminToken) return reply(403, { ok: false, error: 'forbidden' });

  const qs = event.queryStringParameters || {};
  const filterType = qs.type ? String(qs.type).trim() : '';
  if (filterType && !ALLOWED_TYPES.has(filterType)) {
    return reply(400, { ok: false, error: 'bad_type' });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return reply(500, { ok: false, error: 'supabase_env_missing' });

  try {
    // Supabase admin list: paginate per_page=1000, page=1..N
    const all = [];
    let page = 1;
    const perPage = 1000;
    for (;;) {
      const api = url.replace(/\/$/, '') + '/auth/v1/admin/users?page=' + page + '&per_page=' + perPage;
      const res = await fetch(api, {
        headers: {
          apikey: key,
          Authorization: 'Bearer ' + key,
          'Content-Type': 'application/json',
        },
      });
      const text = await res.text();
      if (!res.ok) return reply(500, { ok: false, error: 'supabase_admin', detail: text.slice(0, 300) });
      const json = JSON.parse(text);
      const users = Array.isArray(json.users) ? json.users : (Array.isArray(json) ? json : []);
      if (users.length === 0) break;
      all.push.apply(all, users);
      if (users.length < perPage) break;
      page += 1;
      if (page > 50) break;
    }

    const items = all
      .map((u) => {
        const meta = u.app_metadata || {};
        return {
          account_id: u.id,
          email: u.email,
          type: meta.type || null,
          label: meta.label || null,
          created_by: meta.created_by || null,
          created_at: u.created_at,
          last_sign_in_at: u.last_sign_in_at || null,
          email_confirmed_at: u.email_confirmed_at || null,
        };
      })
      .filter((u) => (filterType ? u.type === filterType : true))
      .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));

    return reply(200, {
      ok: true,
      filter_type: filterType || null,
      count: items.length,
      items,
    });
  } catch (e) {
    console.error('[gift-list]', e);
    return reply(500, { ok: false, error: 'internal' });
  }
};
