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

let reservationEventsInitialized = false;

function enhanceTimeInputs() {
  const timeInputs = document.querySelectorAll('input[type="time"]');
  timeInputs.forEach((input) => {
    input.setAttribute('step', '3600');
    if (input.dataset.listenerAttached === 'true') return;
    input.addEventListener('change', () => {
      if (!input.value) return;
      const [hour] = input.value.split(':');
      input.value = `${hour.padStart(2, '0')}:00`;
    });
    input.dataset.listenerAttached = 'true';
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
  if (!fp) return;

  const datePickers = [
    ['#res-start', { dateFormat: 'Y-m-d' }],
    ['#res-end', { dateFormat: 'Y-m-d' }],
    ['#filter-start-date', { dateFormat: 'Y-m-d' }],
    ['#filter-end-date', { dateFormat: 'Y-m-d' }],
    ['#edit-res-start', { dateFormat: 'Y-m-d' }],
    ['#edit-res-end', { dateFormat: 'Y-m-d' }]
  ];

  const timePickers = [
    ['#res-start-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ['#res-end-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ['#edit-res-start-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }],
    ['#edit-res-end-time', {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0
    }]
  ];

  [...datePickers, ...timePickers].forEach(([selector, config]) => {
    if (document.querySelector(selector)) {
      fp(selector, config);
    }
  });

  const startTimeInput = document.querySelector('#res-start-time');
  if (startTimeInput) {
    startTimeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

export function setupReservationEvents() {
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
  renderReservations();
  registerReservationGlobals();
  initCreateReservationForm({ onAfterSubmit: handleReservationsMutation });
  if (!reservationEventsInitialized) {
    setupReservationEvents();
  }
  initializeReservationPickers();
  setupTechniciansUpdatedListener();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeReservationUI().catch((error) => {
      console.error('❌ [reservations/events] Failed to initialize reservations UI', error);
    });
  }, { once: true });
} else {
  initializeReservationUI().catch((error) => {
    console.error('❌ [reservations/events] Failed to initialize reservations UI', error);
  });
}

export { initializeReservationPickers };
