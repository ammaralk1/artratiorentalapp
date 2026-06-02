> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Equipment Requests Portal QA

## Executive summary

This QA pass verifies the Equipment Requests portal as a standalone legacy-kept subsystem after bootstrap hardening.

The focus is narrow:

- direct local load behavior
- API base resolution
- auth/session checks
- admin/manager authorization behavior
- back-office entry links
- cache-busting of the portal script
- production-host assumption sanity

Current expected outcome:

- likely `safe as-is` if the page now resolves API calls to the documented local backend and role checks behave correctly
- `needs tiny stabilization patch` only if one exact state still points at the wrong origin, wrong redirect, or stale script path
- `needs later migration follow-up` only for broader subsystem architecture, not for this bootstrap batch

## Highest-risk checks

1. Local direct-load path
   - open `/Arino%20-%20Template/equipment-requests-portal.html`
   - confirm the page no longer tries `:5173/backend/api/auth/`

2. Auth status request
   - confirm the initial auth check goes to:
     - `http://127.0.0.1:8080/api/auth/`
   - not to:
     - same-origin `/backend/api/auth/`

3. Requests list request
   - confirm the first data load goes to:
     - `http://127.0.0.1:8080/api/equipment-requests/admin.php?...`

4. Back-office manager links
   - confirm the Equipment Requests links in back-office pages open the portal at:
     - `/Arino%20-%20Template/equipment-requests-portal.html`

5. Cache-bust/script freshness
   - confirm the page is loading:
     - `assets/js/equipment-requests-portal.js?v=20260402-portal11`

## Screen/state checklist

### 1. Local direct-load checks

Open:

- [`equipment-requests-portal.html`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html)

Verify:

- page shell renders
- body starts with `erp-auth-pending` and then clears after successful auth
- no network request is made to `http://127.0.0.1:5173/backend/api/auth/`
- first auth request goes to `http://127.0.0.1:8080/api/auth/`
- first requests-list call goes to `http://127.0.0.1:8080/api/equipment-requests/admin.php`

Fail conditions:

- any fetch still points to Vite origin `:5173/backend/api/...`
- page remains hidden after valid auth due to bootstrap mismatch

### 2. API/auth endpoint checks

Using browser DevTools network panel, verify:

- `GET /auth/` returns current user data
- credentials/cookies are sent with fetch
- `GET /equipment-requests/admin.php?limit=100...` returns list data
- no mixed-origin request is blocked by CSP or credentials policy

Expected endpoint pairing:

- auth source: [`backend/api/auth/index.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/auth/index.php)
- admin data source: [`backend/api/equipment-requests/admin.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/equipment-requests/admin.php)

### 3. Unauthorized / wrong-role redirect checks

Check three auth states:

1. No session
   - expected: redirect to `login.html`

2. Authenticated admin/manager
   - expected: portal opens and loads requests

3. Authenticated non-admin/non-manager
   - expected: toast shows admin-only access message
   - then redirect to `home.html`

Verify this matches:

- role gate in [`equipment-requests-portal.js`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/js/equipment-requests-portal.js)
- backend role requirement in [`admin.php`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/equipment-requests/admin.php)

### 4. Back-office entry-link checks

From these pages, click the Equipment Requests manager card/tab:

- [home.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/home.html)
- [contact-inquiries.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/contact-inquiries.html)
- [feedback-submissions.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/feedback-submissions.html)
- [site-analytics.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/site-analytics.html)

Verify:

- each opens `/Arino%20-%20Template/equipment-requests-portal.html`
- none opens template home/index
- none opens dashboard reservations
- portal then bootstraps against the correct API base

### 5. Hard-refresh / cache-bust checks

On the portal page:

- do a normal reload
- do a hard reload / empty-cache reload

Verify:

- browser requests `equipment-requests-portal.js?v=20260402-portal11`
- console/network no longer show an older portal script version
- no stale local bootstrap logic remains in page HTML

Fail condition:

- browser still executes an older cached script that resolves to `/backend/api` on local hosts

### 6. Production-assumption sanity checks

Static/code review sanity check:

- if `window.APP_API_BASE` is present, it wins
- on `art-ratio.com`, `www.art-ratio.com`, or subdomains, the script resolves to:
  - `https://api.art-ratio.com/backend/api`
- on unknown non-local, non-production hosts, fallback is:
  - `/backend/api`

Verify that the contract is now explicit in:

- [`equipment-requests-portal.js`](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/js/equipment-requests-portal.js)

### 7. Basic functional smoke after bootstrap

Once authenticated:

- requests table loads
- selecting a request loads details
- refresh button reloads data
- logout calls `DELETE /auth/` and returns to login

This confirms bootstrap/auth/load path, not full product QA.

## Bootstrap contract verification

Expected contract after the hardening batch:

1. `window.APP_API_BASE` override, if explicitly set, is used first
2. local hosts use:
   - `http://127.0.0.1:8080/api`
3. production hosts use:
   - `https://api.art-ratio.com/backend/api`
4. fallback for legacy same-origin deployments is:
   - `/backend/api`

Verification points:

- [equipment-requests-portal.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/assets/js/equipment-requests-portal.js)
  - `LOCAL_API_BASE`
  - `PRODUCTION_API_BASE`
  - `SAME_ORIGIN_API_BASE`
  - `resolveApiBase()`
- [equipment-requests-portal.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/Arino%20-%20Template/equipment-requests-portal.html)
  - only versioned script include remains
  - no duplicate inline local bootstrap override remains

## Pass/fail criteria

### Safe as-is

Classify as `safe as-is` if:

- local direct load hits `127.0.0.1:8080/api`
- no request hits `:5173/backend/api/...`
- admin/manager users can open and load the portal
- unauthorized and wrong-role redirects behave as expected
- all back-office entry links open the correct portal path
- hard refresh picks up `portal11`
- no remaining page/script bootstrap ambiguity is visible

### Needs tiny stabilization patch

Classify as `needs tiny stabilization patch` if exactly one narrow issue remains, for example:

- one redirect target is wrong
- one fetch still resolves to same-origin in one host case
- one stale script version/path is still referenced
- one local entry link still points at an old path

Patch scope should then be only:

- one selector/path/version/bootstrap branch

### Needs later migration follow-up

Classify as `needs later migration follow-up` only if:

- bootstrap is stable now
- but the remaining concern is architectural, such as template-side isolation or duplicated auth client logic

That is not a failure of this batch.

## Conclusion target

Expected likely conclusion:

- `safe as-is`

If a concrete issue appears, recommend only one tiny stabilization patch and stop there.
