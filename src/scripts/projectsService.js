import { loadData, saveData } from './storage.js';
import { apiRequest, ApiError } from './apiClient.js';
import { normalizeNumbers } from './utils.js';

const initialProjectsData = loadData() || {};
let projectsState = (initialProjectsData.projects || []).map(mapLegacyProject);
let hasFetchedProjects = false;

export function getProjectsState() {
  return projectsState;
}

export function setProjectsState(projects) {
  projectsState = Array.isArray(projects)
    ? projects.map(toInternalProject)
    : [];
  saveData({ projects: projectsState });
  try {
    const event = new CustomEvent('projects:changed');
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(event);
    }
    if (typeof document !== 'undefined' && typeof document.dispatchEvent === 'function') {
      document.dispatchEvent(event);
    }
  } catch (error) {
    console.warn('⚠️ [projectsService] Failed to dispatch projects:changed event', error);
  }
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

  const records = rawItems.map(mapProjectFromApi);
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
  servicesClientPrice = 0,
  taxAmount = 0,
  totalWithTax = 0,
  discount = 0,
  discountType = 'percent',
  companyShareEnabled = false,
  companySharePercent = null,
  companyShareAmount = 0,
  paidAmount = null,
  paidPercentage = null,
  paymentProgressType = null,
  paymentProgressValue = null,
  confirmed = false,
  technicians = [],
  equipment = [],
  payments,
  paymentHistory,
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
          const sale = Number.parseFloat(expense?.salePrice ?? expense?.sale_price ?? 0) || 0;
          return {
            label,
            amount: Math.round(amount * 100) / 100,
            sale_price: Math.max(0, Math.round(sale * 100) / 100),
            note: (expense?.note ?? '').toString().trim() || undefined,
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
    services_client_price: Number.isFinite(Number(servicesClientPrice))
      ? Math.round(Number(servicesClientPrice) * 100) / 100
      : 0,
    tax_amount: Math.round((Number.parseFloat(taxAmount) || 0) * 100) / 100,
    total_with_tax: Math.round((Number.parseFloat(totalWithTax) || 0) * 100) / 100,
    confirmed: Boolean(confirmed),
    technicians: technicianIds,
    equipment: normalizedEquipment,
    expenses: normalizedExpenses,
  };

  const normalizedDiscount = Math.max(0, Number.parseFloat(discount) || 0);
  payload.discount = normalizedDiscount;
  payload.discount_type = discountType === 'amount' ? 'amount' : 'percent';

  const sharePercentValue = Number.parseFloat(companySharePercent);
  const shareEnabled = Boolean(companyShareEnabled) && Number.isFinite(sharePercentValue) && sharePercentValue > 0;
  payload.company_share_enabled = shareEnabled;
  payload.company_share_percent = shareEnabled ? sharePercentValue : 0;
  payload.company_share_amount = shareEnabled ? Math.max(0, Number.parseFloat(companyShareAmount) || 0) : 0;

  if (Number.isFinite(Number(paidAmount))) {
    payload.paid_amount = Math.max(0, Number.parseFloat(paidAmount) || 0);
  }
  if (Number.isFinite(Number(paidPercentage))) {
    payload.paid_percentage = Math.max(0, Number.parseFloat(paidPercentage) || 0);
  }

  if (paymentProgressType === 'amount' || paymentProgressType === 'percent') {
    payload.payment_progress_type = paymentProgressType;
  }
  if (paymentProgressValue != null && paymentProgressValue !== '') {
    payload.payment_progress_value = Number.parseFloat(paymentProgressValue) || 0;
  }

  if (projectCode) {
    payload.project_code = String(projectCode).trim();
  }

  const paymentsSource = payments !== undefined ? payments : paymentHistory;
  if (paymentsSource !== undefined) {
    const normalizedPayments = normalizeProjectPaymentsCollection(paymentsSource) || [];
    payload.payments = normalizedPayments.map((entry) => ({
      type: entry.type,
      amount: entry.amount != null ? entry.amount : null,
      percentage: entry.percentage != null ? entry.percentage : null,
      value: entry.value != null ? entry.value : null,
      note: entry.note ?? null,
      recorded_at: entry.recordedAt ?? null,
    }));
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
    salePrice: Number.parseFloat(expense?.sale_price ?? expense?.salePrice ?? 0) || 0,
    note: expense?.note ?? '',
  }));

  const rawSharePercent = Number.parseFloat(raw.company_share_percent ?? raw.companySharePercent ?? 0) || 0;
  const shareEnabledFlag = raw.company_share_enabled ?? raw.companyShareEnabled;
  const companyShareEnabled = shareEnabledFlag != null
    ? shareEnabledFlag === true
      || shareEnabledFlag === 1
      || String(shareEnabledFlag).toLowerCase() === 'true'
    : rawSharePercent > 0;

  const paymentsRaw = raw.payment_history ?? raw.paymentHistory ?? raw.payments ?? null;
  const paymentHistory = normalizeProjectPaymentsCollection(paymentsRaw);

  const cancelledFlag = (() => {
    const v = raw.cancelled ?? raw.canceled ?? raw.is_cancelled ?? raw.isCanceled;
    if (v === true || v === 'true' || v === 1 || v === '1') return true;
    if (typeof v === 'string') {
      const s = v.toLowerCase();
      return s === 'yes' || s === 'cancelled' || s === 'canceled';
    }
    return false;
  })();

  return {
    id: idValue != null ? String(idValue) : '',
    projectId: idValue != null ? Number(idValue) : null,
    status: (() => {
      const s = String(raw.status ?? raw.project_status ?? '').toLowerCase();
      if (cancelledFlag) return 'cancelled';
      if (s === 'cancelled' || s === 'canceled' || s === 'ملغي' || s === 'ملغى') return 'cancelled';
      if (s === 'completed' || s === 'مكتمل') return 'completed';
      if (s === 'ongoing' || s === 'in_progress' || s === 'قيد التنفيذ') return 'ongoing';
      if (s === 'upcoming' || s === 'قادم') return 'upcoming';
      return undefined;
    })(),
    cancelled: cancelledFlag,
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
    servicesClientPrice: Number.parseFloat(raw.services_client_price ?? raw.servicesClientPrice ?? 0) || 0,
    taxAmount: Number.parseFloat(raw.tax_amount ?? raw.taxAmount ?? 0) || 0,
    totalWithTax: Number.parseFloat(raw.total_with_tax ?? raw.totalWithTax ?? 0) || 0,
    discount: Number.parseFloat(raw.discount ?? raw.discount_value ?? 0) || 0,
    discountType: raw.discount_type ?? raw.discountType ?? 'percent',
    companyShareEnabled,
    companySharePercent: companyShareEnabled ? rawSharePercent : 0,
    companyShareAmount: Number.parseFloat(raw.company_share_amount ?? raw.companyShareAmount ?? 0) || 0,
    paidAmount: Number.parseFloat(raw.paid_amount ?? raw.paidAmount ?? 0) || 0,
    paidPercent: Number.parseFloat(raw.paid_percentage ?? raw.paidPercent ?? 0) || 0,
    paymentProgressType: raw.payment_progress_type ?? raw.paymentProgressType ?? null,
    paymentProgressValue: raw.payment_progress_value ?? raw.paymentProgressValue ?? null,
    confirmed: Boolean(raw.confirmed ?? false),
    createdAt: raw.created_at ?? raw.createdAt ?? null,
    updatedAt: raw.updated_at ?? raw.updatedAt ?? null,
    technicians,
    techniciansDetails: techniciansRaw.map((item) => (typeof item === 'object' ? item : { id: item })),
    equipment,
    expenses,
    paymentHistory,
  };
}

