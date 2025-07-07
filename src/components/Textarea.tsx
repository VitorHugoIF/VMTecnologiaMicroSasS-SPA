import { forwardRef } from 'react'
import { Textarea as ShadTextarea } from '@/components/ui/textarea'
import type { TextareaProps } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface CustomTextareaProps extends TextareaProps {
  minHeight?: string
  maxHeight?: string
  resizable?: boolean
  label?: string
  required?: boolean
  error?: string
  id?: string
  className?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      className = '',
      minHeight = '120px',
      maxHeight = '300px',
      resizable = false,
      style,
      label,
      required,
      error,
      id,
      ...props
    },
    ref,
  ) => {
    const textareaStyle = {
      minHeight,
      maxHeight,
      resize: resizable ? ('vertical' as const) : ('none' as const),
      ...style,
    }

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <Label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <ShadTextarea
          ref={ref}
          id={id}
          className="bg-transparent dark:bg-input/30 transition-[color,box-shadow]"
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
