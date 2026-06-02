import { t } from '../language.js';
import { loadData } from '../storage.js';
import {
  buildProjectPayload,
  createProjectApi,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi,
  refreshProjectsFromApi,
} from '../projectsService.js';
import {
  getReservationsState,
  refreshReservationsFromApi,
} from '../reservationsService.js';
import {
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus
} from '../reservationsSummary.js';
import {
  generateProjectCode,
  normalizeNumbers,
  showToast
} from '../utils.js';
import { getCurrentUserRole, notifyPermissionDenied, userCanManageDestructiveActions } from '../auth.js';
import { state, dom, resetSelections } from './state.js';
import {
  clearProjectCustomerSuggestions,
  resolveProjectCustomer,
  setProjectClientCompany
} from './data.js';
import { clearProjectDateInputs } from './dom.js';
import {
  escapeHtml,
  formatCurrency,
  getEmptyText,
  formatDateTime
} from './formatting.js';
import { refreshEnhancedSelect } from '../ui/enhancedSelect.js';
import {
  resetSelectedTechnicians,
  setSelectedTechnicians
} from '../reservationsTechnicians.js';
import {
  renderProjects,
  renderFocusCards,
  updateSummary
} from './view.js';
import {
  handleProjectReservationSync,
  removeProject
} from './actions.js';
import { updatePreferences } from '../preferencesService.js';
import { renderProjectEquipmentSelection } from './equipment.js';
import { calculateProjectLineFinancials } from './financials.js';

let isProjectSubmitInProgress = false;
const PROJECT_FORM_DRAFT_STORAGE_KEY = 'projects:create:draft';

let isProjectShareTaxSyncing = false;
let createProjectPaymentHistory = [];
const resetProjectFilters = () => {
  state.filters.search = '';
  state.filters.status = '';
  state.filters.payment = '';
  state.filters.type = '';
  state.filters.confirmed = '';
  state.filters.range = '';
  state.filters.startDate = '';
  state.filters.endDate = '';
};

function resolveShareElement(target) {
  if (!target) return null;
  if (target instanceof HTMLElement) return target;
  if (typeof target === 'string') {
    return document.getElementById(target);
  }
  return null;
}

export function getProjectCompanySharePercent(target = dom.companyShare) {
  const element = resolveShareElement(target);
  if (!element || element.checked !== true) {
    return null;
  }
  const rawValue = element.dataset.companyShare ?? element.value ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const normalized = normalizeNumbers(String(rawValue).replace('%', '').trim());
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_COMPANY_SHARE_PERCENT;
  }
  return parsed;
}

export function ensureProjectCompanyShareEnabled(target = dom.companyShare, fallback = DEFAULT_COMPANY_SHARE_PERCENT) {
  const element = resolveShareElement(target);
  if (!element) return;
  const rawValue = element.dataset.companyShare ?? element.value ?? fallback;
  const normalized = normalizeNumbers(String(rawValue).replace('%', '').trim());
  let parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    parsed = fallback;
  }
  element.dataset.companyShare = String(parsed);
  element.checked = true;
}

function syncProjectTaxAndShare(source) {
  const taxCheckbox = dom.taxCheckbox;
  const shareCheckbox = dom.companyShare;

  if (!taxCheckbox || !shareCheckbox) return;
  if (isProjectShareTaxSyncing) return;

  isProjectShareTaxSyncing = true;

  const showShareWarning = () => {
    showToast(t('projects.toast.companyShareRequiresTax', '⚠️ لا يمكن تفعيل المصاريف التشغيلية بدون تفعيل الضريبة'));
  };

  if (source === 'share') {
    if (shareCheckbox.checked) {
      if (taxCheckbox.disabled) {
        shareCheckbox.checked = false;
        showShareWarning();
        isProjectShareTaxSyncing = false;
        return;
      }
      if (!taxCheckbox.checked) {
        taxCheckbox.checked = true;
      }
      ensureProjectCompanyShareEnabled(shareCheckbox);
    } else {
      if (taxCheckbox.checked && !taxCheckbox.disabled) {
        taxCheckbox.checked = false;
      }
    }
  } else if (source === 'tax') {
    if (taxCheckbox.checked) {
      ensureProjectCompanyShareEnabled(shareCheckbox);
    } else if (shareCheckbox.checked) {
      shareCheckbox.checked = false;
    }
  }

  isProjectShareTaxSyncing = false;
}

export function calculateProjectFinancials({
  equipmentEstimate = 0,
  crewEstimate = 0,
  servicesClientPrice = 0,
  equipmentCost = 0,
  crewCost = 0,
  servicesCost = 0,
  discountValue = 0,
  discountType = 'percent',
  applyTax = false,
  companyShareEnabled = false,
  companySharePercent = null,
} = {}) {
  return calculateProjectLineFinancials({
    equipmentRevenue: equipmentEstimate,
    crewRevenue: crewEstimate,
    servicesRevenue: servicesClientPrice,
    equipmentCost,
    crewCost,
    servicesCost,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent,
  });
}

function toProjectMoney(value) {
  const parsed = Number.parseFloat(normalizeNumbers(String(value ?? '0')));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function resolveProjectServiceDays(value) {
  const normalized = normalizeNumbers(String(value ?? '')).trim();
  if (normalized === '') return 1;
  const parsed = Number.parseInt(normalized, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export function calculateProjectServiceCost(expense = {}) {
  const amount = toProjectMoney(expense?.amount);
  return amount * resolveProjectServiceDays(expense?.days ?? expense?.service_days);
}

export function calculateProjectServiceSale(expense = {}) {
  const sale = toProjectMoney(expense?.salePrice ?? expense?.sale_price);
  return sale * resolveProjectServiceDays(expense?.days ?? expense?.service_days);
}

function calculateProjectDurationDays({ startDate = '', endDate = '' } = {}) {
  if (!startDate) return 1;
  const start = new Date(`${startDate}T00:00:00`);
  const end = endDate ? new Date(`${endDate}T00:00:00`) : start;
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) return 1;
  return Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1);
}

export function calculateProjectCrewEstimate(assignments = [], days = 1) {
  const duration = Math.max(1, Number.parseInt(String(days || 1), 10) || 1);
  return (Array.isArray(assignments) ? assignments : []).reduce((sum, assignment) => {
    const price = toProjectMoney(
      assignment?.positionClientPrice
      ?? assignment?.position_client_price
      ?? assignment?.clientPrice
      ?? assignment?.dailyTotal
      ?? assignment?.daily_total
      ?? 0
    );
    return sum + (price * duration);
  }, 0);
}

export function calculateProjectCrewCost(assignments = [], days = 1) {
  const duration = Math.max(1, Number.parseInt(String(days || 1), 10) || 1);
  return (Array.isArray(assignments) ? assignments : []).reduce((sum, assignment) => {
    const cost = toProjectMoney(
      assignment?.positionCost
      ?? assignment?.position_cost
      ?? assignment?.cost
      ?? assignment?.dailyWage
      ?? assignment?.daily_wage
      ?? 0
    );
    return sum + (cost * duration);
  }, 0);
}

export function calculateSelectedEquipmentCost(items = [], equipmentList = []) {
  return (Array.isArray(items) ? items : []).reduce((sum, item) => {
    const equipment = Array.isArray(equipmentList)
      ? equipmentList.find((eq) => String(eq.barcode || '') === String(item?.barcode || ''))
      : null;
    const cost = toProjectMoney(item?.cost ?? item?.unit_cost ?? equipment?.cost ?? equipment?.unit_cost ?? 0);
    const qty = Math.max(1, Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10) || 1);
    return sum + (cost * qty);
  }, 0);
}

