import { t } from '../language.js';
import { updatePreferences } from '../preferencesService.js';
import {
  buildProjectPayload,
  getProjectsState,
  isApiError as isProjectApiError,
  updateProjectApi
} from '../projectsService.js';
import { getReservationsState } from '../reservationsService.js';
import {
  calculateReservationTotal,
  DEFAULT_COMPANY_SHARE_PERCENT,
  calculatePaymentProgress,
  determinePaymentStatus,
} from '../reservationsSummary.js';
import { normalizeNumbers, showToast } from '../utils.js';
import { state, dom } from './state.js';
import {
  PROJECT_TAX_RATE,
  statusFallbackLabels
} from './constants.js';
import {
  escapeHtml,
  formatCurrency,
  formatDateTime
} from './formatting.js';
import {
  combineProjectDateTime,
  formatDateRange,
  setDateInputValue,
  setTimeInputValue,
  splitDateTimeParts
} from './helpers.js';
import {
  buildProjectReservationsSection,
  determineProjectStatus,
  getProjectExpenses,
  getReservationsForProject,
  renderFocusCards,
  renderProjects,
  resolveProjectTotals,
  updateSummary
} from './view.js';
import {
  mapProjectEquipmentToApi,
  calculateProjectFinancials,
  ensureProjectCompanyShareEnabled,
  getProjectCompanySharePercent,
} from './form.js';
import {
  handleProjectReservationSync,
  updateLinkedReservationsConfirmation
} from './actions.js';

