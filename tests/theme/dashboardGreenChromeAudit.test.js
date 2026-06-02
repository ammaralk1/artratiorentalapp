import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('dashboard green chrome audit', () => {
  it('keeps dashboard table wrappers on the shared green surface contract in dark mode', () => {
    const appCss = readSource('src/styles/app.css');
    const dashboardPage = readSource('src/pages/dashboard.html');

    expect(dashboardPage).toContain('class="users-table-wrapper overflow-x-auto embedded-management-table-shell"');
    expect(dashboardPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table customer-table align-middle"');
    expect(dashboardPage).toContain('class="ui-table table table-hover users-table surface-table embedded-management-table technician-table align-middle"');
    expect(appCss).toContain('.embedded-management-table-shell {');
    expect(appCss).toContain('.embedded-management-table {');
    expect(appCss).toContain('background: var(--bo-color-content-bg);');
    expect(appCss).toContain('box-shadow: var(--bo-color-content-shadow-elevated);');
    expect(appCss).toContain('content: none !important;');
    expect(appCss).not.toContain('border-color: rgba(42, 70, 158, 0.62);');
    expect(appCss).not.toContain('background: linear-gradient(165deg, rgba(3, 6, 16, 0.98) 8%, rgba(5, 10, 24, 0.99) 58%, rgba(8, 16, 36, 0.99) 100%);');
    expect(appCss).not.toContain('background: radial-gradient(circle at top left, rgba(82, 120, 222, 0.28), rgba(32, 60, 138, 0.22) 46%, rgba(6, 12, 30, 0.92) 78%);');
  });

  it('keeps reservation dashboard controls off the old navy and indigo contract', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('background: var(--bo-color-action-bg);');
    expect(appCss).toContain('box-shadow: var(--bo-color-action-shadow-hover);');
    expect(appCss).toContain('.reservation-filter-card,');
    expect(appCss).toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .reservation-filter-card,');
    expect(appCss).toContain('background: var(--bo-color-shell-bg);');
    expect(appCss).toContain('border-color: var(--bo-color-shell-border);');
    expect(appCss).not.toContain('background: linear-gradient(135deg, rgba(17, 27, 53, 0.92), rgba(27, 38, 72, 0.88));');
    expect(appCss).not.toContain('background: rgba(30, 64, 175, 0.22);');
    expect(appCss).not.toContain('background: rgba(28, 38, 74, 0.7);');
  });

  it('keeps dashboard equipment cards and selection controls on the green dark contract', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('outline: 2px solid rgba(147, 168, 137, 0.42);');
    expect(appCss).toContain('background: linear-gradient(135deg, rgba(24, 36, 29, 0.88), rgba(53, 76, 63, 0.26));');
    expect(appCss).toContain('background: rgba(24, 36, 29, 0.78);');
    expect(appCss).toContain('background: rgba(24, 36, 29, 0.64);');
    expect(appCss).toContain('background: rgba(20, 30, 24, 0.8);');
    expect(appCss).not.toContain('background: linear-gradient(135deg, rgba(30, 41, 59, 0.88), rgba(59, 130, 246, 0.18));');
    expect(appCss).not.toContain('background: rgba(24, 35, 62, 0.82);');
    expect(appCss).not.toContain('background: rgba(37, 55, 88, 0.6);');
  });

  it('keeps edit reservation modal dashboard surfaces off the old blue contract', () => {
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(reservationsCss).toContain('background: rgba(86, 126, 86, 0.2);');
    expect(reservationsCss).toContain('background: var(--bo-color-table-head-bg) !important;');
    expect(reservationsCss).toContain('border-color: rgba(147, 168, 137, 0.14);');
    expect(reservationsCss).toContain('#editReservationModal .reservation-items-table {');
    expect(reservationsCss).toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) #editReservationModal .reservation-items-table thead,');
  });

  it('keeps reservation dashboard search, filters, and pagination on the green contract', () => {
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(reservationsCss).toContain('.reservations-list-card {');
    expect(reservationsCss).toContain('.reservations-search-input {');
    expect(reservationsCss).toContain('.reservations-filters-bar {');
    expect(reservationsCss).toContain('.reservations-pagination {');
    expect(reservationsCss).toContain('border: 1px solid rgba(147, 168, 137, 0.24);');
    expect(reservationsCss).toContain('background: linear-gradient(135deg, rgba(248, 250, 247, 0.9), rgba(240, 245, 241, 0.85));');
    expect(reservationsCss).toContain('background: linear-gradient(135deg, rgba(154, 170, 145, 0.24), rgba(86, 126, 86, 0.16));');
    expect(reservationsCss).toContain('background: linear-gradient(135deg, rgba(86, 126, 86, 0.34), rgba(53, 76, 63, 0.28));');
  });

  it('keeps reservation dashboard tables and technician modal on the green contract', () => {
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(reservationsCss).toContain('.reservation-equipment-table.ui-table-shell.table-responsive,');
    expect(reservationsCss).toContain('#editReservationModal .reservation-modal-table-shell {');
    expect(reservationsCss).toContain('background: transparent;');
    expect(reservationsCss).toContain('border-radius: 0;');
    expect(reservationsCss).toContain('box-shadow: none;');
    expect(reservationsCss).toContain('border: 1px solid rgba(147, 168, 137, 0.16);');
    expect(reservationsCss).toContain('background: rgba(154, 170, 145, 0.1);');
    expect(reservationsCss).toContain('background: rgba(86, 126, 86, 0.14);');
    expect(reservationsCss).toContain('background: linear-gradient(135deg, rgba(86, 126, 86, 0.42), rgba(70, 104, 70, 0.52));');
    expect(reservationsCss).toContain('background: var(--bo-color-content-bg);');
    expect(reservationsCss).toContain('--bs-table-hover-bg: rgba(86, 126, 86, 0.14);');
  });

  it('keeps reservation quote preview and summary surfaces on the green contract', () => {
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(reservationsCss).toContain('.quote-preview-panel {');
    expect(reservationsCss).toContain('.quote-preview {');
    expect(reservationsCss).toContain('border: 1px solid var(--bo-color-content-border);');
    expect(reservationsCss).toContain('box-shadow: var(--bo-color-content-shadow-elevated);');
    expect(reservationsCss).toContain('background: linear-gradient(145deg, rgba(24, 36, 29, 0.96), rgba(16, 25, 21, 0.92));');
    expect(reservationsCss).toContain('background: linear-gradient(145deg, rgba(248, 250, 247, 0.98), rgba(240, 245, 241, 0.92));');
    expect(reservationsCss).toContain('border: 1px solid rgba(147, 168, 137, 0.24);');
    expect(reservationsCss).toContain('background: rgba(242, 246, 242, 0.96);');
    expect(reservationsCss).toContain('background: rgba(24, 36, 29, 0.62);');
    expect(reservationsCss).toContain('background: rgba(20, 30, 24, 0.92);');
    expect(reservationsCss).toContain('background: rgba(24, 36, 29, 0.9);');
  });

  it('keeps reservation compact details structurally clean without enforcing a recolored card palette', () => {
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(reservationsCss).toContain('.reservation-details-wrapper {');
    expect(reservationsCss).toContain('overflow: visible;');
    expect(reservationsCss).toContain('content: none;');
    expect(reservationsCss).toContain('.reservation-details-wrapper.reservation-details-compact {');
    expect(reservationsCss).toContain('background: transparent;');
    expect(reservationsCss).toContain('box-shadow: none;');
    expect(reservationsCss).toContain('.reservation-details section {');
    expect(reservationsCss).toContain('background: var(--bo-color-content-bg);');
    expect(reservationsCss).toContain('.reservation-details .reservation-info-card {');
    expect(reservationsCss).toContain('padding: 0;');
    expect(reservationsCss).toContain('border-radius: 0;');
    expect(reservationsCss).toContain('border: 0;');
    expect(reservationsCss).toContain('box-shadow: none;');
    expect(reservationsCss).toContain('color: var(--bo-color-accent-text);');
    expect(reservationsCss).toContain('color: rgba(36, 55, 42, 0.92);');
    expect(reservationsCss).toContain('background: rgba(20, 30, 24, 0.74);');
    expect(reservationsCss).toContain('background: rgba(20, 30, 24, 0.9);');
    expect(reservationsCss).toContain('background: rgba(20, 30, 24, 0.82);');
    expect(reservationsCss).toContain('background: rgba(20, 30, 24, 0.6);');
  });

  it('keeps dashboard-local search and banner chrome on the green contract', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('border: 1px solid rgba(147, 168, 137, 0.24);');
    expect(appCss).toContain('background: rgba(20, 30, 24, 0.8);');
    expect(appCss).toContain('background: linear-gradient(135deg, rgba(245, 248, 244, 0.96), rgba(236, 241, 238, 0.94));');
    expect(appCss).toContain('background: rgba(24, 36, 29, 0.78);');
    expect(appCss).toContain('color: #466846;');
    expect(appCss).toContain('background: var(--bo-color-content-bg);');
    expect(appCss).toContain('background: var(--bo-color-tab-hover-bg);');
    expect(appCss).toContain('background: rgba(232, 240, 234, 0.72);');
    expect(appCss).toContain('background: rgba(20, 30, 24, 0.8);');
    expect(appCss).toContain('border: 1px dashed rgba(147, 168, 137, 0.34);');
  });
});
