import { loadData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t, getCurrentLanguage } from "./language.js";
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
import { formatCurrencyLocalized, escapeHtml } from "./projectsCommon.js";
import {
  ensureTechnicianPositionsLoaded,
  getTechnicianPositionsCache,
  findPositionByName,
  createTechnicianPosition,
  updateTechnicianPosition,
  deleteTechnicianPosition,
} from "./technicianPositions.js";

let editingTechnicianId = null;
let technicianPrefillListenerAttached = false;
let techniciansLoading = false;
let techniciansErrorMessage = "";
let techniciansHasLoaded = false;
let editingPositionId = null;
let activeTechnicianSubTab = "technicians-management";

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

function resolvePositionRates(roleValue, fallbackWage = 0, fallbackTotal = null) {
  const normalizedRole = String(roleValue ?? "").trim();
  const matchedPosition = normalizedRole ? findPositionByName(normalizedRole) : null;
  if (matchedPosition) {
    return {
      matchedPosition,
      dailyWage: Number.isFinite(matchedPosition.cost) ? matchedPosition.cost : 0,
      dailyTotal: matchedPosition.clientPrice == null
        ? null
        : Number.isFinite(matchedPosition.clientPrice)
          ? matchedPosition.clientPrice
          : 0,
    };
  }
  return {
    matchedPosition: null,
    dailyWage: Number.isFinite(fallbackWage) ? fallbackWage : 0,
    dailyTotal: fallbackTotal == null ? null : (Number.isFinite(fallbackTotal) ? fallbackTotal : 0),
  };
}

function getTechnicianRoleSummaryElements() {
  const container = document.getElementById("technician-position-summary");
  const body = document.getElementById("technician-position-summary-body");
  return { container, body };
}

function getPositionLabel(position, language = getCurrentLanguage()) {
  if (!position) return "";
  if (language === 'ar') {
    return position.labelAr || position.labelEn || position.name || "";
  }
  return position.labelEn || position.labelAr || position.name || "";
}

function getAlternatePositionLabel(position, language = getCurrentLanguage()) {
  return language === 'ar'
    ? (position.labelEn || position.labelAr || position.name || "")
    : (position.labelAr || position.labelEn || position.name || "");
}

function clearTechnicianRoleSummary() {
  const { container, body } = getTechnicianRoleSummaryElements();
  if (!container || !body) return;
  body.textContent = "";
  container.hidden = true;
}

function updateTechnicianRoleSummary(roleValue, fallback = {}) {
  const { container, body } = getTechnicianRoleSummaryElements();
  if (!container || !body) return;

  const role = String(roleValue ?? "").trim();
  if (!role) {
    clearTechnicianRoleSummary();
    return;
  }

  const rates = resolvePositionRates(role, fallback?.dailyWage ?? 0, fallback?.dailyTotal ?? null);
  const costLabel = formatCurrencyLocalized(rates.dailyWage || 0);
  const priceLabel = rates.dailyTotal != null
    ? formatCurrencyLocalized(rates.dailyTotal)
    : t('technicians.positionSummary.noClientPrice', '—');

  if (rates.matchedPosition) {
    body.textContent = t(
      'technicians.positionSummary.match',
      'التكلفة: {cost} · سعر العميل: {price}'
    )
      .replace('{cost}', costLabel)
      .replace('{price}', priceLabel);
  } else {
    body.textContent = t(
      'technicians.positionSummary.custom',
      'لا يوجد منصب مطابق. يمكنك إضافته من تبويب المناصب. سيتم حفظ التكلفة الحالية: {cost} · سعر العميل: {price}'
    )
      .replace('{cost}', costLabel)
      .replace('{price}', priceLabel);
  }

  container.hidden = false;
}

