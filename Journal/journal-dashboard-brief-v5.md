# Journal Dashboard — Maintenance Brief v5
*AI for Designers / Marko Kolić*
*v5: 2026-05-28 — describes the dashboard as built, not as planned. Supersedes v4.2 build brief.*

---

## What this brief is

A reference for anyone (Claude Code included) picking up the journal dashboard mid-flight. It describes what exists today, the contracts the dashboard must keep, and the punchlist of work still open.

This is **not** a build-from-scratch brief. The dashboard has been built and used. v4.2 was the build plan; v5 is the maintenance reference. Read v4.2 only if you need historical context.

---

## Current state — one paragraph

The dashboard runs at `http://localhost:3000/dashboard`, served by `dev-server.js` from the gitignored `dashboard/` folder. It reads and writes journal files (syntheses, notes, public entries, case studies, images) via dev-server API endpoints. It has five views (Sessions, Week Detail, Write Entry, Case Studies, Entries), hash-based conflict detection, an activity log drawer, an offline state with retry, and a partial image flow. Saves are confirmed through a modal, conflicts through a three-option modal. Git remains manual in the terminal. The sidebar footer reads "Dashboard v1.0" — that's a fair summary, with a handful of v1.0 polish items still open (full keyboard shortcuts, unsaved-changes guard on view-switch and reload, manual Sync button, backup-on-overwrite).

---

## The vision (unchanged)

**The chat does the writing. The dashboard does the file work.**

The dashboard is a local facilitator's workbench for the AI for Designers journal. It exists to save, edit, inspect, and organise the files already maintained on disk: week syntheses, public journal entries, raw session notes, participant case studies, and week images.

It is **not** a writing assistant. Voice work happens in the main Claude chat, where the journal-voice, journal-entry, audit-copy, workshop-story, and case-study skills live. The dashboard is where finished drafts land, where light edits happen, where files are checked, and where changes are saved safely.

The source of truth is the repo. No database. No remote CMS. No hidden localStorage copy of content. The dashboard reads from disk on demand and writes back to disk through the local dev server.

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

## Non-negotiable constraints

### Build constraints

- Plain HTML, CSS, vanilla JS.
- Plain ES modules.
- No React, no bundler, no TypeScript, no client framework.
- No public-site rebuild.
- No dashboard files copied into `dist/`.

### Product constraints

- No AI text generation inside the dashboard.
- No `askClaude`, `sendPrompt`, model calls, or suggestion buttons.
- No auto-push.
- No public hosting.
- No multi-user support.
- No realtime file watcher.
- No dashboard content stored in localStorage, except UI state and activity log.

### Security constraint

The dev server is a **localhost-only personal dev tool**. It is path-checked, but not hardened for hostile input. Do not bind it to a public interface. Do not expose it via tunnel.

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

1. Move `dashboard/` to a tracked location (e.g. `src/dashboard/`).
2. Remove the gitignore line.
3. Decide whether it remains a dev-only tool or becomes part of the public project.

---

## Canonical file paths

All path construction goes through `dashboard/util/paths.js`. No hard-coded path strings in views or components.

| Asset type | Canonical path |
|---|---|
| Week metadata | `Journal/weeks.json` |
| Synthesis | `Journal/synthesis/week-NN-synthesis.md` ← **moved from `Journal/` in v5** |
| Public entry | `content/journal/NN.md` |
| Session notes | `Journal/notes/session-NN.md` |
| Participant case study | `Journal/participants/<pid>/case-study.md` |
| Participant notes | `Journal/participants/<pid>/notes.md` |
| Week images (source) | `Journal/week-images/NN/` |
| Week image (single file) | `Journal/week-images/NN/<filename>` |
| Week image (dashboard URL) | `/week-images/NN/<filename>` (served by dev-server) |
| Week image (`<img src>` in public entry) | `../assets/weeks/NN/<filename>` (relative from `dist/journal/NN.html`) |
| Participant images | `Journal/participants/<pid>/images/` |
| Workshop story | `Journal/workshop-story.md` (future) |
| Final case study | `Journal/participants/<pid>/case-study-final.md` (future) |

`NN` is always zero-padded to two digits: `01`, `02`, `03`.

### Helper surface

