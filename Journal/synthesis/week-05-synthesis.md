# AI for Designers — Week 05
## Make it clickable. Smoke test the idea.

**Session:** Week 5 of 12
**Date:** 10 June 2026 (one week skipped after week 04)
**Participants present:** 3 (Paula, Ivo, Marin). Ivan absent, third session in a row

---

## The session, in one line

First time the briefs came to life. Everyone built a clickable single-file smoke test, iterated up to three versions, and walked their own flows. Proof of concept landed for all three projects.

---

## Facilitator observation

This was an intensive session that needed real facilitation. Unlike the previous two, the structure did not carry itself. Everyone asked for guidance and reviews throughout, and the room leaned on me more than it has in a while. The handbook flow was right, but having a clickable artifact to react to opened up far more questions per person, and the peer review added a second live thread to steer.

**Fable 5:** Launched a few days before the session, so this was the first run on it. First versions were okay but carried visual, logical and UI errors and inconsistencies. Iteration fixed most of it: most participants generated up to three versions, each better than the last.

**The artifacts look bad, by design.** Simple components, minimal colors. The design was not the point; testing UX and flows was. That framing held: nobody got stuck polishing.

**Engagement shift, worth recording.** This is the first session where participants showed real interest in their personal app as a thing they'll keep building. Almost all said they'll work on it at home, outside the planned hour. That has not happened before.

**Brief accuracy.** Seeing the briefs move exposed their gaps. Some felt their briefs were not 100% accurate and could use improvement. Some even wanted to redo the whole process to make it perfect. Watch this: redoing the process is perfectionism wearing a process costume. Revising the brief where the smoke test contradicted it is enough.

