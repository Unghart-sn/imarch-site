(function(){
  var FLAG = '__lot03Submitting';
  function init(){
    var f = document.querySelector('form[name="lot-03-presentation-passport"]');
    if (!f) return;
    if (!window.fetch || !window.FormData || !window.URLSearchParams) return;
    f.addEventListener('submit', function(e){
      if (f.getAttribute('data-lot03-busy') === '1') { e.preventDefault(); return; }
      e.preventDefault();
      var go = f.getAttribute('action') || window.location.pathname;
      var body;
      try { body = new URLSearchParams(new FormData(f)).toString(); }
      catch (err) { f.submit(); return; }
      f.setAttribute('data-lot03-busy','1');
      var btn = f.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; }
      fetch(go, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body })
        .then(function(){ window.location.href = go; })
        .catch(function(){ f.removeAttribute('data-lot03-busy'); if (btn) btn.disabled = false; f.submit(); });
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); }
  else { init(); }
})();
