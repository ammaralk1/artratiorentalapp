import { loadData } from './storage.js';
import { t, getCurrentLanguage } from './language.js';
import { apiRequest } from './apiClient.js';
import {
  buildClientsChartOptions,
  buildProjectTypeChartOptions,
  buildProfitabilityChartOptions,
  buildStatusChartOptions,
  buildTimelineChartOptions,
  renderApexChart,
} from './projectsReports/charts';
import {
  assessProjectAttention,
  buildSortTitle,
  getNextSortState,
  renderProjectsTable,
  sortProjects,
  summarizeProjectsAttention,
} from './projectsReports/table';
import {
  ensureCustomRangePickers,
  setupReportFilters,
} from './projectsReports/controls';
import { refreshEnhancedSelect } from './ui/enhancedSelect.js';
import { bindReportsFilterToggle } from './reports/filterToggle.js';
import {
  computeProjectCommercialTotals,
  computeProjectsRevenueBreakdown,
  resolveProjectPaidAmount,
} from './projectsReports/breakdown';
import { exportProjectsToExcel as exportProjectsWorkbook } from './projectsReports/export';
import {
  determineProjectStatus,
  getProjectExpenses,
  getReservationsForProject,
  isProjectEligibleForReports,
  resolveProjectPaymentState,
} from './projectsReports/financials';
import {
  buildComparisonWindows,
  computeActionableProjectsSummary,
  computeAssignedTeamSummary,
  computeAverageProjectValue,
  computeCollectionSummary,
  computeMetricDelta,
  computeRepeatClientRevenueShare,
  formatInputDate,
} from './projectsReports/insights';
import {
  filterProjectsForReports,
} from './projectsReports/filters';
import {
  escapeHtml,
  formatCompactNumber,
  formatCurrency,
  formatNumber,
  formatPercent,
  formatProjectPeriod,
  getChartLocale,
} from './projectsReports/formatting';
import { jumpPaginationSectionToStart, settlePaginationSectionToStart } from './ui/paginationViewport.js';
import { isLocalBypassAuthEnabled } from './fixtureRuntime.js';
import {
  ensureProjectsLoaded,
  getProjectsState,
  refreshProjectsFromApi,
  isApiError as isProjectApiError,
} from './projectsService.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, refreshReservationsFromApi } from './reservationsService.js';
// Reuse the exact project financial rules from the project details/modal
// (removed) resolveProjectTotals import — unified flow handles all cases

let PROJECT_TAX_RATE = 0.15;
const charts = {};
const APEX_CHART_SRC = 'https://cdn.jsdelivr.net/npm/apexcharts@3.49.0/dist/apexcharts.min.js';
let chartLoadingRequests = 0;
const DEFAULT_REPORT_FILTERS = Object.freeze({
  search: '',
  statuses: ['upcoming', 'ongoing', 'completed'],
  payment: 'all',
  confirmed: 'all',
  range: 'all',
  comparison: 'none',
  startDate: '',
  endDate: '',
});

const state = {
  projects: [],
  customers: [],
  reservations: [],
  totalProjects: 0,
  tablePagination: {
    page: 1,
    pageSize: 10,
  },
  filters: {
    ...DEFAULT_REPORT_FILTERS,
    statuses: [...DEFAULT_REPORT_FILTERS.statuses],
  }
};

const dom = {
  headerSummary: null,
  search: null,
  payment: null,
  confirmed: null,
  dateRange: null,
  comparison: null,
  customRangeWrapper: null,
  startDate: null,
  endDate: null,
  refreshBtn: null,
  resetBtn: null,
  exportExcelBtn: null,
  printBtn: null,
  kpiGrid: null,
  statusChips: null,
  table: null,
  tableBody: null,
  tableHead: null,
  tableMeta: null,
  tableInsights: null,
  tableEmpty: null,
  tablePagination: null,
  statusChartNote: null,
  chartCards: {},
  chartLoaders: {}
};

function cacheReportFilterDomRefs() {
  dom.search = document.getElementById('reports-search');
  dom.statusChips = document.getElementById('reports-status-chips');
  dom.payment = document.getElementById('reports-payment');
  dom.confirmed = document.getElementById('reports-confirmed');
  dom.dateRange = document.getElementById('reports-date-range');
  dom.comparison = document.getElementById('reports-comparison');
  dom.customRangeWrapper = document.getElementById('reports-custom-range');
  dom.startDate = document.getElementById('reports-start-date');
  dom.endDate = document.getElementById('reports-end-date');
  dom.refreshBtn = document.getElementById('reports-refresh');
  dom.resetBtn = document.getElementById('reports-filter-reset');
}

function syncProjectsReportsWrapperDirection() {
  try {
    const dir = document?.documentElement?.getAttribute('dir') || 'rtl';
    const wrapper = document.querySelector('.reports-wrapper--projects');
    if (wrapper) wrapper.setAttribute('dir', dir);
  } catch (_) {}
}

