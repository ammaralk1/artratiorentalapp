import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';

let projectsState = (loadData().projects || []).map(mapLegacyProject);
let hasFetchedProjects = false;

export function getProjectsState() {
  return projectsState;
}

export function setProjectsState(projects) {
  projectsState = Array.isArray(projects)
    ? projects.map(toInternalProject)
    : [];
  saveData({ projects: projectsState });
  return projectsState;
}

export async function refreshProjectsFromApi(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  const response = await apiRequest(`/projects/${query ? `?${query}` : ''}`);
  const records = Array.isArray(response?.data)
    ? response.data.map(mapProjectFromApi)
    : [];
  setProjectsState(records);
  hasFetchedProjects = true;
  return projectsState;
}

export async function ensureProjectsLoaded({ force = false, params = null } = {}) {
  if (!force && hasFetchedProjects && projectsState.length > 0) {
    return projectsState;
  }

  try {
    const data = await refreshProjectsFromApi(params || {});
    return data;
  } catch (error) {
    console.error('❌ [projectsService] Failed to load projects from API', error);
    return projectsState;
  }
}

export async function createProjectApi(payload) {
  const response = await apiRequest('/projects/', {
    method: 'POST',
    body: payload,
  });
  const created = mapProjectFromApi(response?.data ?? {});
  const next = [...projectsState, created];
  setProjectsState(next);
  hasFetchedProjects = true;
  return created;
}

