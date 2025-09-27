import { normalizeNumbers, showToast } from './utils.js';
import { t } from './language.js';
import { syncTechniciansStatuses } from './technicians.js';
import { loadData } from './storage.js';
import { combineDateTime, hasTechnicianConflict } from './reservations/state.js';

let cachedTechnicians = [];
let selectedTechnicians = [];
let editingTechnicians = [];
let technicianPickerContext = 'create';

let onDraftSelectionChange = () => {};
let onEditSelectionChange = () => {};

function resolveTechnicianWage(technician = {}) {
  const candidates = [
    technician.dailyWage,
    technician.daily_rate,
    technician.dailyRate,
    technician.wage,
    technician.rate
  ];

  for (const value of candidates) {
    if (value == null || value === '') continue;
    const normalized = normalizeNumbers(String(value));
    const number = Number.parseFloat(normalized);
    if (Number.isFinite(number)) {
      return number;
    }
  }

  return 0;
}

function formatTechnicianWage(technician = {}) {
  const wage = resolveTechnicianWage(technician);
  if (!Number.isFinite(wage) || wage <= 0) {
    return '—';
  }

  const wageSuffix = t('technicians.table.wageSuffix', 'ريال');
  return `${normalizeNumbers(String(wage))} ${wageSuffix}`;
}

function normalizeText(value = '') {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function getTechnicianByIdLocal(id) {
  if (!cachedTechnicians || !cachedTechnicians.length) return null;
  return cachedTechnicians.find((tech) => String(tech?.id) === String(id)) || null;
}

function removeSelectedTechnician(technicianId, context = 'create') {
  if (context === 'edit') {
    setEditingTechnicians(editingTechnicians.filter((id) => String(id) !== String(technicianId)));
  } else {
    setSelectedTechnicians(selectedTechnicians.filter((id) => String(id) !== String(technicianId)));
  }
}

function renderTechnicianChips(containerId, ids = [], context) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!ids || ids.length === 0) {
    const emptyCrew = t('reservations.crew.none', 'لم يتم اختيار أي عضو من الطاقم.');
    container.innerHTML = `<span class="text-muted">${emptyCrew}</span>`;
    return;
  }

  container.innerHTML = ids
    .map((technicianId) => {
      const technician = getTechnicianByIdLocal(technicianId) || {};
      const fallbackName = t('reservations.crew.fallbackName', 'عضو الطاقم {id}').replace('{id}', technicianId);
      const name = technician.name || fallbackName;
      const role = technician.role ? `<small class="technician-chip-role">${technician.role}</small>` : '';
      const wageDisplay = formatTechnicianWage(technician);
      const wageLabel = wageDisplay !== '—'
        ? `<small class="technician-chip-wage">💰 ${wageDisplay}</small>`
        : '';
      const removeLabel = t('reservations.crew.removeAria', 'إزالة');
      return `
        <span class="technician-chip" data-id="${technicianId}">
          <span class="technician-chip-name">${name}</span>
          ${role}
          ${wageLabel}
          <button type="button" class="technician-chip-remove" data-context="${context}" data-id="${technicianId}" aria-label="${removeLabel}">✖</button>
        </span>
      `;
    })
    .join('');

  container.querySelectorAll('.technician-chip-remove').forEach((btn) => {
    if (!btn.dataset.listenerAttached) {
      btn.addEventListener('click', () => removeSelectedTechnician(btn.dataset.id, btn.dataset.context));
      btn.dataset.listenerAttached = 'true';
    }
  });
}

function getContextTechnicianIds() {
  return technicianPickerContext === 'edit' ? editingTechnicians : selectedTechnicians;
}

function populateTechnicianPickerTable() {
  const tbody = document.querySelector('#technician-picker-table tbody');
  if (!tbody) return;

  const searchInput = document.getElementById('technician-picker-search');
  const query = normalizeText(searchInput?.value || '');

  const selectedIds = new Set(getContextTechnicianIds().map(String));

  const technicians = cachedTechnicians || [];
  const filtered = technicians.filter((tech) => {
    if (!query) return true;
    const haystack = normalizeText([
      tech.name,
      tech.phone,
      tech.role,
      tech.department,
      tech.notes
    ].filter(Boolean).join(' '));
    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    const noResults = t('reservations.crew.searchEmpty', 'لا يوجد نتائج مطابقة.');
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">${noResults}</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((tech) => {
    const wageDisplay = formatTechnicianWage(tech);
    return `
      <tr>
        <td style="width:40px;">
          <input class="form-check-input technician-picker-checkbox" type="checkbox" value="${tech.id}" ${selectedIds.has(String(tech.id)) ? 'checked' : ''}>
        </td>
        <td>${tech.name || '-'}</td>
        <td>${tech.role || '—'}</td>
        <td>${tech.department || '—'}</td>
        <td>${wageDisplay}</td>
      </tr>
    `;
  }).join('');
}

