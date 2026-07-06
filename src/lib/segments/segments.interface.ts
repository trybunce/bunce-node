import type { AxiosResponse } from 'axios'

export interface CreateSegmentRequestPayload {
  name: string
  description?: string | null
  add_all_customers?: boolean | null
}

export interface SegmentQueryOptions {
  page?: number
  per_page?: number
}

export interface UpdateSegmentRequestPayload {
  name?: string | null
  description?: string | null
}

export interface SegmentCustomerDevicePayload {
  device_type: string
  device_token: string
}

export interface SegmentCustomerPayload {
  customer_id?: string
  email?: string
  first_name?: string
  last_name?: string
  phone_no?: string
  devices?: SegmentCustomerDevicePayload[]
}

export interface AddSegmentCustomersRequestPayload {
  customers: SegmentCustomerPayload[]
}

export interface RemoveSegmentCustomersRequestPayload {
  customers: string[]
}

export interface SegmentPayload {
  id: string
  name: string
  description: string | null
  conditions: unknown | null
  type: 'automatic' | 'manual' | string
  all_customers: number | boolean
  customers_count?: number
  created_at: string | null
  updated_at?: string | null
}

export interface ResponsePayload<T = unknown> {
  data: T
  message: string
  success: boolean
}

export type SegmentResponsePayload = ResponsePayload<SegmentPayload>
export type SegmentsResponsePayload = ResponsePayload<SegmentPayload[]>
export type SegmentMutationResponsePayload = ResponsePayload<null>

export interface ISegments {
  create(segment: CreateSegmentRequestPayload): Promise<AxiosResponse<SegmentResponsePayload>>
  list(query?: SegmentQueryOptions): Promise<AxiosResponse<SegmentsResponsePayload>>
  get(segmentId: string): Promise<AxiosResponse<SegmentResponsePayload>>
  update(
    segmentId: string,
    segment: UpdateSegmentRequestPayload,
  ): Promise<AxiosResponse<SegmentResponsePayload>>
  addCustomers(
    segmentId: string,
    payload: AddSegmentCustomersRequestPayload,
  ): Promise<AxiosResponse<SegmentMutationResponsePayload>>
  addAllCustomers(segmentId: string): Promise<AxiosResponse<SegmentMutationResponsePayload>>
  removeCustomers(
    segmentId: string,
    payload: RemoveSegmentCustomersRequestPayload,
  ): Promise<AxiosResponse<SegmentMutationResponsePayload>>
}
