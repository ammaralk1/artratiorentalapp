export interface ReportsChartProjectLike {
  status?: unknown;
  start?: Date | null;
  overallTotal?: unknown;
  title?: unknown;
  projectCode?: unknown;
  expensesTotal?: unknown;
  clientName?: unknown;
  clientCompany?: unknown;
  netProfit?: unknown;
  marginPercent?: unknown;
  type?: unknown;
}

interface ChartDeps {
  t: (key: string, fallback?: string) => string;
  formatCompactNumber: (value: unknown) => string;
  formatCurrency: (value: unknown) => string;
  getChartLocale: () => string;
}

interface ApexRendererDeps {
  ChartLib: any;
  charts: Record<string, any>;
  key: string;
  element: Element | null;
  options?: Record<string, any>;
}

function escapeTooltipHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const STATUS_ORDER = ['upcoming', 'ongoing', 'completed'];
const CHART_COLORS = {
  primary: '#4c6ef5',
  secondary: '#8EA586',
  accent: '#B7C9AE',
  success: 'var(--reports-success, #22c55e)',
  warning: '#f08c00',
  error: '#ef4444',
  muted: '#6B7C6E',
  completed: '#2f9e44',
};

function toValidDate(value: unknown): Date | null {
  if (!value) return null;
  const parsed = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function buildMonthKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

function aggregateByBucket(
  projects: ReportsChartProjectLike[],
  resolveBucket: (date: Date) => string | null,
  buildLabel: (date: Date) => string,
) {
  const buckets = new Map<string, { revenue: number; profit: number; count: number; label: string }>();

  projects.forEach((project) => {
    const date = toValidDate(project.start);
    if (!date) return;
    const bucketKey = resolveBucket(date);
    if (!bucketKey) return;
    const current = buckets.get(bucketKey) || {
      revenue: 0,
      profit: 0,
      count: 0,
      label: buildLabel(date),
    };
    current.revenue += Number(project.overallTotal || 0);
    current.profit += Number(project.netProfit || 0);
    current.count += 1;
    buckets.set(bucketKey, current);
  });

  return buckets;
}

export function buildStatusChartOptions(
  projects: ReportsChartProjectLike[],
  deps: Omit<ChartDeps, 'getChartLocale'>,
) {
  const counts = STATUS_ORDER.map((status) => projects.filter((project) => project.status === status).length);
  const labels = STATUS_ORDER.map((status) => deps.t(`projects.status.${status}`, status));
  const total = counts.reduce((sum, value) => sum + value, 0);
  const series = total > 0 ? counts : [];

  return {
    chart: {
      type: 'donut',
      height: 320,
      toolbar: { show: false },
    },
    labels,
    series,
    colors: [CHART_COLORS.primary, CHART_COLORS.warning, CHART_COLORS.completed],
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            value: {
              fontSize: '16px',
              fontWeight: 700,
            },
            total: {
              show: true,
              label: deps.t('projects.reports.charts.statusTotal', 'إجمالي المشاريع'),
              formatter: () => deps.formatCompactNumber(total),
            },
          },
        },
      },
    },
    dataLabels: {
      formatter: (val: number) => (Number.isFinite(val) ? `${Math.round(val)}%` : '0%'),
    },
    legend: {
      position: 'bottom',
      fontSize: '13px',
    },
    stroke: { width: 0 },
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: { height: 280 },
        },
      },
    ],
  };
}

