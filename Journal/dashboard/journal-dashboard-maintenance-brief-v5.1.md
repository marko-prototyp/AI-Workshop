# Journal Dashboard — Maintenance Brief v5.1
*AI for Designers / Marko Kolić*  
*v5.1: 2026-05-28 — maintenance reference after first working build. Supersedes v5 draft.*

---

## What this brief is

A maintenance reference for anyone, Claude Code included, picking up the journal dashboard mid-flight.

This brief describes:

- what exists today,
- what contracts the dashboard must preserve,
- which parts are deprecated,
- what remains open,
- how to verify changes safely.

This is **not** a build-from-scratch brief. The dashboard has already been built and used. v4.2 was the build plan. v5.1 is the active operational reference.

Read older briefs only for historical context.

---

## Current state — stable summary

The dashboard runs at:

```txt
http://localhost:3000/dashboard
```

It is served by `dev-server.js` from the gitignored `dashboard/` folder. It reads and writes journal files through local dev-server API endpoints. The dashboard manages week syntheses, raw notes, public entries, participant case studies, participant notes, and week images.

The dashboard uses plain HTML, CSS, and vanilla JavaScript modules. It has no framework, no bundler, no TypeScript, and no client-side package layer.

The source of truth is the repo on disk. There is no database, no remote CMS, and no hidden localStorage copy of journal content.

---

## Current state — volatile implementation notes

**Last verified:** 2026-05-28

The dashboard currently includes:

- Sessions view
- Week Detail view
- deprecated Write Entry view
- Case Studies view
- Entries view
- hash-based conflict detection
- per-buffer save buttons
- save confirmation modal
- conflict modal
- activity log drawer
- offline state with Retry
- partial image flow
- manual git workflow

The sidebar footer currently reads **Dashboard v1.0**. Treat that as a product label, not a completion claim. The remaining v1.0 completion items are listed in the punchlist.

The **Write Entry** route still exists in the codebase, but it is deprecated and scheduled for removal. Do not extend it. Do not add new behavior to it. Only touch it to remove it or route around it.

The image flow is implemented, but not yet validated end-to-end.

---

## The vision

**The chat does the writing. The dashboard does the file work.**

The dashboard is a local facilitator's workbench for the AI for Designers journal. It exists to save, edit, inspect, and organise the files already maintained on disk:

- week syntheses,
- public journal entries,
- raw session notes,
- participant case studies,
- participant notes,
- week images.

It is **not** a writing assistant. Voice work happens in the main Claude chat, where the journal-voice, journal-entry, audit-copy, workshop-story, and case-study skills live.

The dashboard is where finished drafts land, where light edits happen, where files are checked, and where changes are saved safely.

---

## Setup and run

From the repo root:

```bash
npm install          # one-time
npm run dev          # runs build.js, then dev-server.js
```

Open:

```txt
http://localhost:3000/dashboard
```

If port `3000` is taken:

```bash
PORT=3001 npm run dev
```

`dev-server.js` reads `process.env.PORT` with a fallback to `3000`.

---

## Maintenance preflight

Before changing code:

1. Run `npm run dev`.
2. Open `/dashboard`.
3. Confirm `/api/status` reports online.
4. Open Sessions.
5. Open a known week, preferably Week 04.
6. Save a harmless edit to a notes file or a throwaway test file.
7. Reload the browser and confirm the saved content persists.
8. Check the browser console for errors.
9. Run `git status --short` before and after changes.

Do not start refactoring until the existing dashboard boots and the current file-save path works.

---

## Smoke test

Use this after any maintenance change:

1. Load `/dashboard`.
2. Open Sessions.
3. Open Week Detail.
4. Edit Notes.
5. Save.
6. Reload the page.
7. Confirm the saved text persists.
8. Edit the same file outside the dashboard.
9. Try saving the stale dashboard draft.
10. Confirm the conflict modal appears.
11. Open Entries.
12. Confirm the edited file appears near the top.
13. Run `git status --short` and confirm only expected files changed.

For image-related work, also run the image smoke test in the Image Flow section.

---

## v1.0 completion bar

Dashboard v1.0 is complete when:

- every week opens into tabbed Week Detail,
- no separate Write Entry route remains,
- Synthesis saves safely,
- Notes saves safely,
- Public Entry saves safely,
- Case Studies save safely,
- dirty drafts cannot be lost silently on reload or top-level view switch,
- manual Sync works,
- image flow has been validated end-to-end at least once,
- Entries reflects recent file changes,
- no deprecated route or module is extended by current code,
- the dashboard remains local, direct, file-based, and framework-free.

---

## Non-negotiable constraints

### Build constraints

- Plain HTML, CSS, vanilla JS.
- Plain ES modules.
- No React.
- No bundler.
- No TypeScript.
- No client framework.
- No public-site rebuild.
- No dashboard files copied into `dist/`.

### Product constraints

- No AI text generation inside the dashboard.
- No `askClaude`.
- No `sendPrompt`.
- No model calls.
- No suggestion buttons.
- No auto-push.
- No public hosting.
- No multi-user support.
- No realtime file watcher.
- No dashboard content stored in localStorage, except UI state and activity log.

### Maintenance constraint

When a feature is marked deprecated, do not extend it. Either remove it or leave it untouched until removal.

This currently applies to `views/write-entry.js`.

### Security constraint

The dev server is a **localhost-only personal dev tool**. It is path-checked, but not hardened for hostile input.

Do not bind it to a public interface. Do not expose it via tunnel.

