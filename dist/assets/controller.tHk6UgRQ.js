import{n as v,l as ye,A as wc,t as o,a as it,s as E,u as Zt,c as On,d as xa,b as Ui,z as Ac,f as Je,B as Ki,o as xc}from"./auth.CqiyQgTP.js";import{A as te,B as ft,C as Qi,E as Ic,D as Ct,F as js,v as Ke,G as Gi,H as gi,I as Dn,J as Fn,K as Ia,L as _c,M as Ns,N as yt,O as Bs,P as vn,Q as Wi,R as Xi,S as kc,T as $c,U as Pc,V as Ji,W as en,X as oa,Y as Cc,Z as _a,_ as Yi,$ as Zi,a as Ds,l as Fs,m as Rs,a0 as er,a1 as Lc,s as fn,b as ka,a2 as Tc,a3 as tr,a4 as jc,i as Ms,r as Nt,a5 as nr,a6 as kt,a7 as ca,z as qe,x as je,q as $a,y as ar,a8 as Nc,a9 as rs,h as sr,g as Qt,aa as Bc,ab as Dc,k as ir,ac as os,ad as Fc,u as Rc,ae as Mc,af as zc,ag as Oc,ah as Hc}from"./reservationsService.CLYaWj1D.js";const Ja="select.form-select:not([data-no-enhance]):not([multiple])",bt=new WeakMap;let Ya=null,hi=!1,vt=null;function yp(e=document){e&&(e.querySelectorAll(Ja).forEach(t=>na(t)),!Ya&&e===document&&(Ya=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ja)&&na(a),a.querySelectorAll?.(Ja).forEach(s=>na(s)))})}),Ya.observe(document.body,{childList:!0,subtree:!0})),hi||(hi=!0,document.addEventListener("pointerdown",Kc,{capture:!0})))}function ta(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){na(e);return}const t=e.closest(".enhanced-select");t&&(zs(t),la(t),cs(t))}function na(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){ta(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};bt.set(t,r),a.addEventListener("click",()=>Uc(t)),a.addEventListener("keydown",i=>Qc(i,t)),s.addEventListener("click",i=>Wc(i,t)),s.addEventListener("keydown",i=>Gc(i,t)),e.addEventListener("change",()=>{la(t),rr(t)}),r.observer=new MutationObserver(i=>{let c=!1,l=!1;for(const d of i)d.type==="attributes"&&d.attributeName==="disabled"&&(l=!0),d.type==="childList"&&(c=!0);l&&cs(t),c&&Vc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),zs(t),la(t),cs(t)}function Vc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,zs(t),la(t)})))}function zs(e){const t=bt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),rr(e)}function la(e){const t=bt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function rr(e){const t=bt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function cs(e){const t=bt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Uc(e){bt.get(e)&&(e.getAttribute("data-open")==="true"?qn(e):or(e))}function or(e){const t=bt.get(e);if(!t)return;vt&&vt!==e&&qn(vt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),vt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function qn(e,{focusTrigger:t=!0}={}){const n=bt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),vt===e&&(vt=null))}function Kc(e){if(!vt)return;const t=e.target;t instanceof Node&&(vt.contains(t)||qn(vt,{focusTrigger:!1}))}function Qc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),or(t)):n==="Escape"&&qn(t)}function Gc(e,t){const n=e.key,a=bt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&cr(i,t)}else n==="Escape"&&(e.preventDefault(),qn(t))}function Wc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&cr(n,t)}function cr(e,t){const n=bt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),qn(t)}const Sn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let qt=null;function Os(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function lr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Xc(e={}){const t={...e};return t.barcode&&(t.barcode=v(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Jc(e={}){const t=Xc({...e,activatedAt:Date.now()});return qt=t,lr(!0,t.mode||"create"),Os(Sn.change,{active:!0,selection:{...t}}),t}function da(e="manual"){if(!qt)return;const t=qt;qt=null,lr(!1),Os(Sn.change,{active:!1,previous:t,reason:e})}function dr(){return!!qt}function Yc(){return qt?{...qt}:null}function Zc(e){if(!qt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=v(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const l=c.map(u=>v(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!l.length)return!1;const d=Number.isInteger(s)&&s>0?s:l.length;t={barcodes:l,quantity:Math.min(d,l.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Os(Sn.requestAdd,{...t,selection:{...qt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||da("tab-changed")});const el=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),tl=new Set(["maintenance","reserved","retired"]);function nl(e){const t=String(e??"").trim().toLowerCase();return t&&el.get(t)||"available"}function al(e){return e?typeof e=="object"?e:Pa(e):null}function wt(e){const t=al(e);return t?nl(t.status||t.state||t.statusLabel||t.status_label):"available"}function Hs(e){return!tl.has(wt(e))}function tn(e={}){return e.image||e.imageUrl||e.img||""}function sl(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ye();return(n||[]).find(a=>te(a?.barcode)===t)||null}function Pa(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ye();return(n||[]).find(a=>te(a?.barcode)===t)||null}const il=ye()||{};let $t=(il.equipment||[]).map(cl),ls=!1,dn="",Vt=null,Wt=null,Xt=null,Ca=!1,vi=!1;function rl(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function ol(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function cl(e={}){return Vs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function La(e={}){return Vs(e)}function Vs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=Hn(e.quantity??e.qty??0),i=Ta(e.unit_price??e.price??0),c=v(String(e.barcode??"").trim()),l=Me(e.status??e.state??e.status_label??e.statusLabel??"available"),d=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:ll(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:l,image:d,imageUrl:d,created_at:e.created_at??null,updated_at:e.updated_at??null}}function ll(e){return e!=null&&e!==""}function Hn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function Ta(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function dl(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=v(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function qi(e){if(!e)return"";const t=v(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=v(String(n?.barcode??"")).trim();if(a)return a}return""}function ul(e,t){const n=qi(e),a=qi(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}else{if(r!==i)return r?-1:1;{const d=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(d!==0)return d}}const c=ua(e?.desc||e?.description||e?.name||""),l=ua(t?.desc||t?.description||t?.name||"");return c.localeCompare(l,"ar",{sensitivity:"base"})}function Ce(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Me(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function pl(e){return Me(e)}function ds(){if(!dr())return null;const e=Yc();return e?{...e}:null}function ml(e){const t=ds();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],l=new Set;if(n.forEach(f=>{const p=te(f?.barcode);!p||l.has(p)||(l.add(p),c.push({variant:f,barcode:p}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:p})=>p),maxQuantity:f,reason:""}}const d=c.filter(({variant:f})=>Hs(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=d.filter(({barcode:f})=>!ft(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let y=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(d.length>0)y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:p})=>Me(p?.status)));f.has("maintenance")?y=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?y=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(y=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:d[0]?.barcode||c[0].barcode,reason:y,availableBarcodes:[],maxQuantity:0}}function fl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function ur(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=ds();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=ds(),l=c?.mode||c?.source||"";l==="package-manager"||l==="equipment-packages"?da("package-finish-button"):(da("return-button"),fl())}),t.dataset.listenerAttached="true")}function Ye(){return $t}function Jt(e){$t=Array.isArray(e)?e.map(Vs):[],xa({equipment:$t}),ol()}function ua(e){return String(e??"").trim().toLowerCase()}function Lt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=ua(t);return n||(n=ua(e.category||"")),n||(n=v(String(e.barcode||"")).trim().toLowerCase()),n}function ja(e){const t=Lt(e);return t?Ye().filter(n=>Lt(n)===t):[]}function Na(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=Ba(e);if(n){const a=Ce(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ce(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function Us(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function pa(){const e=Us();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Ks(e={}){const t=Us();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?v(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?v(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function yn(e){Ca=e;const t=Us(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function yl(e){if(!Zt()){On();return}if(!e)return;try{await gl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let l=0;if(i.forEach(d=>{const u=d.القسم??d.category??"",y=d["القسم الثانوي"]??d.subcategory??"",f=d.الوصف??d.description??d.name??"",p=d.الكمية??d.quantity??0,m=d.السعر??d.price??0,g=d.الباركود??d.barcode??"",h=d.الحالة??d.status??"متاح",_=d.الصورة??d.image_url??d.image??"",q=v(String(g||"")).trim();if(!f||!q){l+=1;return}c.push(Qs({category:u,subcategory:y,description:f,quantity:p,unit_price:m,barcode:q,status:h,image_url:_}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const d=await it("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(d?.data)?d.data.map(La):[];if(u.length){const p=[...Ye(),...u];Jt(p)}await Vn({showToastOnError:!1}),Fe();const y=d?.meta?.count??u.length,f=[];y&&f.push(`${y} ✔️`),l&&f.push(`${l} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(d){const u=wn(d,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const bl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let kn=null;function gl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):kn||(kn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=bl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),kn=null,e}),kn)}function Qs({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const l=v(String(r||"")).trim(),d=pl(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:Hn(a),unit_price:Ta(s),barcode:l,status:d,image_url:c?.trim()||null}}async function pr(){if(!Zt()){On();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await it("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await Vn({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=wn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function Ba(e){return e.image||e.imageUrl||e.img||""}function hl(e){const t=Me(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function ma(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ce(a)}</td></tr>`}n&&(n.textContent="0")}function mr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=Vt?.groupKey||Lt(e);if(!r){ma();return}const i=Ye().filter(y=>Lt(y)===r).sort((y,f)=>{const p=String(y.barcode||"").trim(),m=String(f.barcode||"").trim();return!p&&!m?0:p?m?p.localeCompare(m,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){ma();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),l=o("equipment.form.labels.quantity","الكمية"),d=Ye(),u=i.map(y=>{const f=y.id&&e.id?String(y.id)===String(e.id):String(y.barcode||"")===String(e.barcode||""),p=f?"equipment-variants-table__row--current":"",m=Ce(String(y.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Ce(c)}</span>`:"",h=v(String(Number.isFinite(Number(y.qty))?Number(y.qty):0)),_=d.indexOf(y),q=Ce(o("equipment.item.actions.delete","🗑️ حذف")),A=_>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${_}">${q}</button>
          </div>`:"";return`
        <tr class="${p}">
          <td>
            ${m}
            ${g}
          </td>
          <td>${hl(y.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ce(l)}">${h}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function vl({item:e,index:t}){const n=Ba(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Zt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},l=Number.isFinite(Number(e.qty))?Number(e.qty):0,d=Number.isFinite(Number(e.price))?Number(e.price):0,u=l.toLocaleString("en-US"),y=d.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,p=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,m=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(l-f-p,0),g=m.toLocaleString("en-US"),h=o("equipment.card.labels.availableOfTotal","من أصل"),_=Me(e.status);let q=`${Ce(c.available)}: ${Ce(g)} ${Ce(h)} ${Ce(u)}`,A="available";if(m===0){const M={reserved:{text:l===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},W=M[_]||M.default;q=Ce(W.text),A=W.modifier}const j=`<span class="equipment-card__availability equipment-card__availability--${A}">${q}</span>`,U="",S=e.desc||e.name||"—",I=e.name&&e.name!==e.desc?e.name:"",k=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${y} ${r}`}].map(({label:M,value:W})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${W}</span>
            </span>
          `).join("")}
    </div>`,O=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),$=O.length?`<div class="equipment-card__categories">${O.map(({label:M,value:W})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${W}</span>
            </div>
          `).join("")}</div>`:"",N=I?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${I}</span>
      </div>`:"",C=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${S}</h3>
    </div>
  `}
      ${k}
    </div>
  `,B=[],x=ml(e),Y=x?.availableBarcodes?.length?x.availableBarcodes.join(","):x?.barcode?x.barcode:"";let K="",F="";if(x.active){const M=`equipment-select-qty-${t}`,W=!!x.canSelect,ie=W?Math.max(1,Number(x.maxQuantity||x.availableBarcodes?.length||1)):1,ne=Math.max(1,Math.min(ie,99)),ue=[];for(let se=1;se<=ne;se+=1){const Ae=v(String(se));ue.push(`<option value="${se}"${se===1?" selected":""}>${Ae}</option>`)}const H=W?"":" disabled",oe=o("reservations.create.equipment.selector.quantityLabel","الكمية"),Ee=W?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${v(String(ie))}`:x.reason?x.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${oe}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${H}>
          ${ue.join("")}
        </select>
        ${Ee?`<span class="equipment-card__selection-hint">${Ce(Ee)}</span>`:""}
      </div>
    `;const we=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Te=W?"":" disabled",Q=x.reason?` title="${Ce(x.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${W?ie:0}"`];Y&&Z.push(`data-selection-barcodes="${Ce(Y)}"`),e.groupKey&&Z.push(`data-selection-group="${Ce(String(e.groupKey))}"`),F=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Te}${Q}>${we}</button>
    `}i&&B.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const D=B.length?B.join(`
`):"",R=Ce(S);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ce(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${R}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${U}
        ${j}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${C}
        </div>
      </div>
      <div class="equipment-card__body">
        ${$}
        ${N}
      </div>
      ${K||F||D?`<div class="equipment-card__actions equipment-card__actions--center">
            ${K}
            ${F}
            ${D}
          </div>`:""}
    </article>
  `}function ql(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,a.appendChild(l)}),t.includes(i)&&(a.value=i),ta(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const l=document.createElement("option");l.value=c,l.textContent=c,s.appendChild(l)}),n.includes(i)&&(s.value=i),ta(s)}const r=document.getElementById("filter-status");r&&ta(r)}function En(){const e=ye();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return $t=t||[],$t;const s=new Date;let r=!1;const i=new Set((a||[]).filter(l=>l?.status==="open").map(l=>v(String(l?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(l=>{if(!l)return l;const d=Me(l.status),u=v(String(l.barcode??"")).trim().toLowerCase(),y=u&&i.has(u);let f=y?"maintenance":"available";if(!y&&u)for(const p of n||[]){if(!Sl(p,s))continue;if(p.items?.some(g=>v(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==d?(r=!0,{...l,status:f}):{...l,status:f}});return r?Jt(c):($t=c,xa({equipment:$t})),$t}function Sl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Za(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Fe(){const e=document.getElementById("equipment-list");if(!e)return;ur();const t=En(),n=Array.isArray(t)?t:Ye(),a=new Map;n.forEach(g=>{if(!g)return;const h=Lt(g);h&&(a.has(h)||a.set(h,[]),a.get(h).push(g))});const s=Array.from(a.values()).map(g=>{const h=g[0],_=g.reduce((I,P)=>I+(Number.isFinite(Number(P.qty))?Number(P.qty):0),0),q=["maintenance","reserved","available","retired"],A=g.map(I=>Me(I.status)).sort((I,P)=>q.indexOf(I)-q.indexOf(P))[0]||"available",j=g.reduce((I,P)=>{const k=Hn(P?.qty??0)||0,O=Me(P?.status);return O==="reserved"?I.reserved+=k:O==="maintenance"&&(I.maintenance+=k),I},{reserved:0,maintenance:0}),U=Math.max(_-j.reserved-j.maintenance,0);return{item:{...h,qty:_,status:A,variants:g,groupKey:Lt(h),reservedQty:j.reserved,maintenanceQty:j.maintenance,availableQty:U},index:n.indexOf(h)}});s.sort((g,h)=>ul(g.item,h.item));const r=document.getElementById("search-equipment")?.value||"",i=v(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",l=document.getElementById("filter-sub")?.value||"",d=document.getElementById("filter-status")?.value||"",u=d?Me(d):"";if(ls&&!n.length){e.innerHTML=Za(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(dn&&!n.length){e.innerHTML=Za(dn,{tone:"error",icon:"⚠️"});return}const y=s.filter(({item:g})=>{const h=v(String(g.barcode??"")).toLowerCase().trim(),_=Array.isArray(g.variants)?g.variants.map(S=>v(String(S.barcode??"")).toLowerCase().trim()).filter(Boolean):[],q=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||h&&h.includes(i)||_.some(S=>S.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),A=!c||g.category===c,j=!l||g.sub===l,U=!u||Me(g.status)===u;return q&&A&&j&&U}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),p=y;e.innerHTML=p.length?p.map(vl).join(""):Za(f);const m=document.getElementById("equipment-list-count");if(m){const g=o("equipment.list.countSuffix","عنصر"),h=v(String(p.length)),_=p.length?`${h} ${g}`:`0 ${g}`;m.textContent=_}ql(n)}async function Vn({showToastOnError:e=!0}={}){ls=!0,dn="",Fe();try{const t=await it("/equipment/?all=1"),n=t?.data??t;let a=[];Array.isArray(n)?a=n:n&&typeof n=="object"&&(Array.isArray(n.items)?a=n.items:Array.isArray(n.results)?a=n.results:Array.isArray(n.data)?a=n.data:Array.isArray(n.records)&&(a=n.records));const s=a.map(La);Jt(s)}catch(t){t&&typeof t=="object"&&Number(t.status)===401?dn="":(dn=wn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(dn,"error"))}finally{ls=!1,Fe()}}function wn(e,t,n){if(e instanceof Ui){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function El(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=v(a).trim(),r=Ta(t.querySelector("#new-equipment-price")?.value||"0"),i=Hn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",l=t.querySelector("#new-equipment-category")?.value?.trim()||"",d=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const y=Qs({category:l,subcategory:d,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await it("/equipment/",{method:"POST",body:y}),p=La(f?.data),m=[...Ye(),p];Jt(m),Fe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const p=wn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(p,"error")}}async function fr(e){if(!Zt()){On();return}const t=Ye(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await it(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Jt(a),Fe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=wn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function wl(e,t){const n=Ye(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Jt(r),Fe();return}const s=Qs({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await it(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=La(r?.data),c=[...n];c[e]=i,Jt(c),Fe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=wn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Yn(){Fe()}function yr(e){const n=Ye()[e];if(!n)return;Wt=e;const a=ja(n),s=a[0]||n,r=a.reduce((l,d)=>l+(Number.isFinite(Number(d.qty))?Number(d.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(l=>Me(l.status)).sort((l,d)=>i.indexOf(l)-i.indexOf(d))[0]||Me(s.status);document.getElementById("edit-equipment-index").value=e,Ks({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:Ba(s)||"",barcode:s.barcode||"",status:s.status||c}),yn(!1),Xt=pa(),Na(s),mr(s),Vt={groupKey:Lt(s),barcode:String(s.barcode||""),id:s.id||null},rl(document.getElementById("editEquipmentModal"))?.show()}function Al(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const d=(t.dataset.selectionBarcodes||"").split(",").map(p=>p.trim()).filter(p=>p.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",y=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Zc({barcodes:d,quantity:i,groupKey:y,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||fr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||yr(s)}}function xl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||yr(n)}}function Il(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||fr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function br(){if(!Vt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Ye(),a=Vt.id?n.find(l=>String(l.id)===String(Vt.id)):null,s=Vt.groupKey,r=s?n.find(l=>Lt(l)===s):null,i=a||r;if(!i){ma();return}const c=n.findIndex(l=>l===i);if(c>=0){const l=document.getElementById("edit-equipment-index");l&&(l.value=String(c)),Wt=c}if(mr(i),!Ca){const l=ja(i),d=l[0]||i,u=l.reduce((p,m)=>p+(Number.isFinite(Number(m.qty))?Number(m.qty):0),0),y=["maintenance","reserved","available","retired"],f=l.map(p=>Me(p.status)).sort((p,m)=>y.indexOf(p)-y.indexOf(m))[0]||Me(d.status);Ks({category:d.category||"",subcategory:d.sub||"",description:d.desc||d.description||"",quantity:String(u||d.qty||0),price:d.price!=null?String(d.price):"0",image:Ba(d)||"",barcode:d.barcode||"",status:d.status||f}),Xt=pa()}Na(primary)}function _l(){document.getElementById("search-equipment")?.addEventListener("input",Yn),document.getElementById("filter-category")?.addEventListener("change",Yn),document.getElementById("filter-sub")?.addEventListener("change",Yn),document.getElementById("filter-status")?.addEventListener("change",Yn),document.getElementById("add-equipment-form")?.addEventListener("submit",El);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),pr().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",Al),t.addEventListener("keydown",xl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",Il),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);dl(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!Ca){Xt=pa(),yn(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:Hn(document.getElementById("edit-equipment-quantity").value)||1,price:Ta(document.getElementById("edit-equipment-price").value)||0,barcode:v(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await wl(t,n),Xt=pa(),yn(!1),br()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{_l(),Fe(),Vn();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Xt&&Ks(Xt),Wt!=null){const a=Ye()[Wt];if(a){const r=ja(a)[0]||a;Na(r)}}yn(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Fe(),yn(Ca),Wt!=null){const t=Ye()[Wt];if(t){const a=ja(t)[0]||t;Na(a)}}});document.addEventListener("equipment:refreshRequested",()=>{Vn({showToastOnError:!1})});document.addEventListener(wc.USER_UPDATED,()=>{Fe()});document.addEventListener("equipment:changed",()=>{br()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{Vt=null,ma(),Wt=null,Xt=null,yn(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!vi&&(document.addEventListener(Sn.change,()=>{ur(),Fe()}),vi=!0);const bp=Object.freeze(Object.defineProperty({__proto__:null,clearEquipment:pr,refreshEquipmentFromApi:Vn,renderEquipment:Fe,syncEquipmentStatuses:En,uploadEquipmentFromExcel:yl},Symbol.toStringTag,{value:"Module"})),kl="__DEBUG_CREW__";function $l(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(kl);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Si(e,t){if($l())try{console.log(`🪵 [crew-debug:create] ${e}`,t)}catch{}}const gr="projects:create:draft",hr="projects.html#projects-section";let us=null,vr=[],ps=new Map,ms=new Map,fa=new Map,es=!1,aa=null,Ei=!1,qr=[];function Pl(e){if(!e)return null;let t=qr.find(a=>a.id===e)||null;if(t)return t;const n=Xi(e);return n?(t={id:e,name:$c(n)||e,price:kc(n),items:Ns(n),raw:n},t):null}function ya(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ba(e){return v(String(e||"")).trim().toLowerCase()}function Cl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=v(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Sr(e){const t=v(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Er(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function wr(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ar(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=v(String(t))}}function Yt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function Gs(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function nn(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function We(){const{input:e,hidden:t}=nn();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function Ot(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function xr(e,t,{allowPartial:n=!1}={}){const a=Ke(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function fs(e,t={}){return xr(ps,e,t)}function ys(e,t={}){return xr(ms,e,t)}function Xe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Ir(e){vr=Array.isArray(e)?[...e]:[]}function Ws(){return vr}function Xs(e){return e&&Ws().find(t=>String(t.id)===String(e))||null}function wi(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function bn(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??Ct,a=v(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:Ct}function st(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??Ct,a=v(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=Ct),t.dataset.companyShare=String(s),t.checked=!0}function bs(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(es){pe();return}es=!0;const a=()=>{es=!1,pe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),st()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?st():n.checked&&(n.checked=!1));a()}function Ll(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function Ai(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function xi(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function St({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=Gs();if(!n||!a||!s)return;const r=js()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const l=new Set;ps=new Map;const d=r.filter(p=>p&&p.id!=null).map(p=>({id:String(p.id),label:xi(p)||c})).filter(p=>{if(!p.label)return!1;const m=Ke(p.label);return!m||l.has(m)?!1:(l.add(m),ps.set(m,p),!0)}).sort((p,m)=>p.label.localeCompare(m.label,void 0,{sensitivity:"base"}));s.innerHTML=d.map(p=>`<option value="${ya(p.label)}"></option>`).join("");const u=t?"":n.value,y=e?String(e):a.value?String(a.value):"",f=y?r.find(p=>String(p.id)===y):null;if(f){const p=xi(f)||c;a.value=String(f.id),n.value=p,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function gn({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=nn();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ws()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const l=[...i].filter(g=>g&&g.id!=null).sort((g,h)=>String(h.createdAt||h.start||"").localeCompare(String(g.createdAt||g.start||""))),d=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),y=new Set;ms=new Map;const f=l.map(g=>{const h=wi(g)||u;return{id:String(g.id),label:h}}).filter(g=>{if(!g.label)return!1;const h=Ke(g.label);return!h||y.has(h)?!1:(y.add(h),ms.set(h,g),!0)});r.innerHTML=f.map(g=>`<option value="${ya(g.label)}"></option>`).join("");const p=e?String(e):s.value?String(s.value):"",m=p?l.find(g=>String(g.id)===p):null;if(m){const g=wi(m)||u;s.value=String(m.id),a.value=g,a.dataset.selectedId=String(m.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":d}function ga(e,t,n){const{date:a,time:s}=Wi(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function _r(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||gn({selectedValue:a});const r=(js()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";St(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=Ai(e,"start"),l=Ai(e,"end");c&&ga("res-start","res-start-time",c),l&&ga("res-end","res-end-time",l);const d=document.getElementById("res-notes");d&&e.description&&(t||!d.value)&&(d.value=e.description),pe(),Tt()}function kr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ye(),s=Array.isArray(a)?a:[];Ir(s);const r=t!=null?String(t):n.value?String(n.value):"";gn({selectedValue:r,projectsList:s}),Tt(),pe()}function Tt(){const{input:e,hidden:t}=nn(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),l=document.getElementById("res-discount-type"),d=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),y=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(Ot(n,We),a&&Ot(a,We)),s&&Ot(s,We),r&&Ot(r,We),i&&Ot(i,We),c&&Ot(c,We),l&&Ot(l,We),y)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=d),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=d),s&&(s.value="unpaid",Xe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=d),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=d),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=d),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=d),l&&(l.value="percent",l.disabled=!0,l.classList.add("reservation-input-disabled"),l.title=d);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.disabled=!1,l.classList.remove("reservation-input-disabled"),l.title="")}bs("tax"),pe()}function Js(){const{input:e,hidden:t}=nn();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?ys(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Xs(r.id);i?_r(i,{skipProjectSelectUpdate:!0}):(Tt(),pe())}else t.value="",e.dataset.selectedId="",Tt(),pe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?ys(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Ys(){const{input:e,hidden:t}=Gs();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?fs(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),pe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?fs(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Tl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){Tn({clearValue:!0});return}let n=null;try{const d=decodeURIComponent(t);n=JSON.parse(d)}catch(d){console.warn("⚠️ [reservations/createForm] Failed to decode project context",d)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),Tn({clearValue:!1}),!n)return;n.fromProjectForm&&(aa={draftStorageKey:n.draftStorageKey||gr,returnUrl:n.returnUrl||hr});const r=document.getElementById("res-project");if(n.projectId){r&&(gn({selectedValue:String(n.projectId)}),Tt());const d=Xs(n.projectId);d?_r(d,{forceNotes:!!n.forceNotes}):pe(),Tn()}else{r&&gn({selectedValue:""});const d=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Gl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),d)}n.start&&ga("res-start","res-start-time",n.start),n.end&&ga("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(js()||[]).find(y=>String(y.id)===String(n.customerId));u?.id!=null&&(St({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(St({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):St({selectedValue:""});const l=document.getElementById("res-notes");l&&n.description&&!l.value&&(l.value=n.description),pe()}function an(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Dn(e,n),end:Dn(t,a)}}function $r(e){const t=ba(e);if(t){const c=fa.get(t);if(c)return c}const{description:n,barcode:a}=Sr(e);if(a){const c=Pa(a);if(c)return c}const s=Ke(n||e);if(!s)return null;let r=Ji();if(!r?.length){const c=ye();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&tr(r)}const i=r.find(c=>Ke(c?.desc||c?.description||"")===s);return i||r.find(c=>Ke(c?.desc||c?.description||"").includes(s))||null}function Pr(e,t="equipment-description-options"){const n=ba(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(l=>ba(l.value)===n)||fa.has(n))return!0;const{description:s}=Sr(e);if(!s)return!1;const r=Ke(s);return r?(Ji()||[]).some(c=>Ke(c?.desc||c?.description||"")===r):!1}const jl={available:0,reserved:1,maintenance:2,retired:3};function Nl(e){return jl[e]??5}function Ii(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Bl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${Ii(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${Ii(n)})`}function jt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=En(),a=ye(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];tr(r);const i=new Map;r.forEach(d=>{const u=Cl(d),y=ba(u);if(!y||!u)return;const f=wt(d),p=Nl(f),m=i.get(y);if(!m){i.set(y,{normalized:y,value:u,bestItem:d,bestStatus:f,bestPriority:p,statuses:new Set([f])});return}m.statuses.add(f),p<m.bestPriority&&(m.bestItem=d,m.bestStatus=f,m.bestPriority=p,m.value=u)}),fa=new Map;const l=Array.from(i.values()).sort((d,u)=>d.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(d=>{fa.set(d.normalized,d.bestItem);const u=Bl(d),y=ya(d.value);if(u===d.value)return`<option value="${y}"></option>`;const f=ya(u);return`<option value="${y}" label="${f}"></option>`}).join("");e&&(e.innerHTML=l),t&&(t.innerHTML=l)}function Cr(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=an();if(!r||!i){const m=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(m),{success:!1,message:m}}const c=yt();if(Zs(c).has(s)){const m=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(m),{success:!1,message:m}}const d=Bs(s,r,i);if(d.length){const m=d.map(h=>h.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`);return a||E(g),{success:!1,message:g}}if(ft(s,r,i)){const m=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(m),{success:!1,message:m}}const u=Pa(s);if(!u){const m=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(m),{success:!1,message:m}}const y=wt(u);if(y==="maintenance"||y==="retired"){const m=Yt(y);return a||E(m),{success:!1,message:m}}const f=en(u);if(!f){const m=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(m),{success:!1,message:m}}Ia({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:tn(u)}),t&&(t.value=""),At(),pe();const p=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(p),{success:!0,message:p,barcode:s}}function gs(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=$r(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=sl(n.barcode),s=wt(a||n);if(s==="maintenance"||s==="retired"){E(Yt(s));return}const r=te(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=en(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:tn(n)},{start:l,end:d}=an();if(!l||!d){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=yt();if(Zs(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=Bs(r,l,d);if(f.length){const p=f.map(m=>m.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${p}`));return}if(ft(r,l,d)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}Ia(c),At(),pe(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Dl(){jt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),gs(e))});const t=()=>{Pr(e.value,"equipment-description-options")&&gs(e)};e.addEventListener("focus",()=>{if(jt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function _i(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Zs(e=yt()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Fl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=an();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Jc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Sn.change,t=>{_i(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),_i(e,dr()))}function Rl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const l=[],d=new Set;r.forEach(y=>{const f=te(y);f&&!d.has(f)&&(d.add(f),l.push(f))});const u=Math.min(s,l.length);for(let y=0;y<u;y+=1){const f=l[y],p=Cr(f,null,{silent:!0});p.success&&(i+=1),p.message&&(c=p.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",v(String(i)));E(f)}else c&&E(c)}function Lr(){Fl(),!(Ei||typeof document>"u")&&(document.addEventListener(Sn.requestAdd,Rl),Ei=!0)}function Un(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function hs(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=Un();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),jc(t),t==="package"&&Da()}function Da(){const{packageSelect:e,packageHint:t}=Un();if(!e)return;const n=Qi();qr=n,Ic(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const l=Number.isFinite(Number(c.price))?Number(c.price):0,d=v(l.toFixed(2)),u=`${c.name} — ${d} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),Nr()}function Ml(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||v(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const l=i.map(d=>d.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${l})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function Tr(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Fn(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=Pl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(p=>p?.type==="package"&&Fn(p.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(_c(r,n,a,s)){const p=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${p} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:Ns(i.raw??{}),l=Zs(t),d=[],u=new Set;if(c.forEach(p=>{const m=te(p?.normalizedBarcode??p?.barcode);if(m){if(u.has(m)){d.push({item:p,type:"internal"});return}u.add(m),l.has(m)&&d.push({item:p,type:"external"})}}),d.length){const p=d.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>v(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:d.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",p):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",p),duplicates:d}}const y=[];return c.forEach(p=>{const m=te(p?.normalizedBarcode??p?.barcode);if(m&&ft(m,n,a,s)){const g=Bs(m,n,a,s);y.push({item:p,blockingPackages:g})}}),y.length?{success:!1,reason:"item_conflict",message:Ml(i,y),conflicts:y}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(p=>({equipmentId:p?.equipmentId??null,barcode:p?.barcode??p?.normalizedBarcode??"",normalizedBarcode:te(p?.normalizedBarcode??p?.barcode),desc:p?.desc??"",qty:Number.isFinite(Number(p?.qty))?Number(p.qty):1,price:Number.isFinite(Number(p?.price))?Number(p.price):0})),image:c.find(p=>p?.image)?.image??null},packageInfo:i}}function jr(e,{silent:t=!1}={}){const n=Fn(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=an(),r=yt(),i=Tr(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const l={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||l)}return i}return Ia(i.package),At(),pe(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function Nr(){const{packageSelect:e}=Un();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;jr(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function zl(){const{packageAddButton:e,packageSelect:t}=Un();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}jr(n)}),e.dataset.listenerAttached="true")}function Br(){const{modeRadios:e}=Un();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&hs(s.target.value)}),a.dataset.listenerAttached="true")}),zl(),Nr();const t=oa(),n=e.find(a=>a.value===t);n&&(n.checked=!0),hs(t)}function At(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=yt(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),l=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const d=vn(n);t.innerHTML=d.map(u=>{const y=u.items[0]||{},f=tn(y)||u.image,p=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=v(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,h=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,_=`${v(g.toFixed(2))} ${s}`,q=`${v(h.toFixed(2))} ${s}`,A=u.items.some(I=>I?.type==="package"),j=u.barcodes.map(I=>v(String(I||""))).filter(Boolean),U=j.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${j.map(I=>`<li>${I}</li>`).join("")}
            </ul>
          </details>`:"";let S="";if(A){const I=new Map;if(u.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(k=>{if(!k)return;const O=te(k.barcode||k.desc||Math.random()),$=I.get(O);if($){$.qty+=Number.isFinite(Number(k.qty))?Number(k.qty):1;return}I.set(O,{desc:k.desc||k.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(k.qty))?Number(k.qty):1,barcode:k.barcode??k.normalizedBarcode??""})})}),I.size){const P=Array.from(I.values()).map(k=>{const O=v(String(k.qty)),$=k.desc||v(String(k.barcode||"")),N=k.barcode?` <span class="reservation-package-items__barcode">(${v(String(k.barcode))})</span>`:"";return`<li>${$}${N} × ${O}</li>`}).join("");S=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${p}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${A?`${S||""}${U||""}`:U}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${A?"disabled":""}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${_}</td>
          <td>${q}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${l}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Ol(e){const t=yt(),a=vn(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(Cc(s),At(),pe())}function Hl(e){const t=yt(),n=t.filter(a=>_a(a)!==e);n.length!==t.length&&(Yi(n),At(),pe())}function Vl(e){const t=yt(),a=vn(t).find(y=>y.key===e);if(!a)return;const{start:s,end:r}=an();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(y=>te(y.barcode))),{equipment:c=[]}=ye(),l=(c||[]).find(y=>{const f=te(y?.barcode);return!f||i.has(f)||_a({desc:y?.desc||y?.description||y?.name||"",price:Number(y?.price)||0})!==e||!Hs(y)?!1:!ft(f,s,r)});if(!l){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const d=te(l.barcode),u=en(l);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}Ia({id:u,equipmentId:u,barcode:d,desc:l.desc||l.description||l.name||a.description||"",qty:1,price:Number.isFinite(Number(l.price))?Number(l.price):a.unitPrice,image:tn(l)}),At(),pe()}function pe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(v(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),l=c?.value||"unpaid",{start:d,end:u}=an();i&&st();const y=bn(),f=document.getElementById("res-payment-progress-type"),p=document.getElementById("res-payment-progress-value"),m=Er(f),g=wr(p);Gi(),gi({selectedItems:yt(),discount:n,discountType:s,applyTax:i,paidStatus:l,paymentProgressType:m,paymentProgressValue:g,start:d,end:u,companySharePercent:y,paymentHistory:[]});const h=gi.lastResult;h?(Ar(p,h.paymentProgressValue),c&&(c.value=h.paymentStatus,Xe(c,h.paymentStatus))):Xe(c,l)}function Ul(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=v(c.target.value),pe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",pe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(We()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}bs("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(We()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}bs("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(We()){s.value="unpaid",Xe(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Xe(s),pe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(We()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",pe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(We()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=v(c.target.value),pe()}),i.dataset.listenerAttached="true"),pe()}function Kl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){pe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),pe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function ki(){const{input:e,hidden:t}=Gs(),{input:n,hidden:a}=nn(),{customers:s}=ye();let r=t?.value?String(t.value):"";if(!r&&e?.value){const H=fs(e.value,{allowPartial:!0});H&&(r=String(H.id),t&&(t.value=r),e.value=H.label,e.dataset.selectedId=r)}const i=s.find(H=>String(H.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let l=a?.value?String(a.value):"";if(!l&&n?.value){const H=ys(n.value,{allowPartial:!0});H&&(l=String(H.id),a&&(a.value=l),n.value=H.label,n.dataset.selectedId=l)}const d=document.getElementById("res-start").value,u=document.getElementById("res-end").value,y=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const p=`${d}T${y}`,m=`${u}T${f}`,g=new Date(p),h=new Date(m);if(Number.isNaN(g.getTime())||Number.isNaN(h.getTime())||g>=h){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const _=Gi();_.map(H=>H.technicianId).filter(Boolean);const q=yt();if(q.length===0&&_.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",j=parseFloat(v(document.getElementById("res-discount")?.value))||0,U=document.getElementById("res-discount-type")?.value||"percent",S=document.getElementById("res-payment-status"),I=S?.value||"unpaid",P=document.getElementById("res-payment-progress-type"),k=document.getElementById("res-payment-progress-value"),O=Er(P),$=wr(k),N=l?Xs(l):null,X=Ll(N);if(l&&!N){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const H of q){const oe=wt(H.barcode);if(oe==="maintenance"||oe==="retired"){E(Yt(oe));return}}for(const H of q){const oe=te(H.barcode);if(ft(oe,p,m)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const H of _)if(H?.technicianId&&Zi(H.technicianId,p,m)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const C=document.getElementById("res-tax"),B=document.getElementById("res-company-share"),x=!!l;x?(C&&(C.checked=!1,C.disabled=!0,C.classList.add("disabled"),C.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),S&&(S.value="unpaid",S.disabled=!0,Xe(S,"unpaid"),S.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),P&&(P.disabled=!0,P.classList.add("disabled")),k&&(k.value="",k.disabled=!0,k.classList.add("disabled"))):(C&&(C.disabled=!1,C.classList.remove("disabled"),C.title=""),B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),S&&(S.disabled=!1,S.title=""),P&&(P.disabled=!1,P.classList.remove("disabled")),k&&(k.disabled=!1,k.classList.remove("disabled")));const Y=x?!1:C?.checked||!1,K=!!B?.checked;if(!x&&K!==Y){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let F=K?bn():null;K&&(!Number.isFinite(F)||F<=0)&&(st(),F=bn());const D=K&&Y&&Number.isFinite(F)&&F>0;Y&&st();const R=Ds(q,j,U,Y,_,{start:p,end:m,companySharePercent:D?F:0}),M=Ac(),W=Fs({totalAmount:R,progressType:O,progressValue:$,history:[]});k&&Ar(k,W.paymentProgressValue);const ie=[];W.paymentProgressValue!=null&&W.paymentProgressValue>0&&ie.push({type:W.paymentProgressType||O,value:W.paymentProgressValue,amount:W.paidAmount,percentage:W.paidPercent,recordedAt:new Date().toISOString()});const ne=Rs({manualStatus:I,paidAmount:W.paidAmount,paidPercent:W.paidPercent,totalAmount:R});S&&(S.value=ne,Xe(S,ne));const ue=er({reservationCode:M,customerId:c,start:p,end:m,status:X?"confirmed":"pending",title:null,location:null,notes:A,projectId:l||null,totalAmount:R,discount:x?0:j,discountType:x?"percent":U,applyTax:Y,paidStatus:x?"unpaid":ne,confirmed:X,items:q.map(H=>({...H,equipmentId:H.equipmentId??H.id})),crewAssignments:_,companySharePercent:x||!D?null:F,companyShareEnabled:x?!1:D,paidAmount:x?0:W.paidAmount,paidPercentage:x?0:W.paidPercent,paymentProgressType:x?null:W.paymentProgressType,paymentProgressValue:x?null:W.paymentProgressValue,paymentHistory:x?[]:ie});try{Si("about to submit",{crewAssignments:_,techniciansPayload:ue?.technicians,payload:ue});const H=await Lc(ue);Si("server response",{reservation:H?.id??H?.reservationId??H?.reservation_code,technicians:H?.technicians,crewAssignments:H?.crewAssignments,techniciansDetails:H?.techniciansDetails}),En(),jt(),fn(),Wl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof us=="function"&&us({type:"created",reservation:H}),Ql(H)}catch(H){console.error("❌ [reservations/createForm] Failed to create reservation",H);const oe=ka(H)?H.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(oe,"error"),x&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),Tn({clearValue:!1}))}}function Ql(e){if(!aa)return;const{draftStorageKey:t=gr,returnUrl:n=hr}=aa,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}aa=null,n&&(window.location.href=n)}function Tn({clearValue:e=!1}={}){const{input:t,hidden:n}=nn();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,Tt())}function Gl(e,t=""){const{input:n,hidden:a}=nn();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),Tt())}function Wl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),St({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),Tn({clearValue:!1}),gn({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Xe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Tc(),Yi([]),da("form-reset"),At(),Tt(),pe()}function Xl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Ol(s);return}if(a==="increase-group"&&s){Vl(s);return}if(a==="remove-group"&&s){Hl(s);return}}),e.dataset.listenerAttached="true")}function Jl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(oa()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,Cr(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||oa()!=="single")return;const{start:r,end:i}=an();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Yl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await ki()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await ki()}),t.dataset.listenerAttached="true")}function gp({onAfterSubmit:e}={}){us=typeof e=="function"?e:null;const{customers:t,projects:n}=ye();Pc(t||[]),St(),Ys(),Ir(n||[]),kr({projectsList:n}),Js(),jt(),Da(),Dl(),Lr(),Br(),Kl(),Ul(),Xl(),Jl(),Yl(),Tl(),pe(),At()}function Dr(){jt(),Da(),kr(),St(),Ys(),Js(),Lr(),Br(),At(),pe()}if(typeof document<"u"){const e=()=>{St(),gn({projectsList:Ws()}),Ys(),Js(),pe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{jt()}),document.addEventListener("packages:changed",()=>{Da(),oa()==="package"&&hs("package")})}typeof window<"u"&&(window.getCompanySharePercent=bn);function Fr(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:Ht(t),endDate:Ht(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:Ht(n),endDate:Ht(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:Ht(n),endDate:Ht(a)}}return e==="upcoming"?{startDate:Ht(t),endDate:""}:{startDate:"",endDate:""}}function Zl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=v(t?.value||"").trim(),i=v(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),ha(t),ha(n),r="",i=""),!r&&!i&&c){const d=Fr(c);r=d.startDate,i=d.endDate}return{searchTerm:Ke(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function hp(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=v(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const l=document.getElementById("reservation-date-range");l&&(l.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{ed(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),ha(a),ha(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function ed(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=Fr(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function Ht(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function ha(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Zn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function td(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function nd(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=td(n);if(a!==null)return a}return null}function $i(e,t=0){const n=nd(e);if(n!=null)return n;const a=Zn(e.createdAt??e.created_at);if(a!=null)return a;const s=Zn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Zn(e.start);if(r!=null)return r;const i=Zn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function ad({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((q,A)=>({reservation:q,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",l=t.searchCustomerName||"",d=t.searchProjectId||"",u=t.startDate||"",y=t.endDate||"",f=t.status||"",p=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,m=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,h=y?new Date(`${y}T23:59:59`):null,_=r.filter(({reservation:q})=>{const A=n.get(String(q.customerId)),j=s?.get?.(String(q.projectId)),U=q.start?new Date(q.start):null,S=Ms(q),{effectiveConfirmed:I}=Nt(q,j);if(p!=null&&String(q.customerId)!==String(p)||m!=null&&!(Array.isArray(q.technicians)?q.technicians.map(N=>String(N)):[]).includes(String(m))||f==="confirmed"&&!I||f==="pending"&&I||f==="completed"&&!S||g&&U&&U<g||h&&U&&U>h)return!1;if(c){const $=[q.reservationId,q.id,q.reservation_id,q.reservationCode,q.reservation_code,q.code,q.reference,q.referenceNumber,q.reference_number],N=Ke($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=c.replace(/\s+/g,"");if(!N.includes(X))return!1}if(l&&!Ke(A?.customerName||"").includes(l))return!1;if(d){const $=[q.projectId,q.project_id,q.projectID,j?.id,j?.projectCode,j?.project_code],N=Ke($.filter(C=>C!=null&&C!=="").map(String).join(" ")).replace(/\s+/g,""),X=d.replace(/\s+/g,"");if(!N.includes(X))return!1}if(!i)return!0;const P=q.items?.map?.($=>`${$.barcode} ${$.desc}`).join(" ")||"",k=(q.technicians||[]).map($=>a.get(String($))?.name).filter(Boolean).join(" ");return Ke([q.reservationId,A?.customerName,q.notes,P,k,j?.title].filter(Boolean).join(" ")).includes(i)});return _.sort((q,A)=>{const j=$i(q.reservation,q.index),U=$i(A.reservation,A.index);return j!==U?U-j:A.index-q.index}),_}function sd({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),l=o("reservations.list.itemsCountShort","{count} عنصر"),d=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),y=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),p=o("reservations.list.payment.unpaid","💳 غير مدفوع"),m=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),h=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),_=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),q={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:j})=>{const U=t.get(String(A.customerId)),S=A.projectId?a?.get?.(String(A.projectId)):null,I=Ms(A),P=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),k=P==="paid",O=P==="partial",{effectiveConfirmed:$,projectLinked:N}=Nt(A,S),X=$?"status-confirmed":"status-pending",C=k?"status-paid":O?"status-partial":"status-unpaid";let B=`<span class="reservation-chip status-chip ${X}">${$?u:y}</span>`;const x=k?f:O?m:p;let Y=`<span class="reservation-chip status-chip ${C}">${x}</span>`,K=k?" tile-paid":O?" tile-partial":" tile-unpaid";I&&(K+=" tile-completed");let F="";I&&(B=`<span class="reservation-chip status-chip status-completed">${u}</span>`,Y=`<span class="reservation-chip status-chip status-completed">${x}</span>`,F=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const D=!N&&!$?`<button class="tile-confirm" data-reservation-index="${j}" data-action="confirm">${g}</button>`:"",R=D?`<div class="tile-actions">${D}</div>`:"",M=A.items?.length||0,W=Array.isArray(A.crewAssignments)?A.crewAssignments:[],ie=(A.technicians||[]).map(ae=>n.get(String(ae))).filter(Boolean),ne=W.length?W.map(ae=>{const G=ae.positionLabel??ae.position_name??ae.role??o("reservations.crew.positionFallback","منصب بدون اسم"),ge=ae.technicianName??n.get(String(ae.technicianId??""))?.name??null;return ge?`${v(G)} (${v(ge)})`:v(G)}):ie.map(ae=>ae.name),ue=ne.length?ne.join(d):"—",H=v(String(A.reservationId??"")),oe=A.start?v(Je(A.start)):"-",Ee=A.end?v(Je(A.end)):"-",we=v(String(A.cost??0)),Te=v(String(M)),Q=A.notes?v(A.notes):c,Z=l.replace("{count}",Te),se=A.applyTax?`<small>${r}</small>`:"";let Ae=h;return A.projectId&&(Ae=S?.title?v(S.title):_),`
      <div class="${D?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${F} data-reservation-index="${j}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${H}</div>
          <div class="tile-badges">
            ${B}
            ${Y}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${q.client}</span>
            <span class="tile-value">${U?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.project}</span>
            <span class="tile-value">${Ae}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.end}</span>
            <span class="tile-value tile-inline">${Ee}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.cost}</span>
            <span class="tile-value">${we} ${s} ${se}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.equipment}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${q.crew}</span>
            <span class="tile-value">${ne.length?ue:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${Q}</span>
          </div>
        </div>
        ${R}
      </div>
    `}).join("")}function Ue(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ts(e){if(e==null)return"";const t=String(e).trim();return t?v(t):""}function Pi(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=Nt(e,s),c=e.paid===!0||e.paid==="paid",l=Ms(e),d=e.items||[],{groups:u}=nr(e),{technicians:y=[]}=ye(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(y)?y:[]),p=new Map;f.forEach(b=>{if(!b||b.id==null)return;const V=String(b.id),le=p.get(V)||{};p.set(V,{...le,...b})});const g=(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(b=>({technicianId:b}))).map((b,V)=>{const le=b?.technicianId!=null?p.get(String(b.technicianId)):null;let ve=b.positionLabel??b.position_name??b.position_label??b.role??b.position??"";(!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_name_en??"");const xe=b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??"";let Ne=ve,De=xe;if(!Ne||Ne.trim()==="")try{const Ve=kt?kt():[];let ee=null;if(b.positionId!=null&&(ee=Ve.find(Ie=>String(Ie.id)===String(b.positionId))||null),!ee){const Ie=b.positionKey??b.position_key??b.positionName??b.position_name??b.position??"";if(Ie&&(ee=typeof ca=="function"?ca(Ie):null,!ee&&Ve.length)){const et=String(Ie).trim().toLowerCase();ee=Ve.find(tt=>[tt.name,tt.labelAr,tt.labelEn].filter(Boolean).map(_t=>String(_t).toLowerCase()).includes(et))||null}}ee&&(Ne=ee.labelAr||ee.labelEn||ee.name||"",(!De||String(De).trim()==="")&&(ee.labelAr&&ee.labelEn?De=Ne===ee.labelAr?ee.labelEn:ee.labelAr:De=ee.labelAr||ee.labelEn||""))}catch{}const Pe=qe(je(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??le?.dailyWage??le?.wage??0)),cn=qe(je(b.positionClientPrice??b.position_client_price??b.client_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??le?.dailyTotal??le?.total??le?.total_wage??0));return{assignmentId:b.assignmentId??b.assignment_id??`crew-${V}`,positionId:b.positionId??b.position_id??null,positionKey:b.positionKey??b.position_key??b.positionName??b.position_name??b.position??null,positionLabel:Ne,positionLabelAlt:De,positionLabelAr:b.positionLabelAr??b.position_label_ar??null,positionLabelEn:b.positionLabelEn??b.position_label_en??null,positionCost:Pe,positionClientPrice:cn,technicianId:b.technicianId!=null?String(b.technicianId):le?.id!=null?String(le.id):null,technicianName:b.technicianName??b.technician_name??le?.name??null,technicianRole:b.technicianRole??le?.role??null,technicianPhone:b.technicianPhone??le?.phone??null,notes:b.notes??null}}),h=Zt(),_=$a(e.start,e.end),q=e.discount??e.discountValue??e.discount_value??e.discountAmount??0,A=je(q),j=Number.isFinite(A)?A:0,U=e.discountType??e.discount_type??e.discountMode??"percent",S=String(U).toLowerCase()==="amount"?"amount":"percent",I=r?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),P=je(e.cost??e.total??e.finalTotal),k=Number.isFinite(P),O=k?qe(P):0,$=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,N=$!=null?je($):Number.NaN;let B=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(N)&&N>0)&&Number.isFinite(N)?N:0;I&&B<=0&&(B=Ct);const x=ar({items:d,technicianIds:e.technicians||[],crewAssignments:g,discount:j,discountType:S,applyTax:I,start:e.start,end:e.end,companySharePercent:B}),Y=qe(x.equipmentTotal),K=qe(x.crewTotal);qe(x.crewCostTotal);const F=qe(x.discountAmount),D=qe(x.subtotalAfterDiscount),R=Number.isFinite(x.companySharePercent)?x.companySharePercent:0;let M=qe(x.companyShareAmount);M=R>0?qe(Math.max(0,M)):0;const W=qe(x.taxAmount),ie=qe(x.finalTotal),ne=r?ie:k?O:ie,ue=qe(x.netProfit),H=v(String(e.reservationId??e.id??"")),oe=e.start?v(Je(e.start)):"-",Ee=e.end?v(Je(e.end)):"-",we=v(String(g.length)),Te=v(Y.toFixed(2)),Q=v(F.toFixed(2)),Z=v(D.toFixed(2)),se=v(W.toFixed(2)),Ae=v((Number.isFinite(ne)?ne:0).toFixed(2)),ze=v(String(_)),ae=o("reservations.create.summary.currency","SR"),G=o("reservations.details.labels.discount","الخصم"),ge=o("reservations.details.labels.tax","الضريبة (15%)"),L=o("reservations.details.labels.crewTotal","إجمالي الفريق"),re=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),be=o("reservations.details.labels.duration","عدد الأيام"),he=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),me=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ge=o("reservations.create.equipment.imageAlt","صورة"),$e={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Oe=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),rt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز.");o("reservations.details.technicians.roleUnknown","غير محدد");const xt=o("reservations.details.technicians.phoneUnknown","غير متوفر");o("reservations.details.technicians.wage","{amount} {currency} / اليوم");const xn=o("reservations.list.status.confirmed","✅ مؤكد"),rn=o("reservations.list.status.pending","⏳ غير مؤكد"),Ua=o("reservations.list.payment.paid","💳 مدفوع"),z=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ke=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),ot=o("reservations.list.status.completed","📁 منتهي"),gt=o("reservations.details.labels.id","🆔 رقم الحجز"),Gn=o("reservations.details.section.bookingInfo","بيانات الحجز"),Wn=o("reservations.details.section.paymentSummary","ملخص الدفع"),Rt=o("reservations.details.labels.finalTotal","المجموع النهائي"),Xn=o("reservations.details.section.crew","😎 الفريق الفني"),Ka=o("reservations.details.crew.count","{count} عضو"),on=o("reservations.details.section.items","📦 المعدات المرتبطة"),He=o("reservations.details.items.count","{count} عنصر"),Mt=o("reservations.details.actions.edit","✏️ تعديل"),In=o("reservations.details.actions.delete","🗑️ حذف"),Qa=o("reservations.details.labels.customer","العميل"),zo=o("reservations.details.labels.contact","رقم التواصل"),Oo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Ho=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Vo=o("reservations.details.actions.openProject","📁 فتح المشروع"),Uo=o("reservations.details.labels.start","بداية الحجز"),Ko=o("reservations.details.labels.end","نهاية الحجز"),Qo=o("reservations.details.labels.notes","ملاحظات"),Go=o("reservations.list.noNotes","لا توجد ملاحظات"),Wo=o("reservations.details.labels.itemsCount","عدد المعدات"),Xo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Jo=o("reservations.paymentHistory.title","سجل الدفعات"),Yo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Zo=o("reservations.list.unknownCustomer","غير معروف"),Ga=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),pi=Ga==="partial",ec=Ga==="paid"?Ua:pi?ke:z;function Wa(b){if(b==null)return Number.NaN;if(typeof b=="number")return Number.isFinite(b)?b:Number.NaN;const V=String(b).replace(/[^0-9.+-]/g,""),le=Number(V);return Number.isFinite(le)?le:Number.NaN}const Jn=(b={})=>{const V=String(b.type??b.kind??b.category??"").toLowerCase();return!!(["package","bundle","pack"].includes(V)||Array.isArray(b.packageItems)&&b.packageItems.length)},tc=(b={})=>[b.packageId,b.package_id,b.packageCode,b.package_code,b.bundleId,b.bundle_id].some(V=>V!=null&&V!==""),nc=(b={})=>!b||typeof b!="object"?!1:!Jn(b)&&tc(b),mi=(b={})=>{const V=Jn(b),le=[{value:b.qty,key:"qty",limit:999},{value:b.quantity,key:"quantity",limit:999},{value:b.units,key:"units",limit:999},{value:b.count,key:"count",limit:50},{value:b.package_quantity,key:"package_quantity",limit:999},{value:b.packageQty,key:"packageQty",limit:999},{value:b.packageCount,key:"packageCount",limit:999}];let ve=NaN;for(const xe of le){if(xe.value==null||xe.value==="")continue;const Ne=typeof xe.value=="string"?xe.value.trim():String(xe.value??"");if(xe.key==="count"&&Ne.length>6)continue;const De=Wa(xe.value);if(!Number.isFinite(De)||De<=0)continue;const Pe=Math.round(De);if(!(Pe>xe.limit)){ve=Math.max(1,Pe);break}}return(!Number.isFinite(ve)||ve<=0)&&(ve=1),V?Math.max(1,Math.min(99,ve)):Math.max(1,Math.min(9999,ve))};let Be=(Array.isArray(d)?d:[]).reduce((b,V)=>!V||typeof V!="object"||nc(V)?b:b+mi(V),0);Be<=0&&Array.isArray(u)&&u.length&&(Be=u.reduce((b,V)=>{const le=mi({...V,type:V.type});return b+le},0)),!Number.isFinite(Be)||Be<=0?Be=Array.isArray(u)&&u.length?u.length:(Array.isArray(d)?d.length:0)||1:Be>1e6&&(Be=Math.min(Be,Array.isArray(u)?u.length:Be),(!Number.isFinite(Be)||Be<=0)&&(Be=(Array.isArray(d)?d.length:0)||1)),Be=Math.max(1,Math.round(Be));const ac=v(String(Be)),fi=He.replace("{count}",ac),sc=Ka.replace("{count}",we),ic=e.notes?v(e.notes):Go,rc=v(K.toFixed(2)),oc=v(String(R)),cc=v(M.toFixed(2)),lc=`${oc}% (${cc} ${ae})`,dc=Number.isFinite(ue)?Math.max(0,ue):0,uc=v(dc.toFixed(2)),It=[{icon:"💼",label:Xo,value:`${Te} ${ae}`}];It.push({icon:"😎",label:L,value:`${rc} ${ae}`}),F>0&&It.push({icon:"💸",label:G,value:`${Q} ${ae}`}),It.push({icon:"📊",label:re,value:`${Z} ${ae}`}),I&&W>0&&It.push({icon:"🧾",label:ge,value:`${se} ${ae}`}),R>0&&It.push({icon:"🏦",label:he,value:lc}),It.push({icon:"💵",label:me,value:`${uc} ${ae}`}),It.push({icon:"💰",label:Rt,value:`${Ae} ${ae}`});const pc=It.map(({icon:b,label:V,value:le})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${b} ${V}</span>
      <span class="summary-details-value">${le}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let _n=[];Array.isArray(e.paymentHistory)?_n=e.paymentHistory:Array.isArray(e.payment_history)&&(_n=e.payment_history);const mc=Array.isArray(e.paymentLogs)?e.paymentLogs:[],yi=Array.isArray(_n)&&_n.length>0?_n:mc,fc=yi.length?`<ul class="reservation-payment-history-list">${yi.map(b=>{const V=b?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):b?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),le=Number.isFinite(Number(b?.amount))&&Number(b.amount)>0?`${v(Number(b.amount).toFixed(2))} ${ae}`:"—",ve=Number.isFinite(Number(b?.percentage))&&Number(b.percentage)>0?`${v(Number(b.percentage).toFixed(2))}%`:"—",xe=b?.recordedAt?v(Je(b.recordedAt)):"—",Ne=b?.note?`<div class="payment-history-note">${Ue(v(b.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ue(V)}</span>
              <span class="payment-history-entry__amount">${le}</span>
              <span class="payment-history-entry__percent">${ve}</span>
              <span class="payment-history-entry__date">${xe}</span>
            </div>
            ${Ne}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ue(Yo)}</div>`,bi=[{text:i?xn:rn,className:i?"status-confirmed":"status-pending"},{text:ec,className:Ga==="paid"?"status-paid":pi?"status-partial":"status-unpaid"}];l&&bi.push({text:ot,className:"status-completed"});const yc=bi.map(({text:b,className:V})=>`<span class="status-chip ${V}">${b}</span>`).join(""),zt=(b,V,le)=>`
    <div class="res-info-row">
      <span class="label">${b} ${V}</span>
      <span class="value">${le}</span>
    </div>
  `;let Xa="";if(e.projectId){let b=Ue(Ho);if(s){const V=s.title||o("projects.fallback.untitled","مشروع بدون اسم");b=`${Ue(V)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ue(Vo)}</button>`}Xa=`
      <div class="res-info-row">
        <span class="label">📁 ${Oo}</span>
        <span class="value">${b}</span>
      </div>
    `}const ht=[];ht.push(zt("👤",Qa,t?.customerName||Zo)),ht.push(zt("📞",zo,t?.phone||"—")),ht.push(zt("🗓️",Uo,oe)),ht.push(zt("🗓️",Ko,Ee)),ht.push(zt("📦",Wo,fi)),ht.push(zt("⏱️",be,ze)),ht.push(zt("📝",Qo,ic)),Xa&&ht.push(Xa);const bc=ht.join(""),gc=u.length?u.map(b=>{const V=b.items[0]||{},le=tn(V)||b.image,ve=le?`<img src="${le}" alt="${Ge}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',xe=[];Array.isArray(b.packageItems)&&b.packageItems.length&&xe.push(...b.packageItems),b.items.forEach(fe=>{Array.isArray(fe?.packageItems)&&fe.packageItems.length&&xe.push(...fe.packageItems)});const Ne=Jn(b)||b.items.some(fe=>Jn(fe))||xe.length>0,De=(fe,{fallback:lt=1,max:de=1e3}={})=>{const Se=Wa(fe);return Number.isFinite(Se)&&Se>0?Math.min(de,Se):lt};let Pe;if(Ne){const fe=De(V?.qty??V?.quantity??V?.count,{fallback:NaN,max:999});Number.isFinite(fe)&&fe>0?Pe=fe:Pe=De(b.quantity??b.count??1,{fallback:1,max:999})}else Pe=De(b.quantity??b.count??V?.qty??V?.quantity??V?.count??0,{fallback:1,max:9999});const cn=v(String(Pe)),Ve=(fe,{preferPositive:lt=!1}={})=>{let de=Number.NaN;for(const Se of fe){const dt=je(Se);if(Number.isFinite(dt)){if(lt&&dt>0)return dt;Number.isFinite(de)||(de=dt)}}return de};let ee,Ie;if(Ne){const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Ve(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const de=je(b.totalPrice??V?.total??V?.total_price);Number.isFinite(de)&&Pe>0&&(ee=de/Pe)}Number.isFinite(ee)||(ee=0);const lt=[V?.total,V?.total_price,b.totalPrice];if(Ie=Ve(lt),!Number.isFinite(Ie))Ie=ee*Pe;else{const de=ee*Pe;Number.isFinite(de)&&de>0&&Math.abs(Ie-de)>de*.25&&(Ie=de)}}else{const fe=[V?.price,V?.unit_price,V?.unitPrice,b.unitPrice];if(ee=Ve(fe,{preferPositive:!0}),!Number.isFinite(ee)||ee<0){const lt=je(b.totalPrice??V?.total??V?.total_price);Number.isFinite(lt)&&Pe>0&&(ee=lt/Pe)}Number.isFinite(ee)||(ee=0),Ie=je(b.totalPrice??V?.total??V?.total_price),Number.isFinite(Ie)||(Ie=ee*Pe)}ee=qe(ee),Ie=qe(Ie);const et=`${v(ee.toFixed(2))} ${ae}`,tt=`${v(Ie.toFixed(2))} ${ae}`,_t=b.barcodes.map(fe=>v(String(fe||""))).filter(Boolean),nt=_t.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${_t.map(fe=>`<li>${fe}</li>`).join("")}
              </ul>
            </details>`:"";let ct="";if(xe.length){const fe=new Map,lt=de=>{const Se=Wa(de?.qtyPerPackage??de?.perPackageQty??de?.quantityPerPackage);return Number.isFinite(Se)&&Se>0&&Se<=99?Math.round(Se):1};if(xe.forEach(de=>{if(!de)return;const Se=te(de.barcode||de.normalizedBarcode||de.desc||Math.random());if(!Se)return;const dt=fe.get(Se),ln=lt(de);if(dt){dt.qty=ln,dt.total=ln;return}fe.set(Se,{desc:de.desc||de.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Math.max(1,Math.min(ln,99)),total:Math.max(1,Math.min(ln,99)),barcode:de.barcode??de.normalizedBarcode??""})}),fe.size){const de=Array.from(fe.values()).map(Se=>{const dt=v(String(Se.qty>0?Math.min(Se.qty,99):1)),ln=Ue(Se.desc||""),Ec=Se.barcode?` <span class="reservation-package-items__barcode">(${Ue(v(String(Se.barcode)))})</span>`:"";return`<li>${ln}${Ec} × ${dt}</li>`}).join("");ct=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${de}
                </ul>
              </details>
            `}}const Sc=Ne?`${ct||""}${nt||""}`:nt;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ve}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ue(V.desc||V.description||V.name||b.description||"-")}</div>
                  ${Sc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue($e.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${cn}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue($e.unitPrice)}">${et}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ue($e.total)}">${tt}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ue($e.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Oe}</td></tr>`,hc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${$e.item}</th>
            <th>${$e.quantity}</th>
            <th>${$e.unitPrice}</th>
            <th>${$e.total}</th>
            <th>${$e.actions}</th>
          </tr>
        </thead>
        <tbody>${gc}</tbody>
      </table>
    </div>
  `,vc=g.map((b,V)=>{const le=v(String(V+1));let ve=b.positionLabel??b.position_name??b.position_label??b.position_title??b.role??b.position??null;if((!ve||ve.trim()==="")&&(ve=b.positionLabelAr??b.position_label_ar??b.position_title_ar??b.positionLabelEn??b.position_label_en??b.position_name_ar??b.position_title_en??b.position_name_en??null),!ve||ve.trim()==="")try{const et=typeof kt=="function"?kt():[],tt=b.positionId?et.find(ct=>String(ct.id)===String(b.positionId)):null,_t=!tt&&b.positionKey?et.find(ct=>String(ct.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,nt=tt||_t||null;nt&&(ve=nt.labelAr||nt.labelEn||nt.name||ve)}catch{}const xe=ts(ve)||o("reservations.crew.positionFallback","منصب بدون اسم"),Ne=ts(b.positionLabelAlt??b.position_label_alt??b.positionLabelEn??b.position_label_en??b.positionLabelAr??b.position_label_ar??b.position_name_en??b.position_name_ar??""),De=ts(b.technicianName)||o("technicians.picker.noTechnicianOption","— بدون تعيين —"),Pe=b.technicianPhone||xt,cn=qe(je(b.positionCost??b.position_cost??b.cost??b.daily_wage??b.dailyWage??b.internal_cost??0));let Ve=qe(je(b.positionClientPrice??b.position_client_price??b.client_price??b.customer_price??b.position_price??b.clientPrice??b.daily_total??b.dailyTotal??b.total??0));if(!Number.isFinite(Ve)||Ve<=0)try{const et=kt?kt():[],tt=b.positionId?et.find(ct=>String(ct.id)===String(b.positionId)):null,_t=!tt&&b.positionKey?et.find(ct=>String(ct.name).toLowerCase()===String(b.positionKey).toLowerCase()):null,nt=tt||_t||null;nt&&Number.isFinite(Number(nt.clientPrice))&&(Ve=qe(Number(nt.clientPrice)))}catch{}const ee=`${v(Ve.toFixed(2))} ${ae}`,Ie=cn>0?`${v(cn.toFixed(2))} ${ae}`:null;return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${le}</span>
          <div class="d-flex flex-column">
            <span class="technician-name">${De}</span>
            <small class="text-muted">🏷️ ${xe}${Ne?` — ${Ne}`:""}</small>
            <small class="text-muted">💼 ${ee}</small>
          </div>
        </div>
        <div class="technician-card-body">
          <div>📞 ${Pe}</div>
          ${Ie?`<div>💵 ${o("reservations.details.technicians.costLabel","التكلفة الداخلية")}: ${Ie}</div>`:""}
        </div>
      </div>
    `}).join(""),qc=g.length?`<div class="reservation-technicians-grid">${vc}</div>`:`<ul class="reservation-modal-technicians"><li>${rt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${gt}</span>
          <strong>${H}</strong>
        </div>
        <div class="status-chips">
          ${yc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Gn}</h6>
          ${bc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${Wn}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${pc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Jo}</h6>
              ${fc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Xn}</span>
          <span class="count">${sc}</span>
        </div>
        ${qc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${on}</span>
          <span class="count">${fi}</span>
        </div>
        ${hc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${Mt}</button>
        ${h?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${In}</button>`:""}
      </div>
    </div>
  `}const vp="project",qp="editProject",Sp=3600*1e3,Rr=.15,Ep=6,wp="projectsTab",Ap="projectsSubTab",xp={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},Ip={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},_p={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},id=`@page {
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

.quote-company-license {
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

.quote-section-row--primary {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.quote-section--project,
.quote-section--customer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  flex: 1 1 0;
}

.quote-section--project {
  text-align: right;
  align-items: flex-end;
}

.quote-section--customer {
  text-align: left;
  align-items: flex-start;
}

.quote-section--project .quote-section__title {
  text-align: right;
  width: 50%;
}

.quote-section--customer .quote-section__title {
  width: 100%;
}

.quote-section--project .info-plain,
.quote-section--project .info-plain__item {
  text-align: right;
  justify-content: flex-end;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  text-align: left;
  align-items: flex-start;
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

.info-plain__separator {
  color: #000000 !important;
  font-weight: 500;
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

.quote-table .quote-item-code {
  display: inline-block;
  padding: 2px 4px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.08);
  margin-bottom: 2px;
}

.quote-table .quote-package-items {
  margin: 6px 0 0;
  padding-left: 16px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.75);
}

.quote-table .quote-package-items li {
  list-style: disc;
  margin-bottom: 2px;
}

.quote-table .quote-package-barcode {
  color: rgba(0, 0, 0, 0.6);
  font-size: 11px;
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
`,rd=/color\([^)]*\)/gi,Rn=/(color\(|color-mix\(|oklab|oklch)/i,od=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],cd=typeof document<"u"?document.createElement("canvas"):null,ea=cd?.getContext?.("2d")||null;function Mr(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function vs(e,t="#000"){if(!ea||!e)return t;try{return ea.fillStyle="#000",ea.fillStyle=e,ea.fillStyle||t}catch{return t}}function ld(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&Rn.test(n)){const s=vs(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function un(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function kp(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function zr(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;od.forEach(c=>{const l=r[c];if(l&&Rn.test(l)){const d=Mr(c);un(n,s,d);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",y=vs(l,u);s.style.setProperty(d,y,"important")}});const i=r.backgroundImage;if(i&&Rn.test(i)){const c=vs(r.backgroundColor||"#ffffff","#ffffff");un(n,s,"background-image"),un(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Or(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const l=r[c];if(l&&Rn.test(l)){const d=Mr(c);un(n,s,d);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(d,u,"important")}});const i=r.backgroundImage;i&&Rn.test(i)&&(un(n,s,"background-image"),un(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Hr(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(rd,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const Vr="reservations.quote.sequence",Ci={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},Ur="https://help.artratio.sa/guide/quote-preview",Le={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},dd=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Qe=[...dd],ud=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function qs(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Qe]}function pd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=qs(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=qs(t.value);if(a.length)return a}const n=Qe.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Qe]}const md=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Kr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>w(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>w(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>w(v(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>w(v(Number(e?.price||0).toFixed(2)))}],Qr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"position",labelKey:"reservations.details.crew.position",fallback:"المنصب",render:e=>w(v(e?.positionLabel??e?.position_name??e?.role??o("reservations.crew.positionFallback","منصب بدون اسم")))},{id:"price",labelKey:"reservations.details.crew.clientPrice",fallback:"سعر العميل",render:e=>{const t=Number.isFinite(Number(e?.positionClientPrice))?Number(e.positionClientPrice):0;return w(`${v(t.toFixed(2))} ${o("reservations.create.summary.currency","SR")}`)}}],Ss={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Kr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Qr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},Gr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>w(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>w(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>w(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Wr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>w(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>w(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>w(e?.note||"-")}],Xr=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>w(v(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>w(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>w(v(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>w(v(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>w(e?.displayCost||"—")}],fd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],yd={customerInfo:Ss.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Ss.payment,projectExpenses:Wr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:Gr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Xr.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ns=new Map;function Fa(e="reservation"){if(ns.has(e))return ns.get(e);const t=e==="project"?fd:md,n=e==="project"?yd:Ss,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(l=>l.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ns.set(e,r),r}function Ra(e="reservation"){return Fa(e).sectionDefs}function Jr(e="reservation"){return Fa(e).fieldDefs}function Yr(e="reservation"){return Fa(e).sectionIdSet}function Zr(e="reservation"){return Fa(e).fieldIdMap}function eo(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const bd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",gd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",hd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",to=id.trim(),no=/^data:image\/svg\+xml/i,vd=/\.svg($|[?#])/i,Ln=512,Es="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",ao=96,so=25.4,ws=210,sa=297,ia=Math.round(ws/so*ao),ra=Math.round(sa/so*ao),qd=2,io=/safari/i,Sd=/(iphone|ipad|ipod)/i,Li=/(iphone|ipad|ipod)/i,Ed=/(crios|fxios|edgios|opios)/i,va="[reservations/pdf]";let J=null,T=null,pt=1,$n=null,Pn=null,Pt=null,pn=null,jn=!1;function Gt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!J?.statusIndicator||!J?.statusText)return;J.statusKind=e;const r=t||eo(e);J.statusText.textContent=r,J.statusSpinner&&(J.statusSpinner.hidden=!s),J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null,n&&typeof a=="function"&&(J.statusAction.textContent=n,J.statusAction.hidden=!1,J.statusAction.onclick=i=>{i.preventDefault(),a()})),J.statusIndicator.hidden=!1,requestAnimationFrame(()=>{J.statusIndicator.classList.add("is-visible")})}function Nn(e){!J?.statusIndicator||!J?.statusText||(J.statusKind=null,J.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{J?.statusIndicator&&(J.statusIndicator.hidden=!0,J.statusAction&&(J.statusAction.hidden=!0,J.statusAction.onclick=null),J.statusSpinner&&(J.statusSpinner.hidden=!1))},220))}function As(){return!!window?.bootstrap?.Modal}function wd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),Pt||(Pt=document.createElement("div"),Pt.className="modal-backdrop fade show",Pt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(Pt)),pn||(pn=t=>{t.key==="Escape"&&xs(e)},document.addEventListener("keydown",pn));try{e.focus({preventScroll:!0})}catch{}}}function xs(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),Pt&&(Pt.remove(),Pt=null),pn&&(document.removeEventListener("keydown",pn),pn=null))}function Ad(e){if(e){if(As()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}wd(e)}}function xd(){if(jn)return;jn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!J?.modal?.classList.contains("show"),s=()=>{J?.modal?.classList.contains("show")&&(Gt("render"),jn=!1,sn())};Ki({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:Ur}),a&&Gt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Ma(e="reservation"){const t={},n=Jr(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function ei(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function Id(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function ti(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function ni(e="reservation"){return Object.fromEntries(Ra(e).map(({id:t})=>[t,!1]))}function ai(e,t){return e.sectionExpansions||(e.sectionExpansions=ni(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function _d(e,t){return ai(e,t)?.[t]!==!1}function si(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function kd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return Sd.test(e)}function $d(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=io.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function ro(){return kd()&&$d()}function za(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=Li.test(e)||Li.test(t),s=/Macintosh/i.test(e)&&n>1;return io.test(e)&&!Ed.test(e)&&(a||s)}function as(e,...t){try{console.log(`${va} ${e}`,...t)}catch{}}function Et(e,...t){try{console.warn(`${va} ${e}`,...t)}catch{}}function Pd(e,t,...n){try{t?console.error(`${va} ${e}`,t,...n):console.error(`${va} ${e}`,...n)}catch{}}function _e(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Cd(e,t="لا توجد بيانات للعرض."){const n=w(o(e,t));return _e(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function qa(e,t){return Array.isArray(e)&&e.length?e:[Cd(t)]}const Ld=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function oo(e=""){return Ld.test(e)}function Td(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!oo(r))return a.call(this,r,...i);let c,l=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),l=!0)}catch{}try{if(!l){const d=this.canvas;d&&d.style?.direction!=="rtl"&&(d.__artRatioOriginalDirection=d.style.direction,d.style.direction="rtl")}return a.call(this,r,...i)}finally{if(l&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!l){const d=this.canvas;d&&d.__artRatioOriginalDirection!==void 0&&(d.style.direction=d.__artRatioOriginalDirection,delete d.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function Ti(e,t=Ln){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function jd(e){if(!e)return{width:Ln,height:Ln};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?Ti(t,0):0,s=n?Ti(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,l]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(l)&&l>0?l:0)}}return{width:a||Ln,height:s||Ln}}function co(e=""){return typeof e!="string"?!1:no.test(e)||vd.test(e)}function Nd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Bd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function lo(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Bd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),l=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=l;const d=i.getContext("2d");return d.clearRect(0,0,c,l),d.drawImage(r,0,0,c,l),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Dd(e){if(!e)return null;if(no.test(e))return Nd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Fd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!co(t))return!1;const n=await Dd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Es),!1;const a=await lo(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Es),!1)}async function Rd(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=jd(e),s=await lo(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Es),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),l=e.getAttribute("height");return c&&i.setAttribute("width",c),l&&i.setAttribute("height",l),e.parentNode?.replaceChild(i,e),!!s}async function uo(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{co(s.getAttribute?.("src"))&&a.push(Fd(s))}),n.forEach(s=>{a.push(Rd(s))}),a.length&&await Promise.allSettled(a)}function Md(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(F,D=0)=>{const R=parseFloat(F);return Number.isFinite(R)?R:D},i=r(s.paddingTop),c=r(s.paddingBottom),l=r(s.paddingRight),d=r(s.paddingLeft),u=r(s.borderRadius),y=r(s.fontSize,14),f=(()=>{const F=s.lineHeight;if(!F||F==="normal")return y*1.6;const D=r(F,y*1.6);return D>0?D:y*1.6})(),p=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(p<=0)return null;const m=Math.max(1,p-d-l),g=e.textContent||"",h=g.split(/\r?\n/),_=n.createElement("canvas"),q=_.getContext("2d");if(!q)return null;const A=s.fontStyle||"normal",j=s.fontVariant||"normal",U=s.fontWeight||"400",S=s.fontFamily||"sans-serif",I=s.fontStretch||"normal",P=F=>F.join(" "),k=[],O=F=>q.measureText(F).width;q.font=`${A} ${j} ${U} ${I} ${y}px ${S}`,h.forEach(F=>{const D=F.trim();if(D.length===0){k.push("");return}const R=D.split(/\s+/);let M=[];R.forEach((W,ie)=>{const ne=W.trim();if(!ne)return;const ue=P(M.concat(ne));if(O(ue)<=m||M.length===0){M.push(ne);return}k.push(P(M)),M=[ne]}),M.length&&k.push(P(M))}),k.length||k.push("");const $=i+c+k.length*f,N=Math.ceil(Math.max(1,p)*t),X=Math.ceil(Math.max(1,$)*t);_.width=N,_.height=X,_.style.width=`${Math.max(1,p)}px`,_.style.height=`${Math.max(1,$)}px`,q.scale(t,t);const C=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){q.save(),q.beginPath();const F=Math.max(1,p),D=Math.max(1,$),R=Math.min(u,F/2,D/2);q.moveTo(R,0),q.lineTo(F-R,0),q.quadraticCurveTo(F,0,F,R),q.lineTo(F,D-R),q.quadraticCurveTo(F,D,F-R,D),q.lineTo(R,D),q.quadraticCurveTo(0,D,0,D-R),q.lineTo(0,R),q.quadraticCurveTo(0,0,R,0),q.closePath(),q.clip()}if(q.fillStyle=C,q.fillRect(0,0,Math.max(1,p),Math.max(1,$)),q.font=`${A} ${j} ${U} ${I} ${y}px ${S}`,q.fillStyle=s.color||"#000000",q.textBaseline="top",q.textAlign="right","direction"in q)try{q.direction="rtl"}catch{}const B=Math.max(0,p-l);let x=i;k.forEach(F=>{const D=F.length?F:" ";q.fillText(D,B,x,m),x+=f});const Y=n.createElement("img");let K;try{K=_.toDataURL("image/png")}catch(F){return Et("note canvas toDataURL failed",F),null}return Y.src=K,Y.alt=g,Y.style.width=`${Math.max(1,p)}px`,Y.style.height=`${Math.max(1,$)}px`,Y.style.display="block",Y.setAttribute("data-quote-note-image","true"),{image:Y,canvas:_,totalHeight:$,width:p}}function zd(e,{pixelRatio:t=1}={}){if(!e||!za())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!oo(a.textContent||""))return;let s;try{s=Md(a,{pixelRatio:t})}catch(r){Et("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function Is(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){Pd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),l=o("reservations.quote.toast.retry","إعادة المحاولة"),d=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Gt("export"),Eo()):(Gt("render"),jn=!1,sn())};if(Ki({message:i,duration:9e3,actionLabel:d?l:void 0,onAction:d?u:void 0,linkLabel:c,linkHref:Ur}),J?.modal?.classList.contains("show")&&Gt("error",{message:i,actionLabel:d?l:void 0,onAction:d?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function _s({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){Et("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){Et("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function ii(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function ji(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Ni(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Od(){const e=Ni();return e||(Pn||(Pn=ii(gd).catch(t=>{throw Pn=null,t}).then(()=>{const t=Ni();if(!t)throw Pn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),Pn)}async function Hd(){const e=ji();return e||($n||($n=ii(hd).catch(t=>{throw $n=null,t}).then(()=>{const t=ji();if(!t)throw $n=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),$n)}async function Vd(){if(window.html2pdf||await ii(bd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}ld(),Td()}function w(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ud(e="reservation"){return e==="project"?"QP":"Q"}function Kd(e,t="reservation"){const n=Number(e),a=Ud(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Qd(){const e=window.localStorage?.getItem?.(Vr),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function po(e="reservation"){const n=Qd()+1;return{sequence:n,quoteNumber:Kd(n,e)}}function Gd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(Vr,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function mo(e="reservation"){return Ci[e]||Ci.reservation}function Wd(e="reservation"){try{const t=mo(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Xd(e,t="reservation"){try{const n=mo(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Jd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Yd(e,t="reservation"){if(!e)return null;const n=Yr(t),a=Zr(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,l])=>{const d=i[c];if(d==null)return;const{ids:u,emptyExplicitly:y}=Jd(d);if(!u&&!y)return;const f=Array.isArray(u)?u.filter(p=>l.has(p)):[];(f.length>0||y)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function fo(e){if(!e)return;const t=e.context||"reservation",n=Yd(e,t);n&&Xd(n,t)}function yo(e){if(!e)return;const t=e.context||"reservation",n=Wd(t);if(!n)return;const a=Yr(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=ei(e.fields||Ma(t)),i=Zr(t);Object.entries(n.fields).forEach(([c,l])=>{const d=i[c];if(!d)return;const u=Array.isArray(l)?l.filter(y=>d.has(y)):[];r[c]=new Set(u)}),e.fields=r}}function bo(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Zd(e){const t=fn()||[],{technicians:n=[]}=ye(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(i=>{if(!i||i.id==null)return;const c=String(i.id),l=s.get(c)||{};s.set(c,{...l,...i})}),(Array.isArray(e.crewAssignments)&&e.crewAssignments.length?e.crewAssignments:Array.isArray(e.techniciansDetails)&&e.techniciansDetails.length?e.techniciansDetails:(e.technicians||[]).map(i=>({technicianId:i}))).map((i,c)=>{const l=i?.technicianId!=null?s.get(String(i.technicianId)):null;let d=i.positionLabel??i.position_name??i.position_label??i.role??i.position??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم");(!d||d.trim()==="")&&(d=i.positionLabelAr??i.position_label_ar??i.positionLabelEn??i.position_label_en??i.position_name_ar??i.position_name_en??l?.role??o("reservations.crew.positionFallback","منصب بدون اسم"));try{const f=typeof kt=="function"?kt()||[]:[];let p=null;if(i?.positionId!=null&&(p=f.find(m=>String(m?.id)===String(i.positionId))||null),!p){const m=i.positionKey??i.position_key??i.positionName??i.position_name??i.position??"";if(m&&(p=typeof ca=="function"&&ca(m)||null,!p&&f.length)){const g=String(m).trim().toLowerCase();p=f.find(h=>[h.name,h.labelAr,h.labelEn].filter(Boolean).map(_=>String(_).toLowerCase()).includes(g))||null}}if(p){const m=p.labelAr||p.labelEn||p.name||"";m&&m.trim()&&(d=m)}}catch{}const u=qe(je(i.positionCost??i.position_cost??i.cost??i.daily_wage??i.dailyWage??l?.dailyWage??l?.wage??0)),y=qe(je(i.positionClientPrice??i.position_client_price??i.client_price??i.clientPrice??i.daily_total??i.dailyTotal??i.total??l?.dailyTotal??l?.total??l?.total_wage??0));return{assignmentId:i.assignmentId??i.assignment_id??`crew-${c}`,positionId:i.positionId??i.position_id??null,positionLabel:d,positionLabelAlt:i.positionLabelAlt??i.position_label_alt??"",positionCost:u,positionClientPrice:y,technicianId:i.technicianId!=null?String(i.technicianId):l?.id!=null?String(l.id):null,technicianName:i.technicianName??i.technician_name??l?.name??null,technicianRole:i.technicianRole??l?.role??null}})}function eu(e,t,n){const{projectLinked:a}=Nt(e,n);$a(e.start,e.end);const s=e.discount??e.discountValue??0,r=Number(v(String(s)))||0,i=e.discountType??e.discount_type??"percent",c=String(i).toLowerCase()==="amount"?"amount":"percent",l=a?!1:!!(e.applyTax??e.apply_tax??e.taxApplied),d=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,u=d!=null?je(d):Number.NaN,f=(e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied)===!0&&Number.isFinite(u)&&u>0?u:null,p=Array.isArray(t)?t.map(j=>j?.technicianId).filter(Boolean):[],m=ar({items:Array.isArray(e.items)?e.items:[],technicianIds:p,crewAssignments:Array.isArray(t)?t:[],discount:r,discountType:c,applyTax:l,start:e.start,end:e.end,companySharePercent:f}),g=je(e.cost??e.total??e.finalTotal),h=Number.isFinite(g),_=a?m.finalTotal:h?qe(g):m.finalTotal,q={equipmentTotal:m.equipmentTotal,crewTotal:m.crewTotal,crewCostTotal:m.crewCostTotal,discountAmount:m.discountAmount,subtotalAfterDiscount:m.subtotalAfterDiscount,taxableAmount:m.taxableAmount,taxAmount:m.taxAmount,finalTotal:_,companySharePercent:m.companySharePercent,companyShareAmount:m.companyShareAmount,netProfit:m.netProfit},A={equipmentTotal:v(m.equipmentTotal.toFixed(2)),crewTotal:v(m.crewTotal.toFixed(2)),discountAmount:v(m.discountAmount.toFixed(2)),subtotalAfterDiscount:v(m.subtotalAfterDiscount.toFixed(2)),taxableAmount:v(m.taxableAmount.toFixed(2)),taxAmount:v(m.taxAmount.toFixed(2)),finalTotal:v(_.toFixed(2)),companySharePercent:v((Number.isFinite(m.companySharePercent)?m.companySharePercent:0).toFixed(2)),companyShareAmount:v(m.companyShareAmount.toFixed(2)),netProfit:v(m.netProfit.toFixed(2))};return{totals:q,totalsDisplay:A,rentalDays:m.rentalDays}}function hn(e){if(e==null||e==="")return null;const t=Number.parseFloat(v(String(e)));return Number.isFinite(t)?t:null}function go(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function tu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=hn(e.amount??(n==="amount"?e.value:null)),s=hn(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=go(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function nu(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(tu).filter(Boolean);if(n.length>0)return n;const a=hn(e.paidPercent??e.paid_percent),s=hn(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=go(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function au(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function su(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function iu(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function ru(e){const t=Number(e?.equipmentEstimate)||0,n=iu(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const l=Math.max(0,a-c),d=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,y=d&&s&&u>0?u:0,f=y>0?Number((l*(y/100)).toFixed(2)):0,p=l+f;let m=s?p*Rr:0;(!Number.isFinite(m)||m<0)&&(m=0),m=Number(m.toFixed(2));let g=s?Number(e?.totalWithTax):p;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((p+m).toFixed(2))):g=p,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:l,companyShareAmount:f,subtotal:p,applyTax:s,taxAmount:m,totalWithTax:g}}function ou(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(v(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.crewAssignments)?e.crewAssignments:[],i=r.length?r:Array.isArray(e.technicians)?e.technicians:[],c=Ds(t,a,s,!1,i,{start:e.start,end:e.end});if(Number.isFinite(c))return c;const l=Number(v(String(e.cost??0)));return Number.isFinite(l)?Math.round(l):0}function cu(e,t){if(!e)return"—";const n=Je(e);return t?`${n} - ${Je(t)}`:n}function ce(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${v(a.toFixed(s))} ${t}`}function Bi(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${v(Number(e).toFixed(n))}%`}function lu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=$a(e.start,e.end);return Number.isFinite(t)?t:1}function du(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${v(String(Math.round(e)))} أيام`:"غير محدد"}function uu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ye(),i=e?.id!=null?s.find(L=>String(L.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ce(0,t),expensesTotal:ce(0,t),reservationsTotal:ce(0,t),discountAmount:ce(0,t),taxAmount:ce(0,t),overallTotal:ce(0,t),paidAmount:ce(0,t),remainingAmount:ce(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ce(0,t),remainingAmountDisplay:ce(0,t),paidPercentDisplay:Bi(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const l=i.clientId??i.customerId??i.client_id??i.customer_id??null,d=l!=null&&n.find(L=>String(L.id)===String(l))||null,u=d?.customerName??d?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),y=(i.clientCompany||d?.companyName||d?.company||"").trim(),f=d?.phone??d?.customerPhone??i.clientPhone??i.customerPhone??"",p=f?v(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),m=d?.email??i.clientEmail??i.customerEmail??"",g=m?String(m).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),h=i.projectCode||`PRJ-${v(String(i.id??""))}`,_=v(String(h)),q=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=au(i.type),j=i.start?Je(i.start):"—",U=i.end?Je(i.end):"—",S=lu(i),I=S!=null?du(S):"غير محدد",P=su(i),k={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},O=o(`projects.status.${P}`,k[P]||P),$=i.id!=null?String(i.id):null,N=$?a.filter(L=>String(L.projectId)===$):[],C=N.map(L=>{const re=L.reservationId||L.id||"",be=L.status||L.state||"pending",he=String(be).toLowerCase(),me=o(`reservations.status.${he}`,he),Ge=ou(L),$e=L.start?new Date(L.start).getTime():0;return{reservationId:v(String(re||"-")),status:he,statusLabel:me,total:Ge,totalLabel:ce(Ge,t),dateRange:cu(L.start,L.end),startTimestamp:Number.isNaN($e)?0:$e}}).sort((L,re)=>re.startTimestamp-L.startTimestamp).map(({startTimestamp:L,...re})=>re).reduce((L,re)=>L+(Number(re.total)||0),0),B=new Map;N.forEach(L=>{const re=Array.isArray(L.items)?L.items:[],be=$a(L.start,L.end),he=L.reservationId||L.id||"";re.forEach((me,Ge)=>{if(!me)return;const $e=me.barcode||me.code||me.id||me.desc||me.description||`item-${Ge}`,Oe=String($e||`item-${Ge}`),rt=B.get(Oe)||{description:me.desc||me.description||me.name||me.barcode||`#${v(String(Ge+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},xt=Number(me.qty)||1,xn=Number(me.price)||0;rt.totalQuantity+=xt,rt.reservationIds.add(String(he));const rn=xn*xt*Math.max(1,be);Number.isFinite(rn)&&(rt.totalCost+=rn),B.set(Oe,rt)})});const x=Array.from(B.values()).map(L=>({description:L.description,totalQuantity:L.totalQuantity,reservationsCount:L.reservationIds.size,displayCost:ce(L.totalCost,t)})),Y=new Map((r||[]).filter(Boolean).map(L=>[String(L.id),L])),K=new Map,F=L=>{if(!L)return;let re=null;typeof L=="object"?re=L.id??L.technicianId??L.technician_id??L.userId??L.user_id??null:(typeof L=="string"||typeof L=="number")&&(re=L);const be=re!=null?String(re):null,he=be&&Y.has(be)?Y.get(be):typeof L=="object"?L:null,me=he?.name||he?.full_name||he?.fullName||he?.displayName||(typeof L=="string"?L:null),Ge=he?.role||he?.title||null,$e=he?.phone||he?.mobile||he?.contact||null;if(!me&&!be)return;const Oe=be||me;K.has(Oe)||K.set(Oe,{id:be,name:me||"-",role:Ge||null,phone:$e||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(L=>F(L)),N.forEach(L=>{(Array.isArray(L.crewAssignments)&&L.crewAssignments.length?L.crewAssignments:Array.isArray(L.technicians)?L.technicians.map(be=>({technicianId:be})):[]).forEach(be=>F(be))});const D=Array.from(K.values()),R=Array.isArray(i.expenses)?i.expenses.map(L=>{const re=Number(L?.amount)||0;return{label:L?.label||L?.name||"-",amount:re,displayAmount:ce(re,t),note:L?.note||L?.description||""}}):[],M=ru(i),W=M.applyTax?Number(((M.subtotal+C)*Rr).toFixed(2)):0,ie=Number((M.subtotal+C+W).toFixed(2)),ne=nu(i),ue=hn(i.paidAmount??i.paid_amount)||0,H=hn(i.paidPercent??i.paid_percent)||0,oe=Fs({totalAmount:ie,paidAmount:ue,paidPercent:H,history:ne}),Ee=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",we=Rs({manualStatus:Ee,paidAmount:oe.paidAmount,paidPercent:oe.paidPercent,totalAmount:ie}),Te={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},Q=o(`projects.paymentStatus.${we}`,Te[we]||we),Z=Number(oe.paidAmount||0),se=Number(oe.paidPercent||0),Ae=Math.max(0,Number((ie-Z).toFixed(2))),ze={projectSubtotal:ce(M.subtotal,t),expensesTotal:ce(M.expensesTotal,t),reservationsTotal:ce(C,t),discountAmount:ce(M.discountAmount,t),taxAmount:ce(W,t),overallTotal:ce(ie,t),paidAmount:ce(Z,t),remainingAmount:ce(Ae,t)},ae={status:we,statusLabel:Q,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paidAmountDisplay:ce(Z,t),remainingAmountDisplay:ce(Ae,t),paidPercentDisplay:Bi(se)},G=(i.description||"").trim();return{project:i,customer:d,clientInfo:{name:u,company:y||"—",phone:p,email:g},projectInfo:{title:q,code:_,typeLabel:A,startDisplay:j,endDisplay:U,durationLabel:I,statusLabel:O},expenses:R,equipment:x,crew:D,totals:M,totalsDisplay:ze,projectTotals:{combinedTaxAmount:W,overallTotal:ie,reservationsTotal:C,paidAmount:Z,paidPercent:se,remainingAmount:Ae,paymentStatus:we},paymentSummary:ae,notes:G,currencyLabel:t,projectStatus:P,projectStatusLabel:O,projectDurationDays:S,projectDurationLabel:I,paymentHistory:ne}}function pu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:l={},currencyLabel:d="SR",sections:u,fieldSelections:y={},quoteNumber:f,quoteDate:p,terms:m=Qe}){const g=ei(y),h=(Q,Z)=>ti(g,Q,Z),_=Q=>u?.has?.(Q),q=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(Q,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${w(Q)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${w(Z)}</span>
    </div>`,j=(Q,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(Q)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(Q)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(Z)}</span>
    </span>`,U=(Q,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${w(Q)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(Z)}</span>
    </div>`,S=[];h("customerInfo","customerName")&&S.push(A(o("projects.details.client","العميل"),t.name||"-")),h("customerInfo","customerCompany")&&S.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),h("customerInfo","customerPhone")&&S.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),h("customerInfo","customerEmail")&&S.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const I=_("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${S.length?`<div class="info-plain">${S.join("")}</div>`:q}
      </section>`:"",P=[];h("projectInfo","projectType")&&P.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),h("projectInfo","projectTitle")&&P.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),h("projectInfo","projectCode")&&P.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),h("projectInfo","projectStart")&&P.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),h("projectInfo","projectEnd")&&P.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),h("projectInfo","projectDuration")&&P.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),h("projectInfo","projectStatus")&&P.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const k=_("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${w(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${P.length?`<div class="info-plain">${P.join("")}</div>`:q}
      </section>`:"",O=Gr.filter(Q=>h("projectCrew",Q.id)),$=_("projectCrew")?O.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${O.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((Q,Z)=>`<tr>${O.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(O.length,1)}" class="empty">${w(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${q}
          </section>`:"",N=[];h("financialSummary","projectSubtotal")&&N.push(j(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ce(0,d)}`)),h("financialSummary","expensesTotal")&&N.push(j(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ce(0,d))),h("financialSummary","reservationsTotal")&&N.push(j(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ce(0,d))),h("financialSummary","discountAmount")&&N.push(j(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ce(0,d))),h("financialSummary","taxAmount")&&N.push(j(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ce(0,d)));const X=[];h("financialSummary","overallTotal")&&X.push(j(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ce(0,d),{variant:"final"})),h("financialSummary","paidAmount")&&X.push(j(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ce(0,d),{variant:"final"})),h("financialSummary","remainingAmount")&&X.push(j(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ce(0,d),{variant:"final"}));const C=_("financialSummary")?!N.length&&!X.length?`<section class="quote-section quote-section--financial">${q}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${N.length?`<div class="totals-inline">${N.join("")}</div>`:""}
            ${X.length?`<div class="totals-final">${X.join("")}</div>`:""}
          </div>
        </section>`:"",B=Wr.filter(Q=>h("projectExpenses",Q.id)),x=_("projectExpenses")?B.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${B.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((Q,Z)=>`<tr>${B.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(B.length,1)}" class="empty">${w(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${q}
          </section>`:"",Y=Xr.filter(Q=>h("projectEquipment",Q.id)),K=_("projectEquipment")?Y.length?`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Y.map(Q=>`<th>${w(Q.labelKey?o(Q.labelKey,Q.fallback):Q.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((Q,Z)=>`<tr>${Y.map(se=>`<td>${se.render(Q,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Y.length,1)}" class="empty">${w(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${q}
          </section>`:"",F=(e?.description||"").trim()||"",D=_("projectNotes")?`<section class="quote-section">
        <h3>${w(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${w(F||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",R=[];h("payment","beneficiary")&&R.push(U(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Le.beneficiaryName)),h("payment","bank")&&R.push(U(o("reservations.quote.labels.bank","اسم البنك"),Le.bankName)),h("payment","account")&&R.push(U(o("reservations.quote.labels.account","رقم الحساب"),v(Le.accountNumber))),h("payment","iban")&&R.push(U(o("reservations.quote.labels.iban","رقم الآيبان"),v(Le.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${R.length?R.join(""):q}</div>
      </div>
      <p class="quote-approval-note">${w(Le.approvalNote)}</p>
    </section>`,W=Array.isArray(m)&&m.length?m:Qe,ie=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${W.map(Q=>`<li>${w(Q)}</li>`).join("")}</ul>
      </footer>`,ne=[],ue=[];if(k&&ue.push({key:"project",html:k}),I&&ue.push({key:"customer",html:I}),ue.length>1){const Q=ue.find(Ae=>Ae.key==="project"),Z=ue.find(Ae=>Ae.key==="customer"),se=[];Q?.html&&se.push(Q.html),Z?.html&&se.push(Z.html),ne.push(_e(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&ne.push(_e(ue[0].html));const H=[];$&&H.push(_e($,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),x&&H.push(_e(x,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&H.push(_e(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const oe=[];C&&oe.push(_e(C,{blockType:"summary"})),D&&oe.push(_e(D));const Ee=[_e(M,{blockType:"payment"}),_e(ie,{blockType:"footer"})],we=[...qa(ne,"projects.quote.placeholder.primary"),...H,...qa(oe,"projects.quote.placeholder.summary"),...Ee],Te=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Le.logoUrl)}" alt="${w(Le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${w(Le.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Le.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${w(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${w(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${w(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${w(p)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${to}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Te}
          ${we.join("")}
        </div>
      </div>
    </div>
  `}function ho(e){if(e?.context==="project")return pu(e);const{reservation:t,customer:n,project:a,crewAssignments:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:l,sections:d,fieldSelections:u={},quoteNumber:y,quoteDate:f,terms:p=Qe}=e,m=v(String(t?.reservationId??t?.id??"")),g=t.start?v(Je(t.start)):"-",h=t.end?v(Je(t.end)):"-",_=n?.customerName||n?.full_name||n?.name||"-",q=n?.phone||"-",A=n?.email||"-",j=n?.company||n?.company_name||"-",U=v(q),S=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),I=a?.code||a?.projectCode||"",P=v(String(c)),k=t?.notes||"",O=Array.isArray(p)&&p.length?p:Qe,$=ei(u),N=(z,ke)=>ti($,z,ke),X=z=>d?.has?.(z),C=`<div class="quote-placeholder">${w(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,B=(z,ke)=>`<div class="info-plain__item">${w(z)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${w(ke)}</strong></div>`,x=(z,ke,{variant:ot="inline"}={})=>ot==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${w(z)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${w(ke)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${w(z)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${w(ke)}</span>
    </span>`,Y=(z,ke)=>`<div class="payment-row">
      <span class="payment-row__label">${w(z)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${w(ke)}</span>
    </div>`,K=[];N("customerInfo","customerName")&&K.push(B(o("reservations.details.labels.customer","العميل"),_)),N("customerInfo","customerCompany")&&K.push(B(o("reservations.details.labels.company","الشركة"),j)),N("customerInfo","customerPhone")&&K.push(B(o("reservations.details.labels.phone","الهاتف"),U)),N("customerInfo","customerEmail")&&K.push(B(o("reservations.details.labels.email","البريد"),A));const F=X("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:C}
      </section>`:"",D=[];N("reservationInfo","reservationId")&&D.push(B(o("reservations.details.labels.reservationId","رقم الحجز"),m||"-")),N("reservationInfo","reservationStart")&&D.push(B(o("reservations.details.labels.start","بداية الحجز"),g)),N("reservationInfo","reservationEnd")&&D.push(B(o("reservations.details.labels.end","نهاية الحجز"),h)),N("reservationInfo","reservationDuration")&&D.push(B(o("reservations.details.labels.duration","عدد الأيام"),P));const R=X("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${D.length?`<div class="info-plain">${D.join("")}</div>`:C}
      </section>`:"",M=[];N("projectInfo","projectTitle")&&M.push(B(o("reservations.details.labels.project","المشروع"),S)),N("projectInfo","projectCode")&&M.push(B(o("reservations.details.labels.code","الرمز"),I||"-"));const W=X("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${w(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:C}
      </section>`:"",ie=[];N("financialSummary","equipmentTotal")&&ie.push(x(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${l}`)),N("financialSummary","crewTotal")&&ie.push(x(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${l}`)),N("financialSummary","discountAmount")&&ie.push(x(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${l}`)),N("financialSummary","taxAmount")&&ie.push(x(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${l}`));const ne=N("financialSummary","finalTotal"),ue=[];ne&&ue.push(x(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${l}`,{variant:"final"}));const H=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",oe=X("financialSummary")?!ie.length&&!ne?`<section class="quote-section quote-section--financial">${C}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${w(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ie.length?`<div class="totals-inline">${ie.join("")}</div>`:""}
            ${H}
          </div>
        </section>`:"",{groups:Ee}=nr(t),we=Ee.map(z=>{const ke=Number(z?.count??z?.quantity??1)||1,ot=Number(z?.unitPrice);let gt=Number.isFinite(ot)?ot:0;if(!gt||gt<=0){const He=Number(z?.totalPrice);Number.isFinite(He)&&ke>0&&(gt=Number((He/ke).toFixed(2)))}Number.isFinite(gt)||(gt=0);const Gn=z?.type==="package"||Array.isArray(z?.items)&&z.items.some(He=>He?.type==="package"),Wn=Array.isArray(z?.barcodes)&&z.barcodes.length?z.barcodes[0]:Array.isArray(z?.items)&&z.items.length?z.items[0]?.barcode:null;let Rt=z?.packageDisplayCode??z?.package_code??z?.code??z?.packageCode??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.package_code??z.items[0]?.code??z.items[0]?.packageCode:null);if(!Rt){const He=z?.packageId??z?.package_id??(Array.isArray(z?.items)&&z.items.length?z.items[0]?.packageId??z.items[0]?.package_id:null);if(He)try{const Mt=Xi(He);Mt&&Mt.package_code&&(Rt=Mt.package_code)}catch{}}if(!Rt)try{const He=(z?.description||"").trim().toLowerCase();if(He){const In=Nc().find(Qa=>(Qa?.name||"").trim().toLowerCase()===He);In&&In.package_code&&(Rt=In.package_code)}}catch{}const Xn=Gn?Rt??Wn??"":z?.barcode??Wn??"",Ka=Xn!=null?String(Xn):"";let on=Number.isFinite(Number(z?.totalPrice))?Number(z.totalPrice):Number((gt*ke).toFixed(2));return on=qe(on),{...z,isPackage:Gn,desc:z?.description,barcode:Ka,qty:ke,price:on,totalPrice:on,unitPriceValue:gt}}),Te=Kr.filter(z=>N("items",z.id)),Q=Te.length>0,Z=Q?Te.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",Ae=we.length>0?we.map((z,ke)=>`<tr>${Te.map(ot=>`<td>${ot.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Te.length,1)}" class="empty">${w(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ze=X("items")?Q?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${Ae}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.items.title","المعدات"))}</h3>
            ${C}
          </section>`:"",ae=Qr.filter(z=>N("crew",z.id)),G=ae.length>0,ge=G?ae.map(z=>`<th>${w(z.labelKey?o(z.labelKey,z.fallback):z.fallback)}</th>`).join(""):"",L=Array.isArray(s)?s:[],re=L.length?L.map((z,ke)=>`<tr>${ae.map(ot=>`<td>${ot.render(z,ke)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ae.length,1)}" class="empty">${w(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,be=X("crew")?G?`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ge}</tr>
              </thead>
              <tbody>${re}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${w(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${C}
          </section>`:"",he=X("notes")?`<section class="quote-section">
        <h3>${w(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${w(k||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",me=[];N("payment","beneficiary")&&me.push(Y(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Le.beneficiaryName)),N("payment","bank")&&me.push(Y(o("reservations.quote.labels.bank","اسم البنك"),Le.bankName)),N("payment","account")&&me.push(Y(o("reservations.quote.labels.account","رقم الحساب"),v(Le.accountNumber))),N("payment","iban")&&me.push(Y(o("reservations.quote.labels.iban","رقم الآيبان"),v(Le.iban)));const Ge=`<section class="quote-section">
      <div class="payment-block">
        <h3>${w(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${me.length?me.join(""):C}</div>
      </div>
      <p class="quote-approval-note">${w(Le.approvalNote)}</p>
    </section>`,$e=`<footer class="quote-footer">
        <h4>${w(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${O.map(z=>`<li>${w(z)}</li>`).join("")}</ul>
      </footer>`,Oe=[];F&&R?Oe.push(_e(`<div class="quote-section-row">${F}${R}</div>`,{blockType:"group"})):(R&&Oe.push(_e(R)),F&&Oe.push(_e(F))),W&&Oe.push(_e(W));const rt=[];ze&&rt.push(_e(ze,{blockType:"table",extraAttributes:'data-table-id="items"'})),be&&rt.push(_e(be,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const xt=[];oe&&xt.push(_e(oe,{blockType:"summary"})),he&&xt.push(_e(he));const xn=[_e(Ge,{blockType:"payment"}),_e($e,{blockType:"footer"})],rn=[...qa(Oe,"reservations.quote.placeholder.page1"),...rt,...qa(xt,"reservations.quote.placeholder.page2"),...xn],Ua=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${w(Le.logoUrl)}" alt="${w(Le.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${w(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${w(Le.companyName)}</p>
        <p class="quote-company-cr">${w(o("reservations.quote.labels.cr","السجل التجاري"))}: ${w(Le.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${w(y)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${w(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${to}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ua}
          ${rn.join("")}
        </div>
      </div>
    </div>
  `}async function mu(){try{const e=ye();if((Array.isArray(e?.packages)?e.packages:[]).length>0)return;const n=await it("/packages/?all=1"),a=Array.isArray(n?.data)?n.data:Array.isArray(n)?n:[];a.length&&(xa({packages:a}),document.dispatchEvent?.(new CustomEvent("packages:changed",{detail:{packages:a}})))}catch{}}function fu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Mn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>fu(c)),i=[s,...r].map(c=>c.catch(l=>(Et("asset load failed",l),xd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function vo(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await uo(r),await Mn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let l=null,d=null;const u=S=>{S.style.margin="0 auto",S.style.breakInside="avoid",S.style.pageBreakInside="avoid",S.style.pageBreakAfter="auto",S.style.breakAfter="auto"},y=()=>{const S=a.createElement("div"),I=s.childElementCount===0;if(S.className="quote-page",S.dataset.pageIndex=String(s.childElementCount),I){S.classList.add("quote-page--primary");const k=i.cloneNode(!0);k.removeAttribute("data-quote-header-template"),S.appendChild(k)}else S.classList.add("quote-page--continuation");const P=a.createElement("main");P.className="quote-body",S.appendChild(P),s.appendChild(S),u(S),l=S,d=P},f=()=>{(!l||!d||!d.isConnected)&&y()},p=()=>{if(!l||!d||d.childElementCount>0)return;const S=l;l=null,d=null,S.parentNode&&S.parentNode.removeChild(S)},m=()=>{l=null,d=null},g=()=>l?l.scrollHeight-l.clientHeight>qd:!1,h=(S,{allowOverflow:I=!1}={})=>(f(),d.appendChild(S),g()&&!I?(d.removeChild(S),p(),!1):!0),_=S=>{const I=S.cloneNode(!0);I.removeAttribute?.("data-quote-block"),I.removeAttribute?.("data-block-type"),I.removeAttribute?.("data-table-id"),!h(I)&&(m(),!h(I)&&h(I,{allowOverflow:!0}))},q=S=>{const I=S.querySelector("table");if(!I){_(S);return}const P=S.querySelector("h3"),k=I.querySelector("thead"),O=Array.from(I.querySelectorAll("tbody tr"));if(!O.length){_(S);return}let $=null,N=0;const X=(B=!1)=>{const x=S.cloneNode(!1);x.removeAttribute("data-quote-block"),x.removeAttribute("data-block-type"),x.removeAttribute("data-table-id"),x.classList.add("quote-section--table-fragment"),B&&x.classList.add("quote-section--table-fragment--continued");const Y=P?P.cloneNode(!0):null;Y&&x.appendChild(Y);const K=I.cloneNode(!1);K.classList.add("quote-table--fragment"),k&&K.appendChild(k.cloneNode(!0));const F=a.createElement("tbody");return K.appendChild(F),x.appendChild(K),{section:x,body:F}},C=(B=!1)=>$||($=X(B),h($.section)||(m(),h($.section)||h($.section,{allowOverflow:!0})),$);O.forEach(B=>{C(N>0);const x=B.cloneNode(!0);if($.body.appendChild(x),g()&&($.body.removeChild(x),$.body.childElementCount||(d.removeChild($.section),$=null,p()),m(),$=null,C(N>0),$.body.appendChild(x),g())){$.section.classList.add("quote-section--table-fragment--overflow"),N+=1;return}N+=1}),$=null};if(!c.length)return;c.forEach(S=>{S.getAttribute("data-block-type")==="table"?q(S):_(S)});const A=Array.from(s.children),j=[];if(A.forEach((S,I)=>{const P=S.querySelector(".quote-body");if(I!==0&&(!P||P.childElementCount===0)){S.remove();return}j.push(S)}),!n){const S=a.defaultView||window,I=Math.min(3,Math.max(1,S.devicePixelRatio||1)),P=za()?Math.min(2,I):I;j.forEach(k=>zd(k,{pixelRatio:P}))}j.forEach((S,I)=>{const P=I===0;S.style.pageBreakAfter="auto",S.style.breakAfter="auto",S.style.pageBreakBefore=P?"auto":"always",S.style.breakBefore=P?"auto":"page",n?S.style.boxShadow="":S.style.boxShadow="none"});const U=j[j.length-1]||null;l=U,d=U?.querySelector(".quote-body")||null,await Mn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function ri(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function yu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Hd(),Od()]),c=e.ownerDocument||document,l=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,l,c?.documentElement?.getAttribute?.("dir")].some(S=>typeof S=="string"&&S.toLowerCase().startsWith("rtl")),y=typeof window<"u"&&window.devicePixelRatio||1,f=si(),p=ro(),m=za();let g;m?g=1.5:p?g=Math.min(1.7,Math.max(1.2,y*1.1)):f?g=Math.min(1.8,Math.max(1.25,y*1.2)):g=Math.min(2,Math.max(1.6,y*1.4));const h=m||p?.9:f?.92:.95,_=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),q={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const j=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let S=0;S<s.length;S+=1){const I=s[S];await uo(I),await Mn(I);const P=I.ownerDocument||document,k=P.createElement("div");Object.assign(k.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const O=I.cloneNode(!0);O.style.width=`${ia}px`,O.style.maxWidth=`${ia}px`,O.style.minWidth=`${ia}px`,O.style.height=`${ra}px`,O.style.maxHeight=`${ra}px`,O.style.minHeight=`${ra}px`,O.style.position="relative",O.style.background="#ffffff",ri(O),k.appendChild(O),P.body.appendChild(k);let $;try{await Mn(O),$=await i(O,{...q,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(F){throw Is(F,"pageCapture",{toastMessage:j}),F}finally{k.parentNode?.removeChild(k)}if(!$)continue;const N=$.width||1,C=($.height||1)/N;let B=ws,x=B*C,Y=0;if(x>sa){const F=sa/x;x=sa,B=B*F,Y=Math.max(0,(ws-B)/2)}const K=$.toDataURL("image/jpeg",h);A>0&&_.addPage(),_.addImage(K,"JPEG",Y,0,B,x,`page-${A+1}`,"FAST"),A+=1,await new Promise(F=>window.requestAnimationFrame(F))}}catch(S){throw _s({safariWindowRef:n,mobileWindowRef:a}),S}if(A===0)throw _s({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(p||m){const S=_.output("blob");if(m){const I=URL.createObjectURL(S);Nn();try{window.location.assign(I)}catch(P){Et("mobile safari blob navigation failed",P)}finally{setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{const I=URL.createObjectURL(S),P=()=>p&&n&&!n.closed?n:a&&!a.closed?a:null,k=($,N)=>{if(Nn(),!$){window.location.assign(N);return}try{$.location.replace(N),$.focus?.()}catch(X){Et("direct blob navigation failed",X);try{$.document.open(),$.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${N}" title="PDF preview"></iframe></body></html>`),$.document.close()}catch(C){Et("iframe blob delivery failed",C),window.location.assign(N)}}},O=P();k(O,I),setTimeout(()=>URL.revokeObjectURL(I),6e4)}}else{Nn();const S=_.output("bloburl"),I=document.createElement("a");I.href=S,I.download=t,I.rel="noopener",I.style.display="none",document.body.appendChild(I),I.click(),setTimeout(()=>{URL.revokeObjectURL(S),I.remove()},2e3)}}function sn(){if(!T||!J)return;const{previewFrame:e}=J;if(!e)return;const t=T.context||"reservation",n=ho({context:t,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});Gt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Hr(r),zr(r,s),Or(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await vo(i,{context:"preview"}),ri(i))}catch(p){console.error("[reservations/pdf] failed to layout preview document",p)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),l=a?.querySelector(".quote-preview-pages"),d=ia;let u=18;if(l&&a?.defaultView){const p=a.defaultView.getComputedStyle(l),m=parseFloat(p.rowGap||p.gap||`${u}`);Number.isFinite(m)&&m>=0&&(u=m)}const y=ra,f=c.length?c.length*y+Math.max(0,(c.length-1)*u):y;if(e.dataset.baseWidth=String(d),e.dataset.baseHeight=String(f),e.style.width=`${d}px`,e.style.minWidth=`${d}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,J?.previewFrameWrapper&&!J?.userAdjustedZoom){const p=J.previewFrameWrapper.clientWidth-24;p>0&&p<d?pt=Math.max(p/d,.3):pt=1}So(pt)}finally{Nn()}},{once:!0})}function bu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?T.sections.add(n):T.sections.delete(n),fo(T),qo(),sn())}function gu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=T.context||"reservation",r=T.fields||(T.fields=Ma(s)),i=Id(r,n);t.checked?i.add(a):i.delete(a),fo(T),sn()}function hu(e){if(!T)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(ai(T,n),T.sectionExpansions[n]=t.open)}function qo(){if(!J?.toggles||!T)return;const{toggles:e}=J,t=T.fields||{},n=T.context||"reservation";ai(T);const a=Ra(n),s=Jr(n),r=a.map(({id:i,labelKey:c,fallback:l})=>{const d=o(c,l),u=T.sections.has(i),y=s[i]||[],f=_d(T,i),p=y.length?`<div class="quote-toggle-sublist">
          ${y.map(m=>{const g=ti(t,i,m.id),h=u?"":"disabled",_=m.labelKey?o(m.labelKey,m.fallback):m.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${m.id}" ${g?"checked":""} ${h}>
                <span>${w(_)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${w(d)}</span>
          </label>
          ${y.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${p}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",bu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",gu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",hu)})}function vu(){if(J?.modal)return J;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${w(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${w(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${w(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${w(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${w(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${w(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${w(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),l=c?.querySelector(".btn-close"),d=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,l||null);const y=document.createElement("iframe");y.className="quote-preview-frame",y.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),y.setAttribute("loading","lazy"),y.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${w(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${w(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${w(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const p=document.createElement("div");p.className="quote-preview-frame-wrapper",p.appendChild(y),n.innerHTML="";const m=document.createElement("div");m.className="quote-preview-scroll",m.appendChild(p),n.appendChild(m);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${w(eo("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(T){i.disabled=!0;try{await Eo()}finally{i.disabled=!1}}});const h=()=>{As()||xs(e)};d.forEach(j=>{j?.addEventListener("click",h)}),l&&!d.includes(l)&&l.addEventListener("click",h),e.addEventListener("click",j=>{As()||j.target===e&&xs(e)}),J={modal:e,toggles:t,preview:n,previewScroll:m,previewFrameWrapper:p,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:y,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const _=f.querySelector("[data-zoom-out]"),q=f.querySelector("[data-zoom-in]"),A=f.querySelector("[data-zoom-reset]");return _?.addEventListener("click",()=>Di(-.1)),q?.addEventListener("click",()=>Di(.1)),A?.addEventListener("click",()=>Sa(1,{markManual:!0})),s&&s.addEventListener("input",Su),r&&r.addEventListener("click",Eu),Sa(pt),J}function Sa(e,{silent:t=!1,markManual:n=!1}={}){pt=Math.min(Math.max(e,.25),2.2),n&&J&&(J.userAdjustedZoom=!0),So(pt),!t&&J?.zoomValue&&(J.zoomValue.textContent=`${Math.round(pt*100)}%`)}function Di(e){Sa(pt+e,{markManual:!0})}function So(e){if(!J?.previewFrame||!J.previewFrameWrapper)return;const t=J.previewFrame,n=J.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",si()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function qu(){if(!J?.meta||!T)return;const{meta:e}=J;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${w(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${w(T.quoteNumber)}</strong></div>
      <div><span>${w(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${w(T.quoteDateLabel)}</strong></div>
    </div>
  `}function oi(){if(!J?.termsInput)return;const e=(T?.terms&&T.terms.length?T.terms:Qe).join(`
`);J.termsInput.value!==e&&(J.termsInput.value=e)}function Su(e){if(!T)return;const t=qs(e?.target?.value??"");if(t.length){T.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{T.terms=[...Qe],oi();const n=Qe.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}sn()}function Eu(e){if(e?.preventDefault?.(),!T)return;T.terms=[...Qe];const t=document.getElementById("reservation-terms");t&&(t.value=Qe.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Qe.join(`
`)),oi(),sn()}async function Eo(){if(!T)return;Gt("export");const t=!si()&&ro(),n=za(),a=null,s=!n&&t?window.open("","_blank"):null;(l=>{if(l)try{l.document.open(),l.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${w(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${w(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),l.document.close()}catch(d){Et("failed to prime download window",d)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Vd(),as("html2pdf ensured");const l=T.context||"reservation",d=ho({context:l,reservation:T.reservation,customer:T.customer,project:T.project,crewAssignments:T.crewAssignments,totals:T.totals,totalsDisplay:T.totalsDisplay,rentalDays:T.rentalDays,currencyLabel:T.currencyLabel,sections:T.sections,fieldSelections:T.fields,quoteNumber:T.quoteNumber,quoteDate:T.quoteDateLabel,terms:T.terms,projectCrew:T.projectCrew,projectExpenses:T.projectExpenses,projectEquipment:T.projectEquipment,projectInfo:T.projectInfo,clientInfo:T.clientInfo,paymentSummary:T.paymentSummary,projectTotals:T.projectTotals});i=document.createElement("div"),i.innerHTML=d,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Hr(i),zr(i),Or(i),as("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await vo(u,{context:"export"}),await Mn(u),ri(u),as("layout complete for export document")}catch(f){Is(f,"layoutQuoteDocument",{suppressToast:!0})}}const y=`quotation-${T.quoteNumber}.pdf`;await yu(u,{filename:y,safariWindowRef:s,mobileWindowRef:a}),T.sequenceCommitted||(Gd(T.quoteSequence),T.sequenceCommitted=!0)}catch(l){_s({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,Is(l,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),Nn()}}function wo(){const e=vu();e?.modal&&(jn=!1,pt=1,J&&(J.userAdjustedZoom=!1),Sa(pt,{silent:!0}),qo(),qu(),oi(),sn(),Ad(e.modal))}async function wu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}await mu();const a=Zd(e),{totalsDisplay:s,totals:r,rentalDays:i}=eu(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:l,quoteNumber:d}=po("reservation"),u=new Date,y=pd();T={context:"reservation",reservation:e,customer:t,project:n,crewAssignments:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(Ra("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:ni("reservation"),fields:Ma("reservation"),terms:y,quoteSequence:l,quoteNumber:d,quoteDate:u,quoteDateLabel:bo(u),sequenceCommitted:!1},yo(T),wo()}async function $p({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=uu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=po("project"),r=new Date,i=[...ud];T={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(Ra("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:ni("project"),fields:Ma("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:bo(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},yo(T),wo()}function Au({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=fn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:l=[]}=ye(),d=r.map(q=>{const A=rs(q);return{...A,id:q.id??A.id,reservationId:q.reservationId??q.reservation_id??A.reservationId,reservationCode:q.reservationCode??q.reservation_code??A.reservationCode}}),u=d,y=Array.isArray(s)?s:c||[],f=new Map((l||[]).map(q=>[String(q.id),q])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!u||u.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const m=t||Zl(),g=new Map(i.map(q=>[String(q.id),q])),h=new Map(y.map(q=>[String(q.id),q])),_=ad({reservations:d,filters:m,customersMap:g,techniciansMap:h,projectsMap:f});if(_.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${sd({entries:_,customersMap:g,techniciansMap:h,projectsMap:f})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",()=>{typeof n=="function"&&n(A)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(q=>{const A=Number(q.dataset.reservationIndex);Number.isNaN(A)||q.addEventListener("click",j=>{j.stopPropagation(),typeof a=="function"&&a(A,j)})})}function xu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ye(),c=s.map(g=>{const h=rs(g);return{...h,id:g.id??h.id,reservationId:g.reservationId??g.reservation_id??h.reservationId,reservationCode:g.reservationCode??g.reservation_code??h.reservationCode}}),l=s[e];if(!l)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=c[e]??rs(l),u=r.find(g=>String(g.id)===String(l.customerId)),y=l.projectId?i.find(g=>String(g.id)===String(l.projectId)):null,f=document.getElementById("reservation-details-body"),p=document.getElementById("reservationDetailsModal"),m=()=>{const g=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},h=document.getElementById("reservation-details-edit-btn");h&&(h.onclick=()=>{g(),typeof t=="function"&&t(e,{reservation:l,customer:u,getEditContext:a})});const _=document.getElementById("reservation-details-delete-btn");_&&(_.onclick=()=>{g(),typeof n=="function"&&n(e,{reservation:l,customer:u})});const q=f?.querySelector('[data-action="open-project"]');q&&y&&q.addEventListener("click",()=>{g();const j=y?.id!=null?String(y.id):"",U=j?`projects.html?project=${encodeURIComponent(j)}`:"projects.html";window.location.href=U});const A=document.getElementById("reservation-details-export-btn");A&&(A.onclick=async j=>{j?.preventDefault?.(),j?.stopPropagation?.(),A.blur();try{await wu({reservation:l,customer:u,project:y})}catch(U){console.error("❌ [reservations] export to PDF failed",U),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}})};if(f){const g=fn()||[];f.innerHTML=Pi(d,u,g,e,y),m(),sr().then(()=>{const h=fn()||[];f.innerHTML=Pi(d,u,h,e,y),m()}).catch(()=>{})}return p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Ao(){const e=()=>{En(),Fe(),fn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let Fi=!1,Ri=null;function Iu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function Pp(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=Iu(n);if(!a&&Fi&&Qt().length>0&&s===Ri)return Qt();try{const r=await ir(n||{});return Fi=!0,Ri=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Qt()}}async function _u(e,{onAfterChange:t}={}){if(!Zt())return On(),!1;const a=Qt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Bc(s),Ao(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ka(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function ku(e,{onAfterChange:t}={}){const a=Qt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=Nt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Dc(s);return Ao(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ka(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function An(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:Dn(e,n),end:Dn(t,a)}}function Ea(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ci(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function xo(){const{container:e,select:t,hint:n,addButton:a}=ci();if(!t)return;const s=t.value,r=Qi(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,l=r.map(u=>{const y=Number.isFinite(Number(u.price))?Number(u.price):0,f=v(y.toFixed(2)),p=`${u.name} — ${f} ${i}`;return`<option value="${Ea(u.id)}">${Ea(p)}</option>`}).join("");t.innerHTML=`${c}${l}`;const d=r.length>0;t.disabled=!d,a&&(a.disabled=!d),e&&(e.hidden=!d,e.setAttribute("aria-hidden",d?"false":"true")),n&&(d?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),d&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function $u(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Dt(),{start:r,end:i}=An(),{reservations:c=[]}=ye(),l=a!=null&&c[a]||null,d=l?.id??l?.reservationId??null,u=Tr(n,{existingItems:s,start:r,end:i,ignoreReservationId:d});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const y=[...s,u.package];return Ft(a,y),Bt(y),Ze(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Mi(){const{select:e}=ci();if(!e)return;const t=e.value||"";$u(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function Pu(){const{addButton:e,select:t}=ci();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Mi()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Mi())}),t.dataset.listenerAttached="true"),xo()}function Bt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,Oi(t);return}const l=vn(e);t.innerHTML=l.map(d=>{const u=d.items[0]||{},y=tn(u)||d.image,f=y?`<img src="${y}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',p=d.items.some($=>$?.type==="package"),m=v(String(d.count)),g=je(d.unitPrice),h=Number.isFinite(g)?qe(g):0,_=je(d.totalPrice),q=Number.isFinite(_)?_:h*(Number.isFinite(d.count)?d.count:1),A=qe(q),j=`${v(h.toFixed(2))} ${a}`,U=`${v(A.toFixed(2))} ${a}`,S=d.barcodes.map($=>v(String($||""))).filter(Boolean),I=S.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${S.map($=>`<li>${$}</li>`).join("")}
            </ul>
          </details>`:"";let P="";if(p){const $=new Map,N=C=>{const B=Number.parseFloat(v(String(C??"")).replace(/[^0-9.]/g,""));return!Number.isFinite(B)||B<=0||B>99?1:Math.round(B)},X=[];if(Array.isArray(d.packageItems)&&d.packageItems.length&&X.push(...d.packageItems),d.items.forEach(C=>{Array.isArray(C?.packageItems)&&X.push(...C.packageItems)}),X.forEach(C=>{if(!C)return;const B=te(C.barcode||C.normalizedBarcode||C.desc||Math.random());if(!B)return;const x=$.get(B),Y=N(C.qtyPerPackage??C.perPackageQty??C.quantityPerPackage??C.qty??C.quantity??1),K=Math.max(1,Math.min(Y,99));if(x){x.qty=K;return}$.set(B,{desc:C.desc||C.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:K,barcode:C.barcode??C.normalizedBarcode??""})}),$.size){const C=Array.from($.values()).map(B=>{const x=v(String(B.qty>0?Math.min(B.qty,99):1)),Y=Ea(B.desc||""),K=B.barcode?` <span class="reservation-package-items__barcode">(${Ea(v(String(B.barcode)))})</span>`:"";return`<li>${Y}${K} × ${x}</li>`}).join("");P=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${C}
              </ul>
            </details>
          `}}const k=p?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",O=p?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${d.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${d.description||"-"}</div>
                ${p?`${P||""}${I||""}`:I}
              </div>
            </div>
          </td>
          <td>
            <div class="${k}" data-group-key="${d.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${d.key}" aria-label="${i}"${O}>−</button>
              <span class="reservation-qty-value">${m}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${d.key}" aria-label="${r}"${O}>+</button>
            </div>
          </td>
          <td>${j}</td>
          <td>${U}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${d.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),Oi(t)}function Cu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Oa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ha();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,zi();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${v(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${v(Number(s.percentage).toFixed(2))}%`:"—",l=s?.recordedAt?v(Je(s.recordedAt)):"—",d=Cu(s?.type),u=s?.note?v(s.note):"";return`
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
  `,zi()}function Lu(){if(zn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=ko(e);let a=$o(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=os.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,l=o("reservations.create.summary.currency","SR");let d=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const m=v(p.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",m)),a=p}u=Number(a.toFixed(2)),r>0&&(d=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const p=Math.min(a,f);if(p!==a){const m=`${v(p.toFixed(2))} ${l}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",m)),a=p}d=Number(a.toFixed(2)),r>0&&(u=d/r*100)}d!=null&&(d=Number(d.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const y={type:n,value:a,amount:d,percentage:u,recordedAt:new Date().toISOString()};Vu(y),li(Ha()),Oa(),Ze(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function zi(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(zn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Lu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(zn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Uu(s),li(Ha()),Oa(),Ze(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Tu(e){const{index:t,items:n}=Dt(),s=vn(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,l)=>l!==r);Ft(t,i),Bt(i),Ze()}function ju(e){const{index:t,items:n}=Dt(),a=n.filter(s=>_a(s)!==e);a.length!==n.length&&(Ft(t,a),Bt(a),Ze())}function Nu(e){const{index:t,items:n}=Dt(),s=vn(n).find(h=>h.key===e);if(!s||s.items.some(h=>h?.type==="package"))return;const{start:r,end:i}=An();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ye(),l=t!=null&&c[t]||null,d=l?.id??l?.reservationId??null,u=new Set(n.map(h=>te(h.barcode))),{equipment:y=[]}=ye(),f=(y||[]).find(h=>{const _=te(h?.barcode);return!_||u.has(_)||_a({desc:h?.desc||h?.description||h?.name||"",price:Number(h?.price)||0})!==e||!Hs(h)?!1:!ft(_,r,i,d)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const p=te(f.barcode),m=en(f);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:m,equipmentId:m,barcode:p,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:tn(f)}];Ft(t,g),Bt(g),Ze()}function Oi(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Tu(s);return}if(a==="increase-edit-group"&&s){Nu(s);return}if(a==="remove-edit-group"&&s){ju(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Fu(i)}}),e.dataset.groupListenerAttached="true")}function zn(){return!!document.getElementById("edit-res-project")?.value}function Bu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{zn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Du(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),l=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,l].forEach(Bu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),l&&(l.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),l&&(l.dataset.linkedDisabled="false"))}function Ze(){const e=document.getElementById("edit-res-summary");if(!e)return;Oa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Xe(a),Ze()}),a.dataset.listenerAttached="true");const s=v(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=zn();Du(c);const l=document.getElementById("edit-res-tax"),d=c?!1:l?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",y=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&d&&(st("edit-res-company-share"),f=bn("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(st("edit-res-company-share"),f=bn("edit-res-company-share")));const{items:p=[],payments:m=[]}=Dt(),{start:g,end:h}=An(),_=os({items:p,discount:r,discountType:i,applyTax:d,paidStatus:y,start:g,end:h,companySharePercent:f,paymentHistory:m});e.innerHTML=_;const q=os.lastResult;if(q&&a){const A=q.paymentStatus;u?Xe(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,Xe(a,A))}else a&&Xe(a,a.value)}function Fu(e){if(e==null)return;const{index:t,items:n}=Dt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);Ft(t,a),Bt(a),Ze()}function Ru(e){const t=e?.value??"",n=te(t);if(!n)return;const a=Pa(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=wt(a);if(s==="maintenance"||s==="retired"){E(Yt(s));return}const r=te(n),{index:i,items:c=[]}=Dt();if(c.findIndex(h=>te(h.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:d,end:u}=An();if(!d||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:y=[]}=ye(),f=i!=null&&y[i]||null,p=f?.id??f?.reservationId??null;if(ft(r,d,u,p)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=en(a);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:m,equipmentId:m,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];Ft(i,g),e&&(e.value=""),Bt(g),Ze()}function wa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=$r(t),a=te(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=wt(n);if(s==="maintenance"||s==="retired"){E(Yt(s));return}const{start:r,end:i}=An();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:l=[]}=Dt();if(l.some(g=>te(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ye(),y=c!=null&&u[c]||null,f=y?.id??y?.reservationId??null;if(ft(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const p=en(n);if(!p){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const m=[...l,{id:p,equipmentId:p,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];Ft(c,m),Bt(m),Ze(),e.value=""}function Io(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),wa(e))});const t=()=>{Pr(e.value,"edit-res-equipment-description-options")&&wa(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Ze()});const e=()=>{Pu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{xo()})}typeof window<"u"&&(window.getEditReservationDateRange=An,window.renderEditPaymentHistory=Oa);function Mu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){gs(e);return}wa(e)}}function Cp(){jt(),Io()}function zu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let mn=null,ut=[],mt=[],ks=null,Re={},ss=!1;const Ou="__DEBUG_CREW__";function Hu(){try{if(typeof window<"u"){if(new URLSearchParams(window.location.search||"").get("debugCrew")==="1")return!0;const t=window.localStorage?.getItem(Ou);if(t&&["1","true","on","yes"].includes(String(t).toLowerCase()))return!0}}catch{}return!1}function Hi(e,t){if(Hu())try{console.log(`🪵 [crew-debug:edit] ${e}`,t)}catch{}}function $s(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function Ps(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Dt(){return{index:mn,items:ut,payments:mt}}function Ft(e,t,n=mt){mn=typeof e=="number"?e:null,ut=Array.isArray(t)?[...t]:[],mt=Array.isArray(n)?[...n]:[]}function _o(){mn=null,ut=[],Mc(),mt=[]}function Ha(){return[...mt]}function li(e){mt=Array.isArray(e)?[...e]:[]}function Vu(e){e&&(mt=[...mt,e])}function Uu(e){!Number.isInteger(e)||e<0||(mt=mt.filter((t,n)=>n!==e))}function Bn(e,t=1){const n=Number.parseFloat(v(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function Cs(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(v(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Ku(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:Bn(e.qty??e.quantity??e.count??1),price:Cs(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Qu(e,t=0){if(!e||typeof e!="object")return null;const n=Fn(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=Bn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:Ns(e)).map(f=>Ku(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=Cs(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=Cs(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const l=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,l,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,y=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:v(String(u)),name:v(String(u)),qty:a,price:c,barcode:l,packageItems:r,image:y}}function Gu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Wu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,l)=>Qu(c,l)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const l=Bn(c.qty??c.quantity??1);if(c.barcode){const d=te(c.barcode);if(d){const u=`package::${d}`;r.set(u,(r.get(u)??0)+l)}}(c.packageItems||[]).forEach(d=>{if(!d)return;const u=l*Bn(d.qty??d.quantity??1),y=d.equipmentId??null,f=d.normalizedBarcode||(d.barcode?te(d.barcode):null);if(y!=null){const p=`equipment::${String(y)}`;r.set(p,(r.get(p)??0)+u)}if(f){const p=`barcode::${f}`;r.set(p,(r.get(p)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const h=Fn(c.packageId??c.package_id??c.id??"");s.some(q=>q.packageId===h)||i.push({...c});return}const l=Bn(c.qty??c.quantity??1),d=en(c),u=c.barcode?te(c.barcode):null,y=[];d!=null&&y.push(`equipment::${String(d)}`),u&&y.push(`barcode::${u}`);const f=y.map(h=>r.get(h)??0).filter(h=>h>0);if(!f.length){i.push({...c});return}const p=Math.min(...f);if(p<=0){i.push({...c});return}const m=Math.min(p,l);if(Gu(r,y,m),m>=l)return;const g=l-m;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Xu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ko(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function $o(e){if(!e)return null;const t=v(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ju(e,t){if(e){e.value="";return}}function Cn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Po(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(v(String(e.value??""))),a=Number.parseFloat(v(String(e.amount??""))),s=Number.parseFloat(v(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),l=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,d=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:l,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:d}}function Yu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((l,d)=>String(d.createdAt||d.start||"").localeCompare(String(l.createdAt||l.start||""))):[],c=[`<option value="">${Cn(a)}</option>`];i.forEach(l=>{c.push(`<option value="${Cn(l.id)}">${Cn(l.title||a)}</option>`)}),r&&!i.some(l=>String(l.id)===r)&&c.push(`<option value="${Cn(r)}">${Cn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function Co(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const l=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",l&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}Ls("tax");const c=Re?.updateEditReservationSummary;typeof c=="function"&&c()}function Ls(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Re?.updateEditReservationSummary;typeof r=="function"&&r()};if(ss){a();return}ss=!0;const s=()=>{ss=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(Ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),st("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?st("edit-res-company-share"):n.checked&&(n.checked=!1));s()}async function Vi(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:l}=ye(),u=Qt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Re={...Re,reservation:u,projects:l||[]},t?.(),Yu(l||[],u);const y=u.projectId&&l?.find?.(D=>String(D.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:p}=Nt(u,y),m=u.items?u.items.map(D=>({...D,equipmentId:D.equipmentId??D.equipment_id??D.id,barcode:te(D?.barcode)})):[],g=Wu(u,m),_=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(D=>Po(D)).filter(Boolean);Ft(e,g,_);const q=o("reservations.list.unknownCustomer","غير معروف"),A=c?.find?.(D=>String(D.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const j=document.getElementById("edit-res-id");j&&(j.value=u.reservationId||u.id);const U=document.getElementById("edit-res-customer");U&&(U.value=A?.customerName||q);const S=typeof a=="function"?a(u.start):{date:"",time:""},I=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",S.date),n?.("edit-res-start-time",S.time),n?.("edit-res-end",I.date),n?.("edit-res-end-time",I.time);const P=document.getElementById("edit-res-notes");P&&(P.value=u.notes||"");const k=document.getElementById("edit-res-discount");if(k){const D=p?0:u.discount??0;k.value=v(D)}const O=document.getElementById("edit-res-discount-type");O&&(O.value=p?"percent":u.discountType||"percent");const $=u.projectId?!1:!!u.applyTax,N=document.getElementById("edit-res-tax");N&&(N.checked=$);const X=document.getElementById("edit-res-company-share");if(X){const D=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=D!=null?Number.parseFloat(v(String(D).replace("%","").trim())):NaN,M=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,W=M!=null?M===!0||M===1||M==="1"||String(M).toLowerCase()==="true":Number.isFinite(R)&&R>0,ie=W&&Number.isFinite(R)&&R>0?R:Ct,ne=$||W;X.checked=ne,X.dataset.companyShare=String(ie)}$s(f,{disable:p});const C=document.getElementById("edit-res-paid"),B=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");C&&(C.value=B,C.dataset&&delete C.dataset.userSelected);const x=document.getElementById("edit-res-payment-progress-type"),Y=document.getElementById("edit-res-payment-progress-value");x?.dataset?.userSelected&&delete x.dataset.userSelected,x&&(x.value="percent"),Ju(Y);let K=Array.isArray(u.crewAssignments)&&u.crewAssignments.length?u.crewAssignments:Array.isArray(u.techniciansDetails)&&u.techniciansDetails.length?u.techniciansDetails:(u.technicians||[]).map(D=>String(D));if(!Array.isArray(K)||K.length===0){const D=zc(u.id??u.reservationId??u.reservation_code??null);Array.isArray(D)&&D.length&&(K=D)}try{await sr()}catch(D){console.warn("[reservationsEdit] positions load failed (non-fatal)",D)}if(Oc(K),s?.(g),typeof window<"u"){const D=window?.renderEditPaymentHistory;typeof D=="function"&&D()}Co(),r?.();const F=document.getElementById("editReservationModal");ks=Xu(F,i),ks?.show?.()}async function Zu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(mn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const l=document.getElementById("edit-res-start")?.value?.trim(),d=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),y=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",p=v(document.getElementById("edit-res-discount")?.value||"0");let m=parseFloat(p)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const h=Ps(),_=document.getElementById("edit-res-paid"),q=_?.dataset?.userSelected==="true",A=q&&_?.value||"unpaid",j=document.getElementById("edit-res-payment-progress-type"),U=document.getElementById("edit-res-payment-progress-value"),S=ko(j),I=$o(U),P=document.getElementById("edit-res-project")?.value||"",k=Fc();k.map(G=>G?.technicianId).filter(Boolean);const O=document.getElementById("edit-res-company-share"),$=document.getElementById("edit-res-tax");if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(G,ge)=>`${G}T${ge||"00:00"}`,X=N(l,d),C=N(u,y);if(X&&C&&new Date(X)>new Date(C)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const x=Qt()?.[mn];if(!x){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(ut)||ut.length===0&&k.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const Y=typeof t=="function"?t:()=>!1,K=x.id??x.reservationId;for(const G of ut){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=L?.barcode??L?.normalizedBarcode??"";if(!re)continue;const be=wt(re);if(be==="reserved"){const he=te(re);if(!Y(he,X,C,K))continue}if(be!=="available"){E(Yt(be));return}}continue}const ge=wt(G.barcode);if(ge==="reserved"){const L=te(G.barcode);if(!Y(L,X,C,K))continue}if(ge!=="available"){E(Yt(ge));return}}for(const G of ut){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const L of G.packageItems){const re=te(L?.barcode??L?.normalizedBarcode??"");if(re&&Y(re,X,C,K)){const be=L?.desc||L?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),he=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${v(String(be))})`;E(he);return}}continue}const ge=te(G.barcode);if(Y(ge,X,C,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const F=typeof n=="function"?n:()=>!1;for(const G of ut){if(G?.type!=="package")continue;const ge=G.packageId??G.package_id??null;if(ge&&F(ge,X,C,K)){const L=G.desc||G.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${v(String(L))} محجوزة بالفعل في الفترة المختارة`));return}}const D=typeof a=="function"?a:()=>!1;for(const G of k)if(G?.technicianId&&D(G.technicianId,X,C,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const R=Array.isArray(Re.projects)&&Re.projects.length?Re.projects:ye().projects||[],M=P&&R.find(G=>String(G.id)===String(P))||null,W={...x,projectId:P?String(P):null,confirmed:h},{effectiveConfirmed:ie,projectLinked:ne,projectStatus:ue}=Nt(W,M);let H=!!O?.checked,oe=!!$?.checked;if(ne&&(H&&(O.checked=!1,H=!1),oe=!1),!ne&&H!==oe){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}oe&&(st("edit-res-company-share"),H=!!O?.checked);let Ee=H?getCompanySharePercent("edit-res-company-share"):null;H&&(!Number.isFinite(Ee)||Ee<=0)&&(st("edit-res-company-share"),Ee=getCompanySharePercent("edit-res-company-share"));const we=H&&oe&&Number.isFinite(Ee)&&Ee>0,Te=ne?!1:oe;ne&&(m=0,g="percent");const Q=Ds(ut,m,g,Te,k,{start:X,end:C,companySharePercent:we?Ee:0});let Z=Ha();if(Number.isFinite(I)&&I>0){const G=Q;let ge=null,L=null;S==="amount"?(ge=I,G>0&&(L=I/G*100)):(L=I,G>0&&(ge=I/100*G));const re=Po({type:S,value:I,amount:ge,percentage:L,recordedAt:new Date().toISOString()});re&&(Z=[...Z,re],li(Z)),U&&(U.value="")}const se=Fs({totalAmount:Q,history:Z}),Ae=Rs({manualStatus:A,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:Q});_&&!q&&(_.value=Ae,_.dataset&&delete _.dataset.userSelected);let ze=x.status??"pending";ne?ze=M?.status??ue??ze:["completed","cancelled"].includes(String(ze).toLowerCase())||(ze=h?"confirmed":"pending");const ae=er({reservationCode:x.reservationCode??x.reservationId??null,customerId:x.customerId,start:X,end:C,status:ze,title:x.title??null,location:x.location??null,notes:f,projectId:P?String(P):null,totalAmount:Q,discount:m,discountType:g,applyTax:Te,paidStatus:Ae,confirmed:ie,items:ut.map(G=>({...G,equipmentId:G.equipmentId??G.id})),crewAssignments:k,companySharePercent:we?Ee:null,companyShareEnabled:we,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{Hi("about to submit",{editingIndex:mn,crewAssignments:k,techniciansPayload:ae?.technicians,payload:ae});const G=await Rc(x.id||x.reservationId,ae);Hi("server response",{reservation:G?.id??G?.reservationId??G?.reservation_code,technicians:G?.technicians,crewAssignments:G?.crewAssignments,techniciansDetails:G?.techniciansDetails}),await ir(),En(),Fe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),_o(),c?.({type:"updated",reservation:G}),r?.(),i?.(),ks?.hide?.()}catch(G){console.error("❌ [reservationsEdit] Failed to update reservation",G);const ge=ka(G)?G.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ge,"error")}}function Lp(e={}){Re={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Re,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=v(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{Ls("tax")}),c.dataset.listenerAttached="true");const l=document.getElementById("edit-res-company-share");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{Ls("share")}),l.dataset.listenerAttached="true");const d=document.getElementById("edit-res-payment-progress-type");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{d.dataset.userSelected="true",t?.()}),d.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=v(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const y=document.getElementById("edit-res-project");y&&!y.dataset.listenerAttached&&(y.addEventListener("change",()=>{Co();const h=Array.isArray(Re.projects)&&Re.projects.length?Re.projects:ye().projects||[],_=y.value&&h.find(S=>String(S.id)===String(y.value))||null,A={...Re?.reservation??{},projectId:y.value||null,confirmed:Ps()},{effectiveConfirmed:j,projectLinked:U}=Nt(A,_);$s(j,{disable:U}),t?.()}),y.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const h=!Ps();$s(h),t?.()}),f.dataset.listenerAttached="true");const p=document.getElementById("save-reservation-changes");p&&!p.dataset.listenerAttached&&(p.addEventListener("click",()=>{Zu(Re).catch(h=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",h)})}),p.dataset.listenerAttached="true");const m=document.getElementById("edit-res-equipment-barcode");if(m&&!m.dataset.listenerAttached){let h=null;const _=()=>{m.value?.trim()&&(clearTimeout(h),h=null,n?.(m))};m.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),_())});const q=()=>{if(clearTimeout(h),!m.value?.trim())return;const{start:A,end:j}=getEditReservationDateRange();!A||!j||(h=setTimeout(()=>{_()},150))};m.addEventListener("input",q),m.addEventListener("change",_),m.dataset.listenerAttached="true"}Io?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{_o(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const ep=ye()||{};let at=(ep.projects||[]).map(jo),Kn=!1;function tp(){return at}function Qn(e){at=Array.isArray(e)?e.map(di):[],xa({projects:at});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return at}async function Lo(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,l])=>{l==null||l===""||t.set(c,String(l))});const n=t.toString(),s=(await it(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Va);return Qn(i),Kn=!0,at}async function To({force:e=!1,params:t=null}={}){if(!e&&Kn&&at.length>0)return at;try{return await Lo(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),at}}async function np(e){const t=await it("/projects/",{method:"POST",body:e}),n=Va(t?.data??{}),a=[...at,n];return Qn(a),Kn=!0,n}async function ap(e,t){const n=await it(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Va(n?.data??{}),s=at.map(r=>String(r.id)===String(e)?a:r);return Qn(s),Kn=!0,a}async function sp(e){await it(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=at.filter(n=>String(n.id)!==String(e));Qn(t),Kn=!0}function ip({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:l,paymentStatus:d,equipmentEstimate:u=0,expenses:y=[],taxAmount:f=0,totalWithTax:p=0,discount:m=0,discountType:g="percent",companyShareEnabled:h=!1,companySharePercent:_=null,companyShareAmount:q=0,paidAmount:A=null,paidPercentage:j=null,paymentProgressType:U=null,paymentProgressValue:S=null,confirmed:I=!1,technicians:P=[],equipment:k=[],payments:O,paymentHistory:$}={}){const N=Array.isArray(P)?P.map(R=>Number.parseInt(String(R),10)).filter(R=>Number.isInteger(R)&&R>0):[],X=Array.isArray(k)?k.map(R=>{const M=Number.parseInt(String(R.equipmentId??R.equipment_id??R.id??0),10),W=Number.parseInt(String(R.qty??R.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(W)&&W>0?W:1}}).filter(Boolean):[],C=Array.isArray(y)?y.map(R=>{const M=Number.parseFloat(R?.amount??R?.value??0)||0,W=(R?.label??R?.name??"").trim();return W?{label:W,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],B=C.reduce((R,M)=>R+(M?.amount??0),0),x={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!l,payment_status:d??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(B*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(p)||0)*100)/100,confirmed:!!I,technicians:N,equipment:X,expenses:C},Y=Math.max(0,Number.parseFloat(m)||0);x.discount=Y,x.discount_type=g==="amount"?"amount":"percent";const K=Number.parseFloat(_),F=!!h&&Number.isFinite(K)&&K>0;x.company_share_enabled=F,x.company_share_percent=F?K:0,x.company_share_amount=F?Math.max(0,Number.parseFloat(q)||0):0,Number.isFinite(Number(A))&&(x.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(j))&&(x.paid_percentage=Math.max(0,Number.parseFloat(j)||0)),(U==="amount"||U==="percent")&&(x.payment_progress_type=U),S!=null&&S!==""&&(x.payment_progress_value=Number.parseFloat(S)||0),e&&(x.project_code=String(e).trim());const D=O!==void 0?O:$;if(D!==void 0){const R=No(D)||[];x.payments=R.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return x.end_datetime||delete x.end_datetime,x.client_company||(x.client_company=null),x}function Va(e={}){return di(e)}function jo(e={}){return di(e)}function di(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(p=>{if(p==null)return null;if(typeof p=="object"){const m=p.id??p.technician_id??p.technicianId;return m!=null?String(m):null}return String(p)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(p=>{const m=p?.equipment_id??p?.equipmentId??p?.id??null,g=p?.quantity??p?.qty??0,h=p?.barcode??p?.code??"",_=p?.description??p?.name??"";return{equipmentId:m!=null?String(m):null,qty:Number.parseInt(String(g),10)||0,barcode:h,description:_}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((p,m)=>({id:p?.id??`expense-${t??"x"}-${m}`,label:p?.label??"",amount:Number.parseFloat(p?.amount??0)||0})),l=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,d=e.company_share_enabled??e.companyShareEnabled,u=d!=null?d===!0||d===1||String(d).toLowerCase()==="true":l>0,y=e.payment_history??e.paymentHistory??e.payments??null,f=No(y);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?l:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(p=>typeof p=="object"?p:{id:p}),equipment:r,expenses:c,paymentHistory:f}}function rp(e){return e instanceof Ui}function is(e){if(e==null||e==="")return null;const t=v(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function op(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=is(e.value);let s=is(e.amount),r=is(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,l=e.recordedAt??e.recorded_at??e.date??null;let d=null;if(l){const y=new Date(l);Number.isNaN(y.getTime())||(d=y.toISOString())}d||(d=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:d}}function No(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>op(t)).filter(Boolean):[]}const Tp=Object.freeze(Object.defineProperty({__proto__:null,buildProjectPayload:ip,createProjectApi:np,deleteProjectApi:sp,ensureProjectsLoaded:To,getProjectsState:tp,isApiError:rp,mapLegacyProject:jo,mapProjectFromApi:Va,refreshProjectsFromApi:Lo,setProjectsState:Qn,updateProjectApi:ap},Symbol.toStringTag,{value:"Module"})),Aa="reservations-ui:ready",Ut=typeof EventTarget<"u"?new EventTarget:null;let Kt={};function cp(e){return Object.freeze({...e})}function lp(){if(!Ut)return;const e=Kt,t=typeof CustomEvent=="function"?new CustomEvent(Aa,{detail:e}):{type:Aa,detail:e};typeof Ut.dispatchEvent=="function"&&Ut.dispatchEvent(t)}function dp(e={}){if(!e||typeof e!="object")return Kt;const t={...Kt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Kt=cp(t),lp(),Kt}function up(e){if(e)return Kt?.[e]}function jp(e){const t=up(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Kt)?.[e];typeof i=="function"&&(Ut&&Ut.removeEventListener(Aa,a),n(i))};Ut&&Ut.addEventListener(Aa,a)})}function Np(){return To().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ye()||{};Hc(e||[]),Dr()})}function ui(e=null){Dr(),Bo(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function pp(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ts(){return{populateEquipmentDescriptionLists:jt,setFlatpickrValue:zu,splitDateTime:Wi,renderEditItems:Bt,updateEditReservationSummary:Ze,addEquipmentByDescription:Mu,addEquipmentToEditingReservation:Ru,addEquipmentToEditingByDescription:wa,combineDateTime:Dn,hasEquipmentConflict:ft,hasTechnicianConflict:Zi,renderReservations:Bo,handleReservationsMutation:ui,ensureModal:pp}}function Bo(e="reservations-list",t=null){Au({containerId:e,filters:t,onShowDetails:Do,onConfirmReservation:Ro})}function Do(e){return xu(e,{getEditContext:Ts,onEdit:(t,{reservation:n})=>{Mo(t,n)},onDelete:Fo})}function Fo(e){return Zt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?_u(e,{onAfterChange:ui}):!1:(On(),!1)}function Ro(e){return ku(e,{onAfterChange:ui})}function Mo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}Vi(e,Ts());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}Vi(e,Ts());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}xc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Bp(){dp({showReservationDetails:Do,deleteReservation:Fo,confirmReservation:Ro,openReservationEditor:Mo})}export{yl as $,sp as A,np as B,ld as C,zr as D,Or as E,kp as F,hp as G,Lp as H,Np as I,Cp as J,gp as K,ui as L,Ep as M,Dr as N,Sp as O,wp as P,Ze as Q,Ts as R,pe as S,Fo as T,Ro as U,Mo as V,zu as W,Sn as X,Jc as Y,da as Z,yp as _,Fe as a,bp as a0,Tp as a1,Pi as b,Bo as c,Fr as d,Pp as e,ip as f,up as g,Do as h,Ap as i,xp as j,tp as k,rp as l,Va as m,Rr as n,Ip as o,$p as p,vp as q,Vn as r,dp as s,qp as t,ap as u,Lo as v,jp as w,Bp as x,To as y,_p as z};
