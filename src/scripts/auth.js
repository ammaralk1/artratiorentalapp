// ===== تسجيل الدخول والخروج =====
import { showToast } from "./utils.js";
import AUTH_CONFIG from "./config/authConfig.js";

const ERROR_MESSAGE = "❌ بيانات الدخول غير صحيحة";

function handleLoginFailure() {
  showToast(ERROR_MESSAGE, 3000);
  const err = document.getElementById("login-error");
  if (err) err.innerText = ERROR_MESSAGE;
}

function bufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hashString(value) {
  const input = (value || "").trim();
  if (!input) return "";

  // استخدم Web Crypto إذا كان متاحاً، وإلا أعد القيمة الخام (مع تحذير)
  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return bufferToHex(digest);
  }

  console.warn("⚠️ Web Crypto غير متاح، تتم المقارنة بنص عادي");
  return input;
}

function isHashMatch(userHash, passHash) {
  return (
    userHash &&
    passHash &&
    userHash === AUTH_CONFIG.usernameHash &&
    passHash === AUTH_CONFIG.passwordHash
  );
}

export async function login(username, password) {
  try {
    const [userHash, passHash] = await Promise.all([
      hashString(username),
      hashString(password)
    ]);

    if (isHashMatch(userHash, passHash)) {
      const sanitizedUsername = (username || "").trim();
      localStorage.setItem("loggedInUser", JSON.stringify({ username: sanitizedUsername }));
      window.location.href = "dashboard.html";
      return;
    }
  } catch (error) {
    console.error("❌ فشل تسجيل الدخول", error);
  }

  handleLoginFailure();
}

export function logout() {
  localStorage.removeItem("loggedInUser");
  showToast("🚪 تم تسجيل الخروج");
  window.location.href = "login.html";
}

export function checkAuth() {
  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "login.html";
  }
}
