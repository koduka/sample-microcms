import type { ReactNode } from 'react'

import { createContext, useContext } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'

type ReCaptchaContextValue = {
  token?: string
  executeRecaptcha: (action?: string) => Promise<string>
}

type Props = {
  children: ReactNode
}
const REACPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY!

const ReCaptchaContext = createContext<ReCaptchaContextValue>({
  executeRecaptcha: () => Promise.reject(new Error('親コンポーネントのツリー内にReCaptchaProviderが見当たりません。')),
})
export const useReCapcha = () => useContext(ReCaptchaContext)

function InnerReCaptchaProvider({ children }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const value = {
    executeRecaptcha: executeRecaptcha ?? (() => Promise.reject(new Error('executeRecaptchaが見当たりません。'))),
  }

  return <ReCaptchaContext.Provider value={value}>{children}</ReCaptchaContext.Provider>
}

export function ReCaptchaProvider({ children }: Props) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={REACPTCHA_KEY} language="ja">
      <InnerReCaptchaProvider>{children}</InnerReCaptchaProvider>
    </GoogleReCaptchaProvider>
  )
}
