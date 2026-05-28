# Journal Dashboard — Build Brief v4.2
*AI for Designers / Marko Kolić*  
*v1: 2026-05-20 (Cowork artifact) · v2: 2026-05-25 (revised artifact) · v3: 2026-05-26 (off-artifact, into the repo) · v4.1: 2026-05-27 (tightened implementation brief) · v4.2: 2026-05-27 (markdown preview, frontmatter parser, and weeks.json creation decisions resolved)*

---

## The vision

**The chat does the writing. The dashboard does the file work.**

The dashboard is a local facilitator's workbench for the AI for Designers journal. It exists to save, edit, inspect, and organise the files already maintained on disk: week syntheses, public journal entries, raw session notes, participant case studies, and eventually images.

It is **not** a writing assistant. Voice work happens in the main Claude chat, where the journal voice, journal-entry, audit-copy, workshop-story, and case-study skills live. The dashboard is where finished drafts land, where light edits happen, where files are checked, and where changes are saved safely.

The source of truth is always the repo. No database. No remote CMS. No hidden localStorage copy of content. The dashboard reads from disk on demand and writes back to disk through the local dev server.

---

## v0.1 target — the Wednesday-safe MVP

The first build is successful when the facilitator can:

1. Run `npm run dev`.
2. Open `http://localhost:3000/dashboard`.
3. Select an upcoming week, such as Week 04.
4. Paste raw session notes.
5. Paste a finished synthesis draft from chat.
6. Save both files to disk reliably.
7. Reload the browser and see the persisted content.
8. Avoid overwriting external edits via conflict detection.

Everything else is secondary.

The bar for v0.1 is not "complete dashboard." The bar is: **a real session can be captured and saved without asking chat to do file work.**

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

- Plain HTML, CSS, and vanilla JS.
- Plain ES modules.
- No React.
- No bundler.
- No TypeScript.
- No client-side framework.
- No public-site rebuild.
- No dashboard files copied into `dist/`.

### Product constraints

- No AI text generation inside the dashboard.
- No `askClaude`, `sendPrompt`, model calls, or suggestion buttons.
- No auto-push.
- No public hosting.
- No multi-user support.
- No realtime file watcher in v0.1.
- No image insertion UI in v0.1.
- No search in v0.1.
- No dashboard content stored in localStorage, except UI state and activity log.

### Security constraint

The dev server is a **localhost-only personal dev tool**. It is path-checked, but not hardened for hostile input. Do not bind it to a public interface. Do not expose it through a tunnel.

---

## Why this revision exists

The v1 and v2 dashboards were built as Cowork artifacts. They did not work because Cowork sandboxes blocked both required paths:

- Browser File System Access API calls failed for arbitrary host folders.
- `mcp__workspace__bash` calls from inside artifacts were rejected.

v3 moved the dashboard out of Cowork and into the repo, served by `dev-server.js` at `/dashboard`. That was the correct architectural turn.

v4.1 keeps that decision, but tightens the brief:

- v0.1 is now a smaller Wednesday-safe MVP.
- File paths are canonicalised.
- API contracts are explicit.
- Conflict detection uses content/hash comparison, not mtime alone.
- v3's useful implementation details are preserved under a cleaner roadmap.
- Open questions are converted into decisions where possible.

---

## Architecture

### Where it lives

`dashboard/` sits at the AI for Designers repo root and is gitignored while in development.

```txt
AI for designers/
  Claude/                  already gitignored
  Journal/                 tracked
  content/                 tracked
  src/                     public site — tracked
  dist/                    public site build — gitignored
  dashboard/               new — gitignored during development
  dev-server.js            tracked
  .gitignore               add /dashboard/
```

`dev-server.js` serves `./dashboard/` directly at:

```txt
http://localhost:3000/dashboard
```

There is no dashboard build step. Edit a dashboard file, refresh the browser, see the change.

If the dashboard is ever shared or open-sourced, the graduation path is separate:

1. Move `dashboard/` to a tracked location.
2. Remove the gitignore line.
3. Decide whether it remains a dev-only tool or becomes part of the public project.

Do not make that graduation part of v0.1.

---

## Canonical file paths

All path construction must go through `dashboard/util/paths.js`.

No hard-coded path strings inside views or components.

