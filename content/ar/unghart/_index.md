---
title: "UNGHART"
type: "section"
translationKey: "scene-unghart"
layout: list
css: ["css/ungchart.css"]
---

<div class="banner constitution-banner">
<img src="/images/persona/sigillum.png" alt="مشهد مجمع التفكير المؤسسي والاعتراف" />
</div>

### حارس حقيقة الصمت | مهندس علم الأشكال | استراتيجي PLATAN⁺

مرحبًا بكم في مسرحي الشخصي. هنا أجمع الإلهام، وأشارك الأفكار، وأوضح المسار الذي يقود من الأفكار إلى أنظمة حية.

{{< morebutton target="/ru/unghart/" text="🔔 الاشتراك" >}}
</div>

{{< morebutton target="https://unghart.imarch.sbs/ru/" text="🌐 الموقع الشخصي" >}}
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<details>
  <summary>نسخة تجريبية عاملة للملف الشخصي🔻</summary>

>انتباه! هذه الصفحة هي عرض لتطوير الواجهة الأمامية الجاري للملف الشخصي لقناع مسرحي ذي وضعية الجنسية في إيماركيا، ضمن نظام كونسورتيوم PLATAN+.
> في المدونة "القلعة"، ستجدون إعادة نشر مقالات من موقع قناعي الشخصي الرسمي، حيث أناقش بتفصيل أكثر نظام مجموعة التمثيل الشخصي - الموقع الشخصي - مكتب الكونسورتيوم وأكشف المعنى ونطاق المهام التي تنجزها أداة كهذه لتحقيق أفكاركم.

</details> 

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<style>
/* التعديلات الأساسية للاتجاه من اليمين لليسار */
body[dir="rtl"] .personal-site-btn-visitka,
body[dir="rtl"] details,
body[dir="rtl"] summary,
body[dir="rtl"] .accordion-content,
body[dir="rtl"] .soft-button,
body[dir="rtl"] .persona-header-clean,
body[dir="rtl"] .persona-teaser,
body[dir="rtl"] .tags-list button {
  text-align: right;
}

body[dir="rtl"] summary::before {
  margin-left: 6px;
  margin-right: 0;
}

body[dir="rtl"] .soft-button:hover {
  transform: translateX(-4px); /* عكس الاتجاه للغة العربية */
}

body[dir="rtl"] .tags-list button:hover {
  transform: translateX(-2px);
}

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

/* تأثير التوهج الذهبي عند التمرير */
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

/* التجاوب */
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

/* أنماط الأكورديونات باللون الرمادي النبيل */
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
  text-align: right;
  font-size: 1rem;
  background-color: #cccccc !important;
  color: #333 !important;
  border: 1px solid #b3b3b3 !important;
  border-radius: 6px 6px 0 0;
  position: relative;
}

summary::before {
  content: "◂ ";
  color: #666;
  margin-left: 6px;
  margin-right: 0;
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
  text-align: right;
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
  text-align: right;
}

.soft-button:hover {
  background: #e6e6e6;
  transform: translateX(-4px);
  border-color: #b3b3b3;
}
</style>


&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-1-2.png" alt="مشهد مجمع التفكير المؤسسي والاعتراف" />
</div>

### الأرشيف الشخصي
الوثائق الرسمية لجنسيتي المسرحية في إيماركيا، التي تعكس وضعي وكفاءاتي ومشاركتي في مهام المشروع.

<details>
  <summary>الوثائق</summary>
  <div class="accordion-content">
    <a href="/ru/tituli/testimonium-civitatis-unghart/" class="soft-button">
      🛂 جواز السفر المسرحي
    </a>
    <a href="/docs/acts/memorandum" class="soft-button">
      📋 مذكرات التفاهم
    </a>
    <a href="/docs/acts/statements" class="soft-button">
      🗣️ تصريحات
    </a>
    <a href="/docs/acts/alliances" class="soft-button">
      🤝 تحالفات مسرحية
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 بروتوكولات
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 الأرشيف
    </a>
  </div>
</details>


<details>
  <summary>المساهمة</summary>
  <div class="accordion-content">
    <a href="/docs/worklog" class="soft-button">📋 سجل الإجراءات</a>
    <a href="/docs/projects" class="soft-button">📊 المشاريع والمهام</a>
    <a href="/docs/contribution" class="soft-button">⭐ المساهمة العامة</a>
  </div>
</details>

<details>
  <summary>الجوائز</summary>
  <div class="accordion-content">
    <a href="/docs/medals" class="soft-button">🎖️ أوسمة</a>
    <a href="/docs/medals" class="soft-button">🎖️ ميداليات</a>
    <a href="/docs/tokens" class="soft-button">🪙 رموز (توكينز)</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-2.png" alt="مشهد مجمع التفكير المؤسسي والاعتراف" />
</div>

### مصادر الإلهام

مصادر الإلهام هي جسور مضيئة تجلب الفرح والسعادة للعالم. هنا ستجدون روابط مفيدة ومشاريع شريكة تحول الأفكار إلى إنجازات فعلية.

