---
title: "Institutional Application — Step 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
translationKey: "institutional-step-2"
description: "Second stage of the institutional application for Chronicle OS: verification and dispatch of the protocol by mail."
---

#### ⚡ Institutional circuit application recorded { .fade-in-up }

The data of your application has been transmitted to the coordination gateway of the Institutional Academic Wing (RN-0034).

&nbsp;

#### 📨 STEP 2: Confirmation and dispatch of the protocol by mail { .fade-in-up }

To complete the verification procedure and transmit the data to the registrar of IMARCH LTD, **please review the generated application protocol below, copy it and send it to our official postal gateway**.

Please review the data, copy it and send an email:

*   **Send to:** `partners@imarch.sbs`
*   **Email subject:** `Institutional Application: [Organisation Name]`

<!-- PROTOCOL BLOCK -->
<div id="instAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

INSTITUTIONAL CIRCUIT APPLICATION (RN-0034 / CHRONICLE OS)

========================

1. ORGANISATION DATA:
   • Full name: <span id="lblInstName">Loading...</span>
   • Desired subdomain: <span id="lblInstSubdomain">Loading...</span>

2. CONTACT PERSON:
   • Name of representative: <span id="lblInstRep">Loading...</span>
   • Work Email: <span id="lblInstEmail">Loading...</span>
   • Telegram: <span id="lblInstTel">Loading...</span>

3. SECURITY AND COMPLIANCE:
   • Session identifier (Token): <span id="lblInstToken">Generating...</span>
   • Protection regime: UK Trade Secrets Regulations 2018 (SI 2018/597)

Protocol generation date: <span id="lblInstDate">Loading...</span>

========================

</div>

&nbsp;

<!-- COPY BUTTON -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyInstAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Copy application protocol to clipboard
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Open your email service and paste the copied text into an email.
</p>

<div align="center">
  <a id="instMailtoLink" href="mailto:partners@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 What happens next? { .fade-in-up }

After the organisation's details are verified and the contact person confirmed, the registrar of IMARCH LTD will send an official reply with the draft Declaration of Intent and the Cooperation Memorandum, as well as a request for additional details required to launch the institutional circuit.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/en/" text="Home of CHRONICLE OS" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('instAnketaBlock');

  // Guard against direct access to Step-2
  var name = sessionStorage.getItem('inst_name');
  if (!name) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Application data not found.<br>Please return to the institutional integration page and complete the form again.</p>';
    }
    return;
  }

  var rep       = sessionStorage.getItem('inst_rep') || 'Not specified';
  var email     = sessionStorage.getItem('inst_email') || 'Not specified';
  var tel       = sessionStorage.getItem('inst_telegram') || 'Not specified';
  var subdomain = sessionStorage.getItem('inst_subdomain') || 'Not specified';

  // Cryptographically strong token
  var token = sessionStorage.getItem('inst_token');
  if (!token) {
    if (window.crypto && crypto.randomUUID) {
      token = 'INST-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    } else {
      var arr = new Uint8Array(4);
      crypto.getRandomValues(arr);
      token = 'INST-' + Array.from(arr, function(b) {
        return b.toString(16).padStart(2, '0');
      }).join('').toUpperCase();
    }
    sessionStorage.setItem('inst_token', token);
  }

  var today = new Date().toLocaleDateString('en-GB');

  if(document.getElementById('lblInstName'))      document.getElementById('lblInstName').innerText = name;
  if(document.getElementById('lblInstSubdomain')) document.getElementById('lblInstSubdomain').innerText = subdomain;
  if(document.getElementById('lblInstRep'))       document.getElementById('lblInstRep').innerText = rep;
  if(document.getElementById('lblInstEmail'))     document.getElementById('lblInstEmail').innerText = email;
  if(document.getElementById('lblInstTel'))       document.getElementById('lblInstTel').innerText = tel;
  if(document.getElementById('lblInstToken'))     document.getElementById('lblInstToken').innerText = token;
  if(document.getElementById('lblInstDate'))      document.getElementById('lblInstDate').innerText = today;

  var mailtoLink = document.getElementById('instMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Institutional Application: ' + name);
    mailtoLink.setAttribute('href', 'mailto:partners@imarch.sbs?subject=' + subject);
  }
});

function copyInstAnketa() {
  var container = document.getElementById('instAnketaBlock');
  if (!container) return;

  var textToCopy = container.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Institutional application protocol successfully copied to clipboard!');
  }).catch(function(err) {
    console.error('Copy error: ', err);
    alert('Automatic copy failed. Please select the text and press Ctrl+C.');
  });
}
</script>