const KPI_ICONS = Object.freeze({
  projects: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M4 4h6v8h-6z"></path>
      <path d="M14 4h6v5h-6z"></path>
      <path d="M4 16h6v4h-6z"></path>
      <path d="M14 11h6v9h-6z"></path>
    </svg>
  `,
  value: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 8c-4.418 0 -8 1.79 -8 4s3.582 4 8 4s8 -1.79 8 -4s-3.582 -4 -8 -4"></path>
      <path d="M12 8v8"></path>
      <path d="M8 12h8"></path>
    </svg>
  `,
  outstanding: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M7 18v-11a2 2 0 0 1 4 0v11"></path>
      <path d="M7 8h4"></path>
      <path d="M15 18v-7a2 2 0 0 1 4 0v7"></path>
      <path d="M15 13h4"></path>
    </svg>
  `,
  expenses: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M3 12l3 3l3 -3"></path>
      <path d="M6 6v9"></path>
      <path d="M13 6h5"></path>
      <path d="M15.5 6v12"></path>
      <path d="M21 18h-5"></path>
    </svg>
  `
  ,
  margin: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 3a9 9 0 1 0 9 9"></path>
      <path d="M12 7v5l3 3"></path>
      <path d="M16 3l5 5"></path>
    </svg>
  `
});

let ChartLib = null;
const STATUS_OPTIONS = ['upcoming', 'ongoing', 'completed'];
let projectsReportsInitPromise = null;

const REPORTS_METRIC_TONES = Object.freeze({
  neutral: 'neutral',
  count: 'count',
  revenue: 'revenue',
  profit: 'profit',
  cost: 'cost',
  risk: 'risk',
});

// Basic sort state for projects table
const sortState = { key: 'margin', dir: 'desc' };

// Prevent re-entrant refresh loops when listening to data-change events.
// Without this, our refresh -> setState -> dispatch('projects:changed')
// can recursively trigger another refresh, causing continuous network calls.
let __mutationRefreshInFlight = false;
let __lastMutationRefreshAt = 0;
const MUTATION_REFRESH_MIN_INTERVAL_MS = 1500; // throttle a bit when many events fire

async function loadReportsData({ forceProjects = false } = {}) {
  if (isLocalBypassAuthEnabled()) {
    loadAllData();
    return;
  }

  try {
    await ensureReservationsLoaded({ suppressError: true });
    await ensureProjectsLoaded({ force: forceProjects });
  } catch (error) {
    console.error('❌ [projectsReports] Failed to load initial data', error);
    if (isProjectApiError(error)) {
      // Surface the API message in console; UI already shows fallback states.
      console.warn('Projects API error:', error.message);
    }
  }
  loadAllData();
}

async function initReports() {
  cacheDom();
  beginChartsLoading();

  resolveAndApplyTaxRate();
  // Pre-initialize date pickers so inputs respond even before switching to custom
  try { ensureCustomRangePickersWrapper(); } catch (_) {}
  syncProjectsReportsWrapperDirection();
  await ensureChartLibrary();
  // Enable lightweight debug mode via URL query (?reportsDebug=1)
  try {
    const params = new URLSearchParams(window.location.search || '');
    state.__debug = params.get('reportsDebug') === '1' || params.get('debugReports') === '1';
  } catch (_) { state.__debug = false; }
  try {
    await loadReportsData({ forceProjects: true });
    // Defensive: if projects still empty, try a direct refresh + reload snapshot
    if (!Array.isArray(getProjectsState()) || getProjectsState().length === 0) {
      try {
        await refreshProjectsFromApi();
      } catch (_) {}
      loadAllData();
    }
    // Reset filters on bootstrap to avoid stale persisted UI hiding reports
    resetReportFilters({ shouldRender: false });
    renderStatusChips();
    syncFiltersToDom();
    setupFilters();
    setupFilterToggle();
    setupComparisonFilter();
    setupFilterReset();
    setupManualRefresh();
    setupTableSorting();
    setupTablePagination();
    setupExport();
    setupPrint();
    renderAll();
  } finally {
    endChartsLoading();
  }

  document.addEventListener('language:changed', handleLanguageChanged, { passive: true });
  document.addEventListener('projects:changed', () => {
    handleDataMutation().catch((error) => {
      console.error('❌ [projectsReports] Failed to refresh after projects change', error);
    });
  }, { passive: true });
  document.addEventListener('reservations:changed', () => {
    handleDataMutation().catch((error) => {
      console.error('❌ [projectsReports] Failed to refresh after reservations change', error);
    });
  }, { passive: true });
  window.addEventListener('storage', handleStorageSync);
}

export function initProjectsReportsModule() {
  if (!projectsReportsInitPromise) {
    projectsReportsInitPromise = initReports().catch((error) => {
      projectsReportsInitPromise = null;
      throw error;
    });
  }

  return projectsReportsInitPromise;
}

async function ensureChartLibrary() {
  if (ChartLib) return ChartLib;
  if (typeof window === 'undefined') return null;
  if (window.ApexCharts) {
    ChartLib = window.ApexCharts;
    return ChartLib;
  }
  try {
    await loadExternalScript(APEX_CHART_SRC);
    ChartLib = window.ApexCharts || null;
  } catch (error) {
    console.warn('ApexCharts failed to load', error);
    ChartLib = null;
  }
  return ChartLib;
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') {
      reject(new Error('Document is not available to load scripts.'));
      return;
    }

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', () => reject(new Error(`Failed to load script ${src}`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.loaded = 'false';
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.head.appendChild(script);
  });
}

function cacheDom() {
  dom.headerSummary = document.getElementById('reports-header-summary');
  cacheReportFilterDomRefs();
  dom.exportExcelBtn = document.getElementById('projects-export-excel');
  dom.printBtn = document.getElementById('reports-print-pdf');
  dom.kpiGrid = document.getElementById('reports-kpi-grid');
  dom.table = document.getElementById('reports-table');
  dom.tableBody = dom.table?.querySelector('tbody');
  dom.tableHead = dom.table?.querySelector('thead');
  dom.tableMeta = document.getElementById('reports-table-meta');
  dom.tableInsights = document.getElementById('reports-table-insights');
  dom.tableEmpty = document.getElementById('reports-empty');
  dom.tablePagination = document.getElementById('reports-table-pagination');
  dom.statusChartNote = document.getElementById('reports-status-chart-note');
  dom.chartCards = {};
  dom.chartLoaders = {};

  document.querySelectorAll('[data-chart-card]').forEach((card) => {
    const key = card.dataset.chartCard;
    if (!key) return;
    dom.chartCards[key] = card;
    const loader = card.querySelector('[data-chart-loading]');
    if (loader) {
      dom.chartLoaders[key] = loader;
    }
  });
}

function setChartsLoading(isLoading) {
  const shouldShow = Boolean(isLoading);
  Object.entries(dom.chartCards || {}).forEach(([key, card]) => {
    if (!card) return;
    card.classList.toggle('is-loading', shouldShow);
    card.setAttribute('aria-busy', shouldShow ? 'true' : 'false');
    const loader = dom.chartLoaders?.[key];
    if (loader) {
      loader.hidden = !shouldShow;
    }
  });
}

function beginChartsLoading() {
  chartLoadingRequests += 1;
  if (chartLoadingRequests === 1) {
    setChartsLoading(true);
  }
}

function endChartsLoading() {
  chartLoadingRequests = Math.max(0, chartLoadingRequests - 1);
  if (chartLoadingRequests === 0) {
    setChartsLoading(false);
  }
}

function loadAllData() {
  const { customers = [] } = loadData();
  state.customers = Array.isArray(customers) ? customers : [];
  state.reservations = getReservationsState();
  const customerMap = new Map(state.customers.map((customer) => [String(customer.id), customer]));

  const projects = getProjectsState();
  const snapshots = Array.isArray(projects)
    ? projects.map((project) => buildProjectSnapshot(project, customerMap))
    : [];
  state.projects = snapshots.filter((project) => isProjectEligibleForReports(project));

  state.totalProjects = state.projects.length;
}

function resolveAndApplyTaxRate() {
  try {
    const root = typeof window !== 'undefined' ? window : globalThis;
    const candidates = [root.APP_VAT_RATE, root.APP_TAX_RATE, root.__APP_SETTINGS__?.vatRate];
    for (const v of candidates) {
      const n = Number(v);
      // Accept only positive VAT values; ignore 0 to keep default 15%
      if (Number.isFinite(n) && n > 0 && n <= 1) { PROJECT_TAX_RATE = n; return; }
      if (Number.isFinite(n) && n > 1 && n <= 100) { PROJECT_TAX_RATE = n / 100; return; }
    }
  } catch (_) {}
  try {
    apiRequest('/preferences/').then((payload) => {
      const raw = payload?.data ?? payload ?? {};
      const v = raw.vatRate ?? raw.taxRate ?? null;
      const n = Number(v);
      // Only apply if preferences provide a positive VAT
      if (Number.isFinite(n) && n > 0) {
        PROJECT_TAX_RATE = n > 1 ? n / 100 : n;
        renderAll();
      }
    }).catch(() => {});
  } catch (_) {}
}

function buildProjectSnapshot(project, customerMap) {
  const client = customerMap.get(String(project.clientId));
  const reservations = getReservationsForProject(state.reservations, project.id);
  const commercial = computeProjectCommercialTotals(project, reservations, PROJECT_TAX_RATE);
  const paidAmount = resolveProjectPaidAmount(project, commercial.finalTotal);
  const normalizedPayment = resolveProjectPaymentState({
    raw: project,
    overallTotal: commercial.finalTotal,
  });

  const statusBase = determineProjectStatus(project);
  const isCancelled = (() => {
    try {
      if (project?.cancelled === true) return true;
      const s = String(project?.status || project?.raw?.status || '').toLowerCase();
      return s === 'cancelled' || s === 'canceled' || s === 'ملغي' || s === 'ملغى';
    } catch (_) { return false; }
  })();
  const status = isCancelled ? 'cancelled' : statusBase;
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;
  const revenueExTax = Math.max(0, Number((commercial.finalTotal - commercial.taxAmount).toFixed(2)));
  const netProfit = Number((
    commercial.baseAfterDiscount
    - commercial.companyShareAmount
    - commercial.projectExpenses
    - (commercial.agg.crewCost || 0)
    - (commercial.agg.equipmentCost || 0)
  ).toFixed(2));
  const marginPercent = Number((revenueExTax > 0 ? ((netProfit / revenueExTax) * 100) : 0).toFixed(1));

  return {
    raw: project,
    id: project.id,
    projectCode: project.projectCode || project.id,
    title: (project.title || '').trim(),
    clientId: project.clientId,
    clientName: String(project.clientName || '').trim() || client?.customerName || client?.name || '',
    clientCompany: project.clientCompany || client?.companyName || '',
    type: project.type || project.projectType || '',
    description: project.description || '',
    paymentStatus: normalizedPayment,
    confirmed: project.confirmed === true || project.confirmed === 'true',
    start,
    end,
    applyTax: commercial.applyTax,
    companyShareEnabled: commercial.sharePercent > 0,
    companySharePercent: commercial.sharePercent,
    status,
    cancelled: isCancelled,
    createdAt: project.createdAt || project.raw?.createdAt || project.raw?.created_at || null,
    reservationsTotal: Number((commercial.agg.equipment + commercial.agg.crew).toFixed(2)),
    expensesTotal: getProjectExpenses(project),
    servicesClientPrice: commercial.servicesRevenue,
    taxAmount: commercial.taxAmount,
    combinedTaxAmount: commercial.taxAmount,
    overallTotal: commercial.finalTotal,
    paidValue: paidAmount,
    unpaidValue: Math.max(0, Number((commercial.finalTotal - paidAmount).toFixed(2))),
    revenueExTax,
    netProfit,
    marginPercent,
    reservationsCount: reservations.length,
    technicians: Array.isArray(project.technicians) ? [...project.technicians] : [],
    techniciansDetails: Array.isArray(project.techniciansDetails) ? [...project.techniciansDetails] : [],
  };
}

function setupFilters() {
  setupReportFilters({
    dom,
    filters: state.filters,
    renderAll: () => {
      state.tablePagination.page = 1;
      renderAll();
    },
    getCurrentLanguage,
  });
}

function setupFilterToggle() {
  const card = document.querySelector('.project-filters-compact--reports');
  const body = card?.querySelector('.reports-filters-body');
  const header = card?.querySelector('.reports-filters-card__header');
  const toggleBtn = card?.querySelector('.reports-filters-toggle');
  const resetBtn = document.getElementById('reports-filter-reset');
  bindReportsFilterToggle({
    card,
    body,
    header,
    toggleBtn,
    resetBtn,
    transitionMs: 300,
  });
}

function syncComparisonUiState() {
  const hasComparison = state.filters.comparison && state.filters.comparison !== 'none';
  if (dom.dateRange) dom.dateRange.disabled = Boolean(hasComparison);
  if (dom.startDate) dom.startDate.disabled = Boolean(hasComparison);
  if (dom.endDate) dom.endDate.disabled = Boolean(hasComparison);
  dom.customRangeWrapper?.classList.toggle('is-disabled', Boolean(hasComparison));
}

function syncFiltersToDom() {
  if (dom.search) dom.search.value = state.filters.search || '';
  if (dom.payment) {
    dom.payment.value = state.filters.payment || 'all';
    refreshEnhancedSelect(dom.payment);
  }
  if (dom.confirmed) {
    dom.confirmed.value = state.filters.confirmed || 'all';
    refreshEnhancedSelect(dom.confirmed);
  }
  if (dom.dateRange) {
    dom.dateRange.value = state.filters.range || 'all';
    refreshEnhancedSelect(dom.dateRange);
  }
  if (dom.comparison) {
    dom.comparison.value = state.filters.comparison || 'none';
    refreshEnhancedSelect(dom.comparison);
  }
  if (dom.startDate) dom.startDate.value = state.filters.startDate || '';
  if (dom.endDate) dom.endDate.value = state.filters.endDate || '';
  dom.customRangeWrapper?.classList.toggle('active', state.filters.range === 'custom' && state.filters.comparison === 'none');
  syncComparisonUiState();
}

function resetReportFilters({ shouldRender = true } = {}) {
  state.filters.search = DEFAULT_REPORT_FILTERS.search;
  state.filters.statuses = [...DEFAULT_REPORT_FILTERS.statuses];
  state.filters.payment = DEFAULT_REPORT_FILTERS.payment;
  state.filters.confirmed = DEFAULT_REPORT_FILTERS.confirmed;
  state.filters.range = DEFAULT_REPORT_FILTERS.range;
  state.filters.comparison = DEFAULT_REPORT_FILTERS.comparison;
  state.filters.startDate = DEFAULT_REPORT_FILTERS.startDate;
  state.filters.endDate = DEFAULT_REPORT_FILTERS.endDate;
  state.tablePagination.page = 1;
  cacheReportFilterDomRefs();
  syncFiltersToDom();
  updateStatusChipsActive();
  if (shouldRender) renderAll();
}

function setupFilterReset() {
  if (!dom.resetBtn || dom.resetBtn.dataset.bound === 'true') return;
  dom.resetBtn.addEventListener('click', () => {
    resetReportFilters();
  });
  dom.resetBtn.dataset.bound = 'true';
}

function setupManualRefresh() {
  if (!dom.refreshBtn || dom.refreshBtn.dataset.bound === 'true') return;
  dom.refreshBtn.addEventListener('click', () => {
    handleDataMutation().catch((error) => {
      console.error('❌ [projectsReports] Manual refresh failed', error);
    });
  });
  dom.refreshBtn.dataset.bound = 'true';
}

function setupComparisonFilter() {
  if (!dom.comparison || dom.comparison.dataset.bound === 'true') return;
  dom.comparison.addEventListener('change', () => {
    state.filters.comparison = dom.comparison?.value || 'none';
    state.tablePagination.page = 1;
    syncFiltersToDom();
    renderAll();
  });
  dom.comparison.dataset.bound = 'true';
}

function ensureCustomRangePickersWrapper() {
  ensureCustomRangePickers({
    dom,
    filters: state.filters,
    renderAll,
    getCurrentLanguage,
  });
}

async function handleDataMutation() {
  // Throttle and prevent re-entrancy to avoid request storms
  const now = Date.now();
  if (__mutationRefreshInFlight) {
    return; // already refreshing; next event will render from final state
  }
  if (now - __lastMutationRefreshAt < MUTATION_REFRESH_MIN_INTERVAL_MS) {
    // Too soon since last refresh; just re-render from current cache
    loadAllData();
    renderAll();
    return;
  }

  __mutationRefreshInFlight = true;
  beginChartsLoading();
  try {
    await Promise.all([
      refreshProjectsFromApi(),
      refreshReservationsFromApi(),
    ]);
  } catch (error) {
    console.error('❌ [projectsReports] Data mutation refresh failed', error);
    if (isProjectApiError(error)) {
      console.warn('Projects API error:', error.message);
    }
  } finally {
    __lastMutationRefreshAt = Date.now();
    __mutationRefreshInFlight = false;
    loadAllData();
    renderAll();
    endChartsLoading();
  }
}

function handleLanguageChanged() {
  syncProjectsReportsWrapperDirection();
  renderStatusChips();
  syncFiltersToDom();
  renderAll();
}

function handleStorageSync(event) {
  if (event.key && !['projects', 'reservations', 'customers'].includes(event.key)) return;
  handleDataMutation().catch((error) => {
    console.error('❌ [projectsReports] Storage sync failed', error);
  });
}

function renderAll() {
  const dataset = getReportDataset();
  const filtered = dataset.currentProjects;
  updateStatusChipsActive();
  renderKpis(filtered, dataset);
  renderTimelineChart(filtered, dataset);
  renderProfitabilityChart(filtered);
  renderStatusChart(dataset.statusProjects);
  renderProjectTypeChart(filtered);
  renderClientsChart(filtered);
  renderTable(filtered);
  updateSortIndicators();
}

function buildScopedFilters(period = 'current') {
  const baseFilters = {
    ...state.filters,
    statuses: [...state.filters.statuses],
  };
  const comparisonMode = state.filters.comparison || 'none';
  if (comparisonMode === 'none') {
    return baseFilters;
  }

  const windows = buildComparisonWindows(comparisonMode, new Date());
  const window = period === 'previous' ? windows.previous : windows.current;
  if (!window) return baseFilters;

  return {
    ...baseFilters,
    range: 'custom',
    startDate: formatInputDate(window.start),
    endDate: formatInputDate(window.end),
  };
}

function getReportDataset() {
  const currentFilters = buildScopedFilters('current');
  const previousFilters = state.filters.comparison && state.filters.comparison !== 'none'
    ? buildScopedFilters('previous')
    : null;
  const currentProjects = filterProjectsForReports(state.projects, currentFilters);
  const previousProjects = previousFilters ? filterProjectsForReports(state.projects, previousFilters) : [];
  const statusProjects = filterProjectsForReports(state.projects, {
    ...currentFilters,
    statuses: [...STATUS_OPTIONS],
  });
  return {
    currentProjects,
    previousProjects,
    statusProjects,
    comparisonMode: state.filters.comparison || 'none',
  };
}

function buildComparisonLegendLabel() {
  if (state.filters.comparison === 'month') {
    return t('projects.reports.comparison.month', getCurrentLanguage() === 'ar' ? 'هذا الشهر مقابل الشهر الماضي' : 'This month vs last month');
  }
  if (state.filters.comparison === 'year') {
    return t('projects.reports.comparison.year', getCurrentLanguage() === 'ar' ? 'هذه السنة مقابل السنة الماضية' : 'This year vs last year');
  }
  return '';
}

function getReportRangeSummaryLabel() {
  if (state.filters.comparison === 'month') {
    return t('projects.reports.header.range.month', getCurrentLanguage() === 'ar' ? 'هذا الشهر' : 'This month');
  }
  if (state.filters.comparison === 'year') {
    return t('projects.reports.header.range.year', getCurrentLanguage() === 'ar' ? 'هذه السنة' : 'This year');
  }

  const { range, startDate, endDate } = state.filters;

  if (range === 'custom') {
    const formattedRange = formatProjectPeriod(startDate || null, endDate || null);
    return formattedRange === '—'
      ? t('projects.reports.header.range.custom', getCurrentLanguage() === 'ar' ? 'تاريخ مخصص' : 'Custom range')
      : formattedRange;
  }

  const fallbackMap = {
    all: getCurrentLanguage() === 'ar' ? 'كل الوقت' : 'All time',
    30: getCurrentLanguage() === 'ar' ? 'آخر 30 يوم' : 'Last 30 days',
    90: getCurrentLanguage() === 'ar' ? 'آخر 90 يوم' : 'Last 90 days',
    365: getCurrentLanguage() === 'ar' ? 'آخر سنة' : 'Last year',
  };

  return t(`projects.reports.header.range.${range}`, fallbackMap[range] || fallbackMap.all);
}

function getProjectStatusSummary(projects) {
  return projects.reduce((accumulator, project) => {
    const status = determineProjectStatus(project);
    if (Object.prototype.hasOwnProperty.call(accumulator, status)) {
      accumulator[status] += 1;
    }
    return accumulator;
  }, {
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  });
}

function renderExecutiveSummary(projects, dataset) {
  if (!dom.headerSummary) return;

  const isArabic = getCurrentLanguage() === 'ar';
  const statusSummary = getProjectStatusSummary(projects);
  const comparisonLabel = buildComparisonLegendLabel();
  const comparisonAnalytics = getComparisonAnalytics(dataset, projects);
  const actionableSummary = computeActionableProjectsSummary(projects, (project) => assessProjectAttention(project, {
    computeMetrics: computeDisplayMetrics,
    resolveProjectPaymentState,
  }));
  const assignedTeamSummary = computeAssignedTeamSummary(projects);
  const quickFacts = [
    {
      key: 'range',
      label: t('projects.reports.header.scope', getCurrentLanguage() === 'ar' ? 'النطاق الحالي' : 'Current scope'),
      value: getReportRangeSummaryLabel(),
      tone: REPORTS_METRIC_TONES.neutral,
      meta: comparisonLabel || t(
        'projects.reports.header.scopeMeta',
        isArabic ? 'النطاق الزمني المطبق على هذا التقرير' : 'The date scope applied to this report',
      ),
    },
    {
      key: 'projects',
      label: t('projects.reports.header.projects', getCurrentLanguage() === 'ar' ? 'المشاريع ضمن العرض' : 'Projects in view'),
      value: formatNumber(projects.length),
      tone: REPORTS_METRIC_TONES.count,
      meta: comparisonAnalytics.projectCountDelta
        ? `${t('projects.reports.header.projectsMeta', isArabic ? 'بعد تطبيق البحث والفلاتر الحالية' : 'After applying the current search and filters')} • ${comparisonAnalytics.projectCountDelta.diff >= 0 ? '+' : ''}${formatNumber(comparisonAnalytics.projectCountDelta.diff)} ${isArabic ? 'مقارنة بالفترة السابقة' : 'vs previous period'}`
        : t(
            'projects.reports.header.projectsMeta',
            isArabic ? 'بعد تطبيق البحث والفلاتر الحالية' : 'After applying the current search and filters',
          ),
    },
    {
      key: 'actions',
      label: t('projects.reports.header.actions', isArabic ? 'مشاريع تحتاج إجراء' : 'Projects needing action'),
      value: formatNumber(actionableSummary.actionCount),
      tone: actionableSummary.actionCount > 0 ? REPORTS_METRIC_TONES.risk : REPORTS_METRIC_TONES.count,
      meta: actionableSummary.actionCount > 0
        ? `${isArabic ? 'إيراد معرّض للمراجعة' : 'Revenue under review'}: ${formatCurrency(actionableSummary.actionRevenue)}`
        : t('projects.reports.header.actionsMetaSafe', isArabic ? 'لا توجد مشاريع تتطلب تصعيداً حالياً' : 'No projects currently need escalation'),
    },
    {
      key: 'team',
      label: t('projects.reports.header.team', isArabic ? 'أعضاء الفريق المعيّنون' : 'Assigned team'),
      value: formatNumber(assignedTeamSummary.uniqueMembers),
      tone: REPORTS_METRIC_TONES.count,
      meta: `${formatNumber(assignedTeamSummary.assignments)} ${t('projects.reports.header.teamAssignments', isArabic ? 'إسناد داخل المشاريع الحالية' : 'assignments across the current scope')}`,
    },
  ];
  const statusCards = [
    {
      key: 'completed',
      tone: REPORTS_METRIC_TONES.profit,
      label: t('projects.status.completed', isArabic ? 'مكتمل' : 'Completed'),
      value: formatNumber(statusSummary.completed),
      meta: t(
        'projects.reports.header.status.completed.meta',
        isArabic ? 'أغلقت فترة التنفيذ الخاصة بها' : 'Delivery windows that already closed',
      ),
    },
    {
      key: 'upcoming',
      tone: REPORTS_METRIC_TONES.count,
      label: t('projects.status.upcoming', isArabic ? 'قادم' : 'Coming'),
      value: formatNumber(statusSummary.upcoming),
      meta: t(
        'projects.reports.header.status.upcoming.meta',
        isArabic ? 'مشاريع مجدولة للفترة المقبلة' : 'Projects scheduled for the next period',
      ),
    },
    {
      key: 'ongoing',
      tone: REPORTS_METRIC_TONES.cost,
      label: t('projects.status.ongoing', isArabic ? 'قيد التنفيذ' : 'In Progress'),
      value: formatNumber(statusSummary.ongoing),
      meta: t(
        'projects.reports.header.status.ongoing.meta',
        isArabic ? 'مشاريع جارية داخل نافذة التنفيذ' : 'Projects currently active in delivery',
      ),
    },
  ];

  dom.headerSummary.innerHTML = `
    <div class="reports-stat-bar">
      ${renderComparisonCallouts(comparisonAnalytics, isArabic)}
      <div class="reports-stat-bar__inner">
        <div class="reports-stat-group reports-stat-group--status">
          <span class="reports-stat-group__eyebrow">${escapeHtml(t('projects.reports.header.statusEyebrow', isArabic ? 'حالة المشاريع' : 'Project status'))}</span>
          <div class="reports-stat-group__items">
            ${statusCards.map(({ key, label, value, meta, tone }) => `
              <article class="reports-stat-chip" data-status-card="${escapeHtml(key)}" data-tone="${escapeHtml(tone)}" title="${escapeHtml(meta)}">
                <strong class="reports-stat-chip__value">${escapeHtml(value)}</strong>
                <span class="reports-stat-chip__label">${escapeHtml(label)}</span>
                <span class="reports-stat-chip__meta">${escapeHtml(meta)}</span>
              </article>
            `).join('')}
          </div>
        </div>
        <div class="reports-stat-bar__divider" role="separator" aria-hidden="true"></div>
        <div class="reports-stat-group reports-stat-group--context">
          <span class="reports-stat-group__eyebrow">${escapeHtml(t('projects.reports.header.contextEyebrow', isArabic ? 'معلومات سريعة' : 'Quick facts'))}</span>
          <div class="reports-stat-group__items">
            ${quickFacts.map(({ key, label, value, tone, meta }) => `
              <article class="reports-stat-chip" data-summary-item="${escapeHtml(key)}" data-tone="${escapeHtml(tone)}" title="${escapeHtml(meta)}">
                <strong class="reports-stat-chip__value">${escapeHtml(value)}</strong>
                <span class="reports-stat-chip__label">${escapeHtml(label)}</span>
                <span class="reports-stat-chip__meta">${escapeHtml(meta)}</span>
              </article>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function computeDisplayMetrics(project) {
  return {
    marginPercent: Number.isFinite(Number(project?.marginPercent)) ? Number(project.marginPercent) : 0,
    netProfit: Number.isFinite(Number(project?.netProfit)) ? Number(project.netProfit) : 0,
    resFinal: Number(project?.reservationsTotal || 0) || 0,
    resTax: Number(project?.taxAmount || 0) || 0,
    resNetRevenue: Number(project?.revenueExTax || 0) || 0,
    equipmentEstimate: Number(project?.raw?.equipmentEstimate ?? project?.equipmentEstimate ?? 0) || 0,
    servicesRevenue: Number(project?.servicesClientPrice || 0) || 0,
    projectExpenses: Number(project?.expensesTotal || 0) || 0,
  };
}

function buildDeltaBadge(currentValue, previousValue, options = {}) {
  const { whenHigherIsBetter = true } = options;
  if (!Number.isFinite(Number(previousValue)) || previousValue === 0) return '';
  const delta = computeMetricDelta(currentValue, previousValue);
  if (delta.percent == null || !Number.isFinite(delta.percent)) return '';
  const isPositive = whenHigherIsBetter ? delta.diff >= 0 : delta.diff <= 0;
  const tone = delta.diff === 0 ? 'neutral' : (isPositive ? 'positive' : 'negative');
  const arrow = delta.diff === 0 ? '•' : (delta.diff > 0 ? '↑' : '↓');
  return {
    tone,
    text: `${arrow} ${formatPercent(Math.abs(delta.percent))}`,
  };
}

function getComparisonAnalytics(dataset, currentProjects, currentBreakdown = null) {
  const hasComparison = Array.isArray(dataset?.previousProjects) && dataset.previousProjects.length > 0;
  const resolvedCurrentBreakdown = currentBreakdown || computeProjectsRevenueBreakdown(currentProjects, state.reservations, PROJECT_TAX_RATE);
  if (!hasComparison) {
    return {
      hasComparison: false,
      currentBreakdown: resolvedCurrentBreakdown,
      previousBreakdown: null,
      currentCollection: computeCollectionSummary(currentProjects),
      previousCollection: null,
      currentAverageProjectValue: computeAverageProjectValue(currentProjects),
      previousAverageProjectValue: 0,
      currentRepeatShare: computeRepeatClientRevenueShare(currentProjects, state.projects),
      previousRepeatShare: null,
      projectCountDelta: null,
    };
  }

  return {
    hasComparison: true,
    currentBreakdown: resolvedCurrentBreakdown,
    previousBreakdown: computeProjectsRevenueBreakdown(dataset.previousProjects, state.reservations, PROJECT_TAX_RATE),
    currentCollection: computeCollectionSummary(currentProjects),
    previousCollection: computeCollectionSummary(dataset.previousProjects),
    currentAverageProjectValue: computeAverageProjectValue(currentProjects),
    previousAverageProjectValue: computeAverageProjectValue(dataset.previousProjects),
    currentRepeatShare: computeRepeatClientRevenueShare(currentProjects, state.projects),
    previousRepeatShare: computeRepeatClientRevenueShare(dataset.previousProjects, state.projects),
    projectCountDelta: computeMetricDelta(currentProjects.length, dataset.previousProjects.length),
  };
}

function renderComparisonCallouts(analytics, isArabic) {
  if (!analytics.hasComparison) return '';
  const comparisonLabel = buildComparisonLegendLabel();
  const callouts = [
    {
      key: 'revenue',
      label: t('projects.reports.comparison.revenue', isArabic ? 'الإيراد' : 'Revenue'),
      current: formatCurrency(analytics.currentBreakdown?.grossRevenue || 0),
      previous: formatCurrency(analytics.previousBreakdown?.grossRevenue || 0),
      delta: buildDeltaBadge(analytics.currentBreakdown?.grossRevenue || 0, analytics.previousBreakdown?.grossRevenue || 0, { whenHigherIsBetter: true }),
    },
    {
      key: 'profit',
      label: t('projects.reports.comparison.profit', isArabic ? 'صافي الربح' : 'Net profit'),
      current: formatCurrency(analytics.currentBreakdown?.netProfit || 0),
      previous: formatCurrency(analytics.previousBreakdown?.netProfit || 0),
      delta: buildDeltaBadge(analytics.currentBreakdown?.netProfit || 0, analytics.previousBreakdown?.netProfit || 0, { whenHigherIsBetter: true }),
    },
    {
      key: 'collection',
      label: t('projects.reports.comparison.collection', isArabic ? 'التحصيل' : 'Collection rate'),
      current: formatPercent(analytics.currentCollection?.collectionRate || 0),
      previous: formatPercent(analytics.previousCollection?.collectionRate || 0),
      delta: buildDeltaBadge(analytics.currentCollection?.collectionRate || 0, analytics.previousCollection?.collectionRate || 0, { whenHigherIsBetter: true }),
    },
  ];
  return `
    <div class="reports-comparison-strip" aria-label="${escapeHtml(comparisonLabel)}">
      ${callouts.map(({ key, label, current, previous, delta }) => `
        <article class="reports-comparison-pill" data-comparison="${key}">
          <span class="reports-comparison-pill__label">${escapeHtml(label)}</span>
          <strong class="reports-comparison-pill__current">${escapeHtml(current)}</strong>
          <span class="reports-comparison-pill__previous">${escapeHtml(isArabic ? 'السابق' : 'Previous')}: ${escapeHtml(previous)}</span>
          ${delta ? `<span class="reports-kpi-delta reports-kpi-delta--${delta.tone}">${escapeHtml(delta.text)} ${escapeHtml(comparisonLabel)}</span>` : ''}
        </article>
      `).join('')}
    </div>
  `;
}

function renderKpis(projects, dataset) {
  if (!dom.kpiGrid) return;
  const breakdown = computeProjectsRevenueBreakdown(projects, state.reservations, PROJECT_TAX_RATE);
  const comparisonLabel = buildComparisonLegendLabel();
  const comparisonAnalytics = getComparisonAnalytics(dataset, projects, breakdown);
  const previousBreakdown = comparisonAnalytics.previousBreakdown;
  const grossRevenue = breakdown.grossRevenue;
  const unpaidValue = breakdown.outstandingTotal || 0;
  const expensesTotal = breakdown.projectExpensesTotal || 0;
  const netProfit = breakdown.netProfit || 0;
  const isArabic = getCurrentLanguage() === 'ar';
  const collection = comparisonAnalytics.currentCollection;
  const previousCollection = comparisonAnalytics.previousCollection;
  const averageProjectValue = comparisonAnalytics.currentAverageProjectValue;
  const previousAverageProjectValue = comparisonAnalytics.previousAverageProjectValue;
  const repeatShare = comparisonAnalytics.currentRepeatShare;
  const previousRepeatShare = comparisonAnalytics.previousRepeatShare;
  const hasExpenseData = expensesTotal > 0;

  // Collected profit = proportional share of net profit based on how much has actually been paid.
  // Uses collection rate as a proxy: if 36% of invoices are paid, ~36% of profit is realized.
  const collectedProfit = netProfit >= 0
    ? Math.round(netProfit * (collection.collectionRate / 100))
    : Math.round(netProfit);
  const collectionIsLow = collection.collectionRate < 60;

  const cards = [
    {
      key: 'netProfit',
      tone: netProfit >= 0 ? REPORTS_METRIC_TONES.profit : REPORTS_METRIC_TONES.risk,
      icon: KPI_ICONS.value,
      label: t('projects.reports.kpi.netProfit', isArabic ? 'صافي الربح' : 'Net profit'),
      value: formatCurrency(netProfit),
      meta: `${t('projects.reports.kpi.margin', isArabic ? 'هامش الربح' : 'Profit margin')}: ${formatPercent(breakdown.profitMarginPercent)}`,
      featured: true,
      delta: previousBreakdown ? buildDeltaBadge(netProfit, previousBreakdown.netProfit, { whenHigherIsBetter: true }) : null,
      splitMetric: {
        label: isArabic ? 'المحصّل فعلاً' : 'Actually collected',
        value: formatCurrency(collectedProfit),
        meta: `${formatPercent(collection.collectionRate)} ${isArabic ? 'تحصيل' : 'collected'}`,
        collectionLow: collectionIsLow,
      },
    },
    {
      key: 'grossRevenue',
      tone: REPORTS_METRIC_TONES.revenue,
      icon: KPI_ICONS.value,
      label: t('projects.reports.kpi.grossRevenue', isArabic ? 'الإيراد الكلي' : 'Gross revenue'),
      value: formatCurrency(grossRevenue),
      meta: t('projects.reports.kpi.grossRevenueMeta', isArabic ? 'إجمالي القيمة المفوترة ضمن النتائج الحالية' : 'Total billed value inside the current result set'),
      delta: previousBreakdown ? buildDeltaBadge(grossRevenue, previousBreakdown.grossRevenue, { whenHigherIsBetter: true }) : null,
    },
    {
      key: 'margin',
      tone: breakdown.profitMarginPercent >= 0 ? REPORTS_METRIC_TONES.profit : REPORTS_METRIC_TONES.risk,
      icon: KPI_ICONS.margin,
      label: t('projects.reports.kpi.margin', 'هامش الربح'),
      value: formatPercent(breakdown.profitMarginPercent),
      meta: t('projects.reports.kpi.marginMetaRefined', isArabic ? 'سرعة قراءة كفاءة التسعير والتنفيذ' : 'Quickest way to read pricing and delivery efficiency'),
      delta: previousBreakdown ? buildDeltaBadge(breakdown.profitMarginPercent, previousBreakdown.profitMarginPercent, { whenHigherIsBetter: true }) : null,
    },
    {
      key: 'collectionRate',
      tone: collection.collectionRate >= 80 ? REPORTS_METRIC_TONES.revenue : REPORTS_METRIC_TONES.risk,
      icon: KPI_ICONS.projects,
      label: t('projects.reports.kpi.collectionRate', isArabic ? 'معدل التحصيل' : 'Collection rate'),
      value: formatPercent(collection.collectionRate),
      meta: `${isArabic ? 'تم تحصيل' : 'Collected'} ${formatCurrency(collection.collected)} ${isArabic ? 'من' : 'of'} ${formatCurrency(collection.invoiced)}`,
      delta: previousCollection ? buildDeltaBadge(collection.collectionRate, previousCollection.collectionRate, { whenHigherIsBetter: true }) : null,
    },
    {
      key: 'outstanding',
      tone: REPORTS_METRIC_TONES.risk,
      icon: KPI_ICONS.outstanding,
      label: t('projects.reports.kpi.unpaidValue', isArabic ? 'قيمة غير مدفوعة' : 'Outstanding value'),
      value: formatCurrency(unpaidValue),
      meta: t('projects.reports.kpi.unpaidValueMetaRefined', isArabic ? 'الرصيد الذي ما زال يحتاج متابعة تحصيل' : 'Balance that still needs payment follow-up'),
      delta: previousBreakdown ? buildDeltaBadge(unpaidValue, previousBreakdown.outstandingTotal || 0, { whenHigherIsBetter: false }) : null,
    },
    {
      key: 'averageValue',
      tone: REPORTS_METRIC_TONES.count,
      icon: KPI_ICONS.value,
      label: t('projects.reports.kpi.averageValue', isArabic ? 'متوسط قيمة المشروع' : 'Average project value'),
      value: formatCurrency(averageProjectValue),
      meta: t('projects.reports.kpi.averageValueMeta', isArabic ? 'متوسط قيمة الصفقة داخل النطاق الحالي' : 'Average deal size within the current scope'),
      delta: previousAverageProjectValue > 0 ? buildDeltaBadge(averageProjectValue, previousAverageProjectValue, { whenHigherIsBetter: true }) : null,
    },
    {
      key: 'repeatShare',
      tone: REPORTS_METRIC_TONES.count,
      icon: KPI_ICONS.projects,
      label: t('projects.reports.kpi.repeatShare', isArabic ? 'إيراد العملاء المتكررين' : 'Repeat-client revenue'),
      value: formatPercent(repeatShare.repeatRevenueShare),
      meta: `${isArabic ? 'إيراد متكرر' : 'Repeat revenue'} ${formatCurrency(repeatShare.repeatRevenue)}`,
      delta: previousRepeatShare ? buildDeltaBadge(repeatShare.repeatRevenueShare, previousRepeatShare.repeatRevenueShare, { whenHigherIsBetter: true }) : null,
    },
    {
      key: 'expenses',
      tone: hasExpenseData ? REPORTS_METRIC_TONES.cost : REPORTS_METRIC_TONES.neutral,
      icon: KPI_ICONS.expenses,
      label: t('projects.reports.kpi.expenses', 'تكلفة الخدمات الإنتاجية'),
      value: hasExpenseData
        ? formatCurrency(expensesTotal)
        : t('projects.reports.kpi.notApplicable', isArabic ? 'غير متاح' : 'N/A'),
      meta: hasExpenseData
        ? t('projects.reports.kpi.expensesMetaRefined', isArabic ? 'تكاليف التنفيذ المباشرة المرتبطة بالمشاريع الحالية' : 'Direct delivery costs tied to the current projects')
        : t('projects.reports.kpi.expensesMetaMissing', isArabic ? 'لا توجد بيانات تكلفة إنتاجية مسجلة داخل هذا النطاق' : 'No production-cost entries are recorded inside this scope'),
    },
  ];

  renderExecutiveSummary(projects, dataset);

  const renderKpiCard = ({ key, icon, label, value, meta, tone, featured, delta, splitMetric }) => `
    <article
      class="reports-kpi-card glass-card${featured ? ' reports-kpi-card--featured' : ''}"
      data-kpi="${key}"
      data-tone="${tone}"
      ${featured ? 'data-featured="true"' : ''}
    >
      <div class="reports-kpi-card__header">
        <div class="reports-kpi-icon">${icon}</div>
        <div class="reports-kpi-card__header-tags">
          <span class="reports-kpi-card__tag">${escapeHtml(featured
          ? t('projects.reports.kpi.priority', isArabic ? 'المؤشر الأهم' : 'Priority metric')
          : t('projects.reports.kpi.tag', isArabic ? 'ملخص مالي' : 'Financial summary'))}</span>
          ${delta && comparisonLabel ? `<span class="reports-kpi-delta reports-kpi-delta--${delta.tone}">${escapeHtml(delta.text)} ${escapeHtml(comparisonLabel)}</span>` : ''}
        </div>
      </div>
      ${splitMetric ? `
      <div class="reports-kpi-content reports-kpi-content--split">
        <p class="reports-kpi-label">${escapeHtml(label)}</p>
        <div class="reports-kpi-split-row">
          <div class="reports-kpi-split-col reports-kpi-split-col--primary">
            <span class="reports-kpi-split-col__eyebrow">${escapeHtml(isArabic ? 'الكلي (على الورق)' : 'Total (on paper)')}</span>
            <p class="reports-kpi-value">
              <span class="reports-metric-badge reports-metric-badge--kpi">${escapeHtml(value)}</span>
            </p>
            <span class="reports-kpi-meta">${escapeHtml(meta)}</span>
          </div>
          <div class="reports-kpi-split-divider" aria-hidden="true"></div>
          <div class="reports-kpi-split-col reports-kpi-split-col--secondary" ${splitMetric.collectionLow ? 'data-collection-low="true"' : ''}>
            <span class="reports-kpi-split-col__eyebrow">${escapeHtml(splitMetric.label)}</span>
            <p class="reports-kpi-value">
              <span class="reports-metric-badge reports-metric-badge--kpi reports-metric-badge--collected">${escapeHtml(splitMetric.value)}</span>
            </p>
            <span class="reports-kpi-meta">${escapeHtml(splitMetric.meta)}</span>
          </div>
        </div>
      </div>
      ` : `
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${escapeHtml(label)}</p>
        <p class="reports-kpi-value">
          <span class="reports-metric-badge reports-metric-badge--kpi">${escapeHtml(value)}</span>
        </p>
        <span class="reports-kpi-meta">${escapeHtml(meta)}</span>
      </div>
      `}
    </article>
  `;

  // ── Guaranteed layout injection ─────────────────────────────────────────
  // Tailwind v4 / Vite CSS processing can reorder cascade rules and break
  // specificity overrides on .reports-kpi-grid.  Injecting a <style> element
  // at render-time is the only way to guarantee the grid layout is applied
  // regardless of external stylesheet ordering, HMR timing, or caching.
  let kpiLayoutStyle = document.getElementById('__reports-kpi-layout');
  if (!kpiLayoutStyle) {
    kpiLayoutStyle = document.createElement('style');
    kpiLayoutStyle.id = '__reports-kpi-layout';
    document.head.appendChild(kpiLayoutStyle);
  }
  kpiLayoutStyle.textContent = `
    /* KPI grid: two horizontal rows stacked vertically */
    #reports-kpi-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 14px !important;
    }
    /* Each row is a 4-column grid */
    #reports-kpi-grid .reports-kpi-band {
      display: grid !important;
      align-items: stretch !important;
      gap: 14px !important;
    }
    #reports-kpi-grid .reports-kpi-band--row1 {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    #reports-kpi-grid .reports-kpi-band--row2 {
      grid-template-columns: repeat(var(--kpi-row2-cols, 4), 1fr) !important;
    }
    /* Net-profit split card: force vertical stacking so both halves show
       clearly at ~260px card width (horizontal layout overflows at this size) */
    #reports-kpi-grid [data-kpi="netProfit"] .reports-kpi-split-row {
      flex-direction: column !important;
      gap: 8px !important;
    }
    #reports-kpi-grid [data-kpi="netProfit"] .reports-kpi-split-divider {
      width: auto !important;
      height: 1px !important;
      margin: 0 !important;
    }
    #reports-kpi-grid [data-kpi="netProfit"] .reports-kpi-split-col {
      padding-inline: 0 !important;
    }
    /* Tablet: 2 columns per row */
    @media (max-width: 1100px) {
      #reports-kpi-grid .reports-kpi-band {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    /* Mobile: horizontal snap-scroll carousel */
    @media (max-width: 640px) {
      #reports-kpi-grid .reports-kpi-band {
        display: flex !important;
        overflow-x: auto !important;
        scroll-snap-type: x mandatory !important;
        scrollbar-width: none !important;
        padding-bottom: 4px !important;
      }
      #reports-kpi-grid .reports-kpi-band::-webkit-scrollbar { display: none; }
      #reports-kpi-grid .reports-kpi-band .reports-kpi-card {
        flex: 0 0 min(240px, 82vw) !important;
        scroll-snap-align: start !important;
        min-height: 0 !important;
      }
    }
  `;

  // ── Two horizontal rows of 4 cards each ─────────────────────────────────
  // Row 1 – primary financial indicators: profit · revenue · margin · collection
  // Row 2 – operational context: outstanding · average · repeat · expenses
  const row1Keys  = new Set(['netProfit', 'grossRevenue', 'margin', 'collectionRate']);
  const row1Cards = cards.filter((c) => row1Keys.has(c.key));
  const row2Cards = cards.filter((c) => !row1Keys.has(c.key));

  dom.kpiGrid.innerHTML = `
    <div class="reports-kpi-band reports-kpi-band--row1">
      ${row1Cards.map(renderKpiCard).join('')}
    </div>
    <div class="reports-kpi-band reports-kpi-band--row2" style="--kpi-row2-cols:${row2Cards.length}">
      ${row2Cards.map(renderKpiCard).join('')}
    </div>
  `;

  // Inject a detailed revenue breakdown similar to reservations reports
  renderProjectsRevenueBreakdown(projects, dataset, comparisonAnalytics);
}

function renderProjectsRevenueBreakdown(projects, dataset, comparisonAnalyticsArg = null) {
  try {
    const isArabic = getCurrentLanguage() === 'ar';
    const isTablet = typeof window !== 'undefined' && window.matchMedia('(max-width: 1180px)').matches;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const breakdown = computeProjectsRevenueBreakdown(projects, state.reservations, PROJECT_TAX_RATE);
    const comparisonAnalytics = comparisonAnalyticsArg || getComparisonAnalytics(dataset || { previousProjects: [] }, projects, breakdown);
    const collection = computeCollectionSummary(projects);
    const containerId = 'projects-revenue-breakdown';
    let container = document.getElementById(containerId);
    const grossBeforeDiscount = (breakdown.crewTotal || 0) + (breakdown.equipmentTotalCombined || 0) + (breakdown.servicesRevenueTotal || 0);
    const finalBilledRevenue = breakdown.grossRevenue || 0;
    const totalCosts = (breakdown.crewCostTotal || 0) + (breakdown.equipmentCostTotalCombined || 0) + (breakdown.projectExpensesTotal || 0);
    const hasExpenseData = (breakdown.projectExpensesTotal || 0) > 0;
    const sections = [
      {
        key: 'revenue',
        title: t('projects.reports.bridge.sections.revenue', getCurrentLanguage() === 'ar' ? 'مصادر الإيراد' : 'Revenue sources'),
        meta: t('projects.reports.bridge.sections.revenueMeta', isArabic ? 'من أين تبدأ قيمة المشروع قبل التعديلات' : 'Where billed value starts before any adjustments'),
        rows: [
          { key: 'crewGross', label: t('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'), value: formatCurrency(breakdown.crewTotal), tone: 'primary' },
          { key: 'equipment', label: t('reservations.reports.kpi.revenue.details.equipmentGross', 'إجمالي المعدات', 'Equipment total'), value: formatCurrency(breakdown.equipmentTotalCombined), tone: 'primary' },
          { key: 'servicesRevenue', label: t('projects.reports.bridge.rows.servicesRevenue', getCurrentLanguage() === 'ar' ? 'إيراد الخدمات الإنتاجية' : 'Services revenue'), value: formatCurrency(breakdown.servicesRevenueTotal), tone: 'primary' },
          { key: 'grossBeforeDiscount', label: t('projects.reports.bridge.rows.grossBeforeDiscount', getCurrentLanguage() === 'ar' ? 'الإجمالي قبل الخصم' : 'Gross before discount'), value: formatCurrency(grossBeforeDiscount), tone: 'strong' },
        ],
      },
      {
        key: 'adjustments',
        title: t('projects.reports.bridge.sections.adjustments', getCurrentLanguage() === 'ar' ? 'تعديلات الفوترة' : 'Billing adjustments'),
        meta: t('projects.reports.bridge.sections.adjustmentsMeta', isArabic ? 'الخصومات والحصة والضريبة التي تغيّر الفاتورة النهائية' : 'Discounts, share, and VAT that reshape the final bill'),
        rows: [
          { key: 'discount', label: t('projects.details.summary.discount', 'الخصم', 'Discount'), value: `−${formatCurrency(breakdown.discountTotal || 0)}`, tone: 'warning' },
          { key: 'share', label: t('reservations.reports.kpi.revenue.details.share', 'المصاريف التشغيلية', 'Company overhead'), value: formatCurrency(breakdown.companyShareTotal), tone: 'primary' },
          { key: 'tax', label: t('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'), value: formatCurrency(breakdown.taxTotal), tone: 'primary' },
          { key: 'finalBilledRevenue', label: t('projects.reports.bridge.rows.finalBilledRevenue', getCurrentLanguage() === 'ar' ? 'الإيراد المفوتر النهائي' : 'Final billed revenue'), value: formatCurrency(finalBilledRevenue), tone: 'strong' },
        ],
      },
      {
        key: 'costs',
        title: t('projects.reports.bridge.sections.costs', getCurrentLanguage() === 'ar' ? 'تكاليف التنفيذ' : 'Delivery costs'),
        meta: t('projects.reports.bridge.sections.costsMeta', isArabic ? 'ما يُخصم لتوصيل المشروع وتنفيذه فعلياً' : 'What gets deducted to actually deliver the work'),
        rows: [
          { key: 'crew', label: t('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'), value: `−${formatCurrency(breakdown.crewCostTotal)}`, tone: 'warning' },
          {
            key: 'equipmentCost',
            label: (() => {
              const hasEquipmentRevenue = (breakdown.equipmentTotalCombined || 0) > 0;
              const missingCost = hasEquipmentRevenue && !(breakdown.equipmentCostTotalCombined || 0);
              const baseLabel = t('reservations.reports.kpi.revenue.details.equipment', 'تكلفة المعدات', 'Equipment cost');
              return missingCost
                ? `${baseLabel} ${isArabic ? '(تكلفة الشراء غير مسجّلة)' : '(purchase cost not entered)'}`
                : baseLabel;
            })(),
            value: `−${formatCurrency(breakdown.equipmentCostTotalCombined || 0)}`,
            tone: (() => {
              const hasEquipmentRevenue = (breakdown.equipmentTotalCombined || 0) > 0;
              const missingCost = hasEquipmentRevenue && !(breakdown.equipmentCostTotalCombined || 0);
              return missingCost ? 'neutral' : 'warning';
            })(),
          },
          {
            key: 'projectExpenses',
            label: t('projects.reports.kpi.revenue.details.projectExpenses', 'تكلفة الخدمات الإنتاجية', 'Project expenses'),
            value: hasExpenseData ? `−${formatCurrency(breakdown.projectExpensesTotal)}` : t('projects.reports.kpi.notApplicable', isArabic ? 'غير متاح' : 'N/A'),
            tone: hasExpenseData ? 'warning' : 'primary',
          },
          {
            key: 'totalCosts',
            label: t('projects.reports.bridge.rows.totalCosts', getCurrentLanguage() === 'ar' ? 'إجمالي التكاليف' : 'Total costs'),
            value: hasExpenseData ? `−${formatCurrency(totalCosts)}` : `−${formatCurrency((breakdown.crewCostTotal || 0) + (breakdown.equipmentCostTotalCombined || 0))}`,
            tone: 'strong-warning',
          },
        ],
      },
      {
        key: 'result',
        title: t('projects.reports.bridge.sections.result', getCurrentLanguage() === 'ar' ? 'النتيجة النهائية' : 'Final result'),
        meta: t('projects.reports.bridge.sections.resultMeta', isArabic ? 'الصافي الذي يبقى بعد الضريبة والتكاليف والتحصيل' : 'What remains after VAT, costs, and collection status'),
        rows: [
          { key: 'revenueExTax', label: t('projects.reports.bridge.rows.revenueExTax', getCurrentLanguage() === 'ar' ? 'الإيراد بدون الضريبة' : 'Revenue excl. VAT'), value: formatCurrency(breakdown.revenueExTax), tone: 'primary' },
          { key: 'collected', label: t('projects.reports.kpi.collectionRate', isArabic ? 'المبلغ المحصّل' : 'Collected amount'), value: formatCurrency(collection.collected), tone: 'success' },
          { key: 'outstanding', label: t('projects.reports.kpi.unpaidValue', getCurrentLanguage() === 'ar' ? 'قيمة غير مدفوعة' : 'Outstanding value'), value: formatCurrency(breakdown.outstandingTotal || 0), tone: 'warning' },
          { key: 'net', label: t('projects.reports.kpi.netProfit', getCurrentLanguage() === 'ar' ? 'صافي الربح' : 'Net profit'), value: formatCurrency(breakdown.netProfit), tone: breakdown.netProfit >= 0 ? 'success' : 'error' },
          { key: 'margin', label: t('projects.reports.kpi.margin', 'هامش الربح'), value: formatPercent(breakdown.profitMarginPercent), tone: 'strong' },
        ],
      },
    ];
    const detailsHtml = `
      <div id="${containerId}" class="reports-kpi-details reports-financial-bridge glass-card" style="display:grid; gap:18px; width:100%; max-width:100%; margin-inline:0; padding:20px; border:1px solid var(--bo-color-content-muted-border); border-radius:20px; background:var(--bo-color-content-muted-bg); box-shadow:var(--bo-color-content-shadow);">
        <div class="reports-financial-bridge__header" style="display:flex; align-items:flex-start; gap:16px; flex-wrap:wrap;">
          <div class="reports-financial-bridge__intro" style="display:flex; flex-direction:column; gap:6px; min-width:0; flex:1;">
            <h3 class="reports-financial-bridge__title">${escapeHtml(t('projects.reports.bridge.title', getCurrentLanguage() === 'ar' ? 'الجسر المالي للمشاريع' : 'Project financial bridge'))}</h3>
            <p class="reports-financial-bridge__subtitle">${escapeHtml(t('projects.reports.bridge.subtitle', getCurrentLanguage() === 'ar' ? 'اتبع مسار الإيراد من مصادره حتى صافي الربح لفهم أين يذهب المال بسرعة.' : 'Follow the money from revenue sources to final profit so the financial story is readable at a glance.'))}</p>
          </div>
        </div>
        <div class="reports-financial-bridge__sections" style="display:grid; grid-template-columns:${isTablet ? '1fr' : 'repeat(2, minmax(0, 1fr))'}; gap:14px; width:100%;">
          ${sections.map(({ key, title, meta, rows }, index) => `
            <section class="reports-financial-section" data-section="${key}" style="display:grid; gap:12px; padding:16px; border:1px solid var(--bo-color-content-muted-border); border-radius:18px; background:var(--bo-color-content-bg);">
              <div class="reports-financial-section__header" style="display:flex; align-items:flex-start; gap:12px;">
                <span class="reports-financial-section__step">${escapeHtml(String(index + 1).padStart(2, '0'))}</span>
                <div class="reports-financial-section__copy">
                  <h4 class="reports-financial-section__title">${escapeHtml(title)}</h4>
                  <p class="reports-financial-section__meta">${escapeHtml(meta)}</p>
                </div>
              </div>
              <div class="reports-financial-section__rows" style="display:grid; gap:8px;">
                ${rows.map(({ key: rowKey, label, value, tone }) => `
                  <div class="reports-kpi-detail-row reports-kpi-detail-row--${tone}" data-row="${rowKey}" style="display:flex; align-items:center; justify-content:space-between; gap:16px; padding:11px 12px; border:1px solid var(--bo-color-content-border); border-radius:14px; background:color-mix(in srgb, var(--bo-color-content-muted-bg) 72%, var(--bo-color-content-bg));">
                    <span class="reports-kpi-detail-label">${escapeHtml(label)}</span>
                    <span class="reports-kpi-detail-value">
                      <span class="reports-financial-chip reports-financial-chip--${tone}">${escapeHtml(value)}</span>
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          `).join('')}
        </div>
      </div>
    `;

    if (!container) {
      dom.kpiGrid.insertAdjacentHTML('afterend', detailsHtml);
    } else {
      container.outerHTML = detailsHtml;
    }
  } catch (error) {
    console.warn('[projectsReports] Failed to render revenue breakdown', error);
  }
}

