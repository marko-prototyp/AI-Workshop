# Mockup Generator — Project Brief
*12-week AI program — UI/UX Design track*
*Last updated: May 2026*

---

## What I'm Building

A browser-based AI mockup generator where designers upload a graphic asset, dial in a visual feeling across six input dimensions, and receive generated mockups — without writing a single prompt.

This is a wrapper that converts visual inputs into prompts. The entire product exists to remove the act of communicating with AI from the designer's workflow. The chips, presets, reference slots, and lock/shuffle system are all prompt engineering — the designer never sees or touches the prompt itself.

---

## Who It's For

**Primary:** Designers at small studios and in-house branding teams who need mockups for client pitches, case studies, and internal decks. This is a professional tool that happens to be accessible — not a consumer tool that professionals can use. Every design decision optimizes for the professional use case first.

**Secondary:** Anyone who needs a mockup — freelancers, independent designers, students — but they are not the design target. Default presets, export settings, and visual language all serve the professional context.

---

## What Success Looks Like

A fully designed and functional product, live in a browser, connected to GPT Image 2 via API. By the end of 12 weeks:

- A designer can upload a graphic, make selections across the input system, and receive four generated mockups in a single flow — without typing anything
- The lock/shuffle refinement system works: users explicitly lock dimensions they liked and shuffle dimensions they didn't, then regenerate with one click
- Post-generation adjustments (brightness, contrast, saturation) are functional and feel native to the product
- The product looks and feels like a professional tool — restrained, not playful; considered, not generic
- It replaces the designer's own mockup-finding workflow rather than just demoing well

---

## Input System

The input system has two tiers. **Subject and Aesthetic Preset are primary** — visually prominent, always visible, sufficient on their own to produce a good result. The remaining four dimensions are **secondary** — collapsed by default, expandable when the user wants more control.

The aesthetic preset is a fully pre-engineered prompt that works standalone. Every secondary dimension the user touches modifies that base prompt rather than building from scratch. If a user picks only Subject + Preset and hits generate, they get a good result. The other four dimensions are refinements, not requirements.

There is no text input before generation. No exceptions. The chips are the prompt.

### Primary inputs (always visible)

**Subject** — what the graphic goes on. The only truly required field:
T-shirt, hoodie, longsleeve, jacket, cap, tote, poster, zine page, sticker sheet, skateboard deck, packaging

**Aesthetic preset** — the overall visual DNA, pre-engineered to work as a complete prompt on its own:
Skate zine, Streetwear lookbook, Archive/vintage, DIY/xerox, Clean editorial, Sport/athletic, Outdoor/workwear

Every preset needs a thumbnail preview. Preset names come from the culture, not from model versioning.

### Secondary inputs (collapsed by default, expandable)

**Framing** — shot type and angle:
Flat lay, on-body, hanging, close-up detail, on the floor · Front, 3/4, overhead, side

**Lighting:**
Natural/golden hour, Overcast/flat, Studio/controlled, Flash/harsh, Low light/moody

**Environment:**
Concrete/urban, Indoors/home, Nature/outdoor, No background, Abstract/textural, In-use/lifestyle

**Era/Texture** — the dimension most AI tools get wrong:
Film grain, Faded/washed out, High contrast/punchy, Raw/unedited feel, Clean/digital

### Input UX rules
- Every input is a named chip. Clicking a chip opens a thumbnail picker with 4–6 previewed options — never a dropdown, never a blank field
- "No background" lives inside Environment. There is no separate background removal tool post-generation. Note: GPT Image 2 does not natively support transparent PNG output — no-background requests are routed through a separate background removal API after generation (decision: TBD which service)
- A hex color picker sits on the Aesthetic Preset chip — users can override the preset's default palette with a specific brand color. Designed for client work

### Reference image slots
Two optional slots alongside the graphic upload:
- **Aesthetic reference** — a Pinterest pin, saved image, or any visual that captures the desired feel
- **Environment reference** — a surface, scene, or room

