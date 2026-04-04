import {
  buildEquipmentPageNumbers,
  getEquipmentPaginationState,
} from './equipmentPagination.js';

export const DEFAULT_CUSTOMERS_PAGE_SIZE = 10;

export function getCustomersPaginationState({
  totalItems = 0,
  page = 1,
  pageSize = DEFAULT_CUSTOMERS_PAGE_SIZE,
} = {}) {
  return getEquipmentPaginationState({ totalItems, page, pageSize });
}

export function buildCustomersPageNumbers(currentPage, totalPages, windowSize = 5) {
  return buildEquipmentPageNumbers(currentPage, totalPages, windowSize);
}
