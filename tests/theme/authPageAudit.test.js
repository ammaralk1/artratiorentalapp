import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function read(relativePath) {
  return readFileSync(resolve(process.cwd(), relativePath), 'utf8');
}

describe('auth page audit', () => {
  it('uses an explicit auth-page shell in login markup', () => {
    const loginPage = read('src/pages/login.html');

    expect(loginPage).toContain('<body class="page-shell theme-loading auth-page">');
    expect(loginPage).toContain('class="auth-page-shell"');
    expect(loginPage).toContain('class="auth-header"');
    expect(loginPage).toContain('class="auth-header-nav"');
    expect(loginPage).not.toContain('href="home.html" class="flex items-center gap-3 dashboard-hero-brand"');
    expect(loginPage).toContain('class="auth-page-main"');
    expect(loginPage).toContain('class="auth-stage"');
    expect(loginPage).toContain('class="auth-hero-panel auth-hero-panel--inline space-y-5"');
    expect(loginPage).toContain('class="auth-palette-strip"');
    expect(loginPage).toContain('class="auth-form-divider"');
    expect(loginPage).toContain('class="ui-card ui-card--content glass-card auth-card auth-form-panel w-full space-y-8"');
    expect(loginPage).not.toContain('/css/sidebar.css');
    expect(loginPage).not.toContain('class="dashboard-header"');
  });

  it('uses the new primitive aliases on the login adoption target while preserving bridge classes', () => {
    const loginPage = read('src/pages/login.html');

    expect(loginPage).toContain('class="language-toggle-btn auth-language-toggle"');
    expect(loginPage).toContain('class="ui-input form-control" id="username"');
    expect(loginPage).toContain('class="ui-input form-control" id="password"');
    expect(loginPage).toContain('class="ui-button ui-button--primary btn btn-primary w-full"');
  });

  it('keeps auth page styling in shared css instead of dark utility strings', () => {
    const loginPage = read('src/pages/login.html');
    const appCss = read('src/styles/app.css');
    const commonTranslations = read('src/scripts/translations/common.js');

    expect(loginPage).not.toContain('dark:from-slate-900/80');
    expect(loginPage).not.toContain('dark:border-slate-700');
    expect(loginPage).toContain('data-i18n-key="login.brand.eyebrow"');
    expect(loginPage).toContain('data-i18n-key="login.hero.kicker"');
    expect(loginPage).toContain('data-i18n-key="login.form.kicker"');
    expect(loginPage).toContain('data-i18n-key="login.form.helper"');
    expect(appCss).toContain('.auth-page-shell');
    expect(appCss).toContain('.auth-header');
    expect(appCss).toContain('.auth-header-nav');
    expect(appCss).toContain('.auth-stage');
    expect(appCss).toContain('.auth-palette-strip');
    expect(appCss).toContain('.auth-brand-eyebrow');
    expect(appCss).toContain('.auth-hero-panel');
    expect(appCss).toContain('.auth-hero-panel--inline');
    expect(appCss).toContain('.auth-hero-item');
    expect(appCss).toContain('.auth-form-divider');
    expect(appCss).toContain('.auth-form-helper');
    expect(appCss).toContain('.auth-language-toggle');
    expect(appCss).toContain('.auth-card');
    expect(commonTranslations).toContain("'login.brand.eyebrow'");
    expect(commonTranslations).toContain("'login.hero.kicker'");
    expect(commonTranslations).toContain("'login.form.kicker'");
    expect(commonTranslations).toContain("'login.form.helper'");
  });
});
