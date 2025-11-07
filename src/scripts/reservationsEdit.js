import { t } from './language.js';
import { loadData } from './storage.js';
import { showToast, normalizeNumbers } from './utils.js';
import { resolveReservationProjectState, resolveEquipmentIdentifier } from './reservationsShared.js';
import {
  setEditingTechnicians,
  resetEditingTechnicians,
  getEditingTechnicians,
  getEditingCrewAssignments,
} from './reservationsTechnicians.js';
import { normalizeBarcodeValue, getEquipmentAvailabilityStatus } from './reservationsEquipment.js';
import {
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
} from './reservationsSummary.js';
import { ensureCompanyShareEnabled, getEquipmentUnavailableMessage } from './reservations/createForm.js';
import { setupEditEquipmentDescriptionInput } from './reservations/formUtils.js';
import { renderEquipment, syncEquipmentStatuses } from './equipment.js';
import { getTechnicianConflictingReservationCodes } from './reservations/state.js';
import { apiRequest } from './apiClient.js';
import { syncTechniciansStatuses } from './technicians.js';
import {
  getReservationsState,
  updateReservationApi,
  buildReservationPayload,
  refreshReservationsFromApi,
  isApiError,
} from './reservationsService.js';
import { normalizePackageId, resolvePackageItems } from './reservationsPackages.js';
import { ensureTechnicianPositionsLoaded } from './technicianPositions.js';
import { getCachedReservationCrew } from './reservationsService.js';

let editingIndex = null;
let editingItems = [];
let editingPayments = [];
let modalInstance = null;
let modalEventsContext = {};
let isSyncingShareTaxEdit = false;

// ===== Crew debug helpers (safe no-op by default) =====
const CREW_DEBUG_FLAG = '__DEBUG_CREW__';
function isCrewDebugEnabled() {
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('debugCrew') === '1') return true;
      const ls = window.localStorage?.getItem(CREW_DEBUG_FLAG);
      if (ls && ['1', 'true', 'on', 'yes'].includes(String(ls).toLowerCase())) return true;
    }
  } catch (_) { /* ignore */ }
  return false;
}
function crewDebugLog(label, data) {
  if (!isCrewDebugEnabled()) return;
  try {
    // eslint-disable-next-line no-console
    console.log(`🪵 [crew-debug:edit] ${label}`, data);
  } catch (_) { /* ignore */ }
}

function updateConfirmedControls(value, { disable = false } = {}) {
  const hiddenInput = document.getElementById('edit-res-confirmed');
  const toggleBtn = document.getElementById('edit-res-confirmed-btn');
  const wrapper = document.getElementById('edit-res-confirmed-wrapper');
  const isConfirmed = Boolean(value);

  if (hiddenInput) {
    hiddenInput.value = isConfirmed ? 'true' : 'false';
  }

  if (toggleBtn) {
    const confirmLabel = toggleBtn.dataset.confirmLabel || '✅ تم التأكيد';
    const pendingLabel = toggleBtn.dataset.pendingLabel || '⏳ بانتظار التأكيد';
    toggleBtn.innerHTML = isConfirmed ? confirmLabel : pendingLabel;
    toggleBtn.dataset.state = isConfirmed ? 'confirmed' : 'pending';
    toggleBtn.classList.toggle('btn-success', isConfirmed && !disable);
    toggleBtn.classList.toggle('btn-outline-secondary', !isConfirmed || disable);
    toggleBtn.disabled = disable;
    toggleBtn.setAttribute('aria-pressed', isConfirmed ? 'true' : 'false');
  }

  if (wrapper) {
    wrapper.classList.toggle('is-disabled', disable);
  }
}

function isReservationConfirmed() {
  return document.getElementById('edit-res-confirmed')?.value === 'true';
}

export function getEditingState() {
  return { index: editingIndex, items: editingItems, payments: editingPayments };
}

export function setEditingState(index, items, payments = editingPayments) {
  editingIndex = typeof index === 'number' ? index : null;
  editingItems = Array.isArray(items) ? [...items] : [];
  editingPayments = Array.isArray(payments) ? [...payments] : [];
}

export function clearEditingState() {
  editingIndex = null;
  editingItems = [];
  resetEditingTechnicians();
  editingPayments = [];
}

export function getEditingPayments() {
  return [...editingPayments];
}

export function setEditingPayments(payments) {
  editingPayments = Array.isArray(payments) ? [...payments] : [];
}

export function addEditingPayment(entry) {
  if (!entry) return;
  editingPayments = [...editingPayments, entry];
}

export function removeEditingPayment(index) {
  if (!Number.isInteger(index) || index < 0) return;
  editingPayments = editingPayments.filter((_, idx) => idx !== index);
}

function toPositiveIntSafe(value, fallback = 1) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '')));
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
}

function toPriceNumberSafe(value, fallback = 0) {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }
  const parsed = Number.parseFloat(normalizeNumbers(String(value)));
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  return Number(parsed.toFixed(2));
}

function normalizePackageItemForEditing(pkgItem = {}) {
  if (!pkgItem || typeof pkgItem !== 'object') {
    return null;
  }

  const equipmentId = pkgItem.equipmentId
    ?? pkgItem.equipment_id
    ?? pkgItem.item_id
    ?? pkgItem.itemId
    ?? pkgItem.id
    ?? null;
  const barcode = pkgItem.barcode ?? pkgItem.normalizedBarcode ?? '';
  const normalizedBarcode = pkgItem.normalizedBarcode
    ?? (barcode ? normalizeBarcodeValue(barcode) : '');

  return {
    equipmentId: equipmentId != null ? String(equipmentId) : null,
    barcode,
    normalizedBarcode,
    desc: pkgItem.desc ?? pkgItem.description ?? pkgItem.name ?? '',
    qty: toPositiveIntSafe(pkgItem.qty ?? pkgItem.quantity ?? pkgItem.count ?? 1),
    price: toPriceNumberSafe(pkgItem.price ?? pkgItem.unit_price ?? pkgItem.unitPrice ?? 0),
    image: pkgItem.image ?? pkgItem.image_url ?? pkgItem.imageUrl ?? null,
  };
}

