# Marin Galić — Naučimo Hrvatski

*A personalised Croatian language learning app for one person*
*AI for Designers — 12-session workshop*
*Last updated: 13 May 2026 (end of Session 02)*

---

## At a glance

| | |
|---|---|
| **Project** | Naučimo Hrvatski |
| **Type** | Personal app, gift, N=1 audience |
| **Track** | UI/UX |
| **Built in** | Web prototype, Anthropic API (Claude Sonnet 4) backend |
| **Time budget** | 1–2 hours per session × 12 ≈ 12–24 hours |
| **Primary user** | Kenzie. Marin's American girlfriend. |
| **Status** | Concept reframed mid-session 02. Chapter scope decision still open. |

## The designer

Marin is a UI/UX designer working in the mobility industry: micromobility, EV, urban transport. He's known for punchy short-form social content and edits podcasts and reels for mobility companies. The original brief was to build something for his career. He pivoted mid-program to a personal project: this Croatian app for Kenzie.

The motivation is direct. Kenzie plans to move from Philadelphia to Osijek long-term. Croatian is hard. Existing apps (Duolingo) don't even teach it. The app is both a teaching tool and a love letter.

### Profile snapshot

- **Strongest at:** punchy, high-impact short-form communication.
- **Wants to be known for:** communicating, presenting, out-of-the-box thinking in the new mobility space.
- **Energised by:** futuristic mobility — micromobility, EVs, urban mobility.
- **Drained by:** manual content pipeline — recording, editing, exporting reels and podcasts.
- **AI experience level:** experimenting.

The career project was the original target. The personal project displaced it. That's worth noting because the workshop is built around personal-project depth, and Marin chose the version that delivers more of it.

## The project — current state

A memory book that teaches Croatian. Each chapter is one of Kenzie and Marin's trips together. As Kenzie walks chronologically through the trip, photo by photo, day by day, she learns Croatian by describing, narrating, and reconstructing what they experienced together.

### Working tagline

*"Practice Croatian by reliving us."*

### The metaphor

A book she reads. To turn each page, she does a small Croatian language interaction. The book remembers where she stopped. She picks up where she left off: Day 4, Marin's grandma's house, the sarma.

### The emotional engine

She doesn't open the app to "do her daily lesson." She opens it because she wants to relive the trip. Croatian is the price of admission to her own memories.

## The six chapters

Mapped to real trips since they met.

| # | Chapter | When |
|---|---------|------|
| 1 | Kenzie's first time in Croatia | December 2024 – January 2025 |
| 2 | Marin in Colorado | April 2025 |
| 3 | Marin back on the Jersey Shore | July 2025 |
| 4 | Kenzie back in Croatia (2nd time) | December 2025 – January 2026 |
| 5 | Marin back in Colorado | April 2026 |
| 6 | Kenzie's upcoming trip to Croatia | September 2026 (less than four months away) |

**Open decision:** Claude recommended building Chapter 1 fully in v1 instead of six half-built chapters. Hand it to Kenzie as a working gift, then keep building the rest as quiet surprise drops. Marin has not yet committed.

This is the most consequential decision still open across the whole cohort. Everything downstream depends on it.

## Learning mechanics

Four mechanics considered. The final pick is a hybrid of 1 and 4, with 3 as a bridge.

### 1. "Describe the photo" — primary mechanic

A photo appears. Kenzie describes what she sees, in English or attempting Croatian. The app shows the correct Croatian sentence with the words breaking down underneath. Vocabulary repeats across scenes. By photo 5 she's typing fragments in Croatian unprompted.

Photos are already the emotional anchor of the concept. Making the photo the language prompt fuses memory and study into the same object.

### 2. "Fill in Marin's voice" — deferred to v2

Marin's voice narrates each scene in Croatian. Certain emotionally peak sentences are blanks Kenzie fills in. *"Volim te"* at the Drava, etc. Too much audio production for a solo build. Save for 1–2 peak moments per chapter once the rest works.

### 3. "Translate the message I would have sent" — bridge feature

Marin writes short English text messages about a moment from the trip. Kenzie translates to Croatian. The AI (Marko, the Croatian character from the v1 prototype) responds in Croatian as if she'd actually texted him. Unlocks after chapter completion. Connects the memory-book concept to the FaceTime-conversation prototype.

### 4. "The story rebuild" — chapter finale

After 5–7 photo-driven scenes, Kenzie retells the whole chapter's story in Croatian using the vocabulary she just learned. The AI gently corrects. The retelling gets saved into the book as her own Croatian-language record of the trip.

### Cross-cutting principles

- Gentle, in-conversation corrections. Never red Xs, never popups breaking the flow.
- Vocabulary "shelf" at the end of each chapter. A glossary like the back of a real book.
- "Marko remembers" recaps at session start. Spaced repetition disguised as a Croatian "do you remember that night?" message from the AI character.
- **No streaks. No hearts. No guilt notifications.** This is a gift, not Duolingo.

## Origin story

### Session 01 — Meet Claude. Pick your project.

Interviewed for strengths, audience, project direction. Explored seven possible project directions (tiny tool, interactive case study, microsite, mini design system, newsletter product, thesis-driven brand site, reel template system, mobility pitch tool). Pivoted to the Croatian app.

Built a first working prototype in-session: **Naučimo Hrvatski v1**. A FaceTime-style conversation app with five scenarios (morning call, evening wind-down, market, Osijek city tour, planning a visit). AI plays a Croatian boyfriend character, responding in Croatian with English in brackets.

