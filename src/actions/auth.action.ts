'use server'

import { LoginSchema } from '@/lib/validations'
import { AuthService } from '@/services/auth.service'
import { redirect } from 'next/navigation'

export type ActionState = {
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  // 1. Validate
  const parsed = LoginSchema.safeParse({
    email:    formData.get('email'),
    password: formData.get('password'),
  })
  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten()
        .fieldErrors as Record<string, string[]>
    }
  }

  // 2. Call service
  const result = await AuthService.login(parsed.data)
  if (!result.success) {
    return { error: result.message }
  }

  // 3. Redirect on success
  redirect('/dashboard')
}