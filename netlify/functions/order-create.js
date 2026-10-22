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

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' })
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
    
    //const hmacToken = crypto.randomUUID();
    // Генерируем правильный 64-символьный HMAC-токен
    const secretKey = process.env.HMAC_SECRET || 'super_secret_key_123'; // Если на Netlify задан секрет, возьмется он, иначе дефолтный
    const hmacToken = crypto
      .createHmac('sha256', secretKey)
      .update(`${fullName}|${email}|${title}`) // Берем данные, которые есть
      .digest('hex');
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
        hmac_token: hmacToken
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
    const uploadUrl = `${supabaseUrl}/storage/v1/object/orders/${orderId}_${fileName}`;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        order_id: orderId,
        hmac_token: order.hmac_token || hmacToken,
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