import { loadData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";
import { userCanManageDestructiveActions, notifyPermissionDenied, AUTH_EVENTS } from "./auth.js";
import {
  getTechniciansState,
  setTechniciansState,
  refreshTechniciansFromApi,
  createTechnicianApi,
  updateTechnicianApi,
  deleteTechnicianApi,
  buildTechnicianPayload,
  isApiError,
} from "./techniciansService.js";

let editingTechnicianId = null;
let technicianPrefillListenerAttached = false;
let techniciansLoading = false;
let techniciansErrorMessage = "";
let techniciansHasLoaded = false;

async function loadTechniciansFromApi({ showToastOnError = true } = {}) {
  if (techniciansLoading) return;

  techniciansLoading = true;
  techniciansErrorMessage = "";
  renderTechniciansTable();

  try {
    await refreshTechniciansFromApi();
    techniciansHasLoaded = true;
  } catch (error) {
    console.error('❌ [technicians] loadTechniciansFromApi failed', error);
    techniciansErrorMessage = isApiError(error)
      ? error.message
      : t('technicians.toast.fetchFailed', 'تعذر تحميل قائمة الطاقم، حاول تحديث الصفحة');
    if (showToastOnError) {
      showToast(techniciansErrorMessage, 'error');
    }
  } finally {
    techniciansLoading = false;
    renderTechniciansTable();
  }
}

function getTechnicians() {
  return getTechniciansState();
}

function normalizeText(value = "") {
  return normalizeNumbers(String(value)).trim().toLowerCase();
}

function normalizeTechnicianId(value) {
  return value == null ? "" : String(value);
}

function normalizePhoneValue(value = "") {
  return normalizeNumbers(String(value)).replace(/[^0-9+]/g, "");
}

function normalizeMoneyValue(value = "") {
  const normalized = normalizeNumbers(String(value)).replace(/[^0-9.]/g, "");
  if (!normalized.includes(".")) return normalized;
  const [integer, ...rest] = normalized.split(".");
  return `${integer}.${rest.join("")}`;
}

function sanitizeNumericInput(element, normalizer) {
  if (!element || element.dataset.normalizerAttached) return;
  element.addEventListener("input", () => {
    const normalized = normalizer(element.value);
    if (element.value !== normalized) {
      const selectionEnd = element.selectionEnd;
      element.value = normalized;
      if (selectionEnd != null) {
        element.setSelectionRange(normalized.length, normalized.length);
      }
    }
  });
  element.dataset.normalizerAttached = "true";
}

function setTechnicianSubmitState(mode = "add") {
  const submitBtn = document.getElementById("technician-submit-btn");
  if (!submitBtn) return;
  const key = mode === "update" ? "technicians.form.actions.update" : "technicians.form.actions.submit";
  const fallback = mode === "update" ? "💾 حفظ التعديل" : "➕ إضافة عضو طاقم";
  submitBtn.textContent = t(key, fallback);
}

function updateTechnicianCancelVisibility(show) {
  const cancelBtn = document.getElementById("technician-cancel-btn");
  if (!cancelBtn) return;
  if (show) {
    cancelBtn.classList.remove("d-none");
  } else {
    cancelBtn.classList.add("d-none");
  }
  cancelBtn.textContent = t("technicians.form.actions.cancel", "إلغاء التعديل");
}

function refreshTechnicianLanguageStrings() {
  setTechnicianSubmitState(editingTechnicianId ? "update" : "add");
  updateTechnicianCancelVisibility(Boolean(editingTechnicianId));
  renderTechniciansTable();
}

function populateRoleFilterOptions(technicians = []) {
  const roleFilter = document.getElementById("technician-role-filter");
  if (!roleFilter) return "";

  const previousValue = roleFilter.value;
  const uniqueRoles = Array.from(
    new Set(
      technicians
        .map((tech) => (tech?.role || "").trim())
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b, "ar", { sensitivity: "base" }));

  const allRolesLabel = t("technicians.search.filters.allRoles", "👔 كل الوظائف");
  roleFilter.innerHTML = `<option value="">${allRolesLabel}</option>` +
    uniqueRoles.map((role) => `<option value="${role}">${role}</option>`).join("");

  if (previousValue && uniqueRoles.includes(previousValue)) {
    roleFilter.value = previousValue;
  } else {
    roleFilter.value = "";
  }

  return roleFilter.value;
}

function resetTechnicianForm() {
  const form = document.getElementById("technician-form");
  if (!form) return;

  form.reset();

  editingTechnicianId = null;
  setTechnicianSubmitState("add");
  updateTechnicianCancelVisibility(false);
}

function populateTechnicianForm(technician) {
  const nameInput = document.getElementById("technician-name");
  const phoneInput = document.getElementById("technician-phone");
  const roleInput = document.getElementById("technician-role");
  const departmentInput = document.getElementById("technician-department");
  const wageInput = document.getElementById("technician-wage");
  const notesInput = document.getElementById("technician-notes");

  if (!nameInput || !phoneInput || !roleInput || !wageInput) return;

  nameInput.value = technician.name || "";
  phoneInput.value = normalizePhoneValue(technician.phone || "");
  roleInput.value = technician.role || "";
  if (departmentInput) departmentInput.value = technician.department || "";
  wageInput.value = normalizeMoneyValue(technician.dailyWage != null ? technician.dailyWage : "");
  if (notesInput) notesInput.value = technician.notes || "";

  editingTechnicianId = String(technician.id);
  setTechnicianSubmitState("update");
  updateTechnicianCancelVisibility(true);
}

function collectTechnicianForm() {
  const nameInput = document.getElementById("technician-name");
  const phoneInput = document.getElementById("technician-phone");
  const roleInput = document.getElementById("technician-role");
  const departmentInput = document.getElementById("technician-department");
  const wageInput = document.getElementById("technician-wage");
  const notesInput = document.getElementById("technician-notes");

  if (!nameInput || !phoneInput || !roleInput || !wageInput) return null;

  const name = nameInput.value.trim();
  const phone = normalizePhoneValue(phoneInput.value.trim());
  phoneInput.value = phone;
  const role = roleInput.value.trim();
  const department = departmentInput?.value.trim() || "";
  const wageValue = normalizeMoneyValue(wageInput.value.trim());
  wageInput.value = wageValue;
  const wage = wageValue === "" ? 0 : parseFloat(wageValue);
  const status = 'available';
  const notes = notesInput?.value.trim() || "";

  if (!name) {
    showToast(t("technicians.toast.missingName", "⚠️ يرجى إدخال اسم عضو الطاقم"));
    nameInput.focus();
    return null;
  }

  if (!phone) {
    showToast(t("technicians.toast.missingPhone", "⚠️ يرجى إدخال رقم التواصل"));
    phoneInput.focus();
    return null;
  }

  if (!role) {
    showToast(t("technicians.toast.missingRole", "⚠️ يرجى إدخال الوظيفة"));
    roleInput.focus();
    return null;
  }

  if (Number.isNaN(wage) || wage < 0) {
    showToast(t("technicians.toast.invalidWage", "⚠️ أدخل قيمة صحيحة للأجر اليومي"));
    wageInput.focus();
    return null;
  }

  return {
    name,
    phone,
    role,
    department,
    dailyWage: Number.isFinite(wage) ? wage : 0,
    status,
    baseStatus: status,
    notes
  };
}

async function handleTechnicianSubmit(event) {
  event.preventDefault();
  const payload = collectTechnicianForm();
  if (!payload) return;

  const apiPayload = buildTechnicianPayload({
    name: payload.name,
    phone: payload.phone,
    role: payload.role,
    department: payload.department,
    dailyWage: payload.dailyWage,
    status: payload.status,
    notes: payload.notes,
    active: true,
  });

  try {
    if (editingTechnicianId) {
      await updateTechnicianApi(editingTechnicianId, apiPayload);
      showToast(t("technicians.toast.updateSuccess", "💾 تم حفظ بيانات عضو الطاقم"));
    } else {
      await createTechnicianApi(apiPayload);
      showToast(t("technicians.toast.addSuccess", "✅ تم إضافة عضو الطاقم"));
    }

    resetTechnicianForm();
    renderTechniciansTable();
  } catch (error) {
    console.error('❌ [technicians] handleTechnicianSubmit failed', error);
    const message = isApiError(error)
      ? error.message
      : t('technicians.toast.saveFailed', 'تعذر حفظ بيانات عضو الطاقم، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

function handleCancelEdit() {
  resetTechnicianForm();
}

function populateTechnicianEditModal(technician) {
  const fields = {
    id: document.getElementById("edit-technician-id"),
    name: document.getElementById("edit-technician-name"),
    phone: document.getElementById("edit-technician-phone"),
    role: document.getElementById("edit-technician-role"),
    department: document.getElementById("edit-technician-department"),
    wage: document.getElementById("edit-technician-wage"),
    status: document.getElementById("edit-technician-status"),
    notes: document.getElementById("edit-technician-notes")
  };

  if (!fields.id || !fields.name || !fields.phone || !fields.role || !fields.wage || !fields.status) return;

  fields.id.value = technician.id || "";
  if (fields.name.value !== (technician.name || "")) fields.name.value = technician.name || "";
  const normalizedPhone = normalizePhoneValue(technician.phone || "");
  if (fields.phone.value !== normalizedPhone) fields.phone.value = normalizedPhone;
  if (fields.role.value !== (technician.role || "")) fields.role.value = technician.role || "";
  if (fields.department && fields.department.value !== (technician.department || "")) {
    fields.department.value = technician.department || "";
  }
  const normalizedWage = normalizeMoneyValue(technician.dailyWage != null ? technician.dailyWage : "");
  if (fields.wage.value !== normalizedWage) fields.wage.value = normalizedWage;
  const statusValue = technician.baseStatus || technician.status || "available";
  if (fields.status.value !== statusValue) fields.status.value = statusValue;
  if (fields.notes && fields.notes.value !== (technician.notes || "")) fields.notes.value = technician.notes || "";

  sanitizeNumericInput(fields.phone, normalizePhoneValue);
  sanitizeNumericInput(fields.wage, normalizeMoneyValue);
}

function collectTechnicianEditModal() {
  const idInput = document.getElementById("edit-technician-id");
  const nameInput = document.getElementById("edit-technician-name");
  const phoneInput = document.getElementById("edit-technician-phone");
  const roleInput = document.getElementById("edit-technician-role");
  const departmentInput = document.getElementById("edit-technician-department");
  const wageInput = document.getElementById("edit-technician-wage");
  const statusSelect = document.getElementById("edit-technician-status");
  const notesInput = document.getElementById("edit-technician-notes");

  if (!idInput || !nameInput || !phoneInput || !roleInput || !wageInput || !statusSelect) return null;

  const id = idInput.value.trim();
  const name = nameInput.value.trim();
  const phone = normalizePhoneValue(phoneInput.value.trim());
  phoneInput.value = phone;
  const role = roleInput.value.trim();
  const department = departmentInput?.value.trim() || "";
  const wageValue = normalizeMoneyValue(wageInput.value.trim());
  wageInput.value = wageValue;
  const wage = wageValue === "" ? 0 : parseFloat(wageValue);
  const status = statusSelect.value || "available";
  const notes = notesInput?.value.trim() || "";

  if (!id) {
    showToast(t("technicians.toast.unidentified", "⚠️ تعذر تحديد عضو الطاقم المطلوب"));
    return null;
  }

  if (!name) {
    showToast(t("technicians.toast.missingName", "⚠️ يرجى إدخال اسم عضو الطاقم"));
    nameInput.focus();
    return null;
  }

  if (!phone) {
    showToast(t("technicians.toast.missingPhone", "⚠️ يرجى إدخال رقم التواصل"));
    phoneInput.focus();
    return null;
  }

  if (!role) {
    showToast(t("technicians.toast.missingRole", "⚠️ يرجى إدخال الوظيفة"));
    roleInput.focus();
    return null;
  }

  if (Number.isNaN(wage) || wage < 0) {
    showToast(t("technicians.toast.invalidWage", "⚠️ أدخل قيمة صحيحة للأجر اليومي"));
    wageInput.focus();
    return null;
  }

  return {
    id,
    name,
    phone,
    role,
    department,
    dailyWage: Number.isFinite(wage) ? wage : 0,
    status,
    baseStatus: status,
    notes
  };
}

async function handleTechnicianModalSave() {
  const payload = collectTechnicianEditModal();
  if (!payload) return;

  const apiPayload = buildTechnicianPayload({
    name: payload.name,
    phone: payload.phone,
    role: payload.role,
    department: payload.department,
    dailyWage: payload.dailyWage,
    status: payload.status,
    notes: payload.notes,
    active: true,
  });

  try {
    await updateTechnicianApi(payload.id, apiPayload);
    showToast(t("technicians.toast.updateSuccess", "💾 تم حفظ بيانات عضو الطاقم"));

    const modalEl = document.getElementById("editTechnicianModal");
    if (modalEl && window.bootstrap?.Modal) {
      window.bootstrap.Modal.getInstance(modalEl)?.hide();
    }

    renderTechniciansTable();
  } catch (error) {
    console.error('❌ [technicians] handleTechnicianModalSave failed', error);
    const message = isApiError(error)
      ? error.message
      : t('technicians.toast.updateFailed', 'تعذر حفظ بيانات عضو الطاقم');
    showToast(message, 'error');
  }
}

function renderTechniciansTable() {
  const tableBody = document.getElementById("technicians-table");
  if (!tableBody) return;

  const searchInput = document.getElementById("search-technician-input");
  const searchTerm = normalizeText(searchInput?.value || "");

  if (techniciansLoading && !techniciansHasLoaded) {
    const loadingMessage = t("technicians.table.loading", "جاري التحميل...");
    tableBody.innerHTML = `<tr><td colspan='6'>${loadingMessage}</td></tr>`;
    return;
  }

  if (techniciansErrorMessage && !techniciansHasLoaded) {
    tableBody.innerHTML = `<tr><td colspan='6' class='text-danger'>${techniciansErrorMessage}</td></tr>`;
    return;
  }

  const technicians = syncTechniciansStatuses();
  const { reservations = [] } = loadData();
  const now = new Date();
  populateRoleFilterOptions(technicians);
  const roleFilter = document.getElementById("technician-role-filter");
  const selectedRoleNormalized = normalizeText(roleFilter?.value || "");

  const filtered = technicians.filter((tech) => {
    if (selectedRoleNormalized && normalizeText(tech.role || "") !== selectedRoleNormalized) {
      return false;
    }

    if (!searchTerm) return true;

    const haystack = normalizeText([
      tech.name,
      tech.phone,
      tech.role,
      tech.department,
      tech.notes
    ].filter(Boolean).join(" "));
    return haystack.includes(searchTerm);
  });

  if (filtered.length === 0) {
    const emptyMessage = t("technicians.table.empty", "لا يوجد أعضاء في الطاقم بعد.");
    tableBody.innerHTML = `<tr><td colspan='6'>${emptyMessage}</td></tr>`;
    return;
  }

  tableBody.innerHTML = filtered.map((tech) => {
    const isEditing = editingTechnicianId && String(editingTechnicianId) === String(tech.id);
    const activeNow = isTechnicianActiveNow(tech.id, reservations, now);
    const effectiveStatus = activeNow ? "busy" : (tech.status || tech.baseStatus || "available");
    const statusInfo = effectiveStatus === "busy"
      ? {
          label: t("technicians.status.busy", "⛔ مشغول"),
          className: "technician-status-badge technician-status-badge--busy"
        }
      : {
          label: t("technicians.status.available", "✅ متاح"),
          className: "technician-status-badge technician-status-badge--available"
        };
    const editLabel = t("technicians.actions.edit", "✏️ تعديل");
    const deleteLabel = t("technicians.actions.delete", "🗑️ حذف");
    const canDelete = userCanManageDestructiveActions();
    const actionButtons = [
      `<button type="button" class="technician-action-btn technician-action-btn--edit technician-edit-btn" data-id="${tech.id}">${editLabel}</button>`
    ];

    if (canDelete) {
      actionButtons.push(`<button type="button" class="technician-action-btn technician-action-btn--delete technician-delete-btn" data-id="${tech.id}">${deleteLabel}</button>`);
    }

    const rowClass = isEditing ? ' class="technician-table-row-editing"' : '';

    return `
      <tr${rowClass}>
        <td><a href="technician.html?id=${tech.id}" class="text-decoration-none">${tech.name}</a></td>
        <td>${tech.role || ""}</td>
        <td>${tech.department || "—"}</td>
        <td><span class="${statusInfo.className}"><span class="technician-status-badge__text">${statusInfo.label}</span></span></td>
        <td class="table-notes-cell">${tech.notes || "—"}</td>
        <td class="table-actions-cell">
          <div class="table-action-buttons">
            ${actionButtons.join('')}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function handleEditClick(id) {
  const technician = getTechnicians().find((tech) => String(tech.id) === String(id));
  if (!technician) {
    showToast(t("technicians.toast.dataNotFound", "⚠️ تعذر العثور على بيانات عضو الطاقم"));
    return;
  }

  populateTechnicianForm(technician);
  showToast(t("technicians.toast.editReady", "✏️ يمكنك تعديل بيانات عضو الطاقم الآن ثم الضغط على حفظ التعديل"));
}

async function handleDeleteClick(id) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  if (!confirm(t("technicians.toast.deleteConfirm", "⚠️ هل أنت متأكد من حذف هذا العضو؟"))) return;

  try {
    await deleteTechnicianApi(id);
    showToast(t("technicians.toast.deleteSuccess", "🗑️ تم حذف عضو الطاقم"));
    if (editingTechnicianId && String(editingTechnicianId) === String(id)) {
      resetTechnicianForm();
    }
    renderTechniciansTable();
  } catch (error) {
    console.error('❌ [technicians] handleDeleteClick failed', error);
    const message = isApiError(error)
      ? error.message
      : t('technicians.toast.deleteFailed', 'تعذر حذف عضو الطاقم، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

export function renderTechnicians() {
  setupTechnicianModule();
  renderTechniciansTable();
}

export function getTechnicianById(id) {
  return getTechnicians().find((tech) => String(tech.id) === String(id)) || null;
}

function isTechnicianActiveNow(technicianId, reservations = [], now) {
  const normalizedId = normalizeTechnicianId(technicianId);
  if (!normalizedId) return false;

  return reservations.some((reservation) => {
    if (!reservation || !reservation.start || !reservation.end) return false;
    const assigned = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    if (!assigned.some((id) => normalizeTechnicianId(id) === normalizedId)) return false;

    const resStart = new Date(reservation.start);
    const resEnd = new Date(reservation.end);
    if (Number.isNaN(resStart.getTime()) || Number.isNaN(resEnd.getTime())) return false;

    return resStart <= now && now < resEnd;
  });
}

export function syncTechniciansStatuses() {
  const reservations = loadData().reservations || [];
  const technicians = getTechniciansState();

  if (!Array.isArray(technicians) || technicians.length === 0) {
    return technicians;
  }

  const now = new Date();
  let changed = false;

  const updated = technicians.map((tech) => {
    if (!tech) return tech;

    const baseStatus = tech.baseStatus || tech.status || "available";
    let newStatus = baseStatus === "busy" ? "busy" : baseStatus;

    if (isTechnicianActiveNow(tech.id, reservations, now)) {
      newStatus = "busy";
    }

    if (newStatus !== tech.status || baseStatus !== tech.baseStatus) {
      changed = true;
    }

    return {
      ...tech,
      baseStatus,
      status: newStatus,
    };
  });

  if (changed) {
    setTechniciansState(updated);
    return updated;
  }

  return technicians;
}

function setupTechnicianModule() {
  const form = document.getElementById("technician-form");
  const firstInit = form && !form.dataset.initialized;

  if (form && !form.dataset.listenerAttached) {
    form.addEventListener("submit", (event) => {
      handleTechnicianSubmit(event).catch((error) => {
        console.error('❌ [technicians] submit handler failed', error);
      });
    });
    form.dataset.listenerAttached = "true";
  }
  if (form) {
    form.dataset.initialized = "true";
  }

  const cancelBtn = document.getElementById("technician-cancel-btn");
  if (cancelBtn && !cancelBtn.dataset.listenerAttached) {
    cancelBtn.addEventListener("click", handleCancelEdit);
    cancelBtn.dataset.listenerAttached = "true";
  }

  sanitizeNumericInput(document.getElementById("technician-phone"), normalizePhoneValue);
  sanitizeNumericInput(document.getElementById("technician-wage"), normalizeMoneyValue);

  const tableBody = document.getElementById("technicians-table");
  if (tableBody && !tableBody.dataset.listenerAttached) {
    tableBody.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.classList.contains("technician-edit-btn")) {
        const id = target.dataset.id;
        handleEditClick(id);
      }

      if (target.classList.contains("technician-delete-btn")) {
        const id = target.dataset.id;
        handleDeleteClick(id).catch((error) => {
          console.error('❌ [technicians] delete handler failed', error);
        });
      }
    });
    tableBody.dataset.listenerAttached = "true";
  }

  const searchInput = document.getElementById("search-technician-input");
  if (searchInput && !searchInput.dataset.listenerAttached) {
    searchInput.addEventListener("input", () => {
      searchInput.value = normalizeNumbers(searchInput.value);
      renderTechniciansTable();
    });
    searchInput.dataset.listenerAttached = "true";
  }

  const roleFilter = document.getElementById("technician-role-filter");
  if (roleFilter && !roleFilter.dataset.listenerAttached) {
    roleFilter.addEventListener("change", () => {
      renderTechniciansTable();
    });
    roleFilter.dataset.listenerAttached = "true";
  }

  const modalSaveBtn = document.getElementById("save-technician-changes");
  if (modalSaveBtn && !modalSaveBtn.dataset.listenerAttached) {
    modalSaveBtn.addEventListener("click", () => {
      handleTechnicianModalSave().catch((error) => {
        console.error('❌ [technicians] modal save failed', error);
      });
    });
    modalSaveBtn.dataset.listenerAttached = "true";
  }

  if (!technicianPrefillListenerAttached) {
    document.addEventListener('technician:prefill', (event) => {
      const technician = event.detail;
      if (technician) populateTechnicianEditModal(technician);
    });
    technicianPrefillListenerAttached = true;
  }

  if (firstInit) {
    resetTechnicianForm();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  setupTechnicianModule();
  renderTechniciansTable();
  refreshTechnicianLanguageStrings();
  loadTechniciansFromApi();
});

const techniciansUpdatedHandler = () => {
  renderTechniciansTable();
};

window.addEventListener('technicians:updated', techniciansUpdatedHandler);
document.addEventListener('technicians:updated', techniciansUpdatedHandler);

document.addEventListener('technicians:refreshRequested', () => {
  setupTechnicianModule();
  renderTechniciansTable();
  refreshTechnicianLanguageStrings();
  loadTechniciansFromApi({ showToastOnError: false });
});

document.addEventListener("language:changed", () => {
  refreshTechnicianLanguageStrings();
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderTechniciansTable();
});
