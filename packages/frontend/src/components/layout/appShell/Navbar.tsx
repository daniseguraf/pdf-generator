import { AppShell, NavLink } from '@mantine/core'
import { BuildingIcon } from '@phosphor-icons/react/dist/csr/Building'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { CalendarIcon } from '@phosphor-icons/react/dist/csr/Calendar'
import { useLocation, useNavigate } from 'react-router'
import { useRole } from '@features/auth/hooks/useRole'

const menuItems = [
  {
    label: 'Dashboard',

    icon: HouseIcon,
    path: '/',
    description: 'Vista general y estadísticas',
  },
  {
    label: 'Buildings',
    icon: BuildingIcon,
    path: '/buildings',
    description: 'Gestión de edificios',
  },
  {
    label: 'Reservations',
    icon: CalendarIcon,
    path: '/reservations',
    description: 'Reservas de áreas comunes',
  },
]

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, isManager, isResident } = useRole()

  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow>
        {isAdmin() && (
          <NavLink
            label="Dashboard"
            leftSection={<HouseIcon size={20} />}
            onClick={() => navigate('/')}
            description="Vista general y estadísticas"
            active={location.pathname === '/'}
            mb="xs"
            style={{
              borderRadius: '8px',
            }}
          />
        )}

        {isManager() && (
          <NavLink
            label="Buildings"
            leftSection={<BuildingIcon size={20} />}
            onClick={() => navigate('/buildings')}
            description="Gestión de edificios"
            active={location.pathname === '/buildings'}
            mb="xs"
            style={{
              borderRadius: '8px',
            }}
          />
        )}

        {isResident() && (
          <NavLink
            label="Reservations"
            leftSection={<CalendarIcon size={20} />}
            onClick={() => navigate('/reservations')}
            description="Reservas de áreas comunes"
            active={location.pathname === '/reservations'}
            mb="xs"
            style={{
              borderRadius: '8px',
            }}
          />
        )}
      </AppShell.Section>
    </AppShell.Navbar>
  )
}
