# Journal Dashboard — Build Brief v3
*AI for Designers / Marko Kolić*
*v1: 2026-05-20 (Cowork artifact) · v2: 2026-05-25 (revised artifact) · v3: 2026-05-26 (off-artifact, into the repo)*

---

## Setup and run

From the repo root:

```bash
npm install          # one-time
npm run dev          # runs build.js, then dev-server.js on port 3000
```

Open `http://localhost:3000/dashboard` in Chrome. That's it.

If port 3000 is taken, set the `PORT` env var: `PORT=3001 npm run dev`. `dev-server.js` reads `process.env.PORT` with a fallback to 3000.

The dev server is **localhost-only** and not hardened against untrusted input. Don't bind it to a public interface or expose it via tunnel. Path checks (`startsWith(__dirname)`) prevent obvious traversal but won't survive symlinks or malicious input. This is a personal dev tool.

---

## Why this revision exists

The v1 and v2 dashboards were built as Cowork artifacts. They didn't work. Cowork sandboxes block both paths the dashboard needed: the browser's File System Access API silently returns AbortError for arbitrary host folders, and `mcp__workspace__bash` rejects calls from inside artifacts with HTTP 400. Every workaround we tried fought the sandbox.

v3 moves the dashboard out of Cowork and into the AI for Designers repo itself. It runs as a route in the existing `dev-server.js` at `http://localhost:3000/dashboard`. It uses the file APIs that are already wired up in the dev server. Editing and saving both work because the dashboard is a localhost page talking to a Node process on the same machine.

The vision stays the same. The implementation is honest now.

---

## What the dashboard is

A locally-served editing surface for the AI for Designers journal. The job is to view, edit, and organise the files we already maintain on disk — week syntheses, public journal entries, per-participant case studies, and week images. The dashboard doesn't write the content. That happens in the main Claude chat where the skills and voice work live. The dashboard is where finished drafts land, where light edits happen, where images get placed, and where everything gets saved.

The source of truth is always the files on disk. The dashboard reads from them on demand. Saves go straight back to disk via the dev server.

---

## Architecture

### Where it lives

`dashboard/` at the AI for Designers repo root. **Gitignored** while in development — sits alongside `Claude/` and `skills/`, which are also personal-only. The dashboard is a local dev tool, not part of the public site, so it stays out of git until we decide otherwise.

Served by `dev-server.js` at `http://localhost:3000/dashboard` directly from the working folder. **No build step.** The `src/` → `dist/` pipeline is for the public site; the dashboard skips it. Edit a file, refresh the browser, see the change.

If we ever want to share or open-source the dashboard, the graduation path is two steps: move `dashboard/` to `src/dashboard/` and remove the gitignore line.

### How it reads and writes

The dashboard is a plain HTML/CSS/JS page that talks to the dev server over HTTP. No File System Access API. No MCP. No Cowork bridge. Just `fetch()` to localhost endpoints.

Endpoints already in `dev-server.js`:

- `POST /api/write-file` — writes a markdown file. Body `{ filePath, content }`. Path-checked to stay inside the project.
- `POST /api/write-image` — writes a binary image from a data URL. Body `{ filePath, dataUrl }`.
- `POST /api/git-commit` — runs `git add` and `git commit` for journal paths. Push stays manual in terminal.

Endpoints to add:

- `GET /api/read-file?path=...` — returns file contents as text. Used by the dashboard on load and on Sync.
- `GET /api/list-dir?path=...` — returns directory contents. Used to discover what's been written so far.
- `GET /api/stat?path=...` — returns `{ exists, mtime, size }`. Used for conflict detection before writes.

### Project structure

Not one giant HTML file. Proper structure, gitignored, sitting at the repo root next to the other personal-only folders:

```
AI for designers/
  Claude/                  already gitignored
  Journal/                 tracked
  content/                 tracked
  src/                     public site — tracked
  dist/                    public site build — gitignored
  dashboard/               NEW — gitignored
    index.html             shell (head, body, mount points)
    dashboard.css          styles
    dashboard.js           entry point — boot, route, render
    api.js                 fetch wrappers for /api/* endpoints
    state.js               localStorage + in-memory state
    activity-log.js        activity log drawer
    views/
      sessions.js          12-week grid + week detail
      write-entry.js       paste draft, place images, save
      case-studies.js      per-participant
      entries.js           flat log of everything written
      notes.js             session notes scratch (see v1 scope below)
    components/
      save-modal.js        pre-save confirmation
      conflict-modal.js    overwrite / reload / cancel
      folder-status.js     sidebar status pill
      markdown.js          minimal renderer
    util/
      paths.js             canonical paths (Journal/week-NN-synthesis.md, etc.)
      esc.js               HTML escape helpers
  dev-server.js            tracked — adds a route for /dashboard
  .gitignore               add /dashboard/
```

