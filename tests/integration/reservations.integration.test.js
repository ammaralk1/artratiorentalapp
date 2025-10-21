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

  it('rejects invalid login credentials', async () => {
    const badClient = new ApiTestClient({
      baseUrl: process.env.INTEGRATION_API_BASE_URL,
      username: 'integration_admin',
      password: 'DefinitelyWrongPassword',
    });

    await expect(badClient.login()).rejects.toThrow(/401/);
  }, 20_000);

  it('returns reservation listings with authenticated request', async () => {
    const response = await client.request('/reservations/?limit=5');
    expect(response.status).toBe(200);

    const payload = await response.json();
    expect(payload?.ok).toBe(true);
    expect(Array.isArray(payload?.data)).toBe(true);
  }, 20_000);

  let createdReservationId = null;

  it('creates a reservation with minimal payload', async () => {
    const createPayload = {
      customer_id: 1,
      title: 'Integration Test Reservation',
      start_datetime: '2025-12-01 10:00:00',
      end_datetime: '2025-12-01 12:00:00',
      status: 'pending',
      location: 'Integration Test Location',
      notes: 'Created via automated integration test',
      total_amount: 1500,
      project_id: null,
      discount: 0,
      discount_type: 'percent',
      apply_tax: false,
      paid_status: 'unpaid',
      paid_amount: 0,
      paid_percentage: 0,
      payment_progress_type: 'amount',
      payment_progress_value: 0,
      confirmed: false,
      items: [
        {
          equipment_id: 1,
          quantity: 1,
          unit_price: 1500,
        },
      ],
      technicians: [1],
    };

    const response = await client.request('/reservations/', {
      method: 'POST',
      body: createPayload,
    });

    expect(response.status).toBe(201);
    const payload = await response.json();
    expect(payload?.ok).toBe(true);
    expect(payload?.data?.id).toBeDefined();
    createdReservationId = payload.data.id;
  }, 20_000);

  it('updates the created reservation status', async () => {
    expect(createdReservationId).toBeTruthy();

    const response = await client.request(`/reservations/?id=${createdReservationId}`, {
      method: 'PATCH',
      body: {
        status: 'confirmed',
        notes: 'Updated via integration test',
        confirmed: true,
      },
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload?.ok).toBe(true);
    expect(payload?.data?.status).toBe('confirmed');
    expect(payload?.data?.notes).toContain('integration test');
  }, 20_000);

  it('deletes the created reservation', async () => {
    expect(createdReservationId).toBeTruthy();

    const response = await client.request(`/reservations/?id=${createdReservationId}`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload?.ok).toBe(true);

    // ensure it no longer exists
    const fetchDeleted = await client.request(`/reservations/?id=${createdReservationId}`, {
      method: 'GET',
    });
    expect(fetchDeleted.status).toBe(404);
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
