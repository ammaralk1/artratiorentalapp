# Art Ratio V2 — Session Handover (April 2026)

## Project Overview

Back-office production management app (Art Ratio). PHP backend, vanilla JS frontend, Vite build pipeline.
Primary goal: improve and unify the UI without breaking existing behavior, workflows, permissions, or data flow.

---

## Master Plan Status (Phases A–G)

| Phase | Description | Status |
|-------|-------------|--------|
| A | Security hardening | ✅ Done |
| B | CSS token / brand finish | ⚠️ Partial — Tailwind v4 upgrade remaining |
| C | DB migration tracking | ✅ Done |
| D | JS test coverage | ✅ Done |
| E | JS refactoring (monolith splits) | ⚠️ Partial — 4 large files remaining |
| F | PHP service layer (SQL → repositories) | ✅ Done |
| G | TypeScript migration | ✅ Foundation set — incremental going forward |

Full audit and phased plan: `memory/project_master_plan_2026.md`

Current branch: `phase-0-environment-control`

---

## Phase A — Security Hardening ✅ Done

Commit: `a7f5c67e`

All five audit findings resolved:

- **Exception detail stripped** from all ~30 API 500 responses — `error_log()` only, nothing in the JSON response body
- **`health.php` secured** — `requireAuthenticated()` added; DB error detail removed from response
- **Telegram webhook** — `secret_token` is now mandatory; all requests rejected if not configured in `config.php`
- **SameSite** — changed from `Lax` to `Strict` in `backend/bootstrap/environment.php`
- **X-Forwarded-For** — only trusted when `REMOTE_ADDR` matches `security.trusted_proxy_ips` in config; default is no trusted proxies
- **Rate limiting** — added to public form endpoints (contact, feedback, equipment-requests) via `backend/bootstrap/ratelimit.php`

---

## Phase B — CSS ⚠️ Partial

- ✅ All 5 remaining `#4c6ef5` color literals replaced
- ❌ **DaisyUI v5 / Tailwind v3 mismatch** — still on `tailwindcss@^3.4.14`; DaisyUI v5 requires Tailwind v4. This is the only remaining item in Phase B. Do it on its own branch with full UI regression testing after.

---

## Phase C — DB Migration Tracking ✅ Done

Commit: `9e8c13b7`

**Migration runner:** `backend/tools/migrate.php`

```bash
php backend/tools/migrate.php --status     # show applied vs pending
php backend/tools/migrate.php              # apply all pending
php backend/tools/migrate.php --dry-run    # preview without running
php backend/tools/migrate.php --baseline   # mark all existing files applied (first-time setup on existing DB)
```

- Tracks applied migrations in a `schema_migrations` table (auto-created)
- Runs SQL files in `backend/sql/` in alphabetical order
- Safety guard: if table is empty and >5 files are pending, stops and prompts for `--baseline` or `--force`
- **Naming convention for new migrations:** `YYYYMMDD_description.sql` (e.g. `20260404_add_equipment_status_column.sql`)

**Seed data separation:**
- `backend/seeds/dev_sample_data.sql` — uses `DROP TABLE`, local dev only, never a tracked migration
- Docker stack mounts `backend/seeds/` separately so the init script still finds it

---

## Phase D — JS Test Coverage ✅ Done

**Test counts:** 785 total — **779 passing, 6 skipped** (integration tests requiring Docker env — pre-existing skip)

Test directories covering all previously-untested modules:

| Directory | What it covers |
|-----------|---------------|
| `tests/apiClient/` | apiClient request/retry/error handling |
| `tests/auth/` | auth session checks |
| `tests/customers/` | pagination helpers |
| `tests/equipment/` | status sync, pagination |
| `tests/maintenance/` | maintenanceService |
| `tests/projects/` | projectsService |
| `tests/technicians/` | techniciansService, pagination |
| `tests/reservations/service/` | utils, cache, payment, packages, mapping |
| `tests/reservations/pdf/` | financial, config, toggle-prefs |
| `tests/reservations/` | summary, pdf, shared, editForm, list |
| `tests/reports/` | calculations, maintenance-and-breakdowns |

---

## Phase E — JS Refactoring ⚠️ Partial

### Completed splits

**`src/scripts/reservations/reservationPdf.js`** (7,069 lines) → `src/scripts/reservations/pdf/`:
`state.js`, `config.js`, `constants.js`, `financial.js`, `toggle-prefs.js`, `assets.js`,
`data-collection.js`, `layout.js`, `html-builder.js`, `renderer.js`, `modal.js`, `utils.js`, `checklist.js`

**`src/scripts/reservations/createForm.js`** (3,662 lines) → `src/scripts/reservations/create/`:
`state.js`, `draft.js`, `customer-project.js`, `equipment.js`, `packages-items.js`, `submit.js`, `debug.js`

**`src/scripts/reservationsService.js`** → `src/scripts/reservations/service/`:
`utils.js`, `cache.js`, `payment.js`, `packages.js`, `mapping.js`, `api.js`

### Remaining large files (not yet split)

