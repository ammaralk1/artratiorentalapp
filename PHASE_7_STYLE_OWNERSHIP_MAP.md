# Phase 7 Style Ownership Map

## Style Entrypoint Map

### Primary back-office stylesheet entrypoint
- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
- Current role:
  - main aggregated back-office stylesheet
  - imports:
    - [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)
    - [src/styles/maintenance.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/maintenance.css)
    - [src/styles/reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)
    - [src/styles/tabs.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/tabs.css)
    - [src/styles/reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)
    - [src/styles/calendar.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/calendar.css)
    - [src/styles/forms.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/forms.css)
  - also contains a large amount of app-specific component and page styling directly

### Legacy aggregated stylesheet
- [src/styles/index.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/index.css)
- Current role:
  - legacy aggregate stylesheet with nearly the same imports as `app.css`
  - appears not to be linked by current back-office pages
- Status:
  - structural debt
  - should remain untouched in the first cleanup batch unless a page is confirmed to still depend on it

### Narrow/auxiliary stylesheets
- [src/styles/auth.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/auth.css)
  - imports `core.css` and `forms.css`
  - not currently part of the main internal page load path
- [src/styles/quotePdf.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/quotePdf.css)
- [src/styles/reportsA4.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reportsA4.css)
- [src/styles/templatesA4.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/templatesA4.css)
  - used for export/print/template flows only
  - not primary targets for the first cleanup batch

### Additional shared stylesheet outside `src/styles`
- `/dist/css/sidebar.css`
- Current role:
  - shared sidebar shell styling loaded by most internal pages
  - legacy/compiled asset outside the main Vite stylesheet tree

## Global vs Page-Specific Style Ownership

