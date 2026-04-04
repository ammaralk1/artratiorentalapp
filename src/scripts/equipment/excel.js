import { normalizeNumbers, showToast } from '../utils.js';
import { t } from '../language.js';
import { userCanManageDestructiveActions, notifyPermissionDenied } from '../auth.js';
import { getAllEquipment, setEquipment } from './state.js';
import { buildEquipmentPayload, resolveApiErrorMessage, normalizeStatusValue, getEquipmentImage } from './normalize.js';
import { apiRequest } from '../apiClient.js';
import { mapApiEquipment, refreshEquipmentFromApi } from './api.js';
import { renderEquipment } from './render.js';

const XLSX_CDN_URL = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
let xlsxLoaderPromise = null;

function ensureXLSXLoaded() {
  if (typeof XLSX !== 'undefined') return Promise.resolve();

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('XLSX library is not available in this environment'));
  }

  if (xlsxLoaderPromise) return xlsxLoaderPromise;

  xlsxLoaderPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-xlsx-loader="true"]');
    if (existing) {
      existing.addEventListener('load', handleResolve, { once: true });
      existing.addEventListener('error', handleReject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = XLSX_CDN_URL;
    script.async = true;
    script.defer = true;
    script.dataset.xlsxLoader = 'true';
    script.addEventListener('load', handleResolve, { once: true });
    script.addEventListener('error', handleReject, { once: true });
    document.head.appendChild(script);

    function handleResolve() {
      if (typeof XLSX === 'undefined') {
        reject(new Error('XLSX did not load correctly'));
        return;
      }
      resolve();
    }

    function handleReject() {
      reject(new Error('Failed to load XLSX library'));
    }
  }).catch((error) => {
    console.warn('⚠️ [equipment/excel.js] ensureXLSXLoaded failed', error);
    xlsxLoaderPromise = null;
    throw error;
  });

  return xlsxLoaderPromise;
}


export async function uploadEquipmentFromExcel(file) {
  if (!userCanManageDestructiveActions()) {
    notifyPermissionDenied();
    return;
  }
  if (!file) return;

  try {
    await ensureXLSXLoaded();
  } catch (error) {
    console.error('❌ [equipment/excel.js] Unable to load XLSX', error);
    alert(t('equipment.toast.xlsxMissing', '⚠️ مكتبة Excel (XLSX) غير محملة.'));
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (!Array.isArray(rows) || rows.length === 0) {
        showToast(t('equipment.toast.uploadEmpty', '⚠️ لم يتم العثور على بيانات في الملف'));
        return;
      }

      const payloads = [];
      let skippedRows = 0;

      rows.forEach((row) => {
        const category    = row['القسم'] ?? row.category ?? '';
        const subcategory = row['القسم الثانوي'] ?? row.subcategory ?? '';
        const description = row['الوصف'] ?? row.description ?? row.name ?? '';
        const quantity    = row['الكمية'] ?? row.quantity ?? 0;
        const unitPrice   = row['السعر'] ?? row.price ?? 0;
        const unitCost    = row['التكلفة'] ?? row.cost ?? row.unit_cost ?? row.unitCost ?? 0;
        const barcodeRaw  = row['الباركود'] ?? row.barcode ?? '';
        const imageUrl    = row['الصورة'] ?? row.image_url ?? row.image ?? '';
        const lessor      = row['المؤجر'] ?? row['المؤجر '] ?? row['Lessor'] ?? row['lessor'] ?? row.lessor ?? '';

        const cleanedBarcode = normalizeNumbers(String(barcodeRaw || '')).trim();

        if (!description || !cleanedBarcode) {
          skippedRows += 1;
          return;
        }

        payloads.push(buildEquipmentPayload({
          category, subcategory, description, quantity,
          unit_price: unitPrice, unit_cost: unitCost,
          barcode: cleanedBarcode, image_url: imageUrl, lessor,
        }));
      });

      if (!payloads.length) {
        showToast(t('equipment.toast.uploadEmpty', '⚠️ لم يتم العثور على بيانات في الملف'));
        return;
      }

      try {
        const response = await apiRequest('/equipment/?bulk=1&update_existing=1&skip_duplicates=1', {
          method: 'POST',
          body: payloads,
        });

        const created = Array.isArray(response?.data)
          ? response.data.map(mapApiEquipment)
          : [];

        if (created.length) {
          setEquipment([...getAllEquipment(), ...created]);
        }

        await refreshEquipmentFromApi({ showToastOnError: false });
        renderEquipment();

        const metaCount    = response?.meta?.count ?? created.length;
        const skippedDup   = Number(response?.meta?.skipped_duplicates || 0);
        const updatedCount = Number(response?.meta?.updated || 0);
        const parts = [];
        if (metaCount)    parts.push(`${metaCount} ✔️`);
        if (updatedCount) parts.push(`${updatedCount} 🔁`);
        const totalSkipped = (skippedRows || 0) + skippedDup;
        if (totalSkipped)  parts.push(`${totalSkipped} ⚠️`);

        showToast(
          t('equipment.toast.uploadSuccess', '✅ تم رفع المعدات بنجاح') +
            (parts.length ? ` (${parts.join(' / ')})` : '')
        );
      } catch (error) {
        showToast(
          resolveApiErrorMessage(error, 'equipment.toast.uploadFailed', '❌ حدث خطأ أثناء قراءة ملف الإكسل'),
          'error'
        );
      }
    } catch (error) {
      console.error('❌ [equipment/excel.js] Failed to process Excel file', error);
      showToast(t('equipment.toast.uploadFailed', '❌ حدث خطأ أثناء قراءة ملف الإكسل'), 'error');
    }
  };

  reader.onerror = function () {
    console.error('❌ [equipment/excel.js] FileReader error', reader.error);
    showToast(t('equipment.toast.uploadFailed', '❌ حدث خطأ أثناء قراءة ملف الإكسل'), 'error');
  };

  reader.readAsArrayBuffer(file);
}

