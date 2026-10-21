---
title: "UNGHART"
type: "section"
translationKey: "scene-unghart"
layout: list
css: ["css/ungchart.css"]
---

<div class="banner constitution-banner">
<img src="/images/persona/sigillum.png" alt="制度性思维与认可的审议会场景" />
</div>

### 沉默真理的守护者 | 形态学建筑师 | PLATAN⁺ 战略家

欢迎来到我的个人舞台。在这里，我收集灵感、分享思想，并展示从想法到生命系统的道路。

{{< morebutton target="/ru/unghart/" text="🔔 订阅" >}}
</div>

{{< morebutton target="https://unghart.imarch.sbs/ru/" text="🌐 个人网站" >}}
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<details>
  <summary>个人资料演示版本🔻</summary>

>注意！此页面是 PLATAN+ 联盟生态系统内，具有伊玛基亚公民身份的舞台角色个人资料前端开发演示。
> 在博客“信任堡垒”中，您将找到从我官方个人面具网站转载的文章，在那里我更详细地讨论了代表性集群系统——个人资料 - 个人网站 - 联盟办公室，并揭示了这种实现您想法的工具所完成的任务的意义和范围。

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

/* 悬停时的金色光辉效果 */
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

/* 响应式设计 */
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

/* 典雅灰色的手风琴样式 */
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
<img src="/images/persona/000-1-2.png" alt="制度性思维与认可的审议会场景" />
</div>

### 个人档案
我在伊玛基亚的舞台公民身份的官方文件，反映我的地位、能力以及参与项目任务的情况。

<details>
  <summary>文件</summary>
  <div class="accordion-content">
    <a href="/ru/tituli/testimonium-civitatis-unghart/" class="soft-button">
      🛂 舞台护照
    </a>
    <a href="/docs/acts/memorandum" class="soft-button">
      📋 备忘录
    </a>
    <a href="/docs/acts/statements" class="soft-button">
      🗣️ 声明
    </a>
    <a href="/docs/acts/alliances" class="soft-button">
      🤝 舞台联盟
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 协议
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 档案
    </a>
  </div>
</details>


<details>
  <summary>贡献</summary>
  <div class="accordion-content">
    <a href="/docs/worklog" class="soft-button">📋 行动日志</a>
    <a href="/docs/projects" class="soft-button">📊 项目与任务</a>
    <a href="/docs/contribution" class="soft-button">⭐ 总体贡献</a>
  </div>
</details>

<details>
  <summary>奖项</summary>
  <div class="accordion-content">
    <a href="/docs/medals" class="soft-button">🎖️ 勋章</a>
    <a href="/docs/medals" class="soft-button">🎖️ 奖章</a>
    <a href="/docs/tokens" class="soft-button">🪙 代币</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-2.png" alt="制度性思维与认可的审议会场景" />
</div>

### 灵感源泉

灵感源泉是带来欢乐和幸福的光明桥梁。在这里，您将找到有用的链接和合作伙伴项目，将想法转化为实际行动。

- 纯净的知识架构
- 透明的过程和公平的规则
- 每个贡献都成为集体记忆一部分的社区

<details>
  <summary>科学与技术</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">📚 研究</a>
    <a href="https://github.com" class="soft-button">💻 开发者</a>
    <a href="https://medium.com" class="soft-button">📰 文章</a>
  </div>
</details>

<details>
  <summary>商业项目</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">💆 SUNLIFE-MASSAGE</a>
    <a href="https://github.com" class="soft-button">⚙️ KOVCHEG-M-XXXXII</a>
    <a href="https://medium.com" class="soft-button">🎨 OYESHUB 网页工作室</a>
  </div>
</details>

<details>
  <summary>文化与艺术</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">🖼️ 文物</a>
    <a href="https://github.com" class="soft-button">🎭 作者</a>
    <a href="https://medium.com" class="soft-button">📖 文章</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp; 

<style>
/* 表情符号面具的动画效果 */
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

/* 悬停效果 */
.teaser-emoji:hover {
    animation-play-state: paused;
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 25px rgba(156, 39, 176, 0.8)) brightness(1.1);
    transition: all 0.3s ease;
}

/* 响应式设计 */
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

#### 信任堡垒
#### 社交网络

在我的信任堡垒中，我发布来自 PLATAN+ 生态系统内官方个人面具网站、经过验证的官方作者帖子。

这相当于一种过滤器，消除了您信息流中的信息噪音，否则这些噪音会淹没真正必要且经过验证的信息的清晰流。

&nbsp; 

<details class="imarch-module">
  <summary style="color: #333; background-color: #cccccc; border: 1px solid #b3b3b3;">社交网络 ✦ 堡垒</summary>

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
<img src="/images/persona/000-3.png" alt="裁决是官方声音和制度性认可的舞台" />


### 翁加尔特信任堡垒

在此，我转载对我来说重要且相关的官方来源，并推荐给所有对正念问题感兴趣的人。

&nbsp;

<section class="tags-list">
  <button onclick="location.href='/ru/tags/portrait/'">🏛 肖像</button>
  <button onclick="location.href='/ru/tags/action/'">🛠 行动</button>
  <button onclick="location.href='/ru/tags/inspiration/'">🌿 灵感</button>
</section>

<!-- 或仅文字 -->
<p style="margin-top: 2rem; font-style: italic; color: #666;">
  信任堡垒会定期更新新的材料和来源。
  敬请关注更新！
</p>