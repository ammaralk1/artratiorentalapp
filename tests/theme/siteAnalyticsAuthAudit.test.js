import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_ANALYTICS_SCRIPT = resolve(process.cwd(), 'src/scripts/siteAnalytics.js');
const SITE_ANALYTICS_PAGE = resolve(process.cwd(), 'src/pages/site-analytics.html');
const MASTER_PLAN_PATH = resolve(process.cwd(), 'docs/UI_REDESIGN_MASTER_PLAN.md');

const readSource = (path) => readFileSync(path, 'utf8');

describe('site analytics auth audit', () => {
  it('keeps site analytics aligned with the compact-shell localhost bypass auth contract', () => {
    const scriptSource = readSource(SITE_ANALYTICS_SCRIPT);

    expect(scriptSource).toContain("currentUser = await checkAuth({ redirect: false });");
    expect(scriptSource).toContain("currentUser = await getCurrentUser({ refresh: true });");
    expect(scriptSource).toContain('currentUser = null;');
    expect(scriptSource).toContain("window.location.href = 'login.html';");
    expect(scriptSource).not.toContain('currentUser = await checkAuth();');
  });

  it('keeps analytics fetch failures on-page instead of forcing a route bounce', () => {
    const scriptSource = readSource(SITE_ANALYTICS_SCRIPT);
    const loadAnalyticsSection = scriptSource.slice(
      scriptSource.indexOf('async function loadAnalytics()'),
      scriptSource.indexOf('function bindEvents()'),
    );

    expect(loadAnalyticsSection).toContain("showToast(message, 'error', 4500);");
    expect(loadAnalyticsSection).toContain("els.topPagesBody.innerHTML = `");
    expect(loadAnalyticsSection).not.toContain("window.location.href = 'home.html';");
  });

  it('records the site-analytics localhost bypass blocker follow-up in the master plan', () => {
    const masterPlan = readSource(MASTER_PLAN_PATH);

    expect(masterPlan).toContain('site-analytics.html?bypassAuth=1');
    expect(masterPlan).toContain('site-analytics.html');
  });

  it('uses the in-place primitive adoption pattern on the compact analytics page', () => {
    const pageSource = readSource(SITE_ANALYTICS_PAGE);
    const scriptSource = readSource(SITE_ANALYTICS_SCRIPT);

    expect(pageSource).toContain('class="ui-button ui-button--primary btn btn-primary btn-sm"');
    expect(pageSource).toContain('class="ui-button ui-button--outline btn btn-outline btn-sm"');
    expect(pageSource).toMatch(/class="[^"]*\bui-card\b[^"]*\bui-card--content\b[^"]*\bglass-card\b[^"]*\bcompact-hero-card\b[^"]*"/);
    expect(pageSource).toContain('class="compact-kpi-grid site-analytics-stats-grid" id="site-analytics-stats"');
    expect(pageSource).toMatch(/class="[^"]*\bui-card\b[^"]*\bui-card--content\b[^"]*\bglass-card\b[^"]*\bui-stat-card\b[^"]*\bcompact-kpi-card\b[^"]*"/);
    expect(pageSource).toContain('class="ui-table-shell users-table-wrapper compact-table-shell overflow-x-auto"');
    expect(pageSource).toContain('class="ui-table compact-table table table-hover align-middle text-nowrap users-table"');
    expect(pageSource).toContain('class="ui-select select select-bordered select-sm min-w-[150px]"');
    expect(pageSource).toContain('class="ui-select select select-bordered select-sm min-w-[170px]"');
    expect(scriptSource).toContain('class="compact-list-item site-analytics-source-item"');
    expect(scriptSource).toContain('class="ui-stat-card compact-kpi-card site-analytics-device-card"');
    expect(scriptSource).toContain('class="compact-bar-row site-analytics-daily-row');
    expect(scriptSource).toContain('class="ui-empty-state surface-empty-state p-5"');
  });
});
