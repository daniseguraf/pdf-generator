import type {
  CreateCommonAreaDto,
  UpdateCommonAreaDto,
} from '@features/buildings/types/commonAreas.types'
import { api } from '@lib/axios'
import type { CommonArea } from '@my-buildings/shared/index'

export const commonAreasService = {
  create: async (
    createCommonAreaDto: CreateCommonAreaDto
  ): Promise<CommonArea> => {
    const response = await api.post('/common-areas', createCommonAreaDto)

    return response.data
  },

  update: async (
    commonAreaId: number,
    updateCommonAreaDto: UpdateCommonAreaDto
  ): Promise<CommonArea> => {
    const response = await api.patch(
      `/common-areas/${commonAreaId}`,
      updateCommonAreaDto
    )

    return response.data
  },

  delete: async (commonAreaId: number): Promise<CommonArea> => {
    const response = await api.delete(`/common-areas/${commonAreaId}`)

    return response.data.buildingId
  },
}
