// IMARCH App — Asset Registry (technical detail lives here)
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c];
    });
  }

  // 100 µ = 1 IMARCH
  function fmtImarch(mu) {
    mu = Number(mu) || 0;
    var neg = mu < 0, abs = Math.abs(mu);
    var whole = Math.floor(abs / 100), frac = abs % 100;
    var s = whole.toLocaleString('en-US');
    if (frac) s += '.' + String(frac).padStart(2, '0');
    return (neg ? '-' : '') + s + ' IMARCH';
  }
  function fmtMu(mu) { return (Number(mu) || 0).toLocaleString('en-US') + ' µ'; }

  var L = {
    memo:      '/ru/docs/collegium/investment-memorandum/',
    certForm:  '/en/certify/',
    dashboard: '#/dashboard',
    check:     '/check.html',
    consilium: '/en/docs/consilium/',
    audit:     '/audit.html'
  };

  function renderLoginForm(container) {
    container.innerHTML = '<div class="dash-card" style="max-width:400px;margin:0 auto;text-align:center;">'
      + '<h3 style="margin-top:0;margin-bottom:16px;">Sign In</h3>'
      + '<input type="email" id="loginEmail" placeholder="your@email.com" style="padding:12px;width:100%;margin-bottom:16px;border:1px solid #e5e7eb;border-radius:8px;font-family:inherit;">'
      + '<button id="loginBtn" class="btn-primary" style="width:100%;">Send Magic Link</button>'
      + '<div id="loginMsg" style="margin-top:16px;font-size:13px;"></div></div>';

    var btn = document.getElementById('loginBtn');
    var input = document.getElementById('loginEmail');
    var msg = document.getElementById('loginMsg');

    btn.onclick = async function () {
      var email = input.value.trim();
      if (!email) { msg.innerHTML = '<span style="color:#dc2626;">Please enter your email</span>'; return; }
      msg.innerHTML = 'Sending...';
      try {
        var r = await window.imarchAuth.sendLoginLink(email, window.location.origin + '/app/');
        if (r && r.error) throw r.error;
        msg.innerHTML = '<span style="color:#059669;">Link sent to ' + esc(email) + '.</span>';
      } catch (e) {
        msg.innerHTML = '<span style="color:#dc2626;">Error: ' + esc(e.message) + '</span>';
      }
    };
  }

  function balancesBlock(profile, promo) {
    var mu = Number(profile.token_balance) || 0;
    var level = mu >= 1000 ? 'Founding Circle' : (mu >= 100 ? 'Participant' : 'Observer');

    return '<div class="dash-card">'
      + '<div class="card-header"><h3>Balances</h3>'
      + '<span class="status-pill">' + esc(level) + '</span></div>'
      + '<div class="status-row">'
      + '<div class="status-cell"><label>Account</label><span>' + esc(profile.email || '') + '</span></div>'
      + '<div class="status-cell"><label>Member since</label><span>' + esc(String(profile.created_at).slice(0, 10)) + '</span></div>'
      + '</div>'
      + '<div class="balance-inline">'
      + '<div><div class="balance-inline-amount">' + esc(fmtImarch(mu)) + '</div>'
      + '<div class="balance-inline-sub">main balance · ' + esc(fmtMu(mu)) + '</div></div>'
      + '<div><div class="balance-inline-amount">' + esc(fmtImarch(promo)) + '</div>'
      + '<div class="balance-inline-sub">promo · trial certificate only</div></div>'
      + '</div>'
      + '<div class="status-row" style="margin-top:20px;">'
      + '<div class="status-cell"><label>Hard cap</label><span>888,800 µ</span></div>'
      + '<div class="status-cell"><label>Promo cap</label><span>8,888 µ</span></div>'
      + '<div class="status-cell"><label>Certificate cost</label><span>20 µ</span></div>'
      + '</div>'
      + '</div>';
  }

  function certificatesTable(certs) {
    var rows = certs || [];
    var h = '<div class="dash-card">'
      + '<div class="card-header"><h3>Certificates</h3>'
      + '<a href="' + esc(L.certForm) + '" class="link-quiet">Issue new →</a></div>';

    if (!rows.length) {
      h += '<div class="empty-state">No certificates yet. A certificate costs 20 µ and is timestamped with SHA-256 + RFC 3161.</div>';
      h += '<div class="dash-actions" style="justify-content:flex-start;margin-top:16px;">'
        + '<a class="btn-primary" href="' + esc(L.certForm) + '">Issue certificate</a>'
        + '<a class="btn-secondary" href="' + esc(L.consilium) + '">Consilium lots</a></div></div>';
      return h;
    }

    h += '<div class="table-wrap"><table class="dash-table"><thead><tr>'
      + '<th>Date</th><th>Name</th><th>SHA-256</th><th style="text-align:right;">Actions</th>'
      + '</tr></thead><tbody>';

    rows.forEach(function (c) {
      var d = String(c.created_at || '').slice(0, 10);
      var name = c.title || c.holder_name || ('Certificate #' + String(c.id).slice(0, 6));
      var hash = String(c.sha256 || '');
      var shortHash = hash ? (hash.slice(0, 12) + '…') : '—';

      h += '<tr>'
        + '<td class="cert-date">' + esc(d) + '</td>'
        + '<td class="cert-name">' + esc(name)
        + (c.is_trial ? ' <span class="status-pill pill-trial">trial</span>' : '')
        + '</td>'
        + '<td class="cert-hash">' + esc(shortHash) + '</td>'
        + '<td style="text-align:right;white-space:nowrap;">'
        + (c.pdf_url ? '<a href="' + esc(c.pdf_url) + '" target="_blank" rel="noopener" class="btn-ghost">PDF</a>' : '')
        + (hash ? ' <a href="' + esc(L.check) + '?hash=' + encodeURIComponent(hash) + '" class="btn-ghost">Verify</a>' : '')
        + '</td></tr>';
    });

    h += '</tbody></table></div>'
      + '<p class="status-note">Every certificate is anchored with SHA-256 and an RFC 3161 timestamp. Verification is public and does not require an account — see the <a href="' + esc(L.audit) + '">public audit</a>.</p>'
      + '</div>';
    return h;
  }

  async function init() {
    var container = document.getElementById('app-content');
    if (!container) return;
    container.innerHTML = '<div class="app-loading">Loading asset registry...</div>';

    try {
      var session = await window.imarchAuth.getSession();
      if (!session || !session.user) { renderLoginForm(container); return; }

      var uid = session.user.id;
      var sb = window.imarchAuth.getClient();

      var res = await sb.from('profiles')
        .select('id,email,full_name,token_balance,is_admin,created_at')
        .eq('id', uid).single();
      if (res.error || !res.data) {
        container.innerHTML = '<div class="app-error">Profile not found.</div>';
        return;
      }
      var profile = res.data;

      var promo = 0;
      try {
        var pr = await sb.from('profiles').select('promo_balance').eq('id', uid).single();
        if (pr && pr.data && pr.data.promo_balance != null) promo = pr.data.promo_balance;
      } catch (e) { promo = 0; }

      var ordersRes = await sb.from('orders')
        .select('id,title,sha256,status,pdf_url,created_at,holder_name,is_trial')
        .eq('issuer_user_id', uid)
        .in('status', ['ready', 'completed'])
        .order('created_at', { ascending: false });

      var certs = (ordersRes && ordersRes.data) || [];

      if (ordersRes && ordersRes.error) {
        var retry = await sb.from('orders')
          .select('id,title,sha256,status,pdf_url,created_at,holder_name')
          .eq('issuer_user_id', uid)
          .in('status', ['ready', 'completed'])
          .order('created_at', { ascending: false });
        certs = (retry && retry.data) || [];
      }

      container.innerHTML = '<div class="dash-grid">'
        + '<div class="dash-card" style="border:none;box-shadow:none;background:transparent;padding:0;">'
        + '<a href="' + esc(L.dashboard) + '" class="link-quiet">← Back to dashboard</a>'
        + '<h2 style="margin:8px 0 0;">Asset Registry</h2>'
        + '<p class="status-note" style="margin:6px 0 0;">Technical record of participation units and certificates. Current terms are in the <a href="' + esc(L.memo) + '">investment memorandum (RU)</a>.</p>'
        + '</div>'
        + balancesBlock(profile, promo)
        + certificatesTable(certs)
        + '</div>';
    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="app-error">Error loading registry: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchAssets = { init: init };
})();