import { AxiosResponse } from 'axios'
export interface CreateCustomerRequestPayload {
  first_name: string
  last_name: string
  email: string
  phone_no: string
}

export type CreateBulkCustomerRequestPayload = CreateCustomerRequestPayload[]

export interface ICustomers {
  create(data: CreateCustomerRequestPayload): Promise<AxiosResponse>
}
