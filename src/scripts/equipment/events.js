import { showToast } from '../utils.js';
import { t } from '../language.js';
import { AUTH_EVENTS } from '../auth.js';
import { requestAddEquipmentToSelection, EQUIPMENT_SELECTION_EVENTS } from '../reservations/equipmentSelection.js';
import { state, getAllEquipment } from './state.js';
import { normalizeNumbers, parseFloatSafe, parseInteger, getEquipmentImage } from './normalize.js';
import { attachEnglishDigitNormalizer, generateUniqueEquipmentBarcode } from './barcode.js';
import { updateEquipmentSelectionBanner } from './selection.js';
import { renderEquipment, populateAddEquipmentDatalists } from './render.js';
import {
  refreshEquipmentFromApi,
  syncEquipmentStatuses,
  clearEquipment,
  deleteEquipment,
  editEquipment,
  handleAddEquipmentSubmit,
} from './api.js';
import {
  openEditEquipmentModal,
  refreshVariantsIfNeeded,
  setEquipmentEditMode,
  captureEquipmentFormValues,
  applyEquipmentFormValues,
  updateEquipmentHeaderMedia,
  updateEquipmentLessorBadge,
  getEquipmentFormElements,
} from './modal.js';
import { clearEquipmentVariants, getVariantsForItem } from './variants.js';
import { downloadEquipmentToExcel } from './excel.js';

// ── List event delegation ─────────────────────────────────────────────────────

function handleEquipmentListClick(event) {
  const selectButton = event.target.closest('[data-equipment-action="select-reservation"]');
  if (selectButton) {
    event.preventDefault();
    event.stopPropagation();
    const card          = selectButton.closest('[data-equipment-card="true"]');
    const quantityInput = card?.querySelector('[data-equipment-select-quantity]');
    let quantity        = Number.parseInt(quantityInput?.value || '1', 10);
    if (!Number.isFinite(quantity) || quantity <= 0) quantity = 1;

    const maxSelectable = Number.parseInt(selectButton.dataset.selectionMax || '0', 10);
    if (Number.isFinite(maxSelectable) && maxSelectable > 0 && quantity > maxSelectable) {
      quantity = maxSelectable;
    }

    const availableRaw  = selectButton.dataset.selectionBarcodes || '';
    const availableBarcodes = availableRaw
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    const description = card?.querySelector('.equipment-card__title')?.textContent?.trim() || '';
    const groupKey    = card?.dataset.equipmentGroupKey || selectButton.dataset.selectionGroup || '';

    const success = requestAddEquipmentToSelection({ barcodes: availableBarcodes, quantity, groupKey, description });
    if (!success) {
      showToast(t('reservations.create.equipment.selector.selectionInactive', '⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد'));
    }
    return;
  }

  if (
    event.target.closest('[data-equipment-select-quantity]') ||
    event.target.closest('.equipment-card__selection-controls')
  ) return;

  const deleteButton = event.target.closest('[data-equipment-action="delete"]');
  if (deleteButton) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(deleteButton.dataset.equipmentIndex);
    if (!Number.isNaN(index)) {
      deleteEquipment(index).catch((error) => {
        console.error('❌ [equipment/events.js] deleteEquipment', error);
      });
    }
    return;
  }

  const card = event.target.closest('[data-equipment-card="true"]');
  if (card) {
    const index = Number(card.dataset.equipmentIndex);
    if (!Number.isNaN(index)) openEditEquipmentModal(index);
  }
}

function handleEquipmentListKeyDown(event) {
  if (event.defaultPrevented) return;
  if (event.target.closest('[data-equipment-action]')) return;
  if (
    event.target.matches('[data-equipment-select-quantity]') ||
    event.target.closest('.equipment-card__selection-controls')
  ) return;
  const card = event.target.closest('[data-equipment-card="true"]');
  if (!card) return;

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    const index = Number(card.dataset.equipmentIndex);
    if (!Number.isNaN(index)) openEditEquipmentModal(index);
  }
}