---

## Where it lives

`dashboard/` sits at the AI for Designers repo root and is gitignored.

```txt
AI for designers/
  Claude/                  gitignored (Claude config)
  Journal/                 tracked (journal content lives here)
  content/                 tracked (public site content)
  src/                     tracked (public site source)
  dist/                    gitignored (public site build)
  dashboard/               gitignored (this app)
  dev-server.js            tracked (Node server + API)
  build.js                 tracked (public site build)
  package.json             tracked
  .gitignore               includes /dashboard/
```

`dev-server.js` serves `./dashboard/` directly at `/dashboard`. No dashboard build step. Edit a dashboard file, refresh the browser, see the change.

If the dashboard is ever shared or open-sourced, the graduation path is separate:

1. Move `dashboard/` to a tracked location, for example `src/dashboard/`.
2. Remove the gitignore line.
3. Decide whether it remains a dev-only tool or becomes part of the public project.

---

## Canonical file paths

All path construction goes through `dashboard/util/paths.js`. No hard-coded path strings in views or components.

| Asset type | Canonical path |
|---|---|
| Week metadata | `Journal/weeks.json` |
| Synthesis | `Journal/synthesis/week-NN-synthesis.md` |
| Public entry | `content/journal/NN.md` |
| Session notes | `Journal/notes/session-NN.md` |
| Participant case study | `Journal/participants/<pid>/case-study.md` |
| Participant notes | `Journal/participants/<pid>/notes.md` |
| Week images, source folder | `Journal/week-images/NN/` |
| Week image, source file | `Journal/week-images/NN/<filename>` |
| Week image, dashboard URL | `/week-images/NN/<filename>` |
| Week image, public entry `<img src>` | `../assets/weeks/NN/<filename>` |
| Participant images | `Journal/participants/<pid>/images/` |
| Workshop story | `Journal/workshop-story.md` future |
| Final case study | `Journal/participants/<pid>/case-study-final.md` future |

`NN` is always zero-padded to two digits: `01`, `02`, `03`.

### Helper surface

```js
paths.weekNum(4)                // "04"
paths.weeksJson()               // "Journal/weeks.json"
paths.synthesis(4)              // "Journal/synthesis/week-04-synthesis.md"
paths.publicEntry(4)            // "content/journal/04.md"
paths.sessionNotes(4)           // "Journal/notes/session-04.md"
paths.caseStudy("ivo")          // "Journal/participants/ivo/case-study.md"
paths.caseStudyNotes("ivo")     // "Journal/participants/ivo/notes.md"
paths.weekImages(4)             // "Journal/week-images/04"
paths.weekImageFile(4, "x.jpg") // "Journal/week-images/04/x.jpg"
paths.weekImageUrl(4, "x.jpg")  // "/week-images/04/x.jpg"
paths.weekImageSrc(4, "x.jpg")  // "../assets/weeks/04/x.jpg"
```

If a path changes, change it in `util/paths.js` and nowhere else.

### Note on the synthesis path move

Earlier build briefs specified:

```txt
Journal/week-NN-synthesis.md
```

The current implementation uses:

```txt
Journal/synthesis/week-NN-synthesis.md
```

This is intentional and should be kept. It is parallel to `Journal/notes/` and keeps internal weekly files organized. Weeks 01–04 are already at the new location.

If older syntheses surface in archived branches, move them into `Journal/synthesis/` before they confuse anyone.

---

## Server-side path safety

Every file API endpoint treats incoming paths as repo-relative.

The dev server rejects:

- absolute paths,
- paths that resolve outside the repo root,
- empty paths,
- paths containing null bytes.

Path checking uses `path.resolve` and compares against the resolved repo root.

Symlink-hardening with `fs.realpath()` on root and target is optional and not currently in place. Tighten this only if the dashboard stops being a private localhost-only tool.

---

## Dev-server API contracts

All endpoints return JSON. Failures also return JSON.

The dashboard talks to the server through `fetch()` wrappers in `dashboard/api.js`.

### Shared error shape

```json
{ "ok": false, "error": "Human-readable error message" }
```

### `GET /api/status`

Used on dashboard boot and on Retry from the offline state.

Success:

```json
{ "ok": true, "root": "/absolute/path/to/repo", "port": 3000 }
```

### `GET /api/read-file?path=...`

Reads a repo-relative text file.

Success, file exists:

```json
{
  "ok": true,
  "path": "Journal/synthesis/week-04-synthesis.md",
  "exists": true,
  "content": "# AI for Designers — Week 04\n...",
  "hash": "sha256-...",
  "mtime": "2026-05-27T13:42:00.000Z",
  "size": 12840
}
```

Success, file missing:

```json
{
  "ok": true,
  "path": "Journal/synthesis/week-04-synthesis.md",
  "exists": false,
  "content": "",
  "hash": "",
  "mtime": null,
  "size": 0
}
```

Rules:

- Missing file is not an error.
- Binary files are out of scope for this endpoint.
- Use `/week-images/...` static routes for image preview.
- `hash` is SHA-256 of file content.
- `hash` is used for conflict detection.

### `GET /api/list-dir?path=...`

Lists a repo-relative directory.

```json
{
  "ok": true,
  "path": "Journal/notes",
  "exists": true,
  "entries": [
    {
      "name": "session-04.md",
      "path": "Journal/notes/session-04.md",
      "type": "file",
      "mtime": "2026-05-27T13:42:00.000Z",
      "size": 2048
    }
  ]
}
```

