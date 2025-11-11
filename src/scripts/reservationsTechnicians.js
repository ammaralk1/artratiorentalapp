import { normalizeNumbers, showToast } from './utils.js';
import { t, getCurrentLanguage } from './language.js';
import { syncTechniciansStatuses } from './technicians.js';
import { refreshTechniciansFromApi } from './techniciansService.js';
import { loadData } from './storage.js';
import { combineDateTime, hasTechnicianConflict, getTechnicianConflictingReservationCodes } from './reservations/state.js';
import {
  ensureTechnicianPositionsLoaded,
  getTechnicianPositionsCache,
  findPositionByName,
  updateTechnicianPosition,
} from './technicianPositions.js';

const DEFAULT_CURRENCY_LABEL = () => t('reservations.create.summary.currency', 'SR');

let cachedTechnicians = [];
let cachedPositions = [];
let selectedAssignments = [];
let editingAssignments = [];
let crewPickerContext = 'create';

let onDraftSelectionChange = () => {};
let onEditSelectionChange = () => {};

// Prevent duplicate commits when input fires both 'change' and 'blur'
const selectionCommitGuards = new Map(); // assignmentId -> lastCommitTs
const SELECTION_COMMIT_THROTTLE_MS = 450;

function isSelectionCommitGuarded(assignmentId) {
  const ts = selectionCommitGuards.get(assignmentId);
  return ts != null && (Date.now() - ts) < SELECTION_COMMIT_THROTTLE_MS;
}

function markSelectionCommit(assignmentId) {
  selectionCommitGuards.set(assignmentId, Date.now());
  setTimeout(() => {
    const ts = selectionCommitGuards.get(assignmentId);
    if (ts != null && (Date.now() - ts) >= SELECTION_COMMIT_THROTTLE_MS) {
      selectionCommitGuards.delete(assignmentId);
    }
  }, SELECTION_COMMIT_THROTTLE_MS + 50);
}

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
    if (entry == null) {
      return null;
    }

    if (entry && typeof entry === 'object') {
      return cloneAssignment(enrichAssignment(entry));
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
  // Ensure the positions cache is populated before we normalize assignments
  // so that enrichAssignment/resolvePositionSnapshot can resolve readable labels.
  try { ensurePositionsCached(); } catch (_) { /* non-fatal */ }
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

  // Determine current interval for conflict detection
  const { start, end, ignoreReservationId } = getReservationContextMeta(crewPickerContext);
  const hasInterval = Boolean(start && end);

  const options = technicians.map((tech) => {
    const id = String(tech.id);
    const isTaken = takenIds.has(id);
    const isConflicting = hasInterval
      ? hasTechnicianConflict(id, start, end, ignoreReservationId)
      : false;
    const label = normalizeNumbers(tech.name || tech.full_name || tech.fullName || tech.email || id);
    return {
      id,
      label,
      disabled: isTaken || isConflicting,
      conflict: isConflicting,
      taken: isTaken,
    };
  });

  return options;
}

