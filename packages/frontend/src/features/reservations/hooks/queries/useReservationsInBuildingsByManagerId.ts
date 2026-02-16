import { reservationsServices } from '@features/reservations/services/reservations.service'
import type { Reservation } from '@my-buildings/shared/index'
import { useQuery } from '@tanstack/react-query'

export const useReservationsInBuildingsByManagerId = () => {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', 'list'],
    queryFn: () => reservationsServices.getReservationsInBuildingsByManagerId(),
  })
}
