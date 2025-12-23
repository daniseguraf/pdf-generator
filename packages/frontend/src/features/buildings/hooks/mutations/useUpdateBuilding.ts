import { buildingsService } from '@features/buildings/services/buildings.service'
import type { UpdateBuildingDto } from '@features/buildings/types/building.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateBuilding = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateBuildingDto }) => {
      return buildingsService.update(id, dto)
    },
    mutationKey: ['updateBuilding'],
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['building', id] })
    },
    onError: error => {
      console.error('Error updating building', error)
    },
  })
}
