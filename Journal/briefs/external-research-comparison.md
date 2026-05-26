# AI in Design 2026 — comparison with the workshop

> A working document. Compares the Designer Fund / Foundation Capital *AI in Design 2026* report (906-designer survey, 25+ interviews, published April 2026) against how we set up *AI for Designers* and what we've seen in sessions 01–03. Use it to (a) check our framing against a representative sample and (b) pull stats and quotes into the case studies after session 12.
>
> Source: `uploads/AI-in-Design-2026-report-v1.md`
> Internal docs read: `content/home/`, `content/weeks/01–12.md`, `Journal/synthesis/week-01/02/03-synthesis.md`, `Journal/participants/*/notes.md`, `Journal/dashboard/journal-dashboard-brief.md`.

---

## TL;DR

The report largely confirms the bet we made when we built the workshop. Half of designers in the survey have shipped AI-generated code, 43% say working prototypes are now expected as a deliverable, and most still rely on their own taste for the polish, direction, and judgment that matter. That is the workshop's whole shape: get the designer to direct, get the AI to build, end with something real.

The report also surfaces things we should be honest about. Loneliness is up. Tool fatigue is real. Most companies haven't updated their policies. And the most-quoted insight from practitioners — that prompting works as a constraint system, not a specification — is exactly what Ivo and Paula independently arrived at in session 03. That's the strongest single piece of validation we have so far.

There are also stats that belong in the case studies. Marked below.

---

## What the report confirms about our setup

### The thing we're teaching is the thing the field is converging on

The report's headline shift from 2025 to 2026 is that designers stopped experimenting and started rebuilding their workflow around AI. 91% now use AI weekly, up from 54%. The average toolstack went from 3 to 7. Half have shipped code. Working prototypes are an expected output for 43%. The skills designers value most now — AI fluency (63%), creative direction (57%), storytelling (53%), strategic problem framing (52%) — line up exactly with what the workshop tries to build.

The workshop's premise — *designer designs, AI builds, designer directs* — turns out to be the same premise that comes back in every interview the report quotes. Ryan Mather at Anthropic: *"AI is a point-of-view amplifier."* Katie Dill at Stripe: *"Would I be happy with this if it took me a week to make this?"* Karri Saarinen at Linear: *"To me, design is the planning stage and code is the implementation stage."* That's the workshop's whole curriculum compressed into three sentences.

### Prototypes as the default output is now industry consensus

Week 05 of the workshop (*Make it clickable. Smoke test the idea.*) makes prototyping a designer's main move before any visual work. The report shows this is now standard practice:

- **43%** of designers say their companies expect working prototypes as a deliverable.
- **36%** say projects now start with working prototypes, before any static mockup.
- **74%** use AI for prototyping — the second-most-common use case across the entire survey.

Mark Boyes-Smith at Miro: *"Traditional prototyping took two weeks on average. Now, using vibe-coded prototypes, it's completed in hours."*

What that means for us: weeks 05 → 07 → 09 (clickable smoke test → core view → secondary views) are no longer a contrarian curriculum decision. They're the practitioner default. We can say that out loud in the marketing copy and in the case studies.

### The toolstack we chose is the toolstack the field uses

We default to Sonnet, Opus, Claude.ai, Claude Code, Cowork, Claude Design. The report:

