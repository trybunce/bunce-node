import type { AxiosResponse } from 'axios'

export type CustomerDeviceType = 'ios' | 'android' | string

export interface CustomerDeviceRequestPayload {
  device_type: CustomerDeviceType
  device_token: string
}

export interface CustomerDevicePayload {
  device_id: string
  device_type: CustomerDeviceType
  token: string
  created_at: string
}

export interface CreateCustomerRequestPayload {
  customer_id: string
  email: string
  first_name: string
  last_name: string
  phone_no: string
  devices?: CustomerDeviceRequestPayload[] | null
}

export interface CreateBulkCustomerRequestPayload {
  customers: CreateCustomerRequestPayload[]
}

export interface UpdateCustomerRequestPayload {
  email?: string
  first_name?: string
  last_name?: string
  phone_no?: string
  devices?: CustomerDeviceRequestPayload[] | null
}

export interface UpdateBulkCustomerPayload extends UpdateCustomerRequestPayload {
  customer_id: string
}

export interface UpdateBulkCustomerRequestPayload {
  customers: UpdateBulkCustomerPayload[]
}

export interface CustomerQueryOptions {
  per_page?: number
  cursor?: string
  customer_ids?: string
  emails?: string
}

export interface CreateCustomerDevicesRequestPayload {
  devices: CustomerDeviceRequestPayload[]
}

export interface UpdateCustomerDeviceRequestPayload {
  current_device_token: string
  device_type?: CustomerDeviceType | null
  device_token?: string | null
}

export interface CustomerPayload {
  customer_id: string
  first_name: string | null
  last_name: string | null
  email: string
  phone_no: string | null
  providers?: string | null
  customer_created_at?: string | null
  updated_at?: string | null
  last_interaction?: string | null
  devices?: CustomerDevicePayload[]
}

export interface CursorMetaPayload {
  has_next_page: boolean
  has_prev_page: boolean
  next_page_cursor: string | null
  prev_page_cursor: string | null
  per_page: number
}

export interface CustomersResponsePayload {
  data: CustomerPayload[]
  meta: CursorMetaPayload
}

export interface ResponsePayload<T = unknown> {
  data: T
  message: string
  success: boolean
}

export interface ICustomers {
  create(
    customer: CreateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>>
  bulkCreate(
    customers: CreateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>>
  list(
    query?: CustomerQueryOptions,
  ): Promise<AxiosResponse<ResponsePayload<CustomersResponsePayload>>>
  get(customerId: string): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>>
  update(
    customerId: string,
    customer: UpdateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload>>
  bulkUpdate(
    customers: UpdateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>>
  createDevices(
    customerId: string,
    payload: CreateCustomerDevicesRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload[]>>>
  getDevices(customerId: string): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload[]>>>
  updateDevice(
    customerId: string,
    payload: UpdateCustomerDeviceRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload>>>
}
