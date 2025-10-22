import { normalizeNumbers, showToast } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import { syncTechniciansStatuses } from './technicians.js';
import { loadData } from './storage.js';
import { combineDateTime, hasTechnicianConflict } from './reservations/state.js';
import {
  ensureTechnicianPositionsLoaded,
  getTechnicianPositionsCache,
  findPositionByName,
} from './technicianPositions.js';

const DEFAULT_CURRENCY_LABEL = () => t('reservations.create.summary.currency', 'SR');

let cachedTechnicians = [];
let cachedPositions = [];
let selectedAssignments = [];
let editingAssignments = [];
let crewPickerContext = 'create';

let onDraftSelectionChange = () => {};
let onEditSelectionChange = () => {};

function generateAssignmentId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `crew-assignment-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneAssignment(assignment = {}) {
  return {
    ...assignment,
    assignmentId: assignment.assignmentId || generateAssignmentId(),
  };
}

function getTechnicianByIdLocal(id) {
  if (!id) return null;
  const normalized = String(id);
  const match = cachedTechnicians.find((tech) => String(tech?.id) === normalized);
  if (match) {
    return { ...match };
  }
  const { technicians = [] } = loadData();
  return technicians.find((tech) => String(tech?.id) === normalized) || null;
}

function resolvePositionLabel(position = {}, language = getCurrentLanguage()) {
  if (!position) return '';
  if (language === 'ar') {
    return position.labelAr || position.labelEn || position.name || '';
  }
  return position.labelEn || position.labelAr || position.name || '';
}

function resolveAlternatePositionLabel(position = {}, language = getCurrentLanguage()) {
  if (!position) return '';
  if (language === 'ar') {
    return position.labelEn || position.name || '';
  }
  return position.labelAr || position.name || '';
}

function resolvePositionSnapshot(positionInput, fallbackName = '') {
  if (!positionInput) {
    return null;
  }
  if (typeof positionInput === 'object') {
    return positionInput;
  }
  const normalized = String(positionInput).trim().toLowerCase();
  if (!normalized) {
    return null;
  }
  const fromCache = cachedPositions.find((pos) => String(pos.id).trim().toLowerCase() === normalized);
  if (fromCache) {
    return fromCache;
  }
  const byName = findPositionByName(positionInput);
  if (byName) {
    return byName;
  }
  return {
    id: null,
    name: fallbackName || normalized,
    labelAr: fallbackName || normalized,
    labelEn: fallbackName || normalized,
    cost: 0,
    clientPrice: 0,
  };
}

function buildAssignmentFromPosition(position) {
  const snapshot = resolvePositionSnapshot(position, position?.name ?? '');
  const language = getCurrentLanguage();
  const primaryLabel = resolvePositionLabel(snapshot, language) || snapshot?.name || '';
  const alternateLabel = resolveAlternatePositionLabel(snapshot, language);
  return enrichAssignment({
    assignmentId: generateAssignmentId(),
    positionId: snapshot?.id ?? null,
    positionKey: snapshot?.name ?? null,
    positionLabel: primaryLabel,
    positionLabelAlt: alternateLabel,
    positionCost: Number.isFinite(snapshot?.cost) ? Number(snapshot.cost) : 0,
    positionClientPrice: Number.isFinite(snapshot?.clientPrice) ? Number(snapshot.clientPrice) : 0,
    technicianId: null,
    technicianName: null,
    technicianRole: null,
  });
}

function enrichAssignment(rawAssignment = {}) {
  const assignment = {
    assignmentId: rawAssignment.assignmentId || generateAssignmentId(),
    positionId: rawAssignment.positionId ?? rawAssignment.position_id ?? null,
    positionKey: rawAssignment.positionKey
      ?? rawAssignment.position_name
      ?? rawAssignment.positionName
      ?? rawAssignment.position
      ?? null,
    positionLabel: rawAssignment.positionLabel
      ?? rawAssignment.position_label
      ?? rawAssignment.position_name
      ?? rawAssignment.role
      ?? rawAssignment.position
      ?? '',
    positionLabelAlt: rawAssignment.positionLabelAlt
      ?? rawAssignment.position_label_alt
      ?? '',
    positionCost: Number.isFinite(Number(rawAssignment.positionCost))
      ? Number(rawAssignment.positionCost)
      : (Number.isFinite(Number(rawAssignment.position_cost)) ? Number(rawAssignment.position_cost) : 0),
    positionClientPrice: Number.isFinite(Number(rawAssignment.positionClientPrice))
      ? Number(rawAssignment.positionClientPrice)
      : (Number.isFinite(Number(rawAssignment.position_client_price)) ? Number(rawAssignment.position_client_price) : 0),
    technicianId: rawAssignment.technicianId
      ?? rawAssignment.technician_id
      ?? rawAssignment.id
      ?? rawAssignment.userId
      ?? null,
    technicianName: rawAssignment.technicianName
      ?? rawAssignment.technician_name
      ?? rawAssignment.name
      ?? null,
    technicianRole: rawAssignment.technicianRole
      ?? rawAssignment.role
      ?? null,
  };

  const snapshot = resolvePositionSnapshot(
    assignment.positionId ?? assignment.positionKey ?? assignment.positionLabel,
    assignment.positionLabel
  );

  if (snapshot) {
    assignment.positionId = snapshot.id ?? assignment.positionId;
    const language = getCurrentLanguage();
    const primaryLabel = resolvePositionLabel(snapshot, language) || assignment.positionLabel;
    const altLabel = resolveAlternatePositionLabel(snapshot, language);
    assignment.positionLabel = primaryLabel || assignment.positionLabel || snapshot?.name || '';
    assignment.positionLabelAlt = altLabel || assignment.positionLabelAlt || '';
    if (assignment.positionCost == null || !Number.isFinite(assignment.positionCost) || assignment.positionCost === 0) {
      assignment.positionCost = Number.isFinite(snapshot?.cost) ? Number(snapshot.cost) : assignment.positionCost;
    }
    if (assignment.positionClientPrice == null || !Number.isFinite(assignment.positionClientPrice) || assignment.positionClientPrice === 0) {
      assignment.positionClientPrice = Number.isFinite(snapshot?.clientPrice)
        ? Number(snapshot.clientPrice)
        : assignment.positionClientPrice;
    }
  }

  if (assignment.technicianId != null) {
    const technician = getTechnicianByIdLocal(assignment.technicianId);
    if (technician) {
      assignment.technicianId = String(technician.id);
      assignment.technicianName = technician.name ?? assignment.technicianName ?? null;
      assignment.technicianRole = technician.role ?? assignment.technicianRole ?? null;
      assignment.technicianPhone = technician.phone ?? null;
    } else {
      assignment.technicianId = String(assignment.technicianId);
      assignment.technicianName = assignment.technicianName ?? null;
    }
  } else {
    assignment.technicianId = null;
    assignment.technicianName = null;
    assignment.technicianPhone = null;
  }

  assignment.positionCost = Number.isFinite(assignment.positionCost)
    ? Number(assignment.positionCost)
    : 0;
  assignment.positionClientPrice = Number.isFinite(assignment.positionClientPrice)
    ? Number(assignment.positionClientPrice)
    : 0;

  return assignment;
}

function ensurePositionsCached() {
  cachedPositions = getTechnicianPositionsCache();
}

function normalizeAssignmentsInput(input = []) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input.map((entry) => {
    if (entry && typeof entry === 'object' && (entry.positionId != null || entry.position_id != null || entry.position_name != null || entry.role != null)) {
      const enriched = enrichAssignment(entry);
      return cloneAssignment(enriched);
    }
    if (entry && typeof entry === 'object' && entry.id != null) {
      return cloneAssignment(enrichAssignment(entry));
    }
    if (entry == null) {
      return null;
    }
    const technician = getTechnicianByIdLocal(entry);
    const snapshot = technician
      ? {
          assignmentId: generateAssignmentId(),
          positionLabel: technician.role || t('reservations.crew.positionFallback', 'منصب بدون اسم'),
          positionCost: Number.isFinite(technician.dailyWage) ? Number(technician.dailyWage) : 0,
          positionClientPrice: Number.isFinite(technician.dailyTotal) ? Number(technician.dailyTotal) : 0,
          technicianId: technician.id,
          technicianName: technician.name,
          technicianRole: technician.role,
        }
      : {
          assignmentId: generateAssignmentId(),
          positionLabel: t('reservations.crew.positionFallback', 'منصب بدون اسم'),
          positionCost: 0,
          positionClientPrice: 0,
          technicianId: entry != null ? String(entry) : null,
          technicianName: null,
        };
    return cloneAssignment(enrichAssignment(snapshot));
  }).filter(Boolean);
}

function getAssignmentsForContext(context = 'create') {
  return context === 'edit'
    ? editingAssignments.map(cloneAssignment)
    : selectedAssignments.map(cloneAssignment);
}

function setAssignmentsForContext(context = 'create', assignments = []) {
  const normalized = normalizeAssignmentsInput(assignments);
  if (context === 'edit') {
    editingAssignments = normalized;
    renderCrewSummary('edit-selected-technicians-list', editingAssignments, 'edit');
    onEditSelectionChange();
  } else {
    selectedAssignments = normalized;
    renderCrewSummary('selected-technicians-list', selectedAssignments, 'create');
    onDraftSelectionChange();
  }

  updateCrewPickerInfo();
}

function getReservationContextMeta(context = 'create') {
  if (context === 'edit') {
    const startDate = document.getElementById('edit-res-start')?.value?.trim();
    const endDate = document.getElementById('edit-res-end')?.value?.trim();
    const startTime = document.getElementById('edit-res-start-time')?.value?.trim() || '00:00';
    const endTime = document.getElementById('edit-res-end-time')?.value?.trim() || '00:00';

    const start = startDate ? combineDateTime(startDate, startTime) : null;
    const end = endDate ? combineDateTime(endDate, endTime) : null;

    let ignoreReservationId = null;
    const indexValue = document.getElementById('edit-res-index')?.value;
    if (indexValue != null) {
      const index = Number.parseInt(indexValue, 10);
      if (Number.isInteger(index)) {
        const { reservations = [] } = loadData();
        const reservation = reservations?.[index];
        if (reservation) {
          ignoreReservationId = reservation.id ?? reservation.reservationId ?? null;
        }
      }
    }

    return { start, end, ignoreReservationId };
  }

  const startDate = document.getElementById('res-start')?.value?.trim();
  const endDate = document.getElementById('res-end')?.value?.trim();
  const startTime = document.getElementById('res-start-time')?.value?.trim() || '00:00';
  const endTime = document.getElementById('res-end-time')?.value?.trim() || '00:00';

  const start = startDate ? combineDateTime(startDate, startTime) : null;
  const end = endDate ? combineDateTime(endDate, endTime) : null;

  return { start, end, ignoreReservationId: null };
}

function updateCrewPickerInfo() {
  const info = document.getElementById('technician-picker-selection-info');
  if (!info) return;
  const count = getAssignmentsForContext(crewPickerContext).length;
  if (count) {
    const message = t('technicians.picker.selectedCount', 'Selected {count} member(s)')
      .replace('{count}', normalizeNumbers(String(count)));
    info.textContent = message;
  } else {
    info.textContent = t('technicians.picker.selectionInfo', 'No crew selected yet');
  }
}

function formatCurrency(value) {
  const number = Number.isFinite(value) ? value : 0;
  return `${normalizeNumbers(number.toFixed(2))} ${DEFAULT_CURRENCY_LABEL()}`;
}

function buildTechnicianOptions(currentAssignmentId) {
  const assignments = getAssignmentsForContext(crewPickerContext);
  const takenIds = new Set(
    assignments
      .filter((assignment) => assignment.assignmentId !== currentAssignmentId && assignment.technicianId)
      .map((assignment) => assignment.technicianId)
  );

  const technicians = cachedTechnicians.length
    ? cachedTechnicians
    : (loadData().technicians || []);

  const options = technicians.map((tech) => {
    const id = String(tech.id);
    const isTaken = takenIds.has(id);
    const labelParts = [tech.name || id];
    if (tech.role) {
      labelParts.push(`(${tech.role})`);
    }
    const label = normalizeNumbers(labelParts.join(' '));
    return {
      id,
      label,
      disabled: isTaken,
    };
  });

  return options;
}

function renderAssignmentsTable() {
  const tbody = document.querySelector('#crew-assignment-table tbody');
  if (!tbody) return;

  const assignments = getAssignmentsForContext(crewPickerContext);
  if (!assignments.length) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">${t('technicians.picker.noAssignments', 'لم يتم إضافة أي مناصب بعد')}</td></tr>`;
    return;
  }

  tbody.innerHTML = assignments.map((assignment, index) => {
    const rowIndex = normalizeNumbers(String(index + 1));
    const clientPrice = formatCurrency(assignment.positionClientPrice || 0);
    const options = buildTechnicianOptions(assignment.assignmentId);
    const selectOptions = [
      `<option value="">${t('technicians.picker.noTechnicianOption', '— بدون تعيين —')}</option>`,
      ...options.map((option) => `<option value="${option.id}" ${assignment.technicianId === option.id ? 'selected' : ''} ${option.disabled ? 'disabled' : ''}>${option.label}${option.disabled && assignment.technicianId !== option.id ? ` ${t('technicians.picker.optionAssigned', '(مستخدم)')}` : ''}</option>`)
    ].join('');

    const positionSubtitle = assignment.positionLabelAlt
      ? `<div class="text-muted small">${normalizeNumbers(assignment.positionLabelAlt)}</div>`
      : '';

    return `
      <tr data-assignment-id="${assignment.assignmentId}">
        <td style="width: 40px;">${rowIndex}</td>
        <td>
          <div class="fw-bold">${normalizeNumbers(assignment.positionLabel || t('reservations.crew.positionFallback', 'منصب بدون اسم'))}</div>
          ${positionSubtitle}
        </td>
        <td>${clientPrice}</td>
        <td>
          <select class="form-select crew-assignment-select" data-assignment-id="${assignment.assignmentId}">
            ${selectOptions}
          </select>
        </td>
        <td style="width: 48px;text-align:center;">
          <button type="button" class="btn btn-sm btn-outline-danger crew-assignment-remove" data-assignment-id="${assignment.assignmentId}" aria-label="${t('technicians.picker.actions.remove', 'إزالة')}">✖</button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.crew-assignment-remove').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', () => {
        removeAssignmentById(btn.dataset.assignmentId, crewPickerContext);
      });
      btn.dataset.listenerAttached = 'true';
    }
  });

  tbody.querySelectorAll('.crew-assignment-select').forEach((select) => {
    if (!select.dataset.listenerAttached) {
      select.addEventListener('change', (event) => {
        handleTechnicianSelectionChange(select.dataset.assignmentId, event.target.value);
      });
      select.dataset.listenerAttached = 'true';
    }
  });
}

function renderPositionList() {
  const container = document.getElementById('crew-position-list');
  if (!container) return;

  ensurePositionsCached();
  const searchInput = document.getElementById('crew-position-search');
  const query = normalizeNumbers(String(searchInput?.value || '')).trim().toLowerCase();

  const filtered = cachedPositions.filter((position) => {
    if (!query) return true;
    const haystack = [
      position.labelAr,
      position.labelEn,
      position.name,
    ].filter(Boolean).map((value) => normalizeNumbers(String(value)).toLowerCase()).join(' ');
    return haystack.includes(query);
  });

  if (!filtered.length) {
    container.innerHTML = `<div class="text-muted">${t('technicians.picker.noPositions', 'لا توجد مناصب مطابقة.')}</div>`;
    return;
  }

  const language = getCurrentLanguage();

  container.innerHTML = filtered.map((position) => {
    const primaryLabel = resolvePositionLabel(position, language) || position.name || '';
    const alternateLabel = resolveAlternatePositionLabel(position, language);
    const priceDisplay = formatCurrency(position.clientPrice || 0);
    const subtitle = alternateLabel
      ? `<div class="text-muted small">${normalizeNumbers(alternateLabel)}</div>`
      : '';
    return `
      <div class="crew-position-item d-flex justify-content-between align-items-start border rounded p-2 mb-2" data-position-id="${position.id}">
        <div>
          <div class="fw-bold">${normalizeNumbers(primaryLabel)}</div>
          ${subtitle}
          <div class="text-muted small">${t('technicians.picker.positionCost', 'التكلفة: {cost} · سعر العميل: {price}')
            .replace('{cost}', formatCurrency(position.cost || 0))
            .replace('{price}', priceDisplay)}</div>
        </div>
        <div>
          <button type="button" class="btn btn-sm btn-outline-primary crew-position-add" data-position-id="${position.id}">
            ${t('technicians.picker.actions.addPosition', '➕ إضافة')}
          </button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.crew-position-add').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', () => {
        addAssignmentByPosition(btn.dataset.positionId);
      });
      btn.dataset.listenerAttached = 'true';
    }
  });
}

