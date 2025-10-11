import { loadData, saveData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";
import { apiRequest, ApiError } from "./apiClient.js";
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from "./auth.js";
import { refreshEnhancedSelect } from "./ui/enhancedSelect.js";

const initialEquipmentData = loadData() || {};
let equipmentState = (initialEquipmentData.equipment || []).map(mapLegacyEquipment);
let isEquipmentLoading = false;
let equipmentErrorMessage = "";
let currentVariantsContext = null;
let activeEquipmentIndex = null;
let currentEquipmentSnapshot = null;
let isEquipmentEditMode = false;

function getBootstrapModal(element) {
  if (!element) return null;
  const bootstrapModal = window?.bootstrap?.Modal ?? (typeof bootstrap !== 'undefined' ? bootstrap.Modal : null);
  if (!bootstrapModal) return null;
  return bootstrapModal.getOrCreateInstance(element);
}

function emitEquipmentChanged() {
  document.dispatchEvent(new CustomEvent("equipment:changed"));
}

function mapLegacyEquipment(raw = {}) {
  return toInternalEquipment({
    ...raw,
    subcategory: raw.subcategory ?? raw.sub ?? "",
    description: raw.description ?? raw.desc ?? raw.name ?? "",
    quantity: raw.quantity ?? raw.qty ?? 0,
    unit_price: raw.unit_price ?? raw.price ?? 0,
    image_url: raw.image_url ?? raw.imageUrl ?? raw.image ?? "",
  });
}

function mapApiEquipment(raw = {}) {
  return toInternalEquipment(raw);
}

function toInternalEquipment(raw = {}) {
  const idValue = raw.id ?? raw.equipment_id ?? raw.equipmentId ?? raw.item_id ?? raw.itemId ?? null;
  const description = raw.description ?? raw.desc ?? raw.name ?? "";
  const category = raw.category ?? "";
  const sub = raw.subcategory ?? raw.sub ?? "";
  const qty = parseInteger(raw.quantity ?? raw.qty ?? 0);
  const price = parseFloatSafe(raw.unit_price ?? raw.price ?? 0);
  const barcode = normalizeNumbers(String(raw.barcode ?? "").trim());
  const status = normalizeStatusValue(raw.status ?? raw.state ?? raw.status_label ?? raw.statusLabel ?? "available");
  const imageUrl = raw.image_url ?? raw.imageUrl ?? raw.image ?? "";
  const name = raw.name ?? raw.item_name ?? description;

  return {
    id: hasValue(idValue) ? String(idValue) : "",
    category,
    sub,
    desc: description,
    name,
    qty,
    price,
    barcode,
    status,
    image: imageUrl,
    imageUrl,
    created_at: raw.created_at ?? null,
    updated_at: raw.updated_at ?? null,
  };
}

function hasValue(value) {
  return value !== null && value !== undefined && value !== "";
}

function parseInteger(value) {
  const num = Number.parseInt(value, 10);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

function parseFloatSafe(value) {
  const num = Number.parseFloat(value);
  if (!Number.isFinite(num)) return 0;
  return Math.round(num * 100) / 100;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeStatusValue(value) {
  const normalized = String(value ?? "").trim().toLowerCase();
  switch (normalized) {
    case "available":
    case "متاح":
    case "متوفر":
      return "available";
    case "reserved":
    case "محجوز":
      return "reserved";
    case "maintenance":
    case "صيانة":
      return "maintenance";
    case "retired":
    case "متوقف":
    case "خارج الخدمة":
      return "retired";
    default:
      return "available";
  }
}

function statusToFormValue(value) {
  switch (normalizeStatusValue(value)) {
    case "available":
      return "متاح";
    case "reserved":
      return "محجوز";
    case "maintenance":
      return "صيانة";
    case "retired":
      return "متوقف";
    default:
      return "متاح";
  }
}

function statusToApi(value) {
  return normalizeStatusValue(value);
}

function getAllEquipment() {
  return equipmentState;
}

function setEquipment(list) {
  equipmentState = Array.isArray(list) ? list.map(toInternalEquipment) : [];
  saveData({ equipment: equipmentState });
  emitEquipmentChanged();
}

function normalizeDescriptionValue(value) {
  const raw = String(value ?? '')
    .trim()
    .toLowerCase();
  return raw;
}

function resolveEquipmentGroupKey(item) {
  if (!item) return '';
  const descriptionSource = item.desc || item.description || item.name || '';
  let key = normalizeDescriptionValue(descriptionSource);
  if (!key) {
    key = normalizeDescriptionValue(item.category || '');
  }
  if (!key) {
    key = normalizeNumbers(String(item.barcode || '')).trim().toLowerCase();
  }
  return key;
}

function getVariantsForItem(item) {
  const key = resolveEquipmentGroupKey(item);
  if (!key) return [];
  return getAllEquipment().filter((entry) => resolveEquipmentGroupKey(entry) === key);
}

function getEquipmentFormElements() {
  return {
    category: document.getElementById('edit-equipment-category'),
    subcategory: document.getElementById('edit-equipment-subcategory'),
    description: document.getElementById('edit-equipment-description'),
    quantity: document.getElementById('edit-equipment-quantity'),
    price: document.getElementById('edit-equipment-price'),
    image: document.getElementById('edit-equipment-image'),
    barcode: document.getElementById('edit-equipment-barcode'),
    status: document.getElementById('edit-equipment-status'),
  };
}

function captureEquipmentFormValues() {
  const elements = getEquipmentFormElements();
  return {
    category: elements.category?.value ?? '',
    subcategory: elements.subcategory?.value ?? '',
    description: elements.description?.value ?? '',
    quantity: elements.quantity?.value ?? '',
    price: elements.price?.value ?? '',
    image: elements.image?.value ?? '',
    barcode: elements.barcode?.value ?? '',
    status: elements.status?.value ?? '',
  };
}

function applyEquipmentFormValues(values = {}) {
  const elements = getEquipmentFormElements();
  if (elements.category) elements.category.value = values.category ?? '';
  if (elements.subcategory) elements.subcategory.value = values.subcategory ?? '';
  if (elements.description) elements.description.value = values.description ?? '';
  if (elements.quantity) elements.quantity.value = values.quantity != null ? normalizeNumbers(String(values.quantity)) : '';
  if (elements.price) elements.price.value = values.price != null ? normalizeNumbers(String(values.price)) : '';
  if (elements.image) elements.image.value = values.image ?? '';
  if (elements.barcode) elements.barcode.value = values.barcode ?? '';
  if (elements.status) elements.status.value = values.status ?? '';
}

function setEquipmentEditMode(isEditing) {
  isEquipmentEditMode = isEditing;
  const elements = getEquipmentFormElements();
  const toggleBtn = document.getElementById('equipment-edit-toggle');
  const cancelBtn = document.getElementById('equipment-edit-cancel');
  const saveBtn = document.getElementById('save-equipment-changes');

  const inputs = [
    elements.category,
    elements.subcategory,
    elements.description,
    elements.quantity,
    elements.price,
    elements.image,
  ];

  inputs.forEach((input) => {
    if (!input) return;
    if (isEditing) {
      input.removeAttribute('disabled');
    } else {
      input.setAttribute('disabled', 'disabled');
    }
  });

  if (toggleBtn) {
    toggleBtn.hidden = isEditing;
  }
  if (cancelBtn) {
    cancelBtn.hidden = !isEditing;
    cancelBtn.disabled = !isEditing;
  }
  if (saveBtn) {
    saveBtn.hidden = !isEditing;
    saveBtn.disabled = !isEditing;
  }
}

export async function uploadEquipmentFromExcel(file) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  if (!file) return;

  try {
    await ensureXLSXLoaded();
  } catch (error) {
    console.error("❌ [equipment.js] Unable to load XLSX", error);
    alert(t("equipment.toast.xlsxMissing", "⚠️ مكتبة Excel (XLSX) غير محملة."));
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      if (!Array.isArray(rows) || rows.length === 0) {
        showToast(t("equipment.toast.uploadEmpty", "⚠️ لم يتم العثور على بيانات في الملف"));
        return;
      }

      const payloads = [];
      let skippedRows = 0;

      rows.forEach((row) => {
        const category = row["القسم"] ?? row.category ?? "";
        const subcategory = row["القسم الثانوي"] ?? row.subcategory ?? "";
        const description = row["الوصف"] ?? row.description ?? row.name ?? "";
        const quantity = row["الكمية"] ?? row.quantity ?? 0;
        const unitPrice = row["السعر"] ?? row.price ?? 0;
        const barcodeRaw = row["الباركود"] ?? row.barcode ?? "";
        const status = row["الحالة"] ?? row.status ?? "متاح";
        const imageUrl = row["الصورة"] ?? row.image_url ?? row.image ?? "";

        const cleanedBarcode = normalizeNumbers(String(barcodeRaw || "")).trim();

        if (!description || !cleanedBarcode) {
          skippedRows += 1;
          return;
        }

        payloads.push(
          buildEquipmentPayload({
            category,
            subcategory,
            description,
            quantity,
            unit_price: unitPrice,
            barcode: cleanedBarcode,
            status,
            image_url: imageUrl,
          })
        );
      });

      if (!payloads.length) {
        showToast(t("equipment.toast.uploadEmpty", "⚠️ لم يتم العثور على بيانات في الملف"));
        return;
      }

      try {
        const response = await apiRequest('/equipment/?bulk=1', {
          method: "POST",
          body: payloads,
        });

        const created = Array.isArray(response?.data)
          ? response.data.map(mapApiEquipment)
          : [];

        if (created.length) {
          const updated = [...getAllEquipment(), ...created];
          setEquipment(updated);
        }

        await refreshEquipmentFromApi({ showToastOnError: false });
        renderEquipment();

        const metaCount = response?.meta?.count ?? created.length;
        const parts = [];
        if (metaCount) parts.push(`${metaCount} ✔️`);
        if (skippedRows) parts.push(`${skippedRows} ⚠️`);

        showToast(
          t("equipment.toast.uploadSuccess", "✅ تم رفع المعدات بنجاح") +
            (parts.length ? ` (${parts.join(" / ")})` : "")
        );
      } catch (error) {
        const message = resolveApiErrorMessage(
          error,
          "equipment.toast.uploadFailed",
          "❌ حدث خطأ أثناء قراءة ملف الإكسل"
        );
        showToast(message, "error");
      }
    } catch (error) {
      console.error("❌ [equipment.js] Failed to process Excel file", error);
      showToast(t("equipment.toast.uploadFailed", "❌ حدث خطأ أثناء قراءة ملف الإكسل"), "error");
    }
  };

  reader.onerror = function () {
    console.error("❌ [equipment.js] FileReader error", reader.error);
    showToast(t("equipment.toast.uploadFailed", "❌ حدث خطأ أثناء قراءة ملف الإكسل"), "error");
  };

  reader.readAsArrayBuffer(file);
}

const XLSX_CDN_URL = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
let xlsxLoaderPromise = null;

function ensureXLSXLoaded() {
  if (typeof XLSX !== "undefined") {
    return Promise.resolve();
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("XLSX library is not available in this environment"));
  }

  if (xlsxLoaderPromise) {
    return xlsxLoaderPromise;
  }

  xlsxLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-xlsx-loader="true"]');
    if (existing) {
      existing.addEventListener("load", handleResolve, { once: true });
      existing.addEventListener("error", handleReject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = XLSX_CDN_URL;
    script.async = true;
    script.defer = true;
    script.dataset.xlsxLoader = "true";
    script.addEventListener("load", handleResolve, { once: true });
    script.addEventListener("error", handleReject, { once: true });
    document.head.appendChild(script);

    function handleResolve() {
      if (typeof XLSX === "undefined") {
        reject(new Error("XLSX did not load correctly"));
        return;
      }
      resolve();
    }

    function handleReject() {
      reject(new Error("Failed to load XLSX library"));
    }
  })
    .catch((error) => {
      console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed", error);
      xlsxLoaderPromise = null;
      throw error;
    });

  return xlsxLoaderPromise;
}

