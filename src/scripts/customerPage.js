import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { loadData, saveData, migrateOldData } from './storage.js';
import { renderCustomerReservations, renderCustomerProjects } from './customerDetails.js';
import { setReservationsUIHandlers } from './reservations/uiBridge.js';
import { showToast, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { apiRequest, ApiError } from './apiClient.js';
import { mapReservationFromApi } from './reservationsService.js';
import { mapProjectFromApi } from './projectsService.js';
import { mapTechnicianFromApi } from './techniciansService.js';
import { initDashboardShell } from './dashboardShell.js';
import { formatCurrencyLocalized } from './projectsCommon.js';
import { resolveProjectTotals, resolveReservationNetTotal, PROJECT_TAX_RATE } from './projectFocusTemplates.js';
import { calculatePaymentProgress } from './reservationsSummary.js';

applyStoredTheme();
checkAuth();
initThemeToggle();
initDashboardShell();
migrateOldData();

const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
  logoutBtn.addEventListener('click', () => logout());
  logoutBtn.dataset.listenerAttached = 'true';
}

// تعيين معالج كسول لتفاصيل الحجز لتجنّب سحب وحدة الحجوزات في التحميل الأولي
setReservationsUIHandlers({
  showReservationDetails(index) {
    import('./reservationsUI.js')
      .then((m) => {
        try { m.showReservationDetails?.(index); } catch (e) { console.error('❌ showReservationDetails failed', e); }
      })
      .catch((e) => console.error('❌ Failed to load reservations UI module', e));
  }
});

const params = new URLSearchParams(window.location.search);
const customerId = params.get('id');
const container = document.getElementById('customer-details');
const heroNameEl = document.getElementById('customer-hero-name');
const heroPhoneEl = document.getElementById('customer-hero-phone');
const heroCompanyEl = document.getElementById('customer-hero-company');
const heroEmailEl = document.getElementById('customer-hero-email');
const heroTaxEl = document.getElementById('customer-hero-tax');
const heroSummaryEl = document.getElementById('customer-hero-summary');
const heroPanelNameEl = document.getElementById('dashboard-greeting-customer-name');
const heroPanelCompanyEl = document.getElementById('dashboard-greeting-customer-company');
const heroStatProjectsEl = document.getElementById('customer-stat-projects');
const heroStatProjectsDescEl = document.getElementById('customer-stat-projects-desc');
const heroStatPaymentEl = document.getElementById('customer-stat-payment');
const heroStatPaymentDescEl = document.getElementById('customer-stat-payment-desc');
const heroStatUpcomingEl = document.getElementById('customer-stat-upcoming');
const heroStatUpcomingDescEl = document.getElementById('customer-stat-upcoming-desc');
const heroStatActivityEl = document.getElementById('customer-stat-activity');
const heroStatActivityDescEl = document.getElementById('customer-stat-activity-desc');
const heroStatComplianceEl = document.getElementById('customer-stat-compliance');
const heroStatComplianceDescEl = document.getElementById('customer-stat-compliance-desc');
const sidebarProjectsEl = document.getElementById('sidebar-stat-projects');
const sidebarReservationsEl = document.getElementById('sidebar-stat-reservations');
const sidebarEquipmentEl = document.getElementById('sidebar-stat-equipment');
const sidebarTechniciansEl = document.getElementById('sidebar-stat-technicians');
const editButtons = [
  document.getElementById('customer-edit-btn'),
  document.getElementById('customer-edit-btn-secondary')
].filter(Boolean);
const customerTabButtons = Array.from(document.querySelectorAll('[data-customer-tab]'));
const customerTabPanels = new Map(
  Array.from(document.querySelectorAll('[data-customer-tab-panel]')).map((panel) => [panel.getAttribute('data-customer-tab-panel'), panel])
);

const editDocumentFileInput = document.getElementById('edit-document-file');
const editDocumentPreviewBtn = document.getElementById('edit-document-preview');
const editDocumentNameHint = document.getElementById('edit-document-file-name');
const editDocumentUrlInput = document.getElementById('edit-document-url');
const editDocumentNameInput = document.getElementById('edit-document-name');

let editDocumentState = null;
let editDocumentUploadStatus = 'idle';
let editExistingDocument = null;

editButtons.forEach((button) => {
  button.disabled = true;
});

let currentCustomer = null;
let isCustomerLoading = false;
let customerLoadError = '';
let activeCustomerTab = 'reservations';

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

function resetEditDocumentState(documentInfo = null) {
  editExistingDocument = documentInfo && typeof documentInfo === 'object' ? { ...documentInfo } : null;
  editDocumentState = null;
  editDocumentUploadStatus = 'idle';
  if (editDocumentFileInput) {
    editDocumentFileInput.value = '';
  }
  updateEditDocumentUI();
}

