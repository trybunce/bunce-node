import type { AxiosResponse } from 'axios'
import { Http } from '../bunce.interface'
import type {
  CreateBulkCustomerRequestPayload,
  CreateCustomerDevicesRequestPayload,
  CreateCustomerRequestPayload,
  CustomerDevicePayload,
  CustomerPayload,
  CustomerQueryOptions,
  CustomersResponsePayload,
  ICustomers,
  ResponsePayload,
  UpdateBulkCustomerRequestPayload,
  UpdateCustomerDeviceRequestPayload,
  UpdateCustomerRequestPayload,
} from './customers.interface'

export class Customers extends Http implements ICustomers {
  async create(
    customer: CreateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>> {
    return await this.http.post('/customers', customer)
  }

  async bulkCreate(
    customers: CreateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>> {
    return await this.http.post('/customers/bulk', customers)
  }

  async list(
    params?: CustomerQueryOptions,
  ): Promise<AxiosResponse<ResponsePayload<CustomersResponsePayload>>> {
    return await this.http.get('/customers', { params })
  }

  async get(customerId: string): Promise<AxiosResponse<ResponsePayload<CustomerPayload>>> {
    return await this.http.get(`/customers/${customerId}`)
  }

  async update(
    customerId: string,
    customer: UpdateCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload>> {
    return await this.http.put(`/customers/${customerId}`, customer)
  }

  async bulkUpdate(
    customers: UpdateBulkCustomerRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerPayload[]>>> {
    return await this.http.put('/customers/bulk-update', customers)
  }

  async createDevices(
    customerId: string,
    payload: CreateCustomerDevicesRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload[]>>> {
    return await this.http.post(`/customers/${customerId}/devices`, payload)
  }

  async getDevices(
    customerId: string,
  ): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload[]>>> {
    return await this.http.get(`/customers/${customerId}/devices`)
  }

  async updateDevice(
    customerId: string,
    payload: UpdateCustomerDeviceRequestPayload,
  ): Promise<AxiosResponse<ResponsePayload<CustomerDevicePayload>>> {
    return await this.http.patch(`/customers/${customerId}/devices`, payload)
  }
}
