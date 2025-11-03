// ✅ استيراد الدوال الخفيفة فقط بشكل مباشر
import { renderCustomers } from "./customers.js";
import { renderEquipment } from "./equipment.js";
import { renderTechnicians } from "./technicians.js";
// تمت إزالة الاستيراد الثابت لـ reservationsUI لضمان تحميل كسول فعلي
import { getPreferences, updatePreferences, subscribePreferences, getCachedPreferences } from "./preferencesService.js";

const DASHBOARD_TAB_STORAGE_KEY = "__ART_RATIO_LAST_DASHBOARD_TAB__";
const DASHBOARD_SUB_TAB_STORAGE_KEY = "__ART_RATIO_LAST_DASHBOARD_SUB_TAB__";
const DEFAULT_RESERVATION_SUB_TAB = "create-tab";
const TAB_ID_PATTERN = /^[a-z0-9\-]+$/i;

// Development-only logger: silences logs in production builds
const __IS_DEV__ = typeof import.meta !== 'undefined' && import.meta.env && Boolean(import.meta.env.DEV);
function devLog(...args) {
  if (__IS_DEV__) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function scrollTabButtonIntoView(button) {
  if (!button || typeof button.scrollIntoView !== 'function') return;
  try {
    const track = button.closest('[data-tab-scroll-track]');
    if (!track) return;
    const scrollOptions = { behavior: 'smooth', block: 'nearest', inline: 'center' };
    button.scrollIntoView(scrollOptions);
    const root = track.closest('[data-tab-scroll]');
    if (root) {
      window.requestAnimationFrame(() => {
        root.dispatchEvent(new CustomEvent('tabScroll:update', { bubbles: true }));
      });
    }
  } catch (error) {
    console.warn('⚠️ [tabs.js] Failed to keep tab visible', error);
  }
}

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
let reportsModulePromise = null;
let reservationsModulePromise = null;
let calendarModulePromise = null;
let maintenanceModulePromise = null;
let maintenanceInitialised = false;
let reservationsInitialised = false;

function ensureReportsModule() {
  if (!reportsModulePromise) {
    reportsModulePromise = import('./reports.js')
      .then((module) => {
        try {
          if (typeof module.initReports === 'function') {
            module.initReports();
          }
        } catch (error) {
          console.error('❌ [tabs.js] Failed to initialise reports module', error);
        }
        return module;
      })
      .catch((error) => {
        console.error('❌ [tabs.js] Failed to load reports module', error);
        reportsModulePromise = null;
        throw error;
      });
  }
  return reportsModulePromise;
}

function ensureReservationsModule() {
  if (!reservationsModulePromise) {
    reservationsModulePromise = import('./reservationsUI.js');
  }
  return reservationsModulePromise;
}

function ensureCalendarModule() {
  if (!calendarModulePromise) {
    calendarModulePromise = import('./calendar.js');
  }
  return calendarModulePromise;
}

function ensureMaintenanceModule() {
  if (!maintenanceModulePromise) {
    maintenanceModulePromise = import('./maintenance.js');
  }
  return maintenanceModulePromise;
}

// ✅ الدالة الرئيسية لتفعيل التبويبات
export function setupTabs() {
  devLog("🚀 [tabs.js] setupTabs()");

  const tabButtons = Array.from(document.querySelectorAll('[data-tab]'));
  const tabContents = document.querySelectorAll('.tab-content-wrapper > .tab');

  devLog("📌 tabButtons:", tabButtons);
  devLog("📌 tabContents:", tabContents);

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
        scrollTabButtonIntoView(button);
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

    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('dashboard:tabChanged', {
        detail: { tabId: target }
      }));
    }

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
      devLog("👤 Rendering customers");
      renderCustomers();
    }
    if (!skipRender && target === "equipment-tab") {
      devLog("📦 Rendering equipment");
      renderEquipment();
    }
    if (!skipRender && target === "maintenance-tab") {
      devLog("🛠️ Rendering maintenance");
      ensureMaintenanceModule()
        .then((module) => {
          try {
            // Initialise once to bind events (form submit, filters, table actions)
            if (!maintenanceInitialised && typeof module.initMaintenance === 'function') {
              module.initMaintenance();
              maintenanceInitialised = true;
            } else {
              module.renderMaintenance?.();
            }
          } catch (error) {
            console.error('❌ [tabs.js] Failed to initialise/render maintenance', error);
          }
        })
        .catch((error) => console.error('❌ [tabs.js] Unable to load maintenance module', error));
    }
    if (!skipRender && target === "technicians-tab") {
      devLog("🛠️ Rendering technicians");
      renderTechnicians();
    }
    if (target === "reservations-tab") {
      devLog("📅 Rendering reservations");
      if (!skipRender) {
        // عرض سكلتون خفيف أثناء التحميل الأول
        try {
          const panel = document.getElementById('reservations-tab');
          if (panel && !panel.querySelector('[data-reservations-skeleton]')) {
            const sk = document.createElement('div');
            sk.setAttribute('data-reservations-skeleton', '');
            sk.setAttribute('aria-busy', 'true');
            sk.style.padding = '1rem';
            sk.style.display = 'grid';
            sk.style.gap = '12px';
            // DaisyUI spinner + أشكال سكلتون خفيفة
            const spinner = '<div class="loading loading-spinner loading-md text-primary" role="status" aria-label="Loading" style="justify-self:center;margin:6px 0;"></div>';
            const bars = '<div style="height:12px;background:rgba(148,163,184,0.25);border-radius:8px"></div>'.repeat(6);
            sk.innerHTML = spinner + bars;
            panel.prepend(sk);
          }
        } catch (_) { /* ignore */ }

        // تحميل كسول للوحدة ومن ثم الاستدعاء
        ensureReservationsModule()
          .then(async (module) => {
            // استدعاء الدوال الأساسية مباشرة عند توفرها (يدعم بيئة الاختبار حيث يتم موك الدوال)
            try { module.setupReservationEvents?.(); } catch (_) { /* ignore */ }
            try { module.renderReservations?.(); } catch (_) { /* ignore */ }

            // محاولة تهيئة الواجهة الكاملة إذا كان المُصدِّر متاحًا
            try {
              const init = module?.initializeReservationUI;
              if (!reservationsInitialised && typeof init === 'function') {
                await init();
                reservationsInitialised = true;
              }
            } catch (error) {
              // تجاهل خطأ غياب المُصدِّر في بيئة الاختبار
            }

            // إزالة السكلتون عند أول رسم
            try {
              const panel = document.getElementById('reservations-tab');
              const sk = panel?.querySelector('[data-reservations-skeleton]');
              if (sk) sk.remove();
            } catch (_) { /* ignore */ }
          })
          .catch((error) => console.error('❌ [tabs.js] Unable to load reservations UI module', error));
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

  // Keyboard navigation for tabs (Arrow keys + Home/End)
  const setupKeyboardNavigation = (tablist) => {
    if (!tablist || tablist.dataset.tabKeyboardBound === 'true') return;
    const isVertical = tablist.getAttribute('aria-orientation') === 'vertical';
    tablist.addEventListener('keydown', (event) => {
      const key = event.key;
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"], .tab-button, .sub-tab-button'))
        .filter((el) => el.matches('[data-tab], [data-sub-tab]'));
      if (!tabs.length) return;
      const current = event.target;
      const index = Math.max(0, tabs.indexOf(current));
      let nextIndex = index;

      const prev = () => { nextIndex = (index - 1 + tabs.length) % tabs.length; };
      const next = () => { nextIndex = (index + 1) % tabs.length; };
      const first = () => { nextIndex = 0; };
      const last = () => { nextIndex = tabs.length - 1; };

      let handled = false;
      switch (key) {
        case 'ArrowLeft':
          if (!isVertical) { prev(); handled = true; }
          break;
        case 'ArrowRight':
          if (!isVertical) { next(); handled = true; }
          break;
        case 'ArrowUp':
          if (isVertical) { prev(); handled = true; }
          break;
        case 'ArrowDown':
          if (isVertical) { next(); handled = true; }
          break;
        case 'Home':
          first(); handled = true; break;
        case 'End':
          last(); handled = true; break;
        case 'Enter':
        case ' ': // Space
          // Activate current focused tab
          handled = true;
          current?.click();
          break;
        default:
          break;
      }

      if (handled) {
        event.preventDefault();
        const targetEl = tabs[nextIndex];
        if (targetEl && targetEl !== current) {
          targetEl.focus();
          // Activate on focus to keep UX consistent
          targetEl.click();
        }
      }
    });
    tablist.dataset.tabKeyboardBound = 'true';
  };

  document.querySelectorAll('[role="tablist"]').forEach(setupKeyboardNavigation);

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
      devLog("🖱️ Tab clicked:", target);
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
      devLog('⭐ Initial tab:', targetTab);
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
          const locallyStoredSubTab = readStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY);
          if (!locallyStoredSubTab) {
            activateStoredSubTab(null);
          } else if (locallyStoredSubTab !== currentSubTab) {
            activateStoredSubTab(locallyStoredSubTab);
          }
        }
      } else if (prefs.dashboardSubTab) {
        pendingSubTabPreference = prefs.dashboardSubTab;
      }
    });
  }
}