export function calculateProjectCreateSummary({
  equipment = [],
  equipmentList = [],
  crewAssignments = [],
  expenses = [],
  servicesClientPrice = 0,
  startDate = '',
  endDate = '',
  discountValue = 0,
  discountType = 'percent',
  applyTax = false,
  companyShareEnabled = false,
  companySharePercent = null,
} = {}) {
  const days = calculateProjectDurationDays({ startDate, endDate });
  const equipmentRevenue = (Array.isArray(equipment) ? equipment : []).reduce((sum, item) => {
    const source = Array.isArray(equipmentList)
      ? equipmentList.find((eq) => String(eq.barcode || '') === String(item?.barcode || ''))
      : null;
    const price = toProjectMoney(item?.price ?? item?.unit_price ?? source?.price ?? source?.daily_rate ?? source?.dailyRate ?? 0);
    const qty = Math.max(1, Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10) || 1);
    return sum + (price * qty);
  }, 0);
  const equipmentCost = calculateSelectedEquipmentCost(equipment, equipmentList);
  const equipmentQuantity = (Array.isArray(equipment) ? equipment : []).reduce((sum, item) => {
    const qty = Math.max(1, Number.parseInt(String(item?.qty ?? item?.quantity ?? 1), 10) || 1);
    return sum + qty;
  }, 0);
  const crewRevenue = calculateProjectCrewEstimate(crewAssignments, days);
  const crewCost = calculateProjectCrewCost(crewAssignments, days);
  const expensesTotal = (Array.isArray(expenses) ? expenses : []).reduce((sum, expense) => sum + calculateProjectServiceCost(expense), 0);
  const servicesRevenue = (Array.isArray(expenses) && expenses.length)
    ? expenses.reduce((sum, expense) => sum + calculateProjectServiceSale(expense), 0)
    : toProjectMoney(servicesClientPrice);
  const finance = calculateProjectFinancials({
    equipmentEstimate: equipmentRevenue,
    crewEstimate: crewRevenue,
    servicesClientPrice: servicesRevenue,
    equipmentCost,
    crewCost,
    servicesCost: expensesTotal,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent,
  });

  return {
    days,
    equipmentQuantity,
    equipmentItems: Array.isArray(equipment) ? equipment.length : 0,
    crewPositions: Array.isArray(crewAssignments) ? crewAssignments.length : 0,
    assignedCrew: Array.isArray(crewAssignments) ? crewAssignments.filter((assignment) => assignment?.technicianId).length : 0,
    equipmentRevenue,
    equipmentCost,
    crewRevenue,
    crewCost,
    servicesRevenue,
    servicesCost: expensesTotal,
    ...finance,
  };
}

export async function refreshProjectManagedReservationState() {
  try {
    await refreshReservationsFromApi();
  } catch (error) {
    console.warn('[projects] failed to refresh reservations after project managed reservation sync', error);
  }
  state.reservations = getReservationsState();
  return state.reservations;
}

export function bindFormEvents() {
  if (dom.form && !dom.form.dataset.listenerAttached) {
    dom.form.addEventListener('submit', handleSubmitProject);
    dom.form.dataset.listenerAttached = 'true';
  }

  if (dom.form && !dom.form.dataset.summaryListenerAttached) {
    const refreshCreateSummary = () => renderProjectCreateSummaryCard();
    dom.form.addEventListener('input', refreshCreateSummary);
    dom.form.addEventListener('change', refreshCreateSummary);
    dom.form.dataset.summaryListenerAttached = 'true';
  }

  if (dom.form && !dom.form.dataset.resetListenerAttached) {
    dom.form.addEventListener('reset', () => {
      if (dom.client) {
        dom.client.dataset.customerId = '';
      }
      clearProjectCustomerSuggestions();
      clearProjectDateInputs();
      if (dom.type) {
        dom.type.value = '';
      }
      setProjectClientCompany(null);
      clearProjectFormDraft();
      resetProjectFormState();
    });
    dom.form.dataset.resetListenerAttached = 'true';
  }

  bindBillingEvents();
  bindCreatePaymentEvents();

  if (typeof document !== 'undefined' && !document.__projectCreateSummaryListenerAttached) {
    document.addEventListener('projects:form-summary:update', renderProjectCreateSummaryCard);
    document.__projectCreateSummaryListenerAttached = true;
  }

  if (dom.search && !dom.search.dataset.listenerAttached) {
    dom.search.addEventListener('input', () => {
      state.filters.search = normalizeNumbers(dom.search.value || '').trim().toLowerCase();
      renderProjects();
      renderFocusCards();
    });
    dom.search.dataset.listenerAttached = 'true';
  }

  const refreshViews = () => {
    renderProjects();
    renderFocusCards();
  };

  const formatDateInput = (date) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  };

  const applyQuickRange = (value) => {
    const today = new Date();
    let startVal = '';
    let endVal = '';

    if (value === 'today') {
      startVal = formatDateInput(today);
      endVal = startVal;
    } else if (value === 'week') {
      const startOfWeek = new Date(today);
      const day = startOfWeek.getDay(); // Sunday=0
      const diff = day === 0 ? 6 : day - 1; // make Monday start
      startOfWeek.setDate(startOfWeek.getDate() - diff);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      startVal = formatDateInput(startOfWeek);
      endVal = formatDateInput(endOfWeek);
    } else if (value === 'month') {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      startVal = formatDateInput(startOfMonth);
      endVal = formatDateInput(endOfMonth);
    } else if (value === '') {
      startVal = '';
      endVal = '';
    } else if (value === 'custom') {
      startVal = dom.filterStart?.value || state.filters.startDate || '';
      endVal = dom.filterEnd?.value || state.filters.endDate || '';
    }

    if (dom.filterStart) dom.filterStart.value = startVal;
    if (dom.filterEnd) dom.filterEnd.value = endVal;
    state.filters.range = value;
    state.filters.startDate = normalizeNumbers(startVal);
    state.filters.endDate = normalizeNumbers(endVal);
    refreshViews();
  };

  const attachSelect = (el, key) => {
    if (!el || el.dataset.listenerAttached) return;
    el.addEventListener('change', () => {
      state.filters[key] = normalizeNumbers(el.value || '').trim().toLowerCase();
      refreshViews();
    });
    el.dataset.listenerAttached = 'true';
  };

  attachSelect(dom.filterStatus, 'status');
  attachSelect(dom.filterPayment, 'payment');
  attachSelect(dom.filterType, 'type');
  attachSelect(dom.filterConfirmed, 'confirmed');

  if (dom.filterRange && !dom.filterRange.dataset.listenerAttached) {
    dom.filterRange.addEventListener('change', () => applyQuickRange(dom.filterRange.value || ''));
    dom.filterRange.dataset.listenerAttached = 'true';
  }

  const attachDateInput = (el, key) => {
    if (!el || el.dataset.listenerAttached) return;
    const handler = () => {
      const value = normalizeNumbers(el.value || '').trim();
      state.filters[key] = value;
      if (value) {
        state.filters.range = 'custom';
        if (dom.filterRange) dom.filterRange.value = 'custom';
      }
      refreshViews();
    };
    el.addEventListener('change', handler);
    el.addEventListener('input', handler);
    el.dataset.listenerAttached = 'true';
  };

  attachDateInput(dom.filterStart, 'startDate');
  attachDateInput(dom.filterEnd, 'endDate');

  if (dom.filterReset && !dom.filterReset.dataset.listenerAttached) {
    dom.filterReset.addEventListener('click', () => {
      resetProjectFilters();
      if (dom.search) dom.search.value = '';
      if (dom.filterStatus) dom.filterStatus.value = '';
      if (dom.filterPayment) dom.filterPayment.value = '';
      if (dom.filterType) dom.filterType.value = '';
      if (dom.filterConfirmed) dom.filterConfirmed.value = '';
      if (dom.filterRange) dom.filterRange.value = '';
      if (dom.filterStart) dom.filterStart.value = '';
      if (dom.filterEnd) dom.filterEnd.value = '';
      refreshViews();
    });
    dom.filterReset.dataset.listenerAttached = 'true';
  }
}

