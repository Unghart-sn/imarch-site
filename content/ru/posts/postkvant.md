---
title: "Архитектура доверия Imarch"
description: "Объяснение структуры профиля и системы субдоменов: как и почему это устроено в рамках единой платформы."
date: 2025-12-29
author: "Unghart-sn"
categories: ["solutions", "токенизация", "решения"]
tags: ["social-interaction"]
form_type: "foundation"
show_contacts: true  # <-- Ключевая строка. Без неё виджет не отобразится.
image: "/images/bureaucracy-hell.jpg"
weight: 1
translationKey: "trust-architecture"
draft: false
---

<div class="blog-button-icon" style="
    font-size: 3.8rem;
    margin-bottom: 1.2rem;
    text-shadow: 
        0 0 15px rgba(44, 120, 115, 0.6),
        0 0 25px rgba(44, 120, 115, 0.4),
        0 0 35px rgba(44, 120, 115, 0.3);
    animation: glowPulse 2s ease-in-out infinite alternate;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    line-height: 1;
">
    <span style="
        display: inline-block;
        animation: emojiBounce 3s ease-in-out infinite;
    ">🏛️</span>
    <span style="
        display: inline-block;
        animation: emojiBounce 3s ease-in-out infinite 0.5s;
    ">🧱</span>
    <span style="
        display: inline-block;
        animation: emojiBounce 3s ease-in-out infinite 1s;
    ">🔐</span>
</div>

<style>
@keyframes glowPulse {
    0% {
        text-shadow: 
            0 0 15px rgba(44, 120, 115, 0.6),
            0 0 25px rgba(44, 120, 115, 0.4),
            0 0 35px rgba(44, 120, 115, 0.3);
        transform: scale(1);
    }
    100% {
        text-shadow: 
            0 0 20px rgba(44, 120, 115, 0.8),
            0 0 30px rgba(44, 120, 115, 0.6),
            0 0 40px rgba(44, 120, 115, 0.4);
        transform: scale(1.05);
    }
}

@keyframes emojiBounce {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
    }
    25% {
        transform: translateY(-8px) rotate(-5deg);
    }
    50% {
        transform: translateY(0) rotate(0deg);
    }
    75% {
        transform: translateY(-4px) rotate(5deg);
    }
}

.blog-button-card:hover .blog-button-icon span {
    animation: rockAndRoll 0.5s ease-in-out;
}

@keyframes rockAndRoll {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-15deg) scale(1.1); }
    75% { transform: rotate(15deg) scale(1.1); }
    100% { transform: rotate(0deg) scale(1); }
}
</style>

## Личный профиль, субдоменная маска и постквантовая подпись как основа цифровой субъектности

{{< youtube-enhanced 
    id="aLNwkPVm1xA" 
    caption="Видео о гуманитарном исходном коде" 
    autoplay="0"
>}}

В мире социальных сетей человек перестал быть субъектом.  
Он стал потоком контента, который исчезает в общем шуме. Посты тонут в новостной ленте, авторство размывается, репосты не имеют юридической силы, а система доверия строится на лайках, скорости внимания и алгоритмах.

Платформа **imarch.sbs** создавалась как альтернатива всей этой «пустой игре в коммуникацию».  
Не как ещё одна соцсеть, а как **институциональная архитектура доверия**, где:

- каждый акт имеет форму,  
- каждый субъект имеет маску,  
- каждый пост имеет подпись,  
- каждый репост становится актом цитирования.  

Это не попытка «улучшить Facebook».  
Это шаг в сторону: от развлечения к ответственным цифровым действиям.

---

## Почему мир нуждается в архитектуре доверия

Современная цифровая среда страдает от трёх фундаментальных проблем:

### Потеря авторства

Невозможно доказать, кто опубликовал текст первым.  
Легко удалять, копировать, подделывать.

### Отсутствие верифицируемости

Лайк или репост ничего не подтверждают.  
Это не акт признания, не документ, не доказательство.

### Крах Web2‑доверия

Централизованные платформы владеют алгоритмами, данными, контекстами.  

А значит, владеют **информацией**.  

Пользователь здесь лишь "пассажир общественного транспорта".

---

## Концепция Imarch: субъектность через сценическую маску

В Imarch субъект это **маска**, обладающая:

- цифровым офисом (субдоменным сайтом и почтой)  
- подписью  
- историей документов  
- актами верификации  
- репутацией  
- кругом доверия  

Маска  это не безликий ник.  
Это **цифровая форма**, признанная системой.  