function normalizePackageEntryForEditing(pkg, index = 0) {
  if (!pkg || typeof pkg !== 'object') {
    return null;
  }

  const normalizedId = normalizePackageId(
    pkg.packageId
      ?? pkg.package_id
      ?? pkg.package_code
      ?? pkg.packageCode
      ?? pkg.code
      ?? pkg.id
      ?? `pkg-${index}`
  ) || `pkg-${index}`;

  // Always treat package as single kit in editing context
  const quantity = 1;

  const packageItemsSource = Array.isArray(pkg.packageItems) && pkg.packageItems.length
    ? pkg.packageItems
    : resolvePackageItems(pkg);

  const packageItems = packageItemsSource
    .map((item) => normalizePackageItemForEditing(item))
    .filter(Boolean);

  const totalCandidate = pkg.total_price ?? pkg.totalPrice ?? pkg.total ?? null;
  let unitPrice = toPriceNumberSafe(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? null, 0);
  if ((!unitPrice || unitPrice === 0) && totalCandidate != null) {
    const total = toPriceNumberSafe(totalCandidate, 0);
    if (total > 0 && quantity > 0) {
      unitPrice = Number((total / quantity).toFixed(2));
    }
  }

  const barcode = pkg.package_code ?? pkg.packageCode ?? pkg.barcode ?? null;
  const descriptionCandidates = [
    pkg.name,
    pkg.desc,
    pkg.package_name,
    pkg.packageName,
    pkg.title,
    pkg.description,
    barcode,
    normalizedId
  ];
  const description = descriptionCandidates.find((value) => value != null && String(value).trim() !== '')
    || `Package ${normalizedId}`;

  const image = pkg.image
    ?? pkg.cover
    ?? pkg.thumbnail
    ?? (packageItems.find((item) => item?.image)?.image ?? null);

  return {
    id: pkg.id != null ? String(pkg.id) : `package::${normalizedId}`,
    type: 'package',
    packageId: normalizedId,
    package_id: normalizedId,
    desc: normalizeNumbers(String(description)),
    name: normalizeNumbers(String(description)),
    qty: quantity,
    price: unitPrice,
    barcode,
    packageItems,
    image,
  };
}

function decrementPackageCounters(counterMap, keys = [], amount = 0) {
  if (!amount || amount <= 0) {
    return;
  }
  keys.forEach((key) => {
    if (!key) return;
    const current = counterMap.get(key);
    if (current == null) return;
    const next = current - amount;
    counterMap.set(key, next > 0 ? next : 0);
  });
}

function mergeReservationPackagesIntoItems(reservation = {}, items = []) {
  const baseItems = Array.isArray(items) ? items.map((item) => ({ ...item })) : [];
  const packagesSource = Array.isArray(reservation?.packages) ? reservation.packages : [];
  if (!packagesSource.length) {
    return baseItems;
  }

  const packageEntries = packagesSource
    .map((pkg, index) => normalizePackageEntryForEditing(pkg, index))
    .filter(Boolean);

  if (!packageEntries.length) {
    return baseItems;
  }

  const packageItemCounter = new Map();

  packageEntries.forEach((pkg) => {
    const packageQty = toPositiveIntSafe(pkg.qty ?? pkg.quantity ?? 1);
    if (pkg.barcode) {
      const normalizedPackageBarcode = normalizeBarcodeValue(pkg.barcode);
      if (normalizedPackageBarcode) {
        const key = `package::${normalizedPackageBarcode}`;
        packageItemCounter.set(key, (packageItemCounter.get(key) ?? 0) + packageQty);
      }
    }

    (pkg.packageItems || []).forEach((pkgItem) => {
      if (!pkgItem) return;
      const childQty = packageQty * toPositiveIntSafe(pkgItem.qty ?? pkgItem.quantity ?? 1);
      const equipmentId = pkgItem.equipmentId ?? null;
      const normalizedBarcode = pkgItem.normalizedBarcode || (pkgItem.barcode ? normalizeBarcodeValue(pkgItem.barcode) : null);

      if (equipmentId != null) {
        const key = `equipment::${String(equipmentId)}`;
        packageItemCounter.set(key, (packageItemCounter.get(key) ?? 0) + childQty);
      }

      if (normalizedBarcode) {
        const key = `barcode::${normalizedBarcode}`;
        packageItemCounter.set(key, (packageItemCounter.get(key) ?? 0) + childQty);
      }
    });
  });

  const filteredItems = [];

  baseItems.forEach((item) => {
    if (!item || typeof item !== 'object') {
      filteredItems.push(item);
      return;
    }

    if (item.type === 'package') {
      const existingPackageId = normalizePackageId(item.packageId ?? item.package_id ?? item.id ?? '');
      const duplicate = packageEntries.some((pkg) => pkg.packageId === existingPackageId);
      if (!duplicate) {
        filteredItems.push({ ...item });
      }
      return;
    }

    const quantity = toPositiveIntSafe(item.qty ?? item.quantity ?? 1);
    const equipmentId = resolveEquipmentIdentifier(item);
    const normalizedBarcode = item.barcode ? normalizeBarcodeValue(item.barcode) : null;

    const keys = [];
    if (equipmentId != null) {
      keys.push(`equipment::${String(equipmentId)}`);
    }
    if (normalizedBarcode) {
      keys.push(`barcode::${normalizedBarcode}`);
    }

    const availableCounts = keys
      .map((key) => packageItemCounter.get(key) ?? 0)
      .filter((count) => count > 0);

    if (!availableCounts.length) {
      filteredItems.push({ ...item });
      return;
    }

    const available = Math.min(...availableCounts);
    if (available <= 0) {
      filteredItems.push({ ...item });
      return;
    }

    const matchedQuantity = Math.min(available, quantity);
    decrementPackageCounters(packageItemCounter, keys, matchedQuantity);

    if (matchedQuantity >= quantity) {
      return;
    }

    const remainingQty = quantity - matchedQuantity;
    filteredItems.push({
      ...item,
      qty: remainingQty,
      quantity: remainingQty,
    });
  });

  return [...filteredItems, ...packageEntries.map((entry) => ({ ...entry }))];
}

