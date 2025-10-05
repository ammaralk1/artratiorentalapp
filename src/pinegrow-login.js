import { ensurePinegrowPreviewSetup } from './pinegrow-preview.js';

if (typeof window === 'undefined') {
  throw new Error('Pinegrow login bootstrap must run in a browser context');
}

const isPinegrow = window.location.protocol === 'file:'
  || /\/src\/pages\//.test(window.location.pathname || '')
  || /\\src\\pages\\/.test(window.location.pathname || '');

if (isPinegrow) {
  ensurePinegrowPreviewSetup();
  (async () => {
    try {
      await import('./scripts/loginPage.js');
    } catch (error) {
      console.error('❌ Failed to bootstrap login page for Pinegrow', error);
    }
  })();
}