function renderStatusChips() {
  if (!dom.statusChips) return;
  const chipsHtml = STATUS_OPTIONS.map((status) => {
    const label = t(`projects.status.${status}`, status);
    return `<span class="reports-status-chip timeline-status-badge timeline-status-badge--${status}" data-status="${status}" role="button" tabindex="0">${escapeHtml(label)}</span>`;
  }).join('');
  dom.statusChips.innerHTML = chipsHtml;
  if (!dom.statusChips.dataset.listenerAttached) {
    dom.statusChips.addEventListener('click', handleStatusChipClick);
    dom.statusChips.dataset.listenerAttached = 'true';
  }
  updateStatusChipsActive();
}

function handleStatusChipClick(event) {
  const target = event.target.closest('[data-status]');
  if (!target) return;
  const value = target.dataset.status;
  if (!value) return;
  const current = new Set(state.filters.statuses);
  if (current.has(value)) {
    current.delete(value);
  } else {
    current.add(value);
  }
  if (current.size === 0) {
    STATUS_OPTIONS.forEach((status) => current.add(status));
  }
  state.filters.statuses = Array.from(current);
  state.tablePagination.page = 1;
  updateStatusChipsActive();
  renderAll();
}

function updateStatusChipsActive() {
  if (!dom.statusChips) return;
  const activeSet = new Set(state.filters.statuses);
  dom.statusChips.querySelectorAll('[data-status]').forEach((chip) => {
    chip.classList.toggle('is-active', activeSet.has(chip.dataset.status));
  });
}

function renderStatusChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-status-chart');
  if (!container) return;
  const isArabic = getCurrentLanguage() === 'ar';
  const isFiltered = state.filters.statuses.length !== STATUS_OPTIONS.length;
  const selectedStatuses = isFiltered
    ? t('projects.reports.status.filtered', isArabic
      ? 'هذا المخطط يعرض توزيع كل الحالات بغض النظر عن فلتر الحالة المطبّق على الجدول.'
      : 'This chart shows all statuses regardless of the status filter applied to the table.')
    : t('projects.reports.status.all', isArabic ? 'يعرض كل الحالات داخل النطاق الحالي.' : 'Showing all statuses inside the current scope.');
  if (dom.statusChartNote) {
    dom.statusChartNote.textContent = selectedStatuses;
    dom.statusChartNote.style.fontWeight = isFiltered ? '600' : '';
    dom.statusChartNote.style.color = isFiltered ? 'var(--reports-warning, #f08c00)' : '';
  }
  renderApexChart({
    ChartLib,
    charts,
    key: 'status',
    element: container,
    options: buildStatusChartOptions(projects, { t, formatCompactNumber, formatCurrency }),
  });
}

function renderTimelineChart(projects, dataset) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-timeline-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'timeline',
    element: container,
    options: buildTimelineChartOptions(projects, {
      t,
      formatCompactNumber,
      formatCurrency,
      getChartLocale,
    }, {
      comparisonMode: dataset.comparisonMode,
      previousProjects: dataset.previousProjects,
    }),
  });
}

function renderProfitabilityChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-profitability-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'profitability',
    element: container,
    options: buildProfitabilityChartOptions(projects, { t, formatCompactNumber, formatCurrency }),
  });
}

function renderClientsChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-clients-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'clients',
    element: container,
    options: buildClientsChartOptions(projects, { t, formatCompactNumber, formatCurrency }),
  });
}

function renderProjectTypeChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-types-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'types',
    element: container,
    options: buildProjectTypeChartOptions(projects, { t, formatCompactNumber, formatCurrency }),
  });
}

function setupExport() {
  if (!dom.exportExcelBtn || dom.exportExcelBtn.dataset.bound === 'true') return;
  dom.exportExcelBtn.addEventListener('click', async () => {
    try {
      const filtered = getReportDataset().currentProjects;
      await exportProjectsToExcel(filtered);
    } catch (error) {
      console.error('❌ [projectsReports] Failed to export Excel', error);
      try { alert('تعذر تصدير البيانات.'); } catch (_) {}
    }
  });
  dom.exportExcelBtn.dataset.bound = 'true';
}

function setupPrint() {
  if (!dom.printBtn || dom.printBtn.dataset.bound === 'true') return;
  dom.printBtn.addEventListener('click', () => {
    exportReportsAsPdf();
  });
  dom.printBtn.dataset.bound = 'true';
}

