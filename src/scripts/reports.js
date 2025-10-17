import { isReservationCompleted, resolveReservationProjectState, normalizeText } from './reservationsShared.js';
import { t, getCurrentLanguage } from './language.js';
import { normalizeNumbers } from './utils.js';
import { apiRequest, ApiError } from './apiClient.js';
import { mapReservationFromApi, mapLegacyReservation } from './reservationsService.js';
import { DEFAULT_COMPANY_SHARE_PERCENT } from './reservationsSummary.js';
import { mapTechnicianFromApi } from './techniciansService.js';
import { loadData } from './storage.js';
import { mapMaintenanceFromApi } from './maintenanceService.js';

let cachedLocale = null;
let numberFormatter = null;

const state = {
  range: 'all',
  status: 'all',
  payment: 'all',
  share: 'all',
  search: '',
  start: null,
  end: null
};

let initialized = false;
let languageListenerAttached = false;
let searchDebounceTimer = null;

const reportsData = {
  reservations: [],
  customers: [],
  equipment: [],
  technicians: [],
  projects: [],
  maintenance: [],
  projectsMap: new Map(),
};

let reportsLoading = false;
let reportsErrorMessage = '';

const reportsEmptyDefaults = {
  icon: null,
  title: null,
  subtitle: null,
};

let reportsDataListenersAttached = false;

const loadedScripts = new Map();
let apexChartsReady = null;
let html2PdfReady = null;
let xlsxReady = null;

let techniciansIndex = null;

const charts = {
  trend: null,
  status: null,
  payment: null
};

const lastReportSnapshot = {
  filtered: [],
  metrics: null,
  trend: [],
  statusBreakdown: [],
  paymentBreakdown: [],
  tableRows: [],
  maintenance: { total: 0, items: [] }
};

const columnPreferences = {
  code: true,
  customer: true,
  date: true,
  status: true,
  payment: true,
  total: true,
  share: true,
  net: true
};

let exportHandlersBound = false;
let columnControlsBound = false;
let drilldownBound = false;
let lastTrendData = [];
let lastStatusData = [];
let lastPaymentData = [];
let themeListenerAttached = false;
let startDatePicker = null;
let endDatePicker = null;
let startDateInputRef = null;
let endDateInputRef = null;

function translate(key, arFallback, enFallback = arFallback) {
  const fallback = getCurrentLanguage() === 'en' ? (enFallback ?? arFallback) : arFallback;
  return t(key, fallback);
}

function handleLanguageChange() {
  resetFormatters();
  renderReports();
  // إعادة التنفيذ بعد دورة حدث واحدة لضمان اكتمال تحميل الترجمات
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
  if (state.range === 'custom') {
    renderReports();
  }
}

function resetFormatters() {
  cachedLocale = null;
  numberFormatter = null;
}

function getActiveLocale() {
  const lang = (getCurrentLanguage() || 'ar').toLowerCase();
  return lang.startsWith('ar') ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
}

function getFormatters() {
  const language = getCurrentLanguage();
  if (language !== cachedLocale || !numberFormatter) {
    cachedLocale = language;
    const locale = getActiveLocale();
    numberFormatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  }
  return { numberFormatter };
}

function getMonthLabel(date) {
  const locale = getActiveLocale();
  return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
}

function formatDateInput(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return '';
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadExternalScript(src) {
  if (loadedScripts.has(src)) {
    return loadedScripts.get(src);
  }

  const existing = document.querySelector(`script[src="${src}"]`);

  const promise = new Promise((resolve, reject) => {
    const handleResolve = () => {
      if (existing) {
        existing.dataset.loaded = 'true';
      }
      resolve();
    };
    const handleReject = (error) => reject(error);

    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', handleResolve, { once: true });
      existing.addEventListener('error', handleReject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });

  loadedScripts.set(src, promise);
  return promise;
}

function ensureApexCharts() {
  if (window.ApexCharts) return Promise.resolve(window.ApexCharts);
  if (!apexChartsReady) {
    const apexchartsCdnUrl = 'https://cdn.jsdelivr.net/npm/apexcharts@3.53.0';
    apexChartsReady = loadExternalScript(apexchartsCdnUrl).then(() => window.ApexCharts);
  }
  return apexChartsReady;
}

function ensureHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  if (!html2PdfReady) {
    html2PdfReady = loadExternalScript('https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js')
      .then(() => window.html2pdf);
  }
  return html2PdfReady;
}

function ensureXlsx() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (!xlsxReady) {
    xlsxReady = loadExternalScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js')
      .then(() => window.XLSX);
  }
  return xlsxReady;
}

