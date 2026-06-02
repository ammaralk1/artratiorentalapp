import { normalizeNumbers } from '../../utils.js';
import { DEFAULT_COMPANY_SHARE_PERCENT, calculateDraftFinancialBreakdown, calculatePaymentProgress, determinePaymentStatus } from '../../reservationsSummary.js';
import { parsePriceValue } from '../../reservationsShared.js';
import { findPackageById, resolvePackageItems } from '../../reservationsPackages.js';
import { sanitizePriceValue, toNumber, toPositiveInt, normalizeReservationItemType, normalizePackageIdentifier, resolveEquipmentIdValue, debugLogPackages, normalizeStatusValue, normalisePaidStatus } from './utils.js';
import { getCachedReservationPackages, getCachedReservationItemCosts, getCachedReservationCrew, persistReservationPackagesToCache, inferPackagesFromItems, hasRichCrewData } from './cache.js';
import { normalizePaymentHistoryCollection, extractPaymentHistoryFromCandidates, normalizePaymentType } from './payment.js';
import { mergePackageCollections, dedupePackages, mapReservationPackagesFromSource, normalizeReservationPackageItemsFromEntry, derivePackageUnitPrice, resolvePackageMergeKey, mergePackageRecords, derivePackageMergeKey, normalizeItemsWithPackages } from './packages.js';

// reservationsState is owned by api.js; mapping.js accesses it via this getter.
// api.js calls setMappingStateGetter(getReservationsState) at module initialization.
let _getReservationsStateFn = null;

export function setMappingStateGetter(fn) {
  _getReservationsStateFn = fn;
}

function getReservationsStateInternal() {
  if (_getReservationsStateFn) {
    return _getReservationsStateFn();
  }
  return [];
}

export function normalizeCrewAssignmentEntry(entry, index = 0) {
  if (entry == null) {
    return null;
  }

  if (typeof entry !== 'object') {
    const technicianId = entry != null ? String(entry) : null;
    return {
      assignmentId: `crew-${index}-${technicianId ?? 'unassigned'}`,
      positionId: null,
      positionKey: null,
      positionLabel: '',
      positionLabelAlt: '',
      positionLabelAr: null,
      positionLabelEn: null,
      positionCost: 0,
      positionClientPrice: 0,
      technicianId,
      technicianName: null,
      technicianRole: null,
      notes: null,
    };
  }

  const assignmentId = entry.assignment_id
    ?? entry.assignmentId
    ?? entry.id
    ?? entry.technician_id
    ?? entry.technicianId
    ?? `crew-${index}`;
  const positionObj = (entry && typeof entry.position === 'object') ? entry.position : null;
  const positionId = (
    entry.position_id
    ?? entry.positionId
    ?? entry.position
    ?? entry.position_code
    ?? (positionObj?.id ?? positionObj?.code)
    ?? null
  );
  const positionKey = (
    entry.position_key
    ?? entry.positionKey
    ?? entry.position_code
    ?? entry.positionId
    ?? positionObj?.name
    ?? positionObj?.key
    ?? null
  );
  let positionLabel = entry.position_name
    ?? entry.positionName
    ?? entry.position_label
    ?? entry.position_title
    ?? positionObj?.label_ar
    ?? positionObj?.label_en
    ?? positionObj?.name
    ?? entry.role
    ?? entry.position
    ?? '';
  if (!positionLabel) {
    positionLabel = entry.position_label_ar
      ?? entry.position_title_ar
      ?? entry.position_name_ar
      ?? entry.position_label_en
      ?? entry.position_title_en
      ?? entry.position_name_en
      ?? '';
  }
  const positionLabelAr = entry.position_label_ar ?? null;
  const positionLabelEn = entry.position_label_en ?? null;
  const positionLabelAlt = entry.position_label_alt
    ?? positionLabelEn
    ?? positionLabelAr
    ?? '';

  const positionCostRaw = entry.position_cost
    ?? entry.positionCost
    ?? entry.cost
    ?? entry.daily_wage
    ?? entry.dailyWage
    ?? positionObj?.cost
    ?? positionObj?.daily_wage
    ?? positionObj?.dailyWage
    ?? entry.internal_cost
    ?? null;
  const positionClientPriceRaw = entry.position_client_price
    ?? entry.positionClientPrice
    ?? entry.client_price
    ?? entry.customer_price
    ?? entry.position_price
    ?? positionObj?.client_price
    ?? positionObj?.clientPrice
    ?? entry.clientPrice
    ?? entry.daily_total
    ?? entry.dailyTotal
    ?? entry.total
    ?? entry.price
    ?? null;

  const positionCost = sanitizePriceValue(parsePriceValue(positionCostRaw));
  const positionClientPrice = sanitizePriceValue(parsePriceValue(positionClientPriceRaw));

  const technicianObj = (entry && typeof entry.technician === 'object') ? entry.technician : null;
  const technicianId = entry.technician_id
    ?? entry.technicianId
    ?? entry.id
    ?? technicianObj?.id
    ?? entry.userId
    ?? entry.user_id
    ?? null;
  const technicianName = entry.technician_name
    ?? entry.technicianName
    ?? entry.name
    ?? technicianObj?.name
    ?? entry.full_name
    ?? null;
  const technicianRole = entry.role ?? technicianObj?.role ?? entry.specialization ?? null;
  const technicianPhone = entry.technician_phone ?? technicianObj?.phone ?? entry.phone ?? null;

  return {
    assignmentId: String(assignmentId),
    positionId: positionId != null ? String(positionId) : null,
    positionKey: positionKey != null ? String(positionKey) : null,
    positionLabel: positionLabel != null ? String(positionLabel) : '',
    positionLabelAlt: positionLabelAlt != null ? String(positionLabelAlt) : '',
    positionLabelAr: positionLabelAr != null ? String(positionLabelAr) : null,
    positionLabelEn: positionLabelEn != null ? String(positionLabelEn) : null,
    positionCost: Number.isFinite(positionCost) ? positionCost : 0,
    positionClientPrice: Number.isFinite(positionClientPrice) ? positionClientPrice : 0,
    technicianId: technicianId != null ? String(technicianId) : null,
    technicianName: technicianName != null ? String(technicianName) : null,
    technicianRole: technicianRole != null ? String(technicianRole) : null,
    technicianPhone: technicianPhone != null ? String(technicianPhone) : null,
    notes: entry.notes ?? null,
  };
}

