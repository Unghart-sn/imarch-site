(function () {
  'use strict';

  function initForm() {
    var form = document.getElementById('certifyForm');
    if (!form) return;

    var MAX_BYTES = 100 * 1024 * 1024;
    var ORDER_CREATE_URL = '/.netlify/functions/order-create';
    var PROCESS_PAYMENT_URL = 'https://nmiyaroisztnxenmoxzs.supabase.co/functions/v1/process-payment';
    var ORDER_TRIGGER_URL = '/.netlify/functions/order-trigger';
    var REDEEM_PROMO_URL = 'https://nmiyaroisztnxenmoxzs.supabase.co/functions/v1/redeem-promo';
    var APPLY_PILOT_URL = 'https://nmiyaroisztnxenmoxzs.supabase.co/functions/v1/apply-pilot';

    var fileInput = document.getElementById('file');
    var dropzone = document.getElementById('dropzone');
    var fileInfo = document.getElementById('fileInfo');
    var fileNameEl = document.getElementById('fileName');
    var fileSizeEl = document.getElementById('fileSize');
    var fileHashEl = document.getElementById('fileHash');
    var msgEl = document.getElementById('formMsg');
    var btn = document.getElementById('submitBtn');

    var currentFile = null;
    var currentHash = null;
    var hashing = false;
    var submitting = false;

    // --- ФУНКЦИИ ДЛЯ МОДАЛОК ---
    function showModal(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'flex';
    }
    function hideModal(id) {
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    }
    function hideAllModals() {
      hideModal('noTokensModal');
      hideModal('promoModal');
      hideModal('pilotModal');
    }

    // Обработчики кнопок модалки
    if (document.getElementById('btnCloseModal')) {
      document.getElementById('btnCloseModal').onclick = hideAllModals;
    }
    
    if (document.getElementById('btnPromo')) {
      document.getElementById('btnPromo').onclick = function() {
        hideModal('noTokensModal');
        showModal('promoModal');
      };
    }
    if (document.getElementById('btnClosePromo')) {
      document.getElementById('btnClosePromo').onclick = function() {
        hideModal('promoModal');
        showModal('noTokensModal');
      };
    }

    if (document.getElementById('btnPilot')) {
      document.getElementById('btnPilot').onclick = function() {
        hideModal('noTokensModal');
        showModal('pilotModal');
      };
    }
    if (document.getElementById('btnClosePilot')) {
      document.getElementById('btnClosePilot').onclick = function() {
        hideModal('pilotModal');
        showModal('noTokensModal');
      };
    }

    // Отправка промокода
    if (document.getElementById('btnSubmitPromo')) {
      document.getElementById('btnSubmitPromo').onclick = async function() {
        var code = document.getElementById('promoInput').value.trim();
        if (!code) return;
        var promoMsg = document.getElementById('promoMsg');
        promoMsg.textContent = 'Checking...';
        promoMsg.style.color = '#666';

        try {
          var session = getSession();
          var token = session ? session.access_token : '';
          var res = await fetch(REDEEM_PROMO_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ code: code })
          });
          var data = await res.json();
          
          if (data.status === 'success') {
            promoMsg.textContent = 'Success! ' + data.message;
            promoMsg.style.color = 'green';
            setTimeout(function() { window.location.reload(); }, 2000);
          } else {
            promoMsg.textContent = 'Error: ' + (data.error || 'Unknown error');
            promoMsg.style.color = 'red';
          }
        } catch (e) {
          promoMsg.textContent = 'Network error.';
          promoMsg.style.color = 'red';
        }
      };
    }

    // Отправка заявки на пилот
    if (document.getElementById('btnSubmitPilot')) {
      document.getElementById('btnSubmitPilot').onclick = async function() {
        var email = document.getElementById('pilotEmail').value.trim();
        var org = document.getElementById('pilotOrg').value.trim();
        var msg = document.getElementById('pilotMsg').value.trim();
        if (!email) {
          document.getElementById('pilotResultMsg').textContent = 'Email is required.';
          document.getElementById('pilotResultMsg').style.color = 'red';
          return;
        }
        
        var resultMsg = document.getElementById('pilotResultMsg');
        resultMsg.textContent = 'Sending...';
        resultMsg.style.color = '#666';

        try {
          var session = getSession();
          var token = session ? session.access_token : '';
          var res = await fetch(APPLY_PILOT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ email: email, organization: org, message: msg })
          });
          var data = await res.json();
          
          if (data.status === 'success') {
            resultMsg.textContent = 'Application sent! We will contact you soon.';
            resultMsg.style.color = 'green';
            document.getElementById('btnSubmitPilot').disabled = true;
          } else {
            resultMsg.textContent = 'Error: ' + (data.error || 'Unknown error');
            resultMsg.style.color = 'red';
          }
        } catch (e) {
          resultMsg.textContent = 'Network error.';
          resultMsg.style.color = 'red';
        }
      };
    }
    // ---------------------------

    function showMsg(kind, text) {
      if (!msgEl) return;
      msgEl.className = 'form-msg ' + kind;
      msgEl.textContent = text;
      msgEl.hidden = false;
    }
    function clearMsg() { if (msgEl) msgEl.hidden = true; }

    function fmtSize(b) {
      if (b < 1024) return b + ' B';
      if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
      return (b / 1048576).toFixed(2) + ' MB';
    }

    function bufToHex(buf) {
      var bytes = new Uint8Array(buf);
      var out = '';
      for (var i = 0; i < bytes.length; i++) {
        out += ('0' + bytes[i].toString(16)).slice(-2);
      }
      return out;
    }

    // --- PoW: pure-JS SHA-256 (hex output) ---
    function sha256HexJS(input) {
      function rrot(x, n) { return (x >>> n) | (x << (32 - n)); }
      var K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];
      var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
      var bytes = [];
      for (var i = 0; i < input.length; i++) {
        var c = input.charCodeAt(i);
        if (c < 0x80) bytes.push(c);
        else if (c < 0x800) { bytes.push(0xc0 | (c >> 6), 0x80 | (c & 63)); }
        else if (c < 0xd800 || c >= 0xe000) { bytes.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63)); }
        else { i++; c = 0x10000 + (((c & 0x3ff) << 10) | (input.charCodeAt(i) & 0x3ff)); bytes.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63)); }
      }
      var bitLen = bytes.length * 8;
      bytes.push(0x80);
      while (bytes.length % 64 !== 56) bytes.push(0);
      bytes.push(0,0,0,0, (bitLen >>> 24) & 255, (bitLen >>> 16) & 255, (bitLen >>> 8) & 255, bitLen & 255);
      for (var off = 0; off < bytes.length; off += 64) {
        var w = new Array(64);
        for (var j = 0; j < 16; j++) w[j] = (bytes[off+j*4]<<24) | (bytes[off+j*4+1]<<16) | (bytes[off+j*4+2]<<8) | bytes[off+j*4+3];
        for (j = 16; j < 64; j++) {
          var s0 = rrot(w[j-15],7) ^ rrot(w[j-15],18) ^ (w[j-15] >>> 3);
          var s1 = rrot(w[j-2],17) ^ rrot(w[j-2],19) ^ (w[j-2] >>> 10);
          w[j] = (w[j-16] + s0 + w[j-7] + s1) | 0;
        }
        var a=H[0],b=H[1],c=H[2],d=H[3],e=H[4],f=H[5],g=H[6],h=H[7];
        for (j = 0; j < 64; j++) {
          var S1 = rrot(e,6) ^ rrot(e,11) ^ rrot(e,25);
          var ch = (e & f) ^ ((~e) & g);
          var t1 = (h + S1 + ch + K[j] + w[j]) | 0;
          var S0 = rrot(a,2) ^ rrot(a,13) ^ rrot(a,22);
          var maj = (a & b) ^ (a & c) ^ (b & c);
          var t2 = (S0 + maj) | 0;
          h = g; g = f; f = e; e = (d + t1) | 0;
          d = c; c = b; b = a; a = (t1 + t2) | 0;
        }
        H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
        H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
      }
      var hex = '';
      for (var n = 0; n < 8; n++) {
        var v = H[n] >>> 0;
        hex += ('00000000' + v.toString(16)).slice(-8);
      }
      return hex;
    }

    function solvePow(fileHash) {
      return new Promise(function (resolve, reject) {
        var target = '00000';
        var nonce = 0;
        var CHUNK = 65536;
        function step() {
          var end = nonce + CHUNK;
          for (; nonce < end; nonce++) {
            var h = sha256HexJS(fileHash + ':' + nonce);
            if (h.substr(0, 5) === target) return resolve(nonce);
          }
          if (nonce > 100000000) return reject(new Error('pow_timeout'));
          if ((nonce / CHUNK) % 4 === 0) {
            showMsg('ok', 'Computing proof-of-work\u2026 ' + Math.floor(nonce / 1000000) + 'M attempts');
          }
          setTimeout(step, 0);
        }
        step();
      });
    }

        var currentFingerprint = null;
    function computeFingerprint() {
      if (currentFingerprint) return Promise.resolve(currentFingerprint);
      try {
        var parts = [];
        parts.push(navigator.userAgent || '');
        parts.push(navigator.language || '');
        parts.push((navigator.languages || []).join(','));
        parts.push(String(screen.width) + 'x' + String(screen.height) + 'x' + String(screen.colorDepth));
        try { parts.push(String(Intl.DateTimeFormat().resolvedOptions().timeZone || '')); } catch (e) { parts.push(''); }
        parts.push(String(navigator.hardwareConcurrency || 0));
        parts.push(String(navigator.deviceMemory || 0));
        parts.push(String(navigator.maxTouchPoints || 0));
        try {
          var c = document.createElement('canvas');
          c.width = 200; c.height = 50;
          var ctx = c.getContext('2d');
          if (ctx) {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillStyle = '#f60';
            ctx.fillRect(0, 0, 100, 30);
            ctx.fillStyle = '#069';
            ctx.fillText('Imarch-FP', 2, 2);
            ctx.fillStyle = 'rgba(102,204,0,0.7)';
            ctx.fillText('Imarch-FP', 4, 10);
            parts.push(c.toDataURL());
          }
        } catch (e) { parts.push('nocanvas'); }
        try {
          var gl = document.createElement('canvas').getContext('webgl');
          if (gl) {
            var dbg = gl.getExtension('WEBGL_debug_renderer_info');
            if (dbg) parts.push(String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || ''));
          }
        } catch (e) { parts.push('nogl'); }
        var s = parts.join('||');
        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)).then(bufToHex).then(function (hex) {
          currentFingerprint = hex;
          return hex;
        });
      } catch (e) {
        return Promise.resolve('');
      }
    }

    function computeSha256(file) {
      return Promise.all([
        file.arrayBuffer().then(function (ab) {
          return crypto.subtle.digest('SHA-256', ab);
        }).then(bufToHex),
        computeFingerprint()
      ]).then(function (results) { return results[0]; });
    }

    function getSession() {
      try {
        var key = 'sb-nmiyaroisztnxenmoxzs-auth-token';
        var raw = localStorage.getItem(key);
        if (!raw) raw = localStorage.getItem('sb-auth-token') || localStorage.getItem('supabase.auth.token');
        if (!raw) return null;
        var parsed = JSON.parse(raw);
        if (parsed && parsed.access_token) return parsed;
        return (parsed && parsed.currentSession) || parsed || null;
      } catch (e) { return null; }
    }

    function getAccessToken() {
      var s = getSession();
      return s && s.access_token ? s.access_token : null;
    }

    // АСИНХРОННАЯ ФУНКЦИЯ: ждем сессию от auth.js
    async function getCurrentUserId() {
      try {
        if (!window.imarchAuth) {
          console.error('imarchAuth not found on page');
          return null;
        }
        var session = await window.imarchAuth.getSession();
        if (session && session.user) {
          return session.user.id;
        }
        return null;
      } catch (e) {
        console.error('Auth error:', e);
        return null;
      }
    }

    function handleFile(file) {
      clearMsg();
      currentFile = null;
      currentHash = null;

      if (!file) { if (fileInfo) fileInfo.hidden = true; return; }

      if (file.size > MAX_BYTES) {
        if (fileInfo) fileInfo.hidden = true;
        if (fileInput) fileInput.value = '';
        showMsg('err', 'File is too large: ' + fmtSize(file.size) + '. Limit is 100 MB.');
        return;
      }

      currentFile = file;
      if (fileNameEl) fileNameEl.textContent = file.name;
      if (fileSizeEl) fileSizeEl.textContent = fmtSize(file.size);
      if (fileHashEl) fileHashEl.textContent = 'computing\u2026';
      if (fileInfo) fileInfo.hidden = false;

      if (!(window.crypto && crypto.subtle && crypto.subtle.digest)) {
        if (fileHashEl) fileHashEl.textContent = 'unavailable (need HTTPS or localhost)';
        return;
      }

      hashing = true;
      computeSha256(file).then(function (hex) {
        currentHash = hex;
        if (fileHashEl) fileHashEl.textContent = hex;
      }).catch(function (e) {
        if (fileHashEl) fileHashEl.textContent = 'error: ' + (e && e.message ? e.message : 'unknown');
      }).then(function () {
        hashing = false;
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        handleFile(fileInput.files && fileInput.files[0]);
      });
    }

    if (dropzone) {
      ['dragenter', 'dragover'].forEach(function (ev) {
        dropzone.addEventListener(ev, function (e) {
          e.preventDefault(); e.stopPropagation();
          dropzone.classList.add('dragover');
        });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        dropzone.addEventListener(ev, function (e) {
          e.preventDefault(); e.stopPropagation();
          dropzone.classList.remove('dragover');
        });
      });
      dropzone.addEventListener('drop', function (e) {
        var files = e.dataTransfer && e.dataTransfer.files;
        if (!files || !files.length) return;
        try {
          var dt = new DataTransfer();
          dt.items.add(files[0]);
          if (fileInput) fileInput.files = dt.files;
        } catch (err) { /* ignore */ }
        handleFile(files[0]);
      });
    }

    function postJson(url, payload) {
      var headers = { 'Content-Type': 'application/json' };
      var token = getAccessToken();
      if (token) headers['Authorization'] = 'Bearer ' + token;
      return fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      }).then(function (res) {
        return res.text().then(function (text) {
          var data;
          try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }
          if (!res.ok) {
            var msg = (data && data.error) ? data.error : ('HTTP ' + res.status);
            throw new Error(msg);
          }
          return data;
        });
      });
    }

    function putFile(url, headers, file, onProgress) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        if (headers) {
          Object.keys(headers).forEach(function (h) { xhr.setRequestHeader(h, headers[h]); });
        }
        xhr.upload.onprogress = function (ev) {
          if (ev.lengthComputable && onProgress) {
            onProgress(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.status);
          else reject(new Error('upload failed: HTTP ' + xhr.status + ' | Details: ' + xhr.responseText));
        };
        xhr.onerror = function () { reject(new Error('upload network error')); };
        xhr.send(file);
      });
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (submitting) return;
      clearMsg();

      var nameEl = document.getElementById('full_name');
      var emailEl = document.getElementById('email');
      var titleEl = document.getElementById('title');
      var tosEl = document.getElementById('tos');

      var name = (nameEl ? nameEl.value : '').trim();
      var email = (emailEl ? emailEl.value : '').trim();
      var title = (titleEl ? titleEl.value : '').trim();
      var tos = tosEl ? tosEl.checked : true;

      var latinRegex = /^[A-Za-z\s]+$/;
      if (name && !latinRegex.test(name)) {
        return showMsg('err', 'Please use only Latin letters and spaces for your name.');
      }

      if (!name) return showMsg('err', 'Please enter your name or organization.');
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showMsg('err', 'Please enter a valid email.');
      if (!title) return showMsg('err', 'Please enter a document title.');
      if (!currentFile) return showMsg('err', 'Please choose a file.');
      if (!tos) return showMsg('err', 'Please accept the Terms of Service.');
      if (hashing) return showMsg('err', 'Still hashing the file, please wait.');
      if (!currentHash) return showMsg('err', 'Could not compute SHA-256 for this file.');

      // ВОТ ЗДЕСЬ МЫ ЖДЕМ ОТВЕТА ОТ AUTH.JS
      var userId = await getCurrentUserId();
      
      if (!userId) {
        return showMsg('err', 'Please sign in before submitting.');
      }

      submitting = true;
      if (btn) btn.disabled = true;

      var payload = {
        full_name: name,
        email: email,
        title: title,
        sha256: currentHash,
          device_fingerprint: currentFingerprint,
        size_bytes: currentFile.size,
        filename: currentFile.name,
        issuer_user_id: userId
      };

      showMsg('ok', 'Computing proof-of-work\u2026');

      solvePow(currentHash).then(function (powNonce) {
        payload.pow_nonce = powNonce;
        showMsg('ok', 'Creating order\u2026');
        return postJson(ORDER_CREATE_URL, payload);
      }).then(function (order) {
        if (!order || !order.upload_url) throw new Error('no upload_url in response');
        showMsg('ok', 'Uploading\u2026 0%');
        return putFile(order.upload_url, order.upload_headers, currentFile, function (pct) {
          showMsg('ok', 'Uploading\u2026 ' + pct + '%');
        }).then(function () {
          return order;
        });
      }).then(function (order) {
        showMsg('ok', 'Checking balance\u2026');
        return postJson(PROCESS_PAYMENT_URL, { order_id: order.order_id })
          .then(function (decision) {
            if (decision.status === 'insufficient_tokens') {
              showMsg('err', 'Insufficient tokens. Please choose an option.');
              showModal('noTokensModal');
              throw new Error('insufficient_tokens');
            }

            showMsg('ok', 'Confirming upload\u2026');
            return postJson('/.netlify/functions/order-confirm', {
              order_id: order.order_id,
              hmac_token: order.hmac_token
            }).then(function (confirmRes) {
              
              // Запускаем генерацию PDF в фоне
              fetch(ORDER_TRIGGER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order_id: order.order_id, hmac_token: order.hmac_token })
              }).catch(function(e) { console.warn('order-trigger error', e); });

              showMsg('ok', 'Certificate is ready! Click the button below to open it.');
              
              var finalUrl = '';
              if (confirmRes && confirmRes.status_url) {
                finalUrl = confirmRes.status_url;
              } else if (order && order.order_id && order.hmac_token) {
                finalUrl = '/en/certify/status/?order_id=' + encodeURIComponent(order.order_id) + '&token=' + encodeURIComponent(order.hmac_token);
              }

              var msgContainer = document.getElementById('formMsg');
              if (msgContainer) {
                msgContainer.innerHTML = '<div style="margin-top: 15px; padding: 15px; background: #dcfce7; border: 1px solid #bbf7d0; border-radius: 8px; text-align: center;">' +
                  '<p style="margin: 0 0 12px; font-weight: 600; color: #166534;">Your document is certified!</p>' +
                  '<a href="' + finalUrl + '" style="display: inline-block; padding: 10px 20px; background: #0f172a; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Open Certificate Status</a>' +
                  '</div>';
                  '</div>';
              } else {
                window.location.href = finalUrl;
              }
            });
          });
      }).catch(function (err) {
        submitting = false;
        if (err && err.message !== 'insufficient_tokens') {
          if (btn) btn.disabled = false;
          showMsg('err', 'Error: ' + (err && err.message ? err.message : 'unknown'));
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
