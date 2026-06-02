import { syncTechniciansStatuses } from './technicians.js';
import { t, getCurrentLanguage } from './language.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, isApiError as isReservationsApiError } from './reservationsService.js';
import { loadData } from './storage.js';
import { ensureTechnicianPositionsLoaded } from './technicianPositions.js';
import { buildReservationDetailsHtml } from './reservations/list/details.js';
import { resolveReservationProjectState } from './reservationsShared.js';
import { calculatePaymentProgress, determinePaymentStatus, calculateDraftFinancialBreakdown } from './reservationsSummary.js';
import { normalizeNumbers } from './utils.js';
import { resolveProjectTotals } from './projects/view.js';
import mountReservationModalsIfNeeded from './reservations/modals.js';
import { openReservationEditor, deleteReservation } from './reservations/controller/actions.js';
import { exportReservationPdf, exportReservationChecklistPdf } from './reservations/reservationPdf.js';

const CALENDAR_FETCH_PARAMS = { limit: 200 };

let calendarInstance = null;
let calendarLanguageListenerAttached = false;
let calendarReservationsListenerAttached = false;
let calendarResponsiveListenerAttached = false;
let calendarSwipeListenerAttached = false;
let calendarWidthBucket = null;
let calendarResizeTimer = null;
let calendarThemeObserverAttached = false;
let calendarThemeObserver = null;
let calendarThemeDebounce = null;
let isCalendarLoading = false;
let calendarErrorMessage = '';
let fullCalendarLoadPromise = null;
// Disable swipe-based period navigation to avoid accidental month changes on mobile
const SWIPE_NAV_ENABLED = false;
const CALENDAR_LEGEND_ITEMS = [
  { key: 'confirmed', chipClass: 'reservation-chip status-confirmed' },
  { key: 'pending', chipClass: 'reservation-chip status-pending' },
  { key: 'paid', chipClass: 'reservation-chip status-paid' },
  { key: 'partial', chipClass: 'reservation-chip status-partial' },
  { key: 'unpaid', chipClass: 'reservation-chip status-unpaid' },
  { key: 'completed', chipClass: 'reservation-chip status-completed' },
  { key: 'cancelled', chipClass: 'reservation-chip status-cancelled' }
];

const LEGEND_FALLBACK_AR = {
  confirmed: 'حجز مؤكد',
  pending: 'بانتظار التأكيد',
  paid: 'مدفوع بالكامل',
  partial: 'مدفوع جزئياً',
  unpaid: 'لم يتم الدفع',
  completed: 'مغلق',
  cancelled: 'ملغي'
};

const LEGEND_FALLBACK_EN = {
  confirmed: 'Confirmed reservation',
  pending: 'Awaiting confirmation',
  paid: 'Paid in full',
  partial: 'Partially paid',
  unpaid: 'Payment pending',
  completed: 'Closed',
  cancelled: 'Cancelled'
};

const TIME_FORMATTER_CACHE = new Map();


function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getCalendarButtonText() {
  return {
    today: t('calendar.buttons.today', 'اليوم'),
    month: t('calendar.buttons.month', 'شهر'),
    week: t('calendar.buttons.week', 'أسبوع'),
    day: t('calendar.buttons.day', 'يوم'),
  };
}

function getCalendarElements() {
  const calendarEl = document.getElementById('calendar');
  const panelEl = document.getElementById('calendar-panel') || calendarEl?.parentElement || null;
  const statusEl = document.getElementById('calendar-status');
  return { calendarEl, panelEl, statusEl };
}

// Resolve FullCalendar global in browser or test environments
function getFullCalendarGlobal() {
  try {
    if (typeof FullCalendar !== 'undefined') return FullCalendar;
  } catch (_e) { /* ignore */ }
  if (typeof window !== 'undefined' && window.FullCalendar) return window.FullCalendar;
  if (typeof global !== 'undefined' && global.FullCalendar) return global.FullCalendar;
  if (typeof globalThis !== 'undefined' && globalThis.FullCalendar) return globalThis.FullCalendar;
  return null;
}

async function ensureFullCalendarLoaded() {
  const existing = getFullCalendarGlobal();
  if (existing) return existing;
  if (fullCalendarLoadPromise) return fullCalendarLoadPromise;
  fullCalendarLoadPromise = new Promise((resolve) => {
    try {
      const src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.8/index.global.min.js';
      const el = document.createElement('script');
      el.src = src;
      el.async = true;
      el.onload = () => resolve(getFullCalendarGlobal());
      el.onerror = () => resolve(null);
      document.head.appendChild(el);
    } catch (_e) {
      resolve(null);
    }
  });
  return fullCalendarLoadPromise;
}

function getToastUICalendarGlobal() {
  // Support both legacy tui namespace and newer toastui namespace
  if (typeof window === 'undefined') return null;
  const maybe = window.tui?.Calendar || window.toastui?.Calendar || window.Calendar;
  return typeof maybe === 'function' ? maybe : null;
}

function getLegendFallback(key) {
  const language = getCurrentLanguage?.() === 'en' ? 'en' : 'ar';
  if (language === 'en') {
    return LEGEND_FALLBACK_EN[key] ?? key;
  }
  return LEGEND_FALLBACK_AR[key] ?? key;
}

