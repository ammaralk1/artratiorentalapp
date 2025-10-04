import { saveData, loadData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";
import { apiRequest, ApiError } from "./apiClient.js";
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from "./auth.js";

let editingCustomerId = null;
let isCustomersLoading = false;
let customersErrorMessage = "";
const initialCustomersData = loadData() || {};
let customersState = (initialCustomersData.customers || []).map(mapToInternalCustomer);

function mapToInternalCustomer(rawCustomer = {}) {
  if (!rawCustomer || typeof rawCustomer !== "object") {
    return {
      id: "",
      full_name: "",
      customerName: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      notes: "",
      created_at: null,
      updated_at: null,
    };
  }

  const idValue = rawCustomer.id ?? rawCustomer.customerId ?? rawCustomer.reservationId ?? rawCustomer.customerID;
  const rawFullName = rawCustomer.full_name ?? rawCustomer.customerName ?? rawCustomer.name ?? "";
  const fullName = typeof rawFullName === "string" ? rawFullName.trim() : String(rawFullName || "").trim();

  return {
    id: idValue !== undefined && idValue !== null ? String(idValue) : "",
    full_name: fullName,
    customerName: fullName,
    name: fullName,
    phone: rawCustomer.phone ?? rawCustomer.phoneNumber ?? "",
    email: rawCustomer.email ?? "",
    address: rawCustomer.address ?? "",
    company: rawCustomer.company ?? rawCustomer.companyName ?? "",
    notes: rawCustomer.notes ?? "",
    created_at: rawCustomer.created_at ?? null,
    updated_at: rawCustomer.updated_at ?? null,
  };
}

function emitCustomersChanged() {
  document.dispatchEvent(new CustomEvent('customers:changed'));
}

function getCustomers() {
  return customersState;
}

function setCustomers(customers) {
  customersState = Array.isArray(customers) ? customers.map(mapToInternalCustomer) : [];
  saveData({ customers: customersState });
}

function getFormElements() {
  return {
    form: document.getElementById("customer-form"),
    idInput: document.getElementById("customer-id"),
    nameInput: document.getElementById("customer-name"),
    phoneInput: document.getElementById("customer-phone"),
    emailInput: document.getElementById("customer-email"),
    addressInput: document.getElementById("customer-address"),
    companyInput: document.getElementById("customer-company"),
    notesInput: document.getElementById("customer-notes"),
    submitBtn: document.getElementById("submit-btn"),
    cancelBtn: document.getElementById("customer-cancel-btn"),
  };
}

function setSubmitButtonState(mode = "add") {
  const { submitBtn } = getFormElements();
  if (!submitBtn) return;
  const key = mode === "update" ? "customers.form.actions.update" : "customers.form.actions.submit";
  const fallback = mode === "update" ? "💾 حفظ التعديل" : "➕ إضافة عميل";
  submitBtn.textContent = t(key, fallback);
}

function updateCancelButtonVisibility(show) {
  const { cancelBtn } = getFormElements();
  if (!cancelBtn) return;
  if (show) {
    cancelBtn.classList.remove("d-none");
  } else {
    cancelBtn.classList.add("d-none");
  }
  cancelBtn.textContent = t("customers.form.actions.cancel", "إلغاء التعديل");
}

function refreshCustomerLanguageStrings() {
  const isEditing = Boolean(editingCustomerId);
  setSubmitButtonState(isEditing ? "update" : "add");
  updateCancelButtonVisibility(isEditing);
}

function resetCustomerForm() {
  const { form, idInput, submitBtn, cancelBtn, phoneInput } = getFormElements();
  form?.reset();
  if (idInput) idInput.value = "";
  if (phoneInput) phoneInput.value = phoneInput.value.trim();
  editingCustomerId = null;
  setSubmitButtonState("add");
  updateCancelButtonVisibility(false);
}

function populateCustomerForm(customer) {
  const {
    idInput,
    nameInput,
    phoneInput,
    emailInput,
    addressInput,
    companyInput,
    notesInput,
    submitBtn,
    cancelBtn,
  } = getFormElements();

  if (!customer || !nameInput || !phoneInput) return;

  if (idInput) idInput.value = customer.id;
  nameInput.value = customer.full_name || "";
  phoneInput.value = normalizeNumbers(customer.phone || "");
  if (emailInput) emailInput.value = customer.email || "";
  if (addressInput) addressInput.value = customer.address || "";
  if (companyInput) companyInput.value = customer.company || "";
  if (notesInput) notesInput.value = customer.notes || "";

  editingCustomerId = customer.id;
  setSubmitButtonState("update");
  updateCancelButtonVisibility(true);
}

function collectCustomerForm() {
  const {
    idInput,
    nameInput,
    phoneInput,
    emailInput,
    addressInput,
    companyInput,
    notesInput,
  } = getFormElements();

  if (!nameInput || !phoneInput) return null;

  const customerName = nameInput.value.trim();
  const phone = normalizeNumbers(phoneInput.value.trim());
  phoneInput.value = phone;
  if (!customerName || !phone) {
    showToast(t("customers.toast.missingFields", "يرجى تعبئة الاسم ورقم الهاتف"), "error");
    return null;
  }

  const payload = {
    full_name: customerName,
    phone,
    email: emailInput?.value.trim() || "",
    address: addressInput?.value.trim() || "",
    company: companyInput?.value.trim() || "",
    notes: notesInput?.value.trim() || "",
  };

  return {
    payload,
    id: idInput?.value || editingCustomerId || "",
  };
}

async function refreshCustomersFromApi({ showToastOnError = true } = {}) {
  isCustomersLoading = true;
  customersErrorMessage = "";
  renderCustomers();

  try {
    const response = await apiRequest('/customers/');
    const records = Array.isArray(response?.data) ? response.data.map(mapToInternalCustomer) : [];
    setCustomers(records);
  } catch (error) {
    customersErrorMessage = error instanceof ApiError
      ? error.message
      : t('customers.toast.fetchFailed', 'تعذر تحميل قائمة العملاء');
    if (showToastOnError) {
      showToast(customersErrorMessage, 'error');
    }
  } finally {
    isCustomersLoading = false;
    renderCustomers();
  }
}

async function handleCustomerSubmit(event) {
  event.preventDefault();
  const submission = collectCustomerForm();
  if (!submission) return;

  const { payload } = submission;
  const isUpdate = Boolean(editingCustomerId);

  try {
    if (isUpdate) {
      const id = editingCustomerId;
      const response = await apiRequest(`/customers/?id=${encodeURIComponent(id)}`, {
        method: 'PATCH',
        body: payload,
      });
      const updatedCustomer = mapToInternalCustomer(response?.data);
      const updatedList = getCustomers().map((customer) =>
        String(customer.id) === String(id) ? updatedCustomer : customer
      );
      setCustomers(updatedList);
      showToast(t('customers.toast.updateSuccess', 'تم تحديث بيانات العميل بنجاح'));
    } else {
      const response = await apiRequest('/customers/', {
        method: 'POST',
        body: payload,
      });
      const createdCustomer = mapToInternalCustomer(response?.data);
      const updatedList = [...getCustomers(), createdCustomer];
      setCustomers(updatedList);
      showToast(t('customers.toast.createSuccess', 'تمت إضافة العميل بنجاح'));
    }

    renderCustomers();
    resetCustomerForm();
    emitCustomersChanged();
  } catch (error) {
    const message = error instanceof ApiError
      ? error.message
      : t('customers.toast.submitFailed', 'حدث خطأ أثناء حفظ بيانات العميل');
    showToast(message, 'error');
  }
}

async function handleCustomerTableClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("customer-delete-btn")) {
    if (!userCanManageDestructiveActions()) {
      notifyPermissionDenied();
      return;
    }
    const id = target.dataset.id;
    if (!confirm(t("customers.toast.deleteConfirm", "⚠️ هل أنت متأكد من حذف هذا العميل؟"))) {
      return;
    }
    try {
      await apiRequest(`/customers/?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      const customers = getCustomers().filter((c) => String(c.id) !== String(id));
      setCustomers(customers);
      renderCustomers();
      if (String(editingCustomerId) === String(id)) {
        resetCustomerForm();
      }
      showToast(t("customers.toast.deleteSuccess", "تم حذف العميل"));
      emitCustomersChanged();
    } catch (error) {
      const message = error instanceof ApiError
        ? error.message
        : t('customers.toast.deleteFailed', 'تعذر حذف العميل، يرجى المحاولة مجدداً');
      showToast(message, 'error');
    }
    return;
  }

  if (target.classList.contains("customer-edit-btn")) {
    const id = target.dataset.id;
    const customer = getCustomers().find((c) => String(c.id) === String(id));
    if (!customer) return;
    populateCustomerForm(customer);
  }
}

function handleCustomerSearch(event) {
  const searchValue = event.target.value.trim().toLowerCase();
  const customers = getCustomers();
  const filtered = customers.filter((c) => {
    const name = c.full_name?.toLowerCase() || "";
    const phone = c.phone?.toLowerCase() || "";
    const company = c.company?.toLowerCase() || "";
    return (
      name.includes(searchValue) ||
      phone.includes(searchValue) ||
      company.includes(searchValue)
    );
  });

  const emptyMessage = searchValue ? t("customers.table.noResults", "لا توجد نتائج مطابقة") : undefined;
  renderCustomers(filtered, { emptyMessage });
}

function wireUpCustomersUI() {
  const { form, cancelBtn } = getFormElements();
  if (form) {
    form.addEventListener("submit", handleCustomerSubmit);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      resetCustomerForm();
    });
  }

  const table = document.getElementById("customers-table");
  if (table) {
    table.addEventListener("click", handleCustomerTableClick);
  }

  const searchInput = document.getElementById("search-customer-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleCustomerSearch);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  wireUpCustomersUI();
  renderCustomers();
  refreshCustomerLanguageStrings();
  refreshCustomersFromApi();
});

document.addEventListener("language:changed", () => {
  refreshCustomerLanguageStrings();
  renderCustomers();
});

document.addEventListener('customers:refreshRequested', () => {
  refreshCustomersFromApi({ showToastOnError: false });
  refreshCustomerLanguageStrings();
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderCustomers();
});

export function renderCustomers(customersOverride, options = {}) {
  const usingOverride = Array.isArray(customersOverride);
  const customers = usingOverride ? customersOverride : getCustomers();
  const tableBody = document.getElementById("customers-table");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (!usingOverride) {
    if (isCustomersLoading) {
      tableBody.innerHTML = `<tr><td colspan='5'>${t("customers.table.loading", "جاري التحميل...")}</td></tr>`;
      return;
    }

    if (customersErrorMessage) {
      tableBody.innerHTML = `<tr><td colspan='5' class='text-danger'>${customersErrorMessage}</td></tr>`;
      return;
    }
  }

  if (customers.length === 0) {
    const message = options.emptyMessage || t("customers.table.empty", "لا يوجد عملاء");
    tableBody.innerHTML = `<tr><td colspan='5'>${message}</td></tr>`;
    return;
  }

  const editLabel = t("customers.actions.edit", "✏️ تعديل");
  const deleteLabel = t("customers.actions.delete", "🗑️ حذف");
  const canDelete = userCanManageDestructiveActions();

  customers.forEach((customer) => {
    const isEditing = editingCustomerId && String(editingCustomerId) === String(customer.id);
    const row = document.createElement("tr");
    if (isEditing) {
      row.classList.add("customer-table-row-editing");
    }
    const actionButtons = [
      `<button type="button" class="customer-action-btn customer-action-btn--edit customer-edit-btn" data-id="${customer.id}">${editLabel}</button>`
    ];

    if (canDelete) {
      actionButtons.push(`<button type="button" class="customer-action-btn customer-action-btn--delete customer-delete-btn" data-id="${customer.id}">${deleteLabel}</button>`);
    }
    row.innerHTML = `
      <td><a href="customer.html?id=${customer.id}" class="text-decoration-none">${customer.full_name}</a></td>
      <td>${normalizeNumbers(customer.phone)}</td>
      <td>${customer.company || ""}</td>
      <td class="table-notes-cell">${customer.notes || "—"}</td>
      <td class="table-actions-cell">
        <div class="table-action-buttons">
          ${actionButtons.join('')}
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

export function getCustomerById(id) {
  return getCustomers().find(c => String(c.id) === String(id));
}

export function initCustomers() {
  // تم الإبقاء على التهيئة من خلال مراقبة DOMContentLoaded
}
