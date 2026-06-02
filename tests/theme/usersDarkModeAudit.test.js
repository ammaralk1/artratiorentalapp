import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const USERS_PAGE_PATH = resolve(process.cwd(), 'src/pages/users.html');
const APP_CSS_PATH = resolve(process.cwd(), 'src/styles/app.css');
const UNIFIED_DARK_SELECTOR_PATTERN =
  /:where\(html\.dark,\s*body\.dark,\s*html\.dark-mode,\s*body\.dark-mode,\s*html\[data-theme="dark"\],\s*body\[data-theme="dark"\]\)/;

const readSource = (path) => readFileSync(path, 'utf8');

describe('users page dark mode audit', () => {
  it('keeps the users page on the shared shell and shared dark-mode path', () => {
    const pageSource = readSource(USERS_PAGE_PATH);

    expect(pageSource).toContain('"bodyClass":"users-page"');
    expect(pageSource).toContain('class="ui-card ui-card--content glass-card users-card space-y-6" id="users-hero"');
    expect(pageSource).toContain('"greetingLabelKey":"home.users.title"');
    expect(pageSource).toContain('class="btn btn-primary btn-sm"');
    expect(pageSource).toContain('class="ui-select select select-bordered w-full" id="user-role"');
    expect(pageSource).toContain('class="ui-badge ui-badge--outline badge badge-outline badge-error badge-lg"');
    expect(pageSource).toContain('class="users-table-wrapper overflow-x-auto"');
    expect(pageSource).toContain('class="ui-table table table-hover align-middle users-table surface-table" id="users-table"');
    expect(pageSource).toContain('class="modal fade users-modal" id="userLogsModal"');
    expect(pageSource).toContain('class="ui-modal__content modal-content users-modal-content"');
    expect(pageSource).not.toMatch(/\bdark:/);
  });

  it('keeps explicit shared dark styling for users table and modal controls in app.css', () => {
    const appCss = readSource(APP_CSS_PATH);

    expect(appCss).toMatch(new RegExp(`${UNIFIED_DARK_SELECTOR_PATTERN.source}\\s+\\.users-table\\s*\\{`));
    expect(appCss).toContain('--bs-table-bg: transparent;');
    expect(appCss).toMatch(new RegExp(`${UNIFIED_DARK_SELECTOR_PATTERN.source}\\s+\\.users-table>:not\\(caption\\)>\\*\\s*\\{`));
    expect(appCss).toMatch(new RegExp(`${UNIFIED_DARK_SELECTOR_PATTERN.source}\\s+\\.users-table tbody,`));
    expect(appCss).toContain('color: hsl(var(--bc) / 0.9) !important;');
    expect(appCss).toMatch(new RegExp(`${UNIFIED_DARK_SELECTOR_PATTERN.source}\\s+\\.users-table tbody tr:hover,`));
    expect(appCss).toContain('background-color: hsl(var(--b2) / 0.72) !important;');
    expect(appCss).toMatch(new RegExp(`${UNIFIED_DARK_SELECTOR_PATTERN.source}\\s+\\.users-table thead,`));
    expect(appCss).toContain('.users-table-head {');
    expect(appCss).toContain('.users-table thead th,');
    expect(appCss).toContain('.btn-close {');
    expect(appCss).toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .btn-close {');
    expect(appCss).toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .btn-close:hover,');
  });
});
