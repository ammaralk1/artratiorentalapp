import { setupReservationFilters } from '../reservationsFilters.js';
import {
  initTechnicianSelection,
  reconcileTechnicianSelections
} from '../reservationsTechnicians.js';
import {
  initCreateReservationForm,
  refreshCreateReservationForm,
  renderDraftReservationSummary,
  persistCreateReservationDraft
} from './createForm.js';
import {
  setupEditReservationModalEvents
} from '../reservationsEdit.js';
import {
  loadReservationForm,
  handleReservationsMutation,
  renderReservations,
  getReservationsEditContext,
  registerReservationGlobals
} from './controller.js';
import {
  setupEquipmentDescriptionInputs
} from './formUtils.js';
import { updateEditReservationSummary } from './editForm.js';
import { loadData } from '../storage.js';
import { ensureReservationsLoaded } from '../reservationsActions.js';
import { ensureProjectsLoaded } from '../projectsService.js';
import { t } from '../language.js';

let reservationEventsInitialized = false;

function enhanceTimeInputs() {
  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach((input) => {
    input.setAttribute('step', '300');
  });
}

function getFlatpickrInstance() {
  if (typeof window !== 'undefined' && typeof window.flatpickr === 'function') {
    return window.flatpickr.bind(window);
  }
  if (typeof globalThis !== 'undefined' && typeof globalThis.flatpickr === 'function') {
    return globalThis.flatpickr.bind(globalThis);
  }
  console.warn('⚠️ Flatpickr غير متاح - سيتم تخطي تهيئة عناصر التاريخ');
  return null;
}

function initializeReservationPickers() {
  const fp = getFlatpickrInstance();

  const baseDateConfig = {
    dateFormat: 'Y-m-d',
    altInput: true,
    altFormat: 'Y-m-d',
    allowInput: true,
    disableMobile: true,
    altInputClass: 'flatpickr-alt-input form-control'
  };

  const datePickers = [
    ['#res-start', {}],
    ['#res-end', {}],
    ['#filter-start-date', {}],
    ['#filter-end-date', {}],
    ['#edit-res-start', {}],
    ['#edit-res-end', {}]
  ];

  const baseTimeConfig = {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    altInput: true,
    altFormat: 'h:i K',
    time_24hr: false,
    defaultHour: 9,
    defaultMinute: 0,
    disableMobile: true,
    minuteIncrement: 5,
    altInputClass: 'flatpickr-alt-input form-control'
  };

  const timePickers = ['#res-start-time', '#res-end-time', '#edit-res-start-time', '#edit-res-end-time'];

  if (fp) {
    datePickers.forEach(([selector, config]) => {
      if (document.querySelector(selector)) {
        fp(selector, { ...baseDateConfig, ...config });
      }
    });

    timePickers.forEach((selector) => {
      if (document.querySelector(selector)) {
        fp(selector, { ...baseTimeConfig });
      }
    });
  }

  const startTimeInput = document.querySelector('#res-start-time');
  if (startTimeInput) {
    startTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

export function setupReservationEvents() {
  if (reservationEventsInitialized) {
    return;
  }
  enhanceTimeInputs();
  setupReservationFilters(() => renderReservations());
  setupEditReservationModalEvents(getReservationsEditContext());

  initTechnicianSelection({
    onDraftChange: () => {
      renderDraftReservationSummary();
      try { persistCreateReservationDraft(); } catch (_) { /* ignore persist errors */ }
    },
    onEditChange: updateEditReservationSummary
  });

  loadReservationForm();
  setupEquipmentDescriptionInputs();
  reservationEventsInitialized = true;

  // Re-render list as soon as reservations state updates (fixes empty view after login until hard refresh)
  try {
    const rerender = () => renderReservations();
    document.addEventListener('reservations:updated', rerender);
    window.addEventListener('reservations:updated', rerender);
  } catch (_) { /* ignore */ }
}

function setupTechniciansUpdatedListener() {
  const body = document.body;
  if (!body) return;
  if (body.dataset.reservationsTechListener === 'true') return;
  document.addEventListener('technicians:updated', () => {
    const { technicians = [] } = loadData();
    reconcileTechnicianSelections(technicians);
    refreshCreateReservationForm();
    updateEditReservationSummary();
  });
  body.dataset.reservationsTechListener = 'true';
}

function hasCachedReservations() {
  try {
    const { reservations = [] } = loadData();
    return Array.isArray(reservations) && reservations.length > 0;
  } catch (_) {
    return false;
  }
}

function showReservationsInlineLoader() {
  const container = document.getElementById('reservations-list');
  if (!container) return;
  if (container.querySelector('[data-reservations-loader]')) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'reservations-inline-loader';
  wrapper.setAttribute('data-reservations-loader', 'true');
  wrapper.setAttribute('aria-live', 'polite');

  const text = t('reservations.list.loading', 'جارٍ تحميل الحجوزات...');
  wrapper.innerHTML = `
    <div class="loading loading-spinner loading-lg text-primary" aria-hidden="true"></div>
    <p class="reservations-inline-loader__text">${text}</p>
  `;

  container.replaceChildren(wrapper);
}

function hideReservationsInlineLoader() {
  const container = document.getElementById('reservations-list');
  if (!container) return;
  const loader = container.querySelector('[data-reservations-loader]');
  if (loader) {
    loader.remove();
  }
}

export async function initializeReservationUI() {
  const cachedReservations = hasCachedReservations();
  if (cachedReservations) {
    try { renderReservations(); } catch (_) {}
  } else {
    showReservationsInlineLoader();
  }

  const [reservationsResult, projectsResult] = await Promise.allSettled([
    ensureReservationsLoaded(),
    ensureProjectsLoaded({ force: true }),
  ]);

  if (reservationsResult.status === 'rejected') {
    console.warn('⚠️ [reservations/events] Failed to load reservations from API', reservationsResult.reason);
  }
  if (projectsResult.status === 'rejected') {
    console.warn('⚠️ [reservations/events] Failed to pre-load projects for reservation form', projectsResult.reason);
  }

  hideReservationsInlineLoader();

  try {
    try {
      const actions = await import('../reservationsActions.js');
      await actions.autoCloseExpiredStandaloneReservations?.();
    } catch (error) {
      console.warn('⚠️ [reservations/events] auto-close standalone reservations skipped', error);
    }

    renderReservations();
  } catch (error) {
    console.error('❌ [reservations/events] Failed to render reservations after load', error);
  }
  registerReservationGlobals();
  initCreateReservationForm({ onAfterSubmit: handleReservationsMutation });
  if (!reservationEventsInitialized) {
    setupReservationEvents();
  }
  initializeReservationPickers();
  setupTechniciansUpdatedListener();
}
export { initializeReservationPickers };
