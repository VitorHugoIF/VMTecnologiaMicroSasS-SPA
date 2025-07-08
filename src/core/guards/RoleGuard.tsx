import { useAuth } from '@/core'
import { Navigate } from 'react-router-dom'
import { PREFIX_ROUTE } from '@/routes/routeRoles'
import { ProgressBar } from '@/components'
import type { ReactNode } from 'react'

export function RoleGuard({
  requiredRoles,
  children,
}: {
  requiredRoles: string[]
  children: ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) return <ProgressBar />

  const hasRole = user?.roles?.some((role) => requiredRoles.includes(role))

  if (!isAuthenticated || !hasRole) {
    return <Navigate to={PREFIX_ROUTE + '/forbidden'} replace />
  }

  return <>{children}</>
}
