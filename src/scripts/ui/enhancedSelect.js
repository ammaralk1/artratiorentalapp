const SELECT_SELECTOR = "select.form-select:not([data-no-enhance]):not([multiple])";
const STATE_MAP = new WeakMap();

let globalObserver = null;
let outsideClickHandlerAttached = false;
let openWrapper = null;

export function initEnhancedSelects(root = document) {
  if (!root) return;

  root.querySelectorAll(SELECT_SELECTOR).forEach((select) => enhanceSelect(select));

  if (!globalObserver && root === document) {
    globalObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes?.forEach((node) => {
          if (!(node instanceof Element)) return;

          if (node.matches?.(SELECT_SELECTOR)) {
            enhanceSelect(node);
          }

          node.querySelectorAll?.(SELECT_SELECTOR).forEach((select) => enhanceSelect(select));
        });
      }
    });

    globalObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (!outsideClickHandlerAttached) {
    outsideClickHandlerAttached = true;
    document.addEventListener("pointerdown", handleDocumentPointerDown, { capture: true });
  }
}

export function refreshEnhancedSelect(select) {
  if (!(select instanceof HTMLSelectElement)) return;

  if (!select.dataset.enhancedSelect) {
    enhanceSelect(select);
    return;
  }

  const wrapper = select.closest(".enhanced-select");
  if (!wrapper) return;

  buildOptions(wrapper);
  updateTriggerLabel(wrapper);
  updateDisabledState(wrapper);
}

function enhanceSelect(select) {
  if (!(select instanceof HTMLSelectElement)) return;

  if (select.dataset.enhancedSelect) {
    refreshEnhancedSelect(select);
    return;
  }

  if (select.multiple || select.size > 1) {
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "enhanced-select";

  const parent = select.parentNode;
  if (parent) {
    parent.insertBefore(wrapper, select);
  }
  wrapper.appendChild(select);

  select.dataset.enhancedSelect = "true";
  select.classList.add("enhanced-select__native");
  select.setAttribute("tabindex", "-1");
  select.setAttribute("aria-hidden", "true");

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "enhanced-select__trigger";
  trigger.setAttribute("aria-haspopup", "listbox");
  trigger.setAttribute("aria-expanded", "false");

  const menu = document.createElement("ul");
  menu.className = "enhanced-select__menu";
  menu.setAttribute("role", "listbox");
  menu.setAttribute("tabindex", "-1");

  wrapper.append(trigger, menu);

  const state = {
    select,
    trigger,
    menu,
    observer: null,
    refreshRaf: null,
  };

  STATE_MAP.set(wrapper, state);

  trigger.addEventListener("click", () => toggleMenu(wrapper));
  trigger.addEventListener("keydown", (event) => handleTriggerKeydown(event, wrapper));
  menu.addEventListener("click", (event) => handleOptionClick(event, wrapper));
  menu.addEventListener("keydown", (event) => handleMenuKeydown(event, wrapper));

  select.addEventListener("change", () => {
    updateTriggerLabel(wrapper);
    highlightSelectedOption(wrapper);
  });

  state.observer = new MutationObserver((mutations) => {
    let needsOptionsRefresh = false;
    let disabledChanged = false;

    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "disabled") {
        disabledChanged = true;
      }
      if (mutation.type === "childList") {
        needsOptionsRefresh = true;
      }
    }

    if (disabledChanged) {
      updateDisabledState(wrapper);
    }

    if (needsOptionsRefresh) {
      scheduleOptionsRefresh(state, wrapper);
    }
  });

  state.observer.observe(select, { attributes: true, attributeFilter: ["disabled"], childList: true });

  buildOptions(wrapper);
  updateTriggerLabel(wrapper);
  updateDisabledState(wrapper);
}

function scheduleOptionsRefresh(state, wrapper) {
  if (!state) return;
  if (state.refreshRaf) return;

  state.refreshRaf = requestAnimationFrame(() => {
    state.refreshRaf = null;
    buildOptions(wrapper);
    updateTriggerLabel(wrapper);
  });
}

function buildOptions(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  const { select, menu } = state;
  if (!select || !menu) return;

  const options = Array.from(select.options || []);
  const fragment = document.createDocumentFragment();

  options.forEach((option) => {
    const item = document.createElement("li");
    item.className = "enhanced-select__option";
    item.textContent = option.textContent ?? option.value ?? "";
    item.dataset.value = option.value ?? "";
    item.setAttribute("role", "option");
    item.setAttribute("tabindex", "-1");

    if (option.disabled) {
      item.setAttribute("aria-disabled", "true");
      item.classList.add("is-disabled");
    }

    if (option.selected) {
      item.setAttribute("aria-selected", "true");
      item.dataset.selected = "true";
      item.setAttribute("tabindex", "0");
    }

    fragment.appendChild(item);
  });

  menu.innerHTML = "";
  menu.appendChild(fragment);

  highlightSelectedOption(wrapper);
}

