interface SavedTemplateLike {
  id?: string | number;
  title?: string | null;
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
): void {
  const previousValue = selectEl.value || '';
  const list = Array.isArray(items) && items.length ? items : fallbackItems;
  selectEl.innerHTML = '<option value="">— محفوظات —</option>' + list.map((item) => `<option value="${String(item.id)}">${item.title || `#${item.id}`}</option>`).join('');
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
