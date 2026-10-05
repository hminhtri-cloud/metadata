document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');
  const mobileToggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    toggle.querySelector('i').className = `fa-solid fa-${theme === 'dark' ? 'sun' : 'moon'} theme-icon`;
    toggle.querySelector('.theme-text').textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
  }
  setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    setTheme(theme);
  });
  mobileToggle.addEventListener('click', () => {
    const opened = links.classList.toggle('active');
    mobileToggle.setAttribute('aria-expanded', String(opened));
    mobileToggle.querySelector('i').className = `fa-solid fa-${opened ? 'xmark' : 'bars'}`;
  });
});
