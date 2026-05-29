# Journal Artifacts: Implementation Brief

A proposal for adding live, interactive embeds, called "artifacts," to journal recaps on the AI for Designers site. Each artifact is a small self-contained tool a participant built during a session. The journal page shows them off in place, the way a magazine layout would show a working demo.

This document is now scoped for handoff to a dev agent. It names the stack, the exact paths, the tag syntax, the build behavior, and the failure rules. Sections marked **v0.1** are the only work required to ship the first version.

## What we want

A journal recap includes one or more artifacts, sitting between paragraphs at full content-width. Each artifact is a real interactive tool, not a screenshot. The reader can play with it, then keep reading. An "Open full" affordance leads to a dedicated page for anyone who wants more room.

The frame around each artifact shows the artifact title, who built it, and what project it belongs to. That's all. No workshop-mechanics framing, no "Week 04 artifact" eyebrow. The artifact is the work, not the exercise that produced it.

## Stack and assumptions

The site is the existing AI for Designers static site. The artifacts feature plugs into the existing pipeline. The dev agent should not introduce new frameworks, bundlers, or runtime dependencies.

- Build script: existing custom Node `build.js` (~150 lines).
- Markdown parser: `marked`.
- Front-matter parser: `gray-matter`.
- Templates: HTML files in `src/` with `{{...}}` placeholders.
- Journal recaps: `content/weeks/NN-recap.md`. The build aggregates these into `dist/journal/index.html` sorted by date desc.
- Per-week plan pages: `content/weeks/NN.md` rendered to `dist/weeks/NN/index.html`.
- Base path: every output URL is prefixed with `${BASE_PATH}`. On GitHub Pages the value is `/ai-for-designers/`. On a custom domain it is `/`. Artifact URLs follow the same convention.

## File layout

Artifacts live under `content/`, parallel to other content sources:

```
content/
  artifacts/
    week-04/
      ivo-color-picker/
        index.html
        meta.json
        poster.jpg        # optional
      paula-behavior-tracker/
        index.html
        meta.json
```

`index.html` is the entire artifact. Inline CSS and JS. No external script or font imports. No CDN dependencies. Sibling files (images, JSON data, sub-scripts) are allowed and will be copied alongside.

## meta.json schema

```json
{
  "title": "Color Picker Prototype",
  "participant": "Ivo",
  "project": "Wattlog",
  "week": "04",
  "height": 520,
  "heightMobile": 640,
  "description": "Live color experiments from the week 04 session.",
  "poster": "poster.jpg",
  "status": "published"
}
```

Required: `title`, `participant`, `project`, `week`, `height`, `status`.

Optional: `heightMobile`, `description`, `poster`.

`status` values: `"published"` or `"draft"`.

`heightMobile` is reserved for v1.1 responsive behavior. v0.1 ignores it but the schema accepts it so artifacts authored now stay forward-compatible.

`slug` is not stored in meta.json. The folder path is the slug.

## Markdown tag syntax

The journal author writes one tag, either form:

```html
<artifact slug="week-04/ivo-color-picker"></artifact>
<artifact slug="week-04/ivo-color-picker" />
```

A height override is allowed and takes precedence over `meta.height`:

```html
<artifact slug="week-04/ivo-color-picker" height="640"></artifact>
```

That is the entire writing surface. Title, author, project all come from `meta.json`. The journal author does not restate what the artifact already says.

Parser rules:
- The tag may appear any number of times in one recap.
- Slugs must match `^[a-z0-9]+(-[a-z0-9]+)*\/[a-z0-9]+(-[a-z0-9]+)*$`. Reject anything containing `..` or starting with `/`.
- `height` must be a positive integer if present.
- Both `<artifact ...></artifact>` and `<artifact ... />` are valid. No other attributes in v0.1.

## Build behavior (v0.1)

For each `content/weeks/NN-recap.md` the build already renders into the journal:

