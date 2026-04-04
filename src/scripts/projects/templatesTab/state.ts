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
};
