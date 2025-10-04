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
let restorePendingTimeout = null;

// ✅ الدالة الرئيسية لتفعيل التبويبات
export function setupTabs() {
  console.log("🚀 [tabs.js] setupTabs()");

  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const tabContents = document.querySelectorAll('.tab');

  console.log("📌 tabButtons:", tabButtons);
  console.log("📌 tabContents:", tabContents);

  const activateTab = (target, { skipStore = false } = {}) => {
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
    if (target === "customers-tab") {
      console.log("👤 Rendering customers");
      renderCustomers();
    }
    if (target === "equipment-tab") {
      console.log("📦 Rendering equipment");
      renderEquipment();
    }
    if (target === "maintenance-tab") {
      console.log("🛠️ Rendering maintenance");
      renderMaintenance();
    }
    if (target === "technicians-tab") {
      console.log("🛠️ Rendering technicians");
      renderTechnicians();
    }
    if (target === "reservations-tab") {
      console.log("📅 Rendering reservations");
      renderReservations();
      setupSubTabs();
      if (pendingSubTabPreference) {
        activateStoredSubTab(pendingSubTabPreference);
        pendingSubTabPreference = null;
      }
    }
  };

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

      if (target !== "reservations-tab") {
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

  const subTabButtons = document.querySelectorAll(".sub-tab-button");
  const subTabContents = document.querySelectorAll(".sub-tab");

  console.log("📌 subTabButtons:", subTabButtons);
  console.log("📌 subTabContents:", subTabContents);

  const activateSubTab = (subTarget, { skipStore = false } = {}) => {
    if (!subTarget) return;

    const subTabButton = document.querySelector(`.sub-tab-button[data-sub-tab="${subTarget}"]`);
    const subTabContent = document.getElementById(subTarget);
    if (!subTabButton || !subTabContent) return;

    subTabButtons.forEach((b) => b.classList.remove("active"));
    subTabButton.classList.add("active");

    subTabContents.forEach((subContent) => {
      subContent.classList.remove("active");
    });
    subTabContent.classList.add("active");

    currentSubTab = subTarget;

    writeStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY, subTarget);

    if (!skipStore) {
      updatePreferences({ dashboardSubTab: subTarget }).catch((error) => {
        console.warn('⚠️ [tabs.js] Failed to store sub-tab preference', error);
      });
    }

    if (subTarget === "my-reservations-tab") {
      console.log("📋 Rendering reservations list");
      setTimeout(() => {
        renderReservations();
      }, 50); // ⏱ تأخير بسيط حتى يظهر العنصر فعليًا
    } else if (subTarget === "calendar-tab") {
      console.log("📅 Rendering calendar view");
      setTimeout(() => {
        renderCalendar();
      }, 100);
    } else if (subTarget === "reports-tab") {
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
      subTabButtons.forEach((b) => b.classList.remove('active'));
      subTabContents.forEach((subContent) => subContent.classList.remove('active'));
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
    const defaultSubTab = document.querySelector('.sub-tab-button.active');
    const fallbackSubTab = subTabButtons.length ? subTabButtons[0].getAttribute('data-sub-tab') : null;
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

function restoreActiveTabsView() {
  if (!tabsInitialised) {
    return;
  }

  const cachedPrefs = resolveCachedPreferences();
  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const tabContents = Array.from(document.querySelectorAll('.tab'));

  if (!tabButtons.length || !tabContents.length) {
    return;
  }

  const activeContent = tabContents.find((tab) => tab.classList.contains('active'));
  const activeButton = tabButtons.find((btn) => btn.classList.contains('active'));

  let target = activeContent?.id
    ?? activeButton?.dataset.tab
    ?? (cachedPrefs.dashboardTab && document.getElementById(cachedPrefs.dashboardTab) ? cachedPrefs.dashboardTab : null)
    ?? (() => {
      const stored = readStoredTab(DASHBOARD_TAB_STORAGE_KEY);
      return stored && document.getElementById(stored) ? stored : null;
    })()
    ?? tabButtons[0]?.dataset.tab;

  if (!target) {
    return;
  }

  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === target;
    btn.classList.toggle('active', isActive);
  });

  tabContents.forEach((content) => {
    const isActive = content.id === target;
    content.style.display = isActive ? 'block' : 'none';
    content.classList.toggle('active', isActive);
  });

  currentMainTab = target;

  if (target === 'reservations-tab') {
    const subButtons = Array.from(document.querySelectorAll('.sub-tab-button'));
    const subContents = Array.from(document.querySelectorAll('.sub-tab'));

    if (subButtons.length && subContents.length) {
      const activeSubContent = subContents.find((sub) => sub.classList.contains('active'));
      const activeSubButton = subButtons.find((btn) => btn.classList.contains('active'));

      let subTarget = activeSubContent?.id
        ?? activeSubButton?.dataset.subTab
        ?? (cachedPrefs.dashboardSubTab && document.getElementById(cachedPrefs.dashboardSubTab) ? cachedPrefs.dashboardSubTab : null)
        ?? (() => {
          const stored = readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY);
          return stored && document.getElementById(stored) ? stored : null;
        })()
        ?? subButtons[0]?.dataset.subTab;

      if (subTarget) {
        subButtons.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.subTab === subTarget);
        });

        subContents.forEach((sub) => {
          sub.classList.toggle('active', sub.id === subTarget);
        });

        currentSubTab = subTarget;
      }
    }
  }
}

function scheduleRestoreActiveTabs() {
  if (!tabsInitialised) {
    return;
  }

  if (restorePendingTimeout) {
    clearTimeout(restorePendingTimeout);
  }

  restorePendingTimeout = setTimeout(() => {
    restoreActiveTabsView();
  }, 0);
}

document.addEventListener('language:translationsReady', scheduleRestoreActiveTabs);
document.addEventListener('language:changed', scheduleRestoreActiveTabs);
document.addEventListener('theme:changed', scheduleRestoreActiveTabs);
// تم استبدال زر توليد التقارير بلوحة تفاعلية في تبويب التقارير
