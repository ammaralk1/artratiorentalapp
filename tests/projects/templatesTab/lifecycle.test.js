import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  bindTemplatesHostInteractions,
  bindTemplatesDestroyOnTabExit,
  bindTemplatesPrimaryActions,
  bindTemplatesRepopulationEvents,
  destroyTemplatesHostLifecycle,
  setupTemplatesActionsMenu,
  setupTemplatesLanguageToggle,
} from '../../../src/scripts/projects/templatesTab/lifecycle.ts';

describe('templatesTab/lifecycle', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('sets up the templates actions menu idempotently and wires action callbacks', async () => {
    document.body.innerHTML = `
      <div id="templates-actions-dd" class="templates-actions-dropdown">
        <button id="templates-actions-toggle" type="button">actions</button>
        <div id="templates-actions-menu"></div>
      </div>
      <div class="outside"></div>
    `;

    const onPrintPreview = vi.fn();
    const onNewBlankTemplate = vi.fn();
    const onLoadLastDraft = vi.fn(async () => {});
    const onFetchCrew = vi.fn();

    setupTemplatesActionsMenu({
      actionsToggle: document.getElementById('templates-actions-toggle'),
      actionsMenu: document.getElementById('templates-actions-menu'),
      actionsDropdown: document.getElementById('templates-actions-dd'),
      onPrintPreview,
      onNewBlankTemplate,
      onLoadLastDraft,
      onFetchCrew,
    });
    setupTemplatesActionsMenu({
      actionsToggle: document.getElementById('templates-actions-toggle'),
      actionsMenu: document.getElementById('templates-actions-menu'),
      actionsDropdown: document.getElementById('templates-actions-dd'),
      onPrintPreview,
      onNewBlankTemplate,
      onLoadLastDraft,
      onFetchCrew,
    });

    expect(document.querySelectorAll('#templates-print-preview')).toHaveLength(1);
    expect(document.querySelectorAll('#templates-new')).toHaveLength(1);
    expect(document.querySelectorAll('#templates-load-last')).toHaveLength(1);
    expect(document.querySelectorAll('#templates-fetch-crew')).toHaveLength(1);
    expect(document.querySelectorAll('#templates-fetch-crew-force')).toHaveLength(1);

    const toggle = document.getElementById('templates-actions-toggle');
    const menu = document.getElementById('templates-actions-menu');
    const dropdown = document.getElementById('templates-actions-dd');
    if (!(toggle instanceof HTMLElement) || !(menu instanceof HTMLElement) || !(dropdown instanceof HTMLElement)) {
      throw new Error('missing menu elements');
    }

    toggle.click();
    expect(menu.style.display).toBe('block');
    expect(dropdown.classList.contains('dropdown-open')).toBe(true);

    document.getElementById('templates-print-preview')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-new')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-load-last')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-fetch-crew')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-fetch-crew-force')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onPrintPreview).toHaveBeenCalledTimes(1);
    expect(onNewBlankTemplate).toHaveBeenCalledTimes(1);
    expect(onLoadLastDraft).toHaveBeenCalledTimes(1);
    expect(onFetchCrew).toHaveBeenNthCalledWith(1, false);
    expect(onFetchCrew).toHaveBeenNthCalledWith(2, true);

    document.querySelector('.outside')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(menu.style.display).toBe('none');
    expect(dropdown.classList.contains('dropdown-open')).toBe(false);
  });

  it('sets up the templates language toggle and keyboard shortcut idempotently', () => {
    document.body.innerHTML = '<button id="templates-lang-toggle" type="button"></button>';

    let currentLang = 'ar';
    const setLang = vi.fn((nextLang) => {
      currentLang = nextLang;
      return currentLang;
    });
    const renderPreview = vi.fn();

    setupTemplatesLanguageToggle({
      button: document.getElementById('templates-lang-toggle'),
      getLang: () => currentLang,
      setLang,
      renderPreview,
    });
    setupTemplatesLanguageToggle({
      button: document.getElementById('templates-lang-toggle'),
      getLang: () => currentLang,
      setLang,
      renderPreview,
    });

    const button = document.getElementById('templates-lang-toggle');
    if (!(button instanceof HTMLButtonElement)) throw new Error('missing language button');

    expect(button.textContent).toBe('🌐 AR');
    expect(button.title).toBe('Language: AR');

    button.click();
    expect(setLang).toHaveBeenNthCalledWith(1, 'en');
    expect(renderPreview).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('🌐 EN');
    expect(button.title).toBe('Language: EN');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'l', code: 'KeyL', altKey: true, bubbles: true }));
    expect(setLang).toHaveBeenNthCalledWith(2, 'ar');
    expect(renderPreview).toHaveBeenCalledTimes(2);
    expect(button.textContent).toBe('🌐 AR');
    expect(button.title).toBe('Language: AR');
  });

  it('binds repopulation listeners for project, reservation, and tab events', () => {
    document.body.innerHTML = '<button data-project-subtab-target="projects-templates-tab" id="templates-tab"></button>';

    const scheduleRepopulate = vi.fn();
    const listeners = {};

    bindTemplatesRepopulationEvents({
      scheduleRepopulate,
      listeners,
      templatesTabButton: document.getElementById('templates-tab'),
      documentTarget: document,
    });

    document.dispatchEvent(new Event('projects:changed'));
    document.dispatchEvent(new Event('reservations:changed'));
    document.dispatchEvent(new Event('reservations:updated'));
    document.getElementById('templates-tab')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(scheduleRepopulate).toHaveBeenCalledTimes(4);
    expect(scheduleRepopulate).toHaveBeenNthCalledWith(4, 0);
    expect(typeof listeners.projChanged).toBe('function');
    expect(typeof listeners.resChanged).toBe('function');
    expect(typeof listeners.resUpdated).toBe('function');
    expect(typeof listeners.tabClick).toBe('function');
  });

  it('binds destroy handlers for leaving the templates tab only once', () => {
    document.body.innerHTML = `
      <button class="sub-tab-button" data-project-subtab-target="projects-templates-tab" id="stay"></button>
      <button class="sub-tab-button" data-project-subtab-target="projects-list-tab" id="leave-sub"></button>
      <button class="tab-button" data-tab-target="projects-section" id="stay-main"></button>
      <button class="tab-button" data-tab-target="customers-section" id="leave-main"></button>
    `;

    const destroy = vi.fn();

    bindTemplatesDestroyOnTabExit({ destroy, documentTarget: document });
    bindTemplatesDestroyOnTabExit({ destroy, documentTarget: document });

    document.getElementById('stay')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('stay-main')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(destroy).toHaveBeenCalledTimes(0);

    document.getElementById('leave-sub')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('leave-main')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(destroy).toHaveBeenCalledTimes(2);

    expect(document.getElementById('leave-sub')?.dataset.tplDestroyBound).toBe('1');
    expect(document.getElementById('leave-main')?.dataset.tplDestroyMainBound).toBe('1');
  });

  it('binds primary templates actions for save, copy, load, and from-res flows', async () => {
    document.body.innerHTML = `
      <button id="templates-save" type="button"></button>
      <button id="templates-save-copy" type="button"></button>
      <button id="templates-from-res" type="button"></button>
      <select id="templates-saved">
        <option value="">— محفوظات —</option>
        <option value="21">Snapshot</option>
      </select>
      <select id="templates-type">
        <option value="expenses" selected>expenses</option>
        <option value="callsheet">callsheet</option>
      </select>
      <select id="templates-reservation">
        <option value="">— بدون ربط —</option>
        <option value="4">Reservation A</option>
      </select>
    `;

    const onSave = vi.fn(async (copy) => (copy ? 'Saved Copy' : 'Saved Primary'));
    const populateSavedTemplates = vi.fn(async () => {
      const select = document.getElementById('templates-saved');
      if (!(select instanceof HTMLSelectElement)) return;
      select.innerHTML = `
        <option value="">— محفوظات —</option>
        <option value="21">Snapshot</option>
        <option value="22">Saved Primary</option>
        <option value="23">Saved Copy</option>
      `;
    });
    const onLoadSnapshot = vi.fn(async () => {});
    const onAfterSave = vi.fn();
    const renderPreview = vi.fn();
    const alertFn = vi.fn();
    const errorLogger = vi.fn();

    bindTemplatesPrimaryActions({
      saveButton: document.getElementById('templates-save'),
      saveCopyButton: document.getElementById('templates-save-copy'),
      savedSelect: document.getElementById('templates-saved'),
      typeSelect: document.getElementById('templates-type'),
      reservationSelect: document.getElementById('templates-reservation'),
      fromReservationButton: document.getElementById('templates-from-res'),
      onSave,
      populateSavedTemplates,
      onLoadSnapshot,
      onAfterSave,
      renderPreview,
      alertFn,
      errorLogger,
    });
    bindTemplatesPrimaryActions({
      saveButton: document.getElementById('templates-save'),
      saveCopyButton: document.getElementById('templates-save-copy'),
      savedSelect: document.getElementById('templates-saved'),
      typeSelect: document.getElementById('templates-type'),
      reservationSelect: document.getElementById('templates-reservation'),
      fromReservationButton: document.getElementById('templates-from-res'),
      onSave,
      populateSavedTemplates,
      onLoadSnapshot,
      onAfterSave,
      renderPreview,
      alertFn,
      errorLogger,
    });

    document.getElementById('templates-save')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-save-copy')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(onSave).toHaveBeenNthCalledWith(1, false);
    expect(onSave).toHaveBeenNthCalledWith(2, true);
    expect(populateSavedTemplates).toHaveBeenCalledTimes(2);
    expect(onAfterSave).toHaveBeenNthCalledWith(1, 'Saved Primary');
    expect(onAfterSave).toHaveBeenNthCalledWith(2, 'Saved Copy');

    const saved = document.getElementById('templates-saved');
    if (!(saved instanceof HTMLSelectElement)) throw new Error('missing saved select');
    saved.value = '21';
    saved.dispatchEvent(new Event('change', { bubbles: true }));
    await Promise.resolve();
    expect(onLoadSnapshot).toHaveBeenCalledWith('21');

    document.getElementById('templates-from-res')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const typeSelect = document.getElementById('templates-type');
    const reservationSelect = document.getElementById('templates-reservation');
    if (!(typeSelect instanceof HTMLSelectElement) || !(reservationSelect instanceof HTMLSelectElement)) {
      throw new Error('missing select elements');
    }
    expect(typeSelect.value).toBe('callsheet');
    expect(reservationSelect.selectedIndex).toBe(1);
    expect(renderPreview).toHaveBeenCalledTimes(1);
  });

  it('alerts when save actions fail and logs the error context', async () => {
    document.body.innerHTML = `
      <button id="templates-save" type="button"></button>
      <button id="templates-save-copy" type="button"></button>
    `;

    const failure = { payload: { details: 'broken save' } };
    const onSave = vi.fn(async (copy) => {
      throw { ...failure, copy };
    });
    const alertFn = vi.fn();
    const errorLogger = vi.fn();

    bindTemplatesPrimaryActions({
      saveButton: document.getElementById('templates-save'),
      saveCopyButton: document.getElementById('templates-save-copy'),
      savedSelect: null,
      typeSelect: null,
      reservationSelect: null,
      fromReservationButton: null,
      onSave,
      populateSavedTemplates: vi.fn(async () => {}),
      onLoadSnapshot: vi.fn(async () => {}),
      renderPreview: vi.fn(),
      alertFn,
      errorLogger,
    });

    document.getElementById('templates-save')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('templates-save-copy')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(alertFn).toHaveBeenNthCalledWith(1, 'broken save');
    expect(alertFn).toHaveBeenNthCalledWith(2, 'broken save');
    expect(errorLogger).toHaveBeenNthCalledWith(1, '[templates/save] error', expect.objectContaining({ copy: false }));
    expect(errorLogger).toHaveBeenNthCalledWith(2, '[templates/saveCopy] error', expect.objectContaining({ copy: true }));
  });

  it('binds templates host interactions and stores listener/unbind references', () => {
    document.body.innerHTML = '<div id="templates-preview-host"></div>';
    const host = document.getElementById('templates-preview-host');
    if (!(host instanceof HTMLElement)) throw new Error('missing host');

    const listeners = {
      hostInput: null,
      hostMouseDown: null,
      hostFocusIn: null,
      hostFocusOut: null,
      hostCompStart: null,
      hostCompEnd: null,
    };
    const inputListener = vi.fn();
    const mouseDownListener = vi.fn();
    const focusInListener = vi.fn();
    const focusOutListener = vi.fn();
    const compStartListener = vi.fn();
    const compEndListener = vi.fn();
    const expensesUnbind = vi.fn();
    const tableUnbind = vi.fn();
    const bindExpensesRowActionsFn = vi.fn(() => expensesUnbind);
    const bindTableInteractionsFn = vi.fn(() => tableUnbind);
    const ensurePdfTunerUI = vi.fn();
    const createHostInputHandler = vi.fn(() => inputListener);
    const createCompositionHandlers = vi.fn(() => ({
      onCompositionStart: compStartListener,
      onCompositionEnd: compEndListener,
    }));
    const createFocusHandlers = vi.fn(() => ({
      onFocusIn: focusInListener,
      onFocusOut: focusOutListener,
    }));
    const createMouseDownHandler = vi.fn(() => mouseDownListener);

    const eventLog = [];
    inputListener.mockImplementation(() => eventLog.push('input'));
    mouseDownListener.mockImplementation(() => eventLog.push('mouse'));
    focusInListener.mockImplementation(() => eventLog.push('focusin'));
    focusOutListener.mockImplementation(() => eventLog.push('focusout'));
    compStartListener.mockImplementation(() => eventLog.push('compstart'));
    compEndListener.mockImplementation(() => eventLog.push('compend'));

    const refs = { expensesUnbind: null, tableUnbind: null };
    const expensesOptions = { kind: 'expenses' };
    const tableOptions = { kind: 'table' };

    bindTemplatesHostInteractions({
      host,
      listeners,
      setExpensesUnbind: (value) => { refs.expensesUnbind = value; },
      setTableUnbind: (value) => { refs.tableUnbind = value; },
      bindExpensesRowActionsFn,
      bindTableInteractionsFn,
      ensurePdfTunerUI,
      createHostInputHandler,
      createCompositionHandlers,
      createFocusHandlers,
      createMouseDownHandler,
      expensesOptions,
      tableOptions,
    });

    host.dispatchEvent(new Event('input', { bubbles: true }));
    host.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    host.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true }));
    host.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    host.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
    host.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(bindExpensesRowActionsFn).toHaveBeenCalledWith(host, expensesOptions);
    expect(bindTableInteractionsFn).toHaveBeenCalledWith(host, tableOptions);
    expect(ensurePdfTunerUI).toHaveBeenCalledTimes(1);
    expect(createHostInputHandler).toHaveBeenCalledTimes(1);
    expect(createCompositionHandlers).toHaveBeenCalledTimes(1);
    expect(createFocusHandlers).toHaveBeenCalledTimes(1);
    expect(createMouseDownHandler).toHaveBeenCalledTimes(1);
    expect(refs.expensesUnbind).toBe(expensesUnbind);
    expect(refs.tableUnbind).toBe(tableUnbind);
    expect(listeners.hostInput).toBe(inputListener);
    expect(listeners.hostMouseDown).toBe(mouseDownListener);
    expect(listeners.hostFocusIn).toBe(focusInListener);
    expect(listeners.hostFocusOut).toBe(focusOutListener);
    expect(listeners.hostCompStart).toBe(compStartListener);
    expect(listeners.hostCompEnd).toBe(compEndListener);
    expect(eventLog).toEqual(['input', 'compstart', 'compend', 'focusin', 'focusout', 'mouse']);
  });

  it('tears down templates host lifecycle listeners, timers, and observers', () => {
    document.body.innerHTML = `
      <div id="templates-preview-host"></div>
      <button data-project-subtab-target="projects-templates-tab" id="templates-tab"></button>
      <div id="tpl-cell-toolbar"></div>
    `;
    const host = document.getElementById('templates-preview-host');
    const tabButton = document.getElementById('templates-tab');
    const toolbar = document.getElementById('tpl-cell-toolbar');
    if (!(host instanceof HTMLElement) || !(tabButton instanceof HTMLElement) || !(toolbar instanceof HTMLElement)) {
      throw new Error('missing lifecycle elements');
    }

    const listeners = {
      hostInput: vi.fn(),
      hostMouseDown: vi.fn(),
      hostFocusIn: vi.fn(),
      hostFocusOut: vi.fn(),
      hostCompStart: vi.fn(),
      hostCompEnd: vi.fn(),
      projChanged: vi.fn(),
      resChanged: vi.fn(),
      resUpdated: vi.fn(),
      tabClick: vi.fn(),
    };
    const tableUnbind = vi.fn();
    const expensesUnbind = vi.fn();
    const resizeObserver = { disconnect: vi.fn() };
    const clearTimer = vi.fn();
    const resetState = vi.fn();
    const detach = vi.fn();
    toolbar.__detach = detach;

    const hostRemoveSpy = vi.spyOn(host, 'removeEventListener');
    const docRemoveSpy = vi.spyOn(document, 'removeEventListener');
    const tabRemoveSpy = vi.spyOn(tabButton, 'removeEventListener');

    destroyTemplatesHostLifecycle({
      host,
      listeners,
      tableUnbind,
      expensesUnbind,
      templatesTabButton: tabButton,
      repopulateTimer: 123,
      clearRepopulateTimer: clearTimer,
      resizeObserver,
      toolbar,
      documentTarget: document,
      resetState,
    });

    expect(hostRemoveSpy).toHaveBeenCalledWith('input', listeners.hostInput);
    expect(hostRemoveSpy).toHaveBeenCalledWith('mousedown', listeners.hostMouseDown, true);
    expect(hostRemoveSpy).toHaveBeenCalledWith('focusin', listeners.hostFocusIn, true);
    expect(hostRemoveSpy).toHaveBeenCalledWith('focusout', listeners.hostFocusOut, true);
    expect(hostRemoveSpy).toHaveBeenCalledWith('compositionstart', listeners.hostCompStart, true);
    expect(hostRemoveSpy).toHaveBeenCalledWith('compositionend', listeners.hostCompEnd, true);
    expect(docRemoveSpy).toHaveBeenCalledWith('projects:changed', listeners.projChanged);
    expect(docRemoveSpy).toHaveBeenCalledWith('reservations:changed', listeners.resChanged);
    expect(docRemoveSpy).toHaveBeenCalledWith('reservations:updated', listeners.resUpdated);
    expect(tabRemoveSpy).toHaveBeenCalledWith('click', listeners.tabClick);
    expect(tableUnbind).toHaveBeenCalledTimes(1);
    expect(expensesUnbind).toHaveBeenCalledTimes(1);
    expect(clearTimer).toHaveBeenCalledWith(123);
    expect(resizeObserver.disconnect).toHaveBeenCalledTimes(1);
    expect(detach).toHaveBeenCalledTimes(1);
    expect(resetState).toHaveBeenCalledTimes(1);
  });
});
