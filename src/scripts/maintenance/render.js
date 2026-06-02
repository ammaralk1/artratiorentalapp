import { normalizeNumbers } from '../utils.js';
import { t } from '../language.js';
import { categorizeMaintenanceStatus } from '../maintenanceService.js';
import { userCanManageDestructiveActions } from '../auth.js';
import { state, loadTickets } from './state.js';
import { formatDateDDMMYY, normalizeText, normalizeSearchValue, escapeHtml } from './utils.js';
import { populateEquipmentInputs } from './equipment-selector.js';
import { formatDateTime } from '../utils.js';

function buildMaintenanceStatusTag(ticket) {
  const rawStatus = String(ticket?.statusRaw ?? ticket?.status ?? 'open');
  const statusSlug = rawStatus
    .toLowerCase()
    .replace(/[^a-z0-9_\-\s]/g, '')
    .replace(/[\s]+/g, '_')
    || 'open';

  const category = categorizeMaintenanceStatus(statusSlug) || 'open';

  const statusMap = {
    open: { key: 'maintenance.status.open', fallback: 'قيد الصيانة', className: 'maintenance-status-tag--open' },
    in_progress: { key: 'maintenance.status.inProgress', fallback: 'قيد التنفيذ', className: 'maintenance-status-tag--in-progress' },
    completed: { key: 'maintenance.status.completed', fallback: 'مكتملة', className: 'maintenance-status-tag--completed' },
    cancelled: { key: 'maintenance.status.cancelled', fallback: 'ملغاة', className: 'maintenance-status-tag--cancelled' },
  };

  const config = statusMap[category] ?? statusMap.open;
  const fallbackLabel = config ? t(config.key, config.fallback) : t('maintenance.status.open', 'قيد الصيانة');
  const label = (ticket?.statusLabel && String(ticket.statusLabel).trim())
    ? String(ticket.statusLabel).trim()
    : fallbackLabel;

  const classes = ['maintenance-status-badge', 'maintenance-status-tag'];
  if (config?.className) classes.push(config.className);
  classes.push(`maintenance-status-tag--${category}`);
  classes.push(`maintenance-status-tag--${statusSlug}`);

  return `<span class="${classes.filter(Boolean).join(' ')}">${label}</span>`;
}

function renderMaintenanceTableState(tbody, message, tone = 'muted') {
  if (!(tbody instanceof HTMLElement)) return;
  const toneClass = tone === 'danger' ? 'text-danger' : 'text-muted';
  tbody.innerHTML = `<tr><td colspan="6" class="projects-table-empty-row text-center ${toneClass}">${message}</td></tr>`;
}