function addAssignmentByPosition(positionId) {
  ensurePositionsCached();
  const position = cachedPositions.find((pos) => String(pos.id) === String(positionId));
  const assignment = position ? buildAssignmentFromPosition(position) : buildAssignmentFromPosition({ id: null, name: '' });
  const assignments = getAssignmentsForContext(crewPickerContext);
  assignments.push(assignment);
  setAssignmentsForContext(crewPickerContext, assignments);
  renderAssignmentsTable();
}

function removeAssignmentById(assignmentId, context = 'create') {
  if (!assignmentId) return;
  const assignments = getAssignmentsForContext(context).filter((assignment) => assignment.assignmentId !== assignmentId);
  setAssignmentsForContext(context, assignments);
  renderAssignmentsTable();
}

function handleTechnicianSelectionChange(assignmentId, technicianIdValue) {
  if (!assignmentId) return;
  const assignments = getAssignmentsForContext(crewPickerContext);
  const target = assignments.find((assignment) => assignment.assignmentId === assignmentId);
  if (!target) return;

  if (!technicianIdValue) {
    target.technicianId = null;
    target.technicianName = null;
    target.technicianRole = null;
    setAssignmentsForContext(crewPickerContext, assignments);
    renderAssignmentsTable();
    return;
  }

  const duplicate = assignments.find((assignment) =>
    assignment.assignmentId !== assignmentId && assignment.technicianId === technicianIdValue
  );
  if (duplicate) {
    showToast(t('technicians.picker.duplicateTechnician', '⚠️ لا يمكن تعيين نفس الشخص لأكثر من منصب في نفس الحجز'));
    renderAssignmentsTable();
    return;
  }

  const technician = getTechnicianByIdLocal(technicianIdValue);
  if (technician) {
    target.technicianId = String(technician.id);
    target.technicianName = technician.name ?? null;
    target.technicianRole = technician.role ?? null;
    target.technicianPhone = technician.phone ?? null;
  } else {
    target.technicianId = String(technicianIdValue);
    target.technicianName = null;
    target.technicianRole = null;
    target.technicianPhone = null;
  }

  setAssignmentsForContext(crewPickerContext, assignments);
  renderAssignmentsTable();
}