// ✅ إدارة التبويبات الفرعية للحجوزات
function setupSubTabs() {
  devLog("🚀 [tabs.js] setupSubTabs()");

  const subTabButtons = document.querySelectorAll('#reservations-tab .sub-tab-button');
  const subTabContents = document.querySelectorAll('#reservations-tab .sub-tab');

  devLog("📌 subTabButtons:", subTabButtons);
  devLog("📌 subTabContents:", subTabContents);

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

    const isAlreadyActive = currentSubTab === targetToActivate
      && subTabButton.classList.contains('active')
      && subTabContent.classList.contains('active')
      && subTabContent.getAttribute('aria-hidden') === 'false';

    if (isAlreadyActive) {
      subTabContent.removeAttribute('hidden');
      subTabContent.style.display = 'block';
      subTabContent.setAttribute('aria-hidden', 'false');
      currentSubTab = targetToActivate;

      scrollTabButtonIntoView(subTabButton);

      if (!skipStore) {
        writeStoredTab(DASHBOARD_SUB_TAB_STORAGE_KEY, targetToActivate);
        updatePreferences({ dashboardSubTab: targetToActivate }).catch((error) => {
          console.warn('⚠️ [tabs.js] Failed to store sub-tab preference', error);
        });
      }

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
    scrollTabButtonIntoView(subTabButton);

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

    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('reservations:subTabChanged', {
        detail: { subTabId: targetToActivate }
      }));
    }

    if (targetToActivate === "my-reservations-tab") {
      devLog("📋 Rendering reservations list");
      setTimeout(() => {
        ensureReservationsModule()
          .then((module) => { try { module.renderReservations?.(); } catch (e) { console.error('❌ [tabs.js] Failed to render reservations list', e); } })
          .catch((error) => console.error('❌ [tabs.js] Unable to load reservations UI module', error));
      }, 50); // ⏱ تأخير بسيط حتى يظهر العنصر فعليًا
    } else if (targetToActivate === "calendar-tab") {
      devLog("📅 Rendering calendar view");
      setTimeout(() => {
        ensureCalendarModule()
          .then((module) => { try { module.renderCalendar?.(); } catch (e) { console.error('❌ [tabs.js] Failed to render calendar', e); } })
          .catch((error) => console.error('❌ [tabs.js] Unable to load calendar module', error));
      }, 100);
    } else if (targetToActivate === "reports-tab") {
      devLog("📊 Rendering reports view");
      ensureReportsModule()
        .then((module) => {
          const { renderReports } = module;
          setTimeout(() => {
            try {
              renderReports?.();
            } catch (error) {
              console.error('❌ [tabs.js] Failed to render reports tab', error);
            }
          }, 50);
        })
        .catch((error) => {
          console.error('❌ [tabs.js] Unable to load reports tab', error);
        });
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
    if (!btn.dataset.subTabListenerAttached) {
      btn.addEventListener("click", () => {
        const subTarget = btn.getAttribute("data-sub-tab");
        devLog("🖱️ Sub-tab clicked:", subTarget);
        activateSubTab(subTarget);
      });
      btn.dataset.subTabListenerAttached = 'true';
    }
  });

  if (pendingSubTabPreference) {
    activateSubTab(pendingSubTabPreference, { skipStore: true });
    pendingSubTabPreference = null;
  } else {
    const defaultSubTab = document.querySelector('#reservations-tab .sub-tab-button.active');
    const fallbackSubTab = resolveFallbackSubTarget();
    const initialSubTarget = defaultSubTab?.getAttribute('data-sub-tab') || fallbackSubTab;
    if (initialSubTarget) {
      devLog('⭐ Initial sub-tab:', initialSubTarget);
      activateSubTab(initialSubTarget, { skipStore: true });
    }
  }

  // ملاحظة: تهيئة أحداث الحجوزات ستتم عند فتح تبويب الحجوزات لأول مرة عبر initializeReservationUI
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

  const isCurrentTabActive = () => {
    const activeButton = document.querySelector(`[data-tab].active[data-tab="${targetTab}"]`);
    const activePanel = document.getElementById(targetTab);
    return Boolean(activeButton && activePanel?.classList.contains('active') && activePanel?.style.display !== 'none');
  };

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

    const activeButton = document.querySelector('#reservations-tab .sub-tab-button.active');
    const activeContent = document.querySelector('#reservations-tab .sub-tab.active');
    const activeSubTabId = activeContent?.id || activeButton?.getAttribute('data-sub-tab') || null;

    if (targetSubTab && activeSubTabId === targetSubTab && isCurrentTabActive()) {
      if (activeContent) {
        activeContent.removeAttribute('hidden');
        activeContent.style.display = 'block';
        activeContent.setAttribute('aria-hidden', 'false');
      }
      return true;
    }

    if (targetSubTab) {
      pendingSubTabPreference = targetSubTab;
    } else if (attemptsLeft > 0) {
      return false;
    }
  } else if (isCurrentTabActive()) {
    return true;
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
