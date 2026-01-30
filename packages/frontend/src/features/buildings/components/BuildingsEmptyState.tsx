import { Button, Stack, Text, Title } from '@mantine/core'

import { Center } from '@mantine/core'
import { BuildingApartmentIcon, PlusIcon } from '@phosphor-icons/react'

export const BuildingsEmptyState = ({
  onCreateBuilding,
}: {
  onCreateBuilding: () => void
}) => (
  <Center py={80}>
    <Stack align="center" gap="md">
      <BuildingApartmentIcon size={64} strokeWidth={1.5} color="#adb5bd" />
      <div style={{ textAlign: 'center' }}>
        <Title order={3} mb="xs">
          No buildings created yet
        </Title>
        <Text c="dimmed" size="sm" mb="xl">
          Start by creating your first building to manage your properties
        </Text>
      </div>
      <Button
        leftSection={<PlusIcon size={20} />}
        size="md"
        onClick={onCreateBuilding}
      >
        Create First Building
      </Button>
    </Stack>
  </Center>
)
