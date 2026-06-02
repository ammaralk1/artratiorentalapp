import { userCanManageDestructiveActions } from '../auth.js';
import { t } from '../language.js';
import { normalizeNumbers } from '../utils.js';
import {
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus
} from '../reservationsSummary.js';
import { state, dom } from './state.js';
import { resolveReservationProjectState, buildReservationDisplayGroups, isReservationCompleted } from '../reservationsShared.js';
import {
  FOCUS_CARDS_PER_PAGE,
  ONE_HOUR_IN_MS,
  PROJECT_TAX_RATE
} from './constants.js';
import {
  escapeHtml,
  formatCurrency,
  formatDateTime,
  getEmptyText,
  setTableCount
} from './formatting.js';
import { computeProjectsRevenueBreakdown } from '../projectsReports/breakdown';
import {
  buildProjectsPageWindow,
  combineProjectDateTime,
  getProjectCreatedTimestamp,
  getProjectStartTimestamp,
  resolveProjectOverheadSettings,
  truncateText
} from './helpers.js';
import { applyProjectItemOverhead, calculateProjectLineFinancials } from './financials.js';
import { jumpPaginationSectionToStart, settlePaginationSectionToStart } from '../ui/paginationViewport.js';

const PROJECTS_TABLE_CHUNK_SIZE = 30;
const TIMELINE_RENDER_LIMIT = 200;

let projectsRenderToken = 0;

function ensureTablePagination() {
  if (!state.tablePagination) {
    state.tablePagination = { page: 1, pageSize: FOCUS_CARDS_PER_PAGE, totalPages: 1 };
  }
  if (!state.tablePagination.pageSize || state.tablePagination.pageSize <= 0) {
    state.tablePagination.pageSize = FOCUS_CARDS_PER_PAGE;
  }
  return state.tablePagination;
}

function ensureFocusSectionPagination(sectionKey) {
  if (!state.focusSectionPagination) {
    state.focusSectionPagination = {};
  }
  if (!state.focusSectionPagination[sectionKey]) {
    state.focusSectionPagination[sectionKey] = {
      page: 1,
      pageSize: FOCUS_CARDS_PER_PAGE,
      totalPages: 1,
    };
  }
  if (!state.focusSectionPagination[sectionKey].pageSize || state.focusSectionPagination[sectionKey].pageSize <= 0) {
    state.focusSectionPagination[sectionKey].pageSize = FOCUS_CARDS_PER_PAGE;
  }
  return state.focusSectionPagination[sectionKey];
}

function getProjectTypeLabel(type) {
  const normalizedType = String(type || '').trim().toLowerCase();
  if (!normalizedType) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social',
    event: 'projects.form.types.event',
    conference: 'projects.form.types.conference',
  }[normalizedType] || 'projects.form.types.unknown';
  return t(key, type);
}

function getProjectTypeClass(type) {
  const normalizedType = String(type || '').trim().toLowerCase();
  return ['commercial', 'coverage', 'photography', 'social', 'event', 'conference'].includes(normalizedType)
    ? normalizedType
    : 'default';
}

function normalizeProjectText(value) {
  return normalizeNumbers(String(value || '')).toLowerCase().trim();
}

function stripReservationTagDecorators(value) {
  return String(value || '')
    .replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\uFE0F\u200D#*0-9]+\s*/gu, '')
    .trim();
}

function hasProjectFilters() {
  const filters = state.filters || {};
  return Boolean(
    (filters.search || '').trim()
    || filters.status
    || filters.payment
    || filters.type
    || filters.confirmed
    || filters.startDate
    || filters.endDate
  );
}

