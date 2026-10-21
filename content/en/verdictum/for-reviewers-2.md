---
title: "Reviewer Registration — Step 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-reviewers-2"
description: "The second stage of registering an expert reviewer in the VERDICTUM network: verification and duplication of data."
---

#### ⚡ The expert reviewer application has been fixed { .fade-in-up }

The data of your application have been transmitted to the coordination gateway of the VERDICTUM Expert Reviewer Network (RN-0031).

&nbsp;

#### 📨 STEP 2: Confirmation and dispatch of the protocol by email { .fade-in-up }

In order to complete the verification procedure and to confirm your qualification before the registrar of IMARCH LTD, **please verify the generated application protocol below, copy it and send it to our official email gateway**.

Please verify the data, copy them and send an email:

*   **Where to send:** `info@imarch.ltd`
*   **Subject line:** `VERDICTUM reviewer application: [Your Full Name]`

<!-- BLOCK WITH THE APPLICATION FORM (CODE) -->
<div id="reviewerAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

EXPERT REVIEWER APPLICATION (RN-0031 / VERDICTUM)

========================

1. PERSONAL AND CONTACT DATA:
   • Full name of the expert: <span id="lblRevName">Loading...</span>
   • Business Email: <span id="lblRevEmail">Loading...</span>
   • Contact channel: <span id="lblRevTel">Loading...</span>

2. PROFESSIONAL PROFILE:
   • Qualification and organisation: <span id="lblRevDegree">Loading...</span>
   • Digital identifiers (ORCID/Scopus): <span id="lblRevIds">Loading...</span>
   • Field of expertise: <span id="lblRevDirection">Loading...</span>

3. PAYMENT DETAILS:
   • Card / IBAN: <span id="lblRevCard">Loading...</span>
   • Crypto-wallet (USDT): <span id="lblRevCrypto">Loading...</span>

4. SECURITY AND COMPLIANCE:
   • Session identifier (Token): <span id="lblRevToken">Generating...</span>
   • Protection regulation: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Legal basis: Act RN-0028 of 06.07.2026

Date of formation of the protocol: <span id="lblRevDate">Loading...</span>

========================

</div>

&nbsp;

<!-- COPY BUTTON -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyReviewerAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Copy the application protocol to the clipboard
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Open your email service and paste the copied text into the message.
</p>

<div align="center">
  <a id="revMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 What happens next? { .fade-in-up }

Following the verification of your digital profile (ORCID / Scopus) and the registration of the application protocol, you will be sent an official confirmation of your inclusion in the **VERDICTUM Expert Reviewer Network**, together with access to the first pool of materials for peer review.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="VERDICTUM Home" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Retrieve the data from sessionStorage
  var name      = sessionStorage.getItem('rev_name') || 'Not specified';
  var email     = sessionStorage.getItem('rev_email') || 'Not specified';
  var tel       = sessionStorage.getItem('rev_telegram') || 'Not specified';
  var degree    = sessionStorage.getItem('rev_degree') || 'Not specified';
  var ids       = sessionStorage.getItem('rev_identifiers') || 'Not specified';
  var direction = sessionStorage.getItem('rev_direction') || 'Not specified';
  var card      = sessionStorage.getItem('rev_card') || 'Not specified';
  var crypto    = sessionStorage.getItem('rev_crypto') || 'Not specified';
  
  // 2. Token generation
  var token = sessionStorage.getItem('rev_token');
  if (!token) {
    token = 'VD-REV-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('rev_token', token);
  }

  // 3. Formatting of the current date
  var today = new Date().toLocaleDateString('en-GB');

  // 4. Substitution of values
  if(document.getElementById('lblRevName'))      document.getElementById('lblRevName').innerText = name;
  if(document.getElementById('lblRevEmail'))     document.getElementById('lblRevEmail').innerText = email;
  if(document.getElementById('lblRevTel'))       document.getElementById('lblRevTel').innerText = tel;
  if(document.getElementById('lblRevDegree'))    document.getElementById('lblRevDegree').innerText = degree;
  if(document.getElementById('lblRevIds'))       document.getElementById('lblRevIds').innerText = ids;
  if(document.getElementById('lblRevDirection')) document.getElementById('lblRevDirection').innerText = direction;
  if(document.getElementById('lblRevCard'))      document.getElementById('lblRevCard').innerText = card;
  if(document.getElementById('lblRevCrypto'))    document.getElementById('lblRevCrypto').innerText = crypto;
  if(document.getElementById('lblRevToken'))     document.getElementById('lblRevToken').innerText = token;
  if(document.getElementById('lblRevDate'))      document.getElementById('lblRevDate').innerText = today;

  // 5. Dynamic mailto link
  var mailtoLink = document.getElementById('revMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('VERDICTUM reviewer application: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Copy function
function copyReviewerAnketa() {
  var container = document.getElementById('reviewerAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('The reviewer application protocol has been successfully copied to the clipboard!');
  }).catch(function(err) {
    console.error('Copy error: ', err);
    alert('Could not copy automatically. Select the text and press Ctrl+C.');
  });
}
</script>