import { getContent } from '@/libs/microcms/client'

type PrivacyPolicy = {
  html: string
}

const ENDPOINT = 'privacy-policy'

export async function getPrivacyPoricy() {
  return await getContent<PrivacyPolicy>(ENDPOINT)
}