async function openCrewPicker(context = 'create') {
  crewPickerContext = context;
  const technicians = syncTechniciansStatuses();
  if (Array.isArray(technicians) && technicians.length) {
    cachedTechnicians = technicians;
  }

  try {
    await ensureTechnicianPositionsLoaded();
  } catch (error) {
    console.warn('[reservations/crew] failed to load positions', error);
  }
  ensurePositionsCached();
  renderPositionList();
  renderAssignmentsTable();
  updateCrewPickerInfo();

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function collectAssignmentsSelection() {
  return getAssignmentsForContext(crewPickerContext).map(cloneAssignment);
}

function applyCrewSelection() {
  const assignments = collectAssignmentsSelection();
  const { start, end, ignoreReservationId } = getReservationContextMeta(crewPickerContext);

  if (start && end) {
    const conflicts = assignments.filter((assignment) => assignment.technicianId
      && hasTechnicianConflict(assignment.technicianId, start, end, ignoreReservationId));

    if (conflicts.length > 0) {
      const namesList = conflicts
        .map((assignment) => assignment.technicianName || assignment.technicianId)
        .join(t('reservations.list.crew.separator', '، '));

      const message = t(
        'reservations.toast.technicianSelectionConflict',
        '⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية'
      ).replace('{names}', namesList);

      conflicts.forEach((assignment) => {
        assignment.technicianId = null;
        assignment.technicianName = null;
      });

      setAssignmentsForContext(crewPickerContext, assignments);
      renderAssignmentsTable();
      showToast(message);
      updateCrewPickerInfo();
      return;
    }
  }

  setAssignmentsForContext(crewPickerContext, assignments);
  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && window.bootstrap?.Modal) {
    const instance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    instance?.hide?.();
  }
}

