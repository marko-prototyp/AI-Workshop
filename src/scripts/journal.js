// Journal — Spine layout interactions
//
// Two jobs:
//   1) Scrollspy: highlight the rail item that matches the entry currently
//      most in view. The same logic updates the mobile jump pill's number.
//   2) Mobile sheet: open/close the <dialog> when the pill is tapped; close
//      it after a link inside the sheet is clicked.

export function initJournal() {
  const rail = document.getElementById('journal-rail-list');
  const sheet = document.getElementById('journal-jump-sheet');
  const pill = document.getElementById('journal-jump-pill');
  const pillNow = document.getElementById('journal-jump-now');
  const entries = Array.from(document.querySelectorAll('.journal-entry'));

  // Bail quietly on pages without the journal layout.
  if (!entries.length) return;

  // — Scrollspy ——————————————————————————————————————————————————————
  // Track which entry is currently the "active" one. We choose the entry
  // whose top is closest to a band near the top of the viewport, so the
  // active state changes when an entry's heading scrolls past it.

  const railItems = rail
    ? Array.from(rail.querySelectorAll('.rail-item[data-target]'))
    : [];
  const sheetItems = sheet
    ? Array.from(sheet.querySelectorAll('.rail-item[data-target]'))
    : [];

  function setActive(num) {
    [...railItems, ...sheetItems].forEach(li => {
      const isMatch = li.dataset.target === `entry-${num}`;
      li.classList.toggle('is-active', isMatch);
    });
    if (pillNow) pillNow.textContent = num;
  }

  // Observer fires whenever an entry crosses the band. We pick the one
  // closest to the top of the band.
  let visible = new Map(); // id -> intersection ratio
  const observer = new IntersectionObserver(
    obsEntries => {
      obsEntries.forEach(e => {
        if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
        else visible.delete(e.target.id);
      });
      if (visible.size === 0) return;
      // Pick the entry with the largest intersection ratio. Ties → topmost.
      let bestId = null;
      let bestRatio = -1;
      let bestTop = Infinity;
      visible.forEach((ratio, id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (ratio > bestRatio || (ratio === bestRatio && top < bestTop)) {
          bestId = id;
          bestRatio = ratio;
          bestTop = top;
        }
      });
      if (bestId) {
        const num = bestId.replace('entry-', '');
        setActive(num);
      }
    },
    {
      // The "band" is roughly the top third of the viewport. An entry
      // becomes active when its top crosses into that band.
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  entries.forEach(el => observer.observe(el));

  // — Mobile sheet —————————————————————————————————————————————————————
  if (pill && sheet) {
    const openSheet = () => {
      if (typeof sheet.showModal === 'function') {
        sheet.showModal();
      } else {
        // Fallback for browsers without <dialog>
        sheet.setAttribute('open', '');
      }
      pill.setAttribute('aria-expanded', 'true');
    };

    const closeSheet = () => {
      if (typeof sheet.close === 'function' && sheet.open) {
        sheet.close();
      } else {
        sheet.removeAttribute('open');
      }
      pill.setAttribute('aria-expanded', 'false');
    };

    pill.addEventListener('click', openSheet);

    const closeBtn = sheet.querySelector('.sheet-close');
    if (closeBtn) closeBtn.addEventListener('click', closeSheet);

    // Close on backdrop click
    sheet.addEventListener('click', e => {
      if (e.target === sheet) closeSheet();
    });

    // Close after navigating to a session
    sheet.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        // Let the anchor jump happen, then close
        setTimeout(closeSheet, 0);
      });
    });

    // Esc handled natively by <dialog>; also keep aria in sync
    sheet.addEventListener('close', () => {
      pill.setAttribute('aria-expanded', 'false');
    });
  }
}
