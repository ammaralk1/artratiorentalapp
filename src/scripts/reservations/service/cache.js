import { normalizeNumbers } from '../../utils.js';
import { normalizePackageId, resolvePackageItems, getPackagesSnapshot, getPackageDisplayName, resolvePackagePrice } from '../../reservationsPackages.js';
import { sanitizePriceValue, normalizePackageIdentifier, toNumber, toPositiveInt } from './utils.js';
// NOTE: packages.js and mapping.js import from this module (circular). These imports are resolved
// lazily by the ES module runtime — the exported functions are only called after all modules have
// initialized, so the circular references are safe.
import { convertReservationPackageEntry, normalizeReservationPackageItemsFromEntry } from './packages.js';
import { normalizeCrewAssignmentEntry } from './mapping.js';

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

function getCrewCacheStorage() {
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

export function persistReservationItemCostsToCache(reservationId, items) {
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

export function syncReservationItemCostCache(reservations = []) {
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

export function getCachedReservationItemCosts(reservationId) {
  if (!reservationId) return [];
  const cache = readReservationItemCostCache();
  const key = String(reservationId);
  const list = cache[key];
  return Array.isArray(list) ? list : [];
}

// Infer packages from a flat items list using the packages snapshot
export function inferPackagesFromItems(items = []) {
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

export function hasRichCrewData(assignments = []) {
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

export function persistReservationCrewToCache(reservationId, assignments) {
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
      const normalizedId = normalizePackageIdentifier(
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

export function persistReservationPackagesToCache(reservationId, packages) {
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

export function getCachedReservationPackages(reservationId) {
  if (!reservationId) return [];
  const cache = readReservationPackagesCache();
  const key = String(reservationId);
  const entry = cache[key];
  if (!Array.isArray(entry)) {
    return [];
  }
  return normalizePackagesForCache(entry);
}
