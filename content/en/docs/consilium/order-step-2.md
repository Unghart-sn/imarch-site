---
title: "Rights Transfer Application — Step 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
translationKey: "boutique-order-step-2"
description: "Second stage of the rights transfer application in the Chronicle OS Bonus Boutique: review and dispatch of the protocol by mail."
---

#### ⚡ Rights transfer application recorded { .fade-in-up }

The data of your request has been transmitted to the coordination gateway of Verdictum / IMARCH LTD.

&nbsp;

#### 📨 STEP 2: Confirmation and dispatch of the protocol by mail { .fade-in-up }

To complete the verification procedure and transmit the data to the Archivist of IMARCH LTD, **please review the generated application protocol below, copy it and send it to our official postal gateway**.

Please review the data, copy it and send an email:

*   **Send to:** `orders@imarch.sbs`
*   **Email subject:** `Rights Transfer Application: [NODE ID]`

<!-- PROTOCOL BLOCK -->
<div id="orderAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

RIGHTS TRANSFER APPLICATION (VERDICTUM / BONUS BOUTIQUE)

========================

1. ARTIFACT IDENTIFICATION:
   • Title: <span id="lblOrderTitle">Loading...</span>
   • NODE ID: <span id="lblOrderNodeId">Loading...</span>
   • Lot: <span id="lblOrderLotNumber">Loading...</span>
   • License: <span id="lblOrderLicense">Loading...</span>
   • Marker: <span id="lblOrderMarker">Loading...</span>

2. CRYPTOGRAPHIC FIXATION:
   • SHA-256: <span id="lblOrderHash">Loading...</span>
   • Multi-Passport: <span id="lblOrderPassport">Loading...</span>

3. DELIVERY TERMS:
   • Entry threshold: £<span id="lblOrderThreshold">Loading...</span>

4. APPLICANT:
   • Contact (Email / Telegram): <span id="lblOrderContact">Loading...</span>
   • Note: <span id="lblOrderNote">—</span>

5. SECURITY AND COMPLIANCE:
   • Session identifier (Token): <span id="lblOrderToken">Generating...</span>
   • Protection regime: UK Trade Secrets Regulations 2018 (SI 2018/597)

Protocol generation date: <span id="lblOrderDate">Loading...</span>

========================

</div>

&nbsp;

<!-- COPY BUTTON -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyOrderAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Copy application protocol to clipboard
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Open your email service and paste the copied text into an email.
</p>

<div align="center">
  <a id="orderMailtoLink" href="mailto:orders@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 What happens next? { .fade-in-up }

After the application data is verified, the Archivist of IMARCH LTD will contact you via the specified channel to confirm the terms of the rights transfer, verify the recipient and issue the digital licence. The transfer of the master file from the Vault is carried out only after this procedure is complete.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/en/docs/consilium/" text="← Back to Bonus Boutique" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('orderAnketaBlock');

  // Guard against direct access to Step-2
  var nodeId = sessionStorage.getItem('order_node_id');
  if (!nodeId) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Application data not found.<br>Please return to the Bonus Boutique and complete the form again.</p>';
    }
    return;
  }

  var title       = sessionStorage.getItem('order_lot_title') || 'Not specified';
  var lotNumber   = sessionStorage.getItem('order_lot_number') || '—';
  var license     = sessionStorage.getItem('order_license_type') || '—';
  var marker      = sessionStorage.getItem('order_marker') || '—';
  var hash        = sessionStorage.getItem('order_file_hash') || '—';
  var passport    = sessionStorage.getItem('order_passport_url') || '—';
  var threshold   = sessionStorage.getItem('order_threshold_gbp') || '0';
  var contact     = sessionStorage.getItem('order_contact') || 'Not specified';
  var note        = sessionStorage.getItem('order_note') || '—';

  // Cryptographically strong token
  var token = sessionStorage.getItem('order_token');
  if (!token) {
    if (window.crypto && crypto.randomUUID) {
      token = 'ORD-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    } else {
      var arr = new Uint8Array(4);
      crypto.getRandomValues(arr);
      token = 'ORD-' + Array.from(arr, function(b) {
        return b.toString(16).padStart(2, '0');
      }).join('').toUpperCase();
    }
    sessionStorage.setItem('order_token', token);
  }

  var today = new Date().toLocaleDateString('en-GB');

  if(document.getElementById('lblOrderTitle'))     document.getElementById('lblOrderTitle').innerText = title;
  if(document.getElementById('lblOrderNodeId'))    document.getElementById('lblOrderNodeId').innerText = nodeId;
  if(document.getElementById('lblOrderLotNumber')) document.getElementById('lblOrderLotNumber').innerText = lotNumber;
  if(document.getElementById('lblOrderLicense'))   document.getElementById('lblOrderLicense').innerText = license;
  if(document.getElementById('lblOrderMarker'))    document.getElementById('lblOrderMarker').innerText = marker;
  if(document.getElementById('lblOrderHash'))      document.getElementById('lblOrderHash').innerText = hash;
  if(document.getElementById('lblOrderPassport'))  document.getElementById('lblOrderPassport').innerText = passport;
  if(document.getElementById('lblOrderThreshold')) document.getElementById('lblOrderThreshold').innerText = threshold;
  if(document.getElementById('lblOrderContact'))   document.getElementById('lblOrderContact').innerText = contact;
  if(document.getElementById('lblOrderNote'))      document.getElementById('lblOrderNote').innerText = note;
  if(document.getElementById('lblOrderToken'))     document.getElementById('lblOrderToken').innerText = token;
  if(document.getElementById('lblOrderDate'))      document.getElementById('lblOrderDate').innerText = today;

  var mailtoLink = document.getElementById('orderMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Rights Transfer Application: ' + nodeId);
    mailtoLink.setAttribute('href', 'mailto:orders@imarch.sbs?subject=' + subject);
  }
});

function copyOrderAnketa() {
  var container = document.getElementById('orderAnketaBlock');
  if (!container) return;

  var textToCopy = container.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Application protocol successfully copied to clipboard!');
  }).catch(function(err) {
    console.error('Copy error: ', err);
    alert('Automatic copy failed. Please select the text and press Ctrl+C.');
  });
}
</script>