(function () {
  "use strict";
  var BASE = "/.netlify/functions/safe";

  async function getToken() {
    if (!window.imarchAuth || !window.imarchAuth.getSession) {
      throw new Error("imarchAuth not loaded");
    }
    var s = await window.imarchAuth.getSession();
    if (!s || !s.access_token) throw new Error("no session");
    return s.access_token;
  }

  async function call(action, opts) {
    opts = opts || {};
    var token = await getToken();
    var url = BASE + "?action=" + encodeURIComponent(action);
    if (opts.query) {
      for (var k in opts.query) {
        url += "&" + encodeURIComponent(k) + "=" + encodeURIComponent(opts.query[k]);
      }
    }
    var headers = { Authorization: "Bearer " + token };
    if (opts.json) headers["Content-Type"] = "application/json";
    if (opts.raw)  headers["Content-Type"] = "application/octet-stream";

    var res = await fetch(url, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body
    });

    if (opts.binary) {
      if (!res.ok) {
        var txt = await res.text();
        throw new Error("HTTP " + res.status + ": " + txt.slice(0, 200));
      }
      return new Uint8Array(await res.arrayBuffer());
    }

    var j = null;
    try { j = await res.json(); } catch (e) {}
    if (!res.ok || !j || j.ok !== true) {
      var msg = (j && (j.error || j.detail)) || ("HTTP " + res.status);
      var err = new Error(msg);
      err.status = res.status;
      err.body = j;
      throw err;
    }
    return j;
  }

  async function sha256Hex(bytes) {
    var buf = await crypto.subtle.digest("SHA-256", bytes);
    var arr = new Uint8Array(buf);
    var hex = "";
    for (var i = 0; i < arr.length; i++) {
      var h = arr[i].toString(16);
      if (h.length === 1) h = "0" + h;
      hex += h;
    }
    return hex;
  }

  function whoami() { return call("whoami"); }
  function list()   { return call("list"); }

  async function upload(blobBytes) {
    var bytes = blobBytes instanceof Uint8Array ? blobBytes : new Uint8Array(blobBytes);
    var sha = await sha256Hex(bytes);
    var size = bytes.byteLength;

    var pre = await call("presign-upload", {
      method: "POST",
      json: true,
      body: JSON.stringify({ sha256: sha, size_bytes: size })
    });

    if (pre.dedup) {
      return {
        ok: true,
        dedup: true,
        file_id: pre.file_id,
        sha256: sha,
        size_blob: pre.size_blob
      };
    }

    var putRes = await fetch(pre.url, {
      method: "PUT",
      headers: { "Content-Type": "application/octet-stream" },
      body: bytes
    });
    if (!putRes.ok) {
      var putTxt = await putRes.text().catch(function () { return ""; });
      throw new Error("R2 PUT failed: HTTP " + putRes.status + " " + putTxt.slice(0, 200));
    }

    var reg = await call("register", {
      method: "POST",
      json: true,
      body: JSON.stringify({
        sha256_blob: sha,
        size_blob: size,
        encryption: "aes-256-gcm"
      })
    });

    return {
      ok: true,
      dedup: !!reg.dedup,
      file_id: reg.file_id,
      sha256: sha,
      size_blob: reg.size_blob,
      used_bytes: reg.used_bytes,
      quota_bytes: reg.quota_bytes
    };
  }

  async function download(fileId) {
    var pre = await call("presign-download", {
      query: { file_id: fileId }
    });
    var res = await fetch(pre.url);
    if (!res.ok) {
      var txt = await res.text().catch(function () { return ""; });
      throw new Error("R2 GET failed: HTTP " + res.status + " " + txt.slice(0, 200));
    }
    return new Uint8Array(await res.arrayBuffer());
  }

  function del(fileId) {
    return call("delete", { query: { file_id: fileId }, method: "DELETE" });
  }

  window.imarchSafeApi = {
    whoami: whoami,
    list: list,
    upload: upload,
    download: download,
    del: del,
    baseUrl: BASE
  };
})();