> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Phase 5 Bootstrap Map

## Goal
Map the active back-office frontend boot/init layer before structural cleanup. This document excludes the public website template and only covers the internal back-office app.

## Scope
- `/src/pages/dashboard.html`
- `/src/main.js`
- `/src/scripts/main.js`
- `/src/scripts/tabs.js`
- directly connected page owners and boot helpers that affect dashboard, reservations, and projects

## Active Page Ownership Map

| Page | HTML module entrypoints | Effective bootstrap owner | Notes |
| --- | --- | --- | --- |
| `src/pages/dashboard.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `src/main.js`, `customers.js`, `technicians.js` | `src/main.js` | `customers.js` and `technicians.js` are redundant direct module tags because `src/main.js` already imports `customers.js`, and `tabs.js` imports `technicians.js`. |
| `src/pages/projects.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `translations/projects.js`, `customers.js`, `technicians.js`, `projects.js`, `projectsReports.js` | Split ownership between `src/scripts/projects.js` and `src/scripts/projectsReports.js` | `projects.js` owns page shell, reservations modal wiring, and projects UI. `projectsReports.js` self-boots on `DOMContentLoaded` for the reports subtab. `customers.js` and `technicians.js` currently act as side-loaders for shared in-memory data used by project selects. |
| `src/pages/home.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `home.js` | `src/scripts/home.js` | Page owner performs theme/shell init at module top level. |
| `src/pages/users.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `translations/users.js`, `users.js` | `src/scripts/users.js` | Self-owned page bootstrap. |
| `src/pages/customer.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `translations/projects.js`, `translations/customer.js`, `customerPage.js` | `src/scripts/customerPage.js` | Shell and page-specific modal wiring live in the page module. |
| `src/pages/technician.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `translations/customer.js`, `translations/projects.js`, `translations/technician.js`, `technicianPage.js` | `src/scripts/technicianPage.js` | Shell and page-specific modal wiring live in the page module. |
| `src/pages/login.html` | `loginPage.js` | `src/scripts/loginPage.js` | Clean single-page owner. |
| `src/pages/notifications.html` | `language.js`, `translations/common.js`, `translations/notifications.js`, `notifications.js` | `src/scripts/notifications.js` | Self-owned page bootstrap. |
| `src/pages/site-analytics.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `siteAnalytics.js` | `src/scripts/siteAnalytics.js` | Self-owned page bootstrap. |
| `src/pages/contact-inquiries.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `contactInquiries.js` | `src/scripts/contactInquiries.js` | Self-owned page bootstrap. |
| `src/pages/feedback-submissions.html` | `language.js`, `translations/common.js`, `translations/dashboard.js`, `feedbackSubmissions.js` | `src/scripts/feedbackSubmissions.js` | Self-owned page bootstrap. |

## Dashboard Boot Chain

### Primary order
1. `dashboard.html` loads translation modules plus `/src/main.js`.
2. `src/main.js` applies theme immediately.
3. `initApp()` runs after `DOMContentLoaded` or immediately if the DOM is already ready.
4. `initApp()` checks auth, initializes the dashboard shell, restores any reservation draft, calls `setupTabs()`, initializes customers, theme toggle, equipment rendering, package manager, enhanced selects, and modal accessibility helpers.
5. `tabs.js` owns active dashboard tab activation and lazy-loads reservations, maintenance, calendar, and reports.
6. Feature modules with their own `DOMContentLoaded` handlers still self-bind inside the same page lifecycle.

### Dashboard dependencies
- `src/main.js` statically imports:
  - `auth.js`
  - `tabs.js`
  - `customers.js`
  - `equipment.js`
  - `equipmentPackagesManager.js`
  - `storage.js`
  - `theme.js`
  - `dashboardShell.js`
  - UI helpers
  - reservation UI bridge helpers
- `src/scripts/tabs.js` statically imports:
  - `customers.js`
  - `equipment.js`
  - `technicians.js`
  - `preferencesService.js`
- `tabs.js` lazy-loads:
  - `reports.js`
  - `reservationsUI.js`
  - `calendar.js`
  - `maintenance.js`

## Duplicate Init Map

