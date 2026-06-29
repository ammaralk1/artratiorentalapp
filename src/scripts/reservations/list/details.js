import { t } from '../../language.js';
import { getTechnicianPositionsCache, findPositionByName } from '../../technicianPositions.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { loadData } from '../../storage.js';
import { isReservationCompleted, resolveReservationProjectState, buildReservationDisplayGroups, sanitizePriceValue, parsePriceValue, computePackagePricing } from '../../reservationsShared.js';
import { resolveItemImage } from '../../reservationsEquipment.js';
import { normalizeBarcodeValue } from '../state.js';
import { calculateReservationDays, DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../../reservationsSummary.js';
import { userCanManageDestructiveActions } from '../../auth.js';
import { resolveProjectOverheadSettings } from '../../projects/helpers.js';
import { applyProjectItemOverhead, calculateProjectLineFinancials } from '../../projects/financials.js';

const PENDING_PROJECT_DETAIL_KEY = 'pendingProjectDetailId';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizedDisplay(value) {
  if (value == null) return '';
  const stringValue = String(value).trim();
  if (!stringValue) return '';
  return normalizeNumbers(stringValue);
}

export function buildReservationDetailsHtml(reservation, customer, techniciansList = [], index, project = null) {
  const { projectLinked, effectiveConfirmed: confirmed } = resolveReservationProjectState(reservation, project);
  const paid = reservation.paid === true || reservation.paid === 'paid';
  const completed = isReservationCompleted(reservation);
  const items = reservation.items || [];
  let { groups: displayGroups, packageGroups, groupedItems } = buildReservationDisplayGroups(reservation);
  const projectOverhead = (() => {
    if (!projectLinked || !project) {
      return { applyTax: false, companyShareEnabled: false, companySharePercent: 0 };
    }
    const applyTaxRaw = project?.applyTax === true || project?.applyTax === 'true' || project?.apply_tax === true || project?.apply_tax === 'true';
    const { applyTax, enabled, sharePercent } = resolveProjectOverheadSettings(project, { applyTaxRaw });
    return { applyTax, companyShareEnabled: enabled, companySharePercent: sharePercent };
  })();
  const withProjectOverhead = (value) => applyProjectItemOverhead(value, projectOverhead);

  // Deduplicate package groups defensively (in case upstream produced two entries for same package)
  const isPkgGroup = (g) => Boolean(
    (g && typeof g === 'object') && (
      g.type === 'package'
      || (Array.isArray(g.packageItems) && g.packageItems.length)
      || (Array.isArray(g.items) && g.items.some((it) => it && it.type === 'package'))
    )
  );
  const pkgKey = (g) => {
    const raw = (g?.package_code
      ?? g?.packageDisplayCode
      ?? g?.barcode
      ?? g?.description
      ?? (Array.isArray(g?.items) && g.items[0]?.barcode)
      ?? '').toString().trim().toLowerCase();
    return normalizeNumbers(raw);
  };
  const pickBetter = (a, b) => {
    const getUnit = (g) => {
      const rep = Array.isArray(g?.items) ? g.items[0] : null;
      const candidates = [rep?.price, rep?.unit_price, rep?.unitPrice, g?.unitPrice, g?.totalPrice];
      for (const c of candidates) {
        const n = parsePriceValue(c);
        if (Number.isFinite(n) && n > 0) return n;
      }
      return 0;
    };
    // Prefer the one with smaller stable unit price (avoid inflated duplicates)
    const au = getUnit(a);
    const bu = getUnit(b);
    return (au && bu) ? (au <= bu ? a : b) : (au ? a : b);
  };
  const deduped = [];
  const seen = new Map();
  displayGroups.forEach((g) => {
    if (!isPkgGroup(g)) {
      deduped.push(g);
      return;
    }
    const key = pkgKey(g);
    if (!key) {
      // Unknown key: keep first occurrence only
      if (!seen.has('__unknown__')) {
        seen.set('__unknown__', deduped.length);
        deduped.push(g);
      } else {
        const idx = seen.get('__unknown__');
        deduped[idx] = pickBetter(deduped[idx], g);
      }
      return;
    }
    if (!seen.has(key)) {
      seen.set(key, deduped.length);
      deduped.push(g);
    } else {
      const idx = seen.get(key);
      deduped[idx] = pickBetter(deduped[idx], g);
    }
  });
  displayGroups = deduped;

  const { technicians: storedTechnicians = [] } = loadData();
  const technicianSource = []
    .concat(Array.isArray(techniciansList) ? techniciansList : [])
    .concat(Array.isArray(storedTechnicians) ? storedTechnicians : []);

  const techniciansMap = new Map();
  technicianSource.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });

  const crewAssignmentsRaw = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
    ? reservation.crewAssignments
    : (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length
        ? reservation.techniciansDetails
        : (reservation.technicians || []).map((id) => ({ technicianId: id })));

  const crewAssignments = crewAssignmentsRaw.map((assignment, index) => {
    const technicianRecord = assignment?.technicianId != null
      ? techniciansMap.get(String(assignment.technicianId))
      : null;

    let positionLabel = assignment.positionLabel
      ?? assignment.position_name
      ?? assignment.position_label
      ?? assignment.role
      ?? assignment.position
      ?? '';
    if (!positionLabel || positionLabel.trim() === '') {
      positionLabel = assignment.positionLabelAr
        ?? assignment.position_label_ar
        ?? assignment.positionLabelEn
        ?? assignment.position_label_en
        ?? assignment.position_name_ar
        ?? assignment.position_name_en
        ?? '';
    }
    const positionLabelAlt = assignment.positionLabelAlt
      ?? assignment.position_label_alt
      ?? assignment.positionLabelEn
      ?? assignment.position_label_en
      ?? assignment.positionLabelAr
      ?? assignment.position_label_ar
      ?? '';
    // Ensure we resolve a readable label from positions cache if not present on assignment
    let finalPositionLabel = positionLabel;
    let finalPositionLabelAlt = positionLabelAlt;
    if (!finalPositionLabel || finalPositionLabel.trim() === '') {
      try {
        const positions = getTechnicianPositionsCache ? getTechnicianPositionsCache() : [];
        let resolved = null;
        if (assignment.positionId != null) {
          resolved = positions.find((p) => String(p.id) === String(assignment.positionId)) || null;
        }
        if (!resolved) {
          const key = assignment.positionKey
            ?? assignment.position_key
            ?? assignment.positionName
            ?? assignment.position_name
            ?? assignment.position
            ?? '';
          if (key) {
            resolved = (typeof findPositionByName === 'function') ? findPositionByName(key) : null;
            if (!resolved && positions.length) {
              const lower = String(key).trim().toLowerCase();
              resolved = positions.find((p) => [p.name, p.labelAr, p.labelEn]
                .filter(Boolean)
                .map((v) => String(v).toLowerCase())
                .includes(lower)) || null;
            }
          }
        }
        if (resolved) {
          finalPositionLabel = resolved.labelAr || resolved.labelEn || resolved.name || '';
          if (!finalPositionLabelAlt || String(finalPositionLabelAlt).trim() === '') {
            if (resolved.labelAr && resolved.labelEn) {
              finalPositionLabelAlt = finalPositionLabel === resolved.labelAr ? resolved.labelEn : resolved.labelAr;
            } else {
              finalPositionLabelAlt = resolved.labelAr || resolved.labelEn || '';
            }
          }
        }
      } catch (_e) {
        /* optional cache fallback only */
      }
    }
    const positionCost = sanitizePriceValue(parsePriceValue(
      assignment.positionCost
        ?? assignment.position_cost
        ?? assignment.cost
        ?? assignment.daily_wage
        ?? assignment.dailyWage
        ?? technicianRecord?.dailyWage
        ?? technicianRecord?.wage
        ?? 0
    ));
    const positionClientPrice = sanitizePriceValue(parsePriceValue(
      assignment.positionClientPrice
        ?? assignment.position_client_price
        ?? assignment.client_price
        ?? assignment.clientPrice
        ?? assignment.daily_total
        ?? assignment.dailyTotal
        ?? assignment.total
        ?? technicianRecord?.dailyTotal
        ?? technicianRecord?.total
        ?? technicianRecord?.total_wage
        ?? 0
    ));

    return {
      assignmentId: assignment.assignmentId ?? assignment.assignment_id ?? `crew-${index}`,
      positionId: assignment.positionId ?? assignment.position_id ?? null,
      positionKey: assignment.positionKey
        ?? assignment.position_key
        ?? assignment.positionName
        ?? assignment.position_name
        ?? assignment.position
        ?? null,
      positionLabel: finalPositionLabel,
      positionLabelAlt: finalPositionLabelAlt,
      positionLabelAr: assignment.positionLabelAr ?? assignment.position_label_ar ?? null,
      positionLabelEn: assignment.positionLabelEn ?? assignment.position_label_en ?? null,
      positionCost,
      positionClientPrice,
      technicianId: assignment.technicianId != null
        ? String(assignment.technicianId)
        : (technicianRecord?.id != null ? String(technicianRecord.id) : null),
      technicianName: assignment.technicianName
        ?? assignment.technician_name
        ?? technicianRecord?.name
        ?? null,
      technicianRole: assignment.technicianRole
        ?? technicianRecord?.role
        ?? null,
      technicianPhone: assignment.technicianPhone
        ?? technicianRecord?.phone
        ?? null,
      notes: assignment.notes ?? null,
    };
  });
  const isProjectLinked = Boolean(reservation?.projectId ?? reservation?.project_id);
  const canDelete = !isProjectLinked && userCanManageDestructiveActions();

  const rentalDays = calculateReservationDays(reservation.start, reservation.end);

  const resolveTechnicianCostRate = (technician = {}) => {
    const candidates = [
      technician.dailyWage,
      technician.daily_rate,
      technician.dailyRate,
      technician.wage,
      technician.rate
    ];

    for (const value of candidates) {
      if (value == null) continue;
      const parsed = parseFloat(normalizeNumbers(String(value)));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return 0;
  };

  const resolveTechnicianTotalRate = (technician = {}) => {
    const candidates = [
      technician.dailyTotal,
      technician.daily_total,
      technician.totalRate,
      technician.total,
      technician.total_wage
    ];

    for (const value of candidates) {
      if (value == null) continue;
      const parsed = parseFloat(normalizeNumbers(String(value)));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }

    return resolveTechnicianCostRate(technician);
  };

  const discountValueRaw = reservation.discount
    ?? reservation.discountValue
    ?? reservation.discount_value
    ?? reservation.discountAmount
    ?? 0;
  const discountValueParsed = parsePriceValue(discountValueRaw);
  const discountValue = Number.isFinite(discountValueParsed) ? discountValueParsed : 0;
  const discountTypeRaw = reservation.discountType
    ?? reservation.discount_type
    ?? reservation.discountMode
    ?? 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';

  // Use the reservation's tax flag consistently (even if linked to a project)
  const applyTaxFlag = Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);

  const storedCostCandidate = parsePriceValue(reservation.cost ?? reservation.total ?? reservation.finalTotal);
  const hasStoredCost = Number.isFinite(storedCostCandidate);
  const storedCost = hasStoredCost ? sanitizePriceValue(storedCostCandidate) : 0;

  const rawCompanySharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share;
  const normalizedCompanyShare = rawCompanySharePercent != null
    ? parsePriceValue(rawCompanySharePercent)
    : Number.NaN;
  const companyShareEnabledFlag = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied;
  const hasCompanyShare = (companyShareEnabledFlag === true)
    || (Number.isFinite(normalizedCompanyShare) && normalizedCompanyShare > 0);
  const companySharePercentInput = hasCompanyShare && Number.isFinite(normalizedCompanyShare)
    ? normalizedCompanyShare
    : 0;

  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds: (reservation.technicians || []),
    crewAssignments,
    discount: discountValue,
    discountType,
    applyTax: applyTaxFlag,
    start: reservation.start,
    end: reservation.end,
    companySharePercent: companySharePercentInput,
    groupingSource: reservation,
  });

  const equipmentTotal = sanitizePriceValue(breakdown.equipmentTotal);
  const equipmentCostTotal = sanitizePriceValue(breakdown.equipmentCostTotal);
  const crewTotal = sanitizePriceValue(breakdown.crewTotal);
  const crewCostTotal = sanitizePriceValue(breakdown.crewCostTotal);
  const linkedProjectFinancials = projectLinked && project
    ? calculateProjectLineFinancials({
      equipmentRevenue: equipmentTotal,
      crewRevenue: crewTotal,
      equipmentCost: equipmentCostTotal,
      crewCost: crewCostTotal,
      discountValue,
      discountType,
      applyTax: projectOverhead.applyTax,
      companyShareEnabled: projectOverhead.companyShareEnabled,
      companySharePercent: projectOverhead.companySharePercent,
    })
    : null;
  const discountAmount = sanitizePriceValue(linkedProjectFinancials?.discountAmount ?? breakdown.discountAmount);
  const subtotalAfterDiscount = sanitizePriceValue(linkedProjectFinancials?.taxableAmount ?? breakdown.subtotalAfterDiscount);
  const companySharePercent = Number.isFinite(linkedProjectFinancials?.overheadPercent)
    ? linkedProjectFinancials.overheadPercent
    : (Number.isFinite(breakdown.companySharePercent) ? breakdown.companySharePercent : 0);
  let companyShareAmount = sanitizePriceValue(linkedProjectFinancials?.companyShareAmount ?? breakdown.companyShareAmount);
  companyShareAmount = companySharePercent > 0
    ? sanitizePriceValue(Math.max(0, companyShareAmount))
    : 0;
  const taxAmount = sanitizePriceValue(linkedProjectFinancials?.taxAmount ?? breakdown.taxAmount);
  const finalTotalComputed = sanitizePriceValue(linkedProjectFinancials?.totalWithTax ?? breakdown.finalTotal);
  // Always show the computed final total to reflect live breakdown
  const finalTotal = finalTotalComputed;
  const netProfitValue = sanitizePriceValue(linkedProjectFinancials?.marginBeforeTax ?? breakdown.netProfit);

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const techniciansCountDisplay = normalizeNumbers(String(crewAssignments.length));
  const equipmentTotalDisplay = normalizeNumbers(withProjectOverhead(equipmentTotal).toFixed(2));
  const equipmentCostDisplay = normalizeNumbers(equipmentCostTotal.toFixed(2));
  const discountAmountDisplay = normalizeNumbers(discountAmount.toFixed(2));
  const subtotalAfterDiscountDisplay = normalizeNumbers(subtotalAfterDiscount.toFixed(2));
  const taxAmountDisplay = normalizeNumbers(taxAmount.toFixed(2));
  const finalTotalDisplay = normalizeNumbers((Number.isFinite(finalTotal) ? finalTotal : 0).toFixed(2));
  const rentalDaysDisplay = normalizeNumbers(String(rentalDays));

  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const discountLabel = t('reservations.details.labels.discount', 'الخصم');
  const taxLabel = t('reservations.details.labels.tax', 'الضريبة (15%)');
  const crewTotalLabel = t('reservations.details.labels.crewTotal', 'إجمالي الفريق');
  const subtotalAfterDiscountLabel = t('reservations.details.labels.subtotalAfterDiscount', 'الإجمالي');
  const durationLabel = t('reservations.details.labels.duration', 'عدد الأيام');
  const companyShareLabel = t('reservations.details.labels.companyShare', '🏦 المصاريف التشغيلية');
  const netProfitLabel = t('reservations.details.labels.netProfit', '💵 صافي الربح');
  const equipmentCostLabel = t('reservations.details.labels.equipmentCost', 'تكلفة المعدات');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');
  const tableHeaders = {
    item: t('reservations.equipment.table.item', 'المعدة'),
    quantity: t('reservations.equipment.table.quantity', 'الكمية'),
    unitPrice: t('reservations.equipment.table.unitPrice', 'سعر الوحدة'),
    unitCost: t('reservations.equipment.table.unitCost', 'تكلفة الوحدة'),
    total: t('reservations.equipment.table.total', 'الإجمالي'),
    actions: t('reservations.equipment.table.actions', 'الإجراءات')
  };
  const noItemsText = t('reservations.details.noItems', '📦 لا توجد معدات ضمن هذا الحجز حالياً.');
  const noCrewText = t('reservations.details.noCrew', '😎 لا يوجد فريق مرتبط بهذا الحجز.');
  const roleFallback = t('reservations.details.technicians.roleUnknown', 'غير محدد');
  const phoneFallback = t('reservations.details.technicians.phoneUnknown', 'غير متوفر');
  const wageTemplate = t('reservations.details.technicians.wage', '{amount} {currency} / اليوم');
  const statusConfirmedText = t('reservations.list.status.confirmed', '✅ مؤكد');
  const statusPendingText = t('reservations.list.status.pending', '⏳ غير مؤكد');
  const paymentPaidText = t('reservations.list.payment.paid', '💳 مدفوع');
  const paymentUnpaidText = t('reservations.list.payment.unpaid', '💳 غير مدفوع');
  const paymentPartialText = t('reservations.list.payment.partial', '💳 مدفوع جزئياً');
  const completedText = t('reservations.list.status.completed', '📁 مغلق');
  const reservationIdLabel = t('reservations.details.labels.id', '🆔 رقم الحجز');
  const bookingSectionTitle = t('reservations.details.section.bookingInfo', 'بيانات الحجز');
  const paymentSummaryTitle = t('reservations.details.section.paymentSummary', 'ملخص الدفع');
  const finalTotalLabel = t('reservations.details.labels.finalTotal', 'المجموع النهائي');
  const crewSectionTitle = t('reservations.details.section.crew', '😎 الفريق الفني');
  const crewCountTemplate = t('reservations.details.crew.count', '{count} عضو');
  const itemsSectionTitle = t('reservations.details.section.items', '📦 المعدات المرتبطة');
  const itemsCountTemplate = t('reservations.details.items.count', '{count} عنصر');
  const editActionLabel = t('reservations.details.actions.edit', '✏️ تعديل');
  const deleteActionLabel = t('reservations.details.actions.delete', '🗑️ حذف');
  const customerLabel = t('reservations.details.labels.customer', 'العميل');
  const contactLabel = t('reservations.details.labels.contact', 'رقم التواصل');
  const projectLabel = t('reservations.details.labels.project', '📁 المشروع المرتبط');
  const projectFallback = t('reservations.details.project.unlinked', 'غير مرتبط بأي مشروع.');
  const projectMissingText = t('reservations.edit.project.missing', '⚠️ المشروع غير متوفر (تم حذفه)');
  const openProjectLabel = t('reservations.details.actions.openProject', '📁 فتح المشروع');
  const projectLinkedReadonlyLabel = t('reservations.details.projectLinkedReadonly', 'مرتبط بمشروع - يتم تعديل الحجز من شاشة المشروع.');
  const startLabel = t('reservations.details.labels.start', 'بداية الحجز');
  const endLabel = t('reservations.details.labels.end', 'نهاية الحجز');
  const notesLabel = t('reservations.details.labels.notes', 'ملاحظات');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountLabel = t('reservations.details.labels.itemsCount', 'عدد المعدات');
  const itemsTotalLabel = t('reservations.details.labels.itemsTotal', 'إجمالي المعدات');
  const itemsCostLabel = equipmentCostLabel;
  const paymentHistoryTitle = t('reservations.paymentHistory.title', 'سجل الدفعات');
  const paymentHistoryEmpty = t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');

  // Derive payment status using history + calculated finalTotal (ignore manual flags)
  const projectHistoryForStatus = (() => {
    if (!projectLinked || !project) return [];
    if (Array.isArray(project?.paymentHistory)) return project.paymentHistory;
    if (Array.isArray(project?.payment_history)) return project.payment_history;
    if (Array.isArray(project?.payments)) return project.payments;
    if (Array.isArray(project?.paymentLogs)) return project.paymentLogs;
    return [];
  })();
  const reservationHistoryForStatus = (() => {
    if (Array.isArray(reservation?.paymentHistory)) return reservation.paymentHistory;
    if (Array.isArray(reservation?.payment_history)) return reservation.payment_history;
    if (Array.isArray(reservation?.paymentLogs)) return reservation.paymentLogs;
    return [];
  })();

  const historyForStatus = projectHistoryForStatus.length ? projectHistoryForStatus : reservationHistoryForStatus;
  const basePaidAmount = historyForStatus.length ? 0 : (Number(reservation.paidAmount ?? reservation.paid_amount) || 0);
  const basePaidPercent = historyForStatus.length ? 0 : (Number(reservation.paidPercent ?? reservation.paid_percentage) || 0);
  const progressForStatus = calculatePaymentProgress({
    totalAmount: Number.isFinite(Number(finalTotal)) ? Number(finalTotal) : 0,
    paidAmount: basePaidAmount,
    paidPercent: basePaidPercent,
    history: historyForStatus,
  });
  const paidStatus = determinePaymentStatus({
    manualStatus: null,
    paidAmount: progressForStatus.paidAmount,
    paidPercent: progressForStatus.paidPercent,
    totalAmount: Number.isFinite(Number(finalTotal)) ? Number(finalTotal) : 0,
  });
  const isPartial = paidStatus === 'partial';
  const paymentStatusText = paidStatus === 'paid' ? paymentPaidText : (isPartial ? paymentPartialText : paymentUnpaidText);
  const clampItemQuantity = (value, { fallback = 1 } = {}) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return fallback;
    }

    if (parsed > 1_000) {
      return 1_000;
    }

    return Math.round(parsed);
  };

  function parseQuantityValue(value) {
    if (value == null) return Number.NaN;
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : Number.NaN;
    }
    const cleaned = String(value).replace(/[^0-9.+-]/g, '');
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : Number.NaN;
  }

  const isPackageEntry = (entry = {}) => {
    const type = String(entry.type ?? entry.kind ?? entry.category ?? '').toLowerCase();
    if (['package', 'bundle', 'pack'].includes(type)) return true;
    if (Array.isArray(entry.packageItems) && entry.packageItems.length) return true;
    return false;
  };

  const hasPackageReference = (entry = {}) => {
    return [
      entry.packageId,
      entry.package_id,
      entry.packageCode,
      entry.package_code,
      entry.bundleId,
      entry.bundle_id,
    ].some((candidate) => candidate != null && candidate !== '');
  };

  const isPackageChildEntry = (entry = {}) => {
    if (!entry || typeof entry !== 'object') return false;
    return !isPackageEntry(entry) && hasPackageReference(entry);
  };

  const resolveEntryQuantity = (entry = {}) => {
    const packageEntry = isPackageEntry(entry);

    const orderedCandidates = [
      { value: entry.qty, key: 'qty', limit: 999 },
      { value: entry.quantity, key: 'quantity', limit: 999 },
      { value: entry.units, key: 'units', limit: 999 },
      { value: entry.count, key: 'count', limit: 50 },
      { value: entry.package_quantity, key: 'package_quantity', limit: 999 },
      { value: entry.packageQty, key: 'packageQty', limit: 999 },
      { value: entry.packageCount, key: 'packageCount', limit: 999 },
    ];

    let quantity = NaN;
    for (const candidate of orderedCandidates) {
      if (candidate.value == null || candidate.value === '') continue;

      const rawString = typeof candidate.value === 'string' ? candidate.value.trim() : String(candidate.value ?? '');
      if (candidate.key === 'count' && rawString.length > 6) {
        continue;
      }

      const parsed = parseQuantityValue(candidate.value);
      if (!Number.isFinite(parsed) || parsed <= 0) {
        continue;
      }

      const rounded = Math.round(parsed);
      if (rounded > candidate.limit) {
        continue;
      }

      quantity = Math.max(1, rounded);
      break;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      quantity = packageEntry ? 1 : 1;
    }

    if (packageEntry) {
      return Math.max(1, Math.min(99, quantity));
    }

    return Math.max(1, Math.min(9999, quantity));
  };

  // عدّ العناصر المعروضة فعليًا في الجدول (عدد الصفوف)، لتجنب تضخيم العدد بسبب كميات أو عناصر فرعية للحِزم
  let totalItemsQuantity = Array.isArray(displayGroups) && displayGroups.length
    ? displayGroups.length
    : ((Array.isArray(items) ? items.filter((it) => it && typeof it === 'object' && !isPackageChildEntry(it)).length : 0) || 1);

  totalItemsQuantity = Math.max(1, Math.round(totalItemsQuantity));
  const itemsCountDisplay = normalizeNumbers(String(totalItemsQuantity));
  const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
  const crewCountText = crewCountTemplate.replace('{count}', techniciansCountDisplay);
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;

  const crewTotalDisplay = normalizeNumbers(withProjectOverhead(crewTotal).toFixed(2));
  const crewCostDisplay = normalizeNumbers(crewCostTotal.toFixed(2));
  const companySharePercentDisplay = normalizeNumbers(String(companySharePercent));
  const companyShareAmountDisplay = normalizeNumbers(companyShareAmount.toFixed(2));
  const companyShareValue = `${companySharePercentDisplay}% (${companyShareAmountDisplay} ${currencyLabel})`;
  const netProfitSafe = Number.isFinite(netProfitValue) ? Math.max(0, netProfitValue) : 0;
  const netProfitDisplay = normalizeNumbers(netProfitSafe.toFixed(2));

  const summaryDetails = [
    { icon: '💼', label: itemsTotalLabel, value: `${equipmentTotalDisplay} ${currencyLabel}` }
  ];

  summaryDetails.push({ icon: '💸', label: itemsCostLabel, value: `${equipmentCostDisplay} ${currencyLabel}` });

  summaryDetails.push({ icon: '😎', label: crewTotalLabel, value: `${crewTotalDisplay} ${currencyLabel}` });
  // Show internal crew cost directly under crew total
  const crewCostLabel = t('reservations.details.labels.crewCost', 'تكلفة الفريق');
  summaryDetails.push({ icon: '💵', label: crewCostLabel, value: `${crewCostDisplay} ${currencyLabel}` });

  if (discountAmount > 0) {
    summaryDetails.push({ icon: '💸', label: discountLabel, value: `${discountAmountDisplay} ${currencyLabel}` });
  }

  summaryDetails.push({ icon: '📊', label: subtotalAfterDiscountLabel, value: `${subtotalAfterDiscountDisplay} ${currencyLabel}` });

  if (applyTaxFlag && taxAmount > 0) {
    summaryDetails.push({ icon: '🧾', label: taxLabel, value: `${taxAmountDisplay} ${currencyLabel}` });
  }

  if (companySharePercent > 0) {
    summaryDetails.push({ icon: '🏦', label: companyShareLabel, value: companyShareValue });
  }

  summaryDetails.push({ icon: '💵', label: netProfitLabel, value: `${netProfitDisplay} ${currencyLabel}` });

  summaryDetails.push({ icon: '💰', label: finalTotalLabel, value: `${finalTotalDisplay} ${currencyLabel}` });

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-card">
      <span class="summary-details-label">
        <span class="summary-details-label-icon" aria-hidden="true">${icon}</span>
        <span>${label}</span>
      </span>
      <span class="summary-details-value">${value}</span>
    </div>
  `).join('');

  // Optional finance debug panel (enable with ?debugFinance=1)
  let debugPanelHtml = '';
  try {
    const url = new URL(window.location.href);
    const debugFinance = url.searchParams.get('debugFinance');
    if (debugFinance === '1' || debugFinance === 'true') {
      const classify = (g) => {
        if ((g?.type || '').toLowerCase() === 'package') {
          const pm = String(g?.pricingMode || '').toLowerCase();
          return pm === 'fixed' ? 'fixed' : 'daily';
        }
        return 'daily';
      };
      const inferGroupFixed = (g) => {
        if ((g?.type || '').toLowerCase() === 'package') return false;
        const items = Array.isArray(g?.items) ? g.items : [];
        if (!items.length) return false;
        const hasResRef = items.some((it) => (it?.reservation_id != null || it?.reservationId != null));
        if (hasResRef) return true;
        const allHaveUnitPrice = items.every((it) => (it?.unit_price != null || it?.unitPrice != null));
        const anyDailySignals = items.some((it) => (it?.daily_rate != null || it?.dailyRate != null || it?.unit_rate != null || it?.unitRate != null || it?.price != null));
        return allHaveUnitPrice && !anyDailySignals;
      };

      let pkgPerDaySum = 0;
      let pkgFullSum = 0;
      let stdPerDaySum = 0;
      let stdFullSum = 0;
      const rows = (Array.isArray(displayGroups) ? displayGroups : []).map((g, idx) => {
        const qty = Number.isFinite(Number(g?.quantity)) ? Number(g.quantity) : 0;
        const unit = Number.isFinite(Number(g?.unitPrice)) ? Number(g.unitPrice) : 0;
        const kind = classify(g);
        let contrib = kind === 'fixed' ? (qty * unit) : (qty * unit * rentalDays);
        let pkgLines = '';
        if ((g?.type || '').toLowerCase() === 'package') {
          try {
            const pkgRef = { package_code: g?.package_code || g?.packageDisplayCode || g?.barcode || g?.packageId || g?.key, packageItems: Array.isArray(g?.packageItems) ? g.packageItems : undefined };
            const unitCandidate = Number(g?.unitPrice);
            let perDay;
            if (Number.isFinite(unitCandidate) && unitCandidate > 0) {
              perDay = qty * unitCandidate;
            } else {
              const pricing = computePackagePricing(pkgRef, { packageQuantity: qty, days: rentalDays });
              perDay = Number.isFinite(Number(pricing.perDayTotal)) ? Number(pricing.perDayTotal) : (qty * unit);
            }
            contrib = perDay * rentalDays;
            pkgPerDaySum += perDay;
            pkgFullSum += contrib;
            const linesMarkup = (pricing.lines || []).map((line, li) => `
              <tr>
                <td colspan="2"></td>
                <td>• ${escapeHtml(String(line.desc || line.barcode || 'item'))}</td>
                <td>${normalizeNumbers(String(line.qtyPerPackage))} × ${normalizeNumbers(String(qty))} × ${normalizeNumbers(String(rentalDays))}</td>
                <td>${normalizeNumbers(String((line.unitPrice || 0).toFixed ? line.unitPrice.toFixed(2) : line.unitPrice))}</td>
                <td>${normalizeNumbers(String((line.perDayTotal * rentalDays).toFixed ? (line.perDayTotal * rentalDays).toFixed(2) : (line.perDayTotal * rentalDays)))}</td>
              </tr>`).join('');
            pkgLines = linesMarkup ? linesMarkup : '';
          } catch (_) { /* ignore debug failures */ }
        } else {
          const fixed = inferGroupFixed(g);
          const perDay = fixed ? 0 : (qty * unit);
          const full = fixed ? (qty * unit) : (perDay * rentalDays);
          stdPerDaySum += perDay;
          stdFullSum += full;
        }
        return `
          <tr>
            <td>${idx + 1}</td>
            <td>${escapeHtml(String(g?.description || '-'))}</td>
            <td>${kind}</td>
            <td>${normalizeNumbers(String(qty))}</td>
            <td>${normalizeNumbers(String(unit.toFixed ? unit.toFixed(2) : unit))}</td>
            <td>${normalizeNumbers(String(contrib.toFixed ? contrib.toFixed(2) : contrib))}</td>
          </tr>${pkgLines}`;
      }).join('');
      debugPanelHtml = `
        <details class="reservation-finance-debug" style="margin-top:12px">
          <summary>Debug: تفصيل التسعير</summary>
          <div style="padding:8px 0; font-size: 12px">
            <div>الأيام: ${normalizeNumbers(String(rentalDays))}</div>
            <div style="margin-top:6px"><strong>مجاميع سريعة:</strong></div>
            <div>من الحِزم (يومي): ${normalizeNumbers(String(pkgPerDaySum.toFixed(2)))} ${currencyLabel}</div>
            <div>من الحِزم (كامل المدة): ${normalizeNumbers(String(pkgFullSum.toFixed(2)))} ${currencyLabel}</div>
            <div>مفردة خارج الحِزم (يومي): ${normalizeNumbers(String(stdPerDaySum.toFixed(2)))} ${currencyLabel}</div>
            <div>مفردة خارج الحِزم (كامل المدة): ${normalizeNumbers(String(stdFullSum.toFixed(2)))} ${currencyLabel}</div>
            <div style="margin-top:4px">Equipment Total (breakdown): ${normalizeNumbers(String(equipmentTotal.toFixed(2)))} ${currencyLabel}</div>
            <table class="table table-xs" style="width:100%; margin-top:8px">
              <thead>
                <tr>
                  <th>#</th><th>الوصف</th><th>النوع</th><th>الكمية</th><th>سعر الوحدة</th><th>المساهمة</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </details>`;
      console.debug('[finance-debug] groups', displayGroups, { rentalDays, equipmentTotal, crewTotal, discountAmount, taxAmount });
    }
  } catch (_) { /* ignore */ }

  console.debug('[reservations/details] payment history raw', reservation.paymentHistory, reservation.payment_history);
  let originalHistory = [];
  // Prefer project-level history when linked
  if (projectLinked && project) {
    if (Array.isArray(project.paymentHistory)) {
      originalHistory = project.paymentHistory;
    } else if (Array.isArray(project.payment_history)) {
      originalHistory = project.payment_history;
    } else if (Array.isArray(project.payments)) {
      originalHistory = project.payments;
    } else if (Array.isArray(project.paymentLogs)) {
      originalHistory = project.paymentLogs;
    }
  }
  if (!Array.isArray(originalHistory) || originalHistory.length === 0) {
    if (Array.isArray(reservation.paymentHistory)) {
      originalHistory = reservation.paymentHistory;
    } else if (Array.isArray(reservation.payment_history)) {
      originalHistory = reservation.payment_history;
    } else if (Array.isArray(reservation.paymentLogs)) {
      originalHistory = reservation.paymentLogs;
    } else {
      originalHistory = [];
    }
  }

  const paymentHistory = Array.isArray(originalHistory) ? originalHistory : [];

  const paymentHistoryHtml = paymentHistory.length
    ? `<ul class="reservation-payment-history-list">${paymentHistory.map((entry) => {
        const typeRaw = typeof entry?.type === 'string' ? entry.type.toLowerCase() : '';
        const entryType = typeRaw === 'amount'
          ? t('reservations.paymentHistory.type.amount', 'دفعة مالية')
          : typeRaw === 'percent'
            ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
            : t('reservations.paymentHistory.type.unknown', 'دفعة');

        const percentVal = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
          ? Number(entry.percentage)
          : (Number.isFinite(Number(entry?.value)) && typeRaw === 'percent' ? Number(entry.value) : null);

        // Compute amount from percentage against the same finalTotal used in the summary
        const computedFromPercent = (percentVal != null && Number.isFinite(Number(finalTotal)) && Number(finalTotal) > 0)
          ? Math.round((Number(finalTotal) * (percentVal / 100)) * 100) / 100
          : null;

        // For percent-type entries, always show the computed amount to keep UI consistent
        const rawAmount = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
          ? Number(entry.amount)
          : null;
        const showAmount = (typeRaw === 'percent' && computedFromPercent != null)
          ? computedFromPercent
          : rawAmount;
        const entryAmount = showAmount != null
          ? `${normalizeNumbers(showAmount.toFixed(2))} ${currencyLabel}`
          : '—';

        const entryPercent = percentVal != null
          ? `${normalizeNumbers(percentVal.toFixed(2))}%`
          : '—';
        const entryDate = entry?.recordedAt ? normalizeNumbers(formatDateTime(entry.recordedAt)) : '—';
        const noteHtml = entry?.note ? `<div class="payment-history-note">${escapeHtml(normalizeNumbers(entry.note))}</div>` : '';
        return `
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${escapeHtml(entryType)}</span>
              <span class="payment-history-entry__amount">${entryAmount}</span>
              <span class="payment-history-entry__percent">${entryPercent}</span>
              <span class="payment-history-entry__date">${entryDate}</span>
            </div>
            ${noteHtml}
          </li>
        `;
      }).join('')}</ul>`
    : `<div class="reservation-payment-history-empty">${escapeHtml(paymentHistoryEmpty)}</div>`;

  const rawStatusValue = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
  const isCancelled = rawStatusValue === 'cancelled' || rawStatusValue === 'canceled';

  const statusChipsData = isCancelled
    ? [
        { text: t('reservations.list.status.cancelled', '❌ ملغي'), className: 'status-cancelled' },
        {
          text: paymentStatusText,
          className: paidStatus === 'paid'
            ? 'status-paid'
            : isPartial
              ? 'status-partial'
              : 'status-unpaid'
        }
      ]
    : [
        {
          text: confirmed ? statusConfirmedText : statusPendingText,
          className: confirmed ? 'status-confirmed' : 'status-pending'
        },
        {
          text: paymentStatusText,
          className: paidStatus === 'paid'
            ? 'status-paid'
            : isPartial
              ? 'status-partial'
              : 'status-unpaid'
        }
      ];

  if (completed && !isCancelled) {
    statusChipsData.push({ text: completedText, className: 'status-completed' });
  }

  const statusChipsHtml = statusChipsData
    .map(({ text: chipText, className }) => `<span class="status-chip ${className}">${chipText}</span>`)
    .join('');

  const renderInfoRow = (icon, label, value, options = {}) => `
    <div class="res-info-row${options.wide ? ' res-info-row--wide' : ''}${options.primary ? ' res-info-row--primary' : ''}">
      <span class="label">
        <span class="label-icon" aria-hidden="true">${icon}</span>
        <span class="label-text">${label}</span>
      </span>
      <span class="value">${value}</span>
    </div>
  `;

  let projectRowHtml = '';
  if (reservation.projectId) {
    let projectValueHtml = escapeHtml(projectMissingText);
    if (project) {
      const title = project.title || t('projects.fallback.untitled', 'مشروع بدون اسم');
      projectValueHtml = `${escapeHtml(title)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${project.id}">${escapeHtml(openProjectLabel)}</button>`;
    }

    projectRowHtml = `
      <div class="res-info-row res-info-row--wide">
        <span class="label">
          <span class="label-icon" aria-hidden="true">📁</span>
          <span class="label-text">${projectLabel}</span>
        </span>
        <span class="value">${projectValueHtml}</span>
      </div>
    `;
  }

  const infoRows = [];
  infoRows.push(renderInfoRow('👤', customerLabel, customer?.customerName || reservation.customerName || unknownCustomer, { primary: true }));
  infoRows.push(renderInfoRow('📞', contactLabel, customer?.phone || '—'));
  infoRows.push(renderInfoRow('🗓️', startLabel, startDisplay));
  infoRows.push(renderInfoRow('🗓️', endLabel, endDisplay));
  infoRows.push(renderInfoRow('📦', itemsCountLabel, itemsCountText));
  infoRows.push(renderInfoRow('⏱️', durationLabel, rentalDaysDisplay));
  infoRows.push(renderInfoRow('📝', notesLabel, notesDisplay, { wide: true }));
  if (projectRowHtml) {
    infoRows.push(projectRowHtml);
  }

  const infoRowsHtml = infoRows.join('');


  const itemsTableBody = displayGroups.length
    ? displayGroups.map((group) => {
        const representative = group.items[0] || {};
        const imageSource = resolveItemImage(representative) || group.image;
        const imageCell = imageSource
          ? `<img src="${imageSource}" alt="${imageAlt}" class="reservation-item-thumb">`
          : '<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>';

        // Build package items list without duplicates
        let packageItemsSource = [];
        if (Array.isArray(group.packageItems) && group.packageItems.length) {
          packageItemsSource = [...group.packageItems];
        } else {
          const tmp = [];
          group.items.forEach((item) => {
            if (Array.isArray(item?.packageItems) && item.packageItems.length) {
              tmp.push(...item.packageItems);
            }
          });
          packageItemsSource = tmp;
        }
        // Deduplicate by normalized barcode or equipment id
        if (Array.isArray(packageItemsSource) && packageItemsSource.length > 1) {
          const seen = new Set();
          packageItemsSource = packageItemsSource.filter((pkgItem) => {
            const key = (pkgItem?.normalizedBarcode && String(pkgItem.normalizedBarcode).toLowerCase())
              || (pkgItem?.barcode && String(pkgItem.barcode).toLowerCase())
              || (pkgItem?.equipmentId != null ? `id:${pkgItem.equipmentId}` : null);
            if (!key) return true;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }

        const isPackageGroup = isPackageEntry(group)
          || group.items.some((item) => isPackageEntry(item))
          || packageItemsSource.length > 0;
        const resolveQuantityCandidate = (value, { fallback = 1, max = 1_000 } = {}) => {
          const parsed = parseQuantityValue(value);
          if (Number.isFinite(parsed) && parsed > 0) {
            return Math.min(max, parsed);
          }
          return fallback;
        };

        let quantityValue;
        if (isPackageGroup) {
          const representativeQty = resolveQuantityCandidate(representative?.qty ?? representative?.quantity ?? representative?.count, { fallback: NaN, max: 999 });
          if (Number.isFinite(representativeQty) && representativeQty > 0) {
            quantityValue = representativeQty;
          } else {
            quantityValue = resolveQuantityCandidate(group.quantity ?? group.count ?? 1, { fallback: 1, max: 999 });
          }
        } else {
          quantityValue = resolveQuantityCandidate(
            group.quantity ?? group.count ?? representative?.qty ?? representative?.quantity ?? representative?.count ?? 0,
            { fallback: 1, max: 9_999 }
          );
        }
        const quantityDisplay = normalizeNumbers(String(quantityValue));

        const resolvePriceCandidate = (candidates, { preferPositive = false } = {}) => {
          let fallback = Number.NaN;
          for (const candidate of candidates) {
            const parsed = parsePriceValue(candidate);
            if (!Number.isFinite(parsed)) {
              continue;
            }
            if (preferPositive && parsed > 0) {
              return parsed;
            }
            if (!Number.isFinite(fallback)) {
              fallback = parsed;
            }
          }
          return fallback;
        };

        let unitPriceNumber;
        let unitCostNumber;
        let totalPriceNumber;

        if (isPackageGroup) {
          const unitCandidates = [
            representative?.price,
            representative?.unit_price,
            representative?.unitPrice,
            group.unitPrice
          ];

          unitPriceNumber = resolvePriceCandidate(unitCandidates, { preferPositive: true });

          if (!Number.isFinite(unitPriceNumber) || unitPriceNumber < 0) {
            const totalFallback = parsePriceValue(group.totalPrice ?? representative?.total ?? representative?.total_price);
            if (Number.isFinite(totalFallback) && quantityValue > 0) {
              unitPriceNumber = totalFallback / quantityValue;
            }
          }

          if (!Number.isFinite(unitPriceNumber)) {
            unitPriceNumber = 0;
          }

          const unitCostCandidates = [
            representative?.cost,
            representative?.unit_cost,
            representative?.unitCost,
            group.unitCost
          ];
          unitCostNumber = resolvePriceCandidate(unitCostCandidates, { preferPositive: true });
          if (!Number.isFinite(unitCostNumber)) {
            unitCostNumber = 0;
          }

          const totalCandidates = [
            representative?.total,
            representative?.total_price,
            group.totalPrice
          ];

          totalPriceNumber = resolvePriceCandidate(totalCandidates);

          if (!Number.isFinite(totalPriceNumber)) {
            totalPriceNumber = unitPriceNumber * quantityValue;
          } else {
            const computedTotal = unitPriceNumber * quantityValue;
            if (Number.isFinite(computedTotal) && computedTotal > 0) {
              const delta = Math.abs(totalPriceNumber - computedTotal);
              if (delta > computedTotal * 0.25) {
                totalPriceNumber = computedTotal;
              }
            }
          }
        } else {
          const candidatePrices = [
            representative?.price,
            representative?.unit_price,
            representative?.unitPrice,
            group.unitPrice
          ];

          unitPriceNumber = resolvePriceCandidate(candidatePrices, { preferPositive: true });

          if (!Number.isFinite(unitPriceNumber) || unitPriceNumber < 0) {
            const totalCandidate = parsePriceValue(group.totalPrice ?? representative?.total ?? representative?.total_price);
            if (Number.isFinite(totalCandidate) && quantityValue > 0) {
              unitPriceNumber = totalCandidate / quantityValue;
            }
          }

          if (!Number.isFinite(unitPriceNumber)) {
            unitPriceNumber = 0;
          }

          const costCandidates = [
            representative?.cost,
            representative?.unit_cost,
            representative?.unitCost,
            group.unitCost
          ];

          unitCostNumber = resolvePriceCandidate(costCandidates, { preferPositive: true });
          if (!Number.isFinite(unitCostNumber) || unitCostNumber < 0) {
            unitCostNumber = 0;
          }

          totalPriceNumber = parsePriceValue(group.totalPrice ?? representative?.total ?? representative?.total_price);
          if (!Number.isFinite(totalPriceNumber)) {
            totalPriceNumber = unitPriceNumber * quantityValue;
          }
        }

        unitPriceNumber = sanitizePriceValue(unitPriceNumber);
        unitCostNumber = sanitizePriceValue(unitCostNumber);
        totalPriceNumber = sanitizePriceValue(totalPriceNumber);

        const displayUnitPriceNumber = withProjectOverhead(unitPriceNumber);
        const unitPriceDisplay = `${normalizeNumbers(displayUnitPriceNumber.toFixed(2))} ${currencyLabel}`;
        const unitCostDisplay = `${normalizeNumbers(unitCostNumber.toFixed(2))} ${currencyLabel}`;
        const normalizedBarcodes = group.barcodes
          .map((code) => normalizeNumbers(String(code || '')))
          .filter(Boolean);
        const barcodesMeta = normalizedBarcodes.length
          ? `<details class="reservation-item-barcodes">
              <summary>${t('reservations.equipment.barcodes.summary', 'عرض الباركودات')}</summary>
              <ul class="reservation-barcode-list">
                ${normalizedBarcodes.map((code) => `<li>${code}</li>`).join('')}
              </ul>
            </details>`
          : '';

        let packageItemsMeta = '';
        if (packageItemsSource.length) {
          const aggregated = new Map();
          const resolvePackageItemQty = (_pkgItem) => 1;
          packageItemsSource.forEach((pkgItem) => {
            if (!pkgItem) return;
            const key = normalizeBarcodeValue(pkgItem.barcode || pkgItem.normalizedBarcode || pkgItem.desc || Math.random());
            if (!key) return;
            const existing = aggregated.get(key);
            const qty = resolvePackageItemQty(pkgItem);
            if (existing) {
              existing.qty = qty;
              existing.total = qty;
              return;
            }
            aggregated.set(key, {
              desc: pkgItem.desc || pkgItem.barcode || t('reservations.create.packages.unnamedItem', 'عنصر بدون اسم'),
              qty: Math.max(1, Math.min(qty, 99)),
              total: Math.max(1, Math.min(qty, 99)),
              barcode: pkgItem.barcode ?? pkgItem.normalizedBarcode ?? ''
            });
          });

          if (aggregated.size) {
            const itemsMarkup = Array.from(aggregated.values())
              .map((pkgItem) => {
                const qtyDisplay = normalizeNumbers(String(pkgItem.qty > 0 ? Math.min(pkgItem.qty, 99) : 1));
                const label = escapeHtml(pkgItem.desc || '');
                const barcodeLabel = pkgItem.barcode
                  ? ` <span class="reservation-package-items__barcode">(${escapeHtml(normalizeNumbers(String(pkgItem.barcode)))})</span>`
                  : '';
                return `<li>${label}${barcodeLabel} × ${qtyDisplay}</li>`;
              })
              .join('');

            packageItemsMeta = `
              <details class="reservation-package-items">
                <summary>${t('reservations.create.packages.itemsSummary', 'عرض محتويات الحزمة')}</summary>
                <ul class="reservation-package-items__list">
                  ${itemsMarkup}
                </ul>
              </details>
            `;
          }
        }

        const combinedMeta = isPackageGroup ? `${packageItemsMeta || ''}${barcodesMeta || ''}` : barcodesMeta;

        const daysDisplay = normalizeNumbers(String(rentalDays));

        // إجمالي الصف يعتمد على الأيام من التواريخ
        let rowTotalNumber;
        if (isPackageGroup) {
          // اعتبر سعر الحزمة يوميًّا
          let perDay = unitPriceNumber;
          if (!Number.isFinite(perDay) || perDay <= 0) {
            const pkgRef = {
              package_code: group?.package_code || group?.packageDisplayCode || group?.barcode || group?.packageId || group?.key,
              packageItems: Array.isArray(group?.packageItems) ? group.packageItems : undefined,
            };
            try {
              const pricing = computePackagePricing(pkgRef, { packageQuantity: Number.isFinite(quantityValue) ? quantityValue : 1, days: 1 });
              if (Number.isFinite(Number(pricing.perDayTotal))) perDay = Number(pricing.perDayTotal);
            } catch (_) { /* ignore */ }
          }
          rowTotalNumber = sanitizePriceValue(withProjectOverhead(perDay) * rentalDays);
        } else {
          rowTotalNumber = sanitizePriceValue(displayUnitPriceNumber * quantityValue * rentalDays);
        }

        const rowTotalDisplay = `${normalizeNumbers(rowTotalNumber.toFixed(2))} ${currencyLabel}`;

        return `
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info reservation-item-info--static">
                <div class="reservation-item-thumb-wrapper">${imageCell}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${escapeHtml(representative.desc || representative.description || representative.name || group.description || '-')}</div>
                  ${combinedMeta}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.quantity)}">
              <span class="reservation-quantity-static">${quantityDisplay}</span>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(t('reservations.details.table.headers.days', 'الأيام'))}">${daysDisplay}</td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.unitPrice)}">${unitPriceDisplay}</td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.unitCost)}">${unitCostDisplay}</td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.total)}">${rowTotalDisplay}</td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="6" class="text-center">${noItemsText}</td></tr>`;


  const itemsTable = `
    <div class="table-responsive reservation-modal-table-shell reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-table reservation-modal-items-table">
        <colgroup>
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--item">
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--quantity">
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--days">
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--unit-price">
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--unit-cost">
          <col class="reservation-modal-items-table__col reservation-modal-items-table__col--total">
        </colgroup>
        <thead>
          <tr>
            <th>${tableHeaders.item}</th>
            <th>${tableHeaders.quantity}</th>
            <th>${t('reservations.details.table.headers.days', 'الأيام')}</th>
            <th>${tableHeaders.unitPrice}</th>
            <th>${tableHeaders.unitCost}</th>
            <th>${tableHeaders.total}</th>
          </tr>
        </thead>
        <tbody>${itemsTableBody}</tbody>
      </table>
    </div>
  `;

  const techniciansCardsHtml = crewAssignments.map((assignment, idx) => {
    const indexLabel = normalizeNumbers(String(idx + 1));

    let resolvedPositionLabel = assignment.positionLabel
      ?? assignment.position_name
      ?? assignment.position_label
      ?? assignment.position_title
      ?? assignment.role
      ?? assignment.position
      ?? null;
    if (!resolvedPositionLabel || resolvedPositionLabel.trim() === '') {
      resolvedPositionLabel = assignment.positionLabelAr
        ?? assignment.position_label_ar
        ?? assignment.position_title_ar
        ?? assignment.positionLabelEn
        ?? assignment.position_label_en
        ?? assignment.position_name_ar
        ?? assignment.position_title_en
        ?? assignment.position_name_en
        ?? null;
    }
    // Fallback to positions cache if still missing
    if (!resolvedPositionLabel || resolvedPositionLabel.trim() === '') {
      try {
        const positions = typeof getTechnicianPositionsCache === 'function' ? getTechnicianPositionsCache() : [];
        const byId = assignment.positionId
          ? positions.find((p) => String(p.id) === String(assignment.positionId))
          : null;
        const byKey = !byId && assignment.positionKey
          ? positions.find((p) => String(p.name).toLowerCase() === String(assignment.positionKey).toLowerCase())
          : null;
        const pos = byId || byKey || null;
        if (pos) {
          resolvedPositionLabel = pos.labelAr || pos.labelEn || pos.name || resolvedPositionLabel;
        }
      } catch (_e) {
        /* optional fallback only */
      }
    }

    const positionLabel = normalizedDisplay(resolvedPositionLabel)
      || t('reservations.crew.positionFallback', 'منصب بدون اسم');
    const positionLabelAlt = normalizedDisplay(
      assignment.positionLabelAlt
        ?? assignment.position_label_alt
        ?? assignment.positionLabelEn
        ?? assignment.position_label_en
        ?? assignment.positionLabelAr
        ?? assignment.position_label_ar
        ?? assignment.position_name_en
        ?? assignment.position_name_ar
        ?? ''
    );

    const technicianName = normalizedDisplay(assignment.technicianName)
      || t('technicians.picker.noTechnicianOption', '— بدون تعيين —');
    const phone = assignment.technicianPhone || phoneFallback;

    const positionCost = sanitizePriceValue(parsePriceValue(
      assignment.positionCost
        ?? assignment.position_cost
        ?? assignment.cost
        ?? assignment.daily_wage
        ?? assignment.dailyWage
        ?? assignment.internal_cost
        ?? 0
    ));
    const positionClientPrice = sanitizePriceValue(parsePriceValue(
      assignment.positionClientPrice
        ?? assignment.position_client_price
        ?? assignment.client_price
        ?? assignment.customer_price
        ?? assignment.position_price
        ?? assignment.clientPrice
        ?? assignment.daily_total
        ?? assignment.dailyTotal
        ?? assignment.total
        ?? 0
    ));

    const displayPositionClientPrice = withProjectOverhead(positionClientPrice);
    const clientPriceDisplay = `${normalizeNumbers(displayPositionClientPrice.toFixed(2))} ${currencyLabel}`;
    const costDisplay = positionCost > 0
      ? `${normalizeNumbers(positionCost.toFixed(2))} ${currencyLabel}`
      : null;

    return `
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${indexLabel}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${technicianName}</span>
            <small class="text-muted">🏷️ ${positionLabel}${positionLabelAlt ? ` — ${positionLabelAlt}` : ''}</small>
            <small class="text-muted">💼 ${clientPriceDisplay}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${phone}</div>
          ${costDisplay ? `<div>💵 ${t('reservations.details.technicians.costLabel', 'التكلفة الداخلية')}: ${costDisplay}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  const techniciansSectionContent = crewAssignments.length
    ? `
      <div class="reservation-technicians-slider" data-tech-slider>
        <button type="button" class="slider-btn slider-btn--prev" data-slider-prev aria-label="${escapeHtml(t('reservations.details.slider.prev', 'السابق'))}" title="${escapeHtml(t('reservations.details.slider.prev', 'السابق'))}">‹</button>
        <div class="reservation-technicians-track" data-slider-track>
          ${techniciansCardsHtml}
        </div>
        <button type="button" class="slider-btn slider-btn--next" data-slider-next aria-label="${escapeHtml(t('reservations.details.slider.next', 'التالي'))}" title="${escapeHtml(t('reservations.details.slider.next', 'التالي'))}">›</button>
      </div>
    `
    : `<ul class="reservation-modal-technicians"><li>${noCrewText}</li></ul>`;

  return `
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${reservationIdLabel}</span>
          <strong>${reservationIdDisplay}</strong>
        </div>
        <div class="status-chips">
          ${statusChipsHtml}
        </div>
      </div>

      <div class="reservation-modal-overview">
        <div class="reservation-info-card">
          <h6>${bookingSectionTitle}</h6>
          <div class="reservation-info-list">
            ${infoRowsHtml}
          </div>
        </div>
        <div class="reservation-summary-card">
          <div class="summary-icon">💳</div>
          <div class="summary-body">
            <h6 class="summary-heading">${paymentSummaryTitle}</h6>
            <div class="summary-content">
              <div class="summary-details">
                ${summaryDetailsHtml}
              </div>
              <div class="reservation-payment-history-modal">
                <h6 class="history-heading">${paymentHistoryTitle}</h6>
                ${paymentHistoryHtml}
              </div>
              ${debugPanelHtml}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section reservation-modal-section-card">
        <div class="section-title">
          <span>${crewSectionTitle}</span>
          <span class="count">${crewCountText}</span>
        </div>
        ${techniciansSectionContent}
      </div>

      <div class="reservation-items-section reservation-modal-section-card">
        <div class="section-title">
          <span>${itemsSectionTitle}</span>
          <span class="count">${itemsCountText}</span>
        </div>
        ${itemsTable}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${index}">
          ${t('reservations.details.actions.exportPdf', 'عرض سعر')}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-checklist-btn" data-index="${index}">
          ${t('reservations.details.actions.exportChecklist', '📋 لستة معدات وفنيين')}
        </button>
        ${isProjectLinked ? `<span class="reservation-linked-pill">${projectLinkedReadonlyLabel}</span>` : `<button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${index}">${editActionLabel}</button>`}
        ${canDelete ? `<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${index}">${deleteActionLabel}</button>` : ''}
      </div>
    </div>
  `;
}
