// IMARCH App Shell  hash router
(function () {
  'use strict';

  var ROUTES = {
    dashboard: { title: 'My Certificates', fragment: '/fragments/dashboard.html' },
    safe:      { title: 'Digital Safe',    fragment: '/fragments/safe.html' },
    settings:  { title: 'Settings',        fragment: '/fragments/settings.html' }
  };
  var DEFAULT_ROUTE = 'dashboard';

  var contentEl = document.getElementById('app-content');
  var titleEl   = document.getElementById('app-page-title');
  var navLinks  = document.querySelectorAll('.app-nav-link');

  function getRoute() {
    var hash = (location.hash || '').replace(/^#\/?/, '');
    return ROUTES[hash] ? hash : DEFAULT_ROUTE;
  }

  function setActive(route) {
    navLinks.forEach(function (link) {
      if (link.dataset.route === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function render(route) {
    var cfg = ROUTES[route];
    if (!cfg) return;

    setActive(route);
    titleEl.textContent = cfg.title;
    contentEl.innerHTML = '<div class="app-loading">Loading...</div>';

    fetch(cfg.fragment, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.text();
      })
      .then(function (html) {
        contentEl.innerHTML = html;
        if (route === 'dashboard' && window.imarchDashboard) {
          window.imarchDashboard.init();
        } else if (route === 'safe' && window.imarchSafeApp) {
          window.imarchSafeApp.init();
        } else if (route === 'settings' && window.imarchSettings) {
          window.imarchSettings.init();
        }
      })
      .catch(function (err) {
        contentEl.innerHTML =
          '<div class="app-error">Failed to load section. ' +
          '<span class="app-error-detail">' + err.message + '</span></div>';
      });
  }

  // --- ГЛОБАЛЬНЫЙ ВИДЖЕТ БАЛАНСА ---
    // Бургер меню логика
  var burgerBtn = document.getElementById('appBurgerBtn');
  var sidebarContent = document.getElementById('appSidebarContent');
  if (burgerBtn && sidebarContent) {
    burgerBtn.addEventListener('click', function() {
      sidebarContent.classList.toggle('is-open');
    });
  }

  async function renderGlobalBalance() {
    var el1 = document.getElementById('app-balance');
    var el2 = document.getElementById('app-balance-mobile');
    try {
      var session = await window.imarchAuth.getSession();
      if (!session || !session.user) return;
      var sb = window.imarchAuth.getClient();
      var res = await sb.from('profiles').select('token_balance').eq('id', session.user.id).single();
      if (res.data) {
        var mu = res.data.token_balance || 0;
        var formatted = (mu || 0).toLocaleString('en-US');
        if (el1) el1.textContent = formatted;
        if (el2) el2.textContent = formatted + ' µ-tokens';
      }
    } catch (e) { console.error('Balance error', e); }
  }

  window.addEventListener('hashchange', function() {
    if (sidebarContent) sidebarContent.classList.remove('is-open');
    renderGlobalBalance();
  });
  window.addEventListener('DOMContentLoaded', renderGlobalBalance);

  function onHashChange() {
    render(getRoute());
    renderGlobalBalance();
  }

  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('DOMContentLoaded', onHashChange);

  if (document.readyState !== 'loading') {
    onHashChange();
  }
})();
