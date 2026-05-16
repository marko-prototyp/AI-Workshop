# Naučimo Hrvatski — Project Documentation

*A personalized Croatian language learning app for Kenzie, built by Marin*
*AI for Designers Workshop — 12-Week Build*

---

## Project at a Glance

**What it is:** A long-form, memory-driven Croatian language learning app for one specific person — Marin's American girlfriend Kenzie — built around the real trips they've taken together since meeting as exchange students in New Jersey.

**Core concept:** A memory book that teaches Croatian. Each chapter is one of their trips together. As Kenzie walks chronologically through the trip, photo by photo, day by day, she learns Croatian by describing, narrating, and reconstructing what they experienced together.

**Why it exists:** Kenzie plans to move from Philadelphia to Osijek, Croatia long-term. Croatian is a hard language, and existing apps (notably Duolingo) don't even teach it. The app needs to make the language feel earnable, emotional, and personal — not like a chore.

**Tagline (working):** *"Practice Croatian by reliving us."*

---

## About the Designer

Marin is a UI/UX designer joining a 12-week workshop on building personal projects with AI. The original brief was to build something for his career — he's a mobility industry designer and content creator known for punchy short-form social content, who works with micromobility/EV/urban mobility companies and edits podcasts and reels for them.

Through interview, the following profile surfaced:

- **Strongest at:** punchy, high-impact short-form communication
- **Wants to be known for:** communicating, presenting, out-of-the-box thinking in the new mobility space
- **Energized by:** futuristic mobility — micromobility, electric small vehicles, new vehicle categories, urban mobility
- **Drained by:** manual content pipeline — recording, editing, exporting reels and podcasts
- **Target audience for career project:** mobility founders and niche-industry content creators
- **North star for career project:** helping people look credible
- **AI experience level:** experimenting

**Mid-program, the project pivoted away from career work** into something personal: building this Croatian app for Kenzie. The motivation is direct and unambiguous — he wants her to be able to live with him in Osijek, and the app is both a teaching tool and a love letter.

---

## Origin Story

The project evolved across two workshop sessions:

### Session 01 — "Meet Claude. Pick your project."

- Interviewed about strengths, audience, and project direction
- Explored 7 possible project directions (tiny tool, interactive case study, microsite, mini design system, newsletter product, thesis-driven brand site, reel template system, mobility pitch tool)
- Pivoted to a personal project: a Croatian learning app for his long-distance girlfriend in Philadelphia
- Built a first working prototype in-session: **"Naučimo Hrvatski v1"** — a FaceTime-style conversation app with 5 scenarios (morning call, evening wind-down, market, Osijek city tour, planning a visit), AI playing a Croatian boyfriend character, responding in Croatian with English in [brackets]

### Session 02 — "Research & synthesis"

- Surveyed 10 indie reference apps in the conversation-based language learning space
- Confirmed: no current app is built around a couple's relationship as its core scenario — the concept sits in unclaimed positioning territory
- **Reframed the concept** from generic conversation scenarios to a memory-book structure built on real trips together
- Locked in 6 chapters mapped to actual trips since they met
- Chose "book" (continuous narrative per chapter) over "album" (standalone vignettes)
- Landed on a hybrid learning mechanic: photo-driven scene lessons throughout each chapter, capped by a "story rebuild" at chapter end

---

## The Concept (Current State)

### The metaphor

A memory book she can read. But to turn each page, she has to do a small Croatian language interaction. The book remembers where she stopped. She picks up where she left off — Day 4, Marin's grandma's house, the sarma.

### The emotional engine

She doesn't open the app to "do her daily lesson." She opens it because she wants to relive the trip. Croatian is the price of admission to her own memories. The motivation is reverse-engineered from how the iPhone Photos app surfaces nostalgic throwbacks — except here, the throwback only unlocks if she does the language work.

### The structure of a chapter

A chapter is one trip, told as a continuous chronological story:

- Opens at the airport / arrival
- Each "scene" inside the chapter is a day or a moment (sarma at grandma's, walking by the Drava, New Year's in Rome, etc.)
- Each scene contains: one anchor photo, 2–4 sentences of Croatian narration with English toggle, one language interaction, a "continue" button that only activates after the interaction
- Chapter closes with a "story rebuild" — Kenzie retells the whole trip in Croatian, AI gently corrects, and the result is saved as a kind of in-Croatian love letter back to Marin