```js
paths.weekNum(4)               // "04"
paths.weeksJson()              // "Journal/weeks.json"
paths.synthesis(4)             // "Journal/synthesis/week-04-synthesis.md"
paths.publicEntry(4)           // "content/journal/04.md"
paths.sessionNotes(4)          // "Journal/notes/session-04.md"
paths.caseStudy("ivo")         // "Journal/participants/ivo/case-study.md"
paths.caseStudyNotes("ivo")    // "Journal/participants/ivo/notes.md"
paths.weekImages(4)            // "Journal/week-images/04"
paths.weekImageFile(4, "x.jpg")// "Journal/week-images/04/x.jpg"
paths.weekImageUrl(4, "x.jpg") // "/week-images/04/x.jpg"
paths.weekImageSrc(4, "x.jpg") // "../assets/weeks/04/x.jpg"
```

If a path changes, change it in `util/paths.js` and nowhere else.

### Note on the synthesis path move

v4.2 specified `Journal/week-NN-synthesis.md`. The current implementation moved syntheses to `Journal/synthesis/week-NN-synthesis.md`, parallel to `Journal/notes/`. This is intentional and the better organisation — keep it. Weeks 01–04 are already at the new location. If older syntheses surface in archived branches, `mv` them into `Journal/synthesis/` before they confuse anyone.

---

## Server-side path safety

Every file API endpoint treats incoming paths as repo-relative. The dev server rejects:

- absolute paths
- paths that resolve outside the repo root
- empty paths
- paths containing null bytes

Path check uses `path.resolve` and compares against the resolved repo root. Symlink-hardening (`fs.realpath()` on root and target) is optional and not currently in place. This is a localhost-only personal tool; tighten if anything changes that assumption.

---

## Dev-server API contracts

All endpoints return JSON. Failures also return JSON. The dashboard talks to the server through `fetch()` wrappers in `dashboard/api.js`.

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

Success (file exists):

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

Success (file missing):

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

- Missing file is not an error.
- Binary files are out of scope for this endpoint (use `/week-images/...` static route).
- `hash` is SHA-256 of file content. Used for conflict detection.

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

Used by the Sessions grid to derive `synthesised` and `hasNotes` per week without reading file bodies.

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

- Creates parent directories if missing.
- Writes UTF-8 text.
- Does not commit. Does not push. Does not perform conflict detection itself — the client performs the preflight read/hash check before calling this.

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

Exists. Not used by the dashboard. Manual git in terminal remains the default.

### `GET /week-images/NN/<filename>`

Static route. Serves `Journal/week-images/NN/<filename>` directly with the right MIME type so the dashboard can preview thumbnails via `<img src>`. Read-only from the client's perspective; writes go through `/api/write-image`.

### `GET /dashboard`, `GET /dashboard/*`

Static route serving files from `./dashboard/`. `/dashboard` and `/dashboard/` both return `index.html`. Sub-paths return the corresponding file.

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
    sessions.js           12-week grid, status badges, click routes to Week Detail or Write Entry
    week-detail.js        tabbed (Synthesis | Notes | Public Entry | Images), edit-save flow
    write-entry.js        side-by-side notes + synthesis for weeks without saved synthesis
    case-studies.js       five participant overview cards, detail with frontmatter + body editing
    entries.js            flat reverse-chronological list with type filters
  components/
    save-modal.js         "Save file" confirmation modal
    conflict-modal.js     "File changed on disk" three-option modal
    markdown.js           minimal renderer (currently 5 lines, basic fallback)
  util/
    paths.js              all repo-relative path construction
    frontmatter.js        parse / serialize with canonical field order and unknown pass-through
    hash.js               SHA-256 helper for conflict detection (currently 5 lines, may be unused)
    esc.js                HTML escaping
    dates.js              date formatting (formatDate, formatDateTime, todayIso)
