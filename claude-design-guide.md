# Claude Design — build guide for the AI for Designers site

The brief you paste into **Claude Design** to generate screens, then carry into **Claude Code** to build them — without the design drifting between the two tools.

It has four layers, in the order you use them:

1. **The locked system** — the exact tokens. Paste this `:root` block *verbatim* into both Claude Design and Claude Code. Neither tool edits a value.
2. **The expression** — the named style, the one distinctive move, and the banned moves. This is what keeps output from sliding into generic-tasteful-AI.
3. **What to design** — each screen/module from the fix plan as a ready-to-paste Claude Design prompt.
4. **The handoff** — how to bring Claude Design output into the repo and catch drift.

**The rule that governs everything below: if a value isn't a token, it doesn't exist.** When either tool reaches for a color, a space, a radius — the answer is a token name or nothing.

---

## Layer 1 — The locked system (paste verbatim into both tools)

This is the single source of truth. Claude Design emits screens that use these names; Claude Code consumes the same block. Same names on both sides = no re-derivation = no drift.

```css
:root {
  /* ---- COLOR · default (warm dark) ---- */
  --bg:            #1a1714;   /* page */
  --bg-2:          #221e1a;   /* card / raised surface */
  --bg-3:          #2a2520;   /* mid elevation, kbd, chips */
  --rule:          #3a342e;   /* hairlines, dividers */
  --border-strong: #4a433c;   /* emphasized borders */
  --ink:           #e8e2d8;   /* body text */
  --ink-bright:    #f4ede0;   /* headings, high emphasis */
  --muted:         #8a807a;   /* secondary / labels */
  --accent:        #d97757;   /* the ONE accent — large display + affordances */
  --accent-soft:   #e89a7d;   /* hover / active */
  --accent-ui:     var(--accent);          /* small accent TEXT (see note) */
  --accent-subtle: color-mix(in srgb, var(--accent) 15%, var(--bg));

  /* ---- TYPE (closed weight sets — do not add weights) ---- */
  --serif: 'Fraunces', ui-serif, Georgia, serif;        /* weight 300 only */
  --sans:  'Inter Tight', ui-sans-serif, system-ui, sans-serif; /* 400 / 500 / 600 */
  --mono:  'JetBrains Mono', ui-monospace, monospace;   /* 400 / 500 */

  /* fluid type scale (size · line-height) */
  --t-display: clamp(48px, 9vw, 124px);  /* hero */
  --t-h2:      clamp(40px, 6vw, 76px);   /* section titles */
  --t-h3:      clamp(22px, 3vw, 32px);   /* card / row titles */
  --t-lead:    clamp(18px, 1.6vw, 22px); /* lead paragraph */
  --t-body:      17px;                   /* body */
  --t-secondary: 15px;                   /* descriptions, captions, meta — pair with --muted */
  --t-label:     12px;                   /* eyebrows/labels — Inter 500 uppercase, NOT mono */
  --t-micro:     11px;                   /* mono: code + session numbers ONLY */

  /* ---- SPACING (4px base — every margin/padding/gap snaps to this) ---- */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --space-24: 96px; --space-32: 128px; --space-40: 160px; /* section rhythm: 120–160 */

  /* ---- FORM (closed sets) ---- */
  --radius-flat: 0;       /* layout surfaces */
  --radius-sm:   2px;     /* max on any layout surface */
  --radius-pill: 999px;   /* ONLY the TOC pill — never buttons */
  --stroke-hair: 1px;     /* rules, dividers, card borders */
  --stroke-icon: 1.5px;   /* all icons */
  /* elevation: NONE. depth comes from surface + stroke, never shadow. */
  --hairline: var(--stroke-hair) solid var(--rule);

  /* ---- LAYOUT ---- */
  --max:    1280px;
  --gutter: clamp(20px, 4vw, 48px);
}

/* ---- COLOR · light theme ("clarity") — overrides the same names ---- */
[data-theme="clarity"] {
  --bg:            #F6F5F1;
  --bg-2:          #FFFFFF;
  --bg-3:          #EDECEA;
  --rule:          #E0DFD9;   /* consider #D8D6CE — current is near-invisible */
  --border-strong: #C4C2BB;
  --ink:           #1A1A1A;
  --ink-bright:    #111111;
  --muted:         #5C5C5C;
  --accent:        #C8421C;   /* ≈4.5:1 on bg — LARGE display only */
  --accent-soft:   #A8341A;
  --accent-ui:     #A8341A;   /* small accent text → ≈6:1, safe for 11–12px */
  --accent-subtle: #FCE8E0;
}
```

