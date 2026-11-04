# @unmessme/design-system

UnmessMe design system: MUI-based React components, W3C tokens, per-component
contract JSON for MCP.

## Tokens

Single source of truth:

```ts
import { tokens } from '@unmessme/design-system';
// or
import tokensJson from '@unmessme/design-system/tokens/tokens.json';
```

File on disk: `tokens/tokens.json`. Do not add parallel token JSON trees.

## Contracts

Every component under `src/library/<Name>/` has `<Name>.contract.json` (API,
usage, tokensUsed, a11y). The MCP reads these live. Template:
`src/library/_contract.template.json`.

## Usage

```tsx
import { ProblemCard, Button, Tag } from '@unmessme/design-system';
```

Peer deps: `@mui/material`, `@emotion/react`, `@emotion/styled`, `react`, `react-dom`.
