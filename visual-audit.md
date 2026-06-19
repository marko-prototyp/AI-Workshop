# Visual audit — AI for Designers

**Page:** https://marko-prototyp.github.io/AI-Workshop/
**Date:** 16 June 2026
**Scope:** Home page (rendered), with notes on global nav and chrome.

---

## The one-line problem

The site's entire thesis is "don't make the generic AI thing." But it's built almost entirely from the current generic *tasteful* thing: Fraunces + Inter, warm near-black with a single coral accent, an oversized serif word set in italic for "personality," mono eyebrow labels, and a hairline grid. It's the 2024–26 editorial-startup template. The page even names its own type pairing as the example of restraint, which is exactly backwards — that pairing is the most predictable choice on the board right now.

It looks good. That's the trap. It looks good the same way ten thousand other sites look good. For a page that sells distinctiveness, looking like everyone else is the failure.

---

## Typeface

Three superfamilies are loaded: **Fraunces** (display serif), **Inter Tight** (body sans), **JetBrains Mono** (labels). Every one is a default.

- **Fraunces** is the single most over-deployed "we have taste" serif in circulation. It signals editorial without earning it, because the reader has now seen it on every AI product, every Vercel-clone, every studio rebrand. Using it *here* — on a page arguing against stock output — undercuts the argument on contact.
- **Inter Tight** is Inter with a haircut. It's the most neutral, most reached-for geometric sans in existence. Safe, invisible, generic by definition.
- **JetBrains Mono** for every micro-label is the reflexive "developer" signifier. It's doing costume work, not communication.

Beyond the choice itself:

- **The italic trick is one note, played constantly.** Every heading is "[roman words] *[one italic word]*." — *yours, principle, build, sessions, next, for, is, walk away with.* By the third heading the device is spent; by the tenth it reads as a tic, not a system. The italic is carrying all the personality and it can't carry that much.
- **Fraunces is set at weight 300 (light) at 124px** and the optical-size / SOFT axes aren't really exploited. So the big moment reads as "default Fraunces, large," not as a typographic decision.
- **Straight quotes.** The hero says `that's` and the body uses `it's` / `you've` with typewriter apostrophes (`'`) instead of typographic ones (`'`). At 124px in a display serif this is a glaring amateur tell — it's the first thing a type-literate visitor will catch.
- Three type families plus mono is a lot of surface area for a one-page site. The mono especially is everywhere (eyebrows, indices, side notes, button labels, the ⌘K cap), which flattens the hierarchy rather than sharpening it.

**Fix direction:** if the brief is "distinctive," the type has to *be* the distinctive thing. Pick one genuinely characterful face (a less-circulated display serif, a grotesk with actual quirks, or a variable face whose axes you actually move), drop one family, and fix the apostrophes before anything else.

---

## Unnecessary elements, random lines, details

There's a lot of structural chrome doing work that whitespace already does.

- **Hairlines everywhere.** ~200 elements on the page carry borders. Full-width rules between every section, a divider under every session row and every accordion, plus a floating vertical hairline next to each side note ("Read this before session 1…"). The grid is being drawn in ink when the spacing already implies it. Pick the three or four lines that matter and delete the rest.
- **The floating "On this page" pill** (fixed, top-right) is a second navigation system competing with the top nav, on a page short enough not to need either a TOC *or* search. It re-labels itself as you scroll ("The twelve sessions," "What you build," "Where next") and visually collides with the header band. Redundant. Cut it.
- **The far-left margin indices** — `01 02 03`, `A–E`, `W 01–W 12` — float out in the gutter, disconnected from the headings they number. At that size and distance they're decoration reading as noise, not wayfinding.
- **The hero stat strip** (`12 / 1h / 5 / 1`) is the standard SaaS metric row. "5 capability areas" and "1 shipped project" are brag-numbers, not information — they tell the reader nothing they can act on.
- **The "FIG.01" demo card** is mostly frame: `02 / SAMPLE`, an empty circle placeholder, "Editorial restraint," a caption. It's a mockup *of* a mockup with no actual content inside the box, so it reads unfinished rather than minimal.
- **Header transparency.** The sticky header has no solid fill (transparent background, no backdrop blur), so on scroll fragments of body text smear faintly behind the "AI for Designers" wordmark. Small, but it's a visible defect on the most-seen element on the page.

---

## Icons and inconsistency

The icon set isn't a set. It's several unrelated decisions sitting near each other.