### Session 02 — Research & Synthesis

Surveyed 10 indie reference apps in the conversation-based language learning space.

**Tools surveyed:** TutorLily, Univerbal, Gliglish, Langotalk, TalkBits, AI LingoPlay, Langua, LingoStar, Copycat Cafe, Praktika.

**Confirmed gap in the market:** No live app is built around a couple's relationship as its core scenario.

That finding was the lever. The conversation app from session 01 was the wrong shape. The memory book was the right one.

**Reference patterns to borrow:**

| App | Pattern |
|-----|---------|
| TutorLily | Mix native + target language naturally, sliding the ratio as the learner improves. |
| Univerbal | Fill-in-the-blanks "scene builder" UI primitive. |
| Gliglish | Adjustable conversation speed — half-speed mode for beginners. |
| Langotalk | "Companion picker" — let Marko be in different modes for different scenes. |
| TalkBits | Streaming STT → LLM → TTS for low-latency illusion of a real call. |
| AI LingoPlay | Show character's photo + name + one-paragraph backstory before each chat. |
| Langua | Two-tier feedback: gentle in-conversation nudges + structured post-call recap. |
| LingoStar | In-flow inline corrections — main bubble + quiet correction note underneath. |
| Copycat Cafe | Pre-load 8–12 words per scene before the conversation starts. |
| Praktika | Steal the "call" UI shell (timer, end-call button, mute, name+photo) without rendering an avatar. |

**What to avoid:** Duolingo-style streaks, hearts, guilt notifications. Every reviewer of the apps above praised the absence of these mechanics. For a long-distance gift, a guilt trip is catastrophic.

## Decisions committed to

| Session | Decision |
|---|---|
| 01 | Personal project over career project. Croatian app for Kenzie. |
| 01 | Work on it productively once a week for an hour. |
| 02 | Reframed concept: memory book that teaches Croatian, not FaceTime conversation app. |
| 02 | Six chapters mapped to actual trips. |
| 02 | "Book" over "album" — continuous narrative per chapter. |
| 02 | Hybrid learning mechanic: photo-driven scenes plus story rebuild at chapter end. |

## Open decisions

1. **One chapter fully vs six chapters partially.** Claude recommends one. Marin hasn't committed. Most consequential open decision in the cohort.
2. **Chapter 1 scope.** How many scenes does the Dec 2024 – Jan 2025 chapter contain? Gut-feel estimate needed before content authoring.
3. **Trip data ingestion approach.** Marin will feed Claude descriptions, photos, contexts. Format and process TBD.
4. **Surface for the app.** Web, mobile-first responsive web, or native?
5. **Voice integration.** TTS for Croatian audio? Marin's own voice for peak moments?

## Technical approach

### Built in session 01 (working prototype)

HTML/JS frontend. Anthropic API (Claude Sonnet 4) backend. Five scenario cards, persistent vocabulary panel, chat UI with bracket-translation rendering, character system prompts for each scenario.

### To build (session 03+)

- Scene player UI — photo on top, narration in the middle, language interaction at the bottom, continue button.
- Chapter data model — likely a single JSON or content file per chapter, with an ordered list of scenes.
- Progress persistence — which scene she's on, which vocabulary she's seen, which chapters are unlocked.
- Vocabulary shelf — auto-built from the scenes in each chapter.
- AI integration — "describe the photo" feedback, "Marko remembers" recaps, story rebuild correction.

### Working principles

1. Build for Kenzie, not for an app store. N=1 is a feature.
2. The memory is the curriculum. Every learning moment is anchored to a real shared experience.
3. Croatian is earned, not assigned. Lessons unlock memory, not the other way around.
4. No guilt mechanics. Ever.
5. Ship small, ship real. Chapter 1 in Kenzie's hands beats six chapters in a Figma file.

## Artifacts produced

- Naučimo Hrvatski v1 prototype — working app with five scenario cards (session 01).
- Survey of 10 indie language tools (session 02).
- Project documentation file — current.

## Quotes worth keeping

> "Croatian is super hard, and I want to be better than these other apps out there. Find a new way of learning Croatian."

Session 01. The why.

## What's next

**Session 03:** Concept refinement and trip data ingestion. Figuring out the format for feeding Claude descriptions, photos, and contexts of the trips so the app has something to actually teach from.

**Stuck:** The one-vs-six chapter decision. Until it's made, scope is undefined.

## Facilitator notes

Marin had the biggest project shift of the cohort in session 02. The reframe from FaceTime app to memory book was the right one, and it came from a research check, not from internal frustration with the prototype. That's a good lesson about when research earns its place. The conversation app would have shipped as a perfectly fine personal project; the memory book is in a different category entirely.

The chapter-scope decision is the one I want him to commit to before session 03 ends. One chapter fully built is a working gift; six chapters half-built is a deck. Marin knows this and is hesitating, probably because committing to one chapter feels like giving up on the ambition. Reframe for him: chapter 1 fully built lets you put it in Kenzie's hands. Chapters 2–6 become drops over time, which is its own form of gift. The constraint produces more, not less.

Trip data ingestion is going to be the practical bottleneck. Marin will need to write descriptions of the trips in enough detail for Claude to teach from them. That's writing work. Worth helping him scope what "enough detail per scene" actually looks like. A paragraph? Three sentences? A list of nouns and verbs? Without a target, the writing task expands forever.

The emotional stakes are real and the deadline is real (September 2026). Both are good for the project. They tend to flush out everything that isn't essential.
