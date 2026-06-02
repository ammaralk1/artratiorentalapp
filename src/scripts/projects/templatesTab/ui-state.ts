export type TemplatesStatusTone = 'neutral' | 'success' | 'warning' | 'error';
export type TemplatesSaveTitleMode = 'choose-project' | 'auto' | 'selected' | 'custom';
export type TemplatesSavedMode = 'choose-project' | 'loading' | 'empty' | 'ready' | 'selected';

interface TemplatesStatusElement extends HTMLElement {
  dataset: DOMStringMap & {
    tplLastMessage?: string;
  };
}

interface TemplatesBusyElement extends HTMLElement {
  dataset: DOMStringMap & {
    tplBusyLabel?: string;
    tplBusyWasDisabled?: string;
  };
}

export interface SyncTemplatesSavedControlsStateOptions {
  selectEl: HTMLSelectElement | null;
  hasProject: boolean;
  hasItems: boolean;
  isLoading?: boolean;
  chooseProjectLabel?: string;
  emptyLabel?: string;
  loadingLabel?: string;
  selectionButtons?: Array<HTMLElement | null | undefined>;
  projectButtons?: Array<HTMLElement | null | undefined>;
}

export interface ResolveTemplatesSaveTitlePresentationOptions {
  hasProject: boolean;
  selectedLabel?: string;
  currentValue?: string;
  previousAutoValue?: string;
  defaultTitle?: string;
}

export interface ResolveTemplatesSavedPresentationOptions {
  hasProject: boolean;
  hasItems: boolean;
  isLoading?: boolean;
  selectedLabel?: string;
}

export function resolveTemplatesSaveTitlePresentation(options: ResolveTemplatesSaveTitlePresentationOptions): {
  mode: TemplatesSaveTitleMode;
  suggestedTitle: string;
  userHasCustomValue: boolean;
} {
  const selectedLabel = String(options.selectedLabel || '').trim();
  const currentValue = String(options.currentValue || '').trim();
  const previousAutoValue = String(options.previousAutoValue || '').trim();
  const defaultTitle = String(options.defaultTitle || '').trim();
  const userHasCustomValue = Boolean(currentValue) && currentValue !== previousAutoValue;
  const suggestedTitle = selectedLabel || (options.hasProject ? defaultTitle : '');

  if (!options.hasProject && !selectedLabel) {
    return {
      mode: 'choose-project',
      suggestedTitle,
      userHasCustomValue: false,
    };
  }

  if (userHasCustomValue) {
    return {
      mode: 'custom',
      suggestedTitle,
      userHasCustomValue: true,
    };
  }

  if (selectedLabel) {
    return {
      mode: 'selected',
      suggestedTitle,
      userHasCustomValue: false,
    };
  }

  return {
    mode: 'auto',
    suggestedTitle,
    userHasCustomValue: false,
  };
}

export function resolveTemplatesSavedPresentation(options: ResolveTemplatesSavedPresentationOptions): {
  mode: TemplatesSavedMode;
  helperKey: string;
  helperFallback: string;
} {
  const hasProject = Boolean(options.hasProject);
  const hasItems = Boolean(options.hasItems);
  const isLoading = Boolean(options.isLoading);
  const selectedLabel = String(options.selectedLabel || '').trim();

  if (!hasProject) {
    return {
      mode: 'choose-project',
      helperKey: 'projects.templates.saved.meta.chooseProject',
      helperFallback: 'اختر مشروعًا أولًا حتى تظهر المحفوظات الخاصة بهذا القالب.',
    };
  }

  if (isLoading) {
    return {
      mode: 'loading',
      helperKey: 'projects.templates.saved.meta.loading',
      helperFallback: 'جارٍ تحديث قائمة المحفوظات المرتبطة بالمشروع والنوع الحاليين.',
    };
  }

  if (!hasItems) {
    return {
      mode: 'empty',
      helperKey: 'projects.templates.saved.meta.empty',
      helperFallback: 'لا توجد محفوظات بعد لهذا السياق. ابدأ بحفظ أول نسخة من نفس السطح.',
    };
  }

  if (selectedLabel) {
    return {
      mode: 'selected',
      helperKey: 'projects.templates.saved.meta.selected',
      helperFallback: 'المحفوظ المختار جاهز للتحميل أو للإدارة عبر إعادة التسمية أو التصدير أو الحذف.',
    };
  }

  return {
    mode: 'ready',
    helperKey: 'projects.templates.saved.meta.ready',
    helperFallback: 'المحفوظات جاهزة. اختر نسخة لعرضها أو لإدارتها من نفس السطح.',
  };
}

