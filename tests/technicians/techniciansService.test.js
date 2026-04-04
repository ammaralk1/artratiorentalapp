import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Mocks ─────────────────────────────────────────────────────────────────────
vi.mock('../../src/scripts/storage.js', () => ({
  loadData: vi.fn(() => ({ technicians: [] })),
  saveData: vi.fn(),
}));

vi.mock('../../src/scripts/apiClient.js', () => ({
  apiRequest: vi.fn(),
  ApiError: class ApiError extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
      this.name = 'ApiError';
    }
  },
}));

vi.mock('../../src/scripts/utils.js', () => ({
  normalizeNumbers: vi.fn((v) => String(v ?? '')),
}));

// ── Imports (after mocks) ─────────────────────────────────────────────────────
import { loadData, saveData } from '../../src/scripts/storage.js';
import { apiRequest, ApiError } from '../../src/scripts/apiClient.js';

import {
  getTechniciansState,
  setTechniciansState,
  mapTechnicianFromApi,
  mapLegacyTechnician,
  buildTechnicianPayload,
  isApiError,
} from '../../src/scripts/techniciansService.js';

// ── Helpers ───────────────────────────────────────────────────────────────────
function makeTechRaw(overrides = {}) {
  return {
    id: '1',
    full_name: 'Alice Doe',
    phone: '0501234567',
    email: 'alice@example.com',
    specialization: 'lighting',
    department: 'production',
    daily_wage: 300,
    daily_total: 300,
    status: 'available',
    notes: 'reliable',
    active: 1,
    ...overrides,
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('getTechniciansState', () => {
  it('returns an array', () => {
    const state = getTechniciansState();
    expect(Array.isArray(state)).toBe(true);
  });
});

describe('setTechniciansState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets state to empty array when called with []', () => {
    setTechniciansState([]);
    const state = getTechniciansState();
    expect(Array.isArray(state)).toBe(true);
    expect(state).toHaveLength(0);
  });

  it('maps a valid technician object correctly (has id and name)', () => {
    const raw = makeTechRaw();
    setTechniciansState([raw]);
    const state = getTechniciansState();
    expect(state).toHaveLength(1);
    expect(state[0]).toHaveProperty('id', '1');
    expect(state[0]).toHaveProperty('name', 'Alice Doe');
  });

  it('sets state to empty array for non-array input (string)', () => {
    setTechniciansState('not-an-array');
    expect(getTechniciansState()).toHaveLength(0);
  });

  it('sets state to empty array for non-array input (object)', () => {
    setTechniciansState({ id: 1 });
    expect(getTechniciansState()).toHaveLength(0);
  });

  it('calls saveData after setting state', () => {
    saveData.mockClear();
    setTechniciansState([makeTechRaw()]);
    expect(saveData).toHaveBeenCalledTimes(1);
    expect(saveData).toHaveBeenCalledWith(expect.objectContaining({ technicians: expect.any(Array) }));
  });
});

describe('mapTechnicianFromApi', () => {
  it('maps snake_case full_name to name', () => {
    const result = mapTechnicianFromApi({ full_name: 'Bob Smith' });
    expect(result.name).toBe('Bob Smith');
  });

  it('maps snake_case phone_number — falls back to phone field', () => {
    const result = mapTechnicianFromApi({ phone: '0509876543' });
    expect(result.phone).toBe('0509876543');
  });

  it('maps snake_case is_active — falls back to active field', () => {
    const result = mapTechnicianFromApi({ active: 0 });
    expect(result.active).toBe(false);
  });

  it('maps active: 1 to true', () => {
    const result = mapTechnicianFromApi({ active: 1 });
    expect(result.active).toBe(true);
  });

  it('maps full_name to name', () => {
    const result = mapTechnicianFromApi({ full_name: 'Carol Jones' });
    expect(result.name).toBe('Carol Jones');
  });

  it('maps camelCase phoneNumber — uses phone field as fallback', () => {
    const result = mapTechnicianFromApi({ phone: '0551112222' });
    expect(result.phone).toBe('0551112222');
  });

  it('returns object with expected shape when called with {}', () => {
    const result = mapTechnicianFromApi({});
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('phone');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('role');
    expect(result).toHaveProperty('department');
    expect(result).toHaveProperty('dailyWage');
    expect(result).toHaveProperty('dailyTotal');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('active');
  });

  it('defaults status to available for empty input', () => {
    const result = mapTechnicianFromApi({});
    expect(result.status).toBe('available');
  });

  it('normalizes Arabic status مشغول to busy', () => {
    const result = mapTechnicianFromApi({ status: 'مشغول' });
    expect(result.status).toBe('busy');
  });

  it('preserves id as string', () => {
    const result = mapTechnicianFromApi({ id: 42 });
    expect(result.id).toBe('42');
  });
});

describe('mapLegacyTechnician', () => {
  it('returns the same shape as mapTechnicianFromApi for snake_case input', () => {
    const raw = makeTechRaw();
    const fromApi = mapTechnicianFromApi(raw);
    const legacy = mapLegacyTechnician(raw);
    expect(Object.keys(legacy).sort()).toEqual(Object.keys(fromApi).sort());
  });

  it('resolves name from fullName camelCase field', () => {
    const result = mapLegacyTechnician({ fullName: 'Dana Lee' });
    expect(result.name).toBe('Dana Lee');
  });
});

describe('buildTechnicianPayload', () => {
  it('includes name, phone, and active fields', () => {
    const payload = buildTechnicianPayload({ name: 'Eve', phone: '050', active: true });
    expect(payload).toHaveProperty('full_name', 'Eve');
    expect(payload).toHaveProperty('phone', '050');
    expect(payload).toHaveProperty('active', 1);
  });

  it('maps camelCase dailyWage to snake_case daily_wage', () => {
    const payload = buildTechnicianPayload({ dailyWage: 500 });
    expect(payload).toHaveProperty('daily_wage', 500);
  });

  it('maps active: false to 0', () => {
    const payload = buildTechnicianPayload({ active: false });
    expect(payload.active).toBe(0);
  });

  it('defaults active to 1 when not provided', () => {
    const payload = buildTechnicianPayload({ name: 'Test' });
    expect(payload.active).toBe(1);
  });

  it('defaults status to available when not provided', () => {
    const payload = buildTechnicianPayload({});
    expect(payload.status).toBe('available');
  });

  it('maps role to specialization field', () => {
    const payload = buildTechnicianPayload({ role: 'cameraman' });
    expect(payload.specialization).toBe('cameraman');
  });
});

describe('isApiError', () => {
  it('returns true for ApiError instances', () => {
    const err = new ApiError('request failed', 422);
    expect(isApiError(err)).toBe(true);
  });

  it('returns false for plain Error instances', () => {
    const err = new Error('oops');
    expect(isApiError(err)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isApiError(null)).toBe(false);
  });

  it('returns false for a string', () => {
    expect(isApiError('error string')).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isApiError(undefined)).toBe(false);
  });
});
