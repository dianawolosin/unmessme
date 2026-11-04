# UnmessMe Design System (Unit A)

> What the system *knows* as machine-readable fact: components, tokens, contracts.
> The MCP serves those facts to the Prototype unit.

## What lives here

- `packages/design-system/` React components (source) + W3C `tokens/tokens.json`
- Each component folder: `Name.tsx` + `Name.contract.json` (props, variants,
  tokensUsed, a11y). Template: `src/library/_contract.template.json`
- `packages/mcp-server/` stdio MCP: `get_tokens`, `list_components`,
  `get_component_contract`

## What does **not** live here

Rules, skills, framing docs, and `AGENTS.md` for building UI. Those are Prototype
mechanisms. This unit does not duplicate them.

## Token source of truth

One file: `packages/design-system/tokens/tokens.json`.
Runtime `src/tokens/index.ts` imports that file. Do not add a second token tree.

## Course mapping

| Intent | Delivery |
|--------|----------|
| Live values (tokens, contracts) | MCP fetch from this unit |
| Hard rails, framing, workflows | Prototype (`constraints.md`, `docs/`, skills) |
