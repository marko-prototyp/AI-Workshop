# Marin — running notes

> Marko's working notes on Marin across the workshop. Observations, decisions, quotes, things to flag for the case study.

---

## Project

*Naučimo Hrvatski.* A language-learning app for one specific person. Marin's long-distance girlfriend, in Philadelphia, learning Croatian for her eventual move to Osijek. Five scenarios mirror the actual FaceTime calls they have. AI plays a Croatian boyfriend character. Replies in Croatian with English translations in brackets. Corrects gently as you go. Not a generic textbook. Built around one real relationship.

## Design direction

Not yet defined. The product premise is sharp (real-relationship scenarios, AI conversational partner). Visual direction to be shaped in session 02 and 03.

## Scope decisions

- Working prototype already exists from session 01. Five scenarios: *Jutarnji poziv*, *Večernji razgovor*, *Na tržnici*, *Grad Osijek*, *Planiranje posjeta*.
- Not building from scratch. Built on AI conversational generation.
- Cadence committed: one productive hour per week.

## Watch-outs

- "Better than Duolingo" is the easiest claim to over-promise. The honest version is narrower and stronger. Duolingo doesn't have Croatian. *Naučimo Hrvatski* does, and is built around one specific relationship's conversational patterns. That's the project. Anything broader is feature drift.
- He joined mid-session and didn't go through the scope-naming conversation. The "what I am *not* building" needs to be done before session 02.
- The differentiator from Duolingo isn't clear in his head yet. Sharpen before week 03 when references get picked.

## Quotes

- > "Croatian is super hard, and I want to be better than these other apps out there. Find a new way of learning Croatian." — Marin, Session 01

## Artifacts to keep for the case study

- Screenshot of the five scenario cards built in session 01 (*Jutarnji poziv*, *Večernji razgovor*, *Na tržnici*, *Grad Osijek*, *Planiranje posjeta*).
- The working prototype URL when it stabilises.
- The original Claude conversation where the app was scaffolded.

## Per-session running log

### Session 01

- Ran the session solo from the handbook on the workshop site. Asked to join as a participant after.
- Mobility-industry designer + content creator by day. Strong communication instincts.
- Brought in a personal project, not work. Language app for his girlfriend.
- Already has a working prototype from his one solo hour with Claude. Five scenario cards. AI conversational partner.
- Hasn't named scope constraints yet. "Once a week for an hour" is a cadence commitment, not a scope decision.
- "Better than Duolingo" framing needs sharpening. Honest version: Duolingo doesn't have Croatian. Specific version: built around his girlfriend's life.
- His solo run is implicit proof the curriculum works without a facilitator in the room. Worth flagging in the case study.
- **Push for next session:** sit down with him and do the scope-naming pass we did with the others. What is he *not* building?

### Session 02

- Reframed the whole project. Research check on 10 indie language apps → no app is built around a couple's actual relationship. That's the gap.
- New shape: a memory book, not a conversation app. Six chapters mapped to actual trips since they met. Each chapter opens at the airport.
- Mechanic: to turn the page you do something in Croatian. Most scenes are "describe the photo." Each chapter ends with a story rebuild in Croatian.
- No streaks, no hearts, no guilt notifications. Described himself as refusing to make his girlfriend feel bad for missing a day.
- Claude pushed back on six-chapter v1 scope. Recommended building chapter 1 fully first. Hadn't committed yet.
- Content work flagged as the unstarted task — photos, contexts, what they ate, what they said.
- **Push for session 03:** Visual direction. Also: commit on chapter scope (1 fully or all six).

### Session 03

- Visual direction locked. Three directions generated (Memory Press, Tender Thread, Adriatic Dusk), selected Adriatic Dusk.
- Direction: glassmorphic, full-bleed trip photography as background, frosted glass containers, Playfair Display italic for Croatian language and scene titles, DM Sans for UI chrome.
- First scene built: Scena 3 · Sarma kod bake. Quote from the narration card: *Bakina kuhinja miriše na nedjelju, na dim i na sarmu.*
- Friction: Claude kept defaulting away from DM Sans despite the brief. Took a direct correction and reference uploads to hold it.
- 15-item banned moves list. Direction fully committed.
- Most satisfied participant in the session. His visual reference was specific and unusual enough that the model didn't have a direct shortcut to it.
- **Content work still not started.** The scenes can't be specific until the writing exists.
- **Push for session 04:** Feed Claude the actual trip content. Stories, context, photos. Do this before any build work.

### Session 04

