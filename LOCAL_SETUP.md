# Local Setup

## Phase Goal

Run the back-office application locally against an isolated backend and database without touching production config, production data, or production services.

## Scope

- Back-office frontend in `src/pages`, `src/scripts`, and `src/styles`
- PHP backend in `backend/`
- Local/integration Docker stack in `tests/integration/`

Out of scope:

- `Arino - Template/`
- production deployment
- production credentials or production data

## Verified Local Runtime

The current verified local runtime is:

- Frontend dev server: `http://127.0.0.1:5173`
- Backend API: `http://127.0.0.1:8080/api`
- MySQL: `127.0.0.1:33306`

The backend/API and database are provided by the Docker integration stack, which mounts the safe test config from `tests/integration/config.testing.php`.

## Standard Startup Path

### 1. Start the isolated backend and database

```bash
npm run integration:up
```

### 2. Point the frontend at the isolated backend

Create `.env.local` from `.env.example` if needed:

```bash
cp .env.example .env.local
```

The expected value is:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8080/api
```

### 3. Start the back-office frontend

Preferred command:

```bash
npm run backoffice:local:dev
```

This starts Vite on `127.0.0.1:5173` and injects the isolated API base.

### 4. Run the smoke check

```bash
npm run backoffice:local:smoke
```

This validates:

- login against the local API
- authenticated session status
- summary endpoint access

## Verified Credentials For The Seeded Stack

- Username: `integration_admin`
- Password: `TestPassword123!`

These are re-seeded by the integration bootstrap and are safe for local integration use only.

## Backend And Database Bootstrap

The Docker stack provisions:

1. MySQL 8
2. `backend/sql/auth_schema.sql`
3. `backend/seeds/dev_sample_data.sql` (seed data — uses DROP TABLE, never a migration)
4. `backend/sql/add_technician_positions_table.sql`
5. deterministic admin re-seeding for `integration_admin`

That gives a seeded local environment with users, customers, equipment, reservations, projects, and maintenance sample data.

## Database Migrations

Schema changes are tracked in a `schema_migrations` table. The runner lives at `backend/tools/migrate.php`.

### Common commands

```bash
# Show applied vs pending migrations
php backend/tools/migrate.php --status

# Apply all pending migrations
php backend/tools/migrate.php

# Preview what would run (no DB changes)
php backend/tools/migrate.php --dry-run

# First-time setup on an existing database: mark all SQL files as applied
# without re-running them (run this once when setting up migrate.php on
# a database that already has all the tables)
php backend/tools/migrate.php --baseline
```

### Adding a new migration

1. Create a `.sql` file in `backend/sql/` named `YYYYMMDD_description.sql`
   (e.g. `20260404_add_equipment_status_column.sql`).
2. Write idempotent SQL where possible (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`).
3. Run `php backend/tools/migrate.php` to apply it.
4. Commit both the SQL file and any code that depends on the new schema together.

### Seed data vs migrations

`backend/seeds/` contains data-only scripts that use `DROP TABLE` and are safe to re-run
on a fresh local database. These are **not** migrations and are never tracked in
`schema_migrations`. Do not put seed files in `backend/sql/`.

## Local Shutdown

```bash
npm run integration:down
```

## Known Issues Still Present

- Several back-office pages still embed CSP `connect-src` entries for `127.0.0.1:8000` / `localhost:8000`, which is stale relative to the verified Docker backend on `8080`.
- Several internal pages still reference production asset URLs directly. This does not block local operation but remains an environment coupling to clean up later.
- The repo still contains a local `backend/config.php` on disk. Do not use it for the Docker-backed local workflow.

## Phase 1 Verification Performed

- Docker stack boots successfully
- Seeded admin login works against `http://127.0.0.1:8080/api/auth/`
- Authenticated summary endpoint responds correctly
- Vite dev server boots on `http://127.0.0.1:5173`
- Vite-served modules correctly receive `VITE_API_BASE_URL=http://127.0.0.1:8080/api`
