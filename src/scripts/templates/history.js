// Templates history (undo/redo) with debounced pushes
// This module keeps history state isolated and receives hooks from caller

let __HISTORY = [];
let __FUTURE = [];
let __BOUND = false;
let __TIMER = null;

let __getSnapshot = () => null;
let __applySnapshot = () => {};
let __onAutosaveDebounced = () => {};
let __onMarkEditing = () => {};

export function initHistory({ getSnapshot, applySnapshot, onAutosaveDebounced, onMarkEditing } = {}) {
  if (typeof getSnapshot === 'function') __getSnapshot = getSnapshot;
  if (typeof applySnapshot === 'function') __applySnapshot = applySnapshot;
  if (typeof onAutosaveDebounced === 'function') __onAutosaveDebounced = onAutosaveDebounced;
  if (typeof onMarkEditing === 'function') __onMarkEditing = onMarkEditing;
}

export function pushTemplatesHistory() {
  try {
    const snap = __getSnapshot();
    if (!snap) return;
    __HISTORY.push(snap);
    if (__HISTORY.length > 50) __HISTORY.shift();
    __FUTURE = [];
  } catch (_) { /* ignore */ }
}

export function pushHistoryDebounced() {
  try { clearTimeout(__TIMER); } catch (_) {}
  __TIMER = setTimeout(pushTemplatesHistory, 250);
}

export function undoTemplatesChange() {
  if (__HISTORY.length < 2) return; // keep initial state
  const cur = __HISTORY.pop();
  const prev = __HISTORY[__HISTORY.length - 1];
  if (cur) __FUTURE.push(cur);
  if (prev) __applySnapshot(prev);
}

export function redoTemplatesChange() {
  const next = __FUTURE.pop();
  if (!next) return;
  __HISTORY.push(next);
  __applySnapshot(next);
}

export function setupTemplatesHistory(pageRoot, type) {
  try {
    if (type !== 'callsheet') return;
    // Seed initial snapshot once per render
    pushTemplatesHistory();
    if (__BOUND) return;
    const host = document.getElementById('templates-preview-host');
    if (!host) return;
    host.addEventListener('input', (e) => {
      const target = e.target;
      if (target && target.getAttribute && target.getAttribute('data-editable') === 'true') {
        try { pushHistoryDebounced(); } catch (_) {}
        try { __onAutosaveDebounced(); } catch (_) {}
        try { __onMarkEditing(); } catch (_) {}
      }
    }, true);
    __BOUND = true;
  } catch (_) { /* ignore */ }
}

export default {
  initHistory,
  pushTemplatesHistory,
  pushHistoryDebounced,
  undoTemplatesChange,
  redoTemplatesChange,
  setupTemplatesHistory,
};

