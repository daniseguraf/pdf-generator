import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'
import './index.css'
import { theme } from './theme'
import { BrowserRouter } from 'react-router'
import { AppRoutes } from '@app/routes/AppRoutes'

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
