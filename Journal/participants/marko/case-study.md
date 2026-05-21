---
participant: "Marko Kolić"
project: "AI for Designers — the program, the website, the journal"
status: "draft"
weeks_completed: 3
last_updated: "2026-05-20"
hero_image: ""
final_url: ""
---

# AI for Designers — the meta-project

> First-person case study, Marko's voice. The facilitator running the program also ran his own 12-week build: this website, this journal, the way the whole thing holds together. Reviewed by Marko before publication.

## TL;DR

I built a 12-week workshop for our agency's designers to learn AI by actually shipping something. Then I built the website that frames it, the journal that documents it, and the workflow that turns each session into something a participant takes home. The website is also the proof: a meta-demonstration of what the program teaches.

---

## The brief

I wanted a workshop people would enjoy and learn from. Not a slide deck. Not a recorded course. A weekly hour where designers built something real with Claude. And where the way the program was run was itself an example of the way the program teaches you to work.

So the "deliverable" became three things, not one: the program itself, the website that hosts it, and the journal that documents the whole thing as it happens. All three had to be readable, opinionated, and finished by session 12.

## The constraint that mattered most

**Plain HTML/CSS/JS with a tiny Node build.** No React, no Vite, no CMS. The stack should be readable in an afternoon. If we're teaching designers to work with AI on real things they ship, the program's own site has to be one they could clone and understand. No magic.

## The reference move

Editorial sites, not SaaS marketing pages. Anti-stock as a principle, not a style. The site argues a point of view, and the point of view is the whole program's point of view.

*Add 3 reference images here in week 5–6.*

## Week-by-week

### Week 01 — Build the journal, run the first session.

The first session ran with three participants in the room: Ivo, Ivan, and Paula. A fourth, Marin, ran the handbook solo at his own desk and asked to join after. While they set their projects, I shipped the journal infrastructure that captures the whole program: raw notes, facilitator synthesis, per-participant case studies, and a public weekly post.

The copy lesson hit early. First draft was 100% AI-detectable. Ivo could tell within seconds. By v3 it started to not suck. That iteration cycle became something I'd watch for in every session's facilitator output going forward.

The bigger decision was structural: bring agency experts into the program. Ivan went to talk to Seba, our dev who already shipped Photato. From now on, when a project needs domain expertise the wider team participates as mentors. The program isn't a one-facilitator show.

*One screenshot of the Claude project surface showing the build trail.*

### Week 02 — Rewrote the plan between sessions.

Session 02 gave me two sessions of real participant work to look at. That was enough to see what the program actually needs versus what I'd assumed at the planning stage. So between session 02 and session 03, I did a full revision pass on the workshop plan.

Some sessions changed. A few topics shifted. Parts that had felt necessary on paper but weren't earning their place in the room came out. The remaining sessions are tighter, with more room for participants to plan ahead, test, and review work properly. That's what they actually need at the 1–2 hour per session budget.

The prompts got rewritten. Every session now has its own set that match what the session is actually asking participants to do, instead of the generic versions I started with. I also added a small intro challenge to the top of every session called *Think Before You Prompt*. It frames how to talk to Claude before opening the chat. A small thing, but the kind of habit that compounds across twelve sessions.

Each session now also names the Claude model and mode it expects. We're running each session in its own chat, so picking the right Claude for the work matters more than it would if the conversation was continuous.

The journal got a small redesign too. A contents side panel for navigation as more entries land. The voice the AI uses to draft entries got tightened. Multiple rounds of pushback, draft after draft, until the entries actually capture what the session was like instead of reading as polished but empty recaps.

And I moved my own work over to Claude Cowork. The personal-Jarvis test, with the workshop as the workload. We'll see how the desktop-agent version handles the more complex agentic tasks.

*Screenshots: the revised session plan diff, the new contents side panel, the Think Before You Prompt page.*

### Week 03 — The briefs were thorough. The outputs were all the same.

Three participants ran the visual direction session and came out with design briefs they'd written themselves. Warm palettes, type systems, banned-moves lists. The briefs were good. The designs weren't.

I watched it happen in the session. Claude produced three initial directions per project. Everyone rejected them, went to Pinterest, brought references back in, iterated. The second-pass outputs were better but still recognizable — the stock spacing, the color choices that belong to a template, the typography that's clean in a way that doesn't belong to anything. At the end, Ivo asked "how do I make this look less like AI made it?" Nobody had an answer.

After the session I tried running the same prompts myself in chat and got nearly identical results. So I opened separate sessions and started testing.

**The first thing I found: a thorough specification is not the same as a useful brief.**

Ivo's brief was the most thorough document any participant had written. Every component specified. Exact values. Layout diagrams in ASCII. I audited the output it produced and found 19 specific AI tells — not vague "this feels generic," but concrete things: `letter-spacing: 0.2em` on every label, `font-weight: 300` used decoratively, a rationale strip at the bottom of the dashboard explaining why the design was unconventional. That last one is the clearest tell. Design that defends itself is admitting the defense is necessary.