function buildEquipmentPayload({
  category = "",
  subcategory = "",
  description = "",
  quantity = 0,
  unit_price = 0,
  barcode = "",
  status = "متاح",
  image_url = "",
}) {
  const cleanedBarcode = normalizeNumbers(String(barcode || "")).trim();
  const normalizedStatus = statusToApi(status);

  return {
    category: category?.trim() || null,
    subcategory: subcategory?.trim() || null,
    name: description?.trim() || null,
    description: description?.trim() || null,
    quantity: parseInteger(quantity),
    unit_price: parseFloatSafe(unit_price),
    barcode: cleanedBarcode,
    status: normalizedStatus,
    image_url: image_url?.trim() || null,
  };
}

export async function clearEquipment() {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  if (!confirm(t("equipment.toast.clearConfirm", "⚠️ هل أنت متأكد من حذف كل المعدات؟"))) return;

  try {
    const response = await apiRequest('/equipment/?all=1', { method: "DELETE" });
    const deletedCount = response?.meta?.deleted ?? 0;
    await refreshEquipmentFromApi({ showToastOnError: false });
    showToast(
      t("equipment.toast.clearSuccess", "🗑️ تم مسح جميع المعدات") +
        (deletedCount ? ` (${deletedCount})` : "")
    );
  } catch (error) {
    const message = resolveApiErrorMessage(
      error,
      "equipment.toast.clearFailed",
      "⚠️ تعذر حذف بعض المعدات"
    );
    showToast(message, "error");
  }
}

