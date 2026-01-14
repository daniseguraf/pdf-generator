import { buildingsService } from '@features/buildings/services/buildings.service'
import type { Building } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useBuildings = () => {
  return useQuery<Building[]>({
    queryKey: ['buildings'],
    queryFn: () => buildingsService.getAll(),
    staleTime: 1000 * 60 * 60,
  })
}
