// ✅ استيراد الدوال الخاصة بكل تبويب
import { renderCustomers } from "./customers.js";
import { renderEquipment } from "./equipment.js";
import { renderReservations, setupReservationEvents } from "./reservationsUI.js";
import { renderCalendar } from "./calendar.js";
import { renderTechnicians } from "./technicians.js";
import { renderReports } from "./reports.js";
import { renderMaintenance } from "./maintenance.js";

const ACTIVE_TAB_KEY = "dashboard-active-tab";
const ACTIVE_SUB_TAB_KEY = "dashboard-active-sub-tab";

const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("⚠️ [tabs.js] localStorage.getItem failed", { key, error });
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("⚠️ [tabs.js] localStorage.setItem failed", { key, value, error });
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("⚠️ [tabs.js] localStorage.removeItem failed", { key, error });
    }
  }
};

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

    if (!skipStore) {
      storage.set(ACTIVE_TAB_KEY, target);
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
    }
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      console.log("🖱️ Tab clicked:", target);
      activateTab(target);

      if (target !== "reservations-tab") {
        storage.remove(ACTIVE_SUB_TAB_KEY);
      }
    });
  });

  // ✅ تحديد التبويب المبدئي (مع الأخذ بالحسبان آخر اختيار محفوظ)
  const storedTab = storage.get(ACTIVE_TAB_KEY);
  const defaultTab = document.querySelector("[data-tab].active");
  const initialTarget = storedTab && document.getElementById(storedTab) ? storedTab : defaultTab?.getAttribute("data-tab");

  if (initialTarget) {
    console.log("⭐ Initial tab:", initialTarget);
    activateTab(initialTarget, { skipStore: !!storedTab });
  }

  document.body?.classList.remove("tabs-loading");
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

    if (!skipStore) {
      storage.set(ACTIVE_SUB_TAB_KEY, subTarget);
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

  subTabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const subTarget = btn.getAttribute("data-sub-tab");
      console.log("🖱️ Sub-tab clicked:", subTarget);
      activateSubTab(subTarget);
    });
  });

  const storedSubTab = storage.get(ACTIVE_SUB_TAB_KEY);
  const defaultSubTab = document.querySelector(".sub-tab-button.active");
  const initialSubTarget = storedSubTab && document.getElementById(storedSubTab) ? storedSubTab : defaultSubTab?.getAttribute("data-sub-tab");

  if (initialSubTarget) {
    console.log("⭐ Initial sub-tab:", initialSubTarget);
    activateSubTab(initialSubTarget, { skipStore: !!storedSubTab });
  }

  setupReservationEvents();
}
// تم استبدال زر توليد التقارير بلوحة تفاعلية في تبويب التقارير
