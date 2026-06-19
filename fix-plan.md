# Fix Plan — AI for Designers site

A single, executable plan: the phases, the process, a checklist, and the concrete implementation steps for each fix. Sits on top of `visual-audit.md` (findings) and `audit-fix-guide.md` (long-form rationale). If there's a conflict, this file is the source of truth for *what we're doing*.

## The thesis (why these fixes)

The site is built well technically, but it argues against generic AI design while looking like a polished, generic editorial/AI landing page. The page *tells*; it doesn't *show*. So the high-leverage fixes are **proof, conversion, distinctiveness, and hierarchy** — not styling tweaks. Most important shift: stop explaining "AI design shouldn't be generic" and instead show *generic output → designer-directed output → what participants built → how to get involved.*

## Priority revision (after the first build pass)

The first pass (apostrophes, opacity, token) was craft-level and barely visible. The real problem is **typographic hierarchy and layout**, not styling. Before continuing the phases below, do a **hierarchy pass** (full spec in `claude-design-guide.md` → Layer 1.5):

- Apply the 7-tier ladder so titles / body / descriptions / labels are obviously different — contrast via **size → weight → color**, in that order.
- **Mono** only for code/prompt blocks and session numbers; every other label → Inter 500 uppercase.
- **Numbers** only on the 12 sessions; drop the competing `/01–03`, `A–E`, technique counters.
- **Nav:** solid background + strong bottom stroke (not translucent).
- **Session detail** (module 4.9): two-column, scannable, fix the sticky overlap.

This pass should come before Phase 3 and alongside the remaining Phase 2 items.

## Stack & working rules (read once)

- Vanilla HTML/CSS/JS + Markdown content + Node `build.js`. No framework — don't add one.
- Edit only `src/` and `content/`. **Never edit `dist/`** (generated).
- Tokens: `src/styles/tokens.css`. All visual CSS: `src/styles/components.css`. Sections: `src/partials/`. Content: `content/`.
- Run locally: `npm run dev` → http://localhost:5173 (rebuilds on save; refresh manually).
- **One branch per phase.** Commit in the order below.
- **Verify every change in both themes** (toggle, top-right) **and at ~390 / ~768 / desktop widths.**
- After Phase 1 and Phase 2, run `npx lighthouse <url> --view`. Accessibility must stay **100**; Performance ≥ 90.

## Open decisions (resolve before the CTA work in Phase 1)

1. **What is the CTA goal?** The workshop was an internal experiment Marko ran with his team, documented publicly — so a commercial "Register / Book / Buy the curriculum" may be wrong. Pick one primary action and use it everywhere:
   - (a) "Run this with your team" → contact/lead-gen
   - (b) "Read along" → Journal
   - (c) "See the plan" → Sessions
   - Decision: ____________________
2. **Typeface (Phase 3):** keep Fraunces and just stop calling it distinctive, or replace the display face? This is a brand call, not a bug. Decision: ____________________

---

## PHASE 1 — Evidence & conversion (highest impact)

Goal: make the page complete and prove the promise. Do this phase first.

### 1.1 — Surface real participant work
- [ ] Add real screenshots to the Projects section.
- **Why:** the page shows zero artifacts on a site about building real things.
- **Good news:** the assets already exist — `src/assets/weeks/03/` has `Wattlog v2.png`, `Class Arcade v2.png`, `Naucimo HR v1.png`, etc. Just surface them.
- **Steps:**
  1. In `src/partials/projects.html`, add a real-work strip (above or below the archetype list): 3 screenshots, each in a `<figure>` with a `<figcaption>` naming the project + one line (e.g. "Wattlog — a cycling tool that prescribes your next session").
  2. Reference as `{{base}}/assets/weeks/03/<file>.png`. Add explicit `width`/`height` and `loading="lazy"` to protect LCP.
  3. **Optimize first:** these PNGs are up to ~790 KB. Downscale to ~1200px wide and convert to WebP (squoosh/`cwebp`); target < 150 KB each. Keep a PNG fallback only if needed.
- **Done when:** ≥ 3 real screenshots show on the home page; Performance ≥ 90; LCP < 1.5s; images have dimensions + lazy-load.

### 1.2 — Make the stock-vs-designer-led demo show real UI
- [ ] Replace the fake mockup with a real before/after.
- **Why:** this should be the page's core evidence; today it's a card with an empty circle (looks unfinished).
- **Note:** the A/B **toggle already exists** ("A — STOCK / B — DESIGNER-LED" tabs + "Show stock / Show designer-led" buttons). Don't rebuild it — fill it with real visuals.
- **Steps:**
  1. Edit `src/illustrations/compare-a.svg` (stock) and `compare-b.svg` (designer-led) — or swap the SVGs for cropped real screenshots: a generic/stock screen vs a real `v2` artifact.
  2. Delete the empty `FIG.01` circle (`<circle ... r="20">` at the bottom of `compare-b.svg`).
