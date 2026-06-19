---
name: style-extract
description: Analyze a reference image of a UI, interface, poster, or visual artifact and produce a complete design brief in the form of a constraint system — color values, typography, spacing logic, hierarchy, texture, cultural reference, named style, and an AI-tell list specific to that aesthetic. Use whenever the user uploads a screenshot, design reference, mood image, or visual artifact and asks to analyze it, break it down, extract the style, explain what makes it work, write a prompt from it, or build a design system from it. Also use when the user says "what is this style," "what's unique about this design," "extract the rules," "turn this into a prompt," or pastes multiple images and asks how they relate. The output is a structured brief the user can hand to a model to generate work in the same style without falling into stock AI defaults.
---

# Style extract — visual analysis to constraint system

This skill turns a reference image into a design brief that produces non-default work when handed to a model. It exists because most AI-generated UI converges on the same stock look — Inter, blue-500, three-column card grids, pill badges with colored dots, gradient hero numbers, drop shadows on everything. The reason isn't that the model has bad taste. It's that briefs typically describe what the design should look like, and the model fills the unspecified space with whatever's statistically most common.

The fix is a brief that does two things at once. It tells the model what the thing *is* (cultural anchor, material reference, decision rule) and it tells the model what the thing can never be (specific banned colors, banned typography, banned components, banned patterns). The first establishes the right mental model. The second catches what slips through.

This skill produces that brief.

## When this skill triggers

- The user uploads a screenshot, photo, mood image, or design reference and asks for analysis
- The user asks "what makes this design work," "what is this style called," "what's unique about this," "break this down"
- The user wants to extract a style from one or more reference images and turn it into a prompt
- The user pastes two or more images and asks how they relate or what they share
- The user asks for a design brief, style guide, or design system derived from a visual reference
- The user mentions wanting to avoid generic AI design, stock UI, or default Claude design output

If the user wants generic design advice with no reference image attached, this is the wrong skill. If they want to build a component from an already-written brief, use the brief — this skill is upstream of that.

## What to read before analyzing

If the user has uploaded an image, view it first. If they've uploaded multiple images, view all of them before writing anything. Do not start analysis from memory of similar images — every observation must be tied to something visible in the reference.

## The shape of the output

The output is a single markdown document with seven sections in this order. Each section has a specific job. Skipping or reordering sections weakens the brief.

### 1. What the thing is

One or two sentences naming the artifact in front of you and what it appears to be for. Not what it looks like — what it *is*. This is the ontological anchor. It does more work than any color value.

Worked examples:
- "A dashboard widget for a fitness tracking app, designed to live on a phone home screen."
- "A product landing page for a design tool, structured around a single hero claim and a grid of community remixes."
- "A control panel for hardware audio gear, rendered as a software interface but referencing physical knobs and switches."

The framing changes what the model reaches for. "Instrument, not app" pulls from a different reference library than "minimal dashboard."

### 2. The named style

Give the style a name. If it has an established name, use it. If it doesn't, invent one that captures the move. The name should be specific enough that a designer could look it up or argue with it, not so generic it could mean anything.

Worked examples of style names that work:
- "Braun × Nothing OS hybrid"
- "Swiss editorial with Glyph-system data layer"
- "Instrument-panel print"
- "Tactile minimalism with a single signal color"

Worked examples that don't:
- "Clean modern" — meaningless
- "Minimal" — meaningless
- "Dark mode dashboard" — describes a setting, not a style

The name should also gesture at the cultural reference. Designers reach for references. Naming the reference makes the brief portable.

### 3. The visual breakdown

The detailed observation pass. Cover every category below. Be specific — exact color values where possible, exact type weights, exact spacing logic.

**Color** — list every color used, with hex values if extractable. State the palette size. State the rules. Where is the accent used? How many times? Is the accent ever tinted (opacity variants), or always at full saturation? What is the relationship between dark and light surfaces — pure inversion, or shifted off-axis?

**Typography** — name the typeface if recognizable, or describe it specifically enough that a designer could match it. List the weights used. Identify the dominant typographic object (the largest, most isolated piece of type) and explain how it's set. What is the size relationship between the dominant type and the supporting type? Is there tracking? Is anything uppercase? Where, and why?

**Spacing** — identify the base unit if you can. Describe how whitespace functions: is it structural (giving the content room to breathe), or compressed (data-dense, instrument-like)? Where is the spacing generous? Where is it tight?

**Hierarchy** — how does the design tell you what's important? Through size, weight, color, position, or isolation? Identify the single most prominent element and explain how it earns its prominence.

**Contrast** — how is contrast used as a structural tool? Is dark-on-light the default with light-on-dark as exception, or vice versa? Are there inversions across the layout — black cards next to white cards? How does contrast organize the eye's path through the design?

**Texture and depth** — is there any simulated depth? A dial, a shadow, a gradient, a dot-matrix? Where is it, and what is it referencing? Most well-designed UI has at most one texture move per component — identify what it is.

**Layout** — describe the grid logic. Is it a strict grid, an editorial layout, a bento box, a ruled ledger? What does the layout choice signal about how the designer thinks about the content?

**Components** — what are the recurring component patterns? How are status states communicated? How are interactive elements indicated (or not)? How does the design handle data visualization?

### 4. The implicit rules

From the breakdown, extract the rules the design is following. These are not stated anywhere in the reference image — they're inferred from consistency. A rule like "the accent color appears only at full saturation, never tinted" is something you read by noticing that it never appears at 60% or 30% anywhere in the image.

