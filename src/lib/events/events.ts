import type { AxiosResponse } from 'axios'
import { Http } from '../bunce.interface'
import type {
  CreateEventRequestPayload,
  DeleteEventRequestPayload,
  EventPayload,
  IEvents,
  ListEventsQuery,
  ListResponsePayload,
  ResponsePayload,
  TriggerEventRequestPayload,
  TriggerEventResponseData,
} from './events.interface'

export class Events extends Http implements IEvents {
  async create(
    payload: CreateEventRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<EventPayload>>> {
    return await this.http.post('/events', payload)
  }

  async get(eventId: string): Promise<AxiosResponse<ResponsePayload<EventPayload>>> {
    return await this.http.get(`/events/${eventId}`)
  }

  async list(query?: ListEventsQuery): Promise<AxiosResponse<ListResponsePayload<EventPayload>>> {
    return await this.http.get('/events', query ? { params: query } : undefined)
  }

  async trigger(
    payload: TriggerEventRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<TriggerEventResponseData>>> {
    return await this.http.post('/events/trigger', payload)
  }

  async delete(
    payload: DeleteEventRequestPayload | string,
  ): Promise<AxiosResponse<ResponsePayload<boolean>>> {
    const deletePayload = typeof payload === 'string' ? { event_id: payload } : payload

    return await this.http.delete('/events', { data: deletePayload })
  }
}
