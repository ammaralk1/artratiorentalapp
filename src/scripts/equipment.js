import { loadData, saveData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";
import { apiRequest, ApiError } from "./apiClient.js";
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from "./auth.js";
import { refreshEnhancedSelect } from "./ui/enhancedSelect.js";
import {
  isEquipmentSelectionActive,
  getActiveEquipmentSelection,
  requestAddEquipmentToSelection,
  clearEquipmentSelection,
  EQUIPMENT_SELECTION_EVENTS
} from "./reservations/equipmentSelection.js";
import { hasEquipmentConflict, normalizeBarcodeValue } from "./reservations/state.js";
import { isEquipmentAvailable } from "./reservationsEquipment.js";

const initialEquipmentData = loadData() || {};
let equipmentState = (initialEquipmentData.equipment || []).map(mapLegacyEquipment);
let isEquipmentLoading = false;
let equipmentErrorMessage = "";
let currentVariantsContext = null;
let activeEquipmentIndex = null;
let currentEquipmentSnapshot = null;
let isEquipmentEditMode = false;
let selectionChangeListenerAttached = false;

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
  const cost = parseFloatSafe(
    raw.unit_cost
      ?? raw.unitCost
      ?? raw.cost
      ?? raw.rental_cost
      ?? raw.rentalCost
      ?? raw.purchase_price
      ?? raw.purchasePrice
      ?? 0
  );
  const barcode = normalizeNumbers(String(raw.barcode ?? "").trim());
  const status = normalizeStatusValue(raw.status ?? raw.state ?? raw.status_label ?? raw.statusLabel ?? "available");
  const imageUrl = raw.image_url ?? raw.imageUrl ?? raw.image ?? "";
  const name = raw.name ?? raw.item_name ?? description;
  const lessor =
    raw.lessor ??
    raw.owner ??
    raw.lessor_name ??
    raw.lessorName ??
    raw.owner_name ??
    raw.ownerName ??
    "";

  return {
    id: hasValue(idValue) ? String(idValue) : "",
    category,
    sub,
    desc: description,
    name,
    qty,
    price,
    cost,
    barcode,
    status,
    image: imageUrl,
    imageUrl,
    lessor,
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

function attachEnglishDigitNormalizer(input) {
  if (!input || input.dataset.englishDigitsAttached) {
    return;
  }

  input.addEventListener('input', () => {
    const { selectionStart, selectionEnd, value } = input;
    const normalized = normalizeNumbers(value);
    if (normalized === value) {
      return;
    }

    input.value = normalized;

    if (selectionStart != null && selectionEnd != null) {
      const lengthDelta = normalized.length - value.length;
      const start = selectionStart + lengthDelta;
      const end = selectionEnd + lengthDelta;
      input.setSelectionRange(start, end);
    }
  });

  input.dataset.englishDigitsAttached = 'true';
}

function generateUniqueEquipmentBarcode() {
  const existing = new Set(
    getAllEquipment().map((item) => normalizeNumbers(String(item.barcode || '')).trim())
  );

  const makeCandidate = () => {
    const ts = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(Math.random() * 0xFFFF).toString(36).toUpperCase().padStart(3, '0');
    return `EQ-${ts}${rand}`;
  };

  let candidate = '';
  for (let i = 0; i < 10; i++) {
    candidate = makeCandidate();
    if (!existing.has(candidate)) return candidate;
  }
  return candidate || makeCandidate();
}

function resolveComparableBarcode(item) {
  if (!item) return '';
  const primary = normalizeNumbers(String(item.barcode ?? '')).trim();
  if (primary) return primary;

  if (Array.isArray(item.variants)) {
    for (const variant of item.variants) {
      const variantCode = normalizeNumbers(String(variant?.barcode ?? '')).trim();
      if (variantCode) return variantCode;
    }
  }

  return '';
}

function compareEquipmentItemsByBarcode(a, b) {
  const codeA = resolveComparableBarcode(a);
  const codeB = resolveComparableBarcode(b);

  if (!codeA && !codeB) return 0;
  if (!codeA) return 1;
  if (!codeB) return -1;

  const numericPattern = /^[0-9]+$/;
  const isANumeric = numericPattern.test(codeA);
  const isBNumeric = numericPattern.test(codeB);

  if (isANumeric && isBNumeric) {
    if (codeA.length !== codeB.length) {
      return codeA.length - codeB.length;
    }
    const numericCompare = codeA.localeCompare(codeB, 'ar', { numeric: true, sensitivity: 'base' });
    if (numericCompare !== 0) {
      return numericCompare;
    }
  } else if (isANumeric !== isBNumeric) {
    return isANumeric ? -1 : 1;
  } else {
    const codeCompare = codeA.localeCompare(codeB, 'ar', { numeric: true, sensitivity: 'base' });
    if (codeCompare !== 0) {
      return codeCompare;
    }
  }

  const descA = normalizeDescriptionValue(a?.desc || a?.description || a?.name || '');
  const descB = normalizeDescriptionValue(b?.desc || b?.description || b?.name || '');
  return descA.localeCompare(descB, 'ar', { sensitivity: 'base' });
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
    case "مؤجرة":
    case "rented":
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

function getActiveSelectionContext() {
  if (!isEquipmentSelectionActive()) {
    return null;
  }
  const selection = getActiveEquipmentSelection();
  if (!selection) {
    return null;
  }
  return { ...selection };
}

function evaluateSelectionStateForItem(item) {
  const selection = getActiveSelectionContext();
  if (!selection) {
    return { active: false };
  }

  const variants = Array.isArray(item?.variants) && item.variants.length ? item.variants : [item];
  const { start, end, ignoreReservationId = null } = selection;
  const selectionMode = selection?.mode || selection?.source || '';

  const uniqueVariants = [];
  const seen = new Set();

  variants.forEach((variant) => {
    const normalizedBarcode = normalizeBarcodeValue(variant?.barcode);
    if (!normalizedBarcode || seen.has(normalizedBarcode)) {
      return;
    }
    seen.add(normalizedBarcode);
    uniqueVariants.push({ variant, barcode: normalizedBarcode });
  });

  if (!uniqueVariants.length) {
    return {
      active: true,
      canSelect: false,
      reason: t('reservations.toast.equipmentMissingBarcode', '⚠️ هذه المعدة لا تحتوي على باركود معرف'),
    };
  }

  if (selectionMode === 'package-manager' || selectionMode === 'equipment-packages') {
    const maxQuantity = Math.max(1, uniqueVariants.length || 1);
    return {
      active: true,
      canSelect: true,
      barcode: uniqueVariants[0].barcode,
      availableBarcodes: uniqueVariants.map(({ barcode }) => barcode),
      maxQuantity,
      reason: '',
    };
  }

  // Allow selecting items even if their status is currently "reserved" as long as
  // there is no time conflict with the requested reservation interval.
  // Only block globally unavailable statuses like maintenance/retired.
  const availableVariants = uniqueVariants.filter(({ variant }) => {
    const status = normalizeStatusValue(variant?.status);
    return status !== 'maintenance' && status !== 'retired';
  });
  if (!start || !end) {
    return {
      active: true,
      canSelect: false,
      barcode: availableVariants[0]?.barcode || uniqueVariants[0].barcode,
      reason: t('reservations.toast.requireDatesBeforeAdd', '⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات'),
      availableBarcodes: [],
      maxQuantity: 0,
    };
  }
  const conflictFreeVariants = availableVariants.filter(({ barcode }) => !hasEquipmentConflict(barcode, start, end, ignoreReservationId));

  if (conflictFreeVariants.length) {
    return {
      active: true,
      canSelect: true,
      barcode: conflictFreeVariants[0].barcode,
      availableBarcodes: conflictFreeVariants.map(({ barcode }) => barcode),
      maxQuantity: conflictFreeVariants.length,
    };
  }

  let reason = t('reservations.toast.equipmentUnavailable', '⚠️ هذه المعدة غير متاحة حالياً');

  if (availableVariants.length > 0) {
    reason = t('reservations.toast.equipmentTimeConflict', '⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية');
  } else {
    const statusSet = new Set(uniqueVariants.map(({ variant }) => normalizeStatusValue(variant?.status)));
    if (statusSet.has('maintenance')) {
      reason = t('reservations.toast.equipmentMaintenance', '⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً');
    } else if (statusSet.has('reserved')) {
      reason = t('reservations.toast.equipmentReserved', '⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها');
    } else if (statusSet.has('retired')) {
      reason = t('reservations.toast.equipmentRetired', '⚠️ هذه المعدة خارج الخدمة حالياً');
    }
  }

  return {
    active: true,
    canSelect: false,
    barcode: availableVariants[0]?.barcode || uniqueVariants[0].barcode,
    reason,
    availableBarcodes: [],
    maxQuantity: 0,
  };
}

function navigateBackToReservationForm() {
  const reservationsTabButton = document.querySelector('[data-tab="reservations-tab"]');
  if (reservationsTabButton) {
    reservationsTabButton.click();
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelector('#sub-tab-trigger-create-tab')?.click();
        document.getElementById('equipment-barcode')?.focus();
      }, 200);
    });
  }
}

