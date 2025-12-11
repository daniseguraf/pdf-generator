import { Header } from '@components/layout/appShell/Header'
import { Navbar } from '@components/layout/appShell/Navbar'
import { AppShell } from '@mantine/core'
import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
      styles={{
        main: {
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Header />
      <Navbar />

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
