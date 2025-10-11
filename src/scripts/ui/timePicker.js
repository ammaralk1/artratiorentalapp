const DEFAULT_OPTIONS = {
  minuteStep: 5,
  defaultHour: 9,
  defaultMinute: 0,
  closeOnSelect: true,
};

const INSTANCES = new WeakMap();
let openInstance = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function alignMinute(minute, step) {
  const normalizedStep = step && Number.isFinite(step) ? clamp(Math.abs(step), 1, 30) : 5;
  const division = Math.round(minute / normalizedStep);
  const aligned = division * normalizedStep;
  if (aligned >= 60) {
    return Math.max(60 - normalizedStep, 0);
  }
  return aligned;
}

function parseTime(value) {
  if (!value) return null;
  const match = String(value).trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  let hour = Number.parseInt(match[1], 10);
  let minute = Number.parseInt(match[2], 10);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour < 0 || hour > 23) return null;
  minute = clamp(minute, 0, 59);
  return { hour, minute };
}

function formatTime(hour, minute) {
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return '';
  }
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function updatePreview(instance) {
  if (!instance.previewEl) return;
  const { hour, minute } = instance.state;
  if (Number.isFinite(hour) && Number.isFinite(minute)) {
    instance.previewEl.textContent = formatTime(hour, minute);
  } else {
    instance.previewEl.textContent = '--:--';
  }
}

function updateActiveButtons(buttons = [], value) {
  buttons.forEach((button) => {
    if (!button) return;
    const buttonValue = Number.parseInt(button.dataset.value ?? '', 10);
    const isActive = Number.isFinite(buttonValue) && buttonValue === value;
    button.classList.toggle('is-active', isActive);
  });
}

function dispatchValueEvents(input) {
  const inputEvent = new Event('input', { bubbles: true });
  input.dispatchEvent(inputEvent);
  const changeEvent = new Event('change', { bubbles: true });
  input.dispatchEvent(changeEvent);
}

function applyTime(instance, hour, minute, { emitEvents = true } = {}) {
  const resolvedHour = clamp(hour ?? instance.state.hour ?? instance.options.defaultHour, 0, 23);
  const alignedMinute = alignMinute(minute ?? instance.state.minute ?? instance.options.defaultMinute, instance.options.minuteStep);
  const formatted = formatTime(resolvedHour, alignedMinute);
  const previous = instance.input.value;

  instance.state.hour = resolvedHour;
  instance.state.minute = alignedMinute;
  instance.input.value = formatted;

  updatePreview(instance);
  updateActiveButtons(instance.hourButtons, resolvedHour);
  updateActiveButtons(instance.minuteButtons, alignedMinute);

  if (emitEvents && formatted !== previous) {
    dispatchValueEvents(instance.input);
  }
}

function clearTime(instance, { emitEvents = true } = {}) {
  const hadValue = Boolean(instance.input.value);
  instance.state.hour = null;
  instance.state.minute = null;
  instance.input.value = '';
  updatePreview(instance);
  updateActiveButtons(instance.hourButtons, NaN);
  updateActiveButtons(instance.minuteButtons, NaN);
  if (emitEvents && hadValue) {
    dispatchValueEvents(instance.input);
  }
}

function closePanel(instance) {
  if (!instance) return;
  instance.panel.classList.remove('is-open');
  instance.wrapper.classList.remove('is-open');
  instance.input.setAttribute('aria-expanded', 'false');
  if (openInstance === instance) {
    openInstance = null;
  }
}

function focusInput(instance) {
  if (!instance) return;
  if (document.activeElement !== instance.input) {
    instance.input.focus({ preventScroll: true });
  }
}

function openPanel(instance) {
  if (!instance) return;
  if (openInstance && openInstance !== instance) {
    closePanel(openInstance);
  }

  const { input, panel, wrapper } = instance;
  wrapper.classList.add('is-open');
  panel.classList.add('is-open');
  input.setAttribute('aria-expanded', 'true');
  openInstance = instance;

  // Update with the current input value whenever we open the panel.
  const parsed = parseTime(input.value);
  if (parsed) {
    instance.state.hour = parsed.hour;
    instance.state.minute = alignMinute(parsed.minute, instance.options.minuteStep);
  } else {
    instance.state.hour = instance.options.defaultHour;
    instance.state.minute = alignMinute(instance.options.defaultMinute, instance.options.minuteStep);
  }
  applyTime(instance, instance.state.hour, instance.state.minute, { emitEvents: false });

  // Ensure width matches the input width (plus padding for the panel layout).
  const inputRect = input.getBoundingClientRect();
  const minWidth = Math.max(Math.round(inputRect.width) + 32, 260);
  panel.style.minWidth = `${minWidth}px`;
}

