// IMARCH App - Settings Module
(function () {
  'use strict';

  var paneAcc = function () { return document.getElementById('app-content'); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  function fmt(mu) {
    return (mu || 0).toLocaleString('en-US');
  }

  function treasurySectionHtml() {
    var h = '';
    h += '<div class="dash-card" id="treasuryCard">';
    h += '<div class="card-header"><h3>Treasury</h3></div>';
    h += '<div id="treasuryUsage" style="font-size:13px; color:#6b7280; margin-bottom:14px;">Loading limits...</div>';

    h += '<div style="border-top:1px solid #e5e7eb; padding-top:14px;">';
    h += '<div style="font-size:13px; font-weight:600; margin-bottom:8px;">Send tokens</div>';

    h += '<div style="display:flex; gap:8px; margin-bottom:8px;">';
    h += '<input id="txEmail" type="email" placeholder="user@example.com" style="flex:1; padding:9px 11px; border:1px solid #d1d5db; border-radius:8px; font-size:14px;">';
    h += '<button id="txFindBtn" class="btn-secondary" style="white-space:nowrap;">Find</button>';
    h += '</div>';

    h += '<div id="txTargetInfo" style="display:none; font-size:13px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; margin-bottom:8px;"></div>';

    h += '<div style="display:flex; gap:8px; margin-bottom:8px;">';
    h += '<input id="txAmount" type="number" min="1" placeholder="Amount (µ-tokens)" style="flex:1; padding:9px 11px; border:1px solid #d1d5db; border-radius:8px; font-size:14px;">';
    h += '<select id="txType" style="padding:9px 11px; border:1px solid #d1d5db; border-radius:8px; font-size:14px; background:#fff;">';
    h += '<option value="transfer">transfer</option>';
    h += '<option value="faucet">faucet</option>';
    h += '<option value="reward">reward</option>';
    h += '</select>';
    h += '</div>';

    h += '<input id="txNote" type="text" placeholder="Note (optional)" style="width:100%; padding:9px 11px; border:1px solid #d1d5db; border-radius:8px; font-size:14px; margin-bottom:8px; box-sizing:border-box;">';

    h += '<button id="txSendBtn" style="width:100%; padding:11px; background:#111; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer;">Send tokens</button>';
    h += '<div id="txResult" style="font-size:13px; margin-top:10px;"></div>';
    h += '</div>';

    h += '<div style="border-top:1px solid #e5e7eb; padding-top:14px; margin-top:14px;">';
    h += '<div style="font-size:13px; font-weight:600; margin-bottom:8px;">Recent transactions (20)</div>';
    h += '<div id="txRecent" style="font-size:12px;">Loading...</div>';
    h += '</div>';

    h += '</div>';
    return h;
  }

  async function renderTreasuryUsage(sb) {
    var el = document.getElementById('treasuryUsage');
    if (!el) return;
    var res = await sb.rpc('treasury_usage');
    if (res.error) { el.textContent = 'Limits error: ' + res.error.message; return; }
    var rows = res.data || [];
    if (!rows.length) { el.textContent = 'No limits configured.'; return; }
    var parts = rows.map(function (r) {
      return esc(r.tx_type) + ': ' + fmt(r.used_today) + ' / ' + fmt(r.daily_limit) + ' used today';
    });
    el.innerHTML = 'Daily limits - ' + parts.join('  |  ');
  }

  async function renderRecentTransactions(sb) {
    var el = document.getElementById('txRecent');
    if (!el) return;
    var res = await sb.rpc('recent_transactions', { limit_n: 20 });
    if (res.error) { el.textContent = 'Error: ' + res.error.message; return; }
    var rows = res.data || [];
    if (!rows.length) { el.innerHTML = '<em style="color:#9ca3af;">No transactions yet.</em>'; return; }

    var h = '<div style="overflow-x:auto;">';
    h += '<table style="width:100%; border-collapse:collapse; font-size:12px;">';
    h += '<thead><tr style="text-align:left; color:#6b7280; border-bottom:1px solid #e5e7eb;">';
    h += '<th style="padding:6px 4px;">Time</th>';
    h += '<th style="padding:6px 4px;">Type</th>';
    h += '<th style="padding:6px 4px; text-align:right;">Amount</th>';
    h += '<th style="padding:6px 4px; text-align:right;">Balance</th>';
    h += '<th style="padding:6px 4px;">Description</th>';
    h += '</tr></thead><tbody>';

    rows.forEach(function (r) {
      var amt = (r.amount > 0 ? '+' : '') + fmt(r.amount);
      var amtColor = r.amount > 0 ? '#059669' : (r.amount < 0 ? '#dc2626' : '#6b7280');
      var t = new Date(r.created_at);
      var timeStr = t.toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
      var balStr = (r.balance_after == null) ? '-' : fmt(r.balance_after);
      h += '<tr style="border-bottom:1px solid #f3f4f6;">';
      h += '<td style="padding:6px 4px; color:#6b7280; white-space:nowrap;">' + esc(timeStr) + '</td>';
      h += '<td style="padding:6px 4px;">' + esc(r.type) + '</td>';
      h += '<td style="padding:6px 4px; text-align:right; color:' + amtColor + '; font-weight:600;">' + esc(amt) + '</td>';
      h += '<td style="padding:6px 4px; text-align:right; color:#6b7280;">' + esc(balStr) + '</td>';
      h += '<td style="padding:6px 4px; color:#374151;">' + esc(r.description || '') + '</td>';
      h += '</tr>';
    });

    h += '</tbody></table></div>';
    el.innerHTML = h;
  }

  async function findUser(sb) {
    var input = document.getElementById('txEmail');
    var info = document.getElementById('txTargetInfo');
    if (!input || !info) return;
    var q = (input.value || '').trim();
    info.style.display = 'none';
    if (!q) return;
    var res = await sb.rpc('find_user_by_email', { email_q: q });
    if (res.error) { info.style.display='block'; info.textContent = 'Error: ' + res.error.message; return; }
    var rows = res.data || [];
    if (!rows.length) { info.style.display='block'; info.textContent = 'No user found for "' + q + '"'; return; }
    var u = rows[0];
    info.style.display = 'block';
    info.innerHTML = '<strong>' + esc(u.email) + '</strong> - balance: ' + fmt(u.token_balance) + ' u-tokens - role: ' + esc(u.role || '-');
    input.value = u.email;
  }

  async function sendTokens(sb) {
    var emailEl = document.getElementById('txEmail');
    var amountEl = document.getElementById('txAmount');
    var typeEl = document.getElementById('txType');
    var noteEl = document.getElementById('txNote');
    var resultEl = document.getElementById('txResult');
    var btn = document.getElementById('txSendBtn');
    if (!emailEl || !amountEl || !typeEl || !resultEl || !btn) return;

    var email = (emailEl.value || '').trim();
    var amount = parseInt(amountEl.value, 10);
    var txType = typeEl.value;
    var note = (noteEl.value || '').trim() || null;

    resultEl.innerHTML = '';
    resultEl.style.color = '#6b7280';
    if (!email) { resultEl.textContent = 'Email is required.'; return; }
    if (!amount || amount <= 0) { resultEl.textContent = 'Amount must be > 0.'; return; }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    var res = await sb.rpc('transfer_tokens', {
      target_email: email,
      amount: amount,
      tx_type: txType,
      note: note
    });

    btn.disabled = false;
    btn.textContent = 'Send tokens';

    if (res.error) {
      resultEl.style.color = '#dc2626';
      resultEl.textContent = 'Error: ' + res.error.message;
      return;
    }
    var data = res.data || {};
    if (data.error) {
      resultEl.style.color = '#dc2626';
      resultEl.textContent = data.error +
        (data.daily_limit != null ? ' (used ' + data.used_today + ' / ' + data.daily_limit + ')' : '');
      return;
    }
    resultEl.style.color = '#059669';
    resultEl.textContent = 'Sent ' + fmt(data.amount) + ' u-tokens to ' + (data.target || email) + ' [' + (data.tx_type || txType) + ']';

    amountEl.value = '';
    noteEl.value = '';

    await Promise.all([renderTreasuryUsage(sb), renderRecentTransactions(sb)]);
  }

  async function init() {
    var container = paneAcc();
    if (!container) return;
    container.innerHTML = '<div class="app-loading">Loading settings...</div>';

    try {
      var session = await window.imarchAuth.getSession();
      if (!session || !session.user) {
        container.innerHTML = '<div class="app-error">Not authenticated.</div>';
        return;
      }

      var email = session.user.email;
      var userId = session.user.id;
      var sb = window.imarchAuth.getClient();

      var prof = await sb.from('profiles').select('is_treasury, is_admin').eq('id', userId).single();
      var isTreasury = !!(prof.data && prof.data.is_treasury);

      var h = '<div class="dash-grid" style="max-width: 900px;">';

      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Profile</h3></div>';
      h += '<div class="meta-grid" style="border-top:none; padding-top:0;">';
      h += '<div class="meta-item"><label>Email</label><span>' + esc(email) + '</span></div>';
      h += '<div class="meta-item"><label>Status</label><span style="color:#059669; font-weight:600;">Active</span></div>';
      h += '</div>';
      h += '</div>';

      if (isTreasury) h += treasurySectionHtml();

      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Security</h3></div>';
      h += '<p style="font-size:14px; color:#6b7280; margin-top:0; margin-bottom:16px;">Sign out if you are using a shared device.</p>';
      h += '<button id="signOutBtn" class="btn-secondary" style="color:#dc2626; border-color:#fecaca;">Sign Out</button>';
      h += '</div>';

      h += '</div>';
      container.innerHTML = h;

      var signOutBtn = document.getElementById('signOutBtn');
      if (signOutBtn) {
        signOutBtn.onclick = async function () {
          signOutBtn.textContent = 'Signing out...';
          await window.imarchAuth.signOut();
          window.location.href = '/app/';
        };
      }

      if (isTreasury) {
        await Promise.all([renderTreasuryUsage(sb), renderRecentTransactions(sb)]);
        var findBtn = document.getElementById('txFindBtn');
        var sendBtn = document.getElementById('txSendBtn');
        if (window.imarchTreasuryFlow) { window.imarchTreasuryFlow.render(sb, document.getElementById('treasuryCard')); }
        if (findBtn) findBtn.onclick = function () { findUser(sb); };
        if (sendBtn) sendBtn.onclick = function () { sendTokens(sb); };
        if (window.imarchAdmin) {
          var _b1 = document.createElement('div');
          var _b2 = document.createElement('div');
          container.appendChild(_b1);
          container.appendChild(_b2);
          window.imarchAdmin.adminPayments(_b1, sb);
          window.imarchAdmin.serviceGrants(_b2, sb);
        }
      }

    } catch (e) {
      container.innerHTML = '<div class="app-error">Error: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchSettings = { init: init };
})();