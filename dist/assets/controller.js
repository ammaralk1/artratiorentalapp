import{n as h,d as ue,f as lc,t as o,b as Ye,h as E,j as Ft,o as wn,s as fs,A as Nr,z as dc,k as Re,B as Pr,u as uc}from"./auth.js";import{n as te,x as Ze,y as Wt,f as ia,z as Tr,A as mc,D as ct,B as ys,C as nr,E as vn,F as oa,G as pc,H as et,I as gs,J as jr,K as fc,L as yc,M as gc,N as bc,O as On,P as hc,Q as Cr,R as vc,S as Lr,v as bs,h as hs,j as vs,T as Br,U as qc,s as In,c as ca,V as Fr,W as Sc,X as Dr,Y as Ec,p as la,a as Rr,g as Pt,Z as xc,_ as wc,$ as Ma,a0 as Ic,w as Ac,a1 as kc,a2 as _c,b as $c}from"./reservationsService.js";const Ta="select.form-select:not([data-no-enhance]):not([multiple])",tt=new WeakMap;let ja=null,ar=!1,st=null;function Zu(e=document){e&&(e.querySelectorAll(Ta).forEach(t=>Dn(t)),!ja&&e===document&&(ja=new MutationObserver(t=>{for(const n of t)n.addedNodes?.forEach(a=>{a instanceof Element&&(a.matches?.(Ta)&&Dn(a),a.querySelectorAll?.(Ta).forEach(s=>Dn(s)))})}),ja.observe(document.body,{childList:!0,subtree:!0})),ar||(ar=!0,document.addEventListener("pointerdown",Tc,{capture:!0})))}function Fn(e){if(!(e instanceof HTMLSelectElement))return;if(!e.dataset.enhancedSelect){Dn(e);return}const t=e.closest(".enhanced-select");t&&(qs(t),Vn(t),za(t))}function Dn(e){if(!(e instanceof HTMLSelectElement))return;if(e.dataset.enhancedSelect){Fn(e);return}if(e.multiple||e.size>1)return;const t=document.createElement("div");t.className="enhanced-select";const n=e.parentNode;n&&n.insertBefore(t,e),t.appendChild(e),e.dataset.enhancedSelect="true",e.classList.add("enhanced-select__native"),e.setAttribute("tabindex","-1"),e.setAttribute("aria-hidden","true");const a=document.createElement("button");a.type="button",a.className="enhanced-select__trigger",a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-expanded","false");const s=document.createElement("ul");s.className="enhanced-select__menu",s.setAttribute("role","listbox"),s.setAttribute("tabindex","-1"),t.append(a,s);const r={select:e,trigger:a,menu:s,observer:null,refreshRaf:null};tt.set(t,r),a.addEventListener("click",()=>Pc(t)),a.addEventListener("keydown",i=>jc(i,t)),s.addEventListener("click",i=>Lc(i,t)),s.addEventListener("keydown",i=>Cc(i,t)),e.addEventListener("change",()=>{Vn(t),Mr(t)}),r.observer=new MutationObserver(i=>{let c=!1,d=!1;for(const l of i)l.type==="attributes"&&l.attributeName==="disabled"&&(d=!0),l.type==="childList"&&(c=!0);d&&za(t),c&&Nc(r,t)}),r.observer.observe(e,{attributes:!0,attributeFilter:["disabled"],childList:!0}),qs(t),Vn(t),za(t)}function Nc(e,t){e&&(e.refreshRaf||(e.refreshRaf=requestAnimationFrame(()=>{e.refreshRaf=null,qs(t),Vn(t)})))}function qs(e){const t=tt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=Array.from(n.options||[]),r=document.createDocumentFragment();s.forEach(i=>{const c=document.createElement("li");c.className="enhanced-select__option",c.textContent=i.textContent??i.value??"",c.dataset.value=i.value??"",c.setAttribute("role","option"),c.setAttribute("tabindex","-1"),i.disabled&&(c.setAttribute("aria-disabled","true"),c.classList.add("is-disabled")),i.selected&&(c.setAttribute("aria-selected","true"),c.dataset.selected="true",c.setAttribute("tabindex","0")),r.appendChild(c)}),a.innerHTML="",a.appendChild(r),Mr(e)}function Vn(e){const t=tt.get(e);if(!t)return;const{select:n,trigger:a}=t;if(!n||!a)return;const s=n.selectedOptions?.[0]??n.options?.[n.selectedIndex],r=s?.textContent?.trim()||s?.value||"";a.textContent=r}function Mr(e){const t=tt.get(e);if(!t)return;const{select:n,menu:a}=t;if(!n||!a)return;const s=n.value;a.querySelectorAll(".enhanced-select__option").forEach(i=>{const c=i.dataset.value===s;i.toggleAttribute("aria-selected",c),i.dataset.selected=c?"true":"",i.setAttribute("tabindex",c?"0":"-1")})}function za(e){const t=tt.get(e);if(!t)return;const{select:n,trigger:a}=t,s=!!n?.disabled;e.classList.toggle("enhanced-select--disabled",s),a.disabled=s}function Pc(e){tt.get(e)&&(e.getAttribute("data-open")==="true"?en(e):zr(e))}function zr(e){const t=tt.get(e);if(!t)return;st&&st!==e&&en(st,{focusTrigger:!1}),e.setAttribute("data-open","true"),t.trigger.setAttribute("aria-expanded","true"),st=e;const n=t.menu.querySelector('.enhanced-select__option[aria-selected="true"]')??t.menu.querySelector(".enhanced-select__option:not([aria-disabled='true'])");n?n.focus():t.menu.focus()}function en(e,{focusTrigger:t=!0}={}){const n=tt.get(e);n&&(e.setAttribute("data-open","false"),n.trigger.setAttribute("aria-expanded","false"),t&&n.trigger.focus({preventScroll:!0}),st===e&&(st=null))}function Tc(e){if(!st)return;const t=e.target;t instanceof Node&&(st.contains(t)||en(st,{focusTrigger:!1}))}function jc(e,t){const n=e.key;n==="ArrowDown"||n==="ArrowUp"||n===" "||n==="Enter"?(e.preventDefault(),zr(t)):n==="Escape"&&en(t)}function Cc(e,t){const n=e.key,a=tt.get(t);if(!a)return;const s=Array.from(a.menu.querySelectorAll(".enhanced-select__option:not([aria-disabled='true'])"));if(!s.length)return;const r=s.findIndex(i=>i===document.activeElement);if(n==="ArrowDown"||n==="ArrowUp"){e.preventDefault();const c=(r+(n==="ArrowDown"?1:-1)+s.length)%s.length;s[c].focus()}else if(n==="Home")e.preventDefault(),s[0].focus();else if(n==="End")e.preventDefault(),s[s.length-1].focus();else if(n==="Enter"||n===" "){e.preventDefault();const i=document.activeElement;i&&i.classList.contains("enhanced-select__option")&&Hr(i,t)}else n==="Escape"&&(e.preventDefault(),en(t))}function Lc(e,t){const n=e.target?.closest?.(".enhanced-select__option");n&&Hr(n,t)}function Hr(e,t){const n=tt.get(t);if(!n||e.getAttribute("aria-disabled")==="true")return;const{select:a}=n,s=e.dataset.value??"";a.value!==s&&(a.value=s,a.dispatchEvent(new Event("change",{bubbles:!0}))),en(t)}const tn=Object.freeze({change:"reservationEquipmentSelection:change",requestAdd:"reservationEquipmentSelection:requestAdd"});let rt=null;function Ss(e,t={}){typeof document>"u"||document.dispatchEvent(new CustomEvent(e,{detail:t}))}function Or(e,t){if(typeof document>"u")return;const{body:n}=document;n&&(e?(n.classList.add("equipment-selection-active"),t&&(n.dataset.equipmentSelectionMode=t)):(n.classList.remove("equipment-selection-active"),n.dataset&&delete n.dataset.equipmentSelectionMode))}function Bc(e={}){const t={...e};return t.barcode&&(t.barcode=h(String(t.barcode||"").trim())),t.start&&typeof t.start!="string"&&(t.start=String(t.start)),t.end&&typeof t.end!="string"&&(t.end=String(t.end)),t}function Fc(e={}){const t=Bc({...e,activatedAt:Date.now()});return rt=t,Or(!0,t.mode||"create"),Ss(tn.change,{active:!0,selection:{...t}}),t}function Un(e="manual"){if(!rt)return;const t=rt;rt=null,Or(!1),Ss(tn.change,{active:!1,previous:t,reason:e})}function Vr(){return!!rt}function Dc(){return rt?{...rt}:null}function Rc(e){if(!rt)return!1;let t;if(typeof e=="string"||typeof e=="number"){const n=h(String(e??"").trim());if(!n)return!1;t={barcodes:[n],quantity:1}}else if(e&&typeof e=="object"){const{barcodes:n,barcode:a,quantity:s,groupKey:r,description:i}=e,c=Array.isArray(n)?n:[];a&&c.push(a);const d=c.map(u=>h(String(u??"").trim())).filter(u=>typeof u=="string"&&u.length>0);if(!d.length)return!1;const l=Number.isInteger(s)&&s>0?s:d.length;t={barcodes:d,quantity:Math.min(l,d.length)},r&&(t.groupKey=r),i&&(t.description=i)}else return!1;return Ss(tn.requestAdd,{...t,selection:{...rt}}),!0}typeof document<"u"&&document.addEventListener("dashboard:tabChanged",e=>{const t=e?.detail?.tabId;!t||t==="equipment-tab"||Un("tab-changed")});const Mc=new Map([["available","available"],["متاح","available"],["متوفر","available"],["جاهز","available"],["ready","available"],["reserved","reserved"],["محجوز","reserved"],["محجوزة","reserved"],["maintenance","maintenance"],["صيانة","maintenance"],["under_maintenance","maintenance"],["retired","retired"],["متوقف","retired"],["خارج الخدمة","retired"]]),zc=new Set(["maintenance","reserved","retired"]);function Hc(e){const t=String(e??"").trim().toLowerCase();return t&&Mc.get(t)||"available"}function Oc(e){return e?typeof e=="object"?e:da(e):null}function lt(e){const t=Oc(e);return t?Hc(t.status||t.state||t.statusLabel||t.status_label):"available"}function Es(e){return!zc.has(lt(e))}function Dt(e={}){return e.image||e.imageUrl||e.img||""}function Vc(e){if(!e)return null;const t=te(e),{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}function da(e){const t=te(e);if(!t)return null;const{equipment:n=[]}=ue();return(n||[]).find(a=>te(a?.barcode)===t)||null}const Uc=ue()||{};let ft=(Uc.equipment||[]).map(Gc),Ha=!1,fn="",_t=null,jt=null,Ct=null,ua=!1,sr=!1;function Kc(e){if(!e)return null;const t=window?.bootstrap?.Modal??(typeof bootstrap<"u"?bootstrap.Modal:null);return t?t.getOrCreateInstance(e):null}function Qc(){document.dispatchEvent(new CustomEvent("equipment:changed"))}function Gc(e={}){return xs({...e,subcategory:e.subcategory??e.sub??"",description:e.description??e.desc??e.name??"",quantity:e.quantity??e.qty??0,unit_price:e.unit_price??e.price??0,image_url:e.image_url??e.imageUrl??e.image??""})}function ma(e={}){return xs(e)}function xs(e={}){const t=e.id??e.equipment_id??e.equipmentId??e.item_id??e.itemId??null,n=e.description??e.desc??e.name??"",a=e.category??"",s=e.subcategory??e.sub??"",r=An(e.quantity??e.qty??0),i=pa(e.unit_price??e.price??0),c=h(String(e.barcode??"").trim()),d=Pe(e.status??e.state??e.status_label??e.statusLabel??"available"),l=e.image_url??e.imageUrl??e.image??"",u=e.name??e.item_name??n;return{id:Wc(t)?String(t):"",category:a,sub:s,desc:n,name:u,qty:r,price:i,barcode:c,status:d,image:l,imageUrl:l,created_at:e.created_at??null,updated_at:e.updated_at??null}}function Wc(e){return e!=null&&e!==""}function An(e){const t=Number.parseInt(e,10);return Number.isFinite(t)&&t>=0?t:0}function pa(e){const t=Number.parseFloat(e);return Number.isFinite(t)?Math.round(t*100)/100:0}function Xc(e){!e||e.dataset.englishDigitsAttached||(e.addEventListener("input",()=>{const{selectionStart:t,selectionEnd:n,value:a}=e,s=h(a);if(s!==a&&(e.value=s,t!=null&&n!=null)){const r=s.length-a.length,i=t+r,c=n+r;e.setSelectionRange(i,c)}}),e.dataset.englishDigitsAttached="true")}function rr(e){if(!e)return"";const t=h(String(e.barcode??"")).trim();if(t)return t;if(Array.isArray(e.variants))for(const n of e.variants){const a=h(String(n?.barcode??"")).trim();if(a)return a}return""}function Jc(e,t){const n=rr(e),a=rr(t);if(!n&&!a)return 0;if(!n)return 1;if(!a)return-1;const s=/^[0-9]+$/,r=s.test(n),i=s.test(a);if(r&&i){if(n.length!==a.length)return n.length-a.length;const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}else{if(r!==i)return r?-1:1;{const l=n.localeCompare(a,"ar",{numeric:!0,sensitivity:"base"});if(l!==0)return l}}const c=Kn(e?.desc||e?.description||e?.name||""),d=Kn(t?.desc||t?.description||t?.name||"");return c.localeCompare(d,"ar",{sensitivity:"base"})}function xe(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Pe(e){switch(String(e??"").trim().toLowerCase()){case"available":case"متاح":case"متوفر":return"available";case"reserved":case"محجوز":return"reserved";case"maintenance":case"صيانة":return"maintenance";case"retired":case"متوقف":case"خارج الخدمة":return"retired";default:return"available"}}function Yc(e){return Pe(e)}function Oa(){if(!Vr())return null;const e=Dc();return e?{...e}:null}function Zc(e){const t=Oa();if(!t)return{active:!1};const n=Array.isArray(e?.variants)&&e.variants.length?e.variants:[e],{start:a,end:s,ignoreReservationId:r=null}=t,i=t?.mode||t?.source||"",c=[],d=new Set;if(n.forEach(f=>{const m=te(f?.barcode);!m||d.has(m)||(d.add(m),c.push({variant:f,barcode:m}))}),!c.length)return{active:!0,canSelect:!1,reason:o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف")};if(i==="package-manager"||i==="equipment-packages"){const f=Math.max(1,c.length||1);return{active:!0,canSelect:!0,barcode:c[0].barcode,availableBarcodes:c.map(({barcode:m})=>m),maxQuantity:f,reason:""}}const l=c.filter(({variant:f})=>Es(f));if(!a||!s)return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),availableBarcodes:[],maxQuantity:0};const u=l.filter(({barcode:f})=>!Ze(f,a,s,r));if(u.length)return{active:!0,canSelect:!0,barcode:u[0].barcode,availableBarcodes:u.map(({barcode:f})=>f),maxQuantity:u.length};let p=o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً");if(l.length>0)p=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");else{const f=new Set(c.map(({variant:m})=>Pe(m?.status)));f.has("maintenance")?p=o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً"):f.has("reserved")?p=o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها"):f.has("retired")&&(p=o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً"))}return{active:!0,canSelect:!1,barcode:l[0]?.barcode||c[0].barcode,reason:p,availableBarcodes:[],maxQuantity:0}}function el(){const e=document.querySelector('[data-tab="reservations-tab"]');e&&(e.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.querySelector("#sub-tab-trigger-create-tab")?.click(),document.getElementById("equipment-barcode")?.focus()},200)}))}function Ur(){if(typeof document>"u")return;const e=document.getElementById("equipment-selection-banner"),t=document.getElementById("equipment-selection-return"),n=document.getElementById("equipment-selection-banner-title"),a=document.getElementById("equipment-selection-banner-hint");if(!e)return;const s=Oa();e.hidden=!s;const r=s?.mode||s?.source||"";s?r==="package-manager"||r==="equipment-packages"?(n&&(n.textContent=o("equipment.packages.selection.bannerTitle","📦 اختيار معدات للحزمة")),a&&(a.textContent=o("equipment.packages.selection.bannerHint","اختر المعدات المطلوبة من البطاقات أدناه ثم اضغط على زر إنهاء الاختيار لإضافتها إلى الحزمة.")),t&&(t.textContent=o("equipment.packages.selection.doneButton","✅ إنهاء اختيار الحزمة"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))):(n&&(n.textContent=o("reservations.create.equipment.selector.bannerTitle","🔗 اختيار معدات لحجز جديد")),a&&(a.textContent=o("reservations.create.equipment.selector.bannerHint","ابحث في القائمة أدناه، ثم أضف المعدات المتاحة مباشرة إلى نموذج الحجز.")),t&&(t.textContent=o("reservations.create.equipment.selector.returnButton","⬅️ العودة إلى الحجز"))),s&&t&&!t.dataset.listenerAttached&&(t.addEventListener("click",()=>{const c=Oa(),d=c?.mode||c?.source||"";d==="package-manager"||d==="equipment-packages"?Un("package-finish-button"):(Un("return-button"),el())}),t.dataset.listenerAttached="true")}function Me(){return ft}function Lt(e){ft=Array.isArray(e)?e.map(xs):[],fs({equipment:ft}),Qc()}function Kn(e){return String(e??"").trim().toLowerCase()}function gt(e){if(!e)return"";const t=e.desc||e.description||e.name||"";let n=Kn(t);return n||(n=Kn(e.category||"")),n||(n=h(String(e.barcode||"")).trim().toLowerCase()),n}function fa(e){const t=gt(e);return t?Me().filter(n=>gt(n)===t):[]}function ya(e){const t=document.getElementById("equipment-details-cover");if(!t)return;const n=ga(e);if(n){const a=xe(e.desc||e.description||e.name||"");t.innerHTML=`<img src="${xe(n)}" alt="${a}">`,t.classList.add("has-image")}else t.innerHTML='<span class="equipment-details-header__placeholder" aria-hidden="true">📦</span>',t.classList.remove("has-image")}function ws(){return{category:document.getElementById("edit-equipment-category"),subcategory:document.getElementById("edit-equipment-subcategory"),description:document.getElementById("edit-equipment-description"),quantity:document.getElementById("edit-equipment-quantity"),price:document.getElementById("edit-equipment-price"),image:document.getElementById("edit-equipment-image"),barcode:document.getElementById("edit-equipment-barcode"),status:document.getElementById("edit-equipment-status")}}function Qn(){const e=ws();return{category:e.category?.value??"",subcategory:e.subcategory?.value??"",description:e.description?.value??"",quantity:e.quantity?.value??"",price:e.price?.value??"",image:e.image?.value??"",barcode:e.barcode?.value??"",status:e.status?.value??""}}function Is(e={}){const t=ws();t.category&&(t.category.value=e.category??""),t.subcategory&&(t.subcategory.value=e.subcategory??""),t.description&&(t.description.value=e.description??""),t.quantity&&(t.quantity.value=e.quantity!=null?h(String(e.quantity)):""),t.price&&(t.price.value=e.price!=null?h(String(e.price)):""),t.image&&(t.image.value=e.image??""),t.barcode&&(t.barcode.value=e.barcode??""),t.status&&(t.status.value=e.status??"")}function Xt(e){ua=e;const t=ws(),n=document.getElementById("equipment-edit-cancel"),a=document.getElementById("save-equipment-changes"),s=document.getElementById("edit-equipment-form");if(s&&s.classList.toggle("equipment-details-form--editing",e),[t.category,t.subcategory,t.description,t.quantity,t.price,t.image].forEach(i=>{i&&(e?i.removeAttribute("disabled"):i.setAttribute("disabled","disabled"))}),n&&(n.hidden=!e,n.disabled=!e),a){a.disabled=!1;const i=e?"equipment.modal.actions.save":"equipment.modal.actions.edit",c=e?"💾 حفظ التعديلات":"✏️ تعديل";a.textContent=o(i,c),a.dataset.mode=e?"save":"view"}if(e){const i=t.description||t.category||t.subcategory;i&&setTimeout(()=>{i.focus(),typeof i.select=="function"&&i.select()},0)}}async function em(e){if(!Ft()){wn();return}if(!e)return;try{await nl()}catch(n){console.error("❌ [equipment.js] Unable to load XLSX",n),alert(o("equipment.toast.xlsxMissing","⚠️ مكتبة Excel (XLSX) غير محملة."));return}const t=new FileReader;t.onload=async function(n){try{const a=new Uint8Array(n.target.result),s=XLSX.read(a,{type:"array"}),r=s.Sheets[s.SheetNames[0]],i=XLSX.utils.sheet_to_json(r,{defval:""});if(!Array.isArray(i)||i.length===0){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}const c=[];let d=0;if(i.forEach(l=>{const u=l.القسم??l.category??"",p=l["القسم الثانوي"]??l.subcategory??"",f=l.الوصف??l.description??l.name??"",m=l.الكمية??l.quantity??0,y=l.السعر??l.price??0,b=l.الباركود??l.barcode??"",g=l.الحالة??l.status??"متاح",S=l.الصورة??l.image_url??l.image??"",v=h(String(b||"")).trim();if(!f||!v){d+=1;return}c.push(As({category:u,subcategory:p,description:f,quantity:m,unit_price:y,barcode:v,status:g,image_url:S}))}),!c.length){E(o("equipment.toast.uploadEmpty","⚠️ لم يتم العثور على بيانات في الملف"));return}try{const l=await Ye("/equipment/?bulk=1",{method:"POST",body:c}),u=Array.isArray(l?.data)?l.data.map(ma):[];if(u.length){const m=[...Me(),...u];Lt(m)}await ba({showToastOnError:!1}),Te();const p=l?.meta?.count??u.length,f=[];p&&f.push(`${p} ✔️`),d&&f.push(`${d} ⚠️`),E(o("equipment.toast.uploadSuccess","✅ تم رفع المعدات بنجاح")+(f.length?` (${f.join(" / ")})`:""))}catch(l){const u=nn(l,"equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل");E(u,"error")}}catch(a){console.error("❌ [equipment.js] Failed to process Excel file",a),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")}},t.onerror=function(){console.error("❌ [equipment.js] FileReader error",t.error),E(o("equipment.toast.uploadFailed","❌ حدث خطأ أثناء قراءة ملف الإكسل"),"error")},t.readAsArrayBuffer(e)}const tl="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";let cn=null;function nl(){return typeof XLSX<"u"?Promise.resolve():typeof window>"u"||typeof document>"u"?Promise.reject(new Error("XLSX library is not available in this environment")):cn||(cn=new Promise((e,t)=>{const n=document.querySelector('script[data-xlsx-loader="true"]');if(n){n.addEventListener("load",s,{once:!0}),n.addEventListener("error",r,{once:!0});return}const a=document.createElement("script");a.src=tl,a.async=!0,a.defer=!0,a.dataset.xlsxLoader="true",a.addEventListener("load",s,{once:!0}),a.addEventListener("error",r,{once:!0}),document.head.appendChild(a);function s(){if(typeof XLSX>"u"){t(new Error("XLSX did not load correctly"));return}e()}function r(){t(new Error("Failed to load XLSX library"))}}).catch(e=>{throw console.warn("⚠️ [equipment.js] ensureXLSXLoaded failed",e),cn=null,e}),cn)}function As({category:e="",subcategory:t="",description:n="",quantity:a=0,unit_price:s=0,barcode:r="",status:i="متاح",image_url:c=""}){const d=h(String(r||"")).trim(),l=Yc(i);return{category:e?.trim()||null,subcategory:t?.trim()||null,name:n?.trim()||null,description:n?.trim()||null,quantity:An(a),unit_price:pa(s),barcode:d,status:l,image_url:c?.trim()||null}}async function al(){if(!Ft()){wn();return}if(confirm(o("equipment.toast.clearConfirm","⚠️ هل أنت متأكد من حذف كل المعدات؟")))try{const t=(await Ye("/equipment/?all=1",{method:"DELETE"}))?.meta?.deleted??0;await ba({showToastOnError:!1}),E(o("equipment.toast.clearSuccess","🗑️ تم مسح جميع المعدات")+(t?` (${t})`:""))}catch(e){const t=nn(e,"equipment.toast.clearFailed","⚠️ تعذر حذف بعض المعدات");E(t,"error")}}function ga(e){return e.image||e.imageUrl||e.img||""}function sl(e){const t=Pe(e),n={available:{label:o("equipment.form.options.available","✅ متاح"),className:"equipment-status-badge equipment-status-badge--available"},reserved:{label:o("equipment.form.options.booked","📌 محجوز"),className:"equipment-status-badge equipment-status-badge--reserved"},maintenance:{label:o("equipment.form.options.maintenance","🛠️ صيانة"),className:"equipment-status-badge equipment-status-badge--maintenance"},retired:{label:o("equipment.form.options.retired","📦 خارج الخدمة"),className:"equipment-status-badge equipment-status-badge--retired"}},{label:a,className:s}=n[t]||{label:e||"-",className:"equipment-status-badge equipment-status-badge--default"};return`<span class="${s}">${a}</span>`}function Gn(){const e=document.getElementById("equipment-variants-section"),t=document.getElementById("equipment-variants-table-body"),n=document.getElementById("equipment-variants-count");if(e&&(e.hidden=!0),t){const a=o("equipment.modal.variants.empty","لا توجد قطع مرتبطة أخرى.");t.innerHTML=`<tr><td colspan="4" class="text-center text-muted">${xe(a)}</td></tr>`}n&&(n.textContent="0")}function Kr(e){const t=document.getElementById("equipment-variants-section"),n=document.getElementById("equipment-variants-table-body"),a=document.getElementById("equipment-variants-count");if(!t||!n||!e)return;const r=_t?.groupKey||gt(e);if(!r){Gn();return}const i=Me().filter(p=>gt(p)===r).sort((p,f)=>{const m=String(p.barcode||"").trim(),y=String(f.barcode||"").trim();return!m&&!y?0:m?y?m.localeCompare(y,"ar",{numeric:!0,sensitivity:"base"}):-1:1});if(!i.length){Gn();return}t.hidden=!1,a&&(a.textContent=String(i.length));const c=o("equipment.modal.variants.current","الحالي"),d=o("equipment.form.labels.quantity","الكمية"),l=Me(),u=i.map(p=>{const f=p.id&&e.id?String(p.id)===String(e.id):String(p.barcode||"")===String(e.barcode||""),m=f?"equipment-variants-table__row--current":"",y=xe(String(p.barcode||"-")),b=f?`<span class="equipment-variants-current-badge">${xe(c)}</span>`:"",g=h(String(Number.isFinite(Number(p.qty))?Number(p.qty):0)),S=l.indexOf(p),v=xe(o("equipment.item.actions.delete","🗑️ حذف")),A=S>=0?`<div class="table-action-buttons equipment-variant-actions">
            <button type="button" class="btn btn-sm btn-error equipment-variant-action equipment-variant-action--danger" data-variant-action="delete" data-variant-index="${S}">${v}</button>
          </div>`:"";return`
        <tr class="${m}">
          <td>
            ${y}
            ${b}
          </td>
          <td>${sl(p.status)}</td>
          <td>
            <span class="equipment-variants-qty" title="${xe(d)}">${g}</span>
          </td>
          <td class="table-actions-cell">${A}</td>
        </tr>
      `}).join("");n.innerHTML=u}function rl({item:e,index:t}){const n=ga(e),a=o("equipment.item.actions.delete","🗑️ حذف"),s=o("equipment.item.imageAlt","صورة"),r=o("equipment.item.currency","SR"),i=Ft(),c={description:o("equipment.card.labels.description","الوصف"),status:o("equipment.card.labels.status","الحالة"),alias:o("equipment.card.labels.alias","الاسم"),quantity:o("equipment.card.labels.quantity","الكمية"),price:o("equipment.card.labels.price","السعر"),category:o("equipment.card.labels.category","القسم"),subcategory:o("equipment.card.labels.subcategory","القسم الثانوي"),barcode:o("equipment.card.labels.barcode","الباركود"),available:o("equipment.card.labels.available","متاح")},d=Number.isFinite(Number(e.qty))?Number(e.qty):0,l=Number.isFinite(Number(e.price))?Number(e.price):0,u=d.toLocaleString("en-US"),p=l.toLocaleString("en-US",{minimumFractionDigits:0,maximumFractionDigits:2}),f=Number.isFinite(Number(e.reservedQty))?Number(e.reservedQty):0,m=Number.isFinite(Number(e.maintenanceQty))?Number(e.maintenanceQty):0,y=Number.isFinite(Number(e.availableQty))?Number(e.availableQty):Math.max(d-f-m,0),b=y.toLocaleString("en-US"),g=o("equipment.card.labels.availableOfTotal","من أصل"),S=Pe(e.status);let v=`${xe(c.available)}: ${xe(b)} ${xe(g)} ${xe(u)}`,A="available";if(y===0){const z={reserved:{text:d===1?o("equipment.card.availability.reservedSingle","مؤجرة"):o("equipment.card.availability.reserved","مؤجرة بالكامل"),modifier:"reserved"},maintenance:{text:o("equipment.card.availability.maintenance","تحت الصيانة"),modifier:"maintenance"},retired:{text:o("equipment.card.availability.retired","غير متاحة"),modifier:"retired"},default:{text:o("equipment.card.availability.unavailable","غير متاحة حالياً"),modifier:"unavailable"}},H=z[S]||z.default;v=xe(H.text),A=H.modifier}const L=`<span class="equipment-card__availability equipment-card__availability--${A}">${v}</span>`,O="",q=e.desc||e.name||"—",w=e.name&&e.name!==e.desc?e.name:"",N=`
    <div class="equipment-card__info-row equipment-card__info-row--center">
      ${[{label:c.quantity,value:u},{label:c.price,value:`${p} ${r}`}].map(({label:z,value:H})=>`
            <span class="equipment-card__info-item equipment-card__info-item--stacked">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </span>
          `).join("")}
    </div>`,P=[e.category?{label:c.category,value:e.category}:null,e.sub?{label:c.subcategory,value:e.sub}:null].filter(Boolean),T=P.length?`<div class="equipment-card__categories">${P.map(({label:z,value:H})=>`
            <div class="equipment-card__category">
              <span class="equipment-card__detail-label">${z}</span>
              <span class="equipment-card__detail-value">${H}</span>
            </div>
          `).join("")}</div>`:"",I=w?`<div class="equipment-card__alias">
        <span class="equipment-card__detail-label">${c.alias}</span>
        <span class="equipment-card__detail-value">${w}</span>
      </div>`:"",B=`
    <div class="equipment-card__details">
      ${`
    <div class="equipment-card__description">
      <span class="equipment-card__label">${c.description}</span>
      <h3 class="equipment-card__title">${q}</h3>
    </div>
  `}
      ${N}
    </div>
  `,V=[],_=Zc(e),W=_?.availableBarcodes?.length?_.availableBarcodes.join(","):_?.barcode?_.barcode:"";let K="",$="";if(_.active){const z=`equipment-select-qty-${t}`,H=!!_.canSelect,ne=H?Math.max(1,Number(_.maxQuantity||_.availableBarcodes?.length||1)):1,ee=Math.max(1,Math.min(ne,99)),oe=[];for(let se=1;se<=ee;se+=1){const pe=h(String(se));oe.push(`<option value="${se}"${se===1?" selected":""}>${pe}</option>`)}const Q=H?"":" disabled",re=o("reservations.create.equipment.selector.quantityLabel","الكمية"),ge=H?`${o("reservations.create.equipment.selector.availableHint","الوحدات المتاحة")}: ${h(String(ne))}`:_.reason?_.reason:"";K=`
      <div class="equipment-card__selection-controls">
        <label class="equipment-card__selection-label" for="${z}">${re}</label>
        <select class="equipment-card__quantity-select" id="${z}" data-equipment-select-quantity${Q}>
          ${oe.join("")}
        </select>
        ${ge?`<span class="equipment-card__selection-hint">${xe(ge)}</span>`:""}
      </div>
    `;const be=o("reservations.create.equipment.selector.addToReservation","➕ أضف إلى الحجز"),Ie=H?"":" disabled",U=_.reason?` title="${xe(_.reason)}"`:"",Z=['data-equipment-action="select-reservation"',`data-selection-max="${H?ne:0}"`];W&&Z.push(`data-selection-barcodes="${xe(W)}"`),e.groupKey&&Z.push(`data-selection-group="${xe(String(e.groupKey))}"`),$=`
      <button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--select" ${Z.join(" ")}${Ie}${U}>${be}</button>
    `}i&&V.push(`<button type="button" class="btn btn-sm equipment-card__action-btn equipment-card__action-btn--delete" data-equipment-action="delete" data-equipment-index="${t}">${a}</button>`);const R=V.length?V.join(`
`):"",D=xe(q);return`
    <article
      class="equipment-card"
      data-equipment-index="${t}"
      ${e.groupKey?`data-equipment-group-key="${xe(String(e.groupKey))}"`:""}
      data-equipment-card="true"
      role="listitem"
      tabindex="0"
      aria-label="${D}"
    >
      <div class="equipment-card__header">
      <div class="equipment-card__status-block">
        ${O}
        ${L}
      </div>
        <div class="equipment-card__media-wrapper">
          <div class="equipment-card__media" aria-hidden="true">
            ${n?`<img src="${n}" alt="${s}" loading="lazy">`:'<div class="equipment-card__placeholder">📦</div>'}
          </div>
          ${B}
        </div>
      </div>
      <div class="equipment-card__body">
        ${T}
        ${I}
      </div>
      ${K||$||R?`<div class="equipment-card__actions equipment-card__actions--center">
            ${K}
            ${$}
            ${R}
          </div>`:""}
    </article>
  `}function il(e){const t=[...new Set(e.map(i=>i.category).filter(Boolean))],n=[...new Set(e.map(i=>i.sub).filter(Boolean))],a=document.getElementById("filter-category"),s=document.getElementById("filter-sub");if(a){const i=a.value;for(;a.options.length>1;)a.remove(1);t.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,a.appendChild(d)}),t.includes(i)&&(a.value=i),Fn(a)}if(s){const i=s.value;for(;s.options.length>1;)s.remove(1);n.forEach(c=>{const d=document.createElement("option");d.value=c,d.textContent=c,s.appendChild(d)}),n.includes(i)&&(s.value=i),Fn(s)}const r=document.getElementById("filter-status");r&&Fn(r)}function kn(){const e=ue();let{equipment:t=[],reservations:n=[],maintenance:a=[]}=e;if(!Array.isArray(t)||t.length===0)return ft=t||[],ft;const s=new Date;let r=!1;const i=new Set((a||[]).filter(d=>d?.status==="open").map(d=>h(String(d?.equipmentBarcode??"")).trim().toLowerCase())),c=t.map(d=>{if(!d)return d;const l=Pe(d.status),u=h(String(d.barcode??"")).trim().toLowerCase(),p=u&&i.has(u);let f=p?"maintenance":"available";if(!p&&u)for(const m of n||[]){if(!ol(m,s))continue;if(m.items?.some(b=>h(String(b?.barcode??"")).trim().toLowerCase()===u)){f="reserved";break}}return f!==l?(r=!0,{...d,status:f}):{...d,status:f}});return r?Lt(c):(ft=c,fs({equipment:ft})),ft}function ol(e,t){if(!e?.start||!e?.end)return!1;const n=new Date(e.start),a=new Date(e.end);return Number.isNaN(n.getTime())||Number.isNaN(a.getTime())?!1:n<=t&&t<a}function Ca(e,{tone:t="",icon:n="📦"}={}){const a=["equipment-empty-state"];return t&&a.push(`equipment-empty-state--${t}`),`
    <div class="${a.join(" ")}">
      <div class="equipment-empty-state__icon" aria-hidden="true">${n}</div>
      <p class="equipment-empty-state__text">${e}</p>
    </div>
  `}function Te(){const e=document.getElementById("equipment-list");if(!e)return;Ur();const t=kn(),n=Array.isArray(t)?t:Me(),a=new Map;n.forEach(b=>{if(!b)return;const g=gt(b);g&&(a.has(g)||a.set(g,[]),a.get(g).push(b))});const s=Array.from(a.values()).map(b=>{const g=b[0],S=b.reduce((w,k)=>w+(Number.isFinite(Number(k.qty))?Number(k.qty):0),0),v=["maintenance","reserved","available","retired"],A=b.map(w=>Pe(w.status)).sort((w,k)=>v.indexOf(w)-v.indexOf(k))[0]||"available",L=b.reduce((w,k)=>{const N=An(k?.qty??0)||0,P=Pe(k?.status);return P==="reserved"?w.reserved+=N:P==="maintenance"&&(w.maintenance+=N),w},{reserved:0,maintenance:0}),O=Math.max(S-L.reserved-L.maintenance,0);return{item:{...g,qty:S,status:A,variants:b,groupKey:gt(g),reservedQty:L.reserved,maintenanceQty:L.maintenance,availableQty:O},index:n.indexOf(g)}});s.sort((b,g)=>Jc(b.item,g.item));const r=document.getElementById("search-equipment")?.value||"",i=h(r).toLowerCase().trim(),c=document.getElementById("filter-category")?.value||"",d=document.getElementById("filter-sub")?.value||"",l=document.getElementById("filter-status")?.value||"",u=l?Pe(l):"";if(Ha&&!n.length){e.innerHTML=Ca(o("equipment.list.loading","⏳ جاري تحميل المعدات..."),{icon:"⏳"});return}if(fn&&!n.length){e.innerHTML=Ca(fn,{tone:"error",icon:"⚠️"});return}const p=s.filter(({item:b})=>{const g=h(String(b.barcode??"")).toLowerCase().trim(),S=Array.isArray(b.variants)?b.variants.map(q=>h(String(q.barcode??"")).toLowerCase().trim()).filter(Boolean):[],v=!i||b.name&&b.name.toLowerCase().includes(i)||b.desc&&b.desc.toLowerCase().includes(i)||g&&g.includes(i)||S.some(q=>q.includes(i))||b.category&&b.category.toLowerCase().includes(i)||b.sub&&b.sub.toLowerCase().includes(i),A=!c||b.category===c,L=!d||b.sub===d,O=!u||Pe(b.status)===u;return v&&A&&L&&O}),f=i?o("equipment.list.emptyFiltered","⚠️ لا توجد معدات مطابقة."):o("equipment.list.empty","لا توجد معدات مسجلة بعد."),m=p;e.innerHTML=m.length?m.map(rl).join(""):Ca(f);const y=document.getElementById("equipment-list-count");if(y){const b=o("equipment.list.countSuffix","عنصر"),g=h(String(m.length)),S=m.length?`${g} ${b}`:`0 ${b}`;y.textContent=S}il(n)}async function ba({showToastOnError:e=!0}={}){Ha=!0,fn="",Te();try{const t=await Ye("/equipment/?all=1"),n=Array.isArray(t?.data)?t.data.map(ma):[];Lt(n)}catch(t){fn=nn(t,"equipment.toast.fetchFailed","تعذر تحميل قائمة المعدات"),e&&E(fn,"error")}finally{Ha=!1,Te()}}function nn(e,t,n){if(e instanceof Nr){const a=e.payload?.errors;if(a&&typeof a=="object"){const s=Object.values(a)[0];if(Array.isArray(s))return s[0];if(typeof s=="string")return s}if(e.message)return e.message}return o(t,n)}async function cl(e){e.preventDefault();const t=e.target,n=t.querySelector("#new-equipment-desc")?.value?.trim()||"",a=t.querySelector("#new-equipment-barcode")?.value||"",s=h(a).trim(),r=pa(t.querySelector("#new-equipment-price")?.value||"0"),i=An(t.querySelector("#new-equipment-qty")?.value||"1"),c=t.querySelector("#new-equipment-image")?.value?.trim()||"",d=t.querySelector("#new-equipment-category")?.value?.trim()||"",l=t.querySelector("#new-equipment-sub")?.value?.trim()||"",u=t.querySelector("#new-equipment-status")?.value||"متاح";if(!n||!s){E(o("equipment.toast.missingFields","⚠️ يرجى إدخال الوصف والباركود"));return}const p=As({category:d,subcategory:l,description:n,quantity:i,unit_price:r,barcode:s,status:u,image_url:c});try{const f=await Ye("/equipment/",{method:"POST",body:p}),m=ma(f?.data),y=[...Me(),m];Lt(y),Te(),t.reset();const b=t.querySelector("#new-equipment-status");b&&(b.value="متاح"),E(o("equipment.toast.addSuccess","✅ تم إضافة المعدة"))}catch(f){const m=nn(f,"equipment.toast.addFailed","تعذر إضافة المعدة");E(m,"error")}}async function Qr(e){if(!Ft()){wn();return}const t=Me(),n=t[e];if(n&&confirm(o("equipment.toast.deleteConfirm","❌ هل أنت متأكد من حذف هذه المعدة؟")))try{n.id&&await Ye(`/equipment/?id=${encodeURIComponent(n.id)}`,{method:"DELETE"});const a=[...t];a.splice(e,1),Lt(a),Te(),E(o("equipment.toast.deleteSuccess","🗑️ تم حذف المعدة"))}catch(a){const s=nn(a,"equipment.toast.deleteFailed","تعذر حذف المعدة، يرجى المحاولة مجدداً");E(s,"error")}}async function ll(e,t){const n=Me(),a=n[e];if(!a)throw new Error("Equipment item not found");if(!a.id){const r=[...n];r[e]={...r[e],...t},Lt(r),Te();return}const s=As({category:t.category,subcategory:t.sub,description:t.desc,quantity:t.qty,unit_price:t.price,barcode:t.barcode,status:t.status,image_url:t.image});try{const r=await Ye(`/equipment/?id=${encodeURIComponent(a.id)}`,{method:"PATCH",body:s}),i=ma(r?.data),c=[...n];c[e]=i,Lt(c),Te(),E(o("equipment.toast.updateSuccess","✅ تم تحديث بيانات المعدة بنجاح"))}catch(r){const i=nn(r,"equipment.toast.updateFailed","تعذر تحديث بيانات المعدة");throw E(i,"error"),r}}function Cn(){Te()}function Gr(e){const n=Me()[e];if(!n)return;jt=e;const a=fa(n),s=a[0]||n,r=a.reduce((d,l)=>d+(Number.isFinite(Number(l.qty))?Number(l.qty):0),0),i=["maintenance","reserved","available","retired"],c=a.map(d=>Pe(d.status)).sort((d,l)=>i.indexOf(d)-i.indexOf(l))[0]||Pe(s.status);document.getElementById("edit-equipment-index").value=e,Is({category:s.category||"",subcategory:s.sub||"",description:s.desc||s.description||"",quantity:String(r||s.qty||0),price:s.price!=null?String(s.price):"0",image:ga(s)||"",barcode:s.barcode||"",status:s.status||c}),Xt(!1),Ct=Qn(),ya(s),Kr(s),_t={groupKey:gt(s),barcode:String(s.barcode||""),id:s.id||null},Kc(document.getElementById("editEquipmentModal"))?.show()}function dl(e){const t=e.target.closest('[data-equipment-action="select-reservation"]');if(t){e.preventDefault(),e.stopPropagation();const s=t.closest('[data-equipment-card="true"]'),r=s?.querySelector("[data-equipment-select-quantity]");let i=Number.parseInt(r?.value||"1",10);(!Number.isFinite(i)||i<=0)&&(i=1);const c=Number.parseInt(t.dataset.selectionMax||"0",10);Number.isFinite(c)&&c>0&&i>c&&(i=c);const l=(t.dataset.selectionBarcodes||"").split(",").map(m=>m.trim()).filter(m=>m.length>0),u=s?.querySelector(".equipment-card__title")?.textContent?.trim()||"",p=s?.dataset.equipmentGroupKey||t.dataset.selectionGroup||"";Rc({barcodes:l,quantity:i,groupKey:p,description:u})||E(o("reservations.create.equipment.selector.selectionInactive","⚠️ يرجى العودة إلى نموذج الحجز وتفعيل اختيار المعدات من جديد"));return}if(e.target.closest("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const n=e.target.closest('[data-equipment-action="delete"]');if(n){e.preventDefault(),e.stopPropagation();const s=Number(n.dataset.equipmentIndex);Number.isNaN(s)||Qr(s).catch(r=>{console.error("❌ [equipment.js] deleteEquipment",r)});return}const a=e.target.closest('[data-equipment-card="true"]');if(a){const s=Number(a.dataset.equipmentIndex);Number.isNaN(s)||Gr(s)}}function ul(e){if(e.defaultPrevented||e.target.closest("[data-equipment-action]")||e.target.matches("[data-equipment-select-quantity]")||e.target.closest(".equipment-card__selection-controls"))return;const t=e.target.closest('[data-equipment-card="true"]');if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();const n=Number(t.dataset.equipmentIndex);Number.isNaN(n)||Gr(n)}}function ml(e){const t=e.target.closest('[data-variant-action="delete"]');if(t){const n=Number(t.dataset.variantIndex);Number.isNaN(n)||Qr(n).catch(a=>{console.error("❌ [equipment.js] deleteEquipment",a)});return}}function Wr(){if(!_t||!document.getElementById("editEquipmentModal")?.classList.contains("show"))return;const n=Me(),a=_t.id?n.find(d=>String(d.id)===String(_t.id)):null,s=_t.groupKey,r=s?n.find(d=>gt(d)===s):null,i=a||r;if(!i){Gn();return}const c=n.findIndex(d=>d===i);if(c>=0){const d=document.getElementById("edit-equipment-index");d&&(d.value=String(c)),jt=c}if(Kr(i),!ua){const d=fa(i),l=d[0]||i,u=d.reduce((m,y)=>m+(Number.isFinite(Number(y.qty))?Number(y.qty):0),0),p=["maintenance","reserved","available","retired"],f=d.map(m=>Pe(m.status)).sort((m,y)=>p.indexOf(m)-p.indexOf(y))[0]||Pe(l.status);Is({category:l.category||"",subcategory:l.sub||"",description:l.desc||l.description||"",quantity:String(u||l.qty||0),price:l.price!=null?String(l.price):"0",image:ga(l)||"",barcode:l.barcode||"",status:l.status||f}),Ct=Qn()}ya(primary)}function pl(){document.getElementById("search-equipment")?.addEventListener("input",Cn),document.getElementById("filter-category")?.addEventListener("change",Cn),document.getElementById("filter-sub")?.addEventListener("change",Cn),document.getElementById("filter-status")?.addEventListener("change",Cn),document.getElementById("add-equipment-form")?.addEventListener("submit",cl);const e=document.getElementById("equipment-clear-btn");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",a=>{a.preventDefault(),al().catch(s=>{console.error("❌ [equipment.js] clearEquipment",s)})}),e.dataset.listenerAttached="true");const t=document.getElementById("equipment-list");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",dl),t.addEventListener("keydown",ul),t.dataset.listenerAttached="true");const n=document.getElementById("equipment-variants-table-body");n&&!n.dataset.listenerAttached&&(n.addEventListener("click",ml),n.dataset.listenerAttached="true"),["edit-equipment-quantity","edit-equipment-price","edit-equipment-barcode"].forEach(a=>{const s=document.getElementById(a);Xc(s)})}document.getElementById("save-equipment-changes")?.addEventListener("click",async()=>{if(!ua){Ct=Qn(),Xt(!0);return}const e=document.getElementById("edit-equipment-index").value,t=Number.parseInt(e,10);if(Number.isNaN(t)){E(o("equipment.toast.updateFailed","تعذر تحديث بيانات المعدة"),"error");return}const n={category:document.getElementById("edit-equipment-category").value,sub:document.getElementById("edit-equipment-subcategory").value,desc:document.getElementById("edit-equipment-description").value,qty:An(document.getElementById("edit-equipment-quantity").value)||1,price:pa(document.getElementById("edit-equipment-price").value)||0,barcode:h(document.getElementById("edit-equipment-barcode").value).trim(),status:document.getElementById("edit-equipment-status").value,image:document.getElementById("edit-equipment-image").value};try{await ll(t,n),Ct=Qn(),Xt(!1),Wr()}catch(a){console.error("❌ [equipment.js] editEquipment",a)}});document.addEventListener("DOMContentLoaded",()=>{pl(),Te(),ba();const e=document.getElementById("equipment-edit-cancel");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{if(Ct&&Is(Ct),jt!=null){const a=Me()[jt];if(a){const r=fa(a)[0]||a;ya(r)}}Xt(!1)}),e.dataset.listenerAttached="true");const t=document.getElementById("save-equipment-changes");t&&!t.dataset.listenerAttached&&(t.dataset.listenerAttached="true",t.dataset.mode||(t.dataset.mode="view"))});document.addEventListener("language:changed",()=>{if(Te(),Xt(ua),jt!=null){const t=Me()[jt];if(t){const a=fa(t)[0]||t;ya(a)}}});document.addEventListener("equipment:refreshRequested",()=>{ba({showToastOnError:!1})});document.addEventListener(lc.USER_UPDATED,()=>{Te()});document.addEventListener("equipment:changed",()=>{Wr()});document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("editEquipmentModal");e&&!e.dataset.variantsListenerAttached&&(e.addEventListener("hidden.bs.modal",()=>{_t=null,Gn(),jt=null,Ct=null,Xt(!1)}),e.dataset.variantsListenerAttached="true")});typeof document<"u"&&!sr&&(document.addEventListener(tn.change,()=>{Ur(),Te()}),sr=!0);function Oe(e){let t=Number(e);if(!Number.isFinite(t))return 0;let n=0;for(;Math.abs(t)>1e5&&n<8;)t/=10,n+=1;return Number(t.toFixed(2))}function mn(e){return h(String(e??"")).trim().toLowerCase()}function _e(e=""){return h(String(e)).trim().toLowerCase()}const fl=2;function yl(e){const t=Number(e);return Number.isFinite(t)?t.toFixed(fl):"0.00"}function ir(e={}){const t=Number(e?.qty);return Number.isFinite(t)&&t>0?Oe(t):1}function _n(e={}){const t=e?.desc||e?.description||e?.name||"",n=_e(t),a=yl(e?.price??e?.unitPrice??e?.unit_price??0);return`${n}::${a}`}function Rt(e=[]){const t=new Map;return e.forEach((n,a)=>{const s=_n(n);if(!s)return;if(!t.has(s)){const i=n?.desc||n?.description||n?.name||"",c=_e(i),d=cr(n),l=n?.image||n?.imageUrl||n?.img||"";t.set(s,{key:s,description:i,normalizedDescription:c,unitPrice:d,image:l,items:[],itemIndices:[],barcodes:[]})}const r=t.get(s);r.items.push(n),r.itemIndices.push(a),n?.barcode&&r.barcodes.push(String(n.barcode))}),Array.from(t.values()).map(n=>({...n,quantity:n.items.reduce((a,s)=>a+ir(s),0)})).map(n=>{const a=n.quantity||0,s=n.items.reduce((i,c)=>{const d=cr(c),l=ir(c);return i+d*l},0),r=a>0?s/a:n.unitPrice;return{...n,quantity:a,count:a,totalPrice:s,unitPrice:r}})}function or(e={}){return(ia(e)||[]).map(n=>({...n,normalizedBarcode:n?.normalizedBarcode??mn(n?.barcode),qty:Number.isFinite(Number(n?.qty))?Number(n.qty):1,price:Number.isFinite(Number(n?.price))?Number(n.price):0}))}function Va(e={}){const t=e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1,n=Number(t);return Number.isFinite(n)&&n>0?n:1}function gl(e={},t=[],n=null){const a=e.unit_price??e.unitPrice??e.price,s=Number(a);if(Number.isFinite(s)&&s>0)return s;const r=e.total_price??e.totalPrice??e.total,i=Number(r),c=Number.isFinite(Number(n))&&Number(n)>0?Number(n):Va(e);if(Number.isFinite(i)&&i>0&&c>0)return Oe(Number((i/c).toFixed(2)));if(Array.isArray(t)&&t.length){const d=t.reduce((l,u)=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=Number.isFinite(Number(u.qty))?Number(u.qty):1;return l+p*f},0);if(d>0&&c>0)return Oe(Number((d/c).toFixed(2)))}return 0}function ks(e={}){const t=Array.isArray(e?.items)?e.items:[],n=Rt(t),a=new Map,s=(p,f=0,m="packages")=>{if(!p||typeof p!="object")return;const b=Wt(p?.package_code??p?.packageId??p?.package_id??p?.code??p?.id??p?.barcode??`pkg-${f}`)||`pkg-${f}`;if(!a.has(b)){a.set(b,{source:p,normalizedId:b,index:f,itemSource:m==="items"?p:null});return}const g=a.get(b);if(g.source||(g.source=p),m==="items"&&(g.itemSource=p,g.source&&typeof g.source=="object")){const S=Array.isArray(g.source.packageItems)&&g.source.packageItems.length>0,v=Array.isArray(p.packageItems)&&p.packageItems.length>0;!S&&v&&(g.source={...g.source,packageItems:p.packageItems}),!g.source.image&&p.image&&(g.source={...g.source,image:p.image})}};Array.isArray(e?.packages)&&e.packages.forEach((p,f)=>s(p,f,"packages")),t.forEach((p,f)=>{p&&typeof p=="object"&&(p.type==="package"||Array.isArray(p?.packageItems))&&s(p,f+a.size,"items")});const r=[],i=new Set,c=new Set;a.forEach(({source:p,itemSource:f=null,normalizedId:m},y)=>{const b=p||{},g=f&&typeof f=="object"?f:null;let S=or(b);(!Array.isArray(S)||S.length===0)&&g&&(S=or(g)),S.forEach(I=>{const F=I?.normalizedBarcode??mn(I?.barcode);F&&i.add(F);const B=I?.equipmentId??I?.equipment_id??null;B!=null&&c.add(String(B))});let v=Va(b);if(g){const I=Va(g);Number.isFinite(I)&&I>0&&(v=I)}(!Number.isFinite(v)||v<=0)&&(v=1);let A=gl(b,S,v);const L=[g?.price,g?.unit_price,g?.unitPrice];for(const I of L){const F=Number(I);if(Number.isFinite(F)&&F>0){A=F;break}}A=Oe(A);const O=[g?.total,g?.total_price,g?.totalPrice,b?.total,b?.total_price,b?.totalPrice];let q=NaN;for(const I of O){const F=Number(I);if(Number.isFinite(F)&&F>=0){q=F;break}}Number.isFinite(q)||(q=A*v),q=Oe(q);const w=b?.package_code??b?.packageId??b?.package_id??b?.barcode??g?.package_code??g?.packageId??g?.package_id??g?.barcode??null;if(w){const I=mn(w);I&&i.add(I)}const k=S.map(I=>h(String(I?.barcode??I?.normalizedBarcode??""))).filter(Boolean),P=[b?.name,b?.package_name,b?.title,g?.name,g?.desc,g?.package_name,h(String(w??y))].find(I=>I!=null&&String(I).trim()!=="")||h(String(w??y)),T=S.find(I=>I?.image)?.image??b?.image??g?.image??null;r.push({key:`package::${y}`,description:P,normalizedDescription:h(String(P)),unitPrice:A,totalPrice:q,quantity:v,count:v,image:T,barcodes:k,barcode:w,items:[{type:"package",packageItems:S,packageId:m,desc:P,price:A,qty:v,barcode:w}],type:"package",packageItems:S,packageId:m})});const d=new Set(Array.from(i).map(p=>mn(p)).filter(Boolean)),l=n.filter(p=>!(p.items.some(y=>y?.type==="package")&&r.length>0||p.items.every(y=>{const b=vt(y),g=b!=null?String(b):null;if(g&&c.has(g))return!0;const S=y?.barcode?mn(y.barcode):null;return!!(S&&d.has(S))})));return{groups:r.length?[...r,...l]:n,packageGroups:r,groupedItems:n,filteredGroupedItems:l,packagesMap:a}}function vt(e={}){const t=[e?.id,e?.equipment_id,e?.equipmentId,e?.item_id,e?.itemId];for(const n of t)if(!(n==null||n===""))return String(n);return null}function cr(e={}){const t=e?.price??e?.unit_price??e?.unitPrice??0,n=Number(t);return Number.isFinite(n)?n:0}function _s(e){if(!e?.end)return!1;const t=new Date(e.end);return Number.isNaN(t.getTime())?!1:t<new Date}function bl(e=""){switch(String(e??"").trim().toLowerCase()){case"confirmed":case"مؤكد":return"confirmed";case"in_progress":case"in-progress":case"قيد التنفيذ":case"جاري":return"in_progress";case"completed":case"مكتمل":return"completed";case"cancelled":case"ملغي":return"cancelled";case"pending":case"draft":case"قيد الانتظار":case"بانتظار التأكيد":case"معلق":default:return"pending"}}function qt(e={},t=null){const n=e?.confirmed===!0||e?.confirmed==="true",a=e?.projectId??e?.project_id??null,s=a!=null&&a!==""&&a!=="null",r=s?bl(t?.status??t?.status_label??t?.statusLabel??""):null,i=s&&(t?.confirmed===!0||["confirmed","in_progress","completed"].includes(r));return{reservationConfirmed:n,projectLinked:s,projectStatus:r,projectConfirmed:i,effectiveConfirmed:s?i:n}}const Xr="projects:create:draft",Jr="projects.html#projects-section";let Ua=null,Yr=[],Ka=new Map,Qa=new Map,Wn=new Map,La=!1,Rn=null,lr=!1,Zr=[];function hl(e){if(!e)return null;let t=Zr.find(a=>a.id===e)||null;if(t)return t;const n=fc(e);return n?(t={id:e,name:gc(n)||e,price:yc(n),items:ia(n),raw:n},t):null}function Xn(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Jn(e){return h(String(e||"")).trim().toLowerCase()}function vl(e={}){const t=String(e?.desc||e?.description||"")?.trim(),n=h(String(e?.barcode||"")).trim();return n?`${t} | ${n}`:t}function ei(e){const t=h(String(e||""));if(!t.trim())return{description:"",barcode:""};const[n,...a]=t.split("|");return{description:n.trim(),barcode:a.join("|").trim()}}function ti(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function ni(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function ai(e,t){if(e){if(t==null||!Number.isFinite(t)||t<=0){e.value="";return}e.value=h(String(t))}}function Bt(e){switch(e){case"maintenance":return o("reservations.toast.equipmentMaintenance","⚠️ هذه المعدة قيد الصيانة ولا يمكن إضافتها حالياً");case"reserved":return o("reservations.toast.equipmentReserved","⚠️ هذه المعدة محجوزة حالياً ولا يمكن إضافتها");case"retired":return o("reservations.toast.equipmentRetired","⚠️ هذه المعدة خارج الخدمة حالياً");default:return o("reservations.toast.equipmentUnavailable","⚠️ هذه المعدة غير متاحة حالياً")}}function $s(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-customer-input"),hidden:document.getElementById("res-customer"),list:document.getElementById("res-customer-options")}}function Mt(){return typeof document>"u"?{input:null,hidden:null,list:null}:{input:document.getElementById("res-project-input"),hidden:document.getElementById("res-project"),list:document.getElementById("res-project-options")}}function Fe(){const{input:e,hidden:t}=Mt();return e?.dataset?.pendingLinked==="true"?!0:!!t?.value}function At(e,t){if(!e)return;const n=new Set([e]),a=e.parentElement;if(a&&n.add(a),e.id){const r=document.querySelector(`label[for="${e.id}"]`);r&&n.add(r)}const s=r=>{t()&&E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error")};n.forEach(r=>{!r||r.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(i=>{r.addEventListener(i,s,{capture:!0})}),r.dataset.linkedGuardAttached="true")})}function si(e,t,{allowPartial:n=!1}={}){const a=_e(t);if(!a)return null;const s=e.get(a);if(s)return s;if(!n)return null;const r=[];return e.forEach((i,c)=>{c.includes(a)&&r.push(i)}),r.length===1?r[0]:null}function Ga(e,t={}){return si(Ka,e,t)}function Wa(e,t={}){return si(Qa,e,t)}function De(e,t){if(!e)return;const n=t??e.value;e.classList.remove("payment-status-select--paid","payment-status-select--unpaid","payment-status-select--partial"),n==="paid"?e.classList.add("payment-status-select--paid"):n==="partial"?e.classList.add("payment-status-select--partial"):e.classList.add("payment-status-select--unpaid")}function ri(e){Yr=Array.isArray(e)?[...e]:[]}function Ns(){return Yr}function Ps(e){return e&&Ns().find(t=>String(t.id)===String(e))||null}function dr(e){if(!e)return"";const t=typeof e.title=="string"?e.title.trim():"";return t||o("projects.fallback.untitled","مشروع بدون اسم")}function Jt(e="res-company-share"){const t=document.getElementById(e);if(!t||!t.checked)return null;const n=t.dataset.companyShare??t.value??ct,a=h(String(n).replace("%","").trim()),s=parseFloat(a);return Number.isFinite(s)?s:ct}function Ue(e="res-company-share"){const t=document.getElementById(e);if(!t)return;let n=t.dataset.companyShare??t.value??ct,a=h(String(n).replace("%","").trim()),s=parseFloat(a);(!Number.isFinite(s)||s<=0)&&(s=ct),t.dataset.companyShare=String(s),t.checked=!0}function Xa(e){const t=document.getElementById("res-tax"),n=document.getElementById("res-company-share");if(!t||!n)return;if(La){le();return}La=!0;const a=()=>{La=!1,le()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),a();return}t.checked||(t.checked=!0),Ue()}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ue():n.checked&&(n.checked=!1));a()}function ql(e){if(!e)return!1;if(e.confirmed===!0)return!0;const t=typeof e.status=="string"?e.status.toLowerCase():"";return["confirmed","in_progress","completed"].includes(t)}function ur(e,t){if(!e)return"";if(e[t])return e[t];if(e[`${t}Datetime`])return e[`${t}Datetime`];if(e[`${t}datetime`])return e[`${t}datetime`];if(e[`${t}_datetime`])return e[`${t}_datetime`];const n=e[`${t}Date`]??e[`${t}_date`],a=e[`${t}Time`]??e[`${t}_time`];if(n){const s=typeof a=="string"&&a.trim()?a.trim():"00:00";return`${n}T${s}`}return""}function mr(e){if(!e)return"";const t=e.customerName??e.full_name??e.fullName??e.name??e.customer_name??"";return typeof t=="string"?t.trim():String(t||"").trim()}function it({selectedValue:e="",resetInput:t=!1}={}){const{input:n,hidden:a,list:s}=$s();if(!n||!a||!s)return;const r=ys()||[],i=o("reservations.create.placeholders.client","اختر عميلًا (اختياري)"),c=o("customers.fallback.unnamed","عميل بدون اسم");n.setAttribute("placeholder",i);const d=new Set;Ka=new Map;const l=r.filter(m=>m&&m.id!=null).map(m=>({id:String(m.id),label:mr(m)||c})).filter(m=>{if(!m.label)return!1;const y=_e(m.label);return!y||d.has(y)?!1:(d.add(y),Ka.set(y,m),!0)}).sort((m,y)=>m.label.localeCompare(y.label,void 0,{sensitivity:"base"}));s.innerHTML=l.map(m=>`<option value="${Xn(m.label)}"></option>`).join("");const u=t?"":n.value,p=e?String(e):a.value?String(a.value):"",f=p?r.find(m=>String(m.id)===p):null;if(f){const m=mr(f)||c;a.value=String(f.id),n.value=m,n.dataset.selectedId=String(f.id)}else a.value="",n.dataset.selectedId="",n.value=t?"":u}function Yt({selectedValue:e="",projectsList:t=null,resetInput:n=!1}={}){const{input:a,hidden:s,list:r}=Mt();if(!a||!s||!r)return;const i=Array.isArray(t)?t:Ns()||[],c=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)");a.setAttribute("placeholder",c);const d=[...i].filter(b=>b&&b.id!=null).sort((b,g)=>String(g.createdAt||g.start||"").localeCompare(String(b.createdAt||b.start||""))),l=n?"":a.value,u=o("projects.fallback.untitled","مشروع بدون اسم"),p=new Set;Qa=new Map;const f=d.map(b=>{const g=dr(b)||u;return{id:String(b.id),label:g}}).filter(b=>{if(!b.label)return!1;const g=_e(b.label);return!g||p.has(g)?!1:(p.add(g),Qa.set(g,b),!0)});r.innerHTML=f.map(b=>`<option value="${Xn(b.label)}"></option>`).join("");const m=e?String(e):s.value?String(s.value):"",y=m?d.find(b=>String(b.id)===m):null;if(y){const b=dr(y)||u;s.value=String(y.id),a.value=b,a.dataset.selectedId=String(y.id)}else s.value="",a.dataset.selectedId="",a.value=n?"":l}function Yn(e,t,n){const{date:a,time:s}=jr(n),r=document.getElementById(e),i=document.getElementById(t);if(r){if(a)if(r._flatpickr){const c=r._flatpickr.config?.dateFormat||"Y-m-d";r._flatpickr.setDate(a,!1,c)}else r.value=a;else r._flatpickr?r._flatpickr.clear():r.value="";r.dispatchEvent(new Event("input",{bubbles:!0})),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(i){if(s)if(i._flatpickr){const c=i._flatpickr.config?.dateFormat||"H:i";i._flatpickr.setDate(s,!1,c)}else i.value=s;else i._flatpickr?i._flatpickr.clear():i.value="";i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))}}function ii(e,{forceNotes:t=!1,skipProjectSelectUpdate:n=!1}={}){if(!e)return;const a=e?.id!=null?String(e.id):"";n||Yt({selectedValue:a});const r=(ys()||[]).find(u=>String(u.id)===String(e.clientId)),i=r?.id!=null?String(r.id):"";it(i?{selectedValue:i}:{selectedValue:"",resetInput:!0});const c=ur(e,"start"),d=ur(e,"end");c&&Yn("res-start","res-start-time",c),d&&Yn("res-end","res-end-time",d);const l=document.getElementById("res-notes");l&&e.description&&(t||!l.value)&&(l.value=e.description),le(),bt()}function oi({projectsList:e=null,preselectId:t=null}={}){const n=document.getElementById("res-project");if(!n)return;const{projects:a}=e?{projects:e}:ue(),s=Array.isArray(a)?a:[];ri(s);const r=t!=null?String(t):n.value?String(n.value):"";Yt({selectedValue:r,projectsList:s}),bt(),le()}function bt(){const{input:e,hidden:t}=Mt(),n=document.getElementById("res-tax"),a=document.getElementById("res-company-share"),s=document.getElementById("res-payment-status"),r=document.getElementById("res-payment-progress-type"),i=document.getElementById("res-payment-progress-value"),c=document.getElementById("res-discount"),d=document.getElementById("res-discount-type"),l=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),p=e?.dataset?.pendingLinked==="true"||!!t?.value;if(n&&(At(n,Fe),a&&At(a,Fe)),s&&At(s,Fe),r&&At(r,Fe),i&&At(i,Fe),c&&At(c,Fe),d&&At(d,Fe),p)n&&(n.checked=!1,n.disabled=!0,n.classList.add("disabled","reservation-input-disabled"),n.title=l),a&&(a.checked=!1,a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=l),s&&(s.value="unpaid",De(s,"unpaid"),s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=l),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=l),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=l),c&&(c.value="0",c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=l),d&&(d.value="percent",d.disabled=!0,d.classList.add("reservation-input-disabled"),d.title=l);else{if(n){const f=n.disabled;n.disabled=!1,n.classList.remove("disabled","reservation-input-disabled"),n.title="",f&&(n.checked=!1)}a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.disabled=!1,d.classList.remove("reservation-input-disabled"),d.title="")}Xa("tax"),le()}function Ts(){const{input:e,hidden:t}=Mt();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Wa(s,{allowPartial:a}):null;if(r){t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id);const i=Ps(r.id);i?ii(i,{skipProjectSelectUpdate:!0}):(bt(),le())}else t.value="",e.dataset.selectedId="",bt(),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Wa(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function js(){const{input:e,hidden:t}=$s();if(!e||!t||e.dataset.listenerAttached)return;const n=(a=!1)=>{const s=e.value.trim(),r=s?Ga(s,{allowPartial:a}):null;r?(t.value=String(r.id),e.value=r.label,e.dataset.selectedId=String(r.id)):(t.value="",e.dataset.selectedId=""),le()};e.addEventListener("input",()=>{const a=e.value.trim(),s=a?Ga(a):null;s?(t.value=String(s.id),e.dataset.selectedId=String(s.id)):a||(t.value="",e.dataset.selectedId="")}),e.addEventListener("change",()=>n(!0)),e.addEventListener("blur",()=>n(!0)),e.addEventListener("keydown",a=>{a.key==="Enter"&&(a.preventDefault(),n(!0))}),e.dataset.listenerAttached="true"}function Sl(){const e=new URLSearchParams(window.location.search),t=e.get("reservationProjectContext");if(!t){yn({clearValue:!0});return}let n=null;try{const l=decodeURIComponent(t);n=JSON.parse(l)}catch(l){console.warn("⚠️ [reservations/createForm] Failed to decode project context",l)}e.delete("reservationProjectContext");const a=e.toString(),s=`${window.location.pathname}${a?`?${a}`:""}${window.location.hash||""}`;if(window.history.replaceState({},document.title,s),yn({clearValue:!1}),!n)return;n.fromProjectForm&&(Rn={draftStorageKey:n.draftStorageKey||Xr,returnUrl:n.returnUrl||Jr});const r=document.getElementById("res-project");if(n.projectId){r&&(Yt({selectedValue:String(n.projectId)}),bt());const l=Ps(n.projectId);l?ii(l,{forceNotes:!!n.forceNotes}):le(),yn()}else{r&&Yt({selectedValue:""});const l=n.projectTitle?n.projectTitle:o("reservations.create.project.pendingPlaceholder","سيتم الربط بعد حفظ المشروع الحالي");Bl(o("reservations.create.project.pendingTooltip","سيتم تفعيل اختيار المشروع بعد حفظ المشروع الحالي"),l)}n.start&&Yn("res-start","res-start-time",n.start),n.end&&Yn("res-end","res-end-time",n.end);const i=document.getElementById("res-customer-input"),c=document.getElementById("res-customer");if(n.customerId){const u=(ys()||[]).find(p=>String(p.id)===String(n.customerId));u?.id!=null&&(it({selectedValue:String(u.id)}),c&&(c.value=String(u.id)),i&&(i.value=u.customerName||u.name||i.value))}else n.customerName&&i?(it({selectedValue:""}),i.value=n.customerName,i.dataset.selectedId="",c&&(c.value="")):it({selectedValue:""});const d=document.getElementById("res-notes");d&&n.description&&!d.value&&(d.value=n.description),le()}function zt(){const e=document.getElementById("res-start")?.value?.trim(),t=document.getElementById("res-end")?.value?.trim(),n=document.getElementById("res-start-time")?.value?.trim()||"00:00",a=document.getElementById("res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:vn(e,n),end:vn(t,a)}}function ci(e){const t=Jn(e);if(t){const c=Wn.get(t);if(c)return c}const{description:n,barcode:a}=ei(e);if(a){const c=da(a);if(c)return c}const s=_e(n||e);if(!s)return null;let r=Fr();if(!r?.length){const c=ue();r=Array.isArray(c?.equipment)?c.equipment:[],r.length&&Dr(r)}const i=r.find(c=>_e(c?.desc||c?.description||"")===s);return i||r.find(c=>_e(c?.desc||c?.description||"").includes(s))||null}function li(e,t="equipment-description-options"){const n=Jn(e);if(!n)return!1;const a=document.getElementById(t);if(a&&a.options&&Array.from(a.options).some(d=>Jn(d.value)===n)||Wn.has(n))return!0;const{description:s}=ei(e);if(!s)return!1;const r=_e(s);return r?(Fr()||[]).some(c=>_e(c?.desc||c?.description||"")===r):!1}const El={available:0,reserved:1,maintenance:2,retired:3};function xl(e){return El[e]??5}function pr(e){switch(e){case"available":return o("reservations.equipment.status.available","متاح");case"reserved":return o("reservations.equipment.status.reserved","محجوز");case"maintenance":return o("reservations.equipment.status.maintenance","صيانة");case"retired":return o("reservations.equipment.status.retired","خارج الخدمة");default:return o("reservations.equipment.status.unknown","الحالة غير معروفة")}}function wl(e){const t=e.value;if(e.bestStatus==="available"&&e.statuses.size===1)return t;const n=e.bestStatus!=="available"?e.bestStatus:[...e.statuses].find(s=>s!=="available")||e.bestStatus;if(n==="available")return`${t} — ${pr(n)}`;const a=o("reservations.equipment.status.unavailable","غير متاح");return`${t} — ${a} (${pr(n)})`}function ht(){const e=document.getElementById("equipment-description-options"),t=document.getElementById("edit-res-equipment-description-options"),n=kn(),a=ue(),s=Array.isArray(n)&&n.length?n:a?.equipment||[],r=Array.isArray(s)?s:[];Dr(r);const i=new Map;r.forEach(l=>{const u=vl(l),p=Jn(u);if(!p||!u)return;const f=lt(l),m=xl(f),y=i.get(p);if(!y){i.set(p,{normalized:p,value:u,bestItem:l,bestStatus:f,bestPriority:m,statuses:new Set([f])});return}y.statuses.add(f),m<y.bestPriority&&(y.bestItem=l,y.bestStatus=f,y.bestPriority=m,y.value=u)}),Wn=new Map;const d=Array.from(i.values()).sort((l,u)=>l.value.localeCompare(u.value,"ar",{sensitivity:"base"})).map(l=>{Wn.set(l.normalized,l.bestItem);const u=wl(l),p=Xn(l.value);if(u===l.value)return`<option value="${p}"></option>`;const f=Xn(u);return`<option value="${p}" label="${f}"></option>`}).join("");e&&(e.innerHTML=d),t&&(t.innerHTML=d)}function di(e,t,n={}){const{silent:a=!1}=n,s=te(e);if(!s)return{success:!1,message:null};const{start:r,end:i}=zt();if(!r||!i){const y=o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات");return a||E(y),{success:!1,message:y}}const c=et();if(Cs(c).has(s)){const y=o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز");return a||E(y),{success:!1,message:y}}const l=gs(s,r,i);if(l.length){const y=l.map(g=>g.name).join(", "),b=o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${y}`);return a||E(b),{success:!1,message:b}}if(Ze(s,r,i)){const y=o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية");return a||E(y),{success:!1,message:y}}const u=da(s);if(!u){const y=o("reservations.toast.barcodeNotFound","❌ الباركود غير موجود");return a||E(y),{success:!1,message:y}}const p=lt(u);if(p==="maintenance"||p==="retired"){const y=Bt(p);return a||E(y),{success:!1,message:y}}const f=vt(u);if(!f){const y=o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف");return a||E(y),{success:!1,message:y}}oa({id:f,equipmentId:f,barcode:s,desc:u.desc,qty:1,price:u.price,image:Dt(u)}),t&&(t.value=""),dt(),le();const m=o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح");return a||E(m),{success:!0,message:m,barcode:s}}function Ja(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ci(t);if(!n){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const a=Vc(n.barcode),s=lt(a||n);if(s==="maintenance"||s==="retired"){E(Bt(s));return}const r=te(n.barcode);if(!r){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const i=vt(n);if(!i){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const c={id:i,equipmentId:i,barcode:r,desc:n.desc||n.description||n.name||"",qty:1,price:Number.isFinite(Number(n.price))?Number(n.price):0,image:Dt(n)},{start:d,end:l}=zt();if(!d||!l){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const u=et();if(Cs(u).has(r)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const f=gs(r,d,l);if(f.length){const m=f.map(y=>y.name).join(", ");E(o("reservations.toast.equipmentBlockedByPackage",`⚠️ لا يمكن إضافة هذه المعدة لأنها جزء من حزمة محجوزة: ${m}`));return}if(Ze(r,d,l)){E(o("reservations.toast.equipmentTimeConflict","⚠️ لا يمكن إضافة المعدة لأنها محجوزة في نفس الفترة الزمنية"));return}oa(c),dt(),le(),E(o("reservations.toast.equipmentAdded","✅ تم إضافة المعدة بنجاح")),e.value=""}function Il(){ht();const e=document.getElementById("equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ja(e))});const t=()=>{li(e.value,"equipment-description-options")&&Ja(e)};e.addEventListener("focus",()=>{if(ht(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}function fr(e,t){if(!e)return;const n=!!t;e.dataset.selectionActive=n?"true":"false",e.setAttribute("aria-pressed",n?"true":"false"),e.classList.toggle("reservation-select-equipment-btn--active",n)}function Cs(e=et()){const t=new Set;return e.forEach(n=>{if(!n)return;const a=te(n.barcode??n.normalizedBarcode);a&&t.add(a),Array.isArray(n.packageItems)&&n.packageItems.forEach(s=>{const r=te(s?.normalizedBarcode??s?.barcode);r&&t.add(r)})}),t}function Al(){const e=document.getElementById("open-equipment-selector");e&&(e.dataset.listenerAttached||(e.addEventListener("click",()=>{const{start:t,end:n}=zt();if(!t||!n){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}Fc({mode:"create",source:"reservation-form",returnTab:"reservations-tab",returnSubTab:"create-tab",start:t,end:n});const a=document.querySelector('[data-tab="equipment-tab"]');a?(a.click(),window.requestAnimationFrame(()=>{setTimeout(()=>{document.getElementById("search-equipment")?.focus()},300)})):E(o("reservations.toast.equipmentTabUnavailable","⚠️ تعذر فتح تبويب المعدات حالياً"))}),e.dataset.listenerAttached="true"),e.dataset.selectionObserverAttached||(document.addEventListener(tn.change,t=>{fr(e,t?.detail?.active)}),e.dataset.selectionObserverAttached="true"),fr(e,Vr()))}function kl(e){if(!e||!e.detail||!document.getElementById("reservation-form"))return;const t=e.detail,n=t.selection?.mode||t.selection?.source||"";if(n==="package-manager"||n==="equipment-packages")return;const a=Array.isArray(t.barcodes)?t.barcodes:[],s=Number.isInteger(t.quantity)&&t.quantity>0?t.quantity:1,r=a.length?a:t.barcode?[t.barcode]:[];if(!r.length)return;let i=0,c=null;const d=[],l=new Set;r.forEach(p=>{const f=te(p);f&&!l.has(f)&&(l.add(f),d.push(f))});const u=Math.min(s,d.length);for(let p=0;p<u;p+=1){const f=d[p],m=di(f,null,{silent:!0});m.success&&(i+=1),m.message&&(c=m.message)}if(i>0){const f=o("reservations.toast.equipmentAddedBulk","✅ تم إضافة {count} معدة إلى الحجز").replace("{count}",h(String(i)));E(f)}else c&&E(c)}function ui(){Al(),!(lr||typeof document>"u")&&(document.addEventListener(tn.requestAdd,kl),lr=!0)}function $n(){if(typeof document>"u")return{modeRadios:[],singleContainer:null,packageContainer:null,packageSelect:null,packageHint:null,packageAddButton:null};const e=Array.from(document.querySelectorAll('input[name="reservation-equipment-mode"]')),t=document.querySelector('[data-equipment-mode="single"]'),n=document.querySelector('[data-equipment-mode="package"]'),a=document.getElementById("reservation-package-select"),s=document.getElementById("reservation-package-hint"),r=document.getElementById("add-reservation-package");return{modeRadios:e,singleContainer:t,packageContainer:n,packageSelect:a,packageHint:s,packageAddButton:r}}function Ya(e){const t=e==="package"?"package":"single",{singleContainer:n,packageContainer:a,packageSelect:s}=$n();n&&(n.hidden=t!=="single",n.setAttribute("aria-hidden",t!=="single"?"true":"false")),a&&(a.hidden=t!=="package",a.setAttribute("aria-hidden",t!=="package"?"true":"false"));const r=document.getElementById("equipment-barcode"),i=document.getElementById("equipment-description"),c=t==="package";r&&(r.disabled=c),i&&(i.disabled=c),s&&(s.disabled=t!=="package"||s.options.length===0),Ec(t),t==="package"&&ha()}function ha(){const{packageSelect:e,packageHint:t}=$n();if(!e)return;const n=Tr();Zr=n,mc(n.map(c=>c.raw??c));const a=o("reservations.create.summary.currency","SR"),s=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,r=n.map(c=>{const d=Number.isFinite(Number(c.price))?Number(c.price):0,l=h(d.toFixed(2)),u=`${c.name} — ${l} ${a}`;return`<option value="${c.id}">${u}</option>`}).join("");e.innerHTML=`${s}${r}`,e.selectedIndex=0;const i=n.length>0;e.disabled=!i,t&&(i?(t.textContent=o("reservations.create.packages.hint","سيتم إضافة الحزمة مباشرة بمجرد اختيارها."),t.dataset.state="ready"):(t.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),t.dataset.state="empty")),fi()}function _l(e,t){const n=e?.name||o("reservations.create.packages.genericName","الحزمة"),a=o("reservations.toast.packageItemsConflict",`⚠️ لا يمكن إضافة ${n} لأن العناصر التالية غير متاحة:`),s=t.map(({item:r,blockingPackages:i})=>{const c=r?.desc||h(String(r?.barcode??r?.normalizedBarcode??""))||o("reservations.create.packages.unnamedItem","عنصر بدون اسم");if(Array.isArray(i)&&i.length){const d=i.map(l=>l.name).join(", ");return`• ${c} (${o("reservations.create.packages.blockedByPackage","محجوز ضمن الحزم")}: ${d})`}return`• ${c} (${o("reservations.create.packages.blockedDirect","محجوز في الفترة المختارة")})`});return[a,...s].join(`
`)}function mi(e,{existingItems:t=[],start:n,end:a,ignoreReservationId:s=null}={}){const r=Wt(e);if(!r)return{success:!1,reason:"invalid",message:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")};const i=hl(r);if(!i)return{success:!1,reason:"not_found",message:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة")};if(!n||!a)return{success:!1,reason:"missing_dates",message:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات")};if(t.some(m=>m?.type==="package"&&Wt(m.packageId)===r))return{success:!1,reason:"duplicate",message:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")};if(pc(r,n,a,s)){const m=i.name||r;return{success:!1,reason:"package_conflict",message:o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${m} محجوزة بالفعل في الفترة المختارة`)}}const c=Array.isArray(i.items)&&i.items.length?i.items:ia(i.raw??{}),d=Cs(t),l=[],u=new Set;if(c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y){if(u.has(y)){l.push({item:m,type:"internal"});return}u.add(y),d.has(y)&&l.push({item:m,type:"external"})}}),l.length){const m=l.map(({item:b})=>b?.desc||b?.description||b?.name||b?.barcode||b?.normalizedBarcode||o("equipment.packages.items.unknown","معدة بدون اسم")).map(b=>h(String(b))).join(", ");return{success:!1,reason:"package_duplicate_equipment",message:l.some(b=>b.type==="external")?o("reservations.toast.packageDuplicateEquipmentExternal","⚠️ لا يمكن إضافة الحزمة لأن العناصر التالية موجودة مسبقاً في الحجز: {items}").replace("{items}",m):o("reservations.toast.packageDuplicateEquipmentInternal","⚠️ بيانات الحزمة تحتوي على عناصر مكررة: {items}").replace("{items}",m),duplicates:l}}const p=[];return c.forEach(m=>{const y=te(m?.normalizedBarcode??m?.barcode);if(y&&Ze(y,n,a,s)){const b=gs(y,n,a,s);p.push({item:m,blockingPackages:b})}}),p.length?{success:!1,reason:"item_conflict",message:_l(i,p),conflicts:p}:{success:!0,package:{id:`package::${r}`,packageId:r,type:"package",desc:i.name||`Package ${r}`,qty:1,price:Number.isFinite(Number(i.price))?Number(i.price):0,barcode:i.code||i.raw?.package_code||`pkg-${r}`,packageItems:c.map(m=>({equipmentId:m?.equipmentId??null,barcode:m?.barcode??m?.normalizedBarcode??"",normalizedBarcode:te(m?.normalizedBarcode??m?.barcode),desc:m?.desc??"",qty:Number.isFinite(Number(m?.qty))?Number(m.qty):1,price:Number.isFinite(Number(m?.price))?Number(m.price):0})),image:c.find(m=>m?.image)?.image??null},packageInfo:i}}function pi(e,{silent:t=!1}={}){const n=Wt(e);if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{start:a,end:s}=zt(),r=et(),i=mi(n,{existingItems:r,start:a,end:s});if(!i.success){if(!t){const d={invalid:o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"),not_found:o("reservations.toast.packageNotFound","⚠️ تعذر العثور على بيانات الحزمة المحددة"),missing_dates:o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"),duplicate:o("reservations.toast.packageDuplicate","⚠️ هذه الحزمة مضافة بالفعل إلى الحجز")}[i.reason]||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً");E(i.message||d)}return i}return oa(i.package),dt(),le(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),{success:!0,package:i.package}}function fi(){const{packageSelect:e}=$n();!e||e.dataset.autoAddAttached==="true"||(e.addEventListener("change",()=>{const t=e.value;if(!t)return;pi(t)?.success&&(e.options.length>0?e.selectedIndex=0:e.value="")}),e.dataset.autoAddAttached="true")}function $l(){const{packageAddButton:e,packageSelect:t}=$n();!e||e.dataset.listenerAttached||(e.addEventListener("click",()=>{const n=t?.value||"";if(!n){E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً"));return}pi(n)}),e.dataset.listenerAttached="true")}function yi(){const{modeRadios:e}=$n();if(!e.length)return;e.forEach(a=>{a.dataset.listenerAttached||(a.addEventListener("change",s=>{s.target.checked&&Ya(s.target.value)}),a.dataset.listenerAttached="true")}),$l(),fi();const t=On(),n=e.find(a=>a.value===t);n&&(n.checked=!0),Ya(t)}function dt(e="reservation-items"){const t=document.getElementById(e);if(!t)return;const n=et(),a=o("reservations.create.equipment.noneAdded","لا توجد معدات مضافة"),s=o("reservations.create.summary.currency","SR"),r=o("reservations.create.equipment.imageAlt","صورة"),i=o("reservations.equipment.actions.increase","زيادة الكمية"),c=o("reservations.equipment.actions.decrease","تقليل الكمية"),d=o("reservations.equipment.actions.remove","إزالة البند");if(n.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${a}</td></tr>`;return}const l=Rt(n);t.innerHTML=l.map(u=>{const p=u.items[0]||{},f=Dt(p)||u.image,m=f?`<img src="${f}" alt="${r}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',y=h(String(u.count)),b=Number.isFinite(Number(u.unitPrice))?Number(u.unitPrice):0,g=Number.isFinite(Number(u.totalPrice))?Number(u.totalPrice):b*u.count,S=`${h(b.toFixed(2))} ${s}`,v=`${h(g.toFixed(2))} ${s}`,A=u.items.some(w=>w?.type==="package"),L=u.barcodes.map(w=>h(String(w||""))).filter(Boolean),O=L.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${L.map(w=>`<li>${w}</li>`).join("")}
            </ul>
          </details>`:"";let q="";if(A){const w=new Map;if(u.items.forEach(k=>{Array.isArray(k?.packageItems)&&k.packageItems.forEach(N=>{if(!N)return;const P=te(N.barcode||N.desc||Math.random()),T=w.get(P);if(T){T.qty+=Number.isFinite(Number(N.qty))?Number(N.qty):1;return}w.set(P,{desc:N.desc||N.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:Number.isFinite(Number(N.qty))?Number(N.qty):1,barcode:N.barcode??N.normalizedBarcode??""})})}),w.size){const k=Array.from(w.values()).map(N=>{const P=h(String(N.qty)),T=N.desc||h(String(N.barcode||"")),I=N.barcode?` <span class="reservation-package-items__barcode">(${h(String(N.barcode))})</span>`:"";return`<li>${T}${I} × ${P}</li>`}).join("");q=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${k}
              </ul>
            </details>
          `}}return`
        <tr data-group-key="${u.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${m}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${u.description||"-"}</div>
                ${A?`${q||""}${O||""}`:O}
              </div>
            </div>
          </td>
          <td>
            <div class="reservation-quantity-control" data-group-key="${u.key}">
              <button type="button" class="reservation-qty-btn" data-action="decrease-group" data-group-key="${u.key}" aria-label="${c}" ${A?"disabled":""}>−</button>
              <span class="reservation-qty-value">${y}</span>
              <button type="button" class="reservation-qty-btn" data-action="increase-group" data-group-key="${u.key}" aria-label="${i}" ${A?"disabled":""}>+</button>
            </div>
          </td>
          <td>${S}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-group" data-group-key="${u.key}" aria-label="${d}">🗑️</button>
          </td>
        </tr>
      `}).join("")}function Nl(e){const t=et(),a=Rt(t).find(r=>r.key===e);if(!a)return;const s=a.itemIndices[a.itemIndices.length-1];s!=null&&(hc(s),dt(),le())}function Pl(e){const t=et(),n=t.filter(a=>_n(a)!==e);n.length!==t.length&&(Cr(n),dt(),le())}function Tl(e){const t=et(),a=Rt(t).find(p=>p.key===e);if(!a)return;const{start:s,end:r}=zt();if(!s||!r){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const i=new Set(t.map(p=>te(p.barcode))),{equipment:c=[]}=ue(),d=(c||[]).find(p=>{const f=te(p?.barcode);return!f||i.has(f)||_n({desc:p?.desc||p?.description||p?.name||"",price:Number(p?.price)||0})!==e||!Es(p)?!1:!Ze(f,s,r)});if(!d){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const l=te(d.barcode),u=vt(d);if(!u){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}oa({id:u,equipmentId:u,barcode:l,desc:d.desc||d.description||d.name||a.description||"",qty:1,price:Number.isFinite(Number(d.price))?Number(d.price):a.unitPrice,image:Dt(d)}),dt(),le()}function le(){const e=!!document.getElementById("res-project")?.value,t=document.getElementById("res-discount")?.value||"0",n=e?0:parseFloat(h(t))||0,a=document.getElementById("res-discount-type")?.value||"percent",s=e?"percent":a,r=document.getElementById("res-tax"),i=e?!1:r?.checked||!1,c=document.getElementById("res-payment-status"),d=c?.value||"unpaid",{start:l,end:u}=zt();i&&Ue();const p=Jt(),f=document.getElementById("res-payment-progress-type"),m=document.getElementById("res-payment-progress-value"),y=ti(f),b=ni(m);nr({selectedItems:et(),discount:n,discountType:s,applyTax:i,paidStatus:d,paymentProgressType:y,paymentProgressValue:b,start:l,end:u,companySharePercent:p,paymentHistory:[]});const g=nr.lastResult;g?(ai(m,g.paymentProgressValue),c&&(c.value=g.paymentStatus,De(c,g.paymentStatus))):De(c,d)}function jl(){const e=document.getElementById("res-discount");e&&!e.dataset.listenerAttached&&(e.addEventListener("input",c=>{c.target.value=h(c.target.value),le()}),e.dataset.listenerAttached="true");const t=document.getElementById("res-discount-type");t&&!t.dataset.listenerAttached&&(t.addEventListener("change",le),t.dataset.listenerAttached="true");const n=document.getElementById("res-tax");n&&!n.dataset.listenerAttached&&(n.addEventListener("change",()=>{if(Fe()){n.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Xa("tax")}),n.dataset.listenerAttached="true");const a=document.getElementById("res-company-share");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{if(Fe()){a.checked=!1,E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Xa("share")}),a.dataset.listenerAttached="true");const s=document.getElementById("res-payment-status");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{if(Fe()){s.value="unpaid",De(s,"unpaid"),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}De(s),le()}),s.dataset.listenerAttached="true");const r=document.getElementById("res-payment-progress-type");r&&!r.dataset.listenerAttached?(r.dataset.userSelected!=="true"&&(r.value="percent"),r.addEventListener("change",c=>{if(Fe()){r.value="percent",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}r.dataset.userSelected="true",le()}),r.dataset.listenerAttached="true"):r&&r.dataset.userSelected!=="true"&&!r.value&&(r.value="percent");const i=document.getElementById("res-payment-progress-value");i&&!i.dataset.listenerAttached&&(i.addEventListener("input",c=>{if(Fe()){i.value="",E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}c.target.value=h(c.target.value),le()}),i.dataset.listenerAttached="true"),le()}function Cl(){const e=document.getElementById("res-start-time"),t=document.getElementById("res-end-time");if(!e||!t||e.dataset.timeSyncAttached)return;let n=!1;const a=()=>{const s=e.value?.trim();if(!s){le();return}const r=t.dataset.syncedWithStart;(!t.value?.trim()||r!=="false")&&(n=!0,t.value=s,t.dataset.syncedWithStart="true",t.dataset.syncedValue=s,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),n=!1),le()};e.addEventListener("change",a),e.addEventListener("input",a),e.addEventListener("blur",a),t.addEventListener("input",()=>{n||(t.value===e.value?(t.dataset.syncedWithStart="true",t.dataset.syncedValue=t.value):t.dataset.syncedWithStart="false")}),t.value?.trim()||a(),e.dataset.timeSyncAttached="true"}async function yr(){const{input:e,hidden:t}=$s(),{input:n,hidden:a}=Mt(),{customers:s}=ue();let r=t?.value?String(t.value):"";if(!r&&e?.value){const Q=Ga(e.value,{allowPartial:!0});Q&&(r=String(Q.id),t&&(t.value=r),e.value=Q.label,e.dataset.selectedId=r)}const i=s.find(Q=>String(Q.id)===r);if(!i){E(o("reservations.toast.customerNotFound","⚠️ لم يتم العثور على العميل بالاسم المدخل"));return}const c=i.id;let d=a?.value?String(a.value):"";if(!d&&n?.value){const Q=Wa(n.value,{allowPartial:!0});Q&&(d=String(Q.id),a&&(a.value=d),n.value=Q.label,n.dataset.selectedId=d)}const l=document.getElementById("res-start").value,u=document.getElementById("res-end").value,p=document.getElementById("res-start-time")?.value||"00:00",f=document.getElementById("res-end-time")?.value||"00:00";if(!l||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const m=`${l}T${p}`,y=`${u}T${f}`,b=new Date(m),g=new Date(y);if(Number.isNaN(b.getTime())||Number.isNaN(g.getTime())||b>=g){E(o("reservations.toast.invalidDateRange","⚠️ تأكد من أن تاريخ ووقت البداية يسبق تاريخ ووقت النهاية"));return}const S=vc(),v=et();if(v.length===0&&S.length===0){E(o("reservations.toast.noItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل"));return}const A=document.getElementById("res-notes")?.value||"",L=parseFloat(h(document.getElementById("res-discount")?.value))||0,O=document.getElementById("res-discount-type")?.value||"percent",q=document.getElementById("res-payment-status"),w=q?.value||"unpaid",k=document.getElementById("res-payment-progress-type"),N=document.getElementById("res-payment-progress-value"),P=ti(k),T=ni(N),I=d?Ps(d):null,F=ql(I);if(d&&!I){E(o("reservations.toast.projectNotFound","⚠️ لم يتم العثور على المشروع المحدد. حاول تحديث الصفحة."));return}for(const Q of v){const re=lt(Q.barcode);if(re==="maintenance"||re==="retired"){E(Bt(re));return}}for(const Q of v){const re=te(Q.barcode);if(Ze(re,m,y)){E(o("reservations.toast.cannotCreateEquipmentConflict","⚠️ لا يمكن إتمام الحجز، إحدى المعدات محجوزة في نفس الفترة الزمنية"));return}}for(const Q of S)if(Lr(Q,m,y)){E(o("reservations.toast.cannotCreateCrewConflict","⚠️ لا يمكن إتمام الحجز، أحد أعضاء الطاقم مرتبط بحجز آخر في نفس الفترة"));return}const B=document.getElementById("res-tax"),V=document.getElementById("res-company-share"),_=!!d;_?(B&&(B.checked=!1,B.disabled=!0,B.classList.add("disabled"),B.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل الضريبة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),V&&(V.checked=!1,V.disabled=!0,V.classList.add("disabled"),V.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تعديل نسبة الشركة من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),q&&(q.value="unpaid",q.disabled=!0,De(q,"unpaid"),q.title=o("reservations.toast.linkedProjectDisabled","لا يمكن تغيير حالة الدفع من شاشة الحجز المرتبط. عدّل المشروع بدلًا من ذلك.")),k&&(k.disabled=!0,k.classList.add("disabled")),N&&(N.value="",N.disabled=!0,N.classList.add("disabled"))):(B&&(B.disabled=!1,B.classList.remove("disabled"),B.title=""),V&&(V.disabled=!1,V.classList.remove("disabled"),V.title=""),q&&(q.disabled=!1,q.title=""),k&&(k.disabled=!1,k.classList.remove("disabled")),N&&(N.disabled=!1,N.classList.remove("disabled")));const W=_?!1:B?.checked||!1,K=!!V?.checked;if(!_&&K!==W){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}let $=K?Jt():null;K&&(!Number.isFinite($)||$<=0)&&(Ue(),$=Jt());const R=K&&W&&Number.isFinite($)&&$>0;W&&Ue();const D=bs(v,L,O,W,S,{start:m,end:y,companySharePercent:R?$:0}),z=dc(),H=hs({totalAmount:D,progressType:P,progressValue:T,history:[]});N&&ai(N,H.paymentProgressValue);const ne=[];H.paymentProgressValue!=null&&H.paymentProgressValue>0&&ne.push({type:H.paymentProgressType||P,value:H.paymentProgressValue,amount:H.paidAmount,percentage:H.paidPercent,recordedAt:new Date().toISOString()});const ee=vs({manualStatus:w,paidAmount:H.paidAmount,paidPercent:H.paidPercent,totalAmount:D});q&&(q.value=ee,De(q,ee));const oe=Br({reservationCode:z,customerId:c,start:m,end:y,status:F?"confirmed":"pending",title:null,location:null,notes:A,projectId:d||null,totalAmount:D,discount:_?0:L,discountType:_?"percent":O,applyTax:W,paidStatus:_?"unpaid":ee,confirmed:F,items:v.map(Q=>({...Q,equipmentId:Q.equipmentId??Q.id})),technicians:S,companySharePercent:_||!R?null:$,companyShareEnabled:_?!1:R,paidAmount:_?0:H.paidAmount,paidPercentage:_?0:H.paidPercent,paymentProgressType:_?null:H.paymentProgressType,paymentProgressValue:_?null:H.paymentProgressValue,paymentHistory:_?[]:ne});try{const Q=await qc(oe);kn(),ht(),In(),Fl(),E(o("reservations.toast.created","✅ تم إنشاء الحجز")),typeof Ua=="function"&&Ua({type:"created",reservation:Q}),Ll(Q)}catch(Q){console.error("❌ [reservations/createForm] Failed to create reservation",Q);const re=ca(Q)?Q.message:o("reservations.toast.createFailed","تعذر إنشاء الحجز، حاول مرة أخرى");E(re,"error"),_&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ التعديلات من شاشة المشروع."),"error"),yn({clearValue:!1}))}}function Ll(e){if(!Rn)return;const{draftStorageKey:t=Xr,returnUrl:n=Jr}=Rn,a=e?.id??e?.reservationId??e?.reservation_code;if(a!=null&&typeof window<"u"&&window.sessionStorage)try{const s=window.sessionStorage.getItem(t),r=s?JSON.parse(s)||{}:{},i=Array.isArray(r.linkedReservationIds)?r.linkedReservationIds:[],c=String(a);i.includes(c)||i.push(c),r.linkedReservationIds=i,window.sessionStorage.setItem(t,JSON.stringify(r))}catch(s){console.warn("⚠️ [reservations] Unable to persist linked reservation draft state",s)}Rn=null,n&&(window.location.href=n)}function yn({clearValue:e=!1}={}){const{input:t,hidden:n}=Mt();t&&(t.disabled=!1,t.classList.remove("reservation-input-disabled"),t.removeAttribute("aria-disabled"),t.removeAttribute("title"),e&&(t.value="",t.dataset.selectedId="",n&&(n.value="")),t.dataset&&delete t.dataset.pendingLinked,bt())}function Bl(e,t=""){const{input:n,hidden:a}=Mt();n&&(n.disabled=!0,n.classList.add("reservation-input-disabled"),n.setAttribute("aria-disabled","true"),t!=null&&(n.value=t),n.dataset.selectedId="",e&&(n.title=e),n.dataset&&(n.dataset.pendingLinked="true"),a&&(a.value=""),bt())}function Fl(){const e=document.getElementById("res-customer"),t=document.getElementById("res-customer-input");e&&(e.value=""),t&&(t.value="",t.dataset.selectedId=""),it({selectedValue:"",resetInput:!0}),document.getElementById("res-start").value="",document.getElementById("res-start-time").value="",document.getElementById("res-end").value="",document.getElementById("res-end-time").value="",document.getElementById("res-notes").value="",document.getElementById("res-discount").value="";const n=document.getElementById("res-project"),a=document.getElementById("res-project-input");n&&(n.value=""),a&&(a.value="",a.dataset.selectedId=""),yn({clearValue:!1}),Yt({selectedValue:"",resetInput:!0});const s=document.getElementById("equipment-description");s&&(s.value="");const r=document.getElementById("res-payment-status");r&&(r.value="unpaid",De(r,"unpaid"));const i=document.getElementById("res-payment-progress-type");i&&(i.value="percent");const c=document.getElementById("res-payment-progress-value");c&&(c.value=""),Sc(),Cr([]),Un("form-reset"),dt(),bt(),le()}function Dl(){const e=document.getElementById("reservation-items");!e||e.dataset.listenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s}=n.dataset;if(a==="decrease-group"&&s){Nl(s);return}if(a==="increase-group"&&s){Tl(s);return}if(a==="remove-group"&&s){Pl(s);return}}),e.dataset.listenerAttached="true")}function Rl(){const e=document.getElementById("equipment-barcode");if(!e||e.dataset.listenerAttached)return;let t=null;const n=()=>{if(On()!=="single")return;const s=e.value;s?.trim()&&(clearTimeout(t),t=null,di(s,e))};e.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),n())});const a=()=>{if(clearTimeout(t),!e.value?.trim()||On()!=="single")return;const{start:r,end:i}=zt();!r||!i||(t=setTimeout(()=>{n()},150))};e.addEventListener("input",a),e.addEventListener("change",n),e.dataset.listenerAttached="true"}function Ml(){const e=document.getElementById("reservation-form");e&&!e.dataset.listenerAttached&&(e.addEventListener("submit",async n=>{n.preventDefault(),await yr()}),e.dataset.listenerAttached="true");const t=document.getElementById("create-reservation-btn");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",async n=>{n.preventDefault(),await yr()}),t.dataset.listenerAttached="true")}function tm({onAfterSubmit:e}={}){Ua=typeof e=="function"?e:null;const{customers:t,projects:n}=ue();bc(t||[]),it(),js(),ri(n||[]),oi({projectsList:n}),Ts(),ht(),ha(),Il(),ui(),yi(),Cl(),jl(),Dl(),Rl(),Ml(),Sl(),le(),dt()}function gi(){ht(),ha(),oi(),it(),js(),Ts(),ui(),yi(),dt(),le()}if(typeof document<"u"){const e=()=>{it(),Yt({projectsList:Ns()}),js(),Ts(),le()};document.addEventListener("language:changed",e),document.addEventListener("language:translationsReady",e),document.addEventListener("equipment:changed",()=>{ht()}),document.addEventListener("packages:changed",()=>{ha(),On()==="package"&&Ya("package")})}typeof window<"u"&&(window.getCompanySharePercent=Jt);function bi(e){const t=new Date;if(t.setHours(0,0,0,0),e==="today")return{startDate:kt(t),endDate:kt(t)};if(e==="week"){const n=new Date(t),a=n.getDay(),s=a===0?6:a-1;n.setDate(n.getDate()-s);const r=new Date(n);return r.setDate(n.getDate()+6),{startDate:kt(n),endDate:kt(r)}}if(e==="month"){const n=new Date(t.getFullYear(),t.getMonth(),1),a=new Date(t.getFullYear(),t.getMonth()+1,0);return{startDate:kt(n),endDate:kt(a)}}return e==="upcoming"?{startDate:kt(t),endDate:""}:{startDate:"",endDate:""}}function zl(){const e=document.getElementById("search-reservation"),t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date"),a=document.getElementById("reservation-date-range"),s=document.getElementById("reservation-status-filter");let r=h(t?.value||"").trim(),i=h(n?.value||"").trim(),c=a?.value||"";if(new Set(["","today","week","month"]).has(c)||(c="",a&&(a.value=""),Zn(t),Zn(n),r="",i=""),!r&&!i&&c){const l=bi(c);r=l.startDate,i=l.endDate}return{searchTerm:_e(e?.value||""),startDate:r,endDate:i,status:s?.value||"",quickRange:c}}function nm(e){const t=()=>{typeof e=="function"&&e()},n=document.getElementById("search-reservation");n&&!n.dataset.listenerAttached&&(n.addEventListener("input",()=>{n.value=h(n.value),t()}),n.dataset.listenerAttached="true");const a=document.getElementById("filter-start-date");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),a.dataset.listenerAttached="true");const s=document.getElementById("filter-end-date");s&&!s.dataset.listenerAttached&&(s.addEventListener("change",()=>{const d=document.getElementById("reservation-date-range");d&&(d.value=""),t()}),s.dataset.listenerAttached="true");const r=document.getElementById("reservation-date-range");r&&!r.dataset.listenerAttached&&(r.addEventListener("change",()=>{Hl(r.value),t()}),r.dataset.listenerAttached="true");const i=document.getElementById("reservation-status-filter");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",t),i.dataset.listenerAttached="true");const c=document.getElementById("clear-filters");c&&!c.dataset.listenerAttached&&(c.addEventListener("click",()=>{n&&(n.value=""),Zn(a),Zn(s),r&&(r.value=""),i&&(i.value=""),t()}),c.dataset.listenerAttached="true")}function Hl(e){const t=document.getElementById("filter-start-date"),n=document.getElementById("filter-end-date");if(!t||!n)return;const{startDate:a,endDate:s}=bi(e);t._flatpickr?a?t._flatpickr.setDate(a,!1,"Y-m-d"):t._flatpickr.clear():t.value=a,n._flatpickr?s?n._flatpickr.setDate(s,!1,"Y-m-d"):n._flatpickr.clear():n.value=s}function kt(e){if(!e)return"";const t=e.getTimezoneOffset()*6e4;return new Date(e.getTime()-t).toISOString().split("T")[0]}function Zn(e){e&&(e._flatpickr&&e._flatpickr.clear(),e.value="")}function Ln(e){if(!e)return null;const n=new Date(e).getTime();return Number.isNaN(n)?null:n}function Ol(e){if(e==null)return null;if(typeof e=="number"&&Number.isFinite(e))return e;const t=String(e).trim();if(!t)return null;const n=t.match(/(\d+)/g);if(!n||n.length===0)return null;const a=n[n.length-1],s=Number.parseInt(a,10);return Number.isFinite(s)?s:null}function Vl(e){const t=[e?.reservationId,e?.reservation_id,e?.id];for(const n of t){const a=Ol(n);if(a!==null)return a}return null}function gr(e,t=0){const n=Vl(e);if(n!=null)return n;const a=Ln(e.createdAt??e.created_at);if(a!=null)return a;const s=Ln(e.updatedAt??e.updated_at);if(s!=null)return s;const r=Ln(e.start);if(r!=null)return r;const i=Ln(e.end);if(i!=null)return i;const c=Number(e.id??e.reservationId);return Number.isFinite(c)?c:Number.isFinite(t)?t:0}function Ul({reservations:e=[],filters:t={},customersMap:n,techniciansMap:a,projectsMap:s}){const r=e.map((v,A)=>({reservation:v,index:A})),i=t.searchTerm||"",c=t.searchReservationId||"",d=t.searchCustomerName||"",l=t.searchProjectId||"",u=t.startDate||"",p=t.endDate||"",f=t.status||"",m=Object.prototype.hasOwnProperty.call(t,"customerId")?t.customerId:null,y=Object.prototype.hasOwnProperty.call(t,"technicianId")?t.technicianId:null,b=u?new Date(`${u}T00:00:00`):null,g=p?new Date(`${p}T23:59:59`):null,S=r.filter(({reservation:v})=>{const A=n.get(String(v.customerId)),L=s?.get?.(String(v.projectId)),O=v.start?new Date(v.start):null,q=_s(v),{effectiveConfirmed:w}=qt(v,L);if(m!=null&&String(v.customerId)!==String(m)||y!=null&&!(Array.isArray(v.technicians)?v.technicians.map(I=>String(I)):[]).includes(String(y))||f==="confirmed"&&!w||f==="pending"&&w||f==="completed"&&!q||b&&O&&O<b||g&&O&&O>g)return!1;if(c){const T=[v.reservationId,v.id,v.reservation_id,v.reservationCode,v.reservation_code,v.code,v.reference,v.referenceNumber,v.reference_number],I=_e(T.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),F=c.replace(/\s+/g,"");if(!I.includes(F))return!1}if(d&&!_e(A?.customerName||"").includes(d))return!1;if(l){const T=[v.projectId,v.project_id,v.projectID,L?.id,L?.projectCode,L?.project_code],I=_e(T.filter(B=>B!=null&&B!=="").map(String).join(" ")).replace(/\s+/g,""),F=l.replace(/\s+/g,"");if(!I.includes(F))return!1}if(!i)return!0;const k=v.items?.map?.(T=>`${T.barcode} ${T.desc}`).join(" ")||"",N=(v.technicians||[]).map(T=>a.get(String(T))?.name).filter(Boolean).join(" ");return _e([v.reservationId,A?.customerName,v.notes,k,N,L?.title].filter(Boolean).join(" ")).includes(i)});return S.sort((v,A)=>{const L=gr(v.reservation,v.index),O=gr(A.reservation,A.index);return L!==O?O-L:A.index-v.index}),S}function Kl({entries:e,customersMap:t,techniciansMap:n,projectsMap:a}){const s=o("reservations.create.summary.currency","SR"),r=o("reservations.list.taxIncludedShort","(شامل الضريبة)"),i=o("reservations.list.unknownCustomer","غير معروف"),c=o("reservations.list.noNotes","لا توجد ملاحظات"),d=o("reservations.list.itemsCountShort","{count} عنصر"),l=o("reservations.list.crew.separator","، "),u=o("reservations.list.status.confirmed","✅ مؤكد"),p=o("reservations.list.status.pending","⏳ غير مؤكد"),f=o("reservations.list.payment.paid","💳 مدفوع"),m=o("reservations.list.payment.unpaid","💳 غير مدفوع"),y=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),b=o("reservations.list.actions.confirm","✔️ تأكيد"),g=o("reservations.list.project.unlinked","غير مرتبط بمشروع"),S=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),v={client:o("reservations.list.labels.client","👤 العميل"),project:o("reservations.list.labels.project","📁 المشروع"),start:o("reservations.list.labels.start","🗓️ بداية الحجز"),end:o("reservations.list.labels.end","🗓️ نهاية الحجز"),cost:o("reservations.list.labels.cost","💵 التكلفة"),equipment:o("reservations.list.labels.equipment","📦 المعدات"),crew:o("reservations.list.labels.crew","😎 الفريق")};return e.map(({reservation:A,index:L})=>{const O=t.get(String(A.customerId)),q=A.projectId?a?.get?.(String(A.projectId)):null,w=_s(A),k=A.paidStatus??A.paid_status??(A.paid===!0||A.paid==="paid"?"paid":"unpaid"),N=k==="paid",P=k==="partial",{effectiveConfirmed:T,projectLinked:I}=qt(A,q),F=T?"status-confirmed":"status-pending",B=N?"status-paid":P?"status-partial":"status-unpaid";let V=`<span class="reservation-chip status-chip ${F}">${T?u:p}</span>`;const _=N?f:P?y:m;let W=`<span class="reservation-chip status-chip ${B}">${_}</span>`,K=N?" tile-paid":P?" tile-partial":" tile-unpaid";w&&(K+=" tile-completed");let $="";w&&(V=`<span class="reservation-chip status-chip status-completed">${u}</span>`,W=`<span class="reservation-chip status-chip status-completed">${_}</span>`,$=` data-completed-label="${o("reservations.list.ribbon.completed","منتهي").replace(/"/g,"&quot;")}"`);const R=!I&&!T?`<button class="tile-confirm" data-reservation-index="${L}" data-action="confirm">${b}</button>`:"",D=R?`<div class="tile-actions">${R}</div>`:"",z=A.items?.length||0,H=(A.technicians||[]).map(pe=>n.get(String(pe))).filter(Boolean),ne=H.map(pe=>pe.name).join(l)||"—",ee=h(String(A.reservationId??"")),oe=A.start?h(Re(A.start)):"-",Q=A.end?h(Re(A.end)):"-",re=h(String(A.cost??0)),ge=h(String(z)),be=A.notes?h(A.notes):c,Ie=d.replace("{count}",ge),U=A.applyTax?`<small>${r}</small>`:"";let Z=g;return A.projectId&&(Z=q?.title?h(q.title):S),`
      <div class="${R?"reservation-tile-wrapper has-tile-action":"reservation-tile-wrapper"}">
        <div class="reservation-tile${K}"${$} data-reservation-index="${L}" data-action="details">
          <div class="tile-top">
          <div class="tile-id">${ee}</div>
          <div class="tile-badges">
            ${V}
            ${W}
          </div>
          </div>
          <div class="tile-body">
          <div class="tile-row">
            <span class="tile-label">${v.client}</span>
            <span class="tile-value">${O?.customerName||i}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.project}</span>
            <span class="tile-value">${Z}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.start}</span>
            <span class="tile-value tile-inline">${oe}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.end}</span>
            <span class="tile-value tile-inline">${Q}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.cost}</span>
            <span class="tile-value">${re} ${s} ${U}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.equipment}</span>
            <span class="tile-value">${Ie}</span>
          </div>
          <div class="tile-row">
            <span class="tile-label">${v.crew}</span>
            <span class="tile-value">${H.length?ne:"—"}</span>
          </div>
          </div>
          <div class="tile-footer">
          <span class="tile-notes">📝 ${be}</span>
          </div>
        </div>
        ${D}
      </div>
    `}).join("")}function Ce(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ql(e,t,n=[],a,s=null){const{projectLinked:r,effectiveConfirmed:i}=qt(e,s),c=e.paid===!0||e.paid==="paid",d=_s(e);e.items;const{groups:l,groupedItems:u}=ks(e),{technicians:p=[]}=ue(),f=[].concat(Array.isArray(n)?n:[]).concat(Array.isArray(p)?p:[]),m=new Map;f.forEach(M=>{if(!M||M.id==null)return;const Y=String(M.id),de=m.get(Y)||{};m.set(Y,{...de,...M})});const y=(e.technicians||[]).map(M=>m.get(String(M))).filter(Boolean),b=Ft(),g=la(e.start,e.end),S=(M={})=>{const Y=[M.dailyWage,M.daily_rate,M.dailyRate,M.wage,M.rate];for(const de of Y){if(de==null)continue;const ke=parseFloat(h(String(de)));if(Number.isFinite(ke))return ke}return 0},v=(M={})=>{const Y=[M.dailyTotal,M.daily_total,M.totalRate,M.total,M.total_wage];for(const de of Y){if(de==null)continue;const ke=parseFloat(h(String(de)));if(Number.isFinite(ke))return ke}return S(M)},L=l.reduce((M,Y)=>{const de=Array.isArray(Y?.items)&&Y.items.length?Y.items[0]:{},ke=Number(Y?.count??Y?.quantity??de?.qty??1)||1;let Ae=[de?.price,de?.unit_price,de?.unitPrice,Y?.unitPrice].reduce((mt,He)=>{if(Number.isFinite(mt)&&mt>0)return mt;const pt=Number(He);return Number.isFinite(pt)?pt:mt},NaN);if(!Number.isFinite(Ae)||Ae<=0){const mt=Number(Y?.totalPrice??de?.total??de?.total_price);Number.isFinite(mt)&&ke>0&&(Ae=Number((mt/ke).toFixed(2)))}Number.isFinite(Ae)||(Ae=0);const Pa=Oe(Ae);return M+Pa*ke},0)*g,O=y.reduce((M,Y)=>M+S(Y),0),q=y.reduce((M,Y)=>M+v(Y),0),w=O*g,k=q*g,N=L+k,P=parseFloat(e.discount)||0,T=e.discountType==="amount"?P:N*(P/100),I=Math.max(0,N-T),F=r?!1:e.applyTax,B=Number(e.cost),V=Number.isFinite(B),_=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share,W=_!=null?parseFloat(h(String(_))):NaN;let R=((e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied)===!0||Number.isFinite(W)&&W>0)&&Number.isFinite(W)?W:0;F&&R<=0&&(R=ct);let D=R>0?Math.max(0,I*(R/100)):0;const z=I+D,H=F?z*.15:0,ne=Number.isFinite(H)&&H>0?Number(H.toFixed(2)):0,ee=z+ne,oe=Number.isFinite(ee)?Number(ee.toFixed(2)):0,Q=r?oe:V?B:oe;R>0&&(D=Number(Math.max(0,I*(R/100)).toFixed(2)));const re=h(String(e.reservationId??e.id??"")),ge=e.start?h(Re(e.start)):"-",be=e.end?h(Re(e.end)):"-",Ie=h(String(y.length)),U=h(L.toFixed(2)),Z=h(T.toFixed(2)),se=h(I.toFixed(2)),pe=h(ne.toFixed(2)),je=h((Number.isFinite(Q)?Q:0).toFixed(2)),Ke=h(String(g)),G=o("reservations.create.summary.currency","SR"),ye=o("reservations.details.labels.discount","الخصم"),C=o("reservations.details.labels.tax","الضريبة (15%)"),ae=o("reservations.details.labels.crewTotal","إجمالي الفريق"),me=o("reservations.details.labels.subtotalAfterDiscount","الإجمالي"),ce=o("reservations.details.labels.duration","عدد الأيام"),fe=o("reservations.details.labels.companyShare","🏦 نسبة الشركة"),Be=o("reservations.details.labels.netProfit","💵 صافي الربح"),$e=o("reservations.create.equipment.imageAlt","صورة"),ve={item:o("reservations.equipment.table.item","المعدة"),quantity:o("reservations.equipment.table.quantity","الكمية"),unitPrice:o("reservations.equipment.table.unitPrice","سعر الوحدة"),total:o("reservations.equipment.table.total","الإجمالي"),actions:o("reservations.equipment.table.actions","الإجراءات")},Qe=o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."),Ot=o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."),sn=o("reservations.details.technicians.roleUnknown","غير محدد"),Vt=o("reservations.details.technicians.phoneUnknown","غير متوفر"),J=o("reservations.details.technicians.wage","{amount} {currency} / اليوم"),qe=o("reservations.list.status.confirmed","✅ مؤكد"),Ge=o("reservations.list.status.pending","⏳ غير مؤكد"),nt=o("reservations.list.payment.paid","💳 مدفوع"),Aa=o("reservations.list.payment.unpaid","💳 غير مدفوع"),ka=o("reservations.list.payment.partial","💳 مدفوع جزئياً"),_a=o("reservations.list.status.completed","📁 منتهي"),rn=o("reservations.details.labels.id","🆔 رقم الحجز"),Ut=o("reservations.details.section.bookingInfo","بيانات الحجز"),ho=o("reservations.details.section.paymentSummary","ملخص الدفع"),vo=o("reservations.details.labels.finalTotal","المجموع النهائي"),qo=o("reservations.details.section.crew","😎 الفريق الفني"),So=o("reservations.details.crew.count","{count} عضو"),Eo=o("reservations.details.section.items","📦 المعدات المرتبطة"),xo=o("reservations.details.items.count","{count} عنصر"),wo=o("reservations.details.actions.edit","✏️ تعديل"),Io=o("reservations.details.actions.delete","🗑️ حذف"),Ao=o("reservations.details.labels.customer","العميل"),ko=o("reservations.details.labels.contact","رقم التواصل"),_o=o("reservations.details.labels.project","📁 المشروع المرتبط");o("reservations.details.project.unlinked","غير مرتبط بأي مشروع.");const $o=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),No=o("reservations.details.actions.openProject","📁 فتح المشروع"),Po=o("reservations.details.labels.start","بداية الحجز"),To=o("reservations.details.labels.end","نهاية الحجز"),jo=o("reservations.details.labels.notes","ملاحظات"),Co=o("reservations.list.noNotes","لا توجد ملاحظات"),Lo=o("reservations.details.labels.itemsCount","عدد المعدات"),Bo=o("reservations.details.labels.itemsTotal","إجمالي المعدات"),Fo=o("reservations.paymentHistory.title","سجل الدفعات"),Do=o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة"),Ro=o("reservations.list.unknownCustomer","غير معروف"),$a=e.paidStatus??e.paid_status??(c?"paid":"unpaid"),Gs=$a==="partial",Mo=$a==="paid"?nt:Gs?ka:Aa,zo=u.reduce((M,Y)=>M+(Number(Y.quantity)||0),0),Ho=h(String(zo)),Ws=xo.replace("{count}",Ho),Oo=So.replace("{count}",Ie),Vo=e.notes?h(e.notes):Co,Uo=h(k.toFixed(2)),Ko=h(String(R)),Qo=h(D.toFixed(2)),Go=`${Ko}% (${Qo} ${G})`,Wo=Math.max(0,L+k-T),Xs=Math.max(0,Wo-w),Xo=h(Xs.toFixed(2)),ut=[{icon:"💼",label:Bo,value:`${U} ${G}`}];ut.push({icon:"😎",label:ae,value:`${Uo} ${G}`}),T>0&&ut.push({icon:"💸",label:ye,value:`${Z} ${G}`}),ut.push({icon:"📊",label:me,value:`${se} ${G}`}),F&&ne>0&&ut.push({icon:"🧾",label:C,value:`${pe} ${G}`}),R>0&&ut.push({icon:"🏦",label:fe,value:Go}),Math.abs(Xs-(Q??0))>.009&&ut.push({icon:"💵",label:Be,value:`${Xo} ${G}`}),ut.push({icon:"💰",label:vo,value:`${je} ${G}`});const Jo=ut.map(({icon:M,label:Y,value:de})=>`
    <div class="summary-details-row">
      <span class="summary-details-label">${M} ${Y}</span>
      <span class="summary-details-value">${de}</span>
    </div>
  `).join("");console.debug("[reservations/details] payment history raw",e.paymentHistory,e.payment_history);let on=[];Array.isArray(e.paymentHistory)?on=e.paymentHistory:Array.isArray(e.payment_history)&&(on=e.payment_history);const Yo=Array.isArray(e.paymentLogs)?e.paymentLogs:[],Js=Array.isArray(on)&&on.length>0?on:Yo,Zo=Js.length?`<ul class="reservation-payment-history-list">${Js.map(M=>{const Y=M?.type==="amount"?o("reservations.paymentHistory.type.amount","دفعة مالية"):M?.type==="percent"?o("reservations.paymentHistory.type.percent","دفعة نسبة"):o("reservations.paymentHistory.type.unknown","دفعة"),de=Number.isFinite(Number(M?.amount))&&Number(M.amount)>0?`${h(Number(M.amount).toFixed(2))} ${G}`:"—",ke=Number.isFinite(Number(M?.percentage))&&Number(M.percentage)>0?`${h(Number(M.percentage).toFixed(2))}%`:"—",It=M?.recordedAt?h(Re(M.recordedAt)):"—",Ae=M?.note?`<div class="payment-history-note">${Ce(h(M.note))}</div>`:"";return`
          <li>
            <div class="payment-history-entry">
              <span class="payment-history-entry__type">${Ce(Y)}</span>
              <span class="payment-history-entry__amount">${de}</span>
              <span class="payment-history-entry__percent">${ke}</span>
              <span class="payment-history-entry__date">${It}</span>
            </div>
            ${Ae}
          </li>
        `}).join("")}</ul>`:`<div class="reservation-payment-history-empty">${Ce(Do)}</div>`,Ys=[{text:i?qe:Ge,className:i?"status-confirmed":"status-pending"},{text:Mo,className:$a==="paid"?"status-paid":Gs?"status-partial":"status-unpaid"}];d&&Ys.push({text:_a,className:"status-completed"});const ec=Ys.map(({text:M,className:Y})=>`<span class="status-chip ${Y}">${M}</span>`).join(""),wt=(M,Y,de)=>`
    <div class="res-info-row">
      <span class="label">${M} ${Y}</span>
      <span class="value">${de}</span>
    </div>
  `;let Na="";if(e.projectId){let M=Ce($o);if(s){const Y=s.title||o("projects.fallback.untitled","مشروع بدون اسم");M=`${Ce(Y)} <button type="button" class="btn btn-sm btn-outline-primary" data-action="open-project" data-project-id="${s.id}">${Ce(No)}</button>`}Na=`
      <div class="res-info-row">
        <span class="label">📁 ${_o}</span>
        <span class="value">${M}</span>
      </div>
    `}const at=[];at.push(wt("👤",Ao,t?.customerName||Ro)),at.push(wt("📞",ko,t?.phone||"—")),at.push(wt("🗓️",Po,ge)),at.push(wt("🗓️",To,be)),at.push(wt("📦",Lo,Ws)),at.push(wt("⏱️",ce,Ke)),at.push(wt("📝",jo,Vo)),Na&&at.push(Na);const tc=at.join(""),nc=l.length?l.map(M=>{const Y=M.items[0]||{},de=Dt(Y)||M.image,ke=de?`<img src="${de}" alt="${$e}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',It=M.items.some(Se=>Se?.type==="package"),Ae=Number(M.quantity??M.count??Y?.qty??0)||0,Pa=h(String(Ae));let He=[Y?.price,Y?.unit_price,Y?.unitPrice,M.unitPrice].reduce((Se,Kt)=>{if(Number.isFinite(Se)&&Se>0)return Se;const Ee=Number(Kt);return Number.isFinite(Ee)?Ee:Se},NaN);if(!Number.isFinite(He)||He<=0){const Se=Number(M.totalPrice??Y?.total??Y?.total_price);Number.isFinite(Se)&&Ae>0&&(He=Number((Se/Ae).toFixed(2)))}Number.isFinite(He)||(He=0),He=Oe(He);let pt=Number(M.totalPrice??Y?.total??Y?.total_price);Number.isFinite(pt)||(pt=He*Ae),pt=Oe(pt);const ic=`${h(He.toFixed(2))} ${G}`,oc=`${h(pt.toFixed(2))} ${G}`,Zs=M.barcodes.map(Se=>h(String(Se||""))).filter(Boolean),er=Zs.length?`<details class="reservation-item-barcodes">
              <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
              <ul class="reservation-barcode-list">
                ${Zs.map(Se=>`<li>${Se}</li>`).join("")}
              </ul>
            </details>`:"";let tr="";if(It){const Se=new Map;if(M.items.forEach(Kt=>{Array.isArray(Kt?.packageItems)&&Kt.packageItems.forEach(Ee=>{if(!Ee)return;const Pn=te(Ee.barcode||Ee.normalizedBarcode||Ee.desc||Math.random()),Tn=Se.get(Pn),jn=Number.isFinite(Number(Ee.qty))?Number(Ee.qty):1;if(Tn){Tn.qty+=jn;return}Se.set(Pn,{desc:Ee.desc||Ee.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:jn,barcode:Ee.barcode??Ee.normalizedBarcode??""})})}),Se.size){const Kt=Array.from(Se.values()).map(Ee=>{const Pn=h(String(Ee.qty)),Tn=Ce(Ee.desc||""),jn=Ee.barcode?` <span class="reservation-package-items__barcode">(${Ce(h(String(Ee.barcode)))})</span>`:"";return`<li>${Tn}${jn} × ${Pn}</li>`}).join("");tr=`
              <details class="reservation-package-items">
                <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
                <ul class="reservation-package-items__list">
                  ${Kt}
                </ul>
              </details>
            `}}const cc=It?`${tr||""}${er||""}`:er;return`
          <tr>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--item">
              <div class="reservation-item-info">
                <div class="reservation-item-thumb-wrapper">${ke}</div>
                <div class="reservation-item-copy">
                  <div class="reservation-item-title">${Ce(Y.desc||Y.description||Y.name||M.description||"-")}</div>
                  ${cc}
                </div>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ce(ve.quantity)}">
              <div class="reservation-quantity-control reservation-quantity-control--static">
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">−</button>
                <span class="reservation-qty-value">${Pa}</span>
                <button type="button" class="reservation-qty-btn" disabled aria-disabled="true" tabindex="-1">+</button>
              </div>
            </td>
            <td class="reservation-modal-items-table__cell" data-label="${Ce(ve.unitPrice)}">${ic}</td>
            <td class="reservation-modal-items-table__cell" data-label="${Ce(ve.total)}">${oc}</td>
            <td class="reservation-modal-items-table__cell reservation-modal-items-table__cell--actions" data-label="${Ce(ve.actions)}">
              <button type="button" class="reservation-remove-button" disabled aria-disabled="true" tabindex="-1">🗑️</button>
            </td>
          </tr>
        `}).join(""):`<tr><td colspan="5" class="text-center">${Qe}</td></tr>`,ac=`
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
        <tbody>${nc}</tbody>
      </table>
    </div>
  `,sc=y.map((M,Y)=>{const de=h(String(Y+1)),ke=M.role||sn,It=M.phone||Vt,Ae=M.wage?J.replace("{amount}",h(String(M.wage))).replace("{currency}",G):"";return`
      <div class="reservation-technician-card">
        <div class="technician-card-head">
          <span class="technician-index">${de}</span>
          <span class="technician-name">${M.name}</span>
        </div>
        <div class="technician-card-body">
          <div>🎯 ${ke}</div>
          <div>📞 ${It}</div>
          ${Ae?`<div>💰 ${Ae}</div>`:""}
        </div>
      </div>
    `}).join(""),rc=y.length?`<div class="reservation-technicians-grid">${sc}</div>`:`<ul class="reservation-modal-technicians"><li>${Ot}</li></ul>`;return`
    <div class="reservation-modal">
      <div class="reservation-modal-header">
        <div class="reservation-modal-id">
          <span>${rn}</span>
          <strong>${re}</strong>
        </div>
        <div class="status-chips">
          ${ec}
        </div>
      </div>

      <div class="reservation-modal-grid">
        <div class="reservation-info-card">
          <h6>${Ut}</h6>
          ${tc}
        </div>
      </div>
      <div class="reservation-summary-card">
        <div class="summary-icon">💳</div>
        <div class="summary-body">
          <h6 class="summary-heading">${ho}</h6>
          <div class="summary-content">
            <div class="summary-details">
              ${Jo}
            </div>
            <div class="reservation-payment-history-modal">
              <h6 class="history-heading">${Fo}</h6>
              ${Zo}
            </div>
          </div>
        </div>
      </div>

      <div class="reservation-technicians-section">
        <div class="section-title">
          <span>${qo}</span>
          <span class="count">${Oo}</span>
        </div>
        ${rc}
      </div>

      <div class="reservation-items-section">
        <div class="section-title">
          <span>${Eo}</span>
          <span class="count">${Ws}</span>
        </div>
        ${ac}
      </div>

      <div class="reservation-modal-actions">
        <button type="button" class="modal-action-btn modal-action-btn--ghost" id="reservation-details-export-btn" data-index="${a}">
          ${o("reservations.details.actions.exportPdf","👁️ معاينة PDF")}
        </button>
        <button type="button" class="modal-action-btn modal-action-btn--primary" id="reservation-details-edit-btn" data-index="${a}">${wo}</button>
        ${b?`<button type="button" class="modal-action-btn modal-action-btn--danger" id="reservation-details-delete-btn" data-index="${a}">${Io}</button>`:""}
      </div>
    </div>
  `}const am="project",sm="editProject",rm=3600*1e3,hi=.15,im=6,om="projectsTab",cm="projectsSubTab",lm={create:"create-project-tab",list:"projects-list-tab",reports:"projects-reports-tab",expenses:"projects-expenses-tab"},dm={upcoming:"Upcoming",ongoing:"In Progress",completed:"Completed"},um={upcoming:"bg-info",ongoing:"bg-warning",completed:"bg-success"},Gl=`@page {
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
`,Wl=/color\([^)]*\)/gi,qn=/(color\(|color-mix\(|oklab|oklch)/i,Xl=["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor","fill","stroke"],Jl=typeof document<"u"?document.createElement("canvas"):null,Bn=Jl?.getContext?.("2d")||null;function vi(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function Za(e,t="#000"){if(!Bn||!e)return t;try{return Bn.fillStyle="#000",Bn.fillStyle=e,Bn.fillStyle||t}catch{return t}}function Yl(){const e=window.html2canvas;if(!e?.Color||e.Color.__artRatioPatched)return;const t=e.Color.fromString.bind(e.Color);e.Color.fromString=n=>{try{return t(n)}catch(a){if(typeof n=="string"&&qn.test(n)){const s=Za(n)||"#000";try{return t(s)}catch{return t("#000")}}throw a}},e.Color.__artRatioPatched=!0}function Qt(e,t,n){if(!e||!t?.style)return;const a=t.style.getPropertyValue(n),s=t.style.getPropertyPriority(n);e.push({element:t,prop:n,value:a,priority:s})}function mm(e=[]){if(!(!Array.isArray(e)||!e.length))for(let t=e.length-1;t>=0;t-=1){const{element:n,prop:a,value:s,priority:r}=e[t]||{};!n?.style||!a||(s&&s.length>0?n.style.setProperty(a,s,r||""):n.style.removeProperty(a))}}function qi(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;Xl.forEach(c=>{const d=r[c];if(d&&qn.test(d)){const l=vi(c);Qt(n,s,l);const u=c==="backgroundColor"?"#ffffff":r.color||"#000000",p=Za(d,u);s.style.setProperty(l,p,"important")}});const i=r.backgroundImage;if(i&&qn.test(i)){const c=Za(r.backgroundColor||"#ffffff","#ffffff");Qt(n,s,"background-image"),Qt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color",c,"important")}})}function Si(e,t=window,n=[]){if(!e||!t||typeof t.getComputedStyle!="function")return;const a=e.querySelectorAll?.("*");a&&a.forEach(s=>{const r=t.getComputedStyle(s);if(!r)return;["color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"].forEach(c=>{const d=r[c];if(d&&qn.test(d)){const l=vi(c);Qt(n,s,l);const u=c==="backgroundColor"?"#ffffff":"#000000";s.style.setProperty(l,u,"important")}});const i=r.backgroundImage;i&&qn.test(i)&&(Qt(n,s,"background-image"),Qt(n,s,"background-color"),s.style.setProperty("background-image","none","important"),s.style.setProperty("background-color","#ffffff","important"))})}function Ei(e){if(!e)return;const t=(n="")=>typeof n=="string"&&n.includes("color(")?n.replace(Wl,"#000"):n;e.querySelectorAll?.("style")?.forEach?.(n=>{const a=n.textContent;typeof a=="string"&&a.includes("color(")&&(n.textContent=t(a))}),e.querySelectorAll?.("[style]")?.forEach?.(n=>{const a=n.getAttribute("style");typeof a=="string"&&a.includes("color(")&&n.setAttribute("style",t(a))})}const xi="reservations.quote.sequence",br={reservation:"reservations.quote.togglePrefs.v1",project:"projects.quote.togglePrefs.v1"},wi="https://help.artratio.sa/guide/quote-preview",we={logoUrl:"https://art-ratio.sirv.com/AR-Logo-v3.5-curved.png",companyName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",commercialRegistry:"4030485240",beneficiaryName:"شركة فود آرت للدعاية والإعلان (شركة شخص واحد)",bankName:"مصرف الراجحي",accountNumber:"٣٥٨٠٠٠٠١٠٠٠٦٠٨٦٠٦٥٧٠٦",iban:"SA1680000358608016065706",approvalNote:"الموافقة على هذا العرض تعتبر موافقة على جميع الشروط والأحكام."},Zl=["يوم العمل هو 12 ساعة، ويتم احتساب نصف يوم إضافي بعد 20 ساعة، ثم يوم كامل بعد ذلك.","يمنع استخدام المعدات في أنشطة غير قانونية.","يتحمل المستأجر مسؤولية أي تلف أو فقدان.","يجب إعادة المعدات في حالتها الأصلية.","يتم فرض رسوم على الإلغاء إذا لم يتم الإبلاغ قبل 24 ساعة."],Le=[...Zl],ed=["يتم دفع 50% من قيمة المشروع عند الموافقة على عرض السعر، ويتم استكمال الـ 50% المتبقية قبل التسليم النهائي.","يحصل العميل على حقوق استخدام النسخة النهائية في أي مكان يراه مناسباً، بينما تحتفظ الشركة بالمواد الخام ولا تستخدمها إلا بعد موافقة العميل ما لم يُتفق على غير ذلك.","يتم الاتفاق على جدول زمني للتنفيذ، وأي تعديلات إضافية خارج النطاق المتفق عليه تخضع لرسوم إضافية.","العميل مسؤول عن توفير التصاريح اللازمة للتصوير في المواقع المحددة، وأي تأخير ناتج عن ذلك قد يؤثر على مواعيد التسليم.","تُحفَظ المواد النهائية للمشروع لمدة 12 شهراً في أرشيف الشركة، ويمكن للعميل طلب نسخ إضافية خلال تلك الفترة.","يتحمّل العميل مسؤولية توفير بيئة عمل آمنة للفريق الفني والمعدات في موقع التصوير، ويضمن اتخاذ كافة الاحتياطات اللازمة للحفاظ على سلامتهم."];function es(e){return e?e.split(/\r?\n/).map(t=>t.trim()).filter(t=>t.length>0):[...Le]}function td(){const e=document.getElementById("reservation-terms");if(e&&e.value.trim().length>0){const a=es(e.value);if(a.length)return a}const t=document.getElementById("edit-res-terms");if(t&&t.value.trim().length>0){const a=es(t.value);if(a.length)return a}const n=Le.join(`
`);return e&&e.value.trim().length===0&&(e.value=n),t&&t.value.trim().length===0&&(t.value=n),[...Le]}const nd=[{id:"customerInfo",labelKey:"reservations.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"reservationInfo",labelKey:"reservations.quote.sections.reservation",fallback:"تفاصيل الحجز",defaultSelected:!0},{id:"projectInfo",labelKey:"reservations.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"financialSummary",labelKey:"reservations.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"items",labelKey:"reservations.quote.sections.items",fallback:"قائمة المعدات",defaultSelected:!0},{id:"crew",labelKey:"reservations.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"notes",labelKey:"reservations.quote.sections.notes",fallback:"ملاحظات الحجز",defaultSelected:!0}],Ii=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"code",labelKey:"reservations.details.table.headers.code",fallback:"الكود",render:e=>x(e?.barcode||"-")},{id:"description",labelKey:"reservations.details.table.headers.description",fallback:"الوصف",render:e=>x(e?.desc||e?.description||"-")},{id:"quantity",labelKey:"reservations.details.table.headers.quantity",fallback:"الكمية",render:e=>x(h(String(e?.qty||1)))},{id:"price",labelKey:"reservations.details.table.headers.price",fallback:"السعر",render:e=>x(h(Number(e?.price||0).toFixed(2)))}],Ai=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:"reservations.details.technicians.name",fallback:"الاسم",render:e=>x(e?.name||e?.full_name||"-")},{id:"role",labelKey:"reservations.details.technicians.role",fallback:"الدور",render:e=>x(e?.role||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:"reservations.details.technicians.phone",fallback:"الهاتف",render:e=>x(e?.phone||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],ts={customerInfo:[{id:"customerName",labelKey:"reservations.details.labels.customer",fallback:"العميل"},{id:"customerCompany",labelKey:"reservations.details.labels.company",fallback:"الشركة"},{id:"customerPhone",labelKey:"reservations.details.labels.phone",fallback:"الهاتف"},{id:"customerEmail",labelKey:"reservations.details.labels.email",fallback:"البريد"}],reservationInfo:[{id:"reservationId",labelKey:"reservations.details.labels.reservationId",fallback:"رقم الحجز"},{id:"reservationStart",labelKey:"reservations.details.labels.start",fallback:"بداية الحجز"},{id:"reservationEnd",labelKey:"reservations.details.labels.end",fallback:"نهاية الحجز"},{id:"reservationDuration",labelKey:"reservations.details.labels.duration",fallback:"عدد الأيام"}],projectInfo:[{id:"projectTitle",labelKey:"reservations.details.labels.project",fallback:"المشروع"},{id:"projectCode",labelKey:"reservations.details.labels.code",fallback:"الرمز"}],financialSummary:[{id:"equipmentTotal",labelKey:"reservations.details.labels.equipmentTotal",fallback:"إجمالي المعدات"},{id:"crewTotal",labelKey:"reservations.details.labels.crewTotal",fallback:"إجمالي الفريق"},{id:"discountAmount",labelKey:"reservations.details.labels.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"reservations.details.labels.tax",fallback:"الضريبة"},{id:"finalTotal",labelKey:"reservations.details.labels.total",fallback:"الإجمالي النهائي"}],payment:[{id:"beneficiary",labelKey:"reservations.quote.labels.beneficiary",fallback:"اسم المستفيد"},{id:"bank",labelKey:"reservations.quote.labels.bank",fallback:"اسم البنك"},{id:"account",labelKey:"reservations.quote.labels.account",fallback:"رقم الحساب"},{id:"iban",labelKey:"reservations.quote.labels.iban",fallback:"رقم الآيبان"}],items:Ii.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),crew:Ai.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n}))},ki=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"name",labelKey:null,fallback:"الاسم",render:e=>x(e?.name||e?.full_name||e?.fullName||"-")},{id:"role",labelKey:null,fallback:"الدور",render:e=>x(e?.role||e?.title||o("reservations.details.technicians.roleUnknown","غير محدد"))},{id:"phone",labelKey:null,fallback:"الهاتف",render:e=>x(e?.phone||e?.mobile||o("reservations.details.technicians.phoneUnknown","غير متوفر"))}],_i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"label",labelKey:null,fallback:"البند",render:e=>x(e?.label||"-")},{id:"amount",labelKey:null,fallback:"المبلغ",render:e=>x(e?.displayAmount||"—")},{id:"note",labelKey:null,fallback:"ملاحظات",render:e=>x(e?.note||"-")}],$i=[{id:"rowNumber",labelKey:null,fallback:"#",render:(e,t)=>x(h(String(t+1)))},{id:"description",labelKey:null,fallback:"الوصف",render:e=>x(e?.description||"-")},{id:"totalQuantity",labelKey:null,fallback:"إجمالي الكمية",render:e=>x(h(String(e?.totalQuantity||0)))},{id:"reservationsCount",labelKey:null,fallback:"عدد الحجوزات",render:e=>x(h(String(e?.reservationsCount||0)))},{id:"totalCost",labelKey:null,fallback:"التكلفة التقديرية",render:e=>x(e?.displayCost||"—")}],ad=[{id:"customerInfo",labelKey:"projects.quote.sections.customer",fallback:"بيانات العميل",defaultSelected:!0},{id:"projectInfo",labelKey:"projects.quote.sections.project",fallback:"بيانات المشروع",defaultSelected:!0},{id:"projectExpenses",labelKey:"projects.quote.sections.expenses",fallback:"متطلبات المشروع",defaultSelected:!0},{id:"projectCrew",labelKey:"projects.quote.sections.crew",fallback:"طاقم العمل",defaultSelected:!0},{id:"financialSummary",labelKey:"projects.quote.sections.financial",fallback:"الملخص المالي",defaultSelected:!0},{id:"projectEquipment",labelKey:"projects.quote.sections.equipment",fallback:"المعدات",defaultSelected:!0},{id:"projectNotes",labelKey:"projects.quote.sections.notes",fallback:"ملاحظات المشروع",defaultSelected:!0}],sd={customerInfo:ts.customerInfo,projectInfo:[{id:"projectTitle",labelKey:"projects.details.overview.heading",fallback:"معلومات المشروع"},{id:"projectCode",labelKey:"projects.details.labels.code",fallback:"رقم المشروع"},{id:"projectType",labelKey:"projects.details.type",fallback:"نوع المشروع"},{id:"projectStart",labelKey:"projects.details.start",fallback:"بداية المشروع"},{id:"projectEnd",labelKey:"projects.details.end",fallback:"نهاية المشروع"},{id:"projectDuration",labelKey:"projects.details.duration",fallback:"مدة المشروع"},{id:"projectStatus",labelKey:"projects.details.status",fallback:"حالة المشروع"}],financialSummary:[{id:"projectSubtotal",labelKey:"projects.details.summary.projectSubtotal",fallback:"إجمالي المشروع"},{id:"expensesTotal",labelKey:"projects.details.expensesTotal",fallback:"إجمالي المصاريف"},{id:"reservationsTotal",labelKey:"projects.details.reservationsTotal",fallback:"إجمالي الحجوزات"},{id:"discountAmount",labelKey:"projects.details.summary.discount",fallback:"الخصم"},{id:"taxAmount",labelKey:"projects.details.summary.combinedTax",fallback:"الضريبة"},{id:"overallTotal",labelKey:"projects.details.summary.overallTotal",fallback:"الإجمالي الكلي"},{id:"paidAmount",labelKey:"projects.details.summary.paidAmount",fallback:"المدفوع"},{id:"remainingAmount",labelKey:"projects.details.summary.remainingAmount",fallback:"المتبقي للدفع"}],payment:ts.payment,projectExpenses:_i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectCrew:ki.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectEquipment:$i.map(({id:e,labelKey:t,fallback:n})=>({id:e,labelKey:t,fallback:n})),projectNotes:[]},Ba=new Map;function va(e="reservation"){if(Ba.has(e))return Ba.get(e);const t=e==="project"?ad:nd,n=e==="project"?sd:ts,a=new Set(t.map(({id:i})=>i)),s=Object.fromEntries(Object.entries(n).map(([i,c=[]])=>[i,new Set(c.map(d=>d.id))])),r={sectionDefs:t,fieldDefs:n,sectionIdSet:a,fieldIdMap:s};return Ba.set(e,r),r}function qa(e="reservation"){return va(e).sectionDefs}function Ni(e="reservation"){return va(e).fieldDefs}function Pi(e="reservation"){return va(e).sectionIdSet}function Ti(e="reservation"){return va(e).fieldIdMap}function ji(e){switch(e){case"export":return o("reservations.quote.status.exporting","جاري تجهيز ملف PDF...");case"render":default:return o("reservations.quote.status.rendering","جاري تحديث المعاينة...")}}const rd="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js",id="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",od="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",Ci=Gl.trim(),Li=/^data:image\/svg\+xml/i,cd=/\.svg($|[?#])/i,pn=512,ns="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/B8AAusB9YwpClgAAAAASUVORK5CYII=",Bi=96,Fi=25.4,as=210,Mn=297,zn=Math.round(as/Fi*Bi),Hn=Math.round(Mn/Fi*Bi),ld=2,Di=/safari/i,dd=/(iphone|ipad|ipod)/i,hr=/(iphone|ipad|ipod)/i,ud=/(crios|fxios|edgios|opios)/i,ea="[reservations/pdf]";let X=null,j=null,Xe=1,ln=null,dn=null,yt=null,Gt=null,gn=!1;function Tt(e="render",{message:t,actionLabel:n,onAction:a,showSpinner:s=e!=="error"}={}){if(!X?.statusIndicator||!X?.statusText)return;X.statusKind=e;const r=t||ji(e);X.statusText.textContent=r,X.statusSpinner&&(X.statusSpinner.hidden=!s),X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null,n&&typeof a=="function"&&(X.statusAction.textContent=n,X.statusAction.hidden=!1,X.statusAction.onclick=i=>{i.preventDefault(),a()})),X.statusIndicator.hidden=!1,requestAnimationFrame(()=>{X.statusIndicator.classList.add("is-visible")})}function bn(e){!X?.statusIndicator||!X?.statusText||(X.statusKind=null,X.statusIndicator.classList.remove("is-visible"),setTimeout(()=>{X?.statusIndicator&&(X.statusIndicator.hidden=!0,X.statusAction&&(X.statusAction.hidden=!0,X.statusAction.onclick=null),X.statusSpinner&&(X.statusSpinner.hidden=!1))},220))}function ss(){return!!window?.bootstrap?.Modal}function md(e){if(e&&!e.classList.contains("show")){e.classList.add("show"),e.style.display="block",e.removeAttribute("aria-hidden"),e.setAttribute("aria-modal","true"),e.getAttribute("role")||e.setAttribute("role","dialog"),document.body.classList.add("modal-open"),yt||(yt=document.createElement("div"),yt.className="modal-backdrop fade show",yt.dataset.quotePdfFallbackBackdrop="true",document.body.appendChild(yt)),Gt||(Gt=t=>{t.key==="Escape"&&rs(e)},document.addEventListener("keydown",Gt));try{e.focus({preventScroll:!0})}catch{}}}function rs(e){!e||!e.classList.contains("show")||(e.classList.remove("show"),e.style.display="none",e.setAttribute("aria-hidden","true"),e.removeAttribute("aria-modal"),document.body.classList.remove("modal-open"),yt&&(yt.remove(),yt=null),Gt&&(document.removeEventListener("keydown",Gt),Gt=null))}function pd(e){if(e){if(ss()){window.bootstrap.Modal.getOrCreateInstance(e).show();return}md(e)}}function fd(){if(gn)return;gn=!0;const e=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),t=o("reservations.quote.toast.retry","إعادة المحاولة"),n=o("reservations.quote.toast.assetsFailed","⚠️ تعذر تحميل بعض الصور ضمن عرض السعر."),a=!!X?.modal?.classList.contains("show"),s=()=>{X?.modal?.classList.contains("show")&&(Tt("render"),gn=!1,Ht())};Pr({message:n,duration:9e3,actionLabel:a?t:void 0,onAction:a?s:void 0,linkLabel:e,linkHref:wi}),a&&Tt("error",{message:n,actionLabel:t,onAction:s,showSpinner:!1})}function Sa(e="reservation"){const t={},n=Ni(e);return Object.entries(n).forEach(([a,s=[]])=>{t[a]=new Set(s.filter(r=>r?.default!==!1).map(r=>r.id))}),t}function Ls(e={}){const t={};return Object.entries(e).forEach(([n,a])=>{t[n]=new Set(Array.from(a||[]))}),t}function yd(e={},t){if(t)return e[t]||(e[t]=new Set),e[t]}function Bs(e={},t,n){const a=e?.[t];return a?a instanceof Set?a.has(n):Array.isArray(a)?a.includes(n):!!a?.[n]:!0}function Fs(e="reservation"){return Object.fromEntries(qa(e).map(({id:t})=>[t,!1]))}function Ds(e,t){return e.sectionExpansions||(e.sectionExpansions=Fs(e.context||"reservation")),t&&typeof e.sectionExpansions[t]!="boolean"&&(e.sectionExpansions[t]=!1),e.sectionExpansions}function gd(e,t){return Ds(e,t)?.[t]!==!1}function Rs(){return typeof window>"u"||typeof window.matchMedia!="function"?!1:window.matchMedia("(max-width: 768px)").matches}function bd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||navigator.platform||"";return dd.test(e)}function hd(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=Di.test(e),n=e.includes("Chrome")||e.includes("CriOS")||e.includes("Chromium"),a=e.includes("Edg");return t&&!n&&!a}function Ri(){return bd()&&hd()}function Ea(){if(typeof navigator>"u")return!1;const e=navigator.userAgent||"",t=navigator.platform||"",n=Number.isFinite(navigator.maxTouchPoints)?navigator.maxTouchPoints:0,a=hr.test(e)||hr.test(t),s=/Macintosh/i.test(e)&&n>1;return Di.test(e)&&!ud.test(e)&&(a||s)}function Fa(e,...t){try{console.log(`${ea} ${e}`,...t)}catch{}}function ot(e,...t){try{console.warn(`${ea} ${e}`,...t)}catch{}}function vd(e,t,...n){try{t?console.error(`${ea} ${e}`,t,...n):console.error(`${ea} ${e}`,...n)}catch{}}function he(e,{blockType:t="section",extraAttributes:n=""}={}){if(!e)return"";const a=n?` ${n.trim()}`:"";return e.replace(/^(<\w+)/,`$1 data-quote-block data-block-type="${t}"${a}`)}function qd(e,t="لا توجد بيانات للعرض."){const n=x(o(e,t));return he(`<section class="quote-section quote-placeholder">${n}</section>`,{blockType:"placeholder"})}function ta(e,t){return Array.isArray(e)&&e.length?e:[qd(t)]}const Sd=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;function Mi(e=""){return Sd.test(e)}function Ed(){const e=window.CanvasRenderingContext2D?.prototype;if(!e||e.__artRatioDirectionPatched)return;const t=n=>{const a=e[n];typeof a=="function"&&(e[n]=function(r,...i){if(typeof r!="string"||!Mi(r))return a.call(this,r,...i);let c,d=!1;try{"direction"in this&&(c=this.direction,c!=="rtl"&&(this.direction="rtl"),d=!0)}catch{}try{if(!d){const l=this.canvas;l&&l.style?.direction!=="rtl"&&(l.__artRatioOriginalDirection=l.style.direction,l.style.direction="rtl")}return a.call(this,r,...i)}finally{if(d&&c!==void 0&&c!=="rtl")try{this.direction=c}catch{}else if(!d){const l=this.canvas;l&&l.__artRatioOriginalDirection!==void 0&&(l.style.direction=l.__artRatioOriginalDirection,delete l.__artRatioOriginalDirection)}}})};t("fillText"),t("strokeText"),e.__artRatioDirectionPatched=!0}function vr(e,t=pn){if(typeof e!="string"&&typeof e!="number")return t;const n=parseFloat(String(e).replace(/[^0-9.+-]/g,""));return Number.isFinite(n)&&n>0?n:t}function xd(e){if(!e)return{width:pn,height:pn};const t=e.getAttribute?.("width"),n=e.getAttribute?.("height");let a=t?vr(t,0):0,s=n?vr(n,0):0;if(a>0&&s>0)return{width:a,height:s};const r=e.getAttribute?.("viewBox");if(r){const i=r.trim().split(/[\s,]+/).map(c=>parseFloat(c||"0"));if(i.length>=4){const[,,c,d]=i;a=a||(Number.isFinite(c)&&c>0?c:0),s=s||(Number.isFinite(d)&&d>0?d:0)}}return{width:a||pn,height:s||pn}}function zi(e=""){return typeof e!="string"?!1:Li.test(e)||cd.test(e)}function wd(e=""){const t=e.indexOf(",");if(t===-1)return"";const n=e.slice(0,t),a=e.slice(t+1);try{return/;base64/i.test(n)?typeof atob=="function"?atob(a):"":decodeURIComponent(a)}catch(s){return console.warn("[reservations/pdf] failed to decode SVG data URI",s),""}}function Id(e,{crossOrigin:t}={}){return new Promise((n,a)=>{const s=new Image;t&&(s.crossOrigin=t),s.onload=()=>n(s),s.onerror=r=>{const i=r?.message||`Unable to load image from ${e}`;a(new Error(i))},s.src=e})}async function Hi(e,t={}){if(!e)return null;const n=document,a=new Blob([e],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{const r=await Id(s),i=n.createElement("canvas"),c=Math.max(t.width||r.naturalWidth||r.width||0,1),d=Math.max(t.height||r.naturalHeight||r.height||c,1);i.width=c,i.height=d;const l=i.getContext("2d");return l.clearRect(0,0,c,d),l.drawImage(r,0,0,c,d),i.toDataURL("image/png")}catch(r){return console.warn("[reservations/pdf] failed to rasterize SVG content",r),null}finally{URL.revokeObjectURL(s)}}async function Ad(e){if(!e)return null;if(Li.test(e))return wd(e);try{const t=await fetch(e,{mode:"cors",credentials:"omit",cache:"default"});return t.ok?await t.text():(console.warn("[reservations/pdf] failed to fetch SVG image",e,t.status),null)}catch(t){return console.warn("[reservations/pdf] error fetching SVG image",e,t),null}}async function kd(e){if(!e)return!1;const t=e.getAttribute?.("src")||"";if(!zi(t))return!1;const n=await Ad(t);if(!n)return e.dataset.svgRasterization="failed",e.setAttribute("src",ns),!1;const a=await Hi(n);return a?(e.dataset.svgOriginalSrc=t,e.setAttribute("src",a),e.setAttribute("data-rasterized","true"),!0):(e.dataset.svgRasterization="failed",e.setAttribute("src",ns),!1)}async function _d(e){if(!e||e.tagName?.toLowerCase()!=="svg")return!1;const n=new XMLSerializer().serializeToString(e),a=xd(e),s=await Hi(n,a),i=(e.ownerDocument||document).createElement("img");i.setAttribute("src",s||ns),i.setAttribute("alt",e.getAttribute("aria-label")||e.getAttribute("title")||""),i.setAttribute("data-svg-replaced","true"),e.hasAttribute("class")&&i.setAttribute("class",e.getAttribute("class")),e.hasAttribute("style")&&i.setAttribute("style",e.getAttribute("style"));const c=e.getAttribute("width"),d=e.getAttribute("height");return c&&i.setAttribute("width",c),d&&i.setAttribute("height",d),e.parentNode?.replaceChild(i,e),!!s}async function Oi(e){if(!e)return;const t=Array.from(e.querySelectorAll?.("img")||[]),n=Array.from(e.querySelectorAll?.("svg")||[]),a=[];t.forEach(s=>{zi(s.getAttribute?.("src"))&&a.push(kd(s))}),n.forEach(s=>{a.push(_d(s))}),a.length&&await Promise.allSettled(a)}function $d(e,{pixelRatio:t=1}={}){if(!e)return null;const n=e.ownerDocument||document,s=(n.defaultView||window).getComputedStyle?.(e);if(!s)return null;const r=($,R=0)=>{const D=parseFloat($);return Number.isFinite(D)?D:R},i=r(s.paddingTop),c=r(s.paddingBottom),d=r(s.paddingRight),l=r(s.paddingLeft),u=r(s.borderRadius),p=r(s.fontSize,14),f=(()=>{const $=s.lineHeight;if(!$||$==="normal")return p*1.6;const R=r($,p*1.6);return R>0?R:p*1.6})(),m=Math.max(e.clientWidth||0,e.scrollWidth||0,r(s.width,0));if(m<=0)return null;const y=Math.max(1,m-l-d),b=e.textContent||"",g=b.split(/\r?\n/),S=n.createElement("canvas"),v=S.getContext("2d");if(!v)return null;const A=s.fontStyle||"normal",L=s.fontVariant||"normal",O=s.fontWeight||"400",q=s.fontFamily||"sans-serif",w=s.fontStretch||"normal",k=$=>$.join(" "),N=[],P=$=>v.measureText($).width;v.font=`${A} ${L} ${O} ${w} ${p}px ${q}`,g.forEach($=>{const R=$.trim();if(R.length===0){N.push("");return}const D=R.split(/\s+/);let z=[];D.forEach((H,ne)=>{const ee=H.trim();if(!ee)return;const oe=k(z.concat(ee));if(P(oe)<=y||z.length===0){z.push(ee);return}N.push(k(z)),z=[ee]}),z.length&&N.push(k(z))}),N.length||N.push("");const T=i+c+N.length*f,I=Math.ceil(Math.max(1,m)*t),F=Math.ceil(Math.max(1,T)*t);S.width=I,S.height=F,S.style.width=`${Math.max(1,m)}px`,S.style.height=`${Math.max(1,T)}px`,v.scale(t,t);const B=s.backgroundColor&&s.backgroundColor!=="rgba(0, 0, 0, 0)"?s.backgroundColor:"#ffffff";if(u>0){v.save(),v.beginPath();const $=Math.max(1,m),R=Math.max(1,T),D=Math.min(u,$/2,R/2);v.moveTo(D,0),v.lineTo($-D,0),v.quadraticCurveTo($,0,$,D),v.lineTo($,R-D),v.quadraticCurveTo($,R,$-D,R),v.lineTo(D,R),v.quadraticCurveTo(0,R,0,R-D),v.lineTo(0,D),v.quadraticCurveTo(0,0,D,0),v.closePath(),v.clip()}if(v.fillStyle=B,v.fillRect(0,0,Math.max(1,m),Math.max(1,T)),v.font=`${A} ${L} ${O} ${w} ${p}px ${q}`,v.fillStyle=s.color||"#000000",v.textBaseline="top",v.textAlign="right","direction"in v)try{v.direction="rtl"}catch{}const V=Math.max(0,m-d);let _=i;N.forEach($=>{const R=$.length?$:" ";v.fillText(R,V,_,y),_+=f});const W=n.createElement("img");let K;try{K=S.toDataURL("image/png")}catch($){return ot("note canvas toDataURL failed",$),null}return W.src=K,W.alt=b,W.style.width=`${Math.max(1,m)}px`,W.style.height=`${Math.max(1,T)}px`,W.style.display="block",W.setAttribute("data-quote-note-image","true"),{image:W,canvas:S,totalHeight:T,width:m}}function Nd(e,{pixelRatio:t=1}={}){if(!e||!Ea())return;Array.from(e.querySelectorAll?.(".quote-notes")||[]).forEach(a=>{if(!a||a.dataset.quoteNoteRasterized==="true"||!Mi(a.textContent||""))return;let s;try{s=$d(a,{pixelRatio:t})}catch(r){ot("failed to rasterize note content",r),s=null}s&&(a.dataset.quoteNoteRasterized="true",a.innerHTML="",a.appendChild(s.image))})}function is(e,t="export",{toastMessage:n,suppressToast:a=!1}={}){vd(`${t} failed`,e);const s=!!(e&&e.__artRatioPdfNotified);if(!a&&!s){const r=o("reservations.quote.errors.exportFailed","⚠️ تعذر إنشاء ملف PDF، يرجى المحاولة مرة أخرى."),i=n||r,c=o("reservations.quote.toast.viewGuide","📘 عرض دليل الحل السريع"),d=o("reservations.quote.toast.retry","إعادة المحاولة"),l=["exportQuoteAsPdf","renderQuotePreview","layoutQuoteDocument","pageCapture"].includes(t),u=()=>{t==="exportQuoteAsPdf"?(Tt("export"),to()):(Tt("render"),gn=!1,Ht())};if(Pr({message:i,duration:9e3,actionLabel:l?d:void 0,onAction:l?u:void 0,linkLabel:c,linkHref:wi}),X?.modal?.classList.contains("show")&&Tt("error",{message:i,actionLabel:l?d:void 0,onAction:l?u:void 0,showSpinner:!1}),e&&typeof e=="object")try{Object.defineProperty(e,"__artRatioPdfNotified",{value:!0,writable:!1,enumerable:!1,configurable:!0})}catch{}}}function os({container:e,safariWindowRef:t,mobileWindowRef:n}={}){try{n&&!n.closed&&n.close()}catch(a){ot("failed to close mobile window",a)}try{t&&!t.closed&&t.close()}catch(a){ot("failed to close safari window",a)}e&&e.parentNode&&e.parentNode.removeChild(e)}function Ms(e){return new Promise((t,n)=>{const a=document.querySelector(`script[src="${e}"]`);if(a){a.addEventListener("load",()=>t()),a.addEventListener("error",r=>n(r)),a.readyState==="complete"&&t();return}const s=document.createElement("script");s.src=e,s.async=!0,s.onload=()=>t(),s.onerror=r=>n(r),document.head.appendChild(s)})}function qr(){const e=[window.jspdf?.jsPDF,typeof window.jspdf=="function"?window.jspdf:null,window.jsPDF?.jsPDF,typeof window.jsPDF=="function"?window.jsPDF:null].filter(t=>typeof t=="function");return e.length?e[0]:null}function Sr(){return typeof window.html2canvas=="function"?window.html2canvas:null}async function Pd(){const e=Sr();return e||(dn||(dn=Ms(id).catch(t=>{throw dn=null,t}).then(()=>{const t=Sr();if(!t)throw dn=null,new Error("تعذر تحميل مكتبة html2canvas المطلوبة.");return t})),dn)}async function Td(){const e=qr();return e||(ln||(ln=Ms(od).catch(t=>{throw ln=null,t}).then(()=>{const t=qr();if(!t)throw ln=null,new Error("تعذر تحميل مكتبة jsPDF المطلوبة.");return t})),ln)}async function jd(){if(window.html2pdf||await Ms(rd),window.html2pdf&&!window.html2pdf.__artRatioConfigured){const e=window.html2pdf.defaultOptions||window.html2pdf.defaultOpt||{},t={...e.html2canvas||{}};t.useCORS=!0,t.allowTaint=!1,t.logging=!0;const n={unit:"mm",format:"a4",orientation:"portrait",compress:!0,...e.jsPDF||{}},a={image:{type:"jpeg",quality:.95,...e.image||{}},margin:e.margin??[0,0,0,0],filename:e.filename||"document.pdf",html2canvas:t,jsPDF:n};window.html2pdf.defaultOptions=a,window.html2pdf.defaultOpt=a,window.html2pdf.__artRatioConfigured=!0}Yl(),Ed()}function x(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Cd(e="reservation"){return e==="project"?"QP":"Q"}function Ld(e,t="reservation"){const n=Number(e),a=Cd(t);return!Number.isFinite(n)||n<=0?`${a}-0001`:`${a}-${String(n).padStart(4,"0")}`}function Bd(){const e=window.localStorage?.getItem?.(xi),t=parseInt(e??"",10);return Number.isFinite(t)&&t>0?t:0}function Vi(e="reservation"){const n=Bd()+1;return{sequence:n,quoteNumber:Ld(n,e)}}function Fd(e){try{const t=Number(e);if(!Number.isFinite(t)||t<=0)return;window.localStorage?.setItem?.(xi,String(t))}catch(t){console.warn("⚠️ [reservations/pdf] failed to persist quote sequence",t)}}function Ui(e="reservation"){return br[e]||br.reservation}function Dd(e="reservation"){try{const t=Ui(e),n=window.localStorage?.getItem?.(t);if(!n)return null;const a=JSON.parse(n);return a&&typeof a=="object"?a:null}catch(t){return console.warn("⚠️ [reservations/pdf] failed to read toggle preferences",t),null}}function Rd(e,t="reservation"){try{const n=Ui(t);if(!e){window.localStorage?.removeItem?.(n);return}window.localStorage?.setItem?.(n,JSON.stringify(e))}catch(n){console.warn("⚠️ [reservations/pdf] failed to persist toggle preferences",n)}}function Md(e){if(!e)return{ids:null,emptyExplicitly:!1};if(e instanceof Set)return{ids:Array.from(e),emptyExplicitly:e.size===0};if(Array.isArray(e))return{ids:e.slice(),emptyExplicitly:e.length===0};if(typeof e=="object"){const t=Object.entries(e).filter(([,n])=>!!n);return{ids:t.map(([n])=>n),emptyExplicitly:t.length===0}}return{ids:null,emptyExplicitly:!1}}function zd(e,t="reservation"){if(!e)return null;const n=Pi(t),a=Ti(t),s=Array.from(e.sections instanceof Set?e.sections:new Set(e.sections||[])).filter(c=>n.has(c)),r={},i=e.fields||{};return Object.entries(a).forEach(([c,d])=>{const l=i[c];if(l==null)return;const{ids:u,emptyExplicitly:p}=Md(l);if(!u&&!p)return;const f=Array.isArray(u)?u.filter(m=>d.has(m)):[];(f.length>0||p)&&(r[c]=f)}),{version:1,sections:s,fields:r}}function Ki(e){if(!e)return;const t=e.context||"reservation",n=zd(e,t);n&&Rd(n,t)}function Qi(e){if(!e)return;const t=e.context||"reservation",n=Dd(t);if(!n)return;const a=Pi(t),s=Array.isArray(n.sections)?n.sections.filter(r=>a.has(r)):[];if(s.length&&(e.sections=new Set(s)),n.fields&&typeof n.fields=="object"){const r=Ls(e.fields||Sa(t)),i=Ti(t);Object.entries(n.fields).forEach(([c,d])=>{const l=i[c];if(!l)return;const u=Array.isArray(d)?d.filter(p=>l.has(p)):[];r[c]=new Set(u)}),e.fields=r}}function Gi(e=new Date){try{return e.toLocaleDateString("en-GB",{year:"numeric",month:"2-digit",day:"2-digit"})}catch{return e.toISOString().slice(0,10)}}function Wi(e={}){const t=[e.dailyWage,e.daily_rate,e.dailyRate,e.wage,e.rate];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return 0}function Hd(e={}){const t=[e.dailyTotal,e.daily_total,e.totalRate,e.total,e.total_wage];for(const n of t){if(n==null)continue;const a=parseFloat(h(String(n)));if(Number.isFinite(a))return a}return Wi(e)}function Od(e){const t=In()||[],{technicians:n=[]}=ue(),a=[].concat(Array.isArray(t)?t:[]).concat(Array.isArray(n)?n:[]),s=new Map;return a.forEach(r=>{if(!r||r.id==null)return;const i=String(r.id),c=s.get(i)||{};s.set(i,{...c,...r})}),(e.technicians||[]).map(r=>s.get(String(r))).filter(Boolean)}function Vd(e,t,n){const{projectLinked:a}=qt(e,n),s=la(e.start,e.end),{groups:r}=ks(e),c=r.reduce((K,$)=>{const R=Array.isArray($?.items)&&$.items.length?$.items[0]:{},D=Number($?.count??$?.quantity??R?.qty??1)||1;let H=[R?.price,R?.unit_price,R?.unitPrice,$?.unitPrice].reduce((ee,oe)=>{if(Number.isFinite(ee)&&ee>0)return ee;const Q=Number(oe);return Number.isFinite(Q)?Q:ee},NaN);if(!Number.isFinite(H)||H<=0){const ee=Number($?.totalPrice??R?.total??R?.total_price);Number.isFinite(ee)&&D>0&&(H=Number((ee/D).toFixed(2)))}Number.isFinite(H)||(H=0),H=Oe(H);const ne=Oe(H);return K+ne*D},0)*s,d=t.reduce((K,$)=>K+Wi($),0),l=t.reduce((K,$)=>K+Hd($),0),u=d*s,p=l*s,f=c+p,m=parseFloat(e.discount)||0,y=e.discountType==="amount"?m:f*(m/100),b=Math.max(0,f-y),g=a?!1:e.applyTax,S=Number(e.cost),v=Number.isFinite(S),A=e.companySharePercent??e.company_share_percent??e.companyShare??e.company_share??null,L=A!=null?parseFloat(h(String(A).replace("%","").trim())):NaN,O=e.companyShareEnabled??e.company_share_enabled??e.companyShareApplied??e.company_share_applied??null;let w=(O!=null?O===!0||O===1||O==="1"||String(O).toLowerCase()==="true":Number.isFinite(L)&&L>0)&&Number.isFinite(L)?Number(L):0;g&&w<=0&&(w=ct);let k=w>0?Math.max(0,b*(w/100)):0;k=Number(k.toFixed(2));const N=b+k;let P=g?N*.15:0;(!Number.isFinite(P)||P<0)&&(P=0),P=Number(P.toFixed(2));const T=N+P,I=Number.isFinite(T)?Number(T.toFixed(2)):0,F=a?I:v?S:I,B=Math.max(0,c+p-y),V=Math.max(0,B-u),_={equipmentTotal:c,crewTotal:p,crewCostTotal:u,discountAmount:y,subtotalAfterDiscount:b,taxableAmount:N,taxAmount:P,finalTotal:F,companySharePercent:w,companyShareAmount:k,netProfit:V},W={equipmentTotal:h(c.toFixed(2)),crewTotal:h(p.toFixed(2)),discountAmount:h(y.toFixed(2)),subtotalAfterDiscount:h(b.toFixed(2)),taxableAmount:h(N.toFixed(2)),taxAmount:h(P.toFixed(2)),finalTotal:h(F.toFixed(2)),companySharePercent:h(w.toFixed(2)),companyShareAmount:h(k.toFixed(2)),netProfit:h(V.toFixed(2))};return{totals:_,totalsDisplay:W,rentalDays:s}}function Zt(e){if(e==null||e==="")return null;const t=Number.parseFloat(h(String(e)));return Number.isFinite(t)?t:null}function Xi(e){if(!e)return new Date().toISOString();const t=new Date(e);return Number.isNaN(t.getTime())?new Date().toISOString():t.toISOString()}function Ud(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n!=="percent"&&(n="amount");const a=Zt(e.amount??(n==="amount"?e.value:null)),s=Zt(e.percentage??(n==="percent"?e.value:null)),r=n==="percent"?s??null:a??null,i=e.note??e.memo??null,c=Xi(e.recordedAt??e.recorded_at??e.date??e.created_at??null);return n==="amount"&&a==null||n==="percent"&&s==null?null:{type:n,amount:a??null,percentage:s??null,value:r,note:i,recordedAt:c}}function Kd(e={}){const n=(Array.isArray(e.paymentHistory)?e.paymentHistory:Array.isArray(e.payment_history)?e.payment_history:[]).map(Ud).filter(Boolean);if(n.length>0)return n;const a=Zt(e.paidPercent??e.paid_percent),s=Zt(e.paidAmount??e.paid_amount),r=e.updatedAt??e.updated_at??e.createdAt??e.created_at??null,i=Xi(r);return a!=null&&a>0?[{type:"percent",amount:s!=null&&s>0?s:null,percentage:a,value:a,note:null,recordedAt:i}]:s!=null&&s>0?[{type:"amount",amount:s,percentage:null,value:s,note:null,recordedAt:i}]:[]}function Qd(e){if(!e)return o("projects.form.types.unknown","نوع غير محدد");const t={commercial:"projects.form.types.commercial",coverage:"projects.form.types.coverage",photography:"projects.form.types.photography",social:"projects.form.types.social"}[e]||"projects.form.types.unknown";return o(t,e)}function Gd(e){const t=new Date,n=e?.start?new Date(e.start):null,a=e?.end?new Date(e.end):null;return n&&!Number.isNaN(n.getTime())&&n>t?"upcoming":a&&!Number.isNaN(a.getTime())&&a<t?"completed":"ongoing"}function Wd(e){return typeof e?.expensesTotal=="number"?e.expensesTotal:Array.isArray(e?.expenses)?e.expenses.reduce((t,n)=>t+(Number(n?.amount)||0),0):0}function Xd(e){const t=Number(e?.equipmentEstimate)||0,n=Wd(e),a=t+n,s=e?.applyTax===!0||e?.applyTax==="true",r=Number.parseFloat(e?.discount??e?.discountValue??0)||0;let c=(e?.discountType==="amount"?"amount":"percent")==="amount"?r:a*(r/100);(!Number.isFinite(c)||c<0)&&(c=0),c>a&&(c=a);const d=Math.max(0,a-c),l=e?.companyShareEnabled===!0||e?.companyShareEnabled==="true"||e?.company_share_enabled===!0||e?.company_share_enabled==="true",u=Number.parseFloat(e?.companySharePercent??e?.company_share_percent??e?.companyShare??e?.company_share??0)||0,p=l&&s&&u>0?u:0,f=p>0?Number((d*(p/100)).toFixed(2)):0,m=d+f;let y=s?m*hi:0;(!Number.isFinite(y)||y<0)&&(y=0),y=Number(y.toFixed(2));let b=s?Number(e?.totalWithTax):m;return s?(!Number.isFinite(b)||b<=0)&&(b=Number((m+y).toFixed(2))):b=m,{equipmentEstimate:t,expensesTotal:n,baseSubtotal:a,discountAmount:c,subtotalAfterDiscount:d,companyShareAmount:f,subtotal:m,applyTax:s,taxAmount:y,totalWithTax:b}}function Jd(e){if(!e)return 0;const t=Array.isArray(e.items)?e.items:[],n=e.discount??0,a=Number(h(String(n)))||0,s=e.discountType||"percent",r=Array.isArray(e.technicians)?e.technicians:[],i=bs(t,a,s,!1,r,{start:e.start,end:e.end});if(Number.isFinite(i))return i;const c=Number(h(String(e.cost??0)));return Number.isFinite(c)?Math.round(c):0}function Yd(e,t){if(!e)return"—";const n=Re(e);return t?`${n} - ${Re(t)}`:n}function ie(e,t="SR",n=2){const a=Number(e)||0,s=Number.isInteger(n)?n:2;return`${h(a.toFixed(s))} ${t}`}function Er(e,t=2){if(!Number.isFinite(Number(e)))return"0%";const n=Number.isInteger(t)?t:2;return`${h(Number(e).toFixed(n))}%`}function Zd(e){if(!e?.start)return null;if(!e?.end)return 1;const t=la(e.start,e.end);return Number.isFinite(t)?t:1}function eu(e){return Number.isFinite(e)?e<=1?"يوم واحد":`${h(String(Math.round(e)))} أيام`:"غير محدد"}function tu(e){const t=o("reservations.create.summary.currency","SR"),{customers:n=[],reservations:a=[],projects:s=[],technicians:r=[]}=ue(),i=e?.id!=null?s.find(C=>String(C.id)===String(e.id))||e:e||null,c={projectStatusLabel:o("projects.status.ongoing","قيد التنفيذ"),paymentStatusLabel:o("projects.paymentStatus.unpaid","غير مدفوع")};if(!i)return{project:null,customer:null,clientInfo:{name:"-",company:"-",phone:"-",email:"-"},projectInfo:{title:"-",code:"-",typeLabel:"-",startDisplay:"-",endDisplay:"-",durationLabel:"-",statusLabel:c.projectStatusLabel},expenses:[],equipment:[],reservations:[],totals:{equipmentEstimate:0,expensesTotal:0,baseSubtotal:0,discountAmount:0,subtotalAfterDiscount:0,companyShareAmount:0,subtotal:0,applyTax:!1,taxAmount:0,totalWithTax:0},totalsDisplay:{projectSubtotal:ie(0,t),expensesTotal:ie(0,t),reservationsTotal:ie(0,t),discountAmount:ie(0,t),taxAmount:ie(0,t),overallTotal:ie(0,t),paidAmount:ie(0,t),remainingAmount:ie(0,t)},projectTotals:{combinedTaxAmount:0,overallTotal:0,reservationsTotal:0,paidAmount:0,paidPercent:0,remainingAmount:0,paymentStatus:"unpaid"},paymentSummary:{status:"unpaid",statusLabel:c.paymentStatusLabel,paidAmount:0,paidPercent:0,remainingAmount:0,paidAmountDisplay:ie(0,t),remainingAmountDisplay:ie(0,t),paidPercentDisplay:Er(0)},notes:"",currencyLabel:t,projectStatus:"ongoing",projectStatusLabel:c.projectStatusLabel,projectDurationDays:null,projectDurationLabel:"غير محدد",paymentHistory:[]};const d=i.clientId??i.customerId??i.client_id??i.customer_id??null,l=d!=null&&n.find(C=>String(C.id)===String(d))||null,u=l?.customerName??l?.name??i.clientName??i.customerName??o("projects.fallback.unknownClient","عميل غير معروف"),p=(i.clientCompany||l?.companyName||l?.company||"").trim(),f=l?.phone??l?.customerPhone??i.clientPhone??i.customerPhone??"",m=f?h(String(f).trim()):o("projects.details.client.noPhone","لا يوجد رقم متاح"),y=l?.email??i.clientEmail??i.customerEmail??"",b=y?String(y).trim():o("projects.details.client.noEmail","لا يوجد بريد متاح"),g=i.projectCode||`PRJ-${h(String(i.id??""))}`,S=h(String(g)),v=(i.title||"").trim()||o("projects.fallback.untitled","مشروع بدون عنوان"),A=Qd(i.type),L=i.start?Re(i.start):"—",O=i.end?Re(i.end):"—",q=Zd(i),w=q!=null?eu(q):"غير محدد",k=Gd(i),N={upcoming:"قادم",ongoing:"قيد التنفيذ",completed:"مكتمل"},P=o(`projects.status.${k}`,N[k]||k),T=i.id!=null?String(i.id):null,I=T?a.filter(C=>String(C.projectId)===T):[],B=I.map(C=>{const ae=C.reservationId||C.id||"",me=C.status||C.state||"pending",ce=String(me).toLowerCase(),fe=o(`reservations.status.${ce}`,ce),Be=Jd(C),$e=C.start?new Date(C.start).getTime():0;return{reservationId:h(String(ae||"-")),status:ce,statusLabel:fe,total:Be,totalLabel:ie(Be,t),dateRange:Yd(C.start,C.end),startTimestamp:Number.isNaN($e)?0:$e}}).sort((C,ae)=>ae.startTimestamp-C.startTimestamp).map(({startTimestamp:C,...ae})=>ae).reduce((C,ae)=>C+(Number(ae.total)||0),0),V=new Map;I.forEach(C=>{const ae=Array.isArray(C.items)?C.items:[],me=la(C.start,C.end),ce=C.reservationId||C.id||"";ae.forEach((fe,Be)=>{if(!fe)return;const $e=fe.barcode||fe.code||fe.id||fe.desc||fe.description||`item-${Be}`,ve=String($e||`item-${Be}`),Qe=V.get(ve)||{description:fe.desc||fe.description||fe.name||fe.barcode||`#${h(String(Be+1))}`,totalQuantity:0,reservationsCount:0,reservationIds:new Set,totalCost:0},Ot=Number(fe.qty)||1,sn=Number(fe.price)||0;Qe.totalQuantity+=Ot,Qe.reservationIds.add(String(ce));const Vt=sn*Ot*Math.max(1,me);Number.isFinite(Vt)&&(Qe.totalCost+=Vt),V.set(ve,Qe)})});const _=Array.from(V.values()).map(C=>({description:C.description,totalQuantity:C.totalQuantity,reservationsCount:C.reservationIds.size,displayCost:ie(C.totalCost,t)})),W=new Map((r||[]).filter(Boolean).map(C=>[String(C.id),C])),K=new Map,$=C=>{if(!C)return;let ae=null;typeof C=="object"?ae=C.id??C.technicianId??C.technician_id??C.userId??C.user_id??null:(typeof C=="string"||typeof C=="number")&&(ae=C);const me=ae!=null?String(ae):null,ce=me&&W.has(me)?W.get(me):typeof C=="object"?C:null,fe=ce?.name||ce?.full_name||ce?.fullName||ce?.displayName||(typeof C=="string"?C:null),Be=ce?.role||ce?.title||null,$e=ce?.phone||ce?.mobile||ce?.contact||null;if(!fe&&!me)return;const ve=me||fe;K.has(ve)||K.set(ve,{id:me,name:fe||"-",role:Be||null,phone:$e||null})};Array.isArray(i?.technicians)&&i.technicians.forEach(C=>$(C)),I.forEach(C=>{(Array.isArray(C.technicians)?C.technicians:[]).forEach(me=>$(me))});const R=Array.from(K.values()),D=Array.isArray(i.expenses)?i.expenses.map(C=>{const ae=Number(C?.amount)||0;return{label:C?.label||C?.name||"-",amount:ae,displayAmount:ie(ae,t),note:C?.note||C?.description||""}}):[],z=Xd(i),H=z.applyTax?Number(((z.subtotal+B)*hi).toFixed(2)):0,ne=Number((z.subtotal+B+H).toFixed(2)),ee=Kd(i),oe=Zt(i.paidAmount??i.paid_amount)||0,Q=Zt(i.paidPercent??i.paid_percent)||0,re=hs({totalAmount:ne,paidAmount:oe,paidPercent:Q,history:ee}),ge=typeof i.paymentStatus=="string"?i.paymentStatus.toLowerCase():"",be=vs({manualStatus:ge,paidAmount:re.paidAmount,paidPercent:re.paidPercent,totalAmount:ne}),Ie={paid:"مدفوع",partial:"مدفوع جزئياً",unpaid:"غير مدفوع"},U=o(`projects.paymentStatus.${be}`,Ie[be]||be),Z=Number(re.paidAmount||0),se=Number(re.paidPercent||0),pe=Math.max(0,Number((ne-Z).toFixed(2))),je={projectSubtotal:ie(z.subtotal,t),expensesTotal:ie(z.expensesTotal,t),reservationsTotal:ie(B,t),discountAmount:ie(z.discountAmount,t),taxAmount:ie(H,t),overallTotal:ie(ne,t),paidAmount:ie(Z,t),remainingAmount:ie(pe,t)},Ke={status:be,statusLabel:U,paidAmount:Z,paidPercent:se,remainingAmount:pe,paidAmountDisplay:ie(Z,t),remainingAmountDisplay:ie(pe,t),paidPercentDisplay:Er(se)},G=(i.description||"").trim();return{project:i,customer:l,clientInfo:{name:u,company:p||"—",phone:m,email:b},projectInfo:{title:v,code:S,typeLabel:A,startDisplay:L,endDisplay:O,durationLabel:w,statusLabel:P},expenses:D,equipment:_,crew:R,totals:z,totalsDisplay:je,projectTotals:{combinedTaxAmount:H,overallTotal:ne,reservationsTotal:B,paidAmount:Z,paidPercent:se,remainingAmount:pe,paymentStatus:be},paymentSummary:Ke,notes:G,currencyLabel:t,projectStatus:k,projectStatusLabel:P,projectDurationDays:q,projectDurationLabel:w,paymentHistory:ee}}function nu({project:e,clientInfo:t={},projectInfo:n={},projectCrew:a=[],projectExpenses:s=[],projectEquipment:r=[],totalsDisplay:i={},projectTotals:c={},paymentSummary:d={},currencyLabel:l="SR",sections:u,fieldSelections:p={},quoteNumber:f,quoteDate:m,terms:y=Le}){const b=Ls(p),g=(U,Z)=>Bs(b,U,Z),S=U=>u?.has?.(U),v=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,A=(U,Z)=>`<div class="info-plain__item">
      <span class="info-plain__label">${x(U)}</span>
      <span class="info-plain__separator">:</span>
      <span class="info-plain__value">${x(Z)}</span>
    </div>`,L=(U,Z,{variant:se="inline"}={})=>se==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(U)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(Z)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(U)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(Z)}</span>
    </span>`,O=(U,Z)=>`<div class="payment-row">
      <span class="payment-row__label">${x(U)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(Z)}</span>
    </div>`,q=[];g("customerInfo","customerName")&&q.push(A(o("projects.details.client","العميل"),t.name||"-")),g("customerInfo","customerCompany")&&q.push(A(o("projects.details.company","شركة العميل"),t.company||"—")),g("customerInfo","customerPhone")&&q.push(A(o("projects.details.labels.clientPhone","رقم العميل"),t.phone||"-")),g("customerInfo","customerEmail")&&q.push(A(o("projects.details.labels.clientEmail","البريد الإلكتروني"),t.email||"-"));const w=S("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.customer","بيانات العميل"))}</h3>
        ${q.length?`<div class="info-plain">${q.join("")}</div>`:v}
      </section>`:"",k=[];g("projectInfo","projectType")&&k.push(A(o("projects.details.type","نوع المشروع"),n.typeLabel||"-")),g("projectInfo","projectTitle")&&k.push(A(o("projects.details.projectTitle","اسم المشروع"),n.title||"-")),g("projectInfo","projectCode")&&k.push(A(o("projects.details.labels.code","رقم المشروع"),n.code||"-")),g("projectInfo","projectStart")&&k.push(A(o("projects.details.start","بداية المشروع"),n.startDisplay||"-")),g("projectInfo","projectEnd")&&k.push(A(o("projects.details.end","نهاية المشروع"),n.endDisplay||"-")),g("projectInfo","projectDuration")&&k.push(A(o("projects.details.duration","مدة المشروع"),n.durationLabel||"-")),g("projectInfo","projectStatus")&&k.push(A(o("projects.details.status","حالة المشروع"),n.statusLabel||"-"));const N=S("projectInfo")?`<section class="quote-section quote-section--plain quote-section--project">
        <h3 class="quote-section__title">${x(o("projects.quote.sections.project","بيانات المشروع"))}</h3>
        ${k.length?`<div class="info-plain">${k.join("")}</div>`:v}
      </section>`:"",P=ki.filter(U=>g("projectCrew",U.id)),T=S("projectCrew")?P.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${P.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${a.length?a.map((U,Z)=>`<tr>${P.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(P.length,1)}" class="empty">${x(o("projects.details.crew.empty","لا يوجد طاقم فني مرتبط."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.crew","طاقم العمل"))}</h3>
            ${v}
          </section>`:"",I=[];g("financialSummary","projectSubtotal")&&I.push(L(o("projects.details.summary.projectSubtotal","إجمالي المشروع"),i.projectSubtotal||`${ie(0,l)}`)),g("financialSummary","expensesTotal")&&I.push(L(o("projects.details.expensesTotal","إجمالي متطلبات المشروع"),i.expensesTotal||ie(0,l))),g("financialSummary","reservationsTotal")&&I.push(L(o("projects.details.reservationsTotal","إجمالي الحجوزات"),i.reservationsTotal||ie(0,l))),g("financialSummary","discountAmount")&&I.push(L(o("reservations.details.labels.discount","الخصم"),i.discountAmount||ie(0,l))),g("financialSummary","taxAmount")&&I.push(L(o("projects.details.summary.combinedTax","إجمالي الضريبة"),i.taxAmount||ie(0,l)));const F=[];g("financialSummary","overallTotal")&&F.push(L(o("projects.details.summary.overallTotal","الإجمالي الكلي"),i.overallTotal||ie(0,l),{variant:"final"})),g("financialSummary","paidAmount")&&F.push(L(o("projects.details.summary.paidAmount","إجمالي المدفوع"),i.paidAmount||ie(0,l),{variant:"final"})),g("financialSummary","remainingAmount")&&F.push(L(o("projects.details.summary.remainingAmount","المتبقي للدفع"),i.remainingAmount||ie(0,l),{variant:"final"}));const B=S("financialSummary")?!I.length&&!F.length?`<section class="quote-section quote-section--financial">${v}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("projects.quote.sections.financial","الملخص المالي"))}</h3>
            ${I.length?`<div class="totals-inline">${I.join("")}</div>`:""}
            ${F.length?`<div class="totals-final">${F.join("")}</div>`:""}
          </div>
        </section>`:"",V=_i.filter(U=>g("projectExpenses",U.id)),_=S("projectExpenses")?V.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${V.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${s.length?s.map((U,Z)=>`<tr>${V.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(V.length,1)}" class="empty">${x(o("projects.details.expenses.empty","لا توجد متطلبات مسجلة."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.expenses","متطلبات المشروع"))}</h3>
            ${v}
          </section>`:"",W=$i.filter(U=>g("projectEquipment",U.id)),K=S("projectEquipment")?W.length?`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${W.map(U=>`<th>${x(U.labelKey?o(U.labelKey,U.fallback):U.fallback)}</th>`).join("")}</tr>
              </thead>
              <tbody>${r.length?r.map((U,Z)=>`<tr>${W.map(se=>`<td>${se.render(U,Z)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(W.length,1)}" class="empty">${x(o("projects.details.equipment.empty","لا توجد معدات مرتبطة حالياً."))}</td></tr>`}
              </tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("projects.quote.sections.equipment","المعدات"))}</h3>
            ${v}
          </section>`:"",$=(e?.description||"").trim()||"",R=S("projectNotes")?`<section class="quote-section">
        <h3>${x(o("projects.quote.sections.notes","ملاحظات المشروع"))}</h3>
        <div class="quote-notes">${x($||o("projects.fallback.noDescription","لا يوجد وصف للمشروع."))}</div>
      </section>`:"",D=[];g("payment","beneficiary")&&D.push(O(o("reservations.quote.labels.beneficiary","اسم المستفيد"),we.beneficiaryName)),g("payment","bank")&&D.push(O(o("reservations.quote.labels.bank","اسم البنك"),we.bankName)),g("payment","account")&&D.push(O(o("reservations.quote.labels.account","رقم الحساب"),h(we.accountNumber))),g("payment","iban")&&D.push(O(o("reservations.quote.labels.iban","رقم الآيبان"),h(we.iban)));const z=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${D.length?D.join(""):v}</div>
      </div>
      <p class="quote-approval-note">${x(we.approvalNote)}</p>
    </section>`,H=Array.isArray(y)&&y.length?y:Le,ne=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${H.map(U=>`<li>${x(U)}</li>`).join("")}</ul>
      </footer>`,ee=[],oe=[];if(N&&oe.push({key:"project",html:N}),w&&oe.push({key:"customer",html:w}),oe.length>1){const U=oe.find(pe=>pe.key==="project"),Z=oe.find(pe=>pe.key==="customer"),se=[];U?.html&&se.push(U.html),Z?.html&&se.push(Z.html),ee.push(he(`<div class="quote-section-row quote-section-row--primary">${se.join("")}</div>`,{blockType:"group"}))}else oe.length===1&&ee.push(he(oe[0].html));const Q=[];T&&Q.push(he(T,{blockType:"table",extraAttributes:'data-table-id="project-crew"'})),_&&Q.push(he(_,{blockType:"table",extraAttributes:'data-table-id="project-expenses"'})),K&&Q.push(he(K,{blockType:"table",extraAttributes:'data-table-id="project-equipment"'}));const re=[];B&&re.push(he(B,{blockType:"summary"})),R&&re.push(he(R));const ge=[he(z,{blockType:"payment"}),he(ne,{blockType:"footer"})],be=[...ta(ee,"projects.quote.placeholder.primary"),...Q,...ta(re,"projects.quote.placeholder.summary"),...ge],Ie=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(we.logoUrl)}" alt="${x(we.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("projects.quote.title","عرض سعر"))}</h1>
        <p class="quote-company-name">${x(we.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(we.commercialRegistry)}</p>
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
      <style>${Ci}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Ie}
          ${be.join("")}
        </div>
      </div>
    </div>
  `}function Ji(e){if(e?.context==="project")return nu(e);const{reservation:t,customer:n,project:a,technicians:s,totals:r,totalsDisplay:i,rentalDays:c,currencyLabel:d,sections:l,fieldSelections:u={},quoteNumber:p,quoteDate:f,terms:m=Le}=e,y=h(String(t?.reservationId??t?.id??"")),b=t.start?h(Re(t.start)):"-",g=t.end?h(Re(t.end)):"-",S=n?.customerName||n?.full_name||n?.name||"-",v=n?.phone||"-",A=n?.email||"-",L=n?.company||n?.company_name||"-",O=h(v),q=a?.title||a?.name||o("reservations.details.project.none","غير مرتبط بمشروع"),w=a?.code||a?.projectCode||"",k=h(String(c)),N=t?.notes||"",P=Array.isArray(m)&&m.length?m:Le,T=Ls(u),I=(J,qe)=>Bs(T,J,qe),F=J=>l?.has?.(J),B=`<div class="quote-placeholder">${x(o("reservations.quote.placeholder.noFields","لم يتم اختيار أي معلومات للعرض في هذا القسم."))}</div>`,V=(J,qe)=>`<div class="info-plain__item">${x(J)} <span class="info-plain__slash">/</span> <strong class="info-plain__value">${x(qe)}</strong></div>`,_=(J,qe,{variant:Ge="inline"}={})=>Ge==="final"?`<div class="totals-item totals-item--final">
        <span class="totals-item__label">${x(J)}</span>
        <span class="totals-item__slash">/</span>
        <span class="totals-item__value">${x(qe)}</span>
      </div>`:`<span class="totals-inline__item">
      <span class="totals-inline__label">${x(J)}</span>
      <span class="totals-inline__slash">/</span>
      <span class="totals-inline__value">${x(qe)}</span>
    </span>`,W=(J,qe)=>`<div class="payment-row">
      <span class="payment-row__label">${x(J)}</span>
      <span class="payment-row__slash">/</span>
      <span class="payment-row__value">${x(qe)}</span>
    </div>`,K=[];I("customerInfo","customerName")&&K.push(V(o("reservations.details.labels.customer","العميل"),S)),I("customerInfo","customerCompany")&&K.push(V(o("reservations.details.labels.company","الشركة"),L)),I("customerInfo","customerPhone")&&K.push(V(o("reservations.details.labels.phone","الهاتف"),O)),I("customerInfo","customerEmail")&&K.push(V(o("reservations.details.labels.email","البريد"),A));const $=F("customerInfo")?`<section class="quote-section quote-section--plain quote-section--customer">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.customer","بيانات العميل"))}</h3>
        ${K.length?`<div class="info-plain">${K.join("")}</div>`:B}
      </section>`:"",R=[];I("reservationInfo","reservationId")&&R.push(V(o("reservations.details.labels.reservationId","رقم الحجز"),y||"-")),I("reservationInfo","reservationStart")&&R.push(V(o("reservations.details.labels.start","بداية الحجز"),b)),I("reservationInfo","reservationEnd")&&R.push(V(o("reservations.details.labels.end","نهاية الحجز"),g)),I("reservationInfo","reservationDuration")&&R.push(V(o("reservations.details.labels.duration","عدد الأيام"),k));const D=F("reservationInfo")?`<section class="quote-section quote-section--plain quote-section--reservation">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.reservation","تفاصيل الحجز"))}</h3>
        ${R.length?`<div class="info-plain">${R.join("")}</div>`:B}
      </section>`:"",z=[];I("projectInfo","projectTitle")&&z.push(V(o("reservations.details.labels.project","المشروع"),q)),I("projectInfo","projectCode")&&z.push(V(o("reservations.details.labels.code","الرمز"),w||"-"));const H=F("projectInfo")?`<section class="quote-section quote-section--plain">
        <h3 class="quote-section__title">${x(o("reservations.quote.sections.project","بيانات المشروع"))}</h3>
        ${z.length?`<div class="info-plain">${z.join("")}</div>`:B}
      </section>`:"",ne=[];I("financialSummary","equipmentTotal")&&ne.push(_(o("reservations.details.labels.equipmentTotal","إجمالي المعدات"),`${i.equipmentTotal} ${d}`)),I("financialSummary","crewTotal")&&ne.push(_(o("reservations.details.labels.crewTotal","إجمالي الفريق"),`${i.crewTotal} ${d}`)),I("financialSummary","discountAmount")&&ne.push(_(o("reservations.details.labels.discount","الخصم"),`${i.discountAmount} ${d}`)),I("financialSummary","taxAmount")&&ne.push(_(o("reservations.details.labels.tax","الضريبة"),`${i.taxAmount} ${d}`));const ee=I("financialSummary","finalTotal"),oe=[];ee&&oe.push(_(o("reservations.details.labels.total","الإجمالي النهائي"),`${i.finalTotal} ${d}`,{variant:"final"}));const Q=oe.length?`<div class="totals-final">${oe.join("")}</div>`:"",re=F("financialSummary")?!ne.length&&!ee?`<section class="quote-section quote-section--financial">${B}</section>`:`<section class="quote-section quote-section--financial">
          <div class="totals-block">
            <h3>${x(o("reservations.details.labels.summary","الملخص المالي"))}</h3>
            ${ne.length?`<div class="totals-inline">${ne.join("")}</div>`:""}
            ${Q}
          </div>
        </section>`:"",{groups:ge}=ks(t),be=ge.map(J=>{const qe=Number(J?.count??J?.quantity??1)||1,Ge=Number(J?.unitPrice);let nt=Number.isFinite(Ge)?Ge:0;if(!nt||nt<=0){const Ut=Number(J?.totalPrice);Number.isFinite(Ut)&&qe>0&&(nt=Number((Ut/qe).toFixed(2)))}Number.isFinite(nt)||(nt=0);const Aa=J?.type==="package"||Array.isArray(J?.items)&&J.items.some(Ut=>Ut?.type==="package"),ka=Array.isArray(J?.barcodes)&&J.barcodes.length?J.barcodes[0]:Array.isArray(J?.items)&&J.items.length?J.items[0]?.barcode:null,_a=J?.barcode??ka??"";let rn=Number.isFinite(Number(J?.totalPrice))?Number(J.totalPrice):Number((nt*qe).toFixed(2));return rn=Oe(rn),{...J,isPackage:Aa,desc:J?.description,barcode:_a,qty:qe,price:nt,totalPrice:rn}}),Ie=Ii.filter(J=>I("items",J.id)),U=Ie.length>0,Z=U?Ie.map(J=>`<th>${x(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",pe=be.length>0?be.map((J,qe)=>`<tr>${Ie.map(Ge=>`<td>${Ge.render(J,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ie.length,1)}" class="empty">${x(o("reservations.details.noItems","📦 لا توجد معدات ضمن هذا الحجز حالياً."))}</td></tr>`,je=F("items")?U?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${Z}</tr>
              </thead>
              <tbody>${pe}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.items.title","المعدات"))}</h3>
            ${B}
          </section>`:"",Ke=Ai.filter(J=>I("crew",J.id)),G=Ke.length>0,ye=G?Ke.map(J=>`<th>${x(J.labelKey?o(J.labelKey,J.fallback):J.fallback)}</th>`).join(""):"",C=s.length?s.map((J,qe)=>`<tr>${Ke.map(Ge=>`<td>${Ge.render(J,qe)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${Math.max(Ke.length,1)}" class="empty">${x(o("reservations.details.noCrew","😎 لا يوجد فريق مرتبط بهذا الحجز."))}</td></tr>`,ae=F("crew")?G?`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            <table class="quote-table">
              <thead>
                <tr>${ye}</tr>
              </thead>
              <tbody>${C}</tbody>
            </table>
          </section>`:`<section class="quote-section quote-section--table">
            <h3>${x(o("reservations.details.technicians.title","طاقم العمل"))}</h3>
            ${B}
          </section>`:"",me=F("notes")?`<section class="quote-section">
        <h3>${x(o("reservations.details.labels.notes","ملاحظات الحجز"))}</h3>
        <div class="quote-notes">${x(N||o("reservations.quote.emptyNotes","لا توجد ملاحظات إضافية."))}</div>
      </section>`:"",ce=[];I("payment","beneficiary")&&ce.push(W(o("reservations.quote.labels.beneficiary","اسم المستفيد"),we.beneficiaryName)),I("payment","bank")&&ce.push(W(o("reservations.quote.labels.bank","اسم البنك"),we.bankName)),I("payment","account")&&ce.push(W(o("reservations.quote.labels.account","رقم الحساب"),h(we.accountNumber))),I("payment","iban")&&ce.push(W(o("reservations.quote.labels.iban","رقم الآيبان"),h(we.iban)));const fe=`<section class="quote-section">
      <div class="payment-block">
        <h3>${x(o("reservations.quote.sections.payment","بيانات الدفع"))}</h3>
        <div class="payment-rows">${ce.length?ce.join(""):B}</div>
      </div>
      <p class="quote-approval-note">${x(we.approvalNote)}</p>
    </section>`,Be=`<footer class="quote-footer">
        <h4>${x(o("reservations.quote.labels.terms","الشروط العامة"))}</h4>
        <ul>${P.map(J=>`<li>${x(J)}</li>`).join("")}</ul>
      </footer>`,$e=[];$&&D?$e.push(he(`<div class="quote-section-row">${$}${D}</div>`,{blockType:"group"})):(D&&$e.push(he(D)),$&&$e.push(he($))),H&&$e.push(he(H));const ve=[];je&&ve.push(he(je,{blockType:"table",extraAttributes:'data-table-id="items"'})),ae&&ve.push(he(ae,{blockType:"table",extraAttributes:'data-table-id="crew"'}));const Qe=[];re&&Qe.push(he(re,{blockType:"summary"})),me&&Qe.push(he(me));const Ot=[he(fe,{blockType:"payment"}),he(Be,{blockType:"footer"})],sn=[...ta($e,"reservations.quote.placeholder.page1"),...ve,...ta(Qe,"reservations.quote.placeholder.page2"),...Ot],Vt=`
    <header class="quote-header" data-quote-header-template>
      <div class="quote-header__logo">
        <img class="quote-logo" src="${x(we.logoUrl)}" alt="${x(we.companyName)}" crossorigin="anonymous"/>
      </div>
      <div class="quote-header__title">
        <h1>${x(o("reservations.quote.title","عرض السعر"))}</h1>
        <p class="quote-company-name">${x(we.companyName)}</p>
        <p class="quote-company-cr">${x(o("reservations.quote.labels.cr","السجل التجاري"))}: ${x(we.commercialRegistry)}</p>
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
      <style>${Ci}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages></div>
        <div class="quote-content-source" data-quote-source>
          ${Vt}
          ${sn.join("")}
        </div>
      </div>
    </div>
  `}function au(e){return e?e.complete?e.naturalHeight===0?Promise.reject(new Error(`image failed to load: ${e.src||"unknown"}`)):Promise.resolve():new Promise((t,n)=>{const a=()=>{r(),t()},s=()=>{r(),n(new Error(`image failed to load: ${e.src||"unknown"}`))},r=()=>{e.removeEventListener("load",a),e.removeEventListener("error",s)};e.addEventListener("load",a,{once:!0}),e.addEventListener("error",s,{once:!0})}):Promise.resolve()}async function Sn(e){if(!e)return;const t=e.ownerDocument||document,n=t.defaultView||window,a=Array.from(e.querySelectorAll?.("img")||[]),s=t.fonts?.ready?t.fonts.ready:Promise.resolve(),r=a.map(c=>au(c)),i=[s,...r].map(c=>c.catch(d=>(ot("asset load failed",d),fd(),null)));await Promise.all(i),await new Promise(c=>n.requestAnimationFrame(()=>c()))}async function Yi(e,{context:t="preview"}={}){if(!e)return;const n=t==="preview",a=e.ownerDocument||document;e.setAttribute("data-quote-render-context",t);const s=e.querySelector("[data-quote-pages]"),r=e.querySelector("[data-quote-source]"),i=r?.querySelector("[data-quote-header-template]");if(!s||!r||!i)return;s.style.display="block",s.style.margin="0",s.style.padding="0",s.style.gap="0px",s.style.rowGap="0px",s.style.columnGap="0px",s.style.alignItems="stretch",s.style.justifyContent="flex-start",await Oi(r),await Sn(r),s.innerHTML="";const c=Array.from(r.querySelectorAll(":scope > [data-quote-block]"));let d=null,l=null;const u=q=>{q.style.margin="0 auto",q.style.breakInside="avoid",q.style.pageBreakInside="avoid",q.style.pageBreakAfter="auto",q.style.breakAfter="auto"},p=()=>{const q=a.createElement("div"),w=s.childElementCount===0;if(q.className="quote-page",q.dataset.pageIndex=String(s.childElementCount),w){q.classList.add("quote-page--primary");const N=i.cloneNode(!0);N.removeAttribute("data-quote-header-template"),q.appendChild(N)}else q.classList.add("quote-page--continuation");const k=a.createElement("main");k.className="quote-body",q.appendChild(k),s.appendChild(q),u(q),d=q,l=k},f=()=>{(!d||!l||!l.isConnected)&&p()},m=()=>{if(!d||!l||l.childElementCount>0)return;const q=d;d=null,l=null,q.parentNode&&q.parentNode.removeChild(q)},y=()=>{d=null,l=null},b=()=>d?d.scrollHeight-d.clientHeight>ld:!1,g=(q,{allowOverflow:w=!1}={})=>(f(),l.appendChild(q),b()&&!w?(l.removeChild(q),m(),!1):!0),S=q=>{const w=q.cloneNode(!0);w.removeAttribute?.("data-quote-block"),w.removeAttribute?.("data-block-type"),w.removeAttribute?.("data-table-id"),!g(w)&&(y(),!g(w)&&g(w,{allowOverflow:!0}))},v=q=>{const w=q.querySelector("table");if(!w){S(q);return}const k=q.querySelector("h3"),N=w.querySelector("thead"),P=Array.from(w.querySelectorAll("tbody tr"));if(!P.length){S(q);return}let T=null,I=0;const F=(V=!1)=>{const _=q.cloneNode(!1);_.removeAttribute("data-quote-block"),_.removeAttribute("data-block-type"),_.removeAttribute("data-table-id"),_.classList.add("quote-section--table-fragment"),V&&_.classList.add("quote-section--table-fragment--continued");const W=k?k.cloneNode(!0):null;W&&_.appendChild(W);const K=w.cloneNode(!1);K.classList.add("quote-table--fragment"),N&&K.appendChild(N.cloneNode(!0));const $=a.createElement("tbody");return K.appendChild($),_.appendChild(K),{section:_,body:$}},B=(V=!1)=>T||(T=F(V),g(T.section)||(y(),g(T.section)||g(T.section,{allowOverflow:!0})),T);P.forEach(V=>{B(I>0);const _=V.cloneNode(!0);if(T.body.appendChild(_),b()&&(T.body.removeChild(_),T.body.childElementCount||(l.removeChild(T.section),T=null,m()),y(),T=null,B(I>0),T.body.appendChild(_),b())){T.section.classList.add("quote-section--table-fragment--overflow"),I+=1;return}I+=1}),T=null};if(!c.length)return;c.forEach(q=>{q.getAttribute("data-block-type")==="table"?v(q):S(q)});const A=Array.from(s.children),L=[];if(A.forEach((q,w)=>{const k=q.querySelector(".quote-body");if(w!==0&&(!k||k.childElementCount===0)){q.remove();return}L.push(q)}),!n){const q=a.defaultView||window,w=Math.min(3,Math.max(1,q.devicePixelRatio||1)),k=Ea()?Math.min(2,w):w;L.forEach(N=>Nd(N,{pixelRatio:k}))}L.forEach((q,w)=>{const k=w===0;q.style.pageBreakAfter="auto",q.style.breakAfter="auto",q.style.pageBreakBefore=k?"auto":"always",q.style.breakBefore=k?"auto":"page",n?q.style.boxShadow="":q.style.boxShadow="none"});const O=L[L.length-1]||null;d=O,l=O?.querySelector(".quote-body")||null,await Sn(s),n&&(s.style.display="flex",s.style.flexDirection="column",s.style.alignItems="center",s.style.justifyContent="flex-start",s.style.rowGap="18px",s.style.columnGap="0px",s.style.gap="18px")}function zs(e,t="#000000"){if(!e)return;e.querySelectorAll('[style*="color"], [class*="text"], h1, h2, h3, h4, h5, h6, p, span, th, td, li, strong, em, label, dt, dd, caption, div').forEach(a=>{a instanceof HTMLElement&&a.style.setProperty("color",t,"important")})}async function su(e,{filename:t,safariWindowRef:n=null,mobileWindowRef:a=null}){if(!e)return;const s=Array.from(e.querySelectorAll(".quote-page"));if(!s.length)throw new Error("لا توجد صفحات لتصديرها.");const[r,i]=await Promise.all([Td(),Pd()]),c=e.ownerDocument||document,d=c?.defaultView?.getComputedStyle?.(e)?.direction,u=[e.getAttribute?.("dir"),e.style?.direction,d,c?.documentElement?.getAttribute?.("dir")].some(q=>typeof q=="string"&&q.toLowerCase().startsWith("rtl")),p=typeof window<"u"&&window.devicePixelRatio||1,f=Rs(),m=Ri(),y=Ea();let b;y?b=1.5:m?b=Math.min(1.7,Math.max(1.2,p*1.1)):f?b=Math.min(1.8,Math.max(1.25,p*1.2)):b=Math.min(2,Math.max(1.6,p*1.4));const g=y||m?.9:f?.92:.95,S=new r({unit:"mm",format:"a4",orientation:"portrait",compress:!0}),v={scale:b,useCORS:!0,allowTaint:!1,backgroundColor:"#ffffff",letterRendering:!u,removeContainer:!1,logging:!0};let A=0;const L=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{for(let q=0;q<s.length;q+=1){const w=s[q];await Oi(w),await Sn(w);const k=w.ownerDocument||document,N=k.createElement("div");Object.assign(N.style,{position:"fixed",top:"0",left:"-12000px",pointerEvents:"none",zIndex:"-1",backgroundColor:"#ffffff"});const P=w.cloneNode(!0);P.style.width=`${zn}px`,P.style.maxWidth=`${zn}px`,P.style.minWidth=`${zn}px`,P.style.height=`${Hn}px`,P.style.maxHeight=`${Hn}px`,P.style.minHeight=`${Hn}px`,P.style.position="relative",P.style.background="#ffffff",zs(P),N.appendChild(P),k.body.appendChild(N);let T;try{await Sn(P),T=await i(P,{...v,scale:b,backgroundColor:"#ffffff",scrollX:0,scrollY:0})}catch($){throw is($,"pageCapture",{toastMessage:L}),$}finally{N.parentNode?.removeChild(N)}if(!T)continue;const I=T.width||1,B=(T.height||1)/I;let V=as,_=V*B,W=0;if(_>Mn){const $=Mn/_;_=Mn,V=V*$,W=Math.max(0,(as-V)/2)}const K=T.toDataURL("image/jpeg",g);A>0&&S.addPage(),S.addImage(K,"JPEG",W,0,V,_,`page-${A+1}`,"FAST"),A+=1,await new Promise($=>window.requestAnimationFrame($))}}catch(q){throw os({safariWindowRef:n,mobileWindowRef:a}),q}if(A===0)throw os({safariWindowRef:n,mobileWindowRef:a}),new Error("PDF generation produced no pages.");if(m||y){const q=S.output("blob");if(y){const w=URL.createObjectURL(q);bn();try{window.location.assign(w)}catch(k){ot("mobile safari blob navigation failed",k)}finally{setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{const w=URL.createObjectURL(q),k=()=>m&&n&&!n.closed?n:a&&!a.closed?a:null,N=(T,I)=>{if(bn(),!T){window.location.assign(I);return}try{T.location.replace(I),T.focus?.()}catch(F){ot("direct blob navigation failed",F);try{T.document.open(),T.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.actions.export","تنزيل PDF"))}</title><style>html,body{margin:0;height:100%;background:#0f172a;color:#f8fafc;font-family:'Tajawal',sans-serif;} iframe{border:none;width:100%;height:100%;display:block;}</style></head><body><iframe src="${I}" title="PDF preview"></iframe></body></html>`),T.document.close()}catch(B){ot("iframe blob delivery failed",B),window.location.assign(I)}}},P=k();N(P,w),setTimeout(()=>URL.revokeObjectURL(w),6e4)}}else{bn();const q=S.output("bloburl"),w=document.createElement("a");w.href=q,w.download=t,w.rel="noopener",w.style.display="none",document.body.appendChild(w),w.click(),setTimeout(()=>{URL.revokeObjectURL(q),w.remove()},2e3)}}function Ht(){if(!j||!X)return;const{previewFrame:e}=X;if(!e)return;const t=j.context||"reservation",n=Ji({context:t,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});Tt("render"),e.srcdoc=`<!DOCTYPE html>${n}`,e.addEventListener("load",async()=>{try{const a=e.contentDocument,s=a?.defaultView||window,r=a?.documentElement||a;r&&(Ei(r),qi(r,s),Si(r,s));const i=a?.getElementById("quotation-pdf-root");try{i&&(await Yi(i,{context:"preview"}),zs(i))}catch(m){console.error("[reservations/pdf] failed to layout preview document",m)}const c=Array.from(a?.querySelectorAll?.(".quote-page")||[]),d=a?.querySelector(".quote-preview-pages"),l=zn;let u=18;if(d&&a?.defaultView){const m=a.defaultView.getComputedStyle(d),y=parseFloat(m.rowGap||m.gap||`${u}`);Number.isFinite(y)&&y>=0&&(u=y)}const p=Hn,f=c.length?c.length*p+Math.max(0,(c.length-1)*u):p;if(e.dataset.baseWidth=String(l),e.dataset.baseHeight=String(f),e.style.width=`${l}px`,e.style.minWidth=`${l}px`,e.style.height=`${f}px`,e.style.minHeight=`${f}px`,X?.previewFrameWrapper&&!X?.userAdjustedZoom){const m=X.previewFrameWrapper.clientWidth-24;m>0&&m<l?Xe=Math.max(m/l,.3):Xe=1}eo(Xe)}finally{bn()}},{once:!0})}function ru(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(t.checked?j.sections.add(n):j.sections.delete(n),Ki(j),Zi(),Ht())}function iu(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId,a=t?.dataset?.fieldId;if(!n||!a)return;const s=j.context||"reservation",r=j.fields||(j.fields=Sa(s)),i=yd(r,n);t.checked?i.add(a):i.delete(a),Ki(j),Ht()}function ou(e){if(!j)return;const t=e.currentTarget,n=t?.dataset?.sectionId;n&&(Ds(j,n),j.sectionExpansions[n]=t.open)}function Zi(){if(!X?.toggles||!j)return;const{toggles:e}=X,t=j.fields||{},n=j.context||"reservation";Ds(j);const a=qa(n),s=Ni(n),r=a.map(({id:i,labelKey:c,fallback:d})=>{const l=o(c,d),u=j.sections.has(i),p=s[i]||[],f=gd(j,i),m=p.length?`<div class="quote-toggle-sublist">
          ${p.map(y=>{const b=Bs(t,i,y.id),g=u?"":"disabled",S=y.labelKey?o(y.labelKey,y.fallback):y.fallback;return`
              <label class="quote-toggle quote-toggle--field">
                <input type="checkbox" data-field-toggle data-section-id="${i}" data-field-id="${y.id}" ${b?"checked":""} ${g}>
                <span>${x(S)}</span>
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
    `}).join("");e.innerHTML=r,e.querySelectorAll("input[data-section-toggle]").forEach(i=>{i.addEventListener("change",ru)}),e.querySelectorAll("input[data-field-toggle]").forEach(i=>{i.addEventListener("change",iu)}),e.querySelectorAll("details[data-section-group]").forEach(i=>{i.addEventListener("toggle",ou)})}function cu(){if(X?.modal)return X;const e=document.createElement("div");e.id="reservationQuoteModal",e.className="modal fade quote-preview-modal",e.tabIndex=-1,e.setAttribute("aria-labelledby","reservationQuoteModalLabel"),e.setAttribute("aria-hidden","true"),e.style.display="none",e.innerHTML=`
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
  `;const m=document.createElement("div");m.className="quote-preview-frame-wrapper",m.appendChild(p),n.innerHTML="";const y=document.createElement("div");y.className="quote-preview-scroll",y.appendChild(m),n.appendChild(y);const b=document.createElement("div");b.className="quote-preview-status",b.setAttribute("role","status"),b.setAttribute("aria-live","polite"),b.hidden=!0,b.innerHTML=`
    <span class="quote-preview-spinner" data-quote-status-spinner aria-hidden="true"></span>
    <span data-quote-status-text>${x(ji("render"))}</span>
    <button type="button" class="quote-preview-status-action" data-quote-status-action hidden></button>
  `,n.appendChild(b),u.appendChild(f),i?.addEventListener("click",async()=>{if(j){i.disabled=!0;try{await to()}finally{i.disabled=!1}}});const g=()=>{ss()||rs(e)};l.forEach(L=>{L?.addEventListener("click",g)}),d&&!l.includes(d)&&d.addEventListener("click",g),e.addEventListener("click",L=>{ss()||L.target===e&&rs(e)}),X={modal:e,toggles:t,preview:n,previewScroll:y,previewFrameWrapper:m,zoomControls:f,zoomValue:f.querySelector("[data-zoom-value]"),previewFrame:p,meta:a,downloadBtn:i,statusIndicator:b,statusText:b.querySelector("[data-quote-status-text]"),statusSpinner:b.querySelector("[data-quote-status-spinner]"),statusAction:b.querySelector("[data-quote-status-action]"),termsInput:s,termsReset:r,statusKind:null,userAdjustedZoom:!1};const S=f.querySelector("[data-zoom-out]"),v=f.querySelector("[data-zoom-in]"),A=f.querySelector("[data-zoom-reset]");return S?.addEventListener("click",()=>xr(-.1)),v?.addEventListener("click",()=>xr(.1)),A?.addEventListener("click",()=>na(1,{markManual:!0})),s&&s.addEventListener("input",du),r&&r.addEventListener("click",uu),na(Xe),X}function na(e,{silent:t=!1,markManual:n=!1}={}){Xe=Math.min(Math.max(e,.25),2.2),n&&X&&(X.userAdjustedZoom=!0),eo(Xe),!t&&X?.zoomValue&&(X.zoomValue.textContent=`${Math.round(Xe*100)}%`)}function xr(e){na(Xe+e,{markManual:!0})}function eo(e){if(!X?.previewFrame||!X.previewFrameWrapper)return;const t=X.previewFrame,n=X.previewFrameWrapper,a=Number(t.dataset.baseWidth)||794,s=Number(t.dataset.baseHeight)||t.contentDocument?.body?.scrollHeight||1123;t.style.transform=`scale(${e})`,t.style.transformOrigin="top center",Rs()?(n.style.width="100%",n.style.maxWidth="100%",n.style.minWidth="0"):(n.style.width=`${a}px`,n.style.maxWidth=`${a}px`,n.style.minWidth=`${a}px`),n.style.minHeight=`${s}px`,n.style.height=`${s}px`}function lu(){if(!X?.meta||!j)return;const{meta:e}=X;e.innerHTML=`
    <div class="quote-meta-card">
      <div><span>${x(o("reservations.quote.labels.number","رقم عرض السعر"))}</span><strong>${x(j.quoteNumber)}</strong></div>
      <div><span>${x(o("reservations.quote.labels.dateGregorian","التاريخ الميلادي"))}</span><strong>${x(j.quoteDateLabel)}</strong></div>
    </div>
  `}function Hs(){if(!X?.termsInput)return;const e=(j?.terms&&j.terms.length?j.terms:Le).join(`
`);X.termsInput.value!==e&&(X.termsInput.value=e)}function du(e){if(!j)return;const t=es(e?.target?.value??"");if(t.length){j.terms=t;const n=document.getElementById("reservation-terms");n&&(n.value=e.target.value);const a=document.getElementById("edit-res-terms");a&&(a.value=e.target.value)}else{j.terms=[...Le],Hs();const n=Le.join(`
`),a=document.getElementById("reservation-terms");a&&(a.value=n);const s=document.getElementById("edit-res-terms");s&&(s.value=n)}Ht()}function uu(e){if(e?.preventDefault?.(),!j)return;j.terms=[...Le];const t=document.getElementById("reservation-terms");t&&(t.value=Le.join(`
`));const n=document.getElementById("edit-res-terms");n&&(n.value=Le.join(`
`)),Hs(),Ht()}async function to(){if(!j)return;Tt("export");const t=!Rs()&&Ri(),n=Ea(),a=null,s=!n&&t?window.open("","_blank"):null;(d=>{if(d)try{d.document.open(),d.document.write(`<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</title><style>body{font-family:'Tajawal',sans-serif;margin:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;text-align:center;padding:24px;} .loader{width:42px;height:42px;border-radius:50%;border:4px solid rgba(248,250,252,0.35);border-top-color:#38bdf8;animation:spin 1s linear infinite;margin:0 auto 18px;}@keyframes spin{to{transform:rotate(360deg);}} h1{margin:0 0 6px;font-size:1.05rem;} p{margin:0;font-size:0.9rem;opacity:0.8;}</style></head><body><div><div class="loader" aria-hidden="true"></div><h1>${x(o("reservations.quote.status.exporting","جاري تجهيز ملف PDF..."))}</h1><p>${x(o("reservations.quote.status.exportingHint","قد يستغرق ذلك بضع ثوانٍ، الرجاء الانتظار..."))}</p></div></body></html>`),d.document.close()}catch(l){ot("failed to prime download window",l)}})(s);let i=null;const c=o("reservations.quote.errors.browserLimit","تعذر إتمام عملية التحويل بسبب قيود المتصفح، يرجى إعادة المحاولة أو تقليل حجم المحتوى.");try{await jd(),Fa("html2pdf ensured");const d=j.context||"reservation",l=Ji({context:d,reservation:j.reservation,customer:j.customer,project:j.project,technicians:j.technicians,totals:j.totals,totalsDisplay:j.totalsDisplay,rentalDays:j.rentalDays,currencyLabel:j.currencyLabel,sections:j.sections,fieldSelections:j.fields,quoteNumber:j.quoteNumber,quoteDate:j.quoteDateLabel,terms:j.terms,projectCrew:j.projectCrew,projectExpenses:j.projectExpenses,projectEquipment:j.projectEquipment,projectInfo:j.projectInfo,clientInfo:j.clientInfo,paymentSummary:j.paymentSummary,projectTotals:j.projectTotals});i=document.createElement("div"),i.innerHTML=l,Object.assign(i.style,{position:"fixed",top:"0",left:"0",pointerEvents:"none",zIndex:"-1"}),document.body.appendChild(i),Ei(i),qi(i),Si(i),Fa("export container prepared");const u=i.firstElementChild;if(u){u.setAttribute("dir","rtl"),u.style.direction="rtl",u.style.textAlign="right",u.setAttribute("data-theme","light"),u.classList.remove("dark","dark-mode"),u.style.margin="0",u.style.padding="0",u.style.width="210mm",u.style.maxWidth="210mm",u.style.marginLeft="auto",u.style.marginRight="auto",u.scrollTop=0,u.scrollLeft=0;try{await Yi(u,{context:"export"}),await Sn(u),zs(u),Fa("layout complete for export document")}catch(f){is(f,"layoutQuoteDocument",{suppressToast:!0})}}const p=`quotation-${j.quoteNumber}.pdf`;await su(u,{filename:p,safariWindowRef:s,mobileWindowRef:a}),j.sequenceCommitted||(Fd(j.quoteSequence),j.sequenceCommitted=!0)}catch(d){os({container:i,safariWindowRef:s,mobileWindowRef:a}),i=null,is(d,"exportQuoteAsPdf",{toastMessage:c})}finally{i&&i.parentNode&&i.parentNode.removeChild(i),bn()}}function no(){const e=cu();e?.modal&&(gn=!1,Xe=1,X&&(X.userAdjustedZoom=!1),na(Xe,{silent:!0}),Zi(),lu(),Hs(),Ht(),pd(e.modal))}async function mu({reservation:e,customer:t,project:n}){if(!e){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}const a=Od(e),{totalsDisplay:s,totals:r,rentalDays:i}=Vd(e,a,n),c=o("reservations.create.summary.currency","SR"),{sequence:d,quoteNumber:l}=Vi("reservation"),u=new Date,p=td();j={context:"reservation",reservation:e,customer:t,project:n,technicians:a,totals:r,totalsDisplay:s,rentalDays:i,currencyLabel:c,projectCrew:[],projectExpenses:[],projectEquipment:[],sections:new Set(qa("reservation").filter(f=>f.defaultSelected).map(f=>f.id)),sectionExpansions:Fs("reservation"),fields:Sa("reservation"),terms:p,quoteSequence:d,quoteNumber:l,quoteDate:u,quoteDateLabel:Gi(u),sequenceCommitted:!1},Qi(j),no()}async function pm({project:e}){if(!e){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const t=tu(e),{project:n}=t;if(!n){E(o("projects.toast.notFound","⚠️ تعذر العثور على بيانات المشروع"));return}const{sequence:a,quoteNumber:s}=Vi("project"),r=new Date,i=[...ed];j={context:"project",reservation:null,customer:t.customer,project:n,technicians:t.crew||[],clientInfo:t.clientInfo,projectInfo:t.projectInfo,projectCrew:t.crew,projectExpenses:t.expenses,projectEquipment:t.equipment,totals:t.totals,projectTotals:t.projectTotals,totalsDisplay:t.totalsDisplay,rentalDays:t.projectDurationDays,currencyLabel:t.currencyLabel,sections:new Set(qa("project").filter(c=>c.defaultSelected).map(c=>c.id)),sectionExpansions:Fs("project"),fields:Sa("project"),terms:i,quoteSequence:a,quoteNumber:s,quoteDate:r,quoteDateLabel:Gi(r),sequenceCommitted:!1,paymentSummary:t.paymentSummary,projectNotes:t.notes,paymentHistory:t.paymentHistory},Qi(j),no()}function pu({containerId:e="reservations-list",filters:t=null,onShowDetails:n,onConfirmReservation:a}={}){const s=In(),{reservations:r=[],customers:i=[],technicians:c=[],projects:d=[]}=ue(),l=Array.isArray(s)?s:c||[],u=new Map((d||[]).map(g=>[String(g.id),g])),p=document.getElementById(e);if(!p){console.warn("⚠️ [reservations/renderers] container not found",e);return}if(!r||r.length===0){p.innerHTML=`<p>${o("reservations.list.empty","⚠️ لا توجد حجوزات بعد.")}</p>`;return}const f=t||zl(),m=new Map(i.map(g=>[String(g.id),g])),y=new Map(l.map(g=>[String(g.id),g])),b=Ul({reservations:r,filters:f,customersMap:m,techniciansMap:y,projectsMap:u});if(b.length===0){p.innerHTML=`<p>${o("reservations.list.noResults","🔍 لا توجد حجوزات مطابقة للبحث.")}</p>`;return}p.innerHTML=`<div class="reservations-grid">${Kl({entries:b,customersMap:m,techniciansMap:y,projectsMap:u})}</div>`,p.querySelectorAll('[data-action="details"]').forEach(g=>{const S=Number(g.dataset.reservationIndex);Number.isNaN(S)||g.addEventListener("click",()=>{typeof n=="function"&&n(S)})}),p.querySelectorAll('button[data-action="confirm"]').forEach(g=>{const S=Number(g.dataset.reservationIndex);Number.isNaN(S)||g.addEventListener("click",v=>{v.stopPropagation(),typeof a=="function"&&a(S,v)})})}function fu(e,{onEdit:t,onDelete:n,getEditContext:a}={}){const{reservations:s=[],customers:r=[],projects:i=[]}=ue(),c=s[e];if(!c)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const d=r.find(S=>String(S.id)===String(c.customerId)),l=c.projectId?i.find(S=>String(S.id)===String(c.projectId)):null,u=document.getElementById("reservation-details-body");if(u){const S=In()||[];u.innerHTML=Ql(c,d,S,e,l)}const p=document.getElementById("reservationDetailsModal"),f=()=>{p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getInstance(p)?.hide()},m=document.getElementById("reservation-details-edit-btn");m&&(m.onclick=()=>{f(),typeof t=="function"&&t(e,{reservation:c,customer:d,getEditContext:a})});const y=document.getElementById("reservation-details-delete-btn");y&&(y.onclick=()=>{f(),typeof n=="function"&&n(e,{reservation:c,customer:d})});const b=u?.querySelector('[data-action="open-project"]');b&&l&&b.addEventListener("click",()=>{f();const S=l?.id!=null?String(l.id):"",v=S?`projects.html?project=${encodeURIComponent(S)}`:"projects.html";window.location.href=v});const g=document.getElementById("reservation-details-export-btn");return g&&(g.onclick=async S=>{S?.preventDefault?.(),S?.stopPropagation?.(),g.blur();try{await mu({reservation:c,customer:d,project:l})}catch(v){console.error("❌ [reservations] export to PDF failed",v),E(o("reservations.details.actions.exportFailed","⚠️ تعذر تصدير الحجز إلى PDF"),"error")}}),p&&window.bootstrap?.Modal&&window.bootstrap.Modal.getOrCreateInstance(p).show(),!0}function ao(){const e=()=>{kn(),Te(),In()};if(typeof window<"u"){if(typeof window.requestIdleCallback=="function"){window.requestIdleCallback(e,{timeout:200});return}if(typeof window.requestAnimationFrame=="function"){window.requestAnimationFrame(e);return}}e()}let wr=!1,Ir=null;function yu(e){if(!e||typeof e!="object")return"";const t=Object.entries(e).filter(([n,a])=>a!=null).map(([n,a])=>[n,String(a)]);return t.length===0?"":JSON.stringify(t.sort(([n],[a])=>n.localeCompare(a)))}async function fm(e={}){const{suppressError:t=!0,params:n=null,force:a=!1}=e??{},s=yu(n);if(!a&&wr&&Pt().length>0&&s===Ir)return Pt();try{const r=await Rr(n||{});return wr=!0,Ir=s,r}catch(r){if(console.error("❌ [reservationsActions] Failed to load reservations from API",r),!t)throw r;return Pt()}}async function gu(e,{onAfterChange:t}={}){if(!Ft())return wn(),!1;const a=Pt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;try{return await xc(s),ao(),t?.({type:"deleted",reservation:a}),E(o("reservations.toast.deleted","🗑️ تم حذف الحجز")),!0}catch(r){console.error("❌ [reservationsActions] deleteReservation failed",r);const i=ca(r)?r.message:o("reservations.toast.deleteFailed","تعذر حذف الحجز، حاول مرة أخرى");return E(i,"error"),!1}}async function bu(e,{onAfterChange:t}={}){const a=Pt()[e];if(!a)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const s=a.id||a.reservationId;if(!s)return E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز")),!1;const{projectLinked:r}=qt(a);if(r)return E(o("reservations.toast.confirmBlockedByProject","⚠️ حالة هذا الحجز تتحكم بها حالة المشروع المرتبط ولا يمكن تأكيده من هنا"),"info"),!1;try{const i=await wc(s);return ao(),t?.({type:"confirmed",reservation:i}),E(o("reservations.toast.confirmed","✅ تم تأكيد الحجز")),!0}catch(i){console.error("❌ [reservationsActions] confirmReservation failed",i);const c=ca(i)?i.message:o("reservations.toast.confirmFailed","تعذر تأكيد الحجز، حاول مرة أخرى");return E(c,"error"),!1}}function an(){const e=document.getElementById("edit-res-start")?.value?.trim(),t=document.getElementById("edit-res-end")?.value?.trim(),n=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",a=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00";return!e||!t?{start:null,end:null}:{start:vn(e,n),end:vn(t,a)}}function aa(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Os(){return typeof document>"u"?{container:null,select:null,hint:null,addButton:null}:{container:document.querySelector(".reservation-equipment-inputs--package"),select:document.getElementById("edit-res-package-select"),hint:document.getElementById("edit-res-package-hint"),addButton:document.getElementById("edit-add-reservation-package")}}function so(){const{container:e,select:t,hint:n,addButton:a}=Os();if(!t)return;const s=t.value,r=Tr(),i=o("reservations.create.summary.currency","SR"),c=`<option value="" disabled selected>${o("reservations.create.packages.placeholder","اختر الحزمة")}</option>`,d=r.map(u=>{const p=Number.isFinite(Number(u.price))?Number(u.price):0,f=h(p.toFixed(2)),m=`${u.name} — ${f} ${i}`;return`<option value="${aa(u.id)}">${aa(m)}</option>`}).join("");t.innerHTML=`${c}${d}`;const l=r.length>0;t.disabled=!l,a&&(a.disabled=!l),e&&(e.hidden=!l,e.setAttribute("aria-hidden",l?"false":"true")),n&&(l?(n.textContent=o("reservations.create.packages.hint","حدد الحزمة ثم اضغط على الزر لإضافتها للحجز."),n.dataset.state="ready"):(n.textContent=o("reservations.create.packages.empty","لا توجد حزم معرفة حالياً. يمكنك إضافتها لاحقاً من لوحة التحكم."),n.dataset.state="empty")),l&&s&&r.some(u=>u.id===s)?t.value=s:t.selectedIndex=0}function hu(e,{silent:t=!1}={}){const n=String(e??"").trim();if(!n)return t||E(o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),{success:!1,reason:"invalid"};const{index:a,items:s=[]}=Et(),{start:r,end:i}=an(),{reservations:c=[]}=ue(),d=a!=null&&c[a]||null,l=d?.id??d?.reservationId??null,u=mi(n,{existingItems:s,start:r,end:i,ignoreReservationId:l});if(!u.success)return t||E(u.message||o("reservations.toast.packageInvalid","⚠️ يرجى اختيار حزمة صالحة أولاً")),u;const p=[...s,u.package];return xt(a,p),St(p),ze(),t||E(o("reservations.toast.packageAdded","✅ تم إضافة الحزمة بنجاح")),u}function Ar(){const{select:e}=Os();if(!e)return;const t=e.value||"";hu(t)?.success&&e&&(e.value="",e.selectedIndex=0)}function vu(){const{addButton:e,select:t}=Os();e&&!e.dataset.listenerAttached&&(e.addEventListener("click",()=>{Ar()}),e.dataset.listenerAttached="true"),t&&!t.dataset.listenerAttached&&(t.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),Ar())}),t.dataset.listenerAttached="true"),so()}function St(e=[]){const t=document.getElementById("edit-res-items");if(!t)return;const n=o("reservations.create.equipment.none","لا توجد معدات"),a=o("reservations.create.summary.currency","SR"),s=o("reservations.create.equipment.imageAlt","صورة"),r=o("reservations.equipment.actions.increase","زيادة الكمية"),i=o("reservations.equipment.actions.decrease","تقليل الكمية"),c=o("reservations.equipment.actions.remove","إزالة البند");if(!e||e.length===0){t.innerHTML=`<tr><td colspan="5" class="text-center">${n}</td></tr>`,_r(t);return}const d=Rt(e);t.innerHTML=d.map(l=>{const u=l.items[0]||{},p=Dt(u)||l.image,f=p?`<img src="${p}" alt="${s}" class="reservation-item-thumb">`:'<div class="reservation-item-thumb reservation-item-thumb--placeholder" aria-hidden="true">🎥</div>',m=l.items.some(k=>k?.type==="package"),y=h(String(l.count)),b=Number.isFinite(Number(l.unitPrice))?Number(l.unitPrice):0,g=Number.isFinite(Number(l.totalPrice))?Number(l.totalPrice):b*l.count,S=`${h(b.toFixed(2))} ${a}`,v=`${h(g.toFixed(2))} ${a}`,A=l.barcodes.map(k=>h(String(k||""))).filter(Boolean),L=A.length?`<details class="reservation-item-barcodes">
            <summary>${o("reservations.equipment.barcodes.summary","عرض الباركودات")}</summary>
            <ul class="reservation-barcode-list">
              ${A.map(k=>`<li>${k}</li>`).join("")}
            </ul>
          </details>`:"";let O="";if(m){const k=new Map;if(l.items.forEach(N=>{Array.isArray(N?.packageItems)&&N.packageItems.forEach(P=>{if(!P)return;const T=te(P.barcode||P.normalizedBarcode||P.desc||Math.random()),I=k.get(T),F=Number.isFinite(Number(P.qty))?Number(P.qty):1;if(I){I.qty+=F;return}k.set(T,{desc:P.desc||P.barcode||o("reservations.create.packages.unnamedItem","عنصر بدون اسم"),qty:F,barcode:P.barcode??P.normalizedBarcode??""})})}),k.size){const N=Array.from(k.values()).map(P=>{const T=h(String(P.qty)),I=aa(P.desc||""),F=P.barcode?` <span class="reservation-package-items__barcode">(${aa(h(String(P.barcode)))})</span>`:"";return`<li>${I}${F} × ${T}</li>`}).join("");O=`
            <details class="reservation-package-items">
              <summary>${o("reservations.create.packages.itemsSummary","عرض محتويات الحزمة")}</summary>
              <ul class="reservation-package-items__list">
                ${N}
              </ul>
            </details>
          `}}const q=m?"reservation-quantity-control reservation-quantity-control--static":"reservation-quantity-control",w=m?' disabled aria-disabled="true" tabindex="-1"':"";return`
        <tr data-group-key="${l.key}">
          <td>
            <div class="reservation-item-info">
              <div class="reservation-item-thumb-wrapper">${f}</div>
              <div class="reservation-item-copy">
                <div class="reservation-item-title">${l.description||"-"}</div>
                ${m?`${O||""}${L||""}`:L}
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
          <td>${S}</td>
          <td>${v}</td>
          <td>
            <button type="button" class="reservation-remove-button" data-action="remove-edit-group" data-group-key="${l.key}" aria-label="${c}">🗑️</button>
          </td>
        </tr>
      `}).join(""),_r(t)}function qu(e){switch(e){case"amount":return o("reservations.paymentHistory.type.amount","💵 دفعة مالية");case"percent":return o("reservations.paymentHistory.type.percent","٪ دفعة نسبة");default:return o("reservations.paymentHistory.type.unknown","دفعة")}}function xa(){const e=document.getElementById("edit-res-payment-history");if(!e)return;const t=wa();if(!Array.isArray(t)||t.length===0){e.innerHTML=`<div class="reservation-payment-history__empty">${o("reservations.paymentHistory.empty","لا توجد دفعات مسجلة لهذا الحجز")}</div>`,kr();return}const n=o("reservations.create.summary.currency","SR"),a=t.map((s,r)=>{const i=Number.isFinite(Number(s?.amount))&&Number(s.amount)>0?`${h(Number(s.amount).toFixed(2))} ${n}`:"—",c=Number.isFinite(Number(s?.percentage))&&Number(s.percentage)>0?`${h(Number(s.percentage).toFixed(2))}%`:"—",d=s?.recordedAt?h(Re(s.recordedAt)):"—",l=qu(s?.type),u=s?.note?h(s.note):"";return`
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
  `,kr()}function Su(){if(En()){E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const e=document.getElementById("edit-res-payment-progress-type"),t=document.getElementById("edit-res-payment-progress-value"),n=oo(e);let a=co(t);if(!Number.isFinite(a)||a<=0){E(o("reservations.toast.paymentInvalid","⚠️ يرجى إدخال قيمة دفعة صحيحة"));return}const s=Ma.lastResult,r=Number(s?.total)||0,i=Number(s?.paidPercent)||0,c=Number(s?.paidAmount)||0,d=o("reservations.create.summary.currency","SR");let l=null,u=null;if(n==="percent"){const f=Math.max(0,100-i);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=h(m.toFixed(2));E(o("reservations.toast.paymentCappedPercent","ℹ️ تم ضبط الدفعة إلى {value}% لاستكمال 100%").replace("{value}",y)),a=m}u=Number(a.toFixed(2)),r>0&&(l=a/100*r)}else{const f=Math.max(0,r-c);if(f<=1e-4){E(o("reservations.toast.paymentNoRemainingBalance","⚠️ تم تسجيل كامل قيمة الحجز، لا يمكن إضافة دفعة جديدة"));return}const m=Math.min(a,f);if(m!==a){const y=`${h(m.toFixed(2))} ${d}`;E(o("reservations.toast.paymentCappedAmount","ℹ️ تم ضبط الدفعة إلى {amount} لاستكمال المبلغ المتبقي").replace("{amount}",y)),a=m}l=Number(a.toFixed(2)),r>0&&(u=l/r*100)}l!=null&&(l=Number(l.toFixed(2))),u!=null&&(u=Number(u.toFixed(2)));const p={type:n,value:a,amount:l,percentage:u,recordedAt:new Date().toISOString()};Pu(p),Vs(wa()),xa(),ze(),t&&(t.value=""),e&&(e.value="percent",e.dataset&&delete e.dataset.userSelected),E(o("reservations.toast.paymentAdded","✅ تم تسجيل الدفعة"))}function kr(){const e=document.getElementById("edit-res-payment-add");e&&!e.dataset.listenerAttached&&(e.addEventListener("click",n=>{if(En()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}Su()}),e.dataset.listenerAttached="true");const t=document.getElementById("edit-res-payment-history");t&&!t.dataset.listenerAttached&&(t.addEventListener("click",n=>{const a=n.target.closest('[data-action="remove-payment"]');if(!a)return;if(En()){n.preventDefault(),E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error");return}const s=Number(a.dataset.index);Number.isNaN(s)||(Tu(s),Vs(wa()),xa(),ze(),E(o("reservations.toast.paymentRemoved","🗑️ تم حذف الدفعة")))}),t.dataset.listenerAttached="true")}function Eu(e){const{index:t,items:n}=Et(),s=Rt(n).find(c=>c.key===e);if(!s||s.items.some(c=>c?.type==="package"))return;const r=s.itemIndices[s.itemIndices.length-1];if(r==null)return;const i=n.filter((c,d)=>d!==r);xt(t,i),St(i),ze()}function xu(e){const{index:t,items:n}=Et(),a=n.filter(s=>_n(s)!==e);a.length!==n.length&&(xt(t,a),St(a),ze())}function wu(e){const{index:t,items:n}=Et(),s=Rt(n).find(g=>g.key===e);if(!s||s.items.some(g=>g?.type==="package"))return;const{start:r,end:i}=an();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{reservations:c=[]}=ue(),d=t!=null&&c[t]||null,l=d?.id??d?.reservationId??null,u=new Set(n.map(g=>te(g.barcode))),{equipment:p=[]}=ue(),f=(p||[]).find(g=>{const S=te(g?.barcode);return!S||u.has(S)||_n({desc:g?.desc||g?.description||g?.name||"",price:Number(g?.price)||0})!==e||!Es(g)?!1:!Ze(S,r,i,l)});if(!f){E(o("reservations.toast.noAdditionalUnits","⚠️ لا توجد وحدات إضافية متاحة حالياً"));return}const m=te(f.barcode),y=vt(f);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...n,{id:y,equipmentId:y,barcode:m,desc:f.desc||f.description||f.name||s.description||"",qty:1,price:Number.isFinite(Number(f.price))?Number(f.price):s.unitPrice,image:Dt(f)}];xt(t,b),St(b),ze()}function _r(e){!e||e.dataset.groupListenerAttached||(e.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:a,groupKey:s,itemIndex:r}=n.dataset;if(a==="decrease-edit-group"&&s){Eu(s);return}if(a==="increase-edit-group"&&s){wu(s);return}if(a==="remove-edit-group"&&s){xu(s);return}if(a==="remove-edit-item"){const i=Number(r);Number.isNaN(i)||ku(i)}}),e.dataset.groupListenerAttached="true")}function En(){return!!document.getElementById("edit-res-project")?.value}function Iu(e){if(!e||e.dataset?.linkedGuardAttached==="true")return;const t=new Set([e]);if(e.id){const a=document.querySelector(`label[for="${e.id}"]`);a&&t.add(a)}e.parentElement&&t.add(e.parentElement);const n=a=>{En()&&(E(o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),"error"),a.stopPropagation(),a.preventDefault())};t.forEach(a=>{!a||a.dataset?.linkedGuardAttached==="true"||(["mousedown","touchstart","keydown"].forEach(s=>a.addEventListener(s,n,{capture:!0})),a.dataset.linkedGuardAttached="true")})}function Au(e){const t=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع."),n=document.getElementById("edit-res-tax"),a=document.getElementById("edit-res-company-share"),s=document.getElementById("edit-res-paid"),r=document.getElementById("edit-res-payment-progress-type"),i=document.getElementById("edit-res-payment-progress-value"),c=document.getElementById("edit-res-payment-add"),d=document.getElementById("edit-res-payment-history");[n,a,s,r,i,c,d].forEach(Iu),e?(n&&(n.checked=!1,n.disabled=!0,n.classList.add("reservation-input-disabled"),n.title=t),a&&(a.checked=!1,a.disabled=!0,a.classList.add("reservation-input-disabled"),a.title=t),s&&(s.value="unpaid",s.disabled=!0,s.classList.add("reservation-input-disabled"),s.title=t,s.dataset&&delete s.dataset.userSelected),r&&(r.value=r.value||"percent",r.disabled=!0,r.classList.add("reservation-input-disabled"),r.title=t),i&&(i.value="",i.disabled=!0,i.classList.add("reservation-input-disabled"),i.title=t),c&&(c.disabled=!0,c.classList.add("reservation-input-disabled"),c.title=t),d&&(d.dataset.linkedDisabled="true")):(n&&(n.disabled=!1,n.classList.remove("reservation-input-disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("reservation-input-disabled"),s.title=""),r&&(r.disabled=!1,r.classList.remove("reservation-input-disabled"),r.title=""),i&&(i.disabled=!1,i.classList.remove("reservation-input-disabled"),i.title=""),c&&(c.disabled=!1,c.classList.remove("reservation-input-disabled"),c.title=""),d&&(d.dataset.linkedDisabled="false"))}function ze(){const e=document.getElementById("edit-res-summary");if(!e)return;xa();const t=document.getElementById("edit-res-discount"),n=document.getElementById("edit-res-discount-type"),a=document.getElementById("edit-res-paid");a&&!a.dataset.listenerAttached&&(a.addEventListener("change",()=>{a.dataset&&(a.dataset.userSelected="true"),De(a),ze()}),a.dataset.listenerAttached="true");const s=h(t?.value||"0");t&&(t.value=s);const r=parseFloat(s)||0,i=n?.value||"percent",c=En();Au(c);const d=document.getElementById("edit-res-tax"),l=c?!1:d?.checked||!1,u=!c&&a?.dataset?.userSelected==="true",p=c?"unpaid":u&&a?.value||"unpaid";let f=null;!c&&l&&(Ue("edit-res-company-share"),f=Jt("edit-res-company-share"),(!Number.isFinite(f)||f<=0)&&(Ue("edit-res-company-share"),f=Jt("edit-res-company-share")));const{items:m=[],payments:y=[]}=Et(),{start:b,end:g}=an(),S=Ma({items:m,discount:r,discountType:i,applyTax:l,paidStatus:p,start:b,end:g,companySharePercent:f,paymentHistory:y});e.innerHTML=S;const v=Ma.lastResult;if(v&&a){const A=v.paymentStatus;u?De(a,a.value):(a.value!==A&&(a.value=A),a.dataset&&delete a.dataset.userSelected,De(a,A))}else a&&De(a,a.value)}function ku(e){if(e==null)return;const{index:t,items:n}=Et();if(!Array.isArray(n))return;const a=n.filter((s,r)=>r!==e);xt(t,a),St(a),ze()}function _u(e){const t=e?.value??"",n=te(t);if(!n)return;const a=da(n);if(!a){E(o("reservations.toast.barcodeNotInCatalog","❌ الباركود غير موجود ضمن المعدات"));return}const s=lt(a);if(s==="maintenance"||s==="retired"){E(Bt(s));return}const r=te(n),{index:i,items:c=[]}=Et();if(c.findIndex(g=>te(g.barcode)===r)>-1){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{start:l,end:u}=an();if(!l||!u){E(o("reservations.toast.requireDatesBeforeAdd","⚠️ يرجى تحديد تاريخ ووقت البداية والنهاية قبل إضافة المعدات"));return}const{reservations:p=[]}=ue(),f=i!=null&&p[i]||null,m=f?.id??f?.reservationId??null;if(Ze(r,l,u,m)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const y=vt(a);if(!y){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const b=[...c,{id:y,equipmentId:y,barcode:r,desc:a.desc,qty:1,price:a.price,image:a.image||a.imageUrl||a.img||null}];xt(i,b),e&&(e.value=""),St(b),ze()}function sa(e){if(!e)return;const t=e.value.trim();if(!t)return;const n=ci(t),a=te(n?.barcode||t);if(!n||!a){E(o("reservations.toast.equipmentNameNotFound","❌ لم يتم العثور على معدة بالاسم المدخل"));return}const s=lt(n);if(s==="maintenance"||s==="retired"){E(Bt(s));return}const{start:r,end:i}=an();if(!r||!i){E(o("reservations.toast.requireOverallDates","⚠️ يرجى تحديد تواريخ الحجز قبل إضافة المعدات"));return}const{index:c,items:d=[]}=Et();if(d.some(b=>te(b.barcode)===a)){E(o("reservations.toast.equipmentDuplicate","⚠️ هذه المعدة موجودة بالفعل في الحجز"));return}const{reservations:u=[]}=ue(),p=c!=null&&u[c]||null,f=p?.id??p?.reservationId??null;if(Ze(a,r,i,f)){E(o("reservations.toast.equipmentTimeConflictSimple","⚠️ هذه المعدة محجوزة في نفس الفترة الزمنية"));return}const m=vt(n);if(!m){E(o("reservations.toast.equipmentMissingBarcode","⚠️ هذه المعدة لا تحتوي على باركود معرف"));return}const y=[...d,{id:m,equipmentId:m,barcode:a,desc:n.desc,qty:1,price:n.price,image:n.image||n.imageUrl||n.img||null}];xt(c,y),St(y),ze(),e.value=""}function ro(){const e=document.getElementById("edit-res-equipment-description");if(e&&!e.dataset.listenerAttached){e.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),sa(e))});const t=()=>{li(e.value,"edit-res-equipment-description-options")&&sa(e)};e.addEventListener("focus",()=>{if(populateEquipmentDescriptionLists(),typeof e.showPicker=="function")try{e.showPicker()}catch{}}),e.addEventListener("input",t),e.addEventListener("change",t),e.dataset.listenerAttached="true"}}if(typeof document<"u"){document.addEventListener("language:changed",()=>{ze()});const e=()=>{vu()};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e,{once:!0}):e(),document.addEventListener("packages:changed",()=>{so()})}typeof window<"u"&&(window.getEditReservationDateRange=an,window.renderEditPaymentHistory=xa);function $u(e,t="create"){if(!(!e||!e.value.trim())){if(t==="create"){Ja(e);return}sa(e)}}function ym(){ht(),ro()}function Nu(e,t){const n=document.getElementById(e);if(n){if(n._flatpickr){if(t){const a=n._flatpickr.config?.dateFormat||"Y-m-d";n._flatpickr.setDate(t,!1,a)}else n._flatpickr.clear();return}n.value=t||""}}let xn=null,We=[],Je=[],cs=null,Ne={},Da=!1;function ls(e,{disable:t=!1}={}){const n=document.getElementById("edit-res-confirmed"),a=document.getElementById("edit-res-confirmed-btn"),s=document.getElementById("edit-res-confirmed-wrapper"),r=!!e;if(n&&(n.value=r?"true":"false"),a){const i=a.dataset.confirmLabel||"✅ تم التأكيد",c=a.dataset.pendingLabel||"⏳ بانتظار التأكيد";a.innerHTML=r?i:c,a.dataset.state=r?"confirmed":"pending",a.classList.toggle("btn-success",r&&!t),a.classList.toggle("btn-outline-secondary",!r||t),a.disabled=t,a.setAttribute("aria-pressed",r?"true":"false")}s&&s.classList.toggle("is-disabled",t)}function ds(){return document.getElementById("edit-res-confirmed")?.value==="true"}function Et(){return{index:xn,items:We,payments:Je}}function xt(e,t,n=Je){xn=typeof e=="number"?e:null,We=Array.isArray(t)?[...t]:[],Je=Array.isArray(n)?[...n]:[]}function io(){xn=null,We=[],kc(),Je=[]}function wa(){return[...Je]}function Vs(e){Je=Array.isArray(e)?[...e]:[]}function Pu(e){e&&(Je=[...Je,e])}function Tu(e){!Number.isInteger(e)||e<0||(Je=Je.filter((t,n)=>n!==e))}function hn(e,t=1){const n=Number.parseFloat(h(String(e??"")));return!Number.isFinite(n)||n<=0?t:Math.floor(n)}function us(e,t=0){if(e==null||e==="")return t;const n=Number.parseFloat(h(String(e)));return Number.isFinite(n)?Number(n.toFixed(2)):t}function ju(e={}){if(!e||typeof e!="object")return null;const t=e.equipmentId??e.equipment_id??e.item_id??e.itemId??e.id??null,n=e.barcode??e.normalizedBarcode??"",a=e.normalizedBarcode??(n?te(n):"");return{equipmentId:t!=null?String(t):null,barcode:n,normalizedBarcode:a,desc:e.desc??e.description??e.name??"",qty:hn(e.qty??e.quantity??e.count??1),price:us(e.price??e.unit_price??e.unitPrice??0),image:e.image??e.image_url??e.imageUrl??null}}function Cu(e,t=0){if(!e||typeof e!="object")return null;const n=Wt(e.packageId??e.package_id??e.package_code??e.packageCode??e.code??e.id??`pkg-${t}`)||`pkg-${t}`,a=hn(e.quantity??e.qty??e.count??e.package_quantity??e.packageQty??1),r=(Array.isArray(e.packageItems)&&e.packageItems.length?e.packageItems:ia(e)).map(f=>ju(f)).filter(Boolean),i=e.total_price??e.totalPrice??e.total??null;let c=us(e.unit_price??e.unitPrice??e.price??null,0);if((!c||c===0)&&i!=null){const f=us(i,0);f>0&&a>0&&(c=Number((f/a).toFixed(2)))}const d=e.package_code??e.packageCode??e.barcode??null,u=[e.name,e.desc,e.package_name,e.packageName,e.title,e.description,d,n].find(f=>f!=null&&String(f).trim()!=="")||`Package ${n}`,p=e.image??e.cover??e.thumbnail??r.find(f=>f?.image)?.image??null;return{id:e.id!=null?String(e.id):`package::${n}`,type:"package",packageId:n,package_id:n,desc:h(String(u)),name:h(String(u)),qty:a,price:c,barcode:d,packageItems:r,image:p}}function Lu(e,t=[],n=0){!n||n<=0||t.forEach(a=>{if(!a)return;const s=e.get(a);if(s==null)return;const r=s-n;e.set(a,r>0?r:0)})}function Bu(e={},t=[]){const n=Array.isArray(t)?t.map(c=>({...c})):[],a=Array.isArray(e?.packages)?e.packages:[];if(!a.length)return n;const s=a.map((c,d)=>Cu(c,d)).filter(Boolean);if(!s.length)return n;const r=new Map;s.forEach(c=>{const d=hn(c.qty??c.quantity??1);if(c.barcode){const l=te(c.barcode);if(l){const u=`package::${l}`;r.set(u,(r.get(u)??0)+d)}}(c.packageItems||[]).forEach(l=>{if(!l)return;const u=d*hn(l.qty??l.quantity??1),p=l.equipmentId??null,f=l.normalizedBarcode||(l.barcode?te(l.barcode):null);if(p!=null){const m=`equipment::${String(p)}`;r.set(m,(r.get(m)??0)+u)}if(f){const m=`barcode::${f}`;r.set(m,(r.get(m)??0)+u)}})});const i=[];return n.forEach(c=>{if(!c||typeof c!="object"){i.push(c);return}if(c.type==="package"){const g=Wt(c.packageId??c.package_id??c.id??"");s.some(v=>v.packageId===g)||i.push({...c});return}const d=hn(c.qty??c.quantity??1),l=vt(c),u=c.barcode?te(c.barcode):null,p=[];l!=null&&p.push(`equipment::${String(l)}`),u&&p.push(`barcode::${u}`);const f=p.map(g=>r.get(g)??0).filter(g=>g>0);if(!f.length){i.push({...c});return}const m=Math.min(...f);if(m<=0){i.push({...c});return}const y=Math.min(m,d);if(Lu(r,p,y),y>=d)return;const b=d-y;i.push({...c,qty:b,quantity:b})}),[...i,...s.map(c=>({...c}))]}function Fu(e,t){return e?typeof t=="function"?t(e):window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function oo(e,t="percent"){const n=e?.value;return n==="amount"||n==="percent"?n:t}function co(e){if(!e)return null;const t=h(String(e.value||"")).replace("%","").trim();if(!t)return null;const n=Number.parseFloat(t);return!Number.isFinite(n)||n<0?null:n}function Du(e,t){if(e){e.value="";return}}function un(e=""){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function lo(e){if(!e||typeof e!="object")return null;const t=e.type==="amount"||e.type==="percent"?e.type:null,n=Number.parseFloat(h(String(e.value??""))),a=Number.parseFloat(h(String(e.amount??""))),s=Number.parseFloat(h(String(e.percentage??""))),r=Number.isFinite(a)?a:t==="amount"&&Number.isFinite(n)?n:null,i=Number.isFinite(s)?s:t==="percent"&&Number.isFinite(n)?n:null,c=t??(Number.isFinite(r)?"amount":Number.isFinite(i)?"percent":null),d=c==="amount"?r??null:c==="percent"?i??null:Number.isFinite(n)?n:null,l=e.recordedAt??e.recorded_at??new Date().toISOString();return{type:c,value:d,amount:Number.isFinite(r)?r:null,percentage:Number.isFinite(i)?i:null,note:e.note??null,recordedAt:l}}function Ru(e=[],t=null){const n=document.getElementById("edit-res-project");if(!n)return;const a=o("reservations.create.placeholders.project","اختر مشروعاً (اختياري)"),s=o("reservations.edit.project.missing","⚠️ المشروع غير متوفر (تم حذفه)"),r=t?.projectId?String(t.projectId):"",i=Array.isArray(e)?[...e].sort((d,l)=>String(l.createdAt||l.start||"").localeCompare(String(d.createdAt||d.start||""))):[],c=[`<option value="">${un(a)}</option>`];i.forEach(d=>{c.push(`<option value="${un(d.id)}">${un(d.title||a)}</option>`)}),r&&!i.some(d=>String(d.id)===r)&&c.push(`<option value="${un(r)}">${un(s)}</option>`),n.innerHTML=c.join(""),r?n.value=r:n.value=""}function uo(){const e=document.getElementById("edit-res-project"),t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share"),a=document.getElementById("edit-res-discount"),s=document.getElementById("edit-res-discount-type"),r=o("reservations.toast.linkedProjectDisabled","لا يمكن تمكين هذا الإجراء؛ يرجى تنفيذ هذه التعديلات من شاشة المشروع.");if(!!e?.value)t&&(t.checked=!1,t.disabled=!0,t.classList.add("disabled"),t.title=r),n&&(n.checked&&(n.checked=!1),n.disabled=!0,n.classList.add("disabled"),n.title=r),a&&(a.value="0",a.disabled=!0,a.classList.add("disabled","reservation-input-disabled"),a.title=r),s&&(s.value="percent",s.disabled=!0,s.classList.add("disabled","reservation-input-disabled"),s.title=r);else{if(t){const d=t.disabled;t.disabled=!1,t.classList.remove("disabled"),t.title="",d&&(t.checked=!1)}n&&(n.disabled=!1,n.classList.remove("disabled"),n.title=""),a&&(a.disabled=!1,a.classList.remove("disabled","reservation-input-disabled"),a.title=""),s&&(s.disabled=!1,s.classList.remove("disabled","reservation-input-disabled"),s.title="")}ms("tax");const c=Ne?.updateEditReservationSummary;typeof c=="function"&&c()}function ms(e){const t=document.getElementById("edit-res-tax"),n=document.getElementById("edit-res-company-share");if(!t||!n)return;const a=()=>{const r=Ne?.updateEditReservationSummary;typeof r=="function"&&r()};if(Da){a();return}Da=!0;const s=()=>{Da=!1,a()};if(e==="share")if(n.checked){if(n.dataset.companyShare||(n.dataset.companyShare=String(ct)),t.disabled){n.checked=!1,E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة")),s();return}t.checked||(t.checked=!0),Ue("edit-res-company-share")}else t.checked&&!t.disabled&&(t.checked=!1);else e==="tax"&&(t.checked?Ue("edit-res-company-share"):n.checked&&(n.checked=!1));s()}function $r(e,{populateEquipmentDescriptionLists:t,setFlatpickrValue:n,splitDateTime:a,renderEditItems:s,updateEditReservationSummary:r,ensureModal:i}={}){const{customers:c,projects:d}=ue(),u=Pt()?.[e];if(!u){E(o("reservations.toast.notFound","⚠️ تعذر العثور على بيانات الحجز"));return}Ne={...Ne,reservation:u,projects:d||[]},t?.(),Ru(d||[],u);const p=u.projectId&&d?.find?.($=>String($.id)===String(u.projectId))||null,{effectiveConfirmed:f,projectLinked:m}=qt(u,p),y=u.items?u.items.map($=>({...$,equipmentId:$.equipmentId??$.equipment_id??$.id,barcode:te($?.barcode)})):[],b=Bu(u,y),S=(Array.isArray(u.paymentHistory)?u.paymentHistory:Array.isArray(u.payment_history)?u.payment_history:[]).map($=>lo($)).filter(Boolean);xt(e,b,S);const v=o("reservations.list.unknownCustomer","غير معروف"),A=c?.find?.($=>String($.id)===String(u.customerId));document.getElementById("edit-res-index")?.setAttribute("value",String(e));const L=document.getElementById("edit-res-id");L&&(L.value=u.reservationId||u.id);const O=document.getElementById("edit-res-customer");O&&(O.value=A?.customerName||v);const q=typeof a=="function"?a(u.start):{date:"",time:""},w=typeof a=="function"?a(u.end):{date:"",time:""};n?.("edit-res-start",q.date),n?.("edit-res-start-time",q.time),n?.("edit-res-end",w.date),n?.("edit-res-end-time",w.time);const k=document.getElementById("edit-res-notes");k&&(k.value=u.notes||"");const N=document.getElementById("edit-res-discount");if(N){const $=m?0:u.discount??0;N.value=h($)}const P=document.getElementById("edit-res-discount-type");P&&(P.value=m?"percent":u.discountType||"percent");const T=u.projectId?!1:!!u.applyTax,I=document.getElementById("edit-res-tax");I&&(I.checked=T);const F=document.getElementById("edit-res-company-share");if(F){const $=u.companySharePercent??u.company_share_percent??u.companyShare??u.company_share??null,R=$!=null?Number.parseFloat(h(String($).replace("%","").trim())):NaN,D=u.companyShareEnabled??u.company_share_enabled??u.companyShareApplied??u.company_share_applied??null,z=D!=null?D===!0||D===1||D==="1"||String(D).toLowerCase()==="true":Number.isFinite(R)&&R>0,H=z&&Number.isFinite(R)&&R>0?R:ct,ne=T||z;F.checked=ne,F.dataset.companyShare=String(H)}ls(f,{disable:m});const B=document.getElementById("edit-res-paid"),V=u.paidStatus??(u.paid===!0||u.paid==="paid"?"paid":"unpaid");B&&(B.value=V,B.dataset&&delete B.dataset.userSelected);const _=document.getElementById("edit-res-payment-progress-type"),W=document.getElementById("edit-res-payment-progress-value");if(_?.dataset?.userSelected&&delete _.dataset.userSelected,_&&(_.value="percent"),Du(W),_c((u.technicians||[]).map($=>String($))),s?.(b),typeof window<"u"){const $=window?.renderEditPaymentHistory;typeof $=="function"&&$()}uo(),r?.();const K=document.getElementById("editReservationModal");cs=Fu(K,i),cs?.show?.()}async function Mu({combineDateTime:e,hasEquipmentConflict:t,hasPackageConflict:n,hasTechnicianConflict:a,updateEditReservationSummary:s,renderReservations:r,populateEquipmentDescriptionLists:i,handleReservationsMutation:c}={}){if(xn===null){console.warn("⚠️ [reservationsEdit.js] No reservation selected for editing");return}const d=document.getElementById("edit-res-start")?.value?.trim(),l=document.getElementById("edit-res-start-time")?.value?.trim()||"00:00",u=document.getElementById("edit-res-end")?.value?.trim(),p=document.getElementById("edit-res-end-time")?.value?.trim()||"00:00",f=document.getElementById("edit-res-notes")?.value||"",m=h(document.getElementById("edit-res-discount")?.value||"0");let y=parseFloat(m)||0,b=document.getElementById("edit-res-discount-type")?.value||"percent";const g=ds(),S=document.getElementById("edit-res-paid"),v=S?.dataset?.userSelected==="true",A=v&&S?.value||"unpaid",L=document.getElementById("edit-res-payment-progress-type"),O=document.getElementById("edit-res-payment-progress-value"),q=oo(L),w=co(O),k=document.getElementById("edit-res-project")?.value||"",N=Ic(),P=document.getElementById("edit-res-company-share"),T=document.getElementById("edit-res-tax");if(!d||!u){E(o("reservations.toast.requireDates","⚠️ يرجى تحديد تاريخ البداية والنهاية"));return}const I=typeof e=="function"?e:(G,ye)=>`${G}T${ye||"00:00"}`,F=I(d,l),B=I(u,p);if(F&&B&&new Date(F)>new Date(B)){E(o("reservations.toast.invalidDateOrder","⚠️ تاريخ البداية لا يمكن أن يكون بعد تاريخ النهاية"));return}const _=Pt()?.[xn];if(!_){E(o("reservations.toast.reservationMissing","⚠️ تعذر العثور على الحجز المطلوب"));return}if(!Array.isArray(We)||We.length===0&&N.length===0){E(o("reservations.toast.updateNoItems","⚠️ يجب إضافة معدة أو عضو واحد من الطاقم الفني على الأقل للحجز"));return}const W=typeof t=="function"?t:()=>!1,K=_.id??_.reservationId;for(const G of We){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const C of G.packageItems){const ae=C?.barcode??C?.normalizedBarcode??"";if(!ae)continue;const me=lt(ae);if(me==="reserved"){const ce=te(ae);if(!W(ce,F,B,K))continue}if(me!=="available"){E(Bt(me));return}}continue}const ye=lt(G.barcode);if(ye==="reserved"){const C=te(G.barcode);if(!W(C,F,B,K))continue}if(ye!=="available"){E(Bt(ye));return}}for(const G of We){if(G?.type==="package"&&Array.isArray(G.packageItems)){for(const C of G.packageItems){const ae=te(C?.barcode??C?.normalizedBarcode??"");if(ae&&W(ae,F,B,K)){const me=C?.desc||C?.barcode||o("reservations.create.packages.unnamedItem","معدة بدون اسم"),ce=`${o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات")} (${h(String(me))})`;E(ce);return}}continue}const ye=te(G.barcode);if(W(ye,F,B,K)){E(o("reservations.toast.updateEquipmentConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في أحد المعدات"));return}}const $=typeof n=="function"?n:()=>!1;for(const G of We){if(G?.type!=="package")continue;const ye=G.packageId??G.package_id??null;if(ye&&$(ye,F,B,K)){const C=G.desc||G.packageName||o("reservations.create.packages.genericName","الحزمة");E(o("reservations.toast.packageTimeConflict",`⚠️ الحزمة ${h(String(C))} محجوزة بالفعل في الفترة المختارة`));return}}const R=typeof a=="function"?a:()=>!1;for(const G of N)if(R(G,F,B,K)){E(o("reservations.toast.updateCrewConflict","⚠️ لا يمكن حفظ التعديلات بسبب تعارض في جدول أحد أعضاء الطاقم"));return}const D=Array.isArray(Ne.projects)&&Ne.projects.length?Ne.projects:ue().projects||[],z=k&&D.find(G=>String(G.id)===String(k))||null,H={..._,projectId:k?String(k):null,confirmed:g},{effectiveConfirmed:ne,projectLinked:ee,projectStatus:oe}=qt(H,z);let Q=!!P?.checked,re=!!T?.checked;if(ee&&(Q&&(P.checked=!1,Q=!1),re=!1),!ee&&Q!==re){E(o("reservations.toast.companyShareRequiresTax","⚠️ لا يمكن تفعيل نسبة الشركة بدون تفعيل الضريبة"));return}re&&(Ue("edit-res-company-share"),Q=!!P?.checked);let ge=Q?getCompanySharePercent("edit-res-company-share"):null;Q&&(!Number.isFinite(ge)||ge<=0)&&(Ue("edit-res-company-share"),ge=getCompanySharePercent("edit-res-company-share"));const be=Q&&re&&Number.isFinite(ge)&&ge>0,Ie=ee?!1:re;ee&&(y=0,b="percent");const U=bs(We,y,b,Ie,N,{start:F,end:B,companySharePercent:be?ge:0});let Z=wa();if(Number.isFinite(w)&&w>0){const G=U;let ye=null,C=null;q==="amount"?(ye=w,G>0&&(C=w/G*100)):(C=w,G>0&&(ye=w/100*G));const ae=lo({type:q,value:w,amount:ye,percentage:C,recordedAt:new Date().toISOString()});ae&&(Z=[...Z,ae],Vs(Z)),O&&(O.value="")}const se=hs({totalAmount:U,history:Z}),pe=vs({manualStatus:A,paidAmount:se.paidAmount,paidPercent:se.paidPercent,totalAmount:U});S&&!v&&(S.value=pe,S.dataset&&delete S.dataset.userSelected);let je=_.status??"pending";ee?je=z?.status??oe??je:["completed","cancelled"].includes(String(je).toLowerCase())||(je=g?"confirmed":"pending");const Ke=Br({reservationCode:_.reservationCode??_.reservationId??null,customerId:_.customerId,start:F,end:B,status:je,title:_.title??null,location:_.location??null,notes:f,projectId:k?String(k):null,totalAmount:U,discount:y,discountType:b,applyTax:Ie,paidStatus:pe,confirmed:ne,items:We.map(G=>({...G,equipmentId:G.equipmentId??G.id})),technicians:N,companySharePercent:be?ge:null,companyShareEnabled:be,paidAmount:se.paidAmount,paidPercentage:se.paidPercent,paymentProgressType:se.paymentProgressType,paymentProgressValue:se.paymentProgressValue,paymentHistory:Z});try{const G=await Ac(_.id||_.reservationId,Ke);await Rr(),kn(),Te(),E(o("reservations.toast.updated","✅ تم حفظ التعديلات على الحجز")),s?.(),io(),c?.({type:"updated",reservation:G}),r?.(),i?.(),cs?.hide?.()}catch(G){console.error("❌ [reservationsEdit] Failed to update reservation",G);const ye=ca(G)?G.message:o("reservations.toast.updateFailed","تعذر تحديث بيانات الحجز");E(ye,"error")}}function gm(e={}){Ne={...e};const{updateEditReservationSummary:t,addEquipmentToEditingReservation:n,addEquipmentByDescription:a,renderEditItems:s}=Ne,r=document.getElementById("edit-res-discount");r&&!r.dataset.listenerAttached&&(r.addEventListener("input",()=>{r.value=h(r.value),t?.()}),r.dataset.listenerAttached="true");const i=document.getElementById("edit-res-discount-type");i&&!i.dataset.listenerAttached&&(i.addEventListener("change",()=>t?.()),i.dataset.listenerAttached="true");const c=document.getElementById("edit-res-tax");c&&!c.dataset.listenerAttached&&(c.addEventListener("change",()=>{ms("tax")}),c.dataset.listenerAttached="true");const d=document.getElementById("edit-res-company-share");d&&!d.dataset.listenerAttached&&(d.addEventListener("change",()=>{ms("share")}),d.dataset.listenerAttached="true");const l=document.getElementById("edit-res-payment-progress-type");l&&!l.dataset.listenerAttached&&(l.addEventListener("change",()=>{l.dataset.userSelected="true",t?.()}),l.dataset.listenerAttached="true");const u=document.getElementById("edit-res-payment-progress-value");u&&!u.dataset.listenerAttached&&(u.addEventListener("input",()=>{u.value=h(u.value)}),u.dataset.listenerAttached="true"),typeof window<"u"&&typeof window.renderEditPaymentHistory=="function"&&window.renderEditPaymentHistory();const p=document.getElementById("edit-res-project");p&&!p.dataset.listenerAttached&&(p.addEventListener("change",()=>{uo();const g=Array.isArray(Ne.projects)&&Ne.projects.length?Ne.projects:ue().projects||[],S=p.value&&g.find(q=>String(q.id)===String(p.value))||null,A={...Ne?.reservation??{},projectId:p.value||null,confirmed:ds()},{effectiveConfirmed:L,projectLinked:O}=qt(A,S);ls(L,{disable:O}),t?.()}),p.dataset.listenerAttached="true");const f=document.getElementById("edit-res-confirmed-btn");f&&!f.dataset.listenerAttached&&(f.addEventListener("click",()=>{if(f.disabled)return;const g=!ds();ls(g),t?.()}),f.dataset.listenerAttached="true");const m=document.getElementById("save-reservation-changes");m&&!m.dataset.listenerAttached&&(m.addEventListener("click",()=>{Mu(Ne).catch(g=>{console.error("❌ [reservationsEdit] saveReservationChanges failed",g)})}),m.dataset.listenerAttached="true");const y=document.getElementById("edit-res-equipment-barcode");if(y&&!y.dataset.listenerAttached){let g=null;const S=()=>{y.value?.trim()&&(clearTimeout(g),g=null,n?.(y))};y.addEventListener("keydown",A=>{A.key==="Enter"&&(A.preventDefault(),S())});const v=()=>{if(clearTimeout(g),!y.value?.trim())return;const{start:A,end:L}=getEditReservationDateRange();!A||!L||(g=setTimeout(()=>{S()},150))};y.addEventListener("input",v),y.addEventListener("change",S),y.dataset.listenerAttached="true"}ro?.();const b=document.getElementById("editReservationModal");b&&!b.dataset.cleanupAttached&&(b.addEventListener("hidden.bs.modal",()=>{io(),t?.(),s?.([])}),b.dataset.cleanupAttached="true")}const zu=ue()||{};let Ve=(zu.projects||[]).map(Vu),Nn=!1;function bm(){return Ve}function Ia(e){Ve=Array.isArray(e)?e.map(Ks):[],fs({projects:Ve});try{const t=new CustomEvent("projects:changed");typeof window<"u"&&typeof window.dispatchEvent=="function"&&window.dispatchEvent(t),typeof document<"u"&&typeof document.dispatchEvent=="function"&&document.dispatchEvent(t)}catch(t){console.warn("⚠️ [projectsService] Failed to dispatch projects:changed event",t)}return Ve}async function Hu(e={}){const t=new URLSearchParams;Object.entries(e).forEach(([c,d])=>{d==null||d===""||t.set(c,String(d))});const n=t.toString(),s=(await Ye(`/projects/${n?`?${n}`:""}`))?.data;let r=[];Array.isArray(s)?r=s:s&&typeof s=="object"&&(Array.isArray(s.items)?r=s.items:Array.isArray(s.results)?r=s.results:Array.isArray(s.data)?r=s.data:Array.isArray(s.records)&&(r=s.records));const i=r.map(Us);return Ia(i),Nn=!0,Ve}async function Ou({force:e=!1,params:t=null}={}){if(!e&&Nn&&Ve.length>0)return Ve;try{return await Hu(t||{})}catch(n){return console.error("❌ [projectsService] Failed to load projects from API",n),Ve}}async function hm(e){const t=await Ye("/projects/",{method:"POST",body:e}),n=Us(t?.data??{}),a=[...Ve,n];return Ia(a),Nn=!0,n}async function vm(e,t){const n=await Ye(`/projects/?id=${encodeURIComponent(e)}`,{method:"PATCH",body:t}),a=Us(n?.data??{}),s=Ve.map(r=>String(r.id)===String(e)?a:r);return Ia(s),Nn=!0,a}async function qm(e){await Ye(`/projects/?id=${encodeURIComponent(e)}`,{method:"DELETE"});const t=Ve.filter(n=>String(n.id)!==String(e));Ia(t),Nn=!0}function Sm({projectCode:e,title:t,type:n,clientId:a,clientCompany:s,description:r,start:i,end:c,applyTax:d,paymentStatus:l,equipmentEstimate:u=0,expenses:p=[],taxAmount:f=0,totalWithTax:m=0,discount:y=0,discountType:b="percent",companyShareEnabled:g=!1,companySharePercent:S=null,companyShareAmount:v=0,paidAmount:A=null,paidPercentage:L=null,paymentProgressType:O=null,paymentProgressValue:q=null,confirmed:w=!1,technicians:k=[],equipment:N=[],payments:P,paymentHistory:T}={}){const I=Array.isArray(k)?k.map(D=>Number.parseInt(String(D),10)).filter(D=>Number.isInteger(D)&&D>0):[],F=Array.isArray(N)?N.map(D=>{const z=Number.parseInt(String(D.equipmentId??D.equipment_id??D.id??0),10),H=Number.parseInt(String(D.qty??D.quantity??0),10);return!Number.isInteger(z)||z<=0?null:{equipment_id:z,quantity:Number.isInteger(H)&&H>0?H:1}}).filter(Boolean):[],B=Array.isArray(p)?p.map(D=>{const z=Number.parseFloat(D?.amount??D?.value??0)||0,H=(D?.label??D?.name??"").trim();return H?{label:H,amount:Math.round(z*100)/100}:null}).filter(Boolean):[],V=B.reduce((D,z)=>D+(z?.amount??0),0),_={title:t,type:n,client_id:a?Number.parseInt(String(a),10):null,client_company:s??null,description:r??null,start_datetime:i??null,end_datetime:c||null,apply_tax:!!d,payment_status:l??"unpaid",equipment_estimate:Number.parseFloat(u)||0,expenses_total:Math.round(V*100)/100,tax_amount:Math.round((Number.parseFloat(f)||0)*100)/100,total_with_tax:Math.round((Number.parseFloat(m)||0)*100)/100,confirmed:!!w,technicians:I,equipment:F,expenses:B},W=Math.max(0,Number.parseFloat(y)||0);_.discount=W,_.discount_type=b==="amount"?"amount":"percent";const K=Number.parseFloat(S),$=!!g&&Number.isFinite(K)&&K>0;_.company_share_enabled=$,_.company_share_percent=$?K:0,_.company_share_amount=$?Math.max(0,Number.parseFloat(v)||0):0,Number.isFinite(Number(A))&&(_.paid_amount=Math.max(0,Number.parseFloat(A)||0)),Number.isFinite(Number(L))&&(_.paid_percentage=Math.max(0,Number.parseFloat(L)||0)),(O==="amount"||O==="percent")&&(_.payment_progress_type=O),q!=null&&q!==""&&(_.payment_progress_value=Number.parseFloat(q)||0),e&&(_.project_code=String(e).trim());const R=P!==void 0?P:T;if(R!==void 0){const D=mo(R)||[];_.payments=D.map(z=>({type:z.type,amount:z.amount!=null?z.amount:null,percentage:z.percentage!=null?z.percentage:null,value:z.value!=null?z.value:null,note:z.note??null,recorded_at:z.recordedAt??null}))}return _.end_datetime||delete _.end_datetime,_.client_company||(_.client_company=null),_}function Us(e={}){return Ks(e)}function Vu(e={}){return Ks(e)}function Ks(e={}){const t=e.id??e.projectId??e.project_id??null,n=Array.isArray(e.technicians)?e.technicians:[],a=n.map(m=>{if(m==null)return null;if(typeof m=="object"){const y=m.id??m.technician_id??m.technicianId;return y!=null?String(y):null}return String(m)}).filter(Boolean),r=(Array.isArray(e.equipment)?e.equipment:[]).map(m=>{const y=m?.equipment_id??m?.equipmentId??m?.id??null,b=m?.quantity??m?.qty??0,g=m?.barcode??m?.code??"",S=m?.description??m?.name??"";return{equipmentId:y!=null?String(y):null,qty:Number.parseInt(String(b),10)||0,barcode:g,description:S}}),c=(Array.isArray(e.expenses)?e.expenses:[]).map((m,y)=>({id:m?.id??`expense-${t??"x"}-${y}`,label:m?.label??"",amount:Number.parseFloat(m?.amount??0)||0})),d=Number.parseFloat(e.company_share_percent??e.companySharePercent??0)||0,l=e.company_share_enabled??e.companyShareEnabled,u=l!=null?l===!0||l===1||String(l).toLowerCase()==="true":d>0,p=e.payment_history??e.paymentHistory??e.payments??null,f=mo(p);return{id:t!=null?String(t):"",projectId:t!=null?Number(t):null,projectCode:e.project_code??e.projectCode??null,title:e.title??"",type:e.type??e.projectType??"",clientId:e.client_id!=null?String(e.client_id):e.clientId??null,clientCompany:e.client_company??e.clientCompany??"",description:e.description??"",start:e.start_datetime??e.start??null,end:e.end_datetime??e.end??null,applyTax:!!(e.apply_tax??e.applyTax??!1),paymentStatus:e.payment_status??e.paymentStatus??"unpaid",equipmentEstimate:Number.parseFloat(e.equipment_estimate??e.equipmentEstimate??0)||0,expensesTotal:Number.parseFloat(e.expenses_total??e.expensesTotal??0)||0,taxAmount:Number.parseFloat(e.tax_amount??e.taxAmount??0)||0,totalWithTax:Number.parseFloat(e.total_with_tax??e.totalWithTax??0)||0,discount:Number.parseFloat(e.discount??e.discount_value??0)||0,discountType:e.discount_type??e.discountType??"percent",companyShareEnabled:u,companySharePercent:u?d:0,companyShareAmount:Number.parseFloat(e.company_share_amount??e.companyShareAmount??0)||0,paidAmount:Number.parseFloat(e.paid_amount??e.paidAmount??0)||0,paidPercent:Number.parseFloat(e.paid_percentage??e.paidPercent??0)||0,paymentProgressType:e.payment_progress_type??e.paymentProgressType??null,paymentProgressValue:e.payment_progress_value??e.paymentProgressValue??null,confirmed:!!(e.confirmed??!1),createdAt:e.created_at??e.createdAt??null,updatedAt:e.updated_at??e.updatedAt??null,technicians:a,techniciansDetails:n.map(m=>typeof m=="object"?m:{id:m}),equipment:r,expenses:c,paymentHistory:f}}function Em(e){return e instanceof Nr}function Ra(e){if(e==null||e==="")return null;const t=h(String(e)).replace(/[^\d.,-]/g,"").trim();if(!t)return null;let n=t;const a=n.includes(","),s=n.includes(".");a&&(n=s?n.replace(/,/g,""):n.replace(/,/g,"."));const r=Number.parseFloat(n);return Number.isFinite(r)?r:null}function Uu(e){if(!e||typeof e!="object")return null;const t=e.type??e.payment_type??e.paymentType??e.kind??null;let n=typeof t=="string"?t.trim().toLowerCase():null;n==="percentage"&&(n="percent");const a=Ra(e.value);let s=Ra(e.amount),r=Ra(e.percentage);if(n==="amount"&&s==null&&a!=null?s=a:n==="percent"&&r==null&&a!=null&&(r=a),!n)if(s!=null&&s>=0)n="amount";else if(r!=null&&r>=0)n="percent";else if(a!=null&&a>=0)n="amount",s=a;else return null;if(n==="amount"){if(s==null||!Number.isFinite(s)||s<0)return null;s=Math.round(s*100)/100}if(n==="percent"){if(r==null||!Number.isFinite(r)||r<0)return null;r=Math.min(100,Math.round(r*100)/100)}const i=e.note??e.memo??e.description??null,c=i!=null?String(i).trim():null,d=e.recordedAt??e.recorded_at??e.date??null;let l=null;if(d){const p=new Date(d);Number.isNaN(p.getTime())||(l=p.toISOString())}l||(l=new Date().toISOString());const u=n==="amount"?s:n==="percent"?r:a;return{type:n,amount:s??null,percentage:r??null,value:u!=null?Math.round(u*100)/100:null,note:c&&c.length?c.slice(0,500):null,recordedAt:l}}function mo(e){if(e!==void 0)return e===null?[]:Array.isArray(e)?e.map(t=>Uu(t)).filter(Boolean):[]}const ra="reservations-ui:ready",$t=typeof EventTarget<"u"?new EventTarget:null;let Nt={};function Ku(e){return Object.freeze({...e})}function Qu(){if(!$t)return;const e=Nt,t=typeof CustomEvent=="function"?new CustomEvent(ra,{detail:e}):{type:ra,detail:e};typeof $t.dispatchEvent=="function"&&$t.dispatchEvent(t)}function Gu(e={}){if(!e||typeof e!="object")return Nt;const t={...Nt};return Object.entries(e).forEach(([n,a])=>{typeof a=="function"?t[n]=a:a===null&&delete t[n]}),Nt=Ku(t),Qu(),Nt}function Wu(e){if(e)return Nt?.[e]}function xm(e){const t=Wu(e);return typeof t=="function"?Promise.resolve(t):new Promise(n=>{const a=s=>{const i=(s?.detail||Nt)?.[e];typeof i=="function"&&($t&&$t.removeEventListener(ra,a),n(i))};$t&&$t.addEventListener(ra,a)})}function wm(){return Ou().catch(e=>{console.warn("⚠️ [reservations/controller] Failed to refresh projects before loading form",e)}).finally(()=>{const{technicians:e}=ue()||{};$c(e||[]),gi()})}function Qs(e=null){gi(),po(),typeof window.refreshCustomerReservationsViews=="function"&&window.refreshCustomerReservationsViews(),typeof window.refreshTechnicianReservationsViews=="function"&&window.refreshTechnicianReservationsViews();const t=e!=null?{detail:e}:{};document.dispatchEvent(new CustomEvent("reservations:changed",t))}function Xu(e){return e?window?.bootstrap?.Modal?window.bootstrap.Modal.getOrCreateInstance(e):typeof bootstrap<"u"&&bootstrap?.Modal?bootstrap.Modal.getOrCreateInstance(e):null:null}function ps(){return{populateEquipmentDescriptionLists:ht,setFlatpickrValue:Nu,splitDateTime:jr,renderEditItems:St,updateEditReservationSummary:ze,addEquipmentByDescription:$u,addEquipmentToEditingReservation:_u,addEquipmentToEditingByDescription:sa,combineDateTime:vn,hasEquipmentConflict:Ze,hasTechnicianConflict:Lr,renderReservations:po,handleReservationsMutation:Qs,ensureModal:Xu}}function po(e="reservations-list",t=null){pu({containerId:e,filters:t,onShowDetails:fo,onConfirmReservation:go})}function fo(e){return fu(e,{getEditContext:ps,onEdit:(t,{reservation:n})=>{bo(t,n)},onDelete:yo})}function yo(e){return Ft()?window.confirm(o("reservations.toast.deleteConfirm","⚠️ هل أنت متأكد من حذف هذا الحجز؟"))?gu(e,{onAfterChange:Qs}):!1:(wn(),!1)}function go(e){return bu(e,{onAfterChange:Qs})}function bo(e,t=null){if(document.getElementById("reservation-form")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (inline form)",r)}$r(e,ps());return}if(document.getElementById("editReservationModal")){try{localStorage.removeItem("pendingReservationEditId"),localStorage.removeItem("pendingReservationEditIndex")}catch(r){console.warn("⚠️ [reservations/controller] Unable to clear pending edit id (modal)",r)}$r(e,ps());return}const n=new URLSearchParams;if(t?.id||t?.reservationId){const r=t.id??t.reservationId;n.set("reservationEditId",String(r));try{localStorage.setItem("pendingReservationEditId",String(r)),localStorage.removeItem("pendingReservationEditIndex")}catch(i){console.warn("⚠️ [reservations/controller] Unable to persist pending edit id",i)}}else{n.set("reservationEditIndex",String(e));try{localStorage.setItem("pendingReservationEditIndex",String(e)),localStorage.removeItem("pendingReservationEditId")}catch(r){console.warn("⚠️ [reservations/controller] Unable to persist pending edit index",r)}}uc({dashboardTab:"reservations-tab",dashboardSubTab:"my-reservations-tab"}).catch(r=>{console.warn("⚠️ [reservations/controller] Failed to persist tab preference",r)});const a=n.toString(),s=a?`dashboard.html?${a}#reservations`:"dashboard.html#reservations";window.location.href=s}function Im(){Gu({showReservationDetails:fo,deleteReservation:yo,confirmReservation:go,openReservationEditor:bo})}export{vm as A,Gu as B,fo as C,Us as D,tn as E,_s as F,cm as G,lm as H,bm as I,Em as J,hi as K,dm as L,pm as M,am as N,sm as O,om as P,Hu as Q,_e as R,rm as S,im as T,um as U,qm as V,hm as W,Yl as X,qi as Y,Si as Z,mm as _,Ou as a,Im as b,gm as c,ym as d,fm as e,gi as f,ps as g,le as h,tm as i,Qs as j,Ql as k,wm as l,qt as m,ba as n,Te as o,Fc as p,Un as q,po as r,nm as s,Zu as t,ze as u,em as v,Wu as w,xm as x,bi as y,Sm as z};
