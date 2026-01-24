import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';
import { findPackageById, normalizePackageId, resolvePackageItems, getPackagesSnapshot, getPackageDisplayName, resolvePackagePrice } from './reservationsPackages.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculateDraftFinancialBreakdown,
  calculatePaymentProgress,
  determinePaymentStatus,
} from './reservationsSummary.js';
import { parsePriceValue } from './reservationsShared.js';

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
const RESERVATION_CREW_CACHE_KEY = '__reservation_crew_cache__';
const RESERVATION_ITEM_COST_CACHE_KEY = '__reservation_item_cost_cache__';
const CREW_CACHE_ENABLED = false; // disable crew cache to rely on DB

function getPackagesCacheStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  return window.localStorage;
}

function getItemCostCacheStorage() {
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

function readReservationItemCostCache() {
  const storage = getItemCostCacheStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(RESERVATION_ITEM_COST_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[reservationsService] Failed to read reservation item cost cache', error);
    return {};
  }
}

function writeReservationItemCostCache(cache) {
  const storage = getItemCostCacheStorage();
  if (!storage) return;
  try {
    storage.setItem(RESERVATION_ITEM_COST_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('[reservationsService] Failed to persist reservation item cost cache', error);
  }
}

function normalizeReservationItemForCostCache(item, index = 0) {
  if (!item || typeof item !== 'object') return null;
  const equipmentId = item.equipment_id ?? item.equipmentId ?? item.id ?? null;
  const barcode = normalizeNumbers(String(item.barcode ?? item.code ?? '')).trim();
  const costValue = sanitizePriceValue(toNumber(item.cost ?? item.unit_cost));
  const priceValue = sanitizePriceValue(toNumber(item.price ?? item.unit_price));
  const hasCost = Number.isFinite(costValue);
  const hasPrice = Number.isFinite(priceValue);
  if (!hasCost && !hasPrice) return null;
  return {
    key: equipmentId != null ? `id:${equipmentId}` : (barcode ? `bc:${barcode}` : `idx:${index}`),
    equipmentId,
    barcode,
    cost: hasCost ? costValue : null,
    price: hasPrice ? priceValue : null,
  };
}

function persistReservationItemCostsToCache(reservationId, items) {
  if (!reservationId) return;
  const normalizedItems = Array.isArray(items)
    ? items.map((item, idx) => normalizeReservationItemForCostCache(item, idx)).filter(Boolean)
    : [];
  const cache = readReservationItemCostCache();
  const key = String(reservationId);
  if (!normalizedItems.length) {
    if (cache[key]) {
      delete cache[key];
      writeReservationItemCostCache(cache);
    }
    return;
  }
  cache[key] = normalizedItems;
  writeReservationItemCostCache(cache);
}

function syncReservationItemCostCache(reservations = []) {
  const cache = readReservationItemCostCache();
  const allowedKeys = new Set();
  reservations.forEach((reservation) => {
    const reservationId = reservation?.id ?? reservation?.reservationId ?? reservation?.reservation_code ?? null;
    if (!reservationId) return;
    allowedKeys.add(String(reservationId));
  });
  let mutated = false;
  Object.keys(cache).forEach((key) => {
    if (!allowedKeys.has(key)) {
      delete cache[key];
      mutated = true;
    }
  });
  if (mutated) {
    writeReservationItemCostCache(cache);
  }
}

function getCachedReservationItemCosts(reservationId) {
  if (!reservationId) return [];
  const cache = readReservationItemCostCache();
  const key = String(reservationId);
  const list = cache[key];
  return Array.isArray(list) ? list : [];
}

// Infer packages from a flat items list using the packages snapshot
function inferPackagesFromItems(items = []) {
  if (!Array.isArray(items) || items.length === 0) return [];

  const defs = getPackagesSnapshot();
  if (!Array.isArray(defs) || defs.length === 0) return [];

  // Build available quantities per equipment id from items
  const availableById = new Map();
  items.forEach((item) => {
    if (!item || typeof item !== 'object') return;
    const id = item.equipmentId ?? item.equipment_id ?? item.id ?? null;
    if (id == null) return;
    const key = String(id);
    const qty = (() => {
      const candidates = [item.qty, item.quantity, item.count, 1];
      for (const c of candidates) {
        const n = Number(c);
        if (Number.isFinite(n) && n > 0) return n;
      }
      return 1;
    })();
    availableById.set(key, (availableById.get(key) || 0) + qty);
  });

  const inferred = [];

  defs.forEach((def, idx) => {
    // Prepare requirement per equipment id for this package
    const defItems = resolvePackageItems(def) || [];
    const req = new Map();
    let hasResolvableIds = true;
    defItems.forEach((it) => {
      const eqId = it?.equipmentId ?? it?.equipment_id ?? null;
      const perPackageQty = Number.isFinite(Number(it?.qty)) && Number(it.qty) > 0 ? Number(it.qty) : 1;
      if (eqId == null) {
        hasResolvableIds = false;
        return;
      }
      const key = String(eqId);
      req.set(key, (req.get(key) || 0) + perPackageQty);
    });

    if (!hasResolvableIds || req.size === 0) return;

    // Compute how many full packages can be formed from available items
    let k = Infinity;
    for (const [eqId, needed] of req.entries()) {
      const available = availableById.get(eqId) || 0;
      const ki = Math.floor(available / needed);
      if (ki <= 0) { k = 0; break; }
      if (ki < k) k = ki;
    }

    if (!Number.isFinite(k) || k <= 0) return;

    // Allocate counts and build a package entry
    for (const [eqId, needed] of req.entries()) {
      const cur = availableById.get(eqId) || 0;
      availableById.set(eqId, Math.max(0, cur - (k * needed)));
    }

    const normalizedId = normalizePackageId(def?.id ?? def?.packageId ?? def?.package_id ?? def?.code);
    const entryItems = Array.from(req.entries()).map(([eqId, needed]) => ({
      equipment_id: (/^\d+$/.test(eqId) ? Number(eqId) : eqId),
      quantity: needed,
      unit_price: 0,
    }));

    const resolvedCode = (def?.package_code ?? def?.code ?? normalizedId) || `pkg-${idx}`;
    const resolvedName = getPackageDisplayName(def) || normalizedId || `package-${idx}`;
    inferred.push({
      package_code: resolvedCode,
      name: resolvedName,
      quantity: k,
      unit_price: resolvePackagePrice(def) || 0,
      items: entryItems,
    });
  });

  return inferred;
}

function getCrewCacheStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  return window.localStorage;
}

function readReservationCrewCache() {
  if (!CREW_CACHE_ENABLED) return {};
  const storage = getCrewCacheStorage();
  if (!storage) return {};
  try {
    const raw = storage.getItem(RESERVATION_CREW_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    console.warn('[reservationsService] Failed to read reservation crew cache', error);
    return {};
  }
}

function writeReservationCrewCache(cache) {
  if (!CREW_CACHE_ENABLED) return;
  const storage = getCrewCacheStorage();
  if (!storage) return;
  try {
    storage.setItem(RESERVATION_CREW_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('[reservationsService] Failed to persist reservation crew cache', error);
  }
}

function normalizeCrewAssignmentsForCache(assignments = []) {
  if (!Array.isArray(assignments)) return [];
  return assignments
    .map((entry, index) => normalizeCrewAssignmentEntry(entry, index))
    .filter(Boolean)
    .map((a) => ({
      assignmentId: a.assignmentId,
      positionId: a.positionId ?? null,
      positionKey: a.positionKey ?? null,
      positionLabel: a.positionLabel ?? '',
      positionLabelAlt: a.positionLabelAlt ?? '',
      positionCost: Number.isFinite(a.positionCost) ? a.positionCost : 0,
      positionClientPrice: Number.isFinite(a.positionClientPrice) ? a.positionClientPrice : 0,
      technicianId: a.technicianId ?? null,
      technicianName: a.technicianName ?? null,
      technicianRole: a.technicianRole ?? null,
      technicianPhone: a.technicianPhone ?? null,
      notes: a.notes ?? null,
    }));
}

function hasRichCrewData(assignments = []) {
  if (!Array.isArray(assignments) || assignments.length === 0) return false;
  return assignments.some((a) => {
    const label = (a.positionLabel ?? '').trim();
    const hasLabel = label.length > 0;
    const hasKey = a.positionId != null || (a.positionKey != null && String(a.positionKey).trim() !== '');
    const hasPrice = Number.isFinite(Number(a.positionClientPrice));
    const hasCost = Number.isFinite(Number(a.positionCost));
    return hasLabel || hasKey || hasPrice || hasCost;
  });
}

function persistReservationCrewToCache(reservationId, assignments) {
  if (!CREW_CACHE_ENABLED) return;
  if (!reservationId) return;
  const cache = readReservationCrewCache();
  const key = String(reservationId);
  const normalized = normalizeCrewAssignmentsForCache(assignments);
  // If incoming data is empty or lacks position info while existing cache has rich data, keep existing.
  const existing = Array.isArray(cache[key]) ? cache[key] : [];
  const incomingRich = hasRichCrewData(normalized);
  const existingRich = hasRichCrewData(existing);
  if (!normalized.length || (!incomingRich && existingRich)) {
    if (cache[key]) {
      // Keep existing rich data; do not overwrite with empty/poor data
      if (!incomingRich) return;
    }
    // If no existing entry and incoming is empty, nothing to persist
    if (!incomingRich) return;
  }
  cache[key] = normalized;
  writeReservationCrewCache(cache);
}

export function getCachedReservationCrew(reservationId) {
  if (!CREW_CACHE_ENABLED) return [];
  if (!reservationId) return [];
  const cache = readReservationCrewCache();
  const key = String(reservationId);
  const list = cache[key];
  return Array.isArray(list) ? list : [];
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
        const childQty = toPositiveInt(
          item.qty
            ?? item.quantity
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

function normalizeCrewAssignmentEntry(entry, index = 0) {
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
    persistReservationItemCostsToCache(reservationId, reservation.items);
    const candidateCrew = reservation.crewAssignments && reservation.crewAssignments.length
      ? reservation.crewAssignments
      : (reservation.techniciansDetails || []);
    // Only persist if we have rich data to avoid wiping richer cache with backend-stripped data
    if (hasRichCrewData(candidateCrew)) {
      persistReservationCrewToCache(reservationId, candidateCrew);
    }
  });
  syncReservationItemCostCache(reservationsState);
  // Reduce noisy logs in production; keep in dev for diagnostics
  if (import.meta.env?.DEV) {
    if (reservationsState.length) {
      console.debug('[reservationsService] setReservationsState first paymentHistory', reservationsState[0]?.paymentHistory);
    } else {
      console.debug('[reservationsService] setReservationsState empty state');
    }
  }
  saveData({ reservations: reservationsState });
  try {
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('reservations:updated'));
    }
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      document.dispatchEvent(new CustomEvent('reservations:updated'));
    }
  } catch (_) { /* ignore */ }
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

  const data = rawItems.map(mapReservationFromApi).map(mergeItemCostsFromExistingSafe);
  return setReservationsState(data);
}

