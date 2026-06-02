> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Enhanced Select Extraction Boundary

Scope:
- `src/styles/app.css`
- `src/styles/reservations.css`
- `src/scripts/ui/enhancedSelect.js`
- `src/scripts/equipment.js`
- `src/main.js`
- relevant active runtime pages that render enhanced-select-backed `select.form-select`

Out of scope:
- broad cleanup
- generic dark control refactor
- semantic/status styling
- export/template CSS
- design restyling

## Executive Summary

The enhanced-select component has a clear internal component boundary, but it is not fully isolated from page/layout context yet.

Today the split is:

- component-owned behavior and visuals live in `src/styles/app.css` and `src/scripts/ui/enhancedSelect.js`
- page/layout-owned integration rules live in equipment-related sections of `src/styles/app.css` and reservations filter-bar rules in `src/styles/reservations.css`

Customer and technician filter flows currently use enhanced-select through generic `.form-select` enhancement, but they do not define their own enhanced-select-specific wrapper contract. That means the real extraction blockers are mainly:

- equipment filter width/placement rules
- reservations filter-bar matched-control rules

A dedicated `enhanced-select.css` is worth doing later, but not as a one-step move today. It becomes safe after one prep batch that cleanly separates component selectors from local layout selectors.

## Ownership Split

### Component-owned

These belong to the enhanced-select component itself:

- JS enhancement contract in `src/scripts/ui/enhancedSelect.js`
  - enhancement target selector
  - generated wrapper/menu/trigger/option markup
  - open/close state
  - disabled state
  - selected state
  - keyboard navigation
- base component selectors in `src/styles/app.css`
  - `.enhanced-select`
  - `.enhanced-select__native`
  - `.enhanced-select__trigger`
  - `.enhanced-select__menu`
  - `.enhanced-select__option`
  - `.enhanced-select--disabled`
  - `[data-open='true']`
  - `[aria-selected='true']`
  - `[aria-disabled='true']`
- component dark-mode selectors in `src/styles/app.css`
- component RTL selectors in `src/styles/app.css`

### Page/layout-owned

These belong to local layout integration, not the component itself:

- equipment filter row sizing and flex behavior in `src/styles/app.css`
- equipment mobile stacking/stretch rules in `src/styles/app.css`
- reservations filter-bar width/shape/background rules in `src/styles/reservations.css`
- reservations mobile width/stretch rules in `src/styles/reservations.css`

### Mixed ownership

These areas combine component selectors with page context:

- `.equipment-filter-controls .enhanced-select`
- `.equipment-filter-controls .enhanced-select__trigger`
- `.equipment-filters .enhanced-select`
- `.equipment-filters .enhanced-select__trigger`
- `.reservations-filters-bar .enhanced-select`
- `.reservations-filters-bar .enhanced-select__trigger`

These are not pure component rules and not pure generic layout rules. They are component-in-context rules.

### Legacy tolerated coupling

- global enhancement target:
  `select.form-select:not([data-no-enhance]):not([multiple])`
  from `src/scripts/ui/enhancedSelect.js`

This means the component is attached to generic form-select usage by convention, not by explicit per-page opt-in. That coupling is acceptable for now, but it means extraction must preserve current runtime behavior.

### Unknown / needs manual review

- any future invalid/error-state contract for enhanced-select
- any modal/overflow/z-index interactions not represented in equipment/reservations/customer/technician filters
- whether any script-generated select in other tabs relies on local wrapper assumptions not captured here

## Selector Inventory

### Pure visual component rules

`src/styles/app.css`

