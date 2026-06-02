interface SyncTemplatesContextOptions {
  projectSelect: HTMLSelectElement | null;
  reservationSelect?: HTMLSelectElement | null;
  typeSelect?: HTMLSelectElement | null;
  refreshButton?: HTMLElement | null;
  restorePreferredType: (select?: HTMLSelectElement | null) => void;
  populateProjectSelect: () => void;
  populateReservationSelect: (projectId: string) => void;
  renderPreview: () => void;
  populateSavedTemplates: () => Promise<void> | void;
  writePreferredType: (value: string) => void;
  onTypeChangeAfterRender?: () => void;
}

interface SetupTemplatesRibbonOptions {
  root?: HTMLElement | null;
  defaultPanel?: string;
}

interface BindTemplatesToolbarControlsOptions {
  printButton?: HTMLElement | null;
  printPreviewButton?: HTMLElement | null;
  newBlankButton?: HTMLElement | null;
  loadLastDraftButton?: HTMLElement | null;
  fetchCrewButton?: HTMLElement | null;
  fetchCrewForceButton?: HTMLElement | null;
  actionsToggle?: HTMLElement | null;
  actionsMenu?: HTMLElement | null;
  actionsDropdown?: HTMLElement | null;
  languageButton?: HTMLElement | null;
  getLang: () => string;
  setLang: (nextLang: string) => string;
  renderPreview: () => void;
  printTemplate: () => Promise<void> | void;
  showPrintPreview: () => void;
  createBlankTemplate: () => void;
  loadLastDraft: () => Promise<void> | void;
  fetchCrew: (force: boolean) => Promise<void> | void;
  setupActionsMenu: (options: {
    actionsToggle: HTMLElement | null;
    actionsMenu: HTMLElement | null;
    actionsDropdown?: HTMLElement | null;
    onPrintPreview: () => void;
    onNewBlankTemplate: () => void;
    onLoadLastDraft: () => Promise<void> | void;
    onFetchCrew: (force: boolean) => Promise<void> | void;
  }) => void;
  setupLanguageToggle: (options: {
    button: HTMLElement | null;
    getLang: () => string;
    setLang: (nextLang: string) => string;
    renderPreview: () => void;
  }) => void;
  showToast?: (message: string, type?: string, durationMs?: number) => void;
  alertFn?: (message: string) => void;
  errorLogger?: (label: string, error: unknown) => void;
  closeActionsMenu?: () => void;
}

interface BindTemplatesSavedTemplateControlsOptions {
  renameButton?: HTMLElement | null;
  deleteButton?: HTMLElement | null;
  exportButton?: HTMLElement | null;
  exportExcelButton?: HTMLElement | null;
  importButton?: HTMLElement | null;
  importFileInput?: HTMLInputElement | null;
  renameAction: () => Promise<void> | void;
  deleteAction: () => Promise<void> | void;
  exportAction: () => Promise<void> | void;
  exportExcelAction: () => Promise<void> | void;
  importAction: (file: File | null | undefined) => Promise<void> | void;
  errorLogger?: (label: string, error: unknown) => void;
}

interface TemplatesInitListeners {
  hostInput?: EventListener | null;
  hostMouseDown?: EventListener | null;
  hostFocusIn?: EventListener | null;
  hostFocusOut?: EventListener | null;
  hostCompStart?: EventListener | null;
  hostCompEnd?: EventListener | null;
  projChanged?: EventListener | null;
  resChanged?: EventListener | null;
  resUpdated?: EventListener | null;
  tabClick?: EventListener | null;
}

interface TemplatesInteractiveRuntimeState {
  eventsBound: boolean;
  hostEl: HTMLElement | null;
  listeners: TemplatesInitListeners;
  expensesUnbind: (() => void) | null;
  tableUnbind: (() => void) | null;
  inputTimer: ReturnType<typeof setTimeout> | null;
  enforceTimer: ReturnType<typeof setTimeout> | null;
  repopulateTimer: ReturnType<typeof setTimeout> | null;
  isComposing: boolean;
  editing: boolean;
}

