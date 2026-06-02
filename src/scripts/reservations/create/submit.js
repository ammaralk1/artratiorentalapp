import { showToast, generateReservationId, normalizeNumbers } from '../../utils.js';
import { t } from '../../language.js';
import { loadData } from '../../storage.js';
import {
  getSelectedItems,
  setSelectedItems,
  normalizeBarcodeValue,
  hasEquipmentConflict,
  hasTechnicianConflict,
  getTechnicianConflictingReservationCodes,
  hasPackageConflict,
  getEquipmentBookingMode,
} from '../state.js';
import { getSelectedCrewAssignments, resetSelectedTechnicians } from '../../reservationsTechnicians.js';
import {
  calculateReservationTotal,
  calculatePaymentProgress,
  determinePaymentStatus,
} from '../../reservationsSummary.js';
import {
  resolveReservationItemGroupKey,
  parsePriceValue,
  sanitizePriceValue,
} from '../../reservationsShared.js';
import { getEquipmentAvailabilityStatus } from '../../reservationsEquipment.js';
import { syncEquipmentStatuses } from '../../equipment.js';
import { syncTechniciansStatuses } from '../../technicians.js';
import { apiRequest } from '../../apiClient.js';
import {
  createReservationApi,
  buildReservationPayload,
  isApiError,
} from '../../reservationsService.js';
import { clearEquipmentSelection } from '../equipmentSelection.js';
import { state } from './state.js';
import { reservationDebugLog, crewDebugLog } from './debug.js';
import { clearCreateReservationDraft } from './draft.js';
import {
  getCustomerElements,
  getProjectElements,
  resolveCustomerByLabel,
  resolveProjectByLabel,
  findProjectById,
  isProjectConfirmed,
  updatePaymentStatusAppearance,
  getCompanySharePercent,
  ensureCompanyShareEnabled,
  enableProjectSelection,
  ensureCustomerChoices,
  ensureProjectChoices,
  updateCreateProjectTaxState,
  setDateTimeInputs,
} from './customer-project.js';
import {
  populateEquipmentDescriptionLists,
  getEquipmentUnavailableMessage,
  buildEquipmentConflictToastMessage,
  getCreateReservationDateRange,
  getPaymentProgressType,
  parsePaymentProgressValue,
  setPaymentProgressInputValue,
  addDraftEquipmentByBarcode,
} from './equipment.js';
import {
  renderReservationItems,
  renderDraftReservationSummary,
  buildPackageIdentityKeyFromItem,
  buildPackageIdentityKeyFromGroup,
  decreaseReservationGroup,
  increaseReservationGroup,
  removeReservationGroup,
  updateDraftReservationGroupPrice,
  updateDraftReservationGroupCost,
} from './packages-items.js';
import { normalizePackageId } from '../../reservationsPackages.js';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function recoverReservationAfterAbort({ reservationCode } = {}) {
  if (!reservationCode) return null;
  try {
    const maxAttempts = 4;
    let delayMs = 600;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      await sleep(delayMs);
      let res = null;
      try {
        res = await apiRequest(`/reservations/?search=${encodeURIComponent(String(reservationCode))}&limit=5`);
      } catch (error) {
        reservationDebugLog('recover:attempt_failed', { attempt, message: error?.message });
      }
      const items = Array.isArray(res?.data) ? res.data : [];
      if (items.length) {
        const exact = items.find((item) => String(item?.reservation_code || item?.reservationCode) === String(reservationCode));
        return exact || items[0] || null;
      }
      delayMs = Math.min(4000, Math.round(delayMs * 1.8));
    }
    return null;
  } catch (_) {
    return null;
  }
}

