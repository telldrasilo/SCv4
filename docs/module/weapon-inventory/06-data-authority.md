# Data authority

| Data | Single writer | Consumers | Notes |
|------|---------------|-----------|--------|
| Weapon records (instances) | WEAPON_INVENTORY store | Host UI, future maintenance/combat | Snapshot stats at craft completion |
| `weaponId` generation | WEAPON_INVENTORY (`commitWeaponFromCraftCompletion`) | Persistence, future systems | |
| Craft plan + forecast math | CRAFT_PLANNER | Host bridge builds payload | Inventory stores **snapshot**, not live recompute (v1) |
| Depot stock (`mat-*` / `con-*`) | RESOURCE_DEPOT | Planner + host consumption on craft start | |
| War soul **tier thresholds** | WEAPON_INVENTORY constants (v1) | Card UI | Tune with game design |
| Naming rules | WEAPON_INVENTORY pure module | Card title | |

**Derived (do not edit manually elsewhere):**

- Material tag list on card → derived from `plan.selectedMaterials`.
- Profile/quality tags → derived from forecast at completion time.