function renderPositionOptionsList() {
  const datalist = document.getElementById("technician-position-options");
  if (!datalist) return;

  const positions = getTechnicianPositionsCache();
  const primaryLanguage = getCurrentLanguage();
  const seen = new Set();
  const optionMarkup = [];

  positions.forEach((position) => {
    const primaryLabel = getPositionLabel(position, primaryLanguage).trim();
    if (primaryLabel && !seen.has(primaryLabel.toLowerCase())) {
      optionMarkup.push(`<option value="${escapeHtml(primaryLabel)}"></option>`);
      seen.add(primaryLabel.toLowerCase());
    }

    const secondaryLabel = getAlternatePositionLabel(position, primaryLanguage).trim();
    if (secondaryLabel && !seen.has(secondaryLabel.toLowerCase())) {
      optionMarkup.push(`<option value="${escapeHtml(secondaryLabel)}"></option>`);
      seen.add(secondaryLabel.toLowerCase());
    }

    const slugLabel = position.name?.trim();
    if (slugLabel && !seen.has(slugLabel.toLowerCase())) {
      optionMarkup.push(`<option value="${escapeHtml(slugLabel)}"></option>`);
      seen.add(slugLabel.toLowerCase());
    }
  });

  datalist.innerHTML = optionMarkup.join("");
}

