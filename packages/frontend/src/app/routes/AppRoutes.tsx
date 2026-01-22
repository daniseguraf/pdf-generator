import { AppLayout } from '@app/layouts/AppLayout'
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute'
import { LoginPage } from '@features/auth/pages/LoginPage/LoginPage'
import { BuildingDetailPage } from '@features/buildings/pages/BuildingDetailPage'
import { BuildingsListPage } from '@features/buildings/pages/BuildingsListPage'
import { ReservationsPage } from '@features/reservations/pages/ReservationsPage'
import { UserRoleValues } from '@my-buildings/shared/index'
import { Navigate, Route, Routes } from 'react-router'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute
              allowedRoles={[UserRoleValues.ADMIN, UserRoleValues.MANAGER]}
            >
              <BuildingsListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings"
          element={
            <ProtectedRoute
              allowedRoles={[UserRoleValues.ADMIN, UserRoleValues.MANAGER]}
            >
              <BuildingsListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buildings/:id"
          element={
            <ProtectedRoute allowedRoles={[UserRoleValues.MANAGER]}>
              <BuildingDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute allowedRoles={[UserRoleValues.RESIDENT]}>
              <ReservationsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
