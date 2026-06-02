import {
  buildTemplateExportFilename,
  createTemplateExportBlob,
  resolveImportedTemplateRequest,
} from './io';

interface SavedTemplateLike {
  id?: string | number;
  title?: string | null;
  type?: string | null;
  data?: unknown;
}

export function normalizeSavedTemplatesResponse(response: unknown): SavedTemplateLike[] {
  if (Array.isArray(response)) return response;
  if (response && typeof response === 'object' && Array.isArray((response as { data?: unknown[] }).data)) {
    return (response as { data: SavedTemplateLike[] }).data;
  }
  if (response && typeof response === 'object' && Array.isArray((response as { items?: unknown[] }).items)) {
    return (response as { items: SavedTemplateLike[] }).items;
  }
  return [];
}

export function getTemplateTypeVariants(type: string): string[] {
  if (type === 'callsheet') {
    return ['callsheet', 'call-sheet', 'callsheet_v1', 'callsheetv1', 'callsheet-v1'];
  }
  return [type];
}

export interface FetchSavedTemplatesForProjectOptions {
  apiRequestFn: (url: string) => Promise<unknown>;
  projectId: string | number;
  type: string;
}

export async function fetchSavedTemplatesForProject(options: FetchSavedTemplatesForProjectOptions): Promise<SavedTemplateLike[]> {
  const seen = new Set<string>();
  const items: SavedTemplateLike[] = [];

  for (const variant of getTemplateTypeVariants(options.type)) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await options.apiRequestFn(`/project-templates/?project_id=${encodeURIComponent(options.projectId)}&type=${encodeURIComponent(variant)}`);
      normalizeSavedTemplatesResponse(response).forEach((item) => {
        const id = String(item?.id ?? '');
        if (!id || seen.has(id)) return;
        seen.add(id);
        items.push(item);
      });
    } catch {
      // ignore per-variant failures and continue
    }
  }

  if (!items.length) {
    try {
      const response = await options.apiRequestFn(`/project-templates/?project_id=${encodeURIComponent(options.projectId)}`);
      normalizeSavedTemplatesResponse(response).forEach((item) => {
        const id = String(item?.id ?? '');
        if (!id || seen.has(id)) return;
        seen.add(id);
        items.push(item);
      });
    } catch {
      // ignore fallback failure
    }
  }

  return items;
}

