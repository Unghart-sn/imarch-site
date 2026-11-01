// supabase/functions/process-payment/index.ts
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const REQUIRED_TOKENS = 1;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("token_balance, is_admin")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return json({ error: "Profile not found" }, 404);
    }

    const { order_id } = await req.json();
    if (!order_id) {
      return json({ error: "order_id is required" }, 400);
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id, issuer_user_id, status")
      .eq("id", order_id)
      .single();

    if (orderError || !order || order.issuer_user_id !== user.id) {
      return json({ error: "Order not found or not yours" }, 404);
    }

    // Приоритет 1: Админ
    if (profile.is_admin === true) {
      await supabaseAdmin.from("orders").update({
        status: "completed",
        payment_method: "admin_bypass",
      }).eq("id", order_id);

      return json({ status: "completed", reason: "admin_bypass" });
    }

        // Приоритет 2: Токен
    if (profile.token_balance >= REQUIRED_TOKENS) {
      const { error: rpcError } = await supabaseAdmin.rpc("deduct_one_token", {
        user_id: user.id,
      });

            if (rpcError) {
        return new Response(
          JSON.stringify({ error: "RPC_FAILED", details: rpcError }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      await supabaseAdmin.from("orders").update({
        status: "completed",
        payment_method: "token",
      }).eq("id", order_id);

      return json({ status: "completed", reason: "token" });
    }

    // Приоритет 3: Не хватает токенов
    return await handleInsufficient(supabaseAdmin, order_id, REQUIRED_TOKENS, profile.token_balance);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
});

async function handleInsufficient(supabaseAdmin: any, order_id: string, required: number, current: number) {
  await supabaseAdmin.from("orders").update({
    payment_method: "whydonate",
    status: "pending_upload",
  }).eq("id", order_id);

  return new Response(
    JSON.stringify({ status: "insufficient_tokens", required, current }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}