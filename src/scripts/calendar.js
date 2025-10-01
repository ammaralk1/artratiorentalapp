import { formatDateTime, normalizeNumbers } from './utils.js';
import { syncTechniciansStatuses } from './technicians.js';
import { calculateReservationDays } from './reservationsSummary.js';
import { t, getCurrentLanguage } from './language.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, isApiError as isReservationsApiError } from './reservationsService.js';
import { loadData } from './storage.js';
import { resolveReservationProjectState } from './reservationsShared.js';

const CALENDAR_FETCH_PARAMS = { limit: 200 };

let calendarInstance = null;
let calendarLanguageListenerAttached = false;
let calendarReservationsListenerAttached = false;
let calendarResponsiveListenerAttached = false;
let calendarThemeObserverAttached = false;
let calendarThemeObserver = null;
let calendarThemeDebounce = null;
let isCalendarLoading = false;
let calendarErrorMessage = '';

function getCalendarElements() {
  const calendarEl = document.getElementById('calendar');
  const panelEl = document.getElementById('calendar-panel') || calendarEl?.parentElement || null;
  const statusEl = document.getElementById('calendar-status');
  return { calendarEl, panelEl, statusEl };
}

function getFullCalendarGlobal() {
  if (typeof FullCalendar !== 'undefined') return FullCalendar;
  if (typeof window !== 'undefined' && window.FullCalendar) return window.FullCalendar;
  if (typeof globalThis !== 'undefined' && globalThis.FullCalendar) return globalThis.FullCalendar;
  return null;
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

  if (!shouldShow) {
    statusEl.textContent = '';
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

  statusEl.textContent = message;
}

function destroyCalendarInstance() {
  if (!calendarInstance) return;
  calendarInstance.destroy();
  calendarInstance = null;
}

function normalizeReservationForEvent(reservation, project = null) {
  if (!reservation || typeof reservation !== 'object') return null;

  const start = reservation.start ?? reservation.startDatetime ?? reservation.start_datetime ?? null;
  const endValue = reservation.end ?? reservation.endDatetime ?? reservation.end_datetime ?? start;
  if (!start) return null;

  const statusValue = String(reservation.status ?? '').toLowerCase();
  const paidStatus = reservation.paidStatus ?? reservation.paid_status ?? null;
  const paid = reservation.paid != null
    ? reservation.paid
    : paidStatus === 'paid';
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
    confirmed,
    completed,
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

      const palette = getEventPalette({
        ...reservation,
        paid: normalized.paid,
        confirmed: normalized.confirmed,
        completed: normalized.completed,
      });

      return {
        id: normalized.id,
        title: '',
        start: normalized.start,
        end: normalized.end,
        backgroundColor: palette.background,
        borderColor: palette.border,
        textColor: palette.text,
        display: 'auto',
        extendedProps: {
          ...reservation,
          paid: normalized.paid,
          confirmed: normalized.confirmed,
          completed: normalized.completed,
          reservationId: normalized.reservationId,
          customerName: normalized.customerName,
        },
      };
    })
    .filter(Boolean);
}

function getCalendarButtonText() {
  return {
    today: t('calendar.buttons.today', 'اليوم'),
    month: t('calendar.buttons.month', 'شهر'),
    week: t('calendar.buttons.week', 'أسبوع'),
    day: t('calendar.buttons.day', 'يوم'),
  };
}

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