**Closed sets — state these to Claude Design so it can't widen them:**

| Set | Allowed values | Rule |
|---|---|---|
| Accents | one (`--accent`) | one full-saturation signal; used sparingly, never tinted into new variants |
| Serif weight | 300 only | adding 400/600 serif = drift |
| Sans weight | 400 / 500 / 600 | nothing heavier |
| Mono weight | 400 / 500 | labels only, never body |
| Radii | 0 / 2px / 999px | 999px is the TOC pill *only*; buttons are 0–2px |
| Elevation | none | no shadows, ever — depth is surface + hairline |
| Spacing | the ramp above | no arbitrary `13px` |

**Note on `--accent-ui`:** this token is new (add it to `tokens.css`). The light accent `#C8421C` is ~4.5:1 on the off-white bg — fine for the big italic display words, marginal for 11–12px labels. Small accent text uses `--accent-ui` (`#A8341A`, ~6:1). Large display words use `--accent`.

---

## Layer 1.5 — Typographic hierarchy & labeling (the part that's currently missing)

The redesign doesn't *feel* different because almost everything sits at one level — similar size, one weight, mono labels and resetting numbers all competing. Fixing apostrophes and opacity can't change that. **This is the highest-leverage pass.** Build contrast in this order, and say so to Claude Design: **size first, then weight, then color. Never color alone.**

### The tier ladder (each step must be *obviously* different from the one above)

| Tier | Use | Font · size · weight · color |
|---|---|---|
| 1 Display | hero only | Fraunces 300 · `--t-display` · `--ink-bright` |
| 2 Section title | one per section | Fraunces 300 · clamp(34–56px) · `--ink-bright` |
| 3 Item title | card / row / sub-section | Fraunces 300 · clamp(22–30px) · `--ink-bright` |
| 4 Lead | one intro line per section | Inter 400 · 20–22px · `--ink` |
| 5 Body | reading text | Inter 400 · 16–17px / 1.6 · `--ink` |
| 6 Secondary | descriptions, captions, meta | Inter 400 · 14–15px · `--muted` |
| 7 Label / eyebrow | section labels | Inter **500** · 12px · tracking .08em · UPPERCASE · `--muted` |

Rules:

- **Adjacent tiers differ by size first.** If two things are the same size, the layout is flat — change one. This is the fix for the three-up cards and the session rows.
- **Body vs secondary is the contrast that's absent today.** Make descriptions visibly smaller *and* `--muted`, so the eye separates "what I read" (`--ink`) from "what supports it" (`--muted`).
- **Color is the last lever, three steps only:** `--ink-bright` (titles) → `--ink` (body) → `--muted` (secondary + labels). Accent is **not** a hierarchy level — it's a single spotlight per view.

### Mono has one job

Today mono is on eyebrows, indices, side-notes, CTAs — it reads as techy texture, not meaning. **Reserve `--mono` for exactly two things: (a) code / prompt blocks, (b) the session index numbers.** Every other label becomes tier-7 Inter 500 uppercase. This removes most of the "generic AI" noise on its own.

### Numbering: one series, where sequence actually matters

