import { reservationsServices } from '@features/reservations/services/reservations.service'
import type { Building } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useBuildingByResidentId = () => {
  return useQuery<Building>({
    queryKey: ['reservations', 'list'],
    queryFn: () => reservationsServices.getBuildingByResidentId(),
  })
}