function parseFilterDate(value, endOfDay = false) {
  if (!value) return null;
  const date = new Date(`${value}T${endOfDay ? '23:59:59' : '00:00:00'}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function getProjectPaymentStatus(project) {
  try {
    const reservationsForProject = getReservationsForProject(project.id);
    const baseTotals = resolveProjectTotals(project) || {};
    const projectTaxableBase = Number(baseTotals.subtotal || 0);
    const combinedReservationsTotal = (reservationsForProject || []).reduce((sum, res) => sum + (Number(res?.totalAmount) || resolveReservationNetTotal(res) || 0), 0);
    const combinedTax = baseTotals.applyTax
      ? Number(((projectTaxableBase + combinedReservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
      : 0;
    const combinedTotalWithTax = Number((projectTaxableBase + combinedReservationsTotal + combinedTax).toFixed(2));
    const history = project.paymentHistory || project.payments || [];
    const progress = calculatePaymentProgress({
      totalAmount: combinedTotalWithTax,
      paidAmount: history.length ? 0 : project.paidAmount,
      paidPercent: history.length ? 0 : project.paidPercent,
      history
    });
    return determinePaymentStatus({
      manualStatus: null,
      paidAmount: progress.paidAmount,
      paidPercent: progress.paidPercent,
      totalAmount: combinedTotalWithTax
    });
  } catch (_) {
    return null;
  }
}

function projectMatchesFilters(project) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const searchTerm = normalizeProjectText(state.filters.search);
  const haystack = normalizeProjectText([
    project.title,
    project.description,
    project.clientName,
    client?.customerName,
    project.clientCompany,
    getProjectTypeLabel(project.type),
    project.id,
    project.projectCode
  ].filter(Boolean).join(' '));
  if (searchTerm && !haystack.includes(searchTerm)) {
    return false;
  }

  const filterType = normalizeProjectText(state.filters.type);
  if (filterType && normalizeProjectText(project.type) !== filterType) {
    return false;
  }

  const statusBase = determineProjectStatus(project);
  const status = (project?.cancelled === true || project?.status === 'cancelled' || project?.status === 'canceled') ? 'cancelled' : statusBase;
  if (state.filters.status && state.filters.status !== status) {
    return false;
  }

  const isConfirmed = project.confirmed === true || project.confirmed === 'true';
  if (state.filters.confirmed === 'yes' && !isConfirmed) return false;
  if (state.filters.confirmed === 'no' && isConfirmed) return false;
  if (state.filters.confirmed === 'closed' && status !== 'completed') return false;

  const paymentStatus = getProjectPaymentStatus(project);
  if (state.filters.payment) {
    if (!paymentStatus) return false;
    if (state.filters.payment !== paymentStatus) return false;
  }

  const filterStart = parseFilterDate(state.filters.startDate);
  const filterEnd = parseFilterDate(state.filters.endDate, true);
  if (filterStart || filterEnd) {
    const projectStart = project.start ? new Date(project.start) : null;
    if (!projectStart || Number.isNaN(projectStart.getTime())) return false;
    if (filterStart && projectStart < filterStart) return false;
    if (filterEnd && projectStart > filterEnd) return false;
  }

  return true;
}

function resolveProjectClientName(project, client, fallback) {
  const fromProject = String(
    project?.clientName
      ?? project?.client_name
      ?? project?.customerName
      ?? project?.customer_name
      ?? ''
  ).trim();
  if (fromProject) return fromProject;
  const fromClient = String(
    client?.customerName
      ?? client?.fullName
      ?? client?.full_name
      ?? client?.customer_name
      ?? client?.name
      ?? ''
  ).trim();
  if (fromClient) return fromClient;
  return fallback;
}

function getFilteredProjects() {
  const projects = Array.isArray(state.projects) ? state.projects : [];
  return projects.filter((project) => projectMatchesFilters(project));
}

export function renderProjects() {
  if (!dom.projectsTableBody) return;
  const filtered = getFilteredProjects();

  if (!filtered.length) {
    const emptyKey = state.projects.length === 0 ? 'projects.table.emptyInitial' : 'projects.table.emptyFiltered';
    const emptyFallback = state.projects.length === 0 ? 'لم يتم إنشاء مشاريع بعد.' : 'لا توجد مشاريع مطابقة.';
    const emptyText = escapeHtml(t(emptyKey, emptyFallback));
    dom.projectsTableBody.innerHTML = `<tr class="projects-table-empty-row"><td colspan="6" class="text-center text-muted">${emptyText}</td></tr>`;
    setTableCount(0);
    state.visibleProjects = [];
    renderTimeline([]);
    renderFocusCards();
    return;
  }

  // Sort by creation time (newest first). Fallback to start date when createdAt missing.
  const sortedProjects = [...filtered]
    .sort((a, b) => {
      const aOrder = resolveProjectOrderValue(a);
      const bOrder = resolveProjectOrderValue(b);
      return bOrder - aOrder;
    });

  state.visibleProjects = sortedProjects;
  setTableCount(sortedProjects.length);

  const pagination = ensureTablePagination();
  const pageSize = pagination.pageSize || FOCUS_CARDS_PER_PAGE;
  const totalPages = Math.max(1, Math.ceil(sortedProjects.length / pageSize));
  pagination.totalPages = totalPages;
  pagination.page = Math.min(Math.max(1, pagination.page || 1), totalPages);

  const start = (pagination.page - 1) * pageSize;
  const end = start + pageSize;
  const currentPageProjects = sortedProjects.slice(start, end);

  renderProjectsTableChunked(currentPageProjects);
  renderTimeline(currentPageProjects);
  renderFocusCardsInternal(sortedProjects);
  renderProjectsPagination(totalPages, pagination.page);
}

function resolveProjectOrderValue(project) {
  const created = getProjectCreatedTimestamp(project);
  if (Number.isFinite(created)) return created;

  const idNum = Number(project?.id);
  if (Number.isFinite(idNum)) return idNum;

  const start = getProjectStartTimestamp(project);
  if (Number.isFinite(start)) return start;

  return Number.NEGATIVE_INFINITY;
}

function scheduleChunk(callback) {
  if (typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(callback, { timeout: 120 });
    return;
  }
  setTimeout(callback, 0);
}

function renderProjectsTableChunked(projects) {
  if (!dom.projectsTableBody) return;
  const token = ++projectsRenderToken;
  dom.projectsTableBody.innerHTML = '';

  const renderChunk = (startIndex = 0) => {
    if (token !== projectsRenderToken) return;
    const end = Math.min(projects.length, startIndex + PROJECTS_TABLE_CHUNK_SIZE);
    const frag = document.createDocumentFragment();
    for (let i = startIndex; i < end; i += 1) {
      const rowHtml = renderProjectRow(projects[i]);
      const wrapper = document.createElement('tbody');
      wrapper.innerHTML = rowHtml;
      while (wrapper.firstChild) {
        frag.appendChild(wrapper.firstChild);
      }
    }
    dom.projectsTableBody.appendChild(frag);

    if (end < projects.length) {
      scheduleChunk(() => renderChunk(end));
    }
  };

  renderChunk(0);
}

function renderProjectRow(project) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = resolveProjectClientName(project, client, t('projects.fallback.unknownClient', 'عميل غير معروف'));
  const typeClass = getProjectTypeClass(project.type);
  const { displayExpensesTotal, displayTotalWithTax } = resolveProjectCommercialDisplayTotals(project);
  const typeLabel = escapeHtml(getProjectTypeLabel(project.type));
  const typeBadge = `<span class="project-type-chip project-type-chip--${typeClass}">${typeLabel}</span>`;
  const projectCodeDisplay = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeBadge = `<span class="project-code-badge">#${escapeHtml(projectCodeDisplay)}</span>`;
  const canDelete = userCanManageDestructiveActions();
  const deleteButton = canDelete
    ? `<button class="ui-button ui-button--danger btn btn-sm btn-outline-danger" data-action="delete-project" data-id="${project.id}">${escapeHtml(t('actions.delete', 'حذف'))}</button>`
    : '';

  return `
    <tr data-project-id="${project.id}">
      <td>
        <div class="projects-table__project-cell d-flex flex-column gap-1">
          <div class="projects-table__title">${escapeHtml(project.title)}</div>
          <div class="d-flex flex-wrap gap-2 align-items-center project-row-meta">
            ${projectCodeBadge}
            ${typeBadge}
          </div>
        </div>
      </td>
      <td>
        <div class="projects-table__client-cell">${escapeHtml(clientName)}</div>
      </td>
      <td><div class="projects-table__schedule">${combineProjectDateRange(project.start, project.end)}</div></td>
      <td><span class="projects-table__amount">${formatCurrency(displayTotalWithTax)}</span></td>
      <td><span class="projects-table__amount">${formatCurrency(displayExpensesTotal)}</span></td>
      <td class="text-end">
        <div class="projects-table__actions">
          <button class="ui-button ui-button--outline btn btn-sm btn-outline-primary" data-action="view-details" data-id="${project.id}">${escapeHtml(t('actions.view', 'عرض'))}</button>
          ${deleteButton}
        </div>
      </td>
    </tr>
  `;
}

function combineProjectDateRange(start, end) {
  if (!start) return '—';
  const startStr = formatDateTime(start);
  const endStr = end ? formatDateTime(end) : '';

  const split = (val) => {
    const parts = String(val).split(' ').filter(Boolean);
    const date = parts.shift() || '';
    const time = parts.join(' ');
    return { date, time };
  };

  const s = split(startStr);
  const e = endStr ? split(endStr) : { date: '', time: '' };

  // Same-day project: show one date, then time range
  if (e.date && s.date === e.date) {
    const timeLine = (s.time && e.time) ? `من ${s.time} إلى ${e.time}` : '';
    return `
      <div class="date-range">
        <div class="date-line">${s.date}</div>
        ${timeLine ? `<div class="time-line">${timeLine}</div>` : ''}
      </div>
    `;
  }

  // Multi-day project: start date, end date, then time range
  const timeLine = (s.time && e.time) ? `من ${s.time} إلى ${e.time}` : '';
  return `
    <div class="date-range">
      <div class="date-line">${s.date}</div>
      ${e.date ? `<div class="date-line">${e.date}</div>` : ''}
      ${timeLine ? `<div class="time-line">${timeLine}</div>` : ''}
    </div>
  `;
}

// Helper for focus card: split date and time into separate rows
function buildProjectDateTimeRows(start, end) {
  if (!start) return { dateHtml: '—', timeText: '' };
  const startStr = formatDateTime(start);
  const endStr = end ? formatDateTime(end) : '';

  const split = (val) => {
    const parts = String(val).split(' ').filter(Boolean);
    const date = parts.shift() || '';
    const time = parts.join(' ');
    return { date, time };
  };

  const s = split(startStr);
  const e = endStr ? split(endStr) : { date: '', time: '' };
  let dateHtml = '';
  let timeText = '';

  if (e.date && s.date === e.date) {
    // same-day project
    dateHtml = `<div class=\"date-range\"><div class=\"date-line\">${s.date}</div></div>`;
    timeText = `من ${s.time || '—:—'} إلى ${e.time || '—:—'}`;
  } else {
    // multi-day project
    dateHtml = `<div class=\"date-range\">` +
      `<div class=\"date-line\">${s.date}</div>` +
      (e.date ? `<div class=\"date-line\">${e.date}</div>` : '') +
      `</div>`;
    timeText = `من ${s.time || '—:—'} إلى ${e.time || '—:—'}`;
  }

  return { dateHtml, timeText };
}

function renderTimeline(projectsForTimeline) {
  if (!dom.timeline) return;

  const sourceProjects = Array.isArray(projectsForTimeline)
    ? projectsForTimeline
    : (state.visibleProjects.length ? state.visibleProjects : state.projects);

  const timelineProjects = sourceProjects
    .slice(0, TIMELINE_RENDER_LIMIT)
    .map((project) => {
      if (!project?.start) return null;
      const startDate = new Date(project.start);
      if (Number.isNaN(startDate.getTime())) return null;

      let endDate = project.end ? new Date(project.end) : new Date(startDate);
      if (Number.isNaN(endDate.getTime())) {
        endDate = new Date(startDate);
      }

      if (endDate <= startDate) {
        endDate = new Date(startDate.getTime() + ONE_HOUR_IN_MS);
      }

      return { project, startDate, endDate };
    })
    .filter(Boolean)
    .sort((a, b) => a.startDate - b.startDate);

  if (!timelineProjects.length) {
    const emptyText = escapeHtml(t('projects.timeline.empty', dom.timeline.dataset.empty || 'لا توجد مشاريع ببيانات زمنية صالحة.'));
    dom.timeline.innerHTML = `<div class="project-timeline__empty text-muted">${emptyText}</div>`;
    return;
  }

  const minStart = timelineProjects[0].startDate.getTime();
  const maxEnd = Math.max(...timelineProjects.map((item) => item.endDate.getTime()));
  let totalSpan = maxEnd - minStart;
  if (totalSpan <= 0) {
    totalSpan = ONE_HOUR_IN_MS;
  }

  const conflicts = detectTimelineConflicts(timelineProjects);
  const rangeTemplate = t('projects.timeline.range', '{start} → {end}');
  const conflictLabel = t('projects.timeline.conflict', 'Scheduling conflict');

  const itemsMarkup = timelineProjects
    .map((item) => {
      const { project, startDate, endDate } = item;
      const duration = endDate.getTime() - startDate.getTime();
      let offset = ((startDate.getTime() - minStart) / totalSpan) * 100;
      offset = Math.max(0, Math.min(offset, 100));
      let width = (duration / totalSpan) * 100;
      width = Math.max(width, 2.5);
      if (offset + width > 100) {
        width = Math.max(1.5, 100 - offset);
      }

      const status = determineProjectStatus(project);
      const statusClass = `project-timeline__item--${status}`;
      const hasConflict = conflicts.has(project.id);
      const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
      const displayLabel = truncateText(title, 26);
      const client = state.customers.find((c) => String(c.id) === String(project.clientId));
      const clientName = resolveProjectClientName(project, client, t('projects.fallback.unknownClient', 'Unknown client'));
      const companyName = (project.clientCompany || client?.companyName || '').trim();
      const typeLabel = getProjectTypeLabel(project.type);
      const startLabel = formatDateTime(startDate.toISOString());
      const endLabel = formatDateTime(endDate.toISOString());
      const rangeLabel = rangeTemplate.replace('{start}', startLabel).replace('{end}', endLabel);
      const tooltipClient = companyName ? `${clientName} (${companyName})` : clientName;
      const tooltip = `${title} • ${typeLabel} • ${tooltipClient} | ${rangeLabel}`;
      const conflictIcon = hasConflict
        ? `<span class="project-timeline__item-conflict" title="${escapeHtml(conflictLabel)}">⚠️</span>`
        : '';

      return `
        <div class="project-timeline__item ${statusClass}${hasConflict ? ' project-timeline__item--conflict' : ''}" style="left:${offset}%;width:${width}%;" title="${escapeHtml(tooltip)}">
          <span class="project-timeline__item-label">${escapeHtml(displayLabel)}</span>
          ${conflictIcon}
        </div>
      `;
    })
    .join('');

  const scaleMarkup = `
    <div class="project-timeline__scale">
      <span>${escapeHtml(formatDateTime(new Date(minStart).toISOString()))}</span>
      <span>${escapeHtml(formatDateTime(new Date(maxEnd).toISOString()))}</span>
    </div>
  `;

  dom.timeline.innerHTML = `
    ${scaleMarkup}
    <div class="project-timeline__track">
      ${itemsMarkup}
    </div>
  `;
}

function detectTimelineConflicts(items) {
  const conflicts = new Set();
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const a = items[i];
      const b = items[j];
      if (a.startDate < b.endDate && b.startDate < a.endDate) {
        conflicts.add(a.project.id);
        conflicts.add(b.project.id);
      }
    }
  }
  return conflicts;
}