function getEquipmentImage(item) {
  return item.image || item.imageUrl || item.img || "";
}

function renderStatus(status) {
  const value = normalizeStatusValue(status);
  const statusConfig = {
    available: {
      label: t("equipment.form.options.available", "✅ متاح"),
      className: "equipment-status-badge equipment-status-badge--available",
    },
    reserved: {
      label: t("equipment.form.options.booked", "📌 محجوز"),
      className: "equipment-status-badge equipment-status-badge--reserved",
    },
    maintenance: {
      label: t("equipment.form.options.maintenance", "🛠️ صيانة"),
      className: "equipment-status-badge equipment-status-badge--maintenance",
    },
    retired: {
      label: t("equipment.form.options.retired", "📦 خارج الخدمة"),
      className: "equipment-status-badge equipment-status-badge--retired",
    },
  };

  const { label, className } = statusConfig[value] || {
    label: status || "-",
    className: "equipment-status-badge equipment-status-badge--default",
  };

  return `<span class="${className}">${label}</span>`;
}

function clearEquipmentVariants() {
  const section = document.getElementById('equipment-variants-section');
  const tableBody = document.getElementById('equipment-variants-table-body');
  const countEl = document.getElementById('equipment-variants-count');
  if (section) {
    section.hidden = true;
  }
  if (tableBody) {
    const emptyMessage = t('equipment.modal.variants.empty', 'لا توجد قطع مرتبطة أخرى.');
    tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">${escapeHtml(emptyMessage)}</td></tr>`;
  }
  if (countEl) {
    countEl.textContent = '0';
  }
}

