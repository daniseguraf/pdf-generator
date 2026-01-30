import type { DaysOfWeek, Reservation } from '@my-buildings/shared/index'

export interface ReservationCalendarProps {
  reservations: Reservation[]
  areaColor: string
  openTime: Date
  closeTime: Date
  daysAvailable: DaysOfWeek[]
  currentUserId: number

  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void
}
