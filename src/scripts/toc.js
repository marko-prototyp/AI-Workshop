export function initTOC() {
  const items = [];

  // Top-level section headings (home, figma-loop main)
  document.querySelectorAll('[id] .section-title').forEach(el => {
    const section = el.closest('[id]');
    const label = el.textContent.trim().replace(/\.$/, '');
    items.push({ id: section.id, label, level: 0 });
  });

  // Figma Loop sub-sections
  document.querySelectorAll('[id] .loop-sub-title').forEach(el => {
    const section = el.closest('[id]');
    if (!section || section.classList.contains('section')) return; // skip parent section
    const label = el.textContent.trim().replace(/\.$/, '');
    items.push({ id: section.id, label, level: 1 });
  });

  // Facilitator parts
  document.querySelectorAll('[id] .fac-part-title').forEach(el => {
    const section = el.closest('[id]');
    const label = el.textContent.trim().replace(/\.$/, '');
    items.push({ id: section.id, label, level: 0 });
  });

  if (items.length < 2) return;

  const root = document.createElement('div');
  root.className = 'toc-root';
  root.innerHTML = `
    <button class="toc-btn" aria-label="On this page" aria-expanded="false" aria-controls="toc-panel">
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="15" height="15">
        <line x1="2" y1="3.5" x2="14" y2="3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="2" y1="8"   x2="14" y2="8"   stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="2" y1="12.5" x2="9" y2="12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
    <nav class="toc-panel" id="toc-panel" aria-label="On this page" hidden>
      <span class="toc-heading">On this page</span>
      <ul>
        ${items.map(({ id, label, level }) =>
          `<li><a href="#${id}" class="toc-link${level ? ' toc-link--sub' : ''}">${label}</a></li>`
        ).join('')}
      </ul>
    </nav>
  `;

  document.body.appendChild(root);

  const btn  = root.querySelector('.toc-btn');
  const panel = root.querySelector('.toc-panel');

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const nowOpen = panel.hidden;
    panel.hidden = !nowOpen;
    btn.setAttribute('aria-expanded', String(nowOpen));
  });

  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!root.contains(e.target)) {
      panel.hidden = true;
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  // Highlight active section
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = panel.querySelector(`.toc-link[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { rootMargin: '-8% 0% -72% 0%' });

  items.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}
