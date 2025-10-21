// ✅ استيراد التوابع المطلوبة
import { renderEquipment, uploadEquipmentFromExcel, syncEquipmentStatuses } from './equipment.js';
import { syncTechniciansStatuses } from './technicians.js';
import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { setupTabs } from "./tabs.js";
import { migrateOldData } from "./storage.js";
import { initReports } from "./reports.js";
import { initMaintenance } from "./maintenance.js";
import { initTabScrollers } from "./ui/tabScroller.js";
import { initEquipmentPackages } from './equipmentPackagesManager.js';

console.log("🚀 [main.js] Script loaded");

applyStoredTheme();

migrateOldData();
console.log("🗃️ [main.js] migrateOldData() executed");

syncEquipmentStatuses();
console.log("🔄 [main.js] syncEquipmentStatuses() executed");

syncTechniciansStatuses();
console.log("🔄 [main.js] syncTechniciansStatuses() executed");

setInterval(() => {
  renderEquipment();
  syncTechniciansStatuses();
}, 15 * 1000);

// ✅ التحقق من تسجيل الدخول
checkAuth();
console.log("🔑 [main.js] checkAuth() executed");

document.addEventListener('DOMContentLoaded', () => {
  console.log("📌 [main.js] DOMContentLoaded fired");

  setupTabs();
  console.log("✅ [main.js] setupTabs() called");

  initTabScrollers();
  console.log("✅ [main.js] initTabScrollers() called");

  initThemeToggle();
  initMaintenance();
  initReports();
  initEquipmentPackages();

  // ✅ زر تسجيل الخروج
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    console.log("🔗 [main.js] Logout button found");
    logoutBtn.addEventListener("click", () => {
      console.log("🚪 [main.js] Logout clicked");
      logout();
    });
  } else {
    console.warn("⚠️ [main.js] Logout button NOT found");
  }

  // ✅ ربط زر رفع ملف الإكسل
  const excelUpload = document.getElementById("excel-upload");
  if (excelUpload) {
    console.log("📂 [main.js] Excel upload input found");
    excelUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      console.log("📤 [main.js] Excel file selected:", file);
      if (file) uploadEquipmentFromExcel(file);
      e.target.value = ""; // يسمح بإعادة اختيار نفس الملف لاحقاً
    });
  } else {
    console.warn("⚠️ [main.js] Excel upload input NOT found");
  }

}); // ← ✅ تم إغلاق DOMContentLoaded هنا