1. Before or after `marked` runs (whichever is cleanest in the existing build flow), scan the rendered HTML for `<artifact>` tags.
2. For each tag, validate the slug. On invalid slug, fail the build with a message naming the recap file and slug.
3. Read `content/artifacts/<slug>/meta.json`. If missing, fail the build.
4. Read `content/artifacts/<slug>/index.html`. If missing, fail the build.
5. Copy the entire `content/artifacts/<slug>/` folder to `dist/artifacts/<slug>/` (all files, recursively). Do not strip `meta.json` from the copy. Shipping it is harmless and simpler.
6. Resolve `height` in this order: tag override → `meta.height` → fail the build.
7. If `meta.status === "draft"`:
   - In dev (NODE_ENV !== production), render an editorial placeholder block in place of the iframe. Text: "Artifact in progress: <title>".
   - In production, omit the wrapper entirely. Do not fail the build. Do not warn loudly.
8. Otherwise, replace the tag with the wrapper HTML below.

The build copies artifact folders even when no recap references them. This lets the dedicated artifact page (`/artifacts/<slug>/`) exist independently of any embed.

## Generated wrapper HTML

```html
<section class="journal-artifact" data-artifact="week-04/ivo-color-picker">
  <header class="journal-artifact__header">
    <p class="journal-artifact__title">Color Picker Prototype</p>
    <p class="journal-artifact__byline">by Ivo, for Wattlog</p>
    <a class="journal-artifact__open"
       href="${BASE_PATH}artifacts/week-04/ivo-color-picker/"
       target="_blank" rel="noopener">Open full</a>
  </header>
  <iframe
    src="${BASE_PATH}artifacts/week-04/ivo-color-picker/"
    title="Color Picker Prototype by Ivo"
    sandbox="allow-scripts allow-same-origin"
    loading="lazy"
    width="100%"
    height="520">
  </iframe>
</section>
```

Wrapper notes:

- The artifact title is a styled `<p>`, not an `h3`, to keep the journal page's heading outline clean. Screen readers will not announce the artifact as a heading-level landmark. Acceptable tradeoff. Do not "upgrade" this to `h3` later without a deliberate accessibility review.
- The iframe `title` is descriptive (title + participant) for assistive tech.
- `target="_blank"` on "Open full" lets a reader pop the tool out without losing their place in the journal.

## Iframe sandbox decision

`sandbox="allow-scripts allow-same-origin"` is the default for v0.1.

Reasoning. The journal page and the artifact iframe are served from the same origin. `allow-same-origin` does not introduce new risk surface beyond what already exists. Without it, the iframe gets an opaque origin and loses access to localStorage, canvas export, fetch, and module loading — patterns participant prototypes routinely use. The isolation we are relying on for safety is the iframe boundary itself (no CSS, no DOM bleed, no global JS scope sharing with the journal page), not the sandbox attribute. The sandbox is belt-and-suspenders, not the load-bearing safety mechanism.

If a future artifact needs to be locked down harder, add `sandbox="allow-scripts"` per-artifact via a future meta.json field. Not in v0.1.

## Performance plan

One or two artifacts per recap is invisible. The risk is the journal index page, which stacks all recaps. If twenty recaps each carry two artifacts, that is forty iframes. The defenses:

- `loading="lazy"` on every iframe. Browsers defer offscreen iframes automatically. This carries the bulk of the load.
- Explicit `height` on every iframe so the page does not shift as artifacts load in.
- Artifacts must be self-contained. No external network requests inside an artifact. The author trusts the artifact ships everything it needs.
- "Open full" exists for any reader who wants a real-estate upgrade. The inline version stays light.

A click-to-load poster mode (artifact swaps from poster image to iframe on click) is a v1.1 option for heavyweight artifacts. Not in v0.1.

A `postMessage`-based self-resizing iframe (artifact tells the wrapper its real height) is a v2 option. Not in v0.1. v0.1 artifacts pick a `height` and scroll internally if they exceed it.

