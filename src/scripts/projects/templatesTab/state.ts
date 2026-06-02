export type TemplatesZoomMode = 'manual' | 'fit';
export type TemplatesLang = 'ar' | 'en';

type TimerHandle = ReturnType<typeof setTimeout>;
type UnbindFn = (() => void) | null;

export interface TemplatesTabListeners {
  hostInput: EventListener | null;
  hostMouseDown: EventListener | null;
  hostFocusIn: EventListener | null;
  hostFocusOut: EventListener | null;
  hostCompStart: EventListener | null;
  hostCompEnd: EventListener | null;
  projChanged: EventListener | null;
  resChanged: EventListener | null;
  resUpdated: EventListener | null;
  tabClick: EventListener | null;
}

export interface TemplatesTabState {
  previewZoom: number;
  userAdjustedZoom: boolean;
  zoomValueEl: HTMLElement | null;
  zoomMode: TemplatesZoomMode;
  zoomFitBtn: HTMLElement | null;
  zoomResizeBound: boolean;
  eventsBound: boolean;
  listeners: TemplatesTabListeners;
  hostEl: HTMLElement | null;
  repopulateTimer: TimerHandle | null;
  resizeObserver: ResizeObserver | null;
  tableUnbind: UnbindFn;
  subtotalTimer: TimerHandle | null;
  expensesUnbind: UnbindFn;
  isComposing: boolean;
  inputTimer: TimerHandle | null;
  enforceTimer: TimerHandle | null;
  templateLang: TemplatesLang;
  editing: boolean;
  editingTimer: TimerHandle | null;
  autosaveTimer: TimerHandle | null;
  remoteAutosaveTimer: TimerHandle | null;
  manualEditConfirmed: boolean;
  hasManualEdits: boolean;
  hydratedReservations: Record<string, unknown>;
}

function readInitialTemplateLang(): TemplatesLang {
  try {
    return localStorage.getItem('templates.lang') === 'ar' ? 'ar' : 'en';
  } catch {
    return 'en';
  }
}

export const templatesTabState: TemplatesTabState = {
  previewZoom: 1,
  userAdjustedZoom: false,
  zoomValueEl: null,
  zoomMode: 'manual',
  zoomFitBtn: null,
  zoomResizeBound: false,
  eventsBound: false,
  listeners: {
    hostInput: null,
    hostMouseDown: null,
    hostFocusIn: null,
    hostFocusOut: null,
    hostCompStart: null,
    hostCompEnd: null,
    projChanged: null,
    resChanged: null,
    resUpdated: null,
    tabClick: null,
  },
  hostEl: null,
  repopulateTimer: null,
  resizeObserver: null,
  tableUnbind: null,
  subtotalTimer: null,
  expensesUnbind: null,
  isComposing: false,
  inputTimer: null,
  enforceTimer: null,
  templateLang: readInitialTemplateLang(),
  editing: false,
  editingTimer: null,
  autosaveTimer: null,
  remoteAutosaveTimer: null,
  manualEditConfirmed: false,
  hasManualEdits: false,
  hydratedReservations: {},
};

export function resetTemplatesRuntimeState(): void {
  templatesTabState.eventsBound = false;
  templatesTabState.hostEl = null;
  templatesTabState.repopulateTimer = null;
  templatesTabState.tableUnbind = null;
  templatesTabState.subtotalTimer = null;
  templatesTabState.expensesUnbind = null;
  templatesTabState.isComposing = false;
  templatesTabState.inputTimer = null;
  templatesTabState.enforceTimer = null;
  templatesTabState.listeners.hostInput = null;
  templatesTabState.listeners.hostMouseDown = null;
  templatesTabState.listeners.hostFocusIn = null;
  templatesTabState.listeners.hostFocusOut = null;
  templatesTabState.listeners.hostCompStart = null;
  templatesTabState.listeners.hostCompEnd = null;
  templatesTabState.listeners.projChanged = null;
  templatesTabState.listeners.resChanged = null;
  templatesTabState.listeners.resUpdated = null;
  templatesTabState.listeners.tabClick = null;
  templatesTabState.manualEditConfirmed = false;
  templatesTabState.hasManualEdits = false;
  templatesTabState.hydratedReservations = {};
}

export function setTemplatesHydratedReservation(reservation: { id?: unknown; reservationId?: unknown } | null | undefined): void {
  if (!reservation || typeof reservation !== 'object') return;
  const id = reservation.id ?? reservation.reservationId ?? null;
  if (id == null || id === '') return;
  templatesTabState.hydratedReservations[String(id)] = reservation;
}
