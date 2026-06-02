import '../styles/app.css';
import '../styles/users.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout, getCurrentUser } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';
import { t } from './language.js';
import { initDashboardShell } from './dashboardShell.js';
import { jumpPaginationSectionToStart, settlePaginationSectionToStart } from './ui/paginationViewport.js';

applyStoredTheme();
initDashboardShell();

const state = {
  users: [],
  filtered: [],
  loading: false,
  processing: false,
  editingId: null,
  page: 1,
};

const USERS_PAGE_SIZE = 10;
const USERS_TABLE_COLSPAN = 7;

const ACTION_LABELS = {
  LOGIN_SUCCESS: { key: 'users.logs.actions.loginSuccess', fallback: 'Successful login' },
  LOGOUT: { key: 'users.logs.actions.logout', fallback: 'User signed out' },
  PREFERENCES_UPDATE: { key: 'users.logs.actions.preferencesUpdate', fallback: 'Preferences updated' },
  AUTHORIZATION_DENIED: { key: 'users.logs.actions.authorizationDenied', fallback: 'Authorisation denied' },
  RESERVATION_CREATE: { key: 'users.logs.actions.reservationCreate', fallback: 'Reservation created' },
  RESERVATION_UPDATE: { key: 'users.logs.actions.reservationUpdate', fallback: 'Reservation updated' },
  RESERVATION_DELETE: { key: 'users.logs.actions.reservationDelete', fallback: 'Reservation deleted' },
  RESERVATION_CONFIRM: { key: 'users.logs.actions.reservationConfirm', fallback: 'Reservation confirmed' },
  MAINTENANCE_CREATE: { key: 'users.logs.actions.maintenanceCreate', fallback: 'Maintenance ticket created' },
  MAINTENANCE_UPDATE: { key: 'users.logs.actions.maintenanceUpdate', fallback: 'Maintenance ticket updated' },
  MAINTENANCE_CLOSE: { key: 'users.logs.actions.maintenanceClose', fallback: 'Maintenance ticket closed' },
  PROJECT_CREATE: { key: 'users.logs.actions.projectCreate', fallback: 'Project created' },
  PROJECT_UPDATE: { key: 'users.logs.actions.projectUpdate', fallback: 'Project updated' },
  PROJECT_DELETE: { key: 'users.logs.actions.projectDelete', fallback: 'Project deleted' },
};

const BOOLEAN_LABELS = {
  true: { key: 'common.boolean.yes', fallback: 'Yes' },
  false: { key: 'common.boolean.no', fallback: 'No' },
};

const selectors = {
  errorAlert: '#users-error',
  refreshBtn: '#refresh-users-btn',
  logoutBtn: '#logout-btn',
  form: '#user-form',
  cancelBtn: '#user-cancel-btn',
  usernameInput: '#user-username',
  passwordInput: '#user-password',
  roleSelect: '#user-role',
  idInput: '#user-id',
  submitBtn: '#user-form button[type="submit"]',
  searchInput: '#users-search',
  pagination: '#users-pagination',
  statTotal: '#users-stat-total',
  statAdmins: '#users-stat-admins',
  statManagers: '#users-stat-managers',
  statTechnicians: '#users-stat-technicians',
  tableBody: '#users-table tbody',
  sessionsBody: '#user-sessions-body',
  activityBody: '#user-activity-body',
  modal: '#userLogsModal',
  modalTitle: '#userLogsModalLabel',
};

const elements = {};
let logsModalController = null;
let activeUser = null;

function createLogsModalController() {
  const modalEl = elements.modal;
  if (!modalEl) return null;

  const backdropSelector = '[data-users-modal-backdrop="true"]';

  const removeBackdrop = () => {
    document.querySelector(backdropSelector)?.remove();
  };

  const createBackdrop = () => {
    removeBackdrop();
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.dataset.usersModalBackdrop = 'true';
    document.body.append(backdrop);
  };

  const focusPrimaryControl = () => {
    modalEl.querySelector('[data-modal-close], .btn-close, button, [href]')?.focus({ preventScroll: true });
  };

  const close = () => {
    modalEl.classList.remove('show');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
    removeBackdrop();
    renderSessions([]);
    renderActivity([]);
    if (activeUser && typeof activeUser.focus === 'function') {
      activeUser.focus({ preventScroll: true });
    }
    activeUser = null;
  };

  const open = () => {
    activeUser = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modalEl.classList.add('show');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    createBackdrop();
    requestAnimationFrame(focusPrimaryControl);
  };

  if (!modalEl.dataset.modalControllerBound) {
    modalEl.addEventListener('click', (event) => {
      if (event.target === modalEl || event.target.closest('[data-modal-close]')) {
        close();
      }
    });
    modalEl.dataset.modalControllerBound = 'true';
  }

  return {
    open,
    close,
    isOpen: () => modalEl.classList.contains('show'),
  };
}

