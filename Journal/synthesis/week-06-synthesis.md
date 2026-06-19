# AI for Designers — Week 06
## Design the main view. Make your first skill.

**Session:** Week 6 of 12
**Date:** 17 June 2026
**Participants present:** 3 (Paula, Ivo, Marin). Ivan absent, fourth session in a row (03, 04, 05, 06)

---

## The session, in one line

The culmination session let everyone down. Each designer wrote the most complete brief of the program, turned the anti-stock rules into a reusable skill, and handed a hardened comp brief to Claude Design. Two of three comps came back generic. Only Marin's held. **The after-session fix changed the verdict: a skill built from image references recovered ClassArcade, and it's now the likely workflow for the build phase. See the addendum below.**

---

## Facilitator observation

This was a chaotic, low day. It was framed as the payoff: take everything from planning and design direction, compress it into one design system plus a skill, write a paste-ready comp brief, and watch the main view come out right. For two of three projects, the output was AI stock that ignored the guidelines. Paula's dashboard lost all its character. Ivo went the extra mile, built the full Wattlog design system inside Claude Design, and only got acceptable output once he applied the whole system, not the brief. The day was a genuine disappointment after weeks of build-up.

**The fork we offered, and what the room chose.** Two paths: comp the screen in Figma and hand Claude the screenshot, or describe the screen straight to Claude Design. Nobody chose Figma. Everyone went to Claude Design, and the brief held better there than the same prompt does in an ordinary chat. The format should follow this. Figma still works and the principle is unchanged (design first, then build), but the path we teach now is the one the room actually took. Update the handbook to lead with the Claude Design path.

**The handbook was too messy.** Direct complaint from the room: today's handbook page is almost impossible to follow because there's too much crammed in. Too much reading, too much overload. Action: redesign the page to be easier to follow and heavily rewrite the content to cut the volume. This is a real blocker on the session running itself, and it's the opposite of the week-04 experience where the handbook carried the room without questions.

**Why Marin's held and the others didn't.** Marin's visual language (glassmorphic, full-bleed warm trip photography, Playfair italic, no green/red, no tab bars) is specific and unusual enough that the model has no stock shortcut to reach for. This is the same finding from week 03: the model averages toward generic when the brief leaves room to average, and collapses to the reference when the reference is specific enough. Wattlog ("paper and steel," data-dense, restrained) and ClassArcade (warm, gamified, editorial) both sit closer to aesthetics the model has a default for, so the default leaked through.

**The bright spot, and the plan.** Ivo's best output came from an outside material-design skill (lev-os/agents, material-design SKILL.md), not from his own brief or his Claude Design system. It produced the cleanest comp in the room. Plan: adapt that skill to our own needs and see if it reproduces much better-looking design across projects. This is the most promising thread out of the session.

---

## After-session addendum (post-17 June)

The plan above got run, and it worked. This changes the read on the session.

**The finding: build a skill that references the visual style you want.** The reliable way to get the design we want out of the model is `/skills`, specifically a skill that carries the target visual direction. We took a Material Design skill template, which already has almost everything defined (tokens, type scale, component rules, banned moves), and adapted it by feeding the model image references for the look we wanted. The model took the inspiration and rewrote the Material skill to suit ClassArcade. The output is `classarcade-design` (v2, "Arcade Dusk"): a full art-direction contract — warm-white paper, Fraunces serif against Space Grotesk, one acid-green accent held over black-and-white, a hairline roster table, monochrome initial avatars, the acid-01 / lavender-02 / pink-03 leaderboard, and a banned-moves list aimed squarely at the friendly-gamified default.

**It produced two screens in near-perfect sync.** Using the new skill, Paula's main view ("Today's roster") and a player profile screen came back almost exactly as specified. Files saved in the repo: `Journal/participants/paula/classarcade-v2/` (the SKILL, the roster screen, the profile screen). The skill is also installed as a usable skill.

