// Legacy compatibility shim.
// The active dashboard bootstrap owner is `src/main.js`.
// Keep this file as a thin delegate so any accidental legacy import
// does not reactivate a second independent init path.
import '../main.js';

if (typeof window !== 'undefined' && !window.__ART_RATIO_LEGACY_MAIN_WARNED__) {
  window.__ART_RATIO_LEGACY_MAIN_WARNED__ = true;
  console.warn('⚠️ [legacy-main] src/scripts/main.js is deprecated; use src/main.js as the dashboard entrypoint.');
}
