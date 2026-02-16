import {
  ReservationStatusValues,
  type ReservationStatus,
} from '@my-buildings/shared/index'

export const getReservationStatusColor = (status: ReservationStatus) => {
  const color: Record<ReservationStatus, string> = {
    [ReservationStatusValues.IN_REVIEW]: '#f59f00',
    [ReservationStatusValues.CONFIRMED]: '#2f9e44',
    [ReservationStatusValues.CANCELLED]: '#f03e3e',
    [ReservationStatusValues.FINISHED]: '#7d7d7d',
  }

  return color[status] ?? 'gray'
}

export const getReservationStatusLabel = (status: ReservationStatus) => {
  const label: Record<ReservationStatus, string> = {
    [ReservationStatusValues.IN_REVIEW]: 'In review',
    [ReservationStatusValues.CONFIRMED]: 'Confirmed',
    [ReservationStatusValues.CANCELLED]: 'Cancelled',
    [ReservationStatusValues.FINISHED]: 'Finished',
  }

  return label[status] ?? '---'
}
