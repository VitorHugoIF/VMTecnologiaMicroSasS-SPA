import { Routes, Route, Navigate } from 'react-router-dom'
import { useInvalidateCache } from '@/hooks'
import { UserRoutes } from './routes'
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles'

export function AdministrativePanelModule() {
  useInvalidateCache()

  return (
    <Routes>
      <Route path="" element={<Navigate to="user" replace />} />
      <Route path="user/*" element={<UserRoutes />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
}
