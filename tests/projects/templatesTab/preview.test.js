import { beforeEach, describe, expect, it, vi } from 'vitest';

import { templatesTabState } from '../../../src/scripts/projects/templatesTab/state.ts';
import {
  ensureEditableWrappers,
  loadSnapshotById,
  renderTemplatesPreview,
} from '../../../src/scripts/projects/templatesTab/preview.ts';

function createRenderOptions(overrides = {}) {
  return {
    companyInfo: { logoUrl: '/brand/logo.png' },
    emptyMessage: 'Choose a project',
    getSelectedProject: () => ({ id: 7, title: 'Project Seven' }),
    getSelectedReservations: () => [],
    getTemplateType: () => 'expenses',
    readHeaderFooterOptions: vi.fn(() => ({ headerFooter: false, logoUrl: '/brand/logo.png' })),
    ensureLogoControls: vi.fn(),
    buildCallSheetPage: vi.fn(() => {
      const root = document.createElement('div');
      root.id = 'templates-a4-root';
      root.innerHTML = `
        <div data-a4-pages>
          <div class="a4-page">
            <div class="callsheet-v1">
              <div class="cs-header">Callsheet</div>
            </div>
          </div>
        </div>
      `;
      return root;
    }),
    buildExpensesPage: vi.fn(() => {
      const root = document.createElement('div');
      root.id = 'templates-a4-root';
      root.innerHTML = '<div data-a4-pages><div class="a4-page">Expenses</div></div>';
      return root;
    }),
    setupTemplatesHistory: vi.fn(),
    ensureCellToolbar: vi.fn(),
    onToolbarAfterChange: vi.fn(),
    shrinkScheduleHeaderLabels: vi.fn(),
    purgeCrewCallTables: vi.fn(),
    ensureCrewTableExists: vi.fn(),
    ensureCrewOnSecondPage: vi.fn(),
    unifyCrewCallTables: vi.fn(),
    ensureSingleCrewTableStrict: vi.fn(),
    populateCrewFromReservationIfEmpty: vi.fn(),
    ensureTechnicianPositionsLoaded: vi.fn(),
    getTechniciansState: vi.fn(() => [1]),
    refreshTechniciansFromApi: vi.fn(async () => []),
    renumberExpenseCodes: vi.fn(),
    recomputeExpensesSubtotals: vi.fn(),
    autoPaginateTemplates: vi.fn(),
    paginateExpDetailsTables: vi.fn(),
    pruneEmptyA4Pages: vi.fn(),
    paginateGenericTplTables: vi.fn(),
    ensurePdfTunerUI: vi.fn(),
    readTplZoomModePref: vi.fn(() => 'manual'),
    readTplZoomPref: vi.fn(() => 1.25),
    applyTemplatesFitZoom: vi.fn(),
    setTemplatesPreviewZoom: vi.fn(),
    zoomValueEl: { textContent: '' },
    host: document.getElementById('templates-preview-host'),
    ...overrides,
  };
}

describe('templatesTab/preview', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="templates-preview-host"></div>';
    localStorage.clear();
    templatesTabState.previewZoom = 1;
    templatesTabState.zoomMode = 'fit';
    templatesTabState.zoomValueEl = null;
  });

  it('renders the empty state when no project is selected', () => {
    const options = createRenderOptions({
      getSelectedProject: () => null,
      host: document.getElementById('templates-preview-host'),
    });

    renderTemplatesPreview(options);

    expect(document.getElementById('templates-preview-host')?.textContent).toContain('Choose a project');
    expect(options.buildCallSheetPage).not.toHaveBeenCalled();
    expect(options.buildExpensesPage).not.toHaveBeenCalled();
  });

  it('routes callsheet rendering through the callsheet builder and syncs zoom text', () => {
    const options = createRenderOptions({
      getTemplateType: () => 'callsheet',
      getSelectedReservations: () => [{ id: 22, title: 'Reservation' }],
      host: document.getElementById('templates-preview-host'),
    });

    renderTemplatesPreview(options);

    expect(options.buildCallSheetPage).toHaveBeenCalledWith(
      { id: 7, title: 'Project Seven' },
      [{ id: 22, title: 'Reservation' }],
      { headerFooter: false, logoUrl: '/brand/logo.png' },
    );
    expect(options.buildExpensesPage).not.toHaveBeenCalled();
    expect(document.querySelector('#templates-preview-host #templates-a4-root')?.textContent).toContain('Callsheet');
    expect(options.setTemplatesPreviewZoom).toHaveBeenCalledWith(1.25, { silent: true });
    expect(options.zoomValueEl.textContent).toBe('125%');
  });

  it('normalizes editable expense cells onto the td itself', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root">
        <table class="exp-details">
          <tbody>
            <tr>
              <td data-editable="true"><div contenteditable="true"><strong>Lifted</strong></div></td>
              <td data-editable="true" contenteditable="true">Locked total</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    ensureEditableWrappers();

    const editable = document.querySelector('table.exp-details td:first-child');
    const total = document.querySelector('table.exp-details td:last-child');
    expect(editable?.innerHTML).toContain('<strong>Lifted</strong>');
    expect(editable?.getAttribute('contenteditable')).toBe('true');
    expect(editable?.getAttribute('data-editable')).toBe('true');
    expect(total?.hasAttribute('contenteditable')).toBe(false);
    expect(total?.hasAttribute('data-editable')).toBe(false);
  });

  it('loads a saved snapshot into the preview host and normalizes logo urls', async () => {
    document.body.innerHTML = '<div id="templates-preview-host"></div>';
    const apiRequestFn = vi.fn(async () => ({
      data: {
        data: JSON.stringify({
          html: `
            <div id="templates-a4-root">
              <img src="https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png">
              <div data-a4-pages><div class="a4-page">Loaded snapshot</div></div>
            </div>
          `,
        }),
      },
    }));
    const normalizeTemplateHtmlLegacyUrls = vi.fn((html, companyInfo) =>
      String(html).replace('https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png', companyInfo.logoUrl),
    );
    const ensureCellToolbar = vi.fn();
    const attachCallsheetLogoBehaviors = vi.fn();
    const fixCallsheetStructure = vi.fn();
    const enforceCallsheetSizing = vi.fn();

    await loadSnapshotById({
      id: 44,
      apiRequestFn,
      notifyApiError: vi.fn(),
      companyInfo: { logoUrl: '/brand/logo.png' },
      normalizeTemplateHtmlLegacyUrls,
      fixCallsheetStructure,
      unifyCrewCallTables: vi.fn(),
      ensureSingleCrewTableStrict: vi.fn(),
      ensureCrewOnSecondPage: vi.fn(),
      enforceCallsheetSizing,
      shrinkScheduleHeaderLabels: vi.fn(),
      pruneEmptyA4Pages: vi.fn(),
      attachCallsheetLogoBehaviors,
      ensureCellToolbar,
      onToolbarAfterChange: vi.fn(),
      host: document.getElementById('templates-preview-host'),
    });

    const host = document.getElementById('templates-preview-host');
    const img = host?.querySelector('img');
    expect(apiRequestFn).toHaveBeenCalledWith('/project-templates/?id=44');
    expect(host?.querySelector('#templates-a4-root')?.textContent).toContain('Loaded snapshot');
    expect(img?.getAttribute('src')).toBe('/brand/logo.png');
    expect(fixCallsheetStructure).toHaveBeenCalled();
    expect(enforceCallsheetSizing).toHaveBeenCalled();
    expect(attachCallsheetLogoBehaviors).toHaveBeenCalledTimes(1);
    expect(ensureCellToolbar).toHaveBeenCalledTimes(1);
  });
});
