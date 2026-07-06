import axios, { type AxiosInstance } from 'axios'
import { describe, expect, it, vi } from 'vitest'
import { Bunce } from './bunce'
import { Customers } from './customers/customers'
import { Events } from './events/events'
import { Messaging } from './messaging/messaging'
import { Segments } from './segments/segments'

function createHttpMock() {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as AxiosInstance
}

describe('Bunce', () => {
  it('exposes all implemented API resources', () => {
    const sdk = new Bunce('sk_test', { httpClient: createHttpMock() })

    expect(sdk.customers).toBeInstanceOf(Customers)
    expect(sdk.events).toBeInstanceOf(Events)
    expect(sdk.messaging).toBeInstanceOf(Messaging)
    expect(sdk.segments).toBeInstanceOf(Segments)
  })

  it('does not append the API version when a custom baseURL already includes a version', () => {
    const http = createHttpMock()
    const create = vi.spyOn(axios, 'create').mockReturnValue(http)

    new Bunce('sk_test', { baseURL: 'http://localhost:3000/v1' })

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'http://localhost:3000/v1',
      }),
    )

    create.mockRestore()
  })

  it('uses v1 paths with the injected HTTP client resources', async () => {
    const http = createHttpMock()
    const sdk = new Bunce('sk_test', { httpClient: http })

    await sdk.events.get('event_123')
    await sdk.messaging.get('message_123')
    await sdk.segments.get('segment_123')

    expect(http.get).toHaveBeenCalledWith('/events/event_123')
    expect(http.get).toHaveBeenCalledWith('/messaging/transactional/message_123')
    expect(http.get).toHaveBeenCalledWith('/segments/segment_123')
  })
})
