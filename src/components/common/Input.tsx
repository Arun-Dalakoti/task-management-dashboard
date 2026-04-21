import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { controlClassName } from './styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = '', ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={[controlClassName, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
})
