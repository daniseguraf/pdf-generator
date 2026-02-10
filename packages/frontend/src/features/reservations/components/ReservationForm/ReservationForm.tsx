import { getAreaLabel } from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { getReservationFormSchema } from '@features/reservations/components/ReservationForm/ReservationForm.helpers'
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
  Alert,
} from '@mantine/core'
import { TimeValue } from '@mantine/dates'
import { useForm, type FormValidateInput } from '@mantine/form'
import { CalendarIcon, ClockIcon } from '@phosphor-icons/react'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import dayjs from 'dayjs'
import { zod4Resolver } from 'mantine-form-zod-resolver'

const initialValues = {
  title: '',
  attendees: undefined,
  notes: '',
}

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

  const durationInHours =
    ((selectedSlot?.end?.getTime() ?? 0) -
      (selectedSlot?.start?.getTime() ?? 0)) /
    (1000 * 60 * 60)

  const isHoursForReservationAllowed =
    durationInHours <= selectedArea?.maxHoursPerReservation

  const form = useForm<ReservationFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(
      getReservationFormSchema(selectedArea?.capacity || 50)
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
    form.setValues(initialValues)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
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

        {!isHoursForReservationAllowed && (
          <Alert color="red" radius="md" autoContrast>
            The maximum hours per reservation is
            {selectedArea?.maxHoursPerReservation} hour(s)
          </Alert>
        )}

        <TextInput
          label="Reservation Title"
          placeholder="e.g. Birthday Party"
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
          placeholder="e.g. 10"
          min={1}
          hideControls
          required
          disabled={isFormDisabled}
          {...form.getInputProps('attendees')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="subtle"
            onClick={handleClose}
            disabled={isFormDisabled}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            loading={isFormDisabled}
            disabled={!isHoursForReservationAllowed}
          >
            Create Reservation
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
