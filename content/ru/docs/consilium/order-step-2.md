---
title: "Заявка на передачу прав — Шаг 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
description: "Второй этап заявки на передачу прав в Бонус-Бутике Chronicle OS: проверка и отправка протокола по почте."
---

#### ⚡ Заявка на передачу прав зафиксирована { .fade-in-up }

Данные вашего запроса переданы в координационный шлюз Verdictum / IMARCH LTD.

&nbsp;

#### 📨 ШАГ 2: Подтверждение и отправка протокола по почте { .fade-in-up }

Чтобы завершить процедуру верификации и передать данные Архивариусу IMARCH LTD, **проверьте сгенерированный протокол заявки ниже, скопируйте его и отправьте на наш официальный почтовый шлюз**.

Пожалуйста, проверьте данные, скопируйте их и отправьте письмо:

*   **Куда отправлять:** `orders@imarch.sbs`
*   **Тема письма:** `Заявка на передачу прав: [NODE ID]`

<!-- БЛОК С ПРОТОКОЛОМ -->
<div id="orderAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА НА ПЕРЕДАЧУ ПРАВ (VERDICTUM / BONUS BOUTIQUE)

========================

1. ИДЕНТИФИКАЦИЯ АРТЕФАКТА:
   • Название: <span id="lblOrderTitle">Загрузка...</span>
   • NODE ID: <span id="lblOrderNodeId">Загрузка...</span>
   • Лот: <span id="lblOrderLotNumber">Загрузка...</span>
   • Лицензия: <span id="lblOrderLicense">Загрузка...</span>
   • Маркер: <span id="lblOrderMarker">Загрузка...</span>

2. КРИПТОГРАФИЧЕСКАЯ ФИКСАЦИЯ:
   • SHA-256: <span id="lblOrderHash">Загрузка...</span>
   • Мульти-паспорт: <span id="lblOrderPassport">Загрузка...</span>

3. УСЛОВИЯ ПОСТАВКИ:
   • Порог входа: £<span id="lblOrderThreshold">Загрузка...</span>

4. ЗАЯВИТЕЛЬ:
   • Контакт (Email / Telegram): <span id="lblOrderContact">Загрузка...</span>
   • Примечание: <span id="lblOrderNote">—</span>

5. БЕЗОПАСНОСТЬ И КОМПЛАЕНС:
   • Идентификатор сессии (Token): <span id="lblOrderToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)

Дата формирования протокола: <span id="lblOrderDate">Загрузка...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyOrderAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол заявки в буфер обмена
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Откройте ваш почтовый сервис и вставьте скопированный текст в письмо.
</p>

<div align="center">
  <a id="orderMailtoLink" href="mailto:orders@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Что происходит дальше? { .fade-in-up }

После проверки данных заявки Архивариус IMARCH LTD свяжется с вами по указанному каналу связи для подтверждения условий передачи прав, верификации получателя и оформления цифровой лицензии. Передача мастер-файла из Vault осуществляется только после завершения этой процедуры.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/docs/consilium/" text="← Вернуться в Бонус-Бутик" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('orderAnketaBlock');

  // Защита от прямого захода на Step-2
  var nodeId = sessionStorage.getItem('order_node_id');
  if (!nodeId) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Данные заявки не найдены.<br>Пожалуйста, вернитесь в Бонус-Бутик и заполните форму заново.</p>';
    }
    return;
  }

  var title       = sessionStorage.getItem('order_lot_title') || 'Не указано';
  var lotNumber   = sessionStorage.getItem('order_lot_number') || '—';
  var license     = sessionStorage.getItem('order_license_type') || '—';
  var marker      = sessionStorage.getItem('order_marker') || '—';
  var hash        = sessionStorage.getItem('order_file_hash') || '—';
  var passport    = sessionStorage.getItem('order_passport_url') || '—';
  var threshold   = sessionStorage.getItem('order_threshold_gbp') || '0';
  var contact     = sessionStorage.getItem('order_contact') || 'Не указано';
  var note        = sessionStorage.getItem('order_note') || '—';

  // Криптостойкий токен
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

  var today = new Date().toLocaleDateString('ru-RU');

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

  // Динамическая mailto-ссылка
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
    alert('Протокол заявки успешно скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Выделите текст и нажмите Ctrl+C.');
  });
}
</script>