Each slot has an individual strength slider. Drag-and-drop from file or URL. Both feed into the generation as weighted visual guides via GPT Image 2's multi-reference input (up to 16 reference images supported per API call — the two slots plus the uploaded graphic are well within this limit).

---

## Refinement System — Lock / Shuffle

After the first generation, each of the six input chips becomes interactive:

- **Lock a chip** (click once) — this dimension is working, keep it across the next generation. Locked chips turn solid/filled
- **Shuffle a chip** (click twice) — this dimension isn't working, randomize it within the preset's range on the next generation
- **Regenerate** — produces four new outputs respecting all locks and shuffles

No inference engine. The user does the locking explicitly, which is more reliable than a system that guesses which dimension they were responding to.

Pinterest-style implicit-feedback convergence (where the system infers which dimensions the user responded to) is the v2 vision.

---

## Post-Generation — Optional Text Override

After the first generation, an optional single-line text field appears beneath the output grid. It is not visible before generation. Users who are satisfied with the chip-based output never need to interact with it.

Users who want to push further can type a short override: "more washed out", "darker shadows", "remove the person." This modifies the existing chip-constructed prompt rather than replacing it. It is an escape hatch for power users, not a primary input. The two systems — chips and text override — serve distinct purposes: chips define the visual parameters, text adds specific details the chips cannot capture. Using one without the other is valid. Using both gives the most precise result.

---

## Output Experience

**Per run:** 4 images, displayed as a 2×2 grid. All four are treated as equal candidates — no hero image, no thumbnail hierarchy. Click any image to expand to full size.

**When outputs are bad:** A "Regenerate" button is always visible, paired with a one-line contextual suggestion ("try changing your aesthetic preset or era/texture") surfaced near the button — no modal, no error state, just a direction.

**Export:** PNG at 2x resolution. Covers screen decks, social, and most digital client deliverables. This is a screen-first tool — print-ready output is not in scope at v1.

**Post-generation adjustments:** Brightness, contrast, and saturation sliders. Available on any output before export. No inpainting. No reframe.

---

## API — GPT Image 2

**Model:** `gpt-image-2` (snapshot: `gpt-image-2-2026-04-21`)

**Why GPT Image 2:**
- Supports up to 16 reference images per call — covers both reference slots plus the uploaded graphic with room to spare
- `images.edit` endpoint handles image-to-image compositing, which is required for applying a graphic onto a generated scene
- Native 2K resolution output
- Strong prompt fidelity on complex, multi-element scenes
- Photorealism and accurate lighting — relevant for lifestyle and on-body mockup outputs

**Endpoints in use:**
- `images.generate` — text-to-image for generating the base mockup scene
- `images.edit` — image-to-image for compositing the uploaded graphic onto the generated scene

**Pricing (approximate, high quality):**
- ~$0.211 per image at high quality (1024×1024)
- 4 images per run = ~$0.84 per generation at high quality
- Medium quality (~$0.053/image) as a default with high quality as an option is worth evaluating for cost management

**Known constraint:**
GPT Image 2 does not support transparent PNG output. "No background" environment outputs require a secondary background removal API call after generation. Service TBD — evaluate against cost, quality on varied outputs, and API simplicity.

**Rate limits:**
Tier 3 (50 images/min) requires $100 spent and account at least 7 days old. Plan tier progression before launch — a fresh API key on Tier 1 or 2 will hit limits quickly if multiple users generate simultaneously.

**Implementation note:**
Pin the snapshot ID (`gpt-image-2-2026-04-21`) in production code. The alias `gpt-image-2` rolls forward when OpenAI publishes a new version — that is not behavior to want changing mid-build.

---

## Research — What I Looked At and What It Taught Me

**Pinterest**
The best example of taste-convergence through implicit feedback. Clicking 2–3 images in a row locks the algorithm onto a coherent visual direction without the user ever describing what they want. Taught me: the lock/shuffle refinement system is the v1 version of this — explicit rather than inferred, but the same underlying logic. Also taught me what not to build toward: an ad-polluted feed flooded with AI-generated content is exactly what the design community is fleeing.