export function resetProjectFormState() {
  resetSelections();
  resetSelectedTechnicians();
  state.editingProjectId = null;
  if (dom.form) {
    delete dom.form.dataset.editingId;
    dom.form.dataset.mode = 'create';
  }
  renderSelections();
  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = '';
  // Reset the running total for services client price
  state.servicesClientPriceTotal = 0;
  if (dom.servicesClientPrice) dom.servicesClientPrice.value = '';
  if (dom.taxCheckbox) dom.taxCheckbox.checked = false;
  if (dom.discountType) dom.discountType.value = 'percent';
  if (dom.discountValue) dom.discountValue.value = '';
  if (dom.companyShare) {
    dom.companyShare.checked = false;
    dom.companyShare.dataset.companyShare = String(DEFAULT_COMPANY_SHARE_PERCENT);
  }
  if (dom.paymentStatus) dom.paymentStatus.value = 'unpaid';
  if (dom.paymentStatus?.dataset) {
    delete dom.paymentStatus.dataset.userSelected;
  }
  if (dom.paymentProgressType) dom.paymentProgressType.value = 'percent';
  if (dom.paymentProgressValue) dom.paymentProgressValue.value = '';
  // reset payment history UI
  createProjectPaymentHistory = [];
  if (dom.paymentHistory) dom.paymentHistory.innerHTML = '';
  refreshProjectSubmitButton();
  renderProjectOperationalSummary();
  syncProjectTaxAndShare('tax');
  updateServicesClientTotalIndicator();
}

function bindBillingEvents() {
  if (dom.discountValue && dom.discountValue.dataset.listenerAttached !== 'true') {
    dom.discountValue.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
      renderProjectCreateSummaryCard();
    });
    dom.discountValue.dataset.listenerAttached = 'true';
  }

  if (dom.companyShare && dom.companyShare.dataset.listenerAttached !== 'true') {
    dom.companyShare.addEventListener('change', () => {
      syncProjectTaxAndShare('share');
      renderProjectCreateSummaryCard();
    });
    dom.companyShare.dataset.listenerAttached = 'true';
  }

  if (dom.taxCheckbox && dom.taxCheckbox.dataset.projectListenerAttached !== 'true') {
    dom.taxCheckbox.addEventListener('change', () => {
      syncProjectTaxAndShare('tax');
      renderProjectCreateSummaryCard();
    });
    dom.taxCheckbox.dataset.projectListenerAttached = 'true';
  }

  if (dom.paymentStatus && dom.paymentStatus.dataset.billingListenerAttached !== 'true') {
    dom.paymentStatus.addEventListener('change', () => {
      dom.paymentStatus.dataset.userSelected = 'true';
    });
    dom.paymentStatus.dataset.billingListenerAttached = 'true';
  }

  if (dom.paymentProgressValue && dom.paymentProgressValue.dataset.listenerAttached !== 'true') {
    dom.paymentProgressValue.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
      renderProjectCreateSummaryCard();
    });
    dom.paymentProgressValue.dataset.listenerAttached = 'true';
  }

  // Normalize Arabic numerals to English for "سعر البيع" field in create project form
  if (dom.servicesClientPrice && dom.servicesClientPrice.dataset.normalizeAttached !== 'true') {
    dom.servicesClientPrice.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const cursorPosition = input.selectionStart;
      const normalized = normalizeNumbers(input.value || '');
      input.value = normalized;
      if (cursorPosition != null) {
        const newPos = Math.min(normalized.length, cursorPosition);
        input.setSelectionRange(newPos, newPos);
      }
      renderProjectCreateSummaryCard();
    });
    dom.servicesClientPrice.dataset.normalizeAttached = 'true';
  }

  syncProjectTaxAndShare(dom.companyShare?.checked ? 'share' : 'tax');
  updateServicesClientTotalIndicator();
  renderProjectCreateSummaryCard();
}

function renderCreateProjectPaymentHistory() {
  const container = dom.paymentHistory;
  if (!container) return;
  const payments = Array.isArray(createProjectPaymentHistory) ? createProjectPaymentHistory : [];
  if (!payments.length) {
    container.innerHTML = `<div class="reservation-payment-history__empty">${escapeHtml(t('reservations.paymentHistory.empty', 'لا توجد دفعات مسجلة'))}</div>`;
    return;
  }
  const rows = payments.map((entry, index) => {
    const amountDisplay = Number.isFinite(Number(entry?.amount)) && Number(entry.amount) > 0
      ? formatCurrency(Number(entry.amount))
      : '—';
    const percentDisplay = Number.isFinite(Number(entry?.percentage)) && Number(entry.percentage) > 0
      ? `${normalizeNumbers(Number(entry.percentage).toFixed(2))}%`
      : '—';
    const recordedAt = entry?.recordedAt ? normalizeNumbers(formatDateTime(entry.recordedAt)) : '—';
    const typeLabel = entry?.type === 'percent'
      ? t('reservations.paymentHistory.type.percent', '٪ دفعة نسبة')
      : t('reservations.paymentHistory.type.amount', '💵 دفعة مالية');
    return `
      <tr>
        <td>${escapeHtml(typeLabel)}</td>
        <td>${escapeHtml(amountDisplay)}</td>
        <td>${escapeHtml(percentDisplay)}</td>
        <td>${escapeHtml(recordedAt)}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${index}" aria-label="${escapeHtml(t('reservations.paymentHistory.actions.delete', 'حذف الدفعة'))}">🗑️</button>
        </td>
      </tr>`;
  }).join('');
  container.innerHTML = `
    <div class="reservation-payment-history-table-shell">
      <table class="table table-sm reservation-payment-history-table">
        <thead>
          <tr>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.method', 'نوع الدفعة'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.amount', 'المبلغ'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.percent', 'النسبة'))}</th>
            <th>${escapeHtml(t('reservations.paymentHistory.headers.date', 'التاريخ'))}</th>
            <th>${escapeHtml(t('projects.expenses.table.headers.actions', 'الإجراءات'))}</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

function getProjectCreateSummaryFromState() {
  const servicesClientPriceRaw = normalizeNumbers(dom.servicesClientPrice?.value || '');
  const manualServicesPrice = Number.parseFloat(servicesClientPriceRaw);
  const servicesClientPrice = state.servicesClientPriceTotal || (Number.isFinite(manualServicesPrice) ? manualServicesPrice : 0);
  const discountRaw = normalizeNumbers(dom.discountValue?.value || '0');
  const discountValue = Number.parseFloat(discountRaw);
  const companyShareEnabled = dom.companyShare?.checked === true;
  const companySharePercent = companyShareEnabled
    ? getProjectCompanySharePercent(dom.companyShare)
    : null;

  return calculateProjectCreateSummary({
    equipment: state.selectedEquipment,
    equipmentList: state.equipment,
    crewAssignments: state.selectedTechnicians,
    expenses: state.expenses,
    servicesClientPrice,
    startDate: dom.startDate?.value || '',
    endDate: dom.endDate?.value || '',
    discountValue: Number.isFinite(discountValue) ? discountValue : 0,
    discountType: dom.discountType?.value === 'amount' ? 'amount' : 'percent',
    applyTax: dom.taxCheckbox?.checked === true,
    companyShareEnabled,
    companySharePercent,
  });
}

function renderProjectCreateSummaryCard() {
  const card = dom.projectCreateSummaryCard || document.getElementById('project-create-summary-card');
  if (!card) return;
  const summary = getProjectCreateSummaryFromState();
  const isAdmin = getCurrentUserRole() === 'admin';
  const row = (label, value, extraClass = '') => `
    <div class="project-create-summary__row ${extraClass}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>`;
  const normalRows = [
    row(t('projects.form.summary.days', 'عدد الأيام'), normalizeNumbers(String(summary.days))),
    row(t('projects.form.summary.equipmentQuantity', 'كمية المعدات'), normalizeNumbers(String(summary.equipmentQuantity))),
    row(t('projects.form.summary.crewQuantity', 'عدد الطاقم'), normalizeNumbers(String(summary.crewPositions))),
    row(t('projects.form.summary.equipmentTotal', 'إجمالي المعدات'), formatCurrency(summary.equipmentRevenue)),
    row(t('projects.form.summary.crewTotal', 'إجمالي الفريق'), formatCurrency(summary.crewRevenue)),
    row(t('projects.form.summary.servicesTotal', 'إجمالي الخدمات الإنتاجية'), formatCurrency(summary.servicesRevenue)),
    row(t('projects.form.summary.discount', 'الخصم'), formatCurrency(summary.discountAmount)),
    row(t('projects.form.summary.beforeVat', 'الإجمالي قبل الضريبة'), formatCurrency(summary.taxableAmount), 'project-create-summary__row--strong'),
    row(t('projects.form.summary.vat', 'الضريبة'), formatCurrency(summary.taxAmount)),
    row(t('projects.form.summary.finalTotal', 'الإجمالي النهائي'), formatCurrency(summary.totalWithTax), 'project-create-summary__row--total'),
  ].join('');

  const adminRows = [
    row(t('projects.form.summary.days', 'عدد الأيام'), normalizeNumbers(String(summary.days))),
    row(t('projects.form.summary.equipmentQuantity', 'كمية المعدات'), normalizeNumbers(String(summary.equipmentQuantity))),
    row(t('projects.form.summary.crewQuantity', 'عدد الطاقم'), normalizeNumbers(String(summary.crewPositions))),
    row(t('projects.form.summary.equipmentTotal', 'إجمالي المعدات'), formatCurrency(summary.equipmentRevenue)),
    row(t('projects.form.summary.equipmentCost', 'تكلفة المعدات'), formatCurrency(summary.equipmentCost)),
    row(t('projects.form.summary.crewTotal', 'إجمالي الفريق'), formatCurrency(summary.crewRevenue)),
    row(t('projects.form.summary.crewCost', 'تكلفة الفريق'), formatCurrency(summary.crewCost)),
    row(t('projects.form.summary.servicesTotal', 'إجمالي الخدمات الإنتاجية'), formatCurrency(summary.servicesRevenue)),
    row(t('projects.form.summary.servicesCost', 'تكلفة الخدمات الإنتاجية'), formatCurrency(summary.servicesCost)),
    row(t('projects.form.summary.discount', 'الخصم'), formatCurrency(summary.discountAmount)),
    row(t('projects.form.summary.beforeVat', 'الإجمالي قبل الضريبة'), formatCurrency(summary.taxableAmount), 'project-create-summary__row--strong'),
    row(t('projects.form.summary.overhead', 'المصاريف التشغيلية'), formatCurrency(summary.overheadAmount)),
    row(t('projects.form.summary.directCosts', 'إجمالي التكاليف المباشرة'), formatCurrency(summary.directCostTotal)),
    row(t('projects.form.summary.vat', 'الضريبة'), formatCurrency(summary.taxAmount)),
    row(t('projects.form.summary.finalTotal', 'الإجمالي النهائي'), formatCurrency(summary.totalWithTax), 'project-create-summary__row--total'),
    row(t('projects.form.summary.estimatedProfit', 'الربح التقديري'), formatCurrency(summary.marginBeforeTax), summary.marginBeforeTax < 0 ? 'project-create-summary__row--warning' : ''),
  ].join('');

  card.innerHTML = `
    <div class="project-create-summary__header">
      <span class="project-create-summary__eyebrow">${escapeHtml(t('projects.form.summary.eyebrow', 'ملخص مباشر'))}</span>
      <h5>${escapeHtml(t('projects.form.summary.title', 'ملخص المشروع'))}</h5>
    </div>
    <div class="project-create-summary__metrics">
      ${isAdmin ? adminRows : normalRows}
    </div>`;
}