export function buildTimelineChartOptions(
  projects: ReportsChartProjectLike[],
  deps: ChartDeps,
  options: {
    comparisonMode?: 'none' | 'month' | 'year';
    previousProjects?: ReportsChartProjectLike[];
  } = {},
) {
  const comparisonMode = options.comparisonMode || 'none';
  const previousProjects = Array.isArray(options.previousProjects) ? options.previousProjects : [];
  const formatter = new Intl.DateTimeFormat(deps.getChartLocale(), { month: 'short', year: 'numeric' });

  let labels: string[] = [];
  let currentRevenue: number[] = [];
  let previousRevenue: number[] = [];
  let currentProfit: number[] = [];

  if (comparisonMode === 'month') {
    const currentDay = Math.max(1, new Date().getDate());
    labels = Array.from({ length: currentDay }, (_, index) => String(index + 1));
    const currentBuckets = aggregateByBucket(
      projects,
      (date) => String(date.getDate()),
      (date) => String(date.getDate()),
    );
    const previousBuckets = aggregateByBucket(
      previousProjects,
      (date) => String(date.getDate()),
      (date) => String(date.getDate()),
    );
    currentRevenue = labels.map((label) => Math.round(currentBuckets.get(label)?.revenue || 0));
    currentProfit = labels.map((label) => Math.round(currentBuckets.get(label)?.profit || 0));
    previousRevenue = labels.map((label) => Math.round(previousBuckets.get(label)?.revenue || 0));
  } else if (comparisonMode === 'year') {
    const monthFormatter = new Intl.DateTimeFormat(deps.getChartLocale(), { month: 'short' });
    const currentMonthIndex = new Date().getMonth();
    const visibleMonths = Array.from({ length: currentMonthIndex + 1 }, (_, index) => index);
    labels = visibleMonths.map((monthIndex) => monthFormatter.format(new Date(2026, monthIndex, 1)));
    const currentBuckets = aggregateByBucket(
      projects,
      (date) => String(date.getMonth()),
      (date) => monthFormatter.format(date),
    );
    const previousBuckets = aggregateByBucket(
      previousProjects,
      (date) => String(date.getMonth()),
      (date) => monthFormatter.format(date),
    );
    currentRevenue = visibleMonths.map((monthIndex) => Math.round(currentBuckets.get(String(monthIndex))?.revenue || 0));
    currentProfit = visibleMonths.map((monthIndex) => Math.round(currentBuckets.get(String(monthIndex))?.profit || 0));
    previousRevenue = visibleMonths.map((monthIndex) => Math.round(previousBuckets.get(String(monthIndex))?.revenue || 0));
  } else {
    const monthBuckets = aggregateByBucket(
      projects,
      (date) => buildMonthKey(date),
      (date) => formatter.format(date),
    );
    const sortedKeys = Array.from(monthBuckets.keys()).sort((a, b) => {
      const [aYear, aMonth] = a.split('-').map(Number);
      const [bYear, bMonth] = b.split('-').map(Number);
      if (aYear === bYear) return aMonth - bMonth;
      return aYear - bYear;
    }).slice(-12);
    labels = sortedKeys.map((key) => monthBuckets.get(key)?.label || key);
    currentRevenue = sortedKeys.map((key) => Math.round(monthBuckets.get(key)?.revenue || 0));
    currentProfit = sortedKeys.map((key) => Math.round(monthBuckets.get(key)?.profit || 0));
  }

  const hasComparison = comparisonMode !== 'none' && previousRevenue.some((value) => value !== 0);
  const series = [];
  if (currentRevenue.length) {
    series.push({
      name: deps.t('projects.reports.datasets.value', 'Total value'),
      type: 'area',
      data: currentRevenue,
    });
  }
  if (currentProfit.length) {
    series.push({
      name: deps.t('projects.reports.datasets.netProfit', 'Net profit'),
      type: 'line',
      data: currentProfit,
    });
  }
  if (hasComparison) {
    series.push({
      name: deps.t('projects.reports.datasets.previousValue', 'Previous period revenue'),
      type: 'line',
      data: previousRevenue,
    });
  }

  return {
    chart: {
      type: 'area',
      height: 320,
      toolbar: { show: false },
    },
    series,
    xaxis: {
      categories: labels,
      labels: {
        rotate: -35,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: unknown) => deps.formatCurrency(value),
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: hasComparison ? [3, 3, 2] : [3, 3],
      dashArray: hasComparison ? [0, 0, 6] : [0, 0],
    },
    fill: {
      type: 'solid',
      opacity: 0.12,
    },
    markers: { size: 4 },
    colors: hasComparison
      ? [CHART_COLORS.primary, CHART_COLORS.success, CHART_COLORS.accent]
      : [CHART_COLORS.primary, CHART_COLORS.success],
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCurrency(value),
      },
    },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
  };
}