function renderEquipmentVariantsSection(baseItem) {
  const section = document.getElementById('equipment-variants-section');
  const tableBody = document.getElementById('equipment-variants-table-body');
  const countEl = document.getElementById('equipment-variants-count');
  if (!section || !tableBody || !baseItem) {
    return;
  }

  const contextKey = currentVariantsContext?.groupKey;
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
  if (countEl) {
    countEl.textContent = String(variants.length);
  }

  const currentBadgeLabel = t('equipment.modal.variants.current', 'الحالي');
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
      const actions = variantIndex >= 0
        ? `<div class="equipment-variant-actions">
            <button type="button" class="btn btn-outline btn-sm" data-variant-action="edit" data-variant-index="${variantIndex}">${escapeHtml(t('equipment.item.actions.edit', '✏️ تعديل'))}</button>
            <button type="button" class="btn btn-outline btn-sm" data-variant-action="delete" data-variant-index="${variantIndex}">${escapeHtml(t('equipment.item.actions.delete', '🗑️ حذف'))}</button>
          </div>`
        : '';
      return `
        <tr class="${rowClass}">
          <td>
            ${barcodeCell}
            ${currentBadge}
          </td>
          <td>${renderStatus(variant.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${escapeHtml(qtyLabel)}">${qtyDisplay}</span>
          </td>
          <td>${actions}</td>
        </tr>
      `;
    })
    .join('');

  tableBody.innerHTML = rows;
}

function renderEquipmentItem({ item, index }) {
  const imageUrl = getEquipmentImage(item);
  const deleteLabel = t("equipment.item.actions.delete", "🗑️ حذف");
  const imageAlt = t("equipment.item.imageAlt", "صورة");
  const currencyLabel = t("equipment.item.currency", "ريال");
  const canDelete = userCanManageDestructiveActions();
  const labels = {
    description: t("equipment.card.labels.description", "الوصف"),
    status: t("equipment.card.labels.status", "الحالة"),
    alias: t("equipment.card.labels.alias", "الاسم"),
    quantity: t("equipment.card.labels.quantity", "الكمية"),
    price: t("equipment.card.labels.price", "السعر"),
    category: t("equipment.card.labels.category", "القسم"),
    subcategory: t("equipment.card.labels.subcategory", "القسم الثانوي"),
    barcode: t("equipment.card.labels.barcode", "الباركود"),
  };
  const qtyNumber = Number.isFinite(Number(item.qty)) ? Number(item.qty) : 0;
  const priceNumber = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
  const qtyDisplay = qtyNumber.toLocaleString("en-US");
  const priceDisplay = priceNumber.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const title = item.desc || item.name || "—";
  const aliasValue = item.name && item.name !== item.desc ? item.name : "";

  const metricItems = [
    { label: labels.quantity, value: qtyDisplay },
    { label: labels.price, value: `${priceDisplay} ${currencyLabel}` },
  ];

  const metricsRowHtml = `
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${metricItems
        .map(
          ({ label, value }) => `
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${label}</span>
              <span class="equipment-card__detail-value">${value}</span>
            </span>
          `
        )
        .join("")}
    </div>`;

  const categoryItems = [
    item.category ? { label: labels.category, value: item.category } : null,
    item.sub ? { label: labels.subcategory, value: item.sub } : null,
  ].filter(Boolean);

  const categoriesHtml = categoryItems.length
    ? `<div class="equipment-card__categories">${categoryItems
        .map(
          ({ label, value }) => `
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${label}</span>
              <span class="equipment-card__detail-value">${value}</span>
            </div>
          `
        )
        .join("")}</div>`
    : "";

  const aliasHtml = aliasValue
    ? `<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${labels.alias}</span>
        <span class="equipment-card__detail-value">${aliasValue}</span>
      </div>`
    : "";

  const descriptionHtml = `
    <div class="equipment-card__description">
      <span class="equipment-card__label">${labels.description}</span>
      <h3 class="equipment-card__title">${title}</h3>
    </div>
  `;

  const detailsHtml = `
    <div class="equipment-card__details">
      ${descriptionHtml}
      ${metricsRowHtml}
    </div>
  `;

  const actionButtons = [];
  if (canDelete) {
    actionButtons.push(
      `<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${index}">${deleteLabel}</button>`
    );
  }
  const actionsHtml = actionButtons.length
    ? `<div class="equipment-card__actions equipment-card__actions--center">${actionButtons.join("\n")}</div>`
    : '';

  const cardLabel = escapeHtml(title);

  return `
    <article
      class="equipment-card"
      data-equipment-index="${index}"
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${cardLabel}"
    >
      <div class="equipment-card__header">
        <div class="equipment-card__status-block">
          <span class="equipment-card__label equipment-card__label--status">${labels.status}</span>
          ${renderStatus(item.status)}
        </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${
              imageUrl
                ? `<img src="${imageUrl}" alt="${imageAlt}" loading="lazy">`
                : `<div class="equipment-card__placeholder">📦</div>`
            }
          </div>
          ${detailsHtml}
        </div>
      </div>
      <div class="equipment-card__body">
        ${categoriesHtml}
        ${aliasHtml}
      </div>
      ${actionsHtml}
    </article>
  `;
}

function populateFilters(data) {
  const categories = [...new Set(data.map((i) => i.category).filter(Boolean))];
  const subs = [...new Set(data.map((i) => i.sub).filter(Boolean))];

  const categorySelect = document.getElementById("filter-category");
  const subSelect = document.getElementById("filter-sub");

  if (categorySelect) {
    const currentValue = categorySelect.value;
    while (categorySelect.options.length > 1) {
      categorySelect.remove(1);
    }
    categories.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categorySelect.appendChild(opt);
    });
    if (categories.includes(currentValue)) {
      categorySelect.value = currentValue;
    }
    refreshEnhancedSelect(categorySelect);
  }

  if (subSelect) {
    const currentValue = subSelect.value;
    while (subSelect.options.length > 1) {
      subSelect.remove(1);
    }
    subs.forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      subSelect.appendChild(opt);
    });
    if (subs.includes(currentValue)) {
      subSelect.value = currentValue;
    }
    refreshEnhancedSelect(subSelect);
  }

  const statusSelect = document.getElementById("filter-status");
  if (statusSelect) {
    refreshEnhancedSelect(statusSelect);
  }
}

