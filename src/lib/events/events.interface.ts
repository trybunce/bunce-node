import type { AxiosResponse } from 'axios'

export interface EventParameter {
  name: string
  type: string
  required: boolean
}

export interface EventPayload {
  id: string
  company_id?: string
  name: string
  description: string
  parameters: EventParameter[]
  created_at?: string | null
  updated_at?: string | null
}

export interface ListEventsQuery {
  per_page?: number
  cursor?: string
}

export interface CreateEventRequestPayload {
  name: string
  description: string
  parameters: EventParameter[]
}

export interface TriggerEventRequestPayload {
  event_id: string
  payload: Record<string, unknown>
}

export interface DeleteEventRequestPayload {
  event_id: string
}

export interface CursorMetaPayload {
  has_next_page: boolean
  has_prev_page: boolean
  next_page_cursor: string | null
  prev_page_cursor: string | null
  per_page: number
}

export interface ResponsePayload<T = unknown> {
  data: T
  message: string
  success: boolean
}

export interface ListResponsePayload<T> extends ResponsePayload<T[]> {
  meta: CursorMetaPayload
}

export type TriggerEventResponseData = boolean | null | Record<string, unknown> | unknown[]

export interface IEvents {
  create(payload: CreateEventRequestPayload): Promise<AxiosResponse<ResponsePayload<EventPayload>>>
  get(eventId: string): Promise<AxiosResponse<ResponsePayload<EventPayload>>>
  list(query?: ListEventsQuery): Promise<AxiosResponse<ListResponsePayload<EventPayload>>>
  trigger(
    payload: TriggerEventRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<TriggerEventResponseData>>>
  delete(
    payload: DeleteEventRequestPayload | string,
  ): Promise<AxiosResponse<ResponsePayload<boolean>>>
}
