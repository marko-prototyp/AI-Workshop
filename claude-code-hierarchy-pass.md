# Claude Code — Hierarchy & layout pass

Implementation brief for the next pass on the AI for Designers site. The earlier pass (apostrophes, header opacity, tokens) was craft-level and barely visible. **This pass is the one that should make the page look meaningfully different.** The spec it implements is `claude-design-guide.md` → Layer 1.5; this file is the build order with real file targets.

The goal in one line: **give the page real typographic hierarchy, kill the mono/numbering noise, make the session detail scannable, and make the nav solid.** Contrast is built in this order everywhere — **size → weight → color. Never color alone.**

## Ground rules

- Stack: vanilla HTML/CSS/JS + Markdown + Node `build.js`. No framework.
- Edit `src/` and `build.js` only. **Never edit `dist/`** — it's generated. The session rows, session detail, the pitch trio, and the project list are **generated in `build.js`**, not in static partials — change the markup there.
- Tokens: `src/styles/tokens.css`. All component CSS: `src/styles/components.css`.
- Run `npm run dev` (→ localhost:5173) and verify **every change in both themes** (toggle, top-right) **and at ~390 / ~768 / desktop**.
- Work the tasks in order; one commit per task. Don't bundle.
- Don't restructure anything not listed here. No "improvements," no new sections.

---

## Task 1 — Establish the type hierarchy (foundation; do first)

**Why:** body text, descriptions, and labels currently sit at nearly the same size/weight/color, so everything reads as one level.

**1a. Tokens** — in `src/styles/tokens.css`, confirm/add the scale tokens (some are new):
```css
--t-display: clamp(48px, 9vw, 124px);   /* hero only */
--t-h2:      clamp(34px, 5vw, 56px);     /* section titles */
--t-h3:      clamp(22px, 3vw, 30px);     /* card / row / sub-section titles */
--t-lead:    clamp(20px, 1.8vw, 22px);   /* one intro line per section */
--t-body:    17px;                       /* reading text */
--t-secondary: 15px;                     /* descriptions, captions, meta */
--t-label:   12px;                       /* eyebrows / labels */
```

**1b. Apply the ladder** in `components.css`. The mapping (enforce the *color* roles exactly):

