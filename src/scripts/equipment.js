import { loadData, saveData } from "./storage.js";
import { showToast, normalizeNumbers } from "./utils.js";
import { t } from "./language.js";

let { equipment } = loadData();
equipment = equipment || [];  // ضمان مصفوفة

const XLSX_CDN_URL = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
let xlsxLoaderPromise = null;

function ensureXLSXLoaded() {
  if (typeof XLSX !== "undefined") {
    return Promise.resolve();
  }

  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("XLSX library is not available in this environment"));
  }

  if (xlsxLoaderPromise) {
    return xlsxLoaderPromise;
  }

  xlsxLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-xlsx-loader="true"]');
    if (existing) {
      existing.addEventListener("load", handleResolve, { once: true });
      existing.addEventListener("error", handleReject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = XLSX_CDN_URL;
    script.async = true;
    script.defer = true;
    script.dataset.xlsxLoader = "true";
    script.addEventListener("load", handleResolve, { once: true });
    script.addEventListener("error", handleReject, { once: true });
    document.head.appendChild(script);

    function handleResolve() {
      if (typeof XLSX === "undefined") {
        reject(new Error("XLSX did not load correctly"));
        return;
      }
      resolve();
    }

    function handleReject() {
      reject(new Error("Failed to load XLSX library"));
    }
  }).catch((error) => {
    console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed", error);
    xlsxLoaderPromise = null;
    throw error;
  });

  return xlsxLoaderPromise;
}

/**
 * رفع المعدات من ملف Excel
 */
export async function uploadEquipmentFromExcel(file) {
  if (!file) return;

  try {
    await ensureXLSXLoaded();
  } catch (error) {
    console.error("❌ [equipment.js] Unable to load XLSX library", error);
    alert(t("equipment.toast.xlsxMissing", "⚠️ مكتبة Excel (XLSX) غير محملة. تحقق من اتصال الإنترنت أو الروابط في dashboard.html"));
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (!Array.isArray(rows) || rows.length === 0) {
        showToast(t("equipment.toast.uploadEmpty", "⚠️ لم يتم العثور على بيانات في الملف"));
        return;
      }

      const currentEquipment = loadData().equipment || [];

      rows.forEach(row => {
        currentEquipment.push({
          category: row["القسم"] || "",
          sub: row["القسم الثانوي"] || "",
          desc: row["الوصف"] || "",
          qty: row["الكمية"] || 1,
          price: row["السعر"] || 0,
          barcode: normalizeNumbers(String(row["الباركود"] || "")),
          status: "متاح",
          image: row["الصورة"] || ""
        });
      });

      equipment = currentEquipment;
      saveData({ equipment: currentEquipment });
      showToast(t("equipment.toast.uploadSuccess", "✅ تم رفع المعدات بنجاح"));
      renderEquipment();
    } catch (err) {
      console.error("❌ [equipment.js] Failed to process Excel file", err);
      showToast(t("equipment.toast.uploadFailed", "❌ حدث خطأ أثناء قراءة ملف الإكسل"));
    }
  };

  reader.onerror = function () {
    console.error("❌ [equipment.js] FileReader encountered an error", reader.error);
    showToast(t("equipment.toast.uploadFailed", "❌ حدث خطأ أثناء قراءة ملف الإكسل"));
  };

  reader.readAsArrayBuffer(file);
}

/**
 * مسح كل المعدات
 */
export function clearEquipment() {
  if (!confirm(t("equipment.toast.clearConfirm", "⚠️ هل أنت متأكد من حذف كل المعدات؟"))) return;
  equipment = [];
  saveData({ equipment: [] });
  showToast(t("equipment.toast.clearSuccess", "🗑️ تم مسح جميع المعدات"));
  renderEquipment();
}

function addEquipment(newItem) {
  const stored = getAllEquipment();
  stored.push(newItem);
  equipment = stored;
  saveData({ equipment: stored });
}

/**
 * جلب كل المعدات
 */
export function getAllEquipment() {
  const { equipment } = loadData();
  return equipment || [];
}

function normalizeBarcode(value) {
  return normalizeNumbers(String(value || "")).trim().toLowerCase();
}

/**
 * البحث في المعدات حسب النص والحالة والتصنيف
 */