| Asset type | Canonical path |
|---|---|
| Week metadata | `Journal/weeks.json` |
| Synthesis | `Journal/synthesis/week-NN-synthesis.md` |
| Public entry | `content/journal/NN.md` |
| Session notes | `Journal/notes/session-NN.md` |
| Participant case study | `Journal/participants/<pid>/case-study.md` |
| Participant notes | `Journal/participants/<pid>/notes.md` |
| Week images | `Journal/week-images/week-NN/` |
| Participant images | `Journal/participants/<pid>/images/` |
| Workshop story | `Journal/workshop-story.md` |
| Final case study | `Journal/participants/<pid>/case-study-final.md` |

`NN` is always zero-padded to two digits: `01`, `02`, `03`.

### Required helper examples

```js
paths.weekNum(4)
// "04"

paths.weeksJson()
// "Journal/weeks.json"

paths.synthesis(4)
// "Journal/synthesis/week-04-synthesis.md"

paths.publicEntry(4)
// "content/journal/04.md"

paths.sessionNotes(4)
// "Journal/notes/session-04.md"

paths.caseStudy("ivo")
// "Journal/participants/ivo/case-study.md"
```

If a path changes later, change it in `util/paths.js` and nowhere else.

---

## Server-side path safety

Every file API endpoint must treat incoming paths as repo-relative paths.

Reject:

- absolute paths
- paths that resolve outside the repo root
- empty paths
- paths containing null bytes

Use `path.resolve` and compare against the resolved repo root.

```js
import path from "node:path";

const repoRoot = path.resolve(__dirname);

function resolveRepoPath(requestedPath) {
  if (!requestedPath || typeof requestedPath !== "string") {
    throw new Error("Missing path");
  }

  if (requestedPath.includes("\0")) {
    throw new Error("Invalid path");
  }

  if (path.isAbsolute(requestedPath)) {
    throw new Error("Absolute paths are not allowed");
  }

  const target = path.resolve(repoRoot, requestedPath);
  const insideRoot = target === repoRoot || target.startsWith(repoRoot + path.sep);

  if (!insideRoot) {
    throw new Error("Path escapes repo root");
  }

  return target;
}
```

For v0.1, symlink-hardening is optional. If added, compare `fs.realpath()` for both root and target.

---

## Dev-server API contracts

The dashboard talks to the dev server through `fetch()`.

All endpoints return JSON. Even failures return JSON.

### Shared error shape

```json
{
  "ok": false,
  "error": "Human-readable error message"
}
```

### `GET /api/status`

Used on dashboard boot and Retry.

Success:

```json
{
  "ok": true,
  "root": "/absolute/path/to/repo",
  "port": 3000
}
```

Failure:

```json
{
  "ok": false,
  "error": "Status check failed"
}
```

### `GET /api/read-file?path=...`

Reads a repo-relative text file.

If the file exists:

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

If the file does not exist:

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

Notes:

- Hash is SHA-256 of the file content.
- Missing file is not an error.
- Binary files are out of scope for `read-file`.

### `GET /api/list-dir?path=...`

Lists a repo-relative directory.

Success:

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

If the directory does not exist:

```json
{
  "ok": true,
  "path": "Journal/notes",
  "exists": false,
  "entries": []
}
```

### `GET /api/stat?path=...`

Returns metadata for a repo-relative file or directory.

Success:

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

Missing file:

```json
{
  "ok": true,
  "path": "Journal/synthesis/week-04-synthesis.md",
  "exists": false,
  "type": null,
  "mtime": null,
  "size": 0
}
```

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

Notes:

- Creates parent directories if missing.
- Writes UTF-8 text.
- Does not commit.
- Does not push.
- Does not perform conflict detection itself in v0.1; the client performs the preflight read/hash check.

### Existing endpoints retained

These may already exist and should remain:

| Endpoint | v0.1 use |
|---|---|
| `POST /api/write-image` | Not used in v0.1. Kept for v2 image flow. |
| `POST /api/git-commit` | Not used in v0.1. Save and commit stay separate. |

---

## Client module structure

```txt
dashboard/
  index.html
  dashboard.css
  dashboard.js
  api.js
  state.js
  activity-log.js
  views/
    sessions.js
    week-detail.js
    write-entry.js
    case-studies.js
    entries.js
  components/
    save-modal.js
    conflict-modal.js
    offline-state.js
    folder-status.js
    markdown.js
  util/
    paths.js
    hash.js
    esc.js
    frontmatter.js
    dates.js
```

### Module responsibilities