```

### Module responsibilities

| Module | Responsibility |
|---|---|
| `dashboard.js` | Boot sequence, route changes, top-level render. Owns `setState` and the offline path. |
| `api.js` | Fetch wrappers. No DOM work. Returns `{ ok, ... }` from the dev server unchanged. |
| `state.js` | In-memory state, buffer factories (`makeBuffer`, `makePublicEntryBuffer`, `makeCaseStudyBuffer`), `getBuffer` / `setBuffer`. |
| `activity-log.js` | Append/render/persist last 200 log lines. localStorage-backed. Toggle button. |
| `views/sessions.js` | 12-week grid from `weeks.json` with derived statuses. Click routes weeks based on whether synthesis exists. |
| `views/week-detail.js` | Tabbed Week Detail with Synthesis · Notes · Public Entry · Images. Per-tab buffers and save buttons. Image flow. |
| `views/write-entry.js` | Side-by-side notes + synthesis for upcoming weeks. After synthesis save, auto-routes to Week Detail. |
| `views/case-studies.js` | Overview grid (5 cards) + detail view (Content, Notes, Images placeholder). Frontmatter editing. |
| `views/entries.js` | Reverse-chrono list, type filter chips (All · Synthesis · Notes · Public Entry · Case Study). |
| `components/save-modal.js` | Returns a Promise resolving to confirmed/cancelled. |
| `components/conflict-modal.js` | Returns a Promise resolving to `'overwrite'` / `'reload'` / `'cancel'`. |
| `util/paths.js` | All path helpers. |
| `util/frontmatter.js` | `parseFrontmatter(raw, fieldSet)` → `{ frontmatter, body, unknown }`. `serializeFrontmatter(fm, body, fieldSet, unknown)` → string. |
| `util/esc.js` | `esc(str)` for HTML escape. |
| `util/dates.js` | `formatDate`, `formatDateTime`, `todayIso`. |

Do not collapse this into one giant HTML file.

---

## State model

The dashboard tracks each editable file as a buffer. All buffer factories live in `state.js`.

### Text buffer (used for synthesis and notes)

```js
{
  id: "week-04-synthesis",
  type: "synthesis",                                       // or "notes"
  path: "Journal/synthesis/week-04-synthesis.md",

  loadedContent: "",
  draftContent: "",

  loadedHash: "",
  loadedMtime: null,
  loadedSize: 0,
  existsOnDisk: false,

  status: "clean",                                         // see Save flow below
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
  unknown: {},                                             // pass-through for unknown fm fields

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

Same shape as public entry, different `frontmatter` keys.

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
| `saved` | `Saved ✓` | yes | Shows for ~1.5s, then returns to `clean`. |
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
saved        → clean           after ~1.5s
```

---

## Save flow

**One Save button per buffer.** No global "Save all".

### Sequence

1. User edits a buffer's draft (textarea or frontmatter field).
2. Buffer becomes `dirty`. Dot appears. Save button enables.
3. User clicks Save.
4. Save modal opens, lists: path, "new file" or "Existing file · X.X KB".
5. User confirms.
6. Dashboard calls `/api/read-file` for that path.
7. Compares returned `hash` with the buffer's `loadedHash`.
8. If matching, calls `/api/write-file` with the draft content.
9. If differing, opens Conflict Modal with three actions:
   - **Overwrite** → write the local draft, replace `loadedHash`.
   - **Reload from disk** → discard draft, load disk version, set status `clean`.
   - **Keep editing** → close modal, status remains `dirty`.
10. On successful write:
    - Update `loadedContent`, `loadedHash`, `loadedMtime`, `loadedSize`.
    - Set `existsOnDisk: true`, `status: saved`, then back to `clean` after ~1.5s.
    - Add activity-log line: `write <path> ✓ <size> KB`.
11. After successful synthesis save in Write Entry view, the dashboard auto-routes to Week Detail with the Synthesis tab active. This step disappears once Punchlist #1 lands and Write Entry is removed — every week already lives in Week Detail.

### Conflict detection

Uses **content hash comparison**, not mtime.

```txt
on load:   loadedHash = response.hash
on save:   currentHash = (read-file response).hash
           if currentHash !== loadedHash → conflict modal
           else                          → write
```

mtime is surfaced in the Entries view ordering but is not the source of truth for conflicts.

---

## Activity log

Bottom drawer in the dashboard shell.

- Default open. Toggle button collapses/expands. Open state persists in `localStorage["dashboard-log-open"]`.
- Max 200 lines retained, stored in `localStorage["dashboard-log"]`.
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

- Sidebar status pill switches to **Dev server offline** (red).
- Main area shows:

```txt
⚠ Dev server not reachable

Run npm run dev in your terminal, then click Retry.
```

- Retry button calls `/api/status` again. On success, the dashboard exits offline state and reloads initial data.
- Activity log records first detection and each retry.
- Save actions short-circuit while offline.

---

## Week metadata source

Single source of truth: `Journal/weeks.json`. Tracked in git. Hand-edited when titles or dates change.

```json
[
  { "n": 1,  "title": "Meet Claude. Pick your project.",     "date": "2026-05-08", "phase": "Discover" },
  { "n": 2,  "title": "Write the brief. Argue with it.",     "date": "2026-05-13", "phase": "Discover" },
  ...
  { "n": 12, "title": "Polish. Ship. Show.",                 "date": "2026-07-22", "phase": "Ship" }
]
```

Statuses are **derived**, not stored:

- `synthesised` ← `Journal/synthesis/week-NN-synthesis.md` exists with non-zero size
- `hasNotes` ← `Journal/notes/session-NN.md` exists with non-zero size
- `published` ← `content/journal/NN.md` exists with non-zero size (not yet derived in Sessions grid — open punchlist item)
- `hasImages` ← `Journal/week-images/NN/` exists with at least one file (not yet derived)

`build.js` could read `weeks.json` so the public site and dashboard agree on the canonical list. If `build.js` already does this, no change. If not, a small refactor when convenient — not urgent.

---

## Source files the dashboard manages

| File | Where | What | Status |
|---|---|---|---|
| `Journal/synthesis/week-NN-synthesis.md` | Internal | Facilitator synthesis after each session. | live |
| `Journal/notes/session-NN.md` | Internal | Raw notes from the room. | live |
| `content/journal/NN.md` | Public site | Journal entry shown on the site. | live |
| `Journal/participants/<pid>/case-study.md` | Internal | Long-form participant case study. | live |
| `Journal/participants/<pid>/notes.md` | Internal | Private participant notes. | live |
| `Journal/week-images/NN/*` | Internal | Week images for journal entries. | live, untested |
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
| `date` | string | ISO date (`YYYY-MM-DD`). |
| `participants` | number | Count present. Bare integer in YAML. |
| `quote` | string | Pull quote without attribution. |
| `quoteAttribution` | string | Free text. |

Canonical serialization order: `num`, `title`, `phase`, `date`, `participants`, `quote`, `quoteAttribution`. Unknown frontmatter fields pass through unchanged.

The dashboard preserves **semantic values**, not formatting. Quotes are normalised to double-quoted strings. Numbers are bare. The parser handles `\"` escapes inside string values.

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

`src` is relative from `dist/journal/NN.html`. Images originate in `Journal/week-images/NN/`; `build.js` copies them into `dist/assets/weeks/NN/` at build time. Confirm against `build.js` if anything about this contract changes.

---

## Views — current behaviour

### Sessions

12-week grid. Each card:

- week number + phase
- title
- date (formatted)
- status badges: `Synthesis` (green) if synthesis exists, `Notes` if notes exist.

Click handling lives in `openWeek()`. Today's behaviour:

```txt
synthesis exists  → route to Week Detail (tabbed), Synthesis tab active
synthesis missing → route to Write Entry (side-by-side notes + synthesis)
```

**Target behaviour after Punchlist #1 lands:**

```txt
any week → route to Week Detail, Synthesis tab active
```

Re-derives statuses every time the user navigates back to Sessions, so newly-saved files surface without a manual refresh.

### Week Detail (tabbed)

Four tabs:

| Tab | Tooltip | What it does |
|---|---|---|
| Synthesis | Internal writeup of the session. | Edit/save `Journal/synthesis/week-NN-synthesis.md`. |
| Notes | Raw notes from the room. Reference only. | Edit/save `Journal/notes/session-NN.md`. |
| Public Entry | Public journal entry shown on the site. | Frontmatter inputs + body textarea for `content/journal/NN.md`. |
| Images | Images for this week's journal entries. | Drop zone + thumbnail tray. Insert into the Public Entry body via the figure tag. |

Each tab owns its own buffer. Dirty dot per section. Save button per tab. Conflict detection per save.

The Synthesis and Notes tabs are plain textareas. The Public Entry tab has one input per frontmatter field plus a body textarea. The Images tab drops images, names them, and exposes an "Insert after paragraph N" picker that injects a `<figure>` tag into the Public Entry body (via the `pendingImageInsert` mechanism in `week-detail.js`).

Keyboard: `Cmd/Ctrl+S` is wired in Week Detail and triggers Save on the active tab's buffer.

### Write Entry (side-by-side) — being removed in Punchlist #1

**Status: deprecated.** This view is documented here for accuracy only. Punchlist #1 removes it.

Currently used when a week has no saved synthesis on disk. Two textareas side by side:

- **Raw session notes** (left) → `Journal/notes/session-NN.md`
- **Synthesis** (right) → `Journal/synthesis/week-NN-synthesis.md`

Each has its own Save button, dirty dot, and save flow. After a successful Synthesis save, the dashboard auto-routes to Week Detail.

**Why it's going away.** Routing through two different views based on file state confuses navigation. The Public Entry and Images tabs are unreachable from Write Entry, which makes Public Entry feel gated behind a synthesis save. Tabbed Week Detail with proper empty states is the better answer. After Punchlist #1, every week opens into the same tabbed view regardless of what's been saved.

**If the side-by-side layout is genuinely missed**, file it as a future "split view" toggle inside Week Detail. Do not preserve a separate route for it.

### Case Studies

Overview grid: five participant cards.

Each card shows: participant name, project, status, weeks documented (derived from `### Week NN` headings in the case-study file).

Click expands to a detail view with the case study editor: frontmatter fields up top, body textarea below. On save, `last_updated` is set to today and `weeks_completed` is recounted from the headings.

### Entries

Flat list, reverse-chronological by file mtime. Filter chips at the top: `All / Synthesis / Notes / Public Entry / Case Study`. Selected filter persists in `localStorage["dashboard-entries-filter"]`.

Click an entry to open the appropriate view (Week Detail tab or Case Study detail).

---

## Image flow (built, partially tested)

### What's there

- `Journal/week-images/NN/` is the canonical location for week image originals.
- `POST /api/write-image` writes binary images from a base64 data URL.
- `GET /week-images/NN/<filename>` static route serves images back for thumbnail previews.
- Week Detail's Images tab has a drop zone, thumbnail tray, and an "Insert after paragraph N" affordance that produces a figure tag.
- `pendingImageInsert` in `week-detail.js` lets the Images tab queue an insertion for the next time the Public Entry tab is opened.

### What's untested

- Marko has not run the image flow end-to-end yet.
- The `build.js` copy step (`Journal/week-images/NN/` → `dist/assets/weeks/NN/`) needs verification.
- Image compression on upload is not implemented.

### Open punchlist item

Run image flow on a real week (e.g. Week 03 has the visual direction session content that would benefit from images). Capture any rough edges. File them.

---

## Empty states

| Where | When | What appears |
|---|---|---|
| Sessions grid | `weeks.json` loading | 12 skeleton cards. |
| Sessions grid | No syntheses written | Cards render normally with no status badges. |
| Synthesis tab | File missing | Empty textarea with placeholder: *"Paste the synthesis draft from chat, then Save."* |
| Notes tab | File missing | Empty textarea with placeholder: *"Raw notes for this session. Saved to Journal/notes/session-NN.md."* |
| Public Entry tab | File missing | Frontmatter prefilled from `weeks.json` (num, title, phase, date); empty body and quote. |
| Images tab | No images | Drop zone shown with placeholder text. |
| Case Studies | Case study file missing | Card renders with `weeks_completed: 0`. Detail view opens an empty editor. |
| Entries | No files written | Empty list. |
| Dashboard boot | Status check pending | Loading shell + activity log. |
| Dev server offline | `/api/status` fails | Offline placeholder with Retry button. |

---

## Manual git workflow

Saving writes files only. The dashboard does not commit or push.

After a successful save batch, run in terminal:

```bash
cd "/path/to/AI for designers"
git status
git add Journal/synthesis/week-04-synthesis.md Journal/notes/session-04.md content/journal/04.md
git commit -m "Add week 04 synthesis, notes, and entry"
git push
```

`POST /api/git-commit` exists in `dev-server.js` but is not wired into the dashboard. Leave that decision open.

---

## Decisions made

These are locked. Do not re-litigate without a strong reason.

| Question | Decision |
|---|---|
| Where do raw session notes live? | `Journal/notes/session-NN.md` |
| Where do syntheses live? | `Journal/synthesis/week-NN-synthesis.md` (moved from `Journal/` in v5) |
| React or plain JS? | Plain ES modules. No React. |
| Global save or per-buffer save? | Per-buffer save. |
| Auto-commit on save? | No. Manual git workflow. |
| Multiple browser tabs? | No localStorage lock. Hash conflict detection is enough. |
| Backup before overwrite? | Not implemented. Optional improvement. |
| Search across files? | Not built. Worth adding once Entries view sees real use. |
| Image insertion? | Built. Untested end-to-end. |
| Public-site rebuild? | No. Dashboard is separate from the public build. |
| Frontmatter parser? | Hand-rolled in `util/frontmatter.js`. No YAML library. |
| Markdown preview? | Minimal fallback in v0.1. May upgrade in v0.2 (see open items). |
| Routing for new weeks? | Always tabbed Week Detail. No separate Write Entry view. (Punchlist #1 — currently still routes to Write Entry for empty weeks; that's the fix.) |

---

## Non-goals (do not build)

- React dashboard.
- Next.js, Astro, Gatsby, Vite, or other framework migration.
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

## Punchlist — what's still open

Ordered by impact. Pick from the top.

### 1. Unify routing — always use tabbed Week Detail, remove Write Entry as a separate view

**Symptom.** Clicking a week without a saved synthesis routes to Write Entry, a side-by-side notes-plus-synthesis layout with no Public Entry surface and no Images tab. The user can edit the synthesis there, but can't reach the Public Entry tab until the synthesis is saved at least once, at which point the dashboard auto-routes to Week Detail. This makes Public Entry feel gated behind a synthesis save. It also causes the cosmetic bug where the header reads `New session` even when a synthesis already exists on disk (status not re-derived before routing).

**Acceptance.** Every week — past, present, future, synthesised or empty — opens into the tabbed Week Detail view. Four tabs always available: Synthesis · Notes · Public Entry · Images. Each tab handles its own empty state when the underlying file does not yet exist. No more Write Entry route. No auto-route after first save (the user is already in the right place). No "New session" badge anywhere — empty tabs already communicate that the file is new through their placeholder text.

**Likely fix.**

- In `views/sessions.js`, simplify `openWeek()` to always route to `week-detail` with `tab: 'synthesis'` regardless of status.
- Remove the `write-entry` case from the router in `dashboard.js`.
- Delete `views/write-entry.js`. If you want to preserve the side-by-side layout idea, file it as a future "split view" option inside Week Detail — but do not block this fix on that decision.
- In `views/week-detail.js`, make sure the Synthesis and Notes tabs already handle the "file does not exist" state cleanly (they do — they show an empty textarea with placeholder copy). Same for Public Entry — confirm the frontmatter fields prefill from `weeks.json` when `existsOnDisk` is false.
- Sessions card click should still pre-derive the status so badges are fresh, but the routing decision no longer depends on it.

**Side effect.** The auto-route logic in the old `write-entry.js` (synthesis save → switch to Week Detail) goes away naturally. The Decisions Made table needs a one-line update — see below.

---

### 1b. Update the Decisions Made table after #1 lands

**Acceptance.** The "Routing for new weeks?" row reads: *Always tabbed Week Detail. No separate Write Entry view.*

---

### 2. Test the image flow end-to-end

**Symptom.** The image flow is built but never exercised.

**Acceptance.** Add an image to a real week (e.g. Week 03), position it inside the Public Entry body via the Images tab, save, run `build.js`, confirm the figure renders correctly in `dist/journal/03.html` with the right `src` path.

**Likely follow-ups.** Confirm `build.js` copies `Journal/week-images/NN/*` into `dist/assets/weeks/NN/`. If not, add that copy step.

---

### 3. Unsaved-changes guard

**Symptom.** No `beforeunload` handler. No prompt on view-switch when buffers are dirty. Refreshing the browser silently discards drafts.

**Acceptance.**

- `beforeunload` fires if any buffer is `dirty`. Browser shows its native "Leave site?" dialog.
- Switching top-level views (Sessions → Case Studies, etc.) with dirty buffers in the previous view shows an inline confirm: *"Week NN has unsaved changes. Discard? / Go back."*
- Switching tabs **inside** Week Detail does not prompt — dirty dots stay visible, drafts stay in memory.

---

### 4. Manual Sync button

**Symptom.** No sidebar Sync button. Statuses re-derive only when navigating to Sessions.

**Acceptance.** Add a Sync button to the sidebar. On click: re-read `weeks.json`, re-derive statuses, reload any open buffer from disk (subject to dirty-buffer guard from #3 — prompt before clobbering drafts).

---

### 5. Full keyboard shortcuts

**Symptom.** Only `Cmd/Ctrl+S` is wired (in Week Detail). The brief specified ten shortcuts.

**Acceptance.** Implement the full table:

| Key | Action |
|---|---|
| `Cmd/Ctrl+S` | Save active buffer (already works in Week Detail; extend to Write Entry, Case Studies). |
| `Cmd/Ctrl+K` | Sync from files. |
| `Esc` | Close any open modal. If a textarea is focused, blur first. |
| `Cmd/Ctrl+1` | Sessions view. |
| `Cmd/Ctrl+2` | Case Studies view. |
| `Cmd/Ctrl+3` | Entries view. |
| `[` | Previous week in Week Detail / Write Entry. |
| `]` | Next week in Week Detail / Write Entry. |
| `Cmd/Ctrl+E` | Toggle edit/preview on the focused tab. |
| `Cmd/Ctrl+L` | Toggle activity log. |

Capture `Cmd/Ctrl+S` globally even when a textarea is focused — prevent the browser's native Save dialog.

---

### 6. Backup-on-overwrite

**Symptom.** Conflict modal's Overwrite path is destructive. No copy of the disk version is kept.

**Acceptance.** Before overwriting, copy the existing file to `.dashboard-backup/<original-path>.<timestamp>`. `.dashboard-backup/` is created if missing and added to `.gitignore`. Activity log records the backup line.

This is optional. If you'd rather depend on git history, document that and skip.

---

### 7. Markdown preview upgrade

**Symptom.** `components/markdown.js` is a 5-line fallback. Public Entry and Case Study previews look raw.

**Acceptance.** Choose one of:

- Add `POST /api/render-markdown` to `dev-server.js`. Uses the existing server-side `marked` dep. Returns HTML. The dashboard fetches when entering preview mode.
- Hand-roll a small renderer covering headings, paragraphs, bold, italic, links, blockquotes, lists, code blocks.

Either is fine. Do not `import marked` directly in the browser. Do not add a new client-side dep.

---

### 8. `published` and `hasImages` status derivation

**Symptom.** Sessions cards show `Synthesis` and `Notes` badges. Public entry status and image count are not derived.

**Acceptance.** Sessions card adds two more badges (or one combined status string):

- `Published` when `content/journal/NN.md` exists with non-zero size.
- `N images` when `Journal/week-images/NN/` has files.

`api.listDir` already returns what's needed.

---

### 9. Status pill behaviours other than online/offline

**Symptom.** Pill toggles between checking/online/offline. No states for "saving in progress" or "unsaved changes pending".

**Acceptance.** Decide whether to surface more states. If yes: add `saving` (pill animates while any buffer is in `writing` state), `dirty` (subtle when any buffer is `dirty`). If no: document the decision.

---

### 10. `util/hash.js` cleanup

**Symptom.** The file is 5 lines and may be unused — conflict detection now uses the server-returned `hash` from `/api/read-file`.

**Acceptance.** Either wire the client-side hash for double-checking, or delete the file and remove its import.

---

## How to make changes

When implementation choices conflict, prefer the option that keeps the dashboard:

1. **local** — runs on your machine, talks to localhost only.
2. **direct** — file → save → disk. No abstraction layers.
3. **file-based** — no database, no remote state, no hidden cache.
4. **understandable** — readable top-to-bottom for someone who knows plain ES modules.
5. **recoverable** — every change is undoable. Conflict detection is non-negotiable.
6. **small** — fewer files, fewer deps, fewer concepts than seems necessary.

The dashboard should feel like a reliable workbench beside the journal, not a second product layered on top of it.

---

## Where this brief lives

`Journal/journal-dashboard-brief-v5.md`. Active reference. Supersedes v4.2. Earlier briefs (v3, v4.2, react-decision-brief) are kept for history.
