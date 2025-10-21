import{n as h,d as de,f as ic,t as o,b as Je,h as E,j as Ct,o as hn,s as ls,A as Ir,z as oc,k as De,B as Ar,u as cc}from"./auth.js";import{n as Z,x as Ye,y as Vt,f as na,z as kr,A as lc,D as ct,B as ds,C as Ys,E as pn,F as aa,G as dc,H as Ze,I as us,J as _r,K as uc,L as mc,M as pc,N as fc,O as Rn,P as yc,Q as $r,R as gc,S as Pr,v as ms,h as ps,j as fs,T as Nr,U as bc,s as vn,c as sa,V as Tr,W as hc,X as jr,Y as vc,p as ra,a as Cr,g as _t,Z as qc,_ as Sc,$ as Ba,a0 as Ec,w as xc,a1 as wc,a2 as Ic,b as Ac}from"./reservationsService.js";const _a="select.form-select:not([data-no-enhance]):not([multiple])",et=new WeakMap;let $a=null,Zs=!1,st=null;function Ju(e=document){e&&(e.querySelectorAll(_a).forEach(t=>Cn(t)),!$a&&e===document&&($a=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(_a)&&Cn(a),a.querySelectorAll?.(_a).forEach(s=>Cn(s)))})}),$a.observe(document.body,{childList:!0,subtree:!0})),Zs||(Zs=!0,document.addEventListener("pointerdown",$c,{capture:!0})))}function jn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Cn(e);return}const t=e.closest(".enhanced-select");t&&(ys(t),Mn(t),Fa(t))}function Cn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){jn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};et.set(t,r),a.addEventListener("click",()=>_c(t)),a.addEventListener("keydown",i=>Pc(i,t)),s.addEventListener("click",i=>Tc(i,t)),s.addEventListener("keydown",i=>Nc(i,t)),e.addEventListener("change",()=>{Mn(t),Lr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&Fa(t),c&&kc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),ys(t),Mn(t),Fa(t)}function kc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,ys(t),Mn(t)})))}function ys(e){const t=et.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Lr(e)}function Mn(e){const t=et.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Lr(e){const t=et.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function Fa(e){const t=et.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function _c(e){et.get(e)&&(e.getAttribute("data-open")==="true"?Wt(e):Br(e))}function Br(e){const t=et.get(e);if(!t)return;st&&st!==e&&Wt(st,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),st=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function Wt(e,{focusTrigger:t=!0}={}){const n=et.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),st===e&&(st=null))}function $c(e){if(!st)return;const t=e.target;t instanceof Node&&(st.contains(t)||Wt(st,{focusTrigger:!1}))}function Pc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),Br(t)):n==="Escape"&&Wt(t)}function Nc(e,t){const n=e.key,a=et.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Fr(i,t)}else n==="Escape"&&(e.preventDefault(),Wt(t))}function Tc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Fr(n,t)}function Fr(e,t){const n=et.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),Wt(t)}const Xt=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let rt=null;function gs(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Dr(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function jc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Cc(e={}){const t=jc({...e,activatedAt:Date.now()});return rt=t,Dr(!0,t.mode||"create"),gs(Xt.change,{active:!0,selection:{...t}}),t}function zn(e="manual"){if(!rt)return;const t=rt;rt=null,Dr(!1),gs(Xt.change,{active:!1,previous:t,reason:e})}function Rr(){return!!rt}function Lc(){return rt?{...rt}:null}function Bc(e){if(!rt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return gs(Xt.requestAdd,{...t,selection:{...rt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||zn("tab-changed")});const Fc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),Dc=new Set(["maintenance","reserved","retired"]);function Rc(e){const t=String(e??"").trim().toLowerCase();return t&&Fc.get(t)||"available"}function Mc(e){return e?typeof e=="object"?e:ia(e):null}function lt(e){const t=Mc(e);return t?Rc(t.status||t.state||t.statusLabel||t.status_label):"available"}function bs(e){return!Dc.has(lt(e))}function Lt(e={}){return e.image||e.imageUrl||e.img||""}function zc(e){if(!e)return null;const t=Z(e),{equipment:n=[]}=de();return(n||[]).find(a=>Z(a?.barcode)===t)||null}function ia(e){const t=Z(e);if(!t)return null;const{equipment:n=[]}=de();return(n||[]).find(a=>Z(a?.barcode)===t)||null}const Hc=de()||{};let mt=(Hc.equipment||[]).map(Uc),Da=!1,cn="",It=null,Pt=null,Nt=null,oa=!1,er=!1;function Oc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Vc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Uc(e={}){return hs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ca(e={}){return hs(e)}function hs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=qn(e.quantity??e.qty??0),i=la(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=$e(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Kc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Kc(e){return e!=null&&e!==""}function qn(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function la(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Qc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function tr(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Gc(e,t){const n=tr(e),a=tr(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Hn(e?.desc||e?.description||e?.name||""),d=Hn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function Se(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $e(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Wc(e){return $e(e)}function Ra(){if(!Rr())return null;const e=Lc();return e?{...e}:null}function Xc(e){const t=Ra();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=Z(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>bs(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!Ye(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>$e(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function Jc(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Mr(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Ra();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Ra(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?zn("package-finish-button"):(zn("return-button"),Jc())}),t.dataset.listenerAttached="true")}function Re(){return mt}function Tt(e){mt=Array.isArray(e)?e.map(hs):[],ls({equipment:mt}),Vc()}function Hn(e){return String(e??"").trim().toLowerCase()}function ft(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Hn(t);return n||(n=Hn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function da(e){const t=ft(e);return t?Re().filter(n=>ft(n)===t):[]}function ua(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ma(e);if(n){const a=Se(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${Se(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function vs(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function On(){const e=vs();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function qs(e={}){const t=vs();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Ut(e){oa=e;const t=vs(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function Yu(e){if(!Ct()){hn();return}if(!e)return;try{await Zc()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,g=l.الباركود??l.barcode??"",b=l.الحالة??l.status??"متاح",x=l.الصورة??l.image_url??l.image??"",v=h(String(g||"")).trim();if(!f||!v){d+=1;return}c.push(Ss({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:b,image_url:x}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await Je("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ca):[];if(u.length){const m=[...Re(),...u];Tt(m)}await pa({showToastOnError:!1}),Pe();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=Jt(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const Yc="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let tn=null;function Zc(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):tn||(tn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=Yc,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),tn=null,e}),tn)}function Ss({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Wc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:qn(a),unit_price:la(s),barcode:d,status:l,image_url:c?.trim()||null}}async function el(){if(!Ct()){hn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await Je("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await pa({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=Jt(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function ma(e){return e.image||e.imageUrl||e.img||""}function tl(e){const t=$e(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Vn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${Se(a)}</td></tr>`}n&&(n.textContent="0")}function zr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=It?.groupKey||ft(e);if(!r){Vn();return}const i=Re().filter(p=>ft(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Vn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Re(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=Se(String(p.barcode||"-")),g=f?`<span class="equipment-variants-current-badge">${Se(c)}</span>`:"",b=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),x=l.indexOf(p),v=Se(o("equipment.item.actions.delete","🗑️ حذف")),I=x>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${x}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${g}
          </td>
          <td>${tl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${Se(d)}">${b}</span>
          </td>
          <td class="table-actions-cell">${I}</td>
        </tr>
      `}).join("");n.innerHTML=u}function nl({item:e,index:t}){const n=ma(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Ct(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),g=y.toLocaleString("en-US"),b=o("equipment.card.labels.availableOfTotal","من أصل"),x=$e(e.status);let v=`${Se(c.available)}: ${Se(g)} ${Se(b)} ${Se(u)}`,I="available";if(y===0){const R={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},V=R[x]||R.default;v=Se(V.text),I=V.modifier}const L=`<span class="equipment-card__availability equipment-card__availability--${I}">${v}</span>`,B="",q=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",$=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:R,value:V})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${R}</span>
              <span class="equipment-card__detail-value">${V}</span>
            </span>
          `).join("")}
    </div>`,N=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),P=N.length?`<div class="equipment-card__categories">${N.map(({label:R,value:V})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${R}</span>
              <span class="equipment-card__detail-value">${V}</span>
            </div>
          `).join("")}</div>`:"",T=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",F=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${$}
    </div>
  `,O=[],k=Xc(e),G=k?.availableBarcodes?.length?k.availableBarcodes.join(","):k?.barcode?k.barcode:"";let K="",_="";if(k.active){const R=`equipment-select-qty-${t}`,V=!!k.canSelect,te=V?Math.max(1,Number(k.maxQuantity||k.availableBarcodes?.length||1)):1,se=Math.max(1,Math.min(te,99)),le=[];for(let ae=1;ae<=se;ae+=1){const me=h(String(ae));le.push(`<option value="${ae}"${ae===1?" selected":""}>${me}</option>`)}const J=V?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),ge=V?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(te))}`:k.reason?k.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${R}">${re}</label>
        <select class="equipment-card__quantity-select" id="${R}" data-equipment-select-quantity${J}>
          ${le.join("")}
        </select>
        ${ge?`<span class="equipment-card__selection-hint">${Se(ge)}</span>`:""}
      </div>
    `;const be=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),xe=V?"":" disabled",U=k.reason?` title="${Se(k.reason)}"`:"",Y=['data-equipment-action="select-reservation"',`data-selection-max="${V?te:0}"`];G&&Y.push(`data-selection-barcodes="${Se(G)}"`),e.groupKey&&Y.push(`data-selection-group="${Se(String(e.groupKey))}"`),_=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Y.join(" ")}${xe}${U}>${be}</button>
    `}i&&O.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const z=O.length?O.join(`
`):"",D=Se(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${Se(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${D}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${B}
        ${L}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${F}
        </div>
      </div>
      <div class="equipment-card__body">
        ${P}
        ${T}
      </div>
      ${K||_||z?`<div class="equipment-card__actions equipment-card__actions--center">
            ${K}
            ${_}
            ${z}
          </div>`:""}
    </article>
  `}function al(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),jn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),jn(s)}const r=document.getElementById("filter-status");r&&jn(r)}function Sn(){const e=de();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return mt=t||[],mt;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=$e(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!sl(m,s))continue;if(m.items?.some(g=>h(String(g?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Tt(c):(mt=c,ls({equipment:mt})),mt}function sl(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Pa(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Pe(){const e=document.getElementById("equipment-list");if(!e)return;Mr();const t=Sn(),n=Array.isArray(t)?t:Re(),a=new Map;n.forEach(g=>{if(!g)return;const b=ft(g);b&&(a.has(b)||a.set(b,[]),a.get(b).push(g))});const s=Array.from(a.values()).map(g=>{const b=g[0],x=g.reduce((w,A)=>w+(Number.isFinite(Number(A.qty))?Number(A.qty):0),0),v=["maintenance","reserved","available","retired"],I=g.map(w=>$e(w.status)).sort((w,A)=>v.indexOf(w)-v.indexOf(A))[0]||"available",L=g.reduce((w,A)=>{const $=qn(A?.qty??0)||0,N=$e(A?.status);return N==="reserved"?w.reserved+=$:N==="maintenance"&&(w.maintenance+=$),w},{reserved:0,maintenance:0}),B=Math.max(x-L.reserved-L.maintenance,0);return{item:{...b,qty:x,status:I,variants:g,groupKey:ft(b),reservedQty:L.reserved,maintenanceQty:L.maintenance,availableQty:B},index:n.indexOf(b)}});s.sort((g,b)=>Gc(g.item,b.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?$e(l):"";if(Da&&!n.length){e.innerHTML=Pa(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(cn&&!n.length){e.innerHTML=Pa(cn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:g})=>{const b=h(String(g.barcode??"")).toLowerCase().trim(),x=Array.isArray(g.variants)?g.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||g.name&&g.name.toLowerCase().includes(i)||g.desc&&g.desc.toLowerCase().includes(i)||b&&b.includes(i)||x.some(q=>q.includes(i))||g.category&&g.category.toLowerCase().includes(i)||g.sub&&g.sub.toLowerCase().includes(i),I=!c||g.category===c,L=!d||g.sub===d,B=!u||$e(g.status)===u;return v&&I&&L&&B}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(nl).join(""):Pa(f);const y=document.getElementById("equipment-list-count");if(y){const g=o("equipment.list.countSuffix","عنصر"),b=h(String(m.length)),x=m.length?`${b} ${g}`:`0 ${g}`;y.textContent=x}al(n)}async function pa({showToastOnError:e=!0}={}){Da=!0,cn="",Pe();try{const t=await Je("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ca):[];Tt(n)}catch(t){cn=Jt(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(cn,"error")}finally{Da=!1,Pe()}}function Jt(e,t,n){if(e instanceof Ir){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function rl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=la(t.querySelector("#new-equipment-price")?.value||"0"),i=qn(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=Ss({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await Je("/equipment/",{method:"POST",body:p}),m=ca(f?.data),y=[...Re(),m];Tt(y),Pe(),t.reset();const g=t.querySelector("#new-equipment-status");g&&(g.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=Jt(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function Hr(e){if(!Ct()){hn();return}const t=Re(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await Je(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Tt(a),Pe(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=Jt(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function il(e,t){const n=Re(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Tt(r),Pe();return}const s=Ss({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await Je(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ca(r?.data),c=[...n];c[e]=i,Tt(c),Pe(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=Jt(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Pn(){Pe()}function Or(e){const n=Re()[e];if(!n)return;Pt=e;const a=da(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>$e(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||$e(s.status);document.getElementById("edit-equipment-index").value=e,qs({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:ma(s)||"",barcode:s.barcode||"",status:s.status||c}),Ut(!1),Nt=On(),ua(s),zr(s),It={groupKey:ft(s),barcode:String(s.barcode||""),id:s.id||null},Oc(document.getElementById("editEquipmentModal"))?.show()}function ol(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Bc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Hr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Or(s)}}function cl(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Or(n)}}function ll(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Hr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Vr(){if(!It||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Re(),a=It.id?n.find(d=>String(d.id)===String(It.id)):null,s=It.groupKey,r=s?n.find(d=>ft(d)===s):null,i=a||r;if(!i){Vn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),Pt=c}if(zr(i),!oa){const d=da(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>$e(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||$e(l.status);qs({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:ma(l)||"",barcode:l.barcode||"",status:l.status||f}),Nt=On()}ua(primary)}function dl(){document.getElementById("search-equipment")?.addEventListener("input",Pn),document.getElementById("filter-category")?.addEventListener("change",Pn),document.getElementById("filter-sub")?.addEventListener("change",Pn),document.getElementById("filter-status")?.addEventListener("change",Pn),document.getElementById("add-equipment-form")?.addEventListener("submit",rl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),el().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",ol),t.addEventListener("keydown",cl),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",ll),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Qc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!oa){Nt=On(),Ut(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:qn(document.getElementById("edit-equipment-quantity").value)||1,price:la(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await il(t,n),Nt=On(),Ut(!1),Vr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{dl(),Pe(),pa();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Nt&&qs(Nt),Pt!=null){const a=Re()[Pt];if(a){const r=da(a)[0]||a;ua(r)}}Ut(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Pe(),Ut(oa),Pt!=null){const t=Re()[Pt];if(t){const a=da(t)[0]||t;ua(a)}}});document.addEventListener("equipment:refreshRequested",()=>{pa({showToastOnError:!1})});document.addEventListener(ic.USER_UPDATED,()=>{Pe()});document.addEventListener("equipment:changed",()=>{Vr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{It=null,Vn(),Pt=null,Nt=null,Ut(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!er&&(document.addEventListener(Xt.change,()=>{Mr(),Pe()}),er=!0);function rn(e){return h(String(e??"")).trim().toLowerCase()}function Ie(e=""){return h(String(e)).trim().toLowerCase()}const ul=2;function ml(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(ul):"0.00"}function nr(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?t:1}function En(e={}){const t=e?.desc||e?.description||e?.name||"",n=Ie(t),a=ml(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Bt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=En(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=Ie(i),d=ar(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+nr(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=ar(c),l=nr(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function pl(e={}){return(na(e)||[]).map(n=>({...n,normalizedBarcode:n?.normalizedBarcode??rn(n?.barcode),qty:Number.isFinite(Number(n?.qty))?Number(n.qty):1,price:Number.isFinite(Number(n?.price))?Number(n.price):0}))}function Ur(e={}){const t=e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1,n=Number(t);return Number.isFinite(n)&&n>0?n:1}function fl(e={},t=[]){const n=e.unit_price??e.unitPrice??e.price,a=Number(n);if(Number.isFinite(a)&&a>0)return a;const s=e.total_price??e.totalPrice??e.total,r=Number(s),i=Ur(e);if(Number.isFinite(r)&&r>0&&i>0)return Number((r/i).toFixed(2));if(Array.isArray(t)&&t.length){const c=t.reduce((d,l)=>{const u=Number.isFinite(Number(l.price))?Number(l.price):0,p=Number.isFinite(Number(l.qty))?Number(l.qty):1;return d+u*p},0);if(c>0&&i>0)return Number((c/i).toFixed(2))}return 0}function Es(e={}){const t=Array.isArray(e?.items)?e.items:[],n=Bt(t),a=new Map,s=(p,f=0)=>{if(!p||typeof p!="object")return;const y=Vt(p?.package_code??p?.packageId??p?.package_id??p?.code??p?.id??p?.barcode??`pkg-${f}`)||`pkg-${f}`;a.has(y)||a.set(y,{source:p,normalizedId:y,index:f})};Array.isArray(e?.packages)&&e.packages.forEach((p,f)=>s(p,f)),t.forEach((p,f)=>{p&&typeof p=="object"&&(p.type==="package"||Array.isArray(p?.packageItems))&&s(p,f+a.size)});const r=[],i=new Set,c=new Set;a.forEach(({source:p,normalizedId:f},m)=>{const y=pl(p);y.forEach(B=>{const q=B?.normalizedBarcode??rn(B?.barcode);q&&i.add(q);const w=B?.equipmentId??B?.equipment_id??null;w!=null&&c.add(String(w))});const g=Ur(p),b=fl(p,y),x=p?.total??p?.total_price??p?.totalPrice??b*g,v=Number.isFinite(Number(x))?Number(Number(x).toFixed(2)):Number((b*g).toFixed(2)),I=p?.package_code??p?.packageId??p?.package_id??p?.barcode??null;if(I){const B=rn(I);B&&i.add(B)}const L=y.map(B=>h(String(B?.barcode??B?.normalizedBarcode??""))).filter(Boolean);r.push({key:`package::${m}`,description:p?.name||p?.package_name||p?.title||h(String(I??m)),normalizedDescription:h(String(p?.name||p?.package_name||"")),unitPrice:b,totalPrice:v,quantity:g,count:g,image:y.find(B=>B?.image)?.image??null,barcodes:L,barcode:I,items:[{type:"package",packageItems:y,packageId:f,desc:p?.name||p?.package_name||"",price:b,qty:g,barcode:I}],type:"package",packageItems:y,packageId:f})});const d=new Set(Array.from(i).map(p=>rn(p)).filter(Boolean)),l=n.filter(p=>!(p.items.some(y=>y?.type==="package")&&r.length>0||p.items.every(y=>{const g=bt(y),b=g!=null?String(g):null;if(b&&c.has(b))return!0;const x=y?.barcode?rn(y.barcode):null;return!!(x&&d.has(x))})));return{groups:r.length?[...r,...l]:n,packageGroups:r,groupedItems:n,filteredGroupedItems:l,packagesMap:a}}function bt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function ar(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function xs(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function yl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function ht(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?yl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Kr="projects:create:draft",Qr="projects.html#projects-section";let Ma=null,Gr=[],za=new Map,Ha=new Map,Un=new Map,Na=!1,Ln=null,sr=!1,Wr=[];function gl(e){if(!e)return null;let t=Wr.find(a=>a.id===e)||null;if(t)return t;const n=uc(e);return n?(t={id:e,name:pc(n)||e,price:mc(n),items:na(n),raw:n},t):null}function Kn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Qn(e){return h(String(e||"")).trim().toLowerCase()}function bl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function Xr(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function Jr(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function Yr(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Zr(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function jt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function ws(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Ft(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Be(){const{input:e,hidden:t}=Ft();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function xt(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function ei(e,t,{allowPartial:n=!1}={}){const a=Ie(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Oa(e,t={}){return ei(za,e,t)}function Va(e,t={}){return ei(Ha,e,t)}function Fe(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function ti(e){Gr=Array.isArray(e)?[...e]:[]}function Is(){return Gr}function As(e){return e&&Is().find(t=>String(t.id)===String(e))||null}function rr(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Kt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??ct,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:ct}function He(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??ct,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=ct),t.dataset.companyShare=String(s),t.checked=!0}function Ua(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(Na){ce();return}Na=!0;const a=()=>{Na=!1,ce()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),He()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?He():n.checked&&(n.checked=!1));a()}function hl(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function ir(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function or(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function it({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=ws();if(!n||!a||!s)return;const r=ds()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;za=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:or(m)||c})).filter(m=>{if(!m.label)return!1;const y=Ie(m.label);return!y||d.has(y)?!1:(d.add(y),za.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Kn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=or(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Qt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Ft();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Is()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(g=>g&&g.id!=null).sort((g,b)=>String(b.createdAt||b.start||"").localeCompare(String(g.createdAt||g.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Ha=new Map;const f=d.map(g=>{const b=rr(g)||u;return{id:String(g.id),label:b}}).filter(g=>{if(!g.label)return!1;const b=Ie(g.label);return!b||p.has(b)?!1:(p.add(b),Ha.set(b,g),!0)});r.innerHTML=f.map(g=>`<option value="${Kn(g.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(g=>String(g.id)===m):null;if(y){const g=rr(y)||u;s.value=String(y.id),a.value=g,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Gn(e,t,n){const{date:a,time:s}=_r(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function ni(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Qt({selectedValue:a});const r=(ds()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";it(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=ir(e,"start"),d=ir(e,"end");c&&Gn("res-start","res-start-time",c),d&&Gn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),ce(),yt()}function ai({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:de(),s=Array.isArray(a)?a:[];ti(s);const r=t!=null?String(t):n.value?String(n.value):"";Qt({selectedValue:r,projectsList:s}),yt(),ce()}function yt(){const{input:e,hidden:t}=Ft(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(xt(n,Be),a&&xt(a,Be)),s&&xt(s,Be),r&&xt(r,Be),i&&xt(i,Be),c&&xt(c,Be),d&&xt(d,Be),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",Fe(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Ua("tax"),ce()}function ks(){const{input:e,hidden:t}=Ft();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Va(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=As(r.id);i?ni(i,{skipProjectSelectUpdate:!0}):(yt(),ce())}else t.value="",e.dataset.selectedId="",yt(),ce()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Va(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function _s(){const{input:e,hidden:t}=ws();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Oa(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),ce()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Oa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function vl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){ln({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),ln({clearValue:!1}),!n)return;n.fromProjectForm&&(Ln={draftStorageKey:n.draftStorageKey||Kr,returnUrl:n.returnUrl||Qr});const r=document.getElementById("res-project");if(n.projectId){r&&(Qt({selectedValue:String(n.projectId)}),yt());const l=As(n.projectId);l?ni(l,{forceNotes:!!n.forceNotes}):ce(),ln()}else{r&&Qt({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Cl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Gn("res-start","res-start-time",n.start),n.end&&Gn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(ds()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(it({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(it({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):it({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),ce()}function Dt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:pn(e,n),end:pn(t,a)}}function si(e){const t=Qn(e);if(t){const c=Un.get(t);if(c)return c}const{description:n,barcode:a}=Xr(e);if(a){const c=ia(a);if(c)return c}const s=Ie(n||e);if(!s)return null;let r=Tr();if(!r?.length){const c=de();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&jr(r)}const i=r.find(c=>Ie(c?.desc||c?.description||"")===s);return i||r.find(c=>Ie(c?.desc||c?.description||"").includes(s))||null}function ri(e,t="equipment-description-options"){const n=Qn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Qn(d.value)===n)||Un.has(n))return!0;const{description:s}=Xr(e);if(!s)return!1;const r=Ie(s);return r?(Tr()||[]).some(c=>Ie(c?.desc||c?.description||"")===r):!1}const ql={available:0,reserved:1,maintenance:2,retired:3};function Sl(e){return ql[e]??5}function cr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function El(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${cr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${cr(n)})`}function gt(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=Sn(),a=de(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];jr(r);const i=new Map;r.forEach(l=>{const u=bl(l),p=Qn(u);if(!p||!u)return;const f=lt(l),m=Sl(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Un=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Un.set(l.normalized,l.bestItem);const u=El(l),p=Kn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Kn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function ii(e,t,n={}){const{silent:a=!1}=n,s=Z(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=Dt();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(y),{success:!1,message:y}}const c=Ze();if($s(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(y),{success:!1,message:y}}const l=us(s,r,i);if(l.length){const y=l.map(b=>b.name).join(", "),g=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||E(g),{success:!1,message:g}}if(Ye(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(y),{success:!1,message:y}}const u=ia(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(y),{success:!1,message:y}}const p=lt(u);if(p==="maintenance"||p==="retired"){const y=jt(p);return a||E(y),{success:!1,message:y}}const f=bt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(y),{success:!1,message:y}}aa({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Lt(u)}),t&&(t.value=""),dt(),ce();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function Ka(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=si(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=zc(n.barcode),s=lt(a||n);if(s==="maintenance"||s==="retired"){E(jt(s));return}const r=Z(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=bt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Lt(n)},{start:d,end:l}=Dt();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=Ze();if($s(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=us(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Ye(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}aa(c),dt(),ce(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function xl(){gt();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ka(e))});const t=()=>{ri(e.value,"equipment-description-options")&&Ka(e)};e.addEventListener("focus",()=>{if(gt(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function lr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function $s(e=Ze()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=Z(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=Z(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function wl(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=Dt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Cc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(Xt.change,t=>{lr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),lr(e,Rr()))}function Il(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=Z(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=ii(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(f)}else c&&E(c)}function oi(){wl(),!(sr||typeof document>"u")&&(document.addEventListener(Xt.requestAdd,Il),sr=!0)}function xn(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Qa(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=xn();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),vc(t),t==="package"&&fa()}function fa(){const{packageSelect:e,packageHint:t}=xn();if(!e)return;const n=kr();Wr=n,lc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),di()}function Al(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function ci(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Vt(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=gl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Vt(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(dc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:na(i.raw??{}),d=$s(t),l=[],u=new Set;if(c.forEach(m=>{const y=Z(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:g})=>g?.desc||g?.description||g?.name||g?.barcode||g?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(g=>h(String(g))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(g=>g.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=Z(m?.normalizedBarcode??m?.barcode);if(y&&Ye(y,n,a,s)){const g=us(y,n,a,s);p.push({item:m,blockingPackages:g})}}),p.length?{success:!1,reason:"item_conflict",message:Al(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:Z(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function li(e,{silent:t=!1}={}){const n=Vt(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=Dt(),r=Ze(),i=ci(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return aa(i.package),dt(),ce(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function di(){const{packageSelect:e}=xn();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;li(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function kl(){const{packageAddButton:e,packageSelect:t}=xn();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}li(n)}),e.dataset.listenerAttached="true")}function ui(){const{modeRadios:e}=xn();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Qa(s.target.value)}),a.dataset.listenerAttached="true")}),kl(),di();const t=Rn(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Qa(t)}function dt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=Ze(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Bt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Lt(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),g=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,b=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):g*u.count,x=`${h(g.toFixed(2))} ${s}`,v=`${h(b.toFixed(2))} ${s}`,I=u.items.some(w=>w?.type==="package"),L=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),B=L.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${L.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(I){const w=new Map;if(u.items.forEach(A=>{Array.isArray(A?.packageItems)&&A.packageItems.forEach($=>{if(!$)return;const N=Z($.barcode||$.desc||Math.random()),P=w.get(N);if(P){P.qty+=Number.isFinite(Number($.qty))?Number($.qty):1;return}w.set(N,{desc:$.desc||$.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number($.qty))?Number($.qty):1,barcode:$.barcode??$.normalizedBarcode??""})})}),w.size){const A=Array.from(w.values()).map($=>{const N=h(String($.qty)),P=$.desc||h(String($.barcode||"")),T=$.barcode?` <span class="reservation-package-items__barcode">(${h(String($.barcode))})</span>`:"";return`<li>${P}${T} × ${N}</li>`}).join("");q=`
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
                ${I?`${q||""}${B||""}`:B}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${I?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${I?"disabled":""}>+</button>
            </div>
          </td>
          <td>${x}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function _l(e){const t=Ze(),a=Bt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(yc(s),dt(),ce())}function $l(e){const t=Ze(),n=t.filter(a=>En(a)!==e);n.length!==t.length&&($r(n),dt(),ce())}function Pl(e){const t=Ze(),a=Bt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=Dt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>Z(p.barcode))),{equipment:c=[]}=de(),d=(c||[]).find(p=>{const f=Z(p?.barcode);return!f||i.has(f)||En({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!bs(p)?!1:!Ye(f,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=Z(d.barcode),u=bt(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}aa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Lt(d)}),dt(),ce()}function ce(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=Dt();i&&He();const p=Kt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=Jr(f),g=Yr(m);Ys({selectedItems:Ze(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:g,start:l,end:u,companySharePercent:p,paymentHistory:[]});const b=Ys.lastResult;b?(Zr(m,b.paymentProgressValue),c&&(c.value=b.paymentStatus,Fe(c,b.paymentStatus))):Fe(c,d)}function Nl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),ce()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",ce),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Be()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ua("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Be()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Ua("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Be()){s.value="unpaid",Fe(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Fe(s),ce()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Be()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",ce()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Be()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),ce()}),i.dataset.listenerAttached="true"),ce()}function Tl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){ce();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),ce()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function dr(){const{input:e,hidden:t}=ws(),{input:n,hidden:a}=Ft(),{customers:s}=de();let r=t?.value?String(t.value):"";if(!r&&e?.value){const J=Oa(e.value,{allowPartial:!0});J&&(r=String(J.id),t&&(t.value=r),e.value=J.label,e.dataset.selectedId=r)}const i=s.find(J=>String(J.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const J=Va(n.value,{allowPartial:!0});J&&(d=String(J.id),a&&(a.value=d),n.value=J.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,g=new Date(m),b=new Date(y);if(Number.isNaN(g.getTime())||Number.isNaN(b.getTime())||g>=b){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const x=gc(),v=Ze();if(v.length===0&&x.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const I=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,B=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),w=q?.value||"unpaid",A=document.getElementById("res-payment-progress-type"),$=document.getElementById("res-payment-progress-value"),N=Jr(A),P=Yr($),T=d?As(d):null,H=hl(T);if(d&&!T){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const J of v){const re=lt(J.barcode);if(re==="maintenance"||re==="retired"){E(jt(re));return}}for(const J of v){const re=Z(J.barcode);if(Ye(re,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const J of x)if(Pr(J,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const F=document.getElementById("res-tax"),O=document.getElementById("res-company-share"),k=!!d;k?(F&&(F.checked=!1,F.disabled=!0,F.classList.add("disabled"),F.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),O&&(O.checked=!1,O.disabled=!0,O.classList.add("disabled"),O.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,Fe(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),A&&(A.disabled=!0,A.classList.add("disabled")),$&&($.value="",$.disabled=!0,$.classList.add("disabled"))):(F&&(F.disabled=!1,F.classList.remove("disabled"),F.title=""),O&&(O.disabled=!1,O.classList.remove("disabled"),O.title=""),q&&(q.disabled=!1,q.title=""),A&&(A.disabled=!1,A.classList.remove("disabled")),$&&($.disabled=!1,$.classList.remove("disabled")));const G=k?!1:F?.checked||!1,K=!!O?.checked;if(!k&&K!==G){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let _=K?Kt():null;K&&(!Number.isFinite(_)||_<=0)&&(He(),_=Kt());const z=K&&G&&Number.isFinite(_)&&_>0;G&&He();const D=ms(v,L,B,G,x,{start:m,end:y,companySharePercent:z?_:0}),R=oc(),V=ps({totalAmount:D,progressType:N,progressValue:P,history:[]});$&&Zr($,V.paymentProgressValue);const te=[];V.paymentProgressValue!=null&&V.paymentProgressValue>0&&te.push({type:V.paymentProgressType||N,value:V.paymentProgressValue,amount:V.paidAmount,percentage:V.paidPercent,recordedAt:new Date().toISOString()});const se=fs({manualStatus:w,paidAmount:V.paidAmount,paidPercent:V.paidPercent,totalAmount:D});q&&(q.value=se,Fe(q,se));const le=Nr({reservationCode:R,customerId:c,start:m,end:y,status:H?"confirmed":"pending",title:null,location:null,notes:I,projectId:d||null,totalAmount:D,discount:k?0:L,discountType:k?"percent":B,applyTax:G,paidStatus:k?"unpaid":se,confirmed:H,items:v.map(J=>({...J,equipmentId:J.equipmentId??J.id})),technicians:x,companySharePercent:k||!z?null:_,companyShareEnabled:k?!1:z,paidAmount:k?0:V.paidAmount,paidPercentage:k?0:V.paidPercent,paymentProgressType:k?null:V.paymentProgressType,paymentProgressValue:k?null:V.paymentProgressValue,paymentHistory:k?[]:te});try{const J=await bc(le);Sn(),gt(),vn(),Ll(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ma=="function"&&Ma({type:"created",reservation:J}),jl(J)}catch(J){console.error("❌ [reservations/createForm] Failed to create reservation",J);const re=sa(J)?J.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),k&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),ln({clearValue:!1}))}}function jl(e){if(!Ln)return;const{draftStorageKey:t=Kr,returnUrl:n=Qr}=Ln,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Ln=null,n&&(window.location.href=n)}function ln({clearValue:e=!1}={}){const{input:t,hidden:n}=Ft();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,yt())}function Cl(e,t=""){const{input:n,hidden:a}=Ft();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),yt())}function Ll(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),it({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),ln({clearValue:!1}),Qt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",Fe(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),hc(),$r([]),zn("form-reset"),dt(),yt(),ce()}function Bl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){_l(s);return}if(a==="increase-group"&&s){Pl(s);return}if(a==="remove-group"&&s){$l(s);return}}),e.dataset.listenerAttached="true")}function Fl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(Rn()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,ii(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||Rn()!=="single")return;const{start:r,end:i}=Dt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Dl(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await dr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await dr()}),t.dataset.listenerAttached="true")}function Zu({onAfterSubmit:e}={}){Ma=typeof e=="function"?e:null;const{customers:t,projects:n}=de();fc(t||[]),it(),_s(),ti(n||[]),ai({projectsList:n}),ks(),gt(),fa(),xl(),oi(),ui(),Tl(),Nl(),Bl(),Fl(),Dl(),vl(),ce(),dt()}function mi(){gt(),fa(),ai(),it(),_s(),ks(),oi(),ui(),dt(),ce()}if(typeof document<"u"){const e=()=>{it(),Qt({projectsList:Is()}),_s(),ks(),ce()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{gt()}),document.addEventListener("packages:changed",()=>{fa(),Rn()==="package"&&Qa("package")})}typeof window<"u"&&(window.getCompanySharePercent=Kt);function pi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:wt(t),endDate:wt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:wt(n),endDate:wt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:wt(n),endDate:wt(a)}}return e==="upcoming"?{startDate:wt(t),endDate:""}:{startDate:"",endDate:""}}function Rl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Wn(t),Wn(n),r="",i=""),!r&&!i&&c){const l=pi(c);r=l.startDate,i=l.endDate}return{searchTerm:Ie(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function em(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Ml(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Wn(a),Wn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Ml(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=pi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function wt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Wn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Nn(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function zl(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Hl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=zl(n);if(a!==null)return a}return null}function ur(e,t=0){const n=Hl(e);if(n!=null)return n;const a=Nn(e.createdAt??e.created_at);if(a!=null)return a;const s=Nn(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Nn(e.start);if(r!=null)return r;const i=Nn(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ol({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,I)=>({reservation:v,index:I})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,g=u?new Date(`${u}T00:00:00`):null,b=p?new Date(`${p}T23:59:59`):null,x=r.filter(({reservation:v})=>{const I=n.get(String(v.customerId)),L=s?.get?.(String(v.projectId)),B=v.start?new Date(v.start):null,q=xs(v),{effectiveConfirmed:w}=ht(v,L);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(T=>String(T)):[]).includes(String(y))||f==="confirmed"&&!w||f==="pending"&&w||f==="completed"&&!q||g&&B&&B<g||b&&B&&B>b)return!1;if(c){const P=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],T=Ie(P.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),H=c.replace(/\s+/g,"");if(!T.includes(H))return!1}if(d&&!Ie(I?.customerName||"").includes(d))return!1;if(l){const P=[v.projectId,v.project_id,v.projectID,L?.id,L?.projectCode,L?.project_code],T=Ie(P.filter(F=>F!=null&&F!=="").map(String).join(" ")).replace(/\s+/g,""),H=l.replace(/\s+/g,"");if(!T.includes(H))return!1}if(!i)return!0;const A=v.items?.map?.(P=>`${P.barcode} ${P.desc}`).join(" ")||"",$=(v.technicians||[]).map(P=>a.get(String(P))?.name).filter(Boolean).join(" ");return Ie([v.reservationId,I?.customerName,v.notes,A,$,L?.title].filter(Boolean).join(" ")).includes(i)});return x.sort((v,I)=>{const L=ur(v.reservation,v.index),B=ur(I.reservation,I.index);return L!==B?B-L:I.index-v.index}),x}function Vl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),g=o("reservations.list.actions.confirm","✔️ تأكيد"),b=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),x=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:I,index:L})=>{const B=t.get(String(I.customerId)),q=I.projectId?a?.get?.(String(I.projectId)):null,w=xs(I),A=I.paidStatus??I.paid_status??(I.paid===!0||I.paid==="paid"?"paid":"unpaid"),$=A==="paid",N=A==="partial",{effectiveConfirmed:P,projectLinked:T}=ht(I,q),H=P?"status-confirmed":"status-pending",F=$?"status-paid":N?"status-partial":"status-unpaid";let O=`<span class="reservation-chip status-chip ${H}">${P?u:p}</span>`;const k=$?f:N?y:m;let G=`<span class="reservation-chip status-chip ${F}">${k}</span>`,K=$?" tile-paid":N?" tile-partial":" tile-unpaid";w&&(K+=" tile-completed");let _="";w&&(O=`<span class="reservation-chip status-chip status-completed">${u}</span>`,G=`<span class="reservation-chip status-chip status-completed">${k}</span>`,_=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const z=!T&&!P?`<button class="tile-confirm" data-reservation-index="${L}" data-action="confirm">${g}</button>`:"",D=z?`<div class="tile-actions">${z}</div>`:"",R=I.items?.length||0,V=(I.technicians||[]).map(me=>n.get(String(me))).filter(Boolean),te=V.map(me=>me.name).join(l)||"—",se=h(String(I.reservationId??"")),le=I.start?h(De(I.start)):"-",J=I.end?h(De(I.end)):"-",re=h(String(I.cost??0)),ge=h(String(R)),be=I.notes?h(I.notes):c,xe=d.replace("{count}",ge),U=I.applyTax?`<small>${r}</small>`:"";let Y=b;return I.projectId&&(Y=q?.title?h(q.title):x),`
      <div class="${z?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${_} data-reservation-index="${L}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${se}</div>
          <div class="tile-badges">
            ${O}
            ${G}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${B?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Y}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${le}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${J}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${xe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${V.length?te:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${be}</span>
          </div>
        </div>
        ${D}
      </div>
    `}).join("")}function je(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ul(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=ht(e,s),c=e.paid===!0||e.paid==="paid",d=xs(e);e.items;const{groups:l,groupedItems:u}=Es(e),{technicians:p=[]}=de(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(M=>{if(!M||M.id==null)return;const ee=String(M.id),fe=m.get(ee)||{};m.set(ee,{...fe,...M})});const y=(e.technicians||[]).map(M=>m.get(String(M))).filter(Boolean),g=Ct(),b=ra(e.start,e.end),x=(M={})=>{const ee=[M.dailyWage,M.daily_rate,M.dailyRate,M.wage,M.rate];for(const fe of ee){if(fe==null)continue;const ke=parseFloat(h(String(fe)));if(Number.isFinite(ke))return ke}return 0},v=(M={})=>{const ee=[M.dailyTotal,M.daily_total,M.totalRate,M.total,M.total_wage];for(const fe of ee){if(fe==null)continue;const ke=parseFloat(h(String(fe)));if(Number.isFinite(ke))return ke}return x(M)},L=l.reduce((M,ee)=>{const fe=Number(ee?.count??ee?.quantity??1)||1,ke=Number(ee?.unitPrice);let Te=Number.isFinite(ke)?ke:0;if(!Te||Te<=0){const Ke=Number(ee?.totalPrice);Number.isFinite(Ke)&&fe>0&&(Te=Number((Ke/fe).toFixed(2)))}return Number.isFinite(Te)||(Te=0),M+Te*fe},0)*b,B=y.reduce((M,ee)=>M+x(ee),0),q=y.reduce((M,ee)=>M+v(ee),0),w=B*b,A=q*b,$=L+A,N=parseFloat(e.discount)||0,P=e.discountType==="amount"?N:$*(N/100),T=Math.max(0,$-P),H=r?!1:e.applyTax,F=Number(e.cost),O=Number.isFinite(F),k=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,G=k!=null?parseFloat(h(String(k))):NaN;let z=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(G)&&G>0)&&Number.isFinite(G)?G:0;H&&z<=0&&(z=ct);let D=z>0?Math.max(0,T*(z/100)):0;const R=T+D,V=H?R*.15:0,te=Number.isFinite(V)&&V>0?Number(V.toFixed(2)):0,se=R+te,le=Number.isFinite(se)?Number(se.toFixed(2)):0,J=r?le:O?F:le;z>0&&(D=Number(Math.max(0,T*(z/100)).toFixed(2)));const re=h(String(e.reservationId??e.id??"")),ge=e.start?h(De(e.start)):"-",be=e.end?h(De(e.end)):"-",xe=h(String(y.length)),U=h(L.toFixed(2)),Y=h(P.toFixed(2)),ae=h(T.toFixed(2)),me=h(te.toFixed(2)),Ne=h((Number.isFinite(J)?J:0).toFixed(2)),Oe=h(String(b)),Q=o("reservations.create.summary.currency","SR"),ye=o("reservations.details.labels.discount","الخصم"),C=o("reservations.details.labels.tax","الضريبة (15%)"),ne=o("reservations.details.labels.crewTotal","إجمالي الفريق"),ue=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),oe=o("reservations.details.labels.duration","عدد الأيام"),pe=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Le=o("reservations.details.labels.netProfit","💵 صافي الربح"),Ae=o("reservations.create.equipment.imageAlt","صورة"),ve={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Ve=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Mt=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),Zt=o("reservations.details.technicians.roleUnknown","غير محدد"),zt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),W=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),qe=o("reservations.list.status.confirmed","✅ مؤكد"),Ue=o("reservations.list.status.pending","⏳ غير مؤكد"),tt=o("reservations.list.payment.paid","💳 مدفوع"),In=o("reservations.list.payment.unpaid","💳 غير مدفوع"),Ea=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),xa=o("reservations.list.status.completed","📁 منتهي"),wa=o("reservations.details.labels.id","🆔 رقم الحجز"),Ia=o("reservations.details.section.bookingInfo","بيانات الحجز"),nt=o("reservations.details.section.paymentSummary","ملخص الدفع"),fo=o("reservations.details.labels.finalTotal","المجموع النهائي"),yo=o("reservations.details.section.crew","😎 الفريق الفني"),go=o("reservations.details.crew.count","{count} عضو"),bo=o("reservations.details.section.items","📦 المعدات المرتبطة"),ho=o("reservations.details.items.count","{count} عنصر"),vo=o("reservations.details.actions.edit","✏️ تعديل"),qo=o("reservations.details.actions.delete","🗑️ حذف"),So=o("reservations.details.labels.customer","العميل"),Eo=o("reservations.details.labels.contact","رقم التواصل"),xo=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const wo=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),Io=o("reservations.details.actions.openProject","📁 فتح المشروع"),Ao=o("reservations.details.labels.start","بداية الحجز"),ko=o("reservations.details.labels.end","نهاية الحجز"),_o=o("reservations.details.labels.notes","ملاحظات"),$o=o("reservations.list.noNotes","لا توجد ملاحظات"),Po=o("reservations.details.labels.itemsCount","عدد المعدات"),No=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),To=o("reservations.paymentHistory.title","سجل الدفعات"),jo=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Co=o("reservations.list.unknownCustomer","غير معروف"),Aa=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Os=Aa==="partial",Lo=Aa==="paid"?tt:Os?Ea:In,Bo=u.reduce((M,ee)=>M+(Number(ee.quantity)||0),0),Fo=h(String(Bo)),Vs=ho.replace("{count}",Fo),Do=go.replace("{count}",xe),Ro=e.notes?h(e.notes):$o,Mo=h(A.toFixed(2)),zo=h(String(z)),Ho=h(D.toFixed(2)),Oo=`${zo}% (${Ho} ${Q})`,Vo=Math.max(0,L+A-P),Us=Math.max(0,Vo-w),Uo=h(Us.toFixed(2)),ut=[{icon:"💼",label:No,value:`${U} ${Q}`}];ut.push({icon:"😎",label:ne,value:`${Mo} ${Q}`}),P>0&&ut.push({icon:"💸",label:ye,value:`${Y} ${Q}`}),ut.push({icon:"📊",label:ue,value:`${ae} ${Q}`}),H&&te>0&&ut.push({icon:"🧾",label:C,value:`${me} ${Q}`}),z>0&&ut.push({icon:"🏦",label:pe,value:Oo}),Math.abs(Us-(J??0))>.009&&ut.push({icon:"💵",label:Le,value:`${Uo} ${Q}`}),ut.push({icon:"💰",label:fo,value:`${Ne} ${Q}`});const Ko=ut.map(({icon:M,label:ee,value:fe})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${M} ${ee}</span>
      <span class="summary-details-value">${fe}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let en=[];Array.isArray(e.paymentHistory)?en=e.paymentHistory:Array.isArray(e.payment_history)&&(en=e.payment_history);const Qo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Ks=Array.isArray(en)&&en.length>0?en:Qo,Go=Ks.length?`<ul class="reservation-payment-history-list">${Ks.map(M=>{const ee=M?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):M?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),fe=Number.isFinite(Number(M?.amount))&&Number(M.amount)>0?`${h(Number(M.amount).toFixed(2))} ${Q}`:"—",ke=Number.isFinite(Number(M?.percentage))&&Number(M.percentage)>0?`${h(Number(M.percentage).toFixed(2))}%`:"—",Te=M?.recordedAt?h(De(M.recordedAt)):"—",Ke=M?.note?`<div class="payment-history-note">${je(h(M.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${je(ee)}</span>
              <span class="payment-history-entry__amount">${fe}</span>
              <span class="payment-history-entry__percent">${ke}</span>
              <span class="payment-history-entry__date">${Te}</span>
            </div>
            ${Ke}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${je(jo)}</div>`,Qs=[{text:i?qe:Ue,className:i?"status-confirmed":"status-pending"},{text:Lo,className:Aa==="paid"?"status-paid":Os?"status-partial":"status-unpaid"}];d&&Qs.push({text:xa,className:"status-completed"});const Wo=Qs.map(({text:M,className:ee})=>`<span class="status-chip ${ee}">${M}</span>`).join(""),Et=(M,ee,fe)=>`
    <div class="res-info-row">
      <span class="label">${M} ${ee}</span>
      <span class="value">${fe}</span>
    </div>
  `;let ka="";if(e.projectId){let M=je(wo);if(s){const ee=s.title||o("projects.fallback.untitled","مشروع بدون اسم");M=`${je(ee)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${je(Io)}</button>`}ka=`
      <div class="res-info-row">
        <span class="label">📁 ${xo}</span>
        <span class="value">${M}</span>
      </div>
    `}const at=[];at.push(Et("👤",So,t?.customerName||Co)),at.push(Et("📞",Eo,t?.phone||"—")),at.push(Et("🗓️",Ao,ge)),at.push(Et("🗓️",ko,be)),at.push(Et("📦",Po,Vs)),at.push(Et("⏱️",oe,Oe)),at.push(Et("📝",_o,Ro)),ka&&at.push(ka);const Xo=at.join(""),Jo=l.length?l.map(M=>{const ee=M.items[0]||{},fe=Lt(ee)||M.image,ke=fe?`<img src="${fe}" alt="${Ae}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',Te=M.items.some(Qe=>Qe?.type==="package"),Ke=Number(M.quantity)||Number(M.count)||0,tc=h(String(Ke)),Gs=Number.isFinite(Number(M.unitPrice))?Number(M.unitPrice):0,nc=Number.isFinite(Number(M.totalPrice))?Number(M.totalPrice):Gs*Ke,ac=`${h(Gs.toFixed(2))} ${Q}`,sc=`${h(nc.toFixed(2))} ${Q}`,Ws=M.barcodes.map(Qe=>h(String(Qe||""))).filter(Boolean),Xs=Ws.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Ws.map(Qe=>`<li>${Qe}</li>`).join("")}
              </ul>
            </details>`:"";let Js="";if(Te){const Qe=new Map;if(M.items.forEach(An=>{Array.isArray(An?.packageItems)&&An.packageItems.forEach(we=>{if(!we)return;const kn=normalizeBarcodeValue(we.barcode||we.normalizedBarcode||we.desc||Math.random()),_n=Qe.get(kn),$n=Number.isFinite(Number(we.qty))?Number(we.qty):1;if(_n){_n.qty+=$n;return}Qe.set(kn,{desc:we.desc||we.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:$n,barcode:we.barcode??we.normalizedBarcode??""})})}),Qe.size){const An=Array.from(Qe.values()).map(we=>{const kn=h(String(we.qty)),_n=je(we.desc||""),$n=we.barcode?` <span class="reservation-package-items__barcode">(${je(h(String(we.barcode)))})</span>`:"";return`<li>${_n}${$n} × ${kn}</li>`}).join("");Js=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${An}
                </ul>
              </details>
            `}}const rc=Te?`${Js||""}${Xs||""}`:Xs;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ke}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${je(ee.desc||ee.description||ee.name||M.description||"-")}</div>
                  ${rc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${je(ve.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${tc}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${je(ve.unitPrice)}">${ac}</td>
            <td class="reservation-modal-items-table__cell" data-label="${je(ve.total)}">${sc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${je(ve.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Ve}</td></tr>`,Yo=`
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
        <tbody>${Jo}</tbody>
      </table>
    </div>
  `,Zo=y.map((M,ee)=>{const fe=h(String(ee+1)),ke=M.role||Zt,Te=M.phone||zt,Ke=M.wage?W.replace("{amount}",h(String(M.wage))).replace("{currency}",Q):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${fe}</span>
          <span class="technician-name">${M.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${ke}</div>
          <div>📞 ${Te}</div>
          ${Ke?`<div>💰 ${Ke}</div>`:""}
        </div>
      </div>
    `}).join(""),ec=y.length?`<div class="reservation-technicians-grid">${Zo}</div>`:`<ul class="reservation-modal-technicians"><li>${Mt}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${wa}</span>
          <strong>${re}</strong>
        </div>
        <div class="status-chips">
          ${Wo}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Ia}</h6>
          ${Xo}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${nt}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Ko}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${To}</h6>
              ${Go}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${yo}</span>
          <span class="count">${Do}</span>
        </div>
        ${ec}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${bo}</span>
          <span class="count">${Vs}</span>
        </div>
        ${Yo}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${vo}</button>
        ${g?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${qo}</button>`:""}
      </div>
    </div>
  `}const tm="project",nm="editProject",am=3600*1e3,fi=.15,sm=6,rm="projectsTab",im="projectsSubTab",om={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},cm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},lm={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Kl=`@page {
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
`,Ql=/color\([^)]*\)/gi,fn=/(color\(|color-mix\(|oklab|oklch)/i,Gl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Wl=typeof document<"u"?document.createElement("canvas"):null,Tn=Wl?.getContext?.("2d")||null;function yi(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Ga(e,t="#000"){if(!Tn||!e)return t;try{return Tn.fillStyle="#000",Tn.fillStyle=e,Tn.fillStyle||t}catch{return t}}function Xl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&fn.test(n)){const s=Ga(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Ht(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function dm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function gi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Gl.forEach(c=>{const d=r[c];if(d&&fn.test(d)){const l=yi(c);Ht(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Ga(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&fn.test(i)){const c=Ga(r.backgroundColor||"#ffffff","#ffffff");Ht(n,s,"background-image"),Ht(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function bi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&fn.test(d)){const l=yi(c);Ht(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&fn.test(i)&&(Ht(n,s,"background-image"),Ht(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function hi(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Ql,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const vi="reservations.quote.sequence",mr={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},qi="https://help.artratio.sa/guide/quote-preview",Ee={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Jl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Ce=[...Jl],Yl=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function Wa(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Ce]}function Zl(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=Wa(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=Wa(t.value);if(a.length)return a}const n=Ce.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Ce]}const ed=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Si=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>{if(!e)return"-";const t=[];return e.barcode&&t.push(e.barcode),Array.isArray(e.barcodes)&&e.barcodes.filter(Boolean).forEach(n=>{t.includes(n)||t.push(n)}),Array.isArray(e.packageItems)&&e.packageItems.forEach(n=>{n?.barcode&&!t.includes(n.barcode)&&t.push(n.barcode)}),t.length?t.map(n=>`<span class="quote-item-code">${S(String(n))}</span>`).join("<br>"):"-"}},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>{const t=S(e?.desc||e?.description||"-");if(!Array.isArray(e?.packageItems)||e.packageItems.length===0)return t;const n=e.packageItems.map(a=>{const s=S(a?.desc||a?.name||a?.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم")),r=h(String(a?.qty??1)),i=a?.barcode?` <span class="quote-package-barcode">(${S(a.barcode)})</span>`:"";return`<li>${s}${i} × ${r}</li>`}).join("");return`${t}<ul class="quote-package-items">${n}</ul>`}},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>S(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>S(h(Number(e?.price||0).toFixed(2)))}],Ei=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>S(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>S(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>S(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],Xa={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Si.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Ei.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},xi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>S(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>S(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>S(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],wi=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>S(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>S(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>S(e?.note||"-")}],Ii=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>S(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>S(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>S(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>S(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>S(e?.displayCost||"—")}],td=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],nd={customerInfo:Xa.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:Xa.payment,projectExpenses:wi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:xi.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:Ii.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Ta=new Map;function ya(e="reservation"){if(Ta.has(e))return Ta.get(e);const t=e==="project"?td:ed,n=e==="project"?nd:Xa,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Ta.set(e,r),r}function ga(e="reservation"){return ya(e).sectionDefs}function Ai(e="reservation"){return ya(e).fieldDefs}function ki(e="reservation"){return ya(e).sectionIdSet}function _i(e="reservation"){return ya(e).fieldIdMap}function $i(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const ad="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",sd="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",rd="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Pi=Kl.trim(),Ni=/^data:image\/svg\+xml/i,id=/\.svg($|[?#])/i,on=512,Ja="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Ti=96,ji=25.4,Ya=210,Bn=297,Fn=Math.round(Ya/ji*Ti),Dn=Math.round(Bn/ji*Ti),od=2,Ci=/safari/i,cd=/(iphone|ipad|ipod)/i,pr=/(iphone|ipad|ipod)/i,ld=/(crios|fxios|edgios|opios)/i,Xn="[reservations/pdf]";let X=null,j=null,We=1,nn=null,an=null,pt=null,Ot=null,dn=!1;function $t(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!X?.statusIndicator||!X?.statusText)return;X.statusKind=e;const r=t||$i(e);X.statusText.textContent=r,X.statusSpinner&&(X.statusSpinner.hidden=!s),X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null,n&&typeof a=="function"&&(X.statusAction.textContent=n,X.statusAction.hidden=!1,X.statusAction.onclick=i=>{i.preventDefault(),a()})),X.statusIndicator.hidden=!1,requestAnimationFrame(()=>{X.statusIndicator.classList.add("is-visible")})}function un(e){!X?.statusIndicator||!X?.statusText||(X.statusKind=null,X.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{X?.statusIndicator&&(X.statusIndicator.hidden=!0,X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null),X.statusSpinner&&(X.statusSpinner.hidden=!1))},220))}function Za(){return!!window?.bootstrap?.Modal}function dd(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),pt||(pt=document.createElement("div"),pt.className="modal-backdrop fade show",pt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(pt)),Ot||(Ot=t=>{t.key==="Escape"&&es(e)},document.addEventListener("keydown",Ot));try{e.focus({preventScroll:!0})}catch{}}}function es(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),pt&&(pt.remove(),pt=null),Ot&&(document.removeEventListener("keydown",Ot),Ot=null))}function ud(e){if(e){if(Za()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}dd(e)}}function md(){if(dn)return;dn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!X?.modal?.classList.contains("show"),s=()=>{X?.modal?.classList.contains("show")&&($t("render"),dn=!1,Rt())};Ar({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:qi}),a&&$t("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function ba(e="reservation"){const t={},n=Ai(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ps(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function pd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Ns(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Ts(e="reservation"){return Object.fromEntries(ga(e).map(({id:t})=>[t,!1]))}function js(e,t){return e.sectionExpansions||(e.sectionExpansions=Ts(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function fd(e,t){return js(e,t)?.[t]!==!1}function Cs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function yd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return cd.test(e)}function gd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Ci.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Li(){return yd()&&gd()}function ha(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=pr.test(e)||pr.test(t),s=/Macintosh/i.test(e)&&n>1;return Ci.test(e)&&!ld.test(e)&&(a||s)}function ja(e,...t){try{console.log(`${Xn} ${e}`,...t)}catch{}}function ot(e,...t){try{console.warn(`${Xn} ${e}`,...t)}catch{}}function bd(e,t,...n){try{t?console.error(`${Xn} ${e}`,t,...n):console.error(`${Xn} ${e}`,...n)}catch{}}function he(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function hd(e,t="لا توجد بيانات للعرض."){const n=S(o(e,t));return he(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function Jn(e,t){return Array.isArray(e)&&e.length?e:[hd(t)]}const vd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Bi(e=""){return vd.test(e)}function qd(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Bi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function fr(e,t=on){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function Sd(e){if(!e)return{width:on,height:on};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?fr(t,0):0,s=n?fr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||on,height:s||on}}function Fi(e=""){return typeof e!="string"?!1:Ni.test(e)||id.test(e)}function Ed(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function xd(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Di(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await xd(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function wd(e){if(!e)return null;if(Ni.test(e))return Ed(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function Id(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!Fi(t))return!1;const n=await wd(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",Ja),!1;const a=await Di(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",Ja),!1)}async function Ad(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=Sd(e),s=await Di(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||Ja),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Ri(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{Fi(s.getAttribute?.("src"))&&a.push(Id(s))}),n.forEach(s=>{a.push(Ad(s))}),a.length&&await Promise.allSettled(a)}function kd(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=(_,z=0)=>{const D=parseFloat(_);return Number.isFinite(D)?D:z},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const _=s.lineHeight;if(!_||_==="normal")return p*1.6;const z=r(_,p*1.6);return z>0?z:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),g=e.textContent||"",b=g.split(/\r?\n/),x=n.createElement("canvas"),v=x.getContext("2d");if(!v)return null;const I=s.fontStyle||"normal",L=s.fontVariant||"normal",B=s.fontWeight||"400",q=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",A=_=>_.join(" "),$=[],N=_=>v.measureText(_).width;v.font=`${I} ${L} ${B} ${w} ${p}px ${q}`,b.forEach(_=>{const z=_.trim();if(z.length===0){$.push("");return}const D=z.split(/\s+/);let R=[];D.forEach((V,te)=>{const se=V.trim();if(!se)return;const le=A(R.concat(se));if(N(le)<=y||R.length===0){R.push(se);return}$.push(A(R)),R=[se]}),R.length&&$.push(A(R))}),$.length||$.push("");const P=i+c+$.length*f,T=Math.ceil(Math.max(1,m)*t),H=Math.ceil(Math.max(1,P)*t);x.width=T,x.height=H,x.style.width=`${Math.max(1,m)}px`,x.style.height=`${Math.max(1,P)}px`,v.scale(t,t);const F=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const _=Math.max(1,m),z=Math.max(1,P),D=Math.min(u,_/2,z/2);v.moveTo(D,0),v.lineTo(_-D,0),v.quadraticCurveTo(_,0,_,D),v.lineTo(_,z-D),v.quadraticCurveTo(_,z,_-D,z),v.lineTo(D,z),v.quadraticCurveTo(0,z,0,z-D),v.lineTo(0,D),v.quadraticCurveTo(0,0,D,0),v.closePath(),v.clip()}if(v.fillStyle=F,v.fillRect(0,0,Math.max(1,m),Math.max(1,P)),v.font=`${I} ${L} ${B} ${w} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const O=Math.max(0,m-d);let k=i;$.forEach(_=>{const z=_.length?_:" ";v.fillText(z,O,k,y),k+=f});const G=n.createElement("img");let K;try{K=x.toDataURL("image/png")}catch(_){return ot("note canvas toDataURL failed",_),null}return G.src=K,G.alt=g,G.style.width=`${Math.max(1,m)}px`,G.style.height=`${Math.max(1,P)}px`,G.style.display="block",G.setAttribute("data-quote-note-image","true"),{image:G,canvas:x,totalHeight:P,width:m}}function _d(e,{pixelRatio:t=1}={}){if(!e||!ha())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Bi(a.textContent||""))return;let s;try{s=kd(a,{pixelRatio:t})}catch(r){ot("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function ts(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){bd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?($t("export"),Ji()):($t("render"),dn=!1,Rt())};if(Ar({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:qi}),X?.modal?.classList.contains("show")&&$t("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function ns({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){ot("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){ot("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ls(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function yr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function gr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function $d(){const e=gr();return e||(an||(an=Ls(sd).catch(t=>{throw an=null,t}).then(()=>{const t=gr();if(!t)throw an=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),an)}async function Pd(){const e=yr();return e||(nn||(nn=Ls(rd).catch(t=>{throw nn=null,t}).then(()=>{const t=yr();if(!t)throw nn=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),nn)}async function Nd(){if(window.html2pdf||await Ls(ad),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Xl(),qd()}function S(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Td(e="reservation"){return e==="project"?"QP":"Q"}function jd(e,t="reservation"){const n=Number(e),a=Td(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Cd(){const e=window.localStorage?.getItem?.(vi),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Mi(e="reservation"){const n=Cd()+1;return{sequence:n,quoteNumber:jd(n,e)}}function Ld(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(vi,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function zi(e="reservation"){return mr[e]||mr.reservation}function Bd(e="reservation"){try{const t=zi(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Fd(e,t="reservation"){try{const n=zi(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Dd(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function Rd(e,t="reservation"){if(!e)return null;const n=ki(t),a=_i(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Dd(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Hi(e){if(!e)return;const t=e.context||"reservation",n=Rd(e,t);n&&Fd(n,t)}function Oi(e){if(!e)return;const t=e.context||"reservation",n=Bd(t);if(!n)return;const a=ki(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ps(e.fields||ba(t)),i=_i(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Vi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Ui(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Md(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Ui(e)}function zd(e){const t=vn()||[],{technicians:n=[]}=de(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Hd(e,t,n){const{projectLinked:a}=ht(e,n),s=ra(e.start,e.end),{groups:r}=Es(e),c=r.reduce((K,_)=>{const z=Number(_?.count??_?.quantity??1)||1,D=Number(_?.unitPrice);let R=Number.isFinite(D)?D:0;if(!R||R<=0){const V=Number(_?.totalPrice);Number.isFinite(V)&&z>0&&(R=Number((V/z).toFixed(2)))}return Number.isFinite(R)||(R=0),K+R*z},0)*s,d=t.reduce((K,_)=>K+Ui(_),0),l=t.reduce((K,_)=>K+Md(_),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),g=Math.max(0,f-y),b=a?!1:e.applyTax,x=Number(e.cost),v=Number.isFinite(x),I=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=I!=null?parseFloat(h(String(I).replace("%","").trim())):NaN,B=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(B!=null?B===!0||B===1||B==="1"||String(B).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;b&&w<=0&&(w=ct);let A=w>0?Math.max(0,g*(w/100)):0;A=Number(A.toFixed(2));const $=g+A;let N=b?$*.15:0;(!Number.isFinite(N)||N<0)&&(N=0),N=Number(N.toFixed(2));const P=$+N,T=Number.isFinite(P)?Number(P.toFixed(2)):0,H=a?T:v?x:T,F=Math.max(0,c+p-y),O=Math.max(0,F-u),k={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:g,taxableAmount:$,taxAmount:N,finalTotal:H,companySharePercent:w,companyShareAmount:A,netProfit:O},G={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(g.toFixed(2)),taxableAmount:h($.toFixed(2)),taxAmount:h(N.toFixed(2)),finalTotal:h(H.toFixed(2)),companySharePercent:h(w.toFixed(2)),companyShareAmount:h(A.toFixed(2)),netProfit:h(O.toFixed(2))};return{totals:k,totalsDisplay:G,rentalDays:s}}function Gt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Ki(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Od(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Gt(e.amount??(n==="amount"?e.value:null)),s=Gt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Ki(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Vd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Od).filter(Boolean);if(n.length>0)return n;const a=Gt(e.paidPercent??e.paid_percent),s=Gt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Ki(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Ud(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Kd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Qd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Gd(e){const t=Number(e?.equipmentEstimate)||0,n=Qd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*fi:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let g=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(g)||g<=0)&&(g=Number((m+y).toFixed(2))):g=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:g}}function Wd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=ms(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Xd(e,t){if(!e)return"—";const n=De(e);return t?`${n} - ${De(t)}`:n}function ie(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function br(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Jd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=ra(e.start,e.end);return Number.isFinite(t)?t:1}function Yd(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function Zd(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=de(),i=e?.id!=null?s.find(C=>String(C.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ie(0,t),expensesTotal:ie(0,t),reservationsTotal:ie(0,t),discountAmount:ie(0,t),taxAmount:ie(0,t),overallTotal:ie(0,t),paidAmount:ie(0,t),remainingAmount:ie(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ie(0,t),remainingAmountDisplay:ie(0,t),paidPercentDisplay:br(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(C=>String(C.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",g=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),b=i.projectCode||`PRJ-${h(String(i.id??""))}`,x=h(String(b)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),I=Ud(i.type),L=i.start?De(i.start):"—",B=i.end?De(i.end):"—",q=Jd(i),w=q!=null?Yd(q):"غير محدد",A=Kd(i),$={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},N=o(`projects.status.${A}`,$[A]||A),P=i.id!=null?String(i.id):null,T=P?a.filter(C=>String(C.projectId)===P):[],F=T.map(C=>{const ne=C.reservationId||C.id||"",ue=C.status||C.state||"pending",oe=String(ue).toLowerCase(),pe=o(`reservations.status.${oe}`,oe),Le=Wd(C),Ae=C.start?new Date(C.start).getTime():0;return{reservationId:h(String(ne||"-")),status:oe,statusLabel:pe,total:Le,totalLabel:ie(Le,t),dateRange:Xd(C.start,C.end),startTimestamp:Number.isNaN(Ae)?0:Ae}}).sort((C,ne)=>ne.startTimestamp-C.startTimestamp).map(({startTimestamp:C,...ne})=>ne).reduce((C,ne)=>C+(Number(ne.total)||0),0),O=new Map;T.forEach(C=>{const ne=Array.isArray(C.items)?C.items:[],ue=ra(C.start,C.end),oe=C.reservationId||C.id||"";ne.forEach((pe,Le)=>{if(!pe)return;const Ae=pe.barcode||pe.code||pe.id||pe.desc||pe.description||`item-${Le}`,ve=String(Ae||`item-${Le}`),Ve=O.get(ve)||{description:pe.desc||pe.description||pe.name||pe.barcode||`#${h(String(Le+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Mt=Number(pe.qty)||1,Zt=Number(pe.price)||0;Ve.totalQuantity+=Mt,Ve.reservationIds.add(String(oe));const zt=Zt*Mt*Math.max(1,ue);Number.isFinite(zt)&&(Ve.totalCost+=zt),O.set(ve,Ve)})});const k=Array.from(O.values()).map(C=>({description:C.description,totalQuantity:C.totalQuantity,reservationsCount:C.reservationIds.size,displayCost:ie(C.totalCost,t)})),G=new Map((r||[]).filter(Boolean).map(C=>[String(C.id),C])),K=new Map,_=C=>{if(!C)return;let ne=null;typeof C=="object"?ne=C.id??C.technicianId??C.technician_id??C.userId??C.user_id??null:(typeof C=="string"||typeof C=="number")&&(ne=C);const ue=ne!=null?String(ne):null,oe=ue&&G.has(ue)?G.get(ue):typeof C=="object"?C:null,pe=oe?.name||oe?.full_name||oe?.fullName||oe?.displayName||(typeof C=="string"?C:null),Le=oe?.role||oe?.title||null,Ae=oe?.phone||oe?.mobile||oe?.contact||null;if(!pe&&!ue)return;const ve=ue||pe;K.has(ve)||K.set(ve,{id:ue,name:pe||"-",role:Le||null,phone:Ae||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(C=>_(C)),T.forEach(C=>{(Array.isArray(C.technicians)?C.technicians:[]).forEach(ue=>_(ue))});const z=Array.from(K.values()),D=Array.isArray(i.expenses)?i.expenses.map(C=>{const ne=Number(C?.amount)||0;return{label:C?.label||C?.name||"-",amount:ne,displayAmount:ie(ne,t),note:C?.note||C?.description||""}}):[],R=Gd(i),V=R.applyTax?Number(((R.subtotal+F)*fi).toFixed(2)):0,te=Number((R.subtotal+F+V).toFixed(2)),se=Vd(i),le=Gt(i.paidAmount??i.paid_amount)||0,J=Gt(i.paidPercent??i.paid_percent)||0,re=ps({totalAmount:te,paidAmount:le,paidPercent:J,history:se}),ge=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",be=fs({manualStatus:ge,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:te}),xe={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${be}`,xe[be]||be),Y=Number(re.paidAmount||0),ae=Number(re.paidPercent||0),me=Math.max(0,Number((te-Y).toFixed(2))),Ne={projectSubtotal:ie(R.subtotal,t),expensesTotal:ie(R.expensesTotal,t),reservationsTotal:ie(F,t),discountAmount:ie(R.discountAmount,t),taxAmount:ie(V,t),overallTotal:ie(te,t),paidAmount:ie(Y,t),remainingAmount:ie(me,t)},Oe={status:be,statusLabel:U,paidAmount:Y,paidPercent:ae,remainingAmount:me,paidAmountDisplay:ie(Y,t),remainingAmountDisplay:ie(me,t),paidPercentDisplay:br(ae)},Q=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:g},projectInfo:{title:v,code:x,typeLabel:I,startDisplay:L,endDisplay:B,durationLabel:w,statusLabel:N},expenses:D,equipment:k,crew:z,totals:R,totalsDisplay:Ne,projectTotals:{combinedTaxAmount:V,overallTotal:te,reservationsTotal:F,paidAmount:Y,paidPercent:ae,remainingAmount:me,paymentStatus:be},paymentSummary:Oe,notes:Q,currencyLabel:t,projectStatus:A,projectStatusLabel:N,projectDurationDays:q,projectDurationLabel:w,paymentHistory:se}}function eu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Ce}){const g=Ps(p),b=(U,Y)=>Ns(g,U,Y),x=U=>u?.has?.(U),v=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,I=(U,Y)=>`<div class="info-plain__item">
      <span class="info-plain__label">${S(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${S(Y)}</span>
    </div>`,L=(U,Y,{variant:ae="inline"}={})=>ae==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(Y)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(Y)}</span>
    </span>`,B=(U,Y)=>`<div class="payment-row">
      <span class="payment-row__label">${S(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(Y)}</span>
    </div>`,q=[];b("customerInfo","customerName")&&q.push(I(o("projects.details.client","العميل"),t.name||"-")),b("customerInfo","customerCompany")&&q.push(I(o("projects.details.company","شركة العميل"),t.company||"—")),b("customerInfo","customerPhone")&&q.push(I(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),b("customerInfo","customerEmail")&&q.push(I(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=x("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",A=[];b("projectInfo","projectType")&&A.push(I(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),b("projectInfo","projectTitle")&&A.push(I(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),b("projectInfo","projectCode")&&A.push(I(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),b("projectInfo","projectStart")&&A.push(I(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),b("projectInfo","projectEnd")&&A.push(I(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),b("projectInfo","projectDuration")&&A.push(I(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),b("projectInfo","projectStatus")&&A.push(I(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const $=x("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${S(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${A.length?`<div class="info-plain">${A.join("")}</div>`:v}
      </section>`:"",N=xi.filter(U=>b("projectCrew",U.id)),P=x("projectCrew")?N.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${N.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,Y)=>`<tr>${N.map(ae=>`<td>${ae.render(U,Y)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(N.length,1)}" class="empty">${S(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",T=[];b("financialSummary","projectSubtotal")&&T.push(L(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ie(0,l)}`)),b("financialSummary","expensesTotal")&&T.push(L(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ie(0,l))),b("financialSummary","reservationsTotal")&&T.push(L(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ie(0,l))),b("financialSummary","discountAmount")&&T.push(L(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ie(0,l))),b("financialSummary","taxAmount")&&T.push(L(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ie(0,l)));const H=[];b("financialSummary","overallTotal")&&H.push(L(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ie(0,l),{variant:"final"})),b("financialSummary","paidAmount")&&H.push(L(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ie(0,l),{variant:"final"})),b("financialSummary","remainingAmount")&&H.push(L(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ie(0,l),{variant:"final"}));const F=x("financialSummary")?!T.length&&!H.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${T.length?`<div class="totals-inline">${T.join("")}</div>`:""}
            ${H.length?`<div class="totals-final">${H.join("")}</div>`:""}
          </div>
        </section>`:"",O=wi.filter(U=>b("projectExpenses",U.id)),k=x("projectExpenses")?O.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${O.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,Y)=>`<tr>${O.map(ae=>`<td>${ae.render(U,Y)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(O.length,1)}" class="empty">${S(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",G=Ii.filter(U=>b("projectEquipment",U.id)),K=x("projectEquipment")?G.length?`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${G.map(U=>`<th>${S(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,Y)=>`<tr>${G.map(ae=>`<td>${ae.render(U,Y)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(G.length,1)}" class="empty">${S(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",_=(e?.description||"").trim()||"",z=x("projectNotes")?`<section class="quote-section">
        <h3>${S(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${S(_||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",D=[];b("payment","beneficiary")&&D.push(B(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Ee.beneficiaryName)),b("payment","bank")&&D.push(B(o("reservations.quote.labels.bank","اسم البنك"),Ee.bankName)),b("payment","account")&&D.push(B(o("reservations.quote.labels.account","رقم الحساب"),h(Ee.accountNumber))),b("payment","iban")&&D.push(B(o("reservations.quote.labels.iban","رقم الآيبان"),h(Ee.iban)));const R=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${D.length?D.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${S(Ee.approvalNote)}</p>
    </section>`,V=Array.isArray(y)&&y.length?y:Ce,te=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${V.map(U=>`<li>${S(U)}</li>`).join("")}</ul>
      </footer>`,se=[],le=[];if($&&le.push({key:"project",html:$}),w&&le.push({key:"customer",html:w}),le.length>1){const U=le.find(me=>me.key==="project"),Y=le.find(me=>me.key==="customer"),ae=[];U?.html&&ae.push(U.html),Y?.html&&ae.push(Y.html),se.push(he(`<div class="quote-section-row quote-section-row--primary">${ae.join("")}</div>`,{blockType:"group"}))}else le.length===1&&se.push(he(le[0].html));const J=[];P&&J.push(he(P,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),k&&J.push(he(k,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&J.push(he(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];F&&re.push(he(F,{blockType:"summary"})),z&&re.push(he(z));const ge=[he(R,{blockType:"payment"}),he(te,{blockType:"footer"})],be=[...Jn(se,"projects.quote.placeholder.primary"),...J,...Jn(re,"projects.quote.placeholder.summary"),...ge],xe=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(Ee.logoUrl)}" alt="${S(Ee.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${S(Ee.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(Ee.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>${S(o("reservations.details.labels.reservationId","رقم العرض"))}</span>
          <strong>${S(f)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>${S(o("projects.quote.labels.date","التاريخ"))}</span>
          <strong>${S(m)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Pi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${xe}
          ${be.join("")}
        </div>
      </div>
    </div>
  `}function Qi(e){if(e?.context==="project")return eu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Ce}=e,y=h(String(t?.reservationId??t?.id??"")),g=t.start?h(De(t.start)):"-",b=t.end?h(De(t.end)):"-",x=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",I=n?.email||"-",L=n?.company||n?.company_name||"-",B=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",A=h(String(c)),$=t?.notes||"",N=Array.isArray(m)&&m.length?m:Ce,P=Ps(u),T=(W,qe)=>Ns(P,W,qe),H=W=>l?.has?.(W),F=`<div class="quote-placeholder">${S(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,O=(W,qe)=>`<div class="info-plain__item">${S(W)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${S(qe)}</strong></div>`,k=(W,qe,{variant:Ue="inline"}={})=>Ue==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${S(W)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${S(qe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${S(W)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${S(qe)}</span>
    </span>`,G=(W,qe)=>`<div class="payment-row">
      <span class="payment-row__label">${S(W)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${S(qe)}</span>
    </div>`,K=[];T("customerInfo","customerName")&&K.push(O(o("reservations.details.labels.customer","العميل"),x)),T("customerInfo","customerCompany")&&K.push(O(o("reservations.details.labels.company","الشركة"),L)),T("customerInfo","customerPhone")&&K.push(O(o("reservations.details.labels.phone","الهاتف"),B)),T("customerInfo","customerEmail")&&K.push(O(o("reservations.details.labels.email","البريد"),I));const _=H("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:F}
      </section>`:"",z=[];T("reservationInfo","reservationId")&&z.push(O(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),T("reservationInfo","reservationStart")&&z.push(O(o("reservations.details.labels.start","بداية الحجز"),g)),T("reservationInfo","reservationEnd")&&z.push(O(o("reservations.details.labels.end","نهاية الحجز"),b)),T("reservationInfo","reservationDuration")&&z.push(O(o("reservations.details.labels.duration","عدد الأيام"),A));const D=H("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:F}
      </section>`:"",R=[];T("projectInfo","projectTitle")&&R.push(O(o("reservations.details.labels.project","المشروع"),q)),T("projectInfo","projectCode")&&R.push(O(o("reservations.details.labels.code","الرمز"),w||"-"));const V=H("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${S(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${R.length?`<div class="info-plain">${R.join("")}</div>`:F}
      </section>`:"",te=[];T("financialSummary","equipmentTotal")&&te.push(k(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),T("financialSummary","crewTotal")&&te.push(k(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),T("financialSummary","discountAmount")&&te.push(k(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),T("financialSummary","taxAmount")&&te.push(k(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const se=T("financialSummary","finalTotal"),le=[];se&&le.push(k(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const J=le.length?`<div class="totals-final">${le.join("")}</div>`:"",re=H("financialSummary")?!te.length&&!se?`<section class="quote-section quote-section--financial">${F}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${S(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${te.length?`<div class="totals-inline">${te.join("")}</div>`:""}
            ${J}
          </div>
        </section>`:"",{groups:ge}=Es(t),be=ge.map(W=>{const qe=Number(W?.count??W?.quantity??1)||1,Ue=Number(W?.unitPrice);let tt=Number.isFinite(Ue)?Ue:0;if(!tt||tt<=0){const nt=Number(W?.totalPrice);Number.isFinite(nt)&&qe>0&&(tt=Number((nt/qe).toFixed(2)))}Number.isFinite(tt)||(tt=0);const In=W?.type==="package"||Array.isArray(W?.items)&&W.items.some(nt=>nt?.type==="package"),Ea=In?W?.packageItems??(Array.isArray(W?.items)?W.items.flatMap(nt=>Array.isArray(nt?.packageItems)?nt.packageItems:[]):[]):[],xa=Array.isArray(W?.barcodes)&&W.barcodes.length?W.barcodes[0]:Array.isArray(W?.items)&&W.items.length?W.items[0]?.barcode:null,wa=W?.barcode??xa??"",Ia=Number.isFinite(Number(W?.totalPrice))?Number(W.totalPrice):Number((tt*qe).toFixed(2));return{...W,isPackage:In,packageItems:Ea,desc:W?.description,barcode:wa,qty:qe,price:tt,totalPrice:Ia}}),xe=Si.filter(W=>T("items",W.id)),U=xe.length>0,Y=U?xe.map(W=>`<th>${S(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join(""):"",me=be.length>0?be.map((W,qe)=>`<tr>${xe.map(Ue=>`<td>${Ue.render(W,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(xe.length,1)}" class="empty">${S(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,Ne=H("items")?U?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Y}</tr>
              </thead>
              <tbody>${me}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.items.title","المعدات"))}</h3>
            ${F}
          </section>`:"",Oe=Ei.filter(W=>T("crew",W.id)),Q=Oe.length>0,ye=Q?Oe.map(W=>`<th>${S(W.labelKey?o(W.labelKey,W.fallback):W.fallback)}</th>`).join(""):"",C=s.length?s.map((W,qe)=>`<tr>${Oe.map(Ue=>`<td>${Ue.render(W,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Oe.length,1)}" class="empty">${S(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ne=H("crew")?Q?`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ye}</tr>
              </thead>
              <tbody>${C}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${S(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${F}
          </section>`:"",ue=H("notes")?`<section class="quote-section">
        <h3>${S(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${S($||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",oe=[];T("payment","beneficiary")&&oe.push(G(o("reservations.quote.labels.beneficiary","اسم المستفيد"),Ee.beneficiaryName)),T("payment","bank")&&oe.push(G(o("reservations.quote.labels.bank","اسم البنك"),Ee.bankName)),T("payment","account")&&oe.push(G(o("reservations.quote.labels.account","رقم الحساب"),h(Ee.accountNumber))),T("payment","iban")&&oe.push(G(o("reservations.quote.labels.iban","رقم الآيبان"),h(Ee.iban)));const pe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${S(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${oe.length?oe.join(""):F}</div>
      </div>
      <p class="quote-approval-note">${S(Ee.approvalNote)}</p>
    </section>`,Le=`<footer class="quote-footer">
        <h4>${S(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${N.map(W=>`<li>${S(W)}</li>`).join("")}</ul>
      </footer>`,Ae=[];_&&D?Ae.push(he(`<div class="quote-section-row">${_}${D}</div>`,{blockType:"group"})):(D&&Ae.push(he(D)),_&&Ae.push(he(_))),V&&Ae.push(he(V));const ve=[];Ne&&ve.push(he(Ne,{blockType:"table",extraAttributes:'data-table-id="items"'})),ne&&ve.push(he(ne,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Ve=[];re&&Ve.push(he(re,{blockType:"summary"})),ue&&Ve.push(he(ue));const Mt=[he(pe,{blockType:"payment"}),he(Le,{blockType:"footer"})],Zt=[...Jn(Ae,"reservations.quote.placeholder.page1"),...ve,...Jn(Ve,"reservations.quote.placeholder.page2"),...Mt],zt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${S(Ee.logoUrl)}" alt="${S(Ee.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${S(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${S(Ee.companyName)}</p>
        <p class="quote-company-cr">${S(o("reservations.quote.labels.cr","السجل التجاري"))}: ${S(Ee.commercialRegistry)}</p>
        <p class="quote-company-license">ترخيص إعلامي: 159460</p>
      </div>
      <div class="quote-header__meta">
        <div class="quote-header__meta-item">
          <span>رقم العرض</span>
          <strong>${S(p)}</strong>
        </div>
        <div class="quote-header__meta-item">
          <span>التاريخ</span>
          <strong>${S(f)}</strong>
        </div>
      </div>
    </header>
  `.trim();return`
    <div id="quotation-pdf-root" dir="rtl">
      <style>${Pi}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${zt}
          ${Zt.join("")}
        </div>
      </div>
    </div>
  `}function tu(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function yn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>tu(c)),i=[s,...r].map(c=>c.catch(d=>(ot("asset load failed",d),md(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Gi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Ri(r),await yn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),w=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),w){q.classList.add("quote-page--primary");const $=i.cloneNode(!0);$.removeAttribute("data-quote-header-template"),q.appendChild($)}else q.classList.add("quote-page--continuation");const A=a.createElement("main");A.className="quote-body",q.appendChild(A),s.appendChild(q),u(q),d=q,l=A},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},g=()=>d?d.scrollHeight-d.clientHeight>od:!1,b=(q,{allowOverflow:w=!1}={})=>(f(),l.appendChild(q),g()&&!w?(l.removeChild(q),m(),!1):!0),x=q=>{const w=q.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!b(w)&&(y(),!b(w)&&b(w,{allowOverflow:!0}))},v=q=>{const w=q.querySelector("table");if(!w){x(q);return}const A=q.querySelector("h3"),$=w.querySelector("thead"),N=Array.from(w.querySelectorAll("tbody tr"));if(!N.length){x(q);return}let P=null,T=0;const H=(O=!1)=>{const k=q.cloneNode(!1);k.removeAttribute("data-quote-block"),k.removeAttribute("data-block-type"),k.removeAttribute("data-table-id"),k.classList.add("quote-section--table-fragment"),O&&k.classList.add("quote-section--table-fragment--continued");const G=A?A.cloneNode(!0):null;G&&k.appendChild(G);const K=w.cloneNode(!1);K.classList.add("quote-table--fragment"),$&&K.appendChild($.cloneNode(!0));const _=a.createElement("tbody");return K.appendChild(_),k.appendChild(K),{section:k,body:_}},F=(O=!1)=>P||(P=H(O),b(P.section)||(y(),b(P.section)||b(P.section,{allowOverflow:!0})),P);N.forEach(O=>{F(T>0);const k=O.cloneNode(!0);if(P.body.appendChild(k),g()&&(P.body.removeChild(k),P.body.childElementCount||(l.removeChild(P.section),P=null,m()),y(),P=null,F(T>0),P.body.appendChild(k),g())){P.section.classList.add("quote-section--table-fragment--overflow"),T+=1;return}T+=1}),P=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):x(q)});const I=Array.from(s.children),L=[];if(I.forEach((q,w)=>{const A=q.querySelector(".quote-body");if(w!==0&&(!A||A.childElementCount===0)){q.remove();return}L.push(q)}),!n){const q=a.defaultView||window,w=Math.min(3,Math.max(1,q.devicePixelRatio||1)),A=ha()?Math.min(2,w):w;L.forEach($=>_d($,{pixelRatio:A}))}L.forEach((q,w)=>{const A=w===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=A?"auto":"always",q.style.breakBefore=A?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const B=L[L.length-1]||null;d=B,l=B?.querySelector(".quote-body")||null,await yn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function Bs(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function nu(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Pd(),$d()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Cs(),m=Li(),y=ha();let g;y?g=1.5:m?g=Math.min(1.7,Math.max(1.2,p*1.1)):f?g=Math.min(1.8,Math.max(1.25,p*1.2)):g=Math.min(2,Math.max(1.6,p*1.4));const b=y||m?.9:f?.92:.95,x=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:g,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let I=0;const L=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const w=s[q];await Ri(w),await yn(w);const A=w.ownerDocument||document,$=A.createElement("div");Object.assign($.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const N=w.cloneNode(!0);N.style.width=`${Fn}px`,N.style.maxWidth=`${Fn}px`,N.style.minWidth=`${Fn}px`,N.style.height=`${Dn}px`,N.style.maxHeight=`${Dn}px`,N.style.minHeight=`${Dn}px`,N.style.position="relative",N.style.background="#ffffff",Bs(N),$.appendChild(N),A.body.appendChild($);let P;try{await yn(N),P=await i(N,{...v,scale:g,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch(_){throw ts(_,"pageCapture",{toastMessage:L}),_}finally{$.parentNode?.removeChild($)}if(!P)continue;const T=P.width||1,F=(P.height||1)/T;let O=Ya,k=O*F,G=0;if(k>Bn){const _=Bn/k;k=Bn,O=O*_,G=Math.max(0,(Ya-O)/2)}const K=P.toDataURL("image/jpeg",b);I>0&&x.addPage(),x.addImage(K,"JPEG",G,0,O,k,`page-${I+1}`,"FAST"),I+=1,await new Promise(_=>window.requestAnimationFrame(_))}}catch(q){throw ns({safariWindowRef:n,mobileWindowRef:a}),q}if(I===0)throw ns({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=x.output("blob");if(y){const w=URL.createObjectURL(q);un();try{window.location.assign(w)}catch(A){ot("mobile safari blob navigation failed",A)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(q),A=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,$=(P,T)=>{if(un(),!P){window.location.assign(T);return}try{P.location.replace(T),P.focus?.()}catch(H){ot("direct blob navigation failed",H);try{P.document.open(),P.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${T}" title="PDF preview"></iframe></body></html>`),P.document.close()}catch(F){ot("iframe blob delivery failed",F),window.location.assign(T)}}},N=A();$(N,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{un();const q=x.output("bloburl"),w=document.createElement("a");w.href=q,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(q),w.remove()},2e3)}}function Rt(){if(!j||!X)return;const{previewFrame:e}=X;if(!e)return;const t=j.context||"reservation",n=Qi({context:t,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});$t("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(hi(r),gi(r,s),bi(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Gi(i,{context:"preview"}),Bs(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=Fn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Dn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,X?.previewFrameWrapper&&!X?.userAdjustedZoom){const m=X.previewFrameWrapper.clientWidth-24;m>0&&m<l?We=Math.max(m/l,.3):We=1}Xi(We)}finally{un()}},{once:!0})}function au(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),Hi(j),Wi(),Rt())}function su(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=ba(s)),i=pd(r,n);t.checked?i.add(a):i.delete(a),Hi(j),Rt()}function ru(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(js(j,n),j.sectionExpansions[n]=t.open)}function Wi(){if(!X?.toggles||!j)return;const{toggles:e}=X,t=j.fields||{},n=j.context||"reservation";js(j);const a=ga(n),s=Ai(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=j.sections.has(i),p=s[i]||[],f=fd(j,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const g=Ns(t,i,y.id),b=u?"":"disabled",x=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${g?"checked":""} ${b}>
                <span>${S(x)}</span>
              </label>
            `}).join("")}
        </div>`:"";return`
      <details class="quote-toggle-group" data-section-group data-section-id="${i}" ${f?"open":""}>
        <summary class="quote-toggle-summary">
          <label class="quote-toggle quote-toggle--section">
            <input type="checkbox" data-section-toggle data-section-id="${i}" ${u?"checked":""}>
            <span>${S(l)}</span>
          </label>
          ${p.length?'<span class="quote-toggle-caret" aria-hidden="true"></span>':""}
        </summary>
        ${m}
      </details>
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",au)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",su)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",ru)})}function iu(){if(X?.modal)return X;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationQuoteModalLabel">${S(o("reservations.quote.previewTitle","معاينة عرض السعر"))}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="quote-preview-layout">
            <aside class="quote-preview-sidebar">
              <h6>${S(o("reservations.quote.toggleHeading","حدد المعلومات المراد تصديرها"))}</h6>
              <div class="quote-toggle-list" data-quote-toggles></div>
              <div class="quote-meta-info" data-quote-meta></div>
              <div class="quote-terms-editor" data-quote-terms-editor>
                <label class="quote-terms-editor__label" for="quote-terms-input">${S(o("reservations.quote.termsEditor.title","الشروط العامة (قابلة للتعديل)"))}</label>
                <textarea id="quote-terms-input" class="quote-terms-editor__textarea" rows="6" data-quote-terms-input placeholder="${S(o("reservations.quote.termsEditor.placeholder","اكتب كل شرط في سطر مستقل"))}"></textarea>
                <button type="button" class="quote-terms-reset" data-quote-terms-reset>${S(o("reservations.quote.termsEditor.reset","استعادة الشروط الافتراضية"))}</button>
              </div>
            </aside>
            <section class="quote-preview-panel">
              <div class="quote-preview" data-quote-preview></div>
            </section>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">${S(o("reservations.quote.actions.close","إغلاق"))}</button>
          <button type="button" class="btn btn-primary" data-quote-download>
            ${S(o("reservations.quote.actions.export","📄 تنزيل PDF"))}
          </button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const t=e.querySelector("[data-quote-toggles]"),n=e.querySelector("[data-quote-preview]"),a=e.querySelector("[data-quote-meta]"),s=e.querySelector("[data-quote-terms-input]"),r=e.querySelector("[data-quote-terms-reset]"),i=e.querySelector("[data-quote-download]"),c=e.querySelector(".modal-header"),d=c?.querySelector(".btn-close"),l=Array.from(e.querySelectorAll('[data-bs-dismiss="modal"]')),u=document.createElement("div");u.className="quote-preview-header-actions",c&&c.insertBefore(u,d||null);const p=document.createElement("iframe");p.className="quote-preview-frame",p.setAttribute("title",o("reservations.quote.previewTitle","معاينة عرض السعر")),p.setAttribute("loading","lazy"),p.setAttribute("frameborder","0");const f=document.createElement("div");f.className="quote-preview-zoom-controls",f.innerHTML=`
    <button type="button" class="quote-preview-zoom-btn" data-zoom-out title="${S(o("reservations.quote.zoom.out","تصغير"))}">−</button>
    <span class="quote-preview-zoom-value" data-zoom-value>100%</span>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-in title="${S(o("reservations.quote.zoom.in","تكبير"))}">+</button>
    <button type="button" class="quote-preview-zoom-btn" data-zoom-reset title="${S(o("reservations.quote.zoom.reset","إعادة الضبط"))}">1:1</button>
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const g=document.createElement("div");g.className="quote-preview-status",g.setAttribute("role","status"),g.setAttribute("aria-live","polite"),g.hidden=!0,g.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${S($i("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(g),u.appendChild(f),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await Ji()}finally{i.disabled=!1}}});const b=()=>{Za()||es(e)};l.forEach(L=>{L?.addEventListener("click",b)}),d&&!l.includes(d)&&d.addEventListener("click",b),e.addEventListener("click",L=>{Za()||L.target===e&&es(e)}),X={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:g,statusText:g.querySelector("[data-quote-status-text]"),statusSpinner:g.querySelector("[data-quote-status-spinner]"),statusAction:g.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const x=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),I=f.querySelector("[data-zoom-reset]");return x?.addEventListener("click",()=>hr(-.1)),v?.addEventListener("click",()=>hr(.1)),I?.addEventListener("click",()=>Yn(1,{markManual:!0})),s&&s.addEventListener("input",cu),r&&r.addEventListener("click",lu),Yn(We),X}function Yn(e,{silent:t=!1,markManual:n=!1}={}){We=Math.min(Math.max(e,.25),2.2),n&&X&&(X.userAdjustedZoom=!0),Xi(We),!t&&X?.zoomValue&&(X.zoomValue.textContent=`${Math.round(We*100)}%`)}function hr(e){Yn(We+e,{markManual:!0})}function Xi(e){if(!X?.previewFrame||!X.previewFrameWrapper)return;const t=X.previewFrame,n=X.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Cs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function ou(){if(!X?.meta||!j)return;const{meta:e}=X;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${S(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${S(j.quoteNumber)}</strong></div>
      <div><span>${S(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${S(j.quoteDateLabel)}</strong></div>
    </div>
  `}function Fs(){if(!X?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:Ce).join(`
`);X.termsInput.value!==e&&(X.termsInput.value=e)}function cu(e){if(!j)return;const t=Wa(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...Ce],Fs();const n=Ce.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Rt()}function lu(e){if(e?.preventDefault?.(),!j)return;j.terms=[...Ce];const t=document.getElementById("reservation-terms");t&&(t.value=Ce.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Ce.join(`
`)),Fs(),Rt()}async function Ji(){if(!j)return;$t("export");const t=!Cs()&&Li(),n=ha(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${S(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${S(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){ot("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await Nd(),ja("html2pdf ensured");const d=j.context||"reservation",l=Qi({context:d,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),hi(i),gi(i),bi(i),ja("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Gi(u,{context:"export"}),await yn(u),Bs(u),ja("layout complete for export document")}catch(f){ts(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${j.quoteNumber}.pdf`;await nu(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(Ld(j.quoteSequence),j.sequenceCommitted=!0)}catch(d){ns({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,ts(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),un()}}function Yi(){const e=iu();e?.modal&&(dn=!1,We=1,X&&(X.userAdjustedZoom=!1),Yn(We,{silent:!0}),Wi(),ou(),Fs(),Rt(),ud(e.modal))}async function du({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=zd(e),{totalsDisplay:s,totals:r,rentalDays:i}=Hd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Mi("reservation"),u=new Date,p=Zl();j={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(ga("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Ts("reservation"),fields:ba("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Vi(u),sequenceCommitted:!1},Oi(j),Yi()}async function um({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=Zd(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Mi("project"),r=new Date,i=[...Yl];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(ga("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Ts("project"),fields:ba("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Vi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Oi(j),Yi()}function uu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=vn(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=de(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(b=>[String(b.id),b])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||Rl(),m=new Map(i.map(b=>[String(b.id),b])),y=new Map(l.map(b=>[String(b.id),b])),g=Ol({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(g.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Vl({entries:g,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(b=>{const x=Number(b.dataset.reservationIndex);Number.isNaN(x)||b.addEventListener("click",()=>{typeof n=="function"&&n(x)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(b=>{const x=Number(b.dataset.reservationIndex);Number.isNaN(x)||b.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(x,v)})})}function mu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=de(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(x=>String(x.id)===String(c.customerId)),l=c.projectId?i.find(x=>String(x.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const x=vn()||[];u.innerHTML=Ul(c,d,x,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const g=u?.querySelector('[data-action="open-project"]');g&&l&&g.addEventListener("click",()=>{f();const x=l?.id!=null?String(l.id):"",v=x?`projects.html?project=${encodeURIComponent(x)}`:"projects.html";window.location.href=v});const b=document.getElementById("reservation-details-export-btn");return b&&(b.onclick=async x=>{x?.preventDefault?.(),x?.stopPropagation?.(),b.blur();try{await du({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function Zi(){const e=()=>{Sn(),Pe(),vn()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let vr=!1,qr=null;function pu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function mm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=pu(n);if(!a&&vr&&_t().length>0&&s===qr)return _t();try{const r=await Cr(n||{});return vr=!0,qr=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return _t()}}async function fu(e,{onAfterChange:t}={}){if(!Ct())return hn(),!1;const a=_t()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await qc(s),Zi(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=sa(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function yu(e,{onAfterChange:t}={}){const a=_t()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=ht(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await Sc(s);return Zi(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=sa(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function Yt(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:pn(e,n),end:pn(t,a)}}function Zn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ds(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function eo(){const{container:e,select:t,hint:n,addButton:a}=Ds();if(!t)return;const s=t.value,r=kr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${Zn(u.id)}">${Zn(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function gu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=qt(),{start:r,end:i}=Yt(),{reservations:c=[]}=de(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=ci(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return St(a,p),vt(p),Me(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Sr(){const{select:e}=Ds();if(!e)return;const t=e.value||"";gu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function bu(){const{addButton:e,select:t}=Ds();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Sr()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Sr())}),t.dataset.listenerAttached="true"),eo()}function vt(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,xr(t);return}const d=Bt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Lt(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(A=>A?.type==="package"),y=h(String(l.count)),g=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,b=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):g*l.count,x=`${h(g.toFixed(2))} ${a}`,v=`${h(b.toFixed(2))} ${a}`,I=l.barcodes.map(A=>h(String(A||""))).filter(Boolean),L=I.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${I.map(A=>`<li>${A}</li>`).join("")}
            </ul>
          </details>`:"";let B="";if(m){const A=new Map;if(l.items.forEach($=>{Array.isArray($?.packageItems)&&$.packageItems.forEach(N=>{if(!N)return;const P=Z(N.barcode||N.normalizedBarcode||N.desc||Math.random()),T=A.get(P),H=Number.isFinite(Number(N.qty))?Number(N.qty):1;if(T){T.qty+=H;return}A.set(P,{desc:N.desc||N.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:H,barcode:N.barcode??N.normalizedBarcode??""})})}),A.size){const $=Array.from(A.values()).map(N=>{const P=h(String(N.qty)),T=Zn(N.desc||""),H=N.barcode?` <span class="reservation-package-items__barcode">(${Zn(h(String(N.barcode)))})</span>`:"";return`<li>${T}${H} × ${P}</li>`}).join("");B=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${$}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",w=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${B||""}${L||""}`:L}
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
          <td>${x}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),xr(t)}function hu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function va(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=qa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,Er();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(De(s.recordedAt)):"—",l=hu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,Er()}function vu(){if(gn()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=ao(e);let a=so(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Ba.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};$u(p),Rs(qa()),va(),Me(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function Er(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(gn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}vu()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(gn()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Pu(s),Rs(qa()),va(),Me(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function qu(e){const{index:t,items:n}=qt(),s=Bt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);St(t,i),vt(i),Me()}function Su(e){const{index:t,items:n}=qt(),a=n.filter(s=>En(s)!==e);a.length!==n.length&&(St(t,a),vt(a),Me())}function Eu(e){const{index:t,items:n}=qt(),s=Bt(n).find(b=>b.key===e);if(!s||s.items.some(b=>b?.type==="package"))return;const{start:r,end:i}=Yt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=de(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(b=>Z(b.barcode))),{equipment:p=[]}=de(),f=(p||[]).find(b=>{const x=Z(b?.barcode);return!x||u.has(x)||En({desc:b?.desc||b?.description||b?.name||"",price:Number(b?.price)||0})!==e||!bs(b)?!1:!Ye(x,r,i,l)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=Z(f.barcode),y=bt(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Lt(f)}];St(t,g),vt(g),Me()}function xr(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){qu(s);return}if(a==="increase-edit-group"&&s){Eu(s);return}if(a==="remove-edit-group"&&s){Su(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||Iu(i)}}),e.dataset.groupListenerAttached="true")}function gn(){return!!document.getElementById("edit-res-project")?.value}function xu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{gn()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function wu(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(xu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function Me(){const e=document.getElementById("edit-res-summary");if(!e)return;va();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),Fe(a),Me()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=gn();wu(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(He("edit-res-company-share"),f=Kt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(He("edit-res-company-share"),f=Kt("edit-res-company-share")));const{items:m=[],payments:y=[]}=qt(),{start:g,end:b}=Yt(),x=Ba({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:g,end:b,companySharePercent:f,paymentHistory:y});e.innerHTML=x;const v=Ba.lastResult;if(v&&a){const I=v.paymentStatus;u?Fe(a,a.value):(a.value!==I&&(a.value=I),a.dataset&&delete a.dataset.userSelected,Fe(a,I))}else a&&Fe(a,a.value)}function Iu(e){if(e==null)return;const{index:t,items:n}=qt();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);St(t,a),vt(a),Me()}function Au(e){const t=e?.value??"",n=Z(t);if(!n)return;const a=ia(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=lt(a);if(s==="maintenance"||s==="retired"){E(jt(s));return}const r=Z(n),{index:i,items:c=[]}=qt();if(c.findIndex(b=>Z(b.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=Yt();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=de(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(Ye(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=bt(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const g=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];St(i,g),e&&(e.value=""),vt(g),Me()}function ea(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=si(t),a=Z(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=lt(n);if(s==="maintenance"||s==="retired"){E(jt(s));return}const{start:r,end:i}=Yt();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=qt();if(d.some(g=>Z(g.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=de(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(Ye(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=bt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];St(c,y),vt(y),Me(),e.value=""}function to(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),ea(e))});const t=()=>{ri(e.value,"edit-res-equipment-description-options")&&ea(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{Me()});const e=()=>{bu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{eo()})}typeof window<"u"&&(window.getEditReservationDateRange=Yt,window.renderEditPaymentHistory=va);function ku(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ka(e);return}ea(e)}}function pm(){gt(),to()}function _u(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let bn=null,Ge=[],Xe=[],as=null,_e={},Ca=!1;function ss(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function rs(){return document.getElementById("edit-res-confirmed")?.value==="true"}function qt(){return{index:bn,items:Ge,payments:Xe}}function St(e,t,n=Xe){bn=typeof e=="number"?e:null,Ge=Array.isArray(t)?[...t]:[],Xe=Array.isArray(n)?[...n]:[]}function no(){bn=null,Ge=[],wc(),Xe=[]}function qa(){return[...Xe]}function Rs(e){Xe=Array.isArray(e)?[...e]:[]}function $u(e){e&&(Xe=[...Xe,e])}function Pu(e){!Number.isInteger(e)||e<0||(Xe=Xe.filter((t,n)=>n!==e))}function mn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function is(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function Nu(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?Z(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:mn(e.qty??e.quantity??e.count??1),price:is(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Tu(e,t=0){if(!e||typeof e!="object")return null;const n=Vt(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=mn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:na(e)).map(f=>Nu(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=is(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=is(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function ju(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Cu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Tu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=mn(c.qty??c.quantity??1);if(c.barcode){const l=Z(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*mn(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?Z(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const b=Vt(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===b)||i.push({...c});return}const d=mn(c.qty??c.quantity??1),l=bt(c),u=c.barcode?Z(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(b=>r.get(b)??0).filter(b=>b>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(ju(r,p,y),y>=d)return;const g=d-y;i.push({...c,qty:g,quantity:g})}),[...i,...s.map(c=>({...c}))]}function Lu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ao(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function so(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Bu(e,t){if(e){e.value="";return}}function sn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ro(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Fu(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${sn(a)}</option>`];i.forEach(d=>{c.push(`<option value="${sn(d.id)}">${sn(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${sn(r)}">${sn(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function io(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}os("tax");const c=_e?.updateEditReservationSummary;typeof c=="function"&&c()}function os(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=_e?.updateEditReservationSummary;typeof r=="function"&&r()};if(Ca){a();return}Ca=!0;const s=()=>{Ca=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),He("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?He("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function wr(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=de(),u=_t()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}_e={..._e,reservation:u,projects:d||[]},t?.(),Fu(d||[],u);const p=u.projectId&&d?.find?.(_=>String(_.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=ht(u,p),y=u.items?u.items.map(_=>({..._,equipmentId:_.equipmentId??_.equipment_id??_.id,barcode:Z(_?.barcode)})):[],g=Cu(u,y),x=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map(_=>ro(_)).filter(Boolean);St(e,g,x);const v=o("reservations.list.unknownCustomer","غير معروف"),I=c?.find?.(_=>String(_.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const L=document.getElementById("edit-res-id");L&&(L.value=u.reservationId||u.id);const B=document.getElementById("edit-res-customer");B&&(B.value=I?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const A=document.getElementById("edit-res-notes");A&&(A.value=u.notes||"");const $=document.getElementById("edit-res-discount");if($){const _=m?0:u.discount??0;$.value=h(_)}const N=document.getElementById("edit-res-discount-type");N&&(N.value=m?"percent":u.discountType||"percent");const P=u.projectId?!1:!!u.applyTax,T=document.getElementById("edit-res-tax");T&&(T.checked=P);const H=document.getElementById("edit-res-company-share");if(H){const _=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,z=_!=null?Number.parseFloat(h(String(_).replace("%","").trim())):NaN,D=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,R=D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite(z)&&z>0,V=R&&Number.isFinite(z)&&z>0?z:ct,te=P||R;H.checked=te,H.dataset.companyShare=String(V)}ss(f,{disable:m});const F=document.getElementById("edit-res-paid"),O=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");F&&(F.value=O,F.dataset&&delete F.dataset.userSelected);const k=document.getElementById("edit-res-payment-progress-type"),G=document.getElementById("edit-res-payment-progress-value");if(k?.dataset?.userSelected&&delete k.dataset.userSelected,k&&(k.value="percent"),Bu(G),Ic((u.technicians||[]).map(_=>String(_))),s?.(g),typeof window<"u"){const _=window?.renderEditPaymentHistory;typeof _=="function"&&_()}io(),r?.();const K=document.getElementById("editReservationModal");as=Lu(K,i),as?.show?.()}async function Du({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(bn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,g=document.getElementById("edit-res-discount-type")?.value||"percent";const b=rs(),x=document.getElementById("edit-res-paid"),v=x?.dataset?.userSelected==="true",I=v&&x?.value||"unpaid",L=document.getElementById("edit-res-payment-progress-type"),B=document.getElementById("edit-res-payment-progress-value"),q=ao(L),w=so(B),A=document.getElementById("edit-res-project")?.value||"",$=Ec(),N=document.getElementById("edit-res-company-share"),P=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const T=typeof e=="function"?e:(Q,ye)=>`${Q}T${ye||"00:00"}`,H=T(d,l),F=T(u,p);if(H&&F&&new Date(H)>new Date(F)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const k=_t()?.[bn];if(!k){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(Ge)||Ge.length===0&&$.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const G=typeof t=="function"?t:()=>!1,K=k.id??k.reservationId;for(const Q of Ge){if(Q?.type==="package"&&Array.isArray(Q.packageItems)){for(const C of Q.packageItems){const ne=C?.barcode??C?.normalizedBarcode??"";if(!ne)continue;const ue=lt(ne);if(ue==="reserved"){const oe=Z(ne);if(!G(oe,H,F,K))continue}if(ue!=="available"){E(jt(ue));return}}continue}const ye=lt(Q.barcode);if(ye==="reserved"){const C=Z(Q.barcode);if(!G(C,H,F,K))continue}if(ye!=="available"){E(jt(ye));return}}for(const Q of Ge){if(Q?.type==="package"&&Array.isArray(Q.packageItems)){for(const C of Q.packageItems){const ne=Z(C?.barcode??C?.normalizedBarcode??"");if(ne&&G(ne,H,F,K)){const ue=C?.desc||C?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),oe=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(ue))})`;E(oe);return}}continue}const ye=Z(Q.barcode);if(G(ye,H,F,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const _=typeof n=="function"?n:()=>!1;for(const Q of Ge){if(Q?.type!=="package")continue;const ye=Q.packageId??Q.package_id??null;if(ye&&_(ye,H,F,K)){const C=Q.desc||Q.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(C))} محجوزة بالفعل في الفترة المختارة`));return}}const z=typeof a=="function"?a:()=>!1;for(const Q of $)if(z(Q,H,F,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const D=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:de().projects||[],R=A&&D.find(Q=>String(Q.id)===String(A))||null,V={...k,projectId:A?String(A):null,confirmed:b},{effectiveConfirmed:te,projectLinked:se,projectStatus:le}=ht(V,R);let J=!!N?.checked,re=!!P?.checked;if(se&&(J&&(N.checked=!1,J=!1),re=!1),!se&&J!==re){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(He("edit-res-company-share"),J=!!N?.checked);let ge=J?getCompanySharePercent("edit-res-company-share"):null;J&&(!Number.isFinite(ge)||ge<=0)&&(He("edit-res-company-share"),ge=getCompanySharePercent("edit-res-company-share"));const be=J&&re&&Number.isFinite(ge)&&ge>0,xe=se?!1:re;se&&(y=0,g="percent");const U=ms(Ge,y,g,xe,$,{start:H,end:F,companySharePercent:be?ge:0});let Y=qa();if(Number.isFinite(w)&&w>0){const Q=U;let ye=null,C=null;q==="amount"?(ye=w,Q>0&&(C=w/Q*100)):(C=w,Q>0&&(ye=w/100*Q));const ne=ro({type:q,value:w,amount:ye,percentage:C,recordedAt:new Date().toISOString()});ne&&(Y=[...Y,ne],Rs(Y)),B&&(B.value="")}const ae=ps({totalAmount:U,history:Y}),me=fs({manualStatus:I,paidAmount:ae.paidAmount,paidPercent:ae.paidPercent,totalAmount:U});x&&!v&&(x.value=me,x.dataset&&delete x.dataset.userSelected);let Ne=k.status??"pending";se?Ne=R?.status??le??Ne:["completed","cancelled"].includes(String(Ne).toLowerCase())||(Ne=b?"confirmed":"pending");const Oe=Nr({reservationCode:k.reservationCode??k.reservationId??null,customerId:k.customerId,start:H,end:F,status:Ne,title:k.title??null,location:k.location??null,notes:f,projectId:A?String(A):null,totalAmount:U,discount:y,discountType:g,applyTax:xe,paidStatus:me,confirmed:te,items:Ge.map(Q=>({...Q,equipmentId:Q.equipmentId??Q.id})),technicians:$,companySharePercent:be?ge:null,companyShareEnabled:be,paidAmount:ae.paidAmount,paidPercentage:ae.paidPercent,paymentProgressType:ae.paymentProgressType,paymentProgressValue:ae.paymentProgressValue,paymentHistory:Y});try{const Q=await xc(k.id||k.reservationId,Oe);await Cr(),Sn(),Pe(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),no(),c?.({type:"updated",reservation:Q}),r?.(),i?.(),as?.hide?.()}catch(Q){console.error("❌ [reservationsEdit] Failed to update reservation",Q);const ye=sa(Q)?Q.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ye,"error")}}function fm(e={}){_e={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=_e,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{os("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{os("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{io();const b=Array.isArray(_e.projects)&&_e.projects.length?_e.projects:de().projects||[],x=p.value&&b.find(q=>String(q.id)===String(p.value))||null,I={..._e?.reservation??{},projectId:p.value||null,confirmed:rs()},{effectiveConfirmed:L,projectLinked:B}=ht(I,x);ss(L,{disable:B}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const b=!rs();ss(b),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Du(_e).catch(b=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",b)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let b=null;const x=()=>{y.value?.trim()&&(clearTimeout(b),b=null,n?.(y))};y.addEventListener("keydown",I=>{I.key==="Enter"&&(I.preventDefault(),x())});const v=()=>{if(clearTimeout(b),!y.value?.trim())return;const{start:I,end:L}=getEditReservationDateRange();!I||!L||(b=setTimeout(()=>{x()},150))};y.addEventListener("input",v),y.addEventListener("change",x),y.dataset.listenerAttached="true"}to?.();const g=document.getElementById("editReservationModal");g&&!g.dataset.cleanupAttached&&(g.addEventListener("hidden.bs.modal",()=>{no(),t?.(),s?.([])}),g.dataset.cleanupAttached="true")}const Ru=de()||{};let ze=(Ru.projects||[]).map(Hu),wn=!1;function ym(){return ze}function Sa(e){ze=Array.isArray(e)?e.map(zs):[],ls({projects:ze});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return ze}async function Mu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await Je(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Ms);return Sa(i),wn=!0,ze}async function zu({force:e=!1,params:t=null}={}){if(!e&&wn&&ze.length>0)return ze;try{return await Mu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),ze}}async function gm(e){const t=await Je("/projects/",{method:"POST",body:e}),n=Ms(t?.data??{}),a=[...ze,n];return Sa(a),wn=!0,n}async function bm(e,t){const n=await Je(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Ms(n?.data??{}),s=ze.map(r=>String(r.id)===String(e)?a:r);return Sa(s),wn=!0,a}async function hm(e){await Je(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=ze.filter(n=>String(n.id)!==String(e));Sa(t),wn=!0}function vm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:g="percent",companyShareEnabled:b=!1,companySharePercent:x=null,companyShareAmount:v=0,paidAmount:I=null,paidPercentage:L=null,paymentProgressType:B=null,paymentProgressValue:q=null,confirmed:w=!1,technicians:A=[],equipment:$=[],payments:N,paymentHistory:P}={}){const T=Array.isArray(A)?A.map(D=>Number.parseInt(String(D),10)).filter(D=>Number.isInteger(D)&&D>0):[],H=Array.isArray($)?$.map(D=>{const R=Number.parseInt(String(D.equipmentId??D.equipment_id??D.id??0),10),V=Number.parseInt(String(D.qty??D.quantity??0),10);return!Number.isInteger(R)||R<=0?null:{equipment_id:R,quantity:Number.isInteger(V)&&V>0?V:1}}).filter(Boolean):[],F=Array.isArray(p)?p.map(D=>{const R=Number.parseFloat(D?.amount??D?.value??0)||0,V=(D?.label??D?.name??"").trim();return V?{label:V,amount:Math.round(R*100)/100}:null}).filter(Boolean):[],O=F.reduce((D,R)=>D+(R?.amount??0),0),k={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(O*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:T,equipment:H,expenses:F},G=Math.max(0,Number.parseFloat(y)||0);k.discount=G,k.discount_type=g==="amount"?"amount":"percent";const K=Number.parseFloat(x),_=!!b&&Number.isFinite(K)&&K>0;k.company_share_enabled=_,k.company_share_percent=_?K:0,k.company_share_amount=_?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(I))&&(k.paid_amount=Math.max(0,Number.parseFloat(I)||0)),Number.isFinite(Number(L))&&(k.paid_percentage=Math.max(0,Number.parseFloat(L)||0)),(B==="amount"||B==="percent")&&(k.payment_progress_type=B),q!=null&&q!==""&&(k.payment_progress_value=Number.parseFloat(q)||0),e&&(k.project_code=String(e).trim());const z=N!==void 0?N:P;if(z!==void 0){const D=oo(z)||[];k.payments=D.map(R=>({type:R.type,amount:R.amount!=null?R.amount:null,percentage:R.percentage!=null?R.percentage:null,value:R.value!=null?R.value:null,note:R.note??null,recorded_at:R.recordedAt??null}))}return k.end_datetime||delete k.end_datetime,k.client_company||(k.client_company=null),k}function Ms(e={}){return zs(e)}function Hu(e={}){return zs(e)}function zs(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,g=m?.quantity??m?.qty??0,b=m?.barcode??m?.code??"",x=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(g),10)||0,barcode:b,description:x}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=oo(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function qm(e){return e instanceof Ir}function La(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Ou(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=La(e.value);let s=La(e.amount),r=La(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function oo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Ou(t)).filter(Boolean):[]}const ta="reservations-ui:ready",At=typeof EventTarget<"u"?new EventTarget:null;let kt={};function Vu(e){return Object.freeze({...e})}function Uu(){if(!At)return;const e=kt,t=typeof CustomEvent=="function"?new CustomEvent(ta,{detail:e}):{type:ta,detail:e};typeof At.dispatchEvent=="function"&&At.dispatchEvent(t)}function Ku(e={}){if(!e||typeof e!="object")return kt;const t={...kt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),kt=Vu(t),Uu(),kt}function Qu(e){if(e)return kt?.[e]}function Sm(e){const t=Qu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||kt)?.[e];typeof i=="function"&&(At&&At.removeEventListener(ta,a),n(i))};At&&At.addEventListener(ta,a)})}function Em(){return zu().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=de()||{};Ac(e||[]),mi()})}function Hs(e=null){mi(),co(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Gu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function cs(){return{populateEquipmentDescriptionLists:gt,setFlatpickrValue:_u,splitDateTime:_r,renderEditItems:vt,updateEditReservationSummary:Me,addEquipmentByDescription:ku,addEquipmentToEditingReservation:Au,addEquipmentToEditingByDescription:ea,combineDateTime:pn,hasEquipmentConflict:Ye,hasTechnicianConflict:Pr,renderReservations:co,handleReservationsMutation:Hs,ensureModal:Gu}}function co(e="reservations-list",t=null){uu({containerId:e,filters:t,onShowDetails:lo,onConfirmReservation:mo})}function lo(e){return mu(e,{getEditContext:cs,onEdit:(t,{reservation:n})=>{po(t,n)},onDelete:uo})}function uo(e){return Ct()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?fu(e,{onAfterChange:Hs}):!1:(hn(),!1)}function mo(e){return yu(e,{onAfterChange:Hs})}function po(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}wr(e,cs());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}wr(e,cs());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}cc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function xm(){Ku({showReservationDetails:lo,deleteReservation:uo,confirmReservation:mo,openReservationEditor:po})}export{bm as A,Ku as B,lo as C,Ms as D,Xt as E,xs as F,im as G,om as H,ym as I,qm as J,fi as K,cm as L,um as M,tm as N,nm as O,rm as P,Mu as Q,Ie as R,am as S,sm as T,lm as U,hm as V,gm as W,Xl as X,gi as Y,bi as Z,dm as _,zu as a,xm as b,fm as c,pm as d,mm as e,mi as f,cs as g,ce as h,Zu as i,Hs as j,Ul as k,Em as l,ht as m,pa as n,Pe as o,Cc as p,zn as q,co as r,em as s,Ju as t,Me as u,Yu as v,Qu as w,Sm as x,pi as y,vm as z};
