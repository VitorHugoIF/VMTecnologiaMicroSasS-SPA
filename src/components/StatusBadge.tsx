import { Badge } from './ui/badge'
import React from 'react'

type Status = 'success' | 'pending' | 'canceled' | 'default'

interface StatusBadgeProps {
  status: Status
  children?: React.ReactNode
}

const statusMap: Record<
  Status,
  {
    label: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    className?: string
  }
> = {
  success: {
    label: 'Successful',
    variant: 'default',
    className: '',
  },
  pending: {
    label: 'Pending',
    variant: 'outline',
    className: 'text-yellow-500 border-yellow-400',
  },
  canceled: {
    label: 'Canceled',
    variant: 'destructive',
    className: '',
  },
  default: {
    label: 'Unknown',
    variant: 'outline',
    className: '',
  },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children }) => {
  const { label, variant, className } = statusMap[status] || statusMap.default
  return (
    <Badge variant={variant} className={className}>
      {children || label}
    </Badge>
  )
}
