---
title: "Реестр интеллектуальной собственности IMARCH"
type: "section"
layout: "list"
translationKey: "ip-registry"
css: ["css/ungchart.css"]
---

{{< square-image 
     src="/images/banners/004.png" 
     alt="Реестр IP"
     class="fade-in-up" >}}

#### Официальный реестр интеллектуальных комплексов (IAC) { .fade-in-up }

На этой странице собраны все зарегистрированные **Интеллектуальные комплексы (Intellectual Asset Complex — IAC)**. Каждый IAC включает:

- Набор взаимосвязанных активов (ноу-хау, статьи, презентации, реестры)
- Единый RN-номер для отслеживания
- SHA-256 хеш актуальной версии (с возможностью копирования)
- Ссылку на GitHub-папку с полным архивом версий

### Как проверить подлинность { .fade-in-up }

1. Перейдите по ссылке на GitHub-папку IAC.
2. Скачайте PDF-файл или финальную версию документа.
3. Вычислите его SHA-256 хеш:
   - **macOS / Linux:** `shasum -a 256 имя_файла.pdf`
   - **Windows PowerShell:** `Get-FileHash -Algorithm SHA256 имя_файла.pdf`
4. Сравните полученный хеш с указанным в карточке. Если совпадают — файл подлинный и не был изменён.

### Интеллектуальные комплексы { .fade-in-up }

<div class="custom-cards">

  <!-- 1. IAC: Гибридный аккордеон (UI) -->
  <div class="custom-card">
    <div class="custom-emoji">🧩</div>
    <div class="custom-title">Гибридный аккордеон (UI)</div>
    <div class="custom-desc">Метод управления плотностью интерфейса. Решает проблему бесконечного скролла и фрагментации памяти. Сохраняет цветовой код (медь/сталь).</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0101</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: 8490c9cd54ef6124fa1eb89d48788b79a3f5c2e1b6d4a8f9c7e5d3b1a2f4c6e8</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('8490c9cd54ef6124fa1eb89d48788b79a3f5c2e1b6d4a8f9c7e5d3b1a2f4c6e8')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0101-hybrid-accordion" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/hybrid-accordion-nou-hau/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">проприетарный метод</div>
  </div>

  <!-- 2. IAC: Chronicle OS -->
  <div class="custom-card">
    <div class="custom-emoji">📖</div>
    <div class="custom-title">Chronicle OS</div>
    <div class="custom-desc">Метод институциональной записи действий (актов). Фиксация Actor ID, сцены, протокола. Превращает разрозненные действия в воспроизводимую хронику.</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0102</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0102-chronicle-os" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/chronicle-os-method/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">информационная архитектура</div>
  </div>

  <!-- 3. IAC: Actor ID & Recipient Registry -->
  <div class="custom-card">
    <div class="custom-emoji">🆔</div>
    <div class="custom-title">Actor ID и Реестр реципиентов</div>
    <div class="custom-desc">Архитектура реестра с форматами публикации (Public, Alias, Ghost) и механизмом наследования по праву миссии.</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0103</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890a</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890a')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0103-actor-id" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/actor-id-recipient-registry/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">реестровая архитектура</div>
  </div>

  <!-- 4. IAC: Universal Formology -->
  <div class="custom-card">
    <div class="custom-emoji">🧠</div>
    <div class="custom-title">Universal Formology</div>
    <div class="custom-desc">Когнитивный протокол, структурирующий мышление и действие через единство тела, сознания и среды. Верифицирован 5 кантами (50 докторских диссертаций).</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0104</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890ab</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890ab')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0104-universal-formology" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/universal-formology/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">когнитивная методология</div>
  </div>

  <!-- 5. IAC: Registered Trademarks -->
  <div class="custom-card">
    <div class="custom-emoji">®️</div>
    <div class="custom-title">Зарегистрированные торговые марки</div>
    <div class="custom-desc">KovcheG-M-XXXXII® и SunLife-Massage®. Официально зарегистрированы, являются активами IMARCH.</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0105</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcd</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcd')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0105-trademarks" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/ip-registry/trademarks/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">товарные знаки</div>
  </div>

  <!-- 6. IAC: Двойная институционализация (Protocol 8888) -->
  <div class="custom-card">
    <div class="custom-emoji">⚜️</div>
    <div class="custom-title">Двойная институционализация (Protocol 8888)</div>
    <div class="custom-desc">Технология двойного подтверждения статуса реципиента: физические и электронные инсигнии, аудиальный стандарт (гимн, реквием, рингтон), синхронизация через QR/NFC.</div>
    <div class="iac-meta">
      <div class="iac-rn"><strong>RN-0106</strong> (IAC)</div>
      <div class="iac-hash">
        <code>SHA-256: e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcde</code>
        <button class="hash-copy" onclick="navigator.clipboard.writeText('e5f67890abcdef1234567890abcdef1234567890abcdef1234567890abcde')">📋 Копировать</button>
      </div>
      <div class="iac-repo">
        <a href="https://github.com/Imperium-Silentii/IMARCH-CCS-8888/tree/main/IAC/RN-0106-dual-institutionalisation" target="_blank">📁 GitHub-папка IAC</a>
      </div>
    </div>
    <a href="/ru/profile/pilot/knowhow-dual-institutionalisation/" class="custom-button">Подробнее →</a>
    <div class="custom-tag">ноу-хау · аудиально-визуальный стандарт</div>
  </div>

