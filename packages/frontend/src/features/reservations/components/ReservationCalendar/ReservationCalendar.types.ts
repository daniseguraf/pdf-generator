import type { DaysOfWeek, Reservation } from '@my-buildings/shared/index'

export interface ReservationCalendarProps {
  reservations: Reservation[]
  areaColor: string
  openTime: Date
  closeTime: Date
  daysAvailable: DaysOfWeek[]

  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void
}