function updateEquipmentSelectionBanner() {
  if (typeof document === 'undefined') return;
  const banner = document.getElementById('equipment-selection-banner');
  const returnButton = document.getElementById('equipment-selection-return');
  const titleEl = document.getElementById('equipment-selection-banner-title');
  const hintEl = document.getElementById('equipment-selection-banner-hint');
  if (!banner) return;

  const selection = getActiveSelectionContext();
  banner.hidden = !selection;

  const mode = selection?.mode || selection?.source || '';
  const isPackageMode = mode === 'package-manager' || mode === 'equipment-packages';

  if (selection) {
    if (isPackageMode) {
      if (titleEl) {
        titleEl.textContent = t('equipment.packages.selection.bannerTitle', '📦 اختيار معدات للحزمة');
      }
      if (hintEl) {
        hintEl.textContent = t('equipment.packages.selection.bannerHint', 'اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.');
      }
      if (returnButton) {
        returnButton.textContent = t('equipment.packages.selection.doneButton', '✅ إنهاء اختيار الحزمة');
      }
    } else {
      if (titleEl) {
        titleEl.textContent = t('reservations.create.equipment.selector.bannerTitle', '🔗 اختيار معدات لحجز جديد');
      }
      if (hintEl) {
        hintEl.textContent = t('reservations.create.equipment.selector.bannerHint', 'ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.');
      }
      if (returnButton) {
        returnButton.textContent = t('reservations.create.equipment.selector.returnButton', '⬅️ العودة إلى الحجز');
      }
    }
  } else {
    if (titleEl) {
      titleEl.textContent = t('reservations.create.equipment.selector.bannerTitle', '🔗 اختيار معدات لحجز جديد');
    }
    if (hintEl) {
      hintEl.textContent = t('reservations.create.equipment.selector.bannerHint', 'ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.');
    }
    if (returnButton) {
      returnButton.textContent = t('reservations.create.equipment.selector.returnButton', '⬅️ العودة إلى الحجز');
    }
  }

  if (selection && returnButton && !returnButton.dataset.listenerAttached) {
    returnButton.addEventListener('click', () => {
      const activeSelection = getActiveSelectionContext();
      const activeMode = activeSelection?.mode || activeSelection?.source || '';
      if (activeMode === 'package-manager' || activeMode === 'equipment-packages') {
        clearEquipmentSelection('package-finish-button');
      } else {
        clearEquipmentSelection('return-button');
        navigateBackToReservationForm();
      }
    });
    returnButton.dataset.listenerAttached = 'true';
  }
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

function normalizeLessorValue(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

function resolveEquipmentGroupKey(item) {
  if (!item) return '';
  const descriptionSource = item.desc || item.description || item.name || '';
  const normalizedDesc = normalizeDescriptionValue(descriptionSource);

  // Group primarily by (description + lessor). If lessor differs, items should not be grouped together
  // even if the description matches exactly.
  if (normalizedDesc) {
    const normalizedLessor = normalizeLessorValue(item.lessor || '');
    return `${normalizedDesc}__lessor__${normalizedLessor}`;
  }

  // Fallbacks preserve previous behavior when description is missing
  let fallback = normalizeDescriptionValue(item.category || '');
  if (!fallback) {
    fallback = normalizeNumbers(String(item.barcode || '')).trim().toLowerCase();
  }
  return fallback;
}

function getVariantsForItem(item) {
  const key = resolveEquipmentGroupKey(item);
  if (!key) return [];
  return getAllEquipment().filter((entry) => resolveEquipmentGroupKey(entry) === key);
}

function updateEquipmentHeaderMedia(item) {
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

function updateEquipmentLessorBadge(item) {
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

function getEquipmentFormElements() {
  return {
    category: document.getElementById('edit-equipment-category'),
    subcategory: document.getElementById('edit-equipment-subcategory'),
    description: document.getElementById('edit-equipment-description'),
    quantity: document.getElementById('edit-equipment-quantity'),
    price: document.getElementById('edit-equipment-price'),
    cost: document.getElementById('edit-equipment-cost'),
    image: document.getElementById('edit-equipment-image'),
    barcode: document.getElementById('edit-equipment-barcode'),
    status: document.getElementById('edit-equipment-status'),
    lessor: document.getElementById('edit-equipment-lessor'),
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
    cost: elements.cost?.value ?? '',
    image: elements.image?.value ?? '',
    barcode: elements.barcode?.value ?? '',
    status: elements.status?.value ?? '',
    lessor: elements.lessor?.value ?? '',
  };
}

function applyEquipmentFormValues(values = {}) {
  const elements = getEquipmentFormElements();
  if (elements.category) elements.category.value = values.category ?? '';
  if (elements.subcategory) elements.subcategory.value = values.subcategory ?? '';
  if (elements.description) elements.description.value = values.description ?? '';
  if (elements.quantity) elements.quantity.value = values.quantity != null ? normalizeNumbers(String(values.quantity)) : '';
  if (elements.price) elements.price.value = values.price != null ? normalizeNumbers(String(values.price)) : '';
  if (elements.cost) elements.cost.value = values.cost != null ? normalizeNumbers(String(values.cost)) : '';
  if (elements.image) elements.image.value = values.image ?? '';
  if (elements.barcode) elements.barcode.value = values.barcode ?? '';
  if (elements.status) elements.status.value = values.status ?? '';
  if (elements.lessor) elements.lessor.value = values.lessor ?? '';
}

function setEquipmentEditMode(isEditing) {
  isEquipmentEditMode = isEditing;
  const elements = getEquipmentFormElements();
  const cancelBtn = document.getElementById('equipment-edit-cancel');
  const saveBtn = document.getElementById('save-equipment-changes');
  const form = document.getElementById('edit-equipment-form');

  if (form) {
    form.classList.toggle('equipment-details-form--editing', isEditing);
  }

  const inputs = [
    elements.category,
    elements.subcategory,
    elements.description,
    elements.quantity,
    elements.price,
    elements.cost,
    elements.image,
    elements.lessor,
  ];

  inputs.forEach((input) => {
    if (!input) return;
    if (isEditing) {
      input.removeAttribute('disabled');
    } else {
      input.setAttribute('disabled', 'disabled');
    }
  });

  if (cancelBtn) {
    cancelBtn.hidden = !isEditing;
    cancelBtn.disabled = !isEditing;
  }
  if (saveBtn) {
    saveBtn.disabled = false;
    const labelKey = isEditing ? 'equipment.modal.actions.save' : 'equipment.modal.actions.edit';
    const fallback = isEditing ? '💾 حفظ التعديلات' : '✏️ تعديل';
    saveBtn.textContent = t(labelKey, fallback);
    saveBtn.dataset.mode = isEditing ? 'save' : 'view';
  }

  if (isEditing) {
    const focusTarget = elements.description || elements.category || elements.subcategory;
    if (focusTarget) {
      setTimeout(() => {
        focusTarget.focus();
        if (typeof focusTarget.select === 'function') {
          focusTarget.select();
        }
      }, 0);
    }
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
        const unitCost = row["التكلفة"] ?? row.cost ?? row.unit_cost ?? row.unitCost ?? 0;
        const barcodeRaw = row["الباركود"] ?? row.barcode ?? "";
        const imageUrl = row["الصورة"] ?? row.image_url ?? row.image ?? "";
        const lessor = row["المؤجر"] ?? row["المؤجر "] ?? row["Lessor"] ?? row["lessor"] ?? row.lessor ?? "";

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
            unit_cost: unitCost,
            barcode: cleanedBarcode,
            image_url: imageUrl,
            lessor,
          })
        );
      });

      if (!payloads.length) {
        showToast(t("equipment.toast.uploadEmpty", "⚠️ لم يتم العثور على بيانات في الملف"));
        return;
      }

      try {
        const response = await apiRequest('/equipment/?bulk=1&update_existing=1&skip_duplicates=1', {
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
        const skippedDup = Number(response?.meta?.skipped_duplicates || 0);
        const updatedCount = Number(response?.meta?.updated || 0);
        const parts = [];
        if (metaCount) parts.push(`${metaCount} ✔️`);
        if (updatedCount) parts.push(`${updatedCount} 🔁`);
        const totalSkipped = (skippedRows || 0) + skippedDup;
        if (totalSkipped) parts.push(`${totalSkipped} ⚠️`);

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

export async function downloadEquipmentToExcel({ onlyAvailable = false } = {}) {
  try {
    await ensureXLSXLoaded();
  } catch (error) {
    console.error("❌ [equipment.js] Unable to load XLSX for download", error);
    showToast(t("equipment.toast.xlsxMissing", "⚠️ مكتبة Excel (XLSX) غير محملة."));
    return;
  }

  const items = getAllEquipment();
  const rows = items
    .filter((item) => {
      if (!onlyAvailable) return true;
      return normalizeStatusValue(item.status) === 'available';
    })
    .map((item) => ({
      'القسم': item.category || '',
      'القسم الثانوي': item.sub || '',
      'الوصف': item.desc || item.description || item.name || '',
      'الكمية': Number.isFinite(Number(item.qty)) ? Number(item.qty) : 0,
      'السعر': Number.isFinite(Number(item.price)) ? Number(item.price) : 0,
      'التكلفة': Number.isFinite(Number(item.cost)) ? Number(item.cost) : 0,
      'الباركود': item.barcode || '',
      'الصورة': getEquipmentImage(item) || '',
      'المؤجر': (item.lessor || ''),
    }));

  // Create workbook
  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment');

  const pad2 = (n) => String(n).padStart(2, '0');
  const now = new Date();
  const y = now.getFullYear();
  const m = pad2(now.getMonth() + 1);
  const d = pad2(now.getDate());
  const hh = pad2(now.getHours());
  const mm = pad2(now.getMinutes());
  const filename = `${onlyAvailable ? 'equipment-available' : 'equipment-all'}-${y}${m}${d}-${hh}${mm}.xlsx`;

  try {
    XLSX.writeFile(workbook, filename, { compression: true });
  } catch (error) {
    console.error('❌ [equipment.js] Failed to generate Excel file', error);
    showToast(t('equipment.toast.uploadFailed', '❌ حدث خطأ أثناء قراءة ملف الإكسل'), 'error');
  }
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
  unit_cost = 0,
  barcode = "",
  status = "متاح",
  image_url = "",
  lessor = "",
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
    unit_cost: parseFloatSafe(unit_cost),
    // Send cost aliases to maximize compatibility with backend field names
    cost: parseFloatSafe(unit_cost),
    purchase_price: parseFloatSafe(unit_cost),
    rental_cost: parseFloatSafe(unit_cost),
    barcode: cleanedBarcode,
    status: normalizedStatus,
    image_url: image_url?.trim() || null,
    lessor: (typeof lessor === 'string' ? lessor.trim() : '') || null,
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
          <td>
            ${barcodeCell}
            ${currentBadge}
          </td>
          <td>${renderStatus(variant.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${escapeHtml(qtyLabel)}">${qtyDisplay}</span>
          </td>
          <td class="table-actions-cell">${actions}</td>
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
  const currencyLabel = t("equipment.item.currency", "SR");
  const canDelete = userCanManageDestructiveActions();
  const labels = {
    description: t("equipment.card.labels.description", "الوصف"),
    status: t("equipment.card.labels.status", "الحالة"),
    alias: t("equipment.card.labels.alias", "الاسم"),
    quantity: t("equipment.card.labels.quantity", "الكمية"),
    price: t("equipment.card.labels.price", "السعر"),
    cost: t("equipment.card.labels.cost", "التكلفة"),
    category: t("equipment.card.labels.category", "القسم"),
    subcategory: t("equipment.card.labels.subcategory", "القسم الثانوي"),
    barcode: t("equipment.card.labels.barcode", "الباركود"),
    available: t("equipment.card.labels.available", "متاح"),
  };
  const qtyNumber = Number.isFinite(Number(item.qty)) ? Number(item.qty) : 0;
  const priceNumber = Number.isFinite(Number(item.price)) ? Number(item.price) : 0;
  const costNumber = Number.isFinite(Number(item.cost)) ? Number(item.cost) : 0;
  const qtyDisplay = qtyNumber.toLocaleString("en-US");
  const priceDisplay = priceNumber.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const costDisplay = costNumber.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const reservedQtyNumber = Number.isFinite(Number(item.reservedQty)) ? Number(item.reservedQty) : 0;
  const maintenanceQtyNumber = Number.isFinite(Number(item.maintenanceQty)) ? Number(item.maintenanceQty) : 0;
  const availableQtyNumber = Number.isFinite(Number(item.availableQty))
    ? Number(item.availableQty)
    : Math.max(qtyNumber - reservedQtyNumber - maintenanceQtyNumber, 0);
  const availableDisplay = availableQtyNumber.toLocaleString('en-US');
  const availableOfTotal = t('equipment.card.labels.availableOfTotal', 'من أصل');
  const availabilityState = normalizeStatusValue(item.status);
  let availabilityText = `${escapeHtml(labels.available)}: ${escapeHtml(availableDisplay)} ${escapeHtml(availableOfTotal)} ${escapeHtml(qtyDisplay)}`;
  let availabilityClassModifier = 'available';

  if (availableQtyNumber === 0) {
    const zeroStateMap = {
      reserved: {
        text:
          qtyNumber === 1
            ? t('equipment.card.availability.reservedSingle', 'مؤجرة')
            : t('equipment.card.availability.reserved', 'مؤجرة بالكامل'),
        modifier: 'reserved',
      },
      maintenance: {
        text: t('equipment.card.availability.maintenance', 'تحت الصيانة'),
        modifier: 'maintenance',
      },
      retired: {
        text: t('equipment.card.availability.retired', 'غير متاحة'),
        modifier: 'retired',
      },
      default: {
        text: t('equipment.card.availability.unavailable', 'غير متاحة حالياً'),
        modifier: 'unavailable',
      },
    };
    const stateConfig = zeroStateMap[availabilityState] || zeroStateMap.default;
    availabilityText = escapeHtml(stateConfig.text);
    availabilityClassModifier = stateConfig.modifier;
  }

  const availabilityHtml = `<span class="equipment-card__availability equipment-card__availability--${availabilityClassModifier}">${availabilityText}</span>`;
  const statusHtml = '';
  const title = item.desc || item.name || t('common.placeholder.empty', '—');
  const aliasValue = item.name && item.name !== item.desc ? item.name : "";

  const metricItems = [
    { label: labels.quantity, value: qtyDisplay },
    { label: labels.price, value: `${priceDisplay} ${currencyLabel}` },
    { label: labels.cost, value: `${costDisplay} ${currencyLabel}` },
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

  const lessorValue = (item.lessor || '').trim();
  const lessorTagHtml = lessorValue
    ? `<div class="equipment-card__lessor"><span class="equipment-tag" title="${escapeHtml(t('equipment.modal.labels.lessor', '🏢 المؤجر'))}">🏢 ${escapeHtml(lessorValue)}</span></div>`
    : '';

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
  const selectionState = evaluateSelectionStateForItem(item);

  const availableBarcodesAttr = selectionState?.availableBarcodes?.length
    ? selectionState.availableBarcodes.join(',')
    : (selectionState?.barcode ? selectionState.barcode : '');

  let selectionControlsHtml = '';
  let selectionButtonHtml = '';

  if (selectionState.active) {
    const quantitySelectId = `equipment-select-qty-${index}`;
    const isSelectable = Boolean(selectionState.canSelect);
    const maxSelectable = isSelectable
      ? Math.max(1, Number(selectionState.maxQuantity || (selectionState.availableBarcodes?.length || 1)))
      : 1;
    const optionCount = Math.max(1, Math.min(maxSelectable, 99));
    const quantityOptions = [];
    for (let i = 1; i <= optionCount; i += 1) {
      const valueDisplay = normalizeNumbers(String(i));
      quantityOptions.push(`<option value="${i}"${i === 1 ? ' selected' : ''}>${valueDisplay}</option>`);
    }
    const quantityDisabledAttr = isSelectable ? '' : ' disabled';
    const quantityLabel = t('reservations.create.equipment.selector.quantityLabel', 'الكمية');
    const availabilityLabel = isSelectable
      ? `${t('reservations.create.equipment.selector.availableHint', 'الوحدات المتاحة')}: ${normalizeNumbers(String(maxSelectable))}`
      : (selectionState.reason ? selectionState.reason : '');

    selectionControlsHtml = `
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${quantitySelectId}">${quantityLabel}</label>
        <select class="equipment-card__quantity-select" id="${quantitySelectId}" data-equipment-select-quantity${quantityDisabledAttr}>
          ${quantityOptions.join('')}
        </select>
        ${availabilityLabel ? `<span class="equipment-card__selection-hint">${escapeHtml(availabilityLabel)}</span>` : ''}
      </div>
    `;

    const selectionCtx = getActiveSelectionContext();
    const selectionMode = selectionCtx?.mode || selectionCtx?.source || '';
    const isPackageMode = selectionMode === 'package-manager' || selectionMode === 'equipment-packages';
    const addLabel = isPackageMode
      ? t('equipment.packages.selection.addToPackage', '➕ أضف إلى الحزمة')
      : t('reservations.create.equipment.selector.addToReservation', '➕ أضف إلى الحجز');
    const disabledAttr = isSelectable ? '' : ' disabled';
    const reasonAttr = selectionState.reason ? ` title="${escapeHtml(selectionState.reason)}"` : '';
    const datasetAttrs = [
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
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${datasetAttrs.join(' ')}${disabledAttr}${reasonAttr}>${addLabel}</button>
    `;
  }

  if (canDelete) {
    actionButtons.push(
      `<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${index}">${deleteLabel}</button>`
    );
  }
  const actionsHtml = actionButtons.length
    ? actionButtons.join('\n')
    : '';

  const cardLabel = escapeHtml(title);

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
        ${statusHtml}
        ${availabilityHtml}
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

function populateFilters(data) {
  const categories = [...new Set(data.map((i) => i.category).filter(Boolean))];
  const subs = [...new Set(data.map((i) => i.sub).filter(Boolean))]
    .sort((a, b) => String(a).localeCompare(String(b), 'ar', { sensitivity: 'base' }));

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

function populateAddEquipmentDatalists() {
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

    let newStatus = inMaintenance ? "maintenance" : "available";

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

    return { ...item, status: newStatus };
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
  // Ignore cancelled reservations entirely when computing active usage
  const rawStatus = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
  if (rawStatus === 'cancelled' || rawStatus === 'canceled') return false;
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

  updateEquipmentSelectionBanner();

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
    const statusTotals = variants.reduce(
      (totals, variant) => {
        const qty = parseInteger(variant?.qty ?? 0) || 0;
        const variantStatus = normalizeStatusValue(variant?.status);
        if (variantStatus === 'reserved') {
          totals.reserved += qty;
        } else if (variantStatus === 'maintenance') {
          totals.maintenance += qty;
        }
        return totals;
      },
      { reserved: 0, maintenance: 0 }
    );
    const availableQty = Math.max(totalQty - statusTotals.reserved - statusTotals.maintenance, 0);
    const aggregatedItem = {
      ...primary,
      qty: totalQty,
      status: aggregatedStatus,
      variants,
      groupKey: resolveEquipmentGroupKey(primary),
      reservedQty: statusTotals.reserved,
      maintenanceQty: statusTotals.maintenance,
      availableQty,
    };
    return { item: aggregatedItem, index: data.indexOf(primary) };
  });

  entries.sort((a, b) => compareEquipmentItemsByBarcode(a.item, b.item));

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
    const payload = response?.data ?? response;
    let rawItems = [];
    if (Array.isArray(payload)) {
      rawItems = payload;
    } else if (payload && typeof payload === 'object') {
      if (Array.isArray(payload.items)) rawItems = payload.items;
      else if (Array.isArray(payload.results)) rawItems = payload.results;
      else if (Array.isArray(payload.data)) rawItems = payload.data;
      else if (Array.isArray(payload.records)) rawItems = payload.records;
    }
    const records = rawItems.map(mapApiEquipment);
    setEquipment(records);
  } catch (error) {
    // Suppress unauthorized errors (e.g., during logout) to avoid flicker/noisy toasts
    if (error && typeof error === 'object' && Number(error.status) === 401) {
      equipmentErrorMessage = "";
    } else {
      equipmentErrorMessage = resolveApiErrorMessage(
        error,
        "equipment.toast.fetchFailed",
        "تعذر تحميل قائمة المعدات"
      );
      if (showToastOnError) {
        showToast(equipmentErrorMessage, "error");
      }
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
  const cost = parseFloatSafe(form.querySelector("#new-equipment-cost")?.value || "0");
  const qty = parseInteger(form.querySelector("#new-equipment-qty")?.value || "1");
  const image = form.querySelector("#new-equipment-image")?.value?.trim() || "";
  const category = form.querySelector("#new-equipment-category")?.value?.trim() || "";
  const sub = form.querySelector("#new-equipment-sub")?.value?.trim() || "";
  const lessor = form.querySelector("#new-equipment-lessor")?.value?.trim() || "";
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
    unit_cost: cost,
    barcode,
    status: statusValue,
    image_url: image,
    lessor,
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
    unit_cost: updatedData.cost,
    barcode: updatedData.barcode,
    status: updatedData.status,
    image_url: updatedData.image,
    lessor: updatedData.lessor,
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
  // Use the selected item itself as the primary editable variant
  const primary = item;

  document.getElementById('edit-equipment-index').value = index;

  applyEquipmentFormValues({
    category: primary.category || '',
    subcategory: primary.sub || '',
    description: primary.desc || primary.description || '',
    quantity: String(primary.qty || 0),
    price: primary.price != null ? String(primary.price) : '0',
    cost: primary.cost != null ? String(primary.cost) : '0',
    image: getEquipmentImage(primary) || '',
    barcode: primary.barcode || '',
    status: primary.status || normalizeStatusValue(primary.status),
    lessor: primary.lessor || '',
  });

  setEquipmentEditMode(false);
  currentEquipmentSnapshot = captureEquipmentFormValues();
  updateEquipmentHeaderMedia(primary);
  updateEquipmentLessorBadge(primary);

  renderEquipmentVariantsSection(primary);
  currentVariantsContext = {
    groupKey: resolveEquipmentGroupKey(primary),
    barcode: String(primary.barcode || ''),
    id: primary.id || null,
  };

  getBootstrapModal(document.getElementById("editEquipmentModal"))?.show();
}

function handleEquipmentListClick(event) {
  const selectButton = event.target.closest('[data-equipment-action="select-reservation"]');
  if (selectButton) {
    event.preventDefault();
    event.stopPropagation();
    const card = selectButton.closest('[data-equipment-card="true"]');
    const quantityInput = card?.querySelector('[data-equipment-select-quantity]');
    let quantity = Number.parseInt(quantityInput?.value || '1', 10);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      quantity = 1;
    }
    const maxSelectable = Number.parseInt(selectButton.dataset.selectionMax || '0', 10);
    if (Number.isFinite(maxSelectable) && maxSelectable > 0 && quantity > maxSelectable) {
      quantity = maxSelectable;
    }

    const availableRaw = selectButton.dataset.selectionBarcodes || '';
    const availableBarcodes = availableRaw
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    const description = card?.querySelector('.equipment-card__title')?.textContent?.trim() || '';
    const groupKey = card?.dataset.equipmentGroupKey || selectButton.dataset.selectionGroup || '';

    const success = requestAddEquipmentToSelection({
      barcodes: availableBarcodes,
      quantity,
      groupKey,
      description,
    });
    if (!success) {
      showToast(t('reservations.create.equipment.selector.selectionInactive', '⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد'));
    }
    return;
  }

  if (event.target.closest('[data-equipment-select-quantity]') || event.target.closest('.equipment-card__selection-controls')) {
    return;
  }

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
  if (event.target.matches('[data-equipment-select-quantity]') || event.target.closest('.equipment-card__selection-controls')) {
    return;
  }
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
  const focusButton = event.target.closest('[data-variant-action="focus"]');
  if (focusButton) {
    const variantIndex = Number(focusButton.dataset.variantIndex);
    if (!Number.isNaN(variantIndex)) {
      // Switch the active item in the modal to this variant
      openEditEquipmentModal(variantIndex);
    }
    return;
  }
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
    activeEquipmentIndex = newIndex;
  }

  renderEquipmentVariantsSection(activeItem);
  updateEquipmentHeaderMedia(activeItem);
  updateEquipmentLessorBadge(activeItem);

  if (!isEquipmentEditMode) {
    const primary = activeItem;
    applyEquipmentFormValues({
      category: primary.category || '',
      subcategory: primary.sub || '',
      description: primary.desc || primary.description || '',
      quantity: String(primary.qty || 0),
      price: primary.price != null ? String(primary.price) : '0',
      image: getEquipmentImage(primary) || '',
      barcode: primary.barcode || '',
      status: primary.status || normalizeStatusValue(primary.status),
      lessor: primary.lessor || '',
    });

    currentEquipmentSnapshot = captureEquipmentFormValues();
  }

  updateEquipmentHeaderMedia(activeItem);
}

function wireUpEquipmentUI() {
  document.getElementById("search-equipment")?.addEventListener("input", handleEquipmentSearch);
  document.getElementById("filter-category")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("filter-sub")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("filter-status")?.addEventListener("change", handleEquipmentSearch);
  document.getElementById("add-equipment-form")?.addEventListener("submit", handleAddEquipmentSubmit);

  // Attach digit normalizer for new barcode input
  attachEnglishDigitNormalizer(document.getElementById('new-equipment-barcode'));

  // Populate autocomplete lists for add form
  populateAddEquipmentDatalists();

  // Wire barcode generator button
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
        console.error('❌ [equipment.js] clearEquipment', error);
      });
    });
    clearButton.dataset.listenerAttached = 'true';
  }

  const excelDownloadBtn = document.getElementById('excel-download-trigger');
  if (excelDownloadBtn && !excelDownloadBtn.dataset.listenerAttached) {
    excelDownloadBtn.addEventListener('click', (event) => {
      event.preventDefault();
      downloadEquipmentToExcel().catch((error) => {
        console.error('❌ [equipment.js] downloadEquipmentToExcel', error);
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

  [
    'edit-equipment-quantity',
    'edit-equipment-price',
    'edit-equipment-cost',
    'edit-equipment-barcode',
  ].forEach((id) => {
    const input = document.getElementById(id);
    attachEnglishDigitNormalizer(input);
  });
}

document.getElementById("save-equipment-changes")?.addEventListener("click", async () => {
  if (!isEquipmentEditMode) {
    currentEquipmentSnapshot = captureEquipmentFormValues();
    setEquipmentEditMode(true);
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
    cost: parseFloatSafe(document.getElementById("edit-equipment-cost").value) || 0,
    barcode: normalizeNumbers(document.getElementById("edit-equipment-barcode").value).trim(),
    status: document.getElementById("edit-equipment-status").value,
    image: document.getElementById("edit-equipment-image").value,
    lessor: document.getElementById("edit-equipment-lessor").value,
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

  const cancelEditBtn = document.getElementById('equipment-edit-cancel');
  if (cancelEditBtn && !cancelEditBtn.dataset.listenerAttached) {
    cancelEditBtn.addEventListener('click', () => {
      if (currentEquipmentSnapshot) {
        applyEquipmentFormValues(currentEquipmentSnapshot);
      }
      if (activeEquipmentIndex != null) {
        const items = getAllEquipment();
        const baseItem = items[activeEquipmentIndex];
        if (baseItem) {
          const variants = getVariantsForItem(baseItem);
          const primary = variants[0] || baseItem;
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
    if (!saveButton.dataset.mode) {
      saveButton.dataset.mode = 'view';
    }
  }
});

document.addEventListener("language:changed", () => {
  renderEquipment();
  setEquipmentEditMode(isEquipmentEditMode);
  if (activeEquipmentIndex != null) {
    const items = getAllEquipment();
    const baseItem = items[activeEquipmentIndex];
    if (baseItem) {
      const variants = getVariantsForItem(baseItem);
      const primary = variants[0] || baseItem;
      updateEquipmentHeaderMedia(primary);
    }
  }
});

document.addEventListener("equipment:refreshRequested", () => {
  refreshEquipmentFromApi({ showToastOnError: false });
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderEquipment();
});

document.addEventListener('equipment:changed', () => {
  refreshVariantsIfNeeded();
  populateAddEquipmentDatalists();
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

if (typeof document !== 'undefined' && !selectionChangeListenerAttached) {
  document.addEventListener(EQUIPMENT_SELECTION_EVENTS.change, () => {
    updateEquipmentSelectionBanner();
    renderEquipment();
  });
  selectionChangeListenerAttached = true;
}
