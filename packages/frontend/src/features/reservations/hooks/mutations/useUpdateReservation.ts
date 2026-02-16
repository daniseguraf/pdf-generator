import { reservationsServices } from '@features/reservations/services/reservations.service'
import type { UpdateReservationDto } from '@features/reservations/types/reservation.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      updateReservationDto,
    }: {
      id: number
      updateReservationDto: UpdateReservationDto
    }) => {
      return reservationsServices.updateReservationStatus(
        id,
        updateReservationDto
      )
    },
    mutationKey: ['reservations', 'update'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', 'list'] })
      notifications.show({
        message: 'Reservation updated successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error updating reservation',
        message: error.message,
        color: 'red',
      })
    },
  })
}
