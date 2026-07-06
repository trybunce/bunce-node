# Bunce Node SDK

Node SDK for the Bunce API.

## Installation

```sh
pnpm add bunce-node
```

> This package has not been published yet. Install from the repository while it is in development.

## Usage

```ts
import { Bunce } from 'bunce-node'

const bunce = new Bunce(process.env.BUNCE_API_KEY!)
```

By default, the SDK uses `https://api.bunce.so/v1`. Pass `baseURL` to target another Bunce environment:

```ts
const bunce = new Bunce(process.env.BUNCE_API_KEY!, {
  baseURL: 'https://sandbox.bunce.so',
})
```

## Customers

```ts
await bunce.customers.create({
  customer_id: '0000',
  first_name: 'John',
  last_name: 'Doe',
  email: 'johndoe@example.com',
  phone_no: '+23481999999999',
})

await bunce.customers.bulkCreate({ customers: [] })
await bunce.customers.list({ per_page: 20, emails: 'johndoe@example.com' })
await bunce.customers.get('0000')
await bunce.customers.update('0000', { first_name: 'Jane' })
await bunce.customers.bulkUpdate({ customers: [{ customer_id: '0000', first_name: 'Jane' }] })
await bunce.customers.createDevices('0000', { devices: [] })
await bunce.customers.getDevices('0000')
await bunce.customers.updateDevice('0000', {
  current_device_token: 'old-token',
  device_token: 'new-token',
})
```

## Events

```ts
const event = await bunce.events.create({
  name: 'Successful Purchase Event',
  description: 'Event to be triggered on purchase',
  parameters: [{ name: 'email', type: 'text', required: true }],
})

await bunce.events.get(event.data.data.id)
await bunce.events.list({ per_page: 20 })
await bunce.events.trigger({
  event_id: event.data.data.id,
  payload: { email: 'johndoe@example.com' },
})
await bunce.events.delete(event.data.data.id)
```

## Transactional Messaging

```ts
await bunce.messaging.createTemplate({
  subject: 'Mobile Verification Code',
  message: 'Your verification code is {{code}}',
  channel: 'sms',
})

await bunce.messaging.listTemplates({ per_page: 20 })
await bunce.messaging.getTemplate('template_id')
await bunce.messaging.sendEmail({
  sender_email: 'sender@example.com',
  sender_name: 'Bunce',
  email: 'customer@example.com',
  subject: 'Reset Password OTP',
  text: 'Your OTP is 0000',
})
await bunce.messaging.sendSms({ sender_id: 'Bunce', email: 'customer@example.com', message: 'Hi' })
await bunce.messaging.sendPushNotification({ title: 'Hi', message: 'Hello', provider: 'firebase' })
await bunce.messaging.sendWhatsapp({
  phone_no: '+2349088798657',
  whatsapp_template_id: 'template_id',
})
await bunce.messaging.list({ per_page: 20 })
await bunce.messaging.get('message_id')
```

## Segments

```ts
await bunce.segments.create({
  name: 'VIP Customers',
  description: 'High-value customers',
  add_all_customers: false,
})
await bunce.segments.list({ page: 1, per_page: 20 })
await bunce.segments.get('segment_id')
await bunce.segments.update('segment_id', { name: 'Updated VIP Customers' })
await bunce.segments.addCustomers('segment_id', { customers: [{ email: 'customer@example.com' }] })
await bunce.segments.addAllCustomers('segment_id')
await bunce.segments.removeCustomers('segment_id', { customers: ['customer_id'] })
```

## Development

```sh
corepack pnpm install
corepack pnpm format:check
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

Development builds run through `tsdown`, which requires Node.js 22.18+ even though the bundled SDK targets Node.js 20+.

This project uses:

- `oxlint` for linting.
- `oxfmt` for formatting.
- `tsdown` for library bundling and declaration generation.