Missing directory:

```json
{ "ok": true, "path": "Journal/notes", "exists": false, "entries": [] }
```

### `GET /api/stat?path=...`

Returns metadata for a repo-relative file or directory.

```json
{
  "ok": true,
  "path": "Journal/synthesis/week-04-synthesis.md",
  "exists": true,
  "type": "file",
  "mtime": "2026-05-27T13:42:00.000Z",
  "size": 12840
}
```

Missing path:

```json
{ "ok": true, "path": "...", "exists": false, "type": null, "mtime": null, "size": 0 }
```

Used by the Sessions grid to derive `synthesised` and `hasNotes` without reading file bodies.

### `POST /api/write-file`

Writes a text file.

Request:

```json
{
  "filePath": "Journal/synthesis/week-04-synthesis.md",
  "content": "# AI for Designers — Week 04\n..."
}
```

Success:

```json
{
  "ok": true,
  "path": "Journal/synthesis/week-04-synthesis.md",
  "hash": "sha256-...",
  "mtime": "2026-05-27T13:45:00.000Z",
  "size": 12912
}
```

Rules:

- Creates parent directories if missing.
- Writes UTF-8 text.
- Does not commit.
- Does not push.
- Does not perform conflict detection itself.
- The client performs the preflight read/hash check before calling this.

### `POST /api/write-image`

Writes a binary image from a data URL.

Request:

```json
{ "filePath": "Journal/week-images/04/sketch.jpg", "dataUrl": "data:image/jpeg;base64,..." }
```

Success:

```json
{ "ok": true, "path": "Journal/week-images/04/sketch.jpg", "size": 84210 }
```

Used by the Images tab in Week Detail.

### `POST /api/git-commit`

Exists. Not used by the dashboard.

Manual git in terminal remains the default.

### `GET /week-images/NN/<filename>`

Static route.

Serves `Journal/week-images/NN/<filename>` directly with the right MIME type so the dashboard can preview thumbnails via `<img src>`.

Read-only from the client's perspective. Writes go through `/api/write-image`.

### `GET /dashboard`, `GET /dashboard/*`

Static route serving files from `./dashboard/`.

`/dashboard` and `/dashboard/` both return `index.html`. Sub-paths return the corresponding file.

---

## Client module structure

```txt
dashboard/
  index.html              shell — sidebar, view container, activity log, modal root
  dashboard.css           styles
  dashboard.js            boot, routing, top-level render, nav, offline state
  api.js                  fetch wrappers for /api/*
  state.js                state object, buffer factories, getBuffer/setBuffer
  activity-log.js         200-line log with localStorage persistence, toggle
  views/
    sessions.js           12-week grid, status badges, click routes to Week Detail
    week-detail.js        tabbed Synthesis | Notes | Public Entry | Images
    write-entry.js        DEPRECATED — remove in Punchlist #1
    case-studies.js       five participant overview cards, detail editor
    entries.js            flat reverse-chronological list with type filters
  components/
    save-modal.js         Save confirmation modal
    conflict-modal.js     File changed on disk modal
    markdown.js           minimal renderer, basic fallback
  util/
    paths.js              all repo-relative path construction
    frontmatter.js        parse / serialize with canonical field order and unknown pass-through
    hash.js               maybe unused; see punchlist cleanup
    esc.js                HTML escaping
    dates.js              date formatting
```

### Module responsibilities

| Module | Responsibility |
|---|---|
| `dashboard.js` | Boot sequence, route changes, top-level render, offline path. Owns `setState`. |
| `api.js` | Fetch wrappers. No DOM work. Returns `{ ok, ... }` from the dev server unchanged. |
| `state.js` | In-memory state, buffer factories, `getBuffer`, `setBuffer`. |
| `activity-log.js` | Append, render, and persist last 200 log lines. localStorage-backed. |
| `views/sessions.js` | 12-week grid from `weeks.json` with derived statuses. Routes weeks to Week Detail. |
| `views/week-detail.js` | Tabbed Week Detail with Synthesis, Notes, Public Entry, Images. Per-tab buffers and save buttons. Image flow. |
| `views/write-entry.js` | Deprecated. Scheduled for deletion. Do not extend. |
| `views/case-studies.js` | Participant overview grid and detail editor. Frontmatter editing. |
| `views/entries.js` | Reverse-chrono list, type filter chips. |
| `components/save-modal.js` | Returns a Promise resolving to confirmed/cancelled. |
| `components/conflict-modal.js` | Returns a Promise resolving to `overwrite`, `reload`, or `cancel`. |
| `util/paths.js` | All path helpers. |
| `util/frontmatter.js` | Frontmatter parse and serialize helpers. |
| `util/esc.js` | HTML escape. |
| `util/dates.js` | Date formatting helpers. |

Do not collapse this into one giant HTML file.

---

## State model

The dashboard tracks each editable file as a buffer. All buffer factories live in `state.js`.

### Text buffer

Used for synthesis and notes.

```js
{
  id: "week-04-synthesis",
  type: "synthesis",
  path: "Journal/synthesis/week-04-synthesis.md",

  loadedContent: "",
  draftContent: "",

  loadedHash: "",
  loadedMtime: null,
  loadedSize: 0,
  existsOnDisk: false,

  status: "clean",
  lastError: null,
  lastSavedAt: null,
}
```

### Public entry buffer

Edited as fields but saved as one markdown file.