function getTimeFormatter(locale) {
  if (!TIME_FORMATTER_CACHE.has(locale)) {
    TIME_FORMATTER_CACHE.set(locale, new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }));
  }
  return TIME_FORMATTER_CACHE.get(locale);
}

function formatEventTimeRange(startStr, endStr, isAllDay = false) {
  if (isAllDay) {
    const language = getCurrentLanguage?.() === 'en' ? 'en' : 'ar';
    const allDayFallback = language === 'en' ? 'All day' : 'طوال اليوم';
    return t('calendar.labels.allDay', allDayFallback);
  }

  if (!startStr) {
    return '';
  }

  const start = new Date(startStr);
  if (Number.isNaN(start.getTime())) {
    return '';
  }

  const locale = getCurrentLanguage?.() === 'en' ? 'en-US' : 'ar-SA-u-ca-gregory-nu-latn';
  const formatter = getTimeFormatter(locale);
  const startLabel = formatter.format(start);

  if (!endStr) {
    return startLabel;
  }

  const end = new Date(endStr);
  if (Number.isNaN(end.getTime())) {
    return startLabel;
  }

  const endLabel = formatter.format(end);
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
}

function getEventClassNames({ paidStatus, confirmed, completed, cancelled }) {
  const classNames = ['calendar-event'];
  if (completed === true || completed === 'true') {
    classNames.push('calendar-event--completed');
  }
  if (cancelled === true || cancelled === 'true') {
    classNames.push('calendar-event--cancelled');
  }
  if (confirmed === true || confirmed === 'true') {
    classNames.push('calendar-event--confirmed');
  } else {
    classNames.push('calendar-event--pending');
  }
  if (paidStatus === 'paid') classNames.push('calendar-event--paid');
  else if (paidStatus === 'partial') classNames.push('calendar-event--partial');
  else classNames.push('calendar-event--unpaid');
  return classNames;
}

function buildCalendarEventMarkup({
  timeLabel = '',
  idLabel = '',
  customer = '',
  confirmed = false,
  completed = false,
  cancelled = false,
  paidStatus = 'unpaid',
}) {
  const chip = (cls, text) => `<span class="calendar-chip ${cls}">${escapeHtml(text)}</span>`;
  const confirmedLabel = confirmed ? t('calendar.badges.confirmed', 'مؤكد') : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = paidStatus === 'paid'
    ? t('calendar.badges.paid', 'مدفوع')
    : paidStatus === 'partial'
      ? t('calendar.badges.partial', 'مدفوع جزئياً', 'Partially paid')
      : t('calendar.badges.unpaid', 'غير مدفوع');
  let chips = [];
  if (cancelled) {
    chips = [chip('status-cancelled', t('calendar.badges.cancelled', 'ملغي'))];
  } else {
    const paidClass = paidStatus === 'paid' ? 'status-paid' : paidStatus === 'partial' ? 'status-partial' : 'status-unpaid';
    chips = [chip(confirmed ? 'status-confirmed' : 'status-pending', confirmedLabel), chip(paidClass, paidLabel)];
    if (completed) chips.push(chip('status-completed', t('calendar.badges.completed', 'مغلق')));
  }

  return `
    <div class="calendar-event-wrapper">
      <div class="calendar-event-card">
        <div class="calendar-event-card__head">
          <span class="calendar-event-card__time">${escapeHtml(timeLabel || '')}</span>
          <span class="calendar-event-card__id">${escapeHtml(idLabel)}</span>
        </div>
        <div class="calendar-event-card__customer">${escapeHtml(customer)}</div>
        <div class="calendar-event-card__chips">${chips.join('')}</div>
      </div>
    </div>
  `;
}

// Render a styled event card for FullCalendar
function buildEventContent(arg) {
  try {
    const { event } = arg || {};
    const props = event?.extendedProps || {};
    const timeLabel = formatEventTimeRange(event?.startStr, event?.endStr, event?.allDay);
    const idLabel = props?.reservationId ? String(props.reservationId) : (event?.id != null ? String(event.id) : t('common.placeholder.empty', '—'));
    const customer = props?.customerName || t('calendar.labels.unknownCustomer', 'غير معروف');
    const confirmed = props?.confirmed === true || props?.confirmed === 'true';
    const paidStatus = typeof props?.paidStatus === 'string' ? props.paidStatus : (props?.paid === true || props?.paid === 'paid') ? 'paid' : 'unpaid';
    const completed = props?.completed === true || props?.completed === 'true';
    const cancelled = props?.cancelled === true || props?.cancelled === 'true';
    const html = buildCalendarEventMarkup({
      timeLabel,
      idLabel,
      customer,
      confirmed,
      completed,
      cancelled,
      paidStatus,
    });
    return { html };
  } catch (_e) {
    return { html: '' };
  }
}

