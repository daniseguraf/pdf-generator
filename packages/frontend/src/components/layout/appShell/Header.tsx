import { AppShell, Burger, Group, Title } from '@mantine/core'
import { BuildingApartmentIcon } from '@phosphor-icons/react/dist/csr/BuildingApartment'

export const Header = () => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger hiddenFrom="sm" size="sm" />

        <Group gap="xs">
          <BuildingApartmentIcon size={24} weight="regular" />
          <Title order={1} size="xl">
            Buildings Manager System
          </Title>
        </Group>
      </Group>
    </AppShell.Header>
  )
}
