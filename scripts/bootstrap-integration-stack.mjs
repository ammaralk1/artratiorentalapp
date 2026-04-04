import { execFileSync } from 'node:child_process';

const composeArgs = ['compose', '-f', 'tests/integration/docker-compose.yml'];
const integrationUserHash = '$2y$12$63S8H0nG.o3tAb0kvwPhoeBX/96ssqXMNtla16BqL9AlfviYdF0oW';

function runDocker(args, { allowFailure = false } = {}) {
  try {
    execFileSync('docker', args, { stdio: 'inherit' });
    return true;
  } catch (error) {
    if (allowFailure) {
      return false;
    }
    throw error;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForPhpContainer() {
  for (let attempt = 1; attempt <= 30; attempt += 1) {
    const ready = runDocker(['exec', 'art_ratio_test_php', 'php', '-v'], { allowFailure: true });
    if (ready) {
      return;
    }
    await sleep(1000);
  }

  throw new Error('Timed out waiting for art_ratio_test_php to become ready.');
}

async function main() {
  runDocker([...composeArgs, 'up', '-d']);
  await waitForPhpContainer();

  runDocker(['exec', 'art_ratio_test_php', 'php', 'backend/tools/apply_phase4_schema_updates.php']);
  runDocker([
    'exec',
    'art_ratio_test_db',
    'mysql',
    '-uart_ratio',
    '-ptestpassword',
    'art_ratio_test',
    '-e',
    `INSERT INTO users (username, password_hash, role)
     VALUES ('integration_admin', '${integrationUserHash}', 'admin')
     ON DUPLICATE KEY UPDATE
       password_hash = VALUES(password_hash),
       role = VALUES(role);`,
  ]);
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