```js
{
  id: "week-04-public-entry",
  type: "public-entry",
  path: "content/journal/04.md",

  loadedRaw: "",
  draftRaw: "",

  frontmatter: {
    num: "04",
    title: "",
    phase: "",
    date: "",
    participants: 0,
    quote: "",
    quoteAttribution: "",
  },

  body: "",
  unknown: {},

  loadedHash: "",
  loadedMtime: null,
  loadedSize: 0,
  existsOnDisk: false,

  status: "clean",
  lastError: null,
  lastSavedAt: null,
}
```

### Case study buffer

Same shape as public entry, different frontmatter keys.

```js
{
  id: "case-study-ivo",
  type: "case-study",
  path: "Journal/participants/ivo/case-study.md",

  loadedRaw: "",
  draftRaw: "",

  frontmatter: {
    participant: "Ivo",
    project: "Wattlog",
    status: "draft",
    weeks_completed: 0,
    last_updated: "",
    hero_image: "",
    final_url: "",
  },

  body: "",
  unknown: {},

  loadedHash: "",
  loadedMtime: null,
  loadedSize: 0,
  existsOnDisk: false,

  status: "clean",
  lastError: null,
  lastSavedAt: null,
}
```

### Save states

| State | Button label | Disabled? | UI |
|---|---|---:|---|
| `clean` | `Save` | yes | No dirty indicator. |
| `dirty` | `Save` | no | Dirty dot visible next to section/tab title. |
| `confirming` | `Save` | yes | Save modal open. |
| `checking` | `Checking…` | yes | Preflight read for conflict detection. |
| `conflicting` | `Save` | yes | Conflict modal open. |
| `writing` | `Saving…` | yes | Spinner / pending state. |
| `saved` | `Saved ✓` | yes | Shows for about 1.5s, then returns to `clean`. |
| `failed` | `Save` | no | Toast + activity-log error. State stays `dirty`. |

### Transitions

```txt
clean        → dirty           on user input
dirty        → confirming      on Save click
confirming   → checking        on Save modal confirm
checking     → conflicting     if disk hash differs from loaded hash
checking     → writing         if no conflict
conflicting  → writing         on Overwrite
conflicting  → clean           on Reload from disk
conflicting  → dirty           on Cancel
writing      → saved           on 2xx
writing      → failed          on non-2xx
saved        → clean           after about 1.5s
```

---

## Save flow

**One Save button per buffer. No global Save All.**

Sequence:

1. User edits a buffer draft.
2. Buffer becomes `dirty`.
3. Dirty dot appears.
4. Save button enables.
5. User clicks Save.
6. Save modal opens and lists path plus file status.
7. User confirms.
8. Dashboard calls `/api/read-file` for that path.
9. Dashboard compares returned `hash` with the buffer's `loadedHash`.
10. If hashes match, dashboard calls `/api/write-file` with the draft content.
11. If hashes differ, dashboard opens the Conflict Modal.
12. On successful write, dashboard updates `loadedContent`, `loadedHash`, `loadedMtime`, `loadedSize`, `existsOnDisk`, and `lastSavedAt`.
13. Activity log records the write.

### Conflict modal actions

| Action | Result |
|---|---|
| Overwrite | Writes local draft over disk version. If backup-on-overwrite is implemented, backup happens first. |
| Reload from disk | Discards local draft, loads current disk version, sets status to `clean`. |
| Keep editing | Closes modal, keeps local draft, sets status to `dirty`. |

### Conflict detection

Uses **content hash comparison**, not mtime.

```txt
on load: loadedHash = response.hash
on save: currentHash = read-file response.hash
         if currentHash !== loadedHash → conflict modal
         else                          → write
```

mtime is surfaced in Entries ordering but is not the source of truth for conflicts.

### If Overwrite does not create a backup

If backup-on-overwrite is not implemented, the activity log must clearly say that the disk version was discarded and not backed up.

Example:

```txt
[13:44:50] overwrite Journal/notes/session-04.md — disk version discarded, no backup
```

---

## Activity log

Bottom drawer in the dashboard shell.

- Default open.
- Toggle button collapses/expands.
- Open state persists in `localStorage["dashboard-log-open"]`.
- Max 200 lines retained.
- Lines are stored in `localStorage["dashboard-log"]`.
- Every fetch, read, write, conflict, reload, and error logs a single line with `[HH:MM:SS]` timestamp.
- Does not store file content.

Example lines:

```txt
[13:42:01] read Journal/weeks.json ✓ (12 weeks)
[13:42:02] read Journal/synthesis/week-04-synthesis.md — missing
[13:43:19] dirty week-04-synthesis
[13:44:10] write Journal/synthesis/week-04-synthesis.md ✓ 12.9 KB
[13:44:50] conflict Journal/notes/session-04.md — disk changed since load
```

---

## Offline state

On boot, the dashboard calls `/api/status`.

If the fetch fails with `connection refused`, `Failed to fetch`, non-JSON, or `{ ok: false }`:

- Sidebar status pill switches to **Dev server offline**.
- Main area shows:

```txt
⚠ Dev server not reachable

Run npm run dev in your terminal, then click Retry.
```

- Retry button calls `/api/status` again.
- On success, dashboard exits offline state and reloads initial data.
- Activity log records first detection and each retry.
- Save actions short-circuit while offline.

---

## Week metadata source

Single source of truth:

```txt
Journal/weeks.json
```

Tracked in git. Hand-edited when titles or dates change.

