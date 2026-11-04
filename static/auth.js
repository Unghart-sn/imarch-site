// auth.js - IMARCH Supabase auth helper (Session #8)
// Config comes from auth-config.js (window.IMARCH_AUTH = { url, key }).
(function () {
  "use strict";

  var cfg = window.IMARCH_AUTH || {};
  var client = null;

  function getClient() {
    if (client) return client;
    if (!window.supabase || !window.supabase.createClient) {
      throw new Error("Supabase SDK not loaded");
    }
    if (!cfg.url || !cfg.key) {
      throw new Error("IMARCH_AUTH config missing");
    }
    client = window.supabase.createClient(cfg.url, cfg.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    return client;
  }

  async function getSession() {
    var c = getClient();
    var r = await c.auth.getSession();
    return (r && r.data) ? r.data.session : null;
  }

  async function getCurrentEmail() {
    var s = await getSession();
    return (s && s.user) ? s.user.email : null;
  }

  async function sendLoginLink(email, redirectTo) {
    var c = getClient();
    var opts = { email: email };
    if (redirectTo) opts.options = { emailRedirectTo: redirectTo };
    return c.auth.signInWithOtp(opts);
  }

  async function signOut() {
    try { await getClient().auth.signOut(); } catch (e) { console.warn("[auth] signOut", e); }
    try { localStorage.removeItem("imarch_session_version"); } catch (e) {}
  }

    async function loadAccounts() {
    var c = getClient();
    var session = await getSession();
    if (!session || !session.user) return { accounts: [] };
    var email = session.user.email;

    var profileRes = await c.from('profiles').select('*').eq('email', email).single();
    if (profileRes.error || !profileRes.data) {
      console.warn('[auth] Profile not found for', email);
      return { accounts: [] };
    }
    var profile = profileRes.data;

    var ordersRes = await c.from('orders').select('*').eq('user_id', profile.id).order('created_at', { ascending: false });
    var certificates = [];
    var nameFromOrder = null;

    if (ordersRes.data && ordersRes.data.length > 0) {
       certificates = ordersRes.data.map(function(o) { return o.sha256 || o.id; }).filter(Boolean);
       nameFromOrder = ordersRes.data[0].full_name;
    }

    var account = {
      account_id: profile.id,
      account_key: profile.id,
      owner_name: profile.full_name || nameFromOrder || 'Friend',
      owner_email: profile.email,
      token_balance: profile.token_balance || 0, token_balance_formatted: ((profile.token_balance || 0) / 100).toFixed(2),
      is_admin: profile.is_admin || false,
      role: profile.role || 'user',
      certificates: certificates,
      created_at: profile.created_at
    };
    return { accounts: [account] };
  }

  function findAccountByEmail(data, email) {
    if (!data || !email) return null;
    var list = Array.isArray(data) ? data : (data.accounts || []);
    var t = String(email).toLowerCase();
    for (var i = 0; i < list.length; i++) {
      var a = list[i];
      if (a && a.owner_email && String(a.owner_email).toLowerCase() === t) return a;
    }
    return null;
  }

  async function findAccountForSession() {
    var email = await getCurrentEmail();
    if (!email) return null;
    var data = await loadAccounts();
    return findAccountByEmail(data, email);
  }

  function firstCertId(account) {
    if (!account || !account.certificates || !account.certificates.length) return null;
    var c = account.certificates[0];
    if (typeof c === "string") return c;
    return c.cert_id || c.id || c.sha || null;
  }

  function saveSessionVersion(account) {
    try {
      var v = (account && typeof account.session_version === "number") ? account.session_version : 0;
      localStorage.setItem("imarch_session_version", String(v));
    } catch (e) {}
  }

  function isSessionVersionFresh(account) {
    var stored = null;
    try { stored = localStorage.getItem("imarch_session_version"); } catch (e) {}
    if (stored === null) return true;
    var expected = (account && typeof account.session_version === "number") ? account.session_version : 0;
    return String(stored) === String(expected);
  }

  // Ловим токен из URL (после магик-ссылки)
  (async function() {
    try {
      var c = getClient();
      var session = await c.auth.getSession();
      if (!session.data.session && window.location.hash) {
        // Если в URL есть токен, Supabase SDK сам его подхватит
        await c.auth.getSession(); 
      }
    } catch(e) { console.warn('Auth init error', e); }
  })();

  window.imarchAuth = {
    getClient: getClient,
    getSession: getSession,
    getCurrentEmail: getCurrentEmail,
    sendLoginLink: sendLoginLink,
    signOut: signOut,
    loadAccounts: loadAccounts,
    findAccountByEmail: findAccountByEmail,
    findAccountForSession: findAccountForSession,
    firstCertId: firstCertId,
    saveSessionVersion: saveSessionVersion,
    isSessionVersionFresh: isSessionVersionFresh
  };
})();