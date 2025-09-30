import { showToast } from './utils.js';
import { apiRequest, ApiError } from './apiClient.js';
import { updatePreferences, clearSkipRemotePreferencesFlag } from './preferencesService.js';
import { getCurrentTheme } from './theme.js';

const ERROR_MESSAGE = '❌ بيانات الدخول غير صحيحة';
let currentUser = null;

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
