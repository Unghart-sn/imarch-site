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

  function onHashChange() {
    render(getRoute());
  }

  window.addEventListener('hashchange', onHashChange);
  window.addEventListener('DOMContentLoaded', onHashChange);

  if (document.readyState !== 'loading') {
    onHashChange();
  }
})();