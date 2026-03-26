import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runLocalizedChecks } from './check-public-localized-shared.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const main = async () => {
  await runLocalizedChecks({
    repoRoot,
    target: 'release',
    label: 'check-public-localized-release',
  });
};

main().catch((error) => {
  console.error('[check-public-localized-release] Failed:', error.message);
  process.exitCode = 1;
});
