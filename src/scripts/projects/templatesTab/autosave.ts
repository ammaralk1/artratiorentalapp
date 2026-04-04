import { templatesTabState } from './state';
import { normalizeTemplateHtmlLegacyUrls, type TemplatesCompanyInfo } from './context';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function getBrowserStorage(): StorageLike | null {
  try {
    return typeof localStorage !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
}

export function buildRemoteAutosaveStorageKey(contextKey: string): string {
  return `remoteAutosaveId:${contextKey}`;
}

export function readRemoteAutosaveId(contextKey: string, storage: StorageLike | null = getBrowserStorage()): number | null {
  try {
    const value = storage?.getItem(buildRemoteAutosaveStorageKey(contextKey));
    return value ? Number(value) : null;
  } catch {
    return null;
  }
}

export function writeRemoteAutosaveId(contextKey: string, id: number | null, storage: StorageLike | null = getBrowserStorage()): void {
  try {
    if (id) {
      storage?.setItem(buildRemoteAutosaveStorageKey(contextKey), String(id));
    }
  } catch {
    // ignore storage failures
  }
}

export function sanitizeHtmlForExport(html: string, companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>): string {
  try {
    const tmp = document.createElement('div');
    tmp.innerHTML = normalizeTemplateHtmlLegacyUrls(String(html || ''), companyInfo);
    tmp.querySelectorAll('script').forEach((script) => script.parentElement?.removeChild(script));
    Array.from(tmp.querySelectorAll('*')).forEach((el) => {
      try {
        Array.from(el.attributes || []).forEach((attr) => {
          if (/^on/i.test(attr.name)) {
            el.removeAttribute(attr.name);
          }
        });
      } catch {
        // ignore attribute cleanup failures
      }
    });
    return tmp.innerHTML;
  } catch {
    return html;
  }
}

export interface EnsureRemoteAutosaveIdOptions {
  contextKey: string;
  fetchSavedTemplates: () => Promise<Array<{ id?: number | string; title?: string | null }>>;
  projectId: number;
  type: string;
  reservationId: number | null;
  hostHtml: string;
  companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
}

export async function ensureRemoteAutosaveId(options: EnsureRemoteAutosaveIdOptions): Promise<number | null> {
  let id = readRemoteAutosaveId(options.contextKey);
  if (id) return id;

  const items = await options.fetchSavedTemplates();
  const draft = (items || []).find((item) => {
    const title = String(item?.title || '').toLowerCase();
    return title.includes('autosave') || title.includes('draft') || title.includes('مسودة');
  });

  if (draft?.id) {
    id = Number(draft.id);
    writeRemoteAutosaveId(options.contextKey, id);
    return id;
  }

  const payload = { html: sanitizeHtmlForExport(options.hostHtml, options.companyInfo) };

  try {
    await options.apiRequestFn('/project-templates/', {
      method: 'POST',
      body: {
        project_id: options.projectId,
        reservation_id: options.reservationId,
        type: options.type,
        title: `Autosave - ${options.type}`,
        data: payload,
      },
    });

    const createdItems = await options.fetchSavedTemplates();
    const created = (createdItems || []).find((item) => String(item?.title || '').toLowerCase().includes('autosave'));
    if (created?.id) {
      id = Number(created.id);
      writeRemoteAutosaveId(options.contextKey, id);
      return id;
    }
  } catch {
    return null;
  }

  return null;
}

export interface AutosaveTemplateToServerOptions {
  contextKey: string;
  hostHtml: string;
  companyInfo: Pick<TemplatesCompanyInfo, 'logoUrl'>;
  ensureId: () => Promise<number | null>;
  apiRequestFn: (url: string, options?: Record<string, unknown>) => Promise<unknown>;
  onError?: (error: unknown) => void;
}

export async function autosaveTemplateToServer(options: AutosaveTemplateToServerOptions): Promise<void> {
  const id = await options.ensureId();
  if (!id) return;

  const payload = { html: sanitizeHtmlForExport(options.hostHtml, options.companyInfo) };

  try {
    await options.apiRequestFn(`/project-templates/?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: { data: payload },
    });
  } catch (error) {
    options.onError?.(error);
  }
}

export function autosaveToServerDebounced(run: () => Promise<void> | void, delay = 800): void {
  clearTimeout(templatesTabState.remoteAutosaveTimer ?? undefined);
  templatesTabState.remoteAutosaveTimer = setTimeout(() => {
    void run();
  }, delay);
}
