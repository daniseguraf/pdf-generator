import {
  dayLabels,
  getAreaLabel,
} from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreasValues, DaysOfWeekValues } from '@my-buildings/shared/index'
import { z } from 'zod'

export const commonAreaFormSchema = z.object({
  type: z.string().min(1, 'Select an option'),
  description: z.string().optional(),
  capacity: z.coerce
    .number({
      error: 'Capacity is required',
    })
    .min(1, 'Capacity must be at least 1'),
  maxHoursPerReservation: z.coerce
    .number({
      error: 'Max hours per reservation is required',
    })
    .min(1, 'Max hours per reservation must be at least 1'),
  openTime: z
    .string('Invalid time format')
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  closeTime: z
    .string('Invalid time format')
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  daysAvailable: z.array(z.nativeEnum(DaysOfWeekValues)).optional(),
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
