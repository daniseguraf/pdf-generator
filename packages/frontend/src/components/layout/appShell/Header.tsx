import { SecondaryMenu } from '@components/SecondaryMenu/SecondaryMenu'
import { AppShell, Burger, Group, Title, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { BuildingApartmentIcon } from '@phosphor-icons/react'
import { useNavigate } from 'react-router'

export const Header = ({
  opened,
  toggle,
}: {
  opened: boolean
  toggle: () => void
}) => {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

  return (
    <AppShell.Header>
      <Group h="100%" px="md" justify="space-between">
        <Group gap="sm">
          <Burger hiddenFrom="sm" size="sm" onClick={toggle} opened={opened} />

          <Group gap="xs">
            <BuildingApartmentIcon size={24} weight="regular" />
            <Title
              order={1}
              size="xl"
              onClick={() => navigate('/')}
              style={{ cursor: 'pointer' }}
            >
              My Buildings
            </Title>
          </Group>
        </Group>

        {!isMobile && <SecondaryMenu />}
      </Group>
    </AppShell.Header>
  )
}
