import EventEmitter from 'node:events'
import axios, { type AxiosInstance } from 'axios'
import type { IConfig } from './bunce.interface'
import { Customers } from './customers/customers'
import { Events } from './events/events'
import { Messaging } from './messaging/messaging'
import { Segments } from './segments/segments'

export const SDKVersion = '0.0.1'

export class Bunce extends EventEmitter {
  private readonly apiKey?: string
  private readonly http: AxiosInstance
  readonly customers: Customers
  readonly events: Events
  readonly messaging: Messaging
  readonly segments: Segments

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
    this.events = new Events(this.http)
    this.messaging = new Messaging(this.http)
    this.segments = new Segments(this.http)
  }

  private buildBaseUrl(config?: IConfig): string {
    const version = 'v1'

    if (!config?.baseURL) {
      return `https://api.bunce.so/${version}`
    }

    return /\/v\d+(?:\/)?$/.test(config.baseURL) ? config.baseURL : `${config.baseURL}/${version}`
  }
}
