interface ActionsMenuOptions {
  actionsToggle: HTMLElement | null;
  actionsMenu: HTMLElement | null;
  actionsDropdown?: HTMLElement | null;
  onPrintPreview: () => void;
  onNewBlankTemplate: () => void;
  onLoadLastDraft: () => Promise<void> | void;
  onFetchCrew: (force: boolean) => Promise<void> | void;
}

interface TemplatesActionsDropdownElement extends HTMLElement {
  __templatesActionsCloseMenu?: EventListener;
  __templatesActionsToggleBound?: boolean;
}

interface TemplatesLanguageButtonElement extends HTMLElement {
  __templatesLanguageBound?: boolean;
}

interface LanguageToggleOptions {
  button: HTMLElement | null;
  getLang: () => string;
  setLang: (nextLang: string) => string;
  renderPreview: () => void;
  documentTarget?: Document;
}

interface TemplatesLifecycleListeners {
  projChanged?: EventListener | null;
  resChanged?: EventListener | null;
  resUpdated?: EventListener | null;
  tabClick?: EventListener | null;
}

interface BindTemplatesRepopulationEventsOptions {
  scheduleRepopulate: (delay?: number) => void;
  listeners: TemplatesLifecycleListeners;
  templatesTabButton?: Element | null;
  documentTarget?: Document;
}

interface BindTemplatesDestroyOnTabExitOptions {
  destroy: () => void;
  documentTarget?: Document;
}

interface BindTemplatesPrimaryActionsOptions {
  saveButton?: HTMLElement | null;
  saveCopyButton?: HTMLElement | null;
  savedSelect?: HTMLSelectElement | null;
  typeSelect?: HTMLSelectElement | null;
  reservationSelect?: HTMLSelectElement | null;
  fromReservationButton?: HTMLElement | null;
  onSave: (copy: boolean) => Promise<string | void> | string | void;
  populateSavedTemplates: () => Promise<void> | void;
  onLoadSnapshot: (id: string) => Promise<void> | void;
  onAfterSave?: (savedTitle?: string) => void;
  renderPreview: () => void;
  alertFn?: (message: string) => void;
  errorLogger?: (label: string, error: unknown) => void;
}

interface HostInteractionListeners {
  hostInput: EventListener | null;
  hostMouseDown: EventListener | null;
  hostFocusIn: EventListener | null;
  hostFocusOut: EventListener | null;
  hostCompStart: EventListener | null;
  hostCompEnd: EventListener | null;
}

interface BindTemplatesHostInteractionsOptions {
  host: HTMLElement | null;
  listeners: HostInteractionListeners;
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
}

interface DestroyTemplatesHostLifecycleOptions {
  host?: HTMLElement | null;
  listeners: {
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
  };
  tableUnbind?: (() => void) | null;
  expensesUnbind?: (() => void) | null;
  templatesTabButton?: Element | null;
  repopulateTimer?: ReturnType<typeof setTimeout> | number | null;
  clearRepopulateTimer?: (timer: ReturnType<typeof setTimeout> | number) => void;
  resizeObserver?: { disconnect: () => void } | null;
  toolbar?: (HTMLElement & { __detach?: () => void }) | null;
  documentTarget?: Document;
  resetState?: () => void;
}

function createTemplatesMenuButton(
  id: string,
  text: string,
  className = 'ui-button ui-button--outline btn btn-outline templates-actions-menu__button',
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.id = id;
  button.textContent = text;
  return button;
}

function createTemplatesMenuDivider(): HTMLDivElement {
  const divider = document.createElement('div');
  divider.className = 'templates-actions-menu__divider';
  divider.setAttribute('aria-hidden', 'true');
  return divider;
}

function updateDropdownRaisedState(dropdown: HTMLElement | null | undefined, raised: boolean): void {
  if (!(dropdown instanceof HTMLElement)) return;

  try {
    dropdown.classList.toggle('dropdown-open', raised);
    const card = dropdown.closest('.templates-toolbar-card, .reports-surface-card');
    if (card instanceof HTMLElement) {
      card.classList.toggle('--raise-on-top', raised);
      card.style.zIndex = raised ? '12' : '';
    }
  } catch {
    // ignore dropdown class failures
  }
}

