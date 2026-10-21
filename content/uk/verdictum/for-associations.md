---
title: "VERDICTUM — Асоціаціям"
date: 2026-09-14
draft: false
type: "landing"
layout: "institutional"
translationKey: "verdictum-for-associations"
tags: ["verdictum", "associations", "partnership", "chronicle-os"]
description: "Протокол підключення професійних асоціацій, наукових товариств і експертних спільнот до дослідницької екосистеми VERDICTUM. Institutional Pack, фінансова модель і етапи інтеграції."
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

### Протокол підключення професійних асоціацій і наукових товариств до дослідницької екосистеми VERDICTUM { .fade-in-up }

{{< square-image 
     src="/images/verdictum/for-associations.webp" 
     alt="VERDICTUM — Інституційне партнерство"
     class="fade-in-up" >}}

#### Інституційне Наукове Крило: нова архітектура для суверенного знання

IMARCH LTD пропонує професійним асоціаціям, науковим товариствам і експертним спільнотам принципово іншу модель інтеграції в міжнародний дослідницький простір — **Інституційне Наукове Крило (Офіс-сайт)** на базі відмовостійкої платформи VERDICTUM.

На відміну від стандартних рішень, які вимагають або повного занурення в чужі платформи, або утримання дорогої IT-інфраструктури, наш протокол забезпечує **повну автономію бренду** та **одночасну інтеграцію в глобальний експертний трафік**.

---

{{< verdictum/navigator-0001-uk >}}

---

{{< steel_button link="#assocRegistrationForm" text="Заповнити форму підключення" margin="1rem 0" >}}

