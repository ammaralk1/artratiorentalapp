> **Historical UI Status (2026-05-13):** This document is closed for active UI/design planning. The only active UI source of truth is `docs/UI_REDESIGN_MASTER_PLAN.md`, which is closed at `100%` complete / `0%` remaining. Keep this file as historical/supporting reference only; do not treat any older roadmap, next step, blocker, or remaining-work note below as active unless a new regression is opened and recorded in the UI Redesign Master Plan.

---

# Enhanced Select Move List Prep

Scope:
- `src/styles/app.css`
- `src/styles/reservations.css`
- `src/scripts/ui/enhancedSelect.js`
- `src/scripts/equipment.js`
- `src/main.js`
- active runtime markup using enhanced-select in dashboard, reservations, customer, and technician flows

Out of scope:
- broad cleanup
- generic control refactor
- design restyling
- semantic/status work
- export/template CSS

## Executive Summary

The future extraction target is now clear:

- a dedicated `enhanced-select.css` should eventually receive the pure `.enhanced-select*` component rules from `src/styles/app.css`
- equipment and reservations contextual rules must stay local
- a few selectors are mixed because they target component nodes but express local layout contracts

No actual move should happen yet. The next safe step is still a prep-only batch that explicitly tags component selectors versus local selectors before any file split.

The main extraction risk is not the component itself. The risk is preserving:

- equipment width and mobile stacking behavior
- reservations filter-bar visual matching and width behavior
- current order between base component rules and later dark component rules

## Exact Selector Move List

These selectors can later move unchanged into a dedicated `enhanced-select.css`.

### Move later unchanged

From `src/styles/app.css`:

