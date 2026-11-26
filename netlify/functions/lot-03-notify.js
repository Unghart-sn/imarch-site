// netlify/functions/lot-03-notify.js
// Уведомление о заявке по Лоту N03 (PASSPORT-PACK) на почту через Resend.
// Принимает: JSON от клиента (lot03-form.js) ИЛИ outgoing webhook Netlify Forms.
'use strict';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const RESEND_FROM = process.env.RESEND_FROM || 'info@imarch.ltd';
const NOTIFY_TO = process.env.LOT03_TO || process.env.COLLEGIUM_TO || 'info@imarch.ltd';
const TOKEN = process.env.LOT03_NOTIFY_TOKEN || '';

const ALLOWED_ORIGINS = [
  'https://imarch.ltd',
  'https://www.imarch.ltd',
  'http://localhost:8888',
  'http://localhost:1313',
];

const TASK_LABELS = {
  conference_talk: 'Доклад на конференции',
  grant_pitch: 'Грантовый питч',
  video_abstract: 'Video abstract',
  b2b_briefing: 'B2B-брифинг',
  batch_pack: 'Пакетная сборка',
};

const VOICE_LABELS = {
  full_cycle: 'Полный цикл (текст + озвучка)',
  slides_only: 'Только слайды/сцены',
  tbd: 'Уточняется',
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

function corsHeaders(event) {
  const h = event.headers || {};
  const origin = h.origin || h.Origin || '';
  const allow = ALLOWED_ORIGINS.indexOf(origin) !== -1 ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'content-type, x-lot03-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
    'Vary': 'Origin',
  };
}

