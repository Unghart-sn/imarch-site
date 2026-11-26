// IMARCH App - Safe Module
(function () {
  'use strict';

  const paneAcc = () => document.getElementById('app-content');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  function fmtBytes(n) {
    if (!n || n < 0) return '0 B';
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / (1024 * 1024)).toFixed(2) + ' MB';
  }

  function safeMsg(text, kind) {
    const el = document.getElementById('safeMsg');
    if (!el) return;
    if (!text) { el.innerHTML = ''; return; }
    el.innerHTML = '<div style="padding:10px; border-radius:6px; font-size:13px; margin-bottom:16px; ' +
      (kind === 'err' ? 'background:#fef2f2; color:#dc2626; border:1px solid #fecaca;' : 'background:#ecfdf5; color:#059669; border:1px solid #a7f3d0;') +
      '">' + esc(text) + '</div>';
  }

  function getSafePw() {
    const inp = document.getElementById('safePw');
    return inp ? inp.value : '';
  }

  async function refreshSafeList() {
    try {
      const data = await window.imarchSafeApi.list();
      renderSafeList(data || {});
    } catch (e) {
      safeMsg('Failed to load files: ' + (e.message || e), 'err');
    }
  }

  function renderSafeList(data) {
    const files = data.files || data.items || [];
    const used  = (typeof data.used_bytes === 'number') ? data.used_bytes : 0;
    const quota = (typeof data.quota_bytes === 'number') ? data.quota_bytes : 0;

    const tbody = document.getElementById('safeTbody');
    if (!tbody) return;

    if (!files.length) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#9ca3af; font-size:14px; padding:24px 0;">No files uploaded yet.</td></tr>';
    } else {
      let h = '';
      for (const f of files) {
        const when = String(f.uploaded_at || '').replace('T', ' ').replace('Z', '').slice(0, 16);
        h += '<tr>'
          + '<td style="font-family:monospace; font-size:12px; color:#6b7280;">' + esc(f.file_id) + '</td>'
          + '<td style="font-size:14px;">' + esc(fmtBytes(f.size_blob || 0)) + '</td>'
          + '<td style="font-size:13px; color:#6b7280;">' + esc(when) + '</td>'
          + '<td style="text-align:right; white-space:nowrap;">'
          + '<button class="btn-download" data-act="dl" data-id="' + esc(f.file_id) + '" style="margin-right:4px;">Download</button>'
          + '<button class="btn-download" data-act="del" data-id="' + esc(f.file_id) + '" style="color:#dc2626; border-color:#fecaca;">Delete</button>'
          + '</td></tr>';
      }
      tbody.innerHTML = h;
      tbody.querySelectorAll('button[data-act]').forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.dataset.act === 'dl') onSafeDownload(b.dataset.id);
          else onSafeDelete(b.dataset.id);
        });
      });
    }

    const pct = quota > 0 ? Math.min(100, (used / quota) * 100) : 0;
    const fill = document.getElementById('safeQuotaFill');
    const txt  = document.getElementById('safeQuotaText');
    if (fill) fill.style.width = pct.toFixed(1) + '%';
    if (txt) {
      if (quota > 0) txt.textContent = fmtBytes(used) + ' / ' + fmtBytes(quota);
      else txt.textContent = fmtBytes(used) + ' used';
    }
  }

  async function onSafeUpload(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const pw = getSafePw();
    if (!pw) { safeMsg('Enter safe password first.', 'err'); return; }
    if (file.size > 88 * 1024 * 1024) { safeMsg('File too large. Max ~88 MB.', 'err'); return; }

    safeMsg('Encrypting...', 'ok');
    try {
      const blob = await window.imarchSafe.encryptFile(file, pw);
      safeMsg('Uploading...', 'ok');
      await window.imarchSafeApi.upload(blob);
      safeMsg('Uploaded.', 'ok');
      await refreshSafeList();
    } catch (err) {
      safeMsg('Upload failed: ' + (err.message || err), 'err');
    }
  }

  async function onSafeDownload(id) {
    const pw = getSafePw();
    if (!pw) { safeMsg('Enter safe password first.', 'err'); return; }
    safeMsg('Downloading...', 'ok');
    try {
      const blob = await window.imarchSafeApi.download(id);
      safeMsg('Decrypting...', 'ok');
      const pkg = await window.imarchSafe.decryptPackage(blob, pw);
      const b = new Blob([pkg.data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = url;
      a.download = pkg.name || (id + '.bin');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
      safeMsg('Downloaded: ' + (pkg.name || id), 'ok');
    } catch (err) {
      safeMsg('Download failed (wrong password?): ' + (err.message || err), 'err');
    }
  }

  async function onSafeDelete(id) {
    if (!confirm('Delete this file permanently? This cannot be undone.')) return;
    safeMsg('Deleting...', 'ok');
    try {
      await window.imarchSafeApi.del(id);
      safeMsg('Deleted.', 'ok');
      await refreshSafeList();
    } catch (err) {
      safeMsg('Delete failed: ' + (err.message || err), 'err');
    }
  }

  function initSafeView() {
    const pwInput = document.getElementById('safePw');
    if (!pwInput) return;

    const saved = sessionStorage.getItem('imarch_safe_pw');
    if (saved) pwInput.value = saved;

    pwInput.addEventListener('input', function () {
      if (pwInput.value) sessionStorage.setItem('imarch_safe_pw', pwInput.value);
      else sessionStorage.removeItem('imarch_safe_pw');
    });

    document.getElementById('safeShowPw').addEventListener('click', function () {
      const showBtn = this;
      if (pwInput.type === 'password') {
        pwInput.type = 'text';
        showBtn.textContent = 'Hide';
      } else {
        pwInput.type = 'password';
        showBtn.textContent = 'Show';
      }
    });

    document.getElementById('safeLockBtn').addEventListener('click', function () {
      sessionStorage.removeItem('imarch_safe_pw');
      pwInput.value = '';
      safeMsg('Safe locked. Password cleared.', 'ok');
    });

    document.getElementById('safeUploadBtn').addEventListener('click', function () {
      if (!getSafePw()) { safeMsg('Enter safe password first.', 'err'); return; }
      document.getElementById('safeFileInput').click();
    });

    document.getElementById('safeFileInput').addEventListener('change', onSafeUpload);
    refreshSafeList();
  }

  async function init() {
    const container = paneAcc();
    if (!container) return;

    container.innerHTML = '<div class="app-loading">Loading Digital Safe...</div>';

    try {
      const session = await window.imarchAuth.getSession();
      if (!session || !session.user) {
        container.innerHTML = '<div class="dash-card" style="text-align:center;"><p style="color:#6b7280;">Please sign in to access your Safe.</p><a href="/app/" class="btn-primary">Go to Sign In</a></div>';
        return;
      }

      let h = '<div class="dash-grid">';

      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Encryption Key</h3></div>';
      h += '<p style="font-size:13px; color:#6b7280; margin-top:0;">Your files are encrypted locally before upload. We never see your password.</p>';
      h += '<div style="display:flex; gap:8px; margin-bottom:16px;">';
      h += '<input type="password" id="safePw" class="form-input" placeholder="Safe Password" style="flex:1; padding:10px; border:1px solid #e5e7eb; border-radius:8px;">';
      h += '<button type="button" id="safeShowPw" class="btn-secondary">Show</button>';
      h += '</div>';
      h += '<div style="display:flex; gap:8px;">';
      h += '<button type="button" id="safeUploadBtn" class="btn-primary">Upload File</button>';
      h += '<button type="button" id="safeLockBtn" class="btn-secondary">Lock Safe</button>';
      h += '<input type="file" id="safeFileInput" style="display:none">';
      h += '</div>';
      h += '<div id="safeMsg"></div>';
      h += '</div>';

      h += '<div class="dash-card">';
      h += '<div class="card-header"><h3>Storage</h3></div>';
      h += '<div style="height:6px; background:#e5e7eb; border-radius:3px; overflow:hidden; margin-bottom:8px;">';
      h += '<div id="safeQuotaFill" style="height:100%; background:#0f1115; width:0; transition:width 0.3s;"></div>';
      h += '</div>';
      h += '<div id="safeQuotaText" style="font-size:12px; color:#6b7280;">Loading...</div>';
      h += '</div>';

      // Блок с файлами + кнопка на лот
      h += '<div class="dash-card">';
      h += '<div class="card-header">';
      h += '<h3 style="margin:0;">Files</h3>';
      h += '</div>';
      h += '<div style="margin-top:12px; margin-bottom:16px; display:flex; gap:8px; flex-wrap:wrap;">';
      h += '<a href="/en/docs/consilium/cbb-0006/" class="btn-secondary" style="font-size:13px; padding:8px 16px;">Lot cbb-0006 &rarr;</a>';
      h += '</div>';
      
      h += '<table class="dash-table"><thead><tr>'
        + '<th>File ID</th><th>Size</th><th>Uploaded</th><th style="text-align:right;">Actions</th>'
        + '</tr></thead><tbody id="safeTbody"><tr><td colspan="4" style="text-align:center; padding:24px;">Loading...</td></tr></tbody></table>';
      h += '</div>';

      h += '</div>';
      container.innerHTML = h;

      initSafeView();

    } catch (e) {
      container.innerHTML = '<div class="app-error">Error: ' + esc(e.message) + '</div>';
    }
  }

  window.imarchSafeApp = { init: init };
})();