export function mapReservationItem(item = {}) {
  if (!item || typeof item !== 'object') {
    return {
      id: '',
      equipmentId: null,
      barcode: '',
      desc: '',
      qty: 1,
      price: 0,
      cost: 0,
      notes: null,
      image: null,
    };
  }

  const equipmentId = item.equipment_id ?? item.equipmentId ?? item.item_id ?? item.itemId ?? null;
  const quantity = toPositiveInt(
    item.quantity
      ?? item.qty
      ?? item.count
      ?? item.units
      ?? item.unit_qty
      ?? item.unitQty
      ?? item.unit_count
      ?? item.unitCount
      ?? item.package_quantity
      ?? item.packageQty
      ?? 1
  );
  const unitPrice = toNumber(item.unit_price ?? item.unitPrice ?? item.price ?? item.total_price ?? item.total ?? 0);
  const unitCost = toNumber(
    item.unit_cost
      ?? item.unitCost
      ?? item.cost
      ?? item.rental_cost
      ?? item.purchase_price
      ?? 0
  );
  const barcode = normalizeNumbers(String(item.barcode ?? item.code ?? item.serial ?? ''));
  const desc = item.description ?? item.desc ?? item.name ?? item.title ?? '';

  const mapped = {
    id: item.id != null ? String(item.id) : (equipmentId != null ? String(equipmentId) : ''),
    equipmentId,
    barcode,
    desc,
    qty: quantity,
    quantity,
    qtyPerPackage: null,
    totalQuantity: quantity,
    price: unitPrice,
    cost: unitCost,
    notes: item.notes ?? null,
    image: item.image ?? item.image_url ?? item.imageUrl ?? null,
  };

  const normalizedType = normalizeReservationItemType(item.type ?? item.item_type ?? item.kind ?? null);
  const packageIdRaw = item.packageId ?? item.package_id ?? item.package_code ?? item.packageCode ?? item.bundleId ?? null;
  const normalizedPackageId = normalizePackageIdentifier(packageIdRaw);
  const packageItems = normalizeReservationPackageItemsFromEntry(item, normalizedPackageId);

  if (normalizedType === 'package' || normalizedPackageId || packageItems.length) {
    mapped.type = 'package';
    const packageId = normalizedPackageId || (equipmentId != null ? String(equipmentId) : (mapped.id ? normalizePackageIdentifier(mapped.id) : ''));
    if (packageId) {
      mapped.packageId = packageId;
      mapped.package_id = packageId;
      mapped.package_code = item.package_code ?? item.packageCode ?? packageId;
    }
    mapped.name = desc || mapped.package_code || packageId || '';
    mapped.barcode = mapped.barcode || normalizeNumbers(String(item.package_code ?? item.packageCode ?? ''));
    mapped.packageItems = packageItems;

    const derivedUnitPrice = derivePackageUnitPrice({
      ...item,
      unit_price: item.unit_price ?? item.unitPrice ?? item.price,
      total_price: item.total_price ?? item.totalPrice ?? item.total,
    }, packageItems, quantity);
    if (!Number.isFinite(mapped.price) || mapped.price <= 0 || mapped.price > derivedUnitPrice * 10) {
      mapped.price = derivedUnitPrice;
    }
    mapped.qtyPerPackage = packageItems.length ? packageItems[0]?.qtyPerPackage ?? mapped.qtyPerPackage : mapped.qtyPerPackage;
    mapped.totalQuantity = quantity;
  }

  return mapped;
}

