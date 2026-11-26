/* IMARCH — floating "back to account" chip for site pages (not for /app/) */
(function () {
  'use strict';

  if (/^\/app(\/|$)/.test(location.pathname)) return;

  function hasSession() {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (/^sb-.*-auth-token$/.test(k)) {
          var v = localStorage.getItem(k);
          if (v && v.length > 20) return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function mount() {
    if (!hasSession() || document.getElementById('imarch-account-chip')) return;

    var ru = (document.documentElement.lang || '').toLowerCase().indexOf('ru') === 0;
    var label = ru ? 'Личный кабинет' : 'My account';

    var a = document.createElement('a');
    a.id = 'imarch-account-chip';
    a.href = '/app/#/dashboard';
    a.title = label;
    a.innerHTML = '<span class="iac-dot"></span>' + label;

    var css = ''
      + '#imarch-account-chip{position:fixed;right:18px;bottom:18px;z-index:9999;display:inline-flex;align-items:center;gap:8px;'
      + 'padding:11px 16px;background:#0f172a;color:#fff;border-radius:999px;font:600 13px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;'
      + 'text-decoration:none;box-shadow:0 8px 24px rgba(15,23,42,.28);}'
      + '#imarch-account-chip:hover{background:#1e293b;text-decoration:none;color:#fff;}'
      + '#imarch-account-chip .iac-dot{width:7px;height:7px;border-radius:50%;background:#22c55e;display:inline-block;}'
      + '@media (max-width:600px){#imarch-account-chip{right:12px;bottom:12px;padding:10px 14px;font-size:12px;}}';

    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    document.body.appendChild(a);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();