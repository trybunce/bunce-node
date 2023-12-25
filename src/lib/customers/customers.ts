import { Http } from '../bunce.interface'
import {
  CreateBulkCustomerRequestPayload,
  CreateCustomerRequestPayload,
  ICustomers,
} from './customers.interface'
import { AxiosResponse } from 'axios'

export class Customers extends Http implements ICustomers {
  async create(customer: CreateCustomerRequestPayload): Promise<AxiosResponse> {
    return await this.http.post(`/customers`, {
      customer,
    })
  }

  async bulkCreate(customers: CreateBulkCustomerRequestPayload): Promise<AxiosResponse> {
    return await this.http.post(`/customers/bulk`, {
      customers,
    })
  }
}
