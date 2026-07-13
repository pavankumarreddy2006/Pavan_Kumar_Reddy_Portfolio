/* =============================================================
   PALLA PAVAN KUMAR REDDY — PORTFOLIO v2
   Main JavaScript — no frameworks, no build step.
============================================================= */
'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.getElementById('year').textContent = new Date().getFullYear();

/** Debounce — delays invoking fn until wait ms have passed since the last call. */
function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

/* =========================================================
   PROJECT DATA — single source of truth for cards + modals
========================================================= */
const PROJECTS = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant Platform',
    tagline: 'A browser-based assistant that listens, thinks, and talks back.',
    status: 'completed',
    statusLabel: 'Completed',
    cover: 'assets/images/projects/ai-assistant-cover.png',
    gallery: ['assets/images/projects/ai-assistant-1.png', 'assets/images/projects/ai-assistant-2.png'],
    summary: 'A complete AI Assistant platform built with Python, Flask, HTML, CSS and JavaScript — intelligent chatbot responses, voice interaction, speech recognition and text-to-speech in a modern responsive interface.',
    tags: ['Python', 'Flask', 'AI Chatbot', 'Voice', 'Speech Recognition'],
    github: 'https://github.com/pavankumarreddy2006',
    demo: 'https://ai-assitent-lijk.onrender.com/',
    overview: 'A full-stack conversational assistant you can talk to instead of just type at. It runs in the browser, understands both typed and spoken input, and responds with synthesized speech — built so it could realistically sit on top of a personal automation workflow later.',
    problem: 'Most "chatbot" side projects stop at a text box connected to an API. That is a good weekend project but not a very useful assistant — real assistants need to hear you, remember context within a session, and respond in a way that does not require you to keep looking at a screen.',
    solution: 'I built a Flask backend that handles session state and response generation, paired with a JavaScript frontend that manages the Web Speech API for both recognition and synthesis. The interface stays minimal on purpose — one input, one conversation thread, and a visual indicator for when the assistant is listening versus speaking.',
    architecture: [
      'Flask serves the frontend and exposes a small JSON API for message exchange.',
      'Client-side JS handles microphone capture via the Web Speech API and streams recognized text to the backend.',
      'Responses are generated server-side, then read aloud client-side with speech synthesis.',
      'Session state is kept lightweight so the assistant stays responsive on modest hosting.'
    ],
    stack: ['Python', 'Flask', 'JavaScript', 'Web Speech API', 'HTML5/CSS3'],
    features: [
      'Real-time speech-to-text input alongside a standard text box',
      'Text-to-speech responses with a visible speaking/listening state',
      'Automation-style command handling for repeated actions',
      'Responsive layout that works as well on mobile as desktop'
    ],
    challenges: [
      'Browser speech APIs behave inconsistently across Chrome, Edge and mobile browsers — I had to build fallbacks for when recognition silently fails.',
      'Keeping response latency low on free-tier hosting meant trimming what the backend does per request.',
      'Getting the "listening" UI state to feel honest — not flickering, not lying about whether the mic is actually live — took more iteration than the speech logic itself.'
    ],
    lessons: 'The hard part of a voice assistant is almost never the AI response — it is the state machine around it: is the mic on, did it hear anything, should it retry. I came out of this project caring a lot more about interface honesty than I expected to.',
    timeline: 'Built over several weeks alongside coursework — backend and chat logic first, voice layer added once text worked reliably.',
    future: ['Persistent memory across sessions', 'Wake-word activation instead of a button', 'Plug in a proper LLM backend for richer responses'],
    outcome: 'Shipped and deployed — it\'s live at the demo link below, running on Render. The voice layer works reliably in Chrome and Edge; Safari support is the known gap. This is the project I point to when someone asks what "full-stack" means to me in practice.',
    meta: { role: 'Solo developer', duration: '~4 weeks', type: 'Web app' },
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Input modes', value: 'Text + Voice' },
      { label: 'Hosted on', value: 'Render' }
    ]
  },
  {
    id: 'iot-voice',
    title: 'Voice-Controlled IoT Device Management',
    tagline: 'Say it, and the device on the other side of the house does it.',
    status: 'completed',
    statusLabel: 'Completed',
    cover: 'assets/images/projects/iot-cover.png',
    gallery: ['assets/images/projects/iot-1.png', 'assets/images/projects/iot-2.png'],
    summary: 'A system that lets users remotely monitor and control smart devices over the internet using natural voice commands, built on Python, Flask and ESP32.',
    tags: ['Python', 'Flask', 'ESP32', 'IoT', 'Voice Recognition'],
    github: 'https://github.com/pavankumarreddy2006',
    demo: null,
    overview: 'A voice-controlled home automation system connecting ESP32 microcontrollers to a Flask server, so a spoken command like "turn on the lights" travels from a browser or phone, over the internet, and flips a real relay.',
    problem: 'Most IoT demos are local — a phone on the same WiFi network as the device. That is fine for a classroom demo but not for an actual "smart home": you want to control things whether you are in the next room or in another city, and voice is a much lower-friction interface than opening an app and tapping a toggle.',
    solution: 'The ESP32 boards connect to a Flask backend over the internet rather than relying on local network discovery, so control works from anywhere. A voice-recognition layer on the client converts spoken commands into structured device actions, which the backend validates and forwards to the right device.',
    architecture: [
      'ESP32 modules run firmware that polls the Flask backend for pending commands and reports device state back.',
      'Flask acts as the always-on relay between the voice interface and the hardware, so devices do not need a public IP themselves.',
      'Voice input is parsed into a small command grammar (device + action) before being sent, to keep false positives low.',
      'A lightweight web dashboard shows live device state for manual override.'
    ],
    stack: ['Python', 'Flask', 'ESP32', 'C++ (Arduino framework)', 'Voice Recognition', 'REST APIs'],
    features: [
      'Natural voice commands for device control',
      'Remote access — not limited to the local network',
      'Real-time device state monitoring on the dashboard',
      'Manual override alongside voice control for reliability'
    ],
    challenges: [
      'ESP32 boards on flaky WiFi would silently drop their poll connection — I added a heartbeat and reconnect logic to catch that.',
      'Voice commands are ambiguous by nature ("turn it off" — turn what off?) so I had to design a minimal but forgiving command grammar.',
      'Debugging hardware-in-the-loop is slower than debugging software alone; a lot of this project was patience, not code.'
    ],
    lessons: 'Working across the software/hardware boundary taught me to design for failure by default — networks drop, microphones mishear, relays stick. The system had to assume all of that would happen and stay usable anyway.',
    timeline: 'Hardware bring-up and firmware first, then the Flask relay layer, then voice parsing layered on top last.',
    future: ['Support for more device types beyond relays (dimmers, sensors)', 'Local fallback mode when internet is down', 'A proper mobile app instead of a browser dashboard'],
    outcome: 'Working end-to-end on a bench setup with two ESP32 nodes — voice command to relay action holds up over a real internet connection, not just local WiFi. No live public demo since it controls physical hardware sitting on my desk, but the code and firmware are on GitHub.',
    meta: { role: 'Solo developer', duration: '~6 weeks', type: 'IoT system' },
    metrics: [
      { label: 'Status', value: 'Completed' },
      { label: 'Hardware', value: 'ESP32' },
      { label: 'Control range', value: 'Internet-wide' }
    ]
  },
  {
    id: 'yt-automation',
    title: 'AI YouTube Video Automation Platform',
    tagline: 'Script to published video, with as little manual work as possible.',
    status: 'testing',
    statusLabel: 'Testing',
    cover: 'assets/images/projects/yt-cover.png',
    gallery: ['assets/images/projects/yt-1.png', 'assets/images/projects/yt-2.png'],
    summary: 'An AI-powered platform generating complete YouTube Shorts and long-form videos — automated script, voice, subtitle, image and video generation, thumbnail creation and rendering.',
    tags: ['AI Generation', 'Automation', 'Video Pipeline'],
    github: 'https://github.com/pavankumarreddy2006/yotube-',
    demo: null,
    overview: 'An end-to-end content pipeline: give it a topic, and it generates a script, turns that script into narrated audio, generates supporting visuals, assembles a video with subtitles, and produces a thumbnail — all without touching a video editor.',
    problem: 'Making consistent video content is mostly repetitive production work — writing, recording, syncing subtitles, exporting — not creative decision-making. I wanted to see how much of that repetitive middle section could be automated while still leaving room to review output before it goes anywhere public.',
    solution: 'I split the pipeline into independent stages (script → voice → visuals → subtitles → render → thumbnail) that each do one job and pass their output to the next, so any stage can be improved or swapped without rebuilding the whole system. It currently runs as a dashboard where I trigger and review each stage.',
    architecture: [
      'A generation stage produces a structured script from a topic prompt.',
      'Text-to-speech turns the script into narration audio.',
      'An image/video generation stage produces supporting visuals per script segment.',
      'A rendering stage assembles audio, visuals and generated subtitles into a final video file.',
      'A separate stage generates a matching thumbnail.',
      'A dashboard ties the stages together and tracks job status.'
    ],
    stack: ['Python', 'AI script generation', 'Text-to-speech', 'AI image/video generation', 'Automation dashboard'],
    features: [
      'One-click script-to-video pipeline for Shorts and long-form',
      'Automated subtitle generation synced to narration',
      'Automated thumbnail generation',
      'Dashboard for tracking and reviewing each pipeline stage'
    ],
    challenges: [
      'Chaining several generative stages means errors compound — a slightly-off script makes every downstream stage worse, so I added a manual review checkpoint after scripting.',
      'Render times for longer videos are still rough; this is the main reason the project is still in testing rather than shipped.',
      'Keeping generated visuals actually relevant to the script, rather than just topically similar, is an ongoing tuning problem.'
    ],
    lessons: 'Automation pipelines are only as trustworthy as their weakest stage. I learned to design for inspection — being able to see and fix stage 2 without redoing stage 1 — rather than treating it as one black box.',
    timeline: 'Currently in active testing; script and voice stages are stable, visual generation and rendering are still being tuned.',
    future: ['Automatic YouTube upload', 'SEO optimization for titles and descriptions', 'Multi-language support', 'An analytics dashboard for published videos'],
    outcome: 'Two of five pipeline stages (script and voice) are stable enough to trust without review. Visual generation and rendering are still inconsistent, which is why this stays labeled "testing" rather than "completed" — better to be upfront about that than call it done early.',
    meta: { role: 'Solo developer', duration: 'Ongoing', type: 'Automation pipeline' },
    metrics: [
      { label: 'Status', value: 'Testing' },
      { label: 'Pipeline stages', value: '5' },
      { label: 'Stable stages', value: '2 of 5' }
    ]
  },
  {
    id: 'smart-bag',
    title: 'Smart Punching Bag',
    tagline: 'A punching bag that scores your form, not just your ego.',
    status: 'prototype',
    statusLabel: 'Prototype',
    cover: 'assets/images/projects/bag-cover.png',
    gallery: ['assets/images/projects/bag-1.png', 'assets/images/projects/bag-2.png'],
    summary: 'An AI-powered smart punching bag measuring punch force, speed, count and reaction time using intelligent sensors, embedded systems and AI analytics.',
    tags: ['Embedded Systems', 'Sensors', 'AI Analytics'],
    github: 'https://github.com/pavankumarreddy2006',
    demo: null,
    overview: 'A physical training device that instruments a standard punching bag with sensors to measure punch force, speed, count and reaction time, then surfaces that data as feedback a boxer can actually use to train.',
    problem: 'A punching bag on its own gives zero feedback beyond "did I hit it." Serious training benefits from knowing whether power or speed is improving over time, but commercial smart-bag hardware is expensive and closed. I wanted to see what a low-cost version could measure with off-the-shelf sensors.',
    solution: 'An embedded sensor unit mounted in/on the bag captures impact data (force and timing) and streams it to a microcontroller, which timestamps and forwards readings for analysis. A lightweight analytics layer turns raw sensor readings into the metrics a trainer actually cares about — force, speed, punch count, reaction time.',
    architecture: [
      'Impact sensors capture raw force data on each strike.',
      'An embedded microcontroller samples sensor data and timestamps each event.',
      'Readings are forwarded for processing into derived metrics rather than raw signal.',
      'A simple output layer displays session metrics after a training round.'
    ],
    stack: ['Embedded Systems', 'Sensors', 'Microcontroller firmware', 'AI-assisted analytics'],
    features: [
      'Punch force measurement per strike',
      'Punch speed and reaction time tracking',
      'Running punch count for a session',
      'Session summary for reviewing training performance'
    ],
    challenges: [
      'Sensor noise from the bag swinging back is hard to distinguish from a genuine second hit — filtering that out is the current core problem.',
      'Mounting sensors durably inside a bag that gets punched repeatedly is as much a mechanical problem as a software one.',
      'Getting consistent readings across different punch styles (jab vs hook vs power shot) needs more calibration data than I currently have.'
    ],
    lessons: 'This is my first project where the hardest bugs were mechanical, not logical. It reframed how I think about "sensor accuracy" — the firmware can be correct and the reading can still be wrong because of how the sensor is mounted.',
    timeline: 'Early-stage prototype — sensor rig and basic metrics working on a bench setup, not yet mounted in a full-size bag.',
    future: ['Move from bench prototype to a full-size mounted bag', 'Punch-type classification (jab / hook / uppercut)', 'A companion app for tracking progress over time'],
    outcome: 'The bench rig reliably logs force, speed and reaction time on single, isolated punches. Filtering out the bag\'s swing-back from a real second hit is unsolved, so it\'s not mounted on a full bag yet — that\'s the next milestone, not a finished product.',
    meta: { role: 'Solo developer', duration: 'Ongoing', type: 'Embedded hardware' },
    metrics: [
      { label: 'Status', value: 'Prototype' },
      { label: 'Metrics tracked', value: '4' },
      { label: 'Stage', value: 'Bench test' }
    ]
  }
];

