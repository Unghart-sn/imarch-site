// Client script for /en/certify/status/
// Reads ?order_id=&token=, calls /.netlify/functions/order-status, renders the card.
(function () {
  'use strict';

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order_id') || '';
  const token = params.get('token') || '';

  const $ = function (id) { return document.getElementById(id); };
  const loadMsg = $('loadMsg');
  const card = $('statusCard');
  const helpMsg = $('helpMsg');

  function showError(msg) {
    loadMsg.textContent = msg;
    loadMsg.className = 'form-msg err';
    loadMsg.hidden = false;
  }

  function fmtDate(s) {
    if (!s) return '';
    try { return new Date(s).toLocaleString(); } catch (e) { return s; }
  }

  function setText(id, val) {
    const el = $(id);
    if (el) el.textContent = (val === null || val === undefined || val === '') ? '' : String(val);
  }

  if (!orderId || !token) {
    showError('Missing order_id or token in URL. Use the link from your email.');
    return;
  }
  if (!/^[0-9a-f-]{36}$/i.test(orderId) || !/^[0-9a-f]{64}$/i.test(token)) {
    showError('Invalid order_id or token format.');
    return;
  }

  const url = '/.netlify/functions/order-status?order_id=' +
    encodeURIComponent(orderId) + '&token=' + encodeURIComponent(token);

  fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' } })
    .then(function (r) {
      return r.text().then(function (text) {
        let data = null;
        try { data = JSON.parse(text); } catch (e) {}
        if (!r.ok || !data || !data.ok) {
          const err = (data && (data.error || data.detail)) || ('HTTP ' + r.status);
          throw new Error(err);
        }
        return data;
      });
    })
    .then(function (d) {
      card.hidden = false;
      helpMsg.hidden = false;

      const pill = $('stPill');
      pill.textContent = d.status || 'unknown';
      pill.className = 'status-pill ' + (d.status || 'unknown');

      setText('stOrderId', d.order_id);
      setText('stTitle', d.title);
      setText('stHolder', d.full_name);
      setText('stEmail', d.email);
      setText('stSha', d.sha256);
      setText('stSize', d.size_bytes ? d.size_bytes + ' bytes' : null);
      setText('stTsa', d.tsa_status);
      setText('stAnchor', d.anchor_status);
      setText('stVt', d.vt_status);
      setText('stCreated', fmtDate(d.created_at));
      setText('stProcessed', fmtDate(d.processed_at));

      if (d.status === 'ready' && d.pdf_url) {
        const wrap = $('pdfWrap');
        const link = $('pdfLink');
        link.href = d.pdf_url;
        wrap.hidden = false;
      }
    })
    .catch(function (e) {
      showError('Could not load order: ' + e.message);
    });
})();
