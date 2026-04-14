# Weapon inventory — documentation pack index

**Doc version:** 0.1  
**Status:** Pre-integration (autonomous development)  
**Target monorepo module:** `modules/WEAPON_INVENTORY` · import prefix `@weapon-inventory/*` (see [`docs/specs/modules.md`](../../specs/modules.md)).

## Purpose

Persist **one unique weapon record per completed craft**. When the player finishes the craft timeline on planner step 7, the weapon is **automatically** added to inventory. The inventory tab shows weapon **cards** with stats, war-soul block, visible tags, quality, and an expandable **material tags** section.

## Table of contents

| File | Topic |
|------|--------|
| [01-scope-and-boundaries.md](01-scope-and-boundaries.md) | In/out of scope |
| [02-domain-model.md](02-domain-model.md) | Entities, IDs, naming, war-soul tiers |
| [03-public-api.md](03-public-api.md) | Exports for host and planner integration |
| [04-integration-contracts.md](04-integration-contracts.md) | Craft completion, depot consumption, DAG |
| [05-i18n-and-ux-copy.md](05-i18n-and-ux-copy.md) | RU UI, EN maintainer text |
| [06-data-authority.md](06-data-authority.md) | Single writers |
| [07-risks-and-edge-cases.md](07-risks-and-edge-cases.md) | Open design points |
| [08-delivery-manifest.md](08-delivery-manifest.md) | What ships in the standalone repo |

## Glossary

- **Craft completion:** Planner store sets `isCraftComplete` after `finishCraft()` (timeline simulator). See CRAFT_PLANNER `use-craft-timeline-simulator.ts` / `store.ts`.
- **Summary payload:** Serializable snapshot derived from step-7 context: `CraftPlan`, forecast/stats, quality/profile, structural material IDs, technique selections, and computed war-soul affinity sum for tiering.
