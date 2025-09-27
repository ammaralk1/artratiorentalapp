import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const populateCreateEquipmentListsMock = vi.fn();
const addDraftEquipmentByDescriptionMock = vi.fn();
const addEquipmentToEditingByDescriptionMock = vi.fn();
const setupEditEquipmentDescriptionInputMock = vi.fn();

vi.mock('../../src/scripts/reservations/createForm.js', () => ({
  populateEquipmentDescriptionLists: populateCreateEquipmentListsMock,
  addDraftEquipmentByDescription: addDraftEquipmentByDescriptionMock
}));

vi.mock('../../src/scripts/reservations/editForm.js', () => ({
  addEquipmentToEditingByDescription: addEquipmentToEditingByDescriptionMock,
  setupEditEquipmentDescriptionInput: setupEditEquipmentDescriptionInputMock
}));

const resetDom = () => {
  document.body.innerHTML = '';
};

describe('reservations/formUtils module', () => {
  beforeEach(() => {
    vi.resetModules();
    populateCreateEquipmentListsMock.mockClear();
    addDraftEquipmentByDescriptionMock.mockClear();
    addEquipmentToEditingByDescriptionMock.mockClear();
    setupEditEquipmentDescriptionInputMock.mockClear();
    resetDom();
  });

  afterEach(() => {
    resetDom();
  });

  it('addEquipmentByDescription ignores empty input and delegates based on mode', async () => {
    const module = await import('../../src/scripts/reservations/formUtils.js');

    module.addEquipmentByDescription(null);
    module.addEquipmentByDescription({ value: '   ' });
    expect(addDraftEquipmentByDescriptionMock).not.toHaveBeenCalled();
    expect(addEquipmentToEditingByDescriptionMock).not.toHaveBeenCalled();

    const createInput = { value: ' Sony Camera ' };
    module.addEquipmentByDescription(createInput, 'create');
    expect(addDraftEquipmentByDescriptionMock).toHaveBeenCalledWith(createInput);
    expect(addEquipmentToEditingByDescriptionMock).not.toHaveBeenCalled();

    const editInput = { value: ' Lens ' };
    module.addEquipmentByDescription(editInput, 'edit');
    expect(addEquipmentToEditingByDescriptionMock).toHaveBeenCalledWith(editInput);
  });

  it('setupEquipmentDescriptionInputs populates create and edit lists', async () => {
    const module = await import('../../src/scripts/reservations/formUtils.js');

    module.setupEquipmentDescriptionInputs();

    expect(populateCreateEquipmentListsMock).toHaveBeenCalled();
    expect(setupEditEquipmentDescriptionInputMock).toHaveBeenCalled();
  });

  it('setFlatpickrValue uses flatpickr API when available', async () => {
    const module = await import('../../src/scripts/reservations/formUtils.js');
    const input = document.createElement('input');
    input.id = 'date-input';
    document.body.appendChild(input);

    input._flatpickr = {
      config: { dateFormat: 'd/m/Y' },
      setDate: vi.fn(),
      clear: vi.fn()
    };

    module.setFlatpickrValue('date-input', '2025-01-10');
    expect(input._flatpickr.setDate).toHaveBeenCalledWith('2025-01-10', false, 'd/m/Y');
    expect(input._flatpickr.clear).not.toHaveBeenCalled();

    module.setFlatpickrValue('date-input', '');
    expect(input._flatpickr.clear).toHaveBeenCalled();
  });

  it('setFlatpickrValue falls back to default format and direct assignment', async () => {
    const module = await import('../../src/scripts/reservations/formUtils.js');
    const flatpickrInput = document.createElement('input');
    flatpickrInput.id = 'with-default';
    document.body.appendChild(flatpickrInput);

    flatpickrInput._flatpickr = {
      config: {},
      setDate: vi.fn(),
      clear: vi.fn()
    };

    module.setFlatpickrValue('with-default', '2025-02-20');
    expect(flatpickrInput._flatpickr.setDate).toHaveBeenCalledWith('2025-02-20', false, 'Y-m-d');

    const plainInput = document.createElement('input');
    plainInput.id = 'plain';
    document.body.appendChild(plainInput);

    module.setFlatpickrValue('plain', '2025-03-15');
    expect(plainInput.value).toBe('2025-03-15');

    module.setFlatpickrValue('plain', null);
    expect(plainInput.value).toBe('');
  });
});
