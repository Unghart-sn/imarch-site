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
  const { data: orders, error } = await sb
    .from('orders')
    .select('id, anchor_key')
    .eq('anchor_status', 'pending')
    .not('anchor_key', 'is', null);

  if (error) { console.error('supabase:', error); return { statusCode: 500 }; }
  if (!orders || orders.length === 0) { console.log('no pending anchors'); return { statusCode: 200 }; }

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
        console.log('upgraded:', order.id);
      } else if (result.stillPending > 0) {
        console.log('still pending:', order.id);
      } else if (result.alreadyComplete) {
        await sb.from('orders').update({ anchor_status: 'confirmed' }).eq('id', order.id);
        console.log('already complete:', order.id);
      }
    } catch (e) {
      console.error('fail', order.id, e.message);
    }
  }
  return { statusCode: 200 };
};
