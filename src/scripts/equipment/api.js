import { showToast, normalizeNumbers } from '../utils.js';
import { loadData, saveData } from '../storage.js';
import { t } from '../language.js';
import { apiRequest } from '../apiClient.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from '../auth.js';
import { isLocalDashboardFixtureEnabled } from '../fixtureRuntime.js';
import { state, getAllEquipment, setEquipment } from './state.js';
import {
  toInternalEquipment,
  parseFloatSafe,
  parseInteger,
  buildEquipmentPayload,
  resolveApiErrorMessage,
  normalizeStatusValue,
} from './normalize.js';
import { renderEquipment, setSyncEquipmentStatusesFn } from './render.js';

// ── Internal: find existing item by id or barcode ─────────────────────────────

function findExistingEquipment(raw = {}) {
  const idCandidates = [raw.id, raw.equipment_id, raw.equipmentId, raw.item_id, raw.itemId]
    .map((v) => (v != null ? String(v) : ''))
    .filter(Boolean);
  const comparableBarcode = normalizeNumbers(String(raw.barcode ?? '')).trim();

  return getAllEquipment().find((item) => {
    if (idCandidates.length && idCandidates.some((id) => id && String(item.id) === id)) return true;
    if (comparableBarcode) {
      const itemBarcode = normalizeNumbers(String(item.barcode || '')).trim();
      if (itemBarcode && itemBarcode === comparableBarcode) return true;
    }
    return false;
  }) || null;
}

export function mapApiEquipment(raw = {}) {
  const mapped   = toInternalEquipment(raw);
  const existing = findExistingEquipment(raw);
  if (
    (!Number.isFinite(mapped.cost) || Number(mapped.cost) === 0) &&
    existing &&
    Number.isFinite(Number(existing.cost)) &&
    Number(existing.cost) > 0
  ) {
    mapped.cost = Number(existing.cost);
  }
  return mapped;
}

// ── Status sync ───────────────────────────────────────────────────────────────

export function isReservationActiveNow(reservation, now) {
  if (!reservation?.start || !reservation?.end) return false;
  const rawStatus = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
  if (rawStatus === 'cancelled' || rawStatus === 'canceled') return false;
  const start = new Date(reservation.start);
  const end   = new Date(reservation.end);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
  return start <= now && now < end;
}

export function syncEquipmentStatuses() {
  const data = loadData();
  const { equipment: equipmentList = [], reservations = [], maintenance = [] } = data;

  if (!Array.isArray(equipmentList) || equipmentList.length === 0) {
    state.equipmentList = equipmentList || [];
    return state.equipmentList;
  }

  const now = new Date();
  let changed = false;

  const maintenanceSet = new Set(
    (maintenance || [])
      .filter((ticket) => ticket?.status === 'open')
      .map((ticket) => normalizeNumbers(String(ticket?.equipmentBarcode ?? '')).trim().toLowerCase())
  );

  const updated = equipmentList.map((item) => {
    if (!item) return item;

    const itemStatus = normalizeStatusValue(item.status);
    const itemCode   = normalizeNumbers(String(item.barcode ?? '')).trim().toLowerCase();
    const inMaintenance = itemCode && maintenanceSet.has(itemCode);

    let newStatus = inMaintenance ? 'maintenance' : 'available';

    if (!inMaintenance && itemCode) {
      for (const reservation of reservations || []) {
        if (!isReservationActiveNow(reservation, now)) continue;
        const hasItem = reservation.items?.some((resItem) => {
          const barcode = normalizeNumbers(String(resItem?.barcode ?? '')).trim().toLowerCase();
          return barcode === itemCode;
        });
        if (hasItem) {
          newStatus = 'reserved';
          break;
        }
      }
    }

    if (newStatus !== itemStatus) changed = true;
    return { ...item, status: newStatus };
  });

  if (changed) {
    setEquipment(updated);
  } else {
    state.equipmentList = updated;
    saveData({ equipment: state.equipmentList });
  }

  return state.equipmentList;
}

// Register sync fn so render.js can call it without circular dep
setSyncEquipmentStatusesFn(syncEquipmentStatuses);

// ── API operations ────────────────────────────────────────────────────────────

export async function refreshEquipmentFromApi({ showToastOnError = true } = {}) {
  state.isLoading = true;
  state.errorMessage = '';
  renderEquipment();

  try {
    if (isLocalDashboardFixtureEnabled()) {
      const snapshot = loadData();
      const localEquipment = Array.isArray(snapshot?.equipment) ? snapshot.equipment : [];
      setEquipment(localEquipment);
      return;
    }

    const response = await apiRequest('/equipment/?all=1');
    const payload  = response?.data ?? response;
    let rawItems   = [];
    if (Array.isArray(payload)) {
      rawItems = payload;
    } else if (payload && typeof payload === 'object') {
      if (Array.isArray(payload.items))   rawItems = payload.items;
      else if (Array.isArray(payload.results)) rawItems = payload.results;
      else if (Array.isArray(payload.data))    rawItems = payload.data;
      else if (Array.isArray(payload.records)) rawItems = payload.records;
    }
    setEquipment(rawItems.map(mapApiEquipment));
  } catch (error) {
    if (error && typeof error === 'object' && Number(error.status) === 401) {
      state.errorMessage = '';
    } else {
      state.errorMessage = resolveApiErrorMessage(error, 'equipment.toast.fetchFailed', 'تعذر تحميل قائمة المعدات');
      if (showToastOnError) showToast(state.errorMessage, 'error');
    }
  } finally {
    state.isLoading = false;
    renderEquipment();
  }
}