- هندسة معرفة نقية
- عمليات شفافة وقواعد عادلة
- مجتمعات حيث يصبح كل مساهمة جزءًا من الذاكرة الجماعية

<details>
  <summary>العلوم والتكنولوجيا</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">📚 أبحاث</a>
    <a href="https://github.com" class="soft-button">💻 مطورون</a>
    <a href="https://medium.com" class="soft-button">📰 مقالات</a>
  </div>
</details>

<details>
  <summary>مشاريع الأعمال</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">💆 SUNLIFE-MASSAGE</a>
    <a href="https://github.com" class="soft-button">⚙️ KOVCHEG-M-XXXXII</a>
    <a href="https://medium.com" class="soft-button">🎨 استوديو ويب OYESHUB</a>
  </div>
</details>

<details>
  <summary>الثقافة والفن</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">🖼️ قطع أثرية</a>
    <a href="https://github.com" class="soft-button">🎭 مؤلفون</a>
    <a href="https://medium.com" class="soft-button">📖 مقالات</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp; 

<style>
/* حركة إيموجي القناع للعرض التشويقي */
.emoji-teaser {
    text-align: center;
    margin-bottom: 1.5rem;
}

.teaser-emoji {
    font-size: 4.5rem;
    display: inline-block;
    animation: magicAppear 2s ease-out, floatMask 4s ease-in-out 2s infinite;
    filter: drop-shadow(0 5px 15px rgba(156, 39, 176, 0.3));
    transform-origin: center;
}

@keyframes magicAppear {
    0% {
        opacity: 0;
        transform: scale(0.5) rotate(-180deg);
        filter: blur(10px);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.1) rotate(-10deg);
        filter: blur(2px) drop-shadow(0 0 20px rgba(156, 39, 176, 0.7));
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
        filter: drop-shadow(0 5px 15px rgba(156, 39, 176, 0.3));
    }
}

@keyframes floatMask {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
        filter: drop-shadow(0 5px 15px rgba(156, 39, 176, 0.3));
    }
    25% {
        transform: translateY(-8px) rotate(2deg);
        filter: drop-shadow(0 10px 20px rgba(156, 39, 176, 0.5));
    }
    50% {
        transform: translateY(-4px) rotate(-1deg);
        filter: drop-shadow(0 8px 18px rgba(156, 39, 176, 0.4));
    }
    75% {
        transform: translateY(-6px) rotate(1deg);
        filter: drop-shadow(0 12px 22px rgba(156, 39, 176, 0.6));
    }
}

/* تأثير التمرير */
.teaser-emoji:hover {
    animation-play-state: paused;
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 25px rgba(156, 39, 176, 0.8)) brightness(1.1);
    transition: all 0.3s ease;
}

/* التجاوب */
@media (max-width: 768px) {
    .teaser-emoji {
        font-size: 3.5rem;
    }
}

@media (max-width: 480px) {
    .teaser-emoji {
        font-size: 2.8rem;
    }
}
</style>

<div class="emoji-teaser">
    <div class="teaser-emoji">🏛️</div>
</div>

#### قلعة الثقة
#### الشبكات الاجتماعية

في قلعة ثقتي، أنشر منشورات رسمية لكاتب مُعتمَدة من مواقع أقنعة شخصية رسمية داخل نظام PLATAN+ البيئي.

هذا يعمل كنوع من المرشح، يزيل الضجيج المعلوماتي من خلاصتك الذي قد يخنق otherwise التيار الصافي للمعلومات الضرورية حقًا والمُتحقَّق منها.

&nbsp; 

<details class="imarch-module">
  <summary style="color: #333; background-color: #cccccc; border: 1px solid #b3b3b3;">الشبكات الاجتماعية ✦ القلعة</summary>

  {{< persona-socials >}}

<style>
.persona-header-clean {
  text-align: right;
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
  text-align: right;
  font-size: 1rem;
}
summary::marker {
  content: "◀ ";
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
  text-align: right;
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
  transform: translateX(-3px);
}
</style>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-3.png" alt="الحكم هو الصوت الرسمي ومشهد الاعتراف المؤسسي" />


### قلعة ثقة أونغهارت

هنا أعيد نشر مصادر رسمية مهمة وذات صلة بالنسبة لي، وأوصي بها لكل المهتمين بأسئلة الوعي التام (الذهن).

&nbsp;

<section class="tags-list">
  <button onclick="location.href='/ru/tags/portrait/'">🏛 صورة</button>
  <button onclick="location.href='/ru/tags/action/'">🛠 فعل</button>
  <button onclick="location.href='/ru/tags/inspiration/'">🌿 إلهام</button>
</section>

<!-- أو مجرد نص -->
<p style="margin-top: 2rem; font-style: italic; color: #666; text-align: right;">
  قلعة الثقة يتم تحديثها بانتظام بمواد ومصادر جديدة.
  ترقبوا التحديثات!
</p>