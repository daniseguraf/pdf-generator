import { useState } from 'react'
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
  Badge,
} from '@mantine/core'
import {
  commonAreaLabels,
  dayLabels,
} from '@features/buildings/components/CommonAreas/CommonAreas'

interface CommonAreaFormProps {
  opened: boolean
  onClose: () => void
  onSubmit: (data: Omit<CommonArea, 'id' | 'createdAt'>) => void
  buildingId: string
  initialData?: CommonArea
  mode?: 'create' | 'edit'
}

export const CommonAreaForm = ({
  opened,
  onClose,
  onSubmit,
  buildingId,
  initialData,
  mode = 'create',
}: CommonAreaFormProps) => {
  const [formData, setFormData] = useState({
    buildingId: initialData?.buildingId || buildingId,
    type: initialData?.type || 'GYM',
    description: initialData?.description || '',
    capacity: initialData?.capacity || 10,
    maxHoursPerReservation: initialData?.maxHoursPerReservation || 2,
    openTime: initialData?.openTime || '08:00',
    closeTime: initialData?.closeTime || '20:00',
    daysAvailable: initialData?.daysAvailable || [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
    ],
    status: initialData?.status || 'Activo',
  })

  const handleSubmit = () => {
    if (
      !formData.type ||
      !formData.description ||
      !formData.daysAvailable?.length
    ) {
      alert('Por favor completa todos los campos requeridos')
      return
    }

    onSubmit({
      buildingId: formData.buildingId!,
      type: formData.type,
      description: formData.description,
      capacity: formData.capacity || 10,
      maxHoursPerReservation: formData.maxHoursPerReservation || 2,
      openTime: formData.openTime || '08:00',
      closeTime: formData.closeTime || '20:00',
      daysAvailable: formData.daysAvailable,
      status: formData.status || 'Activo',
    })

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      buildingId,
      type: 'GYM',
      description: '',
      capacity: 10,
      maxHoursPerReservation: 2,
      openTime: '08:00',
      closeTime: '20:00',
      daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
      status: 'Activo',
    })
  }

  const commonAreaOptions = Object.entries(commonAreaLabels).map(
    ([value, label]) => ({
      value,
      label,
    })
  )

  const dayOptions = Object.entries(dayLabels).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        onClose()
        if (mode === 'create') resetForm()
      }}
      title={mode === 'create' ? 'Agregar Área Común' : 'Editar Área Común'}
      position="right"
      size="lg"
      padding="xl"
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {mode === 'create'
            ? 'Completa la información del área común que deseas agregar'
            : 'Actualiza la información del área común'}
        </Text>

        <Select
          label="Tipo de Área Común"
          placeholder="Selecciona el tipo"
          required
          data={commonAreaOptions}
          value={formData.type}
          onChange={value =>
            setFormData({
              ...formData,
              type: value,
            })
          }
          size="md"
        />

        <Textarea
          label="Descripción"
          placeholder="Describe el área común y sus características..."
          required
          minRows={3}
          value={formData.description}
          onChange={e =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          size="md"
        />

        <Group grow>
          <NumberInput
            label="Capacidad"
            placeholder="20"
            required
            min={1}
            max={500}
            description="Número máximo de personas"
            value={formData.capacity}
            onChange={value =>
              setFormData({
                ...formData,
                capacity: Number(value),
              })
            }
            size="md"
          />

          <NumberInput
            label="Horas Máximas"
            placeholder="4"
            required
            min={1}
            max={24}
            description="Por reservación"
            value={formData.maxHoursPerReservation}
            onChange={value =>
              setFormData({
                ...formData,
                maxHoursPerReservation: Number(value),
              })
            }
            size="md"
          />
        </Group>

        <Group grow>
          <div>
            <Text size="sm" fw={500} mb={4}>
              Hora de Apertura
            </Text>
            <input
              type="time"
              value={formData.openTime}
              onChange={e =>
                setFormData({
                  ...formData,
                  openTime: e.target.value,
                })
              }
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </div>

          <div>
            <Text size="sm" fw={500} mb={4}>
              Hora de Cierre
            </Text>
            <input
              type="time"
              value={formData.closeTime}
              onChange={e =>
                setFormData({
                  ...formData,
                  closeTime: e.target.value,
                })
              }
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                fontSize: '14px',
              }}
            />
          </div>
        </Group>

        <MultiSelect
          label="Días Disponibles"
          placeholder="Selecciona los días"
          required
          data={dayOptions}
          value={formData.daysAvailable}
          onChange={value =>
            setFormData({
              ...formData,
              daysAvailable: value,
            })
          }
          searchable
          size="md"
        />

        <Select
          label="Estado"
          placeholder="Selecciona el estado"
          required
          data={['Activo', 'Mantenimiento', 'Inactivo']}
          value={formData.status}
          onChange={value =>
            setFormData({
              ...formData,
              status: value as 'Activo' | 'Mantenimiento' | 'Inactivo',
            })
          }
          size="md"
        />

        {/* Preview de la configuración */}
        <div
          style={{
            backgroundColor: '#f8f9fa',
            padding: '12px',
            borderRadius: '8px',
            marginTop: '8px',
          }}
        >
          <Text size="sm" fw={500} mb="xs">
            Resumen de la configuración:
          </Text>
          <Group gap="xs" mb="xs">
            <Badge size="sm" variant="light">
              {formData.openTime} - {formData.closeTime}
            </Badge>
            <Badge size="sm" variant="light" color="blue">
              Capacidad: {formData.capacity}
            </Badge>
            <Badge size="sm" variant="light" color="violet">
              Máx. {formData.maxHoursPerReservation}h
            </Badge>
          </Group>
          <Text size="xs" c="dimmed">
            Disponible:{' '}
            {formData.daysAvailable?.map(day => dayLabels[day]).join(', ') ||
              'Ningún día seleccionado'}
          </Text>
        </div>

        <Group justify="flex-end" mt="xl">
          <Button
            variant="light"
            onClick={() => {
              onClose()
              if (mode === 'create') resetForm()
            }}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {mode === 'create' ? 'Agregar Área Común' : 'Guardar Cambios'}
          </Button>
        </Group>
      </Stack>
    </Drawer>
  )
}
