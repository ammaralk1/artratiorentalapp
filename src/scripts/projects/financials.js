import { normalizeNumbers } from '../utils.js';
import { PROJECT_TAX_RATE } from './constants.js';

function toProjectNumber(value) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  const normalized = normalizeNumbers(String(value ?? '')).replace(/[^\d.+-]/g, '');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function roundMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Number(number.toFixed(2));
}

export function resolveProjectOverheadPercent({
  applyTax = false,
  companyShareEnabled = false,
  companySharePercent = null,
} = {}) {
  const percent = toProjectNumber(companySharePercent);
  return companyShareEnabled && applyTax && percent > 0 ? percent : 0;
}

export function applyProjectItemOverhead(
  value,
  { applyTax = false, companyShareEnabled = false, companySharePercent = null } = {},
) {
  const percent = resolveProjectOverheadPercent({ applyTax, companyShareEnabled, companySharePercent });
  const base = toProjectNumber(value);
  if (percent <= 0 || base <= 0) return roundMoney(base);
  return roundMoney(base * (1 + (percent / 100)));
}

export function calculateProjectLineFinancials({
  equipmentRevenue = 0,
  crewRevenue = 0,
  servicesRevenue = 0,
  equipmentCost = 0,
  crewCost = 0,
  servicesCost = 0,
  discountValue = 0,
  discountType = 'percent',
  applyTax = false,
  companyShareEnabled = false,
  companySharePercent = null,
  taxRate = PROJECT_TAX_RATE,
} = {}) {
  const baseSubtotal = roundMoney(
    toProjectNumber(equipmentRevenue)
    + toProjectNumber(crewRevenue)
    + toProjectNumber(servicesRevenue),
  );
  const internalCost = roundMoney(
    toProjectNumber(equipmentCost)
    + toProjectNumber(crewCost)
    + toProjectNumber(servicesCost),
  );
  const overheadPercent = resolveProjectOverheadPercent({
    applyTax,
    companyShareEnabled,
    companySharePercent,
  });
  const overheadMultiplier = 1 + (overheadPercent / 100);
  const clientSubtotalBeforeDiscount = roundMoney(baseSubtotal * overheadMultiplier);
  const rawDiscount = Math.max(0, toProjectNumber(discountValue));
  const discountAmount = roundMoney(
    discountType === 'amount'
      ? Math.min(rawDiscount, clientSubtotalBeforeDiscount)
      : Math.min(clientSubtotalBeforeDiscount, clientSubtotalBeforeDiscount * (rawDiscount / 100)),
  );
  const clientNetBeforeVat = roundMoney(Math.max(0, clientSubtotalBeforeDiscount - discountAmount));
  const discountRatio = clientSubtotalBeforeDiscount > 0
    ? Math.min(1, Math.max(0, discountAmount / clientSubtotalBeforeDiscount))
    : 0;
  const baseDiscountAmount = roundMoney(baseSubtotal * discountRatio);
  const baseNetAfterDiscount = roundMoney(Math.max(0, baseSubtotal - baseDiscountAmount));
  const overheadAmount = roundMoney(clientNetBeforeVat * (overheadPercent / 100));
  const taxAmount = applyTax ? roundMoney(clientNetBeforeVat * taxRate) : 0;
  const totalWithTax = roundMoney(clientNetBeforeVat + taxAmount);
  const marginBeforeTax = roundMoney(clientNetBeforeVat - overheadAmount - internalCost);

  return {
    equipmentRevenue: roundMoney(equipmentRevenue),
    crewRevenue: roundMoney(crewRevenue),
    servicesRevenue: roundMoney(servicesRevenue),
    equipmentCost: roundMoney(equipmentCost),
    crewCost: roundMoney(crewCost),
    servicesCost: roundMoney(servicesCost),
    internalCost,
    baseSubtotal,
    clientSubtotalBeforeDiscount,
    discountAmount,
    baseDiscountAmount,
    baseNetAfterDiscount,
    subtotalAfterDiscount: clientNetBeforeVat,
    clientNetBeforeVat,
    overheadAmount,
    companyShareAmount: overheadAmount,
    overheadPercent,
    directCostTotal: internalCost,
    taxableAmount: clientNetBeforeVat,
    subtotal: clientNetBeforeVat,
    applyTax: Boolean(applyTax),
    vatAmount: taxAmount,
    taxAmount,
    grandTotal: totalWithTax,
    totalWithTax,
    profit: marginBeforeTax,
    marginBeforeTax,
    netProfit: marginBeforeTax,
  };
}