## Visual treatment (decided)

The wrapper is a window into the participant's project, not a slot styled by the journal page. The artifact's own colors, fonts, and layout come through. The wrapper itself is a quiet frame: a hairline border in the journal's accent color, the participant credit above, and an "Open full" link in a corner.

Reasoning: this approach honors the participant's design and makes the journal entry feel like a curation, not a portfolio. The variance across artifacts (different colors, different type) becomes a feature, not a problem. If a specific artifact reads as visually loud, that is a problem for the artifact, not the wrapper.

Wrapper CSS lives in the project's main stylesheet (`src/styles/components/journal-artifact.css` or wherever components currently live). It styles the wrapper only. It does not reach inside the iframe.

## URL strategy (decided)

```
Source:      content/artifacts/<week>/<slug>/
Build copy:  dist/artifacts/<week>/<slug>/
Public URL:  ${BASE_PATH}artifacts/<week>/<slug>/
```

The site root, base-path-prefixed. Both the iframe `src` and the "Open full" `href` use the full `${BASE_PATH}artifacts/...` form, consistent with how the build already handles asset URLs (`${BASE_PATH}assets/...`, `${BASE_PATH}styles/...`).

This is GitHub Pages safe because `BASE_PATH` is set explicitly in the deploy workflow.

## Heading and accessibility notes

- The wrapper uses a styled `<p>` for the artifact title, not a heading element, to avoid disrupting the document outline. The wrapper's `<section>` carries the artifact title and credit as readable text outside the iframe, so screen readers always see the artifact's identity even if the iframe content is opaque.
- The iframe `title` attribute combines artifact title and participant.
- "Open full" link text is descriptive on its own ("Open full") and the wrapper context makes the target obvious. If a future audit wants more verbose link text, "Open Color Picker Prototype in full view" is the upgrade path.
- A future v1.1 task: ensure the placeholder shown for draft artifacts in dev mode is also accessible (a visible label, not just a styled empty block).

## v0.1 scope (the only thing the dev agent ships)

1. Add the `<artifact>` tag parser to `build.js` per the rules above.
2. Add the meta.json reader, slug validator, draft-status handler.
3. Add the folder-copy step for `content/artifacts/<slug>/` → `dist/artifacts/<slug>/`.
4. Generate the wrapper HTML per the spec.
5. Add CSS for `.journal-artifact` to the main stylesheet.
6. Add one real artifact under `content/artifacts/week-04/<participant-slug>/` (the participant + project to be named by the journal author).
7. Embed it in one real journal recap.
8. Verify the lazy-loaded iframe renders, the "Open full" link works, and the page does not shift on load.

No dashboard UI. No click-to-load poster. No iframe self-resizing. No external asset linter. No artifact gallery index. No tags field. None of those are required to ship v0.1.

## Out of scope (v1 and later)

- Dashboard integration: an Artifacts tab on the Week Detail screen that creates the folder, writes meta.json, uploads index.html, and inserts the tag into the recap markdown. v1.
- Click-to-load poster mode (`mode="click-to-load"` tag attribute). v1.1.
- External asset linter (warn on `https://fonts.googleapis.com`, `cdn.`, etc. inside artifact HTML). v1.1.
- Responsive `heightMobile` honored at runtime. v1.1.
- `postMessage`-based self-resizing iframes. v2.
- Artifact gallery index page (`/artifacts/` listing every artifact across all weeks). v2.
- `tags` field in meta.json for filtering and cross-week navigation. v2.
- Per-artifact sandbox override in meta.json. v2.
- Incremental build (only recopy changed artifact folders). v1.1, once dev rebuild speed becomes annoying.

## Open question (one remaining)

The placeholder used for draft artifacts in dev mode. Is it a styled box with the artifact title, or a flat "(artifact in progress)" line of text? Defer to the visual treatment of the first real artifact. Decide once we have one in place.
