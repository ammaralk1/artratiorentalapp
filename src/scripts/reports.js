import { translate, resetFormatters } from './reports/formatters.js';
import { getCurrentLanguage } from './language.js';
import reportsState, {
  setRenderCallback,
  setBeforeRenderCallback,
  setAfterRenderCallback,
  setTrendDrilldownCallback,
  setStatusDrilldownCallback,
  setPaymentDrilldownCallback,
} from './reports/state.js';
import { hydrateReportsFromCache, loadReportsData } from './reports/dataService.js';
import {
  filterReservations,
  calculateMetrics,
  calculateMaintenanceExpenses,
  applyMaintenanceExpenses,
  calculateMonthlyTrend,
  calculateStatusBreakdown,
  calculatePaymentBreakdown,
  calculateTopCustomers,
  calculateTopEquipment,
} from './reports/calculations.js';
import { renderTrendChart, renderStatusChart, renderPaymentChart } from './reports/presenters/charts.js';
import { updateKpiCards } from './reports/presenters/kpis.js';
import { renderReservationsTable } from './reports/presenters/table.js';
import {
  exportReport,
  renderTopCustomers,
  renderTopEquipment,
} from './reports/presenters/exporters.js';
import {
  setupColumnControls,
  applyColumnVisibility,
  setupExportButtons,
  applySearchFilter,
  handleTrendDrilldown,
  handleStatusDrilldown,
  handlePaymentDrilldown,
  handleTopListDrilldown,
} from './reports/presenters/ui.js';
import { renderActiveFilters } from './reports/presenters/ui.js';

const filters = reportsState.filters;

function handleLanguageChange() {
  resetFormatters();
  renderReports();
  // Delay to allow translation bundle to flush
  setTimeout(() => {
    resetFormatters();
    renderReports();
    setupCustomRangePickers();
  }, 0);
  setTimeout(() => {
    resetFormatters();
    renderReports();
    setupCustomRangePickers();
  }, 60);
  setupCustomRangePickers();
}

function renderIfCustomRange() {
  if (filters.range === 'custom') {
    renderReports();
  }
}

