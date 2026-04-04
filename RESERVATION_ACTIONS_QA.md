## Executive Summary

This checklist verifies the dark-mode reservations action retune in [reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css) across the three changed action clusters:

- create-flow actions at [dashboard.html#L1368](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1368)
- payment-progress action at [dashboard.html#L2237](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L2237)
- reservation details modal footer actions rendered from [details.js#L1333](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1333)

It also checks two spillover boundaries:

- project-details modal buttons rendered from [projectDetails.js#L525](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/projectDetails.js#L525)
- unrelated `btn-outline-primary` usage such as the equipment package selector at [dashboard.html#L822](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L822)

Target result:

- reservation actions should feel calmer and more hierarchical in dark mode
- project-details modal buttons should remain visually unchanged
- unrelated global outline-primary buttons should remain visually unchanged

## Highest-Risk Checks

1. Create flow in dark mode
   Check [dashboard.html#L1368](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1368) for clearer distinction between the primary submit action and the secondary clear action.

2. Reservation details modal footer in dark mode
   Check buttons rendered from [details.js#L1333](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1333) for primary/ghost/danger hierarchy and footer grouping.

3. Project-details modal spillover
   Check buttons rendered from [projectDetails.js#L525](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/projectDetails.js#L525) to confirm reservation-scoped footer overrides did not leak into project actions.

4. Payment-progress add button in dark mode
   Check [dashboard.html#L2237](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L2237) for the smaller outline utility action staying consistent with the new reservation hierarchy without becoming too weak.

## Screen/State Checklist

### 1. Create Actions

Screen:
- Create reservation flow at [dashboard.html#L1368](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1368)

Buttons:
- [dashboard.html#L1369](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1369) `#create-reservation-btn`
- [dashboard.html#L1370](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1370) `#clear-reservation-form-btn`
- optional technician picker entrypoint at [dashboard.html#L1254](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L1254) `#open-technician-picker`

Checks:
- Default:
  primary action should read as the strongest action in the group
  secondary clear action should look intentionally quieter, not blue-heavy
- Hover:
  both buttons should lift consistently, but the primary should retain more emphasis
- Focus-visible:
  keyboard focus should remain clear on both buttons
- Disabled:
  if either action can be observed disabled in the current flow, disabled state should read subdued and non-clickable without collapsing text contrast
- Grouping:
  the pair should still feel like one action group, not two unrelated button themes
- Width/responsive:
  on narrow widths, full-width stacked buttons should keep the same hierarchy and not look visually noisy

### 2. Payment-Progress Action

Screen:
- Edit reservation payment-progress block at [dashboard.html#L2237](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L2237)

Button:
- [dashboard.html#L2238](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L2238) `#edit-res-payment-add`

Checks:
- Default:
  should read as a utility action, not a competing primary CTA
- Hover:
  should gain a restrained highlight, not a bright blue glow
- Focus-visible:
  should remain clearly focusable
- Disabled:
  verify when payment-add is disabled by edit flow logic from [editForm.js#L1158](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/editForm.js#L1158) through [editForm.js#L1242](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/editForm.js#L1242)
  disabled style should be visibly inactive and readable
- Balance with hint text:
  button should not overpower the hint directly beside it

### 3. Reservation Modal Footer Actions

Screen:
- Reservation details actions rendered from [details.js#L1333](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1333)

Buttons:
- [details.js#L1334](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1334) export quote
- [details.js#L1337](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1337) export checklist
- [details.js#L1340](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1340) edit
- [details.js#L1341](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L1341) delete

Checks:
- Footer grouping:
  footer should read as a dedicated action zone, not loose buttons under content
- Primary vs ghost:
  edit should be the clearest next step
  export/checklist should read as secondary utilities
- Destructive clarity:
  delete should remain clearly destructive and not be confused with the primary action
- Hover/focus:
  ghost actions should feel restrained
  primary should remain strongest
  danger should remain clearly distinct without excessive glow
- Disabled:
  if any footer action can be observed disabled through reservation state, disabled style should be visibly inactive without looking broken

## Dark/RTL/Responsive Checks

### Dark Mode

Check all three action clusters in dark mode:
- create flow
- payment-progress action
- reservation details modal footer

Verify:
- no blue-heavy drift remains in primary/secondary reservation actions
- hierarchy is still obvious at a glance
- text contrast remains strong

### RTL

Check in RTL:
- create action row alignment and spacing
- payment-progress button alignment relative to hint text
- reservation modal footer wrap order and button spacing

Verify:
- button grouping still reads naturally right-to-left
- icon/text spacing remains correct
- no border, shadow, or separator looks visually offset

### Responsive / Narrow Width

Check on narrow/mobile widths:
- create flow stacked buttons
- reservation details modal footer wrap behavior
- payment-progress action and hint wrapping

Verify:
- stacked actions still preserve primary/secondary order
- footer buttons wrap cleanly without cramped spacing
- no button becomes disproportionately dominant or too small

## Spillover Review

### 1. Project-Details Modal Buttons

Neighbor screen:
- [projectDetails.js#L525](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/projects/projectDetails.js#L525)

Buttons to inspect:
- create reservation
- edit project
- delete project
- export PDF
- close

Why:
- they share `.modal-action-btn*` classes, but the reservations retune was intentionally scoped under `.reservation-modal-actions`

Pass condition:
- project-details modal buttons should look unchanged from their pre-patch styling

Fail condition:
- project-details modal buttons suddenly inherit olive/slate reservation footer treatment

### 2. Unrelated Global `btn-outline-primary`

Check at least:
- equipment package selector at [dashboard.html#L822](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/pages/dashboard.html#L822)
- reservation detail “open project” button rendered at [details.js#L826](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/scripts/reservations/list/details.js#L826)

Why:
- the payment-progress retune was intentionally scoped under `.reservation-payment-progress__actions`

Pass condition:
- unrelated `btn-outline-primary` buttons should look unchanged

Fail condition:
- global outline-primary buttons begin using the calmer reservation utility styling outside payment-progress

## Pass/Fail Criteria

### Safe As-Is

Mark `safe as-is` if:
- create actions have a clear primary vs secondary distinction in dark mode
- payment-progress utility action looks calmer but still visible
- reservation modal footer hierarchy is clearer and readable
- project-details modal buttons show no visible spillover
- unrelated `btn-outline-primary` buttons show no visible spillover
- RTL and narrow/mobile layouts remain clean

### Needs Tiny Stabilization Patch

Mark `needs tiny stabilization patch` if:
- one reservation action state is too weak or too strong
- footer divider/grouping needs slight spacing or border adjustment
- one hover/focus state is inconsistent
- one responsive or RTL alignment issue appears
- a single scoped spillover issue appears that can be fixed without widening the system

### Needs Later Broader Action-System Review

Mark `needs later broader action-system review` if:
- reservation and project modal action systems now visibly diverge in a way that feels structurally wrong
- create/payment/modal actions still look like mixed products even after the bounded retune
- multiple screens reveal that action semantics are too dependent on shared generic `.btn-*` and `.modal-action-btn*` patterns to stay screen-scoped