export function renderFocusCards() {
  renderFocusCardsInternal();
}

function resolveFocusLifecycle(project) {
  const statusBase = determineProjectStatus(project);
  const status = (project?.cancelled === true || project?.status === 'cancelled' || project?.status === 'canceled')
    ? 'cancelled'
    : statusBase;

  const hasConflict = (() => {
    try {
      const startA = project.start ? new Date(project.start) : null;
      const endA = project.end ? new Date(project.end) : (startA ? new Date(startA.getTime() + ONE_HOUR_IN_MS) : null);
      if (!startA || !endA || Number.isNaN(startA.getTime()) || Number.isNaN(endA.getTime())) return false;
      return state.projects.some((other) => {
        if (!other || String(other.id) === String(project.id)) return false;
        const startB = other.start ? new Date(other.start) : null;
        const endB = other.end ? new Date(other.end) : (startB ? new Date(startB.getTime() + ONE_HOUR_IN_MS) : null);
        if (!startB || !endB || Number.isNaN(startB.getTime()) || Number.isNaN(endB.getTime())) return false;
        const latestStart = Math.max(startA.getTime(), startB.getTime());
        const earliestEnd = Math.min(endA.getTime(), endB.getTime());
        return latestStart < earliestEnd;
      });
    } catch (_) {
      return false;
    }
  })();

  const statusKey = (hasConflict && (status === 'upcoming' || status === 'ongoing')) ? 'conflict' : status;
  const group = (statusKey === 'completed' || statusKey === 'cancelled') ? 'archive' : 'live';

  return { status, statusKey, group, hasConflict };
}

function sortProjectsForFocusSection(projects, groupKey) {
  const priorityMap = groupKey === 'archive'
    ? { completed: 0, cancelled: 1 }
    : { ongoing: 0, conflict: 1, upcoming: 2 };

  return [...projects].sort((left, right) => {
    const leftLifecycle = resolveFocusLifecycle(left);
    const rightLifecycle = resolveFocusLifecycle(right);
    const leftPriority = priorityMap[leftLifecycle.statusKey] ?? 99;
    const rightPriority = priorityMap[rightLifecycle.statusKey] ?? 99;
    if (leftPriority !== rightPriority) return leftPriority - rightPriority;
    return resolveProjectOrderValue(right) - resolveProjectOrderValue(left);
  });
}

function renderFocusSectionPagination({ sectionKey, totalItems, totalPages, currentPage, pageSize }) {
  if (totalPages <= 1) {
    return '';
  }

  const navLabel = t('projects.pagination.navigation', 'Projects pagination');
  const prevLabel = t('projects.pagination.prev', 'Previous page');
  const nextLabel = t('projects.pagination.next', 'Next page');
  const pageLabelTemplate = t('projects.pagination.page', 'Page {page}');
  const rangeTemplate = t('projects.pagination.range', 'Showing {from}-{to} of {total}');
  const rangeStart = totalItems === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const rangeEnd = totalItems === 0 ? 0 : Math.min(totalItems, currentPage * pageSize);
  const rangeText = rangeTemplate
    .replace('{from}', normalizeNumbers(String(rangeStart)))
    .replace('{to}', normalizeNumbers(String(rangeEnd)))
    .replace('{total}', normalizeNumbers(String(totalItems)));

  const buttonsHtml = buildProjectsPageWindow(currentPage, totalPages)
    .filter((page) => page >= 1 && page <= totalPages)
    .map((page) => {
      const active = page === currentPage;
      const pageLabel = pageLabelTemplate.replace('{page}', normalizeNumbers(String(page)));
      return `<button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${active ? 'aria-current="page"' : ''}>${normalizeNumbers(String(page))}</button>`;
    })
    .join('');

  return `
    <div class="list-pagination project-focus-group__pagination" data-focus-section-pagination="${escapeHtml(sectionKey)}">
      <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
      <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
        <button type="button" class="btn btn-sm btn-outline-primary" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
        ${buttonsHtml}
        <button type="button" class="btn btn-sm btn-outline-primary" data-focus-section="${escapeHtml(sectionKey)}" data-focus-section-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
      </div>
    </div>
  `;
}