function setupCustomRangePickers(startInput, endInput) {
  if (!window.flatpickr) return;

  if (startInput) reportsState.startDateInputRef = startInput;
  if (endInput) reportsState.endDateInputRef = endInput;

  const startEl = reportsState.startDateInputRef;
  const endEl = reportsState.endDateInputRef;
  if (!startEl && !endEl) return;

  const localeOption = resolveFlatpickrLocaleOption();
  const baseOptions = (handlers) => {
    const options = {
      dateFormat: 'Y-m-d',
      allowInput: true,
      disableMobile: true,
      ...handlers,
    };
    if (localeOption) {
      options.locale = localeOption;
    }
    return options;
  };

  if (reportsState.startDatePicker) {
    reportsState.startDatePicker.destroy();
    reportsState.startDatePicker = null;
  }
  if (reportsState.endDatePicker) {
    reportsState.endDatePicker.destroy();
    reportsState.endDatePicker = null;
  }

  if (startEl) {
    reportsState.startDatePicker = window.flatpickr(startEl, baseOptions({
      onChange(selectedDates, dateStr) {
        filters.start = dateStr || null;
        if (reportsState.endDatePicker) {
          if (selectedDates?.length) {
            reportsState.endDatePicker.set('minDate', selectedDates[0]);
          } else {
            reportsState.endDatePicker.set('minDate', null);
          }
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        filters.start = dateStr || null;
        renderIfCustomRange();
      },
    }));
  }

  if (endEl) {
    reportsState.endDatePicker = window.flatpickr(endEl, baseOptions({
      onChange(selectedDates, dateStr) {
        filters.end = dateStr || null;
        if (reportsState.startDatePicker) {
          if (selectedDates?.length) {
            reportsState.startDatePicker.set('maxDate', selectedDates[0]);
          } else {
            reportsState.startDatePicker.set('maxDate', null);
          }
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        filters.end = dateStr || null;
        renderIfCustomRange();
      },
    }));
  }

  if (reportsState.startDatePicker && startEl) {
    reportsState.startDatePicker.setDate(startEl.value, false);
    const linkedDate = reportsState.endDatePicker?.selectedDates?.[0] || reportsState.endDateInputRef?.value;
    if (linkedDate) {
      reportsState.startDatePicker.set('maxDate', linkedDate);
    }
  }

  if (reportsState.endDatePicker && endEl) {
    reportsState.endDatePicker.setDate(endEl.value, false);
    const linkedDate = reportsState.startDatePicker?.selectedDates?.[0] || reportsState.startDateInputRef?.value;
    if (linkedDate) {
      reportsState.endDatePicker.set('minDate', linkedDate);
    }
  }
}

function resolveFlatpickrLocaleOption() {
  const language = (getCurrentLanguage() || 'ar').toLowerCase();
  if (language.startsWith('ar')) {
    return window.flatpickr?.l10ns?.ar ? 'ar' : null;
  }
  if (window.flatpickr?.l10ns?.en) {
    return 'en';
  }
  return null;
}

function toggleCustomRange(wrapper, isActive) {
  if (!wrapper) return;
  wrapper.classList.toggle('active', Boolean(isActive));
  wrapper.classList.toggle('hidden', !isActive);
}

function syncFilterControls() {
  const rangeSelect = document.getElementById('reports-range');
  const statusSelect = document.getElementById('reports-status-filter');
  const paymentSelect = document.getElementById('reports-payment-filter');
  const shareSelect = document.getElementById('reports-share-filter');
  const searchInput = document.getElementById('reports-search');
  const startInput = document.getElementById('reports-start');
  const endInput = document.getElementById('reports-end');
  const customRangeWrapper = document.getElementById('reports-custom-range');

  if (rangeSelect && rangeSelect.value !== filters.range) {
    rangeSelect.value = filters.range;
  }
  if (statusSelect && statusSelect.value !== filters.status) {
    statusSelect.value = filters.status;
  }
  if (paymentSelect && paymentSelect.value !== filters.payment) {
    paymentSelect.value = filters.payment;
  }
  if (shareSelect && shareSelect.value !== filters.share) {
    shareSelect.value = filters.share;
  }
  if (searchInput && searchInput.value !== filters.search) {
    searchInput.value = filters.search || '';
  }
  if (startInput && startInput.value !== (filters.start || '')) {
    startInput.value = filters.start || '';
  }
  if (endInput && endInput.value !== (filters.end || '')) {
    endInput.value = filters.end || '';
  }

  toggleCustomRange(customRangeWrapper, filters.range === 'custom');
}

function readFiltersFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const get = (k) => params.get(k);
    const v = (x) => (x == null || x === '' ? null : x);
    filters.range = get('range') || filters.range;
    filters.status = get('status') || filters.status;
    filters.payment = get('payment') || filters.payment;
    filters.share = get('share') || filters.share;
    filters.search = get('search') || '';
    filters.start = v(get('start'));
    filters.end = v(get('end'));
    // Normalize if range not custom
    if (filters.range !== 'custom') {
      filters.start = null;
      filters.end = null;
    }
  } catch (_) {
    // ignore URL parse errors
  }
}

let urlUpdateTimer = null;
function scheduleUrlUpdate() {
  if (urlUpdateTimer) clearTimeout(urlUpdateTimer);
  urlUpdateTimer = setTimeout(() => {
    try {
      const params = new URLSearchParams();
      const setIf = (key, value, def) => {
        if (value != null && value !== '' && value !== def) params.set(key, value);
      };
      setIf('range', filters.range, 'all');
      setIf('status', filters.status, 'all');
      setIf('payment', filters.payment, 'all');
      setIf('share', filters.share, 'all');
      setIf('search', filters.search, '');
      if (filters.range === 'custom') {
        setIf('start', filters.start, null);
        setIf('end', filters.end, null);
      }
      const qs = params.toString();
      const url = qs ? `${location.pathname}?${qs}` : location.pathname;
      window.history.replaceState({}, '', url);
    } catch (_) {
      // ignore history errors
    }
  }, 120);
}

