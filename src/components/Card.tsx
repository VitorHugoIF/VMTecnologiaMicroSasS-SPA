import type { ReactNode } from 'react'
import {
  Card as ShadCard,
  CardHeader as ShadCardHeader,
  CardTitle as ShadCardTitle,
  CardDescription as ShadCardDescription,
  CardContent as ShadCardContent,
  CardFooter as ShadCardFooter,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CardProps {
  title?: ReactNode
  description?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
  contentClassName?: string
  cardHeaderClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  style?: React.CSSProperties
}

export function Card({
  title,
  description,
  footer,
  children,
  className = '',
  contentClassName = '',
  cardHeaderClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  style,
}: CardProps) {
  return (
    <ShadCard className={cn(`flex flex-col gap-3 px-0 flex-1 p-0 border-none shadow-lg overflow-hidden min-h-[100%]`, className)} style={style}>
      {(title || description) && (
        <ShadCardHeader className={cn(cardHeaderClassName)}>
          {title && <ShadCardTitle className={cn('text-xl', titleClassName)}>{title}</ShadCardTitle>}
          {description && <ShadCardDescription className={cn(descriptionClassName)}>{description}</ShadCardDescription>}
        </ShadCardHeader>
      )}
      <ShadCardContent className={cn('p-0',contentClassName)}>{children}</ShadCardContent>
      {footer && <ShadCardFooter>{footer}</ShadCardFooter>}
    </ShadCard>
  )
}
