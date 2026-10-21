---
title: "Депонирование статьи — Шаг 2"
date: 2026-07-31
draft: false
type: "landing"
layout: "institutional"
translationKey: "student-concept-pitchdeck-2"
description: "Второй этап подачи статьи: криптографическая фиксация SHA-256, получение протокола и внесение оргвзноса £50 на поддержку инфраструктуры."
---

#### 🛡️ Заявка и SHA-256 хеши зафиксированы { .fade-in-up }

Протокол первичной фиксации вашей рукописи успешно сформирован в шлюзе IMARCH Chronicle OS (RN-0030).

&nbsp;

#### 💳 ШАГ 2: Поддержка инфраструктуры и отправка протокола { .fade-in-up }

Для передачи «Слепого вектора» в контур Double-Blind рецензирования и активации защиты приоритета необходимо:

1. **Скопировать официальный протокол** депонирования ниже.
2. **Внести целевой регистрационный взнос £50** на поддержку инфраструктуры рецензирования.
3. **Отправить копию протокола** и файлы публикации на наш официальный почтовый шлюз `info@imarch.sbs`.

Приоритетное размещение и рецензирование вашей статьи является гарантированным бонусом (Reward / Perk) для доноров и меценатов, поддерживающих развитие некоммерческой инфраструктуры IMARCH Chronicle OS.

<!-- БЛОК С ПРОТОКОЛОМ АВТОРА (КОД) -->
<div id="authorAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 460px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================================================

ПРОТОКОЛ КРИПТОГРАФИЧЕСКОГО ДЕПОНИРОВАНИЯ (RN-0030 / CHRONICLE OS)

========================================================

1. РЕКВИЗИТЫ АВТОРА И АФФИЛИАЦИЯ:
   • Автор: <span id="lblAuthName">Загрузка...</span>
   • Email: <span id="lblAuthEmail">Загрузка...</span>
   • ВУЗ / Организация: <span id="lblAuthAffil">Загрузка...</span>
   • ORCID iD: <span id="lblAuthOrcid">Загрузка...</span>

2. МЕТАДАННЫЕ ПУБЛИКАЦИИ:
   • Название: <span id="lblAuthTitle">Загрузка...</span>
   • Аннотация: <span id="lblAuthAbstract">Загрузка...</span>

3. КРИПТОГРАФИЧЕСКИЕ ЦИФРОВЫЕ ОТПЕЧАТКИ (SHA-256):
   • Master-Vector Hash: <span id="lblHashMaster">Загрузка...</span>
   • Blind-Vector Hash:  <span id="lblHashBlind">Загрузка...</span>

4. СТАТУС И КОМПЛАЕНС:
   • Сессионный токен: <span id="lblAuthToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Статус оргвзноса (APC / Grant £50): ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ (Grant Support / WhyDonate)

Дата депонирования: <span id="lblAuthDate">Загрузка...</span>

========================================================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 0.5rem 0;">
  <button onclick="copyAuthorAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол депонирования в буфер обмена
  </button>
</div>

<!-- МИКРОТЕКСТ-ПОДСКАЗКА -->
<p style="font-size: 0.85rem; color: #7a6a5a; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Откройте ваш почтовый сервис и вставьте скопированный текст в письмо. А также прикрепите оба файла (Мастер-файл и Слепой вектор) в прикреплённые файлы письма.
</p>

<!-- ИКОНКА ПОЧТЫ -->
<div align="center" style="margin-top: 0.5rem;">
  <a id="authMailtoLink" href="mailto:info@imarch.sbs">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<!-- ===== КАРТОЧКА ВНЕСЕНИЯ ДЕПОЗИТА (ПЛОСКАЯ АРХИТЕКТУРА ДЛЯ HUGO) ===== -->
