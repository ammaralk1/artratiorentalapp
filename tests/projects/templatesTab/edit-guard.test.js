import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  confirmTemplatesManualEditStart,
  markTemplatesManualEdit,
} from '../../../src/scripts/projects/templatesTab/edit-guard.ts';

describe('templatesTab/edit-guard', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('asks for confirmation before editing an autofilled field for the first time', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root" data-template-autofill-state="fresh">
        <div data-template-autofilled="1">
          <div id="editable" contenteditable="true">Filled value</div>
        </div>
      </div>
    `;

    const target = document.getElementById('editable');
    if (!(target instanceof HTMLElement)) throw new Error('missing editable target');

    const state = {
      manualEditConfirmed: false,
      hasManualEdits: false,
    };
    const confirmFn = vi.fn(() => true);
    const setStatus = vi.fn();

    const allowed = confirmTemplatesManualEditStart({
      target,
      state,
      confirmFn,
      setStatus,
      message: 'Confirm manual edit?',
    });

    expect(allowed).toBe(true);
    expect(confirmFn).toHaveBeenCalledWith('Confirm manual edit?');
    expect(state.manualEditConfirmed).toBe(true);
    expect(setStatus).toHaveBeenCalled();
  });

  it('blocks editing when the user cancels the first autofilled edit confirmation and marks manual edits after input', () => {
    document.body.innerHTML = `
      <div id="templates-a4-root" data-template-autofill-state="fresh">
        <div data-template-autofilled="1">
          <div id="editable" contenteditable="true">Filled value</div>
        </div>
      </div>
    `;

    const target = document.getElementById('editable');
    if (!(target instanceof HTMLElement)) throw new Error('missing editable target');
    const blurSpy = vi.spyOn(target, 'blur').mockImplementation(() => {});

    const state = {
      manualEditConfirmed: false,
      hasManualEdits: false,
    };

    const allowed = confirmTemplatesManualEditStart({
      target,
      state,
      confirmFn: () => false,
      message: 'Confirm manual edit?',
    });

    expect(allowed).toBe(false);
    expect(state.manualEditConfirmed).toBe(false);
    expect(blurSpy).toHaveBeenCalled();

    markTemplatesManualEdit({
      target,
      state: {
        manualEditConfirmed: true,
        hasManualEdits: false,
      },
    });
    expect(target.closest('#templates-a4-root')?.getAttribute('data-template-autofill-state')).toBe('edited');
  });
});
