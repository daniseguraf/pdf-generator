import { AppLayout } from '@app/layouts/AppLayout'
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute'
import { LoginPage } from '@features/auth/pages/LoginPage/LoginPage'
import { BuildingDetailPage } from '@features/buildings/pages/BuildingDetailPage'
import { BuildingsListPage } from '@features/buildings/pages/BuildingsListPage'
import { ReservationsPage } from '@features/buildings/pages/ReservationsPage'
import { Navigate, Route, Routes } from 'react-router'
// import { RegisterPage } from '@features/auth/pages/RegisterPage'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<BuildingsListPage />} />
        <Route path="/buildings" element={<BuildingsListPage />} />
        <Route path="/buildings/:id" element={<BuildingDetailPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}
