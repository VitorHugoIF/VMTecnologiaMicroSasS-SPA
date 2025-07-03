import { AuthGuard } from '@/core'
import { Outlet } from 'react-router-dom'
import { MainLayout } from '@/components/Layout/MainLayout'

export function AuthenticatedRoutes() {
  return (
    <AuthGuard>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </AuthGuard>
  )
}