// ─── PDF Export ─────────────────────────────────────────────────────────────
//
// Strategy: build the PDF entirely from computed state data — no screen clone.
// This avoids dark-theme contamination, CSS variables, oklch colors, and
// layout artefacts from the interactive UI.  All colors are hard-coded hex so
// html2canvas v1 never encounters a value it cannot parse.
//
// Flow:
//   1. Compute metrics from current filter scope
//   2. Capture rendered chart canvases as base64 PNG data-URIs
//   3. Build a self-contained 794 px wide A4 HTML element
//   4. Show a preview modal — user reviews before committing to download
//   5. Render with html2pdf + html2canvas (onclone safety-net still runs)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Hard-coded light-mode palette for PDF rendering.
 * Zero CSS variables — html2canvas v1 reads these directly without parsing issues.
 */
const PDF_PAL = Object.freeze({
  bg:          '#f8fafc',
  surface:     '#ffffff',
  surfaceSoft: '#f1f5f9',
  border:      '#e2e8f0',
  borderStrong:'#cbd5e1',
  text:        '#1e293b',
  textMuted:   '#64748b',
  textLight:   '#94a3b8',
  accent:      '#466846',
  accentDark:  '#1a3d1a',
  accentText:  '#c8dfc8',
});

/**
 * Per-tone color triplets used by KPI cards and table badges.
 * tone → { bg, border, label }
 */
const PDF_TONES = Object.freeze({
  profit:  { bg: '#f0fdf4', border: '#86efac', label: '#15803d' },
  revenue: { bg: '#eff6ff', border: '#93c5fd', label: '#1d4ed8' },
  cost:    { bg: '#fff7ed', border: '#fdba74', label: '#c2410c' },
  risk:    { bg: '#fef2f2', border: '#fca5a5', label: '#b91c1c' },
  count:   { bg: '#f8fafc', border: '#cbd5e1', label: '#475569' },
  neutral: { bg: '#f8fafc', border: '#cbd5e1', label: '#475569' },
});

/**
 * Extracts a rendered chart element as a base64 PNG or SVG data-URI.
 * ApexCharts renders to an SVG wrapped in a <div>; the SVG may contain a
 * <foreignObject> backed canvas.  We prefer the canvas pixel dump for accuracy.
 *
 * @param {string} containerId  ID of the chart's host <div>
 * @returns {string|null}  data-URI string or null when chart is not ready
 */
function extractChartAsPng(containerId) {
  try {
    const container = document.getElementById(containerId);
    if (!container) return null;

    // Prefer canvas pixel dump (gives correct colors, no CORS issues)
    const canvas = container.querySelector('canvas');
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      return canvas.toDataURL('image/png');
    }

    // Fall back to SVG serialisation
    const svg = container.querySelector('svg');
    if (!svg || svg.clientWidth === 0) return null;
    const svgClone = svg.cloneNode(true);
    svgClone.setAttribute('width', String(svg.clientWidth || 400));
    svgClone.setAttribute('height', String(svg.clientHeight || 220));
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    // Force readable text colors on the SVG clone
    svgClone.querySelectorAll('text, tspan').forEach((el) => {
      el.setAttribute('fill', '#334155');
    });
    const serialised = new XMLSerializer().serializeToString(svgClone);
    const b64 = btoa(unescape(encodeURIComponent(serialised)));
    return `data:image/svg+xml;base64,${b64}`;
  } catch (_) {
    return null;
  }
}

/**
 * Renders a single KPI metric card for the PDF layout.
 * All styles are inline hex — zero CSS variables.
 *
 * @param {object} card
 * @param {string}  card.label
 * @param {string}  card.value
 * @param {string}  card.meta
 * @param {string}  card.tone    Key of PDF_TONES
 * @param {boolean} [card.featured]
 * @param {object}  [card.splitMetric]  { label, value, meta, collectionLow }
 * @returns {string} HTML string
 */
function buildPdfKpiCard({ label, value, meta, tone, featured = false, splitMetric }) {
  const tc = PDF_TONES[tone] || PDF_TONES.neutral;
  const cardBg     = featured ? PDF_PAL.accent    : tc.bg;
  const cardBorder = featured ? '#3a5a3a'         : tc.border;
  const labelClr   = featured ? '#a8c8a8'         : PDF_PAL.textMuted;
  const valueClr   = featured ? '#ffffff'         : tc.label;
  const metaClr    = featured ? '#8ab48a'         : PDF_PAL.textLight;

  const splitHtml = splitMetric ? `
    <div style="display:flex;gap:8px;margin-top:6px;border-top:1px solid ${featured ? 'rgba(255,255,255,0.18)' : PDF_PAL.border};padding-top:6px;">
      <div style="flex:1;min-width:0;">
        <div style="font-size:9px;color:${labelClr};margin-bottom:2px;">الكلي (على الورق)</div>
        <div style="font-size:14px;font-weight:800;color:${valueClr};white-space:nowrap;">${value}</div>
      </div>
      <div style="width:1px;background:${featured ? 'rgba(255,255,255,0.18)' : PDF_PAL.border};flex-shrink:0;"></div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:9px;color:${labelClr};margin-bottom:2px;">${escapeHtml(splitMetric.label)}</div>
        <div style="font-size:14px;font-weight:800;color:${splitMetric.collectionLow ? '#f97316' : valueClr};white-space:nowrap;">${escapeHtml(splitMetric.value)}</div>
        <div style="font-size:9px;color:${metaClr};">${escapeHtml(splitMetric.meta)}</div>
      </div>
    </div>` : '';

  const mainValueHtml = splitMetric
    ? ''
    : `<div style="font-size:18px;font-weight:800;color:${valueClr};margin:4px 0;white-space:nowrap;">${value}</div>`;

  return `
    <div style="background:${cardBg};border:1px solid ${cardBorder};border-radius:10px;padding:12px 14px;direction:rtl;page-break-inside:avoid;">
      <div style="font-size:10px;color:${labelClr};font-weight:600;margin-bottom:2px;">${escapeHtml(label)}</div>
      ${mainValueHtml}
      ${splitHtml}
      <div style="font-size:9px;color:${metaClr};margin-top:5px;line-height:1.45;">${escapeHtml(meta)}</div>
    </div>`;
}

/**
 * Builds the complete A4-width printable document element from report data.
 * Returns an HTMLDivElement ready to be appended to document.body and passed
 * to html2pdf.  The element is positioned off-screen so it doesn't flash.
 *
 * @param {Array}  projects   Filtered project array for the current scope
 * @param {object} breakdown  Output of computeProjectsRevenueBreakdown()
 * @param {object} dataset    Output of getReportDataset()
 * @returns {HTMLDivElement}
 */
