import { loadData } from './storage.js';
import { t, getCurrentLanguage } from './language.js';
import { normalizeNumbers, formatDateTime } from './utils.js';
import { apiRequest } from './apiClient.js';
import { ensureXlsx } from './reports/external.js';
import { computeReservationFinancials } from './reports/calculations.js';
import { calculateReservationTotal } from './reservationsSummary.js';
import {
  ensureProjectsLoaded,
  getProjectsState,
  refreshProjectsFromApi,
  isApiError as isProjectApiError,
} from './projectsService.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, refreshReservationsFromApi } from './reservationsService.js';
// Reuse the exact project financial rules from the project details/modal
import { resolveProjectTotals } from './projects/view.js';

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
    margin: 'all',
    range: 'all',
    startDate: '',
    endDate: ''
  }
};

const dom = {
  search: null,
  payment: null,
  margin: null,
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

document.addEventListener('DOMContentLoaded', initReports);

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
  dom.margin = document.getElementById('reports-margin');
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
  state.projects = Array.isArray(projects)
    ? projects.map((project) => buildProjectSnapshot(project, customerMap))
    : [];

  state.totalProjects = state.projects.length;
}

function computeProjectMetrics(project) {
  const reservations = getReservationsForProject(project.id);
  let resFinal = 0;
  let resTax = 0;
  let resNetRevenue = 0;
  reservations.forEach((res) => {
    const f = computeReservationFinancials(res);
    const finalTotal = Number(f.finalTotal || 0);
    const taxAmount = Number(f.taxAmount || 0);
    resFinal += finalTotal;
    resTax += taxAmount;
    resNetRevenue += (finalTotal - taxAmount);
  });

  const equipmentEstimate = Number(project?.raw?.equipmentEstimate ?? project?.equipmentEstimate ?? 0) || 0;
  const servicesRevenue = Number(project?.raw?.servicesClientPrice ?? project?.servicesClientPrice ?? 0) || 0;
  const projectExpenses = Number(project?.expensesTotal ?? 0) || 0;
  const revenueExTax = resNetRevenue + equipmentEstimate + servicesRevenue;
  const netProfit = resNetRevenue + (servicesRevenue - projectExpenses);
  const marginPercent = revenueExTax > 0 ? (netProfit / revenueExTax) * 100 : 0;

  return {
    resFinal,
    resTax,
    resNetRevenue,
    equipmentEstimate,
    servicesRevenue,
    projectExpenses,
    netProfit,
    marginPercent,
  };
}

function resolveAndApplyTaxRate() {
  try {
    const root = typeof window !== 'undefined' ? window : globalThis;
    const candidates = [root.APP_VAT_RATE, root.APP_TAX_RATE, root.__APP_SETTINGS__?.vatRate];
    for (const v of candidates) {
      const n = Number(v);
      if (Number.isFinite(n) && n >= 0 && n <= 1) { PROJECT_TAX_RATE = n; return; }
      if (Number.isFinite(n) && n > 1 && n <= 100) { PROJECT_TAX_RATE = n / 100; return; }
    }
  } catch (_) {}
  try {
    apiRequest('/preferences/').then((payload) => {
      const raw = payload?.data ?? payload ?? {};
      const v = raw.vatRate ?? raw.taxRate ?? null;
      const n = Number(v);
      if (Number.isFinite(n)) {
        PROJECT_TAX_RATE = n > 1 ? n / 100 : n;
        renderAll();
      }
    }).catch(() => {});
  } catch (_) {}
}

