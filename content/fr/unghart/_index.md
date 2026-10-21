---
title: "UNGHART"
type: "section"
translationKey: "scene-unghart"
layout: list
css: ["css/ungchart.css"]
---

<div class="banner constitution-banner">
<img src="/images/persona/sigillum.png" alt="Scène du Consilium de la Pensée Institutionnelle et de la Reconnaissance" />
</div>

### Gardien de la Vérité du Silence | Architecte de la Formologie | Stratège PLATAN⁺

Bienvenue sur ma scène personnelle. Ici, je rassemble l'inspiration, partage mes pensées et démontre le chemin qui mène des idées à des systèmes vivants.

{{< morebutton target="/ru/unghart/" text="🔔 S'ABONNER" >}}
</div>

{{< morebutton target="https://unghart.imarch.sbs/ru/" text="🌐 SITE PERSONNEL" >}}
</div>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

<details>
  <summary>Version Démo Opérationnelle du Profil🔻</summary>

>Attention ! Cette page est une démonstration du développement frontend en cours pour le profil personnel d'un persona scénique ayant le statut de citoyenneté dans l'Imarchia, au sein de l'écosystème du consortium PLATAN+.
> Dans le blog "Citadelle", vous trouverez des republications d'articles provenant de mon site officiel de masque personnel, où je discute plus en détail du système du cluster représentatif PROFIL - SITE PERSONNEL - BUREAU DU CONSORTIUM et révèle le sens et la portée des tâches qu'un tel outil de réalisation de vos idées accomplit.

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

/* Effet de lueur dorée au survol */
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

/* Responsivité */
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

/* Styles pour les accordéons avec gris noble */
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
<img src="/images/persona/000-1-2.png" alt="Scène du Consilium de la Pensée Institutionnelle et de la Reconnaissance" />
</div>

### ARCHIVES PERSONNELLES
Documentation officielle de ma citoyenneté scénique dans l'Imarchia, reflétant mon statut, mes compétences et ma participation aux missions du Projet.

<details>
  <summary>Documents</summary>
  <div class="accordion-content">
    <a href="/ru/tituli/testimonium-civitatis-unghart/" class="soft-button">
      🛂 PASSEPORT SCÉNIQUE
    </a>
    <a href="/docs/acts/memorandum" class="soft-button">
      📋 MÉMORANDUMS
    </a>
    <a href="/docs/acts/statements" class="soft-button">
      🗣️ DÉCLARATIONS
    </a>
    <a href="/docs/acts/alliances" class="soft-button">
      🤝 ALLIANCES SCÉNIQUES
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 PROTOCOLES
    </a>
    <a href="/docs/acts/protocols" class="soft-button">
      📝 ARCHIVES
    </a>
  </div>
</details>


<details>
  <summary>Contribution</summary>
  <div class="accordion-content">
    <a href="/docs/worklog" class="soft-button">📋 JOURNAL DES ACTIONS</a>
    <a href="/docs/projects" class="soft-button">📊 PROJETS ET TÂCHES</a>
    <a href="/docs/contribution" class="soft-button">⭐ CONTRIBUTION GÉNÉRALE</a>
  </div>
</details>

<details>
  <summary>Récompenses</summary>
  <div class="accordion-content">
    <a href="/docs/medals" class="soft-button">🎖️ ORDRES</a>
    <a href="/docs/medals" class="soft-button">🎖️ MÉDAILLES</a>
    <a href="/docs/tokens" class="soft-button">🪙 JETONS (TOKENS)</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp;

<div class="banner constitution-banner">
<img src="/images/persona/000-2.png" alt="Scène du Consilium de la Pensée Institutionnelle et de la Reconnaissance" />
</div>

### SOURCES D'INSPIRATION

Les sources d'inspiration sont des ponts lumineux qui apportent joie et bonheur au monde. Ici vous trouverez des liens utiles et des projets partenaires qui transforment les idées en réalisations concrètes.

- Architecture pure de la connaissance
- Processus transparents et règles équitables
- Communautés où chaque contribution devient partie de la mémoire collective

<details>
  <summary>Science et Technologie</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">📚 RECHERCHES</a>
    <a href="https://github.com" class="soft-button">💻 DÉVELOPPEURS</a>
    <a href="https://medium.com" class="soft-button">📰 ARTICLES</a>
  </div>
</details>

<details>
  <summary>Projets d'Affaires</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">💆 SUNLIFE-MASSAGE</a>
    <a href="https://github.com" class="soft-button">⚙️ KOVCHEG-M-XXXXII</a>
    <a href="https://medium.com" class="soft-button">🎨 Studio Web OYESHUB</a>
  </div>
</details>

<details>
  <summary>Culture et Art</summary>
  <div class="accordion-content">
    <a href="https://scholar.google.com" class="soft-button">🖼️ ARTÉFACTS</a>
    <a href="https://github.com" class="soft-button">🎭 AUTEURS</a>
    <a href="https://medium.com" class="soft-button">📖 ARTICLES</a>
  </div>
</details>

<div style="width: 100%; text-align: center; margin: 3rem 0;">
  <hr style="border: none; height: 1px; background: linear-gradient(to right, transparent, #4b2e2e, transparent);" />
</div>

&nbsp; 

<style>
/* Animation de l'emoji masque pour le teaser */
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

/* Effet au survol */
.teaser-emoji:hover {
    animation-play-state: paused;
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 0 25px rgba(156, 39, 176, 0.8)) brightness(1.1);
    transition: all 0.3s ease;
}

/* Responsivité */
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

#### CITADELLE DE CONFIANCE
#### Réseaux Sociaux

Dans ma Citadelle de Confiance, je publie des posts d'auteur officiels et validés provenant de sites de masques personnels officiels au sein de l'écosystème PLATAN+.

Cela sert de filtre, éliminant le bruit informationnel de votre flux qui autrement étoufferait le flux clair d'informations réellement nécessaires et vérifiées.

&nbsp; 

<details class="imarch-module">
  <summary style="color: #333; background-color: #cccccc; border: 1px solid #b3b3b3;">RÉSEAUX SOCIAUX ✦ CITADELLE</summary>

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
<img src="/images/persona/000-3.png" alt="Verdict est la voix officielle et la scène de la reconnaissance institutionnelle" />


### CITADELLE DE CONFIANCE D'UNGHART

Ici, je republie des sources officielles qui me sont importantes et pertinentes, et que je recommande à tous ceux qui s'intéressent aux questions de pleine conscience.

&nbsp;

<section class="tags-list">
  <button onclick="location.href='/ru/tags/portrait/'">🏛 Portrait</button>
  <button onclick="location.href='/ru/tags/action/'">🛠 Action</button>
  <button onclick="location.href='/ru/tags/inspiration/'">🌿 Inspiration</button>
</section>

<!-- Ou simplement du texte -->
<p style="margin-top: 2rem; font-style: italic; color: #666;">
  La Citadelle de Confiance est régulièrement mise à jour avec de nouveaux matériaux et sources.
  Restez à l'écoute pour les mises à jour !
</p>