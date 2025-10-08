#!/usr/bin/env node

import { watch } from 'fs';
import { execFileSync } from 'child_process';
import path from 'path';

const WATCH_ROOT = process.cwd();
const IGNORED_SEGMENTS = new Set(['.git', 'node_modules', 'dist', '.vscode', '.idea']);
const DEFAULT_DEBOUNCE = 2000;
const DEBOUNCE_MS = Number.parseInt(process.env.AUTO_SYNC_DEBOUNCE_MS || '', 10) || DEFAULT_DEBOUNCE;

let debounceHandle = null;
let syncInFlight = false;
let syncQueued = false;
let lastTrigger = 'filesystem-change';

function toUnixPath(value = '') {
  return value.replace(/\\/g, '/');
}

function shouldIgnore(relativePath = '') {
  if (!relativePath) return false;
  const segments = toUnixPath(relativePath).split('/');
  return segments.some((segment) => IGNORED_SEGMENTS.has(segment) || segment.startsWith('.DS_'));
}

function runGit(args, { capture = false } = {}) {
  const options = {
    cwd: WATCH_ROOT,
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : ['ignore', 'inherit', 'inherit'],
    encoding: 'utf8'
  };
  const output = execFileSync('git', args, options);
  return output?.toString?.() ?? '';
}

function performSync(triggerReason) {
  syncInFlight = true;
  try {
    const status = runGit(['status', '--porcelain'], { capture: true }).trim();
    if (!status) {
      return;
    }

    console.log(`[auto-sync] Staging changes triggered by ${triggerReason}`);
    runGit(['add', '--all']);

    const timestamp = new Date().toISOString().replace(/[:]/g, '-');
    const message = `auto-sync: ${timestamp}`;

    const commitOutput = runGit(['commit', '-m', message], { capture: true });
    if (commitOutput) {
      console.log(commitOutput.trim());
    }

    const pushOutput = runGit(['push'], { capture: true });
    if (pushOutput) {
      console.log(pushOutput.trim());
    }
  } catch (error) {
    console.error('[auto-sync] Sync failed:', error?.message ?? error);
    if (error?.stdout) {
      console.error(error.stdout.toString().trim());
    }
    if (error?.stderr) {
      console.error(error.stderr.toString().trim());
    }
  } finally {
    syncInFlight = false;
    if (syncQueued) {
      syncQueued = false;
      scheduleSync('queued-change');
    }
  }
}

function scheduleSync(reason) {
  lastTrigger = reason;
  if (syncInFlight) {
    syncQueued = true;
    return;
  }

  if (debounceHandle) {
    clearTimeout(debounceHandle);
  }

  debounceHandle = setTimeout(() => {
    debounceHandle = null;
    performSync(lastTrigger);
  }, DEBOUNCE_MS);
}

console.log('[auto-sync] Watching for changes...');

watch(WATCH_ROOT, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (shouldIgnore(filename)) return;
  const relative = toUnixPath(filename);
  const reason = `${eventType}:${relative}`;
  console.log(`[auto-sync] Detected ${reason}`);
  scheduleSync(reason);
});

process.on('SIGINT', () => {
  console.log('\n[auto-sync] Stopping watcher');
  process.exit(0);
});
