---
title: "MONOGRAPH-0001"
date: 2026-08-10
draft: false
tags: ["monograph", "typesetting", "bonus-boutique", "imarch", "tfm"]
translationKey: "monograph-typesetting-public"
description: "Загрузите рукопись монографии, выберите вид вёрстки и получите готовый PDF за 48 часов. Бонус-бутик IMARCH LTD."
---

{{< square-image 
     src="/images/banners/0061.png" 
     alt="IMARCH Monograph Typesetting Service"
     class="fade-in-up" >}}

#### ВЁРСТКА МОНОГРАФИИ В IMARCH TFM ENGINE { .fade-in-up }

<!-- КОРОТКИЙ ТИЗЕР -->
<div style="background: #fdfaf5; border-left: 4px solid #b18b56; padding: clamp(0.8rem, 3vw, 1.2rem) clamp(1rem, 4vw, 1.5rem); margin: 1.5rem auto; border-radius: 0 12px 12px 0; max-width: 100%; box-sizing: border-box; width: 100%;">
  <p style="margin: 0 0 0.6rem 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem); color: #4a3a2a; line-height: 1.4;">
    📚 <strong>Проблема:</strong> Вёрстка научной монографии занимает недели и стоит сотни фунтов. Формулы, таблицы, схемы — постоянная головная боль.
  </p>
  <p style="margin: 0; font-size: clamp(0.85rem, 2.5vw, 0.95rem); color: #2c2416; line-height: 1.4;">
    ⚡ <strong>Решение:</strong> TFM Engine от IMARCH LTD — премиальная вёрстка монографий с криптографической фиксацией приоритета. Готовый PDF в течение 24-48 часов.
  </p>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 📦 ФОРМАТЫ ИЗДАНИЯ { .fade-in-up }

<p style="font-size: clamp(0.9rem, 2vw, 1rem); color: #4a3a2a; text-align: center; max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.6;">
  Выберите формат вашей монографии — от цифрового PDF до печатной книги с доставкой по всему миру.
</p>