### The 6 chapters (mapped to real trips)

| # | Chapter | When |
|---|---------|------|
| 1 | Kenzie's first time in Croatia | December 2024 – January 2025 |
| 2 | Marin in Colorado | April 2025 |
| 3 | Marin back on the Jersey Shore | July 2025 |
| 4 | Kenzie back in Croatia (2nd time) | December 2025 – January 2026 |
| 5 | Marin back in Colorado | April 2026 |
| 6 | Kenzie's upcoming trip to Croatia | September 2026 *(<4 months away)* |

**Strategic recommendation (open):** Build Chapter 1 completely in v1 instead of six half-built chapters. Hand it to Kenzie as a working gift, then keep building the rest in the background. Each new chapter becomes a small surprise drop rather than a finished-and-static product.

---

## Learning Mechanics

Four mechanics were considered. The final pick is a hybrid of #1 and #4, with #3 as a bridge feature.

### 1. "Describe the photo" — primary mechanic ✅

A photo appears. The app prompts Kenzie to describe what she sees. She types in English or attempts Croatian. The app shows her the correct Croatian sentence, with the words breaking down underneath. Vocabulary repeats across scenes, so by photo 5 she's typing fragments in Croatian unprompted.

**Why this was chosen:** Photos are already the emotional anchor of the concept. Making the photo the language prompt fuses memory and study into the same physical object.

### 2. "Fill in Marin's voice" — deferred to v2 ⏸

Marin's voice narrates each scene in Croatian. Certain emotionally peak sentences are blanks Kenzie has to fill in (*"Volim te"* at the Drava, etc.).

**Why deferred:** Too much audio production work for a solo build. Save for 1–2 peak moments per chapter once the rest works.

### 3. "Translate the message I would have sent" — bridge feature ✅