function buildProjectSnapshot(project, customerMap) {
  const normalizedPayment = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const client = customerMap.get(String(project.clientId));
  const reservations = getReservationsForProject(project.id);
  // Use reservation final totals (may or may not include tax depending on reservation flags)
  const reservationsTotal = reservations.reduce((sum, reservation) => sum + resolveReservationFinalTotal(reservation), 0);

  const expensesTotal = getProjectExpenses(project);
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const servicesClientPrice = getProjectServicesRevenue(project);
  // Apply project-level discount and company share similar to breakdown
  const discountVal = Number(project?.discount ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const baseSubtotal = equipmentEstimate + servicesClientPrice;
  let discountAmount = discountType === 'amount' ? discountVal : baseSubtotal * (discountVal / 100);
  if (!Number.isFinite(discountAmount) || discountAmount < 0) discountAmount = 0;
  if (discountAmount > baseSubtotal) discountAmount = baseSubtotal;
  const baseAfterDiscount = Math.max(0, baseSubtotal - discountAmount);
  const shareEnabled = project?.companyShareEnabled === true || project?.companyShareEnabled === 'true';
  const sharePercent = shareEnabled ? (Number(project?.companySharePercent) || 0) : 0;
  const companyShareAmount = sharePercent > 0 ? baseAfterDiscount * (sharePercent / 100) : 0;
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';
  const taxAmount = applyTax ? Number(((baseAfterDiscount + companyShareAmount) * PROJECT_TAX_RATE).toFixed(2)) : 0;
  // If VAT is enabled at the project level, reservations linked to the project
  // must reflect VAT even when they were saved without reservation-level tax.
  let reservationsVat = 0;
  if (applyTax && Array.isArray(reservations) && reservations.length) {
    reservations.forEach((res) => {
      try {
        const f = computeReservationFinancials(res);
        const resTax = Number(f.taxAmount || 0);
        if (!(resTax > 0)) {
          const net = Number(f.finalTotal || 0) - resTax;
          if (net > 0) reservationsVat += net * PROJECT_TAX_RATE;
        }
      } catch (_) { /* ignore */ }
    });
  }
  const overallTotal = Number((reservationsTotal + baseAfterDiscount + companyShareAmount + taxAmount + reservationsVat).toFixed(2));

  const status = determineProjectStatus(project);
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
    applyTax,
    status,
    reservationsTotal: Number(reservationsTotal.toFixed(2)),
    expensesTotal,
    servicesClientPrice,
    taxAmount,
    combinedTaxAmount: taxAmount,
    overallTotal,
    unpaidValue: normalizedPayment === 'paid' ? 0 : overallTotal,
    reservationsCount: reservations.length
  };
}

function getReservationsForProject(projectId) {
  if (!Array.isArray(state.reservations)) return [];
  return state.reservations.filter((reservation) => String(reservation.projectId) === String(projectId));
}

function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    techniciansOrAssignments,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

function resolveReservationFinalTotal(reservation) {
  if (!reservation) return 0;
  try {
    const f = computeReservationFinancials(reservation);
    const val = Number(f.finalTotal || 0);
    return Number.isFinite(val) ? val : 0;
  } catch (_) {
    return 0;
  }
}

function getProjectExpenses(project) {
  if (typeof project.expensesTotal === 'number') {
    return Number(project.expensesTotal) || 0;
  }
  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
  }
  return 0;
}

function getProjectServicesRevenue(project) {
  const direct = Number(project?.servicesClientPrice ?? project?.raw?.servicesClientPrice ?? 0) || 0;
  if (direct > 0) return direct;
  const expenses = Array.isArray(project?.expenses) ? project.expenses
    : (Array.isArray(project?.raw?.expenses) ? project.raw.expenses : []);
  if (!expenses.length) return 0;
  const parseNum = (v) => {
    if (typeof v === 'number') return Number.isFinite(v) ? v : 0;
    if (v == null || v === '') return 0;
    const s = normalizeNumbers(String(v)).replace(/[^\d.+-]/g, '');
    const n = Number.parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };
  return expenses.reduce((sum, exp) => sum + parseNum(exp?.salePrice ?? exp?.sale_price ?? 0), 0);
}

function determineProjectStatus(project) {
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }
  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }
  return 'ongoing';
}

function setupFilters() {
  if (dom.search) {
    let debounceTimer;
    dom.search.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.filters.search = dom.search.value.trim();
        renderAll();
      }, 180);
    });
  }

  if (dom.payment) {
    dom.payment.value = state.filters.payment;
    dom.payment.addEventListener('change', () => {
      state.filters.payment = dom.payment.value || 'all';
      renderAll();
    });
  }

  if (dom.margin) {
    dom.margin.value = state.filters.margin || 'all';
    dom.margin.addEventListener('change', () => {
      state.filters.margin = dom.margin.value || 'all';
      renderAll();
    });
  }

  if (dom.dateRange) {
    dom.dateRange.addEventListener('change', handleDateRangeChange);
    dom.dateRange.value = state.filters.range;
  }

  if (dom.startDate) {
    dom.startDate.addEventListener('change', () => {
      state.filters.startDate = dom.startDate.value;
      if (state.filters.range === 'custom') {
        renderAll();
      }
    });
  }

  if (dom.endDate) {
    dom.endDate.addEventListener('change', () => {
      state.filters.endDate = dom.endDate.value;
      if (state.filters.range === 'custom') {
        renderAll();
      }
    });
  }

  if (dom.refreshBtn) {
    dom.refreshBtn.addEventListener('click', () => {
      if (state.filters.range !== 'custom') {
        renderAll();
        return;
      }
      state.filters.startDate = dom.startDate?.value || '';
      state.filters.endDate = dom.endDate?.value || '';
      renderAll();
    });
  }
}