| Module | Responsibility |
|---|---|
| `dashboard.js` | Boot, route changes, top-level render. |
| `api.js` | Fetch wrappers for `/api/*`. No DOM work. |
| `state.js` | In-memory state, buffer registry, localStorage UI preferences. |
| `activity-log.js` | Append/read/persist last 200 log lines. |
| `views/sessions.js` | 12-week grid from `weeks.json`. |
| `views/week-detail.js` | Week tabs, initially Synthesis and Notes. |
| `views/write-entry.js` | Upcoming-week notes + synthesis workflow. |
| `components/save-modal.js` | Save confirmation. |
| `components/conflict-modal.js` | Overwrite/reload/cancel. |
| `components/markdown.js` | Minimal preview renderer or escaped fallback. |
| `util/paths.js` | All repo-relative path construction. |
| `util/esc.js` | HTML escaping. |
| `util/frontmatter.js` | Public entry and case study frontmatter helpers. |

Do not create one giant HTML file.

---

## State model

The dashboard tracks each editable file as a buffer.

### Text buffer shape

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
  lastSavedAt: null
}
```

### Public entry buffer shape

The public entry is edited as fields, but saved as one markdown file.

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
    quoteAttribution: ""
  },

  body: "",

  loadedHash: "",
  loadedMtime: null,
  loadedSize: 0,
  existsOnDisk: false,

  status: "clean",
  lastError: null,
  lastSavedAt: null
}
```

### Save states

| State | Button label | Disabled? | User sees |
|---|---|---:|---|
| `clean` | `Save` | yes | No dirty indicator. |
| `dirty` | `Save` | no | Dirty dot next to tab or section title. |
| `confirming` | `Save` | yes | Save modal open. |
| `checking` | `Checking…` | yes | Conflict preflight running. |
| `conflicting` | `Save` | yes | Conflict modal open. |
| `writing` | `Saving…` | yes | Spinner or pending state. |
| `saved` | `Saved ✓` | yes | Shows for 1.5 seconds, then returns to `clean`. |
| `failed` | `Save` | no | Toast and activity-log error. State remains dirty. |

### Transitions

```txt
clean → dirty
  on user input

dirty → confirming
  on Save click

confirming → checking
  on Save modal confirm

checking → conflicting
  if disk hash differs from loaded hash

checking → writing
  if no conflict

conflicting → writing
  on Overwrite

conflicting → clean
  on Reload from disk

conflicting → dirty
  on Cancel

writing → saved
  on successful 2xx write

writing → failed
  on failed write

saved → clean
  after 1.5 seconds
```

---

## Save flow

v0.1 uses **one Save button per buffer**.

Examples:

- Synthesis has its own Save button.
- Notes has its own Save button.
- Public Entry later has its own Save button.
- Case Study later has its own Save button.

No global "Save all" in v0.1.

### Save sequence

1. User edits a buffer.
2. Buffer becomes `dirty`.
3. User clicks Save.
4. Save modal opens and lists:
   - file path
   - approximate size
   - whether the file is new or existing
5. User confirms.
6. Dashboard re-reads the current file from disk via `/api/read-file`.
7. Dashboard compares `currentHash` with `loadedHash`.
8. If hashes match, write proceeds.
9. If hashes differ, Conflict Modal opens.
10. On successful write:
    - update `loadedContent`
    - update `loadedHash`
    - update `loadedMtime`
    - update `loadedSize`
    - set status to `saved`, then `clean`
    - add activity-log line
11. Post-save modal or toast shows the git command to run manually.

### Conflict detection

Conflict detection uses **content/hash comparison**, not mtime alone.

On load:

```txt
loadedHash = hash(contentFromDisk)
```

Before save:

```txt
currentHash = hash(currentContentOnDisk)

if currentHash !== loadedHash:
  show conflict modal
else:
  write
```

mtime is still displayed and used for Entries ordering, but it is not the conflict source of truth.

### Conflict modal

When a conflict is detected:

**Overwrite**  
Writes the local draft over the disk version. In v0.1, no backup is required. In v1.0, overwrite may optionally save the previous disk version into `.dashboard-backup/`.

**Reload from disk**  
Discards local draft, replaces it with the current disk version, updates loaded hash, and returns the buffer to `clean`.

**Cancel**  
Keeps local draft in memory and returns to the editor in `dirty` state.

---

## Activity log

The activity log is a bottom drawer.

v0.1 behavior:

- Default open.
- Logs every read, write, warning, error, conflict, reload, and failed fetch.
- Persists the last 200 lines in localStorage.
- Does not store file content.
- Includes timestamps.