export function searchEquipment(query = "", status = "", category = "") {
  const normalizedQuery = normalizeNumbers(String(query || "")).toLowerCase().trim();
  const normalizedStatus = String(status || "").trim();
  const normalizedCategory = String(category || "").trim();

  return getAllEquipment().filter((item = {}) => {
    const barcode = normalizeBarcode(item.barcode).toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      (item.name && String(item.name).toLowerCase().includes(normalizedQuery)) ||
      (item.desc && String(item.desc).toLowerCase().includes(normalizedQuery)) ||
      (item.description && String(item.description).toLowerCase().includes(normalizedQuery)) ||
      (barcode && barcode.includes(normalizedQuery)) ||
      (item.category && String(item.category).toLowerCase().includes(normalizedQuery)) ||
      (item.sub && String(item.sub).toLowerCase().includes(normalizedQuery)) ||
      (item.subcategory && String(item.subcategory).toLowerCase().includes(normalizedQuery));

    const matchesStatus = !normalizedStatus || item.status === normalizedStatus;
    const matchesCategory = !normalizedCategory || item.category === normalizedCategory;

    return matchesQuery && matchesStatus && matchesCategory;
  });
}

function isReservationActiveNow(reservation, now) {
  if (!reservation?.start || !reservation?.end) return false;
  const start = new Date(reservation.start);
  const end = new Date(reservation.end);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return false;
  return start <= now && now < end;
}

export function syncEquipmentStatuses() {
  const data = loadData();
  let { equipment: equipmentList = [], reservations = [], maintenance = [] } = data;

  if (!Array.isArray(equipmentList) || equipmentList.length === 0) {
    equipment = equipmentList || [];
    return equipment;
  }

  const now = new Date();
  let changed = false;

  const maintenanceSet = new Set(
    (maintenance || [])
      .filter(ticket => ticket?.status === 'open')
      .map(ticket => normalizeBarcode(ticket?.equipmentBarcode))
  );

  const updated = equipmentList.map(item => {
    if (!item) return item;

    const itemCode = normalizeBarcode(item.barcode);
    const inMaintenance = itemCode && maintenanceSet.has(itemCode);

    const baseStatus = inMaintenance ? "صيانة" : item.status === "صيانة" ? "صيانة" : "متاح";
    let newStatus = baseStatus;

    if (!inMaintenance && itemCode) {
      for (const reservation of reservations || []) {
        if (!isReservationActiveNow(reservation, now)) continue;
        const hasItem = reservation.items?.some(resItem => normalizeBarcode(resItem?.barcode) === itemCode);
        if (hasItem) {
          newStatus = "محجوز";
          break;
        }
      }
    }

    if (newStatus !== item.status) {
      changed = true;
      return { ...item, status: newStatus };
    }

    return item;
  });

  if (changed) {
    equipment = updated;
    saveData({ equipment: updated });
    return updated;
  }

  equipment = updated;
  return updated;
}

/**
 * حذف معدة
 */
export function deleteEquipment(index) {
  const data = getAllEquipment();
  if (!confirm(t("equipment.toast.deleteConfirm", "❌ هل أنت متأكد من حذف هذه المعدة؟"))) return;
  data.splice(index, 1);
  equipment = data;
  saveData({ equipment: data });
  showToast(t("equipment.toast.deleteSuccess", "🗑️ تم حذف المعدة"));
  renderEquipment();
}

/**
 * تعديل معدة
 */
export function editEquipment(index, updatedData) {
  const data = getAllEquipment();
  data[index] = { ...data[index], ...updatedData };
  equipment = data;
  saveData({ equipment: data });
  showToast(t("equipment.toast.editSuccess", "✏️ تم تعديل بيانات المعدة"));
  renderEquipment();
}

/**
 * عرض المعدات مع البحث والفلترة
 */
