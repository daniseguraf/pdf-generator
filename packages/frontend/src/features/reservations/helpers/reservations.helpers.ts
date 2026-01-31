import {
  ReservationStatusValues,
  type ReservationStatus,
} from '@my-buildings/shared/index'

export const getReservationStatusColor = (status: ReservationStatus) => {
  const color: Record<ReservationStatus, string> = {
    [ReservationStatusValues.IN_REVIEW]: 'yellow',
    [ReservationStatusValues.CONFIRMED]: 'green',
    [ReservationStatusValues.CANCELLED]: 'red',
    [ReservationStatusValues.FINISHED]: 'gray',
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
