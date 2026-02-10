import { useEffect } from 'react'
import {
  Drawer,
  Stack,
  Select,
  Textarea,
  NumberInput,
  Group,
  Button,
  MultiSelect,
  Text,
} from '@mantine/core'
import type {
  CommonAreaFormProps,
  CommonAreaFormValues,
} from '@features/buildings/components/CommonAreaForm/CommonAreaForm.types'
import { useForm, type FormValidateInput } from '@mantine/form'
import {
  commonAreaFormSchema,
  commonAreaOptions,
  dayOptions,
} from '@features/buildings/components/CommonAreaForm/CommonAreaForm.helpers'
import { zod4Resolver } from 'mantine-form-zod-resolver'

import { TimeInput } from '@mantine/dates'
import { useCreateCommonArea } from '@features/buildings/hooks/mutations/commonAreas/useCreateCommonArea'
import { useParams } from 'react-router'
import type { CommonAreas } from '@my-buildings/shared/index'
import type {
  CreateCommonAreaDto,
  UpdateCommonAreaDto,
} from '@features/buildings/types/commonAreas.types'
import { useUpdateCommonArea } from '@features/buildings/hooks/mutations/commonAreas/useUpdateCommonArea'
import { ClockIcon } from '@phosphor-icons/react'
import dayjs from 'dayjs'

export const CommonAreaForm = ({
  opened,
  onClose,
  commonArea,
}: CommonAreaFormProps) => {
  const { id } = useParams()
  const buildingId = Number(id)
  const { mutate: createCommonArea, isPending: isCreatePending } =
    useCreateCommonArea()
  const { mutate: updateCommonArea, isPending: isUpdatePending } =
    useUpdateCommonArea()

  const isFormDisabled = isCreatePending || isUpdatePending

  const isEdit = !!commonArea

  const openTime = commonArea?.openTime
    ? dayjs.utc(commonArea?.openTime).format('HH:mm')
    : undefined
  const closeTime = commonArea?.closeTime
    ? dayjs.utc(commonArea?.closeTime).format('HH:mm')
    : undefined

  const initialValues = {
    type: commonArea?.type ?? '',
    description: commonArea?.description ?? undefined,
    capacity: commonArea?.capacity ?? undefined,
    maxHoursPerReservation: commonArea?.maxHoursPerReservation ?? undefined,
    openTime,
    closeTime,
    daysAvailable: commonArea?.daysAvailable ?? undefined,
  }

  const form = useForm<CommonAreaFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(
      commonAreaFormSchema
    ) as FormValidateInput<CommonAreaFormValues>,
  })

  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors || !form.isDirty()) {
      return
    }

    if (isEdit) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handleCreate = () => {
    const createCommonAreaDto = {
      ...form.values,
      type: form.values.type as CommonAreas,
      buildingId,
      openTime: form.values.openTime ? `${form.values.openTime}:00` : undefined,
      closeTime: form.values.closeTime
        ? `${form.values.closeTime}:00`
        : undefined,
    } as CreateCommonAreaDto

    createCommonArea(createCommonAreaDto, {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  const handleUpdate = () => {
    const updateCommonAreaDto = {
      ...form.values,
      type: form.values.type as CommonAreas,
      buildingId,
      openTime: form.values.openTime ? `${form.values.openTime}:00` : undefined,
      closeTime: form.values.closeTime
        ? `${form.values.closeTime}:00`
        : undefined,
    } as UpdateCommonAreaDto

    updateCommonArea(
      {
        commonAreaId: commonArea?.id ?? 0,
        updateCommonAreaDto,
      },
      {
        onSuccess: () => {
          handleClose()
        },
      }
    )
  }

  const handleClose = () => {
    if (!isEdit) {
      form.setValues(initialValues)
    }
    form.reset()
    form.resetDirty()

    onClose()
  }

  useEffect(() => {
    if (commonArea) {
      form.setValues(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonArea])

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={isEdit ? 'Edit Common Area' : 'Add Common Area'}
      position="right"
      size="lg"
      padding="lg"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {isEdit
            ? 'Update the common area information'
            : 'Complete the information for the common area you want to add'}
        </Text>

        <Select
          label="Common Area Type"
          placeholder="Select type"
          required
          data={commonAreaOptions}
          checkIconPosition="right"
          clearable
          disabled={isFormDisabled}
          {...form.getInputProps('type')}
        />

        <Textarea
          label="Description"
          placeholder="Describe the common area and its features"
          minRows={3}
          disabled={isFormDisabled}
          {...form.getInputProps('description')}
        />

        <Group grow>
          <NumberInput
            label="Capacity"
            placeholder="e.g. 20"
            min={1}
            max={100}
            description="Maximum number of people"
            hideControls
            required
            disabled={isFormDisabled}
            {...form.getInputProps('capacity')}
          />

          <NumberInput
            label="Maximum Hours"
            placeholder="e.g. 4"
            min={1}
            max={24}
            description="Per reservation"
            hideControls
            required
            disabled={isFormDisabled}
            {...form.getInputProps('maxHoursPerReservation')}
          />
        </Group>

        <Group grow>
          <TimeInput
            label="Opening Time"
            placeholder="08:00"
            leftSection={<ClockIcon size={16} />}
            required
            disabled={isFormDisabled}
            {...form.getInputProps('openTime')}
          />

          <TimeInput
            label="Closing Time"
            placeholder="22:00"
            leftSection={<ClockIcon size={16} />}
            required
            disabled={isFormDisabled}
            {...form.getInputProps('closeTime')}
          />
        </Group>

        <MultiSelect
          label="Available Days"
          placeholder="Select days"
          data={dayOptions}
          searchable
          clearable
          checkIconPosition="right"
          disabled={isFormDisabled}
          {...form.getInputProps('daysAvailable')}
        />

        <Group justify="flex-end" mt="xl">
          <Button
            variant="light"
            onClick={handleClose}
            disabled={isFormDisabled}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} loading={isFormDisabled}>
            {isEdit ? 'Save Changes' : 'Add Common Area'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