function setReportsEmptyState({ active, icon, title, subtitle }) {
  const emptyState = document.getElementById('reports-empty-state');
  if (!emptyState) return;

  const iconEl = emptyState.querySelector('.reports-empty-icon');
  const titleEl = emptyState.querySelector('h4');
  const subtitleEl = emptyState.querySelector('p');

  if (reportsState.emptyDefaults.icon === null && iconEl) {
    reportsState.emptyDefaults.icon = iconEl.textContent;
  }
  if (reportsState.emptyDefaults.title === null && titleEl) {
    reportsState.emptyDefaults.title = titleEl.textContent;
  }
  if (reportsState.emptyDefaults.subtitle === null && subtitleEl) {
    reportsState.emptyDefaults.subtitle = subtitleEl.textContent;
  }

  emptyState.classList.toggle('active', Boolean(active));
  emptyState.classList.toggle('hidden', !active);

  if (!iconEl || !titleEl || !subtitleEl) {
    return;
  }

  if (active) {
    iconEl.textContent = icon !== undefined ? icon : (reportsState.emptyDefaults.icon ?? iconEl.textContent);
    titleEl.textContent = title !== undefined ? title : (reportsState.emptyDefaults.title ?? titleEl.textContent);
    subtitleEl.textContent = subtitle !== undefined ? subtitle : (reportsState.emptyDefaults.subtitle ?? subtitleEl.textContent);
  } else {
    iconEl.textContent = reportsState.emptyDefaults.icon ?? iconEl.textContent;
    titleEl.textContent = reportsState.emptyDefaults.title ?? titleEl.textContent;
    subtitleEl.textContent = reportsState.emptyDefaults.subtitle ?? subtitleEl.textContent;
  }
}

function toggleEmptyState(isEmpty) {
  setReportsEmptyState({ active: Boolean(isEmpty) });
}

function toggleSkeleton(loading) {
  const kpiSkeleton = document.getElementById('reports-kpi-skeleton');
  const kpiGrid = document.getElementById('reservations-reports-kpis');
  const tableSkeleton = document.getElementById('reports-table-skeleton');
  const table = document.getElementById('reports-reservations-table');
  const revSkeleton = document.getElementById('reservations-revenue-skeleton');
  const revList = document.getElementById('reservations-revenue-breakdown');
  if (kpiSkeleton && kpiGrid) { kpiSkeleton.style.display = loading ? '' : 'none'; kpiGrid.style.opacity = loading ? '0.4' : '1'; }
  if (tableSkeleton && table) { tableSkeleton.style.display = loading ? '' : 'none'; table.style.opacity = loading ? '0.4' : '1'; }
  if (revSkeleton && revList) { revSkeleton.style.display = loading ? '' : 'none'; revList.style.opacity = loading ? '0.4' : '1'; }
}

function setupDrilldownInteractions() {
  if (reportsState.drilldownBound) return;

  const customerTable = document.getElementById('reports-top-customers');
  const equipmentTable = document.getElementById('reports-top-equipment');
  const reservationsBody = document.getElementById('reports-reservations-body');

  const handler = (event) => {
    const target = event.target?.closest('[data-drilldown]');
    if (!target) return;
    const value = target.dataset.search || '';
    handleTopListDrilldown(value, () => {
      syncFilterControls();
      renderReports();
    });
  };

  customerTable?.addEventListener('click', handler);
  equipmentTable?.addEventListener('click', handler);
  reservationsBody?.addEventListener('click', handler);

  reportsState.drilldownBound = true;
}

function handleReportsDataMutation() {
  loadReportsData({ silent: true }).catch((error) => {
    console.error('❌ [reports] Background refresh failed', error);
  });
}