function updateCalendarEvents(events) {
  if (!calendarInstance) return;
  calendarInstance.batchRendering(() => {
    calendarInstance.removeAllEvents();
    calendarInstance.addEventSource(events);
  });
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
  const reservations = getReservationsState();
  const events = buildCalendarEvents(reservations);

  if (!calendarInstance) {
    renderCalendar();
    return;
  }

  calendarInstance.setOption('locale', getCurrentLanguage());
  updateCalendarEvents(events);
  applyResponsiveCalendarView();
  setCalendarStatus({ loading: false, error: '', empty: events.length === 0 });
  dispatchCalendarUpdated(events);
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

function getResponsiveCalendarView() {
  if (typeof window === 'undefined') {
    return 'dayGridMonth';
  }
  return window.innerWidth <= 768 ? 'listWeek' : 'dayGridMonth';
}

function applyResponsiveCalendarView() {
  if (!calendarInstance) return;
  const desiredView = getResponsiveCalendarView();
  if (calendarInstance.view?.type !== desiredView) {
    calendarInstance.changeView(desiredView);
  }
  calendarInstance.updateSize();
}

function ensureResponsiveListener() {
  if (calendarResponsiveListenerAttached) return;
  if (typeof window === 'undefined') return;
  window.addEventListener('resize', () => {
    applyResponsiveCalendarView();
  });
  calendarResponsiveListenerAttached = true;
}

function ensureThemeListener() {
  if (calendarThemeObserverAttached) return;
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;

  const handler = () => {
    if (calendarThemeDebounce) {
      clearTimeout(calendarThemeDebounce);
    }
    calendarThemeDebounce = setTimeout(() => {
      if (!calendarInstance) return;
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

function isDarkModeActive() {
  if (typeof document === 'undefined') return false;
  const htmlEl = document.documentElement;
  return htmlEl?.classList.contains('dark-mode') || document.body?.classList.contains('dark-mode');
}

function getEventPalette() {
  if (isDarkModeActive()) {
    return {
      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.35), rgba(30, 58, 138, 0.7))',
      border: 'rgba(59, 130, 246, 0.5)',
      text: '#e2e8f0'
    };
  }

  return {
    background: 'linear-gradient(135deg, #4361ee, #3a0ca3)',
    border: '#240c62',
    text: '#ffffff'
  };
}

function buildEventContent(arg) {
  const { reservationId, customerName, paid, confirmed, completed } = arg.event.extendedProps;
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const wrapper = document.createElement('div');
  wrapper.className = 'fc-reservation-event';
  const confirmedLabel = isConfirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = isPaid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const unknownCustomer = t('calendar.labels.unknownCustomer', 'غير معروف');
  wrapper.innerHTML = `
    <div class="fc-reservation-id">${reservationId}</div>
    <div class="fc-reservation-customer">${customerName || unknownCustomer}</div>
    <div class="fc-reservation-tags">
      <span class="badge ${isConfirmed ? 'bg-success' : 'bg-warning text-dark'}">${confirmedLabel}</span>
      <span class="badge ${isPaid ? 'bg-primary' : 'bg-danger'}">${paidLabel}</span>
      ${completed ? `<span class="badge bg-secondary">${completedLabel}</span>` : ''}
    </div>
  `;
  return { domNodes: [wrapper] };
}

function showReservationModal(reservation) {
  const container = document.getElementById('calendar-reservation-details');
  if (!container) {
    alert(t('calendar.alerts.cannotShowDetails', 'لا يمكن عرض تفاصيل الحجز'));
    return;
  }

  const confirmed = reservation.confirmed === true || reservation.confirmed === 'true';
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const completed = !!reservation.completed;
  const confirmedLabel = confirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = paid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const language = getCurrentLanguage();

  const items = reservation.items || [];
  const techniciansList = syncTechniciansStatuses() || [];
  const techniciansMap = new Map(techniciansList.map((tech) => [String(tech.id), tech]));
  const assignedTechnicians = (reservation.technicians || [])
    .map((id) => techniciansMap.get(String(id)))
    .filter(Boolean);
  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const equipmentDailyTotal = items.reduce(
    (sum, item) => sum + ((item.qty || 1) * (item.price || 0)),
    0
  );
  const equipmentTotal = equipmentDailyTotal * rentalDays;
  const resolveTechnicianDailyRate = (technician = {}) => {
    const candidates = [
      technician.dailyWage,
      technician.daily_rate,
      technician.dailyRate,
      technician.wage,
      technician.rate
    ];

    for (const value of candidates) {
      if (value == null) continue;
      const parsed = parseFloat(normalizeNumbers(String(value)));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return 0;
  };
  const crewDailyTotal = assignedTechnicians.reduce((sum, tech) => sum + resolveTechnicianDailyRate(tech), 0);
  const crewTotal = crewDailyTotal * rentalDays;
  const discountBase = equipmentTotal + crewTotal;
  const discountAmount = (() => {
    const discountValue = parseFloat(reservation.discount) || 0;
    if (!discountValue) return 0;
    if (reservation.discountType === 'amount') return discountValue;
    return discountBase * (discountValue / 100);
  })();
  const taxableAmount = Math.max(0, discountBase - discountAmount);
  const taxAmount = reservation.applyTax ? taxableAmount * 0.15 : 0;
  const finalTotal = reservation.cost ?? Math.round(taxableAmount + taxAmount);

  const currencySuffix = t('calendar.labels.currencySuffix', 'ريال');
  const itemsHtml = items.length
    ? items.map((item, index) => {
        const image = item.image || item.imageUrl || item.img || '';
        const barcode = normalizeNumbers(String(item.barcode || '-'));
        const qty = normalizeNumbers(String(item.qty || 1));
        const price = normalizeNumbers(String(item.price || 0));
        const imageCell = image
          ? `<img src="${image}" alt="${item.desc || ''}" class="reservation-modal-item-thumb">`
          : '-';
        return `
          <tr>
            <td>${normalizeNumbers(String(index + 1))}</td>
            <td>${barcode}</td>
            <td>${item.desc || '-'}</td>
            <td>${qty}</td>
            <td>${price} ${currencySuffix}</td>
            <td>${imageCell}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="6" class="text-center">${t('calendar.labels.noEquipment', 'لا توجد معدات')}</td></tr>`;

  const summaryRows = [
    `<div>${t('calendar.summary.baseCost', '💵 إجمالي المعدات: <strong>{value} ريال</strong>').replace('{value}', equipmentTotal.toFixed(2))}</div>`,
    `<div>${t('calendar.summary.crewTotal', '😎 إجمالي الفريق: <strong>{value} ريال</strong>').replace('{value}', crewTotal.toFixed(2))}</div>`,
    `<div>${t('calendar.summary.duration', '⏱️ عدد الأيام: <strong>{value}</strong>').replace('{value}', normalizeNumbers(String(rentalDays)))}</div>`
  ];

  if (discountAmount > 0) {
    const percentSymbol = language === 'en' ? '%' : '٪';
    const discountLabel = reservation.discountType === 'percent'
      ? `${parseFloat(reservation.discount || 0).toFixed(2)}${percentSymbol}`
      : `${discountAmount.toFixed(2)} ${currencySuffix}`;
    summaryRows.push(`<div>${t('calendar.summary.discount', '💸 الخصم: <strong>{value}</strong>').replace('{value}', discountLabel)}</div>`);
  }

  if (reservation.applyTax && taxAmount > 0) {
    summaryRows.push(`<div>${t('calendar.summary.tax', '🧾 الضريبة (15%): <strong>{value} ريال</strong>').replace('{value}', taxAmount.toFixed(2))}</div>`);
  }

  summaryRows.push(`<div>${t('calendar.summary.total', '💰 المجموع النهائي: <strong>{value} ريال</strong>').replace('{value}', finalTotal.toFixed(2))}</div>`);

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : t('calendar.labels.noNotes', 'لا توجد ملاحظات');
  const customerDisplay = reservation.customerName || t('calendar.labels.unknownCustomer', 'غير معروف');

  const detailRows = [
    { icon: '🆔', label: t('calendar.labels.reservationId', 'رقم الحجز'), value: reservationIdDisplay },
    { icon: '👤', label: t('calendar.labels.customer', 'العميل'), value: customerDisplay },
    { icon: '🗓️', label: t('calendar.labels.start', 'بداية الحجز'), value: startDisplay },
    { icon: '🗓️', label: t('calendar.labels.end', 'نهاية الحجز'), value: endDisplay },
    { icon: '📝', label: t('calendar.labels.notes', 'الملاحظات'), value: notesDisplay }
  ];

  container.innerHTML = `
    <div class="calendar-reservation-status mb-3">
      <span class="badge ${confirmed ? 'bg-success' : 'bg-warning text-dark'}">${confirmedLabel}</span>
      <span class="badge ${paid ? 'bg-primary' : 'bg-danger'}">${paidLabel}</span>
      ${completed ? `<span class="badge bg-secondary">${completedLabel}</span>` : ''}
    </div>
    <div class="calendar-reservation-info">
      ${detailRows.map(row => `
        <div class="calendar-info-row">
          <span class="label">${row.icon} ${row.label}</span>
          <span class="value">${row.value}</span>
        </div>
      `).join('')}
    </div>
    <h6 class="calendar-section-title">${t('calendar.sections.crew', '😎 الفريق الفني')}</h6>
    ${assignedTechnicians.length
      ? `<ul class="list-unstyled calendar-reservation-technicians">${assignedTechnicians.map((tech) => {
            const roleText = tech.role ? ` — ${tech.role}` : '';
            return `<li><strong>${tech.name}</strong>${roleText}</li>`;
          }).join('')}</ul>`
      : `<p class="calendar-empty-state">${t('calendar.emptyStates.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.')}</p>`}
    <h6 class="calendar-section-title">${t('calendar.sections.equipment', '📦 المعدات')}</h6>
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${t('calendar.table.headers.barcode', 'الباركود')}</th>
            <th>${t('calendar.table.headers.description', 'الوصف')}</th>
            <th>${t('calendar.table.headers.quantity', 'الكمية')}</th>
            <th>${t('calendar.table.headers.price', 'السعر')}</th>
            <th>${t('calendar.table.headers.image', 'الصورة')}</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
    </div>
    <div class="calendar-reservation-summary">
      ${summaryRows.join('')}
    </div>
  `;

  const modalEl = document.getElementById('calendarReservationModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  } else {
    alert(t('calendar.alerts.cannotOpenModal', 'لا يمكن فتح نافذة التفاصيل'));
  }
}

export function renderCalendar() {
  ensureCalendarListeners();
  ensureResponsiveListener();
  ensureThemeListener();

  const { calendarEl } = getCalendarElements();
  if (!calendarEl) return;

  const FullCalendarLib = getFullCalendarGlobal();
  if (!FullCalendarLib || typeof FullCalendarLib.Calendar !== 'function') {
    const fallbackMessage = t('calendar.status.missingLibrary', 'تعذر تحميل مكتبة التقويم. يرجى تحديث الصفحة.');
    setCalendarStatus({ error: fallbackMessage });
    destroyCalendarInstance();
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

    const events = buildCalendarEvents(reservations);

    if (!calendarInstance) {
      calendarInstance = new FullCalendarLib.Calendar(calendarEl, {
        initialView: getResponsiveCalendarView(),
        locale: getCurrentLanguage(),
        timeZone: 'local',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        buttonText: getCalendarButtonText(),
        events,
        eventContent: buildEventContent,
        eventClick(info) {
          showReservationModal(info.event.extendedProps);
        },
        windowResize: applyResponsiveCalendarView,
      });
      calendarInstance.render();
    } else {
      calendarInstance.setOption('locale', getCurrentLanguage());
      calendarInstance.setOption('buttonText', getCalendarButtonText());
      updateCalendarEvents(events);
    }

    applyResponsiveCalendarView();
    dispatchCalendarUpdated(events);
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
