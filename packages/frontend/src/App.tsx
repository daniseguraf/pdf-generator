import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'
import './index.css'
import { theme } from './theme'
import { CreateBuildingPreview } from './features/buildings/pages/CreateBuildingPreview'

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <CreateBuildingPreview />
    </MantineProvider>
  )
}

export default App
