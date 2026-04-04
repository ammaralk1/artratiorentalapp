# Phase 5 Customers Ownership Map

## Goal
Document how `src/scripts/customers.js` currently initializes, what it touches, and the smallest safe cleanup path for clarifying ownership without changing behavior.

## Current Init Chain

1. `src/scripts/customers.js` is imported by:
   - `src/main.js` on the dashboard page
   - `src/pages/projects.html` as a direct module side-loader
   - `src/scripts/tabs.js` for dashboard customer-tab rendering
2. On module evaluation, it hydrates initial customer state from the shared in-memory store.
3. It self-boots on `DOMContentLoaded`, where it:
   - wires form, cancel, search, document-preview, and table listeners
   - renders the customers table
   - refreshes customer language strings
   - fetches the customer list from the API
4. It listens for:
   - `language:changed`
   - `customers:refreshRequested`
   - `AUTH_EVENTS.USER_UPDATED`

## Side Effects List

- binds customer form submit and cancel logic
- binds customer search and table action listeners
- binds document upload and inline preview listeners
- fetches customers from the API
- writes normalized customer data back to the shared in-memory store
- emits `customers:changed` after create/update/delete flows

## Dependency List

### Direct imports
- `storage.js`
- `utils.js`
- `language.js`
- `apiClient.js`
- `auth.js`

### Cross-flow coupling
- projects:
  - `projects.html` imports `customers.js` directly so shared customer state is available to project flows
  - project forms listen to `customers:changed`
- dashboard:
  - `tabs.js` calls `renderCustomers()` when the customers tab is activated
- home/reports/details:
  - several modules listen to `customers:changed` for summaries and detail refreshes

## DOM Assumptions

Potentially present elements:
- `#customer-form`
- `#customer-id`
- `#customer-name`
- `#customer-phone`
- `#customer-email`
- `#customer-address`
- `#customer-company`
- `#customer-notes`
- `#customer-tax-id`
- `#customer-document`
- `#customer-document-name`
- `#customer-document-preview`
- `#submit-btn`
- `#customer-cancel-btn`
- `#customers-table`
- `#search-customer-input`

The module tolerates missing elements for rendering/setup, but it still owns startup and data refresh work even when only the shared state side-load is needed.

## Risk Summary

- risk level: Medium
- confirmed ambiguity before this pass:
  - imported by page owners and also self-booting
  - `initCustomers()` existed but did not own real startup
  - fetch ownership was implicit in the `DOMContentLoaded` path
- lower than technicians risk because:
  - there is no subtab system here
  - there is less cross-module operational logic than in technician status/positions flows

## Recommended Smallest Safe Cleanup Strategy

1. Introduce an explicit `initCustomersModule()` boundary.
2. Route `initCustomers()` through that explicit boundary for compatibility with current callers.
3. Keep a thin self-boot wrapper on `DOMContentLoaded` for current page compatibility and project-page side-loading.
4. Add idempotent listener guards where the current code assumed startup only happens once.

## Comparison To Technicians Pattern

- same pattern fit:
  - explicit init boundary
  - compatibility self-boot wrapper
  - keep current page graph working
- important difference:
  - `customers.js` is simpler and mostly form/table/list wiring, so the cleanup can stay smaller than the technicians pass
