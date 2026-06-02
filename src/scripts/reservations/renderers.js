import { loadData } from '../storage.js';
import { toInternalReservation, reservationPackagesNeedHydration, fetchReservationWithDetails } from '../reservationsService.js';
import { syncTechniciansStatuses } from '../technicians.js';
import { t } from '../language.js';
import { showToast } from '../utils.js';
import { getReservationFilters } from '../reservationsFilters.js';
import {
  filterReservationEntries,
  buildReservationTilesHtml,
  resolveReservationLifecycleGroup,
  buildReservationDetailsHtml
} from './list/index.js';
import { exportReservationPdf, exportReservationChecklistPdf } from './reservationPdf.js';
import { ensureTechnicianPositionsLoaded } from '../technicianPositions.js';
import mountReservationModalsIfNeeded from './modals.js';

const PAGE_SIZE = 8;
const PAGINATION_HOST_ID = 'reservations-list-pagination';
const SECTION_PAGINATION_STATE = new Map();

function isMobileReservationsLayout() {
  return typeof window !== 'undefined'
    && typeof window.matchMedia === 'function'
    && window.matchMedia('(max-width: 640px)').matches;
}

function updateReservationsListCount({ filteredCount = 0, totalCount = 0 } = {}) {
  const countEl = document.getElementById('reservations-list-count');
  if (!countEl) return;

  const hasActiveFilters = filteredCount !== totalCount;
  const template = hasActiveFilters
    ? t('reservations.list.filteredCount', '{count} من {total} حجوزات')
    : t('reservations.list.count', '{count} حجوزات');

  countEl.textContent = template
    .replace('{count}', String(filteredCount))
    .replace('{total}', String(totalCount));
}

function renderLinkedRecordsEmptyCopy(message) {
  return `<p class="linked-records-empty-copy">${message}</p>`;
}

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

function getSectionPaginationState(sectionKey) {
  const current = SECTION_PAGINATION_STATE.get(sectionKey) || { page: 1 };
  const normalized = {
    page: Number.isFinite(current.page) && current.page > 0 ? current.page : 1,
  };
  SECTION_PAGINATION_STATE.set(sectionKey, normalized);
  return normalized;
}

function clearReservationsPaginationHost(paginationHost) {
  if (!paginationHost) return;
  paginationHost.hidden = true;
  paginationHost.innerHTML = '';
}

function renderReservationSectionHtml(section, { customersMap, techniciansMap, projectsMap }) {
  return `
    <section class="project-focus-group project-focus-group--${section.key}">
      <header class="project-focus-group__header">
        <div class="project-focus-group__title-wrap">
          <div class="project-focus-group__title-row">
            <h6 class="project-focus-group__title">${section.title}</h6>
            <span class="ui-badge ui-badge--soft badge-soft project-focus-group__count project-focus-group__count--inline">${String(section.totalItems)}</span>
          </div>
          <p class="project-focus-group__hint">${section.hint}</p>
        </div>
      </header>
      ${
        section.pageEntries.length
          ? `<div class="project-card-grid reservations-grid reservations-grid--benchmark">${buildReservationTilesHtml({
              entries: section.pageEntries,
              customersMap,
              techniciansMap,
              projectsMap
            })}</div>`
          : `<p class="linked-records-empty-copy project-card-grid__item project-card-grid__item--full project-card-grid__empty-line project-focus-group__empty">${section.empty}</p>`
      }
      ${buildSectionPaginationHtml({
        sectionKey: section.key,
        currentPage: section.currentPage,
        totalPages: section.totalPages,
        totalItems: section.totalItems,
        pageSize: PAGE_SIZE,
      })}
    </section>
  `;
}

function buildGroupedReservationSections(entries) {
  const groups = {
    live: [],
    archive: [],
  };

  entries.forEach((entry) => {
    const lifecycle = resolveReservationLifecycleGroup(entry.reservation);
    groups[lifecycle.group].push(entry);
  });

  return [
    {
      key: 'live',
      title: t('reservations.list.sections.liveTitle', '⚡ الحجوزات النشطة'),
      hint: t('reservations.list.sections.liveHint', 'يعرض الحجوزات المفتوحة والجارية لتبدأ بما يحتاج متابعة الآن.'),
      empty: t('reservations.list.sections.emptyLive', 'لا توجد حجوزات نشطة ضمن النتائج الحالية.'),
      entries: groups.live,
    },
    {
      key: 'archive',
      title: t('reservations.list.sections.archiveTitle', '🗂️ الأرشيف'),
      hint: t('reservations.list.sections.archiveHint', 'يعرض الحجوزات المغلقة والملغاة بشكل منفصل للرجوع الهادئ.'),
      empty: t('reservations.list.sections.emptyArchive', 'لا توجد حجوزات مغلقة أو ملغاة ضمن النتائج الحالية.'),
      entries: groups.archive,
    },
  ];
}