function getUnassignedProjectCrewAssignments() {
  return Array.isArray(state.selectedTechnicians)
    ? state.selectedTechnicians.filter((assignment) => (
        assignment
        && typeof assignment === 'object'
        && !(
          assignment.technicianId
          ?? assignment.technician_id
          ?? assignment.id
        )
      ))
    : [];
}

export function syncCreateProjectSelectTranslations() {
  const setOptionText = (select, value, key, fallback) => {
    if (!select) return;
    const option = Array.from(select.options || []).find((entry) => entry.value === value);
    if (!option) return;
    option.textContent = t(key, fallback);
  };

  setOptionText(dom.type, '', 'projects.form.placeholders.type', 'اختر نوع المشروع');
  setOptionText(dom.type, 'commercial', 'projects.form.types.commercial', 'تصوير إعلان');
  setOptionText(dom.type, 'coverage', 'projects.form.types.coverage', 'تصوير تغطية');
  setOptionText(dom.type, 'photography', 'projects.form.types.photography', 'تصوير فوتوغرافي');
  setOptionText(dom.type, 'social', 'projects.form.types.social', 'تصوير للتواصل الاجتماعي');

  setOptionText(dom.discountType, 'percent', 'projects.form.discount.percent', '٪ نسبة');
  setOptionText(dom.discountType, 'amount', 'projects.form.discount.amount', '💵 مبلغ');

  setOptionText(dom.paymentStatus, 'unpaid', 'projects.form.paymentStatus.unpaid', 'غير مدفوع');
  setOptionText(dom.paymentStatus, 'partial', 'projects.form.paymentStatus.partial', 'مدفوع جزئياً');
  setOptionText(dom.paymentStatus, 'paid', 'projects.form.paymentStatus.paid', 'مدفوع');

  setOptionText(dom.paymentProgressType, 'amount', 'projects.form.paymentProgress.amount', '💵 مبلغ');
  setOptionText(dom.paymentProgressType, 'percent', 'projects.form.paymentProgress.percent', '٪ نسبة');

  [
    dom.type,
    dom.discountType,
    dom.paymentStatus,
    dom.paymentProgressType,
  ].forEach((select) => {
    if (select?.dataset?.enhancedSelect === 'true') {
      refreshEnhancedSelect(select);
    }
  });
}

function bindCreatePaymentEvents() {
  if (dom.paymentAddButton && dom.paymentAddButton.dataset.listenerAttached !== 'true') {
    dom.paymentAddButton.addEventListener('click', (event) => {
      event.preventDefault();
      const type = dom.paymentProgressType?.value === 'amount' ? 'amount' : 'percent';
      const raw = normalizeNumbers(dom.paymentProgressValue?.value || '').replace('%', '').trim();
      const value = Number.parseFloat(raw);
      if (!Number.isFinite(value) || value <= 0) {
        showToast(t('projects.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
        return;
      }
      createProjectPaymentHistory.push({
        type,
        amount: type === 'amount' ? value : 0,
        percentage: type === 'percent' ? value : 0,
        recordedAt: new Date().toISOString(),
      });
      if (dom.paymentProgressValue) dom.paymentProgressValue.value = '';
      renderCreateProjectPaymentHistory();
      renderProjectCreateSummaryCard();
    });
    dom.paymentAddButton.dataset.listenerAttached = 'true';
  }

  if (dom.paymentHistory && dom.paymentHistory.dataset.listenerAttached !== 'true') {
    dom.paymentHistory.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-action="remove-payment"]');
      if (!btn) return;
      const index = Number.parseInt(btn.dataset.index || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      createProjectPaymentHistory.splice(index, 1);
      renderCreateProjectPaymentHistory();
      renderProjectCreateSummaryCard();
    });
    dom.paymentHistory.dataset.listenerAttached = 'true';
  }
}