function updateEditDocumentUI() {
  if (!editDocumentNameHint || !editDocumentPreviewBtn) return;

  const uploading = editDocumentUploadStatus === 'uploading';
  const hasNewDocument = Boolean(editDocumentState?.dataUrl);

  let labelText = t('customers.form.document.empty', 'لم يتم اختيار ملف بعد');

  if (uploading) {
    labelText = t('customers.form.document.uploading', '📤 جارٍ رفع الملف...');
  } else if (editDocumentUploadStatus === 'error') {
    labelText = t('customers.form.document.uploadFailed', '⚠️ فشل رفع الملف');
  } else if (hasNewDocument) {
    labelText = editDocumentState?.fileName || t('customers.form.document.selected', 'تم إرفاق ملف.');
  } else if (editExistingDocument && (editExistingDocument.fileName || editExistingDocument.url)) {
    labelText = editExistingDocument.fileName || editExistingDocument.url;
  }

  editDocumentNameHint.textContent = labelText;

  const hasPreview = hasNewDocument || Boolean(editExistingDocument?.url);
  editDocumentPreviewBtn.disabled = uploading || !hasPreview;
}

function handleEditDocumentFileChange() {
  if (!editDocumentFileInput) return;
  const [file] = editDocumentFileInput.files || [];

  if (!file) {
    editDocumentUploadStatus = 'idle';
    editDocumentState = null;
    updateEditDocumentUI();
    return;
  }

  editDocumentUploadStatus = 'uploading';
  updateEditDocumentUI();

  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result !== 'string') {
      editDocumentUploadStatus = 'error';
      editDocumentState = null;
      updateEditDocumentUI();
      return;
    }

    editDocumentState = {
      dataUrl: reader.result,
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
    };

    if (editDocumentUrlInput) {
      editDocumentUrlInput.value = reader.result;
    }
    if (editDocumentNameInput) {
      editDocumentNameInput.value = file.name;
    }

    editDocumentUploadStatus = 'success';
    updateEditDocumentUI();
  };

  reader.onerror = () => {
    editDocumentUploadStatus = 'error';
    editDocumentState = null;
    updateEditDocumentUI();
  };

  reader.readAsDataURL(file);
}

if (editDocumentFileInput && !editDocumentFileInput.dataset.listenerAttached) {
  editDocumentFileInput.addEventListener('change', handleEditDocumentFileChange);
  editDocumentFileInput.dataset.listenerAttached = 'true';
}

if (editDocumentPreviewBtn && !editDocumentPreviewBtn.dataset.listenerAttached) {
  editDocumentPreviewBtn.addEventListener('click', () => {
    if (editDocumentUploadStatus === 'uploading') {
      return;
    }
    const url = editDocumentState?.dataUrl || editExistingDocument?.url;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  });
  editDocumentPreviewBtn.dataset.listenerAttached = 'true';
}

function updateHeroBadge(element, icon, value, { hideWhenEmpty = false } = {}) {
  if (!element) return;
  const stringValue = value == null ? '' : String(value).trim();
  const hasValue = stringValue.length > 0;
  const displayValue = hasValue ? stringValue : t('common.placeholder.empty', '—');
  element.textContent = `${icon} ${displayValue}`;
  if (hideWhenEmpty) {
    element.classList.toggle('hidden', !hasValue);
  } else {
    element.classList.remove('hidden');
  }
}

function setHeroData(customer) {
  const fallbackSummary = t('customerDetails.pageTitle', 'معلومات العميل');
  const emptyDash = t('common.placeholder.empty', '—');
  const displayName = customer?.customerName || emptyDash;
  const phoneValue = customer?.phone ? normalizeNumbers(customer.phone) : '';
  const companyValue = customer?.companyName || '';
  const emailValue = customer?.email || '';
  const taxValue = customer?.tax_id ?? customer?.taxId ?? '';

  if (heroNameEl) {
    heroNameEl.textContent = displayName;
  }
  if (heroSummaryEl) {
    heroSummaryEl.textContent = displayName !== emptyDash ? displayName : fallbackSummary;
  }

  updateHeroBadge(heroPhoneEl, '📞', phoneValue, { hideWhenEmpty: false });
  updateHeroBadge(heroCompanyEl, '🏢', companyValue, { hideWhenEmpty: true });
  updateHeroBadge(heroEmailEl, '📧', emailValue, { hideWhenEmpty: true });
  updateHeroBadge(heroTaxEl, '🧾', taxValue, { hideWhenEmpty: true });

  if (heroPanelNameEl) {
    heroPanelNameEl.textContent = displayName;
  }
  if (heroPanelCompanyEl) {
    const infoParts = [];
    if (companyValue) infoParts.push(companyValue);
    if (phoneValue) infoParts.push(`📞 ${phoneValue}`);
    const trimmedTax = typeof taxValue === 'string' ? taxValue.trim() : String(taxValue || '').trim();
    if (trimmedTax) infoParts.push(`🧾 ${trimmedTax}`);
    heroPanelCompanyEl.textContent = infoParts.length ? infoParts.join(' • ') : '—';
  }
}

