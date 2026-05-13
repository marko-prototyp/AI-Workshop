export function initPromptLibrary() {
  const filterBar = document.getElementById('plib-filter');
  if (!filterBar) return;

  const grid      = document.getElementById('plib-grid');
  const empty     = document.getElementById('plib-empty');
  const cards     = [...grid.querySelectorAll('.pcard')];
  const btns      = [...filterBar.querySelectorAll('.pfilter-btn')];
  const caps      = document.querySelector('.plib-capabilities');

  // Restore filter from URL hash
  const hashCat = location.hash.replace('#', '');
  const initial = btns.find(b => b.dataset.filter === hashCat);
  if (initial) {
    btns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
    initial.classList.add('is-active');
    initial.setAttribute('aria-pressed', 'true');
    applyFilter(hashCat);
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      btns.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      history.replaceState(null, '', cat === 'all' ? location.pathname : `#${cat}`);
      applyFilter(cat);
    });
  });

  // Click the whole card body to copy
  document.querySelectorAll('.pcard-body').forEach(body => {
    body.addEventListener('click', e => {
      if (e.target.closest('.copy-btn')) return; // let the copy-btn handler fire
      const copyBtn = body.querySelector('.copy-btn');
      if (copyBtn) copyBtn.click();
    });
  });

  function applyFilter(cat) {
    let anyVisible = false;

    cards.forEach(card => {
      const match = cat === 'all'
        || (cat === 'power' ? card.dataset.power === 'true' : card.dataset.category === cat);
      card.classList.toggle('is-hidden', !match);
      if (match) anyVisible = true;
    });

    // Capabilities section: show only on 'all'
    if (caps) {
      caps.classList.toggle('is-hidden', cat !== 'all');
    }

    // Empty state
    if (empty) empty.hidden = anyVisible || cat === 'all';
  }
}