export function renderEquipment() {
  console.log("✅ renderEquipment تعمل");
  const container = document.getElementById("equipment-list");
  if (!container) return;

  const synced = syncEquipmentStatuses();
  const data = Array.isArray(synced) ? synced : getAllEquipment();
  const entries = data.map((item, index) => ({ item, index }));

  // 🔎 جلب قيم البحث والفلترة
  const rawSearch = document.getElementById("search-equipment")?.value || "";
  const search = normalizeNumbers(rawSearch).toLowerCase().trim();
  const category = document.getElementById("filter-category")?.value || "";
  const sub = document.getElementById("filter-sub")?.value || "";
  const status = document.getElementById("filter-status")?.value || "";

  const filteredEntries = entries.filter(({ item }) => {
    const barcode = normalizeBarcode(item.barcode).toLowerCase();
    const matchesSearch =
      !search ||
      (item.name && item.name.toLowerCase().includes(search)) ||
      (item.desc && item.desc.toLowerCase().includes(search)) ||
      (item.description && item.description.toLowerCase().includes(search)) ||
      (barcode && barcode.includes(search)) ||
      (item.category && item.category.toLowerCase().includes(search)) ||
      (item.sub && item.sub.toLowerCase().includes(search)) ||
      (item.subcategory && item.subcategory.toLowerCase().includes(search));

    const matchesCategory = !category || item.category === category;
    const matchesSub = !sub || item.sub === sub;
    const matchesStatus = !status || item.status === status;

    return matchesSearch && matchesCategory && matchesSub && matchesStatus;
  });

  const sortedEntries = filteredEntries.sort((a, b) => {
    const aCode = normalizeBarcode(a.item.barcode);
    const bCode = normalizeBarcode(b.item.barcode);

    const aNum = parseInt(aCode, 10);
    const bNum = parseInt(bCode, 10);

    const aIsNum = !Number.isNaN(aNum);
    const bIsNum = !Number.isNaN(bNum);

    if (aIsNum && bIsNum && aNum !== bNum) {
      return aNum - bNum;
    }

    return aCode.localeCompare(bCode, 'ar', { numeric: true, sensitivity: 'base' });
  });

  // ✅ عرض القائمة
  const emptyMessage = t("equipment.list.emptyFiltered", "⚠️ لا توجد معدات مطابقة.");
  container.innerHTML = sortedEntries.length
    ? sortedEntries.map(renderEquipmentItem).join("")
    : `<em>${emptyMessage}</em>`;

  const countBadge = document.getElementById("equipment-list-count");
  if (countBadge) {
    const suffix = t("equipment.list.countSuffix", "عنصر");
    const count = normalizeNumbers(String(sortedEntries.length));
    const countText = sortedEntries.length
      ? `${count} ${suffix}`
      : `0 ${suffix}`;
    countBadge.textContent = countText;
  }

  // ✅ تعبئة الفلاتر من البيانات الأصلية
  populateFilters(data);
}

// ✅ تعبئة الفلاتر
function populateFilters(data) {
  const categories = [...new Set(data.map(i => i.category).filter(Boolean))];
  const subs = [...new Set(data.map(i => i.sub).filter(Boolean))];

  const categorySelect = document.getElementById("filter-category");
  const subSelect = document.getElementById("filter-sub");

  if (categorySelect) {
    const currentValue = categorySelect.value;
    while (categorySelect.options.length > 1) {
      categorySelect.remove(1);
    }
    categories.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      categorySelect.appendChild(opt);
    });
    if (categories.includes(currentValue)) {
      categorySelect.value = currentValue;
    }
  }

  if (subSelect) {
    const currentValue = subSelect.value;
    while (subSelect.options.length > 1) {
      subSelect.remove(1);
    }
    subs.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      subSelect.appendChild(opt);
    });
    if (subs.includes(currentValue)) {
      subSelect.value = currentValue;
    }
  }
}

// ✅ عنصر المعدات
function getEquipmentImage(item) {
  return item.image || item.imageUrl || item.img || "";
}

function renderEquipmentItem({ item, index }) {
  const imageUrl = getEquipmentImage(item);
  const editLabel = t("equipment.item.actions.edit", "✏️ تعديل");
  const deleteLabel = t("equipment.item.actions.delete", "🗑️ حذف");
  const imageAlt = t("equipment.item.imageAlt", "صورة");
  const currencyLabel = t("equipment.item.currency", "ريال");
  return `
    <div class="border-bottom py-3 d-flex align-items-center">
      <div class="equipment-image me-3" style="width:120px;height:120px;">
        ${
          imageUrl
            ? `<img src="${imageUrl}" alt="${imageAlt}" class="img-fluid rounded" style="width:100%;height:100%;object-fit:cover;">`
            : `<div class="no-image d-flex align-items-center justify-content-center bg-light rounded" style="width:100%;height:100%;font-size:36px;">📦</div>`
        }
      </div>

      <div class="flex-grow-1">
        <div><strong>🏷️ ${item.desc || "-"}</strong></div>
        <div class="text-muted">${item.category || "-"} - ${item.sub || "-"}</div>

        <div class="mt-1">
          📦 <strong>${item.qty || 0}</strong> | 💵 <strong>${item.price || 0}</strong> ${currencyLabel} | 🔖 ${item.barcode || "-"}
        </div>

        <div class="mt-1">⚙️ ${renderStatus(item.status)}</div>
      </div>

      <div class="ms-3 d-flex flex-column gap-2">
        <button class="btn btn-sm btn-warning" onclick="editEquipmentModal(${index})">${editLabel}</button>
        <button class="btn btn-sm btn-danger" onclick="deleteEquipment(${index})">${deleteLabel}</button>
      </div>
    </div>
  `;
}

