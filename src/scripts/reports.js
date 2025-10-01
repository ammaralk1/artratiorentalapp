import { isReservationCompleted, resolveReservationProjectState } from './reservationsShared.js';
import { t, getCurrentLanguage } from './language.js';
import { normalizeNumbers } from './utils.js';
import { apiRequest, ApiError } from './apiClient.js';
import { mapReservationFromApi, mapLegacyReservation } from './reservationsService.js';
import { mapTechnicianFromApi } from './techniciansService.js';
import { loadData } from './storage.js';

let cachedLocale = null;
let numberFormatter = null;
let currencyFormatter = null;

const state = {
  range: 'all',
  status: 'all',
  payment: 'all',
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
  }, 0);
  setTimeout(() => {
    resetFormatters();
    renderReports();
  }, 60);
}

function renderIfCustomRange() {
  if (state.range === 'custom') {
    renderReports();
  }
}

function resetFormatters() {
  cachedLocale = null;
  numberFormatter = null;
  currencyFormatter = null;
}

function getActiveLocale() {
  const lang = (getCurrentLanguage() || 'ar').toLowerCase();
  return lang.startsWith('ar') ? 'ar-EG' : 'en-US';
}

function getFormatters() {
  const language = getCurrentLanguage();
  if (language !== cachedLocale || !numberFormatter || !currencyFormatter) {
    cachedLocale = language;
    const locale = getActiveLocale();
    numberFormatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    currencyFormatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      maximumFractionDigits: 0
    });
  }
  return { numberFormatter, currencyFormatter };
}

function getMonthLabel(date) {
  const locale = getActiveLocale();
  return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
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

  return true;
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

  return {
    statusValue,
    confirmed,
    paid,
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
    const [reservationsRes, customersRes, equipmentRes, techniciansRes, projectsRes] = await Promise.all([
      apiRequest('/reservations/?limit=500'),
      apiRequest('/customers/?limit=500'),
      apiRequest('/equipment/?limit=500'),
      apiRequest('/technicians/?limit=500'),
      apiRequest('/projects/?limit=500'),
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
    document.addEventListener('technicians:updated', handleReportsDataMutation);
    reportsDataListenersAttached = true;
  }

  loadReportsData();
}

export function renderReports() {
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
  const trend = calculateMonthlyTrend(filtered);
  const statusBreakdown = calculateStatusBreakdown(filtered);
  const paymentBreakdown = calculatePaymentBreakdown(filtered);
  const topCustomers = calculateTopCustomers(filtered, customers);
  const topEquipment = calculateTopEquipment(filtered, equipment);

  updateKpiCards(metrics);
  renderTrendChart(trend);
  renderProgressSection('reports-status-breakdown', statusBreakdown);
  renderProgressSection('reports-payment-breakdown', paymentBreakdown);
  renderTopCustomers(topCustomers);
  renderTopEquipment(topEquipment);
  renderReservationsTable(filtered, customers, technicians);
  toggleEmptyState(filtered.length === 0);
}

function setupCustomRangePickers(startInput, endInput) {
  if (!window.flatpickr) return;

  const locale = window.flatpickr?.l10ns?.ar ? window.flatpickr.l10ns.ar : null;
  const baseOptions = (handlers) => {
    const options = {
      dateFormat: 'Y-m-d',
      allowInput: true,
      disableMobile: true,
      ...handlers
    };
    if (locale) {
      options.locale = locale;
    }
    return options;
  };

  let startPickerInstance = null;
  let endPickerInstance = null;

  if (startInput) {
    startPickerInstance = window.flatpickr(startInput, baseOptions({
      onChange(selectedDates, dateStr) {
        state.start = dateStr || null;
        if (!endPickerInstance) return;
        if (selectedDates?.length) {
          endPickerInstance.set('minDate', selectedDates[0]);
        } else {
          endPickerInstance.set('minDate', null);
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        state.start = dateStr || null;
        renderIfCustomRange();
      }
    }));
  }

  if (endInput) {
    endPickerInstance = window.flatpickr(endInput, baseOptions({
      onChange(selectedDates, dateStr) {
        state.end = dateStr || null;
        if (!startPickerInstance) return;
        if (selectedDates?.length) {
          startPickerInstance.set('maxDate', selectedDates[0]);
        } else {
          startPickerInstance.set('maxDate', null);
        }
        renderIfCustomRange();
      },
      onValueUpdate(_, dateStr) {
        state.end = dateStr || null;
        renderIfCustomRange();
      }
    }));
  }

  if (startPickerInstance && endInput?.value) {
    startPickerInstance.setDate(startInput.value, false);
    startPickerInstance.set('maxDate', endPickerInstance?.selectedDates?.[0] || endInput.value);
  }

  if (endPickerInstance && startInput?.value) {
    endPickerInstance.setDate(endInput.value, false);
    endPickerInstance.set('minDate', startPickerInstance?.selectedDates?.[0] || startInput.value);
  }
}

function toggleCustomRange(wrapper, isActive) {
  if (!wrapper) return;
  wrapper.classList.toggle('active', Boolean(isActive));
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

  const { statusValue } = computeReportStatus(reservation);
  if (statusValue) parts.push(statusValue);

  const paymentStatus = reservation?.paymentStatus || reservation?.payment_status;
  if (paymentStatus) parts.push(paymentStatus);
  if (reservation?.paid != null) {
    parts.push(reservation.paid ? 'paid' : 'unpaid');
  }

  const customer = customerMap.get(String(reservation?.customerId));
  if (customer) {
    parts.push(customer.customerName, customer.company_name || customer.companyName, customer.contact_person || '');
  }

  const project = getProjectForReservation(reservation);
  if (project) {
    parts.push(project.title, project.code, project.status);
  }

  parts.push(paymentLabelText(reservation));

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
    revenue += Number(reservation?.cost) || 0;
  });

  const average = total ? revenue / total : 0;

  return {
    total,
    confirmed,
    completed,
    paidCount,
    revenue,
    average
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
    const revenue = monthReservations.reduce((sum, res) => sum + (Number(res?.cost) || 0), 0);

    const label = getMonthLabel(date);

    result.push({ label, count, revenue });
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
      className: 'status-confirmed'
    },
    {
      label: translate('reservations.reports.status.pendingLabel', 'قيد التأكيد', 'Pending confirmation'),
      value: pending,
      percent: Math.round((pending / total) * 100) || 0,
      rawCount: pending,
      className: 'status-pending'
    },
    {
      label: translate('reservations.reports.status.completedLabel', 'منتهية', 'Completed'),
      value: completed,
      percent: Math.round((completed / total) * 100) || 0,
      rawCount: completed,
      className: 'status-completed'
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
      className: 'status-paid'
    },
    {
      label: translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid'),
      value: unpaid,
      percent: Math.round((unpaid / total) * 100) || 0,
      rawCount: unpaid,
      className: 'status-unpaid'
    }
  ];
}

