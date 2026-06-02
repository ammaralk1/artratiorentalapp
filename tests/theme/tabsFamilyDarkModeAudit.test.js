import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SHELL_PATH = resolve(process.cwd(), 'src/pages/_partials/tabs-manager-shell.html');
const APP_CSS_PATH = resolve(process.cwd(), 'src/styles/app.css');
const CORE_CSS_PATH = resolve(process.cwd(), 'src/styles/core.css');

const TABS_PAGES = {
  home: {
    path: 'src/pages/home.html',
    expectedMarkers: ['home-main-tabbar'],
  },
  customer: {
    path: 'src/pages/customer.html',
    expectedMarkers: [
      '"bodyClass":"details-page customer-page"',
      'customer-financial-stats',
      'detail-tabbar',
      'id="projectDetailsModal"',
    ],
  },
  technician: {
    path: 'src/pages/technician.html',
    expectedMarkers: [
      '"bodyClass":"details-page technician-page"',
      'technician-financial-stats',
      'technician-tabbar',
      'id="technician-financial-modal"',
    ],
  },
};

const DARK_SELECTOR = ':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"])';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('tabs family dark mode audit', () => {
  it('keeps the extracted tabs family on the shared shell dark-mode path without inline dark drift', () => {
    const shellSource = readSource('src/pages/_partials/tabs-manager-shell.html');

    expect(shellSource).toContain('body class="page-shell theme-loading {{bodyClass}} auth-pending"');
    expect(shellSource).toContain('data-theme-toggle');
    expect(shellSource).toContain('id="theme-toggle"');
    expect(shellSource).toContain('dashboard-greeting-panel');

    Object.values(TABS_PAGES).forEach(({ path, expectedMarkers }) => {
      const pageSource = readSource(path);

      expect(pageSource).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
      expect(pageSource).not.toMatch(/\bdark:/);

      expectedMarkers.forEach((marker) => {
        expect(pageSource).toContain(marker);
      });
    });
  });

  it('keeps the extracted tabs family aligned with the shared post-auth reveal contract', () => {
    const homeScript = readSource('src/scripts/home.js');
    const customerScript = readSource('src/scripts/customerPage.js');
    const technicianScript = readSource('src/scripts/technicianPage.js');

    expect(homeScript).toContain("document.body.classList.remove('auth-pending');");
    expect(customerScript).toContain("document.body.classList.remove('auth-pending');");
    expect(technicianScript).toContain("document.body.classList.remove('auth-pending');");
  });

  it('keeps explicit shared dark styling for tabs-family shell, detail, and modal surfaces in app.css', () => {
    const appCss = readSource(APP_CSS_PATH);

    expect(appCss).toContain(`${DARK_SELECTOR} .dashboard-greeting-panel {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .dashboard-tabbar {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .dashboard-tabbar .tab-button:hover {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .glass-card:not(.dashboard-greeting-panel):not(.primary-actions-card),`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .form-control,`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .filters-bar {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .detail-tabbar .tab-button.tab-active`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .detail-payment-breakdown .detail-payment-line {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .technician-page .modal-content`);
    expect(appCss).toContain(`${DARK_SELECTOR} #technician-financial-modal-summary {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .details-page .technician-financial-modal .technician-financial-table__row > * {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .btn-close {`);
    expect(appCss).toContain(`${DARK_SELECTOR} .btn.modal-close-btn {`);
  });

  it('keeps shared dark foundations for theme toggle, modals, and flatpickr in core.css', () => {
    const coreCss = readSource(CORE_CSS_PATH);

    expect(coreCss).toContain(':root:where(.dark, .dark-mode, [data-theme="dark"]),');
    expect(coreCss).toContain('body:where(.dark, .dark-mode, [data-theme="dark"]) {');
    expect(coreCss).toContain('.theme-toggle-btn {');
    expect(coreCss).toContain('.modal-content {');
    expect(coreCss).toContain('.modal-header .btn-close {');
    expect(coreCss).toMatch(/:where\(html\.dark,\s*body\.dark,\s*html\.dark-mode,\s*body\.dark-mode,\s*html\[data-theme="dark"\],\s*body\[data-theme="dark"\]\)\s+\.flatpickr-calendar\s*\{/);
  });

  it('records the targeted tabs-family dark-theme validation checkpoint in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 2 Tabs Family Dark Theme Audit');
    expect(masterPlan).toContain('targeted source-level dark-theme validation');
    expect(masterPlan).toContain('`tabsFamilyDarkModeAudit.test.js`');
    expect(masterPlan).toContain('manual browser dark-theme smoke validation is still pending');
  });
});
