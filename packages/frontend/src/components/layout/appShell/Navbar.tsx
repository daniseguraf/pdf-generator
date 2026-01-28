import { AppShell, NavLink } from '@mantine/core'
import { BuildingIcon } from '@phosphor-icons/react/dist/csr/Building'
import { HouseIcon } from '@phosphor-icons/react/dist/csr/House'
import { CalendarIcon } from '@phosphor-icons/react/dist/csr/Calendar'
import { useLocation, useNavigate } from 'react-router'
import { useRole } from '@features/auth/hooks/useRole'

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAdmin, isManager, isResident } = useRole()

  const styles = {
    borderRadius: '0.5rem',
    marginBottom: '0.5rem',
  }

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
            style={styles}
          />
        )}

        {isManager() && (
          <NavLink
            label="Buildings"
            leftSection={<BuildingIcon size={20} />}
            onClick={() => navigate('/buildings')}
            description="Gestión de edificios"
            active={location.pathname === '/buildings'}
            style={styles}
          />
        )}

        {isResident() && (
          <NavLink
            label="Reservations"
            leftSection={<CalendarIcon size={20} />}
            onClick={() => navigate('/reservations')}
            description="Reservas de áreas comunes"
            active={location.pathname === '/'}
            style={styles}
          />
        )}
      </AppShell.Section>
    </AppShell.Navbar>
  )
}
