import { api } from '@lib/axios'
import type { Building } from '@my-buildings/shared'




















export const reservationsServices = {





  getBuildingByResidentId: async (): Promise<Building> => {
    const response = await api.get('/reservations/building')

    return response.data
  },
}