| Role | Size | Weight | Color |
|---|---|---|---|
| Section title (`.section-title`) | `--t-h2` | serif 300 | `--ink-bright` |
| Item/row title (`.week-title`, `.project-name`, card titles, `.week-section h4` headings) | `--t-h3` | serif 300 | `--ink-bright` |
| Lead (`.lead`, `.section-aside` if it's an intro) | `--t-lead` | sans 400 | `--ink` |
| Body (`p`, `.prompt-preamble`) | `--t-body` | sans 400 / lh 1.6 | `--ink` |
| Secondary (descriptions, captions, `.week-subtitle`, meta values) | `--t-secondary` | sans 400 | **`--muted`** |
| Label / eyebrow (`.eyebrow`, section labels, `.prompt-label`) | `--t-label` | sans **500** · .08em · uppercase | `--muted` |

**The key fix:** make secondary/descriptive text both **smaller (`--t-secondary`) and `--muted`**, so it separates from body (`--ink`). Adjacent tiers must differ by size first.

**Acceptance:** scanning any section, title → body → description → label are each obviously different. No two adjacent tiers share size+weight+color. Verified both themes.

---

## Task 2 — Mono discipline (one job only)

**Why:** mono is sprinkled on eyebrows, indices, side-notes, CTAs — it reads as techy texture.

**Do:** in `components.css`, change every small label currently using `--mono` to **Inter 500, 12px, .08em, uppercase** (tier-7). This includes section eyebrows, `.section-aside` labels, `.week-section h4`, `.prompt-label`, the "for: …" project labels, the nav `Search` chrome if monospaced.

**Keep `--mono` on exactly two things:**
- `.prompt-body` / code blocks
- the session index number (`.week-num`, e.g. "W 04")

**Acceptance:** the only monospace left on the page is inside prompt/code blocks and the session numbers.

---

## Task 3 — One numbering series (stop the resets)

**Why:** counters reset every section — pitch trio `/01–03`, principle techniques `01–05`, project letters `A–E`, sessions `W01–12`, plus the section outline `01/02/03`. Four+ competing series.

**Do:**
- **Remove the decorative inner counters:** the pitch-panel numbers (`/ 01` etc. — in the `build.js` pitch/`panelshtml` generation + their CSS), the principle technique numbers (`.tech-num`), and the project letters (`A–E` in the projects generation). Delete the number element and its CSS; let position carry order.
- **Keep:** the 12-session numbers (`.week-num`) and the top-level section outline (`.section-num`, `01/02/03`) — that outline doesn't reset, so it's fine as a single spine. (If you'd rather go minimal, dropping `.section-num` too is acceptable — but never leave two *resetting* series.)

**Acceptance:** the only numbers that repeat in a sequence are the 12 sessions; no inner counter restarts from section to section. Also fixes the orphaned `/01 /02 /03` row seen in the trio.

---

## Task 4 — Nav: solid + strong stroke

**Why:** the translucent header is what reads as buggy when text passes under it.

**Do:** in `components.css`:
- `.nav` (≈ line 2): replace the `rgba(...)`/`color-mix` background with solid `background: var(--bg);` and set the bottom rule to the strong border: `border-bottom: 1px solid var(--border-strong);` (1.5px is fine if it reads better). You can drop the `backdrop-filter` once it's solid.
- `[data-theme="clarity"] .nav` (≈ line 1575): set `background: var(--bg);` (remove the `0.88` translucency). Same strong bottom border via the token (it themes automatically).

**Acceptance:** nothing reads through the bar in either theme; the bottom edge is a confident line, not a faint hairline.

---

## Task 5 — Session detail: tabbed Instructions / Prompts (high impact)

**Why:** the expanded session is a wall — long, variable-length blocks (capability, run-in, outputs, a 6-point "watch out for", exercise) plus prompt code-blocks in one column, and it slides under the sticky bar. A two-column rail can't hold long-form content. Split by **intent** instead: you read the instructions once, then return to the prompts to copy. Generated in `build.js` (≈ lines 179–204 for `.week-detail`/`.week-section`; ≈ 157–172 for prompts).

The session detail **stays an inline accordion expansion** (decided — do not promote it to its own route in this pass).

**5a. Split into two tabs.** Restructure the `.week-detail` markup in `build.js`:
- A tab bar with two tabs: **Instructions** (default) and **Prompts · N** (N = prompt count).
- **Instructions panel:** Capability focus, Run it in, Outputs, Watch out for, Hands-on exercise.
- **Prompts panel:** the existing `.prompt-item` cards.
- Keep a one-line **at-a-glance** above the tabs (capability first-clause + "Run it in"), always visible.
- Proper ARIA: `role="tablist"` on the bar, `role="tab"` + `aria-selected` + `aria-controls` per tab, `role="tabpanel"` + `aria-labelledby` per panel; arrow-key navigation; move focus to the panel on activate. Add a small `src/scripts/tabs.js` (or extend the accordion script). **Reset to Instructions when a row reopens.**

**5b. Hierarchy inside each panel** (`components.css`) — tabs fix scroll, the tier ladder fixes scan:
- Block labels (Capability, Run it in, Outputs, Watch out for) → tier-7 (Inter 500 uppercase, `--muted`); "Hands-on exercise" → tier-3 heading.
- Lists: real spacing, not tight mono-dashed `–` runts. Thin rule + `--space-8` between blocks.
- Prompts: each `.prompt-box` a bounded card — tier-7 `.prompt-label` + COPY on top, `--mono` body block below, `--space-8`+ between cards.

**5c. Fix the sticky overlap:**
- Expandable target: `scroll-margin-top: calc(<nav-height> + <sticky-subbar-height>);`.
- The sticky row-title bar (`.week-summary` when pinned, currently `top: 51px`) gets solid `background: var(--bg);` and a `z-index` above the detail so nothing reads through it.

**Acceptance:** Instructions and Prompts are one click apart (default Instructions); each block scannable, not a wall; tab bar keyboard-operable with correct ARIA; nothing reads through the header; tested both themes + ~390/768/desktop.

---

## Task 6 — The three-up trio (pitch) polish

**Why:** "What this is / Who it's for / What you walk away with" — the third title wraps and the spacing looks uneven; numbering removed in Task 3.

**Do:** in the pitch generation (`build.js`) + `.pitch`/`.pitch-grid` CSS:
- Align the three columns to a shared top baseline; equalize the title→body gap so a two-line title (card 3) doesn't shove its body down relative to the others (e.g. consistent `margin`/min-height on the title, or align items to the grid row start).
- Apply the Task 1 ladder: title tier-3 `--ink-bright`, body tier-5 `--ink`.

**Acceptance:** the three cards read as a clean row; the two-line title doesn't break alignment; both themes.

---

## Verify before handoff

- Both themes pass an axe/Lighthouse contrast check; **Accessibility = 100**.
- Toggle through and screenshot hero, the trio, the sessions list, **one expanded session**, and the footer — confirm visible hierarchy and no overlap.
- Tested at ~390 / ~768 / desktop.
- `grep` confirms: no `--mono` outside prompt bodies + `.week-num`; no resetting inner counters remain.

## Suggested commits

1. `feat: type hierarchy ladder (tokens + components)` (Task 1)
2. `chore: restrict mono to code + session numbers` (Task 2)
3. `chore: single numbering series` (Task 3)
4. `fix: solid nav + strong stroke` (Task 4)
5. `feat: tabbed session detail (Instructions / Prompts) + overlap fix` (Task 5)
6. `fix: pitch trio alignment + hierarchy` (Task 6)

## Out of scope (separate passes)

- Real participant screenshots / the stock-vs-designer-led before-after (fix-plan 1.1/1.2) — blocked on optimized assets.
- Phase 3 distinctiveness (display-face swap, vary the heading formula) — its own spike.
