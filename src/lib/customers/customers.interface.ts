import type { AxiosResponse } from 'axios'
export interface CreateCustomerRequestPayload {
  first_name: string
  last_name: string
  email: string
  phone_no: string
}

export type CreateBulkCustomerRequestPayload = CreateCustomerRequestPayload[]

export interface UpdateCustomerRequestPayload {
  first_name?: string
  last_name?: string
  phone_no?: string
}

export interface CustomerQueryOptions {
  page?: number
  per_page?: number
  query?: string
}

export interface CustomerPayload {
  id: string
  first_name: string | null
  last_name: string | null
  email: string
  phone_no: string | null
  providers?: string | null
  customer_created_at?: string | null | Date
  updated_at?: string | null | Date
  last_interaction?: string | null | Date
}

export interface CustomersResponsePayload {
  data: CustomerPayload[]
  meta: {
    per_page: number
    total_pages?: number
    total: number
  }
}

export interface ResponsePayload<T = any> {
  data: T
  message: string
  success: boolean
}

export interface ICustomers {
  create(
    customer: CreateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>>
  find(email: string): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>>
  bulkCreate(
    customers: CreateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>>
  update(
    email: string,
    customer: UpdateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload>>
  all(
    query?: CustomerQueryOptions,
  ): Promise<AxiosResponse<ResponsePayload<CustomersResponsePayload>>>
}
