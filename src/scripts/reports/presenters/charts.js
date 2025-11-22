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

function toggleChartLoading(kind, loading) {
  const el = document.querySelector(`[data-chart-loading="${kind}"]`);
  if (!el) return;
  el.style.display = loading ? '' : 'none';
}

export async function renderTrendChart(data) {
  const container = document.getElementById('reports-volume-chart');
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastTrendData = sanitized;
  toggleChartLoading('volume', true);

  if (!sanitized.length) {
    if (reportsState.charts.trend) {
      reportsState.charts.trend.destroy();
      reportsState.charts.trend = null;
    }
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('volume', false);
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      toggleChartLoading('volume', false);
      return;
    }

    const categories = sanitized.map((item) => item.label);
    const reservationsSeries = sanitized.map((item) => Math.round(item.count || 0));
    const revenueSeries = sanitized.map((item) => Number(item.revenue || 0));
    const netSeries = sanitized.map((item) => Number(item.netProfit || 0));
    const maSeries = sanitized.map((item) => (item.movingAvgRevenue != null ? Number(item.movingAvgRevenue) : null));

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
        yAxisIndex: 1,
      },
      {
        name: translate('reservations.reports.chart.volume.series.net', 'صافي الربح (SR)', 'Net profit (SR)'),
        type: 'line',
        data: netSeries,
        yAxisIndex: 1,
      },
      {
        name: translate('reservations.reports.chart.volume.series.movingAvg', 'متوسط متحرك (٣ أشهر)', '3-mo Moving Avg'),
        type: 'line',
        data: maSeries,
        yAxisIndex: 1,
      },
    ];

    const viewportWidth = typeof window !== 'undefined'
      ? (window.innerWidth || document.documentElement?.clientWidth || 1024)
      : 1024;
    const compactView = Number.isFinite(viewportWidth) && viewportWidth < 768;
    const chartHeight = compactView ? 420 : 340;

    const options = {
      chart: {
        type: 'line',
        height: chartHeight,
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
        size: [0, 4, 4, 0],
      },
      colors: ['#6366f1', '#22c55e', '#f97316', '#0ea5e9'],
      dataLabels: { enabled: false },
      fill: { type: 'solid', opacity: 1 },
      stroke: { curve: 'smooth', width: [0, 2, 2, 2], dashArray: [0, 0, 0, 6] },
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
        custom: ({ series, dataPointIndex, w }) => {
          const item = reportsState.lastTrendData?.[dataPointIndex] || {};
          const cat = categories?.[dataPointIndex] || '';
          const lines = [];
          // Reservations count
          const s0 = series?.[0]?.[dataPointIndex];
          if (s0 != null) lines.push(`<div><span>📦</span> ${formatNumber(s0)}</div>`);
          // Revenue with YoY/MoM
          const s1 = series?.[1]?.[dataPointIndex];
          if (s1 != null) {
            const yoy = Number.isFinite(item.yoyChange) ? `${item.yoyChange >= 0 ? '+' : ''}${formatNumber(Math.round(item.yoyChange))}% YoY` : '';
            const mom = Number.isFinite(item.momChange) ? `${item.momChange >= 0 ? '+' : ''}${formatNumber(Math.round(item.momChange))}% MoM` : '';
            const deltas = [yoy, mom].filter(Boolean).join(' · ');
            lines.push(`<div><span>💰</span> ${formatCurrency(s1)}${deltas ? ` <small class="text-base-content/60">(${deltas})</small>` : ''}</div>`);
          }
          // Net profit
          const s2 = series?.[2]?.[dataPointIndex];
          if (s2 != null) lines.push(`<div><span>🧮</span> ${formatCurrency(s2)}</div>`);
          // Moving average
          const s3 = series?.[3]?.[dataPointIndex];
          if (s3 != null) lines.push(`<div><span>📈</span> ${formatCurrency(s3)}</div>`);
          return `
            <div class="apex-tooltip">
              <div class="mb-1 font-semibold">${cat}</div>
              ${lines.join('')}
            </div>
          `;
        },
      },
    };

    const themeMode = getThemeMode();
    const categoriesSig = String(categories.join('|'));
    const prevMeta = reportsState.chartsMeta.trend;
    const canSeriesOnly = reportsState.charts.trend
      && prevMeta.theme === themeMode
      && prevMeta.categoriesSig === categoriesSig;

    if (reportsState.charts.trend && canSeriesOnly) {
      reportsState.charts.trend.updateSeries(series, true);
    } else if (reportsState.charts.trend) {
      reportsState.charts.trend.updateOptions({ ...options }, true, true);
      reportsState.charts.trend.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.trend = new ApexCharts(container, { ...options, series });
      reportsState.charts.trend.render();
    }
    reportsState.chartsMeta.trend = { categoriesSig, theme: themeMode };
    toggleChartLoading('volume', false);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render trend chart', error);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('volume', false);
  }
}

