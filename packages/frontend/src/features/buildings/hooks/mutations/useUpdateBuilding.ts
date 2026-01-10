import { buildingsService } from '@features/buildings/services/buildings.service'
import type { UpdateBuildingDto } from '@features/buildings/types/building.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UpdateBuildingParams = {
  id: number
  updateBuildingDto: UpdateBuildingDto
}

export const useUpdateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updateBuildingDto }: UpdateBuildingParams) => {
      return buildingsService.update(id, updateBuildingDto)
    },
    mutationKey: ['updateBuilding'],
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['building', id] })
      queryClient.invalidateQueries({ queryKey: ['buildings'] })

      notifications.show({
        message: 'Building updated successfully',
        color: 'green',
      })
    },
    onError: error => {
      notifications.show({
        title: 'Error updating building',
        message: error.message,
        color: 'red',
      })
    },
  })
}