function renderAssignmentsTable() {
  const tbody = document.querySelector('#crew-assignment-table tbody');
  if (!tbody) return;

  const assignments = getAssignmentsForContext(crewPickerContext);
  if (!assignments.length) {
    const emptyMessage = t('technicians.picker.noAssignments', 'لم يتم إضافة أي مناصب بعد');
    const emptyHint = t('technicians.picker.assignments.hint', 'استخدم قائمة المناصب على اليسار لإضافة طاقم العمل.');
    tbody.innerHTML = `
      <tr class="crew-assignment-empty-row">
        <td colspan="5">
          <div class="crew-assignment-empty">
            <span class="crew-assignment-empty-icon" aria-hidden="true">🧑‍🤝‍🧑</span>
            <p class="crew-assignment-empty-text">${emptyMessage}</p>
            <p class="crew-assignment-empty-hint text-muted">${emptyHint}</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  // Keep positions cache fresh for label resolution
  ensurePositionsCached();

  tbody.innerHTML = assignments.map((assignment, index) => {
    const rowIndex = normalizeNumbers(String(index + 1));
    const clientPrice = formatCurrency(assignment.positionClientPrice || 0);
    const options = buildTechnicianOptions(assignment.assignmentId);
    const placeholderLabel = t('technicians.picker.noTechnicianOption', '— بدون تعيين —');
    const currentTechnicianId = assignment.technicianId != null
      ? String(assignment.technicianId)
      : '';
    const currentName = assignment.technicianName
      ? normalizeNumbers(assignment.technicianName)
      : '';
    const datalistId = `crew-assignment-options-${assignment.assignmentId}`;

    const takenNote = t('technicians.picker.optionAssigned', '(مستخدم)');
    const conflictNote = t('technicians.picker.optionConflicting', '(متعارض)');
    const datalistOptions = options.map((option) => {
      const isSelected = currentTechnicianId === option.id;
      const isDisabled = option.disabled && !isSelected;
      const displayLabel = isDisabled
        ? `${option.label} ${option.conflict ? conflictNote : takenNote}`
        : option.label;
      // Do NOT use the native `disabled` attribute on <option> inside <datalist>,
      // as many browsers hide disabled options entirely. We keep a data flag
      // and block selection in JS instead so users still see all technicians.
      return `
        <option value="${option.label}"
                data-id="${option.id}"
                data-disabled="${option.disabled ? 'true' : 'false'}"
                data-conflict="${option.conflict ? 'true' : 'false'}"
                data-taken="${option.taken ? 'true' : 'false'}"
                label="${displayLabel}"></option>
      `;
    }).join('');

    // Resolve a robust, human-readable position label on-the-fly to avoid cases
    // where older assignments carry only an id/number.
    let resolvedPrimaryLabel = assignment.positionLabel
      ?? assignment.position_label
      ?? assignment.position_name
      ?? assignment.role
      ?? assignment.position
      ?? '';
    if (!resolvedPrimaryLabel || String(resolvedPrimaryLabel).trim() === '') {
      const byId = assignment.positionId
        ? cachedPositions.find((p) => String(p.id) === String(assignment.positionId))
        : null;
      const byKey = !byId && assignment.positionKey
        ? cachedPositions.find((p) => String(p.name).toLowerCase() === String(assignment.positionKey).toLowerCase())
        : null;
      if (byId || byKey) {
        const pos = byId || byKey;
        resolvedPrimaryLabel = resolvePositionLabel(pos, getCurrentLanguage()) || pos?.name || '';
      }
    }

    const positionSubtitle = assignment.positionLabelAlt
      ? `<div class="text-muted small">${normalizeNumbers(assignment.positionLabelAlt)}</div>`
      : '';

    const removeLabel = t('technicians.picker.actions.remove', 'إزالة');
    const priceLabel = t('technicians.picker.assignments.price', 'سعر العميل');

    return `
      <tr data-assignment-id="${assignment.assignmentId}" class="crew-assignment-row">
        <td class="crew-assignment-cell-index">
          <span class="crew-assignment-index-badge">${rowIndex}</span>
        </td>
        <td class="crew-assignment-cell-position">
          <div class="crew-assignment-position-card">
            <div class="crew-assignment-position">${normalizeNumbers(resolvedPrimaryLabel || t('reservations.crew.positionFallback', 'منصب بدون اسم'))}</div>
            ${positionSubtitle}
          </div>
        </td>
        <td class="crew-assignment-cell-price">
          <div class="crew-assignment-price-chip" aria-label="${priceLabel}">${clientPrice}</div>
        </td>
        <td class="crew-assignment-cell-member">
          <div class="crew-assignment-autocomplete-wrapper">
            <input
              type="text"
              class="form-control crew-assignment-autocomplete"
              list="${datalistId}"
              data-assignment-id="${assignment.assignmentId}"
              placeholder="${placeholderLabel}"
              value="${currentTechnicianId ? currentName : ''}"
              aria-label="${t('technicians.picker.assignments.member', 'عضو الطاقم')}"
              autocomplete="off"
            />
            <datalist id="${datalistId}">
              ${datalistOptions}
            </datalist>
          </div>
        </td>
        <td class="crew-assignment-cell-actions">
          <button type="button" class="btn btn-sm btn-outline-danger crew-assignment-remove" data-assignment-id="${assignment.assignmentId}" aria-label="${removeLabel}">
            ${removeLabel}
          </button>
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

  setupCrewAssignmentAutocomplete(tbody);
}

function setupCrewAssignmentAutocomplete(root) {
  const inputs = root.querySelectorAll('.crew-assignment-autocomplete');
  inputs.forEach((input) => {
    if (input.dataset.listenerAttached) return;
    const assignmentId = input.dataset.assignmentId;

    const commitSelection = () => {
      handleAutocompleteSelection(input, assignmentId);
    };

    input.addEventListener('change', commitSelection);
    input.addEventListener('blur', commitSelection);
    input.dataset.listenerAttached = 'true';
  });
}

function handleAutocompleteSelection(input, assignmentId) {
  if (!assignmentId) return;
  if (isSelectionCommitGuarded(assignmentId)) {
    return; // skip duplicates from rapid change/blur sequence
  }
  markSelectionCommit(assignmentId);
  const rawValue = input.value?.trim() ?? '';
  if (!rawValue) {
    handleTechnicianSelectionChange(assignmentId, '');
    return;
  }

  const datalistId = input.getAttribute('list');
  const datalistEl = datalistId ? document.getElementById(datalistId) : null;
  const options = datalistEl ? Array.from(datalistEl.options) : [];
  const normalizedValue = normalizeNumbers(rawValue).toLowerCase();
  const match = options.find((option) => normalizeNumbers(option.value).toLowerCase() === normalizedValue);

  if (!match) {
    showToast(t('technicians.picker.toast.autocompleteNoMatch', '⚠️ لم يتم العثور على فني مطابق، الرجاء اختيار من القائمة'));
    input.value = '';
    handleTechnicianSelectionChange(assignmentId, '');
    return;
  }

  if (match.dataset.disabled === 'true') {
    if (match.dataset.conflict === 'true') {
      // Annotate conflict with reservation codes if possible
      try {
        const { start, end, ignoreReservationId } = getReservationContextMeta(crewPickerContext);
        const techId = match.dataset.id || '';
        const codes = (start && end && techId)
          ? getTechnicianConflictingReservationCodes(String(techId), start, end, ignoreReservationId)
          : [];
        const base = t('technicians.picker.optionConflict', '⚠️ هذا العضو لديه تعارض في التاريخ/الوقت المحدد');
        const suffix = codes && codes.length ? `: ${codes.join('، ')}` : '';
        showToast(`${base}${suffix}`, 'warning', 6000);
      } catch (_) {
        showToast(t('technicians.picker.optionConflict', '⚠️ هذا العضو لديه تعارض في التاريخ/الوقت المحدد'), 'warning', -1);
      }
    } else {
      showToast(t('technicians.picker.optionTaken', '⚠️ لا يمكن اختيار هذا العضو لأنه مرتبط بمنصب آخر'));
    }
    input.value = '';
    return;
  }

  const technicianId = match.dataset.id;
  if (!technicianId) {
    showToast(t('technicians.picker.toast.autocompleteNoMatch', '⚠️ لم يتم العثور على فني مطابق، الرجاء اختيار من القائمة'));
    input.value = '';
    handleTechnicianSelectionChange(assignmentId, '');
    return;
  }

  handleTechnicianSelectionChange(assignmentId, technicianId);
}

function renderPositionList() {
  const container = document.getElementById('crew-position-list');
  if (!container) return;

  ensurePositionsCached();
  const searchInput = document.getElementById('crew-position-search');
  const query = normalizeNumbers(String(searchInput?.value || '')).trim().toLowerCase();

  // Build a quick lookup for how many times a position is already added
  const assignments = getAssignmentsForContext(crewPickerContext);
  const positionCountMap = assignments.reduce((acc, a) => {
    const key = a?.positionId != null ? String(a.positionId) : null;
    if (!key) return acc;
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());

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
    const costDisplay = formatCurrency(position.cost || 0);
    const subtitle = alternateLabel
      ? `<span class="crew-position-card__subtitle">${normalizeNumbers(alternateLabel)}</span>`
      : '';

    const costLabel = t('technicians.picker.positionCostLabel', 'التكلفة');
    const clientPriceLabel = t('technicians.picker.positionClientPriceLabel', 'سعر العميل');
    const addButtonLabel = t('technicians.picker.actions.addPosition', 'إضافة المنصب');
    const count = positionCountMap.get(String(position.id)) || 0;
    const countBadgeLabel = t('technicians.picker.positionCountBadge', 'مضاف ×{count}')
      .replace('{count}', normalizeNumbers(String(count)));

    return `
      <article class="crew-position-card" data-position-id="${position.id}" tabindex="0" role="button" aria-label="${normalizeNumbers(primaryLabel)}">
        ${count > 0 ? `<span class="crew-position-card__badge" aria-label="${countBadgeLabel}">${normalizeNumbers(String(count))}</span>` : ''}
        <header class="crew-position-card__header">
          <span class="crew-position-card__icon" aria-hidden="true">🎯</span>
          <div class="crew-position-card__titles">
            <h6 class="crew-position-card__title">${normalizeNumbers(primaryLabel)}</h6>
            ${subtitle}
          </div>
        </header>
        <div class="crew-position-card__metrics">
          <div class="crew-position-card__metric">
            <span class="crew-position-card__metric-label">${costLabel}</span>
            <span class="crew-position-card__metric-value">${costDisplay}</span>
          </div>
          <div class="crew-position-card__metric crew-position-card__metric--accent">
            <span class="crew-position-card__metric-label">${clientPriceLabel}</span>
            <span class="crew-position-card__metric-value">${priceDisplay}</span>
          </div>
        </div>
        <div class="crew-position-card__edit" hidden>
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label">${costLabel}</label>
              <input type="text" class="form-control crew-position-edit-cost" value="${normalizeNumbers(String(position.cost ?? 0))}" inputmode="decimal">
            </div>
            <div class="col-6">
              <label class="form-label">${clientPriceLabel}</label>
              <input type="text" class="form-control crew-position-edit-client" value="${position.clientPrice == null ? '' : normalizeNumbers(String(position.clientPrice))}" inputmode="decimal" placeholder="${normalizeNumbers('')}"/>
            </div>
          </div>
          <div class="mt-2 d-flex gap-2">
            <button type="button" class="btn btn-primary btn-sm crew-position-save-btn" data-position-id="${position.id}">${t('positions.form.actions.update', '💾 حفظ')}</button>
            <button type="button" class="btn btn-outline btn-sm crew-position-cancel-btn" data-position-id="${position.id}">${t('positions.form.actions.cancel', 'إلغاء')}</button>
          </div>
        </div>
        <footer class="crew-position-card__footer">
          <button type="button" class="btn btn-primary btn-sm crew-position-add-btn" data-position-id="${position.id}">
            ${addButtonLabel}
          </button>
          <button type="button" class="btn btn-outline btn-sm crew-position-edit-btn ms-2" data-position-id="${position.id}">
            ${t('technicians.picker.actions.editPosition', '✏️ تعديل الأسعار')}
          </button>
        </footer>
      </article>
    `;
  }).join('');

  container.querySelectorAll('.crew-position-add-btn').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        addAssignmentByPosition(btn.dataset.positionId);
      });
      btn.dataset.listenerAttached = 'true';
    }
  });

  container.querySelectorAll('.crew-position-card').forEach((card) => {
    if (!card.dataset.cardListenerAttached) {
      card.addEventListener('click', () => {
        if (card.dataset.editing === 'true') return; // ignore clicks while editing
        addAssignmentByPosition(card.dataset.positionId);
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (card.dataset.editing === 'true') return;
          addAssignmentByPosition(card.dataset.positionId);
        }
      });
      card.dataset.cardListenerAttached = 'true';
    }
  });

  // Edit button wiring
  container.querySelectorAll('.crew-position-edit-btn').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const card = btn.closest('.crew-position-card');
        if (!card) return;
        const metrics = card.querySelector('.crew-position-card__metrics');
        const footer = card.querySelector('.crew-position-card__footer');
        const editor = card.querySelector('.crew-position-card__edit');
        if (metrics) metrics.classList.add('d-none');
        if (footer) footer.classList.add('d-none');
        if (editor) editor.hidden = false;
        card.dataset.editing = 'true';
        // Attach simple numeric sanitizers
        const costInput = card.querySelector('.crew-position-edit-cost');
        const clientInput = card.querySelector('.crew-position-edit-client');
        const sanitize = (el) => {
          el.addEventListener('input', (e) => {
            const raw = normalizeNumbers(e.target.value);
            const cleaned = raw.replace(/[^0-9.]/g, '');
            if (cleaned !== e.target.value) {
              const pos = e.target.selectionEnd || cleaned.length;
              e.target.value = cleaned;
              e.target.setSelectionRange(pos, pos);
            }
          }, { once: true });
        };
        if (costInput) sanitize(costInput);
        if (clientInput) sanitize(clientInput);
      });
      btn.dataset.listenerAttached = 'true';
    }
  });

  // Save/Cancel handlers
  container.querySelectorAll('.crew-position-save-btn').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const card = btn.closest('.crew-position-card');
        const id = btn.dataset.positionId;
        if (!card || !id) return;
        try {
          const costEl = card.querySelector('.crew-position-edit-cost');
          const clientEl = card.querySelector('.crew-position-edit-client');
          const rawCost = normalizeNumbers(costEl?.value || '').trim();
          const rawClient = normalizeNumbers(clientEl?.value || '').trim();
          const cost = rawCost === '' ? 0 : Number.parseFloat(rawCost);
          const clientPrice = rawClient === '' ? null : Number.parseFloat(rawClient);
          if (!Number.isFinite(cost) || cost < 0) {
            showToast(t('positions.toast.invalidCost', '⚠️ أدخل قيمة صحيحة للتكلفة'));
            costEl?.focus();
            return;
          }
          if (clientPrice != null && (!Number.isFinite(clientPrice) || clientPrice < 0)) {
            showToast(t('positions.toast.invalidClientPrice', '⚠️ أدخل قيمة صحيحة لسعر العميل'));
            clientEl?.focus();
            return;
          }

          // Fetch latest snapshot to preserve name/labels
          ensurePositionsCached();
          const current = cachedPositions.find((p) => String(p.id) === String(id));
          if (!current) {
            showToast(t('positions.toast.notFound', '⚠️ تعذر العثور على بيانات المنصب'), 'error');
            return;
          }
          await updateTechnicianPosition(id, {
            name: current.name,
            cost: Number(cost.toFixed(2)),
            clientPrice: clientPrice == null ? null : Number(clientPrice.toFixed(2)),
            labelAr: current.labelAr,
            labelEn: current.labelEn,
          });
          showToast(t('positions.toast.saveSuccess', '✅ تم حفظ بيانات المنصب'));
          // Re-render list to reflect updates
          renderPositionList();
          // Optionally, keep assignments table visible/up-to-date
          renderAssignmentsTable();
        } catch (error) {
          console.error('❌ [crew-picker] update position failed', error);
          const message = error?.message || t('positions.toast.saveFailed', '⚠️ تعذر حفظ بيانات المنصب، حاول مرة أخرى');
          showToast(message, 'error');
        }
      });
      btn.dataset.listenerAttached = 'true';
    }
  });

  container.querySelectorAll('.crew-position-cancel-btn').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const card = btn.closest('.crew-position-card');
        if (!card) return;
        const metrics = card.querySelector('.crew-position-card__metrics');
        const footer = card.querySelector('.crew-position-card__footer');
        const editor = card.querySelector('.crew-position-card__edit');
        if (metrics) metrics.classList.remove('d-none');
        if (footer) footer.classList.remove('d-none');
        if (editor) editor.hidden = true;
        delete card.dataset.editing;
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
  showToast(
    t('technicians.picker.toast.positionAdded', '✅ تم إضافة المنصب إلى القائمة'),
    'success'
  );
}

