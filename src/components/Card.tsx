import type { ReactNode } from 'react'
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

interface CardProps {
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  style?: React.CSSProperties
}

export function Card({
  title,
  description,
  footer,
  children,
  className = '',
  contentClassName = '',
  style,
}: CardProps) {
  return (
    <ShadcnCard className={className} style={style}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={contentClassName}>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </ShadcnCard>
  )
}
