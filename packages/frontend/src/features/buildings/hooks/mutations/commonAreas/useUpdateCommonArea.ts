import { commonAreasService } from '@features/buildings/services/commonAreas.service'
import type { UpdateCommonAreaDto } from '@features/buildings/types/commonAreas.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UpdateCommonAreaParams = {
  commonAreaId: number
  updateCommonAreaDto: UpdateCommonAreaDto
}

export const useUpdateCommonArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      commonAreaId,
      updateCommonAreaDto,
    }: UpdateCommonAreaParams) => {
      return commonAreasService.update(commonAreaId, updateCommonAreaDto)
    },
    mutationKey: ['commonAreas', 'update'],
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['buildings', 'detail', data.buildingId],
      })

      notifications.show({
        message: 'Common area updated successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error updating common area',
        message: error.message,
        color: 'red',
      })
    },
  })
}