```json
[
  { "n": 1,  "title": "Meet Claude. Pick your project.", "date": "2026-05-08", "phase": "Discover" },
  { "n": 2,  "title": "Write the brief. Argue with it.", "date": "2026-05-13", "phase": "Discover" },
  { "n": 12, "title": "Polish. Ship. Show.", "date": "2026-07-22", "phase": "Ship" }
]
```

Statuses are derived, not stored:

- `synthesised` ← `Journal/synthesis/week-NN-synthesis.md` exists with non-zero size
- `hasNotes` ← `Journal/notes/session-NN.md` exists with non-zero size
- `published` ← `content/journal/NN.md` exists with non-zero size
- `hasImages` ← `Journal/week-images/NN/` exists with at least one file

Current implementation derives `synthesised` and `hasNotes`. `published` and `hasImages` are punchlist items.

`build.js` could read `weeks.json` so the public site and dashboard agree on the canonical list. If `build.js` already does this, no change. If not, refactor when convenient. This is not urgent.

---

## Source files the dashboard manages

| File | Where | What | Status |
|---|---|---|---|
| `Journal/synthesis/week-NN-synthesis.md` | Internal | Facilitator synthesis after each session. | live |
| `Journal/notes/session-NN.md` | Internal | Raw notes from the room. | live |
| `content/journal/NN.md` | Public site | Journal entry shown on the site. | live |
| `Journal/participants/<pid>/case-study.md` | Internal | Long-form participant case study. | live |
| `Journal/participants/<pid>/notes.md` | Internal | Private participant notes. | live |
| `Journal/week-images/NN/*` | Internal | Week images for journal entries. | implemented, unvalidated |
| `Journal/workshop-story.md` | Internal | Whole-workshop story after week 12. | future |
| `Journal/participants/<pid>/case-study-final.md` | Internal | Final per-participant case study. | future |

Participants:

| ID | Participant | Project |
|---|---|---|
| `ivo` | Ivo | Wattlog |
| `ivan` | Ivan | Mockup Generator |
| `paula` | Paula | Classroom Behavior Tracker |
| `marin` | Marin | Naučimo Hrvatski |
| `marko` | Marko | AI for Designers meta |

---

## File format contracts

### Synthesis — `Journal/synthesis/week-NN-synthesis.md`

No frontmatter. Plain markdown. The dashboard reads and writes the whole file as a single string.

```markdown
# AI for Designers — Week 04
## Session title

**Session:** Week 4 of 12
**Date:** 27 May 2026
**Participants present:** 3 (Ivo, Marin, Paula) — Ivan absent again

---

## What happened

[prose…]
```

The dashboard does not enforce heading or divider structure. The textarea is the editor.

### Notes — `Journal/notes/session-NN.md`

No frontmatter. Free-form markdown. New file created on first save. Empty file is allowed.

### Public entry — `content/journal/NN.md`

Frontmatter is required and parsed by the site build.

```markdown
---
num: "04"
title: "Plan the whole thing."
phase: "Define"
date: "2026-05-27"
participants: 5
quote: "A useful line from the room."
quoteAttribution: "Participant, context"
---

[body markdown…]
```

| Field | Type | Notes |
|---|---|---|
| `num` | string | Zero-padded two digits. Must match filename. |
| `title` | string | Sentence case. |
| `phase` | string | One of: Discover, Define, Make, Ship. |
| `date` | string | ISO date, `YYYY-MM-DD`. |
| `participants` | number | Count present. Bare integer in YAML. |
| `quote` | string | Pull quote without attribution. |
| `quoteAttribution` | string | Free text. |

Canonical serialization order:

```txt
num
title
phase
date
participants
quote
quoteAttribution
```

Unknown frontmatter fields pass through unchanged.

The dashboard preserves **semantic values**, not formatting. Quotes are normalized to double-quoted strings. Numbers are bare. The parser handles `\"` escapes inside string values.

### Frontmatter regression checks

Before modifying `util/frontmatter.js` or Public Entry save behavior, verify:

- Existing public entry can be opened and saved without changing semantic values.
- Unknown fields survive round-trip.
- Quotes containing `"` survive round-trip.
- `participants` remains a number, not a string.
- Canonical field order is preserved.
- Body content after frontmatter is not trimmed unexpectedly.

### Case study — `Journal/participants/<pid>/case-study.md`

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

[summary]

---

## Week-by-week

### Week 01 — The brief

[prose]

### Week 02 — Wrote it down.

[prose]
```

| Field | Type | Notes |
|---|---|---|
| `participant` | string | Display name. |
| `project` | string | Project name. |
| `status` | string | `draft` / `review` / `final`. |
| `weeks_completed` | number | Auto-derived from `### Week NN` headings. |
| `last_updated` | string | Auto-updated on save to today's ISO date. |
| `hero_image` | string | Optional path. |
| `final_url` | string | Optional URL. |

Week checklist derivation:

```js
/^###\s+Week\s+(\d{2})/gmi
```

Each matched heading counts as a documented week.

### Figure tag — images inside public entries

```html
<figure class="journal-figure">
  <img src="../assets/weeks/NN/filename.jpg" alt="alt text">
  <figcaption>alt text</figcaption>
</figure>
```

`src` is relative from `dist/journal/NN.html`.

Images originate in:

```txt
Journal/week-images/NN/
```

`build.js` should copy them into:

```txt
dist/assets/weeks/NN/
```

Confirm against `build.js` if anything about this contract changes.

---

## Views — current behavior and target behavior

### Sessions

