import { forwardRef } from 'react'
import { Input as ShadInput } from '@/components/ui/input'

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<typeof ShadInput>>(
  (props, ref) => {
    return <ShadInput ref={ref} {...props} />
  },
)
Input.displayName = 'Input'