Так же как в классических институтах:  
титул → ответственность → право публиковать → право подписывать акты.

---

## Субдоменный сайт маски: место рождения оригинала

Каждая маска получает свой адрес:

maskname.imarch.sbs


Здесь публикуются **оригиналы**: статьи, акты, меморандумы, заявления.  

У каждого оригинала есть:

- открытый ключ  
- постквантовая подпись (CRYSTALS‑Dilithium)  
- хэш-код верификации содержания  
- ссылка на верификатор  

Любой читатель может проверить: кем подписано, когда опубликовано, изменялся ли текст.  

👉 Это превращает цифровой документ в **акт**, а не в пост.

---

## Личный профиль: Цитадель Доверия

Информационная лента пользователя в Imarch — это **не блог**, а «Цитадель Доверия».  

Здесь:

- отображаются репосты → акты цитирования  
- видны связи → круги доверия  
- фиксируется участие в системе  
- собирается репутационный след  

Профильэто интерфейс, но не субъект.  

Субъект это верифицируемая сценическая маска.

---

## Постквантовая подпись (CRYSTALS‑Dilithium)

Обычная криптография умрёт после появления массовых квантовых компьютеров.  

RSA и ECC будут взламываться за минуты.  

Поэтому Imarch использует **постквантовый стандарт**, принятый NIST:  

### CRYSTALS‑Dilithium

Он обеспечивает:

- устойчивость к квантовому взлому  
- долгосрочное хранение документов  
- проверяемость на десятки лет вперёд  

Подпись хранится:

- на субдомене  
- в профиле  
- в системной базе верификаций 
- в QR‑актах  

👉 Это защита вашего цифрового **будуюшего**.

---

## Схема цитирования: репост как акт признания

В Web2 репост — это просто пересылка.  

В imarch.sbs — это акт признания:

1. Маска публикует оригинал  
2. Пользователь цитирует его в своём профиле  
3. Цитирование подписывается  
4. Система фиксирует «кто кого признал»  

Это:

- документ  
- цифровой след  
- репутационный акт  
- связь между двумя субъектами  

Фактически это **"мини‑научная" система цитирования**, адаптированная под социальную среду.

---

## Геймификация доверия и реферализация

Система строит:

- **Счётчики доверия** — сколько раз твои публикации процитировали.  
- **Реферальные круги** — кого ты привёл в систему.  
- **Уровни субъектности** — Новичок → Активатор → Оператор → Участник → Субъект доверия.  

Эти механизмы работают не как игрушки, а как **инструменты роста цифровой репутации**.

---

## Чем Imarch отличается от Facebook

Facebook — это:  
- контентный шум  
- алгоритмы  
- исчезающие посты  
- отсутствие автора  
- невозможность доказательства происхождения  

Imarch — это:  
- субъект → маска  
- оригинал → подпись  
- репост → акт признания  
- профиль → витрина доверия  
- система → архитектура документированных действий  

### Метафоры
- Игрушечная касса vs бухгалтерский аппарат  
- Пластиковый меч vs боевое оружие на учёте  
- «Набор врача» для детей vs настоящая операционная  
- Холст по номерам vs картина художника  
- Надпись на заборе vs нотариально заверенный документ  
- Конструктор Lego vs архитектурный проект  

👉 Одна модель это шум. Вторая это структура.

---

## Платформа, где каждый становится субъектом

Личный профиль и субдоменный сайт маски — это:  
- субъектность  
- цифровое авторство  
- доказуемость происхождения  
- сеть доверия  
- система репутации  
- постквантовая подпись  

**Imarch это переход от игры к институту, от шума к структуре, от пользователя к субъекту.**

---

{{< landing-min >}}

  <div style="text-align:left; max-width:800px; margin:0 auto;">
    <p><em>Сценическое гражданство</em> — ключевая функция платформы imarch.sbs.</p>
    <p>Каждый участник получает <strong>сценическое имя</strong> и <strong>маску</strong>, которые выступают как юридически верифицируемая личность.</p>
    <p>Это решение обеспечивает <strong>защиту авторских прав</strong> и признание субъектности в публичной деятельности.</p>
    <p>При этом сохраняется <strong>инкогнито в бытовой жизни</strong>: маска отделяет частное от профессионального.</p>
    <p>Такое разделение является <strong>обязательным условием</strong>, исключающим любые попытки буллинга, дискриминации или давления на личность.</p>
    <p>Каждый акт публикации и цитирования подтверждается <strong>постквантовой подписью</strong>, что делает систему доверия прозрачной и защищённой.</p>
  </div>

  <div style="background:linear-gradient(145deg,#fefefe,#f5f0eb); border-radius:12px; padding:1.75em; margin:2em auto; max-width:700px; box-shadow:0 4px 20px rgba(75,46,46,0.08),0 0 0 1px rgba(75,46,46,0.05) inset;">
    <p style="font-size:0.9em; color:#2c1810; font-style:italic;">
      Таким образом, «сценическое гражданство» — это не игра, а архитектура доверия:  
      личность защищена, авторство признано, а социальная среда очищена от буллинга и дискриминации.
    </p>
  </div>
