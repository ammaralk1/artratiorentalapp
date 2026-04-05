import { loadData } from './storage.js';
import { t, getCurrentLanguage } from './language.js';
import { apiRequest } from './apiClient.js';
import {
  buildClientsChartOptions,
  buildExpenseChartOptions,
  buildStatusChartOptions,
  buildTimelineChartOptions,
  renderApexChart,
} from './projectsReports/charts';
import {
  buildSortTitle,
  getNextSortState,
  renderProjectsTable,
} from './projectsReports/table';
import {
  ensureCustomRangePickers,
  setupReportFilters,
} from './projectsReports/controls';
import {
  computeProjectCommercialTotals,
  computeProjectsRevenueBreakdown,
} from './projectsReports/breakdown';
import { exportProjectsToExcel as exportProjectsWorkbook } from './projectsReports/export';
import {
  computeProjectMetrics,
  determineProjectStatus,
  getProjectExpenses,
  getReservationsForProject,
  isProjectEligibleForReports,
  resolveProjectPaymentState,
} from './projectsReports/financials';
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

const state = {
  projects: [],
  customers: [],
  reservations: [],
  totalProjects: 0,
  filters: {
    search: '',
    statuses: ['upcoming', 'ongoing', 'completed'],
    payment: 'all',
    confirmed: 'all',
    range: 'all',
    startDate: '',
    endDate: ''
  }
};

const dom = {
  search: null,
  payment: null,
  confirmed: null,
  dateRange: null,
  customRangeWrapper: null,
  startDate: null,
  endDate: null,
  refreshBtn: null,
  exportExcelBtn: null,
  kpiGrid: null,
  statusChips: null,
  table: null,
  tableBody: null,
  tableHead: null,
  tableMeta: null,
  tableEmpty: null,
  chartCards: {},
  chartLoaders: {}
};

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

// Basic sort state for projects table
const sortState = { key: 'value', dir: 'desc' };

// Prevent re-entrant refresh loops when listening to data-change events.
// Without this, our refresh -> setState -> dispatch('projects:changed')
// can recursively trigger another refresh, causing continuous network calls.
let __mutationRefreshInFlight = false;
let __lastMutationRefreshAt = 0;
const MUTATION_REFRESH_MIN_INTERVAL_MS = 1500; // throttle a bit when many events fire

async function loadReportsData({ forceProjects = false } = {}) {
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
  // Sync RTL/LTR on wrapper with current document language
  try {
    const dir = (document?.documentElement?.getAttribute('dir') || 'rtl');
    const wrapper = document.querySelector('.reports-wrapper--projects');
    if (wrapper) wrapper.setAttribute('dir', dir);
  } catch (_) {}
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
    // Reset search filter to avoid stale text hiding all rows
    if (dom.search) dom.search.value = '';
    state.filters.search = '';
    renderStatusChips();
    setupFilters();
    setupTableSorting();
    setupExport();
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

function bootProjectsReportsModule() {
  void initProjectsReportsModule().catch((error) => {
    console.error('❌ [projectsReports] Failed to initialise reports module', error);
  });
}

document.addEventListener('DOMContentLoaded', bootProjectsReportsModule);

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
  dom.search = document.getElementById('reports-search');
  dom.statusChips = document.getElementById('reports-status-chips');
  dom.payment = document.getElementById('reports-payment');
  dom.confirmed = document.getElementById('reports-confirmed');
  dom.dateRange = document.getElementById('reports-date-range');
  dom.customRangeWrapper = document.getElementById('reports-custom-range');
  dom.startDate = document.getElementById('reports-start-date');
  dom.endDate = document.getElementById('reports-end-date');
  dom.refreshBtn = document.getElementById('reports-refresh');
  dom.exportExcelBtn = document.getElementById('projects-export-excel');
  dom.kpiGrid = document.getElementById('reports-kpi-grid');
  dom.table = document.getElementById('reports-table');
  dom.tableBody = dom.table?.querySelector('tbody');
  dom.tableHead = dom.table?.querySelector('thead');
  dom.tableMeta = document.getElementById('reports-table-meta');
  dom.tableEmpty = document.getElementById('reports-empty');
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
  const normalizedPayment = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const client = customerMap.get(String(project.clientId));
  const reservations = getReservationsForProject(state.reservations, project.id);
  const commercial = computeProjectCommercialTotals(project, reservations, PROJECT_TAX_RATE);

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

  return {
    raw: project,
    id: project.id,
    projectCode: project.projectCode || project.id,
    title: (project.title || '').trim(),
    clientId: project.clientId,
    clientName: client?.customerName || client?.name || '',
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
    reservationsTotal: Number((commercial.agg.equipment + commercial.agg.crew).toFixed(2)),
    expensesTotal: getProjectExpenses(project),
    servicesClientPrice: commercial.servicesRevenue,
    taxAmount: commercial.taxAmount,
    combinedTaxAmount: commercial.taxAmount,
    overallTotal: commercial.finalTotal,
    unpaidValue: normalizedPayment === 'paid' ? 0 : commercial.finalTotal,
    reservationsCount: reservations.length
  };
}

