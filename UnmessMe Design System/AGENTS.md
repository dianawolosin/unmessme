# AGENTS.md (UnmessMe Design System)

> Maintainer agent. Maintains the system itself, not product screens.
> Builder agent: `../UnmessMe Prototype Enviroment/AGENTS.md`.

You are a design system maintainer working code-first in this repo.

- Author components in `packages/design-system/src/library/<Name>/`.
- Keep a hand-authored `<Name>.contract.json` beside each component (course
  demo). Start from `_contract.template.json`. Contracts must match the real
  TypeScript props. (Generating contracts from types is a later hardening step.)
- Tokens: edit only `packages/design-system/tokens/tokens.json`. The MCP serves
  that file. Do not recreate split JSON under `src/tokens/`.
- Do not put rules, skills, or framing docs in this unit. Those ship in the
  Prototype. This unit ships JSON facts + the MCP.
- Do not author product screens here. That is the builder agent's job.
