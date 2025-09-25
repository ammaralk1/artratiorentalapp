import { loadData } from '../storage.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { showToast } from '../utils.js';
import { getReservationFilters } from '../reservationsFilters.js';
import {
  filterReservationEntries,
  buildReservationTilesHtml,
  buildReservationDetailsHtml
} from './list/index.js';

export function renderReservationsList({
  containerId = 'reservations-list',
  filters = null,
  onShowDetails,
  onConfirmReservation
} = {}) {
  const syncedTechnicians = syncTechniciansStatuses();
  const { reservations = [], customers = [], technicians: storedTechnicians = [] } = loadData();
  const technicians = Array.isArray(syncedTechnicians) ? syncedTechnicians : (storedTechnicians || []);

  const container = document.getElementById(containerId);
  if (!container) {
    console.warn('⚠️ [reservations/renderers] container not found', containerId);
    return;
  }

  if (!reservations || reservations.length === 0) {
    container.innerHTML = `<p>${t('reservations.list.empty', '⚠️ لا توجد حجوزات بعد.')}</p>`;
    return;
  }

  const activeFilters = filters || getReservationFilters();
  const customersMap = new Map(customers.map((c) => [String(c.id), c]));
  const techniciansMap = new Map(technicians.map((tech) => [String(tech.id), tech]));

  const filteredEntries = filterReservationEntries({
    reservations,
    filters: activeFilters,
    customersMap,
    techniciansMap
  });

  if (filteredEntries.length === 0) {
    container.innerHTML = `<p>${t('reservations.list.noResults', '🔍 لا توجد حجوزات مطابقة للبحث.')}</p>`;
    return;
  }

  container.innerHTML = `<div class="reservations-grid">${buildReservationTilesHtml({
    entries: filteredEntries,
    customersMap,
    techniciansMap
  })}</div>`;

  container.querySelectorAll('[data-action="details"]').forEach((tile) => {
    const index = Number(tile.dataset.reservationIndex);
    if (Number.isNaN(index)) return;
    tile.addEventListener('click', () => {
      if (typeof onShowDetails === 'function') {
        onShowDetails(index);
      }
    });
  });

  container.querySelectorAll('button[data-action="confirm"]').forEach((btn) => {
    const index = Number(btn.dataset.reservationIndex);
    if (Number.isNaN(index)) return;
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (typeof onConfirmReservation === 'function') {
        onConfirmReservation(index, event);
      }
    });
  });
}

export function renderReservationDetails(index, {
  onEdit,
  onDelete,
  getEditContext
} = {}) {
  const { reservations = [], customers = [] } = loadData();
  const reservation = reservations[index];
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const customer = customers.find((c) => String(c.id) === String(reservation.customerId));
  const body = document.getElementById('reservation-details-body');
  if (body) {
    const techniciansList = syncTechniciansStatuses() || [];
    body.innerHTML = buildReservationDetailsHtml(reservation, customer, techniciansList, index);
  }

  const modalEl = document.getElementById('reservationDetailsModal');
  const closeModal = () => {
    if (modalEl && window.bootstrap?.Modal) {
      window.bootstrap.Modal.getInstance(modalEl)?.hide();
    }
  };

  const editBtn = document.getElementById('reservation-details-edit-btn');
  if (editBtn) {
    editBtn.onclick = () => {
      closeModal();
      if (typeof onEdit === 'function') {
        onEdit(index, {
          reservation,
          customer,
          getEditContext
        });
      }
    };
  }

  const deleteBtn = document.getElementById('reservation-details-delete-btn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      closeModal();
      if (typeof onDelete === 'function') {
        onDelete(index, { reservation, customer });
      }
    };
  }

  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  return true;
}
