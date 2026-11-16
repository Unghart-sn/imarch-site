// supabase/functions/process-payment/index.ts
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
      .select("id, issuer_user_id, status, product_code")
      .eq("id", order_id)
      .single();

    if (orderError || !order || order.issuer_user_id !== user.id) {
      return json({ error: "Order not found or not yours" }, 404);
    }

    // Priority 1: Admin bypass (before price lookup — admin pays nothing)
    if (profile.is_admin === true) {
      await supabaseAdmin.from("orders").update({
        status: "completed",
        payment_method: "admin_bypass",
      }).eq("id", order_id);

      return json({ status: "completed", reason: "admin_bypass" });
    }

    // Resolve price from catalog (Step B: no hardcoded price)
    const productCode = order.product_code ?? "certificate";
    const { data: priceRows, error: priceError } = await supabaseAdmin
      .rpc("get_current_price", { p_product_code: productCode });

    if (priceError || !priceRows || priceRows.length === 0) {
      return json({
        error: "PRICE_NOT_FOUND",
        product_code: productCode,
        details: priceError?.message ?? null,
      }, 500);
    }

    const price = priceRows[0];
    const required = price.price_micro;
    const labels = describeProduct(price.product_code);

    // Priority 2: Tokens
    if (profile.token_balance >= required) {
      const newBalance = profile.token_balance - required;
      const { error: updateError } = await supabaseAdmin
        .from("profiles")
        .update({ token_balance: newBalance })
        .eq("id", user.id);

      if (updateError) {
        return new Response(
          JSON.stringify({ error: "UPDATE_FAILED", details: updateError }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Return tokens to Treasury
      const { data: treasuryProfile } = await supabaseAdmin
        .from("profiles")
        .select("id, token_balance")
        .eq("is_treasury", true)
        .single();

      if (treasuryProfile) {
        const newTreasuryBalance = treasuryProfile.token_balance + required;
        await supabaseAdmin
          .from("profiles")
          .update({ token_balance: newTreasuryBalance })
          .eq("id", treasuryProfile.id);
      }

      // Log transactions
      await supabaseAdmin.from("token_transactions").insert([
        {
          user_id: user.id,
          amount: -required,
          type: "spend",
          description: labels.spend(order_id),
        },
        {
          user_id: treasuryProfile?.id || user.id,
          amount: required,
          type: "grant",
          description: labels.return(order_id),
        },
      ]);

      await supabaseAdmin.from("orders").update({
        status: "completed",
        payment_method: "token",
      }).eq("id", order_id);

      return json({ status: "completed", reason: "token", amount: required });
    }

    // Priority 3: Insufficient tokens
    return await handleInsufficient(supabaseAdmin, order_id, required, profile.token_balance);
  } catch (err) {
    return json({ error: err.message }, 500);
  }
});

function describeProduct(productCode: string) {
  switch (productCode) {
    case "certificate":
      return {
        spend: (id: string) => `Certificate issuance for order ${id}`,
        return: (id: string) => `Return from certificate spend (order ${id})`,
      };
    case "safe_100mb":
      return {
        spend: (id: string) => `Digital Safe 100MB rental for order ${id}`,
        return: (id: string) => `Return from safe rental (order ${id})`,
      };
    default:
      return {
        spend: (id: string) => `${productCode} purchase for order ${id}`,
        return: (id: string) => `Return from ${productCode} spend (order ${id})`,
      };
  }
}

async function handleInsufficient(
  supabaseAdmin: any,
  order_id: string,
  required: number,
  current: number
) {
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