import { Card, Text, Stack, Group, Badge, Button, Alert } from '@mantine/core'
import { InfoIcon } from '@phosphor-icons/react'
// import { Calendar, Clock, User, UsersThree, Trash, Info } from 'phosphor-react'
// import moment from 'moment'

// interface BookingListProps {
// bookings: Booking[]
// area: CommonArea
// onDeleteBooking: (id: string) => void
// }

export function BookingList({ bookings, area, onDeleteBooking }) {
  const upcomingBookings = bookings
    .filter(b => b.end >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())

  const pastBookings = bookings
    .filter(b => b.end < new Date())
    .sort((a, b) => b.start.getTime() - a.start.getTime())

  const renderBooking = (booking: any, isPast: boolean = false) => (
    <Card
      key={booking.id}
      padding="md"
      radius="md"
      withBorder
      style={{
        opacity: isPast ? 0.6 : 1,
        borderLeft: `4px solid ${area.color}`,
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Stack gap="xs" style={{ flex: 1 }}>
          <Group gap="xs">
            <Text fw={600} size="sm">
              {booking.title}
            </Text>
            {isPast && (
              <Badge size="xs" color="gray">
                Finalizada
              </Badge>
            )}
          </Group>

          <Group gap="md">
            <Group gap={6}>
              {/* <Calendar size={16} color="#868e96" /> */}
              <Text size="xs" c="dimmed">
                {/* {moment(booking.start).format('DD/MM/YYYY')} */}
              </Text>
            </Group>
            <Group gap={6}>
              {/* <Clock size={16} color="#868e96" /> */}
              <Text size="xs" c="dimmed">
                {/* {moment(booking.start).format('HH:mm')} -{' '} */}
                {/* {moment(booking.end).format('HH:mm')} */}
              </Text>
            </Group>
          </Group>

          <Group gap="md">
            <Group gap={6}>
              {/* <User size={16} color="#868e96" /> */}
              <Text size="xs" c="dimmed">
                {booking.userName}
              </Text>
            </Group>
            <Group gap={6}>
              {/* <UsersThree size={16} color="#868e96" /> */}
              <Text size="xs" c="dimmed">
                {booking.attendees} personas
              </Text>
            </Group>
          </Group>
        </Stack>

        {!isPast && (
          <Button
            variant="subtle"
            color="red"
            size="sm"
            onClick={() => onDeleteBooking(booking.id)}
            // leftSection={<Trash size={16} />}
          >
            Cancelar
          </Button>
        )}
      </Group>
    </Card>
  )

  return (
    <div>
      <Text fw={600} size="lg" mb="md">
        Reservas
      </Text>

      {bookings.length === 0 ? (
        <Alert icon={<InfoIcon size={20} />} color="blue" radius="md">
          No hay reservas para esta área. Selecciona un espacio en el calendario
          para crear una nueva reserva.
        </Alert>
      ) : (
        <Stack gap="xl">
          {upcomingBookings.length > 0 && (
            <div>
              <Text fw={600} size="sm" mb="sm" c="dimmed">
                Próximas reservas
              </Text>
              <Stack gap="sm">
                {upcomingBookings.map(booking => renderBooking(booking))}
              </Stack>
            </div>
          )}

          {pastBookings.length > 0 && (
            <div>
              <Text fw={600} size="sm" mb="sm" c="dimmed">
                Reservas pasadas
              </Text>
              <Stack gap="sm">
                {pastBookings.map(booking => renderBooking(booking, true))}
              </Stack>
            </div>
          )}
        </Stack>
      )}
    </div>
  )
}
