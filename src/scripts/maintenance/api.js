import { showToast } from '../utils.js';
import { t } from '../language.js';
import {
  refreshMaintenanceFromApi,
  getMaintenanceState,
  isApiError as isMaintenanceApiError,
} from '../maintenanceService.js';
import { state } from './state.js';
import { renderMaintenance } from './render.js';

export async function loadMaintenanceFromApi({ showToastOnError = true } = {}) {
  if (state.loading) return;

  state.loading = true;
  state.errorMessage = '';
  renderMaintenance();

  try {
    await refreshMaintenanceFromApi();
    state.hasLoaded = true;
  } catch (error) {
    // Suppress noisy errors during logout/unauthorized state
    if (error && typeof error === 'object' && Number(error.status) === 401) {
      state.hasLoaded = state.tickets.length > 0;
      state.errorMessage = '';
    } else {
      state.hasLoaded = state.tickets.length > 0;
      console.error('❌ [maintenance] Failed to load maintenance tickets', error);
      state.errorMessage = isMaintenanceApiError(error)
        ? error.message
        : t('maintenance.toast.fetchFailed', 'تعذر تحميل بيانات الصيانة. حاول تحديث الصفحة.');
      if (showToastOnError) {
        showToast(state.errorMessage, 'error');
      }
    }
  } finally {
    state.loading = false;
    state.tickets = getMaintenanceState();
    renderMaintenance();
  }
}