/* =========================================================
   TOASTS
========================================================= */
function showToast(message, icon = 'fa-circle-check') {
  const stack = document.getElementById('toast-stack');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i><span>${message}</span>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), 320);
  }, 2600);
}

/* =========================================================
   LOADER + hero terminal typing
========================================================= */
function typeTerminal() {
  const el = document.getElementById('term-output');
  const lines = [
    { label: 'name', value: 'Palla Pavan Kumar Reddy' },
    { label: 'role', value: 'AI / Full Stack / IoT Developer' },
    { label: 'stack', value: 'Python · Flask · JS · ESP32' },
    { label: 'status', value: 'Open to internships' }
  ];
  let li = 0;
  function nextLine() {
    if (li >= lines.length) {
      el.innerHTML += `\n<span class="tp">pavan@dev</span><span class="tc"> ~ % </span><span class="term-cursor"></span>`;
      return;
    }
    const { label, value } = lines[li];
    const prefix = `\n<span class="tk">${label}</span><span class="tc">:</span> `;
    el.innerHTML += prefix;
    let ci = 0;
    const span = document.createElement('span');
    span.className = 'to';
    el.appendChild(span);
    const typer = setInterval(() => {
      span.textContent += value[ci];
      ci++;
      if (ci >= value.length) {
        clearInterval(typer);
        li++;
        setTimeout(nextLine, 220);
      }
    }, prefersReducedMotion ? 0 : 22);
  }
  nextLine();
}

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    typeTerminal();
  }, prefersReducedMotion ? 100 : 1500);
});