function buildFocusCardSections(projects) {
  const groups = {
    live: [],
    archive: [],
  };

  projects.forEach((project) => {
    const lifecycle = resolveFocusLifecycle(project);
    groups[lifecycle.group].push(project);
  });

  return [
    {
      key: 'live',
      title: t('projects.focus.sections.liveTitle', '⚡ مراجعة سريعة للمشاريع الحية'),
      hint: t('projects.focus.sections.liveHint', 'يعرض المشاريع الجارية والنشطة لتبدأ بالمهم أولاً.'),
      empty: t('projects.focus.sections.emptyLive', 'لا توجد مشاريع جارية أو نشطة ضمن النتائج الحالية.'),
      projects: sortProjectsForFocusSection(groups.live, 'live'),
    },
    {
      key: 'archive',
      title: t('projects.focus.sections.archiveTitle', '🗂️ الأرشيف'),
      hint: t('projects.focus.sections.archiveHint', 'يعرض المشاريع المغلقة والملغاة بشكل منفصل للمراجعة الهادئة.'),
      empty: t('projects.focus.sections.emptyArchive', 'لا توجد مشاريع مغلقة أو ملغاة ضمن النتائج الحالية.'),
      projects: sortProjectsForFocusSection(groups.archive, 'archive'),
    }
  ];
}

function renderFocusSection(section) {
  return `
    <section class="project-focus-group project-focus-group--${section.key}">
      <header class="project-focus-group__header">
        <div class="project-focus-group__title-wrap">
          <h6 class="project-focus-group__title">${escapeHtml(section.title)}</h6>
          <p class="project-focus-group__hint">${escapeHtml(section.hint)}</p>
        </div>
        <span class="ui-badge ui-badge--soft badge-soft project-focus-group__count">${normalizeNumbers(String(section.totalItems))}</span>
      </header>
      ${
        section.pagedProjects.length
          ? `<div class="project-card-grid project-focus-group__grid">${section.pagedProjects.map((project) => renderFocusCard(project)).join('')}</div>`
          : `<p class="linked-records-empty-copy project-card-grid__item project-card-grid__item--full project-card-grid__empty-line project-focus-group__empty">${escapeHtml(section.empty)}</p>`
      }
      ${renderFocusSectionPagination({
        sectionKey: section.key,
        totalItems: section.totalItems,
        totalPages: section.totalPages,
        currentPage: section.currentPage,
        pageSize: section.pageSize
      })}
    </section>
  `;
}

function bindFocusPagination(host) {
  if (!host) return;
  host.onclick = (event) => {
    const target = event.target instanceof HTMLElement
      ? event.target.closest('button[data-focus-section-page]')
      : null;
    if (!target) return;
    if (target.disabled) return;

    const sectionKey = target.dataset.focusSection;
    const page = Number.parseInt(target.dataset.focusSectionPage || '0', 10);
    if (!sectionKey || !Number.isInteger(page) || page < 1) return;

    const sectionPagination = ensureFocusSectionPagination(sectionKey);
    if (page > sectionPagination.totalPages || page === sectionPagination.page) return;

    const paginationHost = target.closest('[data-focus-section-pagination]') || target;
    sectionPagination.page = page;
    jumpPaginationSectionToStart(paginationHost);
    renderFocusCardsInternal();
    settlePaginationSectionToStart(paginationHost, { behavior: 'smooth' });
  };
}

function renderFocusCardsInternal(projectsOverride = null) {
  if (!dom.focusCards) return;

  const sourceProjects = Array.isArray(projectsOverride)
    ? projectsOverride
    : (state.visibleProjects.length ? state.visibleProjects : getFilteredProjects());

  const sections = buildFocusCardSections(sourceProjects).map((section) => {
    const pagination = ensureFocusSectionPagination(section.key);
    const pageSize = Number.isFinite(pagination.pageSize) ? pagination.pageSize : FOCUS_CARDS_PER_PAGE;
    const totalItems = section.projects.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const currentPage = Math.min(Math.max(1, pagination.page || 1), totalPages);
    pagination.page = currentPage;
    pagination.totalPages = totalPages;
    const pagedProjects = section.projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return {
      ...section,
      totalItems,
      pageSize,
      totalPages,
      currentPage,
      pagedProjects,
    };
  });

  const liveSection = sections.find((section) => section.key === 'live');
  const archiveSection = sections.find((section) => section.key === 'archive');

  dom.focusCards.innerHTML = liveSection ? renderFocusSection(liveSection) : '';

  if (dom.archiveCards) {
    dom.archiveCards.innerHTML = archiveSection ? renderFocusSection(archiveSection) : '';
  }
  if (dom.archiveCount) {
    dom.archiveCount.textContent = normalizeNumbers(String(archiveSection?.totalItems ?? 0));
  }

  bindFocusPagination(dom.focusCards);
  bindFocusPagination(dom.archiveCards);
}

function renderProjectsPagination(totalPages, currentPage) {
  const containers = [dom.tablePagination].filter(Boolean);
  if (!containers.length) return;

  const clampedTotal = Math.max(1, totalPages);
  const clampedCurrent = Math.min(Math.max(1, currentPage || 1), clampedTotal);
  const visibleProjects = Array.isArray(state.visibleProjects) ? state.visibleProjects.length : 0;
  const pageSize = ensureTablePagination().pageSize || FOCUS_CARDS_PER_PAGE;
  const rangeStart = visibleProjects === 0 ? 0 : ((clampedCurrent - 1) * pageSize) + 1;
  const rangeEnd = visibleProjects === 0 ? 0 : Math.min(visibleProjects, clampedCurrent * pageSize);
  const navLabel = t('projects.pagination.navigation', 'Projects pagination');
  const prevLabel = t('projects.pagination.prev', 'Previous page');
  const nextLabel = t('projects.pagination.next', 'Next page');
  const pageLabelTemplate = t('projects.pagination.page', 'Page {page}');
  const rangeTemplate = t('projects.pagination.range', 'Showing {from}-{to} of {total}');

  containers.forEach((container) => {
    container.hidden = clampedTotal <= 1;
    if (clampedTotal <= 1) {
      container.innerHTML = '';
    }
  });
  if (clampedTotal <= 1) return;

  const pagesList = buildProjectsPageWindow(clampedCurrent, clampedTotal);

  const buttonsHtml = pagesList
    .filter((page) => page >= 1 && page <= clampedTotal)
    .map((page) => {
      const active = page === clampedCurrent;
      const pageLabel = pageLabelTemplate.replace('{page}', normalizeNumbers(String(page)));
      return `<button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}" data-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${active ? 'aria-current="page"' : ''}>${normalizeNumbers(String(page))}</button>`;
    })
    .join('');

  const rangeText = rangeTemplate
    .replace('{from}', normalizeNumbers(String(rangeStart)))
    .replace('{to}', normalizeNumbers(String(rangeEnd)))
    .replace('{total}', normalizeNumbers(String(visibleProjects)));

  containers.forEach((container) => {
    container.innerHTML = `
      <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
      <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
        <button type="button" class="btn btn-sm btn-outline-primary" data-page="${clampedCurrent - 1}" ${clampedCurrent === 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
        ${buttonsHtml}
        <button type="button" class="btn btn-sm btn-outline-primary" data-page="${clampedCurrent + 1}" ${clampedCurrent === clampedTotal ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
      </div>
    `;
    container.onclick = (event) => {
      const target = event.target instanceof HTMLElement
        ? event.target.closest('button[data-page]')
        : null;
      if (!target) return;
      if (target.disabled) return;
      const page = Number.parseInt(target.dataset.page || '0', 10);
      if (!Number.isInteger(page) || page < 1 || page > clampedTotal || page === clampedCurrent) return;
      const pagination = ensureTablePagination();
      pagination.page = page;
      jumpPaginationSectionToStart(container);
      renderProjects();
      settlePaginationSectionToStart(container, { behavior: 'smooth' });
    };
  });
}

