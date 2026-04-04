import { t } from '../../language.js';
import { normalizeNumbers, showToast } from '../../utils.js';
import { state, dom } from '../state.js';
import { PROJECT_TAX_RATE } from '../constants.js';
import { escapeHtml, formatCurrency } from '../formatting.js';
import { combineProjectDateTime, splitDateTimeParts } from '../helpers.js';
import {
  mapProjectEquipmentToApi,
  calculateProjectFinancials,
  ensureProjectCompanyShareEnabled,
  getProjectCompanySharePercent,
} from '../form.js';
import {
  buildProjectPayload,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi,
  closeProjectApi,
  reopenProjectApi,
} from '../../projectsService.js';
import { getReservationsState } from '../../reservationsService.js';
import {
  getReservationsForProject,
  renderFocusCards,
  renderProjects,
  updateSummary,
  determineProjectStatus,
} from '../view.js';
import {
  handleProjectReservationSync,
  syncLinkedReservationsWithProject,
  updateLinkedReservationsCancelled,
  updateLinkedReservationsReopenFromCancelled,
  updateLinkedReservationsSchedule,
  updateLinkedReservationsClosed,
  updateLinkedReservationsReopened,
} from '../actions.js';
import {
  calculatePaymentProgress,
  determinePaymentStatus,
  DEFAULT_COMPANY_SHARE_PERCENT,
} from '../../reservationsSummary.js';
import { buildProjectEditPaymentHistoryMarkup } from './payment.js';
import { buildProjectTypeOptionsMarkup, buildProjectEditExpensesMarkup } from './display.js';

// ── Circular dep injection ────────────────────────────────────────────────────
// openProjectDetails lives in view.js; edit.js needs it after save/cancel.
// The entry point injects it after both modules are loaded.

let _openProjectDetails = null;

export function setOpenProjectDetails(fn) {
  _openProjectDetails = fn;
}

// ── startProjectEdit ──────────────────────────────────────────────────────────

