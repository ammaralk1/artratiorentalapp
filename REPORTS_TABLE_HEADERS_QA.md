## Executive Summary

The reports table header unification batch is `safe as-is`.

The dark header override in [reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css) now uses the same olive/slate table-head tokens for:

- reservations reports tables in [dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html)
- projects reports tables in [projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
- the shared sticky-header rule under the desktop reports table wrapper

No additional stabilization patch is recommended from this review. The change is header-only, keeps contrast strong, and does not appear to create cross-screen drift inside the reports subsystem.

## Highest-Risk Checks

1. Reservations reports main table
   [dashboard.html#L1902](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1902)
   Check the primary reservations reports table header in dark mode because it is the most visible usage of the unified header styling.

2. Reservations summary/detail report tables
   [dashboard.html#L1697](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1697)
   through
   [dashboard.html#L1886](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1886)
   Check multiple table cards to confirm the same header language repeats consistently across the reservations reports area.

3. Projects reports table
   [projects.html#L754](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L754)
   Check for shared-selector spillover or mismatch, since projects also uses `.reports-table-card`, `.reports-table-wrapper`, and `.reports-table`.

4. Desktop sticky header behavior
   Shared selector at [reports.css#L1914](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1914)
   Check that the sticky header still reads cleanly over the scrollable table wrapper and does not revert to a separate navy/blue tone.

## Screen/State Checklist

### 1. Reservations Reports Tables

Screen:
- Reservations reports screen at [dashboard.html#L1406](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1406)

Tables to inspect:
- [dashboard.html#L1715](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1715)
- [dashboard.html#L1750](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1750)
- [dashboard.html#L1785](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1785)
- [dashboard.html#L1821](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1821)
- [dashboard.html#L1855](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1855)
- [dashboard.html#L1886](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1886)
- [dashboard.html#L1928](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1928)

Checks:
- Dark mode:
  header background should feel olive/slate, not bright navy
- Text contrast:
  header labels should remain easy to read at a glance
- Header/body separation:
  header row should stay visually distinct from body rows without looking like a different product
- Border treatment:
  header borders should feel consistent with the surrounding report card shell and table body grid
- Repetition:
  multiple reservations report tables should feel like one family, not mixed header themes

### 2. Projects Reports Table

Screen:
- Projects reports tab at [projects.html#L591](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L591)

Table:
- [projects.html#L772](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html#L772)

Checks:
- Dark mode:
  projects table header should pick up the same calmer token-based header styling
- Visual fit:
  header should still sit naturally inside the projects reports card, not look too muted or too strong
- No regression:
  sorting affordances and table readability should remain intact

### 3. Sticky Header Behavior

Shared selectors:
- [reports.css#L1914](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1914)
  `.reports-table thead th`
- [reports.css#L1921](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1921)
  `:is(html.dark-mode, body.dark-mode) .reports-table thead th`

Checks:
- On desktop-width screens, scroll inside the table wrapper
- Confirm header cells remain sticky
- Confirm sticky headers do not switch back to a different blue/navy background while scrolling
- Confirm backdrop blur and sticky layering still feel stable and readable

### 4. RTL Alignment

Checks:
- In RTL reports tables, first and last header-cell rounding should remain correct
- Header text should stay centered and balanced relative to body cells
- No edge-cell border/radius mismatch should appear after the token-based header change

### 5. Narrow Width / Scroll Container

Checks:
- On narrow screens, horizontal scrolling inside `.reports-table-wrapper` should still work
- Header cells should remain visually attached to the table grid
- No clipping or awkward contrast shift should appear at the wrapper edges while scrolling

## Shared-Selector/Sticky-Header Review

Shared reports header selectors in use:
- [reports.css#L1670](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1670)
  `.reports-table-card .reports-table thead th`
- [reports.css#L1737](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1737)
  `:is(html.dark-mode, body.dark-mode) .reports-table-card .reports-table thead th`
- [reports.css#L1914](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1914)
  `.reports-table thead th`
- [reports.css#L1921](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1921)
  `:is(html.dark-mode, body.dark-mode) .reports-table thead th`

Review outcome:
- reservations and projects tables both rely on the same reports table selector family
- the dark sticky-header rule now matches the same token family as the main dark header rule
- no separate blue/navy sticky override remains in this header path
- because the change is restricted to header background, border, and foreground text, spillover risk stays low inside the reports subsystem

Classification:
- `safe as-is`

## Pass/Fail Criteria

### Safe As-Is

Mark `safe as-is` if:
- reservations reports headers feel consistent with the olive/slate reports surfaces
- projects reports headers inherit the same calm dark header tone
- sticky headers remain visually stable while scrolling
- header text contrast remains strong
- RTL rounding and alignment remain correct
- narrow-width scroll behavior remains unchanged

### Needs Tiny Stabilization Patch

Mark `needs tiny stabilization patch` only if one specific issue appears, such as:
- sticky header background needing a slightly different opacity from the non-sticky header
- a single border/radius mismatch in RTL edge cells
- a single projects-table contrast issue caused by the shared header selector

If that happens, the smallest valid patch would be a reports-table-header-only adjustment in [reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css), not a broader reports table cleanup.

### Needs Later Reports-Subsystem Cleanup

Mark `needs later reports-subsystem cleanup` only if:
- multiple reports screens reveal inconsistent table wrapper/body/header relationships
- sticky and non-sticky table states need a fuller reports-table design pass
- the issue clearly exceeds a tiny header-only stabilization

## REPORTS_TABLE_HEADERS_QA.md Conclusion

Conclusion: `safe as-is`

Reason:
- reservations and projects reports tables share the same reports-table header path
- the shared sticky-header selector now uses the same olive/slate table-head tokens as the main dark header rule
- no concrete regression risk remains large enough to justify a stabilization patch at this stage
