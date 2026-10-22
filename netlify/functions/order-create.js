const crypto = require('crypto');

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hmacSecret = process.env.HMAC_ORDER_SECRET; // Добавили секрет

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' })
      };
    }
    
    if (!hmacSecret) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing HMAC_ORDER_SECRET' })
      };
    }

    let bodyData = {};
    if (event.body) {
      try {
        bodyData = JSON.parse(event.body);
      } catch (e) {
        bodyData = {};
      }
    }

    const fileName = bodyData.filename || bodyData.file_name || 'document.pdf';
    const fileSizeBytes = Number(bodyData.size_bytes || bodyData.file_size || 0);
    const fileSha256 = bodyData.sha256 || '';
    const fullName = bodyData.full_name || '';
    const email = bodyData.email || '';
    const title = bodyData.title || '';
    
    // Временный токен для создания записи
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
        status: 'pending',
        hmac_token: tempToken // Пока кладем временный
      })
    });

    const dbText = await dbResponse.text();
    let dbResult;
    try {
      dbResult = JSON.parse(dbText);
    } catch (e) {
      dbResult = { raw: dbText };
    }

    if (!dbResponse.ok) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Supabase DB Error: ' + (dbResult.message || dbText) })
      };
    }

    const order = Array.isArray(dbResult) ? dbResult[0] : dbResult;
    const orderId = order.id;

    // СЧИТАЕМ ПРАВИЛЬНЫЙ ХЭШ (как требует order-confirm.js)
    const finalHmac = crypto.createHmac('sha256', hmacSecret)
      .update(orderId + '|' + email)
      .digest('hex');

    // Обновляем базу правильным хэшем
    await fetch(`${supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({ hmac_token: finalHmac })
    });

    const uploadUrl = `${supabaseUrl}/storage/v1/object/orders/${orderId}_${fileName}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        order_id: orderId,
        hmac_token: finalHmac, // Отдаем правильный хэш фронтенду
        upload_url: uploadUrl,
        upload_headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/octet-stream',
          'x-upsert': 'true'
        },
        whydonate_url: order.whydonate_url || 'https://imarch.ltd/'
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Function crash: ' + err.message })
    };
  }
};