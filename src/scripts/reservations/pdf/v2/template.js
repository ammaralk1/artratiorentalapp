import quotePdfV2Styles from '../../../../styles/quotePdfV2.css?raw';
import { PDF_FONT_FACE } from '../constants.js';
import { getQuoteV2Direction } from './i18n.js';
import { buildQuoteV2Data, escapeQuoteV2 } from './data.js';

function renderInfoSection(title, rows) {
  if (!rows.length) return '';
  return `
    <section class="quote-v2-section">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(title)}</h2>
      <div class="quote-v2-info-list">
        ${rows.map((row) => `
          <div class="quote-v2-info-row">
            <strong class="quote-v2-info-label">${escapeQuoteV2(row.label)}</strong>
            <span>${escapeQuoteV2(row.value)}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderTable(table, noDataLabel, { titleSuffix = '' } = {}) {
  const subtotalHtml = table.subtotal ? `
    <div class="quote-v2-table-total">
      <div class="quote-v2-table-total-box">
        <span>${escapeQuoteV2(table.subtotal.label)}</span>
        <strong>${escapeQuoteV2(table.subtotal.value)}</strong>
      </div>
    </div>
  ` : '';
  return `
    <section class="quote-v2-section quote-v2-table-section quote-v2-table-section--${escapeQuoteV2(table.key)}">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(`${table.title}${titleSuffix}`)}</h2>
      ${table.rows.length ? `
        <table class="quote-v2-table">
          <thead>
            <tr>${table.headers.map((header) => `<th>${escapeQuoteV2(header)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${table.rows.map((row) => `
              <tr>
                ${row.cells.map((cell, index) => `
                  <td${index === row.mainCellIndex ? ' class="quote-v2-cell-main"' : ''}>${escapeQuoteV2(cell)}</td>
                `).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${subtotalHtml}
      ` : `<div class="quote-v2-empty">${escapeQuoteV2(noDataLabel)}</div>`}
    </section>
  `;
}

function renderFinancial(cards) {
  if (!cards.length) return '';
  return `
    <section class="quote-v2-section">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(cards[0]?.sectionTitle || '')}</h2>
      <div class="quote-v2-financial-grid">
        ${cards.map((card) => `
          <div class="quote-v2-financial-card${card.total ? ' quote-v2-financial-card--total' : ''}">
            <span>${escapeQuoteV2(card.label)}</span>
            <strong>${escapeQuoteV2(card.value)}</strong>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderPayment(data) {
  if (!data.showPayment || !data.paymentRows.length) return '';
  return `
    <section class="quote-v2-section">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(data.labels.paymentDetails)}</h2>
      <div class="quote-v2-payment">
        ${data.paymentRows.map(({ label, value }) => `
          <div><strong>${escapeQuoteV2(label)}</strong> / ${escapeQuoteV2(value)}</div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderNotes(data) {
  if (!data.showNotes || !data.notes) return '';
  return `
    <section class="quote-v2-section">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(data.notesTitle)}</h2>
      <div class="quote-v2-notes">${escapeQuoteV2(data.notes)}</div>
    </section>
  `;
}

function renderTerms(data, terms = data.terms, { continued = false } = {}) {
  if (!terms.length) return '';
  const title = continued
    ? `${data.labels.terms}${data.language === 'en' ? ' (continued)' : ' - تابع'}`
    : data.labels.terms;
  return `
    <section class="quote-v2-section">
      <h2 class="quote-v2-section-title">${escapeQuoteV2(title)}</h2>
      <ul class="quote-v2-terms">
        ${terms.map((term) => `<li>${escapeQuoteV2(term)}</li>`).join('')}
      </ul>
    </section>
  `;
}

function splitRows(rows, size) {
  const chunks = [];
  for (let index = 0; index < rows.length; index += size) {
    chunks.push(rows.slice(index, index + size));
  }
  return chunks.length ? chunks : [[]];
}

function splitTextIntoChunks(text, maxChars = 850) {
  const source = String(text || '').trim();
  if (!source) return [];
  const paragraphs = source.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const chunks = [];
  let current = '';

  paragraphs.forEach((paragraph) => {
    const next = current ? `${current}\n\n${paragraph}` : paragraph;
    if (next.length <= maxChars) {
      current = next;
      return;
    }
    if (current) {
      chunks.push(current);
      current = '';
    }
    if (paragraph.length <= maxChars) {
      current = paragraph;
      return;
    }
    for (let index = 0; index < paragraph.length; index += maxChars) {
      chunks.push(paragraph.slice(index, index + maxChars));
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

function splitTerms(terms, size = 8) {
  return splitRows(terms, size).filter((chunk) => chunk.length);
}

function getTableChunkSize(tableKey) {
  if (tableKey === 'services') return 7;
  if (tableKey === 'equipment') return 8;
  if (tableKey === 'crew') return 9;
  return 8;
}

function buildContentBlocks(data, financialCards) {
  const blocks = [];
  const infoHtml = `
    <div class="quote-v2-info-grid">
      ${data.showClient ? renderInfoSection(data.labels.clientInfo, data.clientRows) : ''}
      ${data.showDetails ? renderInfoSection(data.detailTitle, data.detailRows) : ''}
    </div>
  `.trim();
  if (infoHtml.replace(/<[^>]+>/g, '').trim()) {
    blocks.push({ html: infoHtml, weight: 5 });
  }

  data.tables.forEach((table) => {
    const rowChunks = splitRows(table.rows, getTableChunkSize(table.key));
    rowChunks.forEach((rows, index) => {
      const isLastChunk = index === rowChunks.length - 1;
      blocks.push({
        html: renderTable({ ...table, rows, subtotal: isLastChunk ? table.subtotal : null }, data.labels.noData, {
          titleSuffix: index > 0 ? (data.language === 'en' ? ' (continued)' : ' - تابع') : '',
        }),
        weight: Math.max(4, rows.length + 3),
      });
    });
  });

  const financialHtml = renderFinancial(financialCards);
  if (financialHtml) blocks.push({ html: financialHtml, weight: 4 });

  const paymentHtml = renderPayment(data);
  if (paymentHtml) blocks.push({ html: paymentHtml, weight: 3 });
  const notesChunks = splitTextIntoChunks(data.showNotes ? data.notes : '', 850);
  notesChunks.forEach((notes, index) => {
    const notesHtml = renderNotes({ ...data, notes, notesTitle: index > 0 ? `${data.notesTitle}${data.language === 'en' ? ' (continued)' : ' - تابع'}` : data.notesTitle });
    if (notesHtml) blocks.push({ html: notesHtml, weight: Math.max(3, Math.ceil(notes.length / 260) + 2) });
  });
  if (data.showApproval !== false) {
    blocks.push({ html: `<div class="quote-v2-approval">${escapeQuoteV2(data.labels.approvalNote)}</div>`, weight: 2 });
  }
  splitTerms(data.terms, 8).forEach((terms, index) => {
    const termsHtml = renderTerms(data, terms, { continued: index > 0 });
    if (termsHtml) blocks.push({ html: termsHtml, weight: Math.max(4, Math.ceil(terms.length / 2) + 2) });
  });

  return blocks;
}

function paginateBlocks(blocks) {
  const pages = [];
  let current = [];
  let weight = 0;
  let maxWeight = 22;

  blocks.forEach((block) => {
    if (current.length && weight + block.weight > maxWeight) {
      pages.push(current);
      current = [];
      weight = 0;
      maxWeight = 26;
    }
    current.push(block);
    weight += block.weight;
  });

  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

function renderPage(data, blocks, { first = false } = {}) {
  return `
    <article class="quote-page${first ? ' quote-page--first' : ' quote-page--continued'}">
      ${first ? `
        <header class="quote-v2-header">
          ${data.hideLogo ? '' : `<div class="quote-v2-logo-wrap">
            <img class="quote-v2-logo" src="${escapeQuoteV2(data.company.logoUrl)}" alt="Art Ratio">
          </div>`}
          <div class="quote-v2-title">
            <h1>${escapeQuoteV2(data.quoteTitle || data.labels.quoteTitle)}</h1>
            ${data.hideCompany ? '' : `
              <p>${escapeQuoteV2(data.company.name)}</p>
              <p>${escapeQuoteV2(data.language === 'en' ? 'Commercial Registration' : 'السجل التجاري')}: ${escapeQuoteV2(data.company.commercialRegistry)}</p>
              <p>${escapeQuoteV2(data.language === 'en' ? 'Media License' : 'ترخيص إعلامي')}: ${escapeQuoteV2(data.company.mediaLicense)}</p>
            `}
          </div>
          <div class="quote-v2-meta">
            <div class="quote-v2-meta-row">
              <span>${escapeQuoteV2(data.numberLabel)}</span>
              <span class="quote-v2-meta-separator">:</span>
              <strong>${escapeQuoteV2(data.quoteNumber)}</strong>
            </div>
            <div class="quote-v2-meta-row">
              <span>${escapeQuoteV2(data.labels.date)}</span>
              <span class="quote-v2-meta-separator">:</span>
              <strong>${escapeQuoteV2(data.quoteDate)}</strong>
            </div>
          </div>
        </header>
      ` : ''}
      <main class="quote-v2-body">
        ${blocks.map((block) => block.html).join('')}
      </main>
    </article>
  `;
}

export function buildQuoteV2Html(activeQuoteState = {}) {
  const data = buildQuoteV2Data(activeQuoteState);
  const dir = getQuoteV2Direction(data.language);
  const financialCards = data.financialCards.map((card) => ({
    ...card,
    sectionTitle: data.labels.financialSummary,
  }));
  const pages = paginateBlocks(buildContentBlocks(data, financialCards));

  return `
    <div id="quote-pdf-v2-root" dir="${escapeQuoteV2(dir)}" data-lang="${escapeQuoteV2(data.language)}" data-quote-version="v2">
      <style>${PDF_FONT_FACE}${quotePdfV2Styles}</style>
      <div class="quote-document" data-quote-document>
        <div class="quote-preview-pages" data-quote-pages>
          ${pages.map((blocks, index) => renderPage(data, blocks, { first: index === 0 })).join('')}
        </div>
      </div>
    </div>
  `;
}

export function isQuoteV2Context(activeQuoteState = {}) {
  return activeQuoteState?.quoteVersion === 'v2'
    && ['reservation', 'project', 'reservationChecklist'].includes(activeQuoteState?.context || 'reservation');
}
