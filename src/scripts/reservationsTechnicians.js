import { normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { syncTechniciansStatuses } from './technicians.js';

let cachedTechnicians = [];
let selectedTechnicians = [];
let editingTechnicians = [];
let technicianPickerContext = 'create';

let onDraftSelectionChange = () => {};
let onEditSelectionChange = () => {};

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
      const removeLabel = t('reservations.crew.removeAria', 'إزالة');
      return `
        <span class="technician-chip" data-id="${technicianId}">
          <span class="technician-chip-name">${name}</span>
          ${role}
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
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">${noResults}</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((tech) => `
    <tr>
      <td style="width:40px;">
        <input class="form-check-input technician-picker-checkbox" type="checkbox" value="${tech.id}" ${selectedIds.has(String(tech.id)) ? 'checked' : ''}>
      </td>
      <td>${tech.name || '-'}</td>
      <td>${tech.role || '—'}</td>
      <td>${tech.department || '—'}</td>
    </tr>
  `).join('');
}

function collectTechnicianPickerSelection() {
  return Array.from(document.querySelectorAll('.technician-picker-checkbox:checked'))
    .map((checkbox) => checkbox.value)
    .filter(Boolean);
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
  const selectedIds = collectTechnicianPickerSelection();
  if (technicianPickerContext === 'edit') {
    setEditingTechnicians(selectedIds.map(String));
  } else {
    setSelectedTechnicians(selectedIds.map(String));
  }

  updateTechnicianPickerInfo();

  const modalEl = document.getElementById('selectTechniciansModal');
  if (modalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(modalEl).hide();
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