The numbers reset every section (`/01–03` intro → `W01–12` sessions → `A–E` projects → `01–05` techniques). Four counters competing is why it's impossible to follow. **Rule: numbers appear only on the 12 sessions** — the one sequence a user tracks. Drop decorative numbering from the intro trio, the principle techniques, and the project list; they don't navigate anywhere. If a group needs order, use position, not a competing counter.

### Chrome (nav + rules)

- **Nav:** solid `--bg` background (drop the translucency) with a **strong bottom stroke** — `--border-strong`, 1px (or 1.5px). The frosted look is what reads as buggy when text passes under it; solid + a confident rule is cleaner and on-brand. (If you want a hint of glass, 96% is the floor — but solid is the recommendation.)
- **Rules elsewhere:** once hierarchy carries the structure, delete *more* hairlines, not fewer. Keep section dividers and session-row separators; drop the decorative ones.

---

## Layer 2 — The expression (what makes it *this* site)

### Named style
**Editorial restraint.** A warm, near-monochrome page (dark by default, light "clarity" alt), organized by hairlines and an **asymmetric** grid, labelled in mono, with **one** warm accent used like a highlighter — rarely. Closer to a print magazine or a type-foundry specimen than to a SaaS landing page. Cultural anchors: Emigre, Koto-style type systems, editorial web.

### The one distinctive move
A single **italic Fraunces** word inside an otherwise roman heading (`The anti-stock *principle.*`). **But ration it:** at most once per *view*, not on every heading. The audit found this repeated on all ~10 headings until it became a tic. Vary the device — sometimes no italic, sometimes the emphasis lives in size or placement instead.

### Banned moves (enforce on every screen)
From the project's build contract, plus what the audit caught:

- No rounded corners > 2px on layout surfaces. **No SaaS pill buttons** — the CTA is a square/2px editorial button, not a rounded pill.
- No drop shadows. No gradients (the single bottom-fade on long prompt cards is the only exception).
- No centered/symmetric hero. Compose asymmetric — text left, evidence right, generous negative space.
- No three-column "feature grid with icons." No animated gradient blobs. No "as featured in" rows.
- No soft purples / generic SaaS palette. Stay in the warm token range.
- **No placeholder/empty graphics.** No "FIG.01 + empty circle," no fake mini-mockups. If a panel shows a UI, it shows **real UI** (a real screenshot or a faithfully drawn frame).
- **No OS-cursor / generic UI-chrome icons** used as decoration. Icons are one drawn family (see module 4.5).

### The AI-tell list for *this* aesthetic
The trap here isn't loud, ugly AI output — it's *tasteful* AI output. These signals read as "generic-but-restrained AI," which is the exact thing the page argues against. Treat each as a smell, not a default to lean on:

- The Fraunces + Inter + JetBrains-Mono + warm-dark + single-coral combo *itself* — it's the 2024–26 default "editorial AI" stack. Don't present it as proof of taste.
- Mono labels on everything (eyebrows, indices, side-notes, button text). Use mono sparingly; let some labels be plain.
- The repeated italic-word heading formula (see above).
- Hairline grid drawn around everything. Lines should be earned; spacing already separates.
- Hero "stat strips" of vague numbers. Stats must be concrete (duration / format / outcome / audience).
- Big-italic-word + thin-rule + mono-eyebrow as a reflex composition for every section.

If a screen could belong to any well-funded AI startup, it has failed the brief — even if it's pretty.

---

## Layer 3 — The standard prompt template (use for every module)

Paste this into Claude Design once per section. Don't deviate; fill the brackets.