function setupFilters() {
  setupReportFilters({
    dom,
    filters: state.filters,
    renderAll,
    getCurrentLanguage,
  });
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
  try {
    const dir = (document?.documentElement?.getAttribute('dir') || 'rtl');
    const wrapper = document.querySelector('.reports-wrapper--projects');
    if (wrapper) wrapper.setAttribute('dir', dir);
  } catch (_) {}
  renderStatusChips();
  renderAll();
}

function handleStorageSync(event) {
  if (event.key && !['projects', 'reservations', 'customers'].includes(event.key)) return;
  handleDataMutation().catch((error) => {
    console.error('❌ [projectsReports] Storage sync failed', error);
  });
}

function renderAll() {
  const filtered = getFilteredProjects();
  updateStatusChipsActive();
  renderKpis(filtered);
  renderStatusChart(filtered);
  renderTimelineChart(filtered);
  renderExpenseChart(filtered);
  renderClientsChart(filtered);
  renderTable(filtered);
  updateSortIndicators();
}

function getFilteredProjects() {
  return filterProjectsForReports(state.projects, state.filters);
}

function renderKpis(projects) {
  if (!dom.kpiGrid) return;
  const totalCount = projects.length;
  const breakdown = computeProjectsRevenueBreakdown(projects, state.reservations, PROJECT_TAX_RATE);
  const totalValue = breakdown.grossRevenue;
  const unpaidValue = breakdown.outstandingTotal || 0;
  const expensesTotal = breakdown.projectExpensesTotal || 0;
  const netProfit = breakdown.netProfit || 0;

  const cards = [
    { key: 'projects', icon: KPI_ICONS.projects, label: t('projects.reports.kpi.totalProjects', getCurrentLanguage()==='ar' ? 'إجمالي المشاريع' : 'Total projects'), value: formatNumber(totalCount), meta: t('projects.reports.kpi.totalProjectsMeta', getCurrentLanguage()==='ar' ? 'بعد تطبيق الفلاتر الحالية' : 'After applying the current filters') },
    { key: 'totalValue', icon: KPI_ICONS.value, label: t('projects.reports.kpi.totalValue', getCurrentLanguage()==='ar' ? 'الإيراد الكلي' : 'Total value'), value: formatCurrency(totalValue), meta: t('projects.reports.kpi.totalValueMeta', getCurrentLanguage()==='ar' ? 'يشمل المشاريع والحجوزات والضريبة' : 'Includes projects, linked reservations, and VAT') },
    { key: 'outstanding', icon: KPI_ICONS.outstanding, label: t('projects.reports.kpi.unpaidValue', getCurrentLanguage()==='ar' ? 'قيمة غير مدفوعة' : 'Outstanding value'), value: formatCurrency(unpaidValue), meta: t('projects.reports.kpi.unpaidValueMeta', getCurrentLanguage()==='ar' ? 'مشاريع لم تُسدّد بالكامل' : 'Projects not fully paid yet') },
    { key: 'expenses', icon: KPI_ICONS.expenses, label: t('projects.reports.kpi.expenses', 'تكلفة الخدمات الإنتاجية'), value: formatCurrency(expensesTotal), meta: t('projects.reports.kpi.expensesMeta', 'تكلفة الخدمات الإنتاجية للمشاريع المحددة') },
    { key: 'margin', icon: KPI_ICONS.margin, label: t('projects.reports.kpi.margin', 'هامش الربح'), value: formatPercent(breakdown.profitMarginPercent), meta: t('projects.reports.kpi.marginMeta', 'صافي الربح ÷ الإيراد بدون الضريبة') },
    { key: 'netProfit', icon: KPI_ICONS.value, label: t('reservations.reports.kpi.revenue.details.net', 'صافي الربح'), value: formatCurrency(netProfit), meta: t('projects.reports.kpi.netProfitMeta', 'مجموع صافي الربح للمشاريع المحددة') }
  ];

  dom.kpiGrid.innerHTML = cards.map(({ key, icon, label, value, meta }) => `
    <div class="reports-kpi-card glass-card" data-kpi="${key}">
      <div class="reports-kpi-icon">${icon}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${escapeHtml(label)}</p>
        <p class="reports-kpi-value">${escapeHtml(value)}</p>
        <span class="reports-kpi-meta">${escapeHtml(meta)}</span>
      </div>
    </div>
  `).join('');

  // Inject a detailed revenue breakdown similar to reservations reports
  renderProjectsRevenueBreakdown(projects);
}