interface BindTemplatesInteractiveRuntimeOptions {
  runtimeState: TemplatesInteractiveRuntimeState;
  projectSelect: HTMLSelectElement | null;
  templatesTabButton?: Element | null;
  documentTarget?: Document;
  bindHostInteractions: (options: {
    host: HTMLElement | null;
    listeners: TemplatesInitListeners;
    setExpensesUnbind: (value: (() => void) | null) => void;
    setTableUnbind: (value: (() => void) | null) => void;
    bindExpensesRowActionsFn: (host: HTMLElement | null, options?: unknown) => (() => void) | null | undefined;
    bindTableInteractionsFn: (host: HTMLElement | null, options?: unknown) => (() => void) | null | undefined;
    ensurePdfTunerUI: () => void;
    createHostInputHandler: () => EventListener;
    createCompositionHandlers: () => { onCompositionStart: EventListener; onCompositionEnd: EventListener };
    createFocusHandlers: () => { onFocusIn: EventListener; onFocusOut: EventListener };
    createMouseDownHandler: () => EventListener;
    expensesOptions?: unknown;
    tableOptions?: unknown;
  }) => void;
  bindExpensesRowActionsFn: (host: HTMLElement | null, options?: unknown) => (() => void) | null | undefined;
  bindTableInteractionsFn: (host: HTMLElement | null, options?: unknown) => (() => void) | null | undefined;
  ensurePdfTunerUI: () => void;
  createHostInputHandler: (options: {
    timers: {
      inputTimer: ReturnType<typeof setTimeout> | null;
      enforceTimer: ReturnType<typeof setTimeout> | null;
    };
    isComposing: () => boolean;
    markEditing: () => void;
    recomputeSubtotalsDebounced: (delay?: number) => void;
    enforceCallsheetSizing: () => void;
    onEditableInput?: (target: HTMLElement) => void;
  }) => EventListener;
  createCompositionHandlers: (options: {
    setComposing: (value: boolean) => void;
    handleInput: EventListener;
    enforceCallsheetSizing: () => void;
  }) => { onCompositionStart: EventListener; onCompositionEnd: EventListener };
  createFocusHandlers: (options: {
    recomputeSubtotalsDebounced: (delay?: number) => void;
    enforceCallsheetSizing: () => void;
    beforeEditableFocus?: (target: HTMLElement) => boolean;
  }) => { onFocusIn: EventListener; onFocusOut: EventListener };
  createMouseDownHandler: () => EventListener;
  markEditing: () => void;
  recomputeSubtotalsDebounced: (delay?: number) => void;
  recomputeExpensesSubtotals: () => void;
  renumberExpenseCodes: () => void;
  handlePreviewMutation: () => void;
  enforceCallsheetSizing: () => void;
  createRepopulateController: (options: {
    timerRef: {
      get current(): ReturnType<typeof setTimeout> | null;
      set current(value: ReturnType<typeof setTimeout> | null);
    };
    projectSelect: HTMLSelectElement | null;
    getReservationValue: () => string;
    getType: () => string;
    isEditing: () => boolean;
    refreshProjectsIfNeeded: () => Promise<void>;
    refreshReservationsIfNeeded: () => Promise<void>;
    populateProjectSelect: () => void;
    populateReservationSelect: (projectId: string) => void;
    renderPreview: () => void;
    populateSavedTemplates: () => Promise<void>;
    isDebugEnabled?: () => boolean;
  }) => { scheduleRepopulate: (delay?: number) => void };
  bindRepopulationEvents: (options: {
    scheduleRepopulate: (delay?: number) => void;
    listeners: TemplatesInitListeners;
    templatesTabButton?: Element | null;
    documentTarget?: Document;
  }) => void;
  getReservationValue: () => string;
  getType: () => string;
  refreshProjectsIfNeeded: () => Promise<void>;
  refreshReservationsIfNeeded: () => Promise<void>;
  populateProjectSelect: () => void;
  populateReservationSelect: (projectId: string) => void;
  renderPreview: () => void;
  populateSavedTemplates: () => Promise<void>;
  isDebugEnabled?: () => boolean;
  onBeforeEditableFocus?: (target: HTMLElement) => boolean;
  onEditableInput?: (target: HTMLElement) => void;
}

function toHtmlButton(element: HTMLElement | null | undefined): HTMLElement | null {
  return element instanceof HTMLElement ? element : null;
}

function bindTemplatesToolbarAction(
  button: HTMLElement | null,
  datasetKey: string,
  handler: () => Promise<void> | void,
  options: {
    errorLabel: string;
    errorLogger?: (label: string, error: unknown) => void;
    closeActionsMenu?: () => void;
  },
): void {
  if (!(button instanceof HTMLElement) || button.dataset[datasetKey] === '1') return;

  button.addEventListener('click', async (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
    } catch {
      // ignore event failures
    }

    try {
      options.closeActionsMenu?.();
    } catch {
      // ignore menu close failures
    }

    try {
      await handler();
    } catch (error) {
      (options.errorLogger ?? console.error)(options.errorLabel, error);
    }
  });

  button.dataset[datasetKey] = '1';
}