```
[Attach the reference screenshot or sketch]

Design / refine this as a single section for an editorial, anti-stock workshop site.
Match the comp closely. One section only — do not design the rest of the page.

DESIGN TOKENS (use these as CSS variables, never raw hex):
[paste the :root block from Layer 1]

TYPE: Fraunces (serif, weight 300), Inter Tight (sans 400/500/600), JetBrains Mono (mono 400/500).

VISUAL DIRECTION: "Editorial restraint" — warm, quiet, hairlines, ASYMMETRIC grid,
one accent used sparingly, generous negative space. Print-magazine, not SaaS.

BANNED MOVES:
- radius > 2px on layout surfaces; no pill buttons
- no shadows; no gradients (except a single bottom-fade on long prompt cards)
- no centered/symmetric hero; no 3-column icon feature grids; no animated blobs
- no placeholder/empty graphics — show REAL UI
- no OS-cursor/generic icons; icons are one drawn family, 1.5px stroke, 24×24 grid
- don't lean on the Fraunces+Inter+warm-dark+coral look as if it proves taste

THE SIGNATURE MOVE: at most one italic Fraunces word per view (not every heading).

If something in the comp seems unusual, keep it — don't normalize. Ask me before adding
anything I didn't design. No "improvements," no extra sections.

Output: semantic HTML + the CSS that references the tokens. Note where it slots on the page.
```

