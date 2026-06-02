import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/scripts/reports/formatters.js', () => ({
  translate: vi.fn((key, ar, en) => en ?? ar ?? key),
  formatNumber: vi.fn((value) => `num:${value}`),
  formatCurrency: vi.fn((value) => `sar:${value}`),
}));

import { updateKpiCards } from '../../src/scripts/reports/presenters/kpis.js';

describe('reports/presenters/kpis', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <p id="reports-kpi-total"></p>
      <span id="reports-kpi-total-meta"></span>
      <p id="reports-kpi-revenue"></p>
      <span id="reports-kpi-revenue-meta"></span>
      <div id="reservations-revenue-breakdown" class="hidden"></div>
      <p id="reports-kpi-outstanding"></p>
      <span id="reports-kpi-outstanding-meta"></span>
      <p id="reports-kpi-crew-cost"></p>
      <span id="reports-kpi-crew-cost-meta"></span>
      <p id="reports-kpi-equipment-cost"></p>
      <span id="reports-kpi-equipment-cost-meta"></span>
      <p id="reports-kpi-margin"></p>
      <span id="reports-kpi-margin-meta"></span>
      <p id="reports-kpi-net"></p>
      <span id="reports-kpi-net-meta"></span>
    `;
  });

  it('renders reservations KPI values and leaves colors to CSS', () => {
    updateKpiCards({
      total: 8,
      completed: 3,
      cancelled: 1,
      revenue: 4200,
      companyShareTotal: 320,
      discountTotal: 120,
      taxTotal: 630,
      crewTotal: 900,
      crewCostTotal: 600,
      equipmentTotal: 500,
      equipmentCostTotal: 350,
      outstandingTotal: 780,
      unpaidCount: 2,
      netProfit: 1450,
      maintenanceExpense: 100,
    });

    expect(document.getElementById('reports-kpi-total').textContent).toBe('num:8');
    expect(document.getElementById('reports-kpi-revenue').textContent).toBe('sar:4200');
    expect(document.getElementById('reports-kpi-outstanding').textContent).toBe('sar:780');
    expect(document.getElementById('reports-kpi-margin').textContent).toBe('35%');
    expect(document.getElementById('reports-kpi-net').textContent).toBe('sar:1450');
    expect(document.getElementById('reports-kpi-revenue').style.color).toBe('');
    expect(document.getElementById('reports-kpi-net').style.color).toBe('');
    expect(document.getElementById('reservations-revenue-breakdown').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('reservations-revenue-breakdown').innerHTML).toContain('Gross revenue');
    expect(document.getElementById('reservations-revenue-breakdown').innerHTML).toContain('sar:1450');
  });

  it('hides the revenue breakdown when no revenue exists', () => {
    const host = document.getElementById('reservations-revenue-breakdown');
    host.innerHTML = '<div>stale</div>';
    host.classList.remove('hidden');

    updateKpiCards({
      total: 0,
      revenue: 0,
      netProfit: 0,
      outstandingTotal: 0,
    });

    expect(host.innerHTML).toBe('');
    expect(host.classList.contains('hidden')).toBe(true);
  });
});
