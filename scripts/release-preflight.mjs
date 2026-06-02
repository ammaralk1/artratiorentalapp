import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const args = process.argv.slice(2);
const includeDockerRehearsal = args.includes('--docker-integration');

function run(command, commandArgs, options = {}) {
  const { allowFailure = false, ...spawnOptions } = options;
  const label = [command, ...commandArgs].join(' ');
  console.log(`\n[preflight] ${label}`);

  const result = spawnSync(command, commandArgs, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...spawnOptions,
  });

  if (result.error) {
    console.error(`[preflight] Failed to start: ${label}`);
    if (allowFailure) {
      return false;
    }
    throw result.error;
  }

  if (result.status !== 0) {
    if (allowFailure) {
      return false;
    }
    throw new Error(`[preflight] Command failed: ${label}`);
  }

  return true;
}

function listPhpFiles(directory) {
  const files = [];
  const entries = readdirSync(directory);

  for (const entry of entries) {
    const path = join(directory, entry);
    const rel = relative(root, path);

    if (rel === 'backend/config.php' || rel.startsWith('vendor/')) {
      continue;
    }

    const stat = statSync(path);
    if (stat.isDirectory()) {
      files.push(...listPhpFiles(path));
    } else if (entry.endsWith('.php')) {
      files.push(rel);
    }
  }

  return files;
}

try {
  run('npm', ['audit', '--audit-level=high']);
  run('node', ['--check', 'scripts/safe-config-guard.mjs']);
  run('node', ['--check', 'scripts/run-migration-rehearsal.mjs']);
  run('node', ['--check', 'scripts/run-legacy-password-audit.mjs']);
  run('node', ['--check', 'scripts/run-production-release-window.mjs']);
  run('node', ['--check', 'scripts/run-production-migration-baseline.mjs']);

  for (const phpFile of listPhpFiles(join(root, 'backend'))) {
    run('php', ['-l', phpFile]);
  }

  run('npm', ['run', 'build']);

  if (includeDockerRehearsal) {
    run('npm', ['run', 'release:rehearsal', '--', '--docker-integration']);
    run('npm', ['run', 'test:integration'], {
      env: {
        ...process.env,
        INTEGRATION_API_BASE_URL: 'http://127.0.0.1:8080/api',
        INTEGRATION_USERNAME: 'integration_admin',
        INTEGRATION_PASSWORD: 'TestPassword123!',
      },
    });
  }

  console.log('\n[preflight] Release preflight completed.');
} catch (error) {
  console.error(error.message || error);
  process.exitCode = 1;
} finally {
  if (includeDockerRehearsal) {
    run('npm', ['run', 'integration:down'], { allowFailure: true });
  }
}
