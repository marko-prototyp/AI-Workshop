# Ivan Komlenić — Mockup Generator

*Browser-based AI mockup generator for designers, name TBD*
*AI for Designers — 12-session workshop*
*Last updated: 13 May 2026 (end of Session 02)*

---

## At a glance

| | |
|---|---|
| **Project** | Mockup Generator (name TBD) |
| **Type** | Functional web product, AI wrapper |
| **Track** | UI/UX |
| **Built in** | Web app, GPT Image 2 via API |
| **Time budget** | 1–2 hours per session × 12 |
| **Primary user** | Designers at small studios and in-house branding teams |
| **Status** | Project brief locked through three drafts. Moodboard in session 03. |

## The designer

Ivan's strengths are branding and art direction. He came into the workshop with strong opinions about what AI tools currently get wrong for designers. Specifically, that they don't understand the visual language a designer is actually trying to reach. The mockup generator was selected over two other candidates (a playful microsite and a mini design system) because it solves a real personal frustration: finding the right mockups is slow.

His working style is iterative. The brief went through three drafts and two full rounds of Claude pushing back on its own previous output. He pushes back when something doesn't fit. The clearest signal from session 02: when asked to commit to a decision, he didn't pick the safe one. He picked the constrained one ("no text inputs, ever").

## The project — current state

A browser-based AI mockup generator where designers upload a graphic asset, dial in a visual feeling across six input dimensions, and receive generated mockups, without writing a single prompt.

The conceptual core, in Ivan's own words: "It should be a wrapper that converts your inputs into as perfect as possible prompts for the AI."

The chips, presets, reference slots, and lock-and-shuffle system are all prompt engineering. The designer never sees or touches the prompt itself.

### Success metric

A fully designed and functional product, live in a browser, connected to GPT Image 2. By the end of session 12: a designer uploads a graphic, makes selections across the input system, and receives four generated mockups in a single flow without typing anything. The lock-and-shuffle refinement works. Post-generation adjustments feel native. The product looks restrained and considered, not generic.

It replaces Ivan's own mockup-finding workflow rather than just demoing well.

## The input system

Two-tier hierarchy. **Subject and Aesthetic Preset are primary**, always visible, sufficient on their own. The other four dimensions are secondary, collapsed by default, expandable when the user wants more control.

There is no text input before generation. None.

### Primary inputs

- **Subject** — what the graphic goes on. T-shirt, hoodie, longsleeve, jacket, cap, tote, poster, zine page, sticker sheet, skateboard deck, packaging.
- **Aesthetic preset** — the overall visual DNA, pre-engineered as a complete prompt. Skate zine, Streetwear lookbook, Archive/vintage, DIY/xerox, Clean editorial, Sport/athletic, Outdoor/workwear.

Every preset gets a thumbnail preview. A hex colour picker sits on the preset chip for brand-colour override.

### Secondary inputs (collapsed)

- **Framing** — shot type and angle.
- **Lighting** — natural, overcast, studio, flash, low light.
- **Environment** — concrete/urban, indoors, nature, no background, abstract, in-use lifestyle.
- **Era/Texture** — film grain, faded, high contrast, raw, clean digital.

### Reference slots

Two optional slots alongside the graphic upload: aesthetic reference and environment reference. Each with its own strength slider. Both feed into GPT Image 2 as weighted visual guides.

## The refinement system — lock and shuffle

After the first generation, each input chip becomes interactive:

- **Lock a chip** (one click) — keep this dimension across the next generation. Locked chips turn solid.
- **Shuffle a chip** (two clicks) — randomise this dimension within the preset's range on the next generation.
- **Regenerate** — four new outputs respecting all locks and shuffles.

No inference engine. The user does the locking explicitly. This is more reliable than guessing which dimension the user was responding to. Pinterest-style implicit-feedback convergence is the v2 vision.

## The output

Four images per run, 2×2 grid. All equal candidates, no hero. Click to expand. Regenerate button always visible, paired with a one-line contextual suggestion when outputs are weak. PNG export at 2x resolution. Brightness/contrast/saturation sliders.

## The API — GPT Image 2

Confirmed in session 02 after a live research check.

- **Model:** `gpt-image-2`, snapshot pinned at `gpt-image-2-2026-04-21`.
- **Endpoints:** `images.generate` for the base scene, `images.edit` for compositing the uploaded graphic.
- **Pricing:** ~$0.21 per image at high quality, ~$0.05 at medium. Worth evaluating medium as default.
- **Constraint:** GPT Image 2 doesn't support transparent PNG output. "No background" routes through a secondary background-removal API call. Service TBD.
- **Rate limits:** Tier 3 requires $100 spent + 7 days old. Plan tier progression before launch.

## Decisions committed to

