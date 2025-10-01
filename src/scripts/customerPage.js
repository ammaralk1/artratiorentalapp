import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { loadData, saveData, migrateOldData } from './storage.js';
import { renderCustomerReservations, renderCustomerProjects } from './customerDetails.js';
import { showReservationDetails } from './reservationsUI.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { apiRequest, ApiError } from './apiClient.js';
import { mapReservationFromApi } from './reservationsService.js';
import { mapProjectFromApi } from './projectsService.js';
import { mapTechnicianFromApi } from './techniciansService.js';

applyStoredTheme();
checkAuth();
initThemeToggle();
migrateOldData();

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
  logoutBtn.addEventListener('click', () => logout());
  logoutBtn.dataset.listenerAttached = 'true';
}

window.showReservationDetails = showReservationDetails;

const params = new URLSearchParams(window.location.search);
const customerId = params.get('id');
const container = document.getElementById('customer-details');

let currentCustomer = null;
let isCustomerLoading = false;
let customerLoadError = '';

function findCustomerById(id) {
  const { customers } = loadData();
  if (!Array.isArray(customers)) {
    return null;
  }
  return customers.find((customer) => String(customer.id) === String(id));
}

function mapCustomerFromApi(raw = {}) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const idValue = raw.id ?? raw.customerId ?? raw.customer_id ?? null;
  const customerName = raw.full_name ?? raw.customerName ?? raw.name ?? '';

  if (idValue == null) {
    return null;
  }

  return {
    id: String(idValue),
    customerName,
    full_name: customerName,
    phone: raw.phone ?? '',
    companyName: raw.company ?? raw.company_name ?? raw.companyName ?? '',
    company: raw.company ?? raw.company_name ?? raw.companyName ?? '',
    email: raw.email ?? '',
    address: raw.address ?? '',
    notes: raw.notes ?? '',
    created_at: raw.created_at ?? raw.createdAt ?? null,
    updated_at: raw.updated_at ?? raw.updatedAt ?? null,
  };
}

function upsertCustomerInStore(customer) {
  if (!customer) {
    return;
  }

  const snapshot = loadData();
  const customers = Array.isArray(snapshot.customers) ? [...snapshot.customers] : [];
  const index = customers.findIndex((item) => String(item.id) === String(customer.id));

  if (index >= 0) {
    customers[index] = { ...customers[index], ...customer };
  } else {
    customers.push(customer);
  }

  saveData({ customers });
}

async function ensureTechniciansLoaded() {
  const { technicians } = loadData();
  if (Array.isArray(technicians) && technicians.length > 0) {
    return;
  }

  try {
    const response = await apiRequest('/technicians/');
    const records = Array.isArray(response?.data)
      ? response.data.map(mapTechnicianFromApi)
      : [];

    if (records.length > 0) {
      saveData({ technicians: records });
    }
  } catch (error) {
    console.warn('⚠️ Failed to load technicians list', error);
  }
}

async function fetchCustomerReservationsData(id) {
  if (!id) {
    return;
  }

  try {
    const query = new URLSearchParams({ customer_id: String(id), limit: '200' });
    const response = await apiRequest(`/reservations/?${query.toString()}`);
    const records = Array.isArray(response?.data)
      ? response.data.map(mapReservationFromApi)
      : [];

    saveData({ reservations: records });
  } catch (error) {
    console.warn('⚠️ Failed to load customer reservations', error);
  }
}

async function fetchCustomerProjectsData(id) {
  if (!id) {
    return;
  }

  try {
    const query = new URLSearchParams({ client_id: String(id), limit: '200' });
    const response = await apiRequest(`/projects/?${query.toString()}`);
    const records = Array.isArray(response?.data)
      ? response.data.map(mapProjectFromApi)
      : [];

    saveData({ projects: records });
  } catch (error) {
    console.warn('⚠️ Failed to load customer projects', error);
  }
}

async function loadCustomerFromApi(id, { showSpinner = false } = {}) {
  if (!id) {
    return;
  }

  if (showSpinner) {
    isCustomerLoading = true;
    customerLoadError = '';
    renderDetails();
  } else {
    isCustomerLoading = true;
    customerLoadError = '';
  }

  try {
    const response = await apiRequest(`/customers/?id=${encodeURIComponent(id)}`);
    const rawCustomer = response?.data ?? response;
    const mappedCustomer = mapCustomerFromApi(rawCustomer);

    if (!mappedCustomer) {
      throw new Error('Invalid customer payload received from server');
    }

    currentCustomer = mappedCustomer;
    upsertCustomerInStore(mappedCustomer);
    isCustomerLoading = false;
    customerLoadError = '';
    renderDetails();

    await ensureTechniciansLoaded();
    await Promise.all([
      fetchCustomerReservationsData(mappedCustomer.id),
      fetchCustomerProjectsData(mappedCustomer.id),
    ]);

    renderCustomerReservations(mappedCustomer.id);
    renderCustomerProjects(mappedCustomer.id);
  } catch (error) {
    isCustomerLoading = false;

    if (error instanceof ApiError && error.status === 404) {
      currentCustomer = null;
      customerLoadError = '';
      renderDetails();
      return;
    }

    console.error('⚠️ Failed to load customer details', error);
    const message = t('customerDetails.errors.loadFailed', '⚠️ تعذر تحميل بيانات العميل.');

    if (currentCustomer) {
      customerLoadError = '';
      showToast(message);
      renderDetails();
    } else {
      customerLoadError = `${message}${error?.message ? ` (${error.message})` : ''}`;
      renderDetails();
    }
  }
}

