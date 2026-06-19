---
participant: "Paula"
project: "Classroom Behavior Tracker"
status: "draft"
weeks_completed: 6
last_updated: "2026-06-17"
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

### Week 04 — The structure in four screens.

The session produced the full app architecture. Four screens and two overlays: Class Picker, Main Arcade, a two-step New Classroom flow, an Edit Roster modal, and the Give Points panel and Classroom dropdown that live on the Arcade.

The structural move I'm most pleased with: the two-step create flow requires at least one student before you can land on the Arcade. The empty-student-list state doesn't need to be handled because it can't be reached. Designing out a problem rather than solving it.

Mid-session, I overrode the Nunito-only rule from the visual brief. It felt right at the time; now I think it was obviously right. The replacement system is cleaner: Plus Jakarta Sans 800 for operational text, Fraunces italic for names. The rule in one sentence: *names get serif italic, numbers and verbs get sans 800.* It applies everywhere — list rows, podium cards, the edit modal, quick-add inputs. Even the editable name fields in the roster modal render in Fraunces italic. Nunito is banned alongside Inter, Roboto, and the rest.

Things cut this session: the ticker strip (row flash and podium re-ranking already cover the moment a point lands), the "pts" suffix on totals (bare integer only — "24" not "24 pts"), the raised first-place podium card (rank signaled by position and color, not size), per-row edit and delete controls (all roster changes go through the Edit Roster modal), and a history-of-deleted-students view. The last one became a 30-second undo instead. That handles the real mistake case without building a screen for a situation that almost never happens.

Sort rule: points descending, last-name alphabetical tiebreaker, displayed first-name-first. The sort key is invisible to the class watching the board.

Four questions still open from the spec: what negative point display looks like for the class, whether the leaderboard shows all students or top 3 only, day-one avatar state, and what the teacher's current system is. None of them block the build, but the negative point display probably needs a decision before the first working prototype.

*Screenshot: Main Arcade wireframe — student list left, flat podium right.*
*Screenshot: New Classroom flow — two-step modal, Class Picker view.*

### Week 05 — Clickable, and a brief that admits what changed.

I built the whole thing as one clickable HTML file: Class Picker, Main Arcade, the two-step New Classroom flow, Edit Roster, the Give Points panel, the classroom dropdown, all of it on the real seed rosters. It went through three versions in the session. The first one worked but had the usual mistakes. By the third it held.

The most useful thing I did was walk through it as the teacher. That found three problems, and none of them were about how it looks. Giving one point to one student was the slowest thing in the app, which is backwards because it's the thing she does most. There was no way to undo a point once I tapped it. And the feedback flash got swallowed because the list re-sorted before you could see it. I fixed all three in the session: per-row plus and minus buttons, a one-level undo chip, and a flash that plays before the board re-sorts.

I also dropped the 30-second delete timer from the wireframes. It was solving the wrong problem. The new rule is simpler: nothing is real until you Save. No countdown to feel anxious about.

The hard part was scope. Claude added three things nobody asked for: search, sort, and point categories. They're not bad ideas, but they broke the week-3 lock, and my worst moment of the day was watching it add things that weren't specified anywhere. Instead of pretending it didn't happen, I wrote a reconciliation brief: what the W04 plan said, what the build actually does, and the difference between them. I amended the scope lock to allow the three, re-armed it, and updated the wireframes and the state map to match. The brief named eight UI states the original plan never had.

The brief is also honest about what got worse. The podium ended up stacked vertically, and now it just reads as a shorter copy of the student list. It lost the moment it was supposed to be. Getting that back is the visual work I'm going into next.

This was also the first session where we looked at each other's work. I clicked through the others' prototypes and they clicked through mine, and we agreed on a few UX rules between us.

What I committed to: giving the project more time to make it really good, and building the visuals I'll reuse later instead of leaving them for the end.

*Screenshot: the clickable smoke test — Main Arcade with the seed roster, per-row ± buttons, undo chip.*
*Screenshot: the reconciliation brief — W04 plan vs. build diff, the eight named states.*

### Week 06 — Lost the character, then built a skill that got it back.

I made my anti-stock skill, reworked the visual direction, and built a first version of the main view, "Today's roster." Most of the real work happened in chat, reconciling the design system. I flipped the leaderboard podium to 1·2·3 order, which started getting back the podium moment I lost in the smoke test. I resolved a contradiction the visual brief had left open: the point number is always the largest and heaviest element on a row, and the name stays the most expressive thing on it. I consolidated the project brief, the visual direction brief, and the Week-4 brief into a single Design System Document, and flagged eight underspecified items (type scale, spacing, flash colors, button color) for sign-off instead of letting the model guess.

Then the comp was a let-down. The dashboard lost the character the brief had given it, and Claude kept repeating the same move after I asked it not to. That was the worst part of the day.

The fix came after the session, and it wasn't a better brief. It was a skill. We took a Material Design skill template, which already has most of a design system defined, fed it image references for the look I wanted, and Claude rewrote it into a ClassArcade skill. That skill carries the whole direction as a build contract: warm-white paper, Fraunces serif against Space Grotesk, one acid-green accent held over black-and-white, a hairline roster table instead of a stack of cards, monochrome initials instead of emoji, and an acid-01 / lavender-02 / pink-03 leaderboard. With it I rebuilt the main view and a player profile in near-perfect sync with what I asked for. The skill is now the source of truth for how ClassArcade looks. It even overrode my own call from earlier in the session: names are Fraunces serif, not the DM Serif Display I'd picked in chat.

*Artifact: the `classarcade-design` v2 skill (`classarcade-v2/classarcade-design-SKILL-v2.md`).*
*Artifact: the rebuilt main view (`classarcade-v2/classarcade-roster.html`).*
*Artifact: the player profile screen (`classarcade-v2/classarcade-profile.html`).*
*Screenshot: the first "Today's roster" comp from the session, before the skill (the one that lost its character).*

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
