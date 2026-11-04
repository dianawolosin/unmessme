# UnmessMe (course example repo)

> Clone this one repo. Everything runs locally. No hosting, no auth.

UnmessMe is a fictitious, intentionally silly product: you dump tangled problems
in, and it sorts them into steps. Satire, simple enough that drift is obvious,
backed by a real design system. Demo system for the NN/g *AI-Ready Design
Systems* practices and walkthroughs.

## Quick start

```bash
git clone https://github.com/dianawolosin/unmessme.git
cd unmessme
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). You should see
the UnmessMe landing page.

In Cursor, open this repo as the workspace so `AGENTS.md`, rules, skills, and the
UnmessMe MCP load with the prototype.

## What you get

| Unit | Folder | What it holds |
|------|--------|---------------|
| **Design System (Unit A)** | `UnmessMe Design System/` | Components, `tokens/tokens.json`, each component's `*.contract.json`, MCP server that serves those JSONs live |
| **Prototype (Unit B)** | `UnmessMe Prototype Enviroment/` | Wired starter: Vite app, `AGENTS.md`, `constraints.md` / rules, `docs/`, skills, `mcp.json` pointing at Unit A |

Split of concerns:

- **Design system = machine-readable facts (JSON) + the MCP that serves them.**
  Rules, skills, and framing docs do **not** live here.
- **Prototype = mechanisms that load context for the builder agent** (rules that
  point, docs, skills, orchestration) plus the running surface.

The MCP is wired locally between the two folders so one clone is enough.

## What is intentionally not here

There is **no prebuilt dashboard** in `src/`. The landing page is the running
canvas. Building the UnmessMe dashboard with this wired system is part of the
course practice. If a dashboard file were already in the starter, the exercise
would collapse into copying.

## Why one repo here

Course convenience: one clone, both units side by side. In most orgs these are
two repos. The design system publishes; each prototype starter installs. Same
mechanics; distribution differs.

## Copyright and license

Copyright (c) 2025–2026 Diana Wolosin. All rights reserved.

This repo is a **non-commercial teaching exercise**. You may clone it, run it
locally, and adapt a private copy for your own learning. You may **not** sell it,
license it, rehost it as a product or paid course asset, or use it for commercial
work without prior written permission.

Full terms: see [`LICENSE`](./LICENSE).

UnmessMe is a fictitious demo, not a real product.
