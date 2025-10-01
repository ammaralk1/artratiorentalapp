// ✅ استيراد الدوال الخاصة بكل تبويب
import { renderCustomers } from "./customers.js";
import { renderEquipment } from "./equipment.js";
import { renderReservations, setupReservationEvents } from "./reservationsUI.js";
import { renderCalendar } from "./calendar.js";
import { renderTechnicians } from "./technicians.js";
import { renderReports } from "./reports.js";
import { renderMaintenance } from "./maintenance.js";
import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from "./preferencesService.js";

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

  const tabButtons = document.querySelectorAll("[data-tab]");
  const tabContents = document.querySelectorAll(".tab");

  console.log("📌 tabButtons:", tabButtons);
  console.log("📌 tabContents:", tabContents);

  const activateTab = (target, { skipStore = false } = {}) => {
    if (!target) return;

    const tabButton = document.querySelector(`[data-tab="${target}"]`);
    const tabContent = document.getElementById(target);
    if (!tabButton || !tabContent) return;

    // 🔄 تغيير شكل التبويب النشط
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabButton.classList.add("active");

    // 👁️ عرض التبويب المناسب
    tabContents.forEach((content) => {
      const isTarget = content.id === target;
      content.style.display = isTarget ? "block" : "none";
      content.classList.toggle("active", isTarget);
    });

    currentMainTab = target;

    if (!skipStore) {
      updatePreferences({ dashboardTab: target }).catch((error) => {
        console.warn('⚠️ [tabs.js] Failed to store dashboard tab preference', error);
      });
    }

    if (target !== "reservations-tab") {
      currentSubTab = null;
      pendingSubTabPreference = null;
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
    const defaultTabButton = document.querySelector("[data-tab].active");
    const storedTab = prefs?.dashboardTab;
    const initialTarget = storedTab && document.getElementById(storedTab)
      ? storedTab
      : defaultTabButton?.getAttribute("data-tab") || tabButtons[0]?.getAttribute("data-tab");

    if (initialTarget) {
      console.log("⭐ Initial tab:", initialTarget);
      activateTab(initialTarget, { skipStore: true });
    }

    const storedSubTab = prefs?.dashboardSubTab;
    if (storedSubTab) {
      pendingSubTabPreference = storedSubTab;
      if (currentMainTab === 'reservations-tab') {
        activateStoredSubTab(storedSubTab);
        pendingSubTabPreference = null;
      }
    }

    document.body?.classList.remove("tabs-loading");
    tabsInitialised = true;
  };

  getPreferences()
    .then((prefs) => applyInitialTabs(prefs))
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
    const defaultSubTab = document.querySelector(".sub-tab-button.active");
    const initialSubTarget = defaultSubTab?.getAttribute("data-sub-tab");
    if (initialSubTarget) {
      console.log("⭐ Initial sub-tab:", initialSubTarget);
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
