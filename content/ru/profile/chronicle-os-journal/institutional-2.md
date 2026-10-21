---
title: "Институциональная заявка — Шаг 2"
date: 2026-09-19
draft: false
type: "landing"
layout: "institutional"
description: "Второй этап институциональной заявки Chronicle OS: верификация и отправка протокола по почте."
---

#### ⚡ Заявка институционального контура зафиксирована { .fade-in-up }

Данные вашей анкеты переданы в координационный шлюз Институционального Научного Крыла (RN-0034).

&nbsp;

#### 📨 ШАГ 2: Подтверждение и отправка протокола по почте { .fade-in-up }

Чтобы завершить процедуру верификации и передать данные регистратору IMARCH LTD, **проверьте сгенерированный протокол заявки ниже, скопируйте его и отправьте на наш официальный почтовый шлюз**.

Пожалуйста, проверьте данные, скопируйте их и отправьте письмо:

*   **Куда отправлять:** `partners@imarch.sbs`
*   **Тема письма:** `Институциональная заявка: [Название организации]`

<!-- БЛОК С АНКЕТОЙ (КОД) -->
<div id="instAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА ИНСТИТУЦИОНАЛЬНОГО КОНТУРА (RN-0034 / CHRONICLE OS)

========================

1. ДАННЫЕ ОРГАНИЗАЦИИ:
   • Полное название: <span id="lblInstName">Загрузка...</span>
   • Желаемый субдомен: <span id="lblInstSubdomain">Загрузка...</span>

2. КОНТАКТНОЕ ЛИЦО:
   • ФИО представителя: <span id="lblInstRep">Загрузка...</span>
   • Рабочий Email: <span id="lblInstEmail">Загрузка...</span>
   • Telegram: <span id="lblInstTel">Загрузка...</span>

3. БЕЗОПАСНОСТЬ И КОМПЛАЕНС:
   • Идентификатор сессии (Token): <span id="lblInstToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)

Дата формирования протокола: <span id="lblInstDate">Загрузка...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyInstAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол заявки в буфер обмена
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Откройте ваш почтовый сервис и вставьте скопированный текст в письмо.
</p>

<div align="center">
  <a id="instMailtoLink" href="mailto:partners@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Что происходит дальше? { .fade-in-up }

После проверки сведений об организации и подтверждения контактного лица, регистратор IMARCH LTD направит официальный ответ с проектом Декларации о намерениях и Меморандума о сотрудничестве, а также запрос на предоставление дополнительных реквизитов, необходимых для запуска институционального контура.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/" text="Главная CHRONICLE OS" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  var block = document.getElementById('instAnketaBlock');

  // Защита от прямого захода на Step-2
  var name = sessionStorage.getItem('inst_name');
  if (!name) {
    if (block) {
      block.innerHTML = '<p style="text-align:center; padding: 2rem 0;">⚠️ Данные заявки не найдены.<br>Пожалуйста, вернитесь на страницу институциональной интеграции и заполните форму заново.</p>';
    }
    return;
  }

  var rep       = sessionStorage.getItem('inst_rep') || 'Не указано';
  var email     = sessionStorage.getItem('inst_email') || 'Не указано';
  var tel       = sessionStorage.getItem('inst_telegram') || 'Не указано';
  var subdomain = sessionStorage.getItem('inst_subdomain') || 'Не указано';

  // Криптостойкий токен
  var token = sessionStorage.getItem('inst_token');
  if (!token) {
    if (window.crypto && crypto.randomUUID) {
      token = 'INST-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    } else {
      // Fallback для очень старых браузеров
      var arr = new Uint8Array(4);
      crypto.getRandomValues(arr);
      token = 'INST-' + Array.from(arr, function(b) {
        return b.toString(16).padStart(2, '0');
      }).join('').toUpperCase();
    }
    sessionStorage.setItem('inst_token', token);
  }

  var today = new Date().toLocaleDateString('ru-RU');

  if(document.getElementById('lblInstName'))      document.getElementById('lblInstName').innerText = name;
  if(document.getElementById('lblInstSubdomain')) document.getElementById('lblInstSubdomain').innerText = subdomain;
  if(document.getElementById('lblInstRep'))       document.getElementById('lblInstRep').innerText = rep;
  if(document.getElementById('lblInstEmail'))     document.getElementById('lblInstEmail').innerText = email;
  if(document.getElementById('lblInstTel'))       document.getElementById('lblInstTel').innerText = tel;
  if(document.getElementById('lblInstToken'))     document.getElementById('lblInstToken').innerText = token;
  if(document.getElementById('lblInstDate'))      document.getElementById('lblInstDate').innerText = today;

  // Динамическая mailto-ссылка
  var mailtoLink = document.getElementById('instMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Институциональная заявка: ' + name);
    mailtoLink.setAttribute('href', 'mailto:partners@imarch.sbs?subject=' + subject);
  }
});

// Функция копирования
function copyInstAnketa() {
  var container = document.getElementById('instAnketaBlock');
  if (!container) return;

  var textToCopy = container.innerText;

  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол институциональной заявки успешно скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Выделите текст и нажмите Ctrl+C.');
  });
}
</script>