/* =========================================================
   THEME TOGGLE
========================================================= */
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ppkr-theme');
if (savedTheme) root.setAttribute('data-theme', savedTheme);
function updateThemeIcon() {
  const theme = root.getAttribute('data-theme');
  themeToggle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}
updateThemeIcon();
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('ppkr-theme', next);
  updateThemeIcon();
  showToast(`${next === 'light' ? 'Light' : 'Dark'} mode enabled`, 'fa-palette');
});

/* =========================================================
   MOBILE MENU
========================================================= */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

/* =========================================================
   NAVBAR SCROLL STATE, ACTIVE LINK, SPINE, PROGRESS
========================================================= */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('main section[id], #certifications, #resume');
const navAnchors = document.querySelectorAll('.nav-link');
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');
const spineFill = document.getElementById('spine-fill');

function onScroll() {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 40);
  backToTop.classList.toggle('show', scrollY > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollY / docHeight : 0;
  scrollProgress.style.width = pct * 100 + '%';
  if (spineFill) {
    spineFill.style.strokeDashoffset = String(1 - pct);
  }

  let current = '';
  sections.forEach(sec => { if (scrollY >= sec.offsetTop - 140) current = sec.id; });
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' }));

/* Build spine nodes aligned to primary sections */
(function buildSpine() {
  const spineNodesEl = document.getElementById('spine-nodes');
  if (!spineNodesEl) return;
  const targets = ['home', 'about', 'looking-for', 'education', 'skills', 'projects', 'github', 'open-source', 'certifications', 'contact', 'faq'];
  function place() {
    spineNodesEl.innerHTML = '';
    const docHeight = document.documentElement.scrollHeight;
    targets.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const node = document.createElement('div');
      node.className = 'spine-node';
      node.style.top = (el.offsetTop / docHeight) * 100 + '%';
      node.dataset.target = id;
      spineNodesEl.appendChild(node);
    });
  }
  place();
  window.addEventListener('resize', debounce(place, 150), { passive: true });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const node = spineNodesEl.querySelector(`[data-target="${entry.target.id}"]`);
      if (node) node.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.3 });
  targets.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
})();

