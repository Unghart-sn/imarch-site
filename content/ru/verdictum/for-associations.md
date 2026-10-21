---
title: "VERDICTUM — Ассоциациям"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-associations"
tags: ["verdictum", "associations", "partnership", "chronicle-os"]
description: "Протокол подключения профессиональных ассоциаций, научных обществ и экспертных сообществ к исследовательской экосистеме VERDICTUM. Institutional Pack, финансовая модель и этапы интеграции."
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
.imarch-form-container {
  max-width: 650px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: #fdfbf7;
  border: 1px solid #e6dfd3;
  border-radius: 24px;
  font-family: inherit;
  box-shadow: 0 4px 20px rgba(0,0,0,0.02);
}
.form-title {
  margin-top: 0;
  font-size: 1.4rem;
  letter-spacing: 1px;
  color: #2b2b2b;
  text-align: center;
}
.form-subtitle {
  font-size: 0.9rem;
  color: #7a7469;
  text-align: center;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4a453e;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #d3c9b8;
  border-radius: 12px;
  background: #fff;
  font-size: 1rem;
  color: #333;
  transition: all 0.2s ease;
  box-sizing: border-box;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #4b2e2e;
  box-shadow: 0 0 0 3px rgba(75, 46, 46, 0.1);
}
.subdomain-input-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #d3c9b8;
  border-radius: 12px;
  overflow: hidden;
}
.subdomain-input-wrapper input {
  border: none;
  border-radius: 0;
}
.subdomain-addon {
  background: #e8e0d4;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  color: #4a3a2a;
  font-weight: 600;
  border-left: 1px solid #d3c9b8;
  white-space: nowrap;
}
.form-checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 2rem 0;
}
.form-checkbox-group input {
  margin-top: 0.2rem;
  width: 18px;
  height: 18px;
  accent-color: #4b2e2e;
}
.form-checkbox-group label {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #5a5449;
}
.form-submit-btn {
  width: 100%;
  padding: 1rem;
  background: #4b2e2e;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.form-submit-btn:hover {
  background: #362121;
}
@media (max-width: 640px) {
  .institutional-card, .institutional-step-card {
    cursor: default;
  }
  .institutional-card:hover, .institutional-step-card:hover {
    transform: none;
  }
  .imarch-form-container {
    padding: 1.2rem !important;
    margin: 1rem 0 !important;
    max-width: 100% !important;
  }
  .subdomain-input-wrapper {
    flex-wrap: wrap !important;
    border: 1px solid #d3c9b8;
    border-radius: 12px;
    overflow: hidden;
  }
  .subdomain-input-wrapper input {
    width: 100% !important;
    border-radius: 12px 12px 0 0 !important;
    border-bottom: 1px solid #d3c9b8;
  }
  .subdomain-addon {
    width: 100% !important;
    text-align: center;
    border-left: none !important;
    background: #f0ece4;
    padding: 0.6rem 1rem !important;
    border-radius: 0 0 12px 12px !important;
  }
  .form-title {
    font-size: 1.1rem !important;
  }
  .form-subtitle {
    font-size: 0.8rem !important;
  }
  .form-group label {
    font-size: 0.8rem !important;
  }
  .form-group input, .form-group select {
    font-size: 0.9rem !important;
    padding: 0.6rem 0.8rem !important;
  }
  .form-submit-btn {
    font-size: 0.85rem !important;
    padding: 0.8rem !important;
    white-space: normal !important;
    word-wrap: break-word !important;
  }
  .form-checkbox-group label {
    font-size: 0.8rem !important;
  }
}
</style>

### Протокол подключения профессиональных ассоциаций и научных обществ к исследовательской экосистеме VERDICTUM { .fade-in-up }

{{< square-image 
     src="/images/verdictum/for-associations.webp" 
     alt="VERDICTUM — Институциональное партнерство"
     class="fade-in-up" >}}

#### Институциональное Научное Крыло: новая архитектура для суверенного знания

IMARCH LTD предлагает профессиональным ассоциациям, научным обществам и экспертным сообществам принципиально иную модель интеграции в международное исследовательское пространство — **Институциональное Научное Крыло (Офис-сайт)** на базе отказоустойчивой платформы VERDICTUM.

В отличие от стандартных решений, требующих либо полного погружения в чужие платформы, либо содержания дорогостоящей IT-инфраструктуры, наш протокол обеспечивает **полную автономию бренда** и **одновременную интеграцию в глобальный экспертный трафик**.