function ensureLogsModalController() {
  if (!logsModalController) {
    logsModalController = createLogsModalController();
  }
  return logsModalController;
}

function revealPage() {
  document.body.classList.remove('auth-pending');
}

function cacheElements() {
  Object.entries(selectors).forEach(([key, selector]) => {
    elements[key] = document.querySelector(selector);
  });
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderTableStateRow(message, tone = 'muted', colspan = USERS_TABLE_COLSPAN) {
  return `
    <tr>
      <td colspan="${colspan}" class="text-center text-${tone}">${escapeHtml(message)}</td>
    </tr>
  `;
}

function renderTableStack(primary, secondary = '', { primaryDir = '', secondaryDir = '' } = {}) {
  const primaryAttr = primaryDir ? ` dir="${primaryDir}"` : '';
  const secondaryAttr = secondaryDir ? ` dir="${secondaryDir}"` : '';
  return `
    <div class="flex flex-col gap-1">
      <div class="users-table-primary"${primaryAttr}>${escapeHtml(primary || '—')}</div>
      ${secondary ? `<div class="users-table-secondary"${secondaryAttr}>${escapeHtml(secondary)}</div>` : ''}
    </div>
  `;
}

function renderClientPagination(host, { total, page, pageSize, onPageAttr }) {
  if (!host) return;
  const safePageSize = Math.max(1, Number(pageSize) || 1);
  const totalItems = Math.max(0, Number(total) || 0);
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, Number(page) || 1), totalPages);

  if (totalPages <= 1) {
    host.hidden = true;
    host.innerHTML = '';
    return;
  }

  const navLabel = t('users.pagination.navigation', 'User list pagination');
  const prevLabel = t('users.pagination.prev', 'Previous page');
  const nextLabel = t('users.pagination.next', 'Next page');
  const pageLabelTemplate = t('users.pagination.page', 'Page {page}');
  const start = totalItems === 0 ? 0 : ((currentPage - 1) * safePageSize) + 1;
  const end = Math.min(totalItems, currentPage * safePageSize);
  const rangeText = t('users.pagination.range', 'Showing {start}-{end} of {total}')
    .replace('{start}', normalizeNumbers(String(start)))
    .replace('{end}', normalizeNumbers(String(end)))
    .replace('{total}', normalizeNumbers(String(totalItems)));

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  host.hidden = false;
  host.innerHTML = `
    <div class="list-pagination__summary text-muted small">${escapeHtml(rangeText)}</div>
    <div class="list-pagination__controls btn-group" role="group" aria-label="${escapeHtml(navLabel)}">
      <button type="button" class="btn btn-sm btn-outline-primary" ${onPageAttr}="${Math.max(1, currentPage - 1)}" ${currentPage <= 1 ? 'disabled' : ''} aria-label="${escapeHtml(prevLabel)}">‹</button>
      ${pages.map((pageNumber) => {
        const active = pageNumber === currentPage;
        const label = pageLabelTemplate.replace('{page}', normalizeNumbers(String(pageNumber)));
        return `<button type="button" class="btn btn-sm ${active ? 'btn-primary' : 'btn-outline-primary'}" ${onPageAttr}="${pageNumber}" aria-label="${escapeHtml(label)}" ${active ? 'aria-current="page"' : ''}>${normalizeNumbers(String(pageNumber))}</button>`;
      }).join('')}
      <button type="button" class="btn btn-sm btn-outline-primary" ${onPageAttr}="${Math.min(totalPages, currentPage + 1)}" ${currentPage >= totalPages ? 'disabled' : ''} aria-label="${escapeHtml(nextLabel)}">›</button>
    </div>
  `;
}

