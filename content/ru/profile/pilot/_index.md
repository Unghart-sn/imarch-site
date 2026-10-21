---
title: "VIS REALITATIS: Protocol 8888 V.01™"
type: "section"
layout: "list"
translationKey: "vis-realitatis-pilot"
css: ["css/ungchart.css"]
---


<div class="pixel-perfect-square" onclick="togglePlay()" style="
    position: relative; 
    width: 100%; 
    aspect-ratio: 1 / 1; 
    overflow: hidden; 
    border-radius: 8px; 
    cursor: pointer;
    background: #000;">
    
  <video 
    id="mainBannerVideo"
    autoplay 
    muted 
    loop 
    playsinline
    poster="/images/banners/005.jpg"
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);">
    <source src="/video/PILOT_ORIGIN_ASSET.mp4" type="video/mp4">
  </video>

  <div id="soundStatus" style="
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 10px;
      background: rgba(139, 115, 85, 0.8);
      color: white;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;">
      Audio Active
  </div>
</div>

<script>
function togglePlay() {
  const v = document.getElementById('mainBannerVideo');
  const status = document.getElementById('soundStatus');
  
  if (v.muted) {
    v.muted = false;
    status.style.opacity = '1';
    v.play(); 
  } else {
    v.muted = true;
    status.style.opacity = '0';
  }
}
</script>

#### ПИЛОТНИЙ МОДУЛЬ { .fade-in-up }

Пилот Vis Realitatis V.01™ это первый этап практической реализации системы реновации и социальной адаптации Vis Realitatis, основанной на положениях новейшей официально признанной дисциплины Универсальная Формология. 

Пилот Vis Realitatis V.01™  это запуск реновационной системы в прикладном формате. Здесь методология, цифровая фиксация и наукометрия объединены в единую рабочую среду. Каждое действие фиксируется в Хронике и становится частью формирующейся институциональной структуры.

<!-- КНОПКА-ССЫЛКА (вместо медной панели) -->
<div style="text-align: center; margin: 2rem 0;">
  <a href="/ru/profile/pilot/0001/" class="pilot-steel-btn">ГАЙД-МЕНЮ</a>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="pixel-perfect-square" onclick="togglePlay2()" style="
    position: relative; 
    width: 100%; 
    aspect-ratio: 1 / 1; 
    overflow: hidden; 
    border-radius: 8px; 
    cursor: pointer;
    background: #000;">
    
  <video 
    id="mainBannerVideo2"
    autoplay 
    muted 
    loop 
    playsinline
    poster="/images/banners/0038.jpg"
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);">
    <source src="/video/Present-8888.mp4" type="video/mp4">
  </video>

  <div id="soundStatus2" style="
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 10px;
      background: rgba(139, 115, 85, 0.8);
      color: white;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;">
      Audio Active
  </div>
</div>

<script>
function togglePlay2() {
  const v = document.getElementById('mainBannerVideo2');
  const status = document.getElementById('soundStatus2');
  
  if (v.muted) {
    v.muted = false;
    status.style.opacity = '1';
    v.play(); 
  } else {
    v.muted = true;
    status.style.opacity = '0';
  }
}
</script>

#### О ПРОЕКТЕ

Пилот основан на трёх ключевых компонентах: CHRONICAL OS 8888™, SUNLIFE-MASSAGE® и UNIVERSAL FORMOLOGY™.

Они объединены в систему VIS REALITATIS™ и реализуются в рамках IMARCH LTD UK.

Пилот это не этап тестирования, а начальный этап развёртывания системы. В нём участие, доступ и фиксация объединяются в устойчивую институциональную модель.