function getThemeMode() {
  const root = document.documentElement;
  return root.classList.contains('dark') || root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function mapCustomerFromApi(raw = {}) {
  return {
    id: raw?.id != null ? String(raw.id) : '',
    customerName: raw?.full_name ?? raw?.customerName ?? raw?.name ?? '',
    companyName: raw?.company ?? raw?.company_name ?? raw?.companyName ?? '',
    phone: raw?.phone ?? '',
  };
}

function mapEquipmentFromApi(raw = {}) {
  const barcode = normalizeNumbers(String(raw?.barcode ?? '')).trim();
  const description = raw?.description ?? raw?.name ?? '';
  return {
    id: raw?.id != null ? String(raw.id) : '',
    barcode,
    desc: description,
    description,
    name: raw?.name ?? description,
    category: raw?.category ?? '',
    subcategory: raw?.subcategory ?? '',
    status: raw?.status ?? '',
    price: Number.parseFloat(raw?.unit_price ?? raw?.price ?? 0) || 0,
  };
}

function mapProjectFromApi(raw = {}) {
  const title = raw?.title ?? raw?.name ?? '';
  const code = raw?.project_code ?? raw?.projectCode ?? '';
  const status = raw?.status ?? '';
  const confirmed = raw?.confirmed === true || normalizeStatusValue(status) === 'confirmed' || normalizeStatusValue(status) === 'completed';

  return {
    id: raw?.id != null ? String(raw.id) : '',
    title,
    code,
    status,
    confirmed,
  };
}

function hydrateReportsFromCache() {
  if (typeof loadData !== 'function') {
    return false;
  }

  let cached;
  try {
    cached = loadData();
  } catch (error) {
    console.warn('⚠️ [reports] Failed to access cached data', error);
    return false;
  }

  if (!cached || typeof cached !== 'object') {
    return false;
  }

  const {
    reservations = [],
    customers = [],
    equipment = [],
    technicians = [],
    projects = [],
  } = cached;

  const hasData = reservations.length || customers.length || equipment.length || technicians.length || projects.length;
  if (!hasData) {
    return false;
  }

  reportsData.reservations = Array.isArray(reservations)
    ? reservations.map(mapLegacyReservation)
    : [];
  reportsData.customers = Array.isArray(customers)
    ? customers.map(mapCustomerFromApi)
    : [];
  reportsData.equipment = Array.isArray(equipment)
    ? equipment.map(mapEquipmentFromApi)
    : [];
  reportsData.technicians = Array.isArray(technicians)
    ? technicians.map(mapTechnicianFromApi)
    : [];
  reportsData.projects = Array.isArray(projects)
    ? projects.map(mapProjectFromApi)
    : [];
  reportsData.projectsMap = new Map(reportsData.projects.map((project) => [project.id, project]));
  techniciansIndex = new Map((reportsData.technicians || []).map((tech) => [String(tech.id), tech]));

  return true;
}

const REPORT_MS_PER_DAY = 24 * 60 * 60 * 1000;

function calculateReservationDaysForReports(start, end) {
  if (!start || !end) return 1;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 1;
  const diffMs = endDate.getTime() - startDate.getTime();
  if (diffMs <= 0) return 1;
  return Math.max(1, Math.ceil(diffMs / REPORT_MS_PER_DAY));
}

function getTechnicianRecordById(id) {
  if (!id) return null;
  if (!techniciansIndex) {
    techniciansIndex = new Map((reportsData.technicians || []).map((tech) => [String(tech.id), tech]));
  }
  return techniciansIndex.get(String(id)) || null;
}

function resolveTechnicianDailyRateForReports(technician = {}) {
  const candidates = [
    technician.dailyWage,
    technician.daily_rate,
    technician.dailyRate,
    technician.wage,
    technician.rate
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = Number.parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
}

function resolveTechnicianTotalRateForReports(technician = {}) {
  const candidates = [
    technician.dailyTotal,
    technician.daily_total,
    technician.totalRate,
    technician.total,
    technician.total_wage
  ];

  for (const value of candidates) {
    if (value == null) continue;
    const parsed = Number.parseFloat(normalizeNumbers(String(value)));
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return resolveTechnicianDailyRateForReports(technician);
}

function computeReservationFinancials(reservation) {
  if (!reservation) {
    return {
      rentalDays: 1,
      equipmentTotal: 0,
      crewTotal: 0,
      crewCostTotal: 0,
      discountAmount: 0,
      subtotalAfterDiscount: 0,
      taxableAmount: 0,
      taxAmount: 0,
      finalTotal: 0,
      companySharePercent: 0,
      companyShareAmount: 0,
      netProfit: 0
    };
  }

  if (reservation.__financials) {
    return reservation.__financials;
  }

  const rentalDays = calculateReservationDaysForReports(reservation.start, reservation.end);

  const equipmentDailyTotal = (reservation.items || []).reduce((sum, item) => {
    const qty = Number(item?.qty) || Number(item?.quantity) || 1;
    const price = Number(item?.price) || Number(item?.unit_price) || 0;
    return sum + (qty * price);
  }, 0);
  const equipmentTotal = equipmentDailyTotal * rentalDays;

  const crewCostDailyTotal = (reservation.technicians || []).reduce((sum, technicianId) => {
    const technician = getTechnicianRecordById(technicianId);
    return sum + resolveTechnicianDailyRateForReports(technician);
  }, 0);
  const crewTotalDaily = (reservation.technicians || []).reduce((sum, technicianId) => {
    const technician = getTechnicianRecordById(technicianId);
    return sum + resolveTechnicianTotalRateForReports(technician);
  }, 0);
  const crewCostTotal = crewCostDailyTotal * rentalDays;
  const crewTotal = crewTotalDaily * rentalDays;

  const discountBase = equipmentTotal + crewTotal;
  const discountValue = Number(reservation.discount) || 0;
  const discountType = reservation.discountType || reservation.discount_type || 'percent';
  let discountAmount = discountType === 'amount'
    ? discountValue
    : discountBase * (discountValue / 100);
  if (!Number.isFinite(discountAmount) || discountAmount < 0) {
    discountAmount = 0;
  }
  if (discountAmount > discountBase) {
    discountAmount = discountBase;
  }

  const subtotalAfterDiscount = Math.max(0, discountBase - discountAmount);
  const applyTaxFlag = reservation.applyTax === true
    || reservation.apply_tax === true
    || reservation.apply_tax === 1
    || reservation.apply_tax === '1';

  const rawCompanySharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? null;
  const parsedCompanySharePercent = rawCompanySharePercent != null
    ? Number.parseFloat(normalizeNumbers(String(rawCompanySharePercent).replace('%', '').trim()))
    : NaN;
  const shareEnabledRaw = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied
    ?? reservation.company_share_applied
    ?? null;
  let companyShareEnabled = shareEnabledRaw != null
    ? (shareEnabledRaw === true || shareEnabledRaw === 1 || shareEnabledRaw === '1' || String(shareEnabledRaw).toLowerCase() === 'true')
    : (Number.isFinite(parsedCompanySharePercent) && parsedCompanySharePercent > 0);
  let companySharePercent = companyShareEnabled && Number.isFinite(parsedCompanySharePercent)
    ? Number(parsedCompanySharePercent)
    : 0;
  if (applyTaxFlag && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
    companyShareEnabled = true;
  }
  let companyShareAmount = companySharePercent > 0
    ? Math.max(0, subtotalAfterDiscount * (companySharePercent / 100))
    : 0;
  companyShareAmount = Number.isFinite(companyShareAmount)
    ? Number(companyShareAmount.toFixed(2))
    : 0;

  const taxableAmount = subtotalAfterDiscount + companyShareAmount;
  let taxAmount = applyTaxFlag ? taxableAmount * 0.15 : 0;
  if (!Number.isFinite(taxAmount) || taxAmount < 0) {
    taxAmount = 0;
  }
  taxAmount = Number(taxAmount.toFixed(2));

  const computedTotal = taxableAmount + taxAmount;
  const storedCost = Number(reservation.cost);
  let finalTotal = Number.isFinite(computedTotal)
    ? Number(computedTotal.toFixed(2))
    : 0;
  if (Number.isFinite(storedCost) && storedCost > 0) {
    finalTotal = storedCost;
    if (applyTaxFlag) {
      const adjustedTax = finalTotal - taxableAmount;
      if (Number.isFinite(adjustedTax) && adjustedTax >= 0) {
        taxAmount = Number(adjustedTax.toFixed(2));
      }
    }
  }

  const revenueAfterDiscount = Math.max(0, (equipmentTotal + crewTotal) - discountAmount);
  const netProfit = Math.max(0, revenueAfterDiscount - crewCostTotal);

  const breakdown = {
    rentalDays,
    equipmentTotal,
    crewTotal,
    crewCostTotal,
    discountAmount,
    subtotalAfterDiscount,
    taxableAmount,
    taxAmount,
    finalTotal,
    companySharePercent,
    companyShareAmount,
    netProfit
  };

  reservation.__financials = breakdown;
  return breakdown;
}

function getProjectForReservation(reservation) {
  if (!reservation?.projectId) return null;
  return reportsData.projectsMap.get(String(reservation.projectId)) || null;
}

function computeReportStatus(reservation) {
  const project = getProjectForReservation(reservation);
  const projectState = resolveReservationProjectState(reservation, project);
  const projectStatus = normalizeStatusValue(projectState.projectStatus);

  let statusValue = normalizeStatusValue(
    reservation?.status
      ?? reservation?.reservationStatus
      ?? reservation?.reservation_status
      ?? reservation?.state
      ?? ''
  );

  if (projectState.projectLinked && projectStatus) {
    statusValue = projectStatus;
  }

  if (!statusValue || statusValue === 'cancelled') {
    statusValue = projectState.effectiveConfirmed ? 'confirmed' : 'pending';
  }

  if (isReservationCompleted(reservation) || projectStatus === 'completed') {
    statusValue = 'completed';
  }

  const confirmed = projectState.effectiveConfirmed
    || statusValue === 'confirmed'
    || statusValue === 'completed';

  if (confirmed && statusValue !== 'completed') {
    statusValue = 'confirmed';
  }

  const paid = isReservationPaid(reservation);
  const paidStatus = reservation?.paidStatus
    ?? reservation?.paid_status
    ?? (paid ? 'paid' : 'unpaid');

  return {
    statusValue,
    confirmed,
    paid,
    paidStatus,
  };
}

async function loadReportsData({ silent = false } = {}) {
  if (reportsLoading) return;
  reportsLoading = true;
  reportsErrorMessage = '';

  if (!silent) {
    renderReports();
  }

  try {
    const [reservationsRes, customersRes, equipmentRes, techniciansRes, projectsRes, maintenanceRes] = await Promise.all([
      apiRequest('/reservations/?limit=500'),
      apiRequest('/customers/?limit=500'),
      apiRequest('/equipment/?limit=500'),
      apiRequest('/technicians/?limit=500'),
      apiRequest('/projects/?limit=500'),
      apiRequest('/maintenance/?limit=500'),
    ]);

    reportsData.reservations = Array.isArray(reservationsRes?.data)
      ? reservationsRes.data.map((item) => mapReservationFromApi(item))
      : [];
    reportsData.customers = Array.isArray(customersRes?.data)
      ? customersRes.data.map(mapCustomerFromApi)
      : [];
    reportsData.equipment = Array.isArray(equipmentRes?.data)
      ? equipmentRes.data.map(mapEquipmentFromApi)
      : [];
    reportsData.technicians = Array.isArray(techniciansRes?.data)
      ? techniciansRes.data.map(mapTechnicianFromApi)
      : [];
    reportsData.projects = Array.isArray(projectsRes?.data)
      ? projectsRes.data.map(mapProjectFromApi)
      : [];
    reportsData.projectsMap = new Map(reportsData.projects.map((project) => [project.id, project]));
    reportsData.maintenance = Array.isArray(maintenanceRes?.data)
      ? maintenanceRes.data.map(mapMaintenanceFromApi)
      : [];
    techniciansIndex = new Map((reportsData.technicians || []).map((tech) => [String(tech.id), tech]));
  } catch (error) {
    console.error('❌ [reports] Failed to load reports data', error);
    reportsErrorMessage = error instanceof ApiError
      ? error.message
      : t('reservations.reports.error.fetchFailed', 'تعذر تحميل بيانات التقارير، حاول لاحقاً');
    reportsData.reservations = [];
    reportsData.customers = [];
    reportsData.equipment = [];
    reportsData.technicians = [];
    reportsData.projects = [];
    reportsData.projectsMap = new Map();
    reportsData.maintenance = [];
    techniciansIndex = null;
  } finally {
    reportsLoading = false;
    renderReports();
  }
}

function handleReportsDataMutation() {
  loadReportsData({ silent: true }).catch((error) => {
    console.error('❌ [reports] Background refresh failed', error);
  });
}

function setReportsEmptyState({ active, icon, title, subtitle }) {
  const emptyState = document.getElementById('reports-empty-state');
  if (!emptyState) return;

  const iconEl = emptyState.querySelector('.reports-empty-icon');
  const titleEl = emptyState.querySelector('h4');
  const subtitleEl = emptyState.querySelector('p');

  if (reportsEmptyDefaults.icon === null && iconEl) {
    reportsEmptyDefaults.icon = iconEl.textContent;
  }
  if (reportsEmptyDefaults.title === null && titleEl) {
    reportsEmptyDefaults.title = titleEl.textContent;
  }
  if (reportsEmptyDefaults.subtitle === null && subtitleEl) {
    reportsEmptyDefaults.subtitle = subtitleEl.textContent;
  }

  emptyState.classList.toggle('active', Boolean(active));
  emptyState.classList.toggle('hidden', !active);

  if (!iconEl || !titleEl || !subtitleEl) {
    return;
  }

  if (active) {
    iconEl.textContent = icon !== undefined ? icon : (reportsEmptyDefaults.icon ?? iconEl.textContent);
    titleEl.textContent = title !== undefined ? title : (reportsEmptyDefaults.title ?? titleEl.textContent);
    subtitleEl.textContent = subtitle !== undefined ? subtitle : (reportsEmptyDefaults.subtitle ?? subtitleEl.textContent);
  } else {
    iconEl.textContent = reportsEmptyDefaults.icon ?? iconEl.textContent;
    titleEl.textContent = reportsEmptyDefaults.title ?? titleEl.textContent;
    subtitleEl.textContent = reportsEmptyDefaults.subtitle ?? subtitleEl.textContent;
  }
}

export function initReports() {
  if (initialized) return;
  initialized = true;

  const rangeSelect = document.getElementById('reports-range');
  const statusSelect = document.getElementById('reports-status-filter');
  const paymentSelect = document.getElementById('reports-payment-filter');
  const shareSelect = document.getElementById('reports-share-filter');
  const startInput = document.getElementById('reports-start');
  const endInput = document.getElementById('reports-end');
  const refreshBtn = document.getElementById('reports-refresh');
  const customRangeWrapper = document.getElementById('reports-custom-range');
  const searchInput = document.getElementById('reports-search');

  if (!rangeSelect) {
    return;
  }

  rangeSelect.value = state.range;

  const hydratedFromCache = hydrateReportsFromCache();
  if (hydratedFromCache) {
    renderReports();
  }

  rangeSelect.addEventListener('change', () => {
    state.range = rangeSelect.value;
    toggleCustomRange(customRangeWrapper, state.range === 'custom');
    if (state.range !== 'custom') {
      state.start = null;
      state.end = null;
    }
    renderReports();
  });

  statusSelect?.addEventListener('change', () => {
    state.status = statusSelect.value;
    renderReports();
  });

  paymentSelect?.addEventListener('change', () => {
    state.payment = paymentSelect.value;
    renderReports();
  });

  shareSelect?.addEventListener('change', () => {
    state.share = shareSelect.value;
    renderReports();
  });

  searchInput?.addEventListener('input', () => {
    const value = searchInput.value || '';
    if (searchDebounceTimer) {
      clearTimeout(searchDebounceTimer);
    }
    searchDebounceTimer = setTimeout(() => {
      state.search = value;
      renderReports();
    }, 220);
  });

  startInput?.addEventListener('change', () => {
    state.start = startInput.value || null;
    renderIfCustomRange();
  });

  endInput?.addEventListener('change', () => {
    state.end = endInput.value || null;
    renderIfCustomRange();
  });

  refreshBtn?.addEventListener('click', () => {
    if (state.range === 'custom') {
      state.start = startInput?.value || null;
      state.end = endInput?.value || null;
    }
    renderReports();
  });

  setupCustomRangePickers(startInput, endInput);
  toggleCustomRange(customRangeWrapper, false);

  if (!languageListenerAttached) {
    document.addEventListener('language:changed', handleLanguageChange);
    document.addEventListener('language:translationsReady', handleLanguageChange);
    languageListenerAttached = true;
  }

  if (!reportsDataListenersAttached) {
    document.addEventListener('reservations:changed', handleReportsDataMutation);
    document.addEventListener('customers:changed', handleReportsDataMutation);
    document.addEventListener('equipment:changed', handleReportsDataMutation);
    document.addEventListener('projects:changed', handleReportsDataMutation);
    document.addEventListener('technicians:updated', handleReportsDataMutation);
    window.addEventListener('maintenance:updated', handleReportsDataMutation);
    reportsDataListenersAttached = true;
  }

  setupColumnControls();
  setupExportButtons();
  setupDrilldownInteractions();

  if (!themeListenerAttached) {
    document.addEventListener('theme:changed', () => {
      setTimeout(() => renderReports(), 0);
    });
    themeListenerAttached = true;
  }

  loadReportsData();
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

  if (rangeSelect && rangeSelect.value !== state.range) {
    rangeSelect.value = state.range;
  }
  if (statusSelect && statusSelect.value !== state.status) {
    statusSelect.value = state.status;
  }
  if (paymentSelect && paymentSelect.value !== state.payment) {
    paymentSelect.value = state.payment;
  }
  if (shareSelect && shareSelect.value !== state.share) {
    shareSelect.value = state.share;
  }
  if (searchInput && searchInput.value !== state.search) {
    searchInput.value = state.search || '';
  }
  if (startInput && startInput.value !== (state.start || '')) {
    startInput.value = state.start || '';
  }
  if (endInput && endInput.value !== (state.end || '')) {
    endInput.value = state.end || '';
  }

  toggleCustomRange(customRangeWrapper, state.range === 'custom');
}

export function renderReports() {
  syncFilterControls();
  if (reportsLoading) {
    setReportsEmptyState({
      active: true,
      icon: '⏳',
      title: t('reservations.reports.status.loading', 'جارٍ تحميل التقارير...'),
      subtitle: t('reservations.reports.status.loadingHint', 'قد يستغرق هذا بضع ثوانٍ.'),
    });
    return;
  }

  if (reportsErrorMessage) {
    setReportsEmptyState({
      active: true,
      icon: '⚠️',
      title: reportsErrorMessage,
      subtitle: t('reservations.reports.status.retry', 'جرّب إعادة المحاولة أو تحديث الصفحة.'),
    });
    return;
  }

  const { reservations, customers, equipment, technicians } = reportsData;
  const filtered = filterReservations(reservations, state, customers, equipment, technicians);
  const metrics = calculateMetrics(filtered);
  const maintenanceSummary = calculateMaintenanceExpenses(reportsData.maintenance, state);
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

  lastReportSnapshot.filtered = filtered;
  lastReportSnapshot.metrics = metricsWithMaintenance;
  lastReportSnapshot.trend = trend;
  lastReportSnapshot.statusBreakdown = statusBreakdown;
  lastReportSnapshot.paymentBreakdown = paymentBreakdown;
  lastReportSnapshot.tableRows = tableRows;
  lastReportSnapshot.maintenance = maintenanceSummary;
}

function setupCustomRangePickers(startInput, endInput) {
  if (!window.flatpickr) return;

  if (startInput) startDateInputRef = startInput;
  if (endInput) endDateInputRef = endInput;

  const startEl = startDateInputRef;
  const endEl = endDateInputRef;

  if (!startEl && !endEl) return;

  const localeOption = resolveFlatpickrLocaleOption();
  const baseOptions = (handlers) => {
    const options = {
      dateFormat: 'Y-m-d',
      allowInput: true,
      disableMobile: true,
      ...handlers
    };
    if (localeOption) {
      options.locale = localeOption;
    }
    return options;
  };

  if (startDatePicker) {
    startDatePicker.destroy();
    startDatePicker = null;
  }
  if (endDatePicker) {
    endDatePicker.destroy();
    endDatePicker = null;
  }

  if (startEl) {
    startDatePicker = window.flatpickr(startEl, baseOptions({
      onChange(selectedDates, dateStr) {
        state.start = dateStr || null;
        if (endDatePicker) {
          if (selectedDates?.length) {
            endDatePicker.set('minDate', selectedDates[0]);
          } else {
            endDatePicker.set('minDate', null);
          }
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        state.start = dateStr || null;
        renderIfCustomRange();
      }
    }));
  }

  if (endEl) {
    endDatePicker = window.flatpickr(endEl, baseOptions({
      onChange(selectedDates, dateStr) {
        state.end = dateStr || null;
        if (startDatePicker) {
          if (selectedDates?.length) {
            startDatePicker.set('maxDate', selectedDates[0]);
          } else {
            startDatePicker.set('maxDate', null);
          }
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        state.end = dateStr || null;
        renderIfCustomRange();
      }
    }));
  }

  if (startDatePicker && startEl) {
    startDatePicker.setDate(startEl.value, false);
    const linkedDate = endDatePicker?.selectedDates?.[0] || endEl?.value;
    if (linkedDate) {
      startDatePicker.set('maxDate', linkedDate);
    }
  }

  if (endDatePicker && endEl) {
    endDatePicker.setDate(endEl.value, false);
    const linkedDate = startDatePicker?.selectedDates?.[0] || startEl?.value;
    if (linkedDate) {
      endDatePicker.set('minDate', linkedDate);
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

function normalizeSearchText(value) {
  return normalizeNumbers(String(value || '')).toLowerCase().trim();
}

function filterReservations(reservations, filters, customers, equipment, technicians) {
  const { startDate, endDate } = resolveRange(filters);
  const searchTerm = normalizeSearchText(filters.search);
  const hasSearch = Boolean(searchTerm);

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const equipmentMap = new Map((equipment || []).map((item) => [normalizeBarcode(item?.barcode), item]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  return (reservations || []).filter((reservation) => {
    const start = reservation?.start ? new Date(reservation.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;

    if (startDate && start < startDate) return false;
    if (endDate && start > endDate) return false;

    const { statusValue, confirmed, paid } = computeReportStatus(reservation);

    if (filters.status === 'confirmed' && !(statusValue === 'confirmed' || statusValue === 'completed' || confirmed)) return false;
    if (filters.status === 'pending' && statusValue !== 'pending') return false;
    if (filters.status === 'completed' && statusValue !== 'completed') return false;

    if (filters.payment === 'paid' && !paid) return false;
    if (filters.payment === 'unpaid' && paid) return false;

    if (filters.share && filters.share !== 'all') {
      const financials = computeReservationFinancials(reservation);
      const hasCompanyShare = financials.companySharePercent > 0;
      if (filters.share === 'with' && !hasCompanyShare) return false;
      if (filters.share === 'without' && hasCompanyShare) return false;
    }

    if (hasSearch && !matchesSearchTerm(reservation, searchTerm, customerMap, equipmentMap, technicianMap)) {
      return false;
    }

    return true;
  });
}

function matchesSearchTerm(reservation, searchTerm, customerMap, equipmentMap, technicianMap) {
  const parts = [];

  const reservationCode = reservation?.reservationId || reservation?.id;
  if (reservationCode) parts.push(reservationCode);

  if (reservation?.notes) parts.push(reservation.notes);

  const { statusValue, paid, paidStatus } = computeReportStatus(reservation);
  if (statusValue) parts.push(statusValue);

  const paymentStatus = reservation?.paymentStatus || reservation?.payment_status;
  if (paymentStatus) parts.push(paymentStatus);
  if (reservation?.paid != null) {
    parts.push(reservation.paid ? 'paid' : 'unpaid');
  }

  if (paidStatus) {
    parts.push(paidStatus);
  }

  const customer = customerMap.get(String(reservation?.customerId));
  if (customer) {
    parts.push(customer.customerName, customer.company_name || customer.companyName, customer.contact_person || '');
  }

  const project = getProjectForReservation(reservation);
  if (project) {
    parts.push(project.title, project.code, project.status);
  }

  parts.push(paymentLabelText(paidStatus));

  (reservation?.items || []).forEach((item) => {
    if (item?.desc) parts.push(item.desc);
    if (item?.barcode) parts.push(item.barcode);
    const equipmentRecord = equipmentMap.get(normalizeBarcode(item?.barcode));
    if (equipmentRecord) {
      parts.push(equipmentRecord.desc, equipmentRecord.description, equipmentRecord.name);
    }
  });

  (reservation?.technicians || []).forEach((technicianId) => {
    const technician = technicianMap.get(String(technicianId));
    if (technician) {
      parts.push(technician.name, technician.role, technician.department);
    }
  });

  const haystack = normalizeSearchText(parts.filter(Boolean).join(' '));
  return haystack.includes(searchTerm);
}

function resolveRange({ range, start, end }) {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (range === 'custom') {
    const startDate = start ? new Date(`${start}T00:00:00`) : null;
    const endDate = end ? new Date(`${end}T23:59:59`) : null;
    return { startDate: isValidDate(startDate) ? startDate : null, endDate: isValidDate(endDate) ? endDate : null };
  }

  let endDate = new Date(now);
  let startDate = null;

  switch (range) {
    case 'last30': {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 29);
      break;
    }
    case 'thisWeek': {
      const startOfWeek = new Date(now);
      const day = startOfWeek.getDay();
      const diff = ((day - 6) + 7) % 7; // اجعل السبت بداية الأسبوع
      startOfWeek.setDate(startOfWeek.getDate() - diff);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      startDate = startOfWeek;
      endDate.setTime(endOfWeek.getTime());
      break;
    }
    case 'thisMonth': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      endDate.setTime(endOfMonth.setHours(23, 59, 59, 999));
      break;
    }
    case 'thisQuarter': {
      const quarter = Math.floor(now.getMonth() / 3);
      startDate = new Date(now.getFullYear(), quarter * 3, 1);
      const endOfQuarter = new Date(now.getFullYear(), (quarter + 1) * 3, 0);
      endDate.setTime(endOfQuarter.setHours(23, 59, 59, 999));
      break;
    }
    case 'thisYear': {
      startDate = new Date(now.getFullYear(), 0, 1);
      const endOfYear = new Date(now.getFullYear(), 12, 0);
      endDate.setTime(endOfYear.setHours(23, 59, 59, 999));
      break;
    }
    case 'all':
    default:
      startDate = null;
      endDate = null;
      break;
  }

  if (startDate) {
    startDate.setHours(0, 0, 0, 0);
  }

  return { startDate, endDate };
}

function isValidDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function isReservationConfirmed(reservation) {
  return computeReportStatus(reservation).confirmed;
}

const STATUS_MAP = new Map([
  ['confirmed', 'confirmed'],
  ['مؤكد', 'confirmed'],
  ['مؤكدة', 'confirmed'],
  ['approved', 'confirmed'],
  ['pending', 'pending'],
  ['قيد التأكيد', 'pending'],
  ['غير مؤكد', 'pending'],
  ['in-progress', 'pending'],
  ['awaiting', 'pending'],
  ['completed', 'completed'],
  ['منتهي', 'completed'],
  ['منتهية', 'completed'],
  ['done', 'completed'],
  ['finished', 'completed'],
  ['cancelled', 'cancelled'],
  ['ملغي', 'cancelled']
]);

const PAYMENT_MAP = new Map([
  ['paid', true],
  ['مدفوع', true],
  ['مدفوعة', true],
  ['تم الدفع', true],
  ['completed', true],
  ['unpaid', false],
  ['غير مدفوع', false],
  ['غير مدفوعة', false],
  ['pending', false],
  ['قيد الدفع', false]
]);

function normalizeStatusValue(value = '') {
  const key = String(value).toLowerCase().trim();
  if (!key) return '';
  return STATUS_MAP.get(key) || key;
}

function isReservationPaid(reservation) {
  const paymentFields = [
    reservation?.paymentStatus,
    reservation?.payment_status,
    reservation?.payment,
    reservation?.paymentState,
    reservation?.payment_state
  ];

  for (const field of paymentFields) {
    const key = String(field || '').toLowerCase().trim();
    if (!key) continue;
    if (PAYMENT_MAP.has(key)) {
      return PAYMENT_MAP.get(key);
    }
  }

  return reservation?.paid === true || reservation?.paid === 'true';
}

function getReservationStatusValue(reservation) {
  return computeReportStatus(reservation).statusValue;
}

function calculateMetrics(reservations) {
  const total = reservations.length;
  let confirmed = 0;
  let completed = 0;
  let paidCount = 0;
  let revenue = 0;
  let companyShareTotal = 0;
  let taxTotal = 0;
  let crewTotal = 0;
  let crewCostTotal = 0;
  let netProfit = 0;

  reservations.forEach((reservation) => {
    const { statusValue, confirmed: isConfirmed, paid } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      completed += 1;
    }
    if (isConfirmed) {
      confirmed += 1;
    }
    if (paid) {
      paidCount += 1;
    }

    const financials = computeReservationFinancials(reservation);
    revenue += financials.finalTotal;
    companyShareTotal += financials.companyShareAmount;
    taxTotal += financials.taxAmount;
    crewTotal += financials.crewTotal;
    crewCostTotal += financials.crewCostTotal ?? 0;
    netProfit += financials.netProfit;
  });

  const average = total ? revenue / total : 0;

  return {
    total,
    confirmed,
    completed,
    paidCount,
    revenue,
    average,
    companyShareTotal,
    taxTotal,
    crewTotal,
    crewCostTotal,
    netProfit
  };
}

function calculateMaintenanceExpenses(maintenanceTickets, filters) {
  const { startDate, endDate } = resolveRange(filters);
  let total = 0;
  const items = [];

  (maintenanceTickets || []).forEach((ticket) => {
    if (!ticket) return;
    const rawCost = typeof ticket.repairCost === 'number'
      ? ticket.repairCost
      : Number.parseFloat(normalizeNumbers(String(ticket.repairCost ?? '')));
    if (!Number.isFinite(rawCost) || rawCost <= 0) {
      return;
    }

    const statusValue = String(ticket.statusRaw ?? ticket.status ?? '').toLowerCase();
    const isClosed = statusValue === 'closed'
      || statusValue === 'completed'
      || statusValue === 'cancelled';
    if (!isClosed) {
      return;
    }

    const resolvedAtRaw = ticket.resolvedAt ?? ticket.resolved_at ?? null;
    const reportedAtRaw = ticket.reportedAt ?? ticket.reported_at ?? null;
    const createdAtRaw = ticket.createdAt ?? ticket.created_at ?? null;

    const resolvedAt = resolvedAtRaw ? new Date(resolvedAtRaw) : null;
    const fallbackDate = reportedAtRaw ? new Date(reportedAtRaw) : (createdAtRaw ? new Date(createdAtRaw) : null);
    const pivotDate = resolvedAt && !Number.isNaN(resolvedAt.getTime()) ? resolvedAt
      : (fallbackDate && !Number.isNaN(fallbackDate.getTime()) ? fallbackDate : null);

    if (pivotDate) {
      if (startDate && pivotDate < startDate) return;
      if (endDate && pivotDate > endDate) return;
    }

    const normalizedCost = Math.round(rawCost * 100) / 100;
    total += normalizedCost;
    items.push({ id: ticket.id, cost: normalizedCost, date: pivotDate });
  });

  return {
    total,
    items,
  };
}

function applyMaintenanceExpenses(metrics, maintenanceExpense) {
  const expense = Number.isFinite(maintenanceExpense) ? maintenanceExpense : 0;
  return {
    ...metrics,
    maintenanceExpense: expense,
    netProfit: (metrics.netProfit || 0) - expense,
  };
}

function calculateMonthlyTrend(reservations) {
  const now = new Date();
  const result = [];

  for (let i = 5; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthReservations = reservations.filter((res) => {
      const start = res?.start ? new Date(res.start) : null;
      return start && start.getFullYear() === year && start.getMonth() === month;
    });

    const count = monthReservations.length;
    let revenue = 0;
    let netProfitTotal = 0;
    let companyShareTotal = 0;

    monthReservations.forEach((reservation) => {
      const financials = computeReservationFinancials(reservation);
      revenue += financials.finalTotal;
      netProfitTotal += financials.netProfit;
      companyShareTotal += financials.companyShareAmount;
    });

    const label = getMonthLabel(date);
    const periodStart = new Date(date.getFullYear(), date.getMonth(), 1);
    const periodEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    result.push({
      label,
      count,
      revenue,
      netProfit: netProfitTotal,
      companyShare: companyShareTotal,
      periodStart,
      periodEnd,
      startInput: formatDateInput(periodStart),
      endInput: formatDateInput(periodEnd)
    });
  }

  return result;
}

function calculateStatusBreakdown(reservations) {
  const counts = {
    confirmed: 0,
    pending: 0,
    completed: 0
  };

  (reservations || []).forEach((reservation) => {
    const { statusValue, confirmed } = computeReportStatus(reservation);
    if (statusValue === 'completed') {
      counts.completed += 1;
    } else if (statusValue === 'confirmed' || confirmed) {
      counts.confirmed += 1;
    } else {
      counts.pending += 1;
    }
  });

  const total = Math.max(1, (reservations || []).length);
  const confirmedCount = counts.confirmed;
  const pending = counts.pending;
  const completed = counts.completed;

  return [
    {
      label: translate('reservations.reports.status.confirmedLabel', 'مؤكدة', 'Confirmed'),
      value: confirmedCount,
      percent: Math.round((confirmedCount / total) * 100) || 0,
      rawCount: confirmedCount,
      className: 'status-confirmed',
      filterKey: 'confirmed'
    },
    {
      label: translate('reservations.reports.status.pendingLabel', 'قيد التأكيد', 'Pending confirmation'),
      value: pending,
      percent: Math.round((pending / total) * 100) || 0,
      rawCount: pending,
      className: 'status-pending',
      filterKey: 'pending'
    },
    {
      label: translate('reservations.reports.status.completedLabel', 'منتهية', 'Completed'),
      value: completed,
      percent: Math.round((completed / total) * 100) || 0,
      rawCount: completed,
      className: 'status-completed',
      filterKey: 'completed'
    }
  ];
}

function calculatePaymentBreakdown(reservations) {
  const total = reservations.length || 1;
  const paid = reservations.filter((reservation) => computeReportStatus(reservation).paid).length;
  const unpaid = reservations.length - paid;

  return [
    {
      label: translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid'),
      value: paid,
      percent: Math.round((paid / total) * 100) || 0,
      rawCount: paid,
      className: 'status-paid',
      filterKey: 'paid'
    },
    {
      label: translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid'),
      value: unpaid,
      percent: Math.round((unpaid / total) * 100) || 0,
      rawCount: unpaid,
      className: 'status-unpaid',
      filterKey: 'unpaid'
    }
  ];
}

function calculateTopCustomers(reservations, customers) {
  const totals = new Map();
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));

  reservations.forEach((res) => {
    const key = String(res?.customerId ?? 'unknown');
    const entry = totals.get(key) || { count: 0, revenue: 0 };
    const financials = computeReservationFinancials(res);
    entry.count += 1;
    entry.revenue += financials.finalTotal;
    totals.set(key, entry);
  });

  return Array.from(totals.entries())
    .map(([id, data]) => {
      const customer = customerMap.get(id);
      return {
        name: customer?.customerName || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer'),
        count: data.count,
        revenue: data.revenue
      };
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

function calculateTopEquipment(reservations, equipment) {
  const totals = new Map();
  const equipmentMap = new Map((equipment || []).map((item) => [normalizeBarcode(item?.barcode), item]));
  const unknownLabel = translate('reservations.reports.topEquipment.unknown', 'معدة بدون اسم', 'Unnamed equipment');

  reservations.forEach((res) => {
    (res?.items || []).forEach((item) => {
      const barcode = normalizeBarcode(item?.barcode);
      const equipmentRecord = barcode ? equipmentMap.get(barcode) : null;
      const rawName = item?.desc
        || item?.description
        || item?.name
        || equipmentRecord?.desc
        || equipmentRecord?.description
        || equipmentRecord?.name
        || '';
      const displayName = rawName && rawName.trim() ? rawName : unknownLabel;
      const key = normalizeText(displayName) || 'unknown';
      const quantity = Number(item?.qty) || 1;
      const unitPrice = Number(item?.price) || 0;
      const revenue = quantity * unitPrice;

      const entry = totals.get(key) || { name: displayName, count: 0, revenue: 0 };
      entry.name = displayName;
      entry.count += quantity;
      entry.revenue += revenue;
      totals.set(key, entry);
    });
  });

  return Array.from(totals.values())
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return b.revenue - a.revenue;
    })
    .slice(0, 5);
}

function renderReservationsTable(reservations, customers, technicians) {
  const tbody = document.getElementById('reports-reservations-body');
  if (!tbody) return [];

  if (!reservations || reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return [];
  }

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  const exportHeaders = {
    code: translate('reservations.reports.results.headers.id', 'الحجز', 'Reservation'),
    customer: translate('reservations.reports.results.headers.customer', 'العميل', 'Customer'),
    date: translate('reservations.reports.results.headers.date', 'التاريخ', 'Date'),
    status: translate('reservations.reports.results.headers.status', 'الحالة', 'Status'),
    payment: translate('reservations.reports.results.headers.payment', 'الدفع', 'Payment'),
    total: translate('reservations.reports.results.headers.total', 'الإجمالي', 'Total'),
    share: translate('reservations.reports.results.headers.share', 'نسبة الشركة', 'Company share'),
    net: translate('reservations.reports.results.headers.net', 'صافي الربح', 'Net profit')
  };

  const rows = [...reservations]
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0))
    .slice(0, 20)
    .map((reservation) => {
      const formatted = formatReservationRow(reservation, customerMap, technicianMap);
      const exportRow = {
        [exportHeaders.code]: formatted.code.text,
        [exportHeaders.customer]: formatted.customer.text,
        [exportHeaders.date]: formatted.date.text,
        [exportHeaders.status]: formatted.status.text,
        [exportHeaders.payment]: formatted.payment.text,
        [exportHeaders.total]: formatted.total.text,
        [exportHeaders.share]: formatted.share.text,
        [exportHeaders.net]: formatted.net.text
      };
      return { formatted, exportRow };
    });

  tbody.innerHTML = rows
    .map(({ formatted }) => `
      <tr data-drilldown="reservation" data-search="${escapeAttribute(formatted.code.text)}">
        <td data-report-column="code">${formatted.code.html}</td>
        <td data-report-column="customer">${formatted.customer.html}</td>
        <td data-report-column="date">${formatted.date.html}</td>
        <td data-report-column="status">${formatted.status.html}</td>
        <td data-report-column="payment">${formatted.payment.html}</td>
        <td data-report-column="total">${formatted.total.html}</td>
        <td data-report-column="share">${formatted.share.html}</td>
        <td data-report-column="net">${formatted.net.html}</td>
      </tr>
    `)
    .join('');

  return rows.map(({ exportRow }) => exportRow);
}

function handleTrendDrilldown(index) {
  const item = lastTrendData?.[index];
  if (!item) return;

  state.range = 'custom';
  state.start = item.startInput || null;
  state.end = item.endInput || null;
  syncFilterControls();
  renderReports();
}

function handleStatusDrilldown(filterKey) {
  if (!filterKey) return;
  state.status = state.status === filterKey ? 'all' : filterKey;
  syncFilterControls();
  renderReports();
}

function handlePaymentDrilldown(filterKey) {
  if (!filterKey) return;
  state.payment = state.payment === filterKey ? 'all' : filterKey;
  syncFilterControls();
  renderReports();
}

function applySearchFilter(value) {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = null;
  }
  state.search = value || '';
  const searchInput = document.getElementById('reports-search');
  if (searchInput && searchInput.value !== state.search) {
    searchInput.value = state.search;
  }
  renderReports();
}

function setupColumnControls() {
  if (columnControlsBound) return;
  const container = document.getElementById('reports-column-controls');
  if (!container) return;

  container.querySelectorAll('input[data-column-toggle]').forEach((input) => {
    const key = input.dataset.columnToggle;
    if (!key) return;
    input.checked = columnPreferences[key] !== false;
    input.addEventListener('change', () => {
      columnPreferences[key] = input.checked;
      applyColumnVisibility();
    });
  });

  columnControlsBound = true;
  applyColumnVisibility();
}

function applyColumnVisibility() {
  Object.entries(columnPreferences).forEach(([column, visible]) => {
    document.querySelectorAll(`[data-report-column="${column}"]`).forEach((element) => {
      if (visible) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  });
}

function setupExportButtons() {
  if (exportHandlersBound) return;
  const buttons = document.querySelectorAll('[data-export]');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const { export: type = '' } = button.dataset;
      if (!type) return;
      button.disabled = true;
      try {
        await exportReport(type);
      } catch (error) {
        console.error('⚠️ [reports] export failed', error);
      } finally {
        button.disabled = false;
      }
    });
  });

  exportHandlersBound = true;
}

async function exportReport(type) {
  const rows = lastReportSnapshot.tableRows || [];
  if (!rows.length) {
    console.warn('[reports] No reservation data to export');
    return;
  }

  switch (type) {
    case 'pdf':
      await exportAsPdf();
      break;
    case 'excel':
      await exportAsExcel(rows);
      break;
    case 'csv':
    default:
      exportAsCsv(rows);
      break;
  }
}

function getExportFileName(extension) {
  const stamp = formatDateInput(new Date()).replace(/-/g, '');
  const prefix = translate('reservations.reports.export.filePrefix', 'تقرير-الحجوزات', 'reservations-report');
  return `${prefix}-${stamp}.${extension}`;
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function exportAsCsv(rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(',')];

  rows.forEach((row) => {
    const values = headers.map((header) => {
      const cell = String(row[header] ?? '').replace(/"/g, '""');
      return `"${cell}"`;
    });
    lines.push(values.join(','));
  });

  const csvContent = `\ufeff${lines.join('\r\n')}\r\n`;
  downloadBlob(csvContent, getExportFileName('csv'), 'text/csv;charset=utf-8;');
}

async function exportAsExcel(rows) {
  try {
    const XLSX = await ensureXlsx();
    if (!XLSX) {
      exportAsCsv(rows);
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    const sheetName = translate('reservations.reports.export.sheetName', 'الحجوزات', 'Reservations');
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, getExportFileName('xlsx'));
  } catch (error) {
    console.error('⚠️ [reports] Excel export failed, falling back to CSV', error);
    exportAsCsv(rows);
  }
}

async function exportAsPdf() {
  const container = document.getElementById('reservations-report-printable');
  if (!container) return;

  const html2pdf = await ensureHtml2Pdf();
  if (typeof html2pdf !== 'function') {
    console.warn('[reports] html2pdf unavailable, skipping PDF export');
    return;
  }

  const filename = getExportFileName('pdf');

  await html2pdf().set({
    margin: 10,
    filename,
    html2canvas: {
      scale: 1.2,
      useCORS: true,
      allowTaint: false
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  }).from(container).save();
}

function setupDrilldownInteractions() {
  if (drilldownBound) return;
  const customerTable = document.getElementById('reports-top-customers');
  const equipmentTable = document.getElementById('reports-top-equipment');
  const reservationsBody = document.getElementById('reports-reservations-body');

  const handler = (event) => {
    const target = event.target?.closest('[data-drilldown]');
    if (!target) return;
    const value = target.dataset.search || '';
    applySearchFilter(value);
  };

  customerTable?.addEventListener('click', handler);
  equipmentTable?.addEventListener('click', handler);
  reservationsBody?.addEventListener('click', handler);

  drilldownBound = true;
}

async function renderTrendChart(data) {
  const container = document.getElementById('reports-volume-chart');
  if (!container) return;

  lastTrendData = Array.isArray(data) ? data : [];

  if (!data || data.length === 0) {
    if (charts.trend) {
      charts.trend.destroy();
      charts.trend = null;
    }
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const categories = data.map((item) => item.label);
    const reservationsSeries = data.map((item) => Math.round(item.count || 0));
    const revenueSeries = data.map((item) => Math.round(item.revenue || 0));
    const netSeries = data.map((item) => Math.round(item.netProfit || 0));

    const series = [
      {
        name: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
        type: 'column',
        data: reservationsSeries
      },
      {
        name: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
        type: 'line',
        data: revenueSeries
      },
      {
        name: translate('reservations.reports.chart.volume.series.net', 'صافي الربح (SR)', 'Net profit (SR)'),
        type: 'line',
        data: netSeries,
        yAxisIndex: 1
      }
    ];

    const options = {
      chart: {
        type: 'line',
        height: 320,
        stacked: false,
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'Tajawal, sans-serif',
        animations: { enabled: true },
        events: {
          dataPointSelection: (event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              handleTrendDrilldown(config.dataPointIndex);
            }
          }
        }
      },
      theme: { mode: getThemeMode() },
      stroke: {
        width: [0, 4, 4],
        curve: 'smooth'
      },
      markers: {
        size: [0, 5, 5]
      },
      colors: ['#6366f1', '#22c55e', '#f97316'],
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'solid',
        opacity: 1
      },
      xaxis: {
        categories,
        labels: {
          style: { colors: getThemeMode() === 'dark' ? '#cbd5f5' : '#475569' }
        }
      },
      yaxis: [
        {
          seriesName: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
          axisTicks: { show: true },
          axisBorder: { show: true, color: '#6366f1' },
          labels: {
            style: { colors: '#6366f1' },
            formatter: (value) => formatNumber(value)
          },
          title: {
            text: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
            style: { color: '#6366f1' }
          }
        },
        {
          opposite: true,
          seriesName: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
          axisTicks: { show: true },
          axisBorder: { show: true, color: '#22c55e' },
          labels: {
            style: { colors: '#22c55e' },
            formatter: (value) => formatCurrency(value)
          },
          title: {
            text: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
            style: { color: '#22c55e' }
          }
        }
      ],
      legend: {
        position: 'bottom'
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value, { seriesIndex }) => (
            seriesIndex === 0 ? formatNumber(value) : formatCurrency(value)
          )
        }
      }
    };

    if (charts.trend) {
      charts.trend.updateOptions({ ...options }, true, true);
      charts.trend.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      charts.trend = new ApexCharts(container, { ...options, series });
      charts.trend.render();
    }
  } catch (error) {
    console.error('⚠️ [reports] Failed to render trend chart', error);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}

async function renderStatusChart(data) {
  const container = document.getElementById('reports-status-chart');
  const listContainerId = 'reports-status-breakdown';
  if (!container) return;

  lastStatusData = Array.isArray(data) ? data : [];

  if (!data || data.length === 0) {
    if (charts.status) {
      charts.status.destroy();
      charts.status = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const series = data.map((item) => Math.max(0, item.value || 0));
    const labels = data.map((item) => item.label);

    const options = {
      chart: {
        type: 'donut',
        height: 300,
        fontFamily: 'Tajawal, sans-serif',
        toolbar: { show: false },
        background: 'transparent',
        events: {
          dataPointSelection: (_event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              const item = lastStatusData[config.dataPointIndex];
              if (item?.filterKey) {
                handleStatusDrilldown(item.filterKey);
              }
            }
          }
        }
      },
      theme: { mode: getThemeMode() },
      labels,
      series,
      colors: ['#22c55e', '#f97316', '#6366f1'],
      legend: {
        position: 'bottom'
      },
      dataLabels: {
        formatter: (val) => `${Math.round(val)}%`
      },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: translate('reservations.reports.chart.status.title', '🧾 توزيع الحالات', 'Status distribution'),
                formatter: () => formatNumber(series.reduce((sum, value) => sum + value, 0))
              }
            }
          }
        }
      },
      tooltip: {
        y: {
          formatter: (val, opts) => {
            const item = lastStatusData?.[opts?.seriesIndex || 0];
            const percent = item ? `${formatNumber(item.percent)}%` : `${formatNumber(val)}%`;
            const raw = item ? formatNumber(item.rawCount ?? item.value ?? 0) : formatNumber(val);
            return `${raw} / ${percent}`;
          }
        }
      }
    };

    if (charts.status) {
      charts.status.updateOptions({ ...options }, true, true);
      charts.status.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      charts.status = new ApexCharts(container, { ...options, series });
      charts.status.render();
    }

    renderProgressSection(listContainerId, data);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render status chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}

