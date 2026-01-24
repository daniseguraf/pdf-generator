import { reservationsServices } from '@features/reservations/services/reservations.service'
import type { CreateReservationDto } from '@features/reservations/types/reservation.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (createReservationDto: CreateReservationDto) => {
      return reservationsServices.createReservation(createReservationDto)
    },
    mutationKey: ['reservations', 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', 'list'] })
      notifications.show({
        message: 'Reservation created successfully',
        color: 'green',
      })
    },
    onError: error => {
      console.error('Error creating reservation', error)
      notifications.show({
        title: 'Error creating reservation',
        message: error.message,
        color: 'red',
      })
    },
  })
}