function toTitleCase(value) {
  return value.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function humanizeKey(key) {
  if (!key) return '';
  const withSpaces = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return toTitleCase(withSpaces || key);
}

function formatActivityAction(action) {
  const normalized = String(action || '').trim().toUpperCase();
  if (!normalized) {
    return t('users.logs.actions.unknown', 'General activity');
  }

  const labelConfig = ACTION_LABELS[normalized];
  if (labelConfig) {
    return t(labelConfig.key, labelConfig.fallback);
  }

  return humanizeKey(normalized);
}

function formatBoolean(value) {
  const labelConfig = BOOLEAN_LABELS[String(Boolean(value))];
  if (!labelConfig) {
    return value ? 'Yes' : 'No';
  }
  return t(labelConfig.key, labelConfig.fallback);
}

function formatArrayValue(list) {
  if (!Array.isArray(list) || list.length === 0) {
    return `<span class="text-muted">${escapeHtml(t('users.logs.details.empty', 'No data'))}</span>`;
  }

  const simpleItems = list.every((item) => (
    item === null
    || item === undefined
    || ['string', 'number', 'boolean'].includes(typeof item)
  ));

  if (simpleItems) {
    const joined = list
      .map((item) => {
        if (item === null || item === undefined) return t('users.logs.details.empty', 'No data');
        if (typeof item === 'boolean') return formatBoolean(item);
        if (typeof item === 'number') return normalizeNumbers(String(item));
        return String(item);
      })
      .join('، ');
    return `<span class="users-logs-detail-text">${escapeHtml(joined)}</span>`;
  }

  try {
    return `<pre class="users-logs-detail-code">${escapeHtml(JSON.stringify(list, null, 2))}</pre>`;
  } catch (error) {
    return `<span class="users-logs-detail-text">${escapeHtml(String(list))}</span>`;
  }
}

function formatDetailValue(value) {
  if (value === null || value === undefined || value === '') {
    return `<span class="text-muted">${escapeHtml(t('users.logs.details.empty', 'No data'))}</span>`;
  }

  if (typeof value === 'boolean') {
    const label = formatBoolean(value);
    const statusClass = value ? 'users-logs-status users-logs-status--yes' : 'users-logs-status users-logs-status--no';
    return `<span class="${statusClass}">${escapeHtml(label)}</span>`;
  }

  if (typeof value === 'number') {
    return `<span class="users-logs-detail-text">${escapeHtml(normalizeNumbers(String(value)))}</span>`;
  }

  if (typeof value === 'string') {
    return `<span class="users-logs-detail-text">${escapeHtml(value)}</span>`;
  }

  if (Array.isArray(value)) {
    return formatArrayValue(value);
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      return `<span class="text-muted">${escapeHtml(t('users.logs.details.empty', 'No data'))}</span>`;
    }

    const rows = entries.map(([key, innerValue]) => {
      const label = humanizeKey(key);
      return `
        <div class="users-logs-detail-row users-logs-detail-row--nested">
          <span class="users-logs-detail-key">${escapeHtml(label)}</span>
          <span class="users-logs-detail-value">${formatDetailValue(innerValue)}</span>
        </div>
      `;
    }).join('');

    return `<div class="users-logs-details users-logs-details--nested">${rows}</div>`;
  }

  try {
    return `<span class="users-logs-detail-text">${escapeHtml(String(value))}</span>`;
  } catch (error) {
    return `<span class="text-muted">${escapeHtml(t('users.logs.details.empty', 'No data'))}</span>`;
  }
}

function setError(message) {
  if (!elements.errorAlert) return;
  if (!message) {
    elements.errorAlert.hidden = true;
    elements.errorAlert.textContent = '';
    return;
  }
  elements.errorAlert.textContent = message;
  elements.errorAlert.hidden = false;
}

function setLoading(isLoading) {
  state.loading = isLoading;
  if (elements.refreshBtn) {
    elements.refreshBtn.disabled = isLoading;
  }
  renderUsersTable();
}

function setProcessing(isProcessing) {
  state.processing = isProcessing;
  if (!elements.form) return;

  const controls = elements.form.querySelectorAll('input, select, button');
  controls.forEach((control) => {
    control.disabled = isProcessing && control.type !== 'search';
  });
}

function formatDateOrDash(value) {
  return value ? formatDateTime(value) : '—';
}

