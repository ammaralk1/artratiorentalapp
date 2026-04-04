import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeResponse({ status = 200, body = null, contentType = 'application/json' } = {}) {
  const bodyText = body !== null ? (typeof body === 'string' ? body : JSON.stringify(body)) : '';
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (h) => (h === 'content-type' ? contentType : null) },
    text: vi.fn().mockResolvedValue(bodyText),
  };
}

// ─── ApiError ─────────────────────────────────────────────────────────────────

describe('ApiError', () => {
  let ApiError;

  beforeEach(async () => {
    vi.resetModules();
    ({ ApiError } = await import('../../src/scripts/apiClient.js'));
  });

  it('is an instance of Error', () => {
    expect(new ApiError('boom')).toBeInstanceOf(Error);
  });

  it('has name ApiError', () => {
    expect(new ApiError('boom').name).toBe('ApiError');
  });

  it('stores message', () => {
    expect(new ApiError('something went wrong').message).toBe('something went wrong');
  });

  it('defaults status and payload to null', () => {
    const err = new ApiError('fail');
    expect(err.status).toBeNull();
    expect(err.payload).toBeNull();
  });

  it('stores status and payload when provided', () => {
    const err = new ApiError('not found', { status: 404, payload: { error: 'missing' } });
    expect(err.status).toBe(404);
    expect(err.payload).toEqual({ error: 'missing' });
  });
});

// ─── getApiBase ───────────────────────────────────────────────────────────────

describe('getApiBase', () => {
  let getApiBase;

  beforeEach(async () => {
    vi.resetModules();
    vi.stubEnv('VITE_API_BASE_URL', '');
    delete window.APP_API_BASE;
    ({ getApiBase } = await import('../../src/scripts/apiClient.js'));
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    delete window.APP_API_BASE;
  });

  it('returns /backend/api by default', () => {
    expect(getApiBase()).toBe('/backend/api');
  });

  it('uses window.APP_API_BASE when set', () => {
    window.APP_API_BASE = 'https://api.example.com/backend/api';
    expect(getApiBase()).toBe('https://api.example.com/backend/api');
  });

  it('strips trailing slash from APP_API_BASE', () => {
    window.APP_API_BASE = '/backend/api/';
    expect(getApiBase()).toBe('/backend/api');
  });

  it('falls back to default when localhost env url is used on non-localhost', () => {
    window.APP_API_BASE = 'http://localhost:8080/api';
    Object.defineProperty(window, 'location', {
      value: { ...window.location, hostname: 'production.example.com' },
      writable: true,
      configurable: true,
    });
    expect(getApiBase()).toBe('/backend/api');
  });
});

// ─── apiRequest ───────────────────────────────────────────────────────────────

