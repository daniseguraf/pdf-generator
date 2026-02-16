import type {
  CreateReservationDto,
  UpdateReservationDto,
} from '@features/reservations/types/reservation.types'
import { api } from '@lib/axios'
import type { Building, Reservation } from '@my-buildings/shared'

export const reservationsServices = {
  getBuildingByResidentId: async (): Promise<Building> => {
    const response = await api.get('/reservations/building')

    return response.data
  },

  createReservation: async (
    createReservationDto: CreateReservationDto
  ): Promise<Reservation> => {
    const response = await api.post('/reservations', createReservationDto)

    return response.data
  },

  deleteReservation: async (reservationId: number): Promise<void> => {
    await api.delete(`/reservations/${reservationId}`)
  },

  getReservationsInBuildingsByManagerId: async (): Promise<Reservation[]> => {
    const response = await api.get('/reservations/manager')

    return response.data
  },

  updateReservationStatus: async (
    id: number,
    updateReservationDto: UpdateReservationDto
  ): Promise<Reservation> => {
    const response = await api.patch(
      `/reservations/${id}`,
      updateReservationDto
    )

    return response.data
  },
}