function buildRenderableReservationSections(entries, { filtersChanged = false } = {}) {
  const mobileLayout = isMobileReservationsLayout();
  return buildGroupedReservationSections(entries).map((section) => {
    const pagination = getSectionPaginationState(section.key);
    if (filtersChanged) {
      pagination.page = 1;
    }
    const totalItems = section.entries.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
    const currentPage = clampPage(pagination.page, totalPages);
    pagination.page = currentPage;
    const start = mobileLayout ? 0 : (currentPage - 1) * PAGE_SIZE;
    const end = mobileLayout ? currentPage * PAGE_SIZE : start + PAGE_SIZE;
    const pageEntries = section.entries.slice(start, end);

    return {
      ...section,
      totalItems,
      totalPages,
      currentPage,
      pageEntries,
    };
  });
}

function buildSectionPaginationHtml({ sectionKey, currentPage, totalPages, totalItems, pageSize }) {
  if (totalPages <= 1) return '';

  const prevLabel = t('reservations.list.pagination.prev', 'السابق');
  const nextLabel = t('reservations.list.pagination.next', 'التالي');
  const pageLabelTemplate = t('reservations.list.pagination.page', 'صفحة {page}');
  const rangeTemplate = t('reservations.list.pagination.range', '{from}-{to} من {total}');
  const rangeStart = totalItems === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const rangeEnd = totalItems === 0 ? 0 : Math.min(totalItems, currentPage * pageSize);
  const rangeText = rangeTemplate
    .replace('{from}', String(rangeStart))
    .replace('{to}', String(rangeEnd))
    .replace('{total}', String(totalItems));
  const navLabel = t('reservations.list.pagination.nav', 'صفحات الحجوزات');
  const rawLoadMoreLabel = t('reservations.list.pagination.loadMore', 'تحميل المزيد');
  const loadMoreLabel = rawLoadMoreLabel && rawLoadMoreLabel.trim()
    ? rawLoadMoreLabel
    : 'تحميل المزيد';

  const pageButtons = resolvePageNumbers(currentPage, totalPages).map((page) => {
    const label = pageLabelTemplate.replace('{page}', String(page));
    const isActive = page === currentPage;
    const className = isActive
      ? 'ui-button ui-button--primary btn btn-primary btn-sm'
      : 'ui-button ui-button--outline btn btn-outline-primary btn-sm';
    return `<button type="button" class="${className}" data-reservation-section="${sectionKey}" data-reservation-section-page="${page}" aria-label="${label}" ${isActive ? 'aria-current="page"' : ''}>${page}</button>`;
  }).join('');

  return `
    <div class="list-pagination project-focus-group__pagination" data-reservation-section-pagination="${sectionKey}">
      <div class="list-pagination__summary text-muted small">${rangeText}</div>
      <div class="list-pagination__controls btn-group" role="group" aria-label="${navLabel}">
        <button type="button" class="ui-button ui-button--outline btn btn-outline-primary btn-sm" data-reservation-section="${sectionKey}" data-reservation-section-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''} aria-label="${prevLabel}">‹</button>
        ${pageButtons}
        <button type="button" class="ui-button ui-button--outline btn btn-outline-primary btn-sm" data-reservation-section="${sectionKey}" data-reservation-section-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="${nextLabel}">›</button>
      </div>
      ${currentPage < totalPages
        ? `<button type="button" class="ui-button ui-button--outline btn btn-outline-primary btn-sm reservations-mobile-load-more" data-reservation-section="${sectionKey}" data-reservation-section-page="${currentPage + 1}">${loadMoreLabel}</button>`
        : ''}
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
  const archiveContainer = document.getElementById('reservations-archive-list');
  const paginationHost = document.getElementById(PAGINATION_HOST_ID);
  if (!container) {
    console.warn('⚠️ [reservations/renderers] container not found', containerId);
    return;
  }

  if (!reservations || reservations.length === 0) {
    updateReservationsListCount({ filteredCount: 0, totalCount: 0 });
    container.innerHTML = renderLinkedRecordsEmptyCopy(
      t('reservations.list.empty', '⚠️ لا توجد حجوزات بعد.')
    );
    if (archiveContainer) archiveContainer.innerHTML = '';
    clearReservationsPaginationHost(paginationHost);
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
    updateReservationsListCount({ filteredCount: 0, totalCount: normalizedReservations.length });
    container.innerHTML = renderLinkedRecordsEmptyCopy(
      t('reservations.list.noResults', '🔍 لا توجد حجوزات مطابقة للبحث.')
    );
    if (archiveContainer) archiveContainer.innerHTML = '';
    clearReservationsPaginationHost(paginationHost);
    container.dataset.reservationsPage = '1';
    container.dataset.reservationsFilters = fingerprintFilters(activeFilters);
    return;
  }

  const filtersFingerprint = fingerprintFilters(activeFilters);
  const storedFingerprint = container.dataset.reservationsFilters || '';
  const filtersChanged = storedFingerprint !== filtersFingerprint;
  container.dataset.reservationsFilters = filtersFingerprint;

  const bindTileActions = () => {
    const actionRoots = [container, archiveContainer].filter(Boolean);
    actionRoots.forEach((root) => root.querySelectorAll('[data-action="details"]').forEach((tile) => {
      const index = Number(tile.dataset.reservationIndex);
      const reservationId = tile.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      tile.addEventListener('click', () => {
        if (typeof onShowDetails === 'function') {
          onShowDetails(index, reservationId);
        }
      });
    }));

    actionRoots.forEach((root) => root.querySelectorAll('button[data-action="confirm"]').forEach((btn) => {
      const index = Number(btn.dataset.reservationIndex);
      const reservationId = btn.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof onConfirmReservation === 'function') {
          onConfirmReservation(index, event, reservationId);
        }
      });
    }));

    actionRoots.forEach((root) => root.querySelectorAll('button[data-action="close"]').forEach((btn) => {
      const index = Number(btn.dataset.reservationIndex);
      const reservationId = btn.dataset.reservationId || null;
      if (Number.isNaN(index)) return;
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        if (typeof onCloseReservation === 'function') {
          onCloseReservation(index, event, reservationId);
        }
      });
    }));
  };

  const bindPaginationActions = () => {
    const actionRoots = [container, archiveContainer].filter(Boolean);
    const navButtons = actionRoots.flatMap((root) => Array.from(root.querySelectorAll('[data-reservation-section-page]')));
    navButtons.forEach((btn) => {
      const sectionKey = btn.dataset.reservationSection;
      const target = Number.parseInt(btn.dataset.reservationSectionPage, 10);
      if (!Number.isFinite(target)) return;
      if (!sectionKey) return;
      btn.addEventListener('click', (event) => {
        if (btn.disabled) return;
        event.preventDefault();
        event.stopPropagation();
        const pagination = getSectionPaginationState(sectionKey);
        pagination.page = target;
        renderSections();
      });
    });
  };

  const renderSections = () => {
    updateReservationsListCount({
      filteredCount: filteredEntries.length,
      totalCount: normalizedReservations.length,
    });

    const sections = buildRenderableReservationSections(filteredEntries, { filtersChanged });

    if (archiveContainer) {
      const [liveSection, archiveSection] = sections;
      container.innerHTML = `<div class="project-focus-groups reservations-focus-groups reservations-focus-groups--live">${renderReservationSectionHtml(liveSection, {
        customersMap,
        techniciansMap,
        projectsMap,
      })}</div>`;
      const archiveCount = document.getElementById('reservations-archive-count');
      if (archiveCount) archiveCount.textContent = String(archiveSection.totalItems);
      archiveContainer.innerHTML = `<div class="project-focus-groups reservations-focus-groups reservations-focus-groups--archive">${renderReservationSectionHtml(archiveSection, {
        customersMap,
        techniciansMap,
        projectsMap,
      })}</div>`;
    } else {
      container.innerHTML = `<div class="project-focus-groups reservations-focus-groups">${sections.map((section) => renderReservationSectionHtml(section, {
        customersMap,
        techniciansMap,
        projectsMap,
      })).join('')}</div>`;
    }

    clearReservationsPaginationHost(paginationHost);
    bindTileActions();
    bindPaginationActions();
  };

  renderSections();

  // Reopen is handled only inside the edit modal; no button on tiles.
}

export function renderReservationDetails(index, {
  onEdit,
  onDelete,
  getEditContext
} = {}) {
  mountReservationModalsIfNeeded();
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
    document.body.classList.add('reservation-modal-open');
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  return true;
}
