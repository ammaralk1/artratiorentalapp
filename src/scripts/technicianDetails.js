import { resolveQuickDateRange } from "./reservationsFilters.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { loadData } from "./storage.js";
import { t } from "./language.js";
import { ensureReservationsLoaded } from "./reservationsActions.js";
import { getReservationsState } from "./reservationsService.js";
import {
  getReservationUIHandler,
  waitForReservationUIHandler
} from "./reservations/uiBridge.js";
import {
  buildProjectFocusCard,
  buildProjectDetailsMarkup,
  buildProjectEditMarkup,
  buildProjectEditExpensesMarkup,
  syncProjectReservationsPayment,
  getProjectIdentifier,
  combineDateAndTime,
  extractReservationProjectId,
  PROJECT_TAX_RATE
} from "./projectFocusTemplates.js";
import { calculateProjectExpenses } from "./projectsCommon.js";
import { updateProjectApi, buildProjectPayload } from "./projectsService.js";
import {
  calculateProjectFinancials,
  ensureProjectCompanyShareEnabled,
  getProjectCompanySharePercent
} from "./projects/form.js";
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus
} from "./reservationsSummary.js";
import { resolveReservationProjectState } from "./reservationsShared.js";

let lastTechnicianFilters = {};
let technicianProjectsContext = {
  initialized: false,
  currentId: null,
  modal: {
    el: null,
    body: null
  },
  projectsMap: new Map()
};
let technicianReservationsHydrated = false;

function normalizeSearchText(value = "") {
  return normalizeNumbers(String(value))
    .replace(/[٬،]/g, '')
    .trim()
    .toLowerCase();
}

function applyQuickRangeToInputs(range, startInput, endInput) {
  if (!startInput || !endInput) return;
  const { startDate, endDate } = resolveQuickDateRange(range);

  if (startInput._flatpickr) {
    if (startDate) {
      startInput._flatpickr.setDate(startDate, false, "Y-m-d");
    } else {
      startInput._flatpickr.clear();
    }
  } else {
    startInput.value = startDate || "";
  }

  if (endInput._flatpickr) {
    if (endDate) {
      endInput._flatpickr.setDate(endDate, false, "Y-m-d");
    } else {
      endInput._flatpickr.clear();
    }
  } else {
    endInput.value = endDate || "";
  }
}

