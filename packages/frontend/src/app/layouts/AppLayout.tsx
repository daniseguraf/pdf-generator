import { Header } from '@components/layout/appShell/Header'
import { Navbar } from '@components/layout/appShell/Navbar'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router'

export const AppLayout = () => {
  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShell
      padding="xs"
      header={{ height: { base: 60 } }}
      navbar={{
        width: { base: 280 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