- **Stroke weights don't match.** Across the SVGs in use there are at least five: 1px (most), plus 1.2px, 1.5px, 2px, and 3px. There's no single stroke standard, so nothing optically agrees.
- **Drawn on different grids.** ViewBoxes range across 12×12, 14×14, 20×26, 22×22, 24×24, 48×48 (and one 340×280 illustration frame). Icons built on six different canvases will never share corner radius, weight, or optical size, no matter how they're scaled.
- **The three "Where next" icons come from three different worlds:** a hand-drawn **quill** (organic / editorial), a literal **OS mouse-cursor arrow** (a piece of UI chrome used as decoration — the weakest of the three, it looks lifted straight from the system), and a **terminal window** (literal / techy). Quill, cursor, terminal: no shared metaphor, no shared construction. They don't read as siblings.
- The utility marks (`+` accordion toggles, the `⌘K` cap, chevrons) are yet another visual language. Fine on their own, but combined with the decorative icons it's three icon vocabularies on one short page.

**Fix direction:** one grid (24×24), one stroke (1.5px), one metaphor family. If the quill is the brand idea, redraw the other two in that hand. If not, drop the quill. The cursor arrow should go regardless.

---

## Illustrations

This is the biggest miss, and it's structural.

**There are zero images on the page.** Not one screenshot, not one Figma frame, not one piece of participant work, not one before/after. The only "art" is the empty-circle placeholder in the demo card and the line icons.

A workshop whose entire promise is "you'll *build* something distinctive and real" shows nothing built. "What you build" lists project types in words. "Projects" lists them in words. The "stock vs designer-led" contrast — which should be the page's money shot, a side-by-side you can *see* — is a text card with a circle in it. The argument is made entirely in prose on a page about visual craft.

The empty circle placeholder makes it worse: it reads as "image coming later," which tells the visitor the site itself isn't finished.

**Fix direction:** the single highest-leverage change to this page is to put real artifacts on it. One genuine stock-vs-designer-led comparison rendered as actual UI. Two or three shipped participant projects as screenshots. A real Figma-to-build frame. Show the work the workshop produces; right now the page asks to be trusted on exactly the thing it refuses to demonstrate.

---

## Navigation and UX

- **Seven top-level items, two different behaviors, no signal which is which.** Principle / Sessions / Projects jump down *this* page; Figma Loop / Journal / Facilitator / Prompts navigate to *separate* pages. They're styled identically, so the user can't predict whether a click scrolls or leaves. Differentiate them (group the anchors, or visually mark the page links).
- **Two wayfinding systems at once.** Top nav + the floating "On this page" TOC do the same job on a page short enough to need neither. Pick one.
- **Search (⌘K) on ~7 sections of content is over-engineered.** It's heavy machinery signalling "big site" over a small one. The gap between the implied scale and the actual content reads as borrowed, not earned.
- **No primary action, anywhere.** The hero is prose with no button. There's no Apply / Register / Join, no date, no price, no contact. A prospective participant has nothing to click to move forward. The page is a brochure with no door.
- **No footer.** The page simply stops after the "Where next" cards — no contact, no sign-up, no repeat nav, no credits, no "how to join." The funnel dead-ends. Even a one-page site needs a closing CTA and a footer.
- **Jargon for an audience the page says is new.** The copy states it's "for designers mostly new to AI," but the session rows lean on shorthand — "Discover → Define," "Build → Wire," "Test → Critique," "Architect," "Preserve." To a newcomer these are opaque. Either explain the vocabulary or drop it.
- **"Principle"** as a singular nav label is slightly off against the section title "The anti-stock principle." Minor, but it's the first nav word.

---

## Responsiveness

