import { apiRequest, ApiError } from '../apiClient.js';
import { mapReservationFromApi, mapLegacyReservation } from '../reservationsService.js';
import { mapTechnicianFromApi } from '../techniciansService.js';
import { mapMaintenanceFromApi } from '../maintenanceService.js';
import { loadData } from '../storage.js';
import { translate } from './formatters.js';
import reportsState from './state.js';
import { clearReportsMemo } from './calculations.js';

function mapCustomerFromApi(raw = {}) {
  return {
    id: raw?.id != null ? String(raw.id) : '',
    customerName: raw?.full_name ?? raw?.customerName ?? raw?.name ?? '',
    companyName: raw?.company ?? raw?.company_name ?? raw?.companyName ?? '',
    phone: raw?.phone ?? '',
  };
}

function mapEquipmentFromApi(raw = {}) {
  const barcode = String(raw?.barcode ?? '').trim();
  const description = raw?.description ?? raw?.name ?? '';
  return {
    id: raw?.id != null ? String(raw.id) : '',
    barcode,
    desc: description,
    description,
    name: raw?.name ?? description,
    category: raw?.category ?? '',
    subcategory: raw?.subcategory ?? '',
    status: raw?.status ?? '',
    price: Number.parseFloat(raw?.unit_price ?? raw?.price ?? 0) || 0,
  };
}

function mapProjectFromApi(raw = {}) {
  const title = raw?.title ?? raw?.name ?? '';
  const code = raw?.project_code ?? raw?.projectCode ?? '';
  const status = raw?.status ?? '';
  const confirmed = raw?.confirmed === true;

  return {
    id: raw?.id != null ? String(raw.id) : '',
    title,
    code,
    status,
    confirmed,
  };
}

export function hydrateReportsFromCache() {
  let cached;
  try {
    cached = loadData();
  } catch (error) {
    console.warn('⚠️ [reports] Failed to access cached data', error);
    return false;
  }

  if (!cached || typeof cached !== 'object') {
    return false;
  }

  const {
    reservations = [],
    customers = [],
    equipment = [],
    technicians = [],
    projects = [],
    maintenance = [],
  } = cached;

  const hasData = reservations.length
    || customers.length
    || equipment.length
    || technicians.length
    || projects.length;

  if (!hasData) {
    return false;
  }

  reportsState.data.reservations = Array.isArray(reservations)
    ? reservations.map(mapLegacyReservation)
    : [];
  reportsState.data.customers = Array.isArray(customers)
    ? customers.map(mapCustomerFromApi)
    : [];
  reportsState.data.equipment = Array.isArray(equipment)
    ? equipment.map(mapEquipmentFromApi)
    : [];
  reportsState.data.technicians = Array.isArray(technicians)
    ? technicians.map(mapTechnicianFromApi)
    : [];
  reportsState.data.projects = Array.isArray(projects)
    ? projects.map(mapProjectFromApi)
    : [];
  reportsState.data.projectsMap = new Map(reportsState.data.projects.map((project) => [project.id, project]));
  reportsState.data.maintenance = Array.isArray(maintenance)
    ? maintenance.map(mapMaintenanceFromApi)
    : [];
  reportsState.techniciansIndex = new Map((reportsState.data.technicians || []).map((tech) => [String(tech.id), tech]));

  try { clearReportsMemo(); } catch (_) {}

  return true;
}

export async function loadReportsData({ silent = false } = {}) {
  if (reportsState.loading) return;
  reportsState.loading = true;
  reportsState.errorMessage = '';

  if (!silent) {
    reportsState.callbacks.onBeforeRender?.();
  }

  try {
    const [reservationsRes, customersRes, equipmentRes, techniciansRes, projectsRes, maintenanceRes] = await Promise.all([
      apiRequest('/reservations/?limit=500'),
      apiRequest('/customers/?limit=500'),
      apiRequest('/equipment/?limit=500'),
      apiRequest('/technicians/?limit=500'),
      apiRequest('/projects/?limit=500'),
      apiRequest('/maintenance/?limit=500'),
    ]);

    reportsState.data.reservations = Array.isArray(reservationsRes?.data)
      ? reservationsRes.data.map((item) => mapReservationFromApi(item))
      : [];
    reportsState.data.customers = Array.isArray(customersRes?.data)
      ? customersRes.data.map(mapCustomerFromApi)
      : [];
    reportsState.data.equipment = Array.isArray(equipmentRes?.data)
      ? equipmentRes.data.map(mapEquipmentFromApi)
      : [];
    reportsState.data.technicians = Array.isArray(techniciansRes?.data)
      ? techniciansRes.data.map(mapTechnicianFromApi)
      : [];
    reportsState.data.projects = Array.isArray(projectsRes?.data)
      ? projectsRes.data.map(mapProjectFromApi)
      : [];
    reportsState.data.projectsMap = new Map(reportsState.data.projects.map((project) => [project.id, project]));
    reportsState.data.maintenance = Array.isArray(maintenanceRes?.data)
      ? maintenanceRes.data.map(mapMaintenanceFromApi)
      : [];
    reportsState.techniciansIndex = new Map((reportsState.data.technicians || []).map((tech) => [String(tech.id), tech]));
    try { clearReportsMemo(); } catch (_) {}
  } catch (error) {
    console.error('❌ [reports] Failed to load reports data', error);
    // Preserve last known snapshot to avoid wiping UI to zeros
    reportsState.errorMessage = error instanceof ApiError
      ? error.message
      : translate('reservations.reports.error.fetchFailed', 'تعذر تحميل بيانات التقارير، حاول لاحقاً');
    if (!reportsState.data.projectsMap || !(reportsState.data.projectsMap instanceof Map)) {
      reportsState.data.projectsMap = new Map();
    }
  } finally {
    reportsState.loading = false;
    if (!silent) {
      reportsState.callbacks.onAfterRender?.();
    }
  }
}
