# AI for Designers — Week 03
## Set the visual direction

**Session:** Week 3 of 12
**Date:** 20 May 2026
**Participants present:** 4 (Ivo, Ivan, Marin, Paula)

---

## The session, in one line

All three projects that ran the visual direction process got briefs. None of the designers were satisfied with the first-pass output. Two of them kept going and found something more interesting than a resolved brief.

---

## What each participant produced

### Ivo — Wattlog (visual direction + brief rewrite)

Ivo arrived with the most thorough brief in the cohort. Every component specified. ASCII layout diagrams. Exact values for color, weight, spacing, and radius. It produced a dashboard he didn't like.

**Session work:** Two dashboard iterations. First was too flat — everything at the same visual weight. Second pushed hierarchy harder: TSB at 64px in accent orange, prescription unboxed as a statement, secondary metrics in a hairline ruled strip. The original brief was written and committed.

**Post-session work (same day):** Ivo identified the brief as the wrong shape. It was a specification — what to build — rather than a constraint system — what not to. We audited the dashboard together and found 19 AI tells, including the most revealing one: a rationale strip at the bottom explaining why the design was unconventional. Design that defends itself is already failing.

**New approach:** Started with cultural anchors (Dieter Rams, Nothing OS), built a testbed widget first (320×420px), and derived the constraints from that. Helvetica Neue instead of Inter. No `font-weight: 300`. No pill badges. No upward delta arrows. TSB at 104px as a typographic object sitting on the page with no card around it. Orange used three times across the whole screen.

The new brief's opening line is its thesis: *a style guide tells you what something looks like; a constraint system tells you what it can never be.*

**Both briefs are in the repo.** The contrast between them is the actual artefact from this session.

**Decision committed to:** New visual brief, Dieter Rams + Nothing OS as cultural anchors, dashboard rewritten from widget up.

**Still open:** Side-by-side build comparison between old brief and new brief hasn't happened yet. The case for the new one is convincing but untested against actual output.

---

### Ivan — Mockup Generator

Ivan's session check-in wasn't submitted for week 03. No update.

---

### Marin — Naučimo Hrvatski (visual direction locked)

Three visual directions generated: Memory Press, Tender Thread, Adriatic Dusk. Selected Adriatic Dusk. Two mockup rounds, type system locked, first scene screen built.

The scene: Scena 3 · Sarma kod bake. Glassmorphic, full-bleed warm amber background, Playfair Display italic at display scale, frosted glass narration card, Marko pill, word hint chips, Nastavi at the bottom. Narration card line: *"Bakina kuhinja miriše na nedjelju, na dim i na sarmu."*

Friction point: Claude kept defaulting away from DM Sans for the UI layer even after it was defined. Took a direct correction and a round of uploaded references to hold it.

Marin was the most satisfied participant at end of session. Direction is locked. Type system is documented. Banned moves list is 15 items.

**What's next:** Feeding Claude actual trip content — photos, stories, context. That writing work hasn't started. The scenes can't be specific until it has.

**Decision committed to:** Glassmorphic Emotional direction, Playfair Display italic + DM Sans system, full design brief in both `.docx` and `.md`.

**Quote worth keeping:** *"Bakina kuhinja miriše na nedjelju, na dim i na sarmu."* — from the scene card. That's the project working.

---

### Paula — ClassArcade (visual direction + style guide rewrite)

Three HTML prototype iterations during the session. Dark scanline version rejected immediately. Subsequent iterations arrived at warm cream ground, Nunito, pink/blue/orange ranking colors. 13-item banned moves list. Scope committed: student list and top-3 leaderboard, nothing else yet.

**Post-session finding:** Three sessions of refining the prompt kept producing the same dashboard. Saturated mint and purple. Rounded Nunito. Emoji avatars. The brief was followed. The output was generic.

**Root cause diagnosed:** The reference images. Two children's app screenshots uploaded at the start had set the aesthetic ceiling for every subsequent prompt. Words couldn't override them. The model weighted the references more than the brief.

**What broke the cycle:** Changing the references. Swapped saturated mascot-blob UI for editorial kids references (Fraunces italic headlines, white-dominant, abstract scattered shapes). Same target audience, opposite visual language. The first build with new references was the first one that didn't look like the others.