function reply(event, code, obj) {
  return { statusCode: code, headers: corsHeaders(event), body: JSON.stringify(obj) };
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clip(s, n) {
  const v = String(s == null ? '' : s).trim();
  return v.length > n ? v.slice(0, n) + '...' : v;
}

function pick(obj, keys) {
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (obj && obj[k] !== undefined && obj[k] !== null && String(obj[k]).trim() !== '') {
      return String(obj[k]);
    }
  }
  return '';
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
  if (!raw) return {};
  if (raw.trim().charAt(0) === '{') {
    try { return JSON.parse(raw); } catch (e) { return {}; }
  }
  const out = {};
  raw.split('&').forEach(function (pair) {
    if (!pair) return;
    const i = pair.indexOf('=');
    const k = decodeURIComponent((i === -1 ? pair : pair.slice(0, i)).replace(/\+/g, ' '));
    const v = i === -1 ? '' : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
    out[k] = v;
  });
  return out;
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(event), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return reply(event, 405, { ok: false, error: 'method' });
  }

  if (TOKEN) {
    const h = event.headers || {};
    const given = (event.queryStringParameters && event.queryStringParameters.token)
      || h['x-lot03-token'] || h['X-Lot03-Token'] || '';
    if (given !== TOKEN) {
      console.warn('lot-03-notify: bad token');
      return reply(event, 401, { ok: false, error: 'auth' });
    }
  }

  const payload = parseBody(event);

  // Netlify Forms webhook кладёт поля в payload.data, клиент шлёт плоско
  const data = (payload && typeof payload.data === 'object' && payload.data !== null)
    ? payload.data
    : payload;

  const trap = pick(data, ['bot-field', 'botField', 'trap']);
  if (trap) {
    return reply(event, 200, { ok: true, skipped: 'honeypot' });
  }

  const name = clip(pick(data, ['applicant_name', 'name']), 200);
  const org = clip(pick(data, ['organization', 'org']), 200);
  const contact = clip(pick(data, ['contact_channel', 'email']), 254);
  const taskTypeRaw = pick(data, ['task_type']);
  const langs = clip(pick(data, ['languages', 'langs']), 200);
  const voiceRaw = pick(data, ['voiceover_mode', 'voiceover']);
  const deadline = clip(pick(data, ['deadline']), 100);
  const sourceLink = clip(pick(data, ['source_link']), 2000);
  const notes = clip(pick(data, ['task_notes', 'message', 'comment']), 5000);
  const lotId = clip(pick(data, ['lot_id']), 100);
  const consent = pick(data, ['consent']);

  if (!name && !contact) {
    return reply(event, 400, { ok: false, error: 'empty' });
  }

  const taskType = TASK_LABELS[taskTypeRaw] || taskTypeRaw || '—';
  const voice = VOICE_LABELS[voiceRaw] || voiceRaw || '—';

  const h = event.headers || {};
  const ip = String(h['x-nf-client-connection-ip'] || h['x-forwarded-for'] || '').split(',')[0].trim();
  const ua = h['user-agent'] || '';
  const now = new Date().toISOString();

  const rows = [
    ['Заявитель', name || '—'],
    ['Организация', org || '—'],
    ['Связь', contact || '—'],
    ['Тип задачи', taskType],
    ['Языки', langs || '—'],
    ['Режим озвучки', voice],
    ['Дедлайн', deadline || '—'],
    ['Ссылка на материалы', sourceLink || '—'],
    ['Согласие', consent === 'yes' ? 'получено' : (consent || '—')],
    ['Лот', lotId || 'LOT-03-PRESENTATION-PASSPORT'],
  ];

  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n')
    + '\n\nЗадача:\n' + (notes || '(без описания)')
    + '\n\n---\nВремя: ' + now
    + '\nIP: ' + (ip || '—')
    + '\nUA: ' + (ua || '—');

  const trs = rows.map(function (r) {
    return '<tr>'
      + '<td style="padding:7px 12px;border-bottom:1px solid #eee;color:#6a5a48;font-size:13px;white-space:nowrap;vertical-align:top">' + esc(r[0]) + '</td>'
      + '<td style="padding:7px 12px;border-bottom:1px solid #eee;color:#2c2416;font-size:13px">' + esc(r[1]) + '</td>'
      + '</tr>';
  }).join('');

  const html = '<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;background:#fdfaf5;border:1px solid #e0d6c8;border-radius:14px;overflow:hidden">'
    + '<div style="background:#2c2416;color:#fdfaf5;padding:16px 20px">'
    + '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.7">IMARCH LTD / Chronicle OS</div>'
    + '<div style="font-size:17px;margin-top:4px">Новая заявка по Лоту №03 — PASSPORT-PACK</div>'
    + '</div>'
    + '<table style="width:100%;border-collapse:collapse;background:#fff">' + trs + '</table>'
    + '<div style="padding:16px 20px;background:#fff;border-top:1px solid #eee">'
    + '<div style="font-size:12px;color:#6a5a48;margin-bottom:6px">Описание задачи</div>'
    + '<div style="font-size:14px;color:#2c2416;line-height:1.6;white-space:pre-wrap">' + esc(notes || '(без описания)') + '</div>'
    + '</div>'
    + '<div style="padding:12px 20px;font-size:11px;color:#8a7a68;background:#faf6ef">'
    + esc(now) + ' &middot; IP ' + esc(ip || '—') + '<br>' + esc(clip(ua, 160) || '—')
    + '</div>'
    + '</div>';

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error('lot-03-notify: RESEND_API_KEY is not set');
    return reply(event, 500, { ok: false, error: 'config' });
  }

  const mail = {
    from: RESEND_FROM,
    to: [NOTIFY_TO],
    subject: 'Лот №03: ' + (org || name || 'новая заявка') + (deadline ? ' / дедлайн ' + deadline : ''),
    text: text,
    html: html,
  };
  if (EMAIL_RE.test(contact)) mail.reply_to = contact;

  let res;
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify(mail),
    });
  } catch (err) {
    console.error('lot-03-notify: fetch failed', err && err.message);
    return reply(event, 502, { ok: false, error: 'network' });
  }

  if (!res.ok) {
    const detail = await res.text().catch(function () { return ''; });
    console.error('lot-03-notify: resend rejected', res.status, detail);
    return reply(event, 502, { ok: false, error: 'send' });
  }

  return reply(event, 200, { ok: true, to: NOTIFY_TO });
};