function updateTriggerLabel(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  const { select, trigger } = state;
  if (!select || !trigger) return;

  const selectedOption = select.selectedOptions?.[0] ?? select.options?.[select.selectedIndex];
  const label = selectedOption?.textContent?.trim() || selectedOption?.value || "";

  trigger.textContent = label;
}

function highlightSelectedOption(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  const { select, menu } = state;
  if (!select || !menu) return;

  const value = select.value;
  const options = menu.querySelectorAll(".enhanced-select__option");

  options.forEach((optionEl) => {
    const isMatch = optionEl.dataset.value === value;
    optionEl.toggleAttribute("aria-selected", isMatch);
    optionEl.dataset.selected = isMatch ? "true" : "";
    optionEl.setAttribute("tabindex", isMatch ? "0" : "-1");
  });
}

function updateDisabledState(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  const { select, trigger } = state;
  const isDisabled = !!select?.disabled;

  wrapper.classList.toggle("enhanced-select--disabled", isDisabled);
  trigger.disabled = isDisabled;
}

function toggleMenu(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  if (wrapper.getAttribute("data-open") === "true") {
    closeMenu(wrapper);
  } else {
    openMenu(wrapper);
  }
}

function openMenu(wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  if (openWrapper && openWrapper !== wrapper) {
    closeMenu(openWrapper, { focusTrigger: false });
  }

  wrapper.setAttribute("data-open", "true");
  state.trigger.setAttribute("aria-expanded", "true");
  openWrapper = wrapper;

  const selected = state.menu.querySelector('.enhanced-select__option[aria-selected="true"]')
    ?? state.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");

  if (selected) {
    selected.focus();
  } else {
    state.menu.focus();
  }
}

function closeMenu(wrapper, { focusTrigger = true } = {}) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  wrapper.setAttribute("data-open", "false");
  state.trigger.setAttribute("aria-expanded", "false");

  if (focusTrigger) {
    state.trigger.focus({ preventScroll: true });
  }

  if (openWrapper === wrapper) {
    openWrapper = null;
  }
}

function handleDocumentPointerDown(event) {
  if (!openWrapper) return;

  const target = event.target;
  if (!(target instanceof Node)) return;

  if (!openWrapper.contains(target)) {
    closeMenu(openWrapper, { focusTrigger: false });
  }
}

function handleTriggerKeydown(event, wrapper) {
  const key = event.key;
  if (key === "ArrowDown" || key === "ArrowUp" || key === " " || key === "Enter") {
    event.preventDefault();
    openMenu(wrapper);
  } else if (key === "Escape") {
    closeMenu(wrapper);
  }
}

function handleMenuKeydown(event, wrapper) {
  const key = event.key;
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  const options = Array.from(state.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));
  if (!options.length) return;

  const currentIndex = options.findIndex((option) => option === document.activeElement);

  if (key === "ArrowDown" || key === "ArrowUp") {
    event.preventDefault();
    const delta = key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + delta + options.length) % options.length;
    options[nextIndex].focus();
  } else if (key === "Home") {
    event.preventDefault();
    options[0].focus();
  } else if (key === "End") {
    event.preventDefault();
    options[options.length - 1].focus();
  } else if (key === "Enter" || key === " ") {
    event.preventDefault();
    const focused = document.activeElement;
    if (focused && focused.classList.contains("enhanced-select__option")) {
      selectOption(focused, wrapper);
    }
  } else if (key === "Escape") {
    event.preventDefault();
    closeMenu(wrapper);
  }
}

function handleOptionClick(event, wrapper) {
  const option = event.target?.closest?.(".enhanced-select__option");
  if (!option) return;

  selectOption(option, wrapper);
}

function selectOption(optionElement, wrapper) {
  const state = STATE_MAP.get(wrapper);
  if (!state) return;

  if (optionElement.getAttribute("aria-disabled") === "true") {
    return;
  }

  const { select } = state;
  const newValue = optionElement.dataset.value ?? "";

  if (select.value !== newValue) {
    select.value = newValue;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  closeMenu(wrapper);
}