<!-- КНОПКА "НОВОСТИ" -->
<div style="text-align: center; margin: 2rem 0;">
  <a href="/ru/tags/pilotnews/" class="pilot-steel-btn">ОФИЦИАЛЬНЫЕ КОММЮНИКЕ</a>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="pixel-perfect-square" onclick="controlFilmVideo()" style="position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; border-radius: 8px; cursor: pointer; background: #000;">
    
  <video 
    id="FilmTrailerAsset" 
    autoplay 
    muted 
    loop 
    playsinline
    style="position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; object-fit: cover; transform: translate(-50%, -50%);">
    <source src="/video/Protocol_8888_official_trailer.mp4" type="video/mp4">
  </video>

  <div id="filmSoundStatus" style="position: absolute; top: 15px; right: 15px; padding: 5px 10px; background: rgba(0,0,0,0.6); color: #fff; border-radius: 4px; font-size: 12px; opacity: 0; transition: opacity 0.3s;">
    Audio Active
  </div>
</div>

<script>
function controlFilmVideo() {
  const video = document.getElementById('FilmTrailerAsset');
  const status = document.getElementById('filmSoundStatus');
  
  if (video.muted) {
    video.muted = false;
    status.style.opacity = '1';
    video.play();
  } else {
    video.muted = true;
    status.style.opacity = '0';
  }
}
</script>

<div class="ip-card-wrapper">
  <div class="ip-card">
    <div class="ip-card-inner">
      <div class="ip-title">CatDogging Love: Protocol 8888» — Официальный трейлер проекта</div>
      <div class="ip-text">
        История о границах доверия и силе институциональных протоколов. Каждый шаг участников фиксируется в рамках Протокола 8888, превращая личные переживания в часть глобальной архитектуры. Узнайте, как любовь и контроль переплетаются в единой системе. Переходите к pitch‑deck.
      </div>
      <a href="/ru/profile/pilot/0008/" class="ip-button">Просмотреть pitch‑deck →</a>
    </div>
  </div>
</div>

<!-- ========== АККОРДЕОН 1: ОБЩАЯ ИНФОРМАЦИЯ ========== -->
<details>
  <summary>Общая информация 🔻</summary>
  {{< square-image src="/images/banners/0026.png" alt="Chronicle OS 8888" class="fade-in-up" >}}
  <h4>Chronicle OS 8888</h4>
  <p>Пилот Vis Realitatis V.01™ строится на трёх практиках:</p>
  <ul>
    <li>институциональный дизайн</li>
    <li>образовательные и гуманитарные проекты</li>
    <li>цифровая среда фиксации и координации действий участников</li>
  </ul>
  <p>Пилот формирует первый слой методических модулей и запускает фокус-группу для наукометрического исследования эффективности подхода.<br>Это переход от фрагментированного опыта к воспроизводимой системе.<br>Пилот является стартовой средой для входа в систему.</p>
  <p>Форматы участия различны: от наблюдения до активного вклада.<br>Каждое действие фиксируется в Хронике и становится частью формирующейся институциональной структуры.</p>
  <p>🔹 <strong>Суть Пилота</strong></p>
  <p>Пилот — это пространство входа в систему, в котором участник получает доступ к формирующимся модулям, может включаться в процесс и фиксировать своё участие в Chronicle OS 8888™.<br>Он объединяет участие, доступ и фиксацию в единую рабочую логику.</p>
  <p>🔹 <strong>Уникальность</strong></p>
  <p>Пилот — это не продукт и не курс.<br>Это стадия формирования системы Vis Realitatis™, где участник получает доступ не к витрине, а к процессу.</p>
  <p><strong>Ключевые особенности:</strong></p>
  <ul>
    <li><strong>Фиксация действий</strong> — каждое действие сохраняется в Chronicle OS 8888™ и становится частью институциональной памяти</li>
    <li><strong>Интеграция модулей</strong> — Sunlife-Massage®, Universal Formology™ и Chronicle OS 8888™ объединены в единую среду</li>
    <li><strong>Единая логика</strong> — участие, доступ и фиксация работают как единый процесс</li>
    <li><strong>Институциональный слой</strong> — Пилот формирует основу Центра реновации и адаптации, включая работу с ветеранами</li>
  </ul>
  <p>Пилот выступает как практическая лаборатория новой институциональной формы.</p>
  <p>🔹 <strong>Целевая аудитория</strong></p>
  <ul>
    <li>участники, ищущие структурированный вход в системы и проекты</li>
    <li>практики и специалисты, которым важна фиксация результатов</li>
    <li>команды на стадии формирования</li>
    <li>участники, готовые включаться в развитие системы</li>
  </ul>
  <p>🔹 <strong>Практические задачи</strong></p>
  <ul>
    <li>формирование базовых методических модулей системы Vis Realitatis™</li>
    <li>проведение наукометрических исследований эффективности модулей</li>
    <li>фиксация действий участников для аналитики и прозрачности процессов</li>
    <li>структурирование форм участия и ролей</li>
    <li>формирование хроники проекта как основы развития</li>
  </ul>
  <p>🔹 <strong>Потенциал</strong></p>
  <ul>
    <li>создание методических продуктов</li>
    <li>накопление и систематизация результатов исследований</li>
    <li>формирование ядра участников и партнёров</li>
    <li>разработка воспроизводимой модели входа</li>
    <li>подготовка к масштабированию</li>
    <li>интеграция с образовательными и социальными инициативами</li>
  </ul>
  <p>🔹 <strong>Юридическая рамка</strong></p>
  <p>Пилот реализуется в рамках IMARCH LTD UK как часть системы Chronicle OS 8888™.<br>Все процессы рассматриваются как элементы развивающейся институциональной среды.</p>
  <p>🔹 <strong>Экспертная оценка</strong></p>
  <p>Если вы работаете в научной или прикладной сфере, для вас доступен расширенный формат презентации проекта.</p>
  {{< vis-concept-paper-link >}}

  <h4 style="margin-top:1.5rem">Примечание</h4>
  {{< vis-documents >}}
{{< project-hub >}}
</details>