Then run the **four-question check** before accepting output: (1) where does this slot on the page; (2) what tier label does it use — `§ NN` section / `/ NN` card / mono `NN` sub-item / letter / none (don't invent a fourth); (3) which tokens does it consume (propose a token for any value not already in the set, never hardcode); (4) what's its motion contract (static / hover / on-scroll).

---

## Layer 4 — What to design (modules, in priority order)

Each is a Claude Design task. Design **one per turn.** Brief + acceptance below; wrap each in the template above.

### 4.1 — Hero with a primary CTA
**Brief:** keep the existing asymmetric hero (eyebrow, big roman+one-italic headline, lead, concrete stat row). Add a CTA block under the sub-line: one **square/2px** primary button in `--accent` with `--bg` label, plus one secondary text link ("View the 12 sessions"). *The primary action's wording depends on the workshop's goal — confirm before finalizing.*
**Acceptance:** clear next step; CTA is not a pill; passes AA in both themes; composition stays left-weighted, not centered.

### 4.2 — Stock → Designer-led (the page's core evidence)
**Brief:** this is the most important screen. The A/B toggle already exists — design the **content inside it**, as a real before/after. Left "Generic AI output" (a faithfully drawn stock screen: rounded cards, pastel, vague copy). Right "Designer-directed output" (a **real** `v2` screenshot from `src/assets/weeks/03/`). Kill the empty FIG.01 circle.
**Acceptance:** toggling changes a real visual, not labels; no placeholder; the contrast between the two sides is legible at a glance.

### 4.3 — Real participant work strip
**Brief:** in the Projects area, a strip of 3 real screenshots (Wattlog, ClassArcade, Naučimo Hrvatski — assets exist in `src/assets/weeks/03/`), each a `<figure>` with project name + one-line outcome. Asymmetric, editorial captions in mono.
**Acceptance:** ≥3 real artifacts on the page; figures captioned; no decorative frame chrome around them.

### 4.4 — Footer
**Brief:** the footer data already exists in `content/shared/nav.json` (`footerSections`, `footerFacilitator`) and `site.json` (`tagline`, `footerVersion`, `footerCredit`). Design a one/two-row editorial footer: closing CTA line, contact, the link groups, format ("12 weeks · 1h/week"), credit. Hairline top rule; no big SaaS mega-footer.
**Acceptance:** closes the page; repeats the primary CTA; uses the existing content fields.

### 4.5 — "Where next" icon family
**Brief:** redraw the three icons as one family — 24×24 (or keep 48×48 for these three) grid, 1.5px stroke, round caps/joins, `currentColor`. **Replace the middle one** (currently a literal OS mouse cursor) with a Figma→Claude loop mark (two frames + a loop arrow). Pick one metaphor world (the quill is editorial — match the others to it, or drop it).
**Acceptance:** no cursor/quill/terminal mismatch; siblings; recolor in both themes.

### 4.6 — Session rows with plain-language subtitles
**Brief:** each session row keeps its mono index + Fraunces title, and gains a one-line plain-language subtitle for newcomers (pull from `content/weeks/NN.md`, don't invent). Keep the accordion `+`.
**Acceptance:** a beginner understands each session without expanding it.

### 4.7 — Reworked hero stats
**Brief:** replace vague numbers ("5 capability areas", "1 shipped project") with concrete facts: duration / format / outcome / audience. Same mono+rule treatment.
**Acceptance:** every stat answers a practical question.

### 4.8 — Distinctiveness pass (Phase 3, optional)
**Brief:** vary the heading formula across the page; consider a more distinctive display face than Fraunces (swap `--serif` only) or commit to moving Fraunces' optical axes deliberately; add a "prompt → direction → built result" process sequence using real material.
**Acceptance:** the page *demonstrates* the anti-stock principle instead of asserting it.

---

### 4.9 — Session detail (HIGH PRIORITY — currently a wall of text)
**Problem:** the expanded session stacks long, variable-length blocks (capability, run-in, outputs, a six-point "watch out for", exercise) plus prompt code-blocks in one column, and it slid under the sticky bar. A narrow sticky rail can't hold this — the content is long-form, not meta.
**Brief:** split the detail into **two tabs by intent — "Instructions" and "Prompts · N"** — because you read instructions once and return to prompts to copy; you rarely need both at once.
- Keep a one-line **at-a-glance** above the tabs (capability one-liner + "Run it in"), always visible, so context shows without a click.
- **Instructions tab (default):** Capability focus, Run it in, Outputs, Watch out for, Hands-on exercise — each a tier-7 label + content, separated by space and a thin rule, lists with real breathing room. Tabs fix the scroll; the tier ladder fixes the scan — not a shorter wall.
- **Prompts tab:** each prompt a bounded card — tier-7 label + COPY, mono body block, clear gaps. Label the tab with the count ("Prompts · 4").
- **A11y:** real `role="tablist"/"tab"/"tabpanel"`, arrow-key nav, managed focus. It's nested in the accordion — reset to the Instructions tab when a row reopens.
- **Fix the overlap:** expandable target gets `scroll-margin-top` = nav + sticky-bar height; the sticky row-title bar gets solid `--bg` and a higher z-index.
**Acceptance:** instructions and prompts are one click apart (default Instructions); each block is scannable, not a wall; nothing reads through the header; keyboard-operable.

---

## Layer 5 — Handoff to Claude Code

The whole point of the locked block is that this step is mechanical.

1. **Paste the same `:root` block** (Layer 1) into Claude Code before it builds. It must read the identical token names Claude Design used.
2. **Map output to the repo:**
   - Section markup → a partial in `src/partials/` (e.g. `footer.html`), wired with `{{include:partials/…}}`.
   - CSS → appended to `src/styles/components.css` (don't create new stylesheets).
   - Text → `content/…` Markdown / the `content/shared/*.json` fields.
   - Images → `src/assets/…` (optimize first: ~1200px wide, WebP, <150 KB).
   - **Never edit `dist/`** — it's generated by `build.js`.
3. **Run the handoff checks** (catch drift the moment it appears):
   - Any **raw hex** where a token should be? → replace with the token.
   - Any **spacing** off the ramp? → snap to `--space-*`.
   - A **radius or shadow** not in the closed set? → remove.
   - A **font weight** outside the declared set? → revert.
   - Did the composition drift **centered/symmetric**, or did **placeholder UI** reappear? → fix.
   - The fix prompt is always surgical: *"replace the hardcoded value with the token, change nothing else."*
4. **Verify** in both themes and at ~390 / ~768 / desktop. Accessibility must stay 100.

---

## The closing rule

**If a value isn't a token, it doesn't exist.** Paste the `:root` block into both tools, design one section at a time, enforce the banned moves, and show real work instead of describing it. That keeps the design distinctive in Claude Design and identical by the time it's code in Claude Code.
