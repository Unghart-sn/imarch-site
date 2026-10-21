---
title: "Вёрстка монографии — Шаг 2"
date: 2026-08-10
draft: false
type: "landing"
layout: "institutional"
translationKey: "monograph-typesetting-step2"
description: "Второй этап: криптографическая фиксация SHA-256, получение протокола и внесение добровольного взноса на поддержку TFM Engine."
---

#### 📚 ВАША МОНОГРАФИЯ ЗАФИКСИРОВАНА { .fade-in-up }

Протокол криптографической фиксации вашей рукописи успешно сформирован в реестре IMARCH TFM Engine (RN-0043).

&nbsp;

#### 💳 ШАГ 2: ПОДДЕРЖКА ИНФРАСТРУКТУРЫ И ОТПРАВКА ФАЙЛОВ { .fade-in-up }

Для запуска процесса вёрстки необходимо:

1. **Скопировать официальный протокол** депонирования ниже.
2. **Внести добровольный взнос** на поддержку TFM Engine (сумма зависит от выбранного тарифа).
3. **Отправить копию протокола и файлы** на наш официальный почтовый шлюз `info@imarch.sbs`.

В благодарность за поддержку инфраструктуры мы выполняем вёрстку вашей монографии с гарантированным качеством и в установленный срок.

<!-- БЛОК С ПРОТОКОЛОМ -->
<div id="monographProtocolBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================================================

ПРОТОКОЛ ДЕПОНИРОВАНИЯ МОНОГРАФИИ (RN-0043 / TFM ENGINE)

========================================================

1. РЕКВИЗИТЫ АВТОРА:
   • Автор: <span id="lblMonoName">Загрузка...</span>
   • Email: <span id="lblMonoEmail">Загрузка...</span>
   • ВУЗ / Организация: <span id="lblMonoAffil">Загрузка...</span>

2. МЕТАДАННЫЕ МОНОГРАФИИ:
   • Название: <span id="lblMonoTitle">Загрузка...</span>
   • Аннотация: <span id="lblMonoAbstract">Загрузка...</span>
   • Тариф: <span id="lblMonoTariff">Загрузка...</span>

3. КРИПТОГРАФИЧЕСКИЙ ОТПЕЧАТОК (SHA-256):
   • Хеш файла: <span id="lblMonoHash">Загрузка...</span>

4. СТАТУС И КОМПЛАЕНС:
   • Сессионный токен: <span id="lblMonoToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Статус взноса: ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ

Дата депонирования: <span id="lblMonoDate">Загрузка...</span>

========================================================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 0.5rem 0;">
  <button onclick="copyMonographProtocol()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол депонирования
  </button>
</div>

<p style="font-size: 0.85rem; color: #7a6a5a; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Откройте почтовый сервис и вставьте скопированный текст в письмо. Приложите файл рукописи (и изображения, если есть) к письму.
</p>

<div align="center" style="margin-top: 0.5rem;">
  <a id="monoMailtoLink" href="mailto:info@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<!-- ===== КАРТОЧКА ВНЕСЕНИЯ ВЗНОСА ===== -->