function roleBadge(role) {
  const normalized = (role || '').toLowerCase();
  const labels = {
    admin: t('users.badges.role.admin', 'Admin'),
    manager: t('users.badges.role.manager', 'Manager'),
    technician: t('users.badges.role.technician', 'Technician'),
  };

  const variantClass = normalized === 'admin'
    ? 'users-role-chip--admin'
    : normalized === 'manager'
      ? 'users-role-chip--manager'
      : 'users-role-chip--technician';

  return `<span class="users-role-chip ${variantClass}">${escapeHtml(labels[normalized] || role || '')}</span>`;
}

function currentUserBadge() {
  return `<span class="users-self-chip">${escapeHtml(t('users.badges.currentUser', '🧑‍💻 Current account'))}</span>`;
}

function buildUsersTableRow(user) {
  const username = user.username || '';
  const role = user.role || '';
  const lastLogin = formatDateOrDash(user.last_login);
  const createdAt = formatDateOrDash(user.created_at);
  const sessions = normalizeNumbers(String(user.session_count ?? 0));
  const activity = normalizeNumbers(String(user.activity_count ?? 0));
  const disableDelete = user.is_current_user ? 'disabled' : '';
  const activeClass = Number(user.id) === Number(state.editingId) ? ' class="is-active"' : '';

  const editLabel = escapeHtml(t('users.actions.edit', '✏️ Edit'));
  const logsLabel = escapeHtml(t('users.actions.logs', '📜 Logs'));
  const deleteLabel = escapeHtml(t('users.actions.delete', '🗑️ Delete'));

  const usernameSecondary = user.is_current_user
    ? t('users.table.currentAccount', 'الحساب المستخدم حالياً')
    : t(`users.roles.${role}`, role || '');

  return `
    <tr data-user-id="${user.id}"${activeClass}>
      <td>
        ${renderTableStack(username, usernameSecondary)}
      </td>
      <td>
        <div class="users-row-badges">
          ${roleBadge(user.role)}
          ${user.is_current_user ? currentUserBadge() : ''}
        </div>
      </td>
      <td>${renderTableStack(lastLogin)}</td>
      <td>${renderTableStack(createdAt)}</td>
      <td><span class="users-metric-chip">${sessions}</span></td>
      <td><span class="users-metric-chip">${activity}</span></td>
      <td>
        <div class="users-row-actions" role="group">
          <button type="button" class="btn btn-ghost btn-sm" data-action="logs" data-id="${user.id}" title="${logsLabel}">📜</button>
          <button type="button" class="btn btn-outline btn-sm" data-action="edit" data-id="${user.id}" title="${editLabel}">✏️</button>
          <button type="button" class="btn btn-outline btn-error btn-sm" data-action="delete" data-id="${user.id}" ${disableDelete} title="${deleteLabel}">🗑️</button>
        </div>
      </td>
    </tr>
  `;
}

function renderUsersStats() {
  const items = Array.isArray(state.users) ? state.users : [];
  const counts = {
    total: items.length,
    admins: items.filter((user) => String(user.role || '').toLowerCase() === 'admin').length,
    managers: items.filter((user) => String(user.role || '').toLowerCase() === 'manager').length,
    technicians: items.filter((user) => String(user.role || '').toLowerCase() === 'technician').length,
  };

  if (elements.statTotal) elements.statTotal.textContent = normalizeNumbers(String(counts.total));
  if (elements.statAdmins) elements.statAdmins.textContent = normalizeNumbers(String(counts.admins));
  if (elements.statManagers) elements.statManagers.textContent = normalizeNumbers(String(counts.managers));
  if (elements.statTechnicians) elements.statTechnicians.textContent = normalizeNumbers(String(counts.technicians));
}

function renderUsersTable() {
  if (!elements.tableBody) return;

  if (state.loading) {
    elements.tableBody.innerHTML = renderTableStateRow(t('users.table.loading', '⏳ Loading users...'));
    renderClientPagination(elements.pagination, { total: 0, page: 1, pageSize: USERS_PAGE_SIZE, onPageAttr: 'data-users-page' });
    return;
  }

  if (!Array.isArray(state.filtered) || state.filtered.length === 0) {
    const hasSearch = Boolean(elements.searchInput && elements.searchInput.value.trim());
    const messageKey = hasSearch ? 'users.table.emptyFilter' : 'users.table.empty';
    elements.tableBody.innerHTML = renderTableStateRow(t(messageKey, hasSearch ? 'No results match your filters.' : 'No accounts found yet.'));
    renderClientPagination(elements.pagination, { total: 0, page: 1, pageSize: USERS_PAGE_SIZE, onPageAttr: 'data-users-page' });
    return;
  }

  const start = (state.page - 1) * USERS_PAGE_SIZE;
  const pageItems = state.filtered.slice(start, start + USERS_PAGE_SIZE);
  elements.tableBody.innerHTML = pageItems.map(buildUsersTableRow).join('');
  renderClientPagination(elements.pagination, {
    total: state.filtered.length,
    page: state.page,
    pageSize: USERS_PAGE_SIZE,
    onPageAttr: 'data-users-page',
  });
}

