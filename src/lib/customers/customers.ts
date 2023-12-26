import { Http } from '../bunce.interface'
import type {
  CreateBulkCustomerRequestPayload,
  CreateCustomerRequestPayload,
  CustomerQueryOptions,
  CustomersResponsePayload,
  ICustomers,
  UpdateCustomerRequestPayload,
} from './customers.interface'
import type { AxiosResponse } from 'axios'

export class Customers extends Http implements ICustomers {
  async create(customer: CreateCustomerRequestPayload): Promise<AxiosResponse> {
    return await this.http.post(`/customers`, customer)
  }

  async bulkCreate(customers: CreateBulkCustomerRequestPayload): Promise<AxiosResponse> {
    return await this.http.post(`/customers/bulk`, customers)
  }

  async update(email: string, customer: UpdateCustomerRequestPayload): Promise<AxiosResponse> {
    return await this.http.put(`/customers/${email}`, customer)
  }

  async all(params?: CustomerQueryOptions): Promise<AxiosResponse<CustomersResponsePayload>> {
    const toQuery = Object.keys(params ?? {})
      .map((key) => `${key}=${(params as any)[key]}`)
      .join('&')

    return await this.http.get(`/customers?${toQuery}`)
  }
}
