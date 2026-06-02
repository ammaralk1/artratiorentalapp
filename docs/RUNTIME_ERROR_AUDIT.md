# Runtime Error Audit

## Goal
- Inspect the back-office app under real browser/runtime conditions.
- Identify console errors, failed network requests, init failures, and warnings that appear during actual page usage.

## Runtime Environment Used
- Frontend:
  - `http://127.0.0.1:5173`
- Backend API:
  - `http://127.0.0.1:8080/api`
- Browser automation:
  - Playwright + Chromium in headless local mode
- Login used:
  - `integration_admin`

## Pages Exercised
- [login.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/login.html)
- [home.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/home.html)
- [dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html)
- [projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
- [users.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/users.html)
- [site-analytics.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/site-analytics.html)

## Findings

### 1. Reservations endpoint returns 500 and breaks multiple runtime surfaces
- Exact error:
  - `GET /api/reservations/` -> `500 Internal Server Error`
  - response details:
    - `SQLSTATE[HY000]: General error: 1267 Illegal mix of collations (utf8mb4_unicode_ci,IMPLICIT) and (utf8mb4_general_ci,IMPLICIT) for operation '='`
- Affected page/module:
  - [home.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/home.js)
  - [reservationsActions.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservationsActions.js)
  - [projects/app.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/app.js)
  - [projectsReports.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projectsReports.js)
  - backend source point:
    - [reservations/index.php](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/reservations/index.php#L1737)
- Likely cause:
  - `reservation_technicians.position_key` is `utf8mb4_general_ci`
  - `technician_positions.name` is `utf8mb4_unicode_ci`
  - the reservations API joins on `tp.name = rt.position_key`, which fails against the restored real-data schema
- Severity:
  - Critical
- Does it block further UX/branding work:
  - Yes
- Runtime impact observed:
  - home summary prefetch warning
  - reservations tab load failure
  - projects page initialization degradation
  - reports init degradation
  - API cooldown side effects after the first repeated failure

### 2. Projects page enters cooldown/error cascade after reservations failure
- Exact error:
  - `ApiError: Network cooldown after failures`
- Affected page/module:
  - [projects/app.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/app.js)
  - [projectsReports.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projectsReports.js)
  - [projectsService.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projectsService.js)
- Likely cause:
  - not the root bug
  - this is a secondary client-side protection triggered after repeated `500` responses from `/api/reservations/`
- Severity:
  - High as a runtime symptom
- Does it block further UX/branding work:
  - Yes, because the root reservations failure degrades project/report runtime behavior under real data

### 3. Home page reservation summary prefetch degrades under real data
- Exact error:
  - `⚠️ [home] Failed to prefetch reservations for summary`
- Affected page/module:
  - [home.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/home.js)
- Likely cause:
  - same `/api/reservations/` collation-triggered backend failure
- Severity:
  - Medium by itself
- Does it block further UX/branding work:
  - Indirectly yes, because it is part of the critical reservations runtime failure chain

### 4. Credential API warnings on login page under headless browser
- Exact warning:
  - `Failed to retrieve stored credentials NotSupportedError`
  - `تعذر حفظ بيانات الاعتماد في المتصفح NotSupportedError`
- Affected page/module:
  - [loginPage.js](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/loginPage.js)
- Likely cause:
  - Playwright headless browser environment does not fully support the browser credential APIs being probed
- Severity:
  - Low
- Does it block further UX/branding work:
  - No
- Notes:
  - this appears to be an environment/runtime capability warning, not a business-flow failure

## Modules / Pages That Loaded Successfully In Runtime
- [customers API](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/customers/index.php)
- [technicians API](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/technicians/index.php)
- [equipment API](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/equipment/index.php)
- [projects API](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/projects/index.php)
- [users API](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/users/index.php)
- [analytics admin endpoint](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/backend/api/analytics/admin.php)

## Blocker Judgment
- Runtime/data correctness is not yet stable enough for broader brand rollout.
- The `reservations` real-data failure is a functional blocker that affects:
  - daily operations visibility
  - dashboard behavior
  - project/report initialization

## Recommendation
- Pause broader brand application.
- Fix or isolate the collation mismatch in the reservations path first.
- Re-run the same Playwright runtime audit after the reservations endpoint is healthy on the restored dataset.
