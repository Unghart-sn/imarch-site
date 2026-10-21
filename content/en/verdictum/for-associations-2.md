---
title: "Institutional Verification — Step 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-associations-2"
description: "The second stage of connecting an association to VERDICTUM: generation of the verification token and duplication of the official request."
---

#### ⚡ The preliminary application has been successfully fixed in the coordination gateway { .fade-in-up }

The internal systems of VERDICTUM have reserved the indicated technological node for your organisation.

&nbsp;

#### 📨 STEP 2: Official duplication and verification by email { .fade-in-up }

In order to exclude compliance risks and to confirm the official status of the submitted application before the British registrar, **the leadership or an authorised person of the association must duplicate the integration parameters to our official email gateway**.

Please **verify the generated data in the text block below**, copy it and send an email:

*   **Where to send:** `info@imarch.ltd`
*   **Subject line:** `VERDICTUM Institutional Connection: [Name of your association]`

<!-- BLOCK WITH THE APPLICATION FORM (CODE) -->
<div id="assocAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 400px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

APPLICATION FOR INTEGRATION OF AN ASSOCIATION INTO THE VERDICTUM REGISTRY

========================

1. INFORMATION ON THE ORGANISATION:
   • Name of the association: <span id="lblAssocName">Loading...</span>
   • Allocated subdomain: <span id="lblAssocSub">Loading...</span>

2. INFORMATION ON THE REPRESENTATIVE:
   • Full name of the person: <span id="lblAssocRep">Loading...</span>
   • Business email: <span id="lblAssocEmail">Loading...</span>
   • Contact channel: <span id="lblAssocTel">Loading...</span>

3. SECURITY AND COMPLIANCE (TEMPORARY TOKEN):
   • Session identifier (Session Token): <span id="lblToken">Generating...</span>
   • Protection regulation: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Legal basis: Act RN-0028 of 06.07.2026

Date of dispatch of the protocol: <span id="lblAssocDate">Loading...</span>

========================

</div>

&nbsp;

<!-- COPY BUTTON -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyAssocAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Copy the application protocol to the clipboard
  </button>
</div>

<div align="center">
  <a id="assocMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 What happens next? { .fade-in-up }

Following the receipt and comparison of the hash data of your email with the reserved transaction in the coordination gateway of the administrator, a baseline package of legal documents will be sent to your official address: the draft Memorandum of Cooperation and the financial compliance model.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="VERDICTUM Home" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Retrieve the data from the session that was saved at Step 1
  var name = sessionStorage.getItem('assoc_name') || 'Not specified';
  var sub  = sessionStorage.getItem('assoc_subdomain') || 'Not specified';
  var rep  = sessionStorage.getItem('assoc_rep') || 'Not specified';
  var email= sessionStorage.getItem('assoc_email') || 'Not specified';
  var tel  = sessionStorage.getItem('assoc_telegram') || 'Not specified';
  var token= sessionStorage.getItem('assoc_token') || 'VD-ASSOC-NOTOKEN-0000';

  // 2. Insert them into the corresponding spans on the page
  if(document.getElementById('lblAssocName'))  document.getElementById('lblAssocName').innerText = name;
  if(document.getElementById('lblAssocSub'))   document.getElementById('lblAssocSub').innerText = sub;
  if(document.getElementById('lblAssocRep'))   document.getElementById('lblAssocRep').innerText = rep;
  if(document.getElementById('lblAssocEmail')) document.getElementById('lblAssocEmail').innerText = email;
  if(document.getElementById('lblAssocTel'))   document.getElementById('lblAssocTel').innerText = tel;
  if(document.getElementById('lblToken'))      document.getElementById('lblToken').innerText = token;
  if(document.getElementById('lblAssocDate'))  document.getElementById('lblAssocDate').innerText = new Date().toLocaleDateString('en-GB');

  // 3. Dynamic mailto link
  var mailtoLink = document.getElementById('assocMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('VERDICTUM Institutional Connection: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Copy function
function copyAssocAnketa() {
  var container = document.getElementById('assocAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('The application protocol has been successfully copied to the clipboard!');
  }).catch(function(err) {
    console.error('Copy error: ', err);
    alert('Could not copy automatically. Please select the text within the frame and press Ctrl+C.');
  });
}
</script>