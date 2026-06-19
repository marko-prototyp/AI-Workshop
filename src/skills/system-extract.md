---
name: system-extract
description: Turn a project's design decisions, an existing stylesheet, or a Figma variables export into a portable token brief — a closed set of semantic CSS custom properties plus the rules that govern them — in a form that travels unchanged through Claude Design, Claude Code, and developer handoff. Use when the user wants consistent design across tools, asks to lock the system, define the tokens, stop the drift between Claude Design and Claude Code, or capture the structural layer so every stage reads the same values instead of re-inventing them. This is the system half of the pair with style-extract: style-extract owns expression (named style, cultural anchor, the one distinctive move), system-extract owns structure (the actual values as semantic tokens, in closed sets). Upstream of build-section. If the user wants the look of one reference, use style-extract; if they want the durable grammar that keeps many screens and tools coherent, use this.
---

# System extract — design decisions to a portable token brief

This skill captures the layer that keeps design coherent as it crosses handoffs. Not the taste — the structure underneath it. Colors as named roles, a spacing rhythm, a type scale, the closed sets of radii and elevation, the grid. The values that should never change between a design generated in one tool and the code built from it in another.

It exists because drift doesn't happen inside a tool. It happens at the gap between tools. Claude Design picks a spacing rhythm by eye, you paste the result into Claude Code, and Claude Code re-derives the rhythm from a picture because nothing told it the rhythm was already decided. Re-derivation is drift. The fix is a single token source that crosses every gap unchanged, on both sides, so there is nothing left to re-invent.

This skill produces that source.

## How it pairs with style-extract

These two are a set. They do not overlap if you keep the layers straight.

- **style-extract owns expression.** The named style, the cultural anchor, the dos and don'ts of taste, the one distinctive move, the AI-tell list for *that* aesthetic. It changes per project. It comes from a reference image.
- **system-extract owns structure.** The actual values, named as semantic tokens, in closed sets, in a form that survives a paste. It is stable within a project. It comes from existing tokens, a stylesheet, a Figma export, or decisions made on the spot.

Where they both touch color and type, split by layer. style-extract says *"the accent is a single full-saturation signal, used once per view."* That is a rule of taste. system-extract says *`--accent: #E8472B`, it is the only accent token, there is no tinted variant.* That is the value and the closed set. One is the grammar; the other is the lookup table. Run both and you get a project that is distinctive (style-extract) and internally coherent across every tool (system-extract). `build-section` is what you get when both have been frozen for one specific project and turned into a build contract.

## When this skill triggers

- The user wants consistent output across Claude Design, Claude Code, and developer handoff
- The user is fighting drift between tools and asks to "lock the system" or "define the tokens"
- The user has a Figma variables export, a `tokens.css`, or an existing stylesheet and wants it turned into a portable brief
- The user is starting a project and wants the structural decisions pinned before generating screens
- A workshop participant needs the system layer for their own product

If the user wants the look of a specific reference, that's style-extract. If they want a section built for a specific repo, that's build-section. This is the durable middle layer between them.

## What to read before writing

There are three starting points. Handle whichever applies.

1. **An existing source.** A `tokens.css`, a stylesheet, or a Figma variables export. Read it first. Extract the values that are already decided. Name the gaps. Do not invent values that already exist under a different name.
2. **A reference plus no system.** If a style-extract brief exists, read it. Derive the structural values implied by it (the palette becomes named color tokens, the spacing logic becomes a scale) but keep them in the structural language of tokens, not the expressive language of taste.
3. **Greenfield.** No source at all. Then this skill helps *decide*, not extract. Propose a minimal closed set for each section and ask the user to confirm or adjust. Do not pad it. A small system that holds is better than a large one that drifts.

## The shape of the output

A single markdown brief with the sections below, in order, plus a canonical `:root` block. Each section defines a closed set. Closed is the whole point: an open-ended scale is an invitation to drift.

### 1. What this system is

One or two lines naming the system and its theming intent. This is the structural anchor, and it decides everything downstream.

- Single theme — values can live directly on semantic tokens.
- Light plus dark, or light plus a legibility mode — semantic tokens are mandatory, and each theme overrides the same names.
- Multi-brand — semantic tokens plus a brand-swappable primitive layer.

Name it explicitly. "Single light theme with a separate legibility mode" tells the model the semantic layer is non-negotiable. "It's just one theme" does not.

### 2. The token layers

State the architecture in one paragraph. The two-tier model:

- **Primitives** — raw values named by what they are: `--blue-600: #2563eb`, `--gray-100`. Never referenced by components.
- **Semantic** — named by role: `--accent: var(--blue-600)`, `--surface`, `--text-muted`. The only tokens components are allowed to touch.

Small systems can collapse to one tier, but the *semantic naming is non-negotiable* regardless of size. Semantic names are what survive a theme swap and what stop a hardcoded `#2563eb` from appearing in three shades across the codebase. If a component references a raw value, the system has already failed.

### 3. Color

A table: semantic token, value or primitive reference, role, and theme variants if the system is themed. Cover the surfaces ramp (`--surface`, `--surface-raised`, `--surface-sunk`), the text ramp (`--text`, `--text-muted`, `--text-subtle`), the line/rule tokens, and the accent.