**It supersedes earlier decisions, including ones from this session.** The v2 skill is now ClassArcade's art-direction source of truth. It retires the Session 02 visual brief on typography, avatars, ground, and palette, and it overrides the in-session DM Serif Display call: names are Fraunces serif now, not DM Serif Display. The Session 02 brief needs a v2 addendum written, or it stays stale and misleading. **Action: write the v2 addendum (or mark the brief superseded and point to the skill).**

**Why it beats the brief.** A brief describes the target in prose and leaves the model room to average toward its default. A skill injects the tokens, the type scale, the component recipes, and the refusals as a build contract, up front, every time. It's the same anti-stock argument the program has made since week 03, in its most operational form yet. This is very likely how the build phase should run for every project, not just ClassArcade.

**Strategic consequence (Marko).** This is probably the best way to work, which means the workshop's past and future steps should be rethought to fit it: where the skill gets built in the sequence, how the visual-direction and design-system sessions feed it, and what gets cut now that the skill does the heavy lifting. This is a real revision pass, not a tweak. Treat it as its own piece of work before session 07.

---

## What each participant produced

### Ivo — Wattlog (design system, skill, comp draft)

Consolidated the five planning docs plus Session 05's resolutions into one Design System Document (~580 lines): art direction, banned-moves list, the full token layer, the content libraries, and a redraw recipe per screen across all ten screens. Turned the anti-stock guardrails into a reusable `SKILL.md`, scoped to Wattlog only. Hardened the comp brief for the Today (main) view into a single paste-ready block, naming the three accent uses and the six banned moves most likely to break on that screen.

**Decisions landed through one-question-at-a-time loops:**
- Fold in Session 05's recipe model (ten screens) over a strict five-file consolidation.
- Lock the form factor to narrow web at ~680px. **This closes the form-factor question carried since week 04.** It was the standing blocker on the tech stack and it now has an answer.
- Scope the skill to Wattlog only.
- Keep the visual-direction name "Paper and steel."

**The friction:** the brief went into Claude Design and the generated comp did not hold to it. Ivo got acceptable output only after building the full design system inside Claude Design and applying it whole, and his best-looking result came from an outside material-design skill, not his own brief.

**Q&A highlights:** Made a design system, a `skill.md` file, and a draft in Claude Design. Best: "I've made a design system brief." Worst: "Claude Design wasn't able to follow the design brief as planned." Committed decision (framing delegated to me): stepping back from Claude Design as the comp tool after it wouldn't hold the brief; whether a custom design system earns its keep is left open. Three keepable files regardless: `wattlog-design-system.md`, the `wattlog-design-system` SKILL.md, and the hardened comp brief. Line that holds up: *"leave as little unspecified space as possible."* Next/stuck (facilitator note, Ivo gave none): the live thread is whether to keep building the custom design system, and what comp tool to use now that Claude Design didn't hold the brief.

---

### Paula — ClassArcade (skill, first main-view build, reworked visual direction)

Produced the anti-stock skill, a first build of the main view ("Today's roster"), and a reworked visual direction. The chat-side work reconciled the design system:
- Locked **DM Serif Display italic** as the names font, over Fraunces. (This supersedes the week-04 lock of Fraunces italic for names. Update the case study and brief.)
- Flipped the leaderboard podium to **1·2·3 order.** This is the start of recovering the podium regression flagged in week 05 (the vertical stack that read as a shorter student list).
- Resolved a contradiction left in the visual brief: the **point number is always the largest and heaviest element on a row**, while the **name stays the most expressive.**
- Consolidated the project brief, visual direction brief, and Week-4 brief into a single Design System Document, with **eight underspecified items** (type scale, spacing, flash colors, button color among them) flagged for sign-off rather than guessed at.

**The friction:** the comp lost the dashboard's character, and Claude repeated the same move after she told it not to.

