# Ivan — running notes

> Marko's working notes on Ivan across the program. Observations, decisions, quotes, things to flag for the case study.

---

## Project

Mockup Generator — designers upload a graphic asset and generate realistic mockups (t-shirts, hoodies, posters, decks) by dialing in a visual feeling rather than writing prompts. Four clicks, one generation. The interface does the thinking.

## Design direction

Simple to the point of feeling obvious. Six input dimensions combine into pre-engineered prompts under the hood. The user never sees a text field.

## Scope decisions

- **No custom model training.** Existing image gen APIs (Flux or Ideogram) with pre-engineered style presets. Graceful fallback for bad generations.

## Watch-outs

- "Bad generation" fallback was deferred this week. Worth flagging early — when the interface has to do all the work in weeks 5–7, this becomes the project.
- Risk: making the interface so simple it becomes opaque (users don't know why a generation failed).

## Quotes

- _none yet_

## Artifacts to keep for the case study

- _to add as program progresses_

## Per-week running log

### Week 01
- Brought a real workflow frustration. Strong premise.
- The reframe — "this is a UX layer, not an image generator" — is the right one.
- **Push for next week:** references for UI that hides complexity well. Hardware, appliances, professional gear. Not AI tools.

### Week 02
- _tbd_