Plain ES modules. No framework. No bundler. `dev-server.js` serves files from `./dashboard/` directly — no copy into `dist/`. The dashboard is a dev tool, so iteration speed matters more than a production build.

### Why plain ES modules

The dashboard's complexity is the file workflow, not the UI. Modules buy what a framework would, without the tax. Plain HTML/CSS/JS matches the rest of the repo.

### Week metadata source

The Session Notes grid needs week number, title, date, and status for all 12 weeks. Decision: **a single source-of-truth file at `Journal/weeks.json`**, tracked in git, hand-edited when titles or dates change.

```json
[
  { "n": 1,  "title": "Meet Claude. Pick your project.",     "date": "2026-05-08", "phase": "Discover" },
  { "n": 2,  "title": "Write the brief. Argue with it.",      "date": "2026-05-13", "phase": "Discover" },
  ...
  { "n": 12, "title": "Polish. Ship. Show.",                  "date": "2026-07-22", "phase": "Ship" }
]
```

Status (`published` vs `upcoming`) is **derived**, not stored — a week is `published` if `content/journal/NN.md` exists with non-empty body. Same for `synthesised` (does `Journal/week-NN-synthesis.md` exist), `has-notes`, `has-images`. The grid pulls these on load.

This keeps the JSON small and stable. The only writes to `weeks.json` are when you change a session title or date — rare. Everything else is derived from files-on-disk and stays accurate automatically.

`build.js` should also read from `weeks.json` (rather than re-deriving from frontmatter) so the site and the dashboard agree on the canonical list. If `build.js` already does this, no change. If not, one small refactor.

---

## Source files the dashboard manages

| File | Where it lives | What it is |
|---|---|---|
| `Journal/week-NN-synthesis.md` | Internal | The facilitator synthesis. Written after each session. 12 total across the workshop. |
| `content/journal/NN.md` | Public site | The journal entry that appears on the AI for Designers site. Same week, different audience. |
| `Journal/participants/<pid>/case-study.md` | Internal | The long-form case study for one participant. Grows session by session. 5 total. |
| `Journal/participants/<pid>/notes.md` | Internal | Facilitator notes about that participant, not for publishing. |
| `Journal/week-images/week-NN/*` | Internal | Images for the public journal entry, organised by week. |
| `Journal/notes/session-NN.md` | New | Free-form session notes (see "Session notes" below). |

Five participants: **ivo** (Wattlog), **ivan** (Mockup Generator), **paula** (Classroom Behavior Tracker), **marin** (Naučimo Hrvatski), **marko** (AI for Designers meta).

Twelve weeks, currently mid-workshop. Sessions 1–3 are written. Session 4 is May 27.

---

## File format contracts

These are the shapes the dashboard reads and must preserve on write. Drift from these and the site build breaks or the case studies stop rendering.

### Synthesis — `Journal/week-NN-synthesis.md`

No frontmatter. Plain markdown. The dashboard reads and writes the whole file as a single string.

```markdown
# AI for Designers — Week 01
## Meet Claude, pick your project

**Session:** Week 1 of 12
**Participants present:** 4 (Ivo, Ivan, Paula, Marin — Marin ran the handbook solo and joined after)

---

## The participants & their projects

### Ivo — Personal Cycling & Training Dashboard

[prose…]

### Ivan — Mockup Generator

[prose…]
```

**Editing rule:** the dashboard treats the synthesis as a single textarea. Headings and dividers are user-managed, not enforced by the dashboard.

### Public entry — `content/journal/NN.md`

Frontmatter is required and parsed by the site build. The dashboard surfaces each field as a separate input and re-serialises on save using `gray-matter` (already a project dependency).

