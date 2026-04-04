# Art Ratio V2 — Session Handover (April 2026)

## Project Overview

Back-office production management app (Art Ratio). PHP backend, vanilla JS frontend, Vite build pipeline.
Primary goal: improve and unify the UI without breaking existing behavior, workflows, permissions, or data flow.

---

## Master Plan Status (Phases A–G)

| Phase | Description | Status |
|-------|-------------|--------|
| A | Security hardening | Not started |
| B | CSS token / brand finish | Not started |
| C | DB migration tracking | Not started |
| D | Test coverage (unit tests) | **Tier 1 + Tier 2 complete** — Tier 3 (DOM/E2E) deferred |
| E | JS refactoring (monolith splits) | **3 largest files done**; 16 files remain |
| F | PHP service layer (SQL → repositories) | **Next major phase** |
| G | TypeScript migration | Future |

Full audit doc: `memory/project_master_plan_2026.md`

---

## Phase E — JS Refactoring Completed

### File 1: `src/scripts/reservations/reservationPdf.js`
Split into modules under `src/scripts/reservations/pdf/`:
- `state.js` — shared mutable state object
- `config.js` — section/field defs, quote config
- `financial.js` — formatMoney, formatCurrencyValue, companyShare helpers, getProjectExpensesTotal
- `toggle-prefs.js` — quote toggle preferences (localStorage)
- `builder.js` — PDF HTML assembly
- `renderer.js` — PDF rendering entry

### File 2: `src/scripts/reservations/createForm.js` (3,662 → 147 lines)
Split into modules under `src/scripts/reservations/create/`:
- `state.js` — 10 mutable module-level variables as `export const state = { ... }`
- `draft.js` — draft persistence: collect, persist, clear, restore
- `customer-project.js` — customer/project DOM helpers, autocomplete, option maps, tax state sync
- `equipment.js` — equipment search/description/barcode/status/selection
- `packages-items.js` — package population/add/conflict, renderReservationItems, renderDraftReservationSummary
- `submit.js` — form submit, recover-after-abort, finalizeReservationCreate, reset, button setup

The thin entry `createForm.js` re-exports all 15 public exports and contains `initCreateReservationForm`, `refreshCreateReservationForm`, and event listeners.

### File 3: `src/scripts/reservationsService.js` (3,282 → 8 lines)
Split into modules under `src/scripts/reservations/service/`:
- `utils.js` — pure utilities: sanitizePriceValue, toNumber, toPositiveInt, normalizeStatusValue, normalisePaidStatus, normalizeReservationItemType, normalizeBarcodeValueLoose, normalizePackageIdentifier, resolveEquipmentIdValue
- `cache.js` — 3 cache systems (packages, crew, item-cost)
- `payment.js` — payment history: normalizePaymentHistoryCollection, normalizePaymentType, extractPaymentHistoryFromCandidates
- `packages.js` — all package normalization: dedupePackages, mergePackageCollections, mergePackageRecords, normalizePackageItemRecord, mapReservationPackagesFromSource, normalizeItemsWithPackages, etc.
- `mapping.js` — data mapping: normalizeCrewAssignmentEntry, mapReservationItem, toInternalReservation, mapLegacyReservation, mapReservationFromApi, buildReservationPayload
- `api.js` — reservationsState, getReservationsState, setReservationsState, all CRUD ops

The thin entry `reservationsService.js` re-exports everything.

---

## Phase E — Remaining Large Files (not yet split)

These files are over 1,000 lines but were deferred. Do them in Phase E continuation before Phase F if desired:

| File | Lines |
|------|-------|
| `src/scripts/projects/templatesTab.js` | ~3,787 |
| `src/scripts/projects/projectDetails.js` | ~2,556 |
| `src/scripts/equipment.js` | ~2,365 |
| `src/scripts/projectsReports.js` | ~2,051 |
| `src/scripts/reservationsEdit.js` | ~1,824 |
| `src/scripts/reservations/editForm.js` | ~1,578 |
| `src/scripts/projects/form.js` | ~1,555 |
| `src/scripts/maintenance.js` | ~1,508 |
| `src/scripts/customerPage.js` | ~1,492 |
| `src/scripts/customerDetails.js` | ~1,461 |
| `src/scripts/technicians.js` | ~1,456 |
| `src/scripts/technicianPage.js` | ~1,402 |
| `src/scripts/notifications.js` | ~1,379 |
| `src/scripts/reservations/list/details.js` | ~1,345 |
| `src/scripts/reservationsTechnicians.js` | ~1,322 |
| `src/scripts/projects/view.js` | ~1,261 |

---

## Phase D — Tests Added This Session

**Test count progression:**
- Session start: 334 tests
- After Tier 1: 617 tests
- After Tier 2: 779 tests

**New test files created:**

### Tier 1 (pure functions, no DOM)

| File | Tests | What is tested |
|------|-------|----------------|
| `tests/reservations/service/utils.test.js` | 20 | sanitizePriceValue, toNumber, toPositiveInt, normalizeStatusValue, normalisePaidStatus, normalizeReservationItemType, normalizeBarcodeValueLoose, normalizePackageIdentifier |
| `tests/reservations/service/payment.test.js` | 35 | normalizePaymentType, extractPaymentHistorySource, extractPaymentHistoryFromCandidates, normalizePaymentHistoryCollection |
| `tests/reservations/service/packages.test.js` | 69 | dedupePackages, derivePackageMergeKey, mergePackageItemCollections, mergePackageCollections, normalizePackageItemRecord, mergePackageRecords, resolvePackageMergeKey |
| `tests/reservations/service/mapping.test.js` | 35 | normalizeCrewAssignmentEntry, mapReservationItem, toInternalReservation, mapLegacyReservation |
| `tests/reservations/reservationsShared.test.js` | 38 | parsePriceValue, sanitizePriceValue, normalizeText, groupReservationItems, resolveReservationItemGroupKey, resolveEquipmentIdentifier |
| `tests/reservations/pdf/financial.test.js` | 39 | formatMoney, formatCurrencyValue, formatPercentageValue, isCompanyShareEnabledForState, isTaxEnabledForShare, resolveCompanySharePercentFromState, getProjectExpensesTotal, calculateProjectDurationDays |

### Tier 2 (slightly more complex, still unit-testable)

| File | Tests | What is tested |
|------|-------|----------------|
| `tests/technicians/techniciansService.test.js` | 29 | getTechniciansState, setTechniciansState, mapTechnicianFromApi, mapLegacyTechnician, buildTechnicianPayload, isApiError |
| `tests/reservations/service/cache.test.js` | 23 | hasRichCrewData, inferPackagesFromItems, getCachedReservationCrew, getCachedReservationPackages, getCachedReservationItemCosts, syncReservationItemCostCache |
| `tests/reservations/pdf/toggle-prefs.test.js` | 21 | getTogglePrefsStorageKey, collectSelectionIds, serializeQuoteToggleState, clearLegacyQuotePreferences |
| `tests/reservations/pdf/config.test.js` | 43 | getQuoteSectionDefs, getQuoteFieldDefs, getQuoteSectionIdSet, buildDefaultFieldSelections, cloneFieldSelections, getFieldSelectionSet, isFieldEnabledInSelections, buildDefaultSectionExpansions, isSectionExpanded, ensureSectionExpansionState, getQuoteStatusMessage, getQuoteConfig |
| `tests/reservations/summary.test.js` | 51 | calculateReservationTotal (existing), calculateReservationDays, calculatePaymentProgress, determinePaymentStatus, calculateDraftFinancialBreakdown (all expanded) |

**Current suite:** 779 passing, 6 skipped (integration tests requiring env vars), 0 failing — 38 test files total.

---

## Key Architectural Patterns Established

### 1. Shared mutable state pattern
All module-level variables are grouped into a single `export const state = { ... }` object. Sub-modules import `{ state }` from `./state.js` and mutate via `state.xxx = ...`. This avoids ES module live-binding issues when splitting monoliths.