function ensureModalInstance(modalElement, factory) {
  if (!modalElement) return null;
  if (typeof factory === 'function') {
    return factory(modalElement);
  }

  if (window?.bootstrap?.Modal) {
    return window.bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  if (typeof bootstrap !== 'undefined' && bootstrap?.Modal) {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
  }

  return null;
}

export function getEditPaymentProgressType(select, fallback = 'percent') {
  const value = select?.value;
  if (value === 'amount' || value === 'percent') {
    return value;
  }
  return fallback;
}

export function parseEditPaymentProgressValue(input) {
  if (!input) return null;
  const raw = normalizeNumbers(String(input.value || '')).replace('%', '').trim();
  if (!raw) return null;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
}

function setEditPaymentProgressValue(input, value) {
  if (!input) return;
  if (value == null || !Number.isFinite(value) || value <= 0) {
    input.value = '';
    return;
  }
  input.value = normalizeNumbers(String(value));
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizePaymentHistoryEntry(entry) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }

  const type = entry.type === 'amount' || entry.type === 'percent' ? entry.type : null;
  const normalizedValue = Number.parseFloat(normalizeNumbers(String(entry.value ?? '')));
  const normalizedAmount = Number.parseFloat(normalizeNumbers(String(entry.amount ?? '')));
  const normalizedPercent = Number.parseFloat(normalizeNumbers(String(entry.percentage ?? '')));
  const resolvedAmount = Number.isFinite(normalizedAmount)
    ? normalizedAmount
    : (type === 'amount' && Number.isFinite(normalizedValue) ? normalizedValue : null);
  const resolvedPercent = Number.isFinite(normalizedPercent)
    ? normalizedPercent
    : (type === 'percent' && Number.isFinite(normalizedValue) ? normalizedValue : null);

  const resolvedType = type
    ?? (Number.isFinite(resolvedAmount) ? 'amount' : (Number.isFinite(resolvedPercent) ? 'percent' : null));

  const valueForStorage = resolvedType === 'amount'
    ? resolvedAmount ?? null
    : resolvedType === 'percent'
      ? resolvedPercent ?? null
      : Number.isFinite(normalizedValue) ? normalizedValue : null;

  const recordedAt = entry.recordedAt
    ?? entry.recorded_at
    ?? new Date().toISOString();

  return {
    type: resolvedType,
    value: valueForStorage,
    amount: Number.isFinite(resolvedAmount) ? resolvedAmount : null,
    percentage: Number.isFinite(resolvedPercent) ? resolvedPercent : null,
    note: entry.note ?? null,
    recordedAt,
  };
}

function populateEditProjectSelect(projects = [], reservation = null) {
  const select = document.getElementById('edit-res-project');
  if (!select) return;

  const placeholder = t('reservations.create.placeholders.project', 'اختر مشروعاً (اختياري)');
  const orphanLabel = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const currentValue = reservation?.projectId ? String(reservation.projectId) : '';
  const sorted = Array.isArray(projects)
    ? [...projects].sort((a, b) => String(b.createdAt || b.start || '').localeCompare(String(a.createdAt || a.start || '')))
    : [];

  const options = [`<option value="">${escapeHtml(placeholder)}</option>`];

  sorted.forEach((project) => {
    options.push(`<option value="${escapeHtml(project.id)}">${escapeHtml(project.title || placeholder)}</option>`);
  });

  if (currentValue && !sorted.some((project) => String(project.id) === currentValue)) {
    options.push(`<option value="${escapeHtml(currentValue)}">${escapeHtml(orphanLabel)}</option>`);
  }

  select.innerHTML = options.join('');
  if (currentValue) {
    select.value = currentValue;
  } else {
    select.value = '';
  }
}

function updateEditProjectTaxState() {
  const projectSelect = document.getElementById('edit-res-project');
  const taxCheckbox = document.getElementById('edit-res-tax');
  const shareCheckbox = document.getElementById('edit-res-company-share');
  const discountInput = document.getElementById('edit-res-discount');
  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  const message = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.');

  const isLinked = Boolean(projectSelect?.value);
  if (isLinked) {
    if (taxCheckbox) {
      taxCheckbox.checked = false;
      taxCheckbox.disabled = true;
      taxCheckbox.classList.add('disabled');
      taxCheckbox.title = message;
    }
    if (shareCheckbox) {
      if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('disabled');
      shareCheckbox.title = message;
    }
    if (discountInput) {
      discountInput.value = '0';
      discountInput.disabled = true;
      discountInput.classList.add('disabled', 'reservation-input-disabled');
      discountInput.title = message;
    }
    if (discountTypeSelect) {
      discountTypeSelect.value = 'percent';
      discountTypeSelect.disabled = true;
      discountTypeSelect.classList.add('disabled', 'reservation-input-disabled');
      discountTypeSelect.title = message;
    }
  } else {
    if (taxCheckbox) {
      const wasDisabled = taxCheckbox.disabled;
      taxCheckbox.disabled = false;
      taxCheckbox.classList.remove('disabled');
      taxCheckbox.title = '';
      if (wasDisabled) {
        taxCheckbox.checked = false;
      }
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('disabled');
      shareCheckbox.title = '';
    }
    if (discountInput) {
      discountInput.disabled = false;
      discountInput.classList.remove('disabled', 'reservation-input-disabled');
      discountInput.title = '';
    }
    if (discountTypeSelect) {
      discountTypeSelect.disabled = false;
      discountTypeSelect.classList.remove('disabled', 'reservation-input-disabled');
      discountTypeSelect.title = '';
    }
  }

  syncEditTaxAndShare('tax');

  const updateSummary = modalEventsContext?.updateEditReservationSummary;
  if (typeof updateSummary === 'function') {
    updateSummary();
  }
}

