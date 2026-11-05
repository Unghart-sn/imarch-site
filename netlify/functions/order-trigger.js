// netlify/functions/order-trigger.js
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const { order_id, hmac_token } = JSON.parse(event.body);
    if (!order_id || !hmac_token) {
      return { statusCode: 400, body: JSON.stringify({ error: 'order_id and hmac_token required' }) };
    }

    // 1. Достаем заказ из базы (нам нужен email для HMAC)
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, email, status, file_key_r2')
      .eq('id', order_id)
      .single();

    if (error || !order) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Order not found' }) };
    }

    // 2. Проверяем HMAC (точно так же, как в order-confirm)
    const secret = process.env.HMAC_ORDER_SECRET;
    if (!secret) return { statusCode: 500, body: JSON.stringify({ error: 'HMAC secret not configured' }) };
    
    const expected = crypto.createHmac('sha256', secret).update(order.id + '|' + order.email).digest('hex');
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(hmac_token, 'hex');
    
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return { statusCode: 403, body: JSON.stringify({ error: 'Invalid HMAC token' }) };
    }
    
    if (order.hmac_token && order.hmac_token !== hmac_token) {
       return { statusCode: 403, body: JSON.stringify({ error: 'Token mismatch' }) };
    }
    
    // Не запускаем, если уже готово или в процессе
    if (['processing', 'ready'].includes(order.status)) {
      return { statusCode: 200, body: JSON.stringify({ ok: true, status: order.status, message: 'Already processing or ready' }) };
    }

    // 3. Вызываем order-process НАПРЯМУЮ (server-to-server)
    const adminToken = process.env.GIFT_ADMIN_TOKEN;
    if (!adminToken) return { statusCode: 500, body: JSON.stringify({ error: 'Admin token missing' }) };

    const baseUrl = process.env.URL || 'https://imarch.ltd';
    const processUrl = baseUrl + '/.netlify/functions/order-process';

    console.log('[order-trigger] Calling order-process for ' + order_id);
    
    const response = await fetch(processUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-token': adminToken
      },
      body: JSON.stringify({ order_id })
    });

    const respText = await response.text();
    console.log('[order-trigger] order-process response:', response.status, respText.slice(0, 200));

    if (!response.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'order-process failed', details: respText }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, message: 'Processing started', result: respText })
    };

  } catch (err) {
    console.error('[order-trigger] error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};