export function normalizeTechnicianAssignments(technicians) {
  if (!Array.isArray(technicians)) return [];
  const seen = new Set();
  return technicians
    .map((entry) => {
      if (entry == null) return null;
      if (typeof entry === 'object') {
        const id = entry.id ?? entry.technicianId ?? entry.technician_id ?? entry.technician?.id ?? null;
        return id != null ? String(id) : null;
      }
      if (typeof entry === 'string' || typeof entry === 'number') {
        return String(entry);
      }
      return null;
    })
    .filter((id) => {
      if (!id) return false;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
}

export async function renderTechnicianReservations(technicianId) {
  const container = document.getElementById("technician-reservations");
  if (!container) return;

  if (!technicianReservationsHydrated) {
    try {
      await ensureReservationsLoaded({ suppressError: false, force: true });
    } catch (error) {
      console.error('❌ [technician-details] Failed to hydrate reservations list', error);
      container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="technicianDetails.errors.reservationsLoadFailed">${t('technicianDetails.errors.reservationsLoadFailed', '❌ تعذر تحميل حجوزات هذا العضو حالياً.')}</p>`;
      return;
    }

    technicianReservationsHydrated = true;
  }

  const searchInput = document.getElementById("technician-search-reservation");
  const startInput = document.getElementById("technician-filter-start-date");
  const endInput = document.getElementById("technician-filter-end-date");
  const rangeSelect = document.getElementById("technician-reservation-date-range");
  const statusSelect = document.getElementById("technician-reservation-status-filter");
  const clearBtn = document.getElementById("technician-clear-filters");

  if (window.flatpickr) {
    if (startInput) window.flatpickr(startInput, { dateFormat: "Y-m-d" });
    if (endInput) window.flatpickr(endInput, { dateFormat: "Y-m-d" });
  }

  const collectFilters = () => {
    let startDate = normalizeNumbers(startInput?.value || "").trim();
    let endDate = normalizeNumbers(endInput?.value || "").trim();
    let quickRange = rangeSelect?.value || "";

    const allowedRanges = new Set(["", "today", "week", "month"]);
    if (!allowedRanges.has(quickRange)) {
      quickRange = "";
      if (rangeSelect) rangeSelect.value = "";
      if (startInput) {
        if (startInput._flatpickr) startInput._flatpickr.clear();
        startInput.value = "";
      }
      if (endInput) {
        if (endInput._flatpickr) endInput._flatpickr.clear();
        endInput.value = "";
      }
      startDate = "";
      endDate = "";
    }

    if (!startDate && !endDate && quickRange) {
      const { startDate: resolvedStart, endDate: resolvedEnd } = resolveQuickDateRange(quickRange);
      startDate = resolvedStart;
      endDate = resolvedEnd;
    }

    const searchValue = normalizeSearchText(searchInput?.value || "");

    return {
      searchTerm: searchValue,
      startDate,
      endDate,
      status: statusSelect?.value || "",
      quickRange,
      technicianId
    };
  };

  const applyFilters = () => {
    lastTechnicianFilters = collectFilters();
    void lazyRenderReservations("technician-reservations", lastTechnicianFilters);
  };

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      applyFilters();
    });
    searchInput.dataset.listenerAttached = "true";
  }

  if (startInput && !startInput.dataset.listenerAttached) {
    startInput.addEventListener("change", () => {
      if (rangeSelect) rangeSelect.value = "";
      applyFilters();
    });
    startInput.dataset.listenerAttached = "true";
  }

  if (endInput && !endInput.dataset.listenerAttached) {
    endInput.addEventListener("change", () => {
      if (rangeSelect) rangeSelect.value = "";
      applyFilters();
    });
    endInput.dataset.listenerAttached = "true";
  }

  if (rangeSelect && !rangeSelect.dataset.listenerAttached) {
    rangeSelect.addEventListener("change", () => {
      applyQuickRangeToInputs(rangeSelect.value, startInput, endInput);
      applyFilters();
    });
    rangeSelect.dataset.listenerAttached = "true";
  }

  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener("change", applyFilters);
    statusSelect.dataset.listenerAttached = "true";
  }

  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (startInput) {
        if (startInput._flatpickr) startInput._flatpickr.clear();
        startInput.value = "";
      }
      if (endInput) {
        if (endInput._flatpickr) endInput._flatpickr.clear();
        endInput.value = "";
      }
      if (rangeSelect) rangeSelect.value = "";
      if (statusSelect) statusSelect.value = "";
      applyFilters();
    });
    clearBtn.dataset.listenerAttached = "true";
  }

  window.refreshTechnicianReservationsViews = () => {
    void lazyRenderReservations("technician-reservations", lastTechnicianFilters);
  };

  applyFilters();
}

export function renderTechnicianProjects(technicianId) {
  technicianProjectsContext.currentId = technicianId;
  const { container } = getTechnicianProjectsElements();
  if (!container) return;

  if (!technicianProjectsContext.initialized) {
    setupTechnicianProjectsUI();
    attachTechnicianProjectCardEvents();
    setupTechnicianProjectModal();
    document.addEventListener('projects:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('language:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('customers:changed', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    document.addEventListener('technicians:updated', () => {
      if (technicianProjectsContext.currentId) {
        updateTechnicianProjects();
      }
    });
    technicianProjectsContext.initialized = true;
  }

  updateTechnicianProjects();
}

function getTechnicianProjectsElements() {
  return {
    container: document.getElementById('technician-projects'),
    searchInput: document.getElementById('technician-project-search'),
    startInput: document.getElementById('technician-project-start-date'),
    endInput: document.getElementById('technician-project-end-date'),
    rangeSelect: document.getElementById('technician-project-date-range'),
    statusSelect: document.getElementById('technician-project-status-filter'),
    clearBtn: document.getElementById('technician-projects-clear-filters')
  };
}

function setupTechnicianProjectsUI() {
  const { searchInput, statusSelect, clearBtn, startInput, endInput, rangeSelect } = getTechnicianProjectsElements();

  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      updateTechnicianProjects();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  if (startInput && !startInput.dataset.listenerAttached) {
    if (window.flatpickr) {
      window.flatpickr(startInput, { dateFormat: 'Y-m-d' });
    }
    startInput.addEventListener('change', () => {
      if (rangeSelect) rangeSelect.value = '';
      updateTechnicianProjects();
    });
    startInput.dataset.listenerAttached = 'true';
  }

  if (endInput && !endInput.dataset.listenerAttached) {
    if (window.flatpickr) {
      window.flatpickr(endInput, { dateFormat: 'Y-m-d' });
    }
    endInput.addEventListener('change', () => {
      if (rangeSelect) rangeSelect.value = '';
      updateTechnicianProjects();
    });
    endInput.dataset.listenerAttached = 'true';
  }

  if (rangeSelect && !rangeSelect.dataset.listenerAttached) {
    rangeSelect.addEventListener('change', () => {
      applyQuickRangeToInputs(rangeSelect.value, startInput, endInput);
      updateTechnicianProjects();
    });
    rangeSelect.dataset.listenerAttached = 'true';
  }

  if (statusSelect && !statusSelect.dataset.listenerAttached) {
    statusSelect.addEventListener('change', () => {
      updateTechnicianProjects();
    });
    statusSelect.dataset.listenerAttached = 'true';
  }

  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', () => {
      const {
        searchInput: sInput,
        statusSelect: sSelect,
        startInput: sStart,
        endInput: sEnd,
        rangeSelect: sRange
      } = getTechnicianProjectsElements();
      if (sInput) sInput.value = '';
      if (sSelect) sSelect.value = '';
      if (sStart) {
        if (sStart._flatpickr) sStart._flatpickr.clear();
        sStart.value = '';
      }
      if (sEnd) {
        if (sEnd._flatpickr) sEnd._flatpickr.clear();
        sEnd.value = '';
      }
      if (sRange) sRange.value = '';
      updateTechnicianProjects();
    });
    clearBtn.dataset.listenerAttached = 'true';
  }
}

function attachTechnicianProjectCardEvents() {
  const { container } = getTechnicianProjectsElements();
  if (!container || container.dataset.projectModalListenerAttached === 'true') return;
  container.addEventListener('click', handleTechnicianProjectCardClick);
  container.dataset.projectModalListenerAttached = 'true';
}

function bindTechnicianProjectCards() {
  const { container } = getTechnicianProjectsElements();
  if (!container) return;

  container.querySelectorAll('.project-focus-card').forEach((card) => {
    if (card.dataset.technicianModalListenerAttached === 'true') return;

    card.addEventListener('click', (event) => {
      const ignored = event.target.closest('[data-ignore-project-modal]');
      if (ignored) return;
      const projectId = card.dataset.projectId ? String(card.dataset.projectId) : '';
      if (!projectId) return;
      openTechnicianProjectDetails(projectId);
    });

    card.dataset.technicianModalListenerAttached = 'true';
  });
}

function handleTechnicianProjectCardClick(event) {
  const card = event.target.closest('.project-focus-card');
  if (!card) return;
  console.debug('[technician] card click', card.dataset.projectId);
  if (!card) return;
  const ignored = event.target.closest('[data-ignore-project-modal]');
  if (ignored) return;
  const projectId = card.dataset.projectId ? String(card.dataset.projectId) : '';
  if (!projectId) return;
  openTechnicianProjectDetails(projectId);
}

function setupTechnicianProjectModal() {
  ensureTechnicianProjectModal();
}

function ensureTechnicianProjectModal() {
  if (technicianProjectsContext.modal?.el && technicianProjectsContext.modal?.body) {
    return true;
  }
  const modalEl = document.getElementById('projectDetailsModal');
  const modalBody = document.getElementById('project-details-body');
  if (!modalEl || !modalBody) {
    return false;
  }
  technicianProjectsContext.modal = {
    el: modalEl,
    body: modalBody
  };
  return true;
}

function updateTechnicianProjects() {
  const { container, searchInput, statusSelect, startInput, endInput } = getTechnicianProjectsElements();
  if (!container || !technicianProjectsContext.currentId) return;

  const searchTerm = normalizeSearchText(searchInput?.value || '');
  const statusFilter = statusSelect?.value || '';
  const startValue = startInput?.value || '';
  const endValue = endInput?.value || '';
  const startDateObj = startValue ? new Date(`${startValue}T00:00:00`) : null;
  const endDateObj = endValue ? new Date(`${endValue}T23:59:59`) : null;

  const { projects = [], customers = [], technicians = [], reservations = [] } = loadData();
  const customerMap = new Map(customers.map((customer) => [String(customer.id), customer]));
  const techniciansMap = new Map(technicians.map((tech) => [String(tech.id), tech]));
  const projectsMap = new Map(projects.map((project) => [String(project.id), project]));
  const reservationsByProject = groupReservationsByProject(reservations);

  const normalizedId = String(technicianProjectsContext.currentId);
  const aggregatedProjects = new Map();

  const addProject = (project, normalizedTechnicians = null) => {
    if (!project) return;
    const key = project.id != null ? String(project.id) : (project.projectId != null ? String(project.projectId) : null);
    if (!key) return;
    if (!aggregatedProjects.has(key)) {
      const techniciansList = normalizedTechnicians ?? normalizeTechnicianAssignments(project?.technicians);
      aggregatedProjects.set(key, {
        ...project,
        technicians: techniciansList
      });
    }
  };

  projects.forEach((project) => {
    const technicianIds = normalizeTechnicianAssignments(project?.technicians);
    if (!technicianIds.length) return;
    if (!technicianIds.includes(normalizedId)) return;
    addProject({
      ...project,
      technicians: technicianIds
    }, technicianIds);
  });

  reservations.forEach((reservation) => {
    if (!reservation?.projectId) return;
    const technicianIds = normalizeTechnicianAssignments(reservation.technicians);
    if (!technicianIds.includes(normalizedId)) return;

    const projectId = String(reservation.projectId);
    const existingAggregated = aggregatedProjects.get(projectId);
    const existing = projectsMap.get(projectId);
    const { effectiveConfirmed } = resolveReservationProjectState(reservation, existing ?? existingAggregated ?? null);
    if (existingAggregated) {
      const existingTechnicians = normalizeTechnicianAssignments(existingAggregated.technicians);
      const mergedTechnicians = Array.from(new Set([...existingTechnicians, ...technicianIds]));
      aggregatedProjects.set(projectId, {
        ...existingAggregated,
        technicians: mergedTechnicians,
        confirmed: existingAggregated.confirmed || effectiveConfirmed
      });
      return;
    }

    if (existing) {
      const existingTechnicians = normalizeTechnicianAssignments(existing?.technicians);
      const mergedTechnicians = Array.from(new Set([...existingTechnicians, ...technicianIds]));
      addProject({
        ...existing,
        technicians: mergedTechnicians,
        confirmed: resolveReservationProjectState(reservation, existing).effectiveConfirmed
      }, mergedTechnicians);
      return;
    }

    addProject({
      id: projectId,
      title: reservation.projectTitle || reservation.title || reservation.project_title || `#${projectId}`,
      description: reservation.notes || '',
      start: reservation.projectStart || reservation.start || null,
      end: reservation.projectEnd || reservation.end || null,
      technicians: technicianIds,
      clientId: reservation.projectClientId ?? reservation.customerId ?? null,
      confirmed: effectiveConfirmed,
      status: reservation.status ?? null,
      equipmentEstimate: reservation.totalAmount ?? reservation.total_amount ?? 0,
      createdAt: reservation.start ?? reservation.created_at ?? null,
    }, technicianIds);
  });

  const relevant = Array.from(aggregatedProjects.values());

  technicianProjectsContext.projectsMap = aggregatedProjects;
  if (typeof window === 'object') {
    window.__ART_RATIO_APP_DEBUG = {
      ...(window.__ART_RATIO_APP_DEBUG || {}),
      technicianProjects: {
        projectsMap: aggregatedProjects,
        keys: () => Array.from(aggregatedProjects.keys())
      }
    };
  }

  const filtered = relevant.filter((project) => {
    if (searchTerm) {
      const clientName = customerMap.get(String(project.clientId))?.customerName || '';
      const projectIdentifiers = [
        project.id,
        project.projectId,
        project.project_id,
        project.projectCode,
        project.project_code,
        project.reference,
        project.reference_code,
        project.code,
        getProjectIdentifier(project)
      ];
      const haystack = normalizeSearchText([
        project.title,
        project.description,
        clientName,
        projectIdentifiers
          .filter((value) => value !== null && value !== undefined && value !== '')
          .map(String)
          .join(' ')
      ].filter(Boolean).join(' '));
      if (!haystack.includes(searchTerm)) return false;
    }

    if (statusFilter) {
      const projectStatus = determineProjectStatus(project);
      if (projectStatus !== statusFilter) return false;
    }

    if (startDateObj || endDateObj) {
      const projectStartRaw = project.start || project.createdAt || project.created_at || null;
      const projectEndRaw = project.end || project.projectEnd || project.project_end || null;
      const projectStart = projectStartRaw ? new Date(projectStartRaw) : null;
      const projectEnd = projectEndRaw ? new Date(projectEndRaw) : projectStart;

      if (startDateObj && projectStart && projectStart < startDateObj) {
        return false;
      }
      if (endDateObj && projectEnd && projectEnd > endDateObj) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    const aDate = new Date(a.start || a.createdAt || 0).getTime();
    const bDate = new Date(b.start || b.createdAt || 0).getTime();
    return bDate - aDate;
  });

  if (!filtered.length) {
    const emptyMessage = t('technicianProjects.empty', container.dataset.empty || 'لا توجد مشاريع مرتبطة بهذا العضو.');
    container.innerHTML = `<div class="project-card-grid__item project-card-grid__item--full"><div class="alert alert-info text-center mb-0">${emptyMessage}</div></div>`;
    return;
  }

  container.innerHTML = filtered
    .map((project) => {
      const projectKey = getProjectIdentifier(project);
      const linkedReservations = projectKey ? reservationsByProject.get(projectKey) || [] : [];
      const customer = customerMap.get(String(project.clientId)) || null;
      return buildProjectFocusCard(project, {
        customer,
        techniciansMap,
        reservations: linkedReservations
      });
    })
    .join('');

  bindTechnicianProjectCards();
}

function groupReservationsByProject(reservations = []) {
  const map = new Map();
  reservations.forEach((reservation) => {
    const key = reservation?.projectId ?? reservation?.project_id ?? reservation?.projectID;
    if (key == null) return;
    const mapKey = String(key);
    if (!map.has(mapKey)) {
      map.set(mapKey, []);
    }
    map.get(mapKey).push(reservation);
  });
  return map;
}

function openTechnicianProjectDetails(projectId) {
  const normalizedId = String(projectId || '').trim();
  console.debug('[technician] open details', normalizedId);
  if (!normalizedId) return;
  if (!ensureTechnicianProjectModal()) return;

  const modal = technicianProjectsContext.modal;
  if (!modal?.body) return;

  const { projects = [], reservations = [], customers = [] } = loadData();
  const aggregatedProject = technicianProjectsContext.projectsMap?.get(normalizedId) || null;
  let project = aggregatedProject ?? findProjectByIdentifier(projects, normalizedId);
  if (!project) {
    project = findProjectByIdentifier(projects, normalizedId);
  }
  if (!project) return;

  const activeTechnicianId = String(technicianProjectsContext.currentId || '');
  let normalizedTechnicians = normalizeTechnicianAssignments(project.technicians);
  if (!normalizedTechnicians.length && aggregatedProject) {
    normalizedTechnicians = normalizeTechnicianAssignments(aggregatedProject.technicians);
    project = {
      ...aggregatedProject,
      ...project
    };
  }

  if (typeof window === 'object') {
    window.__ART_RATIO_APP_DEBUG = {
      ...(window.__ART_RATIO_APP_DEBUG || {}),
      technicianProjects: {
        ...(window.__ART_RATIO_APP_DEBUG?.technicianProjects || {}),
        lastOpen: {
          id: normalizedId,
          activeTechnicianId,
          normalizedTechnicians
        }
      }
    };
  }

  if (activeTechnicianId && !normalizedTechnicians.includes(activeTechnicianId)) {
    console.debug('[technician] open details skipped (technician not in project)', { normalizedId, activeTechnicianId, normalizedTechnicians });
    return;
  }

  project = {
    ...project,
    technicians: normalizedTechnicians
  };

  const customer = customers.find((entry) => String(entry.id) === String(project.clientId)) || null;
  const linkedReservations = reservations.filter((reservation) => {
    const reservationProjectId = extractReservationProjectId(reservation);
    return reservationProjectId && reservationProjectId === normalizedId;
  });

  modal.body.dataset.mode = 'view';
  modal.body.innerHTML = buildProjectDetailsMarkup(project, {
    customer,
    reservations: linkedReservations
  });
  attachTechnicianProjectDetailsActions(project);
  attachTechnicianReservationViewHandlers(modal.body);

  if (window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modal.el).show();
  } else {
    modal.el.classList.add('show');
    modal.el.style.display = 'block';
  }
}

