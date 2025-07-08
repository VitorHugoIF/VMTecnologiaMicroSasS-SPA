import type { ReactNode } from 'react'
import { Button as ShadcnButton, buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'
import { LoadingSpinner } from './LoadingSpinner'

type VariantWithCancel = VariantProps<typeof buttonVariants>['variant'] | 'cancel'

interface ButtonProps
  extends Omit<React.ComponentProps<typeof ShadcnButton>, 'variant'>,
    Omit<VariantProps<typeof buttonVariants>, 'variant'> {
  children: ReactNode
  icon?: ReactNode
  loading?: boolean
  variant?: VariantWithCancel
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
  const cancelClass =
    variant === 'cancel' ? 'bg-sidebar hover:bg-gray-400 dark:hover:bg-gray-400' : ''
  const ghostClass = variant === 'ghost' ? 'hover:bg-primary dark:hover:bg-primary' : ''
  return (
    <ShadcnButton
      variant={variant === 'cancel' ? 'outline' : variant}
      size={size}
      disabled={loading || disabled}
      className={`cursor-pointer ${cancelClass} ${ghostClass} ${className}`}
      {...props}
    >
      {loading ? (
        <LoadingSpinner size={16} className="mr-2" />
      ) : (
        icon && (
          <span
            className={['flex items-center', size === 'icon' ? '' : 'mr-2']
              .filter(Boolean)
              .join(' ')}
          >
            {icon}
          </span>
        )
      )}
      {children}
    </ShadcnButton>
  )
}
