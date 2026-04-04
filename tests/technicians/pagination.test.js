import { describe, expect, it } from 'vitest';

import {
  DEFAULT_TECHNICIANS_PAGE_SIZE,
  buildTechniciansPageNumbers,
  getTechniciansPaginationState,
} from '../../src/scripts/techniciansPagination.js';

describe('techniciansPagination helpers', () => {
  it('builds a clamped pagination state with visible range', () => {
    expect(
      getTechniciansPaginationState({ totalItems: 24, page: 2, pageSize: 10 })
    ).toEqual({
      totalItems: 24,
      pageSize: 10,
      totalPages: 3,
      currentPage: 2,
      startIndex: 10,
      endIndex: 20,
      rangeStart: 11,
      rangeEnd: 20,
    });
  });

  it('falls back to the default technician page size', () => {
    expect(
      getTechniciansPaginationState({ totalItems: 11, page: 1, pageSize: DEFAULT_TECHNICIANS_PAGE_SIZE })
    ).toMatchObject({
      pageSize: 10,
      totalPages: 2,
      rangeStart: 1,
      rangeEnd: 10,
    });
  });

  it('creates a compact page window around the current page', () => {
    expect(buildTechniciansPageNumbers(1, 7)).toEqual([1, 2, 3, 4, 5]);
    expect(buildTechniciansPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5]);
    expect(buildTechniciansPageNumbers(7, 7)).toEqual([3, 4, 5, 6, 7]);
  });
});