function calculateTopCustomers(reservations, customers) {
  const totals = new Map();
  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));

  reservations.forEach((res) => {
    const key = String(res?.customerId ?? 'unknown');
    const entry = totals.get(key) || { count: 0, revenue: 0 };
    entry.count += 1;
    entry.revenue += Number(res?.cost) || 0;
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

  reservations.forEach((res) => {
    (res?.items || []).forEach((item) => {
      const barcode = normalizeBarcode(item?.barcode);
      const key = barcode || (item?.desc ?? 'unknown');
      const name = item?.desc
        || equipmentMap.get(barcode)?.desc
        || equipmentMap.get(barcode)?.description
        || translate('reservations.reports.topEquipment.unknown', 'معدة بدون اسم', 'Unnamed equipment');
      const quantity = Number(item?.qty) || 1;
      const revenue = quantity * (Number(item?.price) || 0);

      const entry = totals.get(key) || { name, count: 0, revenue: 0 };
      entry.name = name;
      entry.count += quantity;
      entry.revenue += revenue;
      totals.set(key, entry);
    });
  });

  return Array.from(totals.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function renderReservationsTable(reservations, customers, technicians) {
  const tbody = document.getElementById('reports-reservations-body');
  if (!tbody) return;

  if (!reservations || reservations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-muted">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  const customerMap = new Map((customers || []).map((c) => [String(c.id), c]));
  const technicianMap = new Map((technicians || []).map((tech) => [String(tech.id), tech]));

  const rows = [...reservations]
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0))
    .slice(0, 20)
    .map((reservation) => formatReservationRow(reservation, customerMap, technicianMap));

  tbody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${row.code}</td>
        <td>${row.customer}</td>
        <td>${row.date}</td>
        <td>${row.status}</td>
        <td>${row.payment}</td>
        <td>${row.total}</td>
      </tr>
    `)
    .join('');
}

function renderTrendChart(data) {
  const container = document.getElementById('reports-volume-chart');
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-muted">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  const max = Math.max(1, ...data.map((item) => item.count));

  container.innerHTML = data
    .map((item) => {
      const height = Math.max(8, Math.round((item.count / max) * 100));
      return `
        <div class="reports-chart-bar">
          <div class="bar" style="height: ${height}%"></div>
          <span class="value">${formatNumber(item.count)}</span>
          <span class="label">${item.label}</span>
        </div>
      `;
    })
    .join('');
}

function renderProgressSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<p class="text-muted">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  container.innerHTML = data
    .map((item) => `
      <div class="reports-progress-row">
        <div class="reports-progress-top">
          <span>${item.label}</span>
          <span>${formatNumber(item.percent)}%</span>
        </div>
        <div class="reports-progress-bar">
          <div class="reports-progress-fill ${item.className}" style="width: ${Math.min(item.percent, 100)}%"></div>
        </div>
        <div class="reports-progress-meta">${translate('reservations.reports.progress.meta', '{count} حجز', '{count} reservations').replace('{count}', formatNumber(item.rawCount ?? item.value))}</div>
      </div>
    `)
    .join('');
}

function renderTopCustomers(rows) {
  const tbody = document.getElementById('reports-top-customers');
  if (!tbody) return;

  if (!rows || rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="3" class="text-muted">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${row.name}</td>
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
    tbody.innerHTML = `<tr><td colspan="3" class="text-muted">${translate('reservations.reports.table.emptyPeriod', 'لا توجد بيانات في هذه الفترة.', 'No data for this period.')}</td></tr>`;
    return;
  }

  tbody.innerHTML = rows
    .map((row) => `
      <tr>
        <td>${row.name}</td>
        <td>${formatNumber(row.count)}</td>
        <td>${formatCurrency(row.revenue)}</td>
      </tr>
    `)
    .join('');
}

function formatReservationRow(reservation, customerMap, technicianMap) {
  const code = reservation?.reservationId || reservation?.id || '—';
  const customer = customerMap.get(String(reservation?.customerId));
  const customerName = customer?.customerName
    || translate('reservations.reports.topCustomers.unknown', 'عميل غير معروف', 'Unknown customer');

  const dateLabel = formatDateTime(reservation?.start);
  const statusLabel = formatReservationStatus(reservation);
  const paymentLabel = paymentLabelText(reservation);
  const totalLabel = formatCurrency(reservation?.cost || 0);

  const technicians = (reservation?.technicians || [])
    .map((id) => technicianMap.get(String(id))?.name)
    .filter(Boolean);

  const separator = translate('reservations.list.crew.separator', '، ', ', ');
  const techniciansDisplay = technicians
    .map((name) => escapeHtml(name))
    .join(escapeHtml(separator));

  const customerDisplay = technicians.length
    ? `${escapeHtml(customerName)}<br><small class="text-muted">${techniciansDisplay}</small>`
    : escapeHtml(customerName);

  return {
    code: escapeHtml(code),
    customer: customerDisplay,
    date: escapeHtml(dateLabel),
    status: escapeHtml(statusLabel),
    payment: escapeHtml(paymentLabel),
    total: escapeHtml(totalLabel)
  };
}

function paymentLabelText(reservation) {
  const { paid } = computeReportStatus(reservation);
  return paid
    ? translate('reservations.reports.payment.paidLabel', 'مدفوعة', 'Paid')
    : translate('reservations.reports.payment.unpaidLabel', 'غير مدفوعة', 'Unpaid');
}

function formatReservationStatus(reservation) {
  const { statusValue } = computeReportStatus(reservation);
  if (statusValue === 'completed') {
    return translate('reservations.list.status.completed', '📁 منتهي', 'Completed');
  }
  if (statusValue === 'confirmed') {
    return translate('reservations.list.status.confirmed', '✅ مؤكد', 'Confirmed');
  }
  if (statusValue === 'pending') {
    return translate('reservations.list.status.pending', '⏳ غير مؤكد', 'Pending');
  }
  return escapeHtml(statusValue);
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
  const confirmedEl = document.getElementById('reports-kpi-confirmed');
  const confirmedMetaEl = document.getElementById('reports-kpi-confirmed-meta');
  const paidEl = document.getElementById('reports-kpi-paid');
  const paidMetaEl = document.getElementById('reports-kpi-paid-meta');

  const total = metrics.total || 0;
  const revenue = metrics.revenue || 0;
  const confirmed = metrics.confirmed || 0;
  const paid = metrics.paidCount || 0;
  const avg = metrics.average || 0;
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
    const averageText = translate('reservations.reports.kpi.revenue.average', 'متوسط قيمة الحجز {value}', 'Average reservation value {value}')
      .replace('{value}', formatCurrency(avg));
    revenueMetaEl.textContent = averageText;
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

function formatNumber(value) {
  const { numberFormatter: nf } = getFormatters();
  const formatted = nf.format(Math.round(value || 0));
  return normalizeNumbers(formatted);
}

function formatCurrency(value) {
  const { currencyFormatter: cf } = getFormatters();
  const formatted = cf.format(Math.max(0, Math.round(value || 0)));
  return normalizeNumbers(formatted);
}

function normalizeBarcode(value) {
  return (value || '').toString().trim();
}