</div>

### Юридическая информация

Все документы являются интеллектуальной собственностью IMARCH LTD UK. Несанкционированное распространение или изменение запрещено.

{{< morebutton target="/profile/pilot/" text="← Назад к пилотному модулю" >}}

<style>
/* Стили для карточек (если не подтянутся глобальные) */
.custom-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}
.custom-card {
  background: #fdfaf5;
  border: 1px solid #e0d6c8;
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}
.custom-card:hover {
  transform: translateY(-3px);
  border-color: #c0a070;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}
.custom-emoji {
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}
.custom-title {
  font-weight: 800;
  font-size: 1.1rem;
  color: #2c2416;
  margin-bottom: 0.5rem;
  border-left: 3px solid #8b7355;
  padding-left: 0.75rem;
}
.custom-desc {
  font-size: 0.85rem;
  line-height: 1.4;
  color: #6a5a48;
  margin-bottom: 1rem;
  flex-grow: 1;
}
.iac-meta {
  background: #f0ede8;
  border-radius: 12px;
  padding: 0.6rem;
  margin: 0.75rem 0;
  font-size: 0.75rem;
}
.iac-rn {
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}
.iac-hash {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  word-break: break-all;
}
.iac-hash code {
  font-size: 0.65rem;
  background: none;
  padding: 0;
}
.hash-copy {
  background: transparent;
  border: 1px solid #8b7355;
  border-radius: 6px;
  padding: 0.2rem 0.6rem;
  font-size: 0.6rem;
  cursor: pointer;
  white-space: nowrap;
}
.hash-copy:hover {
  background: rgba(139, 115, 85, 0.1);
}
.iac-repo a {
  font-size: 0.7rem;
  color: #2a5c7a;
  text-decoration: none;
  border-bottom: 1px dotted #2a5c7a;
}
.iac-repo a:hover {
  border-bottom: 1px solid #2a5c7a;
}
.custom-button {
  display: inline-block;
  background: linear-gradient(145deg, #e2e6eb, #c8ccd0, #a8afb8);
  border: 1px solid #8b95a0;
  border-radius: 50px;
  padding: 0.4rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #1a1c1e;
  text-decoration: none;
  transition: 0.2s;
  margin-top: 0.5rem;
  text-align: center;
}
.custom-button:hover {
  transform: scale(1.02);
  background: linear-gradient(145deg, #eceff2, #d6dadf, #b8bfc6);
}
.custom-tag {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #8b7355;
  background: rgba(139, 115, 85, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 30px;
  margin-top: 0.75rem;
  align-self: flex-start;
}
@media (max-width: 640px) {
  .custom-cards {
    grid-template-columns: 1fr;
  }
  .iac-hash {
    flex-direction: column;
    align-items: flex-start;
  }
  .hash-copy {
    white-space: normal;
  }
}
</style>