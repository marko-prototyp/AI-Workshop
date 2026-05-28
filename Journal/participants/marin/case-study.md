---
participant: "Marin"
project: "Naučimo Hrvatski"
status: "draft"
sessions_completed: 4
last_updated: "2026-05-27"
hero_image: ""
final_url: ""
---

# Naučimo Hrvatski

> First-person case study. Marin's voice. Built across 12 sessions. Reviewed by Marin before publication.

## TL;DR

A language-learning app for one specific person. My girlfriend, in Philadelphia, learning Croatian for when she moves to Osijek. A memory book she reads chapter by chapter. Each chapter is one of our actual trips together. To turn the page she has to do something in Croatian: describe a photo, fill in what she would have said, retell the day. Croatian is the price of admission to her own memories. Not Duolingo. Built around one real relationship.

---

## The brief

*Two paragraphs.*

My girlfriend lives in Philadelphia. I live in Osijek. We FaceTime constantly. She's been picking up Croatian piece by piece, but the apps out there don't help. Duolingo doesn't have Croatian at all. Everything else feels generic, like a textbook with a green owl.

So I built her something that doesn't feel like an app. It feels like talking to me. Five scenarios from our actual life. The morning call. The evening wind-down. The market. A tour of Osijek. Planning her next visit. An AI that knows our context, responds in Croatian, slips the English translation in next to the line, corrects her without making it a quiz.

## The constraint that mattered most

**Built on conversational AI, not custom curriculum.** I'm a designer, not a linguist. I'm not going to write a Croatian course. What I can do is design the conversations my girlfriend and I already have, and let an AI play my side of them in Croatian.

## The reference move

The way couples actually talk in another language. Not a course. Not gamification. Specific to her, specific to our life.

*Add 3 reference images here in session 5–6.*

## Session-by-session

### Session 01 — Ran the handbook solo and shipped a prototype.

I joined the workshop in an unusual way. I missed the live session, so I opened the handbook on the workshop site at my own desk and ran Session 01 solo.

Claude interviewed me about my strengths, what I want to be known for, what energizes me versus what drains me. I refused a few generic project directions before I said the thing I actually wanted to build was an app for my girlfriend.

By the end of my self-directed hour, I had a working prototype with five scenario cards. *Jutarnji poziv*. *Večernji razgovor*. *Na tržnici*. *Grad Osijek*. *Planiranje posjeta.* Each one runs an AI conversational partner in Croatian, with English translations in brackets, gentle correction as you go.

I sent the result back, asked to join as a participant, and got onboarded as the fourth one.

The thing I haven't done yet, which I'll do before session 02, is name what I'm *not* building. The others did this together in session 01. I was working alone.

*One screenshot of the five-card prototype.*

### Session 02 — Changed my mind about the whole thing.

I came in with the FaceTime app from session 01 and left with a completely different concept. The lever was a research check. We looked at ten indie language apps — TutorLily, Univerbal, Gliglish, Langotalk, TalkBits, AI LingoPlay, Langua, LingoStar, Copycat Cafe, Praktika — and the finding was that no app on the market is built around a couple's actual relationship as the core scenario. That gap was the thing.

Once I saw it, the conversation app I built in session 01 felt wrong. Not bad, just wrong for what this project should be. The right shape was a memory book.

So now it's six chapters, mapped to actual trips we've taken since we met:

1. Her first time in Croatia — December 2024 to January 2025
2. Me in Colorado — April 2025
3. Me on the Jersey Shore — July 2025
4. Her second time in Croatia — December 2025 to January 2026
5. Me back in Colorado — April 2026
6. Her trip in September 2026, less than four months away

The way it works: each chapter opens at the airport. Each scene inside is a day or a moment from the trip. A photo, two to four sentences in Croatian with a translation toggle, one language interaction. To turn the page she has to do it. Most scenes are "describe the photo." Each chapter ends with a "story rebuild" where she retells the whole trip in Croatian, the AI gently corrects, and the result gets saved as her own in-Croatian version of the trip.

No streaks. No hearts. No guilt notifications. This is a gift, not Duolingo. If she misses a day, the AI character just picks the conversation back up. Marko would describe it as the part where I refuse to make my girlfriend feel bad for missing a day, which is correct.

Claude pushed back on the six-chapter v1 scope. The recommendation was to build chapter 1 fully before touching the others. Hand it over as a working gift, then keep dropping new chapters into it over time. I haven't committed yet. That's the decision I need to make before session 03.

Other thing to figure out: how I feed Claude descriptions of the trips so the app actually has something to teach from. Photos, contexts, what we ate, what we said. That's writing work I haven't started.

*Screenshot: the chapter map.*
*Screenshot: the "describe the photo" scene template.*

### Session 03 — Locked the direction. Built the first real scene.

The session focused on visual direction. Three distinct directions generated — Memory Press, Tender Thread, Adriatic Dusk — I selected Adriatic Dusk and iterated from there. Two rounds of mockups, a type system locked, and the first real scene screen built.

The direction: glassmorphic. Full-bleed trip photography as the background, frosted glass containers floating over it, Playfair Display italic for the Croatian language and the scene titles, DM Sans for the UI chrome. Every screen should feel like opening a private memory. It should never feel like an app.

The first scene built was Scena 3 · Sarma kod bake. Warm amber background. Playfair italic at display scale for the scene title. Frosted glass narration card. A Marko pill. Word hint chips. Nastavi at the bottom. The line on the narration card: *Bakina kuhinja miriše na nedjelju, na dim i na sarmu.* That's what the whole project is aiming at — one specific kitchen, one specific Sunday, one specific smell.

The friction through the session was the typeface. I had defined DM Sans for the UI layer. Claude kept defaulting to something else. It took a direct correction and a round of uploaded references to hold it. Once it landed, it landed.

By the end of the session I had the direction I wanted. The brief is written: five colors inside the warm amber to terracotta to ivory range, two typefaces that never swap roles, a 15-item banned moves list (no bottom tab bars, no green/red feedback, no gradient text, no "Great job!," no "Streak").

What's next: feeding Claude the actual trip content. Stories, context, photos. That writing work hasn't started, and the scenes can't feel personal and specific until it has.

*Screenshot: the Scena 3 · Sarma kod bake mockup — glassmorphic, full-bleed warm amber, Playfair italic, frosted card, Marko pill.*

### Session 04 — The content work starts.

Hit the usage limit thirty minutes in. Switched to Sonnet, kept going, then moved to manual work — writing the trip content the scenes need to feel like something real happened in them.

This was the right thing to do. I've been circling it since the visual direction session. The scenes have a shape now; they don't have content. No amount of design work makes Scena 3 feel like the actual Sunday at baka's kitchen without the writing behind it. The usage limit forced the decision early. Better now than mid-build.

A 1:1 follow-up is scheduled to pick up from here and cover what didn't get resolved in the main session.

*Notes on trip content to come — what got written, what's still missing.*

### Session 05 — _to come_

*…through Session 12.*

---

## What I built

*Screenshots of the finished app. Three to five images covering: the scenario picker, one scenario in progress, the AI response with translation, the correction flow, the moment she actually uses it.*

## What I changed about how I work

*To fill in session 11–12.*

## What's still wrong with it

*Three things, minimum.*

1.
2.
3.

## What I'd do next

*One paragraph. Direction, not features.*

---

## Credits

Built during the AI for Designers 12-session workshop, run by Marko at Prototyp. With Ivo, Ivan, and Paula building alongside.