/* =========================================================
   CUSTOM CURSOR + SPOTLIGHT
========================================================= */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const spotlight = document.getElementById('spotlight');
let hasFinePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

if (hasFinePointer) {
  document.body.classList.add('no-cursor');
  let ringX = 0, ringY = 0, mx = 0, my = 0;
  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px';
    spotlight.style.setProperty('--sx', mx + 'px');
    spotlight.style.setProperty('--sy', my + 'px');
  });
  function animateRing() {
    ringX += (mx - ringX) * 0.18;
    ringY += (my - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, [data-tilt], input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
  });
} else {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

/* =========================================================
   CIRCUIT BACKGROUND (canvas) — PCB-style trace network
========================================================= */
const circuitCanvas = document.getElementById('circuit-bg');
const cctx = circuitCanvas.getContext('2d');
let nodes = [];
function resizeCircuit() {
  circuitCanvas.width = window.innerWidth;
  circuitCanvas.height = Math.min(window.innerHeight * 1.1, document.body.scrollHeight);
}
function initCircuit() {
  resizeCircuit();
  const cols = Math.max(6, Math.floor(circuitCanvas.width / 160));
  const rows = Math.max(4, Math.floor(circuitCanvas.height / 160));
  nodes = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > 0.62) {
        nodes.push({
          x: (i / (cols - 1)) * circuitCanvas.width + (Math.random() - 0.5) * 40,
          y: (j / (rows - 1)) * circuitCanvas.height + (Math.random() - 0.5) * 40,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }
  }
}
function drawCircuit() {
  cctx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
  const teal = 'rgba(53,214,196,';
  const amber = 'rgba(240,165,61,';
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 210) {
        cctx.beginPath();
        cctx.strokeStyle = teal + (0.08 * (1 - dist / 210)) + ')';
        cctx.lineWidth = 1;
        cctx.moveTo(a.x, a.y);
        cctx.lineTo(b.x, a.y === b.y ? b.y : b.y); // right-angle-ish trace
        cctx.lineTo(b.x, b.y);
        cctx.stroke();
      }
    }
  }
  nodes.forEach(n => {
    n.pulse += 0.01;
    const r = 1.4 + Math.sin(n.pulse) * 0.6;
    cctx.beginPath();
    cctx.arc(n.x, n.y, Math.max(r, 0.6), 0, Math.PI * 2);
    cctx.fillStyle = (Math.sin(n.pulse) > 0.6 ? amber : teal) + '0.55)';
    cctx.fill();
  });
  if (!prefersReducedMotion) requestAnimationFrame(drawCircuit);
}
initCircuit();
drawCircuit();
window.addEventListener('resize', debounce(initCircuit, 200), { passive: true });

