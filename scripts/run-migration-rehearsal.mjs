import { spawnSync } from 'node:child_process';
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

function run(command, commandArgs, { allowFailure = false } = {}) {
  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    shell: false,
  });

  if (result.error) {
    if (allowFailure) {
      return false;
    }
    throw result.error;
  }

  if (result.status !== 0) {
    if (allowFailure) {
      return false;
    }
    process.exit(result.status ?? 1);
  }

  return true;
}

function printUsage() {
  console.log(`Usage:
  node scripts/run-migration-rehearsal.mjs --config /path/to/staging-config.php
  node scripts/run-migration-rehearsal.mjs --config /safe/production-config.php --allow-production-readonly
  node scripts/run-migration-rehearsal.mjs --docker-integration

The rehearsal runs:
  1. schema_report.php
  2. migrate.php --status
  3. migrate.php --dry-run

It does not apply migrations.`);
}

function runWithConfig(configPath) {
  try {
    assertSafeExternalConfigPath(configPath, {
      purpose: 'rehearsal',
      allowProductionReadonly: hasArg('--allow-production-readonly'),
    });
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }

  run('php', ['backend/tools/schema_report.php', '--config', configPath]);
  run('php', ['backend/tools/migrate.php', '--config', configPath, '--status']);
  run('php', ['backend/tools/migrate.php', '--config', configPath, '--dry-run']);
}

function runWithDockerIntegration() {
  const dockerAvailable = run('docker', ['info'], { allowFailure: true });
  if (!dockerAvailable) {
    console.error('Docker is not running or not reachable. Start Docker Desktop, then rerun with --docker-integration.');
    process.exit(1);
  }

  run('npm', ['run', 'integration:up']);
  run('docker', ['exec', 'art_ratio_test_php', 'php', 'backend/tools/schema_report.php', '--config', 'backend/config.php']);
  run('docker', ['exec', 'art_ratio_test_php', 'php', 'backend/tools/migrate.php', '--config', 'backend/config.php', '--status']);
  run('docker', ['exec', 'art_ratio_test_php', 'php', 'backend/tools/migrate.php', '--config', 'backend/config.php', '--baseline']);
  run('docker', ['exec', 'art_ratio_test_php', 'php', 'backend/tools/schema_report.php', '--config', 'backend/config.php']);
  run('docker', ['exec', 'art_ratio_test_php', 'php', 'backend/tools/migrate.php', '--config', 'backend/config.php', '--dry-run']);
}

if (hasArg('--help') || args.length === 0) {
  printUsage();
  process.exit(args.length === 0 ? 1 : 0);
}

const configPath = getArgValue('--config');
if (configPath) {
  runWithConfig(configPath);
  process.exit(0);
}

if (hasArg('--docker-integration')) {
  runWithDockerIntegration();
  process.exit(0);
}

printUsage();
process.exit(1);
