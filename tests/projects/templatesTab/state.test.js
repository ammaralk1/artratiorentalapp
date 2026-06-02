import { beforeEach, describe, expect, it } from 'vitest';

import {
  resetTemplatesRuntimeState,
  setTemplatesHydratedReservation,
  templatesTabState,
} from '../../../src/scripts/projects/templatesTab/state.ts';

describe('templatesTab/state', () => {
  beforeEach(() => {
    resetTemplatesRuntimeState();
  });

  it('resets runtime-owned mutable fields back to the shared baseline', () => {
    templatesTabState.eventsBound = true;
    templatesTabState.hostEl = document.createElement('div');
    templatesTabState.repopulateTimer = setTimeout(() => {}, 1);
    templatesTabState.tableUnbind = () => {};
    templatesTabState.subtotalTimer = setTimeout(() => {}, 1);
    templatesTabState.expensesUnbind = () => {};
    templatesTabState.isComposing = true;
    templatesTabState.inputTimer = setTimeout(() => {}, 1);
    templatesTabState.enforceTimer = setTimeout(() => {}, 1);
    templatesTabState.manualEditConfirmed = true;
    templatesTabState.hasManualEdits = true;
    setTemplatesHydratedReservation({ id: 218, title: 'Reservation 218' });
    templatesTabState.listeners.hostInput = () => {};
    templatesTabState.listeners.projChanged = () => {};

    resetTemplatesRuntimeState();

    expect(templatesTabState.eventsBound).toBe(false);
    expect(templatesTabState.hostEl).toBeNull();
    expect(templatesTabState.repopulateTimer).toBeNull();
    expect(templatesTabState.tableUnbind).toBeNull();
    expect(templatesTabState.subtotalTimer).toBeNull();
    expect(templatesTabState.expensesUnbind).toBeNull();
    expect(templatesTabState.isComposing).toBe(false);
    expect(templatesTabState.inputTimer).toBeNull();
    expect(templatesTabState.enforceTimer).toBeNull();
    expect(templatesTabState.manualEditConfirmed).toBe(false);
    expect(templatesTabState.hasManualEdits).toBe(false);
    expect(templatesTabState.hydratedReservations).toEqual({});
    expect(templatesTabState.listeners.hostInput).toBeNull();
    expect(templatesTabState.listeners.projChanged).toBeNull();
  });
});
