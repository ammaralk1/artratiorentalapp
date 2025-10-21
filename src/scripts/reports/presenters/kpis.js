import { translate, formatNumber, formatCurrency } from '../formatters.js';

export function updateKpiCards(metrics) {
  const totalEl = document.getElementById('reports-kpi-total');
  const totalMetaEl = document.getElementById('reports-kpi-total-meta');
  const revenueEl = document.getElementById('reports-kpi-revenue');
  const revenueMetaEl = document.getElementById('reports-kpi-revenue-meta');
  const revenueDetailsEl = document.getElementById('reports-revenue-breakdown');
  const confirmedEl = document.getElementById('reports-kpi-confirmed');
  const confirmedMetaEl = document.getElementById('reports-kpi-confirmed-meta');
  const paidEl = document.getElementById('reports-kpi-paid');
  const paidMetaEl = document.getElementById('reports-kpi-paid-meta');

  const total = metrics.total || 0;
  const revenue = metrics.revenue || 0;
  const confirmed = metrics.confirmed || 0;
  const paid = metrics.paidCount || 0;
  const avg = metrics.average || 0;
  const companyShareTotal = metrics.companyShareTotal || 0;
  const taxTotal = metrics.taxTotal || 0;
  const crewGross = metrics.crewTotal || 0;
  const crewCost = metrics.crewCostTotal || 0;
  const net = metrics.netProfit || 0;
  const maintenanceExpense = metrics.maintenanceExpense || 0;
  const confirmedRate = total ? Math.round((confirmed / total) * 100) : 0;
  const paidRate = total ? Math.round((paid / total) * 100) : 0;

  if (totalEl) totalEl.textContent = formatNumber(total);
  if (totalMetaEl) {
    const completedText = translate('reservations.reports.kpi.total.dynamicMeta', 'منها {count} منتهية', 'Includes {count} completed')
      .replace('{count}', formatNumber(metrics.completed || 0));
    totalMetaEl.textContent = completedText;
  }

  if (revenueEl) revenueEl.textContent = formatCurrency(revenue);
  if (revenueMetaEl) {
    const template = translate(
      'reservations.reports.kpi.revenue.meta',
      'صافي الربح {net} • نسبة الشركة {share} • متوسط الحجز {average}',
      'Net profit {net} • Company share {share} • Average reservation {average}',
    );
    revenueMetaEl.textContent = template
      .replace('{net}', formatCurrency(net))
      .replace('{share}', formatCurrency(companyShareTotal))
      .replace('{average}', formatCurrency(avg));
  }

  if (revenueDetailsEl) {
    if (revenue > 0) {
      const rows = [
        {
          label: translate('reservations.reports.kpi.revenue.details.gross', 'الإيراد الكلي', 'Gross revenue'),
          value: formatCurrency(revenue),
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.share', 'نسبة الشركة', 'Company share'),
          value: formatCurrency(companyShareTotal),
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'),
          value: formatCurrency(taxTotal),
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'),
          value: formatCurrency(crewGross),
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'),
          value: formatCurrency(crewCost),
        },
      ];

      if (maintenanceExpense > 0) {
        rows.push({
          label: translate('reservations.reports.kpi.revenue.details.maintenance', 'مصاريف الصيانة', 'Maintenance expenses'),
          value: `−${formatCurrency(maintenanceExpense)}`,
        });
      }

      rows.push({
        label: translate('reservations.reports.kpi.revenue.details.net', 'صافي الربح', 'Net profit'),
        value: formatCurrency(net),
      });

      revenueDetailsEl.innerHTML = rows
        .map(({ label, value }) => `
          <div class="reports-kpi-detail-row">
            <span class="reports-kpi-detail-label">${label}</span>
            <span class="reports-kpi-detail-value">${value}</span>
          </div>
        `)
        .join('');
      revenueDetailsEl.classList.remove('hidden');
    } else {
      revenueDetailsEl.innerHTML = '';
      revenueDetailsEl.classList.add('hidden');
    }
  }

  if (confirmedEl) confirmedEl.textContent = `${confirmedRate}%`;
  if (confirmedMetaEl) {
    const confirmedText = translate('reservations.reports.kpi.confirmed.detail', '{count} حجوزات مؤكدة', '{count} confirmed reservations')
      .replace('{count}', formatNumber(confirmed));
    confirmedMetaEl.textContent = confirmedText;
  }

  if (paidEl) paidEl.textContent = `${paidRate}%`;
  if (paidMetaEl) {
    const paidText = translate('reservations.reports.kpi.paid.detail', '{count} حجوزات مدفوعة', '{count} paid reservations')
      .replace('{count}', formatNumber(paid));
    paidMetaEl.textContent = paidText;
  }
}