function renderCalendarLegend() {
  const legendEl = document.getElementById('calendar-legend');
  const legendShell = legendEl?.closest('.calendar-legend-shell');
  if (!legendEl) return;
  const language = getCurrentLanguage?.() === 'en' ? 'en' : 'ar';
  const legendHtml = CALENDAR_LEGEND_ITEMS.map(({ key, chipClass }) => {
    const fallback = language === 'en' ? LEGEND_FALLBACK_EN[key] ?? key : LEGEND_FALLBACK_AR[key] ?? key;
    const label = escapeHtml(t(`calendar.legend.${key}`, fallback));
    return `<span class="calendar-legend__item" role="listitem"><span class="${chipClass} calendar-legend__chip">${label}</span></span>`;
  }).join('');
  legendEl.innerHTML = legendHtml;
  if (legendShell) {
    legendShell.hidden = legendHtml.trim().length === 0;
  }
}

function updateCalendarSummary(events = []) {
  const badge = document.getElementById('calendar-summary-badge');
  if (!badge) return;
  const count = Array.isArray(events) ? events.length : 0;
  const isEnglish = getCurrentLanguage?.() === 'en';
  badge.textContent = isEnglish
    ? `${count} ${count === 1 ? 'reservation' : 'reservations'}`
    : `${count} ${count === 1 ? 'حجز' : 'حجوزات'}`;
}

function decorateCalendarControls() {
  const { calendarEl } = getCalendarElements();
  if (!calendarEl) return;
  const toolbar = calendarEl.querySelector('.fc-header-toolbar');
  if (!toolbar) return;
  toolbar.classList.add('calendar-toolbar');
  toolbar.querySelectorAll('.fc-toolbar-chunk').forEach((chunk) => {
    chunk.classList.add('calendar-toolbar__chunk');
  });
  const titleEl = toolbar.querySelector('.fc-toolbar-title');
  if (titleEl) {
    titleEl.classList.add('calendar-toolbar__title');
  }
  toolbar.querySelectorAll('.fc-button').forEach((button) => {
    button.classList.add('calendar-toolbar__button');
  });
}



function setCalendarStatus({ loading = false, error = '', empty = false } = {}) {
  const { panelEl, statusEl } = getCalendarElements();
  if (!panelEl || !statusEl) return;

  const hasError = typeof error === 'string' ? error.trim().length > 0 : Boolean(error);
  const isEmpty = !loading && !hasError && Boolean(empty);
  const shouldShow = loading || hasError || isEmpty;

  panelEl.classList.toggle('is-loading', loading);
  panelEl.classList.toggle('has-error', hasError);
  panelEl.classList.toggle('is-empty', isEmpty);

  if (!statusEl.dataset.initialized) {
    statusEl.classList.add('calendar-status-card');
    statusEl.dataset.initialized = 'true';
  }

  statusEl.classList.remove(
    'calendar-status-card--loading',
    'calendar-status-card--error',
    'calendar-status-card--empty'
  );
  statusEl.classList.toggle('hidden', !shouldShow);

  if (!shouldShow) {
    statusEl.innerHTML = '';
    statusEl.removeAttribute('data-status');
    return;
  }

  let message = '';
  if (loading) {
    message = t('calendar.status.loading', '⏳ جارٍ تحميل الحجوزات...');
  } else if (hasError) {
    message = typeof error === 'string' && error.trim().length > 0
      ? error
      : t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
  } else if (isEmpty) {
    message = t('calendar.status.empty', 'لا توجد حجوزات لعرضها في هذه الفترة.');
  }

  const statusKey = loading ? 'loading' : (hasError ? 'error' : 'empty');
  statusEl.setAttribute('data-status', statusKey);
  statusEl.classList.add(`calendar-status-card--${statusKey}`);

  statusEl.innerHTML = '';

  if (loading) {
    const spinner = document.createElement('span');
    spinner.className = 'loading loading-spinner loading-md text-primary';
    spinner.setAttribute('aria-hidden', 'true');
    statusEl.appendChild(spinner);
  } else {
    const icon = document.createElement('span');
    icon.className = 'calendar-status-card__icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = hasError ? '⚠️' : '🗓️';
    statusEl.appendChild(icon);
  }

  const messageEl = document.createElement('span');
  messageEl.className = 'calendar-status-card__message text-center text-sm font-semibold';
  messageEl.textContent = message;
  statusEl.appendChild(messageEl);
}


// removed earlier duplicate destroy handler in favor of version below

