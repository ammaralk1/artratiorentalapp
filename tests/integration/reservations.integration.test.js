import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ApiTestClient } from './support/apiTestClient.js';

const requiredEnvVars = [
  'INTEGRATION_API_BASE_URL',
  'INTEGRATION_USERNAME',
  'INTEGRATION_PASSWORD',
];

const missingEnv = requiredEnvVars.filter((name) => !process.env[name]);
const suite = missingEnv.length ? describe.skip : describe;

if (missingEnv.length) {
  console.warn(`Skipping REST integration tests. Missing env: ${missingEnv.join(', ')}`);
}

suite('REST integration', () => {
  let client;

  beforeAll(async () => {
    client = new ApiTestClient({
      baseUrl: process.env.INTEGRATION_API_BASE_URL,
      username: process.env.INTEGRATION_USERNAME,
      password: process.env.INTEGRATION_PASSWORD,
    });
    await client.login();
  }, 20_000);

  afterAll(async () => {
    await client.logout();
  });

  it('returns reservation listings with authenticated request', async () => {
    const response = await client.request('/reservations/?limit=5');
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload?.ok).toBe(true);
    expect(Array.isArray(payload?.data)).toBe(true);
  }, 20_000);

  it('rejects unsupported upload types with descriptive error', async () => {
    const form = new FormData();
    const blob = new Blob(['integration test payload'], { type: 'text/plain' });
    form.append('file', blob, 'integration-test.txt');

    const response = await client.request('/uploads/sirv.php', {
      method: 'POST',
      body: form,
    });

    expect([400, 415]).toContain(response.status);

    const payload = await response.json();
    expect(payload?.ok).toBe(false);
  }, 20_000);
});