function removeAssignmentById(assignmentId, context = 'create') {
  if (!assignmentId) return;
  const assignments = getAssignmentsForContext(context).filter((assignment) => assignment.assignmentId !== assignmentId);
  setAssignmentsForContext(context, assignments);
  renderAssignmentsTable();
  showToast(t('technicians.picker.toast.positionRemoved', '🗑️ تم حذف المنصب من القائمة'));
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
    showToast(t('technicians.picker.toast.assignmentCleared', 'ℹ️ تمت إزالة التعيين من هذا المنصب'));
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
  // Check time conflict against reservation interval if available
  const { start, end, ignoreReservationId } = getReservationContextMeta(crewPickerContext);
  if (start && end && hasTechnicianConflict(String(technicianIdValue), start, end, ignoreReservationId)) {
    try {
      const codes = getTechnicianConflictingReservationCodes(String(technicianIdValue), start, end, ignoreReservationId);
      const base = t('technicians.picker.optionConflict', '⚠️ هذا العضو لديه تعارض في التاريخ/الوقت المحدد');
      const suffix = codes && codes.length ? `: ${codes.join('، ')}` : '';
      showToast(`${base}${suffix}`, 'warning', 6000);
    } catch (_) {
      showToast(t('technicians.picker.optionConflict', '⚠️ هذا العضو لديه تعارض في التاريخ/الوقت المحدد'), 'warning', -1);
    }
    renderAssignmentsTable();
    return;
  }
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
  if (target.technicianName) {
    showToast(
      t('technicians.picker.toast.assignmentApplied', '✅ تم تعيين {name} على هذا المنصب')
        .replace('{name}', normalizeNumbers(target.technicianName)),
      'success'
    );
  } else {
    showToast(t('technicians.picker.toast.assignmentIdApplied', '✅ تم تعيين العضو المحدد على هذا المنصب'), 'success');
  }
}