export async function renderStatusChart(data) {
  const container = document.getElementById('reports-status-chart');
  const listContainerId = 'reports-status-breakdown';
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastStatusData = sanitized;
  toggleChartLoading('status', true);

  const series = sanitized.map((item) => Math.max(0, item.value || 0));
  const sumSeries = series.reduce((a, b) => a + b, 0);

  if (!sanitized.length || sumSeries === 0) {
    if (reportsState.charts.status) {
      reportsState.charts.status.destroy();
      reportsState.charts.status = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('status', false);
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      toggleChartLoading('status', false);
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
      // confirmed, pending, completed, cancelled
      colors: ['#22c55e', '#f97316', '#6366f1', '#ef4444'],
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

    const themeMode = getThemeMode();
    const labelsSig = String(labels.join('|'));
    const prevMeta = reportsState.chartsMeta.status;
    const canSeriesOnly = reportsState.charts.status
      && prevMeta.theme === themeMode
      && prevMeta.labelsSig === labelsSig;

    if (reportsState.charts.status && canSeriesOnly) {
      reportsState.charts.status.updateSeries(series, true);
    } else if (reportsState.charts.status) {
      reportsState.charts.status.updateOptions({ ...options }, true, true);
      reportsState.charts.status.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.status = new ApexCharts(container, { ...options, series });
      reportsState.charts.status.render();
    }

    renderProgressSection(listContainerId, sanitized);
    reportsState.chartsMeta.status = { labelsSig, theme: themeMode };
    toggleChartLoading('status', false);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render status chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('status', false);
  }
}

export async function renderPaymentChart(data) {
  const container = document.getElementById('reports-payment-chart');
  const listContainerId = 'reports-payment-breakdown';
  if (!container) return;

  const sanitized = Array.isArray(data) ? data : [];
  reportsState.lastPaymentData = sanitized;
  toggleChartLoading('payment', true);

  const series = sanitized.map((item) => Math.max(0, item.value || 0));
  const sumSeries = series.reduce((a, b) => a + b, 0);

  if (!sanitized.length || sumSeries === 0) {
    if (reportsState.charts.payment) {
      reportsState.charts.payment.destroy();
      reportsState.charts.payment = null;
    }
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('payment', false);
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    if (!ApexCharts) {
      renderProgressSection(listContainerId, []);
      container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
      toggleChartLoading('payment', false);
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
      // paid, partial, unpaid
      colors: ['#00ac69', '#f59e0b', '#f43f5e'],
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

    const themeMode = getThemeMode();
    const labelsSig = String(labels.join('|'));
    const prevMeta = reportsState.chartsMeta.payment;
    const canSeriesOnly = reportsState.charts.payment
      && prevMeta.theme === themeMode
      && prevMeta.labelsSig === labelsSig;

    if (reportsState.charts.payment && canSeriesOnly) {
      reportsState.charts.payment.updateSeries(series, true);
    } else if (reportsState.charts.payment) {
      reportsState.charts.payment.updateOptions({ ...options }, true, true);
      reportsState.charts.payment.updateSeries(series, true);
    } else {
      container.innerHTML = '';
      reportsState.charts.payment = new ApexCharts(container, { ...options, series });
      reportsState.charts.payment.render();
    }

    renderProgressSection(listContainerId, sanitized);
    reportsState.chartsMeta.payment = { labelsSig, theme: themeMode };
    toggleChartLoading('payment', false);
  } catch (error) {
    console.error('⚠️ [reports] Failed to render payment chart', error);
    renderProgressSection(listContainerId, []);
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    toggleChartLoading('payment', false);
  }
}

export async function renderStatusStackedMonthly(data) {
  const container = document.getElementById('reports-status-stacked-chart');
  if (!container) return;

  const rows = Array.isArray(data) ? data : [];
  if (!rows.length) {
    container.innerHTML = `<p class="text-base-content/60 text-sm">${translate('reservations.reports.progress.empty', 'لا توجد بيانات لعرضها.', 'No data to display.')}</p>`;
    return;
  }

  try {
    const ApexCharts = await ensureApexCharts();
    const categories = rows.map((r) => r.label);
    const confirmed = rows.map((r) => r.confirmed || 0);
    const cancelled = rows.map((r) => r.cancelled || 0);
    const series = [
      { name: translate('reservations.reports.status.confirmedLabel', 'مؤكدة', 'Confirmed'), data: confirmed },
      { name: translate('reservations.reports.status.cancelledLabel', 'ملغاة', 'Cancelled'), data: cancelled },
    ];
    const options = {
      chart: { type: 'bar', height: 320, stacked: true, toolbar: { show: false } },
      series,
      xaxis: { categories },
      plotOptions: { bar: { columnWidth: '55%', borderRadius: 6 } },
      colors: ['#22c55e', '#ef4444'],
      dataLabels: { enabled: false },
      legend: { position: 'bottom' },
    };
    container.innerHTML = '';
    const chart = new ApexCharts(container, options);
    chart.render();
  } catch (e) {
    console.error('[reports] failed to render stacked status chart', e);
  }
}