export async function updateProjectApi(id, payload) {
  const response = await apiRequest(`/projects/?id=${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: payload,
  });
  const updated = mapProjectFromApi(response?.data ?? {});
  const next = projectsState.map((project) => (String(project.id) === String(id) ? updated : project));
  setProjectsState(next);
  hasFetchedProjects = true;
  return updated;
}

export async function deleteProjectApi(id) {
  await apiRequest(`/projects/?id=${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  const next = projectsState.filter((project) => String(project.id) !== String(id));
  setProjectsState(next);
  hasFetchedProjects = true;
}

export function buildProjectPayload({
  projectCode,
  title,
  type,
  clientId,
  clientCompany,
  description,
  start,
  end,
  applyTax,
  paymentStatus,
  equipmentEstimate = 0,
  expenses = [],
  taxAmount = 0,
  totalWithTax = 0,
  confirmed = false,
  technicians = [],
  equipment = [],
} = {}) {
  const technicianIds = Array.isArray(technicians)
    ? technicians
        .map((value) => Number.parseInt(String(value), 10))
        .filter((value) => Number.isInteger(value) && value > 0)
    : [];

  const normalizedEquipment = Array.isArray(equipment)
    ? equipment
        .map((item) => {
          const equipmentId = Number.parseInt(String(item.equipmentId ?? item.equipment_id ?? item.id ?? 0), 10);
          const quantity = Number.parseInt(String(item.qty ?? item.quantity ?? 0), 10);
          if (!Number.isInteger(equipmentId) || equipmentId <= 0) return null;
          return {
            equipment_id: equipmentId,
            quantity: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
          };
        })
        .filter(Boolean)
    : [];

  const normalizedExpenses = Array.isArray(expenses)
    ? expenses
        .map((expense) => {
          const amount = Number.parseFloat(expense?.amount ?? expense?.value ?? 0) || 0;
          const label = (expense?.label ?? expense?.name ?? '').trim();
          if (!label) return null;
          return {
            label,
            amount: Math.round(amount * 100) / 100,
          };
        })
        .filter(Boolean)
    : [];

  const expensesTotal = normalizedExpenses.reduce((sum, expense) => sum + (expense?.amount ?? 0), 0);

  const payload = {
    title,
    type,
    client_id: clientId ? Number.parseInt(String(clientId), 10) : null,
    client_company: clientCompany ?? null,
    description: description ?? null,
    start_datetime: start ?? null,
    end_datetime: end || null,
    apply_tax: Boolean(applyTax),
    payment_status: paymentStatus ?? 'unpaid',
    equipment_estimate: Number.parseFloat(equipmentEstimate) || 0,
    expenses_total: Math.round(expensesTotal * 100) / 100,
    tax_amount: Math.round((Number.parseFloat(taxAmount) || 0) * 100) / 100,
    total_with_tax: Math.round((Number.parseFloat(totalWithTax) || 0) * 100) / 100,
    confirmed: Boolean(confirmed),
    technicians: technicianIds,
    equipment: normalizedEquipment,
    expenses: normalizedExpenses,
  };

  if (projectCode) {
    payload.project_code = String(projectCode).trim();
  }

  if (!payload.end_datetime) {
    delete payload.end_datetime;
  }

  if (!payload.client_company) {
    payload.client_company = null;
  }

  return payload;
}

export function mapProjectFromApi(raw = {}) {
  return toInternalProject(raw);
}

export function mapLegacyProject(raw = {}) {
  return toInternalProject(raw);
}

function toInternalProject(raw = {}) {
  const idValue = raw.id ?? raw.projectId ?? raw.project_id ?? null;
  const techniciansRaw = Array.isArray(raw.technicians) ? raw.technicians : [];
  const technicians = techniciansRaw.map((item) => {
    if (item == null) return null;
    if (typeof item === 'object') {
      const identifier = item.id ?? item.technician_id ?? item.technicianId;
      return identifier != null ? String(identifier) : null;
    }
    return String(item);
  }).filter(Boolean);

  const equipmentRaw = Array.isArray(raw.equipment) ? raw.equipment : [];
  const equipment = equipmentRaw.map((item) => {
    const equipmentId = item?.equipment_id ?? item?.equipmentId ?? item?.id ?? null;
    const quantity = item?.quantity ?? item?.qty ?? 0;
    const barcode = item?.barcode ?? item?.code ?? '';
    const description = item?.description ?? item?.name ?? '';
    return {
      equipmentId: equipmentId != null ? String(equipmentId) : null,
      qty: Number.parseInt(String(quantity), 10) || 0,
      barcode,
      description,
    };
  });

  const expensesRaw = Array.isArray(raw.expenses) ? raw.expenses : [];
  const expenses = expensesRaw.map((expense, index) => ({
    id: expense?.id ?? `expense-${idValue ?? 'x'}-${index}`,
    label: expense?.label ?? '',
    amount: Number.parseFloat(expense?.amount ?? 0) || 0,
  }));

  return {
    id: idValue != null ? String(idValue) : '',
    projectId: idValue != null ? Number(idValue) : null,
    projectCode: raw.project_code ?? raw.projectCode ?? null,
    title: raw.title ?? '',
    type: raw.type ?? raw.projectType ?? '',
    clientId: raw.client_id != null ? String(raw.client_id) : raw.clientId ?? null,
    clientCompany: raw.client_company ?? raw.clientCompany ?? '',
    description: raw.description ?? '',
    start: raw.start_datetime ?? raw.start ?? null,
    end: raw.end_datetime ?? raw.end ?? null,
    applyTax: Boolean(raw.apply_tax ?? raw.applyTax ?? false),
    paymentStatus: raw.payment_status ?? raw.paymentStatus ?? 'unpaid',
    equipmentEstimate: Number.parseFloat(raw.equipment_estimate ?? raw.equipmentEstimate ?? 0) || 0,
    expensesTotal: Number.parseFloat(raw.expenses_total ?? raw.expensesTotal ?? 0) || 0,
    taxAmount: Number.parseFloat(raw.tax_amount ?? raw.taxAmount ?? 0) || 0,
    totalWithTax: Number.parseFloat(raw.total_with_tax ?? raw.totalWithTax ?? 0) || 0,
    confirmed: Boolean(raw.confirmed ?? false),
    createdAt: raw.created_at ?? raw.createdAt ?? null,
    updatedAt: raw.updated_at ?? raw.updatedAt ?? null,
    technicians,
    techniciansDetails: techniciansRaw.map((item) => (typeof item === 'object' ? item : { id: item })),
    equipment,
    expenses,
  };
}

export function isApiError(error) {
  return error instanceof ApiError;
}

