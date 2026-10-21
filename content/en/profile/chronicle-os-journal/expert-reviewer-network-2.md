---
title: "IMARCH CHRONICLE OS: Expert Reviewer Network | Reviewers"
date: 2026-05-30
draft: false
tags: ["reviewer", "network", "science"]
translationKey: "reviewer-network-2"
description: "IMARCH CHRONICLE OS: an international scientometric platform invites PhD-level specialists to join the global expert reviewer network. Barter, tokens, fiat, gamification, and Top-10."
---

#### ⚡ Your data has been successfully verified and entered into the coordination gateway { .fade-in-up }

Thank you for completing the application form for admission to the Expert Reviewer Network.

Your application has been accepted by the automated management system in the coordinators' Telegram channel.

&nbsp;

#### 💳 STEP 2: Financial Accreditation and Duplication of Application Data { .fade-in-up }

To eliminate failures in automatic email gateways and to reliably align your application data with your payment profile, **you are required to manually duplicate the completed application form and your payment details to our official email address**.

Please **copy the contents of the form using the button below**, or select and copy the text manually, fill it in with your data, and send the email:

*   **Send to:** `info@imarch.sbs`
*   **Subject line:** `Reviewer [Your Full Name]`

<!-- FORM BLOCK (CODE) -->
<div id="anketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 400px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

===============================

COMPLETE APPLICATION FORM AND FINANCIAL ACCREDITATION REQUEST

===============================

1. CANDIDATE BASIC INFORMATION:
   • Full Name: 
   • Contact Email: 
   • Telegram Profile (with @): 

2. ACADEMIC PROFILE:
   • Qualification / Academic Degree: 
   • Scientific Identifiers (ORCID, Scopus, ResearchGate): 
   • Preferred Specialisation / League: 

3. PAYMENT DETAILS FOR REVIEW REMUNERATION:
   • Method 1: Bank Card / IBAN (Currency, Number, Bank):
   • Method 2: Cryptocurrency Wallet (USDT TRC-20 / BEP-20):
     

Date of completion: [Enter date]

===============================
</div>

&nbsp;

<!-- COPY BUTTON -->
<div style="text-align: center; margin: 1rem 0 0.5rem 0;">
  <button onclick="copyAnketa()" style="background: #b18b56; border: none; color: white; padding: 12px 28px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 10px rgba(177,139,86,0.3);">
    📋 Copy form for completion
  </button>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<div align="center">
  <a href="mailto:info@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 💳 STEP 3: Memorandum of Understanding and Financial Accreditation { .fade-in-up }

Every action within the system — from the recording of your application to the submission of your expert opinion — undergoes strict registration in the distributed ledger of CCS CRONICAL OS 8888.

To activate your commercial profile and ensure the lawfulness of remuneration, the system provides two formats of engagement:

#### 📜 Legal Framework { .fade-in-up }

Memorandum of Cooperation: Prior to the submission of the first scholarly material for review, a individual Memorandum (NDA / Expert Agreement) is concluded with each expert, establishing the status of the parties, confidentiality obligations, and the fee schedule.

If you are acting on behalf of a University / Institution: Remuneration and closing documents are processed under a direct institutional agreement to the university's bank account. In this case, please provide your organisation's details in the template below (the contracting process is coordinated separately).

If you are acting as an independent expert: Remuneration is paid directly to your personal account or cryptocurrency gateway in accordance with the signed Memorandum.

#### ⏱ Timeframes and Payment Regulations { .fade-in-up }

Transaction Recording: The accrual of fees is automatically registered in the system at the moment of final approval of the accepted review by the analytical group.

Payment Timeline: Funds are transferred to the specified details within 3–5 banking days from the date of recording of the submitted expert opinion (within 24 hours for crypto gateways).

<!-- WHITE BLOCK WITH HOME BUTTON -->
<div style="background: #ffffff; padding: 2rem 1.5rem; margin: 1.5rem 0 0 0; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e0e0e0;">
  {{< steel_button link="/en/" text="CHRONICLE OS Home" margin="0" >}}
</div>

<script>
function copyAnketa() {
  const text = document.getElementById('anketaBlock').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.createElement('div');
    toast.innerText = '✅ Form copied! Paste it into the email and complete.';
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = '#1f2b1c';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 28px';
    toast.style.borderRadius = '40px';
    toast.style.fontSize = '0.85rem';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    toast.style.fontWeight = '600';
    document.body.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
  }).catch(() => {
    alert('Unable to copy the form. Please copy it manually.');
  });
}
</script>