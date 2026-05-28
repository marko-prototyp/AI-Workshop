# AI for Designers — Week 04
## Map the whole thing. Cut half of it.

**Session:** Week 4 of 12
**Date:** 27 May 2026
**Participants present:** 3 (Ivo, Marin, Paula) — Ivan absent again

---

## The session, in one line

Both projects that ran the full wireframing pass came out with committed structure. The session didn't feel like a session — participants followed the handbook and ran it nearly independently.

---

## Facilitator observation

The handbook held. Participants went in without questions and ran the session close to solo. That's the first real proof it works without facilitation in the room. Worth noting for the program documentation.

**Between-session meta-project work:** Marko built a journal entry editor dashboard in the days between sessions. The intended workflow: Cowork drafts the entry, Marko opens the dashboard to add images and make final edits before publishing. Two days of Claude artifact prototyping, then a direction change based on what was learned, then a full brief written from that. Now building from scratch off the brief. Token limits are making this a full week of work rather than a session. Five-step plan: prototype and test, brief with lessons learned, prepare for Claude Code, review with agents, get a foolproof brief that guides the build without constant hand-holding.

---

## What each participant produced

### Ivo — Wattlog (sitemap, wireframes, state maps, content inventory)

Full wireframing pass. Four artifacts: sitemap (in-conversation diagram + rationale), wireframes for nine screens in `wattlog-wireframes.md`, state maps for every screen in `wattlog-state-maps.md`, content sourcing inventory in `wattlog-content.md`.

**Scope decisions — what made it in:** Calendar, Workout Detail, Ride Log, Power Profile, Performance Trends, Training Load, Session Notes, Settings, and the first-run flow. Nine screens.

**Cut list (load-bearing):** Onboarding flow, flat "all rides" list, notifications, public profile, global search, generic stats hub. Each documented with a reason it would weaken the product. Ivo treated this as a design principle, not just a checklist. Quote: *"If a flat list ever feels necessary, Calendar isn't doing its job."*

**Cross-screen principles committed:**
- One hero per screen
- No terminal error states — every error loops back somewhere useful
- Every destructive action through exactly one modal
- Drill-through screens hide the nav bar
- Editable fields autosave on blur; no Save buttons
- Acronyms get a one-time tooltip on first encounter, app-wide
- Empty states are honest data statements or they collapse to nothing

**Content brief outcome:** Daily prescription, status explanations, personal-best callouts, acronym tooltips — all hardcoded libraries. Zero AI-generated content in scope. Strong, early position.

**Friction to flag:** Claude's content-brief elicitation came one-question-at-a-time with a recommended option in 3 of 4 cases. Ivo took the recommendation each time. He flagged this himself, which is the honest version — whether the recommendations were right (probably: the more defensive MVP choices) or whether he was deferring to a confident voice, the session can't tell. He asked for this to be addressed in a future session: present options neutrally, or explicitly ask whether he's agreeing or deferring. Worth building into the brief-review prompts.

**Still stuck:** Form factor. Web, native mobile, or both. Gates the tech stack. No defensible answer yet.

**Next:** Pick tech stack, stand up a skeleton.

---

### Ivan — Mockup Generator

Absent again. Two sessions missed in a row. A lot to cover. Will tag along next week.

---

### Marin — Naučimo Hrvatski (content pass, partial)

Hit 100% usage limit 30 minutes into the session. Switched to Sonnet and continued. Eventually moved to manual work — writing trip content, descriptions, context that the scenes need to feel specific. This is the right work to be doing. The scenes can't feel personal until the writing exists, and no design pass will fix that.

Vision and Claude delivery were mostly in sync before the limit hit. He was happy with the results where Claude engaged.

**1:1 scheduled Friday 29 May** to cover the bases. Will continue from wherever the content work landed.

**Note for the case study:** The usage limit forcing manual work turned into the right move — he had to do this writing eventually, and doing it now before the build starts is better than doing it mid-build. Frame it as a scope clarification, not a friction point.

---

### Paula — ClassArcade (full wireframes)

