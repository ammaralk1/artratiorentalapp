import { spawnSync } from 'node:child_process';
import { statSync } from 'node:fs';
import { resolve } from 'node:path';
import { assertSafeExternalConfigPath } from './safe-config-guard.mjs';

const args = process.argv.slice(2);

function hasArg(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function getArgValue(name) {
  const index = args.indexOf(name);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }

  const prefixed = args.find((arg) => arg.startsWith(`${name}=`));
  if (prefixed) {
    return prefixed.slice(name.length + 1);
  }

  return null;
}

function run(command, commandArgs) {
  const label = [command, ...commandArgs].join(' ');
  console.log(`\n[production-baseline] ${label}`);

  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function printUsage() {
  console.log(`Usage:
  node scripts/run-production-migration-baseline.mjs --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --confirm-production-baseline
  node scripts/run-production-migration-baseline.mjs --config /safe/production-config.php --backup-file /safe/backups/mysql-backup.sql.gz --dry-run

This runner is only for the case where production already has the expected schema
but schema_migrations is empty or incomplete. It baselines migration tracking only;
it does not apply SQL migration files.`);
}

if (hasArg('--help') || args.length === 0) {
  printUsage();
  process.exit(args.length === 0 ? 1 : 0);
}

const configPath = getArgValue('--config');
const backupFile = getArgValue('--backup-file');
const dryRun = hasArg('--dry-run');
const confirmed = hasArg('--confirm-production-baseline');

if (!configPath || !backupFile) {
  printUsage();
  process.exit(1);
}

if (!dryRun && !confirmed) {
  console.error('Refusing to baseline production without --confirm-production-baseline. Use --dry-run to validate inputs safely.');
  process.exit(1);
}

try {
  assertSafeExternalConfigPath(configPath, {
    purpose: 'production migration baseline',
    allowProduction: true,
  });
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

const resolvedBackupFile = resolve(backupFile);
let backupStats;
try {
  backupStats = statSync(resolvedBackupFile);
} catch (error) {
  console.error(`Backup file is required before production baseline and was not found: ${resolvedBackupFile}`);
  process.exit(1);
}

if (!backupStats.isFile() || backupStats.size <= 0) {
  console.error(`Backup file is empty or invalid: ${resolvedBackupFile}`);
  process.exit(1);
}

if (dryRun) {
  console.log(`[production-baseline] Dry run only. Backup file exists (${backupStats.size} bytes): ${resolvedBackupFile}`);
  run('php', ['backend/tools/migrate.php', '--config', configPath, '--status']);
  console.log('\n[production-baseline] Dry run completed. No baseline was written.');
  process.exit(0);
}

run('php', ['backend/tools/migrate.php', '--config', configPath, '--status']);
run('php', ['backend/tools/migrate.php', '--config', configPath, '--baseline']);
run('php', ['backend/tools/migrate.php', '--config', configPath, '--status']);

console.log('\n[production-baseline] Baseline completed. Run release:rehearsal read-only again and verify 0 pending migrations.');
