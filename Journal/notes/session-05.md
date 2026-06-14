Ivo Anić
Session 05 check-in — "Make it clickable. Smoke test the idea."
Project: Wattlog — personal cycling training app
Session recap
Built a single-file clickable smoke test (wattlog-smoke-test.html) covering all nine screens end-to-end: five top-level tabs, drill-throughs with back affordance and no nav, a simulated three-step upload parse that auto-navigates to Ride Detail, and the Calendar blank-day sheet routing to both creation flows. Fake data was internally consistent (FTP 284 → threshold prescription 270–298 W).
Two notable moments in the build process: Claude surfaced a conflict between the wireframes and the design brief (two different Today screens) before finalising rather than silently picking one, and Ivo's prompt — "Walk through my artifact as if you were me… Don't critique the design. Critique the experience." — produced a seven-point experience walkthrough framed as a real Tuesday-evening upload session. Its biggest finding: the core loop never closes — after uploading, the prescription doesn't change, leaving the prototype "a static poster of the concept" until the prescriptive layer can be felt at least once. The file was then updated in response.
Q&A
1. What did you make this session?
"A smoke test html file with some updates."
2. Best and worst Claude moment?
Best: "We made the planned session details." Worst: "Bad styling :D"
3. One decision you committed to?
"To have planned sessions in detail."
4. Artifact worth keeping?
"The final/last version of the html." (Quote-worthy line: skipped.)
5. What's next, and what's stuck?
"I'd work a bit more on the way of displaying things, but I guess I'll cover that in the design phase."

Marin Galić  
Naučimo Hrvatski — Session 05 Check-in
Session 05 · "Make it clickable. Smoke test the idea." Rapid HTML prototyping with Claude · testing flow before craft · iterating on functionality
Session recap
Built the end-to-end clickable smoke test as a single HTML file: Marin's recap → chapter shelf → Chapter 1 cover → scene player → story rebuild → chapter complete → vocab shelf + texting bridge. Working navigation, fake data throughout, no polish — a flow test, not a craft pass.
Two corrections reshaped the build fast. The cast was locked to two people, Marin and Kenzie, with one character removed entirely. And the interaction model changed from typing to drag-a-word-into-the-blank across every screen, on the principle that writing Croatian unprompted is too hard for a beginner. Chapter 1 scope was fixed at 11 scenes — 11 photos, one photo and one interaction per scene.
Clicking through as Kenzie surfaced the real gaps: the wrong-answer state gates progress but doesn't teach, there's no flipping back to an earlier photo, the vocabulary shelf unlocks only after she no longer needs it, nothing reassures her that her place is saved, and the chapter ends in a dead end. The planned W04 wireframe/state-map comparison didn't run — those files weren't available in the session — so instead the build itself was used to document the states a v2 will need.
Q&A
1. What did you make this session? I made a clickable prototype of the future app.
2. Best and worst Claude moment? Only good moments today. I'm glad we erased the extra character — only Marin exists in this project. The cast is two people: Marin (the boyfriend, narrator, Kenzie's partner, Croatian) and Kenzie (girlfriend, American, the user of the app).
3. One decision you committed to? I like the prototype of the app that Claude made. I have to structure and prepare the content for it now.
4. One artifact and one quote-worthy line? Artifact: the working prototype of the app. Line worth remembering: "No Marko, just Marin here." Positive about the future and looking forward to iterating further.
5. What's next and what's stuck? Next is working on the content for the app — I want to prepare it with Cowork. I've picked 11 photos for Chapter 1 and written 11 descriptions, one for each photo.

Paula  [8:18 AM]
ClassArcade — Session 05 Check-in
Session: Make it clickable. Smoke test the idea. Date: 11 June 2026 Project: ClassArcade — classroom points tracker (desktop web app, projected to class)

Session recap
Built the end-to-end smoke test as a single HTML file: Class Picker, Main Arcade, two-step New Classroom flow, Edit roster, Give Points panel, and classroom dropdown, populated with the real seed rosters. The artifact went through three full versions in one session. A teacher-walkthrough exercise surfaced three trust-level UX failures — the singular "+1 to one student" case being the slowest action in the app, no undo for point events, and feedback getting lost because the list re-sorted before the flash — all three were fixed (per-row ± buttons, a one-level undo chip, flash-then-resort sequencing). The 30-second roster-delete timer was replaced with a "nothing is real until Save" model. Three new features (search, sort, point categories) were knowingly added past the week-3 scope lock; the lock was formally amended and re-armed in a written reconciliation brief that also updated the wireframes and state map to match the build — including eight UI states the original plan never named. One sort-rule conflict was closed during the session ("keep the last name rule").

Q&A
1. What did you make this session? "Made a smoke test for the tool, tested it out and fixed some of the ux issues."
2. Best Claude moment and worst Claude moment? "Best moment was quick result and good understanding of what I want to fix. Worst moment was Claude adding some things that weren't specified anywhere."
3. One decision you committed to today? "I want to give the project more time to make it really good. Also wanna take time to create some of the visuals I can use later on in the project."
4. One artifact and one quote-worthy line? Artifact: "the prototype we made of the app" — the single-file clickable smoke test.
5. What's next and what's stuck? "Work more on the ux, and work more on the visuals."

Facilitator notes (observed, not supplied by participant)

The "ask the room" half of question 5 went unanswered; the natural candidate from the session is the set of open teacher-facing decisions the build made urgent: whether per-category tallies and a minus button belong on the projected screen at all, given the project's "calm, not surveillance" principle.
The session produced a second deliverable beyond the prototype: a dated reconciliation brief (W04 plan vs. build diff) that honestly flags where the build got worse — notably that the vertically stacked podium now reads as a shorter copy of the student list, costing the leaderboard its "designed moment" status. Recovering that is the main visual-design debt going into the next sessions, which lines up with the participant's stated next step.


Here are my notes. Participant's notes and html artifacts are included. Paula will send her's a bit later.
After skipping one week we got back to the workshop. Today’s session went pretty well. Paula, Ivo and Marin participated. They all followed the steps in the handbook. Today was the first time they actually saw their briefs come to life. New model Fable 5 launched a few days ago, and we used this opportunity to test it. The first version everyone got was kind of okay, but contained some visual, logical, UI errors and inconsistencies that needed polishing. Most of the participants generated up to 3 versions, each version being better and better. This served as a proof of concept and each designer got a confirmation that their idea was valid and that their work so far was good. Some felt that their briefs were not 100% accurate and could use some improvement. Some of them even wanted to redo the whole process to make it perfect. Almost all participants said that they will work more on it at home. This is the first time they showed real interest into creating their personal app, and mentioned working on it over time (outside of the 1 hour window we planned). The artifacts that were created look bad, with really simple components and minimal colors, but the design was not the point. The point was testing the UX and the flows. And this worked well. 

This was the first actual session where the designer interacted with each other and with each other's artifacts. We reviewed each other's work and made suggestions on what to change or improve. What makes sense, what works. This session needed a bit more facilitation, but the increased interaction between participants was cool. Also while reviewing it, we agreed on some of the best UX practices.

