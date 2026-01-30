import {
  Button,
  Drawer,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import type {
  BuildingFormProps,
  BuildingFormValues,
} from '../../types/building.types'
import { useEffect } from 'react'
import { PropertyTypeValues, type Building } from '@my-buildings/shared/index'
import { useCreateBuilding } from '@features/buildings/hooks/mutations/buildings/useCreateBuilding'
import {
  amenitiesOptions,
  buildingFormSchema,
} from '@features/buildings/components/BuildingForm/BuildingForm.helpers'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useUpdateBuilding } from '@features/buildings/hooks/mutations/buildings/useUpdateBuilding'

export const BuildingForm = ({
  opened,
  onClose,
  building,
  isEdit,
}: BuildingFormProps) => {
  const { mutate: createBuilding, isPending: isCreatePending } =
    useCreateBuilding()

  const {
    mutate: updateBuilding,
    isPending: isUpdatePending,
    reset: resetUpdateBuilding,
  } = useUpdateBuilding()

  const isFormDisabled = isCreatePending || isUpdatePending

  const {
    id,
    name,
    address,
    district,
    city,
    province,
    postalCode,
    propertyType,
    yearBuilt,
    floors,
    phoneNumber,
    email,
    description,
    amenities,
  } = (building as Building) ?? {}

  const initialValues = {
    name: name ?? '',
    address: address ?? '',
    district: district ?? '',
    city: city ?? '',
    province: province ?? '',
    postalCode: postalCode ?? undefined,
    propertyType: propertyType ?? PropertyTypeValues.RESIDENTIAL,
    yearBuilt: yearBuilt ?? '',
    floors: floors ?? '',
    phoneNumber: phoneNumber ?? undefined,
    email: email ?? undefined,
    description: description ?? undefined,
    amenities: amenities ?? [],
  }

  const form = useForm<BuildingFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(buildingFormSchema),
  })

  const handleClose = () => {
    onClose()
    form.reset()
  }

  const handleSubmit = () => {
    const errors = form.validate()

    if (errors.hasErrors) {
      return
    }

    if (isEdit) {
      handleEdit()
    } else {
      handleCreate()
    }
  }

  const handleCreate = () => {
    createBuilding(
      {
        ...form.values,
        yearBuilt: Number(form.values.yearBuilt),
        floors: Number(form.values.floors),
      },
      {
        onSuccess: () => {
          handleClose()
        },
      }
    )
  }

  const handleEdit = () => {
    const updatedInfo = {
      ...form.values,
      yearBuilt: Number(form.values.yearBuilt),
      floors: Number(form.values.floors),
    }

    updateBuilding(
      {
        id,
        updateBuildingDto: updatedInfo,
      },
      {
        onSuccess: () => {
          handleClose()
          resetUpdateBuilding()
        },
      }
    )
  }

  useEffect(() => {
    if (building) {
      form.setValues(initialValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [building])

  return (
    <Drawer
      opened={opened}
      onClose={handleClose}
      title={isEdit ? 'Editar Edificio' : 'Crear Nuevo Edificio'}
      position="right"
      size="lg"
      padding="xl"
    >
      <Stack gap="md">
        <TextInput
          label="Nombre del Edificio"
          placeholder="Ej: Torre Residencial Los Pinos"
          required
          disabled={isFormDisabled}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Dirección"
          placeholder="Ej: Av. Principal 123"
          required
          disabled={isFormDisabled}
          {...form.getInputProps('address')}
        />

        <Group grow>
          <TextInput
            label="Distrito"
            placeholder="Ej: San Isidro"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('district')}
          />

          <TextInput
            label="Ciudad"
            placeholder="Ej: Lima"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('city')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Provincia"
            placeholder="Ej: Lima"
            required
            disabled={isFormDisabled}
            {...form.getInputProps('province')}
          />

          <TextInput
            label="Código Postal"
            placeholder="Ej: 15001"
            disabled={isFormDisabled}
            {...form.getInputProps('postalCode')}
          />
        </Group>

        <Select
          label="Tipo de Propiedad"
          placeholder="Selecciona el tipo"
          required
          disabled={isFormDisabled}
          data={[
            { value: PropertyTypeValues.RESIDENTIAL, label: 'Residencial' },
            { value: PropertyTypeValues.COMMERCIAL, label: 'Comercial' },
            { value: PropertyTypeValues.MIXED, label: 'Mixto' },
          ]}
          {...form.getInputProps('propertyType')}
        />

        <Group grow>
          <NumberInput
            label="Año de Construcción"
            placeholder="Ej: 2020"
            required
            min={1800}
            max={new Date().getFullYear()}
            hideControls
            disabled={isFormDisabled}
            {...form.getInputProps('yearBuilt')}
          />

          <NumberInput
            label="Número de Pisos"
            placeholder="Ej: 10"
            required
            min={1}
            max={200}
            hideControls
            disabled={isFormDisabled}
            {...form.getInputProps('floors')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Teléfono"
            placeholder="Ej: +51 987 654 321"
            disabled={isFormDisabled}
            {...form.getInputProps('phoneNumber')}
          />

          <TextInput
            label="Email"
            placeholder="Ej: contacto@edificio.com"
            type="email"
            disabled={isFormDisabled}
            {...form.getInputProps('email')}
          />
        </Group>

        <MultiSelect
          label="Amenidades"
          placeholder="Selecciona las amenidades"
          data={amenitiesOptions}
          disabled={isFormDisabled}
          {...form.getInputProps('amenities')}
        />

        <Textarea
          label="Descripción"
          placeholder="Descripción del edificio (opcional)"
          rows={3}
          disabled={isFormDisabled}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button
            variant="light"
            size="sm"
            onClick={handleClose}
            disabled={isFormDisabled}
          >
            Cancelar
          </Button>

          <Button size="sm" onClick={handleSubmit} loading={isFormDisabled}>
            {isEdit ? 'Editar Edificio' : 'Crear Edificio'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
