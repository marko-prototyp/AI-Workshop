# Should we use React? — second-opinion brief

A short summary to share with another agent. Two related questions, asked together because they share trade-offs.

---

## Project context

**AI for Designers** is a 12-week workshop where five designers each ship a real project with Claude as the building partner. The repo holds:

- A public-facing journal site (per-week entries, per-participant case studies, a home page).
- A private internal layer (week syntheses, raw notes, participant briefs).
- An upcoming dev-only dashboard for managing the journal files locally.

Current stack:

- Plain HTML / CSS / vanilla JS.
- Markdown content rendered to HTML at build time via a small `build.js` (~50KB Node script using `gray-matter` and `marked`).
- A `dev-server.js` that builds and serves on `localhost:3000`. Supports `/api/write-file`, `/api/write-image`, `/api/git-commit`.
- Deployed to GitHub Pages from `dist/`.
- No framework, no bundler, no TypeScript. Two npm deps total (`gray-matter`, `marked`).

The voice and stance of the project is editorial, designer-first, no-fluff. The stack matches that stance — small, direct, no extra layers.

---

## Question 1 — Should the new dashboard be built in React?

The dashboard is a localhost-only tool for the workshop facilitator (one user) to edit journal files in a structured UI. Estimated scope: ~5 views, ~3 modals, ~600 lines of JS.

### Pros of React for the dashboard

- **Reactive state out of the box.** Files re-render automatically when content changes; no manual orchestration after each save.
- **Component model with enforced boundaries.** `<SaveModal>`, `<WeekCard>`, `<ConflictModal>` as discrete files with explicit props.
- **Ecosystem.** React Hook Form for the frontmatter inputs, react-markdown for rendering, react-hotkeys-hook for shortcuts. Less to write from scratch.
- **AI-familiarity.** Code-generating LLMs have seen far more React than vanilla ES module patterns. Output tends to be more reliable.
- **Future scale.** If the dashboard ever grows past v3 (multi-cohort, more participants, more views), components scale better than a flat module tree.

### Cons of React for the dashboard

- **Build pipeline.** Adds Vite or similar — a second toolchain alongside the existing `build.js`. Config, HMR, source maps, dev-vs-prod modes.
- **Dependency surface.** React + react-dom + bundler + libraries = ~10 npm packages. Each is a maintenance vector. In two years, plain JS still works; React might require migration.
- **Onboarding tax.** Hooks, lifecycle, refs, memoisation patterns. Plain ES modules read top-to-bottom.
- **Stylistic island.** The rest of the repo is plain JS. React in the dashboard creates two patterns to context-switch between.
- **Right-sized question.** The dashboard's complexity (~5 views, file workflow) is below React's natural floor. Not React-scale, but not so small that React is impossible either.

### Honest decider

If the maintainer is more fluent in React than vanilla JS, or finds Claude Code more reliable when generating React, those reasons override most of the above. Productivity beats stylistic consistency.

---

## Question 2 — Should we rebuild the whole site in React?

The site is content-heavy: a home page, 12 journal entries, 5 case studies, a few static pages. Today it's plain HTML/CSS/JS + Markdown → static HTML. Deployed as static files.

### Pros of React for the whole site

- **Interactive components.** Dark mode, search, filter-by-participant, expandable timelines, embedded mini-tools per entry. Each of these is achievable in plain JS but more natural in React.
- **Per-entry interactive embeds.** Some case studies might include working mini-tools (a chart, a calculator, an annotated screenshot tour). React makes these reusable across entries.
- **Future expansion.** If the project becomes a recurring program with multiple cohorts, a React app with content layer (Astro, Next.js, Gatsby) handles routing, pagination, related-entries, cohort switching far better than hand-rolled.
- **Recruiting/portfolio narrative.** "Built the site with the same stance as the workshop" — currently plain HTML, fine. But "I rebuilt it in React with deliberate restraint" is a stronger artifact if the audience values that.
- **TypeScript path.** If the file format contracts (frontmatter shapes for entries, case studies, etc.) deserve type safety, TS+React is the natural fit.

### Cons of React for the whole site

- **Stack heaviness for content.** The site is 90% prose and images. React's strengths are state and interactivity, neither of which the current site needs much.
- **SEO and load-time work.** Pure React SPAs need SSG or SSR to keep the site indexable and fast. That means picking and learning Next.js, Astro, or Gatsby — each with its own opinions and lock-in.
- **Bundle weight.** A React site ships hundreds of KB of JS just to render a paragraph. Current site ships essentially zero JS. For a designer-facing site, this matters.
- **Deploy complexity.** GitHub Pages serves static files well. Adding SSR or ISR requires a different host (Vercel, Netlify) or accepting purely static React (which is back to "why React then").
- **Mismatch with the project's stance.** The workshop teaches restraint — pick the tool that fits, not the trendy default. A React rebuild of a content site is the canonical example of over-engineering, and the journal voice explicitly pushes back against that move.
- **Cost of the rebuild itself.** The current site is shipped and working. A React rebuild is weeks of work to deliver the same surface to readers, with the gain coming from interactivity that doesn't exist yet.

### Middle ground worth considering

If interactivity is the real driver, **Astro** is the sweet spot for content sites: Markdown-first, ships zero JS by default, lets you drop React (or Vue or Svelte) components in as "islands" only where you need interactivity. Closest to the current architecture, gives the React door for any specific component, without paying the full React cost.

Other options: Eleventy + Alpine.js for lightweight interactivity. Or stay plain JS and add interactivity as needed.

---

## What's already been decided

- The dashboard will be a localhost dev tool, not a Cowork artifact or public-facing page.
- It lives in `dashboard/` at the repo root, gitignored.
- Drafting/voice work happens in the main Claude chat (which has the journal-voice, journal-entry, audit-copy skills). The dashboard is for file management, light editing, and image staging — not for generating text.
- The site itself ships as static HTML and that has been working fine.

---

## What we'd like the second opinion on

1. **For the dashboard:** is React justified, or is plain ES modules right-sized?
2. **For the site:** is there a real reason to rebuild in React, or would Astro / Eleventy / staying plain JS be the better move?
3. **If React for either:** which framework / meta-framework, and why that one specifically?

Push back honestly. The project's stance is to pick what fits, not what's expected.
