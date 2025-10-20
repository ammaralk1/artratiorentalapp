import { apiRequest, ApiError } from './apiClient.js';
import { t } from './language.js';

const POSITIONS_UPDATED_EVENT = 'technicianPositions:updated';

let positionsCache = [];
let loaded = false;
let loadingPromise = null;

function mapTechnicianPositionFromApi(raw = {}) {
  return {
    id: Number(raw.id) || 0,
    name: String(raw.name ?? '').trim(),
    labelAr: typeof raw.label_ar === 'string' ? raw.label_ar.trim() : null,
    labelEn: typeof raw.label_en === 'string' ? raw.label_en.trim() : null,
    cost: Number.parseFloat(raw.cost ?? 0) || 0,
    clientPrice: raw.client_price == null ? null : Number.parseFloat(raw.client_price),
    createdAt: raw.created_at ?? null,
    updatedAt: raw.updated_at ?? null,
  };
}

function mapTechnicianPositionToApi({ name, cost, clientPrice, labelAr, labelEn }) {
  return {
    name: String(name ?? '').trim(),
    cost: cost ?? 0,
    client_price: clientPrice,
    label_ar: labelAr ?? null,
    label_en: labelEn ?? null,
  };
}

function setPositionsCache(list) {
  positionsCache = Array.isArray(list)
    ? list
        .map(mapTechnicianPositionFromApi)
        .filter((item) => item.name !== '')
        .sort((a, b) => getPositionSortKey(a).localeCompare(getPositionSortKey(b), 'ar', { sensitivity: 'base' }))
    : [];
  loaded = true;
  dispatchUpdate();
  return getTechnicianPositionsCache();
}

function dispatchUpdate() {
  try {
    const eventDetail = { positions: getTechnicianPositionsCache() };
    const event = new CustomEvent(POSITIONS_UPDATED_EVENT, { detail: eventDetail });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(event);
    }
    if (typeof document !== 'undefined') {
      document.dispatchEvent(event);
    }
  } catch (error) {
    console.warn('[technicianPositions] Failed to dispatch update event', error);
  }
}

function getPositionSortKey(position = {}) {
  return (position.labelAr || position.labelEn || position.name || '').toLowerCase();
}

export function getTechnicianPositionsCache() {
  return positionsCache.map((item) => ({ ...item }));
}

export function findPositionByName(name) {
  const normalized = String(name ?? '').trim().toLowerCase();
  if (!normalized) return null;
  return positionsCache.find((item) => {
    if (item.name && item.name.toLowerCase() === normalized) return true;
    if (item.labelAr && item.labelAr.toLowerCase() === normalized) return true;
    if (item.labelEn && item.labelEn.toLowerCase() === normalized) return true;
    return false;
  }) || null;
}

export async function loadTechnicianPositions({ forceRefresh = false } = {}) {
  if (loaded && !forceRefresh) {
    return getTechnicianPositionsCache();
  }

  if (loadingPromise && !forceRefresh) {
    return loadingPromise;
  }

  loadingPromise = apiRequest('/technician-positions/')
    .then((payload) => {
      const list = Array.isArray(payload?.data) ? payload.data : [];
      return setPositionsCache(list);
    })
    .finally(() => {
      loadingPromise = null;
    });

  return loadingPromise;
}

export async function ensureTechnicianPositionsLoaded({ forceRefresh = false } = {}) {
  try {
    return await loadTechnicianPositions({ forceRefresh });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error?.message || t('positions.toast.fetchFailed', '⚠️ تعذر تحميل المناصب، حاول مرة أخرى'));
  }
}

export async function createTechnicianPosition({ name, cost, clientPrice, labelAr, labelEn }) {
  const payload = mapTechnicianPositionToApi({ name, cost, clientPrice, labelAr, labelEn });
  const response = await apiRequest('/technician-positions/', {
    method: 'POST',
    body: payload,
  });
  const created = mapTechnicianPositionFromApi(response?.data ?? {});
  positionsCache = [...positionsCache, created];
  positionsCache.sort((a, b) => getPositionSortKey(a).localeCompare(getPositionSortKey(b), 'ar', { sensitivity: 'base' }));
  dispatchUpdate();
  return created;
}

export async function updateTechnicianPosition(id, { name, cost, clientPrice, labelAr, labelEn }) {
  if (!id) {
    throw new Error('Position id is required');
  }

  const payload = mapTechnicianPositionToApi({ name, cost, clientPrice, labelAr, labelEn });
  const response = await apiRequest(`/technician-positions/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapTechnicianPositionFromApi(response?.data ?? {});
  positionsCache = positionsCache.map((item) => (item.id === updated.id ? updated : item));
  positionsCache.sort((a, b) => getPositionSortKey(a).localeCompare(getPositionSortKey(b), 'ar', { sensitivity: 'base' }));
  dispatchUpdate();
  return updated;
}

export async function deleteTechnicianPosition(id) {
  if (!id) {
    throw new Error('Position id is required');
  }

  await apiRequest(`/technician-positions/?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  positionsCache = positionsCache.filter((item) => item.id !== Number(id));
  dispatchUpdate();
  return getTechnicianPositionsCache();
}

export function clearPositionsCache() {
  positionsCache = [];
  loaded = false;
}
