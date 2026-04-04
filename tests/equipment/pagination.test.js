import { describe, expect, it } from 'vitest';

import {
  DEFAULT_EQUIPMENT_PAGE_SIZE,
  buildEquipmentPageNumbers,
  getEquipmentPaginationState,
} from '../../src/scripts/equipmentPagination.js';

describe('equipmentPagination helpers', () => {
  it('builds a clamped pagination state with visible range', () => {
    expect(
      getEquipmentPaginationState({ totalItems: 27, page: 3, pageSize: 12 })
    ).toEqual({
      totalItems: 27,
      pageSize: 12,
      totalPages: 3,
      currentPage: 3,
      startIndex: 24,
      endIndex: 27,
      rangeStart: 25,
      rangeEnd: 27,
    });
  });

  it('clamps invalid pages and handles empty results', () => {
    expect(
      getEquipmentPaginationState({ totalItems: 0, page: 99, pageSize: DEFAULT_EQUIPMENT_PAGE_SIZE })
    ).toMatchObject({
      totalItems: 0,
      currentPage: 1,
      totalPages: 1,
      rangeStart: 0,
      rangeEnd: 0,
    });
  });

  it('creates a compact window of page numbers around the current page', () => {
    expect(buildEquipmentPageNumbers(1, 8)).toEqual([1, 2, 3, 4, 5]);
    expect(buildEquipmentPageNumbers(4, 8)).toEqual([2, 3, 4, 5, 6]);
    expect(buildEquipmentPageNumbers(8, 8)).toEqual([4, 5, 6, 7, 8]);
  });
});
