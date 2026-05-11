import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = p => path.join(__dirname, 'src', p);
const content = p => path.join(__dirname, 'content', p);
const dist = p => path.join(__dirname, 'dist', p);
const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');

function siteUrl(href) {
  if (!BASE_PATH || !href.startsWith('/')) return href;
  return `${BASE_PATH}${href}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function readFile(p) { return fs.readFileSync(p, 'utf8'); }

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const s = path.join(from, entry.name);
    const d = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ── Content loaders ───────────────────────────────────────────────────────────

function loadSite() {
  return JSON.parse(readFile(content('shared/site.json')));
}

function loadNav() {
  return JSON.parse(readFile(content('shared/nav.json')));
}

function loadHero() {
  const { data } = matter(readFile(content('home/hero.md')));
  return data;
}

function loadPitch() {
  return [1, 2, 3].map(n => {
    const { data, content: body } = matter(readFile(content(`home/pitch-${n}.md`)));
    return { ...data, body };
  });
}

function loadPrinciple() {
  const { data, content: body } = matter(readFile(content('home/principle-prose.md')));
  return { ...data, body };
}

function loadTechniques() {
  return ['01','02','03','04','05'].map(n => {
    const { data, content: body } = matter(readFile(content(`home/techniques/${n}.md`)));
    return { ...data, body };
  });
}

function loadWeeks() {
  return ['01','02','03','04','05','06','07','08','09','10','11','12'].map(n => {
    const { data } = matter(readFile(content(`weeks/${n}.md`)));
    return data;
  });
}

function loadProjects() {
  return ['a','b','c','d','e'].map(n => {
    const { data, content: body } = matter(readFile(content(`projects/${n}.md`)));
    return { ...data, brief: body.trim() };
  });
}

function loadFigmaLoop() {
  return JSON.parse(readFile(content('home/figma-loop.json')));
}

function loadJournal() {
  const dir = content('journal');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse() // newest first
    .map(f => {
      const { data, content: body } = matter(readFile(path.join(dir, f)));
      return { ...data, body };
    });
}

// ── HTML fragment builders ────────────────────────────────────────────────────

function buildNavLinks(links) {
  return links.map(({ label, href }) =>
    `<a href="${siteUrl(href)}">${label}</a>`
  ).join('\n      ');
}

function buildH1Lines(lines) {
  return lines.map(line => {
    // Convert *word* → <em class="italic-wonk">word</em>
    const html = line.replace(/\*([^*]+)\*/g, '<em class="italic-wonk">$1</em>');
    return `<span class="line"><span>${html}</span></span>`;
  }).join('\n        ');
}

function buildStats(stats) {
  return stats.map(({ value, label }) =>
    `<div><strong>${value}</strong>${label}</div>`
  ).join('\n        ');
}

function buildPitchPanels(panels) {
  return panels.map(({ num, heading, body }) => {
    const headingHtml = heading.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return `    <article class="pitch-item">
      <div class="num">${num}</div>
      <h2>${headingHtml}</h2>
      <p>${body.trim()}</p>
    </article>`;
  }).join('\n');
}

// Convert *word* → <em>word</em> (plain em, not italic-wonk class)
function emph(str) {
  return str.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function buildPrincipleBodyHtml(body) {
  return body.trim().split(/\n\n+/).map(p =>
    `<p>${p.trim()}</p>`
  ).join('\n        ');
}

function buildTechniquesList(techs) {
  return techs.map(({ num, title, body }) => `      <article class="tech">
        <div class="tech-num">${num}</div>
        <div>
          <h3>${title}</h3>
          <p>${emph(body.trim())}</p>
        </div>
      </article>`
  ).join('\n');
}

function buildWeeksList(weeks) {
  return weeks.map(w => {
    const promptsHtml = (w.prompts || []).map((p, i) => {
      const id = `prompt-w${w.num}-p${i}`;
      return `          <div class="prompt-box">
            <div class="prompt-head">
              <div class="prompt-label"><span class="star">▸</span> Prompt — ${p.title}</div>
              <button class="copy-btn" data-copy="${id}" aria-label="Copy prompt">
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <pre class="prompt-body" id="${id}">${p.body.trimEnd()}</pre>
          </div>`;
    }).join('\n');

    const exerciseItems = (w.exercise || []).map(e => `<li>${e}</li>`).join('');
    const outputItems   = (w.outputs  || []).map(o => `<li>${o}</li>`).join('');
    const watchItems    = (w.watch    || []).map(o => `<li>${o}</li>`).join('');

    return `    <details class="week" id="week-${parseInt(w.num)}">
      <summary class="week-summary" aria-label="Week ${parseInt(w.num)}: ${w.title}">
        <span class="week-num">W ${w.num}</span>
        <span class="week-title">${w.title}</span>
        <span class="week-meta">
          <span class="week-phase">${w.phase}</span>
          <svg class="week-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" stroke-width="1"/>
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1"/>
          </svg>
        </span>
      </summary>
      <div class="week-content">
        <div class="spacer"></div>
        <div>
          <div class="week-section"><h4>Capability focus</h4><p>${w.capability}</p></div>
          <div class="week-section"><h4>Live demo (10 min)</h4><p>${w.demo}</p></div>
          <div class="week-section"><h4>Hands-on exercise (40 min)</h4><ul>${exerciseItems}</ul></div>
          ${promptsHtml ? `<div class="week-section"><h4>Prompts</h4>${promptsHtml}</div>` : ''}
          <div class="week-section"><h4>Outputs</h4><ul>${outputItems}</ul></div>
          <div class="week-section"><h4>Watch out for</h4><ul>${watchItems}</ul></div>
        </div>
      </div>
    </details>`;
  }).join('\n');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function buildProjectsList(projects) {
  return projects.map(p => {
    const id = `brief-${p.letter.toLowerCase()}`;
    const tinyListHtml = (p.tinyList || []).length
      ? `<div class="project-section"><h4>What makes it tiny</h4><ul>${
          p.tinyList.map(item => `<li>${item}</li>`).join('')
        }</ul></div>`
      : '';
    const trapHtml = p.trap
      ? `<div class="project-trap"><h4>Watch out for</h4><p>${p.trap.trim()}</p></div>`
      : '';

    return `    <details class="project" id="project-${p.letter.toLowerCase()}">
      <summary class="project-summary" aria-label="Option ${p.letter}: ${p.name}">
        <span class="project-letter">${p.letter}</span>
        <span class="project-name">${p.name}</span>
        <span class="project-meta">
          <span class="project-bestfor">for: ${p.bestFor}</span>
          <svg class="project-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" stroke-width="1"/>
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1"/>
          </svg>
        </span>
      </summary>
      <div class="project-content">
        <div class="spacer"></div>
        <div>
          <p class="project-desc">${p.desc}</p>
          <div class="project-section"><h4>Pick this if</h4><p>${p.pickIf.trim()}</p></div>
          <div class="project-section"><h4>What goes wrong</h4><p>${p.goesWrong.trim()}</p></div>
          <div class="project-section"><h4>What good looks like</h4><p>${p.goodLooks.trim()}</p></div>
          ${tinyListHtml}
          ${trapHtml}
          <div class="project-brief">
            <div class="prompt-head">
              <div class="prompt-label"><span class="star">▸</span> Brief template</div>
              <button class="copy-btn" data-copy="${id}" aria-label="Copy brief template">
                <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
                <span>Copy</span>
              </button>
            </div>
            <pre class="prompt-body" id="${id}">${escapeHtml(p.brief)}</pre>
          </div>
        </div>
      </div>
    </details>`;
  }).join('\n');
}

function flSubHead(eyebrow, title, lead) {
  return `<div class="loop-sub-head">
      <span class="loop-sub-eyebrow">${eyebrow}</span>
      <h3 class="loop-sub-title">${title}</h3>
    </div>${lead ? `\n    <p class="loop-lead">${lead}</p>` : ''}`;
}

function flCallout(c) {
  return `<div class="loop-callout"><strong>${c.title}</strong><p>${c.body}</p></div>`;
}

function flPullquote(text) {
  return `<p class="loop-pullquote"><em>${text}</em></p>`;
}

function flTwoCol(left, right) {
  const col = ({ head, items }) =>
    `<div class="loop-col">
        <h4 class="loop-col-head">${head}</h4>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>`;
  return `<div class="loop-two-col">${col(left)}${col(right)}</div>`;
}

function buildFLSub1(d) {
  const cards = d.cards.map(c => `<div class="loop-card">
        <div class="loop-card-top">
          <span class="loop-card-num">${c.num}</span>
          <span class="loop-card-status loop-card-status--${c.status === 'DEFAULT' ? 'default' : c.status === 'LATER' ? 'later' : 'use'}">${c.status}</span>
        </div>
        <h4 class="loop-card-title">${c.title}</h4>
        <p>${c.body}</p>
      </div>`).join('\n      ');
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-cards">${cards}</div>
    ${flPullquote(d.pullquote)}
  </div>`;
}

