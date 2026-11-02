(function () {
  'use strict';

  function initForm() {
    var form = document.getElementById('certifyForm');
    if (!form) return;

    var MAX_BYTES = 100 * 1024 * 1024;
    var ORDER_CREATE_URL = '/.netlify/functions/order-create';
    var PROCESS_PAYMENT_URL = 'https://nmiyaroisztnxenmoxzs.supabase.co/functions/v1/process-payment';
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

    function computeSha256(file) {
      return file.arrayBuffer().then(function (ab) {
        return crypto.subtle.digest('SHA-256', ab);
      }).then(bufToHex);
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

    function getHolderName() {
      var el = document.getElementById('holderName');
      return el && el.value ? el.value.trim() : null;
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
        size_bytes: currentFile.size,
        filename: currentFile.name,
        issuer_user_id: userId,
        holder_name: getHolderName()
      };

      showMsg('ok', 'Creating order\u2026');

      postJson(ORDER_CREATE_URL, payload).then(function (order) {
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
              
              showMsg('ok', 'Certificate is ready! Click the button below to open it.');
              
              var finalUrl = '';
              if (confirmRes && confirmRes.status_url) {
                finalUrl = confirmRes.status_url;
              } else if (order && order.order_id && order.hmac_token) {
                finalUrl = '/en/certify/status/?order_id=' + encodeURIComponent(order.order_id) + '&token=' + encodeURIComponent(order.hmac_token);
              }

              var msgContainer = document.getElementById('formMsg');
              if (msgContainer) {
                msgContainer.innerHTML = '<div style="margin-top: 15px; padding: 15px; background: #eef; border: 1px solid #ccd; border-radius: 5px; text-align: center;">' +
                  '<p style="margin-bottom: 10px; font-weight: bold;">Your document is certified!</p>' +
                  '<a href="' + finalUrl + '" style="display: inline-block; padding: 10px 20px; background: #1E3A5F; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Open Certificate Status</a>' +
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