import { normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { state, getAllEquipment } from './state.js';
import {
  normalizeStatusValue,
  getEquipmentImage,
  escapeHtml,
} from './normalize.js';
import {
  resolveEquipmentGroupKey,
  clearEquipmentVariants,
  renderEquipmentVariantsSection,
} from './variants.js';

// ── Bootstrap modal helper ────────────────────────────────────────────────────

export function getBootstrapModal(element) {
  if (!element) return null;
  const bootstrapModal = window?.bootstrap?.Modal ?? (typeof bootstrap !== 'undefined' ? bootstrap.Modal : null);
  if (!bootstrapModal) return null;
  return bootstrapModal.getOrCreateInstance(element);
}

// ── Form elements ─────────────────────────────────────────────────────────────

export function getEquipmentFormElements() {
  return {
    category:    document.getElementById('edit-equipment-category'),
    subcategory: document.getElementById('edit-equipment-subcategory'),
    description: document.getElementById('edit-equipment-description'),
    quantity:    document.getElementById('edit-equipment-quantity'),
    price:       document.getElementById('edit-equipment-price'),
    cost:        document.getElementById('edit-equipment-cost'),
    image:       document.getElementById('edit-equipment-image'),
    barcode:     document.getElementById('edit-equipment-barcode'),
    status:      document.getElementById('edit-equipment-status'),
    lessor:      document.getElementById('edit-equipment-lessor'),
  };
}

export function captureEquipmentFormValues() {
  const elements = getEquipmentFormElements();
  return {
    category:    elements.category?.value    ?? '',
    subcategory: elements.subcategory?.value ?? '',
    description: elements.description?.value ?? '',
    quantity:    elements.quantity?.value    ?? '',
    price:       elements.price?.value       ?? '',
    cost:        elements.cost?.value        ?? '',
    image:       elements.image?.value       ?? '',
    barcode:     elements.barcode?.value     ?? '',
    status:      elements.status?.value      ?? '',
    lessor:      elements.lessor?.value      ?? '',
  };
}

export function applyEquipmentFormValues(values = {}) {
  const elements = getEquipmentFormElements();
  if (elements.category)    elements.category.value    = values.category    ?? '';
  if (elements.subcategory) elements.subcategory.value = values.subcategory ?? '';
  if (elements.description) elements.description.value = values.description ?? '';
  if (elements.quantity)    elements.quantity.value    = values.quantity != null ? normalizeNumbers(String(values.quantity)) : '';
  if (elements.price)       elements.price.value       = values.price    != null ? normalizeNumbers(String(values.price))    : '';
  if (elements.cost)        elements.cost.value        = values.cost     != null ? normalizeNumbers(String(values.cost))     : '';
  if (elements.image)       elements.image.value       = values.image    ?? '';
  if (elements.barcode)     elements.barcode.value     = values.barcode  ?? '';
  if (elements.status)      elements.status.value      = values.status   ?? '';
  if (elements.lessor)      elements.lessor.value      = values.lessor   ?? '';
}

// ── Edit mode toggle ──────────────────────────────────────────────────────────

export function setEquipmentEditMode(isEditing) {
  state.isEditMode = isEditing;
  const elements = getEquipmentFormElements();
  const cancelBtn = document.getElementById('equipment-edit-cancel');
  const saveBtn   = document.getElementById('save-equipment-changes');
  const form      = document.getElementById('edit-equipment-form');

  if (form) form.classList.toggle('equipment-details-form--editing', isEditing);

  const inputs = [
    elements.category, elements.subcategory, elements.description,
    elements.quantity, elements.price, elements.cost, elements.image, elements.lessor,
  ];

  inputs.forEach((input) => {
    if (!input) return;
    if (isEditing) input.removeAttribute('disabled');
    else input.setAttribute('disabled', 'disabled');
  });

  if (cancelBtn) {
    cancelBtn.hidden   = !isEditing;
    cancelBtn.disabled = !isEditing;
  }
  if (saveBtn) {
    saveBtn.disabled = false;
    const labelKey = isEditing ? 'equipment.modal.actions.save' : 'equipment.modal.actions.edit';
    const fallback  = isEditing ? '💾 حفظ التعديلات' : '✏️ تعديل';
    saveBtn.textContent   = t(labelKey, fallback);
    saveBtn.dataset.mode  = isEditing ? 'save' : 'view';
  }

  if (isEditing) {
    const focusTarget = elements.description || elements.category || elements.subcategory;
    if (focusTarget) {
      setTimeout(() => {
        focusTarget.focus();
        if (typeof focusTarget.select === 'function') focusTarget.select();
      }, 0);
    }
  }
}

// ── Modal header ──────────────────────────────────────────────────────────────

export function updateEquipmentHeaderMedia(item) {
  const cover = document.getElementById('equipment-details-cover');
  if (!cover) return;
  const imageUrl = getEquipmentImage(item);
  if (imageUrl) {
    const alt = escapeHtml(item.desc || item.description || item.name || '');
    cover.innerHTML = `<img src="${escapeHtml(imageUrl)}" alt="${alt}">`;
    cover.classList.add('has-image');
  } else {
    cover.innerHTML = '<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>';
    cover.classList.remove('has-image');
  }
}

export function updateEquipmentLessorBadge(item) {
  const tag = document.getElementById('equipment-lessor-badge');
  if (!tag) return;
  const value = (item?.lessor || '').trim();
  if (value) {
    const label = t('equipment.modal.labels.lessor', '🏢 المؤجر');
    tag.textContent = `${label}: ${value}`;
    tag.hidden = false;
  } else {
    tag.hidden = true;
    tag.textContent = '🏢';
  }
}

// ── Open modal ────────────────────────────────────────────────────────────────

export function openEditEquipmentModal(index) {
  const allItems = getAllEquipment();
  const item     = allItems[index];
  if (!item) return;

  state.activeEquipmentIndex = index;
  const primary = item;

  document.getElementById('edit-equipment-index').value = index;

  applyEquipmentFormValues({
    category:    primary.category || '',
    subcategory: primary.sub      || '',
    description: primary.desc     || primary.description || '',
    quantity:    String(primary.qty   || 0),
    price:       primary.price != null ? String(primary.price) : '0',
    cost:        primary.cost  != null ? String(primary.cost)  : '0',
    image:       getEquipmentImage(primary) || '',
    barcode:     primary.barcode || '',
    status:      primary.status  || normalizeStatusValue(primary.status),
    lessor:      primary.lessor  || '',
  });

  setEquipmentEditMode(false);
  state.currentEquipmentSnapshot = captureEquipmentFormValues();
  updateEquipmentHeaderMedia(primary);
  updateEquipmentLessorBadge(primary);
  renderEquipmentVariantsSection(primary);

  state.currentVariantsContext = {
    groupKey: resolveEquipmentGroupKey(primary),
    barcode:  String(primary.barcode || ''),
    id:       primary.id || null,
  };

  getBootstrapModal(document.getElementById('editEquipmentModal'))?.show();
}

// ── Refresh variants when modal is open ───────────────────────────────────────

export function refreshVariantsIfNeeded() {
  if (!state.currentVariantsContext) return;

  const modalElement  = document.getElementById('editEquipmentModal');
  const isModalVisible = modalElement?.classList.contains('show');
  if (!isModalVisible) return;

  const items      = getAllEquipment();
  const matchById  = state.currentVariantsContext.id
    ? items.find((entry) => String(entry.id) === String(state.currentVariantsContext.id))
    : null;
  const groupKey   = state.currentVariantsContext.groupKey;
  const fallback   = groupKey ? items.find((entry) => resolveEquipmentGroupKey(entry) === groupKey) : null;
  const activeItem = matchById || fallback;

  if (!activeItem) {
    clearEquipmentVariants();
    return;
  }

  const newIndex = items.findIndex((entry) => entry === activeItem);
  if (newIndex >= 0) {
    const indexField = document.getElementById('edit-equipment-index');
    if (indexField) indexField.value = String(newIndex);
    state.activeEquipmentIndex = newIndex;
  }

  renderEquipmentVariantsSection(activeItem);
  updateEquipmentHeaderMedia(activeItem);
  updateEquipmentLessorBadge(activeItem);

  if (!state.isEditMode) {
    const primary = activeItem;
    applyEquipmentFormValues({
      category:    primary.category || '',
      subcategory: primary.sub      || '',
      description: primary.desc     || primary.description || '',
      quantity:    String(primary.qty   || 0),
      price:       primary.price != null ? String(primary.price) : '0',
      cost:        primary.cost  != null ? String(primary.cost)  : '0',
      image:       getEquipmentImage(primary) || '',
      barcode:     primary.barcode || '',
      status:      primary.status  || normalizeStatusValue(primary.status),
      lessor:      primary.lessor  || '',
    });
    state.currentEquipmentSnapshot = captureEquipmentFormValues();
  }

  updateEquipmentHeaderMedia(activeItem);
}
