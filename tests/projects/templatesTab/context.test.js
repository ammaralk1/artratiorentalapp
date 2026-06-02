import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockProjectsState, mockReservationsState } = vi.hoisted(() => ({
  mockProjectsState: vi.fn(),
  mockReservationsState: vi.fn(),
}));

vi.mock('../../../src/scripts/projectsService.js', () => ({
  getProjectsState: mockProjectsState,
}));

vi.mock('../../../src/scripts/reservationsService.js', () => ({
  getReservationsState: mockReservationsState,
}));

import {
  formatIntNoDecimals,
  getReservationsForProject,
  getSelectedProject,
  getSelectedReservations,
  getTemplateLang,
  getTemplatesContextKey,
  normalizeLegacyAssetUrl,
  normalizeTemplateHtmlLegacyUrls,
  readHeaderFooterOptions,
  readTplPreferredType,
  restoreTplPreferredTypeIfAny,
  setTemplateLang,
  writeTplPreferredType,
} from '../../../src/scripts/projects/templatesTab/context.ts';
import { setTemplatesHydratedReservation, templatesTabState } from '../../../src/scripts/projects/templatesTab/state.ts';

describe('templatesTab/context', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
    templatesTabState.templateLang = 'en';
    mockProjectsState.mockReset();
    mockReservationsState.mockReset();
    mockProjectsState.mockReturnValue([]);
    mockReservationsState.mockReturnValue([]);
  });

  it('reads and writes the preferred template type', () => {
    expect(readTplPreferredType()).toBe('');

    writeTplPreferredType('callsheet');
    expect(readTplPreferredType()).toBe('callsheet');

    writeTplPreferredType('expenses');
    expect(readTplPreferredType()).toBe('expenses');
  });

  it('restores the preferred type from URL search before localStorage', () => {
    const select = document.createElement('select');
    select.innerHTML = '<option value="expenses">expenses</option><option value="callsheet">callsheet</option>';
    writeTplPreferredType('expenses');

    restoreTplPreferredTypeIfAny(select, '?tplType=callsheet');

    expect(select.value).toBe('callsheet');
  });

  it('normalizes legacy asset URLs and rewrites template HTML logo URLs', () => {
    expect(normalizeLegacyAssetUrl('https://art-ratio.sirv.com/path/logo.png')).toBe('https://assets.art-ratio.com/path/logo.png');

    const html = [
      'https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png',
      'https://assets.art-ratio.com/AR%20Logo%20v3.5%20curved%20WH.png',
      '/AR-Logo-v3.5-curved-WH.png',
    ].join(' ');

    expect(normalizeTemplateHtmlLegacyUrls(html, { logoUrl: '/brand/logo.png' })).toContain('/brand/logo.png /brand/logo.png /brand/logo.png');
  });

  it('selects the current project and reservations from mocked service state', () => {
    document.body.innerHTML = `
      <select id="templates-project">
        <option value="">--</option>
        <option value="2" selected>Project</option>
      </select>
      <select id="templates-reservation">
        <option value="">--</option>
        <option value="22" selected>Reservation</option>
      </select>
    `;

    mockProjectsState.mockReturnValue([
      { id: 1, title: 'One' },
      { id: 2, title: 'Two' },
    ]);
    mockReservationsState.mockReturnValue([
      { id: 21, projectId: 2, title: 'A' },
      { reservationId: 22, project_id: 2, title: 'B' },
      { id: 99, projectId: 9, title: 'Other' },
    ]);

    expect(getSelectedProject()).toEqual({ id: 2, title: 'Two' });
    expect(getReservationsForProject(2)).toHaveLength(2);
    expect(getSelectedReservations(2)).toEqual([{ reservationId: 22, project_id: 2, title: 'B' }]);
  });

  it('prefers hydrated reservation overrides when the cached reservation list is stale', () => {
    document.body.innerHTML = `
      <select id="templates-project">
        <option value="74" selected>Project</option>
      </select>
      <select id="templates-reservation">
        <option value="218" selected>Reservation</option>
      </select>
    `;

    mockProjectsState.mockReturnValue([{ id: 74, title: 'Adidas' }]);
    mockReservationsState.mockReturnValue([
      { id: 218, projectId: 74, title: 'Legacy reservation', crewAssignments: [] },
    ]);

    setTemplatesHydratedReservation({
      id: 218,
      projectId: 74,
      title: 'Hydrated reservation',
      crewAssignments: [{ position_name: 'مخرج', position_cost: 3000 }],
    });

    expect(getReservationsForProject(74)).toEqual([
      {
        id: 218,
        projectId: 74,
        title: 'Hydrated reservation',
        crewAssignments: [{ position_name: 'مخرج', position_cost: 3000 }],
      },
    ]);
    expect(getSelectedReservations(74)).toEqual([
      {
        id: 218,
        projectId: 74,
        title: 'Hydrated reservation',
        crewAssignments: [{ position_name: 'مخرج', position_cost: 3000 }],
      },
    ]);
  });

  it('stores template language in shared state and formats numbers by locale', () => {
    expect(getTemplateLang()).toBe('en');

    setTemplateLang('ar');
    expect(getTemplateLang()).toBe('ar');
    expect(localStorage.getItem('templates.lang')).toBe('ar');
    expect(formatIntNoDecimals(12345)).toBe('١٢٬٣٤٥');
  });

  it('builds the templates autosave context key from selected project/type/reservation', () => {
    document.body.innerHTML = `
      <select id="templates-project">
        <option value="7" selected>Project</option>
      </select>
      <select id="templates-type">
        <option value="callsheet" selected>callsheet</option>
      </select>
      <select id="templates-reservation">
        <option value="44" selected>Reservation</option>
      </select>
    `;

    mockProjectsState.mockReturnValue([{ id: 7, title: 'Seven' }]);

    expect(getTemplatesContextKey()).toBe('templates.callsheet.autosave.7.callsheet.44');
  });

  it('builds fixed header/footer options from company info', () => {
    expect(readHeaderFooterOptions({
      logoUrl: '/logo.png',
      companyName: 'Art Ratio',
      companyCR: '123',
      companyLicense: '456',
    })).toEqual({
      headerFooter: false,
      logoUrl: '/logo.png',
      companyName: 'Art Ratio',
      companyCR: '123',
      companyLicense: '456',
    });
  });
});
