import reportsState from '../state.js';
import { translate } from '../formatters.js';

const filters = reportsState.filters;

export function setupColumnControls(applyColumnVisibility) {
  if (reportsState.columnControlsBound) return;
  const container = document.getElementById('reports-column-controls');
  if (!container) return;

  container.querySelectorAll('input[data-column-toggle]').forEach((input) => {
    const key = input.dataset.columnToggle;
    if (!key) return;
    input.checked = reportsState.columnPreferences[key] !== false;
    input.addEventListener('change', () => {
      reportsState.columnPreferences[key] = input.checked;
      applyColumnVisibility();
    });
  });

  reportsState.columnControlsBound = true;
  applyColumnVisibility();
}

export function applyColumnVisibility() {
  Object.entries(reportsState.columnPreferences).forEach(([column, visible]) => {
    document.querySelectorAll(`[data-report-column="${column}"]`).forEach((element) => {
      element.classList.toggle('hidden', !visible);
    });
  });
}

export function setupExportButtons(handler) {
  if (reportsState.exportHandlersBound) return;
  const buttons = document.querySelectorAll('[data-export]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const { export: type = '' } = button.dataset;
      if (!type) return;
      button.disabled = true;
      try {
        await handler(type);
      } catch (error) {
        console.error('⚠️ [reports] export failed', error);
      } finally {
        button.disabled = false;
      }
    });
  });

  reportsState.exportHandlersBound = true;
}

export function applySearchFilter(value, renderCallback) {
  if (reportsState.searchDebounceTimer) {
    clearTimeout(reportsState.searchDebounceTimer);
    reportsState.searchDebounceTimer = null;
  }
  reportsState.searchDebounceTimer = setTimeout(() => {
    filters.search = value || '';
    renderCallback();
  }, 220);
}

export function handleTrendDrilldown(item, renderCallback) {
  if (!item) return;
  filters.range = 'custom';
  filters.start = item.startInput || null;
  filters.end = item.endInput || null;
  renderCallback();
}

export function handleStatusDrilldown(filterKey, renderCallback) {
  if (!filterKey) return;
  filters.status = filters.status === filterKey ? 'all' : filterKey;
  renderCallback();
}

export function handlePaymentDrilldown(filterKey, renderCallback) {
  if (!filterKey) return;
  filters.payment = filters.payment === filterKey ? 'all' : filterKey;
  renderCallback();
}

export function handleTopListDrilldown(searchValue, renderCallback) {
  if (!searchValue) return;
  filters.search = searchValue;
  renderCallback();
}

export function renderActiveFilters({ onClear } = {}) {
  const host = document.getElementById('reservations-active-filters');
  if (!host) return;

  const chips = [];
  const pushChip = (key, label, clearTo) => {
    chips.push(`<span class="filter-chip" data-chip="${key}">${label} <button type="button" aria-label="clear" data-clear="${key}">✕</button></span>`);
  };

  // Range
  if ((filters.range && filters.range !== 'all') || (filters.start || filters.end)) {
    let label = '';
    switch (filters.range) {
      case 'thisWeek': label = translate('reservations.reports.filters.range.thisWeek', 'هذا الأسبوع', 'This week'); break;
      case 'thisMonth': label = translate('reservations.reports.filters.range.thisMonth', 'هذا الشهر', 'This month'); break;
      case 'thisQuarter': label = translate('reservations.reports.filters.range.thisQuarter', 'هذا الربع', 'This quarter'); break;
      case 'thisYear': label = translate('reservations.reports.filters.range.thisYear', 'هذا العام', 'This year'); break;
      case 'custom':
      default:
        label = `${translate('reservations.reports.filters.range.custom', 'مخصص', 'Custom')} (${filters.start || translate('common.placeholder.empty', '—', '—')} → ${filters.end || translate('common.placeholder.empty', '—', '—')})`;
    }
    pushChip('range', label, 'all');
  }

  if (filters.status && filters.status !== 'all') {
    const label = translate(`reservations.reports.filters.status.${filters.status}`, filters.status, filters.status);
    pushChip('status', label, 'all');
  }

  if (filters.payment && filters.payment !== 'all') {
    const label = translate(`reservations.reports.filters.payment.${filters.payment}`, filters.payment, filters.payment);
    pushChip('payment', label, 'all');
  }

  if (filters.share && filters.share !== 'all') {
    const label = translate(`reservations.reports.filters.share.${filters.share}`, filters.share, filters.share);
    pushChip('share', label, 'all');
  }

  if (filters.search && filters.search.trim().length) {
    pushChip('search', `🔍 ${filters.search.trim()}`, '');
  }

  host.innerHTML = chips.join('');
  host.querySelectorAll('[data-clear]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.clear;
      if (!key) return;
      if (key === 'range') {
        filters.range = 'all';
        filters.start = null;
        filters.end = null;
      } else if (key in filters) {
        if (key === 'search') {
          filters.search = '';
        } else {
          filters[key] = 'all';
        }
      }
      onClear?.(key);
    });
  });
}

export function renderQuickChips(statusData = [], paymentData = []) {
  const host = document.getElementById('reports-quick-chips');
  if (!host) return;
  const s = Array.isArray(statusData) ? statusData : [];
  const p = Array.isArray(paymentData) ? paymentData : [];
  const activeStatus = filters.status || 'all';
  const activePayment = filters.payment || 'all';
  const makeChip = (key, label, count, type, active, stateClass = '') => {
    const cls = `chip ${active ? 'chip-active' : ''}`;
    const stateClasses = stateClass ? ` ${stateClass}` : '';
    return `<button type="button" class="${cls}${stateClasses}" data-quick-${type}="${key}" title="${label}">${label} <span class="chip-count">${count}</span></button>`;
  };
  const find = (arr, k) => arr.find((x) => (x.filterKey || '').toLowerCase() === k);
  const chips = [];
  const statuses = ['confirmed','completed'];
  statuses.forEach((k) => {
    const item = find(s, k) || { label: k, rawCount: 0, className: '' };
    chips.push(makeChip(k, item.label || k, item.rawCount || 0, 'status', activeStatus === k, `chip--status ${item.className || ''}`));
  });
  chips.push('<span class="reports-quick-chips-separator" aria-hidden="true">|</span>');
  const payments = ['paid','partial','unpaid'];
  payments.forEach((k) => {
    const item = find(p, k) || { label: k, rawCount: 0, className: '' };
    chips.push(makeChip(k, item.label || k, item.rawCount || 0, 'payment', activePayment === k, `chip--payment ${item.className || ''}`));
  });
  host.innerHTML = chips.join('');
}