function setMenuOpen(
  actionsMenu: HTMLElement,
  actionsDropdown: HTMLElement | null | undefined,
  open: boolean,
): void {
  actionsMenu.style.display = open ? 'block' : 'none';
  updateDropdownRaisedState(actionsDropdown, open);
}

function ensureActionButton(
  actionsMenu: HTMLElement,
  id: string,
  text: string,
  onClick: (event: MouseEvent) => void,
  options: { prepend?: boolean } = {},
): void {
  const existing = document.getElementById(id);
  if (existing instanceof HTMLButtonElement) return;

  const button = createTemplatesMenuButton(id, text);
  button.addEventListener('click', onClick);
  if (options.prepend) {
    actionsMenu.insertBefore(button, actionsMenu.firstChild);
  } else {
    actionsMenu.appendChild(button);
  }
}

export function setupTemplatesActionsMenu(options: ActionsMenuOptions): void {
  const actionsToggle = options.actionsToggle;
  const actionsMenu = options.actionsMenu;
  const actionsDropdown = options.actionsDropdown as TemplatesActionsDropdownElement | null | undefined;
  if (!(actionsToggle instanceof HTMLElement) || !(actionsMenu instanceof HTMLElement)) return;

  ensureActionButton(actionsMenu, 'templates-print-preview', '👁️ معاينة الطباعة', (event) => {
    event.preventDefault();
    event.stopPropagation();
    options.onPrintPreview();
  }, { prepend: true });

  ensureActionButton(actionsMenu, 'templates-new', '🆕 قالب جديد (فارغ)', (event) => {
    event.preventDefault();
    event.stopPropagation();
    options.onNewBlankTemplate();
  }, { prepend: true });

  ensureActionButton(actionsMenu, 'templates-load-last', '📥 تحميل آخر مسودة', (event) => {
    event.preventDefault();
    event.stopPropagation();
    void options.onLoadLastDraft();
  }, { prepend: true });

  if (!document.getElementById('templates-fetch-crew') && !document.getElementById('templates-fetch-crew-force')) {
    actionsMenu.appendChild(createTemplatesMenuDivider());

    ensureActionButton(actionsMenu, 'templates-fetch-crew', '👥 جلب الطاقم (إكمال الفراغات)', (event) => {
      event.preventDefault();
      event.stopPropagation();
      void options.onFetchCrew(false);
    });

    ensureActionButton(actionsMenu, 'templates-fetch-crew-force', '👥 جلب الطاقم (إعادة تعبئة)', (event) => {
      event.preventDefault();
      event.stopPropagation();
      void options.onFetchCrew(true);
    });
  }

  if (actionsDropdown?.__templatesActionsToggleBound) return;
  actionsDropdown && (actionsDropdown.__templatesActionsToggleBound = true);

  const closeMenu: EventListener = (event) => {
    const target = event.target;
    if (actionsDropdown?.contains(target as Node)) return;
    setMenuOpen(actionsMenu, actionsDropdown, false);
    try {
      document.removeEventListener('click', closeMenu, true);
    } catch {
      // ignore cleanup failures
    }
  };

  if (actionsDropdown) {
    actionsDropdown.__templatesActionsCloseMenu = closeMenu;
  }

  actionsToggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = actionsMenu.style.display === 'block';
    setMenuOpen(actionsMenu, actionsDropdown, !isOpen);
    try {
      document.removeEventListener('click', closeMenu, true);
    } catch {
      // ignore listener cleanup failures
    }
    if (!isOpen) {
      document.addEventListener('click', closeMenu, true);
    }
  });
}

function syncTemplatesLanguageButton(button: HTMLElement, getLang: () => string): void {
  const lang = getLang() === 'ar' ? 'ar' : 'en';
  button.textContent = lang === 'ar' ? '🌐 AR' : '🌐 EN';
  button.title = `Language: ${lang.toUpperCase()}`;
}