function finalizeReservationCreate(createdReservation) {
  syncEquipmentStatuses();
  populateEquipmentDescriptionLists();
  syncTechniciansStatuses();
  resetForm();
  showToast(t('reservations.toast.created', '✅ تم إنشاء الحجز'));
  // بعد النجاح: الانتقال تلقائياً إلى تبويب "حجوزاتي"
  try {
    const myTabBtn = document.getElementById('sub-tab-trigger-my-reservations-tab');
    if (myTabBtn && typeof myTabBtn.click === 'function') {
      // انقر زر التبويب لضمان تفعيل جميع مستمعي الأحداث وتحديث التفضيلات
      setTimeout(() => myTabBtn.click(), 0);
    }
  } catch (_) { /* تجاهل أي أخطاء غير متوقعة */ }
  if (typeof state.afterSubmitCallback === 'function') {
    state.afterSubmitCallback({ type: 'created', reservation: createdReservation });
  }
  handleLinkedProjectReturn(createdReservation);
}

export async function handleReservationSubmit() {
  const debugStart = Date.now();
  reservationDebugLog('submit:start', { ts: new Date().toISOString() });
  const { input: customerInput, hidden: customerHidden } = getCustomerElements();
  const { input: projectInput, hidden: projectHidden } = getProjectElements();
  const { customers } = loadData();

  let customerValue = customerHidden?.value ? String(customerHidden.value) : '';
  if (!customerValue && customerInput?.value) {
    const resolvedCustomer = resolveCustomerByLabel(customerInput.value, { allowPartial: true });
    if (resolvedCustomer) {
      customerValue = String(resolvedCustomer.id);
      if (customerHidden) customerHidden.value = customerValue;
      customerInput.value = resolvedCustomer.label;
      customerInput.dataset.selectedId = customerValue;
    }
  }

  const customer = customers.find((c) => String(c.id) === customerValue);

  if (!customer) {
    reservationDebugLog('validation:customer_not_found', { customerValue });
    showToast(t('reservations.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    return;
  }

  const customerId = customer.id;

  let projectIdValue = projectHidden?.value ? String(projectHidden.value) : '';
  if (!projectIdValue && projectInput?.value) {
    const resolvedProject = resolveProjectByLabel(projectInput.value, { allowPartial: true });
    if (resolvedProject) {
      projectIdValue = String(resolvedProject.id);
      if (projectHidden) projectHidden.value = projectIdValue;
      projectInput.value = resolvedProject.label;
      projectInput.dataset.selectedId = projectIdValue;
    }
  }
  const startDate = document.getElementById('res-start').value;
  const endDate = document.getElementById('res-end').value;
  const startTime = document.getElementById('res-start-time')?.value || '00:00';
  const endTime = document.getElementById('res-end-time')?.value || '00:00';

  if (!startDate || !endDate) {
    reservationDebugLog('validation:missing_dates', { startDate, endDate });
    showToast(t('reservations.toast.requireDates', '⚠️ يرجى تحديد تاريخ البداية والنهاية'));
    return;
  }

  const start = `${startDate}T${startTime}`;
  const end = `${endDate}T${endTime}`;

  const startDateObj = new Date(start);
  const endDateObj = new Date(end);
  if (
    Number.isNaN(startDateObj.getTime()) ||
    Number.isNaN(endDateObj.getTime()) ||
    startDateObj >= endDateObj
  ) {
    reservationDebugLog('validation:invalid_date_range', { start, end });
    showToast(t('reservations.toast.invalidDateRange', '⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية'));
    return;
  }

  const crewAssignments = getSelectedCrewAssignments();
  const unassignedCrewAssignments = crewAssignments.filter((assignment) => !assignment?.technicianId);
  const technicianIds = crewAssignments
    .map((assignment) => assignment.technicianId)
    .filter(Boolean);
  const draftItems = getSelectedItems();
  if (draftItems.length === 0 && crewAssignments.length === 0) {
    reservationDebugLog('validation:no_items_or_crew', { items: draftItems.length, crew: crewAssignments.length });
    showToast(t('reservations.toast.noItems', '⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل'));
    return;
  }

  if (unassignedCrewAssignments.length > 0) {
    const labels = unassignedCrewAssignments
      .slice(0, 3)
      .map((assignment) => normalizeNumbers(
        assignment?.positionLabel
          || assignment?.position_label
          || assignment?.position_name
          || assignment?.role
          || assignment?.position
          || t('reservations.crew.positionFallback', 'منصب بدون اسم')
      ))
      .join(t('reservations.list.crew.separator', '، '));
    const suffix = unassignedCrewAssignments.length > 3 ? '…' : '';
    showToast(
      t('reservations.toast.unassignedCrew', '⚠️ يجب تعيين عضو طاقم لكل منصب قبل حفظ الحجز')
      + (labels ? `: ${labels}${suffix}` : ''),
      'warning',
      5000
    );
    return;
  }

  const notes = document.getElementById('res-notes')?.value || '';
  const discount = parseFloat(normalizeNumbers(document.getElementById('res-discount')?.value)) || 0;
  const discountType = document.getElementById('res-discount-type')?.value || 'percent';
  const paymentSelect = document.getElementById('res-payment-status');
  const paidStatus = paymentSelect?.value || 'unpaid';
  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  const paymentProgressType = getPaymentProgressType(paymentProgressTypeSelect);
  const paymentProgressValue = parsePaymentProgressValue(paymentProgressValueInput);

  const selectedProject = projectIdValue ? findProjectById(projectIdValue) : null;
  const projectConfirmed = isProjectConfirmed(selectedProject);
  if (projectIdValue && !selectedProject) {
    reservationDebugLog('validation:project_not_found', { projectIdValue });
    showToast(t('reservations.toast.projectNotFound', '⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة.'));
    return;
  }

  for (const item of draftItems) {
    const status = getEquipmentAvailabilityStatus(item.barcode);
    if (status === 'maintenance' || status === 'retired') {
      reservationDebugLog('validation:equipment_unavailable', { barcode: item.barcode, status });
      showToast(getEquipmentUnavailableMessage(status));
      return;
    }
  }

  // Collect all conflicting equipment names (and barcodes) to present a clear toast
  const conflictingEquipment = [];
  for (const item of draftItems) {
    const code = normalizeBarcodeValue(item.barcode);
    if (hasEquipmentConflict(code, start, end)) {
      const label = item?.desc || item?.name || item?.barcode || t('reservations.create.packages.unnamedItem', 'معدة بدون اسم');
      conflictingEquipment.push({
        label: normalizeNumbers(String(label)),
        barcode: code,
      });
    }
  }
  if (conflictingEquipment.length) {
    reservationDebugLog('validation:equipment_conflict', { count: conflictingEquipment.length });
    const prefix = t('reservations.toast.cannotCreateEquipmentConflict', '⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية');
    // Try to fetch reservation codes causing conflicts (best-effort)
    let annotatedList = null;
    try {
      const uniqueBarcodes = Array.from(new Set(conflictingEquipment.map((e) => e.barcode).filter(Boolean)));
      const codeMap = new Map();
      await Promise.all(uniqueBarcodes.map(async (barcode) => {
        const params = new URLSearchParams({ type: 'equipment', id: barcode, start, end });
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
    showToast(`${prefix}: ${list}`, 'warning', 6000);
    return;
  }

  // Validate package conflicts at submit time and include blocking reservation codes
  const packageConflicts = [];
  for (const item of draftItems) {
    if (item?.type !== 'package') continue;
    const packageId = item.packageId ?? item.package_id ?? null;
    if (!packageId) continue;
    if (hasPackageConflict(packageId, start, end)) {
      const name = item.desc || item.packageName || t('reservations.create.packages.genericName', 'الحزمة');
      let codes = [];
      try {
        const params = new URLSearchParams({ type: 'package', id: String(packageId), start, end });
        const res = await apiRequest(`/reservations/availability.php?${params.toString()}`);
        const conflicts = Array.isArray(res?.conflicts) ? res.conflicts : [];
        codes = Array.from(new Set(conflicts.map((c) => c?.reservation_code || (c?.reservation_id != null ? `#${c.reservation_id}` : null)).filter(Boolean)));
      } catch (_) { /* ignore */ }
      packageConflicts.push({ label: normalizeNumbers(String(name)), codes });
    }
  }
  if (packageConflicts.length) {
    reservationDebugLog('validation:package_conflict', { count: packageConflicts.length });
    const details = packageConflicts
      .map(({ label, codes }) => (codes && codes.length ? `${label} (${codes.join('، ')})` : label))
      .join('، ');
    const msg = t('reservations.toast.packageTimeConflict', `⚠️ الحزمة محجوزة بالفعل في الفترة المختارة`);
    showToast(`${msg}: ${details}`, 'warning', 6000);
    return;
  }

  // Collect crew conflicts and annotate with reservation codes
  const crewConflicts = [];
  for (const assignment of crewAssignments) {
    if (!assignment?.technicianId) continue;
    if (!hasTechnicianConflict(assignment.technicianId, start, end)) continue;
    const label = assignment?.technicianName || assignment?.positionLabel || String(assignment.technicianId);
    let codes = [];
    try {
      codes = getTechnicianConflictingReservationCodes(assignment.technicianId, start, end, null);
    } catch (_) { /* ignore */ }
    crewConflicts.push({ label: normalizeNumbers(String(label)), codes });
  }
  if (crewConflicts.length) {
    reservationDebugLog('validation:crew_conflict', { count: crewConflicts.length });
    const prefix = t('reservations.toast.cannotCreateCrewConflict', '⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة');
    const details = crewConflicts
      .map(({ label, codes }) => (codes && codes.length ? `${label} (${codes.join('، ')})` : label))
      .join('، ');
    showToast(`${prefix}: ${details}`);
    return;
  }

  const taxCheckbox = document.getElementById('res-tax');
  const shareCheckbox = document.getElementById('res-company-share');
  const projectLinked = Boolean(projectIdValue);
  if (projectLinked) {
    if (taxCheckbox) {
      taxCheckbox.checked = false;
      taxCheckbox.disabled = true;
      taxCheckbox.classList.add('disabled');
      taxCheckbox.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (shareCheckbox) {
      shareCheckbox.checked = false;
      shareCheckbox.disabled = true;
      shareCheckbox.classList.add('disabled');
      shareCheckbox.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تعديل المصاريف التشغيلية من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (paymentSelect) {
      paymentSelect.value = 'unpaid';
      paymentSelect.disabled = true;
      updatePaymentStatusAppearance(paymentSelect, 'unpaid');
      paymentSelect.title = t('reservations.toast.linkedProjectDisabled', 'لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.');
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.disabled = true;
      paymentProgressTypeSelect.classList.add('disabled');
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.value = '';
      paymentProgressValueInput.disabled = true;
      paymentProgressValueInput.classList.add('disabled');
    }
  } else {
    if (taxCheckbox) {
      taxCheckbox.disabled = false;
      taxCheckbox.classList.remove('disabled');
      taxCheckbox.title = '';
    }
    if (shareCheckbox) {
      shareCheckbox.disabled = false;
      shareCheckbox.classList.remove('disabled');
      shareCheckbox.title = '';
    }
    if (paymentSelect) {
      paymentSelect.disabled = false;
      paymentSelect.title = '';
    }
    if (paymentProgressTypeSelect) {
      paymentProgressTypeSelect.disabled = false;
      paymentProgressTypeSelect.classList.remove('disabled');
    }
    if (paymentProgressValueInput) {
      paymentProgressValueInput.disabled = false;
      paymentProgressValueInput.classList.remove('disabled');
    }
  }

  const applyTax = projectLinked ? false : (taxCheckbox?.checked || false);

  const shareChecked = Boolean(shareCheckbox?.checked);
  if (!projectLinked && shareChecked !== applyTax) {
    reservationDebugLog('validation:company_share_requires_tax', { shareChecked, applyTax });
    showToast(t('reservations.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل المصاريف التشغيلية بدون تفعيل الضريبة'));
    return;
  }

  let companySharePercent = shareChecked ? getCompanySharePercent() : null;
  if (shareChecked && (!Number.isFinite(companySharePercent) || companySharePercent <= 0)) {
    ensureCompanyShareEnabled();
    companySharePercent = getCompanySharePercent();
  }

  const companyShareEnabled = shareChecked && applyTax && Number.isFinite(companySharePercent) && companySharePercent > 0;

  if (applyTax) {
    ensureCompanyShareEnabled();
  }

  const totalCost = calculateReservationTotal(
    draftItems,
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

  const reservationCode = generateReservationId();

  const paymentProgress = calculatePaymentProgress({
    totalAmount: totalCost,
    progressType: paymentProgressType,
    progressValue: paymentProgressValue,
    history: [],
  });
  if (paymentProgressValueInput) {
    setPaymentProgressInputValue(paymentProgressValueInput, paymentProgress.paymentProgressValue);
  }
  const initialPaymentHistory = [];
  if (paymentProgress.paymentProgressValue != null && paymentProgress.paymentProgressValue > 0) {
    initialPaymentHistory.push({
      type: paymentProgress.paymentProgressType || paymentProgressType,
      value: paymentProgress.paymentProgressValue,
      amount: paymentProgress.paidAmount,
      percentage: paymentProgress.paidPercent,
      recordedAt: new Date().toISOString(),
    });
  }
  const effectivePaidStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: totalCost,
  });
  if (paymentSelect) {
    paymentSelect.value = effectivePaidStatus;
    updatePaymentStatusAppearance(paymentSelect, effectivePaidStatus);
  }

  // Normalize project payment status for linked reservations (so tags follow the project immediately)
  const projectPaidRaw = typeof selectedProject?.paymentStatus === 'string'
    ? selectedProject.paymentStatus.toLowerCase()
    : null;
  const projectPaidStatus = projectPaidRaw && ['paid', 'partial', 'unpaid'].includes(projectPaidRaw)
    ? projectPaidRaw
    : 'unpaid';

  const groupCostOverrides = new Map();
  const packageIndexOverrides = new Map();
  const packageIdentityOverrides = new Map();
  const scopedCostInputs = document.querySelectorAll('.reservation-unit-cost-input[data-group-key]');
  scopedCostInputs.forEach((input) => {
    const parsed = parsePriceValue(input.value);
    const cost = Number.isFinite(parsed) && parsed >= 0 ? sanitizePriceValue(parsed) : null;
    if (cost === null) {
      return;
    }
    const packageIndexAttr = input.dataset.packageIndex;
    if (packageIndexAttr !== undefined && packageIndexAttr !== '') {
      const parsedIndex = Number.parseInt(packageIndexAttr, 10);
      if (Number.isInteger(parsedIndex) && parsedIndex >= 0) {
        packageIndexOverrides.set(parsedIndex, cost);
        const packageEntry = draftItems[parsedIndex];
        if (packageEntry) {
          const identity = buildPackageIdentityKeyFromItem(packageEntry);
          if (identity) {
            packageIdentityOverrides.set(identity, cost);
          }
        }
      }
    }
    const identityAttr = input.dataset.packageIdentity;
    if (identityAttr) {
      const normalizedIdentity = normalizePackageId(identityAttr)
        || normalizeNumbers(String(identityAttr)).trim().toLowerCase();
      if (normalizedIdentity) {
        packageIdentityOverrides.set(normalizedIdentity, cost);
      }
    }
    const key = input.dataset.groupKey;
    if (key) {
      groupCostOverrides.set(key, cost);
    }
  });

  const itemsWithCostOverrides = draftItems.map((item, idx) => {
    let override = packageIndexOverrides.has(idx) ? packageIndexOverrides.get(idx) : undefined;
    if (override === undefined) {
      const identity = buildPackageIdentityKeyFromItem(item);
      if (identity) {
        override = packageIdentityOverrides.get(identity);
      }
    }
    if (override === undefined) {
      const key = resolveReservationItemGroupKey(item);
      if (key) {
        override = groupCostOverrides.get(key);
      }
    }
    if (override === undefined) return item;
    return {
      ...item,
      cost: override,
      unit_cost: override,
      rental_cost: override,
      purchase_price: override,
      internal_cost: override,
      equipment_cost: override,
      package_cost: override,
      packageCost: override,
    };
  });

  const packagesFromItems = (() => {
    const entries = [];
    itemsWithCostOverrides.forEach((item, itemIndex) => {
      if (String(item?.type || '').toLowerCase() !== 'package') {
        return;
      }
      const qty = Number.isFinite(Number(item.qty ?? item.quantity)) ? Number(item.qty ?? item.quantity) : 1;
      const unitPrice = Number.isFinite(Number(item.unit_price ?? item.price)) ? Number(item.unit_price ?? item.price) : 0;
      let unitCost = Number.isFinite(Number(item.unit_cost ?? item.cost)) ? Number(item.unit_cost ?? item.cost) : 0;
      const groupKey = resolveReservationItemGroupKey(item);
      const identityKey = buildPackageIdentityKeyFromItem(item);
      const override = (packageIndexOverrides.has(itemIndex) ? packageIndexOverrides.get(itemIndex) : undefined)
        ?? (identityKey ? packageIdentityOverrides.get(identityKey) : undefined)
        ?? (groupKey !== undefined ? groupCostOverrides.get(groupKey) : undefined);
      if (override !== undefined && Number.isFinite(override)) {
        unitCost = sanitizePriceValue(override);
      }
      const priority = override !== undefined
        ? 2
        : (Number.isFinite(unitCost) && unitCost > 0 ? 1 : 0);

      entries.push({
        __dedupeKey: identityKey ?? `pkg-${itemIndex}`,
        __priority: priority,
        package_code: item.package_code ?? item.packageCode ?? item.barcode ?? item.code ?? null,
        name: item.name ?? item.desc ?? item.package_name ?? null,
        quantity: qty,
        unit_price: unitPrice,
        unit_cost: unitCost,
        package_cost: unitCost,
        packageCost: unitCost,
        cost: unitCost,
        items: Array.isArray(item.packageItems) ? item.packageItems : [],
      });
    });

    const deduped = new Map();
    entries.forEach((entry) => {
      const key = entry.__dedupeKey;
      if (!deduped.has(key) || (entry.__priority ?? 0) >= (deduped.get(key).__priority ?? 0)) {
        deduped.set(key, entry);
      }
    });

    return Array.from(deduped.values()).map((entry) => {
      const { __dedupeKey, __priority, ...rest } = entry;
      return rest;
    });
  })();

  const payload = buildReservationPayload({
    reservationCode,
    customerId: customerId,
    start,
    end,
    status: projectConfirmed ? 'confirmed' : 'pending',
    title: null,
    location: null,
    notes,
    projectId: projectIdValue || null,
    totalAmount: totalCost,
    discount: projectLinked ? 0 : discount,
    discountType: projectLinked ? 'percent' : discountType,
    applyTax,
    paidStatus: projectLinked ? projectPaidStatus : effectivePaidStatus,
    confirmed: projectConfirmed,
    items: itemsWithCostOverrides.map((item) => ({
      ...item,
      equipmentId: item.equipmentId ?? item.id,
    })),
    packages: packagesFromItems,
    crewAssignments,
    companySharePercent: projectLinked || !companyShareEnabled ? null : companySharePercent,
    companyShareEnabled: projectLinked ? false : companyShareEnabled,
    paidAmount: projectLinked ? 0 : paymentProgress.paidAmount,
    paidPercentage: projectLinked ? 0 : paymentProgress.paidPercent,
    paymentProgressType: projectLinked ? null : paymentProgress.paymentProgressType,
    paymentProgressValue: projectLinked ? null : paymentProgress.paymentProgressValue,
    paymentHistory: projectLinked ? [] : initialPaymentHistory,
  });

  try {
    reservationDebugLog('submit:payload', {
      reservationCode,
      customerId,
      projectId: projectIdValue || null,
      start,
      end,
      items: itemsWithCostOverrides.length,
      packages: packagesFromItems.length,
      technicians: crewAssignments.length,
      totalAmount: totalCost
    });
    crewDebugLog('about to submit', { crewAssignments, techniciansPayload: payload?.technicians, payload });
    const createdReservation = await createReservationApi(payload);
    crewDebugLog('server response', {
      reservation: createdReservation?.id ?? createdReservation?.reservationId ?? createdReservation?.reservation_code,
      technicians: createdReservation?.technicians,
      crewAssignments: createdReservation?.crewAssignments,
      techniciansDetails: createdReservation?.techniciansDetails,
    });
    reservationDebugLog('submit:success', {
      reservationId: createdReservation?.id ?? createdReservation?.reservationId ?? createdReservation?.reservation_code,
      durationMs: Date.now() - debugStart
    });
    finalizeReservationCreate(createdReservation);
  } catch (error) {
    console.error('❌ [reservations/createForm] Failed to create reservation', error);
    if (error?.name === 'AbortError') {
      reservationDebugLog('submit:abort', { durationMs: Date.now() - debugStart });
      const recovered = await recoverReservationAfterAbort({ reservationCode });
      if (recovered) {
        reservationDebugLog('submit:recovered', { reservationId: recovered?.id ?? recovered?.reservationId ?? recovered?.reservation_code });
        finalizeReservationCreate(recovered);
        return;
      }
    }
    reservationDebugLog('submit:failed', { name: error?.name, message: error?.message, durationMs: Date.now() - debugStart });
    const message = isApiError(error)
      ? error.message
      : t('reservations.toast.createFailed', 'تعذر إنشاء الحجز، حاول مرة أخرى');
    showToast(message, 'error');
    if (projectLinked) {
      showToast(t('reservations.toast.linkedProjectDisabled', 'لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع.'), 'error');
      enableProjectSelection({ clearValue: false });
    }
  }
}

function handleLinkedProjectReturn(createdReservation) {
  if (!state.linkedProjectReturnContext) return;

  const {
    draftStorageKey,
    returnUrl
  } = state.linkedProjectReturnContext;

  const reservationId = createdReservation?.id ?? createdReservation?.reservationId ?? createdReservation?.reservation_code;

  if (reservationId != null && typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const raw = window.sessionStorage.getItem(draftStorageKey);
      const draft = raw ? JSON.parse(raw) || {} : {};
      const ids = Array.isArray(draft.linkedReservationIds) ? draft.linkedReservationIds : [];
      const idValue = String(reservationId);
      if (!ids.includes(idValue)) {
        ids.push(idValue);
      }
      draft.linkedReservationIds = ids;
      window.sessionStorage.setItem(draftStorageKey, JSON.stringify(draft));
    } catch (error) {
      console.warn('⚠️ [reservations] Unable to persist linked reservation draft state', error);
    }
  }

  state.linkedProjectReturnContext = null;
  if (returnUrl) {
    window.location.href = returnUrl;
  }
}

export function resetForm() {
  const customerHidden = document.getElementById('res-customer');
  const customerInput = document.getElementById('res-customer-input');
  if (customerHidden) customerHidden.value = '';
  if (customerInput) {
    customerInput.value = '';
    customerInput.dataset.selectedId = '';
  }
  ensureCustomerChoices({ selectedValue: '', resetInput: true });
  // Clear date/time using flatpickr-aware helper to ensure both inputs and widgets are reset
  try { setDateTimeInputs('res-start', 'res-start-time', ''); } catch (_) { /* ignore */ }
  try { setDateTimeInputs('res-end', 'res-end-time', ''); } catch (_) { /* ignore */ }
  document.getElementById('res-notes').value = '';
  document.getElementById('res-discount').value = '';
  const projectHidden = document.getElementById('res-project');
  const projectInput = document.getElementById('res-project-input');
  if (projectHidden) projectHidden.value = '';
  if (projectInput) {
    projectInput.value = '';
    projectInput.dataset.selectedId = '';
  }
  enableProjectSelection({ clearValue: false });
  ensureProjectChoices({ selectedValue: '', resetInput: true });
  const descriptionInput = document.getElementById('equipment-description');
  if (descriptionInput) descriptionInput.value = '';
  const paymentSelect = document.getElementById('res-payment-status');
  if (paymentSelect) {
    paymentSelect.value = 'unpaid';
    updatePaymentStatusAppearance(paymentSelect, 'unpaid');
  }
  const paymentProgressTypeSelect = document.getElementById('res-payment-progress-type');
  if (paymentProgressTypeSelect) {
    paymentProgressTypeSelect.value = 'percent';
  }
  const paymentProgressValueInput = document.getElementById('res-payment-progress-value');
  if (paymentProgressValueInput) {
    paymentProgressValueInput.value = '';
  }
  resetSelectedTechnicians();
  setSelectedItems([]);
  clearEquipmentSelection('form-reset');
  renderReservationItems();
  updateCreateProjectTaxState();
  renderDraftReservationSummary();
  clearCreateReservationDraft();
}

export function setupReservationButtons() {
  const container = document.getElementById('reservation-items');
  if (!container || container.dataset.listenerAttached) return;

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const { action, groupKey } = button.dataset;

    if (action === 'decrease-group' && groupKey) {
      decreaseReservationGroup(groupKey);
      return;
    }

    if (action === 'increase-group' && groupKey) {
      increaseReservationGroup(groupKey);
      return;
    }

    if (action === 'remove-group' && groupKey) {
      removeReservationGroup(groupKey);
      return;
    }
  });

  const handlePriceCostChange = (event) => {
    const priceInput = event.target.closest('.reservation-unit-price-input');
    if (priceInput) {
      const groupKey = priceInput.dataset.groupKey;
      if (groupKey) {
        updateDraftReservationGroupPrice(groupKey, priceInput.value);
      }
      return;
    }
    const costInput = event.target.closest('.reservation-unit-cost-input');
    if (costInput) {
      const groupKey = costInput.dataset.groupKey;
      if (groupKey) {
        updateDraftReservationGroupCost(groupKey, costInput.value);
      }
    }
  };

  container.addEventListener('change', handlePriceCostChange);

  container.dataset.listenerAttached = 'true';
}

export function setupBarcodeInput() {
  const input = document.getElementById('equipment-barcode');
  if (!input || input.dataset.listenerAttached) return;

  let autoAddTimer = null;
  const triggerAdd = () => {
    if (getEquipmentBookingMode() !== 'single') {
      return;
    }
    const raw = input.value;
    if (!raw?.trim()) return;
    clearTimeout(autoAddTimer);
    autoAddTimer = null;
    addDraftEquipmentByBarcode(raw, input);
  };

  input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    triggerAdd();
  });

  const scheduleAutoAdd = () => {
    clearTimeout(autoAddTimer);
    const raw = input.value;
    if (!raw?.trim()) return;
    if (getEquipmentBookingMode() !== 'single') {
      return;
    }
    const { start, end } = getCreateReservationDateRange();
    if (!start || !end) return;
    autoAddTimer = setTimeout(() => {
      triggerAdd();
    }, 150);
  };

  input.addEventListener('input', scheduleAutoAdd);
  input.addEventListener('change', triggerAdd);

  input.dataset.listenerAttached = 'true';
}

export function setupFormSubmit() {
  const form = document.getElementById('reservation-form');
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      await handleReservationSubmit();
    });
    form.dataset.listenerAttached = 'true';
  }

  const btn = document.getElementById('create-reservation-btn');
  if (btn && !btn.dataset.listenerAttached) {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      await handleReservationSubmit();
    });
    btn.dataset.listenerAttached = 'true';
  }

  const clearBtn = document.getElementById('clear-reservation-form-btn');
  if (clearBtn && !clearBtn.dataset.listenerAttached) {
    clearBtn.addEventListener('click', (event) => {
      event.preventDefault();
      resetForm();
      try { clearCreateReservationDraft(); } catch (_) { /* ignore */ }
      showToast(t('reservations.toast.formCleared', '🧹 تم مسح الحقول'));
    });
    clearBtn.dataset.listenerAttached = 'true';
  }
}
