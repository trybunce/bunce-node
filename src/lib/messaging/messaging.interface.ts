import type { AxiosResponse } from 'axios'

export type MessageTemplateChannel = 'email' | 'sms' | string
export type TransactionalMessageChannel =
  | 'email'
  | 'sms'
  | 'push-notification'
  | 'whatsapp'
  | string

export interface MessageTemplatePayload {
  subject: string
  message: string
  channel: MessageTemplateChannel
}

export interface MessageTemplate extends MessageTemplatePayload {
  id: string
  created_at?: string | null
  updated_at?: string | null
}

export interface TransactionalCustomerDevicePayload {
  device_type: string
  device_token: string
}

export interface TransactionalCustomerPayload {
  customer_id?: string
  first_name?: string
  last_name?: string
  email?: string
  phone_no?: string
  devices?: TransactionalCustomerDevicePayload[]
  [key: string]: unknown
}

export interface TransactionalMessagePayload {
  id: string
  channel: TransactionalMessageChannel
  subject: string | null
  title: string | null
  message: string | null
  message_type: string | null
  created_at: string | null
  total_sent: number
  total_delivered: number
  total_failed: number
  total_complained: number
  total_bounced: number
}

export interface TransactionalEmailPayload {
  sender_email?: string
  sender_name?: string
  email?: string
  message_type?: string
  subject?: string
  text?: string
  html?: string
  customer_id?: string
  template_id?: string
  email_template_id?: string
  variables?: Record<string, unknown>
  customer?: TransactionalCustomerPayload
}

export interface TransactionalSmsPayload {
  sender_id?: string
  email?: string
  customer_id?: string
  subject?: string
  message?: string
  phone_no?: string
  message_type?: string
  customer?: TransactionalCustomerPayload
}

export interface TransactionalPushNotificationPayload {
  title?: string
  email?: string
  customer_id?: string
  message?: string
  provider?: 'firebase' | string
  message_type?: string
  device_token?: string
  device_type?: string
  customer?: TransactionalCustomerPayload
}

export interface TransactionalWhatsappPayload {
  customer_id?: string
  phone_no?: string
  whatsapp_template_id: string
  message?: string
  message_type?: string
  customer?: TransactionalCustomerPayload
}

export interface TransactionalMessageQueryOptions {
  per_page?: number
  cursor?: string
}

export interface CursorMetaPayload {
  has_next_page: boolean
  has_prev_page: boolean
  next_page_cursor: string | null
  prev_page_cursor: string | null
  per_page: number
}

export interface ResponsePayload<T = unknown> {
  data: T
  message: string
  success: boolean
}

export interface ListResponsePayload<T> extends ResponsePayload<T[]> {
  meta: CursorMetaPayload
}

export type SendTransactionalMessageResponsePayload = ResponsePayload<null>

export interface IMessaging {
  createTemplate(
    payload: MessageTemplatePayload,
  ): Promise<AxiosResponse<ResponsePayload<MessageTemplate>>>
  listTemplates(
    query?: TransactionalMessageQueryOptions,
  ): Promise<AxiosResponse<ListResponsePayload<MessageTemplate>>>
  getTemplate(templateId: string): Promise<AxiosResponse<ResponsePayload<MessageTemplate>>>
  sendEmail(
    payload: TransactionalEmailPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>>
  sendSms(
    payload: TransactionalSmsPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>>
  sendPushNotification(
    payload: TransactionalPushNotificationPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>>
  sendWhatsapp(
    payload: TransactionalWhatsappPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>>
  list(
    query?: TransactionalMessageQueryOptions,
  ): Promise<AxiosResponse<ListResponsePayload<TransactionalMessagePayload>>>
  get(messageId: string): Promise<AxiosResponse<ResponsePayload<TransactionalMessagePayload>>>
}
