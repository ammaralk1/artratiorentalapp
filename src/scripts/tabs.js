// ✅ استيراد الدوال الخاصة بكل تبويب
import { renderCustomers } from "./customers.js";
import { renderEquipment } from "./equipment.js";
import { renderReservations, setupReservationEvents } from "./reservationsUI.js";
import { renderCalendar } from "./calendar.js";
import { renderTechnicians } from "./technicians.js";
import { renderReports } from "./reports.js";
import { renderMaintenance } from "./maintenance.js";
import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from "./preferencesService.js";

const DASHBOARD_TAB_STORAGE_KEY = "__ART_RATIO_LAST_DASHBOARD_TAB__";
const DASHBOARD_SUB_TAB_STORAGE_KEY = "__ART_RATIO_LAST_DASHBOARD_SUB_TAB__";
const DEFAULT_RESERVATION_SUB_TAB = "create-tab";
const TAB_ID_PATTERN = /^[a-z0-9\-]+$/i;

function readStoredTab(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return null;
    }
    const value = window.localStorage.getItem(key);
    if (!value || !TAB_ID_PATTERN.test(value)) {
      return null;
    }
    return value;
  } catch (error) {
    console.warn("⚠️ [tabs.js] Failed to read stored tab", error);
    return null;
  }
}

function writeStoredTab(key, value) {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    if (!value || !TAB_ID_PATTERN.test(value)) {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.warn("⚠️ [tabs.js] Failed to persist tab", error);
  }
}

function clearStoredTab(key) {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return;
    }
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn("⚠️ [tabs.js] Failed to clear stored tab", error);
  }
}

let currentMainTab = null;
let currentSubTab = null;
let tabsInitialised = false;
let pendingSubTabPreference = null;
let unsubscribePreferences = null;
let activateSubTabRef = null;
let activateTabRef = null;
let restorePendingTimeout = null;