export async function clearEquipment() {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  if (!confirm(t('equipment.toast.clearConfirm', '⚠️ هل أنت متأكد من حذف كل المعدات؟'))) return;

  try {
    const response    = await apiRequest('/equipment/?all=1', { method: 'DELETE' });
    const deletedCount = response?.meta?.deleted ?? 0;
    await refreshEquipmentFromApi({ showToastOnError: false });
    showToast(
      t('equipment.toast.clearSuccess', '🗑️ تم مسح جميع المعدات') + (deletedCount ? ` (${deletedCount})` : '')
    );
  } catch (error) {
    showToast(resolveApiErrorMessage(error, 'equipment.toast.clearFailed', '⚠️ تعذر حذف بعض المعدات'), 'error');
  }
}

export async function deleteEquipment(index) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  const items = getAllEquipment();
  const item  = items[index];
  if (!item) return;

  if (!confirm(t('equipment.toast.deleteConfirm', '❌ هل أنت متأكد من حذف هذه المعدة؟'))) return;

  try {
    if (item.id) {
      await apiRequest(`/equipment/?id=${encodeURIComponent(item.id)}`, { method: 'DELETE' });
    }
    const updated = [...items];
    updated.splice(index, 1);
    setEquipment(updated);
    renderEquipment();
    showToast(t('equipment.toast.deleteSuccess', '🗑️ تم حذف المعدة'));
  } catch (error) {
    showToast(resolveApiErrorMessage(error, 'equipment.toast.deleteFailed', 'تعذر حذف المعدة، يرجى المحاولة مجدداً'), 'error');
  }
}

export async function handleAddEquipmentSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const desc       = form.querySelector('#new-equipment-desc')?.value?.trim() || '';
  const rawBarcode = form.querySelector('#new-equipment-barcode')?.value || '';
  const barcode    = normalizeNumbers(rawBarcode).trim();
  const price      = parseFloatSafe(form.querySelector('#new-equipment-price')?.value || '0');
  const cost       = parseFloatSafe(form.querySelector('#new-equipment-cost')?.value || '0');
  const qty        = parseInteger(form.querySelector('#new-equipment-qty')?.value || '1');
  const image      = form.querySelector('#new-equipment-image')?.value?.trim() || '';
  const category   = form.querySelector('#new-equipment-category')?.value?.trim() || '';
  const sub        = form.querySelector('#new-equipment-sub')?.value?.trim() || '';
  const lessor     = form.querySelector('#new-equipment-lessor')?.value?.trim() || '';
  const statusValue = form.querySelector('#new-equipment-status')?.value || 'متاح';

  if (!desc || !barcode) {
    showToast(t('equipment.toast.missingFields', '⚠️ يرجى إدخال الوصف والباركود'));
    return;
  }

  const payload = buildEquipmentPayload({ category, subcategory: sub, description: desc, quantity: qty, unit_price: price, unit_cost: cost, barcode, status: statusValue, image_url: image, lessor });

  try {
    const response   = await apiRequest('/equipment/', { method: 'POST', body: payload });
    const createdRaw = mapApiEquipment(response?.data);
    const resolvedCost = Number.isFinite(Number(createdRaw?.cost))
      ? Number(createdRaw.cost)
      : Number.isFinite(Number(payload.unit_cost)) ? Number(payload.unit_cost) : 0;
    setEquipment([...getAllEquipment(), { ...createdRaw, cost: resolvedCost }]);
    renderEquipment();
    form.reset();
    const statusSelect = form.querySelector('#new-equipment-status');
    if (statusSelect) statusSelect.value = 'متاح';
    showToast(t('equipment.toast.addSuccess', '✅ تم إضافة المعدة'));
  } catch (error) {
    showToast(resolveApiErrorMessage(error, 'equipment.toast.addFailed', 'تعذر إضافة المعدة'), 'error');
  }
}

export async function editEquipment(index, updatedData) {
  const items = getAllEquipment();
  const item  = items[index];
  if (!item) throw new Error('Equipment item not found');

  if (!item.id) {
    const merged = [...items];
    merged[index] = { ...merged[index], ...updatedData };
    setEquipment(merged);
    renderEquipment();
    return;
  }

  const payload = buildEquipmentPayload({
    category:   updatedData.category,
    subcategory: updatedData.sub,
    description: updatedData.desc,
    quantity:    updatedData.qty,
    unit_price:  updatedData.price,
    unit_cost:   updatedData.cost,
    barcode:     updatedData.barcode,
    status:      updatedData.status,
    image_url:   updatedData.image,
    lessor:      updatedData.lessor,
  });

  try {
    const response       = await apiRequest(`/equipment/?id=${encodeURIComponent(item.id)}`, { method: 'PATCH', body: payload });
    const updatedItemRaw = mapApiEquipment(response?.data);
    const resolvedCost   = Number.isFinite(Number(updatedItemRaw?.cost))
      ? Number(updatedItemRaw.cost)
      : Number.isFinite(Number(updatedData.cost)) ? Number(updatedData.cost)
      : Number.isFinite(Number(item.cost)) ? Number(item.cost)
      : 0;
    const merged = [...items];
    merged[index] = { ...updatedItemRaw, cost: resolvedCost };
    setEquipment(merged);
    renderEquipment();
    showToast(t('equipment.toast.updateSuccess', '✅ تم تحديث بيانات المعدة بنجاح'));
  } catch (error) {
    showToast(resolveApiErrorMessage(error, 'equipment.toast.updateFailed', 'تعذر تحديث بيانات المعدة'), 'error');
    throw error;
  }
}
