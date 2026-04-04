import { describe, expect, it } from 'vitest';

import {
  DEFAULT_CUSTOMERS_PAGE_SIZE,
  buildCustomersPageNumbers,
  getCustomersPaginationState,
} from '../../src/scripts/customersPagination.js';

describe('customersPagination helpers', () => {
  it('builds a clamped pagination state with visible range', () => {
    expect(
      getCustomersPaginationState({ totalItems: 23, page: 2, pageSize: 10 })
    ).toEqual({
      totalItems: 23,
      pageSize: 10,
      totalPages: 3,
      currentPage: 2,
      startIndex: 10,
      endIndex: 20,
      rangeStart: 11,
      rangeEnd: 20,
    });
  });

  it('falls back to the default customer page size', () => {
    expect(
      getCustomersPaginationState({ totalItems: 11, page: 1, pageSize: DEFAULT_CUSTOMERS_PAGE_SIZE })
    ).toMatchObject({
      pageSize: 10,
      totalPages: 2,
      rangeStart: 1,
      rangeEnd: 10,
    });
  });

  it('creates a compact page window around the current page', () => {
    expect(buildCustomersPageNumbers(1, 7)).toEqual([1, 2, 3, 4, 5]);
    expect(buildCustomersPageNumbers(3, 7)).toEqual([1, 2, 3, 4, 5]);
    expect(buildCustomersPageNumbers(7, 7)).toEqual([3, 4, 5, 6, 7]);
  });
});