export function isApiError(error) {
  return error instanceof ApiError;
}

function parseProjectPaymentNumber(value) {
  if (value == null || value === '') return null;
  const normalized = normalizeNumbers(String(value)).replace(/[^\d.,-]/g, '').trim();
  if (!normalized) return null;

  let sanitized = normalized;
  const hasComma = sanitized.includes(',');
  const hasDot = sanitized.includes('.');
  if (hasComma) {
    sanitized = hasDot ? sanitized.replace(/,/g, '') : sanitized.replace(/,/g, '.');
  }

  const parsed = Number.parseFloat(sanitized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeProjectPaymentEntry(entry) {
  if (!entry || typeof entry !== 'object') return null;

  const typeRaw = entry.type ?? entry.payment_type ?? entry.paymentType ?? entry.kind ?? null;
  let type = typeof typeRaw === 'string' ? typeRaw.trim().toLowerCase() : null;
  if (type === 'percentage') {
    type = 'percent';
  }

  const valueCandidate = parseProjectPaymentNumber(entry.value);
  let amount = parseProjectPaymentNumber(entry.amount);
  let percentage = parseProjectPaymentNumber(entry.percentage);

  if (type === 'amount' && amount == null && valueCandidate != null) {
    amount = valueCandidate;
  } else if (type === 'percent' && percentage == null && valueCandidate != null) {
    percentage = valueCandidate;
  }

  if (!type) {
    if (amount != null && amount >= 0) {
      type = 'amount';
    } else if (percentage != null && percentage >= 0) {
      type = 'percent';
    } else if (valueCandidate != null && valueCandidate >= 0) {
      type = 'amount';
      amount = valueCandidate;
    } else {
      return null;
    }
  }

  if (type === 'amount') {
    if (amount == null || !Number.isFinite(amount) || amount < 0) {
      return null;
    }
    amount = Math.round(amount * 100) / 100;
  }

  if (type === 'percent') {
    if (percentage == null || !Number.isFinite(percentage) || percentage < 0) {
      return null;
    }
    percentage = Math.min(100, Math.round(percentage * 100) / 100);
  }

  const noteRaw = entry.note ?? entry.memo ?? entry.description ?? null;
  const note = noteRaw != null ? String(noteRaw).trim() : null;
  const recordedAtRaw = entry.recordedAt ?? entry.recorded_at ?? entry.date ?? null;
  let recordedAt = null;
  if (recordedAtRaw) {
    const parsedDate = new Date(recordedAtRaw);
    if (!Number.isNaN(parsedDate.getTime())) {
      recordedAt = parsedDate.toISOString();
    }
  }
  if (!recordedAt) {
    recordedAt = new Date().toISOString();
  }

  const value = type === 'amount'
    ? amount
    : type === 'percent'
      ? percentage
      : valueCandidate;

  return {
    type,
    amount: amount != null ? amount : null,
    percentage: percentage != null ? percentage : null,
    value: value != null ? Math.round(value * 100) / 100 : null,
    note: note && note.length ? note.slice(0, 500) : null,
    recordedAt,
  };
}

function normalizeProjectPaymentsCollection(source) {
  if (source === undefined) {
    return undefined;
  }
  if (source === null) {
    return [];
  }
  if (!Array.isArray(source)) {
    return [];
  }
  return source
    .map((entry) => normalizeProjectPaymentEntry(entry))
    .filter(Boolean);
}
