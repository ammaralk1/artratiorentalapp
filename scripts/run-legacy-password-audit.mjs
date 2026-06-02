import { spawnSync } from 'node:child_process';
import { assertSafeExternalConfigPath } from './safe-config-guard.mjs';

const args = process.argv.slice(2);

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

function printUsage() {
  console.log(`Usage:
  node scripts/run-legacy-password-audit.mjs --config /path/to/staging-config.php
  node scripts/run-legacy-password-audit.mjs --config /safe/production-config.php --allow-production-readonly

The audit reads users from a staging or backup-clone database and reports legacy password hashes.
It refuses runtime, example, placeholder, and obvious production configs unless --allow-production-readonly is present.`);
}

if (args.includes('--help') || args.length === 0) {
  printUsage();
  process.exit(args.length === 0 ? 1 : 0);
}

const configPath = getArgValue('--config');
if (!configPath) {
  printUsage();
  process.exit(1);
}

try {
  assertSafeExternalConfigPath(configPath, {
    purpose: 'legacy password audit',
    allowProductionReadonly: args.includes('--allow-production-readonly'),
  });
} catch (error) {
  console.error(error.message || error);
  process.exit(1);
}

const result = spawnSync('php', ['backend/tools/audit_legacy_password_hashes.php', '--config', configPath], {
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
