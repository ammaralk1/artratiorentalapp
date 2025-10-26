const DEFAULT_API_BASE = '/backend/api';

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
  const base = envBase || globalBase || DEFAULT_API_BASE;
  return String(base).replace(/\/$/, '');
}

export async function apiRequest(path, { method = 'GET', headers = {}, body, signal, credentials = 'include' } = {}) {
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

  const finalHeaders = {
    Accept: 'application/json',
    ...headers,
  };

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

  const response = await fetch(url, fetchOptions);
  const contentType = response.headers.get('content-type') || '';
  let payload = null;

  if (contentType.includes('application/json')) {
    try {
      payload = await response.json();
    } catch (error) {
      throw new ApiError('Failed to parse server response as JSON', {
        status: response.status,
      });
    }
  } else {
    const text = await response.text();
    payload = text ? { raw: text } : null;
  }

  if (!response.ok) {
    const message = payload?.error || `Request failed with status ${response.status}`;
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
