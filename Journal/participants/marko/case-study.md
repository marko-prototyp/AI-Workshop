---
participant: "Marko Kolić"
project: "AI for Designers — the program, the website, the journal"
status: "draft"
weeks_completed: 2
last_updated: "2026-05-13"
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

### Week 03 — _to come_

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