export function toInternalReservation(raw = {}) {
  const idValue = raw.id ?? raw.reservation_id ?? raw.reservationId ?? null;
  const reservationCode = raw.reservation_code ?? raw.reservationCode ?? raw.reservationId ?? (idValue != null ? `RSV-${idValue}` : null);

  let items = Array.isArray(raw.items)
    ? raw.items.map(mapReservationItem)
    : [];

  const rawPackagesSnapshot = Array.isArray(raw.packagesRaw)
    ? raw.packagesRaw.map((pkg) => ({ ...pkg }))
    : (Array.isArray(raw.packages) ? raw.packages.map((pkg) => ({ ...pkg })) : []);

  let packages = mapReservationPackagesFromSource(raw);

  // Prefer richest source first: crewAssignments > techniciansDetails > technicians
  const technicianEntriesSource = Array.isArray(raw.crewAssignments) && raw.crewAssignments.length
    ? raw.crewAssignments
    : (Array.isArray(raw.techniciansDetails) && raw.techniciansDetails.length
        ? raw.techniciansDetails
        : (Array.isArray(raw.technicians) ? raw.technicians : []));

  let crewAssignments = technicianEntriesSource
    .map((entry, index) => normalizeCrewAssignmentEntry(entry, index))
    .filter(Boolean);

  let techniciansDetails = crewAssignments.map((assignment, index) => {
    const sourceEntry = technicianEntriesSource?.[index];
    const base = sourceEntry && typeof sourceEntry === 'object'
      ? { ...sourceEntry }
      : (sourceEntry != null ? { id: sourceEntry } : {});
    return {
      ...base,
      ...assignment,
    };
  });

  if (false && ((!Array.isArray(crewAssignments) || crewAssignments.length === 0) || !hasRichCrewData(crewAssignments))) {
    const cacheKey = idValue ?? reservationCode ?? raw.reservation_code ?? raw.reservationId ?? null;
    if (cacheKey != null) {
      const cachedCrew = getCachedReservationCrew(cacheKey);
      if (Array.isArray(cachedCrew) && cachedCrew.length && hasRichCrewData(cachedCrew)) {
        crewAssignments = cachedCrew.map((entry, index) => normalizeCrewAssignmentEntry(entry, index)).filter(Boolean);
        techniciansDetails = crewAssignments.map((assignment) => ({ ...assignment }));
      }
    }
  }

  const technicianIds = crewAssignments
    .map((assignment) => assignment.technicianId)
    .filter((value) => value != null && value !== '')
    .map((value) => Number.isNaN(Number(value)) ? String(value) : Number(value));

  const start = raw.start ?? raw.start_datetime ?? '';
  const end = raw.end ?? raw.end_datetime ?? '';

  let totalAmount = toNumber(raw.total_amount ?? raw.totalAmount ?? raw.cost ?? 0);
  const discount = toNumber(raw.discount ?? 0);
  const discountType = raw.discount_type ?? raw.discountType ?? 'percent';
  const normalizedDiscountType = ['percent', 'amount'].includes(discountType) ? discountType : 'percent';
  const applyTax = Boolean(raw.apply_tax ?? raw.applyTax ?? false);
  let paidStatus = normalisePaidStatus(raw.paid_status ?? raw.paidStatus ?? (raw.paid === true || raw.paid === 'paid' ? 'paid' : 'unpaid')) ?? 'unpaid';
  const confirmed = raw.confirmed != null
    ? Boolean(raw.confirmed)
    : ['confirmed', 'in_progress', 'completed'].includes(String(raw.status ?? '').toLowerCase());

  const rawCompanySharePercent = raw.company_share_percent
    ?? raw.companySharePercent
    ?? raw.company_share
    ?? raw.companyShare
    ?? null;
  const parsedCompanySharePercent = rawCompanySharePercent != null
    ? Number.parseFloat(normalizeNumbers(String(rawCompanySharePercent).replace('%', '').trim()))
    : NaN;
  const shareEnabledRaw = raw.company_share_enabled
    ?? raw.companyShareEnabled
    ?? raw.company_share_applied
    ?? raw.companyShareApplied
    ?? null;
  let companyShareEnabled = shareEnabledRaw != null
    ? (shareEnabledRaw === true || shareEnabledRaw === 1 || shareEnabledRaw === '1' || String(shareEnabledRaw).toLowerCase() === 'true')
    : Number.isFinite(parsedCompanySharePercent) && parsedCompanySharePercent > 0;
  let companySharePercent = companyShareEnabled && Number.isFinite(parsedCompanySharePercent)
    ? Number(parsedCompanySharePercent)
    : 0;
  const companyShareAmountRaw = raw.company_share_amount ?? raw.companyShareAmount;
  let companyShareAmount = Number.isFinite(Number(companyShareAmountRaw))
    ? Number(companyShareAmountRaw)
    : NaN;
  if (applyTax && companySharePercent <= 0) {
    companySharePercent = DEFAULT_COMPANY_SHARE_PERCENT;
    companyShareEnabled = true;
  }

  const breakdown = calculateDraftFinancialBreakdown({
    items,
    technicianIds,
    crewAssignments,
    discount,
    discountType: normalizedDiscountType,
    applyTax,
    start,
    end,
    companySharePercent: companySharePercent > 0 ? companySharePercent : null
  });

  if (!Number.isFinite(totalAmount) || totalAmount <= 0 || applyTax) {
    totalAmount = breakdown.finalTotal;
  }

  if (!Number.isFinite(companyShareAmount) || companyShareAmount < 0) {
    companyShareAmount = breakdown.companyShareAmount;
  }
  companyShareAmount = Number.isFinite(companyShareAmount)
    ? Number(companyShareAmount.toFixed(2))
    : 0;

  if (!companyShareEnabled && companySharePercent > 0) {
    companyShareEnabled = true;
  }

  const candidateHistories = [
    raw.payment_history,
    raw.paymentHistory,
    raw.payments,
    raw.payment_records,
    raw.paymentRecords,
    raw.payment_logs,
    raw.paymentLogs,
    raw.paymenthistory,
    raw.paymentHistoryList,
    raw.payment,
  ];

  const rawHistory = extractPaymentHistoryFromCandidates(candidateHistories);
  const paymentHistory = normalizePaymentHistoryCollection(rawHistory);

  const reservationCacheKey = idValue != null ? idValue : (reservationCode ?? raw.reservation_code ?? raw.reservationId ?? null);
  if (!packages.length) {
    const cachedPackages = getCachedReservationPackages(reservationCacheKey);
    if (cachedPackages.length) {
      packages = mergePackageCollections(packages, cachedPackages);
    }
  } else {
    persistReservationPackagesToCache(reservationCacheKey, packages);
  }

  // Try to infer package groups from flat items when API doesn't return packages
  if (!packages.length && Array.isArray(items) && items.length) {
    try {
      const inferred = inferPackagesFromItems(items);
      if (Array.isArray(inferred) && inferred.length) {
        packages = mergePackageCollections(packages, inferred);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('[reservationsService] inference of packages from items failed', error);
    }
  }

  const normalizedResult = normalizeItemsWithPackages(items, packages);
  items = normalizedResult.items;
  packages = mergePackageCollections(packages, normalizedResult.packages);

  const paymentProgress = calculatePaymentProgress({
    totalAmount,
    progressType: raw.payment_progress_type ?? raw.paymentProgressType ?? null,
    progressValue: raw.payment_progress_value ?? raw.paymentProgressValue ?? null,
    paidAmount: raw.paid_amount ?? raw.paidAmount ?? null,
    paidPercent: raw.paid_percentage ?? raw.paidPercentage ?? null,
    history: paymentHistory,
  });
  paidStatus = determinePaymentStatus({
    manualStatus: paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount,
  });
  const paid = paidStatus === 'paid';

  const normalizedStatus = normalizeStatusValue(raw.status ?? (confirmed ? 'confirmed' : 'pending'));

  return {
    id: idValue != null ? String(idValue) : '',
    reservationId: reservationCode ?? (idValue != null ? String(idValue) : ''),
    reservationCode: reservationCode ?? null,
    customerId: raw.customer_id ?? raw.customerId ?? raw.customer?.id ?? null,
    customerName: raw.customer_name ?? raw.customerName ?? raw.customer?.full_name ?? raw.customer?.customerName ?? '',
    title: raw.title ?? raw.name ?? '',
    start,
    end,
    status: normalizedStatus,
    completed: normalizedStatus === 'completed',
    confirmed,
    location: raw.location ?? '',
    notes: raw.notes ?? '',
    discount,
    discountType: normalizedDiscountType,
    applyTax,
    paid,
    paidStatus,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    paymentHistory,
    payment_history: paymentHistory,
    totalAmount,
    cost: totalAmount,
    projectId: raw.project_id ?? raw.projectId ?? null,
    items,
    technicians: technicianIds,
    crewAssignments,
    techniciansDetails,
    startDatetime: start,
    endDatetime: end,
    customerPhone: raw.customer_phone ?? raw.customerPhone ?? null,
    packages,
    packagesRaw: rawPackagesSnapshot,
    companySharePercent,
    companyShareAmount,
    companyShareEnabled,
  };
}

export function mapLegacyReservation(raw = {}) {
  return toInternalReservation(raw);
}

export function mapReservationFromApi(raw = {}) {
  const mapped = toInternalReservation({
    id: raw.id,
    reservationId: raw.reservation_code ?? raw.reservationId,
    reservation_code: raw.reservation_code,
    customer_id: raw.customer_id,
    customerId: raw.customer_id,
    customer_name: raw.customer_name,
    customerName: raw.customer_name,
    title: raw.title,
    start: raw.start_datetime,
    end: raw.end_datetime,
    start_datetime: raw.start_datetime,
    end_datetime: raw.end_datetime,
    status: raw.status,
    confirmed: raw.confirmed,
    location: raw.location,
    notes: raw.notes,
    total_amount: raw.total_amount,
    project_id: raw.project_id,
    discount: raw.discount,
    discount_type: raw.discount_type,
    apply_tax: raw.apply_tax,
    paid_status: raw.paid_status,
    items: raw.items,
    packages: raw.packages,
    reservation_packages: raw.reservation_packages,
    reservationPackages: raw.reservationPackages,
    technicians: raw.technicians,
    company_share_percent: raw.company_share_percent ?? raw.companySharePercent ?? raw.company_share ?? raw.companyShare,
    company_share_enabled: raw.company_share_enabled ?? raw.companyShareEnabled ?? raw.company_share_applied ?? raw.companyShareApplied,
    company_share_amount: raw.company_share_amount ?? raw.companyShareAmount,
    payment_history: raw.payment_history ?? raw.paymentHistory ?? raw.payments ?? raw.paymentLogs ?? raw.payment_records,
    paymentHistory: raw.paymentHistory ?? raw.payment_history ?? raw.payments ?? raw.paymentLogs ?? raw.payment_records,
  });
  if (Array.isArray(raw.packages)) {
    try {
      mapped.packagesRaw = raw.packages.map((pkg) => ({ ...pkg }));
      const rawPackages = mapReservationPackagesFromSource({ packages: raw.packages });
      if (rawPackages.length) {
        mapped.packages = mergePackageCollections(rawPackages, mapped.packages || []);
      }
    } catch (_) {
      mapped.packagesRaw = Array.isArray(mapped.packagesRaw) ? mapped.packagesRaw : [];
    }
  } else {
    mapped.packagesRaw = Array.isArray(mapped.packagesRaw) ? mapped.packagesRaw : [];
  }
  mapped.packages = dedupePackages(mapped.packages);
  debugLogPackages('mapReservationFromApi', mapped.packages);
  return mergeItemCostsFromCache(mergeItemCostsFromExistingSafe(mapped));
}

export function applyPayloadPackages(reservation, payloadPackages) {
  if (!reservation || !Array.isArray(payloadPackages) || payloadPackages.length === 0) {
    return reservation;
  }
  try {
    const normalized = mapReservationPackagesFromSource({ packages: payloadPackages });
    if (normalized.length) {
      reservation.packages = mergePackageCollections(normalized, reservation.packages || []);
    }
  } catch (error) {
    console.warn('[reservationsService] Failed to normalize payload packages', error);
  }
  try {
    reservation.packagesRaw = payloadPackages.map((pkg) => ({ ...pkg }));
  } catch (_) {
    reservation.packagesRaw = payloadPackages;
  }
  reservation.packages = dedupePackages(reservation.packages);
  debugLogPackages('applyPayloadPackages', payloadPackages);
  return reservation;
}

export function mergeItemCostsFromPayload(items, payloadItems) {
  if (!Array.isArray(items) || !Array.isArray(payloadItems)) return items;
  const payloadMap = new Map();
  payloadItems.forEach((entry, idx) => {
    if (!entry || typeof entry !== 'object') return;
    const equipmentId = entry.equipment_id ?? entry.equipmentId ?? entry.id ?? null;
    const barcode = normalizeNumbers(String(entry.barcode ?? '')).trim();
    const key = equipmentId != null ? `id:${equipmentId}` : (barcode ? `bc:${barcode}` : `idx:${idx}`);
    const costValue = Number.isFinite(Number(entry.unit_cost))
      ? Number(entry.unit_cost)
      : Number.isFinite(Number(entry.cost))
        ? Number(entry.cost)
        : null;
    const priceValue = Number.isFinite(Number(entry.unit_price))
      ? Number(entry.unit_price)
      : Number.isFinite(Number(entry.price))
        ? Number(entry.price)
        : null;
    payloadMap.set(key, { cost: costValue, price: priceValue });
  });

  return items.map((item, idx) => {
    const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? null;
    const barcode = normalizeNumbers(String(item.barcode ?? '')).trim();
    const keyCandidates = [
      equipmentId != null ? `id:${equipmentId}` : null,
      barcode ? `bc:${barcode}` : null,
      `idx:${idx}`,
    ].filter(Boolean);
    let payloadEntry = null;
    for (const key of keyCandidates) {
      if (payloadMap.has(key)) {
        payloadEntry = payloadMap.get(key);
        break;
      }
    }
    if (!payloadEntry) return item;
    const merged = { ...item };
    if (Number.isFinite(payloadEntry.cost)) {
      merged.cost = payloadEntry.cost;
      merged.unit_cost = payloadEntry.cost;
    }
    if (Number.isFinite(payloadEntry.price)) {
      merged.price = payloadEntry.price;
      merged.unit_price = payloadEntry.price;
    }
    return merged;
  });
}

function mergeItemCostsFromExistingSafe(reservation) {
  try {
    return mergeItemCostsFromExisting(reservation);
  } catch (error) {
    console.warn('[reservationsService] mergeItemCostsFromExisting failed', error);
    return reservation;
  }
}

function mergeItemCostsFromExisting(reservation) {
  if (!reservation || typeof reservation !== 'object') return reservation;
  if (!Array.isArray(reservation.items) || reservation.items.length === 0) return reservation;

  const idCandidates = [
    reservation.id,
    reservation.reservationId,
    reservation.reservation_code,
  ].map((v) => (v != null ? String(v) : '')).filter(Boolean);
  if (!idCandidates.length) return reservation;

  const reservationsState = getReservationsStateInternal();
  const existing = reservationsState.find((r) => {
    if (!r) return false;
    const rid = r.id != null ? String(r.id) : '';
    const rc = r.reservationId != null ? String(r.reservationId) : '';
    const rcode = r.reservation_code != null ? String(r.reservation_code) : '';
    return (rid && idCandidates.includes(rid))
      || (rc && idCandidates.includes(rc))
      || (rcode && idCandidates.includes(rcode));
  });
  if (!existing || !Array.isArray(existing.items)) return reservation;

  const existingItemsIndex = new Map();
  existing.items.forEach((item, idx) => {
    const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
    const barcode = normalizeNumbers(String(item?.barcode ?? '')).trim();
    const key = equipmentId != null ? `id:${equipmentId}` : (barcode ? `bc:${barcode}` : `idx:${idx}`);
    existingItemsIndex.set(key, item);
  });

  const mergedItems = reservation.items.map((item, idx) => {
    const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
    const barcode = normalizeNumbers(String(item?.barcode ?? '')).trim();
    const keys = [
      equipmentId != null ? `id:${equipmentId}` : null,
      barcode ? `bc:${barcode}` : null,
      `idx:${idx}`,
    ].filter(Boolean);
    let existingItem = null;
    for (const key of keys) {
      if (existingItemsIndex.has(key)) {
        existingItem = existingItemsIndex.get(key);
        break;
      }
    }
    if (!existingItem) return item;
    const merged = { ...item };
    const existingCost = Number(existingItem.cost ?? existingItem.unit_cost);
    const existingPrice = Number(existingItem.price ?? existingItem.unit_price);
    const currentCost = Number(item.cost ?? item.unit_cost);
    const currentPrice = Number(item.price ?? item.unit_price);
    if (Number.isFinite(existingCost) && existingCost > 0 && (!Number.isFinite(currentCost) || currentCost <= 0)) {
      merged.cost = existingCost;
      merged.unit_cost = existingCost;
    }
    if (Number.isFinite(existingPrice) && existingPrice > 0 && (!Number.isFinite(currentPrice) || currentPrice <= 0)) {
      merged.price = existingPrice;
      merged.unit_price = existingPrice;
    }
    return merged;
  });

  const reservationWithMergedItems = { ...reservation, items: mergedItems };
  return mergePackageCostsFromExisting(reservationWithMergedItems);
}

function mergePackageCostsFromExisting(reservation) {
  if (!reservation || typeof reservation !== 'object') return reservation;
  const hasPackages = Array.isArray(reservation.packages) && reservation.packages.length;
  const hasRawPackages = Array.isArray(reservation.packagesRaw) && reservation.packagesRaw.length;
  if (!hasPackages && !hasRawPackages) return reservation;

  const idCandidates = [
    reservation.id,
    reservation.reservationId,
    reservation.reservation_id,
    reservation.reservationCode,
    reservation.reservation_code,
  ].map((v) => (v != null ? String(v) : '')).filter(Boolean);
  if (!idCandidates.length) return reservation;

  const reservationsState = getReservationsStateInternal();
  const existing = reservationsState.find((r) => {
    if (!r) return false;
    const rid = r.id != null ? String(r.id) : '';
    const rc = r.reservationId != null ? String(r.reservationId) : '';
    const rcode = r.reservation_code != null ? String(r.reservation_code) : '';
    return (rid && idCandidates.includes(rid))
      || (rc && idCandidates.includes(rc))
      || (rcode && idCandidates.includes(rcode));
  });
  if (!existing) return reservation;

  const existingPackages = []
    .concat(Array.isArray(existing.packages) ? existing.packages : [])
    .concat(Array.isArray(existing.packagesRaw) ? existing.packagesRaw : []);

  const existingMap = new Map();
  existingPackages.forEach((pkg) => {
    if (!pkg || typeof pkg !== 'object') return;
    const key = derivePackageMergeKey(pkg);
    if (!key) return;
    const cost = parsePriceValue(
      pkg.unit_cost
        ?? pkg.unitCost
        ?? pkg.cost
        ?? pkg.package_cost
        ?? pkg.rental_cost
        ?? pkg.purchase_price
        ?? pkg.internal_cost
        ?? pkg.equipment_cost
        ?? pkg.item_cost
    );
    if (!Number.isFinite(cost) || cost <= 0) return;
    if (!existingMap.has(key)) {
      existingMap.set(key, cost);
    }
  });
  if (!existingMap.size) return reservation;

  const applyCost = (pkg) => {
    if (!pkg || typeof pkg !== 'object') return;
    const currentCost = parsePriceValue(
      pkg.unit_cost
        ?? pkg.unitCost
        ?? pkg.cost
        ?? pkg.package_cost
        ?? pkg.rental_cost
        ?? pkg.purchase_price
        ?? pkg.internal_cost
        ?? pkg.equipment_cost
        ?? pkg.item_cost
    );
    if (Number.isFinite(currentCost) && currentCost > 0) return;
    const key = derivePackageMergeKey(pkg);
    if (!key || !existingMap.has(key)) return;
    const cost = sanitizePriceValue(existingMap.get(key));
    pkg.unit_cost = cost;
    pkg.unitCost = cost;
    pkg.cost = cost;
    if (typeof pkg.total_cost !== 'number' || !Number.isFinite(pkg.total_cost) || pkg.total_cost === 0) {
      const qty = Number.isFinite(Number(pkg.quantity)) ? Number(pkg.quantity) : 1;
      pkg.total_cost = Number((cost * qty).toFixed(2));
    }
    if (!Number.isFinite(parsePriceValue(pkg.rental_cost))) pkg.rental_cost = cost;
    if (!Number.isFinite(parsePriceValue(pkg.purchase_price))) pkg.purchase_price = cost;
    if (!Number.isFinite(parsePriceValue(pkg.internal_cost))) pkg.internal_cost = cost;
    if (!Number.isFinite(parsePriceValue(pkg.equipment_cost))) pkg.equipment_cost = cost;
    if (!Number.isFinite(parsePriceValue(pkg.item_cost))) pkg.item_cost = cost;
  };

  if (Array.isArray(reservation.packages)) {
    reservation.packages.forEach(applyCost);
  }
  if (Array.isArray(reservation.packagesRaw)) {
    reservation.packagesRaw.forEach(applyCost);
  }
  return reservation;
}

function mergeItemCostsFromCache(reservation) {
  if (!reservation || typeof reservation !== 'object') return reservation;
  if (!Array.isArray(reservation.items) || reservation.items.length === 0) return reservation;

  const idCandidates = [
    reservation.id,
    reservation.reservationId,
    reservation.reservation_code,
  ].map((v) => (v != null ? String(v) : '')).filter(Boolean);
  if (!idCandidates.length) return reservation;

  let cachedItems = [];
  for (const key of idCandidates) {
    cachedItems = getCachedReservationItemCosts(key);
    if (cachedItems.length) break;
  }
  if (!cachedItems.length) return reservation;

  const cachedIndex = new Map();
  cachedItems.forEach((entry, idx) => {
    if (!entry || typeof entry !== 'object') return;
    const equipmentId = entry.equipmentId ?? entry.equipment_id ?? null;
    const barcode = normalizeNumbers(String(entry.barcode ?? '')).trim();
    const key = equipmentId != null ? `id:${equipmentId}` : (barcode ? `bc:${barcode}` : `idx:${idx}`);
    cachedIndex.set(key, entry);
  });

  const mergedItems = reservation.items.map((item, idx) => {
    const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
    const barcode = normalizeNumbers(String(item?.barcode ?? '')).trim();
    const keys = [
      equipmentId != null ? `id:${equipmentId}` : null,
      barcode ? `bc:${barcode}` : null,
      `idx:${idx}`,
    ].filter(Boolean);
    let cached = null;
    for (const key of keys) {
      if (cachedIndex.has(key)) {
        cached = cachedIndex.get(key);
        break;
      }
    }
    if (!cached) return item;
    const merged = { ...item };
    const cachedCost = sanitizePriceValue(toNumber(cached.cost ?? cached.unit_cost));
    const cachedPrice = sanitizePriceValue(toNumber(cached.price ?? cached.unit_price));
    const hasCachedCost = Number.isFinite(cachedCost);
    const hasCachedPrice = Number.isFinite(cachedPrice);
    const currentCost = Number(item.cost);
    const currentPrice = Number(item.price);
    if (hasCachedCost && (!Number.isFinite(currentCost) || currentCost <= 0)) {
      merged.cost = cachedCost;
      merged.unit_cost = cachedCost;
    }
    if (hasCachedPrice && (!Number.isFinite(currentPrice) || currentPrice <= 0)) {
      merged.price = cachedPrice;
      merged.unit_price = cachedPrice;
    }
    return merged;
  });

  return { ...reservation, items: mergedItems };
}

export function buildReservationPayload({
  reservationCode,
  customerId,
  start,
  end,
  status,
  title,
  location,
  notes,
  projectId,
  totalAmount,
  discount,
  discountType,
  applyTax,
  paidStatus,
  confirmed,
  items,
  packages,
  crewAssignments = [],
  technicians = crewAssignments,
  companySharePercent,
  companyShareEnabled,
  paidAmount,
  paidPercentage,
  paymentProgressType,
  paymentProgressValue,
  paymentHistory,
}) {
  const assignments = Array.isArray(crewAssignments) ? crewAssignments : [];

  return {
    reservation_code: reservationCode ?? null,
    customer_id: customerId,
    start_datetime: start,
    end_datetime: end,
    status: status ?? 'pending',
    title: title ?? null,
    location: location ?? null,
    notes: notes ?? null,
    project_id: projectId || null,
    total_amount: totalAmount ?? 0,
    discount: discount ?? 0,
    discount_type: discountType ?? 'percent',
    apply_tax: applyTax ? 1 : 0,
    paid_status: paidStatus ?? 'unpaid',
    paid_amount: Number.isFinite(paidAmount) ? toNumber(paidAmount) : 0,
    paid_percentage: Number.isFinite(paidPercentage) ? Number(paidPercentage.toFixed(2)) : 0,
    payment_progress_type: paymentProgressType ?? null,
    payment_progress_value: Number.isFinite(paymentProgressValue)
      ? Number(paymentProgressValue.toFixed(2))
      : null,
    payment_history: Array.isArray(paymentHistory)
      ? paymentHistory.map((entry) => ({
          type: normalizePaymentType(entry?.type ?? entry?.payment_type ?? entry?.method ?? entry?.paymentMethod),
          value: entry?.value != null ? toNumber(entry.value) : null,
          amount: entry?.amount != null ? toNumber(entry.amount) : (entry?.payment_amount != null ? toNumber(entry.payment_amount) : null),
          percentage: entry?.percentage != null
            ? Number(entry.percentage)
            : (entry?.payment_percentage != null ? Number(entry.payment_percentage) : null),
          note: entry?.note ?? entry?.notes ?? entry?.comment ?? entry?.payment_note ?? null,
          recorded_at: entry?.recordedAt
            ?? entry?.recorded_at
            ?? entry?.createdAt
            ?? entry?.created_at
            ?? entry?.payment_date
            ?? entry?.date
            ?? new Date().toISOString(),
        }))
      : [],
    payments: Array.isArray(paymentHistory)
      ? paymentHistory.map((entry) => ({
          type: normalizePaymentType(entry?.type ?? entry?.payment_type ?? entry?.method ?? entry?.paymentMethod),
          value: entry?.value != null ? toNumber(entry.value) : null,
          amount: entry?.amount != null ? toNumber(entry.amount) : (entry?.payment_amount != null ? toNumber(entry.payment_amount) : null),
          percentage: entry?.percentage != null
            ? Number(entry.percentage)
            : (entry?.payment_percentage != null ? Number(entry.payment_percentage) : null),
          note: entry?.note ?? entry?.notes ?? entry?.comment ?? entry?.payment_note ?? null,
          recorded_at: entry?.recordedAt
            ?? entry?.recorded_at
            ?? entry?.createdAt
            ?? entry?.created_at
            ?? entry?.payment_date
            ?? entry?.date
            ?? new Date().toISOString(),
        }))
      : [],
    confirmed: confirmed === undefined ? null : Boolean(confirmed),
    items: buildReservationItemsPayload(items),
    packages: buildReservationPackagesPayload(items, packages),
    company_share_percent: companyShareEnabled && Number.isFinite(companySharePercent)
      ? Number(companySharePercent)
      : null,
    company_share_enabled: companyShareEnabled ? 1 : 0,
    technicians: assignments.length
      ? assignments.map((assignment, index) => {
          const technicianId = assignment.technicianId
            ?? assignment.technician_id
            ?? assignment.id
            ?? null;
          const positionId = assignment.positionId
            ?? assignment.position_id
            ?? assignment.position
            ?? assignment.position_code
            ?? null;
          const positionName = assignment.positionLabel
            ?? assignment.position_name
            ?? assignment.role
            ?? null;
          const positionCost = toNumber(
            assignment.positionCost
            ?? assignment.position_cost
            ?? assignment.cost
            ?? assignment.daily_wage
            ?? assignment.dailyWage
            ?? 0
          );
          const positionClientPrice = toNumber(
            assignment.positionClientPrice
            ?? assignment.position_client_price
            ?? assignment.client_price
            ?? assignment.clientPrice
            ?? assignment.daily_total
            ?? assignment.dailyTotal
            ?? assignment.total
            ?? 0
          );

          return {
            id: technicianId,
            technician_id: technicianId,
            role: positionName ?? assignment.technicianRole ?? null,
            notes: assignment.notes ?? null,
            position_id: positionId,
            position_key: assignment.positionKey ?? assignment.position_key ?? null,
            position_name: positionName,
            position_label_ar: assignment.positionLabelAr ?? assignment.position_label_ar ?? null,
            position_label_en: assignment.positionLabelEn ?? assignment.position_label_en ?? null,
            position_cost: positionCost,
            position_client_price: positionClientPrice,
            client_price: positionClientPrice,
            cost: positionCost,
            assignment_id: assignment.assignmentId ?? assignment.assignment_id ?? `crew-${index}`,
          };
        })
      : (Array.isArray(technicians)
        ? technicians.map((tech) => {
            if (typeof tech === 'object' && tech !== null) {
              return {
                id: tech.id ?? tech.technician_id ?? tech.technicianId ?? tech.ID,
                role: tech.role ?? null,
                notes: tech.notes ?? null,
              };
            }
            return Number.isNaN(Number(tech)) ? String(tech) : Number(tech);
          })
        : []),
  };
}

function buildReservationItemsPayload(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const normalized = [];

  items.forEach((item) => {
    if (!item || typeof item !== 'object') {
      return;
    }

    // لا نوسّع عناصر الحزمة داخل items؛ نكتفي بتمرير الحزمة عبر packages
    if (item.type === 'package') {
      return;
    }

    const packageItems = Array.isArray(item.packageItems) ? item.packageItems : [];

    const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? null;
    if (equipmentId == null) {
      return;
    }

  const unitCost = (() => {
    const explicit = toNumber(
      item.cost
      ?? item.unit_cost
      ?? item.rental_cost
      ?? item.internal_cost
      ?? item.purchase_price
      ?? item.equipment_cost
      ?? 0
    );
    if (Number.isFinite(explicit) && explicit > 0) {
      return explicit;
    }
    if (packageItems.length) {
      const sum = packageItems.reduce((total, pkgItem) => {
        const childCost = toNumber(
          pkgItem.cost
            ?? pkgItem.unit_cost
            ?? pkgItem.unitCost
            ?? pkgItem.rental_cost
            ?? pkgItem.internal_cost
            ?? pkgItem.purchase_price
            ?? pkgItem.equipment_cost
            ?? pkgItem.item_cost
            ?? 0
        );
        const childQty = toPositiveInt(
          pkgItem.qty
            ?? pkgItem.quantity
            ?? pkgItem.qtyPerPackage
            ?? pkgItem.unit_qty
            ?? 1
        );
        return total + (childCost * childQty);
      }, 0);
      if (sum > 0) {
        return Number(sum.toFixed(2));
      }
    }
    return explicit;
  })();
  normalized.push({
    equipment_id: resolveEquipmentIdValue(equipmentId),
    quantity: toPositiveInt(item.qty ?? item.quantity ?? 1),
    unit_price: toNumber(item.price ?? item.unit_price ?? 0),
    unit_cost: unitCost,
    cost: unitCost,
    total_cost: Number.isFinite(unitCost) ? Number((unitCost * toPositiveInt(item.qty ?? item.quantity ?? 1)).toFixed(2)) : 0,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    notes: item.notes ?? null,
  });
});

return normalized;
}

function buildReservationPackagesPayload(items, packagesFromCaller) {
  const packages = Array.isArray(packagesFromCaller)
    ? packagesFromCaller.map((pkg) => (pkg && typeof pkg === 'object' ? { ...pkg } : pkg))
    : [];
  const packagesByKey = new Map();
  packages.forEach((pkg, index) => {
    if (!pkg || typeof pkg !== 'object') return;
    const key = resolvePackageMergeKey(pkg);
    if (!key) return;
    packagesByKey.set(key, index);
  });

  if (!Array.isArray(items)) {
    return packages;
  }

  items.forEach((item) => {
    if (!item || typeof item !== 'object' || item.type !== 'package') {
      return;
    }

    const normalizedPackageId = normalizePackageIdentifier(
      item.packageId
        ?? item.package_id
        ?? item.package_code
        ?? item.packageCode
        ?? item.bundleId
        ?? item.bundle_id
        ?? item.id
        ?? null
    );
    const packageDefinition = normalizedPackageId ? findPackageById(normalizedPackageId) : null;
    const packageQuantity = toPositiveInt(
      item.package_qty
        ?? item.packageQty
        ?? item.qty
        ?? item.quantity
        ?? packageDefinition?.package_qty
        ?? 1
    );
    const resolvedDefinitionItems = resolvePackageItems(packageDefinition || {}) || [];
    const basePackageItems = Array.isArray(item.packageItems) && item.packageItems.length
      ? item.packageItems
      : resolvedDefinitionItems;

    const packageItems = Array.isArray(basePackageItems)
      ? basePackageItems
          .map((child) => {
            const childId = child?.equipmentId ?? child?.equipment_id ?? child?.id ?? null;
            if (childId == null) {
              return null;
            }
            return {
              equipment_id: resolveEquipmentIdValue(childId),
              quantity: toPositiveInt(
                child?.qty
                  ?? child?.quantity
                  ?? child?.count
                  ?? child?.units
                  ?? child?.unit_qty
                  ?? child?.unitQty
                  ?? child?.unit_count
                  ?? child?.unitCount
                  ?? child?.package_quantity
                  ?? child?.packageQty
                  ?? 1
              ),
              unit_price: toNumber(child?.price ?? child?.unit_price ?? 0),
              unit_cost: 0,
              cost: 0,
              rental_cost: 0,
              purchase_price: 0,
              internal_cost: 0,
              equipment_cost: 0,
              item_cost: 0,
            };
          })
          .filter(Boolean)
      : [];

    // أولوية: خذ تكلفة الحزمة من إدخال المستخدم فقط (لا fallback من تعريف الحزمة أو عناصرها)
    const unitCostCandidates = [
      item.package_cost,
      item.packageCost,
      item.unit_cost,
      item.unitCost,
      item.cost,
      item.rental_cost,
      item.internal_cost,
      item.purchase_price,
      item.equipment_cost,
      item.item_cost,
    ];
    let unitCost = 0;
    for (const candidate of unitCostCandidates) {
      const numeric = toNumber(candidate);
      if (Number.isFinite(numeric) && numeric >= 0) {
        unitCost = numeric;
        break;
      }
    }

    const packageCode = item.package_code
      ?? item.packageCode
      ?? item.barcode
      ?? item.code
      ?? item.packageId
      ?? item.package_id
      ?? null;

    const packageEntry = {
      packageId: normalizedPackageId || null,
      package_id: normalizedPackageId || null,
      package_code: packageCode,
      name: item.desc ?? item.name ?? '',
      quantity: packageQuantity,
      unit_price: toNumber(item.price ?? item.unit_price ?? 0),
      unit_cost: unitCost,
      package_cost: unitCost,
      packageCost: unitCost,
      cost: unitCost,
      total_cost: Number.isFinite(unitCost) ? Number((unitCost * packageQuantity).toFixed(2)) : 0,
      rental_cost: unitCost,
      purchase_price: unitCost,
      internal_cost: unitCost,
      equipment_cost: unitCost,
      item_cost: unitCost,
      items: packageItems,
    };

    const mergeKey = resolvePackageMergeKey(packageEntry);
    if (mergeKey && packagesByKey.has(mergeKey)) {
      const existingIndex = packagesByKey.get(mergeKey);
      const merged = mergePackageRecords(
        packages[existingIndex] && typeof packages[existingIndex] === 'object'
          ? packages[existingIndex]
          : {},
        packageEntry
      );
      packages[existingIndex] = merged;
      packagesByKey.set(mergeKey, existingIndex);
      return;
    }

    const nextIndex = packages.length;
    packages.push(packageEntry);
    if (mergeKey) {
      packagesByKey.set(mergeKey, nextIndex);
    }
  });

  return packages;
}