export function bindExpenseEvents() {
  if (dom.addExpenseBtn && dom.addExpenseBtn.dataset.listenerAttached !== 'true') {
    dom.addExpenseBtn.addEventListener('click', handleAddExpense);
    dom.addExpenseBtn.dataset.listenerAttached = 'true';
  }

  attachRemovalListener(dom.expenseList, (target) => {
    if (target.matches('[data-action="remove-expense"]')) {
      const expenseId = target.dataset.id;
      state.expenses = state.expenses.filter((item) => String(item.id) !== String(expenseId));
      renderExpenseList();
      updateSummary();
      recalcServicesClientPriceTotal();
      updateServicesClientTotalIndicator();
      renderProjectCreateSummaryCard();
    }
  });

  if (dom.expenseAmount && dom.expenseAmount.dataset.normalizeAttached !== 'true') {
    dom.expenseAmount.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const cursorPosition = input.selectionStart;
      const normalized = normalizeNumbers(input.value || '');
      input.value = normalized;
      if (cursorPosition != null) {
        const newPos = Math.min(normalized.length, cursorPosition);
        input.setSelectionRange(newPos, newPos);
      }
    });
    dom.expenseAmount.dataset.normalizeAttached = 'true';
  }

  if (dom.expenseDays && dom.expenseDays.dataset.normalizeAttached !== 'true') {
    dom.expenseDays.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      const cursorPosition = input.selectionStart;
      const normalized = normalizeNumbers(input.value || '').replace(/[^\d]/g, '');
      input.value = normalized;
      if (cursorPosition != null) {
        const newPos = Math.min(normalized.length, cursorPosition);
        input.setSelectionRange(newPos, newPos);
      }
    });
    dom.expenseDays.dataset.normalizeAttached = 'true';
  }
}

function attachRemovalListener(container, handler) {
  if (!container || container.dataset.listenerAttached === 'true') return;
  container.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    handler(target);
  });
  container.dataset.listenerAttached = 'true';
}

export function bindTableEvents({ onViewDetails }) {
  if (!dom.projectsTableBody || dom.projectsTableBody.dataset.listenerAttached === 'true') return;

  dom.projectsTableBody.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-action="view-details"]')) {
      const projectId = target.dataset.id;
      onViewDetails?.(projectId);
      return;
    }

    if (target.matches('[data-action="delete-project"]')) {
      if (!userCanManageDestructiveActions()) {
        notifyPermissionDenied();
        return;
      }
      const projectId = target.dataset.id;
      removeProject(projectId);
    }
  });

  dom.projectsTableBody.dataset.listenerAttached = 'true';
}

export function handleCustomersChanged() {
  const { customers } = loadData();
  state.customers = Array.isArray(customers) ? customers : [];
  renderSelections();
  renderProjects();
  renderFocusCards();
}

export function handleTechniciansUpdated() {
  const { technicians } = loadData();
  state.technicians = Array.isArray(technicians) ? technicians : [];
  renderSelections();
  renderProjects();
  renderFocusCards();
}

export function handleReservationsChanged(openProjectDetails) {
  const { reservations } = loadData();
  state.reservations = Array.isArray(reservations) ? reservations : [];
  renderProjects();

  const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
  const currentProjectId = dom.detailsBody?.dataset.projectId;
  if (isModalOpen && currentProjectId) {
    const projectExists = state.projects.find((project) => String(project.id) === String(currentProjectId));
    if (projectExists) {
      openProjectDetails?.(currentProjectId);
    }
  }
}

function handleAddExpense() {
  const label = (dom.expenseLabel?.value || '').trim();
  const normalizedAmount = normalizeNumbers(dom.expenseAmount?.value || '0');
  const amount = Number(normalizedAmount);
  const saleRaw = normalizeNumbers(dom.servicesClientPrice?.value || '0');
  const salePrice = Number.parseFloat(saleRaw) || 0;
  const daysRaw = normalizeNumbers(dom.expenseDays?.value || '');
  const days = daysRaw.trim() === '' ? 1 : Number.parseInt(daysRaw, 10);
  const note = (dom.expenseNote?.value || '').trim();

  if (!label) {
    showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
    return;
  }

  if (!Number.isFinite(amount) || amount < 0) {
    showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
    return;
  }

  if (!Number.isInteger(days) || days <= 0) {
    showToast(t('projects.toast.invalidExpenseDays', '⚠️ يرجى إدخال عدد أيام صحيح أو تركه فارغاً'));
    dom.expenseDays?.focus();
    return;
  }

  state.expenses.push({
    id: Date.now(),
    label,
    amount,
    salePrice,
    days,
    note
  });
  // Recalculate cumulative services client price from items (keeps totals correct on remove)
  recalcServicesClientPriceTotal();

  if (dom.expenseLabel) dom.expenseLabel.value = '';
  if (dom.expenseAmount) dom.expenseAmount.value = normalizeNumbers(String(normalizedAmount));
  if (dom.servicesClientPrice) dom.servicesClientPrice.value = '';
  if (dom.expenseDays) dom.expenseDays.value = '';
  if (dom.expenseNote) dom.expenseNote.value = '';

  renderSelections();
  updateSummary();
  updateServicesClientTotalIndicator();
}

export function renderSelections() {
  renderExpenseList();
  renderCreateProjectPaymentHistory();
  renderProjectEquipmentSelection();
  renderProjectOperationalSummary();
  refreshProjectSubmitButton();
  updateServicesClientTotalIndicator();
  renderProjectCreateSummaryCard();
}

