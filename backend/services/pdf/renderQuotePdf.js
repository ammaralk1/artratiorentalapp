#!/usr/bin/env node

import { readFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, webkit } from 'playwright';

const DEFAULT_MARGIN = {
  top: '10mm',
  right: '10mm',
  bottom: '12mm',
  left: '12mm'
};

function parseArgs(argv) {
  const args = {};
  for (const entry of argv.slice(2)) {
    const [key, value] = entry.split('=');
    if (!key.startsWith('--')) continue;
    const normalizedKey = key.slice(2);
    args[normalizedKey] = value ?? true;
  }
  return args;
}

async function ensureDirectory(filePath) {
  const directory = dirname(filePath);
  await mkdir(directory, { recursive: true });
}

async function renderPdf({ input, output, browser = 'chromium', baseUrl, margin = DEFAULT_MARGIN }) {
  if (!input || !output) {
    throw new Error('Both --input and --output parameters are required.');
  }

  const htmlContent = await readFile(input, 'utf8');

  const launchOptions = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  let browserInstance;
  if (browser === 'webkit') {
    browserInstance = await webkit.launch(launchOptions);
  } else {
    browserInstance = await chromium.launch(launchOptions);
  }

  const page = await browserInstance.newPage();

  if (baseUrl) {
    await page.setContent(htmlContent, { waitUntil: 'networkidle', baseURL: baseUrl });
  } else {
    await page.setContent(htmlContent, { waitUntil: 'networkidle' });
  }

  await page.emulateMedia({ media: 'screen' });

  await ensureDirectory(output);

  await page.pdf({
    path: output,
    format: 'A4',
    printBackground: true,
    margin
  });

  await browserInstance.close();
}

async function main() {
  try {
    const args = parseArgs(process.argv);
    const input = args.input || args.i;
    const output = args.output || args.o;
    const browser = args.browser || 'chromium';
    const baseUrl = args.baseUrl || args['base-url'];

    const margin = {
      top: args.marginTop || DEFAULT_MARGIN.top,
      right: args.marginRight || DEFAULT_MARGIN.right,
      bottom: args.marginBottom || DEFAULT_MARGIN.bottom,
      left: args.marginLeft || DEFAULT_MARGIN.left
    };

    await renderPdf({ input, output, browser, baseUrl, margin });
  } catch (error) {
    console.error('[playwright/pdf] generation failed:', error);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
