import { ensurePinegrowPreviewSetup } from './pinegrow-preview.js';

if (typeof window === 'undefined') {
  throw new Error('Pinegrow home bootstrap must run in a browser context');
}

const isPinegrow = window.location.protocol === 'file:'
  || /\/src\/pages\//.test(window.location.pathname || '')
  || /\\src\\pages\\/.test(window.location.pathname || '');

if (isPinegrow) {
  ensurePinegrowPreviewSetup();
  (async () => {
    try {
      await import('./scripts/language.js');
      await import('./scripts/translations/common.js');
      await import('./scripts/home.js');
    } catch (error) {
      console.error('❌ Failed to bootstrap home page for Pinegrow', error);
    }
  })();
}
