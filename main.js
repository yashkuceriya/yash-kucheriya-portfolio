// ============================================
// THREE.JS INTERACTIVE PARTICLE HERO
// ============================================
(function() {
  if (typeof THREE === 'undefined') return;

  var canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Particle count — reduced on mobile
  var isMobile = window.innerWidth < 768;
  var particleCount = isMobile ? 600 : 1500;
  var positions = new Float32Array(particleCount * 3);
  var velocities = new Float32Array(particleCount * 3);
  var sizes = new Float32Array(particleCount);

  var spread = 80;
  for (var i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    sizes[i] = Math.random() * 1.5 + 0.5;
  }

  var geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  var material = new THREE.PointsMaterial({
    color: 0xd97756,
    size: 0.8,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false
  });

  var particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse tracking
  var mouse = { x: 0, y: 0 };
  var targetRotation = { x: 0, y: 0 };

  document.addEventListener('mousemove', function(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  var heroSection = document.getElementById('home');
  var isVisible = true;

  function animate() {
    requestAnimationFrame(animate);

    // Skip rendering if hero is scrolled past
    if (window.scrollY > heroSection.offsetHeight + 100) {
      if (isVisible) { isVisible = false; }
      return;
    }
    isVisible = true;

    // Smooth rotation toward mouse
    targetRotation.x += (mouse.y * 0.3 - targetRotation.x) * 0.05;
    targetRotation.y += (mouse.x * 0.5 - targetRotation.y) * 0.05;
    particles.rotation.x = targetRotation.x;
    particles.rotation.y = targetRotation.y;

    // Drift particles
    var pos = geometry.attributes.position.array;
    for (var i = 0; i < particleCount; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around bounds
      if (pos[i * 3] > spread / 2) pos[i * 3] = -spread / 2;
      if (pos[i * 3] < -spread / 2) pos[i * 3] = spread / 2;
      if (pos[i * 3 + 1] > spread / 2) pos[i * 3 + 1] = -spread / 2;
      if (pos[i * 3 + 1] < -spread / 2) pos[i * 3 + 1] = spread / 2;
    }
    geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Theme-aware particle color
  var observer = new MutationObserver(function() {
    var isLight = document.body.classList.contains('light-mode');
    material.color.setHex(isLight ? 0xb45309 : 0xd97756);
    material.opacity = isLight ? 0.4 : 0.6;
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();


// Resume download
function openURL() {
  window.open('./src/pdf/Yash_Vijay_Kucheriya_Resume.pdf', '_blank', 'noopener');
}

// Project preview — open in new tab
function openProjectPreview(url) {
  window.open(url, '_blank', 'noopener');
}

// Show More / Show Less projects toggle
function toggleMoreProjects() {
  var container = document.getElementById('more-projects');
  var btnText = document.getElementById('show-more-text');
  var arrow = document.getElementById('show-more-arrow');

  if (container.classList.contains('more-projects-hidden')) {
    container.classList.remove('more-projects-hidden');
    container.classList.add('more-projects-visible');
    btnText.textContent = 'Show Less';
    arrow.style.transform = 'rotate(180deg)';
    initReveal();
  } else {
    container.classList.remove('more-projects-visible');
    container.classList.add('more-projects-hidden');
    btnText.textContent = 'Show More Projects';
    arrow.style.transform = 'rotate(0deg)';
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }
}

const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

// Setting toggle menu
var audio = document.getElementById("audioPlayer"),
  loader = document.getElementById("preloader");
function settingtoggle() {
  document.getElementById("setting-container").classList.toggle("settingactivate");
  document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
  document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}
function playpause() {
  if (document.getElementById("switchforsound").checked) {
    audio.play();
  } else {
    audio.pause();
  }
}

function visualmode() {
  document.body.classList.toggle("light-mode");
  document.querySelectorAll(".needtobeinvert").forEach(function (e) {
    e.classList.toggle("invertapplied");
  });
  var isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}
window.addEventListener("load", function () {
  loader.classList.add("loaded");
  document.querySelector(".hey").classList.add("popup");
});

function hamburgerMenu() {
  var btn = document.getElementById("hamburger-button");
  var isOpen = document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  document.body.classList.toggle("stopscrolling");
  document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
  document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
  document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
  var btn = document.getElementById("hamburger-button");
  btn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("stopscrolling");
  document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
  document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
  document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
  document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

const sections = document.querySelectorAll("section"),
  navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
  mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

console.log(
  "%c Designed and Developed by Yash Vijay Kucheriya",
  "background-image: linear-gradient(90deg,#b45309,#d97756); color: white;font-weight:900;font-size:1rem; padding:20px;"
);

const mybutton = document.getElementById("backtotopbutton");
function scrolltoTopfunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll progress bar
var scrollProgressEl = document.createElement('div');
scrollProgressEl.className = 'scroll-progress';
document.body.appendChild(scrollProgressEl);

// Cache scroll-indicator reference
var scrollIndicator = document.getElementById('scroll-indicator');

// Single rAF-throttled scroll handler
let scrollTicking = false;
window.addEventListener('scroll', function() {
  if (!scrollTicking) {
    requestAnimationFrame(function() {
      const scrollTop = window.scrollY;

      // Navbar hide/show on mobile
      if (window.innerWidth <= 768) {
        navbar.style.top = scrollTop > lastScrollTop ? '-80px' : '0';
      }
      lastScrollTop = scrollTop;

      // Hide scroll indicator
      if (scrollIndicator && scrollTop > 100) {
        scrollIndicator.classList.add('hidden');
        scrollIndicator = null;
      }

      // Scroll progress bar
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressEl.style.width = progress + '%';

      // Back to top button
      mybutton.style.display = scrollTop > 400 ? 'flex' : 'none';

      // Active section highlighting
      let currentSection = '';
      sections.forEach(function(section) {
        if (scrollTop >= section.offsetTop - 200) {
          currentSection = section.getAttribute('id');
        }
      });
      mobilenavLi.forEach(function(li) {
        li.classList.remove('activeThismobiletab');
        if (li.classList.contains(currentSection)) li.classList.add('activeThismobiletab');
      });
      navLi.forEach(function(li) {
        li.classList.remove('activeThistab');
        if (li.classList.contains(currentSection)) li.classList.add('activeThistab');
      });

      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// Animated stat counters
(function() {
  var counted = false;
  var statsRow = document.querySelector('.stats-row');
  if (!statsRow) return;
  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !counted) {
      counted = true;
      document.querySelectorAll('.stat-number').forEach(function(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        var current = 0;
        var step = Math.max(1, Math.floor(target / 30));
        var interval = setInterval(function() {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current;
        }, 50);
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(statsRow);
})();

// Custom reveal system (replaces AOS)
function initReveal() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function(el) { observer.observe(el); });
}
initReveal();

// Card glow follow + subtle tilt effect
var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
var projectCards = document.querySelectorAll('.project-card');
document.addEventListener('mousemove', function(e) {
  projectCards.forEach(function(card) {
    var rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');

    if (!isTouchDevice) {
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var rotateX = ((e.clientY - centerY) / rect.height) * -4;
      var rotateY = ((e.clientX - centerX) / rect.width) * 4;
      card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
    }
  });
});

if (!isTouchDevice) {
  projectCards.forEach(function(card) {
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}

// Contact form validation & submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: document.getElementById('contact-name'), err: document.getElementById('name-error'), validate: v => v.trim() ? '' : 'Please enter your name' },
    email: { el: document.getElementById('contact-email'), err: document.getElementById('email-error'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email' },
    message: { el: document.getElementById('contact-message'), err: document.getElementById('message-error'), validate: v => v.trim() ? '' : 'Please enter a message' }
  };

  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('contact-submit');

  Object.values(fields).forEach(f => {
    f.el.addEventListener('blur', () => {
      const msg = f.validate(f.el.value);
      f.err.textContent = msg;
      f.el.classList.toggle('invalid', !!msg);
    });
    f.el.addEventListener('input', () => {
      if (f.el.classList.contains('invalid')) {
        const msg = f.validate(f.el.value);
        f.err.textContent = msg;
        f.el.classList.toggle('invalid', !!msg);
      }
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;
    Object.values(fields).forEach(f => {
      const msg = f.validate(f.el.value);
      f.err.textContent = msg;
      f.el.classList.toggle('invalid', !!msg);
      if (msg) valid = false;
    });
    if (!valid) return;

    submitBtn.classList.add('loading');
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    const data = new FormData(form);
    const name = data.get('name');
    const email = data.get('email');
    const subject = data.get('subject') || 'Portfolio Contact';
    const message = data.get('message');
    const mailtoLink = 'mailto:ykucheri@asu.edu?subject=' + encodeURIComponent(subject + ' - from ' + name) + '&body=' + encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message);

    window.open(mailtoLink, '_self');
    setTimeout(function() {
      submitBtn.classList.remove('loading');
      feedback.textContent = 'Opening your email client... If nothing happened, email ykucheri@asu.edu directly.';
      feedback.className = 'form-feedback success';
      form.reset();
      Object.values(fields).forEach(f => { f.el.classList.remove('invalid'); f.err.textContent = ''; });
    }, 500);
  });
});

// Custom cursor
document.addEventListener('DOMContentLoaded', function() {
  const cursorInner = document.querySelector('.cursor-inner');
  const cursorOuter = document.querySelector('.cursor-outer');

  if (cursorInner && cursorOuter) {
    let mouseX = 0, mouseY = 0, outerX = 0, outerY = 0;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorInner.style.left = mouseX + 'px';
      cursorInner.style.top = mouseY + 'px';
    });

    function animateOuterCursor() {
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      cursorOuter.style.left = outerX + 'px';
      cursorOuter.style.top = outerY + 'px';
      requestAnimationFrame(animateOuterCursor);
    }
    animateOuterCursor();

    const hoverElements = document.querySelectorAll('a, button, .project-box, .tech-stack-box, [tabindex]');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        cursorInner.classList.add('hover');
        cursorOuter.classList.add('hover');
      });
      element.addEventListener('mouseleave', function() {
        cursorInner.classList.remove('hover');
        cursorOuter.classList.remove('hover');
      });
    });
  }
});


// ============================================
// ARCHIVE TABLE TOGGLE
// ============================================
function toggleArchive() {
  var more = document.getElementById('archive-more');
  var text = document.getElementById('archive-toggle-text');
  var arrow = document.getElementById('archive-toggle-arrow');
  if (more.classList.contains('archive-more-hidden')) {
    more.classList.remove('archive-more-hidden');
    more.classList.add('archive-more-visible');
    text.textContent = 'Show Less';
    arrow.style.transform = 'rotate(180deg)';
  } else {
    more.classList.remove('archive-more-visible');
    more.classList.add('archive-more-hidden');
    text.textContent = 'Show More';
    arrow.style.transform = 'rotate(0deg)';
  }
}


// ============================================
// 1. LENIS SMOOTH SCROLL
// ============================================
(function() {
  if (typeof Lenis === 'undefined') return;

  var lenis = new Lenis({
    duration: 1.2,
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Make anchor links work with Lenis
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target);
      }
    });
  });
})();

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================
(function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Experience timeline — draw line on scroll
  var timelineLine = document.querySelector('.timeline-line-fill');
  var timelineContainer = document.querySelector('.timeline');
  if (timelineLine && timelineContainer) {
    ScrollTrigger.create({
      trigger: timelineContainer,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.3,
      onUpdate: function(self) {
        timelineLine.style.height = (self.progress * 100) + '%';
      }
    });
  }

  // Timeline items — highlight dots on scroll
  gsap.utils.toArray('.timeline-item').forEach(function(item) {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: function() { item.classList.add('in-view'); },
      onLeaveBack: function() { item.classList.remove('in-view'); }
    });
  });
})();


// ============================================
// PROJECT FILTERING
// ============================================
(function() {
  var filterBar = document.getElementById('project-filter-bar');
  var grid = document.getElementById('all-projects-grid');
  if (!filterBar || !grid) return;

  // Category mapping — keywords to look for in tech tags + subheading text
  var categories = {
    'ai-ml':     { tags: ['claude', 'openai', 'gpt', 'gemini', 'gemma', 'pytorch', 'tensorflow', 'langchain', 'langsmith', 'chromadb', 'rag', 'llama', 'hugging face', 'whisper', 'nlp', 'xgboost', 'sagemaker', 'elevenlabs', 'mediapipe', 'pgvector'], sub: [] },
    'nextjs':    { tags: ['next.js'], sub: [] },
    'python':    { tags: ['python', 'fastapi', 'django'], sub: [] },
    'education': { tags: [], sub: ['tutor', 'tutoring', 'learning', 'education', 'k-12', 'literacy', 'children', 'ages', 'teacher'] }
  };

  var cards = grid.querySelectorAll('.project-box-wrapper');

  filterBar.addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    var filter = btn.getAttribute('data-filter');

    filterBar.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.toggle('active', b === btn);
    });

    cards.forEach(function(card) {
      if (filter === 'all') {
        card.classList.remove('filter-hidden');
        return;
      }

      var cat = categories[filter];
      if (!cat) { card.classList.add('filter-hidden'); return; }

      var tagTexts = [];
      card.querySelectorAll('.tech-tag').forEach(function(t) {
        tagTexts.push(t.textContent.toLowerCase().trim());
      });
      var subTexts = [];
      card.querySelectorAll('.ProjectSubheading, .ProjectHeading, .ProjectDescription').forEach(function(el) {
        subTexts.push(el.textContent.toLowerCase());
      });
      var subBlob = subTexts.join(' ');

      var tagMatch = cat.tags.some(function(kw) {
        return tagTexts.some(function(tag) { return tag === kw || tag.includes(kw); });
      });
      var subMatch = cat.sub.some(function(kw) { return subBlob.includes(kw); });

      card.classList.toggle('filter-hidden', !(tagMatch || subMatch));
    });
  });
})();


