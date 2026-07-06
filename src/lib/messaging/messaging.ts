import type { AxiosResponse } from 'axios'
import { Http } from '../bunce.interface'
import type {
  IMessaging,
  ListResponsePayload,
  MessageTemplate,
  MessageTemplatePayload,
  ResponsePayload,
  TransactionalEmailPayload,
  SendTransactionalMessageResponsePayload,
  TransactionalMessagePayload,
  TransactionalMessageQueryOptions,
  TransactionalPushNotificationPayload,
  TransactionalSmsPayload,
  TransactionalWhatsappPayload,
} from './messaging.interface'

export class Messaging extends Http implements IMessaging {
  async createTemplate(
    payload: MessageTemplatePayload,
  ): Promise<AxiosResponse<ResponsePayload<MessageTemplate>>> {
    return await this.http.post('/messaging/transactional/templates', payload)
  }

  async listTemplates(
    query?: TransactionalMessageQueryOptions,
  ): Promise<AxiosResponse<ListResponsePayload<MessageTemplate>>> {
    return await this.http.get('/transactions/templates', { params: query })
  }

  async getTemplate(templateId: string): Promise<AxiosResponse<ResponsePayload<MessageTemplate>>> {
    return await this.http.get(`/transactions/templates/${templateId}`)
  }

  async sendEmail(
    payload: TransactionalEmailPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>> {
    return await this.http.post('/messaging/transactional/send/email', payload)
  }

  async sendSms(
    payload: TransactionalSmsPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>> {
    return await this.http.post('/messaging/transactional/send/sms', payload)
  }

  async sendPushNotification(
    payload: TransactionalPushNotificationPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>> {
    return await this.http.post('/messaging/transactional/send/push-notification', payload)
  }

  async sendWhatsapp(
    payload: TransactionalWhatsappPayload,
  ): Promise<AxiosResponse<SendTransactionalMessageResponsePayload>> {
    return await this.http.post('/messaging/transactional/send/whatsapp', payload)
  }

  async list(
    query?: TransactionalMessageQueryOptions,
  ): Promise<AxiosResponse<ListResponsePayload<TransactionalMessagePayload>>> {
    return await this.http.get('/messaging/transactional', { params: query })
  }

  async get(
    messageId: string,
  ): Promise<AxiosResponse<ResponsePayload<TransactionalMessagePayload>>> {
    return await this.http.get(`/messaging/transactional/${messageId}`)
  }
}
