import { describe, expect, it } from 'vitest';

import {
  buildTemplateExportDocument,
  buildTemplateExportFilename,
  createTemplateExportBlob,
  findDraftTemplate,
  resolveImportedTemplateRequest,
} from '../../../src/scripts/projects/templatesTab/io.ts';

describe('templatesTab/io', () => {
  it('prefers autosave or draft entries when resolving the last draft', () => {
    expect(findDraftTemplate([
      { id: 1, title: 'Normal saved version' },
      { id: 2, title: 'Autosave - callsheet' },
      { id: 3, title: 'Another' },
    ])).toEqual({ id: 2, title: 'Autosave - callsheet' });

    expect(findDraftTemplate([
      { id: 4, title: 'مسودة نهائية' },
      { id: 5, title: 'Regular' },
    ])).toEqual({ id: 4, title: 'مسودة نهائية' });
  });

  it('builds an export document and filename from a saved template item', () => {
    const item = {
      id: 12,
      title: 'Call Sheet: Final / V1',
      type: 'callsheet',
      project_id: 7,
      data: JSON.stringify({ html: '<div>snapshot</div>' }),
    };

    expect(buildTemplateExportDocument(item)).toEqual({
      meta: { id: 12, title: 'Call Sheet: Final / V1', type: 'callsheet', project_id: 7 },
      data: { html: '<div>snapshot</div>' },
    });

    expect(buildTemplateExportFilename(item, 12)).toBe('Call Sheet Final  V1.json');

    const blob = createTemplateExportBlob(item);
    expect(blob.type).toBe('application/json');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('builds the import request from imported JSON html or the current preview fallback', () => {
    expect(resolveImportedTemplateRequest({
      json: { meta: { title: 'Imported callsheet', type: 'callsheet' }, data: { html: '<div>remote</div>' } },
      project: { id: 9 },
      type: 'callsheet',
      reservationId: 55,
      fallbackHtml: '<div>fallback</div>',
    })).toEqual({
      project_id: 9,
      reservation_id: 55,
      type: 'callsheet',
      title: 'Imported callsheet',
      data: { html: '<div>remote</div>' },
    });

    expect(resolveImportedTemplateRequest({
      json: { meta: {} },
      project: { id: 10 },
      type: 'expenses',
      reservationId: null,
      fallbackHtml: '<div>fallback</div>',
    })).toEqual({
      project_id: 10,
      reservation_id: null,
      type: 'expenses',
      title: 'Imported - expenses',
      data: { html: '<div>fallback</div>' },
    });
  });
});
