import type { AxiosResponse } from 'axios'
import { Http } from '../bunce.interface'
import type {
  CreateBulkCustomerRequestPayload,
  CreateCustomerRequestPayload,
  CustomerPayload,
  CustomerQueryOptions,
  CustomersResponsePayload,
  ICustomers,
  ResponsePayload,
  UpdateCustomerRequestPayload,
} from './customers.interface'

export class Customers extends Http implements ICustomers {
  async create(
    customer: CreateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>> {
    return await this.http.post(`/customers`, customer)
  }

  async bulkCreate(
    customers: CreateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>> {
    return await this.http.post(`/customers/bulk`, customers)
  }

  async update(
    email: string,
    customer: UpdateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload>> {
    return await this.http.put(`/customers/${email}`, customer)
  }

  async find(email: string): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>> {
    return await this.http.get(`/customer/${email}`)
  }

  async all(
    params?: CustomerQueryOptions,
  ): Promise<AxiosResponse<ResponsePayload<CustomersResponsePayload>>> {
    return await this.http.get(`/customers`, {
      params: params ?? {
        page: 1,
      },
    })
  }
}
