---
title: "Депонування статті — Крок 2"
date: 2026-07-31
draft: false
type: "landing"
layout: "institutional"
translationKey: "student-concept-pitchdeck-2"
description: "Другий етап подання статті: криптографічна фіксація SHA-256, отримання протоколу та внесення оргвнеску £50 на підтримку інфраструктури."
---

#### 🛡️ Заявку та SHA-256 хеші зафіксовано { .fade-in-up }

Протокол первинної фіксації вашого рукопису успішно сформовано у шлюзі IMARCH Chronicle OS (RN-0030).

&nbsp;

#### 💳 КРОК 2: Підтримка інфраструктури та надсилання протоколу { .fade-in-up }

Для передачі «Сліпого вектора» до контуру подвійного сліпого рецензування (Double-Blind) та активації захисту пріоритету необхідно:

1. **Скопіювати офіційний протокол** депонування нижче.
2. **Внести цільовий реєстраційний внесок £50** на підтримку інфраструктури рецензування.
3. **Надіслати копію протоколу** та файли публікації на наш офіційний поштовий шлюз `info@imarch.sbs`.

Пріоритетне розміщення та рецензування вашої статті є гарантованим бонусом (Reward / Perk) для донорів та меценатів, які підтримують розвиток некомерційної інфраструктури IMARCH Chronicle OS.

<!-- БЛОК З ПРОТОКОЛОМ АВТОРА (КОД) -->
<div id="authorAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================================================

ПРОТОКОЛ КРИПТОГРАФІЧНОГО ДЕПОНУВАННЯ (RN-0030 / CHRONICLE OS)

========================================================

1. РЕКВІЗИТИ АВТОРА ТА АФІЛІАЦІЯ:
   • Автор: <span id="lblAuthName">Завантаження...</span>
   • Email: <span id="lblAuthEmail">Завантаження...</span>
   • ЗВО / Організація: <span id="lblAuthAffil">Завантаження...</span>
   • ORCID iD: <span id="lblAuthOrcid">Завантаження...</span>

2. МЕТАДАНІ ПУБЛІКАЦІЇ:
   • Назва: <span id="lblAuthTitle">Завантаження...</span>
   • Анотація: <span id="lblAuthAbstract">Завантаження...</span>

3. КРИПТОГРАФІЧНІ ЦИФРОВІ ВІДБИТКИ (SHA-256):
   • Master-Vector Hash: <span id="lblHashMaster">Завантаження...</span>
   • Blind-Vector Hash:  <span id="lblHashBlind">Завантаження...</span>

4. СТАТУС ТА КОМПЛАЄНС:
   • Сесійний токен: <span id="lblAuthToken">Генерація...</span>
   • Регламент захисту: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Статус оргвнеску (APC / Grant £50): ОЧІКУЄ ПІДТВЕРДЖЕННЯ (Grant Support / WhyDonate)

Дата депонування: <span id="lblAuthDate">Завантаження...</span>

========================================================

</div>

&nbsp;

<!-- КНОПКА КОПІЮВАННЯ -->
<div style="text-align: center; margin: 1rem 0 0.5rem 0;">
  <button onclick="copyAuthorAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопіювати протокол депонування до буфера обміну
  </button>
</div>

<!-- МІКРОТЕКСТ-ПІДКАЗКА -->
<p style="font-size: 0.85rem; color: #7a6a5a; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Відкрийте ваш поштовий сервіс і вставте скопійований текст у лист. Також прикріпіть обидва файли (Мастер-файл та Сліпий вектор) до листа.
</p>

<!-- ІКОНКА ПОШТИ -->
<div align="center" style="margin-top: 0.5rem;">
  <a id="authMailtoLink" href="mailto:info@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<!-- ===== КАРТКА ВНЕСЕННЯ ДЕПОЗИТУ (ПЛОСКА АРХІТЕКТУРА ДЛЯ HUGO) ===== -->
