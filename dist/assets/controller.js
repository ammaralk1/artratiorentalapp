import{d as Z,n as q,f as Ui,t as o,b as Te,h as S,j as ut,o as Kt,s as Sa,A as Ss,z as Qi,k as Qe,B as Es,u as Ki}from"./auth.js";import{n as J,D as He,l as Ea,o as Za,p as zt,q as ws,t as Gi,v as We,w as Xe,x as wa,y as Wi,z as Xi,A as xs,h as Is,B as As,C as _s,E as $s,F as Yi,s as Gt,i as xn,G as ks,H as Ji,I as Ls,J as Cs,f as Ts,a as Ps,g as it,K as Zi,L as eo,M as Yn,N as to,O as no,u as ao,P as so,k as ro}from"./reservationsService.js";const Un="select.form-select:not([data-no-enhance]):not([multiple])",Pe=new WeakMap;let Qn=null,es=!1,Fe=null;function Xl(e=document){e&&(e.querySelectorAll(Un).forEach(t=>rn(t)),!Qn&&e===document&&(Qn=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Un)&&rn(a),a.querySelectorAll?.(Un).forEach(s=>rn(s)))})}),Qn.observe(document.body,{childList:!0,subtree:!0})),es||(es=!0,document.addEventListener("pointerdown",co,{capture:!0})))}function sn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){rn(e);return}const t=e.closest(".enhanced-select");t&&(xa(t),un(t),Jn(t))}function rn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){sn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Pe.set(t,r),a.addEventListener("click",()=>oo(t)),a.addEventListener("keydown",i=>lo(i,t)),s.addEventListener("click",i=>mo(i,t)),s.addEventListener("keydown",i=>uo(i,t)),e.addEventListener("change",()=>{un(t),Ns(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&Jn(t),c&&io(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),xa(t),un(t),Jn(t)}function io(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,xa(t),un(t)})))}function xa(e){const t=Pe.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Ns(e)}function un(e){const t=Pe.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Ns(e){const t=Pe.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Jn(e){const t=Pe.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function oo(e){Pe.get(e)&&(e.getAttribute("data-open")==="true"?It(e):Bs(e))}function Bs(e){const t=Pe.get(e);if(!t)return;Fe&&Fe!==e&&It(Fe,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),Fe=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function It(e,{focusTrigger:t=!0}={}){const n=Pe.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),Fe===e&&(Fe=null))}function co(e){if(!Fe)return;const t=e.target;t instanceof Node&&(Fe.contains(t)||It(Fe,{focusTrigger:!1}))}function lo(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Bs(t)):n==="Escape"&&It(t)}function uo(e,t){const n=e.key,a=Pe.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Ds(i,t)}else n==="Escape"&&(e.preventDefault(),It(t))}function mo(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Ds(n,t)}function Ds(e,t){const n=Pe.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),It(t)}const po=Z()||{};let Ve=(po.equipment||[]).map(go),Zn=!1,Rt="",rt=null,ct=null,lt=null,In=!1;function fo(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function yo(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function go(e={}){return Ia({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function An(e={}){return Ia(e)}function Ia(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Wt(e.quantity??e.qty??0),i=_n(e.unit_price??e.price??0),c=q(String(e.barcode??"").trim()),l=me(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:bo(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function bo(e){return e!=null&&e!==""}function Wt(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function _n(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function vo(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=q(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function ts(e){if(!e)return"";const t=q(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=q(String(n?.barcode??"")).trim();if(a)return a}return""}function ho(e,t){const n=ts(e),a=ts(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=mn(e?.desc||e?.description||e?.name||""),l=mn(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function ue(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function me(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function qo(e){return me(e)}function ge(){return Ve}function dt(e){Ve=Array.isArray(e)?e.map(Ia):[],Sa({equipment:Ve}),yo()}function mn(e){return String(e??"").trim().toLowerCase()}function Ke(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=mn(t);return n||(n=mn(e.category||"")),n||(n=q(String(e.barcode||"")).trim().toLowerCase()),n}function $n(e){const t=Ke(e);return t?ge().filter(n=>Ke(n)===t):[]}function kn(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ln(e);if(n){const a=ue(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${ue(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Aa(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function pn(){const e=Aa();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function _a(e={}){const t=Aa();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?q(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?q(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Et(e){In=e;const t=Aa(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Yl(e){if(!ut()){Kt();return}if(!e)return;try{await Eo()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",m=d["القسم الثانوي"]??d.subcategory??"",p=d.الوصف??d.description??d.name??"",f=d.الكمية??d.quantity??0,g=d.السعر??d.price??0,y=d.الباركود??d.barcode??"",v=d.الحالة??d.status??"متاح",w=d.الصورة??d.image_url??d.image??"",h=q(String(y||"")).trim();if(!p||!h){l+=1;return}c.push($a({category:u,subcategory:m,description:p,quantity:f,unit_price:g,barcode:h,status:v,image_url:w}))}),!c.length){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await Te("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(An):[];if(u.length){const f=[...ge(),...u];dt(f)}await Cn({showToastOnError:!1}),pe();const m=d?.meta?.count??u.length,p=[];m&&p.push(`${m} ✔️`),l&&p.push(`${l} ⚠️`),S(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(p.length?` (${p.join(" / ")})`:""))}catch(d){const u=At(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");S(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const So="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let Pt=null;function Eo(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):Pt||(Pt=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=So,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),Pt=null,e}),Pt)}function $a({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=q(String(r||"")).trim(),d=qo(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Wt(a),unit_price:_n(s),barcode:l,status:d,image_url:c?.trim()||null}}async function wo(){if(!ut()){Kt();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await Te("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Cn({showToastOnError:!1}),S(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=At(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");S(t,"error")}}function Ln(e){return e.image||e.imageUrl||e.img||""}function xo(e){const t=me(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function fn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${ue(a)}</td></tr>`}n&&(n.textContent="0")}function js(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=rt?.groupKey||Ke(e);if(!r){fn();return}const i=ge().filter(m=>Ke(m)===r).sort((m,p)=>{const f=String(m.barcode||"").trim(),g=String(p.barcode||"").trim();return!f&&!g?0:f?g?f.localeCompare(g,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){fn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=ge(),u=i.map(m=>{const p=m.id&&e.id?String(m.id)===String(e.id):String(m.barcode||"")===String(e.barcode||""),f=p?"equipment-variants-table__row--current":"",g=ue(String(m.barcode||"-")),y=p?`<span class="equipment-variants-current-badge">${ue(c)}</span>`:"",v=q(String(Number.isFinite(Number(m.qty))?Number(m.qty):0)),w=d.indexOf(m),h=ue(o("equipment.item.actions.delete","🗑️ حذف")),I=w>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${w}">${h}</button>
          </div>`:"";return`
        <tr class="${f}">
          <td>
            ${g}
            ${y}
          </td>
          <td>${xo(m.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${ue(l)}">${v}</span>
          </td>
          <td class="table-actions-cell">${I}</td>
        </tr>
      `}).join("");n.innerHTML=u}function Io({item:e,index:t}){const n=Ln(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=ut(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),m=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),p=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,f=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,g=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-p-f,0),y=g.toLocaleString("en-US"),v=o("equipment.card.labels.availableOfTotal","من أصل"),w=me(e.status);let h=`${ue(c.available)}: ${ue(y)} ${ue(v)} ${ue(u)}`,I="available";if(g===0){const N={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},A=N[w]||N.default;h=ue(A.text),I=A.modifier}const $=`<span class="equipment-card__availability equipment-card__availability--${I}">${h}</span>`,D="",b=e.desc||e.name||"—",E=e.name&&e.name!==e.desc?e.name:"",C=`
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
          `).join("")}</div>`:"",j=E?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${E}</span>
      </div>`:"",M=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${b}</h3>
    </div>
  `}
      ${C}
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
        ${D}
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
        ${j}
      </div>
      ${B}
    </article>
  `}function Ao(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),sn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),sn(s)}const r=document.getElementById("filter-status");r&&sn(r)}function Xt(){const e=Z();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return Ve=t||[],Ve;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>q(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=me(l.status),u=q(String(l.barcode??"")).trim().toLowerCase(),m=u&&i.has(u);let p=m?"maintenance":"available";if(!m&&u)for(const f of n||[]){if(!_o(f,s))continue;if(f.items?.some(y=>q(String(y?.barcode??"")).trim().toLowerCase()===u)){p="reserved";break}}return p!==d?(r=!0,{...l,status:p}):{...l,status:p}});return r?dt(c):(Ve=c,Sa({equipment:Ve})),Ve}function _o(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Kn(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function pe(){const e=document.getElementById("equipment-list");if(!e)return;const t=Xt(),n=Array.isArray(t)?t:ge(),a=new Map;n.forEach(y=>{if(!y)return;const v=Ke(y);v&&(a.has(v)||a.set(v,[]),a.get(v).push(y))});const s=Array.from(a.values()).map(y=>{const v=y[0],w=y.reduce((E,_)=>E+(Number.isFinite(Number(_.qty))?Number(_.qty):0),0),h=["maintenance","reserved","available","retired"],I=y.map(E=>me(E.status)).sort((E,_)=>h.indexOf(E)-h.indexOf(_))[0]||"available",$=y.reduce((E,_)=>{const C=Wt(_?.qty??0)||0,R=me(_?.status);return R==="reserved"?E.reserved+=C:R==="maintenance"&&(E.maintenance+=C),E},{reserved:0,maintenance:0}),D=Math.max(w-$.reserved-$.maintenance,0);return{item:{...v,qty:w,status:I,variants:y,groupKey:Ke(v),reservedQty:$.reserved,maintenanceQty:$.maintenance,availableQty:D},index:n.indexOf(v)}});s.sort((y,v)=>ho(y.item,v.item));const r=document.getElementById("search-equipment")?.value||"",i=q(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?me(d):"";if(Zn&&!n.length){e.innerHTML=Kn(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(Rt&&!n.length){e.innerHTML=Kn(Rt,{tone:"error",icon:"⚠️"});return}const m=s.filter(({item:y})=>{const v=q(String(y.barcode??"")).toLowerCase().trim(),w=Array.isArray(y.variants)?y.variants.map(b=>q(String(b.barcode??"")).toLowerCase().trim()).filter(Boolean):[],h=!i||y.name&&y.name.toLowerCase().includes(i)||y.desc&&y.desc.toLowerCase().includes(i)||v&&v.includes(i)||w.some(b=>b.includes(i))||y.category&&y.category.toLowerCase().includes(i)||y.sub&&y.sub.toLowerCase().includes(i),I=!c||y.category===c,$=!l||y.sub===l,D=!u||me(y.status)===u;return h&&I&&$&&D}),p=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),f=m;e.innerHTML=f.length?f.map(Io).join(""):Kn(p);const g=document.getElementById("equipment-list-count");if(g){const y=o("equipment.list.countSuffix","عنصر"),v=q(String(f.length)),w=f.length?`${v} ${y}`:`0 ${y}`;g.textContent=w}Ao(n)}async function Cn({showToastOnError:e=!0}={}){Zn=!0,Rt="",pe();try{const t=await Te("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(An):[];dt(n)}catch(t){Rt=At(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&S(Rt,"error")}finally{Zn=!1,pe()}}function At(e,t,n){if(e instanceof Ss){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function $o(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=q(a).trim(),r=_n(t.querySelector("#new-equipment-price")?.value||"0"),i=Wt(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){S(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const m=$a({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const p=await Te("/equipment/",{method:"POST",body:m}),f=An(p?.data),g=[...ge(),f];dt(g),pe(),t.reset();const y=t.querySelector("#new-equipment-status");y&&(y.value="متاح"),S(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(p){const f=At(p,"equipment.toast.addFailed","تعذر إضافة المعدة");S(f,"error")}}async function Fs(e){if(!ut()){Kt();return}const t=ge(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await Te(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),dt(a),pe(),S(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=At(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");S(s,"error")}}async function ko(e,t){const n=ge(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},dt(r),pe();return}const s=$a({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await Te(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=An(r?.data),c=[...n];c[e]=i,dt(c),pe(),S(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=At(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw S(i,"error"),r}}function tn(){pe()}function Rs(e){const n=ge()[e];if(!n)return;ct=e;const a=$n(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>me(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||me(s.status);document.getElementById("edit-equipment-index").value=e,_a({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ln(s)||"",barcode:s.barcode||"",status:s.status||c}),Et(!1),lt=pn(),kn(s),js(s),rt={groupKey:Ke(s),barcode:String(s.barcode||""),id:s.id||null},fo(document.getElementById("editEquipmentModal"))?.show()}function Lo(e){const t=e.target.closest('[data-equipment-action="delete"]');if(t){e.preventDefault(),e.stopPropagation();const a=Number(t.dataset.equipmentIndex);Number.isNaN(a)||Fs(a).catch(s=>{console.error("❌ [equipment.js] deleteEquipment",s)});return}const n=e.target.closest('[data-equipment-card="true"]');if(n){const a=Number(n.dataset.equipmentIndex);Number.isNaN(a)||Rs(a)}}function Co(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Rs(n)}}function To(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Fs(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Ms(){if(!rt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=ge(),a=rt.id?n.find(l=>String(l.id)===String(rt.id)):null,s=rt.groupKey,r=s?n.find(l=>Ke(l)===s):null,i=a||r;if(!i){fn();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),ct=c}if(js(i),!In){const l=$n(i),d=l[0]||i,u=l.reduce((f,g)=>f+(Number.isFinite(Number(g.qty))?Number(g.qty):0),0),m=["maintenance","reserved","available","retired"],p=l.map(f=>me(f.status)).sort((f,g)=>m.indexOf(f)-m.indexOf(g))[0]||me(d.status);_a({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ln(d)||"",barcode:d.barcode||"",status:d.status||p}),lt=pn()}kn(primary)}function Po(){document.getElementById("search-equipment")?.addEventListener("input",tn),document.getElementById("filter-category")?.addEventListener("change",tn),document.getElementById("filter-sub")?.addEventListener("change",tn),document.getElementById("filter-status")?.addEventListener("change",tn),document.getElementById("add-equipment-form")?.addEventListener("submit",$o);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),wo().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Lo),t.addEventListener("keydown",Co),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",To),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);vo(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!In){lt=pn(),Et(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){S(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Wt(document.getElementById("edit-equipment-quantity").value)||1,price:_n(document.getElementById("edit-equipment-price").value)||0,barcode:q(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ko(t,n),lt=pn(),Et(!1),Ms()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{Po(),pe(),Cn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(lt&&_a(lt),ct!=null){const a=ge()[ct];if(a){const r=$n(a)[0]||a;kn(r)}}Et(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(pe(),Et(In),ct!=null){const t=ge()[ct];if(t){const a=$n(t)[0]||t;kn(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Cn({showToastOnError:!1})});document.addEventListener(Ui.USER_UPDATED,()=>{pe()});document.addEventListener("equipment:changed",()=>{Ms()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{rt=null,fn(),ct=null,lt=null,Et(!1)}),e.dataset.variantsListenerAttached="true")});const No=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Bo=new Set(["maintenance","reserved","retired"]);function Do(e){const t=String(e??"").trim().toLowerCase();return t&&No.get(t)||"available"}function jo(e){return e?typeof e=="object"?e:Tn(e):null}function Ye(e){const t=jo(e);return t?Do(t.status||t.state||t.statusLabel||t.status_label):"available"}function Hs(e){return!Bo.has(Ye(e))}function mt(e={}){return e.image||e.imageUrl||e.img||""}function Fo(e){if(!e)return null;const t=J(e),{equipment:n=[]}=Z();return(n||[]).find(a=>J(a?.barcode)===t)||null}function Tn(e){const t=J(e);if(!t)return null;const{equipment:n=[]}=Z();return(n||[]).find(a=>J(a?.barcode)===t)||null}function ie(e=""){return q(String(e)).trim().toLowerCase()}const Ro=2;function Mo(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(Ro):"0.00"}function ns(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function Yt(e={}){const t=e?.desc||e?.description||e?.name||"",n=ie(t),a=Mo(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function pt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=Yt(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=ie(i),l=as(n),d=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:l,image:d,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+ns(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const l=as(c),d=ns(c);return i+l*d},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function _t(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function as(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function ka(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function Ho(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function Je(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?Ho(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Os="projects:create:draft",zs="projects.html#projects-section";let ea=null,Vs=[],ta=new Map,na=new Map,yn=new Map,Gn=!1,on=null;function gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bn(e){return q(String(e||"")).trim().toLowerCase()}function Oo(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=q(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Us(e){const t=q(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Qs(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Ks(e){if(!e)return null;const t=q(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Gs(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=q(String(t))}}function $t(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function La(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function ft(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function ke(){const{input:e,hidden:t}=ft();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Nt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Ws(e,t,{allowPartial:n=!1}={}){const a=ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function aa(e,t={}){return Ws(ta,e,t)}function sa(e,t={}){return Ws(na,e,t)}function ye(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Xs(e){Vs=Array.isArray(e)?[...e]:[]}function Ca(){return Vs}function Ta(e){return e&&Ca().find(t=>String(t.id)===String(e))||null}function ss(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function wt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??He,a=q(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:He}function xe(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??He,a=q(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=He),t.dataset.companyShare=String(s),t.checked=!0}function ra(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Gn){X();return}Gn=!0;const a=()=>{Gn=!1,X()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(He)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),xe()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xe():n.checked&&(n.checked=!1));a()}function zo(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function rs(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function is(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function Re({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=La();if(!n||!a||!s)return;const r=Ea()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;ta=new Map;const d=r.filter(f=>f&&f.id!=null).map(f=>({id:String(f.id),label:is(f)||c})).filter(f=>{if(!f.label)return!1;const g=ie(f.label);return!g||l.has(g)?!1:(l.add(g),ta.set(g,f),!0)}).sort((f,g)=>f.label.localeCompare(g.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(f=>`<option value="${gn(f.label)}"></option>`).join("");const u=t?"":n.value,m=e?String(e):a.value?String(a.value):"",p=m?r.find(f=>String(f.id)===m):null;if(p){const f=is(p)||c;a.value=String(p.id),n.value=f,n.dataset.selectedId=String(p.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function xt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=ft();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ca()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(y=>y&&y.id!=null).sort((y,v)=>String(v.createdAt||v.start||"").localeCompare(String(y.createdAt||y.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),m=new Set;na=new Map;const p=l.map(y=>{const v=ss(y)||u;return{id:String(y.id),label:v}}).filter(y=>{if(!y.label)return!1;const v=ie(y.label);return!v||m.has(v)?!1:(m.add(v),na.set(v,y),!0)});r.innerHTML=p.map(y=>`<option value="${gn(y.label)}"></option>`).join("");const f=e?String(e):s.value?String(s.value):"",g=f?l.find(y=>String(y.id)===f):null;if(g){const y=ss(g)||u;s.value=String(g.id),a.value=y,a.dataset.selectedId=String(g.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function vn(e,t,n){const{date:a,time:s}=ws(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Ys(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||xt({selectedValue:a});const r=(Ea()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";Re(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=rs(e,"start"),l=rs(e,"end");c&&vn("res-start","res-start-time",c),l&&vn("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),X(),Ge()}function Js({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:Z(),s=Array.isArray(a)?a:[];Xs(s);const r=t!=null?String(t):n.value?String(n.value):"";xt({selectedValue:r,projectsList:s}),Ge(),X()}function Ge(){const{input:e,hidden:t}=ft(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),d=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Nt(n,ke),a&&Nt(a,ke)),s&&Nt(s,ke),r&&Nt(r,ke),i&&Nt(i,ke),d)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=c),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=c),s&&(s.value="unpaid",ye(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=c),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=c),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=c);else{if(n){const u=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",u&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title="")}ra("tax")}function Pa(){const{input:e,hidden:t}=ft();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?sa(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ta(r.id);i?Ys(i,{skipProjectSelectUpdate:!0}):(Ge(),X())}else t.value="",e.dataset.selectedId="",Ge(),X()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?sa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Na(){const{input:e,hidden:t}=La();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?aa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),X()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?aa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Vo(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Mt({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Mt({clearValue:!1}),!n)return;n.fromProjectForm&&(on={draftStorageKey:n.draftStorageKey||Os,returnUrl:n.returnUrl||zs});const r=document.getElementById("res-project");if(n.projectId){r&&(xt({selectedValue:String(n.projectId)}),Ge());const d=Ta(n.projectId);d?Ys(d,{forceNotes:!!n.forceNotes}):X(),Mt()}else{r&&xt({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");nc(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&vn("res-start","res-start-time",n.start),n.end&&vn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(Ea()||[]).find(m=>String(m.id)===String(n.customerId));u?.id!=null&&(Re({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(Re({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):Re({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),X()}function Jt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:zt(e,n),end:zt(t,a)}}function Zs(e){const t=bn(e);if(t){const c=yn.get(t);if(c)return c}const{description:n,barcode:a}=Us(e);if(a){const c=Tn(a);if(c)return c}const s=ie(n||e);if(!s)return null;let r=ks();if(!r?.length){const c=Z();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Cs(r)}const i=r.find(c=>ie(c?.desc||c?.description||"")===s);return i||r.find(c=>ie(c?.desc||c?.description||"").includes(s))||null}function er(e,t="equipment-description-options"){const n=bn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>bn(l.value)===n)||yn.has(n))return!0;const{description:s}=Us(e);if(!s)return!1;const r=ie(s);return r?(ks()||[]).some(c=>ie(c?.desc||c?.description||"")===r):!1}const Uo={available:0,reserved:1,maintenance:2,retired:3};function Qo(e){return Uo[e]??5}function os(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Ko(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${os(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${os(n)})`}function kt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Xt(),a=Z(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Cs(r);const i=new Map;r.forEach(d=>{const u=Oo(d),m=bn(u);if(!m||!u)return;const p=Ye(d),f=Qo(p),g=i.get(m);if(!g){i.set(m,{normalized:m,value:u,bestItem:d,bestStatus:p,bestPriority:f,statuses:new Set([p])});return}g.statuses.add(p),f<g.bestPriority&&(g.bestItem=d,g.bestStatus=p,g.bestPriority=f,g.value=u)}),yn=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{yn.set(d.normalized,d.bestItem);const u=Ko(d),m=gn(d.value);if(u===d.value)return`<option value="${m}"></option>`;const p=gn(u);return`<option value="${m}" label="${p}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Go(e,t){const n=J(e);if(!n)return!1;const{start:a,end:s}=Jt();if(!a||!s)return S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")),!1;if(We().some(d=>J(d.barcode)===n))return S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز")),!1;if(Xe(n,a,s))return S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية")),!1;const i=Tn(n);if(!i)return S(o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود")),!1;const c=Ye(i);if(c==="maintenance"||c==="retired")return S($t(c)),!1;const l=_t(i);return l?(wa({id:l,equipmentId:l,barcode:n,desc:i.desc,qty:1,price:i.price,image:mt(i)}),t&&(t.value=""),Ze(),X(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),!0):(S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")),!1)}function ia(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Zs(t);if(!n){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Fo(n.barcode),s=Ye(a||n);if(s==="maintenance"||s==="retired"){S($t(s));return}const r=J(n.barcode);if(!r){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=_t(n);if(!i){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:mt(n)},{start:l,end:d}=Jt();if(!l||!d){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}if(We().some(p=>J(p.barcode)===r)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}if(Xe(r,l,d)){S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}wa(c),Ze(),X(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Wo(){kt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ia(e))});const t=()=>{er(e.value,"equipment-description-options")&&ia(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function Ze(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=We(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=pt(n);t.innerHTML=d.map(u=>{const m=u.items[0]||{},p=mt(m)||u.image,f=p?`<img src="${p}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',g=q(String(u.count)),y=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,v=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):y*u.count,w=`${q(y.toFixed(2))} ${s}`,h=`${q(v.toFixed(2))} ${s}`,I=u.barcodes.map(D=>q(String(D||""))).filter(Boolean),$=I.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${I.map(D=>`<li>${D}</li>`).join("")}
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
              <span class="reservation-qty-value">${g}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}">+</button>
            </div>
          </td>
          <td>${w}</td>
          <td>${h}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Xo(e){const t=We(),a=pt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Wi(s),Ze(),X())}function Yo(e){const t=We(),n=t.filter(a=>Yt(a)!==e);n.length!==t.length&&(Ls(n),Ze(),X())}function Jo(e){const t=We(),a=pt(t).find(m=>m.key===e);if(!a)return;const{start:s,end:r}=Jt();if(!s||!r){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(m=>J(m.barcode))),{equipment:c=[]}=Z(),l=(c||[]).find(m=>{const p=J(m?.barcode);return!p||i.has(p)||Yt({desc:m?.desc||m?.description||m?.name||"",price:Number(m?.price)||0})!==e||!Hs(m)?!1:!Xe(p,s,r)});if(!l){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=J(l.barcode),u=_t(l);if(!u){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}wa({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:mt(l)}),Ze(),X()}function X(){const e=document.getElementById("res-discount")?.value||"0",t=parseFloat(q(e))||0,n=document.getElementById("res-discount-type")?.value||"percent",a=!!document.getElementById("res-project")?.value,s=document.getElementById("res-tax"),r=a?!1:s?.checked||!1,i=document.getElementById("res-payment-status"),c=i?.value||"unpaid",{start:l,end:d}=Jt();r&&xe();const u=wt(),m=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),f=Qs(m),g=Ks(p);Za({selectedItems:We(),discount:t,discountType:n,applyTax:r,paidStatus:c,paymentProgressType:f,paymentProgressValue:g,start:l,end:d,companySharePercent:u,paymentHistory:[]});const y=Za.lastResult;y?(Gs(p,y.paymentProgressValue),i&&(i.value=y.paymentStatus,ye(i,y.paymentStatus))):ye(i,c)}function Zo(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=q(c.target.value),X()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",X),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(ke()){n.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ra("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(ke()){a.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ra("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(ke()){s.value="unpaid",ye(s,"unpaid"),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}ye(s),X()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(ke()){r.value="percent",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",X()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(ke()){i.value="",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=q(c.target.value),X()}),i.dataset.listenerAttached="true"),X()}function ec(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){X();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),X()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function cs(){const{input:e,hidden:t}=La(),{input:n,hidden:a}=ft(),{customers:s}=Z();let r=t?.value?String(t.value):"";if(!r&&e?.value){const V=aa(e.value,{allowPartial:!0});V&&(r=String(V.id),t&&(t.value=r),e.value=V.label,e.dataset.selectedId=r)}const i=s.find(V=>String(V.id)===r);if(!i){S(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const V=sa(n.value,{allowPartial:!0});V&&(l=String(V.id),a&&(a.value=l),n.value=V.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,m=document.getElementById("res-start-time")?.value||"00:00",p=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const f=`${d}T${m}`,g=`${u}T${p}`,y=new Date(f),v=new Date(g);if(Number.isNaN(y.getTime())||Number.isNaN(v.getTime())||y>=v){S(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const w=Xi(),h=We();if(h.length===0&&w.length===0){S(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",$=parseFloat(q(document.getElementById("res-discount")?.value))||0,D=document.getElementById("res-discount-type")?.value||"percent",b=document.getElementById("res-payment-status"),E=b?.value||"unpaid",_=document.getElementById("res-payment-progress-type"),C=document.getElementById("res-payment-progress-value"),R=Qs(_),x=Ks(C),j=l?Ta(l):null,O=zo(j);if(l&&!j){S(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const V of h){const ne=Ye(V.barcode);if(ne==="maintenance"||ne==="retired"){S($t(ne));return}}for(const V of h){const ne=J(V.barcode);if(Xe(ne,f,g)){S(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const V of w)if(xs(V,f,g)){S(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const M=document.getElementById("res-tax"),P=document.getElementById("res-company-share"),B=!!l;B?(M&&(M.checked=!1,M.disabled=!0,M.classList.add("disabled"),M.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.checked=!1,P.disabled=!0,P.classList.add("disabled"),P.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),b&&(b.value="unpaid",b.disabled=!0,ye(b,"unpaid"),b.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),_&&(_.disabled=!0,_.classList.add("disabled")),C&&(C.value="",C.disabled=!0,C.classList.add("disabled"))):(M&&(M.disabled=!1,M.classList.remove("disabled"),M.title=""),P&&(P.disabled=!1,P.classList.remove("disabled"),P.title=""),b&&(b.disabled=!1,b.title=""),_&&(_.disabled=!1,_.classList.remove("disabled")),C&&(C.disabled=!1,C.classList.remove("disabled")));const z=B?!1:M?.checked||!1,N=!!P?.checked;if(!B&&N!==z){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let A=N?wt():null;N&&(!Number.isFinite(A)||A<=0)&&(xe(),A=wt());const H=N&&z&&Number.isFinite(A)&&A>0;z&&xe();const Q=Is(h,$,D,z,w,{start:f,end:g,companySharePercent:H?A:0}),ee=Qi(),U=As({totalAmount:Q,progressType:R,progressValue:x,history:[]});C&&Gs(C,U.paymentProgressValue);const oe=[];U.paymentProgressValue!=null&&U.paymentProgressValue>0&&oe.push({type:U.paymentProgressType||R,value:U.paymentProgressValue,amount:U.paidAmount,percentage:U.paidPercent,recordedAt:new Date().toISOString()});const Y=_s({manualStatus:E,paidAmount:U.paidAmount,paidPercent:U.paidPercent,totalAmount:Q});b&&(b.value=Y,ye(b,Y));const re=$s({reservationCode:ee,customerId:c,start:f,end:g,status:O?"confirmed":"pending",title:null,location:null,notes:I,projectId:l||null,totalAmount:Q,discount:B?0:$,discountType:B?"percent":D,applyTax:z,paidStatus:B?"unpaid":Y,confirmed:O,items:h.map(V=>({...V,equipmentId:V.equipmentId??V.id})),technicians:w,companySharePercent:B||!H?null:A,companyShareEnabled:B?!1:H,paidAmount:B?0:U.paidAmount,paidPercentage:B?0:U.paidPercent,paymentProgressType:B?null:U.paymentProgressType,paymentProgressValue:B?null:U.paymentProgressValue,paymentHistory:B?[]:oe});try{const V=await Yi(re);Xt(),kt(),Gt(),ac(),S(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof ea=="function"&&ea({type:"created",reservation:V}),tc(V)}catch(V){console.error("❌ [reservations/createForm] Failed to create reservation",V);const ne=xn(V)?V.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(ne,"error"),B&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Mt({clearValue:!1}))}}function tc(e){if(!on)return;const{draftStorageKey:t=Os,returnUrl:n=zs}=on,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}on=null,n&&(window.location.href=n)}function Mt({clearValue:e=!1}={}){const{input:t,hidden:n}=ft();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Ge())}function nc(e,t=""){const{input:n,hidden:a}=ft();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Ge())}function ac(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),Re({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Mt({clearValue:!1}),xt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",ye(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Ji(),Ls([]),Ze(),Ge(),X()}function sc(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Xo(s);return}if(a==="increase-group"&&s){Jo(s);return}if(a==="remove-group"&&s){Yo(s);return}}),e.dataset.listenerAttached="true")}function rc(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Go(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim())return;const{start:r,end:i}=Jt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function ic(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await cs()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await cs()}),t.dataset.listenerAttached="true")}function Jl({onAfterSubmit:e}={}){ea=typeof e=="function"?e:null;const{customers:t,projects:n}=Z();Gi(t||[]),Re(),Na(),Xs(n||[]),Js({projectsList:n}),Pa(),kt(),Wo(),ec(),Zo(),sc(),rc(),ic(),Vo(),X(),Ze()}function tr(){kt(),Js(),Re(),Na(),Pa(),Ze(),X()}if(typeof document<"u"){const e=()=>{Re(),xt({projectsList:Ca()}),Na(),Pa(),X()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e)}typeof window<"u"&&(window.getCompanySharePercent=wt);function nr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:st(t),endDate:st(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:st(n),endDate:st(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:st(n),endDate:st(a)}}return e==="upcoming"?{startDate:st(t),endDate:""}:{startDate:"",endDate:""}}function oc(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=q(t?.value||"").trim(),i=q(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),hn(t),hn(n),r="",i=""),!r&&!i&&c){const d=nr(c);r=d.startDate,i=d.endDate}return{searchTerm:ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function Zl(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=q(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{cc(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),hn(a),hn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function cc(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=nr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function st(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function hn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function nn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function lc(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function dc(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=lc(n);if(a!==null)return a}return null}function ls(e,t=0){const n=dc(e);if(n!=null)return n;const a=nn(e.createdAt??e.created_at);if(a!=null)return a;const s=nn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=nn(e.start);if(r!=null)return r;const i=nn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function uc({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((h,I)=>({reservation:h,index:I})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",m=t.endDate||"",p=t.status||"",f=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,g=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,y=u?new Date(`${u}T00:00:00`):null,v=m?new Date(`${m}T23:59:59`):null,w=r.filter(({reservation:h})=>{const I=n.get(String(h.customerId)),$=s?.get?.(String(h.projectId)),D=h.start?new Date(h.start):null,b=ka(h),{effectiveConfirmed:E}=Je(h,$);if(f!=null&&String(h.customerId)!==String(f)||g!=null&&!(Array.isArray(h.technicians)?h.technicians.map(j=>String(j)):[]).includes(String(g))||p==="confirmed"&&!E||p==="pending"&&E||p==="completed"&&!b||y&&D&&D<y||v&&D&&D>v)return!1;if(c){const x=[h.reservationId,h.id,h.reservation_id,h.reservationCode,h.reservation_code,h.code,h.reference,h.referenceNumber,h.reference_number],j=ie(x.filter(M=>M!=null&&M!=="").map(String).join(" ")).replace(/\s+/g,""),O=c.replace(/\s+/g,"");if(!j.includes(O))return!1}if(l&&!ie(I?.customerName||"").includes(l))return!1;if(d){const x=[h.projectId,h.project_id,h.projectID,$?.id,$?.projectCode,$?.project_code],j=ie(x.filter(M=>M!=null&&M!=="").map(String).join(" ")).replace(/\s+/g,""),O=d.replace(/\s+/g,"");if(!j.includes(O))return!1}if(!i)return!0;const _=h.items?.map?.(x=>`${x.barcode} ${x.desc}`).join(" ")||"",C=(h.technicians||[]).map(x=>a.get(String(x))?.name).filter(Boolean).join(" ");return ie([h.reservationId,I?.customerName,h.notes,_,C,$?.title].filter(Boolean).join(" ")).includes(i)});return w.sort((h,I)=>{const $=ls(h.reservation,h.index),D=ls(I.reservation,I.index);return $!==D?D-$:I.index-h.index}),w}function mc({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),m=o("reservations.list.status.pending","⏳ غير مؤكد"),p=o("reservations.list.payment.paid","💳 مدفوع"),f=o("reservations.list.payment.unpaid","💳 غير مدفوع"),g=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),y=o("reservations.list.actions.confirm","✔️ تأكيد"),v=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),w=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),h={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:$})=>{const D=t.get(String(I.customerId)),b=I.projectId?a?.get?.(String(I.projectId)):null,E=ka(I),_=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),C=_==="paid",R=_==="partial",{effectiveConfirmed:x,projectLinked:j}=Je(I,b),O=x?"status-confirmed":"status-pending",M=C?"status-paid":R?"status-partial":"status-unpaid";let P=`<span class="reservation-chip status-chip ${O}">${x?u:m}</span>`;const B=C?p:R?g:f;let z=`<span class="reservation-chip status-chip ${M}">${B}</span>`,N=C?" tile-paid":R?" tile-partial":" tile-unpaid";E&&(N+=" tile-completed");let A="";E&&(P=`<span class="reservation-chip status-chip status-completed">${u}</span>`,z=`<span class="reservation-chip status-chip status-completed">${B}</span>`,A=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const H=!j&&!x?`<button class="tile-confirm" data-reservation-index="${$}" data-action="confirm">${y}</button>`:"",Q=H?`<div class="tile-actions">${H}</div>`:"",ee=I.items?.length||0,U=(I.technicians||[]).map(be=>n.get(String(be))).filter(Boolean),oe=U.map(be=>be.name).join(d)||"—",Y=q(String(I.reservationId??"")),re=I.start?q(Qe(I.start)):"-",V=I.end?q(Qe(I.end)):"-",ne=q(String(I.cost??0)),Ne=q(String(ee)),Ae=I.notes?q(I.notes):c,_e=l.replace("{count}",Ne),fe=I.applyTax?`<small>${r}</small>`:"";let $e=v;return I.projectId&&($e=b?.title?q(b.title):w),`
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
            <span class="tile-label">${h.client}</span>
            <span class="tile-value">${D?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.project}</span>
            <span class="tile-value">${$e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.start}</span>
            <span class="tile-value tile-inline">${re}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.end}</span>
            <span class="tile-value tile-inline">${V}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.cost}</span>
            <span class="tile-value">${ne} ${s} ${fe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.equipment}</span>
            <span class="tile-value">${_e}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${h.crew}</span>
            <span class="tile-value">${U.length?oe:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Ae}</span>
          </div>
        </div>
        ${Q}
      </div>
    `}).join("")}function qe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pc(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Je(e,s),c=e.paid===!0||e.paid==="paid",l=ka(e),d=e.items||[],u=pt(d),{technicians:m=[]}=Z(),p=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(m)?m:[]),f=new Map;p.forEach(L=>{if(!L||L.id==null)return;const G=String(L.id),ae=f.get(G)||{};f.set(G,{...ae,...L})});const g=(e.technicians||[]).map(L=>f.get(String(L))).filter(Boolean),y=ut(),v=Ts(e.start,e.end),w=(L={})=>{const G=[L.dailyWage,L.daily_rate,L.dailyRate,L.wage,L.rate];for(const ae of G){if(ae==null)continue;const he=parseFloat(q(String(ae)));if(Number.isFinite(he))return he}return 0},h=(L={})=>{const G=[L.dailyTotal,L.daily_total,L.totalRate,L.total,L.total_wage];for(const ae of G){if(ae==null)continue;const he=parseFloat(q(String(ae)));if(Number.isFinite(he))return he}return w(L)},$=d.reduce((L,G)=>L+(G.qty||1)*(G.price||0),0)*v,D=g.reduce((L,G)=>L+w(G),0),b=g.reduce((L,G)=>L+h(G),0),E=D*v,_=b*v,C=$+_,R=parseFloat(e.discount)||0,x=e.discountType==="amount"?R:C*(R/100),j=Math.max(0,C-x),O=r?!1:e.applyTax,M=Number(e.cost),P=Number.isFinite(M),B=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,z=B!=null?parseFloat(q(String(B))):NaN;let H=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(z)&&z>0)&&Number.isFinite(z)?z:0;O&&H<=0&&(H=He);let Q=H>0?Math.max(0,j*(H/100)):0;const ee=j+Q,U=O?ee*.15:0,oe=Number.isFinite(U)&&U>0?Number(U.toFixed(2)):0,Y=ee+oe,re=Number.isFinite(Y)?Number(Y.toFixed(2)):0,V=r?re:P?M:re;H>0&&(Q=Number(Math.max(0,j*(H/100)).toFixed(2)));const ne=q(String(e.reservationId??e.id??"")),Ne=e.start?q(Qe(e.start)):"-",Ae=e.end?q(Qe(e.end)):"-",_e=q(String(g.length)),fe=q($.toFixed(2)),$e=q(x.toFixed(2)),le=q(j.toFixed(2)),be=q(oe.toFixed(2)),W=q((Number.isFinite(V)?V:0).toFixed(2)),se=q(String(v)),te=o("reservations.create.summary.currency","SR"),et=o("reservations.details.labels.discount","الخصم"),Oe=o("reservations.details.labels.tax","الضريبة (15%)"),Fn=o("reservations.details.labels.crewTotal","إجمالي الفريق"),Rn=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),tt=o("reservations.details.labels.duration","عدد الأيام"),Lt=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Ct=o("reservations.details.labels.netProfit","💵 صافي الربح"),Mn=o("reservations.create.equipment.imageAlt","صورة"),ve={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Hn=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),K=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),ce=o("reservations.details.technicians.roleUnknown","غير محدد"),nt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),Vr=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),Ur=o("reservations.list.status.confirmed","✅ مؤكد"),Qr=o("reservations.list.status.pending","⏳ غير مؤكد"),Kr=o("reservations.list.payment.paid","💳 مدفوع"),Gr=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Wr=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),Xr=o("reservations.list.status.completed","📁 منتهي"),Yr=o("reservations.details.labels.id","🆔 رقم الحجز"),Jr=o("reservations.details.section.bookingInfo","بيانات الحجز"),Zr=o("reservations.details.section.paymentSummary","ملخص الدفع"),ei=o("reservations.details.labels.finalTotal","المجموع النهائي"),ti=o("reservations.details.section.crew","😎 الفريق الفني"),ni=o("reservations.details.crew.count","{count} عضو"),ai=o("reservations.details.section.items","📦 المعدات المرتبطة"),si=o("reservations.details.items.count","{count} عنصر"),ri=o("reservations.details.actions.edit","✏️ تعديل"),ii=o("reservations.details.actions.delete","🗑️ حذف"),oi=o("reservations.details.labels.customer","العميل"),ci=o("reservations.details.labels.contact","رقم التواصل"),li=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const di=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),ui=o("reservations.details.actions.openProject","📁 فتح المشروع"),mi=o("reservations.details.labels.start","بداية الحجز"),pi=o("reservations.details.labels.end","نهاية الحجز"),fi=o("reservations.details.labels.notes","ملاحظات"),yi=o("reservations.list.noNotes","لا توجد ملاحظات"),gi=o("reservations.details.labels.itemsCount","عدد المعدات"),bi=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),vi=o("reservations.paymentHistory.title","سجل الدفعات"),hi=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),qi=o("reservations.list.unknownCustomer","غير معروف"),On=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Qa=On==="partial",Si=On==="paid"?Kr:Qa?Wr:Gr,Ei=u.reduce((L,G)=>L+(Number(G.quantity)||0),0),wi=q(String(Ei)),Ka=si.replace("{count}",wi),xi=ni.replace("{count}",_e),Ii=e.notes?q(e.notes):yi,Ai=q(_.toFixed(2)),_i=q(String(H)),$i=q(Q.toFixed(2)),ki=`${_i}% (${$i} ${te})`,Li=Math.max(0,$+_-x),Ga=Math.max(0,Li-E),Ci=q(Ga.toFixed(2)),ze=[{icon:"💼",label:bi,value:`${fe} ${te}`}];ze.push({icon:"😎",label:Fn,value:`${Ai} ${te}`}),x>0&&ze.push({icon:"💸",label:et,value:`${$e} ${te}`}),ze.push({icon:"📊",label:Rn,value:`${le} ${te}`}),O&&oe>0&&ze.push({icon:"🧾",label:Oe,value:`${be} ${te}`}),H>0&&ze.push({icon:"🏦",label:Lt,value:ki}),Math.abs(Ga-(V??0))>.009&&ze.push({icon:"💵",label:Ct,value:`${Ci} ${te}`}),ze.push({icon:"💰",label:ei,value:`${W} ${te}`});const Ti=ze.map(({icon:L,label:G,value:ae})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${L} ${G}</span>
      <span class="summary-details-value">${ae}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let Tt=[];Array.isArray(e.paymentHistory)?Tt=e.paymentHistory:Array.isArray(e.payment_history)&&(Tt=e.payment_history);const Pi=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Wa=Array.isArray(Tt)&&Tt.length>0?Tt:Pi,Ni=Wa.length?`<ul class="reservation-payment-history-list">${Wa.map(L=>{const G=L?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):L?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ae=Number.isFinite(Number(L?.amount))&&Number(L.amount)>0?`${q(Number(L.amount).toFixed(2))} ${te}`:"—",he=Number.isFinite(Number(L?.percentage))&&Number(L.percentage)>0?`${q(Number(L.percentage).toFixed(2))}%`:"—",ht=L?.recordedAt?q(Qe(L.recordedAt)):"—",qt=L?.note?`<div class="payment-history-note">${qe(q(L.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${qe(G)}</span>
              <span class="payment-history-entry__amount">${ae}</span>
              <span class="payment-history-entry__percent">${he}</span>
              <span class="payment-history-entry__date">${ht}</span>
            </div>
            ${qt}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${qe(hi)}</div>`,Xa=[{text:i?Ur:Qr,className:i?"status-confirmed":"status-pending"},{text:Si,className:On==="paid"?"status-paid":Qa?"status-partial":"status-unpaid"}];l&&Xa.push({text:Xr,className:"status-completed"});const Bi=Xa.map(({text:L,className:G})=>`<span class="status-chip ${G}">${L}</span>`).join(""),at=(L,G,ae)=>`
    <div class="res-info-row">
      <span class="label">${L} ${G}</span>
      <span class="value">${ae}</span>
    </div>
  `;let zn="";if(e.projectId){let L=qe(di);if(s){const G=s.title||o("projects.fallback.untitled","مشروع بدون اسم");L=`${qe(G)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${qe(ui)}</button>`}zn=`
      <div class="res-info-row">
        <span class="label">📁 ${li}</span>
        <span class="value">${L}</span>
      </div>
    `}const Be=[];Be.push(at("👤",oi,t?.customerName||qi)),Be.push(at("📞",ci,t?.phone||"—")),Be.push(at("🗓️",mi,Ne)),Be.push(at("🗓️",pi,Ae)),Be.push(at("📦",gi,Ka)),Be.push(at("⏱️",tt,se)),Be.push(at("📝",fi,Ii)),zn&&Be.push(zn);const Di=Be.join(""),ji=u.length?u.map(L=>{const G=L.items[0]||{},ae=mt(G)||L.image,he=ae?`<img src="${ae}" alt="${Mn}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',ht=Number(L.quantity)||Number(L.count)||0,qt=q(String(ht)),Ya=Number.isFinite(Number(L.unitPrice))?Number(L.unitPrice):0,Hi=Number.isFinite(Number(L.totalPrice))?Number(L.totalPrice):Ya*ht,Oi=`${q(Ya.toFixed(2))} ${te}`,zi=`${q(Hi.toFixed(2))} ${te}`,Ja=L.barcodes.map(Vn=>q(String(Vn||""))).filter(Boolean),Vi=Ja.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Ja.map(Vn=>`<li>${Vn}</li>`).join("")}
              </ul>
            </details>`:"";return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${he}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${qe(G.desc||G.description||G.name||L.description||"-")}</div>
                  ${Vi}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${qe(ve.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${qt}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${qe(ve.unitPrice)}">${Oi}</td>
            <td class="reservation-modal-items-table__cell" data-label="${qe(ve.total)}">${zi}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${qe(ve.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Hn}</td></tr>`,Fi=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${ve.item}</th>
            <th>${ve.quantity}</th>
            <th>${ve.unitPrice}</th>
            <th>${ve.total}</th>
            <th>${ve.actions}</th>
          </tr>
        </thead>
        <tbody>${ji}</tbody>
      </table>
    </div>
  `,Ri=g.map((L,G)=>{const ae=q(String(G+1)),he=L.role||ce,ht=L.phone||nt,qt=L.wage?Vr.replace("{amount}",q(String(L.wage))).replace("{currency}",te):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ae}</span>
          <span class="technician-name">${L.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${he}</div>
          <div>📞 ${ht}</div>
          ${qt?`<div>💰 ${qt}</div>`:""}
        </div>
      </div>
    `}).join(""),Mi=g.length?`<div class="reservation-technicians-grid">${Ri}</div>`:`<ul class="reservation-modal-technicians"><li>${K}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${Yr}</span>
          <strong>${ne}</strong>
        </div>
        <div class="status-chips">
          ${Bi}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Jr}</h6>
          ${Di}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Zr}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ti}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${vi}</h6>
              ${Ni}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${ti}</span>
          <span class="count">${xi}</span>
        </div>
        ${Mi}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ai}</span>
          <span class="count">${Ka}</span>
        </div>
        ${Fi}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${ri}</button>
        ${y?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${ii}</button>`:""}
      </div>
    </div>
  `}const fc=`@page {
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
`,ar="reservations.quote.sequence",oa="reservations.quote.togglePrefs.v1",sr="https://help.artratio.sa/guide/quote-preview",De={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},yc=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ee=[...yc];function ca(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ee]}function gc(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=ca(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=ca(t.value);if(a.length)return a}const n=Ee.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ee]}const Pn=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],rr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>k(q(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>k(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>k(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>k(q(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>k(q(Number(e?.price||0).toFixed(2)))}],ir=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>k(q(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>k(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>k(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>k(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Ba={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:rr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:ir.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},or=new Set(Pn.map(({id:e})=>e)),cr=Object.fromEntries(Object.entries(Ba).map(([e,t=[]])=>[e,new Set(t.map(n=>n.id))]));function lr(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const bc="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",vc="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",hc="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",qc=fc.trim(),Sc=/color\([^)]*\)/gi,qn=/(color\(|color-mix\()/i,Ec=document.createElement("canvas"),an=Ec.getContext("2d"),dr=/^data:image\/svg\+xml/i,wc=/\.svg($|[?#])/i,Ft=512,la="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ur=96,mr=25.4,da=210,cn=297,ln=Math.round(da/mr*ur),dn=Math.round(cn/mr*ur),xc=2,pr=/safari/i,Ic=/(iphone|ipad|ipod)/i,ds=/(iphone|ipad|ipod)/i,Ac=/(crios|fxios|edgios|opios)/i,Sn="[reservations/pdf]";let F=null,T=null,Le=1,Bt=null,Dt=null,Ue=null,St=null,Ht=!1;function ot(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!F?.statusIndicator||!F?.statusText)return;F.statusKind=e;const r=t||lr(e);F.statusText.textContent=r,F.statusSpinner&&(F.statusSpinner.hidden=!s),F.statusAction&&(F.statusAction.hidden=!0,F.statusAction.onclick=null,n&&typeof a=="function"&&(F.statusAction.textContent=n,F.statusAction.hidden=!1,F.statusAction.onclick=i=>{i.preventDefault(),a()})),F.statusIndicator.hidden=!1,requestAnimationFrame(()=>{F.statusIndicator.classList.add("is-visible")})}function Ot(e){!F?.statusIndicator||!F?.statusText||(F.statusKind=null,F.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{F?.statusIndicator&&(F.statusIndicator.hidden=!0,F.statusAction&&(F.statusAction.hidden=!0,F.statusAction.onclick=null),F.statusSpinner&&(F.statusSpinner.hidden=!1))},220))}function ua(){return!!window?.bootstrap?.Modal}function _c(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Ue||(Ue=document.createElement("div"),Ue.className="modal-backdrop fade show",Ue.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Ue)),St||(St=t=>{t.key==="Escape"&&ma(e)},document.addEventListener("keydown",St));try{e.focus({preventScroll:!0})}catch{}}}function ma(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Ue&&(Ue.remove(),Ue=null),St&&(document.removeEventListener("keydown",St),St=null))}function $c(e){if(e){if(ua()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}_c(e)}}function kc(){if(Ht)return;Ht=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!F?.modal?.classList.contains("show"),s=()=>{F?.modal?.classList.contains("show")&&(ot("render"),Ht=!1,yt())};Es({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:sr}),a&&ot("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Da(){const e={};return Object.entries(Ba).forEach(([t,n=[]])=>{e[t]=new Set(n.filter(a=>a?.default!==!1).map(a=>a.id))}),e}function fr(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Lc(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function yr(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function gr(){return Object.fromEntries(Pn.map(({id:e})=>[e,!1]))}function ja(e,t){return e.sectionExpansions||(e.sectionExpansions=gr()),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function Cc(e,t){return ja(e,t)?.[t]!==!1}function Fa(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function Tc(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Ic.test(e)}function Pc(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=pr.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function br(){return Tc()&&Pc()}function Nn(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=ds.test(e)||ds.test(t),s=/Macintosh/i.test(e)&&n>1;return pr.test(e)&&!Ac.test(e)&&(a||s)}function Wn(e,...t){try{console.log(`${Sn} ${e}`,...t)}catch{}}function Me(e,...t){try{console.warn(`${Sn} ${e}`,...t)}catch{}}function Nc(e,t,...n){try{t?console.error(`${Sn} ${e}`,t,...n):console.error(`${Sn} ${e}`,...n)}catch{}}function Se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Bc(e,t="لا توجد بيانات للعرض."){const n=k(o(e,t));return Se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function us(e,t){return Array.isArray(e)&&e.length?e:[Bc(t)]}function pa(e,t="#000"){if(!an||!e)return t;try{return an.fillStyle="#000",an.fillStyle=e,an.fillStyle||t}catch{return t}}function Dc(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&n.trim().toLowerCase().startsWith("color(")){console.warn("[quote/pdf] html2canvas color fallback",n);const s=pa(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}const jc=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function vr(e=""){return jc.test(e)}function Fc(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!vr(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function hr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Sc,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Rc=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"];function qr(e,t=window){if(!e||!t||typeof t.getComputedStyle!="function")return;e.querySelectorAll("*").forEach(a=>{const s=t.getComputedStyle(a);if(!s)return;Rc.forEach(i=>{const c=s[i];if(c&&qn.test(c)){const l=i.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`),d=i==="backgroundColor"?"#ffffff":s.color||"#000000",u=pa(c,d);a.style.setProperty(l,u,"important")}});const r=s.backgroundImage;if(r&&qn.test(r)){const i=pa(s.backgroundColor||"#ffffff","#ffffff");a.style.setProperty("background-image","none","important"),a.style.setProperty("background-color",i,"important")}})}function Sr(e,t=window){!e||!t||typeof t.getComputedStyle!="function"||e.querySelectorAll("*").forEach(n=>{const a=t.getComputedStyle(n);if(!a)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(r=>{const i=a[r];if(i&&qn.test(i)){const c=r.replace(/[A-Z]/g,d=>`-${d.toLowerCase()}`),l=r==="backgroundColor"?"#ffffff":"#000000";n.style.setProperty(c,l,"important")}});const s=a.backgroundImage;s&&qn.test(s)&&(n.style.setProperty("background-image","none","important"),n.style.setProperty("background-color","#ffffff","important"))})}function ms(e,t=Ft){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Mc(e){if(!e)return{width:Ft,height:Ft};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?ms(t,0):0,s=n?ms(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Ft,height:s||Ft}}function Er(e=""){return typeof e!="string"?!1:dr.test(e)||wc.test(e)}function Hc(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Oc(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function wr(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Oc(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function zc(e){if(!e)return null;if(dr.test(e))return Hc(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Vc(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Er(t))return!1;const n=await zc(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",la),!1;const a=await wr(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",la),!1)}async function Uc(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Mc(e),s=await wr(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||la),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function xr(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Er(s.getAttribute?.("src"))&&a.push(Vc(s))}),n.forEach(s=>{a.push(Uc(s))}),a.length&&await Promise.allSettled(a)}function Qc(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(A,H=0)=>{const Q=parseFloat(A);return Number.isFinite(Q)?Q:H},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),m=r(s.fontSize,14),p=(()=>{const A=s.lineHeight;if(!A||A==="normal")return m*1.6;const H=r(A,m*1.6);return H>0?H:m*1.6})(),f=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(f<=0)return null;const g=Math.max(1,f-d-l),y=e.textContent||"",v=y.split(/\r?\n/),w=n.createElement("canvas"),h=w.getContext("2d");if(!h)return null;const I=s.fontStyle||"normal",$=s.fontVariant||"normal",D=s.fontWeight||"400",b=s.fontFamily||"sans-serif",E=s.fontStretch||"normal",_=A=>A.join(" "),C=[],R=A=>h.measureText(A).width;h.font=`${I} ${$} ${D} ${E} ${m}px ${b}`,v.forEach(A=>{const H=A.trim();if(H.length===0){C.push("");return}const Q=H.split(/\s+/);let ee=[];Q.forEach((U,oe)=>{const Y=U.trim();if(!Y)return;const re=_(ee.concat(Y));if(R(re)<=g||ee.length===0){ee.push(Y);return}C.push(_(ee)),ee=[Y]}),ee.length&&C.push(_(ee))}),C.length||C.push("");const x=i+c+C.length*p,j=Math.ceil(Math.max(1,f)*t),O=Math.ceil(Math.max(1,x)*t);w.width=j,w.height=O,w.style.width=`${Math.max(1,f)}px`,w.style.height=`${Math.max(1,x)}px`,h.scale(t,t);const M=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){h.save(),h.beginPath();const A=Math.max(1,f),H=Math.max(1,x),Q=Math.min(u,A/2,H/2);h.moveTo(Q,0),h.lineTo(A-Q,0),h.quadraticCurveTo(A,0,A,Q),h.lineTo(A,H-Q),h.quadraticCurveTo(A,H,A-Q,H),h.lineTo(Q,H),h.quadraticCurveTo(0,H,0,H-Q),h.lineTo(0,Q),h.quadraticCurveTo(0,0,Q,0),h.closePath(),h.clip()}if(h.fillStyle=M,h.fillRect(0,0,Math.max(1,f),Math.max(1,x)),h.font=`${I} ${$} ${D} ${E} ${m}px ${b}`,h.fillStyle=s.color||"#000000",h.textBaseline="top",h.textAlign="right","direction"in h)try{h.direction="rtl"}catch{}const P=Math.max(0,f-l);let B=i;C.forEach(A=>{const H=A.length?A:" ";h.fillText(H,P,B,g),B+=p});const z=n.createElement("img");let N;try{N=w.toDataURL("image/png")}catch(A){return Me("note canvas toDataURL failed",A),null}return z.src=N,z.alt=y,z.style.width=`${Math.max(1,f)}px`,z.style.height=`${Math.max(1,x)}px`,z.style.display="block",z.setAttribute("data-quote-note-image","true"),{image:z,canvas:w,totalHeight:x,width:f}}function Kc(e,{pixelRatio:t=1}={}){if(!e||!Nn())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!vr(a.textContent||""))return;let s;try{s=Qc(a,{pixelRatio:t})}catch(r){Me("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function fa(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Nc(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(ot("export"),Cr()):(ot("render"),Ht=!1,yt())};if(Es({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:sr}),F?.modal?.classList.contains("show")&&ot("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ya({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Me("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Me("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ra(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function ps(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function fs(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Gc(){const e=fs();return e||(Dt||(Dt=Ra(vc).catch(t=>{throw Dt=null,t}).then(()=>{const t=fs();if(!t)throw Dt=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Dt)}async function Wc(){const e=ps();return e||(Bt||(Bt=Ra(hc).catch(t=>{throw Bt=null,t}).then(()=>{const t=ps();if(!t)throw Bt=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),Bt)}async function Xc(){if(window.html2pdf||await Ra(bc),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Dc(),Fc()}function k(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Yc(e){const t=Number(e);return!Number.isFinite(t)||t<=0?"Q-0001":`Q-${String(t).padStart(4,"0")}`}function Jc(){const e=window.localStorage?.getItem?.(ar),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Zc(){const t=Jc()+1;return{sequence:t,quoteNumber:Yc(t)}}function el(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(ar,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function tl(){try{const e=window.localStorage?.getItem?.(oa);if(!e)return null;const t=JSON.parse(e);return t&&typeof t=="object"?t:null}catch(e){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",e),null}}function nl(e){try{if(!e){window.localStorage?.removeItem?.(oa);return}window.localStorage?.setItem?.(oa,JSON.stringify(e))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",t)}}function al(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function sl(e){if(!e)return null;const t=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(s=>or.has(s)),n={},a=e.fields||{};return Object.entries(cr).forEach(([s,r])=>{const i=a[s];if(i==null)return;const{ids:c,emptyExplicitly:l}=al(i);if(!c&&!l)return;const d=Array.isArray(c)?c.filter(u=>r.has(u)):[];(d.length>0||l)&&(n[s]=d)}),{version:1,sections:t,fields:n}}function Ir(e){const t=sl(e);t&&nl(t)}function rl(e){if(!e)return;const t=tl();if(!t)return;const n=Array.isArray(t.sections)?t.sections.filter(a=>or.has(a)):[];if(n.length&&(e.sections=new Set(n)),t.fields&&typeof t.fields=="object"){const a=fr(e.fields||Da());Object.entries(t.fields).forEach(([s,r])=>{const i=cr[s];if(!i)return;const c=Array.isArray(r)?r.filter(l=>i.has(l)):[];a[s]=new Set(c)}),e.fields=a}}function il(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ar(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return 0}function ol(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(q(String(n)));if(Number.isFinite(a))return a}return Ar(e)}function cl(e){const t=Gt()||[],{technicians:n=[]}=Z(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function ll(e,t,n){const{projectLinked:a}=Je(e,n),s=Ts(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((N,A)=>N+(Number(A?.qty)||1)*(Number(A?.price)||0),0)*s,l=t.reduce((N,A)=>N+Ar(A),0),d=t.reduce((N,A)=>N+ol(A),0),u=l*s,m=d*s,p=c+m,f=parseFloat(e.discount)||0,g=e.discountType==="amount"?f:p*(f/100),y=Math.max(0,p-g),v=a?!1:e.applyTax,w=Number(e.cost),h=Number.isFinite(w),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,$=I!=null?parseFloat(q(String(I).replace("%","").trim())):NaN,D=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let E=(D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite($)&&$>0)&&Number.isFinite($)?Number($):0;v&&E<=0&&(E=He);let _=E>0?Math.max(0,y*(E/100)):0;_=Number(_.toFixed(2));const C=y+_;let R=v?C*.15:0;(!Number.isFinite(R)||R<0)&&(R=0),R=Number(R.toFixed(2));const x=C+R,j=Number.isFinite(x)?Number(x.toFixed(2)):0,O=a?j:h?w:j,M=Math.max(0,c+m-g),P=Math.max(0,M-u),B={equipmentTotal:c,crewTotal:m,crewCostTotal:u,discountAmount:g,subtotalAfterDiscount:y,taxableAmount:C,taxAmount:R,finalTotal:O,companySharePercent:E,companyShareAmount:_,netProfit:P},z={equipmentTotal:q(c.toFixed(2)),crewTotal:q(m.toFixed(2)),discountAmount:q(g.toFixed(2)),subtotalAfterDiscount:q(y.toFixed(2)),taxableAmount:q(C.toFixed(2)),taxAmount:q(R.toFixed(2)),finalTotal:q(O.toFixed(2)),companySharePercent:q(E.toFixed(2)),companyShareAmount:q(_.toFixed(2)),netProfit:q(P.toFixed(2))};return{totals:B,totalsDisplay:z,rentalDays:s}}function _r({reservation:e,customer:t,project:n,technicians:a,totals:s,totalsDisplay:r,rentalDays:i,currencyLabel:c,sections:l,fieldSelections:d={},quoteNumber:u,quoteDate:m,terms:p=Ee}){const f=q(String(e?.reservationId??e?.id??"")),g=e.start?q(Qe(e.start)):"-",y=e.end?q(Qe(e.end)):"-",v=t?.customerName||t?.full_name||t?.name||"-",w=t?.phone||"-",h=t?.email||"-",I=t?.company||t?.company_name||"-",$=q(w),D=n?.title||n?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),b=n?.code||n?.projectCode||"",E=q(String(i)),_=e?.notes||"",C=Array.isArray(p)&&p.length?p:Ee,R=fr(d),x=(K,ce)=>yr(R,K,ce),j=K=>l?.has?.(K),O=`<div class="quote-placeholder">${k(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,M=(K,ce)=>`<div class="info-plain__item">${k(K)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${k(ce)}</strong></div>`,P=(K,ce,{variant:nt="inline"}={})=>nt==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${k(K)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${k(ce)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${k(K)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${k(ce)}</span>
    </span>`,B=(K,ce)=>`<div class="payment-row">
      <span class="payment-row__label">${k(K)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${k(ce)}</span>
    </div>`,z=[];x("customerInfo","customerName")&&z.push(M(o("reservations.details.labels.customer","العميل"),v)),x("customerInfo","customerCompany")&&z.push(M(o("reservations.details.labels.company","الشركة"),I)),x("customerInfo","customerPhone")&&z.push(M(o("reservations.details.labels.phone","الهاتف"),$)),x("customerInfo","customerEmail")&&z.push(M(o("reservations.details.labels.email","البريد"),h));const N=j("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${k(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:O}
      </section>`:"",A=[];x("reservationInfo","reservationId")&&A.push(M(o("reservations.details.labels.reservationId","رقم الحجز"),f||"-")),x("reservationInfo","reservationStart")&&A.push(M(o("reservations.details.labels.start","بداية الحجز"),g)),x("reservationInfo","reservationEnd")&&A.push(M(o("reservations.details.labels.end","نهاية الحجز"),y)),x("reservationInfo","reservationDuration")&&A.push(M(o("reservations.details.labels.duration","عدد الأيام"),E));const H=j("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${k(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:O}
      </section>`:"",Q=[];x("projectInfo","projectTitle")&&Q.push(M(o("reservations.details.labels.project","المشروع"),D)),x("projectInfo","projectCode")&&Q.push(M(o("reservations.details.labels.code","الرمز"),b||"-"));const ee=j("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${k(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${Q.length?`<div class="info-plain">${Q.join("")}</div>`:O}
      </section>`:"",U=[];x("financialSummary","equipmentTotal")&&U.push(P(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${r.equipmentTotal} ${c}`)),x("financialSummary","crewTotal")&&U.push(P(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${r.crewTotal} ${c}`)),x("financialSummary","discountAmount")&&U.push(P(o("reservations.details.labels.discount","الخصم"),`${r.discountAmount} ${c}`)),x("financialSummary","taxAmount")&&U.push(P(o("reservations.details.labels.tax","الضريبة"),`${r.taxAmount} ${c}`));const oe=x("financialSummary","finalTotal"),Y=[];oe&&Y.push(P(o("reservations.details.labels.total","الإجمالي النهائي"),`${r.finalTotal} ${c}`,{variant:"final"}));const re=Y.length?`<div class="totals-final">${Y.join("")}</div>`:"",V=j("financialSummary")?!U.length&&!oe?`<section class="quote-section quote-section--financial">${O}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${k(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${U.length?`<div class="totals-inline">${U.join("")}</div>`:""}
            ${re}
          </div>
        </section>`:"",ne=rr.filter(K=>x("items",K.id)),Ne=ne.length>0,Ae=Ne?ne.map(K=>`<th>${k(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",fe=Array.isArray(e.items)&&e.items.length>0?e.items.map((K,ce)=>`<tr>${ne.map(nt=>`<td>${nt.render(K,ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ne.length,1)}" class="empty">${k(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,$e=j("items")?Ne?`<section class="quote-section quote-section--table">
            <h3>${k(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ae}</tr>
              </thead>
              <tbody>${fe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${k(o("reservations.details.items.title","المعدات"))}</h3>
            ${O}
          </section>`:"",le=ir.filter(K=>x("crew",K.id)),be=le.length>0,W=be?le.map(K=>`<th>${k(K.labelKey?o(K.labelKey,K.fallback):K.fallback)}</th>`).join(""):"",se=a.length?a.map((K,ce)=>`<tr>${le.map(nt=>`<td>${nt.render(K,ce)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(le.length,1)}" class="empty">${k(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,te=j("crew")?be?`<section class="quote-section quote-section--table">
            <h3>${k(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W}</tr>
              </thead>
              <tbody>${se}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${k(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${O}
          </section>`:"",et=j("notes")?`<section class="quote-section">
        <h3>${k(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${k(_||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",Oe=[];x("payment","beneficiary")&&Oe.push(B(o("reservations.quote.labels.beneficiary","اسم المستفيد"),De.beneficiaryName)),x("payment","bank")&&Oe.push(B(o("reservations.quote.labels.bank","اسم البنك"),De.bankName)),x("payment","account")&&Oe.push(B(o("reservations.quote.labels.account","رقم الحساب"),q(De.accountNumber))),x("payment","iban")&&Oe.push(B(o("reservations.quote.labels.iban","رقم الآيبان"),q(De.iban)));const Fn=`<section class="quote-section">
      <div class="payment-block">
        <h3>${k(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${Oe.length?Oe.join(""):O}</div>
      </div>
      <p class="quote-approval-note">${k(De.approvalNote)}</p>
    </section>`,Rn=`<footer class="quote-footer">
        <h4>${k(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${C.map(K=>`<li>${k(K)}</li>`).join("")}</ul>
      </footer>`,tt=[];N&&H?tt.push(Se(`<div class="quote-section-row">${N}${H}</div>`,{blockType:"group"})):(H&&tt.push(Se(H)),N&&tt.push(Se(N))),ee&&tt.push(Se(ee));const Lt=[];$e&&Lt.push(Se($e,{blockType:"table",extraAttributes:'data-table-id="items"'})),te&&Lt.push(Se(te,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ct=[];V&&Ct.push(Se(V,{blockType:"summary"})),et&&Ct.push(Se(et));const Mn=[Se(Fn,{blockType:"payment"}),Se(Rn,{blockType:"footer"})],ve=[...us(tt,"reservations.quote.placeholder.page1"),...Lt,...us(Ct,"reservations.quote.placeholder.page2"),...Mn],Hn=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${k(De.logoUrl)}" alt="${k(De.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${k(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${k(De.companyName)}</p>
        <p class="quote-company-cr">${k(o("reservations.quote.labels.cr","السجل التجاري"))}: ${k(De.commercialRegistry)}</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${k(u)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${k(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${qc}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Hn}
          ${ve.join("")}
        </div>
      </div>
    </div>
  `}function dl(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Vt(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>dl(c)),i=[s,...r].map(c=>c.catch(l=>(Me("asset load failed",l),kc(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function $r(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await xr(r),await Vt(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=b=>{b.style.margin="0 auto",b.style.breakInside="avoid",b.style.pageBreakInside="avoid",b.style.pageBreakAfter="auto",b.style.breakAfter="auto"},m=()=>{const b=a.createElement("div"),E=s.childElementCount===0;if(b.className="quote-page",b.dataset.pageIndex=String(s.childElementCount),E){b.classList.add("quote-page--primary");const C=i.cloneNode(!0);C.removeAttribute("data-quote-header-template"),b.appendChild(C)}else b.classList.add("quote-page--continuation");const _=a.createElement("main");_.className="quote-body",b.appendChild(_),s.appendChild(b),u(b),l=b,d=_},p=()=>{(!l||!d||!d.isConnected)&&m()},f=()=>{if(!l||!d||d.childElementCount>0)return;const b=l;l=null,d=null,b.parentNode&&b.parentNode.removeChild(b)},g=()=>{l=null,d=null},y=()=>l?l.scrollHeight-l.clientHeight>xc:!1,v=(b,{allowOverflow:E=!1}={})=>(p(),d.appendChild(b),y()&&!E?(d.removeChild(b),f(),!1):!0),w=b=>{const E=b.cloneNode(!0);E.removeAttribute?.("data-quote-block"),E.removeAttribute?.("data-block-type"),E.removeAttribute?.("data-table-id"),!v(E)&&(g(),!v(E)&&v(E,{allowOverflow:!0}))},h=b=>{const E=b.querySelector("table");if(!E){w(b);return}const _=b.querySelector("h3"),C=E.querySelector("thead"),R=Array.from(E.querySelectorAll("tbody tr"));if(!R.length){w(b);return}let x=null,j=0;const O=(P=!1)=>{const B=b.cloneNode(!1);B.removeAttribute("data-quote-block"),B.removeAttribute("data-block-type"),B.removeAttribute("data-table-id"),B.classList.add("quote-section--table-fragment"),P&&B.classList.add("quote-section--table-fragment--continued");const z=_?_.cloneNode(!0):null;z&&B.appendChild(z);const N=E.cloneNode(!1);N.classList.add("quote-table--fragment"),C&&N.appendChild(C.cloneNode(!0));const A=a.createElement("tbody");return N.appendChild(A),B.appendChild(N),{section:B,body:A}},M=(P=!1)=>x||(x=O(P),v(x.section)||(g(),v(x.section)||v(x.section,{allowOverflow:!0})),x);R.forEach(P=>{M(j>0);const B=P.cloneNode(!0);if(x.body.appendChild(B),y()&&(x.body.removeChild(B),x.body.childElementCount||(d.removeChild(x.section),x=null,f()),g(),x=null,M(j>0),x.body.appendChild(B),y())){x.section.classList.add("quote-section--table-fragment--overflow"),j+=1;return}j+=1}),x=null};if(!c.length)return;c.forEach(b=>{b.getAttribute("data-block-type")==="table"?h(b):w(b)});const I=Array.from(s.children),$=[];if(I.forEach((b,E)=>{const _=b.querySelector(".quote-body");if(E!==0&&(!_||_.childElementCount===0)){b.remove();return}$.push(b)}),!n){const b=a.defaultView||window,E=Math.min(3,Math.max(1,b.devicePixelRatio||1)),_=Nn()?Math.min(2,E):E;$.forEach(C=>Kc(C,{pixelRatio:_}))}$.forEach((b,E)=>{const _=E===0;b.style.pageBreakAfter="auto",b.style.breakAfter="auto",b.style.pageBreakBefore=_?"auto":"always",b.style.breakBefore=_?"auto":"page",n?b.style.boxShadow="":b.style.boxShadow="none"});const D=$[$.length-1]||null;l=D,d=D?.querySelector(".quote-body")||null,await Vt(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ma(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ul(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Wc(),Gc()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(b=>typeof b=="string"&&b.toLowerCase().startsWith("rtl")),m=typeof window<"u"&&window.devicePixelRatio||1,p=Fa(),f=br(),g=Nn();let y;g?y=1.5:f?y=Math.min(1.7,Math.max(1.2,m*1.1)):p?y=Math.min(1.8,Math.max(1.25,m*1.2)):y=Math.min(2,Math.max(1.6,m*1.4));const v=g||f?.9:p?.92:.95,w=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),h={scale:y,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const $=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let b=0;b<s.length;b+=1){const E=s[b];await xr(E),await Vt(E);const _=E.ownerDocument||document,C=_.createElement("div");Object.assign(C.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const R=E.cloneNode(!0);R.style.width=`${ln}px`,R.style.maxWidth=`${ln}px`,R.style.minWidth=`${ln}px`,R.style.height=`${dn}px`,R.style.maxHeight=`${dn}px`,R.style.minHeight=`${dn}px`,R.style.position="relative",R.style.background="#ffffff",Ma(R),C.appendChild(R),_.body.appendChild(C);let x;try{await Vt(R),x=await i(R,{...h,scale:y,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(A){throw fa(A,"pageCapture",{toastMessage:$}),A}finally{C.parentNode?.removeChild(C)}if(!x)continue;const j=x.width||1,M=(x.height||1)/j;let P=da,B=P*M,z=0;if(B>cn){const A=cn/B;B=cn,P=P*A,z=Math.max(0,(da-P)/2)}const N=x.toDataURL("image/jpeg",v);I>0&&w.addPage(),w.addImage(N,"JPEG",z,0,P,B,`page-${I+1}`,"FAST"),I+=1,await new Promise(A=>window.requestAnimationFrame(A))}}catch(b){throw ya({safariWindowRef:n,mobileWindowRef:a}),b}if(I===0)throw ya({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(f||g){const b=w.output("blob");if(g){const E=URL.createObjectURL(b);Ot();try{window.location.assign(E)}catch(_){Me("mobile safari blob navigation failed",_)}finally{setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{const E=URL.createObjectURL(b),_=()=>f&&n&&!n.closed?n:a&&!a.closed?a:null,C=(x,j)=>{if(Ot(),!x){window.location.assign(j);return}try{x.location.replace(j),x.focus?.()}catch(O){Me("direct blob navigation failed",O);try{x.document.open(),x.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${k(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${j}" title="PDF preview"></iframe></body></html>`),x.document.close()}catch(M){Me("iframe blob delivery failed",M),window.location.assign(j)}}},R=_();C(R,E),setTimeout(()=>URL.revokeObjectURL(E),6e4)}}else{Ot();const b=w.output("bloburl"),E=document.createElement("a");E.href=b,E.download=t,E.rel="noopener",E.style.display="none",document.body.appendChild(E),E.click(),setTimeout(()=>{URL.revokeObjectURL(b),E.remove()},2e3)}}function yt(){if(!T||!F)return;const{previewFrame:e}=F;if(!e)return;const t=_r({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms});ot("render"),e.srcdoc=`<!DOCTYPE html>${t}`,e.addEventListener("load",async()=>{try{const n=e.contentDocument,a=n?.defaultView||window,s=n?.documentElement||n;s&&(hr(s),qr(s,a),Sr(s,a));const r=n?.getElementById("quotation-pdf-root");try{r&&(await $r(r,{context:"preview"}),Ma(r))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const i=Array.from(n?.querySelectorAll?.(".quote-page")||[]),c=n?.querySelector(".quote-preview-pages"),l=ln;let d=18;if(c&&n?.defaultView){const p=n.defaultView.getComputedStyle(c),f=parseFloat(p.rowGap||p.gap||`${d}`);Number.isFinite(f)&&f>=0&&(d=f)}const u=dn,m=i.length?i.length*u+Math.max(0,(i.length-1)*d):u;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(m),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${m}px`,e.style.minHeight=`${m}px`,F?.previewFrameWrapper&&!F?.userAdjustedZoom){const p=F.previewFrameWrapper.clientWidth-24;p>0&&p<l?Le=Math.max(p/l,.3):Le=1}Lr(Le)}finally{Ot()}},{once:!0})}function ml(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),Ir(T),kr(),yt())}function pl(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.fields||(T.fields=Da()),r=Lc(s,n);t.checked?r.add(a):r.delete(a),Ir(T),yt()}function fl(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ja(T,n),T.sectionExpansions[n]=t.open)}function kr(){if(!F?.toggles||!T)return;const{toggles:e}=F,t=T.fields||{};ja(T);const n=Pn.map(({id:a,labelKey:s,fallback:r})=>{const i=o(s,r),c=T.sections.has(a),l=Ba[a]||[],d=Cc(T,a),u=l.length?`<div class="quote-toggle-sublist">
          ${l.map(m=>{const p=yr(t,a,m.id),f=c?"":"disabled",g=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${a}" data-field-id="${m.id}" ${p?"checked":""} ${f}>
                <span>${k(g)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${a}" ${d?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${a}" ${c?"checked":""}>
            <span>${k(i)}</span>
          </label>
          ${l.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${u}
      </details>
    `}).join("");e.innerHTML=n,e.querySelectorAll("input[data-section-toggle]").forEach(a=>{a.addEventListener("change",ml)}),e.querySelectorAll("input[data-field-toggle]").forEach(a=>{a.addEventListener("change",pl)}),e.querySelectorAll("details[data-section-group]").forEach(a=>{a.addEventListener("toggle",fl)})}function yl(){if(F?.modal)return F;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${k(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${k(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${k(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${k(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${k(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${k(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${k(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const m=document.createElement("iframe");m.className="quote-preview-frame",m.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),m.setAttribute("loading","lazy"),m.setAttribute("frameborder","0");const p=document.createElement("div");p.className="quote-preview-zoom-controls",p.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${k(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${k(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${k(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const f=document.createElement("div");f.className="quote-preview-frame-wrapper",f.appendChild(m),n.innerHTML="";const g=document.createElement("div");g.className="quote-preview-scroll",g.appendChild(f),n.appendChild(g);const y=document.createElement("div");y.className="quote-preview-status",y.setAttribute("role","status"),y.setAttribute("aria-live","polite"),y.hidden=!0,y.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${k(lr("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(y),u.appendChild(p),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await Cr()}finally{i.disabled=!1}}});const v=()=>{ua()||ma(e)};d.forEach($=>{$?.addEventListener("click",v)}),l&&!d.includes(l)&&l.addEventListener("click",v),e.addEventListener("click",$=>{ua()||$.target===e&&ma(e)}),F={modal:e,toggles:t,preview:n,previewScroll:g,previewFrameWrapper:f,zoomControls:p,zoomValue:p.querySelector("[data-zoom-value]"),previewFrame:m,meta:a,downloadBtn:i,statusIndicator:y,statusText:y.querySelector("[data-quote-status-text]"),statusSpinner:y.querySelector("[data-quote-status-spinner]"),statusAction:y.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const w=p.querySelector("[data-zoom-out]"),h=p.querySelector("[data-zoom-in]"),I=p.querySelector("[data-zoom-reset]");return w?.addEventListener("click",()=>ys(-.1)),h?.addEventListener("click",()=>ys(.1)),I?.addEventListener("click",()=>En(1,{markManual:!0})),s&&s.addEventListener("input",bl),r&&r.addEventListener("click",vl),En(Le),F}function En(e,{silent:t=!1,markManual:n=!1}={}){Le=Math.min(Math.max(e,.25),2.2),n&&F&&(F.userAdjustedZoom=!0),Lr(Le),!t&&F?.zoomValue&&(F.zoomValue.textContent=`${Math.round(Le*100)}%`)}function ys(e){En(Le+e,{markManual:!0})}function Lr(e){if(!F?.previewFrame||!F.previewFrameWrapper)return;const t=F.previewFrame,n=F.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Fa()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function gl(){if(!F?.meta||!T)return;const{meta:e}=F;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${k(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${k(T.quoteNumber)}</strong></div>
      <div><span>${k(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${k(T.quoteDateLabel)}</strong></div>
    </div>
  `}function Ha(){if(!F?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Ee).join(`
`);F.termsInput.value!==e&&(F.termsInput.value=e)}function bl(e){if(!T)return;const t=ca(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Ee],Ha();const n=Ee.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}yt()}function vl(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Ee];const t=document.getElementById("reservation-terms");t&&(t.value=Ee.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ee.join(`
`)),Ha(),yt()}async function Cr(){if(!T)return;ot("export");const t=!Fa()&&br(),n=Nn(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${k(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${k(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${k(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Me("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Xc(),Wn("html2pdf ensured");const l=_r({reservation:T.reservation,customer:T.customer,project:T.project,technicians:T.technicians,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),hr(i),qr(i),Sr(i),Wn("export container prepared");const d=i.firstElementChild;if(d){d.setAttribute("dir","rtl"),d.style.direction="rtl",d.style.textAlign="right",d.setAttribute("data-theme","light"),d.classList.remove("dark","dark-mode"),d.style.margin="0",d.style.padding="0",d.style.width="210mm",d.style.maxWidth="210mm",d.style.marginLeft="auto",d.style.marginRight="auto",d.scrollTop=0,d.scrollLeft=0;try{await $r(d,{context:"export"}),await Vt(d),Ma(d),Wn("layout complete for export document")}catch(m){fa(m,"layoutQuoteDocument",{suppressToast:!0})}}const u=`quotation-${T.quoteNumber}.pdf`;await ul(d,{filename:u,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(el(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){ya({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,fa(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Ot()}}function hl(){const e=yl();e?.modal&&(Ht=!1,Le=1,F&&(F.userAdjustedZoom=!1),En(Le,{silent:!0}),kr(),gl(),Ha(),yt(),$c(e.modal))}async function ql({reservation:e,customer:t,project:n}){if(!e){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=cl(e),{totalsDisplay:s,totals:r,rentalDays:i}=ll(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=Zc(),u=new Date,m=gc();T={reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,sections:new Set(Pn.filter(p=>p.defaultSelected).map(p=>p.id)),sectionExpansions:gr(),fields:Da(),terms:m,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:il(u),sequenceCommitted:!1},rl(T),hl()}function Sl({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Gt(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=Z(),d=Array.isArray(s)?s:c||[],u=new Map((l||[]).map(v=>[String(v.id),v])),m=document.getElementById(e);if(!m){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){m.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const p=t||oc(),f=new Map(i.map(v=>[String(v.id),v])),g=new Map(d.map(v=>[String(v.id),v])),y=uc({reservations:r,filters:p,customersMap:f,techniciansMap:g,projectsMap:u});if(y.length===0){m.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}m.innerHTML=`<div class="reservations-grid">${mc({entries:y,customersMap:f,techniciansMap:g,projectsMap:u})}</div>`,m.querySelectorAll('[data-action="details"]').forEach(v=>{const w=Number(v.dataset.reservationIndex);Number.isNaN(w)||v.addEventListener("click",()=>{typeof n=="function"&&n(w)})}),m.querySelectorAll('button[data-action="confirm"]').forEach(v=>{const w=Number(v.dataset.reservationIndex);Number.isNaN(w)||v.addEventListener("click",h=>{h.stopPropagation(),typeof a=="function"&&a(w,h)})})}function El(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=Z(),c=s[e];if(!c)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const l=r.find(w=>String(w.id)===String(c.customerId)),d=c.projectId?i.find(w=>String(w.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const w=Gt()||[];u.innerHTML=pc(c,l,w,e,d)}const m=document.getElementById("reservationDetailsModal"),p=()=>{m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(m)?.hide()},f=document.getElementById("reservation-details-edit-btn");f&&(f.onclick=()=>{p(),typeof t=="function"&&t(e,{reservation:c,customer:l,getEditContext:a})});const g=document.getElementById("reservation-details-delete-btn");g&&(g.onclick=()=>{p(),typeof n=="function"&&n(e,{reservation:c,customer:l})});const y=u?.querySelector('[data-action="open-project"]');y&&d&&y.addEventListener("click",()=>{p();const w=d?.id!=null?String(d.id):"",h=w?`projects.html?project=${encodeURIComponent(w)}`:"projects.html";window.location.href=h});const v=document.getElementById("reservation-details-export-btn");return v&&(v.onclick=async w=>{w?.preventDefault?.(),w?.stopPropagation?.(),v.blur();try{await ql({reservation:c,customer:l,project:d})}catch(h){console.error("❌ [reservations] export to PDF failed",h),S(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),m&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(m).show(),!0}function Tr(){const e=()=>{Xt(),pe(),Gt()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let gs=!1,bs=null;function wl(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function ed(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=wl(n);if(!a&&gs&&it().length>0&&s===bs)return it();try{const r=await Ps(n||{});return gs=!0,bs=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return it()}}async function xl(e,{onAfterChange:t}={}){if(!ut())return Kt(),!1;const a=it()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Zi(s),Tr(),t?.({type:"deleted",reservation:a}),S(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=xn(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return S(i,"error"),!1}}async function Il(e,{onAfterChange:t}={}){const a=it()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Je(a);if(r)return S(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await eo(s);return Tr(),t?.({type:"confirmed",reservation:i}),S(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=xn(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return S(c,"error"),!1}}function Zt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:zt(e,n),end:zt(t,a)}}function gt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,hs(t);return}const l=pt(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},m=mt(u)||d.image,p=m?`<img src="${m}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',f=q(String(d.count)),g=Number.isFinite(Number(d.unitPrice))?Number(d.unitPrice):0,y=Number.isFinite(Number(d.totalPrice))?Number(d.totalPrice):g*d.count,v=`${q(g.toFixed(2))} ${a}`,w=`${q(y.toFixed(2))} ${a}`,h=d.barcodes.map($=>q(String($||""))).filter(Boolean),I=h.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${h.map($=>`<li>${$}</li>`).join("")}
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
          <td>${v}</td>
          <td>${w}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),hs(t)}function Al(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Bn(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Dn();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,vs();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${q(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${q(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?q(Qe(s.recordedAt)):"—",d=Al(s?.type),u=s?.note?q(s.note):"";return`
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
  `,vs()}function _l(){if(Ut()){S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Br(e);let a=Dr(t);if(!Number.isFinite(a)||a<=0){S(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Yn.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const p=Math.max(0,100-i);if(p<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const g=q(f.toFixed(2));S(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",g)),a=f}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const p=Math.max(0,r-c);if(p<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const f=Math.min(a,p);if(f!==a){const g=`${q(f.toFixed(2))} ${l}`;S(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",g)),a=f}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const m={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};jl(m),Oa(Dn()),Bn(),Ie(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),S(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function vs(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(Ut()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}_l()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(Ut()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Fl(s),Oa(Dn()),Bn(),Ie(),S(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function $l(e){const{index:t,items:n}=bt(),s=pt(n).find(c=>c.key===e);if(!s)return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);vt(t,i),gt(i),Ie()}function kl(e){const{index:t,items:n}=bt(),a=n.filter(s=>Yt(s)!==e);a.length!==n.length&&(vt(t,a),gt(a),Ie())}function Ll(e){const{index:t,items:n}=bt(),s=pt(n).find(v=>v.key===e);if(!s)return;const{start:r,end:i}=Zt();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=Z(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(v=>J(v.barcode))),{equipment:m=[]}=Z(),p=(m||[]).find(v=>{const w=J(v?.barcode);return!w||u.has(w)||Yt({desc:v?.desc||v?.description||v?.name||"",price:Number(v?.price)||0})!==e||!Hs(v)?!1:!Xe(w,r,i,d)});if(!p){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const f=J(p.barcode),g=_t(p);if(!g){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...n,{id:g,equipmentId:g,barcode:f,desc:p.desc||p.description||p.name||s.description||"",qty:1,price:Number.isFinite(Number(p.price))?Number(p.price):s.unitPrice,image:mt(p)}];vt(t,y),gt(y),Ie()}function hs(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){$l(s);return}if(a==="increase-edit-group"&&s){Ll(s);return}if(a==="remove-edit-group"&&s){kl(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Pl(i)}}),e.dataset.groupListenerAttached="true")}function Ut(){return!!document.getElementById("edit-res-project")?.value}function Cl(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{Ut()&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Tl(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(Cl),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Ie(){const e=document.getElementById("edit-res-summary");if(!e)return;Bn();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),ye(a),Ie()}),a.dataset.listenerAttached="true");const s=q(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=Ut();Tl(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",m=c?"unpaid":u&&a?.value||"unpaid";let p=null;!c&&d&&(xe("edit-res-company-share"),p=wt("edit-res-company-share"),(!Number.isFinite(p)||p<=0)&&(xe("edit-res-company-share"),p=wt("edit-res-company-share")));const{items:f=[],payments:g=[]}=bt(),{start:y,end:v}=Zt(),w=Yn({items:f,discount:r,discountType:i,applyTax:d,paidStatus:m,start:y,end:v,companySharePercent:p,paymentHistory:g});e.innerHTML=w;const h=Yn.lastResult;if(h&&a){const I=h.paymentStatus;u?ye(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,ye(a,I))}else a&&ye(a,a.value)}function Pl(e){if(e==null)return;const{index:t,items:n}=bt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);vt(t,a),gt(a),Ie()}function Nl(e){const t=e?.value??"",n=J(t);if(!n)return;const a=Tn(n);if(!a){S(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=Ye(a);if(s==="maintenance"||s==="retired"){S($t(s));return}const r=J(n),{index:i,items:c=[]}=bt();if(c.findIndex(v=>J(v.barcode)===r)>-1){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=Zt();if(!d||!u){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:m=[]}=Z(),p=i!=null&&m[i]||null,f=p?.id??p?.reservationId??null;if(Xe(r,d,u,f)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const g=_t(a);if(!g){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...c,{id:g,equipmentId:g,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];vt(i,y),e&&(e.value=""),gt(y),Ie()}function wn(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Zs(t),a=J(n?.barcode||t);if(!n||!a){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=Ye(n);if(s==="maintenance"||s==="retired"){S($t(s));return}const{start:r,end:i}=Zt();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=bt();if(l.some(y=>J(y.barcode)===a)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=Z(),m=c!=null&&u[c]||null,p=m?.id??m?.reservationId??null;if(Xe(a,r,i,p)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const f=_t(n);if(!f){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...l,{id:f,equipmentId:f,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];vt(c,g),gt(g),Ie(),e.value=""}function Pr(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),wn(e))});const t=()=>{er(e.value,"edit-res-equipment-description-options")&&wn(e)};e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}typeof document<"u"&&document.addEventListener("language:changed",()=>{Ie()});typeof window<"u"&&(window.getEditReservationDateRange=Zt,window.renderEditPaymentHistory=Bn);function Bl(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){ia(e);return}wn(e)}}function td(){kt(),Pr()}function Dl(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let Qt=null,je=[],Ce=[],ga=null,de={},Xn=!1;function ba(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function va(){return document.getElementById("edit-res-confirmed")?.value==="true"}function bt(){return{index:Qt,items:je,payments:Ce}}function vt(e,t,n=Ce){Qt=typeof e=="number"?e:null,je=Array.isArray(t)?[...t]:[],Ce=Array.isArray(n)?[...n]:[]}function Nr(){Qt=null,je=[],so(),Ce=[]}function Dn(){return[...Ce]}function Oa(e){Ce=Array.isArray(e)?[...e]:[]}function jl(e){e&&(Ce=[...Ce,e])}function Fl(e){!Number.isInteger(e)||e<0||(Ce=Ce.filter((t,n)=>n!==e))}function Rl(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Br(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Dr(e){if(!e)return null;const t=q(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ml(e,t){if(e){e.value="";return}}function jt(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function jr(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(q(String(e.value??""))),a=Number.parseFloat(q(String(e.amount??""))),s=Number.parseFloat(q(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Hl(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${jt(a)}</option>`];i.forEach(l=>{c.push(`<option value="${jt(l.id)}">${jt(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${jt(r)}">${jt(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Fr(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t)return;if(!!e?.value)t.checked=!1,t.disabled=!0,t.classList.add("disabled"),n&&n.checked&&(n.checked=!1),n&&(n.disabled=!0,n.classList.add("disabled"));else{const s=t.disabled;t.disabled=!1,t.classList.remove("disabled"),s&&(t.checked=!1),n&&(n.disabled=!1,n.classList.remove("disabled"))}ha("tax")}function ha(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=de?.updateEditReservationSummary;typeof r=="function"&&r()};if(Xn){a();return}Xn=!0;const s=()=>{Xn=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(He)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),xe("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?xe("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function qs(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=Z(),u=it()?.[e];if(!u){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}de={...de,reservation:u,projects:l||[]},t?.(),Hl(l||[],u);const m=u.projectId&&l?.find?.(N=>String(N.id)===String(u.projectId))||null,{effectiveConfirmed:p,projectLinked:f}=Je(u,m),g=u.items?u.items.map(N=>({...N,equipmentId:N.equipmentId??N.equipment_id??N.id,barcode:J(N?.barcode)})):[],v=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(N=>jr(N)).filter(Boolean);vt(e,g,v);const w=o("reservations.list.unknownCustomer","غير معروف"),h=c?.find?.(N=>String(N.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const I=document.getElementById("edit-res-id");I&&(I.value=u.reservationId||u.id);const $=document.getElementById("edit-res-customer");$&&($.value=h?.customerName||w);const D=typeof a=="function"?a(u.start):{date:"",time:""},b=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",D.date),n?.("edit-res-start-time",D.time),n?.("edit-res-end",b.date),n?.("edit-res-end-time",b.time);const E=document.getElementById("edit-res-notes");E&&(E.value=u.notes||"");const _=document.getElementById("edit-res-discount");_&&(_.value=q(u.discount??0));const C=document.getElementById("edit-res-discount-type");C&&(C.value=u.discountType||"percent");const R=u.projectId?!1:!!u.applyTax,x=document.getElementById("edit-res-tax");x&&(x.checked=R);const j=document.getElementById("edit-res-company-share");if(j){const N=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,A=N!=null?Number.parseFloat(q(String(N).replace("%","").trim())):NaN,H=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,Q=H!=null?H===!0||H===1||H==="1"||String(H).toLowerCase()==="true":Number.isFinite(A)&&A>0,ee=Q&&Number.isFinite(A)&&A>0?A:He,U=R||Q;j.checked=U,j.dataset.companyShare=String(ee)}ba(p,{disable:f});const O=document.getElementById("edit-res-paid"),M=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");O&&(O.value=M,O.dataset&&delete O.dataset.userSelected);const P=document.getElementById("edit-res-payment-progress-type"),B=document.getElementById("edit-res-payment-progress-value");if(P?.dataset?.userSelected&&delete P.dataset.userSelected,P&&(P.value="percent"),Ml(B),to((u.technicians||[]).map(N=>String(N))),s?.(g),typeof window<"u"){const N=window?.renderEditPaymentHistory;typeof N=="function"&&N()}Fr(),r?.();const z=document.getElementById("editReservationModal");ga=Rl(z,i),ga?.show?.()}async function Ol({combineDateTime:e,hasEquipmentConflict:t,hasTechnicianConflict:n,updateEditReservationSummary:a,renderReservations:s,populateEquipmentDescriptionLists:r,handleReservationsMutation:i}={}){if(Qt===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const c=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",d=document.getElementById("edit-res-end")?.value?.trim(),u=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",m=document.getElementById("edit-res-notes")?.value||"",p=q(document.getElementById("edit-res-discount")?.value||"0"),f=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent",y=va(),v=document.getElementById("edit-res-paid"),w=v?.dataset?.userSelected==="true",h=w&&v?.value||"unpaid",I=document.getElementById("edit-res-payment-progress-type"),$=document.getElementById("edit-res-payment-progress-value"),D=Br(I),b=Dr($),E=document.getElementById("edit-res-project")?.value||"",_=no(),C=document.getElementById("edit-res-company-share"),R=document.getElementById("edit-res-tax");if(!c||!d){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const x=typeof e=="function"?e:(W,se)=>`${W}T${se||"00:00"}`,j=x(c,l),O=x(d,u);if(j&&O&&new Date(j)>new Date(O)){S(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const P=it()?.[Qt];if(!P){S(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(je)||je.length===0&&_.length===0){S(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const B=typeof t=="function"?t:()=>!1,z=P.id??P.reservationId;for(const W of je){const se=Ye(W.barcode);if(se==="reserved"){const te=J(W.barcode);if(!B(te,j,O,z))continue}if(se!=="available"){S($t(se));return}}for(const W of je){const se=J(W.barcode);if(B(se,j,O,z)){S(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const N=typeof n=="function"?n:()=>!1;for(const W of _)if(N(W,j,O,z)){S(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const A=Array.isArray(de.projects)&&de.projects.length?de.projects:Z().projects||[],H=E&&A.find(W=>String(W.id)===String(E))||null,Q={...P,projectId:E?String(E):null,confirmed:y},{effectiveConfirmed:ee,projectLinked:U,projectStatus:oe}=Je(Q,H);let Y=!!C?.checked,re=!!R?.checked;if(U&&(Y&&(C.checked=!1,Y=!1),re=!1),!U&&Y!==re){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(xe("edit-res-company-share"),Y=!!C?.checked);let V=Y?getCompanySharePercent("edit-res-company-share"):null;Y&&(!Number.isFinite(V)||V<=0)&&(xe("edit-res-company-share"),V=getCompanySharePercent("edit-res-company-share"));const ne=Y&&re&&Number.isFinite(V)&&V>0,Ne=U?!1:re,Ae=Is(je,f,g,Ne,_,{start:j,end:O,companySharePercent:ne?V:0});let _e=Dn();if(Number.isFinite(b)&&b>0){const W=Ae;let se=null,te=null;D==="amount"?(se=b,W>0&&(te=b/W*100)):(te=b,W>0&&(se=b/100*W));const et=jr({type:D,value:b,amount:se,percentage:te,recordedAt:new Date().toISOString()});et&&(_e=[..._e,et],Oa(_e)),$&&($.value="")}const fe=As({totalAmount:Ae,history:_e}),$e=_s({manualStatus:h,paidAmount:fe.paidAmount,paidPercent:fe.paidPercent,totalAmount:Ae});v&&!w&&(v.value=$e,v.dataset&&delete v.dataset.userSelected);let le=P.status??"pending";U?le=H?.status??oe??le:["completed","cancelled"].includes(String(le).toLowerCase())||(le=y?"confirmed":"pending");const be=$s({reservationCode:P.reservationCode??P.reservationId??null,customerId:P.customerId,start:j,end:O,status:le,title:P.title??null,location:P.location??null,notes:m,projectId:E?String(E):null,totalAmount:Ae,discount:f,discountType:g,applyTax:Ne,paidStatus:$e,confirmed:ee,items:je.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:_,companySharePercent:ne?V:null,companyShareEnabled:ne,paidAmount:fe.paidAmount,paidPercentage:fe.paidPercent,paymentProgressType:fe.paymentProgressType,paymentProgressValue:fe.paymentProgressValue,paymentHistory:_e});try{const W=await ao(P.id||P.reservationId,be);await Ps(),Xt(),pe(),S(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),a?.(),Nr(),i?.({type:"updated",reservation:W}),s?.(),r?.(),ga?.hide?.()}catch(W){console.error("❌ [reservationsEdit] Failed to update reservation",W);const se=xn(W)?W.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(se,"error")}}function nd(e={}){de={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=de,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=q(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ha("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{ha("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=q(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const m=document.getElementById("edit-res-project");m&&!m.dataset.listenerAttached&&(m.addEventListener("change",()=>{Fr();const v=Array.isArray(de.projects)&&de.projects.length?de.projects:Z().projects||[],w=m.value&&v.find(b=>String(b.id)===String(m.value))||null,I={...de?.reservation??{},projectId:m.value||null,confirmed:va()},{effectiveConfirmed:$,projectLinked:D}=Je(I,w);ba($,{disable:D}),t?.()}),m.dataset.listenerAttached="true");const p=document.getElementById("edit-res-confirmed-btn");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{if(p.disabled)return;const v=!va();ba(v),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("save-reservation-changes");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{Ol(de).catch(v=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",v)})}),f.dataset.listenerAttached="true");const g=document.getElementById("edit-res-equipment-barcode");if(g&&!g.dataset.listenerAttached){let v=null;const w=()=>{g.value?.trim()&&(clearTimeout(v),v=null,n?.(g))};g.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),w())});const h=()=>{if(clearTimeout(v),!g.value?.trim())return;const{start:I,end:$}=getEditReservationDateRange();!I||!$||(v=setTimeout(()=>{w()},150))};g.addEventListener("input",h),g.addEventListener("change",w),g.dataset.listenerAttached="true"}Pr?.();const y=document.getElementById("editReservationModal");y&&!y.dataset.cleanupAttached&&(y.addEventListener("hidden.bs.modal",()=>{Nr(),t?.(),s?.([])}),y.dataset.cleanupAttached="true")}const zl=Z()||{};let we=(zl.projects||[]).map(Ql),en=!1;function ad(){return we}function jn(e){we=Array.isArray(e)?e.map(Va):[],Sa({projects:we});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return we}async function Vl(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await Te(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(za);return jn(i),en=!0,we}async function Ul({force:e=!1,params:t=null}={}){if(!e&&en&&we.length>0)return we;try{return await Vl(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),we}}async function sd(e){const t=await Te("/projects/",{method:"POST",body:e}),n=za(t?.data??{}),a=[...we,n];return jn(a),en=!0,n}async function rd(e,t){const n=await Te(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=za(n?.data??{}),s=we.map(r=>String(r.id)===String(e)?a:r);return jn(s),en=!0,a}async function id(e){await Te(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=we.filter(n=>String(n.id)!==String(e));jn(t),en=!0}function od({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:m=[],taxAmount:p=0,totalWithTax:f=0,confirmed:g=!1,technicians:y=[],equipment:v=[]}={}){const w=Array.isArray(y)?y.map(b=>Number.parseInt(String(b),10)).filter(b=>Number.isInteger(b)&&b>0):[],h=Array.isArray(v)?v.map(b=>{const E=Number.parseInt(String(b.equipmentId??b.equipment_id??b.id??0),10),_=Number.parseInt(String(b.qty??b.quantity??0),10);return!Number.isInteger(E)||E<=0?null:{equipment_id:E,quantity:Number.isInteger(_)&&_>0?_:1}}).filter(Boolean):[],I=Array.isArray(m)?m.map(b=>{const E=Number.parseFloat(b?.amount??b?.value??0)||0,_=(b?.label??b?.name??"").trim();return _?{label:_,amount:Math.round(E*100)/100}:null}).filter(Boolean):[],$=I.reduce((b,E)=>b+(E?.amount??0),0),D={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round($*100)/100,tax_amount:Math.round((Number.parseFloat(p)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(f)||0)*100)/100,confirmed:!!g,technicians:w,equipment:h,expenses:I};return e&&(D.project_code=String(e).trim()),D.end_datetime||delete D.end_datetime,D.client_company||(D.client_company=null),D}function za(e={}){return Va(e)}function Ql(e={}){return Va(e)}function Va(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(l=>{if(l==null)return null;if(typeof l=="object"){const d=l.id??l.technician_id??l.technicianId;return d!=null?String(d):null}return String(l)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(l=>{const d=l?.equipment_id??l?.equipmentId??l?.id??null,u=l?.quantity??l?.qty??0,m=l?.barcode??l?.code??"",p=l?.description??l?.name??"";return{equipmentId:d!=null?String(d):null,qty:Number.parseInt(String(u),10)||0,barcode:m,description:p}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((l,d)=>({id:l?.id??`expense-${t??"x"}-${d}`,label:l?.label??"",amount:Number.parseFloat(l?.amount??0)||0}));return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(l=>typeof l=="object"?l:{id:l}),equipment:r,expenses:c}}function cd(e){return e instanceof Ss}function ld(){return Ul().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=Z()||{};ro(e||[]),tr()})}function Ua(e=null){tr(),Rr(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Kl(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function qa(){return{populateEquipmentDescriptionLists:kt,setFlatpickrValue:Dl,splitDateTime:ws,renderEditItems:gt,updateEditReservationSummary:Ie,addEquipmentByDescription:Bl,addEquipmentToEditingReservation:Nl,addEquipmentToEditingByDescription:wn,combineDateTime:zt,hasEquipmentConflict:Xe,hasTechnicianConflict:xs,renderReservations:Rr,handleReservationsMutation:Ua,ensureModal:Kl}}function Rr(e="reservations-list",t=null){Sl({containerId:e,filters:t,onShowDetails:Mr,onConfirmReservation:Or})}function Mr(e){return El(e,{getEditContext:qa,onEdit:(t,{reservation:n})=>{zr(t,n)},onDelete:Hr})}function Hr(e){return ut()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?xl(e,{onAfterChange:Ua}):!1:(Kt(),!1)}function Or(e){return Il(e,{onAfterChange:Ua})}function zr(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}qs(e,qa());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}qs(e,qa());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}Ki({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function dd(){typeof window>"u"||(window.showReservationDetails=Mr,window.deleteReservation=Hr,window.confirmReservation=Or,window.editReservation=zr)}export{Ua as A,ad as B,id as C,Vl as D,cd as E,sd as F,Cn as a,pc as b,pe as c,Rr as d,ed as e,Xl as f,nr as g,od as h,ka as i,rd as j,Ul as k,ld as l,za as m,ie as n,dd as o,Jl as p,Zl as q,Je as r,Mr as s,nd as t,Yl as u,td as v,tr as w,Ie as x,qa as y,X as z};
