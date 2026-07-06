import type { AxiosInstance } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Messaging } from './messaging'
import type {
  MessageTemplatePayload,
  TransactionalEmailPayload,
  TransactionalMessageQueryOptions,
  TransactionalPushNotificationPayload,
  TransactionalSmsPayload,
  TransactionalWhatsappPayload,
} from './messaging.interface'

describe('Messaging', () => {
  const response = {
    data: {
      data: {},
      message: 'ok',
      success: true,
    },
  }

  let http: AxiosInstance
  let post: ReturnType<typeof vi.fn>
  let get: ReturnType<typeof vi.fn>
  let messaging: Messaging

  beforeEach(() => {
    post = vi.fn().mockResolvedValue(response)
    get = vi.fn().mockResolvedValue(response)
    http = {
      post,
      get,
    } as unknown as AxiosInstance
    messaging = new Messaging(http)
  })

  it('creates a transactional message template', async () => {
    const payload: MessageTemplatePayload = {
      subject: 'Welcome',
      message: 'Hello {{first_name}}',
      channel: 'email',
    }

    await messaging.createTemplate(payload)

    expect(post).toHaveBeenCalledWith('/messaging/transactional/templates', payload)
  })

  it('lists transactional message templates with query params', async () => {
    const query: TransactionalMessageQueryOptions = {
      per_page: 25,
      cursor: 'cursor_123',
    }

    await messaging.listTemplates(query)

    expect(get).toHaveBeenCalledWith('/transactions/templates', {
      params: query,
    })
  })

  it('lists transactional message templates without query params', async () => {
    await messaging.listTemplates()

    expect(get).toHaveBeenCalledWith('/transactions/templates', {
      params: undefined,
    })
  })

  it('gets a transactional message template', async () => {
    await messaging.getTemplate('template_123')

    expect(get).toHaveBeenCalledWith('/transactions/templates/template_123')
  })

  it('sends a transactional email', async () => {
    const payload: TransactionalEmailPayload = {
      sender_email: 'sender@example.com',
      sender_name: 'Bunce',
      email: 'customer@example.com',
      message_type: 'transactional',
      subject: 'Your receipt',
      text: 'Thanks for your purchase',
      html: '<p>Thanks for your purchase</p>',
      customer_id: 'customer_123',
      template_id: 'template_123',
      email_template_id: 'email_template_123',
      variables: {
        first_name: 'Ada',
      },
      customer: {
        first_name: 'Ada',
        last_name: 'Lovelace',
        email: 'customer@example.com',
      },
    }

    await messaging.sendEmail(payload)

    expect(post).toHaveBeenCalledWith('/messaging/transactional/send/email', payload)
  })

  it('sends a transactional SMS', async () => {
    const payload: TransactionalSmsPayload = {
      sender_id: 'BUNCE',
      email: 'customer@example.com',
      customer_id: 'customer_123',
      subject: 'OTP',
      message: 'Your code is 123456',
      phone_no: '+2348012345678',
      message_type: 'transactional',
      customer: {
        first_name: 'Ada',
        phone_no: '+2348012345678',
      },
    }

    await messaging.sendSms(payload)

    expect(post).toHaveBeenCalledWith('/messaging/transactional/send/sms', payload)
  })

  it('sends a transactional push notification', async () => {
    const payload: TransactionalPushNotificationPayload = {
      title: 'Payment received',
      email: 'customer@example.com',
      customer_id: 'customer_123',
      message: 'Your payment was received',
      provider: 'firebase',
      message_type: 'transactional',
      device_token: 'device_token_123',
      device_type: 'ios',
      customer: {
        first_name: 'Ada',
        email: 'customer@example.com',
      },
    }

    await messaging.sendPushNotification(payload)

    expect(post).toHaveBeenCalledWith('/messaging/transactional/send/push-notification', payload)
  })

  it('sends a transactional WhatsApp message', async () => {
    const payload: TransactionalWhatsappPayload = {
      customer_id: 'customer_123',
      phone_no: '+2348012345678',
      whatsapp_template_id: 'whatsapp_template_123',
      message: 'Your order has shipped',
      message_type: 'transactional',
      customer: {
        first_name: 'Ada',
        phone_no: '+2348012345678',
      },
    }

    await messaging.sendWhatsapp(payload)

    expect(post).toHaveBeenCalledWith('/messaging/transactional/send/whatsapp', payload)
  })

  it('lists transactional messages with query params', async () => {
    const query: TransactionalMessageQueryOptions = {
      per_page: 25,
      cursor: 'cursor_123',
    }

    await messaging.list(query)

    expect(get).toHaveBeenCalledWith('/messaging/transactional', {
      params: query,
    })
  })

  it('lists transactional messages without query params', async () => {
    await messaging.list()

    expect(get).toHaveBeenCalledWith('/messaging/transactional', {
      params: undefined,
    })
  })

  it('gets a transactional message', async () => {
    await messaging.get('message_123')

    expect(get).toHaveBeenCalledWith('/messaging/transactional/message_123')
  })
})