describe('apiRequest', () => {
  let apiRequest, ApiError;
  let fetchMock;

  beforeEach(async () => {
    vi.resetModules();
    fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    ({ apiRequest, ApiError } = await import('../../src/scripts/apiClient.js'));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // ── Success paths ────────────────────────────────────────────────────────────

  it('returns parsed JSON payload on successful GET', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true, data: [1, 2, 3] } }));
    const result = await apiRequest('/items');
    expect(result).toEqual({ ok: true, data: [1, 2, 3] });
  });

  it('prepends API base to relative paths', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items');
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/backend\/api\/items$/);
  });

  it('uses absolute URLs as-is without prepending base', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('https://cdn.example.com/image.jpg');
    expect(fetchMock.mock.calls[0][0]).toBe('https://cdn.example.com/image.jpg');
  });

  it('prepends slash to path that lacks one', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('items/list');
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/backend\/api\/items\/list$/);
  });

  // ── Request body encoding ─────────────────────────────────────────────────

  it('JSON-serializes object body and sets Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items', { method: 'POST', body: { name: 'test' } });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBe(JSON.stringify({ name: 'test' }));
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('passes string body as-is and sets Content-Type', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items', { method: 'POST', body: '{"raw":true}' });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBe('{"raw":true}');
    expect(options.headers['Content-Type']).toBe('application/json');
  });

  it('does NOT set Content-Type for FormData body', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    const formData = new FormData();
    formData.append('file', new Blob(['hello']), 'hello.txt');
    await apiRequest('/upload', { method: 'POST', body: formData });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.headers['Content-Type']).toBeUndefined();
  });

  it('sends credentials: include by default', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items');
    const [, options] = fetchMock.mock.calls[0];
    expect(options.credentials).toBe('include');
  });

  it('allows overriding credentials', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items', { credentials: 'omit' });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.credentials).toBe('omit');
  });

  // ── Error paths ──────────────────────────────────────────────────────────────

  it('throws ApiError on 4xx response using payload.error as message', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ status: 404, body: { error: 'Not found', ok: false } })
    );
    await expect(apiRequest('/missing')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404,
      message: 'Not found',
    });
  });

  it('throws ApiError with generic message when payload has no error field', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ status: 403, body: { message: 'forbidden' } }));
    const err = await apiRequest('/protected').catch(e => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.status).toBe(403);
    expect(err.message).toMatch(/403/);
  });

  it('throws ApiError on payload.ok === false even with 200 status', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ status: 200, body: { ok: false, error: 'business logic failure' } })
    );
    await expect(apiRequest('/items')).rejects.toMatchObject({
      name: 'ApiError',
      message: 'business logic failure',
    });
  });

  it('includes payload on ApiError', async () => {
    const errorPayload = { error: 'Validation failed', fields: ['name'] };
    fetchMock.mockResolvedValueOnce(makeResponse({ status: 422, body: errorPayload }));
    const err = await apiRequest('/items').catch(e => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.payload).toEqual(errorPayload);
  });

  // ── Non-JSON response parsing ────────────────────────────────────────────────

  it('parses JSON-looking text body without application/json content-type', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ body: '{"ok":true,"data":42}', contentType: 'text/plain' })
    );
    const result = await apiRequest('/items');
    expect(result).toEqual({ ok: true, data: 42 });
  });

  it('wraps non-JSON text body in { raw } object', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ body: 'plain text response', contentType: 'text/plain' })
    );
    const result = await apiRequest('/items');
    expect(result).toEqual({ raw: 'plain text response' });
  });

  it('returns null payload for empty response body', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: '', contentType: 'application/json' }));
    const result = await apiRequest('/items');
    expect(result).toBeNull();
  });

  it('handles broken JSON gracefully by wrapping in { raw }', async () => {
    fetchMock.mockResolvedValueOnce(
      makeResponse({ body: 'not valid { json', contentType: 'application/json' })
    );
    const result = await apiRequest('/items');
    expect(result).toEqual({ raw: 'not valid { json' });
  });

  // ── Inflight deduplication ───────────────────────────────────────────────────

  it('deduplicates identical inflight GET requests', async () => {
    let resolveFetch;
    const inflightPromise = new Promise(resolve => { resolveFetch = resolve; });
    fetchMock.mockReturnValue(inflightPromise);

    const p1 = apiRequest('/items');
    const p2 = apiRequest('/items');

    resolveFetch(makeResponse({ body: { ok: true, data: 'shared' } }));

    const [r1, r2] = await Promise.all([p1, p2]);
    expect(r1).toEqual(r2);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does NOT deduplicate requests with different paths', async () => {
    fetchMock.mockResolvedValue(makeResponse({ body: { ok: true } }));
    await apiRequest('/items');
    await apiRequest('/other');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does NOT deduplicate requests with different methods', async () => {
    fetchMock.mockResolvedValue(makeResponse({ body: { ok: true } }));
    await apiRequest('/items', { method: 'GET' });
    await apiRequest('/items', { method: 'POST', body: {} });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  // ── Network failure and cooldown ──────────────────────────────────────────────

  it('throws the original error when fetch itself throws (network down)', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await expect(apiRequest('/items')).rejects.toThrow('Failed to fetch');
  });

  it('applies cooldown after consecutive network failures', async () => {
    // First call fails with network error → increments counter
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await apiRequest('/items').catch(() => {});

    // Immediately after, Date.now is still within the cooldown window
    // Second request should throw a cooldown error without calling fetch again
    const err = await apiRequest('/other-endpoint').catch(e => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.cooldown).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1); // no second fetch
  });

  it('proceeds after cooldown window elapses', async () => {
    fetchMock.mockRejectedValueOnce(new TypeError('Failed to fetch'));
    await apiRequest('/items').catch(() => {});

    // Advance time past the cooldown window (NETWORK_COOLDOWN_BASE_MS = 5000ms)
    const originalNow = Date.now;
    vi.spyOn(Date, 'now').mockReturnValue(originalNow() + 10000);

    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    const result = await apiRequest('/items');
    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    vi.restoreAllMocks();
  });

  it('increments failure counter on 5xx response', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ status: 500, body: { error: 'Server error' } }));
    await apiRequest('/items').catch(() => {});

    // Next request immediately → cooldown active
    const err = await apiRequest('/items').catch(e => e);
    expect(err.cooldown).toBe(true);
  });

  // ── Offline detection ─────────────────────────────────────────────────────────

  it('throws ApiError with offline=true when navigator.onLine is false', async () => {
    Object.defineProperty(navigator, 'onLine', { value: false, writable: true, configurable: true });
    const err = await apiRequest('/items').catch(e => e);
    expect(err).toBeInstanceOf(ApiError);
    expect(err.offline).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    Object.defineProperty(navigator, 'onLine', { value: true, writable: true, configurable: true });
  });

  // ── Path normalization ────────────────────────────────────────────────────────

  it('accepts URL object as path', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest(new URL('https://example.com/api/items'));
    expect(fetchMock.mock.calls[0][0]).toBe('https://example.com/api/items');
  });

  it('accepts plain object with path key', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest({ path: '/items' });
    expect(fetchMock.mock.calls[0][0]).toMatch(/\/items$/);
  });

  // ── Headers ───────────────────────────────────────────────────────────────────

  it('sets Accept: application/json header by default', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items');
    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers['Accept']).toBe('application/json');
  });

  it('allows overriding default headers', async () => {
    fetchMock.mockResolvedValueOnce(makeResponse({ body: { ok: true } }));
    await apiRequest('/items', { headers: { 'X-Custom': 'value' } });
    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers['X-Custom']).toBe('value');
    expect(options.headers['Accept']).toBe('application/json');
  });
});