function onDocumentPointerDown(event) {
  if (!openInstance) return;
  const { wrapper } = openInstance;
  if (!wrapper.contains(event.target)) {
    closePanel(openInstance);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('pointerdown', onDocumentPointerDown, { capture: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && openInstance) {
      closePanel(openInstance);
      focusInput(openInstance);
    }
  });
}

function createButton({ label, value, type, onClick }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `time-picker__option time-picker__option--${type}`;
  button.dataset.value = String(value);
  button.textContent = label;
  button.addEventListener('click', () => onClick(value));
  return button;
}

function createActionButton({ label, action, variant = 'ghost' }) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `time-picker__action time-picker__action--${variant}`;
  button.textContent = label;
  button.addEventListener('click', action);
  return button;
}

function attachPanel(instance) {
  const { options } = instance;
  const panel = document.createElement('div');
  panel.className = 'time-picker__panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'false');
  panel.setAttribute('aria-label', 'اختيار الوقت');

  const header = document.createElement('div');
  header.className = 'time-picker__header';
  const label = document.createElement('p');
  label.className = 'time-picker__label';
  label.textContent = 'الوقت المختار';
  const preview = document.createElement('div');
  preview.className = 'time-picker__preview';
  preview.textContent = '--:--';
  header.append(label, preview);

  const body = document.createElement('div');
  body.className = 'time-picker__body';

  const hourSection = document.createElement('section');
  hourSection.className = 'time-picker__section';
  const hourLabel = document.createElement('p');
  hourLabel.className = 'time-picker__section-label';
  hourLabel.textContent = 'الساعات';
  const hourGrid = document.createElement('div');
  hourGrid.className = 'time-picker__grid time-picker__grid--hours';

  const hourButtons = [];
  for (let hour = 0; hour < 24; hour += 1) {
    const labelHour = formatTime(hour, 0).slice(0, 2);
    const button = createButton({
      label: labelHour,
      value: hour,
      type: 'hour',
      onClick: (selectedHour) => {
        instance.state.hour = selectedHour;
        updateActiveButtons(instance.hourButtons, selectedHour);
        updatePreview(instance);
      }
    });
    hourButtons.push(button);
    hourGrid.appendChild(button);
  }
  hourSection.append(hourLabel, hourGrid);

  const minuteSection = document.createElement('section');
  minuteSection.className = 'time-picker__section';
  const minuteLabel = document.createElement('p');
  minuteLabel.className = 'time-picker__section-label';
  minuteLabel.textContent = 'الدقائق';
  const minuteGrid = document.createElement('div');
  minuteGrid.className = 'time-picker__grid time-picker__grid--minutes';

  const minuteButtons = [];
  for (let minute = 0; minute < 60; minute += options.minuteStep) {
    const button = createButton({
      label: String(minute).padStart(2, '0'),
      value: minute,
      type: 'minute',
      onClick: (selectedMinute) => {
        instance.state.minute = selectedMinute;
        updateActiveButtons(instance.minuteButtons, selectedMinute);
        updatePreview(instance);
        if (instance.state.hour == null) {
          instance.state.hour = options.defaultHour;
          updateActiveButtons(instance.hourButtons, instance.state.hour);
        }
        applyTime(instance, instance.state.hour, selectedMinute);
        if (options.closeOnSelect) {
          closePanel(instance);
        }
      }
    });
    minuteButtons.push(button);
    minuteGrid.appendChild(button);
  }
  minuteSection.append(minuteLabel, minuteGrid);

  body.append(hourSection, minuteSection);

  const actions = document.createElement('div');
  actions.className = 'time-picker__actions';
  const nowButton = createActionButton({
    label: 'الآن',
    variant: 'primary',
    action: () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = alignMinute(now.getMinutes(), options.minuteStep);
      applyTime(instance, currentHour, currentMinute);
      closePanel(instance);
    }
  });
  const clearButton = createActionButton({
    label: 'مسح',
    variant: 'ghost',
    action: () => {
      clearTime(instance);
      closePanel(instance);
    }
  });
  const doneButton = createActionButton({
    label: 'تم',
    variant: 'secondary',
    action: () => {
      if (instance.state.hour == null) {
        instance.state.hour = options.defaultHour;
      }
      if (instance.state.minute == null) {
        instance.state.minute = alignMinute(options.defaultMinute, options.minuteStep);
      }
      applyTime(instance, instance.state.hour, instance.state.minute);
      closePanel(instance);
    }
  });
  actions.append(nowButton, doneButton, clearButton);

  panel.append(header, body, actions);

  instance.wrapper.appendChild(panel);
  instance.previewEl = preview;
  instance.panel = panel;
  instance.hourButtons = hourButtons;
  instance.minuteButtons = minuteButtons;
  updatePreview(instance);
}

