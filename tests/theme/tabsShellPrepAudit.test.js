import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TABS_SHELL_PARTIAL = 'src/pages/_partials/tabs-manager-shell.html';

const TABS_PAGES = {
  'src/pages/home.html': {
    titleKey: 'home.nav.brand',
    usesSharedShell: true,
    greetingKey: 'home.nav.brand',
    pageScript: '/src/scripts/home.js',
    pageTranslations: [],
    requiresAfterShell: false,
    requiresBootstrap: false,
    requiresFlatpickr: false,
    requiresDetailModal: false,
    detailPageClass: false,
    specialMarker: 'home-main-tabbar',
  },
  'src/pages/customer.html': {
    titleKey: 'customerDetails.pageTitle',
    bodyClass: 'details-page customer-page',
    usesSharedShell: true,
    greetingKey: 'customerDetails.title',
    pageScript: '/src/scripts/customerPage.js',
    pageTranslations: ['/src/scripts/translations/projects.js', '/src/scripts/translations/customer.js'],
    requiresAfterShell: true,
    requiresBootstrap: true,
    requiresFlatpickr: true,
    requiresDetailModal: true,
    detailPageClass: true,
    specialMarker: 'customer-financial-stats',
  },
  'src/pages/technician.html': {
    titleKey: 'technicianDetails.pageTitle',
    bodyClass: 'details-page technician-page',
    usesSharedShell: true,
    greetingKey: 'technicianDetails.title',
    pageScript: '/src/scripts/technicianPage.js',
    pageTranslations: [
      '/src/scripts/translations/customer.js',
      '/src/scripts/translations/projects.js',
      '/src/scripts/translations/technician.js',
    ],
    requiresAfterShell: true,
    requiresBootstrap: true,
    requiresFlatpickr: true,
    requiresDetailModal: true,
    detailPageClass: true,
    specialMarker: 'technician-financial-stats',
  },
};

const SHARED_SHELL_MARKERS = [
  'id="sidebar-backdrop"',
  'id="dashboard-sidebar"',
  'sidebar-shell sidebar-drawer',
  'sidebar-panel sidebar-panel--stats',
  'sidebar-panel sidebar-panel--tabs',
  'dashboard-header',
  'dashboard-header-nav',
  'data-dashboard-greeting',
  'data-greeting-toggle',
  'data-greeting-panel',
  'id="language-toggle"',
  'data-theme-toggle',
  'id="logout-btn"',
];

const SHARED_TRANSLATIONS = [
  '/src/scripts/translations/common.js',
  '/src/scripts/translations/dashboard.js',
];

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('tabs shell prep audit', () => {
  it('keeps the tabs family aligned on the shared shell anchors and without quick-links drift', () => {
    const shellSource = readSource(TABS_SHELL_PARTIAL);

    expect(shellSource).toContain('body class="page-shell theme-loading {{bodyClass}} auth-pending"');
    expect(shellSource).toContain('{{slot:sidebarTabs}}');
    expect(shellSource).toContain('{{slot:greetingPanel}}');
    expect(shellSource).toContain('{{slot:mainContent}}');
    expect(shellSource).toContain('{{slot:afterShell}}');
    expect(shellSource).toContain('{{slot:pageScripts}}');
    expect(shellSource).not.toContain('sidebar-panel--links');

    SHARED_SHELL_MARKERS.forEach((marker) => {
      expect(shellSource).toContain(marker);
    });

    Object.entries(TABS_PAGES).forEach(([path, config]) => {
      const source = readSource(path);

      expect(source).toContain(config.specialMarker);

      if (config.usesSharedShell) {
        expect(source).toContain(`"titleKey":"${config.titleKey}"`);
        expect(source).toContain('<!-- @include "./_partials/manager-page-head.html"');
        expect(source).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
        expect(source).toContain('data-slot="sidebarTabs"');
        expect(source).toContain('data-slot="greetingPanel"');
        expect(source).toContain('data-slot="mainContent"');
        expect(source).toContain(`"greetingLabelKey":"${config.greetingKey}"`);
        expect(source).toContain(`"pageScript":"${config.pageScript}"`);

        if (config.bodyClass) {
          expect(source).toContain(`"bodyClass":"${config.bodyClass}"`);
        }

        if (config.requiresAfterShell) {
          expect(source).toContain('data-slot="afterShell"');
        } else {
          expect(source).not.toContain('data-slot="afterShell"');
        }

        if (path === 'src/pages/technician.html') {
          expect(source).toMatch(/id="technician-financial-open"[\s\S]*<\/template>\s*<template data-slot="mainContent">/);
          expect(source).not.toMatch(/id="technician-financial-open"[\s\S]*<\/section>\s*<\/template>\s*<template data-slot="mainContent">/);
        }

        SHARED_TRANSLATIONS.forEach((translationScript) => {
          expect(shellSource).toContain(`src="${translationScript}"`);
        });

        config.pageTranslations.forEach((translationScript) => {
          expect(source).toContain(`src="${translationScript}"`);
        });
      }
    });
  });

  it('captures the tabs-family asset split between home and the detail pages', () => {
    Object.entries(TABS_PAGES).forEach(([path, config]) => {
      const source = readSource(path);

      if (config.requiresBootstrap) {
        expect(source).toContain('bootstrap.rtl.min.css');
        expect(source).toContain('bootstrap.bundle.min.js');
      } else {
        expect(source).not.toContain('bootstrap.rtl.min.css');
        expect(source).not.toContain('bootstrap.bundle.min.js');
      }

      if (config.requiresFlatpickr) {
        expect(source).toContain('flatpickr.min.css');
        expect(source).toContain('https://cdn.jsdelivr.net/npm/flatpickr');
      } else {
        expect(source).not.toContain('flatpickr.min.css');
        expect(source).not.toContain('https://cdn.jsdelivr.net/npm/flatpickr');
      }

      if (config.requiresDetailModal) {
        expect(source).toContain('id="projectDetailsModal"');
      } else {
        expect(source).not.toContain('id="projectDetailsModal"');
      }

      if (config.detailPageClass) {
        expect(source).toContain('details-page');
      } else {
        expect(source).not.toContain('details-page');
      }
    });
  });

  it('records the tabs-family prep snapshot and home-first extraction order in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Tabs Family Prep Snapshot');
    expect(masterPlan).toContain('`home.html`, `customer.html`, and `technician.html` all share the `tabs` shell family shape');
    expect(masterPlan).toContain('`home.html` is the lightest `tabs`-family page and should be the first extraction target inside that family');
    expect(masterPlan).toContain('`customer.html` and `technician.html` form a paired detail-page subfamily');
    expect(masterPlan).toContain('`home.html` renders through the shared `tabs` shell path');
    expect(masterPlan).toContain('The paired detail-page extraction pass is now complete');
  });

  it('keeps the shared auth-pending reveal path aligned across the extracted tabs family', () => {
    const shellSource = readSource(TABS_SHELL_PARTIAL);
    const homeScript = readSource('src/scripts/home.js');
    const customerScript = readSource('src/scripts/customerPage.js');
    const technicianScript = readSource('src/scripts/technicianPage.js');

    expect(shellSource).toContain('auth-pending');
    expect(homeScript).toContain("document.body.classList.remove('auth-pending');");
    expect(customerScript).toContain("document.body.classList.remove('auth-pending');");
    expect(technicianScript).toContain("document.body.classList.remove('auth-pending');");
  });
});