| File | Lines | Notes |
|------|-------|-------|
| `src/scripts/projects/templatesTab.js` | 3,787 | Biggest remaining file |
| `src/scripts/projects/projectDetails.js` | 2,556 | |
| `src/scripts/equipment.js` | 2,365 | |
| `src/scripts/maintenance.js` | 1,508 | |

### Key patterns established during Phase E splits

**Shared mutable state:** module-level variables grouped into a single exported object to avoid ES module live-binding issues:
```js
// create/state.js
export const state = { afterSubmitCallback: null, cachedProjects: [], ... };
// sub-modules mutate via: state.xxx = ...
```

**Circular dependency injection:** when `mapping.js` needs state owned by `api.js`, use a setter rather than a direct import:
```js
// mapping.js
let _getState = () => [];
export function setMappingStateGetter(fn) { _getState = fn; }
// api.js calls setMappingStateGetter(getReservationsState) after declaring state
```

**Import path depth:** files inside `create/` or `service/` need `../../` to reach `src/scripts/`:
- `../../storage.js`, `../../reservationsTechnicians.js`, `../../reservationsShared.js`

---

## Phase F — PHP Service Layer ✅ Done

Commits: `bb7a8f04`, `25fbd6fc`

### Repositories (`backend/repositories/`)

All extend `BaseRepository` (shared PDO constructor, `lastInsertId`, `tableExists`):

| Repository | Key methods beyond CRUD |
|------------|------------------------|
| `CustomerRepository` | `exists` |
| `EquipmentRepository` | `findByBarcode`, `bulkCreate`, `deleteAll` |
| `ProjectRepository` | `generateCode`, `codeExists`, `syncTechnicians`, `syncEquipment`, `syncExpenses`, `syncPayments` |
| `ReservationRepository` | `generateCode`, `codeExists`, `syncTechnicians`, `syncItems`, `syncPackages`, `syncPayments` |
| `TechnicianRepository` | `exists` |

**PHP test suite:** `tests/php/repositories/` — **101 tests, 207 assertions, all passing**

Run with: `php vendor/bin/phpunit`

### Endpoint wiring

Write path goes through repositories. Complex read/schema-detection logic stays with PDO:

| Endpoint | Repo used | PDO kept for |
|----------|-----------|-------------|
| `backend/api/customers/index.php` | `CustomerRepository` | — |
| `backend/api/equipment/index.php` | `EquipmentRepository` | SHOW COLUMNS detection in GET |
| `backend/api/projects/index.php` | `ProjectRepository` | fetchProject*, tableColumnExists, customer/tech/equipment exists checks |
| `backend/api/reservations/index.php` | `ReservationRepository` | upsertReservationItems/Packages, fetchReservation*, decorateReservation |
| `backend/api/technicians/index.php` | `TechnicianRepository` | SHOW COLUMNS + telegram link detection in GET |

### Router and AuthMiddleware

`backend/Router.php` — lightweight regex router, loaded globally via `bootstrap/autoload.php`
`backend/middleware/AuthMiddleware.php` — wraps `requireAuthenticated()` / `requireRole()`

All 5 wired endpoints now use:
```php
AuthMiddleware::authenticated();
(new Router($_SERVER['REQUEST_METHOD'] ?? 'GET', $_SERVER['REQUEST_URI'] ?? '/'))
    ->get('/api/xxx',    fn() => handleXxxGet(...))
    ->post('/api/xxx',   fn() => handleXxxCreate(...))
    ->put('/api/xxx',    fn() => handleXxxUpdate(...))
    ->patch('/api/xxx',  fn() => handleXxxUpdate(...))
    ->delete('/api/xxx', fn() => handleXxxDelete(...))
    ->dispatch();
```

The remaining ~25 backend API files still use `switch ($method)` — they can be migrated opportunistically when next touched.

---

## Phase G — TypeScript Foundation ✅ Set

Commit: `4b02f9ae`

- `typescript@^6` installed as dev dependency
- `tsconfig.json` added: `strict: true` for `.ts` files, `allowJs: true` + `checkJs: false` so all existing `.js` files are unaffected
- `tsc --noEmit` passes clean (zero errors baseline)
- **Rule in `CLAUDE.md`:** any new `src/scripts/` file must be `.ts`; existing `.js` converts when next touched for a real change; no implicit `any`; API response shapes need explicit types

---

## What Remains

| Phase | Item | Effort |
|-------|------|--------|
| B | Tailwind v3 → v4 upgrade (DaisyUI v5 requires it) | ~1 day |
| E | Split 4 remaining large JS files (templatesTab, projectDetails, equipment, maintenance) | ~1 week |
| G | TypeScript migration — incremental, no dedicated sprint | ongoing |

**Recommended order:** Phase E first (low breakage risk), then Phase B on its own branch (CSS pipeline change, needs full UI regression test after).

---

## Running Tests

```bash
# JS tests
npx vitest run

# PHP tests
php vendor/bin/phpunit

# TypeScript type check
npx tsc --noEmit

# Migration status (requires config.php)
php backend/tools/migrate.php --status
```

---

## Memory Files

- `memory/project_master_plan_2026.md` — full audit + phased plan A–G with current status
- `memory/project_ui_refactor_plan.md` — earlier 8-phase CSS plan (superseded)
- `memory/project_brand_state.md` — brand rollout state
