import { Routes, Route, Navigate } from 'react-router-dom'
import { useInvalidateCache } from '@/hooks'
import { RoleRoutes, PlanRoutes, TenantRoutes } from './routes'
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles'

export function AdminModule() {
  useInvalidateCache()

  return (
    <Routes>
      <Route path="" element={<Navigate to="tenant" replace />} />
      <Route path="tenant/*" element={<TenantRoutes />} />
      <Route path="roles/*" element={<RoleRoutes />} />
      <Route path="plans/*" element={<PlanRoutes />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
}
