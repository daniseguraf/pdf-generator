import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { reservationFormSchema } from '@features/reservations/components/ReservationForm/ReservationForm.helpers'
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
import { useForm, type FormValidateInput } from '@mantine/form'
import { CalendarIcon, ClockIcon } from '@phosphor-icons/react'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import dayjs from 'dayjs'
import { zod4Resolver } from 'mantine-form-zod-resolver'

export const ReservationForm = ({
  opened,
  onClose,
  selectedSlot,
  selectedArea,
}: ReservationFormProps) => {
  const { mutate: createReservation, isPending: isCreatePending } =
    useCreateReservation()
  const isFormDisabled = isCreatePending
  const color = getCommonAreaColor(selectedArea?.type)

  const form = useForm<ReservationFormValues>({
    validateInputOnBlur: true,
    initialValues: {
      title: '',
      attendees: undefined,
      notes: '',
    },
    validate: zod4Resolver(
      reservationFormSchema
    ) as unknown as FormValidateInput<ReservationFormValues>,
  })

  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors || !form.isDirty()) return

    const createReservationDto = {
      ...form.values,
      commonAreaId: selectedArea.id,
      startTime: selectedSlot?.start.toISOString(),
      endTime: selectedSlot?.end.toISOString(),
    } as CreateReservationDto

    createReservation(createReservationDto, {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  const handleClose = () => {
    form.resetDirty()
    form.reset()
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg">
          New Reservation
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
                    {dayjs(selectedSlot.start).format('dddd, MMMM D, YYYY')}
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
          label="Reservation title"
          placeholder="E.g.: Family reunion, Birthday, etc."
          disabled={isFormDisabled}
          {...form.getInputProps('title')}
        />

        <Textarea
          label="Notes"
          placeholder="Additional reservation notes"
          disabled={isFormDisabled}
          {...form.getInputProps('notes')}
        />

        <NumberInput
          label="Number of attendees"
          description={`Maximum capacity: ${selectedArea?.capacity || 0} people`}
          placeholder="0"
          min={1}
          max={selectedArea?.capacity || 50}
          hideControls
          required
          disabled={isFormDisabled}
          {...form.getInputProps('attendees')}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onClose} disabled={isFormDisabled}>
            Cancel
          </Button>

          <Button onClick={handleSubmit} loading={isFormDisabled}>
            Create Reservation
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