Example lines:

```txt
[13:42:01] read Journal/weeks.json ✓
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
Dev server not reachable at localhost:3000.
Run npm run dev in your terminal, then click Retry.
```

- Retry button calls `/api/status` again.
- Activity log records first detection and each retry.
- Save actions short-circuit with a toast: `Dev server offline`.

If `/api/status` later succeeds, the dashboard exits offline state and reloads initial data.

---

## Week metadata source

The Sessions grid reads from:

```txt
Journal/weeks.json
```

This file is tracked in git and hand-edited when week titles, dates, or phases change.

Example:

```json
[
  { "n": 1, "title": "Meet Claude. Pick your project.", "date": "2026-05-08", "phase": "Discover" },
  { "n": 2, "title": "Write the brief. Argue with it.", "date": "2026-05-13", "phase": "Discover" },
  { "n": 12, "title": "Polish. Ship. Show.", "date": "2026-07-22", "phase": "Ship" }
]
```

Derived statuses are not stored in `weeks.json`.

A week is:

- `synthesised` if `Journal/synthesis/week-NN-synthesis.md` exists with non-empty body.
- `published` if `content/journal/NN.md` exists with non-empty body.
- `has-notes` if `Journal/notes/session-NN.md` exists with non-empty body.
- `has-images` if `Journal/week-images/week-NN/` exists and has files.

In v0.1, only `synthesised` and `has-notes` are required.

`build.js` may later read `weeks.json` so the public site and dashboard agree on the canonical list, but that refactor is not required for v0.1 unless the current build already depends on it.

---

## Source files the dashboard manages

| File | Where it lives | What it is | Phase |
|---|---|---|---|
| `Journal/synthesis/week-NN-synthesis.md` | Internal | Facilitator synthesis after each session. | v0.1 |
| `Journal/notes/session-NN.md` | Internal | Raw notes from the session. | v0.1 |
| `content/journal/NN.md` | Public site | Journal entry shown on the site. | v0.2 |
| `Journal/participants/<pid>/case-study.md` | Internal | Long-form participant case study. | v0.2 |
| `Journal/participants/<pid>/notes.md` | Internal | Private participant notes. | v0.2 |
| `Journal/week-images/week-NN/*` | Internal | Week images for journal entries. | v2 |
| `Journal/workshop-story.md` | Internal/long-form | Whole-workshop story after week 12. | v3 |
| `Journal/participants/<pid>/case-study-final.md` | Internal/long-form | Final participant case study. | v3 |

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

No frontmatter. Plain markdown.

The dashboard reads and writes the whole file as a single string.

```markdown
# AI for Designers — Week 04
## Session title

**Session:** Week 4 of 12
**Participants present:** 5

---

## What happened

[prose…]
```

Editing rule:

- v0.1 treats synthesis as one textarea.
- Headings and dividers are user-managed.
- No structure enforcement.

---

### Notes — `Journal/notes/session-NN.md`

No frontmatter. Free-form markdown.

The dashboard reads and writes the whole file as a single string. New file is created on first save.

Editing rule:

- v0.1 treats notes as one textarea.
- Empty notes file is allowed.
- Notes are internal reference only.

---

### Public entry — `content/journal/NN.md`

Frontmatter is required and parsed by the site build.

Public Entry editing begins in v0.2.

```markdown
---
num: "04"
title: "Session title."
phase: "Define"
date: "2026-05-27"
participants: 5
quote: "A useful line from the room."
quoteAttribution: "Participant, context"
---

[body markdown…]
```

Required fields:

| Field | Type | Example | Notes |
|---|---|---|---|
| `num` | string | `"04"` | Zero-padded two digits. Must match filename. |
| `title` | string | `"Make the thing real."` | Sentence case. |
| `phase` | string | `"Define"` | One of: Discover, Define, Make, Ship. |
| `date` | string | `"2026-05-27"` | ISO date. |
| `participants` | number | `5` | Count present. |
| `quote` | string | `"Something useful."` | Pull quote, no attribution inside. |
| `quoteAttribution` | string | `"Paula, on scope"` | Free text. |

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

Do not promise to preserve frontmatter formatting exactly. The dashboard preserves the **semantic values** and writes frontmatter in the canonical order.

---

### Case study — `Journal/participants/<pid>/case-study.md`

Case Study editing begins in v0.2.

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

Required fields:

| Field | Type | Example | Notes |
|---|---|---|---|
| `participant` | string | `"Ivo"` | Display name. |
| `project` | string | `"Wattlog"` | Project name. |
| `status` | string | `"draft"` | `draft` / `review` / `final`. |
| `weeks_completed` | number | `2` | Auto-derived from `### Week NN` headings. |
| `last_updated` | string | `"2026-05-27"` | Auto-updated on save. |
| `hero_image` | string | `""` | Optional path. |
| `final_url` | string | `""` | Optional URL. |

Week checklist derivation:

```js
/^###\s+Week\s+(\d{2})/gmi
```

Each matched heading counts as a documented week.

---

### Figure tag — future image flow

Image insertion is v2, not v0.1.

When added, placed images inside `content/journal/NN.md` must use:

```html
<figure class="journal-figure">
  <img src="../assets/weeks/NN/filename.jpg" alt="alt text">
  <figcaption>alt text</figcaption>
</figure>
```

The `src` path is relative to rendered HTML in `dist/journal/NN.html`.

Confirm this against `build.js` before implementing v2 image insertion.

---

## Views and phases

### v0.1 — Wednesday-safe workbench

Required views:

1. Sessions grid.
2. Week Detail.
3. Write Entry.

Required tabs:

- Synthesis
- Notes

Required components:

- Save modal
- Conflict modal
- Activity log
- Offline state

#### Sessions grid

Reads `Journal/weeks.json` and renders 12 cards.

Each card shows:

- week number
- title
- date
- phase
- synthesis status
- notes status

Click behavior:

- If synthesis exists, open Week Detail.
- If synthesis does not exist, open Write Entry for that week.
- This applies to both past and upcoming weeks. The dashboard should not block writing based on date.

#### Week Detail

v0.1 tabs:

| Tab | Purpose |
|---|---|
| Synthesis | Read, preview, edit, and save `Journal/synthesis/week-NN-synthesis.md`. |
| Notes | Read, edit, and save `Journal/notes/session-NN.md`. |

v0.1 tab tooltips:

| Tab | Tooltip |
|---|---|
| Synthesis | Internal writeup of the session. |
| Notes | Raw notes from the room. Reference only. |

Each tab has:

- read/preview mode if file exists
- edit mode
- textarea
- per-buffer Save button
- dirty indicator
- conflict detection

#### Write Entry

For a week without a synthesis.

v0.1 layout:

1. Week header from `weeks.json`.
2. Raw session notes textarea.
3. Synthesis textarea.
4. Two separate Save buttons:
   - Save Notes
   - Save Synthesis

No image drop zone in v0.1.

No public entry prompt in v0.1 unless the Public Entry tab has already been built.

---

### v0.2 — editorial depth

Add:

- Public Entry tab.
- Case Studies view.
- Participants tab in Week Detail.
- Entries view.

#### Public Entry tab

Reads and writes `content/journal/NN.md`.

Fields:

- `num`
- `title`
- `phase`
- `date`
- `participants`
- `quote`
- `quoteAttribution`
- body textarea

If file does not exist:

- prefill `num`, `title`, `phase`, and `date` from `weeks.json`
- set `participants` to empty or previous known count
- leave `quote`, `quoteAttribution`, and body empty

Save uses the same buffer state machine and hash conflict detection.

#### Case Studies view

Five participant cards.

Each card shows:

- participant name
- project
- case study status
- weeks documented count

Expanded card tabs:

| Tab | Purpose |
|---|---|
| Content | Full case study preview/edit. |
| Week checklist | Derived from `### Week NN` headings. |
| Notes | `Journal/participants/<pid>/notes.md`. |
| Images | Placeholder only until v2. |

On save:

- update `last_updated` to today's ISO date
- recount `weeks_completed` from `### Week NN` headings
- preserve other frontmatter values semantically
- write frontmatter in canonical order

#### Participants tab in Week Detail

Shows all five participants.

For each participant:

- if `### Week NN` exists in their case study, show that section
- if not, show: `No section for Week NN yet. Add one from this participant's case study.`
- Edit button opens that participant in Case Studies view and scrolls to the relevant section if possible

#### Entries view

Flat reverse-chronological list by file mtime, newest first.

Includes:

- syntheses
- notes
- public entries
- case studies

Filter chips:

```txt
All / Synthesis / Notes / Public Entry / Case Study
```

Selected filter persists in localStorage.

---

### v1.0 — safety and polish

Add:

- Full unsaved-changes guard.
- Keyboard shortcuts.
- Empty states across all views.
- Manual Sync button.
- Optional backup-on-conflict-overwrite.
- Better visual status pills.
- LocalStorage UI preferences.

#### Unsaved changes guard

If user changes tabs inside Week Detail:

- no prompt
- keep dirty buffer in memory
- dirty dot stays visible

If user changes top-level view:

- show inline confirm:
  `Week NN has unsaved changes. Discard? / Go back.`

If user reloads or closes the window:

- `beforeunload` fires if any buffer is dirty

If user clicks Sync while dirty buffers exist:

- modal:
  `You have unsaved changes in N file(s). Syncing will overwrite them with disk versions. Continue?`

#### Keyboard shortcuts

| Key | Action |
|---|---|
| `Cmd/Ctrl+S` | Save current buffer. Opens save modal. |
| `Cmd/Ctrl+K` | Sync from files. |
| `Esc` | Close modal. If textarea focused, blur first. |
| `Cmd/Ctrl+1` | Sessions view. |
| `Cmd/Ctrl+2` | Case Studies view. |
| `Cmd/Ctrl+3` | Entries view. |
| `[` | Previous week in Week Detail. |
| `]` | Next week in Week Detail. |
| `Cmd/Ctrl+E` | Toggle edit/preview on focused tab. |
| `Cmd/Ctrl+L` | Toggle activity log. |

v0.1 only needs `Cmd/Ctrl+S` and `Esc`.

#### Sync trigger

Manual only.

The Sync button re-reads known files from disk.

No file watcher. No auto-refresh on window focus.

Future option: refresh on focus only if no dirty buffers exist.

---

### v2 — image flow and richer overview

Add after v1.0 is stable.

#### Image staging in public entries

- Drop images into the week Images tab.
- Save originals to `Journal/week-images/week-NN/`.
- Thumbnail tray.
- "Insert after paragraph N" picker.
- Live preview with figures placed.
- Save updates public entry markdown with `<figure>` tags.
- Build copies image binaries into `dist/assets/weeks/NN/`.

#### Per-participant images

- Images tab in Case Studies.
- Drop, name, and save to `Journal/participants/<pid>/images/`.

#### Status dashboard

On Sessions grid, each week card shows:

- synthesis written
- notes written
- public entry written
- number of images
- number of participants documented

Quick filters:

- weeks without synthesis
- weeks without public entry
- weeks without notes
- weeks without images

#### Image compression

Optional on upload:

- max width: 1600px
- JPEG quality: 80%
- toggle in settings

---

### v3 — workshop close-out

Add after week 12.

#### Workshop Story view

Single editor for:

```txt
Journal/workshop-story.md
```

Uses the same save pipeline.

Writing happens in chat with the `workshop-story` skill. The dashboard edits and saves the finished piece.

#### Final case studies

Each participant gets:

```txt
Journal/participants/<pid>/case-study-final.md
```

Case Studies view gains a Final tab.

The Final tab can show side-by-side preview against the rolling weekly case study so the facilitator can see what was lifted.

#### Publication state

Long-form pieces get visible publication state:

- draft
- review
- final
- published

---

## Empty states

### v0.1 required

| Where | When | What it shows |
|---|---|---|
| Dashboard boot | Status check pending | Loading shell + activity log. |
| Dev server offline | `/api/status` fails | Offline placeholder with Retry. |
| Sessions grid | `weeks.json` loading | 12 skeleton cards. |
| Sessions grid | No syntheses yet | 12 cards, all showing no synthesis. Message: `No syntheses written yet. Click any week to start.` |
| Synthesis tab | File missing | Empty textarea in edit mode. Placeholder: `Paste the synthesis draft from chat, then Save.` |
| Notes tab | File missing | Empty textarea. Placeholder: `Raw notes for this session. Saved to Journal/notes/session-NN.md.` |
| Write Entry | New week | Empty notes and synthesis textareas. |

### v0.2/v1.0 empty states

| Where | When | What it shows |
|---|---|---|
| Public Entry tab | File missing | Frontmatter prefilled from `weeks.json`; empty body. |
| Participants tab | No participant has Week NN section | List of 5 participants with `No section for Week NN yet.` |
| Case Studies | File missing | Card shows participant + project + `Case study not started.` |
| Entries | No files written | `Nothing's been written yet. Start from Sessions.` |
| Images tab | No images | Read-only placeholder until v2. |

---

## Manual git workflow

