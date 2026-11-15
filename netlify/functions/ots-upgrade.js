const { parseOts, upgradeProof, writeOts } = require('zeitstempel');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createClient } = require('@supabase/supabase-js');

const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function s3() {
  return new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

exports.handler = async () => {
  console.log('[ots-upgrade] start');

  // ---------- 1. ORDERS (existing) ----------
  const { data: orders, error } = await sb
    .from('orders')
    .select('id, anchor_key')
    .eq('anchor_status', 'pending')
    .not('anchor_key', 'is', null);

  if (error) {
    console.error('supabase (orders):', error);
  } else if (!orders || orders.length === 0) {
    console.log('no pending order anchors');
  } else {
    console.log('pending orders:', orders.length);
    for (const order of orders) {
      try {
        const key = order.anchor_key;
        const get = await s3().send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
        const otsBytes = await streamToBuffer(get.Body);
        const ots = parseOts(otsBytes);
        const result = await upgradeProof(ots);

        if (result.upgraded > 0) {
          const upgraded = writeOts(ots);
          await s3().send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET, Key: key, Body: upgraded,
            ContentType: 'application/octet-stream',
          }));
          await sb.from('orders').update({ anchor_status: 'confirmed' }).eq('id', order.id);
          console.log('order upgraded:', order.id);
        } else if (result.stillPending > 0) {
          console.log('order still pending:', order.id);
        } else if (result.alreadyComplete) {
          await sb.from('orders').update({ anchor_status: 'confirmed' }).eq('id', order.id);
          console.log('order already complete:', order.id);
        }
      } catch (e) {
        console.error('order fail', order.id, e.message);
      }
    }
  }

  // ---------- 2. AUDIT SNAPSHOTS (new) ----------
  // TODO: ots_block_height / ots_block_time leave null for now.
  // Enrich later via blockstream.info using txid from the OTS file.
  const { data: snaps, error: snapErr } = await sb
    .from('audit_snapshots')
    .select('snapshot_date, ots_key')
    .eq('ots_status', 'pending')
    .not('ots_key', 'is', null);

  if (snapErr) {
    console.error('supabase (snapshots):', snapErr);
  } else if (!snaps || snaps.length === 0) {
    console.log('no pending snapshots');
  } else {
    console.log('pending snapshots:', snaps.length);
    for (const snap of snaps) {
      try {
        const key = snap.ots_key;
        const get = await s3().send(new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: key }));
        const otsBytes = await streamToBuffer(get.Body);
        const ots = parseOts(otsBytes);
        const result = await upgradeProof(ots);

        if (result.upgraded > 0) {
          const upgraded = writeOts(ots);
          await s3().send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET, Key: key, Body: upgraded,
            ContentType: 'application/octet-stream',
          }));
          await sb.from('audit_snapshots')
            .update({ ots_status: 'confirmed' })
            .eq('snapshot_date', snap.snapshot_date);
          console.log('snapshot upgraded:', snap.snapshot_date);
        } else if (result.stillPending > 0) {
          console.log('snapshot still pending:', snap.snapshot_date);
        } else if (result.alreadyComplete) {
          await sb.from('audit_snapshots')
            .update({ ots_status: 'confirmed' })
            .eq('snapshot_date', snap.snapshot_date);
          console.log('snapshot already complete:', snap.snapshot_date);
        }
      } catch (e) {
        console.error('snapshot fail', snap.snapshot_date, e.message);
      }
    }
  }

  return { statusCode: 200 };
};