import type { NextRequest } from 'next/server'

import type { Contact } from '@/libs/data/contact'

import { toNewContents } from '@/libs/microcms/webhook'
import { sendMail } from '@/libs/sendgrid/mail'
import { createHmac, timingSafeEqual } from 'crypto'
import { NextResponse } from 'next/server'

const secret = process.env.MICROCMS_WEBHOOK_SECRET || 'secret'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const signature = request.headers.get('X-MICROCMS-Signature') || request.headers.get('x-microcms-signature') || ''
  const body = await request.json()
  const expectedSignature = createHmac('sha256', secret)
    .update(typeof body === 'object' ? JSON.stringify(body) : body)
    .digest('hex')

  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const contact = toNewContents<Contact>(body as never).publishValue

  await sendMail({
    to: contact.email,
    from: 'test@local.co.jp',
    subject: 'お問い合わせいただきありがとうございます！',
    text: `${contact.name}様 お問い合わせいただきありがとうございます！`,
  })

  return NextResponse.json({ status: 200 })
}