function renderFocusCard(project) {
  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const clientName = resolveProjectClientName(project, client, t('projects.fallback.unknownClient', 'عميل غير معروف'));
  const crewCount = Array.isArray(project.technicians) ? project.technicians.length : 0;
  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsCount = reservationsForProject.length;
  const servicesClientPrice = Number(project?.servicesClientPrice ?? 0);
  const expensesTotal = getProjectExpenses(project);
  const { applyTax } = resolveProjectTotals(project);
  const description = (project.description || '').trim();
  const descriptionText = description
    ? truncateText(description, 110)
    : t('projects.fallback.noDescription', 'لا يوجد وصف');
  const typeLabel = getProjectTypeLabel(project.type);
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';
  const projectIdAttr = escapeHtml(String(project.id));
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  const { statusKey } = resolveFocusLifecycle(project);
  const statusChipClass = statusKey === 'upcoming'
    ? 'timeline-status-badge timeline-status-badge--upcoming'
    : statusKey === 'ongoing'
      ? 'timeline-status-badge timeline-status-badge--ongoing'
      : statusKey === 'completed'
        ? 'timeline-status-badge timeline-status-badge--completed'
        : statusKey === 'cancelled'
          ? 'timeline-status-badge timeline-status-badge--cancelled'
          : 'timeline-status-badge timeline-status-badge--conflict';
  const title = (project.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');
  const lifecycleCardClass = statusKey === 'cancelled'
    ? 'project-focus-card--cancelled'
    : statusKey === 'completed'
      ? 'project-focus-card--completed'
      : statusKey === 'ongoing'
        ? 'project-focus-card--ongoing'
        : statusKey === 'conflict'
          ? 'project-focus-card--conflict'
          : 'project-focus-card--upcoming';
  const cardStateClasses = [lifecycleCardClass];
  if (isConfirmed && statusKey !== 'cancelled' && statusKey !== 'completed') {
    cardStateClasses.push('project-focus-card--confirmed');
  }

  // Aggregate reservation totals in a tax-neutral way to avoid double counting tax
  const agg = reservationsForProject.reduce((acc, res) => {
    const items = Array.isArray(res.items) ? res.items : [];
    const crewAssignments = resolveProjectReservationCrewAssignments(res);
    const techniciansOrAssignments = crewAssignments.length
      ? crewAssignments
      : (Array.isArray(res.technicians) ? res.technicians : []);
    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: Array.isArray(techniciansOrAssignments) && !techniciansOrAssignments.length ? techniciansOrAssignments : [],
      crewAssignments: Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object' ? techniciansOrAssignments : [],
      discount: res.discount ?? 0,
      discountType: res.discountType || 'percent',
      applyTax: false,
      start: res.start,
      end: res.end,
      companySharePercent: null,
      groupingSource: res,
    });
    const net = resolveReservationNetTotal(res);
    const equipmentCount = computeReservationEquipmentCount(res);
    const crewCountLocal = resolveProjectReservationCrewCount(res);
    return {
      netTotal: acc.netTotal + net,
      equipmentMoney: acc.equipmentMoney + Number(breakdown.equipmentTotal || 0),
      crewMoney: acc.crewMoney + Number(breakdown.crewTotal || 0),
      equipmentCost: acc.equipmentCost + Number(breakdown.equipmentCostTotal || 0),
      crewCost: acc.crewCost + Number(breakdown.crewCostTotal || 0),
      equipmentCount: acc.equipmentCount + equipmentCount,
      crewCount: acc.crewCount + crewCountLocal,
    };
  }, { netTotal: 0, equipmentMoney: 0, crewMoney: 0, equipmentCost: 0, crewCost: 0, equipmentCount: 0, crewCount: 0 });

  const reservationsTotal = Number(agg.netTotal.toFixed(2));
  const equipmentCountTotal = agg.equipmentCount;
  const crewAssignmentsTotal = agg.crewCount || crewCount;
  // Compute final total using the same formula as project details/cards
  // Align with project details modal: use services client price (not expenses cost)
  const servicesNumber = Number(servicesClientPrice || 0);
  const discountVal = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw: applyTax });
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: agg.equipmentMoney,
    crewRevenue: agg.crewMoney,
    servicesRevenue: servicesNumber,
    equipmentCost: agg.equipmentCost,
    crewCost: agg.crewCost,
    servicesCost: Number(expensesTotal || 0),
    discountValue: discountVal,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent: sharePercent,
  });
  const discountAmount = clientAmounts.discountAmount;
  const baseAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const taxAmountAfterShare = clientAmounts.taxAmount;
  const finalTotal = clientAmounts.totalWithTax;
  const profit = clientAmounts.profit;

  const projectCodeBadge = `<span class="project-code-badge project-focus-card__code">#${escapeHtml(projectCodeDisplay)}</span>`;
  // Hide top type badge; we will highlight type inside the project summary
  const typeBadge = '';
  // Remove category tag (e.g., Today's Projects) from the card header per request
  const categoryMetaTag = '';
  const statusText = statusKey === 'upcoming'
    ? t('projects.focus.status.active', 'نشط')
    : statusKey === 'ongoing'
      ? t('projects.focus.status.running', 'جاري')
      : statusKey === 'completed'
        ? t('projects.focus.status.closed', 'مغلق')
        : t(`projects.status.${statusKey}`, statusKey);
  const statusChip = `<span class="${statusChipClass}">${escapeHtml(statusText)}</span>`;
  const paymentStatusValue = getProjectPaymentStatus(project) || 'unpaid';
  const paymentChipClass = paymentStatusValue === 'paid'
    ? 'status-paid'
    : paymentStatusValue === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  const paymentChipText = paymentStatusValue === 'paid'
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : paymentStatusValue === 'partial'
      ? t('reservations.list.payment.partial', '💳 مدفوع جزئياً')
      : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paymentChip = `<span class="reservation-chip ${paymentChipClass} project-focus-card__payment-chip">${escapeHtml(paymentChipText)}</span>`;

  const buildRow = (icon, label, value) => {
    const valueStr = String(value || '');
    const trimmed = valueStr.trim();
    // Allow safe HTML for internally generated markup (chips, date/time blocks)
    const isSafeHtml = trimmed.startsWith('<');
    return `
      <div class="project-focus-card__row">
        <span class="project-focus-card__row-label">
          ${icon ? `<span class="project-focus-card__row-icon">${escapeHtml(icon)}</span>` : ''}
          ${escapeHtml(label)}
        </span>
        <span class="project-focus-card__row-value">${isSafeHtml ? valueStr : escapeHtml(valueStr)}</span>
      </div>
    `;
  };

  const { dateHtml: projectDateHtml, timeText: projectTimeText } = buildProjectDateTimeRows(project.start, project.end);

  const projectInfoRows = [
    { icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName },
    // Hide company on the card per request
    // companyName ? { icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: companyName } : null,
    { icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: `<span class=\"project-type-chip project-type-chip--${getProjectTypeClass(project.type)}\">${escapeHtml(typeLabel)}</span>` },
    { icon: '📅', label: t('projects.focus.summary.range', 'الفترة الزمنية'), value: projectDateHtml },
    projectTimeText ? { icon: '⏰', label: t('projects.focus.summary.time', 'الوقت'), value: projectTimeText } : null
  ].filter(Boolean).map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const includesTaxLabel = (sharePercent > 0 && applyTax) ? ` ${t('projects.details.chips.vatOn', '(شامل الضريبة)', 'Includes VAT')}` : '';
  const finalTotalLabel = `${t('projects.details.summary.finalTotal', 'المجموع النهائي', 'Final Total')}${includesTaxLabel}`;

  const financialRows = [
    // Hide payment status row per request
    // { icon: '💳', label: t('projectCards.stats.paymentStatus', 'حالة الدفع'), value: paymentStatusLabel },
    // Hide total expenses on the card per request
    // { icon: '💸', label: t('projectCards.stats.expensesTotal', 'خدمات إنتاجية (التكلفة)'), value: formatCurrency(expensesTotal) },
    { icon: '💼', label: t('projectCards.stats.servicesClientPrice', 'الخدمات الإنتاجية'), value: formatCurrency(servicesClientPrice) },
    { icon: '💵', label: t('projects.details.summary.netProfit', 'صافي الربح'), value: formatCurrency(profit) },
    { icon: '💵', label: finalTotalLabel, value: formatCurrency(finalTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  const reservationRows = [
    { icon: '🔗', label: t('projectCards.stats.reservationsShort', 'الحجوزات'), value: normalizeNumbers(String(reservationsCount)) },
    { icon: '📦', label: t('projectCards.stats.equipmentCount', 'عدد المعدات'), value: normalizeNumbers(String(equipmentCountTotal)) },
    { icon: '😎', label: t('projectCards.stats.crewCount', 'عدد الطاقم'), value: normalizeNumbers(String(crewAssignmentsTotal)) },
    { icon: '💵', label: t('projectCards.stats.reservationValue', 'إجمالي الحجوزات'), value: formatCurrency(reservationsTotal) }
  ].map(({ icon, label, value }) => buildRow(icon, label, value)).join('');

  let confirmationControl = '';
  if (statusKey === 'cancelled') {
    confirmationControl = `<span class="reservation-chip status-cancelled project-focus-card__confirm-indicator">${escapeHtml(t('projects.focus.cancelled', 'مشروع ملغي', 'Cancelled project'))}</span>`;
  } else if (!isConfirmed) {
    confirmationControl = `<button class=\"btn btn-sm btn-success project-focus-card__confirm-btn\" data-action=\"confirm-project\" data-id=\"${projectIdAttr}\">${escapeHtml(t('projects.focus.actions.confirm', '✔️ تأكيد المشروع'))}</button>`;
  } else if (statusKey !== 'completed') {
    // After confirming, show a Close Project button until it is closed
    confirmationControl = `<button class=\"btn btn-sm btn-warning project-focus-card__confirm-btn\" data-action=\"close-project\" data-id=\"${projectIdAttr}\">${escapeHtml(t('projects.actions.close', '🔒 إغلاق المشروع'))}</button>`;
  } else {
    // Closed: show indicator only (reopen from edit modal) — use "مغلق/Closed" to differentiate from top tag "مكتمل/Completed"
    confirmationControl = `<span class=\"reservation-chip status-completed project-focus-card__confirm-indicator\">${escapeHtml(t('projects.tag.closed', 'مغلق'))}</span>`;
  }

  return `
    <div class="project-card-grid__item">
      <article class="project-focus-card ${cardStateClasses.filter(Boolean).join(' ')}" data-project-id="${projectIdAttr}">
        <div class="project-focus-card__accent"></div>
        <div class="project-focus-card__top">
          ${projectCodeBadge}
          ${typeBadge}
          ${categoryMetaTag}
          ${statusChip}
          ${paymentChip}
        </div>
        <h6 class="project-focus-card__title">${escapeHtml(title)}</h6>
        <p class="project-focus-card__description">${escapeHtml(descriptionText)}</p>
        <div class="project-focus-card__sections">
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.project', 'ملخص المشروع'))}</span>
            <div class="project-focus-card__section-box">
              ${projectInfoRows}
            </div>
          </div>
          <!-- Show reservations above the financial summary -->
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.reservations', 'الحجوزات المرتبطة'))}</span>
            <div class="project-focus-card__section-box">
              ${reservationRows}
            </div>
          </div>
          <div class="project-focus-card__section">
            <span class="project-focus-card__section-title">${escapeHtml(t('projects.focus.summary.payment', 'الملخص المالي'))}</span>
            <div class="project-focus-card__section-box">
              ${financialRows}
            </div>
          </div>
        </div>
        <div class="project-focus-card__actions project-focus-card__actions--single">
          ${confirmationControl}
        </div>
      </article>
    </div>
  `;
}

function isProjectToday(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;
  const now = new Date();
  return start.getFullYear() === now.getFullYear() &&
    start.getMonth() === now.getMonth() &&
    start.getDate() === now.getDate();
}

function isProjectThisWeek(project) {
  if (!project?.start) return false;
  const start = new Date(project.start);
  if (Number.isNaN(start.getTime())) return false;

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? 6 : day - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  return start >= startOfWeek && start < endOfWeek;
}

export function determineProjectStatus(project) {
  const raw = (typeof project?.status === 'string') ? project.status.trim().toLowerCase() : null;
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  // 1) الملغى دائماً يأخذ أولوية
  if (raw && (raw === 'cancelled' || raw === 'canceled' || raw === 'ملغي' || raw === 'ملغى')) {
    return 'cancelled';
  }

  // 2) إذا انتهى الوقت نعتبره مكتمل حتى لو الحالة الصريحة "ongoing"
  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  // 3) حالات صريحة أخرى (قبل الحساب الزمني)
  if (raw) {
    if (raw === 'completed' || raw === 'مكتمل' || raw === 'مغلق') return 'completed';
    if (raw === 'ongoing' || raw === 'in_progress' || raw === 'in-progress' || raw === 'جاري' || raw === 'قيد التنفيذ') return 'ongoing';
    if (raw === 'upcoming' || raw === 'قادم') return 'upcoming';
  }

  // 4) الحساب الزمني الافتراضي
  if (start && !Number.isNaN(start.getTime()) && start > now) return 'upcoming';
  return 'ongoing';
}

export function getProjectExpenses(project) {
  if (typeof project.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project.expenses)) {
    return project.expenses.reduce((sum, expense) => {
      const days = Math.max(1, Number.parseInt(String(expense?.service_days ?? expense?.days ?? 1), 10) || 1);
      return sum + ((Number(expense?.amount) || 0) * days);
    }, 0);
  }
  return 0;
}

function resolveReservationDisplayRevenue(reservation) {
  const storedTotal = Number(reservation?.totalAmount ?? reservation?.total_amount ?? 0);
  if (Number.isFinite(storedTotal) && storedTotal > 0) {
    return storedTotal;
  }
  return resolveReservationNetTotal(reservation);
}

function aggregateReservationDisplayCosts(reservations = []) {
  return (Array.isArray(reservations) ? reservations : []).reduce((acc, reservation) => {
    const items = Array.isArray(reservation?.items) ? reservation.items : [];
    const crewAssignments = resolveProjectReservationCrewAssignments(reservation);
    const techniciansOrAssignments = crewAssignments.length
      ? crewAssignments
      : (Array.isArray(reservation?.technicians) ? reservation.technicians : []);
    const useAssignments = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] === 'object';
    const useTechnicianIds = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] !== 'object';

    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: useTechnicianIds ? techniciansOrAssignments : [],
      crewAssignments: useAssignments ? techniciansOrAssignments : [],
      discount: reservation?.discount ?? 0,
      discountType: reservation?.discountType || 'percent',
      applyTax: false,
      start: reservation?.start,
      end: reservation?.end,
      groupingSource: reservation,
    });

    acc.equipmentCost += Number(breakdown?.equipmentCostTotal || 0);
    acc.crewCost += Number(breakdown?.crewCostTotal || 0);
    return acc;
  }, { equipmentCost: 0, crewCost: 0 });
}

