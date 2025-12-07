import { AppLayout } from '@app/layouts/AppLayout'
import { BuildingDetailPage } from '@features/buildings/pages/BuildingDetailPage'
import { BuildingsListPage } from '@features/buildings/pages/BuildingsListPage'
import { CreateBuildingPreview } from '@features/buildings/pages/CreateBuildingPreview'
import { Route, Routes } from 'react-router'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/buildings" element={<BuildingsListPage />} />
        <Route path="/buildings/:id" element={<BuildingDetailPage />} />
        <Route path="/create-building" element={<CreateBuildingPreview />} />
      </Route>
    </Routes>
  )
}
