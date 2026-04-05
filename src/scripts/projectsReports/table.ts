export interface ReportsSortState {
  key: string;
  dir: 'asc' | 'desc';
}

interface TableProjectLike {
  id?: unknown;
  title?: unknown;
  projectCode?: unknown;
  clientName?: unknown;
  status?: unknown;
  start?: Date | string | null;
  end?: Date | string | null;
  overallTotal?: unknown;
  paymentStatus?: unknown;
  applyTax?: unknown;
  raw?: Record<string, unknown> | null;
  [key: string]: unknown;
}

interface TableMetricsLike {
  marginPercent?: number;
  resFinal?: number;
  resTax?: number;
  resNetRevenue?: number;
  equipmentEstimate?: number;
  servicesRevenue?: number;
  projectExpenses?: number;
  netProfit?: number;
}

interface TableDeps {
  t: (key: string, fallback?: string) => string;
  escapeHtml: (value: unknown) => string;
  formatCurrency: (value: unknown) => string;
  formatPercent: (value: unknown) => string;
  formatNumber: (value: unknown) => string;
  formatProjectPeriod: (start: unknown, end: unknown) => string;
  computeMetrics: (project: TableProjectLike) => TableMetricsLike;
  resolveProjectPaymentState: (project: TableProjectLike) => 'paid' | 'partial' | 'unpaid';
}

const SORTABLE_LABEL_KEYS: Record<string, string> = {
  project: 'projects.reports.table.columns.project',
  client: 'projects.reports.table.columns.client',
  status: 'projects.reports.table.columns.status',
  period: 'projects.reports.table.columns.period',
  value: 'projects.reports.table.columns.value',
  margin: 'projects.reports.table.columns.margin',
  payment: 'projects.reports.table.columns.payment',
};

export function getNextSortState(
  current: ReportsSortState,
  key: string,
): ReportsSortState {
  if (current.key === key) {
    return {
      key,
      dir: current.dir === 'asc' ? 'desc' : 'asc',
    };
  }

  return {
    key,
    dir: (key === 'project' || key === 'client' || key === 'status') ? 'asc' : 'desc',
  };
}

export function buildSortTitle(
  key: string,
  dir: 'asc' | 'desc' | null,
  deps: Pick<TableDeps, 't'>,
) {
  const colLabel = deps.t(SORTABLE_LABEL_KEYS[key] || '', key);
  if (!dir) {
    return `${colLabel} — ${deps.t('projects.reports.table.sortable', 'قابل للفرز')}`;
  }
  const dirLabel = dir === 'asc'
    ? deps.t('projects.reports.table.sort.asc', 'ترتيب تصاعدي')
    : deps.t('projects.reports.table.sort.desc', 'ترتيب تنازلي');
  return `${colLabel} — ${dirLabel}`;
}

export function sortProjects(
  list: TableProjectLike[],
  sortState: ReportsSortState,
  deps: Pick<TableDeps, 'computeMetrics'>,
) {
  const dirMul = sortState.dir === 'asc' ? 1 : -1;
  const key = sortState.key;
  const cmp = (a: TableProjectLike, b: TableProjectLike) => {
    switch (key) {
      case 'project': {
        const aa = String(a.title || a.projectCode || '').toLowerCase();
        const bb = String(b.title || b.projectCode || '').toLowerCase();
        return aa.localeCompare(bb, 'ar');
      }
      case 'client': {
        const aa = String(a.clientName || '').toLowerCase();
        const bb = String(b.clientName || '').toLowerCase();
        return aa.localeCompare(bb, 'ar');
      }
      case 'status': {
        const aa = String(a.status || '');
        const bb = String(b.status || '');
        return aa.localeCompare(bb, 'ar');
      }
      case 'period': {
        const aa = a.start ? new Date(a.start).getTime() : 0;
        const bb = b.start ? new Date(b.start).getTime() : 0;
        return aa - bb;
      }
      case 'value':
        return Number(a.overallTotal || 0) - Number(b.overallTotal || 0);
      case 'margin': {
        const ma = deps.computeMetrics(a).marginPercent || 0;
        const mb = deps.computeMetrics(b).marginPercent || 0;
        return ma - mb;
      }
      case 'payment': {
        const prio = (payment: unknown) => (payment === 'paid' ? 2 : (payment === 'partial' ? 1 : 0));
        return prio(a.paymentStatus) - prio(b.paymentStatus);
      }
      default:
        return Number(a.overallTotal || 0) - Number(b.overallTotal || 0);
    }
  };

  return [...list].sort((a, b) => dirMul * cmp(a, b));
}