// ============================================
// COMMAND PALETTE (Cmd+K / Ctrl+K)
// ============================================
(function() {
  var overlay = document.getElementById('cmd-palette-overlay');
  var input = document.getElementById('cmd-palette-input');
  var resultsList = document.getElementById('cmd-palette-results');
  if (!overlay || !input || !resultsList) return;

  var selectedIndex = -1;

  // Items to search
  var items = [
    { type: 'section', label: 'Home', action: function() { scrollToEl('#home'); } },
    { type: 'section', label: 'About', action: function() { scrollToEl('#about'); } },
    { type: 'section', label: 'Skills', action: function() { scrollToEl('#skills'); } },
    { type: 'section', label: 'Education', action: function() { scrollToEl('#education'); } },
    { type: 'section', label: 'Experience', action: function() { scrollToEl('#experience'); } },
    { type: 'section', label: 'Projects', action: function() { scrollToEl('#projects'); } },
    { type: 'section', label: 'Contact', action: function() { scrollToEl('#contact'); } },
    { type: 'link', label: 'Resume / CV', action: function() { window.open('./src/pdf/Yash_Vijay_Kucheriya_Resume.pdf', '_blank'); } },
    { type: 'link', label: 'GitHub', action: function() { window.open('https://github.com/yashkuceriya', '_blank'); } },
    { type: 'link', label: 'LinkedIn', action: function() { window.open('https://www.linkedin.com/in/yash-kucheriya-b05a17162/', '_blank'); } },
    { type: 'link', label: 'Email', action: function() { window.location.href = 'mailto:ykucheri@asu.edu'; } },
    { type: 'action', label: 'Toggle Dark/Light Mode', action: function() { visualmode(); } }
  ];

  // Collect projects from the page
  document.querySelectorAll('.ProjectHeading').forEach(function(el) {
    var name = el.textContent.trim();
    // Find nearest parent that has a link
    var wrapper = el.closest('.project-box-wrapper') || el.closest('.timeline-card');
    if (wrapper) {
      items.push({
        type: 'project',
        label: name,
        action: function() { if (wrapper.scrollIntoView) wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      });
    }
  });

  function scrollToEl(selector) {
    var el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  function open() {
    overlay.classList.add('active');
    input.value = '';
    input.focus();
    render('');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    selectedIndex = -1;
    document.body.style.overflow = '';
  }

  function render(query) {
    var filtered = items;
    if (query) {
      var q = query.toLowerCase();
      filtered = items.filter(function(item) {
        return item.label.toLowerCase().includes(q) || item.type.toLowerCase().includes(q);
      });
    }

    resultsList.innerHTML = '';
    selectedIndex = filtered.length > 0 ? 0 : -1;

    filtered.forEach(function(item, i) {
      var li = document.createElement('li');
      li.className = 'cmd-palette-result' + (i === 0 ? ' selected' : '');
      li.innerHTML = '<span class="cmd-palette-result-type">' + item.type + '</span><span>' + item.label + '</span>';
      li.addEventListener('click', function() {
        close();
        item.action();
      });
      li.addEventListener('mouseenter', function() {
        selectedIndex = i;
        updateSelection();
      });
      resultsList.appendChild(li);
    });
  }

  function updateSelection() {
    var items = resultsList.querySelectorAll('.cmd-palette-result');
    items.forEach(function(el, i) {
      el.classList.toggle('selected', i === selectedIndex);
    });
    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  // Keyboard shortcut
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        close();
      } else {
        open();
      }
    }

    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      var count = resultsList.querySelectorAll('.cmd-palette-result').length;
      if (count > 0) {
        selectedIndex = (selectedIndex + 1) % count;
        updateSelection();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      var count = resultsList.querySelectorAll('.cmd-palette-result').length;
      if (count > 0) {
        selectedIndex = (selectedIndex - 1 + count) % count;
        updateSelection();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var selected = resultsList.querySelectorAll('.cmd-palette-result')[selectedIndex];
      if (selected) selected.click();
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });

  // Filter on input
  input.addEventListener('input', function() {
    render(input.value);
  });
})();


// ============================================
// SKILL RADIAL PROGRESS ANIMATION
// ============================================
(function() {
  var radials = document.getElementById('skill-radials');
  if (!radials) return;

  var animated = false;
  var circumference = 2 * Math.PI * 42; // r=42

  var observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !animated) {
      animated = true;

      radials.querySelectorAll('.skill-radial').forEach(function(radial, idx) {
        var target = parseInt(radial.getAttribute('data-percent'), 10);
        var valueEl = radial.querySelector('.skill-radial-value');
        var circle = radial.querySelector('.skill-radial-fill');
        var offset = circumference - (target / 100) * circumference;
        var delay = idx * 180;

        setTimeout(function() {
          circle.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
          circle.style.strokeDashoffset = offset;

          var duration = 1400;
          var startTime = null;
          function tick(ts) {
            if (!startTime) startTime = ts;
            var t = Math.min(1, (ts - startTime) / duration);
            var eased = 1 - Math.pow(1 - t, 3);
            valueEl.textContent = Math.round(target * eased);
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }, delay);
      });

      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(radials);
})();


// ============================================
// 2. MAGNETIC BUTTONS
// ============================================
(function() {
  if ('ontouchstart' in window) return;

  document.querySelectorAll('.magnetic').forEach(function(btn) {
    btn.addEventListener('mousemove', function(e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
    });

    btn.addEventListener('mouseleave', function() {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      setTimeout(function() { btn.style.transition = ''; }, 400);
    });
  });
})();


// Hero headline is now a locked statement; proof points live in the ticker below.

// Keep the "Now building" stamp always current
(function () {
  var stamp = document.getElementById('now-building-stamp');
  if (!stamp) return;
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var now = new Date();
  stamp.textContent = 'updated ' + months[now.getMonth()] + ' ' + now.getFullYear();
})();


// ============================================
// 3. TEXT SCRAMBLE ON NAME
// ============================================
(function() {
  var nameEl = document.getElementById('name');
  if (!nameEl) return;

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
  var jellos = nameEl.querySelectorAll('.jello');
  var originalChars = [];
  jellos.forEach(function(j) { originalChars.push(j.textContent); });

  function scramble() {
    var iterations = 0;
    var maxIterations = 10;
    var interval = setInterval(function() {
      jellos.forEach(function(j, i) {
        if (iterations >= Math.floor(i * 0.8)) {
          j.textContent = originalChars[i];
        } else {
          if (originalChars[i].trim()) {
            j.textContent = chars[Math.floor(Math.random() * chars.length)];
          }
        }
      });
      iterations++;
      if (iterations > maxIterations + jellos.length) {
        clearInterval(interval);
        jellos.forEach(function(j, i) { j.textContent = originalChars[i]; });
      }
    }, 50);
  }

  // Scramble on page load after a small delay
  setTimeout(scramble, 800);

  // Scramble on hover
  nameEl.addEventListener('mouseenter', scramble);
})();


// ============================================
// 4. PARALLAX HERO ON SCROLL
// ============================================
(function() {
  var hero = document.querySelector('.landing-page-container');
  var textContent = document.querySelector('.text-content');
  var blob = document.querySelector('.blob');
  if (!hero || !textContent) return;

  var ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        var scrolled = window.scrollY;
        var heroHeight = hero.offsetHeight;

        if (scrolled < heroHeight) {
          var ratio = scrolled / heroHeight;
          textContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
          textContent.style.opacity = 1 - ratio * 1.2;
          if (blob) {
            blob.style.transform = 'translateY(' + (scrolled * -0.2) + 'px) scale(' + (1 + ratio * 0.1) + ')';
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ============================================
// CASE STUDY DRAWER
// ============================================
(function () {
  'use strict';

  // Reusable SVG building blocks
  var ARROW_DEFS =
    '<defs>' +
      '<marker id="cs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="#d97756" />' +
      '</marker>' +
      '<marker id="cs-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
        '<path d="M0,0 L10,5 L0,10 z" fill="#8a857c" />' +
      '</marker>' +
    '</defs>';

  var SVG_STYLES =
    '<style>' +
      '.cs-node { fill:#fff; stroke:#1a1917; stroke-width:1.4; }' +
      '.cs-node-accent { fill:#fff3ec; stroke:#d97756; stroke-width:1.8; }' +
      '.cs-node-dark { fill:#1a1917; stroke:#1a1917; }' +
      '.cs-label { font:600 11px "JetBrains Mono",monospace; fill:#1a1917; }' +
      '.cs-label-on-dark { font:600 11px "JetBrains Mono",monospace; fill:#f5f0e8; }' +
      '.cs-sub { font:500 9px "JetBrains Mono",monospace; fill:#5a564f; }' +
      '.cs-arrow-line { stroke:#d97756; stroke-width:1.6; fill:none; }' +
      '.cs-arrow-muted { stroke:#8a857c; stroke-width:1.2; stroke-dasharray:4 3; fill:none; }' +
      'body:not(.light-mode) .cs-node { fill:#1f1c17; stroke:#e8e4db; }' +
      'body:not(.light-mode) .cs-node-accent { fill:#2a201a; stroke:#d97756; }' +
      'body:not(.light-mode) .cs-node-dark { fill:#0a0908; stroke:#f5f0e8; }' +
      'body:not(.light-mode) .cs-label { fill:#f5f0e8; }' +
      'body:not(.light-mode) .cs-sub { fill:#a8a49c; }' +
    '</style>';

  function archSvg(inner) {
    return '<svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture diagram">' +
      SVG_STYLES + ARROW_DEFS + inner + '</svg>';
  }

  // Build a rounded rectangle node with a label (and optional sub-label)
  function node(x, y, w, h, label, opts) {
    opts = opts || {};
    var cls = opts.accent ? 'cs-node-accent' : (opts.dark ? 'cs-node-dark' : 'cs-node');
    var labelCls = opts.dark ? 'cs-label-on-dark' : 'cs-label';
    var parts = ['<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" ry="8" class="' + cls + '"/>'];
    var cx = x + w / 2;
    if (opts.sub) {
      parts.push('<text x="' + cx + '" y="' + (y + h / 2 - 2) + '" text-anchor="middle" class="' + labelCls + '">' + label + '</text>');
      parts.push('<text x="' + cx + '" y="' + (y + h / 2 + 12) + '" text-anchor="middle" class="cs-sub">' + opts.sub + '</text>');
    } else {
      parts.push('<text x="' + cx + '" y="' + (y + h / 2 + 4) + '" text-anchor="middle" class="' + labelCls + '">' + label + '</text>');
    }
    return parts.join('');
  }

  function arrow(x1, y1, x2, y2, muted) {
    var cls = muted ? 'cs-arrow-muted' : 'cs-arrow-line';
    var marker = muted ? 'cs-arrow-muted' : 'cs-arrow';
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="' + cls + '" marker-end="url(#' + marker + ')"/>';
  }

  function curveArrow(x1, y1, x2, y2, cx, cy, muted) {
    var cls = muted ? 'cs-arrow-muted' : 'cs-arrow-line';
    var marker = muted ? 'cs-arrow-muted' : 'cs-arrow';
    return '<path d="M' + x1 + ',' + y1 + ' Q' + cx + ',' + cy + ' ' + x2 + ',' + y2 + '" class="' + cls + '" marker-end="url(#' + marker + ')"/>';
  }

  // -------- JARVIS DIAGRAM --------
  var jarvisArch = archSvg(
    // Input chain
    node(10, 50, 80, 46, 'Mic', { sub: 'WebRTC' }) +
    node(120, 50, 110, 46, 'Audio Capture', { sub: 'AGC · VAD' }) +
    node(260, 50, 110, 46, 'Jitter Buffer', { sub: 'adaptive' }) +
    node(400, 50, 110, 46, 'Whisper STT', { sub: 'local' }) +
    node(540, 50, 90, 46, 'FFT / Spec', { sub: 'diagnostics' }) +
    arrow(90, 73, 120, 73) +
    arrow(230, 73, 260, 73) +
    arrow(370, 73, 400, 73) +
    // from Audio Capture up-right to FFT (feedback)
    curveArrow(175, 50, 585, 50, 380, 20, true) +
    // Whisper → Orchestrator
    arrow(455, 96, 320, 160) +
    // Orchestrator
    node(220, 160, 200, 60, 'Orchestrator', { sub: '6-state FSM', accent: true }) +
    // Claude
    node(20, 170, 130, 46, 'Claude LLM', { sub: 'reasoning' }) +
    arrow(150, 193, 220, 193) +
    arrow(220, 200, 150, 200) +
    // Tools
    node(460, 170, 160, 46, '24 Tools', { sub: 'GitHub · Memory · Utils' }) +
    arrow(420, 193, 460, 193) +
    arrow(460, 200, 420, 200) +
    // Output chain
    node(200, 280, 120, 46, 'edge-tts', { sub: 'local TTS' }) +
    node(350, 280, 100, 46, 'Speaker') +
    arrow(320, 220, 260, 280) +
    arrow(320, 303, 350, 303)
  );

  // -------- LEGACYLENS DIAGRAM --------
  var legacylensArch = archSvg(
    // Ingest row
    '<text x="20" y="36" class="cs-sub">INGEST (one-time)</text>' +
    node(20, 50, 120, 46, 'Fortran Repo', { sub: '150K LOC' }) +
    node(160, 50, 140, 46, 'Syntax Chunker', { sub: 'AST-aware' }) +
    node(320, 50, 140, 46, 'Voyage-code-3', { sub: 'embeddings' }) +
    arrow(140, 73, 160, 73) +
    arrow(300, 73, 320, 73) +
    arrow(460, 73, 500, 73) +
    // ChromaDB (shared, right side)
    node(500, 40, 120, 90, 'ChromaDB', { sub: 'vector store', accent: true }) +
    // Query flow
    '<text x="20" y="186" class="cs-sub">QUERY (per request)</text>' +
    node(20, 200, 130, 46, 'User Query', { sub: 'natural language' }) +
    node(170, 200, 130, 46, 'Query Embed', { sub: 'Voyage' }) +
    node(320, 200, 140, 46, 'Top-k Retrieval', { sub: 'similarity' }) +
    arrow(150, 223, 170, 223) +
    arrow(300, 223, 320, 223) +
    arrow(460, 223, 500, 130) +
    arrow(500, 135, 460, 223) +
    // Gemini + Answer
    node(170, 290, 140, 46, 'Gemini 2.5 Flash', { sub: 'via OpenRouter', accent: true }) +
    node(330, 290, 130, 46, 'Answer', { sub: '< 3s · ~$0.001' }) +
    node(480, 290, 140, 46, 'Dependency Graph', { sub: 'vis-network' }) +
    arrow(390, 246, 240, 290) +
    arrow(310, 313, 330, 313) +
    arrow(460, 313, 480, 313)
  );

  // -------- K8S BUNDLE ANALYSER DIAGRAM --------
  var k8sArch = archSvg(
    // Input
    node(10, 150, 120, 60, 'Support Bundle', { sub: '.tar.gz upload', accent: true }) +
    // Parser
    node(160, 150, 100, 60, 'Parser', { sub: 'extract' }) +
    arrow(130, 180, 160, 180) +
    // Three extracted artifacts
    node(290, 30, 120, 42, 'Manifests', { sub: 'YAML · specs' }) +
    node(290, 110, 120, 42, 'Logs', { sub: 'pod · events' }) +
    node(290, 190, 120, 42, 'Events', { sub: 'timeline' }) +
    arrow(260, 170, 290, 51) +
    arrow(260, 178, 290, 131) +
    arrow(260, 190, 290, 211) +
    // Detectors
    node(440, 70, 150, 46, '26 Detectors', { sub: 'heuristic · rules', accent: true }) +
    arrow(410, 51, 440, 82) +
    arrow(410, 131, 440, 100) +
    arrow(410, 211, 440, 110) +
    // ChromaDB
    node(440, 160, 150, 46, 'ChromaDB RAG', { sub: 'log embeddings' }) +
    arrow(350, 152, 440, 175) +
    // 3D Topology
    node(440, 240, 150, 46, '3D Topology', { sub: 'Three.js viz' }) +
    arrow(350, 72, 440, 255) +
    // Report
    node(100, 280, 200, 52, 'Structured Report + Fix', { sub: 'LLM · remediation · preflight', accent: true }) +
    arrow(515, 116, 250, 280) +
    arrow(515, 206, 260, 280) +
    arrow(200, 210, 200, 280, true)
  );

  // -------- CASE STUDIES --------
  var caseStudies = {
    jarvis: {
      eyebrow: 'REAL-TIME · VOICE AI',
      title: 'Jarvis',
      tagline: 'Production-grade voice assistant — sub-second turns, 24 tools, robust under real-world audio conditions.',
      tldr: '<strong>The problem:</strong> most voice assistants feel sluggish and fall apart on real microphones. Jarvis is a full-stack voice pipeline I built end-to-end — adaptive jitter buffering, AGC normalization, and spectral diagnostics make it fast and resilient, and a 6-state orchestrator lets it actually <em>do things</em> across 24 integrated tools.',
      metrics: [
        { value: '<1s', label: 'End-to-end conversational latency' },
        { value: '24', label: 'Integrated tools (GitHub, memory, utilities)' },
        { value: '6', label: 'Orchestrator states for reliable multi-turn flow' }
      ],
      decisions: [
        {
          title: 'Adaptive jitter buffer over a fixed ring buffer',
          body: 'Fixed buffers either drop audio under load or add dead latency. I measured inter-packet arrival variance and resized dynamically — kept latency near the floor while eliminating dropouts on flaky Wi-Fi.'
        },
        {
          title: 'Local Whisper + edge-tts over cloud ASR/TTS',
          body: 'Cloud round-trips added ~400–800ms per turn and leaked audio off-device. Running STT/TTS locally cut latency, removed a failure mode, and kept every conversation on the user\'s machine.'
        },
        {
          title: '6-state orchestrator over a naive agent loop',
          body: 'A single "LLM + tools" loop livelocks on ambiguous input. An explicit FSM (idle → listening → thinking → acting → speaking → recovering) made recovery and barge-in deterministic and debuggable.'
        },
        {
          title: 'FFT spectral analyzer baked in, not bolted on',
          body: 'Ship it with a live diagnostics panel so you can actually see why a turn failed (clipping, noise floor, dropped frames). Debugging audio without this is guesswork.'
        }
      ],
      stack: ['TypeScript', 'React', 'Node.js', 'Whisper STT', 'edge-tts', 'Claude (Anthropic)', 'PostgreSQL', 'Redis', 'Docker'],
      arch: jarvisArch,
      links: { github: 'https://github.com/yashkuceriya/Jarvis', demo: null }
    },

    legacylens: {
      eyebrow: 'RAG · DEVELOPER TOOLS',
      title: 'LegacyLens',
      tagline: 'Make a 150K-line legacy Fortran codebase queryable in plain English — sub-3s answers at ~$0.001 per query.',
      tldr: '<strong>The problem:</strong> onboarding onto decades-old Fortran means weeks of grep, tribal knowledge, and hoping the last maintainer wrote a comment. LegacyLens wraps the whole repo in a RAG pipeline with syntax-aware chunking, so engineers can ask "what calls <code>SUBROUTINE CALC_FLUX</code> and what happens if I change its signature?" and get a grounded answer in under 3 seconds.',
      metrics: [
        { value: '150K+', label: 'Lines of Fortran indexed' },
        { value: '<3s', label: 'Answer generation latency' },
        { value: '~$0.001', label: 'Cost per query at scale' },
        { value: '8', label: 'Analysis modes (explain, impact, deps, docs…)' }
      ],
      decisions: [
        {
          title: 'Syntax-aware Fortran chunking over fixed token windows',
          body: 'Token-window chunking shreds <code>SUBROUTINE</code>/<code>MODULE</code> boundaries and recall collapses. I wrote a lightweight Fortran-aware chunker that keeps procedures + their comments together — retrieval quality jumped meaningfully on real queries.'
        },
        {
          title: 'Voyage-code-3 over generic text embeddings',
          body: 'General embedders treat <code>IF (X .EQ. 0)</code> and English prose the same. Code-specialized embeddings surfaced semantically similar procedures far more reliably, at a cost that\'s rounding error vs. engineer time saved.'
        },
        {
          title: 'Gemini 2.5 Flash via OpenRouter over direct SDK',
          body: 'OpenRouter gave me provider-agnostic failover and one billing surface. Flash is aggressively cheap and fast enough that the answer feels interactive — the entire query costs less than a tenth of a cent.'
        },
        {
          title: '8 explicit analysis modes over free-form chat',
          body: 'Free-form chat is a worse UX for a known task. "Impact analysis", "dependency map", "bug search" each have tuned prompts + post-processing — engineers land on the right answer in one click instead of iterating.'
        }
      ],
      stack: ['FastAPI', 'Python', 'ChromaDB', 'Voyage-code-3', 'Gemini 2.5 Flash', 'LangChain', 'vis-network', 'Docker', 'Railway'],
      arch: legacylensArch,
      links: { github: 'https://github.com/yashkuceriya/LegacyLens', demo: 'https://legacylens.up.railway.app/' }
    },

    'k8s-analyser': {
      eyebrow: 'INFRASTRUCTURE · DIAGNOSTICS',
      title: 'K8s Bundle Analyser',
      tagline: 'Drop in a Kubernetes support bundle, get a structured root-cause analysis with remediation and a 3D cluster view.',
      tldr: '<strong>The problem:</strong> support bundles are thousands of YAMLs and log lines — triage is a slog even for experts. This tool runs 26 heuristic detectors and a RAG pipeline over the bundle, then hands back a structured diagnosis, remediation steps, and a 3D topology you can actually explore.',
      metrics: [
        { value: '26', label: 'Heuristic detectors for common K8s failures' },
        { value: '3D', label: 'Interactive cluster topology (Three.js)' },
        { value: '~1 upload', label: 'From tarball to triaged report' }
      ],
      decisions: [
        {
          title: 'Hybrid: heuristic detectors + RAG, not LLM-only',
          body: 'An LLM alone hallucinates on infra detail. Heuristics cover the known failure modes deterministically and cite exact resource/log lines; RAG handles the long tail. The LLM writes the <em>narrative</em> on top of grounded signals.'
        },
        {
          title: 'ChromaDB over a heavier vector DB',
          body: 'Bundles are bounded — you don\'t need a clustered vector DB. Embedded ChromaDB keeps the whole system single-container, which dramatically lowers the cost of trying it on a real incident.'
        },
        {
          title: '3D topology over a static graph image',
          body: 'Pod ↔ service ↔ node relationships are genuinely 3D when you overlay failure signal. Letting users orbit and filter the cluster in Three.js turns the diagnostic from "a report" into "a map you can interrogate".'
        },
        {
          title: 'Auto-generated preflight checks as output',
          body: 'The real win isn\'t diagnosing <em>this</em> bundle — it\'s preventing the next one. The tool emits preflight rules derived from the failure modes it just found, so teams can gate future changes on them.'
        }
      ],
      stack: ['Python', 'FastAPI', 'ChromaDB', 'Three.js', 'React', 'Docker', 'Vercel'],
      arch: k8sArch,
      links: { github: 'https://github.com/yashkuceriya/K8s-Bundle-Analyser', demo: 'https://k8s-bundle-analyser.vercel.app' }
    }
  };

  var overlay = document.getElementById('case-study-overlay');
  var drawer = document.getElementById('case-study-drawer');
  var closeBtn = document.getElementById('case-study-close');
  var eyebrowEl = document.getElementById('case-study-eyebrow');
  var titleEl = document.getElementById('case-study-title');
  var taglineEl = document.getElementById('case-study-tagline');
  var bodyEl = document.getElementById('case-study-body');

  if (!overlay || !drawer) return;

  var lastFocused = null;

  function renderCaseStudy(slug) {
    var cs = caseStudies[slug];
    if (!cs) return false;

    eyebrowEl.textContent = cs.eyebrow;
    titleEl.textContent = cs.title;
    taglineEl.textContent = cs.tagline;

    var html = '';

    html += '<section class="cs-section">' +
      '<p class="cs-tldr">' + cs.tldr + '</p>' +
    '</section>';

    if (cs.metrics && cs.metrics.length) {
      html += '<section class="cs-section"><div class="cs-section-label">By the numbers</div><div class="cs-metrics">';
      cs.metrics.forEach(function (m) {
        html += '<div class="cs-metric"><div class="cs-metric-value">' + m.value + '</div><div class="cs-metric-label">' + m.label + '</div></div>';
      });
      html += '</div></section>';
    }

    if (cs.arch) {
      html += '<section class="cs-section"><div class="cs-section-label">Architecture</div><div class="cs-arch">' + cs.arch + '</div></section>';
    }

    if (cs.decisions && cs.decisions.length) {
      html += '<section class="cs-section"><div class="cs-section-label">Key engineering decisions</div><div class="cs-decisions">';
      cs.decisions.forEach(function (d) {
        html += '<div class="cs-decision"><h3 class="cs-decision-title">' + d.title + '</h3><p class="cs-decision-body">' + d.body + '</p></div>';
      });
      html += '</div></section>';
    }

    if (cs.stack && cs.stack.length) {
      html += '<section class="cs-section"><div class="cs-section-label">Stack</div><div class="cs-stack">';
      cs.stack.forEach(function (t) {
        html += '<span class="cs-stack-tag">' + t + '</span>';
      });
      html += '</div></section>';
    }

    if (cs.links) {
      html += '<section class="cs-section"><div class="cs-links">';
      if (cs.links.demo) {
        html += '<a href="' + cs.links.demo + '" target="_blank" rel="noopener" class="cs-link cs-link-primary">Live demo →</a>';
      }
      if (cs.links.github) {
        html += '<a href="' + cs.links.github + '" target="_blank" rel="noopener" class="cs-link cs-link-secondary">View code on GitHub</a>';
      }
      html += '</div></section>';
    }

    bodyEl.innerHTML = html;
    return true;
  }

  function openDrawer(slug) {
    if (!renderCaseStudy(slug)) return;
    lastFocused = document.activeElement;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    bodyEl.scrollTop = 0;
    setTimeout(function () {
      drawer.focus();
    }, 50);
  }

  function closeDrawer() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  document.querySelectorAll('[data-case-study]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      openDrawer(btn.getAttribute('data-case-study'));
    });
  });

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeDrawer();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeDrawer();
    }
  });
})();
