import { apiRequest } from './apiClient.js';

export async function listTechnicianPayouts(technicianId, { signal } = {}) {
  const params = new URLSearchParams();
  if (technicianId) {
    params.set('technician_id', technicianId);
  }
  const query = params.toString();
  const response = await apiRequest(`/technician-payouts/${query ? `?${query}` : ''}`, { signal });
  return Array.isArray(response?.data) ? response.data : [];
}

export async function createTechnicianPayout({ technicianId, amount, note, paidAt }) {
  const payload = {
    technician_id: technicianId,
    amount,
    note,
    paid_at: paidAt,
  };
  const response = await apiRequest('/technician-payouts/', {
    method: 'POST',
    body: payload,
  });
  return response?.data ?? null;
}

export async function deleteTechnicianPayout(payoutId) {
  const response = await apiRequest(`/technician-payouts/?id=${encodeURIComponent(payoutId)}`, {
    method: 'DELETE',
  });
  return response?.data ?? null;
}