export function renderProjectsTable(params: {
  projects: TableProjectLike[];
  totalProjects: number;
  sortState: ReportsSortState;
  isDebug?: boolean;
  deps: TableDeps;
}) {
  const {
    projects,
    totalProjects,
    sortState,
    isDebug = false,
    deps,
  } = params;

  if (!projects.length) {
    return {
      isEmpty: true,
      rowsHtml: '',
      metaText: '',
    };
  }

  const rowsHtml = sortProjects(projects, sortState, { computeMetrics: deps.computeMetrics }).map((project) => {
    const metrics = deps.computeMetrics(project);
    const periodLabel = deps.formatProjectPeriod(project.start, project.end);
    const statusLabel = deps.t(`projects.status.${project.status}`, String(project.status || ''));
    const statusChip = `<span class="timeline-status-badge timeline-status-badge--${project.status}">${deps.escapeHtml(statusLabel)}</span>`;
    const paymentState = deps.resolveProjectPaymentState(project);
    const paymentClass = paymentState === 'paid' ? 'status-paid' : (paymentState === 'partial' ? 'status-partial' : 'status-unpaid');
    const paymentText = paymentState === 'paid'
      ? deps.t('reservations.list.payment.paid', '💳 مدفوع')
      : (paymentState === 'partial'
          ? deps.t('reservations.list.payment.partial', '💳 مدفوع جزئياً')
          : deps.t('reservations.list.payment.unpaid', '💳 غير مدفوع'));
    const paymentChip = `<span class="reservation-chip ${paymentClass}">${deps.escapeHtml(paymentText)}</span>`;
    const clientLabel = deps.escapeHtml(project.clientName || deps.t('projects.fallback.unknownClient', 'Unknown client'));

    const mainRow = `
      <tr>
        <td>
          <div class="d-flex flex-column gap-1">
            <span class="fw-semibold">${deps.escapeHtml(project.title || project.projectCode)}</span>
            <small class="text-muted">${deps.escapeHtml(`#${project.projectCode}`)}</small>
          </div>
        </td>
        <td>${clientLabel}</td>
        <td>${statusChip}</td>
        <td>${deps.escapeHtml(periodLabel)}</td>
        <td>${deps.escapeHtml(deps.formatCurrency(project.overallTotal))}</td>
        <td>${deps.escapeHtml(deps.formatPercent(metrics.marginPercent))}</td>
        <td>${paymentChip}</td>
      </tr>
    `;

    if (!isDebug) return mainRow;

    const debugBits = [];
    debugBits.push(`resFinal=${Math.round(metrics.resFinal || 0)}`);
    debugBits.push(`resTax=${Math.round(metrics.resTax || 0)}`);
    debugBits.push(`resNet=${Math.round(metrics.resNetRevenue || 0)}`);
    debugBits.push(`equipEst=${Math.round(metrics.equipmentEstimate || 0)}`);
    debugBits.push(`services=${Math.round(metrics.servicesRevenue || 0)}`);
    debugBits.push(`expenses=${Math.round(metrics.projectExpenses || 0)}`);
    debugBits.push(`netProfit=${Math.round(metrics.netProfit || 0)}`);
    debugBits.push(`margin=${Number(((metrics.marginPercent || 0)).toFixed(1))}%`);
    const shareEnabled = project?.raw?.companyShareEnabled === true || String(project?.raw?.companyShareEnabled).toLowerCase() === 'true';
    const sharePercent = shareEnabled ? (Number(project?.raw?.companySharePercent) || 0) : 0;
    const discountVal = Number(project?.raw?.discount ?? 0) || 0;
    const discountType = (project?.raw?.discountType === 'amount') ? 'amount' : 'percent';
    debugBits.push(`share%=${sharePercent}`);
    debugBits.push(`disc=${discountVal}${discountType === 'amount' ? '' : '%'}`);
    debugBits.push(`applyTax=${project.applyTax ? 'Y' : 'N'}`);

    return `${mainRow}
      <tr class="reports-debug-row">
        <td colspan="7">
          <code class="reports-debug-code">${deps.escapeHtml(debugBits.join('  |  '))}</code>
        </td>
      </tr>
    `;
  }).join('');

  const metaTemplate = deps.t('projects.reports.table.meta', 'Showing {count} of {total} projects');
  const metaText = metaTemplate
    .replace('{count}', deps.formatNumber(projects.length))
    .replace('{total}', deps.formatNumber(totalProjects));

  return {
    isEmpty: false,
    rowsHtml,
    metaText,
  };
}