function handleAddEquipmentSubmit(event) {
  event.preventDefault();
  const form = event.target;

  const desc = form.querySelector("#new-equipment-desc")?.value?.trim() || "";
  const rawBarcode = form.querySelector("#new-equipment-barcode")?.value || "";
  const barcode = normalizeNumbers(rawBarcode).trim();
  const price = parseFloat(form.querySelector("#new-equipment-price")?.value || "0") || 0;
  const qty = parseInt(form.querySelector("#new-equipment-qty")?.value || "1", 10) || 1;
  const image = form.querySelector("#new-equipment-image")?.value?.trim() || "";
  const category = form.querySelector("#new-equipment-category")?.value?.trim() || "";
  const sub = form.querySelector("#new-equipment-sub")?.value?.trim() || "";
  const status = form.querySelector("#new-equipment-status")?.value || "متاح";

  if (!desc || !barcode) {
    showToast(t("equipment.toast.missingFields", "⚠️ يرجى إدخال الوصف والباركود"));
    return;
  }

  const existing = getAllEquipment();
  if (existing.some(item => normalizeBarcode(item.barcode) === barcode)) {
    showToast(t("equipment.toast.duplicateBarcode", "⚠️ هذا الباركود مستخدم مسبقًا"));
    return;
  }

  const newItem = {
    id: Date.now(),
    category,
    sub,
    desc,
    qty,
    price,
    barcode,
    status,
    image
  };

  addEquipment(newItem);
  showToast(t("equipment.toast.addSuccess", "✅ تم إضافة المعدة"));

  form.reset();
  const statusSelect = form.querySelector("#new-equipment-status");
  if (statusSelect) statusSelect.value = "متاح";

  renderEquipment();
}

// ✅ عرض الحالة كبادج ملون
function renderStatus(status) {
  const value = String(status || "").toLowerCase();
  if (value === "available" || status === "متاح") {
    return `<span class="badge bg-success">${t("equipment.form.options.available", "✅ متاح")}</span>`;
  }
  if (value === "reserved" || status === "محجوز") {
    return `<span class="badge bg-warning text-dark">${t("equipment.form.options.booked", "📌 محجوز")}</span>`;
  }
  if (value === "maintenance" || status === "صيانة") {
    return `<span class="badge bg-danger">${t("equipment.form.options.maintenance", "🛠️ صيانة")}</span>`;
  }
  return `<span class="badge bg-secondary">${status || "-"}</span>`;
}

// ✅ فتح نافذة التعديل
window.editEquipmentModal = function(index) {
  const { equipment } = loadData();
  const item = equipment[index];
  if (!item) return;

  document.getElementById("edit-equipment-index").value = index;
  document.getElementById("edit-equipment-category").value = item.category || "";
  document.getElementById("edit-equipment-subcategory").value = item.sub || "";
  document.getElementById("edit-equipment-description").value = item.desc || "";
  document.getElementById("edit-equipment-quantity").value = item.qty || 1;
  document.getElementById("edit-equipment-price").value = item.price || 0;
  document.getElementById("edit-equipment-barcode").value = item.barcode || "";
  document.getElementById("edit-equipment-status").value = item.status || "متاح";
  document.getElementById("edit-equipment-image").value = getEquipmentImage(item) || "";

  const modal = new bootstrap.Modal(document.getElementById("editEquipmentModal"));
  modal.show();
};

// ✅ عند حفظ التعديلات
document.getElementById("save-equipment-changes")?.addEventListener("click", () => {
  const index = document.getElementById("edit-equipment-index").value;

  const updatedData = {
    category: document.getElementById("edit-equipment-category").value,
    sub: document.getElementById("edit-equipment-subcategory").value,
    desc: document.getElementById("edit-equipment-description").value,
    qty: parseInt(document.getElementById("edit-equipment-quantity").value) || 1,
    price: parseFloat(document.getElementById("edit-equipment-price").value) || 0,
    barcode: document.getElementById("edit-equipment-barcode").value,
    status: document.getElementById("edit-equipment-status").value,
    image: document.getElementById("edit-equipment-image").value,
  };

  editEquipment(index, updatedData);
  bootstrap.Modal.getInstance(document.getElementById("editEquipmentModal")).hide();
  showToast(t("equipment.toast.updateSuccess", "✅ تم تحديث بيانات المعدة بنجاح"));
});

// ✅ تعريف الدوال كـ global عشان تشتغل من الـ HTML مباشرة
window.deleteEquipment = deleteEquipment;
window.clearEquipment = clearEquipment;

// ✅ عند تغيير أي فلتر أو البحث
document.getElementById("search-equipment")?.addEventListener("input", renderEquipment);
document.getElementById("filter-category")?.addEventListener("change", renderEquipment);
document.getElementById("filter-sub")?.addEventListener("change", renderEquipment);
document.getElementById("filter-status")?.addEventListener("change", renderEquipment);
document.getElementById("add-equipment-form")?.addEventListener("submit", handleAddEquipmentSubmit);

// أول تحميل
document.addEventListener("DOMContentLoaded", renderEquipment);
document.addEventListener("language:changed", renderEquipment);
