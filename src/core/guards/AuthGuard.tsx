import { ProgressBar } from '@/components'
import { useAuth } from '@/core'
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PREFIX_ROUTE } from '@/routes/routeRoles'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <ProgressBar />

  if (!isAuthenticated) return <Navigate to={PREFIX_ROUTE + '/login'} replace />

  return <>{children}</>
}
