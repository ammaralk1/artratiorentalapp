# Production Lock

Production is out of scope for active implementation in this program.

## Locked Items

- Production database
- Production storage credentials
- Production SMTP credentials
- Production Telegram credentials
- Production deploy workflow on `main`
- Any live user/session/activity data

## Do Not Do

- Do not run local development against production config
- Do not restore or copy production data into local or staging
- Do not push implementation work to `main`
- Do not test refactors against live services
- Do not treat the current on-disk `backend/config.php` as an approved local runtime source

## Approved Non-Production Path

- Frontend local: Vite on `localhost:5173`
- Backend/API local: Docker integration stack on `127.0.0.1:8080`
- Database local: Docker MySQL on `127.0.0.1:33306`
- Seed data: `backend/sql/*.sql` plus `tests/integration/docker/init/10-seed-user.sql`

## Release Condition

Production remains locked until all of the following exist:

- release plan
- rollback plan
- migration rehearsal
- post-deploy checklist
- approved staging verification
