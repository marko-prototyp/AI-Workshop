# Ivo — running notes

> Marko's working notes on Ivo across the program. Observations, decisions, quotes, things to flag for the case study.

---

## Project

Personal Cycling & Training Dashboard — a single-purpose web tool that ingests Garmin/HR/power CSV exports and surfaces power zones, training load, ride history, performance trends.

## Design direction

Clean, data-dense UI. No decorative fluff. Dieter Rams applied to athletic data. Structured visualizations on a consistent internal design language.

## Scope decisions

- **No live API integration.** CSV export from Garmin Connect. Keeps the budget on design + insight, not plumbing.

## Watch-outs

- "Data-dense" needs an early visual test. Dense + readable is hard.
- Risk: utilitarian → gray and joyless. Worth pushing on warmth/character without decoration.

## Quotes

- _none yet_

## Artifacts to keep for the case study

- _to add as program progresses_

## Per-week running log

### Week 01
- Came in with the project mostly defined. Confident, scoped.
- Engineering mindset showed: named the constraint himself ("no live API") before being asked.
- The Dieter Rams reference is doing real work, not decorative name-dropping.
- **Push for next week:** 5 specific data-dense reference interfaces. Not Garmin clones.

### Week 02
- _tbd_

### Week 03
- Best brief in the cohort — but the wrong shape. Specification vs. constraint system.
- Identified 19 AI tells in the first-pass dashboard. Most revealing: a rationale strip explaining why the design was unconventional. Used that as the anchor for the brief rewrite.
- Widget-first approach worked. Built a 320×420 testbed before scaling to the full dashboard.
- New brief opens with cultural anchors (Dieter Rams, Nothing OS). Closes with: *a style guide tells you what something looks like; a constraint system tells you what it can never be.*
- Both briefs are in the repo. Contrast is the artifact.
- **Push for week 04:** Side-by-side build test between old brief and new. Validate the constraint approach.

### Week 04
- Most structured session in the cohort. Four artifacts, nine screens, load-bearing cut list.
- The cut list is the design thesis. Each cut has a documented reason it would weaken the product.
- Cross-screen principles landed clearly and specifically. Worth citing in the case study.
- Content brief outcome: zero AI-generated content in scope. Hardcoded libraries for all prescription/tooltip copy. Strong, early position.
- Friction point worth flagging: Claude's one-question-at-a-time elicitation with bundled recommendations. Ivo took the recommendation 3 of 4 times and named the pattern himself. Genuine self-awareness. Build this into the brief-review prompts — present options neutrally or surface the deferral risk explicitly.
- Quote: *"If a flat list ever feels necessary, Calendar isn't doing its job."*
- **Still stuck:** Form factor — web, mobile, or both. Gates the tech stack. No defensible answer yet.
- **Push for week 05:** Commit to form factor before anything else. Then stand up the skeleton.
