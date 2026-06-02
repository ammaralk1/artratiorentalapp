import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('home visual pilot audit', () => {
  it('keeps the home page on an explicit pilot hook instead of silently widening the tabs family', () => {
    const homePage = readSource('src/pages/home.html');

    expect(homePage).toContain('"bodyClass":"home-page"');
    expect(homePage).toContain('class="home-greeting-panel-content flex flex-col gap-6"');
    expect(homePage).toContain('home-section-card home-workspace-section');
    expect(homePage).toContain('home-summary-section');
    expect(homePage).toContain('home-workspace-card');
  });

  it('keeps home-only cards on the home hook while the top bar is owned globally by the shared shell', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('.home-page .home-section-card,');
    expect(appCss).toContain('.home-page .home-main-tabbar {');
    expect(appCss).toContain('.home-page .home-workspace-card {');
    expect(appCss).toContain('.home-page [data-home-summary] .summary-card__icon--support,');
    expect(appCss).toContain('--dashboard-topbar-shell-bg: rgba(244, 246, 241, 0.92);');
    expect(appCss).toContain('.dashboard-greeting-actions .btn-primary {');
  });

  it('forces compact-shell greeting actions back to the home benchmark density even when markup still carries btn-sm', () => {
    const appCss = readSource('src/styles/app.css');
    const coreCss = readSource('src/styles/core.css');

    expect(appCss).toContain('.dashboard-greeting-actions {');
    expect(appCss).toContain('--bo-primitive-button-sm-padding: var(--bo-primitive-button-padding-y) var(--bo-primitive-button-padding-x);');
    expect(appCss).toContain('--bo-primitive-button-sm-min-height: 2.75rem;');
    expect(appCss).toContain('--bo-primitive-button-sm-font-size: 0.875rem;');
    expect(coreCss).toContain('padding: var(--bo-primitive-button-sm-padding, 0.5rem 0.9rem);');
    expect(coreCss).toContain('min-height: var(--bo-primitive-button-sm-min-height, 2.35rem);');
  });

  it('removes the home summary blue info accent path from the JS-rendered metric cards', () => {
    const homeScript = readSource('src/scripts/home.js');

    expect(homeScript).toContain("info: 'summary-card__icon--support'");
    expect(homeScript).not.toContain("info: 'bg-info/10 text-info'");
  });
});