function buildFLSub2(d) {
  const col = ({ head, items }) =>
    `<div class="loop-col">
        <h4 class="loop-col-head">${head}</h4>
        <ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>`;
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-two-col loop-two-col--ruled">${col(d.readsWell)}${col(d.readsBadly)}</div>
    <p class="loop-closing-line"><em>${d.closing}</em></p>
  </div>`;
}

function buildFLSub3(d) {
  const items = d.stack.map(s => `<div class="loop-stack-item">
        <span class="loop-stack-num">${s.num}</span>
        <div><strong>${s.title}</strong><p>${s.body}</p></div>
      </div>`).join('\n      ');
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-stack">${items}</div>
    ${flCallout(d.callout)}
  </div>`;
}

function buildFLSub4(d) {
  const cards = d.cards.map(c => `<div class="loop-card loop-card--failure">
        <h4 class="loop-card-title">${c.name}</h4>
        <div class="loop-card-block"><span class="loop-card-label">What you'll see</span><p>${c.symptom}</p></div>
        <div class="loop-card-block"><span class="loop-card-label">Why</span><p>${c.why}</p></div>
        <div class="loop-card-block"><span class="loop-card-label">Fix</span><p>${c.fix}</p></div>
      </div>`).join('\n      ');
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-cards">${cards}</div>
    ${flPullquote(d.pullquote)}
  </div>`;
}

function buildFLSub5(d) {
  const rungs = d.rungs.map(r => `<div class="loop-rung">
        <span class="loop-rung-num">${r.num}</span>
        <div><p class="loop-rung-quote">"${r.quote}"</p><p class="loop-rung-gloss">${r.gloss}</p></div>
      </div>`).join('\n      ');
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-ladder">${rungs}</div>
    <p class="loop-note">${d.note}</p>
  </div>`;
}

function buildFLSub6(d) {
  const principle = `<p class="loop-principle">${d.principle}</p>`;
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, null)}
    ${principle}
    ${flTwoCol(d.why, d.how)}
    <p class="loop-note">${d.exception}</p>
  </div>`;
}

function buildFLSub7(d) {
  const rule = `<div class="loop-big-rule">
      <span class="loop-big-num">${d.rule.num}</span>
      <div><strong>${d.rule.title}</strong><p>${d.rule.body}</p></div>
    </div>`;
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    ${rule}
    ${flTwoCol(d.change, d.prompt)}
    <p class="loop-closing-line"><em>${d.closing}</em></p>
  </div>`;
}

