import {
  buildEquipmentPageNumbers,
  getEquipmentPaginationState,
} from './equipmentPagination.js';

export const DEFAULT_TECHNICIANS_PAGE_SIZE = 10;

export function getTechniciansPaginationState({
  totalItems = 0,
  page = 1,
  pageSize = DEFAULT_TECHNICIANS_PAGE_SIZE,
} = {}) {
  return getEquipmentPaginationState({ totalItems, page, pageSize });
}

export function buildTechniciansPageNumbers(currentPage, totalPages, windowSize = 5) {
  return buildEquipmentPageNumbers(currentPage, totalPages, windowSize);
}
