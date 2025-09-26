import { loadData, saveData } from './storage.js';
import { showToast } from './utils.js';
import { syncEquipmentStatuses } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { t } from './language.js';

function runSharedRefresh() {
  syncEquipmentStatuses();
  syncTechniciansStatuses();
}

export function deleteReservation(index, { onAfterChange } = {}) {
  const { reservations = [] } = loadData();
  if (!Array.isArray(reservations) || !reservations[index]) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  const [removedReservation] = reservations.splice(index, 1);
  saveData({ reservations });

  runSharedRefresh();
  onAfterChange?.({ type: 'deleted', reservation: removedReservation });
  showToast(t('reservations.toast.deleted', '🗑️ تم حذف الحجز'));
  return true;
}

export function confirmReservation(index, { onAfterChange } = {}) {
  const { reservations = [] } = loadData();
  const reservation = reservations[index];
  if (!reservation) {
    showToast(t('reservations.toast.notFound', '⚠️ تعذر العثور على بيانات الحجز'));
    return false;
  }

  reservation.confirmed = true;
  saveData({ reservations });

  runSharedRefresh();
  onAfterChange?.({ type: 'confirmed', reservation });
  showToast(t('reservations.toast.confirmed', '✅ تم تأكيد الحجز'));
  return true;
}