export function openProjectDetails(projectId) {
  const project = state.projects.find((p) => String(p.id) === String(projectId));
  if (!project || !dom.detailsBody) return;

  dom.detailsBody.dataset.mode = 'view';
  dom.detailsBody.dataset.projectId = String(project.id);

  const client = state.customers.find((c) => String(c.id) === String(project.clientId));
  const typeLabel = getProjectTypeLabel(project.type);
  const descriptionRaw = project.description?.trim();
  const descriptionDisplay = descriptionRaw || t('projects.fallback.noDescription', 'لا يوجد وصف');
  const clientName = client?.customerName || t('projects.fallback.unknownClient', 'عميل غير معروف');
  const projectCompany = (project.clientCompany || client?.companyName || '').trim();
  const projectCodeValue = project.projectCode || `PRJ-${normalizeNumbers(String(project.id))}`;
  const projectCodeDisplay = normalizeNumbers(projectCodeValue);

  const reservationsForProject = getReservationsForProject(project.id);
  const reservationsTotalRaw = reservationsForProject.reduce(
    (sum, reservation) => sum + resolveReservationNetTotal(reservation),
    0
  );
  const reservationsTotal = Number(reservationsTotalRaw.toFixed(2));
  const reservationsCount = reservationsForProject.length;

  const { subtotal, taxAmount, applyTax, expensesTotal } = resolveProjectTotals(project);
  const projectTotal = subtotal;
  const combinedTaxAmount = applyTax
    ? Number(((projectTotal + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2))
    : 0;
  const overallTotal = Number((projectTotal + reservationsTotal + combinedTaxAmount).toFixed(2));

  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusFallbackLabels[status] || status);
  const statusChipClassMap = {
    upcoming: 'status-pending',
    ongoing: 'status-confirmed',
    completed: 'status-completed'
  };
  const statusChipClass = statusChipClassMap[status] || 'status-confirmed';
  const vatChipText = applyTax
    ? t('projects.details.chips.vatOn', 'شامل الضريبة 15٪')
    : t('projects.details.chips.vatOff', 'غير شامل الضريبة');
  const vatChipClass = applyTax ? 'status-paid' : 'status-unpaid';
  const reservationsChipText = t('projects.details.chips.reservations', '{count} حجوزات')
    .replace('{count}', normalizeNumbers(String(reservationsCount)));
  const paymentStatusRaw = typeof project.paymentStatus === 'string' ? project.paymentStatus.toLowerCase() : '';
  const paymentStatusValue = ['paid', 'partial'].includes(paymentStatusRaw) ? paymentStatusRaw : 'unpaid';
  const paymentStatusText = t(
    `projects.paymentStatus.${paymentStatusValue}`,
    paymentStatusValue === 'paid' ? 'Paid' : paymentStatusValue === 'partial' ? 'Partial' : 'Unpaid'
  );
  const paymentStatusChipClass = paymentStatusValue === 'paid'
    ? 'status-paid'
    : paymentStatusValue === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  const confirmedChipText = t('projects.focus.confirmed', '✅ مشروع مؤكد');
  const confirmedChipHtml = project.confirmed === true || project.confirmed === 'true'
    ? `<span class="reservation-chip status-confirmed">${escapeHtml(confirmedChipText)}</span>`
    : '';

  const summaryDetails = [
    {
      icon: '💳',
      label: t('projects.details.summary.paymentStatus', 'حالة الدفع'),
      value: paymentStatusText
    },
    {
      icon: '💼',
      label: t('projects.details.summary.projectSubtotal', 'إجمالي المشروع'),
      value: formatCurrency(projectTotal)
    },
    {
      icon: '🔗',
      label: t('projects.details.summary.reservationsTotal', 'إجمالي المعدات / طاقم العمل'),
      value: formatCurrency(reservationsTotal)
    },
    {
      icon: '🧮',
      label: t('projects.details.summary.combinedTax', 'إجمالي الضريبة الكلية (15٪)'),
      value: formatCurrency(combinedTaxAmount)
    },
    {
      icon: '💰',
      label: t('projects.details.summary.overallTotal', 'الإجمالي الكلي'),
      value: formatCurrency(overallTotal)
    }
  ];

  const summaryDetailsHtml = summaryDetails.map(({ icon, label, value }) => `
    <div class="summary-details-row">
      <span class="summary-details-label">${icon} ${escapeHtml(label)}</span>
      <span class="summary-details-value">${escapeHtml(value)}</span>
    </div>
  `).join('');

  const infoRows = [];
  infoRows.push({ icon: '🆔', label: t('projects.details.labels.code', 'رقم المشروع'), value: `#${projectCodeDisplay}` });
  infoRows.push({ icon: '👤', label: t('projects.details.client', 'العميل'), value: clientName });
  if (projectCompany) {
    infoRows.push({ icon: '🏢', label: t('projects.details.company', 'شركة العميل'), value: projectCompany });
  }
  infoRows.push({ icon: '🏷️', label: t('projects.details.type', 'نوع المشروع'), value: typeLabel });
  infoRows.push({ icon: '📅', label: t('projects.details.range', 'الفترة الزمنية'), value: formatDateRange(project.start, project.end) });

  const infoRowsHtml = infoRows.map(({ icon, label, value }) => `
    <div class="project-info-row">
      <span>${icon} ${escapeHtml(label)}</span>
      <span>${escapeHtml(value)}</span>
    </div>
  `).join('');

  const chips = [
    `<span class="reservation-chip ${statusChipClass}">${escapeHtml(statusLabel)}</span>`,
    `<span class="reservation-chip ${vatChipClass}">${escapeHtml(vatChipText)}</span>`,
    `<span class="reservation-chip status-info">${escapeHtml(reservationsChipText)}</span>`,
    `<span class="reservation-chip ${paymentStatusChipClass}">${escapeHtml(paymentStatusText)}</span>`,
    confirmedChipHtml
  ].filter(Boolean).join('');

  const expensesLabel = t('projects.details.expensesTotal', 'إجمالي المصاريف');
  const reservationsLabel = t('projects.details.reservationsTotal', 'إجمالي الحجوزات');

  dom.detailsBody.innerHTML = `
    <section class="project-details-primary">
      <header class="project-details-header">
        <div>
          <h4 class="project-details-title">${escapeHtml(project.title)}</h4>
          <div class="project-details-chips">${chips}</div>
        </div>
        <button type="button" class="btn btn-sm btn-outline-secondary" data-action="open-reservation" data-project-id="${project.id}">
          ${escapeHtml(t('projects.details.actions.viewReservations', '📋 إدارة الحجوزات'))}
        </button>
      </header>
      <div class="project-summary">
        <div class="project-summary-left">
          ${infoRowsHtml}
        </div>
        <div class="project-summary-right">
          <div class="project-summary-card">
            <h6>${escapeHtml(t('projects.details.summary.title', 'ملخص مالي'))}</h6>
            ${summaryDetailsHtml}
          </div>
        </div>
      </div>
    </section>
    <section class="project-details-section">
      <h5>${escapeHtml(t('projects.details.description', 'وصف المشروع'))}</h5>
      <p class="project-details-description">${escapeHtml(descriptionDisplay)}</p>
    </section>
    <section class="project-details-section">
      <h5>${escapeHtml(t('projects.details.financialBreakdown', 'تفاصيل مالية'))}</h5>
      <div class="project-details-grid">
        <div class="project-details-grid-item">
          <span>${escapeHtml(expensesLabel)}</span>
          <strong>${formatCurrency(expensesTotal)}</strong>
        </div>
        <div class="project-details-grid-item">
          <span>${escapeHtml(reservationsLabel)}</span>
          <strong>${formatCurrency(reservationsTotal)}</strong>
        </div>
      </div>
    </section>
    ${buildProjectReservationsSection(project)}
  `;

  bindProjectDetailsEvents(project);

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    const modal = window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl);
    modal.show();
  }
}

