import { URL } from 'node:url';

function isJsonLike(body) {
  if (!body || typeof body !== 'object') {
    return false;
  }
  if (body instanceof FormData) return false;
  if (body instanceof URLSearchParams) return false;
  if (typeof Blob !== 'undefined' && body instanceof Blob) return false;
  return true;
}

function parseCookie(cookieString) {
  const [pair] = cookieString.split(';');
  const separatorIndex = pair.indexOf('=');
  if (separatorIndex === -1) {
    return null;
  }
  const name = pair.slice(0, separatorIndex).trim();
  const value = pair.slice(separatorIndex + 1).trim();
  if (!name) {
    return null;
  }
  return { name, value };
}

export class ApiTestClient {
  constructor({ baseUrl, username, password }) {
    if (!baseUrl) {
      throw new Error('baseUrl is required');
    }
    const ensured = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    this.baseUrl = ensured;
    this.username = username;
    this.password = password;
    this.cookies = new Map();
  }

  get cookieHeader() {
    if (!this.cookies.size) {
      return '';
    }
    return Array.from(this.cookies.entries())
      .map(([name, value]) => `${name}=${value}`)
      .join('; ');
  }

  updateCookiesFromResponse(response) {
    const headerValues = [];

    if (typeof response.headers.getSetCookie === 'function') {
      headerValues.push(...response.headers.getSetCookie());
    } else if (typeof response.headers.raw === 'function') {
      const raw = response.headers.raw();
      if (raw['set-cookie']) {
        headerValues.push(...raw['set-cookie']);
      }
    } else {
      const single = response.headers.get('set-cookie');
      if (single) {
        headerValues.push(single);
      }
    }

    headerValues.forEach((cookieString) => {
      const parsed = parseCookie(cookieString);
      if (parsed) {
        this.cookies.set(parsed.name, parsed.value);
      }
    });
  }

  buildUrl(path) {
    if (!path) {
      return this.baseUrl;
    }
    const normalizedBase = this.baseUrl;
    let normalizedPath = path || '';

    if (normalizedPath.startsWith('/')) {
      normalizedPath = normalizedPath.slice(1);
    }

    try {
      return new URL(normalizedPath, normalizedBase).toString();
    } catch (_error) {
      throw new Error(`Unable to resolve URL for path: ${path}`);
    }
  }

  async request(path, options = {}) {
    const url = this.buildUrl(path);
    const init = { ...options };

    const headers = new Headers(options.headers || {});
    if (!options.skipAuth && this.cookieHeader) {
      headers.set('Cookie', this.cookieHeader);
    }

    if (options.acceptJson !== false && !headers.has('Accept')) {
      headers.set('Accept', 'application/json');
    }

    if (options.body !== undefined) {
      if (isJsonLike(options.body)) {
        headers.set('Content-Type', 'application/json');
        init.body = JSON.stringify(options.body);
      } else {
        init.body = options.body;
      }
    }

    init.headers = headers;
    init.credentials = 'include';

    const response = await fetch(url, init);
    this.updateCookiesFromResponse(response);
    return response;
  }

  async login() {
    if (!this.username || !this.password) {
      throw new Error('Username and password are required for login');
    }

    const response = await this.request('/auth/', {
      method: 'POST',
      body: {
        username: this.username,
        password: this.password,
      },
      skipAuth: true,
    });

    if (!response.ok) {
      const payload = await safeJson(response);
      throw new Error(`Login failed: ${response.status} ${JSON.stringify(payload)}`);
    }

    const payload = await response.json();
    if (payload?.ok !== true) {
      throw new Error(`Login response not OK: ${JSON.stringify(payload)}`);
    }
    return payload;
  }

  async logout() {
    if (!this.cookies.size) {
      return;
    }
    try {
      await this.request('/auth/', {
        method: 'DELETE',
      });
    } catch (error) {
      // ignore logout errors in tests
      console.warn('[ApiTestClient] logout failed', error);
    }
    this.cookies.clear();
  }
}

async function safeJson(response) {
  try {
    return await response.json();
  } catch (_error) {
    return null;
  }
}
