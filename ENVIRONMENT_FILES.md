# Environment File Structure

## Current Files

### `/.env`

- Status: tracked
- Current role: effectively unused in the current repo state
- Notes: empty file at the moment

### `/.env.local`

- Status: untracked
- Current role: local frontend override for `VITE_API_BASE_URL`
- Current observed value: points the frontend at `http://127.0.0.1:8000/api`
- Risk: this can diverge from the Docker integration backend, which runs at `http://127.0.0.1:8080/api`

### `/backend/config.example.php`

- Status: tracked
- Current role: backend config template
- Use: source template for any non-production backend config generation

### `/backend/config.php`

- Status: ignored by git
- Current role: actual backend runtime config
- Risk: a production-sensitive copy currently exists on disk in this repo checkout
- Rule: do not use this file for local Docker integration or any future staging environment

### `/tests/integration/config.testing.php`

- Status: tracked
- Current role: safe backend config for the Docker integration stack
- Use: mounted into the PHP container as `/app/backend/config.php`

## Required Usage By Environment

### Local Docker integration

- Frontend env source: `.env.local`
- Required API target: `http://127.0.0.1:8080/api`
- Backend config source: `tests/integration/config.testing.php`
- Database source: MySQL container from `tests/integration/docker-compose.yml`

### Local non-Docker backend

- Frontend env source: `.env.local`
- Backend config source: manually created untracked `backend/config.php`
- Rule: local-only credentials and local-only database name must be used
- Status: allowed only if it remains fully isolated from production

### Staging

- Frontend env source: dedicated staging env file or deployment variable set
- Backend config source: dedicated staging config file or secret injection
- Rule: must not reuse production secrets or production data
- Status: not implemented yet

### Production

- Frontend env source: deployment-time values only
- Backend config source: deployment-time secret injection
- Rule: never reuse local or staging config artifacts

## Required Follow-Up

1. Update `.env.local` to match the verified local backend path during Phase 1.
2. Keep `backend/config.php` out of commits and out of local Docker workflows.
3. Introduce a dedicated staging config path in Phase 3.
4. Remove any remaining ambiguity between `8000` and `8080` once the local stack is verified end to end.
