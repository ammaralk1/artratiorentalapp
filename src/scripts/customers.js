import { saveData, loadData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";
import { apiRequest, ApiError } from "./apiClient.js";
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from "./auth.js";
import {
  DEFAULT_CUSTOMERS_PAGE_SIZE,
  buildCustomersPageNumbers,
  getCustomersPaginationState,
} from "./customersPagination.js";
import { jumpPaginationSectionToStart, settlePaginationSectionToStart } from "./ui/paginationViewport.js";

const LEGACY_SIRV_BASE = 'https://art-ratio.sirv.com';
const CLOUDFLARE_ASSETS_BASE = 'https://assets.art-ratio.com';

function normalizeAssetUrl(value = '') {
  const url = String(value || '').trim();
  if (!url) return '';
  if (url.startsWith(LEGACY_SIRV_BASE)) {
    return `${CLOUDFLARE_ASSETS_BASE}${url.slice(LEGACY_SIRV_BASE.length)}`;
  }
  return url;
}

let editingCustomerId = null;
let isCustomersLoading = false;
let customersErrorMessage = "";
const initialCustomersData = loadData() || {};
let customersState = (initialCustomersData.customers || []).map(mapToInternalCustomer);
let currentCustomerDocument = null;
let documentUploadStatus = 'idle';
let documentUploadError = null;
let customersUiInitialised = false;
let customersBootstrapped = false;
const customersPagination = {
  page: 1,
  pageSize: DEFAULT_CUSTOMERS_PAGE_SIZE,
};
let lastCustomerSearchSignature = '';

function normalizeCustomerDocument(rawCustomer) {
  if (!rawCustomer || typeof rawCustomer !== 'object') {
    return null;
  }

  const documentCandidate = [rawCustomer.document, rawCustomer.attachment, rawCustomer.file]
    .find((value) => value && typeof value === 'object');

  const urlCandidates = [
    rawCustomer.document_url,
    rawCustomer.documentUrl,
    rawCustomer.url,
    rawCustomer.href,
    rawCustomer.link,
    documentCandidate?.url,
    documentCandidate?.href,
    documentCandidate?.link,
  ];

  const pathCandidates = [
    rawCustomer.document_path,
    rawCustomer.documentPath,
    rawCustomer.path,
    documentCandidate?.path,
    documentCandidate?.documentPath,
  ];

  const nameCandidates = [
    rawCustomer.document_file_name,
    rawCustomer.documentFileName,
    rawCustomer.document_name,
    rawCustomer.fileName,
    rawCustomer.filename,
    rawCustomer.name,
    documentCandidate?.fileName,
    documentCandidate?.filename,
    documentCandidate?.name,
  ];

  const mimeCandidates = [
    rawCustomer.document_mime_type,
    rawCustomer.documentMimeType,
    rawCustomer.document_type,
    rawCustomer.mimeType,
    rawCustomer.contentType,
    rawCustomer.type,
    documentCandidate?.mimeType,
    documentCandidate?.contentType,
    documentCandidate?.type,
  ];

  const sizeCandidates = [
    rawCustomer.document_size,
    rawCustomer.documentSize,
    rawCustomer.size,
    documentCandidate?.size,
    documentCandidate?.length,
  ];

  const base64Candidates = [
    documentCandidate?.data,
    documentCandidate?.base64,
    documentCandidate?.content,
    rawCustomer.data,
    rawCustomer.base64,
    rawCustomer.content,
    rawCustomer.document_data,
  ];

  const pickFirstString = (list) => {
    for (const value of list) {
      if (typeof value === 'string' && value.trim() !== '') {
        return value.trim();
      }
    }
    return '';
  };

  const pickFirstNumber = (list) => {
    for (const value of list) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return Math.max(0, Math.trunc(value));
      }
      if (typeof value === 'string' && value.trim() !== '' && /^\d+$/.test(value.trim())) {
        return Math.max(0, parseInt(value.trim(), 10));
      }
    }
    return null;
  };

  const directUrl = pickFirstString(urlCandidates);
  const fileName = pickFirstString(nameCandidates);
  const mimeType = pickFirstString(mimeCandidates) || 'application/octet-stream';
  const path = pickFirstString(pathCandidates);
  const base64 = pickFirstString(base64Candidates);
  const size = pickFirstNumber(sizeCandidates);

  if (!directUrl && !base64) {
    return null;
  }

  let normalizedUrl = normalizeAssetUrl(directUrl);
  let base64Payload = base64;

  if (!normalizedUrl && base64Payload && base64Payload.startsWith('data:')) {
    const commaIndex = base64Payload.indexOf(',');
    if (commaIndex !== -1) {
      normalizedUrl = base64Payload;
      base64Payload = base64Payload.slice(commaIndex + 1);
    }
  }

  if (!normalizedUrl && base64Payload) {
    const prefix = base64Payload.startsWith('data:') ? '' : `data:${mimeType};base64,`;
    normalizedUrl = `${prefix}${base64Payload}`;
  }

  const normalized = {
    url: normalizedUrl,
    fileName,
    mimeType,
    path,
    data: base64Payload || null,
    size,
  };

  if (normalized.url && /assets\.art-ratio\.com/i.test(normalized.url)) {
    normalized.source = 'cloudflare';
  } else if (normalized.url && /sirv\.com/i.test(normalized.url)) {
    normalized.source = 'sirv';
  }

  return normalized;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function resetDocumentUploadState() {
  documentUploadStatus = 'idle';
  documentUploadError = null;
}

