# Equipment Requests Portal Shell/Table QA

## Executive summary

This QA pass is focused on the first portal design-consistency batch only:

- shell/header surface
- main request/details panels
- cards
- empty state
- requests table header
- row hover and active states
- local form-control and toast readability touched by the same batch

It is not a full portal product QA pass.

Expected outcome after this batch:

- the portal should feel closer to the olive/slate back-office direction
- the old blue ERP shell should be visibly reduced
- table readability and workflow behavior should remain intact
- semantic status colors should remain unchanged

Outcome labels for this review:

- `safe as-is`
- `needs tiny stabilization patch`
- `ready for next portal design batch`

## Highest-risk checks

1. Header and shell first impression
   - confirm the page no longer reads as a separate blue/navy admin product

2. Requests table header readability
   - confirm the darker olive/slate header still has strong contrast and clear column separation

3. Requests row hover and active state
   - confirm hover/current selection remain obvious enough after toning down the blue

4. Local controls readability
   - confirm search input, select, and textarea are still legible on the new darker surfaces

5. Toast contrast
   - confirm toast text remains readable across info, success, and error messages

## Screen/state checklist

### 1. Shell/header surface checks

Open the Equipment Requests portal in the main authenticated state.

Verify:

- page background feels olive/slate-led rather than strong navy/indigo
- `.erp-header` reads as part of the same dark shell as the rest of the page
- header border and shadow are visible but not too harsh
- topbar center heading remains readable
- the header does not visually overpower the page body

Specific items to look at:

- page body background
- `.erp-header`
- `.erp-requests-panel`
- `.erp-details-panel`

Fail conditions:

- shell still reads strongly blue/indigo
- header border disappears into the background
- header contrast becomes muddy or flat

### 2. Panel/card/details-pane grouping checks

Verify:

- left requests panel and right details panel feel like related surfaces
- cards inside the details pane are distinguishable from the panel background
- card boundaries are visible but not too heavy
- the message log cards still feel nested correctly inside the details pane

Specific cards:

- request details card
- requested items card
- send message card
- message log card

Fail conditions:

- cards collapse visually into the panel
- borders become too weak to understand grouping
- cards feel over-dark or over-layered

### 3. Filters area readability checks

Verify:

- the filters strip still reads as a usable control row
- search input, status select, and apply button still feel grouped
- the muted filter background does not reduce readability of controls
- control text and placeholder remain readable

Check:

- default state
- after typing into search
- select open/closed

Fail conditions:

- filters strip blends too much with surrounding panel
- input/select look disabled or washed out
- placeholder becomes hard to read

### 4. Table header/body/row-hover/row-active checks

#### Requests table header

Verify:

- column labels are readable
- header background feels aligned with the new shell
- header does not look artificially bright or detached

#### Body rows

Verify:

- row text still has clear contrast
- status chips remain readable and unchanged in meaning
- row dividers remain visible enough for scanability

#### Hover state

Verify:

- moving over rows gives a clear but restrained hover cue
- hover is visible without returning to loud blue flashing

#### Active/current selection state

Verify:

- selected row remains clearly distinguishable from normal and hover states
- active state is still strong enough to orient the user when details are shown on the right

Fail conditions:

- hover is too weak to notice
- active/current row is not clearly separable from hover
- header/body separation becomes unclear

### 5. Empty-state checks

Check both reachable empty-state conditions if possible:

1. initial details pane empty state before selecting a request
2. no matching requests state after filters/search

Verify:

- empty state still reads clearly as a placeholder state
- dashed border remains visible
- muted text remains readable
- new background treatment does not make the state feel interactive by mistake

Fail conditions:

- empty state looks like a disabled card rather than a placeholder
- text contrast is too low

## Local control/toast review

### 6. Local input/select/textarea checks

These controls were visually touched by the batch and should be checked even though the batch was primarily about surfaces.

Check:

- `#erp-search-input`
- `#erp-status-filter`
- `#erp-message-subject`
- `#erp-message-body`
- item status selects
- item note inputs

Verify:

- default readability
- cursor/typing clarity
- placeholder readability
- selected-option readability
- controls do not visually disappear into card backgrounds

Fail conditions:

- low text contrast
- over-glossy or over-dark fields
- item controls become hard to scan in the items table

### 7. Toast readability checks

Trigger these if possible:

- info toast
- success toast
- error toast

Verify:

- toast container still contrasts against the page background
- text remains readable in all message types
- color-coded inline JS backgrounds still work visually with the new shell
- toast shadow does not make it look detached or too heavy

Known coupling:

- toast base surface is in CSS
- success/error/info fill colors are still set in JS via `showToast()`

Fail conditions:

- text loses contrast on success or info
- toast looks too dim against the new background

## RTL/responsive checks

### 8. RTL checks

Verify:

- header alignment still feels correct in Arabic/RTL
- table headers and cells remain aligned properly
- details grid still reads naturally in RTL
- toast positioning remains centered correctly

### 9. Responsive checks

At widths below the existing responsive breakpoint:

Verify:

- header stacks correctly
- requests/details panels move into a single column
- filters row stacks cleanly
- table remains scrollable and readable
- card spacing still feels intentional

Fail conditions:

- panel surfaces blend together too much on mobile
- filters become visually cramped or uneven

## Pass/fail criteria

### Safe as-is

Classify as `safe as-is` if:

- shell/header feel clearly closer to the olive/slate system
- panel/card grouping remains clear
- requests table header/body remain readable
- hover and active row states are both visible and distinct
- empty state is readable
- local inputs/selects/textarea remain legible
- toast remains readable
- RTL and responsive layout still behave correctly

### Needs tiny stabilization patch

Classify as `needs tiny stabilization patch` if there is one narrow visual problem such as:

- row hover too weak
- active row too weak or too strong
- table header contrast slightly low
- textarea/input contrast issue
- toast readability issue
- one responsive stacking surface issue

Recommended patch scope should then be only the exact selector/state that failed.

### Ready for next portal design batch

Classify as `ready for next portal design batch` if:

- this shell/table batch passes
- the remaining visible mismatch is mainly actions/buttons/utilities
- no stabilization patch is needed first

Expected likely next batch if this passes:

- portal action and utility control unification
