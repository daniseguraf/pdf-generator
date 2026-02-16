import { AppLayout } from '@app/layouts/AppLayout'
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute'
import { useRole } from '@features/auth/hooks/useRole'
import { LoginPage } from '@features/auth/pages/LoginPage/LoginPage'
import { BuildingDetailPage } from '@features/buildings/pages/BuildingDetailPage'
import { BuildingsListPage } from '@features/buildings/pages/BuildingsListPage'
import { ReservationsManagementPage } from '@features/reservations/pages/ReservationsManagementPage'
import { ReservationsPage } from '@features/reservations/pages/ReservationsPage/ReservationsPage'
import { UserRoleValues } from '@my-buildings/shared/index'
import { Navigate, Route, Routes } from 'react-router'

export const AppRoutes = () => {
  const { isResident, isAdminOrManager } = useRole()

  const admin = UserRoleValues.ADMIN
  const manager = UserRoleValues.MANAGER
  const resident = UserRoleValues.RESIDENT

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
        {isAdminOrManager() && (
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={[admin, manager]}>
                <BuildingsListPage />
              </ProtectedRoute>
            }
          />
        )}

        {isResident() && (
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={[resident]}>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />
        )}

        <Route
          path="/buildings/:id"
          element={
            <ProtectedRoute allowedRoles={[manager]}>
              <BuildingDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservations-management"
          element={
            <ProtectedRoute allowedRoles={[manager]}>
              <ReservationsManagementPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
