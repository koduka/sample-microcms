import validator from 'validator'
import { z } from 'zod'

export const createContactFormSchema = z.object({
  name: z.string().min(1, '名前を入力してください。'),
  company: z.string(),
  department: z.string(),
  phoneNumber: z
    .string()
    .min(1, '電話番号を入力してください。')
    .refine(
      (value) => validator.isMobilePhone(value, 'ja-JP'),
      '無効な電話番号の形式です。正しい形式で入力してください。',
    ),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください。')
    .email('無効なメールアドレス形式です。正しい形式で入力してください。'),
  content: z.string().min(1, 'お問い合わせ内容を入力してください。'),
  isAgreePrivacyPolicy: z
    .string()
    .nullable()
    .transform((value) => value === 'on')
    .refine((value) => value === true, '個人情報保護方針に同意するに同意してください。'),
})