function collectTechnicianPickerSelection() {
  return Array.from(document.querySelectorAll('.technician-picker-checkbox:checked'))
    .map((checkbox) => checkbox.value)
    .filter(Boolean);
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

function updateTechnicianPickerInfo() {
  const info = document.getElementById('technician-picker-selection-info');
  if (!info) return;
  const count = getContextTechnicianIds().length;
  if (count) {
    const message = t('reservations.crew.selectedCount', 'تم اختيار {count} عضو').replace('{count}', normalizeNumbers(String(count)));
    info.textContent = message;
  } else {
    info.textContent = t('reservations.crew.noneShort', 'لم يتم اختيار أي عضو بعد');
  }
}

function applyTechnicianSelection() {
  const selectedIds = collectTechnicianPickerSelection().map(String);
  const { start, end, ignoreReservationId } = getReservationContextMeta(technicianPickerContext);

  if (start && end) {
    const conflictingIds = selectedIds.filter((technicianId) =>
      hasTechnicianConflict(technicianId, start, end, ignoreReservationId)
    );

    if (conflictingIds.length > 0) {
      const namesList = conflictingIds
        .map((id) => getTechnicianByIdLocal(id)?.name || id)
        .join(t('reservations.list.crew.separator', '، '));

      const message = t(
        'reservations.toast.technicianSelectionConflict',
        '⚠️ لا يمكن اختيار {names} لأنهم مرتبطون بحجز آخر في نفس الفترة الزمنية'
      ).replace('{names}', namesList);

      conflictingIds.forEach((id) => {
        const checkbox = document.querySelector(
          `.technician-picker-checkbox[value="${CSS.escape(String(id))}"]`
        );
        if (checkbox) {
          checkbox.checked = false;
        }
      });

      showToast(message);
      updateTechnicianPickerInfo();
      return;
    }
  }

  if (technicianPickerContext === 'edit') {
    setEditingTechnicians(selectedIds);
  } else {
    setSelectedTechnicians(selectedIds);
  }

  updateTechnicianPickerInfo();

 const modalEl = document.getElementById('selectTechniciansModal');
 if (modalEl && window.bootstrap?.Modal) {
    const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalEl);
    modalInstance?.hide?.();
  }
}

function openTechnicianPicker(context = 'create') {
  technicianPickerContext = context;
  const technicians = syncTechniciansStatuses();
  if (Array.isArray(technicians) && technicians.length) {
    cachedTechnicians = technicians;
  }

  const searchInput = document.getElementById('technician-picker-search');
  if (searchInput) {
    searchInput.value = '';
  }

  populateTechnicianPickerTable();
  updateTechnicianPickerInfo();

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }
}

function setupTechnicianPickerInternal() {
  const openCreateBtn = document.getElementById('open-technician-picker');
  if (openCreateBtn && !openCreateBtn.dataset.listenerAttached) {
    openCreateBtn.addEventListener('click', () => openTechnicianPicker('create'));
    openCreateBtn.dataset.listenerAttached = 'true';
  }

  const openEditBtn = document.getElementById('open-edit-technician-picker');
  if (openEditBtn && !openEditBtn.dataset.listenerAttached) {
    openEditBtn.addEventListener('click', () => openTechnicianPicker('edit'));
    openEditBtn.dataset.listenerAttached = 'true';
  }

  const searchInput = document.getElementById('technician-picker-search');
  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener('input', () => {
      populateTechnicianPickerTable();
      updateTechnicianPickerInfo();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  const applyBtn = document.getElementById('apply-technician-selection');
  if (applyBtn && !applyBtn.dataset.listenerAttached) {
    applyBtn.addEventListener('click', applyTechnicianSelection);
    applyBtn.dataset.listenerAttached = 'true';
  }

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && !modalEl.dataset.listenerAttached && window.bootstrap?.Modal) {
    modalEl.addEventListener('shown.bs.modal', () => {
      updateTechnicianPickerInfo();
      populateTechnicianPickerTable();
    });
    modalEl.addEventListener('hidden.bs.modal', () => {
      const searchInputEl = document.getElementById('technician-picker-search');
      if (searchInputEl) searchInputEl.value = '';
    });
    modalEl.dataset.listenerAttached = 'true';
  }

  renderAllSelectedTechnicians();
}

export function renderAllSelectedTechnicians() {
  renderTechnicianChips('selected-technicians-list', selectedTechnicians, 'create');
  renderTechnicianChips('edit-selected-technicians-list', editingTechnicians, 'edit');
}

export function initTechnicianSelection({ onDraftChange, onEditChange } = {}) {
  onDraftSelectionChange = typeof onDraftChange === 'function' ? onDraftChange : () => {};
  onEditSelectionChange = typeof onEditChange === 'function' ? onEditChange : () => {};
  renderAllSelectedTechnicians();
  setupTechnicianPickerInternal();
}

export function setCachedTechnicians(list = []) {
  cachedTechnicians = Array.isArray(list) ? list : [];
}

export function getSelectedTechnicians() {
  return [...selectedTechnicians];
}

export function getEditingTechnicians() {
  return [...editingTechnicians];
}

export function setSelectedTechnicians(ids = []) {
  selectedTechnicians = Array.isArray(ids) ? ids.map(String) : [];
  renderTechnicianChips('selected-technicians-list', selectedTechnicians, 'create');
  onDraftSelectionChange();
}

export function setEditingTechnicians(ids = []) {
  editingTechnicians = Array.isArray(ids) ? ids.map(String) : [];
  renderTechnicianChips('edit-selected-technicians-list', editingTechnicians, 'edit');
  onEditSelectionChange();
}

export function resetSelectedTechnicians() {
  setSelectedTechnicians([]);
}

export function resetEditingTechnicians() {
  setEditingTechnicians([]);
}

export function reconcileTechnicianSelections(latest = []) {
  setCachedTechnicians(latest);

  const validIds = new Set(cachedTechnicians.map((tech) => String(tech.id)));
  const filteredSelected = selectedTechnicians.filter((id) => validIds.has(String(id)));
  const filteredEditing = editingTechnicians.filter((id) => validIds.has(String(id)));

  const selectedChanged = filteredSelected.length !== selectedTechnicians.length;
  const editingChanged = filteredEditing.length !== editingTechnicians.length;

  selectedTechnicians = filteredSelected;
  editingTechnicians = filteredEditing;

  renderAllSelectedTechnicians();

  if (selectedChanged) onDraftSelectionChange();
  if (editingChanged) onEditSelectionChange();

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && modalEl.classList.contains('show')) {
    populateTechnicianPickerTable();
    updateTechnicianPickerInfo();
  }
}
