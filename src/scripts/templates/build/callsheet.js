import { getTechniciansState } from '../../techniciansService.js';
import { el, buildRoot } from '../core.js';

// el/buildRoot are imported from ../core.js

function readSecondaryLogoState() {
  try { return { url: localStorage.getItem('templates.callsheet.logo2.url') || '', s: Number(localStorage.getItem('templates.callsheet.logo2.s')||'1')||1, x: Number(localStorage.getItem('templates.callsheet.logo2.x')||'0')||0, y: Number(localStorage.getItem('templates.callsheet.logo2.y')||'0')||0 }; } catch(_) { return { url:'', s:1, x:0, y:0 }; }
}
function writeSecondaryLogoState(nx = {}) {
  try { if (typeof nx.url === 'string') localStorage.setItem('templates.callsheet.logo2.url', nx.url); if (Number.isFinite(nx.s)) localStorage.setItem('templates.callsheet.logo2.s', String(nx.s)); if (Number.isFinite(nx.x)) localStorage.setItem('templates.callsheet.logo2.x', String(nx.x)); if (Number.isFinite(nx.y)) localStorage.setItem('templates.callsheet.logo2.y', String(nx.y)); } catch(_) {}
}
function enableSecondaryLogoInteractions(wrap, img) {
  try {
    if (!wrap || !img) return;
    let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
    const readMatrix = () => { try { const s = img.style.transform || ''; const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(s); const sm = /scale\(([-\d.]+)\)/.exec(s); return { x: Number(m?.[1]||0)||0, y: Number(m?.[2]||0)||0, s: Number(sm?.[1]||1)||1 }; } catch(_) { return { x:0, y:0, s:1 }; } };
    const onDown = (ev) => { dragging = true; const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY; try { ev.preventDefault(); } catch(_) {} };
    const onMove = (ev) => { if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy; const nx = Math.round(ox + dx); const ny = Math.round(oy + dy); const s = Math.max(0.3, Math.min(3, Number(readSecondaryLogoState().s || 1))); img.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`; };
    const onUp = () => { if (!dragging) return; dragging = false; const m = readMatrix(); writeSecondaryLogoState({ x: m.x, y: m.y }); };
    img.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove, { passive: true }); window.addEventListener('pointerup', onUp, { passive: true });
  } catch(_) {}
}

function readPrimaryLogoState() {
  try { return { s: Number(localStorage.getItem('templates.callsheet.logo1.s')||'1')||1, x: Number(localStorage.getItem('templates.callsheet.logo1.x')||'0')||0, y: Number(localStorage.getItem('templates.callsheet.logo1.y')||'0')||0 }; } catch(_) { return { s:1, x:0, y:0 }; }
}
function writePrimaryLogoState(nx = {}) {
  try { if (Number.isFinite(nx.s)) localStorage.setItem('templates.callsheet.logo1.s', String(nx.s)); if (Number.isFinite(nx.x)) localStorage.setItem('templates.callsheet.logo1.x', String(nx.x)); if (Number.isFinite(nx.y)) localStorage.setItem('templates.callsheet.logo1.y', String(nx.y)); } catch(_) {}
}
function enablePrimaryLogoInteractions(wrap, img) {
  try {
    if (!wrap || !img) return;
    let dragging = false; let sx = 0; let sy = 0; let ox = 0; let oy = 0;
    const readMatrix = () => { try { const s = img.style.transform || ''; const m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(s); const sm = /scale\(([-\d.]+)\)/.exec(s); return { x: Number(m?.[1]||0)||0, y: Number(m?.[2]||0)||0, s: Number(sm?.[1]||1)||1 }; } catch(_) { return { x:0, y:0, s:1 }; } };
    const onDown = (ev) => { dragging = true; const m = readMatrix(); ox = m.x; oy = m.y; sx = ev.clientX; sy = ev.clientY; try { ev.preventDefault(); } catch(_) {} };
    const onMove = (ev) => { if (!dragging) return; const dx = ev.clientX - sx; const dy = ev.clientY - sy; const nx = Math.round(ox + dx); const ny = Math.round(oy + dy); const s = Math.max(0.3, Math.min(3, Number(readPrimaryLogoState().s || 1))); img.style.transform = `scale(${s}) translate(${nx}px, ${ny}px)`; };
    const onUp = () => { if (!dragging) return; dragging = false; const m = readMatrix(); writePrimaryLogoState({ x: m.x, y: m.y }); };
    img.addEventListener('pointerdown', onDown); window.addEventListener('pointermove', onMove, { passive: true }); window.addEventListener('pointerup', onUp, { passive: true });
    const slider = document.getElementById('tpl-logo1-size');
    if (slider) {
      const apply = (s) => { const scale = Math.max(0.3, Math.min(3, Number(s || 1))); const m = readMatrix(); try { img.style.transform = `scale(${scale}) translate(${m.x}px, ${m.y}px)`; } catch(_) {} writePrimaryLogoState({ s: scale }); };
      slider.addEventListener('input', (e) => { apply(e?.target?.value); });
    }
  } catch(_) {}
}

export function populateCrewFromReservation(crewTable, reservation) {
  if (!crewTable || !reservation) return;
  const assignments = (() => {
    if (Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length) return reservation.crewAssignments;
    if (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length) return reservation.techniciansDetails;
    const ids = Array.isArray(reservation.technicians) ? reservation.technicians : [];
    if (ids.length) {
      const list = getTechniciansState() || [];
      const byId = new Map(list.map((t) => [String(t.id), t]));
      const byName = new Map(list.map((t) => [String((t.name || t.full_name || '').trim().toLowerCase()), t]));
      return ids.map((entry) => {
        if (entry && typeof entry === 'object') {
          const id = entry.id ?? entry.technicianId;
          const nm = entry.name ?? entry.full_name ?? entry.technician_name;
          const t = (id != null && byId.get(String(id))) || (nm ? byName.get(String(nm).trim().toLowerCase()) : null);
          if (t) return { technicianId: t.id, technicianName: t.name || t.full_name, technicianPhone: t.phone, technicianRole: t.role || t.specialization };
          return { technicianName: nm || '', technicianId: id ?? null };
        }
        const key = String(entry || '').trim();
        const tech = byId.get(key) || byName.get(key.toLowerCase());
        return tech
          ? { technicianId: tech.id, technicianName: tech.name || tech.full_name, technicianPhone: tech.phone, technicianRole: tech.role || tech.specialization }
          : (/^\d+$/.test(key) ? { technicianId: key } : { technicianName: key });
      });
    }
    return [];
  })();
  try {
    if (assignments.length) {
      assignments.forEach((a) => {
        try {
          if (a && typeof a.technician === 'object') {
            a.technicianId = a.technicianId ?? a.technician?.id ?? a.technician_id;
            a.technicianName = a.technicianName ?? a.technician?.name ?? a.technician?.full_name ?? a.name;
            a.technicianPhone = a.technicianPhone ?? a.technician?.phone ?? a.phone;
            a.technicianRole = a.technicianRole ?? a.technician?.role ?? a.specialization ?? a.role;
          }
          if (a && typeof a.position === 'object') {
            a.positionLabel = a.positionLabel ?? a.position?.labelAr ?? a.position?.labelEn ?? a.position?.name ?? a.position_name;
          }
          a.positionLabel = a.positionLabel ?? a.position_name ?? a.positionName ?? a.position;
          a.technicianPhone = a.technicianPhone ?? a.phone_number ?? a.phoneNumber ?? a.mobile ?? a.whatsapp;
          a.technicianName = a.technicianName ?? a.full_name ?? a.technician_name;
          if (!a.technicianName && a.name) a.technicianName = a.name;
        } catch (_) {}
      });
      const techs = getTechniciansState() || [];
      const byId = new Map(techs.map((t) => [String(t.id), t]));
      const byName = new Map(techs.map((t) => [String((t.name || t.full_name || '').trim().toLowerCase()), t]));
      assignments.forEach((a) => {
        const aid = a.technicianId ?? a.technician_id ?? a.id;
        const aname = a.technicianName ?? a.name;
        const t = (aid != null && byId.get(String(aid))) || (aname ? byName.get(String(aname).trim().toLowerCase()) : null);
        if (t) {
          if (!a.technicianName && (t.name || t.full_name)) a.technicianName = t.name || t.full_name;
          if (!a.technicianPhone && t.phone) a.technicianPhone = t.phone;
          if (!a.technicianRole && (t.role || t.specialization)) a.technicianRole = t.role || t.specialization;
        }
      });
    }
  } catch (_) {}
  if (!assignments.length) return;
  const rows = Array.from(crewTable.querySelectorAll('tbody tr'));
  const ensureRows = (need) => {
    const toAdd = Math.max(0, need - rows.length);
    for (let i = 0; i < toAdd; i += 1) {
      const tr = document.createElement('tr');
      for (let c = 0; c < 4; c += 1) {
        const td = document.createElement('td');
        td.setAttribute('data-editable','true'); td.setAttribute('contenteditable','true');
        if (c === 2) { try { td.removeAttribute('dir'); } catch(_) {} td.classList.add('dir-ltr'); }
        tr.appendChild(td);
      }
      crewTable.tBodies[0].appendChild(tr);
      rows.push(tr);
    }
  };
  ensureRows(assignments.length);
  assignments.forEach((a, idx) => {
    const tr = rows[idx]; if (!tr) return;
    const cells = Array.from(tr.children);
    const pos = a.positionLabel || a.positionLabelAr || a.positionLabelEn || a.position || a.positionName || a.position_name || a.position_label || a.technicianRole || a.role || a.specialization || '';
    const name = a.technicianName || a.name || a.full_name || a.technician_name || '';
    const phone = a.technicianPhone || a.phone || a.phoneNumber || a.phone_number || a.mobile || a.whatsapp || '';
    if (cells[0]) cells[0].textContent = pos || '';
    if (cells[1]) cells[1].textContent = name || '';
    if (cells[2]) { try { cells[2].removeAttribute('dir'); } catch(_) {} cells[2].classList.add('dir-ltr'); cells[2].textContent = phone || ''; }
  });
}

export function populateCrewFromReservationIfEmpty(reservation) {
  try {
    const crew = document.querySelector('#templates-a4-root .callsheet-v1 table.cs-crew');
    if (!crew || !reservation) return;
    const rows = Array.from(crew.querySelectorAll('tbody tr'));
    const sample = rows.slice(0, Math.min(rows.length, 6));
    let filledCells = 0; let totalCells = 0;
    sample.forEach((tr) => { const cells = Array.from(tr.children).slice(0, 3); cells.forEach((td) => { totalCells += 1; if ((td.textContent || '').trim()) filledCells += 1; }); });
    const fillRatio = totalCells > 0 ? (filledCells / totalCells) : 0;
    if (fillRatio <= 0.15) {
      populateCrewFromReservation(crew, reservation);
      return;
    }
    // Merge missing fields (position/phone) based on technician name
    try {
      const assignments = (() => {
        if (Array.isArray(reservation.crewAssignments) && reservation.crewAssignments.length) return reservation.crewAssignments;
        if (Array.isArray(reservation.techniciansDetails) && reservation.techniciansDetails.length) return reservation.techniciansDetails;
        const ids = Array.isArray(reservation.technicians) ? reservation.technicians : [];
        if (ids.length) {
          const byId = new Map((getTechniciansState() || []).map((t) => [String(t.id), t]));
          return ids.map((id) => { const tech = byId.get(String(id)); return tech ? { technicianId: tech.id, technicianName: tech.name || tech.full_name, technicianPhone: tech.phone, technicianRole: tech.role || tech.specialization } : { technicianId: id }; });
        }
        return [];
      })();
      const byName = new Map(assignments.map((a) => [String((a.technicianName || a.name || a.full_name || '')).trim().toLowerCase(), a]));
      rows.forEach((tr) => {
        const cells = Array.from(tr.children);
        const hasName = (cells[1] && (cells[1].textContent || '').trim());
        if (!hasName) return;
        const nameKey = String((cells[1].textContent || '')).trim().toLowerCase();
        const a = byName.get(nameKey);
        if (!a) return;
        const pos = a.positionLabel || a.position || a.positionName || a.position_name || a.position_label || a.technicianRole || a.role || a.specialization || '';
        const phone = a.technicianPhone || a.phone || a.phoneNumber || a.phone_number || a.mobile || a.whatsapp || '';
        if (cells[0] && !(cells[0].textContent || '').trim()) cells[0].textContent = pos || '';
        if (cells[2] && !(cells[2].textContent || '').trim()) { try { cells[2].removeAttribute('dir'); } catch(_) {} cells[2].classList.add('dir-ltr'); cells[2].textContent = phone || ''; }
      });
    } catch (_) {}
  } catch(_) {}
}

export function buildCallSheetPage(project, reservations, opts = {}) {
  const { headerFooter = false, logoUrl = '' } = opts || {};
  const { root, inner } = buildRoot({ landscape: true, headerFooter, logoUrl });
  try { root.setAttribute('dir', 'ltr'); } catch(_) {}
  const pagesWrap = root.querySelector('[data-a4-pages]');
  const res = reservations?.[0] || null;

  // Helper to create a new landscape page with callsheet wrapper
  const newPage = () => {
    const page = el('section', { class: 'a4-page a4-page--landscape' });
    const innerPage = el('div', { class: 'a4-inner' });
    const wrapPage = el('div', { class: 'callsheet-v1' });
    page.appendChild(innerPage);
    innerPage.appendChild(wrapPage);
    pagesWrap.appendChild(page);
    return { page, innerPage, wrapPage };
  };

  const wrap = el('div', { class: 'callsheet-v1' });

  // Header (logos + title + date)
  const hdr = el('div', { class: 'cs-header' });
  const leftBrandLogo = el('div', { class: 'cs-logo cs-logo--left' });
  const leftImg = el('img', { src: (logoUrl || ''), alt: 'Art Ratio Logo', draggable: 'false', referrerpolicy: 'no-referrer', crossorigin: 'anonymous' });
  try { leftImg.style.removeProperty('width'); } catch(_) {}
  try { const lstate = readPrimaryLogoState(); const x = Number(lstate.x || 0) || 0; const y = Number(lstate.y || 0) || 0; const s = Math.max(0.3, Math.min(3, Number(lstate.s || 1))); leftImg.style.transform = `scale(${s}) translate(${x}px, ${y}px)`; } catch(_) {}
  leftBrandLogo.appendChild(leftImg); hdr.appendChild(leftBrandLogo);
  const titleBox = el('div', { class: 'cs-titlebox' }, [
    el('div', { class: 'cs-brand', 'data-editable': 'true', contenteditable: 'true', text: (project?.clientCompany || project?.title || 'WKK.') }),
    el('div', { class: 'cs-date', 'data-editable': 'true', contenteditable: 'true', text: (res?.start ? new Date(res.start).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')) }),
    el('div', { class: 'cs-title', text: 'CALL SHEET' })
  ]);
  hdr.appendChild(titleBox);

  const secState = readSecondaryLogoState();
  const rightLogoWrap = el('div', { class: 'cs-logo cs-logo--right', 'data-empty': secState.url ? '0' : '1' });
  const rightImg = el('img', { alt: 'Client Logo', draggable: 'false', referrerpolicy: 'no-referrer', crossorigin: 'anonymous' });
  try { rightImg.style.removeProperty('width'); } catch(_) {}
  if (secState.url) rightImg.setAttribute('src', secState.url);
  try { const x = Number(secState.x || 0) || 0; const y = Number(secState.y || 0) || 0; const s = Math.max(0.3, Math.min(3, Number(secState.s || 1))); rightImg.style.transform = `scale(${s}) translate(${x}px, ${y}px)`; } catch(_) {}
  rightLogoWrap.appendChild(rightImg); rightLogoWrap.appendChild(el('div', { class: 'cs-logo__resize', title: 'resize' })); hdr.appendChild(rightLogoWrap); wrap.appendChild(hdr);

  // Info grid
  const info = el('table', { class: 'cs-info' });
  const infoBody = el('tbody');
  const makeRow = (...cells) => { const tr = el('tr'); cells.forEach((c) => tr.appendChild(c)); return tr; };
  const leftCol = (label) => el('td', { class: 'cs-label', text: label });
  const leftVal = (text = '') => el('td', { 'data-editable': 'true', contenteditable: 'true', text });
  const leftTable = el('table', { class: 'cs-roles' });
  const ltBody = el('tbody');
  ['Producer', 'Director', 'DOP', 'Production Manager', '1st Assistant Director'].forEach((lab) => { const r = el('tr'); r.appendChild(leftCol(`${lab}:`)); r.appendChild(leftVal('')); ltBody.appendChild(r); });
  leftTable.appendChild(ltBody);

  const centerTable = el('table', { class: 'cs-center' });
  const ctBody = el('tbody');
  ctBody.appendChild(makeRow(el('td', { class: 'cs-notes-h', text: 'Important Notes' })));
  ctBody.appendChild(makeRow(el('td', { class: 'cs-notes', 'data-editable': 'true', contenteditable: 'true', html: 'Please be on Time<br>Have Fun and make Art<br>If you need any help please contact the AD or Production manager' })));
  ctBody.appendChild(makeRow(el('td', { class: 'cs-section', text: 'Locations' })));
  ctBody.appendChild(makeRow(el('td', { class: 'cs-locations', 'data-editable': 'true', contenteditable: 'true', text: '' })));
  centerTable.appendChild(ctBody);

  const rightTable = el('table', { class: 'cs-times' });
  const rtBody = el('tbody');
  [
    ['Call Time',''],
    ['Client',''],
    ['Ready to shoot',''],
    ['Lunch',''],
    ['Est. Wrap','']
  ].forEach(([lab, val]) => { const r = el('tr'); r.appendChild(leftCol(`${lab}:`)); r.appendChild(leftVal(val)); rtBody.appendChild(r); });
  // Weather box under Est. Wrap (second cell only)
  const wRow = el('tr');
  wRow.appendChild(leftCol(''));
  const wVal = el('td');
  const wbox2 = el('div', { class: 'cs-weather' }, [
    el('div', { class: 'cs-city', 'data-editable': 'true', contenteditable: 'true', text: 'jeddah' }),
    el('div', { class: 'cs-temp', 'data-editable': 'true', contenteditable: 'true', text: '38°C - 25°C' }),
    el('div', { class: 'cs-wind', 'data-editable': 'true', contenteditable: 'true', text: 'Wind: 16 km/h' }),
    el('div', { class: 'cs-rain', 'data-editable': 'true', contenteditable: 'true', text: 'Chance of rain : 0%' }),
  ]);
  wVal.appendChild(wbox2); wRow.appendChild(wVal); rtBody.appendChild(wRow);
  rightTable.appendChild(rtBody);

  infoBody.appendChild(makeRow(el('td', {}, [leftTable]), el('td', {}, [centerTable]), el('td', {}, [rightTable])));
  info.appendChild(infoBody); wrap.appendChild(info);

  // Cast calls matching legacy look: header bar + single row with weather box at the far right
  const cast = el('table', { class: 'cs-cast' });
  const cb = el('tbody');
  // Define 8 equal columns
  const castCg = el('colgroup'); for (let i=0;i<8;i+=1) castCg.appendChild(el('col', { style: 'width:12.5%' }));
  cast.appendChild(castCg);
  // Header cell spans all columns
  cb.appendChild(makeRow(el('td', { class: 'cs-cast-title', text: 'Cast Calls', colspan: '8' })));
  // Two data rows
  const castRow1 = el('tr');
  const castRow2 = el('tr');
  for (let i = 0; i < 8; i += 1) {
    castRow1.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
    castRow2.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' }));
  }
  cb.appendChild(castRow1);
  cb.appendChild(castRow2);
  cast.appendChild(cb); wrap.appendChild(cast);

  inner.appendChild(wrap);

  // Page 2: Crew Call table only
  const { innerPage: inner2, wrapPage: wrap2 } = newPage();
  const crew = el('table', { class: 'tpl-table cs-crew', 'data-editable-table': 'crew' });
  const crewCols = [30,34,20,16]; const crewCg = el('colgroup'); crewCols.forEach((w)=>crewCg.appendChild(el('col',{style:`width:${w}%`}))); crew.appendChild(crewCg);
  const crewHead = el('thead'); const crewTitleRow = el('tr'); crewTitleRow.appendChild(el('th', { colspan: String(crewCols.length), class: 'cs-crew-title', text: 'Crew Call' })); crewHead.appendChild(crewTitleRow);
  const crewHeadRow = el('tr'); ['Position','Name','Phone','Time'].forEach((label)=>crewHeadRow.appendChild(el('th',{ text: label }))); crewHead.appendChild(crewHeadRow); crew.appendChild(crewHead);
  const crewBody = el('tbody'); for (let i=0;i<18;i+=1){ const tr=el('tr'); tr.appendChild(el('td',{'data-editable':'true',contenteditable:'true'})); tr.appendChild(el('td',{'data-editable':'true',contenteditable:'true'})); tr.appendChild(el('td',{'data-editable':'true',contenteditable:'true','class':'dir-ltr'})); tr.appendChild(el('td',{'data-editable':'true',contenteditable:'true'})); crewBody.appendChild(tr);} crew.appendChild(crewBody); wrap2.appendChild(crew);
  inner2.appendChild(wrap2);

  // Page 3: Schedule table only (with note rows at top)
  const { innerPage: inner3, wrapPage: wrap3 } = newPage();
  const sched = el('table', { class: 'tpl-table cs-schedule', 'data-editable-table': 'callsheet' });
  const cols = [5, 5, 25, 6, 5, 5, 6, 4, 4, 10, 8, 17];
  const cg = el('colgroup'); cols.forEach((w) => cg.appendChild(el('col', { style: `width:${w}%` }))); sched.appendChild(cg);
  const headerLabels = ['Shot #','Time (Duration)','Description','Movement','Rig','Lens','Location','I/E','D/N','Sound','Cast','Notes / Props'];
  const thead = el('thead'); const trh = el('tr'); headerLabels.forEach((label, i) => trh.appendChild(el('th', { text: label, style: `width:${cols[i]}%` }))); thead.appendChild(trh); sched.appendChild(thead);
  const sb = el('tbody');
  const r1 = el('tr', { class: 'cs-row-note' }); r1.appendChild(el('td', { colspan: '12', 'data-editable': 'true', contenteditable: 'true', text: 'breakfast(30m)' })); sb.appendChild(r1);
  const r2 = el('tr', { class: 'cs-row-strong' }); r2.appendChild(el('td', { colspan: '12', 'data-editable': 'true', contenteditable: 'true', text: 'light, camera and art Prep (1H)' })); sb.appendChild(r2);
  for (let i = 0; i < 24; i += 1) { const tr = el('tr'); for (let c = 0; c < 12; c += 1) tr.appendChild(el('td', { 'data-editable': 'true', contenteditable: 'true' })); sb.appendChild(tr); }
  sched.appendChild(sb); wrap3.appendChild(sched);
  inner3.appendChild(wrap3);

  try { enablePrimaryLogoInteractions(leftBrandLogo, leftImg); } catch(_) {}
  try { enableSecondaryLogoInteractions(rightLogoWrap, rightImg); } catch(_) {}
  return root;
}

export default { buildCallSheetPage, populateCrewFromReservation, populateCrewFromReservationIfEmpty };
