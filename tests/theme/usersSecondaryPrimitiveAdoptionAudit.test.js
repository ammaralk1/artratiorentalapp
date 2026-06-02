import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const readSource = (relativePath) => readFileSync(resolve(process.cwd(), relativePath), 'utf8');

describe('users secondary primitive adoption audit', () => {
  it('adopts the shared table, modal, and badge aliases on the users page without dropping compatibility classes', () => {
    const usersPage = readSource('src/pages/users.html');

    expect(usersPage).toContain('class="ui-badge ui-badge--outline badge badge-outline badge-error badge-lg"');
    expect(usersPage).toContain('class="users-table-wrapper overflow-x-auto"');
    expect(usersPage).toContain('class="ui-table table table-hover align-middle users-table surface-table" id="users-table"');
    expect(usersPage).toContain('class="ui-modal__content modal-content users-modal-content"');
    expect(usersPage).toContain('class="ui-modal__header modal-header users-modal-header"');
    expect(usersPage).toContain('class="ui-modal__body modal-body users-modal-body"');
    expect(usersPage).toContain('class="ui-modal__footer modal-footer"');
    expect(usersPage).toContain('class="ui-table-shell table-responsive border rounded p-2 users-logs-table-wrapper" id="user-sessions-container"');
    expect(usersPage).toContain('class="ui-table table table-sm mb-0 users-logs-table"');
  });

  it('records the users page as the first live table/modal/badge adoption target in the master plan', () => {
    const masterPlan = readSource('docs/UI_REDESIGN_MASTER_PLAN.md');

    expect(masterPlan).toContain('Phase 3 Users Secondary Primitive Adoption');
    expect(masterPlan).toContain('`users.html` now proves the new shared `Table`, `Modal`, and `Badge` bridge aliases on a live extracted surface');
    expect(masterPlan).toContain('`ui-tabs` adoption still needs a real tabbed extracted page');
  });
});