function syncEditTaxAndShare(source) {
  const taxCheckbox = document.getElementById('edit-res-tax');
  const shareCheckbox = document.getElementById('edit-res-company-share');

  if (!taxCheckbox || !shareCheckbox) {
    return;
  }

  const updateSummary = () => {
    const update = modalEventsContext?.updateEditReservationSummary;
    if (typeof update === 'function') {
      update();
    }
  };

  if (isSyncingShareTaxEdit) {
    updateSummary();
    return;
  }

  isSyncingShareTaxEdit = true;

  const finalize = () => {
    isSyncingShareTaxEdit = false;
    updateSummary();
  };

  if (source === 'share') {
    if (shareCheckbox.checked) {
      if (!shareCheckbox.dataset.companyShare) {
        shareCheckbox.dataset.companyShare = String(DEFAULT_COMPANY_SHARE_PERCENT);
      }

      if (taxCheckbox.disabled) {
        shareCheckbox.checked = false;
        showToast(t('reservations.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة'));
        finalize();
        return;
      }

      if (!taxCheckbox.checked) {
        taxCheckbox.checked = true;
      }

      ensureCompanyShareEnabled('edit-res-company-share');
    } else {
      if (taxCheckbox.checked && !taxCheckbox.disabled) {
        taxCheckbox.checked = false;
      }
    }
  } else if (source === 'tax') {
    if (taxCheckbox.checked) {
      ensureCompanyShareEnabled('edit-res-company-share');
    } else {
      if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }
  }

  finalize();
}

export async function editReservation(index, {
  populateEquipmentDescriptionLists,
  setFlatpickrValue,
  splitDateTime,
  renderEditItems,
  updateEditReservationSummary,
  ensureModal
} = {}) {
  const { customers, projects } = loadData();
  const reservations = getReservationsState();
  const reservation = reservations?.[index];

  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return;
  }

  modalEventsContext = {
    ...modalEventsContext,
    reservation,
    projects: projects || []
  };

  populateEquipmentDescriptionLists?.();
  populateEditProjectSelect(projects || [], reservation);

  const project = reservation.projectId
    ? projects?.find?.((p) => String(p.id) === String(reservation.projectId)) || null
    : null;
  const {
    effectiveConfirmed: initialConfirmed,
    projectLinked
  } = resolveReservationProjectState(reservation, project);

  const normalizedItems = reservation.items
    ? reservation.items.map(item => ({
        ...item,
        equipmentId: item.equipmentId ?? item.equipment_id ?? item.id,
        barcode: normalizeBarcodeValue(item?.barcode)
      }))
    : [];

  const initialItems = mergeReservationPackagesIntoItems(reservation, normalizedItems);

  const rawPayments = Array.isArray(reservation.paymentHistory)
    ? reservation.paymentHistory
    : Array.isArray(reservation.payment_history)
      ? reservation.payment_history
      : [];
  const normalizedPayments = rawPayments
    .map((entry) => normalizePaymentHistoryEntry(entry))
    .filter(Boolean);

  setEditingState(index, initialItems, normalizedPayments);

  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');
  const customer = customers?.find?.((c) => String(c.id) === String(reservation.customerId));

  document.getElementById('edit-res-index')?.setAttribute('value', String(index));

  const idInput = document.getElementById('edit-res-id');
  if (idInput) idInput.value = reservation.reservationId || reservation.id;

  const customerInput = document.getElementById('edit-res-customer');
  if (customerInput) customerInput.value = customer?.customerName || unknownCustomer;

  const splitStart = typeof splitDateTime === 'function' ? splitDateTime(reservation.start) : { date: '', time: '' };
  const splitEnd = typeof splitDateTime === 'function' ? splitDateTime(reservation.end) : { date: '', time: '' };

  setFlatpickrValue?.('edit-res-start', splitStart.date);
  setFlatpickrValue?.('edit-res-start-time', splitStart.time);
  setFlatpickrValue?.('edit-res-end', splitEnd.date);
  setFlatpickrValue?.('edit-res-end-time', splitEnd.time);

  const notesInput = document.getElementById('edit-res-notes');
  if (notesInput) notesInput.value = reservation.notes || '';

  const discountInput = document.getElementById('edit-res-discount');
  if (discountInput) {
    const initialDiscount = projectLinked ? 0 : (reservation.discount ?? 0);
    discountInput.value = normalizeNumbers(initialDiscount);
  }

  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  if (discountTypeSelect) {
    discountTypeSelect.value = projectLinked ? 'percent' : (reservation.discountType || 'percent');
  }

  const applyTaxFlag = reservation.projectId ? false : !!reservation.applyTax;
  const taxCheckbox = document.getElementById('edit-res-tax');
  if (taxCheckbox) taxCheckbox.checked = applyTaxFlag;

  const shareCheckbox = document.getElementById('edit-res-company-share');
  if (shareCheckbox) {
    const rawSharePercent = reservation.companySharePercent
      ?? reservation.company_share_percent
      ?? reservation.companyShare
      ?? reservation.company_share
      ?? null;
    const parsedSharePercent = rawSharePercent != null
      ? Number.parseFloat(normalizeNumbers(String(rawSharePercent).replace('%', '').trim()))
      : NaN;
    const enabledRaw = reservation.companyShareEnabled
      ?? reservation.company_share_enabled
      ?? reservation.companyShareApplied
      ?? reservation.company_share_applied
      ?? null;
    const shareEnabledInitial = enabledRaw != null
      ? (enabledRaw === true || enabledRaw === 1 || enabledRaw === '1' || String(enabledRaw).toLowerCase() === 'true')
      : (Number.isFinite(parsedSharePercent) && parsedSharePercent > 0);
    const effectiveShare = shareEnabledInitial && Number.isFinite(parsedSharePercent) && parsedSharePercent > 0
      ? parsedSharePercent
      : DEFAULT_COMPANY_SHARE_PERCENT;
    const shouldEnableShare = applyTaxFlag || shareEnabledInitial;
    shareCheckbox.checked = shouldEnableShare;
    shareCheckbox.dataset.companyShare = String(effectiveShare);
  }

  updateConfirmedControls(initialConfirmed, { disable: projectLinked });

  const paidSelect = document.getElementById('edit-res-paid');
  const initialPaidStatus = reservation.paidStatus
    ?? (reservation.paid === true || reservation.paid === 'paid' ? 'paid' : 'unpaid');
  if (paidSelect) {
    paidSelect.value = initialPaidStatus;
    if (paidSelect.dataset) {
      delete paidSelect.dataset.userSelected;
    }
  }

  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');

  if (paymentProgressTypeSelect?.dataset?.userSelected) {
    delete paymentProgressTypeSelect.dataset.userSelected;
  }

  if (paymentProgressTypeSelect) {
    paymentProgressTypeSelect.value = 'percent';
  }

  setEditPaymentProgressValue(paymentProgressValueInput, null);

  // Initialize cancelled control if present
  const cancelledCheckboxInit = document.getElementById('edit-res-cancelled');
  if (cancelledCheckboxInit) {
    const rawStatus = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    cancelledCheckboxInit.checked = ['cancelled', 'canceled'].includes(rawStatus);
    if (cancelledCheckboxInit.checked) {
      updateConfirmedControls(initialConfirmed, { disable: true });
    }
  }

  let initialCrewAssignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
    ? reservation.crewAssignments
    : (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length
        ? reservation.techniciansDetails
        : (reservation.technicians || []).map((id) => String(id)));
  if (!Array.isArray(initialCrewAssignments) || initialCrewAssignments.length === 0) {
    const cached = getCachedReservationCrew(reservation.id ?? reservation.reservationId ?? reservation.reservation_code ?? null);
    if (Array.isArray(cached) && cached.length) {
      initialCrewAssignments = cached;
    }
  }
  try {
    await ensureTechnicianPositionsLoaded();
  } catch (e) {
    console.warn('[reservationsEdit] positions load failed (non-fatal)', e);
  }
  setEditingTechnicians(initialCrewAssignments);

  renderEditItems?.(initialItems);
  if (typeof window !== 'undefined') {
    const renderHistory = window?.renderEditPaymentHistory;
    if (typeof renderHistory === 'function') {
      renderHistory();
    }
  }
  updateEditProjectTaxState();
  updateEditReservationSummary?.();

  const modalElement = document.getElementById('editReservationModal');
  modalInstance = ensureModalInstance(modalElement, ensureModal);
  modalInstance?.show?.();
}

