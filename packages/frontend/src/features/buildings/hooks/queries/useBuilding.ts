import { buildingsService } from '@features/buildings/services/buildings.service'
import type { Building } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useBuilding = (id: number) => {
  return useQuery<Building>({
    queryKey: ['building', id],
    queryFn: () => buildingsService.getById(id),
    // staleTime: 1000 * 60 * 60,
  })
}