12-week grid. Each card shows:

- week number,
- phase,
- title,
- date,
- status badges.

Current badges:

- `Synthesis` if synthesis exists.
- `Notes` if notes exist.

Target badges:

- `Synthesis`
- `Notes`
- `Published`
- `N images`

Current click handling:

```txt
synthesis exists  → route to Week Detail, Synthesis tab active
synthesis missing → route to deprecated Write Entry view
```

Target click handling after Punchlist #1:

```txt
any week → route to Week Detail, Synthesis tab active
```

Statuses re-derive when the user navigates back to Sessions.

### Week Detail

Tabbed view with four tabs:

| Tab | Tooltip | What it does |
|---|---|---|
| Synthesis | Internal writeup of the session. | Edit/save `Journal/synthesis/week-NN-synthesis.md`. |
| Notes | Raw notes from the room. Reference only. | Edit/save `Journal/notes/session-NN.md`. |
| Public Entry | Public journal entry shown on the site. | Frontmatter inputs + body textarea for `content/journal/NN.md`. |
| Images | Images for this week's journal entries. | Drop zone + thumbnail tray. Insert figure tags into Public Entry body. |

Each tab owns its own buffer. Dirty dot per section. Save button per tab. Conflict detection per save.

The Synthesis and Notes tabs are plain textareas.

The Public Entry tab has one input per frontmatter field plus a body textarea.

The Images tab drops images, names them, and exposes an **Insert after paragraph N** picker that injects a `<figure>` tag into the Public Entry body through `pendingImageInsert` in `week-detail.js`.

`Cmd/Ctrl+S` is currently wired in Week Detail and triggers Save on the active tab's buffer.

### Write Entry — deprecated

Status: **deprecated. Remove in Punchlist #1.**

This view is documented for accuracy only.

Currently used when a week has no saved synthesis on disk. It has two side-by-side textareas:

- Raw session notes → `Journal/notes/session-NN.md`
- Synthesis → `Journal/synthesis/week-NN-synthesis.md`

Each has its own Save button, dirty dot, and save flow. After successful Synthesis save, the dashboard auto-routes to Week Detail.

Why it is going away:

- routing through two different views based on file state is confusing,
- Public Entry is unreachable until synthesis exists,
- Images are unreachable until synthesis exists,
- Public Entry feels gated behind a synthesis save,
- the `New session` label creates stale/cosmetic bugs,
- Week Detail with empty states is the simpler model.

Do not preserve this route. If the side-by-side layout is missed later, file it as a future split-view toggle inside Week Detail.

### Case Studies

Overview grid: five participant cards.

Each card shows:

- participant name,
- project,
- status,
- weeks documented.

Weeks documented is derived from `### Week NN` headings in the case-study file.

Click expands to a detail view with:

- frontmatter fields up top,
- body textarea below.

On save:

- `last_updated` is set to today's ISO date,
- `weeks_completed` is recounted from headings.

### Entries

Flat list, reverse-chronological by file mtime.

Filter chips:

```txt
All / Synthesis / Notes / Public Entry / Case Study
```

Selected filter persists in:

```js
localStorage["dashboard-entries-filter"]
```

Clicking an entry opens the appropriate view:

- Week Detail tab for week files,
- Case Study detail for participant files.

After Write Entry is removed, Entries should never route there.

---

## Image flow — implemented, not validated end-to-end

### What exists

- `Journal/week-images/NN/` is the canonical location for week image originals.
- `POST /api/write-image` writes binary images from a base64 data URL.
- `GET /week-images/NN/<filename>` serves images back for thumbnail previews.
- Week Detail's Images tab has a drop zone.
- Week Detail's Images tab has a thumbnail tray.
- Week Detail's Images tab has an **Insert after paragraph N** affordance.
- Figure tag insertion uses `pendingImageInsert` in `week-detail.js`.

### What is unverified

- Image upload has not been run end-to-end on a real week.
- Figure insertion into Public Entry needs a real save test.
- `build.js` copy step from `Journal/week-images/NN/` to `dist/assets/weeks/NN/` needs verification.
- Final rendered HTML in `dist/journal/NN.html` needs verification.
- Image compression is not implemented.

### Image smoke test

Use Week 03 or another real image-friendly week.

1. Open Week Detail.
2. Open Images tab.
3. Drop an image.
4. Confirm thumbnail appears.
5. Insert image after a chosen paragraph.
6. Open Public Entry tab.
7. Confirm figure tag appears in the body.
8. Save Public Entry.
9. Run `npm run build` or the build step used by `npm run dev`.
10. Confirm image was copied to `dist/assets/weeks/NN/`.
11. Open `dist/journal/NN.html`.
12. Confirm image renders with correct `src`, `alt`, and `figcaption`.

---

## Empty states

| Where | When | What appears |
|---|---|---|
| Sessions grid | `weeks.json` loading | 12 skeleton cards. |
| Sessions grid | No syntheses written | Cards render normally with no status badges. |
| Synthesis tab | File missing | Empty textarea with placeholder: `Paste the synthesis draft from chat, then Save.` |
| Notes tab | File missing | Empty textarea with placeholder: `Raw notes for this session. Saved to Journal/notes/session-NN.md.` |
| Public Entry tab | File missing | Frontmatter prefilled from `weeks.json`; empty body and quote. |
| Images tab | No images | Drop zone shown with placeholder text. |
| Case Studies | Case study file missing | Card renders with `weeks_completed: 0`. Detail view opens an empty editor. |
| Entries | No files written | Empty list. |
| Dashboard boot | Status check pending | Loading shell + activity log. |
| Dev server offline | `/api/status` fails | Offline placeholder with Retry button. |

