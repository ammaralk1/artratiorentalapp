import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const loadDataMock = vi.fn();
const syncTechniciansStatusesMock = vi.fn();
const tMock = vi.fn();
const showToastMock = vi.fn();
const getReservationFiltersMock = vi.fn();
const filterReservationEntriesMock = vi.fn();
const buildReservationTilesHtmlMock = vi.fn();
const buildReservationDetailsHtmlMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/technicians.js', () => ({ syncTechniciansStatuses: syncTechniciansStatusesMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock }));
vi.mock('../../src/scripts/utils.js', () => ({ showToast: showToastMock }));
vi.mock('../../src/scripts/reservationsFilters.js', () => ({ getReservationFilters: getReservationFiltersMock }));
vi.mock('../../src/scripts/reservations/list/index.js', () => ({
  filterReservationEntries: filterReservationEntriesMock,
  buildReservationTilesHtml: buildReservationTilesHtmlMock,
  buildReservationDetailsHtml: buildReservationDetailsHtmlMock
}));

const resetEnvironment = () => {
  vi.resetModules();
  document.body.innerHTML = '';
  loadDataMock.mockReset();
  syncTechniciansStatusesMock.mockReset();
  tMock.mockReset();
  showToastMock.mockReset();
  getReservationFiltersMock.mockReset();
  filterReservationEntriesMock.mockReset();
  buildReservationTilesHtmlMock.mockReset();
  buildReservationDetailsHtmlMock.mockReset();
  localStorage.clear();
  delete window.bootstrap;

  loadDataMock.mockReturnValue({ reservations: [], customers: [], technicians: [], projects: [] });
  tMock.mockImplementation((key, fallback) => fallback);
};

