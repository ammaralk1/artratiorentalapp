# Branching Strategy

## Current Risk

The repository deploy workflow runs on pushes to `main`. That means `main` is not a safe place for active implementation.

## Immediate Rule

Do not implement on `main`.

The current improvement program has been moved to:

```text
phase-0-environment-control
```

## Branch Types

### `phase/*`

Use for staged program work that spans multiple related fixes or documentation deliverables.

Examples:

- `phase-0-environment-control`
- `phase-1-local-foundation`
- `phase-2-test-baseline`

### `fix/*`

Use for tightly scoped corrective work.

Examples:

- `fix/api-client-abort-signal`
- `fix/core-endpoint-authorization`

### `release/*`

Use only after local and staging verification is complete and a production rollout package is being prepared.

Example:

- `release/2026-04-backoffice-safety-batch`

## Merge Flow

1. Implement on a `phase/*` or `fix/*` branch
2. Validate locally
3. Run automated tests
4. Validate on staging once staging exists
5. Prepare release notes, rollback steps, and smoke checks
6. Merge to `main` only for an approved release

## Hard Rules

- No direct implementation commits on `main`
- No direct pushes to `main` during active refactor work
- No staging or production assumptions should be validated from a developer branch alone
- Every phase should leave the app in a locally testable state

## Recommended Review Gates Before `main`

- Local stack boots successfully
- Core automated tests pass or are explicitly documented
- Changed workflows are verified against acceptance criteria
- Staging verification is complete
- Rollback and smoke-test documents exist for the release batch
