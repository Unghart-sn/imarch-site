// IMARCH App - Settings Module
(function () {
  'use strict';

  const paneAcc = () => document.getElementById('app-content');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  async function init() {
    const container = paneAcc();
    if (!container) return;
    container.innerHTML = '<div class="app-loading">Loading settings...</div>';

    try {
      const session = await window.imarchAuth.getSession();
      if (!session || !session.user) {
        container.innerHTML = '<div class="app-error">Not authenticated.</div>';
        return;
      }

      const email = session.user.email;

      let h = '<div class="dash-grid" style="max-width: 600px;">';
      
      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Profile</h3></div>';
      h += '<div class="meta-grid" style="border-top:none; padding-top:0;">';
      h += '<div class="meta-item"><label>Email</label><span>' + esc(email) + '</span></div>';
      h += '<div class="meta-item"><label>Status</label><span style="color:#059669; font-weight:600;">Active</span></div>';
      h += '</div>';
      h += '</div>';

      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Security</h3></div>';
      h += '<p style="font-size:14px; color:#6b7280; margin-top:0; margin-bottom:16px;">Sign out if you are using a shared device.</p>';
      h += '<button id="signOutBtn" class="btn-secondary" style="color:#dc2626; border-color:#fecaca;">Sign Out</button>';
      h += '</div>';

      h += '</div>';
      container.innerHTML = h;

      const btn = document.getElementById('signOutBtn');
      if (btn) {
        btn.onclick = async function() {
          btn.textContent = 'Signing out...';
          await window.imarchAuth.signOut();
          window.location.href = '/app/';
        };
      }

    } catch (e) {
      container.innerHTML = '<div class="app-error">Error: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchSettings = { init: init };
})();