import { t } from './language.js';
import { loadData } from './storage.js';
import { showToast, normalizeNumbers } from './utils.js';
import { resolveReservationProjectState } from './reservationsShared.js';
import { setEditingTechnicians, resetEditingTechnicians, getEditingTechnicians } from './reservationsTechnicians.js';
import { normalizeBarcodeValue, getEquipmentAvailabilityStatus } from './reservationsEquipment.js';
import {
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
} from './reservationsSummary.js';
import { ensureCompanyShareEnabled, getEquipmentUnavailableMessage } from './reservations/createForm.js';
import { setupEditEquipmentDescriptionInput } from './reservations/formUtils.js';
import {
  getReservationsState,
  updateReservationApi,
  buildReservationPayload,
  refreshReservationsFromApi,
  isApiError,
} from './reservationsService.js';

let editingIndex = null;
let editingItems = [];
let editingPayments = [];
let modalInstance = null;
let modalEventsContext = {};
let isSyncingShareTaxEdit = false;

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

function getEditPaymentProgressType(select, fallback = 'percent') {
  const value = select?.value;
  if (value === 'amount' || value === 'percent') {
    return value;
  }
  return fallback;
}

function parseEditPaymentProgressValue(input) {
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
  if (!taxCheckbox) return;

  const isLinked = Boolean(projectSelect?.value);
  if (isLinked) {
    taxCheckbox.checked = false;
    taxCheckbox.disabled = true;
    taxCheckbox.classList.add('disabled');
    if (shareCheckbox && shareCheckbox.checked) {
      shareCheckbox.checked = false;
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('disabled');
    }
  } else {
    const wasDisabled = taxCheckbox.disabled;
    taxCheckbox.disabled = false;
    taxCheckbox.classList.remove('disabled');
    if (wasDisabled) {
      taxCheckbox.checked = false;
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('disabled');
    }
  }

  syncEditTaxAndShare('tax');
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

export function editReservation(index, {
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

  const rawPayments = Array.isArray(reservation.paymentHistory)
    ? reservation.paymentHistory
    : Array.isArray(reservation.payment_history)
      ? reservation.payment_history
      : [];
  const normalizedPayments = rawPayments
    .map((entry) => normalizePaymentHistoryEntry(entry))
    .filter(Boolean);

  setEditingState(index, normalizedItems, normalizedPayments);

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
  if (discountInput) discountInput.value = normalizeNumbers(reservation.discount ?? 0);

  const discountTypeSelect = document.getElementById('edit-res-discount-type');
  if (discountTypeSelect) discountTypeSelect.value = reservation.discountType || 'percent';

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
  }

  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  let resolvedProgressType = reservation.paymentProgressType;
  if (!resolvedProgressType) {
    if (Number.isFinite(Number(reservation.paidAmount)) && reservation.paidAmount > 0) {
      resolvedProgressType = 'amount';
    } else if (Number.isFinite(Number(reservation.paidPercent)) && reservation.paidPercent > 0) {
      resolvedProgressType = 'percent';
    } else {
      resolvedProgressType = 'percent';
    }
  }
  if (paymentProgressTypeSelect) {
    paymentProgressTypeSelect.value = resolvedProgressType;
  }
  let resolvedProgressValue = reservation.paymentProgressValue;
  if (resolvedProgressType === 'amount') {
    if (resolvedProgressValue == null || resolvedProgressValue === '') {
      resolvedProgressValue = reservation.paidAmount ?? null;
    }
  } else {
    if (resolvedProgressValue == null || resolvedProgressValue === '') {
      resolvedProgressValue = reservation.paidPercent ?? null;
    }
  }
  setEditPaymentProgressValue(paymentProgressValueInput, resolvedProgressValue);

  setEditingTechnicians((reservation.technicians || []).map((id) => String(id)));

  renderEditItems?.(normalizedItems);
  updateEditProjectTaxState();
  updateEditReservationSummary?.();

  const modalElement = document.getElementById('editReservationModal');
  modalInstance = ensureModalInstance(modalElement, ensureModal);
  modalInstance?.show?.();
}

export async function saveReservationChanges({
  combineDateTime,
  hasEquipmentConflict,
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
  const discount = parseFloat(discountRaw) || 0;
  const discountType = document.getElementById('edit-res-discount-type')?.value || 'percent';
  const confirmed = isReservationConfirmed();
  const paymentSelect = document.getElementById('edit-res-paid');
  const paidStatus = paymentSelect?.value || 'unpaid';
  const paymentProgressTypeSelect = document.getElementById('edit-res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  const paymentProgressType = getEditPaymentProgressType(paymentProgressTypeSelect);
  const paymentProgressValue = parseEditPaymentProgressValue(paymentProgressValueInput);
  const projectIdValue = document.getElementById('edit-res-project')?.value || '';
  const technicianIds = getEditingTechnicians();
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

  if (!Array.isArray(editingItems) || (editingItems.length === 0 && technicianIds.length === 0)) {
    showToast(t('reservations.toast.updateNoItems', '⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز'));
    return;
  }

  const hasEquipmentConflictFn = typeof hasEquipmentConflict === 'function'
    ? hasEquipmentConflict
    : () => false;
  const ignoreReservationKey = reservation.id ?? reservation.reservationId;

  for (const item of editingItems) {
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

  for (const item of editingItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflictFn(code, start, end, ignoreReservationKey)) {
      showToast(t('reservations.toast.updateEquipmentConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات'));
      return;
    }
  }

  const hasTechnicianConflictFn = typeof hasTechnicianConflict === 'function'
    ? hasTechnicianConflict
    : () => false;

  for (const technicianId of technicianIds) {
    if (hasTechnicianConflictFn(technicianId, start, end, ignoreReservationKey)) {
      showToast(t('reservations.toast.updateCrewConflict', '⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم'));
      return;
    }
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

  const totalAmount = calculateReservationTotal(
    editingItems,
    discount,
    discountType,
    applyTax,
    technicianIds,
    {
      start,
      end,
      companySharePercent: companyShareEnabled ? companySharePercent : 0
    }
  );

  let paymentHistory = getEditingPayments();

  if (Number.isFinite(paymentProgressValue) && paymentProgressValue > 0) {
    const pendingEntry = normalizePaymentHistoryEntry({
      type: paymentProgressType,
      value: paymentProgressValue,
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
  if (paymentSelect) {
    paymentSelect.value = effectivePaidStatus;
  }

  let statusForPayload = reservation.status ?? 'pending';
  if (helperProjectLinked) {
    statusForPayload = selectedProject?.status ?? projectStatus ?? statusForPayload;
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
    technicians: technicianIds,
    companySharePercent: companyShareEnabled ? companySharePercent : null,
    companyShareEnabled,
    paidAmount: paymentProgress.paidAmount,
    paidPercentage: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    paymentHistory,
  });

  try {
    const updatedReservation = await updateReservationApi(reservation.id || reservation.reservationId, payload);
    await refreshReservationsFromApi();
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
    paymentProgressTypeSelect.addEventListener('change', () => updateEditReservationSummary?.());
    paymentProgressTypeSelect.dataset.listenerAttached = 'true';
  }

  const paymentProgressValueInput = document.getElementById('edit-res-payment-progress-value');
  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', () => {
      paymentProgressValueInput.value = normalizeNumbers(paymentProgressValueInput.value);
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  const addPaymentButton = document.getElementById('edit-res-payment-add');
  if (addPaymentButton && !addPaymentButton.dataset.listenerAttached) {
    addPaymentButton.addEventListener('click', () => {
      const typeSelect = document.getElementById('edit-res-payment-progress-type');
      const valueInput = document.getElementById('edit-res-payment-progress-value');
      const type = getEditPaymentProgressType(typeSelect);
      const value = parseEditPaymentProgressValue(valueInput);
      if (!Number.isFinite(value) || value <= 0) {
        showToast(t('reservations.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
        return;
      }

      const entry = normalizePaymentHistoryEntry({
        type,
        value,
        recordedAt: new Date().toISOString(),
      });

      if (!entry) {
        showToast(t('reservations.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
        return;
      }

      addEditingPayment(entry);
      setEditingPayments(getEditingPayments());
      updateEditReservationSummary?.();
      if (valueInput) {
        valueInput.value = '';
      }
      showToast(t('reservations.toast.paymentAdded', '✅ تم تسجيل الدفعة'));
    });
    addPaymentButton.dataset.listenerAttached = 'true';
  }

  const paymentHistoryContainer = document.getElementById('edit-res-payment-history');
  if (paymentHistoryContainer && !paymentHistoryContainer.dataset.listenerAttached) {
    paymentHistoryContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      const index = Number(button.dataset.index);
      if (Number.isNaN(index)) return;
      removeEditingPayment(index);
      setEditingPayments(getEditingPayments());
      updateEditReservationSummary?.();
      showToast(t('reservations.toast.paymentRemoved', '🗑️ تم حذف الدفعة'));
    });
    paymentHistoryContainer.dataset.listenerAttached = 'true';
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