// ✅ الدالة الرئيسية لتفعيل التبويبات
export function setupTabs() {
  console.log("🚀 [tabs.js] setupTabs()");

  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const tabContents = document.querySelectorAll('.tab-content-wrapper > .tab');

  console.log("📌 tabButtons:", tabButtons);
  console.log("📌 tabContents:", tabContents);

  const activateTab = (target, { skipStore = false, skipRender = false } = {}) => {
    if (!target) return;

    const matchingButtons = tabButtons.filter((button) => button?.getAttribute('data-tab') === target);
    const tabContent = document.getElementById(target);
    if (!matchingButtons.length || !tabContent) return;

    // 🔄 تغيير شكل التبويب النشط
    tabButtons.forEach((button) => {
      const isActive = button?.getAttribute('data-tab') === target;
      button.classList.toggle('active', isActive);
      if (isActive) {
        button.setAttribute('aria-selected', 'true');
        button.setAttribute('tabindex', '0');
      } else {
        button.setAttribute('aria-selected', 'false');
        button.setAttribute('tabindex', '-1');
      }
    });

    // 👁️ عرض التبويب المناسب
    tabContents.forEach((content) => {
      const isTarget = content.id === target;
      content.style.display = isTarget ? "block" : "none";
      content.classList.toggle("active", isTarget);
    });

    currentMainTab = target;

    writeStoredTab(DASHBOARD_TAB_STORAGE_KEY, target);

    if (!skipStore) {
      updatePreferences({ dashboardTab: target }).catch((error) => {
        console.warn('⚠️ [tabs.js] Failed to store dashboard tab preference', error);
      });
    }

    if (target !== "reservations-tab") {
      currentSubTab = null;
      pendingSubTabPreference = null;
      clearStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY);
      if (!skipStore) {
        updatePreferences({ dashboardSubTab: null }).catch((error) => {
          console.warn('⚠️ [tabs.js] Failed to clear sub-tab preference', error);
        });
      }
    }

    // 📌 استدعاء الدوال الخاصة بكل تبويب
    if (!skipRender && target === "customers-tab") {
      console.log("👤 Rendering customers");
      renderCustomers();
    }
    if (!skipRender && target === "equipment-tab") {
      console.log("📦 Rendering equipment");
      renderEquipment();
    }
    if (!skipRender && target === "maintenance-tab") {
      console.log("🛠️ Rendering maintenance");
      renderMaintenance();
    }
    if (!skipRender && target === "technicians-tab") {
      console.log("🛠️ Rendering technicians");
      renderTechnicians();
    }
    if (target === "reservations-tab") {
      console.log("📅 Rendering reservations");
      if (!skipRender) {
        renderReservations();
      }

      if (!pendingSubTabPreference) {
        const storedSubPreference = readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY);
        pendingSubTabPreference = currentSubTab || storedSubPreference || DEFAULT_RESERVATION_SUB_TAB;
      }

      setupSubTabs();
      if (pendingSubTabPreference) {
        activateStoredSubTab(pendingSubTabPreference);
        pendingSubTabPreference = null;
      }
    }
  };

  activateTabRef = activateTab;

  tabButtons.forEach((btn) => {
    if (!btn) return;
    if (!btn.getAttribute('type')) {
      btn.setAttribute('type', 'button');
    }
    btn.setAttribute('role', 'tab');
    if (!btn.hasAttribute('tabindex')) {
      btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');
    }
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      console.log("🖱️ Tab clicked:", target);
      activateTab(target);

      if (target === "reservations-tab") {
        const storedSubPreference = currentSubTab || readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY) || DEFAULT_RESERVATION_SUB_TAB;
        if (typeof activateSubTabRef === 'function') {
          activateSubTabRef(storedSubPreference);
        } else {
          pendingSubTabPreference = storedSubPreference;
        }
      } else {
        updatePreferences({ dashboardSubTab: null }).catch((error) => {
          console.warn('⚠️ [tabs.js] Failed to clear sub-tab preference', error);
        });
      }
    });
  });

  const applyInitialTabs = (prefs) => {
    const defaultTabButton = document.querySelector('[data-tab].active');
    const localStoredTab = readStoredTab(DASHBOARD_TAB_STORAGE_KEY);
    const fallbackTab = tabButtons[0]?.getAttribute('data-tab') || null;

    const candidateTabs = [
      prefs?.dashboardTab,
      localStoredTab,
      currentMainTab,
      defaultTabButton?.getAttribute('data-tab'),
      fallbackTab,
    ].filter(Boolean);

    const targetTab = candidateTabs.find((tabId) => document.getElementById(tabId)) || fallbackTab;

    if (targetTab && (!tabsInitialised || targetTab !== currentMainTab)) {
      console.log('⭐ Initial tab:', targetTab);
      activateTab(targetTab, { skipStore: true });
    }

    const storedSubCandidates = [
      prefs?.dashboardSubTab,
      readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY),
    ].filter(Boolean);

    const storedSubTab = storedSubCandidates.find((subId) => document.getElementById(subId));

    if (storedSubTab) {
      if (currentMainTab === 'reservations-tab' && typeof activateSubTabRef === 'function') {
        if (!tabsInitialised || storedSubTab !== currentSubTab) {
          activateSubTabRef(storedSubTab, { skipStore: true });
        }
      } else {
        pendingSubTabPreference = storedSubTab;
      }
    }

    if (!tabsInitialised) {
      document.body?.classList.remove('tabs-loading');
      document.body?.classList.remove('no-js');
      tabsInitialised = true;
    }
  };

  const cachedPrefs = typeof getCachedPreferences === 'function' ? getCachedPreferences() : null;
  applyInitialTabs(cachedPrefs || null);

  getPreferences()
    .then((prefs) => applyInitialTabs(prefs || null))
    .catch((error) => {
      console.warn('⚠️ [tabs.js] Failed to load tab preferences', error);
      applyInitialTabs(null);
    });

  if (!unsubscribePreferences) {
    unsubscribePreferences = subscribePreferences((prefs) => {
      if (!tabsInitialised || !prefs) return;
      if (prefs.dashboardTab && prefs.dashboardTab !== currentMainTab) {
        activateTab(prefs.dashboardTab, { skipStore: true });
      }
      if (currentMainTab === 'reservations-tab') {
        if (prefs.dashboardSubTab && prefs.dashboardSubTab !== currentSubTab) {
          activateStoredSubTab(prefs.dashboardSubTab);
        } else if (!prefs.dashboardSubTab && currentSubTab) {
          activateStoredSubTab(null);
        }
      } else if (prefs.dashboardSubTab) {
        pendingSubTabPreference = prefs.dashboardSubTab;
      }
    });
  }
}