export async function saveReservationChanges({
  combineDateTime,
  hasEquipmentConflict,
  hasPackageConflict,
  hasTechnicianConflict,
  updateEditReservationSummary,
  renderReservations,
  populateEquipmentDescriptionLists,
  handleReservationsMutation
} = {}) {
  if (editingIndex === null) {
    console.warn('⚠️ [reservationsEdit.js] No reservation selected for editing');
    return;
  }

  const startDate = document.getElementById('edit-res-start')?.value?.trim();
  const startTime = document.getElementById('edit-res-start-time')?.value?.trim() || '00:00';
  const endDate = document.getElementById('edit-res-end')?.value?.trim();
  const endTime = document.getElementById('edit-res-end-time')?.value?.trim() || '00:00';
  const notes = document.getElementById('edit-res-notes')?.value || '';
  const discountRaw = normalizeNumbers(document.getElementById('edit-res-discount')?.value || '0');
  let discount = parseFloat(discountRaw) || 0;
  let discountType = document.getElementById('edit-res-discount-type')?.value || 'percent';
  const confirmed = isReservationConfirmed();
  const paymentSelect = document.getElementById('edit-res-paid');
  const manualPaidOverride = paymentSelect?.dataset?.userSelected === 'true';
  const paidStatus = manualPaidOverride ? (paymentSelect?.value || 'unpaid') : 'unpaid';
  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  const paymentProgressType = getEditPaymentProgressType(paymentProgressTypeSelect);
  const paymentProgressValue = parseEditPaymentProgressValue(paymentProgressValueInput);
  const projectIdValue = document.getElementById('edit-res-project')?.value || '';
  const cancelledToggle = document.getElementById('edit-res-cancelled');
  const isCancelledToggle = cancelledToggle?.checked === true;
  const crewAssignments = getEditingCrewAssignments();
  const technicianIds = crewAssignments
    .map((assignment) => assignment?.technicianId)
    .filter(Boolean);
  const shareCheckbox = document.getElementById('edit-res-company-share');
  const taxCheckbox = document.getElementById('edit-res-tax');

  if (!startDate || !endDate) {
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const combine = typeof combineDateTime === 'function'
    ? combineDateTime
    : (date, time) => `${date}T${time || '00:00'}`;

  const start = combine(startDate, startTime);
  const end = combine(endDate, endTime);

  if (start && end && new Date(start) > new Date(end)) {
    showToast(t('reservations.toast.invalidDateOrder', '⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية'));
    return;
  }

  const reservations = getReservationsState();
  const reservation = reservations?.[editingIndex];
  if (!reservation) {
    showToast(t('reservations.toast.reservationMissing', '⚠️ تعذر العثور على الحجز المطلوب'));
    return;
  }

  if (!Array.isArray(editingItems) || (editingItems.length === 0 && crewAssignments.length === 0)) {
    showToast(t('reservations.toast.updateNoItems', '⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز'));
    return;
  }

  const hasEquipmentConflictFn = typeof hasEquipmentConflict === 'function'
    ? hasEquipmentConflict
    : () => false;
  const ignoreReservationKey = reservation.id ?? reservation.reservationId;

  for (const item of editingItems) {
    if (item?.type === 'package' && Array.isArray(item.packageItems)) {
      for (const pkgItem of item.packageItems) {
        const packageBarcode = pkgItem?.barcode ?? pkgItem?.normalizedBarcode ?? '';
        if (!packageBarcode) continue;
        const status = getEquipmentAvailabilityStatus(packageBarcode);
        if (status === 'reserved') {
          const code = normalizeBarcodeValue(packageBarcode);
          if (!hasEquipmentConflictFn(code, start, end, ignoreReservationKey)) {
            continue;
          }
        }

        if (status !== 'available') {
          showToast(getEquipmentUnavailableMessage(status));
          return;
        }
      }
      continue;
    }

    const status = getEquipmentAvailabilityStatus(item.barcode);
    if (status === 'reserved') {
      const code = normalizeBarcodeValue(item.barcode);
      if (!hasEquipmentConflictFn(code, start, end, ignoreReservationKey)) {
        continue;
      }
    }

    if (status !== 'available') {
      showToast(getEquipmentUnavailableMessage(status));
      return;
    }
  }

  // Collect all conflicting equipment names to present a clear toast
  const conflictingEquipment = [];

  for (const item of editingItems) {
    if (item?.type === 'package' && Array.isArray(item.packageItems)) {
      for (const pkgItem of item.packageItems) {
        const code = normalizeBarcodeValue(pkgItem?.barcode ?? pkgItem?.normalizedBarcode ?? '');
        if (!code) continue;
        if (hasEquipmentConflictFn(code, start, end, ignoreReservationKey)) {
          const label = pkgItem?.desc || pkgItem?.barcode || t('reservations.create.packages.unnamedItem', 'معدة بدون اسم');
          conflictingEquipment.push({
            label: normalizeNumbers(String(label)),
            barcode: code,
          });
        }
      }
      continue;
    }

    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflictFn(code, start, end, ignoreReservationKey)) {
      const label = item?.desc || item?.name || item?.barcode || t('reservations.create.packages.unnamedItem', 'معدة بدون اسم');
      conflictingEquipment.push({
        label: normalizeNumbers(String(label)),
        barcode: code,
      });
    }
  }

  if (conflictingEquipment.length) {
    const prefix = t('reservations.toast.updateEquipmentConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات');
    // Try to fetch reservation codes causing conflicts (best-effort)
    let annotatedList = null;
    try {
      const uniqueBarcodes = Array.from(new Set(conflictingEquipment.map((e) => e.barcode).filter(Boolean)));
      const codeMap = new Map();
      await Promise.all(uniqueBarcodes.map(async (barcode) => {
        const params = new URLSearchParams();
        params.set('type', 'equipment');
        params.set('id', barcode);
        params.set('start', start);
        params.set('end', end);
        if (ignoreReservationKey != null) params.set('ignore', String(ignoreReservationKey));
        const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
        const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
        const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
        codeMap.set(barcode, codes);
      }));
      annotatedList = conflictingEquipment.map(({ label, barcode }) => {
        const codes = codeMap.get(barcode) || [];
        return codes.length ? `${label} (${codes.join('، ')})` : label;
      }).join('، ');
    } catch (_) {
      // fallback to labels-only if API not available
    }

    const list = annotatedList
      || conflictingEquipment.map((e) => e.label).filter(Boolean).map(String).join('، ');
    showToast(`${prefix}: ${list}`);
    return;
  }

  const hasPackageConflictFn = typeof hasPackageConflict === 'function'
    ? hasPackageConflict
    : () => false;

  for (const item of editingItems) {
    if (item?.type !== 'package') continue;
    const packageId = item.packageId ?? item.package_id ?? null;
    if (!packageId) continue;
    if (hasPackageConflictFn(packageId, start, end, ignoreReservationKey)) {
      const packageName = item.desc || item.packageName || t('reservations.create.packages.genericName', 'الحزمة');
      try {
        const params = new URLSearchParams();
        params.set('type', 'package');
        params.set('id', String(packageId));
        params.set('start', start);
        params.set('end', end);
        if (ignoreReservationKey != null) params.set('ignore', String(ignoreReservationKey));
        const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
        const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
        const codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
        const suffix = codes.length ? ` (${codes.join('، ')})` : '';
        showToast(t('reservations.toast.packageTimeConflict', `⚠️ الحزمة ${normalizeNumbers(String(packageName))} محجوزة بالفعل في الفترة المختارة`) + suffix);
      } catch (_) {
        showToast(t('reservations.toast.packageTimeConflict', `⚠️ الحزمة ${normalizeNumbers(String(packageName))} محجوزة بالفعل في الفترة المختارة`));
      }
      return;
    }
  }

  const hasTechnicianConflictFn = typeof hasTechnicianConflict === 'function'
    ? hasTechnicianConflict
    : () => false;

  const crewConflicts = [];
  for (const assignment of crewAssignments) {
    if (!assignment?.technicianId) continue;
    if (!hasTechnicianConflictFn(assignment.technicianId, start, end, ignoreReservationKey)) continue;
    const label = assignment?.technicianName || assignment?.positionLabel || String(assignment.technicianId);
    let codes = [];
    try {
      codes = getTechnicianConflictingReservationCodes(assignment.technicianId, start, end, ignoreReservationKey);
    } catch (_) { /* ignore */ }
    crewConflicts.push({ label: normalizeNumbers(String(label)), codes });
  }
  if (crewConflicts.length) {
    const prefix = t('reservations.toast.updateCrewConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم');
    const details = crewConflicts
      .map(({ label, codes }) => (codes && codes.length ? `${label} (${codes.join('، ')})` : label))
      .join('، ');
    showToast(`${prefix}: ${details}`);
    return;
  }

  const projectsList = Array.isArray(modalEventsContext.projects) && modalEventsContext.projects.length
    ? modalEventsContext.projects
    : (loadData().projects || []);
  const selectedProject = projectIdValue
    ? projectsList.find((project) => String(project.id) === String(projectIdValue)) || null
    : null;

  const reservationStateForHelper = {
    ...reservation,
    projectId: projectIdValue ? String(projectIdValue) : null,
    confirmed,
  };
  const {
    effectiveConfirmed,
    projectLinked: helperProjectLinked,
    projectStatus
  } = resolveReservationProjectState(reservationStateForHelper, selectedProject);

  let shareChecked = Boolean(shareCheckbox?.checked);
  let taxChecked = Boolean(taxCheckbox?.checked);

  if (helperProjectLinked) {
    if (shareChecked) {
      shareCheckbox.checked = false;
      shareChecked = false;
    }
    taxChecked = false;
  }

  if (!helperProjectLinked && shareChecked !== taxChecked) {
    showToast(t('reservations.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة'));
    return;
  }

  if (taxChecked) {
    ensureCompanyShareEnabled('edit-res-company-share');
    shareChecked = Boolean(shareCheckbox?.checked);
  }

  let companySharePercent = shareChecked ? getCompanySharePercent('edit-res-company-share') : null;
  if (shareChecked && (!Number.isFinite(companySharePercent) || companySharePercent <= 0)) {
    ensureCompanyShareEnabled('edit-res-company-share');
    companySharePercent = getCompanySharePercent('edit-res-company-share');
  }

  const companyShareEnabled = shareChecked && taxChecked && Number.isFinite(companySharePercent) && companySharePercent > 0;

  const applyTax = helperProjectLinked ? false : taxChecked;

  if (helperProjectLinked) {
    discount = 0;
    discountType = 'percent';
  }

  const totalAmount = calculateReservationTotal(
    editingItems,
    discount,
    discountType,
    applyTax,
    crewAssignments,
    {
      start,
      end,
      companySharePercent: companyShareEnabled ? companySharePercent : 0
    }
  );

  let paymentHistory = getEditingPayments();

  if (Number.isFinite(paymentProgressValue) && paymentProgressValue > 0) {
    const totalSnapshot = totalAmount;
    let amount = null;
    let percentage = null;

    if (paymentProgressType === 'amount') {
      amount = paymentProgressValue;
      if (totalSnapshot > 0) {
        percentage = (paymentProgressValue / totalSnapshot) * 100;
      }
    } else {
      percentage = paymentProgressValue;
      if (totalSnapshot > 0) {
        amount = (paymentProgressValue / 100) * totalSnapshot;
      }
    }

    const pendingEntry = normalizePaymentHistoryEntry({
      type: paymentProgressType,
      value: paymentProgressValue,
      amount,
      percentage,
      recordedAt: new Date().toISOString(),
    });
    if (pendingEntry) {
      paymentHistory = [...paymentHistory, pendingEntry];
      setEditingPayments(paymentHistory);
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.value = '';
    }
  }

  const paymentProgress = calculatePaymentProgress({
    totalAmount,
    history: paymentHistory,
  });

  const effectivePaidStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount,
  });
  if (paymentSelect && !manualPaidOverride) {
    paymentSelect.value = effectivePaidStatus;
    if (paymentSelect.dataset) {
      delete paymentSelect.dataset.userSelected;
    }
  }

  let statusForPayload = reservation.status ?? 'pending';
  if (helperProjectLinked) {
    statusForPayload = selectedProject?.status ?? projectStatus ?? statusForPayload;
  } else if (isCancelledToggle) {
    statusForPayload = 'cancelled';
  } else if (!['completed', 'cancelled'].includes(String(statusForPayload).toLowerCase())) {
    statusForPayload = confirmed ? 'confirmed' : 'pending';
  }

  const payload = buildReservationPayload({
    reservationCode: reservation.reservationCode ?? reservation.reservationId ?? null,
    customerId: reservation.customerId,
    start,
    end,
    status: statusForPayload,
    title: reservation.title ?? null,
    location: reservation.location ?? null,
    notes,
    projectId: projectIdValue ? String(projectIdValue) : null,
    totalAmount,
    discount,
    discountType,
    applyTax,
    paidStatus: effectivePaidStatus,
    confirmed: effectiveConfirmed,
    items: editingItems.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    crewAssignments,
    companySharePercent: companyShareEnabled ? companySharePercent : null,
    companyShareEnabled,
    paidAmount: paymentProgress.paidAmount,
    paidPercentage: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    paymentHistory,
  });

  try {
    crewDebugLog('about to submit', {
      editingIndex,
      crewAssignments,
      techniciansPayload: payload?.technicians,
      payload,
    });
    const updatedReservation = await updateReservationApi(reservation.id || reservation.reservationId, payload);
    crewDebugLog('server response', {
      reservation: updatedReservation?.id ?? updatedReservation?.reservationId ?? updatedReservation?.reservation_code,
      technicians: updatedReservation?.technicians,
      crewAssignments: updatedReservation?.crewAssignments,
      techniciansDetails: updatedReservation?.techniciansDetails,
    });
    await refreshReservationsFromApi();
    syncEquipmentStatuses();
    syncTechniciansStatuses();
    renderEquipment();
    showToast(t('reservations.toast.updated', '✅ تم حفظ التعديلات على الحجز'));

    updateEditReservationSummary?.();
    clearEditingState();
    handleReservationsMutation?.({ type: 'updated', reservation: updatedReservation });
    renderReservations?.();
    populateEquipmentDescriptionLists?.();

    modalInstance?.hide?.();
  } catch (error) {
    console.error('❌ [reservationsEdit] Failed to update reservation', error);
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.updateFailed', 'تعذر تحديث بيانات الحجز');
    showToast(message, 'error');
  }
}

