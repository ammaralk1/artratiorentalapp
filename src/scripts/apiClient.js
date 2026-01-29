const DEFAULT_API_BASE = '/backend/api';

// Simple in-memory inflight de-duplication and failure backoff
const __inflight = new Map(); // key -> Promise
let __lastNetworkFailureAt = 0;
let __consecutiveNetworkFailures = 0;
const NETWORK_COOLDOWN_BASE_MS = 5000; // base backoff window
const NETWORK_COOLDOWN_MAX_MS = 30000; // cap
const DEFAULT_TIMEOUT_MS = 12000; // abort fetch after 12s

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status ?? null;
    this.payload = payload ?? null;
  }
}

export function getApiBase() {
  const envBase = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL;
  const globalBase = typeof window !== 'undefined' ? window.APP_API_BASE : null;

  // If env base points to localhost but we are on a real host, ignore it.
  let preferred = envBase || globalBase || DEFAULT_API_BASE;
  try {
    const isLocalEnv = typeof preferred === 'string' && /^(https?:)?\/\/(localhost|127\.|\[::1\])\b/i.test(preferred);
    const isLocalHost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.hostname === '[::1]');
    if (isLocalEnv && !isLocalHost) {
      // Use same-origin backend path in production even if bundle has a dev env var baked in
      preferred = DEFAULT_API_BASE;
    }
  } catch (_) { /* ignore */ }

  return String(preferred).replace(/\/$/, '');
}

export async function apiRequest(path, { method = 'GET', headers = {}, body, signal, credentials = 'include', timeout = DEFAULT_TIMEOUT_MS } = {}) {
  // Normalize path: accept strings, URL/Request objects, or plain objects with common keys
  let pathStr = path;
  try {
    // URL instance
    if (typeof URL !== 'undefined' && path instanceof URL) {
      pathStr = path.href;
    }
    // Request instance
    else if (typeof Request !== 'undefined' && path instanceof Request) {
      pathStr = path.url;
    }
    // Plain object with known keys
    else if (path && typeof path === 'object') {
      const candidate = path.path || path.url || path.endpoint || null;
      pathStr = candidate ? String(candidate) : String(path);
    }
  } catch {
    // Fallback to string coercion below
  }

  if (typeof pathStr !== 'string') {
    pathStr = String(pathStr || '');
  }

  const isAbsolute = /^https?:\/\//i.test(pathStr);
  const cleanedPath = isAbsolute ? pathStr : (pathStr.charAt(0) === '/' ? pathStr : `/${pathStr}`);
  const url = isAbsolute ? cleanedPath : `${getApiBase()}${cleanedPath}`;

  // Backoff if recent network failures have been observed
  try {
    if (typeof navigator !== 'undefined' && navigator && navigator.onLine === false) {
      const offlineErr = new ApiError('Network offline', { status: 0 });
      offlineErr.offline = true;
      throw offlineErr;
    }
  } catch (_) { /* ignore */ }
  const now = Date.now();
  const cooldownMs = Math.min(
    NETWORK_COOLDOWN_MAX_MS,
    NETWORK_COOLDOWN_BASE_MS * Math.max(1, Math.pow(2, Math.max(0, __consecutiveNetworkFailures - 1)))
  );
  if (__consecutiveNetworkFailures > 0 && (now - __lastNetworkFailureAt) < cooldownMs) {
    const err = new ApiError('Network cooldown after failures', { status: 0 });
    err.cooldown = true;
    throw err;
  }

  const finalHeaders = {
    Accept: 'application/json',
    ...headers,
  };
  if (!finalHeaders['X-Request-Id']) {
    try {
      const rid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      finalHeaders['X-Request-Id'] = rid;
    } catch (_) { /* ignore */ }
  }

  const fetchOptions = {
    method,
    headers: finalHeaders,
    signal,
    credentials,
  };

  if (body !== undefined) {
    if (body instanceof FormData) {
      // Let the browser set the proper boundary header automatically.
      delete finalHeaders['Content-Type'];
      fetchOptions.body = body;
    } else if (typeof body === 'string') {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      fetchOptions.body = body;
    } else {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      fetchOptions.body = JSON.stringify(body);
    }
  }

  // De-duplicate identical inflight requests (method+url)
  const key = `${method} ${url}`;
  if (__inflight.has(key)) {
    return __inflight.get(key);
  }

  const doFetch = async () => {
    // Support timeout via AbortController
    const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
    const timeoutId = (controller && Number.isFinite(timeout) && timeout > 0)
      ? setTimeout(() => { try { controller.abort(); } catch (_) {} }, timeout)
      : null;
    const effectiveSignal = controller ? (signal ? new AbortSignalAny([signal, controller.signal]) : controller.signal) : signal;
    const startedAt = Date.now();

    // A minimal polyfill to merge multiple signals
    function AbortSignalAny(signals) {
      const ctrl = new AbortController();
      const onAbort = () => { try { ctrl.abort(); } catch (_) {} };
      signals.filter(Boolean).forEach((s) => { try { if (s.aborted) onAbort(); else s.addEventListener('abort', onAbort, { once: true }); } catch (_) {} });
      return ctrl.signal;
    }

    try {
      const response = await fetch(url, { ...fetchOptions, signal: effectiveSignal });
      __consecutiveNetworkFailures = 0;
      __lastNetworkFailureAt = 0;
      return response;
    } catch (err) {
      // Treat fetch/abort errors as network failures for backoff purposes
      __consecutiveNetworkFailures = Math.min(10, __consecutiveNetworkFailures + 1);
      __lastNetworkFailureAt = Date.now();
      if (err?.name === 'AbortError') {
        console.warn('⏱️ [api] request aborted', { method, url, timeout, durationMs: Date.now() - startedAt });
      } else {
        console.warn('⚠️ [api] request failed', { method, url, durationMs: Date.now() - startedAt, error: err });
      }
      throw err;
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      const durationMs = Date.now() - startedAt;
      if (durationMs > 5000) {
        console.warn('🐢 [api] slow request', { method, url, durationMs, timeout });
      }
    }
  };

  const inflight = doFetch().finally(() => { __inflight.delete(key); });
  __inflight.set(key, inflight);
  const response = await inflight;
  const contentType = response.headers.get('content-type') || '';
  let payload = null;

  // Read body once as text, then try to parse JSON if applicable
  let bodyText = '';
  try {
    bodyText = await response.text();
  } catch {
    bodyText = '';
  }

  if (contentType.includes('application/json')) {
    try {
      payload = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      // If JSON parsing fails, preserve raw text instead of failing
      payload = bodyText ? { raw: bodyText } : null;
    }
  } else if (bodyText) {
    const trimmed = bodyText.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        payload = JSON.parse(trimmed);
      } catch {
        payload = { raw: bodyText };
      }
    } else {
      payload = { raw: bodyText };
    }
  } else {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || `Request failed with status ${response.status}`;
    // Treat server-side 5xx responses as failures for cooldown to avoid spamming the backend
    try {
      if (response.status >= 500) {
        __consecutiveNetworkFailures = Math.min(10, __consecutiveNetworkFailures + 1);
        __lastNetworkFailureAt = Date.now();
      }
    } catch (_) { /* ignore */ }
    throw new ApiError(message, {
      status: response.status,
      payload,
    });
  }

  if (payload && typeof payload === 'object' && payload.ok === false) {
    const message = payload.error || 'API returned an error response';
    throw new ApiError(message, {
      status: response.status,
      payload,
    });
  }

  return payload;
}
