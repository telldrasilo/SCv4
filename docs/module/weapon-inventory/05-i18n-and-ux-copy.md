# i18n and UX copy

Per SwordCraft rules:

- **Player-visible strings:** Russian.
- **Code comments, maintainer docs, this pack:** English.

## UI areas

- Tab label: **Инвентарь** (or agreed RU label).
- Card: stat labels (attack emphasized), war soul labels, tier label, quality label, profile tags, expandable “materials used” header.
- Empty state when no weapons.

## Data-driven names

- Weapon **display name** (RU) from naming pipeline.
- Material tags on card: use locale-aware names (`nameRU` / `nameEN`) consistent with RESOURCE_DEPOT when integrated; standalone kit may use stub dictionary.

## Technique / profile tags

Reuse planner profile semantics; RU strings may match existing planner copy where applicable to avoid cognitive drift.