### Confirmed duplicate or confusing paths
- `src/pages/dashboard.html` directly loads `customers.js` even though `src/main.js` already imports it.
- `src/pages/dashboard.html` directly loads `technicians.js` even though `src/main.js -> tabs.js` already imports it.
- `src/scripts/main.js` is a legacy dashboard bootstrap that is no longer referenced by any page, but it still looks like a valid entrypoint and overlaps conceptually with `src/main.js`.

### Confirmed split ownership
- `src/pages/projects.html` is not owned by one entrypoint. `projects.js` and `projectsReports.js` both initialize themselves on the same page.

### Confirmed self-boot feature modules
- `src/scripts/customers.js` registers `DOMContentLoaded` listeners and refreshes customer data itself.
- `src/scripts/technicians.js` registers `DOMContentLoaded` listeners and refreshes technician data itself.
- `src/scripts/projectsReports.js` self-boots on `DOMContentLoaded`.

## Tab Initialization Chain

### Main dashboard tabs
- `src/main.js` calls `setupTabs()`.
- `tabs.js` reads cached/local/remote tab preferences.
- `tabs.js` decides the active tab from URL hash, remote preferences, local storage, existing active button, then fallback order.
- `tabs.js` dispatches `dashboard:tabChanged` on tab activation.
- `tabs.js` lazily initializes reservations, maintenance, and reports.

### Reservation subtabs
- `tabs.js` owns reservation subtab activation and persistence.
- `tabs.js` loads `reservationsUI.js` lazily and tries:
  - `setupReservationEvents()`
  - `renderReservations()`
  - `initializeReservationUI()`

## Shared-State Touchpoints In Target Area

- `src/scripts/storage.js`
  - global in-memory store on `window.__APP_DATA_STORE__`
  - still supports one-time legacy data migration from `window.__LEGACY_DATA__`
- `src/scripts/preferencesService.js`
  - stores tab/subtab state in memory, local storage, and the API
- `src/scripts/tabs.js`
  - owns persisted dashboard tab state and emits `dashboard:tabChanged`
- `src/scripts/reservations/uiBridge.js`
  - exposes reservation UI handlers through a shared event-target bridge

## Suspected Hidden Coupling

- `customers.js` and `technicians.js` are both feature modules and implicit data loaders.
- the projects page currently depends on customer/technician modules indirectly for shared store hydration, not just UI behavior
- `tabs.js` owns visible dashboard tab state, but feature modules still bind themselves independently on `DOMContentLoaded`
- legacy `src/scripts/main.js` increases confusion because its responsibilities overlap with `src/main.js`, even though it is not active

## Legacy Bootstrap Status: `src/scripts/main.js`

### Reference status
- no current back-office HTML page references `src/scripts/main.js`
- no active source module imports `src/scripts/main.js`
- the active dashboard page references `/src/main.js`, not `/src/scripts/main.js`

### Reachability
- not reachable through the current internal page graph
- still present on disk as a plausible module path, which creates maintenance ambiguity

### Former responsibility overlap
- theme application
- auth check
- tab setup
- maintenance/reports init
- logout binding
- equipment upload wiring
- polling/status sync

### Current resolution
- `src/scripts/main.js` should not remain a second independent dashboard bootstrap
- safest treatment is a compatibility shim that delegates to `src/main.js`
- this preserves accidental legacy imports without keeping parallel bootstrap logic alive

### Risk if left unresolved
- future developers may patch the wrong bootstrap file
- legacy logic can drift from the real dashboard owner
- accidental reactivation would reintroduce hidden double-init behavior

## Recommended Low-Risk Cleanup Order

1. Remove dashboard-only redundant module tags for `customers.js` and `technicians.js` from `dashboard.html`.
2. Verify dashboard behavior with local smoke plus tab-focused tests.
3. Mark `src/scripts/main.js` as legacy in documentation and confirm it is not referenced anywhere before either archiving or deleting it in a later pass.
4. In a later pass, isolate the projects page split ownership between `projects.js`, `projectsReports.js`, and the customer/technician side-loaders without changing project workflows.

## What Must Not Change In This Pass
- user-facing dashboard behavior
- reservation, customer, technician, or project workflows
- global/shared state model beyond clarifying ownership
- navigation structure or UX design
- anything in `Arino - Template/`
