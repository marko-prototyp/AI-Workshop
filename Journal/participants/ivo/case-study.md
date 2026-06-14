---
participant: "Ivo"
project: "Wattlog"
status: "draft"
weeks_completed: 5
last_updated: "2026-06-10"
hero_image: ""
final_url: ""
---

# Wattlog

> First-person case study — Ivo's voice. Built across 12 weeks. Reviewed by Ivo before publication.

## TL;DR

A single-purpose web tool I actually use to train smarter. Called Wattlog. .fit files from Garmin and the smart trainer go in. Power zones, training load, ride history, and trends come out. No live API. No portfolio gloss. Dieter Rams applied to athletic data.

---

## The brief

*To fill in from week 1 → 2 sessions. Keep this section short — two paragraphs max. The point of view, the user (me), the constraint that mattered.*

I wanted a training tool that didn't waste my time. The market is two extremes: pro-athlete software with steep learning curves, and consumer apps that gamify everything I want left alone. I'm an engineer by training and a cyclist by hobby, and I wanted the in-between thing — clean, dense, no decoration.

## The constraint that mattered most

**No live API integration.** Garmin Connect lets you export CSV. That's enough. Skipping the integration tier kept my weekly hour budget on what matters — design and insight — instead of plumbing. Anyone using this would export once a week, paste in, get the read.

## The reference move

Dieter Rams. Specifically, the calculator and the radio. Not "minimal" as a style — minimal as a stance about what data deserves visual weight.

*Add 3 reference images here in week 5–6 (data-dense interfaces, not Garmin clones).*

## Week-by-week

### Week 01 — The brief

Came in with a project I already half-knew I wanted. The intake interview surfaced what I hadn't named: the design bet is *visual density that stays readable.* That's a hard target. "Utilitarian" can slide into "gray and joyless" if you don't watch it.

*One screenshot of the brief / first sketch.*

### Week 02 — Wrote it down.

The session was research and synthesis. I went through eleven training tools in a matrix and wrote a full project brief for Wattlog. Sixteen features ranked P0 through P3. Seven items on the not-building list, including "Strava exists."

What I learned from the matrix: intervals.icu is the closest analytical product to what I want, and it gets the depth right but presents it like a Bloomberg terminal. WHOOP nailed the diagnosis-to-prescription handoff for general fitness. Nobody does that prescriptive layer well for outdoor self-coached cyclists. That's the wedge.

The session closed with Claude pushing back on the brief across six areas. Honestly, the pushback wasn't very useful — I came in with most of this already worked out, and the session structured it rather than changed the direction. That's fine. The brief on paper is what mattered.

*Screenshot: the 11-tool competitive matrix.*
*Screenshot: the P0–P3 feature ranking.*

### Week 03 — The brief was the wrong shape.

The session was visual direction. Two dashboard iterations in the room: the first too flat, everything at the same weight; the second better after one hard note — "more hierarchy." TSB promoted to 64px in accent orange. Prescription text unboxed as a statement. Secondary metrics collapsed to a ruled hairline strip. The brief got written: warm off-white ground, single accent color, two type weights (400 and 500 only), 0.5px borders, no shadows. Art direction committed.

But I didn't like the result.

My original brief was thorough. Every component specified. ASCII layout diagrams. Exact values for color, weight, spacing, and radius. It produced exactly what I specified, and what I specified turned out to be the wrong thing. So the session kept going.

We started the post-session audit with two reference interfaces: the Framer Dieter Rams remix page and the Nothing OS widget grid. Both extreme constraint systems. Both legible because of what they remove. Then we read the dashboard my first brief had produced — not to tweak it, but to find everything wrong with it. Six AI tells on first pass. Nineteen by the time we'd read the file carefully. `letter-spacing: 0.2em` on every label. `font-weight: 300` used decoratively. A rationale strip at the bottom explaining why the design was unconventional. That last one became the finding of the day. Design that has to announce its own unconventionality is admitting it isn't.

Then we built something small first — a 320×420 compact fitness widget — and used it as a testbed for the constraints we actually wanted. Helvetica Neue instead of Inter. Two weights, 600 and 400. No 300. A near-black base with a single off-white card. Braun orange at full saturation or not at all, no rgba variants. One dial with spherical shading pulled from the Rams references. A seven-day history rendered as dot-matrix cells. No pill badges. No delta arrows. No tooltip on hover. By the fifth round the banned list was longer than the specification. The widget that came out was the cleanest thing we'd built.

