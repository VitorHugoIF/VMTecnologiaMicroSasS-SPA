import { forwardRef } from 'react'
import { Textarea as ShadTextarea } from '@/components/ui/textarea'
import type { TextareaProps } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface CustomTextareaProps extends TextareaProps {
  label?: string
  required?: boolean
  error?: string
  id?: string
  className?: string
  minHeight?: string | number
}

export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className = '', style, label, required, error, id, minHeight = 120, ...props }, ref) => {
    const textareaStyle = {
      ...(minHeight ? { minHeight } : {}),
      ...style,
    }
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
        <ShadTextarea
          ref={ref}
          id={id}
          className={cn('resize-none bg-inherit dark:border-white/10', className)}
          style={textareaStyle}
          required={required}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