---

## Manual git workflow

Saving writes files only. The dashboard does not commit or push.

Always start with:

```bash
git status --short
```

For a week-level change, review the actual changed files before adding them:

```bash
git status --short
git diff -- Journal/synthesis/week-04-synthesis.md Journal/notes/session-04.md content/journal/04.md
git add Journal/synthesis/week-04-synthesis.md Journal/notes/session-04.md content/journal/04.md
git commit -m "Add week 04 synthesis, notes, and entry"
git push
```

Only add files you intentionally changed.

`POST /api/git-commit` exists in `dev-server.js` but is not wired into the dashboard. Leave that decision open.

---

## Decisions made

These are locked. Do not re-litigate without a strong reason.

| Question | Decision |
|---|---|
| Where do raw session notes live? | `Journal/notes/session-NN.md` |
| Where do syntheses live? | `Journal/synthesis/week-NN-synthesis.md` |
| React or plain JS? | Plain ES modules. No React. |
| Global save or per-buffer save? | Per-buffer save. |
| Auto-commit on save? | No. Manual git workflow. |
| Multiple browser tabs? | No localStorage lock. Hash conflict detection is enough. |
| Backup before overwrite? | Not implemented. Optional improvement unless recovery requirements change. |
| Search across files? | Not built. Worth adding once Entries view sees real use. |
| Image insertion? | Implemented, unvalidated end-to-end. |
| Public-site rebuild? | No. Dashboard is separate from the public build. |
| Frontmatter parser? | Hand-rolled in `util/frontmatter.js`. No YAML library. |
| Markdown preview? | Minimal fallback. May upgrade later. |
| Routing for new weeks? | Always tabbed Week Detail. No separate Write Entry view. Punchlist #1 makes implementation match this decision. |

---

## Non-goals

Do not build:

- React dashboard.
- Next.js migration.
- Astro migration.
- Gatsby migration.
- Vite migration.
- Public CMS.
- Login or authentication.
- Remote sync.
- Multi-user editing.
- AI drafting inside the dashboard.
- Automatic voice rewriting.
- Model-powered suggestions.
- File watching.
- Browser File System Access API.
- Cowork artifact version.
- Public deployment.
- Auto-push.
- Public-site redesign.

---

## Things to verify before relying on them

These are known confidence gaps:

- Image build-copy path.
- Image final-render path in `dist/journal/NN.html`.
- Hand-rolled frontmatter round-trip.
- Unknown frontmatter field preservation.
- Quotes inside frontmatter strings.
- Case-study `weeks_completed` derivation.
- Entries routing after Write Entry removal.
- Markdown preview output.
- `util/hash.js` usage.

---

## Punchlist — what's still open

Ordered by impact. Pick from the top.

---

### 1. Unify routing — always use tabbed Week Detail, remove Write Entry

**Status:** highest priority.

**Symptom.** Clicking a week without a saved synthesis routes to Write Entry, a side-by-side notes-plus-synthesis layout with no Public Entry surface and no Images tab.

This makes Public Entry feel gated behind a synthesis save. It also causes stale UI issues such as `New session` labels when status has not re-derived before routing.

**Acceptance.**

- Every week opens into Week Detail.
- Four tabs are always available: Synthesis, Notes, Public Entry, Images.
- Each tab handles its own empty state.
- No Write Entry route remains.
- No auto-route after first synthesis save.
- No `New session` badge remains.
- Entries never routes to Write Entry.
- Keyboard shortcut code does not target Write Entry.

**Migration steps.**

1. In `views/sessions.js`, simplify `openWeek()` to always route to `week-detail` with `tab: "synthesis"`.
2. Confirm Week Detail initializes missing Synthesis, Notes, and Public Entry buffers.
3. Confirm missing Synthesis save creates `Journal/synthesis/week-NN-synthesis.md`.
4. Confirm missing Notes save creates `Journal/notes/session-NN.md`.
5. Confirm missing Public Entry save creates `content/journal/NN.md` with frontmatter prefilled from `weeks.json`.
6. Update Entries routing if it can point at Write Entry.
7. Remove the `write-entry` case from the router in `dashboard.js`.
8. Delete `views/write-entry.js`.
9. Remove Write Entry references from keyboard shortcut handling.
10. Update this brief after the code change lands.

**Do not preserve the side-by-side route.** If that layout is missed, add a future split-view toggle inside Week Detail.

---

### 2. Unsaved-changes guard

**Symptom.** No `beforeunload` handler. No prompt on top-level view switch when buffers are dirty. Refreshing the browser silently discards drafts.

**Acceptance.**

- `beforeunload` fires if any buffer is `dirty`.
- Browser shows native Leave Site dialog on reload/close with dirty buffers.
- Switching top-level views with dirty buffers shows an inline confirm: `Week NN has unsaved changes. Discard? / Go back.`
- Switching tabs inside Week Detail does not prompt.
- Dirty dots stay visible across Week Detail tab switches.
- Drafts stay in memory across Week Detail tab switches.

---

### 3. Manual Sync button

**Symptom.** No sidebar Sync button. Statuses re-derive only when navigating to Sessions.

**Acceptance.**