function buildFLSub8(d) {
  const credits = `<div class="loop-callout"><strong>${d.credits.title}</strong><p>${d.credits.body}</p></div>`;
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    ${flTwoCol(d.use, d.skip)}
    ${credits}
  </div>`;
}

function buildFLSub9(d) {
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, null)}
    <p class="loop-lead">${d.body}</p>
    <p class="loop-note"><strong>Why we don't centre it here.</strong> ${d.why}</p>
    <p class="loop-note">${d.whenToReturn}</p>
  </div>`;
}

function buildFLSub10(d) {
  const cats = d.categories.map(cat => {
    const links = cat.links.map(l =>
      l.url
        ? `<li><a href="${l.url}" target="_blank" rel="noopener">${l.title}</a></li>`
        : `<li>${l.title}</li>`
    ).join('');
    return `<div class="loop-link-group">
        <span class="loop-link-cat">${cat.label}</span>
        <ul>${links}</ul>
      </div>`;
  }).join('\n      ');
  return `<div class="loop-sub">
    ${flSubHead(d.eyebrow, d.title, d.lead)}
    <div class="loop-links">${cats}</div>
  </div>`;
}

function withLoopId(html, eyebrow) {
  const m = eyebrow.match(/(\d+)/);
  if (!m) return html;
  return html.replace('<div class="loop-sub">', `<div class="loop-sub" id="loop-${m[1]}">`);
}

function buildFigmaLoopHtml(data, svg) {
  const steps = data.steps.map(s =>
    `<div class="loop-step">
        <span class="loop-step-num">${s.num}</span>
        <div><strong>${s.title}</strong><p>${s.body}</p></div>
      </div>`
  ).join('\n      ');

  const intro = `<div class="loop-intro">
    <div class="loop-diagram">${svg}</div>
    <div class="loop-steps">${steps}</div>
  </div>`;

  return [
    intro,
    withLoopId(buildFLSub1(data.sub1),  data.sub1.eyebrow),
    withLoopId(buildFLSub2(data.sub2),  data.sub2.eyebrow),
    withLoopId(buildFLSub3(data.sub3),  data.sub3.eyebrow),
    withLoopId(buildFLSub4(data.sub4),  data.sub4.eyebrow),
    withLoopId(buildFLSub5(data.sub5),  data.sub5.eyebrow),
    withLoopId(buildFLSub6(data.sub6),  data.sub6.eyebrow),
    withLoopId(buildFLSub7(data.sub7),  data.sub7.eyebrow),
    withLoopId(buildFLSub8(data.sub8),  data.sub8.eyebrow),
    withLoopId(buildFLSub9(data.sub9),  data.sub9.eyebrow),
    withLoopId(buildFLSub10(data.sub10), data.sub10.eyebrow),
    `<p class="loop-closing"><em>${data.closingLine}</em></p>`,
  ].join('\n  ');
}

// ── Journal builders ──────────────────────────────────────────────────────────

function buildJournalEntry(entry) {
  const num = entry.num;
  const dateLabel = entry.date
    ? new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';
  const phase = entry.phase ? `<span class="phase">${entry.phase}</span>` : '';
  const date  = dateLabel ? `<span class="date">${dateLabel}</span>` : '';
  const participants = (entry.participants !== undefined)
    ? `<span class="participants">${entry.participants} present</span>`
    : '';

  const bodyHtml = marked.parse(entry.body || '');

  const quoteBlock = (entry.quote && entry.quoteAttribution)
    ? `<aside class="journal-entry-quote">
        <q>${entry.quote}</q>
        <span class="attr">— ${entry.quoteAttribution}</span>
      </aside>`
    : '';

  return `<article class="journal-entry" id="entry-${num}">
    <div class="journal-entry-meta">
      <span class="num">Week ${num}</span>
      ${phase}
      ${date}
      ${participants}
    </div>
    <h2 class="journal-entry-title">${entry.title}</h2>
    ${quoteBlock}
    <div class="journal-entry-body">
      ${bodyHtml}
    </div>
  </article>`;
}

function buildJournalContents(entries, totalWeeks) {
  const count = entries.length;
  const latest = entries[0]; // entries already sorted newest first
  const latestParticipants = latest && latest.participants !== undefined ? latest.participants : null;

  const metaBits = [
    `Week ${count} of ${totalWeeks}`,
    latestParticipants !== null ? `${latestParticipants} participants` : null,
    `${count} ${count === 1 ? 'entry' : 'entries'} so far`,
  ].filter(Boolean).join(' · ');

  const items = entries.map(e => {
    const dateLabel = e.date
      ? new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : '';
    const hook = e.quote
      ? `<span class="contents-hook">&ldquo;${e.quote}&rdquo;${e.quoteAttribution ? ` <span class="contents-attr">— ${e.quoteAttribution}</span>` : ''}</span>`
      : '';
    return `<li class="contents-item">
      <a class="contents-link" href="#entry-${e.num}">
        <span class="contents-num">${e.num}</span>
        <span class="contents-title">${e.title}</span>
        <span class="contents-date">${dateLabel}</span>
      </a>
      ${hook}
    </li>`;
  }).join('\n');

  const emptyRow = count === 0
    ? `<li class="contents-item contents-item--empty"><span class="contents-num">01</span><span class="contents-title contents-pending">First entry lands after Week 1.</span></li>`
    : '';

  const remaining = totalWeeks - count;
  const upcoming = remaining > 0 && count > 0
    ? `<li class="contents-item contents-item--upcoming"><span class="contents-num">${String(count + 1).padStart(2, '0')}–${totalWeeks}</span><span class="contents-title contents-pending">${remaining} more ${remaining === 1 ? 'entry' : 'entries'} to come.</span></li>`
    : '';

  return `<nav class="journal-contents" aria-label="In this journal">
    <div class="contents-head">
      <span class="journal-eyebrow">/contents</span>
      <span class="contents-meta">${metaBits}</span>
    </div>
    <ul class="contents-list">
      ${items}
      ${emptyRow}
      ${upcoming}
    </ul>
    <a class="contents-tools-link" href="#journal-prompts">Tools — prompts for facilitators &amp; participants <span aria-hidden="true">↓</span></a>
  </nav>`;
}