```markdown
---
num: "01"
title: "Meet Claude. Pick your project."
phase: "Discover"
date: "2026-05-08"
participants: 4
quote: "Something that gets used on Monday morning."
quoteAttribution: "Paula, on what success looks like"
---

[body markdown — paragraphs, ## subsections, **bold leads**…]
```

**Frontmatter fields** (all required unless noted):

| Field | Type | Example | Notes |
|---|---|---|---|
| `num` | string | `"01"` | Zero-padded two digits. Must match filename. |
| `title` | string | `"Meet Claude. Pick your project."` | Sentence case, ends with period. |
| `phase` | string | `"Discover"` | One of: Discover, Define, Make, Ship. |
| `date` | string | `"2026-05-08"` | ISO date. |
| `participants` | number | `4` | Count present. |
| `quote` | string | `"Something that gets used on Monday morning."` | Pull-quote, no attribution inside. |
| `quoteAttribution` | string | `"Paula, on what success looks like"` | Free text. |

**Editing rule:** the dashboard exposes each frontmatter field as its own input. Body is one textarea. On save, frontmatter is re-serialised with `gray-matter` so quoting stays correct (quotes inside values become `\"`).

### Case study — `Journal/participants/<pid>/case-study.md`

Frontmatter plus a structured body. The dashboard reads it as one document for editing but uses the `### Week NN` headings for the per-week derivation (week checklist, "this week's section" lookup).

```markdown
---
participant: "Ivo"
project: "Wattlog"
status: "draft"
weeks_completed: 2
last_updated: "2026-05-13"
hero_image: ""
final_url: ""
---

# Wattlog

> First-person case study — Ivo's voice. Built across 12 weeks. Reviewed by Ivo before publication.

## TL;DR

[two-paragraph summary]

---

## The brief

[prose]

## The constraint that mattered most

[prose]

## The reference move

[prose]

## Week-by-week

### Week 01 — The brief

[prose for this week]

### Week 02 — Wrote it down.

[prose for this week]
```

**Frontmatter fields:**

| Field | Type | Example | Notes |
|---|---|---|---|
| `participant` | string | `"Ivo"` | Display name. |
| `project` | string | `"Wattlog"` | Project name. |
| `status` | string | `"draft"` | `draft` \| `review` \| `final`. |
| `weeks_completed` | number | `2` | Auto-derivable from `### Week NN` count. Dashboard updates this on save. |
| `last_updated` | string | `"2026-05-13"` | ISO date. Dashboard updates this on save. |
| `hero_image` | string | `""` | Optional. Path relative to repo root. |
| `final_url` | string | `""` | Optional. Set when case study is published. |

**Editing rule:** when the dashboard updates a case study, it bumps `last_updated` to today and recounts `weeks_completed` from the headings. Both happen automatically on save.

### Week checklist derivation

For the Case Studies week checklist (and the Week Detail Participants tab), the dashboard scans the case study body for `### Week NN` headings (regex: `/^###\s+Week\s+(\d{2})/gmi`) and treats each matched week as documented.

### Notes — `Journal/notes/session-NN.md`

No frontmatter. Free-form markdown. The dashboard reads and writes the whole file as one textarea. New file is created on first save.

### Figure tag — for images placed inside the public entry

When images are placed inside `content/journal/NN.md` via v2 image flow, the markdown uses this exact tag (matching what the site renderer expects):

```html
<figure class="journal-figure">
  <img src="../assets/weeks/NN/filename.jpg" alt="alt text">
  <figcaption>alt text</figcaption>
</figure>
```

The `src` path is relative to the rendered HTML in `dist/journal/NN.html`, hence `../assets/weeks/`. Image binaries are written to `dist/assets/weeks/NN/` at build time; the source-of-truth originals stay in `Journal/week-images/week-NN/` until the build copies them. (Note: confirm against `build.js` before v2 — this section is the contract `build.js` should already implement.)

---

## Workflow — how the dashboard fits with the chat

The chat does the writing. The dashboard does the file work.

A normal session looks like this:

1. **Session ends.** You take rough notes during or right after.
2. **Notes into chat.** You paste the raw notes into the main Claude chat. The chat uses the `journal-entry`, `journal-voice`, and `audit-copy` skills to draft a synthesis in the right voice.
3. **Iterate in chat.** You push back on the draft. Chat revises. This is where voice work happens. The dashboard doesn't get involved.
4. **Finished draft → dashboard.** When the synthesis is good, you paste it into the dashboard's Write Entry view for that week. The dashboard is the normal save path: every save lands in the activity log and goes through the conflict-check pipeline. Chat can write files too via bash — but that's a fallback for when the dashboard isn't open, not the default flow.
5. **Images in dashboard.** Drag images into the week's Images tab, position them between paragraphs, save. The dashboard writes the binaries and updates the markdown with figure tags.
6. **Session notes saved.** Drop your raw notes into the dashboard's Notes tab for the week so they're alongside the synthesis for later reference.
7. **Save changes.** One button. Confirmation modal lists files and sizes. Click Save.
8. **Push manually.** Modal shows the git command. Copy, paste into terminal, push.

For light edits to existing material — a typo, a swap of a quote, a re-ordering of paragraphs — the dashboard is enough on its own. You don't need to round-trip through chat.

For structural changes — rewriting a synthesis from scratch, restructuring a case study — go back to chat. Voice work belongs there.

---

## v1 — get editing and saving working

Scope for the first usable release. Everything else stays out.

### Features

- Sidebar with three views: **Session Notes**, **Case Studies**, **Entries**. Status pill showing folder-connected state. Activity log drawer pinned to the bottom, default open.
- **Session Notes** view: 12-week grid. Each card shows week number, title, date, status (published / upcoming). Click a published week to open Week Detail. Click an upcoming week to open Write Entry.
- **Week Detail** (read + light edit):
  - Tabs: **Synthesis**, **Public Entry**, **Notes**, **Participants**, **Images**.
  - Each tab gets a one-line tooltip on hover, surfacing what it is without the user opening it:
    - **Synthesis** → *Internal writeup of the session.*
    - **Public Entry** → *The journal entry that appears on the site.*
    - **Notes** → *Raw notes from the room. Reference only.*
    - **Participants** → *How each participant showed up this week.*
    - **Images** → *Images for the public entry, placed between paragraphs.*
  - **Synthesis** tab: rendered markdown of `Journal/week-NN-synthesis.md`, with an Edit toggle that swaps to a textarea. Save button writes back.
  - **Public Entry** tab: same shape for `content/journal/NN.md`. Quote and attribution editable as separate fields; body in a textarea.
  - **Notes** tab: free-form textarea for the week's raw session notes. Saves to `Journal/notes/session-NN.md`.
  - **Participants** tab: list of all 5 participants. For each, shows the section of their case study tagged with this week (if any), with an Edit button that opens that participant's case study in Case Studies view scrolled to the week.
  - **Images** tab: see Images flow below.
- **Write Entry** (for upcoming weeks):
  - Top: raw session notes textarea (saves to `Journal/notes/session-NN.md`).
  - Middle: drop zone for images and HTML files.
  - Bottom: synthesis editor textarea. Paste finished draft from chat. Save writes to `Journal/week-NN-synthesis.md` and prompts to also write the public entry.
- **Case Studies** view:
  - Five participant cards. Click to expand.
  - Tabs per participant: **Content**, **Week checklist** (12 weeks, checkbox derived from `### Week N` sections present), **Images**, **Notes**.
  - Content tab: full case study rendered as markdown, edit toggle swaps to textarea.
- **Entries** view:
  - Flat reverse-chronological log of everything that has been written. Filter by type (synthesis / public entry / case study / notes).
  - Click any entry to open it for review or edit.
- **Save flow**:
  - Every save runs through one button per dirty buffer. Pre-save modal lists the files and sizes. Confirm writes via `/api/write-file`.
  - Post-save modal shows the git command to copy. You run `git push` in terminal.
- **Conflict detection**:
  - Before any write, the dashboard re-reads the file via `/api/read-file` and compares against the version it loaded. If they differ, modal: overwrite / reload from disk / cancel.
- **Activity log**:
  - Bottom drawer, default open. Every read, write, error, and warning logged with timestamp. Persists last 200 lines in localStorage.

### Save flow — state machine

Each editable buffer (synthesis textarea, public entry body, frontmatter input, notes, case study) tracks its own state. Save button per buffer.

States:

