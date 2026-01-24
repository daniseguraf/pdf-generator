import { Calendar, type View, dayjsLocalizer } from 'react-big-calendar'
import { Card } from '@mantine/core'
import { useState } from 'react'
import dayjs from 'dayjs'
import type { Reservation } from '@my-buildings/shared/index'

const localizer = dayjsLocalizer(dayjs)

interface CalendarViewProps {
  reservations: Reservation[]
  areaColor: string
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void
}

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay reservas en este rango',
  showMore: (total: number) => `+ Ver más (${total})`,
}

export const ReservationCalendar = ({
  reservations,
  areaColor,
  onSelectSlot,
}: CalendarViewProps) => {
  const [view, setView] = useState<View>('week')
  const [date, setDate] = useState(new Date())

  console.log('reservations', reservations)

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: areaColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: 500,
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
        events={reservations}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: '100%' }}
        messages={messages}
        selectable
        onSelectSlot={onSelectSlot}
        eventPropGetter={eventStyleGetter}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        min={new Date(2026, 0, 1, 8, 0, 0)}
        max={new Date(2026, 0, 1, 23, 0, 0)}
        step={30}
        timeslots={2}
        defaultView="week"
        views={['month', 'week', 'day', 'agenda']}
      />
    </Card>
  )
}
