const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { action } = body;

    if (action === 'create') {
      const { user_id, amount_gbp, purpose } = body;
      const amt = parseInt(amount_gbp, 10);

      if (!user_id || !amt || amt < 1 || amt > 100000) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid user_id or amount' }) };
      }

      const refCode = 'VR-' + crypto.randomBytes(2).toString('hex').toUpperCase();

      const { data, error } = await supabase
        .from('donation_intents')
        .insert({
          user_id,
          amount_gbp: amt,
          micro_tokens: amt, // 1 GBP = 1 microtoken
          ref_code: refCode,
          purpose: purpose || 'topup',
          status: 'pending'
        })
        .select('id, ref_code')
        .single();

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({
          intent_id: data.id,
          ref_code: data.ref_code,
          whydonate_url: 'https://whydonate.com/fundraising/vis-realitatis-preserving-memory'
        })
      };
    }

    if (action === 'mark_paid') {
      const { intent_id } = body;
      if (!intent_id) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Missing intent_id' }) };
      }

      const { error } = await supabase
        .from('donation_intents')
        .update({ status: 'verifying', updated_at: new Date().toISOString() })
        .eq('id', intent_id)
        .eq('status', 'pending');

      if (error) throw error;

      return { statusCode: 200, body: JSON.stringify({ status: 'verifying' }) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Unknown action' }) };
  } catch (err) {
    console.error('topup-request error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};