function handleDateRangeChange(event) {
  const value = event.target.value;
  state.filters.range = value;
  if (value === 'custom') {
    dom.customRangeWrapper?.classList.add('active');
  } else {
    dom.customRangeWrapper?.classList.remove('active');
    state.filters.startDate = '';
    state.filters.endDate = '';
    if (dom.startDate) dom.startDate.value = '';
    if (dom.endDate) dom.endDate.value = '';
    renderAll();
  }
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
  const { search, statuses, payment, range, startDate, endDate, margin } = state.filters;
  const searchTerm = normalizeText(search);
  const now = new Date();
  const rangeDays = Number(range);
  let rangeStart = null;

  if (range === 'custom') {
    rangeStart = startDate ? new Date(startDate) : null;
    const rangeEnd = endDate ? new Date(endDate) : null;
    return state.projects.filter((project) => {
      if (!isStatusAllowed(project, statuses)) return false;
      if (!isPaymentAllowed(project, payment)) return false;
      if (!matchesSearch(project, searchTerm)) return false;
      if (!isMarginAllowed(project, margin)) return false;
      return isWithinCustomRange(project.start, rangeStart, rangeEnd);
    });
  }

  if (range !== 'all' && Number.isFinite(rangeDays)) {
    rangeStart = new Date();
    rangeStart.setDate(now.getDate() - rangeDays);
  }

  return state.projects.filter((project) => {
    if (!isStatusAllowed(project, statuses)) return false;
    if (!isPaymentAllowed(project, payment)) return false;
    if (!matchesSearch(project, searchTerm)) return false;
    if (!isMarginAllowed(project, margin)) return false;
    if (range === 'all') return true;
    return isWithinRelativeRange(project.start, rangeStart, now);
  });
}

function isStatusAllowed(project, statuses) {
  return statuses.includes(project.status);
}

function isPaymentAllowed(project, payment) {
  if (payment === 'all') return true;
  return project.paymentStatus === payment;
}

function isMarginAllowed(project, margin) {
  if (!margin || margin === 'all') return true;
  const m = computeProjectMetrics(project).marginPercent;
  switch (margin) {
    case 'loss': return m < 0;
    case 'lt10': return m >= 0 && m < 10;
    case '10to30': return m >= 10 && m <= 30;
    case 'gt30': return m > 30;
    default: return true;
  }
}

function matchesSearch(project, searchTerm) {
  if (!searchTerm) return true;
  const haystack = normalizeText([
    project.title,
    project.projectCode,
    project.clientName,
    project.clientCompany,
    project.type,
    project.description
  ].filter(Boolean).join(' '));
  return haystack.includes(searchTerm);
}

function isWithinRelativeRange(start, rangeStart, now) {
  if (!start || !(start instanceof Date) || Number.isNaN(start.getTime())) return false;
  if (!rangeStart) return true;
  return start >= rangeStart && start <= now;
}

function isWithinCustomRange(start, customStart, customEnd) {
  if (!customStart && !customEnd) return true;
  if (!start || Number.isNaN(start.getTime())) return false;
  const time = start.getTime();
  if (customStart && !Number.isNaN(customStart.getTime()) && time < customStart.getTime()) {
    return false;
  }
  if (customEnd && !Number.isNaN(customEnd.getTime()) && time > customEnd.getTime()) {
    return false;
  }
  return true;
}

function normalizeText(value) {
  if (!value) return '';
  return normalizeNumbers(String(value)).toLowerCase().trim();
}

