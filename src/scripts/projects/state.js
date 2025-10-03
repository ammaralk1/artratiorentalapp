export const state = {
  customers: [],
  technicians: [],
  equipment: [],
  reservations: [],
  projects: [],
  selectedTechnicians: [],
  selectedEquipment: [],
  expenses: [],
  filters: {
    search: ''
  },
  visibleProjects: [],
  editingProjectId: null,
  pendingProjectDetailId: null,
  pendingProjectEditId: null
};

export const dom = {};

export function resetSelections() {
  state.selectedTechnicians = [];
  state.selectedEquipment = [];
  state.expenses = [];
}
