import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  createTemplatesCompositionHandlers,
  createTemplatesFocusHandlers,
  createTemplatesHostInputHandler,
  createTemplatesMouseDownHandler,
  createTemplatesRepopulateController,
  populateProjectSelectOptions,
  populateReservationSelectOptions,
} from '../../../src/scripts/projects/templatesTab/controller.ts';

describe('templatesTab/controller', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('populates project and reservation selects', () => {
    document.body.innerHTML = `
      <select id="templates-project"></select>
      <select id="templates-reservation"></select>
    `;
    const projectSelect = document.getElementById('templates-project');
    const reservationSelect = document.getElementById('templates-reservation');
    if (!(projectSelect instanceof HTMLSelectElement) || !(reservationSelect instanceof HTMLSelectElement)) {
      throw new Error('missing selects');
    }

    populateProjectSelectOptions(projectSelect, [
      { id: 2, title: 'Project Two' },
      { id: 4, title: '' },
    ]);
    populateReservationSelectOptions(reservationSelect, [
      { id: 8, title: 'Reservation Eight' },
      { reservationId: 9, title: '' },
    ]);

    expect(projectSelect.options).toHaveLength(3);
    expect(projectSelect.options[1]?.textContent).toBe('Project Two');
    expect(projectSelect.options[2]?.textContent).toBe('#4');
    expect(reservationSelect.options).toHaveLength(3);
    expect(reservationSelect.options[1]?.textContent).toBe('Reservation Eight');
    expect(reservationSelect.options[2]?.textContent).toBe('#9');
  });

  it('preserves the selected reservation when the options are repopulated with the same reservation id', () => {
    document.body.innerHTML = `<select id="templates-reservation"><option value="">— بدون ربط —</option><option value="218" selected>#218</option></select>`;
    const reservationSelect = document.getElementById('templates-reservation');
    if (!(reservationSelect instanceof HTMLSelectElement)) {
      throw new Error('missing reservation select');
    }

    reservationSelect.value = '218';
    populateReservationSelectOptions(reservationSelect, [
      { id: 217, title: 'Reservation 217' },
      { id: 218, title: 'Reservation 218' },
    ]);

    expect(reservationSelect.value).toBe('218');
    expect(reservationSelect.options[2]?.selected).toBe(true);
  });

  it('updates expense row totals and schedules recompute/enforce while typing', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <table class="exp-details">
        <tbody>
          <tr data-row="item">
            <td contenteditable="true">Code</td>
            <td contenteditable="true">Name</td>
            <td id="rate-cell" contenteditable="true">100</td>
            <td contenteditable="true">2</td>
            <td contenteditable="true">3</td>
            <td contenteditable="true">0</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    `;
    const editable = document.getElementById('rate-cell');
    if (!(editable instanceof HTMLElement)) throw new Error('missing editable cell');
    Object.defineProperty(editable, 'isContentEditable', { value: true, configurable: true });

    const timers = { inputTimer: null, enforceTimer: null };
    const markEditing = vi.fn();
    const recomputeSubtotalsDebounced = vi.fn();
    const enforceCallsheetSizing = vi.fn();
    const handler = createTemplatesHostInputHandler({
      timers,
      isComposing: () => false,
      markEditing,
      recomputeSubtotalsDebounced,
      enforceCallsheetSizing,
    });

    handler({ target: editable });

    const totalCell = document.querySelector('tr[data-row="item"] td:nth-child(7)');
    expect(markEditing).toHaveBeenCalledTimes(1);
    expect(totalCell?.textContent).toBe('600');

    await vi.advanceTimersByTimeAsync(79);
    expect(enforceCallsheetSizing).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(enforceCallsheetSizing).toHaveBeenCalledTimes(1);

    await vi.advanceTimersByTimeAsync(99);
    expect(recomputeSubtotalsDebounced).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(recomputeSubtotalsDebounced).toHaveBeenCalledWith(420);
  });

  it('builds composition and focus handlers without force-focusing on generic mouse-down', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <table class="exp-details">
        <tbody>
          <tr data-row="item">
            <td data-editable="true"><div id="inner-edit" contenteditable="true">Text</div></td>
            <td>Locked</td>
          </tr>
        </tbody>
      </table>
    `;
    const inner = document.getElementById('inner-edit');
    if (!(inner instanceof HTMLElement)) throw new Error('missing editable node');

    const setComposing = vi.fn();
    const handleInput = vi.fn();
    const enforceCallsheetSizing = vi.fn();
    const { onCompositionStart, onCompositionEnd } = createTemplatesCompositionHandlers({
      setComposing,
      handleInput,
      enforceCallsheetSizing,
    });
    const { onFocusIn, onFocusOut } = createTemplatesFocusHandlers({
      recomputeSubtotalsDebounced: vi.fn(),
      enforceCallsheetSizing,
    });
    const onMouseDown = createTemplatesMouseDownHandler();

    const focusSpy = vi.spyOn(inner, 'focus').mockImplementation(() => {});

    onCompositionStart(new CompositionEvent('compositionstart'));
    onCompositionEnd({ target: inner });
    onFocusIn({ target: inner });
    expect(inner.closest('td')?.classList.contains('editing')).toBe(true);
    onFocusOut({ target: inner });
    expect(inner.closest('td')?.classList.contains('editing')).toBe(false);
    onMouseDown({ target: inner });

    await vi.advanceTimersByTimeAsync(0);

    expect(setComposing).toHaveBeenNthCalledWith(1, true);
    expect(setComposing).toHaveBeenNthCalledWith(2, false);
    expect(handleInput).toHaveBeenCalledTimes(1);
    expect(enforceCallsheetSizing).toHaveBeenCalled();
    expect(focusSpy).not.toHaveBeenCalled();
  });

  it('debounces repopulation, preserves selection, and avoids duplicate renders for the same key', async () => {
    vi.useFakeTimers();
    document.body.innerHTML = `
      <select id="templates-project">
        <option value="">--</option>
        <option value="2" selected>Old</option>
      </select>
    `;
    const projectSelect = document.getElementById('templates-project');
    if (!(projectSelect instanceof HTMLSelectElement)) throw new Error('missing project select');

    const refreshProjectsIfNeeded = vi.fn(async () => {});
    const refreshReservationsIfNeeded = vi.fn(async () => {});
    const populateProjectSelect = vi.fn(() => {
      projectSelect.innerHTML = '<option value="">--</option><option value="2">Project Two</option>';
    });
    const populateReservationSelect = vi.fn();
    const renderPreview = vi.fn();
    const populateSavedTemplates = vi.fn(async () => {});
    const timerRef = { current: null };
    let editing = false;

    const { scheduleRepopulate } = createTemplatesRepopulateController({
      timerRef,
      projectSelect,
      getReservationValue: () => '',
      getType: () => 'expenses',
      isEditing: () => editing,
      refreshProjectsIfNeeded,
      refreshReservationsIfNeeded,
      populateProjectSelect,
      populateReservationSelect,
      renderPreview,
      populateSavedTemplates,
    });

    scheduleRepopulate();
    scheduleRepopulate();
    await vi.advanceTimersByTimeAsync(419);
    expect(renderPreview).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(1);
    expect(refreshProjectsIfNeeded).toHaveBeenCalledTimes(1);
    expect(refreshReservationsIfNeeded).toHaveBeenCalledTimes(1);
    expect(populateProjectSelect).toHaveBeenCalledTimes(1);
    expect(projectSelect.value).toBe('2');
    expect(populateReservationSelect).toHaveBeenCalledWith('2');
    expect(renderPreview).toHaveBeenCalledTimes(1);
    expect(populateSavedTemplates).toHaveBeenCalledTimes(1);

    scheduleRepopulate(0);
    await vi.advanceTimersByTimeAsync(0);
    expect(renderPreview).toHaveBeenCalledTimes(1);

    editing = true;
    scheduleRepopulate(0);
    await vi.advanceTimersByTimeAsync(0);
    expect(renderPreview).toHaveBeenCalledTimes(1);

    editing = false;
    scheduleRepopulate(0);
    await vi.advanceTimersByTimeAsync(0);
    expect(renderPreview).toHaveBeenCalledTimes(1);
  });
});
