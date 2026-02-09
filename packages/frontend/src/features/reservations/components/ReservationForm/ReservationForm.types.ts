import type { CalendarSlotRange } from '@features/reservations/types/reservation.types'
import type { CommonArea } from '@my-buildings/shared/index'

export interface ReservationFormProps {
  opened: boolean
  onClose: () => void
  selectedSlot: CalendarSlotRange | null
  selectedArea: CommonArea
}

export interface ReservationFormValues {
  title?: string
  attendees?: number
  notes?: string
}
