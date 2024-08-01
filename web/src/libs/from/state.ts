export type FormState<T> =
  | {
      status: 'pending' | 'submitting'
    }
  | {
      status: 'error'
      errors?: {
        [key in keyof T]?: string[]
      }
      message: string
    }
  | {
      status: 'success'
      message: string
    }
