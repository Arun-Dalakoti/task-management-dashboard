import type { LabelHTMLAttributes, ReactNode } from 'react'
import { labelClassName } from './styles'

type LabelProps = {
  children: ReactNode
} & LabelHTMLAttributes<HTMLLabelElement>

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label
      className={[labelClassName, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </label>
  )
}