export function renderReports() {
  syncFilterControls();
  scheduleUrlUpdate();

  // Active filter chips
  renderActiveFilters({ onClear: () => {
    syncFilterControls();
    scheduleUrlUpdate();
    renderReports();
  } });

  if (reportsState.loading) { toggleSkeleton(true); return; }

  if (reportsState.errorMessage) {
    setReportsEmptyState({
      active: true,
      icon: '⚠️',
      title: reportsState.errorMessage,
      subtitle: translate('reservations.reports.status.retry', 'جرّب إعادة المحاولة أو تحديث الصفحة.'),
    });
    return;
  }

  toggleSkeleton(false);
  const { reservations, customers, equipment, technicians, maintenance } = reportsState.data;
  const filtered = filterReservations(reservations, filters, customers, equipment, technicians);
  const metrics = calculateMetrics(filtered);
  const maintenanceSummary = calculateMaintenanceExpenses(maintenance, filters);
  const metricsWithMaintenance = applyMaintenanceExpenses(metrics, maintenanceSummary.total);
  const trend = calculateMonthlyTrend(filtered);
  const statusBreakdown = calculateStatusBreakdown(filtered);
  const paymentBreakdown = calculatePaymentBreakdown(filtered);
  const topCustomers = calculateTopCustomers(filtered, customers);
  const topEquipment = calculateTopEquipment(filtered, equipment);

  updateKpiCards(metricsWithMaintenance);
  renderTrendChart(trend);
  renderStatusChart(statusBreakdown);
  renderPaymentChart(paymentBreakdown);
  renderTopCustomers(topCustomers);
  renderTopEquipment(topEquipment);
  const tableRows = renderReservationsTable(filtered, customers, technicians);
  applyColumnVisibility();
  toggleEmptyState(filtered.length === 0);

  reportsState.lastSnapshot.filtered = filtered;
  reportsState.lastSnapshot.metrics = metricsWithMaintenance;
  reportsState.lastSnapshot.trend = trend;
  reportsState.lastSnapshot.statusBreakdown = statusBreakdown;
  reportsState.lastSnapshot.paymentBreakdown = paymentBreakdown;
  reportsState.lastSnapshot.tableRows = tableRows;
  reportsState.lastSnapshot.maintenance = maintenanceSummary;
}

