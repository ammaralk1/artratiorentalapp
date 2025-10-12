import { syncTechniciansStatuses } from './technicians.js';
import { t, getCurrentLanguage } from './language.js';
import { ensureReservationsLoaded } from './reservationsActions.js';
import { getReservationsState, isApiError as isReservationsApiError } from './reservationsService.js';
import { loadData } from './storage.js';
import { buildReservationDetailsHtml } from './reservations/list/details.js';
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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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

  if (!statusEl.dataset.initialized) {
    statusEl.classList.add(
      'alert',
      'rounded-3xl',
      'shadow-soft',
      'bg-base-100/95',
      'border',
      'border-dashed',
      'border-primary/30',
      'text-base-content',
      'text-sm',
      'font-semibold',
      'px-6',
      'py-5',
      'flex',
      'flex-col',
      'items-center',
      'justify-center',
      'gap-3',
      'backdrop-blur-sm',
      'text-center'
    );
    statusEl.dataset.initialized = 'true';
  }

  statusEl.classList.remove('alert-info', 'alert-error', 'alert-warning', 'alert-success');
  statusEl.classList.toggle('hidden', !shouldShow);

  if (!shouldShow) {
    statusEl.textContent = '';
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

  if (loading) {
    statusEl.classList.add('alert-info');
  } else if (hasError) {
    statusEl.classList.add('alert-error');
  } else {
    statusEl.classList.add('alert-warning');
  }

  statusEl.innerHTML = '';

  if (loading) {
    const spinner = document.createElement('span');
    spinner.className = 'loading loading-spinner loading-sm text-primary';
    spinner.setAttribute('aria-hidden', 'true');
    statusEl.appendChild(spinner);
  }

  const messageEl = document.createElement('span');
  messageEl.className = 'status-message';
  messageEl.textContent = message;
  statusEl.appendChild(messageEl);
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

function getEventPalette({ paid, confirmed, completed } = {}) {
  const dark = isDarkModeActive();
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const isCompleted = completed === true || completed === 'true';

  if (isCompleted) {
    return dark
      ? {
          background: 'rgba(148, 163, 184, 0.28)',
          border: 'rgba(148, 163, 184, 0.55)',
          text: '#f8fafc'
        }
      : {
          background: 'rgba(148, 163, 184, 0.22)',
          border: 'rgba(148, 163, 184, 0.45)',
          text: '#1f2937'
        };
  }

  if (!isConfirmed) {
    return dark
      ? {
          background: 'rgba(251, 191, 36, 0.28)',
          border: 'rgba(251, 146, 60, 0.6)',
          text: '#fff7ed'
        }
      : {
          background: 'rgba(251, 191, 36, 0.18)',
          border: 'rgba(217, 119, 6, 0.4)',
          text: '#92400e'
        };
  }

  if (!isPaid) {
    return dark
      ? {
          background: 'rgba(248, 113, 113, 0.32)',
          border: 'rgba(248, 113, 113, 0.65)',
          text: '#fee2e2'
        }
      : {
          background: 'rgba(248, 113, 113, 0.18)',
          border: 'rgba(220, 38, 38, 0.35)',
          text: '#991b1b'
        };
  }

  return dark
    ? {
        background: 'rgba(79, 70, 229, 0.25)',
        border: 'rgba(129, 140, 248, 0.65)',
        text: '#e0e7ff'
      }
    : {
        background: 'rgba(99, 102, 241, 0.16)',
        border: 'rgba(79, 70, 229, 0.42)',
        text: '#1e1b4b'
      };
}

function buildEventContent(arg) {
  const { reservationId, customerName, paid, confirmed, completed } = arg.event.extendedProps;
  const isPaid = paid === true || paid === 'paid';
  const isConfirmed = confirmed === true || confirmed === 'true';
  const wrapper = document.createElement('div');
  wrapper.className = 'fc-reservation-event flex flex-col gap-2 text-xs leading-5 text-base-content';
  const confirmedLabel = isConfirmed
    ? t('calendar.badges.confirmed', 'مؤكد')
    : t('calendar.badges.pending', 'غير مؤكد');
  const paidLabel = isPaid
    ? t('calendar.badges.paid', 'مدفوع')
    : t('calendar.badges.unpaid', 'غير مدفوع');
  const completedLabel = t('calendar.badges.completed', 'منتهي');
  const unknownCustomer = t('calendar.labels.unknownCustomer', 'غير معروف');
  const chips = [
    `<span class="reservation-chip ${isConfirmed ? 'status-confirmed' : 'status-pending'}">${escapeHtml(confirmedLabel)}</span>`,
    `<span class="reservation-chip ${isPaid ? 'status-paid' : 'status-unpaid'}">${escapeHtml(paidLabel)}</span>`
  ];
  if (completed) {
    chips.push(`<span class="reservation-chip status-completed">${escapeHtml(completedLabel)}</span>`);
  }

  const safeReservationId = escapeHtml(reservationId || '—');
  const safeCustomer = escapeHtml(customerName || unknownCustomer);

  wrapper.innerHTML = `
    <div class="fc-reservation-id text-[0.78rem] font-semibold">${safeReservationId}</div>
    <div class="fc-reservation-customer text-[0.72rem] text-base-content/70">${safeCustomer}</div>
    <div class="fc-reservation-tags flex flex-wrap items-center gap-2 pt-1">${chips.join('')}</div>
  `;
  return { domNodes: [wrapper] };
}


function showReservationModal(reservation) {
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

  const baseReservation = reservation?.raw && typeof reservation.raw === 'object'
    ? { ...reservation.raw, ...reservation }
    : { ...reservation };

  const identifierCandidates = [
    baseReservation.id,
    baseReservation.reservationId,
    baseReservation.reservation_id,
    baseReservation.reservationCode,
    baseReservation.reservation_code
  ]
    .map((value) => (value == null ? '' : String(value)))
    .filter((value) => value.length > 0);

  let matchedIndex = -1;
  let storedReservation = null;

  if (identifierCandidates.length > 0) {
    matchedIndex = storedReservations.findIndex((entry) => {
      const entryIds = [
        entry?.id,
        entry?.reservationId,
        entry?.reservation_id,
        entry?.reservationCode,
        entry?.reservation_code
      ]
        .map((value) => (value == null ? '' : String(value)))
        .filter((value) => value.length > 0);

      if (entryIds.length === 0) return false;
      return entryIds.some((value) => identifierCandidates.includes(value));
    });

    if (matchedIndex >= 0) {
      storedReservation = storedReservations[matchedIndex];
    }
  }

  const mergedReservation = storedReservation
    ? { ...storedReservation, ...baseReservation }
    : baseReservation;

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

  container.innerHTML = detailsHtml;
  container.classList.add('calendar-reservation-details');

  const actionsSection = container.querySelector('.reservation-modal-actions');
  actionsSection?.remove();

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
