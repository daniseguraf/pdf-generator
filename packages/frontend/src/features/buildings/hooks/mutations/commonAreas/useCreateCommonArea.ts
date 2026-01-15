import { commonAreasService } from '@features/buildings/services/commonAreas.service'
import type { CreateCommonAreaDto } from '@features/buildings/types/commonAreas.types'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCommonArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (createCommonAreaDto: CreateCommonAreaDto) => {
      return commonAreasService.create(createCommonAreaDto)
    },
    mutationKey: ['commonAreas', 'create'],
    onSuccess: (_, { buildingId }) => {
      queryClient.invalidateQueries({
        queryKey: ['buildings', 'detail', buildingId],
      })
      notifications.show({
        message: 'Common area created successfully',
        color: 'green',
      })
    },
    onError: error => {
      console.error('Error creating common area', error)
      notifications.show({
        title: 'Error creating common area',
        message: error.message,
        color: 'red',
      })
    },
  })
}
