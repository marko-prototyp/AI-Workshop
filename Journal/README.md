# Journal — working area

Private workspace for the 12-week program. Raw notes, synthesis drafts, and per-participant case studies live here. The polished public version goes to `/content/journal/NN.md` and ships with the site.

## What goes where

```
Journal/
├── README.md                          ← you are here
├── intake/
│   ├── participant-checkin.md         ← send this to participants after each session
│   ├── facilitator-notes.md           ← Marko fills this in during/after each session
│   └── final-interview.md             ← long-form intake for case studies (week 10–12)
├── raw/
│   └── week-NN-raw.md                 ← raw dump: notes, pasted answers, half-thoughts
├── week-NN-synthesis.md               ← Claude turns raw → synthesis (week 01 already exists)
└── participants/
    ├── ivo/{notes.md, case-study.md}
    ├── ivan/{notes.md, case-study.md}
    └── paula/{notes.md, case-study.md}
```

`notes.md` is a running log per participant — observations, decisions, quotes, screenshots to include later. `case-study.md` is the long-form draft that grows weekly. By week 12 it should be publishable.

## Weekly loop

1. **During / right after the session** — Marko fills `intake/facilitator-notes.md` (copy it to `raw/week-NN-raw.md`) with anything worth remembering.
2. **Within 48h** — send `intake/participant-checkin.md` to each participant. Paste their answers into the bottom of the same `raw/week-NN-raw.md`.
3. **When ready** — ask Claude to synthesise: *"Synthesise Journal/raw/week-NN-raw.md into the synthesis + per-participant updates."* That produces:
   - `Journal/week-NN-synthesis.md` — facilitator-voice writeup, matching the week-01 voice
   - Updates to each `participants/*/notes.md` and `participants/*/case-study.md`
   - A first draft of `content/journal/NN.md` for the public site
4. **Review + ship** — Marko edits the public draft, builds the site, pushes.

## Week 12

Each participant's `case-study.md` is reviewed by them, finalised, and published — both on this site (under their name) and as a Markdown/PDF they take with them. That's the certificate.
