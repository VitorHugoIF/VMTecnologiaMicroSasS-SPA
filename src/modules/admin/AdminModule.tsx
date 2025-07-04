import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense } from 'react'
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles'
import { useInvalidateCache } from '@/hooks'
import { ProgressBar } from '@/components'
import { RoleRoutes, PlanRoutes, TenantRoutes } from './routes'

export function AdminModule() {
  useInvalidateCache()

  return (
    <Routes>
      <Route path="" element={<Navigate to="tenant" replace />} />
      <Route path="tenant/*" element={<TenantRoutes />} />
      <Route path="roles/*" element={<RoleRoutes />} />
      <Route path="plans/*" element={<PlanRoutes />} />

      <Route path="user" element={<Suspense fallback={<ProgressBar />}>User</Suspense>} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
}
