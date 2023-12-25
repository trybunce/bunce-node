import type { AxiosInstance } from 'axios'

export interface IConfig {
  baseURL?: string
  httpClient?: AxiosInstance
  timeout?: number
}

export abstract class Http {
  protected readonly http: AxiosInstance

  constructor(http: AxiosInstance) {
    this.http = http
  }
}