// ✅ إدارة التبويبات الفرعية للحجوزات
function setupSubTabs() {
  console.log("🚀 [tabs.js] setupSubTabs()");

  const subTabButtons = document.querySelectorAll('#reservations-tab .sub-tab-button');
  const subTabContents = document.querySelectorAll('#reservations-tab .sub-tab');

  console.log("📌 subTabButtons:", subTabButtons);
  console.log("📌 subTabContents:", subTabContents);

  if (!subTabButtons.length) {
    console.warn('⚠️ [tabs.js] No reservation sub-tab buttons found');
    return;
  }

  const availableSubTargets = Array.from(subTabButtons)
    .map((btn) => btn?.getAttribute('data-sub-tab'))
    .filter((value) => typeof value === 'string' && value.trim().length > 0);

  const resolveFallbackSubTarget = () => {
    if (!availableSubTargets.length) {
      return null;
    }
    if (availableSubTargets.includes(DEFAULT_RESERVATION_SUB_TAB)) {
      return DEFAULT_RESERVATION_SUB_TAB;
    }
    return availableSubTargets[0];
  };

  const activateSubTab = (subTarget, { skipStore = false } = {}) => {
    if (!availableSubTargets.length) return;

    let targetToActivate = subTarget;
    if (!targetToActivate || !availableSubTargets.includes(targetToActivate)) {
      console.warn('⚠️ [tabs.js] Invalid sub-tab target, falling back to first available', {
        requested: targetToActivate,
        available: availableSubTargets
      });
      targetToActivate = resolveFallbackSubTarget();
    }

    const subTabButton = document.querySelector(`#reservations-tab .sub-tab-button[data-sub-tab="${targetToActivate}"]`);
    const subTabContent = document.getElementById(targetToActivate);
    if (!subTabButton || !subTabContent) {
      console.warn('⚠️ [tabs.js] Unable to locate sub-tab button/content after fallback', {
        target: targetToActivate
      });
      return;
    }

    subTabButtons.forEach((buttonEl) => {
      buttonEl.classList.remove('active');
      if (buttonEl.classList.contains('tab')) {
        buttonEl.classList.remove('tab-active');
      }
      buttonEl.setAttribute('aria-selected', 'false');
      buttonEl.setAttribute('tabindex', '-1');
    });
    subTabButton.classList.add('active');
    if (subTabButton.classList.contains('tab')) {
      subTabButton.classList.add('tab-active');
    }
    subTabButton.setAttribute('aria-selected', 'true');
    subTabButton.setAttribute('tabindex', '0');

    subTabContents.forEach((subContent) => {
      const isActive = subContent.id === targetToActivate;
      subContent.classList.toggle('active', isActive);
      subContent.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      if (!isActive) {
        subContent.setAttribute('hidden', '');
        subContent.style.display = 'none';
      } else {
        subContent.removeAttribute('hidden');
        subContent.style.display = 'block';
      }
    });

    currentSubTab = targetToActivate;

    writeStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY, targetToActivate);

    if (!skipStore) {
      updatePreferences({ dashboardSubTab: targetToActivate }).catch((error) => {
        console.warn('⚠️ [tabs.js] Failed to store sub-tab preference', error);
      });
    }

    if (targetToActivate === "my-reservations-tab") {
      console.log("📋 Rendering reservations list");
      setTimeout(() => {
        renderReservations();
      }, 50); // ⏱ تأخير بسيط حتى يظهر العنصر فعليًا
    } else if (targetToActivate === "calendar-tab") {
      console.log("📅 Rendering calendar view");
      setTimeout(() => {
        renderCalendar();
      }, 100);
    } else if (targetToActivate === "reports-tab") {
      console.log("📊 Rendering reports view");
      setTimeout(() => {
        renderReports();
      }, 50);
    }
  };

  activateSubTabRef = (target, options = {}) => {
    if (target) {
      activateSubTab(target, options);
    } else {
      // Clear active state
      subTabButtons.forEach((buttonEl) => {
        buttonEl.classList.remove('active');
        if (buttonEl.classList.contains('tab')) {
          buttonEl.classList.remove('tab-active');
        }
        buttonEl.setAttribute('aria-selected', 'false');
        buttonEl.setAttribute('tabindex', '-1');
      });
      subTabContents.forEach((subContent) => {
        subContent.classList.remove('active');
        subContent.setAttribute('aria-hidden', 'true');
        subContent.setAttribute('hidden', '');
        subContent.style.display = 'none';
      });
      currentSubTab = null;
      clearStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY);
    }
  };

  subTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const subTarget = btn.getAttribute("data-sub-tab");
      console.log("🖱️ Sub-tab clicked:", subTarget);
      activateSubTab(subTarget);
    });
  });

  if (pendingSubTabPreference) {
    activateSubTab(pendingSubTabPreference, { skipStore: true });
    pendingSubTabPreference = null;
  } else {
    const defaultSubTab = document.querySelector('#reservations-tab .sub-tab-button.active');
    const fallbackSubTab = resolveFallbackSubTarget();
    const initialSubTarget = defaultSubTab?.getAttribute('data-sub-tab') || fallbackSubTab;
    if (initialSubTarget) {
      console.log('⭐ Initial sub-tab:', initialSubTarget);
      activateSubTab(initialSubTarget, { skipStore: true });
    }
  }

  setupReservationEvents();
}

