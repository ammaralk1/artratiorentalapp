import { normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { state, getAllEquipment } from './state.js';
import {
  normalizeDescriptionValue,
  normalizeLessorValue,
  renderStatus,
  escapeHtml,
} from './normalize.js';

export function resolveEquipmentGroupKey(item) {
  if (!item) return '';
  const descriptionSource = item.desc || item.description || item.name || '';
  const normalizedDesc = normalizeDescriptionValue(descriptionSource);

  if (normalizedDesc) {
    const normalizedLessor = normalizeLessorValue(item.lessor || '');
    return `${normalizedDesc}__lessor__${normalizedLessor}`;
  }

  let fallback = normalizeDescriptionValue(item.category || '');
  if (!fallback) {
    fallback = normalizeNumbers(String(item.barcode || '')).trim().toLowerCase();
  }
  return fallback;
}

export function getVariantsForItem(item) {
  const key = resolveEquipmentGroupKey(item);
  if (!key) return [];
  return getAllEquipment().filter((entry) => resolveEquipmentGroupKey(entry) === key);
}

export function clearEquipmentVariants() {
  const section = document.getElementById('equipment-variants-section');
  const tableBody = document.getElementById('equipment-variants-table-body');
  const countEl = document.getElementById('equipment-variants-count');
  if (section) section.hidden = true;
  if (tableBody) {
    const emptyMessage = t('equipment.modal.variants.empty', 'لا توجد قطع مرتبطة أخرى.');
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  if (countEl) countEl.textContent = '0';
}

export function renderEquipmentVariantsSection(baseItem) {
  const section = document.getElementById('equipment-variants-section');
  const tableBody = document.getElementById('equipment-variants-table-body');
  const countEl = document.getElementById('equipment-variants-count');
  if (!section || !tableBody || !baseItem) return;

  const contextKey = state.currentVariantsContext?.groupKey;
  const baseKey = contextKey || resolveEquipmentGroupKey(baseItem);
  if (!baseKey) {
    clearEquipmentVariants();
    return;
  }

  const variants = getAllEquipment()
    .filter((entry) => resolveEquipmentGroupKey(entry) === baseKey)
    .sort((a, b) => {
      const aBarcode = String(a.barcode || '').trim();
      const bBarcode = String(b.barcode || '').trim();
      if (!aBarcode && !bBarcode) return 0;
      if (!aBarcode) return 1;
      if (!bBarcode) return -1;
      return aBarcode.localeCompare(bBarcode, 'ar', { numeric: true, sensitivity: 'base' });
    });

  if (!variants.length) {
    clearEquipmentVariants();
    return;
  }

  section.hidden = false;
  if (countEl) countEl.textContent = String(variants.length);

  const currentBadgeLabel = t('equipment.modal.variants.current', 'الحالي');
  const selectLabel = t('equipment.modal.variants.select', 'اختيار');
  const qtyLabel = t('equipment.form.labels.quantity', 'الكمية');

  const allItems = getAllEquipment();

  const rows = variants
    .map((variant) => {
      const isCurrent = variant.id && baseItem.id
        ? String(variant.id) === String(baseItem.id)
        : String(variant.barcode || '') === String(baseItem.barcode || '');
      const rowClass = isCurrent ? 'equipment-variants-table__row--current' : '';
      const barcodeCell = escapeHtml(String(variant.barcode || '-'));
      const currentBadge = isCurrent
        ? `<span class="equipment-variants-current-badge">${escapeHtml(currentBadgeLabel)}</span>`
        : '';
      const qtyDisplay = normalizeNumbers(String(Number.isFinite(Number(variant.qty)) ? Number(variant.qty) : 0));
      const variantIndex = allItems.indexOf(variant);
      const deleteLabel = escapeHtml(t('equipment.item.actions.delete', '🗑️ حذف'));
      const actions = variantIndex >= 0
        ? `<div class="table-action-buttons equipment-variant-actions">
            ${!isCurrent ? `<button type="button" class="btn btn-sm btn-secondary equipment-variant-action" data-variant-action="focus" data-variant-index="${variantIndex}">✏️ ${escapeHtml(selectLabel)}</button>` : ''}
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${variantIndex}">${deleteLabel}</button>
          </div>`
        : '';
      return `
        <tr class="${rowClass}">
          <td>${barcodeCell}${currentBadge}</td>
          <td>${renderStatus(variant.status)}</td>
          <td><span class="equipment-variants-qty" title="${escapeHtml(qtyLabel)}">${qtyDisplay}</span></td>
          <td class="table-actions-cell">${actions}</td>
        </tr>
      `;
    })
    .join('');

  tableBody.innerHTML = rows;
}