Marin writes short English text messages about a moment from the trip. Kenzie translates to Croatian. The AI (Marko, the Croatian character from v1's prototype) responds in Croatian as if she'd actually texted him, continuing the conversation.

**Role:** Connects the memory-book concept to the FaceTime-conversation prototype already built. Unlocks after chapter completion.

### 4. "The story rebuild" — chapter finale ✅

After 5–7 photo-driven scenes, Kenzie retells the whole chapter's story in Croatian using the vocabulary she just learned. The AI gently corrects. The retelling gets saved into the book as her own Croatian-language record of the trip.

**Role:** Each chapter's "boss level." Closes the trip with a moment where she owns the memory in Croatian.

### Cross-cutting principles

- **Gentle, in-conversation corrections.** Never red Xs, never popups breaking the flow.
- **Vocabulary "shelf" at the end of each chapter.** A glossary like the back of a real book.
- **"Marko remembers" recaps at session start.** Spaced repetition disguised as a Croatian "do you remember that night?" message from the AI character.
- **No streaks. No hearts. No guilt notifications.** This is a gift, not Duolingo. Missing a day should feel like Marko gently picking the conversation back up, not punishment.

---

## Technical Approach

### Built in Session 01 (working prototype)

A functional AI conversation app: HTML/JS frontend, Anthropic API (Claude Sonnet 4) backend. Five scenario cards, persistent vocabulary panel, chat UI with bracket-translation rendering, character system prompts for each scenario.

### To build (Sessions 03+)

- **Scene player UI** — photo on top, narration in the middle, language interaction at the bottom, continue button
- **Chapter data model** — likely a single JSON or content file per chapter, with an ordered list of scenes (each scene = photo URL + Croatian narration + English translation + language interaction config)
- **Progress persistence** — remember which scene she's on, which vocabulary she's seen, which chapters are unlocked
- **Vocabulary shelf** — auto-built from the scenes in each chapter
- **AI integration** — for "describe the photo" feedback, the "Marko remembers" recaps, and the chapter-end story rebuild correction

### Time budget

1–2 hours per week × 12 weeks ≈ 12–24 hours of build time. This is tight. Chapter 1 only, done well, is the realistic v1 target.

---

## Reference Research

10 indie conversation-based language learning apps were studied for reference patterns. Full research file is separate. Key takeaways for this project:

| App | Pattern to borrow |
|-----|-------------------|
| **TutorLily** | Mix native + target language naturally, sliding the ratio as the learner improves |
| **Univerbal** | Fill-in-the-blanks "scene builder" UI primitive |
| **Gliglish** | Adjustable conversation speed — half-speed mode for beginners |
| **Langotalk** | "Companion picker" — let Marko be in different modes for different scenes |
| **TalkBits** | Streaming STT → LLM → TTS for low-latency illusion of a real call |
| **AI LingoPlay** | Show character's photo + name + one-paragraph backstory before each chat |
| **Langua** | Two-tier feedback: gentle in-conversation nudges + structured post-call recap |
| **LingoStar** | In-flow inline corrections — main bubble + quiet correction note underneath |
| **Copycat Cafe** | Pre-load 8–12 words per scene before the conversation starts |
| **Praktika** | Steal the "call" UI shell (timer, end-call button, mute, name+photo) without rendering an avatar |

**Confirmed gap in the market:** No live indie app is built around a couple's real relationship as the core scenario. This concept sits in unclaimed territory.

**What to avoid:** Duolingo-style streaks, hearts, guilt notifications, "you broke your streak" alerts. Every reviewer of the apps above praised the *absence* of these mechanics. For a long-distance gift, a guilt trip is catastrophic.

---

## Session Check-ins

### Session 01 — Meet Claude. Pick your project.

- **Made:** Narrowed down the idea. Started with the outline.
- **Most useful Claude moment:** Created a brief structure of the future app.
- **Friction:** None this week.
- **Decision committed to:** Work on it super productively once a week for an hour.
- **Stuck on:** Figuring out the basics of the app — how it will work, how it will benefit Kenzie compared to other apps. Mainly Duolingo, since Duolingo doesn't have Croatian.
- **Artifact:** Screenshot of Naučimo Hrvatski prototype — five scenario cards (Jutarnji poziv, Večernji razgovor, Na tržnici, Grad Osijek, Planiranje posjeta).
- **Quote-worthy line:** *"Croatian is super hard, and I want to be better than these other apps out there. Find a new way of learning Croatian."*
- **Next:** Continue figuring out how the app will be conceptualized.

### Session 02 — Research & synthesis

- **Made:** Came up with the concept for the future app.
- **Best/worst Claude moment:** None so far. Claude understood the idea well, and started steering well for the future.
- **Decision committed to:** Direction — the whole idea.
- **Artifact / quote:** None.
- **Next / stuck:** Figuring out the concept of the app — how Kenzie is going to learn Croatian, and potentially starting to feed Claude with information about the trips. Will need to give Claude descriptions of trips, photos, contexts, etc., for Claude to fully understand the relationship and what they've experienced together.

---

## Open Questions / Decisions Pending

1. **How many scenes does Chapter 1 (Dec 2024 – Jan 2025) contain?** Gut-feel estimate needed before content authoring starts. This number determines the realistic scope of v1.
2. **Build 1 chapter fully or 6 partially?** Claude recommends 1 fully. Marin hasn't committed yet.
3. **Trip data ingestion approach.** Marin will feed Claude descriptions, photos, contexts of the trips. The format and process for this is the next concrete thing to figure out.
4. **Surface for the app.** Web (easiest to ship), mobile-first responsive web (her phone is the natural device), or native (heaviest lift). Not yet decided.
5. **Voice integration.** Whether the app reads Croatian aloud (TTS), and whether Marin's own voice is used for peak moments. Open.

---

## Constraints

- **Time:** 1–2 hours per week × 12 weeks. Tight.
- **Audience:** N=1 (Kenzie). This is a gift, not a product. Personalization is the whole point.
- **Technical comfort:** Designer-led, experimenting with AI. Code generation via Claude is expected to do most of the heavy lifting.
- **Emotional stakes:** High. The app is meant to support a long-term relationship and an eventual international move. Quality of execution matters more than feature count.

---

## Working Principles

1. Build for Kenzie, not for an app store. N=1 is a feature, not a limitation.
2. The memory is the curriculum. Every learning moment must be anchored to a real shared experience.
3. Croatian is earned, not assigned. Lessons unlock memory, not the other way around.
4. No guilt mechanics. Ever.
5. Ship small, ship real. Chapter 1 in Kenzie's hands beats six chapters in a Figma file.

---

*Last updated: end of Session 02*
*Next session: Session 03 — concept refinement and trip data ingestion*
