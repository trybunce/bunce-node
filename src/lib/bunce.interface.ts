import type { AxiosInstance } from 'axios'

export interface IConfig {
  baseURL?: string
  httpClient?: AxiosInstance
  timeout?: number
}
