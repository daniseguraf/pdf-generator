import { reservationsServices } from '@features/reservations/services/reservations.service'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteReservation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (reservationId: number) => {
      return reservationsServices.deleteReservation(reservationId)
    },
    mutationKey: ['reservations', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations', 'list'] })
      notifications.show({
        message: 'Reservation deleted successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error deleting reservation',
        message: error.message,
        color: 'red',
      })
    },
  })
}
