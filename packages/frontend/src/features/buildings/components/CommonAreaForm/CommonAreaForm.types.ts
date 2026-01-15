import type { CommonArea, DaysOfWeek } from '@my-buildings/shared/index'

export type CommonAreaFormProps = {
  opened: boolean
  onClose: () => void
  commonArea?: CommonArea
  isEdit?: boolean
}

export type CommonAreaFormValues = {
  type: string
  description?: string
  capacity?: number
  maxHoursPerReservation?: number
  openTime?: string
  closeTime?: string
  daysAvailable?: DaysOfWeek[]
}