function handleEditCustomerClick(event) {
  event?.preventDefault?.();
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
}

function attachEditButtons() {
  editButtons.forEach((button) => {
    if (!button || button.dataset.listenerAttached) return;
    button.addEventListener('click', handleEditCustomerClick);
    button.dataset.listenerAttached = 'true';
  });
}

function setEditButtonsDisabled(isDisabled) {
  editButtons.forEach((button) => {
    if (!button) return;
    button.disabled = Boolean(isDisabled);
  });
}

attachEditButtons();

function setActiveCustomerTab(tab) {
  if (!tab) return;
  activeCustomerTab = tab;
  customerTabButtons.forEach((button) => {
    const isActive = button?.getAttribute('data-customer-tab') === tab;
    if (!button) return;
    button.classList.toggle('tab-active', isActive);
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
  customerTabPanels.forEach((panel, key) => {
    if (!panel) return;
    panel.classList.toggle('hidden', key !== tab);
  });

  if (tab === 'projects' && customerId && currentCustomer) {
    renderCustomerProjects(customerId);
  }
}

function initCustomerTabs() {
  if (!customerTabButtons.length) {
    return;
  }
  customerTabButtons.forEach((button) => {
    if (!button || button.dataset.listenerAttached) return;
    button.addEventListener('click', () => {
      const tab = button.getAttribute('data-customer-tab');
      if (!tab) return;
      setActiveCustomerTab(tab);
    });
    button.dataset.listenerAttached = 'true';
  });
  setActiveCustomerTab(activeCustomerTab);
}

initCustomerTabs();

function normalizeCustomerDocument(rawCustomer = {}) {
  if (!rawCustomer || typeof rawCustomer !== 'object') {
    return null;
  }

  const documentCandidate = [rawCustomer.document, rawCustomer.attachment, rawCustomer.file]
    .find((value) => value && typeof value === 'object');

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

  const directUrl = pickFirstString(urlCandidates);
  const fileName = pickFirstString(nameCandidates);
  const mimeType = pickFirstString(mimeCandidates) || 'application/octet-stream';
  const pathValue = pickFirstString(pathCandidates);
  const base64Value = pickFirstString(base64Candidates);
  const sizeValue = pickFirstNumber(sizeCandidates);

  if (!directUrl && !base64Value) {
    return null;
  }

  let normalizedUrl = directUrl;
  let base64Payload = base64Value;

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
    path: pathValue,
    data: base64Payload || null,
    size: sizeValue,
  };

  if (normalized.url && /sirv\.com/i.test(normalized.url)) {
    normalized.source = 'sirv';
  }

  return normalized;
}

function getActiveLanguage() {
  return document.documentElement.getAttribute('lang') || 'ar';
}

function formatNumberLocalized(value) {
  const number = Number(value) || 0;
  try {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(number);
  } catch (error) {
    return String(number);
  }
}


function formatDateLocalized(value) {
  if (!value) return '—';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '—';
  }
  const lang = getActiveLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
  } catch (error) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}

function renderCurrencyCompact(display) {
  if (!display) return '';
  const parts = display.trim().split(/\s+/);
  const unit = parts.pop() || '';
  const amount = parts.join(' ');
  return `<span class="currency-amount">${amount}</span> <span class="currency-unit currency-unit--sm">${unit}</span>`;
}

function renderPaymentBreakdownHtml(paidDisplay, outstandingDisplay) {
  const paidLabel = t('customerDetails.stats.paymentPaid', 'المدفوع');
  const outstandingLabel = t('customerDetails.stats.paymentOutstandingLabel', 'المستحق');
  return `
    <div class="payment-line payment-line--paid">
      <span class="payment-line-label">${paidLabel}</span>
      ${renderCurrencyCompact(paidDisplay)}
    </div>
    <div class="payment-line payment-line--outstanding">
      <span class="payment-line-label">${outstandingLabel}</span>
      ${renderCurrencyCompact(outstandingDisplay)}
    </div>
  `;
}

const complianceLabelFallbacks = {
  excellent: 'Excellent commitment',
  good: 'On-time payments',
  average: 'Needs follow-up',
  poor: 'Repeated delays',
};

