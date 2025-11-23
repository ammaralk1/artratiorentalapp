export const state = {
  customers: [],
  technicians: [],
  equipment: [],
  reservations: [],
  projects: [],
  selectedTechnicians: [],
  selectedEquipment: [],
  expenses: [],
  // Running total of per-item "سعر البيع" added via the create form
  servicesClientPriceTotal: 0,
  filters: {
    search: '',
    status: '',
    payment: '',
    type: '',
    confirmed: '',
    range: '',
    startDate: '',
    endDate: ''
  },
  visibleProjects: [],
  editingProjectId: null,
  pendingProjectDetailId: null,
  pendingProjectEditId: null,
  pendingLinkedToast: false,
  focusPagination: {
    page: 1,
    pageSize: 6,
    totalPages: 1,
  }
};

export const dom = {};

export function resetSelections() {
  state.selectedTechnicians = [];
  state.selectedEquipment = [];
  state.expenses = [];
  state.servicesClientPriceTotal = 0;
}
