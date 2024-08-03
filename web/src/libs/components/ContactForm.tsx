'use client'

import type { CreateContactState } from '@/libs/from/contact/actions'

import { ErrorMessage } from '@/libs/components/ErrorMessage'
import { Badge } from '@/libs/components/ui/badge'
import { Button } from '@/libs/components/ui/button'
import { Input } from '@/libs/components/ui/input'
import { Label } from '@/libs/components/ui/label'
import { Textarea } from '@/libs/components/ui/textarea'
import { createContact } from '@/libs/from/contact/actions'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { FiSend } from 'react-icons/fi'
import { toast } from 'sonner'

import Link from 'next/link'

export function ContactForm() {
  const [state, dispatch] = useFormState<CreateContactState, FormData>((_, formData) => createContact(formData), {
    status: 'pending',
  })
  const [disabledSubmitButton, setDisabledSubmitButton] = useState(true)

  useEffect(() => {
    console.log(state)
    if (state.status === 'success') {
      toast.success(state.message)
    } else if (state.status === 'error') {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-1">
        <Label htmlFor="name" className="space-x-2">
          <span className="font-bold">お名前</span>
          <Badge variant="destructive">必須</Badge>
        </Label>
        <Input id="name" name="name" autoComplete="name" />
        {state.status === 'error' &&
          state.errors?.name &&
          state.errors?.name?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="company" className="space-x-2">
          <span className="font-bold">会社名</span>
        </Label>
        <Input id="company" name="company" autoComplete="company" />
        {state.status === 'error' &&
          state.errors?.company &&
          state.errors?.company?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="department" className="space-x-2">
          <span className="font-bold">部署名</span>
        </Label>
        <Input id="department" name="department" autoComplete="department" />
        {state.status === 'error' &&
          state.errors?.department &&
          state.errors?.department?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="phoneNumber" className="space-x-2">
          <span className="font-bold">電場番号</span>
          <Badge variant="destructive">必須</Badge>
        </Label>
        <Input id="phoneNumber" name="phoneNumber" autoComplete="phoneNumber" />
        {state.status === 'error' &&
          state.errors?.phoneNumber &&
          state.errors.phoneNumber.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="email" className="space-x-2">
          <span className="font-bold">メールアドレス</span>
          <Badge variant="destructive">必須</Badge>
        </Label>
        <Input id="email" type="email" name="email" autoComplete="email" />
        {state.status === 'error' &&
          state.errors?.email?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <Label htmlFor="content" className="space-x-2">
          <span className="font-bold">お問い合わせ内容</span>
          <Badge variant="destructive">必須</Badge>
        </Label>
        <Textarea className="h-64" name="content" id="content" autoComplete="off" />
        {state.status === 'error' &&
          state.errors?.content &&
          state.errors?.content?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
      </div>
      <div className="space-y-1">
        <div className="flex flex-row items-center justify-center space-x-3 space-y-0">
          <Input
            type="checkbox"
            id="isAgreePrivacyPolicy"
            name="isAgreePrivacyPolicy"
            onChange={(e) => setDisabledSubmitButton(!e.target.checked)}
            className="border-primary ring-offset-background focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer size-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Label htmlFor="isAgreePrivacyPolicy">
            <Link target="_blank" href="/privacy-policy" className="font-semibold text-blue-500 hover:text-blue-500/80">
              個人情報保護方針
            </Link>
            に同意する
          </Label>
        </div>
        <div className="flex justify-center">
          {state.status === 'error' &&
            state.errors?.isAgreePrivacyPolicy &&
            state.errors?.isAgreePrivacyPolicy?.map((message) => <ErrorMessage key={message}>{message}</ErrorMessage>)}
        </div>
      </div>
      <div className="flex justify-center">
        <Button type="submit" className="space-x-2" disabled={disabledSubmitButton}>
          <FiSend />
          <span>送信する</span>
        </Button>
      </div>
    </form>
  )
}