Saving writes files to disk only.

v0.1 does not auto-commit.

After a successful save, show:

```bash
git status
git add Journal/synthesis/week-04-synthesis.md Journal/notes/session-04.md
git commit -m "Add week 04 synthesis and notes"
```

The user runs commands manually.

`POST /api/git-commit` exists but is not part of v0.1. Revisit later.

---

## Decisions made

These are no longer open questions for v0.1.

| Question | Decision |
|---|---|
| Where do raw session notes live? | `Journal/notes/session-NN.md` |
| React or plain JS? | Plain ES modules. No React. |
| Global save or per-buffer save? | Per-buffer save. |
| Auto-commit on save? | No. Manual git workflow. |
| Multiple browser tabs? | No localStorage lock in v0.1. Hash conflict detection is enough. |
| Backup before overwrite? | Not required in v0.1. Optional in v1.0. |
| Search? | Not v0.1. Consider after Entries view exists. |
| Image insertion? | v2. |
| Public-site rebuild? | No. Dashboard is separate from the public build. |

---

## Known non-goals

Do not build these until explicitly promoted:

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

## Acceptance plan

### Phase 0 — Plumbing

1. Add `/dashboard/` to `.gitignore`.
   - Done when `git status` ignores files created under `dashboard/`.

2. Add `/dashboard` route to `dev-server.js`.
   - Done when `http://localhost:3000/dashboard` serves `dashboard/index.html`.

3. Add or verify `/api/status`.
   - Done when `curl http://localhost:3000/api/status` returns `{ ok: true }`.

4. Add `/api/read-file`, `/api/list-dir`, `/api/stat`, `/api/write-file`.
   - Done when each endpoint rejects escaping paths and returns the JSON shapes in this brief.

5. Create initial `Journal/weeks.json`.
   - Populate all 12 weeks with `n`, `title`, `date`, `phase`. Source the schedule from the existing week metadata baked into the prior dashboard artifact.
   - Done when the file exists at `Journal/weeks.json` and `JSON.parse(fs.readFileSync('Journal/weeks.json'))` returns an array of 12 objects, each with the four fields.

6. Verify canonical synthesis path.
   - Done when:
     ```bash
     curl "http://localhost:3000/api/read-file?path=Journal/synthesis/week-01-synthesis.md"
     ```
     returns a valid JSON response, whether or not the file exists.

---

### Phase 1 — v0.1 Wednesday-safe MVP

6. Create dashboard scaffold.
   - Done when the page loads with sidebar, main area, and activity log with no JS errors.

7. Build `api.js`.
   - Done when browser console can read and write a throwaway text file through the API.

8. Build `util/paths.js`.
   - Done when all week paths are generated through helpers and no view hard-codes repo paths.

9. Load `Journal/weeks.json`.
   - Done when the Sessions grid renders 12 cards with title, date, and phase.

10. Derive synthesis and notes status.
    - Done when each week card shows whether synthesis and notes files exist.

11. Build Week Detail with Synthesis tab.
    - Done when opening Week 1 reads and displays `Journal/synthesis/week-01-synthesis.md` if present.

12. Add synthesis edit/save.
    - Done when editing, saving, reloading, and re-opening preserves the synthesis on disk.

13. Add conflict detection for synthesis.
    - Done when editing the same file externally before saving triggers the Conflict Modal.

14. Build Notes tab.
    - Done when notes read from and save to `Journal/notes/session-NN.md`.

15. Build Write Entry for empty weeks.
    - Done when Week 4 can save both notes and synthesis, creating files if absent.

16. Add offline state.
    - Done when stopping the dev server and reloading shows the offline placeholder and Retry flow.

17. Use it for a real session.
    - Done when a real week’s notes and synthesis are saved through the dashboard.

---

### Phase 2 — v0.2 Editorial depth

18. Public Entry tab.
    - Done when `content/journal/NN.md` can be edited with frontmatter fields and body textarea.

19. Public Entry canonical serialization.
    - Done when saving writes frontmatter in canonical order and preserves values semantically.

20. Case Studies view.
    - Done when five participant cards render and case study files can be previewed.

21. Case Study editing.
    - Done when saving updates body, `last_updated`, and `weeks_completed`.

22. Participants tab in Week Detail.
    - Done when Week Detail shows each participant's section for that week if present.

23. Entries view.
    - Done when edited files appear in reverse mtime order with type filters.

---

### Phase 3 — v1.0 Safety and polish

