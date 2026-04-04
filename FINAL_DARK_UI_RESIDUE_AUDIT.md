## Executive Summary

The remaining dark UI residue is now limited and no longer justifies broad cleanup. Most of the meaningful inconsistency work is already done, and what remains falls into three buckets:

- one good bounded follow-up candidate
- a few lower-value polish items
- several areas that are really semantic/status or subsystem work, not design-consistency cleanup

The single best remaining bounded batch is:

`Reservations quote preview/editor action unification`

Reason:
- visibly still blue-heavy in dark mode
- self-contained inside reservations
- low blast radius
- not blocked by semantic/status redesign

If that batch is not important to current priorities, the roadmap can effectively stop here without losing much value.

## Remaining Visible Residue Clusters

### 1. Reservations quote preview/editor action cluster

Primary file:
- [reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)

Representative selectors:
- [reservations.css#L1670](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1670)
  `.quote-terms-reset`
- [reservations.css#L1683](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1683)
  `.quote-terms-reset:hover`
- [reservations.css#L1688](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1688)
  `:is(html.dark-mode, body.dark-mode) .quote-preview-sidebar`
- [reservations.css#L1695](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1695)
  `:is(html.dark-mode, body.dark-mode) .quote-terms-editor__textarea`
- [reservations.css#L1701](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1701)
  `:is(html.dark-mode, body.dark-mode) .quote-terms-editor__textarea:focus`
- [reservations.css#L1706](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1706)
  `:is(html.dark-mode, body.dark-mode) .quote-terms-reset`
- [reservations.css#L1944](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1944)
  `.quote-preview-status-action`
- [reservations.css#L1955](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1955)
  `.quote-preview-status-action:hover`
- [reservations.css#L1960](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1960)
  `:is(html.dark-mode, body.dark-mode) .quote-preview-status-action`
- [reservations.css#L1965](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css#L1965)
  `:is(html.dark-mode, body.dark-mode) .quote-preview-status-action:hover`

Why it still stands out:
- still uses blue hover/focus accents and sidebar border treatment
- sits next to already unified reservations notes/terms/billing controls
- visually reads like an older dark subsystem

Classification:
- `worth fixing now`

### 2. Global theme/language toggle buttons

Primary file:
- [app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)

Representative selectors:
- [app.css#L4330](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4330)
  `.language-toggle-btn, .theme-toggle-btn`
- [app.css#L4350](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4350)
  `.language-toggle-btn:hover, .theme-toggle-btn:hover`
- [app.css#L4356](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L4356)
  `:where(html.dark, body.dark) .language-toggle-btn, .theme-toggle-btn`

Why it still stands out:
- very visible global controls
- still use a dark navy shell rather than the olive/slate shell tokens
- likely one of the first things users see

Classification:
- `worth fixing later`

Reason not first:
- higher visibility than the quote preview cluster, but also more global and therefore riskier for app-shell consistency

### 3. Reports charts/progress accent system

Primary file:
- [reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)

Representative selectors:
- [reports.css#L1513](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1513)
  `.reports-chart-bar .bar`
- [reports.css#L1558](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1558)
  `.reports-progress-bar`
- [reports.css#L1564](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css#L1564)
  `.reports-progress-fill`

Why it still stands out:
- blue accent remains the dominant chart/progress default
- looks slightly cooler than the surrounding reports cards after the recent unification work

Why it may be acceptable:
- charts and progress fills are allowed to carry stronger emphasis than surfaces/controls
- the accent is doing semantic/data work, not just skinning a control

Classification:
- `acceptable as-is`

### 4. Customer financial highlight/utility accents

Primary file:
- [app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)

Representative selectors:
- [app.css#L5074](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5074)
  `:where(html.dark, body.dark) .customer-page #customer-details .btn.btn-outline`
- [app.css#L5078](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5078)
  `:where(html.dark, body.dark) .customer-page .payment-line`
- [app.css#L5089](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css#L5089)
  `:where(html.dark, body.dark) .customer-page .bg-primary/10`

Why it still stands out:
- some financial/info accents still lean cooler and brighter than the olive/slate shell

Why it is not a good next cleanup batch:
- overlaps with semantic/status meaning and page-specific information hierarchy

Classification:
- `blocked by semantic/status work`

### 5. Core semantic chip / badge / status families

Primary file:
- [core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)

Representative selectors:
- [core.css#L752](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L752)
  chip variables
- [core.css#L807](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L807)
  blue chip family
- [core.css#L849](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css#L849)
  info chip family

Why it still stands out:
- some chip families still lean blue and glow-heavy

Why it should stay deferred:
- this is semantic/status ownership, not neutral design cleanup

Classification:
- `blocked by semantic/status work`

## Ranked Priority List

### 1. Reservations quote preview/editor action cluster

- Visibility: medium-high inside a real reservation workflow
- User impact: noticeable because it sits next to already unified reservations controls
- Scope size: small
- Blast radius: low
- Rank: highest

### 2. Global theme/language toggle buttons

- Visibility: high
- User impact: moderate-high
- Scope size: small-medium
- Blast radius: medium because they live in the app shell
- Rank: second

### 3. Reports charts/progress accent defaults

- Visibility: medium
- User impact: moderate
- Scope size: medium
- Blast radius: medium inside the reports subsystem
- Rank: third

### 4. Customer financial/info accent cluster

- Visibility: medium
- User impact: moderate
- Scope size: medium
- Blast radius: medium-high
- Rank: lower because it is partly semantic

### 5. Core chips/status families

- Visibility: high across the app
- User impact: high if changed badly
- Scope size: large
- Blast radius: high
- Rank: lowest near-term candidate because it is explicitly blocked

## Fix Now vs Later vs Acceptable-As-Is

### Worth Fixing Now

- Reservations quote preview/editor action cluster in [reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css)

### Worth Fixing Later

- Global theme/language toggle buttons in [app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)

### Acceptable As-Is

- Reports chart/progress accent defaults in [reports.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reports.css)

Reason:
- stronger accent usage is justified in data visualization more than in controls/surfaces

### Blocked by Semantic/Status Work

- Customer financial/info accent cluster in [app.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/app.css)
- Core chip/badge/status families in [core.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/core.css)

## Recommended Next Bounded Batch

If you want one more meaningful design-consistency batch, the best one is:

`Reservations quote preview/editor action unification`

Recommended scope:
- quote preview sidebar surface/border
- quote terms reset button
- quote terms textarea focus treatment
- quote preview status action hover/active treatment

Recommended files:
- [reservations.css](/Users/ammaralkhatib/Documents/Art Ratio APP V2/V2/src/styles/reservations.css) only

Why this is the best next batch:
- tightly scoped
- low blast radius
- directly adjacent to reservations controls already moved into the olive/slate language
- high enough visibility to matter

If you do not want another small polish batch, the roadmap can effectively stop here:

- the remaining inconsistencies are either low-value cosmetic residue
- or they belong to semantic/status or broader subsystem design work rather than this design-consistency pass
