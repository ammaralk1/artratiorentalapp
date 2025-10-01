import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const loadDataMock = vi.fn();
const tMock = vi.fn();
const showToastMock = vi.fn();
const normalizeNumbersMock = vi.fn();
const resolveItemImageMock = vi.fn();
const findEquipmentByBarcodeMock = vi.fn();
const isEquipmentInMaintenanceMock = vi.fn();
const renderEditSummaryMock = vi.fn();
const editReservationMock = vi.fn();
const setupEditReservationModalEventsMock = vi.fn();
const getEditingStateMock = vi.fn();
const setEditingStateMock = vi.fn();
const clearEditingStateMock = vi.fn();
const saveReservationChangesMock = vi.fn();
const normalizeBarcodeValueMock = vi.fn();
const combineDateTimeMock = vi.fn();
const hasEquipmentConflictMock = vi.fn();
const hasTechnicianConflictMock = vi.fn();
const findEquipmentByDescriptionMock = vi.fn();

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock }));
vi.mock('../../src/scripts/utils.js', () => ({
  showToast: showToastMock,
  normalizeNumbers: normalizeNumbersMock
}));
vi.mock('../../src/scripts/reservationsEquipment.js', () => ({
  resolveItemImage: resolveItemImageMock,
  findEquipmentByBarcode: findEquipmentByBarcodeMock,
  isEquipmentInMaintenance: isEquipmentInMaintenanceMock
}));
vi.mock('../../src/scripts/reservationsSummary.js', () => ({
  renderEditSummary: renderEditSummaryMock
}));
vi.mock('../../src/scripts/reservationsEdit.js', () => ({
  editReservation: editReservationMock,
  setupEditReservationModalEvents: setupEditReservationModalEventsMock,
  getEditingState: getEditingStateMock,
  setEditingState: setEditingStateMock,
  clearEditingState: clearEditingStateMock,
  saveReservationChanges: saveReservationChangesMock
}));
vi.mock('../../src/scripts/reservations/list/index.js', () => ({}));
vi.mock('../../src/scripts/reservations/state.js', () => ({
  normalizeBarcodeValue: normalizeBarcodeValueMock,
  combineDateTime: combineDateTimeMock,
  hasEquipmentConflict: hasEquipmentConflictMock,
  hasTechnicianConflict: hasTechnicianConflictMock,
  splitDateTime: vi.fn()
}));
vi.mock('../../src/scripts/reservations/createForm.js', () => ({
  findEquipmentByDescription: findEquipmentByDescriptionMock,
  populateEquipmentDescriptionLists: vi.fn()
}));
vi.mock('../../src/scripts/reservations/controller.js', () => ({
  renderReservations: vi.fn(),
  handleReservationsMutation: vi.fn(),
  getBootstrapModalInstance: vi.fn(),
  populateEquipmentDescriptionLists: vi.fn(),
  setFlatpickrValue: vi.fn()
}), { virtual: true });

const resetDom = () => {
  document.body.innerHTML = '';
  document.documentElement.innerHTML = '<body></body>';
};