| State | Button label | Button disabled? | What user sees |
|---|---|---|---|
| `clean` | `Save` | yes | No dirty indicator. |
| `dirty` | `Save` | no | "•" dot next to tab title. |
| `confirming` | `Save` | yes | Save modal is open with file list. |
| `writing` | `Saving…` | yes | Spinner on the button. |
| `saved` | `Saved ✓` | yes | 1.5s, then back to `clean`. |
| `failed` | `Save` | no | Toast + activity log line with the error. State stays `dirty`. |
| `conflicting` | `Save` | yes | Conflict modal open. Resolution moves to `writing` (overwrite) or `clean` (reload from disk) or stays `dirty` (cancel). |

Transitions: `clean` → `dirty` on input. `dirty` → `confirming` on Save click. `confirming` → `writing` on Save confirm. `writing` → `saved` on 2xx, `failed` on non-2xx, `conflicting` if the conflict-check found drift.

### Error handling — dev server down

First fetch fails with `connection refused` or `Failed to fetch`. The dashboard treats this as a known state:

- Sidebar status pill switches to **● Dev server offline** (red).
- Every view shows a centred placeholder: *"Dev server not reachable at localhost:3000. Run `npm run dev` in your terminal, then click Retry."* with a Retry button.
- Activity log gets an error line on first detection and on each Retry.
- All save actions short-circuit and toast "Dev server offline" instead of attempting to write.

The dashboard checks `/api/status` (already exists) on load and on Retry. If it ever returns non-OK, the offline state activates.

### Empty states

| Where | When | What it shows |
|---|---|---|
| Sessions grid | First load, before any reads succeed | 12 skeleton cards. Activity log shows reads happening. |
| Sessions grid | Read complete, no entries written yet | Same grid, every card shows "Upcoming" with date. Top of view: *"No syntheses written yet. Click any week to start."* |
| Week Detail / Synthesis tab | File doesn't exist | Empty textarea in edit mode by default, with placeholder: *"Paste the synthesis draft from chat, then Save."* |
| Week Detail / Public Entry tab | File doesn't exist | Same shape as Synthesis. Frontmatter inputs prefilled from `weeks.json` (num, title, phase, date). |
| Week Detail / Notes tab | File doesn't exist | Empty textarea. Placeholder: *"Raw notes for this session. Saved to Journal/notes/session-NN.md."* |
| Week Detail / Participants tab | No participant has a `### Week N` section | List of 5 participant names, each with: *"No section for week N yet. Add one from this participant's case study."* |
| Week Detail / Images tab | No images for this week | Empty drop zone. Placeholder: *"Drag images here. They save to Journal/week-images/week-NN/."* |
| Case Studies | Participant case study file missing | Card shows participant name + project + "Case study not started." Click expands to a single Create button. |
| Entries | No files written yet at all | "Nothing's been written yet. Start from Session Notes." |

### Sync trigger

Manual only in v1. The Sync button in the sidebar re-reads every file the dashboard knows about. No file watcher, no auto-refresh on window focus. Reasoning: file watchers add infrastructure; auto-refresh-on-focus is surprising when the user is mid-edit. Manual is honest and predictable.

