import { loadData, saveData } from './storage.js';

const DEFAULT_PREFERENCES = {
  language: 'ar',
  theme: 'light',
  dashboardTab: null,
  dashboardSubTab: null,
  projectsTab: null,
  projectsSubTab: null,
};

const previewState = {
  enabled: false,
  user: null,
  preferences: { ...DEFAULT_PREFERENCES },
  counters: {
    customers: 1000,
    equipment: 2000,
    technicians: 3000,
    reservations: 4000,
    maintenance: 5000,
    projects: 6000,
    users: 7000,
  },
  users: [],
  userLogs: {},
};

function cloneValue(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    return null;
  }
}

function generatePreviewId(bucket) {
  const current = Number.isFinite(previewState.counters[bucket])
    ? previewState.counters[bucket]
    : 1;
  previewState.counters[bucket] = current + 1;
  return current;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function parsePreviewPath(rawPath) {
  const url = new URL(rawPath, 'https://preview.local');
  return {
    pathname: url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`,
    searchParams: url.searchParams,
  };
}

function success(payload) {
  return { ok: true, payload };
}

function failure(status, message, payload = null) {
  return { ok: false, status, message, payload };
}

function nowIso() {
  return new Date().toISOString();
}

function normalizeRole(role) {
  if (!role) return 'viewer';
  const value = String(role).trim().toLowerCase();
  return value || 'viewer';
}

function toNumber(value) {
  const numeric = Number.parseFloat(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function toPositiveInt(value, fallback = 1) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }
  return fallback;
}

function getStoreField(field) {
  const snapshot = loadData();
  return ensureArray(snapshot[field]);
}

function updateStoreField(field, list) {
  saveData({ [field]: list });
}

function updatePreviewPreferences(patch = {}) {
  previewState.preferences = {
    ...previewState.preferences,
    ...patch,
  };
  return cloneValue(previewState.preferences) || { ...DEFAULT_PREFERENCES };
}

function applyLimit(list, searchParams) {
  const limitParam = searchParams.get('limit');
  if (!limitParam) {
    return list;
  }
  const limitValue = Number.parseInt(limitParam, 10);
  if (!Number.isFinite(limitValue) || limitValue < 0) {
    return list;
  }
  return list.slice(0, limitValue);
}

function buildReservationCode(id) {
  return `RSV-${String(id).padStart(4, '0')}`;
}

function computeSummarySnapshot() {
  const data = loadData();
  const reservations = ensureArray(data.reservations);
  const equipment = ensureArray(data.equipment);
  const technicians = ensureArray(data.technicians);
  const projects = ensureArray(data.projects);
  const maintenance = ensureArray(data.maintenance);

  const today = new Date();
  const todayDate = today.toISOString().slice(0, 10);

  let reservationsToday = 0;
  let reservationsUpcoming = 0;

  reservations.forEach((reservation) => {
    const start = reservation.start_datetime || reservation.start || reservation.startDatetime;
    if (!start) return;
    const startDate = String(start).slice(0, 10);
    if (startDate === todayDate) {
      reservationsToday += 1;
    } else if (startDate > todayDate) {
      reservationsUpcoming += 1;
    }
  });

  const equipmentMaintenance = equipment.filter((item) => {
    const status = String(item.status || item.status_raw || '').toLowerCase();
    return status === 'maintenance' || status === 'in_maintenance';
  }).length;

  const techniciansBusy = technicians.filter((tech) => {
    const status = String(tech.status || '').toLowerCase();
    return status === 'busy';
  }).length;

  const projectsActive = projects.filter((project) => {
    const status = String(project.status || '').toLowerCase();
    if (status) {
      return ['active', 'in_progress', 'in-progress', 'confirmed'].includes(status);
    }
    return Boolean(project.confirmed);
  }).length;

  const maintenanceOpen = maintenance.filter((ticket) => {
    const status = String(ticket.status || ticket.status_raw || '').toLowerCase();
    return status !== 'completed' && status !== 'cancelled' && status !== 'closed';
  }).length;

  const maintenanceHighPriority = maintenance.filter((ticket) => {
    const priority = String(ticket.priority || '').toLowerCase();
    return priority === 'high';
  }).length;

  return {
    customers: { total: ensureArray(data.customers).length },
    reservations: {
      total: reservations.length,
      today: reservationsToday,
      upcoming: reservationsUpcoming,
    },
    equipment: {
      total: equipment.length,
      maintenance: equipmentMaintenance,
    },
    technicians: {
      total: technicians.length,
      busy: techniciansBusy,
    },
    projects: {
      total: projects.length,
      active: projectsActive,
    },
    maintenance: {
      open: maintenanceOpen,
      highPriority: maintenanceHighPriority,
    },
  };
}

export function enablePreviewMode() {
  previewState.enabled = true;
}

export function isPreviewMode() {
  return previewState.enabled;
}

export function setPreviewUser(user) {
  enablePreviewMode();
  previewState.user = user ? { ...user } : null;
}

export function getPreviewUser() {
  return previewState.user ? { ...previewState.user } : null;
}

export function seedPreviewData(seed = {}) {
  enablePreviewMode();

  if (seed.currentUser) {
    setPreviewUser(seed.currentUser);
  }

  if (seed.preferences && typeof seed.preferences === 'object') {
    previewState.preferences = {
      ...previewState.preferences,
      ...seed.preferences,
    };
  }

  if (Array.isArray(seed.users)) {
    previewState.users = seed.users.map((user) => ({ ...user }));
  }

  if (seed.userLogs && typeof seed.userLogs === 'object') {
    previewState.userLogs = Object.entries(seed.userLogs).reduce((acc, [key, value]) => {
      acc[key] = {
        sessions: Array.isArray(value.sessions) ? value.sessions.map((session) => ({ ...session })) : [],
        activity: Array.isArray(value.activity) ? value.activity.map((entry) => ({ ...entry })) : [],
      };
      return acc;
    }, {});
  }

  if (seed.counters && typeof seed.counters === 'object') {
    previewState.counters = {
      ...previewState.counters,
      ...seed.counters,
    };
  }

  const patch = {};
  ['customers', 'equipment', 'reservations', 'technicians', 'maintenance', 'projects'].forEach((field) => {
    if (Array.isArray(seed[field])) {
      patch[field] = seed[field].map((item) => ({ ...item }));
    }
  });

  if (Object.keys(patch).length > 0) {
    saveData(patch);
  }
}

function handleAuthRequest(method, body) {
  if (method === 'GET') {
    return success({ data: getPreviewUser() });
  }

  if (method === 'POST') {
    const loginAt = nowIso();
    const username = body?.username || 'preview-admin';
    const role = normalizeRole(body?.role || 'admin');
    const user = {
      id: previewState.user?.id ?? 1,
      username,
      role,
      loginAt,
    };
    setPreviewUser(user);
    return success({ data: { ...user } });
  }

  if (method === 'DELETE') {
    setPreviewUser(null);
    return success({ data: { ok: true } });
  }

  return success({ data: null });
}

function handlePreferencesRequest(method, body) {
  if (method === 'GET') {
    return success({ data: cloneValue(previewState.preferences) || { ...DEFAULT_PREFERENCES } });
  }

  if (method === 'PATCH') {
    const updates = body && typeof body === 'object' ? body : {};
    const next = updatePreviewPreferences(updates);
    return success({ data: next });
  }

  return success({ data: cloneValue(previewState.preferences) || { ...DEFAULT_PREFERENCES } });
}

function handleCustomersRequest(method, searchParams, body) {
  const customers = getStoreField('customers');

  if (method === 'GET') {
    const list = applyLimit(customers, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    const id = generatePreviewId('customers');
    const timestamp = nowIso();
    const fullName = body?.full_name || body?.customerName || body?.name || 'عميل جديد';
    const phone = body?.phone || '';
    const company = body?.company || body?.companyName || '';
    const notes = body?.notes || '';

    const customer = {
      id,
      full_name: fullName,
      customer_name: fullName,
      customerName: fullName,
      name: fullName,
      phone,
      email: body?.email || '',
      address: body?.address || '',
      company,
      notes,
      created_at: timestamp,
      updated_at: timestamp,
    };

    const next = [...customers, customer];
    updateStoreField('customers', next);
    return success({ data: customer });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing customer id');
    }
    const next = customers.map((customer) => {
      if (String(customer.id) !== String(idParam)) {
        return customer;
      }
      const updated = {
        ...customer,
        ...body,
        full_name: body?.full_name || body?.customerName || body?.name || customer.full_name,
        customer_name: body?.full_name || body?.customerName || customer.customer_name,
        customerName: body?.full_name || body?.customerName || customer.customerName,
        name: body?.full_name || body?.customerName || customer.name,
        updated_at: nowIso(),
      };
      return updated;
    });
    updateStoreField('customers', next);
    const updatedRecord = next.find((customer) => String(customer.id) === String(idParam));
    return success({ data: updatedRecord });
  }

  if (method === 'DELETE') {
    if (!idParam) {
      return failure(400, 'Missing customer id');
    }
    const next = customers.filter((customer) => String(customer.id) !== String(idParam));
    updateStoreField('customers', next);
    return success({ data: { ok: true } });
  }

  return success({ data: customers });
}

function buildEquipmentRecord(payload, overrides = {}) {
  const timestamp = nowIso();
  const id = overrides.id ?? generatePreviewId('equipment');
  const description = payload.description || payload.desc || payload.name || 'عنصر';
  const status = String(payload.status || 'available').toLowerCase();
  return {
    id,
    description,
    desc: description,
    name: payload.name || description,
    category: payload.category || '',
    subcategory: payload.subcategory || payload.sub || '',
    sub: payload.subcategory || payload.sub || '',
    quantity: toPositiveInt(payload.quantity ?? payload.qty ?? 1, 1),
    qty: toPositiveInt(payload.quantity ?? payload.qty ?? 1, 1),
    unit_price: toNumber(payload.unit_price ?? payload.price ?? 0),
    price: toNumber(payload.unit_price ?? payload.price ?? 0),
    barcode: payload.barcode || '',
    status,
    image_url: payload.image_url || payload.imageUrl || payload.image || '',
    image: payload.image_url || payload.imageUrl || payload.image || '',
    created_at: overrides.created_at || timestamp,
    updated_at: overrides.updated_at || timestamp,
  };
}

function handleEquipmentRequest(method, searchParams, body) {
  const equipment = getStoreField('equipment');

  if (method === 'GET') {
    const list = applyLimit(equipment, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    if (searchParams.get('bulk') === '1' && Array.isArray(body)) {
      const createdItems = body.map((payload) => buildEquipmentRecord(payload));
      const next = [...equipment, ...createdItems];
      updateStoreField('equipment', next);
      return success({ data: createdItems, meta: { count: createdItems.length } });
    }

    const record = buildEquipmentRecord(body || {});
    const next = [...equipment, record];
    updateStoreField('equipment', next);
    return success({ data: record });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing equipment id');
    }
    const next = equipment.map((item) => {
      if (String(item.id) !== String(idParam)) {
        return item;
      }
      const payload = {
        ...item,
        ...body,
        description: body?.description || body?.desc || body?.name || item.description,
        subcategory: body?.subcategory || body?.sub || item.subcategory,
        sub: body?.subcategory || body?.sub || item.sub,
        quantity: toPositiveInt(body?.quantity ?? body?.qty ?? item.quantity, item.quantity),
        qty: toPositiveInt(body?.quantity ?? body?.qty ?? item.qty, item.qty),
        unit_price: toNumber(body?.unit_price ?? body?.price ?? item.unit_price),
        price: toNumber(body?.unit_price ?? body?.price ?? item.price),
        barcode: body?.barcode || item.barcode,
        status: String(body?.status ?? item.status).toLowerCase(),
        image_url: body?.image_url ?? body?.image ?? body?.imageUrl ?? item.image_url,
        image: body?.image_url ?? body?.image ?? body?.imageUrl ?? item.image,
        updated_at: nowIso(),
      };
      return payload;
    });
    updateStoreField('equipment', next);
    const updated = next.find((item) => String(item.id) === String(idParam));
    return success({ data: updated });
  }

  if (method === 'DELETE') {
    if (searchParams.get('all') === '1') {
      updateStoreField('equipment', []);
      return success({ data: { ok: true } });
    }

    if (!idParam) {
      return failure(400, 'Missing equipment id');
    }
    const next = equipment.filter((item) => String(item.id) !== String(idParam));
    updateStoreField('equipment', next);
    return success({ data: { ok: true } });
  }

  return success({ data: equipment });
}

function buildTechnicianRecord(payload, overrides = {}) {
  const id = overrides.id ?? generatePreviewId('technicians');
  const timestamp = nowIso();
  return {
    id,
    full_name: payload.full_name || payload.name || 'فني جديد',
    name: payload.full_name || payload.name || 'فني جديد',
    phone: payload.phone || '',
    email: payload.email || '',
    specialization: payload.specialization || payload.role || '',
    department: payload.department || '',
    daily_wage: toNumber(payload.daily_wage ?? payload.dailyWage ?? 0),
    status: String(payload.status || 'available').toLowerCase(),
    notes: payload.notes || '',
    active: payload.active != null ? Boolean(payload.active) : true,
    created_at: overrides.created_at || timestamp,
    updated_at: overrides.updated_at || timestamp,
  };
}

function handleTechniciansRequest(method, searchParams, body) {
  const technicians = getStoreField('technicians');

  if (method === 'GET') {
    const list = applyLimit(technicians, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    const record = buildTechnicianRecord(body || {});
    const next = [...technicians, record];
    updateStoreField('technicians', next);
    return success({ data: record });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing technician id');
    }
    const next = technicians.map((tech) => {
      if (String(tech.id) !== String(idParam)) {
        return tech;
      }
      const payload = {
        ...tech,
        ...body,
        full_name: body?.full_name || body?.name || tech.full_name,
        name: body?.full_name || body?.name || tech.name,
        specialization: body?.specialization || body?.role || tech.specialization,
        status: String(body?.status ?? tech.status).toLowerCase(),
        daily_wage: toNumber(body?.daily_wage ?? body?.dailyWage ?? tech.daily_wage),
        updated_at: nowIso(),
      };
      return payload;
    });
    updateStoreField('technicians', next);
    const updated = next.find((tech) => String(tech.id) === String(idParam));
    return success({ data: updated });
  }

  if (method === 'DELETE') {
    if (!idParam) {
      return failure(400, 'Missing technician id');
    }
    const next = technicians.filter((tech) => String(tech.id) !== String(idParam));
    updateStoreField('technicians', next);
    return success({ data: { ok: true } });
  }

  return success({ data: technicians });
}

function normalizeReservationPayload(body = {}) {
  const start = body.start_datetime || body.start || body.startDatetime || nowIso();
  const end = body.end_datetime || body.end || body.endDatetime || start;
  const items = Array.isArray(body.items) ? body.items.map((item) => ({ ...item })) : [];
  const technicians = Array.isArray(body.technicians) ? body.technicians.map((id) => id) : [];
  return {
    customer_id: body.customer_id ?? body.customerId ?? null,
    customer_name: body.customer_name ?? body.customerName ?? '',
    start_datetime: start,
    end_datetime: end,
    status: String(body.status || 'pending').toLowerCase(),
    title: body.title || body.name || 'حجز',
    location: body.location || '',
    notes: body.notes || '',
    project_id: body.project_id ?? body.projectId ?? null,
    total_amount: toNumber(body.total_amount ?? body.totalAmount ?? 0),
    discount: toNumber(body.discount ?? 0),
    discount_type: body.discount_type || 'percent',
    apply_tax: Boolean(body.apply_tax ?? false),
    paid_status: body.paid_status || 'unpaid',
    confirmed: Boolean(body.confirmed ?? false),
    items,
    technicians,
  };
}

function handleReservationsRequest(method, searchParams, body) {
  const reservations = getStoreField('reservations');

  if (method === 'GET') {
    const list = applyLimit(reservations, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    const id = generatePreviewId('reservations');
    const payload = normalizeReservationPayload(body || {});
    const reservation = {
      id,
      reservation_code: body?.reservation_code || buildReservationCode(id),
      reservationId: body?.reservation_code || buildReservationCode(id),
      ...payload,
      technicians: payload.technicians,
    };
    const next = [...reservations, reservation];
    updateStoreField('reservations', next);
    return success({ data: reservation });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing reservation id');
    }
    const next = reservations.map((reservation) => {
      if (String(reservation.id) !== String(idParam)) {
        return reservation;
      }
      const payload = normalizeReservationPayload(body || {});
      return {
        ...reservation,
        ...payload,
        reservation_code: body?.reservation_code || reservation.reservation_code || buildReservationCode(reservation.id),
        reservationId: body?.reservation_code || reservation.reservation_code || buildReservationCode(reservation.id),
      };
    });
    updateStoreField('reservations', next);
    const updated = next.find((reservation) => String(reservation.id) === String(idParam));
    return success({ data: updated });
  }

  if (method === 'DELETE') {
    if (!idParam) {
      return failure(400, 'Missing reservation id');
    }
    const next = reservations.filter((reservation) => String(reservation.id) !== String(idParam));
    updateStoreField('reservations', next);
    return success({ data: { ok: true } });
  }

  return success({ data: reservations });
}

function buildMaintenanceRecord(body = {}, overrides = {}) {
  const id = overrides.id ?? generatePreviewId('maintenance');
  const timestamp = nowIso();
  return {
    id,
    equipment_id: body.equipment_id ?? body.equipmentId ?? null,
    equipment_desc: body.equipment_desc ?? body.equipmentDesc ?? body.equipment_description ?? '',
    equipmentDesc: body.equipment_desc ?? body.equipmentDesc ?? body.equipment_description ?? '',
    equipmentBarcode: body.equipmentBarcode ?? body.equipment_barcode ?? '',
    issue: body.issue ?? body.notes ?? '',
    priority: String(body.priority || 'medium').toLowerCase(),
    status: String(body.status || 'open').toLowerCase(),
    status_raw: body.status_raw || body.status || 'open',
    createdAt: overrides.createdAt || timestamp,
    reportedAt: overrides.reportedAt || timestamp,
    scheduledAt: body.scheduled_at || body.scheduledAt || null,
    resolvedAt: body.resolved_at || body.resolvedAt || null,
    resolutionReport: body.resolution_report || body.resolutionReport || '',
    technicianId: body.technician_id ?? body.technicianId ?? null,
  };
}

function handleMaintenanceRequest(method, searchParams, body) {
  const maintenance = getStoreField('maintenance');

  if (method === 'GET') {
    const list = applyLimit(maintenance, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    const record = buildMaintenanceRecord(body || {});
    const next = [record, ...maintenance];
    updateStoreField('maintenance', next);
    return success({ data: record });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing maintenance id');
    }
    const next = maintenance.map((ticket) => {
      if (String(ticket.id) !== String(idParam)) {
        return ticket;
      }
      return buildMaintenanceRecord({ ...ticket, ...body }, { id: ticket.id, createdAt: ticket.createdAt, reportedAt: ticket.reportedAt });
    });
    updateStoreField('maintenance', next);
    const updated = next.find((ticket) => String(ticket.id) === String(idParam));
    return success({ data: updated });
  }

  if (method === 'DELETE') {
    if (!idParam) {
      return failure(400, 'Missing maintenance id');
    }
    const next = maintenance.filter((ticket) => String(ticket.id) !== String(idParam));
    updateStoreField('maintenance', next);
    return success({ data: { ok: true } });
  }

  return success({ data: maintenance });
}

function buildProjectRecord(body = {}, overrides = {}) {
  const id = overrides.id ?? generatePreviewId('projects');
  const timestamp = nowIso();
  return {
    id,
    project_code: body.project_code || body.projectCode || `PRJ-${String(id).padStart(3, '0')}`,
    title: body.title || 'مشروع',
    type: body.type || 'event',
    client_id: body.client_id ?? body.clientId ?? null,
    client_company: body.client_company ?? body.clientCompany ?? '',
    description: body.description || '',
    start_datetime: body.start_datetime || body.start || body.startDatetime || timestamp,
    end_datetime: body.end_datetime || body.end || body.endDatetime || null,
    apply_tax: Boolean(body.apply_tax ?? false),
    payment_status: body.payment_status || 'unpaid',
    equipment_estimate: toNumber(body.equipment_estimate ?? 0),
    expenses_total: toNumber(body.expenses_total ?? 0),
    tax_amount: toNumber(body.tax_amount ?? 0),
    total_with_tax: toNumber(body.total_with_tax ?? 0),
    confirmed: Boolean(body.confirmed ?? false),
    technicians: Array.isArray(body.technicians) ? body.technicians.map((id) => id) : [],
    equipment: Array.isArray(body.equipment) ? body.equipment.map((item) => ({ ...item })) : [],
    created_at: overrides.created_at || timestamp,
    updated_at: overrides.updated_at || timestamp,
    status: body.status || overrides.status || 'active',
  };
}

function handleProjectsRequest(method, searchParams, body) {
  const projects = getStoreField('projects');

  if (method === 'GET') {
    const list = applyLimit(projects, searchParams);
    return success({ data: list });
  }

  if (method === 'POST') {
    const record = buildProjectRecord(body || {});
    const next = [...projects, record];
    updateStoreField('projects', next);
    return success({ data: record });
  }

  const idParam = searchParams.get('id');

  if (method === 'PATCH') {
    if (!idParam) {
      return failure(400, 'Missing project id');
    }
    const next = projects.map((project) => {
      if (String(project.id) !== String(idParam)) {
        return project;
      }
      return buildProjectRecord({ ...project, ...body }, { id: project.id, created_at: project.created_at, updated_at: nowIso(), status: body?.status || project.status });
    });
    updateStoreField('projects', next);
    const updated = next.find((project) => String(project.id) === String(idParam));
    return success({ data: updated });
  }

  if (method === 'DELETE') {
    if (!idParam) {
      return failure(400, 'Missing project id');
    }
    const next = projects.filter((project) => String(project.id) !== String(idParam));
    updateStoreField('projects', next);
    return success({ data: { ok: true } });
  }

  return success({ data: projects });
}

function handleUsersRequest(method, searchParams, body) {
  const scope = searchParams.get('scope');
  const userId = searchParams.get('user_id');

  if (scope === 'logs') {
    const logs = previewState.userLogs[userId] || { sessions: [], activity: [] };
    return success({ data: cloneValue(logs) || { sessions: [], activity: [] } });
  }

  if (method === 'GET') {
    return success({ data: previewState.users.map((user) => ({ ...user })) });
  }

  if (method === 'POST') {
    const id = generatePreviewId('users');
    const username = body?.username || `user-${id}`;
    const role = normalizeRole(body?.role || 'viewer');
    const record = {
      id,
      username,
      role,
      is_current_user: false,
      created_at: nowIso(),
    };
    previewState.users = [...previewState.users, record];
    return success({ data: record });
  }

  if (method === 'PATCH') {
    if (!userId) {
      return failure(400, 'Missing user id');
    }
    previewState.users = previewState.users.map((user) => {
      if (String(user.id) !== String(userId)) {
        return user;
      }
      return {
        ...user,
        username: body?.username ?? user.username,
        role: normalizeRole(body?.role ?? user.role),
        updated_at: nowIso(),
      };
    });
    const updated = previewState.users.find((user) => String(user.id) === String(userId));
    return success({ data: { ...updated } });
  }

  if (method === 'DELETE') {
    if (!userId) {
      return failure(400, 'Missing user id');
    }
    previewState.users = previewState.users.filter((user) => String(user.id) !== String(userId));
    return success({ data: { ok: true } });
  }

  return success({ data: previewState.users.map((user) => ({ ...user })) });
}

function handleSummaryRequest() {
  const summary = computeSummarySnapshot();
  return success({ data: summary });
}

const HANDLERS = {
  '/auth/': handleAuthRequest,
  '/preferences/': handlePreferencesRequest,
  '/customers/': handleCustomersRequest,
  '/equipment/': handleEquipmentRequest,
  '/technicians/': handleTechniciansRequest,
  '/reservations/': handleReservationsRequest,
  '/maintenance/': handleMaintenanceRequest,
  '/projects/': handleProjectsRequest,
  '/users/': handleUsersRequest,
  '/summary/': handleSummaryRequest,
};

export async function handlePreviewApiRequest(path, { method = 'GET', body } = {}) {
  if (!isPreviewMode()) {
    return null;
  }

  const { pathname, searchParams } = parsePreviewPath(path);
  const handler = HANDLERS[pathname];

  if (!handler) {
    console.warn(`⚠️ Preview API handler missing for ${method} ${pathname}`);
    return success({ data: null });
  }

  return handler(method.toUpperCase(), searchParams, body);
}
