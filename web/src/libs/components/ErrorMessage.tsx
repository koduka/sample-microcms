import type { ReactNode } from 'react'

import { cn } from '@/libs/utils'

type Props = {
  className?: string
  children: ReactNode
}

export function ErrorMessage({ className, children }: Props) {
  return <p className={cn('text-sm font-medium text-destructive', className)}>{children}</p>
}