export function buildExpenseChartOptions(
  projects: ReportsChartProjectLike[],
  deps: Omit<ChartDeps, 'getChartLocale'>,
) {
  const selectedProjects = [...projects]
    .sort((a, b) => Number(b.expensesTotal || 0) - Number(a.expensesTotal || 0))
    .slice(0, 6);
  const labels = selectedProjects.map((project) => String(project.title || project.projectCode || ''));
  const valueData = selectedProjects.map((project) => Math.round(Number(project.overallTotal || 0)));
  const expenseData = selectedProjects.map((project) => Math.round(Number(project.expensesTotal || 0)));

  return {
    chart: {
      type: 'bar',
      height: Math.max(320, labels.length * 56 || 0),
      toolbar: { show: false },
    },
    series: labels.length
      ? [
          { name: deps.t('projects.reports.datasets.value', 'Total value'), data: valueData },
          { name: deps.t('projects.reports.datasets.expenses', 'Expenses'), data: expenseData },
        ]
      : [],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%',
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    dataLabels: { enabled: false },
    colors: [CHART_COLORS.primary, CHART_COLORS.warning],
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    legend: { position: 'bottom' },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
  };
}

export function buildProfitabilityChartOptions(
  projects: ReportsChartProjectLike[],
  deps: Omit<ChartDeps, 'getChartLocale'>,
) {
  const sortedProjects = [...projects]
    .filter((project) => Number.isFinite(Number(project.netProfit)))
    .sort((a, b) => Number(a.netProfit || 0) - Number(b.netProfit || 0));
  const selectedProjects = sortedProjects.length <= 6
    ? sortedProjects
    : [...sortedProjects.slice(0, 3), ...sortedProjects.slice(-3)]
        .sort((a, b) => Number(a.netProfit || 0) - Number(b.netProfit || 0));

  const labels = selectedProjects.map((project) => String(project.title || project.projectCode || ''));
  const marginLookup = new Map(labels.map((label, index) => [label, Number(selectedProjects[index]?.marginPercent || 0)]));
  const profitData = selectedProjects.map((project) => Math.round(Number(project.netProfit || 0)));
  const series = labels.length
    ? [{
        name: deps.t('projects.reports.datasets.netProfit', 'Net profit'),
        data: profitData,
      }]
    : [];
  const colors = selectedProjects.map((project) => {
    const profit = Number(project.netProfit || 0);
    const margin = Number(project.marginPercent || 0);
    if (profit < 0) return CHART_COLORS.error;
    if (margin < 15) return CHART_COLORS.warning;
    return CHART_COLORS.success;
  });

  return {
    chart: {
      type: 'bar',
      height: Math.max(320, labels.length * 60 || 0),
      toolbar: { show: false },
    },
    series,
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        barHeight: '55%',
        borderRadius: 8,
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    colors,
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
      custom: ({ dataPointIndex, series }: { dataPointIndex: number; series: number[][] }) => {
        const rawLabel = labels[dataPointIndex] || '';
        const safeLabel = escapeTooltipHtml(rawLabel);
        const margin = Number(marginLookup.get(rawLabel) || 0);
        const value = series?.[0]?.[dataPointIndex] ?? 0;
        return `
          <div class="apexcharts-tooltip-title">${safeLabel}</div>
          <div class="apexcharts-tooltip-series-group apexcharts-active">
            <span class="apexcharts-tooltip-text-label">${deps.t('projects.reports.datasets.netProfit', 'Net profit')}: </span>
            <span class="apexcharts-tooltip-text-value">${deps.formatCompactNumber(value)}</span>
          </div>
          <div class="apexcharts-tooltip-series-group apexcharts-active">
            <span class="apexcharts-tooltip-text-label">${deps.t('projects.reports.datasets.margin', 'Profit margin')}: </span>
            <span class="apexcharts-tooltip-text-value">${margin.toFixed(1)}%</span>
          </div>
        `;
      },
    },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
  };
}

