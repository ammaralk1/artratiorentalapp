import { createCustomerRecord } from './customers.js';
import { t } from './language.js';
import { normalizeNumbers } from './utils.js';

export function getQuickCustomerDisplayName(customer = {}) {
  return String(customer?.customerName || customer?.full_name || customer?.name || '').trim();
}

export function normalizeQuickCustomerRecord(customer = {}) {
  const id = customer.id ?? customer.customerId ?? customer.customerID ?? '';
  const name = getQuickCustomerDisplayName(customer);
  const company = String(customer.companyName || customer.company || '').trim();
  const taxId = String(customer.tax_id ?? customer.taxId ?? '').trim();

  return {
    ...customer,
    id: id !== undefined && id !== null ? String(id) : '',
    full_name: name,
    customerName: name,
    name,
    company,
    companyName: company,
    tax_id: taxId,
    taxId,
  };
}

export function buildQuickCustomerPayload(values = {}) {
  const normalizedFullName = String(
    values.fullName
      ?? values.full_name
      ?? values.customerName
      ?? values.name
      ?? ''
  ).trim();
  const normalizedPhone = normalizeNumbers(String(values.phone ?? values.customerPhone ?? '').trim());

  if (!normalizedFullName || !normalizedPhone) {
    throw new Error(t('customers.toast.missingFields', 'يرجى تعبئة الاسم ورقم الهاتف'));
  }

  const normalizedTaxId = String(values.taxId ?? values.tax_id ?? '').trim();
  const normalizedCompany = String(values.company ?? values.companyName ?? values.company_name ?? '').trim();
  return {
    full_name: normalizedFullName,
    phone: normalizedPhone,
    email: String(values.email || '').trim(),
    company: normalizedCompany,
    tax_id: normalizedTaxId,
    taxId: normalizedTaxId,
    address: String(values.address || '').trim(),
    notes: String(values.notes || '').trim(),
  };
}

export function collectQuickCustomerPayload(elements = {}) {
  const payload = buildQuickCustomerPayload({
    fullName: elements.nameInput?.value,
    phone: elements.phoneInput?.value,
    email: elements.emailInput?.value,
    company: elements.companyInput?.value,
    taxId: elements.taxInput?.value,
    address: elements.addressInput?.value,
    notes: elements.notesInput?.value,
  });

  if (elements.phoneInput) {
    elements.phoneInput.value = payload.phone;
  }

  return payload;
}

export function mergeQuickCustomerIntoList(customers = [], createdCustomer = {}) {
  const normalizedCustomer = normalizeQuickCustomerRecord(createdCustomer);
  if (!getQuickCustomerDisplayName(normalizedCustomer)) {
    return {
      customer: normalizedCustomer,
      customers: Array.isArray(customers) ? customers.map(normalizeQuickCustomerRecord) : [],
    };
  }

  const normalizedCustomers = Array.isArray(customers)
    ? customers.map(normalizeQuickCustomerRecord).filter((customer) => getQuickCustomerDisplayName(customer))
    : [];
  const createdId = normalizedCustomer.id ? String(normalizedCustomer.id) : '';
  const hasExisting = createdId && normalizedCustomers.some((customer) => String(customer.id) === createdId);

  return {
    customer: normalizedCustomer,
    customers: hasExisting
      ? normalizedCustomers.map((customer) => String(customer.id) === createdId ? normalizedCustomer : customer)
      : [...normalizedCustomers, normalizedCustomer],
  };
}

export async function createQuickCustomer(values = {}) {
  const payload = buildQuickCustomerPayload(values);
  return normalizeQuickCustomerRecord(await createCustomerRecord(payload));
}
