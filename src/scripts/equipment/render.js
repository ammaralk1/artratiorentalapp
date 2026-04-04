import { normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { userCanManageDestructiveActions } from '../auth.js';
import { getEquipmentPaginationState, buildEquipmentPageNumbers } from '../equipmentPagination.js';
import { refreshEnhancedSelect } from '../ui/enhancedSelect.js';
import { state, getAllEquipment, resetEquipmentPagination } from './state.js';
import {
  normalizeStatusValue,
  parseInteger,
  escapeHtml,
  getEquipmentImage,
} from './normalize.js';
import { compareEquipmentItemsByBarcode } from './barcode.js';
import { updateEquipmentSelectionBanner, evaluateSelectionStateForItem, getActiveSelectionContext } from './selection.js';
import { resolveEquipmentGroupKey } from './variants.js';

// ── Empty state ───────────────────────────────────────────────────────────────

export function renderEmptyState(message, { tone = '', icon = '📦' } = {}) {
  const classes = ['equipment-empty-state'];
  if (tone) classes.push(`equipment-empty-state--${tone}`);
  return `
    <div class="${classes.join(' ')}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${icon}</div>
      <p class="equipment-empty-state__text">${message}</p>
    </div>
  `;
}

// ── Filter UI ─────────────────────────────────────────────────────────────────

export function populateFilters(data) {
  const categories = [...new Set(data.map((i) => i.category).filter(Boolean))];
  const subs = [...new Set(data.map((i) => i.sub).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'ar', { sensitivity: 'base' }));

  const categorySelect = document.getElementById('filter-category');
  const subSelect = document.getElementById('filter-sub');

  if (categorySelect) {
    const currentValue = categorySelect.value;
    while (categorySelect.options.length > 1) categorySelect.remove(1);
    categories.forEach((c) => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      categorySelect.appendChild(opt);
    });
    if (categories.includes(currentValue)) categorySelect.value = currentValue;
    refreshEnhancedSelect(categorySelect);
  }

  if (subSelect) {
    const currentValue = subSelect.value;
    while (subSelect.options.length > 1) subSelect.remove(1);
    subs.forEach((s) => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      subSelect.appendChild(opt);
    });
    if (subs.includes(currentValue)) subSelect.value = currentValue;
    refreshEnhancedSelect(subSelect);
  }

  const statusSelect = document.getElementById('filter-status');
  if (statusSelect) refreshEnhancedSelect(statusSelect);
}

export function populateAddEquipmentDatalists() {
  if (typeof document === 'undefined') return;
  const items = getAllEquipment();

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'ar', { sensitivity: 'base' }));
  const subs = [...new Set(items.map((i) => i.sub).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'ar', { sensitivity: 'base' }));
  const lessors = [...new Set(items.map((i) => i.lessor).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'ar', { sensitivity: 'base' }));

  const setOptions = (datalistId, values) => {
    const list = document.getElementById(datalistId);
    if (!list) return;
    while (list.firstChild) list.removeChild(list.firstChild);
    values.forEach((val) => {
      const opt = document.createElement('option');
      opt.value = String(val);
      list.appendChild(opt);
    });
  };

  setOptions('new-equipment-category-list', categories);
  setOptions('new-equipment-sub-list', subs);
  setOptions('new-equipment-lessor-list', lessors);
}

// ── Pagination ────────────────────────────────────────────────────────────────

function buildEquipmentFilterSignature({ search = '', category = '', sub = '', statusFilter = '' } = {}) {
  return JSON.stringify([search, category, sub, statusFilter]);
}