**Q&A highlights:** "Skill and the first version of the app. Changed the visual design and some other stuff." (The "stuff" was the design-system reconciliation above.) Best: a good update to the visual brief. Worst: Claude doing things she didn't want, and repeating the same move over and over. Committed: decided on the visual direction. Artifact: the main-view comp "Today's roster" — "this is something I want." No quote-worthy line this session. Next: many things in flight, not narrowed to specifics in the session.

**Recovery (after-session):** ClassArcade got its character back through the skill workflow in the addendum above. The `classarcade-design` v2 skill produced the main view and a player profile in near-perfect sync. The eight underspecified items are now largely resolved inside the skill's token layer and type scale; what remains are the skill's named "known unknowns" (negative projected display, leaderboard top-3 vs all ranks, the streak mechanic, whether search comes back). The DM Serif Display call from this session is superseded: names are Fraunces serif in v2.

**Watch:** confirm the skill's known unknowns with Paula, and write the v2 addendum to the Session 02 brief so it stops contradicting the skill. The original "eight items for sign-off" note is mostly closed by the skill, but verify each against the shipped screens rather than assuming.

---

### Marin — Naučimo Hrvatski (design system, skill, the comp that held)

The session moved from planning into designing, and his comp held the brief. Consolidated the four planning docs into one Design System Document, locking the type scale to "Balanced" and reconciling a conflict between the two briefs over the glass recipe. Wrote a reusable anti-stock `SKILL.md` that held strictly to pasted constraints with no invented defaults. Hardened a comp brief for the Scene screen, picking the banned moves most likely to break on that screen and auditing the draft against the skill. Took the brief into Claude Design and generated the first comp of the main view (Scene 03, "Sarma kod bake"), which held to the brief: Marin as a text pill, chips as warm tiles with no green/red, a warm (non-blue) toggle, and a gold-bordered Nastavi rather than a filled "Submit."

