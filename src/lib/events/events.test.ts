import type { AxiosInstance } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Events } from './events'
import type {
  CreateEventRequestPayload,
  DeleteEventRequestPayload,
  ListEventsQuery,
  TriggerEventRequestPayload,
} from './events.interface'

type FakeHttp = Pick<AxiosInstance, 'post' | 'get' | 'delete'>

const createFakeHttp = (): FakeHttp => ({
  post: vi.fn(),
  get: vi.fn(),
  delete: vi.fn(),
})

describe('Events', () => {
  let http: FakeHttp
  let events: Events

  beforeEach(() => {
    http = createFakeHttp()
    events = new Events(http as AxiosInstance)
  })

  it('posts the event payload to create an event', async () => {
    const payload: CreateEventRequestPayload = {
      name: 'subscription_started',
      description: 'A customer started a subscription',
      parameters: [
        {
          name: 'plan',
          type: 'string',
          required: true,
        },
      ],
    }
    const response = { data: { success: true, message: 'created', data: { id: 'evt_123' } } }
    vi.mocked(http.post).mockResolvedValue(response)

    await expect(events.create(payload)).resolves.toBe(response)

    expect(http.post).toHaveBeenCalledTimes(1)
    expect(http.post).toHaveBeenCalledWith('/events', payload)
  })

  it('gets an event by id', async () => {
    const response = { data: { success: true, message: 'found', data: { id: 'evt_123' } } }
    vi.mocked(http.get).mockResolvedValue(response)

    await expect(events.get('evt_123')).resolves.toBe(response)

    expect(http.get).toHaveBeenCalledTimes(1)
    expect(http.get).toHaveBeenCalledWith('/events/evt_123')
  })

  it('lists events with cursor pagination query params', async () => {
    const query: ListEventsQuery = {
      per_page: 25,
      cursor: 'cursor_123',
    }
    const response = {
      data: {
        success: true,
        message: 'listed',
        data: [{ id: 'evt_123' }],
        meta: { cursor: 'cursor_456' },
      },
    }
    vi.mocked(http.get).mockResolvedValue(response)

    await expect(events.list(query)).resolves.toBe(response)

    expect(http.get).toHaveBeenCalledTimes(1)
    expect(http.get).toHaveBeenCalledWith('/events', { params: query })
  })

  it('triggers an event with payload data', async () => {
    const payload: TriggerEventRequestPayload = {
      event_id: 'evt_123',
      payload: {
        customer: {
          email: 'customer@example.com',
        },
        plan: 'pro',
      },
    }
    const response = { data: { success: true, message: 'triggered', data: true } }
    vi.mocked(http.post).mockResolvedValue(response)

    await expect(events.trigger(payload)).resolves.toBe(response)

    expect(http.post).toHaveBeenCalledTimes(1)
    expect(http.post).toHaveBeenCalledWith('/events/trigger', payload)
  })

  it('deletes an event by sending event_id in the axios DELETE config body', async () => {
    const response = { data: { success: true, message: 'deleted', data: true } }
    vi.mocked(http.delete).mockResolvedValue(response)

    await expect(events.delete('evt_123')).resolves.toBe(response)

    expect(http.delete).toHaveBeenCalledTimes(1)
    expect(http.delete).toHaveBeenCalledWith('/events', { data: { event_id: 'evt_123' } })
  })

  it('deletes an event from a delete payload object', async () => {
    const payload: DeleteEventRequestPayload = { event_id: 'evt_123' }
    const response = { data: { success: true, message: 'deleted', data: true } }
    vi.mocked(http.delete).mockResolvedValue(response)

    await expect(events.delete(payload)).resolves.toBe(response)

    expect(http.delete).toHaveBeenCalledTimes(1)
    expect(http.delete).toHaveBeenCalledWith('/events', { data: payload })
  })
})