const activityLabelFallbacks = {
  reservation: 'Reservation',
  project: 'Project',
  customer: 'Client record',
};

function resolveLatestTimestamp(candidates = []) {
  let latest = null;
  candidates.forEach((rawValue) => {
    if (!rawValue) return;
    const candidate = rawValue instanceof Date ? rawValue : new Date(rawValue);
    if (Number.isNaN(candidate.getTime())) return;
    if (!latest || candidate > latest) {
      latest = candidate;
    }
  });
  return latest;
}

function escapeAttribute(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function updateSidebarStats({ projects = 0, reservations = 0, equipment = 0, technicians = 0 } = {}) {
  if (sidebarProjectsEl) sidebarProjectsEl.textContent = formatNumberLocalized(projects);
  if (sidebarReservationsEl) sidebarReservationsEl.textContent = formatNumberLocalized(reservations);
  if (sidebarEquipmentEl) sidebarEquipmentEl.textContent = formatNumberLocalized(equipment);
  if (sidebarTechniciansEl) sidebarTechniciansEl.textContent = formatNumberLocalized(technicians);
  try { window.__CUSTOMER_STATS__ = { projects, reservations, equipment, technicians }; } catch (_) {}
}

function updateHeroStats() {
  if (!currentCustomer || !customerId) {
    const emptyCurrency = formatCurrencyLocalized(0);
    if (heroStatProjectsEl) heroStatProjectsEl.textContent = '0';
    if (heroStatProjectsDescEl) heroStatProjectsDescEl.textContent = t('customerDetails.stats.projectsEmpty', 'لا توجد مشاريع مرتبطة بهذا العميل.');
    if (heroStatPaymentEl) {
      heroStatPaymentEl.innerHTML = renderPaymentBreakdownHtml(emptyCurrency, emptyCurrency);
    }
    if (heroStatPaymentDescEl) {
      const breakdownLabel = t('customerDetails.stats.paymentBreakdown', 'مدفوع / مستحق');
      const outstandingText = t('customerDetails.stats.paymentOutstandingEmpty', 'لا توجد مبالغ مستحقة');
      heroStatPaymentDescEl.textContent = `${breakdownLabel} • ${outstandingText}`;
    }
    if (heroStatUpcomingEl) heroStatUpcomingEl.textContent = '0';
    if (heroStatUpcomingDescEl) heroStatUpcomingDescEl.textContent = t('customerDetails.stats.upcomingEmpty', 'لا توجد حجوزات قادمة');
    if (heroStatActivityEl) heroStatActivityEl.textContent = '—';
    if (heroStatActivityDescEl) heroStatActivityDescEl.textContent = t('customerDetails.stats.activityEmpty', 'لا يوجد نشاط حديث');
    if (heroStatComplianceEl) heroStatComplianceEl.textContent = '0%';
    if (heroStatComplianceDescEl) heroStatComplianceDescEl.textContent = t('customerDetails.stats.complianceEmpty', 'لا توجد بيانات دفع كافية');
    updateSidebarStats({ projects: 0, reservations: 0, equipment: 0, technicians: 0 });
    return;
  }

  const snapshot = loadData();
  const reservations = Array.isArray(snapshot.reservations) ? snapshot.reservations : [];
  const relevantReservations = reservations.filter((reservation) => {
    if (!reservation) return false;
    const idCandidates = [
      reservation.customerId,
      reservation.customer_id,
      reservation.customer?.id,
    ];
    return idCandidates.some((candidate) => candidate != null && String(candidate) === String(customerId));
  });

  const totalReservations = relevantReservations.length;
  const now = Date.now();
  const upcomingReservations = relevantReservations.filter((reservation) => {
    const startRaw = reservation?.start ?? reservation?.startDatetime ?? reservation?.start_datetime ?? reservation?.start_date;
    if (!startRaw) return false;
    const start = new Date(startRaw);
    if (Number.isNaN(start.getTime())) return false;
    return start.getTime() >= now;
  });

  const nextReservationDate = upcomingReservations
    .map((reservation) => reservation?.start ?? reservation?.startDatetime ?? reservation?.start_datetime)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => a - b)[0] || null;

  const projects = Array.isArray(snapshot.projects) ? snapshot.projects : [];
  const relevantProjects = projects.filter((project) => {
    if (!project) return false;
    const idCandidates = [project.clientId, project.client_id, project.customer_id];
    return idCandidates.some((candidate) => candidate != null && String(candidate) === String(customerId));
  });
  const totalProjects = relevantProjects.length;

  // Exclude cancelled reservations from financial/compliance calculations
  const nonCancelledReservations = relevantReservations.filter((reservation) => {
    const rawStatus = String(reservation?.status || reservation?.reservationStatus || '').toLowerCase();
    return !(rawStatus === 'cancelled' || rawStatus === 'canceled' || rawStatus === 'ملغي' || rawStatus === 'ملغى' || rawStatus === 'ملغية');
  });

  // Group reservations by project
  const reservationsByProject = new Map();
  nonCancelledReservations.forEach((res) => {
    const pid = res?.projectId ?? res?.project_id ?? null;
    if (pid == null) return;
    const key = String(pid);
    if (!reservationsByProject.has(key)) reservationsByProject.set(key, []);
    reservationsByProject.get(key).push(res);
  });

  // Compute combined financials (projects + standalone reservations)
  let totalPaidAmount = 0;
  let totalOutstandingAmount = 0;
  let compliancePaidEntries = 0;
  let complianceTotalEntries = 0;

  // Projects: include project-level subtotal plus its reservations total; use project paidAmount/percent
  relevantProjects.forEach((project) => {
    const totals = resolveProjectTotals(project) || {};
    const pid = project?.id ?? project?.projectId ?? project?.project_id ?? null;
    const linkedReservations = pid != null ? (reservationsByProject.get(String(pid)) || []) : [];
    const reservationsTotal = linkedReservations.reduce((sum, res) => sum + (Number(res?.totalAmount) || resolveReservationNetTotal(res) || 0), 0);
    const combinedTax = totals.applyTax ? Number(((Number(totals.subtotal || 0) + reservationsTotal) * PROJECT_TAX_RATE).toFixed(2)) : 0;
    const overallTotal = Number(((Number(totals.subtotal || 0) + reservationsTotal + combinedTax)).toFixed(2));

    const progress = calculatePaymentProgress({
      totalAmount: overallTotal,
      paidAmount: Number(project?.paidAmount) || null,
      paidPercent: Number(project?.paidPercent) || null,
    });

    const paidAmt = Math.max(0, Number(progress.paidAmount || 0));
    const outstandingAmt = Math.max(0, Number((overallTotal - paidAmt).toFixed(2)));
    totalPaidAmount += paidAmt;
    totalOutstandingAmount += outstandingAmt;
    complianceTotalEntries += 1;
    if (outstandingAmt <= 0.5) compliancePaidEntries += 1;
  });

  // Standalone reservations (not linked to any project)
  const standaloneReservations = nonCancelledReservations.filter((res) => res?.projectId == null && res?.project_id == null);
  standaloneReservations.forEach((res) => {
    const total = Number(res?.totalAmount) || resolveReservationNetTotal(res) || 0;
    const progress = calculatePaymentProgress({
      totalAmount: total,
      paidAmount: Number(res?.paidAmount) || null,
      paidPercent: Number(res?.paidPercent) || null,
      progressType: res?.paymentProgressType ?? null,
      progressValue: res?.paymentProgressValue ?? null,
      history: Array.isArray(res?.paymentHistory) ? res.paymentHistory : [],
    });
    const paidAmt = Math.max(0, Number(progress.paidAmount || 0));
    const outstandingAmt = Math.max(0, Number((total - paidAmt).toFixed(2)));
    totalPaidAmount += paidAmt;
    totalOutstandingAmount += outstandingAmt;
    complianceTotalEntries += 1;
    if (outstandingAmt <= 0.5) compliancePaidEntries += 1;
  });

  const compliancePercentage = complianceTotalEntries > 0
    ? Math.round((compliancePaidEntries / complianceTotalEntries) * 100)
    : 0;

  const activityCandidates = [];

  relevantReservations.forEach((reservation) => {
    const timestamp = resolveLatestTimestamp([
      reservation?.updatedAt,
      reservation?.updated_at,
      reservation?.end,
      reservation?.endDatetime,
      reservation?.end_datetime,
      reservation?.start,
      reservation?.startDatetime,
      reservation?.start_datetime,
      reservation?.createdAt,
      reservation?.created_at,
    ]);
    if (timestamp) {
      activityCandidates.push({ date: timestamp, type: 'reservation' });
    }
  });

  relevantProjects.forEach((project) => {
    const timestamp = resolveLatestTimestamp([
      project?.updatedAt,
      project?.updated_at,
      project?.end,
      project?.end_datetime,
      project?.start,
      project?.start_datetime,
      project?.createdAt,
      project?.created_at,
    ]);
    if (timestamp) {
      activityCandidates.push({ date: timestamp, type: 'project' });
    }
  });

  if (!activityCandidates.length) {
    const customerTimestamp = resolveLatestTimestamp([
      currentCustomer?.updated_at,
      currentCustomer?.updatedAt,
      currentCustomer?.created_at,
      currentCustomer?.createdAt,
    ]);
    if (customerTimestamp) {
      activityCandidates.push({ date: customerTimestamp, type: 'customer' });
    }
  }

  const lastActivity = activityCandidates.reduce((latest, entry) => {
    if (!latest) return entry;
    return entry.date > latest.date ? entry : latest;
  }, null);

  const lastActivityDate = lastActivity?.date ?? null;
  const lastActivityType = lastActivity?.type ?? null;

  const totalEquipment = relevantReservations.reduce((sum, reservation) => {
    if (Array.isArray(reservation?.items)) {
      return sum + reservation.items.length;
    }
    return sum;
  }, 0);

  const technicianSet = new Set();
  relevantReservations.forEach((reservation) => {
    if (Array.isArray(reservation?.technicians)) {
      reservation.technicians.forEach((tech) => {
        const id = tech != null ? String(tech) : '';
        if (id) technicianSet.add(id);
      });
    }
    if (Array.isArray(reservation?.techniciansDetails)) {
      reservation.techniciansDetails.forEach((tech) => {
        const id = tech?.id ?? tech?.technician_id ?? tech?.technicianId;
        if (id != null) technicianSet.add(String(id));
      });
    }
  });
  // Sidebar stats (filtered للعميل الحالي)
  updateSidebarStats({
    projects: totalProjects,
    reservations: totalReservations,
    equipment: totalEquipment,
    technicians: technicianSet.size,
  });

  if (heroStatProjectsEl) heroStatProjectsEl.textContent = formatNumberLocalized(totalProjects);
  if (heroStatProjectsDescEl) {
    heroStatProjectsDescEl.textContent = totalProjects > 0
      ? t('customerDetails.stats.projectsDesc', 'المشاريع المرتبطة بالعميل')
      : t('customerDetails.stats.projectsEmpty', 'لا توجد مشاريع مرتبطة بهذا العميل.');
  }

  const paidDisplay = formatCurrencyLocalized(totalPaidAmount);
  const outstandingDisplay = formatCurrencyLocalized(totalOutstandingAmount);
  if (heroStatPaymentEl) {
    heroStatPaymentEl.innerHTML = renderPaymentBreakdownHtml(paidDisplay, outstandingDisplay);
  }
  if (heroStatPaymentDescEl) {
    const breakdownLabel = t('customerDetails.stats.paymentBreakdown', 'مدفوع / مستحق');
    const outstandingText = totalOutstandingAmount > 0
      ? t('customerDetails.stats.paymentOutstanding', 'المتبقي: {amount}').replace('{amount}', outstandingDisplay)
      : t('customerDetails.stats.paymentAllSet', 'لا توجد مبالغ مستحقة');
    heroStatPaymentDescEl.textContent = `${breakdownLabel} • ${outstandingText}`;
  }

  if (heroStatUpcomingEl) heroStatUpcomingEl.textContent = formatNumberLocalized(upcomingReservations.length);
  if (heroStatUpcomingDescEl) {
    heroStatUpcomingDescEl.textContent = upcomingReservations.length > 0 && nextReservationDate
      ? t('customerDetails.stats.nextReservation', 'أقرب حجز: {date}').replace('{date}', formatDateLocalized(nextReservationDate))
      : t('customerDetails.stats.upcomingEmpty', 'لا توجد حجوزات قادمة');
  }

  if (heroStatActivityEl) {
    if (lastActivityType) {
      const activityLabel = t(
        `customerDetails.stats.activityType.${lastActivityType}`,
        activityLabelFallbacks[lastActivityType] || lastActivityType
      );
      heroStatActivityEl.textContent = activityLabel;
    } else {
      heroStatActivityEl.textContent = '—';
    }
  }
  if (heroStatActivityDescEl) {
    heroStatActivityDescEl.textContent = lastActivityDate
      ? t('customerDetails.stats.activityOn', 'بتاريخ {date}').replace('{date}', formatDateLocalized(lastActivityDate))
      : t('customerDetails.stats.activityEmpty', 'لا يوجد نشاط حديث');
  }

  if (heroStatComplianceEl) heroStatComplianceEl.textContent = `${formatNumberLocalized(compliancePercentage)}%`;
  if (heroStatComplianceDescEl) {
    if (complianceTotalEntries > 0) {
      const complianceLabelKey = (() => {
        if (compliancePercentage >= 90) return 'excellent';
        if (compliancePercentage >= 70) return 'good';
        if (compliancePercentage >= 40) return 'average';
        return 'poor';
      })();
      const complianceLabel = complianceLabelKey
        ? t(
          `customerDetails.stats.complianceLabel.${complianceLabelKey}`,
          complianceLabelFallbacks[complianceLabelKey] || complianceLabelFallbacks.poor
        )
        : '';
      const projectsText = t('customerDetails.stats.complianceProjects', 'مشاريع مدفوعة بالكامل: {count} من {total}')
        .replace('{count}', formatNumberLocalized(compliancePaidEntries))
        .replace('{total}', formatNumberLocalized(complianceTotalEntries));
      heroStatComplianceDescEl.textContent = complianceLabel
        ? `${complianceLabel} • ${projectsText}`
        : projectsText;
    } else {
      heroStatComplianceDescEl.textContent = t('customerDetails.stats.complianceEmpty', 'لا توجد بيانات دفع كافية');
    }
  }

  updateSidebarStats({
    projects: totalProjects,
    reservations: totalReservations,
    equipment: totalEquipment,
    technicians: technicianSet.size,
  });
}

