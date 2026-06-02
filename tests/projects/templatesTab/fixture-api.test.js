import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createProjectTemplatesFixtureApi,
  resetProjectTemplatesFixtureStore,
} from '../../../src/scripts/projects/templatesTab/fixture-api.ts';

describe('templatesTab/fixture-api', () => {
  beforeEach(() => {
    localStorage.clear();
    resetProjectTemplatesFixtureStore();
    window.history.replaceState({}, '', '/src/pages/projects.html?bypassAuth=1&fixture=dashboard');
  });

  it('creates, lists, updates, fetches, and deletes fixture-saved templates locally', async () => {
    const fallback = vi.fn(async () => ({ ok: true }));
    const api = createProjectTemplatesFixtureApi(fallback);

    const created = await api('/project-templates/', {
      method: 'POST',
      body: {
        project_id: 101,
        reservation_id: 5001,
        type: 'callsheet',
        title: 'Fixture Call Sheet',
        data: { html: '<div>callsheet</div>' },
      },
    });

    expect(created?.data?.title).toBe('Fixture Call Sheet');
    expect(fallback).not.toHaveBeenCalled();

    const listed = await api('/project-templates/?project_id=101&type=callsheet');
    expect(Array.isArray(listed?.data)).toBe(true);
    expect(listed.data).toHaveLength(1);
    expect(listed.data[0].title).toBe('Fixture Call Sheet');

    const id = listed.data[0].id;
    const updated = await api(`/project-templates/?id=${id}`, {
      method: 'PATCH',
      body: { title: 'Renamed Fixture Call Sheet' },
    });
    expect(updated?.data?.title).toBe('Renamed Fixture Call Sheet');

    const fetched = await api(`/project-templates/?id=${id}`);
    expect(fetched?.data?.title).toBe('Renamed Fixture Call Sheet');
    expect(fetched?.data?.data?.html).toBe('<div>callsheet</div>');

    const deleted = await api(`/project-templates/?id=${id}`, { method: 'DELETE' });
    expect(deleted).toEqual({ ok: true });

    const afterDelete = await api('/project-templates/?project_id=101&type=callsheet');
    expect(afterDelete.data).toEqual([]);
  });

  it('falls back to the original api function outside the dashboard fixture route', async () => {
    window.history.replaceState({}, '', '/src/pages/projects.html');
    const fallback = vi.fn(async () => ({ ok: true }));
    const api = createProjectTemplatesFixtureApi(fallback);

    await api('/project-templates/?project_id=101&type=callsheet');

    expect(fallback).toHaveBeenCalledTimes(1);
  });
});