function buildPdfDocument(projects, breakdown, dataset) {
  const analytics  = getComparisonAnalytics(dataset, projects, breakdown);
  const collection = analytics.currentCollection;
  const netProfit  = breakdown.netProfit || 0;
  const collectedProfit = netProfit >= 0
    ? Math.round(netProfit * (collection.collectionRate / 100))
    : Math.round(netProfit);

  const rangeLabel = getReportRangeSummaryLabel();
  const today      = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // ── KPI card definitions ────────────────────────────────────────────────
  const kpiCards = [
    {
      label: 'صافي الربح',
      value: formatCurrency(netProfit),
      meta:  `هامش الربح: ${formatPercent(breakdown.profitMarginPercent)}`,
      tone:  netProfit >= 0 ? 'profit' : 'risk',
      featured: true,
      splitMetric: {
        label: 'المحصّل فعلاً',
        value: formatCurrency(collectedProfit),
        meta:  `${formatPercent(collection.collectionRate)} تحصيل`,
        collectionLow: collection.collectionRate < 60,
      },
    },
    {
      label: 'الإيراد الكلي',
      value: formatCurrency(breakdown.grossRevenue || 0),
      meta:  'إجمالي القيمة المفوترة ضمن النتائج الحالية',
      tone:  'revenue',
    },
    {
      label: 'هامش الربح',
      value: formatPercent(breakdown.profitMarginPercent),
      meta:  'كفاءة التسعير والتنفيذ',
      tone:  (breakdown.profitMarginPercent || 0) >= 0 ? 'profit' : 'risk',
    },
    {
      label: 'معدل التحصيل',
      value: formatPercent(collection.collectionRate),
      meta:  `محصّل ${formatCurrency(collection.collected)} من ${formatCurrency(collection.invoiced)}`,
      tone:  collection.collectionRate >= 80 ? 'revenue' : 'risk',
    },
    {
      label: 'قيمة غير مدفوعة',
      value: formatCurrency(breakdown.outstandingTotal || 0),
      meta:  'الرصيد الذي ما زال يحتاج متابعة تحصيل',
      tone:  'risk',
    },
    {
      label: 'متوسط قيمة المشروع',
      value: formatCurrency(analytics.currentAverageProjectValue),
      meta:  'متوسط قيمة الصفقة داخل النطاق الحالي',
      tone:  'count',
    },
    {
      label: 'إيراد العملاء المتكررين',
      value: formatPercent(analytics.currentRepeatShare.repeatRevenueShare),
      meta:  `إيراد متكرر ${formatCurrency(analytics.currentRepeatShare.repeatRevenue)}`,
      tone:  'count',
    },
    {
      label: 'تكلفة الخدمات الإنتاجية',
      value: (breakdown.projectExpensesTotal || 0) > 0
        ? formatCurrency(breakdown.projectExpensesTotal)
        : 'غير متاح',
      meta:  (breakdown.projectExpensesTotal || 0) > 0
        ? 'تكاليف التنفيذ المباشرة المرتبطة بالمشاريع الحالية'
        : 'لا توجد بيانات تكلفة إنتاجية مسجلة في هذا النطاق',
      tone:  (breakdown.projectExpensesTotal || 0) > 0 ? 'cost' : 'neutral',
    },
  ];

  // ── Chart images ────────────────────────────────────────────────────────
  const CHART_DEFS = [
    ['reports-timeline-chart',     'مؤشر الإيراد بالوقت'],
    ['reports-profitability-chart','الربحية'],
    ['reports-status-chart',       'توزيع حالة المشاريع'],
    ['reports-types-chart',        'أنواع المشاريع'],
  ];
  const chartsHtml = CHART_DEFS
    .map(([id, label]) => {
      const dataUrl = extractChartAsPng(id);
      if (!dataUrl) return '';
      return `
        <div style="background:${PDF_PAL.surface};border:1px solid ${PDF_PAL.border};border-radius:10px;padding:12px;page-break-inside:avoid;">
          <div style="font-size:10px;font-weight:600;color:${PDF_PAL.textMuted};margin-bottom:8px;text-align:right;">${label}</div>
          <img src="${dataUrl}" style="width:100%;height:auto;border-radius:4px;display:block;" alt="${label}">
        </div>`;
    })
    .filter(Boolean)
    .join('');

  // ── Projects table rows ─────────────────────────────────────────────────
  const STATUS_LABELS = { upcoming: 'قادم', ongoing: 'جارٍ', completed: 'مكتمل' };
  const STATUS_STYLE  = {
    upcoming:  { bg: '#eff6ff', clr: '#1d4ed8' },
    ongoing:   { bg: '#fefce8', clr: '#854d0e' },
    completed: { bg: '#f0fdf4', clr: '#15803d' },
  };
  const PAY_LABELS = { paid: 'مدفوع', partial: 'جزئي', unpaid: 'غير مدفوع' };
  const PAY_STYLE  = {
    paid:    { bg: '#f0fdf4', clr: '#15803d' },
    partial: { bg: '#fffbeb', clr: '#b45309' },
    unpaid:  { bg: '#fef2f2', clr: '#b91c1c' },
  };

  const badge = (text, bg, clr) =>
    `<span style="background:${bg};color:${clr};border-radius:4px;padding:1px 6px;font-size:9px;font-weight:600;white-space:nowrap;">${text}</span>`;

  const tableRowsHtml = projects.map((project, idx) => {
    const metrics      = computeDisplayMetrics(project);
    const paymentState = resolveProjectPaymentState(project);
    const status       = determineProjectStatus(project);
    const rowBg        = idx % 2 === 0 ? PDF_PAL.surface : PDF_PAL.surfaceSoft;
    const ss           = STATUS_STYLE[status]  || { bg: '#f8fafc', clr: '#334155' };
    const ps           = PAY_STYLE[paymentState] || { bg: '#f8fafc', clr: '#334155' };
    const profitClr    = metrics.netProfit >= 0 ? '#15803d' : '#b91c1c';

    return `
      <tr style="background:${rowBg};">
        <td style="padding:7px 8px;text-align:center;color:${PDF_PAL.textMuted};font-size:10px;">${idx + 1}</td>
        <td style="padding:7px 8px;font-weight:600;font-size:10px;color:${PDF_PAL.text};">${escapeHtml(String(project.title || '—'))}</td>
        <td style="padding:7px 8px;font-size:10px;color:${PDF_PAL.textMuted};">${escapeHtml(String(project.clientName || '—'))}</td>
        <td style="padding:7px 8px;text-align:center;">${badge(STATUS_LABELS[status] || status, ss.bg, ss.clr)}</td>
        <td style="padding:7px 8px;text-align:left;font-size:10px;font-weight:600;color:${PDF_PAL.text};white-space:nowrap;">${escapeHtml(formatCurrency(project.overallTotal))}</td>
        <td style="padding:7px 8px;text-align:left;font-size:10px;font-weight:700;color:${profitClr};white-space:nowrap;">${escapeHtml(formatCurrency(metrics.netProfit))}</td>
        <td style="padding:7px 8px;text-align:center;font-size:10px;color:${PDF_PAL.textMuted};">${escapeHtml(formatPercent(metrics.marginPercent))}</td>
        <td style="padding:7px 8px;text-align:center;">${badge(PAY_LABELS[paymentState] || paymentState, ps.bg, ps.clr)}</td>
      </tr>`;
  }).join('');

  // ── Assemble full HTML ──────────────────────────────────────────────────
  const innerHtml = `
    <!-- ═══ Header ═══════════════════════════════════════════════════════ -->
    <div style="background:${PDF_PAL.accent};border-radius:12px;padding:20px 24px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div style="font-size:11px;color:${PDF_PAL.accentText};font-weight:500;margin-bottom:3px;">Art Ratio</div>
          <div style="font-size:21px;font-weight:800;color:#ffffff;">لوحة تقارير المشاريع</div>
          <div style="font-size:11px;color:${PDF_PAL.accentText};margin-top:4px;">${escapeHtml(rangeLabel)}</div>
        </div>
        <div style="text-align:left;font-size:10px;color:${PDF_PAL.accentText};line-height:1.6;">
          <div>${escapeHtml(today)}</div>
          <div>${projects.length} مشروع</div>
        </div>
      </div>
    </div>

    <!-- ═══ KPI Grid (4 columns) ══════════════════════════════════════════ -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
      ${kpiCards.map((c) => buildPdfKpiCard(c)).join('')}
    </div>

    ${chartsHtml ? `
    <!-- ═══ Charts (2 columns) ════════════════════════════════════════════ -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
      ${chartsHtml}
    </div>` : ''}

    <!-- ═══ Projects table ════════════════════════════════════════════════ -->
    <div style="background:${PDF_PAL.surface};border:1px solid ${PDF_PAL.border};border-radius:12px;overflow:hidden;">
      <div style="background:${PDF_PAL.surfaceSoft};padding:12px 16px;border-bottom:1px solid ${PDF_PAL.border};">
        <div style="font-size:13px;font-weight:700;color:${PDF_PAL.text};">سجل المشاريع</div>
        <div style="font-size:10px;color:${PDF_PAL.textMuted};margin-top:2px;">${projects.length} مشروع داخل النطاق الحالي</div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-family:'Tajawal',Arial,sans-serif;">
        <thead>
          <tr style="background:${PDF_PAL.surfaceSoft};">
            ${['#','المشروع','العميل','الحالة','القيمة','صافي الربح','الهامش','الدفع'].map((h, i) => {
              const align = (i === 0 || i === 3 || i === 6 || i === 7) ? 'center' : (i >= 4 && i <= 5 ? 'left' : 'right');
              return `<th style="padding:8px;text-align:${align};font-size:10px;color:${PDF_PAL.textMuted};font-weight:600;border-bottom:1px solid ${PDF_PAL.border};">${h}</th>`;
            }).join('')}
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml || `<tr><td colspan="8" style="padding:20px;text-align:center;color:${PDF_PAL.textMuted};font-size:11px;">لا توجد مشاريع ضمن النطاق الحالي</td></tr>`}
        </tbody>
      </table>
    </div>`;

  // ── Build wrapper element ───────────────────────────────────────────────
  const wrapper = document.createElement('div');
  wrapper.id = 'pdf-export-wrapper';
  wrapper.setAttribute('dir', 'rtl');
  wrapper.style.cssText = [
    'display:block',
    'width:794px',
    `background:${PDF_PAL.bg}`,
    `color:${PDF_PAL.text}`,
    "font-family:'Tajawal',Arial,sans-serif",
    'padding:24px',
    'box-sizing:border-box',
    'line-height:1.5',
  ].join(';');
  wrapper.innerHTML = innerHtml;
  return wrapper;
}

/**
 * Displays a full-screen preview overlay showing a scaled-down version of the
 * PDF wrapper.  Returns a Promise that resolves with true (download confirmed)
 * or false (cancelled / dismissed).
 *
 * @param {HTMLElement} wrapper  The PDF wrapper already appended to document.body
 * @returns {Promise<boolean>}
 */
function showPdfPreviewModal(wrapper) {
  return new Promise((resolve) => {
    // ── Overlay ───────────────────────────────────────────────────────────
    const overlay = document.createElement('div');
    overlay.id = 'pdf-preview-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:99999',
      'background:rgba(15,23,42,0.75)',
      'display:flex', 'flex-direction:column',
      'align-items:center', 'justify-content:center',
      'padding:16px',
    ].join(';');

    // ── Panel ─────────────────────────────────────────────────────────────
    const panel = document.createElement('div');
    panel.style.cssText = [
      'background:#ffffff', 'border-radius:16px',
      'width:min(900px,96vw)', 'max-height:88vh',
      'display:flex', 'flex-direction:column', 'overflow:hidden',
      'box-shadow:0 24px 64px rgba(0,0,0,0.40)',
    ].join(';');

    // ── Toolbar ───────────────────────────────────────────────────────────
    const toolbar = document.createElement('div');
    toolbar.style.cssText = [
      'padding:14px 20px', 'border-bottom:1px solid #e2e8f0',
      'display:flex', 'align-items:center', 'justify-content:space-between',
      'flex-shrink:0', 'direction:rtl', 'gap:12px',
    ].join(';');

    const btnBase = [
      'border-radius:8px', 'padding:8px 18px',
      "font-family:'Tajawal',Arial,sans-serif", 'font-size:13px',
      'cursor:pointer', 'border:none', 'font-weight:600',
    ].join(';');

    toolbar.innerHTML = `
      <div style="font-size:15px;font-weight:700;color:#1e293b;font-family:'Tajawal',Arial,sans-serif;">
        معاينة التقرير
      </div>
      <div style="display:flex;gap:8px;">
        <button id="pdf-preview-cancel" style="${btnBase};background:#f1f5f9;color:#64748b;">
          إلغاء
        </button>
        <button id="pdf-preview-confirm" style="${btnBase};background:#466846;color:#ffffff;">
          ⬇️ تحميل PDF
        </button>
      </div>`;

    // ── Scroll area with scaled preview ──────────────────────────────────
    const scrollArea = document.createElement('div');
    scrollArea.style.cssText = [
      'overflow-y:auto', 'flex:1', 'padding:20px',
      'background:#f1f5f9',
    ].join(';');

    // Clone content for preview (the real wrapper is off-screen for rendering)
    const previewClone = wrapper.cloneNode(true);
    previewClone.style.position = 'relative';
    previewClone.style.left     = '0';
    previewClone.style.top      = '0';

    const scaleBox = document.createElement('div');
    const scale = 0.55;
    scaleBox.style.cssText = [
      `transform:scale(${scale})`,
      'transform-origin:top center',
      'display:inline-block',
      'width:794px',
    ].join(';');
    scaleBox.appendChild(previewClone);

    const centerWrap = document.createElement('div');
    centerWrap.style.cssText = [
      'display:flex', 'justify-content:center',
    ].join(';');
    centerWrap.appendChild(scaleBox);
    scrollArea.appendChild(centerWrap);

    panel.appendChild(toolbar);
    panel.appendChild(scrollArea);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    const dismiss = (result) => {
      try { overlay.remove(); } catch (_) {}
      resolve(result);
    };

    toolbar.querySelector('#pdf-preview-cancel').addEventListener('click',  () => dismiss(false));
    toolbar.querySelector('#pdf-preview-confirm').addEventListener('click', () => dismiss(true));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) dismiss(false); });
  });
}

/**
 * Safety-net color sanitizer for the html2canvas onclone callback.
 * The primary PDF layout uses hardcoded hex, so this should rarely fire.
 * It is kept as a second-pass guard against any dynamic or inherited colors
 * that survive into the cloned DOM.
 *
 * @param {HTMLElement} root
 */
function sanitizePdfColors(root) {
  const UNSUPPORTED = ['oklab(', 'oklch(', 'lch(', 'lab(', 'hwb(', 'color(', 'color-mix('];
  const needsSanitizing = (v) =>
    typeof v === 'string' && UNSUPPORTED.some((fn) => v.includes(fn));

  const toRgb = (value) => {
    if (!needsSanitizing(value)) return value;
    try {
      const cvs = document.createElement('canvas');
      cvs.width = cvs.height = 1;
      const ctx = cvs.getContext('2d');
      ctx.fillStyle = value;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
      return a < 255 ? `rgba(${r},${g},${b},${(a / 255).toFixed(3)})` : `rgb(${r},${g},${b})`;
    } catch (_) { return 'rgb(0,0,0)'; }
  };

  const COLOR_PROPS = [
    'color', 'backgroundColor',
    'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
    'outlineColor', 'textDecorationColor', 'fill', 'stroke',
  ];

  for (const el of [root, ...root.querySelectorAll('*')]) {
    if (!(el instanceof HTMLElement) && !(el instanceof SVGElement)) continue;
    const cs = window.getComputedStyle(el);
    for (const prop of COLOR_PROPS) {
      const val = cs[prop];
      if (needsSanitizing(val)) { try { el.style[prop] = toRgb(val); } catch (_) {} }
    }
    const bg = cs.background;
    if (needsSanitizing(bg)) {
      try {
        el.style.backgroundImage = 'none';
        el.style.backgroundColor = toRgb(cs.backgroundColor);
      } catch (_) {}
    }
    for (const [prop, safe] of [['scrollbarColor','auto'],['textShadow','none'],['boxShadow','none']]) {
      if (needsSanitizing(cs[prop])) { try { el.style[prop] = safe; } catch (_) {} }
    }
  }
}

/**
 * Exports the current projects report as a downloadable PDF.
 *
 * The PDF is built from computed state data — not a clone of the dark-mode UI.
 * A preview modal lets the user review the layout before the file is generated.
 */
