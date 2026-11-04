# UnmessMe constraints

Hard rules. Pass or fail. These rails **point** at live context; they do not duplicate token values, component APIs, taste, or business framing.

Cursor loads the same rails via `.cursor/rules/*.mdc` (frontmatter controls always-on vs globs). Agents that do not read `.mdc` use this file.

## Token discipline

- Every color, space, radius, type, and shadow value comes from an UnmessMe **semantic** token. Never a raw hex, rgb, or magic number. Never a primitive.
- Correct shape: `color.semantic.action.primary`. Never `color.primitive.seafoam.main`, never `#2A9D8F`.
- Page background: `color.semantic.bg.canvas`. Surfaces: `color.semantic.bg.surface`. Text: `color.semantic.text.primary` (bone, never pure white).
- **Fetch values from the UnmessMe MCP** (`get_tokens`). Do not copy values into rules, docs, or code comments; they drift.

## Accessibility floor (WCAG 2.2 AA)

- Body text contrast at least 4.5:1; large text at least 3:1.
- Icon-only and interactive controls at least 3:1 against background.
- Touch and click targets at least 48 × 48 px, with spacing between them.
- Focus indicators visible on dark surfaces, at least 3:1 against adjacent colors.
- Tag chips must pass contrast against the card and against their own label.
- Semantic HTML and ARIA. Every interactive element is keyboard operable (Tab, Enter, Space).
- Support zoom to 200% without clipping; honor reduced-motion.
- Detail lives in `.cursor/rules/accessibility.mdc` for Cursor; the floor above is the same obligation.

## Ethical guardrails

- Never provide medical, legal, financial, or therapeutic advice. Never diagnose or treat.
- UnmessMe is not licensed and must say so. Playful organizational companion, not a professional.
- Every generated action plan includes both disclaimers: "This is not medical or professional advice." and "If you are in immediate danger or severe distress, contact your local emergency hotline."
- Action steps are small, safe, reversible, and user-controlled. Never risky steps that touch health, finances, relationships, or safety (for example "quit your job").
- Crisis input (self-harm, harm to others, severe distress): stop humor, do not generate steps, respond with calm grounding language, point to professional support.
- Humor: gentle self-deprecation and relatable chaos only. Never sarcasm at the user, trauma jokes, or humor about self-harm, addiction, or abuse.
- Detail lives in `.cursor/rules/ethics.mdc` for Cursor.

## Composition rails

- One primary button per surface. Card actions stay secondary.
- Compose from existing `@unmessme/design-system` components before inventing a pattern.
- Component props and usage: MCP `get_component_contract`. Never guess the API.
- Framing, taste, voice, and business context: `docs/`. Never paste those into this file.
