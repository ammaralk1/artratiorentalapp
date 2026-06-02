import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('shared green chrome audit', () => {
  it('keeps shared flatpickr dark chrome on the green brand family instead of the older blue contract', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).toContain('background: var(--bo-color-dropdown-bg);');
    expect(coreCss).toContain('border: 1px solid var(--bo-color-dropdown-border);');
    expect(coreCss).toContain('box-shadow: none;');
    expect(coreCss).toContain('color-scheme: dark;');
    expect(coreCss).not.toContain('background: linear-gradient(135deg, #2563eb, #1d4ed8);');
    expect(coreCss).not.toContain('background: rgba(32, 49, 110, 0.6);');
  });

  it('keeps shared modal close controls and generic glass surfaces off the navy shadow contract', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('box-shadow: var(--bo-color-content-shadow-elevated);');
    expect(appCss).toContain('background-color: rgba(20, 30, 24, 0.96) !important;');
    expect(appCss).toContain('background: rgba(20, 30, 24, 0.88);');
    expect(appCss).toContain('box-shadow: 0 12px 24px rgba(18, 45, 24, 0.2);');
    expect(appCss).not.toContain('background: rgba(17, 28, 50, 0.9);');
    expect(appCss).not.toContain('box-shadow: 0 28px 55px #040916a6;');
  });

  it('keeps shared project/payment chrome off the old blue contract', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).toContain('background-color: rgba(243, 247, 242, 0.92) !important;');
    expect(coreCss).toContain('background: var(--bo-color-table-head-bg) !important;');
    expect(coreCss).toContain('--bs-table-hover-bg: rgba(86, 126, 86, 0.14);');
    expect(coreCss).toContain('background: linear-gradient(135deg, rgba(86, 126, 86, 0.96), rgba(70, 104, 70, 0.88));');
    expect(coreCss).toContain('background: rgba(154, 170, 145, 0.18);');
    expect(coreCss).toContain('background: linear-gradient(135deg, rgba(86, 126, 86, 0.96), rgba(70, 104, 70, 0.88));');
    expect(coreCss).toContain('background: linear-gradient(90deg, rgba(86, 126, 86, 0.18) 0%, rgba(53, 76, 63, 0.08) 100%);');
  });

  it('keeps reports chrome on the green contract instead of the old indigo accent', () => {
    const reportsCss = readSource('src/styles/reports.css');

    expect(reportsCss).toContain('--reports-accent: #567E56;');
    expect(reportsCss).toContain('--reports-accent-rgb: 86, 126, 86;');
    expect(reportsCss).toContain('--reports-accent: #9AAA91;');
    expect(reportsCss).toContain('--reports-accent-rgb: 154, 170, 145;');
    expect(reportsCss).toContain('border-color: rgba(147, 168, 137, 0.2);');
    expect(reportsCss).toContain('background: rgba(24, 36, 29, 0.92);');
    expect(reportsCss).toContain('background: rgba(86, 126, 86, 0.14);');
    expect(reportsCss).toContain('background: linear-gradient(140deg, rgba(24, 36, 29, 0.92), rgba(16, 25, 21, 0.9));');
    expect(reportsCss).not.toContain('rgba(93, 133, 255, 0.24)');
    expect(reportsCss).not.toContain('rgba(93, 133, 255, 0.16)');
    expect(reportsCss).not.toContain('--reports-accent-rgb: 63, 93, 245;');
  });

  it('keeps the remaining module-level dark shells off the old blue contract', () => {
    const formsCss = readSource('src/styles/forms.css');
    const calendarCss = readSource('src/styles/calendar.css');
    const maintenanceCss = readSource('src/styles/maintenance.css');
    const usersCss = readSource('src/styles/users.css');

    expect(formsCss).toContain('background: var(--bo-color-content-bg);');
    expect(formsCss).toContain('background: var(--bo-color-content-muted-bg);');

    expect(calendarCss).toContain('background: rgba(20, 30, 24, 0.78);');
    expect(calendarCss).toContain('--calendar-day-bg-hover: rgba(86, 126, 86, 0.18);');
    expect(calendarCss).toContain('rgba(154, 170, 145, 0.24), rgba(86, 126, 86, 0.2)');
    expect(calendarCss).toContain('background: linear-gradient(135deg, rgba(95, 126, 96, 0.84), rgba(68, 92, 70, 0.8));');

    expect(usersCss).toContain('.users-page');
    expect(usersCss).not.toContain('.users-page .input-group-text {');

    expect(maintenanceCss).toContain('background-color: var(--bo-color-control-bg) !important;');
    expect(maintenanceCss).toContain('border-color: rgba(147, 168, 137, 0.24);');
    expect(maintenanceCss).toContain('background: var(--bo-color-content-bg);');
  });
});