export function startProjectEdit(project) {
  if (!project || !dom.detailsBody) return;

  const resolved = state.projects.find((entry) => String(entry.id) === String(project.id));
  if (!resolved) return;

  const customer = state.customers.find((entry) => String(entry.id) === String(resolved.clientId));
  const clientName = customer?.customerName || customer?.name || resolved.clientName || resolved.customerName || '';
  const clientCompany = resolved.clientCompany || customer?.companyName || customer?.company || '';

  const normalizedExpenses = Array.isArray(resolved.expenses)
    ? resolved.expenses.map((expense, index) => ({
        id: expense?.id || `expense-${resolved.id}-${index}-${Date.now()}`,
        label: expense?.label || '',
        amount: Number(expense?.amount) || 0,
        salePrice: Number.isFinite(Number(expense?.sale_price ?? expense?.salePrice))
          ? Number(expense?.sale_price ?? expense?.salePrice)
          : 0,
        note: expense?.note != null
          ? String(expense.note)
          : (expense?.notes != null ? String(expense.notes) : '')
      }))
    : [];

  let normalizedPayments = Array.isArray(resolved.paymentHistory)
    ? resolved.paymentHistory.map((entry, index) => ({
        type: entry?.type === 'percent' ? 'percent' : 'amount',
        amount: Number.isFinite(Number(entry?.amount)) ? Number(entry.amount) : null,
        percentage: Number.isFinite(Number(entry?.percentage)) ? Number(entry.percentage) : null,
        value: Number.isFinite(Number(entry?.value)) ? Number(entry.value) : null,
        note: entry?.note ?? null,
        recordedAt: entry?.recordedAt ?? entry?.recorded_at ?? new Date().toISOString(),
        key: `payment-${resolved.id}-${index}`,
      }))
    : [];

  let historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
  let historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);

  let basePaidAmount = Number.isFinite(Number(resolved.paidAmount)) ? Number(resolved.paidAmount) : 0;
  let basePaidPercent = Number.isFinite(Number(resolved.paidPercent)) ? Number(resolved.paidPercent) : 0;

  if (!normalizedPayments.length && (basePaidAmount > 0 || basePaidPercent > 0)) {
    const fallbackRecordedAt = resolved.updatedAt
      ?? resolved.createdAt
      ?? new Date().toISOString();

    if (basePaidPercent > 0) {
      normalizedPayments = [
        {
          type: 'percent',
          amount: Number.isFinite(basePaidAmount) && basePaidAmount > 0 ? basePaidAmount : null,
          percentage: basePaidPercent,
          value: basePaidPercent,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-percent`
        }
      ];
    } else if (basePaidAmount > 0) {
      normalizedPayments = [
        {
          type: 'amount',
          amount: basePaidAmount,
          percentage: null,
          value: basePaidAmount,
          note: null,
          recordedAt: fallbackRecordedAt,
          key: `legacy-payment-${resolved.id}-amount`
        }
      ];
    }

    historyPaidAmount = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0);
    historyPaidPercent = normalizedPayments.reduce((sum, entry) => sum + (Number(entry?.percentage) || 0), 0);
    basePaidAmount = 0;
    basePaidPercent = 0;
  }

  if (historyPaidAmount > 0 && Math.abs(basePaidAmount - historyPaidAmount) < 0.01) {
    basePaidAmount = 0;
  }
  if (historyPaidPercent > 0 && Math.abs(basePaidPercent - historyPaidPercent) < 0.01) {
    basePaidPercent = 0;
  }

  const editState = {
    clientName,
    clientCompany,
    expenses: normalizedExpenses,
    payments: normalizedPayments,
    basePaidAmount,
    basePaidPercent
  };

  dom.detailsBody.dataset.mode = 'edit';
  dom.detailsBody.innerHTML = buildProjectEditForm(resolved, editState);
  bindProjectEditForm(resolved, editState);
}

// ── bindProjectEditForm ───────────────────────────────────────────────────────

function bindProjectEditForm(project, editState = { expenses: [] }) {
  const form = dom.detailsBody?.querySelector('#project-details-edit-form');
  if (!form) return;

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      _openProjectDetails?.(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
  const expenseSaleInput = form.querySelector('#project-edit-expense-sale');
  const expenseNoteInput = form.querySelector('#project-edit-expense-note');
  const addExpenseBtn = form.querySelector('[data-action="add-expense"]');
  const expensesContainer = form.querySelector('#project-edit-expense-list');
  const startDateInput = form.querySelector('[name="project-start-date"]');
  const startTimeInput = form.querySelector('[name="project-start-time"]');
  const endDateInput = form.querySelector('[name="project-end-date"]');
  const endTimeInput = form.querySelector('[name="project-end-time"]');
  const paymentStatusSelect = form.querySelector('[name="project-payment-status"]');
  const taxCheckbox = form.querySelector('#project-edit-tax');
  const shareCheckbox = form.querySelector('#project-edit-company-share');
  const discountInput = form.querySelector('#project-edit-discount');
  const discountTypeSelect = form.querySelector('#project-edit-discount-type');
  const paymentProgressTypeSelect = form.querySelector('#project-edit-payment-progress-type');
  const paymentProgressValueInput = form.querySelector('#project-edit-payment-progress-value');
  const paymentAddButton = form.querySelector('#project-edit-payment-add');
  const paymentHistoryContainer = form.querySelector('#project-edit-payment-history');
  const paymentSummaryContainer = form.querySelector('#project-edit-payment-summary');
  const currencyLabel = t('reservations.create.summary.currency', 'SR');
  const cancelProjectCheckbox = form.querySelector('#project-cancelled');
  const confirmToggleBtn = form.querySelector('#project-edit-confirm-toggle');
  const confirmStateInput = form.querySelector('#project-edit-confirmed');
  const confirmStatusLabel = form.querySelector('#project-edit-confirm-label');
  const confirmHint = form.querySelector('#project-edit-confirm-hint');
  const wasCancelled = (project?.cancelled === true || project?.cancelled === 'true')
    || String(project?.status || '').toLowerCase() === 'cancelled'
    || String(project?.status || '').toLowerCase() === 'canceled';

  let isSyncingShareTax = false;

  const initEditDateTimePickers = () => {
    const fp = (typeof window !== 'undefined' ? window.flatpickr : null)
      || (typeof globalThis !== 'undefined' ? globalThis.flatpickr : null);
    if (!fp) return;

    if (startDateInput) fp(startDateInput, { dateFormat: 'Y-m-d', allowInput: true });
    if (endDateInput) fp(endDateInput, { dateFormat: 'Y-m-d', allowInput: true });

    const timeOpts = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i',
      altInput: true,
      altFormat: 'h:i K',
      time_24hr: false,
      defaultHour: 9,
      defaultMinute: 0,
      minuteIncrement: 5,
      disableMobile: true,
      allowInput: true,
      altInputClass: 'flatpickr-alt-input form-control'
    };
    if (startTimeInput) fp(startTimeInput, timeOpts);
    if (endTimeInput) fp(endTimeInput, timeOpts);
  };

  initEditDateTimePickers();

  const attachNumericNormalization = (inputEl) => {
    if (!inputEl || inputEl.dataset.normalizedDigits === 'true') return;
    const handler = () => {
      const prev = inputEl.value || '';
      const normalized = normalizeNumbers(prev);
      if (normalized !== prev) {
        const start = inputEl.selectionStart;
        const end = inputEl.selectionEnd;
        inputEl.value = normalized;
        try {
          if (typeof start === 'number' && typeof end === 'number') {
            const delta = normalized.length - prev.length;
            inputEl.setSelectionRange(Math.max(0, start + delta), Math.max(0, end + delta));
          }
        } catch (_) {}
      }
    };
    inputEl.addEventListener('input', handler);
    inputEl.addEventListener('blur', handler);
    try { inputEl.setAttribute('inputmode', 'numeric'); } catch (_) {}
    inputEl.dataset.normalizedDigits = 'true';
  };

  attachNumericNormalization(startDateInput);
  attachNumericNormalization(startTimeInput);
  attachNumericNormalization(endDateInput);
  attachNumericNormalization(endTimeInput);
  if (startTimeInput && startTimeInput._flatpickr?.altInput) {
    attachNumericNormalization(startTimeInput._flatpickr.altInput);
  }
  if (endTimeInput && endTimeInput._flatpickr?.altInput) {
    attachNumericNormalization(endTimeInput._flatpickr.altInput);
  }

  const ensurePayments = () => {
    if (!Array.isArray(editState.payments)) {
      editState.payments = [];
    }
    return editState.payments;
  };

  const setConfirmationUi = () => {
    const isConfirmed = confirmStateInput?.value === 'true';
    if (confirmToggleBtn) {
      confirmToggleBtn.dataset.state = isConfirmed ? 'confirmed' : 'pending';
      confirmToggleBtn.classList.toggle('btn-success', !isConfirmed);
      confirmToggleBtn.classList.toggle('btn-outline-warning', isConfirmed);
      confirmToggleBtn.textContent = isConfirmed
        ? t('projects.form.actions.unconfirm', '↩️ إلغاء التأكيد')
        : t('projects.focus.actions.confirm', '✔️ تأكيد المشروع');
    }
    if (confirmStatusLabel) {
      confirmStatusLabel.textContent = isConfirmed
        ? t('projects.focus.confirmed', '✅ مشروع مؤكد')
        : t('projects.focus.pending', '⏳ غير مؤكد');
      confirmStatusLabel.classList.toggle('bg-success', isConfirmed);
      confirmStatusLabel.classList.toggle('bg-secondary', !isConfirmed);
    }
    if (confirmHint) {
      confirmHint.textContent = isConfirmed
        ? t('projects.form.hints.unconfirm', 'اضغط لإلغاء التأكيد وإعادة الحجوزات إلى غير مؤكدة')
        : t('projects.form.hints.confirm', 'اضغط لتأكيد المشروع وجميع الحجوزات المرتبطة');
    }
  };

  if (confirmToggleBtn && confirmStateInput) {
    confirmToggleBtn.addEventListener('click', () => {
      const next = confirmStateInput.value !== 'true';
      confirmStateInput.value = next ? 'true' : 'false';
      setConfirmationUi();
    });
    setConfirmationUi();
  }

  const computeFinanceContext = () => {
    const equipmentEstimate = Number(project.equipmentEstimate) || 0;
    const expensesTotal = Array.isArray(editState.expenses)
      ? editState.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0)
      : 0;
    const servicesClientPrice = Array.isArray(editState.expenses)
      ? Math.max(0, Math.round(editState.expenses.reduce((s, e) => s + (Number(e?.salePrice ?? 0)), 0) * 100) / 100)
      : Math.max(0, Number(project?.servicesClientPrice ?? 0));
    const discountTypeValue = discountTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const discountRaw = normalizeNumbers(discountInput?.value || '0');
    let discountValue = Number.parseFloat(discountRaw);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      discountValue = 0;
    }

    const applyTax = taxCheckbox?.checked === true;
    const companyShareEnabled = shareCheckbox?.checked === true;
    let companySharePercent = companyShareEnabled ? getProjectCompanySharePercent(shareCheckbox) : null;
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      companySharePercent = companyShareEnabled ? DEFAULT_COMPANY_SHARE_PERCENT : null;
    }

    const finance = calculateProjectFinancials({
      equipmentEstimate,
      expensesTotal,
      servicesClientPrice,
      discountValue,
      discountType: discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
    });

    return {
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
      servicesClientPrice,
      finance,
    };
  };

  const computePaymentSnapshot = () => {
    const context = computeFinanceContext();
    const payments = ensurePayments();
    const linkedReservations = getReservationsForProject(project.id) || [];
    const reservationsTotal = linkedReservations.reduce((sum, res) => sum + (Number(res?.totalAmount) || 0), 0);
    const projectTaxableBase = Number(context.finance?.taxableAmount || 0);
    const combinedTax = context.applyTax ? Number(((projectTaxableBase + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2)) : 0;
    const combinedTotalWithTax = Number((projectTaxableBase + reservationsTotal + combinedTax).toFixed(2));

    const progress = calculatePaymentProgress({
      totalAmount: combinedTotalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: payments,
    });

    try {
      const url = new URL(window.location.href);
      const v = (url.searchParams.get('paymentDebug') || '').toLowerCase();
      if (v === '1' || v === 'true' || v === 'yes') {
        // eslint-disable-next-line no-console
        console.debug('[PaymentDebug][modal]', {
          projectId: project?.id,
          projectTaxableBase,
          reservationsTotal,
          combinedTax,
          combinedTotalWithTax,
          paidAmount: progress.paidAmount,
          paidPercent: progress.paidPercent,
        });
      }
    } catch (_) {}

    return {
      ...context,
      combinedTotalWithTax,
      payments,
      progress,
    };
  };

  const renderPaymentHistory = () => {
    if (!paymentHistoryContainer) return;
    const { combinedTotalWithTax } = computePaymentSnapshot();
    paymentHistoryContainer.innerHTML = buildProjectEditPaymentHistoryMarkup(ensurePayments(), { total: combinedTotalWithTax });
  };

  const renderPaymentSummary = () => {
    if (!paymentSummaryContainer) return;
    const { combinedTotalWithTax, progress } = computePaymentSnapshot();
    const total = Number.isFinite(Number(combinedTotalWithTax)) ? Number(combinedTotalWithTax) : 0;
    const paidAmount = Number.isFinite(Number(progress.paidAmount)) ? Number(progress.paidAmount) : 0;
    const paidPercent = Number.isFinite(Number(progress.paidPercent)) ? Number(progress.paidPercent) : 0;
    const remainingAmount = Math.max(0, Math.round((total - paidAmount) * 100) / 100);

    const summaryRows = [
      { label: t('projects.form.paymentSummary.total', 'الإجمالي الكلي'), value: formatCurrency(total) },
      { label: t('projects.form.paymentSummary.paidAmount', 'إجمالي المدفوع'), value: formatCurrency(paidAmount) },
      { label: t('projects.form.paymentSummary.paidPercent', 'نسبة الدفعات'), value: `${normalizeNumbers(paidPercent.toFixed(2))}%` },
      { label: t('projects.form.paymentSummary.remaining', 'المتبقي'), value: formatCurrency(remainingAmount) },
    ];

    paymentSummaryContainer.innerHTML = summaryRows
      .map(({ label, value }) => `
        <div class="project-details-grid-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `)
      .join('');
  };

  const syncPaymentStatusValue = (trigger = 'auto') => {
    if (!paymentStatusSelect) return;
    const manualSelected = paymentStatusSelect.dataset?.userSelected === 'true';
    if (trigger === 'auto' && manualSelected) {
      return;
    }

    const { finance, progress } = computePaymentSnapshot();
    const resolvedStatus = determinePaymentStatus({
      manualStatus: manualSelected ? paymentStatusSelect.value : project.paymentStatus || 'unpaid',
      paidAmount: progress.paidAmount,
      paidPercent: progress.paidPercent,
      totalAmount: finance.totalWithTax,
    });

    if (!manualSelected) {
      paymentStatusSelect.value = resolvedStatus;
    }
  };

  const refreshPaymentUi = () => {
    renderPaymentHistory();
    renderPaymentSummary();
    syncPaymentStatusValue('auto');
  };

  const PAYMENT_TOLERANCE = 0.0001;

  const addPaymentEntry = () => {
    const type = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const rawValue = normalizeNumbers(paymentProgressValueInput?.value || '').replace('%', '').trim();
    let value = Number.parseFloat(rawValue);

    if (!Number.isFinite(value) || value <= 0) {
      showToast(t('projects.toast.paymentInvalid', '⚠️ يرجى إدخال قيمة دفعة صحيحة'));
      paymentProgressValueInput?.focus();
      return;
    }

    const snapshot = computePaymentSnapshot();
    const totalAmount = Number.isFinite(Number(snapshot.finance.totalWithTax)) ? Number(snapshot.finance.totalWithTax) : 0;

    if (totalAmount <= 0) {
      showToast(t('projects.toast.paymentTotalMissing', '⚠️ يرجى التأكد من إدخال البيانات المالية للمشروع قبل تسجيل الدفعة'));
      return;
    }

    const alreadyPaidAmount = Number(snapshot.progress.paidAmount) || 0;
    const alreadyPaidPercent = Number(snapshot.progress.paidPercent) || 0;

    let amount = null;
    let percentage = null;

    if (type === 'percent') {
      const remainingPercent = Math.max(0, 100 - alreadyPaidPercent);
      if (remainingPercent <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }
      if (value > remainingPercent) {
        value = remainingPercent;
        const adjustedPercent = normalizeNumbers(value.toFixed(2));
        showToast(t('projects.toast.paymentCappedPercent', 'ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%').replace('{value}', adjustedPercent));
      }
      percentage = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        amount = Math.round(((percentage / 100) * totalAmount) * 100) / 100;
      }
    } else {
      const remainingAmount = Math.max(0, totalAmount - alreadyPaidAmount);
      if (remainingAmount <= PAYMENT_TOLERANCE) {
        showToast(t('projects.toast.paymentNoRemainingBalance', '⚠️ تم تسجيل كامل قيمة المشروع، لا يمكن إضافة دفعة جديدة'));
        return;
      }
      if (value > remainingAmount) {
        value = remainingAmount;
        const adjustedAmount = `${normalizeNumbers(value.toFixed(2))} ${currencyLabel}`;
        showToast(t('projects.toast.paymentCappedAmount', 'ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي').replace('{amount}', adjustedAmount));
      }
      amount = Math.round(value * 100) / 100;
      if (totalAmount > 0) {
        percentage = Math.round(((amount / totalAmount) * 100) * 100) / 100;
      }
    }

    editState.payments = [...ensurePayments(), {
      type,
      amount: amount != null ? amount : null,
      percentage: percentage != null ? percentage : null,
      value: type === 'amount' ? amount : percentage,
      note: null,
      recordedAt: new Date().toISOString(),
    }];

    if (paymentProgressValueInput) paymentProgressValueInput.value = '';
    if (paymentProgressTypeSelect) paymentProgressTypeSelect.value = 'percent';

    refreshPaymentUi();
    showToast(t('projects.toast.paymentAdded', '✅ تم تسجيل الدفعة'));
  };

  const syncShareAndTax = (source) => {
    if (!taxCheckbox || !shareCheckbox) return;
    if (isSyncingShareTax) return;
    isSyncingShareTax = true;

    if (source === 'share') {
      if (shareCheckbox.checked) {
        if (!taxCheckbox.checked) taxCheckbox.checked = true;
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else {
        if (taxCheckbox.checked) taxCheckbox.checked = false;
      }
    } else if (source === 'tax') {
      if (taxCheckbox.checked) {
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else if (shareCheckbox.checked) {
        shareCheckbox.checked = false;
      }
    }

    isSyncingShareTax = false;
  };

  function renderExpenses() {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  }

  renderExpenses();
  refreshPaymentUi();

  const closeBtn = form.querySelector('#project-edit-close-btn');
  const reopenBtn = form.querySelector('#project-edit-reopen-btn');
  const isClosed = String(project?.status || '').toLowerCase() === 'completed';
  if (closeBtn) closeBtn.disabled = isClosed;
  if (reopenBtn) reopenBtn.disabled = !isClosed;

  const openCloseProjectModal = () => {
    const modal = document.getElementById('closeProjectModal');
    const notesArea = document.getElementById('close-project-notes');
    const submit = document.getElementById('close-project-submit');
    if (notesArea) notesArea.value = '';
    if (submit && submit.__tmpCloseProjectListener) {
      submit.removeEventListener('click', submit.__tmpCloseProjectListener);
      submit.__tmpCloseProjectListener = null;
    }
    if (submit) {
      const handler = async () => {
        const note = notesArea?.value || '';
        try {
          const updated = await closeProjectApi(project.projectId ?? project.id, note);
          await updateLinkedReservationsClosed(updated?.projectId ?? updated?.id ?? project.id);
          state.projects = getProjectsState();
          state.reservations = getReservationsState();
          showToast(t('projects.toast.closed', '✅ تم إغلاق المشروع'));
          renderProjects();
          renderFocusCards();
          updateSummary();
          _openProjectDetails?.(updated?.id ?? project.id);
        } catch (e) {
          console.error('❌ [projects/projectDetails/edit.js] closeProject failed', e);
          showToast(t('projects.toast.closeFailed', 'تعذر إغلاق المشروع'), 'error');
        } finally {
          try {
            const inst = (window.bootstrap?.Modal || bootstrap?.Modal)?.getInstance?.(modal) || (window.bootstrap?.Modal || bootstrap?.Modal)?.getOrCreateInstance?.(modal);
            inst?.hide?.();
          } catch (_) {}
        }
      };
      submit.__tmpCloseProjectListener = handler;
      submit.addEventListener('click', handler, { once: true });
    }
    if (modal && (window.bootstrap?.Modal || (typeof bootstrap !== 'undefined' && bootstrap?.Modal))) {
      const inst = (window.bootstrap?.Modal || bootstrap.Modal).getOrCreateInstance(modal);
      inst.show();
    }
  };

  if (closeBtn && !closeBtn.dataset.listenerAttached) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCloseProjectModal();
    });
    closeBtn.dataset.listenerAttached = 'true';
  }

  if (reopenBtn && !reopenBtn.dataset.listenerAttached) {
    reopenBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const updated = await reopenProjectApi(project.projectId ?? project.id);
        await updateLinkedReservationsReopened(updated?.projectId ?? updated?.id ?? project.id);
        state.projects = getProjectsState();
        state.reservations = getReservationsState();
        showToast(t('projects.toast.reopened', '↩️ تم إلغاء إغلاق المشروع'));
        renderProjects();
        renderFocusCards();
        updateSummary();
        _openProjectDetails?.(updated?.id ?? project.id);
      } catch (e2) {
        console.error('❌ [projects/projectDetails/edit.js] reopenProject failed', e2);
        showToast(t('projects.toast.reopenFailed', 'تعذر إلغاء الإغلاق'), 'error');
      }
    });
    reopenBtn.dataset.listenerAttached = 'true';
  }

  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountInput.dataset.listenerAttached = 'true';
  }

  if (expenseSaleInput && !expenseSaleInput.dataset.listenerAttached) {
    expenseSaleInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    expenseSaleInput.dataset.listenerAttached = 'true';
  }

  if (discountTypeSelect && !discountTypeSelect.dataset.listenerAttached) {
    discountTypeSelect.addEventListener('change', () => {
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    discountTypeSelect.dataset.listenerAttached = 'true';
  }

  if (paymentProgressValueInput && !paymentProgressValueInput.dataset.listenerAttached) {
    paymentProgressValueInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    paymentProgressValueInput.dataset.listenerAttached = 'true';
  }

  if (paymentStatusSelect && !paymentStatusSelect.dataset.listenerAttached) {
    paymentStatusSelect.addEventListener('change', () => {
      paymentStatusSelect.dataset.userSelected = 'true';
    });
    paymentStatusSelect.dataset.listenerAttached = 'true';
  }

  if (expenseAmountInput && !expenseAmountInput.dataset.listenerAttached) {
    expenseAmountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    expenseAmountInput.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => {
      syncShareAndTax('share');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => {
      syncShareAndTax('tax');
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox?.checked) {
    ensureProjectCompanyShareEnabled(shareCheckbox);
  }

  syncShareAndTax(shareCheckbox?.checked ? 'share' : 'tax');
  renderPaymentSummary();
  syncPaymentStatusValue('auto');

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);
      const normalizedSale = normalizeNumbers(expenseSaleInput?.value || '0');
      const salePrice = Number(normalizedSale);
      const note = (expenseNoteInput?.value || '').trim();

      if (!label) {
        showToast(t('projects.toast.missingExpenseLabel', '⚠️ يرجى إدخال وصف المصروف'));
        expenseLabelInput?.focus();
        return;
      }

      if (!Number.isFinite(amount) || amount <= 0) {
        showToast(t('projects.toast.invalidExpenseAmount', '⚠️ يرجى إدخال مبلغ صحيح'));
        expenseAmountInput?.focus();
        return;
      }

      editState.expenses.push({
        id: `expense-${project.id}-${Date.now()}`,
        label,
        amount,
        salePrice: Number.isFinite(salePrice) && salePrice > 0 ? salePrice : 0,
        note: note || ''
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      if (expenseSaleInput) expenseSaleInput.value = '';
      if (expenseNoteInput) expenseNoteInput.value = '';
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });
  }

  if (expensesContainer) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
      renderPaymentSummary();
      syncPaymentStatusValue('auto');
    });

    expensesContainer.addEventListener('input', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement)) return;
      const expenseId = target.dataset.expenseId;
      const field = target.dataset.expenseField;
      if (!expenseId || !field) return;
      const index = editState.expenses.findIndex((e) => String(e.id) === String(expenseId));
      if (index === -1) return;
      const value = target.value;
      if (field === 'amount' || field === 'salePrice') {
        const normalized = normalizeNumbers(value || '');
        const num = Number.parseFloat(normalized);
        if (Number.isFinite(num) && num >= 0) {
          editState.expenses[index][field] = num;
        } else if (value === '' || normalized === '') {
          editState.expenses[index][field] = 0;
        }
        renderPaymentSummary();
        syncPaymentStatusValue('auto');
      } else if (field === 'label' || field === 'note') {
        editState.expenses[index][field] = value;
      }
    });
  }

  if (paymentAddButton && !paymentAddButton.dataset.listenerAttached) {
    paymentAddButton.addEventListener('click', (event) => {
      event.preventDefault();
      addPaymentEntry();
    });
    paymentAddButton.dataset.listenerAttached = 'true';
  }

  if (paymentHistoryContainer && !paymentHistoryContainer.dataset.listenerAttached) {
    paymentHistoryContainer.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="remove-payment"]');
      if (!button) return;
      const index = Number.parseInt(button.dataset.index || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      const payments = ensurePayments();
      if (index >= payments.length) return;
      editState.payments = payments.filter((_, i) => i !== index);
      refreshPaymentUi();
      showToast(t('projects.toast.paymentRemoved', '🗑️ تم حذف الدفعة'));
    });
    paymentHistoryContainer.dataset.listenerAttached = 'true';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = normalizeNumbers(startDateInput?.value.trim() || '');
    const startTimeValue = normalizeNumbers(startTimeInput?.value.trim() || '');
    const descriptionValue = descriptionInput?.value.trim() || '';
    const selectedPaymentStatus = (paymentStatusSelect?.value || 'unpaid').toLowerCase();
    const normalizedPaymentStatus = ['paid', 'partial'].includes(selectedPaymentStatus)
      ? selectedPaymentStatus
      : 'unpaid';

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = normalizeNumbers(endDateInput?.value.trim() || '');
    const endTimeValue = normalizeNumbers(endTimeInput?.value.trim() || '');

    const startIso = combineProjectDateTime(startDateValue, startTimeValue);
    const endIso = endDateValue ? combineProjectDateTime(endDateValue, endTimeValue) : '';

    const startDate = new Date(startIso);
    const endDate = endIso ? new Date(endIso) : null;
    if (endDate && startDate > endDate) {
      showToast(t('projects.toast.invalidDateRange', '⚠️ تاريخ النهاية يجب أن يكون بعد تاريخ البداية'));
      endDateInput?.focus();
      return;
    }

    const index = state.projects.findIndex((entry) => String(entry.id) === String(project.id));
    if (index === -1) {
      showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
      return;
    }

    const financeContext = computeFinanceContext();
    const {
      equipmentEstimate,
      expensesTotal,
      servicesClientPrice,
      discountValue,
      discountTypeValue,
      applyTax: computedApplyTax,
      companyShareEnabled: contextShareEnabled,
      companySharePercent,
      finance,
    } = financeContext;

    const progressType = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const progressRaw = normalizeNumbers(paymentProgressValueInput?.value || '');
    let progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;

    let paymentHistory = [...ensurePayments()];

    if (Number.isFinite(progressValue) && progressValue > 0 && Number.isFinite(Number(finance.totalWithTax))) {
      const baseSnapshot = calculatePaymentProgress({
        totalAmount: finance.totalWithTax,
        paidAmount: editState.basePaidAmount || 0,
        paidPercent: editState.basePaidPercent || 0,
        history: paymentHistory,
      });

      const recordedAt = new Date().toISOString();

      if (progressType === 'percent') {
        const remainingPercent = Math.max(0, 100 - (baseSnapshot.paidPercent || 0));
        if (remainingPercent > PAYMENT_TOLERANCE) {
          const adjustedPercent = Math.min(progressValue, remainingPercent);
          const percentValue = Math.round(adjustedPercent * 100) / 100;
          const amountValue = finance.totalWithTax > 0
            ? Math.round(((percentValue / 100) * finance.totalWithTax) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'percent',
            amount: amountValue,
            percentage: percentValue,
            value: percentValue,
            note: null,
            recordedAt,
          }];
        }
      } else {
        const remainingAmount = Math.max(0, finance.totalWithTax - (baseSnapshot.paidAmount || 0));
        if (remainingAmount > PAYMENT_TOLERANCE) {
          const adjustedAmount = Math.min(progressValue, remainingAmount);
          const amountValue = Math.round(adjustedAmount * 100) / 100;
          const percentValue = finance.totalWithTax > 0
            ? Math.round(((amountValue / finance.totalWithTax) * 100) * 100) / 100
            : null;
          paymentHistory = [...paymentHistory, {
            type: 'amount',
            amount: amountValue,
            percentage: percentValue,
            value: amountValue,
            note: null,
            recordedAt,
          }];
        }
      }

      if (paymentHistory !== editState.payments) {
        editState.payments = paymentHistory;
        refreshPaymentUi();
      }

      if (paymentProgressValueInput) paymentProgressValueInput.value = '';
      if (paymentProgressTypeSelect) paymentProgressTypeSelect.value = 'percent';

      progressValue = null;
    }

    const paymentProgressCalc = calculatePaymentProgress({
      totalAmount: finance.totalWithTax,
      paidAmount: editState.basePaidAmount || 0,
      paidPercent: editState.basePaidPercent || 0,
      history: paymentHistory,
    });

    const manualStatusSelected = paymentStatusSelect?.dataset?.userSelected === 'true';
    const effectivePaymentStatus = determinePaymentStatus({
      manualStatus: manualStatusSelected ? normalizedPaymentStatus : project.paymentStatus || normalizedPaymentStatus,
      paidAmount: paymentProgressCalc.paidAmount,
      paidPercent: paymentProgressCalc.paidPercent,
      totalAmount: finance.totalWithTax,
    });
    const paymentStatusValue = manualStatusSelected ? normalizedPaymentStatus : effectivePaymentStatus;

    if (!manualStatusSelected && paymentStatusSelect) {
      paymentStatusSelect.value = paymentStatusValue;
    }
    if (paymentStatusSelect?.dataset) {
      delete paymentStatusSelect.dataset.userSelected;
    }

    editState.payments = paymentHistory;
    const confirmedNext = confirmStateInput?.value === 'true';

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: project.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax: computedApplyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      expenses: editState.expenses,
      servicesClientPrice,
      discount: discountValue,
      discountType: discountTypeValue,
      companyShareEnabled: contextShareEnabled && computedApplyTax,
      companySharePercent: contextShareEnabled && computedApplyTax ? companySharePercent : null,
      companyShareAmount: finance.companyShareAmount,
      taxAmount: finance.taxAmount,
      totalWithTax: finance.totalWithTax,
      confirmed: confirmedNext,
      technicians: Array.isArray(project.technicians) ? project.technicians : [],
      equipment: mapProjectEquipmentToApi(project),
      paidAmount: paymentProgressCalc.paidAmount,
      paidPercentage: paymentProgressCalc.paidPercent,
      paymentProgressType: paymentProgressCalc.paymentProgressType,
      paymentProgressValue: paymentProgressCalc.paymentProgressValue,
      payments: paymentHistory,
    });

    const wantCancel = cancelProjectCheckbox?.checked === true;
    let reopenedStatus = null;
    if (wantCancel) {
      payload.status = 'cancelled';
      payload.cancelled = true;
    } else if (wasCancelled) {
      reopenedStatus = determineProjectStatus({
        ...project,
        status: '',
        start: startIso,
        end: endIso || null
      });
      payload.status = reopenedStatus || 'upcoming';
      payload.cancelled = false;
    }

    form.dataset.submitting = 'true';

    try {
      const updated = await updateProjectApi(project.projectId ?? project.id, payload);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;
      if (!wantCancel) {
        try {
          if (wasCancelled) {
            await updateLinkedReservationsReopenFromCancelled(identifier, {
              status: reopenedStatus || updated?.status || project.status || 'upcoming',
              confirmed: confirmedNext
            });
          }
          const schedule = { start: startIso };
          if (endIso) schedule.end = endIso;
          await updateLinkedReservationsSchedule(identifier, schedule);
        } catch (e) { console.warn('⚠️ failed to sync linked reservations schedule', e); }
      }
      await handleProjectReservationSync(identifier, paymentStatusValue);
      if (wantCancel) {
        try { await updateLinkedReservationsCancelled(identifier); } catch (e) { console.warn('⚠️ failed to cancel linked reservations', e); }
      } else {
        try { await syncLinkedReservationsWithProject(updated); } catch (e) { console.warn('⚠️ failed to sync linked reservations with project state', e); }
      }
      state.projects = getProjectsState();
      state.reservations = getReservationsState();
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      renderProjects();
      renderFocusCards();
      updateSummary();
      _openProjectDetails?.(project.id);
    } catch (error) {
      console.error('❌ [projects/projectDetails/edit.js] Failed to update project', error);
      const message = isProjectApiError(error)
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
    }
  });
}