In v2 we may add "Refresh on focus if no unsaved changes" once the workflow is proven.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘S` / `Ctrl+S` | Save the current buffer. Opens the save modal. |
| `⌘K` / `Ctrl+K` | Sync from files. |
| `Esc` | Close any modal. If a textarea is focused, blurs it first. |
| `⌘1` / `Ctrl+1` | Sessions view. |
| `⌘2` / `Ctrl+2` | Case Studies view. |
| `⌘3` / `Ctrl+3` | Entries view. |
| `[` | Previous week (when in Week Detail). |
| `]` | Next week (when in Week Detail). |
| `⌘E` / `Ctrl+E` | Toggle edit/preview on the focused tab (Synthesis, Public Entry, Notes). |
| `⌘L` / `Ctrl+L` | Toggle activity log open/closed. |

Shortcuts work whenever the dashboard tab has focus. `⌘S` is captured even when a textarea is focused — preventing the browser's default Save dialog is part of the contract.

### Unsaved changes guard

If the user navigates away from a buffer with `state === 'dirty'`:

- **Tab change within the dashboard** (e.g. Synthesis tab → Public Entry tab): no prompt. The dirty buffer is kept in memory; the dot indicator stays on the tab. Returning brings the unsaved content back.
- **View change** (e.g. Session Notes → Case Studies): inline confirm at the top of the destination view: *"Week N has unsaved changes. Discard? / Go back."*
- **Window close / page reload**: `beforeunload` handler fires if any buffer is dirty. Browser shows its native "Leave site?" dialog.
- **Sync clicked with dirty buffers**: modal: *"You have unsaved changes in N file(s). Syncing will overwrite them with disk versions. Continue?"*

### Entries view — ordering

The Entries view is a flat reverse-chronological list. Ordering rule: **by file mtime, newest first**, regardless of week number or type. This makes "what did I touch most recently" the answer to the default view.

Type filter chips at the top: All / Synthesis / Public Entry / Case Study / Notes. Selected filter persists in localStorage.

### Out of scope for v1

Image placement UI inside the entry (see v2). Per-participant images (see v2). The week-12 workshop story flow (see v3). Auto-derived status beyond what the Sessions grid shows. Multi-user. Real-time file watching. Search across files (see open questions).

---

## v2 — image flow and richer overview

Once v1 is solid.

### Features

- **Image staging in the entry**:
  - In the week's Images tab, drop images into a tray. Each thumbnail has an "Insert after paragraph N" picker.
  - Live preview of the entry with images placed.
  - Save writes images to `Journal/week-images/week-NN/` and updates the entry markdown with `<figure>` tags.
- **Per-participant images**:
  - Each participant has an Images tab in Case Studies view.
  - Drop, name, save to `Journal/participants/<pid>/images/`.
- **Status dashboard**:
  - On Session Notes view, each week card shows derived status: synthesis written / public entry written / N images / N participants documented.
  - Quick filters: "weeks without public entry", "weeks without images", etc.
- **Per-participant progress**:
  - Case Studies grid view. Each participant card shows X of 12 weeks documented, with a sparkline of which weeks.
- **Image compression**:
  - Optional on upload. Max 1600px wide, JPEG quality 80%. Toggle in settings.

---

## v3 — workshop close-out (week 12 and after)

The final two weeks of the workshop produce different artifacts than the weekly cadence. The dashboard should support them when we get there.

### Workshop story

One long-form piece written after session 12 about what the whole cohort built, learned, and got wrong. Sits alongside the per-week journal but at a different scope. Uses the `workshop-story` skill in chat.

- New view in the sidebar: **Workshop Story**.
- Single editable surface for `Journal/workshop-story.md`.
- Has its own image tray, gets its own assets folder.
- Saves through the same pipeline as everything else.

### Final case studies

After week 12, each participant gets a final case study assembled from their twelve weekly sections. The `case-study` skill handles drafting in chat. The dashboard provides the editing surface.

- Each participant card in Case Studies grows a **Final** tab.
- Final tab edits `Journal/participants/<pid>/case-study-final.md`.
- Side-by-side preview against the per-week case study so you can see what was lifted.

### Publication state

Each long-form piece gets a published/unpublished status visible from the top-level grid so the close-out doesn't drift.

---

## Open questions

These need answers before or during the build. None of them block starting.

1. **Where do raw session notes live, exactly?** Proposing `Journal/notes/session-NN.md`. Could also be inside `Journal/intake/` if that fits the existing convention better.
2. **Public entry frontmatter shape.** The existing entries have `quote:` and `quoteAttribution:` fields. Are there others we need to surface as separate inputs (date, slug, hero image)?
3. **Auto-commit on save?** Right now `/api/git-commit` exists. Should the dashboard offer "save and commit" as one action, or keep them separate?
4. **Multiple browser tabs.** If the dashboard is open in two tabs and you edit different files in each, no conflict. If you edit the same file, the second save wins. Worth a localStorage lock?
5. **Backup before overwrite.** Should every write also drop the previous version into a `.dashboard-backup/` folder? Trades disk for safety.
6. **Search.** Not in v1/v2/v3 above. Worth adding? "Find every mention of Paula across all syntheses" is a real use case.

---

## What we're keeping from v1/v2 and what we're dropping

**Keeping:**
- Three primary views (Session Notes, Case Studies, Entries), plus Write Entry as a sub-view
- File-based source of truth — no localStorage for content
- Per-week tabs (synthesis, entry, participants, images)
- Confirmation modals before every save
- Activity log

**Dropping:**
- `askClaude` / Haiku-powered Suggest Angles and Generate Variations buttons. Voice work lives in the main Sonnet chat where the skills are. The dashboard is not the place to generate text from scratch.
- `sendPrompt` to a chat for publishing. The dashboard writes directly via the dev server.
- The Cowork artifact framing entirely. This is a localhost dev tool.

---

## How we ship v1

Rough order, not a calendar. Each step has a single-line acceptance criterion — when that's true, the step is done.

1. **Plumbing.** Add `/dashboard/` to `.gitignore`. Add `/api/read-file`, `/api/list-dir`, `/api/stat` endpoints to `dev-server.js`. Add a route that serves `./dashboard/` at `http://localhost:3000/dashboard`. Support `PORT` env var.
   - **Done when:** `curl http://localhost:3000/api/read-file?path=Journal/synthesis/week-01-synthesis.md` returns the file content as JSON, and `http://localhost:3000/dashboard` serves a placeholder `index.html`.