<!-- ===== СЕТКА КАРТОЧЕК ФОРМАТОВ ===== -->
<style>
  .format-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  .format-card {
    background: #fdfaf5;
    border: 1.5px solid #e0d6c8;
    border-radius: 16px;
    padding: 1.5rem 1.2rem 1rem;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .format-card:hover {
    border-color: #b18b56;
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.06);
  }
  .format-card .format-emoji {
    font-size: 2.8rem;
    display: block;
    margin-bottom: 0.5rem;
    animation: floatEmoji 3.5s ease-in-out infinite;
  }
  .format-card:hover .format-emoji {
    animation: floatEmoji 1.5s ease-in-out infinite;
  }
  .format-card .format-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #2c2416;
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }
  .format-card .format-desc {
    font-size: 0.82rem;
    color: #6a5a4a;
    line-height: 1.5;
    margin-bottom: 0.6rem;
    flex: 1;
  }
  .format-card .format-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;
    margin-bottom: 0.6rem;
  }
  .format-card .format-tag {
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 0.15rem 0.6rem;
    border-radius: 30px;
    background: #f5f0e8;
    color: #6a5a4a;
    border: 1px solid #e8ddd0;
  }
  .format-card .format-tag.blue { background: #f0f5f8; color: #4a6b82; border-color: #d0dce4; }
  .format-card .format-tag.gold { background: #f5f0e8; color: #b18b56; border-color: #e8ddd0; }
  .format-card .format-tag.green { background: #f0f8f0; color: #2c7a3a; border-color: #d0e8d0; }
  .format-card .format-btn {
    display: inline-block;
    padding: 0.3rem 1.2rem;
    border: 1.5px solid #b18b56;
    border-radius: 40px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #b18b56;
    background: transparent;
    text-decoration: none;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 0.2rem;
  }
  .format-card .format-btn:hover {
    background: #b18b56;
    color: #fff;
  }

  @keyframes floatEmoji {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.05); }
  }

  @media (max-width: 600px) {
    .format-grid { grid-template-columns: 1fr; }
    .format-card { padding: 1.2rem 1rem; }
    .format-card .format-emoji { font-size: 2.4rem; }
  }
</style>

<div class="format-grid">

  <!-- 1. PDF без иллюстраций -->
  <div class="format-card">
    <span class="format-emoji">📄</span>
    <div class="format-name">PDF Базовый</div>
    <div class="format-desc">Цифровой PDF-файл. Только текст и таблицы. Без иллюстраций и схем. Идеально для черновиков и рецензирования.</div>
    <div class="format-tags">
      <span class="format-tag blue">Для рецензентов</span>
      <span class="format-tag">Черновик</span>
    </div>
    <a href="#monographForm" class="format-btn">Заказать →</a>
  </div>

  <!-- 2. PDF с иллюстрациями -->
  <div class="format-card">
    <span class="format-emoji">📊</span>
    <div class="format-name">PDF Полный</div>
    <div class="format-desc">Цифровой PDF-файл с текстом, таблицами, иллюстрациями и схемами в выбранном стиле. Готов к публикации.</div>
    <div class="format-tags">
      <span class="format-tag gold">Для публикации</span>
      <span class="format-tag">Схемы</span>
    </div>
    <a href="#monographForm" class="format-btn">Заказать →</a>
  </div>

  <!-- 3. Печатная книга (мягкая обложка) -->
  <div class="format-card">
    <span class="format-emoji">📖</span>
    <div class="format-name">Печатная книга</div>
    <div class="format-desc">Физический экземпляр монографии. Мягкая обложка, профессиональная печать, доставка по всему миру. От 1 экземпляра.</div>
    <div class="format-tags">
      <span class="format-tag green">Печать</span>
      <span class="format-tag">Доставка</span>
      <span class="format-tag">От 1 шт.</span>
    </div>
    <a href="#monographForm" class="format-btn">Заказать →</a>
  </div>

</div>

<!-- ===== БЛОК О ПРЕДПЕЧАТНОЙ ПОДГОТОВКЕ ===== -->
<div style="background: #fdfaf5; border-left: 4px solid #b18b56; border-radius: 0 14px 14px 0; padding: 1.2rem 1.5rem; margin: 1.5rem 0;">
  <p style="margin: 0; font-size: clamp(0.85rem, 1.6vw, 0.95rem); color: #4a3a2a; line-height: 1.6;">
    <strong style="color: #2c2416;">🖨️ Предпечатная подготовка и печать</strong><br />
    Мы предоставляем полный цикл подготовки макета для печати в типографии. Вы можете заказать печать в нашем издательстве — от 1 экземпляра с мягкой обложкой, с доставкой по всему миру. <br />
    <span style="display: inline-block; margin-top: 0.3rem; font-size: 0.85rem; color: #6a5a4a;">
      <span style="font-weight: 600;">📦 Доставка:</span> Global shipping — DHL, UPS, FedEx.
    </span>
  </p>
</div>

<!-- ===== ШПАРГАЛКА ДЛЯ КЛИЕНТА ===== -->
<div style="background: #f8f5f0; border: 1.5px solid #e0d6c8; border-radius: 14px; padding: 1rem 1.5rem; margin: 1.5rem 0;">
  <p style="margin: 0; font-size: clamp(0.8rem, 1.6vw, 0.9rem); color: #4a3a2a; line-height: 1.6;">
    <strong style="color: #2c2416;">💡 Как выбрать формат:</strong><br />
    <span style="display: inline-block; margin-right: 1rem;">📄 <strong>PDF Базовый</strong> — для рецензирования, черновиков, быстрого обмена</span>
    <span style="display: inline-block; margin-right: 1rem;">📊 <strong>PDF Полный</strong> — для публикации, депозитария, грантов</span>
    <span style="display: inline-block;">📖 <strong>Печатная книга</strong> — для библиотек, подарков, презентаций, продажи</span>
  </p>
</div>

&nbsp;

## Дополнительная информация

**👥 Для кого**

Исследователи, университеты, институты, частные авторы, корпорации — любой, кто хочет зафиксировать знание в профессиональном виде.

---

**⚙️ Особенности**

Фиксация SHA-256, DOI, институциональный дизайн, право на публикацию в реестре Verdictum, возможность печати в IMARCH Publishing.

&nbsp;

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

#### 🎨 БИБЛИОТЕКА СТИЛЕЙ ВЁРСТКИ (без иллюстраций) { .fade-in-up }

<p style="font-size: clamp(0.9rem, 2vw, 1rem); color: #4a3a2a; text-align: center; max-width: 700px; margin: 0 auto 2rem auto; line-height: 1.6;">
  Выберите стиль оформления вашей монографии — от строгого юридического до премиального издательского. Каждый стиль разработан для конкретной аудитории и задачи.
</p>

<!-- ===== СЕТКА КАРТОЧЕК С ЭМОДЗИ ===== -->
<style>
  .style-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.2rem;
    margin: 1.5rem 0;
  }
  .style-card {
    background: #fdfaf5;
    border: 1.5px solid #e0d6c8;
    border-radius: 16px;
    padding: 1.5rem 1.2rem 1rem;
    transition: all 0.25s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .style-card:hover {
    border-color: #b18b56;
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.06);
  }
  .style-card .style-emoji {
    font-size: 3.2rem;
    display: block;
    margin-bottom: 0.5rem;
    animation: floatEmoji 3.5s ease-in-out infinite;
    transition: transform 0.3s ease;
  }
  .style-card:hover .style-emoji {
    animation: floatEmoji 1.5s ease-in-out infinite;
  }
  .style-card .style-badge {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    padding: 0.2rem 0.8rem;
    border-radius: 30px;
    background: #e8e0d5;
    color: #4a3a2a;
    margin-bottom: 0.4rem;
    align-self: center;
  }
  .style-card .style-name {
    font-size: 1.05rem;
    font-weight: 800;
    color: #2c2416;
    margin-bottom: 0.2rem;
    line-height: 1.2;
  }
  .style-card .style-desc {
    font-size: 0.82rem;
    color: #6a5a4a;
    line-height: 1.5;
    margin-bottom: 0.6rem;
    flex: 1;
  }
  .style-card .style-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    justify-content: center;
    margin-bottom: 0.6rem;
  }
  .style-card .style-tag {
    font-size: 0.55rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    padding: 0.15rem 0.6rem;
    border-radius: 30px;
    background: #f5f0e8;
    color: #6a5a4a;
    border: 1px solid #e8ddd0;
  }
  .style-card .style-tag.primary { background: #f0f5f8; color: #4a6b82; border-color: #d0dce4; }
  .style-card .style-tag.gold { background: #f5f0e8; color: #b18b56; border-color: #e8ddd0; }
  .style-card .style-tag.dark { background: #e8e0d5; color: #2c2416; border-color: #d5cbbf; }
  .style-card .style-tag.green { background: #f0f8f0; color: #2c7a3a; border-color: #d0e8d0; }
  .style-card .style-tag.blue { background: #f0f5f8; color: #4a6b82; border-color: #d0dce4; }
  .style-card .style-tag.cream { background: #f8f5f0; color: #8b7355; border-color: #e8ddd0; }
  .style-card .style-btn {
    display: inline-block;
    padding: 0.3rem 1.2rem;
    border: 1.5px solid #b18b56;
    border-radius: 40px;
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #b18b56;
    background: transparent;
    text-decoration: none;
    transition: all 0.2s ease;
    align-self: center;
    margin-top: 0.2rem;
  }
  .style-card .style-btn:hover {
    background: #b18b56;
    color: #fff;
  }

  @keyframes floatEmoji {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.05); }
  }

  @media (max-width: 600px) {
    .style-grid { grid-template-columns: 1fr; }
    .style-card { padding: 1.2rem 1rem; }
    .style-card .style-emoji { font-size: 2.8rem; }
  }
</style>

<div class="style-grid">

  <!-- STYLE A -->
  <div class="style-card">
    <span class="style-emoji">⚖️</span>
    <span class="style-badge">Style A</span>
    <div class="style-name">Monochrome Executive</div>
    <div class="style-desc">Строгий монохром. Чёрно-белая классическая типографика, чёткая контрастная вёрстка.</div>
    <div class="style-tags">
      <span class="style-tag">Юридические документы</span>
      <span class="style-tag primary">Регуляторы</span>
      <span class="style-tag dark">Инвесторы</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-a.pdf" class="style-btn">Демо PDF →</a>
  </div>

  <!-- STYLE B -->
  <div class="style-card">
    <span class="style-emoji">🏛️</span>
    <span class="style-badge">Style B</span>
    <div class="style-name">Institutional Blue</div>
    <div class="style-desc">Корпоративный академический. Глубокий морской синий на тёплом кремовом фоне.</div>
    <div class="style-tags">
      <span class="style-tag">Корпоративные отчёты</span>
      <span class="style-tag blue">C-Level</span>
      <span class="style-tag gold">Фонды</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-b.pdf" class="style-btn">Демо PDF →</a>
  </div>

  <!-- STYLE C -->
  <div class="style-card">
    <span class="style-emoji">📜</span>
    <span class="style-badge">Style C</span>
    <div class="style-name">Oat-Olive Intelligence</div>
    <div class="style-desc">Оливковый шик. Приглушённые песочные и оливковые тона, дух шифровок и закрытых докладов.</div>
    <div class="style-tags">
      <span class="style-tag">Геополитика</span>
      <span class="style-tag dark">Аналитика</span>
      <span class="style-tag">Закрытые доклады</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-c.pdf" class="style-btn">Демо PDF →</a>
  </div>

  <!-- STYLE D -->
  <div class="style-card">
    <span class="style-emoji">📐</span>
    <span class="style-badge">Style D</span>
    <div class="style-name">Canonical Minimalist</div>
    <div class="style-desc">Минималистичный канон. Светлая строгая гамма, сбалансированная типографика, фокус на структуру.</div>
    <div class="style-tags">
      <span class="style-tag">Формалогия</span>
      <span class="style-tag primary">Академия</span>
      <span class="style-tag">Разработчики</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-d.pdf" class="style-btn">Демо PDF →</a>
  </div>

  <!-- STYLE E -->
  <div class="style-card">
    <span class="style-emoji">🎨</span>
    <span class="style-badge">Style E</span>
    <div class="style-name">Vibrant Color-Coded</div>
    <div class="style-desc">Институциональный цветной. Активное цветовое кодирование для визуальной навигации.</div>
    <div class="style-tags">
      <span class="style-tag">Инфографика</span>
      <span class="style-tag green">Практики</span>
      <span class="style-tag">Инженеры</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-e.pdf" class="style-btn">Демо PDF →</a>
  </div>

  <!-- STYLE F -->
  <div class="style-card">
    <span class="style-emoji">📰</span>
    <span class="style-badge">Style F</span>
    <div class="style-name">Dark-Cream Editorial</div>
    <div class="style-desc">Издательский контрастный. Глубокие тёмные тона с кремовым акцентом, эстетика премиальной прессы.</div>
    <div class="style-tags">
      <span class="style-tag">Манифесты</span>
      <span class="style-tag cream">СМИ</span>
      <span class="style-tag gold">Партнёры</span>
    </div>
    <a href="/documents/0001-Monograf-Documents_System-f.pdf" class="style-btn">Демо PDF →</a>
  </div>

</div>

<!-- ===== ШПАРГАЛКА ДЛЯ КЛИЕНТА ===== -->
<div style="background: #f8f5f0; border: 1.5px solid #e0d6c8; border-radius: 14px; padding: 1.2rem 1.5rem; margin: 1.5rem 0;">
  <p style="margin: 0; font-size: clamp(0.8rem, 1.6vw, 0.9rem); color: #4a3a2a; line-height: 1.6;">
    <strong style="color: #2c2416;">💡 Как выбрать стиль за 3 секунды:</strong><br />
    <span style="display: inline-block; margin-right: 1rem;">⚖️ <strong>Style A</strong> — строгий официальный документ</span>
    <span style="display: inline-block; margin-right: 1rem;">🏛️ <strong>Style B</strong> — отчёт для совета директоров</span>
    <span style="display: inline-block; margin-right: 1rem;">📜 <strong>Style C</strong> — аналитический / стратегический доклад</span>
    <span style="display: inline-block; margin-right: 1rem;">📐 <strong>Style D</strong> — фундаментальная наука</span>
    <span style="display: inline-block; margin-right: 1rem;">🎨 <strong>Style E</strong> — гайды, инструкции, схемы</span>
    <span style="display: inline-block;">📰 <strong>Style F</strong> — манифест, презентация, СМИ</span>
  </p>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<!-- ===== КАРТОЧКА УСЛУГИ ===== -->
<div style="background: linear-gradient(145deg, #f5f0e8, #e8e0d6); border: 1.5px solid #b8a892; border-radius: 20px; padding: clamp(0.8rem, 3vw, 2rem); margin: 1.5rem auto; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.04); max-width: 100%; box-sizing: border-box; overflow: hidden; width: 100%;">
  
  <span style="font-size: clamp(1.8rem, 5vw, 3rem); display: block; margin-bottom: 0.3rem; text-align: center;">📚</span>
  
  <div style="font-size: clamp(1rem, 3.5vw, 1.6rem); font-weight: 800; color: #2c2416; margin-bottom: 0.2rem; word-wrap: break-word; line-height: 1.2;">
    БОНУС-БУТИК IMARCH
  </div>
  
  <div style="font-size: clamp(0.7rem, 2vw, 1rem); color: #6a5a4a; margin-bottom: 0.6rem; font-family: monospace; letter-spacing: 1px; word-wrap: break-word;">
    TFM ENGINE · MONOGRAPH TYPESETTING
  </div>

  <p style="font-size: clamp(0.8rem, 2.2vw, 1rem); color: #4a3a2a; margin-bottom: 1rem; line-height: 1.5; text-align: center;">
    <strong>Статус:</strong> <span style="color: #2c7a3a; font-weight: 600;">ПРИНИМАЕМ ЗАКАЗЫ</span><br />
    <small style="font-size: 0.8em; opacity: 0.8;">Срок вёрстки: от 24 часов</small>
  </p>

  <!-- 👇 НОВАЯ КНОПКА С ЦЕНТРОВКОЙ -->
  <div style="display: flex; justify-content: center; margin-bottom: 0.8rem;">
    <a href="/ru/docs/consilium/print/" 
       style="display: inline-block; 
              background: #4b2e2e; 
              color: #fff; 
              font-weight: 700; 
              font-size: clamp(0.8rem, 1.6vw, 0.95rem); 
              padding: 0.6rem 2rem; 
              border-radius: 40px; 
              text-decoration: none; 
              transition: all 0.3s ease;
              box-shadow: 0 2px 8px rgba(75, 46, 46, 0.2);"
       onmouseover="this.style.background='#362121'; this.style.boxShadow='0 4px 16px rgba(75, 46, 46, 0.3)';"
       onmouseout="this.style.background='#4b2e2e'; this.style.boxShadow='0 2px 8px rgba(75, 46, 46, 0.2)';">
      📂 Перейти в каталог
    </a>
  </div>

  <p style="font-size: clamp(0.65rem, 1.6vw, 0.75rem); color: #7a6a5a; margin-top: 0.5rem; margin-bottom: 0; line-height: 1.35; text-align: center; padding: 0 0.3rem;">
    ⚖️ <strong>Статус услуги:</strong> Добровольный целевой взнос на развитие инфраструктуры IMARCH TFM Engine. В благодарность мы выполняем вёрстку вашей монографии.
  </p>

</div>

&nbsp;

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

#### КАК ЭТО РАБОТАЕТ { .fade-in-up }

**1. Загрузите рукопись.** Отправьте нам файл в любом формате (`.docx`, `.md`, `.txt`, `.pdf`). Мы вытянем текст.

**2. Выберите вид вёрстки.** Базовый — только текст. Стандарт — с вашими картинками. Премиум — с генерацией схем и премиум-дизайном.

**3. Зафиксируйте хеш.** Мы вычислим SHA-256 вашего файла — это ваше доказательство приоритета.

**4. Поддержите инфраструктуру.** Внесите добровольный взнос через WhyDonate. Это ускоряет процесс вёрстки.

**5. Получите готовый PDF.** Через 24-48 часов вы получите профессионально сверстанную монографию в нашем институциональном стиле.

&nbsp;

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

#### 📋 УСЛОВИЯ { .fade-in-up }

<!-- ===== КАРТОЧКИ ТАРИФОВ (вместо таблицы) ===== -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin: 2rem 0;">

  <!-- БАЗОВЫЙ -->
  <div style="background: #fdfaf5; border: 1px solid #e0d6c8; border-radius: 20px; padding: 1.5rem; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="font-size: 2rem; margin-bottom: 0.3rem;">📄</div>
      <div style="font-weight: 800; font-size: 1.1rem; color: #2c2416; margin-bottom: 0.5rem; border-left: 3px solid #8b7355; padding-left: 0.75rem;">Базовый</div>
      <p style="font-size: 0.85rem; color: #4a3a2a; line-height: 1.5; margin-bottom: 0.5rem;">Текст + таблицы. Без картинок и схем.</p>
    </div>
    <div>
      <div style="display: inline-block; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #8b7355; background: rgba(139,115,85,0.1); padding: 0.25rem 0.75rem; border-radius: 30px; margin-top: 0.5rem;">от £50</div>
    </div>
  </div>

  <!-- СТАНДАРТ -->
  <div style="background: #fdfaf5; border: 1px solid #e0d6c8; border-radius: 20px; padding: 1.5rem; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="font-size: 2rem; margin-bottom: 0.3rem;">📊</div>
      <div style="font-weight: 800; font-size: 1.1rem; color: #2c2416; margin-bottom: 0.5rem; border-left: 3px solid #8b7355; padding-left: 0.75rem;">Стандарт</div>
      <p style="font-size: 0.85rem; color: #4a3a2a; line-height: 1.5; margin-bottom: 0.5rem;">Текст + таблицы + ваши изображения (приводим к единому стилю).</p>
    </div>
    <div>
      <div style="display: inline-block; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #8b7355; background: rgba(139,115,85,0.1); padding: 0.25rem 0.75rem; border-radius: 30px; margin-top: 0.5rem;">£80</div>
    </div>
  </div>

  <!-- ПРЕМИУМ -->
  <div style="background: #fdfaf5; border: 1px solid #e0d6c8; border-radius: 20px; padding: 1.5rem; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02); display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="font-size: 2rem; margin-bottom: 0.3rem;">⭐</div>
      <div style="font-weight: 800; font-size: 1.1rem; color: #2c2416; margin-bottom: 0.5rem; border-left: 3px solid #8b7355; padding-left: 0.75rem;">Премиум</div>
      <p style="font-size: 0.85rem; color: #4a3a2a; line-height: 1.5; margin-bottom: 0.5rem;">Текст + таблицы + изображения + генерация схем (Mermaid). Премиум-дизайн.</p>
    </div>
    <div>
      <div style="display: inline-block; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #8b7355; background: rgba(139,115,85,0.1); padding: 0.25rem 0.75rem; border-radius: 30px; margin-top: 0.5rem;">от £100</div>
    </div>
  </div>

</div>

<div style="background: rgba(177, 139, 86, 0.06); border-left: 4px solid #b18b56; padding: 0.8rem 1.2rem; margin: 1rem 0 2rem 0; border-radius: 0 10px 10px 0;">
  <p style="margin: 0; font-size: 0.8rem; color: #5a4a3a; line-height: 1.5;">
    💡 <strong>О взносах:</strong> Средства направляются на поддержку разработки TFM Engine и инфраструктуры IMARCH LTD. Взнос является добровольным и не является платой за услугу.
  </p>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;" class="fade-in-up">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

#### 📄 ЗАГРУЗИТЕ РУКОПИСЬ { .fade-in-up }

<!-- ===== ФОРМА ПОДАЧИ МОНОГРАФИИ ===== -->
<style>
  .mono-form-container {
    max-width: 650px;
    width: 100%;
    margin: 2rem auto;
    padding: 2.5rem;
    background: #fdfbf7;
    border: 1px solid #e6dfd3;
    border-radius: 24px;
    font-family: inherit;
    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    box-sizing: border-box;
    overflow: hidden;
  }
  .mono-form-title {
    margin-top: 0;
    font-size: 1.4rem;
    letter-spacing: 1px;
    color: #2b2b2b;
    text-align: center;
  }
  .mono-form-subtitle {
    font-size: 0.9rem;
    color: #7a7469;
    text-align: center;
    margin-bottom: 2rem;
  }
  .mono-form-group {
    margin-bottom: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }
  .mono-form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a453e;
  }
  .mono-form-group input, .mono-form-group textarea, .mono-form-group select {
    width: 100%;
    max-width: 100%;
    padding: 0.8rem 1rem;
    border: 1px solid #d3c9b8;
    border-radius: 12px;
    background: #fff;
    font-size: 0.95rem;
    color: #333;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }
  .mono-form-group input:focus, .mono-form-group textarea:focus, .mono-form-group select:focus {
    outline: none;
    border-color: #4b2e2e;
    box-shadow: 0 0 0 3px rgba(75, 46, 46, 0.1);
  }
  .mono-file-box {
    background: #efebe4;
    border-radius: 14px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
    border: 1px dashed #b18b56;
  }
  .mono-hash-display {
    font-family: monospace;
    font-size: 0.75rem;
    color: #8b7355;
    margin-top: 6px;
    word-break: break-all;
  }
  .mono-checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 0.8rem;
    margin: 2rem 0;
    width: 100%;
    box-sizing: border-box;
  }
  .mono-checkbox-group input {
    margin-top: 0.2rem;
    width: 18px;
    height: 18px;
    min-width: 18px;
    accent-color: #4b2e2e;
    flex-shrink: 0;
  }
  .mono-checkbox-group label {
    font-size: 0.85rem;
    line-height: 1.4;
    color: #5a5449;
  }
  .mono-submit-btn {
    width: 100%;
    max-width: 100%;
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
    box-sizing: border-box;
  }
  .mono-submit-btn:hover {
    background: #362121;
  }
  @media (max-width: 600px) {
    .mono-form-container {
      padding: 1.2rem;
      margin: 1rem auto;
      border-radius: 16px;
    }
    .mono-form-title {
      font-size: 1.1rem;
    }
    .mono-form-group input, .mono-form-group textarea, .mono-form-group select {
      font-size: 0.9rem;
      padding: 0.7rem 0.8rem;
    }
    .mono-checkbox-group label {
      font-size: 0.8rem;
    }
    .mono-submit-btn {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
</style>

<form id="monographForm" class="mono-form-container fade-in-up">
  <input type="hidden" id="mono_lang" value="ru" />

  <h3 class="mono-form-title">📚 ПОДАЧА РУКОПИСИ МОНОГРАФИИ</h3>
  <p class="mono-form-subtitle">Заполните данные, выберите тариф и загрузите файл для расчёта SHA-256 хеша</p>

  <div class="mono-form-group">
    <label for="mono_name">ФИО Автора *</label>
    <input type="text" id="mono_name" required placeholder="Dr. Alexander Solex / Александр Соколов" />
  </div>

  <div class="mono-form-group">
    <label for="mono_email">Email *</label>
    <input type="email" id="mono_email" required placeholder="author@university.edu" />
  </div>

  <div class="mono-form-group">
    <label for="mono_affil">ВУЗ / Организация</label>
    <input type="text" id="mono_affil" placeholder="IMARCH Institute / КНУ им. Шевченко" />
  </div>

  <div class="mono-form-group">
    <label for="mono_title">Название монографии *</label>
    <input type="text" id="mono_title" required placeholder="Cryptographic Proof-of-Priority in Open Science Infrastructure..." />
  </div>

  <div class="mono-form-group">
    <label for="mono_abstract">Аннотация (краткое описание) *</label>
    <textarea id="mono_abstract" rows="3" required placeholder="Опишите кратко содержание монографии..."></textarea>
  </div>

  <!-- ВЫБОР ТАРИФА -->
  <div class="mono-form-group">
    <label for="mono_tariff">Выберите тариф вёрстки *</label>
    <select id="mono_tariff" required>
      <option value="basic">Базовый (£50) — только текст, без картинок</option>
      <option value="standard">Стандарт (£80) — текст + ваши изображения</option>
      <option value="premium">Премиум (£120) — текст + изображения + генерация схем</option>
    </select>
  </div>

  <!-- ЗАГРУЗКА ФАЙЛА -->
  <div class="mono-form-group">
    <label for="file_monograph">1. Загрузите рукопись * (.docx, .md, .txt, .pdf)</label>
    <input type="file" id="file_monograph" accept=".docx,.doc,.md,.txt,.pdf" />
    <div id="hash_monograph_display" class="mono-hash-display">SHA-256: ожидание файла...</div>
  </div>

  <!-- ДОПОЛНИТЕЛЬНЫЕ ФАЙЛЫ (опционально) -->
  <div class="mono-form-group">
    <label for="file_images">2. Дополнительные файлы (изображения, схемы) — опционально</label>
    <input type="file" id="file_images" accept=".zip,.rar,.png,.jpg,.jpeg,.svg" multiple />
    <div style="font-size: 0.7rem; color: #7a6a5a; margin-top: 4px;">Вы можете приложить архив с изображениями или отдельные файлы</div>
  </div>

  <div class="mono-checkbox-group">
    <input type="checkbox" id="mono_compliance" required />
    <label for="mono_compliance">
      Подтверждаю, что являюсь автором рукописи и согласен с условиями вёрстки. Понимаю, что взнос является добровольным и направлен на поддержку инфраструктуры TFM Engine.
    </label>
  </div>

  <button type="button" onclick="submitMonographApplication()" class="mono-submit-btn">📜 ЗАФИКСИРОВАТЬ SHA-256 И ПЕРЕЙТИ К ШАГУ 2</button>
</form>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('file_monograph');
  if (fileInput) {
    fileInput.addEventListener('change', function() {
      generateMonographHash('file_monograph', 'hash_monograph_display');
    });
  }
});

async function generateMonographHash(inputId, displayId) {
  const input = document.getElementById(inputId);
  const display = document.getElementById(displayId);
  if (!input.files || input.files.length === 0) {
    display.innerText = "SHA-256: ожидание файла...";
    return;
  }
  const file = input.files[0];
  display.innerText = "Расчет SHA-256 хеша...";
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    display.innerText = "SHA-256: " + hashHex;
    sessionStorage.setItem('mono_hash', hashHex);
  } catch(e) {
    display.innerText = "SHA-256: Ошибка вычисления хеша";
  }
}

function submitMonographApplication() {
  const name = document.getElementById('mono_name').value.trim();
  const email = document.getElementById('mono_email').value.trim();
  const affil = document.getElementById('mono_affil').value.trim();
  const title = document.getElementById('mono_title').value.trim();
  const abstractText = document.getElementById('mono_abstract').value.trim();
  const tariff = document.getElementById('mono_tariff').value;
  const compliance = document.getElementById('mono_compliance').checked;

  if (!name || !email || !title || !abstractText) {
    alert('Пожалуйста, заполните все обязательные поля формы.');
    return;
  }
  if (!compliance) {
    alert('Необходимо подтвердить согласие с условиями вёрстки.');
    return;
  }

  const hash = sessionStorage.getItem('mono_hash') || 'NOT_CALCULATED';

  sessionStorage.setItem('mono_name', name);
  sessionStorage.setItem('mono_email', email);
  sessionStorage.setItem('mono_affil', affil);
  sessionStorage.setItem('mono_title', title);
  sessionStorage.setItem('mono_abstract', abstractText);
  sessionStorage.setItem('mono_tariff', tariff);
  sessionStorage.setItem('mono_hash', hash);

  const submitBtn = document.querySelector('.mono-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerText = 'ФИКСАЦИЯ ХЕША И ПЕРЕХОД К ШАГУ 2...';

  const formData = new FormData();
  formData.append('type', 'MONOGRAPH_SUBMISSION');
  formData.append('name', name);
  formData.append('_replyto', email);
  formData.append('affiliation', affil);
  formData.append('title', title);
  formData.append('abstract', abstractText);
  formData.append('tariff', tariff);
  formData.append('hash', hash);

  fetch('https://chronicle-gateway.chronosolexandr.workers.dev', {
    method: 'POST',
    body: formData
  })
  .then(() => {
    window.location.href = "/ru/profile/chronicle-os-journal/monograph-public-2/";
  })
  .catch(err => {
    console.error(err);
    window.location.href = "/ru/profile/chronicle-os-journal/monograph-public-2/";
  });
}
</script>

&nbsp;

<div style="text-align: center; margin: 2rem 0;">
  {{< steel_button link="/ru/" text="Главная CHRONICLE OS" margin="1rem 0" >}}

<style>
  /* ═══════════════════════════════════════
     КАСТОМНЫЙ КЛАСС ДЛЯ СТИЛЯ D (Десктоп)
     ═══════════════════════════════════════ */
  .md-table-d {
    width: 100%;
    min-width: 650px;
    background-color: #ffffff !important;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #e1e5ea;
    border-radius: 12px;
    overflow: hidden;
    font-size: 16px;
    line-height: 1.5;
    color: #333333;
  }
  
  .md-table-d th {
    background-color: #f7f9fc !important;
    color: #1f3a5f !important;
    font-family: 'Times New Roman', serif;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    padding: 20px 25px;
    border-bottom: 2px solid #d0dce4 !important;
  }
  
  .md-table-d td {
    background-color: #ffffff !important;
    color: #333333 !important;
    padding: 20px 25px;
    border-bottom: 1px solid #e1e5ea !important;
    vertical-align: top;
  }
  
  .md-table-d td:first-child {
    background-color: #f7f9fc !important;
    font-weight: bold;
  }
  
  /* ═══════════════════════════════════════
     МОБИЛЬНАЯ АДАПТАЦИЯ (Карточный вид)
     ═══════════════════════════════════════ */
  .md-table-wrapper {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  @media (max-width: 767px) {
    /* Убираем жесткую ширину, превращаем в список блоков */
    .md-table-wrapper,
    .md-table-d {
      min-width: 0 !important;
      width: 100% !important;
      border: none !important;
      border-radius: 0 !important;
      display: block !important;
    }
    
    /* Прячем заголовки таблицы */
    .md-table-d thead {
      display: none !important;
    }
    
    /* Строки превращаем в отдельные карточки */
    .md-table-d tbody,
    .md-table-d tr,
    .md-table-d td {
      display: block !important;
      width: 100% !important;
    }
    
    .md-table-d tr {
      background: #ffffff;
      border: 1px solid #e1e5ea !important;
      border-radius: 10px !important;
      margin-bottom: 1rem !important;
      padding: 0.5rem 0.8rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
    }
    
    /* Каждая ячейка - отдельная строка с подписью */
    .md-table-d td {
      border: none !important;
      padding: 8px 12px !important;
      text-align: right !important;
      position: relative !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
      background-color: #ffffff !important;
    }
    
    /* Обязательное условие: подпись слева, содержимое справа */
    .md-table-d td::before {
      content: attr(data-label);
      font-weight: 700;
      color: #1f3a5f;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: left;
      margin-right: 1rem;
      min-width: 100px;
      flex-shrink: 0;
    }
    
    /* Убираем светлый фон первой колонки */
    .md-table-d td:first-child {
      background-color: #ffffff !important;
    }
    .md-table-d td:first-child::before {
      font-size: 0.9rem;
    }
    
    /* Облегчаем текст на мобильном */
    .md-table-d td {
      font-size: 0.9rem;
    }
  }
</style>

<!-- ОБЕРТКА ДЛЯ МОБИЛЬНОЙ ПРОКРУТКИ (на десктопе) -->
<div class="md-table-wrapper">
  <table class="md-table-d">
    <thead>
      <tr>
        <th>Функция Git / GitHub</th>
        <th>Эквивалент в Суверенном контуре</th>
        <th>Механизм защиты и неизменяемости</th>
      </tr>
    </thead>
    <tbody>
      <!-- data-label - это то, что будет написано на мобильном слева -->
      <tr>
        <td data-label="Git / GitHub">Commit Hash</td>
        <td data-label="Суверенный контур">SHA-256 MIME-тела письма + Blockchain Anchor</td>
        <td data-label="Механизм защиты">Вычисление хэша от всего письма и его запись в блокчейн-транзакцию.</td>
      </tr>
      <tr>
        <td data-label="Git / GitHub">Git Timestamp</td>
        <td data-label="Суверенный контур">DKIM-подпись + Block Time</td>
        <td data-label="Механизм защиты">Серверная криптографическая подпись DKIM и номер блока в децентрализованной сети.</td>
      </tr>
      <tr>
        <td data-label="Git / GitHub">Pull Request</td>
        <td data-label="Суверенный контур">Родительский (D0) и Дочерний (D1) хэш-замок</td>
        <td data-label="Механизм защиты">Создание новой почтовой записи со ссылкой на Parent Message-ID и Parent Hash.</td>
      </tr>
      <tr>
        <td data-label="Git / GitHub">Public Audit Trail</td>
        <td data-label="Суверенный контур">Публичный карточный реестр на Hugo</td>
        <td data-label="Механизм защиты">Прозрачное отображение метаданных и хэшей на статическом веб-сайте.</td>
      </tr>
      <tr>
        <td data-label="Git / GitHub">Access Control</td>
        <td data-label="Суверенный контур">Inbound Email Routing & Forwarding</td>
        <td data-label="Механизм защиты">Автоматизированный ролевой допуск к телу файла по зашифрованному запросу.</td>
      </tr>
    </tbody>
  </table>
</div>