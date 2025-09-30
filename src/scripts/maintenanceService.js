import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';

let maintenanceState = (loadData().maintenance || []).map(mapLegacyMaintenanceTicket);

export function getMaintenanceState() {
  return maintenanceState;
}

export function setMaintenanceState(list) {
  maintenanceState = Array.isArray(list) ? list.map(mapLegacyMaintenanceTicket) : [];
  saveData({ maintenance: maintenanceState });
  dispatchMaintenanceEvent();
  return maintenanceState;
}

export async function refreshMaintenanceFromApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/maintenance/${query ? `?${query}` : ''}`);
  const data = Array.isArray(response?.data) ? response.data.map(mapMaintenanceFromApi) : [];
  return setMaintenanceState(data);
}

export async function createMaintenanceRequest(payload) {
  const response = await apiRequest('/maintenance/', {
    method: 'POST',
    body: payload,
  });
  const created = mapMaintenanceFromApi(response?.data ?? {});
  setMaintenanceState([created, ...maintenanceState.filter((ticket) => ticket.id !== created.id)]);
  return created;
}

export async function updateMaintenanceRequest(id, payload) {
  const response = await apiRequest(`/maintenance/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapMaintenanceFromApi(response?.data ?? {});
  setMaintenanceState(maintenanceState.map((ticket) => (String(ticket.id) === String(id) ? updated : ticket)));
  return updated;
}

export async function deleteMaintenanceRequest(id) {
  await apiRequest(`/maintenance/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  setMaintenanceState(maintenanceState.filter((ticket) => String(ticket.id) !== String(id)));
}

export function buildMaintenancePayload({
  equipmentId,
  technicianId,
  issue,
  priority,
  status,
  scheduledAt,
  resolutionReport,
}) {
  return {
    equipment_id: equipmentId,
    technician_id: technicianId || null,
    maintenance_type: null,
    priority: priority ?? 'medium',
    reported_at: null,
    scheduled_at: scheduledAt || null,
    status: status ?? 'open',
    notes: issue ?? '',
    resolution_report: resolutionReport ?? null,
  };
}

export function mapMaintenanceFromApi(raw = {}) {
  return toInternalMaintenanceTicket({
    id: raw.id,
    equipment_id: raw.equipment_id,
    equipmentBarcode: raw.equipmentBarcode ?? raw.equipment_barcode,
    equipmentDesc: raw.equipmentDesc ?? raw.equipment_desc ?? raw.equipment_description,
    issue: raw.issue ?? raw.notes,
    priority: raw.priority,
    status: raw.status,
    status_raw: raw.status_raw,
    createdAt: raw.createdAt ?? raw.reportedAt ?? raw.reported_at,
    reportedAt: raw.reportedAt ?? raw.reported_at,
    scheduledAt: raw.scheduledAt ?? raw.scheduled_at,
    resolvedAt: raw.resolvedAt ?? raw.resolved_at,
    resolutionReport: raw.resolutionReport ?? raw.resolution_report,
    technicianId: raw.technicianId ?? raw.technician_id,
  });
}

export function mapLegacyMaintenanceTicket(raw = {}) {
  return toInternalMaintenanceTicket(raw);
}

function toInternalMaintenanceTicket(raw = {}) {
  const idValue = raw.id ?? raw.ticketId ?? Date.now();
  const equipmentDesc = raw.equipmentDesc ?? raw.equipment_desc ?? raw.equipmentDescription ?? raw.equipment_name ?? '';
  const statusRaw = normalizeStatusRaw(raw.status_raw ?? raw.status ?? 'open');
  const status = normalizeStatusDisplay(statusRaw);

  return {
    id: Number(idValue),
    equipmentId: raw.equipment_id ?? raw.equipmentId ?? null,
    equipmentBarcode: raw.equipmentBarcode ?? raw.equipment_barcode ?? '',
    equipmentDesc,
    issue: raw.issue ?? raw.notes ?? '',
    priority: normalizePriority(raw.priority ?? 'medium'),
    status,
    statusRaw,
    createdAt: raw.createdAt ?? raw.reportedAt ?? raw.reported_at ?? null,
    reportedAt: raw.reportedAt ?? raw.reported_at ?? null,
    scheduledAt: raw.scheduledAt ?? raw.scheduled_at ?? null,
    resolvedAt: raw.resolvedAt ?? raw.resolved_at ?? null,
    resolutionReport: raw.resolutionReport ?? raw.resolution_report ?? '',
    technicianId: raw.technicianId ?? raw.technician_id ?? null,
  };
}

function normalizeStatusRaw(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  return matchStatus(normalized);
}

function normalizeStatusDisplay(rawStatus) {
  return ['completed', 'cancelled'].includes(rawStatus) ? 'closed' : 'open';
}

function normalizePriority(value) {
  const normalized = String(value ?? 'medium').trim().toLowerCase();
  if (['low', 'medium', 'high'].includes(normalized)) return normalized;
  return 'medium';
}

function matchStatus(status) {
  switch (status) {
    case 'open':
    case 'قيد الصيانة':
    case 'قيد الانتظار':
      return 'open';
    case 'in_progress':
    case 'in-progress':
    case 'جاري العمل':
      return 'in_progress';
    case 'completed':
    case 'مكتمل':
    case 'تم الإصلاح':
    case 'closed':
    case 'مغلق':
      return 'completed';
    case 'cancelled':
    case 'ملغي':
      return 'cancelled';
    default:
      return 'open';
  }
}

function dispatchMaintenanceEvent() {
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('maintenance:updated'));
  } else if (typeof dispatchEvent === 'function') {
    dispatchEvent(new CustomEvent('maintenance:updated'));
  }
}

export function isApiError(error) {
  return error instanceof ApiError;
}
