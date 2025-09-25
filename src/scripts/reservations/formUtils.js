import {
  populateEquipmentDescriptionLists as populateCreateEquipmentLists,
  addDraftEquipmentByDescription
} from './createForm.js';
import {
  addEquipmentToEditingByDescription,
  setupEditEquipmentDescriptionInput
} from './editForm.js';

export function addEquipmentByDescription(inputElement, mode = 'create') {
  if (!inputElement) return;
  const rawValue = inputElement.value.trim();
  if (!rawValue) return;

  if (mode === 'create') {
    addDraftEquipmentByDescription(inputElement);
    return;
  }
  addEquipmentToEditingByDescription(inputElement);
}

export function setupEquipmentDescriptionInputs() {
  populateCreateEquipmentLists();
  setupEditEquipmentDescriptionInput();
}

export function setFlatpickrValue(elementId, value) {
  const element = document.getElementById(elementId);
  if (!element) return;

  if (element._flatpickr) {
    if (value) {
      const format = element._flatpickr.config?.dateFormat || 'Y-m-d';
      element._flatpickr.setDate(value, false, format);
    } else {
      element._flatpickr.clear();
    }
    return;
  }

  element.value = value || '';
}

export { populateCreateEquipmentLists as populateEquipmentDescriptionLists };