{{< steel_button link="/ru/verdictum/vd-0006/" text="Повний текст RN-0034" >}}

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Як це працює: архітектурна логістика { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🌐 Локальний контур (Фронтенд)</div>
    <div class="institutional-card-text">Асоціація отримує виділений субдомен (наприклад, `assoc.imarch.ltd`) із повним брендуванням. Тут розміщуються офіційна символіка, реєстри членів і повні тексти публікацій. Ви повністю контролюєте внутрішній порядок денний.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📡 Міжнародний розподільний хаб</div>
    <div class="institutional-card-text">На центральній платформі IMARCH (Лондон, Велика Британія) публікуються цифрові тизери: анотації, ключові слова, висновки, верифіковані профілі ORCID. Це точка входу для закордонних експертів і пошукових систем.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔗 Глобальний трафік</div>
    <div class="institutional-card-text">Закордонні дослідники знаходять матеріал на хабі IMARCH і безшовно переходять на ваш субдомен для ознайомлення з повною версією. Ви отримуєте прямий канал цільового міжнародного трафіку.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Що включає Institutional Pack { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🏛️ Єдиний верифікаційний контур</div>
    <div class="institutional-card-text">Створюється інституційне середовище верифікації членів асоціації. Кожен учасник отримує персональний цифровий профіль (Actor ID), пов'язаний з асоціацією та його професійною структурою.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📄 Публікаційна програма</div>
    <div class="institutional-card-text">Асоціація отримує можливість централізованого розміщення матеріалів у видавничому середовищі VERDICTUM Journal із підтримкою депонування, реєстрації DOI та криптографічної фіксації пріоритету.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔬 Інфраструктура цифрового моделювання</div>
    <div class="institutional-card-text">Партнерам надається доступ до пілотних можливостей прикладного хабу Vis Realitatis для моделювання дослідницьких, освітніх і управлінських сценаріїв.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">⚙️ Суверенний документообіг</div>
    <div class="institutional-card-text">Гібридний контур обробки заявок без використання платних комерційних API (ноу-хау RN-0032). Усі дані залишаються під вашим контролем, кожна заявка фіксується в незмінному реєстрі VERDICTUM.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

#### Чому це важливо для асоціації { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">🎓 Міжнародна інтеграція</div>
    <div class="institutional-card-text">Участь у формуванні нової дослідницької інфраструктури, що розвивається в британській юрисдикції разом з академічними та галузевими партнерами.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">⚙️ Цифровий суверенітет</div>
    <div class="institutional-card-text">Асоціація зберігає власну інституційну ідентичність і отримує можливість розгортання виділеного доменного вузла в екосистемі VERDICTUM.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🔐 Професійний комплаєнс</div>
    <div class="institutional-card-text">Кожен етап життєвого циклу матеріалу супроводжується цифровою фіксацією подій, часовими мітками та криптографічними механізмами підтвердження пріоритету (SHA-256).</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🌍 Підтримка дослідницьких ініціатив</div>
    <div class="institutional-card-text">Формуються додаткові можливості участі в міжнародних грантових програмах і консорціумних проєктах.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📚 Підтримка молодих фахівців</div>
    <div class="institutional-card-text">Студенти, аспіранти та молоді фахівці отримують доступ до інструментів депонування, публікації та цифрової фіксації результатів своєї роботи.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📖 Колективні реєстри та стандарти</div>
    <div class="institutional-card-text">Передбачено можливість підготовки та супроводу колективних реєстрів, збірників професійних стандартів і тематичних випусків із міжнародною реєстрацією та цифровою ідентифікацією.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🛡️ Юридичний захист</div>
    <div class="institutional-card-text">Усі матеріали захищені відповідно до UK Trade Secrets Regulations 2018 (SI 2018/597). Це дає вашим учасникам додатковий рівень захисту інтелектуального пріоритету.</div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Етапи підключення { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">1</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Меморандум</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Підписання меморандуму про співпрацю (до 2 тижнів)</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">2</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Інституційний контур</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Створення субдомену, профілів учасників і верифікація (2–4 тижні)</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">3</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Публікаційна програма</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Визначення квот і порядку підтримки авторів</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">4</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Навчання та онбординг</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Семінари, вебінари, консультації</div>
  </div>
  <div class="institutional-step-card">
    <div style="font-size: 1.5rem; font-weight: 700; color: #b18b56; margin-bottom: 0.5rem;">5</div>
    <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.25rem;">Міжнародна інтеграція</div>
    <div style="font-size: 0.75rem; color: #6a5a48;">Участь у спільних програмах і грантах</div>
  </div>
</div>

*Середній строк запуску пілотного інституційного контуру становить від двох до шести тижнів залежно від масштабу організації.*

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Фінансова модель { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin: 1.5rem 0;">
  <div class="institutional-card">
    <div class="institutional-card-title">💰 Публікаційний внесок (APC)</div>
    <div class="institutional-card-text">Базова ставка становить <strong>£150</strong> за публікацію матеріалу. Оплата може здійснюватися автором, асоціацією або в межах інституційної програми підтримки.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">📦 Програма Waiver</div>
    <div class="institutional-card-text">Для партнерських асоціацій передбачено систему повного або часткового звільнення від APC. Цільове співвідношення платних і пільгових публікацій може сягати 40/60 залежно від моделі співпраці.</div>
  </div>
  <div class="institutional-card">
    <div class="institutional-card-title">🎯 Інституційний пакет</div>
    <div class="institutional-card-text">Вартість визначається індивідуально з урахуванням кількості потенційних авторів, обсягу публікаційної активності та необхідних сервісів екосистеми. Річна підписка: <strong>£1,500–5,000</strong>.</div>
  </div>
</div>

*IMARCH LTD сприяє пошуку можливостей залучення грантового фінансування для покриття витрат на публікаційну діяльність і розвиток інфраструктури.*

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Підсумок: що отримує асоціація { .fade-in-up }

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
  
  <div class="institutional-card">
    <div class="institutional-card-title">🏛️ Автономний професійний бренд</div>
    <div class="institutional-card-text">Субдомен <strong>`ассоциация.imarch.ltd`</strong> із повною символікою асоціації. Ви повністю контролюєте внутрішній порядок денний і зберігаєте обличчя своєї професійної спільноти.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">📈 Зростання цитованості</div>
    <div class="institutional-card-text">Віджети метрик (Crossref, Google Scholar) у реальному часі + міжнародний рецензійний контур Expert Reviewer Network. Ваші учасники отримують гарантоване зростання Хірша.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">⚡ Економія IT-ресурсів</div>
    <div class="institutional-card-text">Безсерверна інфраструктура (Cloudflare Edge / CHRONICLE OS 8888™). Ми повністю беремо на себе технічне забезпечення — вам не потрібен дорогий IT-відділ.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🌍 Міжнародний трафік</div>
    <div class="institutional-card-text">Глобальний хаб IMARCH (Лондон) як точка входу для закордонних експертів, пошукових роботів і міжнародних агрегаторів. Ви отримуєте прямий канал цільового трафіку.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🛡️ Юридичний захист</div>
    <div class="institutional-card-text"><strong>UK Trade Secrets Regulations 2018 (SI 2018/597)</strong> + SHA-256 фіксація пріоритету. Ваші матеріали захищені на рівні британського законодавства.</div>
  </div>

  <div class="institutional-card">
    <div class="institutional-card-title">🔐 Суверенний документообіг</div>
    <div class="institutional-card-text">Гібридний контур без платних зовнішніх сервісів (ноу-хау <strong>RN-0032</strong>). Усі заявки та дані залишаються під вашим контролем, кожен запис фіксується в VERDICTUM.</div>
  </div>

</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### Приклад реалізації { .fade-in-up }

<div class="institutional-card" style="margin: 1rem 0;">
  <div class="institutional-card-title">🏛️ UMSS (Україна)</div>
  <div class="institutional-card-text">Перший партнер, який підписав меморандум про стратегічну співпрацю та розпочав інтеграцію в екосистему VERDICTUM. Поточний етап передбачає формування інституційного вузла, запуск публікаційних процесів і участь у розвитку протоколів.</div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

### Криптографічне ядро системи: Архітектура довіри

Будь-яка розподілена система або видавнича платформа на папері виглядає привабливо рівно доти, доки не постає питання безпеки, людського чинника та захисту від підробок. Щоб VERDICTUM працював як автономний, непідкупний швейцарський механізм, а не як уразлива база даних, у його основу закладено **автономне криптографічне ядро**.

Це не просто набір скриптів, а повноцінний програмно-апаратний контур, який розв'язує три фундаментальні завдання:

1. **Математична верифікація замість «чесного слова» (Ed25519 & JCS)**
Кожну дію учасника — від реєстрації в системі до фінального вердикту щодо документа — підписує персональний криптографічний ключ. Завдяки строгій канонізації даних виключено будь-які розбіжності або спроби оспорити авторство: якщо рішення підписано, скасувати його чи підробити неможливо технічно.

2. **Незмінний цифровий архів (Append-only Journal)**
Усі ключові події системи фіксуються в захищеному журналі за принципом безперервного хеш-ланцюжка. Кожен новий блок жорстко прив'язаний до попереднього. Це виключає можливість непомітно видалити запис, переписати історію заднім числом або підтасувати результати рецензування.

3. **Автономний контур контролю та захисту (Watchers & Anti-Replay)**
Система не потребує постійного ручного нагляду. Вбудовані механізми захисту відсікають повторні мережеві атаки (Replay-attacks) за часовими мітками та унікальними маркерами, а фонові сторожові процеси автоматично керують дедлайнами та статусами завдань, виключаючи будь-які простої через людський чинник.

**Навіщо це потрібно:**
Без цього технологічного фундаменту вся система перетворюється на звичайний чат або уразливий сайт, де дані можна підправити, а рішення — оспорити. Криптографічне ядро переводить проєкт із категорії «ідеї на папері» в статус **суверенної, захищеної та самодостатньої цифрової інфраструктури**, якій можна довіряти на рівні чистої математики.

#### Звернення до керівництва асоціацій { .fade-in-up }

IMARCH LTD не пропонує стандартне програмне рішення.

Ми пропонуємо **довгострокове інституційне партнерство**, у межах якого ваша асоціація стає повноправним учасником міжнародної дослідницької інфраструктури, спрямованої на розвиток прозорої експертизи, захист професійної добросовісності та підтримку інновацій.

#### Документи для початку співпраці { .fade-in-up }

Для отримання пакета документів, що включає:

- проєкт Декларації про наміри;
- проєкт Меморандуму про співпрацю;
- опис грантових механізмів;
- модель інституційного комплаєнсу;

керівництво вашої асоціації може надіслати офіційний запит через форму заявки нижче.

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<form id="assocRegistrationForm" onsubmit="handleAssocSubmit(event)" class="imarch-form-container fade-in-up">
  
  <input type="hidden" name="lang" value="ru">

  <h3 class="form-title">ПІДКЛЮЧЕННЯ ІНСТИТУЦІЙНОГО КОНТУРУ (RN-0034)</h3>
  <p class="form-subtitle">Заявка на створення Офіс-сайту та інтеграцію асоціації</p>

  <div class="form-group">
    <label for="assocName">Повна назва асоціації / наукового товариства *</label>
    <input type="text" id="assocName" required placeholder="Наприклад, Association of Systems Analysts">
  </div>

  <div class="form-group">
    <label for="assocRep">ПІБ представника (Президент / Голова) *</label>
    <input type="text" id="assocRep" required placeholder="Іванов Іван Іванович">
  </div>

  <div class="form-group">
    <label for="assocEmail">Офіційна робоча Email-адреса для зв'язку *</label>
    <input type="email" id="assocEmail" required placeholder="science@association.org">
  </div>

  <div class="form-group">
    <label for="assocTelegram">Контактний канал зв'язку представника *</label>
    <input type="text" id="assocTelegram" required placeholder="Email / Telegram / LinkedIn">
  </div>

  <div class="form-group">
    <label for="assocSubdomain">Бажаний субдомен в екосистемі *</label>
    <div class="subdomain-input-wrapper">
      <input type="text" id="assocSubdomain" required placeholder="assoc" style="text-align: left; outline: none;">
      <span class="subdomain-addon">.imarch.ltd</span>
    </div>
  </div>

  <div class="form-checkbox-group">
    <input type="checkbox" id="assocCompliance" required>
    <label for="assocCompliance">
      Асоціація підтверджує намір розгорнути виділений вузол, гарантує професійну добросовісність учасників і повністю погоджується з умовами Інституційного протоколу RN-0034. *
    </label>
  </div>

  <button type="submit" class="form-submit-btn">ІНІЦІЮВАТИ ПІДКЛЮЧЕННЯ І ЗГЕНЕРУВАТИ ТОКЕН</button>

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
  {{< steel_button link="/ru/verdictum/" text="Головна VERDICTUM" margin="1rem 0" >}}
</div>