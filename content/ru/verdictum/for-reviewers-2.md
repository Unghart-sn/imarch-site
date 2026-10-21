---
title: "Регистрация рецензента — Шаг 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-reviewers-2"
description: "Второй этап регистрации экспертного рецензента в сети VERDICTUM: верификация и дублирование данных."
---

#### ⚡ Заявка экспертного рецензента зафиксирована { .fade-in-up }

Данные вашей анкеты переданы в координационный шлюз Expert Reviewer Network VERDICTUM (RN-0031).

&nbsp;

#### 📨 ШАГ 2: Подтверждение и отправка протокола по почте { .fade-in-up }

Чтобы завершить процедуру верификации и подтвердить квалификацию перед регистратором IMARCH LTD, **проверьте сгенерированный протокол заявки ниже, скопируйте его и отправьте на наш официальный почтовый шлюз**.

Пожалуйста, проверьте данные, скопируйте их и отправьте письмо:

*   **Куда отправлять:** `info@imarch.ltd`
*   **Тема письма:** `Заявка рецензента VERDICTUM: [Ваше ФИО]`

<!-- БЛОК С АНКЕТОЙ (КОД) -->
<div id="reviewerAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 420px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА ЭКСПЕРТНОГО РЕЦЕНЗЕНТА (RN-0031 / VERDICTUM)

========================

1. ЛИЧНЫЕ И СВЯЗНЫЕ ДАННЫЕ:
   • ФИО эксперта: <span id="lblRevName">Загрузка...</span>
   • Рабочий Email: <span id="lblRevEmail">Загрузка...</span>
   • Канал связи: <span id="lblRevTel">Загрузка...</span>

2. ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ:
   • Квалификация и организация: <span id="lblRevDegree">Загрузка...</span>
   • Цифровые идентификаторы (ORCID/Scopus): <span id="lblRevIds">Загрузка...</span>
   • Направление экспертизы: <span id="lblRevDirection">Загрузка...</span>

3. ПЛАТЕЖНЫЕ РЕКВИЗИТЫ:
   • Карта / IBAN: <span id="lblRevCard">Загрузка...</span>
   • Крипто-кошелёк (USDT): <span id="lblRevCrypto">Загрузка...</span>

4. БЕЗОПАСНОСТЬ И КОМПЛАЕНС:
   • Идентификатор сессии (Token): <span id="lblRevToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Правовое основание: Акт RN-0028 от 06.07.2026

Дата формирования протокола: <span id="lblRevDate">Загрузка...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyReviewerAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол заявки в буфер обмена
  </button>
</div>

<p style="font-size: 0.85rem; color: #a0a0a0; text-align: center; margin: 0.75rem 0; line-height: 1.4;">
  Откройте ваш почтовый сервис и вставьте скопированный текст в письмо.
</p>

<div align="center">
  <a id="revMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Что происходит дальше? { .fade-in-up }

После сверки вашего цифрового профиля (ORCID / Scopus) и регистрации протокола заявки, вам будет выслано официальное подтверждение о включении в **Expert Reviewer Network VERDICTUM**, а также доступ к первому пулу материалов для рецензирования.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="Главная VERDICTUM" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Считываем данные из sessionStorage
  var name      = sessionStorage.getItem('rev_name') || 'Не указано';
  var email     = sessionStorage.getItem('rev_email') || 'Не указано';
  var tel       = sessionStorage.getItem('rev_telegram') || 'Не указано';
  var degree    = sessionStorage.getItem('rev_degree') || 'Не указано';
  var ids       = sessionStorage.getItem('rev_identifiers') || 'Не указано';
  var direction = sessionStorage.getItem('rev_direction') || 'Не указано';
  var card      = sessionStorage.getItem('rev_card') || 'Не указано';
  var crypto    = sessionStorage.getItem('rev_crypto') || 'Не указано';
  
  // 2. Генерация токена
  var token = sessionStorage.getItem('rev_token');
  if (!token) {
    token = 'VD-REV-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    sessionStorage.setItem('rev_token', token);
  }

  // 3. Форматирование текущей даты
  var today = new Date().toLocaleDateString('ru-RU');

  // 4. Подстановка значений
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

  // 5. Динамическая ссылка mailto
  var mailtoLink = document.getElementById('revMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Заявка рецензента VERDICTUM: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Функция копирования
function copyReviewerAnketa() {
  var container = document.getElementById('reviewerAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол заявки рецензента успешно скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Выделите текст и нажмите Ctrl+C.');
  });
}
</script>