import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import type {
  ReservationFormProps,
  ReservationFormValues,
} from '@features/reservations/components/ReservationForm/ReservationForm.types'
import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Group,
  Text,
} from '@mantine/core'
import { TimeValue } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { CalendarIcon, ClockIcon } from '@phosphor-icons/react'
import { getCommonAreaColor } from '@utils/commonAreasColors'
import dayjs from 'dayjs'

export const ReservationForm = ({
  opened,
  onClose,
  selectedSlot,
  selectedArea,
}: ReservationFormProps) => {
  console.log('selectedArea', selectedArea)
  const color = getCommonAreaColor(selectedArea?.type)

  const form = useForm<ReservationFormValues>({
    validateInputOnBlur: true,
    initialValues: {
      title: '',
      attendees: undefined,
      notes: '',
    },
  })

  const handleSubmit = () => {}

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
              backgroundColor: `${color}10`,
              borderRadius: '8px',
              border: `1px solid ${color}30`,
            }}
          >
            <Text
              size="sm"
              mb={8}
              fw={600}
              style={{ color: selectedArea.color }}
            >
              {getAreaLabel(selectedArea.type)}
            </Text>
            {selectedSlot && (
              <>
                <Group gap="xs" mb={4}>
                  <CalendarIcon size={16} color={selectedArea.color} />
                  <Text size="sm">
                    {dayjs(selectedSlot.start).format('dddd, D [de] MMMM YYYY')}
                  </Text>
                </Group>
                <Group gap="xs">
                  <ClockIcon size={16} color={selectedArea.color} />
                  <Text size="sm">
                    <TimeValue value={selectedSlot.start} format="12h" /> -
                    <TimeValue value={selectedSlot.end} format="12h" />
                  </Text>
                </Group>
              </>
            )}
          </div>
        )}

        <TextInput
          label="Título de la reserva"
          placeholder="Ej: Reunión familiar, Entrenamiento, etc."
          {...form.getInputProps('title')}
        />

        <TextInput
          label="Notas"
          placeholder="Notas adicionales de la reserva"
          {...form.getInputProps('notes')}
        />

        <NumberInput
          label="Número de asistentes"
          placeholder="0"
          {...form.getInputProps('attendees')}
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

          <Button onClick={handleSubmit}>Crear Reserva</Button>
        </Group>
      </Stack>
    </Modal>
  )
}
