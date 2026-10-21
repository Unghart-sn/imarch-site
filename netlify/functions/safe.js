// Netlify Function: /.netlify/functions/safe
// Digital Safe - единый эндпоинт. Роутинг по ?action=.
// Auth: Supabase JWT via JWKS. R2 layout: safe/<sub>/index.json + safe/<sub>/blobs/<sha256>.enc

const crypto = require("crypto");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
};
const JSON_CT = { "Content-Type": "application/json" };
const MAX_BLOB = 5 * 1024 * 1024;
const MAX_BLOB_DIRECT = 90 * 1024 * 1024;
const DEFAULT_QUOTA = 100 * 1024 * 1024;
const PRESIGN_PUT_TTL = 15 * 60;
const PRESIGN_GET_TTL = 5 * 60;
const EMPTY_INDEX = {
  schema_version: 1,
  account_id: null,
  quota_bytes: DEFAULT_QUOTA,
  files: [],
};

let s3 = null;
function getS3() {
  if (s3) return s3;
  s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  return s3;
}
const bucket = () => process.env.R2_BUCKET;

function reply(code, obj) {
  return {
    statusCode: code,
    headers: Object.assign({}, CORS, JSON_CT),
    body: JSON.stringify(obj),
  };
}

async function verifyJwt(event) {
  const raw = event.headers.authorization || event.headers.Authorization || "";
  const m = raw.match(/^Bearer\s+(.+)$/i);
  if (!m) return { err: reply(401, { ok: false, error: "missing_bearer" }) };
  const url = process.env.SUPABASE_URL;
  if (!url) return { err: reply(500, { ok: false, error: "no_supabase_url" }) };
  try {
    const { createRemoteJWKSet, jwtVerify } = await import("jose");
    const jwks = createRemoteJWKSet(new URL(url + "/auth/v1/.well-known/jwks.json"));
    const { payload } = await jwtVerify(m[1].trim(), jwks);
    if (!payload.sub) return { err: reply(401, { ok: false, error: "no_sub" }) };
    return { sub: payload.sub, payload };
  } catch (e) {
    return {
      err: reply(401, {
        ok: false,
        error: "invalid_token",
        detail: String((e && e.message) || e),
      }),
    };
  }
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (c) => chunks.push(c));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

function isNotFound(e) {
  return e && (e.name === "NoSuchKey" || (e.$metadata && e.$metadata.httpStatusCode === 404));
}

async function readIndex(sub) {
  try {
    const r = await getS3().send(
      new GetObjectCommand({ Bucket: bucket(), Key: "safe/" + sub + "/index.json" })
    );
    const buf = await streamToBuffer(r.Body);
    const idx = JSON.parse(buf.toString("utf8"));
    if (!idx || !Array.isArray(idx.files)) return Object.assign({}, EMPTY_INDEX);
    return idx;
  } catch (e) {
    if (isNotFound(e)) return Object.assign({}, EMPTY_INDEX);
    throw e;
  }
}

async function writeIndex(sub, idx) {
  await getS3().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: "safe/" + sub + "/index.json",
      Body: Buffer.from(JSON.stringify(idx, null, 2), "utf8"),
      ContentType: "application/json",
    })
  );
}