export async function downloadEquipmentToExcel({ onlyAvailable = false } = {}) {
  try {
    await ensureXLSXLoaded();
  } catch (error) {
    console.error('❌ [equipment/excel.js] Unable to load XLSX for download', error);
    showToast(t('equipment.toast.xlsxMissing', '⚠️ مكتبة Excel (XLSX) غير محملة.'));
    return;
  }

  const items = getAllEquipment();
  const rows = items
    .filter((item) => {
      if (!onlyAvailable) return true;
      return normalizeStatusValue(item.status) === 'available';
    })
    .map((item) => ({
      'القسم':       item.category || '',
      'القسم الثانوي': item.sub || '',
      'الوصف':       item.desc || item.description || item.name || '',
      'الكمية':      Number.isFinite(Number(item.qty))   ? Number(item.qty)   : 0,
      'السعر':       Number.isFinite(Number(item.price)) ? Number(item.price) : 0,
      'التكلفة':     Number.isFinite(Number(item.cost))  ? Number(item.cost)  : 0,
      'الباركود':    item.barcode || '',
      'الصورة':      getEquipmentImage(item) || '',
      'المؤجر':      (item.lessor || ''),
    }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook  = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Equipment');

  const pad2 = (n) => String(n).padStart(2, '0');
  const now = new Date();
  const filename = `${onlyAvailable ? 'equipment-available' : 'equipment-all'}-${now.getFullYear()}${pad2(now.getMonth() + 1)}${pad2(now.getDate())}-${pad2(now.getHours())}${pad2(now.getMinutes())}.xlsx`;

  try {
    XLSX.writeFile(workbook, filename, { compression: true });
  } catch (error) {
    console.error('❌ [equipment/excel.js] Failed to generate Excel file', error);
    showToast(t('equipment.toast.uploadFailed', '❌ حدث خطأ أثناء قراءة ملف الإكسل'), 'error');
  }
}
