import { AppLayout } from '@app/layouts/AppLayout'
import { BuildingDetailPage } from '@features/buildings/pages/BuildingDetailPage'
import { BuildingsListPage } from '@features/buildings/pages/BuildingsListPage'
import { CreateBuildingPage } from '@features/buildings/pages/CreateBuildingPreview'
import { ReservationsPage } from '@features/buildings/pages/ReservationsPage'
import { Route, Routes } from 'react-router'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<BuildingsListPage />} />
        <Route path="/buildings" element={<BuildingsListPage />} />
        <Route path="/buildings/:id" element={<BuildingDetailPage />} />
        <Route path="/create-building" element={<CreateBuildingPage />} />

        <Route path="/reservations" element={<ReservationsPage />} />
      </Route>
    </Routes>
  )
}
