import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PAGE_BOOT_PATH = resolve(process.cwd(), 'public/js/page-boot.js');
const PAGE_BOOT_SOURCE = readFileSync(PAGE_BOOT_PATH, 'utf8');

const evalPageBoot = () => {
  window.eval(PAGE_BOOT_SOURCE);
};

const setReadyState = (value) => {
  Object.defineProperty(document, 'readyState', {
    configurable: true,
    get: () => value,
  });
};

describe('page boot theme bootstrap', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
    document.body.innerHTML = '<div id="app"></div>';
    document.documentElement.className = '';
    document.body.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
    window.sessionStorage.clear();
    setReadyState('complete');
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    document.documentElement.className = '';
    document.body.className = '';
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
    window.sessionStorage.clear();
  });

  it('applies the stored dark theme to html and body before app modules run', () => {
    window.sessionStorage.setItem('art-ratio:session-theme', 'dark');

    evalPageBoot();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark-mode')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });

  it('defaults to light theme consistently when no stored theme exists', () => {
    evalPageBoot();

    expect(document.documentElement.classList.contains('dark-mode')).toBe(false);
    expect(document.body.classList.contains('dark-mode')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('injects sidebar css when it is missing', () => {
    evalPageBoot();

    const sidebarCss = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], link'))
      .find((node) => (node.getAttribute('href') || '').includes('/css/sidebar.css'));

    expect(sidebarCss).toBeTruthy();
  });

  it('does not inject legacy sidebar css when Vite built css is already loaded', () => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '/assets/auth.D3OsJ-qy.css');
    document.head.appendChild(link);

    evalPageBoot();

    const sidebarCss = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], link'))
      .find((node) => (node.getAttribute('href') || '').includes('/dist/css/sidebar.css'));

    expect(sidebarCss).toBeFalsy();
  });

  it('waits for production page css before deciding whether to inject legacy sidebar css', () => {
    setReadyState('loading');

    evalPageBoot();

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', '../../assets/auth.D3OsJ-qy.css');
    document.head.appendChild(link);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const sidebarCss = Array.from(document.head.querySelectorAll('link[rel="stylesheet"], link'))
      .find((node) => (node.getAttribute('href') || '').includes('/dist/css/sidebar.css'));

    expect(sidebarCss).toBeFalsy();
  });

  it('uses cache-busted boot assets so production cannot keep stale sidebar chrome', () => {
    const managerHead = readFileSync(resolve(process.cwd(), 'src/pages/_partials/manager-page-head.html'), 'utf8');
    const loginPage = readFileSync(resolve(process.cwd(), 'src/pages/login.html'), 'utf8');

    expect(managerHead).toContain('/js/page-boot.js?v=20260603-green-sidebar');
    expect(loginPage).toContain('/js/page-boot.js?v=20260603-green-sidebar');
    expect(PAGE_BOOT_SOURCE).toContain('/dist/css/sidebar.css?v=20260603-green-sidebar');
  });
});