- Sidebar has a Sync button.
- Sync re-reads `weeks.json`.
- Sync re-derives week statuses.
- Sync reloads the open buffer from disk if it is clean.
- If any open buffer is dirty, Sync prompts before clobbering drafts.
- `Cmd/Ctrl+K` triggers Sync once keyboard shortcuts are implemented.

---

### 4. Test image flow end-to-end

**Symptom.** Image flow is implemented but unvalidated.

**Acceptance.**

- Add an image to a real week.
- Position it inside the Public Entry body via Images tab.
- Save Public Entry.
- Run the build.
- Confirm the figure renders correctly in `dist/journal/NN.html`.
- Confirm `src` points to `../assets/weeks/NN/<filename>`.
- Confirm `alt` and `figcaption` are correct.

**Likely follow-up.**

Confirm `build.js` copies:

```txt
Journal/week-images/NN/*
```

into:

```txt
dist/assets/weeks/NN/
```

If not, add that copy step.

---

### 5. Public entry and frontmatter regression checks

**Symptom.** Public Entry save relies on a hand-rolled frontmatter parser touching public-site build inputs.

**Acceptance.**

Create a small manual or automated regression check proving:

- known public entries round-trip semantically,
- unknown fields survive,
- quote escaping works,
- `participants` remains numeric,
- canonical field order is preserved,
- body content is preserved,
- missing Public Entry initializes from `weeks.json` correctly.

No new dependency required unless the hand-rolled parser proves unreliable.

---

### 6. `published` and `hasImages` status derivation

**Symptom.** Sessions cards show Synthesis and Notes badges, but not Public Entry or image status.

**Acceptance.**

Sessions cards add:

- `Published` when `content/journal/NN.md` exists with non-zero size.
- `N images` when `Journal/week-images/NN/` has files.

`api.listDir` already returns what image count needs.

---

### 7. Full keyboard shortcuts

**Symptom.** Only `Cmd/Ctrl+S` is wired in Week Detail.

**Important.** Implement after Write Entry removal so shortcuts target the final route structure.

**Acceptance.**

| Key | Action |
|---|---|
| `Cmd/Ctrl+S` | Save active buffer. |
| `Cmd/Ctrl+K` | Sync from files. |
| `Esc` | Close any open modal. If a textarea is focused, blur first. |
| `Cmd/Ctrl+1` | Sessions view. |
| `Cmd/Ctrl+2` | Case Studies view. |
| `Cmd/Ctrl+3` | Entries view. |
| `[` | Previous week in Week Detail. |
| `]` | Next week in Week Detail. |
| `Cmd/Ctrl+E` | Toggle edit/preview on the focused tab, if preview exists. |
| `Cmd/Ctrl+L` | Toggle activity log. |

Capture `Cmd/Ctrl+S` globally even when a textarea is focused. Prevent the browser's native Save dialog.

---

### 8. Markdown preview upgrade

**Symptom.** `components/markdown.js` is a minimal fallback. Public Entry and Case Study previews look raw.

**Acceptance.** Choose one:

Option A:

- Add `POST /api/render-markdown` to `dev-server.js`.
- Use the existing server-side `marked` dependency.
- Return HTML.
- Dashboard fetches rendered HTML when entering preview mode.

Option B:

- Hand-roll a small renderer covering headings, paragraphs, bold, italic, links, blockquotes, lists, and code blocks.

Rules:

- Do not import `marked` directly in the browser.
- Do not add a new client-side dependency.

---

### 9. Backup-on-overwrite

**Symptom.** Conflict modal's Overwrite path is destructive. No copy of the disk version is kept.

**Position.** Optional. Git history may be enough if the workflow is disciplined.

**Acceptance if implemented.**

- Before overwriting, copy the existing file to `.dashboard-backup/<original-path>.<timestamp>`.
- Create `.dashboard-backup/` if missing.
- Add `.dashboard-backup/` to `.gitignore`.
- Activity log records the backup line.
- Backup failure either blocks overwrite or is explicitly confirmed by the user.

If skipped, document that the dashboard relies on git history and conflict warnings rather than local backups.

---

### 10. Status pill behaviors beyond online/offline

**Symptom.** Pill toggles between checking, online, and offline. No states for saving or unsaved changes.

**Acceptance.** Decide one:

Option A:

- Add `saving` while any buffer is in `writing` state.
- Add `dirty` while any buffer is dirty.

Option B:

- Keep pill limited to server connectivity.
- Document that dirty/saving status is shown near the active buffer, not globally.

---

### 11. `util/hash.js` cleanup

**Symptom.** `util/hash.js` may be unused because conflict detection uses the server-returned hash from `/api/read-file`.

**Acceptance.** Either:

- wire client-side hash for double-checking, or
- delete the file and remove its imports.

Prefer deletion unless there is a clear use.

---

## How to make changes

When implementation choices conflict, prefer the option that keeps the dashboard:

1. **local** — runs on your machine, talks to localhost only.
2. **direct** — file → save → disk.
3. **file-based** — no database, no remote state, no hidden cache.
4. **understandable** — readable top-to-bottom for someone who knows plain ES modules.
5. **recoverable** — conflict detection is non-negotiable; destructive paths must be explicit.
6. **small** — fewer files, fewer dependencies, fewer concepts than seems necessary.

The dashboard should feel like a reliable workbench beside the journal, not a second product layered on top of it.

---

## Where this brief lives

Recommended path:

```txt
Journal/journal-dashboard-brief-v5.1.md
```

This is the active reference. It supersedes v5.

Earlier briefs, including v3, v4.2, and the React decision brief, are historical.
