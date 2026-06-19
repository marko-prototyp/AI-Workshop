---
name: classarcade-design
description: Build any UI for ClassArcade — Paula's classroom XP tracker — in the Arcade Dusk v2 (editorial) direction — warm-white paper, a high-contrast serif against a plain grotesque, one loud acid-green accent over black-and-white, a hairline roster table, and monochrome initial avatars. Use this skill any time the user asks to build, port, refactor, or extend a ClassArcade screen or component — the roster table, a player row, the −1/+1/+3 award buttons, the leaderboard wall, the recent feed, the rail, the squad tabs, an avatar, the projected view — even when ClassArcade isn't named. Also use when the user pastes a ClassArcade Figma frame or screen and asks for an implementation, or asks whether a move is on-brief. The skill loads ClassArcade's v2 tokens, its banned moves, the two-reading rule, and the reference, so output starts from this direction instead of the friendly-gamified default.
---

# Build ClassArcade the right way

This skill is ClassArcade's build contract. It loads the art direction, the banned moves, and the design philosophy, then keeps every build inside them.

The reason it exists: "build me a classroom XP tracker" produces the single most overused look in ed-tech — warm cream, a friendly rounded sans, emoji avatars, a wall of rounded cards, purple primary, six candy accents. That look is competent and completely stock. The first ClassArcade build was exactly that, and it had to be thrown out. ClassArcade is defined as much by what it refuses as by what it is. Inject the refusals up front, every time.

> **Source of truth.** This skill reflects the **v2 art direction** agreed after the reference review — the editorial, acid-green-on-paper direction. The written Visual Direction Brief (Session 02) predates it and is now **stale on typography, avatars, ground, and palette**; it needs a v2 addendum. Until that's written, this skill leads. Tokens below are copied verbatim from the approved build — do not re-derive them.

## The one-line frame

ClassArcade is an **arcade cabinet, not a discipline dashboard.** The game is the reward layer, never the punishment layer. The teacher operates; the room watches the celebration. If a build decision makes the tool feel like surveillance, it's wrong regardless of how good it looks.

## The look in one breath

Editorial, fashion-adjacent, confident. Warm-white paper, not cream and not pure white. A high-contrast serif (Fraunces) carrying names, XP, and headlines, against a plain grotesque (Space Grotesk) for chrome. **One** loud colour — acid green — held against mostly black-and-white, with two quiet tints (lavender, pink) reserved for 2nd and 3rd place only. The roster is an airy hairline table, not a stack of cards. Avatars are monochrome initials in thin outline circles. The owned expressive moves are a spiky green **burst** and a hand-drawn **squiggle**. The personality lives in the type and the restraint — not in colour volume. Restraint is the flex.

## Two readings, always

Every visible element must survive two distances at once:

1. **Teacher, arm's length** — operating the desktop web app live during a lesson. Speed is a design requirement.
2. **Students, 4–8 metres** — watching the same screen projected across the room.

It's why nothing projected drops below 14px, why the leaderboard is a designed hero and not a sorted list, and why awards can't hide behind hover.

## When this skill triggers

- "Build the [roster table / player row / award buttons / leaderboard wall / recent feed / rail / squad tabs / avatar / projected view] for ClassArcade"
- "Build the −1/+1/+3 interaction" / "make the leaderboard re-rank when XP changes"
- "Design the projected view" (it earns its own time — not a resized teacher view)
- The user pastes a ClassArcade Figma frame or screen and asks for an implementation
- "Is [move] okay for ClassArcade?" → check it against Banned Moves before answering

If ClassArcade isn't named but the work is clearly its UI, still load this system first. The friendly-gamified default is the failure mode this skill exists to prevent.

## Tokens — paste this `:root` verbatim

Closed set, pulled from the approved build. Acid is the only saturated colour and it is flat. Lavender and pink are 2nd/3rd place only.