export function syncEquipmentStatuses() {
  const data = loadData();
  let { equipment: equipmentList = [], reservations = [], maintenance = [] } = data;

  if (!Array.isArray(equipmentList) || equipmentList.length === 0) {
    equipmentState = equipmentList || [];
    return equipmentState;
  }

  const now = new Date();
  let changed = false;

  const maintenanceSet = new Set(
    (maintenance || [])
      .filter((ticket) => ticket?.status === "open")
      .map((ticket) => normalizeNumbers(String(ticket?.equipmentBarcode ?? "")).trim().toLowerCase())
  );

  const updated = equipmentList.map((item) => {
    if (!item) return item;

    const itemStatus = normalizeStatusValue(item.status);
    const itemCode = normalizeNumbers(String(item.barcode ?? "")).trim().toLowerCase();
    const inMaintenance = itemCode && maintenanceSet.has(itemCode);

    let newStatus = inMaintenance ? "maintenance" : itemStatus;

    if (!inMaintenance && itemCode) {
      for (const reservation of reservations || []) {
        if (!isReservationActiveNow(reservation, now)) continue;
        const hasItem = reservation.items?.some((resItem) => {
          const barcode = normalizeNumbers(String(resItem?.barcode ?? ""))
            .trim()
            .toLowerCase();
          return barcode === itemCode;
        });
        if (hasItem) {
          newStatus = "reserved";
          break;
        }
      }
    }

    if (newStatus !== itemStatus) {
      changed = true;
      return { ...item, status: newStatus };
    }

    return { ...item, status: itemStatus };
  });

  if (changed) {
    setEquipment(updated);
  } else {
    equipmentState = updated;
    saveData({ equipment: equipmentState });
  }

  return equipmentState;
}

function isReservationActiveNow(reservation, now) {
  if (!reservation?.start || !reservation?.end) return false;
  const start = new Date(reservation.start);
  const end = new Date(reservation.end);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
  return start <= now && now < end;
}

function renderEmptyState(message, { tone = "", icon = "📦" } = {}) {
  const classes = ["equipment-empty-state"];
  if (tone) classes.push(`equipment-empty-state--${tone}`);
  return `
    <div class="${classes.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${icon}</div>
      <p class="equipment-empty-state__text">${message}</p>
    </div>
  `;
}

export function renderEquipment() {
  const container = document.getElementById("equipment-list");
  if (!container) return;

  const synced = syncEquipmentStatuses();
  const data = Array.isArray(synced) ? synced : getAllEquipment();
  const groupedMap = new Map();

  data.forEach((item) => {
    if (!item) return;
    const key = resolveEquipmentGroupKey(item);
    if (!key) return;
    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }
    groupedMap.get(key).push(item);
  });

  const entries = Array.from(groupedMap.values()).map((variants) => {
    const primary = variants[0];
    const totalQty = variants.reduce((sum, variant) => sum + (Number.isFinite(Number(variant.qty)) ? Number(variant.qty) : 0), 0);
    const statusPriority = ['maintenance', 'reserved', 'available', 'retired'];
    const aggregatedStatus = variants
      .map((variant) => normalizeStatusValue(variant.status))
      .sort((a, b) => statusPriority.indexOf(a) - statusPriority.indexOf(b))[0] || 'available';
    const aggregatedItem = {
      ...primary,
      qty: totalQty,
      status: aggregatedStatus,
      variants,
      groupKey: resolveEquipmentGroupKey(primary),
    };
    return { item: aggregatedItem, index: data.indexOf(primary) };
  });

  const rawSearch = document.getElementById("search-equipment")?.value || "";
  const search = normalizeNumbers(rawSearch).toLowerCase().trim();
  const category = document.getElementById("filter-category")?.value || "";
  const sub = document.getElementById("filter-sub")?.value || "";
  const statusFilterRaw = document.getElementById("filter-status")?.value || "";
  const statusFilter = statusFilterRaw ? normalizeStatusValue(statusFilterRaw) : "";

  if (isEquipmentLoading && !data.length) {
    container.innerHTML = renderEmptyState(t("equipment.list.loading", "⏳ جاري تحميل المعدات..."), {
      icon: "⏳",
    });
    return;
  }

  if (equipmentErrorMessage && !data.length) {
    container.innerHTML = renderEmptyState(equipmentErrorMessage, {
      tone: "error",
      icon: "⚠️",
    });
    return;
  }

  const filteredEntries = entries.filter(({ item }) => {
    const barcode = normalizeNumbers(String(item.barcode ?? "")).toLowerCase().trim();
    const variantBarcodes = Array.isArray(item.variants)
      ? item.variants
          .map((variant) => normalizeNumbers(String(variant.barcode ?? ''))
            .toLowerCase()
            .trim())
          .filter(Boolean)
      : [];
    const matchesSearch =
      !search ||
      (item.name && item.name.toLowerCase().includes(search)) ||
      (item.desc && item.desc.toLowerCase().includes(search)) ||
      (barcode && barcode.includes(search)) ||
      variantBarcodes.some((code) => code.includes(search)) ||
      (item.category && item.category.toLowerCase().includes(search)) ||
      (item.sub && item.sub.toLowerCase().includes(search));

    const matchesCategory = !category || item.category === category;
    const matchesSub = !sub || item.sub === sub;
    const matchesStatus = !statusFilter || normalizeStatusValue(item.status) === statusFilter;

    return matchesSearch && matchesCategory && matchesSub && matchesStatus;
  });

  const emptyMessage = search
    ? t("equipment.list.emptyFiltered", "⚠️ لا توجد معدات مطابقة.")
    : t("equipment.list.empty", "لا توجد معدات مسجلة بعد.");

  const orderedEntries = filteredEntries;

  container.innerHTML = orderedEntries.length
    ? orderedEntries.map(renderEquipmentItem).join("")
    : renderEmptyState(emptyMessage);

  const countBadge = document.getElementById("equipment-list-count");
  if (countBadge) {
    const suffix = t("equipment.list.countSuffix", "عنصر");
    const count = normalizeNumbers(String(orderedEntries.length));
    const countText = orderedEntries.length ? `${count} ${suffix}` : `0 ${suffix}`;
    countBadge.textContent = countText;
  }

  populateFilters(data);
}

