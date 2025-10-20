const RESERVATIONS_UI_READY_EVENT = 'reservations-ui:ready';

const bridge = typeof EventTarget !== 'undefined' ? new EventTarget() : null;
let handlersSnapshot = {};

function cloneHandlers(source) {
  return Object.freeze({ ...source });
}

function emitReadyEvent() {
  if (!bridge) return;
  const detail = handlersSnapshot;
  const event = typeof CustomEvent === 'function'
    ? new CustomEvent(RESERVATIONS_UI_READY_EVENT, { detail })
    : { type: RESERVATIONS_UI_READY_EVENT, detail };

  if (typeof bridge.dispatchEvent === 'function') {
    bridge.dispatchEvent(event);
  }
}

export function setReservationsUIHandlers(partialHandlers = {}) {
  if (!partialHandlers || typeof partialHandlers !== 'object') {
    return handlersSnapshot;
  }

  const nextHandlers = { ...handlersSnapshot };
  Object.entries(partialHandlers).forEach(([key, value]) => {
    if (typeof value === 'function') {
      nextHandlers[key] = value;
    } else if (value === null) {
      delete nextHandlers[key];
    }
  });

  handlersSnapshot = cloneHandlers(nextHandlers);
  emitReadyEvent();
  return handlersSnapshot;
}

export function getReservationsUIHandlers() {
  return handlersSnapshot;
}

export function getReservationUIHandler(name) {
  if (!name) return undefined;
  return handlersSnapshot?.[name];
}

export function waitForReservationsUIHandlers() {
  if (handlersSnapshot && Object.keys(handlersSnapshot).length > 0) {
    return Promise.resolve(handlersSnapshot);
  }

  return new Promise((resolve) => {
    const listener = (event) => {
      if (bridge) {
        bridge.removeEventListener(RESERVATIONS_UI_READY_EVENT, listener);
      }
      resolve(event?.detail || handlersSnapshot);
    };

    if (bridge) {
      bridge.addEventListener(RESERVATIONS_UI_READY_EVENT, listener, { once: true });
    }
  });
}

export function waitForReservationUIHandler(name) {
  const existing = getReservationUIHandler(name);
  if (typeof existing === 'function') {
    return Promise.resolve(existing);
  }

  return new Promise((resolve) => {
    const listener = (event) => {
      const handlers = event?.detail || handlersSnapshot;
      const candidate = handlers?.[name];
      if (typeof candidate === 'function') {
        if (bridge) {
          bridge.removeEventListener(RESERVATIONS_UI_READY_EVENT, listener);
        }
        resolve(candidate);
      }
    };

    if (bridge) {
      bridge.addEventListener(RESERVATIONS_UI_READY_EVENT, listener);
    }
  });
}

export function onReservationsUIReady(callback, { once = true } = {}) {
  if (typeof callback !== 'function') return () => {};

  const current = handlersSnapshot;
  if (current && Object.keys(current).length > 0) {
    callback(current);
    return () => {};
  }

  if (!bridge) {
    return () => {};
  }

  const listener = (event) => {
    callback(event?.detail || handlersSnapshot);
    if (once) {
      bridge.removeEventListener(RESERVATIONS_UI_READY_EVENT, listener);
    }
  };

  bridge.addEventListener(RESERVATIONS_UI_READY_EVENT, listener, { once });
  return () => bridge.removeEventListener(RESERVATIONS_UI_READY_EVENT, listener);
}

export function getReservationsUIEventTarget() {
  return bridge;
}

export function __resetReservationsUIHandlersForTests() {
  handlersSnapshot = {};
}

export { RESERVATIONS_UI_READY_EVENT };