export function bindFocusCards({ onOpenProject }) {
  if (!dom.focusCards || dom.focusCards.dataset.listenerAttached === 'true') return;

  dom.focusCards.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-action]');
    if (actionButton) {
      const { action, id } = actionButton.dataset;
      if (action === 'confirm-project') {
        event.preventDefault();
        event.stopPropagation();
        confirmProject(id);
        return;
      }
      if (action === 'view') {
        onOpenProject?.(id);
      } else if (action === 'highlight') {
        focusProjectRow(id);
      }
      return;
    }

    const card = event.target.closest('.project-focus-card');
    if (card?.dataset.projectId) {
      onOpenProject?.(card.dataset.projectId);
    }
  });

  dom.focusCards.dataset.listenerAttached = 'true';
}

export function focusProjectRow(projectId) {
  if (!dom.projectsTableBody) return;
  const selector = `tr[data-project-id="${CSS.escape(String(projectId))}"]`;
  const row = dom.projectsTableBody.querySelector(selector);
  if (!row) {
    showToast(t('projects.focus.toastNotFound', '⚠️ تعذّر العثور على المشروع في القائمة'));
    return;
  }

  row.classList.add('project-row-highlight');
  row.scrollIntoView({ behavior: 'smooth', block: 'center' });
  window.setTimeout(() => {
    row.classList.remove('project-row-highlight');
  }, 2200);
}

export function bindProjectDetailsEvents(project) {
  if (!dom.detailsBody) return;
  const createBtn = dom.detailsBody.querySelector('[data-action="create-reservation"]');
  const editBtn = dom.detailsBody.querySelector('[data-action="edit-project"]');
  const reservationContainer = dom.detailsBody.querySelector('.project-reservations-list');

  if (createBtn && project) {
    createBtn.addEventListener('click', (event) => {
      event.preventDefault();
      startReservationForProject(project);
    });
  }

  if (editBtn && project) {
    editBtn.addEventListener('click', (event) => {
      event.preventDefault();
      startProjectEdit(project);
    });
  }

  if (reservationContainer) {
    reservationContainer.addEventListener('click', (event) => {
      const actionButton = event.target.closest('[data-action="view-reservation"]');
      if (!actionButton) return;
      const index = Number.parseInt(actionButton.dataset.index || '-1', 10);
      if (!Number.isInteger(index) || index < 0) return;
      if (typeof window.showReservationDetails === 'function') {
        window.showReservationDetails(index);
      } else {
        window.location.href = 'dashboard.html#reservations';
      }
    });
  }
}

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
        amount: Number(expense?.amount) || 0
      }))
    : [];

  const editState = {
    clientName,
    clientCompany,
    expenses: normalizedExpenses
  };

  dom.detailsBody.dataset.mode = 'edit';
  dom.detailsBody.innerHTML = buildProjectEditForm(resolved, editState);
  bindProjectEditForm(resolved, editState);
}