function buildJournalPromptItem(w) {
  const num = w.num;
  const weekNum = parseInt(num);
  const facId = `journal-prompt-w${num}-fac`;
  const partId = `journal-prompt-w${num}-part`;
  const outputsList = (w.outputs || []).join('; ') || '[fill in for your week]';

  const facPrompt = `I just ran Week ${num} of the AI for Designers program — "${w.title}" (focus: ${w.capability}).

Here are my raw notes from today's session:

[PASTE NOTES HERE — bullets are fine, half-thoughts OK]

Synthesise into the facilitator weekly structure:
1. Session header (week, date, participants present, who was absent)
2. What each participant did (one block per person, bullets fine)
3. Patterns across the group (one paragraph)
4. Individual highlights (one line per participant — the thing worth remembering)
5. What worked / didn't (3–4 bullets each, honest)
6. Notes for next week (specific, per-participant where it matters)
7. Quote of the week (one line, with attribution)

Voice rules: specific, observational, no fluff. Don't paper over what went wrong. Name risks. Don't editorialise beyond what my notes support.

If anything important is missing, ask me one question at a time — don't fabricate.`;

  const partPrompt = `I just finished Week ${num} of the AI for Designers program — "${w.title}" (focus: ${w.capability}). The expected outputs were: ${outputsList}.

Interview me about my experience this week. Ask me one question at a time, eight total:

1. What did you actually make this week? (concrete, one–two sentences)
2. What's the most useful thing Claude did for you? (specific moment — paste the prompt or describe the exchange)
3. What did Claude do badly, or what did you fight against?
4. What's the one decision you made about your project this week?
5. What are you stuck on right now?
6. One screenshot or artifact worth keeping (link or describe)
7. A quote-worthy line — something you said or thought
8. What do you want to do next week?

After all eight, structure my answers as a clean check-in I can paste back to my facilitator. Don't editorialise — use my words, organised.`;

  return `<details class="week" id="journal-prompts-w${num}">
      <summary class="week-summary" aria-label="Week ${weekNum} journal prompts: ${w.title}">
        <span class="week-num">W ${num}</span>
        <span class="week-title">${w.title}</span>
        <span class="week-meta">
          <span class="week-phase">${w.phase}</span>
          <svg class="week-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" stroke-width="1"/>
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1"/>
          </svg>
        </span>
      </summary>
      <div class="week-content">
        <div class="spacer"></div>
        <div>
          <div class="week-section">
            <h4>Facilitator — synthesise the session</h4>
            <p>Run after the session. Paste your raw notes; Claude turns them into the weekly facilitator writeup.</p>
            <div class="prompt-box">
              <div class="prompt-head">
                <div class="prompt-label"><span class="star">▸</span> Prompt — Facilitator synthesis</div>
                <button class="copy-btn" data-copy="${facId}" aria-label="Copy facilitator prompt">
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre class="prompt-body" id="${facId}">${escapeHtml(facPrompt)}</pre>
            </div>
          </div>
          <div class="week-section">
            <h4>Participant — capture your experience</h4>
            <p>Each participant runs this in their own Claude. It interviews them and outputs a clean check-in to send back to the facilitator.</p>
            <div class="prompt-box">
              <div class="prompt-head">
                <div class="prompt-label"><span class="star">▸</span> Prompt — Participant check-in</div>
                <button class="copy-btn" data-copy="${partId}" aria-label="Copy participant prompt">
                  <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
                  <span>Copy</span>
                </button>
              </div>
              <pre class="prompt-body" id="${partId}">${escapeHtml(partPrompt)}</pre>
            </div>
          </div>
        </div>
      </div>
    </details>`;
}

function buildJournalPromptsSection(weeks) {
  const items = weeks.map(buildJournalPromptItem).join('\n');
  return `<section class="journal-prompts" id="journal-prompts" aria-labelledby="journal-prompts-title">
    <header class="journal-prompts-head">
      <span class="journal-eyebrow">/tools</span>
      <h2 class="journal-prompts-title" id="journal-prompts-title">Prompts for journaling each <em class="italic-wonk">week</em>.</h2>
      <p class="journal-lead">Two prompts per session. One for the facilitator to synthesise what happened. One for each participant to capture their own experience. The outputs feed back into this journal.</p>
    </header>
    <div class="weeks-grid">${items}</div>
  </section>`;
}

function buildJournalHtml(entries, weeks) {
  const header = `<header class="journal-header">
    <span class="journal-eyebrow">/journal</span>
    <h1 class="journal-title display" id="journal-title">I designed a 12-session workshop to see if I could teach my colleagues AI by just doing <em class="italic-wonk">it.</em></h1>
    <p class="journal-lead">The idea was simple enough — one hour a week, twelve weeks, real projects. Each person picked something based on their own personality, their vision, their goals. So every project ended up being its own universe. And with Claude, we started bringing them to life.</p>
    <p class="journal-lead-note">There's no better way to learn something than to just try it yourself. The moment you find a solution you weren't expecting, or discover something that actually works — that's the thing that sticks. These are the notes from that process. Tag along.</p>
  </header>`;

  const contents = buildJournalContents(entries, weeks.length);

  const entriesHtml = entries.length
    ? entries.map(buildJournalEntry).join('\n')
    : `<div class="journal-empty">No entries yet — first session writeup lands soon.</div>`;

  return header + contents + entriesHtml + buildJournalPromptsSection(weeks);
}