function renderExpenseList() {
  if (!dom.expenseList) return;
  const items = Array.isArray(state.expenses) ? state.expenses : [];
  if (!items.length) {
    const emptyText = escapeHtml(getEmptyText(dom.expenseList));
    dom.expenseList.innerHTML = `
      <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper">
        <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table">
          <thead class="table-light">
            <tr>
              <th>${escapeHtml(t('projects.expenses.table.headers.service', 'الخدمة'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.cost', 'التكلفة (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.sale', 'سعر البيع (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.days', 'الأيام'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.note', 'ملاحظات'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.actions', 'الإجراءات'))}</th>
            </tr>
          </thead>
          <tbody>
            <tr><td colspan="6" class="text-center text-muted">${emptyText}</td></tr>
          </tbody>
        </table>
      </div>`;
    return;
  }

  const rows = items.map((expense) => {
    const label = escapeHtml(expense.label || '');
    const days = resolveProjectServiceDays(expense.days ?? expense.service_days);
    const amount = formatCurrency(calculateProjectServiceCost(expense));
    const sale = formatCurrency(calculateProjectServiceSale(expense));
    const note = escapeHtml(expense.note || '');
    const id = escapeHtml(String(expense.id));
    const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
    return `
      <tr>
        <td>${label}</td>
        <td>${escapeHtml(amount)}</td>
        <td>${escapeHtml(sale)}</td>
        <td>${escapeHtml(normalizeNumbers(String(days)))}</td>
        <td>${note || escapeHtml(t('common.placeholder.empty', '—'))}</td>
        <td>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </td>
      </tr>`;
  }).join('');

  dom.expenseList.innerHTML = `
      <div class="users-table-wrapper overflow-x-auto project-services-table-wrapper">
      <table class="ui-table users-table surface-table table table-sm table-hover align-middle project-services-table">
        <thead class="table-light">
            <tr>
              <th>${escapeHtml(t('projects.expenses.table.headers.service', 'الخدمة'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.cost', 'التكلفة (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.sale', 'سعر البيع (SR)'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.days', 'الأيام'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.note', 'ملاحظات'))}</th>
              <th>${escapeHtml(t('projects.expenses.table.headers.actions', 'الإجراءات'))}</th>
            </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

export function refreshProjectSubmitButton() {
  if (!dom.submitBtn) return;
  const isEditing = Boolean(state.editingProjectId);
  const labelKey = isEditing ? 'projects.form.buttons.update' : 'projects.form.buttons.save';
  const fallback = isEditing ? '🔁 تحديث المشروع' : '🆕 إنشاء المشروع';
  dom.submitBtn.textContent = t(labelKey, fallback);
}

function calculateExpensesTotal() {
  return state.expenses.reduce((sum, expense) => sum + calculateProjectServiceCost(expense), 0);
}

function normalizeEquipmentKey(value) {
  return normalizeNumbers(String(value || '')).trim().toLowerCase();
}

export function resolveSelectedEquipmentForApi() {
  if (!Array.isArray(state.selectedEquipment) || state.selectedEquipment.length === 0) {
    return { items: [], missing: [] };
  }

  const equipmentIndex = new Map(
    (state.equipment || []).map((item) => [normalizeEquipmentKey(item?.barcode), item])
  );
  const equipmentById = new Map(
    (state.equipment || [])
      .filter((item) => item?.id != null)
      .map((item) => [String(item.id), item])
  );

  const missing = [];
  const items = [];

  state.selectedEquipment.forEach((selection) => {
    if (selection?.type === 'package') {
      const packageItems = Array.isArray(selection.packageItems) ? selection.packageItems : [];
      const resolvedPackageItems = [];
      packageItems.forEach((pkgItem, packageItemIndex) => {
        const childId = pkgItem?.equipmentId ?? pkgItem?.equipment_id ?? null;
        const childBarcodeKey = normalizeEquipmentKey(pkgItem?.barcode ?? pkgItem?.normalizedBarcode);
        const equipmentItem = childId != null
          ? equipmentById.get(String(childId))
          : equipmentIndex.get(childBarcodeKey);
        if (!equipmentItem || equipmentItem.id == null) {
          missing.push(pkgItem?.barcode || pkgItem?.desc || selection?.desc || '');
          return;
        }
        resolvedPackageItems.push({
          ...pkgItem,
          equipmentId: equipmentItem.id,
          equipment_id: equipmentItem.id,
          barcode: pkgItem?.barcode ?? equipmentItem?.barcode ?? '',
          normalizedBarcode: normalizeEquipmentKey(pkgItem?.barcode ?? equipmentItem?.barcode ?? ''),
          qty: 1,
          quantity: 1,
          qtyPerPackage: 1,
        });
      });
      if (resolvedPackageItems.length) {
        items.push({
          ...selection,
          type: 'package',
          qty: 1,
          quantity: 1,
          packageItems: resolvedPackageItems,
        });
      }
      return;
    }

    const barcodeKey = normalizeEquipmentKey(selection?.barcode);
    if (!barcodeKey) {
      missing.push(selection?.barcode || '');
      return;
    }
    const equipmentItem = equipmentIndex.get(barcodeKey);
    if (!equipmentItem || equipmentItem.id == null) {
      missing.push(selection?.barcode || barcodeKey);
      return;
    }

    const quantity = Number.parseInt(String(selection?.qty ?? 0), 10);
    items.push({
      equipmentId: equipmentItem.id,
      qty: Number.isInteger(quantity) && quantity > 0 ? quantity : 1,
      unit_price: Number.isFinite(Number(selection?.price ?? selection?.unit_price)) ? Number(selection?.price ?? selection?.unit_price) : 0,
      unit_cost: Number.isFinite(Number(selection?.cost ?? selection?.unit_cost)) ? Number(selection?.cost ?? selection?.unit_cost) : 0,
      notes: selection?.notes ?? null,
    });
  });

  return { items, missing };
}

export function mapProjectEquipmentToApi(project) {
  if (!project || !Array.isArray(project.equipment)) return [];
  return project.equipment
    .map((item) => {
      const equipmentId = item?.equipmentId ?? item?.equipment_id ?? item?.id ?? null;
      const qty = Number.parseInt(String(item?.qty ?? item?.quantity ?? 0), 10);
      if (!equipmentId) return null;
      return {
        equipmentId,
        qty: Number.isInteger(qty) && qty > 0 ? qty : 1,
        unit_price: Number.isFinite(Number(item?.price ?? item?.unit_price ?? item?.unitPrice)) ? Number(item?.price ?? item?.unit_price ?? item?.unitPrice) : 0,
        unit_cost: Number.isFinite(Number(item?.cost ?? item?.unit_cost ?? item?.unitCost)) ? Number(item?.cost ?? item?.unit_cost ?? item?.unitCost) : 0,
        notes: item?.notes ?? null,
      };
    })
    .filter(Boolean);
}

export function calculateEquipmentEstimate() {
  return state.selectedEquipment.reduce((sum, item) => {
    const equipment = state.equipment.find((eq) => String(eq.barcode || '') === String(item.barcode));
    const price = Number(item?.price ?? item?.unit_price ?? equipment?.price ?? equipment?.daily_rate ?? equipment?.dailyRate ?? 0);
    return sum + price * (item.qty || 1);
  }, 0);
}

async function handleSubmitProject(event) {
  event.preventDefault();
  if (isProjectSubmitInProgress) return;

  const title = dom.title?.value.trim();
  const projectType = dom.type?.value || '';
  const clientInput = dom.client?.value?.trim() || '';
  const selectedClientId = dom.client?.dataset?.customerId || '';
  const startDateValue = dom.startDate?.value?.trim() || '';
  const startTimeValue = dom.startTime?.value?.trim() || '';

  if (!title || !projectType || !startDateValue) {
    showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
    return;
  }

  const customer = resolveProjectCustomer(clientInput, selectedClientId);
  if (!customer) {
    showToast(t('projects.toast.customerNotFound', '⚠️ لم يتم العثور على العميل بالاسم المدخل'));
    dom.client?.focus();
    return;
  }

  const clientId = String(customer.id);
  if (dom.client) {
    dom.client.dataset.customerId = clientId;
    dom.client.value = customer.customerName || customer.name || dom.client.value;
  }
  setProjectClientCompany(customer);

  const endDateValue = dom.endDate?.value?.trim() || '';
  const endTimeValue = dom.endTime?.value?.trim() || '';

  const startIso = combineDateTime(startDateValue, startTimeValue);
  const endIso = endDateValue ? combineDateTime(endDateValue, endTimeValue) : '';

  const startDate = new Date(startIso);
  const endDate = endIso ? new Date(endIso) : null;
  if (endDate && startDate > endDate) {
    showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
    return;
  }

  if (dom.expenseAmount) {
    dom.expenseAmount.value = normalizeNumbers(dom.expenseAmount.value || '');
  }

  const expensesTotal = calculateExpensesTotal();
  const equipmentEstimate = calculateEquipmentEstimate();
  const createSummary = getProjectCreateSummaryFromState();
  const crewEstimate = createSummary.crewRevenue;
  // Prefer the accumulated total when available; fallback to current input
  const servicesClientPriceRaw = normalizeNumbers(dom.servicesClientPrice?.value || '');
  let servicesClientPrice = state.servicesClientPriceTotal || Number.parseFloat(servicesClientPriceRaw);
  if (!Number.isFinite(servicesClientPrice) || servicesClientPrice < 0) {
    servicesClientPrice = 0;
  }
  if (servicesClientPrice > 0 && (!Array.isArray(state.expenses) || state.expenses.length === 0)) {
    showToast(t('projects.toast.productionServicesRequireRows', '⚠️ أضف الخدمات الإنتاجية كصفوف مع التكلفة وسعر البيع وعدد الأيام قبل حفظ المشروع'));
    dom.expenseLabel?.focus();
    return;
  }
  const applyTax = dom.taxCheckbox?.checked === true;
  const discountType = dom.discountType?.value === 'amount' ? 'amount' : 'percent';
  const discountRaw = normalizeNumbers(dom.discountValue?.value || '0');
  let discountValue = Number.parseFloat(discountRaw);
  if (!Number.isFinite(discountValue) || discountValue < 0) {
    discountValue = 0;
  }

  const shareCheckbox = dom.companyShare;
  const companyShareEnabled = shareCheckbox?.checked === true;
  let companySharePercent = companyShareEnabled
    ? Number.parseFloat(normalizeNumbers(String(shareCheckbox.dataset.companyShare ?? shareCheckbox.value ?? DEFAULT_COMPANY_SHARE_PERCENT)))
    : null;
  if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
    companySharePercent = companyShareEnabled ? DEFAULT_COMPANY_SHARE_PERCENT : null;
  }

  const finance = calculateProjectFinancials({
    equipmentEstimate,
    crewEstimate,
    expensesTotal,
    servicesClientPrice,
    discountValue,
    discountType,
    applyTax,
    companyShareEnabled,
    companySharePercent,
  });

  const paymentProgressType = dom.paymentProgressType?.value === 'amount' ? 'amount' : 'percent';
  const progressRaw = normalizeNumbers(dom.paymentProgressValue?.value || '');
  const progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;

  const paymentProgress = calculatePaymentProgress({
    totalAmount: finance.totalWithTax,
    progressType: paymentProgressType,
    progressValue,
    history: Array.isArray(createProjectPaymentHistory) ? [...createProjectPaymentHistory] : [],
  });

  const manualStatusSelected = dom.paymentStatus?.dataset?.userSelected === 'true';
  const selectedPaymentStatus = (dom.paymentStatus?.value || 'unpaid').toLowerCase();
  const normalizedSelectedStatus = ['paid', 'partial'].includes(selectedPaymentStatus) ? selectedPaymentStatus : 'unpaid';

  const inferredPaymentStatus = determinePaymentStatus({
    manualStatus: manualStatusSelected ? normalizedSelectedStatus : null,
    paidAmount: paymentProgress.paidAmount,
    paidPercent: paymentProgress.paidPercent,
    totalAmount: finance.totalWithTax,
  });

  const paymentStatus = manualStatusSelected ? normalizedSelectedStatus : inferredPaymentStatus;

  if (!manualStatusSelected && dom.paymentStatus) {
    dom.paymentStatus.value = paymentStatus;
  }
  if (dom.paymentStatus?.dataset) {
    delete dom.paymentStatus.dataset.userSelected;
  }

  const { items: equipmentForApi, missing } = resolveSelectedEquipmentForApi();
  if (missing.length) {
    showToast(t('projects.toast.equipmentMissing', '⚠️ بعض المعدات المحددة غير موجودة في النظام، يرجى تحديث قائمة المعدات'), 'error');
    return;
  }

  const unassignedCrew = getUnassignedProjectCrewAssignments();
  if (unassignedCrew.length) {
    const labels = unassignedCrew
      .slice(0, 3)
      .map((assignment) => assignment.positionLabel || assignment.position_name || assignment.role || t('reservations.crew.positionFallback', 'منصب بدون اسم'))
      .join(t('reservations.list.crew.separator', '، '));
    showToast(
      t('technicians.picker.toast.assignAllRequired', '⚠️ يجب تعيين عضو طاقم لكل منصب قبل متابعة الحجز')
        + (labels ? `: ${normalizeNumbers(labels)}${unassignedCrew.length > 3 ? '…' : ''}` : ''),
      'warning',
      5000
    );
    return;
  }

  const isEditing = Boolean(state.editingProjectId);
  const existingProject = isEditing
    ? state.projects.find((proj) => String(proj.id) === String(state.editingProjectId))
    : null;

  if (isEditing && !existingProject) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  const companyValue = customer.companyName || customer.company || '';
  const descriptionValue = dom.description?.value.trim() || '';

  const payload = buildProjectPayload({
    projectCode: existingProject?.projectCode || (!isEditing ? generateProjectCode() : null),
    title,
    type: projectType,
    clientId,
    clientCompany: companyValue,
    description: descriptionValue,
    start: startIso,
    end: endIso || null,
    applyTax,
    paymentStatus,
    equipmentEstimate,
    expenses: state.expenses.map((expense) => ({
      id: expense.id,
      label: expense.label,
      amount: expense.amount,
      // Persist per-item sale price so backend stores sale_price in project_expenses
      salePrice: expense.salePrice,
      days: resolveProjectServiceDays(expense.days ?? expense.service_days),
      note: expense.note || undefined,
    })),
    servicesClientPrice,
    discount: discountValue,
    discountType,
    companyShareEnabled: companyShareEnabled && applyTax,
    companySharePercent: companyShareEnabled && applyTax ? companySharePercent : null,
    companyShareAmount: finance.companyShareAmount,
    taxAmount: finance.taxAmount,
    totalWithTax: finance.totalWithTax,
    confirmed: existingProject?.confirmed ?? false,
    technicians: state.selectedTechnicians,
    crewAssignments: state.selectedTechnicians,
    equipment: equipmentForApi,
    syncManagedReservation: true,
    paidAmount: paymentProgress.paidAmount,
    paidPercentage: paymentProgress.paidPercent,
    paymentProgressType: paymentProgress.paymentProgressType,
    paymentProgressValue: paymentProgress.paymentProgressValue,
    payments: Array.isArray(createProjectPaymentHistory) ? createProjectPaymentHistory : [],
  });

  isProjectSubmitInProgress = true;

  try {
    let projectIdentifier = existingProject?.projectId ?? existingProject?.id ?? null;

    if (isEditing) {
      const updated = await updateProjectApi(projectIdentifier ?? state.editingProjectId, payload);
      projectIdentifier = updated?.projectId ?? updated?.id ?? projectIdentifier;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
    } else {
      const created = await createProjectApi(payload);
      projectIdentifier = created?.projectId ?? created?.id ?? null;
      await handleProjectReservationSync(projectIdentifier, paymentStatus);
      showToast(t('projects.toast.saved', '✅ تم حفظ المشروع بنجاح'));
      // بعد إنشاء المشروع بنجاح: الانتقال تلقائياً إلى تبويب "مشاريعي"
      try {
        updatePreferences({ projectsTab: 'projects-section', projectsSubTab: 'projects-list-tab' }).catch(() => {});
        // فعّل التبويب بصرياً إن وُجدت الأزرار في الصفحة الحالية
        const mainTabBtn = document.querySelector('.tab-button[data-tab-target="projects-section"]');
        if (mainTabBtn && typeof mainTabBtn.click === 'function') {
          mainTabBtn.click();
        }
        const listSubTabBtn = document.querySelector('.sub-tab-button[data-project-subtab-target="projects-list-tab"]');
        if (listSubTabBtn && typeof listSubTabBtn.click === 'function') {
          // تأخير بسيط لضمان تبديل التاب الرئيسي أولاً عند الحاجة
          setTimeout(() => listSubTabBtn.click(), 0);
        }
      } catch (_) { /* تجاهل أي أخطاء غير متوقعة */ }
    }

    clearProjectFormDraft();

    state.editingProjectId = null;
    dom.form.reset();
    resetProjectFormState();
    clearProjectDateInputs();
    clearProjectCustomerSuggestions();
    if (dom.client) {
      dom.client.dataset.customerId = '';
    }
    if (dom.type) {
      dom.type.value = '';
    }

    // Ensure we reload full project data (including expenses) from API after create/update
    try {
      await refreshProjectsFromApi();
    } catch (_) { /* ignore network errors here */ }
    state.projects = getProjectsState();
    await refreshProjectManagedReservationState();
    renderProjects();
    updateSummary();
    document.dispatchEvent(new CustomEvent('projects:changed'));
    if (!isEditing) {
      document.dispatchEvent(new CustomEvent('projects:create:completed', {
        detail: { projectId: projectIdentifier }
      }));
    }
  } catch (error) {
    console.error('❌ [projects] handleSubmitProject failed', error);
    const isAbort = error?.name === 'AbortError';
    const message = isAbort
      ? t('projects.toast.saveTimeout', 'انتهت مهلة حفظ المشروع. تحقق من الاتصال وحاول مرة أخرى.')
      : (isProjectApiError(error)
        ? error.message
        : t('projects.toast.saveFailed', 'تعذر حفظ المشروع، حاول مرة أخرى'));
    showToast(message, 'error');
  } finally {
    isProjectSubmitInProgress = false;
  }
}

function combineDateTime(dateValue, timeValue) {
  if (!dateValue) return '';
  const normalizedTime = (timeValue && /\d{1,2}:\d{2}/.test(timeValue)) ? timeValue : '00:00';
  const [hours = '00', minutes = '00'] = normalizedTime.split(':');
  const safeHours = hours.padStart(2, '0');
  const safeMinutes = minutes.padStart(2, '0');
  return `${dateValue}T${safeHours}:${safeMinutes}`;
}

function loadProjectFormDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return null;
  const raw = window.sessionStorage.getItem(PROJECT_FORM_DRAFT_STORAGE_KEY);
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw);
    return draft && typeof draft === 'object' ? draft : null;
  } catch (error) {
    console.warn('⚠️ [projects] Failed to parse project form draft', error);
    return null;
  }
}

function saveProjectFormDraft(draft) {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(PROJECT_FORM_DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to persist project form draft', error);
  }
}

function clearProjectFormDraft() {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  window.sessionStorage.removeItem(PROJECT_FORM_DRAFT_STORAGE_KEY);
  renderProjectOperationalSummary();
}

function captureProjectFormDraft() {
  const existingDraft = loadProjectFormDraft() || {};
  return {
    ...existingDraft,
    type: dom.type?.value || '',
    title: dom.title?.value || '',
    client: dom.client?.value || '',
    customerId: dom.client?.dataset.customerId || '',
    clientCompany: dom.clientCompany?.value || '',
    paymentStatus: dom.paymentStatus?.value || 'unpaid',
    taxChecked: dom.taxCheckbox?.checked === true,
    discountType: dom.discountType?.value || 'percent',
    discountValue: dom.discountValue?.value || '',
    companyShareEnabled: dom.companyShare?.checked === true,
    companySharePercent: dom.companyShare?.dataset.companyShare || dom.companyShare?.value || String(DEFAULT_COMPANY_SHARE_PERCENT),
    paymentProgressType: dom.paymentProgressType?.value || 'percent',
    paymentProgressValue: dom.paymentProgressValue?.value || '',
    startDate: dom.startDate?.value || '',
    startTime: dom.startTime?.value || '',
    endDate: dom.endDate?.value || '',
    endTime: dom.endTime?.value || '',
    description: dom.description?.value || '',
    expenses: Array.isArray(state.expenses) ? state.expenses.map((expense) => ({ ...expense })) : [],
    servicesClientPriceTotal: Number.isFinite(Number(state.servicesClientPriceTotal)) ? state.servicesClientPriceTotal : 0,
    technicians: Array.isArray(state.selectedTechnicians) ? [...state.selectedTechnicians] : [],
    equipment: Array.isArray(state.selectedEquipment)
      ? state.selectedEquipment.map((item) => ({ ...item }))
      : [],
    savedAt: Date.now()
  };
}

export function restoreProjectFormDraft() {
  const draft = loadProjectFormDraft();
  if (!draft) {
    renderProjectOperationalSummary();
    return false;
  }

  if (dom.type) dom.type.value = draft.type || '';
  if (dom.title) dom.title.value = draft.title || '';
  if (dom.client) {
    dom.client.value = draft.client || '';
    dom.client.dataset.customerId = draft.customerId || '';
  }
  if (dom.clientCompany) dom.clientCompany.value = draft.clientCompany || '';
  if (dom.paymentStatus && draft.paymentStatus) dom.paymentStatus.value = draft.paymentStatus;
  if (dom.taxCheckbox) dom.taxCheckbox.checked = draft.taxChecked === true;
  if (dom.discountType && draft.discountType) dom.discountType.value = draft.discountType;
  if (dom.discountValue) dom.discountValue.value = draft.discountValue || '';
  if (dom.companyShare) {
    if (draft.companySharePercent) {
      dom.companyShare.dataset.companyShare = String(draft.companySharePercent);
    } else {
      dom.companyShare.dataset.companyShare = String(DEFAULT_COMPANY_SHARE_PERCENT);
    }
    dom.companyShare.checked = draft.companyShareEnabled === true;
  }
  if (dom.paymentProgressType && draft.paymentProgressType) {
    dom.paymentProgressType.value = draft.paymentProgressType;
  }
  if (dom.paymentProgressValue) {
    dom.paymentProgressValue.value = draft.paymentProgressValue || '';
  }
  state.servicesClientPriceTotal = Number.isFinite(Number(draft.servicesClientPriceTotal)) ? Number(draft.servicesClientPriceTotal) : 0;
  if (dom.startDate) dom.startDate.value = draft.startDate || '';
  if (dom.startTime) dom.startTime.value = draft.startTime || '';
  if (dom.endDate) dom.endDate.value = draft.endDate || '';
  if (dom.endTime) dom.endTime.value = draft.endTime || '';
  if (dom.description) dom.description.value = draft.description || '';

  state.expenses = Array.isArray(draft.expenses) ? draft.expenses.map((expense) => ({ ...expense })) : [];
  state.selectedTechnicians = Array.isArray(draft.technicians) ? [...draft.technicians] : [];
  setSelectedTechnicians(state.selectedTechnicians);
  state.selectedEquipment = Array.isArray(draft.equipment)
    ? draft.equipment.map((item) => ({ ...item }))
    : [];

  syncProjectTaxAndShare('tax');
  renderProjectOperationalSummary();
  updateServicesClientTotalIndicator();
  renderProjectCreateSummaryCard();
  return true;
}

function renderProjectOperationalSummary() {
  const equipmentSummary = dom.operationalEquipmentSummary || document.getElementById('project-operational-equipment-summary');
  const crewSummary = dom.operationalCrewSummary || document.getElementById('project-operational-crew-summary');

  if (equipmentSummary) {
    const items = Array.isArray(state.selectedEquipment) ? state.selectedEquipment : [];
    if (!items.length) {
      equipmentSummary.dataset.state = 'empty';
      equipmentSummary.hidden = false;
      equipmentSummary.textContent = t('projects.form.operationalBooking.equipmentEmpty', 'لم تتم إضافة معدات بعد.');
    } else {
      const totalQty = items.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
      equipmentSummary.dataset.state = 'filled';
      equipmentSummary.hidden = true;
      equipmentSummary.textContent = t('projects.form.operationalBooking.equipmentCount', 'معدات محددة: {count}')
        .replace('{count}', normalizeNumbers(String(totalQty)));
    }
  }

  if (crewSummary) {
    const assignments = Array.isArray(state.selectedTechnicians) ? state.selectedTechnicians : [];
    if (!assignments.length) {
      crewSummary.dataset.state = 'empty';
      crewSummary.textContent = t('projects.form.operationalBooking.crewEmpty', 'لم تتم إضافة مناصب أو أعضاء فريق بعد.');
    } else {
      crewSummary.dataset.state = 'filled';
      crewSummary.textContent = t('projects.form.operationalBooking.crewCount', 'مناصب/أعضاء فريق: {count}')
        .replace('{count}', normalizeNumbers(String(assignments.length)));
    }
  }

  renderProjectCreateSummaryCard();
}

function recalcServicesClientPriceTotal() {
  const total = Array.isArray(state.expenses)
    ? state.expenses.reduce((sum, exp) => sum + calculateProjectServiceSale(exp), 0)
    : 0;
  state.servicesClientPriceTotal = Math.round(total * 100) / 100;
}

function updateServicesClientTotalIndicator() {
  const indicator = dom.servicesClientTotalIndicator || document.getElementById('project-services-client-total-indicator');
  const valueEl = dom.servicesClientTotalValue || document.getElementById('project-services-client-total-value');
  if (!valueEl) return;
  const total = Number(state.servicesClientPriceTotal) || 0;
  valueEl.textContent = formatCurrency(total);
}
