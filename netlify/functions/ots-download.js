// netlify/functions/ots-download.js
// Presigned GET for the OpenTimestamps proof (.ots) of a certificate.
// Usage: /.netlify/functions/ots-download?order_id=<uuid>
// Public by design: anyone holding the order_id (i.e. any owner of the PDF) may fetch the proof.
// The R2 bucket stays private; we hand out a 5-minute signed URL.

const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(body),
  };
}

function sbHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing');
  return { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' };
}

async function sbGetOrder(orderId) {
  const url = process.env.SUPABASE_URL;
  if (!url) throw new Error('SUPABASE_URL missing');
  const res = await fetch(
    url.replace(/\/$/, '') +
      '/rest/v1/orders?id=eq.' + encodeURIComponent(orderId) +
      '&select=id,status,anchor_key,anchor_status',
    { headers: sbHeaders() }
  );
  const text = await res.text();
  if (!res.ok) throw new Error('supabase get ' + res.status + ': ' + text.slice(0, 300));
  const arr = JSON.parse(text);
  return arr[0] || null;
}

let _s3 = null;
function getS3() {
  if (_s3) return _s3;
  _s3 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  return _s3;
}

exports.handler = async (event) => {
  try {
    const orderId = (event.queryStringParameters && event.queryStringParameters.order_id) || '';
    if (!UUID_RE.test(orderId)) return json(400, { error: 'invalid_order_id' });

    const order = await sbGetOrder(orderId);
    if (!order) return json(404, { error: 'not_found' });
    if (order.status !== 'ready' && order.status !== 'completed') return json(404, { error: 'not_found' });
    if (!order.anchor_key) return json(404, { error: 'no_anchor' });

    const signed = await getSignedUrl(
      getS3(),
      new GetObjectCommand({ Bucket: process.env.R2_BUCKET, Key: order.anchor_key }),
      { expiresIn: 300 }
    );

    return {
      statusCode: 302,
      headers: {
        Location: signed,
        'Cache-Control': 'no-store',
      },
      body: '',
    };
  } catch (e) {
    console.error('[ots-download] error:', e && e.message ? e.message : e);
    return json(500, { error: 'internal_error' });
  }
};