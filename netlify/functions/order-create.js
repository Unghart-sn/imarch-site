const crypto = require('crypto');

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hmacSecret = process.env.HMAC_ORDER_SECRET;

    if (!supabaseUrl || !supabaseKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' }) };
    }
    if (!hmacSecret) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing HMAC_ORDER_SECRET' }) };
    }

    let bodyData = {};
    if (event.body) {
      try { bodyData = JSON.parse(event.body); } catch (e) { bodyData = {}; }
    }

    const fileName = bodyData.filename || bodyData.file_name || 'document.pdf';
    const fileSizeBytes = Number(bodyData.size_bytes || bodyData.file_size || 0);
    const fileSha256 = bodyData.sha256 || '';
    const fullName = bodyData.full_name || '';
    const email = bodyData.email || '';
    const title = bodyData.title || '';

    const issuerUserId = bodyData.user_id || null;
    const holderNameInput = bodyData.holder_name || null;

    if (!issuerUserId) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'user_id is required' }) };
    }

    // 1. Читаем профиль инициатора (service_role — видит всех)
    const profileRes = await fetch(
      `${supabaseUrl}/rest/v1/profiles?id=eq.${issuerUserId}&select=id,email,full_name,token_balance,is_admin`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      }
    );

    const profileText = await profileRes.text();
    let profileArr;
    try { profileArr = JSON.parse(profileText); } catch (e) { profileArr = []; }

    if (!profileRes.ok || !Array.isArray(profileArr) || profileArr.length === 0) {
      return { statusCode: 403, headers, body: JSON.stringify({ error: 'Profile not found for user_id' }) };
    }

    const profile = profileArr[0];
    const isAdmin = profile.is_admin === true;
    const tokenBalance = Number(profile.token_balance || 0);

    // 2. Ветвление логики оплаты (только ПРОВЕРКА, без списания)
    let paymentMethod;
    let status;

    if (isAdmin) {
      paymentMethod = 'admin_bypass';
      status = 'processing';
    } else if (tokenBalance >= 1) {
      paymentMethod = 'token';
      status = 'processing';
    } else {
      paymentMethod = 'whydonate';
      status = 'pending_upload';
    }

    // 3. Holder: если передан — третье лицо, иначе сам инициатор
    const holderName = holderNameInput || fullName || profile.full_name || '';

    // 4. Создаём заказ
    const tempToken = crypto.randomUUID();

    const dbResponse = await fetch(`${supabaseUrl}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        full_name: fullName,
        email: email,
        title: title,
        sha256: fileSha256,
        size_bytes: fileSizeBytes,
        status: status,
        hmac_token: tempToken,
        holder_name: holderName,
        issuer_user_id: issuerUserId,
        payment_method: paymentMethod
      })
    });

    const dbText = await dbResponse.text();
    let dbResult;
    try { dbResult = JSON.parse(dbText); } catch (e) { dbResult = { raw: dbText }; }

    if (!dbResponse.ok) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Supabase DB Error: ' + (dbResult.message || dbText) }) };
    }

    const order = Array.isArray(dbResult) ? dbResult[0] : dbResult;
    const orderId = order.id;

    // 5. Финализируем HMAC
    const finalHmac = crypto.createHmac('sha256', hmacSecret)
      .update(orderId + '|' + email)
      .digest('hex');

    await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ hmac_token: finalHmac })
    });

    // Обновляем file_key_r2
    await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ file_key_r2: `${orderId}_${fileName}` })
    });

    // ВАЖНО: списание токена здесь УДАЛЕНО. Оно живёт только в process-payment.

    const uploadUrl = `${supabaseUrl}/storage/v1/object/orders/${orderId}_${fileName}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        order_id: orderId,
        status: status,
        payment_method: paymentMethod,
        hmac_token: finalHmac,
        upload_url: uploadUrl,
        upload_headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/octet-stream',
          'x-upsert': 'true'
        },
        whydonate_url: paymentMethod === 'whydonate'
          ? 'https://whydonate.com/donate/vis-realitatis-preserving-memory?amount=20&currency=gbp'
          : null
      })
    };

  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Function crash: ' + err.message }) };
  }
};