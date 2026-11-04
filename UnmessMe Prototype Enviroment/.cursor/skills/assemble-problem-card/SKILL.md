---
name: assemble-problem-card
description: Assemble one UnmessMe ProblemCard (or a dashboard grid of them) from the design system. Use when the user asks to build, add, restyle, or fix a problem/case card on the dashboard.
---

# Assemble a ProblemCard

Repeatable workflow for the dashboard case card. Follow these steps in order. Do not invent props or colors.

## 1. Load framing (on demand)

- Read `docs/taste.md` for voice and Digital Noir composition.
- Read `docs/business-context.md` if the card copy needs product framing.
- Read `docs/microcopy.md` for allowed phrases and disclaimer habits.

Do not paste those docs into the card. Apply them.

## 2. Fetch the contract (MCP)

Call the UnmessMe MCP:

- `get_component_contract` with `name: "ProblemCard"`
- Optionally `get_component_contract` for `Tag` and `Button` if you touch those APIs
- `get_tokens` only if you need a semantic accent path confirmed

Honor the contract: required props, accent options, secondary actions on the card, content limits.

## 3. Compose

```tsx
import { ProblemCard } from '@unmessme/design-system';

<ProblemCard
  title="…"           // user voice, under ~60 characters
  tags={['…']}        // one to five
  stressScore={8}     // 1–10 when relevant
  accent="urgent"     // urgent | analysis | success | neutral
  onUnmess={…}        // opens the plan; card action stays secondary
/>
```

Rules from the contract and `constraints.md`:

- Title stays in the user's wry first-person voice.
- Stress is a labeled meter, never color alone.
- No primary button on the card; the wall stays calm.
- One to five tags.

## 4. Grid pattern (when building several)

- Lay cards in the existing dashboard grid / Tile surface pattern already in `src/`.
- Reuse `ProblemCard` per case. Do not invent a second card component.
- Keep accent variety meaningful (urgent vs analysis), not decorative rainbow.

## 5. Self-check

Before finishing:

- [ ] Semantic tokens only (MCP / system components, no raw hex)
- [ ] Contrast and 48px targets clear the accessibility floor
- [ ] Contract props match; no guessed API
- [ ] Taste and microcopy hold; no licensed-advice tone