Write each rule as a short, definitive sentence. Aim for between five and twelve rules. Examples:

- The palette is three values plus one accent.
- The accent appears at full saturation or not at all.
- Typography uses two weights only.
- The dominant metric sits on the surface with no card around it.
- Spacing snaps to an 8px base unit.
- Status is communicated through the dominant value or the accent, never through a colored badge.

The rules are what gets translated into the constraint system. They are the design's grammar.

### 5. The dos

Translate the rules into positive instructions. For each rule, name what *should* happen. This section reads like a style guide.

This section is shorter than you'd expect — usually six to ten items. Resist the temptation to specify everything. The goal is to communicate the design's thinking, not its every dimension. Specific values where they matter (color hex codes, base spacing unit, typeface), general principles where they don't.

### 6. The don'ts

Translate the rules into refusals. For every "do," there's a corresponding "don't" — and several additional don'ts that catch the patterns the design is implicitly avoiding.

This section is longer than the dos. It should be specific. Not "avoid generic colors" but "no `#3B82F6`, no purple, no any color outside the named palette." Not "avoid stock typography" but "no Inter, no IBM Plex, no SF Pro, no `letter-spacing: 0.2em` applied universally to small labels."

The reason this section matters: a brief that only specifies what to do leaves all unspecified space open. The model fills open space with defaults. The don'ts close the unspecified space.

### 7. The AI-tell list — specific to this style

This is the critical section. Most styles have predictable failure modes when an AI tries to generate them. List the specific patterns this style is most likely to be replaced with when an AI tries (and fails) to produce it.

Cover at least these categories:

**Color tells** — what colors does the AI default to when it should be using this style's palette? What opacity variants does it sneak in?

**Typography tells** — what typefaces does the AI substitute? What weight does it default to? Does it apply tracking and uppercase as a default?

**Layout tells** — what default layout patterns does the AI fall back on? Three-column grids? Card-based dashboards? Centered hero with two CTAs?

**Component tells** — what stock components does the AI insert that this style would never use? Pill badges? Tooltips? Ring progress indicators? Stoplight color states?

**Behavior tells** — what default interactions does the AI add that shouldn't be there? `transition: background 0.15s` on every element? `cursor: pointer` on non-interactive things?

**Code tells** — what code-level patterns reveal AI generation? Self-congratulatory comments? Decorative dividers? Annotations explaining why the design is unconventional?

**The meta-tell** — does this style have a way of being self-conscious about its own restraint? Some styles, when generated by AI, produce a rationale section explaining their own constraints. Name this if it applies.

For each AI tell, name the specific pattern with enough detail that it could be caught in a code review. "No `letter-spacing: 0.2em` applied to every label" is useful. "No bad typography" is not.

## The closing principle

End the brief with a one-line principle that captures how the design thinks. This is not a tagline. It's a decision rule. When the model is generating something and runs into ambiguity, this line tells it what to do.

Worked examples:
- "When in doubt, make it smaller and grayer."
- "The accent stops you once. Everything else recedes."
- "Restraint is the brand."
- "The component is the content. The UI disappears."

## Multiple images

If the user uploads multiple images and asks how they relate, the analysis becomes comparative. The structure is the same — visual breakdown, implicit rules, dos and don'ts, AI tells — but the named style should capture what the images share, not what they each individually are. The dos and don'ts cover the union of their moves. The AI-tell list covers the patterns that would replace any of them.

If the images are clearly meant as a mood collage rather than a single coherent style, name that explicitly. Identify the common thread and treat the brief as describing the thread, not the specific images.

## What to leave out

A constraint-system brief is not a style guide. It does not need to cover every component the user might build. It does not need spec values for every conceivable element. It captures the design's *thinking* and the design's *refusals*.

Specifically:

**Do not include component specifications for things not visible in the reference.** If the reference doesn't show a button, don't specify button styling. The brief covers what the reference covers.

**Do not include ASCII layout diagrams.** The reference image is the layout. ASCII boxes don't add information and read as AI output.

**Do not include open design questions or "things to figure out later."** The brief is finished. If something is genuinely unclear, name it once at the end as an open call, briefly.

**Do not include implementation guidance.** No CSS code snippets in the body of the brief. Specific values (hex codes, pixel values, font weights) belong in the dos and don'ts. Code goes in whatever the user builds from the brief.

## What makes the output good

The test of a good brief: when handed to a model with no other context, does it produce work that looks like the reference, or does it produce stock AI output?

A brief is working if:
- The cultural reference and named style are specific
- The dos and don'ts together close most of the unspecified space
- The AI-tell list catches the patterns the model would actually fall into
- The closing principle gives the model a decision rule for ambiguous cases

A brief is failing if:
- It reads like a generic style guide that could describe any minimal UI
- The don'ts are vague ("avoid generic design") instead of specific ("no Inter, no `#3B82F6`, no pill badges")
- The cultural reference is missing or generic ("clean and modern")
- It specifies every implementation detail and leaves nothing for the design's logic to do

## Output format

Write the brief as a single markdown file. Use H2 for the seven sections. Use tables sparingly — color tables are useful, but most of the brief should be prose. The brief should be readable end-to-end in five to ten minutes. If it's longer than that, it's specifying too much.

The brief is for the user to keep and reuse. They will paste it into other conversations as the anchor for new designs. Write it so it stands alone without any context from the analysis conversation.
