# Equipment Requests Portal Actions QA

## Executive summary

This QA pass is limited to the bounded action and utility control unification batch for the Equipment Requests portal.

It verifies:

- topbar utility actions
- filter apply action
- send message primary action
- retry-email utility action
- hover / focus-visible / active / disabled states
- semantic status-action coexistence

It does not reopen shell/table evaluation except where action readability depends on the surrounding surface.

Expected outcome labels:

- `safe as-is`
- `needs tiny stabilization patch`
- `portal visual track complete`

## Highest-risk checks

1. Primary action clarity
   - confirm the send-message button is now the clearest non-semantic primary action

2. Secondary utility balance
   - confirm refresh and apply feel calmer but still usable

3. Retry-email utility readability
   - confirm retry-email no longer feels like a blue outlier

4. Focus-visible clarity
   - confirm keyboard focus is obvious on primary and utility actions

5. Semantic coexistence
   - confirm pending / confirmed / cancelled status buttons still read correctly beside the new calmer utility controls

## Screen/state checklist

### 1. Topbar utility actions

Check:

- `#erp-refresh-btn`
- `#erp-logout-btn`

Verify:

- refresh now reads as a secondary utility control
- logout still reads clearly as destructive
- spacing and hierarchy in the topbar remain balanced
- hover state is visible
- focus-visible state is visible
- active/pressed state does not feel broken or overly jumpy
- disabled appearance, if reachable, does not collapse contrast

Fail conditions:

- refresh becomes too weak to discover
- refresh looks too similar to logout
- focus ring is too subtle or clipped

### 2. Filter action

Check:

- `#erp-apply-filter-btn`

Verify:

- it visually matches the utility-control family used by refresh
- it remains clearly associated with the search/select filter row
- hover/focus-visible/active states are visible
- it does not overpower the filter inputs

Fail conditions:

- apply looks detached from the filter row
- apply becomes too faint compared with the surrounding controls

### 3. Primary message action

Check:

- submit button inside `#erp-message-form`

Verify:

- it now reads as the clearest primary non-semantic action on the page
- contrast against the card and surrounding form fields is strong
- hover state adds emphasis without looking like the old blue theme
- focus-visible state is visible and clean
- active state still feels deliberate
- disabled state, if reachable, does not create a false destructive or error cue

Fail conditions:

- primary button is not visually stronger than refresh/apply/retry
- primary button loses contrast on the darker card

### 4. Retry-email utility action

Check:

- `.erp-btn-retry-email`

Verify:

- it feels like a small utility action, not a competing CTA
- its border and text remain readable inside the message log card
- hover/focus-visible/active states are visible
- disabled state still communicates non-interactive clearly

Fail conditions:

- retry button becomes too weak to notice
- retry button still looks like a separate blue subsystem

### 5. Semantic status-action coexistence

Check:

- `[data-set-status='pending']`
- `[data-set-status='confirmed']`
- `[data-set-status='cancelled']`

Verify:

- warning / success / danger meanings still read clearly
- the new primary/utility controls do not make these semantic actions feel accidental
- the semantic buttons remain understandable as status-changing actions, not general utilities

Fail conditions:

- semantic buttons now visually clash harder with the calmer utility buttons
- destructive status action becomes unclear

## Interaction-state checklist

### Hover

Verify for:

- refresh
- apply
- send message
- retry email

Expected:

- visible state change
- no abrupt old-blue flash
- no loss of text contrast

### Focus-visible

Verify for keyboard navigation:

- refresh
- apply
- send message
- retry email

Expected:

- obvious ring/outline
- ring not clipped by container
- focus remains readable in RTL

### Active / pressed

Verify for:

- refresh
- apply
- send message
- retry email

Expected:

- slight pressed feedback
- no jarring color jump
- no broken transform/layout shift

### Disabled

Verify where reachable:

- retry email during resend
- any loading/disabled path for primary or utility controls

Expected:

- reduced emphasis
- still readable
- clearly non-interactive

## RTL / responsive checks

### RTL

Verify:

- topbar actions still align naturally in Arabic/RTL
- filter apply button placement still feels correct
- message form button alignment feels intentional
- retry-email action placement inside log entries still reads naturally

### Responsive

At smaller widths:

Verify:

- topbar action wrapping stays clean
- filter row stack still makes sense
- send-message button still reads as primary even if full-width or wrapped
- retry-email button remains usable inside narrow log cards

Fail conditions:

- action grouping breaks visually on small screens
- utility and primary actions become hard to distinguish when wrapped

## Pass/fail criteria

### Safe as-is

Classify as `safe as-is` if:

- send-message is clearly primary
- refresh/apply/retry are calmer but still discoverable
- focus-visible and active states work cleanly
- semantic status buttons remain clear
- RTL/responsive behavior remains clean

### Needs tiny stabilization patch

Classify as `needs tiny stabilization patch` if exactly one narrow issue remains, such as:

- utility button too faint
- focus ring too weak or clipped
- pressed state too subtle or too strong
- retry-email contrast issue in message log
- mobile wrap issue for one action group

That patch should touch only the exact failing selector/state.

### Portal visual track complete

Classify as `portal visual track complete` if:

- this batch passes
- no major visual inconsistency remains beyond optional polish
- no further bounded portal design correction is necessary
