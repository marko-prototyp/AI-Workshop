// Jump pill — the universal wayfinding control.
//
// One component, two surfaces:
//   - Desktop: pill pinned top-right, click opens an anchored panel under it.
//   - Mobile (<1024px): pill sticky-top centered, click opens a <dialog> sheet.
//
// The journal page renders its own pill server-side (with the 01 / 12 counter
// and the per-entry list). This module detects that and bails — it only runs
// on pages that need a generated pill (home, figma-loop, facilitator).

export function initTOC() {
  // Journal already has a pill rendered by build.js. Don't double-up.
  if (document.querySelector('.jump-pill-wrap[data-source="journal"]')) return;

  const items = collectItems();
  if (items.length < 2) return;

  const { wrap, pill, panel, sheet, panelLinks, sheetLinks, pillActive } = buildPill(items);
  document.body.appendChild(wrap);
  document.body.appendChild(sheet);

  // Shared state: a pinned active id (set on click) and a "don't accept
  // observer updates until" timestamp. The scrollspy reads both.
  const state = { pinned: null, suspendUntil: 0 };

  wireOpen(pill, panel, sheet);
  wireLinkClicks(panelLinks, sheetLinks, panel, sheet, pill, pillActive, items, state);
  wireOutsideClose(wrap, panel, pill);
  wireScrollSpy(items, panelLinks, sheetLinks, pillActive, state);
}

// ── Collect ────────────────────────────────────────────────────────────────

function collectItems() {
  const items = [];

  // Top-level section headings (home, figma-loop main, facilitator parts).
  document.querySelectorAll('[id] .section-title').forEach(el => {
    const section = el.closest('[id]');
    items.push({ id: section.id, label: labelFor(el), level: 0 });
  });

  // Figma Loop sub-sections.
  document.querySelectorAll('[id] .loop-sub-title').forEach(el => {
    const section = el.closest('[id]');
    if (!section || section.classList.contains('section')) return; // skip parent section
    items.push({ id: section.id, label: labelFor(el), level: 1 });
  });

  // Facilitator parts.
  document.querySelectorAll('[id] .fac-part-title').forEach(el => {
    const section = el.closest('[id]');
    items.push({ id: section.id, label: labelFor(el), level: 0 });
  });

  // De-dupe by id, preserve order.
  const seen = new Set();
  return items.filter(i => (seen.has(i.id) ? false : seen.add(i.id)));
}

function labelFor(el) {
  // A short companion label wins if present, otherwise the heading text minus a trailing period.
  const short = el.dataset.tocLabel;
  if (short) return short.trim();
  return el.textContent.trim().replace(/\.$/, '');
}

// ── Build markup ───────────────────────────────────────────────────────────

function buildPill(items) {
  const wrap = document.createElement('div');
  wrap.className = 'jump-pill-wrap';

  const pillId = 'jump-pill';
  const panelId = 'jump-panel';
  const sheetId = 'jump-sheet';

  wrap.innerHTML = `
    <button class="jump-pill" id="${pillId}" type="button"
            aria-haspopup="true" aria-controls="${panelId} ${sheetId}" aria-expanded="false">
      <span class="pill-label">On this page</span>
      <span class="pill-active" id="jump-pill-active"></span>
      <span class="pill-chev" aria-hidden="true">▾</span>
    </button>
    <nav class="jump-panel" id="${panelId}" aria-label="On this page" hidden>
      <span class="jump-heading">On this page</span>
      <ul class="jump-list">
        ${items.map(({ id, label, level }) =>
          `<li><a href="#${id}" class="jump-link${level ? ' jump-link--sub' : ''}" data-target="${id}">${label}</a></li>`
        ).join('')}
      </ul>
    </nav>
  `;

  const sheet = document.createElement('dialog');
  sheet.className = 'jump-sheet';
  sheet.id = sheetId;
  sheet.setAttribute('aria-label', 'On this page');
  sheet.innerHTML = `
    <div class="sheet-inner">
      <header class="sheet-head">
        <span class="journal-eyebrow">On this page</span>
        <button class="sheet-close" type="button" aria-label="Close">
          <svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true">
            <line x1="2" y1="2" x2="12" y2="12" stroke="currentColor" stroke-width="1.2"/>
            <line x1="12" y1="2" x2="2" y2="12" stroke="currentColor" stroke-width="1.2"/>
          </svg>
        </button>
      </header>
      <ul class="jump-list sheet-list">
        ${items.map(({ id, label, level }) =>
          `<li><a href="#${id}" class="jump-link${level ? ' jump-link--sub' : ''}" data-target="${id}">${label}</a></li>`
        ).join('')}
      </ul>
    </div>
  `;

  return {
    wrap,
    pill: wrap.querySelector('.jump-pill'),
    panel: wrap.querySelector('.jump-panel'),
    panelLinks: Array.from(wrap.querySelectorAll('.jump-link')),
    sheet,
    sheetLinks: Array.from(sheet.querySelectorAll('.jump-link')),
    pillActive: wrap.querySelector('#jump-pill-active'),
  };
}

// ── Open behavior ──────────────────────────────────────────────────────────

const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

