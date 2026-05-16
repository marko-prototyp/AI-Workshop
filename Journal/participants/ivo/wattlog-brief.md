# Wattlog — Project Brief

_Last updated: May 2026. This is the document we return to every session._

---

## What I'm building

A personal cycling training log for self-coached power-meter cyclists that delivers intervals.icu-level analytics with the clarity and daily prescriptiveness that none of the existing tools get right.

---

## Who it's for

**Primary user: me.**

Specifically: an XC and enduro rider who trains on a road bike and a smart trainer, targets 7–8 races per season at progressively higher competitive levels, and has no coach. All training decisions are made personally, based on data. The app needs to support that loop — ride, upload, understand, decide what to do next — without requiring sport-science fluency to operate.

No secondary user personas at this stage. Coaching features, social layers, and multi-athlete views are out of scope.

---

## What success looks like

I open Wattlog every day. It changes how I train. My performance at races improves over a season.

That's the only metric that matters at this stage. Not users, not revenue, not a portfolio piece. If I'm not using it daily and riding faster, it hasn't worked.

Concrete signals that it's working:
- I can look at any completed ride and immediately understand whether it was a good training stimulus
- Before each ride I know what kind of session to do based on where I am in my load/recovery cycle
- At the start of a race block I can see whether I'm in shape to compete or whether I need more time
- After a full season I can compare my power curve to where it was 12 months earlier

---

## Features — priority order

### P0 — Must exist before anything else is useful

1. **Activity upload and parsing** — accept .fit files (from Garmin and smart trainer exports). Parse power, HR, cadence, elevation, speed, and timestamp at full resolution. This is the data foundation everything else rests on.

2. **Ride detail view** — time-series chart of power + HR + cadence overlaid. Zoomable. Lap/interval markers. Colour-coded power zones based on personal FTP. This is the screen I'll live in after every ride.

3. **Auto-interval detection** — parse the file and identify sustained power blocks above a threshold relative to FTP without me marking them. Surface each effort's avg power, normalised power, duration, IF, and TSS. This is the feature that makes uploads feel like analysis, not filing.

4. **FTP / fitness profile** — compute from best efforts in the last 90 days across multiple durations (5s, 1min, 5min, 20min). Update automatically when a new best is set. No manual test entry required. Display as a power-duration curve I can watch move.

### P1 — Core to the daily training loop

5. **Training load dashboard** — CTL (chronic training load), ATL (acute training load), TSB (form) plotted over time. Show the current state as a named status (productive / peaking / fatigued / detraining / overreaching) with a one-line plain-English explanation. Not just the number.

6. **Daily prescription** — based on current TSB and days to next race event: one recommendation when I open the app. "Recovery day — keep power under Z2" or "Green light — good day to push threshold work." One verb, one number, no paragraph.

7. **Season calendar** — calendar view with planned vs actual workouts. Race events marked. Weekly TSS plotted as a bar. I should be able to see at a glance whether my load is building toward a race or collapsing.

8. **"This effort vs your history" callout** — on every completed ride, automatically surface personal bests or notable comparisons: "2nd-best 20min power", "highest TSS ride this year", "first time over 200W normalised for 3hrs". No goal-setting required — the system finds the story.

### P2 — High value, build after P1 is solid

9. **Power-duration curve** — best power at every duration from 5s to 3hrs, plotted as a curve. Update after every ride. Show current vs 90-days-ago vs season-best. This is the single clearest picture of whether I'm getting stronger.

10. **Race predictor / target power plan** — from current fitness profile, project realistic output targets for a given event distance and elevation profile. Update weekly. Optional: export as a structured workout to Garmin.

11. **Training status band** — classify current form into 5–6 named states as above, but with a trend arrow (improving / holding / declining) so I can see direction, not just position.

12. **Per-ride notes** — free-text field anchored to the activity. "Legs felt heavy in the second interval block." Searchable. Becomes useful after 6 months of entries.

### P3 — Later, if the core loop is working

13. Auto-detection of fitness signature changes (threshold drift, fatigue accumulation patterns over a training block)
14. Equipment tracking with mileage rollover (bike components, tyres, chain)
15. Workout builder with Garmin export
16. Year-on-year comparison charts

---

## Research — what the competitive landscape taught me

### intervals.icu
The closest analytical product to what Wattlog should be. Free, fast, deep. The auto-interval detection is the feature that makes it feel intelligent. **What it got wrong:** UI density so extreme it reads like a Bloomberg terminal. Acronyms everywhere, no progressive disclosure, hostile to anyone not already deep in training science. Wattlog's opportunity is that same analytical depth presented clearly.

