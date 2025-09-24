// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (links) links.classList.remove('open');
    }
  });
});

// Theme toggle with persistence
const themeToggle = document.getElementById('themeToggle');
const userPref = localStorage.getItem('theme');
if (userPref === 'light') document.documentElement.classList.add('light');
function setTheme(next) {
  document.documentElement.classList.toggle('light', next === 'light');
  localStorage.setItem('theme', next);
  if (themeToggle) themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
}
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('light') ? 'dark' : 'light';
    setTheme(next);
  });
  // initialize icon
  setTheme(userPref || 'dark');
}

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Robust open for CV PDF
// Remove any special handling for CV; let the browser open the PDF directly

// Project modal logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalBody = document.getElementById('modalBody');
const modalPdf = document.getElementById('modalPdf');

const PROJECTS = {
  tetris: {
    title: 'TETRIS sur ESP32',
    pdf: 'assets/pdf/tetris_rapport.pdf',
    html: `
      <p><strong>Situation</strong> : Conception et réalisation d'un jeu Tétris interactif sur une matrice LED, piloté à distance via WiFi avec un ESP32, dans le cadre d'un projet de groupe à l'ENSEM.</p>
      <p><strong>Tâche</strong> : Piloter l'intégralité du projet, de l'idée au prototype fonctionnel. Responsabilités incluant la gestion d'équipe, la conception mécanique et la supervision du développement logiciel.</p>
      <p><strong>Action</strong> :</p>
      <ul>
        <li><strong>Gestion de projet</strong> : Animation de réunions régulières, répartition des tâches, rédaction des rapports.</li>
        <li><strong>Conception mécanique</strong> : Conception et usinage manuel du tableau en bois (10x20 cases) avec inserts, réalisation du cadre en aluminium et de la plaque en plexiglass.</li>
        <li><strong>Développement embarqué (C++)</strong> : Supervision générale et développement direct de la classe des pièces (méthodes de translation et rotation).</li>
      </ul>
      <p><strong>Résultat</strong> : Obtention d'un prototype fonctionnel avec une structure mécanique finalisée et une interface intuitive. L'état d'avancement de la programmation est de 90%, mais un bug persiste (la pièce ne s'arrête pas sur la dernière ligne).</p>
    `,
  },
  labyrinthe: {
    title: 'Balade dans un labyrinthe — Jeu Java',
    pdf: '#',
    html: `
      <p><strong>Situation</strong> : Développement d'un jeu vidéo de labyrinthe avec interface graphique immersive en Java, dans le cadre d'un projet de développement logiciel en équipe à l'ENSEM.</p>
      <p><strong>Tâche</strong> : Concevoir et implémenter des classes robustes et bien intégrées à l'architecture logicielle définie collectivement, en se focalisant sur les fonctionnalités de base des entités du jeu.</p>
      <p><strong>Action</strong> :</p>
      <ul>
        <li><strong>Conception Orientée Objet</strong> : Conception et implémentation de la classe "Monstres" en appliquant les principes de POO (encapsulation, héritage), avec attributs (points de vie, dégâts) et comportements (déplacement, attaque).</li>
        <li><strong>Développement des mécaniques de jeu</strong> : Programmation du système de gestion des collisions entre toutes les entités (joueur, monstres, objets).</li>
      </ul>
      <p><strong>Résultat</strong> : Livraison d'une application aboutie et pleinement opérationnelle : jeu fonctionnel, fluide et stable offrant une expérience immersive; code bien architecturé facilitant la maintenance et les évolutions; retours positifs des enseignants sur la fluidité des interactions et l'expérience utilisateur.</p>
    `,
  },
  leaves: { title: 'Classification de feuilles par CNN', pdf: '#', html: '<p>Contenu à venir.</p>' },
  leaves: {
    title: 'Classification de feuilles par CNN',
    pdf: '#',
    html: `
      <p><strong>Situation</strong> : Conception et entraînement d'un modèle de classification d'images d'espèces de feuilles d'arbres par CNN, dans le cadre d'un cours sur les méthodes d'apprentissage automatique.</p>
      <p><strong>Tâche</strong> : Développer un pipeline complet de Deep Learning, de la préparation des données à l'évaluation du modèle, en validant d'abord l'approche sur 4 espèces puis en étendant le modèle à 32 espèces avec une précision optimale.</p>
      <p><strong>Action</strong> :</p>
      <ul>
        <li><strong>Préparation des données</strong> : preprocessing (redimensionnement, normalisation) et augmentation (rotation, retournement).</li>
        <li><strong>Conception du CNN</strong> : architecture TensorFlow/Keras, choix des couches et fonctions d'activation, réglage des hyperparamètres.</li>
        <li><strong>Approche progressive</strong> : prototype 4 classes puis extension/optimisation à 32 classes.</li>
      </ul>
      <p><strong>Résultat</strong> : Modèle atteignant <strong>91,36%</strong> de précision sur l'ensemble de test (32 espèces). Méthodologie robuste et acquisition d'une expertise pratique complète en Deep Learning avec TensorFlow.</p>
    `,
  },
  twizzy: {
    title: 'Twizzy — Vision & Détection',
    pdf: '#',
    html: `
      <p><strong>Situation</strong> : Développement de "Twizzy", un système de vision par ordinateur pour véhicules autonomes capable de détecter et classifier les panneaux de signalisation en temps réel, malgré les variations lumineuses et la qualité d'image.</p>
      <p><strong>Tâche</strong> : Chef d'équipe et responsable du traitement d'image : coordination et conception/optimisation de la chaîne visuelle complète, de l'acquisition à la reconnaissance.</p>
      <p><strong>Action</strong> :</p>
      <ul>
        <li><strong>Gestion de projet Agile</strong> : synchronisations régulières, suivi des modules OpenCV et CNN en parallèle.</li>
        <li><strong>OpenCV</strong> : conversion HSV, seuillage couleur, Canny, détection de formes circulaires.</li>
        <li><strong>Deep Learning</strong> : entraînement d'un CNN type ResNet sur GTSRB (50k+ images, 40+ classes), focus sur augmentation et prétraitement.</li>
        <li><strong>Intégration</strong> : interface Java Swing intuitive.</li>
      </ul>
      <p><strong>Résultat</strong> : Prototype fonctionnel avec <strong>86,68%</strong> sur le jeu de validation, interface utilisateur claire et livrable académique complet (code modulaire, rapport, démo).</p>
    `,
  },
  sami: {
    title: 'SAMI — Robot Lego Autonome',
    pdf: '#',
    html: `
      <p><strong>Situation</strong> : Conception et mise en œuvre de la chaîne de commande d'un robot Lego Ev3 devant naviguer de manière autonome à travers des points de passage, projet pluridisciplinaire (mathématiques, automatique, informatique).</p>
      <p><strong>Tâche</strong> : Piloter la partie automatique en binôme et coordonner le groupe pour définir les lois/variables de commande et la correction en temps réel.</p>
      <p><strong>Action</strong> :</p>
      <ul>
        <li><strong>Gestion d'équipe</strong> : réunions, rapport final, respect des délais.</li>
        <li><strong>Modélisation et conception</strong> : modèle Simulink (boucle fermée contrôleur/robot), implémentation Python des variables de contrôle PID basées sur le modèle.</li>
      </ul>
      <p><strong>Résultat</strong> : Robot pleinement fonctionnel pour des trajectoires complexes, précision <strong>< 5%</strong> aux points de passage, compétences renforcées en modélisation dynamique et robotique.</p>
    `,
  },
};

