import { reservationsServices } from '@features/reservations/services/reservations.services'
import type { Building } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useBuildingByResidentId = () => {
  return useQuery<Building>({
    queryKey: ['reservations', 'building'],
    queryFn: () => reservationsServices.getBuildingByResidentId(),
  })
}