export async function refreshEquipmentFromApi({ showToastOnError = true } = {}) {
  isEquipmentLoading = true;
  equipmentErrorMessage = "";
  renderEquipment();

  try {
    const response = await apiRequest('/equipment/?all=1');
    const records = Array.isArray(response?.data) ? response.data.map(mapApiEquipment) : [];
    setEquipment(records);
  } catch (error) {
    equipmentErrorMessage = resolveApiErrorMessage(
      error,
      "equipment.toast.fetchFailed",
      "تعذر تحميل قائمة المعدات"
    );
    if (showToastOnError) {
      showToast(equipmentErrorMessage, "error");
    }
  } finally {
    isEquipmentLoading = false;
    renderEquipment();
  }
}

function resolveApiErrorMessage(error, key, fallback) {
  if (error instanceof ApiError) {
    const errors = error.payload?.errors;
    if (errors && typeof errors === "object") {
      const first = Object.values(errors)[0];
      if (Array.isArray(first)) {
        return first[0];
      }
      if (typeof first === "string") {
        return first;
      }
    }
    if (error.message) {
      return error.message;
    }
  }
  return t(key, fallback);
}

async function handleAddEquipmentSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const desc = form.querySelector("#new-equipment-desc")?.value?.trim() || "";
  const rawBarcode = form.querySelector("#new-equipment-barcode")?.value || "";
  const barcode = normalizeNumbers(rawBarcode).trim();
  const price = parseFloatSafe(form.querySelector("#new-equipment-price")?.value || "0");
  const qty = parseInteger(form.querySelector("#new-equipment-qty")?.value || "1");
  const image = form.querySelector("#new-equipment-image")?.value?.trim() || "";
  const category = form.querySelector("#new-equipment-category")?.value?.trim() || "";
  const sub = form.querySelector("#new-equipment-sub")?.value?.trim() || "";
  const statusValue = form.querySelector("#new-equipment-status")?.value || "متاح";

  if (!desc || !barcode) {
    showToast(t("equipment.toast.missingFields", "⚠️ يرجى إدخال الوصف والباركود"));
    return;
  }

  const payload = buildEquipmentPayload({
    category,
    subcategory: sub,
    description: desc,
    quantity: qty,
    unit_price: price,
    barcode,
    status: statusValue,
    image_url: image,
  });

  try {
    const response = await apiRequest("/equipment/", {
      method: "POST",
      body: payload,
    });
    const created = mapApiEquipment(response?.data);
    const updated = [...getAllEquipment(), created];
    setEquipment(updated);
    renderEquipment();
    form.reset();
    const statusSelect = form.querySelector("#new-equipment-status");
    if (statusSelect) statusSelect.value = "متاح";
    showToast(t("equipment.toast.addSuccess", "✅ تم إضافة المعدة"));
  } catch (error) {
    const message = resolveApiErrorMessage(
      error,
      "equipment.toast.addFailed",
      "تعذر إضافة المعدة"
    );
    showToast(message, "error");
  }
}

async function deleteEquipment(index) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  const items = getAllEquipment();
  const item = items[index];
  if (!item) return;

  if (!confirm(t("equipment.toast.deleteConfirm", "❌ هل أنت متأكد من حذف هذه المعدة؟"))) return;

  try {
    if (item.id) {
      await apiRequest(`/equipment/?id=${encodeURIComponent(item.id)}`, { method: "DELETE" });
    }
    const updated = [...items];
    updated.splice(index, 1);
    setEquipment(updated);
    renderEquipment();
    showToast(t("equipment.toast.deleteSuccess", "🗑️ تم حذف المعدة"));
  } catch (error) {
    const message = resolveApiErrorMessage(
      error,
      "equipment.toast.deleteFailed",
      "تعذر حذف المعدة، يرجى المحاولة مجدداً"
    );
    showToast(message, "error");
  }
}