function normalizeReservationForEvent(reservation, project = null) {
  if (!reservation || typeof reservation !== 'object') return null;

  const start = reservation.start ?? reservation.startDatetime ?? reservation.start_datetime ?? null;
  const endValue = reservation.end ?? reservation.endDatetime ?? reservation.end_datetime ?? start;
  if (!start) return null;

  const statusValue = String(reservation.status ?? reservation.reservationStatus ?? '').toLowerCase();
  // Derive payment status based on the same final total used in details/tiles
  // Prefer a live recompute from items/crew/discount/tax; fall back to stored total
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const crewAssignments = Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [];
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const useAssignments = Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object';
  const useTechnicianIds = Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] !== 'object';
  const discountRaw = reservation.discount
    ?? reservation.discountValue
    ?? reservation.discount_value
    ?? reservation.discountAmount
    ?? 0;
  const discountValue = Number.parseFloat(normalizeNumbers(String(discountRaw))) || 0;
  const discountTypeRaw = reservation.discountType
    ?? reservation.discount_type
    ?? reservation.discountMode
    ?? 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
  const applyTaxFlag = Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);
  const companySharePercentRaw = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? 0;
  const companySharePercent = Number.parseFloat(normalizeNumbers(String(companySharePercentRaw))) || 0;
  let displayTotal = 0;
  try {
    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: useTechnicianIds ? techniciansOrAssignments : [],
      crewAssignments: useAssignments ? techniciansOrAssignments : [],
      discount: discountValue,
      discountType,
      applyTax: applyTaxFlag,
      start: reservation.start,
      end: reservation.end,
      companySharePercent: companySharePercent > 0 ? companySharePercent : null,
      groupingSource: reservation,
    });
    displayTotal = Number(breakdown?.finalTotal || 0) || 0;
  } catch (_) {
    displayTotal = Number(reservation.totalAmount ?? reservation.cost ?? 0) || 0;
  }
  const totalAmount = displayTotal;
  const resHistoryCal = reservation.paymentHistory || reservation.payment_history || [];
  const resProgress = calculatePaymentProgress({
    totalAmount,
    paidAmount: resHistoryCal.length ? 0 : reservation.paidAmount,
    paidPercent: resHistoryCal.length ? 0 : reservation.paidPercent,
    history: resHistoryCal,
  });
  let paidStatus = determinePaymentStatus({
    manualStatus: null,
    paidAmount: resProgress.paidAmount,
    paidPercent: resProgress.paidPercent,
    totalAmount,
  });
  if (project) {
    try {
      const totals = resolveProjectTotals(project) || {};
      const totalWithTax = Number(totals.totalWithTax || 0);
      const projHistoryCal = project.paymentHistory || project.payments || [];
      const projProgress = calculatePaymentProgress({
        totalAmount: totalWithTax,
        paidAmount: projHistoryCal.length ? 0 : project.paidAmount,
        paidPercent: projHistoryCal.length ? 0 : project.paidPercent,
        history: projHistoryCal,
      });
      const projStatus = determinePaymentStatus({
        manualStatus: null,
        paidAmount: projProgress.paidAmount,
        paidPercent: projProgress.paidPercent,
        totalAmount: totalWithTax,
      });
      if (projStatus) paidStatus = projStatus;
    } catch (_e) { /* ignore */ }
  }
  const paid = paidStatus === 'paid';
  const { effectiveConfirmed: confirmed } = resolveReservationProjectState(reservation, project);
  const reservationIdentifier = reservation.reservationId
    ?? reservation.reservationCode
    ?? reservation.reservation_code
    ?? reservation.id
    ?? start;
  const customerName = reservation.customerName ?? reservation.customer_name ?? '';

  let completed = Boolean(reservation.completed);
  if (!completed && endValue) {
    const eventEnd = new Date(endValue);
    if (!Number.isNaN(eventEnd.getTime())) {
      completed = eventEnd < new Date();
    }
  }

  return {
    id: reservation.id ?? reservationIdentifier ?? start,
    start,
    end: endValue || start,
    paid,
    paidStatus,
    confirmed,
    completed,
    cancelled: statusValue === 'cancelled' || statusValue === 'canceled',
    reservationId: reservationIdentifier ?? '',
    customerName,
    raw: reservation,
  };
}

function buildCalendarEvents(reservations = []) {
  const { projects = [] } = loadData();
  const projectsMap = new Map(projects.map((project) => [String(project.id), project]));

  return reservations
    .map((reservation) => {
      const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
      const project = projectId != null && projectId !== ''
        ? projectsMap.get(String(projectId)) || null
        : null;
      const normalized = normalizeReservationForEvent(reservation, project);
      if (!normalized) return null;

      const classNames = getEventClassNames({
        paidStatus: normalized.paidStatus,
        confirmed: normalized.confirmed,
        completed: normalized.completed,
        cancelled: normalized.cancelled
      });

      return {
        id: normalized.id,
        title: '',
        start: normalized.start,
        end: normalized.end,
        display: 'block',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: '',
        classNames,
        extendedProps: {
          ...reservation,
          raw: reservation,
          paid: normalized.paid,
          paidStatus: normalized.paidStatus,
          confirmed: normalized.confirmed,
          completed: normalized.completed,
          cancelled: normalized.cancelled,
          reservationId: normalized.reservationId,
          customerName: normalized.customerName,
        },
      };
    })
    .filter(Boolean);
}


// No custom header buttons; TUI has its own minimal controls we won't skin here

async function loadCalendarData() {
  if (isCalendarLoading) {
    return getReservationsState();
  }

  isCalendarLoading = true;
  calendarErrorMessage = '';

  try {
    await ensureReservationsLoaded({ suppressError: false, params: CALENDAR_FETCH_PARAMS });
  } catch (error) {
    console.error('❌ [calendar] Failed to load reservations for calendar view', error);
    calendarErrorMessage = isReservationsApiError(error)
      ? error.message
      : (error instanceof Error && error.message) || '';
  } finally {
    isCalendarLoading = false;
  }

  return getReservationsState();
}

