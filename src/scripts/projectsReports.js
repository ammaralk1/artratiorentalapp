import { loadData } from './storage.js';
import { t, getCurrentLanguage } from './language.js';
import { normalizeNumbers, formatDateTime } from './utils.js';
import { calculateReservationTotal } from './reservationsSummary.js';
import {
  ensureProjectsLoaded,
  getProjectsState,
  refreshProjectsFromApi,
  isApiError as isProjectApiError,
} from './projectsService.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, refreshReservationsFromApi } from './reservationsService.js';

const PROJECT_TAX_RATE = 0.15;
const charts = {};
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
    range: 'all',
    startDate: '',
    endDate: ''
  }
};

const dom = {
  search: null,
  payment: null,
  dateRange: null,
  customRangeWrapper: null,
  startDate: null,
  endDate: null,
  refreshBtn: null,
  kpiGrid: null,
  statusChips: null,
  table: null,
  tableBody: null,
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
});

let ChartLib = null;
const STATUS_OPTIONS = ['upcoming', 'ongoing', 'completed'];

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

  await ensureChartLibrary();
  try {
    await loadReportsData({ forceProjects: true });
    renderStatusChips();
    setupFilters();
    renderAll();
  } finally {
    endChartsLoading();
  }

  document.addEventListener('language:changed', handleLanguageChanged);
  document.addEventListener('projects:changed', () => {
    handleDataMutation().catch((error) => {
      console.error('❌ [projectsReports] Failed to refresh after projects change', error);
    });
  });
  document.addEventListener('reservations:changed', () => {
    handleDataMutation().catch((error) => {
      console.error('❌ [projectsReports] Failed to refresh after reservations change', error);
    });
  });
  window.addEventListener('storage', handleStorageSync);
}

document.addEventListener('DOMContentLoaded', initReports);

async function ensureChartLibrary() {
  if (ChartLib) return ChartLib;
  try {
    const module = await import('https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js');
    ChartLib = module.default;
  } catch (error) {
    console.warn('Chart.js failed to load', error);
    ChartLib = null;
  }
  return ChartLib;
}

function cacheDom() {
  dom.search = document.getElementById('reports-search');
  dom.statusChips = document.getElementById('reports-status-chips');
  dom.payment = document.getElementById('reports-payment');
  dom.dateRange = document.getElementById('reports-date-range');
  dom.customRangeWrapper = document.getElementById('reports-custom-range');
  dom.startDate = document.getElementById('reports-start-date');
  dom.endDate = document.getElementById('reports-end-date');
  dom.refreshBtn = document.getElementById('reports-refresh');
  dom.kpiGrid = document.getElementById('reports-kpi-grid');
  dom.table = document.getElementById('reports-table');
  dom.tableBody = dom.table?.querySelector('tbody');
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

function buildProjectSnapshot(project, customerMap) {
  const normalizedPayment = project.paymentStatus === 'paid' ? 'paid' : 'unpaid';
  const client = customerMap.get(String(project.clientId));
  const reservations = getReservationsForProject(project.id);
  const reservationsTotal = reservations.reduce((sum, reservation) => sum + resolveReservationNetTotal(reservation), 0);

  const expensesTotal = getProjectExpenses(project);
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const subtotal = Number((equipmentEstimate + expensesTotal).toFixed(2));
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';
  const taxAmount = applyTax ? Number((subtotal * PROJECT_TAX_RATE).toFixed(2)) : 0;
  const combinedTaxAmount = applyTax
    ? Number(((subtotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((subtotal + reservationsTotal + combinedTaxAmount).toFixed(2));

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
    subtotal,
    taxAmount,
    combinedTaxAmount,
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
  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
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
}

function getFilteredProjects() {
  const { search, statuses, payment, range, startDate, endDate } = state.filters;
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
  const totalValue = projects.reduce((sum, project) => sum + project.overallTotal, 0);
  const unpaidValue = projects.reduce((sum, project) => sum + project.unpaidValue, 0);
  const expensesTotal = projects.reduce((sum, project) => sum + project.expensesTotal, 0);

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
      meta: t('projects.reports.kpi.totalValueMeta', 'Includes projects and linked reservations')
    },
    {
      icon: KPI_ICONS.outstanding,
      label: t('projects.reports.kpi.unpaidValue', 'Outstanding value'),
      value: formatCurrency(unpaidValue),
      meta: t('projects.reports.kpi.unpaidValueMeta', 'Projects not fully paid yet')
    },
    {
      icon: KPI_ICONS.expenses,
      label: t('projects.reports.kpi.expenses', 'Total expenses'),
      value: formatCurrency(expensesTotal),
      meta: t('projects.reports.kpi.expensesMeta', 'Expenses for included projects')
    }
  ];

  dom.kpiGrid.innerHTML = cards.map(({ icon, label, value, meta }) => `
    <div class="reports-kpi-card glass-card">
      <div class="reports-kpi-icon">${icon}</div>
      <div class="reports-kpi-content">
        <p class="reports-kpi-label">${escapeHtml(label)}</p>
        <p class="reports-kpi-value">${escapeHtml(value)}</p>
        <span class="reports-kpi-meta">${escapeHtml(meta)}</span>
      </div>
    </div>
  `).join('');
}

function renderStatusChips() {
  if (!dom.statusChips) return;
  const chipsHtml = STATUS_OPTIONS.map((status) => {
    const label = t(`projects.status.${status}`, status);
    return `<button type="button" class="btn btn-outline-primary reports-status-chip" data-status="${status}">${escapeHtml(label)}</button>`;
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
  const ctx = document.getElementById('reports-status-chart');
  if (!ctx) return;

  const statusOrder = ['upcoming', 'ongoing', 'completed'];
  const counts = statusOrder.map((status) => projects.filter((project) => project.status === status).length);
  const labels = statusOrder.map((status) => t(`projects.status.${status}`, status));

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          'rgba(59, 130, 246, 0.85)',
          'rgba(250, 204, 21, 0.85)',
          'rgba(34, 197, 94, 0.85)'
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(217, 119, 6, 1)',
          'rgba(22, 163, 74, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true
        }
      }
    }
  };

  updateChartInstance('status', ctx, 'doughnut', data, options);
}

