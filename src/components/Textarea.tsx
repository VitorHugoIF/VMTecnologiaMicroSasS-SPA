import { forwardRef } from 'react'
import { Textarea as ShadTextarea } from '@/components/ui/textarea'
import type { TextareaProps } from '@/components/ui/textarea'

interface CustomTextareaProps extends TextareaProps {
  minHeight?: string
  maxHeight?: string
  resizable?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      className = '',
      minHeight = '120px',
      maxHeight = '300px',
      resizable = false,
      style,
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
      <ShadTextarea
        ref={ref}
        className={`bg-transparent dark:bg-input/30 transition-[color,box-shadow] ${className}`}
        style={textareaStyle}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
