import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const loadDataMock = vi.fn();
const tMock = vi.fn((key, fallback) => fallback);
const refreshCreateReservationFormMock = vi.fn();
const reconcileTechnicianSelectionsMock = vi.fn();
const renderReservationsListMock = vi.fn();
const renderReservationDetailsMock = vi.fn();
const confirmReservationActionMock = vi.fn();
const deleteReservationActionMock = vi.fn();
const editReservationMock = vi.fn();
const setupEditReservationModalEventsMock = vi.fn();
const renderEditReservationItemsMock = vi.fn();
const addEquipmentToEditingReservationMock = vi.fn();
const addEquipmentToEditingByDescriptionMock = vi.fn();
const removeEditReservationItemMock = vi.fn();
const updateEditReservationSummaryMock = vi.fn();
const hasEquipmentConflictMock = vi.fn();
const hasTechnicianConflictMock = vi.fn();
const splitDateTimeMock = vi.fn();
const combineDateTimeMock = vi.fn();
const addEquipmentByDescriptionMock = vi.fn();
const setFlatpickrValueMock = vi.fn();
const populateEquipmentDescriptionListsMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock }));
vi.mock('../../src/scripts/reservations/createForm.js', () => ({
  initCreateReservationForm: vi.fn(),
  refreshCreateReservationForm: refreshCreateReservationFormMock,
  renderDraftReservationSummary: vi.fn()
}));
vi.mock('../../src/scripts/reservations/formUtils.js', () => ({
  addEquipmentByDescription: addEquipmentByDescriptionMock,
  setFlatpickrValue: setFlatpickrValueMock,
  populateEquipmentDescriptionLists: populateEquipmentDescriptionListsMock
}));
vi.mock('../../src/scripts/reservations/state.js', () => ({
  hasEquipmentConflict: hasEquipmentConflictMock,
  hasTechnicianConflict: hasTechnicianConflictMock,
  splitDateTime: splitDateTimeMock,
  combineDateTime: combineDateTimeMock
}));
vi.mock('../../src/scripts/reservations/renderers.js', () => ({
  renderReservationsList: renderReservationsListMock,
  renderReservationDetails: renderReservationDetailsMock
}));
vi.mock('../../src/scripts/reservations/editForm.js', () => ({
  renderEditReservationItems: renderEditReservationItemsMock,
  addEquipmentToEditingReservation: addEquipmentToEditingReservationMock,
  addEquipmentToEditingByDescription: addEquipmentToEditingByDescriptionMock,
  removeEditReservationItem: removeEditReservationItemMock,
  updateEditReservationSummary: updateEditReservationSummaryMock
}));
vi.mock('../../src/scripts/reservationsActions.js', () => ({
  confirmReservation: confirmReservationActionMock,
  deleteReservation: deleteReservationActionMock
}));
vi.mock('../../src/scripts/reservationsEdit.js', () => ({
  editReservation: editReservationMock,
  setupEditReservationModalEvents: setupEditReservationModalEventsMock
}));
vi.mock('../../src/scripts/reservationsTechnicians.js', () => ({
  reconcileTechnicianSelections: reconcileTechnicianSelectionsMock
}));

const resetEnvironment = () => {
  vi.resetModules();
  localStorage.clear();
  document.body.innerHTML = '';
  document.body.className = '';
  document.documentElement.className = '';

  loadDataMock.mockReset();
  tMock.mockReset();
  refreshCreateReservationFormMock.mockReset();
  reconcileTechnicianSelectionsMock.mockReset();
  renderReservationsListMock.mockReset();
  renderReservationDetailsMock.mockReset();
  confirmReservationActionMock.mockReset();
  deleteReservationActionMock.mockReset();
  editReservationMock.mockReset();
  setupEditReservationModalEventsMock.mockReset();
  renderEditReservationItemsMock.mockReset();
  addEquipmentToEditingReservationMock.mockReset();
  addEquipmentToEditingByDescriptionMock.mockReset();
  removeEditReservationItemMock.mockReset();
  updateEditReservationSummaryMock.mockReset();
  hasEquipmentConflictMock.mockReset();
  hasTechnicianConflictMock.mockReset();
  splitDateTimeMock.mockReset();
  combineDateTimeMock.mockReset();
  addEquipmentByDescriptionMock.mockReset();
  setFlatpickrValueMock.mockReset();
  populateEquipmentDescriptionListsMock.mockReset();

  window.refreshCustomerReservationsViews = undefined;
  window.refreshTechnicianReservationsViews = undefined;
  window.confirm = vi.fn(() => true);
  delete window.bootstrap;
};