<div style="background: linear-gradient(145deg, #f8f3ec, #eee8df); border: 1.5px solid #c0b09a; border-radius: 20px; padding: clamp(1rem, 4vw, 2rem); margin: 2rem auto; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.04); max-width: 100%; box-sizing: border-box;">
  
  <span style="font-size: clamp(2rem, 6vw, 3rem); display: block; margin-bottom: 0.5rem;">💳</span>
  
  <div style="font-size: clamp(1.2rem, 4vw, 1.6rem); font-weight: 800; color: #2c2416; margin-bottom: 0.5rem; word-wrap: break-word;">
    ВНЕСЕНИЕ РЕГИСТРАЦИОННОГО ДЕПОЗИТА
  </div>
  
  <p style="font-size: clamp(0.9rem, 2.5vw, 1rem); color: #4a3a2a; margin-bottom: 1.25rem; line-height: 1.5;">
    <strong>Целевой регистрационный взнос:</strong> <em style="font-size: 1.1em; color: #8b6b3e;">£50</em><br />
    <small style="font-size: 0.85em; opacity: 0.85;">(Активация 7-дневного регламента рецензирования и фиксация лота)</small>
  </p>

  <!-- Кнопка 1: Прямой переход на донат -->
  <a href="https://whydonate.com/fundraising/vis-realitatis-preserving-memory" target="_blank" rel="noopener" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #b18b56; color: #ffffff; font-weight: 700; padding: 0.85rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; box-shadow: 0 2px 8px rgba(177,139,86,0.3);">
    💳 Внести £50 на WhuDonate
  </a>

  <!-- Кнопка 2: Проект Vis Realitis -->
  <a href="/ru/docs/ludus/" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: #2c2416; color: #f8f3ec; font-weight: 600; padding: 0.75rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; font-size: 0.9rem;">
    🔍 ПОДРОБНЕЕ О VIS REALITIS
  </a>

  <!-- Кнопка 3: Просмотр бонусного лота -->
  <a href="/ru/docs/consilium/public/" style="display: block; width: 100%; max-width: 360px; margin: 0.75rem auto; background: transparent; border: 1.5px solid #b18b56; color: #4a3a2a; font-weight: 600; padding: 0.7rem 1.5rem; border-radius: 40px; text-decoration: none; box-sizing: border-box; font-size: 0.88rem;">
    🎁 БОНУСНЫЙ ЛОТ: CBB-0002
  </a>

  <!-- ИНСТРУКЦИЯ ПО ВЕРИФИКАЦИИ -->
  <div style="background: rgba(255, 255, 255, 0.6); border-radius: 12px; padding: 0.8rem 1rem; margin-top: 1.5rem; text-align: left; font-size: 0.83rem; color: #5a4a3a; border: 1px dashed #c0b09a;">
    📌 <strong>Как привязать платеж к заявке:</strong><br />
    При оформлении взноса на WhyDonate или в примечании формы укажите ваш <strong>e-mail</strong>, <strong>4 последних символа SHA-256 хеша</strong> рукописи (или код бонусного лота, например: <code>CBB-0002</code>). Это обеспечит автоматическую сквозную верификацию в реестре.
  </div>

  <!-- ЮРИДИЧЕСКИЙ ДИСКЛЕЙМЕР -->
  <p style="font-size: 0.78rem; color: #7a6a5a; margin-top: 1.2rem; margin-bottom: 0; line-height: 1.35; text-align: center;">
    ⚖️ <strong>Правовой статус транзакции:</strong> Перевод средств является добровольным целевым грантом/взносом на развитие экосистемы и поддержку регламента рецензирования IMARCH LTD (UK Trade Secrets Regulations / VERDICTUM), являющегося частью проекта реновационного центра для ветеранов Vis Realitis. Данный платёж не является коммерческой покупкой товара или коммерческой услугой.
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
  // 1. Считываем данные из sessionStorage
  var name      = sessionStorage.getItem('pub_author_name') || 'Не указано';
  var email     = sessionStorage.getItem('pub_author_email') || 'Не указано';
  var affil     = sessionStorage.getItem('pub_author_affil') || 'Не указано';
  var orcid     = sessionStorage.getItem('pub_author_orcid') || 'Не указано';
  var title     = sessionStorage.getItem('pub_title') || 'Не указано';
  var abstract  = sessionStorage.getItem('pub_abstract') || 'Не указано';
  var hashM     = sessionStorage.getItem('pub_hash_master') || 'NOT_CALCULATED';
  var hashB     = sessionStorage.getItem('pub_hash_blind') || 'NOT_CALCULATED';
  
  // 2. Токен авторов
  var token = sessionStorage.getItem('pub_author_token');
  if (!token) {
    token = 'AUTH-SHA-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('pub_author_token', token);
  }

  // 3. Дата
  var today = new Date().toLocaleDateString('ru-RU');

  // 4. Заполнение полей
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
    var subject = encodeURIComponent('Протокол депонирования статьи: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.sbs?subject=' + subject);
  }
});

// Копирование
function copyAuthorAnketa() {
  var container = document.getElementById('authorAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол депонирования статьи скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Выделите текст и нажмите Ctrl+C.');
  });
}
</script>