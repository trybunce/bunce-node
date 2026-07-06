import type { AxiosInstance } from 'axios'
import { describe, expect, it, vi } from 'vitest'
import { Customers } from './customers'
import type {
  CreateBulkCustomerRequestPayload,
  CreateCustomerRequestPayload,
  UpdateBulkCustomerRequestPayload,
  UpdateCustomerRequestPayload,
} from './customers.interface'

function createHttpMock() {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as AxiosInstance & {
    get: ReturnType<typeof vi.fn>
    post: ReturnType<typeof vi.fn>
    put: ReturnType<typeof vi.fn>
    patch: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
}

describe('Customers', () => {
  it('creates a customer with the documented payload shape', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload: CreateCustomerRequestPayload = {
      customer_id: '0000',
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      phone_no: '+23481999999999',
      devices: [{ device_type: 'ios', device_token: 'device-token' }],
    }

    await customers.create(payload)

    expect(http.post).toHaveBeenCalledWith('/customers', payload)
  })

  it('bulk creates customers using the customers wrapper object', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload: CreateBulkCustomerRequestPayload = {
      customers: [
        {
          customer_id: '0000',
          first_name: 'John',
          last_name: 'Doe',
          email: 'johndoe@example.com',
          phone_no: '+23481999999999',
        },
      ],
    }

    await customers.bulkCreate(payload)

    expect(http.post).toHaveBeenCalledWith('/customers/bulk', payload)
  })

  it('lists customers with cursor and filter query parameters', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const query = {
      per_page: 10,
      cursor: 'next-cursor',
      customer_ids: '0000,1111',
      emails: 'john@example.com,jane@example.com',
    }

    await customers.list(query)

    expect(http.get).toHaveBeenCalledWith('/customers', { params: query })
  })

  it('gets a customer by customer_id', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)

    await customers.get('0000')

    expect(http.get).toHaveBeenCalledWith('/customers/0000')
  })

  it('updates a customer by customer_id', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload: UpdateCustomerRequestPayload = {
      first_name: 'Jane',
      email: 'jane@example.com',
      devices: [{ device_type: 'android', device_token: 'new-token' }],
    }

    await customers.update('0000', payload)

    expect(http.put).toHaveBeenCalledWith('/customers/0000', payload)
  })

  it('bulk updates customers using the customers wrapper object', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload: UpdateBulkCustomerRequestPayload = {
      customers: [
        {
          customer_id: '0000',
          first_name: 'Jane',
          email: 'jane@example.com',
        },
      ],
    }

    await customers.bulkUpdate(payload)

    expect(http.put).toHaveBeenCalledWith('/customers/bulk-update', payload)
  })

  it('creates customer devices', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload = {
      devices: [{ device_type: 'ios', device_token: 'device-token' }],
    }

    await customers.createDevices('0000', payload)

    expect(http.post).toHaveBeenCalledWith('/customers/0000/devices', payload)
  })

  it('fetches customer devices', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)

    await customers.getDevices('0000')

    expect(http.get).toHaveBeenCalledWith('/customers/0000/devices')
  })

  it('updates a customer device by current device token', async () => {
    const http = createHttpMock()
    const customers = new Customers(http)
    const payload = {
      current_device_token: 'old-token',
      device_type: 'ios',
      device_token: 'new-token',
    }

    await customers.updateDevice('0000', payload)

    expect(http.patch).toHaveBeenCalledWith('/customers/0000/devices', payload)
  })
})
