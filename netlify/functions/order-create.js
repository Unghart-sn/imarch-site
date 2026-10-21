import { createClient } from '@supabase/supabase-js';

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY' })
      };
    }

    const supabase = createClient(url, key);
    let bodyData = {};

    if (event.body) {
      try {
        bodyData = JSON.parse(event.body);
      } catch (e) {
        bodyData = {};
      }
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        file_name: bodyData.file_name || 'test.pdf',
        file_size: bodyData.file_size || 0,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Supabase error: ' + error.message })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, order_id: data.id })
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: 'Catch error: ' + err.message })
    };
  }
}