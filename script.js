const toggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.site-nav nav');
const navigationLinks = document.querySelectorAll('.site-nav nav a');

function closeNavigation() {
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('open');
}

toggle?.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  toggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !expanded);
});

navigationLinks.forEach((link) => link.addEventListener('click', closeNavigation));

const revealElements = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach((element) => observer.observe(element));
}

document.querySelector('#year').textContent = new Date().getFullYear();
