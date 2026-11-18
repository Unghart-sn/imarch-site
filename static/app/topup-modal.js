/* =====================================================================
   topup-modal.js — Top-Up Balance / Digital Safe modal (Protocol 8888)
   Standalone module: no dependencies except window.imarchAuth (optional).
   Connect in: layouts/app/baseof.html AND layouts/certify/list.html
   Usage: any element with data-action="topup" opens the modal (capture phase).
   Exposes: window.openTopupSafeModal('topup'|'safe')
   ===================================================================== */
(function () {
  'use strict';

  if (window.__imarchTopupModalLoaded) return;
  window.__imarchTopupModalLoaded = true;

  var TOPUP_REQUEST_URL = '/.netlify/functions/topup-request';
  var WHYDONATE_URL = 'https://whydonate.com/fundraising/vis-realitatis-preserving-memory';
  var currentIntentId = null;

  /* ---------------- auth helpers ---------------- */

  function getSession() {
    try {
      var key = 'sb-nmiyaroisztnxenmoxzs-auth-token';
      var raw = localStorage.getItem(key);
      if (!raw) raw = localStorage.getItem('sb-auth-token') || localStorage.getItem('supabase.auth.token');
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (parsed && parsed.access_token) return parsed;
      return (parsed && parsed.currentSession) || parsed || null;
    } catch (e) { return null; }
  }

  function getAccessToken() {
    var s = getSession();
    return s && s.access_token ? s.access_token : null;
  }

  async function getCurrentUserId() {
    try {
      if (window.imarchAuth && window.imarchAuth.getSession) {
        var session = await window.imarchAuth.getSession();
        return (session && session.user) ? session.user.id : null;
      }
    } catch (e) { /* fallthrough */ }
    return null;
  }

  function postJson(url, payload) {
    var headers = { 'Content-Type': 'application/json' };
    var token = getAccessToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.text().then(function (text) {
        var data;
        try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
        if (!res.ok) {
          var msg = (data && data.error) ? data.error : ('HTTP ' + res.status);
          throw new Error(msg);
        }
        return data;
      });
    });
  }

  /* ---------------- modal injection ---------------- */

  function injectTopupSafeModal() {
    if (document.getElementById('topupSafeModal')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#topupSafeModal { display:none; position:fixed; inset:0; background:rgba(15,23,42,0.72); z-index:99999; align-items:center; justify-content:center; padding:16px; font-family:inherit; }',
      '#topupSafeModal .ts-card { background:#fff; color:#0f172a; width:100%; max-width:480px; border-radius:12px; padding:24px; box-shadow:0 20px 40px rgba(0,0,0,0.28); position:relative; }',
      '#topupSafeModal .ts-close { position:absolute; top:14px; right:16px; background:none; border:none; font-size:22px; cursor:pointer; color:#64748b; }',
      '#topupSafeModal .ts-tabs { display:flex; gap:8px; margin-bottom:18px; border-bottom:1px solid #e2e8f0; padding-bottom:10px; }',
      '#topupSafeModal .ts-tab { flex:1; padding:9px 12px; border:1px solid #cbd5e1; background:#f8fafc; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; color:#334155; }',
      '#topupSafeModal .ts-tab.active { background:#0f172a; color:#fff; border-color:#0f172a; }',
      '#topupSafeModal .ts-grid { display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; margin:12px 0; }',
      '#topupSafeModal .ts-amt { padding:10px 6px; border:1px solid #cbd5e1; border-radius:8px; background:#fff; font-weight:700; cursor:pointer; text-align:center; font-size:14px; }',
      '#topupSafeModal .ts-amt.active { border-color:#0f172a; background:#f1f5f9; box-shadow:inset 0 0 0 1px #0f172a; }',
      '#topupSafeModal .ts-input { width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:8px; font-size:14px; margin-top:6px; box-sizing:border-box; }',
      '#topupSafeModal .ts-btn-primary { width:100%; padding:12px; background:#0f172a; color:#fff; border:none; border-radius:8px; font-weight:600; font-size:14px; cursor:pointer; margin-top:14px; }',
      '#topupSafeModal .ts-btn-primary:disabled { opacity:0.6; cursor:not-allowed; }',
      '#topupSafeModal .ts-btn-whydonate { display:block; text-align:center; width:100%; padding:12px; background:#059669; color:#fff; text-decoration:none; border-radius:8px; font-weight:700; font-size:14px; margin-top:12px; box-sizing:border-box; }',
      '#topupSafeModal .ts-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-top:12px; font-size:13px; line-height:1.45; }',
      '#topupSafeModal .ts-ref { font-family:monospace; font-size:16px; font-weight:700; background:#e2e8f0; padding:4px 8px; border-radius:4px; letter-spacing:1px; }'
    ].join('\n');
    document.head.appendChild(style);

    var modal = document.createElement('div');
    modal.id = 'topupSafeModal';
    modal.innerHTML = [
      '<div class="ts-card">',
      '  <button type="button" class="ts-close" id="tsCloseBtn">&times;</button>',
      '  <h3 style="margin:0 0 4px; font-size:19px;">Protocol 8888 Treasury &amp; Safe</h3>',
      '  <p style="margin:0 0 14px; font-size:12px; color:#64748b;">1 &micro; = &pound;1 GBP &bull; 1 Full Token = &pound;100 GBP</p>',
      '  <div class="ts-tabs">',
      '    <button type="button" class="ts-tab active" data-tab="topup">Top-Up Balance (&micro;)</button>',
      '    <button type="button" class="ts-tab" data-tab="safe">Digital Safe (100 MB)</button>',
      '  </div>',
      '  <!-- TAB 1: TOP-UP -->',
      '  <div id="tsPaneTopup">',
      '    <div style="font-size:13px; color:#334155;">Select contribution amount (GBP &rarr; &micro;):</div>',
      '    <div class="ts-grid">',
      '      <button type="button" class="ts-amt active" data-val="10">&pound;10<br><span style="font-weight:400;font-size:11px;">10 &micro;</span></button>',
      '      <button type="button" class="ts-amt" data-val="20">&pound;20<br><span style="font-weight:400;font-size:11px;">20 &micro;</span></button>',
      '      <button type="button" class="ts-amt" data-val="50">&pound;50<br><span style="font-weight:400;font-size:11px;">50 &micro;</span></button>',
      '      <button type="button" class="ts-amt" data-val="100">&pound;100<br><span style="font-weight:400;font-size:11px;">1 Token</span></button>',
      '    </div>',
      '    <label style="font-size:12px; color:#475569; display:block; margin-top:8px;">Or enter custom amount (&pound; GBP):</label>',
      '    <input type="number" id="tsCustomAmount" class="ts-input" min="1" step="1" value="10" placeholder="Enter GBP amount">',
      '    <button type="button" id="tsCreateIntentBtn" class="ts-btn-primary">Generate WhyDonate Reference</button>',
      '    <div id="tsIntentResult" style="display:none;" class="ts-box">',
      '      <div>1. Copy your personal reference code: <span id="tsRefCode" class="ts-ref">VR-0000</span> <button type="button" id="tsCopyRefBtn" style="margin-left:6px;padding:3px 8px;font-size:11px;cursor:pointer;">Copy</button></div>',
      '      <div style="margin-top:8px;">2. Complete your <strong>&pound;<span id="tsConfirmGbp">10</span></strong> contribution on WhyDonate and paste the code into the message/comment field.</div>',
      '      <a id="tsWhyDonateLink" href="' + WHYDONATE_URL + '" target="_blank" rel="noopener" class="ts-btn-whydonate">Proceed to WhyDonate (&pound;<span id="tsBtnGbp">10</span>) &rarr;</a>',
      '      <button type="button" id="tsMarkPaidBtn" class="ts-btn-primary" style="background:#334155;margin-top:8px;">I have completed the contribution</button>',
      '    </div>',
      '    <div id="tsTopupMsg" style="margin-top:10px;font-size:13px;"></div>',
      '  </div>',
      '  <!-- TAB 2: DIGITAL SAFE -->',
      '  <div id="tsPaneSafe" style="display:none;">',
      '    <div class="ts-box" style="margin-top:0;">',
      '      <div style="font-weight:700; font-size:15px; margin-bottom:4px;">Digital Safe (<code>safe_100mb</code>)</div>',
      '      <div style="color:#475569;">Encrypted 100 MB sovereign vault for certified artifacts and RFC 3161 timestamps.</div>',
      '      <div style="margin-top:10px; padding-top:10px; border-top:1px solid #e2e8f0; display:flex; justify-content:space-between;">',
      '        <span>Subscription tariff:</span><strong>10 &micro; / month (&pound;10)</strong>',
      '      </div>',
      '      <div style="margin-top:6px; display:flex; justify-content:space-between;">',
      '        <span>Your current balance:</span><strong id="tsSafeBalance">Loading...</strong>',
      '      </div>',
      '      <div style="margin-top:6px; display:flex; justify-content:space-between;">',
      '        <span>Safe status:</span><strong id="tsSafeStatus">Checking...</strong>',
      '      </div>',
      '    </div>',
      '    <button type="button" id="tsActivateSafeBtn" class="ts-btn-primary">Activate / Extend 30 Days (10 &micro;)</button>',
      '    <button type="button" id="tsSafeTopupFallbackBtn" class="ts-btn-whydonate" style="display:none; border:none; cursor:pointer;">Insufficient &micro; &mdash; Top-Up &pound;10 via WhyDonate</button>',
      '    <div id="tsSafeMsg" style="margin-top:10px;font-size:13px;"></div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(modal);
    bindModal();
  }

  /* ---------------- modal behaviour ---------------- */

  function hideModal() {
    var el = document.getElementById('topupSafeModal');
    if (el) el.style.display = 'none';
  }

  function switchTsTab(tab) {
    var tabs = document.querySelectorAll('#topupSafeModal .ts-tab');
    tabs.forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
    document.getElementById('tsPaneTopup').style.display = (tab === 'topup') ? 'block' : 'none';
    document.getElementById('tsPaneSafe').style.display = (tab === 'safe') ? 'block' : 'none';
  }

  async function refreshSafeTabState() {
    var balEl = document.getElementById('tsSafeBalance');
    var stEl = document.getElementById('tsSafeStatus');
    var actBtn = document.getElementById('tsActivateSafeBtn');
    var fbBtn = document.getElementById('tsSafeTopupFallbackBtn');
    var msg = document.getElementById('tsSafeMsg');
    msg.textContent = '';

    var userId = await getCurrentUserId();
    var sb = (window.imarchAuth && window.imarchAuth.getClient) ? window.imarchAuth.getClient() : null;
    if (!userId || !sb) {
      balEl.textContent = 'Sign in required';
      stEl.textContent = '\u2014';
      actBtn.disabled = true;
      return;
    }

    try {
      var res = await sb.from('profiles').select('token_balance, safe_until').eq('id', userId).single();
      var balance = (res.data && res.data.token_balance) || 0;
      var safeUntil = res.data && res.data.safe_until ? new Date(res.data.safe_until) : null;
      var isActive = safeUntil && safeUntil > new Date();

      balEl.textContent = balance + ' \u00B5 (\u00A3' + balance + ')';
      stEl.textContent = isActive ? ('Active until ' + safeUntil.toLocaleDateString()) : 'Inactive';
      stEl.style.color = isActive ? '#059669' : '#dc2626';

      if (balance >= 10) {
        actBtn.style.display = 'block';
        actBtn.disabled = false;
        fbBtn.style.display = 'none';
      } else {
        actBtn.style.display = 'none';
        fbBtn.style.display = 'block';
      }
    } catch (e) {
      balEl.textContent = 'Error loading';
    }
  }

  async function openTopupSafeModal(defaultTab) {
    injectTopupSafeModal();
    document.getElementById('topupSafeModal').style.display = 'flex';
    switchTsTab(defaultTab || 'topup');
    await refreshSafeTabState();
  }
  window.openTopupSafeModal = openTopupSafeModal;

  function bindModal() {
    document.getElementById('tsCloseBtn').onclick = hideModal;

    document.getElementById('topupSafeModal').addEventListener('click', function (e) {
      if (e.target && e.target.id === 'topupSafeModal') hideModal();
    });

    document.querySelectorAll('#topupSafeModal .ts-tab').forEach(function (t) {
      t.onclick = function () { switchTsTab(t.getAttribute('data-tab')); };
    });

    document.querySelectorAll('#topupSafeModal .ts-amt').forEach(function (b) {
      b.onclick = function () {
        document.querySelectorAll('#topupSafeModal .ts-amt').forEach(function (x) { x.classList.remove('active'); });
        b.classList.add('active');
        document.getElementById('tsCustomAmount').value = b.getAttribute('data-val');
        document.getElementById('tsIntentResult').style.display = 'none';
      };
    });

    document.getElementById('tsCustomAmount').oninput = function () {
      document.querySelectorAll('#topupSafeModal .ts-amt').forEach(function (x) { x.classList.remove('active'); });
      document.getElementById('tsIntentResult').style.display = 'none';
    };

    document.getElementById('tsCreateIntentBtn').onclick = async function () {
      var amt = parseInt(document.getElementById('tsCustomAmount').value, 10);
      var msg = document.getElementById('tsTopupMsg');
      if (!amt || amt < 1) {
        msg.textContent = 'Please enter a valid GBP amount (minimum \u00A31).';
        msg.style.color = '#dc2626';
        return;
      }

      var userId = await getCurrentUserId();
      if (!userId) {
        msg.textContent = 'Please sign in first.';
        msg.style.color = '#dc2626';
        return;
      }

      var createBtn = document.getElementById('tsCreateIntentBtn');
      createBtn.disabled = true;
      msg.textContent = 'Creating contribution reference...';
      msg.style.color = '#475569';

      try {
        var res = await postJson(TOPUP_REQUEST_URL, {
          action: 'create',
          user_id: userId,
          amount_gbp: amt,
          purpose: 'topup'
        });

        currentIntentId = res.intent_id;
        document.getElementById('tsRefCode').textContent = res.ref_code;
        document.getElementById('tsConfirmGbp').textContent = amt;
        document.getElementById('tsBtnGbp').textContent = amt;
        document.getElementById('tsIntentResult').style.display = 'block';
        msg.textContent = '';
      } catch (e) {
        msg.textContent = 'Error: ' + e.message;
        msg.style.color = '#dc2626';
      } finally {
        createBtn.disabled = false;
      }
    };

    document.getElementById('tsCopyRefBtn').onclick = function () {
      var code = document.getElementById('tsRefCode').textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
        document.getElementById('tsCopyRefBtn').textContent = 'Copied!';
        setTimeout(function () { document.getElementById('tsCopyRefBtn').textContent = 'Copy'; }, 1500);
      }
    };

    document.getElementById('tsMarkPaidBtn').onclick = async function () {
      if (!currentIntentId) return;
      var msg = document.getElementById('tsTopupMsg');
      var markBtn = document.getElementById('tsMarkPaidBtn');
      markBtn.disabled = true;
      try {
        await postJson(TOPUP_REQUEST_URL, {
          action: 'mark_paid',
          intent_id: currentIntentId
        });
        msg.textContent = 'Thank you! Your contribution is queued for verification. Microtokens (\u00B5) will appear on your balance after Treasury confirmation.';
        msg.style.color = '#059669';
      } catch (e) {
        msg.textContent = 'Error: ' + e.message;
        msg.style.color = '#dc2626';
        markBtn.disabled = false;
      }
    };

    document.getElementById('tsActivateSafeBtn').onclick = async function () {
      var sb = (window.imarchAuth && window.imarchAuth.getClient) ? window.imarchAuth.getClient() : null;
      var msg = document.getElementById('tsSafeMsg');
      var actBtn = document.getElementById('tsActivateSafeBtn');
      if (!sb) return;

      actBtn.disabled = true;
      msg.textContent = 'Activating Digital Safe...';
      msg.style.color = '#475569';

      try {
        var rpcRes = await sb.rpc('activate_digital_safe');
        if (rpcRes.error) throw new Error(rpcRes.error.message);
        msg.textContent = 'Digital Safe activated for 30 days (-10 \u00B5)!';
        msg.style.color = '#059669';
        await refreshSafeTabState();
      } catch (e) {
        msg.textContent = 'Error: ' + e.message;
        msg.style.color = '#dc2626';
        actBtn.disabled = false;
      }
    };

    document.getElementById('tsSafeTopupFallbackBtn').onclick = function () {
      document.getElementById('tsCustomAmount').value = '10';
      switchTsTab('topup');
    };
  }

  /* ---------------- entry point: capture-phase delegation ----------------
     Works for any [data-action="topup"] element, including dynamically
     rendered ones (SPA dashboard). Capture phase = fires before the
     default navigation of an <a href>. */
  document.addEventListener('click', function (e) {
    var btn = (e.target && e.target.closest) ? e.target.closest('[data-action="topup"]') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    openTopupSafeModal('topup');
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') hideModal();
  });

  injectTopupSafeModal();
