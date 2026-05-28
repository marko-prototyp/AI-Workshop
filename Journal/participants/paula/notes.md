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
