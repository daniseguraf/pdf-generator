import { buildingsService } from '@features/buildings/services/buildings.service'
import type { UpdateBuildingDto } from '@features/buildings/types/building.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type UpdateBuildingParams = {
  id: number
  dto: UpdateBuildingDto
}

export const useUpdateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: UpdateBuildingParams) => {
      return buildingsService.update(id, dto)
    },
    mutationKey: ['updateBuilding'],
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['building', id] })
      queryClient.invalidateQueries({ queryKey: ['buildings'] })
    },
    onError: error => {
      console.error('Error updating building', error)
    },
  })
}