export function setupEditReservationModalEvents(context = {}) {
  modalEventsContext = { ...context };

  const { updateEditReservationSummary, addEquipmentToEditingReservation, addEquipmentByDescription, renderEditItems } = modalEventsContext;

  const discountInput = document.getElementById('edit-res-discount');
  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', () => {
      discountInput.value = normalizeNumbers(discountInput.value);
      updateEditReservationSummary?.();
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', () => updateEditReservationSummary?.());
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  const taxCheckbox = document.getElementById('edit-res-tax');
  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => {
      syncEditTaxAndShare('tax');
    });
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  const shareCheckbox = document.getElementById('edit-res-company-share');
  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => {
      syncEditTaxAndShare('share');
    });
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  if (paymentProgressTypeSelect && !paymentProgressTypeSelect.dataset.listenerAttached) {
    paymentProgressTypeSelect.addEventListener('change', () => {
      paymentProgressTypeSelect.dataset.userSelected = 'true';
      updateEditReservationSummary?.();
    });
    paymentProgressTypeSelect.dataset.listenerAttached = 'true';
  }

  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', () => {
      paymentProgressValueInput.value = normalizeNumbers(paymentProgressValueInput.value);
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  if (typeof window !== 'undefined' && typeof window.renderEditPaymentHistory === 'function') {
    window.renderEditPaymentHistory();
  }

  const projectSelect = document.getElementById('edit-res-project');
  if (projectSelect && !projectSelect.dataset.listenerAttached) {
    projectSelect.addEventListener('change', () => {
      updateEditProjectTaxState();
      const projectsList = Array.isArray(modalEventsContext.projects) && modalEventsContext.projects.length
        ? modalEventsContext.projects
        : (loadData().projects || []);
      const selectedProject = projectSelect.value
        ? projectsList.find((project) => String(project.id) === String(projectSelect.value)) || null
        : null;
      const baseReservation = modalEventsContext?.reservation ?? {};
      const reservationState = {
        ...baseReservation,
        projectId: projectSelect.value || null,
        confirmed: isReservationConfirmed(),
      };
      const { effectiveConfirmed, projectLinked } = resolveReservationProjectState(reservationState, selectedProject);
      updateConfirmedControls(effectiveConfirmed, { disable: projectLinked });
      updateEditReservationSummary?.();
    });
    projectSelect.dataset.listenerAttached = 'true';
  }

  const confirmedToggleBtn = document.getElementById('edit-res-confirmed-btn');
  if (confirmedToggleBtn && !confirmedToggleBtn.dataset.listenerAttached) {
    confirmedToggleBtn.addEventListener('click', () => {
      if (confirmedToggleBtn.disabled) return;
      const nextValue = !isReservationConfirmed();
      updateConfirmedControls(nextValue);
      updateEditReservationSummary?.();
    });
    confirmedToggleBtn.dataset.listenerAttached = 'true';
  }

  const cancelledCheckbox = document.getElementById('edit-res-cancelled');
  if (cancelledCheckbox && !cancelledCheckbox.dataset.listenerAttached) {
    cancelledCheckbox.addEventListener('change', () => {
      // Disable/enable the confirm toggle based on cancelled state
      const btn = document.getElementById('edit-res-confirmed-btn');
      if (btn) {
        updateConfirmedControls(isReservationConfirmed(), { disable: cancelledCheckbox.checked });
      }
      updateEditReservationSummary?.();
    });
    cancelledCheckbox.dataset.listenerAttached = 'true';
  }

  const saveBtn = document.getElementById('save-reservation-changes');
  if (saveBtn && !saveBtn.dataset.listenerAttached) {
    saveBtn.addEventListener('click', () => {
      saveReservationChanges(modalEventsContext).catch((error) => {
        console.error('❌ [reservationsEdit] saveReservationChanges failed', error);
      });
    });
    saveBtn.dataset.listenerAttached = 'true';
  }

  const barcodeInput = document.getElementById('edit-res-equipment-barcode');
  if (barcodeInput && !barcodeInput.dataset.listenerAttached) {
    let barcodeTimer = null;
    const triggerBarcodeAdd = () => {
      if (!barcodeInput.value?.trim()) return;
      clearTimeout(barcodeTimer);
      barcodeTimer = null;
      addEquipmentToEditingReservation?.(barcodeInput);
    };

    barcodeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        triggerBarcodeAdd();
      }
    });
    const scheduleAutoAdd = () => {
      clearTimeout(barcodeTimer);
      if (!barcodeInput.value?.trim()) return;
      const { start, end } = getEditReservationDateRange();
      if (!start || !end) return;
      barcodeTimer = setTimeout(() => {
        triggerBarcodeAdd();
      }, 150);
    };
    barcodeInput.addEventListener('input', scheduleAutoAdd);
    barcodeInput.addEventListener('change', triggerBarcodeAdd);
    barcodeInput.dataset.listenerAttached = 'true';
  }

  setupEditEquipmentDescriptionInput?.();

  const modalElement = document.getElementById('editReservationModal');
  if (modalElement && !modalElement.dataset.cleanupAttached) {
    modalElement.addEventListener('hidden.bs.modal', () => {
      clearEditingState();
      updateEditReservationSummary?.();
      renderEditItems?.([]);
    });
    modalElement.dataset.cleanupAttached = 'true';
  }
}
