# Integration contracts

## Dependency DAG (must hold)

```text
WEAPON_INVENTORY  must not import  CRAFT_PLANNER

Host imports  CRAFT_PLANNER  and  WEAPON_INVENTORY  (and RESOURCE_DEPOT as needed)
CRAFT_PLANNER  must not import  WEAPON_INVENTORY
```

Planner stays free of inventory coupling. Integration is **composition at the host**.

## Craft completion → inventory

**Trigger:** When the planner marks craft complete (`finishCraft()` → `isCraftComplete === true`), the **host** (or a small `components/` bridge **not** inside `modules/WEAPON_INVENTORY` if you prefer) must:

1. Read current `plan`, run or reuse **`calculateForecast(plan, recipes)`** (from CRAFT_PLANNER public/lib surface).
2. Compute **quality** and **profile** (same helpers as planner: `calculateQuality`, `determineProfile` on forecast stats).
3. Roll up **total war-soul affinity** per rules in `02-domain-model.md`.
4. Build `CraftCompletionPayload` and call **`commitWeaponFromCraftCompletion`** then **`useWeaponInventoryStore.getState().addWeapon(record)`** (or equivalent).

**Implementation note:** Today `finishCraft` is invoked inside `use-craft-timeline-simulator.ts` (CRAFT_PLANNER). Preferred monorepo evolution:

- **Option A (recommended):** Extend planner with an **optional global callback** registered once from the host: `setCraftCompleteListener((ctx) => void)` living in `craft-planner` **without** importing WEAPON_INVENTORY — the host registers a function that calls inventory.
- **Option B:** Host `useEffect` watches `isCraftComplete` transition `false → true` and runs the same payload build (duplicate path; keep one helper in `components/`).

## Depot consumption at craft **start**

**Product rule:** Starting craft consumes **structural materials** (and relevant consumables if required) from RESOURCE_DEPOT at **`startCraft`**, not at completion.

- **WEAPON_INVENTORY** does not own depot writes; **orchestration** is host + planner + depot:
  - On **`startCraft`**, host/planner path should call depot `consume` / reserve APIs for all `mat-*` / `con-*` implied by the plan (exact rules in depot engine).
- This doc pack requires **one coordinated integration task** with RESOURCE_DEPOT and CRAFT_PLANNER so duplicate spend does not occur.

## Inventory tab

Host **`skin-shell`** (or equivalent) adds a tab **Inventory** mounting only `@weapon-inventory/index` public component, same pattern as Resource Depot.
