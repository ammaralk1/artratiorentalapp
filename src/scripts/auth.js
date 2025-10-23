import { showToast } from './utils.js';
import { apiRequest, ApiError } from './apiClient.js';
import { updatePreferences, clearSkipRemotePreferencesFlag } from './preferencesService.js';
import { getCurrentTheme } from './theme.js';
import { t } from './language.js';

const LOGIN_ERROR_MESSAGES = {
  INVALID: { key: 'login.errors.invalidCredentials', fallback: '❌ بيانات الدخول غير صحيحة' },
  NETWORK: { key: 'login.errors.network', fallback: '🌐 تعذر الاتصال بالخادم. حاول مرة أخرى.' },
  GENERIC: { key: 'login.errors.generic', fallback: '⚠️ حدث خطأ غير متوقع. حاول مرة أخرى.' },
};
let currentUser = null;

export const AUTH_EVENTS = {
  USER_UPDATED: 'auth:user-updated',
};

function isLocalhost() {
  try {
    const host = window?.location?.hostname || '';
    return host === 'localhost' || host === '127.0.0.1' || host === '' || host === '::1';
  } catch {
    return false;
  }
}

function shouldBypassAuth() {
  try {
    if (!isLocalhost()) return false;
    // Explicit opt‑in via flag or query param
    const url = new URL(window.location.href);
    const qp = (url.searchParams.get('bypassAuth') || url.searchParams.get('dev') || url.searchParams.get('debug') || '').toLowerCase();
    const flagEnabled = window.__BYPASS_AUTH__ === true;
    return flagEnabled || qp === '1' || qp === 'true';
  } catch {
    return false;
  }
}

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
}

function resolveLoginErrorMessage(type = 'INVALID', overrideMessage) {
  if (overrideMessage && typeof overrideMessage === 'string') {
    return overrideMessage;
  }

  const definition = LOGIN_ERROR_MESSAGES[type] || LOGIN_ERROR_MESSAGES.INVALID;
  return t(definition.key, definition.fallback);
}

function clearLoginError() {
  const err = document.getElementById('login-error');
  if (err) {
    err.textContent = '';
    err.classList.add('hidden');
  }
}

function renderLoginError(type = 'INVALID', overrideMessage) {
  const message = resolveLoginErrorMessage(type, overrideMessage);
  showToast(message);
  const err = document.getElementById('login-error');
  if (err) {
    err.textContent = message;
    err.classList.remove('hidden');
  }
}

async function storeBrowserCredentials({ username, password, form }) {
  if (!username || !password) return;

  try {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    if (!window.isSecureContext) return;
    if (!navigator.credentials || typeof navigator.credentials.store !== 'function') return;

    const iconHref = (() => {
      try {
        const iconLink = document.querySelector('link[rel~="icon"]');
        return iconLink ? iconLink.href : undefined;
      } catch {
        return undefined;
      }
    })();

    let credential = null;

    if (form && form instanceof HTMLFormElement && typeof window.PasswordCredential !== 'undefined') {
      try {
        credential = new window.PasswordCredential(form);
      } catch (formError) {
        console.warn('⚠️ تعذر إنشاء بيانات الاعتماد من النموذج', formError);
      }
    }

    if (!credential && typeof window.PasswordCredential !== 'undefined') {
      try {
        credential = new window.PasswordCredential({
          id: username,
          name: username,
          password,
          iconURL: iconHref,
        });
      } catch (ctorError) {
        console.warn('⚠️ تعذر إنشاء PasswordCredential مباشر', ctorError);
      }
    }

    if (!credential && typeof navigator.credentials.create === 'function') {
      credential = await navigator.credentials.create({
        password: {
          id: username,
          name: username,
          password,
          iconURL: iconHref,
        },
      });
    }

    if (credential) {
      await navigator.credentials.store(credential);
    }
  } catch (error) {
    console.warn('⚠️ تعذر حفظ بيانات الاعتماد في المتصفح', error);
  }
}

export async function login(username, password, { form } = {}) {
  const sanitizedUsername = (username || '').trim();
  const sanitizedPassword = password || '';

  clearLoginError();

  if (!sanitizedUsername || !sanitizedPassword) {
    renderLoginError('INVALID');
    return false;
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

    await storeBrowserCredentials({ username: sanitizedUsername, password: sanitizedPassword, form });

    window.location.href = 'home.html';
    return true;
  } catch (error) {
    console.error('❌ فشل تسجيل الدخول', error);
    setCurrentUser(null);
    if (error instanceof ApiError) {
      if (error.status === 401 || error.status === 403) {
        renderLoginError('INVALID');
      } else if (error.status >= 500) {
        renderLoginError('GENERIC');
      } else {
        const hasCustomMessage = typeof error.message === 'string' && !/^request failed with status/i.test(error.message);
        const message = hasCustomMessage ? error.message : null;
        renderLoginError('GENERIC', message);
      }
    } else {
      renderLoginError('NETWORK');
    }
    return false;
  }
}

export async function logout() {
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
  // 🔓 Local dev bypass (only on localhost and with explicit flag)
  if (shouldBypassAuth()) {
    if (!currentUser) {
      setCurrentUser({ id: 0, username: 'dev-local', loginAt: new Date().toISOString(), role: 'admin' });
    }
    return currentUser;
  }

  if (!refresh && currentUser) {
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
  // If bypass is enabled, consider the user authenticated
  if (shouldBypassAuth()) {
    if (!currentUser) {
      setCurrentUser({ id: 0, username: 'dev-local', loginAt: new Date().toISOString(), role: 'admin' });
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
