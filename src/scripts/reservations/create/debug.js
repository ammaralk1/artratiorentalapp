// ===== Crew debug helpers (safe no-op by default) =====
const CREW_DEBUG_FLAG = '__DEBUG_CREW__';
function isCrewDebugEnabled() {
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('debugCrew') === '1') return true;
      const ls = window.localStorage?.getItem(CREW_DEBUG_FLAG);
      if (ls && ['1', 'true', 'on', 'yes'].includes(String(ls).toLowerCase())) return true;
    }
  } catch (_) { /* ignore */ }
  return false;
}
export function crewDebugLog(label, data) {
  if (!isCrewDebugEnabled()) return;
  try {
    // eslint-disable-next-line no-console
    console.log(`🪵 [crew-debug:create] ${label}`, data);
  } catch (_) { /* ignore */ }
}

const RES_DEBUG_FLAG = '__DEBUG_RESERVATION__';
function isReservationDebugEnabled() {
  try {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search || '');
      if (params.get('debugReservation') === '1') return true;
      const ls = window.localStorage?.getItem(RES_DEBUG_FLAG);
      if (ls && ['1', 'true', 'on', 'yes'].includes(String(ls).toLowerCase())) return true;
    }
  } catch (_) { /* ignore */ }
  return false;
}
export function reservationDebugLog(label, data) {
  if (!isReservationDebugEnabled()) return;
  try {
    // eslint-disable-next-line no-console
    console.log(`🧭 [reservation:create] ${label}`, data ?? '');
  } catch (_) { /* ignore */ }
}