```js
// create/state.js
export const state = {
  afterSubmitCallback: null,
  cachedProjects: [],
  customerOptionMap: new Map(),
  // ...
};
```

### 2. Import path depth
Files in `create/` or `service/` subdirectories need `../../` to reach `src/scripts/` level:
- `../../storage.js` (not `../storage.js`)
- `../../reservationsTechnicians.js` (not `../reservationsTechnicians.js`)
- `../../reservationsShared.js`

### 3. `setMappingStateGetter(fn)` — circular dependency pattern
`service/mapping.js` needs access to `reservationsState` owned by `service/api.js`. Direct import would create a circular init-time dependency. Solution: `api.js` calls `setMappingStateGetter(getReservationsState)` after declaring the state variable. `mapping.js` uses the injected getter.

```js
// In mapping.js
let _getState = () => [];
export function setMappingStateGetter(fn) { _getState = fn; }

// In api.js (after declaring reservationsState)
import { setMappingStateGetter } from './mapping.js';
setMappingStateGetter(getReservationsState);
```

### 4. Vitest mocking conventions
- All `vi.mock()` calls must be at the top of the file (Vitest hoists them)
- For modules with module-level cache (like `config.js`), use `vi.resetModules()` in `beforeEach` and dynamic `await import()` per test
- Mock `normalizeItemsWithPackages` to return `{ items: items || [], packages: [] }`, NOT just the array

---

## Known Gotchas

### Import paths in sub-modules
`getSelectedCrewAssignments` is always in `../../reservationsTechnicians.js` — never in `../state.js` (reservations/state.js). This caught a runtime error during the createForm split.

### `toInternalReservation(null)` throws
Default parameter `= {}` only applies to `undefined`, not `null`. Don't test with `null` input.

### `formatPercentageValue(null)` returns `'0.00%'`
`Number(null)` = 0, which is finite, so the function formats it as `'0.00%'`. Only `undefined`/`NaN`/non-numeric strings return `'0%'`.

### `mapTechnicianFromApi` vs `mapLegacyTechnician`
`mapTechnicianFromApi` only reads `raw.full_name` (snake_case). `mapLegacyTechnician` also handles `raw.fullName` (camelCase) because it passes the full raw object through. Tests for `fullName` resolution must use `mapLegacyTechnician`, not `mapTechnicianFromApi`.

### `sanitizePriceValue` floating-point
`Number(42.555).toFixed(2)` returns `"42.55"` (not `"42.56"`) due to IEEE 754. Test with clean values like `42.55`.

### Config cache isolation
`QUOTE_CONFIG_CACHE` is a module-level Map in `pdf/config.js`. Each test that needs a cold cache must call `QUOTE_CONFIG_CACHE.clear()` in `beforeEach`, OR use `vi.resetModules()` with dynamic `await import()`.

---

## Phase F — Next Steps (PHP Service Layer)

Goal: extract raw SQL from API endpoint files into repository classes; add lightweight router with auth middleware.

Files to target:
- `backend/api/customers/index.php`
- `backend/api/equipment/index.php`
- `backend/api/projects/index.php`
- `backend/api/reservations/index.php`
- `backend/api/technicians/index.php`

Pattern to introduce:
- `backend/repositories/CustomerRepository.php` (findAll, findById, create, update, delete)
- `backend/repositories/ReservationRepository.php`
- etc.
- `backend/Router.php` — simple regex router
- `backend/middleware/AuthMiddleware.php` — session/token check

---

## Running Tests

```bash
# All tests
npx vitest run

# Specific file
npx vitest run tests/reservations/service/utils.test.js

# Watch mode
npx vitest
```

---

## Memory Files

- `memory/project_master_plan_2026.md` — full audit + phased plan A–G
- `memory/project_ui_refactor_plan.md` — earlier 8-phase CSS plan (superseded)
- `memory/project_brand_state.md` — brand rollout state