```css
:root{
  /* Ground & surfaces — warm-white paper, NO dot texture */
  --stage:#EFEDE6;   /* behind the board */
  --board:#FBFAF6;   /* the page surface — warm white, not pure white */
  --line:#E7E2D8;    /* 1.5px hairlines: table rows, dividers, ghost borders */
  --ink:#17150F;     /* warm near-black — body text, marks. (Was UNDEFINED in v1; now locked.) */
  --muted:#9A958A;   /* secondary text, labels, rank numbers */

  /* The one loud accent + the black */
  --black:#100F0C;   /* rail, dark pills (+New player, +3), primary marks */
  --acid:#C7F03B;    /* THE accent — 1st place, active nav burst, +N badges, +3 fill. Sparingly. */
  --pos:#3A4A00;     /* dark ink-green for positive float labels on light */

  /* Quiet tints — 2nd/3rd ONLY, never load-bearing elsewhere */
  --lav:#E8E2FB;     /* 2nd place card */
  --pink:#FBDEEA;    /* 3rd place card */

  /* Feedback — never red */
  --flash-pos:#F4FBDB;  /* positive row flash — faint acid */
  --flash-neg:#F2EFE7;  /* negative row flash — neutral paper, NOT red */
  --error:#FF5252;      /* system errors ONLY — never on a player row */

  /* Type — a serif voice, a grotesque for chrome */
  --serif:'Fraunces',Georgia,serif;     /* display, names, xp numbers, italic table labels */
  --sans:'Space Grotesk',sans-serif;    /* chrome, meta, buttons, rank numbers, timestamps */

  --r:20px;          /* card radius (leaderboard cards; board uses 30, modals 26) */
}
```

Fonts load from Google Fonts: Fraunces (italic + opsz, weights 400/600/900) and Space Grotesk (400/500/700). **Rank colours: acid (1) · lavender (2) · pink (3) · plain (4–5).** The old pink/blue/orange podium is retired.

### Type scale (shipped values)

| Element | Family | Weight / style | Size |
|---|---|---|---|
| Headline ("Today's roster.") | serif | 900, accent word italic 400 | 46px |
| Leaderboard title ("leaderboard.") | serif | 900 italic | 30px |
| Player name | serif | 600 | 18px |
| XP number (table) | serif | 600 italic | 22px |
| XP number (1st / 2nd–3rd) | serif | 900 | 42px / 24px |
| Table + section labels ("player", "recent") | serif | 400 italic | 13px |
| Tabs ("squad A") | sans | 400, active 700 | 15px |
| Breadcrumb / meta | sans | 500 | 12–13px |
| Rank numbers ("01") | sans | 500, tabular | 13px |
| Award buttons / recent chips | sans | 500 | 12–13px |

Floor: nothing projected below 14px. Names are title case, never ALL CAPS.

### Avatars

Monochrome **initials** in a 1.5px ink outline circle — 34px in the table, 30px in modals. No emoji, no colour-coded rings (both retired from v1). Unassigned/empty: a **dashed** muted outline circle on paper, never a filled gray disc.

## The house module

```
[ black rail 72px ]  [ ──────────── board · warm white · radius 30 ──────────── ]
                       [ main: breadcrumb · headline · tabs · recent · table ]  │  [ wall: leaderboard ]
```

- **Rail** — black, rounded, the one dark surface. Acid burst at top (active = home), thin line icons (squads, edit roster, project), teacher avatar at the bottom.
- **Board** — a single warm-white rounded container holding everything; main and wall split by a vertical hairline.
- **Header** — breadcrumb ("ClassArcade / Live session / [squad] ·"), serif headline ("Today's roster." with an acid burst), actions (Project pill, Give XP ghost pill, + New player black pill).
- **Tabs** — lowercase text ("squad A"), active gets a bold letter and an underline. "+ squad" to add.
- **Recent feed** — inline label + chips (time-ago · first name · acid +N or neutral −N badge) + an undo affordance when an event exists. This *replaces* the v1 full-width purple ticker marquee.
- **Roster table** — columns `# · player · streak · xp · award`, hairline row separators, generous air. Award column: `−1` and `+1` as outline pills, `+3` as a solid black pill.
- **Wall** — "on the wall —" / "leaderboard."; the acid **01** hero card with a black burst; lavender **02** + pink **03** side by side; plain **04/05** rows; a `total xp · median` footer with the hand-drawn squiggle.

## Banned moves

