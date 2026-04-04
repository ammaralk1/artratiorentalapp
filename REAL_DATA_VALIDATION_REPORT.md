# Real Data Validation Report

## Goal
- Validate the back-office app against the restored real-data backup inside isolated local runtime.
- Identify mismatches, broken flows, and issues that only appear with real data volume/schema.

## Validation Environment
- Frontend:
  - `http://127.0.0.1:5173`
- Backend:
  - `http://127.0.0.1:8080/api`
- Database:
  - restored backup inside local Docker MySQL `art_ratio_test`

## Real-Data Snapshot
- Customers:
  - `31`
- Technicians:
  - `8`
- Equipment:
  - `315`
- Reservations:
  - `25`
- Projects:
  - `24`
- Maintenance requests:
  - `4`
- Reservation equipment rows:
  - `183`
- Reservation technicians rows:
  - `60`
- Reservation payments rows:
  - `4`
- Project templates rows:
  - `3`

## What Matched Expectations

### Dashboard summary counts
- The summary endpoint returned counts that matched direct DB counts.
- Verified:
  - customers `31`
  - reservations `25`
  - equipment `315`
  - technicians `8`
  - projects `24`

### Customer listing
- `/api/customers/` returned successfully.
- Count matched DB count:
  - `31`

### Technician listing
- `/api/technicians/` returned successfully.
- Count matched DB count:
  - `8`

### Equipment listing
- `/api/equipment/?all=1` returned successfully.
- Count matched DB count:
  - `315`

### Projects listing
- `/api/projects/` returned successfully.
- Count matched DB count:
  - `24`

### Analytics / summary module
- `/api/analytics/admin.php?days=30` returned successfully.
- `/api/summary/` returned successfully.

## What Looked Wrong

### Reservations runtime/API path is broken on real data
- `/api/reservations/` fails with:
  - `500 Internal Server Error`
  - `Illegal mix of collations`
- This is the highest-severity real-data issue found.

### Home and dashboard behavior degrade because reservations are prefetched
- Home still loads, but reservation-prefetch warnings appear.
- Dashboard tabs that depend on reservations are degraded by the `500` response.

### Projects page is partially degraded under real data
- Projects list itself loads.
- Projects runtime then degrades when:
  - reservation data is required
  - reports initialization pulls reservation data
- Client cooldown behavior appears after repeated reservation failures.

### Schema/tooling drift is visible only with real data
- The post-import schema patch tool failed because of collation differences that do not show up in the small deterministic seed dataset.
- This is a real-data compatibility issue, not just a cosmetic one.

## Runtime/Data Issues That Appeared Only With Real Data
- Reservation API collation failure.
- Phase 4 schema patch collation failure during snapshot backfill.
- Client-side network cooldown cascades on projects/runtime initialization once reservations start failing.

## Relationship / Integrity Notes
- Reservations have linked operational detail rows in the restored data:
  - reservation equipment rows exist
  - reservation technician rows exist
  - reservation payment rows exist
- Projects exist in meaningful count (`24`) and the dataset includes project-linked reservations:
  - example latest reservation/project links:
    - reservation `215` -> project `69`
    - reservation `214` -> project `67`
    - reservation `213` -> project `66`
    - reservation `212` -> project `65`
- That means the restored dataset is operationally useful for validation, not just a shallow content dump.

## What Must Be Fixed Before Further Brand Rollout
1. Fix the collation mismatch in the reservations read path.
2. Make the Phase 4 schema patch tool resilient to MariaDB-origin collations in restored backups.
3. Re-run runtime validation after the reservations endpoint is healthy.

## Validation Judgment
- The real-data restore was valuable and revealed a real blocker.
- Broader brand rollout should pause until the reservations/runtime data issue is resolved or explicitly contained.

## Post-Fix Validation Status

### Reservations endpoint
- Status after fix:
  - Healthy
- Verified:
  - `GET /api/reservations/` now returns `200` on restored local real data

### Home
- Status after fix:
  - Healthy for the previously blocked reservations prefetch path
- Verified:
  - no repeated `/api/reservations/` `500` errors in runtime audit

### Dashboard
- Status after fix:
  - Healthy for the reservations-linked initialization path
- Verified:
  - dashboard reservations tab no longer triggers the earlier runtime failure chain

### Projects
- Status after fix:
  - Healthy for the previously blocked reservation-dependent initialization path
- Verified:
  - projects no longer enters the reservation-triggered cooldown/error cascade seen before the fix

### Supporting verification
- `npm run backoffice:local:smoke`
  - passed
- `npm run test:reservations`
  - passed
- Playwright runtime pass on:
  - login
  - home
  - dashboard reservations tab
  - projects
  - only low-severity credential API warnings remained in headless login

## Updated Rollout Judgment
- The specific reservations collation blocker has been resolved in the isolated local environment.
- Broader brand rollout no longer needs to stay paused for this specific issue.
- Recommendation:
  - resume carefully, but keep the restored real-data environment available for another checkpoint after the next meaningful UI pass.