| Session | Decision |
|---|---|
| 01 | Project direction. AI mockup generator over playful microsite and mini design system. |
| 02 | No text inputs before generation. Ever. |
| 02 | Lock-and-shuffle pattern over tap-to-refine. |
| 02 | Subject and Aesthetic Preset as primary; four other dimensions collapsed by default. |
| 02 | Background removal as an input option, not a post-generation tool. |
| 02 | GPT Image 2 confirmed as the generation API. |
| 02 | Snapshot ID pinned in production code. |

## Explicitly not building

- No text input before generation. The chips are the prompt.
- No template library browsing. That category is saturated.
- No dedicated background removal tool.
- No bulk or batch generation.
- No social or sharing features.
- No account system or saved history at v1.
- No custom model fine-tuning.
- No team collaboration.
- No AI inpainting or reframe.
- No video mockups at v1.
- No mobile app.
- Not print-ready.

## Open for v2

Account system with saved presets and history. Save-as-preset (the Recraft pattern). Three named fine-tune sliders (the Magnific/Krea pattern). Pinterest-style implicit-feedback loop. Video mockups. Print-ready export.

## Origin story

### Session 01 — Direction

Nine-question profile interview surfaced creative strengths (branding, art direction). Three project directions evaluated: playful microsite, mini design system, AI mockup generator. The generator won because it solves a real personal frustration.

### Session 02 — Research & Synthesis

A competitive analysis across ten tools shaped the input system, refinement pattern, and output experience directly.

**Tools surveyed:** Pinterest, Mockey.ai, Lummi.ai, Leonardo.ai, Midjourney, Krea.ai, Visual Electric, Cosmos.so, Magnific, Recraft.

**What the research locked in:**

- **From Pinterest:** taste-convergence through implicit feedback is the right underlying mechanic. Lock-and-shuffle is the explicit v1 version of that idea.
- **From Mockey.ai:** the Mockup Collection concept (coordinated set with shared parameters, varying framing) is the right output unit. Avoid the enormous template grid.
- **From Lummi.ai:** filters as first-class generative inputs (lighting is a button, not a prompt token). Two-tier input hierarchy.
- **From Leonardo.ai:** three independent reference slots with per-slot weight sliders. Split aesthetic from environment reference. Avoid sidebar overload.
- **From Midjourney:** the Style Creator tournament-style convergence. Lock-and-shuffle is the practical v1. If style codes ever land, version them from day one.
- **From Krea.ai:** the AI Strength slider concept. Saved for v2.
- **From Visual Electric:** thumbnail-previewed chip options, no blank fields. Style names from the culture, not from model versioning.
- **From Cosmos.so:** hex/palette colour picker as a first-class feature for client work.
- **From Magnific:** three named, concrete English labels for fine-tune control. Saved for v2.
- **From Recraft:** "Save as my style" from a finished output. Saved for v2.

The brief went through three drafts and two full rounds of Claude arguing with its own previous output. Tap-to-refine got cut from v1. The input hierarchy got restructured. Background removal moved from a post-generation tool to an input option.

## Artifacts produced

- 9-question profile interview (session 01).
- 10-tool competitive matrix (session 02).
- `mockup-generator-brief.md` — three drafts, two rounds of pushback, one final version (session 02).

## Quotes worth keeping

> "Brother it should be a wrapper that converts your inputs into as perfect as possible prompts for the AI."

The clearest product statement so far. Probably the line that explains what Ivan is actually building.

> "No text inputs in UI because they force me to think and thinking is tiresome."

Ivan's framing for the no-text-input decision. The decision is sound. The framing is funnier than it sounds at first read.

> "I'm scared of the API connection."

Plain honest acknowledgement. This is the one that wants a group session in session 03 or 04, because three of the four projects in the room are going to hit an API at some point.

## What's next

**Session 03:** moodboarding.

**Stuck:** the API connection. Ivan said it plainly. Worth raising with the room as a group topic.

## Facilitator notes

Ivan ran the most rigorous iteration loop in the cohort during session 02. Three brief drafts, two rounds of pushback, and he engaged with the pushback rather than waving it off. The product changed across those drafts. Tap-to-refine cut. Input hierarchy restructured. Background-removal repositioned. That's the workshop working the way it's supposed to.

The API anxiety is real and worth addressing soon. Ivan named it himself, which is the easier half. The harder half is making sure the workshop doesn't wait until session 09 to introduce the API plumbing. By then the anxiety will have hardened into avoidance. Suggest a fifteen-minute group walkthrough of API basics in session 04 or 05, framed as "this is the boring part, here's how to make it not a problem."

Aesthetically, the project is well-positioned but visually unfixed. Ivan's strengths are branding and art direction, so the moodboard session should bias toward the more specific, weirder end of the preset list (Archive/vintage, DIY/xerox, Skate zine) rather than the safer ones (Clean editorial, Sport/athletic). The presets are the product's personality. They have to be specific or the whole tool flattens.
