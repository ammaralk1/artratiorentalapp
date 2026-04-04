import { AUTH_EVENTS } from './auth.js';
import { loadTickets } from './maintenance/state.js';
import {
  findEquipmentOptionByBarcode,
  updateSelectedInfo,
  getDefaultSelectionText,
} from './maintenance/equipment-selector.js';
import { setCloseModalLoading } from './maintenance/close-modal.js';
import { renderMaintenance } from './maintenance/render.js';

export { renderMaintenance };
export { initMaintenance } from './maintenance/actions.js';

document.addEventListener('language:changed', () => {
  const hidden = document.getElementById('maintenance-selected-barcode');
  const info = document.getElementById('maintenance-selected-info');
  if (hidden?.value) {
    const option = findEquipmentOptionByBarcode(hidden.value);
    if (option) {
      updateSelectedInfo(option);
    } else if (info) {
      info.textContent = getDefaultSelectionText();
    }
  } else if (info) {
    info.textContent = getDefaultSelectionText();
  }
  renderMaintenance();
  setCloseModalLoading(false);
});

document.addEventListener(AUTH_EVENTS.USER_UPDATED, () => {
  renderMaintenance();
});

window.addEventListener('maintenance:updated', () => {
  loadTickets();
  renderMaintenance();
});
