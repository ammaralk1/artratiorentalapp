interface SavedTemplateLike {
  id?: string | number;
  title?: string | null;
  type?: string | null;
  project_id?: string | number | null;
  data?: unknown;
}

interface ProjectLike {
  id: string | number;
}

export function findDraftTemplate<T extends SavedTemplateLike>(items: T[]): T | null {
  const list = Array.isArray(items) ? items : [];
  return (
    list.find((item) => {
      const title = String(item?.title || '').toLowerCase();
      return title.includes('autosave') || title.includes('draft') || title.includes('مسودة');
    }) ||
    list[0] ||
    null
  );
}

export function buildTemplateExportDocument(item: SavedTemplateLike): { meta: Record<string, unknown>; data: unknown } {
  const data = typeof item?.data === 'string' ? JSON.parse(item.data) : item?.data;
  return {
    meta: {
      id: item?.id,
      title: item?.title,
      type: item?.type,
      project_id: item?.project_id,
    },
    data,
  };
}

export function buildTemplateExportFilename(item: SavedTemplateLike, fallbackId: string | number = 'template'): string {
  const safeTitle = String(item?.title || `template-${fallbackId}`)
    .replace(/[^\w\-\s]/g, '')
    .trim();
  return `${safeTitle || `template-${fallbackId}`}.json`;
}

export function createTemplateExportBlob(item: SavedTemplateLike): Blob {
  return new Blob([JSON.stringify(buildTemplateExportDocument(item), null, 2)], { type: 'application/json' });
}

export interface ResolveImportedTemplateRequestOptions {
  json: { meta?: { title?: string | null; type?: string | null }; data?: { html?: string } } | null | undefined;
  project: ProjectLike;
  type: string;
  reservationId: number | null;
  fallbackHtml: string;
}

export function resolveImportedTemplateRequest(options: ResolveImportedTemplateRequestOptions): {
  project_id: number;
  reservation_id: number | null;
  type: string;
  title: string;
  data: { html: string };
} {
  const html = options.json?.data?.html ? options.json.data.html : options.fallbackHtml;
  return {
    project_id: Number(options.project.id),
    reservation_id: options.reservationId,
    type: options.type || String(options.json?.meta?.type || 'expenses'),
    title: String(options.json?.meta?.title || `Imported - ${options.type || options.json?.meta?.type || 'expenses'}`),
    data: { html },
  };
}