function handleVariantTableClick(event) {
  const focusButton = event.target.closest('[data-variant-action="focus"]');
  if (focusButton) {
    const variantIndex = Number(focusButton.dataset.variantIndex);
    if (!Number.isNaN(variantIndex)) openEditEquipmentModal(variantIndex);
    return;
  }
  const deleteButton = event.target.closest('[data-variant-action="delete"]');
  if (deleteButton) {
    const variantIndex = Number(deleteButton.dataset.variantIndex);
    if (!Number.isNaN(variantIndex)) {
      deleteEquipment(variantIndex).catch((error) => {
        console.error('❌ [equipment/events.js] deleteEquipment', error);
      });
    }
  }
}

function handleEquipmentSearch() {
  state.pagination.page = 1;
  renderEquipment();
}

// ── Main UI wiring ────────────────────────────────────────────────────────────

function wireUpEquipmentUI() {
  document.getElementById('search-equipment')?.addEventListener('input', handleEquipmentSearch);
  document.getElementById('filter-category')?.addEventListener('change', handleEquipmentSearch);
  document.getElementById('filter-sub')?.addEventListener('change', handleEquipmentSearch);
  document.getElementById('filter-status')?.addEventListener('change', handleEquipmentSearch);
  document.getElementById('add-equipment-form')?.addEventListener('submit', handleAddEquipmentSubmit);

  attachEnglishDigitNormalizer(document.getElementById('new-equipment-barcode'));
  populateAddEquipmentDatalists();

  const genButton = document.getElementById('generate-equipment-barcode');
  if (genButton && !genButton.dataset.listenerAttached) {
    genButton.addEventListener('click', (event) => {
      event.preventDefault();
      const input = document.getElementById('new-equipment-barcode');
      if (!input) return;
      const value = generateUniqueEquipmentBarcode();
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
    });
    genButton.dataset.listenerAttached = 'true';
  }

  const clearButton = document.getElementById('equipment-clear-btn');
  if (clearButton && !clearButton.dataset.listenerAttached) {
    clearButton.addEventListener('click', (event) => {
      event.preventDefault();
      clearEquipment().catch((error) => {
        console.error('❌ [equipment/events.js] clearEquipment', error);
      });
    });
    clearButton.dataset.listenerAttached = 'true';
  }

  const excelDownloadBtn = document.getElementById('excel-download-trigger');
  if (excelDownloadBtn && !excelDownloadBtn.dataset.listenerAttached) {
    excelDownloadBtn.addEventListener('click', (event) => {
      event.preventDefault();
      downloadEquipmentToExcel().catch((error) => {
        console.error('❌ [equipment/events.js] downloadEquipmentToExcel', error);
      });
    });
    excelDownloadBtn.dataset.listenerAttached = 'true';
  }

  const equipmentList = document.getElementById('equipment-list');
  if (equipmentList && !equipmentList.dataset.listenerAttached) {
    equipmentList.addEventListener('click', handleEquipmentListClick);
    equipmentList.addEventListener('keydown', handleEquipmentListKeyDown);
    equipmentList.dataset.listenerAttached = 'true';
  }

  const variantsTable = document.getElementById('equipment-variants-table-body');
  if (variantsTable && !variantsTable.dataset.listenerAttached) {
    variantsTable.addEventListener('click', handleVariantTableClick);
    variantsTable.dataset.listenerAttached = 'true';
  }

  ['edit-equipment-quantity', 'edit-equipment-price', 'edit-equipment-cost', 'edit-equipment-barcode'].forEach((id) => {
    attachEnglishDigitNormalizer(document.getElementById(id));
  });
}

// ── Save button ───────────────────────────────────────────────────────────────

