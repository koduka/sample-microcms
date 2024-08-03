'use server'

import type { Content, Page, SearchQueries } from '@/libs/microcms/client'

import { createContent, searchContents } from '@/libs/microcms/client'

export type Contact = {
  name: string
  company?: string
  department?: string
  phoneNumber: string
  email: string
  content: string
  isAgreePrivacyPolicy: true
}

export type ContactContent = Content<Contact>
export type ContactPage = Page<Contact>

const ENDPOINT = 'contacts'

export async function createContact(contact: Contact) {
  return await createContent(ENDPOINT, contact)
}

export async function searchContacts(queries?: SearchQueries): Promise<ContactPage> {
  return await searchContents<Contact>(ENDPOINT, queries)
}