describe('reservations/renderers module', () => {
  beforeEach(() => {
    resetEnvironment();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renderReservationsList warns when container missing', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const module = await import('../../src/scripts/reservations/renderers.js');

    module.renderReservationsList({ containerId: 'missing' });

    expect(warnSpy).toHaveBeenCalledWith('⚠️ [reservations/renderers] container not found', 'missing');
  });

  it('renderReservationsList renders empty message when no reservations', async () => {
    const container = document.createElement('div');
    container.id = 'list';
    document.body.appendChild(container);
    loadDataMock.mockReturnValue({ reservations: [], customers: [] });
    const module = await import('../../src/scripts/reservations/renderers.js');

    module.renderReservationsList({ containerId: 'list' });

    expect(container.innerHTML).toContain('⚠️ لا توجد حجوزات بعد.');
  });

  it('renderReservationsList renders no-results message when filter returns empty', async () => {
    const container = document.createElement('div');
    container.id = 'list';
    document.body.appendChild(container);
    loadDataMock.mockReturnValue({ reservations: [{ id: 1 }], customers: [], technicians: [] });
    getReservationFiltersMock.mockReturnValue({});
    filterReservationEntriesMock.mockReturnValue([]);
    const module = await import('../../src/scripts/reservations/renderers.js');

    module.renderReservationsList({ containerId: 'list' });

    expect(filterReservationEntriesMock).toHaveBeenCalled();
    expect(container.innerHTML).toContain('🔍 لا توجد حجوزات مطابقة للبحث.');
  });

  it('renderReservationsList builds grid and wires detail/confirm callbacks', async () => {
    const container = document.createElement('div');
    container.id = 'list';
    document.body.appendChild(container);

    loadDataMock.mockReturnValue({
      reservations: [{ id: 1 }],
      customers: [{ id: 1 }],
      technicians: [{ id: 1 }],
      projects: [{ id: 10 }]
    });
    syncTechniciansStatusesMock.mockReturnValue([{ id: 1, name: 'Tech' }]);
    filterReservationEntriesMock.mockReturnValue([{ id: 1 }]);
    buildReservationTilesHtmlMock.mockReturnValue(`
      <button data-action="details" data-reservation-index="0">Detail</button>
      <button data-action="confirm" data-reservation-index="0">Confirm</button>
    `);

    const module = await import('../../src/scripts/reservations/renderers.js');
    const onShowDetails = vi.fn();
    const onConfirm = vi.fn();

    module.renderReservationsList({ containerId: 'list', onShowDetails, onConfirmReservation: onConfirm });

    expect(container.querySelector('.reservations-grid')).toBeTruthy();
    container.querySelector('[data-action="details"]').click();
    expect(onShowDetails).toHaveBeenCalledWith(0);

    const confirmBtn = container.querySelector('[data-action="confirm"]');
    confirmBtn.click();
    expect(onConfirm).toHaveBeenCalledWith(0, expect.any(Event));
  });

  it('renderReservationDetails shows toast when reservation missing', async () => {
    loadDataMock.mockReturnValue({ reservations: [], customers: [] });
    const module = await import('../../src/scripts/reservations/renderers.js');

    const result = module.renderReservationDetails(0);

    expect(result).toBe(false);
    expect(showToastMock).toHaveBeenCalled();
  });

  it('renderReservationDetails populates DOM and wires handlers', async () => {
    const body = document.createElement('div');
    body.id = 'reservation-details-body';
    document.body.appendChild(body);
    const modalEl = document.createElement('div');
    modalEl.id = 'reservationDetailsModal';
    document.body.appendChild(modalEl);
    const editBtn = document.createElement('button');
    editBtn.id = 'reservation-details-edit-btn';
    document.body.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'reservation-details-delete-btn';
    document.body.appendChild(deleteBtn);

    const reservation = { id: 1, customerId: 1, projectId: 10 };
    loadDataMock.mockReturnValue({
      reservations: [reservation],
      customers: [{ id: 1, name: 'Cust' }],
      projects: [{ id: 10, title: 'Project' }]
    });
    buildReservationDetailsHtmlMock.mockReturnValue('<div>Details</div><button data-action="open-project"></button>');

    const hideMock = vi.fn();
    window.bootstrap = {
      Modal: {
        getOrCreateInstance: vi.fn(() => ({ show: vi.fn(), hide: hideMock })),
        getInstance: vi.fn(() => ({ hide: hideMock }))
      }
    };

    const module = await import('../../src/scripts/reservations/renderers.js');

    const onEdit = vi.fn();
    const onDelete = vi.fn();

    const result = module.renderReservationDetails(0, { onEdit, onDelete, getEditContext: 'ctx' });

    expect(result).toBe(true);
    expect(body.innerHTML).toContain('Details');
    editBtn.click();
    expect(onEdit).toHaveBeenCalledWith(0, expect.objectContaining({ reservation, getEditContext: 'ctx' }));
    deleteBtn.click();
    expect(onDelete).toHaveBeenCalledWith(0, expect.objectContaining({ reservation }));
    expect(window.bootstrap.Modal.getOrCreateInstance).toHaveBeenCalledWith(modalEl);
  });

  it('renderReservationDetails handles project link and persistence errors', async () => {
    const body = document.createElement('div');
    body.id = 'reservation-details-body';
    body.innerHTML = '';
    document.body.appendChild(body);
    const modalEl = document.createElement('div');
    modalEl.id = 'reservationDetailsModal';
    document.body.appendChild(modalEl);

    const reservation = { id: 2, customerId: 1, projectId: 5 };
    loadDataMock.mockReturnValue({
      reservations: [reservation],
      customers: [{ id: 1 }],
      projects: [{ id: 5 }]
    });
    buildReservationDetailsHtmlMock.mockReturnValue('<button data-action="open-project"></button>');

    const hideMock = vi.fn();
    window.bootstrap = {
      Modal: {
        getOrCreateInstance: vi.fn(() => ({ show: vi.fn() })),
        getInstance: vi.fn(() => ({ hide: hideMock }))
      }
    };

    const module = await import('../../src/scripts/reservations/renderers.js');
    const restoreLocation = (() => {
      const original = window.location;
      const mockLocation = { href: 'about:blank' };
      Object.defineProperty(window, 'location', { configurable: true, value: mockLocation });
      return () => Object.defineProperty(window, 'location', { configurable: true, value: original });
    })();

    module.renderReservationDetails(0);

    const projectButton = body.querySelector('[data-action="open-project"]');
    expect(projectButton).toBeTruthy();
    projectButton.click();
    expect(localStorage.getItem('pendingProjectDetailId')).toBe('5');
    expect(window.location.href).toBe('projects.html');
    restoreLocation();
  });
});