function findCustomerById(id) {
  const { customers } = loadData();
  if (!Array.isArray(customers)) {
    return null;
  }
  const match = customers.find((customer) => String(customer.id) === String(id));
  if (!match) {
    return null;
  }
  const rawTax = match.tax_id ?? match.taxId ?? '';
  const taxValue = typeof rawTax === 'string' ? rawTax.trim() : String(rawTax || '').trim();
  const document = match.document ?? normalizeCustomerDocument(match);
  return {
    ...match,
    tax_id: taxValue,
    taxId: taxValue,
    document
  };
}

function mapCustomerFromApi(raw = {}) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const idValue = raw.id ?? raw.customerId ?? raw.customer_id ?? null;
  const customerName = raw.full_name ?? raw.customerName ?? raw.name ?? '';
  const rawTaxId = raw.tax_id
    ?? raw.taxId
    ?? raw.vat_number
    ?? raw.vatNumber
    ?? raw.taxNumber
    ?? '';
  const taxValue = typeof rawTaxId === 'string' ? rawTaxId.trim() : String(rawTaxId || '').trim();
  const document = normalizeCustomerDocument(raw);

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
    tax_id: taxValue,
    taxId: taxValue,
    document,
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
    updateHeroStats();
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

  setActiveCustomerTab(activeCustomerTab);

  if (!currentCustomer) {
    setHeroData(null);
    setEditButtonsDisabled(true);
    updateHeroStats();

    if (isCustomerLoading) {
      container.innerHTML = `
        <div class="skeleton h-24 w-full rounded-2xl"></div>
        <div class="skeleton h-24 w-full rounded-2xl"></div>
        <div class="skeleton h-24 w-full rounded-2xl"></div>
      `;
      return;
    }

    if (customerLoadError) {
      container.innerHTML = `
        <div class="col-span-full">
          <div class="alert alert-error">${escapeHtml(customerLoadError)}</div>
        </div>
      `;
      return;
    }

    const notFoundMessage = t('customerDetails.errors.notFound', '⚠️ لم يتم العثور على هذا العميل.');
    container.innerHTML = `
      <div class="col-span-full">
        <div class="alert alert-warning" data-i18n data-i18n-key="customerDetails.errors.notFound">${escapeHtml(notFoundMessage)}</div>
      </div>
    `;
    return;
  }

  setHeroData(currentCustomer);
  setEditButtonsDisabled(false);

  const fields = [
    { key: 'customerDetails.fields.name', fallback: '👤 الاسم:', value: currentCustomer.customerName || '—' },
    { key: 'customerDetails.fields.phone', fallback: '📞 الجوال:', value: currentCustomer.phone ? normalizeNumbers(currentCustomer.phone) : '—' },
    { key: 'customerDetails.fields.company', fallback: '🏢 الشركة:', value: currentCustomer.companyName || '—' },
    { key: 'customerDetails.fields.email', fallback: '📧 البريد:', value: currentCustomer.email || '—' },
    { key: 'customerDetails.fields.address', fallback: '📍 العنوان:', value: currentCustomer.address || '—' },
    { key: 'customerDetails.fields.taxId', fallback: '🧾 الرقم الضريبي:', value: currentCustomer.tax_id ?? currentCustomer.taxId ?? '—' },
    { key: 'customerDetails.fields.notes', fallback: '📝 الملاحظات:', value: currentCustomer.notes || '—', multiline: true },
    { key: 'customerDetails.fields.document', fallback: '📎 مستند العميل', value: currentCustomer.document ?? null, type: 'document' }
  ];

  const fieldsHtml = fields.map((field) => {
    const label = t(field.key, field.fallback);
    if (field.type === 'document') {
      const doc = field.value;
      let docContent = '<span class="text-base-content/50">—</span>';
      if (doc && typeof doc === 'object') {
        const docName = doc.fileName?.trim() || doc.path?.trim() || doc.url || '';
        if (doc.url) {
          const safeName = docName ? escapeHtml(docName) : escapeHtml(t('customerDetails.document.defaultName', 'المستند المرتبط'));
          const safeUrl = escapeAttribute(doc.url);
          const openLabel = escapeHtml(t('customerDetails.document.open', 'عرض المستند'));
          docContent = `<div class="flex flex-wrap items-center gap-3"><span class="text-base-content break-all">${safeName}</span><a class="btn btn-outline btn-sm" href="${safeUrl}" target="_blank" rel="noopener noreferrer">${openLabel}</a></div>`;
        } else if (docName) {
          docContent = `<span class="text-base-content break-all">${escapeHtml(docName)}</span>`;
        }
      }
      return `
        <article class="rounded-2xl border border-base-200 bg-base-100/90 p-4 shadow-sm">
          <span class="text-sm font-medium text-base-content/70" data-i18n data-i18n-key="${field.key}">${escapeHtml(label)}</span>
          <div class="mt-2">${docContent}</div>
        </article>
      `;
    }

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
  updateHeroStats();
}

function populateEditModal() {
  document.getElementById('edit-id').value = currentCustomer?.id || '';
  document.getElementById('edit-name').value = currentCustomer?.customerName || '';
  document.getElementById('edit-phone').value = normalizeNumbers(currentCustomer?.phone || '');
  document.getElementById('edit-company').value = currentCustomer?.companyName || '';
  document.getElementById('edit-email').value = currentCustomer?.email || '';
  document.getElementById('edit-address').value = currentCustomer?.address || '';
  document.getElementById('edit-tax-id').value = normalizeNumbers(currentCustomer?.tax_id ?? currentCustomer?.taxId ?? '');
  const doc = currentCustomer?.document ?? null;
  if (editDocumentUrlInput) {
    editDocumentUrlInput.value = doc?.url || '';
  }
  if (editDocumentNameInput) {
    editDocumentNameInput.value = doc?.fileName || '';
  }
  resetEditDocumentState(doc);
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
    const taxId = normalizeNumbers(document.getElementById('edit-tax-id').value.trim());
    const documentUrl = (editDocumentUrlInput?.value || '').trim();
    const documentNameInput = (editDocumentNameInput?.value || '').trim();
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

    const existingDocument = customers[idx]?.document ?? null;
    let documentPayload = existingDocument;

    if (editDocumentState?.dataUrl) {
      documentPayload = {
        ...(existingDocument || {}),
        url: editDocumentState.dataUrl,
        fileName: documentNameInput || editDocumentState.fileName || existingDocument?.fileName || '',
        mimeType: editDocumentState.mimeType || existingDocument?.mimeType,
        size: editDocumentState.size ?? existingDocument?.size,
      };
    } else if (documentUrl) {
      documentPayload = {
        ...(existingDocument || {}),
        url: documentUrl,
        fileName: documentNameInput || existingDocument?.fileName || '',
      };
    } else if (documentNameInput && existingDocument) {
      documentPayload = {
        ...existingDocument,
        fileName: documentNameInput,
      };
    } else if (!documentUrl && !documentNameInput) {
      documentPayload = existingDocument;
    }

    customers[idx] = {
      ...customers[idx],
      customerName: name,
      phone,
      companyName: company,
      email,
      address,
      notes,
      tax_id: taxId,
      taxId,
      document: documentPayload,
    };

    saveData({ customers });
    currentCustomer = customers[idx];
    renderDetails();
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
    updateHeroStats();
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
    setEditButtonsDisabled(true);
    updateHeroStats();
    container.innerHTML = `<p class="text-danger" data-i18n data-i18n-key="customerDetails.errors.missingId">${t('customerDetails.errors.missingId', '⚠️ لا يوجد معرف عميل في الرابط.')}</p>`;
    return;
  }

  currentCustomer = findCustomerById(customerId);
  if (currentCustomer) {
    renderDetails();
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
    updateHeroStats();
  }

  await loadCustomerFromApi(customerId, { showSpinner: !currentCustomer });
}

initializeCustomerPage();

const maybeUpdateStats = () => {
  if (!customerId || !currentCustomer) {
    return;
  }
  updateHeroStats();
};

document.addEventListener('reservations:changed', maybeUpdateStats);
document.addEventListener('projects:changed', maybeUpdateStats);

document.addEventListener('language:changed', () => {
  renderDetails();
  if (customerId && currentCustomer) {
    renderCustomerReservations(customerId);
    renderCustomerProjects(customerId);
    updateHeroStats();
  }
});