**First peer review.** This was the first session where participants engaged with each other's work, not only their own. They clicked through prototypes that weren't theirs, suggested what to change or improve, and agreed on a set of shared UX rules (Marko: the specific rules aren't recorded here, see the note below the practices list). It needed more facilitation than usual to stay on track, and everyone asked for guidance and reviews throughout. The increased interaction between participants was the standout, and it's worth building into the format deliberately rather than letting it stay incidental.

---

## What each participant produced

### Ivo — Wattlog (smoke test, nine screens end to end)

Single-file clickable smoke test (`wattlog-smoke-test.html`) covering all nine screens: five top-level tabs, drill-throughs with back affordance and no nav, a simulated three-step upload parse that auto-navigates to Ride Detail, and the Calendar blank-day sheet routing to both creation flows. Fake data internally consistent: FTP 284 → threshold prescription 270–298 W.

**Two notable moments:**
- Claude surfaced a conflict between the wireframes and the design brief (two different Today screens) before finalising, rather than silently picking one. Good model behavior; worth citing.
- Ivo's prompt: *"Walk through my artifact as if you were me… Don't critique the design. Critique the experience."* Produced a seven-point experience walkthrough framed as a real Tuesday-evening upload session. Biggest finding: the core loop never closes. After uploading, the prescription doesn't change, leaving the prototype "a static poster of the concept" until the prescriptive layer can be felt at least once. The file was updated in response.

**Q&A highlights:** Best moment: "We made the planned session details." Worst: "Bad styling :D". Committed decision: planned sessions in detail. Artifact to keep: the final version of the html. Next: "I'd work a bit more on the way of displaying things, but I guess I'll cover that in the design phase."

**Carried forward from W04, still unresolved as far as the notes show:** form factor (web, native mobile, or both). The smoke test is tabbed HTML; that's a prototype convenience, not a decision.

---

### Ivan — Mockup Generator

Absent again. Three sessions missed in a row (03, 04, 05). The path-back-in conversation flagged after week 04 has not produced a return yet. Needs an actual decision: compressed onboarding, or accept he rejoins at the build phase with a reduced scope.

---

### Marin — Naučimo Hrvatski (smoke test, full flow)

End-to-end clickable smoke test as a single HTML file: recap → chapter shelf → Chapter 1 cover → scene player → story rebuild → chapter complete → vocab shelf + texting bridge. Working navigation, fake data throughout, no polish. A flow test, not a craft pass.

**Two corrections reshaped the build fast:**
- Cast locked to two people, Marin and Kenzie. One invented character removed entirely. Claude kept inserting imaginary characters; the correction that kept repeating: "No Marko, just Marin here."
- Interaction model changed from typing to drag-a-word-into-the-blank across every screen, on the principle that writing Croatian unprompted is too hard for a beginner. This extends the W04 no-free-typing call into a concrete mechanic.

**Scope locked:** Chapter 1 fixed at 11 scenes. 11 photos, one photo and one interaction per scene. Marin has already picked the 11 photos and written 11 descriptions, one per photo. The content work flagged since session 02 has finally started, and ahead of the build.

**Walkthrough-as-Kenzie findings (v2 requirements):** wrong-answer state gates progress but doesn't teach; no flipping back to an earlier photo; vocabulary shelf unlocks only after she no longer needs it; nothing reassures her that her place is saved; the chapter ends in a dead end.

**Process miss:** The planned W04 wireframe/state-map comparison didn't run — those files weren't available in the session. The build itself was used to document the states a v2 will need. Fix for next time: project files reachable in-session, in the Claude Project or the repo.

**Q&A highlights:** "Only good moments today." Committed: the prototype stands, content preparation is next, with Cowork. Positive about the future and looking forward to iterating.

---

### Paula — ClassArcade (smoke test, full app end to end)

Single-file clickable smoke test covering Class Picker, Main Arcade, the two-step New Classroom flow, Edit Roster, the Give Points panel and the classroom dropdown, populated with the real seed rosters. Three full versions in one session, each better than the last. Same Fable 5 iteration pattern as the others.

**Teacher-walkthrough findings, all fixed in session.** The walkthrough surfaced three failures, all trust-level rather than cosmetic:
- The singular "+1 to one student" case was the slowest action in the app. Fixed with per-row ± buttons.
- No undo for a point event. Fixed with a one-level undo chip.
- Feedback got lost because the list re-sorted before the flash. Fixed with flash-then-resort sequencing.

**Scope and reconciliation.** The W04 30-second roster-delete timer was replaced with a "nothing is real until Save" model. Three features (search, sort, point categories) were knowingly added past the week-3 scope lock. Rather than quietly absorb them, Paula amended the lock and re-armed it in a written reconciliation brief (W04 plan vs. build diff) that also updated the wireframes and state map to match the build, including eight UI states the original plan never named. One sort-rule conflict was closed in session ("keep the last name rule").

**Second deliverable, and an honest flag.** The reconciliation brief is the session's second artifact beyond the prototype. It flags where the build got worse: the vertically stacked podium now reads as a shorter copy of the student list, costing the leaderboard its "designed moment." Recovering that is the main visual-design debt going into the next sessions, and it lines up exactly with Paula's stated next step.

**W04 open questions, forced by the build.** The per-row ± buttons mean a minus action now exists in the build, and point categories add per-category tallies. The open teacher-facing decision: do per-category tallies and a minus button belong on the projected screen the class sees at all, given the project's "calm, not surveillance" principle? This is the natural "ask the room" question Paula left unanswered in Q5, and it should lead her next session.

**Q&A highlights:** Best moment: "quick result and good understanding of what I want to fix." Worst: "Claude adding some things that weren't specified anywhere" (the same three features the reconciliation brief had to absorb). Committed: "I want to give the project more time to make it really good. Also wanna take time to create some of the visuals I can use later on in the project." Artifact to keep: "the prototype we made of the app." Next: "Work more on the ux, and work more on the visuals." Stuck: nothing named.

---

## Patterns across the group

**Proof of concept changes motivation.** Seeing the brief as a clickable thing did more for engagement than any session so far. First mention of working outside the hour, from almost everyone.

**Iteration works on the new model the same way.** First Fable 5 versions had errors; by version three the artifacts were solid. The lesson from week 03 (iterate against specifics, not vibes) transferred without re-teaching.

**Walking the prototype beats reviewing it.** All three check-ins converged on the same move independently: step through the artifact as the user. Ivo prompted Claude to do it as him; Marin clicked through as Kenzie; Paula ran a teacher-walkthrough. All three produced the session's most valuable findings (the unclosed core loop; the five v2 gaps; Paula's three trust-level failures).

**Briefs are now testable.** The smoke tests turned brief inaccuracies from a feeling into a list. The risk is the perfectionist response (redo everything) instead of the surgical one (patch what the test contradicted). Paula's reconciliation brief is the model here: she didn't rebuild the artifact, she captured the diff and re-locked scope in writing.

