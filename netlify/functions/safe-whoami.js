// Netlify Function: GET /.netlify/functions/safe-whoami
// Проверяет Supabase JWT через JWKS. Возвращает sub/email/aud/iss/exp.
// Ничего в R2 не пишет. Первый шаг §7b.

exports.handler = async (event) => {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };
  const json = (code, obj) => ({
    statusCode: code,
    headers: { ...cors, "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors, body: "" };
  }
  if (event.httpMethod !== "GET") {
    return json(405, { ok: false, error: "method_not_allowed" });
  }

  const raw = event.headers.authorization || event.headers.Authorization || "";
  const m = raw.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return json(401, { ok: false, error: "missing_bearer" });
  }
  const token = m[1].trim();

  const supabaseUrl = process.env.SUPABASE_URL;
  if (!supabaseUrl) {
    return json(500, { ok: false, error: "no_supabase_url" });
  }

  try {
    const { createRemoteJWKSet, jwtVerify } = await import("jose");
    const jwks = createRemoteJWKSet(
      new URL(supabaseUrl + "/auth/v1/.well-known/jwks.json")
    );
    const { payload, protectedHeader } = await jwtVerify(token, jwks);
    return json(200, {
      ok: true,
      sub: payload.sub,
      email: payload.email || null,
      role: payload.role || null,
      aud: payload.aud || null,
      iss: payload.iss || null,
      exp: payload.exp || null,
      alg: protectedHeader.alg,
    });
  } catch (e) {
    return json(401, {
      ok: false,
      error: "invalid_token",
      detail: String((e && e.message) || e),
    });
  }
};