- [app.css#L3807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3807)
  `.enhanced-select`
- [app.css#L3814](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3814)
  `.enhanced-select__native`
- [app.css#L3818](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3818)
  `.enhanced-select__trigger`
- [app.css#L3908](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3908)
  disabled trigger visual state
- [app.css#L3916](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3916)
  trigger hover/focus/open visuals
- [app.css#L3925](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3925)
  trigger focus-visible outline
- [app.css#L3930](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3930)
  trigger arrow
- [app.css#L3948](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3948)
  menu shell
- [app.css#L3975](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3975)
  option visuals
- [app.css#L3990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3990)
  option hover/focus
- [app.css#L3996](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3996)
  selected option
- [app.css#L4001](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4001)
  disabled option
- [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949)
  dark trigger
- [app.css#L4956](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4956)
  dark arrow
- [app.css#L4960](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4960)
  dark hover/focus/open
- [app.css#L4973](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4973)
  dark menu
- [app.css#L4979](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4979)
  dark option text
- [app.css#L4983](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4983)
  dark option hover/focus
- [app.css#L4990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4990)
  dark selected option

### Sizing rules

`src/styles/app.css`

- [app.css#L3823](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3823)
  trigger width/max-width/min-height/padding
- [app.css#L3959](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3959)
  menu max-height
- [app.css#L2081](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2081)
  equipment filter width/flex-basis
- [app.css#L2094](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2094)
  equipment trigger height/line-height
- [app.css#L3500](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3500)
  equipment mobile width/stretch
- [app.css#L3515](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3515)
  equipment mobile trigger height
- [reservations.css#L78](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L78)
  reservations filter-bar width/min-width/min-height
- [reservations.css#L180](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L180)
  reservations mobile width/stretch

### Container/layout rules

`src/styles/app.css`

- [app.css#L3807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3807)
  base wrapper positioning
- [app.css#L2008](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2008)
  equipment filter-controls zero-gap relationship
- [app.css#L2013](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2013)
  equipment zero-margin contract
- [app.css#L3508](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3508)
  equipment container stretch on mobile

`src/styles/reservations.css`

- [reservations.css#L72](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L72)
  reservations filter bar flex layout
- [reservations.css#L80](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L80)
  reservations matched control surface contract
- [reservations.css#L157](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L157)
  reservations dark matched control contract

### Contextual overrides

Equipment:

- [app.css#L2015](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2015)
  margin reset for enhanced-select in filter row
- [app.css#L2082](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2082)
  max-width/flex-basis
- [app.css#L4070](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4070)
  arrow placement in equipment filters
- [app.css#L4075](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4075)
  equipment RTL trigger padding

Reservations:

- [reservations.css#L80](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L80)
  wrapper and trigger styled as part of filter family
- [reservations.css#L159](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L159)
  dark wrapper/trigger contract
- [reservations.css#L180](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L180)
  mobile width contract

### JS-state-dependent rules

These depend directly on the DOM/state model from `src/scripts/ui/enhancedSelect.js`:

- `.enhanced-select--disabled .enhanced-select__trigger`
- `.enhanced-select[data-open='true'] .enhanced-select__trigger`
- `.enhanced-select[data-open='true'] .enhanced-select__trigger::after`
- `.enhanced-select[data-open='true'] .enhanced-select__menu`
- `.enhanced-select__option[aria-selected='true']`
- `.enhanced-select__option[aria-disabled='true']`

## Wrapper/Layout Coupling Analysis

### Equipment wrapper contract

Markup source:
- [dashboard.html#L894](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L894)
- [dashboard.html#L899](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L899)

Runtime behavior:
- native `select.form-select` elements for status/category/sub are enhanced globally
- options are refreshed dynamically by [equipment.js#L1397](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/equipment.js#L1397), [equipment.js#L1414](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/equipment.js#L1414), and [equipment.js#L1419](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/equipment.js#L1419)

Contract shape:
- enhanced-select sits inside `.equipment-filter-controls.management-search-bar`
- parent layout expects:
  - zero margin on wrapper and trigger
  - fixed 220px desktop width/flex-basis
  - full-width stretch on mobile
  - shorter 2.2rem mobile trigger height
  - equipment-specific arrow/RTL positioning

Interpretation:
- this is a true page/layout contract, not component ownership

### Reservations wrapper contract

Markup source:
- [dashboard.html#L1383](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1383)

Runtime behavior:
- native reservation filter selects are enhanced globally by `initEnhancedSelects()`

Contract shape:
- enhanced-select sits inside `.reservations-filters-bar`
- reservations styles wrapper and trigger together as part of a matched filter-control family
- parent layout expects:
  - shared radius/min-height
  - shared background/border/shadow with adjacent inputs
  - shared min-width
  - mobile full-width stretch

Interpretation:
- this is also a page/layout contract, but unlike equipment it includes stronger visual harmonization with sibling controls

### Customer and technician flows

Markup sources:
- [customer.html#L374](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/customer.html#L374)
- [technician.html#L315](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/technician.html#L315)

Contract shape:
- use generic `.filters-bar` plus utility classes like `w-auto`
- no enhanced-select-specific local CSS found

Interpretation:
- these flows currently rely on component baseline only
- they do not block extraction

## Extraction Blockers

These are the exact blockers to safe extraction today:

1. Equipment-specific wrapper rules are interleaved with app page layout rules in `src/styles/app.css`
   - they are not component rules
   - but they target component selectors directly

2. Reservations filter-bar treats `.enhanced-select` and `.enhanced-select__trigger` as part of a local matched-control family
   - wrapper and trigger are styled alongside local inputs/selects
   - moving those selectors without a contract split risks layout drift

3. Global enhancement is convention-based
   - any `select.form-select` can become enhanced-select unless excluded with `data-no-enhance`
   - extraction must preserve global runtime availability from [main.js#L154](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/main.js#L154)

4. Component and native select styling are adjacent in `app.css`
   - `.form-select` and `.enhanced-select__trigger` are visually parallel in nearby blocks
   - extraction should avoid accidentally splitting a shared page layout decision from the component itself

## What Could Move First

These can move first into a future dedicated `enhanced-select.css`:

- `.enhanced-select`
- `.enhanced-select__native`
- `.enhanced-select__trigger`
- `.enhanced-select__trigger::after`
- `.enhanced-select__menu`
- `.enhanced-select__option`
- disabled/open/selected/focus/hover states
- dark component states
- base RTL component states

Reason:
- these are pure component selectors
- they are driven by the JS-owned DOM contract
- they are reused outside equipment/reservations-specific layout contracts

## What Must Stay Local

Keep local to equipment/reservations files or page sections:

- `.equipment-filter-controls .enhanced-select`
- `.equipment-filter-controls .enhanced-select__trigger`
- `.equipment-filters .enhanced-select`
- `.equipment-filters .enhanced-select__trigger`
- `.equipment-filters .enhanced-select__trigger::after`
- reservations filter-bar rules targeting:
  - `.reservations-filters-bar .enhanced-select`
  - `.reservations-filters-bar .enhanced-select__trigger`
  - mobile width/stretch handling in that context

Reason:
- these rules express placement, width, local sizing rhythm, and sibling-control harmonization
- they are page/layout behavior, not component behavior

## Recommended Future Extraction Sequence

1. Audit-only prep batch
- create a move list of pure component selectors in `app.css`
- create a keep-local list for equipment and reservations contextual selectors

2. Bounded extraction batch
- move only pure `.enhanced-select*` component selectors into a dedicated component stylesheet
- import that stylesheet from `app.css`
- leave equipment and reservations contextual selectors where they are

3. Post-extraction verification batch
- verify equipment desktop/mobile filter row sizing
- verify reservations filter-bar visual matching
- verify customer/technician filters still inherit the component baseline correctly

4. Optional later cleanup
- only after extraction is stable, consider whether equipment-specific arrow/RTL rules can be simplified
- do not mix this with generic control refactors

## Extraction Feasibility

### Safe now

- no

Reason:
- component and contextual layout rules are not yet explicitly separated in the codebase

### Safe after one prep batch

- yes

Reason:
- the component boundary itself is clear
- the blockers are known and localized
- customer/technician already demonstrate the component can run without page-specific enhanced-select styling

### Not worth doing

- no

Reason:
- a dedicated `enhanced-select.css` would improve ownership clarity
- the component is self-contained enough to justify later extraction
- the move just needs one explicit boundary-prep audit first
