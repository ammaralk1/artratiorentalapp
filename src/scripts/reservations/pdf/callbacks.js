const callbacks = Object.create(null);

export function registerQuotePdfCallbacks(nextCallbacks = {}) {
  Object.entries(nextCallbacks).forEach(([name, callback]) => {
    if (typeof callback === 'function') {
      callbacks[name] = callback;
    }
  });
}

export function callQuotePdfCallback(name, ...args) {
  const callback = callbacks[name];
  if (typeof callback !== 'function') return undefined;
  return callback(...args);
}
