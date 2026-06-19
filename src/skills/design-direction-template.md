---
name: design-direction-template
description: A fill-in scaffold for building a project-specific design-direction skill from a reference image — the reusable, generic version of the ClassArcade design skill. Use this when starting a new project's design skill, or when a workshop participant wants to turn a reference image into an installable skill that steers Claude Code and Claude Design toward their own aesthetic instead of the stock default. Hand Claude a reference image plus this template and Claude fills every slot with concrete values (tokens, type scale, banned moves, grounding) then repackages it under the project's own name. This is not a design skill itself — it produces one. Use it on requests like making a design skill from a reference, filling the design template, turning a reference into a skill, or scaffolding a new project's design system.
---

# Design-direction skill — TEMPLATE

This is a scaffold. Filled in, it becomes one project's design-direction skill — the kind of skill that loads a closed design system, the moves it bans, and the reference it answers to, so every build starts from that direction instead of the stock default. The ClassArcade design skill is the worked example; this is the empty form behind it.

Two ways to use it: hand-edit every slot yourself, or give Claude a reference image and this file and let Claude fill it. Either way the output is a real skill you package and install.

---

## How to fill this in

Slots look like `{{THIS}}`. Instruction lines start with `> fill —` and get **deleted** once the slot is filled. Nine rules govern every slot; they are why the ClassArcade version worked:

1. **Analyse the reference, don't mood-board.** Extract constraints from the image — exact colours, weights, spacing, the layout grammar. The job is to leave as little unspecified as possible.
2. **The reference image wins over words.** When someone hands the model the reference *and* this skill, the skill's job is to pin the values the image implies, not to describe a vibe.
3. **Write the ontological frame first.** "Instrument, not app" outperforms any colour or font list. The one-line "X, not Y" is the most load-bearing instruction in the whole file.
4. **Concrete closed sets only.** Exact hex, exact px. No ranges as a cop-out, no scoring tables, no "feels premium" filler. A value you can't pin, flag as an open question instead of inventing.
5. **Negative constraints prune defaults.** The banned moves do more work than the principles. Derive them from what the reference conspicuously *avoids* and from the domain's default trap.
6. **Retirement-with-replacement, never bare prohibition.** "Cream is retired; the ground is warm-white paper" beats "no cream." Always name the thing that takes its place.
7. **Tokens travel verbatim.** Never let a downstream model regenerate them — they degrade toward statistically common defaults. The `:root` block is copied unchanged through every handoff.
8. **Name the default trap.** Say out loud the stock look this project refuses (the friendly-gamified dashboard, the templated SaaS hero, etc.). Naming it keeps the model from drifting back to it.
9. **Ground in named real references, and keep the AI-tell list specific to this aesthetic.** Generic tells ("avoid clichés") do nothing; tells tied to *this* look prune the right defaults.

When Claude fills this from a reference: read the image, extract the system, fill every `{{slot}}`, delete every `> fill —` line, set the frontmatter `name` and `description` for the project, then package and hand back the `.skill`.

**Recommended sequence (with the starter skills).** Sharpen the one-line frame first — a vague frame can't be rescued downstream. Then run `style-extract` on the reference for the expression (named style, banned moves, AI-tells), then `system-extract` on the same reference for the structure (the closed `:root` and the type scale). Fill this template from both, frame word-for-word and tokens verbatim, and assemble last so nothing gets re-derived. Expression before structure; assembly last.

---
<!-- Everything below is the scaffold of the produced skill. Replace the frontmatter at the top of THIS file too when customizing: name → {{project}}-design, description → the project's triggers. -->

# {{PROJECT}} — build it the right way

> fill — one paragraph: why this skill exists. Name the default trap for this product's domain (rule 8) and state that the first/naive build falls into it. End on "{{PROJECT}} is defined as much by what it refuses as by what it is."

> **Source of truth.** This skill reflects the direction in {{REFERENCE}}. Values below are copied from the analysed reference and the approved build — do not re-derive them.

## The one-line frame

> fill — the ontological "X, not Y" (rule 3). E.g. "an arcade cabinet, not a discipline dashboard." Then one sentence on the principle that follows from it.

{{IT IS X, NOT Y}}. {{the principle that follows}}.

## The conditions it must survive

