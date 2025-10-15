import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';

const initialTechniciansData = loadData() || {};
let techniciansState = (initialTechniciansData.technicians || []).map(mapLegacyTechnician);

export function getTechniciansState() {
  return techniciansState;
}

export function setTechniciansState(list) {
  techniciansState = Array.isArray(list) ? list.map(mapLegacyTechnician) : [];
  saveData({ technicians: techniciansState });
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('technicians:updated'));
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      document.dispatchEvent(new CustomEvent('technicians:updated'));
    }
  } else if (typeof dispatchEvent === 'function') {
    dispatchEvent(new CustomEvent('technicians:updated'));
  }
  return techniciansState;
}

export async function refreshTechniciansFromApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/technicians/${query ? `?${query}` : ''}`);
  const data = Array.isArray(response?.data) ? response.data.map(mapTechnicianFromApi) : [];
  return setTechniciansState(data);
}

export async function createTechnicianApi(payload) {
  const response = await apiRequest('/technicians/', {
    method: 'POST',
    body: payload,
  });
  const created = mapTechnicianFromApi(response?.data ?? {});
  setTechniciansState([...techniciansState, created]);
  return created;
}

export async function updateTechnicianApi(id, payload) {
  const response = await apiRequest(`/technicians/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapTechnicianFromApi(response?.data ?? {});
  const next = techniciansState.map((tech) =>
    String(tech.id) === String(id) ? updated : tech
  );
  setTechniciansState(next);
  return updated;
}

export async function deleteTechnicianApi(id) {
  await apiRequest(`/technicians/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
  setTechniciansState(
    techniciansState.filter((tech) => String(tech.id) !== String(id))
  );
}

export function buildTechnicianPayload({
  name,
  phone,
  email,
  role,
  department,
  dailyWage,
  dailyTotal,
  status,
  notes,
  active = true,
}) {
  return {
    full_name: name ?? '',
    phone: phone ?? '',
    email: email ?? null,
    specialization: role ?? '',
    department: department ?? null,
    daily_wage: dailyWage ?? 0,
    daily_total: dailyTotal ?? null,
    status: status ?? 'available',
    notes: notes ?? null,
    active: active ? 1 : 0,
  };
}

export function mapTechnicianFromApi(raw = {}) {
  return toInternalTechnician({
    id: raw.id,
    full_name: raw.full_name,
    phone: raw.phone,
    email: raw.email,
    specialization: raw.specialization,
    department: raw.department,
    daily_wage: raw.daily_wage,
    daily_total: raw.daily_total,
    status: raw.status,
    notes: raw.notes,
    active: raw.active,
  });
}

export function mapLegacyTechnician(raw = {}) {
  return toInternalTechnician(raw);
}

function toInternalTechnician(raw = {}) {
  const idValue = raw.id ?? raw.technicianId ?? raw.technician_id ?? raw.ID ?? raw.uuid ?? raw._id ?? null;
  const name = raw.full_name ?? raw.name ?? raw.fullName ?? '';
  const phone = raw.phone ?? '';
  const email = raw.email ?? null;
  const role = raw.specialization ?? raw.role ?? raw.position ?? '';
  const department = raw.department ?? raw.team ?? '';
  const dailyWage = toNumber(raw.daily_wage ?? raw.dailyWage ?? raw.wage ?? raw.rate ?? 0);
  const dailyTotal = toNumber(raw.daily_total ?? raw.dailyTotal ?? raw.total ?? raw.total_wage ?? dailyWage);
  const baseStatusValue = normalizeStatus(raw.baseStatus ?? raw.status ?? 'available');
  const statusValue = normalizeStatus(raw.status ?? raw.baseStatus ?? 'available');
  const notes = raw.notes ?? '';
  const active = raw.active != null ? Boolean(raw.active) : true;

  return {
    id: idValue != null ? String(idValue) : '',
    name,
    phone,
    email,
    role,
    department,
    dailyWage,
    dailyTotal,
    status: statusValue,
    baseStatus: baseStatusValue,
    notes,
    active,
  };
}

function toNumber(value) {
  const num = Number.parseFloat(normalizeNumbers(String(value ?? '0')));
  return Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
}

function normalizeStatus(value) {
  const normalized = String(value ?? '').trim().toLowerCase();
  switch (normalized) {
    case 'available':
    case 'متاح':
      return 'available';
    case 'busy':
    case 'مشغول':
    case 'قيد العمل':
      return 'busy';
    case 'leave':
    case 'إجازة':
    case 'خارج الخدمة':
      return 'leave';
    case 'inactive':
    case 'متوقف':
      return 'inactive';
    default:
      return 'available';
  }
}

export function isApiError(error) {
  return error instanceof ApiError;
}
