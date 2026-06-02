import { describe, it, expect, beforeEach, vi } from 'vitest';

// ── Hoist mocks ───────────────────────────────────────────────────────────────

const storageMocks = vi.hoisted(() => ({
  loadData: vi.fn(() => ({})),
  saveData: vi.fn(),
}));

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

vi.mock('../../src/scripts/storage.js', () => storageMocks);
vi.mock('../../src/styles/app.css', () => ({}));
vi.mock('../../src/scripts/apiClient.js', () => apiMocks);
vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
}));

// Keep real normalizeNumbers
vi.mock('../../src/scripts/utils.js', async () => {
  const actual = await vi.importActual('../../src/scripts/utils.js');
  return actual;
});

// ── Import after mocks ────────────────────────────────────────────────────────

import {
  getProjectsState,
  setProjectsState,
  refreshProjectsFromApi,
  ensureProjectsLoaded,
  createProjectApi,
  updateProjectApi,
  closeProjectApi,
  reopenProjectApi,
  deleteProjectApi,
  buildProjectPayload,
  mapProjectFromApi,
  mapLegacyProject,
  isApiError,
} from '../../src/scripts/projectsService.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRawProject(overrides = {}) {
  return {
    id: '42',
    title: 'Test Project',
    status: 'ongoing',
    client_id: '5',
    client_company: 'Acme',
    description: 'A project',
    start_datetime: '2026-01-01T09:00:00',
    end_datetime: '2026-01-10T18:00:00',
    apply_tax: false,
    payment_status: 'unpaid',
    ...overrides,
  };
}

function resetState() {
  setProjectsState([]);
}

function mockApiSuccess(data) {
  apiMocks.apiRequest.mockResolvedValue(data);
}

function mockApiError(status, message = 'error') {
  const err = new apiMocks.ApiError(message, { status });
  apiMocks.apiRequest.mockRejectedValue(err);
}

// ── Setup ─────────────────────────────────────────────────────────────────────

beforeEach(() => {
  apiMocks.apiRequest.mockReset();
  storageMocks.saveData.mockReset();
  resetState();
});

// ─────────────────────────────────────────────────────────────────────────────
// isApiError
// ─────────────────────────────────────────────────────────────────────────────