// ── Facilitator builders ──────────────────────────────────────────────────────

function loadFacilitator() {
  return JSON.parse(readFile(content('facilitator/page.json')));
}

function facPill(tag) {
  const cls = tag === 'SCRIPT' ? 'fac-pill--script' : 'fac-pill--principle';
  return `<span class="fac-pill ${cls}">${tag}</span>`;
}

function facAnswerBlock(block) {
  if (block.rules) {
    const rules = block.rules.map(r =>
      `<div class="fac-rule"><p class="fac-rule-head">${r.head}</p><p>${r.body}</p></div>`
    ).join('');
    return `<div class="fac-answer-block">${facPill(block.tag)}<div class="fac-rules">${rules}</div></div>`;
  }
  const paras = block.paras.map(p => `<p>${emph(p)}</p>`).join('');
  return `<div class="fac-answer-block">${facPill(block.tag)}${paras}</div>`;
}

function facScriptLines(lines) {
  return lines.map(line =>
    line.startsWith('"')
      ? `<p class="fac-script-line">${line}</p>`
      : `<p>${emph(line)}</p>`
  ).join('');
}

function buildFacOpener(d) {
  const titleHtml = d.titleLines.map(l => `<span class="line"><span>${l}</span></span>`).join('\n        ');
  const tocItems = d.toc.map(t =>
    `<li><span class="fac-toc-num">${t.num}</span><a href="${t.href}">${t.label}</a></li>`
  ).join('\n        ');
  return `<header class="fac-opener">
    <span class="fac-eyebrow">${d.eyebrow}</span>
    <h1 class="fac-title display" id="fac-title">
        ${titleHtml}
    </h1>
    <p class="fac-lead">${d.lead}</p>
    <p class="fac-lead-note">${d.leadNote}</p>
    <nav class="fac-toc" aria-label="Page contents">
      <ul>
        ${tocItems}
      </ul>
    </nav>
  </header>`;
}

function buildFacFAQ(d) {
  const items = d.items.map(item => {
    const blocks = item.blocks.map(facAnswerBlock).join('');
    return `    <details class="fac-faq-item" id="faq-${item.num}">
      <summary class="fac-faq-summary">
        <span class="fac-q-num">${item.num}</span>
        <span class="fac-q-text">${item.q}</span>
        <svg class="fac-faq-icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" stroke-width="1"/>
          <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" stroke-width="1"/>
        </svg>
      </summary>
      <div class="fac-faq-body">${blocks}</div>
    </details>`;
  }).join('\n');
  return `<div class="fac-part" id="faq">
    <header class="fac-part-head">
      <span class="fac-part-eyebrow">${d.eyebrow}</span>
      <h2 class="fac-part-title">${d.title}</h2>
      <p class="fac-part-lead">${d.lead}</p>
    </header>
    <div class="fac-faq">\n${items}\n    </div>
  </div>`;
}

function buildFacSkeptic(d) {
  const cols = d.columns.map(col => {
    const whatItems = col.what.map(line =>
      line.startsWith('"')
        ? `<p class="fac-script-line">${line}</p>`
        : `<p>${emph(line)}</p>`
    ).join('');
    return `<div class="fac-skeptic-col">
      <div class="fac-skeptic-type"><span class="fac-col-num">${col.num}</span>${col.type}</div>
      <blockquote class="fac-col-quote">${col.quote}</blockquote>
      <div class="fac-col-block">
        <h4>Recognise it by</h4>
        <p>${col.recognize}</p>
      </div>
      <div class="fac-col-block">
        <h4>Why</h4>
        <p>${col.why}</p>
      </div>
      <div class="fac-col-block">
        <h4>What to do</h4>
        ${whatItems}
      </div>
    </div>`;
  }).join('');
  return `<div class="fac-part" id="skeptic">
    <header class="fac-part-head">
      <span class="fac-part-eyebrow">${d.eyebrow}</span>
      <h2 class="fac-part-title">${d.title}</h2>
      <p class="fac-part-lead">${d.lead}</p>
    </header>
    <div class="fac-skeptic-cols">${cols}</div>
    <p class="fac-part-closing"><em>${d.closing}</em></p>
  </div>`;
}

function buildFacOverflow(d) {
  const cards = d.cards.map(card => {
    const howHtml = facScriptLines(card.how);
    return `<div class="fac-overflow-card">
      <div class="fac-overflow-card-head">
        <span class="fac-col-num">${card.num}</span>
        <h3>${card.title}</h3>
      </div>
      <p class="fac-overflow-when"><strong>When:</strong> ${card.when}</p>
      <div class="fac-overflow-how">${howHtml}</div>
    </div>`;
  }).join('');
  return `<div class="fac-part" id="overflow">
    <header class="fac-part-head">
      <span class="fac-part-eyebrow">${d.eyebrow}</span>
      <h2 class="fac-part-title">${d.title}</h2>
      <p class="fac-part-lead">${d.lead}</p>
    </header>
    <div class="fac-callout"><strong>${d.why.title}</strong><p>${d.why.body}</p></div>
    <p class="fac-cards-intro">${d.cardsIntro}</p>
    <div class="fac-overflow-cards">${cards}</div>
    <p class="fac-part-closing"><em>${d.closing}</em></p>
  </div>`;
}

