import { getMaintenanceState } from '../maintenanceService.js';

const initialTickets = getMaintenanceState();

export const state = {
  tickets: initialTickets,
  initialized: false,
  equipmentOptions: [],
  currentSelection: null,
  loading: false,
  errorMessage: '',
  hasLoaded: initialTickets.length > 0,
  closeTicket: {
    id: null,
    equipmentDesc: '',
    equipmentBarcode: '',
    repairCost: null,
    resolvedAt: null,
    mode: 'close',
  },
  closeTicketModal: null,
  closeTicketReportInput: null,
  closeTicketCostInput: null,
  closeTicketSubmitButton: null,
  closeTicketDetailsContainer: null,
  reportModal: null,
  reportModalContent: null,
  reportModalEditButton: null,
  reportModalLastTicketId: null,
};

export function loadTickets() {
  state.tickets = getMaintenanceState();
  return state.tickets;
}

export function getTicketById(id) {
  return state.tickets.find((item) => Number(item.id) === Number(id)) || null;
}
