# Ivo Anić — Wattlog

*Personal cycling training log for self-coached power-meter cyclists*
*AI for Designers — 12-session workshop*
*Last updated: 13 May 2026 (end of Session 02)*

---

## At a glance

| | |
|---|---|
| **Project** | Wattlog |
| **Type** | Personal tool, software product |
| **Track** | UI/UX |
| **Built in** | TBD (open question — web, native mobile, or both) |
| **Time budget** | 1–2 hours per session × 12 = ~18–24 hours total |
| **Primary user** | Ivo himself — XC and enduro rider, self-coached |
| **Status** | Project brief locked. Moodboard in session 03. |

## The designer

Ivo came into the workshop with the clearest pre-existing project of the cohort. He's an XC and enduro rider who trains on a road bike and a smart trainer, targets 7–8 races per season, has no coach, and makes all training decisions from data. He's used most of the tools on the market and has formed strong opinions about each. His framing of the project as "the tool I would actually use every day" is the simplest success metric in the room.

He reads the briefs. He pushes back when something is wrong. He's not chasing a portfolio outcome. The project is for himself first.

## The project — current state

A personal cycling training log that delivers intervals.icu-level analytics with the clarity and daily prescriptiveness that none of the existing tools get right. The wedge: outdoor, self-coached cyclists are underserved. WHOOP does diagnosis-to-prescription for general fitness. TrainingPeaks does it if you're paying a coach. Zwift does it if you're indoors. The outdoor, coach-less, prescriptive cycling tool doesn't exist well yet.

### Success metric

"I open Wattlog every day. It changes how I train. My performance at races improves over a season." Not users, not revenue, not portfolio.

### The four signals it's working

- Look at any completed ride and immediately understand whether it was a good training stimulus.
- Know what kind of session to do today based on the load/recovery cycle.
- See at the start of a race block whether form is competitive or needs more time.
- Compare the power curve season-over-season.

## Scope

### P0 — must exist before anything else is useful

1. Activity upload and parsing (.fit files from Garmin and smart trainer exports).
2. Ride detail view (power + HR + cadence overlaid, zoomable, FTP-based zones).
3. Auto-interval detection (parse the file, identify sustained efforts, surface avg/normalised power, IF, TSS).
4. FTP / fitness profile (computed from best efforts in the last 90 days across 5s/1min/5min/20min).

### P1 — core to the daily loop

5. Training load dashboard (CTL/ATL/TSB with named status).
6. Daily prescription (one verb, one number, no paragraph).
7. Season calendar (planned vs actual, races marked, weekly TSS).
8. "This effort vs your history" callout (auto-surface PBs and notable comparisons).

### P2 — after P1 is solid

9. Power-duration curve (current vs 90-days-ago vs season-best).
10. Race predictor / target power plan (export to Garmin optional).
11. Training status band with trend arrow.
12. Per-ride notes (free text, searchable, anchored to activity).

### P3 — later if the core loop is working

13. Auto-detection of fitness signature changes.
14. Equipment tracking with mileage rollover.
15. Workout builder with Garmin export.
16. Year-on-year comparison charts.

### Explicitly not building

- Social platform (Strava exists).
- Coaching tool (Final Surge and TrainingPeaks exist).
- Video workout platform (Zwift and SYSTM exist).
- General fitness / health tracker (WHOOP and Garmin Connect exist).
- Route planning (Komoot exists).
- Hardware product.
- Free tier with crippled analysis.
- Proprietary vocabulary. Every metric uses standard sport-science names with a plain-English tooltip first time.

## Origin story

### Session 01 — Direction

Came in with the idea mostly formed. Used the session to interview for strengths, energy, and audience. Confirmed direction.

### Session 02 — Research & Synthesis

The session ran straight from competitive research to a full project brief. Eleven training tools analysed in a comparison matrix with four fields each: does well, distinctive, what not to copy, one technique to borrow.

**Tools surveyed:** intervals.icu, TrainingPeaks, Strava, Garmin Connect, Xert, Wahoo SYSTM, WHOOP, Runalyze, Final Surge, Stryd PowerCenter, Zwift.

**What the research locked in:**

- **From intervals.icu:** depth of analysis is possible without paywalls. The opportunity is the same depth, presented clearly.
- **From TrainingPeaks:** the PMC chart (CTL/ATL/TSB) is the industry reference. Workout compliance scoring is a useful metric to borrow. Do not paywall analysis features.
- **From Strava:** auto-surfacing PBs without the user setting goals is the right pattern. Never take features away.
- **From Garmin Connect:** the coloured training status band translates a TSB number into a human-actionable label.
- **From Xert:** continuous fitness signature updating from every hard ride. Don't invent proprietary vocabulary.
- **From Wahoo SYSTM:** multi-duration fitness profile (NM/AC/MAP/FTP) is a better model than single FTP.
- **From WHOOP:** the diagnosis-to-prescription handoff is the right UX. Don't over-claim causality from limited data.
- **From Runalyze:** equipment tracking with auto-mileage rollover; race predictor as engagement hook. Configuration is not a product.
- **From Final Surge:** per-workout comment threads anchored to the file.
- **From Stryd PowerCenter:** course-aware pacing plans.
- **From Zwift:** auto-categorisation by computed fitness removes self-assessment from onboarding. Don't gamify for its own sake.

The session closed with Claude challenging the brief across six areas: MVP definition, data quality prerequisites, sustainability, and three others. Ivo's read was that the challenge wasn't relevant to where the project actually is.

## Decisions committed to

| Session | Decision |
|---|---|
| 01 | Project direction. Personal cycling training log for self-coached riders. |
| 02 | Sixteen features ranked P0 through P3. Seven items on the not-building list. |
| 02 | Wedge confirmed: outdoor, coach-less, prescriptive cycling. |
| 02 | No proprietary vocabulary. Standard sport-science terms with tooltips. |

## Open questions

### Product

1. Tech stack — web, native mobile, or both?
2. Activity sync — manual .fit upload only, or Garmin/Wahoo/Strava API sync?
3. Data model for race events — how marked, how does prescription logic use proximity to race day?
4. At what point (if ever) does Wattlog become something other people can use?

### Visual

5. Visual direction. Session 03 will produce the moodboard.

## Artifacts produced

- 11-tool competitive matrix (session 02).
- `wattlog-brief.md` — full project brief (session 02).

## Quotes worth keeping

None flagged so far. Ivo's check-ins are precise and unsentimental. He writes briefs, not aphorisms.

## What's next

**Session 03:** moodboard for the visual side of Wattlog.

**Nothing stuck.** Ivo entered the workshop with the project already shaped and is ahead of pace.

## Facilitator notes

Ivo is the participant most likely to coast on his own clarity. He came in converged, the session structured what he already knew, and his report was "everything worked." That's true. It's also the report that worries me, because the workshop's value is partly in pushing the participant beyond what they could have done alone. With Ivo, the Claude-pushback exercise didn't bite because the project is too well-formed to push against on day two.

Action for session 03: ask Ivo to deliberately argue with his own brief. Pick three P0 features and force a counter-argument. The muscle the workshop is supposed to build is the muscle of resisting AI output, and if Ivo's brief never gets resisted, that muscle never grows.

The visual side is where the workshop will earn its keep for him. He has no strong visual prior on the project. Session 03 should push hard on art direction and force aesthetic specificity early.