### TrainingPeaks
Industry reference for the PMC chart (CTL/ATL/TSB). Workout compliance scoring — a 0–100 number showing how closely an actual file matched prescribed intervals — is a genuinely useful metric to borrow. **What it got wrong:** half the useful analysis is paywalled at $20/mo. The free tier is deliberately crippled to upsell. Users resent it loudly. Do not gate analysis features.

### Strava
Best at the "this effort vs your history" surface — surfacing personal bests automatically without the user setting goals. Local Legend (rewards consistency over peak fitness) is smart product design for retention. **What it got wrong:** paywall creep. Features that were free for years got pulled behind subscription and torched user trust. Never take features away.

### Garmin Connect
Best all-day data fusion — sleep, HRV, stress, and rides in one timeline. The coloured training status band (productive / maintaining / overreaching) translates a TSB number into a label a human can act on. **What it got wrong:** six menus deep to find a power-curve chart. The same metric named differently in three places. Good data buried in terrible IA.

### Xert
Best technical idea in the category: continuously update the fitness signature from every hard ride, no formal FTP test required. **What it got wrong:** invented its own vocabulary (XSS, Strain, Focus, Specificity) and provided no glossary. New users bounce in week one. Never invent proprietary terms when standard ones exist.

### Wahoo SYSTM
Multi-duration fitness profile (4DP: NM / AC / MAP / FTP) is a better model than single FTP — it identifies which energy system is the limiter. **What it got wrong:** every workout is a video, which makes it an editorial product wearing software clothes. Dependent on a film crew to ship new content.

### WHOOP
Best at the diagnosis-to-prescription handoff: open the app, see one number, get one verb (go hard / go easy). That morning prescription pattern is the right UX for a daily training tool. **What it got wrong:** over-claiming causality from 12 days of journal data. Users stop trusting it once they realise the correlations are noise. Don't claim more than the data supports.

### Runalyze
Equipment tracking with auto-mileage rollover is the best implementation in any tool — small, but nobody else does it. Race predictor from recent fitness data is a strong engagement hook (gives casual users a reason to check in without actively analysing). **What it got wrong:** 200+ configurable preferences as a substitute for opinionated defaults. Configuration is not a product.

### Final Surge
Per-workout comment threads anchored to the actual file are a good pattern — notes pinned to a specific interval block, not just the whole ride. **What it got wrong:** visual design frozen in 2008. It works because coaches tolerate it, not because it's good.

### Stryd PowerCenter
Course-aware pacing plan (upload GPX, get per-km power targets based on your fitness profile and the elevation profile) is genuinely useful and nobody else does it well. **What it got wrong:** most features require their own hardware. Hardware-locking analytics is a moat that shrinks every year.

### Zwift
Auto-categorisation by computed fitness (w/kg) rather than self-reported level removes self-assessment from onboarding entirely. **What it got wrong:** gamification for its own sake — XP bars and unlockables tip into Skinner-box territory for serious athletes.

---

## The gap this research identified

Nobody does the prescriptive layer well for **outdoor, self-coached cyclists**. WHOOP does diagnosis-to-prescription for general fitness. TrainingPeaks does it if you're paying a coach. Zwift does it if you're indoors. An outdoors-first, coach-less, prescriptive cycling tool — one that tells you what to do tomorrow, not just what you did yesterday — does not exist well.

That is Wattlog's wedge.

---

## What I'm explicitly not building

- **A social platform.** No feed, no kudos, no followers, no segment leaderboards. Strava exists.
- **A coaching tool.** No multi-athlete dashboard, no workout assignment to other users, no coach/athlete messaging. Final Surge and TrainingPeaks exist.
- **A video workout platform.** No filmed sessions, no virtual worlds, no guided video content. Zwift and SYSTM exist.
- **A general fitness / health tracker.** No sleep tracking, no HRV journaling, no step counts, no stress scores. WHOOP and Garmin Connect exist.
- **A route planning tool.** No map-based route builder, no GPX creation. Komoot exists.
- **A hardware product.** No proprietary sensors, no device lock-in. The app works with any power meter that exports .fit files.
- **A free tier with crippled analysis.** No paywalled charts, no upgrade prompts in the middle of post-ride review. If a feature exists, it works fully.
- **Proprietary vocabulary.** No invented acronyms. Every metric uses its standard sport-science name (TSS, CTL, ATL, TSB, FTP, NP, IF) with a plain-English tooltip the first time it appears.

---

## Open questions (to resolve in future sessions)

- What is the tech stack? (Web app, native mobile, or both?)
- Where do activities sync from — manual .fit upload only, or Garmin/Wahoo/Strava API sync?
- What is the data model for race events — how are they marked, and how does the prescription logic use proximity to race day?
- At what point (if ever) does Wattlog become something other people can use?