### Global/shared internal pages
- Most back-office pages load:
  - [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
  - `/dist/css/sidebar.css`

### Pages with extra third-party CSS
- [src/pages/dashboard.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html)
  - `flatpickr`
- [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
  - `bootstrap.rtl`
  - `flatpickr`
  - extra direct links to `forms.css` and `reports.css`
- [src/pages/customer.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html)
  - `bootstrap.rtl`
  - `flatpickr`
- [src/pages/technician.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/technician.html)
  - `bootstrap.rtl`
  - `flatpickr`
- [src/pages/users.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/users.html)
  - `bootstrap.rtl`

### Page-specific duplication confirmed
- Historical first-pass duplicate removed:
  - [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
  - previously linked:
    - [src/styles/forms.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/forms.css)
    - [src/styles/reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)
  - both were already imported by [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
  - this duplicate path has now been removed in Phase 7 Pass 1

## Duplicate / Overlap List

### Confirmed overlap
- `app.css` and `index.css` both aggregate most of the same underlying style files.
- Pagination styling exists in multiple places:
  - [src/styles/reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)
  - [src/styles/reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)
  - equipment/customers/technicians pagers now share a first-pass `.list-pagination` primitive, but reservation/report pagers still use separate styling paths

### Likely overlap, higher-risk
- Several entry scripts also import `app.css` while pages link `app.css` directly.
- This likely creates duplicate loading paths in the Vite boot model, but it is a higher-risk cleanup than the first pass because some pages may depend on the HTML-linked path for first paint or non-module fallback timing.

## Current Token / Visual Primitive Usage

### Color usage
- Core tokens already exist in [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css):
  - `--clr-primary`
  - `--clr-primary-soft`
  - `--clr-primary-light`
  - `--clr-bg`
  - `--clr-card`
  - `--clr-text`
  - `--clr-muted`
  - `--clr-success`
  - `--clr-danger`
  - `--clr-warning`
- Current issue:
  - these are low-level color tokens, not yet a clearly semantic back-office theme layer for surfaces, borders, helper text, pagination, and interactive controls

### Typography usage
- Primary font family is Tajawal:
  - [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)
  - [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
- Reports and print flows sometimes introduce local typography rules
- Current issue:
  - typography is broadly consistent, but not yet exposed through semantic tokens such as a dedicated UI sans token or helper-text token layer

### Spacing / radius / shadow patterns
- Repeated radius tokens already exist:
  - `--radius-lg`
  - `--radius-md`
- Repeated shadow tokens already exist:
  - `--shadow-xs`
  - `--shadow-sm`
  - `--shadow-md`
- Repeated spacing is still mostly literal values spread across files:
  - `0.5rem`
  - `0.75rem`
  - `1rem`
  - `1.5rem`
  - `28px`
- Current issue:
  - spacing is visually coherent but not yet standardized through shared semantic hooks for list pagers, helper text, section headers, and management forms

## Repeated UI Pattern List

### Shared patterns already visible across back-office modules
- section headers:
  - `.tab-section-header`
- management forms:
  - `.management-form-box`
  - `.management-form-header`
  - `.management-form-hint`
  - `.management-form-grid`
  - `.management-form-actions`
- data tables:
  - `.customer-table`
  - `.technician-table`
  - wrappers such as `.customer-table-wrapper`
- card-like surfaces:
  - `.box`
  - dashboard/report cards
- pagination surfaces:
  - equipment/customers/technicians list pagers
  - reservation pager
  - project/report pagers

### Primitive gap
- The back-office app has repeated pagination, helper text, and table-wrapper patterns.
- First-pass improvement:
  - equipment/customers/technicians pagers now use a named shared hook
- Remaining gap:
  - helper text, section headers, and management-form surface patterns are still mostly distributed across multiple files instead of being represented by a cleaner primitive layer

## Regression-Risk Summary

### Highest-risk areas
- [src/styles/app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
  - very large, mixed ownership, and global reach
- [src/styles/core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)
  - contains foundational tokens and many global surfaces
- reports and reservations styling
  - both have their own pagination and dense override behavior

### Lower-risk first-pass areas
- remove duplicate `forms.css` and `reports.css` links from [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html)
- introduce shared semantic hooks for the already-implemented equipment/customers/technicians pagers while preserving the same rendered Bootstrap button behavior
- add semantic alias tokens on top of existing color/radius/shadow primitives rather than replacing existing token names

## Recommended Smallest Safe Cleanup Order

1. Remove confirmed duplicate stylesheet loading in [src/pages/projects.html](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/projects.html).
2. Introduce semantic alias tokens for shared back-office surfaces, text, radius, and shadows using existing values.
3. Add shared pagination styling hooks for equipment/customers/technicians without redesigning the controls.
4. Leave deeper entrypoint deduplication (`HTML-linked app.css` vs `JS-imported app.css`) for a later pass because it has broader regression risk.

## Pass 1 Status
- Completed in Phase 7 Pass 1:
  - removed the duplicate `forms.css` and `reports.css` page links from `projects.html`
  - introduced semantic back-office alias tokens
  - introduced the shared `.list-pagination` primitive for equipment/customers/technicians
- Next low-risk styling target:
  - shared helper text / section header / management-form surface cleanup

## Pass 2 Status
- Completed in Phase 7 Pass 2:
  - introduced shared support-text primitives for repeated explanatory copy
  - routed management-form highlight surfaces through semantic back-office panel tokens
  - applied shared support-text hooks to repeated workflow/section-helper paragraphs on dashboard, projects, contact inquiries, feedback submissions, and technician detail
- Current brand-readiness gain:
  - support-copy styling is less dependent on repeated utility classes
  - management-form accent surfaces are more centrally themeable

## Pass 3 Status
- Completed in Phase 7 Pass 3:
  - introduced shared heading-stack and empty-state primitives
  - applied them to repeated panel-intro and placeholder surfaces across home, site analytics, contact inquiries, feedback submissions, and users
  - strengthened semantic token coverage for empty-state surfaces
- Result:
  - repeated guidance/panel shells now rely more on shared hooks than page-local utility combinations

## Brand Application Readiness Judgment
- The styling layer is now materially more prepared for a later brand-application phase.
- A controlled brand pass can now target:
  - semantic back-office color aliases
  - support text primitives
  - heading-stack primitives
  - empty-state primitives
  - shared pagination and management-surface hooks
- Recommendation:
  - the next phase can safely be a brand-application phase, as long as it remains token/primitives-led rather than a free-form page-by-page redesign.

## Brand Application Pass 1 Status
- Completed in the first brand-application pass:
  - explicit Art Ratio brand tokens were added on top of the back-office semantic layer
  - management action surfaces, section titles, empty states, and shared list pagination were moved onto those branded tokens
  - the change remained confined to shared primitives rather than broad page-specific recoloring
- Current state:
  - the back-office theme layer is now token-driven enough to continue a second brand pass safely
  - the highest-value untouched surfaces are still broader shared shells such as tab accents and `glass-card`-style panels

## Brand Application Pass 2 Status
- Completed in the second brand-application pass:
  - shared shell/card wrappers now consume brand-facing shell tokens
  - shared tab containers and active/hover states now consume brand-facing tab tokens
- Scope intentionally stayed at the shared-surface layer:
  - `glass-card`
  - `card-surface`
  - `box`
  - `tab-buttons`
  - `sub-tab-buttons`
  - shared dashboard/home/projects tab states
- Remaining higher-value but still deferred surfaces:
  - sidebar-specific tab cards
  - page-local table and detail wrappers
  - broader background/chrome harmonization
