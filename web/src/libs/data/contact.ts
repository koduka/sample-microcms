'use server'

import { createContent } from '@/libs/microcms/client'

export type Contact = {
  name: string
  company?: string
  department?: string
  phoneNumber: string
  email: string
  content: string
  isAgreePrivacyPolicy: true
}

const ENDPOINT = 'contacts'

export async function createContact(contact: Contact) {
  return await createContent(ENDPOINT, contact)
}
