# Delivery manifest

## Standalone repository (from GitHub Template)

**Includes:**

- Next.js + Vitest skeleton (module kit).
- `docs/module/weapon-inventory/` — this full pack.
- Root `worklog.md` — short discipline bullets pointing here.
- `src/` — WEAPON_INVENTORY implementation mirroring future `modules/WEAPON_INVENTORY/src` layout.
- `examples/reference-module/` — structural template only.

**Excludes:**

- Full SwordCraft monorepo, production lore catalogs, real `.env` secrets.
- Large extracts under `.audit-extract/` or similar.

## Monorepo target (after merge)

- `modules/WEAPON_INVENTORY/` implementation.
- English domain spec: `docs/specs/weapon-inventory.md` (behavior — merge or supersede this pack’s normative parts).
- Registry row in `docs/specs/modules.md` already lists `@weapon-inventory/*` — link spec when landed.
- `module-paths.ts` + `tsconfig.json` — already stubbed; extend when implementing.

## Import alias goal

`@weapon-inventory/*` → `modules/WEAPON_INVENTORY/src/*` (host uses `@weapon-inventory/index`).