### The thing we moved away from
The friendly-gamified default: warm cream + dot texture, a rounded sans like Nunito, emoji avatars in colour-coded rings, a wall of rounded white cards, purple primary, six vivid candy accents. That was v1. It is competent and it is stock. **Do not regenerate it.**

### Shapes & structure
1. **No rounded-square pastel icon boxes.** Avatars are thin-outline circles with initials.
2. **No leaderboard of equal rectangles.** 1st place is a designed moment — the acid hero card with the burst, bigger than everything around it.
3. **No card-per-row roster.** The roster is an airy hairline table on paper. A stack of rounded cards, one per player, is the v1 move.

### Colour
4. **One loud accent, held.** Acid green is the only saturated colour and it is flat — 1st place, the active burst, +N badges, the +3 pill. No second loud colour competing with it. No gradients, no hero washes.
5. **Lavender and pink are 2nd/3rd only.** They never become general-purpose UI colours.
6. **No gray for unassigned players.** Dashed outline circle on paper, never a filled gray disc.
7. **No red on the player view.** Negative = neutral paper flash + a muted −N. Red is system errors only.
8. **No gold / silver / bronze.** Ranks are acid (1) / lavender (2) / pink (3) / plain (4–5).

### Type
9. **The voice is Fraunces + Space Grotesk.** No Inter, Roboto, system-ui — and no Nunito (it was v1's voice and it read friendly-default). Serif carries names, XP, and headlines; the grotesque carries chrome.
10. **No ALL CAPS names.** Title case, serif. Hierarchy comes from size, weight, and italics — not case.
11. **No font below 14px on any projected element.**

### Interaction
12. **No modal to grant a single point.** `−1 / +1 / +3` are inline, one tap, always visible, with immediate feedback (row flash + a serif float label), then a re-sort. The batch **Give XP** panel is the only modal and it's opt-in (multi-select, custom amount, category).
13. **No hover-only awards.** Always visible on every row.

### Copy
14. **Editorial game voice, never ed-tech.** Lowercase italic labels ("player", "streak", "recent", "on the wall —"), confident headlines ("Today's roster.", "top of the room"). Banned: engage, empower, motivate, track behaviour, reward.

| Banned | Use instead |
|---|---|
| Points | XP |
| Students | Players |
| Classes | Squads |
| Track behaviour | — (never say this) |
| Reward | Earn |

## Reference grounding

**The v2 anchor** is the editorial roster screen: warm paper; a black rail with an acid burst; a serif headline with a burst accent; a hairline table; monochrome initials; an acid 01 / lavender 02 / pink 03 leaderboard; a `total xp · median` footer with a hand-drawn squiggle; lowercase italic labels throughout. The owned move is **one acid accent + the burst + the squiggle on black-and-white**. When a build feels off, it has usually added colour or weight the anchor doesn't have.

**Still-true lessons** carried forward: colour is categorical, not decorative; stats read as plain large numbers, not charts; the operational-left / ambient-right split maps to table-then-wall; a recent-events feed lets the room read activity without the teacher narrating.

**Retired:** the warm-cream, big-radius, illustrated-character, friendly-sans direction. It produced v1. Don't return to it.

## Build order

One piece per turn — never "build the whole app."

1. **Ground + rail + board shell.** Warm-white board on the stage, black rounded rail, the vertical hairline between main and wall.
2. **Paste the `:root`.** Before anything downstream invents a colour or a font.
3. **The roster table row.** `# · initials · name · streak · xp`, hairline separators. All rows visually equal — no special styling for the leader in the list.
4. **The award interaction.** Inline `−1 / +1 / +3`, one tap, row flash + serif float label, then re-sort. Negative is a neutral flash, never red.
5. **The leaderboard wall.** Acid 01 hero with the burst first; lavender 02 + pink 03; plain 04/05; total + median footer with the squiggle.
6. **The recent feed.** Chips with time-ago + acid +N badge; undo when an event exists.
7. **Squad tabs + project mode.** Text tabs, underline active. Project mode is recomposed large for the room, not a zoomed teacher view.

## The standard prompt template

Inject the tokens and the relevant bans every time.

```
[Attach the ClassArcade Figma frame OR paste the reference]

Build this as a single HTML/CSS/JS screen for ClassArcade, a classroom XP tracker
operated on desktop and projected to a class. Match the comp closely.

Rules:
1. Use these tokens as CSS variables: [paste the :root block above]
2. Fonts: Fraunces (serif — names, XP, headlines) + Space Grotesk (sans — chrome,
   meta, buttons). No Inter, Roboto, system-ui, or Nunito.
3. Two readings at once: teacher at arm's length, students at 4–8 metres. Nothing
   projected below 14px.
4. Direction: editorial on warm-white paper. One loud accent — acid green, flat,
   used sparingly. Lavender + pink for 2nd/3rd only. Mostly black-and-white.
5. The roster is a hairline table, NOT a stack of rounded cards. Avatars are
   monochrome initials in thin outline circles — no emoji, no colour rings.
6. Banned moves on this screen: [list the relevant ones — e.g. for the leaderboard:
   no equal rectangles, acid 01 is a designed moment, no gold/silver/bronze, no
   second loud colour].
7. Copy: editorial game voice. XP not points, players not students, squads not
   classes. Lowercase italic labels, confident headlines.

If something in the comp looks unusual, ask — don't smooth it out.
Don't add features I didn't design. Don't add "improvements."
```

## Before code — the four-question check

1. **Which reading does this serve — teacher, student, or both?** A projected element answers to the 4–8m rule.
2. **What tokens does it consume?** List every variable from `:root` you'll touch. If it needs a value that isn't there, propose a token; don't hardcode a hex.
3. **What's the feedback contract?** Static? Row flash + float label on award? Live re-rank on the wall? These are explicit requirements, not optional polish.
4. **Does it trip a banned move?** Name the ones in range and confirm it clears them.

## After build — the anti-stock review

If any answer is "yes," fix before shipping.

- Did the ground go cream/dotted instead of warm-white paper?
- Did Nunito or any friendly rounded sans creep in instead of Fraunces + Space Grotesk?
- Did avatars become emoji or colour-coded rings instead of outline initials?
- Did a second saturated colour appear competing with acid? Did acid become a background wash or gradient?
- Did the roster turn into a stack of rounded cards instead of a hairline table?
- Did the leaderboard flatten into equal rows with no acid 01 hero?
- Did pink/blue/orange ranks come back?
- Red on a player row? A confirm modal on a single point? Hover-only awards?
- Did any projected text drop below 14px?

Fix prompt: `Looking at what you built, [list the specific drifts]. Patch only those. Don't restructure.`

## Known unknowns

- **Negative projected display** — still open. Minus is absent from Project mode for now; confirm with Paula how/whether students ever see a minus.
- **Leaderboard visibility** — top-3 vs every rank. Public bottom-of-list ranking can do harm. Teacher decision.
- **Teacher's current system** — informs interaction speed and hierarchy.
- **Streak (`×N`)** — introduced in the build to match the reference: consecutive positive grants per player this session, reset on a minus. It's real (wired to events, reverts on undo) but it was not in the original brief. Confirm Paula wants it and that the reset rule is right.
- **Search** — dropped from the roster (the reference has none; sort-by-XP is the default, with a `by xp / by name` toggle). Confirm that's fine or restore it.
- **Resolved:** ink colour is now locked (`#17150F`). Avatar ring meaning is moot — there are no rings. Day-one avatar state no longer blocks styling; revisit only if illustrated characters return.

## When NOT to use this skill

- Building the AI for Designers *site* (not ClassArcade) → use `build-section`.
- Pure copy edits on ClassArcade strings → use `audit-copy`, then apply the copy table.
- A session writeup → use `week-recap` or `journal-entry`.

This skill is now the ClassArcade **art-direction source of truth**. The written Session 02 brief is stale on typography, avatars, ground, and palette until someone writes the v2 addendum.

## One last thing

If asked for something that will drag it back toward the default — "make it pop", "add a friendly gradient", "warm it up with some colour", "round the cards" — push back once with a concrete alternative anchored in the v2 reference. The restraint and the single acid accent *are* the design. Reverting to friendly-rounded-pastel is the regression this skill exists to prevent.