export function buildClientsChartOptions(
  projects: ReportsChartProjectLike[],
  deps: Omit<ChartDeps, 'getChartLocale'>,
) {
  const clientTotals = new Map<string, number>();
  projects.forEach((project) => {
    const key = String(project.clientName || project.clientCompany || deps.t('projects.fallback.unknownClient', 'Unknown client'));
    const current = clientTotals.get(key) || 0;
    clientTotals.set(key, current + Number(project.overallTotal || 0));
  });

  const sortedClients = Array.from(clientTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const labels = sortedClients.map(([client]) => client);
  const values = sortedClients.map(([, total]) => Math.round(total));
  const series = values.length
    ? [{ name: deps.t('projects.reports.datasets.value', 'Total value'), data: values }]
    : [];

  return {
    chart: {
      type: 'bar',
      height: Math.max(320, labels.length * 56 || 0),
      toolbar: { show: false },
    },
    series,
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%',
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    yaxis: { labels: { show: true } },
    dataLabels: { enabled: false },
    colors: [CHART_COLORS.secondary],
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    legend: { show: false },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
  };
}

export function buildProjectTypeChartOptions(
  projects: ReportsChartProjectLike[],
  deps: Omit<ChartDeps, 'getChartLocale'>,
) {
  const TYPE_I18N: Record<string, string> = {
    commercial: 'projects.form.types.commercial',
    coverage: 'projects.form.types.coverage',
    photography: 'projects.form.types.photography',
    social: 'projects.form.types.social',
    event: 'projects.form.types.event',
    conference: 'projects.form.types.conference',
  };

  const translateType = (raw: string): string =>
    deps.t(TYPE_I18N[raw] ?? 'projects.form.types.unknown', raw);

  const typeTotals = new Map<string, { revenue: number; count: number; raw: string }>();

  projects.forEach((project) => {
    const raw = String(project.type || '').trim();
    const key = raw || deps.t('projects.reports.charts.types.unclassified', 'Unclassified');
    const current = typeTotals.get(key) || { revenue: 0, count: 0, raw: key };
    current.revenue += Number(project.overallTotal || 0);
    current.count += 1;
    typeTotals.set(key, current);
  });

  const sortedTypes = Array.from(typeTotals.entries())
    .sort((left, right) => right[1].revenue - left[1].revenue)
    .slice(0, 6);

  const labels = sortedTypes.map(([raw]) => translateType(raw));
  const values = sortedTypes.map(([, totals]) => Math.round(totals.revenue));
  const countLookup = new Map(sortedTypes.map(([raw, totals]) => [translateType(raw), totals.count]));
  const series = values.length
    ? [{ name: deps.t('projects.reports.datasets.revenue', 'Revenue'), data: values }]
    : [];

  return {
    chart: {
      type: 'bar',
      height: Math.max(320, labels.length * 56 || 0),
      toolbar: { show: false },
    },
    series,
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        barHeight: '58%',
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value: unknown) => deps.formatCurrency(value),
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    colors: [CHART_COLORS.primary],
    tooltip: {
      custom: ({ dataPointIndex, series }: { dataPointIndex: number; series: number[][] }) => {
        const rawLabel = labels[dataPointIndex] || '';
        const safeLabel = escapeTooltipHtml(rawLabel);
        const value = series?.[0]?.[dataPointIndex] ?? 0;
        const count = countLookup.get(rawLabel) || 0;
        return `
          <div class="apexcharts-tooltip-title">${safeLabel}</div>
          <div class="apexcharts-tooltip-series-group apexcharts-active">
            <span class="apexcharts-tooltip-text-label">${deps.t('projects.reports.datasets.revenue', 'Revenue')}: </span>
            <span class="apexcharts-tooltip-text-value">${deps.formatCurrency(value)}</span>
          </div>
          <div class="apexcharts-tooltip-series-group apexcharts-active">
            <span class="apexcharts-tooltip-text-label">${deps.t('projects.reports.datasets.projects', 'Projects')}: </span>
            <span class="apexcharts-tooltip-text-value">${deps.formatCompactNumber(count)}</span>
          </div>
        `;
      },
    },
    noData: {
      text: deps.t('projects.reports.noData', 'لا توجد بيانات متاحة'),
    },
  };
}

export function renderApexChart({
  ChartLib,
  charts,
  key,
  element,
  options = {},
}: ApexRendererDeps) {
  if (!ChartLib || !element) return;
  if (charts[key]) {
    try {
      charts[key].destroy();
    } catch (error) {
      console.warn(`⚠️ [projectsReports] Failed to destroy ${key} chart`, error);
    }
    delete charts[key];
  }

  (element as HTMLElement).innerHTML = '';

  const chartOptions = { ...options };
  if (!Array.isArray(chartOptions.series)) {
    chartOptions.series = [];
  }

  try {
    const chart = new ChartLib(element, chartOptions);
    charts[key] = chart;
    chart.render().catch((error: unknown) => {
      console.error(`❌ [projectsReports] Failed to render ${key} chart`, error);
    });
  } catch (error) {
    console.error(`❌ [projectsReports] Failed to render ${key} chart`, error);
  }
}