function renderDetails() {
  if (!container) {
    return;
  }

  if (!currentCustomer) {
    if (isCustomerLoading) {
      container.innerHTML = `<p class="text-muted" data-i18n data-i18n-key="customerDetails.status.loading">${t('customerDetails.status.loading', '⏳ جارٍ تحميل بيانات العميل...')}</p>`;
      return;
    }

    if (customerLoadError) {
      container.innerHTML = `<p class="text-danger">${customerLoadError}</p>`;
      return;
    }

    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="customerDetails.errors.notFound">${t('customerDetails.errors.notFound', '⚠️ لم يتم العثور على هذا العميل.')}</p>`;
    return;
  }

  const fields = [
    { key: 'customerDetails.fields.name', value: currentCustomer.customerName || '—' },
    { key: 'customerDetails.fields.phone', value: currentCustomer.phone ? normalizeNumbers(currentCustomer.phone) : '—' },
    { key: 'customerDetails.fields.company', value: currentCustomer.companyName || '—' },
    { key: 'customerDetails.fields.email', value: currentCustomer.email || '—' },
    { key: 'customerDetails.fields.address', value: currentCustomer.address || '—' },
    { key: 'customerDetails.fields.notes', value: currentCustomer.notes || '—' },
  ].map(({ key, value }) => `
    <p class="customer-detail-row">
      <strong data-i18n data-i18n-key="${key}">${t(key)}</strong>
      <span>${value}</span>
    </p>
  `).join('');

  container.innerHTML = `
    <div class="customer-details">
      ${fields}
    </div>
    <button class="btn btn-warning mt-3" id="edit-btn" data-i18n data-i18n-key="customerDetails.actions.edit">${t('customerDetails.actions.edit', '✏️ تعديل العميل')}</button>
  `;
  bindEditButton();
}

function populateEditModal() {
  document.getElementById('edit-id').value = currentCustomer?.id || '';
  document.getElementById('edit-name').value = currentCustomer?.customerName || '';
  document.getElementById('edit-phone').value = normalizeNumbers(currentCustomer?.phone || '');
  document.getElementById('edit-company').value = currentCustomer?.companyName || '';
  document.getElementById('edit-email').value = currentCustomer?.email || '';
  document.getElementById('edit-address').value = currentCustomer?.address || '';
  document.getElementById('edit-notes').value = currentCustomer?.notes || '';
}

function bindEditButton() {
  const editBtn = document.getElementById('edit-btn');
  if (!editBtn || editBtn.dataset.listenerAttached) {
    return;
  }

  editBtn.addEventListener('click', () => {
    populateEditModal();
    const modal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
    modal.show();
  });
  editBtn.dataset.listenerAttached = 'true';
}

const saveEditBtn = document.getElementById('save-edit-btn');
if (saveEditBtn && !saveEditBtn.dataset.listenerAttached) {
  saveEditBtn.addEventListener('click', () => {
    if (!currentCustomer) {
      return;
    }

    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value.trim();
    const phone = normalizeNumbers(document.getElementById('edit-phone').value.trim());
    const company = document.getElementById('edit-company').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const address = document.getElementById('edit-address').value.trim();
    const notes = document.getElementById('edit-notes').value.trim();

    if (!name || !phone) {
      showToast(t('customerDetails.toast.missingRequired', '⚠️ الاسم ورقم الهاتف إلزاميان'));
      return;
    }

    const data = loadData();
    const customers = Array.isArray(data.customers) ? data.customers : [];
    const idx = customers.findIndex((customer) => String(customer.id) === String(id));

    if (idx === -1) {
      showToast(t('customerDetails.toast.notFound', '⚠️ العميل غير موجود'));
      return;
    }

    customers[idx] = {
      ...customers[idx],
      customerName: name,
      phone,
      companyName: company,
      email,
      address,
      notes,
    };

    saveData({ customers });
    currentCustomer = customers[idx];
    renderDetails();
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
    document.dispatchEvent(new CustomEvent('customers:changed'));
    showToast(t('customerDetails.toast.updateSuccess', '✅ تم تحديث بيانات العميل'));

    const modal = bootstrap.Modal.getInstance(document.getElementById('editCustomerModal'));
    modal?.hide();
  });
  saveEditBtn.dataset.listenerAttached = 'true';
}

async function initializeCustomerPage() {
  if (!container) {
    return;
  }

  if (!customerId) {
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="customerDetails.errors.missingId">${t('customerDetails.errors.missingId', '⚠️ لا يوجد معرف عميل في الرابط.')}</p>`;
    return;
  }

  currentCustomer = findCustomerById(customerId);
  if (currentCustomer) {
    renderDetails();
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
  }

  await loadCustomerFromApi(customerId, { showSpinner: !currentCustomer });
}

initializeCustomerPage();

document.addEventListener('language:changed', () => {
  renderDetails();
  if (customerId && currentCustomer) {
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
  }
});

