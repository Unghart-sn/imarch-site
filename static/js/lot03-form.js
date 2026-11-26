(function () {
  var NOTIFY_URL = '/.netlify/functions/lot-03-notify';
  var PING_TIMEOUT = 2500;

  function ping(data) {
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, PING_TIMEOUT);
    var opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true
    };
    if (ctrl) opts.signal = ctrl.signal;
    return fetch(NOTIFY_URL, opts)
      .catch(function () { return null; })
      .then(function (r) { clearTimeout(timer); return r; });
  }

  function init() {
    var f = document.querySelector('form[name="lot-03-presentation-passport"]');
    if (!f) return;
    if (!window.fetch || !window.FormData || !window.URLSearchParams) return;

    f.addEventListener('submit', function (e) {
      if (f.getAttribute('data-lot03-busy') === '1') { e.preventDefault(); return; }
      e.preventDefault();

      var go = f.getAttribute('action') || window.location.pathname;
      var data = {};
      var body;
      try {
        var fd = new FormData(f);
        fd.forEach(function (v, k) { data[k] = v; });
        body = new URLSearchParams(fd).toString();
      } catch (err) { f.submit(); return; }

      f.setAttribute('data-lot03-busy', '1');
      var btn = f.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;

      fetch(go, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
      })
        .then(function () { return ping(data); })
        .then(function () { window.location.href = go; })
        .catch(function () {
          f.removeAttribute('data-lot03-busy');
          if (btn) btn.disabled = false;
          f.submit();
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
