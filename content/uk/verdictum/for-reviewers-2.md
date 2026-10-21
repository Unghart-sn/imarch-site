---
title: "Реєстрація рецензента — Крок 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-reviewers-2"
description: "Другий етап реєстрації експертного рецензента в мережі VERDICTUM: верифікація та дублювання даних."
---

#### ⚡ Заявку експертного рецензента зафіксовано { .fade-in-up }

Дані вашої анкети передано до координаційного шлюзу Expert Reviewer Network VERDICTUM (RN-0031).

&nbsp;

#### 📨 КРОК 2: Підтвердження та надсилання протоколу поштою { .fade-in-up }

Щоб завершити процедуру верифікації та підтвердити кваліфікацію перед реєстратором IMARCH LTD, **перевірте згенерований протокол заявки нижче, скопіюйте його та надішліть на наш офіційний поштовий шлюз**.

Будь ласка, перевірте дані, скопіюйте їх і надішліть листа:

*   **Куди надсилати:** `info@imarch.ltd`
*   **Тема листа:** `Заявка рецензента VERDICTUM: [Ваше ПІБ]`

<!-- БЛОК З АНКЕТОЮ (КОД) -->
<div id="reviewerAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА ЕКСПЕРТНОГО РЕЦЕНЗЕНТА (RN-0031 / VERDICTUM)

========================

1. ОСОБИСТІ ТА КОНТАКТНІ ДАНІ:
   • ПІБ експерта: <span id="lblRevName">Завантаження...</span>
   • Робочий Email: <span id="lblRevEmail">Завантаження...</span>
   • Канал зв'язку: <span id="lblRevTel">Завантаження...</span>

2. ПРОФЕСІЙНИЙ ПРОФІЛЬ:
   • Кваліфікація та організація: <span id="lblRevDegree">Завантаження...</span>
   • Цифрові ідентифікатори (ORCID/Scopus): <span id="lblRevIds">Завантаження...</span>
   • Напрям експертизи: <span id="lblRevDirection">Завантаження...</span>

3. ПЛАТІЖНІ РЕКВІЗИТИ:
   • Картка / IBAN: <span id="lblRevCard">Завантаження...</span>
   • Крипто-гаманець (USDT): <span id="lblRevCrypto">Завантаження...</span>

4. БЕЗПЕКА ТА КОМПЛАЄНС:
   • Ідентифікатор сесії (Token): <span id="lblRevToken">Генерування...</span>
   • Регламент захисту: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Правова підстава: Акт RN-0028 від 06.07.2026

Дата формування протоколу: <span id="lblRevDate">Завантаження...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПІЮВАННЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyReviewerAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопіювати протокол заявки до буфера обміну
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Відкрийте ваш поштовий сервіс і вставте скопійований текст у лист.
</p>

<div align="center">
  <a id="revMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Що відбувається далі? { .fade-in-up }

Після звірки вашого цифрового профілю (ORCID / Scopus) та реєстрації протоколу заявки вам буде надіслано офіційне підтвердження про включення до **Expert Reviewer Network VERDICTUM**, а також доступ до першого пулу матеріалів для рецензування.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="Головна VERDICTUM" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Зчитуємо дані із sessionStorage
  var name      = sessionStorage.getItem('rev_name') || 'Не вказано';
  var email     = sessionStorage.getItem('rev_email') || 'Не вказано';
  var tel       = sessionStorage.getItem('rev_telegram') || 'Не вказано';
  var degree    = sessionStorage.getItem('rev_degree') || 'Не вказано';
  var ids       = sessionStorage.getItem('rev_identifiers') || 'Не вказано';
  var direction = sessionStorage.getItem('rev_direction') || 'Не вказано';
  var card      = sessionStorage.getItem('rev_card') || 'Не вказано';
  var crypto    = sessionStorage.getItem('rev_crypto') || 'Не вказано';
  
  // 2. Генерування токена
  var token = sessionStorage.getItem('rev_token');
  if (!token) {
    token = 'VD-REV-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('rev_token', token);
  }

  // 3. Форматування поточної дати
  var today = new Date().toLocaleDateString('ru-RU');

  // 4. Підстановка значень
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

  // 5. Динамічне посилання mailto
  var mailtoLink = document.getElementById('revMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Заявка рецензента VERDICTUM: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Функція копіювання
function copyReviewerAnketa() {
  var container = document.getElementById('reviewerAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол заявки рецензента успішно скопійовано до буфера обміну!');
  }).catch(function(err) {
    console.error('Помилка копіювання: ', err);
    alert('Не вдалося скопіювати автоматично. Виділіть текст і натисніть Ctrl+C.');
  });
}
</script>