function aggregateReservationDisplayFinancials(reservations = []) {
  return (Array.isArray(reservations) ? reservations : []).reduce((acc, reservation) => {
    const items = Array.isArray(reservation?.items) ? reservation.items : [];
    const crewAssignments = resolveProjectReservationCrewAssignments(reservation);
    const techniciansOrAssignments = crewAssignments.length
      ? crewAssignments
      : (Array.isArray(reservation?.technicians) ? reservation.technicians : []);
    const useAssignments = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] === 'object';
    const useTechnicianIds = Array.isArray(techniciansOrAssignments)
      && techniciansOrAssignments.length
      && typeof techniciansOrAssignments[0] !== 'object';

    const breakdown = calculateDraftFinancialBreakdown({
      items,
      technicianIds: useTechnicianIds ? techniciansOrAssignments : [],
      crewAssignments: useAssignments ? techniciansOrAssignments : [],
      discount: reservation?.discount ?? 0,
      discountType: reservation?.discountType || 'percent',
      applyTax: false,
      start: reservation?.start,
      end: reservation?.end,
      groupingSource: reservation,
    });

    acc.equipmentRevenue += Number(breakdown?.equipmentTotal || 0);
    acc.crewRevenue += Number(breakdown?.crewTotal || 0);
    acc.equipmentCost += Number(breakdown?.equipmentCostTotal || 0);
    acc.crewCost += Number(breakdown?.crewCostTotal || 0);
    return acc;
  }, { equipmentRevenue: 0, crewRevenue: 0, equipmentCost: 0, crewCost: 0 });
}

