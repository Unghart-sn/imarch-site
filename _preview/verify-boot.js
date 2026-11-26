(function () {
  "use strict";
  if (!window.imarchAuth) return;
  var params = new URLSearchParams(location.search);
  if (params.get("key")) return;
  window.imarchAuth.findAccountForSession().then(function (account) {
    if (!account) return;
    if (!window.imarchAuth.isSessionVersionFresh(account)) {
      window.imarchAuth.signOut().then(function(){
        location.replace("/login/?msg=session_expired");
      });
      return;
    }
    var url = new URL(location.href);
    url.searchParams.set("key", account.account_key);
    if (!url.searchParams.get("hash") && account.certificates && account.certificates.length) {
      url.searchParams.set("hash", String(account.certificates[0]).toLowerCase());
    }
    location.replace(url.toString());
  }).catch(function (e) { console.warn("[verify-boot]", e); });
})();