function applyFilters() {
  const searchTerm = (elements.searchInput?.value || '').trim().toLowerCase();
  if (!searchTerm) {
    state.filtered = [...state.users];
    state.page = 1;
    renderUsersTable();
    return;
  }

  state.filtered = state.users.filter((user) => {
    const usernameMatch = (user.username || '').toLowerCase().includes(searchTerm);
    const roleMatch = (user.role || '').toLowerCase().includes(searchTerm);
    return usernameMatch || roleMatch;
  });

  state.page = 1;
  renderUsersTable();
}

async function loadUsers() {
  if (state.loading) {
    return;
  }

  setError('');
  setLoading(true);

  try {
    const response = await apiRequest('/users/');
    const data = Array.isArray(response?.data) ? response.data : [];
    state.users = data.map((user) => ({ ...user }));
    renderUsersStats();
    applyFilters();
  } catch (error) {
    console.error('❌ Failed to load users', error);
    const message = error instanceof ApiError
      ? error.message
      : t('users.messages.loadFailed', 'Failed to load users. Please try again.');
    setError(message);
    state.users = [];
    state.filtered = [];
    renderUsersStats();
  } finally {
    setLoading(false);
  }
}

function setFormMode({ editing, user }) {
  const isEditing = Boolean(editing && user);
  state.editingId = isEditing ? Number(user.id) : null;

  if (!elements.idInput || !elements.usernameInput || !elements.passwordInput || !elements.roleSelect || !elements.submitBtn || !elements.cancelBtn) {
    return;
  }

  elements.idInput.value = isEditing ? String(user.id) : '';
  elements.usernameInput.value = isEditing ? String(user.username || '') : '';
  elements.roleSelect.value = isEditing ? String(user.role || '') : '';
  elements.passwordInput.value = '';
  elements.passwordInput.required = !isEditing;

  const submitKey = isEditing ? 'users.form.actions.update' : 'users.form.actions.submit';
  elements.submitBtn.dataset.i18nKey = submitKey;
  elements.submitBtn.textContent = t(submitKey, isEditing ? 'Update user' : 'Save user');

  if (isEditing) {
    elements.cancelBtn.classList.remove('d-none');
    elements.usernameInput.focus();
    document.querySelector(`#users-table tbody tr[data-user-id="${user.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    elements.cancelBtn.classList.add('d-none');
  }

  renderUsersTable();
}

function resetForm() {
  if (!elements.form) return;
  elements.form.reset();
  setFormMode({ editing: false, user: null });
}

function findUserById(id) {
  return state.users.find((user) => Number(user.id) === Number(id));
}

async function handleFormSubmit(event) {
  event.preventDefault();
  if (!elements.usernameInput || !elements.passwordInput || !elements.roleSelect) {
    return;
  }

  const username = elements.usernameInput.value.trim();
  const password = elements.passwordInput.value;
  const role = elements.roleSelect.value.trim().toLowerCase();

  if (!username) {
    showToast(t('users.messages.saveBlocked', 'Select an account to edit or provide the required information.'));
    elements.usernameInput.focus();
    return;
  }

  if (!role) {
    showToast(t('users.messages.validation.roleRequired', 'Please choose a role for the user.'));
    elements.roleSelect.focus();
    return;
  }

  const isEditing = Number.isFinite(state.editingId);
  if (!isEditing && password.trim() === '') {
    showToast(t('users.messages.validation.passwordRequired', 'Password is required when creating a new user.'));
    elements.passwordInput.focus();
    return;
  }

  const payload = { username, role };
  if (password.trim() !== '') {
    payload.password = password;
  }

  setProcessing(true);
  setError('');

  try {
    if (isEditing) {
      await apiRequest(`/users/?id=${state.editingId}`, {
        method: 'PATCH',
        body: payload,
      });
      showToast(t('users.messages.updated', '✅ User updated successfully.'));
    } else {
      await apiRequest('/users/', {
        method: 'POST',
        body: payload,
      });
      showToast(t('users.messages.created', '✅ User created successfully.'));
    }

    resetForm();
    await loadUsers();
  } catch (error) {
    console.error('❌ Failed to save user', error);
    if (error instanceof ApiError) {
      const message = error.payload?.error || error.message;
      setError(message);
    } else {
      setError(t('users.messages.loadFailed', 'Failed to load users. Please try again.'));
    }
  } finally {
    setProcessing(false);
  }
}

function handleCancelEdit() {
  resetForm();
}

async function handleDeleteUser(userId) {
  const targetUser = findUserById(userId);
  if (!targetUser) return;
  if (targetUser.is_current_user) {
    showToast(t('users.messages.deleteBlockedSelf', 'You cannot delete the account you are currently using.'));
    return;
  }

  const confirmation = window.confirm(t('users.messages.deleteConfirm', 'Are you sure you want to delete this user? This cannot be undone.'));
  if (!confirmation) return;

  setProcessing(true);
  try {
    await apiRequest(`/users/?id=${userId}`, { method: 'DELETE' });
    showToast(t('users.messages.deleted', '🗑️ User removed.'));
    if (state.editingId === Number(userId)) {
      resetForm();
    }
    await loadUsers();
  } catch (error) {
    console.error('❌ Failed to delete user', error);
    if (error instanceof ApiError) {
      setError(error.payload?.error || error.message);
    } else {
      setError(t('users.messages.loadFailed', 'Failed to load users. Please try again.'));
    }
  } finally {
    setProcessing(false);
  }
}

function renderSessions(sessions) {
  if (!elements.sessionsBody) return;

  if (!Array.isArray(sessions) || sessions.length === 0) {
    elements.sessionsBody.innerHTML = renderTableStateRow(t('users.logs.emptySessions', 'No session history available.'), 'muted', 3);
    return;
  }

  elements.sessionsBody.innerHTML = sessions.map((session) => `
    <tr>
      <td>${renderTableStack(formatDateOrDash(session.login_time))}</td>
      <td>${renderTableStack(formatDateOrDash(session.logout_time))}</td>
      <td>${renderTableStack(session.ip_address || '—', '', { primaryDir: 'ltr' })}</td>
    </tr>
  `).join('');
}

function formatActivityDetails(details) {
  if (details && typeof details === 'object' && !Array.isArray(details)) {
    const entries = Object.entries(details);
    if (!entries.length) {
      return `<span class="text-muted">${escapeHtml(t('users.logs.details.empty', 'No data'))}</span>`;
    }

    const rows = entries.map(([key, value]) => {
      const label = humanizeKey(key);
      return `
        <div class="users-logs-detail-row">
          <span class="users-logs-detail-key">${escapeHtml(label)}</span>
          <span class="users-logs-detail-value">${formatDetailValue(value)}</span>
        </div>
      `;
    }).join('');

    return `<div class="users-logs-details">${rows}</div>`;
  }

  return formatDetailValue(details);
}

function renderActivity(activity) {
  if (!elements.activityBody) return;

  if (!Array.isArray(activity) || activity.length === 0) {
    elements.activityBody.innerHTML = renderTableStateRow(t('users.logs.emptyActivity', 'No activity history available.'), 'muted', 3);
    return;
  }

  elements.activityBody.innerHTML = activity.map((entry) => `
    <tr>
      <td>${renderTableStack(formatDateOrDash(entry.timestamp))}</td>
      <td>${renderTableStack(formatActivityAction(entry.action))}</td>
      <td>${formatActivityDetails(entry.details)}</td>
    </tr>
  `).join('');
}

async function handleViewLogs(userId) {
  const user = findUserById(userId);
  if (!user) return;

  const modalController = ensureLogsModalController();
  if (!modalController || !elements.modalTitle) return;

  elements.modalTitle.textContent = `${t('users.logs.title', 'User Logs')} — ${user.username}`;
  const loadingMessage = t('users.logs.loading', 'Loading logs...');
  if (elements.sessionsBody) {
    elements.sessionsBody.innerHTML = renderTableStateRow(loadingMessage, 'muted', 3);
  }
  if (elements.activityBody) {
    elements.activityBody.innerHTML = renderTableStateRow(loadingMessage, 'muted', 3);
  }

  modalController.open();

  try {
    const response = await apiRequest(`/users/?scope=logs&user_id=${userId}&limit=50`);
    const sessions = Array.isArray(response?.data?.sessions) ? response.data.sessions : [];
    const activity = Array.isArray(response?.data?.activity) ? response.data.activity : [];
    renderSessions(sessions);
    renderActivity(activity);
  } catch (error) {
    console.error('❌ Failed to load user logs', error);
    showToast(t('users.messages.logsFailed', 'Could not load logs for that user.'));
    renderSessions([]);
    renderActivity([]);
  }
}

function handleTableClick(event) {
  const actionButton = event.target.closest('button[data-action]');
  if (!actionButton) return;

  const action = actionButton.dataset.action;
  const userId = Number(actionButton.dataset.id);

  if (!Number.isFinite(userId) || userId <= 0) {
    return;
  }

  if (action === 'edit') {
    const user = findUserById(userId);
    if (user) {
      setFormMode({ editing: true, user });
    }
    return;
  }

  if (action === 'delete') {
    handleDeleteUser(userId).catch((error) => {
      console.error('❌ Delete handler failed', error);
    });
    return;
  }

  if (action === 'logs') {
    handleViewLogs(userId).catch((error) => {
      console.error('❌ Logs handler failed', error);
    });
  }
}

function bindEvents() {
  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener('click', () => logout());
  }

  if (elements.refreshBtn) {
    elements.refreshBtn.addEventListener('click', () => {
      loadUsers().catch((error) => console.error('❌ Refresh failed', error));
    });
  }

  if (elements.form) {
    elements.form.addEventListener('submit', handleFormSubmit);
  }

  if (elements.cancelBtn) {
    elements.cancelBtn.addEventListener('click', handleCancelEdit);
  }

  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', () => applyFilters());
  }

  if (elements.pagination) {
    elements.pagination.addEventListener('click', (event) => {
      const button = event.target.closest('[data-users-page]');
      if (!button) return;
      const nextPage = Number(button.getAttribute('data-users-page'));
      if (!Number.isFinite(nextPage) || nextPage < 1 || nextPage === state.page) return;
      state.page = nextPage;
      jumpPaginationSectionToStart(elements.pagination);
      renderUsersTable();
      settlePaginationSectionToStart(elements.pagination, { behavior: 'smooth' });
    });
  }

  if (elements.tableBody) {
    elements.tableBody.addEventListener('click', handleTableClick);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && ensureLogsModalController()?.isOpen()) {
      event.preventDefault();
      logsModalController.close();
    }
  });

  document.addEventListener('language:changed', () => {
    // Re-render dynamic content when language changes
    const submitKey = state.editingId ? 'users.form.actions.update' : 'users.form.actions.submit';
    if (elements.submitBtn) {
      elements.submitBtn.textContent = t(submitKey, state.editingId ? 'Update user' : 'Save user');
    }
    applyFilters();
  });
}

async function ensureAdminAccess() {
  try {
    const user = await getCurrentUser({ refresh: true });
    if (!user) {
      window.location.href = 'login.html';
      return false;
    }

    const role = (user.role || '').toLowerCase();
    if (role !== 'admin') {
      setError(t('users.messages.notAdmin', 'This page is restricted to administrator accounts.'));
      setProcessing(true);
      if (elements.form) {
        elements.form.querySelectorAll('input, select, button').forEach((control) => {
          control.disabled = true;
        });
      }
      setTimeout(() => {
        window.location.href = 'home.html';
      }, 2500);
      return false;
    }

    return true;
  } catch (error) {
    console.error('❌ Failed to verify account role', error);
    window.location.href = 'login.html';
    return false;
  }
}

async function bootstrapUsersManagement() {
  cacheElements();
  initThemeToggle();
  bindEvents();
  revealPage();

  const hasAccess = await ensureAdminAccess();
  if (!hasAccess) {
    return;
  }

  setFormMode({ editing: false, user: null });

  await loadUsers();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    checkAuth().finally(() => {
      bootstrapUsersManagement().catch((error) => console.error('❌ Bootstrap failed', error));
    });
  }, { once: true });
} else {
  checkAuth().finally(() => {
    bootstrapUsersManagement().catch((error) => console.error('❌ Bootstrap failed', error));
  });
}