function openProjectModal(key) {
  const data = PROJECTS[key];
  if (!data || !modal) return;
  modalTitle.textContent = data.title;
  modalSubtitle.textContent = "dans le cadre de l'ENSEM";
  modalBody.innerHTML = data.html;
  if (modalPdf) {
    modalPdf.href = data.pdf;
    modalPdf.setAttribute('target', '_blank');
    modalPdf.setAttribute('rel', 'noreferrer');
    modalPdf.removeAttribute('download');
    // Check that the PDF exists; if not, hide the button gracefully
    if (data.pdf && data.pdf !== '#') {
      fetch(data.pdf, { method: 'HEAD' }).then(r => {
        modalPdf.style.display = r.ok ? 'inline-block' : 'none';
        if (!r.ok) {
          const warn = document.createElement('p');
          warn.className = 'muted';
          warn.textContent = "Le PDF n'est pas disponible pour le moment.";
          modalBody.appendChild(warn);
        }
      }).catch(() => {
        modalPdf.style.display = 'none';
        const warn = document.createElement('p');
        warn.className = 'muted';
        warn.textContent = "Le PDF n'est pas disponible (erreur de chargement).";
        modalBody.appendChild(warn);
      });
    } else {
      modalPdf.style.display = 'none';
    }
  }
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => openProjectModal(card.getAttribute('data-project')));
});

if (modal) {
  modal.querySelectorAll('[data-close]').forEach(btn => btn.addEventListener('click', closeProjectModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });
}