function destroyCalendarInstance() {
  if (!calendarInstance) return;
  try {
    if (typeof calendarInstance.destroy === 'function') {
      calendarInstance.destroy();
    }
  } catch (_e) {
    /* noop */
  }
  calendarInstance = null;
}

function dispatchCalendarUpdated(events) {
  const detail = { events };
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('calendar:updated', { detail }));
  } else if (typeof dispatchEvent === 'function') {
    dispatchEvent(new CustomEvent('calendar:updated', { detail }));
  }
}

function refreshCalendarFromState() {
  // With TUI Calendar, we will re-render the instance for simplicity and reliability
  renderCalendar();
}

function ensureCalendarListeners() {
  if (!calendarLanguageListenerAttached) {
    document.addEventListener('language:changed', () => {
      if (calendarInstance) {
        calendarInstance.setOption('locale', getCurrentLanguage());
      }
      renderCalendar();
    });
    calendarLanguageListenerAttached = true;
  }

  if (!calendarReservationsListenerAttached) {
    document.addEventListener('reservations:changed', () => {
      refreshCalendarFromState();
    });
    calendarReservationsListenerAttached = true;
  }
}

function getWidthBucket(w) {
  if (w <= 480) return 'xs';
  if (w <= 768) return 'sm';
  return 'lg';
}

function getResponsiveCalendarView() {
  if (typeof window === 'undefined') return 'month';
  return 'month';
}

function applyResponsiveCalendarView() {
  if (!calendarInstance) return;
  const w = typeof window !== 'undefined' ? (window.innerWidth || 1024) : 1024;
  const bucket = getWidthBucket(w);
  const desiredView = calendarInstance.__isFullCalendar
    ? getResponsiveFcView()
    : getResponsiveCalendarView();
  if (calendarWidthBucket !== bucket && typeof calendarInstance.changeView === 'function') {
    calendarWidthBucket = bucket;
    calendarInstance.changeView(desiredView, true);
  }
}

function ensureResponsiveListener() {
  if (calendarResponsiveListenerAttached) return;
  if (typeof window === 'undefined') return;
  // Debounce rapid resize events (mobile address bar show/hide)
  window.addEventListener('resize', () => {
    if (calendarResizeTimer) {
      clearTimeout(calendarResizeTimer);
    }
    calendarResizeTimer = setTimeout(() => {
      applyResponsiveCalendarView();
    }, 160);
  }, { passive: true });
  calendarResponsiveListenerAttached = true;
}

function ensureSwipeNavigation() {
  // TUI Calendar supports wheel/toolbar navigation; keep swipe disabled
}