describe('reservations/editForm module', () => {
  beforeEach(() => {
    vi.resetModules();
    resetDom();
    loadDataMock.mockReset();
    tMock.mockReset();
    showToastMock.mockReset();
    normalizeNumbersMock.mockReset().mockImplementation((value) => String(value));
    resolveItemImageMock.mockReset().mockReturnValue('img.png');
    findEquipmentByBarcodeMock.mockReset();
    isEquipmentInMaintenanceMock.mockReset().mockReturnValue(false);
    renderEditSummaryMock.mockReset().mockReturnValue('<div>summary</div>');
    getEditingStateMock.mockReset().mockReturnValue({ index: 0, items: [] });
    setEditingStateMock.mockReset();
    normalizeBarcodeValueMock.mockReset().mockImplementation((value) => String(value || '').trim().toUpperCase());
    combineDateTimeMock.mockReset().mockImplementation((date, time) => `${date}T${time}`);
    hasEquipmentConflictMock.mockReset().mockReturnValue(false);
    findEquipmentByDescriptionMock.mockReset();
    tMock.mockImplementation((key, fallback) => fallback ?? key);
    loadDataMock.mockReturnValue({ reservations: [], technicians: [] });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getEditReservationDateRange combines inputs', async () => {
    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-01-02';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-01-05';
    const startTime = document.createElement('input');
    startTime.id = 'edit-res-start-time';
    startTime.value = '09:30';
    const endTime = document.createElement('input');
    endTime.id = 'edit-res-end-time';
    endTime.value = '18:15';
    document.body.append(start, end, startTime, endTime);

    const module = await import('../../src/scripts/reservations/editForm.js');
    const range = module.getEditReservationDateRange();
    expect(range).toEqual({ start: '2024-01-02T09:30', end: '2024-01-05T18:15' });

    start.value = '';
    const fallback = module.getEditReservationDateRange();
    expect(fallback).toEqual({ start: null, end: null });
  });

  it('renderEditReservationItems renders rows and empty state', async () => {
    const container = document.createElement('tbody');
   container.id = 'edit-res-items';
   document.body.appendChild(container);
    const module = await import('../../src/scripts/reservations/editForm.js');

    module.renderEditReservationItems([]);
    expect(container.innerHTML).toContain('لا توجد معدات');

    module.renderEditReservationItems([
      { barcode: 'B1', desc: 'Camera', price: 120, qty: 2, image: 'local.png' }
    ]);
    expect(container.innerHTML).toContain('Camera');
    expect(container.innerHTML).toContain('🗑️');
  });

  it('renderEditReservationItems binds remove buttons to handler', async () => {
    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.appendChild(container);
    const module = await import('../../src/scripts/reservations/editForm.js');

    getEditingStateMock.mockReturnValue({ index: 1, items: [{ barcode: 'B1', desc: 'Camera' }, { barcode: 'B2', desc: 'Light' }] });
    setEditingStateMock.mockClear();

    module.renderEditReservationItems([{ barcode: 'B1', desc: 'Camera', price: 120, qty: 2 }]);

    const button = container.querySelector('[data-action="remove-edit-item"]');
    expect(button).toBeTruthy();

    button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

    expect(setEditingStateMock).toHaveBeenCalled();
    expect(setEditingStateMock.mock.calls[0][0]).toBe(1);
  });

  it('updateEditReservationSummary normalizes discount and renders summary', async () => {
    const summary = document.createElement('div');
    summary.id = 'edit-res-summary';
    const discount = document.createElement('input');
    discount.id = 'edit-res-discount';
    discount.value = '10';
    const discountType = document.createElement('select');
    discountType.id = 'edit-res-discount-type';
    const discountOption = document.createElement('option');
    discountOption.value = 'amount';
    discountOption.selected = true;
    discountType.appendChild(discountOption);
    const paidSelect = document.createElement('select');
    paidSelect.id = 'edit-res-paid';
    const paidOption = document.createElement('option');
    paidOption.value = 'unpaid';
    paidOption.selected = true;
    paidSelect.appendChild(paidOption);
    const taxCheckbox = document.createElement('input');
    taxCheckbox.type = 'checkbox';
    taxCheckbox.id = 'edit-res-tax';
    taxCheckbox.checked = true;
    const projectSelect = document.createElement('input');
    projectSelect.id = 'edit-res-project';
    projectSelect.value = '';
    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-02-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-02-03';
    document.body.append(summary, discount, discountType, paidSelect, taxCheckbox, projectSelect, start, end);
    const module = await import('../../src/scripts/reservations/editForm.js');

    getEditingStateMock.mockReturnValue({ items: [{ price: 50, qty: 1 }] });
    module.updateEditReservationSummary();

    expect(renderEditSummaryMock).toHaveBeenCalledWith(expect.objectContaining({
      discount: 10,
      discountType: 'amount',
      applyTax: true,
      paidStatus: 'unpaid',
      start: '2024-02-01T00:00',
      end: '2024-02-03T00:00'
    }));
    expect(summary.innerHTML).toBe('<div>summary</div>');
    expect(paidSelect.dataset.listenerAttached).toBe('true');
  });

  it('removeEditReservationItem updates state and re-renders', async () => {
    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.appendChild(container);
    const module = await import('../../src/scripts/reservations/editForm.js');
    getEditingStateMock.mockReturnValue({ index: 0, items: [{ barcode: 'A', desc: 'ItemA' }, { barcode: 'B', desc: 'ItemB' }] });

    module.removeEditReservationItem(0);

    expect(setEditingStateMock).toHaveBeenCalledWith(0, [{ barcode: 'B', desc: 'ItemB' }]);
    expect(container.innerHTML).toContain('ItemB');
    expect(container.innerHTML).not.toContain('ItemA');
  });

  it('addEquipmentToEditingReservation adds equipment and clears input', async () => {
    const barcodeInput = { value: ' b1 ' };
    findEquipmentByBarcodeMock.mockReturnValue({ id: 10, barcode: 'B1', desc: 'Tripod', price: 75 });
    loadDataMock.mockReturnValue({ reservations: [{ id: 'R1' }] });
    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-03-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-03-02';
    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.append(start, end, container);

    const module = await import('../../src/scripts/reservations/editForm.js');

    module.addEquipmentToEditingReservation(barcodeInput);

    expect(findEquipmentByBarcodeMock).toHaveBeenCalledWith('B1');
    expect(setEditingStateMock).toHaveBeenCalledWith(0, expect.arrayContaining([expect.objectContaining({ desc: 'Tripod', qty: 1 })]));
    expect(barcodeInput.value).toBe('');
    expect(container.innerHTML).toContain('Tripod');
  });

  it('addEquipmentToEditingReservation shows toast when conflicts occur', async () => {
    const barcodeInput = { value: 'dup' };
    findEquipmentByBarcodeMock.mockReturnValue({ id: 2, barcode: 'dup', desc: 'Light' });
    loadDataMock.mockReturnValue({ reservations: [{ id: 'R1' }] });
    getEditingStateMock.mockReturnValue({ index: 0, items: [{ barcode: 'DUP' }] });

    const module = await import('../../src/scripts/reservations/editForm.js');
    module.addEquipmentToEditingReservation(barcodeInput);
    expect(showToastMock).toHaveBeenCalled();
  });

  it('addEquipmentToEditingByDescription adds equipment when available', async () => {
    const input = { value: 'Camera' };
    findEquipmentByDescriptionMock.mockReturnValue({ id: 9, barcode: 'C9', desc: 'Camera', price: 120 });
    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-04-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-04-02';
    document.body.append(start, end);

    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.appendChild(container);
    const module = await import('../../src/scripts/reservations/editForm.js');

    module.addEquipmentToEditingByDescription(input);

    expect(setEditingStateMock).toHaveBeenCalledWith(0, expect.arrayContaining([expect.objectContaining({ barcode: 'C9' })]));
    expect(input.value).toBe('');
    expect(container.innerHTML).toContain('Camera');
  });

  it('setupEditEquipmentDescriptionInput attaches key handler once', async () => {
    const input = document.createElement('input');
    input.id = 'edit-res-equipment-description';
    input.value = 'Lens';
    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-05-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-05-02';
    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.append(input, start, end, container);

    let storedHandler;
    const originalAddEventListener = input.addEventListener.bind(input);
    input.addEventListener = vi.fn((type, handler, options) => {
      originalAddEventListener(type, handler, options);
      if (type === 'keydown') {
        storedHandler = handler;
      }
    });

    findEquipmentByDescriptionMock.mockReturnValue({ id: 5, barcode: 'L1', desc: 'Lens', price: 90 });

    const module = await import('../../src/scripts/reservations/editForm.js');

    module.setupEditEquipmentDescriptionInput();
    expect(typeof storedHandler).toBe('function');
    storedHandler({ key: 'Enter', preventDefault: vi.fn() });
    expect(setEditingStateMock).toHaveBeenCalledTimes(1);

    module.setupEditEquipmentDescriptionInput();
    expect(input.addEventListener).toHaveBeenCalledTimes(1);
    storedHandler({ key: 'Enter', preventDefault: vi.fn() });
    expect(setEditingStateMock).toHaveBeenCalledTimes(1);
  });
});