**The artifact is a UX test, not the app.** Marko's note to the group after the session: the HTML artifacts are only for testing the experience. Don't burn tokens reworking them. The higher-value move is to update the brief using the comparison answers and personal comments, so it's as polished as possible before the real build. The first real screen gets built next session; the group is still at the start. Paula already did exactly this with her reconciliation brief. The others should follow it.

---

## Shared UX practices the group agreed on

> **Marko: this list is not yours yet.** You told me the group agreed on "some of the best UX practices" but didn't say which. The items below are my guess, reverse-engineered from the problems the three prototypes hit. They are plausible but unverified. Replace them with the actual rules the room named, or delete the ones that didn't come up.

Candidate practices (inferred, to confirm):

- **The action you do most should be the fastest.** Tied to Paula's +1-to-one-student being the slowest path in the app.
- **Anything reversible should be reversible; anything destructive shouldn't commit until you confirm.** Tied to Paula's one-level undo and the "nothing is saved until Save" model.
- **Don't lose feedback to a re-sort.** Tied to Paula's flash-then-resort fix.
- **No dead ends. Every state has a way forward.** Tied to Marin's chapter that ended cold and Ivo's loop that never closes.
- **A wrong answer should teach, not just block.** Tied to Marin's wrong-answer state.
- **Reassure people their work is saved.** Tied to Marin's prototype giving Kenzie no sense her place was kept.

## What worked / What didn't

**Worked:**
- Smoke-test-before-craft framing. Nobody polished; everybody tested flows.
- Ivo's "critique the experience, not the design" prompt. Reusable across projects; consider adding to the handbook prompts.
- Claude surfacing the wireframe/brief conflict instead of resolving it silently.
- Marin's cast lock and drag-a-word correction. Fast, decisive, both within minutes of seeing the problem.
- Paula's reconciliation brief. Three out-of-scope features handled by amending and re-locking the brief, not by quietly letting scope drift. The brief also documents eight previously unnamed UI states and is honest about the podium regression.
- Paula's teacher-walkthrough fixing all three trust-level failures in the same session they were found.
- The first peer review. Participants reviewed each other's prototypes and agreed on a shared set of UX rules. The increased interaction between participants was a clear positive.

**Didn't:**
- W04 artifacts unavailable in Marin's session, so the planned comparison step got skipped.
- Claude inserting invented characters into Naučimo Hrvatski repeatedly, despite the locked cast.
- Claude adding features to ClassArcade that no brief specified (search, sort, categories). Paula's worst moment, and the reason the reconciliation brief was needed.
- Ivan absent for a third straight session.

---

## Facilitator notes for next session (06 — Figma + Claude)

- **Ivo:** The unclosed core loop is the thing to carry. The design phase should make the prescription respond to an upload at least once. Form factor still needs a named decision before the build.
- **Ivan:** Decide the re-entry plan. Three missed sessions is past "tag along."
- **Marin:** Content structuring with Cowork before the session. 11 descriptions exist; turn them into per-scene content the prototype can absorb.
- **Paula:** The reconciliation brief already did most of the W04 cleanup. The live question is now teacher-facing: do per-category tallies and a minus button belong on the projected screen at all, given "calm, not surveillance"? Decide that before the first real screen. The podium regression is the visual debt to recover, which matches her stated next step (UX plus visuals).
- **Group:** Everyone said they'd work at home. Check next session whether they actually did, and what that did to the projects.
- **Group (token discipline):** Per Marko's post-session note, the smoke-test artifacts are UX tests, not the app. Don't burn tokens reworking them. Update the brief from the comparison answers and personal comments first. The first real screen gets built next session. Paula's reconciliation brief is the template to point the others at.
- **Group (peer review):** The peer review worked, so make it intentional. Build a short, structured review slot into the format with clearer prompts, so it carries less facilitation load than it did this session. Keep the shared UX practices list visible during the build phase.

---

## Quotes from the session

> *"No Marko, just Marin here."*
> — Marin, the correction that kept repeating

> *"Walk through my artifact as if you were me… Don't critique the design. Critique the experience."*
> — Ivo's prompt of the session

---

*Session held 10 June 2026 · Facilitated by Marko · 3 of 4 participants present · all four deliverables complete*