function setDocumentUploadState(status, errorMessage) {
  documentUploadStatus = status;
  documentUploadError = errorMessage || null;
  updateDocumentPreviewUI();
}

function documentIsUploading() {
  return documentUploadStatus === 'uploading';
}

function documentHasData(documentData) {
  if (!documentData || typeof documentData !== 'object') {
    return false;
  }
  return Boolean(documentData.url) || Boolean(documentData.data);
}

function buildDocumentPayload(documentData) {
  if (!documentHasData(documentData)) {
    return null;
  }

  const payload = {};
  const baseUrl = typeof documentData.url === 'string' ? documentData.url.trim() : '';
  const sizeValue = documentData.size;

  let finalUrl = baseUrl;

  if (!finalUrl) {
    finalUrl = buildDocumentDataUrl(documentData);
  }

  if (!finalUrl) {
    return null;
  }

  payload.url = finalUrl;

  if (documentData.path) {
    payload.path = documentData.path;
  }

  if (documentData.mimeType) {
    payload.mimeType = documentData.mimeType;
  }

  if (documentData.fileName) {
    payload.fileName = documentData.fileName;
  }

  if (typeof sizeValue === 'number' && Number.isFinite(sizeValue)) {
    payload.size = Math.max(0, Math.trunc(sizeValue));
  } else if (typeof sizeValue === 'string' && sizeValue.trim() !== '' && /^\d+$/.test(sizeValue.trim())) {
    payload.size = Math.max(0, parseInt(sizeValue.trim(), 10));
  }

  return payload;
}

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
  const rawTaxId = rawCustomer.tax_id
    ?? rawCustomer.taxId
    ?? rawCustomer.vat_number
    ?? rawCustomer.vatNumber
    ?? rawCustomer.taxNumber
    ?? '';
  const document = normalizeCustomerDocument(rawCustomer);

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
    tax_id: typeof rawTaxId === 'string' ? rawTaxId.trim() : String(rawTaxId || '').trim(),
    taxId: typeof rawTaxId === 'string' ? rawTaxId.trim() : String(rawTaxId || '').trim(),
    document,
    created_at: rawCustomer.created_at ?? null,
    updated_at: rawCustomer.updated_at ?? null,
  };
}

function emitCustomersChanged() {
  document.dispatchEvent(new CustomEvent('customers:changed'));
}

function resetCustomersPagination() {
  customersPagination.page = 1;
}

function getCustomers() {
  return customersState;
}

function setCustomers(customers) {
  customersState = Array.isArray(customers) ? customers.map(mapToInternalCustomer) : [];
  saveData({ customers: customersState });
}