const setMockLocation = () => {
  const originalLocation = window.location;
  const mockLocation = {
    href: 'about:blank'
  };
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: mockLocation
  });
  return () => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalLocation
    });
  };
};

describe('reservations/controller module', () => {
  beforeEach(() => {
    resetEnvironment();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
    document.body.className = '';
    document.documentElement.className = '';
    delete window.refreshCustomerReservationsViews;
    delete window.refreshTechnicianReservationsViews;
  });

  it('loadReservationForm loads technicians and refreshes form', async () => {
    loadDataMock.mockReturnValue({ technicians: [{ id: 1 }] });
    const module = await import('../../src/scripts/reservations/controller.js');

    module.loadReservationForm();

    expect(loadDataMock).toHaveBeenCalled();
    expect(reconcileTechnicianSelectionsMock).toHaveBeenCalledWith([{ id: 1 }]);
    expect(refreshCreateReservationFormMock).toHaveBeenCalled();
  });

  it('handleReservationsMutation refreshes views and emits event', async () => {
    const module = await import('../../src/scripts/reservations/controller.js');
    renderReservationsListMock.mockClear();
    const customerRefresh = vi.fn();
    const technicianRefresh = vi.fn();
    window.refreshCustomerReservationsViews = customerRefresh;
    window.refreshTechnicianReservationsViews = technicianRefresh;

    let eventDetail = null;
    document.addEventListener('reservations:changed', (event) => {
      eventDetail = event.detail;
    }, { once: true });

    module.handleReservationsMutation({ id: 7 });

    expect(refreshCreateReservationFormMock).toHaveBeenCalled();
    expect(renderReservationsListMock).toHaveBeenCalled();
    expect(customerRefresh).toHaveBeenCalled();
    expect(technicianRefresh).toHaveBeenCalled();
    expect(eventDetail).toEqual({ id: 7 });
  });

  it('getReservationsEditContext exposes helper functions and modal resolver', async () => {
    const module = await import('../../src/scripts/reservations/controller.js');
    const ctx = module.getReservationsEditContext();

    expect(ctx.populateEquipmentDescriptionLists).toBe(populateEquipmentDescriptionListsMock);
    expect(ctx.setFlatpickrValue).toBe(setFlatpickrValueMock);
    expect(ctx.hasEquipmentConflict).toBe(hasEquipmentConflictMock);
    expect(ctx.renderReservations).toBe(module.renderReservations);

    const modalInstance = {};
    window.bootstrap = {
      Modal: {
        getOrCreateInstance: vi.fn(() => modalInstance)
      }
    };
    const dummyModal = document.createElement('div');
    expect(ctx.ensureModal(dummyModal)).toBe(modalInstance);
    expect(window.bootstrap.Modal.getOrCreateInstance).toHaveBeenCalledWith(dummyModal);
  });

  it('renderReservations delegates to renderReservationsList with callbacks', async () => {
    const module = await import('../../src/scripts/reservations/controller.js');
    module.renderReservations('custom-container', { status: 'pending' });

    expect(renderReservationsListMock).toHaveBeenCalledTimes(1);
    const args = renderReservationsListMock.mock.calls[0][0];
    expect(args.containerId).toBe('custom-container');
    expect(args.filters).toEqual({ status: 'pending' });
    expect(args.onShowDetails).toBe(module.showReservationDetails);
    expect(args.onConfirmReservation).toBe(module.confirmReservation);
  });

  it('showReservationDetails wires edit and delete callbacks', async () => {
    const module = await import('../../src/scripts/reservations/controller.js');
    renderReservationDetailsMock.mockReturnValue('details');

    const result = module.showReservationDetails(4);

    expect(result).toBe('details');
    expect(renderReservationDetailsMock).toHaveBeenCalledTimes(1);
    const [, config] = renderReservationDetailsMock.mock.calls[0];
    expect(config.getEditContext).toBe(module.getReservationsEditContext);
    expect(config.onDelete).toBe(module.deleteReservation);

    const restoreLocation = setMockLocation();
    config.onEdit(9, { reservation: { reservationId: 'EDIT-42' } });
    expect(localStorage.getItem('pendingReservationEditId')).toBe('EDIT-42');
    expect(window.location.href).toBe('dashboard.html#reservations');
    restoreLocation();
  });

  it('deleteReservation aborts when user cancels', async () => {
    window.confirm = vi.fn(() => false);
    tMock.mockReturnValue('confirm?');
    const module = await import('../../src/scripts/reservations/controller.js');

    const result = module.deleteReservation(2);

    expect(window.confirm).toHaveBeenCalledWith('confirm?');
    expect(result).toBe(false);
    expect(deleteReservationActionMock).not.toHaveBeenCalled();
  });

  it('deleteReservation delegates to action when confirmed', async () => {
    window.confirm = vi.fn(() => true);
    deleteReservationActionMock.mockReturnValue('ok');
    const module = await import('../../src/scripts/reservations/controller.js');

    const result = module.deleteReservation(5);

    expect(deleteReservationActionMock).toHaveBeenCalledWith(5, expect.objectContaining({ onAfterChange: module.handleReservationsMutation }));
    expect(result).toBe('ok');
  });

  it('confirmReservation delegates to action with mutation hook', async () => {
    confirmReservationActionMock.mockReturnValue('confirmed');
    const module = await import('../../src/scripts/reservations/controller.js');

    const result = module.confirmReservation(7);

    expect(confirmReservationActionMock).toHaveBeenCalledWith(7, expect.objectContaining({ onAfterChange: module.handleReservationsMutation }));
    expect(result).toBe('confirmed');
  });

  it('openReservationEditor uses inline form when available', async () => {
    document.body.innerHTML = '<form id="reservation-form"></form>';
    const module = await import('../../src/scripts/reservations/controller.js');

    module.openReservationEditor(3);

    expect(editReservationMock).toHaveBeenCalledWith(3, expect.objectContaining({ renderReservations: module.renderReservations }));
    expect(localStorage.getItem('pendingReservationEditId')).toBeNull();
  });

  it('openReservationEditor uses modal when present', async () => {
    document.body.innerHTML = '<div id="editReservationModal"></div>';
    const module = await import('../../src/scripts/reservations/controller.js');

    module.openReservationEditor(11);

    expect(editReservationMock).toHaveBeenCalledWith(11, expect.objectContaining({ renderReservations: module.renderReservations }));
    expect(localStorage.getItem('pendingReservationEditId')).toBeNull();
  });

  it('openReservationEditor stores pending id and redirects when form is missing', async () => {
    const restoreLocation = setMockLocation();
    const module = await import('../../src/scripts/reservations/controller.js');

    module.openReservationEditor(8, { reservationId: 'RSV-9999' });

    expect(localStorage.getItem('pendingReservationEditId')).toBe('RSV-9999');
    expect(window.location.href).toBe('dashboard.html#reservations');
    restoreLocation();
  });

  it('registerReservationGlobals exposes public APIs on window', async () => {
    const module = await import('../../src/scripts/reservations/controller.js');

    module.registerReservationGlobals();

    expect(window.showReservationDetails).toBe(module.showReservationDetails);
    expect(window.deleteReservation).toBe(module.deleteReservation);
    expect(window.confirmReservation).toBe(module.confirmReservation);
    expect(window.editReservation).toBe(module.openReservationEditor);
    expect(window.removeEditReservationItem).toBe(removeEditReservationItemMock);
  });
});