<div style="background: linear-gradient(145deg, #f8f3ec, #eee8df); border: 1.5px solid #c0b09a; border-radius: 20px; padding: clamp(1rem, 4vw, 2rem); margin: 2rem auto; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.04); max-width: 100%; box-sizing: border-box;">
  
  <span style="font-size: clamp(2rem, 6vw, 3rem); display: block; margin-bottom: 0.5rem;">💳</span>
  
  <div style="font-size: clamp(1.2rem, 4vw, 1.6rem); font-weight: 800; color: #2c2416; margin-bottom: 0.5rem; word-wrap: break-word;">
    ПОДДЕРЖКА TFM ENGINE
  </div>
  
  <p style="font-size: clamp(0.9rem, 2.5vw, 1rem); color: #4a3a2a; margin-bottom: 1.25rem; line-height: 1.5;">
    <strong>Рекомендуемый взнос:</strong> <span id="lblMonoAmount" style="font-size: 1.1em; color: #8b6b3e;">—</span><br />
    <small style="font-size: 0.85em; opacity: 0.85;">(Поддержка разработки TFM Engine и инфраструктуры вёрстки)</small>
  </p>

  <!-- Кнопка доната -->
  <a href="https://whydonate.com/fundraising/vis-realitatis-preserving-memory" target="_blank" rel="noopener" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #b18b56; color: #ffffff; font-weight: 700; padding: 0.85rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; box-shadow: 0 2px 8px rgba(177,139,86,0.3);">
      💳 Внести взнос на WhyDonate
  </a>

  <a href="/ru/docs/ludus/" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #2c2416; color: #f8f3ec; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; font-size: 0.9rem;">
    🔍 ПОДРОБНЕЕ О ПРОЕКТЕ
  </a>

  <!-- ИНСТРУКЦИЯ -->
  <div style="background: rgba(255, 255, 255, 0.6); border-radius: 12px; padding: 0.8rem 1rem; margin-top: 1.5rem; text-align: left; font-size: 0.83rem; color: #5a4a3a; border: 1px dashed #c0b09a;">
    📌 <strong>Как привязать платеж к заявке:</strong><br />
    При оформлении взноса укажите в комментарии ваш <strong>email</strong> или <strong>4 последних символа SHA-256 хеша</strong>. Это обеспечит идентификацию вашего заказа.
  </div>

  <p style="font-size: 0.78rem; color: #7a6a5a; margin-top: 1.2rem; margin-bottom: 0; line-height: 1.35; text-align: center;">
    ⚖️ <strong>Правовой статус транзакции:</strong> Перевод средств является добровольным целевым взносом на развитие TFM Engine и поддержку инфраструктуры вёрстки IMARCH LTD. Данный платёж не является коммерческой покупкой услуги.
  </p>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/" text="Главная CHRONICLE OS" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // Данные из sessionStorage
  var name      = sessionStorage.getItem('mono_name') || 'Не указано';
  var email     = sessionStorage.getItem('mono_email') || 'Не указано';
  var affil     = sessionStorage.getItem('mono_affil') || 'Не указано';
  var title     = sessionStorage.getItem('mono_title') || 'Не указано';
  var abstract  = sessionStorage.getItem('mono_abstract') || 'Не указано';
  var tariff    = sessionStorage.getItem('mono_tariff') || 'basic';
  var hash      = sessionStorage.getItem('mono_hash') || 'NOT_CALCULATED';

  // Тарифы и суммы
  var tariffMap = {
    'basic': { label: 'Базовый (£50)', amount: '£50' },
    'standard': { label: 'Стандарт (£80)', amount: '£80' },
    'premium': { label: 'Премиум (£120)', amount: '£120' }
  };
  var tariffData = tariffMap[tariff] || tariffMap['basic'];

  // Токен
  var token = sessionStorage.getItem('mono_token');
  if (!token) {
    token = 'MONO-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('mono_token', token);
  }

  // Дата
  var today = new Date().toLocaleDateString('ru-RU');

  // Заполнение полей
  if(document.getElementById('lblMonoName'))     document.getElementById('lblMonoName').innerText = name;
  if(document.getElementById('lblMonoEmail'))    document.getElementById('lblMonoEmail').innerText = email;
  if(document.getElementById('lblMonoAffil'))    document.getElementById('lblMonoAffil').innerText = affil;
  if(document.getElementById('lblMonoTitle'))    document.getElementById('lblMonoTitle').innerText = title;
  if(document.getElementById('lblMonoAbstract')) document.getElementById('lblMonoAbstract').innerText = abstract;
  if(document.getElementById('lblMonoTariff'))   document.getElementById('lblMonoTariff').innerText = tariffData.label;
  if(document.getElementById('lblMonoHash'))     document.getElementById('lblMonoHash').innerText = hash;
  if(document.getElementById('lblMonoToken'))    document.getElementById('lblMonoToken').innerText = token;
  if(document.getElementById('lblMonoDate'))     document.getElementById('lblMonoDate').innerText = today;
  if(document.getElementById('lblMonoAmount'))   document.getElementById('lblMonoAmount').innerText = tariffData.amount;

  // Mailto
  var mailtoLink = document.getElementById('monoMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Вёрстка монографии: ' + title + ' (' + name + ')');
    mailtoLink.setAttribute('href', 'mailto:info@imarch.sbs?subject=' + subject);
  }
});

function copyMonographProtocol() {
  var container = document.getElementById('monographProtocolBlock');
  if (!container) return;
  var textToCopy = container.innerText;
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол депонирования монографии скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Выделите текст и нажмите Ctrl+C.');
  });
}
</script>