We scaled it up to the full dashboard with the same constraints applied. TSB rendered at 104px as a typographic object sitting on the page with no card around it. A ruled metric strip with no card backgrounds. A PMC chart hand-drawn in canvas, no chart library, no axis box. Orange used three times across the whole screen.

The new brief is a constraint system, not a specification. It opens with a cultural anchor — Dieter Rams and Nothing OS — and the specifications exist mostly as refusals. No Inter. No tinted accent variants. No three-column stat grid. No pill badges. No `font-weight: 300`. The closing line: *a style guide tells you what something looks like; a constraint system tells you what it can never be.*

Both briefs are in the repo. The contrast between them is the actual artefact.

*Screenshot: the second-iteration dashboard from the session — tabbed nav, "Productive." at large weight, CTL/ATL/TSB in a clean three-column strip, PMC chart with a RACE marker.*
*Screenshot: the widget testbed — Helvetica Neue, dot-matrix history, Braun orange once.*

### Week 04 — The architecture is fixed. The form factor isn't.

The session produced four artifacts: a sitemap, wireframes for nine screens, state maps for every screen, and a content sourcing inventory. Three of the four are markdown files in the repo. The sitemap lives as an in-conversation diagram alongside the rationale that built it.

The cut list is where the session actually lives. An onboarding flow, a flat rides list, notifications, a public profile, global search, a generic stats hub — all cut. Each one documented with a reason it would weaken the product, not just that I decided against it. The line I want to keep: *"If a flat list ever feels necessary, Calendar isn't doing its job."* That's the whole thesis in one sentence.

Cross-screen commitments came out of the wireframing pass. One hero per screen. No terminal error states — every error loops back somewhere. Every destructive action through exactly one modal. Editable fields autosave on blur; no Save buttons. Acronyms get a single tooltip on first encounter, app-wide. Empty states are honest data statements or they collapse to nothing.

The content brief produced a position I didn't expect to commit to this early: zero AI-generated content in scope for v1. Daily prescription, status explanations, personal-best callouts, acronym tooltips — all hardcoded libraries, fully drafted. Anything AI-generated in those slots would undermine the clinical credibility the tool is trying to earn.

There's something to name about the content-brief session itself. Claude's elicitation came one question at a time, each with a recommended option. I took the recommendation three of four times. The recommendations were defensible — they were the more conservative MVP choices — but I'm not sure I evaluated them. I may have deferred to a confident voice rather than thinking each one through. That's a smell whether or not the outcomes were right.

What's genuinely stuck: web, native mobile, or both. The answer gates the tech stack. I don't have a defensible position yet.

*Screenshot: sitemap diagram with cut list rationale.*
*Screenshot: sample screen wireframe — Calendar or Power Profile.*

### Week 05 — Clickable, and the loop doesn't close.

The smoke-test session. One HTML file, all nine screens, end to end. Five top-level tabs, drill-throughs that hide the nav and offer a way back, a simulated three-step upload parse that lands on Ride Detail, and the Calendar blank-day sheet routing to both creation flows. I kept the fake data internally consistent on purpose: an FTP of 284 produces a threshold prescription of 270 to 298 W. If the numbers contradict each other, the walkthrough stops feeling like the product.

This was the first session on Fable 5, which launched a few days before. The first version was okay but had visual, logical and UI errors. A couple of iterations later it held together.

Two moments from the build are worth keeping. Claude found a conflict between my wireframes and my design brief, two different Today screens, and raised it before building instead of silently picking one. And the prompt I'll reuse: *"Walk through my artifact as if you were me. Don't critique the design. Critique the experience."* That produced a seven-point walkthrough framed as a real Tuesday-evening upload session. Its biggest finding: the core loop never closes. I upload a ride and the prescription doesn't change, which leaves the prototype a static poster of the concept until the prescriptive layer can be felt at least once. The file got updated in response.

This was also the first session where we reviewed each other's prototypes and agreed on some shared UX rules.

The decision I committed to: planned sessions, in detail. Worst moment of the day: bad styling. That's fine. *"I'd work a bit more on the way of displaying things, but I guess I'll cover that in the design phase."*

*Artifact: the final version of the smoke test html.*

*…through Week 12.*

---

## What I built

*Screenshots of the finished tool. Three to five images covering: the home view, a detail view, a state I'm proud of, the export-paste flow.*

## What I changed about how I work

*To fill in week 11–12. Real specifics — what I do differently on a Tuesday now.*

## What's still wrong with it

*Three things, honestly. Designers respect this section.*

1.
2.
3.

## What I'd do next

*One paragraph. Not a feature list — a direction.*

---

## Credits

Built during the AI for Designers 12-week program, run by Marko Kolić at Prototyp.
