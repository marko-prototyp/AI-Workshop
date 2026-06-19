# Paula — running notes

> Marko's working notes on Paula across the program. Observations, decisions, quotes, things to flag for the case study.

---

## Project

Classroom Behavior Tracker — teachers open it during class to log positive and negative behavior points per student across focus, participation, and disruption. AI-generated weekly summaries surface patterns and flag students who need attention.

## Design direction

Playful but purposeful. Color-coded scoring, satisfying micro-animations on point updates, strong visual hierarchy per student. Mobile-first for classroom conditions.

## Scope decisions

- **No backend or user accounts in week one.** Data in session or local storage.
- **AI layer deferred to week 10.** The interaction design has to work before the AI is worth anything.

## Watch-outs

- The week 10 AI layer is easy to over-promise. "Surfaces patterns" is a high claim. Watch the framing.
- Mobile-first for classroom conditions — needs real device testing earlier than week 11. Not just a dev-tools mobile preview.

## Quotes

- > "Something that gets used on Monday morning." — Paula, on what success looks like (week 01)

## Artifacts to keep for the case study

- _to add as program progresses_

## Per-week running log

### Week 01
- Strongest real-user constraint of the three. Specific teacher, specific classroom.
- Deferring the AI layer was the right call. Good instinct.
- **Push for next week:** one observational session with the teacher before week 2 if at all possible. Watch a class, don't just interview.

### Week 02
- Committed to the project: Classroom Behavior Tracker, built for one specific teacher, not "teachers in general."
- Two scope cuts: students don't use the app (teacher-only), bad points go offline (screen is reward-only).
- Research output: 6-tool competitor matrix, 10-reference gamification report.
- Key reference: Habitica and Finch over classroom tools. Going pixel-art, retro, gamified.
- Flagged wanting to research PBIS literature on public point displays before locking the leaderboard.
- **Push for week 03:** Visual direction pass. Resolve characters question.

### Week 03
- Three HTML prototype iterations in session. Dark scanline version rejected immediately. Arrived at: warm cream ground, Nunito, pink/blue/orange ranking colors. 13-item banned moves list. Scope committed: student list + top-3 leaderboard.
- Post-session finding: same generic output across three brief iterations. Root cause: reference images from the start of the original session were doing more work than the words. Words can't override images.
- Broke the cycle by changing the references. Editorial kids references (Fraunces, white-dominant, abstract shapes) vs. saturated mascot-blob UI.
- Second finding: anti-pattern lists confirm the aesthetic is in scope. Retirement-with-replacement works better.
- Third finding: side-by-side comparison is the highest-bandwidth feedback prompt. *"Compare the differences and write down the findings."*
- Style guide rewritten with all three lessons in. Every retired element has a named replacement. Closes with a yes-or-no build checklist.
- **Still stuck:** Characters. The avatar system isn't defined. Blocker for the build.
- **Push for week 04:** Full wireframing pass. Resolve the character/avatar question first.

### Week 04
- Full wireframing pass completed. Four screens, two overlays. Clean and committed.
- Structural move: two-step create flow makes the empty-student-list state unreachable. Design-out, not handle-out.
- Typography override mid-session: Nunito → two-font system (Plus Jakarta Sans 800 + Fraunces italic). The rule that came from it is sharper than the brief it replaced.
- Good discipline on cuts. Ticker strip, "pts" suffix, raised podium card, per-row controls, deleted-students history — all gone, each with a reason.
- 30-second undo for student deletion. The right call.
- Quote from the brief: *"Waiting for the first points."* — the pre-leaderboard state copy.
- Four open questions to resolve: negative point display, leaderboard visibility, day-one avatar state, teacher's current system.
- **Push for week 05:** At minimum, decide on negative point display before building. It affects what the class sees every time points are deducted.