function renderCrewSummary(containerId, assignments = [], context = 'create') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!assignments.length) {
    container.innerHTML = `<span class="text-muted">${t('reservations.crew.none', 'لم يتم اختيار أي عضو من الطاقم.')}</span>`;
    return;
  }

  container.innerHTML = assignments.map((assignment) => {
    const positionLabel = normalizeNumbers(assignment.positionLabel || t('reservations.crew.positionFallback', 'منصب بدون اسم'));
    const technicianLabel = assignment.technicianName
      ? `${normalizeNumbers(assignment.technicianName)}`
      : t('technicians.picker.noTechnicianOption', '— بدون تعيين —');
    const priceLabel = formatCurrency(Number(assignment.positionClientPrice) || 0);
    const removeLabel = t('reservations.crew.removeAria', 'إزالة');
    return `
      <span class="technician-chip" data-assignment-id="${assignment.assignmentId}">
        <span class="technician-chip-name">${positionLabel}</span>
        <small class="technician-chip-role">${technicianLabel}</small>
        <small class="technician-chip-wage">💼 ${priceLabel}</small>
        <button type="button" class="technician-chip-remove" data-context="${context}" data-assignment-id="${assignment.assignmentId}" aria-label="${removeLabel}">✖</button>
      </span>
    `;
  }).join('');

  container.querySelectorAll('.technician-chip-remove').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', () => {
        removeAssignmentById(btn.dataset.assignmentId, btn.dataset.context);
      });
      btn.dataset.listenerAttached = 'true';
    }
  });
}

