document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');

  function closeMenu() {
    links.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(links.classList.toggle('active')));
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
});
