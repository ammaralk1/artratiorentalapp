import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  ensureCustomRangePickers,
  handleDateRangeChange,
  setupReportFilters,
} from '../../../src/scripts/projectsReports/controls.ts';

describe('projectsReports/controls', () => {
  let dom;
  let filters;
  let renderAll;
  let getCurrentLanguage;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="search">
      <select id="payment"><option value="all">all</option><option value="paid">paid</option></select>
      <select id="confirmed"><option value="all">all</option><option value="closed">closed</option></select>
      <select id="range"><option value="all">all</option><option value="custom">custom</option></select>
      <div id="wrap"><input id="start"><input id="end"></div>
      <button id="refresh">refresh</button>
    `;
    dom = {
      search: document.getElementById('search'),
      payment: document.getElementById('payment'),
      confirmed: document.getElementById('confirmed'),
      dateRange: document.getElementById('range'),
      customRangeWrapper: document.getElementById('wrap'),
      startDate: document.getElementById('start'),
      endDate: document.getElementById('end'),
      refreshBtn: document.getElementById('refresh'),
    };
    filters = {
      search: '',
      statuses: ['upcoming', 'ongoing', 'completed'],
      payment: 'all',
      confirmed: 'all',
      range: 'all',
      startDate: '',
      endDate: '',
    };
    renderAll = vi.fn();
    getCurrentLanguage = vi.fn(() => 'en');
    vi.useFakeTimers();
  });

  it('wires search and select filters to state updates and rendering', () => {
    setupReportFilters({ dom, filters, renderAll, getCurrentLanguage });

    dom.search.value = 'milk';
    dom.search.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(180);
    expect(filters.search).toBe('milk');

    dom.payment.value = 'paid';
    dom.payment.dispatchEvent(new Event('change'));
    dom.confirmed.value = 'closed';
    dom.confirmed.dispatchEvent(new Event('change'));

    expect(filters.payment).toBe('paid');
    expect(filters.confirmed).toBe('closed');
    expect(renderAll).toHaveBeenCalledTimes(3);
  });

  it('handles switching between all and custom date ranges', () => {
    window.flatpickr = vi.fn(() => ({ open: vi.fn(), set: vi.fn() }));

    handleDateRangeChange('custom', { dom, filters, renderAll, getCurrentLanguage });
    expect(filters.range).toBe('custom');
    expect(dom.customRangeWrapper.classList.contains('active')).toBe(true);
    expect(window.flatpickr).toHaveBeenCalled();

    dom.startDate.value = '2026-04-01';
    dom.endDate.value = '2026-04-10';
    handleDateRangeChange('all', { dom, filters, renderAll, getCurrentLanguage });
    expect(filters.startDate).toBe('');
    expect(filters.endDate).toBe('');
    expect(dom.startDate.value).toBe('');
    expect(dom.endDate.value).toBe('');
    expect(renderAll).toHaveBeenCalled();
  });

  it('initializes flatpickr pickers and opens them from wrapper interactions', () => {
    const startPicker = { open: vi.fn(), set: vi.fn() };
    const endPicker = { open: vi.fn(), set: vi.fn() };

    window.flatpickr = vi.fn((element, options) => {
      const picker = element === dom.startDate ? startPicker : endPicker;
      element._flatpickr = picker;
      return picker;
    });
    window.flatpickr.l10ns = { ar: {} };

    ensureCustomRangePickers({ dom, filters, renderAll, getCurrentLanguage });

    expect(window.flatpickr).toHaveBeenCalledTimes(2);
    expect(dom.startDate.getAttribute('aria-haspopup')).toBe('dialog');

    dom.customRangeWrapper.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(startPicker.open).toHaveBeenCalled();
  });
});
