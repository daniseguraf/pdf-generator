import { useState } from 'react'
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Stack,
  Badge,
  Grid,
  ActionIcon,
  Menu,
  rem,
} from '@mantine/core'

import { CommonAreaForm } from '../CommonAreaForm/CommonAreaForm'
import {
  CalendarIcon,
  ClockIcon,
  MusicNotesMinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from '@phosphor-icons/react'
interface CommonAreaListProps {
  buildingId: string
}

export type CommonAreaType =
  | 'GYM'
  | 'POOL'
  | 'CLUB_HOUSE'
  | 'CAFETERIA'
  | 'EVENT_ROOM'
  | 'ROOF_TOP'
  | 'COWORKING_SPACE'

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export interface CommonArea {
  id: string
  buildingId: string
  type: CommonAreaType
  description: string
  capacity: number
  maxHoursPerReservation: number
  openTime: string
  closeTime: string
  daysAvailable: DayOfWeek[]
  createdAt: Date
  status: 'Activo' | 'Mantenimiento' | 'Inactivo'
}

export const commonAreaLabels: Record<CommonAreaType, string> = {
  GYM: 'Gimnasio',
  POOL: 'Alberca',
  CLUB_HOUSE: 'Casa Club',
  CAFETERIA: 'Cafetería',
  EVENT_ROOM: 'Salón de Eventos',
  ROOF_TOP: 'Roof Top',
  COWORKING_SPACE: 'Espacio de Coworking',
}

export const dayLabels: Record<DayOfWeek, string> = {
  MONDAY: 'Lunes',
  TUESDAY: 'Martes',
  WEDNESDAY: 'Miércoles',
  THURSDAY: 'Jueves',
  FRIDAY: 'Viernes',
  SATURDAY: 'Sábado',
  SUNDAY: 'Domingo',
}

// Mock data para áreas comunes
export const mockCommonAreas: CommonArea[] = [
  {
    id: '1',
    buildingId: '1',
    type: 'GYM',
    description: 'Gimnasio totalmente equipado con máquinas de cardio y pesas',
    capacity: 30,
    maxHoursPerReservation: 2,
    openTime: '06:00',
    closeTime: '22:00',
    daysAvailable: [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ],
    createdAt: new Date('2024-01-15'),
    status: 'Activo',
  },
  {
    id: '2',
    buildingId: '1',
    type: 'POOL',
    description: 'Alberca semi-olímpica climatizada',
    capacity: 40,
    maxHoursPerReservation: 3,
    openTime: '08:00',
    closeTime: '20:00',
    daysAvailable: [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ],
    createdAt: new Date('2024-01-15'),
    status: 'Activo',
  },
  {
    id: '3',
    buildingId: '1',
    type: 'CLUB_HOUSE',
    description: 'Salón de eventos para reuniones y celebraciones',
    capacity: 50,
    maxHoursPerReservation: 4,
    openTime: '09:00',
    closeTime: '22:00',
    daysAvailable: ['FRIDAY', 'SATURDAY', 'SUNDAY'],
    createdAt: new Date('2024-01-15'),
    status: 'Activo',
  },
  {
    id: '4',
    buildingId: '2',
    type: 'COWORKING_SPACE',
    description:
      'Espacio de trabajo colaborativo con internet de alta velocidad',
    capacity: 20,
    maxHoursPerReservation: 8,
    openTime: '07:00',
    closeTime: '21:00',
    daysAvailable: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    createdAt: new Date('2024-02-10'),
    status: 'Activo',
  },
  {
    id: '5',
    buildingId: '3',
    type: 'ROOF_TOP',
    description: 'Terraza con vista panorámica y asadores',
    capacity: 60,
    maxHoursPerReservation: 6,
    openTime: '10:00',
    closeTime: '23:00',
    daysAvailable: ['FRIDAY', 'SATURDAY', 'SUNDAY'],
    createdAt: new Date('2024-03-05'),
    status: 'Activo',
  },
]

export const CommonAreaList = ({ buildingId }: CommonAreaListProps) => {
  const [commonAreas, setCommonAreas] = useState<CommonArea[]>(mockCommonAreas)
  const [drawerOpened, setDrawerOpened] = useState(false)
  const [selectedArea, setSelectedArea] = useState<CommonArea | undefined>()
  const [mode, setMode] = useState<'create' | 'edit'>('create')

  const handleCreateArea = (data: Omit<CommonArea, 'id' | 'createdAt'>) => {
    const newArea: CommonArea = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date(),
    }
    setCommonAreas([...commonAreas, newArea])
    setDrawerOpened(false)
  }

  const handleEditArea = (data: Omit<CommonArea, 'id' | 'createdAt'>) => {
    if (!selectedArea) return

    setCommonAreas(
      commonAreas.map(area =>
        area.id === selectedArea.id ? { ...area, ...data } : area
      )
    )
    setDrawerOpened(false)
    setSelectedArea(undefined)
  }

  const handleDelete = (areaId: string) => {
    if (confirm('¿Estás seguro de eliminar esta área común?')) {
      setCommonAreas(commonAreas.filter(area => area.id !== areaId))
    }
  }

  const openEditDrawer = (area: CommonArea) => {
    setSelectedArea(area)
    setMode('edit')
    setDrawerOpened(true)
  }

  const openCreateDrawer = () => {
    setSelectedArea(undefined)
    setMode('create')
    setDrawerOpened(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo':
        return 'green'
      case 'Mantenimiento':
        return 'yellow'
      case 'Inactivo':
        return 'red'
      default:
        return 'gray'
    }
  }

  const getAreaIcon = (type: string) => {
    const icons: Record<string, string> = {
      GYM: '🏋️',
      POOL: '🏊',
      CLUB_HOUSE: '🏛️',
      CAFETERIA: '☕',
      EVENT_ROOM: '🎉',
      ROOF_TOP: '🌆',
      COWORKING_SPACE: '💼',
    }
    return icons[type] || '📍'
  }

  return (
    <Container size="xl">
      <Group justify="space-between" mb="xl">
        <div>
          <Title order={2}>Áreas Comunes</Title>
          <Text c="dimmed" size="sm" mt="xs">
            Gestiona las áreas comunes y espacios compartidos del edificio
          </Text>
        </div>
        <Button leftSection={<PlusIcon size={20} />} onClick={openCreateDrawer}>
          Agregar Área Común
        </Button>
      </Group>

      {commonAreas.length === 0 ? (
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack align="center" gap="md" py="xl">
            <Text size="xl" c="dimmed">
              📍
            </Text>
            <div style={{ textAlign: 'center' }}>
              <Title order={4} mb="xs">
                No hay áreas comunes registradas
              </Title>
              <Text c="dimmed" size="sm" mb="lg">
                Agrega la primera área común para este edificio
              </Text>
            </div>
            <Button
              leftSection={<PlusIcon size={18} />}
              onClick={openCreateDrawer}
            >
              Agregar Área Común
            </Button>
          </Stack>
        </Card>
      ) : (
        <Grid>
          {commonAreas.map(area => (
            <Grid.Col key={area.id} span={{ base: 12, sm: 6, md: 4 }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Group gap="xs">
                    <Text size="xl">{getAreaIcon(area.type)}</Text>
                    <div>
                      <Text fw={600} size="lg">
                        {commonAreaLabels[area.type]}
                      </Text>
                      <Badge
                        color={getStatusColor(area.status)}
                        variant="dot"
                        size="sm"
                      >
                        {area.status}
                      </Badge>
                    </div>
                  </Group>

                  <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                      <ActionIcon variant="subtle" color="gray">
                        <MusicNotesMinusIcon size={18} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={
                          <PencilIcon
                            style={{
                              width: rem(14),
                              height: rem(14),
                            }}
                          />
                        }
                        onClick={() => openEditDrawer(area)}
                      >
                        Editar
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={
                          <TrashIcon
                            style={{
                              width: rem(14),
                              height: rem(14),
                            }}
                          />
                        }
                        onClick={() => handleDelete(area.id)}
                      >
                        Eliminar
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>

                <Text size="sm" c="dimmed" mb="md" lineClamp={2}>
                  {area.description}
                </Text>

                <Stack gap="xs">
                  <Group gap="xs">
                    <ClockIcon size={16} color="#868e96" />
                    <Text size="sm">
                      {area.openTime} - {area.closeTime}
                    </Text>
                  </Group>

                  <Group gap="xs">
                    <UsersIcon size={16} color="#868e96" />
                    <Text size="sm">Capacidad: {area.capacity} personas</Text>
                  </Group>

                  <Group gap="xs">
                    <CalendarIcon size={16} color="#868e96" />
                    <Text size="sm">
                      Máx. {area.maxHoursPerReservation}h por reserva
                    </Text>
                  </Group>
                </Stack>

                <div
                  style={{
                    marginTop: '12px',
                    paddingTop: '12px',
                    borderTop: '1px solid #e9ecef',
                  }}
                >
                  <Text size="xs" c="dimmed" mb={4}>
                    Días disponibles:
                  </Text>
                  <Group gap={4}>
                    {area.daysAvailable.map(day => (
                      <Badge key={day} size="xs" variant="light" color="blue">
                        {dayLabels[day].slice(0, 3)}
                      </Badge>
                    ))}
                  </Group>
                </div>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      )}

      <CommonAreaForm
        opened={drawerOpened}
        onClose={() => {
          setDrawerOpened(false)
          setSelectedArea(undefined)
        }}
        onSubmit={mode === 'create' ? handleCreateArea : handleEditArea}
        buildingId={buildingId}
        initialData={selectedArea}
        mode={mode}
      />
    </Container>
  )
}
