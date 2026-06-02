import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPACT_PAGES = {
  'src/pages/site-analytics.html': {
    requiresAfterShell: false,
    requiresPageScripts: false,
    pageScript: '/src/scripts/siteAnalytics.js',
  },
  'src/pages/contact-inquiries.html': {
    requiresAfterShell: false,
    requiresPageScripts: false,
    pageScript: '/src/scripts/contactInquiries.js',
  },
  'src/pages/feedback-submissions.html': {
    requiresAfterShell: false,
    requiresPageScripts: false,
    pageScript: '/src/scripts/feedbackSubmissions.js',
  },
  'src/pages/users.html': {
    requiresAfterShell: true,
    requiresPageScripts: true,
    pageScript: '/src/scripts/users.js',
  },
};

const TABS_FAMILY = [
  'src/pages/home.html',
];

const TABS_RESOURCE_FAMILY = [
  'src/pages/clients.html',
  'src/pages/crew.html',
];

const TABS_DETAIL_FAMILY = [
  'src/pages/customer.html',
  'src/pages/technician.html',
];

const TABS_SHELL_PARTIAL = 'src/pages/_partials/tabs-manager-shell.html';
const FULL_SHELL_PARTIAL = 'src/pages/_partials/full-manager-shell.html';

const FULL_FAMILY = [
  'src/pages/dashboard.html',
  'src/pages/projects.html',
];

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('compact shell sequencing audit', () => {
  it('keeps the extracted compact shell contract aligned with page-specific slot usage', () => {
    const shellSource = readSource('src/pages/_partials/compact-manager-shell.html');

    expect(shellSource).toContain('{{slot:greetingSummary}}');
    expect(shellSource).toContain('{{slot:greetingActions}}');
    expect(shellSource).toContain('{{slot:mainContent}}');
    expect(shellSource).toContain('{{slot:afterShell}}');
    expect(shellSource).toContain('{{slot:pageScripts}}');
    expect(shellSource).toContain('{{navClass:users}}');

    Object.entries(COMPACT_PAGES).forEach(([path, config]) => {
      const source = readSource(path);

      expect(source).toContain('<!-- @include "./_partials/compact-manager-shell.html"');
      expect(source).toContain(`"pageScript":"${config.pageScript}"`);
      expect(source).toContain('data-slot="greetingSummary"');
      expect(source).toContain('data-slot="greetingActions"');
      expect(source).toContain('data-slot="mainContent"');
      expect(source).not.toContain('approved-topbar-page');

      if (config.requiresAfterShell) {
        expect(source).toContain('data-slot="afterShell"');
      } else {
        expect(source).not.toContain('data-slot="afterShell"');
      }

      if (config.requiresPageScripts) {
        expect(source).toContain('data-slot="pageScripts"');
      } else {
        expect(source).not.toContain('data-slot="pageScripts"');
      }
    });

    const usersSource = readSource('src/pages/users.html');
    expect(usersSource).not.toContain('bootstrap.rtl.min.css');
    expect(usersSource).not.toContain('bootstrap.bundle.min.js');
    expect(usersSource).toContain('data-modal-close');
    expect(usersSource).toContain('/src/scripts/translations/users.js');
  });

  it('keeps compact-family auth-pending reveal behavior aligned across page scripts', () => {
    Object.values(COMPACT_PAGES).forEach(({ pageScript }) => {
      const scriptSource = readSource(pageScript.replace(/^\//, ''));

      expect(scriptSource).toContain("document.body.classList.remove('auth-pending');");
    });
  });

  it('records tabs before full as the next shell-family migration order', () => {
    const tabsShellSource = readSource(TABS_SHELL_PARTIAL);
    expect(tabsShellSource).toContain('sidebar-panel--stats');
    expect(tabsShellSource).toContain('sidebar-panel--tabs');
    expect(tabsShellSource).not.toContain('sidebar-panel--links');

    const homeSource = readSource('src/pages/home.html');
    expect(homeSource).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
    expect(homeSource).not.toContain('approved-topbar-page');
    expect(homeSource).not.toContain('data-tab=');

    TABS_RESOURCE_FAMILY.forEach((path) => {
      const source = readSource(path);

      expect(source).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
      expect(source).toContain('data-slot="sidebarTabs"');
      expect(source).toContain('data-slot="greetingPanel"');
      expect(source).toContain('data-slot="mainContent"');
      expect(source).not.toContain('sidebar-panel--links');
      expect(source).not.toContain('data-tab=');
    });

    TABS_DETAIL_FAMILY.forEach((path) => {
      const source = readSource(path);

      expect(source).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
      expect(source).toContain('data-slot="sidebarTabs"');
      expect(source).toContain('data-slot="greetingPanel"');
      expect(source).toContain('data-slot="mainContent"');
      expect(source).toContain('data-slot="afterShell"');
      expect(source).toContain('data-slot="pageScripts"');
      expect(source).not.toContain('sidebar-panel--links');
      expect(source).not.toContain('data-tab=');
    });

    const dashboardSource = readSource('src/pages/dashboard.html');
    const projectsSource = readSource('src/pages/projects.html');
    const fullShellSource = readSource(FULL_SHELL_PARTIAL);

    expect(dashboardSource).toContain('<!-- @include "./_partials/full-manager-shell.html"');
    expect(dashboardSource).toContain('data-slot="sidebarStats"');
    expect(dashboardSource).toContain('data-slot="sidebarTabs"');
    expect(dashboardSource).toContain('data-slot="sidebarLinks"');
    expect(dashboardSource).toContain('data-slot="greetingPanel"');
    expect(dashboardSource).toContain('data-slot="mainContent"');
    expect(dashboardSource).toContain('data-slot="afterShell"');
    expect(projectsSource).toContain('<!-- @include "./_partials/full-manager-shell.html"');
    expect(projectsSource).toContain('data-slot="sidebarStats"');
    expect(projectsSource).toContain('data-slot="sidebarTabs"');
    expect(projectsSource).toContain('data-slot="sidebarLinks"');
    expect(fullShellSource).toContain('sidebar-panel--stats');
    expect(fullShellSource).toContain('sidebar-panel--tabs');
    expect(fullShellSource).toContain('sidebar-panel--links');

    expect(dashboardSource).toContain('fullcalendar@6.1.8/index.global.min.js');
    expect(dashboardSource).toContain('xlsx@0.18.5/dist/xlsx.full.min.js');
    expect(dashboardSource).toContain('href="clients.html"');
    expect(dashboardSource).toContain('href="crew.html"');
    expect(dashboardSource).not.toContain('data-tab="customers-tab"');
    expect(dashboardSource).not.toContain('data-tab="technicians-tab"');
    expect(projectsSource).toContain('data-project-subtab-target=');

    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');
    expect(masterPlan).toContain('The next shell-family migration order after compact validation is `tabs` first, then `full`.');
    expect(masterPlan).toContain('The `tabs` family is the next recommended extraction target because it keeps the shared stats + tabs shell shape without the extra quick-links panel and without the dense in-page operational tab engines that currently make the `full` family riskier.');
    expect(masterPlan).toContain('Dark theme is the primary QA path for this application and is a blocking visual gate for every UI migration.');
    expect(masterPlan).toContain('scripts/manual-dark-smoke.mjs');
    expect(masterPlan).toContain('A controlled localhost detail fixture now exists behind `fixture=details` for `customer.html` and `technician.html`');
    expect(masterPlan).toContain('Phase 2 Full Family Prep Snapshot');
    expect(masterPlan).toContain('`projects.html` is the first recommended extraction target inside the `full` family');
    expect(masterPlan).toContain('The first `dashboard.html` extraction pass onto `src/pages/_partials/full-manager-shell.html` is now implemented');
  });
});
