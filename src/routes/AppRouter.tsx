import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthenticatedRoutes } from './AuthenticatedRoutes'
import { PublicRoutes } from './PublicRoutes'
import { LoginPage, NotFound, Forbidden, InternalServerError, VerifiedEmail, DashboardPage } from '@/pages'
import {
  ERROR_ROUTE,
  FORBIDDEN_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  MAIN_ROUTE_AUTH0,
  NOT_FOUND_ROUTE,
  PREFIX_ROUTE,
  VERIFIEDEMAIL_ROUTE,
} from './routeRoles'
import { lazy, Suspense } from 'react'
import { ProgressBar } from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AuthUser } from '@/core/contexts/AuthContext'
import { useAuth } from '@/core'
import { RoleGuard } from '@/core/guards/RoleGuard'
import { Roles } from '@/core/auth/Roles'

function getMainUrlRoute(user: AuthUser | null) {
  return user?.method === 'idp' ? MAIN_ROUTE_AUTH0 : MAIN_ROUTE
}

function RootRedirect() {
  const { isAuthenticated, isLoading, error, user } = useAuth()
  if (isLoading) return null
  if (isAuthenticated && !isLoading) return <Navigate to={getMainUrlRoute(user)} replace />
  if (error) return <Navigate to={ERROR_ROUTE} />
  return <Navigate to={LOGIN_ROUTE} />
}

const queryClient = new QueryClient()

const AdminModule = lazy(() => import('@/modules').then((m) => ({ default: m.AdminModule })))
const AdministrativePanelModule = lazy(() =>
  import('@/modules').then((m) => ({ default: m.AdministrativePanelModule })),
)
const StockModule = lazy(() => import('@/modules').then((m) => ({ default: m.StockModule })))


export function AppRouter() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route element={<PublicRoutes />}>
            <Route path={LOGIN_ROUTE} element={<LoginPage />} />
            <Route path={FORBIDDEN_ROUTE} element={<Forbidden />} />
            <Route path={ERROR_ROUTE} element={<InternalServerError />} />
            <Route path={VERIFIEDEMAIL_ROUTE} element={<VerifiedEmail />} />
            <Route path={NOT_FOUND_ROUTE} element={<NotFound />} />
          </Route>
          <Route path={PREFIX_ROUTE + '/'} element={<AuthenticatedRoutes />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route
              path="admin/*"
              element={
                <RoleGuard requiredRoles={[Roles.SuperAdmin]}>
                  <Suspense fallback={<ProgressBar />}>
                    <AdminModule />
                  </Suspense>
                </RoleGuard>
              }
            />
            <Route
              path="administrative-panel/*"
              element={
                <RoleGuard requiredRoles={[Roles.SuperAdmin, Roles.Admin]}>
                  <Suspense fallback={<ProgressBar />}>
                    <AdministrativePanelModule />
                  </Suspense>
                </RoleGuard>
              }
            />

            <Route
              path="stock/*"
              element={
                // <RoleGuard requiredRoles={[]}>
                  <Suspense fallback={<ProgressBar />}>
                    <StockModule />
                  </Suspense>
                // </RoleGuard>
              }
            />

          </Route>
          <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