function ensureInstance(input, options = {}) {
  if (!input) return null;
  if (INSTANCES.has(input)) {
    return INSTANCES.get(input);
  }

  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const wrapper = document.createElement('div');
  wrapper.className = 'time-picker';
  input.classList.add('time-picker__field');
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('readonly', 'true');
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-haspopup', 'dialog');
  input.setAttribute('aria-expanded', 'false');

  const parent = input.parentElement;
  if (parent) {
    parent.insertBefore(wrapper, input);
  }
  wrapper.appendChild(input);

  const instance = {
    input,
    wrapper,
    panel: null,
    previewEl: null,
    hourButtons: [],
    minuteButtons: [],
    options: mergedOptions,
    state: {
      hour: null,
      minute: null,
    },
    api: null,
  };

  attachPanel(instance);

  input.addEventListener('focus', () => openPanel(instance));
  input.addEventListener('click', () => openPanel(instance));

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const parsed = parseTime(input.value) ?? { hour: mergedOptions.defaultHour, minute: mergedOptions.defaultMinute };
      const nextHour = (parsed.hour + 1) % 24;
      applyTime(instance, nextHour, parsed.minute);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      const parsed = parseTime(input.value) ?? { hour: mergedOptions.defaultHour, minute: mergedOptions.defaultMinute };
      const prevHour = (parsed.hour - 1 + 24) % 24;
      applyTime(instance, prevHour, parsed.minute);
    }
  });

  const api = {
    setDate: (value) => {
      if (!value) {
        clearTime(instance, { emitEvents: false });
        return;
      }
      const parsed = parseTime(value);
      if (parsed) {
        applyTime(instance, parsed.hour, parsed.minute, { emitEvents: false });
      }
    },
    clear: () => {
      clearTime(instance, { emitEvents: false });
    },
    destroy: () => {
      clearTime(instance, { emitEvents: false });
      closePanel(instance);
      input.classList.remove('time-picker__field');
      input.removeAttribute('readonly');
      input.removeAttribute('role');
      input.removeAttribute('aria-haspopup');
      input.removeAttribute('aria-expanded');
      wrapper.replaceWith(input);
      INSTANCES.delete(input);
      if (instance.panel?.parentElement) {
        instance.panel.parentElement.removeChild(instance.panel);
      }
    },
    config: {
      dateFormat: 'H:i',
    },
  };

  instance.api = api;
  input._flatpickr = api;
  INSTANCES.set(input, instance);

  const initialValue = parseTime(input.value);
  if (initialValue) {
    applyTime(instance, initialValue.hour, initialValue.minute, { emitEvents: false });
  }

  return instance;
}

export function registerTimePicker(input, options = {}) {
  const instance = ensureInstance(input, options);
  if (!instance) return null;
  return instance.api;
}

export function initTimePickers(selectors = [], options = {}) {
  if (!Array.isArray(selectors)) return [];
  return selectors.map((selector) => {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return null;
    return registerTimePicker(element, options);
  });
}

export function setTimePickerValue(elementId, value) {
  const element = typeof elementId === 'string'
    ? document.getElementById(elementId)
    : elementId;
  if (!element) return;

  const instance = INSTANCES.get(element);
  if (instance) {
    if (value) {
      const parsed = parseTime(value);
      if (parsed) {
        applyTime(instance, parsed.hour, parsed.minute, { emitEvents: false });
      } else {
        clearTime(instance, { emitEvents: false });
      }
    } else {
      clearTime(instance, { emitEvents: false });
    }
    return;
  }

  if (element._flatpickr) {
    element._flatpickr.setDate(value || null, true);
    return;
  }

  element.value = value || '';
}

export function clearTimePicker(elementId) {
  const element = typeof elementId === 'string'
    ? document.getElementById(elementId)
    : elementId;
  if (!element) return;
  const instance = INSTANCES.get(element);
  if (instance) {
    clearTime(instance, { emitEvents: false });
  } else if (element._flatpickr) {
    element._flatpickr.clear();
  } else {
    element.value = '';
  }
}
