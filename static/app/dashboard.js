// IMARCH App - Dashboard Module
(function () {
  'use strict';

  const paneAcc = () => document.getElementById('app-content');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function formatImarch(mu) {
    if (!mu || mu === 0) return '0 IMARCH';
    const neg = mu < 0;
    const abs = Math.abs(mu);
    const whole = Math.floor(abs / 100);
    const frac = abs % 100;
    const wholeStr = whole.toLocaleString('en-US');
    const sign = neg ? '-' : '';
    if (frac === 0) return sign + wholeStr + ' IMARCH';
    return sign + wholeStr + '.' + String(frac).padStart(2, '0') + ' IMARCH';
  }

  function renderLoginForm(container) {
    container.innerHTML = '<div class="dash-card" style="max-width: 400px; margin: 0 auto; text-align: center;">'
      + '<h3 style="margin-top:0; margin-bottom:16px;">Sign In</h3>'
      + '<input type="email" id="loginEmail" placeholder="your@email.com" style="padding:12px; width:100%; margin-bottom:16px; border:1px solid #e5e7eb; border-radius:8px; font-family:inherit;">'
      + '<button id="loginBtn" class="btn-primary" style="width:100%;">Send Magic Link</button>'
      + '<div id="loginMsg" style="margin-top:16px; font-size:13px;"></div>'
      + '</div>';

    const btn = document.getElementById('loginBtn');
    const input = document.getElementById('loginEmail');
    const msg = document.getElementById('loginMsg');

    btn.onclick = async function() {
      const email = input.value.trim();
      if (!email) { msg.innerHTML = '<span style="color:#dc2626;">Please enter your email</span>'; return; }
      msg.innerHTML = 'Sending...';
      try {
        const redirectUrl = window.location.origin + '/app/';
        const { error } = await window.imarchAuth.sendLoginLink(email, redirectUrl);
        if (error) throw error;
        msg.innerHTML = '<span style="color:#059669;">Link sent to ' + esc(email) + '. Check your inbox.</span>';
      } catch (e) {
        msg.innerHTML = '<span style="color:#dc2626;">Error: ' + esc(e.message) + '</span>';
      }
    };
  }

  async function init() {
    const container = paneAcc();
    if (!container) return;

    container.innerHTML = '<div class="app-loading">Loading account...</div>';

    try {
      const session = await window.imarchAuth.getSession();
      if (!session || !session.user) {
        renderLoginForm(container);
        return;
      }

      const uid = session.user.id;
      const sb = window.imarchAuth.getClient();
      
      const res = await sb.from('profiles')
        .select('id,email,full_name,token_balance,is_admin,created_at')
        .eq('id', uid)
        .single();

      if (res.error || !res.data) {
        container.innerHTML = '<div class="app-error">Profile not found.</div>';
        return;
      }

      const profile = res.data;
      
      const ordersRes = await sb.from('orders')
        .select('id,title,sha256,status,pdf_url,created_at,holder_name')
        .eq('issuer_user_id', uid)
        .in('status', ['ready', 'completed'])
        .order('created_at', { ascending: false });
        
      const certs = ordersRes.data || [];

      let h = '<div class="dash-grid">';

      // 1. Balance
      h += '<div class="dash-card balance-widget">'
        + '<div class="amount">' + esc((profile.token_balance || 0).toLocaleString('en-US')) + '</div>'
        + '<div class="currency">µ-tokens</div>'
        + '<div class="dash-actions">'
        + '<a class="btn-primary" href="https://whydonate.com/fundraising/vis-realitatis-preserving-memory" target="_blank">Top Up</a>'
        + '<a class="btn-secondary" href="/en/docs/consilium/">Bonus Shop</a>'
        + '</div>'
        + '</div>';

      // 2. Profile
      const initial = profile.email ? profile.email[0].toUpperCase() : '?';
      h += '<div class="dash-card">'
        + '<div class="profile-info">'
        + '<div class="avatar">' + initial + '</div>'
        + '<div class="profile-details">'
        + '<h3>' + esc(profile.full_name || 'Account Holder') + '</h3>'
        + '<p>' + esc(profile.email) + '</p>'
        + '</div>'
        + '</div>'
        + '<div class="meta-grid">'
        + '<div class="meta-item"><label>Account ID</label><span>' + esc(profile.id.split('-')[0]) + '...</span></div>'
        + '<div class="meta-item"><label>Registered</label><span>' + esc(String(profile.created_at).slice(0, 10)) + '</span></div>'
        + '</div>'
        + '</div>';

      // 3. Certificates
      h += '<div class="dash-card">';
      
      h += '<div class="card-header">'
        + '<h3>Recent Certificates</h3>'
        + (certs.length > 5 ? '<a href="https://imarch.ltd/certificates.html" style="font-size:13px; color:#6b7280; text-decoration:none;">All certificates &rarr;</a>' : '')
        + '</div>';

      h += '<div style="margin-top:12px; margin-bottom:16px; display:flex; gap:8px; flex-wrap:wrap;">'
        + '<a href="/en/docs/consilium/cbb-0005/" class="btn-primary" style="font-size:13px; padding:8px 16px;">Lot cbb-0005 &rarr;</a>'
        + '</div>';

      const readyCerts = certs.filter(c => c.pdf_url).slice(0, 5);
      
      if (!readyCerts.length) {
        h += '<div class="empty-state">No certificates issued yet.</div>';
      } else {
        h += '<table class="dash-table"><thead><tr>'
          + '<th>Date</th><th>Name</th><th style="text-align:right;">Download</th>'
          + '</tr></thead><tbody>';
        for (const c of readyCerts) {
          const shortTime = String(c.created_at || '').replace('T', ' ').slice(0, 10);
          const certName = c.title || c.holder_name || ('Certificate #' + c.id.slice(0,6));
          h += '<tr>'
            + '<td class="cert-date">' + esc(shortTime) + '</td>'
            + '<td class="cert-name">' + esc(certName) + '</td>'
            + '<td style="text-align:right;"><a href="' + esc(c.pdf_url) + '" target="_blank" class="btn-download">PDF</a></td>'
            + '</tr>';
        }
        h += '</tbody></table>';
      }
      h += '</div>'; // end certificate card
      h += '</div>'; // end dash-grid
      container.innerHTML = h;

    } catch (e) {
      console.error(e);
      container.innerHTML = '<div class="app-error">Error loading data: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchDashboard = { init: init };
})();
