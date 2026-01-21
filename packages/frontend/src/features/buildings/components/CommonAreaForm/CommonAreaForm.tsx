import { useEffect, type FC } from 'react'
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
import { useForm } from '@mantine/form'
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
import { fromISO8601To24HFormat } from '@utils/dates/fromISO8601To24HFormat'

export const CommonAreaForm: FC<CommonAreaFormProps> = ({
  opened,
  onClose,
  commonArea,
}) => {
  const { id } = useParams()
  const buildingId = Number(id)
  const { mutate: createCommonArea } = useCreateCommonArea()
  const { mutate: updateCommonArea } = useUpdateCommonArea()

  const isEdit = !!commonArea

  console.log('commonArea', commonArea)

  const openTime = fromISO8601To24HFormat(commonArea?.openTime ?? '')
  const closeTime = fromISO8601To24HFormat(commonArea?.closeTime ?? '')


  const initialValues = {
    type: commonArea?.type ?? '',
    description: commonArea?.description ?? undefined,
    capacity: commonArea?.capacity ?? undefined,
    maxHoursPerReservation: commonArea?.maxHoursPerReservation ?? undefined,
    openTime: openTime ?? undefined,
    closeTime: closeTime ?? undefined,
    daysAvailable: commonArea?.daysAvailable ?? undefined,
  }

  const form = useForm<CommonAreaFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(commonAreaFormSchema),
  })


  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors) {
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
    console.log('handleClose')
    form.reset()
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
      title={isEdit ? 'Editar Área Común' : 'Agregar Área Común'}
      position="right"
      size="lg"
      padding="lg"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {isEdit
            ? 'Actualiza la información del área común'
            : 'Completa la información del área común que deseas agregar'}
        </Text>

        <Select
          label="Tipo de Área Común"
          placeholder="Selecciona el tipo"
          required
          data={commonAreaOptions}
          checkIconPosition="right"
          clearable
          {...form.getInputProps('type')}
        />

        <Textarea
          label="Descripción"
          placeholder="Describe el área común y sus características..."
          minRows={3}
          {...form.getInputProps('description')}
        />

        <Group grow>
          <NumberInput
            label="Capacidad"
            placeholder="20"
            min={1}
            max={100}
            description="Número máximo de personas"
            hideControls
            {...form.getInputProps('capacity')}
          />

          <NumberInput
            label="Horas Máximas"
            placeholder="4"
            min={1}
            max={24}
            description="Por reservación"
            hideControls
            {...form.getInputProps('maxHoursPerReservation')}
          />
        </Group>

        <Group grow>
          <TimeInput
            label="Hora de Apertura"
            placeholder="08:00"
            leftSection={<ClockIcon size={16} />}
            {...form.getInputProps('openTime')}
          />

          <TimeInput
            label="Hora de Cierre"
            placeholder="22:00"
            leftSection={<ClockIcon size={16} />}
            {...form.getInputProps('closeTime')}
          />
        </Group>

        <MultiSelect
          label="Días Disponibles"
          placeholder="Selecciona los días"
          data={dayOptions}
          searchable
          clearable
          checkIconPosition="right"
          {...form.getInputProps('daysAvailable')}
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="light" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {isEdit ? 'Guardar Cambios' : 'Agregar Área Común'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
