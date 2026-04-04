import { beforeEach, describe, expect, it, vi } from 'vitest';

import { templatesTabState } from '../../../src/scripts/projects/templatesTab/state.ts';
import {
  autosaveToServerDebounced,
  buildRemoteAutosaveStorageKey,
  readRemoteAutosaveId,
  sanitizeHtmlForExport,
  writeRemoteAutosaveId,
} from '../../../src/scripts/projects/templatesTab/autosave.ts';

describe('templatesTab/autosave', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
    templatesTabState.remoteAutosaveTimer = null;
    vi.useRealTimers();
  });

  it('builds, reads, and writes remote autosave ids by context key', () => {
    expect(buildRemoteAutosaveStorageKey('templates.callsheet.autosave.1.expenses.all')).toBe(
      'remoteAutosaveId:templates.callsheet.autosave.1.expenses.all',
    );

    expect(readRemoteAutosaveId('templates.callsheet.autosave.1.expenses.all')).toBeNull();

    writeRemoteAutosaveId('templates.callsheet.autosave.1.expenses.all', 55);
    expect(readRemoteAutosaveId('templates.callsheet.autosave.1.expenses.all')).toBe(55);
  });

  it('sanitizes export html and rewrites legacy logo URLs', () => {
    const html = `
      <div onclick="alert(1)">
        <script>alert('x')</script>
        <img src="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png" onload="hack()">
      </div>
    `;

    const out = sanitizeHtmlForExport(html, { logoUrl: '/brand/logo.png' });

    expect(out).not.toContain('<script');
    expect(out).not.toContain('onclick=');
    expect(out).not.toContain('onload=');
    expect(out).toContain('/brand/logo.png');
  });

  it('debounces autosave execution through shared state timer', async () => {
    vi.useFakeTimers();
    const run = vi.fn(async () => {});

    autosaveToServerDebounced(run, 800);
    autosaveToServerDebounced(run, 800);

    expect(run).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(799);
    expect(run).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(run).toHaveBeenCalledTimes(1);
  });
});
