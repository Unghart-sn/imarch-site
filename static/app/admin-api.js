// IMARCH App - payments & service grants
(function(){
'use strict';
var C={pending:'#b45309',verifying:'#1d4ed8',confirmed:'#047857',rejected:'#b91c1c',refunded:'#6b7280'};
var TH='padding:6px 8px;text-align:left;color:#6b7280;border-bottom:1px solid #e5e7eb;';
var TD='padding:6px 8px;border-bottom:1px solid #f3f4f6;';
var NU=TD+'text-align:right;'; var MO=TD+'font-family:monospace;font-size:11px;';
var IN='padding:8px 10px;border:1px solid #d1d5db;border-radius:8px;width:100%;box-sizing:border-box;margin-bottom:8px;';
var BT='padding:8px 14px;border:0;border-radius:8px;background:#111827;color:#fff;font-size:13px;cursor:pointer;';
function e(s){var r='',t=String(s==null?'':s);for(var i=0;i<t.length;i++){var c=t.charCodeAt(i);if(c===38){r+='&amp;';}else if(c===60){r+='&lt;';}else if(c===62){r+='&gt;';}else if(c===34){r+='&quot;';}else if(c===39){r+='&#39;';}else{r+=t[i];}}return r;}
function n(v){return (v==null?0:Number(v)).toLocaleString('en-US');}
function d(t){if(!t)return '--';try{return new Date(t).toISOString().slice(0,16).replace('T',' ');}catch(x){return String(t);}}
function p(s){var c=C[s]||'#374151';return '<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:'+c+'14;color:'+c+';font-size:11px;font-weight:600;">'+e(s)+'</span>';}
function card(t,b,s){var h='<div class="dash-card"><div class="card-header"><h3>'+e(t)+'</h3></div>';if(s)h+='<p style="font-size:13px;color:#6b7280;margin:0 0 12px;">'+e(s)+'</p>';return h+b+'</div>';}
function th(x){return '<th style="'+TH+'">'+x+'</th>';}
function em(t){return '<em style="color:#9ca3af;">'+t+'</em>';}
function er(x){return '<span style="color:#b91c1c;">'+e(x.message||x)+'</span>';}
function tbl(hd,rows){return '<div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:12px;"><thead><tr>'+hd+'</tr></thead><tbody>'+rows+'</tbody></table></div>';}
function intentRows(rows,wu){
  var s='';
  rows.forEach(function(r){
    s+='<tr><td style="'+TD+'">'+e(d(r.created_at))+'</td>';
    if(wu)s+='<td style="'+MO+'">'+e(String(r.user_id||'').slice(0,8))+'</td>';
    s+='<td style="'+MO+'">'+e(r.ref_code||'--')+'</td>';
    s+='<td style="'+NU+'">'+e(r.amount_gbp)+'</td>';
    s+='<td style="'+NU+'">'+n(r.micro_tokens)+'</td>';
    s+='<td style='+String.fromCharCode(34)+TD+String.fromCharCode(34)+'>'+p(r.status)+'</td>';
    s+='<tr><td style="'+TD+'">'+e(d(r.created_at))+'</td>';
    if(wu)s+='<td style="'+MO+'">'+e(String(r.user_id||'').slice(0,8))+'</td>';
    s+='<td style="'+MO+'">'+e(r.ref_code||'--')+'</td>';
    s+='<td style="'+NU+'">'+e(r.amount_gbp)+'</td>';
    s+='<td style="'+NU+'">'+n(r.micro_tokens)+'</td>';
    s+='<td style="'+TD+'">'+p(r.status)+'</td>';
    if(wu)s+='<td style="'+MO+'">'+e(r.provider_payment_id||'--')+'</td>';
    s+='</tr>';
  });
  return s;
}
function intentTable(rows,wu){
  if(!rows||!rows.length)return em('No payment intents yet.');
  var hd=th('Created')+(wu?th('User'):'')+th('Ref')+th('GBP')+th('Micro')+th('Status')+(wu?th('Payment ID'):'');
  return tbl(hd,intentRows(rows,wu));
}
function grantRows(rows){
  var s='';
  rows.forEach(function(r){
    s+='<tr><td style="'+TD+'">'+e(r.seq)+'</td>';
    s+='<td style="'+TD+'">'+e(d(r.created_at))+'</td>';
    s+='<td style="'+MO+'">'+e(String(r.user_id||'').slice(0,8))+'</td>';
    s+='<td style="'+NU+'">'+n(r.amount)+'</td>';
    s+='<td style="'+MO+'">'+e(r.reason_code||'--')+'</td>';
    s+='<td style="'+TD+'">'+e(r.description||'')+'</td></tr>';
  });
  return s;
}
function grantTable(rows){
  if(!rows||!rows.length)return em('No service grants recorded yet.');
  return tbl(th('Seq')+th('Created')+th('User')+th('Amount')+th('Reason')+th('Note'),grantRows(rows));
}
var SEL='id,user_id,amount_gbp,micro_tokens,ref_code,status,provider_payment_id,created_at';
function sel(wu){return wu?SEL:'id,amount_gbp,micro_tokens,ref_code,status,created_at';}
async function fetchIntents(sb,uid,lim,wu){
  var q=sb.from('donation_intents').select(sel(wu)).order('created_at',{ascending:false}).limit(lim);
  if(uid)q=q.eq('user_id',uid);
  return await q;
}
async function fetchGrants(sb,lim){
  return await sb.from('token_transactions').select('seq,user_id,amount,reason_code,description,created_at')
    .eq('type','service_grant').order('seq',{ascending:false}).limit(lim);
}

async function myPayments(el,sb,uid){
  el.innerHTML=card('My top-ups','<div id="mpB">'+em('Loading...')+'</div>',
    'Tokens are credited after the payment is confirmed. The reference code identifies your payment.');
  var r=await fetchIntents(sb,uid,20,false);
  var b=el.querySelector('#mpB');
  if(b)b.innerHTML=r.error?er(r.error):intentTable(r.data||[],false);
}
async function adminPayments(el,sb){
  var body='';
  body+='<input id="piI" placeholder="Intent ID (uuid)" style="'+IN+'font-family:monospace;font-size:12px;">';
  body+='<input id="piP" placeholder="WhyDonate payment ID" style="'+IN+'font-family:monospace;font-size:12px;">';
  body+='<button id="piB" style="'+BT+'">Confirm payment and credit tokens</button>';
  body+='<div id="piO" style="font-size:13px;margin-top:10px;"></div>';
  body+='<div id="piL" style="margin-top:14px;">'+em('Loading...')+'</div>';
  el.innerHTML=card('Confirm WhyDonate payment',body,
    'Records the provider payment ID and credits the ledger once. The same payment ID cannot credit twice.');
  var lr=await fetchIntents(sb,null,30,true);
  var le=document.getElementById('piL');
  if(le)le.innerHTML=lr.error?er(lr.error):intentTable(lr.data||[],true);
  var btn=document.getElementById('piB');
  if(!btn)return;
  btn.onclick=async function(){
    var o=document.getElementById('piO');
    var i=(document.getElementById('piI').value||'').trim();
    var q=(document.getElementById('piP').value||'').trim();
    if(!i||!q){o.innerHTML='<span style="color:#b91c1c;">Both fields are required.</span>';return;}
    btn.disabled=true;o.textContent='Confirming...';
    var r=await sb.rpc('admin_confirm_payment',{p_intent_id:i,p_provider_payment_id:q});
    btn.disabled=false;
    if(r.error){o.innerHTML=er(r.error);return;}
    var v=r.data||{};
    o.innerHTML='<span style="color:#047857;font-weight:600;">Confirmed '+n(v.micro_tokens)+' micro to '+
      e(String(v.user_id||'').slice(0,8))+(v.idempotent?' (already credited)':'')+'.</span>';
    document.getElementById('piI').value='';
    document.getElementById('piP').value='';
    var l2=await fetchIntents(sb,null,30,true);
    var e2=document.getElementById('piL');
    if(e2)e2.innerHTML=intentTable(l2.data||[],true);
  };
}

async function serviceGrants(el,sb){
  var body='';
  body+='<div style="display:flex;gap:8px;margin-bottom:8px;">';
  body+='<input id="sgE" type="email" placeholder="user@example.com" style="flex:1;padding:9px 11px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;">';
  body+='<button id="sgF" class="btn-secondary" style="white-space:nowrap;">Find</button></div>';
  body+='<div id="sgT" style="display:none;font-size:13px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:10px 12px;margin-bottom:8px;"></div>';
  body+='<input id="sgA" type="number" min="1" placeholder="Amount (micro)" style="'+IN+'">';
  body+='<input id="sgR" placeholder="Reason code, e.g. support_compensation" style="'+IN+'font-family:monospace;">';
  body+='<input id="sgN" placeholder="Note (visible in the public ledger)" style="'+IN+'">';
  body+='<button id="sgB" style="'+BT+'">Grant service tokens</button>';
  body+='<div id="sgO" style="font-size:13px;margin-top:10px;"></div>';
  body+='<div id="sgL" style="margin-top:14px;">'+em('Loading...')+'</div>';
  el.innerHTML=card('Service grants',body,
    'Internal token issuance. Recorded as type service_grant with an immutable reason code and note in the audit chain.');
  var lr=await fetchGrants(sb,20);
  var le=document.getElementById('sgL');
  if(le)le.innerHTML=lr.error?er(lr.error):grantTable(lr.data||[]);
  var tid=null;
  var fb=document.getElementById('sgF');
  if(fb)fb.onclick=async function(){
    var m=(document.getElementById('sgE').value||'').trim();
    var box=document.getElementById('sgT');
    tid=null;
    if(!m){box.style.display='none';return;}
    box.style.display='block';box.textContent='Searching...';
    var r=await sb.rpc('find_user_by_email',{email_q:m});
    var w=(r.data&&r.data[0])||null;
    if(r.error||!w){box.innerHTML='<span style="color:#b91c1c;">User not found.</span>';return;}
    tid=w.id;
    box.innerHTML='Target: <strong>'+e(w.email||m)+'</strong> &middot; <span style="font-family:monospace;font-size:11px;">'+e(w.id)+'</span>';
  };
  var gb=document.getElementById('sgB');
  if(gb)gb.onclick=async function(){
    var o=document.getElementById('sgO');
    var am=parseInt(document.getElementById('sgA').value,10);
    var rs=(document.getElementById('sgR').value||'').trim();
    var nt=(document.getElementById('sgN').value||'').trim();
    if(!tid){o.innerHTML='<span style="color:#b91c1c;">Find the target user first.</span>';return;}
    if(!am||am<1){o.innerHTML='<span style="color:#b91c1c;">Amount must be at least 1 micro.</span>';return;}
    if(!rs){o.innerHTML='<span style="color:#b91c1c;">Reason code is required.</span>';return;}
    if(nt.length<3){o.innerHTML='<span style="color:#b91c1c;">Note must be at least 3 characters.</span>';return;}
    gb.disabled=true;o.textContent='Granting...';
    var r=await sb.rpc('admin_service_grant',{p_user_id:tid,p_amount:am,p_reason_code:rs,p_note:nt});
    gb.disabled=false;
    if(r.error){o.innerHTML=er(r.error);return;}
    var v=r.data||{};
    o.innerHTML='<span style="color:#047857;font-weight:600;">Granted '+n(v.amount)+' micro. New balance: '+n(v.balance_after)+'.</span>';
    document.getElementById('sgA').value='';
    document.getElementById('sgN').value='';
    var l2=await fetchGrants(sb,20);
    var e2=document.getElementById('sgL');
    if(e2)e2.innerHTML=grantTable(l2.data||[]);
  };
}
window.imarchAdmin={myPayments:myPayments,adminPayments:adminPayments,serviceGrants:serviceGrants};
})();
