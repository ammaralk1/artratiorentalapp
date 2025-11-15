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
import { exportReservationPdf, exportReservationChecklistPdf } from './reservationPdf.js';
import { ensureTechnicianPositionsLoaded } from '../technicianPositions.js';

export function renderReservationsList({
  containerId = 'reservations-list',
  filters = null,
  onShowDetails,
  onConfirmReservation,
  onCloseReservation,
  onReopenReservation
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

  container.querySelectorAll('button[data-action="close"]').forEach((btn) => {
    const index = Number(btn.dataset.reservationIndex);
    if (Number.isNaN(index)) return;
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (typeof onCloseReservation === 'function') {
        onCloseReservation(index, event);
      }
    });
  });

  container.querySelectorAll('button[data-action="reopen"]').forEach((btn) => {
    const index = Number(btn.dataset.reservationIndex);
    if (Number.isNaN(index)) return;
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (typeof onReopenReservation === 'function') {
        onReopenReservation(index, event);
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
  const modalEl = document.getElementById('reservationDetailsModal');

  const bindDetailsActions = () => {
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

    const checklistBtn = document.getElementById('reservation-details-checklist-btn');
    if (checklistBtn) {
      checklistBtn.onclick = async (event) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        checklistBtn.blur();
        try {
          await exportReservationChecklistPdf({ reservation, customer, project });
        } catch (error) {
          console.error('❌ [reservations] export checklist PDF failed', error);
          showToast(t('reservations.details.actions.exportFailed', '⚠️ تعذر تصدير الحجز إلى PDF'), 'error');
        }
      };
    }

    // Initialize crew slider controls if present
    try {
      const slider = body?.querySelector('[data-tech-slider]');
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
          prev?.addEventListener('click', () => scrollByStep(-1));
          next?.addEventListener('click', () => scrollByStep(1));
          track.addEventListener('scroll', updateButtons, { passive: true });
          window.addEventListener('resize', updateButtons, { passive: true });
          // Initial state after layout
          setTimeout(updateButtons, 0);
        }
      }
    } catch (_e) {
      // Non-fatal: slider is optional
    }
  };

  if (body) {
    // Initial synchronous render using current cache
    const techniciansList = syncTechniciansStatuses() || [];
    body.innerHTML = buildReservationDetailsHtml(normalizedReservation, customer, techniciansList, index, project);
    bindDetailsActions();

    // Try to refresh positions cache asynchronously, then re-render for accurate labels
    ensureTechnicianPositionsLoaded()
      .then(() => {
        const refreshedTechs = syncTechniciansStatuses() || [];
        body.innerHTML = buildReservationDetailsHtml(normalizedReservation, customer, refreshedTechs, index, project);
        bindDetailsActions();
      })
      .catch(() => {
        /* non-fatal */
      });
  }


  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  return true;
}
