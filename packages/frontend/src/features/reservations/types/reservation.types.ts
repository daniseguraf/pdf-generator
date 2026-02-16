import type { components } from '@my-buildings/shared/index'

export type CreateReservationDto = components['schemas']['CreateReservationDto']
export type UpdateReservationDto = components['schemas']['UpdateReservationDto']

export interface CalendarSlotRange {
  start: Date
  end: Date
}
