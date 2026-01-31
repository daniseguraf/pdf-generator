import { Calendar, type View, dayjsLocalizer } from 'react-big-calendar'
import { Card } from '@mantine/core'
import { useState } from 'react'
import dayjs from 'dayjs'
import type { ReservationCalendarProps } from '@features/reservations/components/ReservationCalendar/ReservationCalendar.types'
import { isoToDateConstructor } from '@utils/dates/isoToDateConstructor'
import { fromISO8601ToHour } from '@utils/dates/fromISO8601ToHour'
import updateLocale from 'dayjs/plugin/updateLocale'
import type { Reservation } from '@my-buildings/shared/index'

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  weekStart: 1,
})
const localizer = dayjsLocalizer(dayjs)

export const ReservationCalendar = ({
  reservations,
  areaColor,
  onSelectSlot,
  openTime,
  closeTime,
  currentUserId,
}: ReservationCalendarProps) => {
  const [view, setView] = useState<View>('week')
  const [date, setDate] = useState(new Date())

  const openTimeFormatted = fromISO8601ToHour(openTime)
  const closeTimeFormatted = fromISO8601ToHour(closeTime)

  const formattedReservations = reservations.map(reservation => ({
    ...reservation,
    start: isoToDateConstructor(reservation.startTime),
    end: isoToDateConstructor(reservation.endTime),
  }))

  const slotStyles = (reservation: Reservation) => {
    const isCurrentUserReservation = currentUserId === reservation.userId
    const backgroundColor = isCurrentUserReservation ? areaColor : '#9e9e9e'
    const opacity = isCurrentUserReservation ? 0.9 : 0.8

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
        opacity,
      },
    }
  }

  return (
    <Card
      padding="xs"
      radius="md"
      shadow="sm"
      withBorder
      style={{ height: '60vh', minHeight: 650 }}
    >
      <Calendar
        localizer={localizer}
        events={formattedReservations}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={onSelectSlot}
        eventPropGetter={slotStyles}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        min={openTimeFormatted}
        max={closeTimeFormatted}
        defaultView="week"
        views={['month', 'week', 'day']}
        allDayAccessor={() => false}
        culture="es"
        scrollToTime={openTimeFormatted}
      />
    </Card>
  )
}