export function setupTemplatesRibbon(options: SetupTemplatesRibbonOptions = {}): void {
  const root = options.root instanceof HTMLElement ? options.root : document.getElementById('templates-controls');
  if (!(root instanceof HTMLElement) || root.dataset.tplRibbonBound === '1') return;

  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[data-templates-ribbon-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-templates-ribbon-panel]'));
  if (!tabs.length || !panels.length) return;

  const activate = (panelKey: string) => {
    tabs.forEach((tab, index) => {
      const active = tab.dataset.templatesRibbonTab === panelKey;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
      if (active && document.activeElement === tabs[index]) {
        tab.focus();
      }
    });

    panels.forEach((panel) => {
      const active = panel.dataset.templatesRibbonPanel === panelKey;
      panel.classList.toggle('is-active', active);
      panel.hidden = !active;
    });
  };

  const firstKey = tabs[0]?.dataset.templatesRibbonTab || panels[0]?.dataset.templatesRibbonPanel || 'context';
  const initialKey = tabs.find((tab) => tab.classList.contains('is-active'))?.dataset.templatesRibbonTab || options.defaultPanel || firstKey;
  activate(initialKey);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.templatesRibbonTab || firstKey;
      activate(key);
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? tabs.length - 1
            : (index + delta + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];
      const key = nextTab?.dataset.templatesRibbonTab || firstKey;
      activate(key);
      nextTab?.focus();
    });
  });

  root.dataset.tplRibbonBound = '1';
}

export function syncTemplatesContext(options: SyncTemplatesContextOptions): void {
  const projectSelect = options.projectSelect;
  if (!(projectSelect instanceof HTMLSelectElement)) return;

  options.restorePreferredType(options.typeSelect);
  options.populateProjectSelect();
  options.populateReservationSelect(projectSelect.value || '');
  options.renderPreview();
  void Promise.resolve(options.populateSavedTemplates()).catch(() => {});

  if (projectSelect.dataset.tplContextBound !== '1') {
    projectSelect.addEventListener('change', () => {
      options.populateReservationSelect(projectSelect.value || '');
      options.renderPreview();
      void Promise.resolve(options.populateSavedTemplates()).catch(() => {});
    });
    projectSelect.dataset.tplContextBound = '1';
  }

  if (options.reservationSelect instanceof HTMLSelectElement && options.reservationSelect.dataset.tplContextBound !== '1') {
    options.reservationSelect.addEventListener('change', () => {
      options.renderPreview();
    });
    options.reservationSelect.dataset.tplContextBound = '1';
  }

  if (options.typeSelect instanceof HTMLSelectElement && options.typeSelect.dataset.tplContextBound !== '1') {
    options.typeSelect.addEventListener('change', () => {
      try {
        options.writePreferredType(options.typeSelect?.value || '');
      } catch {
        // ignore storage failures
      }
      options.renderPreview();
      try {
        options.onTypeChangeAfterRender?.();
      } catch {
        // ignore post-render hook failures
      }
    });
    options.typeSelect.dataset.tplContextBound = '1';
  }

  const refreshButton = toHtmlButton(options.refreshButton);
  if (refreshButton && refreshButton.dataset.tplContextBound !== '1') {
    refreshButton.addEventListener('click', () => {
      options.renderPreview();
    });
    refreshButton.dataset.tplContextBound = '1';
  }
}