function buildFacJournal(d) {
  const fixedItems = d.sub4a.fixedItems.map(item =>
    `<div class="fac-tmpl-item">
      <span class="fac-tmpl-num">${item.num}</span>
      <div><strong>${item.title}</strong><p>${item.body}</p></div>
    </div>`
  ).join('');
  const rotatingItems = d.sub4a.rotatingItems.map(item =>
    `<div class="fac-rotating-item">
      <span class="fac-rotating-wk">Wk ${item.wk}</span>
      <div><strong>${item.title}</strong><p>${item.q}</p></div>
    </div>`
  ).join('');
  const templateId = 'journal-template';
  const panels = d.sub4c.panels.map(p =>
    `<div class="fac-journal-panel">
      <span class="fac-panel-url">${p.url}</span>
      <h4>${p.title}</h4>
      <p>${p.body}</p>
    </div>`
  ).join('');
  const rules = d.sub4d.rules.map(r =>
    `<div class="fac-tmpl-item">
      <span class="fac-tmpl-num">${r.num}</span>
      <div><strong>${r.title}</strong><p>${r.body}</p></div>
    </div>`
  ).join('');
  return `<div class="fac-part" id="journal">
    <header class="fac-part-head">
      <span class="fac-part-eyebrow">${d.eyebrow}</span>
      <h2 class="fac-part-title">${d.title}</h2>
      <p class="fac-part-lead">${d.lead}</p>
    </header>
    <div class="fac-sub">
      <h3 class="fac-sub-title">${d.sub4a.title}</h3>
      <p>${d.sub4a.intro}</p>
      <p class="fac-sub-label">${d.sub4a.fixedTitle}</p>
      <div class="fac-tmpl-list">${fixedItems}</div>
      <p class="fac-sub-label">${d.sub4a.rotatingTitle}</p>
      <div class="fac-rotating-list">${rotatingItems}</div>
    </div>
    <div class="fac-sub">
      <h3 class="fac-sub-title">${d.sub4b.title}</h3>
      <p>${d.sub4b.intro}</p>
      <div class="prompt-box">
        <div class="prompt-head">
          <div class="prompt-label"><span class="star">▸</span> Journal entry template</div>
          <button class="copy-btn" data-copy="${templateId}" aria-label="Copy journal template">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
            <span>Copy</span>
          </button>
        </div>
        <pre class="prompt-body" id="${templateId}">${escapeHtml(d.sub4b.template)}</pre>
      </div>
    </div>
    <div class="fac-sub">
      <h3 class="fac-sub-title">${d.sub4c.title}</h3>
      <p>${d.sub4c.intro}</p>
      <div class="fac-journal-panels">${panels}</div>
    </div>
    <div class="fac-sub">
      <h3 class="fac-sub-title">${d.sub4d.title}</h3>
      <p>${d.sub4d.intro}</p>
      <div class="fac-tmpl-list">${rules}</div>
    </div>
    <div class="fac-callout"><p>${d.closingCallout}</p></div>
  </div>`;
}

function buildFacilitatorHtml(data) {
  return [
    buildFacOpener(data.opener),
    buildFacFAQ(data.faq),
    buildFacSkeptic(data.skeptic),
    buildFacOverflow(data.overflow),
    buildFacJournal(data.journal),
    `<p class="fac-page-closing"><em>${data.closingLine}</em></p>`,
    `<a class="fac-back" href="${siteUrl('/')}">${data.backLink}</a>`,
  ].join('\n  ');
}

// ─────────────────────────────────────────────────────────────────────────────

function buildArcNodes(nodes) {
  const delays = [1, 1.4, 1.8, 2.2, 2.6];
  return nodes.map((n, i) => {
    const delay = delays[i] ?? i * 0.4 + 1;
    const fill = n.accent ? '#d97757' : '#e8e2d8';
    const labelText = n.label ? `${n.week} — ${n.label}` : n.week;
    return [
      `<circle class="arc-node" style="animation-delay:${delay}s" cx="${n.cx}" cy="${n.cy}" r="${n.r}" fill="${fill}"/>`,
      `<text   class="arc-label" style="animation-delay:${delay}s" x="${n.labelX}" y="${n.labelY}">${labelText}</text>`,
    ].join('\n          ');
  }).join('\n\n          ');
}

// ── Prompts library builders ──────────────────────────────────────────────────

function loadPrompts() {
  return JSON.parse(readFile(content('prompts/library.json')));
}

const CAT_LABELS = {
  design: 'Design practice',
  writing: 'Writing',
  power: 'Power',
  thinking: 'Thinking',
  planning: 'Planning',
  communication: 'Communication',
};

function buildPromptCard(p, variant) {
  // variant: 'featured' | 'capability' | 'standard'
  const id = `prompt-${p.id}`;
  const subtitleHtml = p.subtitle
    ? ` <span class="pcard-subtitle">${p.subtitle}</span>` : '';
  const catLabel = CAT_LABELS[p.category] || p.category;

  let pillHtml = '';
  if (variant === 'featured')    pillHtml = `<span class="pcard-pill pcard-pill--featured">Featured</span>`;
  else if (variant === 'capability') pillHtml = `<span class="pcard-pill pcard-pill--capability">Capability</span>`;
  else pillHtml = `<span class="pcard-pill pcard-pill--cat">${catLabel}</span>`;

  return `<div class="pcard pcard--${variant}" data-category="${p.category}" id="card-${p.id}">
  <div class="pcard-head">
    ${pillHtml}
    <h3 class="pcard-title">${p.title}${subtitleHtml}</h3>
    <p class="pcard-use-when"><em>Use when:</em> ${p.useWhen}</p>
  </div>
  <div class="pcard-body">
    <div class="pcard-body-top">
      <button class="copy-btn" data-copy="${id}" aria-label="Copy prompt: ${p.title}">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true"><rect x="3" y="3" width="7" height="7" stroke="currentColor"/><rect x="1.5" y="1.5" width="7" height="7" stroke="currentColor" fill="none"/></svg>
        <span>Copy</span>
      </button>
    </div>
    <pre class="pcard-prompt" id="${id}">${escapeHtml(p.body)}</pre>
  </div>
</div>`;
}

