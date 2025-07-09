import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages';
import { NOT_FOUND_ROUTE } from '@/routes/routeRoles';
;

export function GlobalRoutes() {
  return (
    <Routes>
      <Route path="" element={<HomePage />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
} 