/* =========================================================
   SCROLL REVEAL + COUNTERS
========================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
function observeReveal(scope = document) {
  scope.querySelectorAll('[data-reveal]:not(.in-view)').forEach(el => revealObserver.observe(el));
}
observeReveal();

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => entry.target.classList.toggle('in-view', entry.isIntersecting));
}, { threshold: 0.4 });
document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat-num').forEach(c => counterObserver.observe(c));

/* =========================================================
   TILT CARDS
========================================================= */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* =========================================================
   MAGNETIC BUTTONS + RIPPLE
========================================================= */
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
});

/* =========================================================
   COPY BUTTONS
========================================================= */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const value = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied "${value}" to clipboard`, 'fa-circle-check');
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => { btn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 1500);
    } catch {
      showToast('Could not copy — please copy manually', 'fa-triangle-exclamation');
    }
  });
});

/* =========================================================
   PROJECT RENDER + FILTER + SEARCH
========================================================= */
const projectsGrid = document.getElementById('projects-grid');
const noResults = document.getElementById('no-projects');
const noResultsQuery = document.getElementById('no-projects-query');
const statusClassMap = { completed: 'status-completed', testing: 'status-testing', prototype: 'status-prototype' };

function renderProjectCards() {
  projectsGrid.innerHTML = PROJECTS.map(p => `
    <article class="project-card glass" data-status="${p.status}" data-id="${p.id}" data-reveal tabindex="0" role="button" aria-label="Open case study: ${p.title}">
      <div class="project-cover">
        <img src="${p.cover}" alt="${p.title} interface preview" loading="lazy" />
        <span class="status-badge ${statusClassMap[p.status]} cover-status">${p.statusLabel}</span>
      </div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <div class="metric-row">${p.metrics.map(m => `<span class="metric-chip"><b>${m.value}</b>${m.label}</span>`).join('')}</div>
        <div class="tag-list">${p.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <button class="btn btn-sm btn-ghost open-case-study" data-id="${p.id}"><i class="fa-solid fa-book-open"></i> Case Study</button>
          <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost" onclick="event.stopPropagation()"><i class="fa-brands fa-github"></i> Code</a>
          ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-primary" onclick="event.stopPropagation()">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
        </div>
      </div>
    </article>
  `).join('');
  observeReveal(projectsGrid);

  projectsGrid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      openCaseStudy(card.dataset.id);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCaseStudy(card.dataset.id); }
    });
  });
}
renderProjectCards();

const chips = document.querySelectorAll('.chip');
const searchInput = document.getElementById('project-search');
let activeFilter = 'all';
function applyProjectFilters() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  projectsGrid.querySelectorAll('.project-card').forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.status === activeFilter;
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    const show = matchesFilter && matchesSearch;
    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });
  noResultsQuery.textContent = query;
  noResults.hidden = visibleCount !== 0;
}
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    applyProjectFilters();
  });
});
searchInput.addEventListener('input', applyProjectFilters);

/* =========================================================
   PROJECT CASE STUDY MODAL
========================================================= */
const modal = document.getElementById('project-modal');
const modalCoverImg = document.getElementById('modal-cover-img');
const modalTitle = document.getElementById('modal-title');
const modalStatus = document.getElementById('modal-status');
const modalTagline = document.getElementById('modal-tagline');
const modalLinks = document.getElementById('modal-links');
const modalTabs = document.getElementById('modal-tabs');
const modalTabpanels = document.getElementById('modal-tabpanels');
let lastFocusedEl = null;

function buildTabPanels(p) {
  const panels = [
    { id: 'overview', label: 'Overview', html: `<p>${p.overview}</p><div class="meta-grid"><div><span>Role</span><b>${p.meta.role}</b></div><div><span>Duration</span><b>${p.meta.duration}</b></div><div><span>Type</span><b>${p.meta.type}</b></div></div>${p.gallery && p.gallery.length ? `<p style="margin-top:24px;"><strong style="color:var(--text)">Screenshots</strong></p><div class="gallery-strip">${p.gallery.map(g => `<img src="${g}" alt="${p.title} screenshot" class="lightbox-trigger" loading="lazy" data-src="${g}" />`).join('')}</div>` : ''}` },
    { id: 'problem', label: 'Problem', html: `<p>${p.problem}</p>` },
    { id: 'solution', label: 'Solution', html: `<p>${p.solution}</p>` },
    { id: 'stack', label: 'Tech Stack', html: `<ul>${p.architecture.map(a => `<li>${a}</li>`).join('')}</ul><div class="tag-list" style="margin-top:18px;">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>` },
    { id: 'features', label: 'Key Features', html: `<ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>` },
    { id: 'challenges', label: 'Challenges', html: `<ul>${p.challenges.map(c => `<li>${c}</li>`).join('')}</ul><p style="margin-top:16px;"><strong style="color:var(--text)">What I learned: </strong>${p.lessons}</p>` },
    { id: 'outcome', label: 'Outcome', html: `<p>${p.outcome}</p><div class="metric-row" style="margin:18px 0 22px;">${p.metrics.map(m => `<span class="metric-chip"><b>${m.value}</b>${m.label}</span>`).join('')}</div><p><strong style="color:var(--text)">Timeline: </strong>${p.timeline}</p><p style="margin-top:10px;"><strong style="color:var(--text)">What's next:</strong></p><ul>${p.future.map(f => `<li>${f}</li>`).join('')}</ul>` }
  ];
  modalTabs.innerHTML = panels.map((panel, i) => `<button class="modal-tab ${i === 0 ? 'active' : ''}" data-tab="${panel.id}" role="tab" aria-selected="${i === 0}">${panel.label}</button>`).join('');
  modalTabpanels.innerHTML = panels.map((panel, i) => `<div class="modal-tabpanel ${i === 0 ? 'active' : ''}" data-panel="${panel.id}" role="tabpanel">${panel.html}</div>`).join('');

  modalTabs.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      modalTabs.querySelectorAll('.modal-tab').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      modalTabpanels.querySelectorAll('.modal-tabpanel').forEach(pnl => pnl.classList.toggle('active', pnl.dataset.panel === tab.dataset.tab));
    });
  });
  modalTabpanels.querySelectorAll('.lightbox-trigger').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.dataset.src, img.alt));
  });
}

