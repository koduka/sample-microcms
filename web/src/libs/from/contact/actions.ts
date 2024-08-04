'use server'

import type { FormState } from '@/libs/from/state'
import type { z } from 'zod'

import { createContact as _createContact } from '@/libs/data/contact'
import { createContactFormSchema } from '@/libs/from/contact/schema'
import { siteverify } from '@/libs/recaptcha'

export type CreateContactState = FormState<z.infer<typeof createContactFormSchema>>

export async function createContact(formData: FormData, reCaptchaToken: string): Promise<CreateContactState> {
  const result = await siteverify(reCaptchaToken)
  if (!result.success) {
    return {
      status: 'error',
      message: 'Google reCAPTCHAの検証に失敗しました。もう一度お試しください。',
    }
  }

  const validatedFields = createContactFormSchema.safeParse({
    name: formData.get('name'),
    company: formData.get('company'),
    department: formData.get('department'),
    phoneNumber: formData.get('phoneNumber'),
    email: formData.get('email'),
    content: formData.get('content'),
    isAgreePrivacyPolicy: formData.get('isAgreePrivacyPolicy'),
  })
  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: '送信内容に誤りがあります。フォームを確認して修正してください。',
    }
  }

  const { name, company, department, phoneNumber, email, content } = validatedFields.data

  try {
    await _createContact({
      name,
      company,
      department,
      phoneNumber,
      email,
      content,
      isAgreePrivacyPolicy: true,
    })
  } catch (e: unknown) {
    const errorMessage =
      e instanceof Error ? e.message : '申し訳ありません。送信中にエラーが発生しました。もう一度お試しください。'
    return {
      status: 'error',
      message: errorMessage,
    }
  }

  return {
    status: 'success',
    message: 'お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。',
  }
}
