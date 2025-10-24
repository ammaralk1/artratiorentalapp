import { ensureApexCharts } from '../external.js';
import { translate, formatNumber, formatCurrency } from '../formatters.js';
import reportsState from '../state.js';

function getThemeMode() {
  const root = document.documentElement;
  return root.classList.contains('dark') || root.dataset.theme === 'dark' ? 'dark' : 'light';
}

function renderProgressSection(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!data || data.length === 0) {
    container.innerHTML = `<div class="text-sm text-base-content/60">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</div>`;
    return;
  }

  container.innerHTML = data
    .map((item) => {
      const percent = Math.min(Math.max(item.percent ?? 0, 0), 100);
      const meta = translate('reservations.reports.progress.meta', '{count} حجز', '{count} reservations')
        .replace('{count}', formatNumber(item.rawCount ?? item.value ?? 0));
      const fillClass = item.className ? `reports-progress-fill ${item.className}` : 'reports-progress-fill';
      return `
        <div class="reports-progress-row">
          <div class="reports-progress-top">
            <span>${item.label}</span>
            <span class="reports-progress-value">${formatNumber(item.percent ?? 0)}%</span>
          </div>
          <div class="reports-progress-bar">
            <div class="${fillClass}" style="width: ${percent}%;"></div>
          </div>
          <div class="reports-progress-meta">${meta}</div>
        </div>
      `;
    })
    .join('');
}

export async function renderTrendChart(data) {
  const container = document.getElementById('reports-volume-chart');
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastTrendData = sanitized;

  if (!sanitized.length) {
    if (reportsState.charts.trend) {
      reportsState.charts.trend.destroy();
      reportsState.charts.trend = null;
    }
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const categories = sanitized.map((item) => item.label);
    const reservationsSeries = sanitized.map((item) => Math.round(item.count || 0));
    const revenueSeries = sanitized.map((item) => Number(item.revenue || 0));
    const netSeries = sanitized.map((item) => Number(item.netProfit || 0));

    const totalReservations = reservationsSeries.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
    const totalRevenue = revenueSeries.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);
    const totalNet = netSeries.reduce((a, b) => a + (Number.isFinite(b) ? b : 0), 0);

    if (totalReservations === 0 && totalRevenue === 0 && totalNet === 0) {
      if (reportsState.charts.trend) {
        reportsState.charts.trend.destroy();
        reportsState.charts.trend = null;
      }
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const series = [
      {
        name: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
        type: 'column',
        data: reservationsSeries,
      },
      {
        name: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
        type: 'line',
        data: revenueSeries,
      },
      {
        name: translate('reservations.reports.chart.volume.series.net', 'صافي الربح (SR)', 'Net profit (SR)'),
        type: 'line',
        data: netSeries,
        yAxisIndex: 1,
      },
    ];

    const options = {
      chart: {
        type: 'line',
        height: 320,
        stacked: false,
        toolbar: { show: false },
        background: 'transparent',
        fontFamily: 'Tajawal, sans-serif',
        animations: { enabled: true },
        events: {
          dataPointSelection: (_event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              const item = reportsState.lastTrendData[config.dataPointIndex];
              reportsState.callbacks.onTrendDrilldown?.(item, config.dataPointIndex);
            }
          },
        },
      },
      theme: { mode: getThemeMode() },
      stroke: {
        width: [0, 4, 4],
        curve: 'smooth',
      },
      markers: {
        size: [0, 5, 5],
      },
      colors: ['#6366f1', '#22c55e', '#f97316'],
      dataLabels: { enabled: false },
      fill: { type: 'solid', opacity: 1 },
      xaxis: {
        categories,
        labels: {
          style: { colors: getThemeMode() === 'dark' ? '#cbd5f5' : '#475569' },
        },
      },
      yaxis: [
        {
          seriesName: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
          axisTicks: { show: true },
          axisBorder: { show: true, color: '#6366f1' },
          labels: {
            style: { colors: '#6366f1' },
            formatter: (value) => formatNumber(value),
          },
          title: {
            text: translate('reservations.reports.chart.volume.series.reservations', 'عدد الحجوزات', 'Reservations'),
            style: { color: '#6366f1' },
          },
        },
        {
          opposite: true,
          seriesName: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
          axisTicks: { show: true },
          axisBorder: { show: true, color: '#22c55e' },
          labels: {
            style: { colors: '#22c55e' },
            formatter: (value) => formatCurrency(value),
          },
          title: {
            text: translate('reservations.reports.chart.volume.series.revenue', 'الإيرادات (SR)', 'Revenue (SR)'),
            style: { color: '#22c55e' },
          },
        },
      ],
      legend: { position: 'bottom' },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: (value, { seriesIndex }) => (
            seriesIndex === 0 ? formatNumber(value) : formatCurrency(value)
          ),
        },
      },
    };

    if (reportsState.charts.trend) {
      reportsState.charts.trend.updateOptions({ ...options }, true, true);
      reportsState.charts.trend.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.trend = new ApexCharts(container, { ...options, series });
      reportsState.charts.trend.render();
    }
  } catch (error) {
    console.error('⚠️ [reports] Failed to render trend chart', error);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}

