---
title: "Третий пост с картинкой"
date: 2025-10-01
draft: false
tags: ["portrait", "action", "inspiration"]
translationKey: "scene-unghart-0003"
---

<div class="banner constitution-banner">
<img src="/images/persona/005-6.png" alt="Картинка-обложка первого поста" />
</div> 

{{< morebutton target="https://unghart.imarch.sbs/ru/" text="🌐 ЛИЧНЫЙ САЙТ" >}}
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<details>
  <summary>Рабочая демо-версия профиля🔻</summary>

>Внимание! Данная страница является демонстрацией этапной разработки фронэнда персонального профиля сценической маски со статусом гражданства Имархии в экосситеме консорциума PLATAN+. 
В блоге "Цитадель" вы найдёте репосты статей с моего личного официального сайта-маскти, где я подробнее рассказываю о системе представительского кластера ПРОФИЛЬ - ЛИЧНЫЙ САЙТ - КОНСОРЦИМ-ОФИС и раскрываю смысл и спектр задач, которые закрывает такой инструмент реализации ваших замыслов.

</details> 

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<style>
.personal-site-btn-visitka {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, 
    rgba(44, 62, 80, 0.95), 
    rgba(74, 100, 145, 0.95));
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 60px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none;
  box-shadow: 
    0 10px 25px rgba(44, 62, 80, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 2px 0 rgba(255, 255, 255, 0.15) inset;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.personal-site-btn-visitka::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(212, 175, 55, 0.2), 
    transparent);
  transition: left 0.7s ease;
}

.personal-site-btn-visitka:hover {
  background: linear-gradient(135deg, 
    rgba(44, 62, 80, 1), 
    rgba(74, 100, 145, 1));
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(44, 62, 80, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  border-color: rgba(212, 175, 55, 0.4);
}

.personal-site-btn-visitka:hover::before {
  left: 100%;
}

.personal-site-btn-visitka:hover .btn-arrow {
  transform: translate(3px, -3px);
}

.personal-site-btn-visitka:hover .btn-icon {
  transform: rotate(15deg) scale(1.1);
}

.btn-icon {
  font-size: 1.4rem;
  transition: transform 0.3s ease;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
}

.btn-text {
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.btn-arrow {
  font-size: 1.2rem;
  opacity: 0.9;
  transition: transform 0.3s ease;
}

/* Эффект золотого свечения при наведении */
.personal-site-btn-visitka::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, 
    transparent, 
    rgba(212, 175, 55, 0.1), 
    transparent);
  border-radius: 62px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.personal-site-btn-visitka:hover::after {
  opacity: 1;
}

/* Адаптивность */
@media (max-width: 600px) {
  .personal-site-btn-visitka {
    padding: 0.9rem 1.8rem;
    font-size: 1rem;
    gap: 10px;
  }
  
  .btn-icon {
    font-size: 1.3rem;
  }
}

/* Стили для аккордеонов с благородным серым */
details {
  margin-bottom: 1em;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  background: #f8f8f8;
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
  background-color: #cccccc !important;
  color: #333 !important;
  border: 1px solid #b3b3b3 !important;
  border-radius: 6px 6px 0 0;
  position: relative;
}

summary::before {
  content: "▾ ";
  color: #666;
  margin-right: 6px;
}

details[open] summary::before {
  content: "▴ ";
}

details[open] {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  background: #fff;
}

details[open] summary {
  background: #cccccc !important;
  border-bottom: 1px solid #b3b3b3;
}

.accordion-content {
  padding: 1.2rem;
  text-align: left;
}

.soft-button {
  display: block;
  width: 100%;
  padding: 10px 14px;
  margin: 0.5rem 0;
  background: #f0f0f0;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  border: 1px solid #d6d6d6;
  font-size: 0.95rem;
  font-weight: 400;
  transition: all 0.25s ease;
  text-align: left;
}

.soft-button:hover {
  background: #e6e6e6;
  transform: translateX(4px);
  border-color: #b3b3b3;
}
</style>


&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-1-2.png" alt="Консилиум сцена институционального мышления и признания" />
</div>

### ЛИЧНЫЙ АРХИВ
Официальная документация моего сценического гражданства Имархии, отражающая мой статус, компетенции и участие в миссиях Проекта

<details>
  <summary>Документы</summary>
  <div class="accordion-content">
    <a href="/ru/tituli/testimonium-civitatis-unghart/" class="soft-button">
      🛂 СЦЕНИЧЕСКИЙ ПАСПОРТ
    </a>
    <a href="/docs/acts/memorandum" class="soft-button">
      📋 МЕРОМАНДУМЫ
    </a>
    <a href="/docs/acts/statements" class="soft-button">
      🗣️ ЗАЯВЛЕНИЯ
    </a>
    <a href="/docs/acts/alliances" class="soft-button">
      🤝 СЦЕНИЧЕСКИЕ СОЮЗЫ
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 ПРОТОКОЛЫ
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 АРХИВ
    </a>
  </div>
</details>


<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;


[Unghart © 2025](/en/unghart/)

{{< discussion >}}

<details class="imarch-module">
  <summary>Social Media ▾</summary>

  {{< persona-socials >}}


{{< discussion >}}