type TimerHandle = ReturnType<typeof setTimeout>;

export interface ProjectOptionLike {
  id: string | number;
  title?: string | null;
}

export interface ReservationOptionLike {
  id?: string | number | null;
  reservationId?: string | number | null;
  title?: string | null;
}

export interface TemplatesControllerTimers {
  inputTimer: TimerHandle | null;
  enforceTimer: TimerHandle | null;
}

export interface TemplatesRepopulateTimerRef {
  current: TimerHandle | null;
}

export function populateProjectSelectOptions(
  selectEl: HTMLSelectElement | null,
  projects: ProjectOptionLike[],
): void {
  if (!selectEl) return;

  const options = Array.isArray(projects) ? projects : [];
  selectEl.innerHTML =
    '<option value="">— اختر —</option>' +
    options.map((project) => `<option value="${String(project.id)}">${project.title || `#${project.id}`}</option>`).join('');
}

export function populateReservationSelectOptions(
  selectEl: HTMLSelectElement | null,
  reservations: ReservationOptionLike[],
): void {
  if (!selectEl) return;

  const previousValue = String(selectEl.value || '').trim();
  const options = ['<option value="" selected>— بدون ربط —</option>'];
  (Array.isArray(reservations) ? reservations : []).forEach((reservation) => {
    const id = reservation.id ?? reservation.reservationId;
    const label = String(reservation.title || '').trim() || `#${id}`;
    options.push(`<option value="${String(id)}">${label}</option>`);
  });
  selectEl.innerHTML = options.join('');

  if (!previousValue) return;
  const hasPreviousOption = Array.from(selectEl.options).some((option) => option.value === previousValue);
  if (hasPreviousOption) {
    selectEl.value = previousValue;
  }
}

export function updateExpenseItemRowTotal(target: EventTarget | null): void {
  const element = target instanceof HTMLElement ? target : null;
  if (!element) return;

  const td = element.closest('td');
  const tr = td?.closest('tr');
  const table = tr?.closest('table.exp-details');
  if (!tr || !table || tr.getAttribute('data-row') !== 'item') return;

  const number = (value: unknown, fallback = 0): number => {
    try {
      const text = String(value || '')
        .replace(/[\u0660-\u0669]/g, (digit) => '0123456789'[digit.charCodeAt(0) - 0x0660])
        .replace(/[\u06F0-\u06F9]/g, (digit) => '0123456789'[digit.charCodeAt(0) - 0x06f0])
        .replace(/[\u066B]/g, '.')
        .replace(/[\u066C]/g, '')
        .replace(/[^\d.\-]/g, '');
      const parsed = Number(text);
      return Number.isFinite(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const cells = Array.from(tr.children);
  const rate = number(cells[2]?.textContent, 0);
  const qty = number(cells[3]?.textContent, 1);
  const days = number(cells[4]?.textContent, 1);
  const total = Math.round(rate * qty * days);
  const out = cells[6];
  if (out) {
    out.textContent = String(total);
    try {
      out.setAttribute('data-num', '1');
    } catch {
      // ignore attribute failures
    }
  }
}

export interface CreateTemplatesHostInputHandlerOptions {
  timers: TemplatesControllerTimers;
  isComposing: () => boolean;
  markEditing: () => void;
  recomputeSubtotalsDebounced: (delay?: number) => void;
  enforceCallsheetSizing: () => void;
  onEditableInput?: (target: HTMLElement) => void;
}

export function createTemplatesHostInputHandler(options: CreateTemplatesHostInputHandlerOptions): EventListener {
  return (event) => {
    const element = event?.target;
    if (!(element instanceof HTMLElement)) return;
    if (!element.isContentEditable) return;
    if (options.isComposing()) return;

    try {
      options.markEditing();
    } catch {
      // ignore editing marker failures
    }

    try {
      options.onEditableInput?.(element);
    } catch {
      // ignore manual-edit marker failures
    }

    try {
      updateExpenseItemRowTotal(element);
    } catch {
      // ignore row total failures
    }

    try {
      clearTimeout(options.timers.inputTimer ?? undefined);
    } catch {
      // ignore timer cleanup failures
    }
    options.timers.inputTimer = setTimeout(() => {
      options.recomputeSubtotalsDebounced(420);
    }, 180);

    try {
      clearTimeout(options.timers.enforceTimer ?? undefined);
    } catch {
      // ignore timer cleanup failures
    }
    options.timers.enforceTimer = setTimeout(() => {
      try {
        options.enforceCallsheetSizing();
      } catch {
        // ignore callsheet sizing failures
      }
    }, 80);
  };
}

export interface CreateTemplatesCompositionHandlersOptions {
  setComposing: (value: boolean) => void;
  handleInput: EventListener;
  enforceCallsheetSizing: () => void;
}

export function createTemplatesCompositionHandlers(options: CreateTemplatesCompositionHandlersOptions): {
  onCompositionStart: EventListener;
  onCompositionEnd: EventListener;
} {
  const onCompositionStart: EventListener = () => {
    options.setComposing(true);
  };

  const onCompositionEnd: EventListener = (event) => {
    options.setComposing(false);
    try {
      options.handleInput(event);
    } catch {
      // ignore recompute failures
    }
    try {
      options.enforceCallsheetSizing();
    } catch {
      // ignore callsheet sizing failures
    }
  };

  return { onCompositionStart, onCompositionEnd };
}

export interface CreateTemplatesFocusHandlersOptions {
  recomputeSubtotalsDebounced: (delay?: number) => void;
  enforceCallsheetSizing: () => void;
  beforeEditableFocus?: (target: HTMLElement) => boolean;
}

export function createTemplatesFocusHandlers(options: CreateTemplatesFocusHandlersOptions): {
  onFocusIn: EventListener;
  onFocusOut: EventListener;
} {
  const onFocusIn: EventListener = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.isContentEditable && options.beforeEditableFocus && options.beforeEditableFocus(target) === false) {
      return;
    }
    const td = target.closest('td');
    if (!td) return;
    try {
      td.classList.add('editing');
    } catch {
      // ignore class failures
    }
  };

  const onFocusOut: EventListener = (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const td = target.closest('td');
    if (td) {
      try {
        td.classList.remove('editing');
      } catch {
        // ignore class failures
      }
    }
    try {
      const table = td?.closest('table.exp-details');
      if (table) options.recomputeSubtotalsDebounced(120);
    } catch {
      // ignore recompute failures
    }
    try {
      options.enforceCallsheetSizing();
    } catch {
      // ignore sizing failures
    }
  };

  return { onFocusIn, onFocusOut };
}

export function createTemplatesMouseDownHandler(): EventListener {
  return (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = 'button' in event ? event.button : 0;
    if (button !== 0) return;

    // Let the browser handle direct editing targets naturally. Avoid force-focusing
    // nested editable cells on generic mouse-down because that can hijack scrolling
    // near the end of long Call Sheet pages and jump the viewport unexpectedly.
    const editable = target.closest('[contenteditable="true"]');
    if (editable) return;
  };
}

export interface CreateTemplatesRepopulateControllerOptions {
  timerRef: TemplatesRepopulateTimerRef;
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
  logger?: Pick<Console, 'debug' | 'warn'>;
}

export function createTemplatesRepopulateController(options: CreateTemplatesRepopulateControllerOptions): {
  scheduleRepopulate: (delay?: number) => void;
} {
  let repopulating = false;
  let repopulateQueued = false;
  let lastRepopKey = '';

  const logger = options.logger ?? console;
  const debugEnabled = options.isDebugEnabled ?? (() => false);

  const doRepopulate = async (): Promise<void> => {
    if (repopulating || options.isEditing()) {
      repopulateQueued = true;
      return;
    }

    repopulating = true;
    try {
      if (debugEnabled()) logger.debug?.('[templatesTab] repopulate start');
    } catch {
      // ignore logging failures
    }

    const before = options.projectSelect?.value || '';
    try {
      await options.refreshProjectsIfNeeded();
      await options.refreshReservationsIfNeeded();
    } catch (error) {
      try {
        if (debugEnabled()) logger.warn?.('[templatesTab] fetch fallback failed', error);
      } catch {
        // ignore logging failures
      }
    }

    options.populateProjectSelect();
    if (options.projectSelect) {
      if (!options.projectSelect.value && options.projectSelect.options.length > 1) {
        options.projectSelect.selectedIndex = 1;
      } else if (before) {
        options.projectSelect.value = before;
      }
    }

    options.populateReservationSelect(options.projectSelect?.value || '');

    const repopKey = `${options.projectSelect?.value || ''}|${options.getReservationValue() || ''}|${options.getType()}`;
    if (repopKey !== lastRepopKey) {
      lastRepopKey = repopKey;
      options.renderPreview();
    }

    try {
      await options.populateSavedTemplates();
    } catch {
      // ignore saved-template refresh failures
    }

    try {
      if (debugEnabled()) logger.debug?.('[templatesTab] repopulate done');
    } catch {
      // ignore logging failures
    }

    repopulating = false;
    if (repopulateQueued) {
      repopulateQueued = false;
      scheduleRepopulate();
    }
  };

  function scheduleRepopulate(delay = 420): void {
    if (repopulating || options.isEditing()) {
      repopulateQueued = true;
      return;
    }

    if (options.timerRef.current) {
      clearTimeout(options.timerRef.current);
      options.timerRef.current = null;
    }

    options.timerRef.current = setTimeout(() => {
      options.timerRef.current = null;
      void doRepopulate();
    }, Math.max(0, delay));
  }

  return { scheduleRepopulate };
}