- **78%** of designers use Claude, vs. 65% for ChatGPT. Claude has overtaken ChatGPT since 2025.
- **65%** use Claude Code. (It didn't exist for the 2025 survey.)
- Claude Design just launched. The report flags it as the obvious thing to watch in 2026.

We don't need to defend the stack. It's the modal stack.

### "Designers as toolmakers" is the report's most-emphasised theme — and it's literally what Ivan is building

The report's strongest editorial position is that *"if designers were previously evaluated on their output, now they are evaluated on both their output and the workflows they build."* Examples it cites: Gavin Potenza's Moodboard 3000 Figma plugin, Amelia Wattenberger's thought-organizing tool, Brian Lovin's shiori.sh, AirOps' visual brand skill, Stripe's ProtoDash, Anthropic's internal microtool kit.

Ivan's Mockup Generator sits inside this category. It is a designer-built UX layer on top of a generative model, designed to remove a recurring friction in his own workflow. It is the canonical example of the trend the report names. The case study should sit Ivan's project alongside the public examples above and say so explicitly.

Marko's *AI for Designers* journal dashboard — described in `Journal/dashboard/journal-dashboard-brief.md` — is also a toolmaker artifact. A persistent Cowork sidebar app that encodes the workshop's own editorial process into infrastructure. Worth referencing in the workshop meta-story.

### The constraint-system insight is the cohort's strongest practitioner finding

The report quotes several practitioners on the same idea from different angles. Ryan Mather: *"AI is a point-of-view amplifier."* Mark Boyes-Smith: *"It's very easy to put my prompt in, get an answer back, do a quick shuffle, and think: This is great. Job done. We don't really want designers to do that."* Karri Saarinen: *"If you try to combine [planning and execution], it's not ideal for either."*

Ivo arrived at the same conclusion through the failure of his own brief. The Wattlog brief was a specification. It produced a forgettable dashboard. He rewrote it as a constraint system — defining what the dashboard could *never* be — and the second build looked different not because the palette changed but because the structural logic did. Paula arrived at the same conclusion from a different direction: detailed bans of bad moves were treated by the model as confirmation that the bad moves were in scope. She had to swap in a different reference set and a constraint system *with replacements named* before the output stopped being generic.

These are the two strongest sections of the journal so far. The 2026 report is the validation that this isn't just our cohort. *Prompting as constraint-setting* is the unifying insight of working designers in 2026.

### Peer learning is the dominant adoption mechanism, and the cohort is one

The report shows reliance on peer learning more than doubled in a year (24% → 70%). Reliance on leadership recommendations halved (32% → 16%). The most successful AI-adoption stories in the report (Stripe, Maze, Watershed, DoorDash) all rest on tinkering culture, peer demos, and informal knowledge sharing rather than top-down rollouts.

The cohort is a peer-learning structure. Four designers, weekly sessions, projects argued over together. It maps directly to the structure the report identifies as the one that actually moves designers' practice forward. We can say that more confidently in the workshop's pitch copy.

---

## What the report complicates

### Loneliness is rising, and the workshop's solo-project model doesn't fully address it

This is the most honest thing in the report. 20% of designers say collaboration has *decreased*, 4x more than the 5% who said the same in 2025. David Stinnette at Samsara: *"There's loneliness replacing the collaborative energy. Waiting for AI to process replaces flow state."* Several quotes describe the isolating shape of building inside a terminal alone.

Our workshop is solo by design — each participant builds their own project. The cohort structure provides some peer connection, but the building itself is individual. We're not necessarily a remedy for the loneliness problem the report names. Worth a careful line in the workshop story, not silence.

The thing the workshop *does* address that's adjacent to this: the report describes designers feeling outnumbered by PMs and engineers who are now also shipping interfaces (40% of designers say their PMs and engineers are doing more design work). The workshop's emphasis on shipping a real thing — and on the constraint-setting craft that PMs and engineers don't have — is a partial answer to that anxiety.

### Tool fatigue is real and the workshop sidesteps it

Almost half (46%) of designers say they're still searching for go-to tools. Several quotes describe a constant molting cycle that makes any consolidated workflow unsustainable. *"Every day someone is sharing a tool/workflow they saw. It's both exciting and draining."*

The workshop sidesteps this by giving participants a curated stack. Claude.ai, Cowork, Claude Code, Claude Design, with model choices specified per session. That's a quiet value of the program that we haven't pitched explicitly. *We've already picked the stack. You get to spend twelve weeks using it rather than picking it.* Worth surfacing in pitch copy.

### The report describes a "build or be replaced" pressure we've stayed away from

Several leaders quoted in the report describe AI Craft Skills added to performance rubrics, BHAGs to ship N PRs per month, AI fluency added to formal hiring criteria. The pressure is real:

- **73%** of designers feel rising expectations.
- **45%** are seeing faster turnaround time demands.
- **19%** report headcount reduction with output expectations held flat or increased.

The workshop deliberately doesn't run on this pressure. Twelve hours over twelve weeks. One hour at a time. We frame it as a craft program, not a survival course. Worth being explicit about this in the marketing — the report shows the survival course version is already everywhere. We're the other thing.

### Most companies haven't formally adopted the practices our curriculum teaches

Only 28% of design leaders have changed performance review metrics, career ladders, or hiring practices to reflect AI capability. 42% have made no formal changes at all. So while the *practice* has shifted (50% shipping code, 76% using AI coding tools), the *policy* hasn't.

Practical consequence for case study framing: the participants are ahead of their employers, not behind them. The case studies should reflect that — they're not catching up, they're building skills the field needs but most companies haven't formalised yet.

---

## Stats and quotes worth using

Tagged by theme. Each one has a suggested home. Use them sparingly; one well-chosen stat lands harder than three.

### On shipping prototypes and code

| Stat | Source | Where to use |
|---|---|---|
| 76% of designers have used an AI coding tool | Report, Craft p.1 | Workshop story; Ivo, Paula, Marin, Ivan case studies as context |
| 50% have shipped AI-generated code to production | Report, Craft p.1 | Workshop story opener; Ivan and Ivo case studies |
| 68% of early-stage designers ship code (vs. 33% at public co.) | Report, Craft | Workshop story; pitch copy |
| 43% expect functional prototypes as a deliverable | Report, Teams | Workshop story; weeks 05/07 pitch copy |
| 36% say projects now start with working prototypes | Report, Craft p.2 | Week 05 page copy; workshop story |
| Designers who code+prototype with AI are 2.5x more likely to feel more creative & capable | Report, Craft p.5 | Workshop story conclusion; closing line of any case study |

### On craft, taste, and constraint-setting

| Stat / quote | Source | Where to use |
|---|---|---|
| 81% rely on own judgment for final visual polish | Report, Craft p.4 | Ivo case study; weeks 03/06 page copy |
| 79% rely on own creative direction and aesthetic judgment | Report, Craft p.4 | Paula case study; weeks 03 page copy |
| 80% say reliable output is what makes a tool stick | Report, Tools p.3 | Ivo case study (Wattlog first dashboard); general |
| 62% cite inconsistent output as biggest challenge | Report, Tools p.3 | Paula case study (the generic dashboard loop) |
| 45% say "lack of control over output" is a top challenge | Report, Tools p.3 | Ivo and Paula case studies |
| 42% cite "lack of product/brand context" as a challenge | Report, Tools p.3 | Paula case study (the reference-image lock-in) |
| *"AI is a point-of-view amplifier."* — Ryan Mather, Anthropic | Report, Craft p.4 | Workshop story; any case study closing |
| *"It's very easy to put my prompt in, get an answer back, do a quick shuffle, and think: This is great. Job done."* — Mark Boyes-Smith, Miro | Report, Craft p.3 | Ivo case study (the first Wattlog dashboard) |
| *"Would I be happy with this if it took me a week to make this?"* — Katie Dill, Stripe | Report, Craft p.4 | Workshop story; Paula case study |

### On designers as toolmakers

| Stat / quote | Source | Where to use |
|---|---|---|
| 29% use company-internal AI tools (general); 74% at enterprises | Report, Tools p.2/p.4 | Ivan case study (he's building one for himself) |
| 35% say "offers specific capability no other tool provides" makes tools stick | Report, Tools p.3 | Ivan case study (the six-input system is exactly this) |
| *"You can mold the tool to the thing you're doing. Need a quick dark mode simulator? Sure, just ask for one."* — Ryan Mather, Anthropic | Report, Tools p.4 | Ivan case study |
| *"I built an app that adds an iPhone bezel when I 'copy as png' from Figma and it's so magical!"* — anonymous survey response | Report, Tools p.4 | Ivan case study; workshop story |
| Cited toolmaker examples: Moodboard 3000, shiori.sh, Wattenberger's thought-organizer, ProtoDash, AirOps brand skill | Report, Tools p.4 | Ivan case study (sit Mockup Generator alongside) |

### On role changes and team structure

| Stat / quote | Source | Where to use |
|---|---|---|
| 65% are doing more PM/engineering work | Report, Teams p.2 | Workshop story; pitch copy ("you don't stop being a designer — you do more") |
| 40% say PMs/engineers are now doing more design work | Report, Teams p.2 | Workshop story; pitch copy |
| 34% say collaboration has become messier | Report, Teams p.2 | Workshop story (honesty section) |
| 20% say collaboration has decreased — 4x increase since 2025 | Report, Craft p.5 | Workshop story (the honest line about loneliness) |
| 60% of leaders expect to keep or grow design headcount | Report, Teams p.4 | Pitch copy; counter the "design is dead" narrative |
| 50% of leaders place more emphasis on AI tool fluency in hiring | Report, Teams p.4 | Workshop pitch copy |
| 48% place more emphasis on systems thinking and strategic skills | Report, Teams p.4 | Workshop pitch copy |

### On learning and adoption

| Stat / quote | Source | Where to use |
|---|---|---|
| 70% learn from peers (up from 24%) | Report, Teams p.1 | Workshop pitch copy (the cohort is a peer-learning structure) |
| 86% learn through self-directed experimentation | Report, Teams p.1 | Marin case study (the solo session 01 run) |
| 16% rely on leadership recommendations (down from 32%) | Report, Teams p.1 | Workshop pitch copy |
| *"The pace of AI innovation means we are all 'early career.'"* — Katie Dill, Stripe | Report, Teams p.1 | Workshop story opener |

---

## Per-participant case study spine

### Ivo — Wattlog

The case study's spine should be the brief rewrite. Specification → constraint system. That's both a moment in his story and an idea the report's senior practitioners are converging on independently.

Stats and quotes to consider, in priority order:

- 80% of designers say reliable output is what makes a tool stick — frames Ivo's reaction to the first dashboard ("it produced a dashboard he didn't like") as a representative response, not a personal preference.
- Mark Boyes-Smith on the "quick shuffle" — the trap Ivo could have stayed in but didn't.
- Ryan Mather: *"AI is a point-of-view amplifier."* — the close. Wattlog's second brief is a point of view (Rams + Nothing OS) and the dashboard finally reflects it.
- 50% of designers have shipped AI-generated code to production — context that this is now the bar Wattlog is being measured against.
- 81% rely on their own judgment for final visual polish — the workshop's framing of designer-as-director, in survey form.

Further reading worth citing in the case study: Karri Saarinen's "Output Isn't Design" (linked in the report's Craft chapter). Title alone is the Wattlog story.

### Ivan — Mockup Generator

The case study's spine is *designer as toolmaker*. The report uses this exact phrase. Ivan is the literal example.

Stats and quotes to consider:

- *"If designers were previously evaluated on their output, now they are evaluated on both their output and the workflows they build."* (Report, Tools p.4) — the case study's epigraph candidate.
- Ryan Mather's dark mode simulator quote — direct parallel to Ivan's "no text inputs because thinking is tiresome" framing.
- The list of cited toolmaker examples (Moodboard 3000, shiori.sh, ProtoDash, AirOps brand skill) — place Mockup Generator alongside them.
- 35% say "offers specific capability no other tool provides" is what makes a tool stick — Ivan's six-input pre-engineered prompt system is exactly this.
- *"I'm scared of the API connection."* (Ivan, session 02) — leave this in. The report quotes a lot of senior designers who name the same fear; pairing Ivan's line with one of theirs (or with the stat that 39% find integration hard) is the case study's honest middle.

### Marin — Naučimo Hrvatski

The case study's spine is the relationship-specific premise — *"better than Duolingo at the specific thing Duolingo doesn't do"* — and the mid-session pivot from FaceTime app to memory book. The 2026 report doesn't speak directly to language learning, but two of its themes connect:

- Self-directed learning is the #1 way designers stay current (86%). Marin's solo session 01 run is the cohort's strongest example. The case study can note that the workshop's curriculum is built to work in this mode and that Marin's run proves it.
- *"AI is a point-of-view amplifier."* (Ryan Mather) — Marin's Mediterranean / Playfair / glassmorphic direction is the strongest point of view in the cohort, and it's also the only one that produced clean output on the first attempt. The report frames this exactly: AI defaults to the average; specific cultural anchors break the default.
- The report's "AI defaults to generic unless given specific references" insight is what Paula learned painfully and Marin learned cleanly. Worth contrasting the two case studies on this point.

Less obvious but useful: 53% of designers report positively transformed job satisfaction from AI. Marin was the most satisfied participant at end of session 03. This is a representative shape, not an outlier.

### Paula — ClassArcade

The case study's spine is two findings: (1) references override words, and (2) anti-pattern lists confirm the patterns are in scope. These are the cohort's most transferable practitioner insights. They're not in the 2026 report, but they extend its central theme — that prompting works as constraint-setting, not specification.

Stats and quotes to consider:

- 42% cite "lack of product/brand context" as a challenge (Report, Tools p.3) — frames the children's-app reference lock-in as a representative problem, not a Paula-specific mistake.
- 79% rely on own creative direction and aesthetic judgment — Paula's rejection of three rounds of generic output is the survey response in action.
- *"Would I be happy with this if it took me a week to make this?"* — Katie Dill, Stripe. The Paula version of this question is *would I show this to the teacher.* Direct parallel; pair them.
- Stripe's ProtoDash quote (Katie Dill) — ProtoDash has Stripe's design system baked in so any prototype starts on-brand. ClassArcade's revised style guide does the same thing in miniature for one teacher's classroom.
- Two scope cuts from session 02 (*"students will not be able to use it"* / *"bad points end up in extra homework"*) — these belong in the case study as twin moments of the discipline the report keeps celebrating: deciding what you're *not* building.

---

## Pull quotes that would land on the workshop site

These are direct quotes from the report (cite the speaker). Use sparingly. One per page max.

- *"AI is a point-of-view amplifier."* — Ryan Mather, designer at Anthropic. The strongest one-liner version of the workshop's whole thesis.
- *"It's very easy to put my prompt in, get an answer back, do a quick shuffle, and think: This is great. Job done. We don't really want designers to do that."* — Mark Boyes-Smith, Head of AI Design, Miro. Counterweight to AI hype copy.
- *"Would I be happy with this if it took me a week to make this?"* — Katie Dill, Head of Design, Stripe. The quality-bar prompt for the whole workshop.
- *"The pace of AI innovation means we are all 'early career.'"* — Katie Dill again. Useful as a permission-giving line on the home page.
- *"To me, design is the planning stage and code is the implementation stage. I don't like mixing those two because you have different goals in those workflows."* — Karri Saarinen, Linear. The cleanest articulation of why the workshop separates session 04 (planning) from session 07 (building).

---

## What to do with this

1. **Workshop story / `content/journal/` longer pieces** — the report's confirmation of the workshop's whole shape is the strongest external signal we have. Lead with it in any framing piece written after session 12.
2. **Case studies** — use the per-participant spine above as a planning aid. Don't quote-stuff. One report stat per case study is plenty; the participant's own story carries the weight.
3. **Home / pitch copy** — three stats are worth weaving in: 50% have shipped AI-generated code, 70% learn from peers (justifies the cohort structure), and 60% of leaders expect to keep or grow design headcount (counters the "design is dying" narrative).
4. **Weekly page copy** — week 05 (smoke test) and week 06 (main view) can quietly cite the 43% prototypes-as-default stat. Week 03 (visual direction) can cite the 79% creative-direction-from-judgment stat.
5. **What we should *not* do** — turn this into a chart-heavy marketing page. The report itself is chart-heavy. The workshop's distinctive voice is the opposite of that. Stats live in the body of paragraphs, attributed once, never bolded.

---

## Things the report doesn't address that we should

- **Prompting as constraint-setting with named replacements.** The report's quotes circle this idea but don't land it. Paula's session-03 finding — that anti-pattern lists need replacements, not just bans — is publishable as a practitioner contribution.
- **References overriding words.** Not in the report. This is Paula's finding, and it's a stronger insight than most of the practitioner techniques the report cites by name (the "tap to refine" / "lock and shuffle" patterns, the brown-bag sessions). Worth writing up separately, possibly as an extracted post.
- **The constraint of a real recipient.** Three of the four projects (Paula's teacher, Marin's girlfriend, Ivan's own workflow) are built around one specific user. The report doesn't directly address this. The workshop's emphasis on a real recipient is a distinct contribution.
- **Solo-run viability of an AI workshop.** Marin ran session 01 from the handbook with no facilitator and produced a working prototype in one hour. The 2026 report says 86% of designers are learning through self-directed experimentation. We have a tested artifact of what that looks like. Worth a separate writeup eventually.
