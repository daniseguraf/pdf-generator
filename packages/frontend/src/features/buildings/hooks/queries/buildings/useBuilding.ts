import { buildingsService } from '@features/buildings/services/buildings.service'
import type { Building } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useBuilding = (buildingId: number) => {
  return useQuery<Building>({
    queryKey: ['buildings', 'detail', buildingId],
    queryFn: () => buildingsService.getById(buildingId),
  })
}