export function initReports() {
  if (reportsState.initialized) return;
  reportsState.initialized = true;

  const rangeSelect = document.getElementById('reports-range');
  const statusSelect = document.getElementById('reports-status-filter');
  const paymentSelect = document.getElementById('reports-payment-filter');
  const shareSelect = document.getElementById('reports-share-filter');
  const startInput = document.getElementById('reports-start');
  const endInput = document.getElementById('reports-end');
  const refreshBtn = document.getElementById('reports-refresh');
  const printBtn = document.getElementById('reports-print');
  const customRangeWrapper = document.getElementById('reports-custom-range');
  const searchInput = document.getElementById('reports-search');

  if (!rangeSelect) {
    return;
  }

  readFiltersFromUrl();
  syncFilterControls();

  const hydrated = hydrateReportsFromCache();
  if (hydrated) {
    renderReports();
  }

  rangeSelect.addEventListener('change', () => {
    filters.range = rangeSelect.value;
    toggleCustomRange(customRangeWrapper, filters.range === 'custom');
    if (filters.range !== 'custom') {
      filters.start = null;
      filters.end = null;
    }
    scheduleUrlUpdate();
    renderReports();
  });

  statusSelect?.addEventListener('change', () => {
    filters.status = statusSelect.value;
    scheduleUrlUpdate();
    renderReports();
  });

  paymentSelect?.addEventListener('change', () => {
    filters.payment = paymentSelect.value;
    scheduleUrlUpdate();
    renderReports();
  });

  shareSelect?.addEventListener('change', () => {
    filters.share = shareSelect.value;
    scheduleUrlUpdate();
    renderReports();
  });

  searchInput?.addEventListener('input', () => {
    const value = searchInput.value || '';
    applySearchFilter(value, () => {
      syncFilterControls();
      scheduleUrlUpdate();
      renderReports();
    });
  });

  startInput?.addEventListener('change', () => {
    filters.start = startInput.value || null;
    scheduleUrlUpdate();
    renderIfCustomRange();
  });

  endInput?.addEventListener('change', () => {
    filters.end = endInput.value || null;
    scheduleUrlUpdate();
    renderIfCustomRange();
  });

  refreshBtn?.addEventListener('click', () => {
    if (filters.range === 'custom') {
      filters.start = startInput?.value || null;
      filters.end = endInput?.value || null;
    }
    scheduleUrlUpdate();
    renderReports();
  });

  printBtn?.addEventListener('click', async () => {
    try {
      const rows = reportsState.lastSnapshot.tableRows || [];
      const { exportA4ReportPdf } = await import('./reports/presenters/a4Unified.js');
      await exportA4ReportPdf(rows, { action: 'print' });
    } catch (_) {
      try { window.print(); } catch (_) {}
    }
  });

  setupCustomRangePickers(startInput, endInput);
  toggleCustomRange(customRangeWrapper, filters.range === 'custom');

  if (!reportsState.languageListenerAttached) {
    document.addEventListener('language:changed', handleLanguageChange);
    document.addEventListener('language:translationsReady', handleLanguageChange);
    reportsState.languageListenerAttached = true;
  }

  if (!reportsState.dataListenersAttached) {
    document.addEventListener('reservations:changed', handleReportsDataMutation);
    document.addEventListener('customers:changed', handleReportsDataMutation);
    document.addEventListener('equipment:changed', handleReportsDataMutation);
    document.addEventListener('projects:changed', handleReportsDataMutation);
    document.addEventListener('technicians:updated', handleReportsDataMutation);
    window.addEventListener('maintenance:updated', handleReportsDataMutation);
    reportsState.dataListenersAttached = true;
  }

  setupColumnControls(applyColumnVisibility);
  setupExportButtons(async (type) => {
    const rows = reportsState.lastSnapshot.tableRows || [];
    if (!rows.length) {
      console.warn('[reports] No reservation data to export');
      return;
    }
    if (type === 'pdf') {
      // استخدم مولد الصفحات المعتمد نفسه المستخدم في المعاينة والطباعة
      try {
        const { exportA4ReportPdf } = await import('./reports/presenters/a4Unified.js');
        await exportA4ReportPdf(rows, { action: 'save' });
        return;
      } catch (e) {
        console.warn('[reports] page-based PDF export failed, falling back to legacy', e);
      }
    }
    await exportReport(type, rows);
  });
  // Preview PDF button
  const previewBtn = document.getElementById('reports-preview-pdf');
  if (previewBtn && !previewBtn.dataset.bound) {
    previewBtn.addEventListener('click', async () => {
      try {
        const module = await import('./reports/preview.js');
        const rows = reportsState.lastSnapshot.tableRows || [];
        module.openReportsPdfPreview(rows);
      } catch (error) {
        console.error('⚠️ [reports] Failed to open PDF preview', error);
      }
    });
    previewBtn.dataset.bound = 'true';
  }
  setupDrilldownInteractions();

  if (!reportsState.themeListenerAttached) {
    document.addEventListener('theme:changed', () => {
      setTimeout(() => renderReports(), 0);
    });
    reportsState.themeListenerAttached = true;
  }

  setRenderCallback(renderReports);
  setBeforeRenderCallback(() => {
    renderReports();
  });
  setAfterRenderCallback(() => {
    renderReports();
  });

  setTrendDrilldownCallback((item) => {
    handleTrendDrilldown(item, () => {
      syncFilterControls();
      renderReports();
    });
  });
  setStatusDrilldownCallback((item) => {
    handleStatusDrilldown(item?.filterKey, () => {
      syncFilterControls();
      renderReports();
    });
  });
  setPaymentDrilldownCallback((item) => {
    handlePaymentDrilldown(item?.filterKey, () => {
      syncFilterControls();
      renderReports();
    });
  });

  loadReportsData().catch((error) => {
    console.error('❌ [reports] Failed to initialise reports data', error);
  });
}
