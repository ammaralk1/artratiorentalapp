import { showToast } from './utils.js';
import { apiRequest, ApiError } from './apiClient.js';
import { updatePreferences, clearSkipRemotePreferencesFlag } from './preferencesService.js';
import { getCurrentTheme } from './theme.js';
import { t } from './language.js';
import { isPreviewMode, setPreviewUser, getPreviewUser } from './preview.js';

const ERROR_MESSAGE = '❌ بيانات الدخول غير صحيحة';
let currentUser = null;

export const AUTH_EVENTS = {
  USER_UPDATED: 'auth:user-updated',
};

function applyRoleToDocument(role) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  if (!root) return;

  if (role) {
    root.dataset.userRole = role;
  } else {
    delete root.dataset.userRole;
  }
}

function emitUserUpdated() {
  if (typeof document === 'undefined') return;

  document.dispatchEvent(new CustomEvent(AUTH_EVENTS.USER_UPDATED, {
    detail: currentUser ? { ...currentUser } : null,
  }));
}

function setCurrentUser(user) {
  if (user && typeof user === 'object') {
    const role = typeof user.role === 'string' ? user.role.trim().toLowerCase() : null;
    currentUser = {
      id: Number.isFinite(user.id) ? Number(user.id) : null,
      username: String(user.username || ''),
      loginAt: user.loginAt ?? null,
      role,
    };
  } else {
    currentUser = null;
  }

  applyRoleToDocument(currentUser?.role || '');
  emitUserUpdated();
  return currentUser;
}

function renderLoginError(message = ERROR_MESSAGE) {
  showToast(message);
  const err = document.getElementById('login-error');
  if (err) {
    err.innerText = message;
  }
}

export async function login(username, password) {
  const sanitizedUsername = (username || '').trim();
  const sanitizedPassword = password || '';

  if (!sanitizedUsername || !sanitizedPassword) {
    renderLoginError();
    return;
  }

  if (isPreviewMode()) {
    const loginAt = new Date().toISOString();
    const previewUser = {
      id: 1,
      username: sanitizedUsername || 'preview-admin',
      role: 'admin',
      loginAt,
    };
    setCurrentUserForPreview(previewUser);
    clearSkipRemotePreferencesFlag();
    window.location.href = 'home.html';
    return;
  }

  try {
    const response = await apiRequest('/auth/', {
      method: 'POST',
      body: {
        username: sanitizedUsername,
        password: sanitizedPassword,
      },
    });

    setCurrentUser(response?.data ?? null);

    try {
      await updatePreferences({ theme: getCurrentTheme() });
    } catch (prefsError) {
      console.warn('⚠️ تعذر حفظ تفضيل السمة بعد تسجيل الدخول', prefsError);
    }

    clearSkipRemotePreferencesFlag();

    window.location.href = 'home.html';
  } catch (error) {
    console.error('❌ فشل تسجيل الدخول', error);
    setCurrentUser(null);
    if (error instanceof ApiError && error.message) {
      renderLoginError(error.message);
    } else {
      renderLoginError();
    }
  }
}

export async function logout() {
  if (isPreviewMode()) {
    setCurrentUserForPreview(null);
    showToast('🚪 تم تسجيل الخروج');
    window.location.href = 'login.html';
    return;
  }

  try {
    await apiRequest('/auth/', { method: 'DELETE' });
  } catch (error) {
    console.warn('⚠️ فشل تسجيل الخروج من الخادم', error);
  } finally {
    setCurrentUser(null);
    showToast('🚪 تم تسجيل الخروج');
    window.location.href = 'login.html';
  }
}

export async function getCurrentUser({ refresh = false } = {}) {
  if (!refresh && currentUser) {
    return currentUser;
  }

  if (isPreviewMode()) {
    const previewUser = getPreviewUser();
    setCurrentUser(previewUser ?? null);
    return currentUser;
  }

  try {
    const response = await apiRequest('/auth/');
    setCurrentUser(response?.data ?? null);
    return currentUser;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      setCurrentUser(null);
    }
    throw error;
  }
}

export function checkAuth({ redirect = true } = {}) {
  if (isPreviewMode()) {
    const user = getPreviewUser();
    setCurrentUser(user ?? null);
    if (!user && redirect) {
      window.location.href = 'login.html';
    }
    return Promise.resolve(currentUser);
  }

  return getCurrentUser({ refresh: true })
    .then((user) => {
      if (!user && redirect) {
        window.location.href = 'login.html';
      }
      return user;
    })
    .catch((error) => {
      if (error instanceof ApiError && error.status === 401) {
        if (redirect) {
          window.location.href = 'login.html';
        }
        return null;
      }

      console.error('❌ خطأ أثناء التحقق من الجلسة', error);
      if (redirect) {
        window.location.href = 'login.html';
      }
      return null;
    });
}

export function getCurrentUserRole() {
  return currentUser?.role || null;
}

export function userCanManageDestructiveActions() {
  return getCurrentUserRole() === 'admin';
}

export function notifyPermissionDenied() {
  showToast(t('auth.permissions.denied', '⚠️ ليس لديك صلاحية لتنفيذ هذا الإجراء'), 'error');
}

export function setCurrentUserForPreview(user) {
  const sanitized = setCurrentUser(user);
  setPreviewUser(sanitized ?? null);
}
