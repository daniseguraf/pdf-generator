import { AppShell, Group, Text } from '@mantine/core'
import { BuildingIcon } from '@phosphor-icons/react/dist/csr/Building'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { CalendarIcon } from '@phosphor-icons/react/dist/csr/Calendar'
import { Link } from 'react-router'

export const Navbar = () => {
  return (
    <AppShell.Navbar p="md">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Group gap={4}>
          <HouseIcon />
          <Text span>Home</Text>
        </Group>
      </Link>

      <Link
        to="/buildings"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Group gap={4}>
          <BuildingIcon />
          <Text span>Buildings</Text>
        </Group>
      </Link>

      <Link
        to="/reservations"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Group gap={4}>
          <CalendarIcon />
          <Text span>Reservations</Text>
        </Group>
      </Link>
    </AppShell.Navbar>
  )
}