export function bindTemplatesToolbarControls(options: BindTemplatesToolbarControlsOptions): void {
  const printButton = toHtmlButton(options.printButton);
  const printPreviewButton = toHtmlButton(options.printPreviewButton);
  const newBlankButton = toHtmlButton(options.newBlankButton);
  const loadLastDraftButton = toHtmlButton(options.loadLastDraftButton);
  const fetchCrewButton = toHtmlButton(options.fetchCrewButton);
  const fetchCrewForceButton = toHtmlButton(options.fetchCrewForceButton);
  if (printButton && printButton.dataset.tplPrintBound !== '1') {
    printButton.addEventListener('click', async (event) => {
      try {
        event.preventDefault();
        event.stopPropagation();
      } catch {
        // ignore event failures
      }

      const originalText = printButton.textContent;
      try {
        options.closeActionsMenu?.();
      } catch {
        // ignore menu close failures
      }

      try {
        printButton.disabled = true;
        printButton.textContent = '… جاري الطباعة';
        await options.printTemplate();
        options.showToast?.('تم إنشاء ملف PDF', 'success', 3500);
      } catch (error) {
        (options.errorLogger ?? console.error)('[templates/print] error', error);
        try {
          options.showToast?.('تعذر إنشاء PDF، حاول مجددًا', 'error', 6000);
        } catch {
          options.alertFn?.('تعذر إنشاء PDF، حاول مجددًا');
        }
      } finally {
        try {
          printButton.textContent = originalText;
          printButton.disabled = false;
        } catch {
          // ignore reset failures
        }
      }
    });
    printButton.dataset.tplPrintBound = '1';
  }

  bindTemplatesToolbarAction(printPreviewButton, 'tplPreviewBound', () => options.showPrintPreview(), {
    errorLabel: '[templates/print-preview] error',
    errorLogger: options.errorLogger,
    closeActionsMenu: options.closeActionsMenu,
  });

  bindTemplatesToolbarAction(newBlankButton, 'tplNewBound', () => options.createBlankTemplate(), {
    errorLabel: '[templates/new-blank] error',
    errorLogger: options.errorLogger,
    closeActionsMenu: options.closeActionsMenu,
  });

  bindTemplatesToolbarAction(loadLastDraftButton, 'tplLoadLastBound', () => options.loadLastDraft(), {
    errorLabel: '[templates/load-last-draft] error',
    errorLogger: options.errorLogger,
    closeActionsMenu: options.closeActionsMenu,
  });

  bindTemplatesToolbarAction(fetchCrewButton, 'tplFetchCrewBound', () => options.fetchCrew(false), {
    errorLabel: '[templates/fetch-crew] error',
    errorLogger: options.errorLogger,
    closeActionsMenu: options.closeActionsMenu,
  });

  bindTemplatesToolbarAction(fetchCrewForceButton, 'tplFetchCrewForceBound', () => options.fetchCrew(true), {
    errorLabel: '[templates/fetch-crew-force] error',
    errorLogger: options.errorLogger,
    closeActionsMenu: options.closeActionsMenu,
  });

  options.setupActionsMenu({
    actionsToggle: options.actionsToggle ?? null,
    actionsMenu: options.actionsMenu ?? null,
    actionsDropdown: options.actionsDropdown ?? null,
    onPrintPreview: () => options.showPrintPreview(),
    onNewBlankTemplate: () => options.createBlankTemplate(),
    onLoadLastDraft: () => options.loadLastDraft(),
    onFetchCrew: (force) => options.fetchCrew(force),
  });

  options.setupLanguageToggle({
    button: options.languageButton ?? null,
    getLang: options.getLang,
    setLang: options.setLang,
    renderPreview: options.renderPreview,
  });
}

export function bindTemplatesSavedTemplateControls(options: BindTemplatesSavedTemplateControlsOptions): void {
  const renameButton = toHtmlButton(options.renameButton);
  if (renameButton && renameButton.dataset.tplManageBound !== '1') {
    renameButton.addEventListener('click', () => {
      void Promise.resolve(options.renameAction()).catch((error) => {
        (options.errorLogger ?? console.error)('[templates/rename] error', error);
      });
    });
    renameButton.dataset.tplManageBound = '1';
  }

  const deleteButton = toHtmlButton(options.deleteButton);
  if (deleteButton && deleteButton.dataset.tplManageBound !== '1') {
    deleteButton.addEventListener('click', () => {
      void Promise.resolve(options.deleteAction()).catch((error) => {
        (options.errorLogger ?? console.error)('[templates/delete] error', error);
      });
    });
    deleteButton.dataset.tplManageBound = '1';
  }

  const exportButton = toHtmlButton(options.exportButton);
  if (exportButton && exportButton.dataset.tplManageBound !== '1') {
    exportButton.addEventListener('click', () => {
      void Promise.resolve(options.exportAction()).catch((error) => {
        (options.errorLogger ?? console.error)('[templates/export] error', error);
      });
    });
    exportButton.dataset.tplManageBound = '1';
  }

  const exportExcelButton = toHtmlButton(options.exportExcelButton);
  if (exportExcelButton && exportExcelButton.dataset.tplManageBound !== '1') {
    exportExcelButton.addEventListener('click', (event) => {
      event.preventDefault?.();
      event.stopPropagation?.();
      void Promise.resolve(options.exportExcelAction()).catch((error) => {
        (options.errorLogger ?? console.error)('[templates/export-excel] error', error);
      });
    });
    exportExcelButton.dataset.tplManageBound = '1';
  }

  const importButton = toHtmlButton(options.importButton);
  if (importButton && options.importFileInput instanceof HTMLInputElement && importButton.dataset.tplManageBound !== '1') {
    importButton.addEventListener('click', () => {
      options.importFileInput?.click();
    });
    importButton.dataset.tplManageBound = '1';
  }

  if (options.importFileInput instanceof HTMLInputElement && options.importFileInput.dataset.tplManageBound !== '1') {
    options.importFileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement | null;
      const file = target?.files?.[0];
      Promise.resolve(options.importAction(file))
        .catch((error) => {
          (options.errorLogger ?? console.error)('[templates/import] error', error);
        })
        .finally(() => {
          if (target) target.value = '';
        });
    });
    options.importFileInput.dataset.tplManageBound = '1';
  }
}

