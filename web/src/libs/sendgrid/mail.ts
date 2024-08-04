import mail from '@sendgrid/mail'

type SendMail = {
  to: string
  from: string
  subject: string
  text: string
}

mail.setApiKey(process.env.SENDGRID_API_KEY || 'SG.local')

if (process.env.NODE_ENV !== 'production') {
  const { default: client } = await import('@sendgrid/client')
  client.setDefaultRequest('baseUrl', 'http://sendgrid:3030/')
  mail.setClient(client)
}

export async function sendMail({ to, from, subject, text }: SendMail) {
  if (process.env.NODE_ENV !== 'production') {
    await mail.send({
      to,
      from,
      subject,
      text,
    })
  }
}
