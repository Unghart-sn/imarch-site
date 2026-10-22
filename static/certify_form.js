(function () {
  'use strict';

  function initForm() {
    var form = document.getElementById('certifyForm');
    if (!form) return;

    var MAX_BYTES = 100 * 1024 * 1024;
    var ORDER_CREATE_URL = '/.netlify/functions/order-create';

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
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
          else reject(new Error('upload failed: HTTP ' + xhr.status));
        };
        xhr.onerror = function () { reject(new Error('upload network error')); };
        xhr.send(file);
      });
    }

    form.addEventListener('submit', function (e) {
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

      if (!name) return showMsg('err', 'Please enter your name or organization.');
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return showMsg('err', 'Please enter a valid email.');
      if (!title) return showMsg('err', 'Please enter a document title.');
      if (!currentFile) return showMsg('err', 'Please choose a file.');
      if (!tos) return showMsg('err', 'Please accept the Terms of Service.');
      if (hashing) return showMsg('err', 'Still hashing the file, please wait.');
      if (!currentHash) return showMsg('err', 'Could not compute SHA-256 for this file.');

      submitting = true;
      if (btn) btn.disabled = true;

      var payload = {
        full_name: name,
        email: email,
        title: title,
        sha256: currentHash,
        size_bytes: currentFile.size,
        filename: currentFile.name
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
        showMsg('ok', 'Confirming upload\u2026');
        return postJson('/.netlify/functions/order-confirm', {
          order_id: order.order_id,
          hmac_token: order.hmac_token
        }).then(function (confirmRes) {
          showMsg('ok', 'Upload confirmed. Redirecting to payment\u2026');
          window.location.href = order.whydonate_url;
        });
      }).catch(function (err) {
        submitting = false;
        if (btn) btn.disabled = false;
        showMsg('err', 'Error: ' + (err && err.message ? err.message : 'unknown'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();