function setupCrewPickerInternal() {
  const openCreateBtn = document.getElementById('open-technician-picker');
  if (openCreateBtn && !openCreateBtn.dataset.listenerAttached) {
    openCreateBtn.addEventListener('click', () => openCrewPicker('create'));
    openCreateBtn.dataset.listenerAttached = 'true';
  }

  const openEditBtn = document.getElementById('open-edit-technician-picker');
  if (openEditBtn && !openEditBtn.dataset.listenerAttached) {
    openEditBtn.addEventListener('click', () => openCrewPicker('edit'));
    openEditBtn.dataset.listenerAttached = 'true';
  }

  const searchInput = document.getElementById('crew-position-search');
  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      renderPositionList();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  const applyBtn = document.getElementById('apply-technician-selection');
  if (applyBtn && !applyBtn.dataset.listenerAttached) {
    applyBtn.addEventListener('click', applyCrewSelection);
    applyBtn.dataset.listenerAttached = 'true';
  }

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && !modalEl.dataset.listenerAttached && window.bootstrap?.Modal) {
    modalEl.addEventListener('shown.bs.modal', () => {
      renderPositionList();
      renderAssignmentsTable();
      updateCrewPickerInfo();
    });
    modalEl.addEventListener('hidden.bs.modal', () => {
      const searchInputEl = document.getElementById('crew-position-search');
      if (searchInputEl) searchInputEl.value = '';
    });
    modalEl.dataset.listenerAttached = 'true';
  }

  renderCrewSummary('selected-technicians-list', selectedAssignments, 'create');
  renderCrewSummary('edit-selected-technicians-list', editingAssignments, 'edit');
}

