const n=`@page {
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

/* Keep header grid stable if logo hidden: reserve same space */
.quote-logo--placeholder {
  width: 90px;
  height: 90px;
  display: block;
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

/* When language is English, align text to the left while keeping document RTL */
#quotation-pdf-root[data-lang="en"] .quote-header__meta,
#quotation-pdf-root[data-lang="en"] .quote-section h3,
#quotation-pdf-root[data-lang="en"] .quote-section__title,
#quotation-pdf-root[data-lang="en"] .info-plain,
#quotation-pdf-root[data-lang="en"] .quote-table td,
#quotation-pdf-root[data-lang="en"] .totals-inline__item,
#quotation-pdf-root[data-lang="en"] .payment-row {
  text-align: left !important;
}

/* Ensure LTR flow for English inline info values (Code, Customer, etc.) */
#quotation-pdf-root[data-lang="en"] .info-plain,
#quotation-pdf-root[data-lang="en"] .info-plain__item,
#quotation-pdf-root[data-lang="en"] .info-plain__value {
  direction: ltr !important;
  unicode-bidi: plaintext;
}

/* English (checklist) tables render left-to-right */
#quotation-pdf-root[data-lang="en"] .quote-table,
#quotation-pdf-root[data-lang="en"] .quote-table thead,
#quotation-pdf-root[data-lang="en"] .quote-table tbody,
#quotation-pdf-root[data-lang="en"] .quote-table tr,
#quotation-pdf-root[data-lang="en"] .quote-table th,
#quotation-pdf-root[data-lang="en"] .quote-table td {
  direction: ltr !important;
}
#quotation-pdf-root[data-lang="en"] .quote-header__meta {
  align-items: flex-start;
  justify-self: start;
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

/* Empty spacer section used to push sibling to an edge */
.quote-section--empty {
  flex: 0 0 0 !important;
  width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}

.quote-section-row--primary {
  /* Force a stable two-column layout: project (left), customer (right) */
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-areas: 'left right';
  column-gap: 18px;
  align-items: start;
  /* Neutralize RTL influence on column indexing; text alignment handled per-section */
  direction: ltr;
}

/* Explicitly map sections to grid areas to avoid writing-mode quirks */
.quote-section-row--primary .quote-section--project { grid-area: left; }
.quote-section-row--primary .quote-section--customer { grid-area: right; }

.quote-section--project,
.quote-section--customer {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  flex: 1 1 0;
}

.quote-section--project {
  /* Place project block on the far left; align content to the left */
  text-align: left;
  align-items: flex-start;
}

.quote-section--customer {
  /* Place customer block on the far right; align content to the right */
  text-align: right;
  align-items: flex-end;
}

.quote-section--project .quote-section__title {
  text-align: left;
  width: 100%;
}

.quote-section--customer .quote-section__title {
  width: 100%;
}

.quote-section--project .info-plain,
.quote-section--project .info-plain__item {
  text-align: left;
  align-items: flex-start;
  justify-content: flex-start;
  align-self: flex-start;
  margin-left: 0;
  margin-right: 0;
}

.quote-section--customer .info-plain,
.quote-section--customer .info-plain__item {
  text-align: right;
  align-items: flex-end;
  justify-content: flex-end;
  align-self: flex-end;
  margin-right: 0;
  margin-left: 0;
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
  padding: 6px 12px; /* افتراضي المعاينة */
  border-radius: 9px;
  background: #f8fafc;
  border: 1px solid rgba(148, 163, 184, 0.3);
  white-space: nowrap;
  font-size: 0.64rem;
  font-family: 'Tajawal', sans-serif;
  flex: 0 0 auto;
  line-height: 1; /* منع انجراف السطر للأسفل داخل الفقاعة */
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
  padding: 10px 16px; /* افتراضي المعاينة */
  min-width: 200px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 12px;
  line-height: 1;
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

/* Make exported PDF table fonts match preview sizing more closely */
#quotation-pdf-root[data-quote-render-context="export"] .quote-table {
  font-size: 10px;
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

/* Light blue highlight for table headers (equipment + crew) */
.quote-table thead th {
  background: rgba(56, 189, 248, 0.14) !important; /* sky-400 at ~14% */
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

/* Ensure cell content is vertically centered in both preview and exported PDF */
.quote-table th,
.quote-table td {
  vertical-align: middle !important;
  line-height: 1.6;
}

.quote-table th > *,
.quote-table td > * {
  vertical-align: middle !important;
}

/* Wrapper used inside each cell to force consistent vertical centering in captured PDF */
.quote-cell {
  display: flex;
  align-items: center;      /* vertical center */
  justify-content: center;  /* horizontal center */
  width: 100%;
  height: 100%;
  min-height: 18px;
  text-align: center;
}

/* Raise text slightly within table cells for better visual alignment in PDF */
.quote-table .quote-cell {
  position: relative;
  top: var(--cell-text-nudge, -3px);
  line-height: 1.3;
}

/* Multi-line descriptions preserve manual breaks while keeping vertical centering */
.quote-cell--desc {
  white-space: pre-wrap;
  text-align: center;
}

/* Subtotal row/box under each table */
.quote-table-subtotal {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.quote-table-subtotal__pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc !important;
  color: #0f172a !important;
  border: 1px solid rgba(148, 163, 184, 0.55);
  border-radius: 999px;
  padding: 8px 14px; /* مساحة رأسية أكثر لرفع النص */
  font-size: 12px;
  line-height: 1;
}

/* نَقلة طفيفة داخل جذور PDF لفقاعات الإجماليات لضبط توسيط النص رأسياً في المطبوع */
/* نستخدم متغيّر CSS لضبط الدرجة بحسب سياق العرض (معاينة/تصدير) ونعتمد transform لدقة نصف-بيكسل */
/* قيم افتراضية على مستوى الصفحة لضمان تطبيقها أيضاً على نسخ html2canvas (pageClone) خارج الجذر */
.quote-page { --bubble-text-nudge: -8px; --bubble-text-nudge-inner: -0.28em; }
/* معاينة داخل الجذر أخف، وتصدير أقوى */
#quotation-pdf-root { --bubble-text-nudge: -3px; --bubble-text-nudge-inner: -0.06em; }
#quotation-pdf-root[data-quote-render-context="export"] { --bubble-text-nudge: -8px; --bubble-text-nudge-inner: -0.28em; }
#reports-a4-root { --bubble-text-nudge: -3px; }
#reports-a4-root[data-render-context="export"] { --bubble-text-nudge: -3.5px; }

/* لا ترفع الحاوية نفسها كي لا تقترب من الجدول؛ نكتفي برفع النص الداخلي فقط */
#quotation-pdf-root .totals-inline__item,
#quotation-pdf-root .totals-item--final,
#quotation-pdf-root .quote-table-subtotal__pill,
.quote-page .totals-inline__item,
.quote-page .totals-item--final,
.quote-page .quote-table-subtotal__pill,
#reports-a4-root .totals-inline__item,
#reports-a4-root .totals-item--final,
#reports-a4-root .quote-table-subtotal__pill {
  position: relative;
  transform: none;
}

/* الحشوات تبقى متساوية، نعتمد الرفع بالتحويل فقط */
#quotation-pdf-root[data-quote-render-context="export"] .totals-inline__item { padding: 6px 12px; }
#quotation-pdf-root[data-quote-render-context="export"] .totals-item--final { padding: 10px 16px; }
#quotation-pdf-root[data-quote-render-context="export"] .quote-table-subtotal__pill { padding: 8px 14px; }

/* رَفعة طفيفة للنص داخل الفقاعة بوحدة em لضبط أدق مع اختلاف كثافات البيكسل */
#quotation-pdf-root .totals-inline__label,
#quotation-pdf-root .totals-inline__slash,
#quotation-pdf-root .totals-inline__value,
#quotation-pdf-root .totals-item__label,
#quotation-pdf-root .totals-item__slash,
#quotation-pdf-root .totals-item__value,
#quotation-pdf-root .quote-table-subtotal__label,
#quotation-pdf-root .quote-table-subtotal__value,
.quote-page .totals-inline__label,
.quote-page .totals-inline__slash,
.quote-page .totals-inline__value,
.quote-page .totals-item__label,
.quote-page .totals-item__slash,
.quote-page .totals-item__value,
.quote-page .quote-table-subtotal__label,
.quote-page .quote-table-subtotal__value {
  display: inline-block;
  transform: translateY(var(--bubble-text-nudge-inner));
}
.quote-table-subtotal__label { font-weight: 700; }
.quote-table-subtotal__value { font-weight: 700; }

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

/* Notes block left-to-right in English */
#quotation-pdf-root[data-lang="en"] .quote-notes {
  direction: ltr;
  text-align: left;
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
#quotation-pdf-root[data-lang="en"] .info-plain__item { direction: ltr; }
.info-plain__label, .info-plain__value, .info-plain__slash { unicode-bidi: isolate; }

/* Keep table headers centered in both languages */
#quotation-pdf-root .quote-table th { text-align: center !important; }

/* In EN, align Customer/Project info blocks to the right side so content sits under the section title placed on the right column */
#quotation-pdf-root[data-lang="en"] .quote-section--customer,
#quotation-pdf-root[data-lang="en"] .quote-section--project {
  text-align: right !important;
  align-items: flex-end !important;
}
#quotation-pdf-root[data-lang="en"] .quote-section--customer .info-plain,
#quotation-pdf-root[data-lang="en"] .quote-section--project .info-plain {
  text-align: right !important;
}

/* Strong anchoring for Arabic layout: ensure info blocks sit directly under their titles */
#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--project {
  text-align: left !important;
  align-items: flex-start !important;
}
#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--project .quote-section__title {
  text-align: left !important;
}
#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--project .info-plain {
  width: 100% !important;
  text-align: left !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
}

#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--customer {
  text-align: right !important;
  align-items: flex-end !important;
}
#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--customer .quote-section__title {
  text-align: right !important;
}
#quotation-pdf-root:not([data-lang="en"]) .quote-section-row--primary .quote-section--customer .info-plain {
  width: 100% !important;
  text-align: right !important;
  align-items: flex-end !important;
  justify-content: flex-end !important;
}
`;export{n as q};
