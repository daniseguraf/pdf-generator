import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Stack,
  Paper,
  Title,
  Group,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { PropertyType } from '../types/building.types'

interface BuildingFormProps {
  onSubmit?: (values: BuildingFormValues) => void
  initialValues?: Partial<BuildingFormValues>
}

export interface BuildingFormValues {
  name: string
  description?: string
  yearBuilt: number
  propertyType: PropertyType
  address: string
  district: string
  city: string
  province: string
  postalCode?: string
  floors: number
  phoneNumber?: string
  email?: string
}

export const BuildingForm = ({
  onSubmit,
  initialValues,
}: BuildingFormProps) => {
  const {
    city,
    province,
    district,
    address,
    postalCode,
    phoneNumber,
    email,
    floors,
    propertyType,
    yearBuilt,
    description,
    name,
  } = initialValues ?? {}

  const form = useForm<BuildingFormValues>({
    initialValues: {
      name,
      description,
      yearBuilt,
      propertyType,
      address,
      district,
      city,
      province,
      postalCode,
      floors,
      phoneNumber,
      email,
    },
  })

  const handleSubmit = (values: BuildingFormValues) => {
    onSubmit?.(values)
  }

  return (
    <Paper p="xl" radius="md" withBorder>
      <Title order={2} mb="lg">
        Crear Nuevo Edificio
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="md">
          <TextInput
            label="Nombre del Edificio"
            placeholder="Ej: Torre Residencial Los Pinos"
            required
            {...form.getInputProps('name')}
          />

          <Textarea
            label="Descripción"
            placeholder="Descripción del edificio (opcional)"
            rows={3}
            {...form.getInputProps('description')}
          />

          <Group grow>
            <NumberInput
              label="Año de Construcción"
              placeholder="Ej: 2020"
              required
              min={1800}
              max={new Date().getFullYear()}
              {...form.getInputProps('yearBuilt')}
            />

            <Select
              label="Tipo de Propiedad"
              placeholder="Selecciona el tipo"
              required
              data={[
                { value: PropertyType.RESIDENTIAL, label: 'Residencial' },
                { value: PropertyType.COMMERCIAL, label: 'Comercial' },
                { value: PropertyType.MIXED, label: 'Mixto' },
              ]}
              {...form.getInputProps('propertyType')}
            />

            <NumberInput
              label="Número de Pisos"
              placeholder="Ej: 10"
              required
              min={1}
              max={200}
              {...form.getInputProps('floors')}
            />
          </Group>

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

          <Group justify="flex-end" mt="md">
            <Button type="submit" size="md">
              Crear Edificio
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  )
}
