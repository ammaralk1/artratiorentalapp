import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';
import { findPackageById, normalizePackageId, resolvePackageItems } from './reservationsPackages.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus,
} from './reservationsSummary.js';

const initialReservationsData = loadData() || {};
let reservationsState = (initialReservationsData.reservations || []).map(mapLegacyReservation);

function sanitizePriceValue(value) {
  let result = Number(value);
  if (!Number.isFinite(result)) {
    return 0;
  }

  let iterations = 0;
  while (Math.abs(result) > 100_000 && iterations < 8) {
    result /= 10;
    iterations += 1;
  }

  return Number(result.toFixed(2));
}

const RESERVATION_PACKAGES_CACHE_KEY = '__reservation_packages_cache__';

function getPackagesCacheStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  return window.localStorage;
}

function readReservationPackagesCache() {
  const storage = getPackagesCacheStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(RESERVATION_PACKAGES_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[reservationsService] Failed to read reservation packages cache', error);
    return {};
  }
}

function writeReservationPackagesCache(cache) {
  const storage = getPackagesCacheStorage();
  if (!storage) return;
  try {
    storage.setItem(RESERVATION_PACKAGES_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('[reservationsService] Failed to persist reservation packages cache', error);
  }
}

function normalizePackagesForCache(packages = []) {
  if (!Array.isArray(packages)) return [];
  return packages
    .map((pkg, index) => convertReservationPackageEntry(pkg, index))
    .filter(Boolean)
    .map((pkg, index) => {
      const normalizedId = normalizePackageId(
        pkg.packageId
          ?? pkg.package_id
          ?? pkg.package_code
          ?? pkg.code
          ?? pkg.id
          ?? `pkg-${index}`
      );

      const normalizedItems = normalizeReservationPackageItemsFromEntry(pkg, normalizedId).map((item) => {
        const childQty = toPositiveInt(item.qty ?? item.quantity ?? 1);
        const childPrice = sanitizePriceValue(toNumber(item.price ?? item.unit_price ?? 0));
        return {
          ...item,
          qty: childQty,
          quantity: childQty,
          price: childPrice,
          unit_price: childPrice,
        };
      });

      const quantity = toPositiveInt(pkg.quantity ?? pkg.qty ?? 1);
      let unitPrice = sanitizePriceValue(toNumber(pkg.unit_price ?? pkg.unitPrice ?? pkg.price ?? 0));
      if (!unitPrice || unitPrice <= 0) {
        const itemsTotal = normalizedItems.reduce((sum, item) => sum + ((item.price || 0) * (item.qty || 1)), 0);
        if (itemsTotal > 0 && quantity > 0) {
          unitPrice = sanitizePriceValue(Number((itemsTotal / quantity).toFixed(2)));
        }
      }

      const totalRaw = toNumber(pkg.total_price ?? pkg.totalPrice ?? pkg.total ?? (unitPrice * quantity));
      const total = totalRaw > 0 ? sanitizePriceValue(totalRaw) : sanitizePriceValue(Number((unitPrice * quantity).toFixed(2)));

      return {
        ...pkg,
        packageId: normalizedId,
        package_id: normalizedId,
        qty: quantity,
        quantity,
        unit_price: unitPrice,
        unitPrice,
        price: unitPrice,
        total_price: total,
        total,
        packageItems: normalizedItems,
      };
    });
}

function persistReservationPackagesToCache(reservationId, packages) {
  if (!reservationId) return;
  const cache = readReservationPackagesCache();
  const key = String(reservationId);
  if (!Array.isArray(packages) || packages.length === 0) {
    if (cache[key]) {
      delete cache[key];
      writeReservationPackagesCache(cache);
    }
    return;
  }

  cache[key] = normalizePackagesForCache(packages);
  writeReservationPackagesCache(cache);
}

function getCachedReservationPackages(reservationId) {
  if (!reservationId) return [];
  const cache = readReservationPackagesCache();
  const key = String(reservationId);
  const entry = cache[key];
  if (!Array.isArray(entry)) {
    return [];
  }
  return normalizePackagesForCache(entry);
}

export function getReservationsState() {
  return reservationsState;
}

export function setReservationsState(reservations) {
  reservationsState = Array.isArray(reservations)
    ? reservations.map(toInternalReservation)
    : [];
  reservationsState.forEach((reservation) => {
    if (!reservation) return;
    const reservationId = reservation.id ?? reservation.reservationId ?? reservation.reservationCode;
    persistReservationPackagesToCache(reservationId, reservation.packages);
  });
  if (reservationsState.length) {
    console.debug('[reservationsService] setReservationsState first paymentHistory', reservationsState[0]?.paymentHistory);
  } else {
    console.debug('[reservationsService] setReservationsState empty state');
  }
  saveData({ reservations: reservationsState });
  return reservationsState;
}

export async function refreshReservationsFromApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/reservations/${query ? `?${query}` : ''}`);
  const payload = response?.data;

  let rawItems = [];
  if (Array.isArray(payload)) {
    rawItems = payload;
  } else if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) {
      rawItems = payload.items;
    } else if (Array.isArray(payload.results)) {
      rawItems = payload.results;
    } else if (Array.isArray(payload.data)) {
      rawItems = payload.data;
    } else if (Array.isArray(payload.records)) {
      rawItems = payload.records;
    }
  }

  const data = rawItems.map(mapReservationFromApi);
  return setReservationsState(data);
}

export async function createReservationApi(payload) {
  const response = await apiRequest('/reservations/', {
    method: 'POST',
    body: payload,
  });
  const created = mapReservationFromApi(response?.data ?? {});
  if (!Number.isFinite(created.companySharePercent) && payload?.company_share_percent != null) {
    created.companySharePercent = Number(payload.company_share_percent) || 0;
  }
  if ((!Array.isArray(created.paymentHistory) || created.paymentHistory.length === 0) && Array.isArray(payload?.payment_history)) {
    const fallbackHistory = normalizePaymentHistoryCollection(payload.payment_history);
    if (fallbackHistory.length) {
      created.paymentHistory = fallbackHistory;
    }
  }
  if (Array.isArray(payload?.packages) && payload.packages.length) {
    const fallbackPackages = mapReservationPackagesFromSource({ packages: payload.packages });
    created.packages = mergePackageCollections(created.packages, fallbackPackages);
  }
  persistReservationPackagesToCache(created.id ?? created.reservationId ?? created.reservation_code, created.packages);
  if (created.companySharePercent > 0 && (!Number.isFinite(created.companyShareAmount) || created.companyShareAmount <= 0)) {
    const breakdown = calculateDraftFinancialBreakdown({
      items: created.items || [],
      technicianIds: created.technicians || [],
      discount: created.discount,
      discountType: created.discountType,
      applyTax: created.applyTax,
      start: created.start,
      end: created.end,
      companySharePercent: created.companySharePercent
    });
    created.companyShareAmount = breakdown.companyShareAmount;
    created.cost = breakdown.finalTotal;
    created.totalAmount = breakdown.finalTotal;
  }
  created.companyShareEnabled = payload?.company_share_enabled ? true : created.companySharePercent > 0;
  setReservationsState([...reservationsState, created]);
  return created;
}

export async function updateReservationApi(id, payload) {
  const response = await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapReservationFromApi(response?.data ?? {});
  console.debug('[reservationsService] updateReservationApi mapped history', updated.paymentHistory);
  if (!Number.isFinite(updated.companySharePercent) && payload?.company_share_percent != null) {
    updated.companySharePercent = Number(payload.company_share_percent) || 0;
  }
  if ((!Array.isArray(updated.paymentHistory) || updated.paymentHistory.length === 0) && Array.isArray(payload?.payment_history)) {
    const fallbackHistory = normalizePaymentHistoryCollection(payload.payment_history);
    if (fallbackHistory.length) {
      updated.paymentHistory = fallbackHistory;
      console.debug('[reservationsService] updateReservationApi applied fallback history', updated.paymentHistory);
    }
  }
  if (Array.isArray(payload?.packages) && payload.packages.length) {
    const fallbackPackages = mapReservationPackagesFromSource({ packages: payload.packages });
    updated.packages = mergePackageCollections(updated.packages, fallbackPackages);
  }
  persistReservationPackagesToCache(updated.id ?? updated.reservationId ?? updated.reservation_code ?? id, updated.packages);
  if (updated.companySharePercent > 0 && (!Number.isFinite(updated.companyShareAmount) || updated.companyShareAmount <= 0)) {
    const breakdown = calculateDraftFinancialBreakdown({
      items: updated.items || [],
      technicianIds: updated.technicians || [],
      discount: updated.discount,
      discountType: updated.discountType,
      applyTax: updated.applyTax,
      start: updated.start,
      end: updated.end,
      companySharePercent: updated.companySharePercent
    });
    updated.companyShareAmount = breakdown.companyShareAmount;
    updated.cost = breakdown.finalTotal;
    updated.totalAmount = breakdown.finalTotal;
  }
  updated.companyShareEnabled = payload?.company_share_enabled ? true : updated.companySharePercent > 0;
  const next = reservationsState.map((reservation) =>
    String(reservation.id) === String(id) ? updated : reservation
  );
  setReservationsState(next);
  return updated;
}

export async function deleteReservationApi(id) {
  await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  const next = reservationsState.filter((reservation) => String(reservation.id) !== String(id));
  setReservationsState(next);
  persistReservationPackagesToCache(id, null);
}

export async function confirmReservationApi(id) {
  return updateReservationApi(id, { status: 'confirmed', confirmed: true });
}

export function mapReservationFromApi(raw = {}) {
  return toInternalReservation({
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
    technicians: raw.technicians,
    company_share_percent: raw.company_share_percent ?? raw.companySharePercent ?? raw.company_share ?? raw.companyShare,
    company_share_enabled: raw.company_share_enabled ?? raw.companyShareEnabled ?? raw.company_share_applied ?? raw.companyShareApplied,
    company_share_amount: raw.company_share_amount ?? raw.companyShareAmount,
    payment_history: raw.payment_history ?? raw.paymentHistory ?? raw.payments ?? raw.paymentLogs ?? raw.payment_records,
    paymentHistory: raw.paymentHistory ?? raw.payment_history ?? raw.payments ?? raw.paymentLogs ?? raw.payment_records,
  });
}

export function mapLegacyReservation(raw = {}) {
  return toInternalReservation(raw);
}

export function toInternalReservation(raw = {}) {
  const idValue = raw.id ?? raw.reservation_id ?? raw.reservationId ?? null;
  const reservationCode = raw.reservation_code ?? raw.reservationCode ?? raw.reservationId ?? (idValue != null ? `RSV-${idValue}` : null);

  const items = Array.isArray(raw.items)
    ? raw.items.map(mapReservationItem)
    : [];

  let packages = mapReservationPackagesFromSource(raw);

  const technicianEntries = Array.isArray(raw.technicians) ? raw.technicians : [];
  const technicianIds = technicianEntries.map((entry) => {
    if (entry == null) return null;
    if (typeof entry === 'object') {
      return String(entry.id ?? entry.technician_id ?? entry.technicianId ?? entry.ID ?? '');
    }
    return String(entry);
  }).filter((value) => value && value !== '');

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

  return {
    id: idValue != null ? String(idValue) : '',
    reservationId: reservationCode ?? (idValue != null ? String(idValue) : ''),
    reservationCode: reservationCode ?? null,
    customerId: raw.customer_id ?? raw.customerId ?? raw.customer?.id ?? null,
    customerName: raw.customer_name ?? raw.customerName ?? raw.customer?.full_name ?? raw.customer?.customerName ?? '',
    title: raw.title ?? raw.name ?? '',
    start,
    end,
    status: normalizeStatusValue(raw.status ?? (confirmed ? 'confirmed' : 'pending')),
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
    techniciansDetails: technicianEntries.map((entry) => (typeof entry === 'object' ? entry : { id: Number(entry) || entry })),
    startDatetime: start,
    endDatetime: end,
    customerPhone: raw.customer_phone ?? raw.customerPhone ?? null,
    packages,
    companySharePercent,
    companyShareAmount,
    companyShareEnabled,
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
      notes: null,
      image: null,
    };
  }

  const equipmentId = item.equipment_id ?? item.equipmentId ?? item.item_id ?? item.itemId ?? null;
  const quantity = toPositiveInt(item.quantity ?? item.qty ?? item.count ?? 1);
  const unitPrice = toNumber(item.unit_price ?? item.unitPrice ?? item.price ?? item.total_price ?? item.total ?? 0);
  const barcode = normalizeNumbers(String(item.barcode ?? item.code ?? item.serial ?? ''));
  const desc = item.description ?? item.desc ?? item.name ?? item.title ?? '';

  const mapped = {
    id: item.id != null ? String(item.id) : (equipmentId != null ? String(equipmentId) : ''),
    equipmentId,
    barcode,
    desc,
    qty: quantity,
    price: unitPrice,
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
  }

  return mapped;
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
  technicians,
  companySharePercent,
  companyShareEnabled,
  paidAmount,
  paidPercentage,
  paymentProgressType,
  paymentProgressValue,
  paymentHistory,
}) {
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
    technicians: Array.isArray(technicians)
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
      : [],
  };
}

function normalizePaymentHistoryCollection(source) {
  const collection = extractPaymentHistorySource(source);
  if (!Array.isArray(collection) || collection.length === 0) {
    return [];
  }

  return collection
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      const rawType = entry.type
        ?? entry.payment_type
        ?? entry.paymentType
        ?? entry.method
        ?? entry.paymentMethod
        ?? entry.kind
        ?? null;
      const type = normalizePaymentType(rawType);

      const valueCandidate = entry.value
        ?? entry.payment_value
        ?? entry.paymentValue
        ?? entry.amount
        ?? entry.payment_amount
        ?? entry.percentage
        ?? entry.payment_percentage
        ?? null;

      const valueRaw = valueCandidate != null ? Number.parseFloat(normalizeNumbers(String(valueCandidate))) : null;
      const amountRaw = entry.amount != null
        ? Number.parseFloat(normalizeNumbers(String(entry.amount)))
        : (entry.payment_amount != null ? Number.parseFloat(normalizeNumbers(String(entry.payment_amount))) : null);
      const percentRaw = entry.percentage != null
        ? Number.parseFloat(normalizeNumbers(String(entry.percentage)))
        : (entry.payment_percentage != null ? Number.parseFloat(normalizeNumbers(String(entry.payment_percentage))) : null);

      const resolvedAmount = Number.isFinite(amountRaw)
        ? amountRaw
        : (type === 'amount' && Number.isFinite(valueRaw) ? valueRaw : null);

      const resolvedPercent = Number.isFinite(percentRaw)
        ? percentRaw
        : (type === 'percent' && Number.isFinite(valueRaw) ? valueRaw : null);

      const resolvedType = type
        ?? (resolvedAmount != null ? 'amount' : (resolvedPercent != null ? 'percent' : null));

      const resolvedValue = resolvedType === 'amount'
        ? resolvedAmount
        : resolvedType === 'percent'
          ? resolvedPercent
          : Number.isFinite(valueRaw) ? valueRaw : null;

      const note = entry.note ?? entry.notes ?? entry.comment ?? entry.payment_note ?? null;
      const recordedAt = entry.recordedAt
        ?? entry.recorded_at
        ?? entry.payment_date
        ?? entry.date
        ?? entry.createdAt
        ?? entry.created_at
        ?? null;

      return {
        type: resolvedType,
        value: resolvedValue,
        amount: resolvedAmount,
        percentage: resolvedPercent,
        note,
        recordedAt,
      };
    })
    .filter((entry) => entry && entry.type);
}

function normalizePaymentType(value) {
  if (!value) return null;
  const normalized = String(value).trim().toLowerCase();
  if (['amount', 'fixed', 'cash', 'value', 'money', 'sar', 'riyals'].includes(normalized)) {
    return 'amount';
  }
  if (['percent', 'percentage', 'ratio'].includes(normalized)) {
    return 'percent';
  }
  return null;
}

function extractPaymentHistorySource(source) {
  if (Array.isArray(source)) {
    return source;
  }

  if (source && typeof source === 'object') {
    const directArrayKeys = [
      'data',
      'items',
      'records',
      'history',
      'list',
      'entries',
      'payment_history',
      'paymentHistory',
      'payment_records',
      'paymentRecords',
      'payments',
      'payment',
    ];

    for (const key of directArrayKeys) {
      if (Array.isArray(source[key])) {
        return source[key];
      }
    }

    const candidates = [
      source.data,
      source.items,
      source.records,
      source.history,
      source.list,
      source.entries,
      source.payment_history,
      source.paymentHistory,
      source.payment_records,
      source.paymentRecords,
      source.payments,
      source.payment,
    ];
    const nested = candidates.find((entry) => Array.isArray(entry));
    if (Array.isArray(nested)) {
      return nested;
    }

    const valueArray = Object.values(source);
    if (valueArray.length && valueArray.every((value) => value && typeof value === 'object')) {
      const maybeArray = valueArray.map((value) => value);
      if (maybeArray.every((value) => !Array.isArray(value))) {
        return maybeArray;
      }
    }

    const singleEntryKeys = [
      'amount',
      'payment_amount',
      'value',
      'payment_value',
      'percentage',
      'payment_percentage',
      'type',
      'payment_type',
      'method',
      'paymentMethod',
    ];
    if (singleEntryKeys.some((key) => key in source)) {
      return [source];
    }
  }

  if (typeof source === 'string') {
    try {
      const parsed = JSON.parse(source);
      return extractPaymentHistorySource(parsed);
    } catch (error) {
      return [];
    }
  }

  return [];
}

function extractPaymentHistoryFromCandidates(candidates = []) {
  if (!Array.isArray(candidates)) return [];
  for (const candidate of candidates) {
    const extracted = extractPaymentHistorySource(candidate);
    if (Array.isArray(extracted) && extracted.length) {
      return extracted;
    }
  }
  return [];
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

    if (item.type === 'package' && Array.isArray(item.packageItems) && item.packageItems.length) {
      const packageQuantity = toPositiveInt(item.qty ?? item.quantity ?? 1);

      item.packageItems.forEach((packageItem) => {
        const equipmentId = packageItem?.equipmentId ?? packageItem?.equipment_id ?? packageItem?.id ?? null;
        if (equipmentId == null) {
          return;
        }

        const childQuantity = toPositiveInt(packageItem?.qty ?? packageItem?.quantity ?? 1);
        const effectiveQuantity = packageQuantity * childQuantity;

        normalized.push({
          equipment_id: resolveEquipmentIdValue(equipmentId),
          quantity: effectiveQuantity,
          unit_price: toNumber(packageItem?.price ?? packageItem?.unit_price ?? 0),
          notes: packageItem?.notes ?? null,
        });
      });

      return;
    }

    const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? null;
    if (equipmentId == null) {
      return;
    }

    normalized.push({
      equipment_id: resolveEquipmentIdValue(equipmentId),
      quantity: toPositiveInt(item.qty ?? item.quantity ?? 1),
      unit_price: toNumber(item.price ?? item.unit_price ?? 0),
      notes: item.notes ?? null,
    });
  });

  return normalized;
}

function resolveEquipmentIdValue(value) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return String(value);
}

function buildReservationPackagesPayload(items, packagesFromCaller) {
  const packages = Array.isArray(packagesFromCaller) ? packagesFromCaller.slice() : [];

  if (!Array.isArray(items)) {
    return packages;
  }

  items.forEach((item) => {
    if (!item || typeof item !== 'object' || item.type !== 'package') {
      return;
    }

    const packageQuantity = toPositiveInt(item.qty ?? item.quantity ?? 1);
    const packageItems = Array.isArray(item.packageItems)
      ? item.packageItems
          .map((child) => {
            const childId = child?.equipmentId ?? child?.equipment_id ?? child?.id ?? null;
            if (childId == null) {
              return null;
            }
            return {
              equipment_id: resolveEquipmentIdValue(childId),
              quantity: toPositiveInt(child?.qty ?? child?.quantity ?? 1),
              unit_price: toNumber(child?.price ?? child?.unit_price ?? 0),
            };
          })
          .filter(Boolean)
      : [];

    packages.push({
      package_code: item.packageId ?? item.package_id ?? item.barcode ?? null,
      name: item.desc ?? item.name ?? '',
      quantity: packageQuantity,
      unit_price: toNumber(item.price ?? item.unit_price ?? 0),
      items: packageItems,
    });
  });

  return packages;
}

function normalizeReservationItemType(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const normalized = String(value).trim().toLowerCase();
  if (normalized === 'package' || normalized === 'bundle' || normalized === 'pack') {
    return 'package';
  }
  return normalized;
}

function normalizePackageIdentifier(value) {
  if (value === null || value === undefined) {
    return '';
  }
  const raw = String(value).replace(/^package::/i, '');
  return normalizePackageId(raw);
}

function normalizeBarcodeValueLoose(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function normalizePackageItemRecord(item = {}) {
  if (!item || typeof item !== 'object') {
    const barcode = normalizeNumbers(String(item ?? ''));
    return {
      equipmentId: null,
      equipment_id: null,
      qty: 1,
      quantity: 1,
      price: 0,
      unit_price: 0,
      barcode,
      normalizedBarcode: normalizeBarcodeValueLoose(barcode),
      desc: '',
      image: null,
    };
  }

  const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? item.item_id ?? item.itemId ?? null;
  const quantity = toPositiveInt(item.quantity ?? item.qty ?? item.count ?? 1);
  const unitPrice = toNumber(item.unit_price ?? item.unitPrice ?? item.price ?? 0);
  const barcode = normalizeNumbers(String(item.barcode ?? item.normalizedBarcode ?? item.code ?? item.serial ?? ''));

  return {
    equipmentId: equipmentId != null ? String(equipmentId) : null,
    equipment_id: equipmentId,
    qty: quantity,
    quantity,
    price: unitPrice,
    unit_price: unitPrice,
    barcode,
    normalizedBarcode: normalizeBarcodeValueLoose(item.normalizedBarcode ?? barcode),
    desc: item.desc ?? item.description ?? item.name ?? '',
    image: item.image ?? item.image_url ?? item.imageUrl ?? null,
  };
}

function normalizeReservationPackageItemsFromEntry(entry = {}, fallbackPackageId = '') {
  if (!entry || typeof entry !== 'object') {
    return [];
  }

  const packageId = normalizePackageIdentifier(fallbackPackageId
    || entry.packageId
    || entry.package_id
    || entry.package_code
    || entry.packageCode
    || entry.bundleId
    || entry.bundle_id
    || entry.id);

  const candidates = [];
  if (Array.isArray(entry.packageItems)) candidates.push(...entry.packageItems);
  if (Array.isArray(entry.package_items)) candidates.push(...entry.package_items);
  if (Array.isArray(entry.items)) candidates.push(...entry.items);
  if (Array.isArray(entry.equipment)) candidates.push(...entry.equipment);
  if (Array.isArray(entry.contents)) candidates.push(...entry.contents);

  let resolved = resolvePackageItems({
    ...entry,
    id: entry.id ?? packageId ?? entry.package_code ?? entry.packageCode ?? entry.code ?? null,
    packageId: packageId,
    package_id: packageId,
    package_code: entry.package_code ?? entry.packageCode ?? entry.code ?? entry.id ?? packageId,
    items: candidates,
    packageItems: candidates,
  });

  if ((!Array.isArray(resolved) || resolved.length === 0) && packageId) {
    const definition = findPackageById(packageId);
    if (definition) {
      resolved = resolvePackageItems(definition);
    }
  }

  if (!Array.isArray(resolved) || resolved.length === 0) {
    return [];
  }

  const normalized = resolved.map((item) => normalizePackageItemRecord(item));

  const merged = new Map();
  normalized.forEach((pkgItem) => {
    const key = pkgItem.normalizedBarcode || (pkgItem.equipmentId ? `id:${pkgItem.equipmentId}` : null);
    if (!key) {
      return;
    }
    if (merged.has(key)) {
      const existing = merged.get(key);
      existing.qty += pkgItem.qty;
      existing.quantity += pkgItem.quantity;
      if ((!existing.price || existing.price === 0) && pkgItem.price) {
        existing.price = pkgItem.price;
        existing.unit_price = pkgItem.unit_price;
      }
      if (!existing.desc && pkgItem.desc) {
        existing.desc = pkgItem.desc;
      }
      if (!existing.image && pkgItem.image) {
        existing.image = pkgItem.image;
      }
      return;
    }
    merged.set(key, { ...pkgItem });
  });

  return Array.from(merged.values());
}

function derivePackageUnitPrice(entry = {}, packageItems = [], quantity = 1) {
  const totalCandidate = entry.total_price
    ?? entry.totalPrice
    ?? entry.total
    ?? entry.amount
    ?? null;

  if (Number.isFinite(Number(totalCandidate))) {
    const numericTotal = toNumber(totalCandidate);
    return quantity > 0 ? Number((numericTotal / quantity).toFixed(2)) : numericTotal;
  }

  if (Number.isFinite(Number(entry.unit_price ?? entry.unitPrice ?? entry.price))) {
    return toNumber(entry.unit_price ?? entry.unitPrice ?? entry.price);
  }

  if (Array.isArray(packageItems) && packageItems.length) {
    const itemsTotal = packageItems.reduce((sum, item) => sum + (Number.isFinite(Number(item.price)) ? Number(item.price) : 0), 0);
    if (itemsTotal > 0) {
      return Number((itemsTotal).toFixed(2));
    }
  }

  return 0;
}

function mergePackageRecords(base, incoming) {
  if (!base) return incoming;
  if (!incoming) return base;

  const merged = { ...base };

  const assignIfMissing = (key) => {
    if (merged[key] === undefined || merged[key] === null || merged[key] === '') {
      merged[key] = incoming[key];
    }
  };

  ['name', 'desc', 'barcode', 'image'].forEach(assignIfMissing);

  if ((!Number.isFinite(Number(merged.unit_price)) || merged.unit_price === 0) && Number.isFinite(Number(incoming.unit_price))) {
    merged.unit_price = incoming.unit_price;
    merged.unitPrice = incoming.unitPrice;
    merged.price = incoming.price;
  }

  if ((!Number.isFinite(Number(merged.total_price)) || merged.total_price === 0) && Number.isFinite(Number(incoming.total_price))) {
    merged.total_price = incoming.total_price;
    merged.total = incoming.total;
  }

  if (!Array.isArray(merged.packageItems) || merged.packageItems.length === 0) {
    merged.packageItems = Array.isArray(incoming.packageItems) ? incoming.packageItems : [];
    merged.items = merged.packageItems;
  } else if (Array.isArray(incoming.packageItems) && incoming.packageItems.length) {
    merged.packageItems = mergePackageItemCollections(merged.packageItems, incoming.packageItems);
    merged.items = merged.packageItems;
  }

  return merged;
}

function mergePackageItemCollections(primary = [], secondary = []) {
  const merged = new Map();

  const append = (source) => {
    source.forEach((item) => {
      if (!item) return;
      const key = item.normalizedBarcode || (item.equipmentId ? `id:${item.equipmentId}` : null);
      if (!key) return;
      if (merged.has(key)) {
        const existing = merged.get(key);
        existing.qty += item.qty ?? 0;
        existing.quantity += item.quantity ?? 0;
        if ((!existing.price || existing.price === 0) && item.price) {
          existing.price = item.price;
          existing.unit_price = item.unit_price;
        }
        if (!existing.desc && item.desc) {
          existing.desc = item.desc;
        }
        if (!existing.image && item.image) {
          existing.image = item.image;
        }
        return;
      }
      merged.set(key, { ...item });
    });
  };

  append(primary);
  append(secondary);

  return Array.from(merged.values());
}

function mergePackageCollections(primary = [], secondary = []) {
  const result = [];
  const indexByKey = new Map();

  const append = (collection) => {
    if (!Array.isArray(collection)) return;
    collection.forEach((entry) => {
      if (!entry || typeof entry !== 'object') return;
      const key = entry.packageId || entry.package_id || entry.package_code || entry.id;
      if (!key) return;
      if (indexByKey.has(key)) {
        const existingIndex = indexByKey.get(key);
        result[existingIndex] = mergePackageRecords(result[existingIndex], entry);
      } else {
        indexByKey.set(key, result.length);
        result.push({ ...entry });
      }
    });
  };

  append(primary);
  append(secondary);

  return result;
}

function convertReservationPackageEntry(entry, index = 0) {
  if (!entry && entry !== 0) {
    return null;
  }

  if (typeof entry === 'string' || typeof entry === 'number') {
    const normalizedId = normalizePackageIdentifier(entry);
    const definition = normalizedId ? findPackageById(normalizedId) : null;
    const packageItems = definition ? normalizeReservationPackageItemsFromEntry(definition, normalizedId) : [];
    const unitPrice = definition
      ? toNumber(definition.price ?? definition.unit_price ?? definition.unitPrice ?? 0)
      : 0;

    const quantity = 1;
    const total = Number((unitPrice * quantity).toFixed(2));

    return {
      id: `package::${normalizedId || index}`,
      packageId: normalizedId || `pkg-${index}`,
      package_id: normalizedId || `pkg-${index}`,
      package_code: normalizeNumbers(String(entry)) || (normalizedId || `pkg-${index}`),
      name: definition?.name ?? definition?.package_name ?? definition?.packageName ?? normalizeNumbers(String(entry)) ?? '',
      desc: definition?.name ?? normalizeNumbers(String(entry)) ?? '',
      quantity,
      qty: quantity,
      unit_price: unitPrice,
      unitPrice: unitPrice,
      price: unitPrice,
      total,
      total_price: total,
      barcode: normalizeNumbers(String(entry)),
      packageItems,
      items: packageItems,
      type: 'package',
      image: definition?.image ?? null,
    };
  }

  if (typeof entry !== 'object') {
    return null;
  }

  const normalizedId = normalizePackageIdentifier(
    entry.packageId
      ?? entry.package_id
      ?? entry.package_code
      ?? entry.packageCode
      ?? entry.code
      ?? entry.slug
      ?? entry.id
  ) || `pkg-${index}`;

  const quantity = toPositiveInt(entry.quantity ?? entry.qty ?? entry.count ?? entry.package_quantity ?? entry.packageQty ?? 1);
  const packageItems = normalizeReservationPackageItemsFromEntry(entry, normalizedId);
  const unitPrice = derivePackageUnitPrice(entry, packageItems, quantity);
  const totalRaw = entry.total_price ?? entry.totalPrice ?? entry.total ?? (unitPrice * quantity);
  const total = Number.isFinite(Number(totalRaw)) ? toNumber(totalRaw) : Number((unitPrice * quantity).toFixed(2));
  const packageCode = entry.package_code ?? entry.packageCode ?? entry.code ?? normalizedId;
  const barcode = normalizeNumbers(String(entry.barcode ?? packageCode ?? ''));

  const image = entry.image
    ?? entry.cover
    ?? entry.thumbnail
    ?? (packageItems.find((item) => item.image)?.image ?? null);

  return {
    id: entry.id != null ? String(entry.id) : `package::${normalizedId}`,
    packageId: normalizedId,
    package_id: normalizedId,
    package_code: packageCode,
    name: entry.name ?? entry.package_name ?? entry.packageName ?? entry.title ?? entry.description ?? packageCode ?? normalizedId,
    desc: entry.name ?? entry.package_name ?? entry.packageName ?? entry.title ?? entry.description ?? packageCode ?? normalizedId,
    quantity,
    qty: quantity,
    unit_price: unitPrice,
    unitPrice,
    price: unitPrice,
    total,
    total_price: total,
    barcode,
    packageItems,
    items: packageItems,
    type: 'package',
    image,
  };
}

function mapReservationPackagesFromSource(raw = {}) {
  const collections = [];

  if (Array.isArray(raw.packages)) collections.push(raw.packages);
  if (Array.isArray(raw.reservation_packages)) collections.push(raw.reservation_packages);
  if (Array.isArray(raw.reservationPackages)) collections.push(raw.reservationPackages);
  if (Array.isArray(raw.package_details)) collections.push(raw.package_details);
  if (Array.isArray(raw.packageDetails)) collections.push(raw.packageDetails);
  if (Array.isArray(raw.package_list)) collections.push(raw.package_list);
  if (Array.isArray(raw.packageList)) collections.push(raw.packageList);

  const aggregated = [];
  const seen = new Map();

  const addPackageEntry = (entry, indexHint = aggregated.length) => {
    const mapped = convertReservationPackageEntry(entry, indexHint);
    if (!mapped) return;
    const key = mapped.packageId || mapped.package_code || mapped.id || `pkg-${indexHint}`;
    if (seen.has(key)) {
      const existingIndex = seen.get(key);
      aggregated[existingIndex] = mergePackageRecords(aggregated[existingIndex], mapped);
    } else {
      seen.set(key, aggregated.length);
      aggregated.push(mapped);
    }
  };

  collections.forEach((collection) => {
    collection.forEach((entry, index) => {
      addPackageEntry(entry, index + aggregated.length);
    });
  });

  if (aggregated.length === 0 && raw.package) {
    addPackageEntry(raw.package, 0);
  }

  const itemsCollection = Array.isArray(raw.items) ? raw.items : [];
  const looksLikePackage = (item = {}) => {
    if (!item || typeof item !== 'object') {
      return false;
    }
    const normalizedType = normalizeReservationItemType(item.type ?? item.item_type ?? item.kind ?? null);
    if (normalizedType === 'package') {
      return true;
    }
    if (item.packageItems && Array.isArray(item.packageItems) && item.packageItems.length) {
      return true;
    }
    if (item.items && Array.isArray(item.items) && item.items.length && item.items.every((child) => typeof child === 'object')) {
      return true;
    }
    if (item.packageId || item.package_id || item.package_code || item.packageCode || item.bundleId || item.bundle_id) {
      return true;
    }
    return false;
  };

  itemsCollection.forEach((item, index) => {
    if (!looksLikePackage(item)) {
      return;
    }
    addPackageEntry(item, aggregated.length + index);
  });

  return aggregated;
}

function toNumber(value) {
  const num = Number(normalizeNumbers(String(value ?? '0')));
  return Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
}

function toPositiveInt(value) {
  const num = Number.parseInt(normalizeNumbers(String(value ?? '1')), 10);
  if (!Number.isFinite(num) || num <= 0) return 1;
  return num;
}

function normalizeStatusValue(status) {
  const normalized = String(status ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'pending':
    case 'معلق':
    case 'قيد الانتظار':
      return 'pending';
    case 'confirmed':
    case 'مؤكد':
      return 'confirmed';
    case 'in_progress':
    case 'in-progress':
    case 'قيد التنفيذ':
    case 'جاري':
      return 'in_progress';
    case 'completed':
    case 'مكتمل':
      return 'completed';
    case 'cancelled':
    case 'ملغي':
      return 'cancelled';
    default:
      return 'pending';
  }
}

function normalisePaidStatus(status) {
  if (status == null) return null;
  const normalized = String(status).trim().toLowerCase();
  switch (normalized) {
    case 'paid':
    case 'مدفوع':
      return 'paid';
    case 'partial':
    case 'مدفوع جزئياً':
    case 'partial_paid':
      return 'partial';
    case 'unpaid':
    case 'غير مدفوع':
    case 'not_paid':
    default:
      return 'unpaid';
  }
}

export function isApiError(error) {
  return error instanceof ApiError;
}