async function editEquipment(index, updatedData) {
  const items = getAllEquipment();
  const item = items[index];
  if (!item) {
    throw new Error("Equipment item not found");
  }

  if (!item.id) {
    const merged = [...items];
    merged[index] = { ...merged[index], ...updatedData };
    setEquipment(merged);
    renderEquipment();
    return;
  }

  const payload = buildEquipmentPayload({
    category: updatedData.category,
    subcategory: updatedData.sub,
    description: updatedData.desc,
    quantity: updatedData.qty,
    unit_price: updatedData.price,
    barcode: updatedData.barcode,
    status: updatedData.status,
    image_url: updatedData.image,
  });

  try {
    const response = await apiRequest(`/equipment/?id=${encodeURIComponent(item.id)}`, {
      method: "PATCH",
      body: payload,
    });
    const updatedItem = mapApiEquipment(response?.data);
    const merged = [...items];
    merged[index] = updatedItem;
    setEquipment(merged);
    renderEquipment();
    showToast(t("equipment.toast.updateSuccess", "✅ تم تحديث بيانات المعدة بنجاح"));
  } catch (error) {
    const message = resolveApiErrorMessage(
      error,
      "equipment.toast.updateFailed",
      "تعذر تحديث بيانات المعدة"
    );
    showToast(message, "error");
    throw error;
  }
}

function handleEquipmentSearch() {
  renderEquipment();
}

function openEditEquipmentModal(index) {
  const allItems = getAllEquipment();
  const item = allItems[index];
  if (!item) return;

  activeEquipmentIndex = index;

  const variants = getVariantsForItem(item);
  const primary = variants[0] || item;
  const totalQty = variants.reduce((sum, variant) => sum + (Number.isFinite(Number(variant.qty)) ? Number(variant.qty) : 0), 0);
  const statusPriority = ['maintenance', 'reserved', 'available', 'retired'];
  const aggregatedStatus = variants
    .map((variant) => normalizeStatusValue(variant.status))
    .sort((a, b) => statusPriority.indexOf(a) - statusPriority.indexOf(b))[0] || normalizeStatusValue(primary.status);

  document.getElementById('edit-equipment-index').value = index;

  applyEquipmentFormValues({
    category: primary.category || '',
    subcategory: primary.sub || '',
    description: primary.desc || primary.description || '',
    quantity: String(totalQty || primary.qty || 0),
    price: primary.price != null ? String(primary.price) : '0',
    image: getEquipmentImage(primary) || '',
    barcode: primary.barcode || '',
    status: aggregatedStatus,
  });

  setEquipmentEditMode(false);
  currentEquipmentSnapshot = captureEquipmentFormValues();

  renderEquipmentVariantsSection(primary);
  currentVariantsContext = {
    groupKey: resolveEquipmentGroupKey(primary),
    barcode: String(primary.barcode || ''),
    id: primary.id || null,
  };

  getBootstrapModal(document.getElementById("editEquipmentModal"))?.show();
}

function handleEquipmentListClick(event) {
  const deleteButton = event.target.closest('[data-equipment-action="delete"]');
  if (deleteButton) {
    event.preventDefault();
    event.stopPropagation();
    const index = Number(deleteButton.dataset.equipmentIndex);
    if (!Number.isNaN(index)) {
      deleteEquipment(index).catch((error) => {
        console.error('❌ [equipment.js] deleteEquipment', error);
      });
    }
    return;
  }

  const card = event.target.closest('[data-equipment-card="true"]');
  if (card) {
    const index = Number(card.dataset.equipmentIndex);
    if (!Number.isNaN(index)) {
      openEditEquipmentModal(index);
    }
  }
}

function handleEquipmentListKeyDown(event) {
  if (event.defaultPrevented) return;
  if (event.target.closest('[data-equipment-action]')) return;
  const card = event.target.closest('[data-equipment-card="true"]');
  if (!card) return;

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    const index = Number(card.dataset.equipmentIndex);
    if (!Number.isNaN(index)) {
      openEditEquipmentModal(index);
    }
  }
}

function handleVariantTableClick(event) {
  const deleteButton = event.target.closest('[data-variant-action="delete"]');
  if (deleteButton) {
    const variantIndex = Number(deleteButton.dataset.variantIndex);
    if (!Number.isNaN(variantIndex)) {
      deleteEquipment(variantIndex).catch((error) => {
        console.error('❌ [equipment.js] deleteEquipment', error);
      });
    }
    return;
  }

  const editButton = event.target.closest('[data-variant-action="edit"]');
  if (editButton) {
    const variantIndex = Number(editButton.dataset.variantIndex);
    if (!Number.isNaN(variantIndex)) {
      openEditEquipmentModal(variantIndex);
    }
  }
}

