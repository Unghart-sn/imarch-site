---
title: "Как устроен аккаунт и с чего начать работу за 3 минуты"
date: 2026-06-25
draft: false
tags: ["ecosystem", "strategy", "navigator", "pitchdeck"]
translationKey: "navigator-landing"
description: "Пошаговый гид по личному кабинету: вход по коду, доступ к инвестиционным материалам, Цифровой сейф и работа с публикационными контурами."
---

<style>
.institutional-card {
  background: #fdfaf5;
  border: 1px solid #e0d6c8;
  border-radius: 20px;
  padding: 1.25rem;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
}
.institutional-card:hover {
  transform: translateY(-4px);
  border-color: #b18b56;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}
.institutional-step-card {
  background: #fdfaf5;
  border: 1px solid #e0d6c8;
  border-radius: 20px;
  padding: 1rem;
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.institutional-step-card:hover {
  transform: translateY(-3px);
  border-color: #b18b56;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
}
.institutional-card-title {
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2c2416;
}
.institutional-card-text {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #4a3a2a;
}
.institutional-card-text ul,
.institutional-card-text ol {
  margin: 0.5rem 0 0 1.1rem;
  padding: 0;
}
.institutional-card-text li {
  margin-bottom: 0.35rem;
}
@media (max-width: 640px) {
  .institutional-card, .institutional-step-card {
    cursor: default;
  }
  .institutional-card:hover, .institutional-step-card:hover {
    transform: none;
  }
}
</style>

##### IMARCH LTD · Company No. 16791765 · Англия и Уэльс

---

{{< steel_button link="#presentation" text="Презентация" >}}

---

<div class="imarch-spec fade-in-up">
  <div class="imarch-spec-row">
    <div class="imarch-spec-label">Оператор</div>
    <div class="imarch-spec-value">IMARCH LTD (Company No. 16791765, Англия и Уэльс)</div>
  </div>
  <div class="imarch-spec-row">
    <div class="imarch-spec-label">Инфраструктурный контур</div>
    <div class="imarch-spec-value">Chronicle OS 8888 · Chronicle Communication System (CCS)</div>
  </div>
  <div class="imarch-spec-row">
    <div class="imarch-spec-label">Экспертиза и партнёрство</div>
    <div class="imarch-spec-value">Институт RDIAR · Консорциум PLATAN+ · VERDICTUM</div>
  </div>
  <div class="imarch-spec-row">
    <div class="imarch-spec-label">Правовой режим</div>
    <div class="imarch-spec-value">Действующее право, режимы защиты информации и коммерческой тайны · Лицензия CC BY-NC-ND 4.0</div>
  </div>
</div>

<div class="imarch-devis fade-in-up">Девиз: «Идеи и действия — в устойчивые проекты и работающие сообщества»</div>

---

&nbsp;

<div id="presentation"></div>

{{< r2video
  src="https://pub-8199817aef874bd5bbc783fefd2f38c7.r2.dev/present-1.webm"
  poster="/images/26-08-31-umss-pres-10.jpg"
>}}

{{< navigator-widget
  api_url="https://imarch-navigator.chronosolexandr.workers.dev"
  exp_url="/ru/verdictum/vr-0028/"
>}}

---

Личный кабинет в нашей экосистеме — это не формальная «учётная запись ради галочки», а единый рабочий ключ ко всем закрытым материалам, инструментам криптографической фиксации и публикационным контурам.

Ниже представлен короткий маршрут, который за три минуты объяснит, зачем нужен аккаунт, как в него войти без технических накладок и какой шаг сделать первым.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 1. Зачем нужен аккаунт: три базовые причины { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🔑 Единый доступ без разрозненных ссылок и мессенджеров</div>
    <div class="institutional-card-text">Один профиль открывает доступ к закрытым документам (включая Инвестиционный меморандум), презентационным материалам и рабочим инструментам без пересылки файлов по сторонним чатам.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔐 Персональная криптографическая фиксация</div>
    <div class="institutional-card-text">Любые документы, загруженные артефакты и заявки получают однозначную привязку к субъекту, временную метку и цифровой отпечаток (SHA-256).</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📈 Масштабирование от читателя до оператора ноды</div>
    <div class="institutional-card-text">Аккаунт начинается как персональный кабинет доступа, но при необходимости расширяется до рабочей среды независимого эксперта, редакции журнала или автономной институциональной ноды (университета, профессиональной ассоциации, НКО).</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 2. Как войти за 30 секунд (вход по 6-значному коду) { .fade-in-up }

Мы отказались от «волшебных ссылок» (magic-link), которые часто ломаются при открытии во встроенных браузерах смартфонов или блокируются корпоративными почтовыми фильтрами. Вход построен максимально просто и надёжно:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">1</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Ваш email</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">На странице входа укажите ваш <strong>адрес электронной почты</strong> и нажмите кнопку получения кода.</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">2</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Шесть цифр</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Откройте письмо или посмотрите уведомление на экране: <strong>6-значный цифровой код</strong> указан прямо в теме и первой строке письма (код действует 10 минут).</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">3</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Ввод кода</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Введите эти 6 цифр в окно на той же вкладке браузера — вы сразу окажетесь внутри кабинета, не теряя страницу, с которой начали.</div>
  </div>
</div>

> **Совет для организаций:** если вы представляете университет, фонд или компанию, регистрируйтесь с официального доменного адреса вашей организации — это упростит дальнейшую верификацию статуса.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 3. Что находится внутри: четыре модуля кабинета { .fade-in-up }

После входа перед вами открываются четыре взаимосвязанных контура работы:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">

  <div class="institutional-card">
    <div class="institutional-card-title">👤 Модуль 1. Профиль и статус участника</div>
    <div class="institutional-card-text">Ваша базовая карточка в системе (частное лицо, инвестор/партнёр, независимый эксперт или представитель организации). Корректно заполненный профиль избавляет от повторного ввода данных в заявках и автоматически открывает релевантные разделы.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">💼 Модуль 2. Инвестиционный и партнёрский контур</div>
    <div class="institutional-card-text">
      Закрытая зона для ознакомления с ключевыми материалами проекта:
      <ul>
        <li>полный текст <strong>Инвестиционного меморандума</strong>;</li>
        <li>видеопрезентация архитектуры и принципов работы системы;</li>
        <li>прямой канал запроса условий и обратной связи внутри защищённого периметра.</li>
      </ul>
    </div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🗄️ Модуль 3. Цифровой сейф</div>
    <div class="institutional-card-text">
      Инструмент для фиксации авторства, приоритета и неизменности ваших материалов:
      <ul>
        <li>вы загружаете документ, рукопись, медиафайл или технический пакет;</li>
        <li>система вычисляет его контрольную сумму (SHA-256), фиксирует время и формирует проверяемый сертификат подлинности;</li>
        <li>любой документ в дальнейшем можно проверить на целостность и предъявить как подтверждение приоритета.</li>
      </ul>
    </div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">📚 Модуль 4. Публикационный контур (Журналы и Ноды)</div>
    <div class="institutional-card-text">
      Выход в публичное научное, экспертное или медиапространство через два чётко разделённых режима:
      <ul>
        <li><strong>Ручной (реестровый) журнал</strong> — прямая публикация препринтов, институциональных отчётов, деклараций и авторских мультимедийных артефактов (включая специализированные серии вроде <em>Vis Realitatis</em>) с фиксацией авторства и времени.</li>
        <li><strong>Экспертный журнал</strong> — публикация аналитических и научных работ, прошедших процедуру рецензирования и верификации.</li>
      </ul>
      Материалы, опубликованные в контуре, получают собственную карточку с аннотацией, тегами и прямой ссылкой в общем потоке экосистемы.
    </div>
  </div>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 4. С чего начать прямо сейчас: три готовых маршрута { .fade-in-up }

Чтобы не тратить время на изучение всех кнопок сразу, выберите сценарий под вашу текущую задачу:

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">

  <div class="institutional-card">
    <div class="institutional-card-title">📊 Маршрут А — Для инвестора и стратегического партнёра</div>
    <div class="institutional-card-text">
      <ol>
        <li>Войдите в аккаунт по коду из письма.</li>
        <li>Откройте раздел <strong>Инвестиционного меморандума</strong> и посмотрите <strong>видеопрезентацию</strong> архитектуры.</li>
        <li>При необходимости оставьте прямой запрос на детализацию условий прямо из кабинета.</li>
      </ol>
    </div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">✍️ Маршрут Б — Для автора, исследователя и эксперта</div>
    <div class="institutional-card-text">
      <ol>
        <li>Заполните базовый профиль участника.</li>
        <li>Загрузите тестовый документ в <strong>Цифровой сейф</strong>, чтобы увидеть, как формируется цифровой отпечаток и сертификат фиксации.</li>
        <li>Подготовьте публикацию в <strong>Ручном</strong> или <strong>Экспертном</strong> журнале.</li>
      </ol>
    </div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🏛️ Маршрут В — Для университета, ассоциации или НКО</div>
    <div class="institutional-card-text">
      <ol>
        <li>Зарегистрируйте аккаунт на официальный корпоративный email организации.</li>
        <li>Пройдите базовую верификацию статуса организации.</li>
        <li>Подайте запрос на развёртывание собственной <strong>институциональной ноды</strong> (на выделенном субдомене или на вашей собственной инфраструктуре) с трансляцией аннотаций в общий поток.</li>
      </ol>
    </div>
  </div>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/" text="Главная CHRONICLE OS" margin="1rem 0" >}}
</div>

&nbsp;

{{< persona-socials >}}