function bindProjectEditForm(project, editState = { expenses: [] }) {
  const form = dom.detailsBody?.querySelector('#project-details-edit-form');
  if (!form) return;

  const cancelBtn = form.querySelector('[data-action="cancel-edit"]');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      event.preventDefault();
      openProjectDetails(project.id);
    });
  }

  const expenseLabelInput = form.querySelector('#project-edit-expense-label');
  const expenseAmountInput = form.querySelector('#project-edit-expense-amount');
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

  let isSyncingShareTax = false;

  const syncShareAndTax = (source) => {
    if (!taxCheckbox || !shareCheckbox) return;
    if (isSyncingShareTax) return;
    isSyncingShareTax = true;

    if (source === 'share') {
      if (shareCheckbox.checked) {
        if (!taxCheckbox.checked) {
          taxCheckbox.checked = true;
        }
        ensureProjectCompanyShareEnabled(shareCheckbox);
      } else {
        if (taxCheckbox.checked) {
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

    isSyncingShareTax = false;
  };

  function renderExpenses() {
    if (!expensesContainer) return;
    expensesContainer.innerHTML = buildProjectEditExpensesMarkup(editState.expenses);
  }

  renderExpenses();

  if (discountInput && !discountInput.dataset.listenerAttached) {
    discountInput.addEventListener('input', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement)) return;
      input.value = normalizeNumbers(input.value || '');
    });
    discountInput.dataset.listenerAttached = 'true';
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

  if (shareCheckbox && !shareCheckbox.dataset.listenerAttached) {
    shareCheckbox.addEventListener('change', () => syncShareAndTax('share'));
    shareCheckbox.dataset.listenerAttached = 'true';
  }

  if (taxCheckbox && !taxCheckbox.dataset.listenerAttached) {
    taxCheckbox.addEventListener('change', () => syncShareAndTax('tax'));
    taxCheckbox.dataset.listenerAttached = 'true';
  }

  if (shareCheckbox?.checked) {
    ensureProjectCompanyShareEnabled(shareCheckbox);
  }

  syncShareAndTax(shareCheckbox?.checked ? 'share' : 'tax');

  if (addExpenseBtn) {
    addExpenseBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const label = expenseLabelInput?.value.trim() || '';
      const normalizedAmount = normalizeNumbers(expenseAmountInput?.value || '0');
      const amount = Number(normalizedAmount);

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
        amount
      });

      if (expenseLabelInput) expenseLabelInput.value = '';
      if (expenseAmountInput) expenseAmountInput.value = '';
      renderExpenses();
    });
  }

  if (expensesContainer) {
    expensesContainer.addEventListener('click', (event) => {
      const removeBtn = event.target.closest('[data-action="remove-expense"]');
      if (!removeBtn) return;
      const { id } = removeBtn.dataset;
      editState.expenses = editState.expenses.filter((expense) => String(expense.id) !== String(id));
      renderExpenses();
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.dataset.submitting === 'true') return;

    const titleInput = form.querySelector('[name="project-title"]');
    const typeSelect = form.querySelector('[name="project-type"]');
    const descriptionInput = form.querySelector('[name="project-description"]');

    const title = titleInput?.value.trim() || '';
    const projectType = typeSelect?.value || '';
    const startDateValue = startDateInput?.value.trim() || '';
    const startTimeValue = startTimeInput?.value.trim() || '';
    const descriptionValue = descriptionInput?.value.trim() || '';
    const selectedPaymentStatus = (paymentStatusSelect?.value || 'unpaid').toLowerCase();
    const normalizedPaymentStatus = ['paid', 'partial'].includes(selectedPaymentStatus)
      ? selectedPaymentStatus
      : 'unpaid';
    const applyTax = taxCheckbox?.checked === true;

    if (!title || !projectType || !startDateValue) {
      showToast(t('projects.toast.missingRequiredFields', '⚠️ يرجى تعبئة البيانات المطلوبة'));
      titleInput?.focus();
      return;
    }

    const endDateValue = endDateInput?.value.trim() || '';
    const endTimeValue = endTimeInput?.value.trim() || '';

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

    const equipmentEstimate = Number(project.equipmentEstimate) || 0;
    const expensesTotal = editState.expenses.reduce((sum, expense) => sum + (Number(expense.amount) || 0), 0);
    const discountTypeValue = discountTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const discountRaw = normalizeNumbers(discountInput?.value || '0');
    let discountValue = Number.parseFloat(discountRaw);
    if (!Number.isFinite(discountValue) || discountValue < 0) {
      discountValue = 0;
    }

    const companyShareEnabled = shareCheckbox?.checked === true;
    let companySharePercent = companyShareEnabled ? getProjectCompanySharePercent(shareCheckbox) : null;
    if (!Number.isFinite(companySharePercent) || companySharePercent <= 0) {
      companySharePercent = companyShareEnabled ? DEFAULT_COMPANY_SHARE_PERCENT : null;
    }

    const finance = calculateProjectFinancials({
      equipmentEstimate,
      expensesTotal,
      discountValue,
      discountType: discountTypeValue,
      applyTax,
      companyShareEnabled,
      companySharePercent,
    });

    const progressType = paymentProgressTypeSelect?.value === 'amount' ? 'amount' : 'percent';
    const progressRaw = normalizeNumbers(paymentProgressValueInput?.value || '');
    const progressValue = progressRaw ? Number.parseFloat(progressRaw) : null;
    const paymentProgress = calculatePaymentProgress({
      totalAmount: finance.totalWithTax,
      progressType,
      progressValue,
      history: [],
    });

    const manualStatusSelected = paymentStatusSelect?.dataset?.userSelected === 'true';
    const effectivePaymentStatus = determinePaymentStatus({
      manualStatus: manualStatusSelected ? normalizedPaymentStatus : null,
      paidAmount: paymentProgress.paidAmount,
      paidPercent: paymentProgress.paidPercent,
      totalAmount: finance.totalWithTax,
    });
    const paymentStatusValue = manualStatusSelected ? normalizedPaymentStatus : effectivePaymentStatus;

    if (!manualStatusSelected && paymentStatusSelect) {
      paymentStatusSelect.value = paymentStatusValue;
    }
    if (paymentStatusSelect?.dataset) {
      delete paymentStatusSelect.dataset.userSelected;
    }

    const payload = buildProjectPayload({
      projectCode: project.projectCode,
      title,
      type: projectType,
      clientId: project.clientId,
      clientCompany: project.clientCompany,
      description: descriptionValue,
      start: startIso,
      end: endIso || null,
      applyTax,
      paymentStatus: paymentStatusValue,
      equipmentEstimate,
      expenses: editState.expenses,
      discount: discountValue,
      discountType: discountTypeValue,
      companyShareEnabled: companyShareEnabled && applyTax,
      companySharePercent: companyShareEnabled && applyTax ? companySharePercent : null,
      companyShareAmount: finance.companyShareAmount,
      taxAmount: finance.taxAmount,
      totalWithTax: finance.totalWithTax,
      confirmed: project.confirmed,
      technicians: Array.isArray(project.technicians) ? project.technicians : [],
      equipment: mapProjectEquipmentToApi(project),
      paidAmount: paymentProgress.paidAmount,
      paidPercentage: paymentProgress.paidPercent,
      paymentProgressType: paymentProgress.paymentProgressType,
      paymentProgressValue: paymentProgress.paymentProgressValue,
    });

    form.dataset.submitting = 'true';

    try {
      const updated = await updateProjectApi(project.projectId ?? project.id, payload);
      const identifier = updated?.projectId ?? updated?.id ?? project.id;
      await handleProjectReservationSync(identifier, paymentStatusValue);
      state.projects = getProjectsState();
      state.reservations = getReservationsState();
      showToast(t('projects.toast.updated', '✅ تم تحديث المشروع بنجاح'));
      renderProjects();
      renderFocusCards();
      updateSummary();
      openProjectDetails(project.id);
    } catch (error) {
      console.error('❌ [projects] Failed to update project from details view', error);
      const message = isProjectApiError(error)
        ? error.message
        : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
      showToast(message, 'error');
    } finally {
      delete form.dataset.submitting;
    }
  });
}

