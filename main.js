// ============================================
// YASH KUCHERIYA PORTFOLIO — INTERACTIONS
// ============================================

console.log(
  '%c Designed & Built by Yash Vijay Kucheriya ',
  'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; font-weight: 900; font-size: 1rem; padding: 12px 20px; border-radius: 6px;'
);

// ---- Preloader ----
window.addEventListener('load', function () {
  var loader = document.getElementById('preloader');
  if (loader) {
    setTimeout(function () { loader.classList.add('loaded'); }, 400);
  }
});

// ---- Custom Cursor ----
(function () {
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  if (!dot || !ring || 'ontouchstart' in window) return;

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a, button, .project-card, .skill-item, .contact-link, [tabindex]')) {
      dot.classList.add('hover');
      ring.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a, button, .project-card, .skill-item, .contact-link, [tabindex]')) {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    }
  });
})();

// ---- Navigation ----
(function () {
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('nav-hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section');
  var scrollProgress = document.querySelector('.scroll-progress');
  var backToTop = document.getElementById('back-to-top');
  var ticking = false;

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  window.closeMobile = function () {
    if (hamburger) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  };

  // Scroll handler
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        var scrollTop = window.scrollY;

        // Nav background
        if (nav) nav.classList.toggle('scrolled', scrollTop > 50);

        // Scroll progress
        if (scrollProgress) {
          var docHeight = document.documentElement.scrollHeight - window.innerHeight;
          scrollProgress.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }

        // Back to top
        if (backToTop) backToTop.classList.toggle('visible', scrollTop > 500);

        // Active section
        var current = '';
        sections.forEach(function (s) {
          if (scrollTop >= s.offsetTop - 200) current = s.getAttribute('id');
        });
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('data-section') === current);
        });

        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ---- Reveal on Scroll ----
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var delay = parseFloat(entry.target.getAttribute('data-delay')) || 0;
        setTimeout(function () { entry.target.classList.add('revealed'); }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function initReveal() {
    document.querySelectorAll('.reveal:not(.revealed)').forEach(function (el) {
      observer.observe(el);
    });
  }
  initReveal();
  window.initReveal = initReveal;
})();

// ---- Animated Stat Counters ----
(function () {
  var counted = false;
  var targets = document.querySelectorAll('[data-target]');
  if (!targets.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !counted) {
        counted = true;
        targets.forEach(function (el) {
          var target = parseInt(el.getAttribute('data-target'), 10);
          var current = 0;
          var step = Math.max(1, Math.floor(target / 40));
          var interval = setInterval(function () {
            current += step;
            if (current >= target) { current = target; clearInterval(interval); }
            el.textContent = current;
          }, 40);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  targets.forEach(function (el) { observer.observe(el); });
})();

// ---- Hero Text Rotation ----
(function () {
  var el = document.getElementById('hero-rotate');
  if (!el) return;
  var words = ['backend systems', 'AI pipelines', 'cloud architectures', 'scalable APIs', 'data platforms'];
  var index = 0;

  setInterval(function () {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(function () {
      index = (index + 1) % words.length;
      el.textContent = words[index];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300);
  }, 3000);

  el.style.transition = 'opacity 0.3s, transform 0.3s';
})();

// ---- Project Card 3D Tilt ----
(function () {
  if ('ontouchstart' in window) return;
  var cards = document.querySelectorAll('.project-card');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateX(' + (y * -6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

// ---- Show More Projects ----
function toggleMoreProjects() {
  var container = document.getElementById('more-projects');
  var btnText = document.getElementById('show-more-text');
  var arrow = document.getElementById('show-more-arrow');

  if (container.classList.contains('more-projects-hidden')) {
    container.classList.remove('more-projects-hidden');
    container.classList.add('more-projects-visible');
    btnText.textContent = 'Show Less';
    arrow.style.transform = 'rotate(180deg)';
    if (window.initReveal) window.initReveal();
  } else {
    container.classList.remove('more-projects-visible');
    container.classList.add('more-projects-hidden');
    btnText.textContent = 'Show More Projects';
    arrow.style.transform = 'rotate(0deg)';
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  }
}

// ---- Skill Group Hover Glow ----
(function () {
  if ('ontouchstart' in window) return;
  document.querySelectorAll('.skill-group').forEach(function (group) {
    group.addEventListener('mousemove', function (e) {
      var rect = group.getBoundingClientRect();
      group.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
      group.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
    });
  });
})();

// ---- Smooth anchor scrolling (fallback) ----
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
