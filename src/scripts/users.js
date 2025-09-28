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
    ? 'bg-danger-subtle text-danger'
    : normalized === 'manager'
      ? 'bg-primary-subtle text-primary'
      : 'bg-secondary-subtle text-body';
  return `<span class="badge ${badgeClass}">${escapeHtml(labels[normalized] || role || '')}</span>`;
}

function currentUserBadge() {
  return `<span class="badge bg-info-subtle text-info">${escapeHtml(t('users.badges.currentUser', '🧑‍💻 Current account'))}</span>`;
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
      <td class="fw-semibold">${username}${selfBadge}</td>
      <td>${roleBadge(user.role)}</td>
      <td>${lastLogin}</td>
      <td>${createdAt}</td>
      <td><span class="badge bg-light text-body">${sessions}</span></td>
      <td><span class="badge bg-light text-body">${activity}</span></td>
      <td>
        <div class="btn-group btn-group-sm" role="group">
          <button type="button" class="btn btn-outline-primary" data-action="logs" data-id="${user.id}" title="${logsLabel}">📜</button>
          <button type="button" class="btn btn-outline-secondary" data-action="edit" data-id="${user.id}" title="${editLabel}">✏️</button>
          <button type="button" class="btn btn-outline-danger" data-action="delete" data-id="${user.id}" ${disableDelete} title="${deleteLabel}">🗑️</button>
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
  if (details === null || details === undefined || details === '') {
    return `<span class="text-muted">—</span>`;
  }

  if (typeof details === 'string') {
    return `<span class="text-muted">${escapeHtml(details)}</span>`;
  }

  try {
    const serialized = JSON.stringify(details, null, 2);
    return `<pre class="mb-0 small text-muted">${escapeHtml(serialized)}</pre>`;
  } catch (error) {
    return `<span class="text-muted">${escapeHtml(String(details))}</span>`;
  }
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
      <td>${escapeHtml(entry.action || '')}</td>
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
