import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('token bridge rationalization audit', () => {
  it('removes dead bridge tokens and collapses trivial alias hops in core.css', () => {
    const coreCss = readSource('src/styles/core.css');

    expect(coreCss).not.toContain('--clr-success:');
    expect(coreCss).not.toContain('--clr-danger:');
    expect(coreCss).not.toContain('--clr-warning:');
    expect(coreCss).not.toContain('--bo-brand-primary-strong:');
    expect(coreCss).not.toContain('--bo-brand-accent:');
    expect(coreCss).not.toContain('--bo-brand-info:');
    expect(coreCss).not.toContain('--bo-radius-surface:');
    expect(coreCss).not.toContain('--bo-radius-control:');
    expect(coreCss).not.toContain('--bo-shadow-surface:');
    expect(coreCss).not.toContain('--bo-shadow-elevated:');
    expect(coreCss).toContain('--bo-primitive-card-radius: var(--radius-lg);');
    expect(coreCss).toContain('--bo-brand-secondary: var(--color-secondary, #8BA3B0);');
    expect(coreCss).toContain('--bo-brand-border: var(--color-card-border, #cfd8cf);');
  });

  it('keeps the remaining live pagination shell on semantic radius tokens instead of the removed bridge alias', () => {
    const appCss = readSource('src/styles/app.css');

    expect(appCss).toContain('border-radius: var(--radius-md);');
    expect(appCss).not.toContain('var(--bo-radius-control)');
  });

  it('removes only dead compatibility aliases from the primary owners while keeping live bridge aliases deferred', () => {
    const appCss = readSource('src/styles/app.css');
    const coreCss = readSource('src/styles/core.css');

    expect(appCss).not.toContain('.mt-5 {');
    expect(appCss).not.toContain('.my-3 {');
    expect(appCss).not.toContain('.my-4 {');
    expect(appCss).not.toContain('.py-4 {');
    expect(appCss).not.toContain('.px-4 {');
    expect(appCss).not.toContain('.input-group-text,');
    expect(appCss).not.toContain('.input-group-text {');

    expect(appCss).toContain('.d-flex {');
    expect(appCss).toContain('.justify-content-lg-between {');
    expect(appCss).toContain('.justify-content-lg-end {');
    expect(appCss).toContain('.ms-auto {');

    expect(coreCss).toContain('.btn-outline-secondary {');
    expect(coreCss).toContain('.form-control,');
    expect(coreCss).toContain('.form-select,');
    expect(coreCss).toContain('.ui-card,');
    expect(coreCss).toContain('.badge {');
  });

  it('removes only dead compatibility aliases from the secondary owners while leaving live module contracts intact', () => {
    const usersCss = readSource('src/styles/users.css');
    const reportsCss = readSource('src/styles/reports.css');
    const formsCss = readSource('src/styles/forms.css');
    const maintenanceCss = readSource('src/styles/maintenance.css');

    expect(usersCss).not.toContain('.users-page .input-group-text {');
    expect(usersCss).not.toContain(') .users-page .input-group-text {');
    expect(reportsCss).toContain('.reports-actions .btn,');
    expect(reportsCss).toContain('.reports-filter-control {');
    expect(formsCss).toContain('.management-form-actions .btn-primary {');
    expect(formsCss).toContain('.management-search-bar .form-control {');
    expect(maintenanceCss).not.toContain('.maintenance-status-filter .form-select,');
    expect(maintenanceCss).toContain('.maintenance-status-filter .form-control,\n.maintenance-status-filter .maintenance-filter-control {');
  });

  it('consolidates live compatibility bridges so module classes own chrome where they already exist', () => {
    const reportsCss = readSource('src/styles/reports.css');
    const formsCss = readSource('src/styles/forms.css');

    expect(reportsCss).toContain('.reports-filter-control {');
    expect(reportsCss).toContain('min-width: 190px;');
    expect(reportsCss).not.toContain('.reports-filters .form-select {\n  min-width: 190px;\n  border-radius: 14px;');
    expect(reportsCss).toContain('.reports-filter-control {');
    expect(reportsCss).toContain('padding: 12px 16px;');
    expect(reportsCss).toContain('min-height: 48px;');

    expect(formsCss).toContain('.management-form-actions .btn-primary {');
    expect(formsCss).not.toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .management-form-actions .btn-primary {');
    expect(formsCss).toContain('.management-search-bar .form-control {');
    expect(formsCss).toContain('max-width: min(100%, 21rem);');
    expect(formsCss).not.toContain('.management-search-bar .form-control:focus {');
    expect(formsCss).not.toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .management-search-bar .form-control {');
    expect(formsCss).toContain('.management-search-bar .form-control {');
    expect(formsCss).toContain('width: min(100%, 21rem) !important;');
    expect(formsCss).toContain('flex: 1 1 18rem;');
  });

  it('adds dedicated markup-owner hooks before further bridge consolidation in deferred modules', () => {
    const dashboardHtml = readSource('src/pages/dashboard.html');
    const maintenanceHtml = readSource('src/pages/maintenance.html');
    const reservationModalsJs = readSource('src/scripts/reservations/modals.js');
    const maintenanceCss = readSource('src/styles/maintenance.css');
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(maintenanceHtml).toContain('class="ui-select form-select maintenance-filter-control maintenance-filter-control--status"');
    expect(maintenanceHtml).toContain('class="ui-select form-select maintenance-filter-control maintenance-filter-control--priority"');
    expect(dashboardHtml).toContain('class="ui-select form-select reservation-billing-input reservation-payment-progress__select"');
    expect(dashboardHtml).toContain('class="ui-input form-control reservation-billing-input reservation-payment-progress__input"');
    expect(reservationModalsJs).toContain('reservation-payment-progress__select reservation-payment-progress__control reservation-payment-progress__control--type');
    expect(reservationModalsJs).toContain('reservation-payment-progress__input reservation-payment-progress__control reservation-payment-progress__control--value');
    expect(maintenanceCss).not.toContain('.maintenance-status-filter .form-select,');
    expect(maintenanceCss).toContain('.maintenance-status-filter .maintenance-filter-control {');
    expect(reservationsCss).toContain('.reservation-payment-progress__control {');
  });

  it('moves deferred control chrome onto the prepared module-owner hooks without changing the bridge layout selectors', () => {
    const maintenanceCss = readSource('src/styles/maintenance.css');
    const reservationsCss = readSource('src/styles/reservations.css');

    expect(maintenanceCss).toContain('.maintenance-filter-control {');
    expect(maintenanceCss).toContain('padding-inline: 1.15rem;');
    expect(maintenanceCss).toContain('.maintenance-filter-control:focus {');
    expect(maintenanceCss).toContain(':where(html.dark, body.dark, html.dark-mode, body.dark-mode, html[data-theme="dark"], body[data-theme="dark"]) .maintenance-filter-control {');
    expect(maintenanceCss).toContain('.maintenance-status-filter .form-control,\n.maintenance-status-filter .maintenance-filter-control {\n  width: auto;');

    expect(reservationsCss).toContain('.reservation-payment-progress__control {');
    expect(reservationsCss).toContain('.reservation-payment-progress__control:focus {');
    expect(reservationsCss).toContain('.reservation-payment-progress__control option {');
    expect(reservationsCss).toContain('.reservation-payment-inline-group__control {\n  height: 40px;');
  });

  it('records the batch 6 through batch 15 ledgers in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('### Phase 3A Batch 6 Token Bridge Ledger');
    expect(masterPlan).toContain('**Deleted In Batch 6 (verified unused):**');
    expect(masterPlan).toContain('`--clr-success`');
    expect(masterPlan).toContain('`--bo-brand-primary-strong`');
    expect(masterPlan).toContain('`--bo-radius-control`');
    expect(masterPlan).toContain('**Deferred Deletion Candidates (verified but not removed yet):**');
    expect(masterPlan).toContain('`.btn`');
    expect(masterPlan).toContain('`.form-control`');
    expect(masterPlan).toContain('`.table-responsive`');
    expect(masterPlan).toContain('### Phase 3A Batch 7 Compatibility Alias Ledger');
    expect(masterPlan).toContain('**Deleted In Batch 7 (verified zero-reference aliases):**');
    expect(masterPlan).toContain('`.mt-5`');
    expect(masterPlan).toContain('`.my-3`');
    expect(masterPlan).toContain('`.py-4`');
    expect(masterPlan).toContain('`.input-group-text` dark override in `src/styles/app.css`');
    expect(masterPlan).toContain('### Phase 3A Batch 8 Secondary Owner Alias Ledger');
    expect(masterPlan).toContain('**Deleted In Batch 8 (verified zero-reference aliases):**');
    expect(masterPlan).toContain('`.users-page .input-group-text`');
    expect(masterPlan).toContain('**Deferred Live Secondary-Owner Contracts:**');
    expect(masterPlan).toContain('`src/styles/reports.css`');
    expect(masterPlan).toContain('`src/styles/forms.css`');
    expect(masterPlan).toContain('`src/styles/maintenance.css`');
    expect(masterPlan).toContain('### Phase 3A Batch 9 Live Bridge Consolidation Ledger');
    expect(masterPlan).toContain('**Consolidated In Batch 9:**');
    expect(masterPlan).toContain('`src/styles/reports.css`');
    expect(masterPlan).toContain('`src/styles/forms.css`');
    expect(masterPlan).toContain('### Phase 3A Batch 10 Live Bridge Consolidation Ledger');
    expect(masterPlan).toContain('**Consolidated In Batch 10:**');
    expect(masterPlan).toContain('`#search-customer-input.form-control`');
    expect(masterPlan).toContain('`.maintenance-status-filter .maintenance-filter-control`');
    expect(masterPlan).toContain('### Phase 3A Batch 11 Deferred Bridge Inventory Ledger');
    expect(masterPlan).toContain('**Classified In Batch 11:**');
    expect(masterPlan).toContain('`#maintenance-status-filter`');
    expect(masterPlan).toContain('`#edit-res-payment-progress-type`');
    expect(masterPlan).toContain('### Phase 3A Batch 12 Markup Owner Preparation Ledger');
    expect(masterPlan).toContain('**Prepared In Batch 12:**');
    expect(masterPlan).toContain('`maintenance-filter-control`');
    expect(masterPlan).toContain('`reservation-payment-progress__control`');
    expect(masterPlan).toContain('### Phase 3A Batch 13 Owner Move Ledger');
    expect(masterPlan).toContain('**Moved In Batch 13:**');
    expect(masterPlan).toContain('`.maintenance-filter-control`');
    expect(masterPlan).toContain('`.reservation-payment-progress__control`');
    expect(masterPlan).toContain('### Phase 3A Batch 14 Deferred Bridge Freeze Ledger');
    expect(masterPlan).toContain('**Freeze As Legitimate Module Contracts:**');
    expect(masterPlan).toContain('`.reservation-billing-input`');
    expect(masterPlan).toContain('`.btn-confirm-toggle`');
    expect(masterPlan).toContain('### Phase 3A Batch 15 Stabilization Closeout Ledger');
    expect(masterPlan).toContain('**Closeout Decision:**');
    expect(masterPlan).toContain('ready to exit stabilization');
    expect(masterPlan).toContain('Path A: architectural / cinematic');
  });
});
