import { loadData, saveData } from '../storage.js';
import { DEFAULT_EQUIPMENT_PAGE_SIZE } from '../equipmentPagination.js';

const _raw = loadData()?.equipment ?? [];

export const state = {
  /** @type {any[]} */
  equipmentList: _raw,   // mapped to internal format by the entry point on load
  isLoading: false,
  errorMessage: '',
  /** @type {{ groupKey: string, barcode: string, id: string|null }|null} */
  currentVariantsContext: null,
  /** @type {number|null} */
  activeEquipmentIndex: null,
  /** @type {Record<string,string>|null} */
  currentEquipmentSnapshot: null,
  isEditMode: false,
  selectionChangeListenerAttached: false,
  pagination: { page: 1, pageSize: DEFAULT_EQUIPMENT_PAGE_SIZE },
  lastFilterSignature: '',
};

export function getAllEquipment() {
  return state.equipmentList;
}

export function setEquipment(list) {
  state.equipmentList = Array.isArray(list) ? list : [];
  saveData({ equipment: state.equipmentList });
  emitEquipmentChanged();
}

export function emitEquipmentChanged() {
  document.dispatchEvent(new CustomEvent('equipment:changed'));
}

export function resetEquipmentPagination() {
  state.pagination.page = 1;
}
