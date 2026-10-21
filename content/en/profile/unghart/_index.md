---
title: "UNGHART"
type: "section"
translationKey: "scene-unghart"
layout: list
css: ["css/ungchart.css"]
---

<div class="banner constitution-banner">
<img src="/images/persona/sigillum.png" alt="Consilium Scene of Institutional Thinking and Recognition" />
</div>

### Guardian of the Truth of Silence | Architect of Formology | PLATAN⁺ Strategist

Welcome to my personal stage. Here I gather inspiration, share thoughts, and demonstrate the path that leads from ideas to living systems.

{{< morebutton target="/ru/unghart/" text="🔔 SUBSCRIBE" >}}
</div>

{{< morebutton target="https://unghart.imarch.sbs/ru/" text="🌐 PERSONAL SITE" >}}
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<details>
  <summary>Working Demo Version of the Profile🔻</summary>

>Attention! This page is a demonstration of the ongoing frontend development for the personal profile of a stage persona with citizenship status in Imarchia within the PLATAN+ consortium ecosystem.
>In the blog "Citadel," you will find reposts of articles from my official personal mask-site, where I discuss in more detail the system of the representative cluster PROFILE - PERSONAL SITE - CONSORTIUM-OFFICE and reveal the meaning and scope of tasks that such a tool for realizing your ideas fulfills.

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

/* Golden glow effect on hover */
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

/* Responsiveness */
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

/* Styles for accordions with noble gray */
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
<img src="/images/persona/000-1-2.png" alt="Consilium Scene of Institutional Thinking and Recognition" />
</div>

### PERSONAL ARCHIVE
Official documentation of my stage citizenship in Imarchia, reflecting my status, competencies, and participation in the Project's missions.

<details>
  <summary>Documents</summary>
  <div class="accordion-content">
    <a href="/ru/tituli/testimonium-civitatis-unghart/" class="soft-button">
      🛂 STAGE PASSPORT
    </a>
    <a href="/docs/acts/memorandum" class="soft-button">
      📋 MEMORANDA
    </a>
    <a href="/docs/acts/statements" class="soft-button">
      🗣️ STATEMENTS
    </a>
    <a href="/docs/acts/alliances" class="soft-button">
      🤝 STAGE ALLIANCES
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 PROTOCOLS
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 ARCHIVE
    </a>
  </div>
</details>


<details>
  <summary>Contribution</summary>
  <div class="accordion-content">
    <a href="/docs/worklog" class="soft-button">📋 ACTION LOG</a>
    <a href="/docs/projects" class="soft-button">📊 PROJECTS AND TASKS</a>
    <a href="/docs/contribution" class="soft-button">⭐ OVERALL CONTRIBUTION</a>
  </div>
</details>

<details>
  <summary>Awards</summary>
  <div class="accordion-content">
    <a href="/docs/medals" class="soft-button">🎖️ ORDERS</a>
    <a href="/docs/medals" class="soft-button">🎖️ MEDALS</a>
    <a href="/docs/tokens" class="soft-button">🪙 TOKENS</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-2.png" alt="Consilium Scene of Institutional Thinking and Recognition" />
</div>

### SOURCES OF INSPIRATION

Sources of inspiration are bright bridges that bring joy and happiness to the world. Here you will find useful links and partner projects that turn ideas into real deeds.

- Clean architecture of knowledge
- Transparent processes and fair rules
- Communities where every contribution becomes part of the shared memory

<details>
  <summary>Science and Technology</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">📚 RESEARCH</a>
    <a href="https://github.com" class="soft-button">💻 DEVELOPERS</a>
    <a href="https://medium.com" class="soft-button">📰 ARTICLES</a>
  </div>
</details>

<details>
  <summary>Business Projects</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">💆 SUNLIFE-MASSAGE</a>
    <a href="https://github.com" class="soft-button">⚙️ KOVCHEG-M-XXXXII</a>
    <a href="https://medium.com" class="soft-button">🎨 Web Studio OYESHUB</a>
  </div>
</details>

<details>
  <summary>Culture and Art</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">🖼️ ARTIFACTS</a>
    <a href="https://github.com" class="soft-button">🎭 AUTHORS</a>
    <a href="https://medium.com" class="soft-button">📖 ARTICLES</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp; 

<style>
/* Animation of emoji mask for teaser */
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

/* Hover effect */
.teaser-emoji:hover {
    animation-play-state: paused;
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 25px rgba(156, 39, 176, 0.8)) brightness(1.1);
    transition: all 0.3s ease;
}

/* Responsiveness */
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

#### CITADEL OF TRUST
#### Social Networks

In my Citadel of Trust, I post official, validated author posts from official personal mask-sites within the PLATAN+ ecosystem.

This serves as a kind of filter, eliminating informational noise from your feed that would otherwise drown out the clear stream of genuinely necessary, verified information.

&nbsp; 

<details class="imarch-module">
  <summary style="color: #333; background-color: #cccccc; border: 1px solid #b3b3b3;">SOCIAL NETWORKS ✦ CITADEL</summary>

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

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-3.png" alt="Verdict is the official voice and scene of institutional recognition" />


### UNGHART'S CITADEL OF TRUST

Here I repost official sources that are important and relevant to me, and which I recommend to everyone interested in questions of mindfulness.

&nbsp;

<section class="tags-list">
  <button onclick="location.href='/ru/tags/portrait/'">🏛 Portrait</button>
  <button onclick="location.href='/ru/tags/action/'">🛠 Action</button>
  <button onclick="location.href='/ru/tags/inspiration/'">🌿 Inspiration</button>
</section>

<!-- Or just text -->
<p style="margin-top: 2rem; font-style: italic; color: #666;">
  The Citadel of Trust is regularly updated with new materials and sources.
  Stay tuned for updates!
</p>