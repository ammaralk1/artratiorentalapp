import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const loadDataMock = vi.fn();
const tMock = vi.fn();
const showToastMock = vi.fn();
const normalizeNumbersMock = vi.fn();
const resolveItemImageMock = vi.fn();
const findEquipmentByBarcodeMock = vi.fn();
const getEquipmentAvailabilityStatusMock = vi.fn();
const isEquipmentAvailableMock = vi.fn();
const isEquipmentUnavailableMock = vi.fn();
const renderEditSummaryMock = vi.fn();
const editReservationMock = vi.fn();
const setupEditReservationModalEventsMock = vi.fn();
const getEditingStateMock = vi.fn();
const setEditingStateMock = vi.fn();
const clearEditingStateMock = vi.fn();
const saveReservationChangesMock = vi.fn();
const getEditingPaymentsMock = vi.fn(() => []);
const setEditingPaymentsMock = vi.fn();
const addEditingPaymentMock = vi.fn();
const removeEditingPaymentMock = vi.fn();
const getEditPaymentProgressTypeMock = vi.fn(() => 'amount');
const parseEditPaymentProgressValueMock = vi.fn(() => 100);
const normalizeBarcodeValueMock = vi.fn();
const combineDateTimeMock = vi.fn();
const hasEquipmentConflictMock = vi.fn();
const hasTechnicianConflictMock = vi.fn();
const findEquipmentByDescriptionMock = vi.fn();
const updatePaymentStatusAppearanceMock = vi.fn();
const ensureCustomerChoicesMock = vi.fn();
const ensureProjectChoicesMock = vi.fn();
const ensureCompanyShareEnabledMock = vi.fn();
const getCompanySharePercentMock = vi.fn(() => 0);

vi.mock('../../src/scripts/storage.js', () => ({ loadData: loadDataMock }));
vi.mock('../../src/scripts/language.js', () => ({ t: tMock }));
vi.mock('../../src/scripts/utils.js', () => ({
  showToast: showToastMock,
  normalizeNumbers: normalizeNumbersMock,
  formatDateTime: vi.fn(() => '2024-01-01 12:00')
}));
vi.mock('../../src/scripts/reservationsEquipment.js', () => ({
  resolveItemImage: resolveItemImageMock,
  findEquipmentByBarcode: findEquipmentByBarcodeMock,
  getEquipmentAvailabilityStatus: getEquipmentAvailabilityStatusMock,
  isEquipmentAvailable: isEquipmentAvailableMock,
  isEquipmentUnavailable: isEquipmentUnavailableMock
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
  saveReservationChanges: saveReservationChangesMock,
  getEditingPayments: getEditingPaymentsMock,
  setEditingPayments: setEditingPaymentsMock,
  addEditingPayment: addEditingPaymentMock,
  removeEditingPayment: removeEditingPaymentMock,
  getEditPaymentProgressType: getEditPaymentProgressTypeMock,
  parseEditPaymentProgressValue: parseEditPaymentProgressValueMock
}));
vi.mock('../../src/scripts/reservations/list/index.js', () => ({}));
vi.mock('../../src/scripts/reservations/state.js', () => ({
  normalizeBarcodeValue: normalizeBarcodeValueMock,
  combineDateTime: combineDateTimeMock,
  hasEquipmentConflict: hasEquipmentConflictMock,
  hasTechnicianConflict: hasTechnicianConflictMock,
  splitDateTime: vi.fn()
}));
const getEquipmentUnavailableMessageMock = vi.fn((status) => `غير متاح (${status})`);

