# Paula — Classroom Behavior Tracker

*A teacher-operated behaviour tracker with a student-facing display, built for one specific teacher*
*AI for Designers — 12-session workshop*
*Last updated: 13 May 2026 (end of Session 02)*

---

## At a glance

| | |
|---|---|
| **Project** | Classroom Behavior Tracker |
| **Type** | Functional tool, gamified, pixel-art aesthetic |
| **Track** | UI/UX |
| **Built in** | Claude Code |
| **Time budget** | 1–2 hours per session × 12 ≈ 18–24 hours |
| **Primary user** | One specific teacher Paula knows |
| **Secondary audience** | Students in that classroom (view only) |
| **Status** | Project committed. Three must-haves locked. Philosophy and art direction next. |

## The designer

Paula moved between project ideas across the first two sessions and committed in session 02. She came into the workshop without a fully-formed direction, but the constraints she imposed on herself once she chose were unusually disciplined for session 02. Two scope cuts in one session: students don't interact, and negative consequences move offline. Both made in plain language, both stuck.

She has no coding experience and is relying on Claude Code to handle implementation. The success of the project is going to depend more on the clarity of the brief than on technical chops, which is the right shape for someone in her position.

## The project — current state

A teacher-operated classroom behaviour tracker with a separate student-facing display. Built for one specific teacher she knows, not "teachers in general." Gamified, pixel-art aesthetic. Two surfaces, two design problems.

### Teacher view

Fast, one-handed input. Designed to be used in 2 seconds mid-lesson. The teacher holds the device.

### Student view

Read-only display. Designed to be legible across a classroom, closer to a scoreboard or game show graphic than an app screen. Students never interact. They look.

### Success metric

The teacher uses it in their real classroom. Not a Figma prototype. Not a portfolio piece. A working tool that gets opened on Monday morning and used during an actual lesson.

## Scope

### Must-have (week 12)

1. Add ±1–3 points to a student. The core interaction. Teacher view, fast tap.
2. Student list with custom names. The teacher's own students, entered by them.
3. Multiple classrooms. The teacher manages more than one class. Switching between them feels clean.

### Nice-to-have (if time allows)

- Duolingo-style leaderboard. Tiered leagues, top 3 highlighted, weekly resets. Class-internal — e.g., 8 kids in a Bronze League.
- Avatar / character customisation. Pixel-art characters students can be assigned or pick.
- XP / levelling system. Points convert to XP, XP unlocks customisation.
- Weekly summary / pattern view. Per-student trends, teacher-only.

### Explicitly not building

- No student-controlled interaction. Students don't tap, log in, or input anything.
- No public display of negative behaviour. Negative consequences happen offline. Paula's framing: "Bad points would end up in extra homework and such, nothing digital."
- No school-wide or admin features. Not for principals, parents, or districts.
- No parent communication.
- No live device sync, no accounts, no multi-teacher.
- Local data only, at least through session 12.

## The one scope rule

**No new features after session 03.** At 1–2 hours per session, scope creep kills the project. Three must-haves, ship them well, add nice-to-haves only if real time is left over.

## Art direction

Pixel-art, retro. Habitica is the starting reference. The choice is deliberate.

- Distinctive visual identity from day one. Doesn't look like generic ed-tech SaaS.
- Forgiving at small scale and inside a 1–2 hr/week budget.
- Naturally gamified. Pixels signal "game" to students without complex 3D or illustration.

To verify in upcoming sessions: tone (cute vs. heroic vs. weird), palette, character design system, animation language for point events.

## Design philosophy (early notes)

- Calm, focused, humane. Not surveillance-y. The teacher view should never feel like a discipline dashboard.
- Gamification is the **reward layer**, not the **punishment layer**. Positive behaviour earns visible game progression. Negative behaviour is logged quietly and handled in real life.
- Fun for the room to look at, not just functional for the teacher. The student view earns its own design time.

## Origin story

### Session 01 — Direction

Interviewed for strengths, energy, audience. Compared five project types. Chose Tiny Tool. Initial idea: classroom behaviour tracker.

### Session 02 — Research & Synthesis

Pivoted between project ideas at the start of the session and then committed.

Two comparison artifacts built.

**The direct-competitor matrix (6 tools):** ClassDojo, LiveSchool, Lekktura, Bloomz, Be+ (PBIS), Kickboard.

What the market gets wrong:

- Most tools are either too cute (ClassDojo, infantilising for older students) or too enterprise (LiveSchool and Kickboard, admin/school-wide focus, no soul).
- App Store reviews of Kickboard repeatedly call out being built without teacher input: slow, glitchy, no audible feedback.
- Nothing in this market feels like a tool one specific teacher would want to open.

Techniques worth borrowing:

