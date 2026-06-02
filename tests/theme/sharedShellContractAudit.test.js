import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PAGE_GROUPS = {
  fullShell: [
    'src/pages/dashboard.html',
    'src/pages/projects.html',
  ],
  tabsShell: [
    'src/pages/home.html',
    'src/pages/customer.html',
    'src/pages/technician.html',
  ],
  compactShell: [
    'src/pages/site-analytics.html',
    'src/pages/contact-inquiries.html',
    'src/pages/feedback-submissions.html',
    'src/pages/users.html',
  ],
};

const RAW_SHELL_PAGES = [];
const COMPACT_SHELL_PARTIAL = 'src/pages/_partials/compact-manager-shell.html';
const TABS_SHELL_PARTIAL = 'src/pages/_partials/tabs-manager-shell.html';
const FULL_SHELL_PARTIAL = 'src/pages/_partials/full-manager-shell.html';

const REQUIRED_SHELL_MARKERS = [
  'id="sidebar-backdrop"',
  'id="dashboard-sidebar"',
  'class="sidebar-shell sidebar-drawer"',
  'class="dashboard-header"',
  'class="dashboard-header-nav"',
  'id="sidebar-open"',
  'id="sidebar-close"',
  'dashboard-hero-brand',
  'data-dashboard-greeting',
  'data-greeting-toggle',
  'data-greeting-panel',
  'id="language-toggle"',
  'data-theme-toggle',
  'id="logout-btn"',
];

const readPage = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('shared shell contract audit', () => {
  it('keeps the shared shell anchors aligned across key HTML entrypoints', () => {
    RAW_SHELL_PAGES.forEach((path) => {
      const source = readPage(path);

      REQUIRED_SHELL_MARKERS.forEach((marker) => {
        expect(source).toContain(marker);
      });
    });

    const compactShellSource = readPage(COMPACT_SHELL_PARTIAL);
    const tabsShellSource = readPage(TABS_SHELL_PARTIAL);
    const fullShellSource = readPage(FULL_SHELL_PARTIAL);

    REQUIRED_SHELL_MARKERS.forEach((marker) => {
      expect(compactShellSource).toContain(marker);
      expect(tabsShellSource).toContain(marker);
      expect(fullShellSource).toContain(marker);
    });

    PAGE_GROUPS.compactShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/compact-manager-shell.html"');
    });

    PAGE_GROUPS.tabsShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
    });

    PAGE_GROUPS.fullShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/full-manager-shell.html"');
    });
  });

  it('preserves the current shell family variants after extraction', () => {
    PAGE_GROUPS.fullShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/full-manager-shell.html"');
      expect(source).toContain('data-slot="sidebarStats"');
      expect(source).toContain('data-slot="sidebarTabs"');
      expect(source).toContain('data-slot="sidebarLinks"');
      expect(source).toContain('data-slot="greetingPanel"');
      expect(source).toContain('data-slot="mainContent"');
      expect(source).toContain('data-slot="afterShell"');
      expect(source).not.toContain('sidebar-panel--stats');
      expect(source).not.toContain('sidebar-panel--tabs');
      expect(source).not.toContain('sidebar-panel--links');
    });

    PAGE_GROUPS.tabsShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/tabs-manager-shell.html"');
      expect(source).not.toContain('sidebar-panel--links');
    });

    const tabsShellSource = readPage(TABS_SHELL_PARTIAL);
    expect(tabsShellSource).toContain('sidebar-panel--stats');
    expect(tabsShellSource).toContain('sidebar-panel--tabs');
    expect(tabsShellSource).not.toContain('sidebar-panel--links');

    const compactShellSource = readPage(COMPACT_SHELL_PARTIAL);
    const fullShellSource = readPage(FULL_SHELL_PARTIAL);

    expect(compactShellSource).toContain('sidebar-panel--stats');
    expect(compactShellSource).not.toContain('sidebar-panel--tabs');
    expect(compactShellSource).not.toContain('sidebar-panel--links');

    expect(fullShellSource).toContain('sidebar-panel--stats');
    expect(fullShellSource).toContain('sidebar-panel--tabs');
    expect(fullShellSource).toContain('sidebar-panel--links');

    PAGE_GROUPS.compactShell.forEach((path) => {
      const source = readPage(path);

      expect(source).toContain('<!-- @include "./_partials/compact-manager-shell.html"');
    });
  });
});