function startReservationForProject(project) {
  if (!project) return;
  const context = {
    projectId: project.id,
    customerId: project.clientId || null,
    start: project.start || null,
    end: project.end || null,
    forceNotes: Boolean(project.description)
  };
  updatePreferences({
    dashboardTab: 'reservations-tab',
    dashboardSubTab: 'create-tab'
  }).catch((error) => {
    console.warn('⚠️ [projects] Failed to persist dashboard tab preference', error);
  });

  let encodedContext = '';
  try {
    encodedContext = encodeURIComponent(JSON.stringify(context));
  } catch (error) {
    console.warn('⚠️ [projects] Unable to encode reservation context', error);
  }

  if (dom.detailsModalEl && window.bootstrap?.Modal) {
    window.bootstrap.Modal.getOrCreateInstance(dom.detailsModalEl)?.hide();
  }

  const search = encodedContext ? `?reservationProjectContext=${encodedContext}` : '';
  window.location.href = `dashboard.html${search}#reservations`;
}

async function confirmProject(projectId) {
  if (!projectId) return;
  const project = state.projects.find((entry) => String(entry.id) === String(projectId));
  if (!project) {
    showToast(t('projects.toast.editMissing', '⚠️ تعذّر العثور على المشروع المطلوب تعديله'));
    return;
  }

  if (project.confirmed === true || project.confirmed === 'true') {
    showToast(t('projects.toast.alreadyConfirmed', 'ℹ️ المشروع مؤكّد مسبقًا'));
    return;
  }

  try {
    await updateProjectApi(project.projectId ?? project.id, { confirmed: true });
    const reservationsConfirmed = await updateLinkedReservationsConfirmation(projectId);

    state.projects = getProjectsState();
    state.reservations = getReservationsState();

    renderProjects();
    renderFocusCards();
    updateSummary();

    const isModalOpen = dom.detailsModalEl && dom.detailsModalEl.classList.contains('show');
    if (isModalOpen && dom.detailsBody?.dataset.projectId === String(projectId)) {
      openProjectDetails(projectId);
    }

    document.dispatchEvent(new CustomEvent('projects:changed'));
    if (reservationsConfirmed) {
      document.dispatchEvent(new CustomEvent('reservations:changed'));
    }

    showToast(t('projects.toast.confirmed', '✅ تم تأكيد المشروع'));
  } catch (error) {
    console.error('❌ [projects] confirmProject failed', error);
    const message = isProjectApiError(error)
      ? error.message
      : t('projects.toast.updateFailed', 'تعذر تحديث المشروع، حاول مرة أخرى');
    showToast(message, 'error');
  }
}

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
  const paymentProgressType = project.paymentProgressType === 'amount' ? 'amount'
    : project.paymentProgressType === 'percent' ? 'percent'
    : project.payment_progress_type === 'amount' ? 'amount'
    : project.payment_progress_type === 'percent' ? 'percent'
    : 'percent';
  const paymentProgressValue = normalizeNumbers(
    String(
      project.paymentProgressValue
      ?? project.payment_progress_value
      ?? (paymentProgressType === 'amount' ? project.paidAmount ?? project.paid_amount : project.paidPercent ?? project.paid_percent)
      ?? ''
    )
  );

  return `
    <form id="project-details-edit-form" class="project-edit-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.title', 'عنوان المشروع'))}</label>
          <input type="text" class="form-control" name="project-title" value="${escapeHtml(project.title || '')}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.type', 'نوع المشروع'))}</label>
          <select class="form-select" name="project-type" required>
            ${buildProjectTypeOptionsMarkup(project.type)}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.startDate', 'تاريخ البدء'))}</label>
          <input type="date" class="form-control" name="project-start-date" value="${escapeHtml(startDate)}" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.startTime', 'وقت البدء'))}</label>
          <input type="time" class="form-control" name="project-start-time" value="${escapeHtml(startTime)}">
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.endDate', 'تاريخ الانتهاء'))}</label>
          <input type="date" class="form-control" name="project-end-date" value="${escapeHtml(endDate)}">
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.endTime', 'وقت الانتهاء'))}</label>
          <input type="time" class="form-control" name="project-end-time" value="${escapeHtml(endTime)}">
        </div>
        <div class="col-12">
          <label class="form-label">${escapeHtml(t('projects.form.labels.description', 'الوصف'))}</label>
          <textarea class="form-control" name="project-description" rows="3">${escapeHtml(project.description || '')}</textarea>
        </div>
        <div class="col-md-6">
          <label class="form-label">${escapeHtml(t('projects.form.labels.paymentStatus', 'حالة الدفع'))}</label>
          <select class="form-select" name="project-payment-status" id="project-edit-payment-status">
            <option value="unpaid" ${paymentStatusValue === 'unpaid' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.unpaid', 'غير مدفوع'))}</option>
            <option value="partial" ${paymentStatusValue === 'partial' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.partial', 'مدفوع جزئياً'))}</option>
            <option value="paid" ${paymentStatusValue === 'paid' ? 'selected' : ''}>${escapeHtml(t('projects.paymentStatus.paid', 'مدفوع'))}</option>
          </select>
        </div>
      </div>

      <div class="row g-3 align-items-start mt-3">
        <div class="col-md-4">
          <label class="form-label" for="project-edit-discount">${escapeHtml(t('projects.form.labels.discount', 'الخصم'))}</label>
          <div class="input-group">
            <select id="project-edit-discount-type" name="project-discount-type" class="form-select">
              <option value="percent" ${discountType === 'percent' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.percent', '٪ نسبة'))}</option>
              <option value="amount" ${discountType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.discount.amount', '💵 مبلغ'))}</option>
            </select>
            <input type="text" id="project-edit-discount" name="project-discount" class="form-control" value="${escapeHtml(discountValue)}" placeholder="0" inputmode="decimal">
          </div>
        </div>
        <div class="col-md-4">
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
        <div class="col-md-4">
          <label class="form-label" for="project-edit-payment-progress-value">${escapeHtml(t('projects.form.paymentProgress.label', '💰 الدفعة المستلمة'))}</label>
          <div class="input-group">
            <select id="project-edit-payment-progress-type" name="project-payment-progress-type" class="form-select">
              <option value="amount" ${paymentProgressType === 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.amount', '💵 مبلغ'))}</option>
              <option value="percent" ${paymentProgressType !== 'amount' ? 'selected' : ''}>${escapeHtml(t('projects.form.paymentProgress.percent', '٪ نسبة'))}</option>
            </select>
            <input type="text" id="project-edit-payment-progress-value" name="project-payment-progress-value" class="form-control" value="${escapeHtml(paymentProgressValue)}" placeholder="0" inputmode="decimal">
          </div>
          <small class="text-muted" data-i18n-key="projects.form.paymentProgress.hint">${escapeHtml(t('projects.form.paymentProgress.hint', 'أدخل المبلغ أو النسبة التي تم استلامها من قيمة المشروع'))}</small>
        </div>
      </div>

      <section class="project-edit-expenses mt-4">
        <h6>${escapeHtml(t('projects.form.labels.expenses', 'المصاريف'))}</h6>
        <div class="project-edit-expense-form row g-2 align-items-center">
          <div class="col-md-6">
            <input type="text" class="form-control" id="project-edit-expense-label" placeholder="${escapeHtml(t('projects.form.placeholders.expenseLabel', 'وصف المصروف'))}">
          </div>
          <div class="col-md-4">
            <input type="number" class="form-control" id="project-edit-expense-amount" placeholder="${escapeHtml(t('projects.form.placeholders.expenseAmount', 'المبلغ'))}" min="0">
          </div>
          <div class="col-md-2">
            <button class="btn btn-secondary w-100" data-action="add-expense">${escapeHtml(t('projects.form.buttons.addExpense', 'إضافة'))}</button>
          </div>
        </div>
        <div id="project-edit-expense-list" class="project-edit-expense-list mt-3">
          ${buildProjectEditExpensesMarkup(editState.expenses)}
        </div>
      </section>

      <div class="project-edit-actions mt-4 d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">${escapeHtml(t('projects.form.buttons.update', 'تحديث المشروع'))}</button>
        <button type="button" class="btn btn-outline-secondary" data-action="cancel-edit">${escapeHtml(t('actions.cancel', 'إلغاء'))}</button>
      </div>
    </form>
  `;
}

