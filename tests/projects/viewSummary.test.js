import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/scripts/auth.js', () => ({
  userCanManageDestructiveActions: () => true,
  checkAuth: () => true,
  logout: () => {},
  AUTH_EVENTS: {
    USER_UPDATED: 'auth:user-updated',
  },
}));

vi.mock('../../src/scripts/reservations/reservationPdf.js', () => ({
  exportProjectPdf: vi.fn(),
}));

import { renderFocusCards, updateSummary } from '../../src/scripts/projects/view.js';
import { openProjectDetails } from '../../src/scripts/projects/projectDetails/view.js';
import { formatCurrency } from '../../src/scripts/projects/formatting.js';
import { dom, state } from '../../src/scripts/projects/state.js';

describe('projects/view summary metrics', () => {
  beforeEach(() => {
    state.projects = [];
    state.reservations = [];
    state.customers = [];

    dom.projectsCount = document.createElement('div');
    dom.projectsUpcoming = document.createElement('div');
    dom.projectsExpenses = document.createElement('div');
    dom.projectsBudget = document.createElement('div');
    dom.focusCards = document.createElement('div');
    dom.archiveCards = document.createElement('div');
    dom.archiveCount = document.createElement('div');
    dom.detailsBody = document.createElement('div');
    dom.detailsModalEl = document.createElement('div');

    state.filters = {
      search: '',
      status: '',
      payment: '',
      type: '',
      confirmed: '',
      range: '',
      startDate: '',
      endDate: ''
    };
    state.visibleProjects = [];
    state.focusSectionPagination = {
      live: { page: 1, pageSize: 8, totalPages: 1 },
      archive: { page: 1, pageSize: 8, totalPages: 1 },
    };
  });

  it('counts only confirmed non-cancelled projects in the greeting summary', () => {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    state.projects = [
      {
        id: '1',
        confirmed: true,
        status: 'ongoing',
        start: future,
        expensesTotal: 100,
        servicesClientPrice: 1000,
        applyTax: false,
      },
      {
        id: '2',
        confirmed: true,
        status: 'completed',
        start: past,
        expensesTotal: 200,
        servicesClientPrice: 2000,
        applyTax: false,
      },
      {
        id: '3',
        confirmed: false,
        status: 'upcoming',
        start: future,
        expensesTotal: 300,
        servicesClientPrice: 3000,
        applyTax: false,
      },
      {
        id: '4',
        confirmed: true,
        status: 'cancelled',
        cancelled: true,
        start: future,
        expensesTotal: 400,
        servicesClientPrice: 4000,
        applyTax: false,
      },
    ];

    updateSummary();

    expect(dom.projectsCount.textContent).toBe('2');
    expect(dom.projectsUpcoming.textContent).toBe('1');
    expect(dom.projectsExpenses.textContent).toBe('300 SR');
    expect(dom.projectsBudget.textContent).toBe('3,000 SR');
  });

  it('renders live and archive quick overview cards without crashing', () => {
    const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const past = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    state.projects = [
      {
        id: '84',
        projectCode: 'PRJ-0084',
        title: 'احتفالية مارس',
        type: 'event',
        confirmed: true,
        start: future,
        end: future,
        expensesTotal: 100,
        servicesClientPrice: 1000,
        applyTax: true,
        companyShareEnabled: true,
        companySharePercent: 10,
      },
      {
        id: '75',
        projectCode: 'PRJ-0075',
        title: 'مشروع ملغي',
        type: 'commercial',
        confirmed: false,
        status: 'cancelled',
        cancelled: true,
        start: past,
        end: past,
        expensesTotal: 0,
        servicesClientPrice: 0,
        applyTax: false,
      },
    ];

    expect(() => renderFocusCards()).not.toThrow();
    expect(dom.focusCards.textContent).toContain('PRJ-0084');
    expect(dom.archiveCards.textContent).toContain('PRJ-0075');
    expect(dom.archiveCount.textContent).toBe('1');
  });

  it('keeps halalas visible in project currency values', () => {
    expect(formatCurrency(3415.5)).toBe('3,415.5 SR');
    expect(formatCurrency(3415.75)).toBe('3,415.75 SR');
    expect(formatCurrency(3000)).toBe('3,000 SR');
  });

  it('shows project detail costs as deductions in the financial summary', () => {
    state.customers = [{ id: '1', customerName: 'Client One' }];
    state.projects = [{
      id: '84',
      projectCode: 'PRJ-0084',
      title: 'Project with costs',
      type: 'event',
      clientId: '1',
      confirmed: true,
      start: '2026-05-30T09:00:00',
      end: '2026-05-30T21:00:00',
      expensesTotal: 100,
      servicesClientPrice: 1000,
      applyTax: true,
      companyShareEnabled: true,
      companySharePercent: 10,
    }];
    state.reservations = [{
      id: '231',
      projectId: '84',
      start: '2026-05-30T09:00:00',
      end: '2026-05-30T21:00:00',
      items: [{ equipmentId: '6818', quantity: 1, unit_price: 1000, unit_cost: 100 }],
      crewAssignments: [{ technicianId: '11', positionClientPrice: 1000, positionCost: 100 }],
    }];

    openProjectDetails('84');

    const rows = Array.from(dom.detailsBody.querySelectorAll('.summary-details-row'));
    const valueFor = (labelText) => {
      const row = rows.find((entry) => entry.textContent.includes(labelText));
      return row?.querySelector('.summary-details-value')?.textContent || '';
    };

    expect(valueFor('تكلفة المعدات')).toBe('−100 SR');
    expect(valueFor('تكلفة الفريق')).toBe('−100 SR');
    expect(valueFor('تكلفة الخدمات الإنتاجية')).toBe('−100 SR');
  });
});
