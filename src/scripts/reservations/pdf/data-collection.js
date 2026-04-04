import { state } from './state.js';
import { loadData } from '../../storage.js';
import { getReservationsState } from '../../reservationsService.js';
import { syncTechniciansStatuses } from '../../technicians.js';
import { getTechnicianPositionsCache, findPositionByName } from '../../technicianPositions.js';
import { t } from '../../language.js';
import { normalizeNumbers, formatDateTime } from '../../utils.js';
import {
  calculateReservationDays,
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus,
} from '../../reservationsSummary.js';
import {
  resolveReservationProjectState,
  buildReservationDisplayGroups,
  sanitizePriceValue,
  parsePriceValue,
} from '../../reservationsShared.js';
import { findPackageById, getPackagesSnapshot } from '../../reservationsPackages.js';
import {
  formatMoney,
  formatCurrencyValue,
  formatPercentageValue,
  normalizeProjectPaymentHistoryForView,
  parsePaymentNumber,
  getProjectExpensesTotal,
  resolveReservationNetTotalForProject,
  combineProjectDateRange,
  getProjectTypeLabel,
  determineProjectStatusFromDates,
  calculateProjectDurationDays,
  formatProjectDurationLabel,
} from './financial.js';
import { DEFAULT_TERMS } from './constants.js';
import { normalizePackageNameForMatch } from './utils.js';
import { PROJECT_TAX_RATE } from '../../projects/constants.js';

