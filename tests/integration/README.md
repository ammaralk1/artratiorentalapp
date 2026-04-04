# Integration Test Environment

The integration suite hits the real PHP API over HTTP and therefore needs a running
backend + MySQL instance. The repository ships with a Docker Compose definition that
provisions both services and seeds a deterministic dataset.

## Quick start

```bash
# From the project root
$ npm run integration:up        # starts MySQL + PHP dev server and applies the test schema patch

# Export the credentials used by the seeded database
$ export INTEGRATION_API_BASE_URL=http://127.0.0.1:8080/api
$ export INTEGRATION_USERNAME=integration_admin
$ export INTEGRATION_PASSWORD=TestPassword123!

# Run the tests from the project root
$ npm run test:integration
```

## Database seeding

The compose stack runs MySQL 8 with the following defaults:

- Host: `127.0.0.1`
- Port: `33306`
- Database: `art_ratio_test`
- User: `art_ratio`
- Password: `testpassword`

At startup, the container executes:

1. `backend/sql/auth_schema.sql`
2. `backend/seeds/dev_sample_data.sql` (seed data — uses DROP TABLE, not a tracked migration)
3. `backend/sql/add_technician_positions_table.sql`
4. deterministic admin re-seeding for `integration_admin`

This creates the full schema with sample reservations/equipment and an admin user
(`integration_admin` / `TestPassword123!`).

## Tearing down

```bash
$ npm run integration:down
```

## Notes

- The PHP container uses the test-specific config in `tests/integration/config.testing.php`.
- The PHP service is built from `tests/integration/docker/php/Dockerfile`, which enables the `pdo_mysql` extension required by the API.
- If you add a migration, create `backend/sql/YYYYMMDD_description.sql` and rebuild the stack. The Docker init mounts `backend/sql/` into the container but does not auto-apply new files — the stack re-seeds from scratch on each `integration:up`.
- The compose services share the `art_ratio_test_network` network so you can attach
  additional tooling (e.g. MySQL Workbench) by targeting `127.0.0.1:33306`.
