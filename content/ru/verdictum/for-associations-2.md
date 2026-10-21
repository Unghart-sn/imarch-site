---
title: "Институциональная верификация — Шаг 2"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-associations-2"
description: "Второй этап подключения ассоциации к VERDICTUM: генерация верификационного токена и дублирование официального запроса."
---

#### ⚡ Первичная заявка успешно зафиксирована в координационном шлюзе { .fade-in-up }

Внутренние системы VERDICTUM забронировали за вашей организацией указанный технологический узел.

&nbsp;

#### 📨 ШАГ 2: Официальное дублирование и верификация по почте { .fade-in-up }

Чтобы исключить комплаенс-риски и подтвердить официальный статус поданной заявки перед британским регистратором, **руководству или уполномоченному лицу ассоциации необходимо продублировать параметры интеграции на наш официальный почтовый шлюз**.

Пожалуйста, **проверьте сгенерированные данные в текстовом блоке ниже**, скопируйте его и отправьте письмо:

*   **Куда отправлять:** `info@imarch.ltd`
*   **Тема письма:** `Институциональное подключение VERDICTUM: [Название вашей ассоциации]`

<!-- БЛОК С АНКЕТОЙ (КОД) -->
<div id="assocAnketaBlock" style="background: #1a1a1a; color: #e0e0e0; padding: 1.5rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; overflow: auto; max-height: 400px; margin-bottom: 0; border: 1px solid #333; white-space: pre-wrap; word-break: break-word;">

========================

ЗАЯВКА НА ИНТЕГРАЦИЮ АССОЦИАЦИИ В РЕЕСТР VERDICTUM

========================

1. СВЕДЕНИЯ ОБ ОРГАНИЗАЦИИ:
   • Наименование ассоциации: <span id="lblAssocName">Загрузка...</span>
   • Выделяемый субдомен: <span id="lblAssocSub">Загрузка...</span>

2. СВЕДЕНИЯ О ПРЕДСТАВИТЕЛЕ:
   • ФИО лица: <span id="lblAssocRep">Загрузка...</span>
   • Рабочий Email: <span id="lblAssocEmail">Загрузка...</span>
   • Канал связи: <span id="lblAssocTel">Загрузка...</span>

3. БЕЗОПАСНОСТЬ И КОМПЛАЕНС (ВРЕМЕННЫЙ ТОКЕН):
   • Идентификатор сессии (Session Token): <span id="lblToken">Генерация...</span>
   • Регламент защиты: UK Trade Secrets Regulations 2018 (SI 2018/597)
   • Правовое основание: Акт RN-0028 от 06.07.2026

Дата отправки протокола: <span id="lblAssocDate">Загрузка...</span>

========================

</div>

&nbsp;

<!-- КНОПКА КОПИРОВАНИЯ -->
<div style="text-align: center; margin: 1rem 0 2rem 0;">
  <button onclick="copyAssocAnketa()" style="background: #b18b56; border: none; color: white; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 14px rgba(177,139,86,0.3);">
    📋 Скопировать протокол заявки в буфер обмена
  </button>
</div>

<div align="center">
  <a id="assocMailtoLink" href="mailto:info@imarch.ltd">
    <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
  </a>
</div>

&nbsp;

#### 📜 Что происходит дальше? { .fade-in-up }

После получения и сопоставления хэш-данных вашего письма с забронированной транзакцией в координационном шлюзе администратора, на ваш официальный адрес будет выслан базовый пакет юридических документов: проект Меморандума о сотрудничестве и модель финансового комплаенса.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="Главная VERDICTUM" margin="1rem 0" >}}
</div>

<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function() {
  // 1. Вытаскиваем данные из сессии, которые сохранились на Шаге 1
  var name = sessionStorage.getItem('assoc_name') || 'Не указано';
  var sub  = sessionStorage.getItem('assoc_subdomain') || 'Не указано';
  var rep  = sessionStorage.getItem('assoc_rep') || 'Не указано';
  var email= sessionStorage.getItem('assoc_email') || 'Не указано';
  var tel  = sessionStorage.getItem('assoc_telegram') || 'Не указано';
  var token= sessionStorage.getItem('assoc_token') || 'VD-ASSOC-NOTOKEN-0000';

  // 2. Вставляем их в соответствующие спаны на странице
  if(document.getElementById('lblAssocName'))  document.getElementById('lblAssocName').innerText = name;
  if(document.getElementById('lblAssocSub'))   document.getElementById('lblAssocSub').innerText = sub;
  if(document.getElementById('lblAssocRep'))   document.getElementById('lblAssocRep').innerText = rep;
  if(document.getElementById('lblAssocEmail')) document.getElementById('lblAssocEmail').innerText = email;
  if(document.getElementById('lblAssocTel'))   document.getElementById('lblAssocTel').innerText = tel;
  if(document.getElementById('lblToken'))      document.getElementById('lblToken').innerText = token;
  if(document.getElementById('lblAssocDate'))  document.getElementById('lblAssocDate').innerText = new Date().toLocaleDateString('ru-RU');

  // 3. Динамическая ссылка mailto
  var mailtoLink = document.getElementById('assocMailtoLink');
  if (mailtoLink) {
    var subject = encodeURIComponent('Институциональное подключение VERDICTUM: ' + name);
    mailtoLink.setAttribute('href', 'mailto:info@imarch.ltd?subject=' + subject);
  }
});

// Функция копирования
function copyAssocAnketa() {
  var container = document.getElementById('assocAnketaBlock');
  if (!container) return;
  
  var textToCopy = container.innerText;
  
  navigator.clipboard.writeText(textToCopy).then(function() {
    alert('Протокол заявки успешно скопирован в буфер обмена!');
  }).catch(function(err) {
    console.error('Ошибка копирования: ', err);
    alert('Не удалось скопировать автоматически. Пожалуйста, выделите текст в рамке и нажмите Ctrl+C.');
  });
}
</script>