async function renderPaymentChart(data) {
  const container = document.getElementById('reports-payment-chart');
  const listContainerId = 'reports-payment-breakdown';
  if (!container) return;

  lastPaymentData = Array.isArray(data) ? data : [];

  if (!data || data.length === 0) {
    if (charts.payment) {
      charts.payment.destroy();
      charts.payment = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const series = data.map((item) => Math.max(0, item.value || 0));
    const labels = data.map((item) => item.label);

    const options = {
      chart: {
        type: 'pie',
        height: 300,
        fontFamily: 'Tajawal, sans-serif',
        toolbar: { show: false },
        background: 'transparent',
        events: {
          dataPointSelection: (_event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              const item = lastPaymentData[config.dataPointIndex];
              if (item?.filterKey) {
                handlePaymentDrilldown(item.filterKey);
              }
            }
          }
        }
      },
      theme: { mode: getThemeMode() },
      labels,
      series,
      colors: ['#00ac69', '#f43f5e'],
      legend: {
        position: 'bottom'
      },
      dataLabels: {
        formatter: (val) => `${Math.round(val)}%`
      },
      tooltip: {
        y: {
          formatter: (val, opts) => {
            const item = lastPaymentData?.[opts?.seriesIndex || 0];
            const percent = item ? `${formatNumber(item.percent)}%` : `${formatNumber(val)}%`;
            const raw = item ? formatNumber(item.rawCount ?? item.value ?? 0) : formatNumber(val);
            return `${raw} / ${percent}`;
          }
        }
      }
    };

    if (charts.payment) {
      charts.payment.updateOptions({ ...options }, true, true);
      charts.payment.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      charts.payment = new ApexCharts(container, { ...options, series });
      charts.payment.render();
    }

    renderProgressSection(listContainerId, data);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render payment chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}

function renderProgressSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<div class="text-sm text-base-content/60">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</div>`;
    return;
  }

  container.innerHTML = data
    .map((item) => {
      const percent = Math.min(Math.max(item.percent ?? 0, 0), 100);
      const meta = translate('reservations.reports.progress.meta', '{count} حجز', '{count} reservations').replace('{count}', formatNumber(item.rawCount ?? item.value ?? 0));
      const fillClass = item.className ? `reports-progress-fill ${item.className}` : 'reports-progress-fill';
      return `
        <div class="reports-progress-row">
          <div class="reports-progress-top">
            <span>${escapeHtml(item.label)}</span>
            <span class="reports-progress-value">${formatNumber(item.percent ?? 0)}%</span>
          </div>
          <div class="reports-progress-bar">
            <div class="${fillClass}" style="width: ${percent}%;"></div>
          </div>
          <div class="reports-progress-meta">${meta}</div>
        </div>
      `;
    })
    .join('');
}

function renderTopCustomers(rows) {
  const tbody = document.getElementById('reports-top-customers');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="customer" data-search="${escapeAttribute(row.name)}">
        <td>${escapeHtml(row.name)}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

function renderTopEquipment(rows) {
  const tbody = document.getElementById('reports-top-equipment');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-base-content/60">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr class="hover:bg-base-200 cursor-pointer" data-drilldown="equipment" data-search="${escapeAttribute(row.name)}">
        <td>${escapeHtml(row.name)}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

function formatReservationRow(reservation, customerMap, technicianMap) {
  const rawCode = reservation?.reservationId || reservation?.id || '—';
  const codeText = normalizeNumbers(String(rawCode));
  const customer = customerMap.get(String(reservation?.customerId));
  const customerName = customer?.customerName
    || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer');

  const statusInfo = computeReportStatus(reservation);
  const statusLabel = getReservationStatusLabel(statusInfo.statusValue);
  const statusChip = createStatusChip(statusInfo.statusValue, statusLabel);
  const normalizedPaymentHistory = Array.isArray(reservation.paymentHistory)
    ? reservation.paymentHistory
    : Array.isArray(reservation.payment_history)
      ? reservation.payment_history
      : [];
  const paymentChip = createPaymentChip(statusInfo.paidStatus, normalizedPaymentHistory);
  const historyCount = normalizedPaymentHistory.length;
  let paymentHtml = paymentChip.html;
  if (historyCount > 0) {
    const historyLabel = translate('reservations.paymentHistory.countLabel', '{count} دفعة', '{count} payments').replace('{count}', formatNumber(historyCount));
    paymentHtml = `<div class="reports-payment-cell">${paymentChip.html}<small class="reports-payment-subtext">${escapeHtml(historyLabel)}</small></div>`;
  }
  const dateLabel = formatDateTime(reservation?.start);
  const financials = computeReservationFinancials(reservation);
  const totalLabel = formatCurrency(financials.finalTotal);
  const shareLabel = financials.companySharePercent > 0
    ? `${formatNumber(financials.companySharePercent)}% (${formatCurrency(financials.companyShareAmount)})`
    : translate('reservations.reports.results.share.none', 'بدون نسبة الشركة', 'No company share');
  const netLabel = formatCurrency(financials.netProfit);

  const customerHtml = escapeHtml(customerName);
  const customerPlain = customerName;

  return {
    code: { html: escapeHtml(codeText), text: codeText },
    customer: { html: customerHtml, text: customerPlain },
    date: { html: escapeHtml(dateLabel), text: dateLabel },
    status: statusChip,
    payment: { html: paymentHtml, text: paymentChip.text },
    total: { html: escapeHtml(totalLabel), text: totalLabel },
    share: { html: escapeHtml(shareLabel), text: shareLabel },
    net: { html: escapeHtml(netLabel), text: netLabel }
  };
}

function paymentLabelText(paymentStatus) {
  const normalized = String(paymentStatus ?? '').toLowerCase();
  if (normalized === 'paid') {
    return translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid');
  }
  if (normalized === 'partial') {
    return translate('reservations.reports.payment.partialLabel', 'مدفوعة جزئياً', 'Partially paid');
  }
  return translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid');
}

function getReservationStatusLabel(statusValue) {
  switch (statusValue) {
    case 'completed':
      return stripLeadingSymbols(translate('reservations.list.status.completed', '📁 منتهي', 'Completed'));
    case 'confirmed':
      return stripLeadingSymbols(translate('reservations.list.status.confirmed', '✅ مؤكد', 'Confirmed'));
    case 'pending':
      return stripLeadingSymbols(translate('reservations.list.status.pending', '⏳ غير مؤكد', 'Pending'));
    default:
      return normalizeNumbers(statusValue || '—');
  }
}

function createStatusChip(statusValue, label) {
  const safeLabel = stripLeadingSymbols(label);
  const slug = ['completed', 'confirmed', 'pending'].includes(statusValue) ? statusValue : 'info';
  const chipHtml = `<span class="reservation-chip status-${slug}">${escapeHtml(safeLabel)}</span>`;
  return { html: chipHtml, text: safeLabel };
}

function createPaymentChip(paymentStatus, history = []) {
  const label = paymentLabelText(paymentStatus);
  const normalized = String(paymentStatus ?? '').toLowerCase();
  const slug = normalized === 'paid' ? 'paid' : normalized === 'partial' ? 'partial' : 'unpaid';
  let tooltip = '';
  const currencyLabel = translate('reservations.create.summary.currency', 'ريال', 'SR');

  if (Array.isArray(history) && history.length) {
    tooltip = history.map((entry) => {
      const date = entry?.recordedAt ? normalizeNumbers(String(entry.recordedAt).split('T')[0]) : '—';
      const amount = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
        ? `${normalizeNumbers(Number(entry.amount).toFixed(2))} ${currencyLabel}`
        : '';
      const percent = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
        ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
        : '';
      const pieces = [date];
      if (amount) pieces.push(`${amount}`);
      if (percent) pieces.push(percent);
      return pieces.filter(Boolean).join(' • ');
    }).join('\n');
  }
  const titleAttr = tooltip ? ` title="${escapeAttribute(tooltip)}"` : '';
  const chipHtml = `<span class="reservation-chip status-${slug}"${titleAttr}>${escapeHtml(label)}</span>`;
  return { html: chipHtml, text: label };
}

function stripLeadingSymbols(label) {
  return normalizeNumbers(String(label ?? '')).replace(/^[^A-Za-z0-9\u0600-\u06FF]+/, '').trim() || '—';
}

function formatDateTime(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const locale = getActiveLocale();
  const formatter = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  return normalizeNumbers(formatter.format(date));
}

function updateKpiCards(metrics) {
  const totalEl = document.getElementById('reports-kpi-total');
  const totalMetaEl = document.getElementById('reports-kpi-total-meta');
  const revenueEl = document.getElementById('reports-kpi-revenue');
  const revenueMetaEl = document.getElementById('reports-kpi-revenue-meta');
  const revenueDetailsEl = document.getElementById('reports-revenue-breakdown');
  const confirmedEl = document.getElementById('reports-kpi-confirmed');
  const confirmedMetaEl = document.getElementById('reports-kpi-confirmed-meta');
  const paidEl = document.getElementById('reports-kpi-paid');
  const paidMetaEl = document.getElementById('reports-kpi-paid-meta');

  const total = metrics.total || 0;
  const revenue = metrics.revenue || 0;
  const confirmed = metrics.confirmed || 0;
  const paid = metrics.paidCount || 0;
  const avg = metrics.average || 0;
  const companyShareTotal = metrics.companyShareTotal || 0;
  const taxTotal = metrics.taxTotal || 0;
  const crewGross = metrics.crewTotal || 0;
  const crewCost = metrics.crewCostTotal || 0;
  const net = metrics.netProfit || 0;
  const maintenanceExpense = metrics.maintenanceExpense || 0;
  const confirmedRate = total ? Math.round((confirmed / total) * 100) : 0;
  const paidRate = total ? Math.round((paid / total) * 100) : 0;

  if (totalEl) totalEl.textContent = formatNumber(total);
  if (totalMetaEl) {
    const completedText = translate('reservations.reports.kpi.total.dynamicMeta', 'منها {count} منتهية', 'Includes {count} completed')
      .replace('{count}', formatNumber(metrics.completed || 0));
    totalMetaEl.textContent = completedText;
  }

  if (revenueEl) revenueEl.textContent = formatCurrency(revenue);
  if (revenueMetaEl) {
    const template = translate(
      'reservations.reports.kpi.revenue.meta',
      'صافي الربح {net} • نسبة الشركة {share} • متوسط الحجز {average}',
      'Net profit {net} • Company share {share} • Average reservation {average}'
    );
    revenueMetaEl.textContent = template
      .replace('{net}', formatCurrency(net))
      .replace('{share}', formatCurrency(companyShareTotal))
      .replace('{average}', formatCurrency(avg));
  }

  if (revenueDetailsEl) {
    if (revenue > 0) {
      const rows = [
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.gross',
            'الإيراد الكلي',
            'Gross revenue'
          ),
          value: formatCurrency(revenue)
        },
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.share',
            'نسبة الشركة',
            'Company share'
          ),
          value: formatCurrency(companyShareTotal)
        },
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.tax',
            'الضريبة',
            'Tax'
          ),
          value: formatCurrency(taxTotal)
        },
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.crewGross',
            'إجمالي الطاقم',
            'Crew total'
          ),
          value: formatCurrency(crewGross)
        },
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.crew',
            'تكلفة الطاقم',
            'Crew cost'
          ),
          value: formatCurrency(crewCost)
        },
      ];

      if (maintenanceExpense > 0) {
        rows.splice(rows.length, 0, {
          label: translate(
            'reservations.reports.kpi.revenue.details.maintenance',
            'مصاريف الصيانة',
            'Maintenance expenses'
          ),
          value: `−${formatCurrency(maintenanceExpense)}`
        });
      }

      rows.push(
        {
          label: translate(
            'reservations.reports.kpi.revenue.details.net',
            'صافي الربح',
            'Net profit'
          ),
          value: formatCurrency(net)
        }
      );

      revenueDetailsEl.innerHTML = rows
        .map(({ label, value }) => `
          <div class="reports-kpi-detail-row">
            <span class="reports-kpi-detail-label">${escapeHtml(label)}</span>
            <span class="reports-kpi-detail-value">${escapeHtml(value)}</span>
          </div>
        `)
        .join('');
      revenueDetailsEl.classList.remove('hidden');
    } else {
      revenueDetailsEl.innerHTML = '';
      revenueDetailsEl.classList.add('hidden');
    }
  }

  if (confirmedEl) confirmedEl.textContent = `${confirmedRate}%`;
  if (confirmedMetaEl) {
    const confirmedText = translate('reservations.reports.kpi.confirmed.detail', '{count} حجوزات مؤكدة', '{count} confirmed reservations')
      .replace('{count}', formatNumber(confirmed));
    confirmedMetaEl.textContent = confirmedText;
  }

  if (paidEl) paidEl.textContent = `${paidRate}%`;
  if (paidMetaEl) {
    const paidText = translate('reservations.reports.kpi.paid.detail', '{count} حجوزات مدفوعة', '{count} paid reservations')
      .replace('{count}', formatNumber(paid));
    paidMetaEl.textContent = paidText;
  }
}

function toggleEmptyState(isEmpty) {
  setReportsEmptyState({ active: Boolean(isEmpty) });
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatNumber(value) {
  const { numberFormatter: nf } = getFormatters();
  const formatted = nf.format(Math.round(value || 0));
  return normalizeNumbers(formatted);
}

function formatCurrency(value) {
  const amount = formatNumber(value);
  return `${amount} SR`;
}

function normalizeBarcode(value) {
  return (value || '').toString().trim();
}
