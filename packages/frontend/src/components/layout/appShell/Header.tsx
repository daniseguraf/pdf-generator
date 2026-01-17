import { ThemeToggle } from '@components/ThemeToggle'
import { useAuth } from '@features/auth/hooks/useAuth'
import {
  AppShell,
  Burger,
  Group,
  Menu,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core'
import {
  BuildingApartmentIcon,
  CaretDownIcon,
  SignOutIcon,
} from '@phosphor-icons/react'
export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Burger hiddenFrom="sm" size="sm" />

        <Group gap="xs">
          <BuildingApartmentIcon size={24} weight="regular" />
          <Title order={1} size="xl">
            Buildings Manager System
          </Title>
        </Group>

        <Group gap="xs">
          <Menu shadow="md" width={250} position="bottom-end">
            <Menu.Target>
              <UnstyledButton
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#f1f3f5'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <Group gap="xs">
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500} lineClamp={1}>
                      {user?.firstName} {user?.lastName}
                    </Text>
                  </div>
                  <CaretDownIcon size={16} />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Text size="xs" c="dimmed">
                  {user?.email}
                </Text>
              </Menu.Label>

              <Menu.Divider />
              <Menu.Item
                color="red"
                leftSection={<SignOutIcon size={14} />}
                onClick={logout}
              >
                Cerrar Sesión
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <ThemeToggle />
        </Group>
      </Group>
    </AppShell.Header>
  )
}