vi.mock('../../src/scripts/reservations/createForm.js', () => ({
  findEquipmentByDescription: findEquipmentByDescriptionMock,
  populateEquipmentDescriptionLists: vi.fn(),
  updatePaymentStatusAppearance: updatePaymentStatusAppearanceMock,
  ensureCustomerChoices: ensureCustomerChoicesMock,
  ensureProjectChoices: ensureProjectChoicesMock,
  ensureCompanyShareEnabled: ensureCompanyShareEnabledMock,
  getCompanySharePercent: getCompanySharePercentMock,
  getEquipmentUnavailableMessage: getEquipmentUnavailableMessageMock
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
    getEquipmentAvailabilityStatusMock.mockReset().mockReturnValue('available');
    isEquipmentAvailableMock.mockReset().mockReturnValue(true);
    isEquipmentUnavailableMock.mockReset().mockReturnValue(false);
    renderEditSummaryMock.mockReset().mockReturnValue('<div>summary</div>');
    getEditingStateMock.mockReset().mockReturnValue({ index: 0, items: [] });
    setEditingStateMock.mockReset();
    getEditingPaymentsMock.mockReset().mockReturnValue([]);
    setEditingPaymentsMock.mockReset();
    addEditingPaymentMock.mockReset();
    removeEditingPaymentMock.mockReset();
    getEditPaymentProgressTypeMock.mockReset().mockReturnValue('amount');
    parseEditPaymentProgressValueMock.mockReset().mockReturnValue(100);
    normalizeBarcodeValueMock.mockReset().mockImplementation((value) => String(value || '').trim().toUpperCase());
    combineDateTimeMock.mockReset().mockImplementation((date, time) => `${date}T${time}`);
    hasEquipmentConflictMock.mockReset().mockReturnValue(false);
    findEquipmentByDescriptionMock.mockReset();
    updatePaymentStatusAppearanceMock.mockReset();
    ensureCustomerChoicesMock.mockReset();
    ensureProjectChoicesMock.mockReset();
    ensureCompanyShareEnabledMock.mockReset();
    getCompanySharePercentMock.mockReset().mockReturnValue(0);
    getEquipmentUnavailableMessageMock.mockReset().mockImplementation((status) => `غير متاح (${status})`);
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
      { barcode: 'B1', desc: 'Camera', price: 120, image: 'local.png' },
      { barcode: 'B2', desc: 'Camera', price: 120, image: 'local.png' }
    ]);
    expect(container.querySelector('.reservation-item-title')?.textContent).toContain('Camera');
    expect(container.querySelector('[data-action="increase-edit-group"]')).toBeTruthy();
  });

  it('handleAddPaymentHistoryEntry registers payments when value is valid', async () => {
    const typeSelect = document.createElement('select');
    typeSelect.id = 'edit-res-payment-progress-type';
    typeSelect.innerHTML = '<option value="amount" selected>Amount</option>';

    const valueInput = document.createElement('input');
    valueInput.id = 'edit-res-payment-progress-value';

    const addButton = document.createElement('button');
    addButton.id = 'edit-res-payment-add';
    addButton.type = 'button';

    const historyContainer = document.createElement('div');
    historyContainer.id = 'edit-res-payment-history';

    const summaryContainer = document.createElement('div');
    summaryContainer.id = 'edit-res-summary';

    document.body.append(typeSelect, valueInput, addButton, historyContainer, summaryContainer);

    const paymentSnapshot = [{
      type: 'amount',
      amount: 150,
      percentage: 10,
      recordedAt: '2024-01-01T00:00:00.000Z'
    }];
    getEditingPaymentsMock.mockReturnValue(paymentSnapshot);
    parseEditPaymentProgressValueMock.mockReturnValue(150);

    renderEditSummaryMock.mockImplementation(() => {
      renderEditSummaryMock.lastResult = {
        total: 1500,
        paymentStatus: 'partial',
        paymentProgressType: 'amount',
        paymentProgressValue: 150,
        paidAmount: 150,
        paidPercent: 10
      };
      return '<div>summary</div>';
    });

    const module = await import('../../src/scripts/reservations/editForm.js');

    module.updateEditReservationSummary();

    valueInput.value = '150';
    addButton.click();

    expect(getEditPaymentProgressTypeMock).toHaveBeenCalled();
    expect(parseEditPaymentProgressValueMock).toHaveBeenCalled();
    expect(addEditingPaymentMock).toHaveBeenCalledWith(expect.objectContaining({ type: 'amount', amount: 150 }));
    expect(setEditingPaymentsMock).toHaveBeenCalledWith(paymentSnapshot);
    expect(showToastMock).toHaveBeenCalledWith('✅ تم تسجيل الدفعة');
  });

  it('renderEditReservationItems binds remove buttons to handler', async () => {
    const container = document.createElement('tbody');
    container.id = 'edit-res-items';
    document.body.appendChild(container);
    const module = await import('../../src/scripts/reservations/editForm.js');

    getEditingStateMock.mockReturnValue({
      index: 1,
      items: [
        { barcode: 'B1', desc: 'Camera', price: 120 },
        { barcode: 'B2', desc: 'Camera', price: 120 }
      ]
    });
    setEditingStateMock.mockClear();

    module.renderEditReservationItems([
      { barcode: 'B1', desc: 'Camera', price: 120 },
      { barcode: 'B2', desc: 'Camera', price: 120 }
    ]);

    const button = container.querySelector('[data-action="remove-edit-group"]');
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
    expect(updatePaymentStatusAppearanceMock).toHaveBeenCalled();
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

  it('addEquipmentToEditingReservation prevents unavailable items', async () => {
    const barcodeInput = { value: 'b1' };
    findEquipmentByBarcodeMock.mockReturnValue({ id: 1, barcode: 'B1', desc: 'Cam' });
    getEquipmentAvailabilityStatusMock.mockReturnValueOnce('maintenance');

    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-06-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-06-02';
    document.body.append(start, end);

    const module = await import('../../src/scripts/reservations/editForm.js');
    module.addEquipmentToEditingReservation(barcodeInput);

    expect(getEquipmentUnavailableMessageMock).toHaveBeenCalledWith('maintenance');
    expect(showToastMock).toHaveBeenCalledWith('غير متاح (maintenance)');
    expect(setEditingStateMock).not.toHaveBeenCalled();
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

  it('addEquipmentToEditingByDescription blocks reserved equipment via conflict check', async () => {
    const input = { value: 'Lens' };
    findEquipmentByDescriptionMock.mockReturnValue({ id: 3, barcode: 'L3', desc: 'Lens', price: 50 });
    getEquipmentAvailabilityStatusMock.mockReturnValueOnce('reserved');
    hasEquipmentConflictMock.mockReturnValueOnce(true);

    const start = document.createElement('input');
    start.id = 'edit-res-start';
    start.value = '2024-07-01';
    const end = document.createElement('input');
    end.id = 'edit-res-end';
    end.value = '2024-07-02';
    document.body.append(start, end);

    const module = await import('../../src/scripts/reservations/editForm.js');

    module.addEquipmentToEditingByDescription(input);

    expect(getEquipmentUnavailableMessageMock).not.toHaveBeenCalled();
    expect(showToastMock).toHaveBeenCalledWith('⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية');
    expect(setEditingStateMock).not.toHaveBeenCalled();
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
    expect(input.addEventListener).toHaveBeenCalledTimes(4);
    storedHandler({ key: 'Enter', preventDefault: vi.fn() });
    expect(setEditingStateMock).toHaveBeenCalledTimes(1);
  });
});
