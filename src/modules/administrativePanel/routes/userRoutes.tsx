import { Routes, Route, Navigate } from 'react-router-dom'
import { ListUsersPage, CreateUserPage, ViewUserPage, EditUserPage } from '../pages'
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles'

export function UserRoutes() {
  return (
    <Routes>
      <Route path="" element={<ListUsersPage />} />
      <Route path="add" element={<CreateUserPage />} />
      <Route path="view/:id" element={<ViewUserPage />} />
      <Route path="edit/:id" element={<EditUserPage />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
} 