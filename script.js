const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const year = document.querySelector('[data-year]');
const copyButton = document.querySelector('[data-copy]');
const copyMessage = document.querySelector('.copy-message');

if (year) {
  year.textContent = new Date().getFullYear();
}

const handleScroll = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', event => {
    if (event.target.matches('a')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

if (copyButton && copyMessage) {
  copyButton.addEventListener('click', async () => {
    const text = copyButton.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      copyMessage.textContent = 'Email copied to clipboard.';
    } catch (error) {
      copyMessage.textContent = text;
    }
  });
}