function renderKpis(projects) {
  if (!dom.kpiGrid) return;
  const totalCount = projects.length;
  // Use breakdown.grossRevenue to guarantee VAT is included consistently
  const totalValue = computeProjectsRevenueBreakdown(projects).grossRevenue;
  const unpaidValue = projects.reduce((sum, project) => sum + project.unpaidValue, 0);
  const expensesTotal = projects.reduce((sum, project) => sum + project.expensesTotal, 0);
  const breakdown = computeProjectsRevenueBreakdown(projects);

  const cards = [
    {
      icon: KPI_ICONS.projects,
      label: t('projects.reports.kpi.totalProjects', 'Total projects'),
      value: formatNumber(totalCount),
      meta: t('projects.reports.kpi.totalProjectsMeta', 'After applying the current filters')
    },
    {
      icon: KPI_ICONS.value,
      label: t('projects.reports.kpi.totalValue', 'Total value'),
      value: formatCurrency(totalValue),
      meta: t('projects.reports.kpi.totalValueMeta', 'Includes projects, linked reservations, and VAT')
    },
    {
      icon: KPI_ICONS.outstanding,
      label: t('projects.reports.kpi.unpaidValue', 'Outstanding value'),
      value: formatCurrency(unpaidValue),
      meta: t('projects.reports.kpi.unpaidValueMeta', 'Projects not fully paid yet')
    },
    {
      icon: KPI_ICONS.expenses,
      label: t('projects.reports.kpi.expenses', 'تكلفة الخدمات الإنتاجية'),
      value: formatCurrency(expensesTotal),
      meta: t('projects.reports.kpi.expensesMeta', 'تكلفة الخدمات الإنتاجية للمشاريع المحددة')
    },
    {
      icon: KPI_ICONS.margin,
      label: t('projects.reports.kpi.margin', 'هامش الربح', 'Profit margin'),
      value: formatPercent(breakdown.profitMarginPercent),
      meta: t('projects.reports.kpi.marginMeta', 'صافي الربح ÷ الإيراد بدون الضريبة', 'Net profit / revenue excl. VAT')
    }
  ];

  dom.kpiGrid.innerHTML = cards.map(({ icon, label, value, meta }, index) => `
    <div class="reports-kpi-card glass-card" ${index === 1 ? 'data-kpi="totalValue"' : ''}>
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
    const breakdown = computeProjectsRevenueBreakdown(projects);
    const containerId = 'projects-revenue-breakdown';
    let container = document.getElementById(containerId);
  const rows = [
      { label: t('reservations.reports.kpi.revenue.details.gross', 'الإيراد الكلي', 'Gross revenue'), value: formatCurrency(breakdown.grossRevenue) },
      { label: t('reservations.reports.kpi.revenue.details.share', 'نسبة الشركة', 'Company share'), value: formatCurrency(breakdown.companyShareTotal) },
      { label: t('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'), value: formatCurrency(breakdown.taxTotal) },
      { label: t('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'), value: formatCurrency(breakdown.crewTotal) },
      { label: t('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'), value: formatCurrency(breakdown.crewCostTotal) },
      { label: t('reservations.reports.kpi.revenue.details.equipment', 'إجمالي المعدات', 'Equipment total'), value: formatCurrency(breakdown.equipmentTotalCombined) },
      { label: t('projects.reports.kpi.revenue.details.projectExpenses', 'تكلفة الخدمات الإنتاجية', 'Project expenses'), value: `−${formatCurrency(breakdown.projectExpensesTotal)}` },
      { label: t('projects.reports.kpi.revenue.details.servicesRevenue', 'إيرادات الخدمات الإنتاجية', 'Services revenue'), value: `${formatCurrency(breakdown.servicesRevenueTotal)}` },
      { label: t('reservations.reports.kpi.revenue.details.net', 'صافي الربح', 'Net profit'), value: formatCurrency(breakdown.netProfit) },
      // Note: Margin is already shown as a KPI card; avoid duplication here for cleaner layout
    ];

    const detailsHtml = `
      <div id="${containerId}" class="reports-kpi-details glass-card" style="margin-top: 12px;">
        ${rows.map(({ label, value }) => `
          <div class="reports-kpi-detail-row d-flex justify-content-between">
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

function computeProjectsRevenueBreakdown(projects) {
  const projectIds = new Set(projects.map((p) => String(p.id)));
  const reservationsAll = state.reservations.filter((res) => res.projectId != null && projectIds.has(String(res.projectId)));

  // Group reservations by project and aggregate equipment/crew
  const resByProject = new Map();
  let equipmentReservations = 0;
  let crewTotal = 0;
  let crewCostTotal = 0;
  reservationsAll.forEach((res) => {
    const f = computeReservationFinancials(res);
    equipmentReservations += f.equipmentTotal || 0;
    crewTotal += f.crewTotal || 0;
    crewCostTotal += f.crewCostTotal || 0;
    const arr = resByProject.get(String(res.projectId)) || [];
    arr.push(res);
    resByProject.set(String(res.projectId), arr);
  });

  let grossRevenue = 0;
  let taxTotal = 0;
  let companyShareTotal = 0;
  let projectExpensesTotal = 0;
  let servicesRevenueTotal = 0;
  let projectEquipmentEstimateTotal = 0;

  projects.forEach((p) => {
    const { subtotal: projectSubtotal, applyTax, companyShareAmount, expensesTotal } = resolveProjectTotals(p);
    companyShareTotal += companyShareAmount || 0;
    projectExpensesTotal += Number(expensesTotal || 0);
    projectEquipmentEstimateTotal += Number(p.raw?.equipmentEstimate ?? p.equipmentEstimate ?? 0) || 0;
    servicesRevenueTotal += getProjectServicesRevenue(p);

    const list = resByProject.get(String(p.id)) || [];
    const reservationsNet = list.reduce((sum, res) => {
      const f = computeReservationFinancials(res);
      const resTax = Number(f.taxAmount || 0);
      const resFinal = Number(f.finalTotal || 0);
      return sum + Math.max(0, resFinal - resTax);
    }, 0);

    const combinedTax = applyTax ? (projectSubtotal + reservationsNet) * PROJECT_TAX_RATE : 0;
    grossRevenue += projectSubtotal + reservationsNet + combinedTax;
    taxTotal += combinedTax;
  });

  const equipmentTotalCombined = equipmentReservations + projectEquipmentEstimateTotal;
  const revenueExTax = Math.max(0, grossRevenue - taxTotal);
  const netProfit = revenueExTax - projectExpensesTotal - crewCostTotal;
  const profitMarginPercent = revenueExTax > 0 ? (netProfit / revenueExTax) * 100 : 0;

  return {
    grossRevenue,
    companyShareTotal,
    taxTotal,
    crewTotal,
    crewCostTotal,
    equipmentTotalCombined,
    projectExpensesTotal,
    servicesRevenueTotal,
    netProfit,
    revenueExTax,
    profitMarginPercent,
  };
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

  const statusOrder = ['upcoming', 'ongoing', 'completed'];
  const counts = statusOrder.map((status) => projects.filter((project) => project.status === status).length);
  const labels = statusOrder.map((status) => t(`projects.status.${status}`, status));
  const total = counts.reduce((sum, value) => sum + value, 0);
  const series = total > 0 ? counts : [];

  const options = {
    chart: {
      type: 'donut',
      height: 320,
      toolbar: { show: false }
    },
    labels,
    series,
    colors: ['#3b82f6', '#fbbf24', '#22c55e'],
    dataLabels: {
      formatter: (val) => (Number.isFinite(val) ? `${Math.round(val)}%` : '0%')
    },
    legend: {
      position: 'bottom',
      fontSize: '13px'
    },
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    noData: {
      text: t('projects.reports.noData', 'لا توجد بيانات متاحة')
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 280 }
        }
      }
    ]
  };

  renderApexChart('status', container, options);
}

function renderTimelineChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-timeline-chart');
  if (!container) return;

  const monthBuckets = new Map();
  const formatter = new Intl.DateTimeFormat(getChartLocale(), { month: 'short', year: 'numeric' });

  projects.forEach((project) => {
    if (!project.start || Number.isNaN(project.start.getTime())) return;
    const bucketKey = `${project.start.getFullYear()}-${project.start.getMonth() + 1}`;
    const current = monthBuckets.get(bucketKey) || { total: 0, label: formatter.format(project.start) };
    current.total += project.overallTotal;
    monthBuckets.set(bucketKey, current);
  });

  const sortedKeys = Array.from(monthBuckets.keys()).sort((a, b) => {
    const [aYear, aMonth] = a.split('-').map(Number);
    const [bYear, bMonth] = b.split('-').map(Number);
    if (aYear === bYear) return aMonth - bMonth;
    return aYear - bYear;
  });

  const limitedKeys = sortedKeys.slice(-12);
  const labels = limitedKeys.map((key) => monthBuckets.get(key)?.label || key);
  const values = limitedKeys.map((key) => Math.round(monthBuckets.get(key)?.total || 0));
  const series = values.length
    ? [{ name: t('projects.reports.datasets.value', 'Total value'), data: values }]
    : [];

  const options = {
    chart: {
      type: 'area',
      height: 320,
      toolbar: { show: false }
    },
    series,
    xaxis: {
      categories: labels,
      labels: {
        rotate: -35
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.5,
        opacityTo: 0.05
      }
    },
    markers: { size: 4 },
    colors: ['#4c6ef5'],
    tooltip: {
      y: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    noData: {
      text: t('projects.reports.noData', 'لا توجد بيانات متاحة')
    }
  };

  renderApexChart('timeline', container, options);
}

function renderExpenseChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-expense-chart');
  if (!container) return;

  const topProjects = [...projects]
    .sort((a, b) => b.overallTotal - a.overallTotal)
    .slice(0, 6);

  const labels = topProjects.map((project) => project.title || project.projectCode);
  const valueData = topProjects.map((project) => Math.round(project.overallTotal));
  const expenseData = topProjects.map((project) => Math.round(project.expensesTotal));
  const series = labels.length
    ? [
        { name: t('projects.reports.datasets.value', 'Total value'), data: valueData },
        { name: t('projects.reports.datasets.expenses', 'تكلفة الخدمات الإنتاجية'), data: expenseData }
      ]
    : [];

  const chartHeight = Math.max(320, labels.length * 60 || 0);

  const options = {
    chart: {
      type: 'bar',
      height: chartHeight,
      toolbar: { show: false }
    },
    series,
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '55%',
        borderRadius: 8
      }
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      fontSize: '13px'
    },
    colors: ['#4c6ef5', '#f472b6'],
    tooltip: {
      y: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    noData: {
      text: t('projects.reports.noData', 'لا توجد بيانات متاحة')
    }
  };

  renderApexChart('expenses', container, options);
}

function renderClientsChart(projects) {
  if (!ChartLib) return;
  const container = document.getElementById('reports-clients-chart');
  if (!container) return;

  const clientTotals = new Map();
  projects.forEach((project) => {
    const key = project.clientName || project.clientCompany || t('projects.fallback.unknownClient', 'Unknown client');
    const current = clientTotals.get(key) || 0;
    clientTotals.set(key, current + project.overallTotal);
  });

  const sortedClients = Array.from(clientTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const labels = sortedClients.map(([client]) => client);
  const values = sortedClients.map(([, total]) => Math.round(total));
  const series = values.length
    ? [{ name: t('projects.reports.datasets.value', 'Total value'), data: values }]
    : [];

  const options = {
    chart: {
      type: 'bar',
      height: 320,
      toolbar: { show: false }
    },
    series,
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '60%'
      }
    },
    xaxis: {
      categories: labels,
      labels: {
        rotate: -35
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    dataLabels: { enabled: false },
    colors: ['#3b82f6'],
    tooltip: {
      y: {
        formatter: (value) => formatCompactNumber(value)
      }
    },
    legend: { show: false },
    noData: {
      text: t('projects.reports.noData', 'لا توجد بيانات متاحة')
    }
  };

  renderApexChart('clients', container, options);
}

function renderApexChart(key, element, options = {}) {
  if (!ChartLib || !element) return;
  if (charts[key]) {
    try {
      charts[key].destroy();
    } catch (error) {
      console.warn(`⚠️ [projectsReports] Failed to destroy ${key} chart`, error);
    }
    delete charts[key];
  }

  element.innerHTML = '';

  const chartOptions = { ...options };
  if (!Array.isArray(chartOptions.series)) {
    chartOptions.series = [];
  }

  try {
    const chart = new ChartLib(element, chartOptions);
    charts[key] = chart;
    chart.render().catch((error) => {
      console.error(`❌ [projectsReports] Failed to render ${key} chart`, error);
    });
  } catch (error) {
    console.error(`❌ [projectsReports] Failed to render ${key} chart`, error);
  }
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
  if (!Array.isArray(projects) || projects.length === 0) {
    try { alert('لا توجد بيانات لتصديرها.'); } catch (_) {}
    return;
  }
  const XLSX = await ensureXlsx();
  if (!XLSX) {
    try { alert('مكتبة Excel غير متوفرة.'); } catch (_) {}
    return;
  }
  const headers = [
    'كود المشروع', 'المشروع', 'العميل', 'الحالة', 'الفترة', 'القيمة',
    'تقدير المعدات', 'إيرادات الخدمات', 'تكلفة الخدمات', 'صافي الحجوزات (بدون ضريبة)',
    'صافي الربح', 'هامش الربح %', 'حالة الدفع', 'المبالغ المدفوعة', 'نسبة الدفع %', 'عدد الدفعات'
  ];
  const rows = projects.map((p) => {
    const m = computeProjectMetrics(p);
    const periodLabel = formatProjectPeriod(p.start, p.end);
    const statusLabel = t(`projects.status.${p.status}`, p.status);
    const paymentLabel = t(`projects.paymentStatus.${p.paymentStatus}`, p.paymentStatus);
    const customerLabel = p.clientCompany ? `${p.clientName} (${p.clientCompany})` : (p.clientName || '');
    const paidAmount = Number(p.raw?.paidAmount ?? p.paidAmount ?? 0) || 0;
    const paidPercent = Number(p.raw?.paidPercent ?? p.paidPercent ?? 0) || 0;
    const paymentsCount = Array.isArray(p.raw?.paymentHistory) ? p.raw.paymentHistory.length : 0;
    return [
      String(p.projectCode || p.id || ''),
      String(p.title || p.projectCode || ''),
      String(customerLabel),
      statusLabel,
      periodLabel,
      Math.round(p.overallTotal || 0),
      Math.round(m.equipmentEstimate || 0),
      Math.round(m.servicesRevenue || 0),
      Math.round(m.projectExpenses || 0),
      Math.round(m.resNetRevenue || 0),
      Math.round(m.netProfit || 0),
      Number((m.marginPercent || 0).toFixed(1)),
      paymentLabel,
      Math.round(paidAmount || 0),
      Number((paidPercent || 0).toFixed(1)),
      paymentsCount,
    ];
  });
  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, worksheet, 'Projects');
  const now = new Date();
  const ts = now.toISOString().slice(0, 19).replace(/[:T]/g, '-');
  XLSX.writeFile(wb, `projects-report-${ts}.xlsx`);
}

function renderTable(projects) {
  if (!dom.table || !dom.tableBody || !dom.tableEmpty) return;

  if (!projects.length) {
    dom.table.style.display = 'none';
    dom.tableEmpty.classList.add('active');
    if (dom.tableMeta) {
      dom.tableMeta.textContent = '';
    }
    return;
  }

  dom.table.style.display = '';
  dom.tableEmpty.classList.remove('active');

  const rowsHtml = sortProjects([...(projects || [])]).map((project) => {
    const metrics = computeProjectMetrics(project);
    const periodLabel = formatProjectPeriod(project.start, project.end);
    const statusLabel = t(`projects.status.${project.status}`, project.status);
    const statusChip = `<span class=\"timeline-status-badge timeline-status-badge--${project.status}\">${escapeHtml(statusLabel)}</span>`;
    const paymentLabel = t(`projects.paymentStatus.${project.paymentStatus}`, project.paymentStatus);
    const clientLabel = project.clientCompany
      ? `${escapeHtml(project.clientName)} <small class="text-muted">${escapeHtml(project.clientCompany)}</small>`
      : escapeHtml(project.clientName || t('projects.fallback.unknownClient', 'Unknown client'));

    const mainRow = `
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${escapeHtml(project.title || project.projectCode)}</span>
            <small class="text-muted">${escapeHtml(`#${project.projectCode}`)}</small>
          </div>
        </td>
        <td>${clientLabel}</td>
        <td>${statusChip}</td>
        <td>${escapeHtml(periodLabel)}</td>
        <td>${escapeHtml(formatCurrency(project.overallTotal))}</td>
        <td>${escapeHtml(formatPercent(metrics.marginPercent))}</td>
        <td>${escapeHtml(paymentLabel)}</td>
      </tr>
    `;

    if (!state.__debug) return mainRow;

    // Debug row: show quick financial components to help diagnose zeros
    const debugBits = [];
    debugBits.push(`resFinal=${Math.round(metrics.resFinal)}`);
    debugBits.push(`resTax=${Math.round(metrics.resTax)}`);
    debugBits.push(`resNet=${Math.round(metrics.resNetRevenue)}`);
    debugBits.push(`equipEst=${Math.round(metrics.equipmentEstimate)}`);
    debugBits.push(`services=${Math.round(metrics.servicesRevenue)}`);
    debugBits.push(`expenses=${Math.round(metrics.projectExpenses)}`);
    debugBits.push(`netProfit=${Math.round(metrics.netProfit)}`);
    debugBits.push(`margin=${Number((metrics.marginPercent || 0).toFixed(1))}%`);
    // project-level inputs
    const shareEnabled = project?.raw?.companyShareEnabled === true || String(project?.raw?.companyShareEnabled).toLowerCase() === 'true';
    const sharePercent = shareEnabled ? (Number(project?.raw?.companySharePercent) || 0) : 0;
    const discountVal = Number(project?.raw?.discount ?? 0) || 0;
    const discountType = (project?.raw?.discountType === 'amount') ? 'amount' : 'percent';
    debugBits.push(`share%=${sharePercent}`);
    debugBits.push(`disc=${discountVal}${discountType === 'amount' ? '' : '%'}`);
    debugBits.push(`applyTax=${project.applyTax ? 'Y' : 'N'} taxRate=${Number((PROJECT_TAX_RATE * 100).toFixed(2))}%`);

    const debugRow = `
      <tr class="reports-debug-row">
        <td colspan="7">
          <code class="reports-debug-code">${escapeHtml(debugBits.join('  |  '))}</code>
        </td>
      </tr>
    `;

    return `${mainRow}${debugRow}`;
  }).join('');

  dom.tableBody.innerHTML = rowsHtml;
  if (dom.tableMeta) {
    const metaTemplate = t('projects.reports.table.meta', 'Showing {count} of {total} projects');
    dom.tableMeta.textContent = metaTemplate
      .replace('{count}', formatNumber(projects.length))
      .replace('{total}', formatNumber(state.totalProjects));
  }
}

function setupTableSorting() {
  if (!dom.tableHead || dom.tableHead.dataset.sortAttached === 'true') return;
  dom.tableHead.addEventListener('click', (event) => {
    const th = event.target.closest('[data-sort-key]');
    if (!th) return;
    const key = th.getAttribute('data-sort-key');
    if (!key) return;
    if (sortState.key === key) {
      sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortState.key = key;
      sortState.dir = (key === 'project' || key === 'client' || key === 'status') ? 'asc' : 'desc';
    }
    renderAll();
  });
  dom.tableHead.dataset.sortAttached = 'true';
}

function sortProjects(list) {
  const dirMul = sortState.dir === 'asc' ? 1 : -1;
  const key = sortState.key;
  const cmp = (a, b) => {
    switch (key) {
      case 'project': {
        const aa = String(a.title || a.projectCode || '').toLowerCase();
        const bb = String(b.title || b.projectCode || '').toLowerCase();
        return aa.localeCompare(bb, 'ar');
      }
      case 'client': {
        const aa = String(a.clientName || '').toLowerCase();
        const bb = String(b.clientName || '').toLowerCase();
        return aa.localeCompare(bb, 'ar');
      }
      case 'status': {
        const aa = String(a.status || '');
        const bb = String(b.status || '');
        return aa.localeCompare(bb, 'ar');
      }
      case 'period': {
        const aa = a.start ? new Date(a.start).getTime() : 0;
        const bb = b.start ? new Date(b.start).getTime() : 0;
        return aa - bb;
      }
      case 'value':
        return (a.overallTotal || 0) - (b.overallTotal || 0);
      case 'margin': {
        const ma = computeProjectMetrics(a).marginPercent || 0;
        const mb = computeProjectMetrics(b).marginPercent || 0;
        return ma - mb;
      }
      case 'payment': {
        const prio = (p) => (p === 'paid' ? 2 : (p === 'partial' ? 1 : 0));
        return prio(a.paymentStatus) - prio(b.paymentStatus);
      }
      default:
        return (a.overallTotal || 0) - (b.overallTotal || 0);
    }
  };
  return list.sort((a, b) => dirMul * cmp(a, b));
}

function updateSortIndicators() {
  if (!dom.tableHead) return;
  dom.tableHead.querySelectorAll('th.sortable').forEach((th) => {
    th.classList.remove('is-sorted');
    th.removeAttribute('data-dir');
    const key = th.getAttribute('data-sort-key');
    if (key) {
      th.setAttribute('title', buildSortTitle(key, null));
    }
  });
  const active = dom.tableHead.querySelector(`th.sortable[data-sort-key="${sortState.key}"]`);
  if (active) {
    active.classList.add('is-sorted');
    active.setAttribute('data-dir', sortState.dir);
    active.setAttribute('title', buildSortTitle(sortState.key, sortState.dir));
  }
}

function buildSortTitle(key, dir) {
  const labelKeyMap = {
    project: 'projects.reports.table.columns.project',
    client: 'projects.reports.table.columns.client',
    status: 'projects.reports.table.columns.status',
    period: 'projects.reports.table.columns.period',
    value: 'projects.reports.table.columns.value',
    margin: 'projects.reports.table.columns.margin',
    payment: 'projects.reports.table.columns.payment',
  };
  const colLabel = t(labelKeyMap[key] || '', key);
  if (!dir) {
    return `${colLabel} — ${t('projects.reports.table.sortable', 'قابل للفرز')}`;
  }
  const dirLabel = dir === 'asc'
    ? t('projects.reports.table.sort.asc', 'ترتيب تصاعدي')
    : t('projects.reports.table.sort.desc', 'ترتيب تنازلي');
  return `${colLabel} — ${dirLabel}`;
}

function formatProjectPeriod(start, end) {
  if (!start && !end) return '—';
  const startLabel = start ? formatDateTime(start.toISOString()) : '—';
  const endLabel = end ? formatDateTime(end.toISOString()) : '—';
  if (!end) return startLabel;
  return `${startLabel} → ${endLabel}`;
}

function formatCurrency(value) {
  const number = Number(value) || 0;
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(number));
  const currencyLabel = 'SR';
  return `${normalizeNumbers(formatted)} ${currencyLabel}`;
}

function formatNumber(value) {
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  return normalizeNumbers(new Intl.NumberFormat(locale).format(value));
}

function formatPercent(value) {
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  const num = Number.isFinite(value) ? value : 0;
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(num);
  return `${normalizeNumbers(formatted)}%`;
}

function formatCompactNumber(value) {
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  return normalizeNumbers(new Intl.NumberFormat(locale, { notation: 'compact', compactDisplay: 'short' }).format(value));
}

function getChartLocale() {
  const lang = getCurrentLanguage();
  return lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