function openCaseStudy(id) {
  const p = PROJECTS.find(pr => pr.id === id);
  if (!p) return;
  lastFocusedEl = document.activeElement;
  modalCoverImg.src = p.cover;
  modalCoverImg.alt = p.title + ' cover image';
  modalTitle.textContent = p.title;
  modalStatus.textContent = p.statusLabel;
  modalStatus.className = 'status-badge ' + statusClassMap[p.status];
  modalTagline.textContent = p.tagline;
  modalLinks.innerHTML = `
    <a href="${p.github}" target="_blank" rel="noopener" class="btn btn-sm btn-ghost"><i class="fa-brands fa-github"></i> View Code</a>
    ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-sm btn-primary">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : `<span class="btn btn-sm btn-ghost" style="opacity:.6;cursor:default;"><i class="fa-solid fa-hammer"></i> No live demo yet</span>`}
  `;
  buildTabPanels(p);
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  document.getElementById('modal-close').focus();
}
function closeCaseStudy() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  if (lastFocusedEl) lastFocusedEl.focus();
}
document.getElementById('modal-close').addEventListener('click', closeCaseStudy);
modal.addEventListener('click', (e) => { if (e.target === modal) closeCaseStudy(); });

/* =========================================================
   LIGHTBOX
========================================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
function openLightbox(src, alt) {
  lightboxImg.src = src; lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
}
function closeLightbox() { lightbox.classList.remove('open'); }
document.getElementById('lb-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

/* =========================================================
   GLOBAL ESC HANDLER
========================================================= */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox.classList.contains('open')) closeLightbox();
    else if (modal.classList.contains('open')) closeCaseStudy();
    else if (document.getElementById('cmdk-overlay').classList.contains('open')) closeCmdk();
  }
});