function activateStoredSubTab(subTarget) {
  if (typeof activateSubTabRef === 'function') {
    activateSubTabRef(subTarget, { skipStore: true });
  } else if (subTarget) {
    pendingSubTabPreference = subTarget;
  }
}

function resolveCachedPreferences() {
  try {
    if (typeof getCachedPreferences === 'function') {
      return getCachedPreferences() || {};
    }
  } catch (error) {
    console.warn('⚠️ [tabs.js] Failed to read cached preferences', error);
  }
  return {};
}

function restoreActiveTabsView({ attemptsLeft = 0 } = {}) {
  if (!tabsInitialised || typeof activateTabRef !== 'function') {
    return false;
  }

  const cachedPrefs = resolveCachedPreferences();
  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));

  if (!tabButtons.length) {
    return false;
  }

  const fallbackTab = tabButtons[0]?.dataset.tab || null;

  const candidateTabs = [
    currentMainTab,
    (() => document.querySelector('[data-tab].active')?.getAttribute('data-tab') || null)(),
    cachedPrefs.dashboardTab,
    readStoredTab(DASHBOARD_TAB_STORAGE_KEY),
    fallbackTab
  ].filter(Boolean);

  const targetTab = candidateTabs.find((tabId) => document.getElementById(tabId));

  if (!targetTab) {
    return false;
  }

  if (targetTab === 'reservations-tab') {
    const subButtons = Array.from(document.querySelectorAll('#reservations-tab .sub-tab-button'));
    if (!subButtons.length) {
      return false;
    }

    const fallbackSub = subButtons[0]?.getAttribute('data-sub-tab') || null;

    const candidateSubTabs = [
      currentSubTab,
      (() => document.querySelector('#reservations-tab .sub-tab-button.active')?.getAttribute('data-sub-tab') || null)(),
      (() => document.querySelector('#reservations-tab .sub-tab.active')?.id || null)(),
      cachedPrefs.dashboardSubTab,
      readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY),
      fallbackSub
    ].filter(Boolean);

    const targetSubTab = candidateSubTabs.find((subId) => document.getElementById(subId));
    if (targetSubTab) {
      pendingSubTabPreference = targetSubTab;
    } else if (attemptsLeft > 0) {
      return false;
    }
  }

  activateTabRef(targetTab, { skipStore: true, skipRender: true });
  return true;
}

function scheduleRestoreActiveTabs() {
  if (!tabsInitialised) {
    return;
  }

  let attempts = 0;
  const maxAttempts = 5;

  if (restorePendingTimeout) {
    clearTimeout(restorePendingTimeout);
    restorePendingTimeout = null;
  }

  const attemptRestore = () => {
    const success = restoreActiveTabsView({ attemptsLeft: maxAttempts - attempts });
    if (success) {
      restorePendingTimeout = null;
      return;
    }
    if (attempts >= maxAttempts) {
      restorePendingTimeout = null;
      return;
    }
    attempts += 1;
    restorePendingTimeout = setTimeout(attemptRestore, 50 * (attempts + 1));
  };

  attemptRestore();
}

document.addEventListener('language:translationsReady', scheduleRestoreActiveTabs);
document.addEventListener('language:changed', scheduleRestoreActiveTabs);
document.addEventListener('theme:changed', scheduleRestoreActiveTabs);
// تم استبدال زر توليد التقارير بلوحة تفاعلية في تبويب التقارير