Full wireframing pass. Four screens or screen-states plus two Arcade overlays.

**Screen inventory:**
- Class Picker (first-launch)
- Main Arcade (root)
- New Classroom flow — two-step modal (name → roster)
- Edit Roster modal (same component, pre-filled)
- Give Points panel (overlay)
- Classroom dropdown (overlay)

**Structural move of the session:** The two-step New Classroom flow requires at least one student to complete. This makes the empty-student-list state on the Arcade impossible by design. No empty state to handle; the state can't be reached.

**Typography overhaul:** Overrode the "Nunito only" rule from the visual direction brief. New system: Plus Jakarta Sans 800 for operational text, Fraunces italic for names. The rule: *names get serif italic, numbers and verbs get sans 800*. Applies everywhere — list, podium, edit modal, input fields. Nunito is now banned alongside Inter, Roboto, etc.

**Cuts:**
- Ticker strip (row flash + podium re-ranking handles point moments)
- "pts" suffix on point totals (bare integer only)
- Raised 1st-place podium card (all three cards same size, rank signaled by position + color)
- Per-row edit/delete controls (roster changes happen in Edit Roster modal only)
- History-of-deleted-students view (replaced by 30-second undo)

**Sort rule:** Points descending, last-name alphabetical tiebreaker, displayed first-name-first. Sort key invisible to class.

**Pre-leaderboard state:** When all students are at 0 points, the podium is replaced by "Waiting for the first points." on the cream background. Materializes when any student crosses 0.

**Still open:** Four questions carried forward from earlier docs — negative point display, leaderboard visibility (all vs. top 3 only), day-one avatar state, teacher's current system.

---

## Patterns across the group

**The handbook worked solo.** Ivo and Paula ran their sessions nearly independently. No questions to the facilitator, no deviation from structure. The program can self-run at this stage for participants who are engaged. Ivan is the exception — two absences in a row means he'll need a different onramp.

**Cut lists as design artifacts.** Ivo's explicit reasoning for each cut — not just "won't build" but "would weaken the product because..." — produced something more useful than a scope doc. It's a design thesis in the shape of a deletion log. Worth surfacing in the journal and in the case study.

**Mid-session overrides.** Paula's typography override shows the brief phase work paying off. She knew enough about the design language to override a previous rule and replace it with something sharper. That's evidence the process is working.

**Forced manual work turned productive.** Marin hitting the usage limit and turning to writing was the right outcome. The content work is where the app's specificity lives. The sooner that writing exists, the sooner the scenes are real.

---

## What worked / What didn't

**Worked:**
- Session structure holding without facilitation in the room
- Cut lists with documented reasoning (Ivo)
- Two-step create flow solving the empty state problem (Paula)
- Typography overhaul mid-session producing a sharper rule (Paula)
- Marin's usage limit forcing the content writing pass earlier than planned

**Didn't:**
- Claude's one-question-at-a-time elicitation with bundled recommendations (Ivo). The interview pattern optimizes for resolution, not participant judgment. Consider revising the prompts that produce this pattern to either present options neutrally or explicitly surface the deferral risk.
- Ivan absent again. The program can't move him forward if he's not in the room.

---

## Facilitator notes for next session

- **Ivo:** Form factor decision before the next session. Web, mobile, or both. It gates everything else.
- **Ivan:** Real conversation needed. Two sessions missed. What's the path back in? Do we run a compressed onboarding or does he join live session 05?
- **Marin:** Friday 1:1 first. Then session 05 with content writing as the anchor. The scenes need the real trip text before any build work is worth doing.
- **Paula:** Four open questions from the spec. At least one of them — negative point display — probably needs a decision before the build starts.
- **Group note:** The elicitation pattern Ivo named (one-question-at-a-time with bundled recommendations) is worth watching across all future brief work. Check whether the prompts in sessions 05–08 produce the same pattern and adjust if needed.

---

## Quotes from the session

> *"If a flat list ever feels necessary, Calendar isn't doing its job."*
> — Ivo, on the cut list

---

*Session held 27 May 2026 · Facilitated by Marko · 3 of 4 participants present*