**Mockey.ai**
20,000+ template library, video animation export, shadow/highlight opacity sliders on custom mockup upload. Taught me: the Mockup Collection concept — generating a coordinated set of outputs that share parameters but vary framing — is the right output unit for designers making decks. Also taught me the trap: an enormous unstructured template grid with crude category filters is the wrong model entirely.

**Lummi.ai**
Filters as first-class generative inputs — lighting is a button, not a prompt token. "Similar by Subject vs. Similar by Vibes" toggle on every result. Taught me: the six input dimensions should split into primary (what + overall feel) and secondary (how it's shot + how it's textured). Paywalling the most useful tools immediately breaks trust with professional users.

**Leonardo.ai**
Three independent reference image slots (Style / Content / Character), each with its own weight slider. Taught me: split aesthetic reference from environment reference with independent strength controls. Also taught me what to avoid: too many sidebars and constant credit anxiety destroys the experience for professional users.

**Midjourney**
The Style Creator — tournament-style grid where users say yes/no to image grids across multiple rounds, converging on a named reusable aesthetic. Taught me: the lock/shuffle system is the practical v1 version of this idea. Also: if a style-code or save-as-preset system is added later, version it from day one — Midjourney's codes break across model versions.

**Krea.ai**
The AI Strength slider: one dial from "literal interpretation" to "fully imagined." Taught me that three named sliders (aesthetic strength / subject fidelity / reimagination) are the right pattern for exposing fine-tune control without overwhelming users. Saved for v2.

**Visual Electric**
Autocomplete prompt suggestions — concrete option chips with thumbnail previews appear under every input so users never face a blank field. Style names in designer-readable language (Portra 400 vs. "Cinematic v3"). Taught me: every chip in the input panel should show thumbnail-previewed suggestions when opened, and preset names should come from the culture, not from model versioning.

**Cosmos.so**
Hex/palette color picker inside the search bar. Taught me: the hex color picker on the aesthetic preset is a first-class feature for any designer on client work. A product that actively filters out AI-generated content builds more trust with professional designers than one that doesn't.

**Magnific**
Three labeled sliders — Creativity / HDR / Resemblance — in one always-visible panel. No hidden tabs, no advanced mode toggle. Taught me: the right pattern for exposing generative parameters is three named, concrete English labels with preset-driven defaults. Each preset silently sets default slider positions; power users can drag. Saved for v2.

**Recraft**
One-click "Save as my style" from a finished output. Taught me: saving the full input combination as a named reusable preset must be a single button near the export action. Saved for v2.

---

## What I'm Not Building

These are hard constraints. When scope pressure hits in week 7, this list is what gets pointed to.

- **No text input before generation.** The chips are the prompt. No exceptions.
- **No template library browsing.** No grid of templates, no filter sidebar on a library. That category is saturated.
- **No dedicated background removal tool.** Clean outputs are handled at input time via "No background" in Environment, with a secondary API call handling the actual removal post-generation.
- **No bulk/batch generation.** One graphic at a time.
- **No social or sharing features.** No public gallery, no likes, no community feed. This is a tool, not a platform.
- **No account system or saved history at v1.** Acknowledged tradeoff: returning users lose session state. Acceptable at v1 — the primary audience works on discrete projects, not continuous sessions.
- **No custom model fine-tuning.**
- **No team collaboration features.**
- **No AI inpainting or reframe post-generation.**
- **No video mockups at v1.**
- **No mobile app.** Web only.
- **Not print-ready.** PNG at 2x resolution for screen use. No PDF, no 300dpi output.

**Explicitly open for v2:**
- Account system + saved presets + generation history — the most important v2 feature given the primary audience
- Save-as-preset (the Recraft pattern)
- Three named fine-tune sliders (the Magnific/Krea pattern)
- Pinterest-style implicit-feedback convergence loop (replaces lock/shuffle)
- Video mockups
- Print-ready export

---

*This brief is the source of truth. Come back to it every session. If something isn't in here, it isn't decided yet. If something has changed since last session, update it here before starting work.*
