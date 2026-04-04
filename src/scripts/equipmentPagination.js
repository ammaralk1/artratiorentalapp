export const DEFAULT_EQUIPMENT_PAGE_SIZE = 12;

export function getEquipmentPaginationState({
  totalItems = 0,
  page = 1,
  pageSize = DEFAULT_EQUIPMENT_PAGE_SIZE,
} = {}) {
  const safeTotal = Math.max(0, Number.parseInt(String(totalItems ?? 0), 10) || 0);
  const safePageSize = Math.max(1, Number.parseInt(String(pageSize ?? DEFAULT_EQUIPMENT_PAGE_SIZE), 10) || DEFAULT_EQUIPMENT_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const currentPage = Math.min(Math.max(1, Number.parseInt(String(page ?? 1), 10) || 1), totalPages);
  const startIndex = safeTotal === 0 ? 0 : (currentPage - 1) * safePageSize;
  const endIndex = Math.min(safeTotal, startIndex + safePageSize);
  const rangeStart = safeTotal === 0 ? 0 : startIndex + 1;
  const rangeEnd = safeTotal === 0 ? 0 : endIndex;

  return {
    totalItems: safeTotal,
    pageSize: safePageSize,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    rangeStart,
    rangeEnd,
  };
}

export function buildEquipmentPageNumbers(currentPage, totalPages, windowSize = 5) {
  const safeTotalPages = Math.max(1, Number.parseInt(String(totalPages ?? 1), 10) || 1);
  const safeCurrentPage = Math.min(Math.max(1, Number.parseInt(String(currentPage ?? 1), 10) || 1), safeTotalPages);
  const safeWindow = Math.max(3, Number.parseInt(String(windowSize ?? 5), 10) || 5);
  const halfWindow = Math.floor(safeWindow / 2);

  let start = Math.max(1, safeCurrentPage - halfWindow);
  let end = Math.min(safeTotalPages, start + safeWindow - 1);

  if ((end - start + 1) < safeWindow) {
    start = Math.max(1, end - safeWindow + 1);
  }

  return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index);
}
