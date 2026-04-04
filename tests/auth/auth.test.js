import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ── Hoist mocks before any import ─────────────────────────────────────────────

const apiMocks = vi.hoisted(() => ({
  apiRequest: vi.fn(),
  ApiError: class ApiError extends Error {
    constructor(message, { status, payload } = {}) {
      super(message);
      this.name = 'ApiError';
      this.status = status ?? null;
      this.payload = payload ?? null;
    }
  },
}));

vi.mock('../../src/scripts/apiClient.js', () => apiMocks);

vi.mock('../../src/styles/app.css', () => ({}));

const utilsMocks = vi.hoisted(() => ({
  showToast: vi.fn(),
}));

vi.mock('../../src/scripts/utils.js', async () => {
  const actual = await vi.importActual('../../src/scripts/utils.js');
  return { ...actual, showToast: utilsMocks.showToast };
});

vi.mock('../../src/scripts/language.js', () => ({
  t: vi.fn((key, fallback) => fallback ?? key),
}));

vi.mock('../../src/scripts/theme.js', () => ({
  getCurrentTheme: vi.fn(() => 'light'),
}));

vi.mock('../../src/scripts/preferencesService.js', () => ({
  updatePreferences: vi.fn().mockResolvedValue(undefined),
  clearSkipRemotePreferencesFlag: vi.fn(),
}));

// ── Import module under test (after mocks) ────────────────────────────────────

import {
  login,
  logout,
  getCurrentUser,
  checkAuth,
  userCanManageDestructiveActions,
  notifyPermissionDenied,
  AUTH_EVENTS,
} from '../../src/scripts/auth.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function mockUserResponse(user = { id: 1, username: 'admin', role: 'admin' }) {
  apiMocks.apiRequest.mockResolvedValue({ data: user });
}

function mockApiError(status, message = 'error') {
  const err = new apiMocks.ApiError(message, { status });
  apiMocks.apiRequest.mockRejectedValue(err);
}

function mockNetworkError() {
  apiMocks.apiRequest.mockRejectedValue(new TypeError('Failed to fetch'));
}

// ── Setup ─────────────────────────────────────────────────────────────────────

let hrefSetter;

beforeEach(() => {
  vi.useFakeTimers();
  apiMocks.apiRequest.mockReset();
  utilsMocks.showToast.mockReset();

  // Intercept window.location.href assignments
  hrefSetter = vi.fn();
  Object.defineProperty(window, 'location', {
    value: { ...window.location, href: 'http://localhost/home.html' },
    writable: true,
    configurable: true,
  });
  Object.defineProperty(window.location, 'href', {
    set: hrefSetter,
    get: () => 'http://localhost/home.html',
    configurable: true,
  });

  // Ensure we are on localhost (so shouldBypassAuth can be controlled)
  Object.defineProperty(window.location, 'hostname', {
    value: 'localhost',
    configurable: true,
  });

  // Disable bypass auth by default
  window.__BYPASS_AUTH__ = false;
});

afterEach(() => {
  vi.runAllTimers();
  vi.useRealTimers();
  delete window.__BYPASS_AUTH__;
});

// ─────────────────────────────────────────────────────────────────────────────
// AUTH_EVENTS constant
// ─────────────────────────────────────────────────────────────────────────────