function ensureThemeListener() {
  if (calendarThemeObserverAttached) return;
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;

  const handler = () => {
    if (calendarThemeDebounce) {
      clearTimeout(calendarThemeDebounce);
    }
    calendarThemeDebounce = setTimeout(() => {
      refreshCalendarFromState();
    }, 80);
  };

  calendarThemeObserver = new MutationObserver(handler);
  calendarThemeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  if (document.body) {
    calendarThemeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  calendarThemeObserverAttached = true;
}



// TUI Calendar will use HTML template via template.time(schedule) below


function showReservationModal(reservation) {
  mountReservationModalsIfNeeded();
  const container = document.getElementById('calendar-reservation-details');
  if (!container) {
    alert(t('calendar.alerts.cannotShowDetails', 'لا يمكن عرض تفاصيل الحجز'));
    return;
  }

  const dataStore = loadData() || {};
  const {
    reservations: storedReservations = [],
    customers: customersList = [],
    projects: projectsList = [],
    technicians: storedTechnicians = []
  } = dataStore;

  const {
    mergedReservation,
    matchedIndex,
  } = resolveCalendarReservationContext(reservation, storedReservations);

  const projectId = mergedReservation.projectId ?? mergedReservation.project_id ?? null;
  const project = projectId != null
    ? projectsList.find((proj) => String(proj.id) === String(projectId)) || null
    : null;

  const customerId = mergedReservation.customerId ?? mergedReservation.customer_id;
  const customer = customersList.find((c) => String(c.id) === String(customerId));

  const syncedTechnicians = syncTechniciansStatuses();
  const techniciansCandidates = [
    ...(Array.isArray(syncedTechnicians) ? syncedTechnicians : []),
    ...(Array.isArray(storedTechnicians) ? storedTechnicians : [])
  ];

  const techniciansMap = new Map();
  techniciansCandidates.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });
  const techniciansList = Array.from(techniciansMap.values());

  let detailsHtml = '';
  try {
    detailsHtml = buildReservationDetailsHtml(
      mergedReservation,
      customer,
      techniciansList,
      matchedIndex >= 0 ? matchedIndex : 0,
      project
    );
  } catch (error) {
    console.error('❌ [calendar] Failed to build reservation details for calendar modal', error);
    container.innerHTML = `<p class="text-sm text-error">${escapeHtml(t('calendar.alerts.cannotShowDetails', 'لا يمكن عرض تفاصيل الحجز'))}</p>`;
    return;
  }

  const modalEl = document.getElementById('calendarReservationModal');
  const modalApi = window.bootstrap?.Modal;
  const hideCalendarModal = (onHidden = null) => {
    if (!modalEl || !modalApi) return;
    if (typeof onHidden === 'function') {
      modalEl.addEventListener('hidden.bs.modal', () => {
        onHidden();
      }, { once: true });
    }
    modalApi.getOrCreateInstance(modalEl).hide();
  };

  const hydrateCalendarReservationDetails = () => {
    container.classList.add('calendar-reservation-details');

    try {
      const slider = container.querySelector('[data-tech-slider]');
      if (slider) {
        const track = slider.querySelector('[data-slider-track]');
        const prev = slider.querySelector('[data-slider-prev]');
        const next = slider.querySelector('[data-slider-next]');
        if (track && (prev || next)) {
          const isRtl = document.documentElement.getAttribute('dir') === 'rtl' || document.body.getAttribute('dir') === 'rtl';
          const getStep = () => {
            const firstCard = track.querySelector('.reservation-technician-card');
            const cardWidth = firstCard ? (firstCard.getBoundingClientRect().width || 220) : 220;
            const gap = 12;
            const visible = Math.max(1, Math.floor(track.clientWidth / (cardWidth + gap)));
            return Math.max(cardWidth + gap, Math.floor(visible * (cardWidth + gap) * 0.9));
          };
          const updateButtons = () => {
            const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 2);
            const atStart = track.scrollLeft <= 1;
            const atEnd = track.scrollLeft >= maxScroll;
            if (prev) prev.disabled = atStart;
            if (next) next.disabled = atEnd;
          };
          const scrollByStep = (dir) => {
            const delta = getStep() * dir;
            const left = isRtl ? -delta : delta;
            track.scrollBy({ left, behavior: 'smooth' });
          };
          prev.onclick = () => scrollByStep(-1);
          next.onclick = () => scrollByStep(1);
          track.addEventListener('scroll', updateButtons, { passive: true });
          window.addEventListener('resize', updateButtons, { passive: true });
          setTimeout(updateButtons, 0);
        }
      }
    } catch (_e) { /* optional */ }

    container.querySelectorAll('.reservation-qty-btn, .reservation-remove-button').forEach((button) => {
      if (!(button instanceof HTMLElement)) return;
      button.setAttribute('disabled', 'true');
      button.setAttribute('aria-disabled', 'true');
      button.setAttribute('tabindex', '-1');
    });

    const openProjectBtn = container.querySelector('[data-action="open-project"]');
    if (openProjectBtn) {
      if (project) {
        openProjectBtn.addEventListener('click', () => {
          const projectIdValue = project?.id != null ? String(project.id) : '';
          const target = projectIdValue
            ? `projects.html?project=${encodeURIComponent(projectIdValue)}`
            : 'projects.html';
          window.location.href = target;
        });
      } else if (openProjectBtn instanceof HTMLElement) {
        openProjectBtn.setAttribute('disabled', 'true');
      }
    }

    const editBtn = container.querySelector('#reservation-details-edit-btn');
    if (editBtn instanceof HTMLButtonElement) {
      if (matchedIndex >= 0) {
        editBtn.onclick = () => {
          hideCalendarModal(() => {
            openReservationEditor(matchedIndex, mergedReservation);
          });
        };
      } else {
        editBtn.disabled = true;
        editBtn.setAttribute('aria-disabled', 'true');
      }
    }

    const deleteBtn = container.querySelector('#reservation-details-delete-btn');
    if (deleteBtn instanceof HTMLButtonElement) {
      if (matchedIndex >= 0) {
        deleteBtn.onclick = () => {
          hideCalendarModal(() => {
            deleteReservation(matchedIndex);
          });
        };
      } else {
        deleteBtn.disabled = true;
        deleteBtn.setAttribute('aria-disabled', 'true');
      }
    }

    const exportBtn = container.querySelector('#reservation-details-export-btn');
    if (exportBtn instanceof HTMLButtonElement) {
      exportBtn.onclick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        exportBtn.blur();
        try {
          await exportReservationPdf({ reservation: mergedReservation, customer, project });
        } catch (error) {
          console.error('❌ [calendar] export reservation pdf failed', error);
        }
      };
    }

    const checklistBtn = container.querySelector('#reservation-details-checklist-btn');
    if (checklistBtn instanceof HTMLButtonElement) {
      checklistBtn.onclick = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        checklistBtn.blur();
        try {
          await exportReservationChecklistPdf({ reservation: mergedReservation, customer, project });
        } catch (error) {
          console.error('❌ [calendar] export reservation checklist failed', error);
        }
      };
    }
  };

  container.innerHTML = detailsHtml;
  hydrateCalendarReservationDetails();

  // Refresh positions cache from API if needed, then re-render details to ensure position labels are accurate
  try {
    ensureTechnicianPositionsLoaded()?.then(() => {
      try {
        const refreshedTechs = Array.from(new Map((syncTechniciansStatuses() || []).map((t) => [String(t.id), t])).values());
        const refreshedHtml = buildReservationDetailsHtml(
          mergedReservation,
          customer,
          refreshedTechs,
          matchedIndex >= 0 ? matchedIndex : 0,
          project
        );
        container.innerHTML = refreshedHtml;
        hydrateCalendarReservationDetails();
      } catch (_e) { /* ignore */ }
    }).catch(() => { /* ignore */ });
  } catch (_e) {
    /* non-fatal */
  }

  if (modalEl && modalApi) {
    modalApi.getOrCreateInstance(modalEl).show();
  } else {
    alert(t('calendar.alerts.cannotOpenModal', 'لا يمكن فتح نافذة التفاصيل'));
  }
}

