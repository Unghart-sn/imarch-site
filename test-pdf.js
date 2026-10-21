const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const src = fs.readFileSync(path.join(__dirname, 'netlify', 'functions', 'order-process.js'), 'utf8');
const m1 = '// ---------- PDF generation ----------';
const m2 = '// ---------- Email via Resend ----------';
const i1 = src.indexOf(m1);
const i2 = src.indexOf(m2);
if (i1 < 0 || i2 <= i1) { console.error('markers not found'); process.exit(1); }
const block = src.substring(i1, i2);

const factory = new Function('PDFDocument', 'QRCode', 'ANCHOR_ENABLED', 'VT_ENABLED', '__dirname', 'require',
  block + '\nreturn makePassportPDF;');
const makePassportPDF = factory(PDFDocument, QRCode, false, false, path.join(__dirname, 'netlify', 'functions'), require);

const data = {
  order_id: 'c5bdf875-a587-4b37-8cba-ad42d8c5bd50',
  hmac_token: 'demo-hmac-token-1234567890abcdef',
  full_name: 'Test Holder',
  email: 'unghart@proton.me',
  title: 'Sample Document Title',
  filename: 'sample-document.pdf',
  size_bytes: 123456,
  sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  tsa_status: 'ok',
  tsa_status_code: 0,
  tsa_token_b64: 'MIIBxxxDEMOxxxTSAxxxTOKENxxxBASE64xxx'.repeat(12),
};

(async () => {
  const buf = await makePassportPDF(data);
  fs.mkdirSync(path.join(__dirname, 'tmp'), { recursive: true });
  const out = path.join(__dirname, 'tmp', 'test-passport.pdf');
  fs.writeFileSync(out, buf);
  console.log('OK size=' + buf.length + ' -> ' + out);
})().catch(e => { console.error('FAIL', e); process.exit(1); });