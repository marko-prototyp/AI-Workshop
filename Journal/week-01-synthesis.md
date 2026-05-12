# AI for Designers — Week 01
## Meet Claude, pick your project

**Session:** Week 1 of 12
**Participants present:** 4 (Ivo, Ivan, Paula, Marin — Marin ran the handbook solo and joined after)

---

## The participants & their projects

### Ivo — Personal Cycling & Training Dashboard

An engineering mindset applied to athletic performance data. The project: a single-purpose web tool that ingests exported training data from Garmin, power meter, and HR monitor, and turns it into clear, actionable insights — power zones, training load, ride history, performance trends.

**Design direction:** Clean, data-dense UI. No decorative fluff. Dieter Rams applied to athletic data. Structured visualizations built on a consistent internal design language.

**Scope constraint:** No live API integration. CSV export from Garmin Connect keeps the weekly budget on design and insight, not plumbing.

**What success looks like:** A working tool Ivo actually uses to train smarter. Not a portfolio piece. Not a concept. Something real.

---

### Ivan — Mockup Generator

A tool built from a genuine workflow frustration. Designers upload a graphic asset and generate realistic mockups — t-shirts, hoodies, posters, decks — by dialing in a visual feeling rather than writing prompts. Four clicks, one generation. The interface does the thinking.

**Design direction:** Simple to the point of feeling obvious. Six input dimensions (subject, aesthetic preset, framing, lighting, environment, era/texture) combine into pre-engineered prompts under the hood. The user never sees a text field.

**Scope constraint:** No custom model training. Generation runs on existing image gen APIs (Flux or Ideogram) with pre-engineered style presets handling aesthetic consistency. Graceful fallback for bad generations.

**What success looks like:** A tool Ivan actually uses in his own workflow. Replaces a 20-minute mockup hunt with a 30-second generation.

---

### Paula — Classroom Behavior Tracker

Built around a real relationship with a real user — a specific teacher who will actually use it. Teachers open it during class to log positive and negative behavior points per student across focus, participation, and disruption. AI-generated weekly summaries surface patterns and flag students who need attention.

**Design direction:** Playful but purposeful. Color-coded scoring, satisfying micro-animations on point updates, strong visual hierarchy per student. Mobile-first for classroom conditions.

**Scope constraint:** No backend or user accounts in week one. Data lives in session or local storage. The AI layer comes in week 10, not week 1.

**What success looks like:** A working tool a real teacher opens during a real class. Not a Figma prototype. Something that gets used on Monday morning.

---

### Marin — Naučimo Hrvatski

A language-learning app built around one real relationship. Marin's long-distance girlfriend in Philadelphia is learning Croatian for her eventual move to Osijek. The app simulates the FaceTime conversations they actually have. Five scenario cards built during the session: *Jutarnji poziv* (morning call), *Večernji razgovor* (evening conversation), *Na tržnici* (at the market), *Grad Osijek* (the city), *Planiranje posjeta* (planning a visit). An AI plays a Croatian boyfriend character, responds in Croatian with English in brackets, gently corrects.

**Design direction:** Not defined yet. Marin ran the session solo from the handbook and didn't have the group conversation about visual direction. To be shaped in sessions 02–03.

**Scope constraint:** Implicit, not yet named. Built on conversational AI rather than custom curriculum. The explicit "what I am *not* building" conversation didn't happen during his solo run — needs to happen before session 02.

**What success looks like:** His girlfriend actually uses it. Replaces (or supplements) generic apps. Better than Duolingo at the specific thing Duolingo doesn't do — Croatian, in the context of one real relationship.

---

## Patterns across the group

All four participants arrived with the same instinct: **build for a real problem, not a portfolio brief.** None of the four projects is a concept. All four have a named success condition that involves actual use by an actual person — two of them by the designer themselves (Ivo, Ivan), two of them by someone the designer loves (Paula's teacher, Marin's girlfriend).

