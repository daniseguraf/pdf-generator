import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Card,
  Stack,
  Badge,
  Grid,
  ActionIcon,
  Menu,
  rem,
} from '@mantine/core'

import {
  CalendarIcon,
  ClockIcon,
  DotsThreeVerticalIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UsersIcon,
} from '@phosphor-icons/react'
import { type CommonArea } from '@my-buildings/shared/index'
import { useDisclosure } from '@mantine/hooks'
import {
  commonAreaLabels,
  dayLabels,
  getAreaIcon,
} from '@features/buildings/components/CommonAreas/CommonAreas.helpers'
import { CommonAreaForm } from '@features/buildings/components/CommonAreaForm/CommonAreaForm'
import { useState } from 'react'
import { useDeleteCommonArea } from '@features/buildings/hooks/mutations/commonAreas/useDeleteCommonArea'
import { fromISO8601To24HFormat } from '@utils/dates/fromISO8601To24HFormat'
import { TimeValue } from '@mantine/dates'

export const CommonAreas = ({ commonAreas }: { commonAreas: CommonArea[] }) => {
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

  const handleDeleteCommonArea = (commonAreaId: number) => {
    deleteCommonArea({ commonAreaId })
  }

  return (
    <>
      <Container size="xl">
        <Group justify="space-between" mb="xl">
          <div>
            <Title order={2}>Áreas Comunes</Title>
            <Text c="dimmed" size="sm" mt="xs">
              Gestiona las áreas comunes y espacios compartidos del edificio
            </Text>
          </div>

          {hasCommonAreas && (
            <Button leftSection={<PlusIcon size={20} />} onClick={open}>
              Agregar Área Común
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
                  No hay áreas comunes registradas
                </Title>
                <Text c="dimmed" size="sm" mb="lg">
                  Agrega la primera área común para este edificio
                </Text>
              </div>
              <Button leftSection={<PlusIcon size={18} />} onClick={open}>
                Agregar Área Común
              </Button>
            </Stack>
          </Card>
        ) : (
          <Grid>
            {commonAreas?.map(commonArea => (
              <Grid.Col key={commonArea.id} span={{ base: 12, sm: 6, md: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Group justify="space-between" mb="md">
                    <Group gap="xs" align="center">
                      <Text size="xl">{getAreaIcon(commonArea.type)}</Text>

                      <div>
                        <Text fw={600} size="lg">
                          {commonAreaLabels[commonArea.type]}
                        </Text>
                        <Badge
                          color={commonArea.isActive ? 'green' : 'red'}
                          variant="dot"
                          size="sm"
                        >
                          {commonArea.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </div>
                    </Group>

                    <Menu shadow="md" width={200} position="bottom-end">
                      <Menu.Target>
                        <ActionIcon variant="subtle" color="gray">
                          <DotsThreeVerticalIcon size={24} weight="bold" />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={
                            <PencilIcon
                              style={{
                                width: rem(14),
                                height: rem(14),
                              }}
                            />
                          }
                          onClick={() => {
                            setSelectedCommonArea(commonArea)
                            open()
                          }}
                        >
                          Editar
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          leftSection={
                            <TrashIcon
                              style={{
                                width: rem(14),
                                height: rem(14),
                              }}
                            />
                          }
                          onClick={() => {
                            handleDeleteCommonArea(commonArea.id)
                          }}
                        >
                          Eliminar
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <Text size="sm" c="dimmed" mb="md">
                    {commonArea.description}
                  </Text>

                  <Stack gap="xs">
                    <Group gap="xs">
                      <ClockIcon size={16} color="#868e96" />
                      <Text size="sm">
                        <TimeValue value={fromISO8601To24HFormat(commonArea.openTime)} format="12h" /> - <TimeValue value={fromISO8601To24HFormat(commonArea.closeTime)} format="12h" />
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <UsersIcon size={16} color="#868e96" />
                      <Text size="sm">
                        Capacidad: {commonArea.capacity} personas
                      </Text>
                    </Group>

                    <Group gap="xs">
                      <CalendarIcon size={16} color="#868e96" />
                      <Text size="sm">
                        Máx. {commonArea.maxHoursPerReservation}h por reserva
                      </Text>
                    </Group>
                  </Stack>

                  <div
                    style={{
                      marginTop: '12px',
                      paddingTop: '12px',
                      borderTop: '1px solid #e9ecef',
                    }}
                  >
                    <Text size="xs" c="dimmed" mb={4}>
                      Días disponibles:
                    </Text>
                    <Group gap={4}>
                      {commonArea.daysAvailable.map(day => (
                        <Badge key={day} size="xs" variant="light" color="blue">
                          {dayLabels[day].slice(0, 3)}
                        </Badge>
                      ))}
                    </Group>
                  </div>
                </Card>
              </Grid.Col>
            ))}
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
