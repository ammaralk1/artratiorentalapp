import{n as h,d as pe,f as uc,t as o,b as We,h as S,j as Bt,o as qn,s as ls,A as qr,z as mc,k as Re,B as Sr,u as pc}from"./auth.js";import{n as Y,x as Xe,y as Er,z as fc,D as it,A as ds,B as Qs,C as yn,E as Qt,F as sa,G as yc,f as ra,H as Je,I as us,J as xr,K as gc,L as bc,M as hc,N as vc,O as zn,P as qc,Q as wr,R as Sc,S as Ir,v as ms,h as ps,j as fs,T as Ar,U as Ec,s as Sn,c as ia,V as kr,W as xc,X as _r,Y as wc,p as oa,a as $r,g as Pt,Z as Ic,_ as Ac,$ as Ba,a0 as kc,w as _c,a1 as $c,a2 as Pc,b as Tc}from"./reservationsService.js";const _a="select.form-select:not([data-no-enhance]):not([multiple])",Ye=new WeakMap;let $a=null,Gs=!1,nt=null;function em(e=document){e&&(e.querySelectorAll(_a).forEach(t=>Bn(t)),!$a&&e===document&&($a=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(_a)&&Bn(a),a.querySelectorAll?.(_a).forEach(s=>Bn(s)))})}),$a.observe(document.body,{childList:!0,subtree:!0})),Gs||(Gs=!0,document.addEventListener("pointerdown",Cc,{capture:!0})))}function Ln(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Bn(e);return}const t=e.closest(".enhanced-select");t&&(ys(t),Hn(t),Da(t))}function Bn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Ln(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};Ye.set(t,r),a.addEventListener("click",()=>Nc(t)),a.addEventListener("keydown",i=>Lc(i,t)),s.addEventListener("click",i=>Dc(i,t)),s.addEventListener("keydown",i=>Bc(i,t)),e.addEventListener("change",()=>{Hn(t),Pr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Da(t),c&&jc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ys(t),Hn(t),Da(t)}function jc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ys(t),Hn(t)})))}function ys(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Pr(e)}function Hn(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Pr(e){const t=Ye.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Da(e){const t=Ye.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Nc(e){Ye.get(e)&&(e.getAttribute("data-open")==="true"?Yt(e):Tr(e))}function Tr(e){const t=Ye.get(e);if(!t)return;nt&&nt!==e&&Yt(nt,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),nt=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Yt(e,{focusTrigger:t=!0}={}){const n=Ye.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),nt===e&&(nt=null))}function Cc(e){if(!nt)return;const t=e.target;t instanceof Node&&(nt.contains(t)||Yt(nt,{focusTrigger:!1}))}function Lc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Tr(t)):n==="Escape"&&Yt(t)}function Bc(e,t){const n=e.key,a=Ye.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&jr(i,t)}else n==="Escape"&&(e.preventDefault(),Yt(t))}function Dc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&jr(n,t)}function jr(e,t){const n=Ye.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Yt(t)}const Zt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let at=null;function gs(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Nr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Fc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Rc(e={}){const t=Fc({...e,activatedAt:Date.now()});return at=t,Nr(!0,t.mode||"create"),gs(Zt.change,{active:!0,selection:{...t}}),t}function On(e="manual"){if(!at)return;const t=at;at=null,Nr(!1),gs(Zt.change,{active:!1,previous:t,reason:e})}function Cr(){return!!at}function Mc(){return at?{...at}:null}function zc(e){if(!at)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return gs(Zt.requestAdd,{...t,selection:{...at}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||On("tab-changed")});const Hc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Oc=new Set(["maintenance","reserved","retired"]);function Vc(e){const t=String(e??"").trim().toLowerCase();return t&&Hc.get(t)||"available"}function Uc(e){return e?typeof e=="object"?e:ca(e):null}function ot(e){const t=Uc(e);return t?Vc(t.status||t.state||t.statusLabel||t.status_label):"available"}function bs(e){return!Oc.has(ot(e))}function Dt(e={}){return e.image||e.imageUrl||e.img||""}function Kc(e){if(!e)return null;const t=Y(e),{equipment:n=[]}=pe();return(n||[]).find(a=>Y(a?.barcode)===t)||null}function ca(e){const t=Y(e);if(!t)return null;const{equipment:n=[]}=pe();return(n||[]).find(a=>Y(a?.barcode)===t)||null}const Qc=pe()||{};let ut=(Qc.equipment||[]).map(Xc),Fa=!1,dn="",kt=null,jt=null,Nt=null,la=!1,Ws=!1;function Gc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Wc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Xc(e={}){return hs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function da(e={}){return hs(e)}function hs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=En(e.quantity??e.qty??0),i=ua(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=je(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Jc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Jc(e){return e!=null&&e!==""}function En(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function ua(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Yc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function Xs(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Zc(e,t){const n=Xs(e),a=Xs(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Vn(e?.desc||e?.description||e?.name||""),d=Vn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Ee(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function je(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function el(e){return je(e)}function Ra(){if(!Cr())return null;const e=Mc();return e?{...e}:null}function tl(e){const t=Ra();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=Y(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>bs(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!Xe(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>je(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function nl(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Lr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ra();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ra(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?On("package-finish-button"):(On("return-button"),nl())}),t.dataset.listenerAttached="true")}function Me(){return ut}function Ct(e){ut=Array.isArray(e)?e.map(hs):[],ls({equipment:ut}),Wc()}function Vn(e){return String(e??"").trim().toLowerCase()}function pt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Vn(t);return n||(n=Vn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function ma(e){const t=pt(e);return t?Me().filter(n=>pt(n)===t):[]}function pa(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=fa(e);if(n){const a=Ee(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Ee(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function vs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Un(){const e=vs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function qs(e={}){const t=vs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Gt(e){la=e;const t=vs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function tm(e){if(!Bt()){qn();return}if(!e)return;try{await sl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",I=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!f||!v){d+=1;return}c.push(Ss({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:b,image_url:I}))}),!c.length){S(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await We("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(da):[];if(u.length){const m=[...Me(),...u];Ct(m)}await ya({showToastOnError:!1}),Ne();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),S(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=en(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");S(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),S(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const al="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let sn=null;function sl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):sn||(sn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=al,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),sn=null,e}),sn)}function Ss({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=el(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:En(a),unit_price:ua(s),barcode:d,status:l,image_url:c?.trim()||null}}async function rl(){if(!Bt()){qn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await We("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ya({showToastOnError:!1}),S(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=en(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");S(t,"error")}}function fa(e){return e.image||e.imageUrl||e.img||""}function il(e){const t=je(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Kn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Ee(a)}</td></tr>`}n&&(n.textContent="0")}function Br(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=kt?.groupKey||pt(e);if(!r){Kn();return}const i=Me().filter(p=>pt(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Kn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Me(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=Ee(String(p.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Ee(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),I=l.indexOf(p),v=Ee(o("equipment.item.actions.delete","🗑️ حذف")),_=I>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${I}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${il(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Ee(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${_}</td>
        </tr>
      `}).join("");n.innerHTML=u}function ol({item:e,index:t}){const n=fa(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Bt(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),g=y.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),I=je(e.status);let v=`${Ee(c.available)}: ${Ee(g)} ${Ee(b)} ${Ee(u)}`,_="available";if(y===0){const M={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},Q=M[I]||M.default;v=Ee(Q.text),_=Q.modifier}const B=`<span class="equipment-card__availability equipment-card__availability--${_}">${v}</span>`,R="",q=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",P=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:M,value:Q})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </span>
          `).join("")}
    </div>`,T=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),j=T.length?`<div class="equipment-card__categories">${T.map(({label:M,value:Q})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${M}</span>
              <span class="equipment-card__detail-value">${Q}</span>
            </div>
          `).join("")}</div>`:"",N=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",D=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${P}
    </div>
  `,z=[],k=tl(e),G=k?.availableBarcodes?.length?k.availableBarcodes.join(","):k?.barcode?k.barcode:"";let V="",$="";if(k.active){const M=`equipment-select-qty-${t}`,Q=!!k.canSelect,re=Q?Math.max(1,Number(k.maxQuantity||k.availableBarcodes?.length||1)):1,se=Math.max(1,Math.min(re,99)),ue=[];for(let ne=1;ne<=se;ne+=1){const ce=h(String(ne));ue.push(`<option value="${ne}"${ne===1?" selected":""}>${ce}</option>`)}const W=Q?"":" disabled",ee=o("reservations.create.equipment.selector.quantityLabel","الكمية"),me=Q?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(re))}`:k.reason?k.reason:"";V=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${M}">${ee}</label>
        <select class="equipment-card__quantity-select" id="${M}" data-equipment-select-quantity${W}>
          ${ue.join("")}
        </select>
        ${me?`<span class="equipment-card__selection-hint">${Ee(me)}</span>`:""}
      </div>
    `;const qe=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ie=Q?"":" disabled",O=k.reason?` title="${Ee(k.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${Q?re:0}"`];G&&Z.push(`data-selection-barcodes="${Ee(G)}"`),e.groupKey&&Z.push(`data-selection-group="${Ee(String(e.groupKey))}"`),$=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Ie}${O}>${qe}</button>
    `}i&&z.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const U=z.length?z.join(`
`):"",F=Ee(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Ee(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${F}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${R}
        ${B}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${D}
        </div>
      </div>
      <div class="equipment-card__body">
        ${j}
        ${N}
      </div>
      ${V||$||U?`<div class="equipment-card__actions equipment-card__actions--center">
            ${V}
            ${$}
            ${U}
          </div>`:""}
    </article>
  `}function cl(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Ln(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Ln(s)}const r=document.getElementById("filter-status");r&&Ln(r)}function xn(){const e=pe();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return ut=t||[],ut;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=je(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!ll(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Ct(c):(ut=c,ls({equipment:ut})),ut}function ll(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Pa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Ne(){const e=document.getElementById("equipment-list");if(!e)return;Lr();const t=xn(),n=Array.isArray(t)?t:Me(),a=new Map;n.forEach(g=>{if(!g)return;const b=pt(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],I=g.reduce((w,A)=>w+(Number.isFinite(Number(A.qty))?Number(A.qty):0),0),v=["maintenance","reserved","available","retired"],_=g.map(w=>je(w.status)).sort((w,A)=>v.indexOf(w)-v.indexOf(A))[0]||"available",B=g.reduce((w,A)=>{const P=En(A?.qty??0)||0,T=je(A?.status);return T==="reserved"?w.reserved+=P:T==="maintenance"&&(w.maintenance+=P),w},{reserved:0,maintenance:0}),R=Math.max(I-B.reserved-B.maintenance,0);return{item:{...b,qty:I,status:_,variants:g,groupKey:pt(b),reservedQty:B.reserved,maintenanceQty:B.maintenance,availableQty:R},index:n.indexOf(b)}});s.sort((g,b)=>Zc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?je(l):"";if(Fa&&!n.length){e.innerHTML=Pa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(dn&&!n.length){e.innerHTML=Pa(dn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),I=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||I.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),_=!c||g.category===c,B=!d||g.sub===d,R=!u||je(g.status)===u;return v&&_&&B&&R}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(ol).join(""):Pa(f);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),I=m.length?`${b} ${g}`:`0 ${g}`;y.textContent=I}cl(n)}async function ya({showToastOnError:e=!0}={}){Fa=!0,dn="",Ne();try{const t=await We("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(da):[];Ct(n)}catch(t){dn=en(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&S(dn,"error")}finally{Fa=!1,Ne()}}function en(e,t,n){if(e instanceof qr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function dl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=ua(t.querySelector("#new-equipment-price")?.value||"0"),i=En(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){S(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=Ss({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await We("/equipment/",{method:"POST",body:p}),m=da(f?.data),y=[...Me(),m];Ct(y),Ne(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),S(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=en(f,"equipment.toast.addFailed","تعذر إضافة المعدة");S(m,"error")}}async function Dr(e){if(!Bt()){qn();return}const t=Me(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await We(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Ct(a),Ne(),S(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=en(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");S(s,"error")}}async function ul(e,t){const n=Me(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Ct(r),Ne();return}const s=Ss({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await We(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=da(r?.data),c=[...n];c[e]=i,Ct(c),Ne(),S(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=en(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw S(i,"error"),r}}function jn(){Ne()}function Fr(e){const n=Me()[e];if(!n)return;jt=e;const a=ma(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>je(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||je(s.status);document.getElementById("edit-equipment-index").value=e,qs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:fa(s)||"",barcode:s.barcode||"",status:s.status||c}),Gt(!1),Nt=Un(),pa(s),Br(s),kt={groupKey:pt(s),barcode:String(s.barcode||""),id:s.id||null},Gc(document.getElementById("editEquipmentModal"))?.show()}function ml(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";zc({barcodes:l,quantity:i,groupKey:p,description:u})||S(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Dr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Fr(s)}}function pl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Fr(n)}}function fl(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Dr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Rr(){if(!kt||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Me(),a=kt.id?n.find(d=>String(d.id)===String(kt.id)):null,s=kt.groupKey,r=s?n.find(d=>pt(d)===s):null,i=a||r;if(!i){Kn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),jt=c}if(Br(i),!la){const d=ma(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>je(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||je(l.status);qs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:fa(l)||"",barcode:l.barcode||"",status:l.status||f}),Nt=Un()}pa(primary)}function yl(){document.getElementById("search-equipment")?.addEventListener("input",jn),document.getElementById("filter-category")?.addEventListener("change",jn),document.getElementById("filter-sub")?.addEventListener("change",jn),document.getElementById("filter-status")?.addEventListener("change",jn),document.getElementById("add-equipment-form")?.addEventListener("submit",dl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),rl().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",ml),t.addEventListener("keydown",pl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",fl),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Yc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!la){Nt=Un(),Gt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){S(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:En(document.getElementById("edit-equipment-quantity").value)||1,price:ua(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ul(t,n),Nt=Un(),Gt(!1),Rr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{yl(),Ne(),ya();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Nt&&qs(Nt),jt!=null){const a=Me()[jt];if(a){const r=ma(a)[0]||a;pa(r)}}Gt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Ne(),Gt(la),jt!=null){const t=Me()[jt];if(t){const a=ma(t)[0]||t;pa(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ya({showToastOnError:!1})});document.addEventListener(uc.USER_UPDATED,()=>{Ne()});document.addEventListener("equipment:changed",()=>{Rr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{kt=null,Kn(),jt=null,Nt=null,Gt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!Ws&&(document.addEventListener(Zt.change,()=>{Lr(),Ne()}),Ws=!0);function _e(e=""){return h(String(e)).trim().toLowerCase()}const gl=2;function bl(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(gl):"0.00"}function Js(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function wn(e={}){const t=e?.desc||e?.description||e?.name||"",n=_e(t),a=bl(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Ft(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=wn(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=_e(i),d=Ys(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+Js(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=Ys(c),l=Js(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function gt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function Ys(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function Es(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function hl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function bt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?hl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Mr="projects:create:draft",zr="projects.html#projects-section";let Ma=null,Hr=[],za=new Map,Ha=new Map,Qn=new Map,Ta=!1,Dn=null,Zs=!1,Or=[];function vl(e){if(!e)return null;let t=Or.find(a=>a.id===e)||null;if(t)return t;const n=gc(e);return n?(t={id:e,name:hc(n)||e,price:bc(n),items:ra(n),raw:n},t):null}function Gn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Wn(e){return h(String(e||"")).trim().toLowerCase()}function ql(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Vr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Ur(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Kr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Qr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Lt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function xs(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Rt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function De(){const{input:e,hidden:t}=Rt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function It(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function Gr(e,t,{allowPartial:n=!1}={}){const a=_e(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Oa(e,t={}){return Gr(za,e,t)}function Va(e,t={}){return Gr(Ha,e,t)}function Fe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function Wr(e){Hr=Array.isArray(e)?[...e]:[]}function ws(){return Hr}function Is(e){return e&&ws().find(t=>String(t.id)===String(e))||null}function er(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Wt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:it}function Oe(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??it,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=it),t.dataset.companyShare=String(s),t.checked=!0}function Ua(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Ta){oe();return}Ta=!0;const a=()=>{Ta=!1,oe()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Oe()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Oe():n.checked&&(n.checked=!1));a()}function Sl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function tr(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function nr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function st({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=xs();if(!n||!a||!s)return;const r=ds()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;za=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:nr(m)||c})).filter(m=>{if(!m.label)return!1;const y=_e(m.label);return!y||d.has(y)?!1:(d.add(y),za.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Gn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=nr(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Xt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Rt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:ws()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Ha=new Map;const f=d.map(g=>{const b=er(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=_e(g.label);return!b||p.has(b)?!1:(p.add(b),Ha.set(b,g),!0)});r.innerHTML=f.map(g=>`<option value="${Gn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=er(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Xn(e,t,n){const{date:a,time:s}=xr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function Xr(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Xt({selectedValue:a});const r=(ds()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";st(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=tr(e,"start"),d=tr(e,"end");c&&Xn("res-start","res-start-time",c),d&&Xn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),oe(),ft()}function Jr({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:pe(),s=Array.isArray(a)?a:[];Wr(s);const r=t!=null?String(t):n.value?String(n.value):"";Xt({selectedValue:r,projectsList:s}),ft(),oe()}function ft(){const{input:e,hidden:t}=Rt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(It(n,De),a&&It(a,De)),s&&It(s,De),r&&It(r,De),i&&It(i,De),c&&It(c,De),d&&It(d,De),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Fe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ua("tax"),oe()}function As(){const{input:e,hidden:t}=Rt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Va(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Is(r.id);i?Xr(i,{skipProjectSelectUpdate:!0}):(ft(),oe())}else t.value="",e.dataset.selectedId="",ft(),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Va(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function ks(){const{input:e,hidden:t}=xs();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Oa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),oe()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Oa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function El(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){un({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),un({clearValue:!1}),!n)return;n.fromProjectForm&&(Dn={draftStorageKey:n.draftStorageKey||Mr,returnUrl:n.returnUrl||zr});const r=document.getElementById("res-project");if(n.projectId){r&&(Xt({selectedValue:String(n.projectId)}),ft());const l=Is(n.projectId);l?Xr(l,{forceNotes:!!n.forceNotes}):oe(),un()}else{r&&Xt({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Dl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Xn("res-start","res-start-time",n.start),n.end&&Xn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(ds()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(st({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(st({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):st({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),oe()}function Mt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:yn(e,n),end:yn(t,a)}}function Yr(e){const t=Wn(e);if(t){const c=Qn.get(t);if(c)return c}const{description:n,barcode:a}=Vr(e);if(a){const c=ca(a);if(c)return c}const s=_e(n||e);if(!s)return null;let r=kr();if(!r?.length){const c=pe();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&_r(r)}const i=r.find(c=>_e(c?.desc||c?.description||"")===s);return i||r.find(c=>_e(c?.desc||c?.description||"").includes(s))||null}function Zr(e,t="equipment-description-options"){const n=Wn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Wn(d.value)===n)||Qn.has(n))return!0;const{description:s}=Vr(e);if(!s)return!1;const r=_e(s);return r?(kr()||[]).some(c=>_e(c?.desc||c?.description||"")===r):!1}const xl={available:0,reserved:1,maintenance:2,retired:3};function wl(e){return xl[e]??5}function ar(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function Il(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${ar(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${ar(n)})`}function yt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=xn(),a=pe(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];_r(r);const i=new Map;r.forEach(l=>{const u=ql(l),p=Wn(u);if(!p||!u)return;const f=ot(l),m=wl(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Qn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Qn.set(l.normalized,l.bestItem);const u=Il(l),p=Gn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Gn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function ei(e,t,n={}){const{silent:a=!1}=n,s=Y(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Mt();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||S(y),{success:!1,message:y}}const c=Je();if(_s(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||S(y),{success:!1,message:y}}const l=us(s,r,i);if(l.length){const y=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||S(g),{success:!1,message:g}}if(Xe(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||S(y),{success:!1,message:y}}const u=ca(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||S(y),{success:!1,message:y}}const p=ot(u);if(p==="maintenance"||p==="retired"){const y=Lt(p);return a||S(y),{success:!1,message:y}}const f=gt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||S(y),{success:!1,message:y}}sa({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Dt(u)}),t&&(t.value=""),ct(),oe();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||S(m),{success:!0,message:m,barcode:s}}function Ka(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yr(t);if(!n){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Kc(n.barcode),s=ot(a||n);if(s==="maintenance"||s==="retired"){S(Lt(s));return}const r=Y(n.barcode);if(!r){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=gt(n);if(!i){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Dt(n)},{start:d,end:l}=Mt();if(!d||!l){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Je();if(_s(u).has(r)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=us(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");S(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Xe(r,d,l)){S(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}sa(c),ct(),oe(),S(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Al(){yt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ka(e))});const t=()=>{Zr(e.value,"equipment-description-options")&&Ka(e)};e.addEventListener("focus",()=>{if(yt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function sr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function _s(e=Je()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=Y(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=Y(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function kl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Mt();if(!t||!n){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Rc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):S(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Zt.change,t=>{sr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),sr(e,Cr()))}function _l(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=Y(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=ei(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));S(f)}else c&&S(c)}function ti(){kl(),!(Zs||typeof document>"u")&&(document.addEventListener(Zt.requestAdd,_l),Zs=!0)}function In(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Qa(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=In();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),wc(t),t==="package"&&ga()}function ga(){const{packageSelect:e,packageHint:t}=In();if(!e)return;const n=Er();Or=n,fc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),si()}function $l(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function ni(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Qt(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=vl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Qt(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(yc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:ra(i.raw??{}),d=_s(t),l=[],u=new Set;if(c.forEach(m=>{const y=Y(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=Y(m?.normalizedBarcode??m?.barcode);if(y&&Xe(y,n,a,s)){const g=us(y,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:$l(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:Y(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function ai(e,{silent:t=!1}={}){const n=Qt(e);if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Mt(),r=Je(),i=ni(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");S(i.message||d)}return i}return sa(i.package),ct(),oe(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function si(){const{packageSelect:e}=In();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;ai(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function Pl(){const{packageAddButton:e,packageSelect:t}=In();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}ai(n)}),e.dataset.listenerAttached="true")}function ri(){const{modeRadios:e}=In();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Qa(s.target.value)}),a.dataset.listenerAttached="true")}),Pl(),si();const t=zn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Qa(t)}function ct(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Je(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Ft(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Dt(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,I=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,_=u.items.some(w=>w?.type==="package"),B=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),R=B.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${B.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(_){const w=new Map;if(u.items.forEach(A=>{Array.isArray(A?.packageItems)&&A.packageItems.forEach(P=>{if(!P)return;const T=Y(P.barcode||P.desc||Math.random()),j=w.get(T);if(j){j.qty+=Number.isFinite(Number(P.qty))?Number(P.qty):1;return}w.set(T,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(P.qty))?Number(P.qty):1,barcode:P.barcode??P.normalizedBarcode??""})})}),w.size){const A=Array.from(w.values()).map(P=>{const T=h(String(P.qty)),j=P.desc||h(String(P.barcode||"")),N=P.barcode?` <span class="reservation-package-items__barcode">(${h(String(P.barcode))})</span>`:"";return`<li>${j}${N} × ${T}</li>`}).join("");q=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${A}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${_?`${q||""}${R||""}`:R}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${_?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${_?"disabled":""}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Tl(e){const t=Je(),a=Ft(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(qc(s),ct(),oe())}function jl(e){const t=Je(),n=t.filter(a=>wn(a)!==e);n.length!==t.length&&(wr(n),ct(),oe())}function Nl(e){const t=Je(),a=Ft(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Mt();if(!s||!r){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>Y(p.barcode))),{equipment:c=[]}=pe(),d=(c||[]).find(p=>{const f=Y(p?.barcode);return!f||i.has(f)||wn({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!bs(p)?!1:!Xe(f,s,r)});if(!d){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=Y(d.barcode),u=gt(d);if(!u){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}sa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Dt(d)}),ct(),oe()}function oe(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Mt();i&&Oe();const p=Wt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=Ur(f),g=Kr(m);Qs({selectedItems:Je(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=Qs.lastResult;b?(Qr(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,Fe(c,b.paymentStatus))):Fe(c,d)}function Cl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),oe()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",oe),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(De()){n.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ua("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(De()){a.checked=!1,S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ua("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(De()){s.value="unpaid",Fe(s,"unpaid"),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Fe(s),oe()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(De()){r.value="percent",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",oe()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(De()){i.value="",S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),oe()}),i.dataset.listenerAttached="true"),oe()}function Ll(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){oe();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),oe()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function rr(){const{input:e,hidden:t}=xs(),{input:n,hidden:a}=Rt(),{customers:s}=pe();let r=t?.value?String(t.value):"";if(!r&&e?.value){const W=Oa(e.value,{allowPartial:!0});W&&(r=String(W.id),t&&(t.value=r),e.value=W.label,e.dataset.selectedId=r)}const i=s.find(W=>String(W.id)===r);if(!i){S(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const W=Va(n.value,{allowPartial:!0});W&&(d=String(W.id),a&&(a.value=d),n.value=W.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,g=new Date(m),b=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){S(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const I=Sc(),v=Je();if(v.length===0&&I.length===0){S(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const _=document.getElementById("res-notes")?.value||"",B=parseFloat(h(document.getElementById("res-discount")?.value))||0,R=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),w=q?.value||"unpaid",A=document.getElementById("res-payment-progress-type"),P=document.getElementById("res-payment-progress-value"),T=Ur(A),j=Kr(P),N=d?Is(d):null,H=Sl(N);if(d&&!N){S(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const W of v){const ee=ot(W.barcode);if(ee==="maintenance"||ee==="retired"){S(Lt(ee));return}}for(const W of v){const ee=Y(W.barcode);if(Xe(ee,m,y)){S(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const W of I)if(Ir(W,m,y)){S(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const D=document.getElementById("res-tax"),z=document.getElementById("res-company-share"),k=!!d;k?(D&&(D.checked=!1,D.disabled=!0,D.classList.add("disabled"),D.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),z&&(z.checked=!1,z.disabled=!0,z.classList.add("disabled"),z.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Fe(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.disabled=!0,A.classList.add("disabled")),P&&(P.value="",P.disabled=!0,P.classList.add("disabled"))):(D&&(D.disabled=!1,D.classList.remove("disabled"),D.title=""),z&&(z.disabled=!1,z.classList.remove("disabled"),z.title=""),q&&(q.disabled=!1,q.title=""),A&&(A.disabled=!1,A.classList.remove("disabled")),P&&(P.disabled=!1,P.classList.remove("disabled")));const G=k?!1:D?.checked||!1,V=!!z?.checked;if(!k&&V!==G){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let $=V?Wt():null;V&&(!Number.isFinite($)||$<=0)&&(Oe(),$=Wt());const U=V&&G&&Number.isFinite($)&&$>0;G&&Oe();const F=ms(v,B,R,G,I,{start:m,end:y,companySharePercent:U?$:0}),M=mc(),Q=ps({totalAmount:F,progressType:T,progressValue:j,history:[]});P&&Qr(P,Q.paymentProgressValue);const re=[];Q.paymentProgressValue!=null&&Q.paymentProgressValue>0&&re.push({type:Q.paymentProgressType||T,value:Q.paymentProgressValue,amount:Q.paidAmount,percentage:Q.paidPercent,recordedAt:new Date().toISOString()});const se=fs({manualStatus:w,paidAmount:Q.paidAmount,paidPercent:Q.paidPercent,totalAmount:F});q&&(q.value=se,Fe(q,se));const ue=Ar({reservationCode:M,customerId:c,start:m,end:y,status:H?"confirmed":"pending",title:null,location:null,notes:_,projectId:d||null,totalAmount:F,discount:k?0:B,discountType:k?"percent":R,applyTax:G,paidStatus:k?"unpaid":se,confirmed:H,items:v.map(W=>({...W,equipmentId:W.equipmentId??W.id})),technicians:I,companySharePercent:k||!U?null:$,companyShareEnabled:k?!1:U,paidAmount:k?0:Q.paidAmount,paidPercentage:k?0:Q.paidPercent,paymentProgressType:k?null:Q.paymentProgressType,paymentProgressValue:k?null:Q.paymentProgressValue,paymentHistory:k?[]:re});try{const W=await Ec(ue);xn(),yt(),Sn(),Fl(),S(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ma=="function"&&Ma({type:"created",reservation:W}),Bl(W)}catch(W){console.error("❌ [reservations/createForm] Failed to create reservation",W);const ee=ia(W)?W.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");S(ee,"error"),k&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),un({clearValue:!1}))}}function Bl(e){if(!Dn)return;const{draftStorageKey:t=Mr,returnUrl:n=zr}=Dn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Dn=null,n&&(window.location.href=n)}function un({clearValue:e=!1}={}){const{input:t,hidden:n}=Rt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,ft())}function Dl(e,t=""){const{input:n,hidden:a}=Rt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),ft())}function Fl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),st({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),un({clearValue:!1}),Xt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Fe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),xc(),wr([]),On("form-reset"),ct(),ft(),oe()}function Rl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Tl(s);return}if(a==="increase-group"&&s){Nl(s);return}if(a==="remove-group"&&s){jl(s);return}}),e.dataset.listenerAttached="true")}function Ml(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(zn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ei(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||zn()!=="single")return;const{start:r,end:i}=Mt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function zl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await rr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await rr()}),t.dataset.listenerAttached="true")}function nm({onAfterSubmit:e}={}){Ma=typeof e=="function"?e:null;const{customers:t,projects:n}=pe();vc(t||[]),st(),ks(),Wr(n||[]),Jr({projectsList:n}),As(),yt(),ga(),Al(),ti(),ri(),Ll(),Cl(),Rl(),Ml(),zl(),El(),oe(),ct()}function ii(){yt(),ga(),Jr(),st(),ks(),As(),ti(),ri(),ct(),oe()}if(typeof document<"u"){const e=()=>{st(),Xt({projectsList:ws()}),ks(),As(),oe()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{yt()}),document.addEventListener("packages:changed",()=>{ga(),zn()==="package"&&Qa("package")})}typeof window<"u"&&(window.getCompanySharePercent=Wt);function oi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:At(t),endDate:At(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:At(n),endDate:At(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:At(n),endDate:At(a)}}return e==="upcoming"?{startDate:At(t),endDate:""}:{startDate:"",endDate:""}}function Hl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Jn(t),Jn(n),r="",i=""),!r&&!i&&c){const l=oi(c);r=l.startDate,i=l.endDate}return{searchTerm:_e(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function am(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ol(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Jn(a),Jn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Ol(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=oi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function At(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Jn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Nn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Vl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Ul(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Vl(n);if(a!==null)return a}return null}function ir(e,t=0){const n=Ul(e);if(n!=null)return n;const a=Nn(e.createdAt??e.created_at);if(a!=null)return a;const s=Nn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Nn(e.start);if(r!=null)return r;const i=Nn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Kl({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,_)=>({reservation:v,index:_})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,I=r.filter(({reservation:v})=>{const _=n.get(String(v.customerId)),B=s?.get?.(String(v.projectId)),R=v.start?new Date(v.start):null,q=Es(v),{effectiveConfirmed:w}=bt(v,B);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(N=>String(N)):[]).includes(String(y))||f==="confirmed"&&!w||f==="pending"&&w||f==="completed"&&!q||g&&R&&R<g||b&&R&&R>b)return!1;if(c){const j=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],N=_e(j.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),H=c.replace(/\s+/g,"");if(!N.includes(H))return!1}if(d&&!_e(_?.customerName||"").includes(d))return!1;if(l){const j=[v.projectId,v.project_id,v.projectID,B?.id,B?.projectCode,B?.project_code],N=_e(j.filter(D=>D!=null&&D!=="").map(String).join(" ")).replace(/\s+/g,""),H=l.replace(/\s+/g,"");if(!N.includes(H))return!1}if(!i)return!0;const A=v.items?.map?.(j=>`${j.barcode} ${j.desc}`).join(" ")||"",P=(v.technicians||[]).map(j=>a.get(String(j))?.name).filter(Boolean).join(" ");return _e([v.reservationId,_?.customerName,v.notes,A,P,B?.title].filter(Boolean).join(" ")).includes(i)});return I.sort((v,_)=>{const B=ir(v.reservation,v.index),R=ir(_.reservation,_.index);return B!==R?R-B:_.index-v.index}),I}function Ql({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),I=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:_,index:B})=>{const R=t.get(String(_.customerId)),q=_.projectId?a?.get?.(String(_.projectId)):null,w=Es(_),A=_.paidStatus??_.paid_status??(_.paid===!0||_.paid==="paid"?"paid":"unpaid"),P=A==="paid",T=A==="partial",{effectiveConfirmed:j,projectLinked:N}=bt(_,q),H=j?"status-confirmed":"status-pending",D=P?"status-paid":T?"status-partial":"status-unpaid";let z=`<span class="reservation-chip status-chip ${H}">${j?u:p}</span>`;const k=P?f:T?y:m;let G=`<span class="reservation-chip status-chip ${D}">${k}</span>`,V=P?" tile-paid":T?" tile-partial":" tile-unpaid";w&&(V+=" tile-completed");let $="";w&&(z=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${k}</span>`,$=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const U=!N&&!j?`<button class="tile-confirm" data-reservation-index="${B}" data-action="confirm">${g}</button>`:"",F=U?`<div class="tile-actions">${U}</div>`:"",M=_.items?.length||0,Q=(_.technicians||[]).map(ce=>n.get(String(ce))).filter(Boolean),re=Q.map(ce=>ce.name).join(l)||"—",se=h(String(_.reservationId??"")),ue=_.start?h(Re(_.start)):"-",W=_.end?h(Re(_.end)):"-",ee=h(String(_.cost??0)),me=h(String(M)),qe=_.notes?h(_.notes):c,Ie=d.replace("{count}",me),O=_.applyTax?`<small>${r}</small>`:"";let Z=b;return _.projectId&&(Z=q?.title?h(q.title):I),`
      <div class="${U?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${V}"${$} data-reservation-index="${B}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${se}</div>
          <div class="tile-badges">
            ${z}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${R?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${ue}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${W}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${ee} ${s} ${O}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${Q.length?re:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${qe}</span>
          </div>
        </div>
        ${F}
      </div>
    `}).join("")}function Le(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gl(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=bt(e,s),c=e.paid===!0||e.paid==="paid",d=Es(e),l=e.items||[],u=Ft(l),p=new Map,f=(E,J=0)=>{if(!E||typeof E!="object")return;const le=Qt(E?.package_code??E?.packageId??E?.package_id??E?.code??E?.id??E?.barcode??`pkg-${J}`)||`pkg-${J}`;p.has(le)||p.set(le,{source:E,normalizedId:le,index:J})};Array.isArray(e.packages)&&e.packages.forEach((E,J)=>f(E,J)),l.forEach((E,J)=>{E&&typeof E=="object"&&(E.type==="package"||Array.isArray(E?.packageItems))&&f(E,J+p.size)});const m=[],y=new Set,g=new Set;p.forEach(({source:E,normalizedId:J},ge)=>{const le=ra(E).map(be=>({...be,normalizedBarcode:be?.normalizedBarcode??Y(be?.barcode),qty:Number.isFinite(Number(be?.qty))?Number(be.qty):1}));le.forEach(be=>{const Ve=be?.normalizedBarcode??Y(be?.barcode);Ve&&y.add(Ve);const wt=be?.equipmentId??be?.equipment_id??null;wt!=null&&g.add(String(wt))});const Ae=Number.isFinite(Number(E?.quantity??E?.qty??E?.count))?Number(E.quantity??E.qty??E.count):1,Pe=Number.isFinite(Number(E?.unit_price??E?.price??E?.unitPrice))?Number(E.unit_price??E.price??E.unitPrice):0,Ot=le.reduce((be,Ve)=>{const wt=Number.isFinite(Number(Ve?.price))?Number(Ve.price):0,ka=Number.isFinite(Number(Ve?.qty))?Number(Ve.qty):1;return be+wt*ka},0),an=Number.isFinite(Number(E?.total??E?.total_price??E?.totalPrice))?Number(E.total??E.total_price??E.totalPrice):Pe?Pe*Ae:Ot,kn=Ae>0?an/Ae:Pe,Vt=E?.package_code??E?.packageId??E?.package_id??E?.barcode??null;if(Vt){const be=Y(Vt);be&&y.add(be)}const Aa=le.map(be=>h(String(be?.barcode??be?.normalizedBarcode??""))).filter(Boolean);m.push({key:`package::${ge}`,description:E?.name||E?.package_name||E?.title||h(String(Vt??ge)),normalizedDescription:h(String(E?.name||E?.package_name||"")),unitPrice:kn,totalPrice:an,quantity:Ae,count:Ae,image:le.find(be=>be?.image)?.image??null,barcodes:Aa,items:[{type:"package",packageItems:le,packageId:J,desc:E?.name||E?.package_name||"",price:kn,qty:Ae,barcode:Vt}]})});const b=new Set(Array.from(y).map(E=>Y(E)).filter(Boolean)),I=u.filter(E=>!(E.items.some(le=>le?.type==="package")&&m.length>0||E.items.every(le=>{const Ae=gt(le),Pe=Ae!=null?String(Ae):null;if(Pe&&g.has(Pe))return!0;const Ot=le?.barcode?Y(le.barcode):null;return!!(Ot&&b.has(Ot))}))),v=m.length?[...m,...I]:u,{technicians:_=[]}=pe(),B=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(_)?_:[]),R=new Map;B.forEach(E=>{if(!E||E.id==null)return;const J=String(E.id),ge=R.get(J)||{};R.set(J,{...ge,...E})});const q=(e.technicians||[]).map(E=>R.get(String(E))).filter(Boolean),w=Bt(),A=oa(e.start,e.end),P=(E={})=>{const J=[E.dailyWage,E.daily_rate,E.dailyRate,E.wage,E.rate];for(const ge of J){if(ge==null)continue;const le=parseFloat(h(String(ge)));if(Number.isFinite(le))return le}return 0},T=(E={})=>{const J=[E.dailyTotal,E.daily_total,E.totalRate,E.total,E.total_wage];for(const ge of J){if(ge==null)continue;const le=parseFloat(h(String(ge)));if(Number.isFinite(le))return le}return P(E)},N=l.reduce((E,J)=>E+(J.qty||1)*(J.price||0),0)*A,H=q.reduce((E,J)=>E+P(J),0),D=q.reduce((E,J)=>E+T(J),0),z=H*A,k=D*A,G=N+k,V=parseFloat(e.discount)||0,$=e.discountType==="amount"?V:G*(V/100),U=Math.max(0,G-$),F=r?!1:e.applyTax,M=Number(e.cost),Q=Number.isFinite(M),re=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,se=re!=null?parseFloat(h(String(re))):NaN;let ee=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(se)&&se>0)&&Number.isFinite(se)?se:0;F&&ee<=0&&(ee=it);let me=ee>0?Math.max(0,U*(ee/100)):0;const qe=U+me,Ie=F?qe*.15:0,O=Number.isFinite(Ie)&&Ie>0?Number(Ie.toFixed(2)):0,Z=qe+O,ne=Number.isFinite(Z)?Number(Z.toFixed(2)):0,ce=r?ne:Q?M:ne;ee>0&&(me=Number(Math.max(0,U*(ee/100)).toFixed(2)));const Ce=h(String(e.reservationId??e.id??"")),St=e.start?h(Re(e.start)):"-",X=e.end?h(Re(e.end)):"-",he=h(String(q.length)),C=h(N.toFixed(2)),te=h($.toFixed(2)),ve=h(U.toFixed(2)),fe=h(O.toFixed(2)),de=h((Number.isFinite(ce)?ce:0).toFixed(2)),$e=h(String(A)),ye=o("reservations.create.summary.currency","SR"),Ze=o("reservations.details.labels.discount","الخصم"),lt=o("reservations.details.labels.tax","الضريبة (15%)"),Ht=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ae=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),we=o("reservations.details.labels.duration","عدد الأيام"),Et=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),oo=o("reservations.details.labels.netProfit","💵 صافي الربح"),co=o("reservations.create.equipment.imageAlt","صورة"),et={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},lo=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),uo=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),mo=o("reservations.details.technicians.roleUnknown","غير محدد"),po=o("reservations.details.technicians.phoneUnknown","غير متوفر"),fo=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),yo=o("reservations.list.status.confirmed","✅ مؤكد"),go=o("reservations.list.status.pending","⏳ غير مؤكد"),bo=o("reservations.list.payment.paid","💳 مدفوع"),ho=o("reservations.list.payment.unpaid","💳 غير مدفوع"),vo=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),qo=o("reservations.list.status.completed","📁 منتهي"),So=o("reservations.details.labels.id","🆔 رقم الحجز"),Eo=o("reservations.details.section.bookingInfo","بيانات الحجز"),xo=o("reservations.details.section.paymentSummary","ملخص الدفع"),wo=o("reservations.details.labels.finalTotal","المجموع النهائي"),Io=o("reservations.details.section.crew","😎 الفريق الفني"),Ao=o("reservations.details.crew.count","{count} عضو"),ko=o("reservations.details.section.items","📦 المعدات المرتبطة"),_o=o("reservations.details.items.count","{count} عنصر"),$o=o("reservations.details.actions.edit","✏️ تعديل"),Po=o("reservations.details.actions.delete","🗑️ حذف"),To=o("reservations.details.labels.customer","العميل"),jo=o("reservations.details.labels.contact","رقم التواصل"),No=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const Co=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Lo=o("reservations.details.actions.openProject","📁 فتح المشروع"),Bo=o("reservations.details.labels.start","بداية الحجز"),Do=o("reservations.details.labels.end","نهاية الحجز"),Fo=o("reservations.details.labels.notes","ملاحظات"),Ro=o("reservations.list.noNotes","لا توجد ملاحظات"),Mo=o("reservations.details.labels.itemsCount","عدد المعدات"),zo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Ho=o("reservations.paymentHistory.title","سجل الدفعات"),Oo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Vo=o("reservations.list.unknownCustomer","غير معروف"),wa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Hs=wa==="partial",Uo=wa==="paid"?bo:Hs?vo:ho,Ko=u.reduce((E,J)=>E+(Number(J.quantity)||0),0),Qo=h(String(Ko)),Os=_o.replace("{count}",Qo),Go=Ao.replace("{count}",he),Wo=e.notes?h(e.notes):Ro,Xo=h(k.toFixed(2)),Jo=h(String(ee)),Yo=h(me.toFixed(2)),Zo=`${Jo}% (${Yo} ${ye})`,ec=Math.max(0,N+k-$),Vs=Math.max(0,ec-z),tc=h(Vs.toFixed(2)),dt=[{icon:"💼",label:zo,value:`${C} ${ye}`}];dt.push({icon:"😎",label:Ht,value:`${Xo} ${ye}`}),$>0&&dt.push({icon:"💸",label:Ze,value:`${te} ${ye}`}),dt.push({icon:"📊",label:ae,value:`${ve} ${ye}`}),F&&O>0&&dt.push({icon:"🧾",label:lt,value:`${fe} ${ye}`}),ee>0&&dt.push({icon:"🏦",label:Et,value:Zo}),Math.abs(Vs-(ce??0))>.009&&dt.push({icon:"💵",label:oo,value:`${tc} ${ye}`}),dt.push({icon:"💰",label:wo,value:`${de} ${ye}`});const nc=dt.map(({icon:E,label:J,value:ge})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${E} ${J}</span>
      <span class="summary-details-value">${ge}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let nn=[];Array.isArray(e.paymentHistory)?nn=e.paymentHistory:Array.isArray(e.payment_history)&&(nn=e.payment_history);const ac=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Us=Array.isArray(nn)&&nn.length>0?nn:ac,sc=Us.length?`<ul class="reservation-payment-history-list">${Us.map(E=>{const J=E?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):E?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),ge=Number.isFinite(Number(E?.amount))&&Number(E.amount)>0?`${h(Number(E.amount).toFixed(2))} ${ye}`:"—",le=Number.isFinite(Number(E?.percentage))&&Number(E.percentage)>0?`${h(Number(E.percentage).toFixed(2))}%`:"—",Ae=E?.recordedAt?h(Re(E.recordedAt)):"—",Pe=E?.note?`<div class="payment-history-note">${Le(h(E.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Le(J)}</span>
              <span class="payment-history-entry__amount">${ge}</span>
              <span class="payment-history-entry__percent">${le}</span>
              <span class="payment-history-entry__date">${Ae}</span>
            </div>
            ${Pe}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Le(Oo)}</div>`,Ks=[{text:i?yo:go,className:i?"status-confirmed":"status-pending"},{text:Uo,className:wa==="paid"?"status-paid":Hs?"status-partial":"status-unpaid"}];d&&Ks.push({text:qo,className:"status-completed"});const rc=Ks.map(({text:E,className:J})=>`<span class="status-chip ${J}">${E}</span>`).join(""),xt=(E,J,ge)=>`
    <div class="res-info-row">
      <span class="label">${E} ${J}</span>
      <span class="value">${ge}</span>
    </div>
  `;let Ia="";if(e.projectId){let E=Le(Co);if(s){const J=s.title||o("projects.fallback.untitled","مشروع بدون اسم");E=`${Le(J)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Le(Lo)}</button>`}Ia=`
      <div class="res-info-row">
        <span class="label">📁 ${No}</span>
        <span class="value">${E}</span>
      </div>
    `}const tt=[];tt.push(xt("👤",To,t?.customerName||Vo)),tt.push(xt("📞",jo,t?.phone||"—")),tt.push(xt("🗓️",Bo,St)),tt.push(xt("🗓️",Do,X)),tt.push(xt("📦",Mo,Os)),tt.push(xt("⏱️",we,$e)),tt.push(xt("📝",Fo,Wo)),Ia&&tt.push(Ia);const ic=tt.join(""),oc=v.length?v.map(E=>{const J=E.items[0]||{},ge=Dt(J)||E.image,le=ge?`<img src="${ge}" alt="${co}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Ae=E.items.some(Ue=>Ue?.type==="package"),Pe=Number(E.quantity)||Number(E.count)||0,Ot=h(String(Pe)),an=Number.isFinite(Number(E.unitPrice))?Number(E.unitPrice):0,kn=Number.isFinite(Number(E.totalPrice))?Number(E.totalPrice):an*Pe,Vt=`${h(an.toFixed(2))} ${ye}`,Aa=`${h(kn.toFixed(2))} ${ye}`,be=E.barcodes.map(Ue=>h(String(Ue||""))).filter(Boolean),Ve=be.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${be.map(Ue=>`<li>${Ue}</li>`).join("")}
              </ul>
            </details>`:"";let wt="";if(Ae){const Ue=new Map;if(E.items.forEach(_n=>{Array.isArray(_n?.packageItems)&&_n.packageItems.forEach(ke=>{if(!ke)return;const $n=Y(ke.barcode||ke.normalizedBarcode||ke.desc||Math.random()),Pn=Ue.get($n),Tn=Number.isFinite(Number(ke.qty))?Number(ke.qty):1;if(Pn){Pn.qty+=Tn;return}Ue.set($n,{desc:ke.desc||ke.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Tn,barcode:ke.barcode??ke.normalizedBarcode??""})})}),Ue.size){const _n=Array.from(Ue.values()).map(ke=>{const $n=h(String(ke.qty)),Pn=Le(ke.desc||""),Tn=ke.barcode?` <span class="reservation-package-items__barcode">(${Le(h(String(ke.barcode)))})</span>`:"";return`<li>${Pn}${Tn} × ${$n}</li>`}).join("");wt=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${_n}
                </ul>
              </details>
            `}}const ka=Ae?`${wt||""}${Ve||""}`:Ve;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${le}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Le(J.desc||J.description||J.name||E.description||"-")}</div>
                  ${ka}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Ot}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.unitPrice)}">${Vt}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Le(et.total)}">${Aa}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Le(et.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${lo}</td></tr>`,cc=`
    <div class="table-responsive reservation-modal-items-wrapper">
      <table class="table table-sm table-hover align-middle reservation-modal-items-table">
        <thead>
          <tr>
            <th>${et.item}</th>
            <th>${et.quantity}</th>
            <th>${et.unitPrice}</th>
            <th>${et.total}</th>
            <th>${et.actions}</th>
          </tr>
        </thead>
        <tbody>${oc}</tbody>
      </table>
    </div>
  `,lc=q.map((E,J)=>{const ge=h(String(J+1)),le=E.role||mo,Ae=E.phone||po,Pe=E.wage?fo.replace("{amount}",h(String(E.wage))).replace("{currency}",ye):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${ge}</span>
          <span class="technician-name">${E.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${le}</div>
          <div>📞 ${Ae}</div>
          ${Pe?`<div>💰 ${Pe}</div>`:""}
        </div>
      </div>
    `}).join(""),dc=q.length?`<div class="reservation-technicians-grid">${lc}</div>`:`<ul class="reservation-modal-technicians"><li>${uo}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${So}</span>
          <strong>${Ce}</strong>
        </div>
        <div class="status-chips">
          ${rc}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Eo}</h6>
          ${ic}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${xo}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${nc}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Ho}</h6>
              ${sc}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${Io}</span>
          <span class="count">${Go}</span>
        </div>
        ${dc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${ko}</span>
          <span class="count">${Os}</span>
        </div>
        ${cc}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${$o}</button>
        ${w?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Po}</button>`:""}
      </div>
    </div>
  `}const sm="project",rm="editProject",im=3600*1e3,ci=.15,om=6,cm="projectsTab",lm="projectsSubTab",dm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},um={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},mm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Wl=`@page {
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
`,Xl=/color\([^)]*\)/gi,gn=/(color\(|color-mix\(|oklab|oklch)/i,Jl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Yl=typeof document<"u"?document.createElement("canvas"):null,Cn=Yl?.getContext?.("2d")||null;function li(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ga(e,t="#000"){if(!Cn||!e)return t;try{return Cn.fillStyle="#000",Cn.fillStyle=e,Cn.fillStyle||t}catch{return t}}function Zl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&gn.test(n)){const s=Ga(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ut(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function pm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function di(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Jl.forEach(c=>{const d=r[c];if(d&&gn.test(d)){const l=li(c);Ut(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Ga(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&gn.test(i)){const c=Ga(r.backgroundColor||"#ffffff","#ffffff");Ut(n,s,"background-image"),Ut(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function ui(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&gn.test(d)){const l=li(c);Ut(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&gn.test(i)&&(Ut(n,s,"background-image"),Ut(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function mi(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Xl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const pi="reservations.quote.sequence",or={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},fi="https://help.artratio.sa/guide/quote-preview",xe={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},ed=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Be=[...ed],td=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Wa(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Be]}function nd(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Wa(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Wa(t.value);if(a.length)return a}const n=Be.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Be]}const ad=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],yi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(h(Number(e?.price||0).toFixed(2)))}],gi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Xa={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:yi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:gi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},bi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>x(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>x(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>x(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],hi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>x(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>x(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>x(e?.note||"-")}],vi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>x(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>x(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>x(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>x(e?.displayCost||"—")}],sd=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],rd={customerInfo:Xa.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Xa.payment,projectExpenses:hi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:bi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:vi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},ja=new Map;function ba(e="reservation"){if(ja.has(e))return ja.get(e);const t=e==="project"?sd:ad,n=e==="project"?rd:Xa,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return ja.set(e,r),r}function ha(e="reservation"){return ba(e).sectionDefs}function qi(e="reservation"){return ba(e).fieldDefs}function Si(e="reservation"){return ba(e).sectionIdSet}function Ei(e="reservation"){return ba(e).fieldIdMap}function xi(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const id="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",od="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",cd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",wi=Wl.trim(),Ii=/^data:image\/svg\+xml/i,ld=/\.svg($|[?#])/i,ln=512,Ja="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ai=96,ki=25.4,Ya=210,Fn=297,Rn=Math.round(Ya/ki*Ai),Mn=Math.round(Fn/ki*Ai),dd=2,_i=/safari/i,ud=/(iphone|ipad|ipod)/i,cr=/(iphone|ipad|ipod)/i,md=/(crios|fxios|edgios|opios)/i,Yn="[reservations/pdf]";let K=null,L=null,Qe=1,rn=null,on=null,mt=null,Kt=null,mn=!1;function Tt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!K?.statusIndicator||!K?.statusText)return;K.statusKind=e;const r=t||xi(e);K.statusText.textContent=r,K.statusSpinner&&(K.statusSpinner.hidden=!s),K.statusAction&&(K.statusAction.hidden=!0,K.statusAction.onclick=null,n&&typeof a=="function"&&(K.statusAction.textContent=n,K.statusAction.hidden=!1,K.statusAction.onclick=i=>{i.preventDefault(),a()})),K.statusIndicator.hidden=!1,requestAnimationFrame(()=>{K.statusIndicator.classList.add("is-visible")})}function pn(e){!K?.statusIndicator||!K?.statusText||(K.statusKind=null,K.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{K?.statusIndicator&&(K.statusIndicator.hidden=!0,K.statusAction&&(K.statusAction.hidden=!0,K.statusAction.onclick=null),K.statusSpinner&&(K.statusSpinner.hidden=!1))},220))}function Za(){return!!window?.bootstrap?.Modal}function pd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),mt||(mt=document.createElement("div"),mt.className="modal-backdrop fade show",mt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(mt)),Kt||(Kt=t=>{t.key==="Escape"&&es(e)},document.addEventListener("keydown",Kt));try{e.focus({preventScroll:!0})}catch{}}}function es(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),mt&&(mt.remove(),mt=null),Kt&&(document.removeEventListener("keydown",Kt),Kt=null))}function fd(e){if(e){if(Za()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}pd(e)}}function yd(){if(mn)return;mn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!K?.modal?.classList.contains("show"),s=()=>{K?.modal?.classList.contains("show")&&(Tt("render"),mn=!1,zt())};Sr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:fi}),a&&Tt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function va(e="reservation"){const t={},n=qi(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function $s(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function gd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Ps(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ts(e="reservation"){return Object.fromEntries(ha(e).map(({id:t})=>[t,!1]))}function js(e,t){return e.sectionExpansions||(e.sectionExpansions=Ts(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function bd(e,t){return js(e,t)?.[t]!==!1}function Ns(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function hd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return ud.test(e)}function vd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=_i.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function $i(){return hd()&&vd()}function qa(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=cr.test(e)||cr.test(t),s=/Macintosh/i.test(e)&&n>1;return _i.test(e)&&!md.test(e)&&(a||s)}function Na(e,...t){try{console.log(`${Yn} ${e}`,...t)}catch{}}function rt(e,...t){try{console.warn(`${Yn} ${e}`,...t)}catch{}}function qd(e,t,...n){try{t?console.error(`${Yn} ${e}`,t,...n):console.error(`${Yn} ${e}`,...n)}catch{}}function Se(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function Sd(e,t="لا توجد بيانات للعرض."){const n=x(o(e,t));return Se(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Zn(e,t){return Array.isArray(e)&&e.length?e:[Sd(t)]}const Ed=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Pi(e=""){return Ed.test(e)}function xd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Pi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function lr(e,t=ln){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function wd(e){if(!e)return{width:ln,height:ln};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?lr(t,0):0,s=n?lr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||ln,height:s||ln}}function Ti(e=""){return typeof e!="string"?!1:Ii.test(e)||ld.test(e)}function Id(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Ad(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function ji(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Ad(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function kd(e){if(!e)return null;if(Ii.test(e))return Id(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function _d(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Ti(t))return!1;const n=await kd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ja),!1;const a=await ji(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ja),!1)}async function $d(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=wd(e),s=await ji(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Ja),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Ni(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Ti(s.getAttribute?.("src"))&&a.push(_d(s))}),n.forEach(s=>{a.push($d(s))}),a.length&&await Promise.allSettled(a)}function Pd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=($,U=0)=>{const F=parseFloat($);return Number.isFinite(F)?F:U},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const $=s.lineHeight;if(!$||$==="normal")return p*1.6;const U=r($,p*1.6);return U>0?U:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),I=n.createElement("canvas"),v=I.getContext("2d");if(!v)return null;const _=s.fontStyle||"normal",B=s.fontVariant||"normal",R=s.fontWeight||"400",q=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",A=$=>$.join(" "),P=[],T=$=>v.measureText($).width;v.font=`${_} ${B} ${R} ${w} ${p}px ${q}`,b.forEach($=>{const U=$.trim();if(U.length===0){P.push("");return}const F=U.split(/\s+/);let M=[];F.forEach((Q,re)=>{const se=Q.trim();if(!se)return;const ue=A(M.concat(se));if(T(ue)<=y||M.length===0){M.push(se);return}P.push(A(M)),M=[se]}),M.length&&P.push(A(M))}),P.length||P.push("");const j=i+c+P.length*f,N=Math.ceil(Math.max(1,m)*t),H=Math.ceil(Math.max(1,j)*t);I.width=N,I.height=H,I.style.width=`${Math.max(1,m)}px`,I.style.height=`${Math.max(1,j)}px`,v.scale(t,t);const D=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const $=Math.max(1,m),U=Math.max(1,j),F=Math.min(u,$/2,U/2);v.moveTo(F,0),v.lineTo($-F,0),v.quadraticCurveTo($,0,$,F),v.lineTo($,U-F),v.quadraticCurveTo($,U,$-F,U),v.lineTo(F,U),v.quadraticCurveTo(0,U,0,U-F),v.lineTo(0,F),v.quadraticCurveTo(0,0,F,0),v.closePath(),v.clip()}if(v.fillStyle=D,v.fillRect(0,0,Math.max(1,m),Math.max(1,j)),v.font=`${_} ${B} ${R} ${w} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const z=Math.max(0,m-d);let k=i;P.forEach($=>{const U=$.length?$:" ";v.fillText(U,z,k,y),k+=f});const G=n.createElement("img");let V;try{V=I.toDataURL("image/png")}catch($){return rt("note canvas toDataURL failed",$),null}return G.src=V,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,j)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:I,totalHeight:j,width:m}}function Td(e,{pixelRatio:t=1}={}){if(!e||!qa())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Pi(a.textContent||""))return;let s;try{s=Pd(a,{pixelRatio:t})}catch(r){rt("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function ts(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){qd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Tt("export"),Ui()):(Tt("render"),mn=!1,zt())};if(Sr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:fi}),K?.modal?.classList.contains("show")&&Tt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ns({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){rt("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){rt("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Cs(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function dr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function ur(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function jd(){const e=ur();return e||(on||(on=Cs(od).catch(t=>{throw on=null,t}).then(()=>{const t=ur();if(!t)throw on=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),on)}async function Nd(){const e=dr();return e||(rn||(rn=Cs(cd).catch(t=>{throw rn=null,t}).then(()=>{const t=dr();if(!t)throw rn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),rn)}async function Cd(){if(window.html2pdf||await Cs(id),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Zl(),xd()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ld(e="reservation"){return e==="project"?"QP":"Q"}function Bd(e,t="reservation"){const n=Number(e),a=Ld(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Dd(){const e=window.localStorage?.getItem?.(pi),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Ci(e="reservation"){const n=Dd()+1;return{sequence:n,quoteNumber:Bd(n,e)}}function Fd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(pi,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Li(e="reservation"){return or[e]||or.reservation}function Rd(e="reservation"){try{const t=Li(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Md(e,t="reservation"){try{const n=Li(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function zd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Hd(e,t="reservation"){if(!e)return null;const n=Si(t),a=Ei(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=zd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Bi(e){if(!e)return;const t=e.context||"reservation",n=Hd(e,t);n&&Md(n,t)}function Di(e){if(!e)return;const t=e.context||"reservation",n=Rd(t);if(!n)return;const a=Si(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=$s(e.fields||va(t)),i=Ei(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Fi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ri(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Od(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Ri(e)}function Vd(e){const t=Sn()||[],{technicians:n=[]}=pe(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Ud(e,t,n){const{projectLinked:a}=bt(e,n),s=oa(e.start,e.end),c=(Array.isArray(e.items)?e.items:[]).reduce((V,$)=>V+(Number($?.qty)||1)*(Number($?.price)||0),0)*s,d=t.reduce((V,$)=>V+Ri($),0),l=t.reduce((V,$)=>V+Od($),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),g=Math.max(0,f-y),b=a?!1:e.applyTax,I=Number(e.cost),v=Number.isFinite(I),_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,B=_!=null?parseFloat(h(String(_).replace("%","").trim())):NaN,R=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(R!=null?R===!0||R===1||R==="1"||String(R).toLowerCase()==="true":Number.isFinite(B)&&B>0)&&Number.isFinite(B)?Number(B):0;b&&w<=0&&(w=it);let A=w>0?Math.max(0,g*(w/100)):0;A=Number(A.toFixed(2));const P=g+A;let T=b?P*.15:0;(!Number.isFinite(T)||T<0)&&(T=0),T=Number(T.toFixed(2));const j=P+T,N=Number.isFinite(j)?Number(j.toFixed(2)):0,H=a?N:v?I:N,D=Math.max(0,c+p-y),z=Math.max(0,D-u),k={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:P,taxAmount:T,finalTotal:H,companySharePercent:w,companyShareAmount:A,netProfit:z},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h(P.toFixed(2)),taxAmount:h(T.toFixed(2)),finalTotal:h(H.toFixed(2)),companySharePercent:h(w.toFixed(2)),companyShareAmount:h(A.toFixed(2)),netProfit:h(z.toFixed(2))};return{totals:k,totalsDisplay:G,rentalDays:s}}function Jt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Mi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Kd(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Jt(e.amount??(n==="amount"?e.value:null)),s=Jt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Mi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Qd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Kd).filter(Boolean);if(n.length>0)return n;const a=Jt(e.paidPercent??e.paid_percent),s=Jt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Mi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Gd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Wd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Xd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Jd(e){const t=Number(e?.equipmentEstimate)||0,n=Xd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*ci:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Yd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=ms(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Zd(e,t){if(!e)return"—";const n=Re(e);return t?`${n} - ${Re(t)}`:n}function ie(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function mr(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function eu(e){if(!e?.start)return null;if(!e?.end)return 1;const t=oa(e.start,e.end);return Number.isFinite(t)?t:1}function tu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function nu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=pe(),i=e?.id!=null?s.find(C=>String(C.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ie(0,t),expensesTotal:ie(0,t),reservationsTotal:ie(0,t),discountAmount:ie(0,t),taxAmount:ie(0,t),overallTotal:ie(0,t),paidAmount:ie(0,t),remainingAmount:ie(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ie(0,t),remainingAmountDisplay:ie(0,t),paidPercentDisplay:mr(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(C=>String(C.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,I=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),_=Gd(i.type),B=i.start?Re(i.start):"—",R=i.end?Re(i.end):"—",q=eu(i),w=q!=null?tu(q):"غير محدد",A=Wd(i),P={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},T=o(`projects.status.${A}`,P[A]||A),j=i.id!=null?String(i.id):null,N=j?a.filter(C=>String(C.projectId)===j):[],D=N.map(C=>{const te=C.reservationId||C.id||"",ve=C.status||C.state||"pending",fe=String(ve).toLowerCase(),de=o(`reservations.status.${fe}`,fe),$e=Yd(C),ye=C.start?new Date(C.start).getTime():0;return{reservationId:h(String(te||"-")),status:fe,statusLabel:de,total:$e,totalLabel:ie($e,t),dateRange:Zd(C.start,C.end),startTimestamp:Number.isNaN(ye)?0:ye}}).sort((C,te)=>te.startTimestamp-C.startTimestamp).map(({startTimestamp:C,...te})=>te).reduce((C,te)=>C+(Number(te.total)||0),0),z=new Map;N.forEach(C=>{const te=Array.isArray(C.items)?C.items:[],ve=oa(C.start,C.end),fe=C.reservationId||C.id||"";te.forEach((de,$e)=>{if(!de)return;const ye=de.barcode||de.code||de.id||de.desc||de.description||`item-${$e}`,Ze=String(ye||`item-${$e}`),lt=z.get(Ze)||{description:de.desc||de.description||de.name||de.barcode||`#${h(String($e+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Ht=Number(de.qty)||1,ae=Number(de.price)||0;lt.totalQuantity+=Ht,lt.reservationIds.add(String(fe));const we=ae*Ht*Math.max(1,ve);Number.isFinite(we)&&(lt.totalCost+=we),z.set(Ze,lt)})});const k=Array.from(z.values()).map(C=>({description:C.description,totalQuantity:C.totalQuantity,reservationsCount:C.reservationIds.size,displayCost:ie(C.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(C=>[String(C.id),C])),V=new Map,$=C=>{if(!C)return;let te=null;typeof C=="object"?te=C.id??C.technicianId??C.technician_id??C.userId??C.user_id??null:(typeof C=="string"||typeof C=="number")&&(te=C);const ve=te!=null?String(te):null,fe=ve&&G.has(ve)?G.get(ve):typeof C=="object"?C:null,de=fe?.name||fe?.full_name||fe?.fullName||fe?.displayName||(typeof C=="string"?C:null),$e=fe?.role||fe?.title||null,ye=fe?.phone||fe?.mobile||fe?.contact||null;if(!de&&!ve)return;const Ze=ve||de;V.has(Ze)||V.set(Ze,{id:ve,name:de||"-",role:$e||null,phone:ye||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(C=>$(C)),N.forEach(C=>{(Array.isArray(C.technicians)?C.technicians:[]).forEach(ve=>$(ve))});const U=Array.from(V.values()),F=Array.isArray(i.expenses)?i.expenses.map(C=>{const te=Number(C?.amount)||0;return{label:C?.label||C?.name||"-",amount:te,displayAmount:ie(te,t),note:C?.note||C?.description||""}}):[],M=Jd(i),Q=M.applyTax?Number(((M.subtotal+D)*ci).toFixed(2)):0,re=Number((M.subtotal+D+Q).toFixed(2)),se=Qd(i),ue=Jt(i.paidAmount??i.paid_amount)||0,W=Jt(i.paidPercent??i.paid_percent)||0,ee=ps({totalAmount:re,paidAmount:ue,paidPercent:W,history:se}),me=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",qe=fs({manualStatus:me,paidAmount:ee.paidAmount,paidPercent:ee.paidPercent,totalAmount:re}),Ie={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},O=o(`projects.paymentStatus.${qe}`,Ie[qe]||qe),Z=Number(ee.paidAmount||0),ne=Number(ee.paidPercent||0),ce=Math.max(0,Number((re-Z).toFixed(2))),Ce={projectSubtotal:ie(M.subtotal,t),expensesTotal:ie(M.expensesTotal,t),reservationsTotal:ie(D,t),discountAmount:ie(M.discountAmount,t),taxAmount:ie(Q,t),overallTotal:ie(re,t),paidAmount:ie(Z,t),remainingAmount:ie(ce,t)},St={status:qe,statusLabel:O,paidAmount:Z,paidPercent:ne,remainingAmount:ce,paidAmountDisplay:ie(Z,t),remainingAmountDisplay:ie(ce,t),paidPercentDisplay:mr(ne)},X=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:I,typeLabel:_,startDisplay:B,endDisplay:R,durationLabel:w,statusLabel:T},expenses:F,equipment:k,crew:U,totals:M,totalsDisplay:Ce,projectTotals:{combinedTaxAmount:Q,overallTotal:re,reservationsTotal:D,paidAmount:Z,paidPercent:ne,remainingAmount:ce,paymentStatus:qe},paymentSummary:St,notes:X,currencyLabel:t,projectStatus:A,projectStatusLabel:T,projectDurationDays:q,projectDurationLabel:w,paymentHistory:se}}function au({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Be}){const g=$s(p),b=(O,Z)=>Ps(g,O,Z),I=O=>u?.has?.(O),v=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,_=(O,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${x(O)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${x(Z)}</span>
    </div>`,B=(O,Z,{variant:ne="inline"}={})=>ne==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(O)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(O)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Z)}</span>
    </span>`,R=(O,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${x(O)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Z)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(_(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(_(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(_(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(_(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=I("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",A=[];b("projectInfo","projectType")&&A.push(_(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&A.push(_(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&A.push(_(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&A.push(_(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&A.push(_(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&A.push(_(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&A.push(_(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const P=I("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:v}
      </section>`:"",T=bi.filter(O=>b("projectCrew",O.id)),j=I("projectCrew")?T.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${T.map(O=>`<th>${x(O.labelKey?o(O.labelKey,O.fallback):O.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((O,Z)=>`<tr>${T.map(ne=>`<td>${ne.render(O,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(T.length,1)}" class="empty">${x(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",N=[];b("financialSummary","projectSubtotal")&&N.push(B(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ie(0,l)}`)),b("financialSummary","expensesTotal")&&N.push(B(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ie(0,l))),b("financialSummary","reservationsTotal")&&N.push(B(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ie(0,l))),b("financialSummary","discountAmount")&&N.push(B(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ie(0,l))),b("financialSummary","taxAmount")&&N.push(B(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ie(0,l)));const H=[];b("financialSummary","overallTotal")&&H.push(B(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ie(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&H.push(B(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ie(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&H.push(B(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ie(0,l),{variant:"final"}));const D=I("financialSummary")?!N.length&&!H.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${N.length?`<div class="totals-inline">${N.join("")}</div>`:""}
            ${H.length?`<div class="totals-final">${H.join("")}</div>`:""}
          </div>
        </section>`:"",z=hi.filter(O=>b("projectExpenses",O.id)),k=I("projectExpenses")?z.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${z.map(O=>`<th>${x(O.labelKey?o(O.labelKey,O.fallback):O.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((O,Z)=>`<tr>${z.map(ne=>`<td>${ne.render(O,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(z.length,1)}" class="empty">${x(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=vi.filter(O=>b("projectEquipment",O.id)),V=I("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(O=>`<th>${x(O.labelKey?o(O.labelKey,O.fallback):O.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((O,Z)=>`<tr>${G.map(ne=>`<td>${ne.render(O,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${x(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",$=(e?.description||"").trim()||"",U=I("projectNotes")?`<section class="quote-section">
        <h3>${x(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${x($||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",F=[];b("payment","beneficiary")&&F.push(R(o("reservations.quote.labels.beneficiary","اسم المستفيد"),xe.beneficiaryName)),b("payment","bank")&&F.push(R(o("reservations.quote.labels.bank","اسم البنك"),xe.bankName)),b("payment","account")&&F.push(R(o("reservations.quote.labels.account","رقم الحساب"),h(xe.accountNumber))),b("payment","iban")&&F.push(R(o("reservations.quote.labels.iban","رقم الآيبان"),h(xe.iban)));const M=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${F.length?F.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${x(xe.approvalNote)}</p>
    </section>`,Q=Array.isArray(y)&&y.length?y:Be,re=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${Q.map(O=>`<li>${x(O)}</li>`).join("")}</ul>
      </footer>`,se=[],ue=[];if(P&&ue.push({key:"project",html:P}),w&&ue.push({key:"customer",html:w}),ue.length>1){const O=ue.find(ce=>ce.key==="project"),Z=ue.find(ce=>ce.key==="customer"),ne=[];O?.html&&ne.push(O.html),Z?.html&&ne.push(Z.html),se.push(Se(`<div class="quote-section-row quote-section-row--primary">${ne.join("")}</div>`,{blockType:"group"}))}else ue.length===1&&se.push(Se(ue[0].html));const W=[];j&&W.push(Se(j,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),k&&W.push(Se(k,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),V&&W.push(Se(V,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const ee=[];D&&ee.push(Se(D,{blockType:"summary"})),U&&ee.push(Se(U));const me=[Se(M,{blockType:"payment"}),Se(re,{blockType:"footer"})],qe=[...Zn(se,"projects.quote.placeholder.primary"),...W,...Zn(ee,"projects.quote.placeholder.summary"),...me],Ie=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(xe.logoUrl)}" alt="${x(xe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${x(xe.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(xe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${x(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${x(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${x(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${x(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${wi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ie}
          ${qe.join("")}
        </div>
      </div>
    </div>
  `}function zi(e){if(e?.context==="project")return au(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Be}=e,y=h(String(t?.reservationId??t?.id??"")),g=t.start?h(Re(t.start)):"-",b=t.end?h(Re(t.end)):"-",I=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",_=n?.email||"-",B=n?.company||n?.company_name||"-",R=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",A=h(String(c)),P=t?.notes||"",T=Array.isArray(m)&&m.length?m:Be,j=$s(u),N=(ae,we)=>Ps(j,ae,we),H=ae=>l?.has?.(ae),D=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,z=(ae,we)=>`<div class="info-plain__item">${x(ae)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(we)}</strong></div>`,k=(ae,we,{variant:Et="inline"}={})=>Et==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(ae)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(we)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(ae)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(we)}</span>
    </span>`,G=(ae,we)=>`<div class="payment-row">
      <span class="payment-row__label">${x(ae)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(we)}</span>
    </div>`,V=[];N("customerInfo","customerName")&&V.push(z(o("reservations.details.labels.customer","العميل"),I)),N("customerInfo","customerCompany")&&V.push(z(o("reservations.details.labels.company","الشركة"),B)),N("customerInfo","customerPhone")&&V.push(z(o("reservations.details.labels.phone","الهاتف"),R)),N("customerInfo","customerEmail")&&V.push(z(o("reservations.details.labels.email","البريد"),_));const $=H("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${V.length?`<div class="info-plain">${V.join("")}</div>`:D}
      </section>`:"",U=[];N("reservationInfo","reservationId")&&U.push(z(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),N("reservationInfo","reservationStart")&&U.push(z(o("reservations.details.labels.start","بداية الحجز"),g)),N("reservationInfo","reservationEnd")&&U.push(z(o("reservations.details.labels.end","نهاية الحجز"),b)),N("reservationInfo","reservationDuration")&&U.push(z(o("reservations.details.labels.duration","عدد الأيام"),A));const F=H("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${U.length?`<div class="info-plain">${U.join("")}</div>`:D}
      </section>`:"",M=[];N("projectInfo","projectTitle")&&M.push(z(o("reservations.details.labels.project","المشروع"),q)),N("projectInfo","projectCode")&&M.push(z(o("reservations.details.labels.code","الرمز"),w||"-"));const Q=H("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${M.length?`<div class="info-plain">${M.join("")}</div>`:D}
      </section>`:"",re=[];N("financialSummary","equipmentTotal")&&re.push(k(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),N("financialSummary","crewTotal")&&re.push(k(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),N("financialSummary","discountAmount")&&re.push(k(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),N("financialSummary","taxAmount")&&re.push(k(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const se=N("financialSummary","finalTotal"),ue=[];se&&ue.push(k(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const W=ue.length?`<div class="totals-final">${ue.join("")}</div>`:"",ee=H("financialSummary")?!re.length&&!se?`<section class="quote-section quote-section--financial">${D}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${re.length?`<div class="totals-inline">${re.join("")}</div>`:""}
            ${W}
          </div>
        </section>`:"",me=yi.filter(ae=>N("items",ae.id)),qe=me.length>0,Ie=qe?me.map(ae=>`<th>${x(ae.labelKey?o(ae.labelKey,ae.fallback):ae.fallback)}</th>`).join(""):"",Z=Array.isArray(t.items)&&t.items.length>0?t.items.map((ae,we)=>`<tr>${me.map(Et=>`<td>${Et.render(ae,we)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(me.length,1)}" class="empty">${x(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,ne=H("items")?qe?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Ie}</tr>
              </thead>
              <tbody>${Z}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            ${D}
          </section>`:"",ce=gi.filter(ae=>N("crew",ae.id)),Ce=ce.length>0,St=Ce?ce.map(ae=>`<th>${x(ae.labelKey?o(ae.labelKey,ae.fallback):ae.fallback)}</th>`).join(""):"",X=s.length?s.map((ae,we)=>`<tr>${ce.map(Et=>`<td>${Et.render(ae,we)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(ce.length,1)}" class="empty">${x(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,he=H("crew")?Ce?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${St}</tr>
              </thead>
              <tbody>${X}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${D}
          </section>`:"",C=H("notes")?`<section class="quote-section">
        <h3>${x(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(P||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",te=[];N("payment","beneficiary")&&te.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),xe.beneficiaryName)),N("payment","bank")&&te.push(G(o("reservations.quote.labels.bank","اسم البنك"),xe.bankName)),N("payment","account")&&te.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(xe.accountNumber))),N("payment","iban")&&te.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(xe.iban)));const ve=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${te.length?te.join(""):D}</div>
      </div>
      <p class="quote-approval-note">${x(xe.approvalNote)}</p>
    </section>`,fe=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${T.map(ae=>`<li>${x(ae)}</li>`).join("")}</ul>
      </footer>`,de=[];$&&F?de.push(Se(`<div class="quote-section-row">${$}${F}</div>`,{blockType:"group"})):(F&&de.push(Se(F)),$&&de.push(Se($))),Q&&de.push(Se(Q));const $e=[];ne&&$e.push(Se(ne,{blockType:"table",extraAttributes:'data-table-id="items"'})),he&&$e.push(Se(he,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const ye=[];ee&&ye.push(Se(ee,{blockType:"summary"})),C&&ye.push(Se(C));const Ze=[Se(ve,{blockType:"payment"}),Se(fe,{blockType:"footer"})],lt=[...Zn(de,"reservations.quote.placeholder.page1"),...$e,...Zn(ye,"reservations.quote.placeholder.page2"),...Ze],Ht=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(xe.logoUrl)}" alt="${x(xe.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x(xe.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(xe.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${x(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${x(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${wi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ht}
          ${lt.join("")}
        </div>
      </div>
    </div>
  `}function su(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function bn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>su(c)),i=[s,...r].map(c=>c.catch(d=>(rt("asset load failed",d),yd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Hi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ni(r),await bn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),w=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),w){q.classList.add("quote-page--primary");const P=i.cloneNode(!0);P.removeAttribute("data-quote-header-template"),q.appendChild(P)}else q.classList.add("quote-page--continuation");const A=a.createElement("main");A.className="quote-body",q.appendChild(A),s.appendChild(q),u(q),d=q,l=A},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>dd:!1,b=(q,{allowOverflow:w=!1}={})=>(f(),l.appendChild(q),g()&&!w?(l.removeChild(q),m(),!1):!0),I=q=>{const w=q.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!b(w)&&(y(),!b(w)&&b(w,{allowOverflow:!0}))},v=q=>{const w=q.querySelector("table");if(!w){I(q);return}const A=q.querySelector("h3"),P=w.querySelector("thead"),T=Array.from(w.querySelectorAll("tbody tr"));if(!T.length){I(q);return}let j=null,N=0;const H=(z=!1)=>{const k=q.cloneNode(!1);k.removeAttribute("data-quote-block"),k.removeAttribute("data-block-type"),k.removeAttribute("data-table-id"),k.classList.add("quote-section--table-fragment"),z&&k.classList.add("quote-section--table-fragment--continued");const G=A?A.cloneNode(!0):null;G&&k.appendChild(G);const V=w.cloneNode(!1);V.classList.add("quote-table--fragment"),P&&V.appendChild(P.cloneNode(!0));const $=a.createElement("tbody");return V.appendChild($),k.appendChild(V),{section:k,body:$}},D=(z=!1)=>j||(j=H(z),b(j.section)||(y(),b(j.section)||b(j.section,{allowOverflow:!0})),j);T.forEach(z=>{D(N>0);const k=z.cloneNode(!0);if(j.body.appendChild(k),g()&&(j.body.removeChild(k),j.body.childElementCount||(l.removeChild(j.section),j=null,m()),y(),j=null,D(N>0),j.body.appendChild(k),g())){j.section.classList.add("quote-section--table-fragment--overflow"),N+=1;return}N+=1}),j=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):I(q)});const _=Array.from(s.children),B=[];if(_.forEach((q,w)=>{const A=q.querySelector(".quote-body");if(w!==0&&(!A||A.childElementCount===0)){q.remove();return}B.push(q)}),!n){const q=a.defaultView||window,w=Math.min(3,Math.max(1,q.devicePixelRatio||1)),A=qa()?Math.min(2,w):w;B.forEach(P=>Td(P,{pixelRatio:A}))}B.forEach((q,w)=>{const A=w===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=A?"auto":"always",q.style.breakBefore=A?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const R=B[B.length-1]||null;d=R,l=R?.querySelector(".quote-body")||null,await bn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Ls(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function ru(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Nd(),jd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Ns(),m=$i(),y=qa();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):f?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=y||m?.9:f?.92:.95,I=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let _=0;const B=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const w=s[q];await Ni(w),await bn(w);const A=w.ownerDocument||document,P=A.createElement("div");Object.assign(P.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const T=w.cloneNode(!0);T.style.width=`${Rn}px`,T.style.maxWidth=`${Rn}px`,T.style.minWidth=`${Rn}px`,T.style.height=`${Mn}px`,T.style.maxHeight=`${Mn}px`,T.style.minHeight=`${Mn}px`,T.style.position="relative",T.style.background="#ffffff",Ls(T),P.appendChild(T),A.body.appendChild(P);let j;try{await bn(T),j=await i(T,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch($){throw ts($,"pageCapture",{toastMessage:B}),$}finally{P.parentNode?.removeChild(P)}if(!j)continue;const N=j.width||1,D=(j.height||1)/N;let z=Ya,k=z*D,G=0;if(k>Fn){const $=Fn/k;k=Fn,z=z*$,G=Math.max(0,(Ya-z)/2)}const V=j.toDataURL("image/jpeg",b);_>0&&I.addPage(),I.addImage(V,"JPEG",G,0,z,k,`page-${_+1}`,"FAST"),_+=1,await new Promise($=>window.requestAnimationFrame($))}}catch(q){throw ns({safariWindowRef:n,mobileWindowRef:a}),q}if(_===0)throw ns({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=I.output("blob");if(y){const w=URL.createObjectURL(q);pn();try{window.location.assign(w)}catch(A){rt("mobile safari blob navigation failed",A)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(q),A=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,P=(j,N)=>{if(pn(),!j){window.location.assign(N);return}try{j.location.replace(N),j.focus?.()}catch(H){rt("direct blob navigation failed",H);try{j.document.open(),j.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${N}" title="PDF preview"></iframe></body></html>`),j.document.close()}catch(D){rt("iframe blob delivery failed",D),window.location.assign(N)}}},T=A();P(T,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{pn();const q=I.output("bloburl"),w=document.createElement("a");w.href=q,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(q),w.remove()},2e3)}}function zt(){if(!L||!K)return;const{previewFrame:e}=K;if(!e)return;const t=L.context||"reservation",n=zi({context:t,reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});Tt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(mi(r),di(r,s),ui(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Hi(i,{context:"preview"}),Ls(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Rn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Mn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,K?.previewFrameWrapper&&!K?.userAdjustedZoom){const m=K.previewFrameWrapper.clientWidth-24;m>0&&m<l?Qe=Math.max(m/l,.3):Qe=1}Vi(Qe)}finally{pn()}},{once:!0})}function iu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?L.sections.add(n):L.sections.delete(n),Bi(L),Oi(),zt())}function ou(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=L.context||"reservation",r=L.fields||(L.fields=va(s)),i=gd(r,n);t.checked?i.add(a):i.delete(a),Bi(L),zt()}function cu(e){if(!L)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(js(L,n),L.sectionExpansions[n]=t.open)}function Oi(){if(!K?.toggles||!L)return;const{toggles:e}=K,t=L.fields||{},n=L.context||"reservation";js(L);const a=ha(n),s=qi(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=L.sections.has(i),p=s[i]||[],f=bd(L,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const g=Ps(t,i,y.id),b=u?"":"disabled",I=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${b}>
                <span>${x(I)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${x(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",iu)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",ou)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",cu)})}function lu(){if(K?.modal)return K;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${x(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${x(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${x(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${x(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${x(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${x(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${x(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${x(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${x(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${x(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${x(xi("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(L){i.disabled=!0;try{await Ui()}finally{i.disabled=!1}}});const b=()=>{Za()||es(e)};l.forEach(B=>{B?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",B=>{Za()||B.target===e&&es(e)}),K={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const I=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),_=f.querySelector("[data-zoom-reset]");return I?.addEventListener("click",()=>pr(-.1)),v?.addEventListener("click",()=>pr(.1)),_?.addEventListener("click",()=>ea(1,{markManual:!0})),s&&s.addEventListener("input",uu),r&&r.addEventListener("click",mu),ea(Qe),K}function ea(e,{silent:t=!1,markManual:n=!1}={}){Qe=Math.min(Math.max(e,.25),2.2),n&&K&&(K.userAdjustedZoom=!0),Vi(Qe),!t&&K?.zoomValue&&(K.zoomValue.textContent=`${Math.round(Qe*100)}%`)}function pr(e){ea(Qe+e,{markManual:!0})}function Vi(e){if(!K?.previewFrame||!K.previewFrameWrapper)return;const t=K.previewFrame,n=K.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Ns()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function du(){if(!K?.meta||!L)return;const{meta:e}=K;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(L.quoteNumber)}</strong></div>
      <div><span>${x(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(L.quoteDateLabel)}</strong></div>
    </div>
  `}function Bs(){if(!K?.termsInput)return;const e=(L?.terms&&L.terms.length?L.terms:Be).join(`
`);K.termsInput.value!==e&&(K.termsInput.value=e)}function uu(e){if(!L)return;const t=Wa(e?.target?.value??"");if(t.length){L.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{L.terms=[...Be],Bs();const n=Be.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}zt()}function mu(e){if(e?.preventDefault?.(),!L)return;L.terms=[...Be];const t=document.getElementById("reservation-terms");t&&(t.value=Be.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Be.join(`
`)),Bs(),zt()}async function Ui(){if(!L)return;Tt("export");const t=!Ns()&&$i(),n=qa(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${x(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){rt("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Cd(),Na("html2pdf ensured");const d=L.context||"reservation",l=zi({context:d,reservation:L.reservation,customer:L.customer,project:L.project,technicians:L.technicians,totals:L.totals,totalsDisplay:L.totalsDisplay,rentalDays:L.rentalDays,currencyLabel:L.currencyLabel,sections:L.sections,fieldSelections:L.fields,quoteNumber:L.quoteNumber,quoteDate:L.quoteDateLabel,terms:L.terms,projectCrew:L.projectCrew,projectExpenses:L.projectExpenses,projectEquipment:L.projectEquipment,projectInfo:L.projectInfo,clientInfo:L.clientInfo,paymentSummary:L.paymentSummary,projectTotals:L.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),mi(i),di(i),ui(i),Na("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Hi(u,{context:"export"}),await bn(u),Ls(u),Na("layout complete for export document")}catch(f){ts(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${L.quoteNumber}.pdf`;await ru(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),L.sequenceCommitted||(Fd(L.quoteSequence),L.sequenceCommitted=!0)}catch(d){ns({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,ts(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),pn()}}function Ki(){const e=lu();e?.modal&&(mn=!1,Qe=1,K&&(K.userAdjustedZoom=!1),ea(Qe,{silent:!0}),Oi(),du(),Bs(),zt(),fd(e.modal))}async function pu({reservation:e,customer:t,project:n}){if(!e){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Vd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Ud(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Ci("reservation"),u=new Date,p=nd();L={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ha("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Ts("reservation"),fields:va("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Fi(u),sequenceCommitted:!1},Di(L),Ki()}async function fm({project:e}){if(!e){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=nu(e),{project:n}=t;if(!n){S(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Ci("project"),r=new Date,i=[...td];L={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ha("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Ts("project"),fields:va("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Fi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Di(L),Ki()}function fu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=Sn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=pe(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Hl(),m=new Map(i.map(b=>[String(b.id),b])),y=new Map(l.map(b=>[String(b.id),b])),g=Kl({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Ql({entries:g,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const I=Number(b.dataset.reservationIndex);Number.isNaN(I)||b.addEventListener("click",()=>{typeof n=="function"&&n(I)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const I=Number(b.dataset.reservationIndex);Number.isNaN(I)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(I,v)})})}function yu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=pe(),c=s[e];if(!c)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(I=>String(I.id)===String(c.customerId)),l=c.projectId?i.find(I=>String(I.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const I=Sn()||[];u.innerHTML=Gl(c,d,I,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{f();const I=l?.id!=null?String(l.id):"",v=I?`projects.html?project=${encodeURIComponent(I)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async I=>{I?.preventDefault?.(),I?.stopPropagation?.(),b.blur();try{await pu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),S(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Qi(){const e=()=>{xn(),Ne(),Sn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let fr=!1,yr=null;function gu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function ym(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=gu(n);if(!a&&fr&&Pt().length>0&&s===yr)return Pt();try{const r=await $r(n||{});return fr=!0,yr=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Pt()}}async function bu(e,{onAfterChange:t}={}){if(!Bt())return qn(),!1;const a=Pt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await Ic(s),Qi(),t?.({type:"deleted",reservation:a}),S(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ia(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return S(i,"error"),!1}}async function hu(e,{onAfterChange:t}={}){const a=Pt()[e];if(!a)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=bt(a);if(r)return S(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Ac(s);return Qi(),t?.({type:"confirmed",reservation:i}),S(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ia(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return S(c,"error"),!1}}function tn(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:yn(e,n),end:yn(t,a)}}function ta(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ds(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function Gi(){const{container:e,select:t,hint:n,addButton:a}=Ds();if(!t)return;const s=t.value,r=Er(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${ta(u.id)}">${ta(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function vu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||S(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=vt(),{start:r,end:i}=tn(),{reservations:c=[]}=pe(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=ni(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||S(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return qt(a,p),ht(p),ze(),t||S(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function gr(){const{select:e}=Ds();if(!e)return;const t=e.value||"";vu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function qu(){const{addButton:e,select:t}=Ds();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{gr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),gr())}),t.dataset.listenerAttached="true"),Gi()}function ht(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,hr(t);return}const d=Ft(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Dt(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(A=>A?.type==="package"),y=h(String(l.count)),g=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):g*l.count,I=`${h(g.toFixed(2))} ${a}`,v=`${h(b.toFixed(2))} ${a}`,_=l.barcodes.map(A=>h(String(A||""))).filter(Boolean),B=_.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${_.map(A=>`<li>${A}</li>`).join("")}
            </ul>
          </details>`:"";let R="";if(m){const A=new Map;if(l.items.forEach(P=>{Array.isArray(P?.packageItems)&&P.packageItems.forEach(T=>{if(!T)return;const j=Y(T.barcode||T.normalizedBarcode||T.desc||Math.random()),N=A.get(j),H=Number.isFinite(Number(T.qty))?Number(T.qty):1;if(N){N.qty+=H;return}A.set(j,{desc:T.desc||T.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:H,barcode:T.barcode??T.normalizedBarcode??""})})}),A.size){const P=Array.from(A.values()).map(T=>{const j=h(String(T.qty)),N=ta(T.desc||""),H=T.barcode?` <span class="reservation-package-items__barcode">(${ta(h(String(T.barcode)))})</span>`:"";return`<li>${N}${H} × ${j}</li>`}).join("");R=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${P}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",w=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${R||""}${B||""}`:B}
              </div>
            </div>
          </td>
          <td>
            <div class="${q}" data-group-key="${l.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-edit-group" data-group-key="${l.key}" aria-label="${i}"${w}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-edit-group" data-group-key="${l.key}" aria-label="${r}"${w}>+</button>
            </div>
          </td>
          <td>${I}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),hr(t)}function Su(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function Sa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=Ea();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,br();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Re(s.recordedAt)):"—",l=Su(s?.type),u=s?.note?h(s.note):"";return`
      <tr>
        <td>${l}</td>
        <td>${i}</td>
        <td>${c}</td>
        <td>${d}</td>
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
  `,br()}function Eu(){if(hn()){S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=Ji(e);let a=Yi(t);if(!Number.isFinite(a)||a<=0){S(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Ba.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));S(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){S(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;S(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};ju(p),Fs(Ea()),Sa(),ze(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),S(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function br(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(hn()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Eu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(hn()){n.preventDefault(),S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Nu(s),Fs(Ea()),Sa(),ze(),S(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function xu(e){const{index:t,items:n}=vt(),s=Ft(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);qt(t,i),ht(i),ze()}function wu(e){const{index:t,items:n}=vt(),a=n.filter(s=>wn(s)!==e);a.length!==n.length&&(qt(t,a),ht(a),ze())}function Iu(e){const{index:t,items:n}=vt(),s=Ft(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=tn();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=pe(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>Y(b.barcode))),{equipment:p=[]}=pe(),f=(p||[]).find(b=>{const I=Y(b?.barcode);return!I||u.has(I)||wn({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!bs(b)?!1:!Xe(I,r,i,l)});if(!f){S(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=Y(f.barcode),y=gt(f);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Dt(f)}];qt(t,g),ht(g),ze()}function hr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){xu(s);return}if(a==="increase-edit-group"&&s){Iu(s);return}if(a==="remove-edit-group"&&s){wu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||_u(i)}}),e.dataset.groupListenerAttached="true")}function hn(){return!!document.getElementById("edit-res-project")?.value}function Au(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{hn()&&(S(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function ku(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Au),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function ze(){const e=document.getElementById("edit-res-summary");if(!e)return;Sa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Fe(a),ze()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=hn();ku(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Oe("edit-res-company-share"),f=Wt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Oe("edit-res-company-share"),f=Wt("edit-res-company-share")));const{items:m=[],payments:y=[]}=vt(),{start:g,end:b}=tn(),I=Ba({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:f,paymentHistory:y});e.innerHTML=I;const v=Ba.lastResult;if(v&&a){const _=v.paymentStatus;u?Fe(a,a.value):(a.value!==_&&(a.value=_),a.dataset&&delete a.dataset.userSelected,Fe(a,_))}else a&&Fe(a,a.value)}function _u(e){if(e==null)return;const{index:t,items:n}=vt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);qt(t,a),ht(a),ze()}function $u(e){const t=e?.value??"",n=Y(t);if(!n)return;const a=ca(n);if(!a){S(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=ot(a);if(s==="maintenance"||s==="retired"){S(Lt(s));return}const r=Y(n),{index:i,items:c=[]}=vt();if(c.findIndex(b=>Y(b.barcode)===r)>-1){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=tn();if(!l||!u){S(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=pe(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(Xe(r,l,u,m)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=gt(a);if(!y){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];qt(i,g),e&&(e.value=""),ht(g),ze()}function na(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=Yr(t),a=Y(n?.barcode||t);if(!n||!a){S(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=ot(n);if(s==="maintenance"||s==="retired"){S(Lt(s));return}const{start:r,end:i}=tn();if(!r||!i){S(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=vt();if(d.some(g=>Y(g.barcode)===a)){S(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=pe(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(Xe(a,r,i,f)){S(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=gt(n);if(!m){S(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];qt(c,y),ht(y),ze(),e.value=""}function Wi(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),na(e))});const t=()=>{Zr(e.value,"edit-res-equipment-description-options")&&na(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ze()});const e=()=>{qu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{Gi()})}typeof window<"u"&&(window.getEditReservationDateRange=tn,window.renderEditPaymentHistory=Sa);function Pu(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ka(e);return}na(e)}}function gm(){yt(),Wi()}function Tu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let vn=null,Ke=[],Ge=[],as=null,Te={},Ca=!1;function ss(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function rs(){return document.getElementById("edit-res-confirmed")?.value==="true"}function vt(){return{index:vn,items:Ke,payments:Ge}}function qt(e,t,n=Ge){vn=typeof e=="number"?e:null,Ke=Array.isArray(t)?[...t]:[],Ge=Array.isArray(n)?[...n]:[]}function Xi(){vn=null,Ke=[],$c(),Ge=[]}function Ea(){return[...Ge]}function Fs(e){Ge=Array.isArray(e)?[...e]:[]}function ju(e){e&&(Ge=[...Ge,e])}function Nu(e){!Number.isInteger(e)||e<0||(Ge=Ge.filter((t,n)=>n!==e))}function fn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function is(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Cu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?Y(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:fn(e.qty??e.quantity??e.count??1),price:is(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Lu(e,t=0){if(!e||typeof e!="object")return null;const n=Qt(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=fn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:ra(e)).map(f=>Cu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=is(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=is(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function Bu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Du(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Lu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=fn(c.qty??c.quantity??1);if(c.barcode){const l=Y(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*fn(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?Y(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const b=Qt(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===b)||i.push({...c});return}const d=fn(c.qty??c.quantity??1),l=gt(c),u=c.barcode?Y(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(b=>r.get(b)??0).filter(b=>b>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(Bu(r,p,y),y>=d)return;const g=d-y;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Fu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function Ji(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Yi(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Ru(e,t){if(e){e.value="";return}}function cn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Zi(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Mu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${cn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${cn(d.id)}">${cn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${cn(r)}">${cn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function eo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}os("tax");const c=Te?.updateEditReservationSummary;typeof c=="function"&&c()}function os(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Te?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ca){a();return}Ca=!0;const s=()=>{Ca=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(it)),t.disabled){n.checked=!1,S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Oe("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Oe("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function vr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=pe(),u=Pt()?.[e];if(!u){S(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Te={...Te,reservation:u,projects:d||[]},t?.(),Mu(d||[],u);const p=u.projectId&&d?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=bt(u,p),y=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:Y($?.barcode)})):[],g=Du(u,y),I=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map($=>Zi($)).filter(Boolean);qt(e,g,I);const v=o("reservations.list.unknownCustomer","غير معروف"),_=c?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const B=document.getElementById("edit-res-id");B&&(B.value=u.reservationId||u.id);const R=document.getElementById("edit-res-customer");R&&(R.value=_?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const A=document.getElementById("edit-res-notes");A&&(A.value=u.notes||"");const P=document.getElementById("edit-res-discount");if(P){const $=m?0:u.discount??0;P.value=h($)}const T=document.getElementById("edit-res-discount-type");T&&(T.value=m?"percent":u.discountType||"percent");const j=u.projectId?!1:!!u.applyTax,N=document.getElementById("edit-res-tax");N&&(N.checked=j);const H=document.getElementById("edit-res-company-share");if(H){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,U=$!=null?Number.parseFloat(h(String($).replace("%","").trim())):NaN,F=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,M=F!=null?F===!0||F===1||F==="1"||String(F).toLowerCase()==="true":Number.isFinite(U)&&U>0,Q=M&&Number.isFinite(U)&&U>0?U:it,re=j||M;H.checked=re,H.dataset.companyShare=String(Q)}ss(f,{disable:m});const D=document.getElementById("edit-res-paid"),z=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");D&&(D.value=z,D.dataset&&delete D.dataset.userSelected);const k=document.getElementById("edit-res-payment-progress-type"),G=document.getElementById("edit-res-payment-progress-value");if(k?.dataset?.userSelected&&delete k.dataset.userSelected,k&&(k.value="percent"),Ru(G),Pc((u.technicians||[]).map($=>String($))),s?.(g),typeof window<"u"){const $=window?.renderEditPaymentHistory;typeof $=="function"&&$()}eo(),r?.();const V=document.getElementById("editReservationModal");as=Fu(V,i),as?.show?.()}async function zu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(vn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=rs(),I=document.getElementById("edit-res-paid"),v=I?.dataset?.userSelected==="true",_=v&&I?.value||"unpaid",B=document.getElementById("edit-res-payment-progress-type"),R=document.getElementById("edit-res-payment-progress-value"),q=Ji(B),w=Yi(R),A=document.getElementById("edit-res-project")?.value||"",P=kc(),T=document.getElementById("edit-res-company-share"),j=document.getElementById("edit-res-tax");if(!d||!u){S(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const N=typeof e=="function"?e:(X,he)=>`${X}T${he||"00:00"}`,H=N(d,l),D=N(u,p);if(H&&D&&new Date(H)>new Date(D)){S(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const k=Pt()?.[vn];if(!k){S(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ke)||Ke.length===0&&P.length===0){S(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,V=k.id??k.reservationId;for(const X of Ke){if(X?.type==="package"&&Array.isArray(X.packageItems)){for(const C of X.packageItems){const te=C?.barcode??C?.normalizedBarcode??"";if(!te)continue;const ve=ot(te);if(ve==="reserved"){const fe=Y(te);if(!G(fe,H,D,V))continue}if(ve!=="available"){S(Lt(ve));return}}continue}const he=ot(X.barcode);if(he==="reserved"){const C=Y(X.barcode);if(!G(C,H,D,V))continue}if(he!=="available"){S(Lt(he));return}}for(const X of Ke){if(X?.type==="package"&&Array.isArray(X.packageItems)){for(const C of X.packageItems){const te=Y(C?.barcode??C?.normalizedBarcode??"");if(te&&G(te,H,D,V)){const ve=C?.desc||C?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),fe=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(ve))})`;S(fe);return}}continue}const he=Y(X.barcode);if(G(he,H,D,V)){S(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const X of Ke){if(X?.type!=="package")continue;const he=X.packageId??X.package_id??null;if(he&&$(he,H,D,V)){const C=X.desc||X.packageName||o("reservations.create.packages.genericName","الحزمة");S(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(C))} محجوزة بالفعل في الفترة المختارة`));return}}const U=typeof a=="function"?a:()=>!1;for(const X of P)if(U(X,H,D,V)){S(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const F=Array.isArray(Te.projects)&&Te.projects.length?Te.projects:pe().projects||[],M=A&&F.find(X=>String(X.id)===String(A))||null,Q={...k,projectId:A?String(A):null,confirmed:b},{effectiveConfirmed:re,projectLinked:se,projectStatus:ue}=bt(Q,M);let W=!!T?.checked,ee=!!j?.checked;if(se&&(W&&(T.checked=!1,W=!1),ee=!1),!se&&W!==ee){S(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}ee&&(Oe("edit-res-company-share"),W=!!T?.checked);let me=W?getCompanySharePercent("edit-res-company-share"):null;W&&(!Number.isFinite(me)||me<=0)&&(Oe("edit-res-company-share"),me=getCompanySharePercent("edit-res-company-share"));const qe=W&&ee&&Number.isFinite(me)&&me>0,Ie=se?!1:ee;se&&(y=0,g="percent");const O=ms(Ke,y,g,Ie,P,{start:H,end:D,companySharePercent:qe?me:0});let Z=Ea();if(Number.isFinite(w)&&w>0){const X=O;let he=null,C=null;q==="amount"?(he=w,X>0&&(C=w/X*100)):(C=w,X>0&&(he=w/100*X));const te=Zi({type:q,value:w,amount:he,percentage:C,recordedAt:new Date().toISOString()});te&&(Z=[...Z,te],Fs(Z)),R&&(R.value="")}const ne=ps({totalAmount:O,history:Z}),ce=fs({manualStatus:_,paidAmount:ne.paidAmount,paidPercent:ne.paidPercent,totalAmount:O});I&&!v&&(I.value=ce,I.dataset&&delete I.dataset.userSelected);let Ce=k.status??"pending";se?Ce=M?.status??ue??Ce:["completed","cancelled"].includes(String(Ce).toLowerCase())||(Ce=b?"confirmed":"pending");const St=Ar({reservationCode:k.reservationCode??k.reservationId??null,customerId:k.customerId,start:H,end:D,status:Ce,title:k.title??null,location:k.location??null,notes:f,projectId:A?String(A):null,totalAmount:O,discount:y,discountType:g,applyTax:Ie,paidStatus:ce,confirmed:re,items:Ke.map(X=>({...X,equipmentId:X.equipmentId??X.id})),technicians:P,companySharePercent:qe?me:null,companyShareEnabled:qe,paidAmount:ne.paidAmount,paidPercentage:ne.paidPercent,paymentProgressType:ne.paymentProgressType,paymentProgressValue:ne.paymentProgressValue,paymentHistory:Z});try{const X=await _c(k.id||k.reservationId,St);await $r(),xn(),Ne(),S(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),Xi(),c?.({type:"updated",reservation:X}),r?.(),i?.(),as?.hide?.()}catch(X){console.error("❌ [reservationsEdit] Failed to update reservation",X);const he=ia(X)?X.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");S(he,"error")}}function bm(e={}){Te={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Te,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{os("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{os("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{eo();const b=Array.isArray(Te.projects)&&Te.projects.length?Te.projects:pe().projects||[],I=p.value&&b.find(q=>String(q.id)===String(p.value))||null,_={...Te?.reservation??{},projectId:p.value||null,confirmed:rs()},{effectiveConfirmed:B,projectLinked:R}=bt(_,I);ss(B,{disable:R}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const b=!rs();ss(b),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{zu(Te).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let b=null;const I=()=>{y.value?.trim()&&(clearTimeout(b),b=null,n?.(y))};y.addEventListener("keydown",_=>{_.key==="Enter"&&(_.preventDefault(),I())});const v=()=>{if(clearTimeout(b),!y.value?.trim())return;const{start:_,end:B}=getEditReservationDateRange();!_||!B||(b=setTimeout(()=>{I()},150))};y.addEventListener("input",v),y.addEventListener("change",I),y.dataset.listenerAttached="true"}Wi?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{Xi(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Hu=pe()||{};let He=(Hu.projects||[]).map(Uu),An=!1;function hm(){return He}function xa(e){He=Array.isArray(e)?e.map(Ms):[],ls({projects:He});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return He}async function Ou(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await We(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Rs);return xa(i),An=!0,He}async function Vu({force:e=!1,params:t=null}={}){if(!e&&An&&He.length>0)return He;try{return await Ou(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),He}}async function vm(e){const t=await We("/projects/",{method:"POST",body:e}),n=Rs(t?.data??{}),a=[...He,n];return xa(a),An=!0,n}async function qm(e,t){const n=await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Rs(n?.data??{}),s=He.map(r=>String(r.id)===String(e)?a:r);return xa(s),An=!0,a}async function Sm(e){await We(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=He.filter(n=>String(n.id)!==String(e));xa(t),An=!0}function Em({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:I=null,companyShareAmount:v=0,paidAmount:_=null,paidPercentage:B=null,paymentProgressType:R=null,paymentProgressValue:q=null,confirmed:w=!1,technicians:A=[],equipment:P=[],payments:T,paymentHistory:j}={}){const N=Array.isArray(A)?A.map(F=>Number.parseInt(String(F),10)).filter(F=>Number.isInteger(F)&&F>0):[],H=Array.isArray(P)?P.map(F=>{const M=Number.parseInt(String(F.equipmentId??F.equipment_id??F.id??0),10),Q=Number.parseInt(String(F.qty??F.quantity??0),10);return!Number.isInteger(M)||M<=0?null:{equipment_id:M,quantity:Number.isInteger(Q)&&Q>0?Q:1}}).filter(Boolean):[],D=Array.isArray(p)?p.map(F=>{const M=Number.parseFloat(F?.amount??F?.value??0)||0,Q=(F?.label??F?.name??"").trim();return Q?{label:Q,amount:Math.round(M*100)/100}:null}).filter(Boolean):[],z=D.reduce((F,M)=>F+(M?.amount??0),0),k={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(z*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:N,equipment:H,expenses:D},G=Math.max(0,Number.parseFloat(y)||0);k.discount=G,k.discount_type=g==="amount"?"amount":"percent";const V=Number.parseFloat(I),$=!!b&&Number.isFinite(V)&&V>0;k.company_share_enabled=$,k.company_share_percent=$?V:0,k.company_share_amount=$?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(_))&&(k.paid_amount=Math.max(0,Number.parseFloat(_)||0)),Number.isFinite(Number(B))&&(k.paid_percentage=Math.max(0,Number.parseFloat(B)||0)),(R==="amount"||R==="percent")&&(k.payment_progress_type=R),q!=null&&q!==""&&(k.payment_progress_value=Number.parseFloat(q)||0),e&&(k.project_code=String(e).trim());const U=T!==void 0?T:j;if(U!==void 0){const F=to(U)||[];k.payments=F.map(M=>({type:M.type,amount:M.amount!=null?M.amount:null,percentage:M.percentage!=null?M.percentage:null,value:M.value!=null?M.value:null,note:M.note??null,recorded_at:M.recordedAt??null}))}return k.end_datetime||delete k.end_datetime,k.client_company||(k.client_company=null),k}function Rs(e={}){return Ms(e)}function Uu(e={}){return Ms(e)}function Ms(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",I=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:I}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=to(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function xm(e){return e instanceof qr}function La(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Ku(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=La(e.value);let s=La(e.amount),r=La(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function to(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ku(t)).filter(Boolean):[]}const aa="reservations-ui:ready",_t=typeof EventTarget<"u"?new EventTarget:null;let $t={};function Qu(e){return Object.freeze({...e})}function Gu(){if(!_t)return;const e=$t,t=typeof CustomEvent=="function"?new CustomEvent(aa,{detail:e}):{type:aa,detail:e};typeof _t.dispatchEvent=="function"&&_t.dispatchEvent(t)}function Wu(e={}){if(!e||typeof e!="object")return $t;const t={...$t};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),$t=Qu(t),Gu(),$t}function Xu(e){if(e)return $t?.[e]}function wm(e){const t=Xu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||$t)?.[e];typeof i=="function"&&(_t&&_t.removeEventListener(aa,a),n(i))};_t&&_t.addEventListener(aa,a)})}function Im(){return Vu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=pe()||{};Tc(e||[]),ii()})}function zs(e=null){ii(),no(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Ju(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cs(){return{populateEquipmentDescriptionLists:yt,setFlatpickrValue:Tu,splitDateTime:xr,renderEditItems:ht,updateEditReservationSummary:ze,addEquipmentByDescription:Pu,addEquipmentToEditingReservation:$u,addEquipmentToEditingByDescription:na,combineDateTime:yn,hasEquipmentConflict:Xe,hasTechnicianConflict:Ir,renderReservations:no,handleReservationsMutation:zs,ensureModal:Ju}}function no(e="reservations-list",t=null){fu({containerId:e,filters:t,onShowDetails:ao,onConfirmReservation:ro})}function ao(e){return yu(e,{getEditContext:cs,onEdit:(t,{reservation:n})=>{io(t,n)},onDelete:so})}function so(e){return Bt()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?bu(e,{onAfterChange:zs}):!1:(qn(),!1)}function ro(e){return hu(e,{onAfterChange:zs})}function io(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}vr(e,cs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}vr(e,cs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}pc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Am(){Wu({showReservationDetails:ao,deleteReservation:so,confirmReservation:ro,openReservationEditor:io})}export{qm as A,Wu as B,ao as C,Rs as D,Zt as E,Es as F,lm as G,dm as H,hm as I,xm as J,ci as K,um as L,fm as M,sm as N,rm as O,cm as P,Ou as Q,_e as R,im as S,om as T,mm as U,Sm as V,vm as W,Zl as X,di as Y,ui as Z,pm as _,Vu as a,Am as b,bm as c,gm as d,ym as e,ii as f,cs as g,oe as h,nm as i,zs as j,Gl as k,Im as l,bt as m,ya as n,Ne as o,Rc as p,On as q,no as r,am as s,em as t,ze as u,tm as v,Xu as w,wm as x,oi as y,Em as z};