function resolveCalendarReservationContext(reservation, storedReservations = []) {
  const baseReservation = reservation?.raw && typeof reservation.raw === 'object'
    ? { ...reservation.raw, ...reservation }
    : { ...reservation };

  const identifierCandidates = collectCalendarReservationIdentifiers(baseReservation);
  const matchedIndex = findStoredCalendarReservationIndex(storedReservations, identifierCandidates);
  const storedReservation = matchedIndex >= 0 ? storedReservations[matchedIndex] : null;

  if (!storedReservation) {
    return {
      baseReservation,
      mergedReservation: baseReservation,
      matchedIndex: -1,
      storedReservation: null,
    };
  }

  const mergedReservation = {
    ...baseReservation,
    ...storedReservation,
  };

  if (Array.isArray(storedReservation.items) && storedReservation.items.length) {
    mergedReservation.items = storedReservation.items;
  }
  if (Array.isArray(storedReservation.packages) && storedReservation.packages.length) {
    mergedReservation.packages = storedReservation.packages;
  }

  return {
    baseReservation,
    mergedReservation,
    matchedIndex,
    storedReservation,
  };
}

function collectCalendarReservationIdentifiers(reservation = {}) {
  return [
    reservation.id,
    reservation.reservationId,
    reservation.reservation_id,
    reservation.reservationCode,
    reservation.reservation_code,
  ]
    .map((value) => (value == null ? '' : String(value)))
    .filter((value) => value.length > 0);
}

function findStoredCalendarReservationIndex(storedReservations = [], identifierCandidates = []) {
  if (!identifierCandidates.length) return -1;

  return storedReservations.findIndex((entry) => {
    const entryIds = collectCalendarReservationIdentifiers(entry);
    if (entryIds.length === 0) return false;
    return entryIds.some((value) => identifierCandidates.includes(value));
  });
}




