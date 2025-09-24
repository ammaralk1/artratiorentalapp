// ===== أدوات مساعدة =====

export function showToast(message, duration = 3000) {
  // 🔄 إذا ما فيه container للتوست، ننشئ واحد
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.position = "fixed";
    container.style.top = "20px";            // المسافة من الأعلى
    container.style.left = "50%";            // منتصف الصفحة
    container.style.transform = "translateX(-50%)"; // ضبط التوسيط
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;

  // ستايل افتراضي للتوست
  toast.style.background = "#333";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.marginTop = "10px";
  toast.style.borderRadius = "6px";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease";

  container.appendChild(toast);

  // تشغيل الحركة
  setTimeout(() => toast.style.opacity = "1", 10);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function generateReservationId() {
  let counter = parseInt(localStorage.getItem("reservationCounter") || "0");
  counter++;
  localStorage.setItem("reservationCounter", counter);
  return "RSV-" + String(counter).padStart(4, "0");
}

export function formatDateTime(dateStr, overrides = {}) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "-";

  const docLang = document?.documentElement?.getAttribute('lang') || window?.localStorage?.getItem('app-language') || 'ar';
  const isArabic = String(docLang).toLowerCase().startsWith('ar');
  const locale = isArabic ? 'ar-SA-u-ca-gregory' : 'en-US';

  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: true,
    calendar: 'gregory',
    ...overrides
  });

  const parts = formatter.formatToParts(date);
  const meridiem = date.getHours() >= 12 ? 'PM' : 'AM';

  const formatted = parts
    .map((part) => {
      if (part.type === 'dayPeriod') {
        return meridiem;
      }
      return part.value;
    })
    .join('')
    .replace(/\u200f/g, ''); // remove RTL marks if present

  return normalizeNumbers(formatted);
}

export function normalizeNumbers(str) {
  if (str === null || str === undefined) return "";
  
  // حوّل أي رقم إلى نص
  str = String(str);

  const arabicNumbers = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
  const englishNumbers = ["0","1","2","3","4","5","6","7","8","9"];

  return str.split("").map(ch => {
    const index = arabicNumbers.indexOf(ch);
    return index > -1 ? englishNumbers[index] : ch;
  }).join("");
}
