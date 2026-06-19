// Session wizard modal.
// Turns each week's accordion into a stepper modal: clicking a week summary
// opens a two-pane modal (left rail of steps + the current step) instead of
// expanding the <details>. The accordion content stays in the DOM as a
// no-JS fallback; this module only takes over when JS is available.

const ICON = { goal: '🎯', how: '🧭', tools: '🛠', gift: '🎁', think: '💭', tick: '✓', done: '✓', principle: '◆', skill: '⬇', report: '↗' };

let modal, railEl, contentEl, prevBtn, nextBtn, metaEl, eyebrowEl, titleEl, overlay;
let cards = [];      // [{type, ...}]
let railCount = 0;   // number of rail-visible cards (all but the Done screen)
let cur = 0;
let lastTrigger = null;

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Build the modal shell once and reuse it.
function ensureModal() {
  if (overlay) return;
  overlay = document.createElement('div');
  overlay.className = 'wiz-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="wiz-modal" role="dialog" aria-modal="true" aria-labelledby="wiz-title">
      <div class="wiz-head">
        <div>
          <div class="wiz-eyebrow" data-wiz="eyebrow"></div>
          <h2 class="wiz-title" id="wiz-title" data-wiz="title"></h2>
        </div>
        <button class="wiz-close" data-wiz="close" aria-label="Close">&times;</button>
      </div>
      <div class="wiz-body">
        <nav class="wiz-rail" data-wiz="rail" aria-label="Session steps"></nav>
        <section class="wiz-content" data-wiz="content" tabindex="-1"></section>
      </div>
      <div class="wiz-foot">
        <span class="wiz-foot-meta" data-wiz="meta"></span>
        <div class="wiz-foot-btns">
          <button class="wiz-btn" data-wiz="prev">Previous</button>
          <button class="wiz-btn wiz-btn--primary" data-wiz="next">Next</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  modal     = overlay.querySelector('.wiz-modal');
  railEl    = overlay.querySelector('[data-wiz="rail"]');
  contentEl = overlay.querySelector('[data-wiz="content"]');
  prevBtn   = overlay.querySelector('[data-wiz="prev"]');
  nextBtn   = overlay.querySelector('[data-wiz="next"]');
  metaEl    = overlay.querySelector('[data-wiz="meta"]');
  eyebrowEl = overlay.querySelector('[data-wiz="eyebrow"]');
  titleEl   = overlay.querySelector('[data-wiz="title"]');

  overlay.querySelector('[data-wiz="close"]').addEventListener('click', close);
  prevBtn.addEventListener('click', () => { if (cur > 0) { cur--; render(); } });
  nextBtn.addEventListener('click', () => {
    if (cur < cards.length - 1) { cur++; render(); } else { close(); }
  });
  // Click outside the modal closes it.
  overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
  // Keyboard: Esc closes, arrows move, Tab is trapped.
  overlay.addEventListener('keydown', onKeydown);
}

function onKeydown(e) {
  if (e.key === 'Escape') { e.preventDefault(); close(); return; }
  if (e.key === 'ArrowRight' && cur < cards.length - 1) { cur++; render(); return; }
  if (e.key === 'ArrowLeft' && cur > 0) { cur--; render(); return; }
  if (e.key === 'Tab') trapTab(e);
}

