import { MantineProvider } from '@mantine/core'
import './index.css'
import { theme } from './theme'
import { BrowserRouter } from 'react-router'
import { AppRoutes } from '@app/routes/AppRoutes'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from '@lib/queryClient'
import { useColorScheme } from '@hooks/useColorScheme'

import '@mantine/core/styles.css'
import { AuthProvider } from '@features/auth/context/AuthContext'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'

export const App = () => {
  const { colorScheme } = useColorScheme()
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        defaultColorScheme={colorScheme}
        forceColorScheme={colorScheme as 'light' | 'dark'}
      >
        <Notifications />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