<!-- ========== АККОРДЕОН 2: СТРУКТУРА ПИЛОТА ========== -->
<details>
  <summary>Структура Пилота 🔻</summary>
  {{< square-image src="/images/banners/Constitution2.png" alt="Chronicle OS 8888" class="fade-in-up" >}}
  <p>🔹 <strong>Презентация Пилота</strong></p>
  <p>Презентация Пилота открыта для ознакомления.</p>
  <p>Вы можете изучить структуру системы и определить формат своего участия.</p>
  <p>Пилот предполагает практическое включение в работу базового методического модуля Центра.</p>
  <p>Выберите удобный для себя формат участия.</p>
  
  <!-- СЛАЙДЫ КАК НАЧАТЬ И ФОРМАТЫ УЧАСТИЯ -->
  <div class="ccs-pitchdeck">
    <div class="slide">
      <div class="slide-header">
        <span>КАК НАЧАТЬ</span>
        <span class="confidential">ВХОД В ПИЛОТ</span>
      </div>
      <h2>Вы можете войти в проект в удобном для вас темпе</h2>
      <div class="grid-3">
        <div class="card">
          <div class="emoji-lg">⏱️</div>
          <h4>3 минуты</h4>
          <p>Понять суть проекта и его возможности</p>
        </div>
        <div class="card">
          <div class="emoji-lg">📋</div>
          <h4>10 минут</h4>
          <p>Разобраться в структуре и логике системы</p>
        </div>
        <div class="card">
          <div class="emoji-lg">🚀</div>
          <h4>30 минут</h4>
          <p>Принять решение об участии</p>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
        <a href="/ru/profile/pilot/0001/" class="btn-more">📖 Перейти к гайд-меню</a>
      </div>
    </div>
    <div class="slide">
      <div class="slide-header">
        <span>ВЫБЕРИТЕ ФОРМАТ УЧАСТИЯ</span>
        <span class="confidential">3 ВАРИАНТА</span>
      </div>
      <div class="grid-3">
        <div class="card">
          <div class="emoji-lg">🚀</div>
          <h4>Присоединиться</h4>
          <p>Начать участие в пилоте, получить доступ к структуре и зафиксировать своё включение.</p>
          <a href="/ru/profile/pilot/0003/" class="card-more">Перейти к форме →</a>
        </div>
        <div class="card">
          <div class="emoji-lg">👁️</div>
          <h4>Следить за развитием</h4>
          <p>Получать обновления проекта, публикации и хронику развития.</p>
          <a href="/ru/profile/pilot/0004/" class="card-more">Подписаться →</a>
        </div>
        <div class="card">
          <div class="emoji-lg">🤝</div>
          <h4>Поддержать проект</h4>
          <p>Поддержать развитие проекта и получить доступ к дополнительным материалам.</p>
          <a href="/ru/profile/pilot/0005/" class="card-more">Поддержать →</a>
        </div>
      </div>
    </div>
  </div>
  
  <p>🔹 <strong>Допуск к материалам Проекта</strong></p>
  <p>Материалы наукометрических исследований, маркетинговой стратегии и цифровой инфраструктуры предоставляются по запросу.</p>
  <p>Доступ открывается представителям организаций и специалистам, заинтересованным в практическом взаимодействии.</p>
  <p>Для получения доступа направьте запрос на корпоративную почту IMARCH LTD UK.</p>
  <p>Доступ будет предоставлен после проверки и верификации запроса.</p>
  {{< morebutton target="https://github.com/Imperium-Silentii/ccs" text="ВХОД ДСП" >}}
  
  <div style="width: 100%; text-align: center; margin: 3rem 0;">
    <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
  </div>
  
  <h3>Связанные проекты</h3>
  <section class="tags-list" style="margin-top:30px;">
    <button onclick="location.href='/ru/profile/director/'">🚀 director</button>
    <button onclick="location.href='/ru/profile/avtomonov/'">🚀 avtomonov</button>
    <button onclick="location.href='/ru/profile/bezrodna/'">🚀 bezrodna</button>
    <button onclick="location.href='/ru/profile/gritsuk/'">🚀 gritsuk</button>
    <button onclick="location.href='/ru/profile/imarch-ltd/'">🚀 imarch-ltd</button>
    <button onclick="location.href='/ru/profile/kalmikov/'">🚀 kalmikov</button>
    <button onclick="location.href='/ru/profile/klay/'">🚀 klay</button>
    <button onclick="location.href='/ru/profile/kravetc/'">🚀 kravetc</button>
    <button onclick="location.href='/ru/profile/mdu/'">🚀 mdu</button>
    <button onclick="location.href='/ru/profile/q-hab/'">🚀 q-hab</button>
    <button onclick="location.href='/ru/profile/schsherban/'">🚀 schsherban</button>
    <button onclick="location.href='/ru/profile/stu-kh-org/'">🚀 stu-kh-org</button>
    <button onclick="location.href='/ru/profile/sunlife-massage/'">🚀 sunlife-massage</button>
    <button onclick="location.href='/ru/profile/vo-dv-27-shvch-kh/'">🚀 vo-dv-27-shvch-kh</button>
    <button onclick="location.href='/ru/profile/vis-realitatis/'">🚀 vis-realitatis</button>
    <button onclick="location.href='/ru/profile/massage-shaolin/'">🚀 massage-shaolin</button>
    <button onclick="location.href='/ru/profile/kovcheg-m-42/'">🚀 kovcheg-m-42</button>
  </section>
