import {
  Text,
  Group,
  Card,
  Stack,
  Badge,
  ActionIcon,
  Menu,
  Divider,
} from '@mantine/core'

import {
  CalendarIcon,
  ClockIcon,
  DotsThreeVerticalIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from '@phosphor-icons/react'
import {
  dayLabels,
  getAreaIcon,
  getAreaLabel,
  getStatusColor,
} from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import type { CommonAreaCardProps } from '@components/CommonAreaCard/CommonAreaCard.types'
import { getCommonAreaColor } from '@utils/getCommonAreaColor'
import { ScheduleRange } from '@components/ScheduleRange/ScheduleRange'
export const CommonAreaCard = ({
  type,
  isActive,
  description,
  capacity,
  maxHoursPerReservation,
  openTime,
  closeTime,
  daysAvailable,
  onDelete,
  onEdit,
  withActions,
  id,
}: CommonAreaCardProps) => {
  const color = getCommonAreaColor(type)

  return (
    <Card
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
      style={{ border: `1px solid ${color}30`, backgroundColor: `${color}10` }}
    >
      <Group justify="space-between" mb={2}>
        <Group gap={8} align="center">
          <Text size="xl">{getAreaIcon(type)}</Text>

          <Stack gap={4}>
            <Group gap={4}>
              <Badge variant="default" size="sm">
                ID: {id}
              </Badge>

              {isActive && (
                <Badge color={getStatusColor(isActive)} variant="dot" size="sm">
                  {isActive ? 'Active' : 'Inactive'}
                </Badge>
              )}
            </Group>
            <Text fw={600} size="lg">
              {getAreaLabel(type)}
            </Text>
          </Stack>
        </Group>

        {withActions && (
          <Menu shadow="md" width={110} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <DotsThreeVerticalIcon size={24} weight="bold" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<PencilIcon />} onClick={onEdit}>
                Edit
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<TrashIcon />}
                onClick={onDelete}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>

      {description && (
        <Text size="sm" c="dimmed" mb="md">
          {description}
        </Text>
      )}

      <Stack gap="xs">
        <Group gap="xs">
          <ClockIcon size={16} color="#868e96" />
          <ScheduleRange openTime={openTime} closeTime={closeTime} />
        </Group>

        <Group gap="xs">
          <UsersIcon size={16} color="#868e96" />
          <Text size="sm">Capacity: {capacity} people</Text>
        </Group>

        <Group gap="xs">
          <CalendarIcon size={16} color="#868e96" />
          <Text size="sm">Max. {maxHoursPerReservation}h per reservation</Text>
        </Group>
      </Stack>

      {daysAvailable.length > 0 && <Divider my={8} />}
      {daysAvailable.length > 0 && (
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Available days:
          </Text>
          <Group gap={4}>
            {daysAvailable?.map(day => (
              <Badge key={day} size="xs" variant="light" color="blue">
                {dayLabels[day].slice(0, 3)}
              </Badge>
            ))}
          </Group>
        </Group>
      )}
    </Card>
  )
}