export function initTechnicianSelection({ onDraftChange, onEditChange } = {}) {
  onDraftSelectionChange = typeof onDraftChange === 'function' ? onDraftChange : () => {};
  onEditSelectionChange = typeof onEditChange === 'function' ? onEditChange : () => {};
  setupCrewPickerInternal();
}

export function setCachedTechnicians(list = []) {
  cachedTechnicians = Array.isArray(list) ? list : [];
}

export function getSelectedCrewAssignments() {
  return selectedAssignments.map(cloneAssignment);
}

export function getEditingCrewAssignments() {
  return editingAssignments.map(cloneAssignment);
}

export function getSelectedTechnicians() {
  return selectedAssignments
    .map((assignment) => assignment.technicianId)
    .filter(Boolean)
    .map(String);
}

export function getEditingTechnicians() {
  return editingAssignments
    .map((assignment) => assignment.technicianId)
    .filter(Boolean)
    .map(String);
}

export function setSelectedTechnicians(values = []) {
  setAssignmentsForContext('create', values);
}

export function setEditingTechnicians(values = []) {
  setAssignmentsForContext('edit', values);
}

export function resetSelectedTechnicians() {
  setAssignmentsForContext('create', []);
}

export function resetEditingTechnicians() {
  setAssignmentsForContext('edit', []);
}

function reconcileAssignments(assignments = []) {
  return assignments.map((assignment) => {
    if (assignment.technicianId) {
      const technician = getTechnicianByIdLocal(assignment.technicianId);
      if (technician) {
        assignment.technicianId = String(technician.id);
        assignment.technicianName = technician.name ?? assignment.technicianName ?? null;
        assignment.technicianRole = technician.role ?? assignment.technicianRole ?? null;
        assignment.technicianPhone = technician.phone ?? null;
        return assignment;
      }
      assignment.technicianId = null;
      assignment.technicianName = null;
      assignment.technicianRole = null;
      assignment.technicianPhone = null;
    }
    return assignment;
  });
}

export function reconcileTechnicianSelections(latest = []) {
  if (Array.isArray(latest) && latest.length) {
    cachedTechnicians = latest;
  }

  selectedAssignments = reconcileAssignments(selectedAssignments);
  editingAssignments = reconcileAssignments(editingAssignments);

  renderCrewSummary('selected-technicians-list', selectedAssignments, 'create');
  renderCrewSummary('edit-selected-technicians-list', editingAssignments, 'edit');
  renderAssignmentsTable();
}
