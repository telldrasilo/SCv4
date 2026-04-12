# Worklog — SwordCraft Idle Forge

This file is the single source of truth for **what is happening now**.
Agents **must** read this before starting any task and **must** append a record when a task is finished.

---

## What belongs here

- **Only the current to-do** and short working notes.
- **Only the latest work record** stays in the `Work records` section below. All older records are moved to **`archive/`** (numbered filenames: `01-topic.md`, `02-topic.md`, …).
- When a new task is completed: archive the **previous** work record to `archive/`, then write the **new** record here.
- Keep **worklog** small; long specs live in other project docs (`README.md`, `BOILERPLATE.md`, …) or under `archive/`.

---

## Current state

| Item | Value |
|------|-------|
| Stack | Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript |
| Theme | Dark medieval (`theme-root.css`, `globals.css`) |
| Layout | `SkinShell` component (sidebar, statusbar, forge, dock) |
| State mgmt | Zustand 5 (`src/lib/game-store.ts`) — resources, blacksmith, forge |
| Tests | Vitest 4 — 29 tests passing (`npm test`) |
| Dev port | 3000 |

---

## Development rules

### Layout and files

- Follow this layout: **`app/`** (routes, layout, globals), **`components/`** (shell and UI), **`src/`** (theme, CSS, `experiments/`), **`public/`** (static assets).
- **Split large components**: extract pieces into their own modules under `components/` or into focused routes under `app/`.
- **Reusable helpers** (formatting, small pure functions) live in dedicated files (e.g. under `src/` or a local `lib/` if you add one); avoid copy-paste.

### Documentation

- Update project markdown when behavior or setup changes.
- Do not use this file as a full spec; put details in the right doc.

### Language

- **Code comments** — **English**.
- **Markdown you add or substantially edit** in this project — **English**, unless a file is intentionally kept in another language.
- **Symbols, file names, commit messages** — clear, usually English.

### Technical debt and risk

- Prefer **small steps** that keep local dev and production build green.
- Mark **temporary or prototype-only** choices in code or docs so they are easy to revisit.

### Tests

- Prefer **small, testable helpers** for non-trivial logic. When you add automated tests, use **Vitest** and colocate **`*.test.ts`** next to the module, consistent with how you set up this project.

---

## Agent protocol

Every agent (main or sub) working on this project **must**:

1. **Read** this file before starting.
2. **Append** a work record when a task is finished.
3. **Before appending**, move the previous work record to `archive/` (next numbered filename). The `Work records` section must always contain **only the latest** completed task.

Record format:

```markdown
---
Task ID: <id>
Agent: <agent name>
Task: <what was requested>

Work Log:
- <step 1>
- <step 2>

Stage Summary:
- <key results / decisions / artifacts>
```

---

## To-do

<!-- On completion: add archive/NN-topic.md and remove the item here. -->

*(no pending items)*

---

## Work records

---
Task ID: 1
Agent: main
Task: Set up Vitest and create game state store with Zustand

Work Log:
- Installed vitest@4.1.4 as dev dependency
- Created vitest.config.ts with @/ alias and node environment
- Added `test` and `test:watch` scripts to package.json
- Created vitest.setup.test.ts (2 smoke tests)
- Installed zustand@5
- Created src/lib/game-store.ts with Resources, Blacksmith, ForgeTask types and full store
- Created src/lib/format.ts with formatNumber / formatPercent utilities
- Created src/lib/game-store.test.ts (19 tests: resources, blacksmith, forge, reset)
- Created src/lib/format.test.ts (8 tests: number and percent formatting)
- All 29 tests passing

Stage Summary:
- Vitest configured and green (npm test → 29/29 pass)
- Game store: gold/mana earn/spend, XP + level-up with title progression, forge start/complete
- Format helpers ready for UI consumption
