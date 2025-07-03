import { forwardRef } from 'react'
import { Label as ShadLabel } from '@/components/ui/label'

export const Label = forwardRef<HTMLLabelElement, React.ComponentProps<typeof ShadLabel>>(
  (props, ref) => {
    return <ShadLabel ref={ref} {...props} />
  },
)
Label.displayName = 'Label'