export async function createCustomerRecord(payload = {}) {
  const customerName = String(payload.full_name ?? payload.customerName ?? payload.name ?? '').trim();
  const phone = normalizeNumbers(String(payload.phone ?? payload.phoneNumber ?? '').trim());

  if (!customerName || !phone) {
    throw new Error(t("customers.toast.missingFields", "يرجى تعبئة الاسم ورقم الهاتف"));
  }

  const normalizedPayload = {
    full_name: customerName,
    phone,
    email: String(payload.email ?? '').trim(),
    address: String(payload.address ?? '').trim(),
    company: String(payload.company ?? payload.companyName ?? '').trim(),
    notes: String(payload.notes ?? '').trim(),
  };

  const taxIdValue = String(payload.tax_id ?? payload.taxId ?? '').trim();
  normalizedPayload.tax_id = taxIdValue;
  normalizedPayload.taxId = taxIdValue;

  if (payload.document) {
    normalizedPayload.document = payload.document;
  }

  const response = await apiRequest('/customers/', {
    method: 'POST',
    body: normalizedPayload,
  });
  const createdCustomerRaw = mapToInternalCustomer(response?.data);
  const fallbackDocument = normalizeCustomerDocument(normalizedPayload.document);
  const createdCustomer = {
    ...createdCustomerRaw,
    document: createdCustomerRaw.document ?? fallbackDocument,
    tax_id: createdCustomerRaw.tax_id ?? normalizedPayload.tax_id ?? '',
    taxId: createdCustomerRaw.taxId ?? normalizedPayload.taxId ?? '',
  };

  const exists = getCustomers().some((customer) => String(customer.id) === String(createdCustomer.id));
  const updatedList = exists
    ? getCustomers().map((customer) => String(customer.id) === String(createdCustomer.id) ? createdCustomer : customer)
    : [...getCustomers(), createdCustomer];
  setCustomers(updatedList);
  emitCustomersChanged();

  return createdCustomer;
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
    taxInput: document.getElementById("customer-tax-id"),
    documentInput: document.getElementById("customer-document"),
    documentNameLabel: document.getElementById("customer-document-name"),
    documentPreviewBtn: document.getElementById("customer-document-preview"),
    submitBtn: document.getElementById("submit-btn"),
    cancelBtn: document.getElementById("customer-cancel-btn"),
  };
}

function updateSubmitButtonDisabled() {
  const { submitBtn } = getFormElements();
  if (!submitBtn) return;
  submitBtn.disabled = documentIsUploading();
}

function updateDocumentPreviewUI() {
  const { documentNameLabel, documentPreviewBtn } = getFormElements();
  const uploading = documentIsUploading();
  const hasDocument = documentHasData(currentCustomerDocument);

  if (documentPreviewBtn) {
    documentPreviewBtn.disabled = !hasDocument || uploading;
  }

  if (documentNameLabel) {
    const emptyLabel = t('customers.form.document.empty', 'لم يتم اختيار ملف بعد');
    let label = emptyLabel;

    if (uploading) {
      label = t('customers.form.document.uploading', '📤 جارٍ رفع الملف...');
    } else if (documentUploadStatus === 'error') {
      label = documentUploadError
        || t('customers.form.document.uploadFailed', '⚠️ فشل رفع الملف');
    } else if (hasDocument) {
      label = currentCustomerDocument?.fileName?.trim()
        || t('customers.form.document.selected', 'تم إرفاق ملف.');
    }

    documentNameLabel.textContent = label;
  }

  updateSubmitButtonDisabled();
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
  updateDocumentPreviewUI();
}