export function normalizeTermsInput(value) {
  if (!value) return [...DEFAULT_TERMS];
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function resolveTermsFromForms() {
  const creationInput = document.getElementById('reservation-terms');
  if (creationInput && creationInput.value.trim().length > 0) {
    const normalized = normalizeTermsInput(creationInput.value);
    if (normalized.length) return normalized;
  }

  const editInput = document.getElementById('edit-res-terms');
  if (editInput && editInput.value.trim().length > 0) {
    const normalized = normalizeTermsInput(editInput.value);
    if (normalized.length) return normalized;
  }

  const defaultText = DEFAULT_TERMS.join('\n');
  if (creationInput && creationInput.value.trim().length === 0) {
    creationInput.value = defaultText;
  }
  if (editInput && editInput.value.trim().length === 0) {
    editInput.value = defaultText;
  }

  return [...DEFAULT_TERMS];
}

export function formatQuoteDate(date = new Date()) {
  try {
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    return date.toISOString().slice(0, 10);
  }
}

export function resolveTechnicianDailyRate(technician = {}) {
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
}

export function resolveTechnicianTotalRate(technician = {}) {
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

  return resolveTechnicianDailyRate(technician);
}

export function collectReservationCrewAssignments(reservation) {
  const syncedTechnicians = syncTechniciansStatuses() || [];
  const { technicians: storedTechnicians = [] } = loadData();
  const technicianSource = []
    .concat(Array.isArray(syncedTechnicians) ? syncedTechnicians : [])
    .concat(Array.isArray(storedTechnicians) ? storedTechnicians : []);

  const techniciansMap = new Map();
  technicianSource.forEach((tech) => {
    if (!tech || tech.id == null) return;
    const key = String(tech.id);
    const existing = techniciansMap.get(key) || {};
    techniciansMap.set(key, { ...existing, ...tech });
  });

  const rawAssignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
    ? reservation.crewAssignments
    : (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length
        ? reservation.techniciansDetails
        : (reservation.technicians || []).map((id) => ({ technicianId: id })));

  return rawAssignments.map((assignment, index) => {
    const technicianRecord = assignment?.technicianId != null
      ? techniciansMap.get(String(assignment.technicianId))
      : null;

    let positionLabel = assignment.positionLabel
      ?? assignment.position_name
      ?? assignment.position_label
      ?? assignment.role
      ?? assignment.position
      ?? technicianRecord?.role
      ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
    if (!positionLabel || positionLabel.trim() === '') {
      positionLabel = assignment.positionLabelAr
        ?? assignment.position_label_ar
        ?? assignment.positionLabelEn
        ?? assignment.position_label_en
        ?? assignment.position_name_ar
        ?? assignment.position_name_en
        ?? technicianRecord?.role
        ?? t('reservations.crew.positionFallback', 'منصب بدون اسم');
    }

    // Try to resolve a nicer label using the positions cache (id or key/name lookup)
    try {
      const positions = typeof getTechnicianPositionsCache === 'function' ? (getTechnicianPositionsCache() || []) : [];
      let resolved = null;
      if (assignment?.positionId != null) {
        resolved = positions.find((p) => String(p?.id) === String(assignment.positionId)) || null;
      }
      if (!resolved) {
        const key = assignment.positionKey
          ?? assignment.position_key
          ?? assignment.positionName
          ?? assignment.position_name
          ?? assignment.position
          ?? '';
        if (key) {
          resolved = typeof findPositionByName === 'function' ? (findPositionByName(key) || null) : null;
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
        const better = resolved.labelAr || resolved.labelEn || resolved.name || '';
        if (better && better.trim()) {
          positionLabel = better;
        }
      }
    } catch (_err) {
      // non-fatal; keep existing fallback
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
      positionLabel,
      positionLabelAlt: assignment.positionLabelAlt ?? assignment.position_label_alt ?? '',
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
    };
  });
}

export function collectReservationFinancials(reservation, crewAssignments, project) {
  const { projectLinked } = resolveReservationProjectState(reservation, project);
  const rentalDays = calculateReservationDays(reservation.start, reservation.end);
  const discountRaw = reservation.discount ?? reservation.discountValue ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountTypeRaw = reservation.discountType ?? reservation.discount_type ?? 'percent';
  const discountType = String(discountTypeRaw).toLowerCase() === 'amount' ? 'amount' : 'percent';
  const applyTaxFlag = projectLinked ? false : Boolean(reservation.applyTax ?? reservation.apply_tax ?? reservation.taxApplied);

  const rawSharePercent = reservation.companySharePercent
    ?? reservation.company_share_percent
    ?? reservation.companyShare
    ?? reservation.company_share
    ?? null;
  const normalizedSharePercent = rawSharePercent != null
    ? parsePriceValue(rawSharePercent)
    : Number.NaN;
  const shareEnabledFlag = reservation.companyShareEnabled
    ?? reservation.company_share_enabled
    ?? reservation.companyShareApplied
    ?? reservation.company_share_applied;
  const companySharePercentInput = (shareEnabledFlag === true && Number.isFinite(normalizedSharePercent) && normalizedSharePercent > 0)
    ? normalizedSharePercent
    : null;

  const technicianIds = Array.isArray(crewAssignments)
    ? crewAssignments.map((assignment) => assignment?.technicianId).filter(Boolean)
    : [];

  const breakdown = calculateDraftFinancialBreakdown({
    items: Array.isArray(reservation.items) ? reservation.items : [],
    technicianIds,
    crewAssignments: Array.isArray(crewAssignments) ? crewAssignments : [],
    discount: discountValue,
    discountType,
    applyTax: applyTaxFlag,
    start: reservation.start,
    end: reservation.end,
    companySharePercent: companySharePercentInput,
    // Use full reservation object for grouping (packages, per-day pricing)
    groupingSource: reservation,
  });

  const storedCostCandidate = parsePriceValue(reservation.cost ?? reservation.total ?? reservation.finalTotal);
  const hasStoredCost = Number.isFinite(storedCostCandidate);
  const finalTotalOverride = projectLinked
    ? breakdown.finalTotal
    : (hasStoredCost ? sanitizePriceValue(storedCostCandidate) : breakdown.finalTotal);

  const totals = {
    equipmentTotal: breakdown.equipmentTotal,
    equipmentCostTotal: breakdown.equipmentCostTotal,
    crewTotal: breakdown.crewTotal,
    crewCostTotal: breakdown.crewCostTotal,
    discountAmount: breakdown.discountAmount,
    subtotalAfterDiscount: breakdown.subtotalAfterDiscount,
    taxableAmount: breakdown.taxableAmount,
    taxAmount: breakdown.taxAmount,
    finalTotal: finalTotalOverride,
    companySharePercent: breakdown.companySharePercent,
    companyShareAmount: breakdown.companyShareAmount,
    netProfit: breakdown.netProfit,
  };

  const totalsDisplay = {
    equipmentTotal: formatMoney(breakdown.equipmentTotal),
    equipmentCostTotal: formatMoney(breakdown.equipmentCostTotal),
    crewTotal: formatMoney(breakdown.crewTotal),
    discountAmount: formatMoney(breakdown.discountAmount),
    subtotalAfterDiscount: formatMoney(breakdown.subtotalAfterDiscount),
    taxableAmount: formatMoney(breakdown.taxableAmount),
    taxAmount: formatMoney(breakdown.taxAmount),
    finalTotal: formatMoney(finalTotalOverride),
    companySharePercent: normalizeNumbers((Number.isFinite(breakdown.companySharePercent) ? breakdown.companySharePercent : 0).toFixed(2)),
    companyShareAmount: formatMoney(breakdown.companyShareAmount),
    netProfit: normalizeNumbers(breakdown.netProfit.toFixed(2)),
  };

  return {
    totals,
    totalsDisplay,
    rentalDays: breakdown.rentalDays,
  };
}

export function collectProjectQuoteData(project) {
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const snapshot = loadData() || {};
  const customers = Array.isArray(snapshot.customers) ? snapshot.customers : [];
  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const storedTechnicians = Array.isArray(snapshot.technicians) ? snapshot.technicians : [];
  // Prefer live state reservations; fallback to snapshot
  let reservations = [];
  try {
    const stateReservations = getReservationsState?.() || [];
    reservations = Array.isArray(stateReservations) && stateReservations.length ? stateReservations : (snapshot.reservations || []);
  } catch (_) {
    reservations = snapshot.reservations || [];
  }

  const resolvedProject = project?.id != null
    ? projects.find((entry) => String(entry.id) === String(project.id)) || project
    : project || null;

  const fallback = {
    projectStatusLabel: t('projects.status.ongoing', 'قيد التنفيذ'),
    paymentStatusLabel: t('projects.paymentStatus.unpaid', 'غير مدفوع')
  };

  if (!resolvedProject) {
    return {
      project: null,
      customer: null,
      clientInfo: {
        name: '-',
        company: '-',
        phone: '-',
        email: '-'
      },
      projectInfo: {
        title: '-',
        code: '-',
        typeLabel: '-',
        startDisplay: '-',
        endDisplay: '-',
        durationLabel: '-',
        statusLabel: fallback.projectStatusLabel
      },
      expenses: [],
      equipment: [],
      reservations: [],
      totals: {
        equipmentEstimate: 0,
        expensesTotal: 0,
        baseSubtotal: 0,
        discountAmount: 0,
        subtotalAfterDiscount: 0,
        companyShareAmount: 0,
        subtotal: 0,
        applyTax: false,
        taxAmount: 0,
        totalWithTax: 0
      },
      totalsDisplay: {
        projectSubtotal: formatCurrencyValue(0, currencyLabel),
        expensesTotal: formatCurrencyValue(0, currencyLabel),
        reservationsTotal: formatCurrencyValue(0, currencyLabel),
        discountAmount: formatCurrencyValue(0, currencyLabel),
        taxAmount: formatCurrencyValue(0, currencyLabel),
        overallTotal: formatCurrencyValue(0, currencyLabel),
        paidAmount: formatCurrencyValue(0, currencyLabel),
        remainingAmount: formatCurrencyValue(0, currencyLabel)
      },
      projectTotals: {
        combinedTaxAmount: 0,
        overallTotal: 0,
        reservationsTotal: 0,
        paidAmount: 0,
        paidPercent: 0,
        remainingAmount: 0,
        paymentStatus: 'unpaid'
      },
      paymentSummary: {
        status: 'unpaid',
        statusLabel: fallback.paymentStatusLabel,
        paidAmount: 0,
        paidPercent: 0,
        remainingAmount: 0,
        paidAmountDisplay: formatCurrencyValue(0, currencyLabel),
        remainingAmountDisplay: formatCurrencyValue(0, currencyLabel),
        paidPercentDisplay: formatPercentageValue(0)
      },
      notes: '',
      currencyLabel,
      projectStatus: 'ongoing',
      projectStatusLabel: fallback.projectStatusLabel,
      projectDurationDays: null,
      projectDurationLabel: 'غير محدد',
      paymentHistory: []
    };
  }

  const clientId = resolvedProject.clientId
    ?? resolvedProject.customerId
    ?? resolvedProject.client_id
    ?? resolvedProject.customer_id
    ?? null;
  const customer = clientId != null
    ? customers.find((entry) => String(entry.id) === String(clientId)) || null
    : null;

  const clientName = customer?.customerName
    ?? customer?.name
    ?? resolvedProject.clientName
    ?? resolvedProject.customerName
    ?? t('projects.fallback.unknownClient', 'عميل غير معروف');

  const projectCompany = (resolvedProject.clientCompany || customer?.companyName || customer?.company || '').trim();

  const clientPhoneRaw = customer?.phone
    ?? customer?.customerPhone
    ?? resolvedProject.clientPhone
    ?? resolvedProject.customerPhone
    ?? '';
  const clientPhone = clientPhoneRaw
    ? normalizeNumbers(String(clientPhoneRaw).trim())
    : t('projects.details.client.noPhone', 'لا يوجد رقم متاح');

  const clientEmailRaw = customer?.email
    ?? resolvedProject.clientEmail
    ?? resolvedProject.customerEmail
    ?? '';
  const clientEmail = clientEmailRaw
    ? String(clientEmailRaw).trim()
    : t('projects.details.client.noEmail', 'لا يوجد بريد متاح');

  const projectCodeRaw = resolvedProject.projectCode || `PRJ-${normalizeNumbers(String(resolvedProject.id ?? ''))}`;
  const projectCodeDisplay = normalizeNumbers(String(projectCodeRaw));
  const projectTitle = (resolvedProject.title || '').trim() || t('projects.fallback.untitled', 'مشروع بدون عنوان');
  const typeLabel = getProjectTypeLabel(resolvedProject.type);
  const startDisplay = resolvedProject.start ? formatDateTime(resolvedProject.start) : '—';
  const endDisplay = resolvedProject.end ? formatDateTime(resolvedProject.end) : '—';
  const durationDays = calculateProjectDurationDays(resolvedProject);
  const durationLabel = durationDays != null ? formatProjectDurationLabel(durationDays) : 'غير محدد';
  const projectStatus = determineProjectStatusFromDates(resolvedProject);
  const statusFallbackMap = {
    upcoming: 'قادم',
    ongoing: 'قيد التنفيذ',
    completed: 'مكتمل'
  };
  const projectStatusLabel = t(`projects.status.${projectStatus}`, statusFallbackMap[projectStatus] || projectStatus);

  const projectIdValue = resolvedProject.id != null ? String(resolvedProject.id) : null;
  const reservationsForProject = projectIdValue
    ? reservations.filter((reservation) => {
        const pid = reservation?.projectId ?? reservation?.project_id ?? null;
        return pid != null && String(pid) === projectIdValue;
      })
    : [];

  const reservationsWithMeta = reservationsForProject
    .map((reservation) => {
      const reservationId = reservation.reservationId || reservation.id || '';
      const statusRaw = reservation.status || reservation.state || 'pending';
      const statusKey = String(statusRaw).toLowerCase();
      const statusLabel = t(`reservations.status.${statusKey}`, statusKey);
      const total = resolveReservationNetTotalForProject(reservation);
      const startTimestamp = reservation.start ? new Date(reservation.start).getTime() : 0;
      return {
        reservationId: normalizeNumbers(String(reservationId || '-')),
        status: statusKey,
        statusLabel,
        total,
        totalLabel: formatCurrencyValue(total, currencyLabel),
        dateRange: combineProjectDateRange(reservation.start, reservation.end),
        startTimestamp: Number.isNaN(startTimestamp) ? 0 : startTimestamp
      };
    })
    .sort((a, b) => b.startTimestamp - a.startTimestamp)
    .map(({ startTimestamp, ...rest }) => rest);

  // Aggregate equipment + crew totals across reservations using the same
  // financial breakdown used in details, then combine with project
  // production services (expenses). Discount and company share are applied
  // at the project level as requested.
  let reservationsEquipmentSum = 0;
  let reservationsCrewSum = 0;
  try {
    reservationsForProject.forEach((reservation) => {
      const bd = calculateDraftFinancialBreakdown({
        items: Array.isArray(reservation.items) ? reservation.items : [],
        technicianIds: Array.isArray(reservation.technicians) ? reservation.technicians : [],
        crewAssignments: Array.isArray(reservation.crewAssignments) ? reservation.crewAssignments : [],
        discount: Number(reservation.discount ?? 0) || 0,
        discountType: reservation.discountType || 'percent',
        applyTax: false, // tax handled at project level
        start: reservation.start,
        end: reservation.end,
        groupingSource: reservation,
        companySharePercent: 0, // company share handled at project level
      });
      reservationsEquipmentSum += Number(bd.equipmentTotal || 0);
      reservationsCrewSum += Number(bd.crewTotal || 0);
    });
  } catch (_) { /* fallback handled below */ }

  const expensesTotalForProject = getProjectExpensesTotal(resolvedProject);
  const baseSumAll = Number(reservationsEquipmentSum + reservationsCrewSum + expensesTotalForProject);

  // Build equipment items using the same reservation grouping logic (packages, codes, etc.)
  const equipmentItems = [];
  try {
    reservationsForProject.forEach((reservation) => {
      const { groups } = buildReservationDisplayGroups(reservation);
      groups.forEach((group) => {
        const count = Number(group?.count ?? group?.quantity ?? 1) || 1;
        const rawUnitPrice = Number(group?.unitPrice);
        let unitPrice = Number.isFinite(rawUnitPrice) ? rawUnitPrice : 0;
        if (!unitPrice || unitPrice <= 0) {
          const totalCandidate = Number(group?.totalPrice);
          if (Number.isFinite(totalCandidate) && count > 0) {
            unitPrice = Number((totalCandidate / count).toFixed(2));
          }
        }
        if (!Number.isFinite(unitPrice)) unitPrice = 0;

        const isPackage = group?.type === 'package' || (Array.isArray(group?.items) && group.items.some((it) => it?.type === 'package'));
        const fallbackBarcode = Array.isArray(group?.barcodes) && group.barcodes.length
          ? group.barcodes[0]
          : (Array.isArray(group?.items) && group.items.length ? group.items[0]?.barcode : null);

        let packageCode = group?.packageDisplayCode
          ?? group?.package_code
          ?? group?.code
          ?? group?.packageCode
          ?? (Array.isArray(group?.items) && group.items.length
              ? (group.items[0]?.package_code
                ?? group.items[0]?.code
                ?? group.items[0]?.packageCode)
              : null);

        const isWeakCode = (value) => {
          const s = (value == null ? '' : String(value)).trim();
          if (!s) return true;
          if (/^pkg-/i.test(s)) return true;
          if (/^\d+$/.test(s) && s.length <= 4) return true;
          return false;
        };

        if (!packageCode || isWeakCode(packageCode)) {
          const pkgId = group?.packageId
            ?? group?.package_id
            ?? (Array.isArray(group?.items) && group.items.length ? (group.items[0]?.packageId ?? group.items[0]?.package_id) : null);
          if (pkgId) {
            try {
              const def = findPackageById(pkgId);
              if (def && def.package_code) packageCode = def.package_code;
            } catch (_) {}
          }
        }

        if (!packageCode || isWeakCode(packageCode)) {
          try {
            const targetName = normalizePackageNameForMatch(group?.description || '');
            if (targetName) {
              const list = getPackagesSnapshot();
              let match = list.find((p) => normalizePackageNameForMatch(p?.name || p?.title || p?.label || '') === targetName);
              if (!match) {
                match = list.find((p) => {
                  const n = normalizePackageNameForMatch(p?.name || p?.title || p?.label || '');
                  return n.includes(targetName) || targetName.includes(n);
                });
              }
              if (match && match.package_code) packageCode = match.package_code;
            }
          } catch (_) {}
        }

        const rawBarcode = isPackage ? (packageCode ?? fallbackBarcode ?? '') : (group?.barcode ?? fallbackBarcode ?? '');
        const barcode = rawBarcode != null ? String(rawBarcode) : '';

        const safeTotal = Number.isFinite(Number(group?.totalPrice))
          ? Number(group.totalPrice)
          : Number((unitPrice * count).toFixed(2));
        equipmentItems.push({
          ...group,
          isPackage,
          desc: group?.description,
          barcode,
          packageCodeResolved: packageCode || '',
          qty: count,
          // In the table, the "price" column represents unit price, not row total
          price: unitPrice,
          totalPrice: sanitizePriceValue(safeTotal),
          unitPriceValue: unitPrice,
        });
      });
    });
  } catch (_) {
    // Fallback silently
  }

  // Keep summarized equipment for optional sections
  const equipmentMap = new Map();
  reservationsForProject.forEach((reservation) => {
    const items = Array.isArray(reservation.items) ? reservation.items : [];
    const rentalDays = calculateReservationDays(reservation.start, reservation.end);
    const reservationLabel = reservation.reservationId || reservation.id || '';
    items.forEach((item, index) => {
      if (!item) return;
      const keyCandidate = item.barcode || item.code || item.id || item.desc || item.description || `item-${index}`;
      const key = String(keyCandidate || `item-${index}`);
      const existing = equipmentMap.get(key) || {
        description: item.desc || item.description || item.name || item.barcode || `#${normalizeNumbers(String(index + 1))}`,
        totalQuantity: 0,
        reservationsCount: 0,
        reservationIds: new Set(),
        totalCost: 0
      };
      const qty = Number(item.qty) || 1;
      const unitPrice = Number(item.price) || 0;
      existing.totalQuantity += qty;
      existing.reservationIds.add(String(reservationLabel));
      const computedCost = unitPrice * qty * Math.max(1, rentalDays);
      if (Number.isFinite(computedCost)) existing.totalCost += computedCost;
      equipmentMap.set(key, existing);
    });
  });

  const equipment = Array.from(equipmentMap.values()).map((entry) => ({
    description: entry.description,
    totalQuantity: entry.totalQuantity,
    reservationsCount: entry.reservationIds.size,
    displayCost: formatCurrencyValue(entry.totalCost, currencyLabel)
  }));

  const techniciansMap = new Map((storedTechnicians || []).filter(Boolean).map((tech) => [String(tech.id), tech]));
  const crewMap = new Map();

  const registerTechnician = (entry) => {
    if (!entry) return;
    let identifier = null;
    if (typeof entry === 'object') {
      identifier = entry.id ?? entry.technicianId ?? entry.technician_id ?? entry.userId ?? entry.user_id ?? null;
    } else if (typeof entry === 'string' || typeof entry === 'number') {
      identifier = entry;
    }

    const normalizedId = identifier != null ? String(identifier) : null;
    const base = normalizedId && techniciansMap.has(normalizedId)
      ? techniciansMap.get(normalizedId)
      : (typeof entry === 'object' ? entry : null);

    const name = base?.name || base?.full_name || base?.fullName || base?.displayName || (typeof entry === 'string' ? entry : null);
    const role = base?.role || base?.title || null;
    const phone = base?.phone || base?.mobile || base?.contact || null;

    if (!name && !normalizedId) {
      return;
    }

    const key = normalizedId || name;
    if (crewMap.has(key)) return;

    crewMap.set(key, {
      id: normalizedId,
      name: name || '-',
      role: role || null,
      phone: phone || null
    });
  };

  if (Array.isArray(resolvedProject?.technicians)) {
    resolvedProject.technicians.forEach((entry) => registerTechnician(entry));
  }

  reservationsForProject.forEach((reservation) => {
    const assignments = Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length
      ? reservation.crewAssignments
      : (Array.isArray(reservation.technicians)
          ? reservation.technicians.map((id) => ({ technicianId: id }))
          : []);
    assignments.forEach((entry) => registerTechnician(entry));
  });

  const projectCrew = Array.from(crewMap.values());

  const expenses = Array.isArray(resolvedProject.expenses)
    ? resolvedProject.expenses.map((expense) => {
        // Use sale price for display (fallback to amount if sale price not present)
        const amount = Number(expense?.salePrice ?? expense?.sale_price ?? expense?.amount) || 0;
        return {
          label: expense?.label || expense?.name || '-',
          amount,
          displayAmount: formatCurrencyValue(amount, currencyLabel),
          note: expense?.note || expense?.description || ''
        };
      })
    : [];

  // Project-level discount/share/tax applied to (equipment + crew + services)
  const applyTaxFlag = resolvedProject?.applyTax === true || resolvedProject?.applyTax === 'true';
  const discountVal = Number.parseFloat(resolvedProject?.discount ?? resolvedProject?.discountValue ?? 0) || 0;
  const discountKind = (resolvedProject?.discountType === 'amount') ? 'amount' : 'percent';
  let discountAmountAll = discountKind === 'amount'
    ? discountVal
    : baseSumAll * (discountVal / 100);
  if (!Number.isFinite(discountAmountAll) || discountAmountAll < 0) discountAmountAll = 0;
  if (discountAmountAll > baseSumAll) discountAmountAll = baseSumAll;

  const subtotalAfterDiscountAll = Math.max(0, baseSumAll - discountAmountAll);

  const shareEnabled = resolvedProject?.companyShareEnabled === true
    || resolvedProject?.company_share_enabled === true
    || resolvedProject?.companyShareApplied === true
    || resolvedProject?.company_share_applied === true;
  const sharePercentRaw = Number.parseFloat(
    resolvedProject?.companySharePercent
      ?? resolvedProject?.company_share_percent
      ?? resolvedProject?.companyShare
      ?? resolvedProject?.company_share
      ?? 0
  ) || 0;
  const sharePercent = shareEnabled && sharePercentRaw > 0 ? sharePercentRaw : 0;
  const companyShareAmountAll = sharePercent > 0
    ? Number((subtotalAfterDiscountAll * (sharePercent / 100)).toFixed(2))
    : 0;
  const preTaxTotalAll = Number((subtotalAfterDiscountAll + companyShareAmountAll).toFixed(2));

  const combinedTaxAmount = applyTaxFlag
    ? Number((preTaxTotalAll * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((preTaxTotalAll + combinedTaxAmount).toFixed(2));

  const paymentHistory = normalizeProjectPaymentHistoryForView(resolvedProject);
  const basePaidAmount = parsePaymentNumber(resolvedProject.paidAmount ?? resolvedProject.paid_amount) || 0;
  const basePaidPercent = parsePaymentNumber(resolvedProject.paidPercent ?? resolvedProject.paid_percent) || 0;
  const paymentProgress = calculatePaymentProgress({
    totalAmount: overallTotal,
    paidAmount: basePaidAmount,
    paidPercent: basePaidPercent,
    history: paymentHistory
  });
  const manualStatusRaw = typeof resolvedProject.paymentStatus === 'string'
    ? resolvedProject.paymentStatus.toLowerCase()
    : '';
  const paymentStatus = determinePaymentStatus({
    manualStatus: manualStatusRaw,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: overallTotal
  });
  const paymentStatusFallback = {
    paid: 'مدفوع',
    partial: 'مدفوع جزئياً',
    unpaid: 'غير مدفوع'
  };
  const paymentStatusLabel = t(`projects.paymentStatus.${paymentStatus}`, paymentStatusFallback[paymentStatus] || paymentStatus);

  const paidAmount = Number(paymentProgress.paidAmount || 0);
  const paidPercent = Number(paymentProgress.paidPercent || 0);
  const remainingAmount = Math.max(0, Number((overallTotal - paidAmount).toFixed(2)));

  const totalsDisplay = {
    // Keep legacy fields but repurpose according to requested presentation
    projectSubtotal: formatCurrencyValue(preTaxTotalAll, currencyLabel),
    expensesTotal: formatCurrencyValue(expensesTotalForProject, currencyLabel),
    reservationsTotal: formatCurrencyValue(preTaxTotalAll, currencyLabel), // used as "pre-tax total"
    discountAmount: formatCurrencyValue(discountAmountAll, currencyLabel),
    taxAmount: formatCurrencyValue(combinedTaxAmount, currencyLabel),
    overallTotal: formatCurrencyValue(overallTotal, currencyLabel),
    paidAmount: formatCurrencyValue(paidAmount, currencyLabel),
    remainingAmount: formatCurrencyValue(remainingAmount, currencyLabel)
  };

  const paymentSummary = {
    status: paymentStatus,
    statusLabel: paymentStatusLabel,
    paidAmount,
    paidPercent,
    remainingAmount,
    paidAmountDisplay: formatCurrencyValue(paidAmount, currencyLabel),
    remainingAmountDisplay: formatCurrencyValue(remainingAmount, currencyLabel),
    paidPercentDisplay: formatPercentageValue(paidPercent)
  };

  const notes = (resolvedProject.description || '').trim();

  const clientCompanyDisplay = projectCompany || '—';

  return {
    project: resolvedProject,
    customer,
    clientInfo: {
      name: clientName,
      company: clientCompanyDisplay,
      phone: clientPhone,
      email: clientEmail
    },
    projectInfo: {
      title: projectTitle,
      code: projectCodeDisplay,
      typeLabel,
      startDisplay,
      endDisplay,
      durationLabel,
      statusLabel: projectStatusLabel
    },
    expenses,
    equipment,
    crew: projectCrew,
    equipmentItems,
    crewAssignments: reservationsForProject.flatMap((reservation) => collectReservationCrewAssignments(reservation)),
    totals: {
      equipmentEstimate: reservationsEquipmentSum, // informative
      expensesTotal: expensesTotalForProject,
      baseSubtotal: baseSumAll,
      discountAmount: discountAmountAll,
      subtotalAfterDiscount: subtotalAfterDiscountAll,
      companyShareAmount: companyShareAmountAll,
      subtotal: preTaxTotalAll,
      applyTax: applyTaxFlag,
      taxAmount: combinedTaxAmount,
      totalWithTax: overallTotal
    },
    totalsDisplay,
    projectTotals: {
      combinedTaxAmount,
      overallTotal,
      reservationsTotal: preTaxTotalAll,
      paidAmount,
      paidPercent,
      remainingAmount,
      paymentStatus
    },
    paymentSummary,
    notes,
    currencyLabel,
    projectStatus,
    projectStatusLabel,
    projectDurationDays: durationDays,
    projectDurationLabel: durationLabel,
    paymentHistory
  };
}
