import {
  Button,
  Drawer,
  Group,
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
  CreateBuildingDto,
} from '../../types/building.types'
import { useEffect, type FC } from 'react'
import { PropertyTypeValues, type Building } from '@my-buildings/shared/index'
import { useCreateBuilding } from '@features/buildings/hooks/mutations/useCreateBuilding'
import { useEmployees } from '@features/employees/hooks/useEmployees'
import { buildingFormSchema } from '@features/buildings/components/BuildingForm/BuildingForm.helpers'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useUpdateBuilding } from '@features/buildings/hooks/mutations/useUpdateBuilding'

export const BuildingForm: FC<BuildingFormProps> = ({
  opened,
  onClose,
  building,
  isEdit,
}) => {
  const { mutate: createBuilding, isPending } = useCreateBuilding()

  const {
    mutate: updateBuilding,
    isPending: isUpdatePending,
    reset: resetUpdateBuilding,
  } = useUpdateBuilding()

  const { data: employees } = useEmployees()

  const {
    id,
    name,
    address,
    district,
    city,
    province,
    postalCode,
    managerId,
    propertyType,
    yearBuilt,
    floors,
    phoneNumber,
    email,
    description,
  } = (building as Building) ?? {}

  const managerOptions =
    employees?.map(employee => ({
      value: `${employee.id}`,
      label: `${employee.firstName} ${employee.lastName}`,
    })) ?? []

  const initialValues = {
    name: name ?? '',
    address: address ?? '',
    district: district ?? '',
    city: city ?? '',
    province: province ?? '',
    postalCode: postalCode ?? '',
    managerId: `${managerId}` || undefined,
    propertyType: propertyType ?? PropertyTypeValues.RESIDENTIAL,
    yearBuilt: yearBuilt ?? undefined,
    floors: floors ?? undefined,
    phoneNumber: phoneNumber ?? '',
    email: email ?? '',
    description: description ?? '',
  }

  const form = useForm<BuildingFormValues>({
    validateInputOnBlur: true,
    initialValues,
    validate: zod4Resolver(buildingFormSchema),
  })

  const handleClose = () => {
    console.log('handleClose')
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
        managerId: Number(form.values.managerId),
      } as CreateBuildingDto,
      {
        onSuccess: () => {
          handleClose()
        },
        onError: error => {
          console.error('Error creando edificio', error)
        },
      }
    )
  }

  const handleEdit = () => {
    const updatedInfo = {
      ...form.values,
      managerId: Number(form.values.managerId),
    }

    updateBuilding(
      {
        id,
        dto: updatedInfo,
      },
      {
        onSuccess: () => {
          handleClose()
          resetUpdateBuilding()
        },
        onError: error => {
          console.error('Error actualizando edificio', error)
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
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Dirección"
          placeholder="Ej: Av. Principal 123"
          required
          {...form.getInputProps('address')}
        />

        <Group grow>
          <TextInput
            label="Distrito"
            placeholder="Ej: San Isidro"
            required
            {...form.getInputProps('district')}
          />

          <TextInput
            label="Ciudad"
            placeholder="Ej: Lima"
            required
            {...form.getInputProps('city')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Provincia"
            placeholder="Ej: Lima"
            required
            {...form.getInputProps('province')}
          />

          <TextInput
            label="Código Postal"
            placeholder="Ej: 15001"
            {...form.getInputProps('postalCode')}
          />
        </Group>

        <Select
          label="Gerente del Edificio"
          placeholder="Selecciona el gerente"
          required
          data={managerOptions}
          {...form.getInputProps('managerId')}
        />

        <Select
          label="Tipo de Propiedad"
          placeholder="Selecciona el tipo"
          required
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
            {...form.getInputProps('yearBuilt')}
          />

          <NumberInput
            label="Número de Pisos"
            placeholder="Ej: 10"
            required
            min={1}
            max={200}
            hideControls
            {...form.getInputProps('floors')}
          />
        </Group>

        <Group grow>
          <TextInput
            label="Teléfono"
            placeholder="Ej: +51 987 654 321"
            {...form.getInputProps('phoneNumber')}
          />

          <TextInput
            label="Email"
            placeholder="Ej: contacto@edificio.com"
            type="email"
            {...form.getInputProps('email')}
          />
        </Group>

        <Textarea
          label="Descripción"
          placeholder="Descripción del edificio (opcional)"
          rows={3}
          {...form.getInputProps('description')}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="light" size="sm" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSubmit}
            loading={isPending || isUpdatePending}
          >
            {isEdit ? 'Editar Edificio' : 'Crear Edificio'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
