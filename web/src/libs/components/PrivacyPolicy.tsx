'use server'

import { Html } from '@/libs/components/Html'
import { getPrivacyPoricy } from '@/libs/data/privacy-policy'

export async function PrivacyPolicy() {
  const privacyPolicy = await getPrivacyPoricy()

  return <div>{privacyPolicy && <Html html={privacyPolicy.html} />}</div>
}