There's also a shared scope discipline among the three who did the live session. Each of Ivo, Ivan, and Paula independently named what they were *not* building and why — live API integration, custom model training, complex backend infrastructure. That's unusual for week one. Usually the constraint conversation happens in week 3 when ambition collides with the time budget. They did it themselves. Marin ran the session solo from the handbook and didn't have that conversation. Worth doing with him before session 2.

The design directions are distinct but share a premise: **specificity over decoration.** Ivo's utilitarian data-dense approach, Ivan's deliberately obvious UI, Paula's playful-but-purposeful mobile tool. Marin's visual direction isn't formed yet, but the product premise (real-relationship scenarios, AI conversational partner) is already specific. Four different aesthetics in formation, one underlying principle. These are tools with a point of view.

---

## Individual highlights

**Ivo** — The Dieter Rams reference is doing real work here, not decorative name-dropping. Applying industrial design principles to data visualization is a specific design bet. The risk: "utilitarian" can slide into "gray and joyless." Worth watching.

**Ivan** — The insight that existing mockup tools require too much prompt knowledge is the right framing. He's not building an image generator — he's building a *UX layer* on top of one. That distinction will matter a lot in weeks 5–7 when the interface has to do all the work the user isn't doing.

**Paula** — The strongest real-user constraint of the three. A specific teacher, a specific classroom, a Monday morning use case. The AI layer deliberately deferred to week 10 shows good instinct — the interaction design has to work before the AI layer is worth anything.

**Marin** — Ran the session solo from the handbook on the workshop site, at his own desk, and shipped a working prototype in his one self-directed hour. That's implicit proof the curriculum is usable without a facilitator in the room. Personal project with the strongest emotional anchor of the four (long-distance partner). The risk: "better than Duolingo" is the easiest claim to over-promise. The honest version is narrower and stronger — Duolingo doesn't have Croatian, and *Naučimo Hrvatski* is built around one real relationship's conversational patterns. Sharpen the framing before session 03.

---

## What worked / What didn't

**Worked:**
- All four participants arrived with scoped, honest briefs — no hand-holding needed to get to a real project
- The constraint-naming exercise landed well with the three who started on time; participants named what they weren't building without prompting
- Strong diversity of project types (data tool, creative tool, productivity tool, language tool) without overlapping problems
- A solo run of the handbook by Marin produced a working prototype in one hour — implicit proof the curriculum is usable without a facilitator

**Didn't:**
- Need to watch the week 10 AI layer in Paula's project — easy to over-promise what summaries will do
- Ivo's "data-dense" direction needs an early visual test; dense and readable is a hard target
- Could have pushed Ivan harder on what a "bad generation" fallback actually looks like — deferred to later but worth flagging early
- Marin missed the scope-naming conversation. The "Better than Duolingo" framing also needs sharpening before week 03

---

## Facilitator notes for next week

- Send all four to the research & synthesis exercise with their specific problem, not the general brief
- Push Ivo toward 5 specific data-dense reference interfaces — not just Garmin clones
- Ivan should find references for UI that hides complexity well (not AI tools — think hardware, appliances, professional gear)
- Paula needs to do one observational session with the teacher before week 2 if possible
- Marin: do the scope-naming pass before session 02. Sharpen the Duolingo comparison to one specific differentiator

---

## Quote of the week

> "Something that gets used on Monday morning."
> — Paula, on what success looks like

---

## Blog post — draft outline

> *To be developed over 12 weeks. The structure below is a first sketch based on week 1 material. It will change.*

**Working title:** A small team. Real problems. Twelve weeks with AI.

**Angle:** What happens when a small design team decides to build things that actually get used — not concepts, not case studies — using AI as a builder while staying firmly in charge as designers.

**Structure (provisional):**
1. The brief that changed — how each participant defined their project and why the constraints they set in week 1 were the most important design decision they made
2. Week by week — the honest account (to be written as sessions progress)
3. What shipped — description and screenshots of each finished tool
4. What changed — how each designer's relationship to AI shifted across 12 weeks
5. The thing that surprised us — one unexpected discovery per participant

**Tone:** Professional, specific, first-person from the participants. No "AI is amazing" framing. Real examples, real friction, real outcomes.

**Target publication:** End of week 12. Each participant reviews their section before publishing.
