# AI for Designers — Week 02
## Research & synthesis

**Session:** Week 2 of 12
**Date:** 13 May 2026
**Participants present:** 4 (Ivo, Ivan, Marin, Paula)
**Service interruption:** Claude.ai outages began at minute 10 and continued intermittently through the session ([status incident](https://status.claude.com/incidents/sb7byp4h7yp8)).

---

## The session, in one line

Four ideas came in. Four project briefs went out. One major project pivot. Two scope cuts that will hold for the rest of the program. One participant naming API anxiety out loud.

---

## What each participant produced

### Ivo — Wattlog (project formally named)

An 11-tool competitive matrix, structured as: does well · distinctive · what not to copy · one technique to borrow. Tools surveyed: intervals.icu, TrainingPeaks, Strava, Garmin Connect, Xert, Wahoo SYSTM, WHOOP, Runalyze, Final Surge, Stryd PowerCenter, Zwift.

The matrix synthesised into `wattlog-brief.md`: product definition, target user (himself), success criteria, a 16-feature priority list ranked P0 through P3, competitive lessons, and an explicit not-building list with seven items including "Strava exists."

The wedge the brief identifies: outdoor, self-coached cyclists are underserved by the prescriptive layer. WHOOP does diagnosis-to-prescription for general fitness. TrainingPeaks does it if you're paying a coach. Zwift does it if you're indoors. The outdoors-first, coach-less, prescriptive cycling tool doesn't exist well yet.

The session closed with Claude challenging the brief across six areas. Ivo's read was that the challenge wasn't relevant to where the project actually is.

**Decision committed to:** 16-feature P0–P3 list, 7-item not-building list, no proprietary vocabulary.

---

### Ivan — Mockup Generator

The most rigorous iteration in the room. The brief went through three drafts and two full rounds of Claude arguing with its own previous output.

A 10-tool competitive analysis (Pinterest, Mockey.ai, Lummi.ai, Leonardo.ai, Midjourney, Krea.ai, Visual Electric, Cosmos.so, Magnific, Recraft) shaped the input system, refinement pattern, and output experience.

Things that changed across the drafts:

- Tap-to-refine cut from v1, replaced with a lock-and-shuffle pattern (explicit user lock-in rather than inferred convergence).
- Input hierarchy restructured: Subject and Aesthetic Preset are primary and always visible; the four other dimensions collapse by default.
- Background removal moved from a post-generation tool to an input option ("No background" inside Environment).
- GPT Image 2 confirmed as the generation API after a live research check. Snapshot pinned at `gpt-image-2-2026-04-21`.

**Decision committed to:** No text inputs in UI, ever. Ivan's own framing: *"No text inputs in UI because they force me to think and thinking is tiresome."*

**Stuck:** API connection. Ivan said it plainly: *"I'm scared of the API connection."* Worth raising with the room.

---

### Marin — Naučimo Hrvatski (reframed mid-session)

The biggest project shift of the cohort. Marin came in with the FaceTime-style conversation app from session 01. He left with a memory book that teaches Croatian, built around real trips with Kenzie.

The lever was a research check. Ten indie conversation-based language tools surveyed (TutorLily, Univerbal, Gliglish, Langotalk, TalkBits, AI LingoPlay, Langua, LingoStar, Copycat Cafe, Praktika). Surfaced finding: no app on the market is built around a couple's actual relationship as its core scenario.

Once that gap was visible, the conversation app from session 01 was the wrong shape. The right shape was a memory book.

**The new structure:** Six chapters mapped to real trips, December 2024 through Kenzie's visit in September 2026. Continuous narrative inside each chapter, not standalone vignettes. Most scenes use "describe the photo." Each chapter closes with a "story rebuild" where Kenzie retells the whole trip in Croatian and the AI gently corrects.

**Decision committed to:** Memory book structure. Six chapters. No streaks, no hearts, no guilt notifications.

**Open:** Build chapter 1 fully in v1 versus six chapters partially. Claude recommended one fully. Marin hasn't committed. This is the most consequential open decision in the cohort.

---

### Paula — Classroom Behavior Tracker

Committed to the project in the first half of the session, then made two scope cuts in the second half that will define the project.

**Scope cut 1:** Students will not use the app directly. The teacher holds the device. The students view a scoreboard. Paula's own line: *"Students will not be able to use it. Only the teacher, and students will just look at them."*

**Scope cut 2:** Negative consequences happen offline. The screen is the reward layer. *"Bad points would end up in extra homework and such, nothing digital."*

Research output: a 6-tool matrix (ClassDojo, LiveSchool, Lekktura, Bloomz, Be+, Kickboard) and a deeper 10-reference report on character-driven gamification (TeachQuest, ClassMana, Habitica, Prodigy, Blooket, Gimkit, Joon, Finch, Duolingo Leagues, Mrs Wordsmith). Art direction locked: pixel-art, retro, Habitica as starting reference.

**Decision committed to:** Three must-haves. Pixel-art direction. Two scope cuts above.

**Flagged for research:** The psychology of public point displays and leaderboards. Paula wants to verify this before designing any visible ranking. Real research item, not a stalling tactic.

---

## Patterns across the group

**Every brief came out with an explicit not-building list.** That conversation usually happens in session five or six when ambition collides with the time budget. This cohort did it in session two. Whether the lists hold under time pressure is the thing to watch around session 06 or 07.

**Two participants reported "nothing pushed back at me."** Ivo and Paula. The sessions did run cleanly, and both their briefs are good. But the workshop's central skill is the ability to resist AI output, and that muscle doesn't grow if it's never used. Session 03 needs a moment for both of them to argue against their own briefs.

**Two participants engaged in real back-and-forth.** Ivan went through three brief drafts. Marin had a full project reframe driven by a research check. Those two used the session as it was designed.

**API anxiety surfaced.** Ivan named it. Three of the four projects in the room will hit an API at some point (Marin already has Claude Sonnet 4 wired in; Ivan needs GPT Image 2; Paula's session-10 AI summary layer will need something). A group walkthrough belongs in session 04 or 05.

---

## What worked / What didn't

**Worked:**

- All four projects produced written briefs in markdown that the participants can now argue with.
- Three of the four briefs had at least one decision flip during the session. That's the workshop doing its job.
- The competitive research format ("does well · distinctive · what not to copy · one technique to borrow") produced concrete inputs the briefs actually used.
- The Claude.ai outages didn't derail the session. The room multitasked, googled, talked through projects, resumed when the API came back.

**Didn't:**

- Two of the four participants didn't engage with Claude's pushback. Different reasons in each case, but the result is the same: a brief that hasn't been resisted is fragile.
- The end-of-session check-in questions are unpopular. Some participants skipped past the harder ones. Worth cutting one of the five.
- The outage was an unplanned hour. Hard to attribute exactly, but participants noted starts and stops.

---

## Facilitator notes for next session

- Ask Ivo and Paula to deliberately argue against their own briefs. Pick two items each, force a counter-argument.
- Push Marin to commit on chapter scope before session 03 ends. Reframe: chapter 1 fully built is a working gift; the rest become drops over time.
- Help Marin scope what "enough detail per scene" actually looks like for trip data ingestion. Without a target it expands forever.
- Allocate 30 minutes of session 03 or 04 to Paula's PBIS / leaderboard psychology research.
- Plan a 15-minute group walkthrough of API basics for session 04 or 05. Frame as the boring practical part.
- Cut one of the five check-in questions. Keep "best and worst Claude moment."
- Session 03 is moodboards for Ivo and Ivan, philosophy + art direction for Paula, chapter-scope commit and trip-data format for Marin.

---

## Quotes from the session

> *"It should be a wrapper that converts your inputs into as perfect as possible prompts for the AI."*
> — Ivan, on what the Mockup Generator actually is.

> *"No text inputs in UI because they force me to think and thinking is tiresome."*
> — Ivan, on why the chips are the prompt.

> *"Students will not be able to use it. Only the teacher, and students will just look at them."*
> — Paula, locking in the scope cut.

> *"Bad points would end up in extra homework and such, nothing digital."*
> — Paula, locking in the second scope cut.

> *"I'm scared of the API connection."*
> — Ivan, plainly. Worth raising with the room.

---

## Blog post outline — update

No changes to the structure from week 01. The week-02 material strengthens chapter 1 ("The brief that changed") since every participant produced a written, scoped brief and three of the four had real iteration on it.