async function openCrewPicker(context = 'create') {
  crewPickerContext = context;

  // Render immediately from current selections to improve perceived responsiveness
  renderAssignmentsTable();
  updateCrewPickerInfo();

  // Then refresh technicians/positions asynchronously
  let technicians = syncTechniciansStatuses();
  if (!Array.isArray(technicians) || technicians.length === 0) {
    try {
      const fetched = await refreshTechniciansFromApi();
      technicians = Array.isArray(fetched) ? fetched : [];
    } catch (e) {
      console.warn('[reservations/crew] technicians fetch failed, falling back to stored list', e);
    }
  }
  if (Array.isArray(technicians)) {
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
  showToast(t('technicians.picker.toast.selectionApplied', '✅ تم حفظ الطاقم بنجاح'), 'success');
}

function renderCrewSummary(containerId, assignments = [], context = 'create') {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!assignments.length) {
    container.innerHTML = `<span class="text-muted">${t('reservations.crew.none', 'لم يتم اختيار أي عضو من الطاقم.')}</span>`;
    return;
  }

  ensurePositionsCached();

  container.innerHTML = assignments.map((assignment) => {
    // Resolve robust label
    let resolvedLabel = assignment.positionLabel
      ?? assignment.position_label
      ?? assignment.position_name
      ?? assignment.role
      ?? assignment.position
      ?? '';
    if (!resolvedLabel || String(resolvedLabel).trim() === '') {
      const byId = assignment.positionId
        ? cachedPositions.find((p) => String(p.id) === String(assignment.positionId))
        : null;
      const byKey = !byId && assignment.positionKey
        ? cachedPositions.find((p) => String(p.name).toLowerCase() === String(assignment.positionKey).toLowerCase())
        : null;
      resolvedLabel = byId
        ? resolvePositionLabel(byId, getCurrentLanguage()) || byId?.name || ''
        : (byKey ? resolvePositionLabel(byKey, getCurrentLanguage()) || byKey?.name || '' : '');
    }
    const positionLabel = normalizeNumbers(resolvedLabel || t('reservations.crew.positionFallback', 'منصب بدون اسم'));

    const technicianLabel = assignment.technicianName
      ? `${normalizeNumbers(assignment.technicianName)}`
      : t('technicians.picker.noTechnicianOption', '— بدون تعيين —');

    // Resolve client price with fallbacks
    let priceValue = Number(assignment.positionClientPrice);
    if (!Number.isFinite(priceValue) || priceValue <= 0) {
      const candidates = [
        assignment.position_client_price,
        assignment.client_price,
        assignment.customer_price,
        assignment.daily_total,
        assignment.dailyTotal,
        assignment.total
      ];
      for (const c of candidates) {
        const n = Number(c);
        if (Number.isFinite(n) && n > 0) { priceValue = n; break; }
      }
    }
    if ((!Number.isFinite(priceValue) || priceValue <= 0) && (assignment.positionId || assignment.positionKey)) {
      const byId = assignment.positionId
        ? cachedPositions.find((p) => String(p.id) === String(assignment.positionId))
        : null;
      const byKey = !byId && assignment.positionKey
        ? cachedPositions.find((p) => String(p.name).toLowerCase() === String(assignment.positionKey).toLowerCase())
        : null;
      const pos = byId || byKey || null;
      if (pos && Number.isFinite(Number(pos.clientPrice))) {
        priceValue = Number(pos.clientPrice);
      }
    }
    const priceLabel = formatCurrency(Number.isFinite(priceValue) && priceValue > 0 ? priceValue : 0);
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
    openCreateBtn.addEventListener('click', (event) => {
      // Guard: require date, time and customer before opening in create mode
      const customerId = document.getElementById('res-customer')?.value?.trim();
      const startDate = document.getElementById('res-start')?.value?.trim();
      const endDate = document.getElementById('res-end')?.value?.trim();
      const startTime = document.getElementById('res-start-time')?.value?.trim();
      const endTime = document.getElementById('res-end-time')?.value?.trim();

      const hasDates = Boolean(startDate && endDate);
      const hasTimes = Boolean(startTime && endTime);
      const hasCustomer = Boolean(customerId);

      if (!hasDates || !hasTimes) {
        // Prioritize date/time requirement as requested
        event.preventDefault();
        showToast(t('technicians.picker.requireDates', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية أولاً'), 'warning');
        return;
      }

      if (!hasCustomer) {
        event.preventDefault();
        showToast(t('technicians.picker.requireCustomer', '⚠️ يرجى اختيار العميل أولاً'), 'warning');
        return;
      }

      openCrewPicker('create');
    });
    openCreateBtn.dataset.listenerAttached = 'true';

    // Optional UX: reflect availability by disabling the button until ready
    const updateAvailability = () => {
      const customerId = document.getElementById('res-customer')?.value?.trim();
      const startDate = document.getElementById('res-start')?.value?.trim();
      const endDate = document.getElementById('res-end')?.value?.trim();
      const startTime = document.getElementById('res-start-time')?.value?.trim();
      const endTime = document.getElementById('res-end-time')?.value?.trim();
      const ready = Boolean(customerId && startDate && endDate && startTime && endTime);
      // Keep button clickable to show toast, but reflect visual/ARIA disabled state
      openCreateBtn.setAttribute('aria-disabled', String(!ready));
      openCreateBtn.dataset.ready = ready ? 'true' : 'false';
      openCreateBtn.classList.toggle('is-disabled', !ready);
    };

    ['res-customer', 'res-customer-input', 'res-start', 'res-end', 'res-start-time', 'res-end-time']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((el) => {
        ['input', 'change'].forEach((evt) => el.addEventListener(evt, updateAvailability));
      });
    // Initial state
    updateAvailability();
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
    modalEl.addEventListener('shown.bs.modal', async () => {
      if (!cachedTechnicians.length && (!loadData().technicians || loadData().technicians.length === 0)) {
        try { await refreshTechniciansFromApi(); } catch (e) { console.warn('[crew-picker] fetch on show failed', e); }
      }
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
