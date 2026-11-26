const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const WHYDONATE_URL = 'https://whydonate.com/fundraising/vis-realitatis-preserving-memory';
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(statusCode, payload) {
  return {
    statusCode: statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(payload)
  };
}

function getBearerToken(event) {
  const headers = event.headers || {};
  const raw = headers.authorization || headers.Authorization || '';
  const match = /^Bearer\s+(.+)$/i.exec(String(raw).trim());
  return match ? match[1].trim() : null;
}

async function requireUser(event) {
  const token = getBearerToken(event);
  if (!token) return { response: json(401, { error: 'Unauthorized' }) };
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data || !data.user || !data.user.id) {
    return { response: json(401, { error: 'Unauthorized' }) };
  }
  return { user: data.user };
}

function logInternal(scope, err) {
  console.error('topup-request ' + scope + ':', (err && (err.stack || err.message || err)) || 'unknown');
}

async function handleCreate(event, body) {
  const auth = await requireUser(event);
  if (auth.response) return auth.response;
  const user = auth.user;

  const amt = parseInt(body.amount_gbp, 10);
  if (!Number.isFinite(amt) || amt < 1 || amt > 100000) {
    return json(400, { error: 'Invalid amount' });
  }

  const purpose = (typeof body.purpose === 'string' && body.purpose.trim())
    ? body.purpose.trim().slice(0, 64)
    : 'topup';
  const refCode = 'VR-' + crypto.randomBytes(2).toString('hex').toUpperCase();

  const { data, error } = await supabase
    .from('donation_intents')
    .insert({
      user_id: user.id,
      amount_gbp: amt,
      micro_tokens: amt,
      ref_code: refCode,
      purpose: purpose,
      status: 'pending'
    })
    .select('id, ref_code')
    .single();

  if (error || !data) {
    logInternal('create insert failed', error);
    return json(500, { error: 'Could not create contribution request' });
  }

  return json(200, {
    intent_id: data.id,
    ref_code: data.ref_code,
    whydonate_url: WHYDONATE_URL
  });
}

async function handleMarkPaid(event, body) {
  const auth = await requireUser(event);
  if (auth.response) return auth.response;
  const user = auth.user;

  const intentId = (typeof body.intent_id === 'string') ? body.intent_id.trim() : '';
  if (!intentId) return json(400, { error: 'Missing intent_id' });
  if (!UUID_RE.test(intentId)) return json(404, { error: 'Contribution request not found' });

  const { data: intent, error } = await supabase
    .from('donation_intents')
    .select('id, user_id, status')
    .eq('id', intentId)
    .maybeSingle();

  if (error) {
    logInternal('mark_paid lookup failed', error);
    return json(500, { error: 'Could not verify contribution request' });
  }
  if (!intent) return json(404, { error: 'Contribution request not found' });
  if (String(intent.user_id) !== String(user.id)) return json(403, { error: 'Forbidden' });

  if (intent.status && intent.status !== 'pending') {
    return json(200, { status: intent.status });
  }

  const { data: updated, error: updateError } = await supabase
    .from('donation_intents')
    .update({ status: 'verifying', updated_at: new Date().toISOString() })
    .eq('id', intentId)
    .eq('user_id', user.id)
    .eq('status', 'pending')
    .select('id, status')
    .maybeSingle();

  if (updateError) {
    logInternal('mark_paid update failed', updateError);
    return json(500, { error: 'Could not update contribution request' });
  }

  if (!updated) {
    const { data: current } = await supabase
      .from('donation_intents')
      .select('status')
      .eq('id', intentId)
      .eq('user_id', user.id)
      .maybeSingle();
    return json(200, { status: (current && current.status) || 'pending' });
  }

  return json(200, { status: updated.status || 'verifying' });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return json(400, { error: 'Invalid JSON body' });
  }
  if (!body || typeof body !== 'object') body = {};

  try {
    if (body.action === 'create') return await handleCreate(event, body);
    if (body.action === 'mark_paid') return await handleMarkPaid(event, body);
    return json(400, { error: 'Unknown action' });
  } catch (err) {
    logInternal('unhandled error', err);
    return json(500, { error: 'Server error' });
  }
};
