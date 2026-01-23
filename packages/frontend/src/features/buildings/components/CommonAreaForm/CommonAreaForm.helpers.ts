import {
  dayLabels,
  getAreaLabel,
} from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreasValues, DaysOfWeekValues } from '@my-buildings/shared/index'
import { z } from 'zod'

export const commonAreaFormSchema = z.object({
  type: z.string().min(1, 'Select an option'),
})

export const commonAreaOptions = Object.values(CommonAreasValues).map(
  commonArea => ({
    value: commonArea,
    label: getAreaLabel(commonArea),
  })
)

export const dayOptions = Object.values(DaysOfWeekValues).map(day => {
  return {
    value: day,
    label: dayLabels[day],
  }
})
