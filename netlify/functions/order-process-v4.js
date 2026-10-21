const { S3Client, HeadObjectCommand, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const http = require('http');
const https = require('https');
const crypto = require('crypto');

// --- Feature Flags & Config ---
const RFC3161_ENABLED = process.env.TSA_ENABLED !== 'false';
const ANCHOR_ENABLED = process.env.ANCHOR_ENABLED === 'true';
const VT_ENABLED = process.env.VT_ENABLED === 'true';

const TSA_URL = process.env.RFC3161_TSA_URL || 'http://timestamp.digicert.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_FROM = process.env.RESEND_FROM || 'IMARCH <no-reply@imarch.ltd>';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

function reply(statusCode, data) {
  return {
    statusCode,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

// --- S3 / R2 Client ---
function getS3() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const endpoint = process.env.R2_ENDPOINT || (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined);
  return new S3Client({
    region: 'auto',
    endpoint: endpoint,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  });
}

// --- Supabase REST Helpers ---
async function sbGetOrder(orderId) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}&select=*`;
  const res = await fetch(url, {
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase GET failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();
  return rows && rows.length ? rows[0] : null;
}

async function sbPatchOrder(orderId, patch) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${encodeURIComponent(orderId)}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`Supabase PATCH failed: ${res.status} ${await res.text()}`);
  return await res.json();
}

// --- ASN.1 / DER Helpers for RFC 3161 ---
function derLen(len) {
  if (len < 128) return Buffer.from([len]);
  if (len < 256) return Buffer.from([0x81, len]);
  return Buffer.from([0x82, (len >> 8) & 0xff, len & 0xff]);
}

function derTLV(tag, payload) {
  return Buffer.concat([Buffer.from([tag]), derLen(payload.length), payload]);
}

function derInt(num) {
  let buf = Buffer.alloc(4);
  buf.writeUInt32BE(num, 0);
  let i = 0;
  while (i < buf.length - 1 && buf[i] === 0) i++;
  buf = buf.slice(i);
  if (buf[0] & 0x80) buf = Buffer.concat([Buffer.from([0x00]), buf]);
  return derTLV(0x02, buf);
}

function derOid(oidStr) {
  const parts = oidStr.split('.').map(Number);
  const bytes = [parts[0] * 40 + parts[1]];
  for (let i = 2; i < parts.length; i++) {
    let val = parts[i];
    let buf = [];
    buf.push(val & 0x7f);
    while ((val >>= 7) > 0) {
      buf.push((val & 0x7f) | 0x80);
    }
    buf.reverse();
    bytes.push(...buf);
  }
  return derTLV(0x06, Buffer.from(bytes));
}

function buildTimeStampRequest(sha256Hex) {
  const hashBytes = Buffer.from(sha256Hex, 'hex');
  const algId = derTLV(0x30, derOid('2.16.840.1.101.3.4.2.1')); // SHA-256
  const messageImprint = derTLV(0x30, Buffer.concat([algId, derTLV(0x04, hashBytes)]));
  const nonce = derInt(Math.floor(Math.random() * 1000000000));
  const certReq = derTLV(0x01, Buffer.from([0xff])); // TRUE
  const reqBody = Buffer.concat([derInt(1), messageImprint, nonce, certReq]);
  return derTLV(0x30, reqBody);
}

function parseTimeStampResponse(derBuf) {
  const str = derBuf.toString('binary');
  const pdfTagIndex = str.indexOf('\x30\x82');
  if (pdfTagIndex !== -1) {
    return derBuf.slice(pdfTagIndex);
  }
  return derBuf;
}

function requestTimestamp(tsaUrl, reqDer) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(tsaUrl);
    const transport = urlObj.protocol === 'https:' ? https : http;
    const req = transport.request(
      tsaUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/timestamp-query',
          'Content-Length': reqDer.length,
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const body = Buffer.concat(chunks);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(body);
          } else {
            reject(new Error(`TSA HTTP ${res.statusCode}: ${body.toString('utf8')}`));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(reqDer);
    req.end();
  });
}

// --- Passport PDF Generation ---
async function makePassportPDF(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks = [];
      doc.on('data', (c) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      const verifyUrl = `https://imarch.ltd/en/certify/status/?order_id=${order.id}`;
      const qrDataUrl = await QRCode.toDataURL(verifyUrl, { margin: 1, width: 120 });
      const qrBuffer = Buffer.from(qrDataUrl.split(',')[1], 'base64');

      doc.fontSize(20).text('EXPERT CERTIFICATE / ACT-PASSPORT', { align: 'center' });
      doc.moveDown();
      doc.fontSize(10).text(`Certificate ID: ${order.id}`);
      doc.text(`Created At: ${order.created_at || new Date().toISOString()}`);
      doc.text(`File Name: ${order.file_name || 'N/A'}`);
      doc.text(`File Size: ${order.file_size || 'N/A'} bytes`);
      doc.text(`SHA-256: ${order.file_hash_sha256 || 'N/A'}`);
      doc.moveDown();

      doc.text('RFC 3161 Timestamp Details:', { underline: true });
      doc.text(`TSA Provider: ${order.tsa_provider || 'DigiCert'}`);
      doc.text(`Timestamped At: ${order.timestamped_at || 'N/A'}`);
      doc.moveDown();

      doc.image(qrBuffer, 400, 100, { width: 120 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// --- Main Handler ---
exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const trace = [];

  try {
    let body = {};
    if (event.body) {
      body = JSON.parse(event.body);
    }

    const orderId = body.order_id || event.queryStringParameters?.order_id;
    if (!orderId) {
      return reply(400, { error: 'order_id is required' });
    }

    trace.push(`start_order_id=${orderId}`);

    // 1. Get Order from Supabase
    const order = await sbGetOrder(orderId);
    if (!order) {
      return reply(404, { error: 'Order not found' });
    }
    trace.push('supabase_order_found');

    // 2. Check R2 File Existence (Справка/проверка с объявлением let head снаружи)
    let head;
    try {
      head = await getS3().send(
        new HeadObjectCommand({
          Bucket: process.env.R2_BUCKET,
          Key: order.file_key_r2,
        })
      );
      trace.push(`r2_head_ok size=${head.ContentLength}`);
    } catch (r2err) {
      return reply(500, {
        debug: 'r2_head_failed',
        bucket: process.env.R2_BUCKET || 'MISSING',
        key: order.file_key_r2 || 'MISSING',
        endpoint: process.env.R2_ENDPOINT || 'MISSING',
        errName: r2err.name || 'unknown',
        errMessage: r2err.message || 'unknown',
        trace,
      });
    }

    // 3. TSA RFC3161 Request
    let tsaTokenBase64 = null;
    let timestampedAt = null;

    if (RFC3161_ENABLED && order.file_hash_sha256) {
      try {
        const tsaReq = buildTimeStampRequest(order.file_hash_sha256);
        const tsaResp = await requestTimestamp(TSA_URL, tsaReq);
        const token = parseTimeStampResponse(tsaResp);
        tsaTokenBase64 = token.toString('base64');
        timestampedAt = new Date().toISOString();
        trace.push('tsa_ok');
      } catch (tsaErr) {
        trace.push(`tsa_error: ${tsaErr.message}`);
      }
    }

    // 4. Generate Certificate PDF
    const updatedOrder = { ...order, timestamped_at: timestampedAt, tsa_provider: 'DigiCert' };
    const passportPdfBuf = await makePassportPDF(updatedOrder);
    trace.push('pdf_generated');

    // 5. Upload Passport PDF to R2
    const passportKey = `passports/${order.id}_passport.pdf`;
    await getS3().send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: passportKey,
        Body: passportPdfBuf,
        ContentType: 'application/pdf',
      })
    );
    trace.push('passport_uploaded_r2');

    // 6. Update Order Status in Supabase
    const patchData = {
      status: 'completed',
      passport_key_r2: passportKey,
      tsa_token: tsaTokenBase64,
      timestamped_at: timestampedAt,
      tsa_provider: 'DigiCert',
      updated_at: new Date().toISOString(),
    };

    await sbPatchOrder(order.id, patchData);
    trace.push('supabase_patched');

    return reply(200, {
      status: 'success',
      order_id: order.id,
      passport_key_r2: passportKey,
      trace,
    });
  } catch (err) {
    return reply(500, {
      error: err.message,
      stack: err.stack,
      trace,
    });
  }
};