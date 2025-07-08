import { forwardRef } from 'react'
import { Input as ShadInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<typeof ShadInput> {
  label?: string
  required?: boolean,
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, id, className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <Label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <ShadInput ref={ref} id={id} required={required} className={cn('dark:border-white/10', className)} {...props} />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'
