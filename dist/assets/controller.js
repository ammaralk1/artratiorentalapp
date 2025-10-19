import{d as Z,n as q,f as zi,t as o,b as Te,h as S,j as lt,o as zt,s as ba,A as hs,z as Vi,k as Ue,B as vs,u as Ui}from"./auth.js";import{n as J,D as Me,l as ha,o as Xa,p as Mt,q as qs,t as Qi,v as Ke,w as Ge,x as va,y as Ki,z as Gi,A as Ss,h as ws,B as Es,C as xs,E as Is,F as Wi,s as Vt,i as qn,G as As,H as Xi,I as _s,J as $s,f as Cs,a as ks,g as st,K as Yi,L as Ji,M as Kn,N as Zi,O as eo,u as to,P as no,k as ao}from"./reservationsService.js";const Hn="select.form-select:not([data-no-enhance]):not([multiple])",Le=new WeakMap;let On=null,Ya=!1,De=null;function Ql(e=document){e&&(e.querySelectorAll(Hn).forEach(t=>tn(t)),!On&&e===document&&(On=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Hn)&&tn(a),a.querySelectorAll?.(Hn).forEach(s=>tn(s)))})}),On.observe(document.body,{childList:!0,subtree:!0})),Ya||(Ya=!0,document.addEventListener("pointerdown",io,{capture:!0})))}function en(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){tn(e);return}const t=e.closest(".enhanced-select");t&&(qa(t),on(t),Gn(t))}function tn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){en(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Le.set(t,r),a.addEventListener("click",()=>ro(t)),a.addEventListener("keydown",i=>oo(i,t)),s.addEventListener("click",i=>lo(i,t)),s.addEventListener("keydown",i=>co(i,t)),e.addEventListener("change",()=>{on(t),Ts(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&Gn(t),c&&so(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),qa(t),on(t),Gn(t)}function so(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,qa(t),on(t)})))}function qa(e){const t=Le.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Ts(e)}function on(e){const t=Le.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Ts(e){const t=Le.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Gn(e){const t=Le.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function ro(e){Le.get(e)&&(e.getAttribute("data-open")==="true"?Et(e):Ls(e))}function Ls(e){const t=Le.get(e);if(!t)return;De&&De!==e&&Et(De,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),De=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Et(e,{focusTrigger:t=!0}={}){const n=Le.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),De===e&&(De=null))}function io(e){if(!De)return;const t=e.target;t instanceof Node&&(De.contains(t)||Et(De,{focusTrigger:!1}))}function oo(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Ls(t)):n==="Escape"&&Et(t)}function co(e,t){const n=e.key,a=Le.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Ps(i,t)}else n==="Escape"&&(e.preventDefault(),Et(t))}function lo(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Ps(n,t)}function Ps(e,t){const n=Le.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Et(t)}const uo=Z()||{};let ze=(uo.equipment||[]).map(fo),Wn=!1,jt="",at=null,it=null,ot=null,Sn=!1;function mo(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function po(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function fo(e={}){return Sa({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function wn(e={}){return Sa(e)}function Sa(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Ut(e.quantity??e.qty??0),i=En(e.unit_price??e.price??0),c=q(String(e.barcode??"").trim()),l=me(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:go(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function go(e){return e!=null&&e!==""}function Ut(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function En(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function yo(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=q(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Ja(e){if(!e)return"";const t=q(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=q(String(n?.barcode??"")).trim();if(a)return a}return""}function bo(e,t){const n=Ja(e),a=Ja(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=cn(e?.desc||e?.description||e?.name||""),l=cn(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function ue(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function me(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function ho(e){return me(e)}function ge(){return ze}function ct(e){ze=Array.isArray(e)?e.map(Sa):[],ba({equipment:ze}),po()}function cn(e){return String(e??"").trim().toLowerCase()}function Qe(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=cn(t);return n||(n=cn(e.category||"")),n||(n=q(String(e.barcode||"")).trim().toLowerCase()),n}function xn(e){const t=Qe(e);return t?ge().filter(n=>Qe(n)===t):[]}function In(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=An(e);if(n){const a=ue(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ue(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function wa(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function ln(){const e=wa();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ea(e={}){const t=wa();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?q(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?q(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function vt(e){Sn=e;const t=wa(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Kl(e){if(!lt()){zt();return}if(!e)return;try{await qo()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",m=d["القسم الثانوي"]??d.subcategory??"",p=d.الوصف??d.description??d.name??"",f=d.الكمية??d.quantity??0,y=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",h=d.الحالة??d.status??"متاح",E=d.الصورة??d.image_url??d.image??"",v=q(String(g||"")).trim();if(!p||!v){l+=1;return}c.push(xa({category:u,subcategory:m,description:p,quantity:f,unit_price:y,barcode:v,status:h,image_url:E}))}),!c.length){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await Te("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(wn):[];if(u.length){const f=[...ge(),...u];ct(f)}await _n({showToastOnError:!1}),pe();const m=d?.meta?.count??u.length,p=[];m&&p.push(`${m} ✔️`),l&&p.push(`${l} ⚠️`),S(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(p.length?` (${p.join(" / ")})`:""))}catch(d){const u=xt(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");S(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const vo="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Tt=null;function qo(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Tt||(Tt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=vo,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Tt=null,e}),Tt)}function xa({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=q(String(r||"")).trim(),d=ho(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Ut(a),unit_price:En(s),barcode:l,status:d,image_url:c?.trim()||null}}async function So(){if(!lt()){zt();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await Te("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await _n({showToastOnError:!1}),S(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=xt(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");S(t,"error")}}function An(e){return e.image||e.imageUrl||e.img||""}function wo(e){const t=me(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function dn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ue(a)}</td></tr>`}n&&(n.textContent="0")}function Ns(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=at?.groupKey||Qe(e);if(!r){dn();return}const i=ge().filter(m=>Qe(m)===r).sort((m,p)=>{const f=String(m.barcode||"").trim(),y=String(p.barcode||"").trim();return!f&&!y?0:f?y?f.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){dn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=ge(),u=i.map(m=>{const p=m.id&&e.id?String(m.id)===String(e.id):String(m.barcode||"")===String(e.barcode||""),f=p?"equipment-variants-table__row--current":"",y=ue(String(m.barcode||"-")),g=p?`<span class="equipment-variants-current-badge">${ue(c)}</span>`:"",h=q(String(Number.isFinite(Number(m.qty))?Number(m.qty):0)),E=d.indexOf(m),v=ue(o("equipment.item.actions.delete","🗑️ حذف")),I=E>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${E}">${v}</button>
          </div>`:"";return`
        <tr class="${f}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${wo(m.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ue(l)}">${h}</span>
          </td>
          <td class="table-actions-cell">${I}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Eo({item:e,index:t}){const n=An(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=lt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),m=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),p=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,f=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-p-f,0),g=y.toLocaleString("en-US"),h=o("equipment.card.labels.availableOfTotal","من أصل"),E=me(e.status);let v=`${ue(c.available)}: ${ue(g)} ${ue(h)} ${ue(u)}`,I="available";if(y===0){const N={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},A=N[E]||N.default;v=ue(A.text),I=A.modifier}const $=`<span class="equipment-card__availability equipment-card__availability--${I}">${v}</span>`,j="",b=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",T=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${m} ${r}`}].map(({label:N,value:A})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${N}</span>
              <span class="equipment-card__detail-value">${A}</span>
            </span>
          `).join("")}
    </div>`,R=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),x=R.length?`<div class="equipment-card__categories">${R.map(({label:N,value:A})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${N}</span>
              <span class="equipment-card__detail-value">${A}</span>
            </div>
          `).join("")}</div>`:"",D=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",M=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${b}</h3>
    </div>
  `}
      ${T}
    </div>
  `,P=[];i&&P.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const B=P.length?`<div class="equipment-card__actions equipment-card__actions--center">${P.join(`
`)}</div>`:"",z=ue(b);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${z}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${j}
        ${$}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${M}
        </div>
      </div>
      <div class="equipment-card__body">
        ${x}
        ${D}
      </div>
      ${B}
    </article>
  `}function xo(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),en(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),en(s)}const r=document.getElementById("filter-status");r&&en(r)}function Qt(){const e=Z();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return ze=t||[],ze;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>q(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=me(l.status),u=q(String(l.barcode??"")).trim().toLowerCase(),m=u&&i.has(u);let p=m?"maintenance":"available";if(!m&&u)for(const f of n||[]){if(!Io(f,s))continue;if(f.items?.some(g=>q(String(g?.barcode??"")).trim().toLowerCase()===u)){p="reserved";break}}return p!==d?(r=!0,{...l,status:p}):{...l,status:p}});return r?ct(c):(ze=c,ba({equipment:ze})),ze}function Io(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function zn(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function pe(){const e=document.getElementById("equipment-list");if(!e)return;const t=Qt(),n=Array.isArray(t)?t:ge(),a=new Map;n.forEach(g=>{if(!g)return;const h=Qe(g);h&&(a.has(h)||a.set(h,[]),a.get(h).push(g))});const s=Array.from(a.values()).map(g=>{const h=g[0],E=g.reduce((w,_)=>w+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),v=["maintenance","reserved","available","retired"],I=g.map(w=>me(w.status)).sort((w,_)=>v.indexOf(w)-v.indexOf(_))[0]||"available",$=g.reduce((w,_)=>{const T=Ut(_?.qty??0)||0,R=me(_?.status);return R==="reserved"?w.reserved+=T:R==="maintenance"&&(w.maintenance+=T),w},{reserved:0,maintenance:0}),j=Math.max(E-$.reserved-$.maintenance,0);return{item:{...h,qty:E,status:I,variants:g,groupKey:Qe(h),reservedQty:$.reserved,maintenanceQty:$.maintenance,availableQty:j},index:n.indexOf(h)}});s.sort((g,h)=>bo(g.item,h.item));const r=document.getElementById("search-equipment")?.value||"",i=q(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?me(d):"";if(Wn&&!n.length){e.innerHTML=zn(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(jt&&!n.length){e.innerHTML=zn(jt,{tone:"error",icon:"⚠️"});return}const m=s.filter(({item:g})=>{const h=q(String(g.barcode??"")).toLowerCase().trim(),E=Array.isArray(g.variants)?g.variants.map(b=>q(String(b.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||h&&h.includes(i)||E.some(b=>b.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),I=!c||g.category===c,$=!l||g.sub===l,j=!u||me(g.status)===u;return v&&I&&$&&j}),p=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),f=m;e.innerHTML=f.length?f.map(Eo).join(""):zn(p);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),h=q(String(f.length)),E=f.length?`${h} ${g}`:`0 ${g}`;y.textContent=E}xo(n)}async function _n({showToastOnError:e=!0}={}){Wn=!0,jt="",pe();try{const t=await Te("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(wn):[];ct(n)}catch(t){jt=xt(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&S(jt,"error")}finally{Wn=!1,pe()}}function xt(e,t,n){if(e instanceof hs){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function Ao(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=q(a).trim(),r=En(t.querySelector("#new-equipment-price")?.value||"0"),i=Ut(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){S(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const m=xa({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const p=await Te("/equipment/",{method:"POST",body:m}),f=wn(p?.data),y=[...ge(),f];ct(y),pe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),S(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(p){const f=xt(p,"equipment.toast.addFailed","تعذر إضافة المعدة");S(f,"error")}}async function Bs(e){if(!lt()){zt();return}const t=ge(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await Te(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),ct(a),pe(),S(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=xt(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");S(s,"error")}}async function _o(e,t){const n=ge(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},ct(r),pe();return}const s=xa({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await Te(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=wn(r?.data),c=[...n];c[e]=i,ct(c),pe(),S(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=xt(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw S(i,"error"),r}}function Yt(){pe()}function js(e){const n=ge()[e];if(!n)return;it=e;const a=xn(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>me(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||me(s.status);document.getElementById("edit-equipment-index").value=e,Ea({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:An(s)||"",barcode:s.barcode||"",status:s.status||c}),vt(!1),ot=ln(),In(s),Ns(s),at={groupKey:Qe(s),barcode:String(s.barcode||""),id:s.id||null},mo(document.getElementById("editEquipmentModal"))?.show()}function $o(e){const t=e.target.closest('[data-equipment-action="delete"]');if(t){e.preventDefault(),e.stopPropagation();const a=Number(t.dataset.equipmentIndex);Number.isNaN(a)||Bs(a).catch(s=>{console.error("❌ [equipment.js] deleteEquipment",s)});return}const n=e.target.closest('[data-equipment-card="true"]');if(n){const a=Number(n.dataset.equipmentIndex);Number.isNaN(a)||js(a)}}function Co(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||js(n)}}function ko(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Bs(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Ds(){if(!at||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=ge(),a=at.id?n.find(l=>String(l.id)===String(at.id)):null,s=at.groupKey,r=s?n.find(l=>Qe(l)===s):null,i=a||r;if(!i){dn();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),it=c}if(Ns(i),!Sn){const l=xn(i),d=l[0]||i,u=l.reduce((f,y)=>f+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),m=["maintenance","reserved","available","retired"],p=l.map(f=>me(f.status)).sort((f,y)=>m.indexOf(f)-m.indexOf(y))[0]||me(d.status);Ea({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:An(d)||"",barcode:d.barcode||"",status:d.status||p}),ot=ln()}In(primary)}function To(){document.getElementById("search-equipment")?.addEventListener("input",Yt),document.getElementById("filter-category")?.addEventListener("change",Yt),document.getElementById("filter-sub")?.addEventListener("change",Yt),document.getElementById("filter-status")?.addEventListener("change",Yt),document.getElementById("add-equipment-form")?.addEventListener("submit",Ao);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),So().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",$o),t.addEventListener("keydown",Co),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",ko),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);yo(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Sn){ot=ln(),vt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){S(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Ut(document.getElementById("edit-equipment-quantity").value)||1,price:En(document.getElementById("edit-equipment-price").value)||0,barcode:q(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await _o(t,n),ot=ln(),vt(!1),Ds()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{To(),pe(),_n();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(ot&&Ea(ot),it!=null){const a=ge()[it];if(a){const r=xn(a)[0]||a;In(r)}}vt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(pe(),vt(Sn),it!=null){const t=ge()[it];if(t){const a=xn(t)[0]||t;In(a)}}});document.addEventListener("equipment:refreshRequested",()=>{_n({showToastOnError:!1})});document.addEventListener(zi.USER_UPDATED,()=>{pe()});document.addEventListener("equipment:changed",()=>{Ds()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{at=null,dn(),it=null,ot=null,vt(!1)}),e.dataset.variantsListenerAttached="true")});const Lo=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Po=new Set(["maintenance","reserved","retired"]);function No(e){const t=String(e??"").trim().toLowerCase();return t&&Lo.get(t)||"available"}function Bo(e){return e?typeof e=="object"?e:$n(e):null}function We(e){const t=Bo(e);return t?No(t.status||t.state||t.statusLabel||t.status_label):"available"}function Fs(e){return!Po.has(We(e))}function dt(e={}){return e.image||e.imageUrl||e.img||""}function jo(e){if(!e)return null;const t=J(e),{equipment:n=[]}=Z();return(n||[]).find(a=>J(a?.barcode)===t)||null}function $n(e){const t=J(e);if(!t)return null;const{equipment:n=[]}=Z();return(n||[]).find(a=>J(a?.barcode)===t)||null}function ie(e=""){return q(String(e)).trim().toLowerCase()}const Do=2;function Fo(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(Do):"0.00"}function Za(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function Kt(e={}){const t=e?.desc||e?.description||e?.name||"",n=ie(t),a=Fo(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function ut(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=Kt(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=ie(i),l=es(n),d=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:l,image:d,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Za(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const l=es(c),d=Za(c);return i+l*d},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function It(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function es(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function Ia(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function Ro(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function Xe(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?Ro(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Rs="projects:create:draft",Ms="projects.html#projects-section";let Xn=null,Hs=[],Yn=new Map,Jn=new Map,un=new Map,Vn=!1,nn=null;function mn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pn(e){return q(String(e||"")).trim().toLowerCase()}function Mo(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=q(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Os(e){const t=q(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function zs(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Vs(e){if(!e)return null;const t=q(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Us(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=q(String(t))}}function At(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Aa(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function _a(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Qs(e,t,{allowPartial:n=!1}={}){const a=ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Zn(e,t={}){return Qs(Yn,e,t)}function ea(e,t={}){return Qs(Jn,e,t)}function Se(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Ks(e){Hs=Array.isArray(e)?[...e]:[]}function $a(){return Hs}function Ca(e){return e&&$a().find(t=>String(t.id)===String(e))||null}function ts(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function qt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Me,a=q(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Me}function xe(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Me,a=q(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Me),t.dataset.companyShare=String(s),t.checked=!0}function ta(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Vn){X();return}Vn=!0;const a=()=>{Vn=!1,X()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Me)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),xe()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xe():n.checked&&(n.checked=!1));a()}function Ho(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function ns(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function as(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Fe({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Aa();if(!n||!a||!s)return;const r=ha()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;Yn=new Map;const d=r.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:as(f)||c})).filter(f=>{if(!f.label)return!1;const y=ie(f.label);return!y||l.has(y)?!1:(l.add(y),Yn.set(y,f),!0)}).sort((f,y)=>f.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(f=>`<option value="${mn(f.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?r.find(f=>String(f.id)===m):null;if(p){const f=as(p)||c;a.value=String(p.id),n.value=f,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function St({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=_a();if(!a||!s||!r)return;const i=Array.isArray(t)?t:$a()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,h)=>String(h.createdAt||h.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;Jn=new Map;const p=l.map(g=>{const h=ts(g)||u;return{id:String(g.id),label:h}}).filter(g=>{if(!g.label)return!1;const h=ie(g.label);return!h||m.has(h)?!1:(m.add(h),Jn.set(h,g),!0)});r.innerHTML=p.map(g=>`<option value="${mn(g.label)}"></option>`).join("");const f=e?String(e):s.value?String(s.value):"",y=f?l.find(g=>String(g.id)===f):null;if(y){const g=ts(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function fn(e,t,n){const{date:a,time:s}=qs(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Gs(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||St({selectedValue:a});const r=(ha()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";Fe(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=ns(e,"start"),l=ns(e,"end");c&&fn("res-start","res-start-time",c),l&&fn("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),wt(),X()}function Ws({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Z(),s=Array.isArray(a)?a:[];Ks(s);const r=t!=null?String(t):n.value?String(n.value):"";St({selectedValue:r,projectsList:s}),wt(),X()}function wt(){const e=document.getElementById("res-project"),t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}ta("tax")}function ka(){const{input:e,hidden:t}=_a();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ea(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ca(r.id);i?Gs(i,{skipProjectSelectUpdate:!0}):(wt(),X())}else t.value="",e.dataset.selectedId="",wt(),X()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ea(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ta(){const{input:e,hidden:t}=Aa();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Zn(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),X()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Zn(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Oo(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Dt({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Dt({clearValue:!1}),!n)return;n.fromProjectForm&&(nn={draftStorageKey:n.draftStorageKey||Rs,returnUrl:n.returnUrl||Ms});const r=document.getElementById("res-project");if(n.projectId){r&&(St({selectedValue:String(n.projectId)}),wt());const d=Ca(n.projectId);d?Gs(d,{forceNotes:!!n.forceNotes}):X(),Dt()}else{r&&St({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");ec(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&fn("res-start","res-start-time",n.start),n.end&&fn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(ha()||[]).find(m=>String(m.id)===String(n.customerId));u?.id!=null&&(Fe({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(Fe({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):Fe({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),X()}function Gt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mt(e,n),end:Mt(t,a)}}function Xs(e){const t=pn(e);if(t){const c=un.get(t);if(c)return c}const{description:n,barcode:a}=Os(e);if(a){const c=$n(a);if(c)return c}const s=ie(n||e);if(!s)return null;let r=As();if(!r?.length){const c=Z();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&$s(r)}const i=r.find(c=>ie(c?.desc||c?.description||"")===s);return i||r.find(c=>ie(c?.desc||c?.description||"").includes(s))||null}function Ys(e,t="equipment-description-options"){const n=pn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>pn(l.value)===n)||un.has(n))return!0;const{description:s}=Os(e);if(!s)return!1;const r=ie(s);return r?(As()||[]).some(c=>ie(c?.desc||c?.description||"")===r):!1}const zo={available:0,reserved:1,maintenance:2,retired:3};function Vo(e){return zo[e]??5}function ss(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Uo(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${ss(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${ss(n)})`}function _t(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Qt(),a=Z(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];$s(r);const i=new Map;r.forEach(d=>{const u=Mo(d),m=pn(u);if(!m||!u)return;const p=We(d),f=Vo(p),y=i.get(m);if(!y){i.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:f,statuses:new Set([p])});return}y.statuses.add(p),f<y.bestPriority&&(y.bestItem=d,y.bestStatus=p,y.bestPriority=f,y.value=u)}),un=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{un.set(d.normalized,d.bestItem);const u=Uo(d),m=mn(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=mn(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Qo(e,t){const n=J(e);if(!n)return!1;const{start:a,end:s}=Gt();if(!a||!s)return S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(Ke().some(d=>J(d.barcode)===n))return S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Ge(n,a,s))return S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=$n(n);if(!i)return S(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const c=We(i);if(c==="maintenance"||c==="retired")return S(At(c)),!1;const l=It(i);return l?(va({id:l,equipmentId:l,barcode:n,desc:i.desc,qty:1,price:i.price,image:dt(i)}),t&&(t.value=""),Ye(),X(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function na(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xs(t);if(!n){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=jo(n.barcode),s=We(a||n);if(s==="maintenance"||s==="retired"){S(At(s));return}const r=J(n.barcode);if(!r){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=It(n);if(!i){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:dt(n)},{start:l,end:d}=Gt();if(!l||!d){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(Ke().some(p=>J(p.barcode)===r)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Ge(r,l,d)){S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}va(c),Ye(),X(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Ko(){_t();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),na(e))});const t=()=>{Ys(e.value,"equipment-description-options")&&na(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ye(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ke(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=ut(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=dt(m)||u.image,f=p?`<img src="${p}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=q(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,E=`${q(g.toFixed(2))} ${s}`,v=`${q(h.toFixed(2))} ${s}`,I=u.barcodes.map(j=>q(String(j||""))).filter(Boolean),$=I.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${I.map(j=>`<li>${j}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${$}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}">−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}">+</button>
            </div>
          </td>
          <td>${E}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Go(e){const t=Ke(),a=ut(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Ki(s),Ye(),X())}function Wo(e){const t=Ke(),n=t.filter(a=>Kt(a)!==e);n.length!==t.length&&(_s(n),Ye(),X())}function Xo(e){const t=Ke(),a=ut(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=Gt();if(!s||!r){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(m=>J(m.barcode))),{equipment:c=[]}=Z(),l=(c||[]).find(m=>{const p=J(m?.barcode);return!p||i.has(p)||Kt({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!Fs(m)?!1:!Ge(p,s,r)});if(!l){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=J(l.barcode),u=It(l);if(!u){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}va({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:dt(l)}),Ye(),X()}function X(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(q(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status"),c=i?.value||"unpaid",{start:l,end:d}=Gt();r&&xe();const u=qt(),m=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),f=zs(m),y=Vs(p);Xa({selectedItems:Ke(),discount:t,discountType:n,applyTax:r,paidStatus:c,paymentProgressType:f,paymentProgressValue:y,start:l,end:d,companySharePercent:u,paymentHistory:[]});const g=Xa.lastResult;g?(Us(p,g.paymentProgressValue),i&&(i.value=g.paymentStatus,Se(i,g.paymentStatus))):Se(i,c)}function Yo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=q(c.target.value),X()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",X),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(isLinkedProjectSelected()){n.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ta("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(isLinkedProjectSelected()){a.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ta("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(isLinkedProjectSelected()){s.value="unpaid",Se(s,"unpaid"),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Se(s),X()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(isLinkedProjectSelected()){r.value="percent",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",X()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(isLinkedProjectSelected()){i.value="",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=q(c.target.value),X()}),i.dataset.listenerAttached="true"),X()}function Jo(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){X();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),X()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function rs(){const{input:e,hidden:t}=Aa(),{input:n,hidden:a}=_a(),{customers:s}=Z();let r=t?.value?String(t.value):"";if(!r&&e?.value){const V=Zn(e.value,{allowPartial:!0});V&&(r=String(V.id),t&&(t.value=r),e.value=V.label,e.dataset.selectedId=r)}const i=s.find(V=>String(V.id)===r);if(!i){S(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const V=ea(n.value,{allowPartial:!0});V&&(l=String(V.id),a&&(a.value=l),n.value=V.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${d}T${m}`,y=`${u}T${p}`,g=new Date(f),h=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(h.getTime())||g>=h){S(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const E=Gi(),v=Ke();if(v.length===0&&E.length===0){S(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",$=parseFloat(q(document.getElementById("res-discount")?.value))||0,j=document.getElementById("res-discount-type")?.value||"percent",b=document.getElementById("res-payment-status"),w=b?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),T=document.getElementById("res-payment-progress-value"),R=zs(_),x=Vs(T),D=l?Ca(l):null,O=Ho(D);if(l&&!D){S(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const V of v){const ne=We(V.barcode);if(ne==="maintenance"||ne==="retired"){S(At(ne));return}}for(const V of v){const ne=J(V.barcode);if(Ge(ne,f,y)){S(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const V of E)if(Ss(V,f,y)){S(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const M=document.getElementById("res-tax"),P=document.getElementById("res-company-share"),B=!!l;B?(M&&(M.checked=!1,M.disabled=!0,M.classList.add("disabled"),M.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.checked=!1,P.disabled=!0,P.classList.add("disabled"),P.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),b&&(b.value="unpaid",b.disabled=!0,Se(b,"unpaid"),b.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),T&&(T.value="",T.disabled=!0,T.classList.add("disabled"))):(M&&(M.disabled=!1,M.classList.remove("disabled"),M.title=""),P&&(P.disabled=!1,P.classList.remove("disabled"),P.title=""),b&&(b.disabled=!1,b.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),T&&(T.disabled=!1,T.classList.remove("disabled")));const z=B?!1:M?.checked||!1,N=!!P?.checked;if(!B&&N!==z){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let A=N?qt():null;N&&(!Number.isFinite(A)||A<=0)&&(xe(),A=qt());const H=N&&z&&Number.isFinite(A)&&A>0;z&&xe();const Q=ws(v,$,j,z,E,{start:f,end:y,companySharePercent:H?A:0}),ee=Vi(),U=Es({totalAmount:Q,progressType:R,progressValue:x,history:[]});T&&Us(T,U.paymentProgressValue);const oe=[];U.paymentProgressValue!=null&&U.paymentProgressValue>0&&oe.push({type:U.paymentProgressType||R,value:U.paymentProgressValue,amount:U.paidAmount,percentage:U.paidPercent,recordedAt:new Date().toISOString()});const Y=xs({manualStatus:w,paidAmount:U.paidAmount,paidPercent:U.paidPercent,totalAmount:Q});b&&(b.value=Y,Se(b,Y));const re=Is({reservationCode:ee,customerId:c,start:f,end:y,status:O?"confirmed":"pending",title:null,location:null,notes:I,projectId:l||null,totalAmount:Q,discount:B?0:$,discountType:B?"percent":j,applyTax:z,paidStatus:B?"unpaid":Y,confirmed:O,items:v.map(V=>({...V,equipmentId:V.equipmentId??V.id})),technicians:E,companySharePercent:B||!H?null:A,companyShareEnabled:B?!1:H,paidAmount:B?0:U.paidAmount,paidPercentage:B?0:U.paidPercent,paymentProgressType:B?null:U.paymentProgressType,paymentProgressValue:B?null:U.paymentProgressValue,paymentHistory:B?[]:oe});try{const V=await Wi(re);Qt(),_t(),Vt(),tc(),S(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Xn=="function"&&Xn({type:"created",reservation:V}),Zo(V)}catch(V){console.error("❌ [reservations/createForm] Failed to create reservation",V);const ne=qn(V)?V.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(ne,"error"),B&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Dt({clearValue:!1}))}}function Zo(e){if(!nn)return;const{draftStorageKey:t=Rs,returnUrl:n=Ms}=nn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}nn=null,n&&(window.location.href=n)}function Js(){const e=document.getElementById("res-project-input"),t=document.getElementById("res-project");return{input:e,hidden:t}}function Dt({clearValue:e=!1}={}){const{input:t,hidden:n}=Js();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.title="",e&&(t.value="",t.dataset.selectedId=""),n&&e&&(n.value=""))}function ec(e,t=""){const{input:n,hidden:a}=Js();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),n.value=t,n.dataset.selectedId="",e&&(n.title=e),a&&(a.value=""))}function tc(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Fe({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-tax");n&&(n.checked=!1,n.disabled=!1,n.classList.remove("disabled"));const a=document.getElementById("res-company-share");a&&(a.checked=!1);const s=document.getElementById("res-project"),r=document.getElementById("res-project-input");s&&(s.value=""),r&&(r.value="",r.dataset.selectedId=""),Dt({clearValue:!1}),St({selectedValue:"",resetInput:!0});const i=document.getElementById("equipment-description");i&&(i.value="");const c=document.getElementById("res-payment-status");c&&(c.value="unpaid",Se(c,"unpaid"));const l=document.getElementById("res-payment-progress-type");l&&(l.value="percent");const d=document.getElementById("res-payment-progress-value");d&&(d.value=""),Xi(),_s([]),Ye(),wt(),X()}function nc(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Go(s);return}if(a==="increase-group"&&s){Xo(s);return}if(a==="remove-group"&&s){Wo(s);return}}),e.dataset.listenerAttached="true")}function ac(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Qo(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:i}=Gt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function sc(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await rs()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await rs()}),t.dataset.listenerAttached="true")}function Gl({onAfterSubmit:e}={}){Xn=typeof e=="function"?e:null;const{customers:t,projects:n}=Z();Qi(t||[]),Fe(),Ta(),Ks(n||[]),Ws({projectsList:n}),ka(),_t(),Ko(),Jo(),Yo(),nc(),ac(),sc(),Oo(),X(),Ye()}function Zs(){_t(),Ws(),Fe(),Ta(),ka(),Ye(),X()}if(typeof document<"u"){const e=()=>{Fe(),St({projectsList:$a()}),Ta(),ka(),X()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=qt);function er(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:nt(t),endDate:nt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:nt(n),endDate:nt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:nt(n),endDate:nt(a)}}return e==="upcoming"?{startDate:nt(t),endDate:""}:{startDate:"",endDate:""}}function rc(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=q(t?.value||"").trim(),i=q(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),gn(t),gn(n),r="",i=""),!r&&!i&&c){const d=er(c);r=d.startDate,i=d.endDate}return{searchTerm:ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Wl(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=q(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{ic(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),gn(a),gn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function ic(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=er(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function nt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function gn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Jt(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function oc(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function cc(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=oc(n);if(a!==null)return a}return null}function is(e,t=0){const n=cc(e);if(n!=null)return n;const a=Jt(e.createdAt??e.created_at);if(a!=null)return a;const s=Jt(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Jt(e.start);if(r!=null)return r;const i=Jt(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function lc({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,I)=>({reservation:v,index:I})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",f=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,h=m?new Date(`${m}T23:59:59`):null,E=r.filter(({reservation:v})=>{const I=n.get(String(v.customerId)),$=s?.get?.(String(v.projectId)),j=v.start?new Date(v.start):null,b=Ia(v),{effectiveConfirmed:w}=Xe(v,$);if(f!=null&&String(v.customerId)!==String(f)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(D=>String(D)):[]).includes(String(y))||p==="confirmed"&&!w||p==="pending"&&w||p==="completed"&&!b||g&&j&&j<g||h&&j&&j>h)return!1;if(c){const x=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],D=ie(x.filter(M=>M!=null&&M!=="").map(String).join(" ")).replace(/\s+/g,""),O=c.replace(/\s+/g,"");if(!D.includes(O))return!1}if(l&&!ie(I?.customerName||"").includes(l))return!1;if(d){const x=[v.projectId,v.project_id,v.projectID,$?.id,$?.projectCode,$?.project_code],D=ie(x.filter(M=>M!=null&&M!=="").map(String).join(" ")).replace(/\s+/g,""),O=d.replace(/\s+/g,"");if(!D.includes(O))return!1}if(!i)return!0;const _=v.items?.map?.(x=>`${x.barcode} ${x.desc}`).join(" ")||"",T=(v.technicians||[]).map(x=>a.get(String(x))?.name).filter(Boolean).join(" ");return ie([v.reservationId,I?.customerName,v.notes,_,T,$?.title].filter(Boolean).join(" ")).includes(i)});return E.sort((v,I)=>{const $=is(v.reservation,v.index),j=is(I.reservation,I.index);return $!==j?j-$:I.index-v.index}),E}function dc({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),p=o("reservations.list.payment.paid","💳 مدفوع"),f=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),h=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),E=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:$})=>{const j=t.get(String(I.customerId)),b=I.projectId?a?.get?.(String(I.projectId)):null,w=Ia(I),_=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),T=_==="paid",R=_==="partial",{effectiveConfirmed:x,projectLinked:D}=Xe(I,b),O=x?"status-confirmed":"status-pending",M=T?"status-paid":R?"status-partial":"status-unpaid";let P=`<span class="reservation-chip status-chip ${O}">${x?u:m}</span>`;const B=T?p:R?y:f;let z=`<span class="reservation-chip status-chip ${M}">${B}</span>`,N=T?" tile-paid":R?" tile-partial":" tile-unpaid";w&&(N+=" tile-completed");let A="";w&&(P=`<span class="reservation-chip status-chip status-completed">${u}</span>`,z=`<span class="reservation-chip status-chip status-completed">${B}</span>`,A=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const H=!D&&!x?`<button class="tile-confirm" data-reservation-index="${$}" data-action="confirm">${g}</button>`:"",Q=H?`<div class="tile-actions">${H}</div>`:"",ee=I.items?.length||0,U=(I.technicians||[]).map(ye=>n.get(String(ye))).filter(Boolean),oe=U.map(ye=>ye.name).join(d)||"—",Y=q(String(I.reservationId??"")),re=I.start?q(Ue(I.start)):"-",V=I.end?q(Ue(I.end)):"-",ne=q(String(I.cost??0)),Pe=q(String(ee)),Ae=I.notes?q(I.notes):c,_e=l.replace("{count}",Pe),fe=I.applyTax?`<small>${r}</small>`:"";let $e=h;return I.projectId&&($e=b?.title?q(b.title):E),`
      <div class="${H?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${N}"${A} data-reservation-index="${$}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${Y}</div>
          <div class="tile-badges">
            ${P}
            ${z}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${j?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${ne} ${s} ${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${_e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${U.length?oe:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ae}</span>
          </div>
        </div>
        ${Q}
      </div>
    `}).join("")}function ve(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function uc(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Xe(e,s),c=e.paid===!0||e.paid==="paid",l=Ia(e),d=e.items||[],u=ut(d),{technicians:m=[]}=Z(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),f=new Map;p.forEach(k=>{if(!k||k.id==null)return;const G=String(k.id),ae=f.get(G)||{};f.set(G,{...ae,...k})});const y=(e.technicians||[]).map(k=>f.get(String(k))).filter(Boolean),g=lt(),h=Cs(e.start,e.end),E=(k={})=>{const G=[k.dailyWage,k.daily_rate,k.dailyRate,k.wage,k.rate];for(const ae of G){if(ae==null)continue;const he=parseFloat(q(String(ae)));if(Number.isFinite(he))return he}return 0},v=(k={})=>{const G=[k.dailyTotal,k.daily_total,k.totalRate,k.total,k.total_wage];for(const ae of G){if(ae==null)continue;const he=parseFloat(q(String(ae)));if(Number.isFinite(he))return he}return E(k)},$=d.reduce((k,G)=>k+(G.qty||1)*(G.price||0),0)*h,j=y.reduce((k,G)=>k+E(G),0),b=y.reduce((k,G)=>k+v(G),0),w=j*h,_=b*h,T=$+_,R=parseFloat(e.discount)||0,x=e.discountType==="amount"?R:T*(R/100),D=Math.max(0,T-x),O=r?!1:e.applyTax,M=Number(e.cost),P=Number.isFinite(M),B=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,z=B!=null?parseFloat(q(String(B))):NaN;let H=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(z)&&z>0)&&Number.isFinite(z)?z:0;O&&H<=0&&(H=Me);let Q=H>0?Math.max(0,D*(H/100)):0;const ee=D+Q,U=O?ee*.15:0,oe=Number.isFinite(U)&&U>0?Number(U.toFixed(2)):0,Y=ee+oe,re=Number.isFinite(Y)?Number(Y.toFixed(2)):0,V=r?re:P?M:re;H>0&&(Q=Number(Math.max(0,D*(H/100)).toFixed(2)));const ne=q(String(e.reservationId??e.id??"")),Pe=e.start?q(Ue(e.start)):"-",Ae=e.end?q(Ue(e.end)):"-",_e=q(String(y.length)),fe=q($.toFixed(2)),$e=q(x.toFixed(2)),le=q(D.toFixed(2)),ye=q(oe.toFixed(2)),W=q((Number.isFinite(V)?V:0).toFixed(2)),se=q(String(h)),te=o("reservations.create.summary.currency","SR"),Je=o("reservations.details.labels.discount","الخصم"),He=o("reservations.details.labels.tax","الضريبة (15%)"),Nn=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Bn=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),Ze=o("reservations.details.labels.duration","عدد الأيام"),$t=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ct=o("reservations.details.labels.netProfit","💵 صافي الربح"),jn=o("reservations.create.equipment.imageAlt","صورة"),be={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Dn=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),K=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),ce=o("reservations.details.technicians.roleUnknown","غير محدد"),et=o("reservations.details.technicians.phoneUnknown","غير متوفر"),Or=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),zr=o("reservations.list.status.confirmed","✅ مؤكد"),Vr=o("reservations.list.status.pending","⏳ غير مؤكد"),Ur=o("reservations.list.payment.paid","💳 مدفوع"),Qr=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Kr=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Gr=o("reservations.list.status.completed","📁 منتهي"),Wr=o("reservations.details.labels.id","🆔 رقم الحجز"),Xr=o("reservations.details.section.bookingInfo","بيانات الحجز"),Yr=o("reservations.details.section.paymentSummary","ملخص الدفع"),Jr=o("reservations.details.labels.finalTotal","المجموع النهائي"),Zr=o("reservations.details.section.crew","😎 الفريق الفني"),ei=o("reservations.details.crew.count","{count} عضو"),ti=o("reservations.details.section.items","📦 المعدات المرتبطة"),ni=o("reservations.details.items.count","{count} عنصر"),ai=o("reservations.details.actions.edit","✏️ تعديل"),si=o("reservations.details.actions.delete","🗑️ حذف"),ri=o("reservations.details.labels.customer","العميل"),ii=o("reservations.details.labels.contact","رقم التواصل"),oi=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const ci=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),li=o("reservations.details.actions.openProject","📁 فتح المشروع"),di=o("reservations.details.labels.start","بداية الحجز"),ui=o("reservations.details.labels.end","نهاية الحجز"),mi=o("reservations.details.labels.notes","ملاحظات"),pi=o("reservations.list.noNotes","لا توجد ملاحظات"),fi=o("reservations.details.labels.itemsCount","عدد المعدات"),gi=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),yi=o("reservations.paymentHistory.title","سجل الدفعات"),bi=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),hi=o("reservations.list.unknownCustomer","غير معروف"),Fn=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),za=Fn==="partial",vi=Fn==="paid"?Ur:za?Kr:Qr,qi=u.reduce((k,G)=>k+(Number(G.quantity)||0),0),Si=q(String(qi)),Va=ni.replace("{count}",Si),wi=ei.replace("{count}",_e),Ei=e.notes?q(e.notes):pi,xi=q(_.toFixed(2)),Ii=q(String(H)),Ai=q(Q.toFixed(2)),_i=`${Ii}% (${Ai} ${te})`,$i=Math.max(0,$+_-x),Ua=Math.max(0,$i-w),Ci=q(Ua.toFixed(2)),Oe=[{icon:"💼",label:gi,value:`${fe} ${te}`}];Oe.push({icon:"😎",label:Nn,value:`${xi} ${te}`}),x>0&&Oe.push({icon:"💸",label:Je,value:`${$e} ${te}`}),Oe.push({icon:"📊",label:Bn,value:`${le} ${te}`}),O&&oe>0&&Oe.push({icon:"🧾",label:He,value:`${ye} ${te}`}),H>0&&Oe.push({icon:"🏦",label:$t,value:_i}),Math.abs(Ua-(V??0))>.009&&Oe.push({icon:"💵",label:Ct,value:`${Ci} ${te}`}),Oe.push({icon:"💰",label:Jr,value:`${W} ${te}`});const ki=Oe.map(({icon:k,label:G,value:ae})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${k} ${G}</span>
      <span class="summary-details-value">${ae}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let kt=[];Array.isArray(e.paymentHistory)?kt=e.paymentHistory:Array.isArray(e.payment_history)&&(kt=e.payment_history);const Ti=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Qa=Array.isArray(kt)&&kt.length>0?kt:Ti,Li=Qa.length?`<ul class="reservation-payment-history-list">${Qa.map(k=>{const G=k?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):k?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ae=Number.isFinite(Number(k?.amount))&&Number(k.amount)>0?`${q(Number(k.amount).toFixed(2))} ${te}`:"—",he=Number.isFinite(Number(k?.percentage))&&Number(k.percentage)>0?`${q(Number(k.percentage).toFixed(2))}%`:"—",yt=k?.recordedAt?q(Ue(k.recordedAt)):"—",bt=k?.note?`<div class="payment-history-note">${ve(q(k.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${ve(G)}</span>
              <span class="payment-history-entry__amount">${ae}</span>
              <span class="payment-history-entry__percent">${he}</span>
              <span class="payment-history-entry__date">${yt}</span>
            </div>
            ${bt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${ve(bi)}</div>`,Ka=[{text:i?zr:Vr,className:i?"status-confirmed":"status-pending"},{text:vi,className:Fn==="paid"?"status-paid":za?"status-partial":"status-unpaid"}];l&&Ka.push({text:Gr,className:"status-completed"});const Pi=Ka.map(({text:k,className:G})=>`<span class="status-chip ${G}">${k}</span>`).join(""),tt=(k,G,ae)=>`
    <div class="res-info-row">
      <span class="label">${k} ${G}</span>
      <span class="value">${ae}</span>
    </div>
  `;let Rn="";if(e.projectId){let k=ve(ci);if(s){const G=s.title||o("projects.fallback.untitled","مشروع بدون اسم");k=`${ve(G)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${ve(li)}</button>`}Rn=`
      <div class="res-info-row">
        <span class="label">📁 ${oi}</span>
        <span class="value">${k}</span>
      </div>
    `}const Ne=[];Ne.push(tt("👤",ri,t?.customerName||hi)),Ne.push(tt("📞",ii,t?.phone||"—")),Ne.push(tt("🗓️",di,Pe)),Ne.push(tt("🗓️",ui,Ae)),Ne.push(tt("📦",fi,Va)),Ne.push(tt("⏱️",Ze,se)),Ne.push(tt("📝",mi,Ei)),Rn&&Ne.push(Rn);const Ni=Ne.join(""),Bi=u.length?u.map(k=>{const G=k.items[0]||{},ae=dt(G)||k.image,he=ae?`<img src="${ae}" alt="${jn}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',yt=Number(k.quantity)||Number(k.count)||0,bt=q(String(yt)),Ga=Number.isFinite(Number(k.unitPrice))?Number(k.unitPrice):0,Ri=Number.isFinite(Number(k.totalPrice))?Number(k.totalPrice):Ga*yt,Mi=`${q(Ga.toFixed(2))} ${te}`,Hi=`${q(Ri.toFixed(2))} ${te}`,Wa=k.barcodes.map(Mn=>q(String(Mn||""))).filter(Boolean),Oi=Wa.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Wa.map(Mn=>`<li>${Mn}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${he}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${ve(G.desc||G.description||G.name||k.description||"-")}</div>
                  ${Oi}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ve(be.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${bt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${ve(be.unitPrice)}">${Mi}</td>
            <td class="reservation-modal-items-table__cell" data-label="${ve(be.total)}">${Hi}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${ve(be.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Dn}</td></tr>`,ji=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${be.item}</th>
            <th>${be.quantity}</th>
            <th>${be.unitPrice}</th>
            <th>${be.total}</th>
            <th>${be.actions}</th>
          </tr>
        </thead>
        <tbody>${Bi}</tbody>
      </table>
    </div>
  `,Di=y.map((k,G)=>{const ae=q(String(G+1)),he=k.role||ce,yt=k.phone||et,bt=k.wage?Or.replace("{amount}",q(String(k.wage))).replace("{currency}",te):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ae}</span>
          <span class="technician-name">${k.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${he}</div>
          <div>📞 ${yt}</div>
          ${bt?`<div>💰 ${bt}</div>`:""}
        </div>
      </div>
    `}).join(""),Fi=y.length?`<div class="reservation-technicians-grid">${Di}</div>`:`<ul class="reservation-modal-technicians"><li>${K}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Wr}</span>
          <strong>${ne}</strong>
        </div>
        <div class="status-chips">
          ${Pi}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Xr}</h6>
          ${Ni}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Yr}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${ki}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${yi}</h6>
              ${Li}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Zr}</span>
          <span class="count">${wi}</span>
        </div>
        ${Fi}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ti}</span>
          <span class="count">${Va}</span>
        </div>
        ${ji}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${ai}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${si}</button>`:""}
      </div>
    </div>
  `}const mc=`@page {
  margin: 0;
  size: A4;
}

html,
body,
.page,
.quote-wrapper {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;600;700&display=swap');

#quotation-pdf-root {
  width: 210mm;
  min-width: 210mm;
  max-width: 210mm;
  min-height: 100%;
  box-sizing: border-box;
  font-family: 'Tajawal', 'Arial', 'Tahoma', sans-serif;
  color: #000000 !important;
  /* background: #ffffff !important; */
  direction: rtl;
  text-align: right;
  margin: 0 auto;
  padding: 0;
}

#quotation-pdf-root * {
  box-sizing: border-box;
  color: #000000 !important;
}

#quotation-pdf-root [style*="color"],
#quotation-pdf-root [class*="text"],
#quotation-pdf-root [class*="-text"],
#quotation-pdf-root [class*="text-"] {
  color: #000000 !important;
}

.quote-preview-pages {
  width: 210mm;
  max-width: 210mm;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-preview-pages {
  gap: 0 !important;
  row-gap: 0 !important;
  column-gap: 0 !important;
}

[data-quote-source] {
  display: none;
}

.quote-page {
  position: relative;
  width: 210mm;
  max-width: 210mm;
  min-width: 210mm;
  height: 297mm;
  min-height: 297mm;
  max-height: 297mm;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 4mm 14mm 12mm;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  page-break-after: auto;
  break-after: auto;
  page-break-before: auto;
  break-before: auto;
  page-break-inside: avoid;
  break-inside: avoid;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page {
  box-shadow: none !important;
}

#quotation-pdf-root[data-quote-render-context="export"] .quote-page + .quote-page::before {
  display: none !important;
}

.quote-page:last-of-type {
  page-break-after: auto;
  break-after: auto;
}

.quote-page--primary {
  padding-top: 6mm;
}

.quote-page--continuation {
  padding-top: 12mm;
}

.quote-page + .quote-page::before {
  content: '';
  position: absolute;
  top: -18px;
  right: 16px;
  width: calc(100% - 32px);
  height: 1px;
  background: rgba(148, 163, 184, 0.5);
}

.quote-body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
}

.quote-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  margin: 0 auto 12px;
  padding: 0;
}

.quote-header__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.72rem;
  color: #000000 !important;
  justify-self: start;
}

.quote-header__meta-item {
  display: flex;
  gap: 4px;
  align-items: baseline;
}

.quote-header__meta-item span {
  font-weight: 600;
  color: #000000 !important;
}

.quote-header__meta-item strong {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000000 !important;
}

.quote-header__title {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  align-items: center;
  justify-self: center;
}

.quote-header__title h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.quote-company-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #000000 !important;
}

.quote-company-cr {
  margin: 0;
  font-size: 13px;
  font-weight: 500;
  color: #000000 !important;
}

.quote-header__logo {
  justify-self: end;
  align-self: flex-start;
}

.quote-header__logo .quote-logo {
  width: 90px;
  height: 90px;
}

.quote-logo {
  display: block;
  object-fit: contain;
}

.quote-section h3 {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: right;
  color: #000000 !important;
}

.quote-section__title {
  margin: 0 0 8px;
  font-size: 0.7rem;
  font-weight: 600;
  text-align: right;
  color: #000000 !important;
}

.quote-section--plain {
  padding-bottom: 4px;
  text-align: right;
}

.quote-section-row {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: stretch;
}

.quote-section-row .quote-section {
  flex: 1 1 0;
  min-width: 0;
}

.quote-section--customer {
  text-align: left;
  margin-left: auto;
  margin-right: 0;
  max-width: 46%;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  align-items: flex-start;
  text-align: left;
  justify-content: flex-start;
}

.quote-section--reservation {
  text-align: left;
  margin-right: auto;
  margin-left: 0;
  max-width: fit-content;
}


.quote-section--financial {
  width: 100%;
  margin: 0;
}

#quotation-pdf-root[data-quote-render-context] .quote-section--financial {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 900px) {
  #quotation-pdf-root[data-quote-render-context="preview"] .quote-section--financial {
    max-width: 100%;
  }
}


.quote-section,
.info-block,
.payment-block,
.totals-block,
.quote-notes,
.quote-approval-note,
.quote-footer,
.quote-placeholder {
  width: 100%;
  margin: 0;
  padding-top: 0;
  page-break-inside: avoid;
  break-inside: avoid;
}

.quote-section {
  margin-bottom: 12px;
}

.totals-block h3,
.payment-block h3 {
  margin: 0;
  text-align: center;
}

.quote-placeholder {
  padding: 18px 16px;
  border: 1px dashed rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  font-size: 0.9rem;
  background: #ffffff;
  text-align: right;
}

.info-block,
.payment-block,
.totals-block {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  direction: ltr;
}

.payment-block {
  align-items: stretch;
  text-align: right;
  direction: rtl;
  font-family: 'Tajawal', sans-serif;
  padding: 10px 12px;
  gap: 10px;
  width: 100%;
}

.payment-rows {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
}

.payment-row {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  direction: rtl;
  font-size: 0.68rem;
}

.payment-row__label {
  font-weight: 600;
  color: #000000 !important;
  text-align: right;
}

.payment-row__slash {
  font-weight: 600;
  color: #000000 !important;
}

.payment-row__value {
  font-weight: 700;
  color: #000000 !important;
  text-align: left;
  direction: ltr;
  white-space: nowrap;
}

.payment-block h3 {
  text-align: right;
  margin: 0;
}

.totals-block {
  font-size: 0.62rem;
  align-items: stretch;
  text-align: center;
  margin: 0 auto;
  direction: rtl;
  gap: 10px;
  font-family: 'Tajawal', sans-serif;
  padding: 12px 16px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.totals-block h3 {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
  color: #000000 !important;
  margin-bottom: 4px;
  text-align: center;
  width: 100%;
}

.info-plain {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  text-align: left;
  font-size: 0.68rem;
  color: #000000 !important;
}

.info-plain__item {
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  align-items: baseline;
}

.info-plain--right {
  align-items: flex-end;
  text-align: right;
}

.info-plain--right .info-plain__item {
  justify-content: flex-end;
}

.info-plain__label {
  font-weight: 600;
  color: #000000 !important;
}

.info-plain__value {
  font-weight: 600;
  font-size: 0.8rem;
  color: #000000 !important;
}

.info-plain--dense {
  gap: 4px;
  font-size: 0.7rem;
}

.info-plain--dense .info-plain__value {
  font-size: 0.76rem;
}

.info-plain__slash {
  color: #000000 !important;
  font-weight: 400;
}

.info-block h4,
.payment-block h4,
.totals-block h4 {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}

.info-block__rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: right;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  text-align: left;
}

.info-row span {
  font-weight: 600;
  font-size: 13px;
  color: #000000 !important;
}

.info-row strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
}

.info-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  text-align: left;
  width: 100%;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: right;
}

.info-item span {
  font-weight: 600;
  font-size: 13px;
  color: #000000 !important;
}

.info-item strong {
  font-weight: 700;
  font-size: 13.5px;
  color: #000000 !important;
}

.totals-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 6px;
  width: 100%;
  justify-items: center;
}

.totals-inline {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  gap: 8px;
  overflow: hidden;
}

.totals-inline__item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 4px 10px;
  border-radius: 9px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  white-space: nowrap;
  font-size: 0.64rem;
  font-family: 'Tajawal', sans-serif;
  flex: 0 0 auto;
}

.totals-inline__label {
  font-weight: 600;
  color: #000000 !important;
}

.totals-inline__slash {
  font-weight: 600;
  color: #000000 !important;
}

.totals-inline__value {
  font-weight: 700;
  color: #000000 !important;
}

.totals-final {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 6px;
}

.totals-item--final {
  background: rgba(59, 91, 220, 0.12);
  border-color: rgba(59, 91, 220, 0.35);
  padding: 8px 16px;
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 12px;
}

.totals-item__label {
  font-weight: 600;
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__slash {
  font-weight: 600;
  color: #000000 !important;
  font-size: 0.7rem;
}

.totals-item__value {
  font-weight: 700;
  color: #000000 !important;
  font-size: 0.78rem;
}

.quote-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 12px;
  border: 1px solid rgba(148, 163, 184, 0.5);
  background-color: #ffffff !important;
  direction: rtl;
  text-align: center;
  page-break-inside: auto;
  word-break: break-word;
}

.quote-table thead,
.quote-table tbody,
.quote-table tr,
.quote-table th,
.quote-table td {
  background-color: #ffffff !important;
  color: #000000 !important;
  direction: rtl;
  text-align: center;
}

.quote-table th {
  padding: 9px 8px;
  font-weight: 700;
}

.quote-table th,
.quote-table td {
  border: 1px solid rgba(148, 163, 184, 0.5);
  text-align: center;
  padding: 9px 6px;
}

.quote-table tbody tr:last-child td {
  border-bottom: 1.5px solid rgba(148, 163, 184, 0.7);
}

.quote-section--table {
  display: block;
  clear: both;
  overflow: visible;
  break-inside: auto;
  page-break-inside: auto;
  page-break-after: auto;
  padding-top: 4mm;
}

.quote-section--table-fragment {
  padding-top: 4mm;
}

.quote-section--table-fragment--continued {
  padding-top: 2mm;
  margin-top: 6px;
}

.quote-section--table-fragment--continued h3 {
  margin-top: 0;
}

.quote-section--table-fragment--overflow {
  overflow: visible;
}

.quote-page .quote-section--table:first-of-type {
  padding-top: 0;
}
.quote-page .quote-section--table.quote-section--table-fragment--continued:first-of-type {
  padding-top: 2mm;
}

.quote-table {
  page-break-inside: auto;
  break-inside: auto;
  overflow: visible;
  margin-top: 2mm;
}

.quote-table thead {
  display: table-header-group;
}

.quote-table tbody {
  display: table-row-group;
}

.quote-table tr {
  page-break-inside: avoid;
  page-break-after: auto;
}

.quote-table td {
  padding: 9px 8px;
}

.quote-table .empty {
  padding: 14px;
  font-weight: 500;
  color: #000000 !important;
}

.quote-notes {
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.38);
  border-radius: 12px;
  padding: 10px 12px;
  min-height: 0;
  font-family: 'Tajawal', 'Arial', 'Tahoma', sans-serif;
  font-size: 13px;
  line-height: 1.85;
  letter-spacing: normal;
  white-space: pre-wrap;
  word-break: normal;
  overflow-wrap: anywhere;
  line-break: normal;
  unicode-bidi: plaintext;
  font-feature-settings: 'liga' 1, 'rlig' 1;
  font-kerning: normal;
  text-align: right;
}

.quote-notes img[data-quote-note-image] {
  width: 100%;
  height: auto;
  display: block;
  border-radius: inherit;
}

.quote-approval-note {
  margin-top: 12px;
  font-size: 12px;
  background: rgba(234, 179, 8, 0.15);
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(234, 179, 8, 0.3);
  text-align: right;
}

.quote-footer {
  margin-top: 20px;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  padding-top: 10px;
  text-align: right;
}

.quote-footer h4 {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  text-align: right;
}

.quote-footer ul {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  direction: rtl;
  text-align: right;
  padding-inline-start: 0;
  padding-inline-end: 18px;
}

@media print {
  #quotation-pdf-root {
    width: 210mm;
    min-width: 210mm;
    max-width: 210mm;
    min-height: auto;
    padding: 0;
    margin: 0 auto;
  }

  .quote-preview-pages {
    gap: 0;
  }

  .quote-page {
    box-shadow: none;
  }
}
`,tr="reservations.quote.sequence",aa="reservations.quote.togglePrefs.v1",nr="https://help.artratio.sa/guide/quote-preview",Be={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},pc=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],we=[...pc];function sa(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...we]}function fc(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=sa(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=sa(t.value);if(a.length)return a}const n=we.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...we]}const Cn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],ar=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>C(q(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>C(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>C(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>C(q(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>C(q(Number(e?.price||0).toFixed(2)))}],sr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>C(q(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>C(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>C(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>C(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],La={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:ar.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:sr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},rr=new Set(Cn.map(({id:e})=>e)),ir=Object.fromEntries(Object.entries(La).map(([e,t=[]])=>[e,new Set(t.map(n=>n.id))]));function or(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const gc="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",yc="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",bc="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",hc=mc.trim(),vc=/color\([^)]*\)/gi,yn=/(color\(|color-mix\()/i,qc=document.createElement("canvas"),Zt=qc.getContext("2d"),cr=/^data:image\/svg\+xml/i,Sc=/\.svg($|[?#])/i,Bt=512,ra="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",lr=96,dr=25.4,ia=210,an=297,sn=Math.round(ia/dr*lr),rn=Math.round(an/dr*lr),wc=2,ur=/safari/i,Ec=/(iphone|ipad|ipod)/i,os=/(iphone|ipad|ipod)/i,xc=/(crios|fxios|edgios|opios)/i,bn="[reservations/pdf]";let F=null,L=null,Ce=1,Lt=null,Pt=null,Ve=null,ht=null,Ft=!1;function rt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!F?.statusIndicator||!F?.statusText)return;F.statusKind=e;const r=t||or(e);F.statusText.textContent=r,F.statusSpinner&&(F.statusSpinner.hidden=!s),F.statusAction&&(F.statusAction.hidden=!0,F.statusAction.onclick=null,n&&typeof a=="function"&&(F.statusAction.textContent=n,F.statusAction.hidden=!1,F.statusAction.onclick=i=>{i.preventDefault(),a()})),F.statusIndicator.hidden=!1,requestAnimationFrame(()=>{F.statusIndicator.classList.add("is-visible")})}function Rt(e){!F?.statusIndicator||!F?.statusText||(F.statusKind=null,F.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{F?.statusIndicator&&(F.statusIndicator.hidden=!0,F.statusAction&&(F.statusAction.hidden=!0,F.statusAction.onclick=null),F.statusSpinner&&(F.statusSpinner.hidden=!1))},220))}function oa(){return!!window?.bootstrap?.Modal}function Ic(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Ve||(Ve=document.createElement("div"),Ve.className="modal-backdrop fade show",Ve.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Ve)),ht||(ht=t=>{t.key==="Escape"&&ca(e)},document.addEventListener("keydown",ht));try{e.focus({preventScroll:!0})}catch{}}}function ca(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Ve&&(Ve.remove(),Ve=null),ht&&(document.removeEventListener("keydown",ht),ht=null))}function Ac(e){if(e){if(oa()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}Ic(e)}}function _c(){if(Ft)return;Ft=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!F?.modal?.classList.contains("show"),s=()=>{F?.modal?.classList.contains("show")&&(rt("render"),Ft=!1,mt())};vs({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:nr}),a&&rt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Pa(){const e={};return Object.entries(La).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function mr(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function $c(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function pr(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function fr(){return Object.fromEntries(Cn.map(({id:e})=>[e,!1]))}function Na(e,t){return e.sectionExpansions||(e.sectionExpansions=fr()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Cc(e,t){return Na(e,t)?.[t]!==!1}function Ba(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function kc(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ec.test(e)}function Tc(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=ur.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function gr(){return kc()&&Tc()}function kn(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=os.test(e)||os.test(t),s=/Macintosh/i.test(e)&&n>1;return ur.test(e)&&!xc.test(e)&&(a||s)}function Un(e,...t){try{console.log(`${bn} ${e}`,...t)}catch{}}function Re(e,...t){try{console.warn(`${bn} ${e}`,...t)}catch{}}function Lc(e,t,...n){try{t?console.error(`${bn} ${e}`,t,...n):console.error(`${bn} ${e}`,...n)}catch{}}function qe(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Pc(e,t="لا توجد بيانات للعرض."){const n=C(o(e,t));return qe(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function cs(e,t){return Array.isArray(e)&&e.length?e:[Pc(t)]}function la(e,t="#000"){if(!Zt||!e)return t;try{return Zt.fillStyle="#000",Zt.fillStyle=e,Zt.fillStyle||t}catch{return t}}function Nc(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=la(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const Bc=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function yr(e=""){return Bc.test(e)}function jc(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!yr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function br(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(vc,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Dc=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function hr(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Dc.forEach(i=>{const c=s[i];if(c&&yn.test(c)){const l=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=la(c,d);a.style.setProperty(l,u,"important")}});const r=s.backgroundImage;if(r&&yn.test(r)){const i=la(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function vr(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&yn.test(i)){const c=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(c,l,"important")}});const s=a.backgroundImage;s&&yn.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function ls(e,t=Bt){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Fc(e){if(!e)return{width:Bt,height:Bt};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?ls(t,0):0,s=n?ls(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Bt,height:s||Bt}}function qr(e=""){return typeof e!="string"?!1:cr.test(e)||Sc.test(e)}function Rc(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Mc(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Sr(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Mc(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Hc(e){if(!e)return null;if(cr.test(e))return Rc(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Oc(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!qr(t))return!1;const n=await Hc(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ra),!1;const a=await Sr(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ra),!1)}async function zc(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Fc(e),s=await Sr(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ra),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function wr(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{qr(s.getAttribute?.("src"))&&a.push(Oc(s))}),n.forEach(s=>{a.push(zc(s))}),a.length&&await Promise.allSettled(a)}function Vc(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(A,H=0)=>{const Q=parseFloat(A);return Number.isFinite(Q)?Q:H},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),m=r(s.fontSize,14),p=(()=>{const A=s.lineHeight;if(!A||A==="normal")return m*1.6;const H=r(A,m*1.6);return H>0?H:m*1.6})(),f=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(f<=0)return null;const y=Math.max(1,f-d-l),g=e.textContent||"",h=g.split(/\r?\n/),E=n.createElement("canvas"),v=E.getContext("2d");if(!v)return null;const I=s.fontStyle||"normal",$=s.fontVariant||"normal",j=s.fontWeight||"400",b=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",_=A=>A.join(" "),T=[],R=A=>v.measureText(A).width;v.font=`${I} ${$} ${j} ${w} ${m}px ${b}`,h.forEach(A=>{const H=A.trim();if(H.length===0){T.push("");return}const Q=H.split(/\s+/);let ee=[];Q.forEach((U,oe)=>{const Y=U.trim();if(!Y)return;const re=_(ee.concat(Y));if(R(re)<=y||ee.length===0){ee.push(Y);return}T.push(_(ee)),ee=[Y]}),ee.length&&T.push(_(ee))}),T.length||T.push("");const x=i+c+T.length*p,D=Math.ceil(Math.max(1,f)*t),O=Math.ceil(Math.max(1,x)*t);E.width=D,E.height=O,E.style.width=`${Math.max(1,f)}px`,E.style.height=`${Math.max(1,x)}px`,v.scale(t,t);const M=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const A=Math.max(1,f),H=Math.max(1,x),Q=Math.min(u,A/2,H/2);v.moveTo(Q,0),v.lineTo(A-Q,0),v.quadraticCurveTo(A,0,A,Q),v.lineTo(A,H-Q),v.quadraticCurveTo(A,H,A-Q,H),v.lineTo(Q,H),v.quadraticCurveTo(0,H,0,H-Q),v.lineTo(0,Q),v.quadraticCurveTo(0,0,Q,0),v.closePath(),v.clip()}if(v.fillStyle=M,v.fillRect(0,0,Math.max(1,f),Math.max(1,x)),v.font=`${I} ${$} ${j} ${w} ${m}px ${b}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const P=Math.max(0,f-l);let B=i;T.forEach(A=>{const H=A.length?A:" ";v.fillText(H,P,B,y),B+=p});const z=n.createElement("img");let N;try{N=E.toDataURL("image/png")}catch(A){return Re("note canvas toDataURL failed",A),null}return z.src=N,z.alt=g,z.style.width=`${Math.max(1,f)}px`,z.style.height=`${Math.max(1,x)}px`,z.style.display="block",z.setAttribute("data-quote-note-image","true"),{image:z,canvas:E,totalHeight:x,width:f}}function Uc(e,{pixelRatio:t=1}={}){if(!e||!kn())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!yr(a.textContent||""))return;let s;try{s=Vc(a,{pixelRatio:t})}catch(r){Re("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function da(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Lc(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(rt("export"),Cr()):(rt("render"),Ft=!1,mt())};if(vs({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:nr}),F?.modal?.classList.contains("show")&&rt("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ua({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Re("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Re("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ja(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function ds(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function us(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Qc(){const e=us();return e||(Pt||(Pt=ja(yc).catch(t=>{throw Pt=null,t}).then(()=>{const t=us();if(!t)throw Pt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Pt)}async function Kc(){const e=ds();return e||(Lt||(Lt=ja(bc).catch(t=>{throw Lt=null,t}).then(()=>{const t=ds();if(!t)throw Lt=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Lt)}async function Gc(){if(window.html2pdf||await ja(gc),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Nc(),jc()}function C(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Wc(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function Xc(){const e=window.localStorage?.getItem?.(tr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Yc(){const t=Xc()+1;return{sequence:t,quoteNumber:Wc(t)}}function Jc(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(tr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Zc(){try{const e=window.localStorage?.getItem?.(aa);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch(e){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",e),null}}function el(e){try{if(!e){window.localStorage?.removeItem?.(aa);return}window.localStorage?.setItem?.(aa,JSON.stringify(e))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",t)}}function tl(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function nl(e){if(!e)return null;const t=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(s=>rr.has(s)),n={},a=e.fields||{};return Object.entries(ir).forEach(([s,r])=>{const i=a[s];if(i==null)return;const{ids:c,emptyExplicitly:l}=tl(i);if(!c&&!l)return;const d=Array.isArray(c)?c.filter(u=>r.has(u)):[];(d.length>0||l)&&(n[s]=d)}),{version:1,sections:t,fields:n}}function Er(e){const t=nl(e);t&&el(t)}function al(e){if(!e)return;const t=Zc();if(!t)return;const n=Array.isArray(t.sections)?t.sections.filter(a=>rr.has(a)):[];if(n.length&&(e.sections=new Set(n)),t.fields&&typeof t.fields=="object"){const a=mr(e.fields||Pa());Object.entries(t.fields).forEach(([s,r])=>{const i=ir[s];if(!i)return;const c=Array.isArray(r)?r.filter(l=>i.has(l)):[];a[s]=new Set(c)}),e.fields=a}}function sl(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function xr(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return 0}function rl(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return xr(e)}function il(e){const t=Vt()||[],{technicians:n=[]}=Z(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function ol(e,t,n){const{projectLinked:a}=Xe(e,n),s=Cs(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((N,A)=>N+(Number(A?.qty)||1)*(Number(A?.price)||0),0)*s,l=t.reduce((N,A)=>N+xr(A),0),d=t.reduce((N,A)=>N+rl(A),0),u=l*s,m=d*s,p=c+m,f=parseFloat(e.discount)||0,y=e.discountType==="amount"?f:p*(f/100),g=Math.max(0,p-y),h=a?!1:e.applyTax,E=Number(e.cost),v=Number.isFinite(E),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,$=I!=null?parseFloat(q(String(I).replace("%","").trim())):NaN,j=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(j!=null?j===!0||j===1||j==="1"||String(j).toLowerCase()==="true":Number.isFinite($)&&$>0)&&Number.isFinite($)?Number($):0;h&&w<=0&&(w=Me);let _=w>0?Math.max(0,g*(w/100)):0;_=Number(_.toFixed(2));const T=g+_;let R=h?T*.15:0;(!Number.isFinite(R)||R<0)&&(R=0),R=Number(R.toFixed(2));const x=T+R,D=Number.isFinite(x)?Number(x.toFixed(2)):0,O=a?D:v?E:D,M=Math.max(0,c+m-y),P=Math.max(0,M-u),B={equipmentTotal:c,crewTotal:m,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:T,taxAmount:R,finalTotal:O,companySharePercent:w,companyShareAmount:_,netProfit:P},z={equipmentTotal:q(c.toFixed(2)),crewTotal:q(m.toFixed(2)),discountAmount:q(y.toFixed(2)),subtotalAfterDiscount:q(g.toFixed(2)),taxableAmount:q(T.toFixed(2)),taxAmount:q(R.toFixed(2)),finalTotal:q(O.toFixed(2)),companySharePercent:q(w.toFixed(2)),companyShareAmount:q(_.toFixed(2)),netProfit:q(P.toFixed(2))};return{totals:B,totalsDisplay:z,rentalDays:s}}function Ir({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:i,currencyLabel:c,sections:l,fieldSelections:d={},quoteNumber:u,quoteDate:m,terms:p=we}){const f=q(String(e?.reservationId??e?.id??"")),y=e.start?q(Ue(e.start)):"-",g=e.end?q(Ue(e.end)):"-",h=t?.customerName||t?.full_name||t?.name||"-",E=t?.phone||"-",v=t?.email||"-",I=t?.company||t?.company_name||"-",$=q(E),j=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),b=n?.code||n?.projectCode||"",w=q(String(i)),_=e?.notes||"",T=Array.isArray(p)&&p.length?p:we,R=mr(d),x=(K,ce)=>pr(R,K,ce),D=K=>l?.has?.(K),O=`<div class="quote-placeholder">${C(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,M=(K,ce)=>`<div class="info-plain__item">${C(K)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${C(ce)}</strong></div>`,P=(K,ce,{variant:et="inline"}={})=>et==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${C(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${C(ce)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${C(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${C(ce)}</span>
    </span>`,B=(K,ce)=>`<div class="payment-row">
      <span class="payment-row__label">${C(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${C(ce)}</span>
    </div>`,z=[];x("customerInfo","customerName")&&z.push(M(o("reservations.details.labels.customer","العميل"),h)),x("customerInfo","customerCompany")&&z.push(M(o("reservations.details.labels.company","الشركة"),I)),x("customerInfo","customerPhone")&&z.push(M(o("reservations.details.labels.phone","الهاتف"),$)),x("customerInfo","customerEmail")&&z.push(M(o("reservations.details.labels.email","البريد"),v));const N=D("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${C(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:O}
      </section>`:"",A=[];x("reservationInfo","reservationId")&&A.push(M(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),x("reservationInfo","reservationStart")&&A.push(M(o("reservations.details.labels.start","بداية الحجز"),y)),x("reservationInfo","reservationEnd")&&A.push(M(o("reservations.details.labels.end","نهاية الحجز"),g)),x("reservationInfo","reservationDuration")&&A.push(M(o("reservations.details.labels.duration","عدد الأيام"),w));const H=D("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${C(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:O}
      </section>`:"",Q=[];x("projectInfo","projectTitle")&&Q.push(M(o("reservations.details.labels.project","المشروع"),j)),x("projectInfo","projectCode")&&Q.push(M(o("reservations.details.labels.code","الرمز"),b||"-"));const ee=D("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${C(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:O}
      </section>`:"",U=[];x("financialSummary","equipmentTotal")&&U.push(P(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${c}`)),x("financialSummary","crewTotal")&&U.push(P(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${c}`)),x("financialSummary","discountAmount")&&U.push(P(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${c}`)),x("financialSummary","taxAmount")&&U.push(P(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${c}`));const oe=x("financialSummary","finalTotal"),Y=[];oe&&Y.push(P(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${c}`,{variant:"final"}));const re=Y.length?`<div class="totals-final">${Y.join("")}</div>`:"",V=D("financialSummary")?!U.length&&!oe?`<section class="quote-section quote-section--financial">${O}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${C(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${U.length?`<div class="totals-inline">${U.join("")}</div>`:""}
            ${re}
          </div>
        </section>`:"",ne=ar.filter(K=>x("items",K.id)),Pe=ne.length>0,Ae=Pe?ne.map(K=>`<th>${C(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",fe=Array.isArray(e.items)&&e.items.length>0?e.items.map((K,ce)=>`<tr>${ne.map(et=>`<td>${et.render(K,ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ne.length,1)}" class="empty">${C(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,$e=D("items")?Pe?`<section class="quote-section quote-section--table">
            <h3>${C(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ae}</tr>
              </thead>
              <tbody>${fe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${C(o("reservations.details.items.title","المعدات"))}</h3>
            ${O}
          </section>`:"",le=sr.filter(K=>x("crew",K.id)),ye=le.length>0,W=ye?le.map(K=>`<th>${C(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",se=a.length?a.map((K,ce)=>`<tr>${le.map(et=>`<td>${et.render(K,ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(le.length,1)}" class="empty">${C(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,te=D("crew")?ye?`<section class="quote-section quote-section--table">
            <h3>${C(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W}</tr>
              </thead>
              <tbody>${se}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${C(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${O}
          </section>`:"",Je=D("notes")?`<section class="quote-section">
        <h3>${C(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${C(_||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",He=[];x("payment","beneficiary")&&He.push(B(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Be.beneficiaryName)),x("payment","bank")&&He.push(B(o("reservations.quote.labels.bank","اسم البنك"),Be.bankName)),x("payment","account")&&He.push(B(o("reservations.quote.labels.account","رقم الحساب"),q(Be.accountNumber))),x("payment","iban")&&He.push(B(o("reservations.quote.labels.iban","رقم الآيبان"),q(Be.iban)));const Nn=`<section class="quote-section">
      <div class="payment-block">
        <h3>${C(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${He.length?He.join(""):O}</div>
      </div>
      <p class="quote-approval-note">${C(Be.approvalNote)}</p>
    </section>`,Bn=`<footer class="quote-footer">
        <h4>${C(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${T.map(K=>`<li>${C(K)}</li>`).join("")}</ul>
      </footer>`,Ze=[];N&&H?Ze.push(qe(`<div class="quote-section-row">${N}${H}</div>`,{blockType:"group"})):(H&&Ze.push(qe(H)),N&&Ze.push(qe(N))),ee&&Ze.push(qe(ee));const $t=[];$e&&$t.push(qe($e,{blockType:"table",extraAttributes:'data-table-id="items"'})),te&&$t.push(qe(te,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ct=[];V&&Ct.push(qe(V,{blockType:"summary"})),Je&&Ct.push(qe(Je));const jn=[qe(Nn,{blockType:"payment"}),qe(Bn,{blockType:"footer"})],be=[...cs(Ze,"reservations.quote.placeholder.page1"),...$t,...cs(Ct,"reservations.quote.placeholder.page2"),...jn],Dn=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${C(Be.logoUrl)}" alt="${C(Be.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${C(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${C(Be.companyName)}</p>
        <p class="quote-company-cr">${C(o("reservations.quote.labels.cr","السجل التجاري"))}: ${C(Be.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${C(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${C(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${hc}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Dn}
          ${be.join("")}
        </div>
      </div>
    </div>
  `}function cl(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Ht(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>cl(c)),i=[s,...r].map(c=>c.catch(l=>(Re("asset load failed",l),_c(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Ar(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await wr(r),await Ht(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=b=>{b.style.margin="0 auto",b.style.breakInside="avoid",b.style.pageBreakInside="avoid",b.style.pageBreakAfter="auto",b.style.breakAfter="auto"},m=()=>{const b=a.createElement("div"),w=s.childElementCount===0;if(b.className="quote-page",b.dataset.pageIndex=String(s.childElementCount),w){b.classList.add("quote-page--primary");const T=i.cloneNode(!0);T.removeAttribute("data-quote-header-template"),b.appendChild(T)}else b.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",b.appendChild(_),s.appendChild(b),u(b),l=b,d=_},p=()=>{(!l||!d||!d.isConnected)&&m()},f=()=>{if(!l||!d||d.childElementCount>0)return;const b=l;l=null,d=null,b.parentNode&&b.parentNode.removeChild(b)},y=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>wc:!1,h=(b,{allowOverflow:w=!1}={})=>(p(),d.appendChild(b),g()&&!w?(d.removeChild(b),f(),!1):!0),E=b=>{const w=b.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!h(w)&&(y(),!h(w)&&h(w,{allowOverflow:!0}))},v=b=>{const w=b.querySelector("table");if(!w){E(b);return}const _=b.querySelector("h3"),T=w.querySelector("thead"),R=Array.from(w.querySelectorAll("tbody tr"));if(!R.length){E(b);return}let x=null,D=0;const O=(P=!1)=>{const B=b.cloneNode(!1);B.removeAttribute("data-quote-block"),B.removeAttribute("data-block-type"),B.removeAttribute("data-table-id"),B.classList.add("quote-section--table-fragment"),P&&B.classList.add("quote-section--table-fragment--continued");const z=_?_.cloneNode(!0):null;z&&B.appendChild(z);const N=w.cloneNode(!1);N.classList.add("quote-table--fragment"),T&&N.appendChild(T.cloneNode(!0));const A=a.createElement("tbody");return N.appendChild(A),B.appendChild(N),{section:B,body:A}},M=(P=!1)=>x||(x=O(P),h(x.section)||(y(),h(x.section)||h(x.section,{allowOverflow:!0})),x);R.forEach(P=>{M(D>0);const B=P.cloneNode(!0);if(x.body.appendChild(B),g()&&(x.body.removeChild(B),x.body.childElementCount||(d.removeChild(x.section),x=null,f()),y(),x=null,M(D>0),x.body.appendChild(B),g())){x.section.classList.add("quote-section--table-fragment--overflow"),D+=1;return}D+=1}),x=null};if(!c.length)return;c.forEach(b=>{b.getAttribute("data-block-type")==="table"?v(b):E(b)});const I=Array.from(s.children),$=[];if(I.forEach((b,w)=>{const _=b.querySelector(".quote-body");if(w!==0&&(!_||_.childElementCount===0)){b.remove();return}$.push(b)}),!n){const b=a.defaultView||window,w=Math.min(3,Math.max(1,b.devicePixelRatio||1)),_=kn()?Math.min(2,w):w;$.forEach(T=>Uc(T,{pixelRatio:_}))}$.forEach((b,w)=>{const _=w===0;b.style.pageBreakAfter="auto",b.style.breakAfter="auto",b.style.pageBreakBefore=_?"auto":"always",b.style.breakBefore=_?"auto":"page",n?b.style.boxShadow="":b.style.boxShadow="none"});const j=$[$.length-1]||null;l=j,d=j?.querySelector(".quote-body")||null,await Ht(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Da(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ll(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Kc(),Qc()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(b=>typeof b=="string"&&b.toLowerCase().startsWith("rtl")),m=typeof window<"u"&&window.devicePixelRatio||1,p=Ba(),f=gr(),y=kn();let g;y?g=1.5:f?g=Math.min(1.7,Math.max(1.2,m*1.1)):p?g=Math.min(1.8,Math.max(1.25,m*1.2)):g=Math.min(2,Math.max(1.6,m*1.4));const h=y||f?.9:p?.92:.95,E=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const $=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let b=0;b<s.length;b+=1){const w=s[b];await wr(w),await Ht(w);const _=w.ownerDocument||document,T=_.createElement("div");Object.assign(T.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const R=w.cloneNode(!0);R.style.width=`${sn}px`,R.style.maxWidth=`${sn}px`,R.style.minWidth=`${sn}px`,R.style.height=`${rn}px`,R.style.maxHeight=`${rn}px`,R.style.minHeight=`${rn}px`,R.style.position="relative",R.style.background="#ffffff",Da(R),T.appendChild(R),_.body.appendChild(T);let x;try{await Ht(R),x=await i(R,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(A){throw da(A,"pageCapture",{toastMessage:$}),A}finally{T.parentNode?.removeChild(T)}if(!x)continue;const D=x.width||1,M=(x.height||1)/D;let P=ia,B=P*M,z=0;if(B>an){const A=an/B;B=an,P=P*A,z=Math.max(0,(ia-P)/2)}const N=x.toDataURL("image/jpeg",h);I>0&&E.addPage(),E.addImage(N,"JPEG",z,0,P,B,`page-${I+1}`,"FAST"),I+=1,await new Promise(A=>window.requestAnimationFrame(A))}}catch(b){throw ua({safariWindowRef:n,mobileWindowRef:a}),b}if(I===0)throw ua({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(f||y){const b=E.output("blob");if(y){const w=URL.createObjectURL(b);Rt();try{window.location.assign(w)}catch(_){Re("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(b),_=()=>f&&n&&!n.closed?n:a&&!a.closed?a:null,T=(x,D)=>{if(Rt(),!x){window.location.assign(D);return}try{x.location.replace(D),x.focus?.()}catch(O){Re("direct blob navigation failed",O);try{x.document.open(),x.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${C(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${D}" title="PDF preview"></iframe></body></html>`),x.document.close()}catch(M){Re("iframe blob delivery failed",M),window.location.assign(D)}}},R=_();T(R,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{Rt();const b=E.output("bloburl"),w=document.createElement("a");w.href=b,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(b),w.remove()},2e3)}}function mt(){if(!L||!F)return;const{previewFrame:e}=F;if(!e)return;const t=Ir({reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms});rt("render"),e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{try{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(br(s),hr(s,a),vr(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await Ar(r,{context:"preview"}),Da(r))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),c=n?.querySelector(".quote-preview-pages"),l=sn;let d=18;if(c&&n?.defaultView){const p=n.defaultView.getComputedStyle(c),f=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(f)&&f>=0&&(d=f)}const u=rn,m=i.length?i.length*u+Math.max(0,(i.length-1)*d):u;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(m),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,F?.previewFrameWrapper&&!F?.userAdjustedZoom){const p=F.previewFrameWrapper.clientWidth-24;p>0&&p<l?Ce=Math.max(p/l,.3):Ce=1}$r(Ce)}finally{Rt()}},{once:!0})}function dl(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?L.sections.add(n):L.sections.delete(n),Er(L),_r(),mt())}function ul(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=L.fields||(L.fields=Pa()),r=$c(s,n);t.checked?r.add(a):r.delete(a),Er(L),mt()}function ml(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Na(L,n),L.sectionExpansions[n]=t.open)}function _r(){if(!F?.toggles||!L)return;const{toggles:e}=F,t=L.fields||{};Na(L);const n=Cn.map(({id:a,labelKey:s,fallback:r})=>{const i=o(s,r),c=L.sections.has(a),l=La[a]||[],d=Cc(L,a),u=l.length?`<div class="quote-toggle-sublist">
          ${l.map(m=>{const p=pr(t,a,m.id),f=c?"":"disabled",y=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${f}>
                <span>${C(y)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${c?"checked":""}>
            <span>${C(i)}</span>
          </label>
          ${l.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",dl)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",ul)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",ml)})}function pl(){if(F?.modal)return F;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${C(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${C(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${C(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${C(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${C(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${C(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${C(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const m=document.createElement("iframe");m.className="quote-preview-frame",m.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),m.setAttribute("loading","lazy"),m.setAttribute("frameborder","0");const p=document.createElement("div");p.className="quote-preview-zoom-controls",p.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${C(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${C(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${C(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const f=document.createElement("div");f.className="quote-preview-frame-wrapper",f.appendChild(m),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(f),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${C(or("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(p),i?.addEventListener("click",async()=>{if(L){i.disabled=!0;try{await Cr()}finally{i.disabled=!1}}});const h=()=>{oa()||ca(e)};d.forEach($=>{$?.addEventListener("click",h)}),l&&!d.includes(l)&&l.addEventListener("click",h),e.addEventListener("click",$=>{oa()||$.target===e&&ca(e)}),F={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:f,zoomControls:p,zoomValue:p.querySelector("[data-zoom-value]"),previewFrame:m,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const E=p.querySelector("[data-zoom-out]"),v=p.querySelector("[data-zoom-in]"),I=p.querySelector("[data-zoom-reset]");return E?.addEventListener("click",()=>ms(-.1)),v?.addEventListener("click",()=>ms(.1)),I?.addEventListener("click",()=>hn(1,{markManual:!0})),s&&s.addEventListener("input",gl),r&&r.addEventListener("click",yl),hn(Ce),F}function hn(e,{silent:t=!1,markManual:n=!1}={}){Ce=Math.min(Math.max(e,.25),2.2),n&&F&&(F.userAdjustedZoom=!0),$r(Ce),!t&&F?.zoomValue&&(F.zoomValue.textContent=`${Math.round(Ce*100)}%`)}function ms(e){hn(Ce+e,{markManual:!0})}function $r(e){if(!F?.previewFrame||!F.previewFrameWrapper)return;const t=F.previewFrame,n=F.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ba()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function fl(){if(!F?.meta||!L)return;const{meta:e}=F;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${C(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${C(L.quoteNumber)}</strong></div>
      <div><span>${C(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${C(L.quoteDateLabel)}</strong></div>
    </div>
  `}function Fa(){if(!F?.termsInput)return;const e=(L?.terms&&L.terms.length?L.terms:we).join(`
`);F.termsInput.value!==e&&(F.termsInput.value=e)}function gl(e){if(!L)return;const t=sa(e?.target?.value??"");if(t.length){L.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{L.terms=[...we],Fa();const n=we.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}mt()}function yl(e){if(e?.preventDefault?.(),!L)return;L.terms=[...we];const t=document.getElementById("reservation-terms");t&&(t.value=we.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=we.join(`
`)),Fa(),mt()}async function Cr(){if(!L)return;rt("export");const t=!Ba()&&gr(),n=kn(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${C(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${C(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${C(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Re("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Gc(),Un("html2pdf ensured");const l=Ir({reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),br(i),hr(i),vr(i),Un("export container prepared");const d=i.firstElementChild;if(d){d.setAttribute("dir","rtl"),d.style.direction="rtl",d.style.textAlign="right",d.setAttribute("data-theme","light"),d.classList.remove("dark","dark-mode"),d.style.margin="0",d.style.padding="0",d.style.width="210mm",d.style.maxWidth="210mm",d.style.marginLeft="auto",d.style.marginRight="auto",d.scrollTop=0,d.scrollLeft=0;try{await Ar(d,{context:"export"}),await Ht(d),Da(d),Un("layout complete for export document")}catch(m){da(m,"layoutQuoteDocument",{suppressToast:!0})}}const u=`quotation-${L.quoteNumber}.pdf`;await ll(d,{filename:u,safariWindowRef:s,mobileWindowRef:a}),L.sequenceCommitted||(Jc(L.quoteSequence),L.sequenceCommitted=!0)}catch(l){ua({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,da(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Rt()}}function bl(){const e=pl();e?.modal&&(Ft=!1,Ce=1,F&&(F.userAdjustedZoom=!1),hn(Ce,{silent:!0}),_r(),fl(),Fa(),mt(),Ac(e.modal))}async function hl({reservation:e,customer:t,project:n}){if(!e){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=il(e),{totalsDisplay:s,totals:r,rentalDays:i}=ol(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Yc(),u=new Date,m=fc();L={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,sections:new Set(Cn.filter(p=>p.defaultSelected).map(p=>p.id)),sectionExpansions:fr(),fields:Pa(),terms:m,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:sl(u),sequenceCommitted:!1},al(L),bl()}function vl({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Vt(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=Z(),d=Array.isArray(s)?s:c||[],u=new Map((l||[]).map(h=>[String(h.id),h])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||rc(),f=new Map(i.map(h=>[String(h.id),h])),y=new Map(d.map(h=>[String(h.id),h])),g=lc({reservations:r,filters:p,customersMap:f,techniciansMap:y,projectsMap:u});if(g.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${dc({entries:g,customersMap:f,techniciansMap:y,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(h=>{const E=Number(h.dataset.reservationIndex);Number.isNaN(E)||h.addEventListener("click",()=>{typeof n=="function"&&n(E)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(h=>{const E=Number(h.dataset.reservationIndex);Number.isNaN(E)||h.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(E,v)})})}function ql(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=Z(),c=s[e];if(!c)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(E=>String(E.id)===String(c.customerId)),d=c.projectId?i.find(E=>String(E.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const E=Vt()||[];u.innerHTML=uc(c,l,E,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},f=document.getElementById("reservation-details-edit-btn");f&&(f.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const g=u?.querySelector('[data-action="open-project"]');g&&d&&g.addEventListener("click",()=>{p();const E=d?.id!=null?String(d.id):"",v=E?`projects.html?project=${encodeURIComponent(E)}`:"projects.html";window.location.href=v});const h=document.getElementById("reservation-details-export-btn");return h&&(h.onclick=async E=>{E?.preventDefault?.(),E?.stopPropagation?.(),h.blur();try{await hl({reservation:c,customer:l,project:d})}catch(v){console.error("❌ [reservations] export to PDF failed",v),S(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function kr(){const e=()=>{Qt(),pe(),Vt()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let ps=!1,fs=null;function Sl(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Xl(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Sl(n);if(!a&&ps&&st().length>0&&s===fs)return st();try{const r=await ks(n||{});return ps=!0,fs=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return st()}}async function wl(e,{onAfterChange:t}={}){if(!lt())return zt(),!1;const a=st()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Yi(s),kr(),t?.({type:"deleted",reservation:a}),S(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=qn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return S(i,"error"),!1}}async function El(e,{onAfterChange:t}={}){const a=st()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Xe(a);if(r)return S(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ji(s);return kr(),t?.({type:"confirmed",reservation:i}),S(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=qn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return S(c,"error"),!1}}function Wt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Mt(e,n),end:Mt(t,a)}}function pt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,ys(t);return}const l=ut(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=dt(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=q(String(d.count)),y=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,g=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):y*d.count,h=`${q(y.toFixed(2))} ${a}`,E=`${q(g.toFixed(2))} ${a}`,v=d.barcodes.map($=>q(String($||""))).filter(Boolean),I=v.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${v.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${I}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}">−</button>
              <span class="reservation-qty-value">${f}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}">+</button>
            </div>
          </td>
          <td>${h}</td>
          <td>${E}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),ys(t)}function xl(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Tn(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ln();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,gs();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${q(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${q(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?q(Ue(s.recordedAt)):"—",d=xl(s?.type),u=s?.note?q(s.note):"";return`
      <tr>
        <td>${d}</td>
        <td>${i}</td>
        <td>${c}</td>
        <td>${l}</td>
        <td>${u}</td>
        <td class="reservation-payment-history__actions">
          <button type="button" class="btn btn-link btn-sm reservation-payment-history__remove" data-action="remove-payment" data-index="${r}" aria-label="${o("reservations.paymentHistory.actions.delete","حذف الدفعة")}">🗑️</button>
        </td>
      </tr>
    `}).join("");e.innerHTML=`
    <div class="reservation-payment-history__table-wrapper">
      <table class="table table-sm reservation-payment-history__table">
        <thead>
          <tr>
            <th>${o("reservations.paymentHistory.headers.method","نوع الدفعة")}</th>
            <th>${o("reservations.paymentHistory.headers.amount","المبلغ")}</th>
            <th>${o("reservations.paymentHistory.headers.percent","النسبة")}</th>
            <th>${o("reservations.paymentHistory.headers.date","التاريخ")}</th>
            <th>${o("reservations.paymentHistory.headers.note","ملاحظات")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${a}</tbody>
      </table>
    </div>
  `,gs()}function Il(){const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Pr(e);let a=Nr(t);if(!Number.isFinite(a)||a<=0){S(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Kn.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const p=Math.max(0,100-i);if(p<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const y=q(f.toFixed(2));S(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=f}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const p=Math.max(0,r-c);if(p<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const y=`${q(f.toFixed(2))} ${l}`;S(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=f}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const m={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Pl(m),Ra(Ln()),Tn(),Ie(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),S(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function gs(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",Il),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;const s=Number(a.dataset.index);Number.isNaN(s)||(Nl(s),Ra(Ln()),Tn(),Ie(),S(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Al(e){const{index:t,items:n}=ft(),s=ut(n).find(c=>c.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);gt(t,i),pt(i),Ie()}function _l(e){const{index:t,items:n}=ft(),a=n.filter(s=>Kt(s)!==e);a.length!==n.length&&(gt(t,a),pt(a),Ie())}function $l(e){const{index:t,items:n}=ft(),s=ut(n).find(h=>h.key===e);if(!s)return;const{start:r,end:i}=Wt();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=Z(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(h=>J(h.barcode))),{equipment:m=[]}=Z(),p=(m||[]).find(h=>{const E=J(h?.barcode);return!E||u.has(E)||Kt({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!Fs(h)?!1:!Ge(E,r,i,d)});if(!p){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=J(p.barcode),y=It(p);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:f,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:dt(p)}];gt(t,g),pt(g),Ie()}function ys(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Al(s);return}if(a==="increase-edit-group"&&s){$l(s);return}if(a==="remove-edit-group"&&s){_l(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Cl(i)}}),e.dataset.groupListenerAttached="true")}function Ie(){const e=document.getElementById("edit-res-summary");if(!e)return;Tn();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Se(a),Ie()}),a.dataset.listenerAttached="true");const s=q(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=!!document.getElementById("edit-res-project")?.value,l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=a?.dataset?.userSelected==="true",m=u&&a?.value||"unpaid";d&&xe("edit-res-company-share");let p=qt("edit-res-company-share");d&&(!Number.isFinite(p)||p<=0)&&(xe("edit-res-company-share"),p=qt("edit-res-company-share"));const{items:f=[],payments:y=[]}=ft(),{start:g,end:h}=Wt(),E=Kn({items:f,discount:r,discountType:i,applyTax:d,paidStatus:m,start:g,end:h,companySharePercent:p,paymentHistory:y});e.innerHTML=E;const v=Kn.lastResult;if(v&&a){const I=v.paymentStatus;u?Se(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,Se(a,I))}else a&&Se(a,a.value)}function Cl(e){if(e==null)return;const{index:t,items:n}=ft();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);gt(t,a),pt(a),Ie()}function kl(e){const t=e?.value??"",n=J(t);if(!n)return;const a=$n(n);if(!a){S(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=We(a);if(s==="maintenance"||s==="retired"){S(At(s));return}const r=J(n),{index:i,items:c=[]}=ft();if(c.findIndex(h=>J(h.barcode)===r)>-1){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Wt();if(!d||!u){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Z(),p=i!=null&&m[i]||null,f=p?.id??p?.reservationId??null;if(Ge(r,d,u,f)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=It(a);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];gt(i,g),e&&(e.value=""),pt(g),Ie()}function vn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Xs(t),a=J(n?.barcode||t);if(!n||!a){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=We(n);if(s==="maintenance"||s==="retired"){S(At(s));return}const{start:r,end:i}=Wt();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=ft();if(l.some(g=>J(g.barcode)===a)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Z(),m=c!=null&&u[c]||null,p=m?.id??m?.reservationId??null;if(Ge(a,r,i,p)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=It(n);if(!f){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...l,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];gt(c,y),pt(y),Ie(),e.value=""}function Tr(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),vn(e))});const t=()=>{Ys(e.value,"edit-res-equipment-description-options")&&vn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Ie()});typeof window<"u"&&(window.getEditReservationDateRange=Wt,window.renderEditPaymentHistory=Tn);function Tl(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){na(e);return}vn(e)}}function Yl(){_t(),Tr()}function Ll(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Ot=null,je=[],ke=[],ma=null,de={},Qn=!1;function pa(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function fa(){return document.getElementById("edit-res-confirmed")?.value==="true"}function ft(){return{index:Ot,items:je,payments:ke}}function gt(e,t,n=ke){Ot=typeof e=="number"?e:null,je=Array.isArray(t)?[...t]:[],ke=Array.isArray(n)?[...n]:[]}function Lr(){Ot=null,je=[],no(),ke=[]}function Ln(){return[...ke]}function Ra(e){ke=Array.isArray(e)?[...e]:[]}function Pl(e){e&&(ke=[...ke,e])}function Nl(e){!Number.isInteger(e)||e<0||(ke=ke.filter((t,n)=>n!==e))}function Bl(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Pr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Nr(e){if(!e)return null;const t=q(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function jl(e,t){if(e){e.value="";return}}function Nt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Br(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(q(String(e.value??""))),a=Number.parseFloat(q(String(e.amount??""))),s=Number.parseFloat(q(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Dl(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Nt(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Nt(l.id)}">${Nt(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Nt(r)}">${Nt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function jr(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}ga("tax")}function ga(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=de?.updateEditReservationSummary;typeof r=="function"&&r()};if(Qn){a();return}Qn=!0;const s=()=>{Qn=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Me)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),xe("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xe("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function bs(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=Z(),u=st()?.[e];if(!u){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}de={...de,reservation:u,projects:l||[]},t?.(),Dl(l||[],u);const m=u.projectId&&l?.find?.(N=>String(N.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:f}=Xe(u,m),y=u.items?u.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:J(N?.barcode)})):[],h=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(N=>Br(N)).filter(Boolean);gt(e,y,h);const E=o("reservations.list.unknownCustomer","غير معروف"),v=c?.find?.(N=>String(N.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const I=document.getElementById("edit-res-id");I&&(I.value=u.reservationId||u.id);const $=document.getElementById("edit-res-customer");$&&($.value=v?.customerName||E);const j=typeof a=="function"?a(u.start):{date:"",time:""},b=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",j.date),n?.("edit-res-start-time",j.time),n?.("edit-res-end",b.date),n?.("edit-res-end-time",b.time);const w=document.getElementById("edit-res-notes");w&&(w.value=u.notes||"");const _=document.getElementById("edit-res-discount");_&&(_.value=q(u.discount??0));const T=document.getElementById("edit-res-discount-type");T&&(T.value=u.discountType||"percent");const R=u.projectId?!1:!!u.applyTax,x=document.getElementById("edit-res-tax");x&&(x.checked=R);const D=document.getElementById("edit-res-company-share");if(D){const N=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,A=N!=null?Number.parseFloat(q(String(N).replace("%","").trim())):NaN,H=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,Q=H!=null?H===!0||H===1||H==="1"||String(H).toLowerCase()==="true":Number.isFinite(A)&&A>0,ee=Q&&Number.isFinite(A)&&A>0?A:Me,U=R||Q;D.checked=U,D.dataset.companyShare=String(ee)}pa(p,{disable:f});const O=document.getElementById("edit-res-paid"),M=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");O&&(O.value=M,O.dataset&&delete O.dataset.userSelected);const P=document.getElementById("edit-res-payment-progress-type"),B=document.getElementById("edit-res-payment-progress-value");if(P?.dataset?.userSelected&&delete P.dataset.userSelected,P&&(P.value="percent"),jl(B),Zi((u.technicians||[]).map(N=>String(N))),s?.(y),typeof window<"u"){const N=window?.renderEditPaymentHistory;typeof N=="function"&&N()}jr(),r?.();const z=document.getElementById("editReservationModal");ma=Bl(z,i),ma?.show?.()}async function Fl({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(Ot===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=q(document.getElementById("edit-res-discount")?.value||"0"),f=parseFloat(p)||0,y=document.getElementById("edit-res-discount-type")?.value||"percent",g=fa(),h=document.getElementById("edit-res-paid"),E=h?.dataset?.userSelected==="true",v=E&&h?.value||"unpaid",I=document.getElementById("edit-res-payment-progress-type"),$=document.getElementById("edit-res-payment-progress-value"),j=Pr(I),b=Nr($),w=document.getElementById("edit-res-project")?.value||"",_=eo(),T=document.getElementById("edit-res-company-share"),R=document.getElementById("edit-res-tax");if(!c||!d){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const x=typeof e=="function"?e:(W,se)=>`${W}T${se||"00:00"}`,D=x(c,l),O=x(d,u);if(D&&O&&new Date(D)>new Date(O)){S(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=st()?.[Ot];if(!P){S(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(je)||je.length===0&&_.length===0){S(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const B=typeof t=="function"?t:()=>!1,z=P.id??P.reservationId;for(const W of je){const se=We(W.barcode);if(se==="reserved"){const te=J(W.barcode);if(!B(te,D,O,z))continue}if(se!=="available"){S(At(se));return}}for(const W of je){const se=J(W.barcode);if(B(se,D,O,z)){S(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const N=typeof n=="function"?n:()=>!1;for(const W of _)if(N(W,D,O,z)){S(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const A=Array.isArray(de.projects)&&de.projects.length?de.projects:Z().projects||[],H=w&&A.find(W=>String(W.id)===String(w))||null,Q={...P,projectId:w?String(w):null,confirmed:g},{effectiveConfirmed:ee,projectLinked:U,projectStatus:oe}=Xe(Q,H);let Y=!!T?.checked,re=!!R?.checked;if(U&&(Y&&(T.checked=!1,Y=!1),re=!1),!U&&Y!==re){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(xe("edit-res-company-share"),Y=!!T?.checked);let V=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(V)||V<=0)&&(xe("edit-res-company-share"),V=getCompanySharePercent("edit-res-company-share"));const ne=Y&&re&&Number.isFinite(V)&&V>0,Pe=U?!1:re,Ae=ws(je,f,y,Pe,_,{start:D,end:O,companySharePercent:ne?V:0});let _e=Ln();if(Number.isFinite(b)&&b>0){const W=Ae;let se=null,te=null;j==="amount"?(se=b,W>0&&(te=b/W*100)):(te=b,W>0&&(se=b/100*W));const Je=Br({type:j,value:b,amount:se,percentage:te,recordedAt:new Date().toISOString()});Je&&(_e=[..._e,Je],Ra(_e)),$&&($.value="")}const fe=Es({totalAmount:Ae,history:_e}),$e=xs({manualStatus:v,paidAmount:fe.paidAmount,paidPercent:fe.paidPercent,totalAmount:Ae});h&&!E&&(h.value=$e,h.dataset&&delete h.dataset.userSelected);let le=P.status??"pending";U?le=H?.status??oe??le:["completed","cancelled"].includes(String(le).toLowerCase())||(le=g?"confirmed":"pending");const ye=Is({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:D,end:O,status:le,title:P.title??null,location:P.location??null,notes:m,projectId:w?String(w):null,totalAmount:Ae,discount:f,discountType:y,applyTax:Pe,paidStatus:$e,confirmed:ee,items:je.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:_,companySharePercent:ne?V:null,companyShareEnabled:ne,paidAmount:fe.paidAmount,paidPercentage:fe.paidPercent,paymentProgressType:fe.paymentProgressType,paymentProgressValue:fe.paymentProgressValue,paymentHistory:_e});try{const W=await to(P.id||P.reservationId,ye);await ks(),Qt(),pe(),S(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Lr(),i?.({type:"updated",reservation:W}),s?.(),r?.(),ma?.hide?.()}catch(W){console.error("❌ [reservationsEdit] Failed to update reservation",W);const se=qn(W)?W.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(se,"error")}}function Jl(e={}){de={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=de,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=q(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ga("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{ga("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=q(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const m=document.getElementById("edit-res-project");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{jr();const h=Array.isArray(de.projects)&&de.projects.length?de.projects:Z().projects||[],E=m.value&&h.find(b=>String(b.id)===String(m.value))||null,I={...de?.reservation??{},projectId:m.value||null,confirmed:fa()},{effectiveConfirmed:$,projectLinked:j}=Xe(I,E);pa($,{disable:j}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-confirmed-btn");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{if(p.disabled)return;const h=!fa();pa(h),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("save-reservation-changes");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{Fl(de).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),f.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let h=null;const E=()=>{y.value?.trim()&&(clearTimeout(h),h=null,n?.(y))};y.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),E())});const v=()=>{if(clearTimeout(h),!y.value?.trim())return;const{start:I,end:$}=getEditReservationDateRange();!I||!$||(h=setTimeout(()=>{E()},150))};y.addEventListener("input",v),y.addEventListener("change",E),y.dataset.listenerAttached="true"}Tr?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Lr(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Rl=Z()||{};let Ee=(Rl.projects||[]).map(Ol),Xt=!1;function Zl(){return Ee}function Pn(e){Ee=Array.isArray(e)?e.map(Ha):[],ba({projects:Ee});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Ee}async function Ml(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await Te(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ma);return Pn(i),Xt=!0,Ee}async function Hl({force:e=!1,params:t=null}={}){if(!e&&Xt&&Ee.length>0)return Ee;try{return await Ml(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Ee}}async function ed(e){const t=await Te("/projects/",{method:"POST",body:e}),n=Ma(t?.data??{}),a=[...Ee,n];return Pn(a),Xt=!0,n}async function td(e,t){const n=await Te(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ma(n?.data??{}),s=Ee.map(r=>String(r.id)===String(e)?a:r);return Pn(s),Xt=!0,a}async function nd(e){await Te(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Ee.filter(n=>String(n.id)!==String(e));Pn(t),Xt=!0}function ad({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:m=[],taxAmount:p=0,totalWithTax:f=0,confirmed:y=!1,technicians:g=[],equipment:h=[]}={}){const E=Array.isArray(g)?g.map(b=>Number.parseInt(String(b),10)).filter(b=>Number.isInteger(b)&&b>0):[],v=Array.isArray(h)?h.map(b=>{const w=Number.parseInt(String(b.equipmentId??b.equipment_id??b.id??0),10),_=Number.parseInt(String(b.qty??b.quantity??0),10);return!Number.isInteger(w)||w<=0?null:{equipment_id:w,quantity:Number.isInteger(_)&&_>0?_:1}}).filter(Boolean):[],I=Array.isArray(m)?m.map(b=>{const w=Number.parseFloat(b?.amount??b?.value??0)||0,_=(b?.label??b?.name??"").trim();return _?{label:_,amount:Math.round(w*100)/100}:null}).filter(Boolean):[],$=I.reduce((b,w)=>b+(w?.amount??0),0),j={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round($*100)/100,tax_amount:Math.round((Number.parseFloat(p)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(f)||0)*100)/100,confirmed:!!y,technicians:E,equipment:v,expenses:I};return e&&(j.project_code=String(e).trim()),j.end_datetime||delete j.end_datetime,j.client_company||(j.client_company=null),j}function Ma(e={}){return Ha(e)}function Ol(e={}){return Ha(e)}function Ha(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(l=>{if(l==null)return null;if(typeof l=="object"){const d=l.id??l.technician_id??l.technicianId;return d!=null?String(d):null}return String(l)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(l=>{const d=l?.equipment_id??l?.equipmentId??l?.id??null,u=l?.quantity??l?.qty??0,m=l?.barcode??l?.code??"",p=l?.description??l?.name??"";return{equipmentId:d!=null?String(d):null,qty:Number.parseInt(String(u),10)||0,barcode:m,description:p}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((l,d)=>({id:l?.id??`expense-${t??"x"}-${d}`,label:l?.label??"",amount:Number.parseFloat(l?.amount??0)||0}));return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(l=>typeof l=="object"?l:{id:l}),equipment:r,expenses:c}}function sd(e){return e instanceof hs}function rd(){return Hl().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Z()||{};ao(e||[]),Zs()})}function Oa(e=null){Zs(),Dr(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function zl(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ya(){return{populateEquipmentDescriptionLists:_t,setFlatpickrValue:Ll,splitDateTime:qs,renderEditItems:pt,updateEditReservationSummary:Ie,addEquipmentByDescription:Tl,addEquipmentToEditingReservation:kl,addEquipmentToEditingByDescription:vn,combineDateTime:Mt,hasEquipmentConflict:Ge,hasTechnicianConflict:Ss,renderReservations:Dr,handleReservationsMutation:Oa,ensureModal:zl}}function Dr(e="reservations-list",t=null){vl({containerId:e,filters:t,onShowDetails:Fr,onConfirmReservation:Mr})}function Fr(e){return ql(e,{getEditContext:ya,onEdit:(t,{reservation:n})=>{Hr(t,n)},onDelete:Rr})}function Rr(e){return lt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?wl(e,{onAfterChange:Oa}):!1:(zt(),!1)}function Mr(e){return El(e,{onAfterChange:Oa})}function Hr(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}bs(e,ya());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}bs(e,ya());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ui({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function id(){typeof window>"u"||(window.showReservationDetails=Fr,window.deleteReservation=Rr,window.confirmReservation=Mr,window.editReservation=Hr)}export{Oa as A,Zl as B,nd as C,Ml as D,sd as E,ed as F,_n as a,uc as b,pe as c,Dr as d,Xl as e,Ql as f,er as g,ad as h,Ia as i,td as j,Hl as k,rd as l,Ma as m,ie as n,id as o,Gl as p,Wl as q,Xe as r,Fr as s,Jl as t,Kl as u,Yl as v,Zs as w,Ie as x,ya as y,X as z};
