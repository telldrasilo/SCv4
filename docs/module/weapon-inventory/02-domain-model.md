# Domain model

## Weapon instance

- **`weaponId`:** Unique string (e.g. UUID v4 or `wpn_${nanoid}`). Never reused. Required for future property growth (enchants, history).
- **Link to craft:** Store `recipeId`, snapshot of `CraftPlan` (or normalized subset), and **final stat ranges / mids** as computed at completion time so the card does not change if planner formulas change later (product decision: snapshot vs live recompute — **default: snapshot** for v1).
- **Stats (card):**
  - **Attack** — primary display (“damage”).
  - **Durability**, **weight** — from forecast / `StatKey` (same axes as planner: `attack`, `penetration`, `durability`, `weight`, `maneuverability`, `soulPower`).
- **War soul block:**
  - **Soul power** — numeric (from forecast, `soulPower` axis).
  - **War soul affinity total** — sum of contributions defined for v1 (e.g. sum of `arcane.affinity` from structural parts after derivation rules, plus any documented technique/material adjustments). Exact formula must match a single function shared with tests.
  - **Tier** — derived from affinity total via a **tier table** (thresholds). Table lives in WEAPON_INVENTORY (or shared constants module later). Example shape: `Tier0..N` with min affinity inclusive — **numbers TBD in implementation**; document thresholds in code + tests.
- **Visible tags:** Map from planner **weapon profile** (`determineProfile` / `WeaponProfile`) and any additional tag rules (documented list of tag ids + RU labels).
- **Quality:** Store planner `Quality` (`S` | `A` | `B` | `C` | `D` | `F`) at completion.
- **Expandable material tags:** List of **display tags** for each **structural** `materialId` used in `plan.selectedMaterials` (locale-aware names via depot/resource helpers in monorepo; standalone: stub names).

## Naming system

Pipeline (conceptual):

1. **Base** — from `recipeId` + weapon type (recipe name stem).
2. **Prefix / suffix / optional modifier** — from **quality band**, **profile**, dominant **techniques** (forming/processing/assembly/finishing ids), and optional material classes.

Output: single **display name** (RU) + optional **technical name key** for i18n. Exact combinator rules are **module-owned**; add golden tests for a few combinations.

## Identifiers

- **`weaponId`** — inventory primary key.
- **Material IDs** — `mat-*` from depot/planner (read-only on card).
- **Technique IDs** — from CRAFT_DATA / planner (stored on snapshot for naming/tags).
