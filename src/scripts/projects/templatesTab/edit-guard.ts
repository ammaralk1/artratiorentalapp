interface TemplatesEditGuardState {
  manualEditConfirmed: boolean;
  hasManualEdits: boolean;
}

interface ConfirmTemplatesManualEditStartOptions {
  target: HTMLElement | null;
  state: TemplatesEditGuardState;
  confirmFn?: (message: string) => boolean;
  message: string;
  setStatus?: (message: string, tone?: 'neutral' | 'success' | 'warning' | 'error') => void;
}

interface MarkTemplatesManualEditOptions {
  target: HTMLElement | null;
  state: TemplatesEditGuardState;
}

function isAutofilledEditableTarget(target: HTMLElement | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('[data-template-autofilled="1"]'));
}

export function confirmTemplatesManualEditStart(options: ConfirmTemplatesManualEditStartOptions): boolean {
  const target = options.target;
  if (!isAutofilledEditableTarget(target)) return true;
  if (options.state.manualEditConfirmed) return true;

  const confirmFn = options.confirmFn ?? ((message: string) => window.confirm(message));
  const accepted = confirmFn(options.message);
  if (!accepted) {
    try {
      target?.blur();
    } catch {
      // ignore blur failures
    }
    return false;
  }

  options.state.manualEditConfirmed = true;
  options.setStatus?.('تم تفعيل التعديل اليدوي على البيانات المعبأة تلقائياً داخل هذا القالب.', 'warning');
  return true;
}

export function markTemplatesManualEdit(options: MarkTemplatesManualEditOptions): void {
  const target = options.target;
  if (!(target instanceof HTMLElement) || !options.state.manualEditConfirmed) return;
  const root = target.closest('#templates-a4-root');
  if (!(root instanceof HTMLElement)) return;
  options.state.hasManualEdits = true;
  root.setAttribute('data-template-autofill-state', 'edited');
}

export function resetTemplatesManualEditState(root: ParentNode | null | undefined, state: TemplatesEditGuardState): void {
  state.manualEditConfirmed = false;
  state.hasManualEdits = false;
  const element = root instanceof HTMLElement ? root : root?.querySelector?.('#templates-a4-root');
  if (element instanceof HTMLElement) {
    element.setAttribute('data-template-autofill-state', 'fresh');
  }
}
