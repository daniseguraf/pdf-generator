import type { BuildingCardInfoProps } from '@components/BuildingCardInfo/BuildingCardInfo.types'
import { getTypeColor } from '@features/buildings/helpers/getTypeColor.helpers'
import { Text, Title } from '@mantine/core'

import { Badge, Group, Paper, Stack } from '@mantine/core'
import { MapPinIcon } from '@phosphor-icons/react'

export const BuildingCardInfo = ({
  id,
  propertyType,
  isActive,
  name,
  address,
  district,
  city,
  province,
  description,
}: BuildingCardInfoProps) => {
  return (
    <Paper shadow="md" radius="md" withBorder mb="xl" p="lg">
      <Stack gap={4}>
        <Group gap={8}>
          <Badge variant="default" size="md">
            ID: {id}
          </Badge>
          <Badge color={getTypeColor(propertyType)} variant="light" size="md">
            {propertyType}
          </Badge>
          <Badge color={isActive ? 'green' : 'red'} variant="dot" size="md">
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        </Group>

        <Title order={1} size="h2" mb={4}>
          {name}
        </Title>

        <Group gap={4}>
          <MapPinIcon size={16} />
          <Text c="dimmed">
            {address}, {district} - {city}, {province}
          </Text>
        </Group>
      </Stack>

      <Text c="dimmed" mt={12}>
        {description}
      </Text>
    </Paper>
  )
}
