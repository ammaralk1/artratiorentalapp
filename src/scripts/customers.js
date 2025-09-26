import { saveData, loadData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";

let editingCustomerId = null;

function emitCustomersChanged() {
  document.dispatchEvent(new CustomEvent('customers:changed'));
}

function getCustomers() {
  return loadData().customers || [];
}

function setCustomers(customers) {
  saveData({ customers });
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
  nameInput.value = customer.customerName || "";
  phoneInput.value = normalizeNumbers(customer.phone || "");
  if (emailInput) emailInput.value = customer.email || "";
  if (addressInput) addressInput.value = customer.address || "";
  if (companyInput) companyInput.value = customer.companyName || "";
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

  return {
    id: idInput?.value || editingCustomerId || Date.now().toString(),
    customerName,
    phone,
    email: emailInput?.value.trim() || "",
    address: addressInput?.value.trim() || "",
    companyName: companyInput?.value.trim() || "",
    notes: notesInput?.value.trim() || "",
  };
}

function handleCustomerSubmit(event) {
  event.preventDefault();
  const customerData = collectCustomerForm();
  if (!customerData) return;

  const customers = getCustomers();
  const existingIndex = customers.findIndex((c) => String(c.id) === String(customerData.id));

  if (existingIndex >= 0) {
    customers[existingIndex] = { ...customers[existingIndex], ...customerData };
    setCustomers(customers);
    showToast(t("customers.toast.updateSuccess", "تم تحديث بيانات العميل بنجاح"));
  } else {
    customers.push(customerData);
    setCustomers(customers);
    showToast(t("customers.toast.createSuccess", "تمت إضافة العميل بنجاح"));
  }

  renderCustomers();
  resetCustomerForm();
  emitCustomersChanged();
}

function handleCustomerTableClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.classList.contains("customer-delete-btn")) {
    const id = target.dataset.id;
    if (!confirm(t("customers.toast.deleteConfirm", "⚠️ هل أنت متأكد من حذف هذا العميل؟"))) {
      return;
    }
    const customers = getCustomers().filter((c) => String(c.id) !== String(id));
    setCustomers(customers);
    renderCustomers();
    if (editingCustomerId === id) {
      resetCustomerForm();
    }
    showToast(t("customers.toast.deleteSuccess", "تم حذف العميل"));
    emitCustomersChanged();
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
    const name = c.customerName?.toLowerCase() || "";
    const phone = c.phone?.toLowerCase() || "";
    const company = c.companyName?.toLowerCase() || "";
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
});

document.addEventListener("language:changed", () => {
  refreshCustomerLanguageStrings();
  renderCustomers();
});

document.addEventListener('customers:refreshRequested', () => {
  renderCustomers();
  refreshCustomerLanguageStrings();
});

export function renderCustomers(customersOverride, options = {}) {
  const customers = Array.isArray(customersOverride) ? customersOverride : getCustomers();
  const tableBody = document.getElementById("customers-table");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  if (customers.length === 0) {
    const message = options.emptyMessage || t("customers.table.empty", "لا يوجد عملاء");
    tableBody.innerHTML = `<tr><td colspan='6'>${message}</td></tr>`;
    return;
  }

  const editLabel = t("customers.actions.edit", "✏️ تعديل");
  const deleteLabel = t("customers.actions.delete", "🗑️ حذف");

  customers.forEach((customer) => {
    const isEditing = editingCustomerId && String(editingCustomerId) === String(customer.id);
    const row = document.createElement("tr");
    if (isEditing) {
      row.classList.add("table-info");
    }
    row.innerHTML = `
      <td><a href="customer.html?id=${customer.id}" class="text-decoration-none">${customer.customerName}</a></td>
      <td>${normalizeNumbers(customer.phone)}</td>
      <td>${customer.companyName || ""}</td>
      <td class="table-notes-cell">${customer.notes || "—"}</td>
      <td class="table-actions-cell">
        <div class="table-action-buttons">
          <button class="btn btn-sm btn-warning customer-edit-btn" data-id="${customer.id}">${editLabel}</button>
          <button class="btn btn-sm btn-danger customer-delete-btn" data-id="${customer.id}">${deleteLabel}</button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

export function getCustomerById(id) {
  const { customers = [] } = loadData();
  return customers.find(c => String(c.id) === String(id));
}

export function initCustomers() {
  // تم الإبقاء على التهيئة من خلال مراقبة DOMContentLoaded
}