**The structural decisions, which clear most of the week-05 v2 list:**
- The app is no longer narrated by a separate AI tutor character. It's written in first person, as the real Marin showing Kenzie his photos and talking to her directly.
- Replaced typing with drag-and-drop everywhere. Kenzie never writes Croatian; she drags the right word chip into a blank. (Extends the week-04 no-free-typing call into the final mechanic.)
- **Made the wrong answer teach.** A wrong chip now shows what that word means before she retries. *(Fixes the week-05 finding that the wrong-answer state gated but didn't teach.)*
- Locked Chapter 1 at 11 scenes, one photo and one interaction per scene.
- Rebuilt the finale into dragging full sentences into chronological order, a real "boss level" rather than three quick blanks. The vocab shelf is now reachable mid-chapter, and Kenzie can flip back to earlier photos. *(Fixes three more week-05 findings: the dead-end chapter, the late-unlocking vocab shelf, and the inability to flip back.)*

**Q&A highlights:** "I designed in Claude Design. I got the first design version." Best: "he designed the first solid example of the future — I'm quite satisfied." Worst: nothing was bad. Committed: the first-person narration rewrite (plus the drag-and-drop, teach-on-wrong-answer, 11-scene lock, and finale rebuild above). Artifact: the first Claude Design comp of the Scene screen, "Sarma kod bake" (screenshot kept). Quote: *"I'm satisfied with how Claude was steering me."* Next: organise the content and let Cowork pull it from his Apple Notes app.

---

### Ivan — Mockup Generator

Absent again. Four sessions missed in a row (03, 04, 05, 06). The re-entry decision flagged after weeks 04 and 05 has still not been made or acted on. He is now half the program behind, with no design direction, no wireframes, no smoke test, and now no design system or skill. Decision can't keep sliding: either a compressed onboarding track, or accept he rejoins at the build phase with a deliberately reduced scope. Make the call before week 07 and tell him.

---

## Patterns across the group

**The brief is not enough on its own, and the after-session work proved the fix.** The week's hard lesson: the most complete brief any of them has written still produced stock output in Claude Design for two of three. A brief reduces ambiguity, but where the target aesthetic is close to a model default, the default wins. The fix isn't a longer brief. It's a skill that carries the visual direction as a build contract (tokens, type scale, component recipes, refusals), which is exactly what the after-session ClassArcade work delivered. Marin's comp held for the related reason: his visual language is specific enough to act like a constraint on its own.

**Specificity of reference still predicts output quality.** Marin's held because his direction is unusual. This is the week-03 finding restated at the comp stage. It's worth making explicit in the handbook: the more your aesthetic resembles "nice modern app," the more guarding the brief has to do.

**Skills are now real deliverables.** All three wrote a reusable anti-stock `SKILL.md` this session. That's a concrete, portable artifact each can carry into the build phase. Even on a bad output day, three skills and three design systems exist that didn't before.

**Consolidation worked even where the comp didn't.** Each person collapsed multiple planning docs into one design system. That's the right structural move regardless of how Claude Design performed, and it's what the build phase needs to read from.

---

## What worked / What didn't

**Worked:**
- Everyone produced a design system and a reusable skill. Real, keepable artifacts.
- Marin's comp held the brief end to end, and the session cleared most of his week-05 v2 list at the same time.
- Ivo closed the form-factor question (narrow web, ~680px) that had been open since week 04.
- The outside material-design skill produced the cleanest comp in the room. Clear thread to pull.
- The room self-selected the Claude Design path over Figma, which tells us how to set the default.
- **(After-session) The skill-from-reference workflow.** Adapting a Material Design skill template with image references produced `classarcade-design` v2, which built two ClassArcade screens in near-perfect sync. This is the strongest result of the whole session and likely the build-phase workflow.

**Didn't:**
- Claude Design ignored the brief for Ivo and Paula. Generic output on the session that was meant to be the payoff.
- Paula's dashboard lost its character, and Claude repeated a move after she asked it to stop.
- The handbook page was overloaded and hard to follow. Direct complaint from the room.
- Ivan absent a fourth straight session, with no re-entry plan executed.

---

## Facilitator notes for next session (07)

- **Workshop revision (the big one):** The skill-from-reference workflow probably changes the program. Rethink where the skill gets built in the sequence, how the visual-direction and design-system sessions feed it, and what gets cut now that the skill does the heavy lifting. Do this revision pass before session 07 plans go out.
- **Handbook (do first):** Redesign the week's page for legibility and heavily cut the content. The overload is now actively hurting the sessions. Lead the design-the-view path with the skill workflow and Claude Design, not Figma.
- **Material-design skill (now proven):** Run the same skill-from-reference adaptation for Wattlog and Naučimo Hrvatski. It built two ClassArcade screens in near-perfect sync; do it across all three projects.
- **Ivo:** Try the skill-from-reference workflow on Wattlog before deciding whether the custom design system is worth more investment. The comp-tool question is largely answered: the skill carries the direction, Claude Design (or any builder) executes it. Form factor is now settled (~680px web).
- **Paula:** The character is recovered via the v2 skill. Next: confirm the skill's known unknowns (negative projected display, top-3 vs all ranks, the streak mechanic, search) and write the v2 addendum to the Session 02 brief so it stops contradicting the skill.
- **Marin:** Structure the Chapter 1 content with Cowork, pulling from Apple Notes, so the 11 descriptions become per-scene content the comp can absorb. His direction is working; keep the momentum on content.
- **Ivan:** Make the re-entry call before week 07. Four missed sessions is past any "tag along" plan.
- **Group:** Reframe the brief lesson honestly. A complete brief is necessary but not sufficient; specificity of the visual language and a hard-constraining skill are what made the difference this week.

---

## Quotes from the session

> *"Leave as little unspecified space as possible."*
> — Ivo, on writing the comp brief

> *"I'm satisfied with how Claude was steering me."*
> — Marin, the one comp that held

---

*Session held 17 June 2026 · Facilitated by Marko · 3 of 4 participants present · all four deliverables complete*