function buildPromptsHtml(prompts) {
  const featured    = prompts.filter(p => p.featured);
  const capabilities = prompts.filter(p => p.isCapability);
  const standard    = prompts.filter(p => !p.featured && !p.isCapability);

  const featuredHtml = featured.map(p => buildPromptCard(p, 'featured')).join('\n');
  const capHtml      = capabilities.map(p => buildPromptCard(p, 'capability')).join('\n');
  const standardHtml = standard.map(p => buildPromptCard(p, 'standard')).join('\n');

  const catOrder = ['design', 'writing', 'power', 'thinking', 'planning', 'communication'];
  const filterBtns = [
    `<button class="pfilter-btn is-active" data-filter="all" aria-pressed="true">All</button>`,
    ...catOrder.map(cat => {
      const dot = cat === 'power' ? ' <span class="pfilter-dot" aria-hidden="true"></span>' : '';
      return `<button class="pfilter-btn" data-filter="${cat}" aria-pressed="false">${CAT_LABELS[cat]}${dot}</button>`;
    }),
  ].join('\n      ');

  return `<header class="plib-header">
  <span class="plib-eyebrow">/library</span>
  <h1 class="plib-title display" id="plib-title">Prompts that earned their spot.</h1>
  <p class="plib-lead">Twenty-two prompts the team uses. Filtered by what you're trying to do. Click any to copy.</p>
</header>

<div class="plib-start">
  <span class="plib-section-label">Start here</span>
  <div class="plib-featured">
    ${featuredHtml}
  </div>
</div>

<div class="plib-filter-wrap" id="plib-filter">
  <div class="plib-filter-bar">
    ${filterBtns}
  </div>
</div>

<div class="plib-capabilities" id="capabilities">
  <span class="plib-section-label">Capabilities to know about</span>
  <p class="plib-section-note">Set up once, use forever. These aren't daily-copy prompts — they're techniques that change how you use Claude.</p>
  <div class="plib-cap-list">
    ${capHtml}
  </div>
</div>

<div class="plib-grid-wrap">
  <div class="plib-grid" id="plib-grid">
    ${standardHtml}
  </div>
  <div class="plib-empty" id="plib-empty" hidden>
    <p>No prompts in this category yet. <a href="#">Suggest one →</a></p>
  </div>
</div>`;
}

// ── Search index ──────────────────────────────────────────────────────────────

function buildSearchIndex(weeks, projects, figmaLoop, facilitator, promptLib, journal) {
  const E = (label, sub, href, type, keywords = '') =>
    ({ label, sub, href: siteUrl(href), type, keywords });

  const entries = [
    // Pages
    E('Home', 'The program overview', '/', 'page', 'home start program AI designers'),
    E('The Figma Loop', 'Page', '/figma-loop/', 'page', 'figma design export build claude loop round-trip'),
    E('Facilitator guide', 'Page', '/facilitator/', 'page', 'facilitator running guide how to program'),
    E('Prompt library', 'Page', '/prompts/', 'page', 'prompts library copy paste search'),
    E('Journal', 'Page', '/journal/', 'page', 'journal weekly notes recap session writeup case study participants'),
    E('Journal — Prompts for journaling each week', 'Journal · Tools', '/journal/#journal-prompts', 'section', 'prompts facilitator participant interview synthesis check-in tools'),

    // Home sections
    E('The anti-stock principle', 'Home', '/#principle', 'section', 'principle anti-stock photography originality stock images design'),
    E('12 Weeks', 'Program curriculum', '/#weeks', 'section', 'weeks curriculum schedule twelve program overview'),
    E('Five projects to build', 'Home', '/#projects', 'section', 'projects portfolio build make tool site microsite design system'),

    // Weeks
    ...weeks.map(w => E(
      `Week ${parseInt(w.num)} — ${w.title}`,
      w.phase,
      `/#week-${parseInt(w.num)}`,
      'week',
      `${w.capability || ''} ${w.phase || ''} week ${w.num}`,
    )),

    // Projects
    ...projects.map(p => E(
      p.name,
      `Project ${p.letter} · ${p.bestFor}`,
      `/#project-${p.letter.toLowerCase()}`,
      'project',
      `${p.desc || ''} ${p.bestFor || ''} project ${p.letter}`,
    )),

    // Figma Loop sub-sections (with anchor to sub ID)
    ...['sub1','sub2','sub3','sub4','sub5','sub6','sub7','sub8','sub9','sub10'].map((key, i) => {
      const sub = figmaLoop[key];
      if (!sub) return null;
      const num = String(i + 1).padStart(2, '0');
      return E(
        sub.title.replace(/\.$/, ''),
        `Figma Loop · ${sub.eyebrow}`,
        `/figma-loop/#loop-${num}`,
        'section',
        `figma loop export claude ${sub.eyebrow}`,
      );
    }).filter(Boolean),

    // Facilitator sub-sections
    E('FAQ — Team questions', 'Facilitator', '/facilitator/#faq', 'section', 'questions ask team faq facilitator'),
    E('Handling skeptics', 'Facilitator', '/facilitator/#skeptic', 'section', 'skeptic ambivalence skepticism pushback resistance'),
    E('Managing overflow', 'Facilitator', '/facilitator/#overflow', 'section', 'too many ideas overflow generating converge diverge'),
    E('Session journal', 'Facilitator', '/facilitator/#journal', 'section', 'journal record notes memory template write'),

    // Facilitator FAQ questions
    ...facilitator.faq.items.map(item => {
      const answerText = item.blocks
        .flatMap(b => b.paras || (b.rules ? b.rules.map(r => `${r.head} ${r.body}`) : []))
        .slice(0, 2).join(' ');
      return E(
        item.q,
        `Facilitator FAQ · ${item.num}`,
        `/facilitator/#faq-${item.num}`,
        'faq',
        answerText.slice(0, 200),
      );
    }),

    // Journal entries
    ...journal.map(e => E(
      `Journal — Week ${e.num}: ${e.title}`,
      e.phase || 'Journal entry',
      `/journal/#entry-${e.num}`,
      'journal',
      `${e.quote || ''} ${e.title || ''} journal week ${e.num}`,
    )),

    // Prompts
    ...promptLib.map(p => E(
      p.title,
      `${CAT_LABELS[p.category] || p.category} · ${p.useWhen}`,
      p.featured ? `/prompts/` : `/prompts/#card-${p.id}`,
      'prompt',
      `${p.useWhen} ${p.category} ${p.subtitle || ''} ${p.body.slice(0, 150)}`,
    )),
  ];

  return JSON.stringify(entries, null, 2);
}

