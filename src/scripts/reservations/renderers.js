import { loadData } from '../storage.js';
import { toInternalReservation, reservationPackagesNeedHydration, fetchReservationWithDetails } from '../reservationsService.js';
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

const PAGE_SIZE = 8;

function clampPage(value, totalPages) {
  const pageNumber = Number.parseInt(value, 10);
  if (!Number.isFinite(pageNumber) || pageNumber <= 0) return 1;
  return Math.min(pageNumber, Math.max(1, totalPages));
}

function fingerprintFilters(filters = {}) {
  const entries = Object.entries(filters || {})
    .map(([key, value]) => [key, value == null ? '' : String(value)])
    .sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify(entries);
}

function resolvePageNumbers(currentPage, totalPages) {
  const windowSize = 5;
  const halfWindow = Math.floor(windowSize / 2);
  let start = Math.max(1, currentPage - halfWindow);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }
  const pages = [];
  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }
  return pages;
}

function buildPaginationHtml({ currentPage, totalPages, totalItems }) {
  if (totalPages <= 1) return '';

  const prevLabel = t('reservations.list.pagination.prev', 'السابق');
  const nextLabel = t('reservations.list.pagination.next', 'التالي');
  const pageLabelTemplate = t('reservations.list.pagination.page', 'صفحة {page}');
  const rangeTemplate = t('reservations.list.pagination.range', '{from}-{to} من {total}');
  const rangeStart = ((currentPage - 1) * PAGE_SIZE) + 1;
  const rangeEnd = Math.min(totalItems, currentPage * PAGE_SIZE);
  const rangeText = rangeTemplate
    .replace('{from}', rangeStart)
    .replace('{to}', rangeEnd)
    .replace('{total}', totalItems);

  const pageButtons = resolvePageNumbers(currentPage, totalPages).map((page) => {
    const label = pageLabelTemplate.replace('{page}', page);
    const isActive = page === currentPage;
    const activeAttrs = isActive ? ' aria-current="page"' : '';
    const activeClass = isActive ? ' is-active' : '';
    return `<button type="button" class="reservation-page-btn${activeClass}" data-page="${page}" aria-label="${label}"${activeAttrs}>${page}</button>`;
  }).join('');

  return `
    <div class="reservations-pagination" data-total-pages="${totalPages}">
      <div class="reservations-pagination__controls">
        <button type="button" class="reservation-page-nav" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''} aria-label="${prevLabel}">‹</button>
        <div class="reservation-page-list">${pageButtons}</div>
        <button type="button" class="reservation-page-nav" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="${nextLabel}">›</button>
      </div>
      <div class="reservations-pagination__summary">${rangeText}</div>
    </div>
  `;
}

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
    container.dataset.reservationsPage = '1';
    container.dataset.reservationsFilters = fingerprintFilters(activeFilters);
    return;
  }

  const totalPages = Math.ceil(filteredEntries.length / PAGE_SIZE);
  const filtersFingerprint = fingerprintFilters(activeFilters);
  const storedFingerprint = container.dataset.reservationsFilters || '';
  const filtersChanged = storedFingerprint !== filtersFingerprint;
  const storedPage = clampPage(container.dataset.reservationsPage, totalPages);
  let currentPage = filtersChanged ? 1 : storedPage;
  container.dataset.reservationsFilters = filtersFingerprint;

  const bindTileActions = () => {
    container.querySelectorAll('[data-action="details"]').forEach((tile) => {
      const index = Number(tile.dataset.reservationIndex);
      const reservationId = tile.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      tile.addEventListener('click', () => {
        if (typeof onShowDetails === 'function') {
          onShowDetails(index, reservationId);
        }
      });
    });

    container.querySelectorAll('button[data-action="confirm"]').forEach((btn) => {
      const index = Number(btn.dataset.reservationIndex);
      const reservationId = btn.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof onConfirmReservation === 'function') {
          onConfirmReservation(index, event, reservationId);
        }
      });
    });

    container.querySelectorAll('button[data-action="close"]').forEach((btn) => {
      const index = Number(btn.dataset.reservationIndex);
      const reservationId = btn.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof onCloseReservation === 'function') {
          onCloseReservation(index, event, reservationId);
        }
      });
    });
  };

  const bindPaginationActions = () => {
    const navButtons = container.querySelectorAll('.reservations-pagination [data-page]');
    navButtons.forEach((btn) => {
      const target = Number.parseInt(btn.dataset.page, 10);
      if (!Number.isFinite(target)) return;
      btn.addEventListener('click', (event) => {
        if (btn.disabled) return;
        event.preventDefault();
        event.stopPropagation();
        renderPage(target);
      });
    });
  };

  const renderPage = (pageNumber) => {
    currentPage = clampPage(pageNumber, totalPages);
    container.dataset.reservationsPage = String(currentPage);
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageEntries = filteredEntries.slice(start, start + PAGE_SIZE);
    const tilesHtml = buildReservationTilesHtml({
      entries: pageEntries,
      customersMap,
      techniciansMap,
      projectsMap
    });
    const paginationHtml = buildPaginationHtml({
      currentPage,
      totalPages,
      totalItems: filteredEntries.length
    });

    container.innerHTML = `<div class="reservations-grid">${tilesHtml}</div>${paginationHtml}`;
    bindTileActions();
    bindPaginationActions();
  };

  renderPage(currentPage);

  // Reopen is handled only inside the edit modal; no button on tiles.
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

  let normalizedReservation = normalizedReservations[index] ?? toInternalReservation(reservation);

  const customer = customers.find((c) => String(c.id) === String(reservation.customerId));
  const project = reservation.projectId ? projects.find((p) => String(p.id) === String(reservation.projectId)) : null;
  const body = document.getElementById('reservation-details-body');
  const modalEl = document.getElementById('reservationDetailsModal');

  const renderBody = (reservationData, techniciansListOverride = null) => {
    if (body) {
      const techniciansList = techniciansListOverride ?? (syncTechniciansStatuses() || []);
      body.innerHTML = buildReservationDetailsHtml(reservationData, customer, techniciansList, index, project);
    }
  };

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
    renderBody(normalizedReservation);
    bindDetailsActions();

    ensureTechnicianPositionsLoaded()
      .then(() => {
        const refreshedTechs = syncTechniciansStatuses() || [];
        renderBody(normalizedReservation, refreshedTechs);
        bindDetailsActions();
      })
      .catch(() => {});
  }

  if (reservationPackagesNeedHydration(normalizedReservation)) {
    const identifier = normalizedReservation.id || normalizedReservation.reservationId || normalizedReservation.reservation_code;
    fetchReservationWithDetails(identifier)
      .then((fresh) => {
        if (!fresh) return;
        normalizedReservation = fresh;
        renderBody(normalizedReservation);
        bindDetailsActions();
      })
      .catch(() => {});
  }

  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  return true;
}