function resetCustomerForm() {
  const { form, idInput, submitBtn, cancelBtn, phoneInput } = getFormElements();
  form?.reset();
  if (idInput) idInput.value = "";
  if (phoneInput) phoneInput.value = phoneInput.value.trim();
  currentCustomerDocument = null;
  resetDocumentUploadState();
  updateDocumentPreviewUI();
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
    taxInput,
    documentInput,
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
  if (taxInput) taxInput.value = customer.tax_id || "";
  if (documentInput) documentInput.value = '';

  currentCustomerDocument = customer.document ? { ...customer.document } : null;
  resetDocumentUploadState();
  updateDocumentPreviewUI();

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
    taxInput,
  } = getFormElements();

  if (!nameInput || !phoneInput) return null;

  const customerName = nameInput.value.trim();
  const phone = normalizeNumbers(phoneInput.value.trim());
  phoneInput.value = phone;
  if (!customerName || !phone) {
    showToast(t("customers.toast.missingFields", "يرجى تعبئة الاسم ورقم الهاتف"), "error");
    return null;
  }

  if (documentIsUploading()) {
    showToast(t('customers.form.document.uploadingWait', '⏳ يرجى الانتظار حتى يكتمل رفع الملف'), 'info');
    return null;
  }

  if (documentUploadStatus === 'error') {
    const message = documentUploadError || t('customers.form.document.uploadFailed', '⚠️ فشل رفع الملف، حاول مرة أخرى');
    showToast(message, 'error');
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

  const taxIdValue = taxInput?.value.trim() || "";
  payload.tax_id = taxIdValue;
  payload.taxId = taxIdValue;

  const documentPayload = buildDocumentPayload(currentCustomerDocument);
  if (documentPayload) {
    payload.document = documentPayload;
  }

  return {
    payload,
    id: idInput?.value || editingCustomerId || "",
  };
}

async function handleDocumentInputChange(event) {
  const { documentInput } = getFormElements();
  const file = event.target?.files && event.target.files[0];

  if (!file) {
    currentCustomerDocument = null;
    resetDocumentUploadState();
    updateDocumentPreviewUI();
    if (documentInput) {
      documentInput.value = '';
    }
    return;
  }

  setDocumentUploadState('uploading');

  try {
    const formData = new FormData();
    formData.append('file', file);
    if (editingCustomerId) {
      formData.append('customer_id', editingCustomerId);
    }

    const response = await apiRequest('/uploads/storage.php', {
      method: 'POST',
      body: formData,
    });

    const uploaded = response?.data;
    if (!uploaded || !uploaded.url) {
      throw new Error('Missing upload URL from server response');
    }

    currentCustomerDocument = {
      url: uploaded.url,
      path: uploaded.path || '',
      fileName: uploaded.fileName || file.name,
      mimeType: uploaded.mimeType || file.type || 'application/octet-stream',
      size: typeof uploaded.size === 'number' ? uploaded.size : file.size,
      source: uploaded.source || 'cloudflare',
    };

    setDocumentUploadState('success');
    showToast(t('customers.form.document.uploadSuccess', '✅ تم رفع الملف بنجاح'), 'success');
  } catch (error) {
    console.error('[customers] Failed to upload document to storage provider', error);
    currentCustomerDocument = null;
    const message = error instanceof ApiError
      ? error.message
      : t('customers.form.document.uploadFailed', '⚠️ تعذر رفع الملف، حاول مرة أخرى');
    setDocumentUploadState('error', message);
    showToast(message, 'error');
  } finally {
    if (documentInput) {
      documentInput.value = '';
    }
    updateDocumentPreviewUI();
  }
}

function buildDocumentDataUrl(documentData) {
  if (!documentData || typeof documentData !== 'object') {
    return '';
  }

  const directUrl = typeof documentData.url === 'string' ? documentData.url.trim() : '';
  if (directUrl) {
    return directUrl;
  }

  const base64 = typeof documentData.data === 'string' ? documentData.data.trim() : '';
  if (!base64) {
    return '';
  }

  const mimeType = documentData.mimeType || 'application/octet-stream';
  return `data:${mimeType};base64,${base64}`;
}