function resolveDirectProjectRevenueTotals(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate ?? project?.equipment_estimate ?? 0) || 0;
  const servicesClientPrice = Number(project?.servicesClientPrice ?? project?.services_client_price ?? 0) || 0;
  const applyTaxRaw = project?.applyTax === true
    || project?.applyTax === 'true'
    || project?.apply_tax === true
    || project?.apply_tax === 'true';

  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { applyTax, sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw });
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: equipmentEstimate,
    servicesRevenue: servicesClientPrice,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent: sharePercent,
  });
  const discountAmount = clientAmounts.discountAmount;
  const subtotalAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const taxableAmount = clientAmounts.taxableAmount;
  const computedTaxAmount = clientAmounts.taxAmount;
  const computedTotalWithTax = clientAmounts.totalWithTax;
  const directTotalWithTax = computedTotalWithTax;

  return {
    equipmentEstimate,
    servicesClientPrice,
    directBaseSubtotal: clientAmounts.baseSubtotal,
    directDiscountAmount: discountAmount,
    directSubtotalAfterDiscount: subtotalAfterDiscount,
    directCompanyShareAmount: companyShareAmount,
    directApplyTax: applyTax,
    directTaxAmount: computedTaxAmount,
    directTotalWithTax,
  };
}

function resolveStoredProjectTotalWithTax(project) {
  const candidates = [
    project?.totalWithTax,
    project?.total_with_tax,
    project?.totalAmount,
    project?.total_amount,
    project?.amount,
  ];
  for (const candidate of candidates) {
    const value = Number.parseFloat(normalizeNumbers(String(candidate ?? '')));
    if (Number.isFinite(value) && value > 0) {
      return Number(value.toFixed(2));
    }
  }
  return 0;
}

export function resolveProjectCommercialDisplayTotals(project, reservationsOverride = null) {
  const baseTotals = resolveProjectTotals(project);
  const directRevenueTotals = resolveDirectProjectRevenueTotals(project);
  const reservations = Array.isArray(reservationsOverride)
    ? reservationsOverride
    : getReservationsForProject(project?.id);
  const reservationRevenue = reservations.reduce(
    (sum, reservation) => sum + resolveReservationDisplayRevenue(reservation),
    0
  );
  const reservationCosts = aggregateReservationDisplayCosts(reservations);
  const reservationCostTotal = Number((reservationCosts.equipmentCost + reservationCosts.crewCost).toFixed(2));
  const reservationFinancials = aggregateReservationDisplayFinancials(reservations);
  const expensesTotal = Number(baseTotals.expensesTotal || 0);
  const servicesClientPrice = Number(project?.servicesClientPrice ?? project?.services_client_price ?? 0) || 0;
  const applyTaxRaw = project?.applyTax === true
    || project?.applyTax === 'true'
    || project?.apply_tax === true
    || project?.apply_tax === 'true';
  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { applyTax, sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw });
  const linkedProjectFinancials = reservations.length
    ? calculateProjectLineFinancials({
      equipmentRevenue: reservationFinancials.equipmentRevenue,
      crewRevenue: reservationFinancials.crewRevenue,
      servicesRevenue: servicesClientPrice,
      equipmentCost: reservationFinancials.equipmentCost,
      crewCost: reservationFinancials.crewCost,
      servicesCost: expensesTotal,
      discountValue,
      discountType,
      applyTax,
      companyShareEnabled,
      companySharePercent: sharePercent,
    })
    : null;
  const directTotalWithTax = Number(directRevenueTotals.directTotalWithTax || 0);
  const storedDirectTotalWithTax = reservations.length === 0 && directTotalWithTax <= 0
    ? resolveStoredProjectTotalWithTax(project)
    : 0;
  const directDisplayRevenue = reservations.length
    ? 0
    : Math.max(directTotalWithTax, storedDirectTotalWithTax);
  const displayTotalWithTax = Number((directDisplayRevenue + reservationRevenue).toFixed(2));
  const displayExpensesTotal = Number((Number(baseTotals.expensesTotal || 0) + reservationCostTotal).toFixed(2));

  return {
    ...baseTotals,
    ...(linkedProjectFinancials || {}),
    ...directRevenueTotals,
    reservations,
    reservationRevenue,
    reservationCostTotal,
    displayTotalWithTax,
    displayExpensesTotal,
  };
}

export function resolveProjectTotals(project) {
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const expensesTotal = getProjectExpenses(project);
  const servicesClientPrice = Number(project?.servicesClientPrice ?? project?.services_client_price ?? 0) || 0;
  const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true';

  const discountValue = Number.parseFloat(project?.discount ?? project?.discountValue ?? 0) || 0;
  const discountType = project?.discountType === 'amount' ? 'amount' : 'percent';
  const { applyTax, sharePercent, enabled: companyShareEnabled } = resolveProjectOverheadSettings(project, { applyTaxRaw });
  const clientAmounts = calculateProjectLineFinancials({
    equipmentRevenue: equipmentEstimate,
    servicesRevenue: servicesClientPrice,
    servicesCost: expensesTotal,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent: sharePercent,
  });
  const discountAmount = clientAmounts.discountAmount;
  const subtotalAfterDiscount = clientAmounts.subtotalAfterDiscount;
  const companyShareAmount = clientAmounts.companyShareAmount;
  const subtotal = clientAmounts.taxableAmount;

  return {
    equipmentEstimate,
    expensesTotal,
    baseSubtotal: clientAmounts.baseSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    companyShareAmount,
    subtotal,
    applyTax,
    taxAmount: clientAmounts.taxAmount,
    totalWithTax: clientAmounts.totalWithTax,
    marginBeforeTax: clientAmounts.marginBeforeTax,
  };
}

export function updateSummary() {
  const summaryProjects = (Array.isArray(state.projects) ? state.projects : []).filter((project) => {
    const isConfirmed = project?.confirmed === true || project?.confirmed === 'true';
    if (!isConfirmed) return false;
    const status = String(project?.status || '').trim().toLowerCase();
    const isCancelled = project?.cancelled === true
      || project?.cancelled === 'true'
      || status === 'cancelled'
      || status === 'canceled'
      || status === 'ملغي'
      || status === 'ملغى';
    return !isCancelled;
  });

  const totalProjects = summaryProjects.length;
  const upcoming = summaryProjects.filter((project) => {
    const start = project.start ? new Date(project.start) : null;
    if (!start || Number.isNaN(start.getTime())) return false;
    return start > new Date();
  }).length;
  const summaryBreakdown = computeProjectsRevenueBreakdown(
    summaryProjects,
    Array.isArray(state.reservations) ? state.reservations : [],
    PROJECT_TAX_RATE
  );
  const expensesTotal = Number(summaryBreakdown?.projectExpensesTotal || 0);
  const budgetTotal = Number(summaryBreakdown?.grossRevenue || 0);

  if (dom.projectsCount) dom.projectsCount.textContent = normalizeNumbers(String(totalProjects));
  if (dom.projectsUpcoming) dom.projectsUpcoming.textContent = normalizeNumbers(String(upcoming));
  if (dom.projectsExpenses) dom.projectsExpenses.textContent = formatCurrency(expensesTotal);
  if (dom.projectsBudget) dom.projectsBudget.textContent = formatCurrency(budgetTotal);
}

export function getReservationsForProject(projectId) {
  if (!projectId) return [];
  return state.reservations.filter((reservation) => {
    const pid = reservation?.projectId ?? reservation?.project_id ?? null;
    return pid != null && String(pid) === String(projectId);
  });
}

export function resolveProjectReservationCrewAssignments(reservation) {
  if (Array.isArray(reservation?.crewAssignments) && reservation.crewAssignments.length) {
    return reservation.crewAssignments;
  }
  if (Array.isArray(reservation?.techniciansDetails) && reservation.techniciansDetails.length) {
    return reservation.techniciansDetails;
  }
  return [];
}

export function resolveProjectReservationCrewCount(reservation) {
  const assignments = resolveProjectReservationCrewAssignments(reservation);
  if (assignments.length) return assignments.length;
  return Array.isArray(reservation?.technicians) ? reservation.technicians.length : 0;
}