function setElementDisabled(element: HTMLElement | null | undefined, disabled: boolean): void {
  if (!(element instanceof HTMLElement)) return;

  if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
    element.disabled = disabled;
    return;
  }

  element.setAttribute('aria-disabled', disabled ? 'true' : 'false');
}

function writeSingleSelectOption(selectEl: HTMLSelectElement, label: string): void {
  const option = document.createElement('option');
  option.value = '';
  option.textContent = label;
  selectEl.innerHTML = '';
  selectEl.appendChild(option);
  selectEl.value = '';
}

export function setTemplatesWorkspaceStatus(
  statusEl: HTMLElement | null | undefined,
  message: string,
  tone: TemplatesStatusTone = 'neutral',
): void {
  const element = statusEl as TemplatesStatusElement | null | undefined;
  if (!(element instanceof HTMLElement)) return;

  const nextMessage = String(message || '').trim();
  if (!nextMessage) return;

  element.hidden = false;
  element.dataset.statusTone = tone;
  element.dataset.tplLastMessage = nextMessage;
  element.textContent = nextMessage;
}

export function setTemplatesButtonBusy(
  button: HTMLElement | null | undefined,
  busy: boolean,
  busyLabel = '',
): void {
  const element = button as TemplatesBusyElement | null | undefined;
  if (!(element instanceof HTMLElement)) return;

  if (busy) {
    if (!element.dataset.tplBusyLabel) {
      element.dataset.tplBusyLabel = element.textContent || '';
    }
    if (!element.dataset.tplBusyWasDisabled) {
      const wasDisabled =
        element instanceof HTMLButtonElement ||
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement
          ? element.disabled
          : element.getAttribute('aria-disabled') === 'true';
      element.dataset.tplBusyWasDisabled = wasDisabled ? '1' : '0';
    }

    element.setAttribute('aria-busy', 'true');
    setElementDisabled(element, true);
    if (busyLabel) {
      element.textContent = busyLabel;
    }
    return;
  }

  element.removeAttribute('aria-busy');
  if (element.dataset.tplBusyLabel) {
    element.textContent = element.dataset.tplBusyLabel;
  }

  const shouldRestoreDisabled = element.dataset.tplBusyWasDisabled === '1';
  setElementDisabled(element, shouldRestoreDisabled);

  delete element.dataset.tplBusyLabel;
  delete element.dataset.tplBusyWasDisabled;
}

export function syncTemplatesSavedControlsState(options: SyncTemplatesSavedControlsStateOptions): void {
  const selectEl = options.selectEl;
  if (!(selectEl instanceof HTMLSelectElement)) return;

  const isLoading = Boolean(options.isLoading);
  const hasProject = Boolean(options.hasProject);
  const hasItems = Boolean(options.hasItems);
  const hasSelection = hasItems && Boolean(selectEl.value);
  const wrapper = selectEl.closest('.enhanced-select');

  if (!hasProject) {
    writeSingleSelectOption(selectEl, options.chooseProjectLabel || '— اختر مشروعاً أولاً —');
  } else if (isLoading) {
    writeSingleSelectOption(selectEl, options.loadingLabel || '— جارٍ تحديث المحفوظات —');
  } else if (!hasItems) {
    writeSingleSelectOption(selectEl, options.emptyLabel || '— لا توجد محفوظات بعد —');
  }

  selectEl.disabled = !hasProject || isLoading || !hasItems;
  selectEl.setAttribute('aria-busy', isLoading ? 'true' : 'false');
  if (wrapper instanceof HTMLElement) {
    wrapper.dataset.templatesSavedState = !hasProject
      ? 'choose-project'
      : isLoading
        ? 'loading'
        : !hasItems
          ? 'empty'
          : 'ready';
  }

  (options.selectionButtons || []).forEach((button) => {
    setElementDisabled(button ?? null, !hasProject || isLoading || !hasSelection);
  });

  (options.projectButtons || []).forEach((button) => {
    setElementDisabled(button ?? null, !hasProject || isLoading);
  });
}
