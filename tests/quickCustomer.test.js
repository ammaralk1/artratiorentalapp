import { beforeEach, describe, expect, it, vi } from 'vitest';

const createCustomerRecordMock = vi.fn();

vi.mock('../src/scripts/customers.js', () => ({
  createCustomerRecord: createCustomerRecordMock,
}));

vi.mock('../src/scripts/language.js', () => ({
  t: (_key, fallback) => fallback,
}));

vi.mock('../src/scripts/utils.js', () => ({
  normalizeNumbers: (value) => String(value ?? '').replace(/[٠-٩]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit)),
}));

describe('quick customer helpers', () => {
  beforeEach(() => {
    createCustomerRecordMock.mockReset();
  });

  it('normalizes quick customer payloads and Arabic phone digits', async () => {
    const { buildQuickCustomerPayload } = await import('../src/scripts/quickCustomer.js');

    expect(buildQuickCustomerPayload({
      fullName: '  Sara Client  ',
      phone: '٠٥٥١٢٣٤٥٦٧',
      email: ' sara@example.com ',
      company: ' Studio ',
      taxId: ' 123 ',
      address: ' Riyadh ',
      notes: ' VIP ',
    })).toEqual({
      full_name: 'Sara Client',
      phone: '0551234567',
      email: 'sara@example.com',
      company: 'Studio',
      tax_id: '123',
      taxId: '123',
      address: 'Riyadh',
      notes: 'VIP',
    });
  });

  it('merges created customers without duplicating existing cache entries', async () => {
    const { mergeQuickCustomerIntoList } = await import('../src/scripts/quickCustomer.js');

    const result = mergeQuickCustomerIntoList(
      [{ id: 7, customerName: 'Old Name', company: 'Old Co' }],
      { customerId: 7, full_name: 'New Name', companyName: 'New Co' }
    );

    expect(result.customer).toEqual(expect.objectContaining({
      id: '7',
      customerName: 'New Name',
      company: 'New Co',
      companyName: 'New Co',
    }));
    expect(result.customers).toHaveLength(1);
    expect(result.customers[0]).toEqual(expect.objectContaining({
      id: '7',
      customerName: 'New Name',
    }));
  });

  it('creates customers through the normalized shared path', async () => {
    createCustomerRecordMock.mockResolvedValue({ id: 9, full_name: 'Ahmed', phone: '055' });
    const { createQuickCustomer } = await import('../src/scripts/quickCustomer.js');

    const created = await createQuickCustomer({ fullName: 'Ahmed', phone: '٠٥٥' });

    expect(createCustomerRecordMock).toHaveBeenCalledWith(expect.objectContaining({
      full_name: 'Ahmed',
      phone: '055',
    }));
    expect(created).toEqual(expect.objectContaining({
      id: '9',
      customerName: 'Ahmed',
    }));
  });

  it('creates customers from already collected quick modal payloads', async () => {
    createCustomerRecordMock.mockResolvedValue({ id: 11, full_name: 'Mona', phone: '0551112222' });
    const { collectQuickCustomerPayload, createQuickCustomer } = await import('../src/scripts/quickCustomer.js');

    const payload = collectQuickCustomerPayload({
      nameInput: { value: ' Mona ' },
      phoneInput: { value: '٠٥٥١١١٢٢٢٢' },
      companyInput: { value: ' Art Co ' },
    });
    const created = await createQuickCustomer(payload);

    expect(createCustomerRecordMock).toHaveBeenCalledWith(expect.objectContaining({
      full_name: 'Mona',
      phone: '0551112222',
      company: 'Art Co',
    }));
    expect(created).toEqual(expect.objectContaining({
      id: '11',
      customerName: 'Mona',
    }));
  });
});