document.getElementById('save-equipment-changes')?.addEventListener('click', async () => {
  if (!state.isEditMode) {
    state.currentEquipmentSnapshot = captureEquipmentFormValues();
    setEquipmentEditMode(true);
    return;
  }
  const indexValue = document.getElementById('edit-equipment-index').value;
  const index      = Number.parseInt(indexValue, 10);
  if (Number.isNaN(index)) {
    showToast(t('equipment.toast.updateFailed', 'تعذر تحديث بيانات المعدة'), 'error');
    return;
  }

  const updatedData = {
    category: document.getElementById('edit-equipment-category').value,
    sub:      document.getElementById('edit-equipment-subcategory').value,
    desc:     document.getElementById('edit-equipment-description').value,
    qty:      parseInteger(document.getElementById('edit-equipment-quantity').value) || 1,
    price:    parseFloatSafe(document.getElementById('edit-equipment-price').value) || 0,
    cost:     parseFloatSafe(document.getElementById('edit-equipment-cost').value)  || 0,
    barcode:  normalizeNumbers(document.getElementById('edit-equipment-barcode').value).trim(),
    status:   document.getElementById('edit-equipment-status').value,
    image:    document.getElementById('edit-equipment-image').value,
    lessor:   document.getElementById('edit-equipment-lessor').value,
  };

  try {
    await editEquipment(index, updatedData);
    const refreshed = getAllEquipment()[index];
    if (refreshed) {
      applyEquipmentFormValues({
        category:    refreshed.category || '',
        subcategory: refreshed.sub      || '',
        description: refreshed.desc     || refreshed.description || '',
        quantity:    String(refreshed.qty   || 0),
        price:       refreshed.price != null ? String(refreshed.price) : '0',
        cost:        refreshed.cost  != null ? String(refreshed.cost)  : '0',
        image:       getEquipmentImage(refreshed) || '',
        barcode:     refreshed.barcode || '',
        status:      refreshed.status  || '',
        lessor:      refreshed.lessor  || '',
      });
      updateEquipmentHeaderMedia(refreshed);
      updateEquipmentLessorBadge(refreshed);
    }
    state.currentEquipmentSnapshot = captureEquipmentFormValues();
    setEquipmentEditMode(false);
    refreshVariantsIfNeeded();
  } catch (error) {
    console.error('❌ [equipment/events.js] editEquipment', error);
  }
});

// ── DOM lifecycle & cross-module events ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  wireUpEquipmentUI();
  renderEquipment();
  refreshEquipmentFromApi();

  const cancelEditBtn = document.getElementById('equipment-edit-cancel');
  if (cancelEditBtn && !cancelEditBtn.dataset.listenerAttached) {
    cancelEditBtn.addEventListener('click', () => {
      if (state.currentEquipmentSnapshot) {
        applyEquipmentFormValues(state.currentEquipmentSnapshot);
      }
      if (state.activeEquipmentIndex != null) {
        const items    = getAllEquipment();
        const baseItem = items[state.activeEquipmentIndex];
        if (baseItem) {
          const variants = getVariantsForItem(baseItem);
          const primary  = variants[0] || baseItem;
          updateEquipmentHeaderMedia(primary);
        }
      }
      setEquipmentEditMode(false);
    });
    cancelEditBtn.dataset.listenerAttached = 'true';
  }

  const saveButton = document.getElementById('save-equipment-changes');
  if (saveButton && !saveButton.dataset.listenerAttached) {
    saveButton.dataset.listenerAttached = 'true';
    if (!saveButton.dataset.mode) saveButton.dataset.mode = 'view';
  }
});

document.addEventListener('language:changed', () => {
  renderEquipment();
  setEquipmentEditMode(state.isEditMode);
  if (state.activeEquipmentIndex != null) {
    const items    = getAllEquipment();
    const baseItem = items[state.activeEquipmentIndex];
    if (baseItem) {
      const variants = getVariantsForItem(baseItem);
      updateEquipmentHeaderMedia(variants[0] || baseItem);
    }
  }
});

document.addEventListener('equipment:refreshRequested', () => {
  refreshEquipmentFromApi({ showToastOnError: false });
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderEquipment();
});

document.addEventListener('equipment:changed', () => {
  refreshVariantsIfNeeded();
  populateAddEquipmentDatalists();
});

document.addEventListener('reservations:changed', () => {
  syncEquipmentStatuses();
  renderEquipment();
});

document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('editEquipmentModal');
  if (modalElement && !modalElement.dataset.variantsListenerAttached) {
    modalElement.addEventListener('hidden.bs.modal', () => {
      state.currentVariantsContext  = null;
      state.activeEquipmentIndex    = null;
      state.currentEquipmentSnapshot = null;
      clearEquipmentVariants();
      setEquipmentEditMode(false);
    });
    modalElement.dataset.variantsListenerAttached = 'true';
  }
});

if (typeof document !== 'undefined' && !state.selectionChangeListenerAttached) {
  document.addEventListener(EQUIPMENT_SELECTION_EVENTS.change, () => {
    updateEquipmentSelectionBanner();
    renderEquipment();
  });
  state.selectionChangeListenerAttached = true;
}
