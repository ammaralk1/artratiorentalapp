// Inject minimal sidebar styles so pages render correctly
// even if bundling splits CSS unexpectedly.
export function ensureSidebarStyles() {
  try {
    if (document.getElementById('sidebar-inline-styles')) return;
    const css = `
/* Backdrop and drawer */
.sidebar-backdrop { position: fixed; inset: 0; z-index: 40; display: none; background-color: rgba(0,0,0,0.35); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); }
.sidebar-backdrop.open { display: block; }
.sidebar-drawer { position: fixed; top: 0; bottom: 0; inset-inline-start: 0; z-index: 50; width: 18rem; max-width: 100%; transform: translateX(100%); transition: transform .3s ease-in-out; opacity: 0; visibility: hidden; pointer-events: none; background: transparent; box-shadow: 0 25px 50px rgba(0,0,0,.25); }
[dir='ltr'] .sidebar-drawer { transform: translateX(-100%); }
@media (min-width: 1024px) { .sidebar-drawer { width: 20rem; } }
.sidebar-drawer.open { transform: translateX(0); opacity: 1; visibility: visible; pointer-events: auto; }

/* Sidebar surface */
.sidebar-shell { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; width: 18rem; height: calc(100vh - 1.5rem); overflow-y: auto; scrollbar-width: thin; border-inline-start: 1px solid var(--bo-color-shell-border, rgba(142, 167, 181, 0.24)); background: var(--bo-color-shell-bg, linear-gradient(180deg, rgba(248, 250, 255, 0.96) 0%, rgba(238, 242, 255, 0.9) 100%)); box-shadow: var(--bo-color-shell-shadow-elevated, 0 28px 56px rgba(31, 48, 34, 0.12)); }
@media (min-width: 1280px) { .sidebar-shell { width: 20rem; } }
html.dark .sidebar-shell, body.dark .sidebar-shell { background: var(--bo-color-shell-bg, linear-gradient(180deg, rgba(9, 14, 28, 0.97) 0%, rgba(8, 18, 40, 0.92) 100%)); border-color: var(--bo-color-shell-border, rgba(154, 170, 145, 0.28)); box-shadow: var(--bo-color-shell-shadow-elevated, 0 28px 55px rgba(3, 11, 9, 0.62)); }
.sidebar-shell::-webkit-scrollbar { width: 6px; }
.sidebar-shell::-webkit-scrollbar-thumb { background: rgba(142, 167, 181, 0.36); border-radius: 999px; }
html.dark .sidebar-shell::-webkit-scrollbar-thumb, body.dark .sidebar-shell::-webkit-scrollbar-thumb { background: rgba(154, 170, 145, 0.36); }

/* Panels */
.sidebar-panel { background: var(--bo-color-shell-bg, linear-gradient(140deg, rgba(248, 250, 255, 0.96) 0%, rgba(238, 242, 255, 0.9) 100%)); -webkit-backdrop-filter: blur(18px); backdrop-filter: blur(18px); box-shadow: var(--bo-color-shell-shadow, 0 22px 48px rgba(31, 41, 55, 0.09)); border: 1px solid var(--bo-color-shell-border, rgba(142,167,181,.24)); border-radius: 1.5rem; padding: 1.25rem; }
.sidebar-panel + .sidebar-panel { margin-top: 1rem; }
html.dark .sidebar-panel, body.dark .sidebar-panel { background: var(--bo-color-shell-bg, linear-gradient(140deg, rgba(14, 24, 48, 0.96) 0%, rgba(9, 17, 36, 0.9) 100%)); border-color: var(--bo-color-shell-border, rgba(154, 170, 145, 0.28)); box-shadow: var(--bo-color-shell-shadow-elevated, 0 28px 55px rgba(3, 11, 9, 0.62)); }
.sidebar-menu { display: flex; flex-direction: column; gap: .5rem; }
.sidebar-heading { font-size: .875rem; font-weight: 600; line-height: 1.35; letter-spacing: .02em; color: hsl(var(--bc) / 0.68); }
html.dark .sidebar-heading, body.dark .sidebar-heading { color: rgba(203, 213, 225, 0.75); }

/* Links */
.sidebar-link { display: flex; width: 100%; align-items: center; gap: .75rem; border: 1px solid rgba(148,163,184,.35); border-radius: 1rem; padding: .75rem 1rem; font-size: .875rem; font-weight: 600; color: hsl(var(--bc)); background: linear-gradient(135deg, rgba(248, 250, 255, 0.96), rgba(238, 242, 255, 0.9)); box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08); transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease; text-decoration: none; }
.sidebar-link:hover { transform: translateY(-2px); box-shadow: 0 20px 38px rgba(15,23,42,.12); background: linear-gradient(135deg, rgba(234, 240, 255, 0.98), rgba(228, 236, 255, 0.92)); }
html.dark .sidebar-link, body.dark .sidebar-link { background: var(--bo-color-surface-muted, rgba(23, 35, 28, 0.86)); border-color: var(--bo-color-border-soft, rgba(142, 167, 181, 0.24)); box-shadow: 0 18px 36px rgba(3, 10, 8, 0.46); color: rgba(226, 232, 240, 0.9); }
html.dark .sidebar-link:hover, body.dark .sidebar-link:hover { background: var(--bo-color-tab-hover-bg, linear-gradient(135deg, rgba(71, 92, 79, 0.42), rgba(45, 61, 54, 0.52))); border-color: var(--bo-color-tab-hover-border, rgba(133, 150, 142, 0.32)); box-shadow: var(--bo-color-tab-hover-shadow, 0 18px 34px rgba(3, 10, 8, 0.46)); color: #f8fafc; }
.sidebar-link-active { display: flex; width: 100%; align-items: center; gap: .75rem; border: 1px solid var(--bo-color-tab-active-border, rgba(39, 54, 48, 0.42)); border-radius: 1rem; padding: .75rem 1rem; font-size: .875rem; font-weight: 700; color: var(--bo-color-tab-active-fg, #fff); background: var(--bo-color-tab-active-bg, linear-gradient(135deg, #1d2d22 0%, #2d4335 62%, #5e7278 100%)); box-shadow: var(--bo-color-tab-active-shadow, 0 20px 40px rgba(31,48,34,.22)); }

/* Stats */
.sidebar-stats { display: flex; flex-direction: column; gap: .75rem; }
.sidebar-stats-row { display: flex; align-items: center; justify-content: space-between; gap: .75rem; border: 1px solid rgba(148,163,184,.35); border-radius: 1rem; padding: .75rem 1rem; font-size: .875rem; font-weight: 700; color: hsl(var(--bc)); background: linear-gradient(135deg, rgba(248, 250, 255, 0.96), rgba(238, 242, 255, 0.9)); box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08); }
.sidebar-stats-row:hover { transform: translateY(-2px); box-shadow: 0 20px 38px rgba(15,23,42,.12); background: linear-gradient(135deg, rgba(234, 240, 255, 0.98), rgba(228, 236, 255, 0.92)); }

/* Badges */
.badge-soft { display: inline-flex; align-items: center; justify-content: center; min-width: 3.2rem; padding: .25rem .75rem; border-radius: 999px; border: 1px solid var(--bo-color-support-border, rgba(142, 167, 181, 0.28)); background: var(--bo-color-support-bg, linear-gradient(135deg, rgba(154, 170, 145, 0.14), rgba(142, 167, 181, 0.08))); color: var(--bo-color-heading-accent, #1f3022); font-variant-numeric: tabular-nums; font-feature-settings: 'tnum' 1, 'kern' 1; direction: ltr; text-align: center; }

/* Hamburger */
.mobile-sidebar-toggle { display: inline-flex; align-items: center; justify-content: center; width: 2.85rem; height: 2.85rem; min-height: 2.85rem; padding: 0; border-radius: .95rem; border: 1px solid rgba(148,163,184,.35); background: linear-gradient(180deg, rgba(22, 32, 54, 0.95), rgba(16, 24, 42, 0.9)); color: #f8fafc; box-shadow: 0 14px 32px rgba(15, 23, 42, 0.28); transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease, background .2s ease; cursor: pointer; position: relative; }
.mobile-sidebar-toggle::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.18), transparent 65%); opacity: .75; pointer-events: none; }
.mobile-sidebar-toggle__icon { position: relative; display: block; width: 1.2rem; height: .85rem; }
.mobile-sidebar-toggle__line { position: absolute; inset-inline: 0; height: 1.5px; border-radius: 999px; background: rgba(248, 250, 255, 0.92); transition: background-color .2s ease; }
.mobile-sidebar-toggle__line--top { top: 0; }
.mobile-sidebar-toggle__line--middle { top: 50%; transform: translateY(-50%); }
.mobile-sidebar-toggle__line--bottom { bottom: 0; }
.mobile-sidebar-toggle:hover { transform: translateY(-1px); box-shadow: 0 18px 36px rgba(15, 23, 42, 0.36); border-color: rgba(148, 163, 255, 0.55); background: linear-gradient(180deg, rgba(24, 36, 58, 0.98), rgba(18, 28, 48, 0.92)); }
.mobile-sidebar-toggle:focus-visible { outline: 2px solid rgba(129, 140, 248, 0.75); outline-offset: 2px; }
@media (min-width: 1024px) { html:not(.dark) .mobile-sidebar-toggle, body:not(.dark) .mobile-sidebar-toggle { background: linear-gradient(180deg, rgba(30, 42, 68, 0.95), rgba(22, 34, 58, 0.9)); border-color: rgba(148, 163, 184, 0.4); color: #f8fafc; } }
html.dark .mobile-sidebar-toggle, body.dark .mobile-sidebar-toggle { background: linear-gradient(180deg, rgba(12, 21, 40, 0.95), rgba(8, 15, 32, 0.9)); border-color: rgba(129, 140, 248, 0.45); color: rgba(248, 250, 252, 0.98); box-shadow: 0 18px 40px rgba(5, 12, 30, 0.55); }
html.dark .mobile-sidebar-toggle:hover, body.dark .mobile-sidebar-toggle:hover { border-color: rgba(148, 163, 255, 0.62); background: linear-gradient(180deg, rgba(16, 28, 52, 0.98), rgba(11, 20, 38, 0.94)); }

/* Minimal fallback styles for primary-nav buttons on Customer/Technician pages */
/* Outer container – soft card look */
.dashboard-tabbar { max-width: min(100%, 72rem); width: min(100%, 96vw); padding: .75rem 1rem; border-radius: 2rem; border: 1px solid var(--bo-color-shell-border, rgba(142,167,181,.24)); background: var(--bo-color-shell-bg, linear-gradient(135deg, rgba(248,250,255,.9), rgba(232,240,255,.82))); box-shadow: var(--bo-color-shell-shadow, 0 22px 48px rgba(31,41,55,.09)); margin-inline: auto; }
/* Inner rounded bar */
.dashboard-tabbar .tab-buttons { display: flex; flex-wrap: nowrap; gap: .6rem; align-items: center; justify-content: center; padding: .35rem .8rem; border-radius: 999px; border: 1px solid var(--bo-color-tab-shell-border, rgba(142,167,181,.28)); background: var(--bo-color-tab-shell-bg, linear-gradient(135deg, rgba(247,249,246,.96), rgba(237,242,239,.92))); box-shadow: var(--bo-color-tab-shell-shadow, inset 0 0 0 1px rgba(255,255,255,.35), 0 14px 30px rgba(31,48,34,.08)); overflow-x: auto; scrollbar-width: none; }
.dashboard-tabbar .tab-buttons::-webkit-scrollbar { display: none; }
.dashboard-tabbar .tab-button { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; padding: .55rem 1rem; border-radius: 999px; border: 1px solid transparent; color: var(--bo-color-tab-text, rgba(31,41,55,.72)); font-weight: 700; text-decoration: none; cursor: pointer; transition: box-shadow .2s ease, transform .2s ease, background .2s ease, color .2s ease; }
.dashboard-tabbar .tab-button:hover, .dashboard-tabbar .tab-button:focus-visible { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(15,23,42,.12); outline: none; }
html.dark .dashboard-tabbar, body.dark .dashboard-tabbar { background: var(--bo-color-shell-bg, linear-gradient(140deg, rgba(20,31,24,.96), rgba(13,20,34,.9))); border-color: var(--bo-color-shell-border, rgba(154,170,145,.28)); box-shadow: var(--bo-color-shell-shadow-elevated, 0 28px 55px rgba(3,11,9,.62)); }
html.dark .dashboard-tabbar .tab-buttons, body.dark .dashboard-tabbar .tab-buttons { background: var(--bo-color-tab-shell-bg, linear-gradient(135deg, rgba(26,39,33,.92), rgba(18,28,24,.88))); border-color: var(--bo-color-tab-shell-border, rgba(154,170,145,.24)); box-shadow: var(--bo-color-tab-shell-shadow, inset 0 0 0 1px rgba(154,170,145,.08), 0 16px 32px rgba(3,11,9,.5)); }
html.dark .dashboard-tabbar .tab-button, body.dark .dashboard-tabbar .tab-button { border-color: transparent; color: var(--bo-color-tab-text, rgba(226,232,240,.84)); }

/* Customer primary nav pills */
.customer-page .customer-primary-nav .tab-button { background: linear-gradient(135deg, rgba(248, 250, 255, 0.96), rgba(238, 242, 255, 0.9)); color: hsl(var(--bc)); }
html.dark .customer-page .customer-primary-nav .tab-button, body.dark .customer-page .customer-primary-nav .tab-button { background: linear-gradient(135deg, rgba(24, 33, 59, 0.95), rgba(18, 28, 52, 0.88)); color: rgba(226, 232, 240, 0.92); }

/* Ensure RTL/LTR spacing remains consistent */
body[dir='rtl'] .dashboard-tabbar .tab-buttons { direction: rtl; }
body[dir='ltr'] .dashboard-tabbar .tab-buttons { direction: ltr; }
`;
    const style = document.createElement('style');
    style.id = 'sidebar-inline-styles';
    style.textContent = css;
    document.head.appendChild(style);
  } catch (e) {
    // no-op
  }
}

// Auto-run on import for convenience
ensureSidebarStyles();