function attachTechnicianProjectDetailsActions(project) {
  if (!project || !technicianProjectsContext.modal?.body) return;

  const editBtn = technicianProjectsContext.modal.body.querySelector('[data-action="edit-project"]');
  if (!editBtn) return;

  editBtn.addEventListener('click', (event) => {
    event.preventDefault();
    openTechnicianProjectEdit(project);
  });
}

function attachTechnicianReservationViewHandlers(modalBody) {
  if (!modalBody) return;
  const buttons = modalBody.querySelectorAll('[data-action="view-reservation"]');
  if (!buttons.length) return;

  async function openReservationDetails(index) {
    if (!Number.isInteger(index) || index < 0) {
      return false;
    }

    const immediate = getReservationUIHandler('showReservationDetails');
    if (typeof immediate === 'function') {
      immediate(index);
      return true;
    }

    try {
      const handler = await waitForReservationUIHandler('showReservationDetails');
      if (typeof handler === 'function') {
        handler(index);
        return true;
      }
    } catch (error) {
      console.warn('⚠️ [technicianDetails] Unable to resolve reservation UI handler', error);
    }
    return false;
  }

  buttons.forEach((button) => {
    if (button.dataset.listenerAttached === 'true') return;
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const reservationsState = getReservationsState();
      let index = Number.parseInt(button.dataset.index || '', 10);
      if (!Number.isInteger(index) || index < 0) {
        const reservationId = button.dataset.reservationId;
        if (reservationId) {
          const matchedIndex = reservationsState.findIndex((entry) => {
            const candidates = [entry?.id, entry?.reservationId, entry?.reservation_id];
            return candidates.some((value) => value != null && String(value) === reservationId);
          });
          index = matchedIndex;
        }
      }

      const opened = await openReservationDetails(index);
      if (!opened) {
        showToast(t('projects.details.reservations.viewUnavailable', 'تعذر فتح تفاصيل الحجز الآن'));
      }
    });
    button.dataset.listenerAttached = 'true';
  });
}

