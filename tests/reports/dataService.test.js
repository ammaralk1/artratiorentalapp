import { beforeEach, describe, expect, it, vi } from 'vitest';

const storageMocks = vi.hoisted(() => ({
  loadData: vi.fn(() => ({})),
}));

vi.mock('../../src/scripts/storage.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    loadData: storageMocks.loadData,
  };
});
vi.mock('../../src/scripts/apiClient.js', () => ({
  apiRequest: vi.fn(() => Promise.resolve({ data: {} })),
  ApiError: class ApiError extends Error {},
}));
vi.mock('../../src/scripts/reports/formatters.js', () => ({
  translate: vi.fn((_, fallback) => fallback ?? ''),
}));
vi.mock('../../src/scripts/reservationsService.js', () => ({
  mapReservationFromApi: vi.fn((value) => value),
  mapLegacyReservation: vi.fn((value) => value),
}));
vi.mock('../../src/scripts/techniciansService.js', () => ({
  mapTechnicianFromApi: vi.fn((value) => value),
}));
vi.mock('../../src/scripts/maintenanceService.js', () => ({
  mapMaintenanceFromApi: vi.fn((value) => value),
}));
vi.mock('../../src/scripts/fixtureRuntime.js', () => ({
  isLocalDashboardFixtureEnabled: vi.fn(() => false),
}));

import { hydrateReportsFromCache } from '../../src/scripts/reports/dataService.js';
import reportsState from '../../src/scripts/reports/state.js';

describe('reports/dataService', () => {
  beforeEach(() => {
    storageMocks.loadData.mockReset();
    reportsState.data.projects = [];
    reportsState.data.projectsMap = new Map();
    reportsState.data.customers = [];
    reportsState.data.reservations = [];
    reportsState.data.equipment = [];
    reportsState.data.technicians = [];
    reportsState.data.maintenance = [];
  });

  it('hydrates project client fields from cached project rows', () => {
    storageMocks.loadData.mockReturnValue({
      customers: [{
        id: 9,
        full_name: 'Elite Production Co.',
        company: 'Elite',
      }],
      projects: [{
        id: 17,
        title: 'Launch Film',
        project_code: 'PRJ-0017',
        client_id: 9,
        start_datetime: '2026-04-01 09:00:00',
        end_datetime: '2026-04-03 18:00:00',
        status: 'ongoing',
        confirmed: true,
      }],
    });

    const hydrated = hydrateReportsFromCache();

    expect(hydrated).toBe(true);
    expect(reportsState.data.projects).toHaveLength(1);
    expect(reportsState.data.projects[0]).toMatchObject({
      id: '17',
      projectCode: 'PRJ-0017',
      clientId: '9',
      clientName: 'Elite Production Co.',
      clientCompany: '',
      start: '2026-04-01 09:00:00',
      end: '2026-04-03 18:00:00',
    });
    expect(reportsState.data.projectsMap.get('17')).toMatchObject({
      clientName: 'Elite Production Co.',
    });
  });
});