function handleInlineDocumentPreview() {
  if (!documentHasData(currentCustomerDocument)) {
    showToast(t('customers.documents.missing', 'لا يوجد ملف لعرضه'), 'info');
    return;
  }

  const url = buildDocumentDataUrl(currentCustomerDocument);
  if (!url) {
    showToast(t('customers.documents.unsupportedPreview', 'لا يمكن معاينة هذا النوع من الملفات، يمكنك تحميله بالأسفل.'), 'info');
    return;
  }

  window.open(url, '_blank', 'noopener');
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
      const updatedCustomerRaw = mapToInternalCustomer(response?.data);
      const fallbackDocument = normalizeCustomerDocument(payload.document);
      const updatedCustomer = {
        ...updatedCustomerRaw,
        document: updatedCustomerRaw.document ?? fallbackDocument,
        tax_id: updatedCustomerRaw.tax_id ?? payload.tax_id ?? '',
        taxId: updatedCustomerRaw.taxId ?? payload.taxId ?? '',
      };
      const updatedList = getCustomers().map((customer) =>
        String(customer.id) === String(id) ? updatedCustomer : customer
      );
      setCustomers(updatedList);
      showToast(t('customers.toast.updateSuccess', 'تم تحديث بيانات العميل بنجاح'));
    } else {
      await createCustomerRecord(payload);
      showToast(t('customers.toast.createSuccess', 'تمت إضافة العميل بنجاح'));
    }

    renderCustomers();
    resetCustomerForm();
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

  const button = target.closest('button');
  if (!(button instanceof HTMLElement)) return;

  if (button.classList.contains("customer-delete-btn")) {
    if (!userCanManageDestructiveActions()) {
      notifyPermissionDenied();
      return;
    }
    const id = button.dataset.id;
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

  if (button.classList.contains("customer-view-file-btn")) {
    const id = button.dataset.id;
    const customer = getCustomers().find((c) => String(c.id) === String(id));
    if (!documentHasData(customer?.document)) {
      showToast(t('customers.documents.missing', 'لا يوجد ملف لعرضه'), 'info');
      return;
    }

    const href = buildDocumentDataUrl(customer.document);
    if (!href) {
      showToast(t('customers.documents.unsupportedPreview', 'لا يمكن معاينة هذا النوع من الملفات، يمكنك تحميله بالأسفل.'), 'info');
      return;
    }

    window.open(href, '_blank', 'noopener');
    return;
  }

  if (button.classList.contains("customer-edit-btn")) {
    const id = button.dataset.id;
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
  resetCustomersPagination();
  renderCustomers(filtered, { emptyMessage });
}

function getCustomersRenderPaginationData(totalItems) {
  const paginationState = getCustomersPaginationState({
    totalItems,
    page: customersPagination.page,
    pageSize: customersPagination.pageSize,
  });
  customersPagination.page = paginationState.currentPage;
  return paginationState;
}

function renderCustomersPagination(totalItems) {
  const host = document.getElementById("customers-list-pagination");
  if (!host) return;

  const paginationState = getCustomersRenderPaginationData(totalItems);

  if (totalItems <= 0 || paginationState.totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = "";
    return;
  }

  const navLabel = t("customers.pagination.navigation", "التنقل بين صفحات العملاء");
  const prevLabel = t("customers.pagination.prev", "السابق");
  const nextLabel = t("customers.pagination.next", "التالي");
  const pageLabelTemplate = t("customers.pagination.page", "صفحة {page}");
  const rangeTemplate = t("customers.pagination.range", "{from}-{to} من {total}");
  const rangeText = rangeTemplate
    .replace("{from}", normalizeNumbers(String(paginationState.rangeStart)))
    .replace("{to}", normalizeNumbers(String(paginationState.rangeEnd)))
    .replace("{total}", normalizeNumbers(String(totalItems)));
  const pageNumbers = buildCustomersPageNumbers(paginationState.currentPage, paginationState.totalPages);

  const buttonsHtml = pageNumbers.map((page) => {
    const isActive = page === paginationState.currentPage;
    const pageLabel = pageLabelTemplate.replace("{page}", normalizeNumbers(String(page)));
    return `<button type="button" class="${isActive ? "ui-button ui-button--primary btn btn-primary btn-sm" : "ui-button ui-button--outline btn btn-outline btn-sm"}" data-customers-page="${page}" aria-label="${escapeHtml(pageLabel)}" ${isActive ? 'aria-current="page"' : ""}>${normalizeNumbers(String(page))}</button>`;
  }).join("");

  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="ui-button ui-button--outline btn btn-outline btn-sm" data-customers-page="${paginationState.currentPage - 1}" ${paginationState.currentPage <= 1 ? "disabled" : ""} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${buttonsHtml}
      <button type="button" class="ui-button ui-button--outline btn btn-outline btn-sm" data-customers-page="${paginationState.currentPage + 1}" ${paginationState.currentPage >= paginationState.totalPages ? "disabled" : ""} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;

  host.querySelectorAll("[data-customers-page]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextPage = Number.parseInt(button.getAttribute("data-customers-page") || "", 10);
      if (!Number.isFinite(nextPage)) return;
      jumpPaginationSectionToStart(host);
      customersPagination.page = nextPage;
      renderCustomers();
      settlePaginationSectionToStart(host);
    });
  });
}