function refreshVariantsIfNeeded() {
  if (!currentVariantsContext) {
    return;
  }

  const modalElement = document.getElementById('editEquipmentModal');
  const isModalVisible = modalElement?.classList.contains('show');
  if (!isModalVisible) {
    return;
  }

  const items = getAllEquipment();
  const matchById = currentVariantsContext.id
    ? items.find((entry) => String(entry.id) === String(currentVariantsContext.id))
    : null;
  const groupKey = currentVariantsContext.groupKey;
  const fallback = groupKey
    ? items.find((entry) => resolveEquipmentGroupKey(entry) === groupKey)
    : null;
  const activeItem = matchById || fallback;

  if (!activeItem) {
    clearEquipmentVariants();
    return;
  }

  const newIndex = items.findIndex((entry) => entry === activeItem);
  if (newIndex >= 0) {
    const indexField = document.getElementById('edit-equipment-index');
    if (indexField) {
      indexField.value = String(newIndex);
    }
  }

  renderEquipmentVariantsSection(activeItem);

  if (!isEquipmentEditMode) {
    const variants = getVariantsForItem(activeItem);
    const primary = variants[0] || activeItem;
    const totalQty = variants.reduce((sum, variant) => sum + (Number.isFinite(Number(variant.qty)) ? Number(variant.qty) : 0), 0);
    const statusPriority = ['maintenance', 'reserved', 'available', 'retired'];
    const aggregatedStatus = variants
      .map((variant) => normalizeStatusValue(variant.status))
      .sort((a, b) => statusPriority.indexOf(a) - statusPriority.indexOf(b))[0] || normalizeStatusValue(primary.status);

    applyEquipmentFormValues({
      category: primary.category || '',
      subcategory: primary.sub || '',
      description: primary.desc || primary.description || '',
      quantity: String(totalQty || primary.qty || 0),
      price: primary.price != null ? String(primary.price) : '0',
      image: getEquipmentImage(primary) || '',
      barcode: primary.barcode || '',
      status: aggregatedStatus,
    });

    currentEquipmentSnapshot = captureEquipmentFormValues();
  }
}

function wireUpEquipmentUI() {
  document.getElementById("search-equipment")?.addEventListener("input", handleEquipmentSearch);
  document.getElementById("filter-category")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("filter-sub")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("filter-status")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("add-equipment-form")?.addEventListener("submit", handleAddEquipmentSubmit);

  const clearButton = document.getElementById('equipment-clear-btn');
  if (clearButton && !clearButton.dataset.listenerAttached) {
    clearButton.addEventListener('click', (event) => {
      event.preventDefault();
      clearEquipment().catch((error) => {
        console.error('❌ [equipment.js] clearEquipment', error);
      });
    });
    clearButton.dataset.listenerAttached = 'true';
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
}

document.getElementById("save-equipment-changes")?.addEventListener("click", async () => {
  if (!isEquipmentEditMode) {
    return;
  }
  const indexValue = document.getElementById("edit-equipment-index").value;
  const index = Number.parseInt(indexValue, 10);
  if (Number.isNaN(index)) {
    showToast(t("equipment.toast.updateFailed", "تعذر تحديث بيانات المعدة"), "error");
    return;
  }

  const updatedData = {
    category: document.getElementById("edit-equipment-category").value,
    sub: document.getElementById("edit-equipment-subcategory").value,
    desc: document.getElementById("edit-equipment-description").value,
    qty: parseInteger(document.getElementById("edit-equipment-quantity").value) || 1,
    price: parseFloatSafe(document.getElementById("edit-equipment-price").value) || 0,
    barcode: normalizeNumbers(document.getElementById("edit-equipment-barcode").value).trim(),
    status: document.getElementById("edit-equipment-status").value,
    image: document.getElementById("edit-equipment-image").value,
  };

  try {
    await editEquipment(index, updatedData);
    currentEquipmentSnapshot = captureEquipmentFormValues();
    setEquipmentEditMode(false);
    refreshVariantsIfNeeded();
  } catch (error) {
    console.error("❌ [equipment.js] editEquipment", error);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  wireUpEquipmentUI();
  renderEquipment();
  refreshEquipmentFromApi();

  const editToggle = document.getElementById('equipment-edit-toggle');
  if (editToggle && !editToggle.dataset.listenerAttached) {
    editToggle.addEventListener('click', () => {
      currentEquipmentSnapshot = captureEquipmentFormValues();
      setEquipmentEditMode(true);
      const descriptionInput = document.getElementById('edit-equipment-description');
      descriptionInput?.focus();
    });
    editToggle.dataset.listenerAttached = 'true';
  }

  const cancelEditBtn = document.getElementById('equipment-edit-cancel');
  if (cancelEditBtn && !cancelEditBtn.dataset.listenerAttached) {
    cancelEditBtn.addEventListener('click', () => {
      if (currentEquipmentSnapshot) {
        applyEquipmentFormValues(currentEquipmentSnapshot);
      }
      setEquipmentEditMode(false);
    });
    cancelEditBtn.dataset.listenerAttached = 'true';
  }
});

document.addEventListener("language:changed", () => {
  renderEquipment();
});

document.addEventListener("equipment:refreshRequested", () => {
  refreshEquipmentFromApi({ showToastOnError: false });
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderEquipment();
});

document.addEventListener('equipment:changed', () => {
  refreshVariantsIfNeeded();
});

document.addEventListener('DOMContentLoaded', () => {
  const modalElement = document.getElementById('editEquipmentModal');
  if (modalElement && !modalElement.dataset.variantsListenerAttached) {
    modalElement.addEventListener('hidden.bs.modal', () => {
      currentVariantsContext = null;
      clearEquipmentVariants();
      activeEquipmentIndex = null;
      currentEquipmentSnapshot = null;
      setEquipmentEditMode(false);
    });
    modalElement.dataset.variantsListenerAttached = 'true';
  }
});
