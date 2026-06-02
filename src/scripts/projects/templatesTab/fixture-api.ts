import { isLocalDashboardFixtureEnabled } from '../../fixtureRuntime.js';

interface FixtureTemplateRecord {
  id: number;
  project_id: number;
  reservation_id: number | null;
  type: string;
  title: string;
  data: { html?: string; [key: string]: unknown } | null;
  created_at: string;
  updated_at: string;
}

interface ApiOptionsLike {
  method?: string;
  body?: Record<string, unknown> | null;
}

const FIXTURE_STORAGE_KEY = 'artRatio.fixture.projectTemplates.v1';
const FIXTURE_COUNTER_KEY = 'artRatio.fixture.projectTemplates.nextId';

function readFixtureStore(): FixtureTemplateRecord[] {
  try {
    const raw = localStorage.getItem(FIXTURE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeFixtureStore(records: FixtureTemplateRecord[]): FixtureTemplateRecord[] {
  try {
    localStorage.setItem(FIXTURE_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore storage failures in fixture mode
  }
  return records;
}

function nextFixtureId(): number {
  try {
    const current = Number.parseInt(localStorage.getItem(FIXTURE_COUNTER_KEY) || '9200', 10);
    const next = Number.isFinite(current) ? current + 1 : 9201;
    localStorage.setItem(FIXTURE_COUNTER_KEY, String(next));
    return next;
  } catch {
    return Date.now();
  }
}

function normalizeRecord(input: Record<string, unknown>): FixtureTemplateRecord {
  const now = new Date().toISOString();
  return {
    id: Number(input.id) || nextFixtureId(),
    project_id: Number(input.project_id) || 0,
    reservation_id: input.reservation_id == null || input.reservation_id === '' ? null : Number(input.reservation_id),
    type: String(input.type || 'expenses'),
    title: String(input.title || 'Template'),
    data: (input.data && typeof input.data === 'object') ? (input.data as FixtureTemplateRecord['data']) : { html: '' },
    created_at: String(input.created_at || now),
    updated_at: String(input.updated_at || now),
  };
}

function sortRecords(records: FixtureTemplateRecord[]): FixtureTemplateRecord[] {
  return [...records].sort((a, b) => Number(b.id) - Number(a.id));
}

function parseFixtureUrl(path: string): URL | null {
  try {
    return new URL(path, 'http://local-fixture.test');
  } catch {
    return null;
  }
}

function isProjectTemplatesPath(path: string): boolean {
  const url = parseFixtureUrl(path);
  return Boolean(url && url.pathname.replace(/\/+$/, '/') === '/project-templates/');
}

function listTemplates(url: URL): { data: FixtureTemplateRecord[] | FixtureTemplateRecord | null } {
  const id = url.searchParams.get('id');
  const projectId = url.searchParams.get('project_id');
  const type = (url.searchParams.get('type') || '').trim();
  const records = readFixtureStore();

  if (id) {
    const match = records.find((record) => String(record.id) === String(id)) || null;
    return { data: match };
  }

  let filtered = records;
  if (projectId) {
    filtered = filtered.filter((record) => String(record.project_id) === String(projectId));
  }
  if (type) {
    filtered = filtered.filter((record) => String(record.type) === type);
  }

  return { data: sortRecords(filtered) };
}

function createTemplate(body: Record<string, unknown> | null | undefined): { data: FixtureTemplateRecord } {
  const payload = normalizeRecord({
    ...(body || {}),
    id: nextFixtureId(),
  });
  const records = readFixtureStore();
  records.push(payload);
  writeFixtureStore(sortRecords(records));
  return { data: payload };
}

function updateTemplate(url: URL, body: Record<string, unknown> | null | undefined): { data: FixtureTemplateRecord | null } {
  const id = url.searchParams.get('id');
  if (!id) return { data: null };

  const records = readFixtureStore();
  const index = records.findIndex((record) => String(record.id) === String(id));
  if (index === -1) return { data: null };

  const current = records[index];
  const next: FixtureTemplateRecord = {
    ...current,
    ...(body || {}),
    id: current.id,
    project_id: body?.project_id != null ? Number(body.project_id) : current.project_id,
    reservation_id:
      body?.reservation_id === ''
        ? null
        : body?.reservation_id != null
          ? Number(body.reservation_id)
          : current.reservation_id,
    type: body?.type != null ? String(body.type) : current.type,
    title: body?.title != null ? String(body.title) : current.title,
    data: body?.data && typeof body.data === 'object' ? (body.data as FixtureTemplateRecord['data']) : current.data,
    updated_at: new Date().toISOString(),
  };

  records[index] = next;
  writeFixtureStore(sortRecords(records));
  return { data: next };
}

function deleteTemplate(url: URL): { ok: true } {
  const id = url.searchParams.get('id');
  if (!id) return { ok: true };
  const records = readFixtureStore().filter((record) => String(record.id) !== String(id));
  writeFixtureStore(sortRecords(records));
  return { ok: true };
}

export function resetProjectTemplatesFixtureStore(): void {
  try {
    localStorage.removeItem(FIXTURE_STORAGE_KEY);
    localStorage.removeItem(FIXTURE_COUNTER_KEY);
  } catch {
    // ignore reset failures
  }
}

export function createProjectTemplatesFixtureApi(
  fallbackApiRequest: (path: string, options?: ApiOptionsLike) => Promise<unknown>,
): (path: string, options?: ApiOptionsLike) => Promise<unknown> {
  return async (path: string, options: ApiOptionsLike = {}) => {
    if (!isLocalDashboardFixtureEnabled() || !isProjectTemplatesPath(path)) {
      return fallbackApiRequest(path, options);
    }

    const url = parseFixtureUrl(path);
    if (!url) {
      return fallbackApiRequest(path, options);
    }

    const method = String(options.method || 'GET').toUpperCase();
    const body = options.body && typeof options.body === 'object' ? options.body : null;

    if (method === 'GET') {
      return listTemplates(url);
    }
    if (method === 'POST') {
      return createTemplate(body);
    }
    if (method === 'PATCH') {
      return updateTemplate(url, body);
    }
    if (method === 'DELETE') {
      return deleteTemplate(url);
    }

    return fallbackApiRequest(path, options);
  };
}