State the rules below the table. How many accents. Whether the accent is ever tinted or only ever full. The total palette size. The single hard rule: components reference these names, never raw hex.

### 4. Typography

Name the typeface or typefaces with the exact weights used, as a closed set. The weight set is where type drifts first — a system that uses 300 and 600 gets a 400 inserted the moment a prompt is vague. List only the weights that exist.

Then the scale, as named tokens that bundle size, line-height, and weight: `--text-sm`, `--text-base`, `--text-lg`, and so on. State the ramp logic (a modular ratio, or hand-set steps). The expressive typographic move — the oversized isolated headline, the optical tracking on labels — belongs in style-extract. Here you give the values it draws from.

### 5. Spacing

The base unit, then the ramp as a closed, named set: `--space-1` through `--space-N`. State the rule plainly: every margin, padding, and gap snaps to the ramp. This is the highest-leverage anti-drift token in the system, because arbitrary `padding: 13px` is the most common thing a model invents when left room.

### 6. Radii, stroke, and elevation

Three small closed sets. Each one is a place models add unrequested decoration.

- **Radii** — the allowed values and the maximum. `--radius-none: 0`, `--radius-sm: 2px`, `--radius-full: 9999px`. If layout surfaces cap at 2px, say so.
- **Stroke** — border weights and the rule for strokes versus shadows. If the system is hairline-and-flat, state that depth comes from stroke and surface, not shadow.
- **Elevation** — either a closed set of named shadows, or the explicit decision *no shadows*. Both are valid. An unstated elevation policy is how soft drop-shadows end up on everything.

### 7. Layout and grid

Columns, gutter, container max-width, and breakpoints, as tokens or stated values. The rule: composition snaps to this grid. This is what keeps a layout generated in Claude Design and the same layout implemented in Claude Code from quietly diverging by 40px.

### 8. The handoff contract

The section that does the actual work. Everything above is values; this is how they cross the gaps unchanged.

**Canonical form: CSS custom properties.** One representation for every stage. Claude Design can emit a `:root` block, Claude Code consumes it natively, developers already use it, and the names round-trip with Figma variables and the W3C Design Tokens format. Pick one form and CSS custom properties is the form, because it is the only one all four stages read without translation.

**The rule.** The `:root` block is pasted *verbatim* into Claude Design and into Claude Code. Neither stage edits a value. Components reference tokens. Figma variables are the upstream source and export to the same names.

Produce the actual block as the centerpiece of the brief:

```css
:root {
  /* color — semantic */
  --surface:        #faf9f7;
  --surface-raised: #ffffff;
  --text:           #1a1a1a;
  --text-muted:     #6b6b6b;
  --rule:           #e4e1dc;
  --accent:         #e8472b;

  /* type */
  --font-sans: "Inter Tight", system-ui, sans-serif;
  --font-serif: "Fraunces", Georgia, serif;
  --text-base: 1rem/1.5 var(--font-sans);

  /* space — 4px base */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-6: 24px; --space-8: 32px;

  /* form */
  --radius-sm: 2px;
  --radius-full: 9999px;
}
```

**The handoff checks.** After Claude Code builds from a pasted design, run these. Each is a drift the contract is meant to catch:

- Any raw hex where a component should reference a token?
- Any spacing value off the ramp?
- A new radius or shadow that isn't in the closed set?
- A font weight outside the declared set?

If yes to any, the fix is surgical: "replace the hardcoded value with the token, change nothing else."

## The closing rule

End the brief with one line that governs every ambiguous case: **if a value isn't a token, it doesn't exist.** That single rule is the grammar of the whole system. When a tool is generating something and reaches for a value, the answer is always a token name or nothing.

## What to leave out

- **No expressive direction.** The named style, the cultural anchor, the one distinctive move — that is style-extract. This brief is structure, not taste.
- **No per-component specifications.** The token brief defines the alphabet, not the words. Button padding, card layouts, and nav behavior are downstream (build-section's job for a given project). If you find yourself spec'ing a component, stop.
- **No implementation beyond the token values.** The `:root` block is the only code. No component CSS, no full stylesheets.
- **No values the project doesn't use.** Closed sets, but only as wide as the work needs. A spacing ramp with twelve steps the project will never touch is noise.

## What makes the output good

A brief is working if:

- Every value lives on a named semantic token, and nothing references a raw value
- Every set is closed, and the brief says so
- The `:root` block can be pasted into Claude Design and Claude Code with no edits and produce aligned output on both sides
- The names map cleanly to Figma variables

A brief is failing if:

- Raw hex appears anywhere a component would touch it
- Scales are open-ended ("use multiples of 4 as needed")
- It duplicates the aesthetic brief instead of complementing it
- It is so exhaustive it specifies every component, which guarantees no one keeps it current

## Output format

A single markdown file. H2 for each section. Tables for the color and type sets. The `:root` block is the centerpiece — the prose explains the rules around it, but the block is the thing that actually travels. Readable end to end in five to ten minutes. The user keeps it and pastes it as the structural anchor into every tool in the chain.