- [app.css#L3807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3807)
  `.enhanced-select`
  Reason: base component wrapper positioning and width contract for the component itself.

- [app.css#L3814](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3814)
  `.enhanced-select__native`
  Reason: hides the native select as part of the JS-driven component contract.

- [app.css#L3818](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3818)
  `.enhanced-select__trigger`
  Reason: primary trigger shell and typography are intrinsic component styling.

- [app.css#L3908](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3908)
  `.enhanced-select__trigger:disabled`
- [app.css#L3909](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3909)
  `.enhanced-select--disabled .enhanced-select__trigger`
  Reason: disabled visual states depend on JS-owned disabled state.

- [app.css#L3916](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3916)
  `.enhanced-select__trigger:hover`
- [app.css#L3917](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3917)
  `.enhanced-select__trigger:focus-visible`
- [app.css#L3918](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3918)
  `.enhanced-select[data-open='true'] .enhanced-select__trigger`
  Reason: hover/focus/open trigger visuals are intrinsic component states.

- [app.css#L3925](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3925)
  `.enhanced-select__trigger:focus-visible`
  Reason: focus-visible outline is part of the component state model.

- [app.css#L3930](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3930)
  `.enhanced-select__trigger::after`
  Reason: component arrow glyph belongs to the trigger.

- [app.css#L3944](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3944)
  `.enhanced-select[data-open='true'] .enhanced-select__trigger::after`
  Reason: open-state arrow rotation is a pure component behavior.

- [app.css#L3948](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3948)
  `.enhanced-select__menu`
  Reason: menu shell, animation, and overlay behavior are component-owned.

- [app.css#L3969](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3969)
  `.enhanced-select[data-open='true'] .enhanced-select__menu`
  Reason: open-state menu visibility is a component state.

- [app.css#L3975](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3975)
  `.enhanced-select__option`
  Reason: base option visuals belong to the component.

- [app.css#L3986](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3986)
  `.enhanced-select__option + .enhanced-select__option`
  Reason: option spacing is internal component styling.

- [app.css#L3990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3990)
  `.enhanced-select__option:hover`
- [app.css#L3991](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3991)
  `.enhanced-select__option:focus`
  Reason: interactive option state styling is component-owned.

- [app.css#L3996](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3996)
  `.enhanced-select__option[aria-selected='true']`
  Reason: selected option visual state depends on JS-managed ARIA state.

- [app.css#L4001](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4001)
  `.enhanced-select__option[aria-disabled='true']`
  Reason: disabled option appearance is component-owned.

- [app.css#L4006](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4006)
  `:where(html[dir='rtl']) .enhanced-select__trigger`
- [app.css#L4011](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4011)
  `:where(html[dir='rtl']) .enhanced-select__trigger::after`
  Reason: base RTL component behavior is generic to the component, not page-specific.

- [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949)
  `:where(html.dark, body.dark) .enhanced-select__trigger`
- [app.css#L4956](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4956)
  `:where(html.dark, body.dark) .enhanced-select__trigger::after`
- [app.css#L4960](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4960)
  `:where(html.dark, body.dark) .enhanced-select__trigger:hover`
- [app.css#L4961](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4961)
  `:where(html.dark, body.dark) .enhanced-select__trigger:focus-visible`
- [app.css#L4962](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4962)
  `:where(html.dark, body.dark) .enhanced-select[data-open='true'] .enhanced-select__trigger`
- [app.css#L4969](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4969)
  `:where(html.dark, body.dark) .enhanced-select__trigger:focus-visible`
- [app.css#L4973](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4973)
  `:where(html.dark, body.dark) .enhanced-select__menu`
- [app.css#L4979](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4979)
  `:where(html.dark, body.dark) .enhanced-select__option`
- [app.css#L4983](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4983)
  `:where(html.dark, body.dark) .enhanced-select__option:hover`
- [app.css#L4984](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4984)
  `:where(html.dark, body.dark) .enhanced-select__option:focus`
- [app.css#L4990](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4990)
  `:where(html.dark, body.dark) .enhanced-select__option[aria-selected='true']`
  Reason: dark component states mirror the base component contract and can move together unchanged.

## Exact Selector Stay-Local List

These selectors should stay local because they express page/layout contract rather than component ownership.

### Keep local permanently

Equipment layout contract in `src/styles/app.css`:

- [app.css#L2015](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2015)
  `.equipment-filter-controls .enhanced-select`
- [app.css#L2016](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2016)
  `.equipment-filter-controls .enhanced-select__trigger`
  Reason: zero-margin integration inside the equipment filter row is a page contract.

- [app.css#L2082](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2082)
  `.equipment-filters .enhanced-select`
  Reason: fixed 220px width/flex-basis belongs to equipment page layout.

- [app.css#L2094](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L2094)
  `.equipment-filters .enhanced-select__trigger`
  Reason: local height/line-height rhythm in equipment filters.

- [app.css#L3501](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3501)
  `.equipment-filter-controls .enhanced-select`
- [app.css#L3502](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3502)
  `.equipment-filter-controls .enhanced-select__trigger`
  Reason: mobile stretch behavior is local to equipment filters.

- [app.css#L3509](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3509)
  `.equipment-filters .enhanced-select`
  Reason: mobile container width behavior is contextual.

- [app.css#L3517](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3517)
  `.equipment-filters .enhanced-select__trigger`
- [app.css#L3528](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3528)
  `.equipment-filters .equipment-filter-controls .enhanced-select__trigger`
  Reason: local mobile trigger sizing is equipment-specific.

Reservations layout contract in `src/styles/reservations.css`:

- [reservations.css#L80](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L80)
  `.reservations-filters-bar .enhanced-select`
- [reservations.css#L81](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L81)
  `.reservations-filters-bar .enhanced-select__trigger`
  Reason: reservations styles the wrapper and trigger as part of a matched filter-control family.

- [reservations.css#L159](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L159)
  `:where(html.dark, body.dark) .reservations-filters-bar .enhanced-select`
- [reservations.css#L160](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L160)
  `:where(html.dark, body.dark) .reservations-filters-bar .enhanced-select__trigger`
  Reason: dark filter-bar integration is contextual, not component-global.

- [reservations.css#L180](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L180)
  `.reservations-filters-bar .enhanced-select`
- [reservations.css#L181](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L181)
  `.reservations-filters-bar .enhanced-select__trigger`
  Reason: mobile width/stretch behavior is reservations-specific.

### Keep local for now, maybe move later

- [app.css#L4070](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4070)
  `.equipment-filters .enhanced-select__trigger::after`
- [app.css#L4075](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4075)
  `:where(html[dir='rtl']) .equipment-filters .enhanced-select__trigger`
- [app.css#L4079](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4079)
  `:where(html[dir='rtl']) .equipment-filters .enhanced-select__trigger::after`
  Reason: they are still local equipment contract today, but they are variants of generic arrow/RTL behavior and might later be simplified once extraction is stable.

## Mixed / Split Cases

These cases target component selectors but are not cleanly component-owned:

- `.equipment-filter-controls .enhanced-select`
- `.equipment-filter-controls .enhanced-select__trigger`
- `.equipment-filters .enhanced-select`
- `.equipment-filters .enhanced-select__trigger`
- `.reservations-filters-bar .enhanced-select`
- `.reservations-filters-bar .enhanced-select__trigger`

Why they need a split:
- selector target is a component node
- but the declarations express width, placement, spacing, local rhythm, or sibling-control harmonization
- moving them into `enhanced-select.css` would turn page/layout assumptions into component defaults

Classification:
- mixed ownership / split needed

## Unknown / Needs Manual Review

- any future invalid/error-state enhanced-select visuals
- any modal-specific overflow/z-index expectations not covered in current audited flows
- whether other dynamically-rendered selects rely on implicit sizing assumptions that are currently inherited from generic `.form-select` layout

Classification:
- unknown / needs manual review

## Order And Specificity Dependencies

### Preserve later dark block order

The dark enhanced-select block in `src/styles/app.css` currently comes later than the base component rules:

- base rules at [app.css#L3807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L3807) through [app.css#L4011](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4011)
- dark rules at [app.css#L4949](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4949) through [app.css#L4993](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4993)

Future extraction must preserve:
- base component rules first
- dark component rules later

### Preserve state-specific selectors exactly

These selectors depend on JS state and should move unchanged:

- `[data-open='true']`
- `[aria-selected='true']`
- `[aria-disabled='true']`
- `.enhanced-select--disabled`

Changing selector shape here would risk behavior regressions.

### Do not absorb local layout rules into component defaults

Equipment and reservations selectors currently win by added context, not by higher specificity tricks. That is good and should stay true after extraction:

- keep context-qualified selectors local
- do not replace them with broad `.enhanced-select*` defaults

### Keep extraction independent from generic `.form-select` rules

The component lives near generic select styling in `app.css`, but extraction should not change generic control ordering.
This is important because enhanced-select is applied to native `select.form-select` elements by JS convention, while the generic control layer still styles the underlying native select family separately.

## Blockers Before Extraction

- no explicit standalone component file exists yet
- contextual equipment/reservations selectors are still mixed into the same files as component selectors
- no final “move set” has been isolated into a single contiguous block
- extraction must preserve current dark-before-contextual-cascade relationships

## Recommended Prep Batch After This

Audit-only:

`Enhanced-select extraction manifest`

Goal:
- produce a final manifest with two lists only:
  - exact selectors to copy into future `enhanced-select.css`
  - exact selectors to leave behind in `app.css` and `reservations.css`

This prep batch should also define the future import location inside `src/styles/app.css` so order remains stable.

## Recommended Extraction Batch After That

Implementation batch:

`Create enhanced-select.css and move pure component selectors only`

Scope:
- create `src/styles/enhanced-select.css`
- move only the selectors listed above in `move later unchanged`
- import the new stylesheet from `src/styles/app.css`
- leave equipment/reservations contextual selectors in place
- run focused visual QA on:
  - equipment filters
  - reservations filters
  - customer/technician filters
  - dark mode trigger/menu/selected state

This keeps the extraction low-risk because it avoids touching generic controls or page-level layout contracts.
