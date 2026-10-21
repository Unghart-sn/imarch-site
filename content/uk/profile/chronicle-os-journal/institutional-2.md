---
title: "Інституційна заявка — Крок 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
translationKey: "institutional-step-2"
description: "Другий етап інституційної заявки Chronicle OS: верифікація та надсилання протоколу поштою."
---

#### ⚡ Інституційну заявку зафіксовано { .fade-in-up }

Дані вашої анкети передано до координаційного шлюзу Інституційного Наукового Крила (RN-0034).

&nbsp;

#### 📨 КРОК 2: Підтвердження та надсилання протоколу поштою { .fade-in-up }

Щоб завершити процедуру верифікації та передати дані реєстратору IMARCH LTD, **перевірте згенерований протокол заявки нижче, скопіюйте його та надішліть на наш офіційний поштовий шлюз**.

Будь ласка, перевірте дані, скопіюйте їх і надішліть листа:

*   **Куди надсилати:** `partners@imarch.sbs`
*   **Тема листа:** `Інституційна заявка: [Назва організації]`

<!-- БЛОК З АНКЕТОЮ -->
<div id="instAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА ІНСТИТУЦІЙНОГО КОНТУРУ (RN-0034 / CHRONICLE OS)

========================

1. ДАНІ ОРГАНІЗАЦІЇ:
   • Повна назва: <span id="lblInstName">Завантаження...</span>
   • Бажаний субдомен: <span id="lblInstSubdomain">Завантаження...</span>

2. КОНТАКТНА ОСОБА:
   • ПІБ представника: <span id="lblInstRep">Завантаження...</span>
   • Робочий Email: <span id="lblInstEmail">Завантаження...</span>
   • Telegram: <span id="lblInstTel">Завантаження...</span>

3. БЕЗПЕКА ТА КОМПЛАЄНС:
   • Ідентифікатор сесії (Token): <span id="lblInstToken">Генерація...</span>
   • Регламент захисту: UK Trade Secrets Regulations 2018 (SI 2018/597)

Дата формування протоколу: <span id="lblInstDate">Завантаження...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПІЮВАННЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyInstAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопіювати протокол заявки до буфера обміну
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Відкрийте ваш поштовий сервіс і вставте скопійований текст у лист.
</p>

<div align="center">
  <a id="instMailtoLink" href="mailto:partners@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Що відбувається далі? { .fade-in-up }

Після перевірки відомостей про організацію та підтвердження контактної особи реєстратор IMARCH LTD надішле офіційну відповідь із проєктом Декларації про наміри та Меморандуму про співпрацю, а також запит на надання додаткових реквізитів, необхідних для запуску інституційного контуру.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/uk/" text="Головна CHRONICLE OS" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('instAnketaBlock');

  // Захист від прямого заходу на Крок 2
  var name = sessionStorage.getItem('inst_name');
  if (!name) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Дані заявки не знайдено.<br>Будь ласка, поверніться на сторінку інституційної інтеграції та заповніть форму заново.</p>';
    }
    return;
  }

  var rep       = sessionStorage.getItem('inst_rep') || 'Не вказано';
  var email     = sessionStorage.getItem('inst_email') || 'Не вказано';
  var tel       = sessionStorage.getItem('inst_telegram') || 'Не вказано';
  var subdomain = sessionStorage.getItem('inst_subdomain') || 'Не вказано';

  // Криптостійкий токен
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

  var today = new Date().toLocaleDateString('uk-UA');

  if(document.getElementById('lblInstName'))      document.getElementById('lblInstName').innerText = name;
  if(document.getElementById('lblInstSubdomain')) document.getElementById('lblInstSubdomain').innerText = subdomain;
  if(document.getElementById('lblInstRep'))       document.getElementById('lblInstRep').innerText = rep;
  if(document.getElementById('lblInstEmail'))     document.getElementById('lblInstEmail').innerText = email;
  if(document.getElementById('lblInstTel'))       document.getElementById('lblInstTel').innerText = tel;
  if(document.getElementById('lblInstToken'))     document.getElementById('lblInstToken').innerText = token;
  if(document.getElementById('lblInstDate'))      document.getElementById('lblInstDate').innerText = today;

  var mailtoLink = document.getElementById('instMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Інституційна заявка: ' + name);
    mailtoLink.setAttribute('href', 'mailto:partners@imarch.sbs?subject=' + subject);
  }
});

function copyInstAnketa() {
  var container = document.getElementById('instAnketaBlock');
  if (!container) return;

  var textToCopy = container.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол інституційної заявки успішно скопійовано до буфера обміну!');
  }).catch(function(err) {
    console.error('Помилка копіювання: ', err);
    alert('Не вдалося скопіювати автоматично. Виділіть текст і натисніть Ctrl+C.');
  });
}
</script>