- **Done when:** toggling A/B changes a real visual, not just labels; no empty placeholder remains.

### 1.3 — Add a primary CTA in the hero
- [ ] Add one primary + one secondary action to the hero. *(Blocked on Open Decision #1.)*
- **Steps:**
  1. In `src/partials/hero.html`, after `.hero-sub`, add the CTA block: one primary button (the chosen goal) + one secondary text link ("View the 12 sessions" → `#weeks`).
  2. Add a `.btn-primary` rule in `components.css`: fill `var(--accent)`, label `var(--bg)`, visible focus ring. **Check fill/label contrast in both themes** (the accent differs per theme).
- **Done when:** hero has a clear next step; CTA is keyboard-focusable with a visible focus ring; passes AA in both themes.

### 1.4 — Add a real footer
- [ ] Create and wire a site-wide footer (none exists today).
- **Steps:**
  1. Create `src/partials/footer.html` with: a one-line closing CTA (matches Decision #1), contact link, repeated subpage links (Figma Loop / Journal / Facilitator / Prompts), format line ("12 weeks · 1h/week"), and a credit ("Built by Marko / Prototyp").
  2. Add `{{include:partials/footer.html}}` before the closing scripts in `src/index.html` (after the `pages-intro` include) **and** in every template in `src/pages/`. The build already resolves `{{include:...}}` — no `build.js` change needed.
- **Done when:** footer renders on home + all sub-pages; links work; closing CTA matches the hero CTA goal.

### 1.5 — Fix the sticky header bleed-through
- [ ] Stop body text showing behind the nav on scroll (both themes).
- **Note:** the header isn't transparent — `.nav` is already `rgba(26,23,20,0.78)` + `blur(12px)`. The selector is `.nav`, not `.site-header`. Just raise opacity.
- **Steps:** in `components.css`, set `.nav` background to `color-mix(in srgb, var(--bg) 92%, transparent)` (keep the blur), and bump `[data-theme="clarity"] .nav` (line ~1575) to ~`0.95`. A fully solid `var(--bg)` is the safe fallback.
- **Done when:** nothing reads through the bar in either theme.

---

## PHASE 2 — Visual system cleanup (hierarchy & polish)

Goal: fewer "tasteful" details, stronger hierarchy, fix the obvious craft slips.

### 2.1 — Fix the straight apostrophes
- [ ] Replace `'` with `'` in visible copy (loudest amateur tell at 124px).
- **Steps (pick one):**
  - *Preferred:* enable typographic substitution in `build.js`'s `marked` config (smartypants-equivalent) or post-process rendered HTML (`'`→`'`, quotes, `--`→dash). **Exclude** code/`<pre>` and `content/prompts/library.json`.
  - *Or:* fix at source — `content/home/hero.md` (`"that's actually *yours.*"`), `pitch-*.md`, `principle-prose.md`, partials. Note `h1Lines` is injected as HTML, so make sure the fix reaches it.
- **Done when:** hero apostrophe is U+2019; no straight quotes in visible copy; code/JSON untouched.

### 2.2 — Fix the "warm dark" caption (light-mode self-own)
- [ ] Make the demo caption theme-neutral.
- **Steps:** in `src/illustrations/compare-b.svg` line 7, change "on warm dark, with hairline rules" → e.g. "on a warm, low-contrast palette, with hairline rules" (colors already theme via `var(--…)`).
- **Done when:** light mode no longer says "dark."

### 2.3 — Protect small accent text in light mode + fix the wrong token comment
- [ ] Add a dedicated UI-accent token; correct the contrast claim.
- **Why:** `tokens.css` claims the light accent is 6.1:1 — it's actually **~4.5:1** (verified). Small 11–12px mono labels use it everywhere.
- **Steps:**
  1. In `tokens.css`: `:root { --accent-ui: var(--accent); }` (dark, 5.7:1 — fine) and `[data-theme="clarity"] { --accent-ui: #A8341A; }` (~6:1).
  2. Point the small-text rules (11–12px `color: var(--accent)` mono labels + `.jump-pill .pill-active`) at `var(--accent-ui)`. Leave large display words on `--accent`.
  3. Fix the comment to state true ratios (`--accent ≈ 4.5:1, large display only`).
- **Done when:** axe/Lighthouse shows no contrast failures on labels in light mode; display words unchanged.

### 2.4 — Reduce decorative chrome
- [ ] Cut the lines that don't carry meaning (~200 bordered elements today; rules nearly vanish in light mode).
- **Steps:** keep major section dividers, session-row separators, and card borders that bound a card. Remove decorative ones (the short vertical hairline beside side-notes, redundant outlines on already-backgrounded cards) and trim excess mono labels / far-left numbering. Then nudge light `--rule` one step darker (e.g. `#D8D6CE`) so kept rules are visible.
- **Done when:** sections still read as separated in light mode; page feels less gridded; nothing loses a border it needed.

### 2.5 — Resolve the navigation (anchors vs pages) + cut the floating TOC on home
- [ ] Make nav behavior predictable; remove the redundant pill on home.
- **Steps:**
  1. In `src/partials/nav.html`, visually group: on-page anchors (Principle / Sessions / Projects) separated from resource pages (Figma Loop / Journal / Prompts), with the CTA at the end. A separator/label is enough — avoid adding a JS dropdown for 7 items.
  2. Hide `.jump-pill-wrap` on the home page on desktop too (it duplicates the nav). Keep it only on long sub-pages. Adjust in `components.css` (line ~1335) / `src/scripts/toc.js`.
- **Done when:** a user can predict scroll vs navigate; home has one wayfinding system; sub-pages that need a TOC keep it.

### 2.6 — Unify the icons (and kill the cursor)
- [ ] One icon language; replace the OS-cursor icon.
- **Steps:** in `src/partials/pages-intro.html`, redraw the middle "figma-loop" icon (currently a literal mouse pointer, `<path d="M 10 8 L 10 36 …">`) into something meaning Figma→Claude loop (two frames + a loop arrow). Keep `viewBox="0 0 48 48"`, `stroke-width="1.5"`, round caps/joins, `currentColor`. Make all three a single metaphor family. Standardize small UI glyphs to 24×24 / 1.5px.
- **Done when:** no cursor/quill/terminal mismatch; decorative icons share stroke; all recolor in both themes.

### 2.7 — Rework the hero stats
- [ ] Replace vague brag-numbers with concrete facts.
- **Steps:** in `content/home/hero.md`, change the `stats` block. "5 capability areas" and "1 shipped project" → concrete: duration / format / outcome / audience (e.g. `12 weeks · 1 hour each · 1 shipped prototype · for design teams`).
- **Done when:** every stat answers a practical question (how long, what format, what outcome, who for).

### 2.8 — Plain-language session subtitles
- [ ] Make compressed labels legible to newcomers ("for designers mostly new to AI").
- **Steps:** first check whether the accordion expansion in `src/partials/weeks.html` already reveals a description — if so, surface a one-line subtitle in the collapsed row. Pull wording from the real `content/weeks/NN.md` (don't invent). Example: "W05 — Make it clickable · Build a rough prototype to test the idea before polishing."
- **Done when:** each session row reads clearly without expanding; copy comes from existing content.

---

## PHASE 3 — Distinctiveness (make the page demonstrate its own principle)

Goal: the page should *look* like a design decision, not a template. *(Largely depends on Open Decision #2.)*

- [ ] **3.1 Type:** keep Inter Tight for body; either commit to Fraunces deliberately (move its optical/SOFT axes across the page) or swap the display face (`--serif` in `tokens.css`) for something less circulated. One token, everything inherits.
- [ ] **3.2 Break the formula:** stop the "roman phrase + one italic word." heading pattern on every section; vary it.
- [ ] **3.3 Process visuals:** add a "prompt → design direction → built result" sequence using real material.
- [ ] **3.4 Final pass:** confirm the page now shows the anti-stock principle rather than asserting it.

---

## Quick wins (low-risk, can ship immediately, independent of the rest)

- [ ] 2.1 apostrophes
- [ ] 2.2 "warm dark" caption
- [ ] 2.3 accent-ui token + comment fix
- [ ] 1.5 header opacity

## Suggested commit order

1. quick wins (apostrophes, warm-dark, header opacity)
2. accent-ui token + comment (2.3)
3. footer + hero CTA (1.3, 1.4)
4. surface real work + fix demo (1.1, 1.2) — optimize images in the same PR
5. nav + hide home TOC (2.5)
6. unify icons (2.6)
7. stats + session subtitles (2.7, 2.8)
8. trim chrome (2.4)
9. Phase 3 (separate spike)

## Definition of done

- Accessibility = 100 in both themes (axe/Lighthouse); Performance ≥ 90; LCP < 1.5s with new images.
- No straight quotes in visible copy; no "warm dark" in light mode; no text bleeding behind the nav.
- Home shows real work, has one clear primary action, and has a footer.
- Icons share one stroke language; no OS cursor as decoration.
- Nav behavior is predictable; one wayfinding system on home.
- Tested at ~390 / ~768 / desktop.
