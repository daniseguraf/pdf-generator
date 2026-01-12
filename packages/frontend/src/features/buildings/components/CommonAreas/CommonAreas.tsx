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
import {
  CommonAreasValues,
  DaysOfWeekValues,
  type CommonArea,
} from '@my-buildings/shared/index'

export const commonAreaLabels = {
  [CommonAreasValues.GYM]: 'Gimnasio',
  [CommonAreasValues.POOL]: 'Piscina',
  [CommonAreasValues.CLUB_HOUSE]: 'Salón Comunitario',
  [CommonAreasValues.CAFETERIA]: 'Cafetería',
  [CommonAreasValues.EVENT_ROOM]: 'Salón de Eventos',
  [CommonAreasValues.ROOF_TOP]: 'Roof Top',
  [CommonAreasValues.COWORKING_SPACE]: 'Espacio de Coworking',
}

export const dayLabels = {
  [DaysOfWeekValues.MONDAY]: 'Lunes',
  [DaysOfWeekValues.TUESDAY]: 'Martes',
  [DaysOfWeekValues.WEDNESDAY]: 'Miércoles',
  [DaysOfWeekValues.THURSDAY]: 'Jueves',
  [DaysOfWeekValues.FRIDAY]: 'Viernes',
  [DaysOfWeekValues.SATURDAY]: 'Sábado',
  [DaysOfWeekValues.SUNDAY]: 'Domingo',
  [DaysOfWeekValues.ALL]: 'Todos',
}

export const CommonAreaList = ({
  commonAreas,
}: {
  commonAreas: CommonArea[]
}) => {
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

        <Button leftSection={<PlusIcon size={20} />} onClick={() => {}}>
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
          {commonAreas?.map(area => (
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
                        color={area.isActive ? 'green' : 'red'}
                        variant="dot"
                        size="sm"
                      >
                        {area.isActive ? 'Activo' : 'Inactivo'}
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
                        // onClick={() => openEditDrawer(area)}
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
                        // onClick={() => handleDelete(area.id)}
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
        opened={false}
        onClose={() => {}}
        onSubmit={() => {}}
        buildingId={0}
        initialData={undefined}
      />
    </Container>
  )
}
