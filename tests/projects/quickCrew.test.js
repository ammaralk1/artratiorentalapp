import { beforeEach, describe, expect, it, vi } from 'vitest';

const createTechnicianPositionMock = vi.fn();
const buildTechnicianPayloadMock = vi.fn((payload) => ({ apiPayload: payload }));
const createTechnicianApiMock = vi.fn();
const refreshTechniciansFromApiMock = vi.fn();

vi.mock('../../src/scripts/technicianPositions.js', () => ({
  createTechnicianPosition: createTechnicianPositionMock,
}));

vi.mock('../../src/scripts/techniciansService.js', () => ({
  buildTechnicianPayload: buildTechnicianPayloadMock,
  createTechnicianApi: createTechnicianApiMock,
  refreshTechniciansFromApi: refreshTechniciansFromApiMock,
}));

vi.mock('../../src/scripts/reservationsTechnicians.js', () => ({
  addDraftAssignmentFromPosition: vi.fn(),
}));

vi.mock('../../src/scripts/language.js', () => ({
  t: (_key, fallback) => fallback,
}));

vi.mock('../../src/scripts/utils.js', () => ({
  normalizeNumbers: (value) => String(value ?? '').replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)),
  showToast: vi.fn(),
}));

describe('project quick crew helpers', () => {
  beforeEach(() => {
    createTechnicianPositionMock.mockReset();
    buildTechnicianPayloadMock.mockClear();
    createTechnicianApiMock.mockReset();
    refreshTechniciansFromApiMock.mockReset();
  });

  it('creates positions through the shared project quick crew path with normalized money values', async () => {
    createTechnicianPositionMock.mockResolvedValue({ id: 10, name: 'DOP' });
    const { createProjectQuickPosition } = await import('../../src/scripts/projects/quickCrew.js');

    const result = await createProjectQuickPosition({
      labelAr: 'مدير تصوير',
      labelEn: 'DOP',
      cost: '١٥٠٠',
      clientPrice: '2500.75',
    });

    expect(result).toEqual({ id: 10, name: 'DOP' });
    expect(createTechnicianPositionMock).toHaveBeenCalledWith({
      name: 'DOP',
      labelAr: 'مدير تصوير',
      labelEn: 'DOP',
      cost: 1500,
      clientPrice: 2500.75,
    });
  });

  it('creates technicians and returns the refreshed crew cache for create and edit flows', async () => {
    const created = { id: 'tech-1', name: 'Sara' };
    const refreshed = [{ id: 'tech-1', name: 'Sara' }, { id: 'tech-2', name: 'Ali' }];
    createTechnicianApiMock.mockResolvedValue(created);
    refreshTechniciansFromApiMock.mockResolvedValue(refreshed);
    const { createProjectQuickTechnician } = await import('../../src/scripts/projects/quickCrew.js');

    const result = await createProjectQuickTechnician({
      name: ' Sara ',
      phone: '٠٥٥١٢٣',
      email: 'sara@example.com',
      role: 'DOP',
      department: 'Camera',
    });

    expect(buildTechnicianPayloadMock).toHaveBeenCalledWith({
      name: 'Sara',
      phone: '055123',
      email: 'sara@example.com',
      role: 'DOP',
      department: 'Camera',
      dailyWage: 0,
      dailyTotal: null,
      status: 'available',
      active: true,
    });
    expect(createTechnicianApiMock).toHaveBeenCalledWith({
      apiPayload: expect.objectContaining({ name: 'Sara' }),
    });
    expect(result).toEqual({ created, technicians: refreshed });
  });
});
