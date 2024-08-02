import { PrivacyPolicy } from '@/libs/components/PrivacyPolicy'
import { Card, CardContent } from '@/libs/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <>
      <h2 className="text-xl font-black">個人情報保護方針の内容</h2>
      <Card className="pt-8">
        <CardContent>
          <PrivacyPolicy />
        </CardContent>
      </Card>
    </>
  )
}
