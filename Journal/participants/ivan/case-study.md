---
participant: "Ivan"
project: "Mockup Generator"
status: "draft"
weeks_completed: 2
last_updated: "2026-05-13"
hero_image: ""
final_url: ""
---

# Mockup Generator

> First-person case study — Ivan's voice. Built across 12 weeks. Reviewed by Ivan before publication.

## TL;DR

A tool I built because I was tired of spending 20 minutes prompting an AI to mock up a t-shirt I designed. You upload a graphic. You make four choices. You get a realistic mockup. The interface does the prompting for you.

---

## The brief

*Two paragraphs. The frustration, the opportunity, the framing.*

The honest version: every existing mockup tool either takes too long, looks generic, or asks me to be a prompt engineer. I'm a designer. I want to upload a logo, dial in a feeling, and get something usable in 30 seconds. So I built that.

This isn't an image generator. It's a *UX layer* on top of one. That distinction is the whole project.

## The constraint that mattered most

**No custom model training.** Generation runs on existing image gen APIs (Flux or Ideogram) with pre-engineered style presets handling aesthetic consistency. Graceful fallback for bad generations. The interface does the work that prompt engineering would otherwise do.

## The reference move

Hardware, not software. Professional gear. Things that hide complexity behind a few well-shaped controls — a mixing console, a Leica, a Vitsœ shelving system. Not other AI tools.

*Add 3 reference images here in week 5–6.*

## Week-by-week

### Week 01 — The brief

The framing landed in the first session. Six input dimensions (subject, aesthetic preset, framing, lighting, environment, era/texture) combine into pre-engineered prompts under the hood. The user never sees a text field.

The risk Marko flagged: "bad generation fallback." Easy to defer; worth designing early.

*One screenshot of the brief / first sketch.*

### Week 02 — Three drafts, two arguments, one brief.

This session got the most pushback of any I've had so far, and most of it was Claude arguing with its own previous draft. The brief went through three versions. Two full rounds where Claude looked at what it just produced and said "this is wrong, here's why."

Things that changed across the drafts:

- Tap-to-refine got cut from v1 and replaced with a lock-and-shuffle pattern. Lock the chips that worked, shuffle the ones that didn't, regenerate. Explicit, not inferred.
- The input hierarchy got restructured. Subject and Aesthetic Preset are now primary and always visible. The other four dimensions collapse by default. If you only touch the two primary ones, you still get a good result.
- Background removal moved from a post-generation tool to an input option. "No background" is now just one of the choices inside Environment.

I also ran a research check on the API. GPT Image 2 is confirmed: 16 reference images per call, native 2K output, photorealism that handles lighting properly, both `images.generate` and `images.edit` endpoints. Brother it should be a wrapper that converts your inputs into as perfect as possible prompts for the AI.

The one thing I committed to and want on the record: no text inputs in UI because they force me to think and thinking is tiresome.

What's stuck: I'm scared of the API connection. Marko knows. We're doing a group walkthrough in session 04 or 05.

*Screenshot: the 10-tool competitive matrix.*
*Screenshot: the final brief with the lock-and-shuffle pattern sketched.*

### Week 03 — _to come_

*…through Week 12.*

---

## What I built

*Screenshots of the finished tool. Three to five images covering: the empty state, the four-control panel, a generation in progress, a finished mockup, the fallback flow.*

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

Built during the AI for Designers 12-week program, run by Marko Kolić at Prototyp.
