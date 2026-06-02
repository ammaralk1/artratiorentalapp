import { describe, expect, it } from 'vitest';
import { buildProjectsPageWindow } from '../../src/scripts/projects/helpers.js';

describe('buildProjectsPageWindow', () => {
  it('returns all pages when total pages are three or fewer', () => {
    expect(buildProjectsPageWindow(1, 1)).toEqual([1]);
    expect(buildProjectsPageWindow(1, 2)).toEqual([1, 2]);
    expect(buildProjectsPageWindow(2, 3)).toEqual([1, 2, 3]);
  });

  it('shows current page, next page, and last page for larger datasets', () => {
    expect(buildProjectsPageWindow(1, 65)).toEqual([1, 2, 65]);
    expect(buildProjectsPageWindow(2, 65)).toEqual([2, 3, 65]);
    expect(buildProjectsPageWindow(3, 65)).toEqual([3, 4, 65]);
  });

  it('collapses cleanly near the end of the list', () => {
    expect(buildProjectsPageWindow(64, 65)).toEqual([64, 65]);
    expect(buildProjectsPageWindow(65, 65)).toEqual([64, 65]);
  });
});
