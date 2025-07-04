import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircleIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface ErrorAlertProps {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode
}

export function ErrorAlert({
  title = 'Error',
  description,
  icon = <AlertCircleIcon className="h-5 w-5" />,
}: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="w-full shadow-xs">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  )
}