Audited by reading the rendered CSS (the remote browser's layout viewport is locked at 2560px, so I could not pixel-render a phone here — spot-check the points below on a real device or your own DevTools device mode).

**The engineering is genuinely solid — this is the strongest part of the build.**

- Correct `width=device-width, initial-scale=1` viewport meta.
- **Type is fully fluid.** Every heading uses `clamp()` (hero is `clamp(48px, 9vw, 124px)`, section titles `clamp(40px, 6vw, 76px)`, etc.), so nothing blows out of the screen on small widths. This is the right approach and it's applied consistently.
- **Nav collapses properly.** At ≤880px the links hide behind a hamburger; the menu opens as a full-width panel, the ⌘K search becomes a full-width row, the keycap hint is hidden, and there's a dedicated mobile theme toggle. Considered, not an afterthought.
- **The ⌘K search modal goes full-width** (`100dvh` aware) on mobile and drops its footer/esc chrome. Good.
- **Grids stack.** The principle 2-column, the "Where next" cards, the facilitator columns, and the prompt library all collapse to a single column at their breakpoints.
- **The left-margin section numbers flow inline** (`position: static`), so they don't overlap body text or push horizontal scroll on narrow screens — a common failure this build avoids.
- **The floating "On this page" pill is hidden on the mobile/tablet home page** (and re-centers as a full-width bar on sub-pages ≤1023px). So the clutter concern from the desktop audit doesn't carry to mobile.
- Reduced-motion and print styles are both present.

**What to flag:**

- **Breakpoint sprawl.** There are ~10 distinct breakpoints (600, 640, 680, 700, 720, 880, 900, 1000, 1023, 1024px), clearly added per-component rather than from one shared scale. It works, but it's a maintenance smell — every new section invents its own width. Consolidate to 3–4 named breakpoints.
- **The header transparency bleed (from the desktop audit) will persist on mobile** — give the sticky header a solid background and it's fixed everywhere at once.
- **Unverified visually.** Because I couldn't render an actual phone, confirm three things on a real device: the centered full-width jump-pill on tablet sub-pages doesn't sit on top of the hero's first lines; the open mobile menu panel doesn't clip; and the hero stat row (12 / 1h / 5 / 1) wraps cleanly rather than crowding.

**Verdict:** responsiveness is not a weakness here. The fluid type and the nav collapse are done right. Fix the header background, tame the breakpoint count, and do one real-device pass to confirm the three items above.

---

## Light / dark mode

The site ships two themes: the default dark (`--bg #1A1714`, "warm black") and a light "clarity" theme (`--bg #F6F5F1`, warm off-white). The toggle works and the switch is token-driven, so every surface flips cleanly.

**What's done right:**

- **The accent changes hue between modes, it isn't reused.** Dark uses a brighter coral (`#D97757`); light drops to a deeper rust (`#C8421C`). That's the correct move — one accent value can't sit legibly on both a dark and a light background, and a lot of sites get this wrong. Here it's deliberate.
- **Body text contrast is strong in both.** Dark ink `#E8E2D8` and light ink `#1A1A1A` are both well clear of WCAG AA. The muted/secondary grey passes AA for normal text in both modes too (≈4.7:1 dark, ≈6:1 light).
- Theming is real tokens, not a hacked-on filter, so the two modes are genuinely consistent rather than one being an afterthought.

**Issues:**

1. **Hardcoded "warm dark" copy in the light theme.** The demo card caption reads *"A type pairing of Fraunces + Inter on warm dark, with hairline rules and an asymmetric grid."* That line stays put in light mode, where the background is the opposite of dark — so the page contradicts itself. The copy is tied to a dark-only assumption. Make it theme-neutral ("on a warm, low-contrast palette") or swap it per theme.
2. **Light-mode accent is borderline for small text.** Rust `#C8421C` on `#F6F5F1` computes to roughly **4.5:1** — right on the WCAG AA line. Fine for the large italic display words (they only need 3:1), but marginal for the *small* accent-colored labels (e.g. the active section name in the "On this page" pill, the small mono eyebrows when tinted). Use the existing darker `--accent-soft` (`#A8341A`) for small accent text and it's safely above 4.5:1.
3. **The header bleed-through happens in light mode too.** Same transparent-header issue from the desktop audit — fragments of body text show behind the wordmark on scroll, in both themes. One fix (solid header background) covers both.
4. **The hairline rules nearly vanish in light mode.** The light rule color (`#E0DFD9` on `#F6F5F1`) is about a 1.1:1 contrast — almost invisible. So the ~200 dividers that feel heavy in dark mode under-deliver in light, and section separation gets weak. This actually argues the same fix as the desktop note: fewer, more intentional rules with a touch more contrast, rather than many faint ones.

**Verdict:** the theming engine is well built and the accent handling is genuinely thoughtful. Fix the "warm dark" copy (it's an obvious self-own on a page about craft), nudge small accent text to the darker rust for AA, and the same header fix carries over.

---

## Priorities

If only a few things get fixed, do these, in order:

1. **Put real images on the page.** Participant work, a true stock-vs-designer-led comparison, a Figma-to-build frame. Prove the claim.
2. **Add a primary CTA and a footer.** Give the visitor a door and a way to contact / join. Right now there's no conversion path at all.
3. **Reconsider the type.** At minimum fix the straight apostrophes and stop using Fraunces+Inter as the example of distinctiveness. Better: replace the display face with something less circulated and make the big type the actual idea.
4. **Unify the icons** to one grid, one stroke, one metaphor — and remove the OS cursor arrow.
5. **Cut the chrome.** Kill the floating TOC, thin out the ~200 borders, drop the empty-circle "FIG.01" card or fill it, and give the sticky header a solid background.

The bones are good: clear voice, strong copy, restrained palette. The problem is that the restraint is the *default* restraint, and the page proves none of its claims visually. Make it show, not tell, and fix the tells (apostrophes, mismatched icons, header bleed) that say "stock" out loud.
