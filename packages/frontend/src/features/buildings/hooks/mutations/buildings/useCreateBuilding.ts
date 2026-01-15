import { buildingsService } from '@features/buildings/services/buildings.service'
import type { CreateBuildingDto } from '@features/buildings/types/building.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (createBuildingDto: CreateBuildingDto) => {
      return buildingsService.create(createBuildingDto)
    },
    mutationKey: ['buildings', 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buildings', 'list'] })
      notifications.show({
        message: 'Building created successfully',
        color: 'green',
      })
    },
    onError: error => {
      console.error('Error creating building', error)
      notifications.show({
        title: 'Error creating building',
        message: error.message,
        color: 'red',
      })
    },
  })
}