function openPanel(panel, pill) {
  panel.hidden = false;
  pill.setAttribute('aria-expanded', 'true');
}
function closePanel(panel, pill) {
  panel.hidden = true;
  pill.setAttribute('aria-expanded', 'false');
}
function openSheet(sheet, pill) {
  if (typeof sheet.showModal === 'function') sheet.showModal();
  else sheet.setAttribute('open', '');
  pill.setAttribute('aria-expanded', 'true');
}
function closeSheet(sheet, pill) {
  if (typeof sheet.close === 'function' && sheet.open) sheet.close();
  else sheet.removeAttribute('open');
  pill.setAttribute('aria-expanded', 'false');
}

function wireOpen(pill, panel, sheet) {
  pill.addEventListener('click', e => {
    e.stopPropagation();
    if (isDesktop()) {
      panel.hidden ? openPanel(panel, pill) : closePanel(panel, pill);
    } else {
      sheet.open ? closeSheet(sheet, pill) : openSheet(sheet, pill);
    }
  });

  // Esc handled natively by <dialog>; keep aria in sync.
  sheet.addEventListener('close', () => {
    pill.setAttribute('aria-expanded', 'false');
  });

  // Backdrop tap closes.
  sheet.addEventListener('click', e => {
    if (e.target === sheet) closeSheet(sheet, pill);
  });

  // Explicit close button inside sheet.
  const sheetClose = sheet.querySelector('.sheet-close');
  if (sheetClose) sheetClose.addEventListener('click', () => closeSheet(sheet, pill));

  // If the viewport flips across the 1024px boundary while a surface is open,
  // close it so the wrong one doesn't get stranded.
  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', () => {
    closePanel(panel, pill);
    closeSheet(sheet, pill);
  });

  // Esc closes the desktop panel too.
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) closePanel(panel, pill);
  });
}

function wireLinkClicks(panelLinks, sheetLinks, panel, sheet, pill, pillActive, items, state) {
  const lookup = new Map(items.map(i => [i.id, i.label]));

  const wireLink = a => {
    a.addEventListener('click', e => {
      const id = a.dataset.target;
      if (id) {
        history.replaceState(null, '', `#${id}`);
        // Pin the clicked target so the pill shows its label immediately,
        // and ignore observer-driven updates for ~1s while the smooth scroll
        // completes — otherwise the band briefly sees no section and the pill
        // flickers to empty.
        [...panelLinks, ...sheetLinks].forEach(link => {
          link.classList.toggle('is-active', link.dataset.target === id);
        });
        if (pillActive) pillActive.textContent = lookup.get(id) || '';
        state.pinned = id;
        state.suspendUntil = Date.now() + 1000;
      }
      setTimeout(() => {
        closePanel(panel, pill);
        closeSheet(sheet, pill);
      }, 0);
    });
  };
  panelLinks.forEach(wireLink);
  sheetLinks.forEach(wireLink);
}

function wireOutsideClose(wrap, panel, pill) {
  document.addEventListener('click', e => {
    if (!wrap.contains(e.target)) closePanel(panel, pill);
  });
}

// ── Scrollspy ──────────────────────────────────────────────────────────────
//
// "You're in section X" = the reference line near the top of the viewport
// falls inside X's bounds. We scan on every animation frame triggered by
// scroll/resize, pick the lowest section whose top has crossed the reference
// line (i.e. the section we're currently inside), and commit it.
//
// This intentionally avoids IntersectionObserver because its band+threshold
// model gets fragile with tall sections: as a heading scrolls past the band,
// the section's body still fills the viewport, but the observer can fall into
// regimes where the section isn't reported as intersecting.

function wireScrollSpy(items, panelLinks, sheetLinks, pillActive, state) {
  const lookup = new Map(items.map(i => [i.id, i.label]));
  // Cache element refs once — items rarely change after init.
  const itemEls = items
    .map(i => ({ id: i.id, el: document.getElementById(i.id) }))
    .filter(x => x.el);

  function findActive() {
    // Reference line: 25% from viewport top, but never closer than 160px to
    // the top edge — gives the mobile nav (~60px) + sticky pill (~40px) room.
    const refY = Math.max(160, window.innerHeight * 0.25);
    let active = null;
    for (const { id, el } of itemEls) {
      const rect = el.getBoundingClientRect();
      if (rect.top - refY <= 0) {
        // We've reached or passed this section's top.
        active = id;
        if (rect.bottom - refY > 0) break; // line is inside this section → done
      } else {
        // First section whose top is below the line — everything below is too.
        break;
      }
    }
    return active;
  }

  function commit(id) {
    // Click-pin window: ignore scroll-driven updates so the pill doesn't
    // flicker while the page is mid-smooth-scroll to a clicked target.
    if (Date.now() < state.suspendUntil) return;
    state.pinned = null;
    [...panelLinks, ...sheetLinks].forEach(a => {
      a.classList.toggle('is-active', a.dataset.target === id);
    });
    if (pillActive) {
      pillActive.textContent = id ? (lookup.get(id) || '') : '';
    }
  }

  let raf = 0;
  function tick() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      commit(findActive());
    });
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  // Initial commit so the pill reflects the section the user is already in
  // (e.g. after navigating to a deep link or refreshing mid-page).
  tick();
}