The original brief was a style guide: it described what the output should look like. What I needed to write instead was a constraint system: something that describes what the output cannot be. The difference is operational. A specification tells the model what to generate. A constraint system closes off the default options — the patterns AI reaches for when there's open space — and forces it to find something that isn't the default.

The rewrite started with two cultural anchors (Braun hardware, Nothing OS) and worked from there. Before touching the dashboard, I built a small testbed component — a 320×420 fitness widget — and derived the constraints from that. By the fifth round of iteration the banned list was longer than the specification. Helvetica Neue instead of Inter. No `font-weight: 300`. No tinted accent variants. No delta arrows. Orange used exactly three times across the whole screen. The widget was the cleanest thing I'd built in the session. We scaled it to the full dashboard with the same constraints applied.

The closing line of the new brief: *a style guide tells you what something looks like; a constraint system tells you what it can never be.*

**The second thing I found: reference images override words, every time.**

Paula's ClassArcade had run through three separate build sessions and come back looking the same every time. Saturated mint and purple. Rounded Nunito everything. Emoji avatars with thick rings. The brief was being followed. The output was still generic. We added a banned-moves list. The output got worse — describing the things to avoid was confirming they were in scope.

The root cause was two screenshots uploaded at the start of the original session. Both were children's app UI. Saturated colors, mascot blobs, rounded type. Once those were in the conversation, every subsequent prompt was filtered through them regardless of what the brief said.

Changing the reference images broke the cycle. Two new ones: a kids academy landing page with Fraunces italic headlines mixed with bold sans, a play-and-learn site with white-dominant layouts and editorial type. Same target audience, opposite visual language. The first build with the new references was the first one that didn't look like the others.

The side-by-side comparison was the technique that made the gap concrete. Telling the model "this is too generic" got polite agreement and another generic result. Pasting both versions and asking it to name the specific differences produced an analysis I could actually work from. The prompt: *"Compare the differences and write down the findings."* Four words. More useful than three sessions of brief refinement combined.

Both briefs got rewritten with these findings built in. The ClassArcade v2 brief opens with a diagnosis of why v1 failed. Every retired element has a named replacement — not just a ban, a replacement. "Retired: Nunito. Replacement: Fraunces italic for expressive text, Plus Jakarta Sans for interface chrome." Ban alone isn't enough. The model anchors to the world being described, not the negation.

**The framework that came out of it:**

The better approach to AI design prompting isn't more detail. It's more operational restriction. Leave fewer degrees of freedom.

The most transferable things I learned from this:

*Govering principle over vibe words.* "Minimal, clean, modern" leaves the model averaging across thousands of interfaces that match those words. "Braun hardware plus Nothing OS" points at a specific design logic — whitespace as structure, typography as hierarchy, restraint as identity — that is much harder to dilute into generic output. Both improved briefs opened with a governing principle that could guide every subsequent decision.

*Typography as identity removes the need for decoration.* Wattlog's TSB at 104px as a typographic object did more than any component spec. ClassArcade's shift from Nunito to Fraunces italic mixed with Plus Jakarta Sans changed how the product felt more than any color decision. When typography carries the personality, color can step back into a signal role. Both improved briefs learned this: restrict color heavily, give it clear roles, no decorative use, no tints. AI overuses color. Good prompts make it scarce.

*Structural instructions changed output more than visual references.* Telling the model to build a table instead of a card list, a ruled ledger instead of stat cards, a hand-drawn chart instead of a chart library — these structural changes produced the most specific output. The model has strong opinions about what a "dashboard" or a "student list" looks like. Structural instructions block those opinions before they form.

*Every ban needs a replacement.* "No emoji avatars" leaves a gap. "No emoji avatars — use two-letter monogram initials in Plus Jakarta Sans 700" closes it. A ban alone reads to the model as confirmation the aesthetic is still in scope. The retired-with-replacement structure is the most effective single tool from this session.

*The prompt structure that works:* product job → governing design principle → hard constraints (typeface, color, layout, components) → AI defaults blacklist → retired/replacement rules → output requirements → success checklist. Each section earns its place. The checklist at the end is yes-or-no, not judgment — "Is Fraunces italic loaded on this screen? Are XP numbers in Fraunces italic 700? Does the headline mix both fonts?"

The deeper lesson, which I didn't expect going into this: the model improves when you understand its failure mode and write the brief against it. The briefs that worked weren't written for a human designer. They were written for the specific ways an AI designer degrades.

*Screenshots: the Wattlog testbed widget, the original vs improved dashboard side-by-side, the ClassArcade v1 vs v2 comparison.*

### Week 04 — _to come_

*…through Week 12.*

---

## What I built

*Screenshots: the homepage, the journal page in session 12 with all 12 entries, the per-participant case study pages, the prompt library, the dark/light mode comparison, the Claude project surface showing the build trail.*

## What I changed about how I work

*To fill in week 11–12.*

## What's still wrong with it

*Three things, minimum.*

1.
2.
3.

## What I'd do next

*One paragraph. Direction, not features.*

---

## Credits

Built during the AI for Designers 12-week program, with Ivo, Ivan, Marin, and Paula building alongside. Agency dev support from Seba (Photato).
