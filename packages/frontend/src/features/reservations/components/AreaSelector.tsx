import { Card, Group, Text, Badge, SimpleGrid, Stack } from '@mantine/core'
import {
  BarbellIcon,
  ClockIcon,
  DropIcon,
  GameControllerIcon,
  PresentationIcon,
  SunIcon,
  TimerIcon,
  UsersIcon,
} from '@phosphor-icons/react'

interface AreaSelectorProps {
  areas: []
  selectedArea: string | null
  onSelectArea: (areaId: string) => void
}

const iconMap: Record<string, React.ComponentType<any>> = {
  users: UsersIcon,
  barbell: BarbellIcon,
  swim: DropIcon,
  'game-controller': GameControllerIcon,
  sun: SunIcon,
  presentation: PresentationIcon,
}

export const AreaSelector = ({
  areas,
  selectedArea,
  onSelectArea,
}: AreaSelectorProps) => {
  return (
    <div>
      <Text fw={600} size="lg" mb="md">
        Selecciona un área común
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {areas.map(area => {
          const IconComponent = iconMap[area.icon]
          const isSelected = area.id === selectedArea

          return (
            <Card
              key={area.id}
              padding="lg"
              radius="md"
              style={{
                cursor: 'pointer',
                border: isSelected
                  ? `2px solid ${area.color}`
                  : '1px solid #e9ecef',
                backgroundColor: isSelected ? `${area.color}10` : 'white',
                transition: 'all 0.2s ease',
              }}
              onClick={() => onSelectArea(area.id)}
            >
              <Stack gap="md">
                <Group gap="md" wrap="nowrap">
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '12px',
                      backgroundColor: `${area.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={28}
                        weight="duotone"
                        color={area.color}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <Text fw={600} size="sm" mb={4}>
                      {area.type}
                    </Text>
                    <Text size="xs" c="dimmed" lineClamp={2}>
                      {area.description}
                    </Text>
                  </div>
                </Group>

                <Stack gap={8}>
                  <Group gap="xs" wrap="nowrap">
                    <UsersIcon size={14} color="#868e96" weight="duotone" />
                    <Text size="xs" c="dimmed">
                      Capacidad:{' '}
                      <Text component="span" fw={500} c="dark">
                        {area.capacity} personas
                      </Text>
                    </Text>
                  </Group>

                  <Group gap="xs" wrap="nowrap">
                    <ClockIcon size={14} color="#868e96" weight="duotone" />
                    <Text size="xs" c="dimmed">
                      Horario:{' '}
                      <Text component="span" fw={500} c="dark">
                        {area.openTime} - {area.closeTime}
                      </Text>
                    </Text>
                  </Group>

                  <Group gap="xs" wrap="nowrap">
                    <TimerIcon size={14} color="#868e96" weight="duotone" />
                    <Text size="xs" c="dimmed">
                      Máx. reserva:{' '}
                      <Text component="span" fw={500} c="dark">
                        {area.maxHours} {area.maxHours === 1 ? 'hora' : 'horas'}
                      </Text>
                    </Text>
                  </Group>
                </Stack>

                {isSelected && (
                  <Badge
                    size="sm"
                    variant="filled"
                    color={area.color}
                    fullWidth
                  >
                    Área seleccionada
                  </Badge>
                )}
              </Stack>
            </Card>
          )
        })}
      </SimpleGrid>
    </div>
  )
}
