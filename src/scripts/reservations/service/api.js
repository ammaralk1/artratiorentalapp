import { loadData, saveData } from '../../storage.js';
import { apiRequest, ApiError } from '../../apiClient.js';
import { parsePriceValue } from '../../reservationsShared.js';
import { calculateDraftFinancialBreakdown } from '../../reservationsSummary.js';
import { debugLogPackages } from './utils.js';
import { persistReservationPackagesToCache, persistReservationItemCostsToCache, persistReservationCrewToCache, hasRichCrewData, syncReservationItemCostCache } from './cache.js';
import { toInternalReservation, mapLegacyReservation, mapReservationFromApi, buildReservationPayload, applyPayloadPackages, mergeItemCostsFromPayload, normalizeCrewAssignmentEntry, setMappingStateGetter, mapReservationItem } from './mapping.js';
import { normalizePaymentHistoryCollection } from './payment.js';
import { mergePackageCollections, mapReservationPackagesFromSource, normalizeItemsWithPackages } from './packages.js';

const initialReservationsData = loadData() || {};
let reservationsState = (initialReservationsData.reservations || []).map(mapLegacyReservation);

// Provide mapping.js with access to reservationsState without circular import at init time
setMappingStateGetter(() => reservationsState);

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

  const data = rawItems.map(mapReservationFromApi).map(mergeItemCostsFromExistingSafeLocal);
  return setReservationsState(data);
}

function mergeItemCostsFromExistingSafeLocal(reservation) {
  // mapReservationFromApi already calls mergeItemCostsFromExistingSafe internally
  return reservation;
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
    // Reservation creation can be heavy; allow more time before aborting.
    timeout: 90000,
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

export function isApiError(error) {
  return error instanceof ApiError;
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
