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


// ============================================
// ROTATING HERO PROOF POINTS
// ============================================
(function() {
  var el = document.getElementById('hero-proof');
  if (!el) return;

  var proofs = [
    'I ship production AI \u2014 7 apps live right now.',
    'Built a voice assistant with sub-second latency.',
    'Processed 1M+ EDI transactions/month at Infosys.',
    'RAG search over 150K lines of legacy code.',
    'K8s diagnostics with 3D cluster topology.',
    'Reduced processing latency by 60% with event-driven pipelines.'
  ];
  var index = 0;

  setInterval(function() {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(function() {
      index = (index + 1) % proofs.length;
      el.textContent = proofs[index];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 400);
  }, 4000);
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