function renderProjectsRevenueBreakdown(projects) {
  try {
    const breakdown = computeProjectsRevenueBreakdown(projects, state.reservations, PROJECT_TAX_RATE);
    const containerId = 'projects-revenue-breakdown';
    let container = document.getElementById(containerId);
  const servicesProfit = (breakdown.servicesRevenueTotal || 0) - (breakdown.projectExpensesTotal || 0);
  const rows = [
      { key: 'gross', label: t('reservations.reports.kpi.revenue.details.gross', 'الإيراد الكلي', 'Gross revenue'), value: formatCurrency(breakdown.grossRevenue) },
      { key: 'discount', label: t('projects.details.summary.discount', 'الخصم', 'Discount'), value: `−${formatCurrency(breakdown.discountTotal || 0)}` },
      { key: 'share', label: t('reservations.reports.kpi.revenue.details.share', 'نسبة الشركة', 'Company share'), value: formatCurrency(breakdown.companyShareTotal) },
      { key: 'tax', label: t('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'), value: formatCurrency(breakdown.taxTotal) },
      { key: 'crewGross', label: t('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'), value: formatCurrency(breakdown.crewTotal) },
      // Show crew cost as a subtractive item for visual consistency with other costs
      { key: 'crew', label: t('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'), value: `−${formatCurrency(breakdown.crewCostTotal)}` },
      { key: 'equipment', label: t('reservations.reports.kpi.revenue.details.equipmentGross', 'إجمالي المعدات', 'Equipment total'), value: formatCurrency(breakdown.equipmentTotalCombined) },
      { key: 'equipmentCost', label: t('reservations.reports.kpi.revenue.details.equipment', 'تكلفة المعدات', 'Equipment cost'), value: `−${formatCurrency(breakdown.equipmentCostTotalCombined || 0)}` },
      { key: 'projectExpenses', label: t('projects.reports.kpi.revenue.details.projectExpenses', 'تكلفة الخدمات الإنتاجية', 'Project expenses'), value: `−${formatCurrency(breakdown.projectExpensesTotal)}` },
      { key: 'servicesProfit', label: t('projects.reports.kpi.revenue.details.servicesProfit', getCurrentLanguage()==='ar' ? 'ربح الخدمات الإنتاجية' : 'Services profit'), value: `${formatCurrency(servicesProfit)}` },
      { key: 'net', label: t('reservations.reports.kpi.revenue.details.net', 'صافي الربح', 'Net profit'), value: formatCurrency(breakdown.netProfit) },
      // Note: Margin is already shown as a KPI card; avoid duplication here for cleaner layout
    ];

    const detailsHtml = `
      <div id="${containerId}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${rows.map(({ key, label, value }) => `
          <div class="reports-kpi-detail-row d-flex justify-content-between" data-row="${key}">
            <span class="reports-kpi-detail-label">${escapeHtml(label)}</span>
            <span class="reports-kpi-detail-value">${escapeHtml(value)}</span>
          </div>
        `).join('')}
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
    return `<span class="reports-status-chip timeline-status-badge timeline-status-badge--${status}" data-status="${status}">${escapeHtml(label)}</span>`;
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
  renderApexChart({
    ChartLib,
    charts,
    key: 'status',
    element: container,
    options: buildStatusChartOptions(projects, { t, formatCompactNumber }),
  });
}

function renderTimelineChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-timeline-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'timeline',
    element: container,
    options: buildTimelineChartOptions(projects, { t, formatCompactNumber, getChartLocale }),
  });
}

function renderExpenseChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-expense-chart');
  if (!container) return;
  renderApexChart({
    ChartLib,
    charts,
    key: 'expenses',
    element: container,
    options: buildExpenseChartOptions(projects, { t, formatCompactNumber }),
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
    options: buildClientsChartOptions(projects, { t, formatCompactNumber }),
  });
}

// (deduped above)

function setupExport() {
  if (!dom.exportExcelBtn || dom.exportExcelBtn.dataset.bound === 'true') return;
  dom.exportExcelBtn.addEventListener('click', async () => {
    try {
      const filtered = getFilteredProjects();
      await exportProjectsToExcel(filtered);
    } catch (error) {
      console.error('❌ [projectsReports] Failed to export Excel', error);
      try { alert('تعذر تصدير البيانات.'); } catch (_) {}
    }
  });
  dom.exportExcelBtn.dataset.bound = 'true';
}

async function exportProjectsToExcel(projects) {
  return exportProjectsWorkbook(projects, state.reservations, PROJECT_TAX_RATE);
}

function renderTable(projects) {
  if (!dom.table || !dom.tableBody || !dom.tableEmpty) return;
  const rendered = renderProjectsTable({
    projects,
    totalProjects: state.totalProjects,
    sortState,
    isDebug: Boolean(state.__debug),
    deps: {
      t,
      escapeHtml,
      formatCurrency,
      formatPercent,
      formatNumber,
      formatProjectPeriod,
      computeMetrics: (project) => computeProjectMetrics(project, getReservationsForProject(state.reservations, project.id)),
      resolveProjectPaymentState,
    },
  });

  if (rendered.isEmpty) {
    dom.table.style.display = 'none';
    dom.tableEmpty.classList.add('active');
    if (dom.tableMeta) dom.tableMeta.textContent = '';
    return;
  }

  dom.table.style.display = '';
  dom.tableEmpty.classList.remove('active');
  dom.tableBody.innerHTML = rendered.rowsHtml;
  if (dom.tableMeta) dom.tableMeta.textContent = rendered.metaText;
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
