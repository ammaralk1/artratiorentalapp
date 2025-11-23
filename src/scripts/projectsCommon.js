import { applyStoredTheme, initThemeToggle } from './theme.js';
import { migrateOldData } from './storage.js';
import { checkAuth, logout } from './auth.js';
import { normalizeNumbers } from './utils.js';
import { getCurrentLanguage, t } from './language.js';
import { calculatePaymentProgress, determinePaymentStatus } from './reservationsSummary.js';

applyStoredTheme();
migrateOldData();
checkAuth();

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }
});

const statusLabelsFallback = {
  upcoming: 'Upcoming',
  ongoing: 'In Progress',
  completed: 'Completed'
};

const statusBadgeClass = {
  upcoming: 'bg-info',
  ongoing: 'bg-warning',
  completed: 'bg-success'
};

function formatDateTimeLocalized(value) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-ca-gregory-nu-latn' : 'en-US';
  try {
    const formatter = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    return normalizeNumbers(formatter.format(date));
  } catch (error) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }
}


export function formatCurrencyLocalized(value) {
  const number = Number(value) || 0;
  const lang = getCurrentLanguage();
  const locale = lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US';
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(number));
  const currencyLabel = 'SR';
  return `${normalizeNumbers(formatted)} ${currencyLabel}`;
}

export function calculateProjectExpenses(project) {
  if (typeof project?.expensesTotal === 'number') {
    return project.expensesTotal;
  }
  if (Array.isArray(project?.expenses)) {
    return project.expenses.reduce((sum, expense) => sum + (Number(expense?.amount) || 0), 0);
  }
  return 0;
}

export function determineProjectStatus(project) {
  const now = new Date();
  const start = project?.start ? new Date(project.start) : null;
  const end = project?.end ? new Date(project.end) : null;

  if (start && !Number.isNaN(start.getTime()) && start > now) {
    return 'upcoming';
  }
  if (end && !Number.isNaN(end.getTime()) && end < now) {
    return 'completed';
  }
  return 'ongoing';
}

export function truncateText(value, maxLength) {
  if (!value) return '';
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}…`;
}

export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatProjectDateRange(start, end) {
  if (!start) return '—';
  const startText = formatDateTimeLocalized(start);
  if (!end) return startText;
  return `${startText} - ${formatDateTimeLocalized(end)}`;
}

export function buildProjectCard(project, { techniciansMap = new Map(), clientName = null, includeClientLine = false } = {}) {
  const status = determineProjectStatus(project);
  const statusLabel = t(`projects.status.${status}`, statusLabelsFallback[status]);
  const statusClass = statusBadgeClass[status] || 'bg-secondary';
  const expensesTotal = calculateProjectExpenses(project);

  const rawPaymentStatus = String(project?.paymentStatus || project?.payment_status || '').toLowerCase();
  const basePaymentStatus = ['paid', 'partial', 'unpaid'].includes(rawPaymentStatus) ? rawPaymentStatus : '';
  const applyTax = project?.applyTax === true || project?.applyTax === 'true';
  const equipmentEstimate = Number(project?.equipmentEstimate) || 0;
  const baseSubtotal = equipmentEstimate + expensesTotal;
  const totalAmount = applyTax ? baseSubtotal * 1.15 : baseSubtotal;
  const paymentHistory = Array.isArray(project?.paymentHistory)
    ? project.paymentHistory
    : (Array.isArray(project?.payments) ? project.payments : []);
  const progress = calculatePaymentProgress({
    totalAmount,
    paidAmount: paymentHistory.length ? 0 : project?.paidAmount,
    paidPercent: paymentHistory.length ? 0 : project?.paidPercent,
    history: paymentHistory,
  });
  const inferredPaymentStatus = determinePaymentStatus({
    manualStatus: null,
    paidAmount: progress.paidAmount,
    paidPercent: progress.paidPercent,
    totalAmount,
  });
  const paymentStatus = basePaymentStatus || inferredPaymentStatus || 'unpaid';
  const paymentStatusLabel = t(`projects.paymentStatus.${paymentStatus}`, paymentStatus);
  const paymentChipClass = paymentStatus === 'paid'
    ? 'status-paid'
    : paymentStatus === 'partial'
      ? 'status-partial'
      : 'status-unpaid';
  const paymentChipExtra = status === 'completed' && paymentStatus === 'paid'
    ? ' project-payment-chip--neutral'
    : '';
  const paymentChip = `<span class="reservation-chip status-chip ${paymentChipClass}${paymentChipExtra} project-payment-chip">${escapeHtml(paymentStatusLabel)}</span>`;

  const description = (project?.description || '').trim();
  const descriptionText = description
    ? escapeHtml(truncateText(description, 140))
    : escapeHtml(t('projects.fallback.noDescription', 'No description'));
  const projectTitle = (project?.title || '').trim() || t('projects.fallback.untitled', 'Untitled project');

  const crewIds = Array.isArray(project?.technicians) ? project.technicians : [];
  const crewCount = crewIds.length;
  const crewLabel = t('projectCards.stats.crew', '👥 عدد الطاقم: {count}').replace('{count}', normalizeNumbers(String(crewCount)));

  const crewNames = crewIds
    .map((id) => techniciansMap.get(String(id))?.name)
    .filter(Boolean);
  let crewPreview = '';
  if (crewNames.length) {
    const maxPreview = 2;
    const previewNames = crewNames.slice(0, maxPreview);
    const extraCount = crewNames.length - previewNames.length;
    const separator = getCurrentLanguage() === 'ar' ? '، ' : ', ';
    const namesText = previewNames.join(separator);
    crewPreview = `${escapeHtml(namesText)}${extraCount > 0 ? escapeHtml(` +${normalizeNumbers(String(extraCount))}`) : ''}`;
  }

  const budgetTotal = (Number(project?.equipmentEstimate) || 0) + expensesTotal;
  const budgetLabel = t('projectCards.stats.budget', '💰 التكلفة التقديرية: {amount}').replace('{amount}', formatCurrencyLocalized(budgetTotal));
  const expensesLabel = expensesTotal > 0
    ? t('projectCards.stats.expenses', '💸 المصروفات: {amount}').replace('{amount}', formatCurrencyLocalized(expensesTotal))
    : '';

  const clientLine = includeClientLine && clientName
    ? `<span>${escapeHtml(t('projectCards.stats.client', '👤 العميل: {name}').replace('{name}', clientName))}</span>`
    : '';

  return `
    <div class="col-12 col-md-6 col-xl-4">
      <div class="box h-100 project-card">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <div>
            <h5 class="mb-1">${escapeHtml(projectTitle)}</h5>
            <span class="text-muted small">${escapeHtml(formatProjectDateRange(project?.start, project?.end))}</span>
          </div>
          <div class="d-flex flex-column align-items-end gap-1">
            <span class="badge ${statusClass} text-white">${escapeHtml(statusLabel)}</span>
            ${paymentChip}
          </div>
        </div>
        <p class="text-muted small mb-3">${descriptionText}</p>
        <div class="d-flex flex-column gap-1 small text-muted">
          ${clientLine}
          <span>${escapeHtml(crewLabel)}</span>
          ${crewPreview ? `<span>👥 ${escapeHtml(crewPreview)}</span>` : ''}
          <span>${escapeHtml(budgetLabel)}</span>
          ${expensesLabel ? `<span>${escapeHtml(expensesLabel)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}
