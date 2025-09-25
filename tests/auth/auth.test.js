import { describe, it, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';

const authMocks = vi.hoisted(() => ({
  showToast: vi.fn()
}));

vi.mock('../../src/scripts/utils.js', () => ({
  showToast: authMocks.showToast
}));

vi.mock('../../src/scripts/config/authConfig.js', () => ({
  default: Object.freeze({
    usernameHash: 'good-user',
    passwordHash: 'good-pass'
  })
}));

import { login, logout, checkAuth } from '../../src/scripts/auth.js';

const originalLocation = window.location;
const originalCrypto = window.crypto;

const mockedLocation = (() => {
  let hrefValue = 'about:blank';
  return {
    get href() {
      return hrefValue;
    },
    set href(value) {
      hrefValue = value;
    },
    assign: vi.fn((value) => {
      hrefValue = value;
    })
  };
})();

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: mockedLocation
  });
});

afterAll(() => {
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation
  });

  Object.defineProperty(window, 'crypto', {
    configurable: true,
    value: originalCrypto
  });
});

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = '<div id="login-error"></div>';
  const errorEl = document.getElementById('login-error');
  Object.defineProperty(errorEl, 'innerText', {
    configurable: true,
    set(value) {
      errorEl.textContent = value;
    },
    get() {
      return errorEl.textContent;
    }
  });
  mockedLocation.href = 'about:blank';
  authMocks.showToast.mockClear();

  Object.defineProperty(window, 'crypto', {
    configurable: true,
    value: {}
  });
});

describe('auth module', () => {
  it('logs in when credentials match config hashes and redirects to dashboard', async () => {
    await login('good-user', 'good-pass');

    expect(localStorage.getItem('loggedInUser')).toEqual(JSON.stringify({ username: 'good-user' }));
    expect(mockedLocation.href).toBe('dashboard.html');
    expect(authMocks.showToast).not.toHaveBeenCalled();
    expect(document.getElementById('login-error').textContent).toBe('');
  });

  it('shows error feedback when credentials are invalid', async () => {
    await login('bad-user', 'bad-pass');

    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(mockedLocation.href).toBe('about:blank');
    expect(authMocks.showToast).toHaveBeenCalledWith('❌ بيانات الدخول غير صحيحة', 3000);
    expect(document.getElementById('login-error').textContent).toBe('❌ بيانات الدخول غير صحيحة');
  });

  it('clears session and redirects to login on logout', () => {
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'tester' }));

    logout();

    expect(localStorage.getItem('loggedInUser')).toBeNull();
    expect(authMocks.showToast).toHaveBeenCalledWith('🚪 تم تسجيل الخروج');
    expect(mockedLocation.href).toBe('login.html');
  });

  it('redirects to login when user is not authenticated', () => {
    checkAuth();
    expect(mockedLocation.href).toBe('login.html');
  });

  it('keeps current page when user is already authenticated', () => {
    mockedLocation.href = 'dashboard.html';
    localStorage.setItem('loggedInUser', JSON.stringify({ username: 'tester' }));

    checkAuth();

    expect(mockedLocation.href).toBe('dashboard.html');
  });
});
