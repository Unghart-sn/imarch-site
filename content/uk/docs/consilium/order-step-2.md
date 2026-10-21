---
title: "Заявка на передачу прав — Крок 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
translationKey: "boutique-order-step-2"
description: "Другий етап заявки на передачу прав у Бонус-Бутіку Chronicle OS: перевірка та надсилання протоколу поштою."
---

#### ⚡ Заявку на передачу прав зафіксовано { .fade-in-up }

Дані вашого запиту передано до координаційного шлюзу Verdictum / IMARCH LTD.

&nbsp;

#### 📨 КРОК 2: Підтвердження та надсилання протоколу поштою { .fade-in-up }

Щоб завершити процедуру верифікації та передати дані Архіваріусу IMARCH LTD, **перевірте згенерований протокол заявки нижче, скопіюйте його та надішліть на наш офіційний поштовий шлюз**.

Будь ласка, перевірте дані, скопіюйте їх і надішліть листа:

*   **Куди надсилати:** `orders@imarch.sbs`
*   **Тема листа:** `Заявка на передачу прав: [NODE ID]`

<!-- БЛОК З ПРОТОКОЛОМ -->
<div id="orderAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА НА ПЕРЕДАЧУ ПРАВ (VERDICTUM / BONUS BOUTIQUE)

========================

1. ІДЕНТИФІКАЦІЯ АРТЕФАКТУ:
   • Назва: <span id="lblOrderTitle">Завантаження...</span>
   • NODE ID: <span id="lblOrderNodeId">Завантаження...</span>
   • Лот: <span id="lblOrderLotNumber">Завантаження...</span>
   • Ліцензія: <span id="lblOrderLicense">Завантаження...</span>
   • Маркер: <span id="lblOrderMarker">Завантаження...</span>

2. КРИПТОГРАФІЧНА ФІКСАЦІЯ:
   • SHA-256: <span id="lblOrderHash">Завантаження...</span>
   • Мульти-паспорт: <span id="lblOrderPassport">Завантаження...</span>

3. УМОВИ ПОСТАВКИ:
   • Поріг входу: £<span id="lblOrderThreshold">Завантаження...</span>

4. ЗАЯВНИК:
   • Контакт (Email / Telegram): <span id="lblOrderContact">Завантаження...</span>
   • Примітка: <span id="lblOrderNote">—</span>

5. БЕЗПЕКА ТА КОМПЛАЄНС:
   • Ідентифікатор сесії (Token): <span id="lblOrderToken">Генерація...</span>
   • Регламент захисту: UK Trade Secrets Regulations 2018 (SI 2018/597)

Дата формування протоколу: <span id="lblOrderDate">Завантаження...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПІЮВАННЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyOrderAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопіювати протокол заявки до буфера обміну
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Відкрийте ваш поштовий сервіс і вставте скопійований текст у лист.
</p>

<div align="center">
  <a id="orderMailtoLink" href="mailto:orders@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Що відбувається далі? { .fade-in-up }

Після перевірки даних заявки Архіваріус IMARCH LTD зв'яжеться з вами за вказаним каналом зв'язку для підтвердження умов передачі прав, верифікації отримувача та оформлення цифрової ліцензії. Передача мастер-файлу з Vault здійснюється лише після завершення цієї процедури.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/uk/docs/consilium/" text="← Повернутися до Бонус-Бутіку" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('orderAnketaBlock');

  // Захист від прямого заходу на Крок 2
  var nodeId = sessionStorage.getItem('order_node_id');
  if (!nodeId) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Дані заявки не знайдено.<br>Будь ласка, поверніться до Бонус-Бутіку та заповніть форму заново.</p>';
    }
    return;
  }

  var title       = sessionStorage.getItem('order_lot_title') || 'Не вказано';
  var lotNumber   = sessionStorage.getItem('order_lot_number') || '—';
  var license     = sessionStorage.getItem('order_license_type') || '—';
  var marker      = sessionStorage.getItem('order_marker') || '—';
  var hash        = sessionStorage.getItem('order_file_hash') || '—';
  var passport    = sessionStorage.getItem('order_passport_url') || '—';
  var threshold   = sessionStorage.getItem('order_threshold_gbp') || '0';
  var contact     = sessionStorage.getItem('order_contact') || 'Не вказано';
  var note        = sessionStorage.getItem('order_note') || '—';

  // Криптостійкий токен
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

  var today = new Date().toLocaleDateString('uk-UA');

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
    var subject = encodeURIComponent('Заявка на передачу прав: ' + nodeId);
    mailtoLink.setAttribute('href', 'mailto:orders@imarch.sbs?subject=' + subject);
  }
});

function copyOrderAnketa() {
  var container = document.getElementById('orderAnketaBlock');
  if (!container) return;

  var textToCopy = container.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол заявки успішно скопійовано до буфера обміну!');
  }).catch(function(err) {
    console.error('Помилка копіювання: ', err);
    alert('Не вдалося скопіювати автоматично. Виділіть текст і натисніть Ctrl+C.');
  });
}
</script>