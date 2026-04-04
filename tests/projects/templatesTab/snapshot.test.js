import { beforeEach, describe, expect, it, vi } from 'vitest';

import { templatesTabState } from '../../../src/scripts/projects/templatesTab/state.ts';
import {
  applyTemplatesSnapshot,
  applyTemplatesSnapshotInPlace,
  getTemplatesSnapshot,
  markTemplatesEditingActivity,
  restoreTemplatesAutosaveIfPresent,
  saveAutosaveDebounced,
} from '../../../src/scripts/projects/templatesTab/snapshot.ts';

describe('templatesTab/snapshot', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    templatesTabState.editing = false;
    templatesTabState.editingTimer = null;
    templatesTabState.autosaveTimer = null;
    templatesTabState.previewZoom = 1.3;
    vi.useRealTimers();
  });

  it('marks editing active and autosaves remotely after idle timeout', async () => {
    vi.useFakeTimers();
    const autosaveToServerDebounced = vi.fn();

    markTemplatesEditingActivity({ autosaveToServerDebounced, idleDelay: 1200 });

    expect(templatesTabState.editing).toBe(true);
    await vi.advanceTimersByTimeAsync(1199);
    expect(autosaveToServerDebounced).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(templatesTabState.editing).toBe(false);
    expect(autosaveToServerDebounced).toHaveBeenCalledTimes(1);
  });

  it('debounces local autosave payloads into storage', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = '<div id="templates-a4-root"><div data-editable="true">Draft</div></div>';

    saveAutosaveDebounced({
      getContextKey: () => 'templates.callsheet.autosave.7.callsheet.all',
      getSnapshot: () => ({
        edits: ['Draft'],
        l: { s: 1, x: 0, y: 0, h: false },
        r: { url: '/client.png', s: 1, x: 0, y: 0 },
        sh: { cells: [1] },
      }),
      delay: 250,
    });

    await vi.advanceTimersByTimeAsync(249);
    expect(localStorage.getItem('templates.callsheet.autosave.7.callsheet.all')).toBeNull();

    await vi.advanceTimersByTimeAsync(1);
    const parsed = JSON.parse(localStorage.getItem('templates.callsheet.autosave.7.callsheet.all') || '{}');
    expect(parsed.snap.edits).toEqual(['Draft']);
    expect(parsed.html).toContain('templates-a4-root');
    expect(parsed.v).toBe(1);
  });

  it('captures and reapplies template snapshots in place', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <div class="cs-logo--left"><img></div>
        <div class="cs-logo--right" data-empty="1"><img></div>
        <table>
          <tbody>
            <tr><td data-editable="true">One</td><td data-editable="true">Two</td></tr>
          </tbody>
        </table>
      </div>
    `;

    const snapshot = getTemplatesSnapshot({
      snapshotShading: vi.fn(() => ({ shaded: true })),
      readPrimaryLogoState: vi.fn(() => ({ s: 1.2, x: 10, y: 11, h: false })),
      readSecondaryLogoState: vi.fn(() => ({ url: '/client.png', s: 0.9, x: -5, y: 6 })),
    });

    expect(snapshot).toEqual({
      edits: ['One', 'Two'],
      l: { s: 1.2, x: 10, y: 11, h: false },
      r: { url: '/client.png', s: 0.9, x: -5, y: 6 },
      sh: { shaded: true },
    });

    const cells = Array.from(document.querySelectorAll('[data-editable="true"]'));
    cells[0].innerHTML = 'Changed';
    cells[1].innerHTML = 'Edited';

    const writePrimaryLogoState = vi.fn();
    const writeSecondaryLogoState = vi.fn();
    const applyShadingSnapshot = vi.fn();

    applyTemplatesSnapshotInPlace({
      snap: snapshot,
      writePrimaryLogoState,
      writeSecondaryLogoState,
      applyShadingSnapshot,
    });

    expect(cells[0].innerHTML).toBe('One');
    expect(cells[1].innerHTML).toBe('Two');
    expect(document.querySelector('.cs-logo--left img')?.style.transform).toBe('scale(1.2) translate(10px, 11px)');
    expect(document.querySelector('.cs-logo--right img')?.getAttribute('src')).toBe('/client.png');
    expect(writePrimaryLogoState).toHaveBeenCalledWith({ s: 1.2, x: 10, y: 11, h: false });
    expect(writeSecondaryLogoState).toHaveBeenCalledWith({ url: '/client.png', s: 0.9, x: -5, y: 6 });
    expect(applyShadingSnapshot).toHaveBeenCalled();
  });

  it('restores stored html autosaves, rebinds helpers, and seeds history', () => {
    document.body.innerHTML = '<div id="templates-preview-host"></div>';
    localStorage.setItem(
      'templates.callsheet.autosave.7.callsheet.all',
      JSON.stringify({
        v: 1,
        ts: Date.now(),
        html: '<div id="templates-a4-root"><div class="cs-logo--left"><img></div><div class="cs-logo--right"><img></div><div data-editable="true">Saved</div></div>',
        snap: {
          edits: ['Saved'],
          l: { s: 1.1, x: 3, y: 4, h: false },
          r: { url: '/client.png', s: 1.4, x: 5, y: 6 },
          sh: { rows: [0] },
        },
      }),
    );

    const ensureCellToolbar = vi.fn();
    const attachCallsheetLogoBehaviors = vi.fn();
    const unifyCrewCallTables = vi.fn();
    const ensureSingleCrewTableStrict = vi.fn();
    const enforceCallsheetSizing = vi.fn();
    const pruneEmptyA4Pages = vi.fn();
    const pushTemplatesHistory = vi.fn();
    const applyTemplatesPreviewZoom = vi.fn();

    restoreTemplatesAutosaveIfPresent({
      getContextKey: () => 'templates.callsheet.autosave.7.callsheet.all',
      companyInfo: { logoUrl: '/brand/logo.png' },
      normalizeTemplateHtmlLegacyUrls: (html) => html,
      ensureCellToolbar,
      onToolbarAfterChange: vi.fn(),
      attachCallsheetLogoBehaviors,
      unifyCrewCallTables,
      ensureSingleCrewTableStrict,
      enforceCallsheetSizing,
      pruneEmptyA4Pages,
      pushTemplatesHistory,
      applyTemplatesPreviewZoom,
      writePrimaryLogoState: vi.fn(),
      writeSecondaryLogoState: vi.fn(),
      applyShadingSnapshot: vi.fn(),
      host: document.getElementById('templates-preview-host'),
    });

    expect(document.querySelector('#templates-preview-host #templates-a4-root [data-editable="true"]')?.innerHTML).toBe('Saved');
    expect(document.querySelector('#templates-preview-host #templates-a4-root')?.getAttribute('data-restored-autosave')).toBe('1');
    expect(ensureCellToolbar).toHaveBeenCalledTimes(1);
    expect(attachCallsheetLogoBehaviors).toHaveBeenCalledTimes(1);
    expect(unifyCrewCallTables).toHaveBeenCalledTimes(1);
    expect(ensureSingleCrewTableStrict).toHaveBeenCalledTimes(1);
    expect(enforceCallsheetSizing).toHaveBeenCalled();
    expect(pruneEmptyA4Pages).toHaveBeenCalledTimes(1);
    expect(pushTemplatesHistory).toHaveBeenCalledTimes(1);
    expect(applyTemplatesPreviewZoom).toHaveBeenCalledWith(1.3);
  });

  it('reapplies state and rerenders through applyTemplatesSnapshot', () => {
    document.body.innerHTML = '<div id="templates-a4-root"><div data-editable="true">Old</div></div>';
    const renderPreview = vi.fn();

    applyTemplatesSnapshot({
      snap: {
        edits: ['New'],
        l: { s: 1, x: 0, y: 0, h: false },
        r: { url: '/logo.png', s: 1, x: 0, y: 0 },
      },
      writePrimaryLogoState: vi.fn(),
      writeSecondaryLogoState: vi.fn(),
      renderPreview,
    });

    expect(document.querySelector('[data-editable="true"]')?.innerHTML).toBe('New');
    expect(renderPreview).toHaveBeenCalledTimes(1);
  });
});
