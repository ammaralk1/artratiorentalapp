export interface ReportsChartProjectLike {
  status?: unknown;
  start?: Date | null;
  overallTotal?: unknown;
  title?: unknown;
  projectCode?: unknown;
  expensesTotal?: unknown;
  clientName?: unknown;
  clientCompany?: unknown;
}

interface ChartDeps {
  t: (key: string, fallback?: string) => string;
  formatCompactNumber: (value: unknown) => string;
  getChartLocale: () => string;
}

interface ApexRendererDeps {
  ChartLib: any;
  charts: Record<string, any>;
  key: string;
  element: Element | null;
  options?: Record<string, any>;
}

const STATUS_ORDER = ['upcoming', 'ongoing', 'completed'];

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
    colors: ['#3b82f6', '#fbbf24', '#22c55e'],
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
) {
  const monthBuckets = new Map<string, { total: number; label: string }>();
  const formatter = new Intl.DateTimeFormat(deps.getChartLocale(), { month: 'short', year: 'numeric' });

  projects.forEach((project) => {
    if (!project.start || Number.isNaN(project.start.getTime())) return;
    const bucketKey = `${project.start.getFullYear()}-${project.start.getMonth() + 1}`;
    const current = monthBuckets.get(bucketKey) || { total: 0, label: formatter.format(project.start) };
    current.total += Number(project.overallTotal || 0);
    monthBuckets.set(bucketKey, current);
  });

  const sortedKeys = Array.from(monthBuckets.keys()).sort((a, b) => {
    const [aYear, aMonth] = a.split('-').map(Number);
    const [bYear, bMonth] = b.split('-').map(Number);
    if (aYear === bYear) return aMonth - bMonth;
    return aYear - bYear;
  });

  const limitedKeys = sortedKeys.slice(-12);
  const labels = limitedKeys.map((key) => monthBuckets.get(key)?.label || key);
  const values = limitedKeys.map((key) => Math.round(monthBuckets.get(key)?.total || 0));
  const series = values.length
    ? [{ name: deps.t('projects.reports.datasets.value', 'Total value'), data: values }]
    : [];

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
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.35,
        opacityFrom: 0.5,
        opacityTo: 0.05,
      },
    },
    markers: { size: 4 },
    colors: ['#4c6ef5'],
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
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
  const topProjects = [...projects]
    .sort((a, b) => Number(b.overallTotal || 0) - Number(a.overallTotal || 0))
    .slice(0, 6);

  const labels = topProjects.map((project) => String(project.title || project.projectCode || ''));
  const valueData = topProjects.map((project) => Math.round(Number(project.overallTotal || 0)));
  const expenseData = topProjects.map((project) => Math.round(Number(project.expensesTotal || 0)));
  const series = labels.length
    ? [
        { name: deps.t('projects.reports.datasets.value', 'Total value'), data: valueData },
        { name: deps.t('projects.reports.datasets.expenses', 'تكلفة الخدمات الإنتاجية'), data: expenseData },
      ]
    : [];

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
    legend: {
      position: 'bottom',
      fontSize: '13px',
    },
    colors: ['#4c6ef5', '#f472b6'],
    tooltip: {
      y: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
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
      height: 320,
      toolbar: { show: false },
    },
    series,
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '60%',
      },
    },
    xaxis: {
      categories: labels,
      labels: {
        rotate: -35,
      },
    },
    yaxis: {
      labels: {
        formatter: (value: unknown) => deps.formatCompactNumber(value),
      },
    },
    dataLabels: { enabled: false },
    colors: ['#3b82f6'],
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
