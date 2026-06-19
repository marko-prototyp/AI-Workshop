# Marko — running notes

> The facilitator's own running log. Marko is participating in his own program — his project is the meta-project: the journal, the website, the program structure itself.

---

## Project

The AI for Designers program as a whole, plus the website and journal that frame and document it. The thing visitors land on. The thing participants come back to. The structure that makes 12 weeks of one-hour sessions add up to something.

## Design direction

Editorial, opinionated, specific. Anti-stock as a principle, not a style. Dense where dense earns it, restrained everywhere else. The site itself is the proof: a meta-demonstration of what the program teaches.

## Scope decisions

- **Build the website in plain HTML/CSS/JS with a tiny Node build.** No React, no Vite, no CMS. The stack should be readable in an afternoon.
- **Journal lives on the public site, not hidden.** Visitors follow along as the program runs.
- **Bring agency expertise in.** Devs and testers from the wider team participate as mentors when a project needs it (precedent: Ivan with Seba).

## Watch-outs

- Copy keeps slipping toward AI-generic on first draft. Always plan for v2 and v3.
- The journal is a forever-task — needs to feel light to maintain or it'll die in Week 5.
- Adding too many features in response to participant feedback could turn the site into a Frankenstein. Keep editorial control.

## Quotes

- > "Yeah I think that's 100% doable." — Marko (Week 01)
- > "I send it on a quest and it delivers." — Marko on Claude as orchestrator (Week 01)

## Artifacts to keep for the case study

- Screenshot of the Claude project surface showing the build trail (chat titles: copy rewrite, light mode plan, journal synthesis, AI learning plan)
- v1 vs v3 copy comparison (when retrievable)
- Photato — Seba's prior AI project, as the agency precedent

## Per-week running log

### Week 01
- Shipped the journal infrastructure end-to-end: raw → synthesis → per-participant → public.
- Added dark/light mode in response to a contrast complaint. Search already in place.
- v1 copy was 100% AI-detectable. v3 started to not suck.
- Brought Ivan to Seba for a planning session. Bigger move: agency experts come into the program when projects need them.
- Quote of the week from him: *"Yeah I think that's 100% doable."*
- **Push for next week:** fix the illustrations, scope the participant case-study collection workflow now that the meta-project is real.

### Week 02
- _tbd_

### Week 03
- _tbd_

### Week 04
- Session ran smoothly. Handbook held — participants followed without questions, almost ran it solo.
- First real proof the program works without facilitation in the room. Ivo and Paula ran the full session independently.
- Ivo: Claude delivered a lot, was quite helpful, but required some babysitting and result adjustment.
- Marin: happy with the results, vision and Claude delivery mostly in sync. Hit 100% usage limit at 30 minutes, switched to Sonnet, then moved to manual content writing. 1:1 scheduled Friday 29 May 2026 to cover the bases.
- Ivan: absent again. A lot to cover. Next week he hopefully tags along.
- Paula: not mentioned in facilitator notes — session ran cleanly.
- Key structural proof: the curriculum can self-run at this stage for engaged participants. Ivan is the exception that tests the edge case.
- **Between-session build:** Started a journal entry editor dashboard — a tool for adding images and editing journal entries before publishing to the site. The ideal flow: Cowork drafts the entry, Marko opens the dashboard, tweaks and adds images, publishes.
- Spent two days building a Claude artifact prototype. Broke it down, identified pain points, made direction changes. Then wrote a full brief capturing all lessons learned. Now building from scratch with that brief.
- Running into token limits on the build — expecting a full week of work.
- 5-step plan for the build: (1) prototype and test, (2) brief with lessons from prototype, (3) prepare brief for Claude Code, (4) review brief with other agents, (5) foolproof brief that guides Claude Code through the build without hand-holding every decision.
- **Push for week 05:** Resolve Ivan's path back in. Continue 1:1 with Marin. Push Ivo to commit on form factor. Ship first version of journal editor.

### Week 06
- The culmination session underdelivered. Each present participant wrote their most complete brief, turned the anti-stock rules into a reusable skill, and handed a hardened comp brief to Claude Design. Two of three comps came back generic; only Marin's held. A low day after weeks of build-up.
- **Format change to make:** the session's fork (Figma comp → screenshot, or describe straight to Claude Design) resolved by the room — nobody chose Figma. Brief held better in Claude Design than in an ordinary chat. Lead the handbook with the Claude Design path; keep Figma as the alternative, principle unchanged (design first, then build).
- **Handbook is overloaded.** Direct complaint from the room: today's page is almost impossible to follow, too much crammed in, too much reading. Opposite of W04. Action: redesign the page for legibility + heavily cut the content. Treat as a blocker on the session self-running.
- **Bright spot / next experiment:** Ivo's best comp came from an outside material-design skill (lev-os/agents, material-design SKILL.md — https://github.com/lev-os/agents/blob/5daf5c06df54fc8a322120b0c26e8141d3b99f2e/skills-db/thinking/patterns/material-design/SKILL.md), not his own brief. Cleanest comp in the room. Plan: adapt that skill to our needs and test whether it reproduces stronger design across projects.
- Why Marin held and the others didn't: specificity of visual language. Marin's is unusual enough the model has no default to reach for; Wattlog and ClassArcade sit closer to model defaults, so the default leaked. Same lesson as W03, now at the comp stage — make it explicit in the handbook.
- Meta-project gap: still no W05 entry in my own case study; W06 added as a forward note. Backfill W05 when I have the source.
- **Push for week 07:** (1) Redesign + cut the handbook page. (2) Adapt the material-design skill and test across projects. (3) Make Ivan's re-entry call (4 missed). (4) Backfill my own W05 meta-project entry.

#### Week 06 — after-session update
- **Ran the material-design-skill plan, and it's the breakthrough of the session.** The reliable way to get the design we want is a skill that references the visual style. Took a Material Design skill template (already has tokens, type scale, component rules, banned moves defined), adapted it by feeding image references; the model rewrote it into `classarcade-design` v2 fitting Paula's product. Built two ClassArcade screens (roster + profile) in near-perfect sync. Files: `Journal/participants/paula/classarcade-v2/`.
- **Why it beats a brief:** a brief is prose the model can average against; a skill is a build contract (tokens + type scale + component recipes + refusals) injected up front, every time. Most operational form of the week-03 anti-stock argument yet.
- **Strategic consequence:** this is probably the way forward, so the workshop needs rethinking, past and future steps. Where the skill gets built in the sequence, how the visual-direction and design-system sessions feed it, what gets cut now the skill does the heavy lifting. This is a real revision pass like the week-02 plan rewrite, not a tweak. Do it before session 07 plans go out.
- **Cleanup it triggers:** the `classarcade-design` v2 skill supersedes Paula's Session 02 visual brief (typography, avatars, ground, palette) and her in-session DM Serif Display call (Fraunces serif now). Write the v2 addendum or mark the brief superseded.
- **Open: do the same for Wattlog and Naučimo.** Run the skill-from-reference adaptation per project. Ivo's material-skill result already pointed at this; now it's proven.
- **Push for week 07:** Lead with the workshop-revision pass. Then handbook redesign. Then roll the skill workflow to Wattlog + Naučimo. Ivan re-entry call still outstanding. Still owe my W05 entry.
