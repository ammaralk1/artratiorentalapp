import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  fetchSavedTemplatesForProject,
  getTemplateTypeVariants,
  normalizeSavedTemplatesResponse,
  populateSavedTemplatesSelect,
  saveTemplateSnapshotRequest,
} from '../../../src/scripts/projects/templatesTab/saved-templates.ts';

describe('templatesTab/saved-templates', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  it('normalizes supported saved-template response shapes', () => {
    expect(normalizeSavedTemplatesResponse({ data: [{ id: 1 }] })).toEqual([{ id: 1 }]);
    expect(normalizeSavedTemplatesResponse([{ id: 2 }])).toEqual([{ id: 2 }]);
    expect(normalizeSavedTemplatesResponse({ items: [{ id: 3 }] })).toEqual([{ id: 3 }]);
    expect(normalizeSavedTemplatesResponse({})).toEqual([]);
  });

  it('expands callsheet type into legacy compatibility variants', () => {
    expect(getTemplateTypeVariants('callsheet')).toEqual([
      'callsheet',
      'call-sheet',
      'callsheet_v1',
      'callsheetv1',
      'callsheet-v1',
    ]);
    expect(getTemplateTypeVariants('expenses')).toEqual(['expenses']);
  });

  it('fetches saved templates for a project and de-duplicates ids across type variants', async () => {
    const apiRequestFn = vi.fn(async (url) => {
      if (String(url).includes('type=callsheet')) {
        return { data: [{ id: 1, title: 'A' }] };
      }
      if (String(url).includes('type=call-sheet')) {
        return { data: [{ id: 1, title: 'A' }, { id: 2, title: 'B' }] };
      }
      return { data: [] };
    });

    const items = await fetchSavedTemplatesForProject({
      apiRequestFn,
      projectId: 9,
      type: 'callsheet',
    });

    expect(items).toEqual([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' },
    ]);
  });

  it('populates the saved-template select while preserving the previous selection', () => {
    const select = document.createElement('select');
    select.innerHTML = `
      <option value="">— محفوظات —</option>
      <option value="2" selected>Old</option>
    `;

    populateSavedTemplatesSelect(select, [{ id: 2, title: 'New title' }, { id: 3, title: 'Third' }]);

    expect(select.value).toBe('2');
    expect(select.options).toHaveLength(3);
    expect(select.options[1].textContent).toBe('New title');
  });

  it('sends the expected payload when saving a template snapshot', async () => {
    const apiRequestFn = vi.fn(async () => ({}));
    const clearLocalAutosave = vi.fn();

    await saveTemplateSnapshotRequest({
      apiRequestFn,
      project: { id: 7, title: 'Proj' },
      type: 'callsheet',
      reservationId: 99,
      rootHtml: '<div>snapshot</div>',
      customTitle: '',
      sanitizedHtml: '<div>snapshot</div>',
      contextKey: 'templates.callsheet.autosave.7.callsheet.99',
      clearLocalAutosave,
    });

    expect(apiRequestFn).toHaveBeenCalledWith('/project-templates/', {
      method: 'POST',
      body: {
        project_id: 7,
        reservation_id: 99,
        type: 'callsheet',
        title: 'Proj - callsheet',
        data: { html: '<div>snapshot</div>' },
      },
    });
    expect(clearLocalAutosave).toHaveBeenCalledWith('templates.callsheet.autosave.7.callsheet.99');
  });
});
