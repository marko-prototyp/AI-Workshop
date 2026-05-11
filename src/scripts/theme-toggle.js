(function () {
  const KEY = 'theme';
  const html = document.documentElement;
  const buttons = document.querySelectorAll('[data-theme-toggle]');

  function getCurrent() {
    return html.getAttribute('data-theme') === 'clarity' ? 'clarity' : 'default';
  }

  function apply(theme) {
    if (theme === 'clarity') {
      html.setAttribute('data-theme', 'clarity');
    } else {
      html.removeAttribute('data-theme');
    }
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    buttons.forEach(b => b.setAttribute('aria-pressed', String(theme === 'clarity')));
  }

  buttons.forEach(b => b.setAttribute('aria-pressed', String(getCurrent() === 'clarity')));

  buttons.forEach(b => {
    b.addEventListener('click', () => {
      apply(getCurrent() === 'clarity' ? 'default' : 'clarity');
    });
  });
})();
