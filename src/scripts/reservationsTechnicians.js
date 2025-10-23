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
    const label = normalizeNumbers(tech.name || id);
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
    const datalistOptions = options.map((option) => {
      const isSelected = currentTechnicianId === option.id;
      const isDisabled = option.disabled && !isSelected;
      const displayLabel = isDisabled ? `${option.label} ${takenNote}` : option.label;
      const disabledAttr = isDisabled ? ' disabled data-disabled="true"' : '';
      return `
        <option value="${option.label}" data-id="${option.id}" data-disabled="${option.disabled ? 'true' : 'false'}" label="${displayLabel}"${disabledAttr}></option>
      `;
    }).join('');

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
            <div class="crew-assignment-position">${normalizeNumbers(assignment.positionLabel || t('reservations.crew.positionFallback', 'منصب بدون اسم'))}</div>
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
    showToast(t('technicians.picker.optionTaken', '⚠️ لا يمكن اختيار هذا العضو لأنه مرتبط بمنصب آخر'));
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
        <footer class="crew-position-card__footer">
          <button type="button" class="btn btn-primary crew-position-add-btn" data-position-id="${position.id}">
            ${addButtonLabel}
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
        addAssignmentByPosition(card.dataset.positionId);
      });
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          addAssignmentByPosition(card.dataset.positionId);
        }
      });
      card.dataset.cardListenerAttached = 'true';
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
  showToast(t('technicians.picker.toast.selectionApplied', '✅ تم حفظ الطاقم بنجاح'), 'success');
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
