import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
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
  console.log(`\n[production-window] ${label}`);

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
  node scripts/run-production-release-window.mjs --config /safe/production-config.php --backup-dir /safe/backups --confirm-production-window
  node scripts/run-production-release-window.mjs --config /safe/production-config.php --backup-dir /safe/backups --dry-run

This runner enforces the production release-window order:
  1. database backup
  2. read-only schema/migration rehearsal
  3. read-only legacy password audit

It never applies migrations.`);
}

if (hasArg('--help') || args.length === 0) {
  printUsage();
  process.exit(args.length === 0 ? 1 : 0);
}

const configPath = getArgValue('--config');
const backupDir = getArgValue('--backup-dir');
const dryRun = hasArg('--dry-run');
const confirmed = hasArg('--confirm-production-window');

if (!configPath || !backupDir) {
  printUsage();
  process.exit(1);
}

if (!dryRun && !confirmed) {
  console.error('Refusing to run production window without --confirm-production-window. Use --dry-run to validate commands safely.');
  process.exit(1);
}

try {
  assertSafeExternalConfigPath(configPath, {
    purpose: 'production release window',
    allowProductionReadonly: true,
  });
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

const resolvedBackupDir = resolve(backupDir);
mkdirSync(resolvedBackupDir, { recursive: true, mode: 0o700 });

if (dryRun) {
  run('npm', ['run', 'release:backup', '--', '--config', configPath, '--output-dir', resolvedBackupDir, '--dry-run']);
  console.log('\n[production-window] Dry run completed. No backup, rehearsal, or audit was executed.');
  process.exit(0);
}

run('npm', ['run', 'release:backup', '--', '--config', configPath, '--output-dir', resolvedBackupDir, '--retention-days', '14']);
run('npm', ['run', 'release:rehearsal', '--', '--config', configPath, '--allow-production-readonly']);
run('npm', ['run', 'release:legacy-password-audit', '--', '--config', configPath, '--allow-production-readonly']);

console.log('\n[production-window] Production release-window checks completed. Review output before any migration baseline or apply step.');
