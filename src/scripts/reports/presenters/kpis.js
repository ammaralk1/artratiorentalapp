import { translate, formatNumber, formatCurrency } from '../formatters.js';

export function updateKpiCards(metrics) {
  const totalEl = document.getElementById('reports-kpi-total');
  const totalMetaEl = document.getElementById('reports-kpi-total-meta');
  const revenueEl = document.getElementById('reports-kpi-revenue');
  const revenueMetaEl = document.getElementById('reports-kpi-revenue-meta');
  // تفاصيل الإيرادات تُعرض الآن في بطاقة مستقلة خارج كروت KPI
  const revenueDetailsEl = document.getElementById('reservations-revenue-breakdown');
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
    if (total === 0) {
      revenueMetaEl.textContent = translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.');
    } else {
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
  }

  if (revenueDetailsEl) {
    if (revenue > 0) {
      const rows = [
        {
          label: translate('reservations.reports.kpi.revenue.details.gross', 'الإيراد الكلي', 'Gross revenue'),
          value: formatCurrency(revenue),
          hint: translate('reservations.reports.kpi.revenue.details.grossHint', 'إجمالي قيمة الحجوزات (قبل الخصومات)', 'Total bookings value (before discounts)')
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.share', 'نسبة الشركة', 'Company share'),
          value: formatCurrency(companyShareTotal),
          hint: translate('reservations.reports.kpi.revenue.details.shareHint', 'تُحسب بعد الخصم، وتُضاف للإجمالي', 'Applied after discount and added to total')
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.tax', 'الضريبة', 'Tax'),
          value: formatCurrency(taxTotal),
          hint: translate('reservations.reports.kpi.revenue.details.taxHint', 'ضريبة 15% على (الإجمالي بعد الخصم + نسبة الشركة)', '15% VAT on (after-discount total + company share)')
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.crewGross', 'إجمالي الطاقم', 'Crew total'),
          value: formatCurrency(crewGross),
          hint: translate('reservations.reports.kpi.revenue.details.crewGrossHint', 'قيمة الطاقم للعميل', 'Crew price billed to client')
        },
        {
          label: translate('reservations.reports.kpi.revenue.details.crew', 'تكلفة الطاقم', 'Crew cost'),
          value: formatCurrency(crewCost),
          hint: translate('reservations.reports.kpi.revenue.details.crewHint', 'تكلفة الطاقم على الشركة', 'Crew cost to company')
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
        .map(({ label, value, hint }) => `
          <div class="reports-kpi-detail-row" title="${hint || ''}">
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
