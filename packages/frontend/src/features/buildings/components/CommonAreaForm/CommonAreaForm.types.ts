import type { CommonArea, DaysOfWeek } from '@my-buildings/shared/index'

export interface CommonAreaFormProps {
  opened: boolean
  onClose: () => void
  commonArea?: CommonArea
}

export interface CommonAreaFormValues {
  type: string
  description?: string
  capacity?: number
  maxHoursPerReservation?: number
  openTime?: string
  closeTime?: string
  daysAvailable?: DaysOfWeek[]
}
