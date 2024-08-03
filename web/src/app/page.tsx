'use client'

import { ContactTable } from '@/libs/components/ContactTable'
import { Button } from '@/libs/components/ui/button'
import { useRouter } from 'next/navigation'
import { MdContactSupport, MdOutlinePrivacyTip } from 'react-icons/md'

export default function HomePage() {
  const router = useRouter()

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 space-x-2" onClick={() => router.push('/contact')}>
          <MdContactSupport className="size-6" />
          <span className="text-lg">お問い合わせフォーム</span>
        </Button>
        <Button variant="outline" onClick={() => router.push('/privacy-policy')} className="h-16 space-x-2">
          <MdOutlinePrivacyTip className="size-6" />
          <span className="text-lg">個人情報保護方針</span>
        </Button>
      </div>
      <ContactTable />
    </>
  )
}
