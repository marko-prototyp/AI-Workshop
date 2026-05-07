let index = null;
let overlay = null;
let activeIdx = -1;

export function initSearch() {
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      isOpen() ? close() : open();
    }
  });
  const btn = document.getElementById('cmdBtn');
  if (btn) btn.addEventListener('click', () => isOpen() ? close() : open());
}

function isOpen() { return overlay && !overlay.hidden; }

async function open() {
  if (!overlay) buildOverlay();
  overlay.hidden = false;
  overlay.querySelector('.cmd-input').value = '';
  overlay.querySelector('.cmd-input').focus();
  activeIdx = -1;
  if (!index) {
    try { index = await fetch(new URL('../search-index.json', import.meta.url)).then(r => r.json()); }
    catch { index = []; }
  }
  render('');
}

function close() {
  if (!overlay) return;
  overlay.hidden = true;
  activeIdx = -1;
}

// ── DOM ───────────────────────────────────────────────────────────────────────

function buildOverlay() {
  overlay = document.createElement('div');
  overlay.className = 'cmd-overlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Search');
  overlay.innerHTML = `
    <div class="cmd-modal">
      <div class="cmd-input-wrap">
        <svg class="cmd-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/>
          <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <input class="cmd-input" type="text" placeholder="Search weeks, prompts, pages…"
               autocomplete="off" spellcheck="false" aria-label="Search" aria-controls="cmd-results"/>
        <span class="cmd-esc">esc</span>
      </div>
      <ul class="cmd-results" id="cmd-results" role="listbox" aria-label="Results"></ul>
      <div class="cmd-footer">
        <span class="cmd-hint"><kbd>↑↓</kbd> navigate</span>
        <span class="cmd-hint"><kbd>↵</kbd> open</span>
        <span class="cmd-hint"><kbd>esc</kbd> close</span>
      </div>
    </div>`;

  const input = overlay.querySelector('.cmd-input');
  input.addEventListener('input', () => { activeIdx = -1; render(input.value); });

  overlay.addEventListener('keydown', e => {
    const items = [...overlay.querySelectorAll('.cmd-result')];
    if (e.key === 'Escape')    { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIdx + 1, items); return; }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(activeIdx - 1, items); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const active = overlay.querySelector('.cmd-result.is-active');
      if (active) go(active.dataset.href);
    }
  });

  // Close on backdrop click
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
}

function setActive(idx, items) {
  if (!items.length) return;
  activeIdx = ((idx % items.length) + items.length) % items.length;
  items.forEach((el, i) => el.classList.toggle('is-active', i === activeIdx));
  items[activeIdx]?.scrollIntoView({ block: 'nearest' });
}

// ── Navigation ────────────────────────────────────────────────────────────────

function go(href) {
  close();
  if (!href) return;
  try {
    const url = new URL(href, location.origin);
    if (url.pathname === location.pathname && url.hash) {
      const el = document.getElementById(url.hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
        return;
      }
    }
  } catch {}
  location.href = href;
}

// ── Search ────────────────────────────────────────────────────────────────────

const TYPE_ORDER  = { page: 0, section: 1, week: 2, project: 3, prompt: 4, faq: 5 };
const TYPE_LABELS = { page: 'Page', section: 'Section', week: 'Week', project: 'Project', prompt: 'Prompt', faq: 'FAQ' };

function search(raw) {
  if (!index?.length) return [];

  // Empty query — show curated quick-access
  if (!raw.trim()) {
    return [
      ...index.filter(e => e.type === 'page'),
      ...index.filter(e => e.type === 'prompt' && e.href.endsWith('/prompts/')).slice(0, 3),
    ].slice(0, 10);
  }

  const words = raw.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const scored = index.map(item => {
    const label = item.label.toLowerCase();
    const full  = [item.label, item.sub, item.keywords].filter(Boolean).join(' ').toLowerCase();
    const ws    = words.map(w => scoreWord(w, label, full));
    if (ws.some(s => s === 0)) return null;
    return { item, score: Math.min(...ws) };
  }).filter(Boolean);

  scored.sort((a, b) =>
    b.score - a.score || (TYPE_ORDER[a.item.type] ?? 9) - (TYPE_ORDER[b.item.type] ?? 9)
  );
  return scored.slice(0, 12).map(r => r.item);
}

function scoreWord(q, label, full) {
  if (label === q)                      return 100; // exact
  if (label.startsWith(q))              return 90;  // label prefix
  if (full.includes(` ${q}`))           return 80;  // word boundary anywhere
  if (full.includes(q))                 return 70;  // substring anywhere
  if (fuzzy(q, label))                  return 50;  // fuzzy in label
  if (fuzzy(q, full))                   return 30;  // fuzzy in full text
  return 0;
}

function fuzzy(q, text) {
  let qi = 0;
  for (let i = 0; i < text.length && qi < q.length; i++) {
    if (text[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

// ── Render ────────────────────────────────────────────────────────────────────

function render(query) {
  const results = search(query);
  const ul = overlay.querySelector('#cmd-results');

  if (!results.length) {
    ul.innerHTML = `<li class="cmd-empty">No results for "<em>${esc(query)}</em>"</li>`;
    return;
  }

  ul.innerHTML = results.map((item, i) => {
    const typePrompt = item.type === 'prompt' ? ' cmd-badge--prompt' : '';
    const typeFAQ    = item.type === 'faq'    ? ' cmd-badge--faq'    : '';
    const sub = item.sub ? `<span class="cmd-result-sub">${esc(item.sub)}</span>` : '';
    return `<li class="cmd-result${i === activeIdx ? ' is-active' : ''}"
              data-href="${esc(item.href)}" role="option" tabindex="-1">
      <span class="cmd-result-main">
        <span class="cmd-result-label">${esc(item.label)}</span>
        ${sub}
      </span>
      <span class="cmd-badge${typePrompt}${typeFAQ}">${TYPE_LABELS[item.type] || item.type}</span>
    </li>`;
  }).join('');

  ul.querySelectorAll('.cmd-result').forEach((el, i) => {
    el.addEventListener('click', () => go(el.dataset.href));
    el.addEventListener('mouseenter', () => {
      overlay.querySelectorAll('.cmd-result').forEach(r => r.classList.remove('is-active'));
      el.classList.add('is-active');
      activeIdx = i;
    });
  });
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
