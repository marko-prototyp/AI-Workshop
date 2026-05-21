---
participant: "Paula"
project: "Classroom Behavior Tracker"
status: "draft"
weeks_completed: 2
last_updated: "2026-05-13"
hero_image: ""
final_url: ""
---

# Classroom Behavior Tracker

> First-person case study — Paula's voice. Built across 12 weeks. Reviewed by Paula before publication.

## TL;DR

A teacher-operated classroom tool a real teacher opens during a real class to log positive behavior points fast. The teacher holds the device. The students see a pixel-art scoreboard on a projector — leaderboards, XP, characters they can unlock. Negative consequences happen offline, not on the screen. Built in Claude Code. Built around one specific teacher I know, not a hypothetical persona.

---

## The brief

*Two paragraphs.*

I built this for a specific teacher I know. Not a research persona — a person who told me, in detail, what gets in the way during a Monday morning. The whole project lives or dies on whether she opens it during a real class.

The product takes seconds to use. Tap a student's tile, log a behavior point in one of three categories. End of week, you get a read on patterns you'd otherwise miss because you were teaching.

## The constraint that mattered most

**No backend or user accounts in week one.** Data lives in session or local storage. The AI summary layer comes in week 10, not week 1. The interaction design has to work before any of the smart stuff is worth anything.

## The reference move

Things teachers already trust. The pen. The clipboard. The seating chart. Not productivity apps.

*Add 3 reference images here in week 5–6.*

## Week-by-week

### Week 01 — The brief

The strongest real-user constraint of the three projects: a specific teacher, a specific classroom, a Monday morning use case. Deferring the AI layer was an instinct call — and the right one. The interaction design has to earn the AI, not the other way around.

*One screenshot of the brief / first sketch.*

### Week 02 — Committed, and made two cuts.

The first half of the session I was still moving between project ideas. The second half I committed: Classroom Behavior Tracker, built in Claude Code, for one specific teacher I know. Not "teachers in general."

Then I made two scope cuts in the same session that I think will end up being the most important design decisions I make on this thing.

**Students will not use the app.** Only the teacher. The students just look at it. The teacher holds the device, taps points, manages the room. The student view is a scoreboard projected on a screen, not an app on a phone.

**Bad points end up offline.** Negative consequences go to extra homework or a real conversation, not to a public display on the screen. The screen is the reward layer. Punishment lives in real life.

The research was two artifacts. A 6-tool matrix of the direct competitors — ClassDojo, LiveSchool, Lekktura, Bloomz, Be+, Kickboard — with a "one technique to borrow" column. And a deeper 10-reference report on character-driven gamification: TeachQuest, ClassMana, Habitica, Prodigy, Blooket, Gimkit, Joon, Finch, Duolingo Leagues, Mrs Wordsmith.

What I took from it: the best student-facing gamification doesn't live in classroom tools. It lives in habit trackers (Habitica), self-care pets (Finch), and chore apps (Joon). I'm going pixel-art, retro, gamified. Habitica is the starting reference. Duolingo's tiered leagues adapt cleanly to a small class.

What I want to research before I lock in any visible leaderboard: the psychology of public point displays. PBIS literature on what does and doesn't harm kids when their behavior is visible to the class. I'd love to spend real time on that in session 03 or 04.

*Screenshot: the 6-tool comparison matrix.*
*Screenshot: the Habitica avatar / profile reference.*

### Week 03 — Three sessions to find the right reference images.

The session produced three HTML prototype iterations. The first — dark background, pixel font, scanline overlay — rejected immediately. The second and third arrived at the actual direction: warm cream ground, Nunito, vibrant ranking colors in pink and blue and orange. Five reference images brought and analyzed, each one contributing something to the brief. A 13-item banned moves list written in. Scope decided: a student list and a top-3 leaderboard, those two things built well before anything else.

Then the brief was followed in three separate sessions. Every single one came back looking the same. Saturated mint and purple cards. Rounded Nunito everything. Emoji avatars with thick colored rings. The brief was being followed precisely. The output was still generic.

It took until the third attempt to understand why.

The two screenshots uploaded at the start of the original session were doing more work than the words. Both were children's app UI — saturated colors, mascot blobs, rounded type. Once those were in the conversation, every subsequent prompt got filtered through them regardless of what the brief said. Words can't override images. The model doesn't weigh the brief and the reference equally. It weighs the reference more.

Changing the reference images broke the cycle. Two new ones: a creative kids academy landing page with Fraunces italic headlines mixed with bold sans, and a play-and-learn site with editorial layouts and white-dominant ground. Same audience, opposite visual language. The first build with the new references was the first one that didn't look like the others.

The second thing that helped was a side-by-side comparison. Telling the model "this is too generic" got polite agreement and another generic result. Pasting both versions next to each other and asking it to name the specific differences produced a concrete analysis. The prompt: *"Compare the differences and write down the findings."* That did more diagnostic work than three sessions of brief refinement combined.

The third finding was about the banned-moves list. Describing what not to do reads to the model as confirmation the aesthetic is in scope. It anchors to the world being described, not the negation. Naming the replacement works better than naming the prohibition.

The style guide was fully rewritten with all three lessons in it. It opens with a diagnosis of why the first version failed. Every retired element has a named replacement. It closes with a yes-or-no build checklist.

What's still undefined: the characters. The avatar system needs a decision — abstract blob creatures, something else — before the next build.

*Screenshot: working HTML prototype — warm cream ground, Nunito, student list with avatar circle slots, purple sidebar, top-3 leaderboard.*

### Week 04 — _to come_

*…through Week 12.*

---

## What I built

*Screenshots of the finished tool. Three to five images covering: the empty class roster, a student tile being tapped, a satisfying micro-animation on point updates, the weekly summary view, what it looks like on a phone in landscape during class.*

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
