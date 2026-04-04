import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Hoist mocks before module evaluation ─────────────────────────────────────

const storageMocks = vi.hoisted(() => ({
  loadData: vi.fn(() => ({})),
  saveData: vi.fn(),
}));
vi.mock('../../src/scripts/storage.js', () => storageMocks);

const apiMocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
  ApiError: class ApiError extends Error {
    constructor(message, { status, payload } = {}) {
      super(message);
      this.name = 'ApiError';
      this.status = status ?? null;
      this.payload = payload ?? null;
    }
  },
}));
vi.mock('../../src/scripts/apiClient.js', () => apiMocks);

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
}));

// Keep real normalizeNumbers — used inside normalizeRepairCostValue
vi.mock('../../src/scripts/utils.js', async () => vi.importActual('../../src/scripts/utils.js'));

// ── Import module under test ──────────────────────────────────────────────────

import {
  getMaintenanceState,
  setMaintenanceState,
  refreshMaintenanceFromApi,
  createMaintenanceRequest,
  updateMaintenanceRequest,
  deleteMaintenanceRequest,
  buildMaintenancePayload,
  mapMaintenanceFromApi,
  mapLegacyMaintenanceTicket,
  categorizeMaintenanceStatus,
  isApiError,
} from '../../src/scripts/maintenanceService.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function resetState() {
  storageMocks.saveData.mockClear();
  setMaintenanceState([]);
  storageMocks.saveData.mockClear(); // clear calls from the reset itself
}