function renderMaintenanceEmptyState(tbody, { hasActiveFilters = false } = {}) {
  if (!(tbody instanceof HTMLElement)) return;

  const emptyTitle = hasActiveFilters
    ? t('maintenance.table.emptyFiltered', 'لا توجد تذاكر مطابقة لهذا الفلتر.')
    : t('maintenance.empty.title', 'لا توجد تذاكر صيانة');
  const emptySubtitle = hasActiveFilters
    ? t('maintenance.list.hint', 'تابع حالة الأعطال وقم بإغلاق التذاكر بعد إتمام الإصلاح.')
    : t('maintenance.empty.subtitle', 'عند إنشاء تذكرة جديدة ستظهر في هذه القائمة.');

  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="maintenance-empty-row">
        <div class="maintenance-empty-icon">✅</div>
        <h5>${emptyTitle}</h5>
        <p>${emptySubtitle}</p>
      </td>
    </tr>
  `;
}

function updateMaintenanceListCount(count) {
  const badge = document.getElementById('maintenance-list-count');
  if (!badge) return;
  badge.textContent = normalizeNumbers(String(Math.max(0, Number(count) || 0)));
}

function renderStats(tickets) {
  const container = document.getElementById('maintenance-stats');
  if (!container) return;

  const total = tickets.length;
  const open = tickets.filter((ticket) => ticket.status === 'open').length;
  const closed = total - open;
  const formatCount = (value) => normalizeNumbers(String(value));
  const summaryTitle = t('maintenance.stats.summaryTitle', 'ملخص الصيانة');
  const openLabel = t('maintenance.filters.status.open', 'قيد الصيانة');
  const closedLabel = t('maintenance.filters.status.closed', 'مغلقة');
  const totalLabel = t('maintenance.stats.totalLabel', 'إجمالي التذاكر');

  const buildItem = (value, label, modifier) => `
    <div class="maintenance-summary__item maintenance-summary__item--${modifier}">
      <span class="maintenance-summary__value">${formatCount(value)}</span>
      <span class="maintenance-summary__label">${label}</span>
    </div>
  `;

  container.innerHTML = `
    <section class="maintenance-summary" aria-labelledby="maintenance-summary-title">
      <header class="maintenance-summary__header">
        <span class="maintenance-summary__icon" aria-hidden="true">🛠️</span>
        <h4 id="maintenance-summary-title" class="maintenance-summary__title">${summaryTitle}</h4>
      </header>
      <div class="maintenance-summary__items">
        ${buildItem(open, openLabel, 'open')}
        ${buildItem(closed, closedLabel, 'closed')}
        ${buildItem(total, totalLabel, 'total')}
      </div>
    </section>
  `;
}

function getMaintenanceFilterState() {
  const statusFilter = document.getElementById('maintenance-status-filter');
  if (statusFilter && !statusFilter.value) {
    statusFilter.value = 'all';
  }

  const searchEl = document.getElementById('maintenance-search');
  const priorityEl = document.getElementById('maintenance-priority-filter');
  const status = statusFilter?.value || 'all';
  const query = searchEl?.value || '';
  const priority = priorityEl?.value || 'all';
  const hasActiveFilters = status !== 'all' || priority !== 'all' || normalizeSearchValue(query).length > 0;

  return { status, query, priority, hasActiveFilters };
}

function renderTable(tickets, { hasActiveFilters = false } = {}) {
  const tbody = document.getElementById('maintenance-table-body');
  if (!tbody) return;

  if (!tickets || tickets.length === 0) {
    renderMaintenanceEmptyState(tbody, { hasActiveFilters });
    return;
  }

  tbody.innerHTML = tickets
    .map((ticket) => {
      const statusBadge = buildMaintenanceStatusTag(ticket);
      const rowStatusClass = ticket.status === 'open'
        ? 'maintenance-row maintenance-row--open'
        : 'maintenance-row maintenance-row--closed';

      const priorityBadge = (() => {
        const high = t('maintenance.priority.high', 'مرتفعة');
        const medium = t('maintenance.priority.medium', 'متوسطة');
        const low = t('maintenance.priority.low', 'منخفضة');
        switch (ticket.priority) {
          case 'high':
            return `<span class="maintenance-priority-badge maintenance-priority-badge--high">${high}</span>`;
          case 'low':
            return `<span class="maintenance-priority-badge maintenance-priority-badge--low">${low}</span>`;
          default:
            return `<span class="maintenance-priority-badge maintenance-priority-badge--medium">${medium}</span>`;
        }
      })();

      const actionButtons = [];
      const closeLabel = t('maintenance.actions.close', '🔧 إغلاق بعد الإصلاح');
      const viewLabel = t('maintenance.actions.view', '👁️ عرض التقرير');
      const deleteLabel = t('maintenance.actions.delete', '🗑️ حذف التذكرة');
      if (ticket.status === 'open') {
        actionButtons.push(`<button type="button" class="maintenance-action-btn" data-action="close" data-id="${ticket.id}">${closeLabel}</button>`);
      } else {
        actionButtons.push(`<button type="button" class="maintenance-action-btn" data-action="view" data-id="${ticket.id}">${viewLabel}</button>`);
      }
      if (userCanManageDestructiveActions()) {
        actionButtons.push(`<button type="button" class="maintenance-action-btn maintenance-action-btn--delete" data-action="delete" data-id="${ticket.id}">${deleteLabel}</button>`);
      }

      const actions = actionButtons.join('');
      const noBarcode = t('maintenance.table.noBarcode', 'بدون باركود');
      const issuePlaceholder = t('maintenance.report.none', '—');
      const barcodeDisplay = ticket.equipmentBarcode ? normalizeNumbers(ticket.equipmentBarcode) : noBarcode;
      const issueDisplay = ticket.issue ? normalizeNumbers(ticket.issue) : issuePlaceholder;
      const repairCostValueRaw = ticket.repairCost != null ? Number.parseFloat(normalizeNumbers(String(ticket.repairCost))) : null;
      const repairCostLine = ticket.status === 'closed' && Number.isFinite(repairCostValueRaw)
        ? `<div class="maintenance-repair-cost">${escapeHtml(t('maintenance.table.repairCost', '💰 تكلفة الإصلاح: {amount}').replace('{amount}', normalizeNumbers(repairCostValueRaw.toFixed(2))))}</div>`
        : '';
      const createdDisplay = ticket.createdAt
        ? normalizeNumbers(formatDateDDMMYY(ticket.createdAt) || formatDateTime(ticket.createdAt))
        : t('common.placeholder.empty', '—');

      return `
        <tr class="${rowStatusClass}">
          <td>
            <strong>${ticket.equipmentDesc}</strong><br>
            <small class="text-muted">${barcodeDisplay}</small>
          </td>
          <td class="maintenance-issue-text">${issueDisplay}${repairCostLine}</td>
          <td>${priorityBadge}</td>
          <td>${createdDisplay}</td>
          <td>${statusBadge}</td>
          <td class="table-actions-cell">
            <div class="table-action-buttons">
              ${actions}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');
}

function filterTickets({ status = 'all', query = '', priority = 'all' } = {}) {
  const tickets = loadTickets();
  let result = tickets;

  if (status !== 'all') {
    result = result.filter((ticket) => ticket.status === status);
  }

  if (priority !== 'all') {
    result = result.filter((ticket) => String(ticket.priority || 'medium') === priority);
  }

  const q = normalizeSearchValue(query || '');
  if (q) {
    result = result.filter((ticket) => {
      const name = normalizeText(ticket.equipmentDesc || '');
      const barcode = normalizeSearchValue(ticket.equipmentBarcode || '');
      return name.includes(q) || barcode.includes(q);
    });
  }

  return result;
}

function renderMaintenancePrimaryState(tbody) {
  if (state.loading && !state.hasLoaded) {
    const loadingMessage = t('maintenance.table.loading', 'جاري التحميل...');
    updateMaintenanceListCount(0);
    renderMaintenanceTableState(tbody, loadingMessage);
    return true;
  }

  if (state.errorMessage && !state.hasLoaded) {
    updateMaintenanceListCount(0);
    renderMaintenanceTableState(tbody, state.errorMessage, 'danger');
    return true;
  }

  return false;
}

export function renderMaintenance() {
  const allTickets = loadTickets();
  populateEquipmentInputs();

  renderStats(allTickets);
  const { status, query, priority, hasActiveFilters } = getMaintenanceFilterState();

  const tbody = document.getElementById('maintenance-table-body');
  if (!tbody) return;

  if (renderMaintenancePrimaryState(tbody)) {
    return;
  }

  const tickets = filterTickets({ status, query, priority });
  updateMaintenanceListCount(tickets.length);
  renderTable(tickets, { hasActiveFilters });
}
