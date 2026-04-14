# Risks and edge cases

1. **Double add:** If both a store listener and `finishCraft` fire twice, guard with idempotency key (e.g. one commit per `startCraft` session id) — **open:** add `craftSessionId` to planner when integrating.
2. **Craft cancel:** `resetCraft` after start — must **refund** depot materials if they were consumed at start; define paired transaction in host (out of WEAPON_INVENTORY v1 scope but blocked if not designed).
3. **Forecast drift:** If planner formulas change, old cards stay on snapshot — acceptable for v1; document in README.
4. **Affinity formula:** Must be specified precisely before tier table balancing; add Vitest with fixed plan fixtures.
5. **Standalone vs monorepo:** Standalone kit mocks `calculateForecast` or imports planner as git submodule only if license/structure allows — prefer **copy minimal DTO types** and fake forecast in kit tests.