async function exportReportsAsPdf() {
  const btn = dom.printBtn;
  const originalLabel = btn ? btn.innerHTML : '';
  if (btn) { btn.disabled = true; btn.innerHTML = '⏳ جاري التحضير...'; }

  let wrapper = null;
  try {
    // ── 1. Ensure Tajawal font is loaded before html2canvas captures text ─
    await document.fonts.ready;

    // ── 2. Compute report metrics for the active filter scope ─────────────
    const dataset   = getReportDataset();
    const projects  = dataset.currentProjects;
    const breakdown = computeProjectsRevenueBreakdown(
      projects, state.reservations, PROJECT_TAX_RATE,
    );

    // ── 3. Build clean A4 document (no position styles yet) ───────────────
    wrapper = buildPdfDocument(projects, breakdown, dataset);

    // ── 4. Show preview; abort if user cancels ────────────────────────────
    //   showPdfPreviewModal internally clones the wrapper, so we do NOT need
    //   to append it to the DOM before calling it.
    if (btn) btn.innerHTML = '👁 معاينة...';
    const confirmed = await showPdfPreviewModal(wrapper);
    if (!confirmed) return; // wrapper never appended; nothing to clean up

    // ── 5. Mount wrapper off-screen for html2canvas ───────────────────────
    //   position:fixed + left:-9999px keeps it out of the visible viewport.
    //   We pass scrollX:9999 to html2canvas so it adds 9999 to parseBounds()
    //   windowBounds.left — exactly cancelling out the -9999px offset and
    //   placing the render origin at canvas (0,0).
    //   (html2canvas parseBounds: left = getBCR().left + windowBounds.left)
    if (btn) { btn.disabled = true; btn.innerHTML = '⏳ جاري التصدير...'; }

    wrapper.style.cssText += [
      '', // leading semicolon separator
      'position:fixed',
      'top:0',
      'left:-9999px',
      'z-index:-1',
      'pointer-events:none',
    ].join(';');
    document.body.appendChild(wrapper);

    // Two rAFs: first lets the browser apply styles; second lets layout settle.
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    // ── 6. Capture with html2canvas (bypassing html2pdf entirely) ─────────
    //   html2pdf.js always clones the source element into its own
    //   position:relative; display:inline-block container.  If the source has
    //   position:absolute (even in inline styles) the clone is out-of-flow →
    //   container height = 0 → html2canvas gets a zero-height render region
    //   → blank canvas → blank PDF.  By driving html2canvas directly we avoid
    //   that cloning stage completely.
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const canvas = await html2canvas(wrapper, {
      scale:           2,
      useCORS:         true,
      backgroundColor: PDF_PAL.bg,
      logging:         false,
      windowWidth:     794,
      // scrollX:9999 compensates for left:-9999px in parseBounds:
      //   effective left = getBCR().left + windowBounds.left = -9999 + 9999 = 0
      scrollX:         9999,
      scrollY:         0,
      onclone: (_doc, el) => { sanitizePdfColors(el); },
    });

    // ── 7. Slice canvas into A4 pages and build PDF ───────────────────────
    const MARGIN_MM    = 8;
    const CONTENT_W_MM = 210 - MARGIN_MM * 2; // 194 mm
    const CONTENT_H_MM = 297 - MARGIN_MM * 2; // 281 mm
    const pxPerMm      = canvas.width / CONTENT_W_MM;
    const pageHeightPx = Math.round(CONTENT_H_MM * pxPerMm);

    const today = new Date().toISOString().slice(0, 10);
    const pdf   = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    for (let srcY = 0, page = 0; srcY < canvas.height; srcY += pageHeightPx, page++) {
      if (page > 0) pdf.addPage();

      const sliceH = Math.min(pageHeightPx, canvas.height - srcY);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width  = canvas.width;
      sliceCanvas.height = sliceH;
      sliceCanvas.getContext('2d').drawImage(
        canvas,
        0, srcY, canvas.width, sliceH,
        0, 0,   canvas.width, sliceH,
      );

      const imgData   = sliceCanvas.toDataURL('image/jpeg', 0.97);
      const sliceHMm  = sliceH / pxPerMm;
      pdf.addImage(imgData, 'JPEG', MARGIN_MM, MARGIN_MM, CONTENT_W_MM, sliceHMm);
    }

    pdf.save(`art-ratio-projects-report-${today}.pdf`);

  } catch (error) {
    console.error('❌ [projectsReports] PDF export failed', error);
    try { alert('تعذّر تصدير التقرير كملف PDF. يرجى المحاولة مرة أخرى.'); } catch (_) {}
  } finally {
    if (wrapper) { try { wrapper.remove(); } catch (_) {} }
    if (btn) { btn.disabled = false; btn.innerHTML = originalLabel; }
  }
}

async function exportProjectsToExcel(projects) {
  return exportProjectsWorkbook(projects, state.reservations, PROJECT_TAX_RATE);
}

function renderTable(projects) {
  if (!dom.table || !dom.tableBody || !dom.tableEmpty) return;
  const sortedProjects = sortProjects(projects, sortState, {
    computeMetrics: computeDisplayMetrics,
  });
  const totalItems = sortedProjects.length;
  const safePageSize = Math.max(1, Number(state.tablePagination.pageSize) || 1);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, Number(state.tablePagination.page) || 1), totalPages);
  const startIndex = (currentPage - 1) * safePageSize;
  const pagedProjects = sortedProjects.slice(startIndex, startIndex + safePageSize);

  state.tablePagination.page = currentPage;

  const rendered = renderProjectsTable({
    projects: pagedProjects,
    totalProjects: totalItems,
    sortState,
    isDebug: Boolean(state.__debug),
    deps: {
      t,
      escapeHtml,
      formatCurrency,
      formatPercent,
      formatNumber,
      formatProjectPeriod,
      computeMetrics: computeDisplayMetrics,
      resolveProjectPaymentState,
    },
  });

  renderTableInsights(sortedProjects);

  if (rendered.isEmpty) {
    dom.table.style.display = 'none';
    dom.tableEmpty.classList.add('active');
    if (dom.tableMeta) dom.tableMeta.textContent = '';
    renderTablePagination(0);
    return;
  }

  dom.table.style.display = '';
  dom.tableEmpty.classList.remove('active');
  dom.tableBody.innerHTML = rendered.rowsHtml;
  if (dom.tableMeta) dom.tableMeta.textContent = rendered.metaText;
  renderTablePagination(totalItems);
}

function renderTableInsights(projects) {
  if (!dom.tableInsights) return;

  if (!projects.length) {
    dom.tableInsights.hidden = true;
    dom.tableInsights.innerHTML = '';
    return;
  }

  const summary = summarizeProjectsAttention(projects, {
    computeMetrics: computeDisplayMetrics,
    resolveProjectPaymentState,
  });
  const actionableSummary = computeActionableProjectsSummary(projects, (project) => assessProjectAttention(project, {
    computeMetrics: computeDisplayMetrics,
    resolveProjectPaymentState,
  }));

  const buildCountText = (key, fallback, count) => t(key, fallback).replace('{count}', formatNumber(count));
  const isTablet = typeof window !== 'undefined' && window.matchMedia('(max-width: 1180px)').matches;
  const cards = [
    {
      key: 'critical',
      tone: 'critical',
      label: t('projects.reports.table.insights.critical', getCurrentLanguage() === 'ar' ? 'تحتاج تدخلاً فورياً' : 'Needs immediate attention'),
      value: formatNumber(summary.critical),
      meta: buildCountText(
        'projects.reports.table.insights.criticalHint',
        getCurrentLanguage() === 'ar'
          ? '{count} مشروع بخسارة أو مكتمل بدون سداد كامل'
          : '{count} projects are loss-making or completed without full payment',
        summary.critical,
      ) + (actionableSummary.criticalCount
        ? ` • ${getCurrentLanguage() === 'ar' ? 'إيراد معرّض للخطر' : 'Revenue at risk'}: ${formatCurrency(actionableSummary.actionRevenue)}`
        : ''),
    },
    {
      key: 'warning',
      tone: 'warning',
      label: t('projects.reports.table.insights.watch', getCurrentLanguage() === 'ar' ? 'تحتاج متابعة' : 'Watch closely'),
      value: formatNumber(summary.warning),
      meta: buildCountText(
        'projects.reports.table.insights.watchHint',
        getCurrentLanguage() === 'ar'
          ? '{count} مشروع بهامش منخفض أو يحتاج متابعة دفع'
          : '{count} projects have low margin or still need payment follow-up',
        summary.warning,
      ) + (actionableSummary.warningCount
        ? ` • ${formatNumber(actionableSummary.warningCount)} ${getCurrentLanguage() === 'ar' ? 'مشاريع تحذيرية' : 'warning projects'}`
        : ''),
    },
    {
      key: 'outstanding',
      tone: 'risk',
      label: t('projects.reports.table.insights.outstanding', getCurrentLanguage() === 'ar' ? 'المبلغ المعلّق' : 'Outstanding balance'),
      value: formatCurrency(summary.outstandingValue),
      meta: buildCountText(
        'projects.reports.table.insights.outstandingHint',
        getCurrentLanguage() === 'ar'
          ? '{count} مشروع ما زال لديه رصيد مستحق'
          : '{count} projects still carry an unpaid balance',
        summary.paymentFollowUp,
      ),
    },
  ];

  dom.tableInsights.hidden = false;
  dom.tableInsights.innerHTML = `
    <div class="reports-table-overview" style="display:grid; grid-template-columns:${isTablet ? '1fr' : 'repeat(3, minmax(0, 1fr))'}; gap:10px;">
      ${cards.map(({ key, tone, label, value, meta }) => `
        <article class="reports-table-insight reports-table-insight--${tone}" data-insight="${key}" style="display:grid; align-content:start; gap:8px; min-width:0; min-height:124px; padding:14px 16px; border-radius:18px;">
          <span class="reports-table-insight__label">${escapeHtml(label)}</span>
          <strong class="reports-table-insight__value">${escapeHtml(value)}</strong>
          <p class="reports-table-insight__meta">${escapeHtml(meta)}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderTablePagination(totalItems) {
  const host = dom.tablePagination;
  if (!host) return;

  const safePageSize = Math.max(1, Number(state.tablePagination.pageSize) || 1);
  const total = Math.max(0, Number(totalItems) || 0);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(1, Number(state.tablePagination.page) || 1), totalPages);

  state.tablePagination.page = currentPage;

  if (totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  const navLabel = t('projects.pagination.navigation', 'Projects pagination');
  const prevLabel = t('projects.pagination.prev', 'Previous page');
  const nextLabel = t('projects.pagination.next', 'Next page');
  const pageLabelTemplate = t('projects.pagination.page', 'Page {page}');
  const rangeTemplate = t('projects.pagination.range', '{from}-{to} of {total}');
  const start = total === 0 ? 0 : ((currentPage - 1) * safePageSize) + 1;
  const end = Math.min(total, currentPage * safePageSize);
  const rangeText = rangeTemplate
    .replace('{from}', formatNumber(start))
    .replace('{to}', formatNumber(end))
    .replace('{total}', formatNumber(total));
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="btn btn-sm btn-outline-primary" data-reports-page="${Math.max(1, currentPage - 1)}" ${currentPage <= 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${pages.map((pageNumber) => {
        const isActive = pageNumber === currentPage;
        const label = pageLabelTemplate.replace('{page}', formatNumber(pageNumber));
        return `<button type="button" class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}" data-reports-page="${pageNumber}" aria-label="${escapeHtml(label)}" ${isActive ? 'aria-current="page"' : ''}>${escapeHtml(formatNumber(pageNumber))}</button>`;
      }).join('')}
      <button type="button" class="btn btn-sm btn-outline-primary" data-reports-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;
}

function setupTablePagination() {
  if (!dom.tablePagination || dom.tablePagination.dataset.paginationAttached === 'true') return;
  dom.tablePagination.addEventListener('click', (event) => {
    const button = event.target.closest('[data-reports-page]');
    if (!(button instanceof HTMLElement)) return;
    const nextPage = Number(button.dataset.reportsPage);
    if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage === state.tablePagination.page) return;
    jumpPaginationSectionToStart(dom.tablePagination);
    state.tablePagination.page = nextPage;
    renderAll();
    settlePaginationSectionToStart(dom.tablePagination);
  });
  dom.tablePagination.dataset.paginationAttached = 'true';
}

function setupTableSorting() {
  if (!dom.tableHead || dom.tableHead.dataset.sortAttached === 'true') return;
  dom.tableHead.addEventListener('click', (event) => {
    const th = event.target.closest('[data-sort-key]');
    if (!th) return;
    const key = th.getAttribute('data-sort-key');
    if (!key) return;
    const nextSort = getNextSortState(sortState, key);
    sortState.key = nextSort.key;
    sortState.dir = nextSort.dir;
    renderAll();
  });
  dom.tableHead.dataset.sortAttached = 'true';
}

function updateSortIndicators() {
  if (!dom.tableHead) return;
  dom.tableHead.querySelectorAll('th.sortable').forEach((th) => {
    th.classList.remove('is-sorted');
    th.removeAttribute('data-dir');
    const key = th.getAttribute('data-sort-key');
    if (key) {
      th.setAttribute('title', buildSortTitle(key, null, { t }));
    }
  });
  const active = dom.tableHead.querySelector(`th.sortable[data-sort-key="${sortState.key}"]`);
  if (active) {
    active.classList.add('is-sorted');
    active.setAttribute('data-dir', sortState.dir);
    active.setAttribute('title', buildSortTitle(sortState.key, sortState.dir, { t }));
  }
}
