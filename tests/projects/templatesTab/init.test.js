import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  bindTemplatesInteractiveRuntime,
  bindTemplatesSavedTemplateControls,
  bindTemplatesToolbarControls,
  setupTemplatesRibbon,
  syncTemplatesContext,
} from '../../../src/scripts/projects/templatesTab/init.ts';

describe('templatesTab/init', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('syncs template context and binds selection controls idempotently', async () => {
    document.body.innerHTML = `
      <select id="templates-project"><option value="7" selected>Project</option></select>
      <select id="templates-reservation"><option value="9" selected>Reservation</option></select>
      <select id="templates-type"><option value="expenses" selected>expenses</option></select>
      <button id="templates-refresh" type="button"></button>
    `;

    const restorePreferredType = vi.fn();
    const populateProjectSelect = vi.fn();
    const populateReservationSelect = vi.fn();
    const renderPreview = vi.fn();
    const populateSavedTemplates = vi.fn(async () => {});
    const writePreferredType = vi.fn();
    const onTypeChangeAfterRender = vi.fn();

    const options = {
      projectSelect: document.getElementById('templates-project'),
      reservationSelect: document.getElementById('templates-reservation'),
      typeSelect: document.getElementById('templates-type'),
      refreshButton: document.getElementById('templates-refresh'),
      restorePreferredType,
      populateProjectSelect,
      populateReservationSelect,
      renderPreview,
      populateSavedTemplates,
      writePreferredType,
      onTypeChangeAfterRender,
    };

    syncTemplatesContext(options);
    syncTemplatesContext(options);
    await Promise.resolve();

    expect(restorePreferredType).toHaveBeenCalledTimes(2);
    expect(populateProjectSelect).toHaveBeenCalledTimes(2);
    expect(populateReservationSelect).toHaveBeenNthCalledWith(1, '7');
    expect(renderPreview).toHaveBeenCalledTimes(2);
    expect(populateSavedTemplates).toHaveBeenCalledTimes(2);

    document.getElementById('templates-project')?.dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('templates-reservation')?.dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('templates-refresh')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const typeSelect = document.getElementById('templates-type');
    if (!(typeSelect instanceof HTMLSelectElement)) throw new Error('missing type select');
    typeSelect.value = 'expenses';
    typeSelect.dispatchEvent(new Event('change', { bubbles: true }));

    expect(populateReservationSelect).toHaveBeenCalledTimes(3);
    expect(renderPreview).toHaveBeenCalledTimes(6);
    expect(writePreferredType).toHaveBeenCalledWith('expenses');
    expect(onTypeChangeAfterRender).toHaveBeenCalledTimes(1);
  });

  it('sets up the templates ribbon tabs and panel visibility idempotently', () => {
    document.body.innerHTML = `
      <div id="templates-controls">
        <button type="button" class="templates-ribbon-tab is-active" data-templates-ribbon-tab="context"></button>
        <button type="button" class="templates-ribbon-tab" data-templates-ribbon-tab="library"></button>
        <button type="button" class="templates-ribbon-tab" data-templates-ribbon-tab="actions"></button>
        <section data-templates-ribbon-panel="context"></section>
        <section data-templates-ribbon-panel="library" hidden></section>
        <section data-templates-ribbon-panel="actions" hidden></section>
      </div>
    `;

    const root = document.getElementById('templates-controls');
    if (!(root instanceof HTMLElement)) throw new Error('missing ribbon root');

    setupTemplatesRibbon({ root, defaultPanel: 'context' });
    setupTemplatesRibbon({ root, defaultPanel: 'context' });

    const tabs = Array.from(root.querySelectorAll('[data-templates-ribbon-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-templates-ribbon-panel]'));
    expect(root.dataset.tplRibbonBound).toBe('1');
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    expect(panels[0].hidden).toBe(false);
    expect(panels[1].hidden).toBe(true);

    tabs[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(panels[1].hidden).toBe(false);
    expect(panels[0].hidden).toBe(true);

    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(panels[2].hidden).toBe(false);
  });

  it('binds toolbar controls for print, actions menu, and language toggle', async () => {
    document.body.innerHTML = `
      <button id="templates-print" type="button">Print</button>
      <button id="templates-print-preview" type="button">Preview</button>
      <button id="templates-new" type="button">Blank</button>
      <button id="templates-load-last" type="button">Load Last</button>
      <button id="templates-fetch-crew" type="button">Fetch Crew</button>
      <button id="templates-fetch-crew-force" type="button">Fetch Crew Force</button>
      <button id="templates-lang-toggle" type="button"></button>
      <div id="templates-actions-toggle"></div>
      <div id="templates-actions-menu" style="display:block"></div>
      <div id="templates-actions-dd"></div>
    `;

    const printTemplate = vi.fn(async () => {});
    const showPrintPreview = vi.fn();
    const createBlankTemplate = vi.fn();
    const loadLastDraft = vi.fn(async () => {});
    const fetchCrew = vi.fn(async () => {});
    const setupActionsMenu = vi.fn();
    const setupLanguageToggle = vi.fn();
    const showToast = vi.fn();

    bindTemplatesToolbarControls({
      printButton: document.getElementById('templates-print'),
      printPreviewButton: document.getElementById('templates-print-preview'),
      newBlankButton: document.getElementById('templates-new'),
      loadLastDraftButton: document.getElementById('templates-load-last'),
      fetchCrewButton: document.getElementById('templates-fetch-crew'),
      fetchCrewForceButton: document.getElementById('templates-fetch-crew-force'),
      actionsToggle: document.getElementById('templates-actions-toggle'),
      actionsMenu: document.getElementById('templates-actions-menu'),
      actionsDropdown: document.getElementById('templates-actions-dd'),
      languageButton: document.getElementById('templates-lang-toggle'),
      getLang: () => 'ar',
      setLang: vi.fn((lang) => lang),
      renderPreview: vi.fn(),
      printTemplate,
      showPrintPreview,
      createBlankTemplate,
      loadLastDraft,
      fetchCrew,
      setupActionsMenu,
      setupLanguageToggle,
      showToast,
      alertFn: vi.fn(),
      errorLogger: vi.fn(),
      closeActionsMenu: () => {
        const menu = document.getElementById('templates-actions-menu');
        if (menu) menu.style.display = 'none';
      },
    });

    document.getElementById('templates-print')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-print-preview')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-new')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-load-last')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-fetch-crew')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-fetch-crew-force')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(printTemplate).toHaveBeenCalledTimes(1);
    expect(showPrintPreview).toHaveBeenCalledTimes(1);
    expect(createBlankTemplate).toHaveBeenCalledTimes(1);
    expect(loadLastDraft).toHaveBeenCalledTimes(1);
    expect(fetchCrew).toHaveBeenNthCalledWith(1, false);
    expect(fetchCrew).toHaveBeenNthCalledWith(2, true);
    expect(showToast).toHaveBeenCalledWith('تم إنشاء ملف PDF', 'success', 3500);
    expect(document.getElementById('templates-actions-menu')?.style.display).toBe('none');
    expect(setupActionsMenu).toHaveBeenCalledTimes(1);
    expect(setupLanguageToggle).toHaveBeenCalledTimes(1);
  });

  it('binds saved-template controls including import reset', async () => {
    document.body.innerHTML = `
      <button id="templates-rename" type="button"></button>
      <button id="templates-delete" type="button"></button>
      <button id="templates-export" type="button"></button>
      <button id="templates-export-excel" type="button"></button>
      <button id="templates-import" type="button"></button>
      <input id="templates-import-file" type="file">
    `;

    const renameAction = vi.fn(async () => {});
    const deleteAction = vi.fn(async () => {});
    const exportAction = vi.fn(async () => {});
    const exportExcelAction = vi.fn(async () => {});
    const importAction = vi.fn(async () => {});

    bindTemplatesSavedTemplateControls({
      renameButton: document.getElementById('templates-rename'),
      deleteButton: document.getElementById('templates-delete'),
      exportButton: document.getElementById('templates-export'),
      exportExcelButton: document.getElementById('templates-export-excel'),
      importButton: document.getElementById('templates-import'),
      importFileInput: document.getElementById('templates-import-file'),
      renameAction,
      deleteAction,
      exportAction,
      exportExcelAction,
      importAction,
      errorLogger: vi.fn(),
    });

    document.getElementById('templates-rename')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-delete')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-export')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-export-excel')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const clickSpy = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
    document.getElementById('templates-import')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(clickSpy).toHaveBeenCalledTimes(1);
    clickSpy.mockRestore();

    const importInput = document.getElementById('templates-import-file');
    if (!(importInput instanceof HTMLInputElement)) throw new Error('missing import input');
    Object.defineProperty(importInput, 'files', {
      configurable: true,
      value: [{ name: 'template.json' }],
    });
    importInput.dispatchEvent(new Event('change', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(renameAction).toHaveBeenCalledTimes(1);
    expect(deleteAction).toHaveBeenCalledTimes(1);
    expect(exportAction).toHaveBeenCalledTimes(1);
    expect(exportExcelAction).toHaveBeenCalledTimes(1);
    expect(importAction).toHaveBeenCalledWith({ name: 'template.json' });
    expect(importInput.value).toBe('');
  });

  it('binds interactive runtime once and schedules the initial repopulation', () => {
    document.body.innerHTML = `
      <div id="templates-preview-host"></div>
      <select id="templates-project"><option value="7" selected>Project</option></select>
      <button data-project-subtab-target="projects-templates-tab" id="templates-tab"></button>
    `;

    const runtimeState = {
      eventsBound: false,
      hostEl: null,
      listeners: {},
      expensesUnbind: null,
      tableUnbind: null,
      inputTimer: null,
      enforceTimer: null,
      repopulateTimer: null,
      isComposing: false,
      editing: false,
    };

    const bindHostInteractions = vi.fn();
    const scheduleRepopulate = vi.fn();
    const createRepopulateController = vi.fn(() => ({ scheduleRepopulate }));
    const bindRepopulationEvents = vi.fn();

    const options = {
      runtimeState,
      projectSelect: document.getElementById('templates-project'),
      templatesTabButton: document.getElementById('templates-tab'),
      documentTarget: document,
      bindHostInteractions,
      bindExpensesRowActionsFn: vi.fn(),
      bindTableInteractionsFn: vi.fn(),
      ensurePdfTunerUI: vi.fn(),
      createHostInputHandler: vi.fn(() => vi.fn()),
      createCompositionHandlers: vi.fn(() => ({ onCompositionStart: vi.fn(), onCompositionEnd: vi.fn() })),
      createFocusHandlers: vi.fn(() => ({ onFocusIn: vi.fn(), onFocusOut: vi.fn() })),
      createMouseDownHandler: vi.fn(() => vi.fn()),
      markEditing: vi.fn(),
      recomputeSubtotalsDebounced: vi.fn(),
      recomputeExpensesSubtotals: vi.fn(),
      renumberExpenseCodes: vi.fn(),
      handlePreviewMutation: vi.fn(),
      enforceCallsheetSizing: vi.fn(),
      createRepopulateController,
      bindRepopulationEvents,
      getReservationValue: () => '',
      getType: () => 'expenses',
      refreshProjectsIfNeeded: vi.fn(async () => {}),
      refreshReservationsIfNeeded: vi.fn(async () => {}),
      populateProjectSelect: vi.fn(),
      populateReservationSelect: vi.fn(),
      renderPreview: vi.fn(),
      populateSavedTemplates: vi.fn(async () => {}),
      isDebugEnabled: vi.fn(() => false),
    };

    bindTemplatesInteractiveRuntime(options);
    bindTemplatesInteractiveRuntime(options);

    expect(runtimeState.eventsBound).toBe(true);
    expect(runtimeState.hostEl).toBe(document.getElementById('templates-preview-host'));
    expect(bindHostInteractions).toHaveBeenCalledTimes(1);
    expect(createRepopulateController).toHaveBeenCalledTimes(1);
    expect(bindRepopulationEvents).toHaveBeenCalledTimes(1);
    expect(scheduleRepopulate).toHaveBeenCalledWith(0);
  });
});
