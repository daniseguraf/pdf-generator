import type { CommonArea } from '@my-buildings/shared/index'

export interface ReservationFormProps {
  opened: boolean
  onClose: () => void
  selectedSlot: { start: Date; end: Date } | null
  selectedArea: CommonArea
}

export interface ReservationFormValues {
  title?: string
  attendees?: number
  notes?: string
}
