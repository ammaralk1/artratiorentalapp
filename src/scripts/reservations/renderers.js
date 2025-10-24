import { loadData } from '../storage.js';
import { toInternalReservation } from '../reservationsService.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { showToast } from '../utils.js';
import { getReservationFilters } from '../reservationsFilters.js';
import {
  filterReservationEntries,
  buildReservationTilesHtml,
  buildReservationDetailsHtml
} from './list/index.js';
import { exportReservationPdf } from './reservationPdf.js';
import { ensureTechnicianPositionsLoaded } from '../technicianPositions.js';

export function renderReservationsList({
  containerId = 'reservations-list',
  filters = null,
  onShowDetails,
  onConfirmReservation
} = {}) {
  const syncedTechnicians = syncTechniciansStatuses();
  const { reservations: rawReservations = [], customers = [], technicians: storedTechnicians = [], projects = [] } = loadData();
  const normalizedReservations = rawReservations.map((reservation) => {
    const normalized = toInternalReservation(reservation);
    return {
      ...normalized,
      id: reservation.id ?? normalized.id,
      reservationId: reservation.reservationId ?? reservation.reservation_id ?? normalized.reservationId,
      reservationCode: reservation.reservationCode ?? reservation.reservation_code ?? normalized.reservationCode,
    };
  });
  const reservations = normalizedReservations;
  const technicians = Array.isArray(syncedTechnicians) ? syncedTechnicians : (storedTechnicians || []);
  const projectsMap = new Map((projects || []).map((project) => [String(project.id), project]));

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
    reservations: normalizedReservations,
    filters: activeFilters,
    customersMap,
    techniciansMap,
    projectsMap
  });

  if (filteredEntries.length === 0) {
    container.innerHTML = `<p>${t('reservations.list.noResults', '🔍 لا توجد حجوزات مطابقة للبحث.')}</p>`;
    return;
  }

  container.innerHTML = `<div class="reservations-grid">${buildReservationTilesHtml({
    entries: filteredEntries,
    customersMap,
    techniciansMap,
    projectsMap
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
  const { reservations: rawReservations = [], customers = [], projects = [] } = loadData();
  const normalizedReservations = rawReservations.map((reservation) => {
    const normalized = toInternalReservation(reservation);
    return {
      ...normalized,
      id: reservation.id ?? normalized.id,
      reservationId: reservation.reservationId ?? reservation.reservation_id ?? normalized.reservationId,
      reservationCode: reservation.reservationCode ?? reservation.reservation_code ?? normalized.reservationCode,
    };
  });
  const reservation = rawReservations[index];
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const normalizedReservation = normalizedReservations[index] ?? toInternalReservation(reservation);

  const customer = customers.find((c) => String(c.id) === String(reservation.customerId));
  const project = reservation.projectId ? projects.find((p) => String(p.id) === String(reservation.projectId)) : null;
  const body = document.getElementById('reservation-details-body');
  if (body) {
    // Initial synchronous render using current cache
    const techniciansList = syncTechniciansStatuses() || [];
    body.innerHTML = buildReservationDetailsHtml(normalizedReservation, customer, techniciansList, index, project);

    // Try to refresh positions cache asynchronously, then re-render for accurate labels
    ensureTechnicianPositionsLoaded()
      .then(() => {
        const refreshedTechs = syncTechniciansStatuses() || [];
        body.innerHTML = buildReservationDetailsHtml(normalizedReservation, customer, refreshedTechs, index, project);
      })
      .catch(() => {
        /* non-fatal */
      });
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

  const openProjectBtn = body?.querySelector('[data-action="open-project"]');
  if (openProjectBtn && project) {
    openProjectBtn.addEventListener('click', () => {
      closeModal();
      const projectId = project?.id != null ? String(project.id) : '';
      const target = projectId ? `projects.html?project=${encodeURIComponent(projectId)}` : 'projects.html';
      window.location.href = target;
    });
  }

  const exportBtn = document.getElementById('reservation-details-export-btn');
  if (exportBtn) {
    exportBtn.onclick = async (event) => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      exportBtn.blur();
      try {
        await exportReservationPdf({ reservation, customer, project });
      } catch (error) {
        console.error('❌ [reservations] export to PDF failed', error);
        showToast(t('reservations.details.actions.exportFailed', '⚠️ تعذر تصدير الحجز إلى PDF'), 'error');
      }
    };
  }

  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  return true;
}