24. Dirty indicators.
    - Done when every dirty buffer shows a visible dot.

25. Unsaved-change guards.
    - Done when view-switch, Sync, and page reload protect dirty buffers.

26. Keyboard shortcuts.
    - Done when the full shortcut table works.

27. Manual Sync.
    - Done when Sync re-reads known files and respects dirty-buffer guard.

28. Empty states.
    - Done when every empty state in this brief appears correctly.

29. Optional backup-on-overwrite.
    - Done when Conflict Modal overwrite can write the previous disk version to `.dashboard-backup/` before replacing it.

---

## v0.1 implementation notes

### Minimal render approach

Use a simple state/render loop.

```js
import { state } from "./state.js";
import { renderSessions } from "./views/sessions.js";
import { renderWeekDetail } from "./views/week-detail.js";

export function setState(patch) {
  Object.assign(state, patch);
  render();
}

function render() {
  if (state.offline) return renderOffline();

  switch (state.route.name) {
    case "sessions":
      return renderSessions();
    case "week-detail":
      return renderWeekDetail(state.route.week);
    case "write-entry":
      return renderWriteEntry(state.route.week);
  }
}
```

Do not overbuild routing. v0.1 can use hash routes or in-memory route state.

### Markdown preview

**Decision for v0.1: escaped text inside `<pre>`.** Preview is not the primary mode in v0.1; edit mode is. The simplest safe rendering is enough.

`components/markdown.js` exports a single helper:

```js
export function renderMarkdown(text) {
  // v0.1: escape and wrap in <pre>
  return `<pre class="md-fallback">${escapeHtml(text)}</pre>`;
}
```

In v0.2, upgrade this single function to render headings, paragraphs, bold/italic, and links. Two viable paths when we get there:

1. Add a `POST /api/render-markdown` endpoint to `dev-server.js` that uses the existing `marked` server-side dep and returns HTML.
2. Hand-roll a small renderer covering only the markdown constructs the journal actually uses (headings, paragraphs, bold, italic, blockquotes, links).

**Do not add a new client-side markdown dependency for v0.1. Do not `import` `marked` directly in the browser** — it requires a bundler and we don't have one.

### Frontmatter parsing

v0.1 does not parse frontmatter. Public Entry and Case Study editing both arrive in v0.2.

**Decision for v0.2: hand-rolled parser for the known fields, not a YAML library.**

`util/frontmatter.js` exposes two functions:

```js
const PUBLIC_ENTRY_FIELDS = ["num", "title", "phase", "date", "participants", "quote", "quoteAttribution"];
const CASE_STUDY_FIELDS   = ["participant", "project", "status", "weeks_completed", "last_updated", "hero_image", "final_url"];

export function parseFrontmatter(raw, fieldSet) { /* split on --- delimiters, parse field: "value" lines, return { frontmatter, body } */ }
export function serializeFrontmatter(fm, fieldSet) { /* write in canonical field order, double-quote string values, return raw string */ }
```

Both files use a stable set of known fields (seven for public entries, seven for case studies). All are simple strings or one number. A full YAML parser would add a dependency and pull in edge-case behaviour (multi-line strings, nested objects, anchors, comments) that the journal files never use.

The parser must:

- Treat all string values as double-quoted.
- Escape inner double quotes as `\"` on write.
- Round-trip the seven known fields losslessly.
- Pass through unknown fields untouched (defensive against schema drift).
- Write fields in the canonical order on every save, even if the loaded file had a different order.

### localStorage

Allowed:

- activity log last 200 lines
- selected view
- selected filter in Entries view
- activity log open/closed

Not allowed:

- file content
- drafts as source of truth
- silent recovery copies that compete with disk files

If draft recovery is added later, it must be explicit and visible.

---

## Future improvements to consider

These are valid, but not needed now.

- Search across syntheses, notes, and case studies.
- Dashboard settings panel.
- Backup browser with restore.
- File diff view in Conflict Modal.
- "Save all dirty files."
- "Save and commit."
- Refresh-on-focus if no dirty buffers.
- Participant progress sparklines.
- Public entry live preview.
- Image compression.
- Multi-cohort support.
- Moving dashboard into tracked source once stable.

---

## Final rule

When implementation choices conflict, prefer the option that keeps the dashboard:

1. local,
2. direct,
3. file-based,
4. understandable,
5. recoverable,
6. small.

The dashboard should feel like a reliable workbench beside the journal, not a second product layered on top of it.