// ── buildProjectEditForm ──────────────────────────────────────────────────────

function buildProjectEditForm(project, editState = { clientName: '', clientCompany: '', expenses: [] }) {
  const { date: startDate, time: startTime } = splitDateTimeParts(project.start || '');
  const { date: endDate, time: endTime } = splitDateTimeParts(project.end || '');
  const applyTax = project.applyTax === true || project.applyTax === 'true';
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentStatusValue = ['paid', 'partial'].includes(paymentStatusRaw) ? paymentStatusRaw : 'unpaid';
  const discountType = project.discountType === 'amount' ? 'amount' : 'percent';
  const discountValue = normalizeNumbers(String(project.discount ?? project.discountValue ?? 0));
  const sharePercentRaw = project.companySharePercent
    ?? project.company_share_percent
    ?? project.companyShare
    ?? project.company_share
    ?? project.companyShareAmountPercent
    ?? DEFAULT_COMPANY_SHARE_PERCENT;
  const parsedSharePercent = Number.parseFloat(normalizeNumbers(String(sharePercentRaw)));
  const companySharePercent = Number.isFinite(parsedSharePercent) && parsedSharePercent > 0
    ? parsedSharePercent
    : DEFAULT_COMPANY_SHARE_PERCENT;
  const companyShareEnabled = project.companyShareEnabled === true
    || project.companyShareEnabled === 'true'
    || (project.company_share_enabled === true)
    || (project.company_share_enabled === 'true')
    || (applyTax && Number.isFinite(parsedSharePercent) && parsedSharePercent > 0);
  const paymentProgressType = 'percent';
  const paymentProgressValue = '';
  const isCancelled = (project?.cancelled === true || project?.cancelled === 'true')
    || String(project?.status || '').toLowerCase() === 'cancelled'
    || String(project?.status || '').toLowerCase() === 'canceled';
  const isConfirmed = project.confirmed === true || project.confirmed === 'true';

  return `
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-12 col-xl-8">
          <label class="form-label">${escapeHtml(t('projects.form.labels.title', 'عنوان المشروع'))}</label>
          <input type="text" class="form-control project-edit-input-wide" name="project-title" value="${escapeHtml(project.title || '')}" required>
        </div>
        <div class="col-12 col-sm-6 col-xl-4 d-flex flex-column">
          <label class="form-label">${escapeHtml(t('projects.form.labels.type', 'نوع المشروع'))}</label>
          <select class="form-select project-edit-select-lg" name="project-type" required>
            ${buildProjectTypeOptionsMarkup(project.type)}
          </select>
        </div>
        <div class="col-12">
          <div class="project-edit-inline-group project-edit-inline-group--dates">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startDate', 'تاريخ البدء'))}</label>
              <input type="date" class="form-control" name="project-start-date" value="${escapeHtml(startDate)}" required>
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endDate', 'تاريخ الانتهاء'))}</label>
              <input type="date" class="form-control" name="project-end-date" value="${escapeHtml(endDate)}">
            </div>
          </div>
          <div class="project-edit-inline-group project-edit-inline-group--times mt-2">
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.startTime', 'وقت البدء'))}</label>
              <input type="time" class="form-control" name="project-start-time" value="${escapeHtml(startTime)}">
            </div>
            <div class="project-edit-inline-field">
              <label class="form-label">${escapeHtml(t('projects.form.labels.endTime', 'وقت الانتهاء'))}</label>
              <input type="time" class="form-control" name="project-end-time" value="${escapeHtml(endTime)}">
            </div>
          </div>
        </div>
        <div class="col-12">
          <label class="form-label">${escapeHtml(t('projects.form.labels.description', 'الوصف'))}</label>
          <textarea class="form-control project-edit-textarea" name="project-description" rows="5">${escapeHtml(project.description || '')}</textarea>
        </div>
        <div class="col-12">
          <label class="form-label d-flex align-items-center gap-2">
            ${escapeHtml(t('projects.form.labels.confirmation', 'حالة التأكيد'))}
          </label>
          <div class="d-flex flex-wrap align-items-center gap-2">
            <input type="hidden" id="project-edit-confirmed" value="${isConfirmed ? 'true' : 'false'}">
            <span id="project-edit-confirm-label" class="badge ${isConfirmed ? 'bg-success' : 'bg-secondary'}">
              ${escapeHtml(isConfirmed ? t('projects.focus.confirmed', '✅ مشروع مؤكد') : t('projects.focus.pending', '⏳ غير مؤكد'))}
            </span>
            <button type="button" class="btn ${isConfirmed ? 'btn-outline-warning' : 'btn-success'}" id="project-edit-confirm-toggle" data-state="${isConfirmed ? 'confirmed' : 'pending'}">
              ${escapeHtml(isConfirmed ? t('projects.form.actions.unconfirm', '↩️ إلغاء التأكيد') : t('projects.focus.actions.confirm', '✔️ تأكيد المشروع'))}
            </button>
            <small id="project-edit-confirm-hint" class="text-muted">
              ${escapeHtml(isConfirmed ? t('projects.form.hints.unconfirm', 'اضغط لإلغاء التأكيد وإعادة الحجوزات إلى غير مؤكدة') : t('projects.form.hints.confirm', 'اضغط لتأكيد المشروع وجميع الحجوزات المرتبطة'))}
            </small>
          </div>
        </div>
        <div class="col-12">
          <div class="form-check mt-2">
            <input class="form-check-input" type="checkbox" id="project-cancelled" name="project-cancelled" ${isCancelled ? 'checked' : ''}>
            <label class="form-check-label" for="project-cancelled">${escapeHtml(t('projects.form.labels.cancelled', 'إلغاء المشروع'))}</label>
          </div>
          <div class="form-text">${escapeHtml(t('projects.form.hints.cancelled', 'سيتم وسم المشروع كملغي وتحديث حالة جميع الحجوزات المرتبطة إلى ملغي.'))}</div>
        </div>
      </div>

      <section class="project-edit-expenses mt-4">
        <h6 class="mb-2">${escapeHtml(t('projects.form.labels.expenseLabel', 'خدمات إنتاجية'))}</h6>
        <div class="project-edit-expense-form">
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-label" placeholder="${escapeHtml(t('projects.form.placeholders.expenseLabel', 'وصف المتطلب'))}">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-amount" placeholder="${escapeHtml(t('projects.form.placeholders.expenseAmount', 'المبلغ'))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-amount-col">
            <input type="text" class="form-control project-edit-input-xs" id="project-edit-expense-sale" placeholder="${escapeHtml(t('projects.form.placeholders.salePrice', 'سعر البيع'))}" inputmode="decimal">
          </div>
          <div class="project-edit-expense-label-col">
            <input type="text" class="form-control project-edit-input-wide" id="project-edit-expense-note" placeholder="${escapeHtml(t('projects.form.placeholders.expenseNote', 'تفاصيل إضافية'))}">
          </div>
          <div class="project-edit-expense-action-col">
            <button type="button" class="modal-action-btn modal-action-btn--warning project-edit-add-btn" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', '➕ إضافة خدمة'))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${buildProjectEditExpensesMarkup(editState.expenses)}
        </div>
      </section>

      <div class="row g-3 align-items-start mt-1">
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-discount">${escapeHtml(t('projects.form.labels.discount', 'الخصم'))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select project-edit-select-xs">
              <option value="percent" ${discountType === 'percent' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.percent', '٪ نسبة'))}</option>
              <option value="amount" ${discountType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.amount', '💵 مبلغ'))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control project-edit-input-xs" value="${escapeHtml(discountValue)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label d-block" for="project-edit-company-share">${escapeHtml(t('projects.form.labels.companyShare', 'نسبة الشركة والضريبة'))}</label>
          <div class="d-flex flex-column gap-2">
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-company-share" name="project-company-share" data-company-share="${escapeHtml(String(companySharePercent))}" ${companyShareEnabled ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-company-share">${escapeHtml(t('projects.form.companyShareToggle', 'إضافة نسبة الشركة (10٪)'))}</label>
            </div>
            <div class="form-check form-switch m-0">
              <input class="form-check-input" type="checkbox" role="switch" id="project-edit-tax" name="project-apply-tax" ${applyTax ? 'checked' : ''}>
              <label class="form-check-label" for="project-edit-tax">${escapeHtml(t('projects.form.taxLabel', 'شامل الضريبة (15٪)'))}</label>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-lg-4 col-xl-3">
          <label class="form-label" for="project-edit-payment-progress-value">${escapeHtml(t('projects.form.paymentProgress.label', '💰 الدفعة المستلمة'))}</label>
          <div class="input-group project-edit-input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select project-edit-select-xs">
              <option value="amount" ${paymentProgressType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.amount', '💵 مبلغ'))}</option>
              <option value="percent" ${paymentProgressType !== 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.percent', '٪ نسبة'))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control project-edit-input-xs" value="${escapeHtml(paymentProgressValue)}" placeholder="0" inputmode="decimal">
          </div>
          <button type="button" class="modal-action-btn modal-action-btn--ghost project-edit-add-btn mt-2" id="project-edit-payment-add">${escapeHtml(t('reservations.paymentHistory.actions.add', '➕ إضافة دفعة'))}</button>
        </div>
      </div>

      <section class="project-edit-payment-history mt-4">
        <div id="project-edit-payment-summary" class="project-details-grid mb-3"></div>
        <div class="reservation-payment-history-block">
          <div class="reservation-payment-history__header">
            <h6 class="reservation-payment-history__title">${escapeHtml(t('reservations.paymentHistory.title', 'سجل الدفعات'))}</h6>
          </div>
          <div id="project-edit-payment-history" class="reservation-payment-history"></div>
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-warning" id="project-edit-close-btn">${escapeHtml(t('projects.actions.close', '🔒 إغلاق المشروع'))}</button>
          <button type="button" class="btn btn-outline-secondary" id="project-edit-reopen-btn">${escapeHtml(t('projects.actions.reopen', '↩️ إلغاء الإغلاق'))}</button>
        </div>
        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">${escapeHtml(t('projects.form.buttons.update', 'تحديث المشروع'))}</button>
          <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${escapeHtml(t('actions.cancel', 'إلغاء'))}</button>
        </div>
      </div>
    </form>
  `;
}