2. **Scaffold.** Create `dashboard/` with the module structure from the architecture section. Empty modules, working shell, sidebar with three nav items routing between blank views. Activity log drawer present and toggleable.
   - **Done when:** opening the dashboard shows the sidebar + empty main area + activity log. Clicking nav items swaps the main area. No JS errors.

3. **API wiring.** Build `api.js` with `readFile`, `writeFile`, `listDir`, `stat`. Activity log lines for every call. Verify against `Journal/synthesis/week-01-synthesis.md` round-trip.
   - **Done when:** a manual call from the browser console writes a test string into a throwaway file and reads it back.

4. **Sessions grid.** Read `Journal/weeks.json` and render 12 cards with derived status (published / upcoming). Click a published card opens read-only Week Detail with the synthesis rendered from disk.
   - **Done when:** the grid matches the actual state of disk (Weeks 1–3 published, 4–12 upcoming) and clicking Week 1 shows its synthesis text.

5. **Inline edit + save.** Synthesis tab gets an Edit toggle, textarea, Save flow with the save modal. Conflict check runs before write.
   - **Done when:** editing Week 1's synthesis, saving, and re-syncing produces the edited version on disk. Conflicting edits (file changed externally) raise the conflict modal correctly.

6. **Public Entry tab.** Frontmatter inputs as separate fields. `gray-matter` round-trip on save preserves frontmatter exactly. Save flow as above.
   - **Done when:** editing a quote in Week 1's public entry, saving, and inspecting `content/journal/01.md` shows the new quote and untouched frontmatter elsewhere.

7. **Case Studies view.** Five participant cards, expandable. Content tab edits the whole case study as one textarea. `weeks_completed` and `last_updated` frontmatter auto-bumped on save.
   - **Done when:** editing Ivo's case study and saving produces a correctly updated frontmatter and the body changes.

8. **Entries view.** Reverse-chrono list by mtime, type filter chips, click to open.
   - **Done when:** after editing Week 1's synthesis and then Ivo's case study, the Entries view shows Ivo's case study at the top.

9. **Write Entry for upcoming weeks.** Notes textarea on top, synthesis textarea below. Save writes to `Journal/week-NN-synthesis.md` and `Journal/notes/session-NN.md`. Both files created if absent.
   - **Done when:** for Week 4, you can paste a draft synthesis and notes, save, and both files appear on disk with the right content.

10. **Notes tab in Week Detail.** Same shape as Synthesis tab, points at `Journal/notes/session-NN.md`.
    - **Done when:** the Week 4 Notes tab loads the file written in step 9 and supports edit-save round-trip.

11. **Polish.** Keyboard shortcuts wired (see the table above). Dirty-dot indicators on tabs. Unsaved-changes guards on view-switch and beforeunload. Empty states match the spec.
    - **Done when:** every keyboard shortcut in the table works, dirty buffers show their indicator, navigating away from a dirty buffer triggers the appropriate guard.

12. **Session 4.** Use the dashboard end-to-end on May 27. Capture every snag.
    - **Done when:** the session 4 synthesis and notes are saved through the dashboard, not chat. Any snag goes into a v1.1 punchlist.

The bar for v1 is: you can run a session on Wednesday and save its synthesis + notes through the dashboard without asking chat to do the file work for you.

---

## Where this brief lives

`Journal/dashboard/journal-dashboard-brief-v3.md`, alongside the v1 and v2 briefs. v3 is the active plan.