describe('AUTH_EVENTS', () => {
  it('exports USER_UPDATED event name', () => {
    expect(AUTH_EVENTS.USER_UPDATED).toBe('auth:user-updated');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// userCanManageDestructiveActions
// ─────────────────────────────────────────────────────────────────────────────

describe('userCanManageDestructiveActions', () => {
  beforeEach(async () => {
    // Ensure currentUser is null by calling getCurrentUser which will set user based on API
    apiMocks.apiRequest.mockResolvedValue(null);
  });

  it('returns true for admin role', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await getCurrentUser({ refresh: true });
    expect(userCanManageDestructiveActions()).toBe(true);
  });

  it('returns false for manager role (only admin has destructive access)', async () => {
    mockUserResponse({ id: 2, username: 'mgr', role: 'manager' });
    await getCurrentUser({ refresh: true });
    expect(userCanManageDestructiveActions()).toBe(false);
  });

  it('returns false for technician role', async () => {
    mockUserResponse({ id: 3, username: 'tech', role: 'technician' });
    await getCurrentUser({ refresh: true });
    expect(userCanManageDestructiveActions()).toBe(false);
  });

  it('returns false when no user is set', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await getCurrentUser({ refresh: true });
    expect(userCanManageDestructiveActions()).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// notifyPermissionDenied
// ─────────────────────────────────────────────────────────────────────────────

describe('notifyPermissionDenied', () => {
  it('calls showToast with an error message', () => {
    notifyPermissionDenied();
    expect(utilsMocks.showToast).toHaveBeenCalledOnce();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// login
// ─────────────────────────────────────────────────────────────────────────────

describe('login', () => {
  it('returns false and shows error when username is empty', async () => {
    const result = await login('', 'password123');
    expect(result).toBe(false);
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('returns false and shows error when password is empty', async () => {
    const result = await login('admin', '');
    expect(result).toBe(false);
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('returns false for both empty', async () => {
    const result = await login('', '');
    expect(result).toBe(false);
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
  });

  it('returns true and redirects to home.html on successful login', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    const result = await login('admin', 'secret');
    expect(result).toBe(true);
    expect(hrefSetter).toHaveBeenCalledWith('home.html');
  });

  it('calls POST /auth/ with credentials on login', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await login('  admin  ', 'secret');
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/auth/', expect.objectContaining({
      method: 'POST',
      body: expect.objectContaining({ username: 'admin', password: 'secret' }),
    }));
  });

  it('trims username before sending', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await login('  admin  ', 'secret');
    const [, opts] = apiMocks.apiRequest.mock.calls[0];
    expect(opts.body.username).toBe('admin');
  });

  it('returns false and shows INVALID error on 401', async () => {
    mockApiError(401);
    const result = await login('admin', 'wrong');
    expect(result).toBe(false);
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('returns false and shows INVALID error on 403', async () => {
    mockApiError(403);
    const result = await login('admin', 'wrong');
    expect(result).toBe(false);
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('returns false and shows GENERIC error on 500', async () => {
    mockApiError(500, 'Server error');
    const result = await login('admin', 'pass');
    expect(result).toBe(false);
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('returns false and shows NETWORK error on non-ApiError (fetch failure)', async () => {
    mockNetworkError();
    const result = await login('admin', 'pass');
    expect(result).toBe(false);
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('dispatches USER_UPDATED event on successful login', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    const eventSpy = vi.fn();
    document.addEventListener(AUTH_EVENTS.USER_UPDATED, eventSpy);
    await login('admin', 'secret');
    document.removeEventListener(AUTH_EVENTS.USER_UPDATED, eventSpy);
    expect(eventSpy).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// logout
// ─────────────────────────────────────────────────────────────────────────────

describe('logout', () => {
  it('calls DELETE /auth/', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await logout();
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/auth/', { method: 'DELETE' });
  });

  it('always redirects to login.html even if API fails', async () => {
    mockNetworkError();
    await logout();
    expect(hrefSetter).toHaveBeenCalledWith('login.html');
  });

  it('always shows logout toast', async () => {
    apiMocks.apiRequest.mockResolvedValue(null);
    await logout();
    expect(utilsMocks.showToast).toHaveBeenCalled();
  });

  it('clears currentUser (dispatches USER_UPDATED with null detail)', async () => {
    // First set a user
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await getCurrentUser({ refresh: true });

    // Then logout
    apiMocks.apiRequest.mockResolvedValue(null);
    const events = [];
    document.addEventListener(AUTH_EVENTS.USER_UPDATED, (e) => events.push(e));
    await logout();
    document.removeEventListener(AUTH_EVENTS.USER_UPDATED, events[0]);

    const lastEvent = events[events.length - 1];
    expect(lastEvent.detail).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getCurrentUser
// ─────────────────────────────────────────────────────────────────────────────

describe('getCurrentUser', () => {
  it('returns user from cache when already loaded (no refresh)', async () => {
    // Load user first
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await getCurrentUser({ refresh: true });
    apiMocks.apiRequest.mockReset();

    // Second call without refresh should not hit API
    const user = await getCurrentUser();
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
    expect(user).toMatchObject({ username: 'admin' });
  });

  it('calls GET /auth/ when refresh=true', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await getCurrentUser({ refresh: true });
    expect(apiMocks.apiRequest).toHaveBeenCalledWith('/auth/');
  });

  it('propagates 401 error to caller', async () => {
    mockApiError(401, 'Unauthorized');
    await expect(getCurrentUser({ refresh: true })).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
    });
  });

  it('returns current user on non-401 error (preserves session)', async () => {
    // Set a user first
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    await getCurrentUser({ refresh: true });

    // Simulate a network error on next call
    mockNetworkError();
    const user = await getCurrentUser({ refresh: true });
    expect(user).toMatchObject({ username: 'admin' });
  });

  it('returns bypass user on localhost with __BYPASS_AUTH__=true', async () => {
    // Clear current user first (null response → setCurrentUser(null))
    apiMocks.apiRequest.mockResolvedValue(null);
    await getCurrentUser({ refresh: true });
    apiMocks.apiRequest.mockReset();

    window.__BYPASS_AUTH__ = true;
    const user = await getCurrentUser();
    expect(user).toMatchObject({ username: 'dev-local', role: 'admin' });
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// checkAuth
// ─────────────────────────────────────────────────────────────────────────────

describe('checkAuth', () => {
  it('returns user when authenticated', async () => {
    mockUserResponse({ id: 1, username: 'admin', role: 'admin' });
    const user = await checkAuth({ redirect: false });
    expect(user).toMatchObject({ username: 'admin' });
  });

  it('redirects to login when 401 and redirect=true (after retries exhausted)', async () => {
    mockApiError(401, 'Unauthorized');
    const promise = checkAuth({ redirect: true, retries: 0 });
    await vi.runAllTimersAsync();
    await promise;
    expect(hrefSetter).toHaveBeenCalledWith('login.html');
  });

  it('does NOT redirect when redirect=false even on 401', async () => {
    mockApiError(401, 'Unauthorized');
    await checkAuth({ redirect: false, retries: 0 });
    expect(hrefSetter).not.toHaveBeenCalled();
  });

  it('retries once on 401 by default', async () => {
    // First call returns 401, second returns user
    const err = new apiMocks.ApiError('Unauthorized', { status: 401 });
    apiMocks.apiRequest
      .mockRejectedValueOnce(err)
      .mockResolvedValueOnce({ data: { id: 1, username: 'admin', role: 'admin' } });

    const promise = checkAuth({ redirect: false, retries: 1, retryDelay: 0 });
    await vi.runAllTimersAsync();
    const user = await promise;

    expect(apiMocks.apiRequest).toHaveBeenCalledTimes(2);
    expect(user).toMatchObject({ username: 'admin' });
  });

  it('does NOT redirect on network errors (non-401)', async () => {
    mockNetworkError();
    await checkAuth({ redirect: true, retries: 0 });
    expect(hrefSetter).not.toHaveBeenCalled();
  });

  it('returns bypass user when __BYPASS_AUTH__=true', async () => {
    // Clear current user state before enabling bypass
    apiMocks.apiRequest.mockResolvedValue(null);
    await getCurrentUser({ refresh: true });
    apiMocks.apiRequest.mockReset();

    window.__BYPASS_AUTH__ = true;
    const user = await checkAuth();
    expect(user).toMatchObject({ username: 'dev-local' });
    expect(apiMocks.apiRequest).not.toHaveBeenCalled();
  });
});