function trapTab(e) {
  const focusable = modal.querySelectorAll(
    'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

// Turn one week's JSON into an ordered list of cards.
function buildCards(data) {
  const list = [];
  const ov = data.overview || {};
  list.push({ type: 'overview', label: 'Overview', ov });

  (data.steps || []).forEach(s => {
    list.push({
      type: 'step',
      label: railLabel(s.title),
      tool: s.tool || '',
      title: s.title || 'Prompt',
      does: s.does || '',
      think: s.think || '',
      prompt: s.prompt || '',
      note: s.note || '',
      gives: s.gives || ''
    });
  });

  list.push({ type: 'done', label: 'Done', outcomes: ov.outcomes || [], captureHref: data.captureHref || '' });
  return list;
}

// Short label for the rail: drop a trailing " · tool" and keep it tight.
function railLabel(title) {
  if (!title) return 'Step';
  return title.split('·')[0].trim();
}

// Derive short tool chips. Prefer the explicit array; otherwise take the first
// sentence of the toolkit string and split it on the "·" separator.
function toolChipList(ov) {
  if (ov.toolChips && ov.toolChips.length) return ov.toolChips;
  if (!ov.toolText) return [];
  return ov.toolText.split('.')[0].split('·').map(t => t.trim()).filter(Boolean);
}

function chipRow(items, cls) {
  return `<div class="wiz-chip-row">${
    items.map(t => `<span class="wiz-chip${cls ? ' ' + cls : ''}">${esc(t)}</span>`).join('')
  }</div>`;
}

function flowRow(items) {
  return `<div class="wiz-flow">${
    items.map((h, i) => `<span class="wiz-chip">${esc(h)}</span>${
      i < items.length - 1 ? '<span class="wiz-arrow">→</span>' : ''
    }`).join('')
  }</div>`;
}

function renderRail() {
  railEl.innerHTML = '';
  cards.forEach((c, i) => {
    if (c.type === 'done') return;               // Done is a completion screen, not a rail item
    const btn = document.createElement('button');
    btn.className = 'wiz-rail-item'
      + (i === cur ? ' is-current' : '')
      + (i < cur ? ' is-done' : '');
    const bead = i < cur ? ICON.tick : (i + 1);
    btn.innerHTML = `<span class="wiz-bead">${bead}</span><span class="wiz-rail-label">${esc(c.label)}</span>`;
    btn.title = c.label;
    btn.addEventListener('click', () => { cur = i; render(); });
    railEl.appendChild(btn);
  });
}

function renderContent() {
  const c = cards[cur];
  if (c.type === 'overview') {
    const ov = c.ov;
    const tools = toolChipList(ov);
    const howHtml = (ov.flow && ov.flow.length)
      ? flowRow(ov.flow)
      : `<ul class="wiz-list">${(ov.how || []).map(h => `<li><span class="wiz-tick">${ICON.tick}</span>${esc(h)}</li>`).join('')}</ul>`;
    const outList = (ov.outcomes || []).map(o => `<li><span class="wiz-tick">${ICON.tick}</span>${esc(o)}</li>`).join('');
    contentEl.innerHTML = `
      ${ov.principle ? `<div class="wiz-slab wiz-slab--principle"><span class="wiz-ic">${ICON.principle}</span><span class="wiz-tx"><strong>The idea.</strong> ${esc(ov.principle)}</span></div>` : ''}
      ${ov.before ? `<div class="wiz-slab wiz-slab--before"><span class="wiz-ic">⏳</span><span class="wiz-tx"><strong>Before the session.</strong> ${esc(ov.before)}</span></div>` : ''}
      ${(ov.installs && ov.installs.length) ? `<div class="wiz-slab wiz-slab--installs"><span class="wiz-ic">${ICON.skill}</span><div class="wiz-tx"><strong>Skills for this session.</strong> Download each. Add style-extract and system-extract in Settings → Capabilities. The template you hand straight to Claude in step 1.<ul class="wiz-installs">${ov.installs.map(i => `<li><a href="${i.href}" download><span class="wiz-install-name">${esc(i.name)}</span> <span class="wiz-install-dl">Download</span></a><span class="wiz-install-blurb">${esc(i.blurb)}</span></li>`).join('')}</ul></div></div>` : ''}
      ${ov.goal ? `<div class="wiz-ov-row"><div class="wiz-ov-k">${ICON.goal} Goal</div><div class="wiz-ov-v">${esc(ov.goal)}</div></div>` : ''}
      ${tools.length ? `<div class="wiz-ov-row"><div class="wiz-ov-k">${ICON.tools} Run it in</div>${chipRow(tools, 'wiz-chip--tool')}</div>` : ''}
      ${(ov.flow && ov.flow.length) || (ov.how && ov.how.length) ? `<div class="wiz-ov-row"><div class="wiz-ov-k">${ICON.how} What you'll do</div>${howHtml}</div>` : ''}
      ${outList ? `<div class="wiz-ov-row"><div class="wiz-ov-k">${ICON.gift} You walk out with</div><ul class="wiz-list">${outList}</ul></div>` : ''}`;
  } else if (c.type === 'done') {
    const outList = (c.outcomes || []).map(o => `<li><span class="wiz-tick">${ICON.done}</span>${esc(o)}</li>`).join('');
    contentEl.innerHTML = `
      <h3 class="wiz-c-title">That's the session.</h3>
      ${outList ? `<div class="wiz-ov-row"><div class="wiz-ov-k">${ICON.gift} What you made</div><ul class="wiz-list">${outList}</ul></div>` : ''}
      ${c.captureHref ? `<div class="wiz-slab wiz-slab--capture"><span class="wiz-ic">${ICON.report}</span><div class="wiz-tx"><strong>Last step: send your report.</strong> Run your check-in prompt, then send the result back so the journal stays current. <a class="wiz-capture-link" href="${c.captureHref}">Open this session's capture prompt</a></div></div>` : ''}`;
  } else {
    contentEl.innerHTML = `
      ${c.tool ? `<div class="wiz-chip-row"><span class="wiz-chip wiz-chip--tool">${esc(c.tool)}</span></div>` : ''}
      <h3 class="wiz-c-title">${esc(c.title)}</h3>
      ${c.does ? `<p class="wiz-does">${esc(c.does)}</p>` : ''}
      ${c.think ? `<div class="wiz-think"><span class="wiz-think-label">${ICON.think} Think first</span><p class="wiz-think-tx">${esc(c.think)}</p></div>` : ''}
      ${c.prompt ? `<div class="wiz-prompt-wrap">
        <div class="wiz-prompt-label"><span>Copy this prompt</span><button class="wiz-copy" data-wiz="copy">Copy</button></div>
        <pre class="wiz-prompt" data-wiz="prompt">${esc(c.prompt)}</pre>
      </div>` : ''}
      ${c.note ? `<p class="wiz-note">${esc(c.note)}</p>` : ''}
      ${c.gives ? `<div class="wiz-gives"><span class="wiz-tick">${ICON.tick}</span><div><strong>You now have:</strong> ${esc(c.gives)}</div></div>` : ''}`;
    const copyBtn = contentEl.querySelector('[data-wiz="copy"]');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(c.prompt).then(() => {
          copyBtn.textContent = 'Copied';
          copyBtn.classList.add('is-ok');
          setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('is-ok'); }, 1400);
        });
      });
    }
  }
  contentEl.scrollTop = 0;
}

function renderFooter() {
  prevBtn.disabled = cur === 0;
  const last = cur === cards.length - 1;
  const nextIsDone = cards[cur + 1] && cards[cur + 1].type === 'done';
  nextBtn.textContent = last ? 'Close' : (nextIsDone ? 'Finish' : 'Next');
  metaEl.textContent = cards[cur].type === 'done' ? 'Complete' : `Step ${cur + 1} of ${railCount}`;
}

function render() { renderRail(); renderContent(); renderFooter(); }

function open(details) {
  ensureModal();
  const dataEl = details.querySelector('.week-data');
  if (!dataEl) return false;
  let data;
  try { data = JSON.parse(dataEl.textContent); } catch (_) { return false; }

  cards = buildCards(data);
  railCount = cards.filter(c => c.type !== 'done').length;
  cur = 0;
  lastTrigger = details.querySelector('.week-summary');

  eyebrowEl.textContent = `Session ${parseInt(data.num, 10)}${data.phase ? ' · ' + data.phase : ''}`;
  titleEl.textContent = data.title || '';
  render();

  overlay.hidden = false;
  document.body.classList.add('wiz-open');
  // Focus the content for screen readers / keyboard.
  requestAnimationFrame(() => contentEl.focus());
  return true;
}

function close() {
  if (!overlay || overlay.hidden) return;
  overlay.hidden = true;
  document.body.classList.remove('wiz-open');
  if (lastTrigger) lastTrigger.focus();
}

export function initWeekWizard() {
  // Intercept clicks on a week summary that carries wizard data.
  // preventDefault stops the native <details> toggle so the modal opens instead.
  document.addEventListener('click', e => {
    const summary = e.target.closest('.week-summary');
    if (!summary) return;
    const details = summary.closest('details.week');
    if (!details || !details.querySelector('.week-data')) return; // not a wizard week
    e.preventDefault();
    open(details);
  });

  // Keyboard activation on the summary (Enter / Space) also fires a click,
  // so the handler above covers it. Guard against the space-scroll default.
  document.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const summary = e.target.closest && e.target.closest('.week-summary');
    if (!summary) return;
    const details = summary.closest('details.week');
    if (details && details.querySelector('.week-data')) e.preventDefault();
  });
}
