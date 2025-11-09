export function showTemplatesDebugOverlay(root, reservation) {
  try {
    if (!root) return;
    const enabled = (localStorage.getItem('templates.debugOverlay') || '') === '1';
    let box = document.getElementById('tpl-debug-overlay');
    if (!enabled) { if (box) box.remove(); return; }
    if (!box) {
      box = document.createElement('div');
      box.id = 'tpl-debug-overlay';
      Object.assign(box.style, { position:'absolute', top:'8px', left:'8px', background:'rgba(17,24,39,0.85)', color:'#fff', padding:'8px 10px', font:'12px/1.4 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto', borderRadius:'8px', zIndex:'9999', maxWidth:'36vw', direction:'ltr', textAlign:'left' });
      root.appendChild(box);
    }
    const lines = [];
    const ca = Array.isArray(reservation?.crewAssignments) ? reservation.crewAssignments : [];
    const td = Array.isArray(reservation?.techniciansDetails) ? reservation.techniciansDetails : [];
    const t = Array.isArray(reservation?.technicians) ? reservation.technicians : [];
    lines.push(`crewAssignments: ${ca.length}`);
    lines.push(`techniciansDetails: ${td.length}`);
    lines.push(`technicians: ${t.length}`);
    const sample = (arr) => (arr && arr.length ? arr[0] : null);
    const getKeys = (obj) => obj && typeof obj === 'object' ? Object.keys(obj) : [];
    const ca0 = sample(ca); if (ca0) lines.push(`CA keys: ${getKeys(ca0).join(', ')}`);
    const td0 = sample(td); if (td0) lines.push(`TD keys: ${getKeys(td0).join(', ')}`);
    const t0 = sample(t); if (t0 && typeof t0 !== 'string') lines.push(`T keys: ${getKeys(t0).join(', ')}`);
    box.innerHTML = lines.map((l) => `<div>${escapeHtml(l)}</div>`).join('');
  } catch (_) {}
}

function escapeHtml(s) {
  try { return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c])); } catch(_) { return String(s); }
}

export default { showTemplatesDebugOverlay };

