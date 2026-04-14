# Public API (target)

All host-facing exports from `modules/WEAPON_INVENTORY/src/index.ts` (monorepo). Standalone repo mirrors the same surface where possible.

## Required exports (v1)

| Symbol | Role |
|--------|------|
| `MODULE_ID` | `'weapon-inventory'` |
| `commitWeaponFromCraftCompletion(payload: CraftCompletionPayload) => WeaponRecord` | Pure-ish core: builds record + assigns `weaponId`; **does not** persist (caller or store persists). |
| `useWeaponInventoryStore` (Zustand) | List of weapons, `addWeapon`, persistence slice name TBD |
| `WeaponInventoryModule` or `WeaponInventoryPanel` | Client UI for Inventory tab |
| Types: `WeaponRecord`, `CraftCompletionPayload`, `WarSoulTier` | Exported for host wiring tests |

## CraftCompletionPayload (sketch)

Serializable fields needed to render the card and naming (exact TypeScript in implementation):

- `recipeId`, `CraftPlan` (or JSON-safe subset)
- Final `Forecast` or pre-computed `Record<StatKey, { min, max }>` / mids
- `quality: Quality`, `profile: WeaponProfile` (or tag ids)
- `structuralMaterialIds: string[]` (ordered or per-part map)
- `totalWarSoulAffinity: number` (precomputed by caller or recomputed in commit — **one owner**)
- Optional: `completedAt: number` (epoch ms)

**Caller responsibility:** Host (or thin adapter next to planner) builds this payload from `useCraftPlannerStore` + `calculateForecast` + affinity rollup at the moment craft completes.