export function renderEquipmentPagination(totalItems) {
  const host = document.getElementById('equipment-list-pagination');
  if (!host) return;

  const paginationState = getEquipmentPaginationState({
    totalItems,
    page: state.pagination.page,
    pageSize: state.pagination.pageSize,
  });
  state.pagination.page = paginationState.currentPage;

  if (totalItems <= 0 || paginationState.totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  const navLabel     = t('equipment.pagination.navigation', 'التنقل بين صفحات المعدات');
  const prevLabel    = t('equipment.pagination.prev', 'السابق');
  const nextLabel    = t('equipment.pagination.next', 'التالي');
  const pageLabelTpl = t('equipment.pagination.page', 'صفحة {page}');
  const rangeTpl     = t('equipment.pagination.range', '{from}-{to} من {total}');
  const rangeText    = rangeTpl
    .replace('{from}',  normalizeNumbers(String(paginationState.rangeStart)))
    .replace('{to}',    normalizeNumbers(String(paginationState.rangeEnd)))
    .replace('{total}', normalizeNumbers(String(totalItems)));

  const pageNumbers  = buildEquipmentPageNumbers(paginationState.currentPage, paginationState.totalPages);
  const buttonsHtml  = pageNumbers
    .map((page) => {
      const isActive  = page === paginationState.currentPage;
      const pageLabel = pageLabelTpl.replace('{page}', normalizeNumbers(String(page)));
      return `<button type="button" class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}" data-equipment-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${isActive ? 'aria-current="page"' : ''}>${normalizeNumbers(String(page))}</button>`;
    })
    .join('');

  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="btn btn-sm btn-outline-primary" data-equipment-page="${paginationState.currentPage - 1}" ${paginationState.currentPage <= 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${buttonsHtml}
      <button type="button" class="btn btn-sm btn-outline-primary" data-equipment-page="${paginationState.currentPage + 1}" ${paginationState.currentPage >= paginationState.totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;

  host.querySelectorAll('[data-equipment-page]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextPage = Number.parseInt(button.getAttribute('data-equipment-page') || '', 10);
      if (!Number.isFinite(nextPage)) return;
      state.pagination.page = nextPage;
      renderEquipment();
    });
  });
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function renderEquipmentItem({ item, index }) {
  const imageUrl   = getEquipmentImage(item);
  const deleteLabel    = t('equipment.item.actions.delete', '🗑️ حذف');
  const imageAlt       = t('equipment.item.imageAlt', 'صورة');
  const currencyLabel  = t('equipment.item.currency', 'SR');

  const canDelete = userCanManageDestructiveActions();

  const labels = {
    description: t('equipment.card.labels.description', 'الوصف'),
    status:      t('equipment.card.labels.status', 'الحالة'),
    alias:       t('equipment.card.labels.alias', 'الاسم'),
    quantity:    t('equipment.card.labels.quantity', 'الكمية'),
    price:       t('equipment.card.labels.price', 'السعر'),
    cost:        t('equipment.card.labels.cost', 'التكلفة'),
    category:    t('equipment.card.labels.category', 'القسم'),
    subcategory: t('equipment.card.labels.subcategory', 'القسم الثانوي'),
    barcode:     t('equipment.card.labels.barcode', 'الباركود'),
    available:   t('equipment.card.labels.available', 'متاح'),
  };

  const qtyNumber  = Number.isFinite(Number(item.qty))   ? Number(item.qty)   : 0;
  const priceNum   = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
  const costNum    = Number.isFinite(Number(item.cost))  ? Number(item.cost)  : 0;
  const qtyDisplay   = qtyNumber.toLocaleString('en-US');
  const priceDisplay = priceNum.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const costDisplay  = costNum.toLocaleString('en-US',  { minimumFractionDigits: 0, maximumFractionDigits: 2 });

  const reservedQtyNum     = Number.isFinite(Number(item.reservedQty))     ? Number(item.reservedQty)     : 0;
  const maintenanceQtyNum  = Number.isFinite(Number(item.maintenanceQty))  ? Number(item.maintenanceQty)  : 0;
  const availableQtyNum    = Number.isFinite(Number(item.availableQty))
    ? Number(item.availableQty)
    : Math.max(qtyNumber - reservedQtyNum - maintenanceQtyNum, 0);
  const availableDisplay   = availableQtyNum.toLocaleString('en-US');
  const availableOfTotal   = t('equipment.card.labels.availableOfTotal', 'من أصل');
  const availabilityState  = normalizeStatusValue(item.status);

  let availabilityText          = `${escapeHtml(labels.available)}: ${escapeHtml(availableDisplay)} ${escapeHtml(availableOfTotal)} ${escapeHtml(qtyDisplay)}`;
  let availabilityClassModifier = 'available';

  if (availableQtyNum === 0) {
    const zeroStateMap = {
      reserved:    { text: qtyNumber === 1 ? t('equipment.card.availability.reservedSingle', 'مؤجرة') : t('equipment.card.availability.reserved', 'مؤجرة بالكامل'), modifier: 'reserved' },
      maintenance: { text: t('equipment.card.availability.maintenance', 'تحت الصيانة'), modifier: 'maintenance' },
      retired:     { text: t('equipment.card.availability.retired',     'غير متاحة'),   modifier: 'retired' },
      default:     { text: t('equipment.card.availability.unavailable', 'غير متاحة حالياً'), modifier: 'unavailable' },
    };
    const stateConfig = zeroStateMap[availabilityState] || zeroStateMap.default;
    availabilityText          = escapeHtml(stateConfig.text);
    availabilityClassModifier = stateConfig.modifier;
  }

  const availabilityHtml = `<span class="equipment-card__availability equipment-card__availability--${availabilityClassModifier}">${availabilityText}</span>`;
  const title     = item.desc || item.name || t('common.placeholder.empty', '—');
  const aliasValue = item.name && item.name !== item.desc ? item.name : '';

  const metricsRowHtml = `
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[
        { label: labels.quantity, value: qtyDisplay },
        { label: labels.price,    value: `${priceDisplay} ${currencyLabel}` },
        { label: labels.cost,     value: `${costDisplay} ${currencyLabel}` },
      ].map(({ label, value }) => `
        <span class="equipment-card__info-item equipment-card__info-item--stacked">
          <span class="equipment-card__detail-label">${label}</span>
          <span class="equipment-card__detail-value">${value}</span>
        </span>
      `).join('')}
    </div>`;

  const categoryItems = [
    item.category ? { label: labels.category,    value: item.category } : null,
    item.sub      ? { label: labels.subcategory, value: item.sub }      : null,
  ].filter(Boolean);

  const categoriesHtml = categoryItems.length
    ? `<div class="equipment-card__categories">${categoryItems.map(({ label, value }) => `
        <div class="equipment-card__category">
          <span class="equipment-card__detail-label">${label}</span>
          <span class="equipment-card__detail-value">${value}</span>
        </div>`).join('')}</div>`
    : '';

  const aliasHtml = aliasValue
    ? `<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${labels.alias}</span>
        <span class="equipment-card__detail-value">${aliasValue}</span>
      </div>`
    : '';

  const lessorValue = (item.lessor || '').trim();
  const lessorTagHtml = lessorValue
    ? `<div class="equipment-card__lessor"><span class="equipment-tag" title="${escapeHtml(t('equipment.modal.labels.lessor', '🏢 المؤجر'))}">🏢 ${escapeHtml(lessorValue)}</span></div>`
    : '';

  const detailsHtml = `
    <div class="equipment-card__details">
      <div class="equipment-card__description">
        <span class="equipment-card__label">${labels.description}</span>
        <h3 class="equipment-card__title">${title}</h3>
      </div>
      ${metricsRowHtml}
    </div>`;

  const selectionState = evaluateSelectionStateForItem(item);
  const availableBarcodesAttr = selectionState?.availableBarcodes?.length
    ? selectionState.availableBarcodes.join(',')
    : (selectionState?.barcode ? selectionState.barcode : '');

  let selectionControlsHtml = '';
  let selectionButtonHtml   = '';

  if (selectionState.active) {
    const quantitySelectId = `equipment-select-qty-${index}`;
    const isSelectable  = Boolean(selectionState.canSelect);
    const maxSelectable = isSelectable
      ? Math.max(1, Number(selectionState.maxQuantity || (selectionState.availableBarcodes?.length || 1)))
      : 1;
    const optionCount   = Math.max(1, Math.min(maxSelectable, 99));
    const quantityOptions = [];
    for (let i = 1; i <= optionCount; i += 1) {
      quantityOptions.push(`<option value="${i}"${i === 1 ? ' selected' : ''}>${normalizeNumbers(String(i))}</option>`);
    }
    const quantityDisabledAttr = isSelectable ? '' : ' disabled';
    const quantityLabel        = t('reservations.create.equipment.selector.quantityLabel', 'الكمية');
    const availabilityLabel    = isSelectable
      ? `${t('reservations.create.equipment.selector.availableHint', 'الوحدات المتاحة')}: ${normalizeNumbers(String(maxSelectable))}`
      : (selectionState.reason ? selectionState.reason : '');

    selectionControlsHtml = `
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${quantitySelectId}">${quantityLabel}</label>
        <select class="equipment-card__quantity-select" id="${quantitySelectId}" data-equipment-select-quantity${quantityDisabledAttr}>
          ${quantityOptions.join('')}
        </select>
        ${availabilityLabel ? `<span class="equipment-card__selection-hint">${escapeHtml(availabilityLabel)}</span>` : ''}
      </div>`;

    const selectionCtx  = getActiveSelectionContext();
    const selectionMode = selectionCtx?.mode || selectionCtx?.source || '';
    const isPackageMode = selectionMode === 'package-manager' || selectionMode === 'equipment-packages';
    const addLabel      = isPackageMode
      ? t('equipment.packages.selection.addToPackage', '➕ أضف إلى الحزمة')
      : t('reservations.create.equipment.selector.addToReservation', '➕ أضف إلى الحجز');
    const disabledAttr  = isSelectable ? '' : ' disabled';
    const reasonAttr    = selectionState.reason ? ` title="${escapeHtml(selectionState.reason)}"` : '';
    const datasetAttrs  = [
      'data-equipment-action="select-reservation"',
      `data-selection-max="${isSelectable ? maxSelectable : 0}"`,
    ];

    if (availableBarcodesAttr) {
      datasetAttrs.push(`data-selection-barcodes="${escapeHtml(availableBarcodesAttr)}"`);
    }
    if (item.groupKey) {
      datasetAttrs.push(`data-selection-group="${escapeHtml(String(item.groupKey))}"`);
    }

    selectionButtonHtml = `
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${datasetAttrs.join(' ')}${disabledAttr}${reasonAttr}>${addLabel}</button>`;
  }

  const actionButtons = [];
  if (canDelete) {
    actionButtons.push(
      `<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${index}">${deleteLabel}</button>`
    );
  }
  const actionsHtml = actionButtons.join('\n');
  const cardLabel   = escapeHtml(title);

  return `
    <article
      class="equipment-card"
      data-equipment-index="${index}"
      ${item.groupKey ? `data-equipment-group-key="${escapeHtml(String(item.groupKey))}"` : ''}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${cardLabel}"
    >
      <div class="equipment-card__header">
        <div class="equipment-card__status-block">
          ${availabilityHtml}
        </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${imageUrl
              ? `<img src="${imageUrl}" alt="${imageAlt}" loading="lazy">`
              : `<div class="equipment-card__placeholder">📦</div>`}
          </div>
          ${detailsHtml}
        </div>
      </div>
      <div class="equipment-card__body">
        ${lessorTagHtml}
        ${categoriesHtml}
        ${aliasHtml}
      </div>
      ${selectionControlsHtml || selectionButtonHtml || actionsHtml
        ? `<div class="equipment-card__actions equipment-card__actions--center">
            ${selectionControlsHtml}
            ${selectionButtonHtml}
            ${actionsHtml}
          </div>`
        : ''}
    </article>
  `;
}

// ── Main render ───────────────────────────────────────────────────────────────

export function renderEquipment() {
  const container = document.getElementById('equipment-list');
  if (!container) return;

  updateEquipmentSelectionBanner();

  // syncEquipmentStatuses is injected to avoid circular dep (render ↔ api)
  const synced = typeof _syncEquipmentStatuses === 'function'
    ? _syncEquipmentStatuses()
    : null;
  const data = Array.isArray(synced) ? synced : getAllEquipment();

  const groupedMap = new Map();
  data.forEach((item) => {
    if (!item) return;
    const key = resolveEquipmentGroupKey(item);
    if (!key) return;
    if (!groupedMap.has(key)) groupedMap.set(key, []);
    groupedMap.get(key).push(item);
  });

  const entries = Array.from(groupedMap.values()).map((variants) => {
    const primary = variants[0];
    const totalQty = variants.reduce((sum, v) => sum + (Number.isFinite(Number(v.qty)) ? Number(v.qty) : 0), 0);
    const statusPriority = ['maintenance', 'reserved', 'available', 'retired'];
    const aggregatedStatus = variants
      .map((v) => normalizeStatusValue(v.status))
      .sort((a, b) => statusPriority.indexOf(a) - statusPriority.indexOf(b))[0] || 'available';
    const statusTotals = variants.reduce(
      (totals, v) => {
        const qty = parseInteger(v?.qty ?? 0) || 0;
        const vs  = normalizeStatusValue(v?.status);
        if (vs === 'reserved')    totals.reserved    += qty;
        if (vs === 'maintenance') totals.maintenance += qty;
        return totals;
      },
      { reserved: 0, maintenance: 0 }
    );
    return {
      item: {
        ...primary,
        qty: totalQty,
        status: aggregatedStatus,
        variants,
        groupKey: resolveEquipmentGroupKey(primary),
        reservedQty:    statusTotals.reserved,
        maintenanceQty: statusTotals.maintenance,
        availableQty:   Math.max(totalQty - statusTotals.reserved - statusTotals.maintenance, 0),
      },
      index: data.indexOf(primary),
    };
  });

  entries.sort((a, b) => compareEquipmentItemsByBarcode(a.item, b.item));

  const rawSearch    = document.getElementById('search-equipment')?.value || '';
  const search       = normalizeNumbers(rawSearch).toLowerCase().trim();
  const category     = document.getElementById('filter-category')?.value || '';
  const sub          = document.getElementById('filter-sub')?.value || '';
  const statusFilterRaw = document.getElementById('filter-status')?.value || '';
  const statusFilter = statusFilterRaw ? normalizeStatusValue(statusFilterRaw) : '';

  if (state.isLoading && !data.length) {
    container.innerHTML = renderEmptyState(t('equipment.list.loading', '⏳ جاري تحميل المعدات...'), { icon: '⏳' });
    renderEquipmentPagination(0);
    return;
  }

  if (state.errorMessage && !data.length) {
    container.innerHTML = renderEmptyState(state.errorMessage, { tone: 'error', icon: '⚠️' });
    renderEquipmentPagination(0);
    return;
  }

  const filteredEntries = entries.filter(({ item }) => {
    const barcode = normalizeNumbers(String(item.barcode ?? '')).toLowerCase().trim();
    const variantBarcodes = Array.isArray(item.variants)
      ? item.variants.map((v) => normalizeNumbers(String(v.barcode ?? '')).toLowerCase().trim()).filter(Boolean)
      : [];
    const matchesSearch =
      !search ||
      (item.name     && item.name.toLowerCase().includes(search)) ||
      (item.desc     && item.desc.toLowerCase().includes(search)) ||
      (barcode       && barcode.includes(search)) ||
      variantBarcodes.some((code) => code.includes(search)) ||
      (item.category && item.category.toLowerCase().includes(search)) ||
      (item.sub      && item.sub.toLowerCase().includes(search));
    const matchesCategory = !category     || item.category === category;
    const matchesSub      = !sub          || item.sub      === sub;
    const matchesStatus   = !statusFilter || normalizeStatusValue(item.status) === statusFilter;
    return matchesSearch && matchesCategory && matchesSub && matchesStatus;
  });

  const emptyMessage = search
    ? t('equipment.list.emptyFiltered', '⚠️ لا توجد معدات مطابقة.')
    : t('equipment.list.empty', 'لا توجد معدات مسجلة بعد.');

  const filterSignature = buildEquipmentFilterSignature({ search, category, sub, statusFilter });
  if (filterSignature !== state.lastFilterSignature) {
    resetEquipmentPagination();
    state.lastFilterSignature = filterSignature;
  }

  const paginationState = getEquipmentPaginationState({
    totalItems: filteredEntries.length,
    page:       state.pagination.page,
    pageSize:   state.pagination.pageSize,
  });
  state.pagination.page = paginationState.currentPage;
  const visibleEntries  = filteredEntries.slice(paginationState.startIndex, paginationState.endIndex);

  container.innerHTML = visibleEntries.length
    ? visibleEntries.map(renderEquipmentItem).join('')
    : renderEmptyState(emptyMessage);
  renderEquipmentPagination(filteredEntries.length);

  const countBadge = document.getElementById('equipment-list-count');
  if (countBadge) {
    const suffix    = t('equipment.list.countSuffix', 'عنصر');
    const count     = normalizeNumbers(String(filteredEntries.length));
    countBadge.textContent = filteredEntries.length ? `${count} ${suffix}` : `0 ${suffix}`;
  }

  populateFilters(data);
}

// Injected by api.js to avoid circular dep (render ↔ api via syncEquipmentStatuses)
let _syncEquipmentStatuses = null;

export function setSyncEquipmentStatusesFn(fn) {
  _syncEquipmentStatuses = fn;
}

