import { buildingsService } from '@features/buildings/services/buildings.service'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => {
      return buildingsService.delete(id)
    },
    mutationKey: ['buildings', 'delete'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings', 'list'] })
      notifications.show({
        message: 'Building deleted successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error deleting building',
        message: error.message,
        color: 'red',
      })
    },
  })
}