export function setupTemplatesLanguageToggle(options: LanguageToggleOptions): void {
  const button = options.button as TemplatesLanguageButtonElement | null;
  if (!(button instanceof HTMLElement)) return;

  syncTemplatesLanguageButton(button, options.getLang);
  if (button.__templatesLanguageBound) return;
  button.__templatesLanguageBound = true;

  const doc = options.documentTarget ?? document;
  const toggleLanguage = (): void => {
    const nextLang = options.getLang() === 'ar' ? 'en' : 'ar';
    options.setLang(nextLang);
    syncTemplatesLanguageButton(button, options.getLang);
    options.renderPreview();
  };

  button.addEventListener('click', () => {
    toggleLanguage();
  });

  doc.addEventListener('keydown', (event) => {
    const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
    if (!event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return;
    if (!(event.code === 'KeyL' || key === 'l')) return;
    event.preventDefault();
    toggleLanguage();
  }, true);
}

export function bindTemplatesRepopulationEvents(options: BindTemplatesRepopulationEventsOptions): void {
  const doc = options.documentTarget ?? document;
  const tabButton = options.templatesTabButton ?? doc.querySelector('[data-project-subtab-target="projects-templates-tab"]');

  const onProj: EventListener = () => options.scheduleRepopulate();
  const onResChanged: EventListener = () => options.scheduleRepopulate();
  const onResUpdated: EventListener = () => options.scheduleRepopulate();
  const onTabClick: EventListener = () => options.scheduleRepopulate(0);

  options.listeners.projChanged = onProj;
  options.listeners.resChanged = onResChanged;
  options.listeners.resUpdated = onResUpdated;
  options.listeners.tabClick = onTabClick;

  doc.addEventListener('projects:changed', onProj);
  doc.addEventListener('reservations:changed', onResChanged);
  doc.addEventListener('reservations:updated', onResUpdated);
  tabButton?.addEventListener('click', onTabClick);
}

export function bindTemplatesDestroyOnTabExit(options: BindTemplatesDestroyOnTabExitOptions): void {
  const doc = options.documentTarget ?? document;

  Array.from(doc.querySelectorAll<HTMLElement>('.sub-tab-button[data-project-subtab-target]')).forEach((button) => {
    const target = button.getAttribute('data-project-subtab-target') || '';
    if (target === 'projects-templates-tab' || button.dataset.tplDestroyBound === '1') return;
    button.addEventListener('click', () => {
      options.destroy();
    });
    button.dataset.tplDestroyBound = '1';
  });

  Array.from(doc.querySelectorAll<HTMLElement>('.tab-button[data-tab-target]')).forEach((button) => {
    const target = button.getAttribute('data-tab-target') || '';
    if (target === 'projects-section' || button.dataset.tplDestroyMainBound === '1') return;
    button.addEventListener('click', () => {
      options.destroy();
    });
    button.dataset.tplDestroyMainBound = '1';
  });
}

function extractTemplatesActionErrorMessage(error: unknown): string {
  const value = error as { message?: string; payload?: { error?: string; details?: string } } | null;
  return value?.message || value?.payload?.error || value?.payload?.details || 'تعذر الحفظ';
}

export function bindTemplatesPrimaryActions(options: BindTemplatesPrimaryActionsOptions): void {
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  const errorLogger = options.errorLogger ?? ((label: string, error: unknown) => console.error(label, error));

  const runSaveAction = (copy: boolean): void => {
    Promise.resolve(options.onSave(copy))
      .then(async (savedTitle) => {
        await Promise.resolve(options.populateSavedTemplates());
        options.onAfterSave?.(typeof savedTitle === 'string' ? savedTitle : '');
      })
      .catch((error) => {
        alertFn(extractTemplatesActionErrorMessage(error));
        errorLogger(copy ? '[templates/saveCopy] error' : '[templates/save] error', error);
      });
  };

  if (options.saveButton instanceof HTMLElement && options.saveButton.dataset.tplPrimarySaveBound !== '1') {
    options.saveButton.addEventListener('click', () => {
      runSaveAction(false);
    });
    options.saveButton.dataset.tplPrimarySaveBound = '1';
  }

  if (options.saveCopyButton instanceof HTMLElement && options.saveCopyButton.dataset.tplPrimarySaveCopyBound !== '1') {
    options.saveCopyButton.addEventListener('click', () => {
      runSaveAction(true);
    });
    options.saveCopyButton.dataset.tplPrimarySaveCopyBound = '1';
  }

  if (options.savedSelect instanceof HTMLSelectElement && options.savedSelect.dataset.tplPrimaryLoadBound !== '1') {
    options.savedSelect.addEventListener('change', () => {
      const id = options.savedSelect?.value || '';
      if (!id) return;
      void options.onLoadSnapshot(id);
    });
    options.savedSelect.dataset.tplPrimaryLoadBound = '1';
  }

  if (options.fromReservationButton instanceof HTMLElement && options.fromReservationButton.dataset.tplPrimaryFromResBound !== '1') {
    options.fromReservationButton.addEventListener('click', () => {
      if (options.typeSelect instanceof HTMLSelectElement) {
        options.typeSelect.value = 'callsheet';
      }
      if (options.reservationSelect instanceof HTMLSelectElement && options.reservationSelect.options.length > 1) {
        options.reservationSelect.selectedIndex = 1;
      }
      options.renderPreview();
    });
    options.fromReservationButton.dataset.tplPrimaryFromResBound = '1';
  }
}

export function bindTemplatesHostInteractions(options: BindTemplatesHostInteractionsOptions): void {
  const host = options.host;
  if (!(host instanceof HTMLElement)) return;

  try {
    options.setExpensesUnbind(options.bindExpensesRowActionsFn(host, options.expensesOptions) || null);
  } catch {
    options.setExpensesUnbind(null);
  }

  const hostInput = options.createHostInputHandler();
  options.listeners.hostInput = hostInput;
  host.addEventListener('input', hostInput);

  const { onCompositionStart, onCompositionEnd } = options.createCompositionHandlers();
  options.listeners.hostCompStart = onCompositionStart;
  options.listeners.hostCompEnd = onCompositionEnd;
  host.addEventListener('compositionstart', onCompositionStart, true);
  host.addEventListener('compositionend', onCompositionEnd, true);

  const { onFocusIn, onFocusOut } = options.createFocusHandlers();
  options.listeners.hostFocusIn = onFocusIn;
  options.listeners.hostFocusOut = onFocusOut;
  host.addEventListener('focusin', onFocusIn, true);
  host.addEventListener('focusout', onFocusOut, true);

  try {
    options.setTableUnbind(options.bindTableInteractionsFn(host, options.tableOptions) || null);
  } catch {
    options.setTableUnbind(null);
  }

  const mouseDown = options.createMouseDownHandler();
  options.listeners.hostMouseDown = mouseDown;
  host.addEventListener('mousedown', mouseDown, true);

  try {
    options.ensurePdfTunerUI();
  } catch {
    // ignore tuner setup failures
  }
}

export function destroyTemplatesHostLifecycle(options: DestroyTemplatesHostLifecycleOptions): void {
  const host = options.host;
  const doc = options.documentTarget ?? document;

  if (host instanceof HTMLElement) {
    try { if (options.listeners.hostInput) host.removeEventListener('input', options.listeners.hostInput); } catch {}
    try { if (options.listeners.hostMouseDown) host.removeEventListener('mousedown', options.listeners.hostMouseDown, true); } catch {}
    try { if (options.listeners.hostFocusIn) host.removeEventListener('focusin', options.listeners.hostFocusIn, true); } catch {}
    try { if (options.listeners.hostFocusOut) host.removeEventListener('focusout', options.listeners.hostFocusOut, true); } catch {}
    try { if (options.listeners.hostCompStart) host.removeEventListener('compositionstart', options.listeners.hostCompStart, true); } catch {}
    try { if (options.listeners.hostCompEnd) host.removeEventListener('compositionend', options.listeners.hostCompEnd, true); } catch {}
  }

  try { options.tableUnbind?.(); } catch {}
  try { options.expensesUnbind?.(); } catch {}
  try { options.toolbar?.__detach?.(); } catch {}

  try { if (options.listeners.projChanged) doc.removeEventListener('projects:changed', options.listeners.projChanged); } catch {}
  try { if (options.listeners.resChanged) doc.removeEventListener('reservations:changed', options.listeners.resChanged); } catch {}
  try { if (options.listeners.resUpdated) doc.removeEventListener('reservations:updated', options.listeners.resUpdated); } catch {}
  try { if (options.listeners.tabClick && options.templatesTabButton) options.templatesTabButton.removeEventListener('click', options.listeners.tabClick); } catch {}

  try {
    if (options.repopulateTimer != null) {
      (options.clearRepopulateTimer ?? clearTimeout)(options.repopulateTimer);
    }
  } catch {}

  try { options.resizeObserver?.disconnect(); } catch {}
  try { options.resetState?.(); } catch {}
}
