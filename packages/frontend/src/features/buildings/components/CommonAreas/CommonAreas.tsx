import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Stack,
  Grid,
} from '@mantine/core'

import { PlusIcon } from '@phosphor-icons/react'
import { type CommonArea } from '@my-buildings/shared/index'
import { useDisclosure } from '@mantine/hooks'

import { CommonAreaForm } from '@features/buildings/components/CommonAreaForm/CommonAreaForm'
import { useState } from 'react'
import { useDeleteCommonArea } from '@features/buildings/hooks/mutations/commonAreas/useDeleteCommonArea'
import { CommonAreaCard } from '@components/CommonAreaCard/CommonAreaCard'
import type { CommonAreasProps } from '@features/buildings/components/CommonAreas/CommonAreas.types'

export const CommonAreas = ({ commonAreas }: CommonAreasProps) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [selectedCommonArea, setSelectedCommonArea] = useState<
    CommonArea | undefined
  >(undefined)

  const { mutate: deleteCommonArea } = useDeleteCommonArea()
  const hasCommonAreas = commonAreas.length > 0

  const handleClose = () => {
    setSelectedCommonArea(undefined)
    close()
  }

  const handleEditCommonArea = (commonArea: CommonArea) => {
    setSelectedCommonArea(commonArea)
    open()
  }

  const handleDeleteCommonArea = (commonAreaId: number) => {
    deleteCommonArea({ commonAreaId })
  }

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Common Areas</Title>
            <Text c="dimmed" size="sm" mt="xs">
              Manage the building's common areas and shared spaces
            </Text>
          </div>

          {hasCommonAreas && (
            <Button leftSection={<PlusIcon size={20} />} onClick={open}>
              Add Common Area
            </Button>
          )}
        </Group>

        {!hasCommonAreas ? (
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <Stack align="center" gap="md" py="xl">
              <Text size="xl" c="dimmed">
                📍
              </Text>
              <div style={{ textAlign: 'center' }}>
                <Title order={4} mb="xs">
                  No common areas registered
                </Title>
                <Text c="dimmed" size="sm" mb="lg">
                  Add the first common area for this building
                </Text>
              </div>
              <Button leftSection={<PlusIcon size={18} />} onClick={open}>
                Add Common Area
              </Button>
            </Stack>
          </Card>
        ) : (
          <Grid>
            {commonAreas?.map(commonArea => {
              const {
                type,
                isActive,
                id,
                description,
                capacity,
                maxHoursPerReservation,
                openTime,
                closeTime,
                daysAvailable,
              } = commonArea

              return (
                <Grid.Col key={id} span={{ base: 12, sm: 6, md: 4 }}>
                  <CommonAreaCard
                    type={type}
                    isActive={isActive}
                    id={id}
                    description={description}
                    capacity={capacity}
                    maxHoursPerReservation={maxHoursPerReservation}
                    openTime={openTime}
                    closeTime={closeTime}
                    daysAvailable={daysAvailable}
                    onDelete={() => handleDeleteCommonArea(id)}
                    onEdit={() => handleEditCommonArea(commonArea)}
                    withActions
                  />
                </Grid.Col>
              )
            })}
          </Grid>
        )}
      </Container>

      <CommonAreaForm
        opened={opened}
        onClose={handleClose}
        commonArea={selectedCommonArea}
      />
    </>
  )
}
