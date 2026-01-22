import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Group,
  Text,
} from '@mantine/core'
import { useState, useEffect } from 'react'

interface BookingModalProps {
  opened: boolean
  onClose: () => void
  selectedSlot: { start: Date; end: Date } | null
  selectedArea: any | undefined
  onCreateBooking: (booking: Omit<Booking, 'id'>) => void
}

export function BookingModal({
  opened,
  onClose,
  selectedSlot,
  selectedArea,
  onCreateBooking,
}: BookingModalProps) {
  const [title, setTitle] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [attendees, setAttendees] = useState<number | string>(1)

  useEffect(() => {
    if (!opened) {
      setTitle('')
      setUserName('')
      setUserEmail('')
      setAttendees(1)
    }
  }, [opened])

  const handleSubmit = () => {
    if (!selectedSlot || !selectedArea || !title || !userName || !userEmail)
      return

    onCreateBooking({
      areaId: selectedArea.id,
      title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      userName,
      userEmail,
      attendees: Number(attendees),
    })
  }

  const isValid =
    title &&
    userName &&
    userEmail &&
    Number(attendees) > 0 &&
    Number(attendees) <= (selectedArea?.capacity || 0)

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg">
          Nueva Reserva
        </Text>
      }
      size="md"
      radius="md"
    >
      <Stack gap="md">
        {selectedArea && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: `${selectedArea.color}10`,
              borderRadius: '8px',
              border: `1px solid ${selectedArea.color}30`,
            }}
          >
            <Text
              fw={600}
              size="sm"
              mb={8}
              style={{ color: selectedArea.color }}
            >
              {selectedArea.name}
            </Text>
            {selectedSlot && (
              <>
                <Group gap="xs" mb={4}>
                  {/* <Calendar size={16} color={selectedArea.color} /> */}
                  <Text size="sm">
                    {/* {moment(selectedSlot.start).format(
                      'dddd, D [de] MMMM YYYY'
                    )} */}
                  </Text>
                </Group>
                <Group gap="xs">
                  {/* <Clock size={16} color={selectedArea.color} /> */}
                  <Text size="sm">
                    {/* {moment(selectedSlot.start).format('HH:mm')} -{' '}
                    {moment(selectedSlot.end).format('HH:mm')} */}
                  </Text>
                </Group>
              </>
            )}
          </div>
        )}

        <TextInput
          label="Título de la reserva"
          placeholder="Ej: Reunión familiar, Entrenamiento, etc."
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
          required
          // leftSection={<Calendar size={18} />}
        />

        <TextInput
          label="Nombre completo"
          placeholder="Tu nombre"
          value={userName}
          onChange={e => setUserName(e.currentTarget.value)}
          required
          // leftSection={<User size={18} />}
        />

        <TextInput
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          type="email"
          value={userEmail}
          onChange={e => setUserEmail(e.currentTarget.value)}
          required
          // leftSection={<Envelope size={18} />}
        />

        <NumberInput
          label="Número de asistentes"
          placeholder="0"
          value={attendees}
          onChange={setAttendees}
          min={1}
          max={selectedArea?.capacity || 100}
          required
          // leftSection={<UsersThree size={18} />}
          description={`Capacidad máxima: ${selectedArea?.capacity || 0} personas`}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            style={{ backgroundColor: selectedArea?.color }}
          >
            Crear Reserva
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