function sha256hex(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function newFileId() {
  return "sf_" + crypto.randomBytes(6).toString("hex");
}

function usedBytes(idx) {
  return idx.files.reduce((a, f) => a + (f.size_blob || 0), 0);
}

function blobKey(sub, sha) {
  return "safe/" + sub + "/blobs/" + sha + ".enc";
}

function parseJsonBody(event) {
  if (!event.body) return null;
  try {
    const raw = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString("utf8")
      : event.body;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

// --- actions ---

async function actionList(sub) {
  const idx = await readIndex(sub);
  return reply(200, {
    ok: true,
    files: idx.files,
    used_bytes: usedBytes(idx),
    quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
  });
}

async function actionUpload(sub, event) {
  if (!event.body) return reply(400, { ok: false, error: "empty_body" });
  const buf = event.isBase64Encoded
    ? Buffer.from(event.body, "base64")
    : Buffer.from(event.body, "binary");
  if (buf.length === 0) return reply(400, { ok: false, error: "empty_body" });
  if (buf.length > MAX_BLOB) {
    return reply(413, { ok: false, error: "too_large", max: MAX_BLOB, incoming: buf.length });
  }

  const sha = sha256hex(buf);
  const idx = await readIndex(sub);
  const existing = idx.files.find((f) => f.sha256_blob === sha);
  if (existing) {
    return reply(200, {
      ok: true,
      dedup: true,
      file_id: existing.file_id,
      sha256: sha,
      size_blob: existing.size_blob,
      used_bytes: usedBytes(idx),
      quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
    });
  }

  const quota = idx.quota_bytes || DEFAULT_QUOTA;
  const used = usedBytes(idx);
  if (used + buf.length > quota) {
    return reply(413, {
      ok: false,
      error: "quota_exceeded",
      used_bytes: used,
      quota_bytes: quota,
      incoming: buf.length,
    });
  }

  const key = blobKey(sub, sha);
  await getS3().send(
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      Body: buf,
      ContentType: "application/octet-stream",
    })
  );

  const rec = {
    file_id: newFileId(),
    sha256_blob: sha,
    size_blob: buf.length,
    uploaded_at: new Date().toISOString(),
    encryption: "aes-256-gcm",
  };
  idx.files.push(rec);
  await writeIndex(sub, idx);

  return reply(200, {
    ok: true,
    dedup: false,
    file_id: rec.file_id,
    sha256: sha,
    size_blob: rec.size_blob,
    used_bytes: usedBytes(idx),
    quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
  });
}

async function actionDownload(sub, event) {
  const fid = (event.queryStringParameters && event.queryStringParameters.file_id) || "";
  if (!fid) return reply(400, { ok: false, error: "no_file_id" });
  const idx = await readIndex(sub);
  const rec = idx.files.find((f) => f.file_id === fid);
  if (!rec) return reply(404, { ok: false, error: "not_found" });

  try {
    const r = await getS3().send(
      new GetObjectCommand({ Bucket: bucket(), Key: blobKey(sub, rec.sha256_blob) })
    );
    const buf = await streamToBuffer(r.Body);
    return {
      statusCode: 200,
      headers: Object.assign({}, CORS, {
        "Content-Type": "application/octet-stream",
        "X-Imarch-Sha256": rec.sha256_blob,
        "X-Imarch-File-Id": rec.file_id,
      }),
      isBase64Encoded: true,
      body: buf.toString("base64"),
    };
  } catch (e) {
    if (isNotFound(e)) return reply(404, { ok: false, error: "blob_missing" });
    throw e;
  }
}

async function actionDelete(sub, event) {
  const fid = (event.queryStringParameters && event.queryStringParameters.file_id) || "";
  if (!fid) return reply(400, { ok: false, error: "no_file_id" });
  const idx = await readIndex(sub);
  const i = idx.files.findIndex((f) => f.file_id === fid);
  if (i < 0) return reply(404, { ok: false, error: "not_found" });
  const rec = idx.files[i];
  try {
    await getS3().send(
      new DeleteObjectCommand({ Bucket: bucket(), Key: blobKey(sub, rec.sha256_blob) })
    );
  } catch (e) {
    console.warn("[safe] delete blob", e && e.message);
  }
  idx.files.splice(i, 1);
  await writeIndex(sub, idx);
  return reply(200, {
    ok: true,
    file_id: fid,
    used_bytes: usedBytes(idx),
    quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
  });
}

async function actionPresignUpload(sub, event) {
  const body = parseJsonBody(event);
  if (!body) return reply(400, { ok: false, error: "bad_json" });
  const sha = String(body.sha256 || "").toLowerCase();
  const size = Number(body.size_bytes || 0);
  if (!/^[0-9a-f]{64}$/.test(sha)) return reply(400, { ok: false, error: "bad_sha256" });
  if (!Number.isFinite(size) || size <= 0) {
    return reply(400, { ok: false, error: "bad_size" });
  }
  if (size > MAX_BLOB_DIRECT) {
    return reply(413, {
      ok: false,
      error: "too_large",
      max: MAX_BLOB_DIRECT,
      incoming: size,
    });
  }

  const idx = await readIndex(sub);
  const existing = idx.files.find((f) => f.sha256_blob === sha);
  if (existing) {
    return reply(200, {
      ok: true,
      dedup: true,
      file_id: existing.file_id,
      sha256: sha,
      size_blob: existing.size_blob,
    });
  }

  const quota = idx.quota_bytes || DEFAULT_QUOTA;
  const used = usedBytes(idx);
  if (used + size > quota) {
    return reply(413, {
      ok: false,
      error: "quota_exceeded",
      used_bytes: used,
      quota_bytes: quota,
      incoming: size,
    });
  }

  const key = blobKey(sub, sha);
  const url = await getSignedUrl(
    getS3(),
    new PutObjectCommand({
      Bucket: bucket(),
      Key: key,
      ContentType: "application/octet-stream",
      ContentLength: size,
    }),
    { expiresIn: PRESIGN_PUT_TTL }
  );

  return reply(200, {
    ok: true,
    dedup: false,
    url,
    key,
    sha256: sha,
    size_bytes: size,
    expires_in: PRESIGN_PUT_TTL,
  });
}

async function actionRegister(sub, event) {
  const body = parseJsonBody(event);
  if (!body) return reply(400, { ok: false, error: "bad_json" });
  const sha = String(body.sha256_blob || "").toLowerCase();
  const size = Number(body.size_blob || 0);
  const enc = String(body.encryption || "aes-256-gcm");
  if (!/^[0-9a-f]{64}$/.test(sha)) return reply(400, { ok: false, error: "bad_sha256" });
  if (!Number.isFinite(size) || size <= 0) {
    return reply(400, { ok: false, error: "bad_size" });
  }

  const idx = await readIndex(sub);
  const existing = idx.files.find((f) => f.sha256_blob === sha);
  if (existing) {
    return reply(200, {
      ok: true,
      dedup: true,
      file_id: existing.file_id,
      sha256: sha,
      size_blob: existing.size_blob,
      used_bytes: usedBytes(idx),
      quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
    });
  }

  const quota = idx.quota_bytes || DEFAULT_QUOTA;
  const used = usedBytes(idx);
  if (used + size > quota) {
    return reply(413, {
      ok: false,
      error: "quota_exceeded",
      used_bytes: used,
      quota_bytes: quota,
      incoming: size,
    });
  }

  const key = blobKey(sub, sha);
  let head;
  try {
    head = await getS3().send(new HeadObjectCommand({ Bucket: bucket(), Key: key }));
  } catch (e) {
    if (isNotFound(e)) return reply(404, { ok: false, error: "blob_missing" });
    throw e;
  }
  if (Number(head.ContentLength) !== size) {
    return reply(409, {
      ok: false,
      error: "size_mismatch",
      expected: size,
      actual: Number(head.ContentLength),
    });
  }

  const rec = {
    file_id: newFileId(),
    sha256_blob: sha,
    size_blob: size,
    uploaded_at: new Date().toISOString(),
    encryption: enc,
  };
  idx.files.push(rec);
  await writeIndex(sub, idx);

  return reply(200, {
    ok: true,
    dedup: false,
    file_id: rec.file_id,
    sha256: sha,
    size_blob: rec.size_blob,
    used_bytes: usedBytes(idx),
    quota_bytes: idx.quota_bytes || DEFAULT_QUOTA,
  });
}

async function actionPresignDownload(sub, event) {
  const fid = (event.queryStringParameters && event.queryStringParameters.file_id) || "";
  if (!fid) return reply(400, { ok: false, error: "no_file_id" });
  const idx = await readIndex(sub);
  const rec = idx.files.find((f) => f.file_id === fid);
  if (!rec) return reply(404, { ok: false, error: "not_found" });

  const url = await getSignedUrl(
    getS3(),
    new GetObjectCommand({
      Bucket: bucket(),
      Key: blobKey(sub, rec.sha256_blob),
    }),
    { expiresIn: PRESIGN_GET_TTL }
  );

  return reply(200, {
    ok: true,
    url,
    file_id: rec.file_id,
    sha256_blob: rec.sha256_blob,
    size_blob: rec.size_blob,
    expires_in: PRESIGN_GET_TTL,
  });
}

// --- handler ---

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: CORS, body: "" };

  const auth = await verifyJwt(event);
  if (auth.err) return auth.err;
  const sub = auth.sub;

  const action =
    (event.queryStringParameters && event.queryStringParameters.action) || "list";

  try {
    if (action === "list") return await actionList(sub);
    if (action === "upload") return await actionUpload(sub, event);
    if (action === "download") return await actionDownload(sub, event);
    if (action === "delete") return await actionDelete(sub, event);
    if (action === "presign-upload") return await actionPresignUpload(sub, event);
    if (action === "presign-download") return await actionPresignDownload(sub, event);
    if (action === "register") return await actionRegister(sub, event);
    if (action === "whoami") return reply(200, { ok: true, sub });
    return reply(400, { ok: false, error: "unknown_action", action });
  } catch (e) {
    console.error("[safe]", action, e);
    return reply(500, {
      ok: false,
      error: "internal",
      detail: String((e && e.message) || e),
    });
  }
};