# Audit fixes — solutions + Claude Code execution guide

Companion to `visual-audit.md`. This turns the audit into a build plan. It's written to be handed to Claude Code: each fix names the real file, the exact change, and how to confirm it worked.

## How to work this

- **Stack:** vanilla HTML/CSS/JS + Markdown content + the Node `build.js`. No framework. Tokens live in `src/styles/tokens.css`; everything visual is in `src/styles/components.css`; sections are partials in `src/partials/`; content is in `content/`.
- **Run locally:** `npm run dev` → http://localhost:5173 (rebuilds on save; refresh manually).
- **Branch per fix group** below. Don't do it all in one commit.
- **Verify every change in both themes** (toggle top-right) and at a narrow width. Run `npx lighthouse <url> --view` after the big ones; Accessibility must stay 100.
- Source of truth for edits is `src/` and `content/`. Never edit `dist/` — it's generated.

The fixes are ordered by leverage. P1–P2 change what the page *does*; P3–P5 fix craft.

---

## P1 — Put the real work on the page

**Problem (audit's biggest finding):** a site selling "build something distinctive and real" shows zero artifacts. No screenshots, no participant work, no stock-vs-designer-led comparison you can actually see. The argument is made entirely in prose.

**The lucky part:** the assets already exist. `src/assets/weeks/03/` contains real screenshots — `Wattlog v1.png`, `Wattlog v2.png`, `Class Arcade v1.png`, `Class Arcade v2.png`, `Naucimo HR v1.png`. They're just not surfaced on the home page.

**Where:** `src/partials/projects.html` (the "What you build" section), and `src/partials/principle.html` + `src/illustrations/compare-a.svg` / `compare-b.svg` (the stock-vs-designer-led demo).

**Fix:**

1. **Surface participant work in the Projects section.** Right now it lists project *types* in words. Add a real-work strip above or below the archetype list: three of the existing screenshots, each captioned with the project name and one line ("Wattlog — a cycling tool that prescribes your next session"). Reference them as `{{base}}/assets/weeks/03/<file>.png`. Use `loading="lazy"`, set explicit `width`/`height` to protect LCP, and wrap each in a `<figure>` with a `<figcaption>`.
2. **Make the stock-vs-designer-led demo show real UI.** Today `compare-b.svg` is a fake mini-mockup (an empty circle labelled FIG.01). Replace the placeholder side with an actual before/after: a generic/stock screen vs one of the real `v2` screenshots. If keeping it as SVG is preferred, at minimum drop the empty circle and show a real cropped frame.
3. **Optimize first.** These PNGs are up to 790 KB (`Naucimo HR v1.png`). Before shipping, downscale to ~1200px wide and convert to WebP (`cwebp` or squoosh), keep PNG fallback only if needed. Target < 150 KB each.

**Verify:** home page shows at least three real screenshots; Lighthouse Performance stays ≥ 90; LCP < 1.5s; images have dimensions and lazy-load.

---

## P2 — Give the page a door (primary CTA) and a footer

**Problem:** there is no primary action anywhere — the hero is prose with no button — and the page has no footer at all (`grep` confirms no `footer` element and no `src/partials/footer.html`). After "Where next," the page just stops. For a workshop landing page there's no apply / register / contact / date.

**Where:** `src/partials/hero.html` (CTA), a new `src/partials/footer.html`, and `src/index.html` + the page templates in `src/pages/` (to include the footer).

**Fix:**

1. **Add a hero CTA.** In `src/partials/hero.html`, after `.hero-sub`, add a primary action that reflects the real next step (e.g. "Read the plan" → `#weeks`, or an external "Apply / Get in touch" link). One primary button, optional secondary text link. Style it as a new `.btn-primary` in `components.css` using `--accent` for fill and `--bg` for text — and check the fill/text contrast in **both** themes.
2. **Create `src/partials/footer.html`.** Include: a one-line restatement of what the workshop is, the real nav links repeated (pull from `content/shared/nav.json` if the build supports it, else hardcode), a contact method, and a credit line. Keep it to one or two rows.
3. **Wire it into the build.** The include convention is `{{include:partials/footer.html}}` (same as `nav.html`). Add it right before the closing `</body>`/scripts in `src/index.html` (after line 38's `pages-intro` include) **and** in every template under `src/pages/` so it appears site-wide. Confirm `build.js` resolves the new include (it already loops includes — no build change needed, just the placeholder).

**Verify:** footer renders on home and all sub-pages; hero CTA is keyboard-focusable with a visible focus ring; CTA fill/label passes AA in both themes.

---

## P3 — Typography

### 3a. Fix the straight apostrophes (do this first — it's 10 minutes)

**Problem:** the hero and body use typewriter quotes (`'`) instead of typographic ones (`'`). At 124px in Fraunces this is the loudest amateur tell on the page.

**Where:** content source. The hero line lives in `content/home/hero.md`:
```yaml
h1Lines:
  - "Twelve hours to build something"
  - "that's actually *yours.*"   # ← straight apostrophe
```
It recurs in body copy (`pitch-*.md`, `principle-prose.md`, partials) — `it's`, `you've`, `we'll`, `what's`.

**Fix (pick one):**
- **Preferred — fix at the build.** `marked` supports typographic substitution. Enable smart-quotes in `build.js`'s `marked` config (`marked.use({ ... })` with a smartypants-equivalent, or post-process rendered HTML to convert `'`→`'`, `"`/`"`→`"`/`"`, `--`→en/em dash). This fixes every page at once and prevents regressions. Caution: don't run it over code/`<pre>` blocks or the prompt library JSON.
- **Or — fix the source.** Replace straight quotes with curly ones directly in the content MD and partials. Faster to reason about, but easy to reintroduce later.

Note `h1Lines` is injected as HTML (`{{hero.h1html}}`), so make sure whichever method you choose actually reaches the hero string.

**Verify:** view source of the hero — the apostrophe is `'` (U+2019); no `'` remain in visible copy; code blocks and `library.json` are untouched.

### 3b. Correct the accent-contrast claim and protect small accent text

**Problem:** `src/styles/tokens.css` claims `--accent #C8421C : 6.1:1` on the light background. **That's wrong — the real ratio is ~4.5:1** (I recomputed it). It scrapes past AA for normal text by a hair, but accent is used for a lot of *small* (11–12px) mono labels — eyebrows, `.pill-active`, status chips (see `components.css` lines 174, 203, 292, 545, 559, 586, 604, 626, 648, and `.jump-pill .pill-active`). At that size on `#F6F5F1` it's borderline. (The 6.1:1 figure in the comment actually matches `--accent-soft #A8341A`, which is ~6:1 — the comment is describing the wrong token.)

**Where:** `src/styles/tokens.css` (the `[data-theme="clarity"]` block + the comment above it).

**Fix:**
- Introduce a dedicated **UI/text accent** token so the big display words can stay vibrant while small text gets a safe value:
  ```css
  /* dark */ :root            { --accent-ui: var(--accent); }      /* 5.7:1 on dark — fine */
  /* light */ [data-theme="clarity"] { --accent-ui: #A8341A; }     /* ~6:1 on #F6F5F1 */
  ```
  Then point the small-text rules (the 11–12px `color: var(--accent)` mono labels and `.pill-active`) at `var(--accent-ui)`. Leave the large italic display words on `--accent`.
- **Fix the comment** in `tokens.css` to state the true ratios: `--accent #C8421C ≈ 4.5:1 (AA for normal text, used for large display only)`, `--accent-ui #A8341A ≈ 6.1:1`.

**Verify:** run a contrast check (e.g. Lighthouse / axe) in light mode — no contrast failures on the mono labels; large display words unchanged.

### 3c. (Optional, bigger) Reconsider the typeface

**Problem:** Fraunces + Inter Tight + JetBrains Mono is the current default "tasteful AI" stack, on a page arguing against defaults — and the demo card literally names this pairing as the example of restraint. Lower priority because it's a brand decision, not a bug.

**If pursued:** swap the display serif (`--serif` in `tokens.css`) for something less circulated, or commit to a variable face and actually move its axes across the page. Touch one token; everything inherits. Treat as its own design spike, not part of this fix pass.

---

## P4 — Unify the icons (and kill the cursor)

**Problem:** the three "Where next" icons read as three unrelated decisions: a hand-drawn **quill** (editorial), a literal **mouse-cursor arrow** (UI chrome used as decoration), and a **terminal** (dev). Across the wider page there are also ~5 stroke weights and ~7 viewBox grids on the small glyphs.

**Where:** `src/partials/pages-intro.html` — all three are inline SVGs, each `viewBox="0 0 48 48"`, main `stroke-width="1.5"`. (The grid/stroke *within these three* is actually consistent; the problem is metaphor + the cursor. The grid/stroke sprawl is in the small UI glyphs elsewhere.)

**Fix:**

1. **Replace the figma-loop cursor.** The middle icon (`<path d="M 10 8 L 10 36 ...">`) is a literal OS pointer. Redraw it to mean "Figma → Claude loop" — e.g. two overlapping frames with a circular arrow, or a comp with a loop-back arrow. Keep `viewBox="0 0 48 48"`, `stroke-width="1.5"`, `stroke-linecap/linejoin="round"`, `currentColor` so it themes.
2. **Make the trio one family.** Decide the metaphor: if the quill is the brand idea (editorial/journal), redraw the other two in the same hand (same corner radius, same stroke rhythm, same level of detail). If not, simplify all three to plain geometric line icons. Either way they must look drawn by the same person.
3. **Standardize the rest.** For the small functional glyphs (chevrons, `+`, arrows), pick one grid (24×24) and one stroke (1.5px) and normalize. They don't need to match the decorative trio's style, but they should match *each other*.

**Verify:** the three cards no longer mix a cursor/quill/terminal; all decorative icons share stroke weight; icons recolor correctly in both themes (they use `currentColor`).

---

## P5 — Cut the chrome

### 5a. The "warm dark" self-own

**Problem:** the demo card caption says *"…on warm dark, with hairline rules…"* — and it stays in **light** mode, contradicting the theme. It's literal text baked into the SVG.

**Where:** `src/illustrations/compare-b.svg`, line 7 (`<text ...>on warm dark, with hairline rules</text>`).

**Fix:** change to theme-neutral copy, e.g. *"on a warm, low-contrast palette, with hairline rules"*. (The SVG already uses `var(--ink)`/`var(--accent)` so colors theme correctly — only the words are wrong.)

**Verify:** toggle to light mode — the caption no longer says "dark."

### 5b. Header bleed-through

**Problem:** body text smears faintly behind the wordmark on scroll, in both themes.

**Where:** `src/styles/components.css` — `.nav` is `background: rgba(26, 23, 20, 0.78)` + `blur(12px)` (line ~6), and `[data-theme="clarity"] .nav` is `rgba(246, 245, 241, 0.88)` (line ~1575). The transparency is what lets text show.

**Fix:** raise the opacity so text can't read through — ~`0.92` dark / ~`0.95` light, or drive it from the token: `background: color-mix(in srgb, var(--bg) 92%, transparent);`. Keep the blur. If a fully solid bar is acceptable, just use `var(--bg)`.

**Verify:** scroll the home page in both themes — no text visible behind "AI for Designers."

### 5c. Too many hairlines / faint in light

**Problem:** ~200 bordered elements. The grid is drawn in ink where spacing already implies it; and in light mode the rule (`#E0DFD9` on `#F6F5F1`, ~1.1:1) nearly vanishes, so the sectioning is simultaneously heavy in dark and weak in light.

**Where:** `--rule` / `--hairline` in `tokens.css`; the many `border`/`border-bottom: var(--hairline)` usages in `components.css`.

**Fix:** audit which rules carry meaning (section dividers, the session-row separators) and keep those; delete decorative ones (the short vertical hairline beside side-notes, redundant card outlines that already have a background). Then nudge the light `--rule` one step darker (e.g. `#D8D6CE`) so the rules you keep are actually visible. Fewer lines, slightly stronger.

**Verify:** sections still read as separated in light mode; the page feels less gridded; no element loses a border it needed for legibility.

### 5d. Redundant floating "On this page" pill

**Problem:** on the home page it's a second wayfinding system competing with the top nav, and it collides with the header band. (It's correctly hidden on mobile home already.)

**Where:** `.jump-pill-wrap` in `components.css` (line ~1335); behavior in `src/scripts/toc.js`.

**Fix (choose):** simplest — hide the pill on the home page on desktop too (it duplicates the nav anchors); keep it only on long sub-pages (journal, prompts) where it earns its place. Or, if keeping it, push its `top` below the nav so it never overlaps and reduce its visual weight. Recommend hiding on home.

**Verify:** home page has one wayfinding system; sub-pages that need the TOC still have it; no overlap with the header.

### 5e. The empty "FIG.01" placeholder

Covered by P1.2 — replacing the demo with real UI removes the empty circle. If P1 is deferred, at least delete the circle so the card doesn't look unfinished.

---

## P6 — (Low) Consolidate breakpoints

**Problem:** ~10 ad-hoc breakpoints (600/640/680/700/720/880/900/1000/1023/1024). Works, but every section invents its own width — a maintenance smell.

**Where:** the `@media` queries throughout `components.css`.

**Fix:** settle on 3–4 named breakpoints (e.g. 640 / 900 / 1024) and migrate the one-off queries onto them. Pure refactor; do it last, in isolation, and diff the rendered pages before/after to confirm nothing shifted.

---

## Suggested commit sequence

1. `fix: typographic apostrophes` (P3a) — tiny, high-visibility, safe.
2. `fix: warm-dark caption + header opacity` (P5a, P5b) — quick craft wins.
3. `a11y: dedicated --accent-ui for small text + correct token comment` (P3b).
4. `feat: footer + hero CTA` (P2).
5. `feat: surface real participant work` (P1) — the big one; optimize images in the same PR.
6. `design: unify Where-next icons` (P4).
7. `chore: trim hairlines / hide home TOC` (P5c, P5d).
8. `refactor: consolidate breakpoints` (P6) — last, isolated.

## Definition of done

- Both themes pass an axe/Lighthouse contrast check; **Accessibility = 100**.
- Performance ≥ 90, LCP < 1.5s with the new images.
- No straight quotes in visible copy; no "warm dark" in light mode; no text bleeding behind the nav.
- Home page shows real work and has a clear primary action and a footer.
- Icons share one stroke language; no OS cursor used as decoration.
- Tested at ~390px, ~768px, and desktop.