> fill — the real-world contexts the UI is used in: device, distance, lighting, speed, audience. These generate the hardest constraints (ClassArcade's 14px floor came from "projected, read at 4–8m"). If there's only one context, say so.

1. **{{context A}}** — {{what it demands of the design}}.
2. **{{context B}}** — {{what it demands}}.

## The look in one breath

> fill — name the style and its cultural anchor, then the ONE owned expressive move (rule 9). End on what carries the personality — usually type and restraint, not colour volume.

{{named style + cultural anchor}}. {{the one owned move}}. The personality lives in {{where}}.

## When this skill triggers

> fill — list this project's actual component surfaces, so the skill fires even when the project isn't named.

- "Build the [{{surface 1}} / {{surface 2}} / {{surface 3}}] for {{PROJECT}}"
- The user pastes a {{PROJECT}} Figma frame or screen and asks for an implementation
- "Is [move] okay for {{PROJECT}}?" → check it against Banned Moves before answering

## Tokens — paste this `:root` verbatim

> fill — the closed set from the reference (rule 4 + rule 7). Every colour gets a fixed role in a comment. Keep the set small. If a value isn't determinable from the reference, leave a clearly-marked `/* TODO: confirm */` rather than inventing one.

```css
:root{
  /* Ground & surfaces */
  --bg:{{hex}};            /* page ground — describe the exact character, not "white" */
  --surface:{{hex}};       /* cards/panels */
  --line:{{hex}};          /* hairlines, borders ({{width}}) */
  --ink:{{hex}};           /* primary text/marks */
  --muted:{{hex}};         /* secondary text, labels */

  /* Accent system — name the role of each, and which is THE one loud colour */
  --accent:{{hex}};        /* the single loud accent — where it's allowed */
  --accent-2:{{hex}};      /* secondary, scoped use only */
  /* add only what the reference actually uses */

  /* Feedback */
  --positive:{{hex}};
  --negative:{{hex}};      /* and the rule for it — e.g. never red on the primary view */
  --error:{{hex}};         /* system errors only */

  /* Type */
  --display:{{'Family', fallback}};   /* what it carries: headlines, names, numbers */
  --text:{{'Family', fallback}};      /* what it carries: chrome, body, meta */

  --radius:{{px}};
}
```

> fill — note the font source (Google Fonts link or self-host) and any rank/state colour mapping.

### Type scale (filled from the reference)

> fill — a row per real element with family, weight/style, and exact size. Include the minimum-size floor if a context demands one.

| Element | Family | Weight / style | Size |
|---|---|---|---|
| {{element}} | {{display/text}} | {{weight}} | {{px}} |

### Imagery, icons & texture

> fill — how avatars/illustrations/icons/texture are handled. Be specific and exclusive (ClassArcade: "monochrome initials in outline circles — no emoji, no colour rings"). Include the empty/placeholder state.

## The house module

> fill — the layout grammar as an ASCII sketch plus the rule for each region. This is the frame every screen reuses.

```
{{ascii layout: regions, widths, the dividing logic}}
```

- **{{region}}** — {{the rule}}.

## Banned moves

> fill — the heart of the skill. Group under Shapes / Colour / Type / Interaction / Copy. Each ban uses retirement-with-replacement (rule 6). Derive them from the reference's negative space and the domain default trap.

### The thing we moved away from
> fill — one short, deliberately un-lovely sentence naming the stock look this project refuses (rule 5 + 8). Don't describe it richly — detail anchors the model to it.

### Shapes & structure
1. **{{ban}}.** {{the replacement}}.

### Colour
2. **{{ban}}.** {{the replacement}}.

### Type
3. **The voice is {{display}} + {{text}}.** No {{the default typefaces this aesthetic must avoid}}.

### Interaction
4. **{{ban}}.** {{the replacement}}.

### Copy
5. **{{voice rule}}.** Banned words: {{list}}.

> fill — if the project renames generic terms, add the substitution table (ClassArcade: points→XP, students→players).

## Reference grounding

> fill — the reference image(s) as the anchor, described by their operative qualities. Then the still-true transferable lessons. Then the retired direction, if this replaces one. Keep the AI-tell list specific to this look.

**The anchor** is {{REFERENCE}}: {{its operative qualities}}. The owned move is {{the one move}}. When a build feels off, it has usually {{the typical drift}}.

**Still-true lessons:** {{2–4 transferable principles}}.

**Retired:** {{the prior direction, if any}}.

## Build order

> fill — one piece per turn, in dependency order: ground/shell → tokens → the core repeated unit → the core interaction → the hero/ambient surface → secondary surfaces.

1. {{step}}

## The standard prompt template

> fill — the prompt to hand a model for any screen in this project. Inject the `:root`, the fonts, the one-accent rule, the layout grammar, and the relevant bans.

```
[Attach the {{PROJECT}} Figma frame OR paste the reference]

Build this as a single {{stack}} screen for {{PROJECT}}, {{one-line product context}}.
Match the comp closely.

Rules:
1. Use these tokens as CSS variables: [paste the :root block]
2. Fonts: {{display}} ({{what it carries}}) + {{text}} ({{what it carries}}). No {{banned typefaces}}.
3. {{the conditions it must survive}}.
4. Direction: {{the look in one breath}}.
5. Banned moves on this screen: [list the relevant ones].
6. Copy: {{voice}}.

If something in the comp looks unusual, ask — don't smooth it out.
Don't add features I didn't design. Don't add "improvements."
```

## Before code — the four-question check

1. **Which context does this serve?** It answers to that context's hardest constraint.
2. **What tokens does it consume?** List them. If it needs a value not in `:root`, propose a token; don't hardcode.
3. **What's the feedback/motion contract?** Static, or a defined animation? State it.
4. **Does it trip a banned move?** Name the ones in range and confirm it clears them.

## After build — the anti-stock review

> fill — turn each banned move into a "did it drift back?" check. These catch regression toward the default trap.

- Did {{the ground / type / accent / layout}} drift back toward {{the default}}?
- {{one check per banned move}}

Fix prompt: `Looking at what you built, [list the specific drifts]. Patch only those. Don't restructure.`

## Known unknowns

> fill — every value you couldn't pin from the reference, and every judgment call you made that the project owner should confirm. Honesty here is what keeps the skill from canonising a guess.

- {{open question}}

## When NOT to use this skill

> fill — neighbouring skills/projects this should defer to, so it doesn't fire on the wrong work.

- {{other project/site}} → use {{other skill}}.

## One last thing

> fill — the push-back rule. If asked for something that drags the design back toward the default trap, push back once with a concrete on-direction alternative. State that the refusals are the design.