export async function createReservationApi(payload) {
  try {
    if (Array.isArray(payload?.packages)) {
      console.debug('[reservationsService] createReservationApi payload.packages', payload.packages);
    }
  } catch (_) { /* ignore debug errors */ }
  const response = await apiRequest('/reservations/', {
    method: 'POST',
    body: payload,
  });
  const responseData = response?.data ?? {};
  if ((!Array.isArray(responseData.packages) || responseData.packages.length === 0) && Array.isArray(payload?.packages) && payload.packages.length) {
    responseData.packages = payload.packages;
  }
  const created = applyPayloadPackages(mapReservationFromApi(responseData), payload?.packages);
  const payloadItems = Array.isArray(payload?.items) ? payload.items : null;
  if (payloadItems) {
    if (Array.isArray(created.items) && created.items.length) {
      created.items = mergeItemCostsFromPayload(created.items, payloadItems);
    } else {
      created.items = payloadItems.map(mapReservationItem);
    }
  }
  if (!Number.isFinite(created.companySharePercent) && payload?.company_share_percent != null) {
    created.companySharePercent = Number(payload.company_share_percent) || 0;
  }
  if ((!Array.isArray(created.paymentHistory) || created.paymentHistory.length === 0) && Array.isArray(payload?.payment_history)) {
    const fallbackHistory = normalizePaymentHistoryCollection(payload.payment_history);
    if (fallbackHistory.length) {
      created.paymentHistory = fallbackHistory;
    }
  }
  // If backend doesn't echo rich crew assignments, fall back to payload
  if ((!Array.isArray(created.crewAssignments) || created.crewAssignments.length === 0)
      && Array.isArray(payload?.technicians) && payload.technicians.length) {
    const fromPayload = payload.technicians
      .map((entry, idx) => normalizeCrewAssignmentEntry(entry, idx))
      .filter(Boolean);
    if (fromPayload.length) {
      created.crewAssignments = fromPayload;
      // Compose a details collection to keep labels/prices for edit/details views
      created.techniciansDetails = fromPayload.map((assignment, idx) => {
        const src = payload.technicians[idx];
        return typeof src === 'object' ? { ...src, ...assignment } : assignment;
      });
    }
  }
  // Crew cache disabled — rely on backend data only
  if (Array.isArray(payload?.packages) && payload.packages.length) {
    const fallbackPackages = mapReservationPackagesFromSource({ packages: payload.packages });
    created.packages = mergePackageCollections(created.packages, fallbackPackages);
  }
  {
    const normalized = normalizeItemsWithPackages(created.items || [], created.packages || []);
    created.items = normalized.items;
    created.packages = mergePackageCollections(created.packages || [], normalized.packages);
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
  // Debug: log payload packages to verify user input is preserved
  try {
    if (Array.isArray(payload?.packages)) {
      console.debug('[reservationsService] updateReservationApi payload.packages', payload.packages);
    }
  } catch (_) { /* ignore */ }
  const response = await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const rawResponse = response ?? {};
  const reservationPayload = rawResponse
    && typeof rawResponse === 'object'
    && rawResponse.data
    && typeof rawResponse.data === 'object'
    && !Array.isArray(rawResponse.data)
      ? rawResponse.data
      : rawResponse;
  const hasServerPackages = Array.isArray(reservationPayload.packages) && reservationPayload.packages.length > 0;
  const payloadPackages = Array.isArray(payload?.packages) && payload.packages.length
    ? payload.packages
    : null;
  if (!hasServerPackages && payloadPackages) {
    reservationPayload.packages = payloadPackages;
  }
  const updated = applyPayloadPackages(
    mapReservationFromApi(reservationPayload),
    hasServerPackages ? null : payloadPackages
  );
  const payloadItems = Array.isArray(payload?.items) ? payload.items : null;
  if (payloadItems) {
    if (Array.isArray(updated.items) && updated.items.length) {
      updated.items = mergeItemCostsFromPayload(updated.items, payloadItems);
    } else {
      updated.items = payloadItems.map(mapReservationItem);
    }
  }
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
  // If backend response lacks crewAssignments, derive them from the submitted payload
  if ((!Array.isArray(updated.crewAssignments) || updated.crewAssignments.length === 0)
      && Array.isArray(payload?.technicians) && payload.technicians.length) {
    const fromPayload = payload.technicians
      .map((entry, idx) => normalizeCrewAssignmentEntry(entry, idx))
      .filter(Boolean);
    if (fromPayload.length) {
      updated.crewAssignments = fromPayload;
      updated.techniciansDetails = fromPayload.map((assignment, idx) => {
        const src = payload.technicians[idx];
        return typeof src === 'object' ? { ...src, ...assignment } : assignment;
      });
    }
  }
  // Crew cache disabled — rely on backend data only
  // Align packages with what the caller submitted. If the caller provided
  // an empty packages array, treat it as an explicit intent to clear any
  // cached/inferred packages for this reservation.
  if (!hasServerPackages && Array.isArray(payload?.packages)) {
    if (payload.packages.length) {
      const fallbackPackages = mapReservationPackagesFromSource({ packages: payload.packages });
      updated.packages = mergePackageCollections(updated.packages, fallbackPackages);
    } else {
      updated.packages = [];
    }
  }
  {
    const normalized = normalizeItemsWithPackages(updated.items || [], updated.packages || []);
    updated.items = normalized.items;
    updated.packages = mergePackageCollections(updated.packages || [], normalized.packages);
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

function mergeItemCostsFromPayload(items, payloadItems) {
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
    const existingCost = Number(existingItem.cost);
    const existingPrice = Number(existingItem.price);
    if (Number.isFinite(existingCost) && existingCost > 0) {
      merged.cost = existingCost;
      merged.unit_cost = existingCost;
    }
    if (Number.isFinite(existingPrice) && existingPrice > 0) {
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

function derivePackageMergeKey(entry = {}) {
  const normalizedId = normalizePackageIdentifier(
    entry?.packageId
      ?? entry?.package_id
      ?? entry?.id
      ?? entry?.code
      ?? null
  );
  if (normalizedId) return normalizedId;
  const code = normalizeNumbers(String(entry?.package_code ?? entry?.code ?? entry?.barcode ?? '')).trim().toLowerCase();
  if (code) return code;
  return null;
}

function dedupePackages(packages = []) {
  if (!Array.isArray(packages) || packages.length === 0) return [];
  const map = new Map();
  packages.forEach((pkg, index) => {
    if (!pkg || typeof pkg !== 'object') return;
    const key = derivePackageMergeKey(pkg) ?? `pkg-${index}`;
    const existing = map.get(key);
    if (!existing) {
      map.set(key, pkg);
      return;
    }
    const existingCost = parsePriceValue(
      existing.unit_cost
        ?? existing.unitCost
        ?? existing.cost
        ?? existing.package_cost
        ?? existing.rental_cost
        ?? existing.purchase_price
        ?? existing.internal_cost
        ?? existing.equipment_cost
        ?? existing.item_cost
    );
    const incomingCost = parsePriceValue(
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
    if (Number.isFinite(incomingCost) && (!Number.isFinite(existingCost) || incomingCost >= existingCost)) {
      map.set(key, { ...existing, ...pkg, unit_cost: incomingCost });
    } else {
      map.set(key, { ...pkg, ...existing });
    }
  });
  return Array.from(map.values());
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

export async function deleteReservationApi(id) {
  await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  const next = reservationsState.filter((reservation) => String(reservation.id) !== String(id));
  setReservationsState(next);
  persistReservationPackagesToCache(id, null);
}

export async function confirmReservationApi(id) {
  return updateReservationApi(id, { status: 'confirmed', confirmed: true });
}

export async function closeReservationApi(id, notes = null) {
  const payload = { status: 'completed', confirmed: true };
  if (typeof notes === 'string') {
    payload.notes = notes;
  }
  return updateReservationApi(id, payload);
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

function applyPayloadPackages(reservation, payloadPackages) {
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

export function mapLegacyReservation(raw = {}) {
  return toInternalReservation(raw);
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

function resolveEquipmentIdValue(value) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return String(value);
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

function resolvePackageMergeKey(entry, codeToIdMap = null) {
  if (!entry || typeof entry !== 'object') {
    return null;
  }
  const codeCandidates = [
    entry.package_code,
    entry.packageCode,
    entry.code,
    entry.barcode,
  ];
  for (const candidate of codeCandidates) {
    const normalized = normalizePackageIdentifier(candidate ?? '');
    if (normalized) {
      if (codeToIdMap && codeToIdMap.has(normalized)) {
        return codeToIdMap.get(normalized) || normalized;
      }
      return normalized;
    }
  }
  const idCandidates = [
    entry.packageId,
    entry.package_id,
    entry.id,
  ];
  for (const candidate of idCandidates) {
    const normalized = normalizePackageIdentifier(candidate ?? '');
    if (normalized) {
      return normalized;
    }
  }
  return null;
}

function normalizeBarcodeValueLoose(value) {
  if (value === null || value === undefined) {
    return '';
  }
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function normalizePackageItemRecord(item = {}, packageQuantity = 1) {
  if (!item || typeof item !== 'object') {
    const barcode = normalizeNumbers(String(item ?? ''));
    return {
      equipmentId: null,
      equipment_id: null,
      qty: 1,
      quantity: 1,
      qtyPerPackage: 1,
      price: 0,
      unit_price: 0,
      cost: 0,
      unit_cost: 0,
      rental_cost: 0,
      purchase_price: 0,
      internal_cost: 0,
      equipment_cost: 0,
      item_cost: 0,
      barcode,
      normalizedBarcode: normalizeBarcodeValueLoose(barcode),
      desc: '',
      image: null,
    };
  }

  const equipmentId = item.equipmentId ?? item.equipment_id ?? item.id ?? item.item_id ?? item.itemId ?? null;
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
  const unitPrice = toNumber(item.unit_price ?? item.unitPrice ?? item.price ?? 0);
  const unitCost = toNumber(
    item.cost
      ?? item.unit_cost
      ?? item.unitCost
      ?? item.rental_cost
      ?? item.internal_cost
      ?? item.purchase_price
      ?? item.equipment_cost
      ?? item.item_cost
      ?? 0
  );
  const barcode = normalizeNumbers(String(item.barcode ?? item.normalizedBarcode ?? item.code ?? item.serial ?? ''));
  const perPackageCandidate = item.qtyPerPackage
    ?? item.qty_per_package
    ?? item.perPackageQty
    ?? item.per_package_qty
    ?? null;
  let qtyPerPackage;
  if (perPackageCandidate != null) {
    qtyPerPackage = toPositiveInt(perPackageCandidate, { fallback: 1, max: 99 });
  } else if (packageQuantity > 0) {
    const divided = quantity / packageQuantity;
    if (Number.isFinite(divided) && divided > 0 && Number.isInteger(divided)) {
      qtyPerPackage = toPositiveInt(divided, { fallback: 1, max: 99 });
    } else {
      qtyPerPackage = Math.min(quantity, 99);
    }
  } else {
    qtyPerPackage = Math.min(quantity, 99);
  }

  return {
    equipmentId: equipmentId != null ? String(equipmentId) : null,
    equipment_id: equipmentId,
    qty: qtyPerPackage,
    quantity: qtyPerPackage,
    qtyPerPackage,
    totalQuantity: quantity,
    price: unitPrice,
    unit_price: unitPrice,
    cost: unitCost,
    unit_cost: unitCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    barcode,
    normalizedBarcode: normalizeBarcodeValueLoose(item.normalizedBarcode ?? barcode),
    desc: item.desc ?? item.description ?? item.name ?? '',
    image: item.image ?? item.image_url ?? item.imageUrl ?? null,
  };
}

function buildReservationPackageItem(pkg = {}, fallback = {}) {
  const normalizedId = normalizePackageIdentifier(
    pkg.packageId
      ?? pkg.package_id
      ?? pkg.id
      ?? fallback.packageId
      ?? fallback.package_id
      ?? fallback.id
      ?? ''
  );
  // كمية الحزمة يجب أن تعتمد على القيم الخاصة بالحزمة فقط
  const quantity = toPositiveInt(
    pkg.quantity
      ?? pkg.qty
      ?? pkg.package_quantity
      ?? pkg.packageQty
      ?? 1,
    { fallback: 1, max: 9_999 }
  );
  const unitPrice = toNumber(
    pkg.unit_price
      ?? pkg.unitPrice
      ?? pkg.price
      ?? fallback.price
      ?? fallback.unit_price
      ?? fallback.unitPrice
      ?? 0
  );
  const costCandidates = [
    pkg.package_cost,
    pkg.packageCost,
    pkg.unit_cost,
    pkg.unitCost,
    pkg.cost,
    pkg.rental_cost,
    pkg.internal_cost,
    pkg.purchase_price,
    pkg.equipment_cost,
    pkg.item_cost,
    fallback.package_cost,
    fallback.packageCost,
    fallback.unit_cost,
    fallback.unitCost,
    fallback.cost,
    fallback.rental_cost,
    fallback.internal_cost,
    fallback.purchase_price,
    fallback.equipment_cost,
    fallback.item_cost,
  ];
  let unitCost = 0;
  for (const candidate of costCandidates) {
    const numeric = toNumber(candidate);
    if (Number.isFinite(numeric) && numeric >= 0) {
      unitCost = numeric;
      break;
    }
  }
  const barcode = normalizeNumbers(String(
    pkg.package_code
      ?? pkg.packageCode
      ?? pkg.barcode
      ?? fallback.package_code
      ?? fallback.packageCode
      ?? fallback.barcode
      ?? ''
  ));

  return {
    id: fallback.id ?? (pkg.id != null ? String(pkg.id) : normalizedId ? `package::${normalizedId}` : ''),
    equipmentId: null,
    barcode,
    desc: fallback.desc ?? fallback.description ?? pkg.name ?? pkg.desc ?? pkg.title ?? barcode,
    qty: quantity,
    quantity,
    price: unitPrice,
    cost: unitCost,
    unit_cost: unitCost,
    package_cost: unitCost,
    packageCost: unitCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
    notes: fallback.notes ?? null,
    image: pkg.image ?? fallback.image ?? null,
    type: 'package',
    packageId: normalizedId,
    package_id: normalizedId,
    package_code: barcode,
    packageItems: Array.isArray(pkg.packageItems) ? pkg.packageItems : (Array.isArray(fallback.packageItems) ? fallback.packageItems : []),
  };
}

function normalizeItemsWithPackages(items = [], packages = []) {
  const derived = derivePackagesFromItemsList(items);

  const workingPackages = Array.isArray(packages)
    ? mergePackageCollections(packages, derived.packages)
    : derived.packages;

  const packagesById = new Map();
  workingPackages.forEach((pkg) => {
    const key = resolvePackageMergeKey(pkg);
    if (!key) return;
    packagesById.set(key, pkg);
  });

  // Ensure each package has its packageItems populated from derived data when missing
  derived.packages.forEach((derivedPkg) => {
    const normalizedId = resolvePackageMergeKey(derivedPkg);
    if (!normalizedId) return;
    const target = packagesById.get(normalizedId);
    if (!target) return;
    if (!Array.isArray(target.packageItems) || target.packageItems.length === 0) {
      target.packageItems = derivedPkg.packageItems;
    }
    if (!target.name && derivedPkg.name) {
      target.name = derivedPkg.name;
    }
    if (!target.image && derivedPkg.image) {
      target.image = derivedPkg.image;
    }
  });

  return {
    items: derived.items,
    packages: Array.from(packagesById.values()),
  };
}

function derivePackagesFromItemsList(items = []) {
  const groups = new Map();

  items.forEach((item) => {
    const normalizedId = normalizePackageIdentifier(
      item.packageId
        ?? item.package_id
        ?? item.packageCode
        ?? item.package_code
        ?? item.bundleId
        ?? item.bundle_id
        ?? null
    );
    if (!normalizedId) return;
    const key = normalizedId;
    if (!groups.has(key)) {
      groups.set(key, {
        base: item,
        items: [],
      });
    }
    const group = groups.get(key);
    // Prefer the package entry itself as the base; children stay in items list
    if (item.type === 'package') {
      group.base = item;
      return;
    }
    if (!group.base) {
      group.base = item;
    }
    group.items.push(item);
  });

  if (!groups.size) {
    return { items, packages: [] };
  }

  const filteredItems = [];
  const derivedPackages = [];
  const consumedPackageIds = new Set();

  items.forEach((item) => {
    const normalizedId = normalizePackageIdentifier(
      item.packageId
        ?? item.package_id
        ?? item.packageCode
        ?? item.package_code
        ?? item.bundleId
        ?? item.bundle_id
        ?? null
    );

    if (normalizedId && groups.has(normalizedId)) {
      if (consumedPackageIds.has(normalizedId)) {
        return;
      }
      const group = groups.get(normalizedId);
      const base = group.base || item;
      const packageItems = group.items.map((child) => normalizePackageItemRecord(child, 1));
      const costCandidates = [
        base.package_cost,
        base.packageCost,
        base.unit_cost,
        base.unitCost,
        base.cost,
        base.rental_cost,
        base.internal_cost,
        base.purchase_price,
        base.equipment_cost,
        base.item_cost,
      ];
      let unitCost = 0;
      for (const candidate of costCandidates) {
        const numeric = toNumber(candidate);
        if (Number.isFinite(numeric) && numeric >= 0) {
          unitCost = numeric;
          break;
        }
      }
      const derivedPackage = {
        packageId: normalizedId,
        package_id: normalizedId,
        package_code: base.package_code
          ?? base.packageCode
          ?? base.barcode
          ?? normalizeNumbers(String(normalizedId)),
        name: base.package_name ?? base.packageName ?? base.desc ?? base.name ?? `Package ${normalizedId}`,
        quantity: toPositiveInt(base.package_quantity ?? base.packageQty ?? 1, { fallback: 1, max: 9_999 }),
        unit_price: toNumber(base.package_price ?? base.packagePrice ?? base.price ?? 0),
        unit_cost: unitCost,
        unitCost,
        cost: unitCost,
        rental_cost: unitCost,
        purchase_price: unitCost,
        internal_cost: unitCost,
        equipment_cost: unitCost,
        item_cost: unitCost,
        packageItems,
        image: base.image ?? null,
      };
      derivedPackages.push(derivedPackage);
      filteredItems.push(buildReservationPackageItem(derivedPackage, base));
      consumedPackageIds.add(normalizedId);
      return;
    }

    filteredItems.push(item);
  });

  return {
    items: filteredItems,
    packages: derivedPackages,
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

  let definitionItems = [];
  if ((!Array.isArray(resolved) || resolved.length === 0) && packageId) {
    const definition = findPackageById(packageId);
    if (definition) {
      resolved = resolvePackageItems(definition);
      definitionItems = Array.isArray(resolved) ? resolved : [];
    }
  } else if (packageId) {
    const definition = findPackageById(packageId);
    if (definition) {
      definitionItems = resolvePackageItems(definition) || [];
    }
  }

  if (!Array.isArray(resolved) || resolved.length === 0) {
    return [];
  }

  const packageQuantity = toPositiveInt(
    entry.quantity
      ?? entry.qty
      ?? entry.count
      ?? entry.units
      ?? entry.unit_qty
      ?? entry.unitQty
      ?? entry.unit_count
      ?? entry.unitCount
      ?? entry.package_quantity
      ?? entry.packageQty
      ?? 1,
    { fallback: 1, max: 9_999 }
  );

  const normalized = resolved.map((item) => normalizePackageItemRecord(item, packageQuantity));

  if (definitionItems.length) {
    const definitionIndex = new Map();
    definitionItems.forEach((defItem) => {
      if (!defItem) return;
      const key = normalizeBarcodeValueLoose(defItem.barcode)
        || (defItem.equipmentId != null ? `id:${defItem.equipmentId}` : null)
        || (defItem.equipment_id != null ? `id:${defItem.equipment_id}` : null);
      if (!key) return;
      definitionIndex.set(key, defItem);
    });

    normalized.forEach((pkgItem) => {
      const key = pkgItem.normalizedBarcode || (pkgItem.equipmentId ? `id:${pkgItem.equipmentId}` : null);
      if (!key || !definitionIndex.has(key)) return;
      const defItem = definitionIndex.get(key);
      const defQty = toPositiveInt(defItem.quantity ?? defItem.qty ?? 1, { fallback: pkgItem.qtyPerPackage ?? 1, max: 99 });
      pkgItem.qtyPerPackage = defQty;
      pkgItem.qty = defQty;
      pkgItem.quantity = defQty;
      const defPrice = toNumber(defItem.unit_price ?? defItem.unitPrice ?? defItem.price ?? pkgItem.price);
      pkgItem.price = defPrice;
      pkgItem.unit_price = defPrice;
      if (!pkgItem.desc && defItem.desc) {
        pkgItem.desc = defItem.desc;
      }
      if (!pkgItem.image && defItem.image) {
        pkgItem.image = defItem.image;
      }
    });
  }

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
      if (!Number.isFinite(existing.qtyPerPackage) || existing.qtyPerPackage <= 0) {
        existing.qtyPerPackage = pkgItem.qtyPerPackage;
      }
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
  // 1) Prefer the canonical package price from Equipment > Packages
  try {
    const candidateId = normalizePackageIdentifier(
      entry.packageId ?? entry.package_id ?? entry.id ?? entry.package_code ?? entry.packageCode
    );
    if (candidateId) {
      const def = findPackageById(candidateId);
      if (def) {
        const realPrice = resolvePackagePrice(def);
        if (Number.isFinite(Number(realPrice)) && Number(realPrice) > 0) {
          return Number(realPrice);
        }
      }
    }
  } catch (_) { /* ignore lookup errors */ }

  // 2) Fallback to explicit package price fields on the entry itself
  const explicitUnit = entry.package_price ?? entry.packagePrice ?? entry.unit_price ?? entry.unitPrice ?? entry.price;
  if (Number.isFinite(Number(explicitUnit)) && Number(explicitUnit) > 0) {
    return toNumber(explicitUnit);
  }

  // 3) Fallback to known total fields (convert to unit by quantity if sensible)
  const totalCandidate = entry.total_price ?? entry.totalPrice ?? entry.total ?? entry.amount ?? null;
  if (Number.isFinite(Number(totalCandidate))) {
    const numericTotal = toNumber(totalCandidate);
    return quantity > 0 ? Number((numericTotal / quantity).toFixed(2)) : numericTotal;
  }

  // Do NOT derive from child items sum — use only real stored package price
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

  const mergedCostCandidate = toNumber(
    merged.unit_cost
      ?? merged.unitCost
      ?? merged.cost
      ?? merged.package_cost
      ?? merged.rental_cost
      ?? merged.purchase_price
      ?? merged.internal_cost
      ?? merged.equipment_cost
      ?? merged.item_cost
  );
  const incomingCostCandidate = toNumber(
    incoming.unit_cost
      ?? incoming.unitCost
      ?? incoming.cost
      ?? incoming.package_cost
      ?? incoming.rental_cost
      ?? incoming.purchase_price
      ?? incoming.internal_cost
      ?? incoming.equipment_cost
      ?? incoming.item_cost
  );
  if ((!Number.isFinite(mergedCostCandidate) || mergedCostCandidate === 0) && Number.isFinite(incomingCostCandidate)) {
    const safeCost = incomingCostCandidate;
    merged.unit_cost = safeCost;
    merged.unitCost = safeCost;
    merged.cost = safeCost;
    merged.total_cost = Number.isFinite(incoming.total_cost) ? incoming.total_cost : merged.total_cost;
    if (!Number.isFinite(merged.rental_cost)) merged.rental_cost = safeCost;
    if (!Number.isFinite(merged.purchase_price)) merged.purchase_price = safeCost;
    if (!Number.isFinite(merged.internal_cost)) merged.internal_cost = safeCost;
    if (!Number.isFinite(merged.equipment_cost)) merged.equipment_cost = safeCost;
    if (!Number.isFinite(merged.item_cost)) merged.item_cost = safeCost;
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
        if ((!Number.isFinite(existing.qtyPerPackage) || existing.qtyPerPackage <= 0) && Number.isFinite(item.qtyPerPackage)) {
          existing.qtyPerPackage = item.qtyPerPackage;
        }
        if ((!existing.price || existing.price === 0) && item.price) {
          existing.price = item.price;
          existing.unit_price = item.unit_price;
        }
        const currentCost = toNumber(
          existing.cost
            ?? existing.unit_cost
            ?? existing.unitCost
            ?? existing.rental_cost
            ?? existing.purchase_price
            ?? existing.internal_cost
            ?? existing.equipment_cost
            ?? existing.item_cost
        );
        const incomingCost = toNumber(
          item.cost
            ?? item.unit_cost
            ?? item.unitCost
            ?? item.rental_cost
            ?? item.purchase_price
            ?? item.internal_cost
            ?? item.equipment_cost
            ?? item.item_cost
        );
        if ((!Number.isFinite(currentCost) || currentCost === 0) && Number.isFinite(incomingCost)) {
          const safeCost = incomingCost;
          existing.cost = safeCost;
          existing.unit_cost = safeCost;
          existing.unitCost = safeCost;
          if (!Number.isFinite(existing.rental_cost)) existing.rental_cost = safeCost;
          if (!Number.isFinite(existing.purchase_price)) existing.purchase_price = safeCost;
          if (!Number.isFinite(existing.internal_cost)) existing.internal_cost = safeCost;
          if (!Number.isFinite(existing.equipment_cost)) existing.equipment_cost = safeCost;
          if (!Number.isFinite(existing.item_cost)) existing.item_cost = safeCost;
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

  // Build a lookup from code -> normalized id using snapshot, to unify keys
  const snapshot = getPackagesSnapshot();
  const codeToId = new Map();
  snapshot.forEach((def) => {
    const idNorm = normalizePackageIdentifier(def?.id ?? def?.packageId ?? def?.package_id ?? def?.code ?? '');
    const code = String(def?.package_code ?? def?.code ?? '').trim().toLowerCase();
    if (code) codeToId.set(code, idNorm || code);
  });

  const deriveKey = (entry) => resolvePackageMergeKey(entry, codeToId);

  const append = (collection) => {
    if (!Array.isArray(collection)) return;
    collection.forEach((entry) => {
      if (!entry || typeof entry !== 'object') return;
      const key = deriveKey(entry);
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
    const resolveDefinitionCost = () => {
      const candidates = [
        definition?.package_cost,
        definition?.packageCost,
        definition?.unit_cost,
        definition?.unitCost,
        definition?.cost,
        definition?.rental_cost,
        definition?.internal_cost,
        definition?.purchase_price,
        definition?.equipment_cost,
        definition?.item_cost,
      ];
      for (const candidate of candidates) {
        const numeric = toNumber(candidate);
        if (Number.isFinite(numeric) && numeric >= 0) {
          return numeric;
        }
      }
      return 0;
    };
    const unitCost = resolveDefinitionCost();

    const quantity = 1;
    const total = Number((unitPrice * quantity).toFixed(2));
    const totalCost = Number((unitCost * quantity).toFixed(2));

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
      unit_cost: unitCost,
      unitCost,
      cost: unitCost,
      total_cost: totalCost,
      rental_cost: unitCost,
      purchase_price: unitCost,
      internal_cost: unitCost,
      equipment_cost: unitCost,
      item_cost: unitCost,
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

  const quantity = toPositiveInt(
    entry.quantity
      ?? entry.qty
      ?? entry.count
      ?? entry.units
      ?? entry.unit_qty
      ?? entry.unitQty
      ?? entry.unit_count
      ?? entry.unitCount
      ?? entry.package_quantity
      ?? entry.packageQty
      ?? 1
  );
  const packageItems = normalizeReservationPackageItemsFromEntry(entry, normalizedId);
  const unitPrice = derivePackageUnitPrice(entry, packageItems, quantity);
  const resolveUnitCost = () => {
    const candidates = [
      entry.package_cost,
      entry.packageCost,
      entry.unit_cost,
      entry.unitCost,
      entry.cost,
      entry.rental_cost,
      entry.internal_cost,
      entry.purchase_price,
      entry.equipment_cost,
      entry.item_cost,
    ];
    for (const candidate of candidates) {
      const numeric = toNumber(candidate);
      if (Number.isFinite(numeric) && numeric >= 0) {
        return numeric;
      }
    }
    return 0;
  };
  const unitCost = resolveUnitCost();
  const totalRaw = entry.total_price ?? entry.totalPrice ?? entry.total ?? (unitPrice * quantity);
  const total = Number.isFinite(Number(totalRaw)) ? toNumber(totalRaw) : Number((unitPrice * quantity).toFixed(2));
  const totalCost = Number.isFinite(unitCost) ? Number((unitCost * quantity).toFixed(2)) : 0;
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
    unit_cost: unitCost,
    unitCost,
    package_cost: unitCost,
    packageCost: unitCost,
    cost: unitCost,
    total_cost: totalCost,
    rental_cost: unitCost,
    purchase_price: unitCost,
    internal_cost: unitCost,
    equipment_cost: unitCost,
    item_cost: unitCost,
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
  const parsed = parsePriceValue(value);
  return Number.isFinite(parsed) ? Number(parsed.toFixed(2)) : 0;
}

function debugLogPackages() {
  // Logging disabled to keep console clean in reservations tab
}

try {
  if (typeof window !== 'undefined' && !window.__dumpReservationPackages) {
    window.__dumpReservationPackages = (id) => {
      const target = reservationsState.find((r) => {
        const candidates = [
          r?.id,
          r?.reservationId,
          r?.reservation_id,
          r?.reservationCode,
          r?.reservation_code,
        ].map((value) => (value != null ? String(value) : null));
        const normalizedId = id != null ? String(id) : null;
        return normalizedId && candidates.includes(normalizedId);
      });
      if (!target) {
        console.warn('[reservations] __dumpReservationPackages: reservation not found', id);
        return null;
      }
      debugLogPackages(`__dumpReservationPackages(${id})`, target.packages);
      return target;
    };
  }
} catch (_) {
  /* noop */
}

function toPositiveInt(value, { fallback = 1, max = 1_000_000 } = {}) {
  const parsed = parsePriceValue(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  const rounded = Math.round(parsed);
  if (rounded <= 0) {
    return fallback;
  }
  if (rounded > max) {
    return fallback;
  }
  return rounded;
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
    case 'ملغية':
    case 'ملغى':
    case 'canceled':
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
const hasPackageCost = (pkg = {}) => {
  const candidate = parsePriceValue(
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
  return Number.isFinite(candidate) && candidate > 0;
};

function resolveReservationIdentifier(reservation = {}) {
  return (
    reservation.id
      ?? reservation.reservationId
      ?? reservation.reservation_id
      ?? reservation.reservationCode
      ?? reservation.reservation_code
      ?? null
  );
}

export function reservationPackagesNeedHydration(reservation = {}) {
  const packages = reservation?.packages;
  if (!Array.isArray(packages) || packages.length === 0) {
    return true;
  }
  return packages.some((pkg) => !hasPackageCost(pkg));
}

export async function fetchReservationWithDetails(id) {
  if (!id) return null;
  const response = await apiRequest(`/reservations/?id=${encodeURIComponent(id)}`);
  const payload = response?.data;
  if (!payload || Array.isArray(payload)) {
    return null;
  }
  const mapped = mapReservationFromApi(payload);
  const identifier = resolveReservationIdentifier(mapped);
  const next = reservationsState.some((entry) => resolveReservationIdentifier(entry) === identifier)
    ? reservationsState.map((entry) => (resolveReservationIdentifier(entry) === identifier ? mapped : entry))
    : [...reservationsState, mapped];
  setReservationsState(next);
  return mapped;
}