function activateTechnicianSubTab(target) {
  const buttons = Array.from(document.querySelectorAll('[data-tech-tab]'));
  const panels = Array.from(document.querySelectorAll('[data-tech-tab-panel]'));
  const availableIds = buttons.map((button) => button?.getAttribute('data-tech-tab')).filter(Boolean);
  const desired = availableIds.includes(target) ? target : 'technicians-management';

  buttons.forEach((button) => {
    if (!button) return;
    const tabId = button.getAttribute('data-tech-tab');
    const isActive = tabId === desired;
    button.classList.toggle('tab-active', isActive);
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    button.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  panels.forEach((panel) => {
    if (!panel) return;
    const panelId = panel.getAttribute('data-tech-tab-panel');
    const isActive = panelId === desired;
    panel.hidden = !isActive;
    panel.classList.toggle('active', isActive);
  });

  activeTechnicianSubTab = desired;

  const activeButton = buttons.find((btn) => btn?.getAttribute('data-tech-tab') === desired);
  const scrollRoot = activeButton?.closest('[data-tab-scroll]');
  if (scrollRoot) {
    scrollRoot.dispatchEvent(new CustomEvent('tabScroll:update', { bubbles: true }));
  }

  if (desired === 'technicians-positions') {
    renderPositionsTable();
    ensureTechnicianPositionsLoaded()
      .then(() => {
        renderPositionsTable();
      })
      .catch((error) => {
        console.error('❌ [technicians] failed to load positions for tab switch', error);
        showToast(error?.message || t('positions.toast.fetchFailed', '⚠️ تعذر تحميل المناصب، حاول مرة أخرى'), 'error');
      });
  }
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
  clearTechnicianRoleSummary();
}

function populateTechnicianForm(technician) {
  const nameInput = document.getElementById("technician-name");
  const phoneInput = document.getElementById("technician-phone");
  const roleInput = document.getElementById("technician-role");
  const departmentInput = document.getElementById("technician-department");
  const notesInput = document.getElementById("technician-notes");

  if (!nameInput || !phoneInput || !roleInput) return;

  nameInput.value = technician.name || "";
  phoneInput.value = normalizePhoneValue(technician.phone || "");
  roleInput.value = technician.role || "";
  if (departmentInput) departmentInput.value = technician.department || "";
  if (notesInput) notesInput.value = technician.notes || "";

  editingTechnicianId = String(technician.id);
  setTechnicianSubmitState("update");
  updateTechnicianCancelVisibility(true);
  updateTechnicianRoleSummary(roleInput.value, technician);
}

function collectTechnicianForm() {
  const nameInput = document.getElementById("technician-name");
  const phoneInput = document.getElementById("technician-phone");
  const roleInput = document.getElementById("technician-role");
  const departmentInput = document.getElementById("technician-department");
  const notesInput = document.getElementById("technician-notes");

  if (!nameInput || !phoneInput || !roleInput) return null;

  const name = nameInput.value.trim();
  const phone = normalizePhoneValue(phoneInput.value.trim());
  phoneInput.value = phone;
  const role = roleInput.value.trim();
  const department = departmentInput?.value.trim() || "";
  const status = 'available';
  const notes = notesInput?.value.trim() || "";

  const existing = editingTechnicianId ? getTechnicianById(editingTechnicianId) : null;
  const { dailyWage, dailyTotal } = resolvePositionRates(role, existing?.dailyWage ?? 0, existing?.dailyTotal ?? null);

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

  if (!Number.isFinite(dailyWage) || dailyWage < 0) {
    showToast(t("positions.toast.invalidCost", "⚠️ أدخل قيمة صحيحة للتكلفة"));
    return null;
  }

  if (dailyTotal != null && (!Number.isFinite(dailyTotal) || dailyTotal < 0)) {
    showToast(t("positions.toast.invalidClientPrice", "⚠️ أدخل قيمة صحيحة لسعر العميل"));
    return null;
  }

  updateTechnicianRoleSummary(role, { dailyWage, dailyTotal });

  return {
    name,
    phone,
    role,
    department,
    dailyWage: Number.isFinite(dailyWage) ? dailyWage : 0,
    dailyTotal: dailyTotal == null ? null : Number(dailyTotal),
    status,
    baseStatus: status,
    notes
  };
}

async function handleTechnicianSubmit(event) {
  event.preventDefault();
  try {
    await ensureTechnicianPositionsLoaded();
  } catch (error) {
    console.error('❌ [technicians] failed to load positions before submit', error);
    const message = error?.message || t('positions.toast.fetchFailed', '⚠️ تعذر تحميل المناصب، حاول مرة أخرى');
    showToast(message, 'error');
    return;
  }

  const payload = collectTechnicianForm();
  if (!payload) return;

  const apiPayload = buildTechnicianPayload({
    name: payload.name,
    phone: payload.phone,
    role: payload.role,
    department: payload.department,
    dailyWage: payload.dailyWage,
    dailyTotal: payload.dailyTotal,
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
    total: document.getElementById("edit-technician-total"),
    status: document.getElementById("edit-technician-status"),
    notes: document.getElementById("edit-technician-notes")
  };

  if (!fields.id || !fields.name || !fields.phone || !fields.role || !fields.wage || !fields.total || !fields.status) return;

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
  const normalizedTotal = normalizeMoneyValue(technician.dailyTotal != null ? technician.dailyTotal : "");
  if (fields.total.value !== normalizedTotal) fields.total.value = normalizedTotal;
  const statusValue = technician.baseStatus || technician.status || "available";
  if (fields.status.value !== statusValue) fields.status.value = statusValue;
  if (fields.notes && fields.notes.value !== (technician.notes || "")) fields.notes.value = technician.notes || "";

  sanitizeNumericInput(fields.phone, normalizePhoneValue);
  sanitizeNumericInput(fields.wage, normalizeMoneyValue);
  sanitizeNumericInput(fields.total, normalizeMoneyValue);
}

function collectTechnicianEditModal() {
  const idInput = document.getElementById("edit-technician-id");
  const nameInput = document.getElementById("edit-technician-name");
  const phoneInput = document.getElementById("edit-technician-phone");
  const roleInput = document.getElementById("edit-technician-role");
  const departmentInput = document.getElementById("edit-technician-department");
  const wageInput = document.getElementById("edit-technician-wage");
  const totalInput = document.getElementById("edit-technician-total");
  const statusSelect = document.getElementById("edit-technician-status");
  const notesInput = document.getElementById("edit-technician-notes");

  if (!idInput || !nameInput || !phoneInput || !roleInput || !wageInput || !totalInput || !statusSelect) return null;

  const id = idInput.value.trim();
  const name = nameInput.value.trim();
  const phone = normalizePhoneValue(phoneInput.value.trim());
  phoneInput.value = phone;
  const role = roleInput.value.trim();
  const department = departmentInput?.value.trim() || "";
  const wageValue = normalizeMoneyValue(wageInput.value.trim());
  wageInput.value = wageValue;
  const wage = wageValue === "" ? 0 : parseFloat(wageValue);
  const totalValueRaw = normalizeMoneyValue(totalInput.value.trim());
  totalInput.value = totalValueRaw;
  const totalAmount = totalValueRaw === "" ? null : parseFloat(totalValueRaw);
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

  if (totalAmount != null && (Number.isNaN(totalAmount) || totalAmount < 0)) {
    showToast(t("technicians.toast.invalidTotal", "⚠️ أدخل قيمة صحيحة للتكلفة الإجمالية"));
    totalInput.focus();
    return null;
  }

  return {
    id,
    name,
    phone,
    role,
    department,
    dailyWage: Number.isFinite(wage) ? wage : 0,
    dailyTotal: totalAmount == null ? null : Number(totalAmount),
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
    dailyTotal: payload.dailyTotal,
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

function getPositionFormElements() {
  return {
    form: document.getElementById("position-form"),
    idInput: document.getElementById("position-id"),
    nameArInput: document.getElementById("position-name-ar"),
    nameEnInput: document.getElementById("position-name-en"),
    costInput: document.getElementById("position-cost"),
    clientPriceInput: document.getElementById("position-client-price"),
    submitBtn: document.getElementById("position-submit-btn"),
    cancelBtn: document.getElementById("position-cancel-btn"),
  };
}

function setPositionFormMode(mode = "add") {
  const { submitBtn, cancelBtn } = getPositionFormElements();
  const isUpdate = mode === "update";
  if (submitBtn) {
    const key = isUpdate ? "positions.form.actions.update" : "positions.form.actions.submit";
    const fallback = isUpdate ? "💾 حفظ المنصب" : "➕ إضافة منصب";
    submitBtn.textContent = t(key, fallback);
  }
  if (cancelBtn) {
    cancelBtn.classList.toggle("d-none", !isUpdate);
    cancelBtn.textContent = t("positions.form.actions.cancel", "إلغاء");
  }
}

function resetPositionForm() {
  const { form, idInput, nameArInput, nameEnInput, costInput, clientPriceInput } = getPositionFormElements();
  if (form) form.reset();
  if (idInput) idInput.value = "";
  if (nameArInput) nameArInput.value = "";
  if (nameEnInput) nameEnInput.value = "";
  if (costInput) costInput.value = "";
  if (clientPriceInput) clientPriceInput.value = "";
  editingPositionId = null;
  setPositionFormMode("add");
}

function populatePositionForm(position) {
  const { idInput, nameArInput, nameEnInput, costInput, clientPriceInput } = getPositionFormElements();
  if (!position || !costInput) return;

  if (idInput) idInput.value = position.id || "";
  if (nameArInput) nameArInput.value = position.labelAr || "";
  if (nameEnInput) nameEnInput.value = position.labelEn || "";
  costInput.value = normalizeMoneyValue(position.cost ?? 0);
  if (clientPriceInput) {
    clientPriceInput.value = position.clientPrice == null ? "" : normalizeMoneyValue(position.clientPrice);
  }

  editingPositionId = position.id || null;
  setPositionFormMode("update");
}

function collectPositionForm() {
  const { nameArInput, nameEnInput, costInput, clientPriceInput } = getPositionFormElements();
  if (!costInput) return null;

  const nameAr = nameArInput?.value.trim() || "";
  const nameEn = nameEnInput?.value.trim() || "";
  const baseName = nameEn || nameAr;
  const existing = editingPositionId
    ? getTechnicianPositionsCache().find((item) => String(item.id) === String(editingPositionId))
    : null;
  const costValue = normalizeMoneyValue(costInput.value.trim());
  costInput.value = costValue;
  const cost = costValue === "" ? 0 : parseFloat(costValue);

  const clientValue = clientPriceInput ? normalizeMoneyValue(clientPriceInput.value.trim()) : "";
  if (clientPriceInput) clientPriceInput.value = clientValue;
  const clientPrice = clientValue === "" ? null : parseFloat(clientValue);

  if (!baseName) {
    showToast(t("positions.toast.invalidName", "⚠️ يرجى إدخال اسم المنصب"));
    if (nameArInput) nameArInput.focus();
    return null;
  }

  if (!Number.isFinite(cost) || cost < 0) {
    showToast(t("positions.toast.invalidCost", "⚠️ أدخل قيمة صحيحة للتكلفة"));
    costInput.focus();
    return null;
  }

  if (clientPrice != null && (!Number.isFinite(clientPrice) || clientPrice < 0)) {
    showToast(t("positions.toast.invalidClientPrice", "⚠️ أدخل قيمة صحيحة لسعر العميل"));
    clientPriceInput?.focus();
    return null;
  }

  return {
    id: editingPositionId,
    name: existing?.name || baseName,
    cost: Number(cost.toFixed(2)),
    clientPrice: clientPrice == null ? null : Number(clientPrice.toFixed(2)),
    labelAr: nameAr || null,
    labelEn: nameEn || null,
  };
}

function refreshTechnicianRoleSummaryFromInputs() {
  const roleInput = document.getElementById("technician-role");
  if (!roleInput) return;
  const fallback = editingTechnicianId ? getTechnicianById(editingTechnicianId) : null;
  updateTechnicianRoleSummary(roleInput.value, fallback || {});
}

function renderPositionsTable() {
  const tableBody = document.getElementById("positions-table");
  const countEl = document.getElementById("positions-count");
  if (!tableBody) return;

  const positions = getTechnicianPositionsCache();
  if (countEl) {
    countEl.textContent = normalizeNumbers(String(positions.length));
  }

  if (!positions.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">${t('positions.table.empty', 'لا توجد مناصب بعد.')}</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = positions.map((position) => {
    const isEditing = editingPositionId && String(editingPositionId) === String(position.id);
    const costLabel = formatCurrencyLocalized(position.cost || 0);
    const priceLabel = position.clientPrice == null
      ? t('technicians.positionSummary.noClientPrice', '—')
      : formatCurrencyLocalized(position.clientPrice);
    const nameArLabel = getPositionLabel(position, 'ar') || '—';
    const nameEnLabel = getPositionLabel(position, 'en') || '—';
    const editLabel = t('positions.table.actions.edit', '✏️ تعديل');
    const deleteLabel = t('positions.table.actions.delete', '🗑️ حذف');
    return `
      <tr${isEditing ? ' class="technician-table-row-editing"' : ''}>
        <td>${escapeHtml(nameArLabel)}</td>
        <td>${escapeHtml(nameEnLabel)}</td>
        <td>${escapeHtml(costLabel)}</td>
        <td>${escapeHtml(priceLabel)}</td>
        <td class="table-actions-cell">
          <div class="table-action-buttons">
            <button type="button" class="technician-action-btn technician-action-btn--edit position-edit-btn" data-id="${position.id}">${editLabel}</button>
            <button type="button" class="technician-action-btn technician-action-btn--delete position-delete-btn" data-id="${position.id}">${deleteLabel}</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

async function handlePositionSubmit(event) {
  event.preventDefault();
  const payload = collectPositionForm();
  if (!payload) return;

  try {
    const isUpdate = Boolean(editingPositionId);
    if (isUpdate) {
      await updateTechnicianPosition(payload.id, payload);
    } else {
      await createTechnicianPosition(payload);
    }

    const successMessage = isUpdate
      ? t('positions.toast.updateSuccess', '💾 تم حفظ بيانات المنصب')
      : t('positions.toast.addSuccess', '✅ تم إضافة المنصب');
    showToast(successMessage);
    resetPositionForm();
    renderPositionsTable();
    renderPositionOptionsList();
    refreshTechnicianRoleSummaryFromInputs();
  } catch (error) {
    console.error('❌ [technicians] handlePositionSubmit failed', error);
    const message = error?.message || t('positions.toast.saveFailed', '⚠️ تعذر حفظ بيانات المنصب، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

function handlePositionCancel() {
  resetPositionForm();
}

async function handlePositionsTableClick(event) {
  try {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.dataset.id;
    if (!id) return;

    if (target.classList.contains('position-edit-btn')) {
      await ensureTechnicianPositionsLoaded();
      const position = getTechnicianPositionsCache().find((item) => String(item.id) === String(id));
      if (!position) {
        showToast(t('positions.toast.notFound', '⚠️ تعذر العثور على بيانات المنصب'), 'error');
        return;
      }
      populatePositionForm(position);
      renderPositionsTable();
      return;
    }

    if (target.classList.contains('position-delete-btn')) {
      if (!confirm(t('positions.toast.deleteConfirm', '⚠️ هل أنت متأكد من حذف هذا المنصب؟'))) {
        return;
      }
      await deleteTechnicianPosition(id);
      if (editingPositionId && String(editingPositionId) === String(id)) {
        resetPositionForm();
      }
      showToast(t('positions.toast.deleteSuccess', '🗑️ تم حذف المنصب'));
      renderPositionsTable();
      renderPositionOptionsList();
      refreshTechnicianRoleSummaryFromInputs();
    }
  } catch (error) {
    console.error('❌ [technicians] handlePositionsTableClick failed', error);
    const message = error?.message || t('positions.toast.fetchFailed', '⚠️ تعذر تحميل المناصب، حاول مرة أخرى');
    showToast(message, 'error');
  }
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
  const roleInput = document.getElementById("technician-role");
  if (roleInput && !roleInput.dataset.listenerAttached) {
    roleInput.addEventListener("input", () => {
      refreshTechnicianRoleSummaryFromInputs();
    });
    roleInput.dataset.listenerAttached = "true";
  }

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

  const positionsForm = document.getElementById("position-form");
  if (positionsForm && !positionsForm.dataset.listenerAttached) {
    positionsForm.addEventListener("submit", (event) => {
      handlePositionSubmit(event).catch((error) => {
        console.error('❌ [technicians] position submit failed', error);
      });
    });
    positionsForm.dataset.listenerAttached = "true";
  }

  const positionCancelBtn = document.getElementById("position-cancel-btn");
  if (positionCancelBtn && !positionCancelBtn.dataset.listenerAttached) {
    positionCancelBtn.addEventListener("click", handlePositionCancel);
    positionCancelBtn.dataset.listenerAttached = "true";
  }

  const positionsTableBody = document.getElementById("positions-table");
  if (positionsTableBody && !positionsTableBody.dataset.listenerAttached) {
    positionsTableBody.addEventListener("click", handlePositionsTableClick);
    positionsTableBody.dataset.listenerAttached = "true";
  }

  sanitizeNumericInput(document.getElementById("position-cost"), normalizeMoneyValue);
  sanitizeNumericInput(document.getElementById("position-client-price"), normalizeMoneyValue);

  const subTabsRoot = document.querySelector('[data-tech-tabs]');
  if (subTabsRoot && !subTabsRoot.dataset.listenerAttached) {
    const buttons = subTabsRoot.querySelectorAll('[data-tech-tab]');
    buttons.forEach((button) => {
      if (!button) return;
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-tech-tab');
        activateTechnicianSubTab(target);
      });
    });
    subTabsRoot.dataset.listenerAttached = "true";
  }

  activateTechnicianSubTab(activeTechnicianSubTab);

  ensureTechnicianPositionsLoaded()
    .then(() => {
      renderPositionOptionsList();
      if (activeTechnicianSubTab === 'technicians-positions') {
        renderPositionsTable();
      }
      refreshTechnicianRoleSummaryFromInputs();
    })
    .catch((error) => {
      console.error('❌ [technicians] failed to load technician positions', error);
      showToast(error?.message || t('positions.toast.fetchFailed', '⚠️ تعذر تحميل المناصب، حاول مرة أخرى'), 'error');
    });

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

  if (activeTechnicianSubTab === 'technicians-positions') {
    renderPositionsTable();
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
  renderPositionOptionsList();
  if (activeTechnicianSubTab === 'technicians-positions') {
    renderPositionsTable();
  }
  refreshTechnicianRoleSummaryFromInputs();
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderTechniciansTable();
});

const positionsUpdatedHandler = () => {
  renderPositionOptionsList();
  if (activeTechnicianSubTab === 'technicians-positions') {
    renderPositionsTable();
  }
  refreshTechnicianRoleSummaryFromInputs();
};

window.addEventListener('technicianPositions:updated', positionsUpdatedHandler);
document.addEventListener('technicianPositions:updated', positionsUpdatedHandler);