function openTechnicianProjectEdit(project) {
  if (!project || !ensureTechnicianProjectModal()) return;

  const modal = technicianProjectsContext.modal;
  if (!modal?.body) return;

  const { customers = [] } = loadData();
  const customer = customers.find((entry) => String(entry.id) === String(project.clientId)) || null;
  const clientName = customer?.customerName || project.clientName || project.customerName || '';
  const clientCompany = project.clientCompany || customer?.companyName || customer?.company || '';
  const normalizedExpenses = Array.isArray(project?.expenses)
    ? project.expenses.map((expense, index) => ({
        id: expense?.id || `expense-${project.id}-${index}-${Date.now()}`,
        label: expense?.label || '',
        amount: Number(expense?.amount) || 0
      }))
    : [];

  modal.body.dataset.mode = 'edit';
  modal.body.innerHTML = buildProjectEditMarkup(project, {
    clientName,
    clientCompany
  });
  bindTechnicianProjectEditForm(project, {
    clientName,
    clientCompany,
    expenses: normalizedExpenses
  });
}

function bindTechnicianProjectEditForm(project, { clientName = '', clientCompany = '', expenses = [] } = {}) {
  const modalBody = technicianProjectsContext.modal?.body;
  if (!project || !modalBody) return;

  const form = modalBody.querySelector('#project-details-edit-form');
  if (!form) return;

  const editState = {
    clientName,
    clientCompany,
    expenses: Array.isArray(expenses) ? [...expenses] : []
  };

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      openTechnicianProjectDetails(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
  const expenseNoteInput = form.querySelector('#project-edit-expense-note');
  const addExpenseBtn = form.querySelector('[data-action="add-expense"]');
  const expensesContainer = form.querySelector('#project-edit-expense-list');
  const startDateInput = form.querySelector('[name="project-start-date"]');
  const startTimeInput = form.querySelector('[name="project-start-time"]');
  const endDateInput = form.querySelector('[name="project-end-date"]');
  const endTimeInput = form.querySelector('[name="project-end-time"]');
  const paymentStatusSelect = form.querySelector('#project-edit-payment-status');
  const taxCheckbox = form.querySelector('#project-edit-tax');
  const shareCheckbox = form.querySelector('#project-edit-company-share');
  const discountTypeSelect = form.querySelector('#project-edit-discount-type');
  const discountInput = form.querySelector('#project-edit-discount');
  const paymentProgressTypeSelect = form.querySelector('#project-edit-payment-progress-type');
  const paymentProgressValueInput = form.querySelector('#project-edit-payment-progress-value');

  let isSyncingShareTax = false;

  const syncShareAndTax = (source) => {
    if (!taxCheckbox || !shareCheckbox) return;
    if (isSyncingShareTax) return;
    isSyncingShareTax = true;

    if (source === 'share') {
      if (shareCheckbox.checked) {
        if (!taxCheckbox.checked) {
          taxCheckbox.checked = true;
        }
        ensureProjectCompanyShareEnabled(shareCheckbox, DEFAULT_COMPANY_SHARE_PERCENT);
      } else if (taxCheckbox.checked) {
        taxCheckbox.checked = false;
      }
    } else if (source === 'tax') {
      if (taxCheckbox.checked) {
        ensureProjectCompanyShareEnabled(shareCheckbox, DEFAULT_COMPANY_SHARE_PERCENT);
      } else if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }

    isSyncingShareTax = false;
  };

  const renderExpenses = () => {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  };

  renderExpenses();

  if (addExpenseBtn && !addExpenseBtn.dataset.listenerAttached) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);

      if (!label) {
        showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
        expenseLabelInput?.focus();
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
        expenseAmountInput?.focus();
        return;
      }

      editState.expenses.push({
        id: `expense-${project.id}-${Date.now()}`,
        label,
        amount,
        note: (expenseNoteInput?.value || '').trim()
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      if (expenseNoteInput) expenseNoteInput.value = '';
      renderExpenses();
    });
    addExpenseBtn.dataset.listenerAttached = 'true';
  }

  if (expensesContainer && !expensesContainer.dataset.listenerAttached) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
    });
    expensesContainer.dataset.listenerAttached = 'true';
  }

  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  if (paymentStatusSelect && !paymentStatusSelect.dataset.listenerAttached) {
    paymentStatusSelect.addEventListener('change', () => {
      paymentStatusSelect.dataset.userSelected = 'true';
    });
    paymentStatusSelect.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => syncShareAndTax('share'));
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => syncShareAndTax('tax'));
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox?.checked) {
    ensureProjectCompanyShareEnabled(shareCheckbox, DEFAULT_COMPANY_SHARE_PERCENT);
  }

  syncShareAndTax(shareCheckbox?.checked ? 'share' : 'tax');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = startDateInput?.value.trim() || '';
    const startTimeValue = startTimeInput?.value.trim() || '';
    const descriptionValue = descriptionInput?.value.trim() || '';

    const selectedPaymentStatusRaw = paymentStatusSelect?.value?.toLowerCase() || 'unpaid';
    const normalizedPaymentStatus = ['paid', 'partial'].includes(selectedPaymentStatusRaw)
      ? selectedPaymentStatusRaw
      : 'unpaid';

    const applyTax = taxCheckbox?.checked === true;

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = endDateInput?.value.trim() || '';
    const endTimeValue = endTimeInput?.value.trim() || '';

    const startIso = combineDateAndTime(startDateValue, startTimeValue);
    const endIso = endDateValue ? combineDateAndTime(endDateValue, endTimeValue) : '';

    if (endIso) {
      const startDate = new Date(startIso);
      const endDate = new Date(endIso);
      if (!Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime()) && startDate > endDate) {
        showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
        endDateInput?.focus();
        return;
      }
    }

    const identifier = getProjectIdentifier(project);
    if (!identifier) {
      showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
      return;
    }

    const equipmentEstimate = Number(project?.equipmentEstimate ?? project?.equipment_estimate ?? 0) || 0;
    const expensesTotal = editState.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);

    const discountType = discountTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const discountRaw = normalizeNumbers(discountInput?.value || '0');
    let discountValue = Number.parseFloat(discountRaw);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      discountValue = 0;
    }

    const companyShareEnabled = shareCheckbox?.checked === true;
    let companySharePercent = companyShareEnabled ? getProjectCompanySharePercent(shareCheckbox) : null;
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      companySharePercent = companyShareEnabled && applyTax ? DEFAULT_COMPANY_SHARE_PERCENT : null;
    }

    const finance = calculateProjectFinancials({
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountType,
      applyTax,
      companyShareEnabled,
      companySharePercent,
    });

    const paymentProgressType = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const progressRaw = normalizeNumbers(paymentProgressValueInput?.value || '');
    const progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;
    const paymentProgress = calculatePaymentProgress({
      totalAmount: finance.totalWithTax,
      progressType: paymentProgressType,
      progressValue,
      history: [],
    });

    const manualStatusSelected = paymentStatusSelect?.dataset?.userSelected === 'true';
    const effectivePaymentStatus = determinePaymentStatus({
      manualStatus: manualStatusSelected ? normalizedPaymentStatus : null,
      paidAmount: paymentProgress.paidAmount,
      paidPercent: paymentProgress.paidPercent,
      totalAmount: finance.totalWithTax,
    });
    const paymentStatusValue = manualStatusSelected ? normalizedPaymentStatus : effectivePaymentStatus;

    if (!manualStatusSelected && paymentStatusSelect) {
      paymentStatusSelect.value = paymentStatusValue;
    }
    if (paymentStatusSelect?.dataset) {
      delete paymentStatusSelect.dataset.userSelected;
    }

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: editState.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      expenses: editState.expenses,
      discount: discountValue,
      discountType,
      companyShareEnabled: companyShareEnabled && applyTax,
      companySharePercent: companyShareEnabled && applyTax ? companySharePercent : null,
      companyShareAmount: finance.companyShareAmount,
      taxAmount: finance.taxAmount,
      totalWithTax: finance.totalWithTax,
      confirmed: project.confirmed,
      technicians: Array.isArray(project?.technicians) ? project.technicians : [],
      equipment: Array.isArray(project?.equipment) ? project.equipment : [],
      paidAmount: paymentProgress.paidAmount,
      paidPercentage: paymentProgress.paidPercent,
      paymentProgressType: paymentProgress.paymentProgressType,
      paymentProgressValue: paymentProgress.paymentProgressValue,
    });

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.textContent || '';
      submitBtn.textContent = t('projects.details.edit.saving', 'جاري الحفظ...');
    }

    form.dataset.submitting = 'true';

    try {
      const updated = await updateProjectApi(identifier, payload);
      await syncProjectReservationsPayment(identifier, paymentStatusValue);
      document.dispatchEvent(new CustomEvent('projects:changed'));
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      updateTechnicianProjects();
      const nextIdentifier = getProjectIdentifier(updated) || identifier;
      if (nextIdentifier) {
        openTechnicianProjectDetails(nextIdentifier);
      }
    } catch (error) {
      console.error('❌ [technicianDetails] Failed to update project from modal', error);
      const message = typeof error?.message === 'string'
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
      if (submitBtn) {
        submitBtn.disabled = false;
        if (submitBtn.dataset.originalText) {
          submitBtn.textContent = submitBtn.dataset.originalText;
          delete submitBtn.dataset.originalText;
        }
      }
    }
  });
}

function findProjectByIdentifier(projects = [], identifier) {
  const normalized = String(identifier);
  return projects.find((project) => {
    const keys = [project?.id, project?.projectId, project?.project_id];
    return keys.some((value) => value != null && String(value) === normalized);
  }) || null;
}

function determineProjectStatus(project) {
  const now = new Date();
  const start = project.start ? new Date(project.start) : null;
  const end = project.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }

  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }

  return 'ongoing';
}
async function lazyRenderReservations(containerId, filters) {
  try {
    const m = await import('./reservationsUI.js');
    try { m.renderReservations?.(containerId, filters); } catch (e) { console.error('❌ [technician-details] renderReservations failed', e); }
  } catch (e) {
    console.error('❌ [technician-details] Failed to load reservations UI module', e);
  }
}