function renderTimelineChart(projects) {
  if (!ChartLib) return;
  const ctx = document.getElementById('reports-timeline-chart');
  if (!ctx) return;

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

  const data = {
    labels,
    datasets: [
      {
        label: t('projects.reports.charts.timeline', 'Revenue over time'),
        data: values,
        borderColor: 'rgba(76, 110, 245, 0.95)',
        backgroundColor: 'rgba(76, 110, 245, 0.25)',
        fill: true,
        tension: 0.35,
        pointRadius: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCompactNumber(value)
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  updateChartInstance('timeline', ctx, 'line', data, options);
}

function renderExpenseChart(projects) {
  if (!ChartLib) return;
  const ctx = document.getElementById('reports-expense-chart');
  if (!ctx) return;

  const topProjects = [...projects]
    .sort((a, b) => b.overallTotal - a.overallTotal)
    .slice(0, 6);

  const labels = topProjects.map((project) => project.title || project.projectCode);
  const valueData = topProjects.map((project) => Math.round(project.overallTotal));
  const expenseData = topProjects.map((project) => Math.round(project.expensesTotal));

  const data = {
    labels,
    datasets: [
      {
        label: t('projects.reports.datasets.value', 'Total value'),
        data: valueData,
        backgroundColor: 'rgba(76, 110, 245, 0.65)'
      },
      {
        label: t('projects.reports.datasets.expenses', 'Expenses'),
        data: expenseData,
        backgroundColor: 'rgba(244, 114, 182, 0.55)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCompactNumber(value)
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true
        }
      }
    }
  };

  updateChartInstance('expenses', ctx, 'bar', data, options);
}

function renderClientsChart(projects) {
  if (!ChartLib) return;
  const ctx = document.getElementById('reports-clients-chart');
  if (!ctx) return;

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

  const data = {
    labels,
    datasets: [
      {
        label: t('projects.reports.charts.clients', 'Top clients'),
        data: values,
        backgroundColor: 'rgba(59, 130, 246, 0.75)'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => formatCompactNumber(value)
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  updateChartInstance('clients', ctx, 'bar', data, options);
}

function updateChartInstance(key, ctx, type, data, options) {
  if (!ChartLib || !ctx) return;
  if (charts[key]) {
    charts[key].destroy();
    delete charts[key];
  }
  charts[key] = new ChartLib(ctx, { type, data, options });
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

  const rowsHtml = projects.map((project) => {
    const periodLabel = formatProjectPeriod(project.start, project.end);
    const statusLabel = t(`projects.status.${project.status}`, project.status);
    const paymentLabel = t(`projects.paymentStatus.${project.paymentStatus}`, project.paymentStatus);
    const clientLabel = project.clientCompany
      ? `${escapeHtml(project.clientName)} <small class="text-muted">${escapeHtml(project.clientCompany)}</small>`
      : escapeHtml(project.clientName || t('projects.fallback.unknownClient', 'Unknown client'));

    return `
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${escapeHtml(project.title || project.projectCode)}</span>
            <small class="text-muted">${escapeHtml(`#${project.projectCode}`)}</small>
          </div>
        </td>
        <td>${clientLabel}</td>
        <td>${escapeHtml(statusLabel)}</td>
        <td>${escapeHtml(periodLabel)}</td>
        <td>${escapeHtml(formatCurrency(project.overallTotal))}</td>
        <td>${escapeHtml(paymentLabel)}</td>
      </tr>
    `;
  }).join('');

  dom.tableBody.innerHTML = rowsHtml;
  if (dom.tableMeta) {
    const metaTemplate = t('projects.reports.table.meta', 'Showing {count} of {total} projects');
    dom.tableMeta.textContent = metaTemplate
      .replace('{count}', formatNumber(projects.length))
      .replace('{total}', formatNumber(state.totalProjects));
  }
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
