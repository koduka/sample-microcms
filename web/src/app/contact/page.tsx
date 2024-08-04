'use client'

import { ContactForm } from '@/libs/components/ContactForm'
import { ReCaptchaProvider } from '@/libs/components/ReCaptchaProvider'

export default function ContactPage() {
  return (
    <ReCaptchaProvider>
      <h2 className="text-xl font-black">お問い合わせ</h2>
      <ContactForm />
    </ReCaptchaProvider>
  )
}
