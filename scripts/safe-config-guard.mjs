import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

export function assertSafeExternalConfigPath(configPath, { purpose = 'tool', allowProduction = false, allowProductionReadonly = false } = {}) {
  const resolvedConfigPath = resolve(configPath);
  const localRuntimeConfigPath = resolve('backend/config.php');
  const configFileName = basename(resolvedConfigPath);

  if (resolvedConfigPath === localRuntimeConfigPath) {
    throw new Error(`Refusing to run ${purpose} with backend/config.php. Use a staging or backup-clone config outside the runtime path.`);
  }

  if (configFileName.includes('.example.')) {
    throw new Error(`Refusing to run ${purpose} with example config: ${configPath}`);
  }

  let configSource = '';
  try {
    configSource = readFileSync(resolvedConfigPath, 'utf8');
  } catch (error) {
    throw new Error(`Unable to read config file: ${configPath}\n${error.message || error}`);
  }

  const placeholderMarkers = [
    'STAGING_DB_HOST',
    'STAGING_DB_USER',
    'STAGING_DB_PASSWORD',
    'STAGING_CLOUDFLARE_ACCOUNT_ID',
    'STAGING_SIRV_CLIENT_ID',
    'STAGING_SMTP_PASSWORD',
    'STAGING_TELEGRAM_BOT_TOKEN',
    'PRODUCTION_DB_HOST',
    'PRODUCTION_DB_NAME',
    'PRODUCTION_DB_USER',
    'PRODUCTION_DB_PASSWORD',
    'YOUR_DATABASE_NAME',
    'YOUR_DATABASE_USER',
    'YOUR_DATABASE_PASSWORD',
    'YOUR_CLOUDFLARE_ACCOUNT_ID',
    'YOUR_R2_ACCESS_KEY_ID',
    'YOUR_R2_SECRET_ACCESS_KEY',
    'YOUR_SIRV_CLIENT_ID',
    'YOUR_SIRV_CLIENT_SECRET',
    'YOUR_SMTP_PASSWORD',
    'YOUR_TELEGRAM_BOT_TOKEN',
    'YOUR_PRODUCTION_DOMAIN',
    'example.com',
  ];

  const marker = placeholderMarkers.find((value) => configSource.includes(value));
  if (marker) {
    throw new Error(`Refusing to run ${purpose} because the config still contains placeholder value: ${marker}`);
  }

  if (configSource.includes('art_ratio_production') && !allowProductionReadonly && !allowProduction) {
    throw new Error(`Refusing to run ${purpose} because the config appears to target the production database.`);
  }
}
