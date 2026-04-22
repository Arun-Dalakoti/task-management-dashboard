import { forwardRef } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { controlClassName } from './styles'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select({ className = '', children, ...props }, ref) {
    return (
      <select
        ref={ref}
        className={[
          controlClassName,
          "!pr-10",
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {children}
      </select>
    )
  },
)