- Hit 100% usage limit 30 minutes in. Switched to Sonnet, continued, then moved to manual content writing. The session then continued as a 1:1 follow-up that closed the gap.
- **Build brief:** Moved from rough draft to build-ready spec in four moves. Critiqued v1, reviewed two parallel agent rewrites, merged into v2.0 resolving five open problems: the Saved Retelling artifact, the no-redo framing, the correction logic, the AI's runtime scope, the learning model. Then came the pivotal decision: cut free typing entirely in favour of chip-based answers. That became v2.1.
- **V2.1 tradeoff:** Removed all runtime AI, eliminated Croatian-validation risk, solved the diacritic-keyboard problem, lowered build cost. Cost: some active-recall depth, partly recovered through per-scene difficulty ramp. The call landed on buildability, made deliberately.
- **Wireframes:** Six screens covering every required state from the spec, in priority order. Architectural pivot validated. Content-sourcing decisions locked for every authored piece per scene.
- Quote: *"We decided not to make Kenzie write anything herself because that is too complicated."*
- **Five open prototype questions:** chip placement gesture, sentence-end gesture in Story Rebuild, Word Bank drawer height, stall nudge timing, HR/EN toggle position. None block the build; all need answers before the interactive prototype.
- The usage limit forcing manual content writing was the right outcome. The trip descriptions are the foundation; everything else is decoration without them.
- **Push for session 05:** Come in with written content for at least Chapter 1. Build the first real scene from real material.

### Session 05
- End-to-end clickable smoke test, single HTML file: recap → chapter shelf → Chapter 1 cover → scene player → story rebuild → chapter complete → vocab shelf + texting bridge. Working nav, fake data, no polish. Exactly what the session asked for.
- Two fast corrections mid-build: cast locked to two (Marin and Kenzie, one invented character removed entirely), and interaction model changed from typing to drag-a-word-into-the-blank on every screen. The second extends the W04 no-free-typing call into a concrete mechanic.
- Claude kept inserting imaginary characters despite the locked cast. His repeated correction: "No Marko, just Marin here." Keep the quote.
- Chapter 1 scope fixed: 11 scenes, one photo and one interaction per scene. He has picked the 11 photos and written 11 descriptions. The content work flagged since session 02 has started, ahead of the build. Big.
- Clicked through as Kenzie. Findings are the v2 requirements list: wrong-answer state gates but doesn't teach, no flipping back to an earlier photo, vocab shelf unlocks after she needs it, no saved-place reassurance, chapter dead-ends.
- Process miss: the planned W04 wireframe/state-map comparison didn't run, files weren't available in the session. Fix: keep project artifacts reachable in-session.
- Mood: "Only good moments today." Positive, wants to keep iterating. Said he'll work on it at home.
- First peer-review round: clicked through the others' prototypes and gave and took suggestions. Took part in the group agreeing a shared set of UX rules.
- **Push for session 06:** Structure the Chapter 1 content with Cowork before the session, so the 11 descriptions become per-scene content the prototype can absorb. Then the v2 state fixes.

### Session 06
- The one comp in the room that held the brief. Consolidated four planning docs into one Design System Document, locked the type scale to "Balanced," reconciled a conflict between the two briefs over the glass recipe. Wrote a reusable anti-stock SKILL.md (holds strictly to pasted constraints, no invented defaults). Hardened the Scene-screen comp brief, picked the banned moves most likely to break on that screen, audited the draft against the skill.
- First Claude Design comp: Scene 03 "Sarma kod bake." Held the hard constraints — Marin as a text pill, chips as warm tiles (no green/red), warm (non-blue) toggle, gold-bordered Nastavi not a filled Submit. Screenshot kept. **Why it held:** his visual language is specific/unusual enough that the model has no stock shortcut. Same finding as Session 03.
- Big structural calls, which clear most of the W05 v2 list: app dropped the separate AI tutor character, now first-person as the real Marin talking to Kenzie directly; typing replaced by drag-a-word-into-blank everywhere; **wrong answer now teaches** (shows the word's meaning before retry) — fixes the W05 "gates but doesn't teach"; Chapter 1 locked at 11 scenes; **finale rebuilt** into dragging full sentences into chronological order (real boss level), **vocab shelf now reachable mid-chapter**, and **Kenzie can flip back to earlier photos** — fixes three more W05 findings (dead-end chapter, late vocab unlock, no flip-back).
- Q&A: "I designed in Claude Design. I got the first design version." Best: "he designed the first solid example of the future — I'm quite satisfied." Worst: nothing. Quote: *"I'm satisfied with how Claude was steering me."* Next: organise content, let Cowork pull from his Apple Notes app.
- Pattern to keep flagging: he's the most satisfied participant again, and it tracks with the specificity of his direction. Use his project as the in-room example of why a distinctive visual language survives the model's defaults.
- **Push for session 07:** Get the Chapter 1 content out of Apple Notes via Cowork into per-scene content the comp can absorb. The direction is working; the bottleneck is now content, not design.
