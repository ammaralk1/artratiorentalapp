import '../styles/app.css';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout, getCurrentUser } from './auth.js';
import { apiRequest, ApiError } from './apiClient.js';
import { showToast, formatDateTime, normalizeNumbers } from './utils.js';
import { t } from './language.js';

applyStoredTheme();

const state = {
  users: [],
  filtered: [],
  loading: false,
  processing: false,
  editingId: null,
};

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
  tableBody: '#users-table tbody',
  sessionsBody: '#user-sessions-body',
  activityBody: '#user-activity-body',
  modal: '#userLogsModal',
  modalTitle: '#userLogsModalLabel',
};

const elements = {};
let logsModalInstance = null;
let activeUser = null;

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
    elements.errorAlert.classList.add('d-none');
    elements.errorAlert.textContent = '';
    return;
  }
  elements.errorAlert.textContent = message;
  elements.errorAlert.classList.remove('d-none');
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

  const badgeClass = normalized === 'admin'
    ? 'badge badge-outline badge-error'
    : normalized === 'manager'
      ? 'badge badge-outline badge-primary'
      : 'badge badge-outline';

  return `<span class="${badgeClass}">${escapeHtml(labels[normalized] || role || '')}</span>`;
}

function currentUserBadge() {
  return `<span class="badge badge-outline badge-info">${escapeHtml(t('users.badges.currentUser', '🧑‍💻 Current account'))}</span>`;
}

function buildUsersTableRow(user) {
  const username = escapeHtml(user.username || '');
  const lastLogin = escapeHtml(formatDateOrDash(user.last_login));
  const createdAt = escapeHtml(formatDateOrDash(user.created_at));
  const sessions = normalizeNumbers(String(user.session_count ?? 0));
  const activity = normalizeNumbers(String(user.activity_count ?? 0));
  const disableDelete = user.is_current_user ? 'disabled' : '';
  const selfBadge = user.is_current_user ? ` <span class="ms-1">${currentUserBadge()}</span>` : '';

  const editLabel = escapeHtml(t('users.actions.edit', '✏️ Edit'));
  const logsLabel = escapeHtml(t('users.actions.logs', '📜 Logs'));
  const deleteLabel = escapeHtml(t('users.actions.delete', '🗑️ Delete'));

  return `
    <tr data-user-id="${user.id}">
      <td class="font-semibold text-base-content">${username}${selfBadge}</td>
      <td>${roleBadge(user.role)}</td>
      <td>${lastLogin}</td>
      <td>${createdAt}</td>
      <td><span class="badge badge-outline badge-primary badge-sm">${sessions}</span></td>
      <td><span class="badge badge-outline badge-secondary badge-sm">${activity}</span></td>
      <td>
        <div class="flex flex-wrap items-center gap-1.5" role="group">
          <button type="button" class="btn btn-ghost btn-sm" data-action="logs" data-id="${user.id}" title="${logsLabel}">📜</button>
          <button type="button" class="btn btn-outline btn-sm" data-action="edit" data-id="${user.id}" title="${editLabel}">✏️</button>
          <button type="button" class="btn btn-outline btn-error btn-sm" data-action="delete" data-id="${user.id}" ${disableDelete} title="${deleteLabel}">🗑️</button>
        </div>
      </td>
    </tr>
  `;
}

function renderUsersTable() {
  if (!elements.tableBody) return;

  if (state.loading) {
    elements.tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">${escapeHtml(t('users.table.loading', '⏳ Loading users...'))}</td>
      </tr>
    `;
    return;
  }

  if (!Array.isArray(state.filtered) || state.filtered.length === 0) {
    const hasSearch = Boolean(elements.searchInput && elements.searchInput.value.trim());
    const messageKey = hasSearch ? 'users.table.emptyFilter' : 'users.table.empty';
    elements.tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center text-muted">${escapeHtml(t(messageKey, hasSearch ? 'No results match your filters.' : 'No accounts found yet.'))}</td>
      </tr>
    `;
    return;
  }

  elements.tableBody.innerHTML = state.filtered.map(buildUsersTableRow).join('');
}

function applyFilters() {
  const searchTerm = (elements.searchInput?.value || '').trim().toLowerCase();
  if (!searchTerm) {
    state.filtered = [...state.users];
    renderUsersTable();
    return;
  }

  state.filtered = state.users.filter((user) => {
    const usernameMatch = (user.username || '').toLowerCase().includes(searchTerm);
    const roleMatch = (user.role || '').toLowerCase().includes(searchTerm);
    return usernameMatch || roleMatch;
  });

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
    applyFilters();
  } catch (error) {
    console.error('❌ Failed to load users', error);
    const message = error instanceof ApiError
      ? error.message
      : t('users.messages.loadFailed', 'Failed to load users. Please try again.');
    setError(message);
    state.users = [];
    state.filtered = [];
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
  } else {
    elements.cancelBtn.classList.add('d-none');
  }
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
    elements.sessionsBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">${escapeHtml(t('users.logs.emptySessions', 'No session history available.'))}</td>
      </tr>
    `;
    return;
  }

  elements.sessionsBody.innerHTML = sessions.map((session) => `
    <tr>
      <td>${escapeHtml(formatDateOrDash(session.login_time))}</td>
      <td>${escapeHtml(formatDateOrDash(session.logout_time))}</td>
      <td>${escapeHtml(session.ip_address || '—')}</td>
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
    elements.activityBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">${escapeHtml(t('users.logs.emptyActivity', 'No activity history available.'))}</td>
      </tr>
    `;
    return;
  }

  elements.activityBody.innerHTML = activity.map((entry) => `
    <tr>
      <td>${escapeHtml(formatDateOrDash(entry.timestamp))}</td>
      <td>${escapeHtml(formatActivityAction(entry.action))}</td>
      <td>${formatActivityDetails(entry.details)}</td>
    </tr>
  `).join('');
}

async function handleViewLogs(userId) {
  const user = findUserById(userId);
  if (!user) return;

  if (!elements.modal || !elements.modalTitle) return;

  const modalEl = elements.modal;
  logsModalInstance = logsModalInstance || new window.bootstrap.Modal(modalEl, { backdrop: 'static' });

  elements.modalTitle.textContent = `${t('users.logs.title', 'User Logs')} — ${user.username}`;
  const loadingMessage = escapeHtml(t('users.logs.loading', 'Loading logs...'));
  if (elements.sessionsBody) {
    elements.sessionsBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">${loadingMessage}</td>
      </tr>
    `;
  }
  if (elements.activityBody) {
    elements.activityBody.innerHTML = `
      <tr>
        <td colspan="3" class="text-center text-muted">${loadingMessage}</td>
      </tr>
    `;
  }

  logsModalInstance.show();

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

  if (elements.tableBody) {
    elements.tableBody.addEventListener('click', handleTableClick);
  }

  if (elements.modal) {
    elements.modal.addEventListener('hidden.bs.modal', () => {
      renderSessions([]);
      renderActivity([]);
    });
  }

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
