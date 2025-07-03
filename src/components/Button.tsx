import type { ReactNode } from 'react'
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { LoadingSpinner } from './LoadingSpinner'

interface ButtonProps
  extends React.ComponentProps<typeof ShadcnButton>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode
  icon?: ReactNode
  loading?: boolean
}

export function Button({
  children,
  icon,
  loading = false,
  variant = 'default',
  size = 'default',
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton
      variant={variant}
      size={size}
      disabled={loading || disabled}
      className={`cursor-pointer ${className}`.trim()}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size={16} className="mr-2" />
      ) : (
        icon && (
          <span className={
            [
              'flex items-center',
              size === 'icon' ? '' : 'mr-2'
            ].filter(Boolean).join(' ')
          }>
            {icon}
          </span>
        )
      )}
      {children}
    </ShadcnButton>
  )
}
