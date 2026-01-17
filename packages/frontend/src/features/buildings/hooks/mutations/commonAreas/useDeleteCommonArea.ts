import { commonAreasService } from '@features/buildings/services/commonAreas.service'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type DeleteCommonAreaParams = {
  commonAreaId: number
}

export const useDeleteCommonArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commonAreaId }: DeleteCommonAreaParams) => {
      return commonAreasService.delete(commonAreaId)
    },
    mutationKey: ['commonAreas', 'delete'],
    onSuccess: buildingId => {
      queryClient.invalidateQueries({
        queryKey: ['buildings', 'detail', buildingId],
      })

      notifications.show({
        message: 'Common area deleted successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error deleting common area',
        message: error.message,
        color: 'red',
      })
    },
  })
}
