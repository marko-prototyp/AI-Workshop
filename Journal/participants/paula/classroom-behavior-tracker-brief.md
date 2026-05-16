# Classroom Behavior Tracker — Project Brief

*Last updated: 13 May 2026 (Session 02)*
*12-week AI for Designers program — UI/UX track*

---

## What I'm building

A teacher-operated classroom behavior tracker with a separate student-facing display, designed for one specific teacher to use during real lessons. Gamified, pixel-art aesthetic. Built in Claude Code.

## Who it's for

**Primary user:** One specific teacher I know. The whole tool is designed around them and their classroom — not "teachers in general."

**Secondary audience:** The students in that classroom, who only *see* the display (projected or shown on a screen) and never interact with the app themselves. The teacher holds the device.

**Two surfaces, two design problems:**
- **Teacher view** — fast, one-handed input. Designed to be used in 2 seconds mid-lesson.
- **Student view** — read-only display. Designed to be legible across a classroom, more like a scoreboard or game show graphic than an app screen.

## What success looks like

**The teacher uses it in their real classroom.** Not a Figma prototype. Not a portfolio piece. A working tool that gets opened on Monday morning and used during an actual lesson.

---

## Must-have features (week 12)

These three have to work, in this order of priority:

1. **Add ±1–3 points to a student** — the core interaction. Teacher view, fast tap.
2. **Student list with custom names** — the teacher's own students, entered by them.
3. **Multiple classrooms** — the teacher manages more than one class. Switching between them needs to feel clean.

## Nice-to-have (if time allows)

- **Duolingo-style leaderboard** — tiered leagues, top 3 highlighted, weekly resets. Class-internal (e.g., 8 kids in a Bronze League).
- **Avatar / character customization** — pixel-art characters students can be assigned or pick.
- **XP / leveling system** — points convert to XP, XP unlocks customization options.
- **Weekly summary / pattern view** — per-student trends for the teacher only.

## Explicitly NOT building

- **No student-controlled interaction.** Students don't tap, log in, or input anything. They look.
- **No public display of negative behavior.** Negative consequences happen offline (extra homework, etc.) — not as visible punishment on the screen.
- **No school-wide / admin features.** Not for principals, not for parents, not for districts. One teacher, their classes.
- **No parent communication features.** Out of scope.
- **No live device sync, no accounts, no multi-teacher.** Local data only — at least through week 12.

---

## Art direction

**Pixel-art / retro.** Habitica is the starting reference. The choice is deliberate:
- Distinctive visual identity from day one — doesn't look like generic ed-tech SaaS.
- Forgiving at small scale and inside a 1–2 hr/week budget.
- Naturally gamified — pixels signal "game" to students without needing complex 3D or illustration.

To verify in upcoming sessions: tone (cute vs. heroic vs. weird), palette, character design system, animation language for point events.

## Design philosophy (early notes)

- Calm, focused, and humane — not surveillance-y. The teacher view should never feel like a discipline dashboard.
- Gamification is the *reward layer*, not the *punishment layer*. Positive behavior earns visible game progression; negative behavior is logged quietly and handled in real life.
- Designed to be *fun for the room to look at*, not just functional for the teacher. The student view earns its own design time.

---

## Research — what the references taught me

### Direct competitors studied (Session 02, table 1)
ClassDojo, LiveSchool, Lekktura, Bloomz, Be+ (PBIS), Kickboard.

**What the market gets wrong:**
- Most tools are either too cute (ClassDojo — infantilizing for older students) or too enterprise (LiveSchool, Kickboard — admin/school-wide focus, no soul).
- App Store reviews of enterprise tools (Kickboard especially) repeatedly call out being built without teacher input — slow, glitchy, no audible feedback.
- Nothing in this market feels like a tool one specific teacher would *want* to open.

**Techniques worth borrowing:**
- Audible feedback on point events (ClassDojo) — sound carries across a classroom.
- Batch / "log later" entry (LiveSchool) — reduces cognitive load mid-lesson.
- Custom category language (Kickboard's intent) — let the teacher write their own categories.

### Character & gamification references (Session 02, table 2 — 10 examples)
TeachQuest, ClassMana, Habitica, Prodigy Math, Blooket, Gimkit, Joon, Finch, Duolingo Leagues, Mrs Wordsmith.

**What I learned:**
- The strongest "student-facing" gamification doesn't live in classroom tools — it lives in habit trackers (Habitica), self-care pets (Finch), and chore apps (Joon). The classroom category itself is underserved.
- Joon's two-app split (parent dashboard ≠ kid game world) is the cleanest answer to "teacher sees data, student sees game" — directly applicable here.
- Duolingo's tiered league system is well-documented and adapts cleanly to a small class — Bronze/Silver/Gold/Sapphire/etc. can mean 8 kids in one league inside one classroom.
- Prodigy's per-classroom dashboard with class-wide goals that unlock exclusive items is a model for multi-classroom IA.
- Mrs Wordsmith proves character design from feature-animation-level talent is a viable position for ed-tech — a recurring illustrated cast across all surfaces creates identity SaaS competitors can't match.

---

## Open questions for the teacher (week 1 interview)

These need answers before week 3 scope is locked:

1. **What does the negative point button actually do on the student display?** Logged silently? Shown neutrally? Not exist at all? — Still undecided. Will decide with the teacher.
2. **Does every student see their own ranking on the leaderboard, or only the top 3?** Public ranking at the bottom of a class list can do real harm.
3. **What does the teacher's current system look like?** Paper? App? Nothing? What are their top 3 frustrations with it?
4. **How many classes do they teach, and how different are they?** This determines how much weight to put on the multi-classroom feature.
5. **Are there students who would be harmed by public displays of behavior data?** Worth asking directly.

## Open questions for me to research

- **PBIS research on public point displays and leaderboards.** I want to verify the psychology side before locking in any visible leaderboard design.
- **Pixel-art character systems with modular customization** — how Habitica, Stardew Valley, and similar handle equipment slots and rendering at small scale.

---

## Constraints

- **Time:** 12 weeks, 1–2 hours per week. ~18–24 hours total.
- **Build tool:** Claude Code. No coding experience — relying on AI to handle implementation.
- **No backend complexity in v1:** local storage or simple session state. No accounts, no live sync. Infrastructure is not where the design budget goes.
- **AI feature comes late** (week 10) — one focused thing, like pattern flagging or a weekly note per student. Not week 1.

## The one scope rule

**No new features after week 3.** At 1–2 hours a week, scope creep kills the project. Three must-haves, ship them well, add nice-to-haves only if real time is left over.

---

## Session log

- **Session 01 — Direction:** Interviewed for strengths, energy, audience. Compared 5 project types. Chose Tiny Tool. Idea: classroom behavior tracker.
- **Session 02 — Research & Synthesis:** Two comparison matrices built (6 direct competitors + 10 character/gamification references). Locked: real teacher = real user; students view only, no input; negative consequences offline; pixel-art/retro art direction; 3 must-haves committed.
