import { applyStoredTheme, initThemeToggle } from './theme.js';
import { checkAuth, logout } from './auth.js';
import { migrateOldData } from './storage.js';
import { t } from './language.js';

applyStoredTheme();
migrateOldData();
checkAuth();

let cachedUsername = '';

function updateGreetingMessage() {
  const greeting = document.querySelector('[data-home-greeting]');
  if (!greeting) return;

  if (cachedUsername) {
    const template = t('home.hero.greetingUser', 'مرحباً {name}');
    greeting.textContent = template.replace('{name}', cachedUsername);
    return;
  }

  greeting.textContent = t('home.hero.title', 'مرحباً بك');
}

document.addEventListener('language:changed', updateGreetingMessage);

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn && !logoutBtn.dataset.listenerAttached) {
    logoutBtn.addEventListener('click', () => logout());
    logoutBtn.dataset.listenerAttached = 'true';
  }

  try {
    const stored = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    cachedUsername = stored?.username?.trim() || '';
  } catch (error) {
    console.warn('⚠️ تعذر قراءة اسم المستخدم', error);
    cachedUsername = '';
  }

  updateGreetingMessage();
});

document.addEventListener('language:translationsReady', updateGreetingMessage);

if (document.readyState !== 'loading') {
  try {
    const stored = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    cachedUsername = stored?.username?.trim() || '';
  } catch (error) {
    cachedUsername = '';
  }
  updateGreetingMessage();
}
