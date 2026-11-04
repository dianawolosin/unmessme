# UnmessMe Prototype Enviroment (Unit B)

> The prototype environment: the wired starter product teams open to build with
> the system. Components installed, Vite baseplate running, mechanisms wired.

## Anatomy (course taxonomy)

| Mechanism | Where it lives | What it carries |
|-----------|----------------|-----------------|
| Orchestration | `AGENTS.md` | Builder role + routing to every layer |
| Rules | `constraints.md` + `.cursor/rules/*.mdc` | Hard rails (point, do not duplicate) |
| Docs | `docs/*.md` | Framing: taste, business context, guidelines, microcopy |
| Skills | `.cursor/skills/*/SKILL.md` | Repeatable workflows (e.g. assemble a ProblemCard) |
| MCP client | `.cursor/mcp.json` | Connects to Unit A for live tokens + contracts |
| Baseplate | `src/` | Running app where output renders |

Machine-readable **facts** (tokens, component contracts) do not live here. They
live in the design system and arrive through the MCP.

## Run

From the monorepo root:

```bash
npm install
npm run dev
```

Landing is the running canvas. There is no prebuilt dashboard in `src/` on
purpose. Build product screens from `@unmessme/design-system` using the
mechanisms above.
