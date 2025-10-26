import { t } from '../../language.js';
import { getTechnicianPositionsCache, findPositionByName } from '../../technicianPositions.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import { loadData } from '../../storage.js';
import { isReservationCompleted, resolveReservationProjectState, buildReservationDisplayGroups, sanitizePriceValue, parsePriceValue } from '../../reservationsShared.js';
import { resolveItemImage } from '../../reservationsEquipment.js';
import { normalizeBarcodeValue } from '../state.js';
import { calculateReservationDays, DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown } from '../../reservationsSummary.js';
import { userCanManageDestructiveActions } from '../../auth.js';

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
  const { groups: displayGroups, packageGroups, groupedItems } = buildReservationDisplayGroups(reservation);

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
  const canDelete = userCanManageDestructiveActions();

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

  const applyTaxFlag = projectLinked
    ? false
    : Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);

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
  let companySharePercentInput = hasCompanyShare && Number.isFinite(normalizedCompanyShare)
    ? normalizedCompanyShare
    : 0;
  if (applyTaxFlag && companySharePercentInput <= 0) {
    companySharePercentInput = DEFAULT_COMPANY_SHARE_PERCENT;
  }

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
  });

  const equipmentTotal = sanitizePriceValue(breakdown.equipmentTotal);
  const crewTotal = sanitizePriceValue(breakdown.crewTotal);
  const crewCostTotal = sanitizePriceValue(breakdown.crewCostTotal);
  const discountAmount = sanitizePriceValue(breakdown.discountAmount);
  const subtotalAfterDiscount = sanitizePriceValue(breakdown.subtotalAfterDiscount);
  const companySharePercent = Number.isFinite(breakdown.companySharePercent) ? breakdown.companySharePercent : 0;
  let companyShareAmount = sanitizePriceValue(breakdown.companyShareAmount);
  companyShareAmount = companySharePercent > 0
    ? sanitizePriceValue(Math.max(0, companyShareAmount))
    : 0;
  const taxAmount = sanitizePriceValue(breakdown.taxAmount);
  const finalTotalComputed = sanitizePriceValue(breakdown.finalTotal);
  const finalTotal = projectLinked
    ? finalTotalComputed
    : (hasStoredCost ? storedCost : finalTotalComputed);
  const netProfitValue = sanitizePriceValue(breakdown.netProfit);

  const reservationIdDisplay = normalizeNumbers(String(reservation.reservationId ?? reservation.id ?? ''));
  const startDisplay = reservation.start ? normalizeNumbers(formatDateTime(reservation.start)) : '-';
  const endDisplay = reservation.end ? normalizeNumbers(formatDateTime(reservation.end)) : '-';
  const techniciansCountDisplay = normalizeNumbers(String(crewAssignments.length));
  const equipmentTotalDisplay = normalizeNumbers(equipmentTotal.toFixed(2));
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
  const companyShareLabel = t('reservations.details.labels.companyShare', '🏦 نسبة الشركة');
  const netProfitLabel = t('reservations.details.labels.netProfit', '💵 صافي الربح');
  const imageAlt = t('reservations.create.equipment.imageAlt', 'صورة');
  const tableHeaders = {
    item: t('reservations.equipment.table.item', 'المعدة'),
    quantity: t('reservations.equipment.table.quantity', 'الكمية'),
    unitPrice: t('reservations.equipment.table.unitPrice', 'سعر الوحدة'),
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
  const completedText = t('reservations.list.status.completed', '📁 منتهي');
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
  const startLabel = t('reservations.details.labels.start', 'بداية الحجز');
  const endLabel = t('reservations.details.labels.end', 'نهاية الحجز');
  const notesLabel = t('reservations.details.labels.notes', 'ملاحظات');
  const notesFallback = t('reservations.list.noNotes', 'لا توجد ملاحظات');
  const itemsCountLabel = t('reservations.details.labels.itemsCount', 'عدد المعدات');
  const itemsTotalLabel = t('reservations.details.labels.itemsTotal', 'إجمالي المعدات');
  const paymentHistoryTitle = t('reservations.paymentHistory.title', 'سجل الدفعات');
  const paymentHistoryEmpty = t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة');
  const unknownCustomer = t('reservations.list.unknownCustomer', 'غير معروف');

  const paidStatus = reservation.paidStatus
    ?? reservation.paid_status
    ?? (paid ? 'paid' : 'unpaid');
  const isPartial = paidStatus === 'partial';
  const paymentStatusText = paidStatus === 'paid'
    ? paymentPaidText
    : isPartial
      ? paymentPartialText
      : paymentUnpaidText;
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

  let totalItemsQuantity = (Array.isArray(items) ? items : []).reduce((sum, item) => {
    if (!item || typeof item !== 'object') {
      return sum;
    }
    if (isPackageChildEntry(item)) {
      return sum;
    }
    return sum + resolveEntryQuantity(item);
  }, 0);

  if (totalItemsQuantity <= 0 && Array.isArray(displayGroups) && displayGroups.length) {
    totalItemsQuantity = displayGroups.reduce((sum, group) => {
      const quantity = resolveEntryQuantity({ ...group, type: group.type });
      return sum + quantity;
    }, 0);
  }

  if (!Number.isFinite(totalItemsQuantity) || totalItemsQuantity <= 0) {
    totalItemsQuantity = Array.isArray(displayGroups) && displayGroups.length
      ? displayGroups.length
      : (Array.isArray(items) ? items.length : 0) || 1;
  } else if (totalItemsQuantity > 1_000_000) {
    totalItemsQuantity = Math.min(totalItemsQuantity, (Array.isArray(displayGroups) ? displayGroups.length : totalItemsQuantity));
    if (!Number.isFinite(totalItemsQuantity) || totalItemsQuantity <= 0) {
      totalItemsQuantity = (Array.isArray(items) ? items.length : 0) || 1;
    }
  }

  totalItemsQuantity = Math.max(1, Math.round(totalItemsQuantity));
  const itemsCountDisplay = normalizeNumbers(String(totalItemsQuantity));
  const itemsCountText = itemsCountTemplate.replace('{count}', itemsCountDisplay);
  const crewCountText = crewCountTemplate.replace('{count}', techniciansCountDisplay);
  const notesDisplay = reservation.notes ? normalizeNumbers(reservation.notes) : notesFallback;

  const crewTotalDisplay = normalizeNumbers(crewTotal.toFixed(2));
  const companySharePercentDisplay = normalizeNumbers(String(companySharePercent));
  const companyShareAmountDisplay = normalizeNumbers(companyShareAmount.toFixed(2));
  const companyShareValue = `${companySharePercentDisplay}% (${companyShareAmountDisplay} ${currencyLabel})`;
  const revenueAfterDiscountValue = Math.max(0, (equipmentTotal + crewTotal) - discountAmount);
  const netProfitSafe = Number.isFinite(netProfitValue) ? Math.max(0, netProfitValue) : 0;
  const netProfitDisplay = normalizeNumbers(netProfitSafe.toFixed(2));

  const summaryDetails = [
    { icon: '💼', label: itemsTotalLabel, value: `${equipmentTotalDisplay} ${currencyLabel}` }
  ];

  summaryDetails.push({ icon: '😎', label: crewTotalLabel, value: `${crewTotalDisplay} ${currencyLabel}` });

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
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${label}</span>
      <span class="summary-details-value">${value}</span>
    </div>
  `).join('');

  console.debug('[reservations/details] payment history raw', reservation.paymentHistory, reservation.payment_history);
  let originalHistory = [];
  if (Array.isArray(reservation.paymentHistory)) {
    originalHistory = reservation.paymentHistory;
  } else if (Array.isArray(reservation.payment_history)) {
    originalHistory = reservation.payment_history;
  }

  const fallbackHistory = Array.isArray(reservation.paymentLogs)
    ? reservation.paymentLogs
    : []; // تعويض لأي مصادر أخرى لاحقاً

  const paymentHistory = Array.isArray(originalHistory) && originalHistory.length > 0
    ? originalHistory
    : fallbackHistory;

  const paymentHistoryHtml = paymentHistory.length
    ? `<ul class="reservation-payment-history-list">${paymentHistory.map((entry) => {
        const entryType = entry?.type === 'amount'
          ? t('reservations.paymentHistory.type.amount', 'دفعة مالية')
          : entry?.type === 'percent'
            ? t('reservations.paymentHistory.type.percent', 'دفعة نسبة')
            : t('reservations.paymentHistory.type.unknown', 'دفعة');
        const entryAmount = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
          ? `${normalizeNumbers(Number(entry.amount).toFixed(2))} ${currencyLabel}`
          : '—';
        const entryPercent = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
          ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
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

  const statusChipsData = [
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

  if (completed) {
    statusChipsData.push({ text: completedText, className: 'status-completed' });
  }

  const statusChipsHtml = statusChipsData
    .map(({ text: chipText, className }) => `<span class="status-chip ${className}">${chipText}</span>`)
    .join('');

  const renderInfoRow = (icon, label, value) => `
    <div class="res-info-row">
      <span class="label">${icon} ${label}</span>
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
      <div class="res-info-row">
        <span class="label">📁 ${projectLabel}</span>
        <span class="value">${projectValueHtml}</span>
      </div>
    `;
  }

  const infoRows = [];
  infoRows.push(renderInfoRow('👤', customerLabel, customer?.customerName || unknownCustomer));
  infoRows.push(renderInfoRow('📞', contactLabel, customer?.phone || '—'));
  infoRows.push(renderInfoRow('🗓️', startLabel, startDisplay));
  infoRows.push(renderInfoRow('🗓️', endLabel, endDisplay));
  infoRows.push(renderInfoRow('📦', itemsCountLabel, itemsCountText));
  infoRows.push(renderInfoRow('⏱️', durationLabel, rentalDaysDisplay));
  infoRows.push(renderInfoRow('📝', notesLabel, notesDisplay));
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

          totalPriceNumber = parsePriceValue(group.totalPrice ?? representative?.total ?? representative?.total_price);
          if (!Number.isFinite(totalPriceNumber)) {
            totalPriceNumber = unitPriceNumber * quantityValue;
          }
        }

        unitPriceNumber = sanitizePriceValue(unitPriceNumber);
        totalPriceNumber = sanitizePriceValue(totalPriceNumber);

        const unitPriceDisplay = `${normalizeNumbers(unitPriceNumber.toFixed(2))} ${currencyLabel}`;
        const totalPriceDisplay = `${normalizeNumbers(totalPriceNumber.toFixed(2))} ${currencyLabel}`;
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
          const resolvePackageItemQty = (pkgItem) => {
            const direct = parseQuantityValue(pkgItem?.qtyPerPackage ?? pkgItem?.perPackageQty ?? pkgItem?.quantityPerPackage);
            if (Number.isFinite(direct) && direct > 0 && direct <= 99) {
              return Math.round(direct);
            }
            return 1;
          };
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

        return `
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${imageCell}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${escapeHtml(representative.desc || representative.description || representative.name || group.description || '-')}</div>
                  ${combinedMeta}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${quantityDisplay}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.unitPrice)}">${unitPriceDisplay}</td>
            <td class="reservation-modal-items-table__cell" data-label="${escapeHtml(tableHeaders.total)}">${totalPriceDisplay}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${escapeHtml(tableHeaders.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `;
      }).join('')
    : `<tr><td colspan="5" class="text-center">${noItemsText}</td></tr>`;


  const itemsTable = `
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${tableHeaders.item}</th>
            <th>${tableHeaders.quantity}</th>
            <th>${tableHeaders.unitPrice}</th>
            <th>${tableHeaders.total}</th>
            <th>${tableHeaders.actions}</th>
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
    let positionClientPrice = sanitizePriceValue(parsePriceValue(
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

    if (!Number.isFinite(positionClientPrice) || positionClientPrice <= 0) {
      try {
        const positions = getTechnicianPositionsCache ? getTechnicianPositionsCache() : [];
        const byId = assignment.positionId
          ? positions.find((p) => String(p.id) === String(assignment.positionId))
          : null;
        const byKey = !byId && assignment.positionKey
          ? positions.find((p) => String(p.name).toLowerCase() === String(assignment.positionKey).toLowerCase())
          : null;
        const pos = byId || byKey || null;
        if (pos && Number.isFinite(Number(pos.clientPrice))) {
          positionClientPrice = sanitizePriceValue(Number(pos.clientPrice));
        }
      } catch (_e) {
        /* optional cache fallback only */
      }
    }

    const clientPriceDisplay = `${normalizeNumbers(positionClientPrice.toFixed(2))} ${currencyLabel}`;
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
    ? `<div class="reservation-technicians-grid">${techniciansCardsHtml}</div>`
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

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${bookingSectionTitle}</h6>
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
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${crewSectionTitle}</span>
          <span class="count">${crewCountText}</span>
        </div>
        ${techniciansSectionContent}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${itemsSectionTitle}</span>
          <span class="count">${itemsCountText}</span>
        </div>
        ${itemsTable}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${index}">
          ${t('reservations.details.actions.exportPdf', '👁️ معاينة PDF')}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${index}">${editActionLabel}</button>
        ${canDelete ? `<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${index}">${deleteActionLabel}</button>` : ''}
      </div>
    </div>
  `;
}