**Second finding:** Anti-pattern lists are dangerous as a primary tool. "Don't use mint, don't use thick rings" reads as confirmation that the aesthetic is in scope. Retirement-with-replacement works better: name what goes in the slot instead of what doesn't.

**Third finding:** Side-by-side comparison is the highest-bandwidth feedback. "This is too generic" produced polite agreement and another generic result. Pasting both versions and asking for specific differences produced a concrete analysis. The prompt was: *"Compare the differences and write down the findings."*

Style guide fully rewritten with all three lessons incorporated. It opens with a diagnosis of why the first guide failed. Every retired element has a named replacement. Closes with a yes-or-no build checklist.

**Decision committed to:** New reference set, revised style guide, Fraunces + Plus Jakarta Sans, white-dominant with color as accent.

**Still stuck:** Characters still undefined. The two reference images replaced earlier ones, but the character system hasn't been decided.

---

## Patterns across the group

**References override words — every time.** This was the single clearest finding from the session. Ivo's thorough specification and Paula's detailed brief both lost to whatever aesthetic the model associated with the project context. The way out was changing the references or establishing a new cultural anchor before any generation happened. Both designers arrived at the same conclusion from different directions.

**Specification vs. constraint system.** Ivo's post-session rewrite made this explicit. A specification tells the model what to produce. A constraint system closes off the default options and forces a different search. The new Wattlog brief is mostly refusals. The new ClassArcade style guide has explicit retirements with named replacements. Both are more effective than their predecessors.

**Anti-pattern lists are risky.** Paula discovered that describing what not to do confirmed the aesthetic was in scope. The model anchored to the world being described, not the negation. This applies to the "banned moves" framing across all briefs — worth revisiting whether those lists are helping or reinforcing defaults.

**Comparison prompts outperform critique prompts.** "This is too generic" → generic result again. "Compare these two images and name the specific differences" → actionable analysis. The model's analytical output is better than its self-critique. Useful technique for any session where output is stuck.

**Marin had the cleanest session.** He came in with a real art direction reference (glassmorphic, Mediterranean warmth, Playfair italic) and it translated well. The difference between his session and Ivo's and Paula's wasn't skill — it was that he had a specific, unusual visual reference that the model didn't have a direct shortcut to.

---

## What worked / What didn't

**Worked:**

- Auditing the existing output for AI tells before rewriting the brief. Finding 19 specific tells gave Ivo a concrete target rather than a vague sense that something was wrong.
- Starting with a small testbed component (the 320×420 widget) before scaling to the full dashboard.
- Changing the reference images rather than the brief text when output was stuck.
- Side-by-side comparison as a feedback mechanism.
- Marin's direct approach: pick one direction, commit fast, iterate.

**Didn't:**

- Banned-moves lists as a primary framing tool. Probably should be secondary — after a positive constraint system is established.
- First-round Claude output across all three projects. The default aesthetic surfaced in everything. Participants had to fight for every departure.
- The brief-first approach for Ivo. Starting from a full specification meant all the iteration happened downstream rather than at the constraint level.

---

## Facilitator notes for next session

- Ivo: Run the side-by-side build test between old brief and new brief. That's the thing to validate.
- Paula: Characters still undefined — this is a blocker for the avatar system. Needs a decision before the next build.
- Marin: Content handoff is the next task. Needs a working method for turning trip notes and photos into scene descriptions Claude can use. Help him scope this before he tries to do all six chapters at once.
- Ivan: No check-in this week. Reconnect at the start of session 04.
- For the group: the "compare the differences" prompt technique is worth sharing explicitly. It's the most transferable finding from the week.
- Consider whether banned-moves framing across all briefs is working. The ClassArcade experience suggests it may be reinforcing the wrong reference space.

---

## Quotes from the session

> *"Design that has to announce its own unconventionality is admitting it isn't."*
> — Working conclusion from the Wattlog audit.

> *"A style guide tells you what something looks like. A constraint system tells you what it can never be."*
> — Closing line of the new Wattlog brief.

> *"Compare the differences and write down the findings."*
> — The prompt that broke the ClassArcade cycle.

> *"Bakina kuhinja miriše na nedjelju, na dim i na sarmu."*
> — From Marin's first scene card. The project working.

> *"I'm happy as long as the app works and performs well."*
> — Marin, at the end of the session.
