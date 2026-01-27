import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import type {
  ReservationFormProps,
  ReservationFormValues,
} from '@features/reservations/components/ReservationForm/ReservationForm.types'
import { useCreateReservation } from '@features/reservations/hooks/mutations/useCreateReservation'
import type { CreateReservationDto } from '@features/reservations/types/reservation.types'
import {
  Modal,
  TextInput,
  NumberInput,
  Button,
  Stack,
  Group,
  Text,
  Box,
  Textarea,
} from '@mantine/core'
import { TimeValue } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { CalendarIcon, ClockIcon } from '@phosphor-icons/react'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import dayjs from 'dayjs'

export const ReservationForm = ({
  opened,
  onClose,
  selectedSlot,
  selectedArea,
}: ReservationFormProps) => {
  const { mutate: createReservation } = useCreateReservation()
  const color = getCommonAreaColor(selectedArea?.type)

  const form = useForm<ReservationFormValues>({
    validateInputOnBlur: true,
    initialValues: {
      title: '',
      attendees: undefined,
      notes: '',
    },
  })

  const handleSubmit = () => {
    const createReservationDto = {
      ...form.values,
      commonAreaId: selectedArea.id,
      date: selectedSlot?.start.toISOString(),
      startTime: selectedSlot?.start.toISOString(),
      endTime: selectedSlot?.end.toISOString(),
    } as CreateReservationDto

    console.log('createReservationDto', createReservationDto)

    createReservation(createReservationDto, {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  const handleClose = () => {
    onClose()
    form.reset()
  }

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
          <Box
            p="xs"
            bg={`${color}10`}
            style={{
              borderRadius: '8px',
              border: `1px solid ${color}30`,
            }}
          >
            <Text size="sm" mb={8} fw={600} c={color}>
              {getAreaLabel(selectedArea.type)}
            </Text>
            {selectedSlot && (
              <>
                <Group gap="xs" mb={4}>
                  <CalendarIcon size={16} color={color} />
                  <Text size="sm">
                    {dayjs(selectedSlot.start).format('dddd, D [de] MMMM YYYY')}
                  </Text>
                </Group>
                <Group gap="xs">
                  <ClockIcon size={16} color={color} />
                  <Text size="sm">
                    <TimeValue value={selectedSlot.start} format="12h" /> -
                    <TimeValue value={selectedSlot.end} format="12h" />
                  </Text>
                </Group>
              </>
            )}
          </Box>
        )}

        <TextInput
          label="Título de la reserva"
          placeholder="Ej: Reunión familiar, Cumpleaños, etc."
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Notas"
          placeholder="Notas adicionales de la reserva"
          {...form.getInputProps('notes')}
        />

        <NumberInput
          label="Número de asistentes"
          placeholder="0"
          {...form.getInputProps('attendees')}
          min={1}
          max={selectedArea?.capacity || 50}
          required
          hideControls
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
