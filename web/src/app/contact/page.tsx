'use server'

import { ContactForm } from '@/libs/components/ContactForm'

export default async function ContactPage() {
  return (
    <main className="space-y-8 p-8 px-96">
      <h2 className="text-xl font-black">お問い合わせ</h2>
      <ContactForm />
    </main>
  )
}