<div style="background: linear-gradient(145deg, #f8f3ec, #eee8df); border: 1.5px solid #c0b09a; border-radius: 20px; padding: clamp(1rem, 4vw, 2rem); margin: 2rem auto; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.04); max-width: 100%; box-sizing: border-box;">
  
  <span style="font-size: clamp(2rem, 6vw, 3rem); display: block; margin-bottom: 0.5rem;">💳</span>
  
  <div style="font-size: clamp(1.2rem, 4vw, 1.6rem); font-weight: 800; color: #2c2416; margin-bottom: 0.5rem; word-wrap: break-word;">
    ВНЕСЕННЯ РЕЄСТРАЦІЙНОГО ДЕПОЗИТУ
  </div>
  
  <p style="font-size: clamp(0.9rem, 2.5vw, 1rem); color: #4a3a2a; margin-bottom: 1.25rem; line-height: 1.5;">
    <strong>Цільовий реєстраційний внесок:</strong> <em style="font-size: 1.1em; color: #8b6b3e;">£50</em><br />
    <small style="font-size: 0.85em; opacity: 0.85;">(Активація 7-денного регламенту рецензування та фіксація лоту)</small>
  </p>

  <!-- Кнопка 1: Прямий перехід на донат -->
  <a href="https://whydonate.com/fundraising/vis-realitatis-preserving-memory" target="_blank" rel="noopener" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #b18b56; color: #ffffff; font-weight: 700; padding: 0.85rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; box-shadow: 0 2px 8px rgba(177,139,86,0.3);">
    💳 Внести £50 на WhyDonate
  </a>

  <!-- Кнопка 2: Проєкт VIS REALITATIS -->
  <a href="/uk/docs/ludus/" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #2c2416; color: #f8f3ec; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; font-size: 0.9rem;">
    🔍 ДЕТАЛЬНІШЕ ПРО VIS REALITATIS
  </a>

  <!-- Кнопка 3: Перегляд бонусного лоту -->
  <a href="/uk/docs/consilium/public/" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: transparent; border: 1.5px solid #b18b56; color: #4a3a2a; font-weight: 600; padding: 0.7rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; font-size: 0.88rem;">
    🎁 БОНУСНИЙ ЛОТ: CBB-0002
  </a>

  <!-- ІНСТРУКЦІЯ З ВЕРИФІКАЦІЇ -->
  <div style="background: rgba(255, 255, 255, 0.6); border-radius: 12px; padding: 0.8rem 1rem; margin-top: 1.5rem; text-align: left; font-size: 0.83rem; color: #5a4a3a; border: 1px dashed #c0b09a;">
    📌 <strong>Як прив'язати платіж до заявки:</strong><br />
    Під час оформлення внеску на WhyDonate або в примітці форми зазначте ваш <strong>e-mail</strong>, <strong>4 останні символи SHA-256 хешу</strong> рукопису (або код бонусного лоту, наприклад: <code>CBB-0002</code>). Це забезпечить автоматичну наскрізну верифікацію в реєстрі.
  </div>

  <!-- ЮРИДИЧНИЙ ДИСКЛЕЙМЕР -->
  <p style="font-size: 0.78rem; color: #7a6a5a; margin-top: 1.2rem; margin-bottom: 0; line-height: 1.35; text-align: center;">
    ⚖️ <strong>Правовий статус транзакції:</strong> Переказ коштів є добровільним цільовим грантом/внеском на розвиток екосистеми та підтримку регламенту рецензування IMARCH LTD (UK Trade Secrets Regulations / VERDICTUM), що є частиною проєкту реноваційного центру для ветеранів Vis Realitatis. Цей платіж не є комерційною покупкою товару або комерційною послугою.
  </p>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/uk/" text="Головна CHRONICLE OS" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Зчитуємо дані з sessionStorage
  var name      = sessionStorage.getItem('pub_author_name') || 'Не вказано';
  var email     = sessionStorage.getItem('pub_author_email') || 'Не вказано';
  var affil     = sessionStorage.getItem('pub_author_affil') || 'Не вказано';
  var orcid     = sessionStorage.getItem('pub_author_orcid') || 'Не вказано';
  var title     = sessionStorage.getItem('pub_title') || 'Не вказано';
  var abstract  = sessionStorage.getItem('pub_abstract') || 'Не вказано';
  var hashM     = sessionStorage.getItem('pub_hash_master') || 'NOT_CALCULATED';
  var hashB     = sessionStorage.getItem('pub_hash_blind') || 'NOT_CALCULATED';
  
  // 2. Токен автора
  var token = sessionStorage.getItem('pub_author_token');
  if (!token) {
    token = 'AUTH-SHA-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('pub_author_token', token);
  }

  // 3. Дата
  var today = new Date().toLocaleDateString('uk-UA');

  // 4. Заповнення полів
  if(document.getElementById('lblAuthName'))     document.getElementById('lblAuthName').innerText = name;
  if(document.getElementById('lblAuthEmail'))    document.getElementById('lblAuthEmail').innerText = email;
  if(document.getElementById('lblAuthAffil'))    document.getElementById('lblAuthAffil').innerText = affil;
  if(document.getElementById('lblAuthOrcid'))    document.getElementById('lblAuthOrcid').innerText = orcid;
  if(document.getElementById('lblAuthTitle'))    document.getElementById('lblAuthTitle').innerText = title;
  if(document.getElementById('lblAuthAbstract')) document.getElementById('lblAuthAbstract').innerText = abstract;
  if(document.getElementById('lblHashMaster'))   document.getElementById('lblHashMaster').innerText = hashM;
  if(document.getElementById('lblHashBlind'))    document.getElementById('lblHashBlind').innerText = hashB;
  if(document.getElementById('lblAuthToken'))    document.getElementById('lblAuthToken').innerText = token;
  if(document.getElementById('lblAuthDate'))     document.getElementById('lblAuthDate').innerText = today;

  // 5. Dynamic Mailto
  var mailtoLink = document.getElementById('authMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Протокол депонування статті: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.sbs?subject=' + subject);
  }
});

// Копіювання
function copyAuthorAnketa() {
  var container = document.getElementById('authorAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол депонування статті скопійовано до буфера обміну!');
  }).catch(function(err) {
    console.error('Помилка копіювання: ', err);
    alert('Не вдалося скопіювати автоматично. Виділіть текст і натисніть Ctrl+C.');
  });
}
</script>