'use server'

import { ContactForm } from '@/libs/components/ContactForm'

export default async function HomePage() {
  return (
    <main className="p-8">
      <ContactForm />
    </main>
  )
}
