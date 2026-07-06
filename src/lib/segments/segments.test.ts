import type { AxiosInstance, AxiosResponse } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Segments } from './segments'

describe('Segments', () => {
  let http: {
    post: ReturnType<typeof vi.fn>
    get: ReturnType<typeof vi.fn>
    patch: ReturnType<typeof vi.fn>
    delete: ReturnType<typeof vi.fn>
  }
  let segments: Segments

  const response = {
    data: {
      data: null,
      message: 'ok',
      success: true,
    },
  } as AxiosResponse

  beforeEach(() => {
    http = {
      post: vi.fn().mockResolvedValue(response),
      get: vi.fn().mockResolvedValue(response),
      patch: vi.fn().mockResolvedValue(response),
      delete: vi.fn().mockResolvedValue(response),
    }
    segments = new Segments(http as unknown as AxiosInstance)
  })

  it('creates a segment with the requested payload', async () => {
    const payload = {
      name: 'VIP Customers',
      description: 'High-value customers',
      add_all_customers: false,
    }

    const result = await segments.create(payload)

    expect(result).toBe(response)
    expect(http.post).toHaveBeenCalledWith('/segments', payload)
  })

  it('lists segments with query params', async () => {
    const query = { page: 2, per_page: 25 }

    const result = await segments.list(query)

    expect(result).toBe(response)
    expect(http.get).toHaveBeenCalledWith('/segments', { params: query })
  })

  it('gets a segment by id', async () => {
    const result = await segments.get('segment_123')

    expect(result).toBe(response)
    expect(http.get).toHaveBeenCalledWith('/segments/segment_123')
  })

  it('updates a segment with the requested payload', async () => {
    const payload = { name: 'Updated VIP', description: null }

    const result = await segments.update('segment_123', payload)

    expect(result).toBe(response)
    expect(http.patch).toHaveBeenCalledWith('/segments/segment_123', payload)
  })

  it('adds customers to a segment with the requested payload', async () => {
    const payload = {
      customers: [
        {
          customer_id: 'customer_123',
          email: 'ada@example.com',
          first_name: 'Ada',
          last_name: 'Lovelace',
          phone_no: '+2348000000000',
          devices: [
            {
              device_type: 'ios',
              device_token: 'device-token-123',
            },
          ],
        },
      ],
    }

    const result = await segments.addCustomers('segment_123', payload)

    expect(result).toBe(response)
    expect(http.post).toHaveBeenCalledWith('/segments/segment_123/customers', payload)
  })

  it('adds all customers to a segment with an empty request body', async () => {
    const result = await segments.addAllCustomers('segment_123')

    expect(result).toBe(response)
    expect(http.post).toHaveBeenCalledWith('/segments/segment_123/all-customers', {})
  })

  it('removes customers from a segment with the payload in the delete config data field', async () => {
    const payload = { customers: ['customer_123', 'customer_456'] }

    const result = await segments.removeCustomers('segment_123', payload)

    expect(result).toBe(response)
    expect(http.delete).toHaveBeenCalledWith('/segments/segment_123/customers', {
      data: payload,
    })
  })
})