// ── Template engine ───────────────────────────────────────────────────────────

function processIncludes(html, srcDir) {
  return html.replace(/\{\{include:([^}]+)\}\}/g, (_, relPath) => {
    const fullPath = path.join(srcDir, relPath.trim());
    if (!fs.existsSync(fullPath)) {
      console.warn(`  ⚠ include not found: ${relPath}`);
      return '';
    }
    return readFile(fullPath);
  });
}

function processVars(html, vars) {
  return html.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const val = vars[key.trim()];
    if (val === undefined) {
      console.warn(`  ⚠ variable not found: ${key.trim()}`);
      return match;
    }
    return val;
  });
}

// ── Build ─────────────────────────────────────────────────────────────────────

function buildPage(templatePath, vars, srcDir) {
  let html = readFile(templatePath);
  html = processIncludes(html, srcDir);
  html = processVars(html, vars);
  return html;
}

function build() {
  console.log('Building…');

  // Load content
  const site       = loadSite();
  const nav        = loadNav();
  const hero       = loadHero();
  const pitch      = loadPitch();
  const principle  = loadPrinciple();
  const techniques = loadTechniques();
  const weeks      = loadWeeks();
  const projects   = loadProjects();
  const figmaLoop  = loadFigmaLoop();
  const facilitator = loadFacilitator();
  const promptLib   = loadPrompts();
  const journal     = loadJournal();

  // Flatten all template variables into a single map
  const vars = {
    // site.*
    'site.title':       site.title,
    'site.title_short': 'AI for Designers',
    'site.description': site.description,
    'site.tagline':     site.tagline,
    'base':             BASE_PATH,

    // nav.* (generated HTML fragments)
    'nav.linkshtml': buildNavLinks(nav.primary),

    // hero.* (scalar values)
    'hero.eyebrow': hero.eyebrow,
    'hero.sub':     hero.sub,

    // hero.* (generated HTML fragments)
    'hero.h1html':    buildH1Lines(hero.h1Lines),
    'hero.statshtml': buildStats(hero.stats),

    // pitch.*
    'pitch.panelshtml': buildPitchPanels(pitch),

    // principle.*
    'principle.num':       principle.num,
    'principle.titlehtml': emph(principle.title),
    'principle.aside':     principle.aside,
    'principle.leadhtml':  emph(principle.lead),
    'principle.bodyhtml':  buildPrincipleBodyHtml(principle.body),
    'principle.pullQuote': principle.pullQuote,

    // compare SVGs (inlined from src/illustrations/)
    'compare.svgA': readFile(src('illustrations/compare-a.svg')).trim(),
    'compare.svgB': readFile(src('illustrations/compare-b.svg')).trim(),

    // techniques.*
    'techniques.listhtml': buildTechniquesList(techniques),

    // weeks.*
    'weeks.listhtml': buildWeeksList(weeks),

    // projects.*
    'projects.listhtml': buildProjectsList(projects),

    // figma loop
    'figma.html': buildFigmaLoopHtml(figmaLoop, readFile(src('illustrations/figma-loop.svg')).trim()),

    // facilitator
    'fac.html': buildFacilitatorHtml(facilitator),

    // prompts library
    'prompts.html': buildPromptsHtml(promptLib),

    // journal
    'journal.html': buildJournalHtml(journal, weeks),
  };

  const srcDir = path.join(__dirname, 'src');

  // Emit helper — creates dirs as needed
  const emit = (relPath, html) => {
    const out = dist(relPath);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`✓ dist/${relPath}`);
  };

  // Pages
  emit('index.html',                buildPage(src('index.html'),                vars, srcDir));
  emit('figma-loop/index.html',     buildPage(src('pages/figma-loop.html'),     vars, srcDir));
  emit('facilitator/index.html',    buildPage(src('pages/facilitator.html'),    vars, srcDir));
  emit('prompts/index.html',        buildPage(src('pages/prompts.html'),        vars, srcDir));
  emit('journal/index.html',        buildPage(src('pages/journal.html'),        vars, srcDir));

  // Search index for command palette
  fs.mkdirSync(dist(''), { recursive: true });
  fs.writeFileSync(dist('search-index.json'), buildSearchIndex(weeks, projects, figmaLoop, facilitator, promptLib, journal));
  console.log('✓ dist/search-index.json');

  // Copy static assets
  copyDir(src('styles'),        dist('styles'));
  copyDir(src('scripts'),       dist('scripts'));
  copyDir(src('illustrations'),  dist('illustrations'));
  copyDir(src('assets'),        dist('assets'));
}

build();
