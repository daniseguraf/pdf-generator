import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import { Container } from '@mantine/core'

const localizer = dayjsLocalizer(dayjs)

export const ReservationsPage = () => {
  return (
    <Container>
      <Calendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
         style={{ height: 500 }}
      />
    </Container>
  )
}