export function populateSavedTemplatesSelect(
  selectEl: HTMLSelectElement,
  items: SavedTemplateLike[],
  fallbackItems: SavedTemplateLike[] = [],
  options: { placeholderLabel?: string; emptyLabel?: string } = {},
): void {
  const previousValue = selectEl.value || '';
  const list = Array.isArray(items) && items.length ? items : fallbackItems;
  const placeholder = list.length
    ? options.placeholderLabel || '— محفوظات —'
    : options.emptyLabel || '— لا توجد محفوظات بعد —';
  selectEl.innerHTML = `<option value="">${placeholder}</option>` + list.map((item) => `<option value="${String(item.id)}">${item.title || `#${item.id}`}</option>`).join('');
  selectEl.disabled = list.length === 0;
  if (previousValue && Array.from(selectEl.options).some((option) => option.value === String(previousValue))) {
    selectEl.value = String(previousValue);
  }
}

export interface SaveTemplateSnapshotRequestOptions {
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  project: { id: string | number; title?: string | null };
  type: string;
  reservationId: number | null;
  rootHtml: string;
  customTitle: string;
  sanitizedHtml: string;
  contextKey: string;
  clearLocalAutosave: (contextKey: string) => void;
}

export async function saveTemplateSnapshotRequest(options: SaveTemplateSnapshotRequestOptions): Promise<void> {
  await options.apiRequestFn('/project-templates/', {
    method: 'POST',
    body: {
      project_id: Number(options.project.id),
      reservation_id: options.reservationId,
      type: options.type,
      title: options.customTitle || `${options.project.title || 'Template'} - ${options.type}`,
      data: { html: options.sanitizedHtml || options.rootHtml },
    },
  });

  options.clearLocalAutosave(options.contextKey);
}

export interface RenameSavedTemplateSelectionOptions {
  savedSelect: HTMLSelectElement | null;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  populateSavedTemplates: () => Promise<void> | void;
  promptFn?: (message: string, defaultValue?: string) => string | null;
  alertFn?: (message: string) => void;
  notifyApiError?: (error: unknown, fallback: string) => void;
}

export async function renameSavedTemplateSelection(options: RenameSavedTemplateSelectionOptions): Promise<boolean> {
  const select = options.savedSelect;
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  if (!(select instanceof HTMLSelectElement)) return false;

  const id = select.value || '';
  if (!id) {
    alertFn('اختر محفوظاً أولاً');
    return false;
  }

  const currentText = select.options[select.selectedIndex]?.textContent || '';
  const promptFn = options.promptFn ?? ((message: string, defaultValue?: string) => prompt(message, defaultValue));
  const title = promptFn('اسم جديد للمحفوظ:', currentText);
  if (!title || title.trim() === currentText) return false;

  try {
    await options.apiRequestFn(`/project-templates/?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: { title: String(title).trim() },
    });
  } catch (error) {
    options.notifyApiError?.(error, 'تعذر إعادة التسمية');
    return false;
  }

  await options.populateSavedTemplates();
  const replacement = Array.from(select.options).find((option) => option.value === String(id));
  if (replacement) {
    select.value = String(id);
  }
  return true;
}

export interface DeleteSavedTemplateSelectionOptions {
  savedSelect: HTMLSelectElement | null;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  populateSavedTemplates: () => Promise<void> | void;
  renderPreview: () => void;
  confirmFn?: (message: string) => boolean;
  alertFn?: (message: string) => void;
  notifyApiError?: (error: unknown, fallback: string) => void;
}

export async function deleteSavedTemplateSelection(options: DeleteSavedTemplateSelectionOptions): Promise<boolean> {
  const select = options.savedSelect;
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  const confirmFn = options.confirmFn ?? ((message: string) => confirm(message));
  if (!(select instanceof HTMLSelectElement)) return false;

  const id = select.value || '';
  if (!id) {
    alertFn('اختر محفوظاً أولاً');
    return false;
  }
  if (!confirmFn('هل تريد حذف هذا المحفوظ نهائياً؟')) return false;

  try {
    await options.apiRequestFn(`/project-templates/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  } catch (error) {
    options.notifyApiError?.(error, 'تعذر حذف القالب');
    return false;
  }

  await options.populateSavedTemplates();
  options.renderPreview();
  return true;
}

export interface ExportSavedTemplateSelectionOptions {
  savedSelect: HTMLSelectElement | null;
  apiRequestFn: (url: string) => Promise<unknown>;
  alertFn?: (message: string) => void;
  notifyApiError?: (error: unknown, fallback: string) => void;
  createObjectURL?: (blob: Blob) => string;
  revokeObjectURL?: (url: string) => void;
}

export async function exportSavedTemplateSelection(options: ExportSavedTemplateSelectionOptions): Promise<boolean> {
  const select = options.savedSelect;
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  if (!(select instanceof HTMLSelectElement)) return false;

  const id = select.value || '';
  if (!id) {
    alertFn('اختر محفوظاً أولاً');
    return false;
  }

  let response: unknown;
  try {
    response = await options.apiRequestFn(`/project-templates/?id=${encodeURIComponent(id)}`);
  } catch (error) {
    options.notifyApiError?.(error, 'تعذر تحميل القالب');
    return false;
  }

  const payload = response && typeof response === 'object' && 'data' in response ? (response as { data?: unknown }).data : response;
  const item = Array.isArray(payload) ? payload[0] : payload;
  if (!item || typeof item !== 'object') {
    alertFn('تعذر جلب المحفوظ');
    return false;
  }

  const blob = createTemplateExportBlob(item as SavedTemplateLike);
  const createObjectURL = options.createObjectURL ?? ((value: Blob) => URL.createObjectURL(value));
  const revokeObjectURL = options.revokeObjectURL ?? ((value: string) => URL.revokeObjectURL(value));
  const url = createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = buildTemplateExportFilename(item as SavedTemplateLike, id);
  document.body.appendChild(link);
  link.click();
  link.remove();
  revokeObjectURL(url);
  return true;
}

export interface ImportSavedTemplateFileOptions<ProjectLike extends { id: string | number }> {
  file: { text: () => Promise<string> } | null | undefined;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  getSelectedProject: () => ProjectLike | null;
  getCurrentType: () => string;
  getReservationId: () => number | null;
  getFallbackHtml: () => string;
  populateSavedTemplates: () => Promise<void> | void;
  notifyApiError?: (error: unknown, fallback: string) => void;
  alertFn?: (message: string) => void;
}

export async function importSavedTemplateFile<ProjectLike extends { id: string | number }>(
  options: ImportSavedTemplateFileOptions<ProjectLike>,
): Promise<string | null> {
  const alertFn = options.alertFn ?? ((message: string) => alert(message));
  if (!options.file) return null;

  try {
    const text = await options.file.text();
    const json = JSON.parse(text);
    const project = options.getSelectedProject();
    if (!project) {
      alertFn('اختر مشروعاً أولاً');
      return null;
    }

    const payload = resolveImportedTemplateRequest({
      json,
      project,
      type: options.getCurrentType() || (json?.meta?.type || 'expenses'),
      reservationId: options.getReservationId(),
      fallbackHtml: options.getFallbackHtml(),
    });

    try {
      await options.apiRequestFn('/project-templates/', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      options.notifyApiError?.(error, 'تعذر الاستيراد');
      return null;
    }

    await options.populateSavedTemplates();
    alertFn('تم الاستيراد بنجاح');
    return String(payload.title || '').trim() || null;
  } catch {
    alertFn('تعذر الاستيراد، تأكد من صحة ملف JSON');
    return null;
  }
}