function renderCustomersCount(totalItems) {
  const countEl = document.getElementById('customers-list-count');
  if (!(countEl instanceof HTMLElement)) return;

  const filteredValue = Math.max(0, Number(totalItems) || 0);
  const allCustomers = getCustomers();
  const totalValue = Array.isArray(allCustomers) ? allCustomers.length : filteredValue;

  if (filteredValue !== totalValue) {
    const filteredTemplate = t('projects.customers.records.filteredCount', '{count} من {total} عميل');
    countEl.textContent = filteredTemplate
      .replace('{count}', normalizeNumbers(String(filteredValue)))
      .replace('{total}', normalizeNumbers(String(totalValue)));
    return;
  }

  const template = t('projects.customers.records.count', '{count} عميل');
  countEl.textContent = template.replace('{count}', normalizeNumbers(String(filteredValue)));
}

function updateCustomersSearchResetButton() {
  const resetButton = document.getElementById('customers-clear-search');
  if (!(resetButton instanceof HTMLButtonElement)) return;

  const searchValue = normalizeNumbers(document.getElementById("search-customer-input")?.value || "").trim();
  resetButton.disabled = searchValue.length === 0;
}

function setupCustomersModuleUi() {
  if (customersUiInitialised) {
    updateDocumentPreviewUI();
    return;
  }

  const { form, cancelBtn } = getFormElements();
  if (form && !form.dataset.listenerAttached) {
    form.addEventListener("submit", handleCustomerSubmit);
    form.dataset.listenerAttached = 'true';
  }

  const { documentInput, documentPreviewBtn } = getFormElements();
  if (documentInput && !documentInput.dataset.listenerAttached) {
    documentInput.addEventListener('change', handleDocumentInputChange);
    documentInput.dataset.listenerAttached = 'true';
  }

  if (documentPreviewBtn && !documentPreviewBtn.dataset.listenerAttached) {
    documentPreviewBtn.addEventListener('click', handleInlineDocumentPreview);
    documentPreviewBtn.dataset.listenerAttached = 'true';
  }

  if (cancelBtn && !cancelBtn.dataset.listenerAttached) {
    cancelBtn.addEventListener("click", () => {
      resetCustomerForm();
    });
    cancelBtn.dataset.listenerAttached = 'true';
  }

  const table = document.getElementById("customers-table");
  if (table && !table.dataset.listenerAttached) {
    table.addEventListener("click", handleCustomerTableClick);
    table.dataset.listenerAttached = 'true';
  }

  const searchInput = document.getElementById("search-customer-input");
  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", () => {
      updateCustomersSearchResetButton();
      handleCustomerSearch();
    });
    searchInput.dataset.listenerAttached = 'true';
  }

  const resetSearchButton = document.getElementById('customers-clear-search');
  if (resetSearchButton && !resetSearchButton.dataset.listenerAttached) {
    resetSearchButton.addEventListener('click', () => {
      if (searchInput instanceof HTMLInputElement) {
        searchInput.value = '';
      }
      updateCustomersSearchResetButton();
      renderCustomers();
    });
    resetSearchButton.dataset.listenerAttached = 'true';
  }

  updateDocumentPreviewUI();
  updateCustomersSearchResetButton();
  customersUiInitialised = true;
}

function renderCustomersTableState(tableBody, message, tone = 'muted') {
  if (!(tableBody instanceof HTMLElement)) return;
  const toneClass = tone === 'danger' ? 'text-danger' : 'text-muted';
  tableBody.innerHTML = `<tr class="projects-table-empty-row"><td colspan='5' class='text-center ${toneClass}'>${message}</td></tr>`;
}

export function initCustomersModule({ loadData = false, showToastOnError = true } = {}) {
  setupCustomersModuleUi();

  if (loadData) {
    return refreshCustomersFromApi({ showToastOnError });
  }

  return Promise.resolve();
}

