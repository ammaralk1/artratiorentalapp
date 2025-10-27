export const reportsState = {
  filters: {
    range: 'all',
    status: 'all',
    payment: 'all',
    share: 'all',
    search: '',
    start: null,
    end: null,
  },
  data: {
    reservations: [],
    customers: [],
    equipment: [],
    technicians: [],
    projects: [],
    maintenance: [],
    projectsMap: new Map(),
  },
  formatters: {
    cachedLocale: null,
    numberFormatter: null,
  },
  initialized: false,
  languageListenerAttached: false,
  searchDebounceTimer: null,
  loading: false,
  errorMessage: '',
  emptyDefaults: {
    icon: null,
    title: null,
    subtitle: null,
  },
  dataListenersAttached: false,
  loadedScripts: new Map(),
  apexChartsReady: null,
  html2PdfReady: null,
  xlsxReady: null,
  techniciansIndex: null,
  charts: {
    trend: null,
    status: null,
    payment: null,
  },
  lastSnapshot: {
    filtered: [],
    metrics: null,
    trend: [],
    statusBreakdown: [],
    paymentBreakdown: [],
    tableRows: [],
    maintenance: { total: 0, items: [] },
  },
  columnPreferences: {
    code: true,
    customer: true,
    date: true,
    status: true,
    payment: true,
    total: true,
    share: true,
    net: true,
  },
  exportHandlersBound: false,
  columnControlsBound: false,
  drilldownBound: false,
  lastTrendData: [],
  lastStatusData: [],
  lastPaymentData: [],
  themeListenerAttached: false,
  startDatePicker: null,
  endDatePicker: null,
  startDateInputRef: null,
  endDateInputRef: null,
  callbacks: {
    onRender: null,
    onBeforeRender: null,
    onAfterRender: null,
    onTrendDrilldown: null,
    onStatusDrilldown: null,
    onPaymentDrilldown: null,
  },
  sort: {
    key: 'date',
    dir: 'desc',
  },
  pagination: {
    page: 1,
    pageSize: 50,
  },
};

export function setRenderCallback(callback) {
  reportsState.callbacks.onRender = typeof callback === 'function' ? callback : null;
}

export function setBeforeRenderCallback(callback) {
  reportsState.callbacks.onBeforeRender = typeof callback === 'function' ? callback : null;
}

export function setAfterRenderCallback(callback) {
  reportsState.callbacks.onAfterRender = typeof callback === 'function' ? callback : null;
}

export function setTrendDrilldownCallback(callback) {
  reportsState.callbacks.onTrendDrilldown = typeof callback === 'function' ? callback : null;
}

export function setStatusDrilldownCallback(callback) {
  reportsState.callbacks.onStatusDrilldown = typeof callback === 'function' ? callback : null;
}

export function setPaymentDrilldownCallback(callback) {
  reportsState.callbacks.onPaymentDrilldown = typeof callback === 'function' ? callback : null;
}

export function resetReportsCaches() {
  reportsState.formatters.cachedLocale = null;
  reportsState.formatters.numberFormatter = null;
  reportsState.loadedScripts.clear();
  reportsState.apexChartsReady = null;
  reportsState.html2PdfReady = null;
  reportsState.xlsxReady = null;
  reportsState.techniciansIndex = null;
}

export default reportsState;