export function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const crewAssignments = resolveProjectReservationCrewAssignments(reservation);
  const techniciansOrAssignments = crewAssignments.length
    ? crewAssignments
    : (Array.isArray(reservation.technicians) ? reservation.technicians : []);
  const calculatedBreakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds: Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] !== 'object'
      ? techniciansOrAssignments
      : [],
    crewAssignments: Array.isArray(techniciansOrAssignments) && techniciansOrAssignments.length && typeof techniciansOrAssignments[0] === 'object'
      ? techniciansOrAssignments
      : [],
    discount: discountValue,
    discountType,
    applyTax: false,
    start: reservation.start,
    end: reservation.end,
    companySharePercent: 0,
    groupingSource: reservation,
  });
  const calculated = Number(calculatedBreakdown?.finalTotal);

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}

function computeReservationEquipmentCount(reservation) {
  try {
    const { groups } = buildReservationDisplayGroups(reservation);
    return (groups || []).reduce((sum, g) => {
      const type = String(g?.type || '').toLowerCase();
      if (type === 'package') {
        return sum + 1;
      }
      const c = Number.isFinite(Number(g?.count)) ? Number(g.count)
        : (Number.isFinite(Number(g?.quantity)) ? Number(g.quantity) : 1);
      return sum + (c > 0 ? c : 1);
    }, 0);
  } catch (_) {
    const items = Array.isArray(reservation?.items) ? reservation.items : [];
    return items.length || 0;
  }
}

export function buildProjectReservationCard(reservation, index, project = null) {
  if (!reservation) return '';
  const reservationId = reservation.reservationId || reservation.id || `RES-${index + 1}`;
  const rawStatus = reservation.status || reservation.state || 'pending';
  const normalizedStatus = String(rawStatus).toLowerCase();
  const cancelled = reservation?.cancelled === true
    || reservation?.cancelled === 'true'
    || normalizedStatus === 'cancelled'
    || normalizedStatus === 'canceled'
    || normalizedStatus === 'ملغي'
    || normalizedStatus === 'ملغى';
  const completed = !cancelled && isReservationCompleted(reservation);
  // Link confirmation only after lifecycle states; cancelled/closed must keep their reservation tags.
  const { effectiveConfirmed } = resolveReservationProjectState(reservation, project);
  const finalStatus = cancelled
    ? 'cancelled'
    : completed
      ? 'completed'
      : effectiveConfirmed
        ? 'confirmed'
        : normalizedStatus;
  // Use the same translation keys used across reservations list to unify language/appearance
  const statusLabel = finalStatus === 'cancelled'
    ? stripReservationTagDecorators(t('reservations.list.lifecycle.cancelled', 'ملغي'))
    : finalStatus === 'completed'
      ? stripReservationTagDecorators(t('reservations.list.lifecycle.closed', 'مغلق'))
      : t(
          `reservations.list.status.${finalStatus}`,
          finalStatus === 'confirmed' ? '✅ مؤكد' : finalStatus === 'pending' ? '⏳ غير مؤكد' : finalStatus
        );
  const statusClassMap = {
    confirmed: 'reservation-chip status-confirmed project-reservation-card__badge--confirmed',
    pending: 'reservation-chip status-pending project-reservation-card__badge--pending',
    completed: 'reservation-chip status-completed project-reservation-card__badge--completed',
    cancelled: 'reservation-chip status-cancelled project-reservation-card__badge--cancelled',
    in_progress: 'reservation-chip status-info project-reservation-card__badge--info',
    ongoing: 'reservation-chip status-info project-reservation-card__badge--info'
  };
  const statusClass = statusClassMap[finalStatus] || 'reservation-chip status-info project-reservation-card__badge--info';
  // Link payment tag: support partial
  // When linked to a project, mirror the project's payment status on the reservation card
  const projectPaidRaw = typeof project?.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : null;
  const paidStatusRaw = projectPaidRaw && ['paid', 'partial', 'unpaid'].includes(projectPaidRaw)
    ? projectPaidRaw
    : String(
        reservation.paidStatus || reservation.paymentStatus || (reservation.paid ? 'paid' : 'unpaid')
      ).toLowerCase();
  const paidStatus = paidStatusRaw === 'paid' ? 'paid' : (paidStatusRaw === 'partial' ? 'partial' : 'unpaid');
  const paidLabel = paidStatus === 'paid'
    ? t('reservations.list.payment.paid', '💳 مدفوع')
    : paidStatus === 'partial'
      ? t('reservations.list.payment.partial', '💳 مدفوع جزئياً')
      : t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paidClass = paidStatus === 'paid'
    ? 'reservation-chip status-paid project-reservation-card__badge--paid'
    : paidStatus === 'partial'
      ? 'reservation-chip status-partial project-reservation-card__badge--partial'
      : 'reservation-chip status-unpaid project-reservation-card__badge--unpaid';
  // Vertical meta: crew count, equipment count, and total only
  const { applyTax: projectApplyTax, sharePercent: projectSharePercent, enabled: projectShareEnabled } = resolveProjectOverheadSettings(project, {
    applyTaxRaw: project?.applyTax === true || project?.applyTax === 'true',
  });
  const netTotal = applyProjectItemOverhead(resolveReservationNetTotal(reservation), {
    applyTax: projectApplyTax,
    companyShareEnabled: projectShareEnabled,
    companySharePercent: projectSharePercent,
  });
  const costLabel = formatCurrency(netTotal);
  const equipmentCount = computeReservationEquipmentCount(reservation);
  const crewCount = resolveProjectReservationCrewCount(reservation);
  const crewTitle = t('projectCards.stats.crewCount', 'عدد الطاقم');
  const equipmentTitle = t('projectCards.stats.equipmentCount', 'عدد المعدات');
  const totalTitle = t('projectCards.stats.reservationTotal', 'إجمالي الحجز');

  return `
    <article class="project-reservation-card" data-action="view-reservation" data-index="${index}" data-reservation-index="${index}" data-project-id="${project ? project.id : ''}" role="button" tabindex="0">
      <div class="project-reservation-card__header">
        <span class="project-reservation-card__id">#${escapeHtml(reservationId)}</span>
        <div class="project-reservation-card__badges">
          <span class="project-reservation-card__badge ${statusClass}">${escapeHtml(statusLabel)}</span>
          <span class="project-reservation-card__badge ${paidClass}">${escapeHtml(paidLabel)}</span>
        </div>
      </div>
      <div class="project-reservation-card__body">
        <div class="project-reservation-card__meta project-reservation-card__meta--vertical">
          <span>😎 ${escapeHtml(crewTitle)}: ${normalizeNumbers(String(crewCount))}</span>
          <span>📦 ${escapeHtml(equipmentTitle)}: ${normalizeNumbers(String(equipmentCount))}</span>
          <span>💵 ${escapeHtml(totalTitle)}: ${escapeHtml(costLabel)}</span>
        </div>
      </div>
    </article>
  `;
}

export function buildProjectReservationsSection(project) {
  const reservations = getReservationsForProject(project.id)
    .map((reservation) => {
      const rid = reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_code ?? reservation?.reservation_id;
      const index = state.reservations.findIndex((entry) => {
        const cand = entry?.id ?? entry?.reservationId ?? entry?.reservation_code ?? entry?.reservation_id;
        return rid != null && cand != null && String(cand) === String(rid);
      });
      return { reservation, index };
    })
    .filter(({ index }) => Number.isInteger(index) && index >= 0)
    .sort((a, b) => {
      const aStart = a.reservation.start ? new Date(a.reservation.start).getTime() : 0;
      const bStart = b.reservation.start ? new Date(b.reservation.start).getTime() : 0;
      return bStart - aStart;
    });

  const title = t('projects.details.reservations.title', 'الحجوزات المرتبطة');
  const emptyText = t('projects.details.reservations.empty', 'لا توجد حجوزات مرتبطة بهذا المشروع بعد.');
  const listMarkup = reservations.length
    ? `<div class="project-reservations-list">${reservations.map(({ reservation, index }) => buildProjectReservationCard(reservation, index, project)).join('')}</div>`
    : `<p class="linked-records-empty-copy project-reservations-empty mb-0">${escapeHtml(emptyText)}</p>`;

  return `
    <section class="project-reservations-section">
      <div class="project-reservations-header d-flex align-items-center gap-2 flex-wrap">
        <h6 class="mb-0">${escapeHtml(title)}</h6>
      </div>
      ${listMarkup}
    </section>
  `;
}
