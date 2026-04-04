# Environment Plan

## Phase Goal

Create a safe implementation path for the back-office application so local work, automated tests, and future staging activity cannot accidentally touch production.

This phase covers only the internal back-office app and its supporting backend/API. The front-facing website template in `Arino - Template/` is out of scope unless a back-office runtime dependency is shared.

## Current Repo Reality

- Frontend dev server: Vite on `http://localhost:5173`
- Frontend API base: taken from `VITE_API_BASE_URL` in `.env.local` when present, otherwise falls back to `/backend/api`
- Backend runtime config: `backend/config.php`
- Backend config template: `backend/config.example.php`
- Integration/local Docker backend config: `tests/integration/config.testing.php`
- Integration Docker stack: `tests/integration/docker-compose.yml`
- Deployment trigger: pushes to `main` run `.github/workflows/deploy.yml`

## Confirmed Risks

- `main` is deployment-sensitive. A normal push to `main` can trigger a production deployment workflow.
- The repo currently contains a local `backend/config.php` with production-sensitive credentials. That file is ignored by git but still exists on disk and is dangerous if reused locally.
- The frontend currently allows a locally baked API base through `.env.local`, which can drift away from the actual backend that is running.
- Multiple pages embed production domains in CSP rules and asset URLs. That does not block local work, but it is a real environment coupling to track.
- There is no confirmed staging environment definition in this repo yet.

## Approved Environment Model

### Local

Purpose: active implementation, isolated debugging, local QA, and repeatable test runs.

Rules:

- Use the Docker integration stack as the default backend/MySQL source of truth.
- Use seeded non-production data only.
- Frontend should target the local backend explicitly.
- Local notifications, storage, and external services must stay disabled or pointed at sandbox/test credentials.

Runtime target:

- Frontend: `http://localhost:5173`
- Backend API: `http://127.0.0.1:8080/api`
- MySQL: `127.0.0.1:33306`

### Staging

Purpose: pre-production verification using isolated infrastructure and sanitized or synthetic data.

Rules:

- Separate domain/subdomain from production
- Separate database from production
- Separate backend config from production
- Separate storage bucket/path from production
- Separate SMTP / Telegram / notification routing from production
- No production secrets, no production backups, no production data restores

Status:

- Not yet defined in the repository
- Must be created before any pre-production validation can be considered complete

### Production

Purpose: live customer-facing internal operations environment.

Rules:

- Out of scope for active implementation in this program
- No local development or test run may use production config, services, or data
- No direct code work on `main`
- No release without an explicit rollout, rollback, and verification plan

## Safe Run Paths

### Local frontend only

```bash
npm run dev
```

### Local backend + database via Docker

```bash
npm run integration:up
```

This stack mounts `tests/integration/config.testing.php` into `/app/backend/config.php`, which is the correct safe default for local backend/API work.

### Local automated tests

Unit / jsdom:

```bash
npm run test:reservations
```

Integration:

```bash
export INTEGRATION_API_BASE_URL=http://127.0.0.1:8080/api
export INTEGRATION_USERNAME=integration_admin
export INTEGRATION_PASSWORD=TestPassword123!
npm run test:integration
```

## Environment Separation Rules

1. Never use the local on-disk `backend/config.php` as the active config for Docker-based local or staging work.
2. Treat `tests/integration/config.testing.php` as the only approved backend config for the local Docker integration stack.
3. Keep frontend local API targets explicit. For Docker-based local verification, use `http://127.0.0.1:8080/api`.
4. Do not route local or staging traffic to production domains, databases, buckets, SMTP servers, or notification recipients.
5. Any future staging environment must have its own config file, secrets store, and database bootstrap path.

## Immediate Controls Adopted In This Program

- Active work has been moved off `main` onto `phase-0-environment-control`.
- Phase 0 documentation is being added before any feature or refactor work.
- Local verification will prefer the isolated Docker stack over any ad hoc PHP/MySQL runtime.
- Production remains locked out until release planning is complete.

## Phase 0 Exit Criteria

- A documented local / staging / production separation model exists
- Implementation is not happening on `main`
- Local run path is explicit and non-production
- Staging requirements are documented even if staging is not built yet
- Production is explicitly locked out of the current implementation program