export function renderCalendar() {
  ensureCalendarListeners();
  ensureResponsiveListener();
  ensureThemeListener();
  renderCalendarLegend();

  const { calendarEl } = getCalendarElements();
  if (!calendarEl) return;

  const TuiCalendar = getToastUICalendarGlobal();
  if (!TuiCalendar) {
    // Try FullCalendar fallback dynamically
    (async () => {
      const FC = await ensureFullCalendarLoaded();
      if (!FC || typeof FC.Calendar !== 'function') {
        const fallbackMessage = t('calendar.status.missingLibrary', 'تعذر تحميل مكتبة التقويم. يرجى تحديث الصفحة.');
        setCalendarStatus({ error: fallbackMessage });
        destroyCalendarInstance();
        return;
      }
      setCalendarStatus({ loading: true });
      const reservations = await loadCalendarData();
      if (calendarErrorMessage) {
        const fallback = t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
        setCalendarStatus({ loading: false, error: calendarErrorMessage || fallback });
        destroyCalendarInstance();
        return;
      }
      const events = buildCalendarEvents(reservations);
      if (!calendarInstance) {
        calendarInstance = new FC.Calendar(calendarEl, {
          initialView: getResponsiveFcView(),
          locale: getCurrentLanguage(),
          timeZone: 'local',
          expandRows: true,
          height: 'auto',
          contentHeight: 'auto',
          slotMinTime: '06:00:00',
          slotMaxTime: '24:00:00',
          slotDuration: '00:30:00',
          headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' },
          dayMaxEventRows: 2,
          fixedWeekCount: true,
          showNonCurrentDates: true,
          views: {
            dayGridMonth: { dayMaxEventRows: 2, fixedWeekCount: true },
          },
          moreLinkClick: 'popover',
          lazyFetching: false,
          noEventsContent() { return t('calendar.noEvents', 'لا توجد حجوزات لعرضها في هذا النطاق'); },
          buttonText: { today: t('calendar.buttons.today', 'اليوم'), month: t('calendar.buttons.month', 'شهر'), week: t('calendar.buttons.week', 'أسبوع'), day: t('calendar.buttons.day', 'يوم') },
          events,
          eventContent: buildEventContent,
          eventClick(info) { showReservationModal(info.event.extendedProps); },
          windowResize: applyResponsiveCalendarView,
          datesSet() { decorateCalendarControls(); }
        });
        calendarInstance.render();
        calendarInstance.__isFullCalendar = true;
      } else {
        calendarInstance.batchRendering?.(() => {
          calendarInstance.removeAllEvents();
          calendarInstance.addEventSource(events);
        });
      }
      applyResponsiveCalendarView();
      dispatchCalendarUpdated(events);
      updateCalendarSummary(events);
      setCalendarStatus({ loading: false, error: '', empty: events.length === 0 });
    })();
    return;
  }

  (async () => {
    setCalendarStatus({ loading: true });

    const reservations = await loadCalendarData();

    if (calendarErrorMessage) {
      const fallback = t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
      setCalendarStatus({ loading: false, error: calendarErrorMessage || fallback });
      destroyCalendarInstance();
      return;
    }

    const events = buildCalendarSchedules(reservations);

    // Always recreate for simplicity and to avoid API differences
    destroyCalendarInstance();
    const defaultView = getResponsiveCalendarView();
    calendarInstance = new TuiCalendar('#calendar', {
      defaultView,
      usageStatistics: false,
      isReadOnly: true,
      week: {
        taskView: false,
        hourStart: 6,
        hourEnd: 24,
      },
      month: {
        visibleWeeksCount: 0,
        startDayOfWeek: 0,
        isAlways6Weeks: true,
        maxVisibleEventCount: 6,
        moreLayerSize: 420,
      },
      template: {
        time(schedule) {
          // DaisyUI/Tailwind styled card content
          const paidStatus = typeof schedule?.raw?.paidStatus === 'string'
            ? schedule.raw.paidStatus
            : (schedule?.raw?.paid === true || schedule?.raw?.paid === 'paid') ? 'paid' : 'unpaid';
          const confirmed = schedule?.raw?.confirmed === true || schedule?.raw?.confirmed === 'true';
          const completed = schedule?.raw?.completed === true || schedule?.raw?.completed === 'true';
          const cancelled = schedule?.raw?.cancelled === true || schedule?.raw?.cancelled === 'true';
          const unknownCustomer = t('calendar.labels.unknownCustomer', 'غير معروف');
          const timeLabel = formatEventTimeRange(schedule.start?.toString?.() || schedule.start, schedule.end?.toString?.() || schedule.end, schedule.isAllDay);
          const idLabel = schedule?.raw?.reservationId ? String(schedule.raw.reservationId) : t('common.placeholder.empty', '—');
          const customer = schedule?.raw?.customerName || unknownCustomer;
          return buildCalendarEventMarkup({
            timeLabel,
            idLabel,
            customer,
            confirmed,
            completed,
            cancelled,
            paidStatus,
          });
        },
      },
    });
    calendarInstance.__isTui = true;

    // Bind click to open the existing modal of reservation details
    const openDetails = (raw) => {
      if (!raw) return;
      try { showReservationModal(raw); } catch (_e) { /* ignore */ }
    };
    if (typeof calendarInstance.on === 'function') {
      // v1 style
      calendarInstance.on('clickSchedule', (ev) => openDetails(ev?.schedule?.raw || ev?.schedule));
      // v2 style
      calendarInstance.on('clickEvent', (ev) => openDetails(ev?.event?.raw || ev?.event));
    }

    // Feed events
    try {
      if (typeof calendarInstance.createSchedules === 'function') {
        calendarInstance.createSchedules(events);
      } else if (typeof calendarInstance.createEvents === 'function') {
        calendarInstance.createEvents(events);
      }
    } catch (_e) {
      /* ignore failed feed for incompatible API */
    }

    applyResponsiveCalendarView();
    dispatchCalendarUpdated(events);
    updateCalendarSummary(events);
    setCalendarStatus({ loading: false, error: '', empty: events.length === 0 });
    setTimeout(() => {
      applyResponsiveCalendarView();
    }, 120);
  })().catch((error) => {
    console.error('❌ [calendar] renderCalendar failed', error);
    calendarErrorMessage = (error instanceof Error && error.message) || calendarErrorMessage || '';
    const fallback = t('calendar.status.error', 'تعذر تحميل بيانات الحجوزات. حاول مجدداً.');
    setCalendarStatus({ loading: false, error: calendarErrorMessage || fallback });
    destroyCalendarInstance();
  });
}

// Build TUI schedules from reservations state
function buildCalendarSchedules(reservations = []) {
  const { projects = [] } = loadData();
  const projectsMap = new Map(projects.map((p) => [String(p.id), p]));

  return reservations.map((reservation) => {
    const projectId = reservation?.projectId ?? reservation?.project_id ?? null;
    const project = projectId != null ? (projectsMap.get(String(projectId)) || null) : null;
    const normalized = normalizeReservationForEvent(reservation, project);
    if (!normalized) return null;
    // Build a readable one-line title for month view
    const timeLabel = formatEventTimeRange(normalized.start, normalized.end, false);
    const customer = normalized.customerName || '';
    const singleLineTitle = [timeLabel, customer].filter(Boolean).join(' · ');

    return {
      id: String(normalized.id),
      calendarId: 'default',
      title: singleLineTitle,
      category: 'time',
      isAllDay: false,
      isAllday: false,
      start: normalized.start,
      end: normalized.end,
      raw: {
        ...reservation,
        paid: normalized.paid,
        paidStatus: normalized.paidStatus,
        confirmed: normalized.confirmed,
        completed: normalized.completed,
        reservationId: normalized.reservationId,
        customerName: normalized.customerName,
      },
    };
  }).filter(Boolean);
}
function getResponsiveFcView() {
  return 'dayGridMonth';
}
