import { api } from '@lib/axios'
import type { Building, Reservation } from '@my-buildings/shared'

export const reservationsServices = {
  getBuildingByResidentId: async (): Promise<Building> => {
    const response = await api.get('/reservations/building')

    return response.data
  },
  createReservation: async (
    reservation: CreateReservationDto
  ): Promise<Reservation> => {
    const response = await api.post('/reservations', reservation)

    return response.data
  },
}
