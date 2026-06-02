import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createTemplatesWorkspace } from '../../../src/scripts/projects/templatesTab/workspace.ts';

function createWorkspaceOptions(overrides = {}) {
  return {
    companyInfo: { logoUrl: '/brand/logo.png' },
    getContextKey: () => 'templates.ctx',
    getSelectedProject: () => ({ id: 7, title: 'Project Seven' }),
    getSelectedReservations: () => [{ id: 44, title: 'Reservation' }],
    getCurrentType: () => 'callsheet',
    getCurrentReservationId: () => 44,
    getSavedSelect: () => document.getElementById('templates-saved'),
    getHostRoot: () => document.querySelector('#templates-preview-host #templates-a4-root'),
    getHost: () => document.getElementById('templates-preview-host'),
    getSaveTitleInput: () => document.getElementById('templates-save-title'),
    apiRequestFn: vi.fn(async () => ({})),
    notifyApiError: vi.fn(),
    alertFn: vi.fn(),
    showToastFn: vi.fn(),
    setStatus: vi.fn(),
    syncSavedControlsState: vi.fn(),
    translate: vi.fn((key, fallback) => fallback || key),
    savedPlaceholderLabel: '— Saved versions —',
    savedEmptyLabel: '— No saved versions yet —',
    emptyBodyMessage: 'Pick the project, reservation, and template type first.',
    buildDefaultSnapshotTitle: vi.fn(({ projectTitle, type, copy }) => `${projectTitle} - ${type}${copy ? ' - Copy' : ''}`),
    normalizeTemplateHtmlLegacyUrls: vi.fn((html) => html),
    readHeaderFooterOptions: vi.fn(() => ({ headerFooter: false, logoUrl: '/brand/logo.png' })),
    ensureLogoControls: vi.fn(),
    buildCallSheetPage: vi.fn(() => document.createElement('div')),
    buildExpensesPage: vi.fn(() => document.createElement('div')),
    setupTemplatesHistory: vi.fn(),
    ensureCellToolbar: vi.fn(),
    shrinkScheduleHeaderLabels: vi.fn(),
    purgeCrewCallTables: vi.fn(),
    ensureCrewTableExists: vi.fn(),
    ensureCrewOnSecondPage: vi.fn(),
    unifyCrewCallTables: vi.fn(),
    ensureSingleCrewTableStrict: vi.fn(),
    fixCallsheetStructure: vi.fn(),
    enforceCallsheetSizing: vi.fn(),
    attachCallsheetLogoBehaviors: vi.fn(),
    populateCrewFromReservation: vi.fn(),
    populateCrewFromReservationIfEmpty: vi.fn(),
    ensureTechnicianPositionsLoaded: vi.fn(),
    getTechniciansState: vi.fn(() => []),
    refreshTechniciansFromApi: vi.fn(async () => []),
    renumberExpenseCodes: vi.fn(),
    recomputeExpensesSubtotals: vi.fn(),
    autoPaginateTemplates: vi.fn(),
    paginateExpDetailsTables: vi.fn(),
    pruneEmptyA4Pages: vi.fn(),
    paginateGenericTplTables: vi.fn(),
    ensurePdfTunerUI: vi.fn(),
    readTplZoomModePref: vi.fn(() => 'manual'),
    readTplZoomPref: vi.fn(() => 1),
    applyTemplatesFitZoom: vi.fn(),
    setTemplatesPreviewZoom: vi.fn(),
    zoomValueEl: { textContent: '' },
    snapshotShading: vi.fn(() => ({ shade: true })),
    applyShadingSnapshot: vi.fn(),
    readPrimaryLogoState: vi.fn(() => ({ x: 1 })),
    readSecondaryLogoState: vi.fn(() => ({ x: 2 })),
    writePrimaryLogoState: vi.fn(),
    writeSecondaryLogoState: vi.fn(),
    applyTemplatesPreviewZoom: vi.fn(),
    pushTemplatesHistory: vi.fn(),
    pushHistoryDebounced: vi.fn(),
    markTemplatesEditingActivity: vi.fn(),
    saveTemplatesAutosaveToStorage: vi.fn(),
    saveAutosaveDebounced: vi.fn(),
    restoreTemplatesAutosaveIfPresent: vi.fn(),
    getTemplatesSnapshot: vi.fn(() => ({ edits: ['A'] })),
    applyTemplatesSnapshotInPlace: vi.fn(),
    applyTemplatesSnapshot: vi.fn(),
    readRemoteAutosaveId: vi.fn(() => 91),
    writeRemoteAutosaveId: vi.fn(),
    sanitizeHtmlForExport: vi.fn((html) => `sanitized:${html}`),
    ensureRemoteAutosaveId: vi.fn(async () => 91),
    autosaveTemplateToServer: vi.fn(async () => {}),
    autosaveToServerDebounced: vi.fn(),
    renderTemplatesPreview: vi.fn(),
    fetchSavedTemplatesForProject: vi.fn(async () => [{ id: 1, title: 'Template A' }]),
    populateSavedTemplatesSelect: vi.fn(),
    saveTemplateSnapshotRequest: vi.fn(async () => {}),
    loadSnapshotById: vi.fn(async () => {}),
    ...overrides,
  };
}

