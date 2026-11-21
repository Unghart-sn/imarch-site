// netlify/functions/collegium.js
// Коллегиум: форма B2B-запроса -> письмо через Resend.
// Lambda-стиль, как остальные функции в этой папке.

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RESEND_FROM = process.env.RESEND_FROM || 'info@imarch.ltd';
const COLLEGIUM_TO = process.env.COLLEGIUM_TO || 'info@imarch.ltd';

const ALLOWED_ORIGINS = [
  'https://imarch.ltd',
  'https://www.imarch.ltd',
  'http://localhost:8888',
  'http://localhost:1313',
];

function corsHeaders(event) {
  const h = event.headers || {};
  const origin = h.origin || h.Origin || '';
  const allow = ALLOWED_ORIGINS.indexOf(origin) !== -1 ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Origin',
  };
}

function reply(event, statusCode, body) {
  return { statusCode: statusCode, headers: corsHeaders(event), body: JSON.stringify(body) };
}

var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return reply(event, 405, { ok: false, error: 'method' });
  }

  var payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return reply(event, 400, { ok: false, error: 'json' });
  }

  var email = payload && payload.email;
  var org = (payload && payload.org) || '';
  var message = (payload && payload.message) || '';
  var source = (payload && payload.source) || '';
  var trap = payload && payload.trap;

  // honeypot: поле скрыто от человека, бот его заполнит
  if (trap) {
    return reply(event, 200, { ok: true });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return reply(event, 400, { ok: false, error: 'email' });
  }

  email = email.trim();
  org = typeof org === 'string' ? org.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';

  if (email.length > 200 || org.length > 200 || message.length > 5000) {
    return reply(event, 400, { ok: false, error: 'too_long' });
  }

  var key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('collegium: RESEND_API_KEY is not set');
    return reply(event, 500, { ok: false, error: 'config' });
  }

  var h = event.headers || {};
  var ip = h['x-nf-client-connection-ip'] || h['x-forwarded-for'] || '';
  var ua = h['user-agent'] || '';

  var text = [
    'Организация: ' + (org || '—'),
    'Почта: ' + email,
    'Источник: ' + (source || '—'),
    'IP: ' + (String(ip).split(',')[0].trim() || '—'),
    'UA: ' + (ua || '—'),
    'Время: ' + new Date().toISOString(),
    '',
    message || '(без сообщения)',
  ].join('\n');

  var res;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [COLLEGIUM_TO],
        reply_to: email,
        subject: 'Коллегиум: ' + (org || email),
        text: text,
      }),
    });
  } catch (err) {
    console.error('collegium: fetch failed', err && err.message);
    return reply(event, 502, { ok: false, error: 'network' });
  }

  if (!res.ok) {
    var detail = await res.text().catch(function () { return ''; });
    console.error('collegium: resend rejected', res.status, detail);
    return reply(event, 502, { ok: false, error: 'send' });
  }

  return reply(event, 200, { ok: true });
};