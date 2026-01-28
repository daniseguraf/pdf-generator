import {
  ReservationStatusValues,
  type ReservationStatus,
} from '@my-buildings/shared/index'

export const getReservationStatusColor = (status: ReservationStatus) => {
  const color = {
    [ReservationStatusValues.IN_REVIEW]: 'yellow',
    [ReservationStatusValues.CONFIRMED]: 'green',
    [ReservationStatusValues.CANCELLED]: 'red',
  }

  return color[status] ?? 'gray'
}

export const getReservationStatusLabel = (status: ReservationStatus) => {
  const label = {
    [ReservationStatusValues.IN_REVIEW]: 'In review',
    [ReservationStatusValues.CONFIRMED]: 'Confirmed',
    [ReservationStatusValues.CANCELLED]: 'Cancelled',
  }

  return label[status] ?? '---'
}
