---
title: "Інституційна верифікація — Крок 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-associations-2"
description: "Другий етап підключення асоціації до VERDICTUM: генерування верифікаційного токена та дублювання офіційного запиту."
---

#### ⚡ Первинну заявку успішно зафіксовано в координаційному шлюзі { .fade-in-up }

Внутрішні системи VERDICTUM забронювали за вашою організацією зазначений технологічний вузол.

&nbsp;

#### 📨 КРОК 2: Офіційне дублювання та верифікація поштою { .fade-in-up }

Щоб виключити комплаєнс-ризики та підтвердити офіційний статус поданої заявки перед британським реєстратором, **керівництву або уповноваженій особі асоціації необхідно продублювати параметри інтеграції на наш офіційний поштовий шлюз**.

Будь ласка, **перевірте згенеровані дані в текстовому блоці нижче**, скопіюйте його та надішліть листа:

*   **Куди надсилати:** `info@imarch.ltd`
*   **Тема листа:** `Інституційне підключення VERDICTUM: [Назва вашої асоціації]`

<!-- БЛОК З АНКЕТОЮ (КОД) -->
<div id="assocAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 400px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА НА ІНТЕГРАЦІЮ АСОЦІАЦІЇ В РЕЄСТР VERDICTUM

========================

1. ВІДОМОСТІ ПРО ОРГАНІЗАЦІЮ:
   • Найменування асоціації: <span id="lblAssocName">Завантаження...</span>
   • Виділюваний субдомен: <span id="lblAssocSub">Завантаження...</span>

2. ВІДОМОСТІ ПРО ПРЕДСТАВНИКА:
   • ПІБ особи: <span id="lblAssocRep">Завантаження...</span>
   • Робочий Email: <span id="lblAssocEmail">Завантаження...</span>
   • Канал зв'язку: <span id="lblAssocTel">Завантаження...</span>

3. БЕЗПЕКА ТА КОМПЛАЄНС (ТИМЧАСОВИЙ ТОКЕН):
   • Ідентифікатор сесії (Session Token): <span id="lblToken">Генерування...</span>
   • Регламент захисту: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Правова підстава: Акт RN-0028 від 06.07.2026

Дата надсилання протоколу: <span id="lblAssocDate">Завантаження...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПІЮВАННЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyAssocAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопіювати протокол заявки до буфера обміну
  </button>
</div>

<div align="center">
  <a id="assocMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Що відбувається далі? { .fade-in-up }

Після отримання та зіставлення хеш-даних вашого листа із заброньованою транзакцією в координаційному шлюзі адміністратора на вашу офіційну адресу буде надіслано базовий пакет юридичних документів: проєкт Меморандуму про співпрацю та модель фінансового комплаєнсу.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="Головна VERDICTUM" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Витягуємо дані із сесії, які збереглися на Кроці 1
  var name = sessionStorage.getItem('assoc_name') || 'Не вказано';
  var sub  = sessionStorage.getItem('assoc_subdomain') || 'Не вказано';
  var rep  = sessionStorage.getItem('assoc_rep') || 'Не вказано';
  var email= sessionStorage.getItem('assoc_email') || 'Не вказано';
  var tel  = sessionStorage.getItem('assoc_telegram') || 'Не вказано';
  var token= sessionStorage.getItem('assoc_token') || 'VD-ASSOC-NOTOKEN-0000';

  // 2. Вставляємо їх у відповідні спани на сторінці
  if(document.getElementById('lblAssocName'))  document.getElementById('lblAssocName').innerText = name;
  if(document.getElementById('lblAssocSub'))   document.getElementById('lblAssocSub').innerText = sub;
  if(document.getElementById('lblAssocRep'))   document.getElementById('lblAssocRep').innerText = rep;
  if(document.getElementById('lblAssocEmail')) document.getElementById('lblAssocEmail').innerText = email;
  if(document.getElementById('lblAssocTel'))   document.getElementById('lblAssocTel').innerText = tel;
  if(document.getElementById('lblToken'))      document.getElementById('lblToken').innerText = token;
  if(document.getElementById('lblAssocDate'))  document.getElementById('lblAssocDate').innerText = new Date().toLocaleDateString('ru-RU');

  // 3. Динамічне посилання mailto
  var mailtoLink = document.getElementById('assocMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Інституційне підключення VERDICTUM: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Функція копіювання
function copyAssocAnketa() {
  var container = document.getElementById('assocAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол заявки успішно скопійовано до буфера обміну!');
  }).catch(function(err) {
    console.error('Помилка копіювання: ', err);
    alert('Не вдалося скопіювати автоматично. Будь ласка, виділіть текст у рамці та натисніть Ctrl+C.');
  });
}
</script>