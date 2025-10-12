import '../styles/app.css';
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
const heroNameEl = document.getElementById('customer-hero-name');
const heroPhoneEl = document.getElementById('customer-hero-phone');
const heroCompanyEl = document.getElementById('customer-hero-company');
const heroEmailEl = document.getElementById('customer-hero-email');
const heroSummaryEl = document.getElementById('customer-hero-summary');
const editActionBtn = document.getElementById('customer-edit-btn');

if (editActionBtn) {
  editActionBtn.disabled = true;
}


let currentCustomer = null;
let isCustomerLoading = false;
let customerLoadError = '';

function escapeHtml(value = '') {
  const div = document.createElement('div');
  div.textContent = value == null ? '' : String(value);
  return div.innerHTML;
}

function escapeMultiline(value = '') {
  const safe = escapeHtml(value).replace(/\r/g, '');
  const newline = String.fromCharCode(10);
  return safe.includes(newline) ? safe.split(newline).join('<br>') : safe;
}

function updateHeroBadge(element, icon, value, { hideWhenEmpty = false } = {}) {
  if (!element) return;
  const stringValue = value == null ? '' : String(value).trim();
  const hasValue = stringValue.length > 0;
  const displayValue = hasValue ? stringValue : '—';
  element.textContent = `${icon} ${displayValue}`;
  if (hideWhenEmpty) {
    element.classList.toggle('hidden', !hasValue);
  } else {
    element.classList.remove('hidden');
  }
}

function setHeroData(customer) {
  const fallbackSummary = t('customerDetails.pageTitle', 'معلومات العميل');
  if (heroNameEl) {
    heroNameEl.textContent = customer?.customerName || '—';
  }
  if (heroSummaryEl) {
    heroSummaryEl.textContent = customer?.customerName || fallbackSummary;
  }
  const phoneValue = customer?.phone ? normalizeNumbers(customer.phone) : '';
  updateHeroBadge(heroPhoneEl, '📞', phoneValue, { hideWhenEmpty: false });
  updateHeroBadge(heroCompanyEl, '🏢', customer?.companyName || '', { hideWhenEmpty: true });
  updateHeroBadge(heroEmailEl, '📧', customer?.email || '', { hideWhenEmpty: true });
}

if (editActionBtn && !editActionBtn.dataset.listenerAttached) {
  editActionBtn.addEventListener('click', () => {
    if (!currentCustomer) {
      return;
    }
    populateEditModal();
    const modalEl = document.getElementById('editCustomerModal');
    const ModalCtor = typeof bootstrap !== 'undefined' ? bootstrap.Modal : null;
    if (!modalEl || !ModalCtor) {
      return;
    }
    const instance = ModalCtor.getInstance(modalEl) || new ModalCtor(modalEl);
    instance.show();
  });
  editActionBtn.dataset.listenerAttached = 'true';
}

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
    setHeroData(null);

    if (isCustomerLoading) {
      container.innerHTML = `
        <div class="skeleton h-24 w-full rounded-2xl"></div>
        <div class="skeleton h-24 w-full rounded-2xl"></div>
        <div class="skeleton h-24 w-full rounded-2xl"></div>
      `;
      if (editActionBtn) {
        editActionBtn.disabled = true;
      }
      return;
    }

    if (customerLoadError) {
      container.innerHTML = `
        <div class="col-span-full">
          <div class="alert alert-error">${escapeHtml(customerLoadError)}</div>
        </div>
      `;
      if (editActionBtn) {
        editActionBtn.disabled = true;
      }
      return;
    }

    const notFoundMessage = t('customerDetails.errors.notFound', '⚠️ لم يتم العثور على هذا العميل.');
    container.innerHTML = `
      <div class="col-span-full">
        <div class="alert alert-warning" data-i18n data-i18n-key="customerDetails.errors.notFound">${escapeHtml(notFoundMessage)}</div>
      </div>
    `;
    if (editActionBtn) {
      editActionBtn.disabled = true;
    }
    return;
  }

  setHeroData(currentCustomer);

  if (editActionBtn) {
    editActionBtn.disabled = false;
  }

  const fields = [
    { key: 'customerDetails.fields.name', fallback: '👤 الاسم:', value: currentCustomer.customerName || '—' },
    { key: 'customerDetails.fields.phone', fallback: '📞 الجوال:', value: currentCustomer.phone ? normalizeNumbers(currentCustomer.phone) : '—' },
    { key: 'customerDetails.fields.company', fallback: '🏢 الشركة:', value: currentCustomer.companyName || '—' },
    { key: 'customerDetails.fields.email', fallback: '📧 البريد:', value: currentCustomer.email || '—' },
    { key: 'customerDetails.fields.address', fallback: '📍 العنوان:', value: currentCustomer.address || '—' },
    { key: 'customerDetails.fields.notes', fallback: '📝 الملاحظات:', value: currentCustomer.notes || '—', multiline: true }
  ];

  const fieldsHtml = fields.map((field) => {
    const label = t(field.key, field.fallback);
    const rawValue = field.value == null ? '' : String(field.value);
    const trimmedValue = rawValue.trim();
    const displayValue = trimmedValue.length > 0 ? trimmedValue : '—';
    const valueHtml = field.multiline ? escapeMultiline(displayValue) : escapeHtml(displayValue);
    return `
      <article class="rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-sm">
        <span class="text-sm font-medium text-base-content/70" data-i18n data-i18n-key="${field.key}">${escapeHtml(label)}</span>
        <p class="mt-2 text-lg font-semibold text-base-content">${valueHtml}</p>
      </article>
    `;
  }).join('');

  container.innerHTML = fieldsHtml;
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
    setHeroData(null);
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

