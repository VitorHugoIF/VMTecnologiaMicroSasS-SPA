import { Routes, Route, Navigate } from 'react-router-dom'
import { ListTenantsPage, CreateTenantPage, ViewTenantPage, EditTenantPage } from '../pages'
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles'

export function TenantRoutes() {
  return (
    <Routes>
      <Route path="" element={<ListTenantsPage />} />
      <Route path="add" element={<CreateTenantPage />} />
      <Route path="view/:id" element={<ViewTenantPage />} />
      <Route path="edit/:id" element={<EditTenantPage />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
}