- Audible feedback on point events (ClassDojo) — sound carries across a classroom.
- Batch / "log later" entry (LiveSchool) — reduces cognitive load mid-lesson.
- Custom category language (Kickboard's intent) — let the teacher write their own categories.

**The character & gamification report (10 references):** TeachQuest, ClassMana, Habitica, Prodigy Math, Blooket, Gimkit, Joon, Finch, Duolingo Leagues, Mrs Wordsmith.

What it taught:

- The strongest "student-facing" gamification doesn't live in classroom tools. It lives in habit trackers (Habitica), self-care pets (Finch), and chore apps (Joon). The classroom category itself is underserved.
- Joon's two-app split (parent dashboard ≠ kid game world) is the cleanest answer to "teacher sees data, student sees game." Directly applicable here.
- Duolingo's tiered league system adapts cleanly to a small class — Bronze/Silver/Gold/Sapphire/etc. can mean 8 kids in one league inside one classroom.
- Prodigy's per-classroom dashboard with class-wide goals that unlock exclusive items is a model for multi-classroom IA.
- Mrs Wordsmith proves character design from feature-animation-level talent is a viable position for ed-tech. A recurring illustrated cast across all surfaces creates identity SaaS competitors can't match.

## Decisions committed to

| Session | Decision |
|---|---|
| 01 | Project type: Tiny Tool. Initial direction: classroom behaviour tracker. |
| 02 | Real teacher, real user. Not "teachers in general." |
| 02 | Students view only, no input. |
| 02 | Negative consequences move offline. |
| 02 | Pixel-art, retro art direction. Habitica as starting reference. |
| 02 | Three must-haves locked. |

## Open questions for the teacher (session 03 interview)

These need answers before scope is locked.

1. What does the negative-point button actually do on the student display? Logged silently? Shown neutrally? Not exist at all? Still undecided.
2. Does every student see their own ranking on the leaderboard, or only the top 3? Public ranking at the bottom of a class list can do real harm.
3. What does the teacher's current system look like? Paper? App? Nothing? What are their top 3 frustrations with it?
4. How many classes do they teach, and how different are they? Determines weight on the multi-classroom feature.
5. Are there students who would be harmed by public displays of behaviour data?

## Open questions for research

- **PBIS research on public point displays and leaderboards.** Verify the psychology before locking in any visible leaderboard design. Flagged by Paula. Real research question.
- **Pixel-art character systems with modular customisation.** How Habitica, Stardew Valley, and similar handle equipment slots and rendering at small scale.

## Constraints

- **Time:** 12 sessions, 1–2 hours per session.
- **Build tool:** Claude Code. No coding experience.
- **No backend complexity in v1:** local storage or simple session state.
- **AI feature comes late (session 10):** one focused thing — pattern flagging or weekly per-student notes. Not session 01.

## Artifacts produced

- 6-tool competitive matrix (session 02).
- 10-reference character/gamification report (session 02).
- Habitica avatar/profile screenshot reference (session 02).

## Quotes worth keeping

> "Students will not be able to use it. Only the teacher, and students will just look at them."

The line that locked the scope.

> "Bad points would end up in extra homework and such, nothing digital."

The second locked-in line. Negative consequences move offline.

## What's next

**Session 03:** Philosophy of the tool, and art direction.

**Stuck:** Nothing immediate. The PBIS research question is real but not blocking. It sits in the open-questions list and gets resolved before any visible leaderboard ships.

## Facilitator notes

Paula made two scope cuts in session 02 that most participants take three sessions to make. The instinct to constrain instead of expand is the most important thing she'll bring to this project, and it showed up early. Worth reinforcing in session 03 by drawing a direct line between those cuts and the design freedom they create.

The PBIS / leaderboard psychology question is a real research item. It deserves time. Worth allocating 30 minutes of session 03 or 04 to working through it together. The answer matters for the design, and it's also a chance to model "research as input to design decisions" rather than research-as-decoration.

The single-teacher framing is the project's strongest constraint. It removes the temptation to generalise, which is the single biggest failure mode of ed-tech projects. If she ever wavers ("could this also work for…"), bring it back to the specific teacher.

Paula's check-in noted "nothing in this session to push back on." That's the same pattern Ivo reported. Two of the four. Worth watching. In Paula's case the work was probably converged, but session 03 should still include a moment where she's asked to argue against her own three must-haves. The muscle of resisting AI output is the workshop's central skill and it doesn't build itself.

Art direction is going to be the make-or-break for the student view. Pixel-art is the right call, but pixel-art has a wide tonal range from "Stardew cute" to "Hyper Light Drifter weird" to "Habitica generic." Session 03 should force a specific point on that spectrum, not leave it open.