export function bootCustomersModule(options = {}) {
  if (customersBootstrapped) {
    return;
  }

  const { loadData: shouldLoadData = true, reloadFromStorage = false, showToastOnError = true } = options;
  if (reloadFromStorage) {
    const storedCustomers = loadData()?.customers;
    if (Array.isArray(storedCustomers)) {
      setCustomers(storedCustomers);
    }
  }
  customersBootstrapped = true;
  void initCustomersModule({ loadData: shouldLoadData, showToastOnError })
    .finally(() => {
      renderCustomers();
      refreshCustomerLanguageStrings();
    });
}

function hasCustomersModuleDom() {
  return Boolean(
    document.getElementById('customer-form')
    || document.getElementById('customers-table')
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (!hasCustomersModuleDom()) {
    return;
  }
  bootCustomersModule();
});

document.addEventListener("language:changed", () => {
  refreshCustomerLanguageStrings();
  renderCustomers();
});

document.addEventListener('customers:refreshRequested', () => {
  initCustomersModule({ loadData: false, showToastOnError: false });
  void refreshCustomersFromApi({ showToastOnError: false });
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
  const searchValue = normalizeNumbers(document.getElementById("search-customer-input")?.value || "").toLowerCase().trim();
  const searchSignature = JSON.stringify([searchValue]);
  if (searchSignature !== lastCustomerSearchSignature) {
    resetCustomersPagination();
    lastCustomerSearchSignature = searchSignature;
  }

  tableBody.innerHTML = "";
  renderCustomersCount(customers.length);
  updateCustomersSearchResetButton();

  if (!usingOverride) {
    if (isCustomersLoading) {
      renderCustomersTableState(tableBody, t("customers.table.loading", "جاري التحميل..."));
      renderCustomersPagination(0);
      return;
    }

    if (customersErrorMessage) {
      renderCustomersTableState(tableBody, customersErrorMessage, 'danger');
      renderCustomersPagination(0);
      return;
    }
  }

  if (customers.length === 0) {
    const message = options.emptyMessage || t("customers.table.empty", "لا يوجد عملاء");
    renderCustomersTableState(tableBody, message);
    renderCustomersPagination(0);
    return;
  }

  const paginationState = getCustomersRenderPaginationData(customers.length);
  const visibleCustomers = customers.slice(paginationState.startIndex, paginationState.endIndex);

  const editLabel = t("customers.actions.editCompact", "تعديل");
  const deleteLabel = t("customers.actions.deleteCompact", "حذف");
  const viewLabel = t('customers.actions.viewDocumentCompact', 'ملف');
  const canDelete = userCanManageDestructiveActions();

  visibleCustomers.forEach((customer) => {
    const isEditing = editingCustomerId && String(editingCustomerId) === String(customer.id);
    const row = document.createElement("tr");
    if (isEditing) {
      row.classList.add("customer-table-row-editing");
    }
    const actionButtons = [
      `<button type="button" class="customer-action-btn customer-action-btn--edit customer-edit-btn" data-id="${customer.id}">${editLabel}</button>`
    ];

    if (documentHasData(customer.document)) {
      actionButtons.push(`<button type="button" class="customer-action-btn customer-action-btn--file customer-view-file-btn" data-id="${customer.id}">${viewLabel}</button>`);
    }

    if (canDelete) {
      actionButtons.push(`<button type="button" class="customer-action-btn customer-action-btn--delete customer-delete-btn" data-id="${customer.id}">${deleteLabel}</button>`);
    }
    row.innerHTML = `
      <td><a href="customer.html?id=${customer.id}" class="text-decoration-none">${customer.full_name}</a></td>
      <td>${normalizeNumbers(customer.phone)}</td>
      <td>${customer.company || ""}</td>
      <td class="table-notes-cell">${customer.notes || t('common.placeholder.empty', '—')}</td>
      <td class="table-actions-cell">
        <div class="table-action-buttons">
          ${actionButtons.join('')}
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });

  renderCustomersPagination(customers.length);
}

export function getCustomerById(id) {
  return getCustomers().find(c => String(c.id) === String(id));
}

export function initCustomers() {
  return initCustomersModule({ loadData: false, showToastOnError: false });
}