</details>

<details>
  <summary>Post Scriptum 🔻</summary>

<div style="text-align: left !important; max-width: 800px; margin: 0 auto; padding-left: 0 !important; padding-right: 0 !important;"> <div style="text-align: left !important; margin-left: 0 !important; padding-left: 0 !important; display: block !important;"> <p style="text-align: left !important; margin-left: 0 !important;"><em><a href="https://imarch.sbs/ru/verdictum/verdictum-0003/">IMARCH LTD</a></em></p> <p style="text-align: left !important; margin-left: 0 !important;">Электронная почта: <a href="mailto:admin@imarch.sbs">admin@imarch.sbs</a></p> <p style="text-align: left !important; margin-left: 0 !important;"><em>2025.12.22, <a href="https://imarch.sbs/ru/verdictum/0008/">ВЕРДИКТ</a></em></p> <p style="text-align: left !important; margin-left: 0 !important;"><a href="https://github.com/Imperium-Silentii/imarch-documents-official/blob/main/proposals/memorandum-ano-vis-realitatis-2025-12-22.pdf">memorandum-ano-vis-realitatis-2025-12-10-la.pdf</a></p> <p style="text-align: left !important; margin-left: 0 !important; font-size: 0.9em; color: #666;"><em>Примечание: В значении криптографического хеша указан SHA-256 оригинального документа на латыни</em></p> </div> </div><div style="background: linear-gradient(145deg, #fefefe, #f5f0eb); border: none; border-radius: 12px; padding: 1.75em; margin: 2em auto; max-width: 700px; box-shadow: 0 4px 20px rgba(75, 46, 46, 0.08), 0 0 0 1px rgba(75, 46, 46, 0.05) inset;"> <details> <summary style="font-weight: 700; font-size: 1.25em; cursor: pointer; color: #2c1810; padding: 0.75em 1em; background: #fff; border-radius: 8px; border: 1px solid #e8dcd3; box-shadow: 0 2px 8px rgba(75, 46, 46, 0.05); display: flex; align-items: center; justify-content: space-between; list-style: none;"> <span>КРИПТОГРАФИЧЕСКАЯ ПОДПИСЬ (SHA-256 оригинального латинского документа)</span> <span style="font-size: 0.9em; color: #8b7355;">🔻</span> </summary> <div style="margin-top: 1.75em;"> <pre style="background: #f8f4f0; padding: 1.25em; border-radius: 8px; overflow-x: auto; margin: 0; font-family: 'Courier New', 'Cascadia Code', monospace; font-size: 0.95em; line-height: 1.6; border: 1px solid #e8dcd3; color: #2c1810; white-space: pre-wrap; word-break: break-all;"> a75d7fee40a786701890a67465efbc5fafac5d5ba60bdea7db8b1402b342e85e </pre> <div style="margin-top: 1em; display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; color: #8b7355;"> <span>✓ Хеш оригинала на латыни • 64 символа</span> <button onclick="navigator.clipboard.writeText('a75d7fee40a786701890a67465efbc5fafac5d5ba60bdea7db8b1402b342e85e')" style="background: transparent; color: #8b7355; border: 1px solid #d4c4b8; padding: 0.4em 1em; border-radius: 6px; font-size: 0.9em; cursor: pointer;" onmouseover="this.style.backgroundColor='#f5f0eb'; this.style.borderColor='#8b7355';" onmouseout="this.style.backgroundColor='transparent'; this.style.borderColor='#d4c4b8';"> Копировать </button> </div> <p style="font-size: 0.85em; color: #8b7355; margin-top: 1em; font-style: italic;"> *Данный SHA-256 соответствует оригинальному документу на латыни. Русская версия является его официальным переводом и валидируется по этому хешу. </p> </div> </details> </div> </details>