function buildProjectTypeOptionsMarkup(selectedType) {
  const typeOptions = ['commercial', 'coverage', 'photography', 'social'];
  return typeOptions
    .map((type) => {
      const label = getProjectTypeLabel(type);
      const selectedAttr = type === selectedType ? 'selected' : '';
      return `<option value="${escapeHtml(type)}" ${selectedAttr}>${escapeHtml(label)}</option>`;
    })
    .join('');
}

function buildProjectEditExpensesMarkup(expenses = []) {
  if (!Array.isArray(expenses) || expenses.length === 0) {
    const emptyText = escapeHtml(t('projects.selected.emptyExpenses', 'لم يتم تسجيل أي مصروف'));
    return `<div class="text-muted small" data-empty>${emptyText}</div>`;
  }

  const removeLabel = escapeHtml(t('actions.remove', 'إزالة'));
  return expenses
    .map((expense) => {
      const label = escapeHtml(expense?.label || '');
      const amount = escapeHtml(formatCurrency(expense?.amount || 0));
      const id = escapeHtml(String(expense?.id || ''));
      return `
        <div class="project-edit-expense-item d-flex align-items-center justify-content-between gap-3 border rounded px-3 py-2 mb-2">
          <div>
            <div class="fw-semibold">${label}</div>
            <div class="text-muted small">${amount}</div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-danger" data-action="remove-expense" data-id="${id}" aria-label="${removeLabel}">✖</button>
        </div>
      `;
    })
    .join('');
}

function getProjectTypeLabel(type) {
  if (!type) return t('projects.form.types.unknown', 'نوع غير محدد');
  const key = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social'
  }[type] || 'projects.form.types.unknown';
  return t(key, type);
}

function resolveReservationNetTotal(reservation) {
  if (!reservation) return 0;
  const items = Array.isArray(reservation.items) ? reservation.items : [];
  const discountRaw = reservation.discount ?? 0;
  const discountValue = Number(normalizeNumbers(String(discountRaw))) || 0;
  const discountType = reservation.discountType || 'percent';
  const technicianIds = Array.isArray(reservation.technicians) ? reservation.technicians : [];
  const calculated = calculateReservationTotal(
    items,
    discountValue,
    discountType,
    false,
    technicianIds,
    { start: reservation.start, end: reservation.end }
  );

  if (Number.isFinite(calculated)) {
    return calculated;
  }

  const storedCost = Number(normalizeNumbers(String(reservation.cost ?? 0)));
  return Number.isFinite(storedCost) ? Math.round(storedCost) : 0;
}
