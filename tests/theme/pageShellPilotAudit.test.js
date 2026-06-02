import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PILOT_PAGES = [
  'src/pages/site-analytics.html',
  'src/pages/contact-inquiries.html',
  'src/pages/feedback-submissions.html',
  'src/pages/users.html',
];

const MANAGER_HEAD_PARTIAL = 'src/pages/_partials/manager-page-head.html';
const COMPACT_SHELL_PARTIAL = 'src/pages/_partials/compact-manager-shell.html';
const VITE_CONFIG_PATH = resolve(process.cwd(), 'vite.config.js');

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('page shell pilot audit', () => {
  it('documents the build-time shell composition path in vite config', () => {
    const source = readFileSync(VITE_CONFIG_PATH, 'utf8');

    expect(source).toContain('function htmlIncludePlugin()');
    expect(source).toContain('handler(html, ctx)');
    expect(source).toContain('plugins: [htmlIncludePlugin(), tailwindcss()]');
    expect(source).not.toMatch(/vite-plugin-handlebars|vite-plugin-ejs|nunjucks|handlebars|ejs/i);
  });

  it('keeps the compact manager shell pilot family aligned for Phase 2 extraction', () => {
    const headPartialSource = readSource(MANAGER_HEAD_PARTIAL);
    const shellPartialSource = readSource(COMPACT_SHELL_PARTIAL);

    expect(headPartialSource).toContain('data-i18n-key="{{titleKey}}"');
    expect(headPartialSource).toContain('body.theme-loading .page-grid,');
    expect(headPartialSource).toContain('.btn-primary {');
    expect(headPartialSource).toContain('--bs-btn-active-bg: #3f603f !important;');
    expect(headPartialSource).toContain('--bs-btn-focus-box-shadow: none !important;');
    expect(shellPartialSource).toContain('body class="page-shell theme-loading {{bodyClass}} auth-pending"');
    expect(shellPartialSource).toContain('id="sidebar-backdrop"');
    expect(shellPartialSource).toContain('id="dashboard-sidebar"');
    expect(shellPartialSource).toContain('data-dashboard-greeting');
    expect(shellPartialSource).toContain('id="language-toggle"');
    expect(shellPartialSource).toContain('id="logout-btn"');
    expect(shellPartialSource).toContain('sidebar-panel--stats');
    expect(shellPartialSource).not.toContain('sidebar-panel--tabs');
    expect(shellPartialSource).not.toContain('sidebar-panel--links');
    expect(shellPartialSource).toContain('{{slot:mainContent}}');
    expect(shellPartialSource).toContain('{{slot:afterShell}}');
    expect(shellPartialSource).toContain('{{slot:pageScripts}}');

    PILOT_PAGES.forEach((path) => {
      const source = readSource(path);

      expect(source).toContain('<!-- @include "./_partials/manager-page-head.html"');
      expect(source).toContain('<!-- @include "./_partials/compact-manager-shell.html"');
      expect(source).toContain('data-slot="greetingSummary"');
      expect(source).toContain('data-slot="greetingActions"');
      expect(source).toContain('data-slot="mainContent"');
    });

    const usersSource = readSource('src/pages/users.html');

    expect(usersSource).not.toContain('bootstrap.rtl.min.css');
    expect(usersSource).not.toContain('bootstrap.bundle.min.js');
    expect(usersSource).toContain('data-modal-close');
    expect(usersSource).toContain('data-slot="afterShell"');
    expect(usersSource).toContain('data-slot="pageScripts"');
  });
});