export async function renderStatusChart(data) {
  const container = document.getElementById('reports-status-chart');
  const listContainerId = 'reports-status-breakdown';
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastStatusData = sanitized;

  const series = sanitized.map((item) => Math.max(0, item.value || 0));
  const sumSeries = series.reduce((a, b) => a + b, 0);

  if (!sanitized.length || sumSeries === 0) {
    if (reportsState.charts.status) {
      reportsState.charts.status.destroy();
      reportsState.charts.status = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const labels = sanitized.map((item) => item.label);

    const options = {
      chart: {
        type: 'donut',
        height: 300,
        fontFamily: 'Tajawal, sans-serif',
        toolbar: { show: false },
        background: 'transparent',
        events: {
          dataPointSelection: (_event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              const item = reportsState.lastStatusData[config.dataPointIndex];
              if (item?.filterKey) {
                reportsState.callbacks.onStatusDrilldown?.(item, config.dataPointIndex);
              }
            }
          },
        },
      },
      theme: { mode: getThemeMode() },
      labels,
      series,
      colors: ['#22c55e', '#f97316', '#6366f1'],
      legend: { position: 'bottom' },
      dataLabels: {
        formatter: (val) => `${Math.round(val)}%`,
      },
      plotOptions: {
        pie: {
          donut: {
            size: '68%',
            labels: {
              show: true,
              total: {
                show: true,
                label: translate('reservations.reports.chart.status.title', '🧾 توزيع الحالات', 'Status distribution'),
                formatter: () => formatNumber(series.reduce((sum, value) => sum + value, 0)),
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: (val, opts) => {
            const item = reportsState.lastStatusData?.[opts?.seriesIndex || 0];
            const percent = item ? `${formatNumber(item.percent)}%` : `${formatNumber(val)}%`;
            const raw = item ? formatNumber(item.rawCount ?? item.value ?? 0) : formatNumber(val);
            return `${raw} / ${percent}`;
          },
        },
      },
    };

    if (reportsState.charts.status) {
      reportsState.charts.status.updateOptions({ ...options }, true, true);
      reportsState.charts.status.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.status = new ApexCharts(container, { ...options, series });
      reportsState.charts.status.render();
    }

    renderProgressSection(listContainerId, sanitized);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render status chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}

export async function renderPaymentChart(data) {
  const container = document.getElementById('reports-payment-chart');
  const listContainerId = 'reports-payment-breakdown';
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastPaymentData = sanitized;

  const series = sanitized.map((item) => Math.max(0, item.value || 0));
  const sumSeries = series.reduce((a, b) => a + b, 0);

  if (!sanitized.length || sumSeries === 0) {
    if (reportsState.charts.payment) {
      reportsState.charts.payment.destroy();
      reportsState.charts.payment = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      return;
    }

    const labels = sanitized.map((item) => item.label);

    const options = {
      chart: {
        type: 'pie',
        height: 300,
        fontFamily: 'Tajawal, sans-serif',
        toolbar: { show: false },
        background: 'transparent',
        events: {
          dataPointSelection: (_event, _chartContext, config) => {
            if (config?.dataPointIndex != null) {
              const item = reportsState.lastPaymentData[config.dataPointIndex];
              if (item?.filterKey) {
                reportsState.callbacks.onPaymentDrilldown?.(item, config.dataPointIndex);
              }
            }
          },
        },
      },
      theme: { mode: getThemeMode() },
      labels,
      series,
      colors: ['#00ac69', '#f43f5e'],
      legend: { position: 'bottom' },
      dataLabels: {
        formatter: (val) => `${Math.round(val)}%`,
      },
      tooltip: {
        y: {
          formatter: (val, opts) => {
            const item = reportsState.lastPaymentData?.[opts?.seriesIndex || 0];
            const percent = item ? `${formatNumber(item.percent)}%` : `${formatNumber(val)}%`;
            const raw = item ? formatNumber(item.rawCount ?? item.value ?? 0) : formatNumber(val);
            return `${raw} / ${percent}`;
          },
        },
      },
    };

    if (reportsState.charts.payment) {
      reportsState.charts.payment.updateOptions({ ...options }, true, true);
      reportsState.charts.payment.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.payment = new ApexCharts(container, { ...options, series });
      reportsState.charts.payment.render();
    }

    renderProgressSection(listContainerId, sanitized);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render payment chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
  }
}
