import EventEmitter from 'node:events'
import axios, { AxiosInstance } from 'axios'
import { IConfig } from './bunce.interface'
import { Customers } from './customers/customers'

export const SDKVersion = '0.0.1'

export class Bunce extends EventEmitter {
  private readonly apiKey?: string
  private readonly http: AxiosInstance
  readonly customers: Customers

  constructor(apiKey: string, config?: IConfig) {
    super()
    this.apiKey = apiKey
    this.http =
      config?.httpClient ??
      axios.create({
        baseURL: this.buildBaseUrl(config),
        headers: {
          'X-Authorization': this.apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        timeout: config?.timeout,
      })

    this.customers = new Customers(this.http)
  }

  private buildBaseUrl(config?: IConfig): string {
    const version = 'v1'

    if (!config?.baseURL) {
      return `https://api.bunce.so/${version}`
    }

    return config?.baseURL.includes('bunce.so/v')
      ? config?.baseURL
      : config?.baseURL + `/${version}`
  }
}
