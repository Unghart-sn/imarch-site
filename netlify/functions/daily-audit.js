// Netlify Function: /.netlify/functions/daily-audit
// Scheduled: @daily (UTC 03:00). Idempotent: skips if today's snapshot exists & not errored.
'use strict';
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');
const { stampHash } = require('zeitstempel');

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

function getSB() {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}

exports.handler = async (event) => {
  const sb = getSB();
  const date = todayUTC();
  const trace = [];

  try {
    // 1. Idempotency: если snapshot уже есть и не errored  выходим
    const existing = await sb
      .from('audit_snapshots')
      .select('id, ots_status')
      .eq('snapshot_date', date)
      .maybeSingle();

    if (existing.error) {
      trace.push('select_failed ' + existing.error.message);
      return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
    }

    if (existing.data && existing.data.ots_status !== 'error') {
      trace.push('skip_existing status=' + existing.data.ots_status);
      return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: true, date, trace }) };
    }

    // 2. Проверяем цепочку
    const chainRes = await sb.rpc('audit_verify_chain');
    if (chainRes.error) {
      trace.push('chain_failed ' + chainRes.error.message);
      return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
    }
    const chain = chainRes.data || {};
    if (!chain.ok) {
      trace.push('chain_broken at seq ' + chain.broken_at_seq);
      return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
    }
    trace.push('chain_ok checked=' + chain.checked);

    // 3. Считаем балансы
    const profRes = await sb.from('profiles').select('is_treasury, token_balance, promo_balance');
    if (profRes.error) {
      trace.push('profiles_failed ' + profRes.error.message);
      return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
    }
    let total = 0, treasury = 0, users = 0;
    (profRes.data || []).forEach(function (p) {
      const b = (p.token_balance || 0) + (p.promo_balance || 0);
      total += b;
      if (p.is_treasury) treasury += b; else users += b;
    });
    trace.push('balances total=' + total + ' treasury=' + treasury + ' users=' + users);

    // 4. Upsert snapshot (pending)
    const upsertRes = await sb
      .from('audit_snapshots')
      .upsert(
        {
          snapshot_date: date,
          chain_head: chain.head,
          chain_length: chain.checked,
          total_balance: total,
          treasury_balance: treasury,
          users_balance: users,
          ots_status: 'pending',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'snapshot_date' }
      )
      .select()
      .single();

    if (upsertRes.error) {
      trace.push('upsert_failed ' + upsertRes.error.message);
      return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
    }
    trace.push('snapshot_saved id=' + upsertRes.data.id);

    // 5. OTS stamp + R2
    let otsKey = null;
    try {
      const otsBytes = await stampHash(chain.head);
      otsKey = 'audit/snapshots/' + date + '.ots';
      await getS3().send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: otsKey,
          Body: otsBytes,
          ContentType: 'application/octet-stream',
        })
      );
      await sb
        .from('audit_snapshots')
        .update({ ots_status: 'pending', ots_key: otsKey, updated_at: new Date().toISOString() })
        .eq('id', upsertRes.data.id);
      trace.push('ots_stamped size=' + otsBytes.length + ' key=' + otsKey);
    } catch (e) {
      await sb
        .from('audit_snapshots')
        .update({ ots_status: 'error', updated_at: new Date().toISOString() })
        .eq('id', upsertRes.data.id);
      trace.push('ots_error ' + String(e && e.message || e));
      return { statusCode: 500, body: JSON.stringify({ ok: false, date, trace }) };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true, date, trace }) };
  } catch (e) {
    trace.push('fatal ' + String(e && e.message || e));
    return { statusCode: 500, body: JSON.stringify({ ok: false, trace }) };
  }
};