---

{{< verdictum/navigator-0001-uk >}}

---

{{< steel_button link="#assocRegistrationForm" text="Заполнить форму подключения" margin="1rem 0" >}}

{{< steel_button link="/ru/verdictum/vd-0006/" text="Полный текст RN-0034" >}}

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Как это работает: архитектурная логистика { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🌐 Локальный контур (Фронтенд)</div>
    <div class="institutional-card-text">Ассоциация получает выделенный субдомен (например, `assoc.imarch.ltd`) с полным брендированием. Здесь размещаются официальная символика, реестры членов и полные тексты публикаций. Вы полностью контролируете внутреннюю повестку.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📡 Международный распределительный хаб</div>
    <div class="institutional-card-text">На центральной платформе IMARCH (Лондон, Великобритания) публикуются цифровые тизеры: аннотации, ключевые слова, выводы, верифицированные профили ORCID. Это точка входа для зарубежных экспертов и поисковых систем.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔗 Глобальный трафик</div>
    <div class="institutional-card-text">Зарубежные исследователи находят материал на хабе IMARCH и бесшовно переходят на ваш субдомен для ознакомления с полной версией. Вы получаете прямой канал целевого международного трафика.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Что включает Institutional Pack { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🏛️ Единый верификационный контур</div>
    <div class="institutional-card-text">Создаётся институциональная среда верификации членов ассоциации. Каждый участник получает персональный цифровой профиль (Actor ID), связанный с ассоциацией и его профессиональной структурой.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📄 Публикационная программа</div>
    <div class="institutional-card-text">Ассоциация получает возможность централизованного размещения материалов в издательской среде VERDICTUM Journal с поддержкой депонирования, регистрации DOI и криптографической фиксации приоритета.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔬 Инфраструктура цифрового моделирования</div>
    <div class="institutional-card-text">Партнёрам предоставляется доступ к пилотным возможностям прикладного хаба Vis Realitatis для моделирования исследовательских, образовательных и управленческих сценариев.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">⚙️ Суверенный документооборот</div>
    <div class="institutional-card-text">Гибридный контур обработки заявок без использования платных коммерческих API (ноу-хау RN-0032). Все данные остаются под вашим контролем, каждая заявка фиксируется в неизменяемом реестре VERDICTUM.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

#### Почему это важно для ассоциации { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🎓 Международная интеграция</div>
    <div class="institutional-card-text">Участие в формировании новой исследовательской инфраструктуры, развиваемой в британской юрисдикции совместно с академическими и отраслевыми партнёрами.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">⚙️ Цифровой суверенитет</div>
    <div class="institutional-card-text">Ассоциация сохраняет собственную институциональную идентичность и получает возможность развёртывания выделенного доменного узла в экосистеме VERDICTUM.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔐 Профессиональный комплаенс</div>
    <div class="institutional-card-text">Каждый этап жизненного цикла материала сопровождается цифровой фиксацией событий, временными метками и криптографическими механизмами подтверждения приоритета (SHA-256).</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🌍 Поддержка исследовательских инициатив</div>
    <div class="institutional-card-text">Формируются дополнительные возможности участия в международных грантовых программах и консорциумных проектах.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📚 Поддержка молодых специалистов</div>
    <div class="institutional-card-text">Студенты, аспиранты и молодые специалисты получают доступ к инструментам депонирования, публикации и цифровой фиксации результатов своей работы.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📖 Коллективные реестры и стандарты</div>
    <div class="institutional-card-text">Предусмотрена возможность подготовки и сопровождения коллективных реестров, сборников профессиональных стандартов и тематических выпусков с международной регистрацией и цифровой идентификацией.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🛡️ Юридическая защита</div>
    <div class="institutional-card-text">Все материалы защищены в соответствии с UK Trade Secrets Regulations 2018 (SI 2018/597). Это даёт вашим участникам дополнительный уровень защиты интеллектуального приоритета.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Этапы подключения { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">1</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Меморандум</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Подписание меморандума о сотрудничестве (до 2 недель)</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">2</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Институциональный контур</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Создание субдомена, профилей участников и верификация (2–4 недели)</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">3</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Публикационная программа</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Определение квот и порядка поддержки авторов</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">4</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Обучение и онбординг</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Семинары, вебинары, консультации</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">5</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Международная интеграция</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Участие в совместных программах и грантах</div>
  </div>
</div>

*Средний срок запуска пилотного институционального контура составляет от двух до шести недель в зависимости от масштаба организации.*

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Финансовая модель { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">💰 Публикационный взнос (APC)</div>
    <div class="institutional-card-text">Базовая ставка составляет <strong>£150</strong> за публикацию материала. Оплата может производиться автором, ассоциацией или в рамках институциональной программы поддержки.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📦 Программа Waiver</div>
    <div class="institutional-card-text">Для партнёрских ассоциаций предусмотрена система полного или частичного освобождения от APC. Целевое соотношение платных и льготных публикаций может достигать 40/60 в зависимости от модели сотрудничества.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🎯 Институциональный пакет</div>
    <div class="institutional-card-text">Стоимость определяется индивидуально с учётом количества потенциальных авторов, объёма публикационной активности и необходимых сервисов экосистемы. Годовая подписка: <strong>£1,500–5,000</strong>.</div>
  </div>
</div>

*IMARCH LTD содействует поиску возможностей привлечения грантового финансирования для покрытия расходов на публикационную деятельность и развитие инфраструктуры.*

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Сводка: что получает ассоциация { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  
  <div class="institutional-card">
    <div class="institutional-card-title">🏛️ Автономный профессиональный бренд</div>
    <div class="institutional-card-text">Субдомен <strong>`ассоциация.imarch.ltd`</strong> с полной символикой ассоциации. Вы полностью контролируете внутреннюю повестку и сохраняете лицо своего профессионального сообщества.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">📈 Рост цитируемости</div>
    <div class="institutional-card-text">Виджеты метрик (Crossref, Google Scholar) в реальном времени + международный рецензионный контур Expert Reviewer Network. Ваши участники получают гарантированный рост Хирша.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">⚡ Экономия IT-ресурсов</div>
    <div class="institutional-card-text">Бессерверная инфраструктура (Cloudflare Edge / CHRONICLE OS 8888™). Мы полностью берём на себя техническое обеспечение — вам не нужен дорогостоящий IT-отдел.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🌍 Международный трафик</div>
    <div class="institutional-card-text">Глобальный хаб IMARCH (Лондон) как точка входа для зарубежных экспертов, поисковых роботов и международных агрегаторов. Вы получаете прямой канал целевого трафика.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🛡️ Юридическая защита</div>
    <div class="institutional-card-text"><strong>UK Trade Secrets Regulations 2018 (SI 2018/597)</strong> + SHA-256 фиксация приоритета. Ваши материалы защищены на уровне британского законодательства.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🔐 Суверенный документооборот</div>
    <div class="institutional-card-text">Гибридный контур без платных внешних сервисов (ноу-хау <strong>RN-0032</strong>). Все заявки и данные остаются под вашим контролем, каждая запись фиксируется в VERDICTUM.</div>
  </div>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Пример реализации { .fade-in-up }

<div class="institutional-card" style="margin: 1rem 0;">
  <div class="institutional-card-title">🏛️ UMSS (Украина)</div>
  <div class="institutional-card-text">Первый партнёр, подписавший меморандум о стратегическом сотрудничестве и приступивший к интеграции в экосистему VERDICTUM. Текущий этап предполагает формирование институционального узла, запуск публикационных процессов и участие в развитии протоколов.</div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

### Криптографическое ядро системы: Архитектура доверия

Любая распределённая система или издательская платформа на бумаге выглядит привлекательно ровно до тех пор, пока не встаёт вопрос безопасности, человеческого фактора и защиты от подделок. Чтобы VERDICTUM работал как автономный, неподкупный швейцарский механизм, а не как уязвимая база данных, в его основу заложено **автономное криптографическое ядро**.

Это не просто набор скриптов, а полноценный программно-аппаратный контур, который решает три фундаментальные задачи:

1. **Математическая верификация вместо «честного слова» (Ed25519 & JCS)**
Каждое действие участника — от регистрации в системе до финального вердикта по документу — подписывается персональным криптографическим ключом. Благодаря строгой канонизации данных исключены любые расхождения или попытки оспорить авторство: если решение подписано, отменить его или подделать невозможно технически.

2. **Неизменяемый цифровой архив (Append-only Journal)**
Все ключевые события системы фиксируются в защищённом журнале по принципу непрерывной хэш-цепочки. Каждый новый блок жёстко привязан к предыдущему. Это исключает возможность незаметно удалить запись, переписать историю задним числом или подтасовать результаты рецензирования.

3. **Автономный контур контроля и защиты (Watchers & Anti-Replay)**
Система не требует постоянного ручного надзора. Встроенные механизмы защиты отсекают повторные сетевые атаки (Replay-attacks) по временным меткам и уникальным маркерам, а фоновые сторожевые процессы автоматически управляют дедлайнами и статусами задач, исключая любые простои из-за человеческого фактора.

**Зачем это нужно:**
Без этого технологического фундамента вся система превращается в обычный чат или уязвимый сайт, где данные можно подправить, а решения — оспорить. Криптографическое ядро переводит проект из категории «идеи на бумаге» в статус **суверенной, защищённой и самодостаточной цифровой инфраструктуры**, которой можно доверять на уровне чистой математики.

#### Обращение к руководству ассоциаций { .fade-in-up }

IMARCH LTD не предлагает стандартное программное решение.

Мы предлагаем **долгосрочное институциональное партнёрство**, в рамках которого ваша ассоциация становится полноправным участником международной исследовательской инфраструктуры, направленной на развитие прозрачной экспертизы, защиту профессиональной добросовестности и поддержку инноваций.

#### Документы для начала сотрудничества { .fade-in-up }

Для получения пакета документов, включающего:

- проект Декларации о намерениях;
- проект Меморандума о сотрудничестве;
- описание грантовых механизмов;
- модель институционального комплаенса;

руководство вашей ассоциации может направить официальный запрос через форму заявки ниже.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<form id="assocRegistrationForm" onsubmit="handleAssocSubmit(event)" class="imarch-form-container fade-in-up">
  
  <input type="hidden" name="lang" value="ru">

  <h3 class="form-title">ПОДКЛЮЧЕНИЕ ИНСТИТУЦИОНАЛЬНОГО КОНТУРА (RN-0034)</h3>
  <p class="form-subtitle">Заявка на создание Офис-сайта и интеграцию ассоциации</p>

  <div class="form-group">
    <label for="assocName">Полное название ассоциации / научного общества *</label>
    <input type="text" id="assocName" required placeholder="Например, Association of Systems Analysts">
  </div>

  <div class="form-group">
    <label for="assocRep">ФИО представителя (Президент / Председатель) *</label>
    <input type="text" id="assocRep" required placeholder="Иванов Иван Иванович">
  </div>

  <div class="form-group">
    <label for="assocEmail">Официальный рабочий Email для связи *</label>
    <input type="email" id="assocEmail" required placeholder="science@association.org">
  </div>

  <div class="form-group">
    <label for="assocTelegram">Контактный канал связи представителя *</label>
    <input type="text" id="assocTelegram" required placeholder="Email / Telegram / LinkedIn">
  </div>

  <div class="form-group">
    <label for="assocSubdomain">Желаемый субдомен в экосистеме *</label>
    <div class="subdomain-input-wrapper">
      <input type="text" id="assocSubdomain" required placeholder="assoc" style="text-align: left; outline: none;">
      <span class="subdomain-addon">.imarch.ltd</span>
    </div>
  </div>

  <div class="form-checkbox-group">
    <input type="checkbox" id="assocCompliance" required>
    <label for="assocCompliance">
      Ассоциация подтверждает намерение развернуть выделенный узел, гарантирует профессиональную добросовестность участников и полностью согласна с условиями Институционального протокола RN-0034. *
    </label>
  </div>

  <button type="submit" class="form-submit-btn">ИНИЦИИРОВАТЬ ПОДКЛЮЧЕНИЕ И СГЕНЕРИРОВАТЬ ТОКЕН</button>

</form>

<script type="text/javascript">
function handleAssocSubmit(event) {
  event.preventDefault();
  
  var name = document.getElementById('assocName').value;
  var rep = document.getElementById('assocRep').value;
  var email = document.getElementById('assocEmail').value;
  var tel = document.getElementById('assocTelegram').value;
  var sub = document.getElementById('assocSubdomain').value + '.imarch.ltd';

  sessionStorage.setItem('assoc_name', name);
  sessionStorage.setItem('assoc_rep', rep);
  sessionStorage.setItem('assoc_email', email);
  sessionStorage.setItem('assoc_telegram', tel);
  sessionStorage.setItem('assoc_subdomain', sub);

  window.location.href = "/ru/verdictum/for-associations-2/"; 
}
</script>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/verdictum/" text="Главная VERDICTUM" margin="1rem 0" >}}
</div>