function makeTicket(overrides = {}) {
  return {
    id: 1,
    equipment_id: 10,
    equipmentBarcode: 'BC001',
    equipmentDesc: 'Camera',
    issue: 'Broken lens',
    priority: 'high',
    status: 'open',
    status_raw: 'open',
    createdAt: '2024-01-01T00:00:00Z',
    reportedAt: '2024-01-01T00:00:00Z',
    scheduledAt: null,
    resolvedAt: null,
    resolutionReport: '',
    technicianId: null,
    repairCost: null,
    ...overrides,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// categorizeMaintenanceStatus
// ─────────────────────────────────────────────────────────────────────────────

describe('categorizeMaintenanceStatus', () => {
  it.each([
    ['open', 'open'],
    ['قيد الصيانة', 'open'],
    ['قيد الانتظار', 'open'],
    ['in_progress', 'in_progress'],
    ['in-progress', 'in_progress'],
    ['جاري العمل', 'in_progress'],
    ['completed', 'completed'],
    ['مكتمل', 'completed'],
    ['تم الإصلاح', 'completed'],
    ['closed', 'completed'],
    ['مغلق', 'completed'],
    ['cancelled', 'cancelled'],
    ['ملغي', 'cancelled'],
  ])('"%s" → "%s"', (input, expected) => {
    expect(categorizeMaintenanceStatus(input)).toBe(expected);
  });

  it('unknown slug containing "progress" → in_progress', () => {
    expect(categorizeMaintenanceStatus('work_in_progress')).toBe('in_progress');
  });

  it('unknown slug containing "complete" → completed', () => {
    expect(categorizeMaintenanceStatus('auto_complete')).toBe('completed');
  });

  it('unknown slug containing "cancel" → cancelled', () => {
    expect(categorizeMaintenanceStatus('auto_cancel')).toBe('cancelled');
  });

  it('null / undefined → "open"', () => {
    expect(categorizeMaintenanceStatus(null)).toBe('open');
    expect(categorizeMaintenanceStatus(undefined)).toBe('open');
  });

  it('empty string → "open"', () => {
    expect(categorizeMaintenanceStatus('')).toBe('open');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// isApiError
// ─────────────────────────────────────────────────────────────────────────────

describe('isApiError', () => {
  it('returns true for ApiError instance', () => {
    expect(isApiError(new apiMocks.ApiError('fail', { status: 500 }))).toBe(true);
  });

  it('returns false for plain Error', () => {
    expect(isApiError(new Error('fail'))).toBe(false);
  });

  it('returns false for null', () => {
    expect(isApiError(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isApiError(undefined)).toBe(false);
  });

  it('returns false for string', () => {
    expect(isApiError('error')).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// buildMaintenancePayload
// ─────────────────────────────────────────────────────────────────────────────

describe('buildMaintenancePayload', () => {
  it('applies default values for optional fields', () => {
    const payload = buildMaintenancePayload({ equipmentId: 5 });
    expect(payload.equipment_id).toBe(5);
    expect(payload.technician_id).toBeNull();
    expect(payload.priority).toBe('medium');
    expect(payload.status).toBe('open');
    expect(payload.notes).toBe('');
    expect(payload.resolution_report).toBeNull();
    expect(payload.repair_cost).toBeNull();
    expect(payload.scheduled_at).toBeNull();
  });

  it('maps all fields correctly when fully provided', () => {
    const payload = buildMaintenancePayload({
      equipmentId: 10,
      technicianId: 3,
      issue: 'Cracked screen',
      priority: 'high',
      status: 'in_progress',
      scheduledAt: '2024-06-01',
      resolutionReport: 'Fixed it',
    });
    expect(payload.equipment_id).toBe(10);
    expect(payload.technician_id).toBe(3);
    expect(payload.notes).toBe('Cracked screen');
    expect(payload.priority).toBe('high');
    expect(payload.status).toBe('in_progress');
    expect(payload.scheduled_at).toBe('2024-06-01');
    expect(payload.resolution_report).toBe('Fixed it');
  });

  it('sets technician_id to null when not provided', () => {
    const payload = buildMaintenancePayload({ equipmentId: 1 });
    expect(payload.technician_id).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// mapMaintenanceFromApi
// ─────────────────────────────────────────────────────────────────────────────

describe('mapMaintenanceFromApi', () => {
  it('maps snake_case API fields to internal camelCase shape', () => {
    const result = mapMaintenanceFromApi({
      id: 7,
      equipment_id: 10,
      equipment_barcode: 'BC001',
      equipment_desc: 'Camera',
      notes: 'Broken lens',
      priority: 'high',
      status: 'open',
      reported_at: '2024-01-01T00:00:00Z',
      scheduled_at: null,
      resolved_at: null,
      resolution_report: null,
      technician_id: 2,
      repair_cost: '150.50',
    });

    expect(result.id).toBe(7);
    expect(result.equipmentId).toBe(10);
    expect(result.equipmentBarcode).toBe('BC001');
    expect(result.equipmentDesc).toBe('Camera');
    expect(result.issue).toBe('Broken lens');
    expect(result.priority).toBe('high');
    expect(result.statusRaw).toBe('open');
    expect(result.status).toBe('open');
    expect(result.technicianId).toBe(2);
    expect(result.repairCost).toBe(150.5);
  });

  it('normalizes priority — unknown → "medium"', () => {
    expect(mapMaintenanceFromApi({ priority: 'urgent' }).priority).toBe('medium');
    expect(mapMaintenanceFromApi({ priority: 'low' }).priority).toBe('low');
    expect(mapMaintenanceFromApi({ priority: 'high' }).priority).toBe('high');
  });

  it('"completed" status → internal status "closed"', () => {
    const result = mapMaintenanceFromApi({ status: 'completed' });
    expect(result.status).toBe('closed');
    expect(result.statusRaw).toBe('completed');
  });

  it('"open" status → internal status "open"', () => {
    const result = mapMaintenanceFromApi({ status: 'open' });
    expect(result.status).toBe('open');
  });

  it('repairCost null → null', () => {
    expect(mapMaintenanceFromApi({ repair_cost: null }).repairCost).toBeNull();
  });

  it('repairCost negative → null', () => {
    expect(mapMaintenanceFromApi({ repair_cost: -50 }).repairCost).toBeNull();
  });

  it('repairCost string number → parsed float', () => {
    expect(mapMaintenanceFromApi({ repair_cost: '99.99' }).repairCost).toBe(99.99);
  });

  it('handles empty input gracefully', () => {
    const result = mapMaintenanceFromApi({});
    expect(result.priority).toBe('medium');
    expect(result.status).toBe('open');
    expect(result.repairCost).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// mapLegacyMaintenanceTicket
// ─────────────────────────────────────────────────────────────────────────────

describe('mapLegacyMaintenanceTicket', () => {
  it('returns object with numeric id, status, priority on empty input', () => {
    const result = mapLegacyMaintenanceTicket({});
    expect(typeof result.id).toBe('number');
    expect(result.status).toBe('open');
    expect(result.priority).toBe('medium');
  });

  it('passes through well-formed ticket data', () => {
    const raw = makeTicket({ id: 42, priority: 'low', status: 'open' });
    const result = mapLegacyMaintenanceTicket(raw);
    expect(result.id).toBe(42);
    expect(result.priority).toBe('low');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getMaintenanceState / setMaintenanceState
// ─────────────────────────────────────────────────────────────────────────────

describe('getMaintenanceState / setMaintenanceState', () => {
  beforeEach(resetState);

  it('returns empty array after reset', () => {
    expect(getMaintenanceState()).toEqual([]);
  });

  it('setMaintenanceState with non-array → returns []', () => {
    const result = setMaintenanceState(null);
    expect(result).toEqual([]);
    expect(getMaintenanceState()).toEqual([]);
  });

  it('normalizes items through mapLegacyMaintenanceTicket', () => {
    setMaintenanceState([{ id: 1, priority: 'high', status: 'open' }]);
    const state = getMaintenanceState();
    expect(state).toHaveLength(1);
    expect(state[0].id).toBe(1);
    expect(state[0].priority).toBe('high');
  });

  it('calls saveData with { maintenance: [...] }', () => {
    const tickets = [makeTicket({ id: 5 })];
    setMaintenanceState(tickets);
    expect(storageMocks.saveData).toHaveBeenCalledWith(
      expect.objectContaining({ maintenance: expect.any(Array) })
    );
  });

  it('dispatches maintenance:updated event on window', () => {
    const listener = vi.fn();
    window.addEventListener('maintenance:updated', listener);
    setMaintenanceState([]);
    window.removeEventListener('maintenance:updated', listener);
    expect(listener).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// refreshMaintenanceFromApi
// ─────────────────────────────────────────────────────────────────────────────

describe('refreshMaintenanceFromApi', () => {
  beforeEach(() => {
    resetState();
    apiMocks.apiRequest.mockReset();
  });

  it('calls GET /maintenance/', async () => {
    apiMocks.apiRequest.mockResolvedValue([]);
    await refreshMaintenanceFromApi();
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/maintenance/');
  });

  it('with params builds query string', async () => {
    apiMocks.apiRequest.mockResolvedValue([]);
    await refreshMaintenanceFromApi({ status: 'open', limit: 10 });
    const [url] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toMatch(/status=open/);
    expect(url).toMatch(/limit=10/);
  });

  it('array response → state updated', async () => {
    const raw = [makeTicket({ id: 1 }), makeTicket({ id: 2 })];
    apiMocks.apiRequest.mockResolvedValue(raw);
    await refreshMaintenanceFromApi();
    expect(getMaintenanceState()).toHaveLength(2);
  });

  it('{ data: [...] } response → extracts array', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: [makeTicket({ id: 3 })] });
    await refreshMaintenanceFromApi();
    expect(getMaintenanceState()).toHaveLength(1);
  });

  it('{ data: { items: [...] } } response → extracts items', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: { items: [makeTicket({ id: 4 })] } });
    await refreshMaintenanceFromApi();
    expect(getMaintenanceState()).toHaveLength(1);
  });

  it('API throws → error propagates', async () => {
    apiMocks.apiRequest.mockRejectedValue(new apiMocks.ApiError('fail', { status: 500 }));
    await expect(refreshMaintenanceFromApi()).rejects.toMatchObject({ status: 500 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// createMaintenanceRequest
// ─────────────────────────────────────────────────────────────────────────────

describe('createMaintenanceRequest', () => {
  beforeEach(() => {
    resetState();
    apiMocks.apiRequest.mockReset();
  });

  it('calls POST /maintenance/ with payload', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 10 }) });
    await createMaintenanceRequest({ equipment_id: 5, notes: 'broken' });
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/maintenance/', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({ equipment_id: 5 }),
    }));
  });

  it('prepends created ticket to state', async () => {
    setMaintenanceState([makeTicket({ id: 1 })]);
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 99 }) });
    await createMaintenanceRequest({});
    const state = getMaintenanceState();
    expect(state[0].id).toBe(99);
    expect(state).toHaveLength(2);
  });

  it('replaces existing ticket with same id', async () => {
    setMaintenanceState([makeTicket({ id: 5, issue: 'old issue' })]);
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 5, issue: 'new issue' }) });
    await createMaintenanceRequest({});
    const state = getMaintenanceState();
    expect(state).toHaveLength(1);
    expect(state[0].issue).toBe('new issue');
  });

  it('API throws → error propagates, state unchanged', async () => {
    setMaintenanceState([makeTicket({ id: 1 })]);
    apiMocks.apiRequest.mockRejectedValue(new apiMocks.ApiError('fail', { status: 422 }));
    await expect(createMaintenanceRequest({})).rejects.toMatchObject({ status: 422 });
    expect(getMaintenanceState()).toHaveLength(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// updateMaintenanceRequest
// ─────────────────────────────────────────────────────────────────────────────

describe('updateMaintenanceRequest', () => {
  beforeEach(() => {
    resetState();
    apiMocks.apiRequest.mockReset();
    setMaintenanceState([makeTicket({ id: 1, issue: 'original' }), makeTicket({ id: 2 })]);
    storageMocks.saveData.mockClear();
  });

  it('calls PATCH /maintenance/?id=X', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 1 }) });
    await updateMaintenanceRequest(1, { notes: 'updated' });
    const [url, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toContain('id=1');
    expect(opts.method).toBe('PATCH');
  });

  it('updates matching ticket in state', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 1, issue: 'fixed' }) });
    await updateMaintenanceRequest(1, { notes: 'fixed' });
    const updated = getMaintenanceState().find(t => t.id === 1);
    expect(updated.issue).toBe('fixed');
  });

  it('leaves other tickets unchanged', async () => {
    apiMocks.apiRequest.mockResolvedValue({ data: makeTicket({ id: 1 }) });
    await updateMaintenanceRequest(1, {});
    expect(getMaintenanceState()).toHaveLength(2);
    expect(getMaintenanceState().find(t => t.id === 2)).toBeTruthy();
  });

  it('API throws → error propagates, state unchanged', async () => {
    apiMocks.apiRequest.mockRejectedValue(new apiMocks.ApiError('fail', { status: 404 }));
    await expect(updateMaintenanceRequest(1, {})).rejects.toMatchObject({ status: 404 });
    expect(getMaintenanceState()).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// deleteMaintenanceRequest
// ─────────────────────────────────────────────────────────────────────────────

describe('deleteMaintenanceRequest', () => {
  beforeEach(() => {
    resetState();
    apiMocks.apiRequest.mockReset();
    setMaintenanceState([makeTicket({ id: 1 }), makeTicket({ id: 2 })]);
    storageMocks.saveData.mockClear();
  });

  it('calls DELETE /maintenance/?id=X', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await deleteMaintenanceRequest(1);
    const [url, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toContain('id=1');
    expect(opts.method).toBe('DELETE');
  });

  it('removes ticket with matching id', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await deleteMaintenanceRequest(1);
    expect(getMaintenanceState().find(t => t.id === 1)).toBeUndefined();
  });

  it('leaves other tickets in state', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await deleteMaintenanceRequest(1);
    expect(getMaintenanceState()).toHaveLength(1);
    expect(getMaintenanceState()[0].id).toBe(2);
  });

  it('API throws → error propagates, state unchanged', async () => {
    apiMocks.apiRequest.mockRejectedValue(new apiMocks.ApiError('fail', { status: 403 }));
    await expect(deleteMaintenanceRequest(1)).rejects.toMatchObject({ status: 403 });
    expect(getMaintenanceState()).toHaveLength(2);
  });
});