### Week 05
- Single-file clickable smoke test, full app: Class Picker, Main Arcade, two-step New Classroom, Edit Roster, Give Points panel, classroom dropdown, on real seed rosters. Three versions in session on Fable 5.
- Teacher-walkthrough found three trust-level failures, all fixed in session: slowest action was +1 to one student (→ per-row ± buttons), no undo for a point (→ one-level undo chip), feedback lost to early re-sort (→ flash-then-resort). Good instinct to walk it as the teacher rather than review it.
- W04 30-second delete timer replaced with "nothing is real until Save." Cleaner model, removes the anxiety instead of timing it.
- Best discipline of the session: three out-of-scope features (search, sort, categories) handled by a written reconciliation brief, not silent drift. Amended and re-armed the scope lock, realigned wireframes and state map, named eight previously unnamed UI states. This is exactly the move Marko asked the group for after the session (update the brief, don't rework the artifact). She's the template.
- Honest about the regression: the vertically stacked podium now reads as a shorter student list and lost its designed moment. That's the visual debt going into the next sessions, and it matches her stated next step (UX + visuals).
- **W04 open questions — partly forced by the build.** The ± buttons mean a minus action exists, and categories add per-category tallies. Both land on the projected screen. The unanswered "ask the room" from Q5: do per-category tallies and a minus button belong on the class-facing screen at all, given "calm, not surveillance"? **Push for week 06:** make that decision before the first real screen.
- Q&A: worst moment "Claude adding some things that weren't specified anywhere." Committed to giving the project more time and building reusable visuals. Nothing flagged as stuck.
- Reference-image work (the 3 images flagged for week 5–6 in the case study) still outstanding. Visuals are now her own stated priority, so watch that it actually happens and doesn't slip to the end.
- First peer-review round: reviewed the others' prototypes and got feedback on ClassArcade. Took part in the group agreeing a shared set of UX rules.

### Week 06
- Produced the anti-stock skill, a first build of the main view ("Today's roster"), and a reworked visual direction.
- Design-system reconciliation in chat: locked **DM Serif Display italic** for names, over Fraunces. (Supersedes the W04 Fraunces-italic lock; still serif italic, just a different face. Update the brief + W04 case study reference if it matters.) Flipped the leaderboard podium to **1·2·3 order** — start of recovering the W05 podium regression. Resolved a brief contradiction: **point number always the largest/heaviest element on a row, name stays the most expressive.**
- Consolidated project + visual + Week-4 briefs into one Design System Document. **Eight underspecified items flagged for sign-off** (type scale, spacing, flash colors, button color among them) rather than guessed.
- The friction: comp lost the dashboard's character; Claude repeated the same move after she told it not to. This is part of why the output went generic — eight unsigned items + a near-default aesthetic gave the model room to average.
- Q&A: "Skill and the first version of the app. Changed the visual design and some other stuff." Best: a good update to the visual brief. Worst: Claude doing things she didn't want, repeating the same move over and over. Committed: decided on the visual direction. Artifact: "Today's roster" comp — "this is something I want." No quote-worthy line. Next: many things in flight, not specified.
- **Watch:** sign off the eight items before the next build or defaults leak again. The character loss is the central problem; the 1·2·3 podium flip is the start of the visual recovery flagged in W05.
- **Push for week 07:** Sign off the underspecified items. Recover the dashboard's character (consider the adapted material-design skill). Narrow the "many things in flight" to one next move.

#### Week 06 — after-session update
- **Character recovered via a skill.** After the session, the material-design-skill workflow was run for ClassArcade: a Material Design skill template adapted with image references, rewritten by Claude into `classarcade-design` v2 ("Arcade Dusk"). It built two screens (main roster view + player profile) in near-perfect sync. Files in `Journal/participants/paula/classarcade-v2/`.
- **v2 supersedes earlier decisions.** The skill is now ClassArcade's art-direction source of truth. Names are Fraunces serif (with Space Grotesk for chrome), which overrides the in-session DM Serif Display call. It also retires the Session 02 visual brief on typography, avatars, ground, and palette. **Action: write the v2 addendum to the Session 02 brief, or mark it superseded and point to the skill.**
- The "eight items for sign-off" are mostly closed inside the skill's token layer and type scale. Verify each against the shipped screens rather than assuming.
- **Skill's named known unknowns to confirm with Paula:** negative projected display, leaderboard top-3 vs all ranks, the streak (`×N`) mechanic introduced in the build, and whether search comes back on the roster.
- This is the standout result of the session for any project. Use ClassArcade as the worked example when rolling the skill workflow out to Wattlog and Naučimo.
