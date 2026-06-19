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

### Week 03
- No check-in submitted. No update.

### Week 04
- Absent again. Two sessions missed in a row.
- A lot to cover. Will hopefully tag along week 05.
- **Action before week 05:** Real conversation about the path back in. Compressed onboarding or join live session 05?

### Week 05
- Absent again. Three sessions missed in a row (03, 04, 05).
- The path-back-in conversation flagged after week 04 hasn't produced a return.
- **Action before week 06:** Decide the re-entry plan for real. Compressed onboarding, or rejoin at the build phase with reduced scope. Past the point where "tag along" works.

### Week 06
- Absent again. Four sessions missed in a row (03, 04, 05, 06).
- Now half the program behind: no design direction, no wireframes, no smoke test, and as of this session no design system or anti-stock skill either. The others all produced those this week.
- The re-entry decision flagged after W04 and again after W05 still hasn't been made or acted on. Letting it slide is now the active failure.
- **Action before week 07:** Make the call and tell him. Realistic options: (1) a compressed onboarding track to get him a brief + direction fast, or (2) accept he rejoins at the build phase with a deliberately reduced scope. No third "catch up on his own" option remains.
