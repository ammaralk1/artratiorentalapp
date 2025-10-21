import { setupReservationFilters } from '../reservationsFilters.js';
import {
  initTechnicianSelection,
  reconcileTechnicianSelections
} from '../reservationsTechnicians.js';
import {
  initCreateReservationForm,
  refreshCreateReservationForm,
  renderDraftReservationSummary
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
    onDraftChange: renderDraftReservationSummary,
    onEditChange: updateEditReservationSummary
  });

  loadReservationForm();
  setupEquipmentDescriptionInputs();
  reservationEventsInitialized = true;
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

export async function initializeReservationUI() {
  await ensureReservationsLoaded();
  try {
    await ensureProjectsLoaded({ force: true });
  } catch (error) {
    console.warn('⚠️ [reservations/events] Failed to pre-load projects for reservation form', error);
  }
  renderReservations();
  registerReservationGlobals();
  initCreateReservationForm({ onAfterSubmit: handleReservationsMutation });
  if (!reservationEventsInitialized) {
    setupReservationEvents();
  }
  initializeReservationPickers();
  setupTechniciansUpdatedListener();
}
export { initializeReservationPickers };