describe('isApiError', () => {
  it('returns true for an ApiError instance', () => {
    expect(isApiError(new apiMocks.ApiError('oops'))).toBe(true);
  });

  it('returns false for a plain Error', () => {
    expect(isApiError(new Error('plain'))).toBe(false);
  });

  it('returns false for null/undefined', () => {
    expect(isApiError(null)).toBe(false);
    expect(isApiError(undefined)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// mapProjectFromApi / mapLegacyProject
// ─────────────────────────────────────────────────────────────────────────────

describe('mapProjectFromApi', () => {
  it('maps id to string', () => {
    expect(mapProjectFromApi({ id: 10 }).id).toBe('10');
  });

  it('maps snake_case api fields to camelCase', () => {
    const mapped = mapProjectFromApi({
      id: 1,
      client_id: '7',
      client_name: 'Saeed Salem',
      client_company: 'Corp',
      start_datetime: '2026-01-01',
      end_datetime: '2026-01-31',
      apply_tax: true,
      payment_status: 'paid',
    });
    expect(mapped.clientId).toBe('7');
    expect(mapped.clientName).toBe('Saeed Salem');
    expect(mapped.clientCompany).toBe('Corp');
    expect(mapped.start).toBe('2026-01-01');
    expect(mapped.end).toBe('2026-01-31');
    expect(mapped.applyTax).toBe(true);
    expect(mapped.paymentStatus).toBe('paid');
  });

  it('normalizes status to ongoing', () => {
    expect(mapProjectFromApi({ id: 1, status: 'in_progress' }).status).toBe('ongoing');
  });

  it('normalizes status to completed', () => {
    expect(mapProjectFromApi({ id: 1, status: 'completed' }).status).toBe('completed');
  });

  it('normalizes cancelled status', () => {
    expect(mapProjectFromApi({ id: 1, status: 'cancelled' }).status).toBe('cancelled');
  });

  it('sets cancelled=true when cancelled flag is set', () => {
    expect(mapProjectFromApi({ id: 1, cancelled: true }).cancelled).toBe(true);
    expect(mapProjectFromApi({ id: 1, cancelled: true }).status).toBe('cancelled');
  });

  it('maps technicians array of objects to string ids', () => {
    const mapped = mapProjectFromApi({
      id: 1,
      technicians: [{ id: 3, name: 'Ali' }, { id: 7, name: 'Sara' }],
    });
    expect(mapped.technicians).toEqual(['3', '7']);
  });

  it('maps expenses with sale_price to salePrice', () => {
    const mapped = mapProjectFromApi({
      id: 1,
      expenses: [{ id: 'e1', label: 'Transport', amount: '100', sale_price: '150', service_days: '3' }],
    });
    expect(mapped.expenses[0].salePrice).toBe(150);
    expect(mapped.expenses[0].days).toBe(3);
  });

  it('maps expenses notes field to note', () => {
    const mapped = mapProjectFromApi({
      id: 1,
      expenses: [{ label: 'x', amount: 10, notes: 'my note' }],
    });
    expect(mapped.expenses[0].note).toBe('my note');
  });

  it('handles empty/missing fields with safe defaults', () => {
    const mapped = mapProjectFromApi({});
    expect(mapped.id).toBe('');
    expect(mapped.technicians).toEqual([]);
    expect(mapped.expenses).toEqual([]);
    expect(mapped.equipment).toEqual([]);
    expect(mapped.applyTax).toBe(false);
    expect(mapped.paymentStatus).toBe('unpaid');
  });
});

describe('mapLegacyProject', () => {
  it('accepts projectId key', () => {
    const mapped = mapLegacyProject({ projectId: 99, title: 'Legacy' });
    expect(mapped.id).toBe('99');
    expect(mapped.title).toBe('Legacy');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getProjectsState / setProjectsState
// ─────────────────────────────────────────────────────────────────────────────

describe('getProjectsState / setProjectsState', () => {
  it('returns empty array by default after reset', () => {
    expect(getProjectsState()).toEqual([]);
  });

  it('stores and returns projects after setProjectsState', () => {
    setProjectsState([makeRawProject()]);
    const state = getProjectsState();
    expect(state).toHaveLength(1);
    expect(state[0].id).toBe('42');
  });

  it('calls saveData after setting state', () => {
    setProjectsState([makeRawProject()]);
    expect(storageMocks.saveData).toHaveBeenCalledWith(
      expect.objectContaining({ projects: expect.any(Array) })
    );
  });

  it('normalizes items through mapLegacyProject on set', () => {
    setProjectsState([{ id: 5, status: 'completed' }]);
    expect(getProjectsState()[0].id).toBe('5');
    expect(getProjectsState()[0].status).toBe('completed');
  });

  it('replaces previous state on subsequent calls', () => {
    setProjectsState([makeRawProject({ id: '1' })]);
    setProjectsState([makeRawProject({ id: '2' }), makeRawProject({ id: '3' })]);
    expect(getProjectsState()).toHaveLength(2);
  });

  it('sets state to empty array when given non-array', () => {
    setProjectsState([makeRawProject()]);
    setProjectsState(null);
    expect(getProjectsState()).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// refreshProjectsFromApi
// ─────────────────────────────────────────────────────────────────────────────

describe('refreshProjectsFromApi', () => {
  it('calls GET /projects/', async () => {
    mockApiSuccess({ data: [] });
    await refreshProjectsFromApi();
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/projects/');
  });

  it('appends query params when provided', async () => {
    mockApiSuccess({ data: [] });
    await refreshProjectsFromApi({ status: 'ongoing', clientId: '3' });
    const [url] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toContain('status=ongoing');
    expect(url).toContain('clientId=3');
  });

  it('handles response where data is an array', async () => {
    mockApiSuccess({ data: [makeRawProject()] });
    const result = await refreshProjectsFromApi();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('42');
  });

  it('handles response where data.items is an array', async () => {
    mockApiSuccess({ data: { items: [makeRawProject()] } });
    const result = await refreshProjectsFromApi();
    expect(result).toHaveLength(1);
  });

  it('handles response where data.results is an array', async () => {
    mockApiSuccess({ data: { results: [makeRawProject()] } });
    const result = await refreshProjectsFromApi();
    expect(result).toHaveLength(1);
  });

  it('handles response where data.records is an array', async () => {
    mockApiSuccess({ data: { records: [makeRawProject()] } });
    const result = await refreshProjectsFromApi();
    expect(result).toHaveLength(1);
  });

  it('skips undefined/null/empty query param values', async () => {
    mockApiSuccess({ data: [] });
    await refreshProjectsFromApi({ status: undefined, clientId: null, title: '' });
    const [url] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toBe('/projects/');
  });

  it('propagates API errors to the caller', async () => {
    mockApiError(500, 'Server Error');
    await expect(refreshProjectsFromApi()).rejects.toMatchObject({ status: 500 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ensureProjectsLoaded
// ─────────────────────────────────────────────────────────────────────────────

describe('ensureProjectsLoaded', () => {
  it('fetches from API when state is empty', async () => {
    mockApiSuccess({ data: [makeRawProject()] });
    const result = await ensureProjectsLoaded();
    expect(apiMocks.apiRequest).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
  });

  it('returns current state (without fetching) when already loaded and not forced', async () => {
    mockApiSuccess({ data: [makeRawProject()] });
    await ensureProjectsLoaded();
    apiMocks.apiRequest.mockReset();

    const result = await ensureProjectsLoaded();
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('re-fetches when force=true even if already loaded', async () => {
    mockApiSuccess({ data: [makeRawProject()] });
    await ensureProjectsLoaded();
    mockApiSuccess({ data: [makeRawProject(), makeRawProject({ id: '43' })] });

    const result = await ensureProjectsLoaded({ force: true });
    expect(result).toHaveLength(2);
  });

  it('returns current state on API error (does not throw)', async () => {
    setProjectsState([makeRawProject()]);
    mockApiError(503, 'Service Unavailable');
    const result = await ensureProjectsLoaded({ force: true });
    expect(result).toHaveLength(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// createProjectApi
// ─────────────────────────────────────────────────────────────────────────────

describe('createProjectApi', () => {
  it('calls POST /projects/ with payload', async () => {
    mockApiSuccess({ data: makeRawProject() });
    await createProjectApi({ title: 'New Project' });
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/projects/', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({ title: 'New Project' }),
    }));
  });

  it('adds created project to state', async () => {
    mockApiSuccess({ data: makeRawProject({ id: '99' }) });
    await createProjectApi({ title: 'New' });
    expect(getProjectsState().some((p) => p.id === '99')).toBe(true);
  });

  it('returns the mapped created project', async () => {
    mockApiSuccess({ data: makeRawProject({ id: '77', title: 'Created' }) });
    const result = await createProjectApi({ title: 'Created' });
    expect(result.id).toBe('77');
    expect(result.title).toBe('Created');
  });

  it('propagates API errors', async () => {
    mockApiError(422, 'Validation failed');
    await expect(createProjectApi({})).rejects.toMatchObject({ status: 422 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// updateProjectApi
// ─────────────────────────────────────────────────────────────────────────────

describe('updateProjectApi', () => {
  it('calls PATCH /projects/?id=<id>', async () => {
    mockApiSuccess({ data: makeRawProject({ id: '42', title: 'Updated' }) });
    await updateProjectApi('42', { title: 'Updated' });
    const [url, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toContain('id=42');
    expect(opts.method).toBe('PATCH');
  });

  it('replaces the matching project in state', async () => {
    setProjectsState([makeRawProject({ id: '42', title: 'Old' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', title: 'New' }) });
    await updateProjectApi('42', { title: 'New' });
    expect(getProjectsState()[0].title).toBe('New');
  });

  it('preserves other projects in state', async () => {
    setProjectsState([makeRawProject({ id: '42' }), makeRawProject({ id: '43' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', title: 'Updated' }) });
    await updateProjectApi('42', { title: 'Updated' });
    expect(getProjectsState()).toHaveLength(2);
    expect(getProjectsState().find((p) => p.id === '43')).toBeTruthy();
  });

  it('propagates API errors', async () => {
    mockApiError(404, 'Not found');
    await expect(updateProjectApi('99', {})).rejects.toMatchObject({ status: 404 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// closeProjectApi
// ─────────────────────────────────────────────────────────────────────────────

describe('closeProjectApi', () => {
  it('calls updateProjectApi with status completed and confirmed=true', async () => {
    setProjectsState([makeRawProject({ id: '42', description: 'Existing desc' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', status: 'completed' }) });
    await closeProjectApi('42', '');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body).toMatchObject({ status: 'completed', confirmed: true });
  });

  it('appends closing note to description', async () => {
    setProjectsState([makeRawProject({ id: '42', description: 'Base' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', status: 'completed' }) });
    await closeProjectApi('42', 'All done');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body.description).toContain('All done');
  });

  it('works when no closing note is provided', async () => {
    setProjectsState([makeRawProject({ id: '42' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', status: 'completed' }) });
    await closeProjectApi('42');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body.status).toBe('completed');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// reopenProjectApi
// ─────────────────────────────────────────────────────────────────────────────

describe('reopenProjectApi', () => {
  it('calls updateProjectApi with status ongoing and confirmed=true', async () => {
    setProjectsState([makeRawProject({ id: '42', status: 'completed' })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', status: 'ongoing' }) });
    await reopenProjectApi('42');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body).toMatchObject({ status: 'ongoing', confirmed: true });
  });

  it('strips closing note from description when reopening', async () => {
    const descWithNote = 'Base\nملاحظة إغلاق: All done';
    setProjectsState([makeRawProject({ id: '42', description: descWithNote })]);
    mockApiSuccess({ data: makeRawProject({ id: '42', status: 'ongoing' }) });
    await reopenProjectApi('42');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body.description).not.toContain('ملاحظة إغلاق');
    expect(opts.body.description).toContain('Base');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// deleteProjectApi
// ─────────────────────────────────────────────────────────────────────────────

describe('deleteProjectApi', () => {
  it('calls DELETE /projects/?id=<id>', async () => {
    mockApiSuccess(null);
    await deleteProjectApi('42');
    const [url, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(url).toContain('id=42');
    expect(opts.method).toBe('DELETE');
  });

  it('removes the project from state', async () => {
    setProjectsState([makeRawProject({ id: '42' }), makeRawProject({ id: '43' })]);
    mockApiSuccess(null);
    await deleteProjectApi('42');
    expect(getProjectsState().find((p) => p.id === '42')).toBeUndefined();
    expect(getProjectsState()).toHaveLength(1);
  });

  it('propagates API errors', async () => {
    mockApiError(403, 'Forbidden');
    await expect(deleteProjectApi('42')).rejects.toMatchObject({ status: 403 });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// buildProjectPayload
// ─────────────────────────────────────────────────────────────────────────────

describe('buildProjectPayload', () => {
  it('sets required fields with snake_case keys', () => {
    const payload = buildProjectPayload({ title: 'P', type: 'event', clientId: '5' });
    expect(payload.title).toBe('P');
    expect(payload.type).toBe('event');
    expect(payload.client_id).toBe(5);
  });

  it('defaults apply_tax to false', () => {
    expect(buildProjectPayload({}).apply_tax).toBe(false);
  });

  it('defaults payment_status to unpaid', () => {
    expect(buildProjectPayload({}).payment_status).toBe('unpaid');
  });

  it('strips expenses with empty labels', () => {
    const payload = buildProjectPayload({
      expenses: [
        { label: 'Fuel', amount: 100 },
        { label: '', amount: 50 },
        { label: '  ', amount: 20 },
      ],
    });
    expect(payload.expenses).toHaveLength(1);
    expect(payload.expenses[0].label).toBe('Fuel');
  });

  it('computes expenses_total from normalized expenses', () => {
    const payload = buildProjectPayload({
      expenses: [
        { label: 'A', amount: 100, days: 2 },
        { label: 'B', amount: 200 },
      ],
    });
    expect(payload.expenses_total).toBe(400);
    expect(payload.expenses[0].service_days).toBe(2);
  });

  it('computes services_client_price from per-service sale price and days', () => {
    const payload = buildProjectPayload({
      expenses: [
        { label: 'A', amount: 100, salePrice: 150, days: 2 },
        { label: 'B', amount: 50, salePrice: 75 },
      ],
      servicesClientPrice: 999,
    });
    expect(payload.services_client_price).toBe(375);
  });

  it('strips equipment with invalid/zero id', () => {
    const payload = buildProjectPayload({
      equipment: [
        { equipmentId: 5, qty: 2 },
        { equipmentId: 0, qty: 1 },
        { equipmentId: null, qty: 1 },
      ],
    });
    expect(payload.equipment).toHaveLength(1);
    expect(payload.equipment[0].equipment_id).toBe(5);
  });

  it('preserves equipment pricing fields for managed reservation sync', () => {
    const payload = buildProjectPayload({
      equipment: [
        { equipmentId: 5, qty: 2, unit_price: 1200, unit_cost: 300, notes: 'Package: basic' },
      ],
    });
    expect(payload.equipment).toEqual([
      {
        equipment_id: 5,
        quantity: 2,
        unit_price: 1200,
        unit_cost: 300,
        notes: 'Package: basic',
      },
    ]);
  });

  it('serializes project packages as one reservation package and clamps child quantities', () => {
    const payload = buildProjectPayload({
      equipment: [
        {
          type: 'package',
          packageId: 12,
          package_code: 'PKG-12',
          desc: 'Production Kit',
          qty: 1,
          price: 2500,
          cost: 700,
          packageItems: [
            { equipmentId: 5, qty: 33, barcode: 'CAM-1', desc: 'Camera' },
            { equipmentId: 7, quantity: 4, barcode: 'LENS-1', desc: 'Lens' },
          ],
        },
      ],
    });

    expect(payload.equipment).toEqual([
      expect.objectContaining({ equipment_id: 5, quantity: 1, unit_price: 2500, unit_cost: 700 }),
      expect.objectContaining({ equipment_id: 7, quantity: 1, unit_price: 0, unit_cost: 0 }),
    ]);
    expect(payload.reservation_packages).toHaveLength(1);
    expect(payload.reservation_packages[0]).toEqual(expect.objectContaining({
      package_id: 12,
      package_code: 'PKG-12',
      name: 'Production Kit',
      quantity: 1,
      unit_price: 2500,
      unit_cost: 700,
    }));
    expect(JSON.parse(payload.reservation_packages[0].items_json)).toEqual([
      expect.objectContaining({ equipment_id: 5, quantity: 1, qtyPerPackage: 1 }),
      expect.objectContaining({ equipment_id: 7, quantity: 1, qtyPerPackage: 1 }),
    ]);
  });

  it('maps technician ids to integer array', () => {
    const payload = buildProjectPayload({ technicians: ['3', '7', '0', '-1'] });
    expect(payload.technicians).toEqual([3, 7]);
  });

  it('can opt project saves into managed reservation sync', () => {
    const payload = buildProjectPayload({ syncManagedReservation: true });
    expect(payload.sync_managed_reservation).toBe(true);
  });

  it('preserves detailed crew assignments for managed reservation sync', () => {
    const payload = buildProjectPayload({
      technicians: [{ id: 3, name: 'Ali' }, { technicianId: 7, positionKey: 'dop', positionCost: 500 }],
      crewAssignments: [
        {
          technicianId: 7,
          positionKey: 'dop',
          positionName: 'DOP',
          positionCost: 500,
          positionClientPrice: 900,
        },
      ],
    });

    expect(payload.technicians).toEqual([3, 7]);
    expect(payload.crew_assignments).toEqual([
      expect.objectContaining({
        technician_id: 7,
        position_key: 'dop',
        position_name: 'DOP',
        position_cost: 500,
        position_client_price: 900,
      }),
    ]);
  });

  it('maps project crew picker assignment labels into managed reservation crew payload', () => {
    const payload = buildProjectPayload({
      technicians: [
        {
          technicianId: 12,
          technicianName: 'Mona',
          positionId: 4,
          positionKey: 'producer',
          positionLabel: 'Producer',
          positionLabelAlt: 'منتج',
          positionCost: 350,
          positionClientPrice: 700,
          assignmentId: 'assignment-1',
        },
      ],
      crewAssignments: [
        {
          technicianId: 12,
          technicianName: 'Mona',
          positionId: 4,
          positionKey: 'producer',
          positionLabel: 'Producer',
          positionLabelAlt: 'منتج',
          positionCost: 350,
          positionClientPrice: 700,
          assignmentId: 'assignment-1',
        },
      ],
    });

    expect(payload.technicians).toEqual([12]);
    expect(payload.crew_assignments).toEqual([
      expect.objectContaining({
        technician_id: 12,
        position_id: 4,
        position_key: 'producer',
        position_name: 'Producer',
        position_label_ar: 'Producer',
        position_label_en: 'منتج',
        position_cost: 350,
        position_client_price: 700,
        assignment_id: 'assignment-1',
      }),
    ]);
  });

  it('normalizes discountType to percent for unknown values', () => {
    expect(buildProjectPayload({ discountType: 'unknown' }).discount_type).toBe('percent');
  });

  it('sets discount_type to amount when specified', () => {
    expect(buildProjectPayload({ discountType: 'amount' }).discount_type).toBe('amount');
  });

  it('disables company overhead when companyShareEnabled=false', () => {
    const payload = buildProjectPayload({ companyShareEnabled: false, companySharePercent: 20 });
    expect(payload.company_share_enabled).toBe(false);
    expect(payload.company_share_percent).toBe(0);
  });

  it('enables company overhead when companyShareEnabled=true and percent>0', () => {
    const payload = buildProjectPayload({ companyShareEnabled: true, companySharePercent: 25 });
    expect(payload.company_share_enabled).toBe(true);
    expect(payload.company_share_percent).toBe(25);
  });

  it('omits end_datetime when falsy', () => {
    const payload = buildProjectPayload({ end: null });
    expect('end_datetime' in payload).toBe(false);
  });

  it('includes project_code when provided', () => {
    const payload = buildProjectPayload({ projectCode: 'PRJ-001' });
    expect(payload.project_code).toBe('PRJ-001');
  });

  it('expense notes are included in both note and notes fields for backward compatibility', () => {
    const payload = buildProjectPayload({
      expenses: [{ label: 'X', amount: 10, note: 'some note' }],
    });
    expect(payload.expenses[0].note).toBe('some note');
    expect(payload.expenses[0].notes).toBe('some note');
  });

  it('expense without note omits note field', () => {
    const payload = buildProjectPayload({
      expenses: [{ label: 'X', amount: 10 }],
    });
    expect(payload.expenses[0].note).toBeUndefined();
  });
});
