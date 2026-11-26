// IMARCH App - Treasury Token Flow (distribution + 30d chart + top holders + hard-cap)
(function () {
  'use strict';
  function esc(s) { return String(s).replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  function fmt(n){ return (n||0).toLocaleString('en-US'); }

  function hardCap(dist) {
    var HARD_CAP = 888800;
    var ok = dist.total === HARD_CAP;
    var color = ok ? '#059669' : '#dc2626';
    var mark = ok ? 'OK' : 'FAIL';
    return '<div style="font-size:13px; padding:10px 12px; border-radius:8px; background:' + (ok ? '#f0fdf4' : '#fef2f2') + '; border:1px solid ' + (ok ? '#bbf7d0' : '#fecaca') + '; color:' + color + '; font-weight:600;">Hard-cap check: total = ' + fmt(dist.total) + ' / ' + fmt(HARD_CAP) + ' - ' + mark + '</div>';
  }

  function distributionBar(d) {
    var total = d.total || 1;
    var tPct = (d.treasury_balance / total * 100).toFixed(1);
    var uPct = (d.users_balance / total * 100).toFixed(1);
    var h = '<div style="margin:12px 0 4px; font-size:12px; color:#6b7280;">Distribution (total ' + fmt(d.total) + ' u-tokens)</div>';
    h += '<div style="height:14px; display:flex; border-radius:7px; overflow:hidden; border:1px solid #e5e7eb;">';
    h += '<div style="width:' + tPct + '%; background:#111;"></div>';
    h += '<div style="width:' + uPct + '%; background:#059669;"></div>';
    h += '</div>';
    h += '<div style="font-size:12px; margin-top:6px; display:flex; gap:16px; flex-wrap:wrap;">';
    h += '<span><span style="display:inline-block;width:8px;height:8px;background:#111;border-radius:2px;margin-right:5px;"></span>Treasury: ' + fmt(d.treasury_balance) + ' (' + tPct + '%)</span>';
    h += '<span><span style="display:inline-block;width:8px;height:8px;background:#059669;border-radius:2px;margin-right:5px;"></span>Users: ' + fmt(d.users_balance) + ' (' + uPct + '%)</span>';
    h += '</div>';
    return h;
  }

  function lineChart(rows) {
    var W = 640, H = 180, padL = 40, padR = 8, padT = 10, padB = 22;
    var n = rows.length;
    if (!n) return '<em style="color:#9ca3af;">No data.</em>';
    var maxV = 1;
    rows.forEach(function (r) { maxV = Math.max(maxV, r.granted || 0, r.spent || 0); });
    maxV = Math.ceil(maxV / 10) * 10;
    function x(i){ return padL + (n === 1 ? 0 : i * (W - padL - padR) / (n - 1)); }
    function y(v){ return H - padB - (v / maxV) * (H - padT - padB); }
    function poly(key){ return rows.map(function(r,i){ return x(i) + ',' + y(r[key]||0); }).join(' '); }
    var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" style="width:100%; height:auto; display:block;">';
    for (var g = 0; g <= 4; g++) {
      var vv = maxV * g / 4;
      var yy = y(vv);
      h += '<line x1="' + padL + '" x2="' + (W-padR) + '" y1="' + yy + '" y2="' + yy + '" stroke="#f3f4f6" stroke-width="1"/>';
      h += '<text x="' + (padL-4) + '" y="' + (yy+3) + '" font-size="9" fill="#9ca3af" text-anchor="end">' + fmt(Math.round(vv)) + '</text>';
    }
    h += '<polyline fill="none" stroke="#059669" stroke-width="2" points="' + poly('granted') + '"/>';
    h += '<polyline fill="none" stroke="#dc2626" stroke-width="2" points="' + poly('spent') + '"/>';
    [0, Math.floor(n/2), n-1].forEach(function (i) {
      var lbl = rows[i].day.slice(5);
      h += '<text x="' + x(i) + '" y="' + (H-6) + '" font-size="9" fill="#9ca3af" text-anchor="middle">' + esc(lbl) + '</text>';
    });
    h += '</svg>';
    h += '<div style="font-size:12px; color:#6b7280; margin-top:4px; display:flex; gap:18px; align-items:center;">';
    h += '<span style="display:inline-flex; align-items:center;"><span style="display:inline-block;width:10px;height:2px;background:#059669;vertical-align:middle;margin-right:5px;"></span>granted</span>';
    h += '<span><span style="display:inline-block;width:10px;height:2px;background:#dc2626;vertical-align:middle;margin-right:5px;"></span>spent</span>';
    h += '</div>';
    return h;
  }

  function topHolders(rows) {
    if (!rows || !rows.length) return '<em style="color:#9ca3af;">No user holds tokens yet.</em>';
    var h = '<table style="width:100%; border-collapse:collapse; font-size:12px;">';
    h += '<thead><tr style="text-align:left; color:#6b7280; border-bottom:1px solid #e5e7eb;">';
    h += '<th style="padding:6px 4px;">#</th><th style="padding:6px 4px;">Email</th><th style="padding:6px 4px; text-align:right;">Balance</th><th style="padding:6px 4px;">Role</th>';
    h += '</tr></thead><tbody>';
    rows.forEach(function (r, i) {
      h += '<tr style="border-bottom:1px solid #f3f4f6;">';
      h += '<td style="padding:6px 4px; color:#9ca3af;">' + (i+1) + '</td>';
      h += '<td style="padding:6px 4px;">' + esc(r.email) + '</td>';
      h += '<td style="padding:6px 4px; text-align:right; font-weight:600;">' + fmt(r.token_balance) + '</td>';
      h += '<td style="padding:6px 4px; color:#6b7280;">' + esc(r.role||'-') + '</td>';
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  function render(sb, mountEl) {
    if (!mountEl) return;
    var existing = document.getElementById('tokenFlowCard');
    if (existing) existing.remove();
    sb.rpc('treasury_stats').then(function (res) {
      if (res.error || !res.data || res.data.error) {
        mountEl.insertAdjacentHTML('afterend', '<div class="dash-card" id="tokenFlowCard"><div class="card-header"><h3>Token Flow</h3></div><div class="app-error">Error: ' + esc(res.error ? res.error.message : (res.data && res.data.error) || 'no data') + '</div></div>');
        return;
      }
      var d = res.data;
      var h = '<div class="dash-card" id="tokenFlowCard">';
      h += '<div class="card-header"><h3>Token Flow</h3></div>';
      h += hardCap(d.distribution);
      h += distributionBar(d.distribution);
      h += '<div style="border-top:1px solid #e5e7eb; margin-top:14px; padding-top:14px;">';
      h += '<div style="font-size:13px; font-weight:600; margin-bottom:8px;">Last 30 days</div>';
      h += lineChart(d.daily_flow || []);
      h += '</div>';
      h += '<div style="border-top:1px solid #e5e7eb; margin-top:14px; padding-top:14px;">';
      h += '<div style="font-size:13px; font-weight:600; margin-bottom:8px;">Top holders</div>';
      h += topHolders(d.top_holders || []);
      h += '</div>';
      h += '</div>';
      mountEl.insertAdjacentHTML('afterend', h);
    }).catch(function (e) {
      mountEl.insertAdjacentHTML('afterend', '<div class="dash-card" id="tokenFlowCard"><div class="app-error">Error: ' + esc(e.message) + '</div></div>');
    });
  }

  window.imarchTreasuryFlow = { render: render };
})();