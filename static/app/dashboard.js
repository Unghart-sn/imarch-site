// IMARCH App — Dashboard = Command Bridge (navigator first)
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
    memoFull:  '/ru/docs/collegium/investment-memorandum-2/',
    certForm:  '/en/certify/',
    assets:    '#/assets',
    audit:     '/audit.html',
    consilium: '/en/docs/consilium/',
    collegium: '/en/docs/collegium/',
    check:     '/check.html'
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
        var redirectUrl = window.location.origin + '/app/';
        var r = await window.imarchAuth.sendLoginLink(email, redirectUrl);
        if (r && r.error) throw r.error;
        msg.innerHTML = '<span style="color:#059669;">Link sent to ' + esc(email) + '. Check your inbox.</span>';
      } catch (e) {
        msg.innerHTML = '<span style="color:#dc2626;">Error: ' + esc(e.message) + '</span>';
      }
    };
  }

  // 1. ECOSYSTEM NAVIGATOR — first thing a person sees
  function navigatorBlock() {
    var contours = [
      { tag: 'Scientific', title: 'Research contour',
        text: 'Protocols, monographs, consilium lots and the passport of the method.',
        links: [ { href: L.collegium, label: 'Collegium &amp; method' }, { href: L.consilium, label: 'Consilium lots' } ] },
      { tag: 'Expert', title: 'Expert &amp; certification',
        text: 'SHA-256 + RFC 3161 timestamped certificates, independent verification.',
        links: [ { href: L.certForm, label: 'Issue a certificate' }, { href: L.check, label: 'Public verification' } ] },
      { tag: 'Investment', title: 'Participation &amp; assets',
        text: 'Participation units secured by the product and expert infrastructure of the 10 contours.',
        links: [ { href: L.memo, label: 'Investment memorandum (RU)' }, { href: L.assets, label: 'Asset registry' } ] }
    ];

    var h = '<div class="dash-card nav-widget">'
      + '<div class="nav-widget-head">'
      + '<h3>IMARCH ecosystem</h3>'
      + '<p>Choose the contour you are working in. All products stay one click apart.</p>'
      + '</div><div class="nav-widget-grid">';

    contours.forEach(function (c) {
      h += '<div class="nav-tile">'
        + '<div class="nav-tile-tag">' + c.tag + '</div>'
        + '<div class="nav-tile-title">' + c.title + '</div>'
        + '<p class="nav-tile-text">' + esc(c.text) + '</p>'
        + '<div class="nav-tile-links">'
        + c.links.map(function (l) { return '<a href="' + esc(l.href) + '">' + l.label + ' &rarr;</a>'; }).join('')
        + '</div></div>';
    });

    h += '</div>'
      + '<div class="nav-widget-cta">'
      + '<a class="btn-primary" href="' + esc(L.memo) + '">Investment memorandum &rarr;</a>'
      + '<a class="btn-secondary" href="' + esc(L.memoFull) + '">Full text (RU) &rarr;</a>'
      + '</div>'
      + '<p class="nav-widget-note">Units are not a promise of income. They are secured by access to products, publications, consulting and chronological priority of the Founding Circle.</p>'
      + '</div>';
    return h;
  }

  // 2. PARTICIPATION STATUS — the person sees themselves as donor-investor
  function statusBlock(profile, promo) {
    var mu = Number(profile.token_balance) || 0;
    var level = mu >= 1000 ? 'Founding Circle' : (mu >= 100 ? 'Participant' : 'Observer');

    return '<div class="dash-card">'
      + '<div class="card-header"><h3>Participation</h3>'
      + '<span class="status-pill">' + esc(level) + '</span></div>'
      + '<div class="status-row">'
      + '<div class="status-cell"><label>Entered as</label><span>' + esc(profile.full_name || 'Account holder') + '</span></div>'
      + '<div class="status-cell"><label>Member since</label><span>' + esc(String(profile.created_at).slice(0, 10)) + '</span></div>'
      + '<div class="status-cell"><label>Entry basis</label><span>1 : 1 (units)</span></div>'
      + '</div>'
      + '<div class="balance-inline">'
      + '<div><div class="balance-inline-amount">' + esc(fmtImarch(mu)) + '</div>'
      + '<div class="balance-inline-sub">balance &middot; ' + esc(fmtMu(mu)) + '</div></div>'
      + '<div><div class="balance-inline-amount">' + esc(fmtImarch(promo)) + '</div>'
      + '<div class="balance-inline-sub">promo (trial certificate only)</div></div>'
      + '</div>'
      + '<div class="dash-actions" style="justify-content:flex-start;margin-top:20px;">'
      + '<a class="btn-primary" href="' + esc(L.assets) + '">Open asset registry &rarr;</a>'
      + '<a class="btn-secondary" href="' + esc(L.memo) + '">Memorandum</a>'
      + '</div>'
      + '<p class="status-note">Status is provisional until the Founding Circle registry is published. Units and balances are visible in the <a href="' + esc(L.audit) + '">public audit</a>.</p>'
      + '</div>';
  }

  // 3. CERTIFICATES — compact, details moved to the registry
  function certificatesBlock(certs) {
    var ready = (certs || []).filter(function (c) { return c.pdf_url; }).slice(0, 3);

    var h = '<div class="dash-card">'
      + '<div class="card-header"><h3>Certificates</h3>'
      + '<a href="' + esc(L.assets) + '" class="link-quiet">All certificates &rarr;</a></div>'
      + '<div class="dash-actions" style="justify-content:flex-start;margin:12px 0 18px;">'
      + '<a class="btn-primary" href="' + esc(L.certForm) + '">Issue certificate</a>'
      + '<a class="btn-secondary" href="' + esc(L.consilium) + '">Consilium lots</a>'
      + '</div>';

    if (!ready.length) {
      h += '<div class="empty-state">No certificates issued yet.</div>';
    } else {
      h += '<div class="table-wrap"><table class="dash-table"><thead><tr><th>Date</th><th>Name</th><th style="text-align:right;">PDF</th></tr></thead><tbody>';
      ready.forEach(function (c) {
        var d = String(c.created_at || '').slice(0, 10);
        var name = c.title || c.holder_name || ('Certificate #' + String(c.id).slice(0, 6));
        h += '<tr><td class="cert-date">' + esc(d) + '</td><td class="cert-name">' + esc(name) + '</td>'
          + '<td style="text-align:right;"><a href="' + esc(c.pdf_url) + '" target="_blank" rel="noopener" class="btn-download">PDF</a></td></tr>';
      });
      h += '</tbody></table></div>';
    }

    return h + '<p class="status-note">Full record, hashes and verification links are in the <a href="' + esc(L.assets) + '">asset registry</a>.</p></div>';
  }

  async function init() {
    var container = document.getElementById('app-content');
    if (!container) return;
    container.innerHTML = '<div class="app-loading">Loading account...</div>';

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
        .select('id,title,sha256,status,pdf_url,created_at,holder_name')
        .eq('issuer_user_id', uid)
        .in('status', ['ready', 'completed'])
        .order('created_at', { ascending: false });

      var certs = (ordersRes && ordersRes.data) || [];

      container.innerHTML = '<div class="dash-grid">'
        + navigatorBlock()
        + statusBlock(profile, promo)
        + certificatesBlock(certs)
        + '</div>';
    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="app-error">Error loading data: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchDashboard = { init: init };
})();