describe('templatesTab/workspace', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    vi.useRealTimers();
  });

  it('runs shared preview-mutation side effects and schedules repagination', async () => {
    vi.useFakeTimers();
    const options = createWorkspaceOptions();
    const workspace = createTemplatesWorkspace(options);

    workspace.handlePreviewMutation();

    expect(options.pushHistoryDebounced).toHaveBeenCalledTimes(1);
    expect(options.saveAutosaveDebounced).toHaveBeenCalledTimes(1);
    expect(options.markTemplatesEditingActivity).toHaveBeenCalledTimes(1);

    await vi.runAllTimersAsync();

    expect(options.paginateGenericTplTables).toHaveBeenCalledWith({
      headerFooter: false,
      logoUrl: '/brand/logo.png',
      isLandscape: true,
    });
    expect(options.pruneEmptyA4Pages).toHaveBeenCalledTimes(1);
  });

  it('saves the current template snapshot using the active root and context', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root"><div>Snapshot Body</div></div>
      </div>
      <input id="templates-save-title" value="Custom Template">
    `;
    localStorage.setItem('templates.ctx', 'draft');

    const options = createWorkspaceOptions({
      saveTemplateSnapshotRequest: vi.fn(async (request) => {
        request.clearLocalAutosave(request.contextKey);
      }),
    });
    const workspace = createTemplatesWorkspace(options);

    await workspace.saveTemplateSnapshot({ copy: true });

    expect(options.sanitizeHtmlForExport).toHaveBeenCalledWith(
      '<div id="templates-a4-root"><div>Snapshot Body</div></div>',
      { logoUrl: '/brand/logo.png' },
    );
    expect(options.saveTemplateSnapshotRequest).toHaveBeenCalledWith({
      apiRequestFn: options.apiRequestFn,
      project: { id: 7, title: 'Project Seven' },
      type: 'callsheet',
      reservationId: 44,
      rootHtml: '<div id="templates-a4-root"><div>Snapshot Body</div></div>',
      customTitle: 'Custom Template',
      sanitizedHtml: 'sanitized:<div id="templates-a4-root"><div>Snapshot Body</div></div>',
      contextKey: 'templates.ctx',
      clearLocalAutosave: expect.any(Function),
    });
    expect(localStorage.getItem('templates.ctx')).toBeNull();
    expect(options.alertFn).toHaveBeenCalledWith('تم حفظ القالب');
  });

  it('uses the generated copy title when save-copy has no manual title', async () => {
    document.body.innerHTML = `
      <div id="templates-preview-host">
        <div id="templates-a4-root"><div>Snapshot Body</div></div>
      </div>
      <input id="templates-save-title" value="">
    `;

    const options = createWorkspaceOptions();
    const workspace = createTemplatesWorkspace(options);

    await workspace.saveTemplateSnapshot({ copy: true });

    expect(options.buildDefaultSnapshotTitle).toHaveBeenCalledWith({
      projectTitle: 'Project Seven',
      type: 'callsheet',
      reservationId: 44,
      copy: true,
    });
    expect(options.saveTemplateSnapshotRequest).toHaveBeenCalledWith(
      expect.objectContaining({
        customTitle: 'Project Seven - callsheet - Copy',
      }),
    );
  });

  it('populates the saved-template select from the active project and type context', async () => {
    document.body.innerHTML = `
      <select id="templates-saved">
        <option value="">— محفوظات —</option>
        <option value="9">Older draft</option>
      </select>
    `;
    const options = createWorkspaceOptions({
      fetchSavedTemplatesForProject: vi.fn(async () => [{ id: 2, title: 'Fresh draft' }]),
    });
    const workspace = createTemplatesWorkspace(options);

    await workspace.populateSavedTemplates();

    expect(options.fetchSavedTemplatesForProject).toHaveBeenCalledWith({
      apiRequestFn: expect.any(Function),
      projectId: 7,
      type: 'callsheet',
    });
    expect(options.populateSavedTemplatesSelect).toHaveBeenCalledWith(
      document.getElementById('templates-saved'),
      [{ id: 2, title: 'Fresh draft' }],
      [{ id: '9', title: 'Older draft' }],
      {
        placeholderLabel: '— Saved versions —',
        emptyLabel: '— No saved versions yet —',
      },
    );
    expect(options.syncSavedControlsState).toHaveBeenNthCalledWith(1, {
      hasProject: true,
      hasItems: false,
      isLoading: true,
    });
    expect(options.syncSavedControlsState).toHaveBeenNthCalledWith(2, {
      hasProject: true,
      hasItems: true,
      isLoading: false,
    });
  });

  it('resets the saved-template controls when no project is selected', async () => {
    document.body.innerHTML = '<select id="templates-saved"></select>';
    const options = createWorkspaceOptions({
      getSelectedProject: () => null,
    });
    const workspace = createTemplatesWorkspace(options);

    await workspace.populateSavedTemplates();

    expect(options.fetchSavedTemplatesForProject).not.toHaveBeenCalled();
    expect(options.syncSavedControlsState).toHaveBeenCalledWith({
      hasProject: false,
      hasItems: false,
      isLoading: false,
    });
    expect(options.setStatus).toHaveBeenCalledWith(
      'اختر مشروعاً أولاً لعرض المحفوظات وتجهيز القالب.',
      'neutral',
    );
  });
});
