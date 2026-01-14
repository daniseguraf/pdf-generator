import { type FC } from 'react'
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

export const CommonAreaForm: FC<CommonAreaFormProps> = ({
  opened,
  onClose,
  isEdit,
  commonArea,
}) => {
  const { id } = useParams()
  const buildingId = Number(id)

  const { mutate: createCommonArea } = useCreateCommonArea()

  const form = useForm<CommonAreaFormValues>({
    validateInputOnBlur: true,
    initialValues: {
      type: commonArea?.type ?? '',
      description: commonArea?.description ?? '',
      capacity: commonArea?.capacity ?? '',
      maxHoursPerReservation: commonArea?.maxHoursPerReservation ?? 4,
      openTime: commonArea?.openTime ?? '08:00',
      closeTime: commonArea?.closeTime ?? '22:00',
      daysAvailable: commonArea?.daysAvailable ?? [],
    },
    validate: zod4Resolver(commonAreaFormSchema),
  })

  console.log('form', form.values)

  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors) {
      return
    }

    const createCommonAreaDto = {
      ...form.values,
      type: form.values.type as CommonAreas,
      buildingId,
    }
    console.log('createCommonAreaDto', createCommonAreaDto)
    // return

    createCommonArea(createCommonAreaDto, {
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
            {...form.getInputProps('openTime')}
          />

          <TimeInput
            label="Hora de Cierre"
            placeholder="22:00"
            {...form.getInputProps('closeTime')}
          />
        </Group>

        <MultiSelect
          label="Días Disponibles"
          placeholder="Selecciona los días"
          data={dayOptions}
          searchable
          clearable
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