</details>

<!-- ========== АККОРДЕОН 3: ОФИЦИАЛЬНАЯ ПОЧТА ========== -->
<details>
  <summary>Официальная почта 🔻</summary>
  {{< square-image src="/images/banners/Contaktus.png" alt="Chronicle OS 8888" class="fade-in-up" >}}
  <p><strong>Политика конфиденциальности IMARCH LTD</strong></p>
  <p>Мы не осуществляем сбор персональных данных посетителей без их прямого запроса или участия в процессах проекта.</p>
  <p>Полученная информация используется исключительно в рамках взаимодействия и не передаётся третьим лицам, за исключением случаев, предусмотренных применимым законодательством.</p>
  <p>По вопросам методической адаптации и сотрудничества вы можете направить официальный запрос на адрес:</p>
  <p><strong>info@imarch.sbs</strong></p>
  <div align="center">
    <a href="mailto:info@imarch.sbs">
      <img class="imarch-icon" src="/images/ikons/silver/email.png" alt="Email">
    </a>
  </div>
</details>

<div class="ip-card-wrapper">
  <div class="ip-card">
    <div class="ip-card-inner">
      <div class="ip-title">Суверенная интеллектуальная собственность</div>
      <div class="ip-text">
        Проект основан на более чем пяти собственных инновациях в логике пользовательского интерфейса, институциональной фиксации и когнитивных протоколах. Все права зарегистрированы в Реестре интеллектуальной собственности IMARCH LTD (Великобритания).
      </div>
      <a href="/ru/profile/pilot/ip-registry/" class="ip-button">Просмотреть запись реестра →</a>
    </div>
  </div>