export function bindTemplatesInteractiveRuntime(options: BindTemplatesInteractiveRuntimeOptions): void {
  if (options.runtimeState.eventsBound) return;

  options.runtimeState.eventsBound = true;
  options.runtimeState.hostEl = document.getElementById('templates-preview-host');

  options.bindHostInteractions({
    host: options.runtimeState.hostEl,
    listeners: options.runtimeState.listeners,
    setExpensesUnbind: (value) => {
      options.runtimeState.expensesUnbind = value;
    },
    setTableUnbind: (value) => {
      options.runtimeState.tableUnbind = value;
    },
    bindExpensesRowActionsFn: options.bindExpensesRowActionsFn,
    bindTableInteractionsFn: options.bindTableInteractionsFn,
    ensurePdfTunerUI: options.ensurePdfTunerUI,
    createHostInputHandler: () => options.createHostInputHandler({
      timers: {
        get inputTimer() {
          return options.runtimeState.inputTimer;
        },
        set inputTimer(value) {
          options.runtimeState.inputTimer = value;
        },
        get enforceTimer() {
          return options.runtimeState.enforceTimer;
        },
        set enforceTimer(value) {
          options.runtimeState.enforceTimer = value;
        },
      },
      isComposing: () => options.runtimeState.isComposing,
      markEditing: options.markEditing,
      recomputeSubtotalsDebounced: options.recomputeSubtotalsDebounced,
      enforceCallsheetSizing: options.enforceCallsheetSizing,
      onEditableInput: options.onEditableInput,
    }),
    createCompositionHandlers: () => options.createCompositionHandlers({
      setComposing: (value) => {
        options.runtimeState.isComposing = value;
      },
      handleInput: options.runtimeState.listeners.hostInput || (() => {}),
      enforceCallsheetSizing: options.enforceCallsheetSizing,
    }),
    createFocusHandlers: () => options.createFocusHandlers({
      recomputeSubtotalsDebounced: options.recomputeSubtotalsDebounced,
      enforceCallsheetSizing: options.enforceCallsheetSizing,
      beforeEditableFocus: options.onBeforeEditableFocus,
    }),
    createMouseDownHandler: options.createMouseDownHandler,
    expensesOptions: {
      onRenumber: options.renumberExpenseCodes,
      onTotalsChange: options.recomputeExpensesSubtotals,
      onAfterChange: options.handlePreviewMutation,
    },
    tableOptions: {
      onAfterChange: options.handlePreviewMutation,
      onTotalsChange: () => options.recomputeSubtotalsDebounced(),
    },
  });

  const { scheduleRepopulate } = options.createRepopulateController({
    timerRef: {
      get current() {
        return options.runtimeState.repopulateTimer;
      },
      set current(value) {
        options.runtimeState.repopulateTimer = value;
      },
    },
    projectSelect: options.projectSelect,
    getReservationValue: options.getReservationValue,
    getType: options.getType,
    isEditing: () => options.runtimeState.editing,
    refreshProjectsIfNeeded: options.refreshProjectsIfNeeded,
    refreshReservationsIfNeeded: options.refreshReservationsIfNeeded,
    populateProjectSelect: options.populateProjectSelect,
    populateReservationSelect: options.populateReservationSelect,
    renderPreview: options.renderPreview,
    populateSavedTemplates: options.populateSavedTemplates,
    isDebugEnabled: options.isDebugEnabled,
  });

  options.bindRepopulationEvents({
    scheduleRepopulate,
    listeners: options.runtimeState.listeners,
    templatesTabButton: options.templatesTabButton,
    documentTarget: options.documentTarget,
  });

  scheduleRepopulate(0);
}