/* =========================================================
   CONTACT FORM — validation + Web3Forms
========================================================= */
const WEB3FORMS_ACCESS_KEY = "93f42cda-bdb4-4117-994a-03a4edc17f48";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const FIELD_RULES = {
  name: { test: v => v.length >= 2, message: 'Please enter your name (2+ characters).' },
  email: { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Please enter a valid email address.' },
  subject: { test: v => v.length >= 3, message: 'Please add a short subject.' },
  message: { test: v => v.length >= 10, message: 'Message should be at least 10 characters.' }
};

function validateField(id) {
  const rule = FIELD_RULES[id];
  const input = document.getElementById(id);
  const errorEl = document.getElementById('err-' + id);
  const row = input.closest('.form-row');
  const valid = rule.test(input.value.trim());
  row.classList.toggle('error', !valid);
  errorEl.textContent = valid ? '' : rule.message;
  return valid;
}
function validateForm() {
  return Object.keys(FIELD_RULES).map(validateField).every(Boolean);
}
Object.keys(FIELD_RULES).forEach(id => {
  document.getElementById(id).addEventListener('blur', () => validateField(id));
});

let isSubmittingContactForm = false;

async function submitContactForm(form, timeoutMs = 12000) {
  const formData = new FormData(form);
  formData.append('access_key', WEB3FORMS_ACCESS_KEY);
  // Web3Forms expects "name"/"email"/"message" — map our field names without touching the visible inputs.
  formData.append('name', formData.get('user_name'));
  formData.append('email', formData.get('user_email'));

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let res;
  try {
    res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
      signal: controller.signal
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('The request timed out. Check your connection and try again.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.message || `Web3Forms request failed (${res.status})`);
  }
  return data;
}

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  if (isSubmittingContactForm) return; // guard against double submission

  if (!validateForm()) {
    showToast('Please fix the highlighted fields', 'fa-triangle-exclamation');
    return;
  }

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === 'PASTE_ACCESS_KEY_HERE') {
    formStatus.textContent = 'Form validated — add your Web3Forms access key in js/main.js to enable real sending.';
    formStatus.style.color = 'var(--amber)';
    showToast('Form looks good — Web3Forms key not yet configured', 'fa-circle-info');
    return;
  }

  const submitBtn = document.getElementById('form-submit');
  const originalText = submitBtn.innerHTML;

  isSubmittingContactForm = true;
  submitBtn.disabled = true;
  submitBtn.classList.remove('btn-success', 'btn-error');
  submitBtn.innerHTML = '<span class="btn-text">Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  formStatus.textContent = '';

  try {
    await submitContactForm(this);
    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
    formStatus.style.color = '#4ade80';
    showToast('Message sent', 'fa-paper-plane');
    submitBtn.classList.add('btn-success');
    submitBtn.innerHTML = '<span class="btn-text">Sent</span> <i class="fa-solid fa-check"></i>';
    contactForm.reset();
    setTimeout(() => {
      isSubmittingContactForm = false;
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-success');
      submitBtn.innerHTML = originalText;
    }, 1800);
  } catch (err) {
    console.error('Web3Forms send failed:', err);
    formStatus.textContent = 'Something went wrong. Please try emailing directly.';
    formStatus.style.color = 'var(--red-signal)';
    showToast('Could not send — try email directly', 'fa-triangle-exclamation');
    submitBtn.classList.add('btn-error');
    setTimeout(() => submitBtn.classList.remove('btn-error'), 500);
    isSubmittingContactForm = false;
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

/* =========================================================
   GITHUB LIVE STATS
========================================================= */
(async function loadGithubStats() {
  const username = 'pavankumarreddy2006';
  const repoCountEl = document.getElementById('gh-repos');
  const followersEl = document.getElementById('gh-followers');
  const starsEl = document.getElementById('gh-stars');
  const langsEl = document.getElementById('gh-langs');
  const commitsList = document.getElementById('gh-commits');
  const graph = document.getElementById('contribution-graph');

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error('user fetch failed');
    const user = await userRes.json();
    repoCountEl.textContent = user.public_repos ?? '—';
    followersEl.textContent = user.followers ?? '—';
    repoCountEl.classList.remove('loading'); followersEl.classList.remove('loading');

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`);
    if (!reposRes.ok) throw new Error('repos fetch failed');
    const repos = await reposRes.json();

    const totalStars = Array.isArray(repos) ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0) : 0;
    starsEl.textContent = totalStars;
    starsEl.classList.remove('loading');

    const langSet = new Set(Array.isArray(repos) ? repos.map(r => r.language).filter(Boolean) : []);
    langsEl.textContent = langSet.size || '—';
    langsEl.classList.remove('loading');

    if (Array.isArray(repos) && repos.length) {
      const recent = [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5);
      commitsList.innerHTML = recent.map(r => `
        <li>
          <i class="fa-solid fa-code-branch"></i>
          <div>
            <div class="commit-msg">Updated <a href="${r.html_url}" target="_blank" rel="noopener" style="color:var(--teal)">${r.name}</a></div>
            <div class="commit-meta">${new Date(r.pushed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} · ${r.language || 'multiple languages'}</div>
          </div>
        </li>`).join('');

      const byWeek = new Array(26).fill(0);
      const now = Date.now();
      repos.forEach(r => {
        const created = new Date(r.created_at).getTime();
        const weeksAgo = Math.floor((now - created) / (7 * 24 * 3600 * 1000));
        if (weeksAgo >= 0 && weeksAgo < 26) byWeek[25 - weeksAgo]++;
      });
      const max = Math.max(1, ...byWeek);
      graph.innerHTML = byWeek.map(v => {
        const intensity = v / max;
        const bg = v === 0 ? 'var(--panel-hi)' : `rgba(53,214,196,${0.25 + intensity * 0.75})`;
        return `<div class="cg-cell" style="background:${bg}" title="${v} repo event(s)"></div>`;
      }).join('');
    } else {
      commitsList.innerHTML = '<li class="gh-empty">No public repository activity found.</li>';
    }
  } catch (err) {
    repoCountEl.textContent = '—'; followersEl.textContent = '—'; starsEl.textContent = '—'; langsEl.textContent = '—';
    commitsList.innerHTML = '<li class="gh-empty">GitHub data unavailable right now — check back later or visit the profile directly.</li>';
    graph.innerHTML = '<p class="gh-empty">Unable to load activity snapshot.</p>';
  }
})();

/* =========================================================
   COMMAND PALETTE (Ctrl+K)
========================================================= */
const cmdkOverlay = document.getElementById('cmdk-overlay');
const cmdkInput = document.getElementById('cmdk-input');
const cmdkList = document.getElementById('cmdk-list');
let cmdkSelected = 0;

function buildCommands() {
  const nav = ['home', 'about', 'education', 'skills', 'projects', 'github', 'certifications', 'resume', 'contact']
    .map(id => ({ icon: 'fa-arrow-right', label: `Go to ${id.charAt(0).toUpperCase() + id.slice(1)}`, group: 'Navigate', action: () => { document.getElementById(id).scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }); } }));
  const projects = PROJECTS.map(p => ({ icon: 'fa-diagram-project', label: `Open case study: ${p.title}`, group: 'Projects', action: () => openCaseStudy(p.id) }));
  const actions = [
    { icon: 'fa-download', label: 'Download resume', group: 'Actions', action: () => { window.open('assets/resume.pdf', '_blank'); } },
    { icon: 'fa-envelope', label: 'Copy email address', group: 'Actions', action: () => { navigator.clipboard.writeText('pavankumarpalla3@gmail.com'); showToast('Email copied to clipboard'); } },
    { icon: 'fa-brands fa-github', label: 'Open GitHub profile', group: 'Actions', action: () => window.open('https://github.com/pavankumarreddy2006', '_blank') },
    { icon: 'fa-brands fa-linkedin', label: 'Open LinkedIn profile', group: 'Actions', action: () => window.open('https://www.linkedin.com/in/pavankumarreddy-palla-48a611373/', '_blank') },
    { icon: 'fa-sun', label: 'Toggle theme', group: 'Actions', action: () => themeToggle.click() }
  ];
  return [...nav, ...projects, ...actions];
}
const ALL_COMMANDS = buildCommands();

function renderCmdkList(query = '') {
  const q = query.toLowerCase();
  const filtered = ALL_COMMANDS.filter(c => c.label.toLowerCase().includes(q));
  cmdkSelected = 0;
  if (!filtered.length) {
    cmdkList.innerHTML = `<div class="cmdk-group-label">No results</div>`;
    return;
  }
  let html = ''; let lastGroup = '';
  filtered.forEach((c, i) => {
    if (c.group !== lastGroup) { html += `<div class="cmdk-group-label">${c.group}</div>`; lastGroup = c.group; }
    html += `<div class="cmdk-item ${i === 0 ? 'selected' : ''}" data-index="${i}"><i class="fa-solid ${c.icon.startsWith('fa-brands') ? '' : c.icon}"></i><span>${c.label}</span></div>`;
  });
  cmdkList.innerHTML = html;
  cmdkList.dataset.count = filtered.length;
  cmdkList.querySelectorAll('.cmdk-item').forEach(item => {
    item.addEventListener('click', () => { filtered[+item.dataset.index].action(); closeCmdk(); });
  });
  cmdkList._filtered = filtered;
}
function openCmdk() {
  cmdkOverlay.classList.add('open');
  document.body.classList.add('modal-open');
  cmdkInput.value = '';
  renderCmdkList('');
  setTimeout(() => cmdkInput.focus(), 60);
}
function closeCmdk() {
  cmdkOverlay.classList.remove('open');
  document.body.classList.remove('modal-open');
}
document.getElementById('cmdk-trigger').addEventListener('click', openCmdk);
cmdkOverlay.addEventListener('click', (e) => { if (e.target === cmdkOverlay) closeCmdk(); });
cmdkInput.addEventListener('input', () => renderCmdkList(cmdkInput.value));
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); cmdkOverlay.classList.contains('open') ? closeCmdk() : openCmdk(); }
});
cmdkInput.addEventListener('keydown', (e) => {
  const items = cmdkList.querySelectorAll('.cmdk-item');
  const filtered = cmdkList._filtered || [];
  if (!items.length) return;
  if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSelected = Math.min(cmdkSelected + 1, items.length - 1); }
  if (e.key === 'ArrowUp') { e.preventDefault(); cmdkSelected = Math.max(cmdkSelected - 1, 0); }
  if (e.key === 'Enter') { e.preventDefault(); filtered[cmdkSelected]?.action(); closeCmdk(); }
  items.forEach((it, i) => it.classList.toggle('selected', i === cmdkSelected));
  items[cmdkSelected]?.scrollIntoView({ block: 'nearest' });
});

/* =========================================================
   PWA — service worker + install prompt
========================================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
let deferredInstallPrompt = null;
const installBanner = document.getElementById('install-banner');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  if (!localStorage.getItem('ppkr-install-dismissed')) {
    setTimeout(() => installBanner.classList.add('show'), 4000);
  }
});
document.getElementById('install-yes').addEventListener('click', async () => {
  installBanner.classList.remove('show');
  if (deferredInstallPrompt) { deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; }
});
document.getElementById('install-no').addEventListener('click', () => {
  installBanner.classList.remove('show');
  localStorage.setItem('ppkr-install-dismissed', '1');
});