</div>

<style>
/* ===== ЕДИНЫЙ СТИЛЬ ПИЧ-ДЕК ДЛЯ ФАСАДА ===== */

/* Кнопки-ссылки (стальные, круглые) */
.pilot-steel-btn {
  display: inline-block;
  background: linear-gradient(145deg, #e2e6eb, #c8ccd0, #a8afb8);
  border: 1px solid #8b95a0;
  border-radius: 50px;
  padding: 0.85rem 2.2rem;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #1a1c1e;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6);
  cursor: pointer;
}
.pilot-steel-btn:hover {
  transform: scale(1.02);
  background: linear-gradient(145deg, #eceff2, #d6dadf, #b8bfc6);
  box-shadow: 0 6px 14px rgba(0,0,0,0.15);
}
.pilot-steel-btn:active {
  transform: scale(0.98);
  background: linear-gradient(145deg, #a8afb8, #8b95a0, #6b7580);
}

/* Карточка суверенной IP */
.ip-card-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}
.ip-card {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
.ip-card-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  background: #fdfaf5;
  border: 1px solid #e0d6c8;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 6px 16px rgba(0,0,0,0.05);
  box-sizing: border-box;
}
.ip-card-inner:hover {
  border-color: #c0a070;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.ip-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #2c2416;
  text-transform: uppercase;
  margin-bottom: 1rem;
  word-break: break-word;
}
.ip-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #4a3a2a;
  max-width: 500px;
  margin-bottom: 1.8rem;
  font-weight: 500;
}
.ip-button {
  display: inline-block;
  background: linear-gradient(145deg, #e2e6eb, #c8ccd0, #a8afb8);
  border: 1px solid #8b95a0;
  border-radius: 50px;
  padding: 0.7rem 1.8rem;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #1a1c1e;
  text-decoration: none;
  transition: 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  white-space: nowrap;
}
.ip-button:hover {
  transform: scale(1.02);
  background: linear-gradient(145deg, #eceff2, #d6dadf, #b8bfc6);
}
@media (max-width: 768px) {
  .ip-card-inner { padding: 1.5rem; }
  .ip-title { font-size: 1.3rem; }
  .ip-button { white-space: normal; width: auto; min-width: 180px; }
}
@media (max-width: 480px) {
  .ip-card-inner { padding: 1rem; }
  .ip-title { font-size: 1.1rem; }
  .ip-text { font-size: 0.85rem; }
}

/* Стили для ccs-pitchdeck */
.ccs-pitchdeck .slide {
  padding: 30px 25px;
  background: #ffffff;
  border-radius: 20px;
  margin-bottom: 30px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}
.ccs-pitchdeck .slide-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #8b7355;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 10px;
}
.ccs-pitchdeck .grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.ccs-pitchdeck .card {
  background: #fdfaf5;
  padding: 25px;
  border-radius: 15px;
  border: 1px solid #f0e6d6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ccs-pitchdeck .emoji-lg {
  font-size: 2.5rem;
  margin-bottom: 15px;
}
.ccs-pitchdeck .card h4 {
  margin: 0 0 10px 0;
  color: #2c2416;
  border-left: 3px solid #8b7355;
  padding-left: 10px;
}
.ccs-pitchdeck .card p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
  margin-bottom: 15px;
}
.ccs-pitchdeck .card-more {
  color: #8b7355;
  font-weight: bold;
  text-decoration: none;
  font-size: 0.85rem;
  border-bottom: 1px solid transparent;
  transition: 0.2s;
  align-self: flex-start;
}
.ccs-pitchdeck .card-more:hover {
  border-bottom: 1px solid #8b7355;
}
.btn-more {
  display: inline-block;
  background: linear-gradient(145deg, #e6e6e6, #c0c0c0);
  border: 1px solid #a8a8a8;
  border-radius: 50px;
  padding: 10px 20px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.8rem;
  color: #2c2416;
  transition: 0.2s;
}
.btn-more:hover {
  transform: scale(1.02);
  background: linear-gradient(145deg, #d5d5d5, #b0b0b0);
}
@media (max-width: 768px) {
  .ccs-pitchdeck .slide { padding: 20px 15px; }
  .ccs-pitchdeck .grid-3 { grid-template-columns: 1fr; }
  .btn-more { width: 100%; text-align: center; }
}
</style>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="pixel-perfect-square" onclick="smartToggle(this)" style="
    position: relative; 
    width: 100%; 
    aspect-ratio: 1 / 1; 
    overflow: hidden; 
    border-radius: 8px; 
    cursor: pointer;
    background: #000;
    margin-bottom: 20px;">
    
  <video 
    class="q-hub-video"
    autoplay 
    muted 
    loop 
    playsinline
    preload="auto"
    poster="/images/banners/001.jpg"
    style="
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);">
    <source src="/video/Actor-8888.mp4" type="video/mp4">
  </video>

  <div class="sound-label" style="
      position: absolute;
      top: 15px;
      right: 15px;
      padding: 5px 10px;
      background: rgba(139, 115, 85, 0.8);
      color: white;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 4px;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 10;">
      Audio Active
  </div>
</div>

<script>
function smartToggle(container) {
  const v = container.querySelector('.q-hub-video');
  const status = container.querySelector('.sound-label');
  if (!v || !status) return;
  if (v.muted) {
    v.muted = false;
    v.play();
    status.style.opacity = '1';
  } else {
    v.muted = true;
    status.style.opacity = '0';
  }
}
</script>

#### СТАТУС ПРОЕКТА { .fade-in-up }

Проект центра реновации и социальной адаптации ветеранов VIS REALITATIS™ находится на этапе формирования базового ядра.

Формируется первый реестр сооснователей и участников системы.

Доступ осуществляется через включение сооснователей в официальный реестр реципиентов наградных знаков отличия. 

Включение и ранг сооснователя осуществляется на основании соответствующего экспертного и/или финансового вклада в Проект под гарантиями IMARCH LTD (Великобритания).

Регистрационный номер: 16791765

{{< steel_button link="/ru/profile/vis-realitatis/donor/" text="СТАТЬ СООСНОВАТЕЛЕМ" >}}

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="ip-card-wrapper">
  <div class="ip-card">
    <div class="ip-card-inner">
      <div class="ip-title">Реестр награждённых знаками отличия – Vis Realitatis Project (2024–2026)</div>
      <div class="ip-text">
        Все участники проекта, внесшие экспертный или финансовый вклад, представляются к награждению институциональными знаками отличия. Уровень награды соответствует масштабу их вклада в реализацию проекта и закрепляется от имени IMARCH LTD.
      </div>
      <a href="/ru/profile/pilot/0009/" class="ip-button">Подробнее о реестре →</a>
    </div>
  </div>
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<section class="tags-list">
<button onclick="location.href='/ru/profile/vis-realitatis/'">🏛️ Главная</button>
<button onclick="location.href='/ru/profile/pilot/'">🚀 Пилот</button>
<button onclick="location.href='/ru/profile/pilot/0019/'">📑 Документы проекта</button>
<button onclick="location.href='/ru/profile/ccs/'">💾 CCS</button>
<button onclick="location.href='/ru/profile/mdu/'">🧩 MDU</button>
<button onclick="location.href='/ru/profile/sunlife-massage/'">💆 Sunlife-Massage®</button>
<button onclick="location.href='/ru/profile/pilot/0008/'">🎬 Трейлер Protocol 8888</button>
<button onclick="location.href='/ru/profile/pilot/ip-registry/'">📜 Реестр Ноу-Хау</button>
<button onclick="location.href='/ru/profile/pilot/0009/'">👥 Реестр реципиентов</button>
<button onclick="location.href='https://github.com/Imperium-Silentii/IMARCH-CCS-8888/'">🐙 GitHub</button>
</section>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<!-- БЛОК: КОНТУР СВЯЗИ -->
## Контур связи: Хроника Протокола 8888

Подключитесь к контуру фиксации действий, чтобы получать подтверждения этапов, публикации артефактов и переходы проекта между фазами.

<div style="background: #fdfaf5; border: 1px solid #e0d6c8; border-radius: 16px; padding: 1.5rem; margin: 2rem 0;">
  <p style="margin-top:0;"><strong>Назначение канала:</strong> не новости и не маркетинг, а хроника Протокола 8888.</p>
  <p><strong>Что будет фиксироваться:</strong> запуск этапов, публикация отчетов, новые артефакты, подтверждения действий и переходы между контурами.</p>
  <p><strong>Форма подключения:</strong> регистрация в контуре связи выполняется через MailerLite.</p>

  <div class="protocol-8888-mailerlite">
    <div class="ml-embedded" data-form="5f7UbI"></div>
  </div>
</div>

<script>
  (function(w,d,e,u,f,l,n){
    w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
    l=d.createElement(e);
    l.async=1;
    l.src=u;
    n=d.getElementsByTagName(e)[0];
    n.parentNode.insertBefore(l,n);
  })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
  ml('account', '2294998');
</script>

<style>
.protocol-8888-mailerlite {
  margin-top: 1rem;
  width: 100%;
}

.protocol-8888-mailerlite,
.protocol-8888-mailerlite * {
  box-sizing: border-box;
  font-family: inherit !important;
}

.protocol-8888-mailerlite .ml-embedded {
  width: 100%;
}

.protocol-8888-mailerlite iframe,
.protocol-8888-mailerlite form,
.protocol-8888-mailerlite input,
.protocol-8888-mailerlite button,
.protocol-8888-mailerlite textarea,
.protocol-8888-mailerlite select {
  max-width: 100%;
  border-radius: 12px;
}

.protocol-8888-mailerlite button,
.protocol-8888-mailerlite input,
.protocol-8888-mailerlite textarea,
.protocol-8888-mailerlite select {
  font: inherit !important;
}
</style>

<p style="font-size: 0.75rem; color: #6a5a48; text-align: center; margin-top: 0.5rem;">© Oleksandr Purpurov 2026 IMARCH LTD UK Institutional Registry. All rights reserved. Unauthorised redistribution or re-upload is prohibited.</p>

&nbsp;

<div class="emoji-teaser">
    <div class="teaser-emoji">🏛️</div>
</div>

#### ХРОНИКА

<!-- КНОПКА VIS REALITIS CENTER (вместо медной панели) -->
<div style="text-align: center; margin: 2rem 0;">
  <a href="/ru/profile/vis-realitatis/" class="pilot-steel-btn">VIS REALITIS CENTER</a>
</div>

#### Социальные сети

Хроника  Пилота Vis Realitatis V.01™ это пространство, где собраны презентации и новости проекта, истории наших специалистов, отзывы клиентов и практические кейсы. 

<details>
  <summary style="color: #333; background-color: #cccccc; border: 1px solid #b3b3b3; text-align: center;">
    Содержание
  </summary>

  {{< persona-socials >}}

<style>
.persona-header-clean {
  text-align: left;
  margin-bottom: 1.5rem;
}
.persona-title {
  font-size: 1.9rem;
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
}
.persona-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0.3rem 0 1rem;
  opacity: 0.75;
}
.persona-teaser {
  font-size: 1rem;
  line-height: 1.5;
  color: #444;
  margin-bottom: 1.5rem;
}
details {
  margin-bottom: 1em;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: #fafafa;
  transition: all 0.3s ease;
}
summary {
  padding: 1em;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
  font-size: 1rem;
}
summary::marker {
  content: "▶ ";
  color: #666;
}
details[open] summary::marker {
  content: "▼ ";
}
details[open] {
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  background: #fff;
}
details[open] summary {
  background: #f0f8ff;
  border-bottom: 1px solid #ccc;
}
.accordion-content {
  padding: 0.8rem 1rem;
  text-align: left;
}
.soft-button {
  display: block;
  width: 100%;
  padding: 9px 12px;
  margin: 0.3rem 0;
  background: #f5f5f5;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 0.92rem;
  font-weight: 400;
  transition: all 0.25s ease;
}
.soft-button:hover {
  background: #ebebeb;
  transform: translateX(3px);
}
</style>

&nbsp;

{{< square-image-en
     src="/images/banners/0030.png"
     alt="Consilium — scene of institutional thinking and recognition" >}}

#### ХРОНИКА ПРОЕКТА { .fade-in-up }

Здесь мы также освещаем научно‑метрическую часть, которая формирует основу бренда Vis Realitatis V.01™  

<details>
  <summary>Кейсы разработок</summary>
  <div class="accordion-content">
    <a href="/ru/fc/post_0001/" class="soft-button">
      📝 БАЗОВЫЙ ПРОЕКТ ДЛЯ IMARCH LTD
    </a>
    <a href="/ru/fc/post_0003/" class="soft-button">
      📝 ПИЛОТНАЯ ПРОГРАММА VIS REALITATIS
    </a>
    <a href="/ru/fc/post_0002/" class="soft-button">
      📝 БАЗОВЫЙ МОДУЛЬ IMARCH Founding Cohort 01
    </a>
    <a href="#" class="soft-button">
      📝 КОНКРЕТНЫЕ КЕЙСЫ
    </a>
    <a href="#" class="soft-button">
      📝 ОТЗЫВЫ
    </a>
  </div>
</details>


<details>
  <summary>Теретические основы</summary>
  <div class="accordion-content">
    <a href="#" class="soft-button">
      📝 ВВЕДЕНИЕ В УФ УСС ОБЖД
    </a>
    <a href="#" class="soft-button">
      📝 КОДЕКС УНИВЕРСАЛЬНОЙ ФОРМОЛОГИИ
    </a>
    <a href="#" class="soft-button">
      📝 ОСНОВЫ ФОРМОЛОГИЧЕСКОГО КОНСАЛТИНГА
    </a>
  </div>
</details>

<p style="margin-top: 2rem; font-style: italic; color: #666;">
  Хроника регулярно пополняется новыми материалами и источниками.  
  Следите за обновлениями!
</p>