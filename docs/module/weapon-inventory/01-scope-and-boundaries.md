# Scope and boundaries

## In scope (v1)

- **One craft → one inventory row** with a **stable unique weapon ID** (extensible schema for future properties).
- **Automatic add** when craft **completes** (after timeline / `finishCraft` path), using **step-7 summary data** (plan + forecast-derived stats).
- **Weapon card UI** (Inventory tab):
  - **Damage (attack)** emphasized; **durability**, **weight**.
  - **War soul** block: soul power points + **tier** (tier from **total war-soul affinity** accumulated during craft — tier table is product data, see `02-domain-model.md`).
  - **Visible tags:** weapon profile / style tags (e.g. balanced, piercing — aligned with planner profile logic).
  - **Quality** (planner quality bands).
  - **Expandable bottom block — “hidden” / detail tags:** list grows over time; v1 must include **structural materials used** (as tags / labels), derived from part → `materialId` selections.
- **Naming system:** base + prefix + suffix (+ optional extra modifier), computed from weapon properties and applied techniques (exact rules implemented in module; pipeline described in `02-domain-model.md`).
- **Depot:** **Materials are consumed from RESOURCE_DEPOT at craft start** (design intent for main app; standalone may stub depot until integration).

## Out of scope (explicit)

- **Repair / reforge** → `WEAPON_MAINTENANCE` (or future module), not this package.
- Equipment slots, loadouts, trading, durability loss in combat — future unless explicitly added later.
- Full combat simulation.

## Integration roles (names only)

- **Host:** Next.js shell; adds **Inventory** tab; wires craft completion to inventory **without** making CRAFT_PLANNER depend on WEAPON_INVENTORY.
- **Craft Planner:** Produces `CraftPlan`, forecast (`calculateForecast`), quality/profile; completes craft via `finishCraft`.
- **Resource Depot:** Stock and consumption for materials at craft **start**.
- **Weapon Inventory:** Owns weapon entities, persistence (v1: client), inventory UI.
